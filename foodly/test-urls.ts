import { ScraperEngine } from './src/core/ScraperEngine';

const urls = [
    'https://zesmakiemnaty.pl/harira-marokanska-zupa-z-ciecierzyca-i-soczewica/',
    'https://aniagotuje.pl/przepis/lasagne-ze-szpinakiem',
    'https://www.kwestiasmaku.com/przepis/chakalaka-z-kurczakiem-i-kasza-peczak',
    'https://www.przepisy.pl/przepis/roladki-z-miesem-mielonym-i-cukinia',
    'https://aniastarmach.pl/przepis/kapusniaczki-idealne-do-barszczu/'
];

async function test() {
    const engine = new ScraperEngine();
    for (const url of urls) {
        console.log(`
--- Testing URL: ${url} ---`);
        const result = await engine.scrape(url);
        if (result) {
            console.log(`Title: ${result.title}`);
            console.log(`Ingredients: ${result.ingredients.length}`);
            console.log(`Instructions: ${result.instructions.length}`);
            if (result.ingredients.length === 0 || result.instructions.length === 0) {
                console.log("FAILED to extract ingredients or instructions.");
            } else {
                console.log("SUCCESS");
            }
        } else {
            console.log("CRITICAL FAILURE: Scrape returned null");
        }
    }
}

test();
