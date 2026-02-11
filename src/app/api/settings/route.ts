import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { getSettings, upsertSettings, createActivityLog } from '@/lib/db';

const DEFAULT_SETTINGS: Record<string, any> = {
  companyName: 'RGV Handyman',
  companyTagline: 'Professional Handyman Services in South Texas',
  companyDescription: 'Professional handyman services in Hidalgo, Cameron, and Starr counties.',
  companyPhone: '(956) 200-2815',
  companyEmail: 'hello@rgvhandyman.softwarepros.org',
  companyAddress: '123 Tech Plaza',
  companyCity: 'McAllen',
  companyState: 'TX',
  companyZip: '78501',
  serviceAreas: ['McAllen', 'Edinburg', 'Mission', 'Brownsville', 'Harlingen', 'Weslaco', 'Pharr', 'San Juan'],
  businessHours: {
    Monday: { open: '08:00', close: '20:00' },
    Tuesday: { open: '08:00', close: '20:00' },
    Wednesday: { open: '08:00', close: '20:00' },
    Thursday: { open: '08:00', close: '20:00' },
    Friday: { open: '08:00', close: '20:00' },
    Saturday: { open: '09:00', close: '17:00' },
    Sunday: { open: '', close: '' },
  },
  paymentMethods: ['Cash', 'Credit Card', 'Debit Card', 'Venmo', 'Zelle'],
  taxRate: 8.25,
  notificationEmail: 'notifications@rgvhandyman.softwarepros.org',
  notes: '',
};

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const dbSettings = await getSettings();
    // Merge defaults with DB values (DB values take precedence)
    const settings = { ...DEFAULT_SETTINGS, ...dbSettings };

    return NextResponse.json({ settings });
  } catch (error) {
    console.error('Error fetching settings:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const data = await request.json();
    await upsertSettings(data);

    await createActivityLog({
      action: 'updated',
      entityType: 'settings',
      entityId: 'global',
      entityName: 'Company Settings',
      details: { keys: Object.keys(data) },
      userName: session.user?.name || session.user?.email || 'Admin',
    });

    const dbSettings = await getSettings();
    const settings = { ...DEFAULT_SETTINGS, ...dbSettings };

    return NextResponse.json({ settings, message: 'Settings saved successfully' });
  } catch (error) {
    console.error('Error updating settings:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
