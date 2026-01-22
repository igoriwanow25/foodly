/**
 * @jest-environment node
 */

import { prisma } from '../../src/lib/prisma';
import { ImageDownloader } from '../../src/lib/scraping/utils/ImageDownloader';
import fs from 'fs';
import path from 'path';
import axios from 'axios';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('Integration Tests', () => {
  describe('ImageDownloader', () => {
    it('should download an image and save it to the public/uploads directory', async () => {
      mockedAxios.get.mockResolvedValue({
        data: 'mock image data',
        headers: { 'content-type': 'image/png' },
      });
      const imageUrl = 'https://via.placeholder.com/150';
      const downloadedPath = await ImageDownloader.download(imageUrl);
      expect(downloadedPath).toMatch(/\/uploads\/[a-f0-9]+\.png/);
      const filePath = path.join(process.cwd(), 'public', downloadedPath!);
      expect(fs.existsSync(filePath)).toBe(true);
      fs.unlinkSync(filePath);
    });
  });
//... rest of the file

  describe('Prisma', () => {
    it('should create and retrieve a recipe with a tag', async () => {
      const recipe = await prisma.recipe.create({
        data: {
          title: 'Test Recipe',
          ingredients: '[]',
          instructions: '[]',
          tags: {
            create: {
              name: 'Test Tag',
              color: '#FF0000',
            },
          },
        },
        include: {
          tags: true,
        },
      });

      expect(recipe.title).toBe('Test Recipe');
      expect(recipe.tags).toHaveLength(1);
      expect(recipe.tags[0].name).toBe('Test Tag');

      await prisma.recipe.delete({
        where: {
          id: recipe.id,
        },
      });

      await prisma.tag.delete({
        where: {
          id: recipe.tags[0].id,
        },
      });
    });
  });
});