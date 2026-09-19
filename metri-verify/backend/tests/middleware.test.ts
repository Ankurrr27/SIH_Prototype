import { describe, it, expect } from 'vitest';
import { signAccessToken, verifyAccessToken, signRefreshToken, verifyRefreshToken } from '../src/utils/jwt';
import { hashPassword, comparePassword } from '../src/utils/password';
import { SystemRole } from '@prisma/client';

describe('Security & Auth Utilities', () => {
  it('should hash and correctly verify passwords', async () => {
    const raw = 'Password@123';
    const hashed = await hashPassword(raw);
    
    expect(hashed).not.toBe(raw);
    expect(await comparePassword(raw, hashed)).toBe(true);
    expect(await comparePassword('WrongPassword', hashed)).toBe(false);
  });

  it('should generate and verify valid JWT Access Tokens', () => {
    const payload = {
      userId: 'user-uuid-1234',
      email: 'officer@legalmetrology.gov.in',
      fullName: 'Officer Test',
      roles: [SystemRole.LMO],
      district: 'North Delhi',
    };

    const token = signAccessToken(payload);
    expect(token).toBeTypeOf('string');

    const decoded = verifyAccessToken(token);
    expect(decoded.userId).toBe(payload.userId);
    expect(decoded.email).toBe(payload.email);
    expect(decoded.roles).toContain(SystemRole.LMO);
    expect(decoded.type).toBe('access');
  });

  it('should generate and verify valid JWT Refresh Tokens', () => {
    const userId = 'user-uuid-5678';
    const refreshToken = signRefreshToken(userId);
    
    expect(refreshToken).toBeTypeOf('string');
    const decoded = verifyRefreshToken(refreshToken);
    expect(decoded.userId).toBe(userId);
    expect(decoded.type).toBe('refresh');
  });

  it('should reject invalid or tampered JWT access tokens', () => {
    const invalidToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.invalidpayload.signature';
    expect(() => verifyAccessToken(invalidToken)).toThrow();
  });
});
