
import axios from 'axios';
import fs from 'fs';

async function main() {
    const urls = [
        { url: 'https://kuchniaagaty.pl/przepisy/pierogi-ruskie', file: 'kuchnia_debug.html' },
        { url: 'https://jadlonomia.com/przepisy/weganskie-ruskie-pierogi/', file: 'jadlonomia_debug.html' }
    ];

    for (const item of urls) {
        try {
            console.log(`Fetching ${item.url}...`);
            const response = await axios.get(item.url, {
                headers: {
                    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
                }
            });
            fs.writeFileSync(item.file, response.data);
            console.log(`Saved to ${item.file}`);
        } catch (e) {
            console.error(`Error fetching ${item.url}:`, e);
        }
    }
}
main();
