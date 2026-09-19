export enum CertificateStatus {
  VALID = 'VALID',
  EXPIRED = 'EXPIRED',
  REVOKED = 'REVOKED',
}

export interface Certificate {
  id: string;
  certificateNo: string;
  verificationToken: string;
  applicationId: string;
  instrumentId: string;
  issuingOfficerId: string;
  issueDate: string;
  validFrom: string;
  validUntil: string;
  status: CertificateStatus;
  qrCodeDataUrl?: string | null;
  pdfFileUrl?: string | null;
  revocationReason?: string | null;
  instrument?: {
    manufacturer: string;
    model: string;
    serialNumber: string;
    capacity: string;
    installationLocation: string;
    district: string;
    type?: {
      name: string;
      category: string;
    };
  };
  issuingOfficer?: {
    fullName: string;
    designation?: string | null;
  };
}

export interface VerificationLookupResult {
  status: CertificateStatus | 'NOT_FOUND';
  valid: boolean;
  certificateNo?: string;
  issueDate?: string;
  validFrom?: string;
  validUntil?: string;
  instrument?: Certificate['instrument'];
  issuingOfficer?: string;
  message?: string;
}
