import { NextRequest, NextResponse } from 'next/server';
import { QuestsService } from '@castquest/core-services';
import { requireUserId, handleAuthError } from '@/lib/auth';

const questsService = new QuestsService();

/**
 * POST /api/quests/[id]/complete - Complete a quest
 */
export async function POST(
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
    const userId = requireUserId(request);

    const result = await questsService.completeQuest(params.id, userId);

    return NextResponse.json({
      success: true,
      data: result,
    });
  } catch (error: any) {
    // Handle authentication errors consistently
    const authErrorResponse = handleAuthError(error);
    if (authErrorResponse) {
      return authErrorResponse;
    }

    console.error('Error completing quest:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to complete quest',
      },
      { status: 500 }
    );
  }
}
