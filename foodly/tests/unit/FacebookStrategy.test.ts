/**
 * @jest-environment node
 */
import { FacebookStrategy } from '../../src/lib/scraping/strategies/FacebookStrategy';

describe('FacebookStrategy', () => {
    const strategy = new FacebookStrategy();
    const url = 'https://www.facebook.com/watch/?v=12345';

    it('should return null for non-facebook URLs', () => {
        expect(strategy.extract('<html></html>', 'https://google.com')).toBeNull();
    });

    it('should extract recipe from Title tag', () => {
        // Needs length > 200 to pass FacebookStrategy check
        const longPadding = ".".repeat(200);
        // Using "1 cup" or "100 g" strictly. 
        // HtmlFallbackStrategy converts newlines to <p> tags.
        // It relies on extractParagraphIngredients.
        const html = `
            <html>
                <head>
                    <title>${longPadding} Delicious Cake. Ingredients: 100 g flour. 200 ml milk. Instructions: 1. Mix everything. 2. Bake it.</title>
                </head>
                <body></body>
            </html>
        `;
        const result = strategy.extract(html, url);
        expect(result).not.toBeNull();
        // The fallback strategy might struggle with single line text without explicit separators if it relies on paragraph splitting which FacebookStrategy does (split by newline).
        // Let's ensure newlines are present in the mock data string itself.
    });

    it('should extract recipe from Title tag with newlines', () => {
        const longPadding = ".".repeat(200);
        // Use spaces "100 g flour" not "100g flour" if strictly parsing with updated regex
        // The regex is: /(\d+|[½⅓¼¾])\s*(g|kg|ml|l|dag|szklank|łyż|szt|cup|tbsp|tsp|oz|lb)/i
        // But then looks for common ingredients or units at start.
        
        const titleText = `${longPadding}\nDelicious Cake\nIngredients:\n100 g flour\n200 ml milk\nInstructions:\n1. Mix.\n2. Bake.`;
        const html = `<html><head><title>${titleText}</title></head></html>`;
        
        const result = strategy.extract(html, url);
        expect(result).not.toBeNull();
        expect(result?.ingredients.length).toBeGreaterThan(0);
    });

    it('should extract recipe from JSON blob (creation_story.message.text)', () => {
        const json = {
            creation_story: {
                message: {
                    text: "My Recipe.\n\nIngredients:\n100 g sugar\n200 ml milk\n\nInstructions:\n1. Cook milk.\n2. Add sugar."
                }
            }
        };
        const html = `
            <html>
                <body>
                    <script type="application/json">${JSON.stringify(json)}</script>
                </body>
            </html>
        `;
        const result = strategy.extract(html, url);
        expect(result).not.toBeNull();
        expect(result?.ingredients.length).toBeGreaterThan(0);
    });

    it('should extract recipe from deep JSON blob (recursive search)', () => {
        const json = {
            some: {
                nested: {
                    data: {
                        message: {
                            text: "Hidden Recipe.\n\nIngredients:\n100 g apple\n\nInstructions:\n1. Eat it."
                        }
                    }
                }
            }
        };
        const html = `
            <html>
                <body>
                    <script type="application/json">${JSON.stringify(json)}</script>
                </body>
            </html>
        `;
        const result = strategy.extract(html, url);
        expect(result).not.toBeNull();
        expect(result?.ingredients.length).toBeGreaterThan(0);
    });
});
