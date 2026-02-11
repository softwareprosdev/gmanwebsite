/**
 * Bookings API Routes
 * /api/bookings
 */

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import {
  getBookings,
  getBookingsByStatus,
  getBookingsByClient,
  searchBookings,
  getBookingsByDateRange,
  createBooking,
} from '@/lib/db';

// GET /api/bookings - Get all bookings (with optional filters)
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
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');

    let bookings;
    if (status) {
      bookings = await getBookingsByStatus(status);
    } else if (clientId) {
      bookings = await getBookingsByClient(clientId);
    } else if (search) {
      bookings = await searchBookings(search);
    } else if (startDate && endDate) {
      bookings = await getBookingsByDateRange(new Date(startDate), new Date(endDate));
    } else {
      bookings = await getBookings();
    }

    return NextResponse.json({ bookings });
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// POST /api/bookings - Create a new booking
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();
    const { clientId, clientName, clientPhone, serviceId, serviceName, date, time, address, city, status, price, paymentStatus, description } = data;

    if (!clientId || !clientName || !clientPhone || !serviceId || !date || !time || !address || price === undefined) {
      return NextResponse.json({ error: 'Required fields: clientId, clientName, clientPhone, serviceId, date, time, address, price' }, { status: 400 });
    }

    const booking = await createBooking({
      clientId,
      clientName,
      clientPhone,
      serviceId,
      serviceName,
      date: new Date(date),
      time,
      address,
      city: city || undefined,
      status: status || 'new',
      price,
      paymentStatus: paymentStatus || 'pending',
      description: description || undefined,
    });

    return NextResponse.json({ booking }, { status: 201 });
  } catch (error) {
    console.error('Error creating booking:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
