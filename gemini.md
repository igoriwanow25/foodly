# Foodly - Intelligent Recipe Extractor

## Project Goal
Build a full-stack web application that takes a URL, scrapes the content, and displays a clean, formatted recipe (Image, Ingredients, Preparation Steps) via a user-friendly frontend.

## Tech Stack
*   **Framework**: Next.js (React + Node.js API Routes)
*   **Language**: TypeScript
*   **Styling**: Bootstrap CSS / Custom CSS (Material Design principles)
*   **Scraping Engine**:
    *   **HTTP Client**: Axios (with custom User-Agent headers)
    *   **Parser**: Cheerio
    *   **Utilities**: `he` (HTML entity decoder)

## Architecture
### Directory Structure
*   `src/app/api/scrape/route.ts`: API Endpoint that executes the scraper logic.
*   `src/app/page.tsx`: Frontend UI (Input form & Recipe display).
*   `src/core/`: Shared scraper logic (independent of the framework).
    *   `ScraperEngine.ts`: Main logic orchestrating the strategies.
    *   `strategies/`: Extraction logic (`JsonLdStrategy`, `HtmlFallbackStrategy`).
    *   `types.ts`: Shared interfaces.

## Logic Flow
1.  **User Interface**: User pastes a URL into the frontend input field.
2.  **Request**: Frontend sends `POST` request to `/api/scrape`.
3.  **Backend Processing**:
    *   **Fetch**: Retrieve HTML using Axios.
    *   **Strategy 1 (JSON-LD)**: Parse Schema.org/Recipe data.
    *   **Strategy 2 (Fallback)**: Cheerio selector extraction.
4.  **Response**: JSON data returned to frontend.
5.  **Display**: Frontend renders the recipe card (Image, Ingredients list, Steps).