import * as cheerio from 'cheerio';
import he from 'he';
import { Recipe } from '../types';

export class JsonLdStrategy {
  extract(html: string, url: string): Recipe | null {
    const $ = cheerio.load(html);
    let recipeData: any = null;

    $('script[type="application/ld+json"]').each((_, element) => {
      try {
        const content = $(element).html();
        if (!content) return;
        const json = JSON.parse(content);

        // Helper to check for Recipe recursively or in graph
        const findRecipe = (data: any): any => {
             if (!data) return null;
             
             if (this.isRecipe(data)) return data;

             if (data['@graph'] && Array.isArray(data['@graph'])) {
                 const found = data['@graph'].find((item: any) => this.isRecipe(item));
                 if (found) return found;
             }
             
             if (Array.isArray(data)) {
                 const found = data.find(item => this.isRecipe(item));
                 if (found) return found;
             }

             return null;
        }

        const found = findRecipe(json);
        if (found) {
            recipeData = found;
            return false; // break cheerio loop
        }

      } catch (e) {
        // ignore parse errors
      }
    });

    if (!recipeData) return null;

    return this.normalize(recipeData, url);
  }

  private isRecipe(data: any): boolean {
    if (!data || !data['@type']) return false;
    const type = data['@type'];
    if (Array.isArray(type)) {
      return type.includes('Recipe');
    }
    return type === 'Recipe';
  }

  private normalize(data: any, url: string): Recipe {
    const title = he.decode(data.name || '');
    
    // Image normalization
    let image: string | undefined;
    if (typeof data.image === 'string') {
      image = data.image;
    } else if (Array.isArray(data.image)) {
       const first = data.image[0];
       if (typeof first === 'string') image = first;
       else if (first && first.url) image = first.url; // ImageObject
    } else if (data.image && typeof data.image === 'object') {
        if (data.image.url) image = data.image.url;
    }

    // Ingredients
    let ingredients: string[] = [];
    if (data.recipeIngredient) {
        if (typeof data.recipeIngredient === 'string') {
            ingredients = [data.recipeIngredient];
        } else if (Array.isArray(data.recipeIngredient)) {
            ingredients = data.recipeIngredient;
        }
    }

    // Instructions
    let instructions: string[] = [];
    if (data.recipeInstructions) {
        if (typeof data.recipeInstructions === 'string') {
             // Handle single string instructions
             const text = data.recipeInstructions;
             // Split by newline if present and significant
             if (text.includes('\n')) {
                 instructions = text.split('\n');
             } else {
                 instructions = [text];
             }
        } else if (Array.isArray(data.recipeInstructions)) {
            const steps: string[] = [];
            const queue = [...data.recipeInstructions];
            
            while(queue.length > 0) {
                const item = queue.shift();
                if (!item) continue;

                if (typeof item === 'string') {
                    steps.push(item);
                } else if (Array.isArray(item)) {
                    queue.unshift(...item);
                } else if (typeof item === 'object') {
                    if (item['@type'] === 'HowToSection' || item.itemListElement) {
                        if (item.itemListElement && Array.isArray(item.itemListElement)) {
                             queue.unshift(...item.itemListElement);
                        }
                    } else if (item['@type'] === 'HowToStep' || item.text || item.name) {
                        const text = item.text || item.name;
                        if (text && typeof text === 'string') {
                            steps.push(text);
                        }
                    }
                }
            }
            instructions = steps;
        }
    }

    // Clean up instructions (strip HTML and extra whitespace)
    instructions = instructions
        .map(s => he.decode(s.replace(/<[^>]*>?/gm, '')).trim())
        .filter(s => s.length > 0);
    
    // Special check for garbage instructions (e.g. tools list instead of steps)
    if (instructions.length === 1 && /^PRZYGOTUJ/i.test(instructions[0])) {
        // Discard it so fallback can try
        instructions = [];
    }

    return {
      title,
      image,
      ingredients: ingredients.map(i => he.decode(i).trim()).filter(i => i.length > 0),
      instructions,
      url
    };
  }
}
