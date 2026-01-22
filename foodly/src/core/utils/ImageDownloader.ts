import axios from 'axios';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

export class ImageDownloader {
  private static readonly UPLOAD_DIR = path.join(process.cwd(), 'public', 'uploads');

  static async download(imageUrl: string): Promise<string | null> {
    try {
      // Ensure directory exists
      if (!fs.existsSync(this.UPLOAD_DIR)) {
        fs.mkdirSync(this.UPLOAD_DIR, { recursive: true });
      }

      const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
      const buffer = Buffer.from(response.data);

      // Infer extension or default to .jpg
      const contentType = response.headers['content-type'];
      let extension = '.jpg';
      if (contentType) {
        if (contentType.includes('png')) extension = '.png';
        else if (contentType.includes('webp')) extension = '.webp';
        else if (contentType.includes('jpeg') || contentType.includes('jpg')) extension = '.jpg';
      }

      // Create unique filename based on content hash
      const hash = crypto.createHash('md5').update(buffer).digest('hex');
      const filename = `${hash}${extension}`;
      const filePath = path.join(this.UPLOAD_DIR, filename);

      // Write file
      fs.writeFileSync(filePath, buffer);

      // Return relative path for DB
      return `/uploads/${filename}`;
    } catch (error) {
      console.error('Failed to download image:', imageUrl, error);
      return null;
    }
  }
}
