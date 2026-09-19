import { NextResponse } from 'next/server';

export function GET() {
  return NextResponse.json({
    success: true,
    message: 'MetriVerify API is live and healthy',
    data: {
      status: 'UP',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    },
  });
}

