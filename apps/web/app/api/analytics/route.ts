import { NextRequest, NextResponse } from 'next/server';
import { AnalyticsService } from '@castquest/core-services';

const analyticsService = new AnalyticsService();

/**
 * GET /api/analytics - Get analytics data
 */
export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const type = searchParams.get('type') || 'user';
    const userId = searchParams.get('userId');
    const days = parseInt(searchParams.get('days') || '30');

    if (type === 'user' && userId) {
      const analytics = await analyticsService.getUserAnalytics(userId, days);
      return NextResponse.json({
        success: true,
        data: analytics,
      });
    }

    if (type === 'protocol') {
      const metrics = await analyticsService.getProtocolMetrics(days);
      return NextResponse.json({
        success: true,
        data: metrics,
      });
    }

    return NextResponse.json(
      {
        success: false,
        error: 'Invalid analytics type or missing parameters',
      },
      { status: 400 }
    );
  } catch (error: any) {
    console.error('Error getting analytics:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to get analytics',
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/analytics - Track analytics event
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const event = await analyticsService.trackEvent({
      userId: body.userId,
      eventType: body.eventType,
      eventCategory: body.eventCategory,
      resourceType: body.resourceType,
      resourceId: body.resourceId,
      metadata: body.metadata ? JSON.stringify(body.metadata) : undefined,
      sessionId: body.sessionId,
      ipAddress: request.ip || undefined,
      userAgent: request.headers.get('user-agent') || undefined,
      referrer: request.headers.get('referer') || undefined,
    });

    return NextResponse.json({
      success: true,
      data: event,
    });
  } catch (error: any) {
    console.error('Error tracking event:', error);
    return NextResponse.json(
      {
        success: false,
        error: error.message || 'Failed to track event',
      },
      { status: 500 }
    );
  }
}
