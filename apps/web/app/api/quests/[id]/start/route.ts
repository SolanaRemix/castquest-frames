import { NextRequest, NextResponse } from 'next/server';
import { QuestsService } from '@castquest/core-services';

const questsService = new QuestsService();

/**
 * POST /api/quests/[id]/start - Start a quest
 */
export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();
    
    // TODO: Get authenticated user ID from session/token
    const userId = body.userId || 'temp-user-id';

    const progress = await questsService.startQuest(params.id, userId);

    return NextResponse.json({
      success: true,
      data: progress,
    });
  } catch (error: any) {
    console.error('Error starting quest:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to start quest',
      },
      { status: 500 }
    );
  }
}
