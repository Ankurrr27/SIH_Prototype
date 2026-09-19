import { NextRequest, NextResponse } from 'next/server';
import { AuthService } from '@/server/modules/auth/auth.service';
import { verifyAccessToken } from '@/server/utils/jwt';

const authService = new AuthService();

type RouteContext = {
  params: Promise<{ action: string }>;
};

const success = (message: string, data?: unknown, status = 200) =>
  NextResponse.json({ success: true, message, ...(data !== undefined ? { data } : {}) }, { status });

const failure = (error: unknown) => {
  const candidate = error as { statusCode?: number; message?: string };
  const status = candidate.statusCode && candidate.statusCode >= 400 ? candidate.statusCode : 400;
  return NextResponse.json(
    { success: false, message: candidate.message || 'Request failed', errors: [] },
    { status },
  );
};

const body = async (request: NextRequest): Promise<Record<string, unknown>> => {
  try {
    return (await request.json()) as Record<string, unknown>;
  } catch {
    return {};
  }
};

const currentUserId = (request: NextRequest): string => {
  const authorization = request.headers.get('authorization');
  if (!authorization?.startsWith('Bearer ')) {
    throw Object.assign(new Error('Authentication required'), { statusCode: 401 });
  }
  return verifyAccessToken(authorization.slice(7)).userId;
};

export async function POST(request: NextRequest, context: RouteContext) {
  const { action } = await context.params;
  const requestBody = await body(request);

  try {
    switch (action) {
      case 'register':
        return success('User registered successfully', await authService.register(requestBody as never), 201);
      case 'login':
        return success(
          'Login successful',
          await authService.login(
            requestBody as never,
            request.headers.get('x-forwarded-for') || undefined,
            request.headers.get('user-agent') || undefined,
          ),
        );
      case 'refresh':
        return success('Tokens refreshed successfully', await authService.refresh(String(requestBody.refreshToken || '')));
      case 'logout':
        return success(
          'Logged out successfully',
          await authService.logout(String(requestBody.refreshToken || '') || undefined, currentUserId(request)),
        );
      case 'forgot-password': {
        const result = await authService.forgotPassword(String(requestBody.email || ''));
        return success(result.message, result);
      }
      case 'reset-password': {
        const result = await authService.resetPassword(requestBody as never);
        return success(result.message);
      }
      case 'verify-email': {
        const result = await authService.verifyEmail(String(requestBody.token || ''));
        return success(result.message);
      }
      case 'change-password':
        return success('Password changed successfully', await authService.changePassword(currentUserId(request), requestBody as never));
      default:
        return NextResponse.json({ success: false, message: 'Route not found' }, { status: 404 });
    }
  } catch (error) {
    return failure(error);
  }
}

export async function GET(request: NextRequest, context: RouteContext) {
  const { action } = await context.params;

  if (action !== 'me') {
    return NextResponse.json({ success: false, message: 'Route not found' }, { status: 404 });
  }

  try {
    return success('User profile fetched successfully', await authService.getMe(currentUserId(request)));
  } catch (error) {
    return failure(error);
  }
}
