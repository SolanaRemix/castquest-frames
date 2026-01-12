/**
 * Session parsing and validation utilities
 */

import { AuthService } from '@castquest/core-services';
import { NextRequest } from 'next/server';
import type { SessionData, TokenPayload } from './types';

// Lazy initialization to avoid build-time errors
let authService: AuthService | null = null;

function getAuthService(): AuthService {
  if (!authService) {
    authService = new AuthService();
  }
  return authService;
}

/**
 * Parse session from request headers
 */
export function parseSession(request: NextRequest): SessionData | null {
  try {
    const authHeader = request.headers.get('authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return null;
    }
    
    const token = authHeader.substring(7); // Remove 'Bearer ' prefix
    const decoded = getAuthService().verifyToken(token);
    
    if (!decoded) {
      return null;
    }
    
    return {
      userId: decoded.userId,
      email: decoded.email,
    };
  } catch (error) {
    console.error('Error parsing session:', error);
    return null;
  }
}

/**
 * Parse session from cookie (for future use)
 */
export function parseSessionFromCookie(cookieValue: string): SessionData | null {
  try {
    const decoded = getAuthService().verifyToken(cookieValue);
    
    if (!decoded) {
      return null;
    }
    
    return {
      userId: decoded.userId,
      email: decoded.email,
    };
  } catch (error) {
    console.error('Error parsing session from cookie:', error);
    return null;
  }
}

/**
 * Validate session data
 */
export function validateSession(session: SessionData | null): session is SessionData {
  if (!session) {
    return false;
  }
  
  if (!session.userId || !session.email) {
    return false;
  }
  
  // Check if session has expired
  if (session.expiresAt && session.expiresAt < new Date()) {
    return false;
  }
  
  return true;
}

/**
 * Extract token from Authorization header
 */
export function extractToken(request: NextRequest): string | null {
  const authHeader = request.headers.get('authorization');
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return null;
  }
  
  return authHeader.substring(7);
}

/**
 * Decode token without verification (for debugging)
 */
export function decodeToken(token: string): TokenPayload | null {
  try {
    // Simple base64 decode of JWT payload
    const parts = token.split('.');
    if (parts.length !== 3) {
      return null;
    }
    
    const payload = Buffer.from(parts[1], 'base64').toString('utf-8');
    return JSON.parse(payload) as TokenPayload;
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
}
