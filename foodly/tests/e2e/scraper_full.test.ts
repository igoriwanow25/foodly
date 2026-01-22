/**
 * @jest-environment node
 */

import { ScraperEngine } from '../../src/lib/scraping/ScraperEngine';
import fs from 'fs';

jest.unmock('axios');

const urls = [
    "https://aniagotuje.pl/przepis/lasagne-ze-szpinakiem",
    "https://www.kwestiasmaku.com/przepis/chakalaka-z-kurczakiem-i-kasza-peczak",
    "https://www.przepisy.pl/przepis/roladki-z-miesem-mielonym-i-cukinia",
];

describe('E2E Scraper Tests', () => {
  it('should scrape recipes from a list of URLs and generate a report', async () => {
    const engine = new ScraperEngine();
    let report = "# Foodly Scraper Test Report\n\n";
    report += `Date: ${new Date().toLocaleString()}\n\n`;
    
    let passCount = 0;
    let failCount = 0;

    for (const url of urls) {
        report += `### URL: ${url}\n`;
        
        try {
            const result = await engine.scrape(url);
            
            if (!result) {
                report += "- **Status**: ❌ FAILED (Null Result)\n\n";
                failCount++;
                continue;
            }

            const hasTitle = !!result.title;
            const hasIngredients = result.ingredients.length >= 2;
            const hasInstructions = result.instructions.length >= 2;
            
            const isSuccess = hasTitle && hasIngredients && hasInstructions;

            if (isSuccess) {
                report += "- **Status**: ✅ PASSED\n";
                passCount++;
            } else {
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

    expect(failCount).toBe(0);
  }, 30000); // 30s timeout
});
