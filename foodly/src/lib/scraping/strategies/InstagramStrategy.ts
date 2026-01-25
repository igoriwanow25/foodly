import { ScraperStrategy } from '../ScraperEngine';
import { Recipe } from '../types';
import * as cheerio from 'cheerio';
import he from 'he';

export class InstagramStrategy implements ScraperStrategy {
  scrape(html: string, url: string): Recipe | null {
    const $ = cheerio.load(html);
    let description = '';
    let image = '';
    let title = '';

    // 1. Try to find the JSON blob first (Most reliable for full text)
    const scriptTags = $('script[type="application/json"]');
    
    // Extract shortcode from URL
    // If URL is not provided (should not happen with updated engine), try to find og:url
    const targetUrl = url || $('meta[property="og:url"]').attr('content') || '';
    const shortcodeMatch = targetUrl.match(/(?:p|reel|tv)\/([a-zA-Z0-9_-]+)/);
    const targetShortcode = shortcodeMatch ? shortcodeMatch[1] : null;

    if (targetShortcode) {
        scriptTags.each((_, el) => {
            if (description) return; // Found it already

            const content = $(el).html();
            if (!content) return;

            try {
                // Fast check: does it contain the shortcode?
                if (!content.includes(targetShortcode)) return;

                const data = JSON.parse(content);
                
                // Function to recursively search for the media object with the matching shortcode
                const findMedia = (obj: any): any => {
                    if (!obj || typeof obj !== 'object') return null;
                    
                    // Check if this object is the media we are looking for
                    // It usually has a 'code' or 'shortcode' field matching the URL
                    // And a 'caption' field with 'text'
                    if ((obj.code === targetShortcode || obj.shortcode === targetShortcode) && obj.caption?.text) {
                        return obj;
                    }

                    if (Array.isArray(obj)) {
                        for (const item of obj) {
                            const found = findMedia(item);
                            if (found) return found;
                        }
                    } else {
                        for (const key in obj) {
                            const found = findMedia(obj[key]);
                            if (found) return found;
                        }
                    }
                    return null;
                };

                const media = findMedia(data);
                if (media) {
                    description = media.caption.text;
                    // Try to get high-res image
                    if (media.image_versions2?.candidates?.[0]?.url) {
                        image = media.image_versions2.candidates[0].url;
                    }
                }

            } catch (e) {
                // Ignore parse errors
            }
        });
    }

    // 2. Fallback to Meta Tags
    if (!description) {
        description = he.decode($('meta[property="og:description"]').attr('content') || '');
    }
    
    if (!image) {
        image = $('meta[property="og:image"]').attr('content') || '';
    }
    
    if (!title) {
         title = he.decode($('meta[property="og:title"]').attr('content') || '');
         // Clean up title
        const firstQuote = title.indexOf('"');
        if (firstQuote !== -1) {
            const lastQuote = title.lastIndexOf('"');
            if (lastQuote !== -1) {
                title = title.substring(firstQuote + 1, lastQuote);
            }
        }
    }

    if (!description) {
      return null;
    }
    
    const lines = description.replace(/\\n/g, '\n').split('\n');
    const ingredients: string[] = [];
    const instructions: string[] = [];
    
    let ingredientsStarted = false;
    let instructionsStarted = false;

    // Regex patterns
    const strongIngredientsHeader = /^(?:ingredients|what you need|składniki|na \d+)/i;
    const weakIngredientsHeader = /^(?:for the|ciasto|farsz|sos)/i;
    const instructionsHeader = /^(?:instructions|directions|method|preparation|how to make|steps|sposób przygotowania|przygotowanie|wykonanie|robimy)/i;
    const instructionStep = /^(\d+[\.)]|\u2022|\-)\s+/; // 1. or 1) or bullet or -
    const ingredientItem = /^(\-|\u2022|\*|•)\s+/; 

    for (const line of lines) {
      const trimmedLine = line.trim();
      if (trimmedLine.length === 0) continue;

      // Check for headers
      if (instructionsHeader.test(trimmedLine)) {
          instructionsStarted = true;
          ingredientsStarted = false;
          continue;
      }
      
      if (strongIngredientsHeader.test(trimmedLine)) {
          ingredientsStarted = true;
          instructionsStarted = false;
          continue;
      }

      // Weak headers only switch mode if we aren't already in instructions
      if (!instructionsStarted && weakIngredientsHeader.test(trimmedLine)) {
          ingredientsStarted = true;
          // instructionsStarted = false; // Already false
          continue;
      }

      // Heuristic: If we see numbered list, likely instructions
      if (/^\d+[\.)]/.test(trimmedLine)) {
          instructionsStarted = true;
          ingredientsStarted = false;
      }

      if (instructionsStarted) {
        instructions.push(trimmedLine);
      } else if (ingredientsStarted) {
        // Only add if it looks like a list item OR if we are explicitly in ingredients section
        // But be careful not to add random text
        ingredients.push(trimmedLine);
      } else {
          // Attempt to auto-detect ingredients if they start with typical bullets
          if (ingredientItem.test(trimmedLine)) {
              ingredientsStarted = true;
              ingredients.push(trimmedLine);
          }
      }
    }

    // Fallback title extraction if meta title was poor
    if (!title && ingredients.length > 0) {
        title = "Instagram Recipe"; 
    }

    return {
      title,
      image: image || '',
      ingredients,
      instructions,
      url: targetUrl,
    };
  }
}