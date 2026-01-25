
jest.unmock('axios');
import { ScraperEngine } from '../../src/lib/scraping/ScraperEngine';

// Extended timeout for real network requests
jest.setTimeout(60000);

describe('Instagram Scraping Verification', () => {
  const urls = [
    'https://www.instagram.com/p/DSQUIIxCTeg/',
    'https://www.instagram.com/p/DSYZMA6kggv/',
    'https://www.instagram.com/p/DQ2CAnjiKMw/',
    'https://www.instagram.com/p/DPwgEFLiIgb/'
  ];

  const engine = new ScraperEngine();

  urls.forEach(url => {
    it(`should successfully scrape recipe from ${url}`, async () => {
      console.log(`Testing ${url}...`);
      const result = await engine.scrape(url);
      
      expect(result).not.toBeNull();
      expect(result?.title).toBeTruthy();
      expect(result?.ingredients.length).toBeGreaterThan(0);
      expect(result?.instructions.length).toBeGreaterThan(0);
      
      console.log(`Success for ${url}:`);
      console.log(`Title: ${result?.title}`);
      console.log(`Ingredients found: ${result?.ingredients.length}`);
      console.log(`Instructions found: ${result?.instructions.length}`);
    });
  });
});
