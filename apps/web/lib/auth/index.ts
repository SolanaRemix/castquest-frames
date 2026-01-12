/**
 * Web app authentication utilities
 * 
 * This module provides authentication utilities for the web application,
 * wrapping core-services AuthService with Next.js-specific helpers.
 */

// Export all types
export * from './types';

// Export session utilities
export {
  decodeToken,
  extractToken,
  parseSession,
  parseSessionFromCookie,
  validateSession,
} from './session';

// Export auth utilities
export {
  createAuthErrorResponse,
  getUser,
  getUserId,
  getUserIdFromRequest,
  isAuthenticated,
  requireAuth,
  requireUser,
} from './auth';
