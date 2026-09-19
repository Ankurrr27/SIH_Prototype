import fs from 'fs';
import path from 'path';
import { env } from './env';

export const storageConfig = {
  uploadDir: path.resolve(process.cwd(), env.UPLOAD_DIR),
  maxFileSize: env.MAX_FILE_SIZE_MB * 1024 * 1024,
  allowedMimeTypes: [
    'application/pdf',
    'image/jpeg',
    'image/png',
    'image/webp',
  ],
};

export const initStorage = (): void => {
  if (!fs.existsSync(storageConfig.uploadDir)) {
    fs.mkdirSync(storageConfig.uploadDir, { recursive: true });
    console.log(`📁 File upload storage directory initialized at: ${storageConfig.uploadDir}`);
  }
};
