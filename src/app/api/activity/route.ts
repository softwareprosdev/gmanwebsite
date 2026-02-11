import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getActivityLogs, getActivityLogsByEntity } from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const searchParams = request.nextUrl.searchParams;
    const entityType = searchParams.get('entityType');
    const entityId = searchParams.get('entityId');
    const limit = parseInt(searchParams.get('limit') || '50', 10);

    let logs;
    if (entityType && entityId) {
      logs = await getActivityLogsByEntity(entityType, entityId);
    } else {
      logs = await getActivityLogs(limit);
    }

    return NextResponse.json({ logs });
  } catch (error) {
    console.error('Error fetching activity logs:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
