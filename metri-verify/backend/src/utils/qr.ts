import QRCode from 'qrcode';
import { env } from '../config/env';

export const generateQRCodeDataUrl = async (token: string): Promise<string> => {
  const verificationUrl = `${env.PUBLIC_VERIFICATION_BASE_URL}/${token}`;
  return QRCode.toDataURL(verificationUrl, {
    errorCorrectionLevel: 'H',
    margin: 2,
    color: {
      dark: '#002B49',
      light: '#FFFFFF',
    },
  });
};

export const generateQRCodeBuffer = async (token: string): Promise<Buffer> => {
  const verificationUrl = `${env.PUBLIC_VERIFICATION_BASE_URL}/${token}`;
  return QRCode.toBuffer(verificationUrl, {
    errorCorrectionLevel: 'H',
    margin: 2,
  });
};
