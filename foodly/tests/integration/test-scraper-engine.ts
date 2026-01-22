import http from 'http';
import { ScraperEngine } from '../../src/core/ScraperEngine';

const PORT = 3456;
const BASE_URL = `http://localhost:${PORT}`;

const htmlContent = `
<!DOCTYPE html>
<html>
<head>
    <title>Test Recipe</title>
</head>
<body>
    <h1>Tasty Test</h1>
    <script type="application/ld+json">
    {
        "@context": "https://schema.org",
        "@type": "Recipe",
        "name": "Tasty Test",
        "image": "http://example.com/img.jpg",
        "recipeIngredient": ["Salt", "Pepper"],
        "recipeInstructions": ["Shake", "Serve"]
    }
    </script>
</body>
</html>
`;

const server = http.createServer((req, res) => {
    if (req.url === '/recipe') {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end(htmlContent);
    } else {
        res.writeHead(404);
        res.end('Not Found');
    }
});

async function runTests() {
    console.log("=== Running ScraperEngine Integration Tests ===");
    
    // Start server
    await new Promise<void>((resolve) => server.listen(PORT, resolve));
    console.log(`Test server running at ${BASE_URL}`);

    const engine = new ScraperEngine();
    let failed = false;

    try {
        console.log("Test: Fetching /recipe");
        const recipe = await engine.scrape(`${BASE_URL}/recipe`);

        if (!recipe) throw new Error("Result is null");
        if (recipe.title !== "Tasty Test") throw new Error(`Title mismatch. Got: ${recipe.title}`);
        if (recipe.ingredients.length !== 2) throw new Error("Ingredients length mismatch");
        console.log("PASS");

    } catch (e: any) {
        console.error(`FAIL: ${e.message}`);
        failed = true;
    } finally {
        server.close();
    }

    if (failed) process.exit(1);
    else console.log("All integration tests passed!");
}

runTests();
