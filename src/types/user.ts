export enum UserRole {
  APPLICANT = 'APPLICANT',
  LMO = 'LMO',
  GATC = 'GATC',
  ADMIN = 'ADMIN',
}

export interface User {
  id: string;
  email: string;
  mobile?: string | null;
  fullName: string;
  designation?: string | null;
  district?: string | null;
  state?: string;
  isEmailVerified: boolean;
  isMobileVerified: boolean;
  isActive: boolean;
  createdAt: string;
  roles: UserRole[];
  organizationMemberships?: Array<{
    organization: {
      id: string;
      name: string;
      code: string;
      type: string;
    };
    roleInOrg: string;
  }>;
}
