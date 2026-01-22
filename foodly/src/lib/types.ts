import { Recipe as PrismaRecipe, Tag } from '@prisma/client';

export interface ScrapedRecipe {
  title: string;
  image?: string;
  ingredients: string[];
  instructions: string[];
  url: string;
}

export type Recipe = PrismaRecipe & {
  tags: Tag[];
};

export function parseRecipe(recipe: Recipe): Recipe & { ingredients: string[]; instructions: string[] } {
  return {
    ...recipe,
    ingredients: typeof recipe.ingredients === 'string' ? JSON.parse(recipe.ingredients) : recipe.ingredients,
    instructions: typeof recipe.instructions === 'string' ? JSON.parse(recipe.instructions) : recipe.instructions,
  };
}
