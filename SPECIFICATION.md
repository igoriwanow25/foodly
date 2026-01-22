# Foodly - Project Specification

## 1. Overview
Foodly is a Single Page Application (SPA) designed to extract and display recipe data (image, ingredients, instructions) from a wide variety of cooking websites. It prioritizes speed and simplicity, utilizing a robust scraping engine to parse structured data (JSON-LD) with a graceful fallback to HTML parsing.

## 2. Tech Stack
*   **Frontend**: Next.js 14+ (App Router), React, TypeScript.
*   **UI Framework**: `react-bootstrap` (Bootstrap 5 components).
*   **Icons**: `bootstrap-icons`.
*   **Backend**: Next.js API Routes (Serverless functions).
*   **Scraping**:
    *   `axios`: HTTP Client (with User-Agent spoofing).
    *   `cheerio`: HTML manipulation and parsing.
    *   `he`: HTML entity decoder.
    *   *Note*: We accept the limitation that some anti-bot protected sites (Cloudflare, etc.) may block the request (403 errors).

## 3. Core Logic & Scraping Engine (`src/core`)

To ensure maximum compatibility (Goal: "Work on many sites"), the engine will use a **Priority Strategy Pattern**.

### 3.1. Strategies
1.  **Primary: `JsonLdStrategy`** (The "Optimal Solution")
    *   **Target**: `<script type="application/ld+json">`.
    *   **Robustness**:
        *   Must handle root objects that are directly `@type: "Recipe"`.
        *   Must handle **Graph** structures (`@graph` array) commonly used by SEO plugins (Yoast, RankMath), filtering specifically for the node where `@type` includes "Recipe".
        *   **Normalization**:
            *   `image`: Handle string, array of strings, or object with `url`.
            *   `recipeIngredient`: Ensure it returns an array of strings.
            *   `recipeInstructions`: Handle `HowToStep` objects, `HowToSection` (nested steps), or simple string arrays. Flatten complex structures into a linear list of steps.

2.  **Secondary: `HtmlFallbackStrategy`**
    *   **Target**: Semantic HTML and common class names when JSON-LD is missing.
    *   **Heuristics**:
        *   *Ingredients*: Search for `ul/ol` elements containing classes like `ingredients`, `wprm-recipe-ingredients`, `tasty-recipes-ingredients`.
        *   *Instructions*: Search for classes like `instructions`, `preparations`, `wprm-recipe-instructions`.
        *   *Image*: Look for `og:image` meta tag or the first large image inside a `.recipe-container`.

### 3.2. Data Models (`types.ts`)
```typescript
interface Recipe {
  title: string;
  image?: string; // URL
  ingredients: string[]; // Raw strings (e.g., "1 cup flour")
  instructions: string[]; // Linear list of step descriptions
  url: string; // Source URL
}
```

## 4. User Interface (UX/UI)

### 4.1. Layout (Single Page)
*   **Container**: Centralized layout with a clean navbar.
*   **Hero Section**: Input group (Url Input + "Scrape" Button).
*   **Feedback**:
    *   *Loading*: Spinner inside the button or a skeleton loader.
    *   *Error*: Explicit technical error messages (e.g., "Error 403: Access Denied", "No recipe found") displayed in a `Alert` component (Variant: Danger).

### 4.2. Recipe Display
*   **Hero**: Large recipe image with Title overlaid or below.
*   **Two-Column Layout** (Desktop) / Stacked (Mobile):
    *   **Left**: Ingredients. Rendered as a list with **Checkboxes**.
        *   *Behavior*: Users can check off items as they cook.
        *   *Persistence*: **None** (Refreshing clears state).
    *   **Right**: Instructions. Rendered as a numbered list (`ListGroup` or ordered list with styled badges).

## 5. API Definition
**POST** `/api/scrape`
*   **Request Body**: `{ "url": "https://example.com/recipe" }`
*   **Success (200)**: Returns JSON object matching the `Recipe` interface.
*   **Error (400/500)**: Returns `{ "error": "Detailed error message" }`.

## 6. Implementation Plan

### Phase 1: Setup & Scaffolding
*   Initialize Next.js project.
*   Install `axios`, `cheerio`, `he`, `react-bootstrap`, `bootstrap`.
*   Setup project directory structure (`src/core`, `src/components`).

### Phase 2: The Scraper Engine (The "Brain")
*   Implement `types.ts`.
*   Implement `JsonLdStrategy` (Focus on handling `@graph` and varied `instruction` formats).
*   Implement `HtmlFallbackStrategy`.
*   Implement `ScraperEngine` main class.

### Phase 3: Backend API
*   Create `src/app/api/scrape/route.ts`.
*   Connect API to `ScraperEngine`.
*   Add basic error handling (try/catch).

### Phase 4: Frontend Implementation
*   Configure `react-bootstrap` (SSR support).
*   Create `RecipeSearch` component.
*   Create `RecipeView` component (Ingredients with checkboxes).
*   Integrate API client in `page.tsx`.

### Phase 5: Testing & Validation
*   Verify against a known list of test URLs (different schema structures).
*   Polish UI/Mobile responsiveness.
