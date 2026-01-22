import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { ImageDownloader } from '@/core/utils/ImageDownloader';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const url = searchParams.get('url');

    let whereClause = {};
    if (url) {
        whereClause = { sourceUrl: url };
    }

    const recipes = await prisma.recipe.findMany({
      where: whereClause,
      include: {
        tags: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    const parsedRecipes = recipes.map((recipe: any) => ({
      ...recipe,
      ingredients: JSON.parse(recipe.ingredients),
      instructions: JSON.parse(recipe.instructions),
    }));

    return NextResponse.json(parsedRecipes);
  } catch (error) {
    console.error('Failed to fetch recipes:', error);
    return NextResponse.json(
      { error: 'Failed to fetch recipes' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      title,
      description,
      sourceUrl,
      image, // Incoming URL or path
      ingredients,
      instructions,
      prepTime,
      servings,
      tags, // Array of strings or objects? Let's assume array of strings for now
    } = body;

    if (!title) {
      return NextResponse.json({ error: 'Title is required' }, { status: 400 });
    }

    let imagePath = image;
    // Download image if it's a remote URL
    if (image && (image.startsWith('http://') || image.startsWith('https://'))) {
       const downloadedPath = await ImageDownloader.download(image);
       if (downloadedPath) {
         imagePath = downloadedPath;
       }
    }

    // Prepare tags
    // Assuming tags is an array of strings like ["Dinner", "Healthy"]
    const tagConnectOrCreate = (tags || []).map((tagName: string) => ({
      where: { name: tagName },
      create: { 
        name: tagName,
        color: '#e0e0e0' // Default color, can be updated later
      },
    }));

    const newRecipe = await prisma.recipe.create({
      data: {
        title,
        description,
        sourceUrl,
        imagePath,
        ingredients: JSON.stringify(ingredients || []),
        instructions: JSON.stringify(instructions || []),
        prepTime: prepTime ? parseInt(prepTime) : null,
        servings: servings ? parseInt(servings) : null,
        tags: {
          connectOrCreate: tagConnectOrCreate,
        },
      },
      include: {
        tags: true,
      },
    });

    return NextResponse.json({
        ...newRecipe,
        ingredients: JSON.parse(newRecipe.ingredients),
        instructions: JSON.parse(newRecipe.instructions)
    }, { status: 201 });

  } catch (error) {
    console.error('Failed to create recipe:', error);
    return NextResponse.json(
      { error: 'Failed to create recipe' },
      { status: 500 }
    );
  }
}