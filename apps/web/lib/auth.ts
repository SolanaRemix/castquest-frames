/**
 * Legacy auth module - kept for backward compatibility
 * 
 * @deprecated Import from './auth/' instead for better organization
 * 
 * This file re-exports from the new auth module structure.
 */

// Re-export everything from the new auth module
export {
  createAuthErrorResponse,
  getUser,
  getUserId,
  getUserIdFromRequest,
  isAuthenticated,
  requireAuth,
  requireUser,
} from './auth/auth';

export type {
  AuthError,
  AuthResponse,
  AuthResult,
  AuthSuccess,
  SessionData,
  TokenPayload,
} from './auth/types';
