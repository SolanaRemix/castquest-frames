import { NextRequest, NextResponse } from 'next/server';
import { QuestsService } from '@castquest/core-services';

const questsService = new QuestsService();

/**
 * GET /api/quests/[id]/progress - Get quest progress
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const searchParams = request.nextUrl.searchParams;
    // TODO: Get authenticated user ID from session/token
    const userId = searchParams.get('userId') || 'temp-user-id';

    const progress = await questsService.getUserProgress(userId, params.id);

    return NextResponse.json({
      success: true,
      data: progress,
    });
  } catch (error: any) {
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
