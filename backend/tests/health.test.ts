import { describe, it, expect } from 'vitest';
import request from 'supertest';
import app from '../src/app';

describe('System Health & Readiness APIs', () => {
  it('GET /health - should return 200 OK with health metadata', async () => {
    const res = await request(app).get('/health');
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(res.body.message).toContain('healthy');
    expect(res.body.data).toHaveProperty('status', 'UP');
    expect(res.body.data).toHaveProperty('timestamp');
  });

  it('GET /ready - should return status and database/redis connectivity check', async () => {
    const res = await request(app).get('/ready');
    // Service might be ready or degraded depending on DB connection in test environment
    expect([200, 503]).toContain(res.status);
    expect(res.body).toHaveProperty('success');
    expect(res.body).toHaveProperty('services');
    expect(res.body.services).toHaveProperty('database');
    expect(res.body.services).toHaveProperty('redis');
  });

  it('GET /api/nonexistent - should return 404 for invalid routes', async () => {
    const res = await request(app).get('/api/nonexistent');
    expect(res.status).toBe(404);
    expect(res.body.success).toBe(false);
  });
});
