import { NextRequest, NextResponse } from 'next/server';
import { QuestsService } from '@castquest/core-services';

const questsService = new QuestsService();

/**
 * GET /api/quests - List available quests
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const difficulty = searchParams.get('difficulty') || undefined;
    const category = searchParams.get('category') || undefined;
    const status = searchParams.get('status') || 'active';
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');

    const quests = await questsService.listQuests({
      difficulty,
      category,
      status,
      limit,
      offset,
    });

    return NextResponse.json({
      success: true,
      data: quests,
      count: quests.length,
    });
  } catch (error: any) {
    console.error('Error listing quests:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to list quests',
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/quests - Create a new quest (admin only)
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const quest = await questsService.createQuest({
      title: body.title,
      description: body.description,
      difficulty: body.difficulty,
      category: body.category,
      rewardType: body.rewardType,
      rewardAmount: body.rewardAmount,
      rewardData: body.rewardData ? JSON.stringify(body.rewardData) : undefined,
      requirementType: body.requirementType,
      requirementData: JSON.stringify(body.requirementData),
      startDate: body.startDate ? new Date(body.startDate) : undefined,
      endDate: body.endDate ? new Date(body.endDate) : undefined,
    });

    return NextResponse.json({
      success: true,
      data: quest,
    }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating quest:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to create quest',
      },
      { status: 500 }
    );
  }
}
