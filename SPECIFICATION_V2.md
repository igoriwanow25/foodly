# Foodly V2 - Specification: "My Personal Cookbook"

## 1. Core Architecture

*   **Database:** SQLite (Stored locally as `foodly.db`).
*   **ORM:** Prisma (Chosen for strong TypeScript integration, schema validation, and ease of migration).
*   **Image Strategy:** "Local Mirror".
    *   Scraped images are downloaded to `public/uploads/recipes/[uuid].[ext]`.
    *   Database stores the *local path*, not the external URL.
    *   **Rationale:** Prevents broken images if the source site changes or blocks hotlinking.

## 2. Database Schema (Draft)

```prisma
model Recipe {
  id           String   @id @default(cuid())
  title        String
  description  String?
  sourceUrl    String?  // Nullable for manual entries
  imagePath    String?
  ingredients  String   // JSON string or related table (Simple JSON is often enough for "snapshot")
  instructions String   // JSON string of steps
  prepTime     Int?     // In minutes
  servings     Int?
  createdAt    DateTime @default(now())
  updatedAt    DateTime @updatedAt
  
  tags         Tag[]    @relation("RecipeTags")
}

model Tag {
  id      String   @id @default(cuid())
  name    String   @unique
  color   String   // Hex code (e.g., #FF5733)
  recipes Recipe[] @relation("RecipeTags")
}
```

## 3. Features & Logic

### A. Recipe Management (CRUD)
1.  **Add Recipe (Two Modes):**
    *   **Scrape Mode:** User pastes URL -> Backend scrapes -> Returns data to Form -> User edits (fixes typos, selects tags) -> User clicks "Save".
    *   **Manual Mode:** User opens empty form -> Fills details -> User clicks "Save".
2.  **Duplicate Handling:**
    *   On "Scrape", check if `sourceUrl` exists.
    *   **If Exists:** Show modal: "Recipe already exists. [Overwrite] [Create Duplicate] [Cancel]".
3.  **Data Persistence:** Saved data is a **static snapshot**. It does not auto-update from the web.

### B. Image Handling
*   **Scraping:** Backend detects image URL -> Downloads stream -> Pipes to local file system -> Returns local path.
*   **Manual:** Simple file input to upload an image from device.

### C. Search & Discovery ("My Cookbook")
*   **Search Bar:** Substring match on `title` and `ingredients`.
*   **Filter Panel:**
    *   **Date:** "Newest First" (default), "Oldest First".
    *   **Tags:** Multi-select "Pills". Logic: **AND** (Show recipes having Tag A **AND** Tag B).
*   **UI:** Masonry Grid layout for visual appeal.

### D. Tag System
*   **Creation:** Create tags on the fly during recipe editing.
*   **Visuals:** Random pastel color assigned on creation, or simple color picker.
*   **Display:** Colored pills overlaying recipe cards.

## 4. UI/UX Flow

1.  **Home / Dashboard (`/cookbook`)**:
    *   Grid of saved recipes.
    *   Search/Filter sidebar/topbar.
    *   FAB (Floating Action Button) or big CTA: "Add Recipe".
2.  **Add/Edit Page (`/recipe/add` or `/recipe/[id]/edit`)**:
    *   Split view or single column form.
    *   Inputs: Title, URL (read-only if scraped), Image Preview (changeable), Ingredients (dynamic list), Instructions (dynamic list), Tags (Autocomplete + Create).
3.  **Recipe Detail (`/recipe/[id]`)**:
    *   Large Hero Image.
    *   Ingredients check-list.
    *   Instruction steps.
    *   "Edit" button.

## 5. Technical Implementation Steps

1.  **Setup:** Install Prisma, initialize SQLite.
2.  **Backend:**
    *   Update `ScraperEngine` to return data, not just log it.
    *   Create API Routes: `/api/recipes` (GET/POST), `/api/recipes/[id]` (PUT/DELETE), `/api/tags`.
    *   Implement Image Downloader utility.
3.  **Frontend:**
    *   Refactor `RecipeView` to be reusable for DB data.
    *   Build `RecipeForm` (Complex component with dynamic list inputs).
    *   Build `RecipeGrid` and `FilterBar`.
