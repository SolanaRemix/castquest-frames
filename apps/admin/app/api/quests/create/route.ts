import { NextResponse } from "next/server";
import { QuestsService } from '@castquest/core-services';

const questsService = new QuestsService();

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Validate required fields per core-services schema
    if (!body.title || !body.difficulty || !body.category || !body.rewardType || !body.requirementType || !body.requirementData) {
      return NextResponse.json(
        { 
          ok: false, 
          error: 'Missing required fields: title, difficulty, category, rewardType, requirementType, and requirementData are required' 
        },
        { status: 400 }
      );
    }

    const quest = await questsService.createQuest({
      title: body.title,
      description: body.description || '',
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

    return NextResponse.json({ ok: true, quest });
  } catch (error) {
    console.error('Failed to create quest:', error);
    return NextResponse.json(
      { 
        ok: false, 
        error: 'Failed to create quest' 
      },
      { status: 500 }
    );
  }
}
