# StudyPlanner

StudyPlanner to aplikacja webowa do zarządzania zadaniami i terminami związanymi z nauką. Użytkownik może założyć konto, zalogować się i prowadzić własną listę zadań.

## Linki

**Aplikacja online:**
https://study-planner-rose-nu.vercel.app/

**Repozytorium GitHub:**
https://github.com/tolpamaksymilian/study-planner

## Cel projektu

Celem projektu było stworzenie prostej i responsywnej aplikacji webowej, która pomaga studentowi organizować zadania, przedmioty i terminy.

Projekt wykorzystuje logowanie użytkowników, bazę danych oraz operacje dodawania, edytowania i usuwania danych.

## Główne funkcje

* rejestracja użytkownika,
* logowanie i wylogowanie,
* zapamiętywanie sesji,
* dodawanie zadań,
* edytowanie zadań,
* usuwanie zadań,
* oznaczanie zadań jako wykonane,
* ustawianie priorytetu i statusu,
* wyszukiwanie zadań,
* filtrowanie po statusie i priorytecie,
* wykrywanie zadań po terminie,
* wyświetlanie statystyk,
* walidacja formularzy,
* komunikaty błędów i pustej listy,
* responsywny wygląd.

## Użytkownik aplikacji

Aplikacja jest przeznaczona głównie dla studentów i osób uczących się.

Pozwala przechowywać zadania w jednym miejscu i łatwiej kontrolować terminy ich wykonania.

## User stories

* Jako użytkownik chcę założyć konto, aby korzystać z własnego planera.
* Jako użytkownik chcę się zalogować, aby zobaczyć swoje zadania.
* Jako student chcę dodać zadanie, aby zapisać obowiązek do wykonania.
* Jako student chcę określić termin i priorytet zadania.
* Jako student chcę edytować lub usunąć zadanie.
* Jako student chcę oznaczyć zadanie jako wykonane.
* Jako student chcę filtrować i wyszukiwać zadania.
* Jako użytkownik chcę widzieć tylko własne dane.

## Technologie

* HTML,
* CSS,
* JavaScript,
* Vite,
* Supabase,
* Git,
* GitHub,
* Vercel.

## Supabase

Supabase został wykorzystany jako:

* baza danych PostgreSQL,
* system rejestracji i logowania,
* API do obsługi danych,
* zabezpieczenie danych przez Row Level Security.

Każde zadanie jest przypisane do konkretnego użytkownika. Użytkownik widzi tylko własne zadania.

## Model danych

Dane są przechowywane w tabeli `tasks`.

| Pole          | Opis                      |
| ------------- | ------------------------- |
| `id`          | identyfikator zadania     |
| `user_id`     | identyfikator użytkownika |
| `title`       | nazwa zadania             |
| `description` | opis zadania              |
| `subject`     | przedmiot                 |
| `deadline`    | termin wykonania          |
| `priority`    | priorytet                 |
| `status`      | status zadania            |
| `created_at`  | data utworzenia           |
| `updated_at`  | data aktualizacji         |

## Struktura projektu

```text
study-planner/
├── public/
├── src/
│   ├── main.js
│   ├── style.css
│   ├── tasks.css
│   └── supabase.js
├── index.html
├── package.json
├── package-lock.json
├── .gitignore
└── README.md
```

## Najważniejsze pliki

### `src/main.js`

Zawiera główną logikę aplikacji:

* logowanie i rejestrację,
* obsługę zadań,
* walidację,
* filtrowanie,
* wyszukiwanie,
* renderowanie widoków.

### `src/style.css`

Zawiera wygląd ekranu logowania i rejestracji.

### `src/tasks.css`

Zawiera wygląd dashboardu, kart zadań, filtrów i formularza.

### `src/supabase.js`

Odpowiada za połączenie aplikacji z Supabase.

## Działanie aplikacji

1. Użytkownik otwiera aplikację.
2. Aplikacja sprawdza, czy użytkownik jest zalogowany.
3. Niezalogowana osoba widzi ekran logowania i rejestracji.
4. Po zalogowaniu pobierane są zadania użytkownika.
5. Użytkownik może dodawać, edytować i usuwać zadania.
6. Dane są zapisywane w Supabase.
7. Lista i statystyki są automatycznie aktualizowane.
8. Po wylogowaniu użytkownik wraca do ekranu logowania.

## Walidacja

Aplikacja sprawdza między innymi:

* poprawność adresu e-mail,
* długość hasła,
* zgodność haseł podczas rejestracji,
* nazwę zadania,
* nazwę przedmiotu,
* termin wykonania.

## Uruchomienie lokalne

### 1. Pobranie projektu

```bash
git clone https://github.com/tolpamaksymilian/study-planner.git
```

### 2. Przejście do folderu

```bash
cd study-planner
```

### 3. Instalacja pakietów

```bash
npm install
```

### 4. Konfiguracja Supabase

W głównym folderze należy utworzyć plik `.env.local`:

```env
VITE_SUPABASE_URL=ADRES_PROJEKTU_SUPABASE
VITE_SUPABASE_PUBLISHABLE_KEY=KLUCZ_PUBLISHABLE
```

### 5. Uruchomienie aplikacji

```bash
npm run dev
```

Aplikacja będzie dostępna pod adresem:

```text
http://localhost:5173
```

## Wdrożenie

Aplikacja została wdrożona na platformie Vercel.

Zmiany wysłane do głównej gałęzi repozytorium GitHub są automatycznie publikowane na Vercelu.

## Etapy pracy

| Etap                               | Status   |
| ---------------------------------- | -------- |
| Analiza pomysłu i wymagań          | Wykonane |
| Utworzenie repozytorium            | Wykonane |
| Konfiguracja Vite                  | Wykonane |
| Konfiguracja Supabase              | Wykonane |
| Logowanie i rejestracja            | Wykonane |
| Utworzenie tabeli zadań            | Wykonane |
| Dodawanie, edycja i usuwanie zadań | Wykonane |
| Filtrowanie i wyszukiwanie         | Wykonane |
| Poprawa wyglądu aplikacji          | Wykonane |
| Testowanie                         | Wykonane |
| Wdrożenie na Vercel                | Wykonane |
| Dokumentacja                       | Wykonane |

## Testowanie

Sprawdzono:

* rejestrację,
* logowanie,
* wylogowanie,
* utrzymanie sesji,
* dodawanie zadań,
* edytowanie zadań,
* usuwanie zadań,
* zmianę statusu,
* filtrowanie,
* wyszukiwanie,
* walidację formularzy,
* oddzielenie danych użytkowników,
* działanie na komputerze i telefonie.

## Autor

Maksymilian Tołpa

Projekt zaliczeniowy z przedmiotu dotyczącego współczesnych technologii internetowych.
