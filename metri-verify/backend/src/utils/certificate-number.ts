import crypto from 'crypto';

export const generateCertificateNumber = (district: string): string => {
  const year = new Date().getFullYear();
  const distCode = district.replace(/\s+/g, '').substring(0, 3).toUpperCase();
  const randomHex = crypto.randomBytes(3).toString('hex').toUpperCase();
  return `LM-${year}-${distCode}-${randomHex}`;
};

export const generateVerificationToken = (): string => {
  return crypto.randomBytes(24).toString('hex');
};
