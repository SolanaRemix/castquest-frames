import { NextResponse } from "next/server";
import { FramesService } from '@castquest/core-services';

const framesService = new FramesService();

export async function GET() {
  try {
    const templates = await framesService.listTemplates({
      limit: 100,
      offset: 0,
    });
    
    return NextResponse.json({ 
      success: true, 
      data: templates 
    });
  } catch (error) {
    console.error('Failed to load frame templates:', error);
    return NextResponse.json({ 
      success: false, 
      data: [],
      error: 'Failed to load frame templates'
    }, { status: 500 });
  }
}
