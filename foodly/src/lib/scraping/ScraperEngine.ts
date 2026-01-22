import fs from 'fs';
import axios from 'axios';
import { Recipe } from './types';
import { JsonLdStrategy } from './strategies/JsonLdStrategy';
import { HtmlFallbackStrategy } from './strategies/HtmlFallbackStrategy';

export class ScraperEngine {
  private jsonLdStrategy: JsonLdStrategy;
  private htmlFallbackStrategy: HtmlFallbackStrategy;
  private userAgent: string;

  constructor() {
    this.jsonLdStrategy = new JsonLdStrategy();
    this.htmlFallbackStrategy = new HtmlFallbackStrategy();
    this.userAgent = 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36';
  }

  async scrape(url: string): Promise<Recipe | null> {
    try {
      const response = await axios.get(url, {
        headers: {
          'User-Agent': this.userAgent,
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
          'Accept-Language': 'pl-PL,pl;q=0.9,en-US;q=0.8,en;q=0.7',
          'Referer': url,
          'Origin': new URL(url).origin,
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache',
          'Sec-Fetch-Dest': 'document',
          'Sec-Fetch-Mode': 'navigate',
          'Sec-Fetch-Site': 'same-origin',
          'Sec-Fetch-User': '?1',
          'Upgrade-Insecure-Requests': '1'
        },
        timeout: 10000 // 10s timeout
      });

      const html = response.data;
      if (url.includes('jadlonomia.com')) {
          fs.writeFileSync('debug_full.html', html);
          console.log('[DEBUG] Saved debug_full.html');
      }

      // 1. Try JSON-LD
      console.log(`[Scraper] Trying JSON-LD for ${url}`);
      const jsonLdResult = this.jsonLdStrategy.extract(html, url);
      
      // Check completeness
      const isJsonLdComplete = jsonLdResult && 
                               jsonLdResult.ingredients.length > 0 && 
                               jsonLdResult.instructions.length > 0;

      if (isJsonLdComplete) {
        console.log(`[Scraper] JSON-LD success and complete`);
        return jsonLdResult;
      }

      // 2. Fallback to HTML
      console.log(`[Scraper] JSON-LD missing data (or failed), using fallback to supplement`);
      const fallbackResult = this.htmlFallbackStrategy.extract(html, url);

      if (!jsonLdResult) {
          return fallbackResult;
      }

      // Merge
      return {
          ...jsonLdResult,
          ingredients: jsonLdResult.ingredients.length > 0 ? jsonLdResult.ingredients : (fallbackResult?.ingredients || []),
          instructions: jsonLdResult.instructions.length > 0 ? jsonLdResult.instructions : (fallbackResult?.instructions || []),
          image: jsonLdResult.image || fallbackResult?.image,
          title: jsonLdResult.title || fallbackResult?.title || ""
      };

    } catch (error) {
      console.error(`[Scraper] Error fetching URL ${url}:`, error);
      return null;
    }
  }
}