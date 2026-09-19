import multer, { FileFilterCallback } from 'multer';
import path from 'path';
import crypto from 'crypto';
import { Request } from 'express';
import { storageConfig } from '../config/storage';
import { AppError } from './error.middleware';

// Disk storage engine with unique, non-predictable safe file names
const storage = multer.diskStorage({
  destination: (req: Request, file: Express.Multer.File, cb) => {
    cb(null, storageConfig.uploadDir);
  },
  filename: (req: Request, file: Express.Multer.File, cb) => {
    const safeExt = path.extname(file.originalname).toLowerCase();
    const uniqueKey = `${Date.now()}-${crypto.randomBytes(8).toString('hex')}${safeExt}`;
    cb(null, uniqueKey);
  },
});

// File mime-type filter
const fileFilter = (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
  if (storageConfig.allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new AppError(
        `Invalid file type. Allowed formats: PDF, JPEG, PNG, WEBP. Received: ${file.mimetype}`,
        400
      )
    );
  }
};

export const uploadSingle = (fieldName: string) =>
  multer({
    storage,
    limits: { fileSize: storageConfig.maxFileSize },
    fileFilter,
  }).single(fieldName);

export const uploadMultiple = (fieldName: string, maxCount: number = 5) =>
  multer({
    storage,
    limits: { fileSize: storageConfig.maxFileSize },
    fileFilter,
  }).array(fieldName, maxCount);
