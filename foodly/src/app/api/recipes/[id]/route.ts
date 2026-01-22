import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { ImageDownloader } from '@/core/utils/ImageDownloader';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const recipe = await prisma.recipe.findUnique({
      where: { id },
      include: {
        tags: true,
      },
    });

    if (!recipe) {
      return NextResponse.json({ error: 'Recipe not found' }, { status: 404 });
    }

    return NextResponse.json({
      ...recipe,
      ingredients: JSON.parse(recipe.ingredients),
      instructions: JSON.parse(recipe.instructions),
    });
  } catch (error) {
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    const {
      title,
      description,
      sourceUrl,
      image,
      ingredients,
      instructions,
      prepTime,
      servings,
      tags,
    } = body;

    let imagePath = image;
    // Only download if it looks like a new remote URL
    if (image && (image.startsWith('http://') || image.startsWith('https://'))) {
       const downloadedPath = await ImageDownloader.download(image);
       if (downloadedPath) {
         imagePath = downloadedPath;
       }
    }

    // Tag logic for update: 
    // If tags provided, replace all? Or merge? 
    // Usually "set" is safer for a full edit form.
    let tagUpdate = {};
    if (tags) {
        tagUpdate = {
            set: [], // Disconnect all
            connectOrCreate: tags.map((t: string) => ({
                where: { name: t },
                create: { name: t, color: '#e0e0e0' }
            }))
        };
    }

    const updatedRecipe = await prisma.recipe.update({
      where: { id },
      data: {
        title,
        description,
        sourceUrl,
        imagePath,
        ingredients: ingredients ? JSON.stringify(ingredients) : undefined,
        instructions: instructions ? JSON.stringify(instructions) : undefined,
        prepTime: prepTime ? parseInt(prepTime) : undefined,
        servings: servings ? parseInt(servings) : undefined,
        tags: tags ? tagUpdate : undefined,
      },
      include: { tags: true },
    });

    return NextResponse.json({
        ...updatedRecipe,
        ingredients: JSON.parse(updatedRecipe.ingredients),
        instructions: JSON.parse(updatedRecipe.instructions)
    });

  } catch (error) {
    console.error("Update error", error);
    return NextResponse.json({ error: 'Failed to update recipe' }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await prisma.recipe.delete({
      where: { id },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete recipe' }, { status: 500 });
  }
}
