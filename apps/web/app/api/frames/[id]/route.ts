import { NextRequest, NextResponse } from 'next/server';
import { FramesService } from '@castquest/core-services';

const framesService = new FramesService();

/**
 * GET /api/frames/[id] - Get frame template by ID
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const template = await framesService.getTemplateById(params.id);

    if (!template) {
      return NextResponse.json(
        {
          success: false,
          error: 'Frame template not found',
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: template,
    });
  } catch (error: any) {
    console.error('Error getting frame:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to get frame',
      },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/frames/[id] - Update frame template
 */
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json();

    const updateData: any = {};
    
    if (body.name !== undefined) updateData.name = body.name;
    if (body.description !== undefined) updateData.description = body.description;
    if (body.category !== undefined) updateData.category = body.category;
    if (body.thumbnailUrl !== undefined) updateData.thumbnailUrl = body.thumbnailUrl;
    if (body.price !== undefined) updateData.price = body.price;
    if (body.templateData !== undefined) updateData.templateData = JSON.stringify(body.templateData);
    if (body.version !== undefined) updateData.version = body.version;
    if (body.status !== undefined) updateData.status = body.status;
    if (body.featured !== undefined) updateData.featured = body.featured;

    const template = await framesService.updateTemplate(params.id, updateData);

    return NextResponse.json({
      success: true,
      data: template,
    });
  } catch (error: any) {
    console.error('Error updating frame:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to update frame',
      },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/frames/[id] - Delete frame template
 */
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await framesService.deleteTemplate(params.id);

    return NextResponse.json({
      success: true,
      message: 'Frame template deleted successfully',
    });
  } catch (error: any) {
    console.error('Error deleting frame:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to delete frame',
      },
      { status: 500 }
    );
  }
}
