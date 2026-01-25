import * as cheerio from 'cheerio';
import he from 'he';
import { Recipe } from '../types';

export class InstagramStrategy {
  extract(html: string, url: string): Recipe | null {
    const $ = cheerio.load(html);
    let description = '';
    let image = '';
    let title = '';

    // 1. Try to find the JSON blob first (Most reliable for full text)
    const scriptTags = $('script[type="application/json"]');
    
    // Extract shortcode from URL
    const shortcodeMatch = url.match(/(?:p|reel|tv)\/([a-zA-Z0-9_-]+)/);
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

    for (const line of lines) {
      const trimmedLine = line.trim();
      if (trimmedLine.length === 0) continue;

      if (/^\d+\.\s/.test(trimmedLine)) {
        instructionsStarted = true;
        ingredientsStarted = false; // Once instructions start, stop ingredient parsing
      } else if (!instructionsStarted && (/^For the/.test(trimmedLine) || /^-/.test(trimmedLine))) {
        ingredientsStarted = true;
      }
      
      if (instructionsStarted) {
        instructions.push(trimmedLine);
      } else if (ingredientsStarted) {
        ingredients.push(trimmedLine);
      }
    }

    return {
      title,
      image: image || '',
      ingredients,
      instructions,
      url,
    };
  }
}
