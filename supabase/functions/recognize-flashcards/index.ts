import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

function jsonResponse(body: unknown, status = 200) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

Deno.serve(async (request: Request) => {
  if (request.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }
  if (request.method !== "POST") {
    return jsonResponse({ error: "Niedozwolona metoda żądania." }, 405);
  }

  const authorization = request.headers.get("Authorization");
  if (!authorization) {
    return jsonResponse({ error: "Zaloguj się, aby rozpoznać zdjęcie." }, 401);
  }

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY");
  const visionApiKey = Deno.env.get("GOOGLE_VISION_API_KEY");
  if (!supabaseUrl || !supabaseAnonKey || !visionApiKey) {
    console.error("Missing Supabase or Google Vision Edge Function configuration.");
    return jsonResponse({ error: "Rozpoznawanie zdjęć nie jest jeszcze skonfigurowane." }, 503);
  }

  const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    global: { headers: { Authorization: authorization } },
    auth: { persistSession: false, autoRefreshToken: false },
  });
  const { data: userData, error: authError } = await supabase.auth.getUser();
  if (authError || !userData.user) {
    return jsonResponse({ error: "Sesja wygasła. Zaloguj się ponownie." }, 401);
  }

  let image: unknown;
  try {
    const requestBody = await request.json();
    image = requestBody.image;
  } catch {
    return jsonResponse({ error: "Nie udało się odczytać danych zdjęcia." }, 400);
  }
  if (typeof image !== "string" || !/^[A-Za-z0-9+/]+={0,2}$/.test(image) || image.length > 12_600_000) {
    return jsonResponse({ error: "Zdjęcie jest nieprawidłowe lub ma więcej niż 9 MB." }, 400);
  }

  const visionResponse = await fetch(
    `https://vision.googleapis.com/v1/images:annotate?key=${encodeURIComponent(visionApiKey)}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        requests: [{
          image: { content: image },
          features: [{ type: "DOCUMENT_TEXT_DETECTION" }],
        }],
      }),
    },
  );
  if (!visionResponse.ok) {
    console.error("Google Vision request failed with status:", visionResponse.status);
    return jsonResponse({
      error: visionResponse.status === 429
        ? "Osiągnięto limit usługi Google Vision. Spróbuj ponownie później."
        : "Google Vision nie rozpoznał zdjęcia. Sprawdź konfigurację usługi i spróbuj ponownie.",
    }, 502);
  }

  const visionResult = await visionResponse.json();
  const result = visionResult.responses?.[0];
  if (result?.error) {
    console.error("Google Vision returned an error:", result.error);
    return jsonResponse({ error: "Nie udało się rozpoznać tekstu na zdjęciu." }, 422);
  }
  const text = result?.fullTextAnnotation?.text?.trim();
  if (!text) {
    return jsonResponse({ error: "Nie znaleziono tekstu. Spróbuj zrobić wyraźniejsze zdjęcie." }, 422);
  }

  return jsonResponse({ text });
});
