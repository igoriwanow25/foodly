/**
 * @jest-environment node
 */
import { HtmlFallbackStrategy } from '../../src/lib/scraping/strategies/HtmlFallbackStrategy';

describe('HtmlFallbackStrategy', () => {
    const strategy = new HtmlFallbackStrategy();
    const url = 'http://example.com/recipe';

    it('should extract title from h1', () => {
        const html = `<html><body><h1>My Recipe</h1></body></html>`;
        const result = strategy.extract(html, url);
        expect(result?.title).toBe('My Recipe');
    });

    it('should extract title from og:title', () => {
        const html = `<html><head><meta property="og:title" content="OG Recipe"></head><body></body></html>`;
        const result = strategy.extract(html, url);
        expect(result?.title).toBe('OG Recipe');
    });

    it('should extract ingredients from list with "składniki" class', () => {
        const html = `
            <html>
                <body>
                    <h1>Recipe</h1>
                    <ul class="skladniki">
                        <li>1 kg mąki</li>
                        <li>2 jajka</li>
                    </ul>
                </body>
            </html>
        `;
        const result = strategy.extract(html, url);
        expect(result?.ingredients).toHaveLength(2);
        expect(result?.ingredients).toContain('1 kg mąki');
    });

    it('should extract instructions from list with verbs', () => {
        const html = `
            <html>
                <body>
                    <h1>Recipe</h1>
                    <ol class="steps">
                        <li>Zagotuj wodę.</li>
                        <li>Wymieszaj składniki.</li>
                    </ol>
                </body>
            </html>
        `;
        const result = strategy.extract(html, url);
        expect(result?.instructions).toHaveLength(2);
        expect(result?.instructions[0]).toContain('Zagotuj wodę');
    });

    it('should extract ingredients from paragraphs if no lists', () => {
         const html = `
            <html>
                <body>
                    <h1>Recipe</h1>
                    <div id="content">
                        <p>1 szklanka cukru</p>
                        <p>2 łyżki oleju</p>
                        <p>1 szczypta soli</p>
                    </div>
                </body>
            </html>
        `;
        const result = strategy.extract(html, url);
        // This relies on fallback logic
        expect(result?.ingredients.length).toBeGreaterThanOrEqual(3);
    });
});
