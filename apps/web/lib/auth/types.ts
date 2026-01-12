/**
 * Authentication types for the web application
 */

export interface SessionData {
  userId: string;
  email: string;
  walletAddress?: string;
  expiresAt?: Date;
}

export interface AuthResult {
  user: SessionData;
  token: string;
}

export interface AuthError {
  success: false;
  error: string;
  code?: string;
}

export interface AuthSuccess<T = any> {
  success: true;
  data: T;
}

export type AuthResponse<T = any> = AuthSuccess<T> | AuthError;

/**
 * Decoded JWT token payload
 */
export interface TokenPayload {
  userId: string;
  email: string;
  iat?: number;
  exp?: number;
}
