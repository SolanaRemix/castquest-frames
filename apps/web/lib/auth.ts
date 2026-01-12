/**
 * Main auth module
 * Re-exports all auth utilities from the auth/ directory
 * Maintains backward compatibility while using new modular structure
 */

// Re-export everything from the new auth module
export * from './auth';

// Specifically re-export requireUserId for direct import
export { requireUserId, getUserId as getUserIdFromRequest } from './auth/auth';

