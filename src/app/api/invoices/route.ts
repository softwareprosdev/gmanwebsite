import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import {
  getInvoices,
  getInvoicesByStatus,
  getInvoicesByClient,
  searchInvoices,
  createInvoice,
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

    let invoices;
    if (status) {
      invoices = await getInvoicesByStatus(status);
    } else if (clientId) {
      invoices = await getInvoicesByClient(clientId);
    } else if (search) {
      invoices = await searchInvoices(search);
    } else {
      invoices = await getInvoices();
    }

    return NextResponse.json({ invoices });
  } catch (error) {
    console.error('Error fetching invoices:', error);
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

    const invoice = await createInvoice(data);

    await createActivityLog({
      action: 'created',
      entityType: 'invoice',
      entityId: invoice.id,
      entityName: invoice.invoiceCode,
      details: { clientName: invoice.clientName, total: invoice.total },
      userName: session.user?.name || session.user?.email || 'Admin',
    });

    return NextResponse.json({ invoice }, { status: 201 });
  } catch (error) {
    console.error('Error creating invoice:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
