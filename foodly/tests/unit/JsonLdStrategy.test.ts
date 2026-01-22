/**
 * @jest-environment node
 */
import { JsonLdStrategy } from '../../src/lib/scraping/strategies/JsonLdStrategy';

describe('JsonLdStrategy', () => {
  const strategy = new JsonLdStrategy();
  const url = 'http://example.com/recipe';

  it('should extract simple Recipe', () => {
    const html = `
      <html>
        <head>
          <script type="application/ld+json">
            {
              "@context": "https://schema.org/",
              "@type": "Recipe",
              "name": "Test Recipe",
              "image": "img.jpg",
              "recipeIngredient": ["Ing 1", "Ing 2"],
              "recipeInstructions": ["Step 1", "Step 2"]
            }
          </script>
        </head>
      </html>
    `;
    const result = strategy.extract(html, url);
    expect(result).not.toBeNull();
    expect(result?.title).toBe('Test Recipe');
    expect(result?.ingredients).toEqual(['Ing 1', 'Ing 2']);
    expect(result?.instructions).toEqual(['Step 1', 'Step 2']);
  });

  it('should extract from @graph', () => {
     const html = `
      <html>
        <head>
          <script type="application/ld+json">
            {
              "@context": "https://schema.org/",
              "@graph": [
                  { "@type": "WebPage", "name": "Page" },
                  {
                      "@type": "Recipe",
                      "name": "Graph Recipe",
                      "recipeIngredient": "Sugar",
                      "recipeInstructions": "Mix it."
                  }
              ]
            }
          </script>
        </head>
      </html>
    `;
    const result = strategy.extract(html, url);
    expect(result).not.toBeNull();
    expect(result?.title).toBe('Graph Recipe');
    expect(result?.ingredients).toEqual(['Sugar']);
    expect(result?.instructions).toEqual(['Mix it.']);
  });
  
  it('should handle array of types', () => {
       const html = `
      <html>
        <script type="application/ld+json">
            {
              "@context": "https://schema.org/",
              "@type": ["CreativeWork", "Recipe"],
              "name": "Multi Type",
              "recipeIngredient": ["A"],
              "recipeInstructions": "B"
            }
          </script>
      </html>
    `;
    const result = strategy.extract(html, url);
    expect(result?.title).toBe('Multi Type');
  });

   it('should handle complex instructions (HowToStep)', () => {
       const html = `
      <html>
        <script type="application/ld+json">
            {
              "@context": "https://schema.org/",
              "@type": "Recipe",
              "name": "Step Recipe",
              "recipeInstructions": [
                  { "@type": "HowToStep", "text": "Step 1" },
                  { "@type": "HowToStep", "text": "Step 2" }
              ]
            }
          </script>
      </html>
    `;
    const result = strategy.extract(html, url);
    expect(result?.instructions).toEqual(['Step 1', 'Step 2']);
  });

  it('should handle complex instructions (HowToSection)', () => {
       const html = `
      <html>
        <script type="application/ld+json">
            {
              "@context": "https://schema.org/",
              "@type": "Recipe",
              "name": "Section Recipe",
              "recipeInstructions": [
                  { 
                      "@type": "HowToSection", 
                      "itemListElement": [
                          { "@type": "HowToStep", "text": "S1" }
                      ] 
                  }
              ]
            }
          </script>
      </html>
    `;
    const result = strategy.extract(html, url);
    expect(result?.instructions).toEqual(['S1']);
  });

  it('should normalize image object', () => {
    const html = `
   <html>
     <script type="application/ld+json">
         {
           "@context": "https://schema.org/",
           "@type": "Recipe",
           "name": "Img Recipe",
           "image": {
             "@type": "ImageObject",
             "url": "https://example.com/img.jpg"
           }
         }
       </script>
   </html>
 `;
 const result = strategy.extract(html, url);
 expect(result?.image).toBe('https://example.com/img.jpg');
});

it('should normalize image array', () => {
  const html = `
 <html>
   <script type="application/ld+json">
       {
         "@context": "https://schema.org/",
         "@type": "Recipe",
         "name": "Img Arr Recipe",
         "image": ["https://example.com/img1.jpg", "https://example.com/img2.jpg"]
       }
     </script>
 </html>
`;
const result = strategy.extract(html, url);
expect(result?.image).toBe('https://example.com/img1.jpg');
});

});