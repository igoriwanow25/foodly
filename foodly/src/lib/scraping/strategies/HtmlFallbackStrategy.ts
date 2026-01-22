import * as cheerio from 'cheerio';
import he from 'he';
import { Recipe } from '../types';

export class HtmlFallbackStrategy {
  extract(html: string, url: string): Recipe | null {
    const $ = cheerio.load(html);

    // Remove known noise
    $('.comments, #comments, #Comments, #CommentsWrapper, .comment-list, .commentlist, .comment-respond, .sidebar, footer, nav, header, .meta, .post-meta, .related-posts, .social-share, .ad-container').remove();
    
    // Remove everything after "Komentarze" header
    $('h2, h3, h4, h5').each((_, el) => {
        if (/komentarze|comments|opinie/i.test($(el).text())) {
            $(el).nextAll().remove();
            $(el).remove();
        }
    });

    // Title Extraction
    const title = he.decode($('h1').first().text().trim() || 
                  $('meta[property="og:title"]').attr('content') || 
                  $('title').text().trim() || "");

    if (!title) return null;

    // Image Extraction
    const image = $('meta[property="og:image"]').attr('content') ||
                  $('meta[name="twitter:image"]').attr('content');

    // Use body as root to avoid missing content, but rely on scoring to filter noise
    const $root = $('body');

    // Candidate finding
    const candidates: { element: cheerio.Cheerio<any>, items: string[], scoreIng: number, scoreInst: number }[] = [];

    // 1. Look for lists (ul, ol)
    $root.find('ul, ol').each((_, el) => {
        const items = this.extractListItems($, $(el));
        if (items.length >= 2) {
            candidates.push({
                element: $(el),
                items,
                scoreIng: 0,
                scoreInst: 0
            });
        }
    });

    // Scoring
    for (const candidate of candidates) {
        candidate.scoreIng = this.calculateIngredientScore(candidate.items);
        candidate.scoreInst = this.calculateInstructionScore(candidate.items);

        // Penalize instruction score if it looks like ingredients
        if (candidate.scoreIng > 3) {
            candidate.scoreInst -= 10;
        }

        // Contextual boosting based on parents/classes
        const classes = candidate.element.attr('class') || "";
        const id = candidate.element.attr('id') || "";
        const combinedAttr = (classes + " " + id).toLowerCase();

        // Check parents for semantic classes
        let parentAttr = "";
        candidate.element.parents().each((_, parent) => {
            const pClass = $(parent).attr('class') || "";
            const pId = $(parent).attr('id') || "";
            parentAttr += " " + pClass + " " + pId;
        });
        parentAttr = parentAttr.toLowerCase();

        // Ingredients Boost
        if (/skladniki|ingredients|products/i.test(combinedAttr)) candidate.scoreIng += 10;
        if (/skladniki|ingredients|products/i.test(parentAttr)) candidate.scoreIng += 10;
        if (candidate.element.parents('.ingredients, .skladniki').length > 0) candidate.scoreIng += 5; // Keep exact match boost too
        
        // Instructions Boost
        if (/przygotowanie|instructions|steps|sposob/i.test(combinedAttr)) candidate.scoreInst += 10;
        if (/przygotowanie|instructions|steps|sposob/i.test(parentAttr)) candidate.scoreInst += 10;
        if (candidate.element.parents('.instructions, .przygotowanie, .steps').length > 0) candidate.scoreInst += 5;

        // Header check (look at previous sibling)
        const prevHeader = candidate.element.prevAll('h2, h3, h4, strong, p, div').first().text().toLowerCase();
        if (/składniki|potrzebujesz|zakupy/i.test(prevHeader)) candidate.scoreIng += 5;
        if (/przygotowanie|wykonanie|robimy|przepis|instrukc/i.test(prevHeader)) candidate.scoreInst += 5;
    }

    // Selection
    const sortedByIng = [...candidates].sort((a, b) => b.scoreIng - a.scoreIng);
    let bestIngredients = sortedByIng[0];

    // Multi-list merging for Ingredients
    if (bestIngredients && bestIngredients.scoreIng > 3) {
        // Find other candidates that are likely also ingredients
        const otherIngredientLists = candidates.filter(c => 
            c !== bestIngredients && 
            c.scoreIng > 3 && 
            c.scoreIng >= bestIngredients.scoreIng * 0.5 && // Within reasonable range
            c.scoreInst < c.scoreIng // Clearly ingredients, not instructions
        );

        if (otherIngredientLists.length > 0) {
            // Sort by document position (we don't have explicit index, but we can rely on how they were pushed)
            // candidates were pushed in document order ($root.find returns order).
            // So just use the original candidates array order.
            
            const allIngCandidates = [bestIngredients, ...otherIngredientLists];
            // Re-sort based on original index in 'candidates' array to maintain document order
            const mergedItems: string[] = [];
            
            for (const c of candidates) {
                if (allIngCandidates.includes(c)) {
                    mergedItems.push(...c.items);
                }
            }
            
            bestIngredients = {
                ...bestIngredients,
                items: mergedItems
            };
        }
    }

    // Fallback for Ingredients (Paragraphs)
    if (!bestIngredients || bestIngredients.scoreIng < 1) {
        const paragraphIngredients = this.extractParagraphIngredients($, $root);
        if (paragraphIngredients.length > 2) {
            bestIngredients = {
                element: $root,
                items: paragraphIngredients,
                scoreIng: 10,
                scoreInst: 0
            };
        }
    }

    // Instructions Selection
    const remainingCandidates = candidates.filter(c => {
        // If it was selected as best ingredients but has a very low score, don't exclude it
        // unless we are sure it's not instructions.
        if (c === bestIngredients && c.scoreIng >= 1) return false; 
        if (c.scoreIng >= 4) return false; // Strongly ingredients
        return true;
    });
    const sortedByInst = [...remainingCandidates].sort((a, b) => b.scoreInst - a.scoreInst);
    let bestInstructions = sortedByInst[0];

    // Fallback for Instructions (Paragraphs)
    if (!bestInstructions || bestInstructions.scoreInst < 1) {
         const paragraphInstructions = this.extractParagraphInstructions($, $root);
         if (paragraphInstructions.length > 0) {
             bestInstructions = {
                 element: $root, // dummy
                 items: paragraphInstructions,
                 scoreIng: 0,
                 scoreInst: 5
             };
         }
    }

    // Final Cleanup
    const ingredients = bestIngredients && bestIngredients.scoreIng > 0 ? this.clean(bestIngredients.items, 'ingredients') : [];
    const instructions = bestInstructions && bestInstructions.scoreInst > -5 ? this.clean(bestInstructions.items, 'instructions') : [];

    return {
      title,
      image,
      ingredients,
      instructions,
      url
    };
  }

  private extractListItems($: cheerio.CheerioAPI, container: cheerio.Cheerio<any>): string[] {
      const items: string[] = [];
      container.find('li').each((_, el) => {
          items.push($(el).text().trim());
      });
      return items.filter(i => i.length > 0);
  }

  private extractParagraphIngredients($: cheerio.CheerioAPI, $root: cheerio.Cheerio<any>): string[] {
      const items: string[] = [];
      const unitRegex = /^(\d+|[½⅓¼¾])\s*([a-zA-Złóż]+)?/i; // Starts with number/fraction
      
      $root.find('p, div').each((_, el) => {
          if ($(el).closest('.comments, #comments, #Comments, .meta, .comment-body').length > 0) return;
          if ($(el).children('p, div, ul, ol').length > 0) return;

          const text = $(el).text().trim();
          if (text.length < 3 || text.length > 150) return;

          // Check if looks like ingredient
          if (unitRegex.test(text) || /^(sól|pieprz|cukier|olej|mąka)/i.test(text)) {
               // Must not look like instruction (verb check)
               const verbRegex = /gotuj|smaż|piecz|mieszaj/i;
               if (!verbRegex.test(text)) {
                   items.push(text);
               }
          }
      });
      return items;
  }

  private extractParagraphInstructions($: cheerio.CheerioAPI, $root: cheerio.Cheerio<any>): string[] {
      const items: string[] = [];
      $root.find('p, div').each((_, el) => {
          if ($(el).closest('.comments, #comments, #Comments, .meta, .comment-body').length > 0) return;
          if ($(el).children('p, div, ul, ol').length > 0) return;

          const text = $(el).text().trim();
          if (text.length < 15 || text.length > 1000) return;
          if (/^(\d{1,2}\.\s|Krok \d|Etap \d)/i.test(text)) {
              items.push(text);
              return;
          }

          // Optimized Verb List (Stems + Infinitives + Imperatives)
          const verbs = [
              "gotuj", "gotow", "zagotuj", "smaż", "podsmaż", "piecz", "upiecz", "duś", "udus", "blansz", "grill", "wędz", "pasteryz", "praż",
              "krój", "kroi", "pokrój", "siek", "posiek", "trzyj", "trze", "zetrzyj", "miel", "zmiel", "tłucz", "utłucz",
              "obier", "obra", "myj", "umy", "płucz", "opłucz", "susz", "osus",
              "rozdrabn", "rozdrobn", "gnieć", "zgnieć", "rozgniat", "rozgnieć", "przecisk", "przeciś",
              "przepuszcz", "przepuś",
              "miesz", "wymiesz", "miks", "zmiks", "blend", "zblend", "ucier", "utrzyj", "ubij",
              "zagniat", "zagnie", "wyrabi", "wyrób", "wałk", "rozwałk", "lep", "zlep", "klej", "sklej", "wykraw", "wykrój", "form", "uform",
              "łącz", "połącz", "dodaw", "doda", "wsyp", "wlew", "wla", "dolew", "dola",
              "ugniata", "ugnie",
              "dopraw", "sól", "posól", "pieprz", "popieprz", "słodź", "posłodź",
              "dekor", "udekor", "posyp", "polew", "pola", "nakład", "nałóż", "podaw", "poda",
              "wykład", "wyłóż", "przekład", "przełóż", "odcedz", "odcedź", "odlew", "odla", "studź", "ostudź", "wystudź",
              "nadziew", "nadziej",
              "wyjmuj", "wyjmow", "wyją",
              "zeszkl", 
              "obrac", "obróć", "układ", "ułóż",
              "rozpuszcz", "rozpuś"
          ];
          const verbRegex = new RegExp(`\\b(${verbs.join('|')})`, 'i');
          
          const words = text.split(/\s+/).length;
          
          if (verbRegex.test(text)) {
              const startsWithVerb = verbRegex.test(text.substring(0, 20)); 
              const verbCount = (text.match(new RegExp(verbRegex, 'gi')) || []).length;
              
              if ((startsWithVerb && words > 3) || verbCount > 1 || words > 15) {
                   if (!/^(to jest|jest to|moje|nasze|ten przepis)/i.test(text)) {
                       if (!/\b(spróbuj|polecam|zapraszam)\b/i.test(text)) {
                            items.push(text);
                       }
                   }
              }
          }
      });
      return items;
  }

  private calculateIngredientScore(items: string[]): number {
      let score = 0;
      const unitRegex = /^[0-9]| [0-9]|g\b|kg\b|ml\b|l\b|dag\b|szklank|łyż|sztuk|opakowan/i;
      const ingredientCommonRegex = /sól|cukier|olej|woda|pieprz|mąka|cebula|czosnek|jajk|mleko/i;
      
      let unitMatches = 0;
      let commonMatches = 0;

      for (const item of items) {
          if (unitRegex.test(item)) unitMatches++;
          if (ingredientCommonRegex.test(item)) commonMatches++;
          if (item.length > 150) score -= 2; 
      }

      const ratio = items.length > 0 ? (unitMatches + commonMatches) / items.length : 0;
      if (ratio > 0.5) score += 5;
      score += unitMatches * 0.5;

      return score;
  }

  private calculateInstructionScore(items: string[]): number {
      let score = 0;
      const verbs = [
          "gotuj", "gotow", "zagotuj", "smaż", "podsmaż", "piecz", "upiecz", "duś", "udus", "blansz", "grill", "wędz", "pasteryz", "praż",
          "krój", "kroi", "pokrój", "siek", "posiek", "trzyj", "trze", "zetrzyj", "miel", "zmiel", "tłucz", "utłucz",
          "obier", "obra", "myj", "umy", "płucz", "opłucz", "susz", "osus",
          "rozdrabn", "rozdrobn", "gnieć", "zgnieć", "rozgniat", "rozgnieć", "przecisk", "przeciś",
          "przepuszcz", "przepuś",
          "miesz", "wymiesz", "miks", "zmiks", "blend", "zblend", "ucier", "utrzyj", "ubij",
          "zagniat", "zagnie", "wyrabi", "wyrób", "wałk", "rozwałk", "lep", "zlep", "klej", "sklej", "wykraw", "wykrój", "form", "uform",
          "łącz", "połącz", "dodaw", "doda", "wsyp", "wlew", "wla", "dolew", "dola",
          "ugniata", "ugnie",
          "dopraw", "sól", "posól", "pieprz", "popieprz", "słodź", "posłodź",
          "dekor", "udekor", "posyp", "polew", "pola", "nakład", "nałóż", "podaw", "poda",
          "wykład", "wyłóż", "przekład", "przełóż", "odcedz", "odcedź", "odlew", "odla", "studź", "ostudź", "wystudź",
          "nadziew", "nadziej",
          "wyjmuj", "wyjmow", "wyją",
          "zeszkl", 
          "obrac", "obróć", "układ", "ułóż",
          "rozpuszcz", "rozpuś"
      ];
      const verbRegex = new RegExp(`\\b(${verbs.join('|')})`, 'i');
      const badStartRegex = /^(\d+ g|\d+ kg|\d+ ml|składniki|products|ingredients)/i;

      let verbMatches = 0;
      let badStarts = 0;

      for (const item of items) {
          if (verbRegex.test(item)) verbMatches++;
          if (badStartRegex.test(item)) badStarts++;
          
          if (item.length > 30) score += 0.5;
          if (item.length < 10) score -= 1;
      }

      if (badStarts > items.length * 0.3) score -= 10;

      const ratio = items.length > 0 ? verbMatches / items.length : 0;
      if (ratio > 0.3) score += 5;
      score += verbMatches * 0.5;

      return score;
  }

  private clean(list: string[], type: 'ingredients' | 'instructions') {
      return list
        .map(s => {
            let clean = s.replace(/<[^>]*>?/gm, '');
            clean = he.decode(clean).replace(/\s+/g, ' ').trim();
            return clean;
        })
        .filter(s => {
            if (s.length < 3) return false;
            const lower = s.toLowerCase();
            if (/^(składniki|przygotowanie|reklama|social|facebook|instagram|udostępnij)/i.test(lower)) return false;
            
            if (type === 'instructions') {
                if (/czas przygotowania|stopień trudności|kalorie|autor:|data publikacji/i.test(lower)) return false;
                if (/^http/i.test(lower)) return false;
                if (/komentarz|odpowiedz/i.test(lower)) return false;
            }
            return true;
        });
  }
}
