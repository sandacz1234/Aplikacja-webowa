# Konfiguracja fiszek online

Aplikacja używa Supabase do logowania i przechowywania osobnych talii każdego użytkownika. Zdjęcia wybrane do rozpoznania są przesyłane do Google Cloud Vision przez zabezpieczoną funkcję Supabase; klucz Google nie trafia do przeglądarki.

## 1. Utwórz bazę i klucze Supabase

1. Utwórz projekt w [Supabase](https://supabase.com/).
2. W SQL Editorze projektu uruchom zawartość pliku `supabase/schema.sql`. Włącza on RLS i ogranicza dostęp do rekordów właściciela.
3. W ustawieniach API skopiuj adres projektu oraz klucz publiczny `anon`/`publishable`. **Nie umieszczaj klucza `service_role` w aplikacji.**
4. W repozytorium GitHub dodaj zmienne Actions `SUPABASE_URL` i `SUPABASE_ANON_KEY`, a następnie wypchnij zmiany na `main` lub `master`. Workflow automatycznie włączy GitHub Pages i opublikuje stronę. Bez tych zmiennych każdy może otworzyć publiczną stronę, ale logowanie i tworzenie kont pozostaną wyłączone do czasu konfiguracji Supabase.
5. W ustawieniach Supabase Auth → URL Configuration dodaj publiczny adres GitHub Pages. Jeżeli włączyłeś potwierdzanie e-maili, użytkownicy potwierdzą konto przed pierwszym logowaniem.

Adres Supabase i klucz publiczny są częścią publicznej konfiguracji strony — jest to oczekiwane dla aplikacji przeglądarkowej. Nie są kluczami administracyjnymi; prywatność danych zapewniają polityki RLS uruchamiane przez skrypt SQL.
Jeżeli przeglądarka zawiera talie ze starszej, lokalnej wersji aplikacji, przy pierwszym logowaniu możesz świadomie przenieść je na konto. Aplikacja nie przenosi ich bez potwierdzenia, ponieważ wcześniej nie były przypisane do użytkownika.

## 2. Włącz import zdjęć

1. Włącz Google Cloud Vision API w projekcie Google Cloud i utwórz klucz API. Włącz rozliczenia/limity zgodnie z ustawieniami Google.
2. Zainstaluj [Supabase CLI](https://supabase.com/docs/guides/cli), zaloguj się i połącz folder z projektem:

   ```powershell
   supabase login
   supabase link --project-ref twoj-project-ref
   ```

3. W folderze projektu ustaw sekret i opublikuj funkcję:

   ```powershell
   supabase secrets set GOOGLE_VISION_API_KEY=twoj_klucz_google
   supabase functions deploy recognize-flashcards
   ```

Klucz Google ustawiaj wyłącznie jako sekret funkcji — nigdy w `app.js`, pliku HTML ani ustawieniach przeglądarki. Użytkownik wybiera zdjęcie, a przed zapisaniem może poprawić każdą rozpoznaną parę słówek.

## Dane i limity

Liczba talii i fiszek nie jest ograniczona przez interfejs. Dane są przechowywane jako osobne rekordy w bazie, zamiast w limicie `localStorage`; rzeczywiste limity zależą od planu i dostępnego miejsca w projekcie Supabase. Wpisywanie znaków w różnych alfabetach odbywa się przez klawiaturę systemową lub metodę wprowadzania znaków (IME); formularze akceptują Unicode.
