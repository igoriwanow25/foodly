
import fs from 'fs';
import path from 'path';
import { InstagramStrategy } from '../../src/core/strategies/InstagramStrategy';

describe('InstagramStrategy (JSON Parsing)', () => {
  it('should extract recipe from full HTML dump using JSON data', () => {
    const fixturePath = path.join(process.cwd(), 'tests/fixtures/instagram/debug_response.html');
    const html = fs.readFileSync(fixturePath, 'utf-8');
    const url = 'https://www.instagram.com/p/DTgTW1FkrXr/';

    const strategy = new InstagramStrategy();
    const result = strategy.extract(html, url);

    expect(result).not.toBeNull();
    expect(result?.title).toBeDefined();
    // Expect specific text we know is in the JSON but maybe cut off in meta tags
    // "For ALL of you asking for the app" might be deep in the description
    expect(result?.ingredients.length).toBeGreaterThan(0);
    expect(result?.instructions.length).toBeGreaterThan(0);
    
    // Check specific ingredients from the fixture
    const ingredientsText = result?.ingredients.join(' ').toLowerCase();
    expect(ingredientsText).toContain('ground beef');
    expect(ingredientsText).toContain('garlic cloves');
    expect(ingredientsText).toContain('smoked paprika');

    // Check instructions
    const instructionsText = result?.instructions.join(' ').toLowerCase();
    expect(instructionsText).toContain('preheat oven');
    expect(instructionsText).toContain('grate the onion');
  });
});
