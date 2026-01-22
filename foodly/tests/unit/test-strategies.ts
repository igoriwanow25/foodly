import { JsonLdStrategy } from '../../src/lib/scraping/strategies/JsonLdStrategy';
import { HtmlFallbackStrategy } from '../../src/lib/scraping/strategies/HtmlFallbackStrategy';

const jsonLdStrategy = new JsonLdStrategy();
const fallbackStrategy = new HtmlFallbackStrategy();

const jsonLdTests = [
  {
    name: 'Simple JSON-LD',
    html: `
      <html>
        <script type="application/ld+json">
          {
            "@context": "https://schema.org/",
            "@type": "Recipe",
            "name": "Proste Ciasto",
            "image": "http://example.com/pie.jpg",
            "recipeIngredient": ["Jabłko", "Mąka"],
            "recipeInstructions": ["Wymieszaj", "Upiecz"]
          }
        </script>
      </html>
    `,
    expected: {
        title: "Proste Ciasto",
        image: "http://example.com/pie.jpg",
        ingredients: ["Jabłko", "Mąka"],
        instructions: ["Wymieszaj", "Upiecz"]
    }
  }
];

const fallbackTests = [
  {
    name: 'Fallback: Standard Classes',
    html: `
      <html>
        <head>
            <title>Szarlotka</title>
            <meta property="og:image" content="http://example.com/fallback.jpg" />
        </head>
        <body>
            <h1>Szarlotka</h1>
            <div class="ingredients">
                <p>3 Jabłka</p>
                <p>100g Cukier</p>
                <p>1kg Mąka</p>
            </div>
            <div class="instructions">
                <p>Wymieszaj dokładnie wszystkie składniki.</p>
                <p>Upiecz w nagrzanym piekarniku.</p>
            </div>
        </body>
      </html>
    `,
    expected: {
        title: "Szarlotka",
        image: "http://example.com/fallback.jpg",
        ingredients: ["3 Jabłka", "100g Cukier", "1kg Mąka"],
        instructions: ["Wymieszaj dokładnie wszystkie składniki.", "Upiecz w nagrzanym piekarniku."]
    }
  },
  {
    name: 'Fallback: WPRM Classes',
    html: `
      <html>
        <head>
            <meta property="og:title" content="WPRM Ciasto" />
        </head>
        <body>
            <h1>WPRM Ciasto</h1>
            <div class="wprm-recipe-ingredients">
                <ul>
                    <li class="ingredient">Jagody</li>
                    <li class="ingredient">Cukier</li>
                </ul>
            </div>
            <div class="wprm-recipe-instructions">
                <ul>
                    <li>Zgnieć jagody</li>
                    <li>Dodaj cukier</li>
                </ul>
            </div>
        </body>
      </html>
    `,
    expected: {
        title: "WPRM Ciasto",
        // Image optional
        ingredients: ["Jagody", "Cukier"],
        instructions: ["Zgnieć jagody", "Dodaj cukier"]
    }
  },
  {
    name: 'Fallback: Jadlonomia Style',
    html: `
      <html>
        <body>
            <h1>Wegańskie ruskie pierogi</h1>
            <div class="entry-content">
                <p>Wstęp...</p>
                <h3>Składniki na około 70 pierogów:</h3>
                <ul>
                    <li>600 g ziemniaków</li>
                    <li>1 duża cebula</li>
                    <li>olej</li>
                </ul>
                <h3>Składniki na farsz:</h3>
                <ul>
                    <li>500 g tofu, zwykłego naturalnego</li>
                    <li>½ – ⅔ szklanki wody z kiszonych ogórków</li>
                    <li>1/4 łyżeczki pieprzu ziołowego</li>
                    <li>sól</li>
                </ul>
                <h3>Przygotowanie:</h3>
                <ul>
                    <li>Ziemniaki obierz i ugotuj.</li>
                    <li>Tofu pokrusz.</li>
                </ul>
            </div>
        </body>
      </html>
    `,
    expected: {
        title: "Wegańskie ruskie pierogi",
        ingredients: ["600 g ziemniaków", "1 duża cebula", "olej", "500 g tofu, zwykłego naturalnego", "½ – ⅔ szklanki wody z kiszonych ogórków", "1/4 łyżeczki pieprzu ziołowego", "sól"], // Note: It might only pick the best list or merge? Current logic picks BEST list. 
        instructions: ["Ziemniaki obierz i ugotuj.", "Tofu pokrusz."]
    }
  }
];

async function runTests() {
    console.log("=== Running Strategy Tests ===");
    let failed = false;

    // JSON-LD Tests
    console.log("\n--- JSON-LD Strategy ---");
    for (const test of jsonLdTests) {
        console.log(`Test: ${test.name}`);
        const result = jsonLdStrategy.extract(test.html, "http://example.com/recipe");
        try {
            validateResult(result, test.expected);
            console.log("PASS");
        } catch (e: unknown) {
            const message = e instanceof Error ? e.message : 'An unknown error occurred';
            console.error(`FAIL: ${message}`);
            failed = true;
        }
    }

    // Fallback Tests
    console.log("\n--- HTML Fallback Strategy ---");
    for (const test of fallbackTests) {
        console.log(`Test: ${test.name}`);
        const result = fallbackStrategy.extract(test.html, "http://example.com/recipe");
        try {
             validateResult(result, test.expected);
             console.log("PASS");
        } catch (e: unknown) {
            const message = e instanceof Error ? e.message : 'An unknown error occurred';
            console.error(`FAIL: ${message}`);
            failed = true;
        }
    }

    if (failed) {
        console.error("\nSome tests failed.");
        process.exit(1);
    } else {
        console.log("\nAll tests passed!");
    }
}

import { Recipe } from '../../src/lib/scraping/types';
// ...
function validateResult(result: Partial<Recipe> | null, expected: Partial<Recipe>) {
    if (!result) throw new Error("Result is null");
    if (result.title !== expected.title) throw new Error(`Title mismatch: expected '${expected.title}', got '${result.title}'`);
    
    if (expected.image && result.image !== expected.image) throw new Error(`Image mismatch: expected '${expected.image}', got '${result.image}'`);
    
    if (JSON.stringify(result.ingredients) !== JSON.stringify(expected.ingredients)) throw new Error(`Ingredients mismatch. \nExpected: ${JSON.stringify(expected.ingredients)}\nGot: ${JSON.stringify(result.ingredients)}`);
    
    if (JSON.stringify(result.instructions) !== JSON.stringify(expected.instructions)) throw new Error(`Instructions mismatch. \nExpected: ${JSON.stringify(expected.instructions)}\nGot: ${JSON.stringify(result.instructions)}`);
}

runTests();
