import * as cheerio from 'cheerio';
import { Recipe } from '../types';
import { HtmlFallbackStrategy } from './HtmlFallbackStrategy';

export class FacebookStrategy {
  private fallbackStrategy = new HtmlFallbackStrategy();

  extract(html: string, url: string): Recipe | null {
    if (!url.includes('facebook.com') && !url.includes('fb.watch')) {
      return null;
    }

    const $ = cheerio.load(html);
    let recipeText = '';

    // 1. Try Title (often contains full text for videos)
    const title = $('title').text();
    if (title.length > 200 && (title.includes('\n') || title.includes('Składniki') || title.includes('Ingredients'))) {
        recipeText = title;
    }

    // 2. Try JSON blobs (SSR data)
    if (!recipeText) {
        $('script[type="application/json"]').each((_, el) => {
            try {
                const content = $(el).html();
                if (!content) return;
                const json = JSON.parse(content);
                
                const foundText = this.findRecipeTextInJson(json);
                if (foundText && foundText.length > recipeText.length) {
                    recipeText = foundText;
                }
            } catch (e) {
                // ignore parse errors
            }
        });
    }

    if (!recipeText) return null;

    // 3. Convert text to HTML for the fallback strategy
    // We treat newlines as paragraphs to allow the existing logic to work
    const fakeHtml = `
        <html>
            <body>
                <h1>Facebook Recipe</h1>
                <div class="facebook-content">
                    ${recipeText.split('\n').map(line => `<p>${line.trim()}</p>`).join('')}
                </div>
            </body>
        </html>
    `;

    // 4. Delegate to HtmlFallbackStrategy
    // We pass the original URL so it can try to extract the real title if needed, 
    // but here we primarily want the ingredients/instructions parsing.
    const result = this.fallbackStrategy.extract(fakeHtml, url);

    if (result) {
        // Facebook specific cleanups?
        // The title might be "Facebook Recipe" from our fake HTML if fallback didn't find a better one.
        // We might want to use a substring of the text as title if result.title is generic.
        if (result.title === 'Facebook Recipe') {
             // Try to extract first line as title
             const firstLine = recipeText.trim().split('\n')[0];
             if (firstLine.length < 100) {
                 result.title = firstLine;
             }
        }
        // Image?
        // We can try to extract og:image from the original HTML
        const ogImage = $('meta[property="og:image"]').attr('content');
        if (ogImage) {
            result.image = ogImage;
        }
    }

    return result;
  }

  private findRecipeTextInJson(data: any): string | null {
      if (!data) return null;

      // Check for specific path usually found in FB video posts
      // creation_story.message.text
      if (data.creation_story && data.creation_story.message && data.creation_story.message.text) {
          return data.creation_story.message.text;
      }

      // Check graph/edges recursively?
      // FB JSONs are huge. We should target specific keys like "message" or "text" inside "story" objects.
      
      if (typeof data === 'object') {
          for (const key in data) {
              if (key === 'message' && data[key] && data[key].text) {
                  return data[key].text;
              }
              if (typeof data[key] === 'object') {
                  const res = this.findRecipeTextInJson(data[key]);
                  if (res) return res;
              }
          }
      }
      
      return null;
  }
}