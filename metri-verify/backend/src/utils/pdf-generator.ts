import PDFDocument from 'pdfkit';
import fs from 'fs';
import path from 'path';
import { storageConfig } from '../config/storage';
import { generateQRCodeBuffer } from './qr';

export interface CertificatePdfData {
  certificateNo: string;
  verificationToken: string;
  applicantName: string;
  organizationName?: string;
  manufacturer: string;
  model: string;
  serialNumber: string;
  capacity: string;
  accuracyClass?: string | null;
  installationLocation: string;
  district: string;
  issueDate: Date;
  validFrom: Date;
  validUntil: Date;
  officerName: string;
  officerDesignation?: string | null;
  overallResult: string;
  sealNumbers?: string | null;
}

export const generateCertificatePdf = async (data: CertificatePdfData): Promise<{ fileKey: string; fileUrl: string }> => {
  return new Promise(async (resolve, reject) => {
    try {
      const doc = new PDFDocument({ size: 'A4', margin: 40 });
      const fileKey = `CERT-${data.certificateNo.replace(/[^a-zA-Z0-9]/g, '-')}.pdf`;
      const filePath = path.resolve(storageConfig.uploadDir, fileKey);
      const writeStream = fs.createWriteStream(filePath);

      doc.pipe(writeStream);

      // Header Banner / Border
      doc.rect(20, 20, 555, 802).strokeColor('#002B49').lineWidth(2).stroke();
      doc.rect(25, 25, 545, 792).strokeColor('#005691').lineWidth(1).stroke();

      // Title & Emblem Header
      doc.fillColor('#002B49').fontSize(16).text('GOVERNMENT OF INDIA', { align: 'center' });
      doc.fontSize(14).text('DEPARTMENT OF LEGAL METROLOGY', { align: 'center' });
      doc.fontSize(10).fillColor('#444444').text(`Zone / District: ${data.district}`, { align: 'center' });
      doc.moveDown(0.5);

      doc.fontSize(18).fillColor('#B8860B').text('DIGITAL CERTIFICATE OF VERIFICATION', { align: 'center', underline: true });
      doc.fontSize(9).fillColor('#666666').text('(Issued under Legal Metrology Rules & Standards)', { align: 'center' });
      doc.moveDown(1);

      // Certificate Metadata Box
      doc.fillColor('#000000').fontSize(10);
      doc.text(`Certificate No: `, { continued: true }).fillColor('#002B49').text(data.certificateNo);
      doc.fillColor('#000000').text(`Date of Issue: `, { continued: true }).text(data.issueDate.toISOString().split('T')[0]);
      doc.text(`Validity Period: `, { continued: true }).text(
        `${data.validFrom.toISOString().split('T')[0]}  TO  ${data.validUntil.toISOString().split('T')[0]}`
      );
      doc.moveDown(1);

      // Owner & Equipment Details Table
      doc.fillColor('#002B49').fontSize(11).text('1. APPLICANT & EQUIPMENT DETAILS', { underline: true });
      doc.fillColor('#333333').fontSize(9);
      doc.text(`Owner / Business Name: ${data.applicantName} ${data.organizationName ? `(${data.organizationName})` : ''}`);
      doc.text(`Installation Address: ${data.installationLocation}, ${data.district}`);
      doc.text(`Instrument Manufacturer: ${data.manufacturer}`);
      doc.text(`Model & Serial Number: ${data.model} (S/N: ${data.serialNumber})`);
      doc.text(`Capacity / Range: ${data.capacity} | Accuracy Class: ${data.accuracyClass || 'Standard'}`);
      doc.text(`Verification Seals Applied: ${data.sealNumbers || 'Standard Tamper Seal Attached'}`);
      doc.moveDown(1);

      // Verification Result Box
      doc.fillColor('#002B49').fontSize(11).text('2. VERIFICATION INSPECTION SUMMARY', { underline: true });
      doc.fillColor('#008000').fontSize(12).text(`STATUS: VERIFIED & PASSED (${data.overallResult})`);
      doc.fontSize(8).fillColor('#555555').text(
        'The instrument specified above has been verified and tested against approved reference standards and complies with permissible limits.'
      );
      doc.moveDown(1.5);

      // QR Code Embedding
      const qrBuffer = await generateQRCodeBuffer(data.verificationToken);
      doc.image(qrBuffer, 40, doc.y, { width: 100, height: 100 });

      // Digital Signature & Disclaimer
      const currentY = doc.y;
      doc.fontSize(8).fillColor('#666666');
      doc.text('Scan QR code to verify certificate authenticity on official portal.', 150, currentY + 20);
      doc.text(`Digital Token: ${data.verificationToken}`, 150, currentY + 35);

      doc.fontSize(10).fillColor('#002B49');
      doc.text(`Digitally Approved By:`, 380, currentY + 10);
      doc.fontSize(9).fillColor('#000000');
      doc.text(`${data.officerName}`, 380, currentY + 25);
      doc.text(`${data.officerDesignation || 'Legal Metrology Officer'}`, 380, currentY + 38);

      doc.fontSize(7).fillColor('#888888').text(
        'Disclaimer: This is a digitally generated verification certificate under Legal Metrology Prototype rules. Tampering or altering this document is punishable by law.',
        40,
        770,
        { align: 'center', width: 515 }
      );

      doc.end();

      writeStream.on('finish', () => {
        resolve({
          fileKey,
          fileUrl: `/uploads/${fileKey}`,
        });
      });

      writeStream.on('error', (err) => {
        reject(err);
      });
    } catch (error) {
      reject(error);
    }
  });
};
