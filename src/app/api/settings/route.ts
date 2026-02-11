/**
 * Settings API Routes
 * /api/settings
 */

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

// GET /api/settings - Get admin settings
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Return default settings structure
    // In production, these would be stored in the database
    const settings = {
      companyName: 'RGV Handyman',
      companyEmail: 'info@rgvhandyman.softwarepros.org',
      companyPhone: '(956) 555-0100',
      address: '1234 Main St, McAllen, TX 78501',
      businessHours: {
        Monday: '8:00 AM - 6:00 PM',
        Tuesday: '8:00 AM - 6:00 PM',
        Wednesday: '8:00 AM - 6:00 PM',
        Thursday: '8:00 AM - 6:00 PM',
        Friday: '8:00 AM - 6:00 PM',
        Saturday: '9:00 AM - 2:00 PM',
        Sunday: 'Closed',
      },
      services: [
        'plumbing',
        'electrical',
        'general',
        'painting',
        'hvac',
        'smart',
      ],
      notificationEmail: 'notifications@rgvhandyman.softwarepros.org',
    };

    return NextResponse.json({ settings });
  } catch (error) {
    console.error('Error fetching settings:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// PUT /api/settings - Update admin settings
export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // In production, this would update the database
    // For now, we return success with the updated settings
    const data = await request.json();

    return NextResponse.json({ settings: data, message: 'Settings updated successfully' });
  } catch (error) {
    console.error('Error updating settings:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
