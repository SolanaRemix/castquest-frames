/**
 * Authentication Module for Web App
 * Provides authentication utilities compatible with Next.js 14 App Router
 * and @castquest/core-services
 */

// Export types
export type { User, Session, AuthContext, DecodedToken } from './types';

// Export session utilities
export {
  getTokenFromRequest,
  getTokenFromCookies,
  parseSession,
  validateSession,
  isSessionValid,
  refreshSession,
} from './session';

// Export auth utilities
export {
  requireUser,
  getUser,
  getUserFromCookies,
  requireAuthContext,
  getUserId,
  requireUserId,
} from './auth';
