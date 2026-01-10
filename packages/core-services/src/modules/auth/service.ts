import { db } from '@/lib/db';
import { users } from '@/lib/db/schema';
import { logger } from '@/lib/logger';
import { eq } from 'drizzle-orm';
import jwt from 'jsonwebtoken';

export class AuthService {
  private readonly JWT_SECRET = process.env.JWT_SECRET || 'castquest-dev-secret';
  private readonly JWT_EXPIRES_IN = '7d';

  /**
   * Authenticate user with wallet address
   */
  async authenticateWallet(address: string) {
    // Check if user exists
    let user = await db.query.users.findFirst({
      where: eq(users.email, address.toLowerCase()),
    });

    if (!user) {
      // Create new user for this wallet
      const [newUser] = await db.insert(users).values({
        email: address.toLowerCase(),
        emailVerified: true, // Auto-verify wallet addresses
        status: 'active',
      }).returning();
      
      user = newUser;
      logger.info(`New wallet user created: ${address}`);
    }

    // Update last login
    await db.update(users)
      .set({ lastLoginAt: new Date() })
      .where(eq(users.id, user.id));

    // Generate JWT
    const token = this.generateToken(user.id, user.email);

    return {
      user: this.sanitizeUser(user),
      token,
    };
  }

  /**
   * Verify JWT token
   */
  verifyToken(token: string): { userId: string; email: string } | null {
    try {
      const decoded = jwt.verify(token, this.JWT_SECRET) as any;
      return {
        userId: decoded.userId,
        email: decoded.email,
      };
    } catch (error) {
      logger.error('Token verification failed', error);
      return null;
    }
  }

  /**
   * Get user from token
   */
  async getUserFromToken(token: string) {
    const decoded = this.verifyToken(token);
    if (!decoded) {
      return null;
    }

    const user = await db.query.users.findFirst({
      where: eq(users.id, decoded.userId),
    });

    return user ? this.sanitizeUser(user) : null;
  }

  /**
   * Generate JWT token
   */
  generateToken(userId: string, email: string): string {
    return jwt.sign(
      { userId, email },
      this.JWT_SECRET,
      { expiresIn: this.JWT_EXPIRES_IN }
    );
  }

  /**
   * Refresh token
   */
  async refreshToken(oldToken: string) {
    const decoded = this.verifyToken(oldToken);
    if (!decoded) {
      throw new Error('Invalid token');
    }

    // Generate new token
    const newToken = this.generateToken(decoded.userId, decoded.email);

    return {
      token: newToken,
    };
  }

  /**
   * Get user profile
   */
  async getProfile(userId: string) {
    const user = await db.query.users.findFirst({
      where: eq(users.id, userId),
    });

    if (!user) {
      throw new Error('User not found');
    }

    return this.sanitizeUser(user);
  }

  /**
   * Update user profile
   */
  async updateProfile(userId: string, data: {
    email?: string;
  }) {
    const [updated] = await db.update(users)
      .set({
        ...data,
        updatedAt: new Date(),
      })
      .where(eq(users.id, userId))
      .returning();

    logger.info(`User profile updated: ${userId}`);
    return this.sanitizeUser(updated);
  }

  /**
   * Remove sensitive data from user object
   */
  private sanitizeUser(user: any) {
    const { passwordHash, ...sanitized } = user;
    return sanitized;
  }

  /**
   * Logout (client-side token invalidation)
   */
  async logout(userId: string) {
    // In a production system, you might want to:
    // 1. Add token to a blacklist
    // 2. Update last logout time
    // 3. Clear sessions
    
    logger.info(`User logged out: ${userId}`);
    return { success: true };
  }
}
