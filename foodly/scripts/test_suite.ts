
import { ScraperEngine } from '../src/core/ScraperEngine';
import fs from 'fs';

const urls = [
    "https://aniagotuje.pl/przepis/lasagne-ze-szpinakiem",
    "https://www.kwestiasmaku.com/przepis/chakalaka-z-kurczakiem-i-kasza-peczak",
    "https://www.przepisy.pl/przepis/roladki-z-miesem-mielonym-i-cukinia",
    "https://aniastarmach.pl/przepis/kapusniaczki-idealne-do-barszczu/",
    "https://aniagotuje.pl/przepis/kotlety-mielone",
    "https://qoox.pl/blog/quam-nulla-porttitor-massa-neque-aliquam/?utm_source=google&utm_medium=cpc&utm_campaign=21984121089&gad_source=1&gad_campaignid=21984121089&gbraid=0AAAAA96_dtLybX6DMfoHhsCtpYgratq4D&gclid=CjwKCAiAj8LLBhAkEiwAJjbY79dQhncfNkgJbAV5VUy6DV0tV1noXeA91zjjBZF1bN9_XGApRqBlsxoCkvcQAvD_BwE",
    "https://www.kwestiasmaku.com/kuchnia_polska/pierogi/pierogi_ruskie/przepis.html",
    "https://kukbuk.pl/przepisy/pierogi-ruskie/",
    "https://nicponwkuchni.pl/pierogi-ruskie-ciasto-na-pierogi/",
    "https://poprostupycha.com.pl/przepis/najlepsze-pierogi-ruskie/",
    "https://aniastarmach.pl/przepis/pierogi-ruskie/",
    "https://specjalybracim.pl/jak-przygotowac-idealne-pierogi-ruskie-sekrety-szefa-kuchni-mateusza/",
    "https://mojcatering.com.pl/blog/przepis-na-idealne-pierogi-ruskie/?gad_source=1&gad_campaignid=21916217896&gbraid=0AAAAA-dZInkefhdPNFj-BMNT9mAgJpTkS&gclid=CjwKCAiAj8LLBhAkEiwAJjbY76wa8ACi2bUFrChwMvtWm-Qk3lEAzUl1m822lLWDvZzDqTM2CWUaQRoC3csQAvD_BwE",
    "https://kuchniaagaty.pl/przepisy/pierogi-ruskie",
    "https://skutecznie.tv/2010/11/pierogi-ruskie/",
    "https://www.olgasmile.com/ruskie-pierogi.html",
    "https://kuchnialidla.pl/pierogi-ukrainskie-klasyczny-przepis",
    "https://www.poezja-smaku.pl/najlepsze-pierogi-ruskie/",
    "https://www.zajadam.pl/dobre-przepisy/pierogi-ruskie",
    "https://jadlonomia.com/przepisy/weganskie-ruskie-pierogi/",
    "https://mojcatering.com.pl/blog/przepis-na-idealne-pierogi-ruskie/?srsltid=AfmBOoqrbrKzHhErti4JotfTBhmVxa20DiJ5FeVc82juPO4105PGXkCa",
    "https://zesmakiemnaty.pl/pierogi-ruskie-z-okrasa/"
];

async function main() {
    const engine = new ScraperEngine();
    let report = "# Foodly Scraper Test Report\n\n";
    report += `Date: ${new Date().toLocaleString()}\n\n`;
    
    let passCount = 0;
    let failCount = 0;

    for (const url of urls) {
        console.log(`Testing: ${url}`);
        report += `### URL: ${url}\n`;
        
        try {
            const result = await engine.scrape(url);
            
            if (!result) {
                console.log(`❌ FAILED: Null result`);
                report += "- **Status**: ❌ FAILED (Null Result)\n\n";
                failCount++;
                continue;
            }

            const hasTitle = !!result.title;
            const hasIngredients = result.ingredients.length >= 2;
            const hasInstructions = result.instructions.length >= 2;
            
            const isSuccess = hasTitle && hasIngredients && hasInstructions;

            if (isSuccess) {
                console.log(`✅ PASSED`);
                report += "- **Status**: ✅ PASSED\n";
                passCount++;
            } else {
                console.log(`❌ FAILED: Incomplete data`);
                report += "- **Status**: ❌ FAILED (Incomplete Data)\n";
                failCount++;
            }

            report += `- **Title**: ${result.title || "MISSING"}\n`;
            report += `- **Ingredients**: ${result.ingredients.length} found\n`;
            report += `- **Instructions**: ${result.instructions.length} found\n`;
            
            if (result.instructions.length > 0) {
                report += `- **First Instruction**: "${result.instructions[0].substring(0, 100)}"...\n`;
            } else {
                report += `- **First Instruction**: N/A\n`;
            }
            report += "\n";

        } catch (e) {
            console.log(`❌ ERROR: ${e}`);
            report += `- **Status**: ❌ ERROR (${e})\n\n`;
            failCount++;
        }
    }

    report += "## Summary\n";
    report += `- **Total**: ${urls.length}\n`;
    report += `- **Passed**: ${passCount}\n`;
    report += `- **Failed**: ${failCount}\n`;
    report += `- **Success Rate**: ${Math.round((passCount / urls.length) * 100)}%\n`;

    fs.writeFileSync('TEST_REPORT.md', report);
    console.log(`\nTest Complete. Report saved to foodly/TEST_REPORT.md`);
    console.log(`Passed: ${passCount}, Failed: ${failCount}`);
}

main();
