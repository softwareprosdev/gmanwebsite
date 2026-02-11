/**
 * Clients API Routes
 * /api/clients
 */

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getClients, searchClients, getClientsByCity, createClient } from '@/lib/db';

// GET /api/clients - Get all clients (with optional search)
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const search = request.nextUrl.searchParams.get('search');
    const city = request.nextUrl.searchParams.get('city');

    let clients;
    if (search) {
      clients = await searchClients(search);
    } else if (city) {
      clients = await getClientsByCity(city);
    } else {
      clients = await getClients();
    }

    return NextResponse.json({ clients });
  } catch (error) {
    console.error('Error fetching clients:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// POST /api/clients - Create a new client
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();
    const { name, email, phone, address, city, zone, status, notes } = data;

    if (!name || !phone) {
      return NextResponse.json({ error: 'Name and phone are required' }, { status: 400 });
    }

    const client = await createClient({
      name,
      email: email || undefined,
      phone,
      address: address || undefined,
      city: city || undefined,
      zone: zone || undefined,
      status: status || 'active',
      notes: notes || undefined,
    });

    return NextResponse.json({ client }, { status: 201 });
  } catch (error) {
    console.error('Error creating client:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
