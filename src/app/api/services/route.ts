/**
 * Services API Routes
 * /api/services
 */

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getServices, createService } from '@/lib/db';

// GET /api/services - Get all services
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const includeDisabled = request.nextUrl.searchParams.get('includeDisabled') === 'true';
    const services = await getServices(includeDisabled);

    return NextResponse.json({ services });
  } catch (error) {
    console.error('Error fetching services:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// POST /api/services - Create a new service
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();
    const { serviceCode, title, description, icon, color, defaultPriceMin, defaultPriceMax, features, category, available } = data;

    if (!serviceCode || !title) {
      return NextResponse.json({ error: 'Service code and title are required' }, { status: 400 });
    }

    const service = await createService({
      serviceCode,
      title,
      description: description || '',
      icon: icon || '🛠️',
      color: color || 'gray',
      defaultPriceMin: defaultPriceMin || 0,
      defaultPriceMax: defaultPriceMax || 0,
      features: features || [],
      category: category || 'General',
      available: available !== undefined ? available : true,
    });

    return NextResponse.json({ service }, { status: 201 });
  } catch (error) {
    console.error('Error creating service:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
