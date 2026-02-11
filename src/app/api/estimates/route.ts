import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import {
  getEstimates,
  getEstimatesByStatus,
  getEstimatesByClient,
  searchEstimates,
  createEstimate,
  createActivityLog,
} from '@/lib/db';

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const searchParams = request.nextUrl.searchParams;
    const status = searchParams.get('status');
    const clientId = searchParams.get('clientId');
    const search = searchParams.get('search');

    let estimates;
    if (status) {
      estimates = await getEstimatesByStatus(status);
    } else if (clientId) {
      estimates = await getEstimatesByClient(clientId);
    } else if (search) {
      estimates = await searchEstimates(search);
    } else {
      estimates = await getEstimates();
    }

    return NextResponse.json({ estimates });
  } catch (error) {
    console.error('Error fetching estimates:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();
    if (!data.clientId || !data.clientName || !data.clientPhone) {
      return NextResponse.json({ error: 'Required fields: clientId, clientName, clientPhone' }, { status: 400 });
    }

    const estimate = await createEstimate(data);

    await createActivityLog({
      action: 'created',
      entityType: 'estimate',
      entityId: estimate.id,
      entityName: estimate.estimateCode,
      details: { clientName: estimate.clientName, total: estimate.total },
      userName: session.user?.name || session.user?.email || 'Admin',
    });

    return NextResponse.json({ estimate }, { status: 201 });
  } catch (error) {
    console.error('Error creating estimate:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
