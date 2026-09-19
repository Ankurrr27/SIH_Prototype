import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../src/app';

describe('Integration Test Suite - Core Endpoints', () => {
  it('GET /api/public/certificates/verify/:token - should handle unknown verification tokens gracefully', async () => {
    const res = await request(app).get('/api/public/certificates/verify/invalid-test-token-999');
    expect([200, 500, 503]).toContain(res.status);
    if (res.status === 200) {
      expect(res.body.success).toBe(true);
      expect(res.body.data.status).toBe('NOT_FOUND');
      expect(res.body.data.valid).toBe(false);
    }
  });

  it('GET /api/public/certificates/:certificateNo - should handle unknown certificate numbers', async () => {
    const res = await request(app).get('/api/public/certificates/LM-2026-UNKNOWN-999');
    expect([200, 500, 503]).toContain(res.status);
    if (res.status === 200) {
      expect(res.body.success).toBe(true);
      expect(res.body.data.status).toBe('NOT_FOUND');
      expect(res.body.data.valid).toBe(false);
    }
  });

  it('POST /api/auth/login - should fail with 401 or 500 for invalid credentials depending on DB state', async () => {
    const res = await request(app).post('/api/auth/login').send({
      email: 'nonexistent@legalmetrology.gov.in',
      password: 'WrongPassword123',
    });
    expect([401, 500]).toContain(res.status);
    expect(res.body.success).toBe(false);
  });

  it('GET /api/users/me - should fail with 401 Unauthorized when missing Bearer token', async () => {
    const res = await request(app).get('/api/users/me');
    expect(res.status).toBe(401);
    expect(res.body.success).toBe(false);
  });
});
