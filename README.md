# Fiszki

Z glownego folderu repozytorium dodaj pliki poleceniami:

```powershell
git add .github/workflows/deploy-flashcards.yml "Desktop/Nauka angielskiego"
git commit -m "Add flashcards website"
git push origin main
```

Responsywna aplikacja do nauki, talii i sprawdzianów. Logowanie i synchronizacja działają przez skonfigurowane przez właściciela aplikacji Supabase — użytkownik końcowy tylko zakłada konto lub się loguje.

## Publikacja na GitHub Pages

Workflow `.github/workflows/deploy-flashcards.yml` wdraża aplikację z folderu `Desktop/Nauka angielskiego` na GitHub Pages po wysłaniu zmian na `main` lub `master`.

1. Utwórz projekt Supabase i wykonaj `Desktop/Nauka angielskiego/supabase/schema.sql` w SQL Editorze projektu.
2. W ustawieniach Supabase skopiuj URL projektu oraz publiczny klucz `anon`/publishable.
3. W repozytorium GitHub otwórz **Settings → Secrets and variables → Actions → Variables** i dodaj:
   - `SUPABASE_URL` — URL projektu Supabase,
   - `SUPABASE_ANON_KEY` — publiczny klucz `anon`/publishable.
4. W **Settings → Pages** ustaw źródło wdrożenia **GitHub Actions**.
5. Zatwierdź i wyślij pliki na `main` albo uruchom workflow ręcznie na karcie **Actions**. Adres opublikowanej strony znajdziesz w **Settings → Pages**.
6. W **Supabase → Authentication → URL Configuration** dodaj adres GitHub Pages do **Site URL** i do **Redirect URLs**.

Nie dodawaj klucza `service_role` ani klucza Google Vision do zmiennych udostępnianych przeglądarce. `SUPABASE_ANON_KEY` jest publiczny z założenia; dostęp do danych ogranicza RLS skonfigurowane przez SQL.

`config.js` w repozytorium jest pustym szablonem. Workflow tworzy właściwą konfigurację wyłącznie w artefakcie do publikacji, z wartości publicznych zmiennych repozytorium. Użytkownicy aplikacji nie wpisują adresu ani klucza Supabase.

## Rozpoznawanie zdjęć

Żeby włączyć OCR, postępuj zgodnie z sekcją **Włącz import zdjęć** w `SETUP.md`. Klucz Google Vision należy przechowywać wyłącznie jako sekret funkcji Supabase.

## Uruchomienie lokalne

Do samego podglądu użyj serwera statycznego, np. `npx serve "Desktop/Nauka angielskiego"`. Zalogowanie działa dopiero po skonfigurowaniu projektu, a lokalny `config.js` pozostaje pusty; stronę przeznaczoną dla użytkowników publikuje workflow.
# Aplikacja-webowa
