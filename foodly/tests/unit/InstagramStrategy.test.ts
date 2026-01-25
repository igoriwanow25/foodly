import * as fs from 'fs';
import * as path from 'path';
import { InstagramStrategy } from '../../src/core/strategies/InstagramStrategy';

describe('InstagramStrategy', () => {
  const strategy = new InstagramStrategy();
  const url = 'https://www.instagram.com/p/DTgTW1FkrXr/';

  it('should extract the recipe correctly', () => {
    const htmlPath = path.join(__dirname, '..', 'fixtures', 'instagram', 'ig_0.html');
    const html = fs.readFileSync(htmlPath, 'utf-8');
    const result = strategy.extract(html, url);

    expect(result).not.toBeNull();
    expect(result?.title).toBe('Sheet Pan Beef Kefta Wraps 🔥');
    expect(result?.image).toBe('https://scontent-waw2-2.cdninstagram.com/v/t51.82787-15/616110945_17934757530151947_8597842089101681526_n.jpg?stp=cmp1_dst-jpg_e35_s640x640_tt6&_nc_cat=103&ccb=7-5&_nc_sid=18de74&efg=eyJlZmdfdGFnIjoiQ0xJUFMuYmVzdF9pbWFnZV91cmxnZW4uQzMifQ%3D%3D&_nc_ohc=TeADpmtXBm4Q7kNvwHfKSd6&_nc_oc=AdkotdNoWNFAcQoQgzGGI92eB3iCUBaGyItEN4ILCi6NVnDEpZ10tHFg8tDbQLOtmVSWLVjO1kXOmDLvF-DklT63&_nc_zt=23&_nc_ht=scontent-waw2-2.cdninstagram.com&_nc_gid=IsT4RYKq-p-ZJDQl1Xsnug&oh=00_Afou96b4cnhoV2qKQ57mQuXrSV318I6EkUmEVeXfyFOEQg&oe=697BC048');
    expect(result?.ingredients).toEqual([
      "For the Beef Kefta:",
      "-1.5-2lbs lbs lean ground beef (700-900 g)",
      "-8 garlic cloves, minced",
      "-2 tsp smoked paprika, 2 tsp cumin, 1 tsp allspice, 2 tsp salt, 2 tsp black pepper, 1 tsp turmeric, 1 tsp cinnamon",
      "-1/3 cup fresh parsley, chopped",
      "-1/3 cup fresh cilantro, chopped (optional)",
      "-1 large or 2 medium yellow onions, grated + squeezed dry*",
      "-On top before baking: 4 tbsp olive oil",
      "For the Roasted Garlic:",
      "-2 garlic heads, 1 tbsp olive oil and 1 tsp salt",
      "For the Fresh Salad:",
      "-1/2 large red onion, thinly sliced",
      "-1 cup cherry tomatoes, quartered",
      "-1/4 cup fresh parsley, chopped",
      "-1 tsp salt, 1 tsp pepper & 2 tsp sumac",
      "-Juice of 1/2 lemon",
      "Roasted Garlic Paprika Sauce:",
      "-Roasted garlic cloves, 1/2 cup Greek yogurt, juice of 1/2 lemon, 3 tbsp tahini, 2 heads of roasted garlic, 2 tbsp ice water, 1 tsp each: paprika, cumin, salt, pepper. Optionally add fresh chopped parlsey/cilantro."
    ]);
    expect(result?.instructions).toEqual([
      "1. Preheat oven to 400°F (205°C). Slice the tops off two garlic heads, drizzle with olive oil and salt, wrap in foil, & roast for 45–60 mins until golden and soft. While the garlic roasts, prep the kefta.",
      "2. Grate the onion, squeeze out all liquid with paper towel or cheesecloth (prevents watery kefta.) In a large bowl, combine beef, garlic, spices, parsley, cilantro (if using), and the grated onion. Mix with your hands for 2–3 minutes until sticky & well combined.",
      "3. Spread onto the sheet pan in a 1/2-inch (1.25 cm) thick rectangle. With a knife, score into 1-inch strips (2.5 cm). Drizzle evenly with 4 tbsp olive oil. Bake for 12–15 minutes at 400°F, then broil 2–5 minutes until golden & crisp on top. Careful removing!",
      "4. Toss onion, tomatoes, parsley, salt, pepper, sumac, & lemon juice in a bowl.",
      "5. Squeeze roasted garlic cloves into a bowl, mash, mix with yogurt, lemon juice, tahini, water & spices. On lavash/pita: add sauce, kefta, & salad. Roll tight. Crisp the wrap in a lightly oiled skillet."
    ]);
  });
});