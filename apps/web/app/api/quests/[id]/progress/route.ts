import { NextRequest, NextResponse } from 'next/server';
import { QuestsService } from '@castquest/core-services';
import { requireUserId } from '@/lib/auth';

const questsService = new QuestsService();

/**
 * GET /api/quests/[id]/progress - Get quest progress
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Validate quest ID
    if (!params.id || typeof params.id !== 'string') {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid quest ID',
        },
        { status: 400 }
      );
    }

    // Require authentication
    const userId = await requireUserId(request);

    const progress = await questsService.getUserProgress(userId, params.id);

    return NextResponse.json({
      success: true,
      data: progress,
    });
  } catch (error: any) {
    if (error.message?.includes('Unauthorized')) {
      return NextResponse.json(
        {
          success: false,
          error: error.message,
        },
        { status: 401 }
      );
    }

    console.error('Error getting quest progress:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to get quest progress',
      },
      { status: 500 }
    );
  }
}
