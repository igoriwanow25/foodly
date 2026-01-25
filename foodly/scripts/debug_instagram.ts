import axios from 'axios';
import fs from 'fs';
import path from 'path';

const url = 'https://www.instagram.com/p/DTgTW1FkrXr/';
const headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8',
    'Accept-Language': 'en-US,en;q=0.9',
    'Cache-Control': 'no-cache',
    'Pragma': 'no-cache',
    'Sec-Fetch-Dest': 'document',
    'Sec-Fetch-Mode': 'navigate',
    'Sec-Fetch-Site': 'none',
    'Sec-Fetch-User': '?1',
    'Upgrade-Insecure-Requests': '1'
};

async function run() {
    try {
        console.log(`Fetching ${url}...`);
        const response = await axios.get(url, { headers });
        console.log(`Status: ${response.status}`);
        
        const debugPath = path.join(process.cwd(), 'instagram_debug.html');
        fs.writeFileSync(debugPath, response.data);
        console.log(`Saved response to ${debugPath}`);
    } catch (error) {
        console.error('Error:', error);
    }
}

run();