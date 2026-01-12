import { NextRequest } from 'next/server';
import { AuthService } from '@castquest/core-services';

const authService = new AuthService();

/**
 * Extract and verify user ID from authentication token
 */
export async function getUserIdFromRequest(request: NextRequest): Promise<string | null> {
  try {
    // Try to get token from Authorization header
    const authHeader = request.headers.get('authorization');
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return null;
    }
    
    const token = authHeader.substring(7); // Remove 'Bearer ' prefix
    const decoded = authService.verifyToken(token);
    
    if (!decoded) {
      return null;
    }
    
    return decoded.userId;
  } catch (error) {
    console.error('Error extracting user ID from request:', error);
    return null;
  }
}

/**
 * Require authentication or return 401 error
 */
export async function requireAuth(request: NextRequest): Promise<{ userId: string } | { error: any }> {
  const userId = await getUserIdFromRequest(request);
  
  if (!userId) {
    return {
      error: {
        success: false,
        error: 'Unauthorized: Authentication required',
      },
    };
  }
  
  return { userId };
}
