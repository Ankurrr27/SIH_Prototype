export enum ApplicationType {
  NEW_VERIFICATION = 'NEW_VERIFICATION',
  RE_VERIFICATION = 'RE_VERIFICATION',
  REINSPECTION = 'REINSPECTION',
}

export enum ApplicationStatus {
  DRAFT = 'DRAFT',
  SUBMITTED = 'SUBMITTED',
  UNDER_REVIEW = 'UNDER_REVIEW',
  NEEDS_CORRECTION = 'NEEDS_CORRECTION',
  APPROVED_FOR_SCHEDULING = 'APPROVED_FOR_SCHEDULING',
  SCHEDULED = 'SCHEDULED',
  IN_VERIFICATION = 'IN_VERIFICATION',
  VERIFICATION_COMPLETED = 'VERIFICATION_COMPLETED',
  CERTIFICATE_PENDING = 'CERTIFICATE_PENDING',
  ISSUED = 'ISSUED',
  REJECTED = 'REJECTED',
  CANCELLED = 'CANCELLED',
  REINSPECTION_REQUIRED = 'REINSPECTION_REQUIRED',
}

export interface ApplicationDocument {
  id: string;
  applicationId: string;
  documentType: string;
  fileName: string;
  fileUrl: string;
  uploadedAt: string;
}

export interface ApplicationStatusHistory {
  id: string;
  fromStatus?: ApplicationStatus | null;
  toStatus: ApplicationStatus;
  changedById?: string | null;
  remarks?: string | null;
  timestamp: string;
}

export interface Application {
  id: string;
  applicationNo: string;
  applicantId: string;
  instrumentId: string;
  type: ApplicationType;
  status: ApplicationStatus;
  submissionDate?: string | null;
  reviewDate?: string | null;
  district: string;
  createdAt: string;
  updatedAt: string;
  applicant?: {
    id: string;
    fullName: string;
    email: string;
    mobile?: string | null;
  };
  instrument?: {
    id: string;
    serialNumber: string;
    manufacturer: string;
    model: string;
    capacity: string;
    type?: {
      name: string;
      category: string;
    };
  };
  documents?: ApplicationDocument[];
  statusHistory?: ApplicationStatusHistory[];
}
