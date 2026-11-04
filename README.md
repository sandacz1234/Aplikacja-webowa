# Fiszki

Responsywna aplikacja do nauki słówek, tworzenia talii i sprawdzianów. Logowanie i synchronizacja danych działają przez Supabase, a zdjęcia słówek można rozpoznawać przez Google Cloud Vision.

## Publikacja na GitHub Pages

Workflow `.github/workflows/deploy-flashcards.yml` publikuje stronę na GitHub Pages po wysłaniu zmian na `main` lub `master`.

1. Utwórz projekt Supabase i uruchom plik `supabase/schema.sql` w SQL Editorze projektu.
2. Skopiuj URL projektu oraz publiczny klucz `anon`/publishable.
3. W repozytorium GitHub otwórz **Settings → Secrets and variables → Actions → Variables** i dodaj:
   - `SUPABASE_URL` — URL projektu,
   - `SUPABASE_ANON_KEY` — publiczny klucz `anon`/publishable.
4. W **Settings → Pages** ustaw źródło wdrożenia **GitHub Actions**.
5. W **Supabase → Authentication → URL Configuration** dodaj adres GitHub Pages jako **Site URL** i do **Redirect URLs**.
6. Wypchnij zmiany na `main` lub `master`. Adres strony znajdziesz w **Settings → Pages**.

`config.js` w repozytorium jest pustym szablonem. Workflow tworzy właściwą konfigurację w artefakcie wdrożeniowym ze zmiennych repozytorium, więc użytkownicy aplikacji nie wpisują danych Supabase. Nie umieszczaj w aplikacji ani zmiennych GitHub Actions klucza `service_role` lub klucza Google Vision. Publiczny klucz Supabase jest przeznaczony do aplikacji przeglądarkowej; dostęp do danych ograniczają polityki RLS.

## Rozpoznawanie zdjęć

Aby włączyć OCR, wykonaj instrukcje w `SETUP.md`. Klucz Google Vision przechowuj wyłącznie jako sekret funkcji Supabase.

## Uruchomienie lokalne

Możesz uruchomić stronę lokalnie przez serwer statyczny, np. `npx serve .`. Logowanie wymaga skonfigurowanego projektu Supabase; lokalny `config.js` pozostaje pusty.
