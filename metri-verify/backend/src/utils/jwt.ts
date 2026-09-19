import jwt from 'jsonwebtoken';
import { env } from '../config/env';
import { SystemRole } from '@prisma/client';

export interface JwtUserPayload {
  userId: string;
  email: string;
  fullName: string;
  roles: SystemRole[];
  district?: string | null;
}

export interface AccessTokenPayload extends JwtUserPayload {
  type: 'access';
}

export interface RefreshTokenPayload {
  userId: string;
  type: 'refresh';
  tokenFamilyId?: string;
}

export const signAccessToken = (payload: JwtUserPayload): string => {
  return jwt.sign({ ...payload, type: 'access' }, env.JWT_ACCESS_SECRET, {
    expiresIn: env.JWT_ACCESS_EXPIRATION as any,
  });
};

export const signRefreshToken = (userId: string, tokenFamilyId?: string): string => {
  return jwt.sign({ userId, type: 'refresh', tokenFamilyId }, env.JWT_REFRESH_SECRET, {
    expiresIn: env.JWT_REFRESH_EXPIRATION as any,
  });
};

export const verifyAccessToken = (token: string): AccessTokenPayload => {
  const decoded = jwt.verify(token, env.JWT_ACCESS_SECRET) as AccessTokenPayload;
  if (decoded.type !== 'access') {
    throw new Error('Invalid token type');
  }
  return decoded;
};

export const verifyRefreshToken = (token: string): RefreshTokenPayload => {
  const decoded = jwt.verify(token, env.JWT_REFRESH_SECRET) as RefreshTokenPayload;
  if (decoded.type !== 'refresh') {
    throw new Error('Invalid token type');
  }
  return decoded;
};
