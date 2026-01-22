import axios from 'axios';
import fs from 'fs';

async function main() {
    const url = 'https://jadlonomia.com/przepis/weganskie-ruskie-pierogi/';
    console.log(`Fetching ${url}...`);
    try {
        const response = await axios.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
            }
        });
        fs.writeFileSync('debug_jadlonomia.html', response.data);
        console.log('Saved to debug_jadlonomia.html');
    } catch (e) {
        console.error(e);
    }
}

main();