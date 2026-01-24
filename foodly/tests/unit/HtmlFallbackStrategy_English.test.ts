/**
 * @jest-environment node
 */
import { HtmlFallbackStrategy } from '../../src/lib/scraping/strategies/HtmlFallbackStrategy';

describe('HtmlFallbackStrategy - English Support', () => {
    const strategy = new HtmlFallbackStrategy();
    const url = 'http://example.com/recipe';

    it('should extract ingredients from list with "ingredients" class', () => {
        const html = `
            <html>
                <body>
                    <h1>Apple Pie</h1>
                    <ul class="ingredients">
                        <li>2 cups flour</li>
                        <li>3 apples</li>
                        <li>1 tsp cinnamon</li>
                    </ul>
                </body>
            </html>
        `;
        const result = strategy.extract(html, url);
        expect(result?.ingredients).toHaveLength(3);
        expect(result?.ingredients).toContain('2 cups flour');
    });

    it('should extract instructions from list with "instructions" class', () => {
        const html = `
            <html>
                <body>
                    <h1>Apple Pie</h1>
                    <ol class="instructions">
                        <li>Peel the apples.</li>
                        <li>Mix flour and sugar.</li>
                        <li>Bake at 350 degrees.</li>
                    </ol>
                </body>
            </html>
        `;
        const result = strategy.extract(html, url);
        expect(result?.instructions).toHaveLength(3);
        expect(result?.instructions[0]).toBe('Peel the apples.');
    });

    it('should extract ingredients based on "Ingredients" header', () => {
        const html = `
            <html>
                <body>
                    <h1>Pancakes</h1>
                    <h3>Ingredients</h3>
                    <ul>
                        <li>1 cup milk</li>
                        <li>1 egg</li>
                        <li>2 tbsp butter</li>
                    </ul>
                </body>
            </html>
        `;
        const result = strategy.extract(html, url);
        expect(result?.ingredients).toHaveLength(3);
    });

    it('should extract instructions based on "Method" header', () => {
        const html = `
            <html>
                <body>
                    <h1>Pancakes</h1>
                    <h3>Method</h3>
                    <ol>
                        <li>Whisk everything together.</li>
                        <li>Heat the pan.</li>
                        <li>Cook until golden.</li>
                    </ol>
                </body>
            </html>
        `;
        const result = strategy.extract(html, url);
        expect(result?.instructions).toHaveLength(3);
    });

    it('should extract ingredients from paragraphs (text analysis)', () => {
         const html = `
            <html>
                <body>
                    <h1>Simple Salad</h1>
                    <div id="content">
                        <p>1 head of lettuce</p>
                        <p>2 tomatoes</p>
                        <p>1 cucumber</p>
                        <p>Salt and pepper</p>
                    </div>
                </body>
            </html>
        `;
        const result = strategy.extract(html, url);
        expect(result?.ingredients.length).toBeGreaterThanOrEqual(3);
    });

    it('should extract instructions from paragraphs (verb analysis)', () => {
        const html = `
           <html>
               <body>
                   <h1>Simple Salad</h1>
                   <div id="content">
                       <p>Chop the lettuce.</p>
                       <p>Slice the tomatoes.</p>
                       <p>Mix everything in a bowl.</p>
                       <p>Serve immediately.</p>
                   </div>
               </body>
           </html>
       `;
       const result = strategy.extract(html, url);
       expect(result?.instructions.length).toBeGreaterThanOrEqual(3);
   });
});
