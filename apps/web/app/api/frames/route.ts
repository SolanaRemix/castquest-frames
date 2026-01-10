import { NextRequest, NextResponse } from 'next/server';
import { FramesService } from '@castquest/core-services';

const framesService = new FramesService();

/**
 * GET /api/frames - List frame templates
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const category = searchParams.get('category') || undefined;
    const status = searchParams.get('status') || 'published';
    const featured = searchParams.get('featured') === 'true' ? true : undefined;
    const creatorId = searchParams.get('creatorId') || undefined;
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');

    const templates = await framesService.listTemplates({
      category,
      status,
      featured,
      creatorId,
      limit,
      offset,
    });

    return NextResponse.json({
      success: true,
      data: templates,
      count: templates.length,
    });
  } catch (error: any) {
    console.error('Error listing frames:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to list frames',
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/frames - Create a new frame template
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // TODO: Get authenticated user ID from session/token
    const userId = body.creatorId || 'temp-user-id';

    const template = await framesService.createTemplate({
      name: body.name,
      description: body.description,
      category: body.category,
      thumbnailUrl: body.thumbnailUrl,
      price: body.price,
      creatorId: userId,
      tenantId: body.tenantId,
      templateData: JSON.stringify(body.templateData),
      version: body.version || '1.0.0',
    });

    return NextResponse.json({
      success: true,
      data: template,
    }, { status: 201 });
  } catch (error: any) {
    console.error('Error creating frame:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to create frame',
      },
      { status: 500 }
    );
  }
}
