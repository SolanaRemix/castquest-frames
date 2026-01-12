/**
 * Authentication utilities for the web application
 */

import { NextRequest, NextResponse } from 'next/server';
import { parseSession, validateSession } from './session';
import type { AuthError, SessionData } from './types';

/**
 * Get user session from request (optional - returns null if not authenticated)
 */
export async function getUser(request: NextRequest): Promise<SessionData | null> {
  try {
    const session = parseSession(request);
    
    if (!validateSession(session)) {
      return null;
    }
    
    return session;
  } catch (error) {
    console.error('Error getting user:', error);
    return null;
  }
}

/**
 * Require authenticated user (throws error if not authenticated)
 */
export async function requireUser(request: NextRequest): Promise<SessionData> {
  const session = await getUser(request);
  
  if (!session) {
    throw new Error('Authentication required');
  }
  
  return session;
}

/**
 * Get user ID from request
 */
export async function getUserId(request: NextRequest): Promise<string | null> {
  const session = await getUser(request);
  return session?.userId || null;
}

/**
 * Require authentication and return user ID
 * Returns an object with either userId or error for API route handlers
 */
export async function requireAuth(request: NextRequest): Promise<{ userId: string } | { error: AuthError }> {
  try {
    const session = await requireUser(request);
    return { userId: session.userId };
  } catch (error) {
    return {
      error: {
        success: false,
        error: 'Unauthorized: Authentication required',
        code: 'UNAUTHORIZED',
      },
    };
  }
}

/**
 * Create authentication error response
 */
export function createAuthErrorResponse(
  message: string = 'Unauthorized',
  status: number = 401
): NextResponse {
  return NextResponse.json(
    {
      success: false,
      error: message,
      code: 'UNAUTHORIZED',
    },
    { status }
  );
}

/**
 * Check if request is authenticated
 */
export async function isAuthenticated(request: NextRequest): Promise<boolean> {
  const session = await getUser(request);
  return session !== null;
}

/**
 * Legacy compatibility: Extract user ID from request
 * @deprecated Use getUser() or requireUser() instead
 */
export async function getUserIdFromRequest(request: NextRequest): Promise<string | null> {
  return getUserId(request);
}
