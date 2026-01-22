import { ImageDownloader } from '../src/core/utils/ImageDownloader';
import { prisma } from '../src/lib/prisma';
import path from 'path';
import fs from 'fs';

// const prisma = new PrismaClient(); // Removed local instance

async function main() {
  console.log('--- Starting Phase 1 Test ---');

  // 1. Test Image Downloader
  console.log('Testing Image Downloader...');
  const testImageUrl = 'https://www.google.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png';
  const localPath = await ImageDownloader.download(testImageUrl);
  console.log('Downloaded to:', localPath);

  if (!localPath || !fs.existsSync(path.join(process.cwd(), 'public', localPath))) {
    console.error('FAILED: Image not downloaded');
    process.exit(1);
  } else {
      console.log('PASSED: Image downloaded');
  }

  // 2. Test DB - Tag
  console.log('Testing DB - Tag Creation...');
  const tagName = `TestTag_${Date.now()}`;
  const tag = await prisma.tag.create({
    data: { name: tagName, color: '#FF0000' }
  });
  console.log('Created Tag:', tag);

  // 3. Test DB - Recipe
  console.log('Testing DB - Recipe Creation...');
  const recipe = await prisma.recipe.create({
    data: {
      title: 'Test Recipe',
      ingredients: JSON.stringify(['Water', 'Flour']),
      instructions: JSON.stringify(['Mix', 'Bake']),
      tags: {
        connect: { id: tag.id }
      }
    },
    include: { tags: true }
  });
  console.log('Created Recipe:', recipe);

  if (recipe.tags.length !== 1 || recipe.tags[0].name !== tagName) {
      console.error('FAILED: Tag relation issue');
      process.exit(1);
  }

  // Clean up
  console.log('Cleaning up...');
  await prisma.recipe.delete({ where: { id: recipe.id } });
  await prisma.tag.delete({ where: { id: tag.id } });
  
  // Clean up image
  fs.unlinkSync(path.join(process.cwd(), 'public', localPath));

  console.log('--- Phase 1 Test Complete: ALL PASSED ---');
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });