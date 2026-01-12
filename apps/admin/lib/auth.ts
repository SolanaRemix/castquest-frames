import { NextRequest } from 'next/server';

/**
 * Check if the request has admin authorization
 */
export function requireAdmin(request: NextRequest): { authorized: boolean; error?: any } {
  const adminToken = process.env.ADMIN_API_TOKEN;
  const providedToken = request.headers.get('x-admin-token');

  if (!adminToken || !providedToken || providedToken !== adminToken) {
    return {
      authorized: false,
      error: {
        success: false,
        error: 'Unauthorized: Admin access required',
      },
    };
  }

  return { authorized: true };
}
