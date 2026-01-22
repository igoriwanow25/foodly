export interface Recipe {
  id?: string; // Optional because scraped recipe doesn't have it yet
  title: string;
  description?: string;
  image?: string;
  ingredients: string[];
  instructions: string[];
  url?: string; // Optional source URL
  prepTime?: number;
  servings?: number;
  tags?: string[]; // Array of tag names
}