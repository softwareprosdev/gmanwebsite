import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getEstimateById, updateEstimate, deleteEstimate, createActivityLog } from '@/lib/db';

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const estimate = await getEstimateById(id);
    if (!estimate) {
      return NextResponse.json({ error: 'Estimate not found' }, { status: 404 });
    }

    return NextResponse.json({ estimate });
  } catch (error) {
    console.error('Error fetching estimate:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const data = await request.json();
    const estimate = await updateEstimate(id, data);

    await createActivityLog({
      action: 'updated',
      entityType: 'estimate',
      entityId: estimate.id,
      entityName: estimate.estimateCode,
      details: { changes: Object.keys(data) },
      userName: session.user?.name || session.user?.email || 'Admin',
    });

    return NextResponse.json({ estimate });
  } catch (error) {
    console.error('Error updating estimate:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { id } = await params;
    const estimate = await getEstimateById(id);
    await deleteEstimate(id);

    await createActivityLog({
      action: 'deleted',
      entityType: 'estimate',
      entityId: id,
      entityName: estimate?.estimateCode,
      userName: session.user?.name || session.user?.email || 'Admin',
    });

    return NextResponse.json({ message: 'Estimate deleted successfully' });
  } catch (error) {
    console.error('Error deleting estimate:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
