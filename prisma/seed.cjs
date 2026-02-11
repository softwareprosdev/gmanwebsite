/**
 * Database seeder for RGV Handyman
 * Run: node prisma/seed.cjs
 */

const { PrismaClient } = require('@prisma/client');
const { hash } = require('argon2');

const prisma = new PrismaClient();

async function seed() {
  console.log('Starting database seed...');

  // 1. Create admin user
  const email = 'admin@rgvhandyman.com';
  const defaultPassword = 'RGVadmin2024!';
  const hashedPassword = await hash(defaultPassword);

  const existingUser = await prisma.adminUser.findUnique({ where: { email } });
  if (!existingUser) {
    await prisma.adminUser.create({
      data: { email, name: 'Administrator', password: hashedPassword, role: 'ADMIN', isLocked: false },
    });
    console.log('Admin user created');
  } else {
    console.log('Admin user already exists');
  }

  // 2. Create services
  const services = [
    { serviceCode: 'plumbing', title: 'Plumbing Repair', description: 'Professional plumbing services', icon: '💧', color: 'cyan', defaultPriceMin: 100, defaultPriceMax: 500, features: ['Smart leak detection', 'Pipe repair'], category: 'Repair', available: true },
    { serviceCode: 'electrical', title: 'Electrical Services', description: 'Expert electrical work', icon: '⚡', color: 'yellow', defaultPriceMin: 150, defaultPriceMax: 800, features: ['Wiring', 'Panel upgrades'], category: 'Installation', available: true },
    { serviceCode: 'general', title: 'General Repair', description: 'All-in-one repair solutions', icon: '🛠️', color: 'orange', defaultPriceMin: 75, defaultPriceMax: 300, features: ['Furniture repair', 'Hardware installation'], category: 'Repair', available: true },
    { serviceCode: 'painting', title: 'Interior & Exterior', description: 'Professional painting services', icon: '🎨', color: 'purple', defaultPriceMin: 300, defaultPriceMax: 2000, features: ['Room painting', 'Deck & fence'], category: 'Renovation', available: true },
    { serviceCode: 'hvac', title: 'Climate Control', description: 'Heating and cooling system installation', icon: '❄️', color: 'blue', defaultPriceMin: 200, defaultPriceMax: 1000, features: ['AC repair', 'Heating system'], category: 'Installation', available: true },
    { serviceCode: 'smart', title: 'Smart Home Setup', description: 'Integrate your home with smart technology', icon: '🤖', color: 'pink', defaultPriceMin: 250, defaultPriceMax: 1500, features: ['Security systems', 'Smart lighting'], category: 'Installation', available: true },
  ];

  for (const service of services) {
    await prisma.service.upsert({
      where: { serviceCode: service.serviceCode },
      update: service,
      create: service,
    });
  }
  console.log('Services created');

  // 3. Create clients
  const clients = [
    { clientCode: 'CL001', name: 'Juan Martinez', email: 'juan.martinez@email.com', phone: '(956) 555-0101', address: '1234 Palm Ave, McAllen, TX 78501', city: 'McAllen', zone: 'Lower Rio Grande Valley', status: 'active', notes: 'Prefers evening appointments' },
    { clientCode: 'CL002', name: 'Maria Garcia', email: 'mariagarcia@email.com', phone: '(956) 555-0102', address: '4567 Oak St, Edinburg, TX 78539', city: 'Edinburg', zone: 'Lower Rio Grande Valley', status: 'active', notes: 'First-time customer' },
    { clientCode: 'CL003', name: 'Robert & Lisa Thompson', email: 'thompsonfamily@email.com', phone: '(956) 555-0103', address: '7890 Maple Dr, Mission, TX 78572', city: 'Mission', zone: 'Lower Rio Grande Valley', status: 'active', notes: 'Large property maintenance' },
    { clientCode: 'CL004', name: 'Cindy Lopez', email: 'cindy.lopez@email.com', phone: '(956) 555-0104', address: '2345 Brownsville Hwy, Harlingen, TX 78550', city: 'Harlingen', zone: 'Lower Rio Grande Valley', status: 'inactive', notes: 'Moved out of service area' },
    { clientCode: 'CL005', name: 'Carlos Rodriguez', email: 'carlos.rodriguez@email.com', phone: '(956) 555-0105', address: '5678 Veterans Blvd, Brownsville, TX 78520', city: 'Brownsville', zone: 'Lower Rio Grande Valley', status: 'active', notes: 'Regular customer' },
  ];

  for (const client of clients) {
    await prisma.client.upsert({
      where: { clientCode: client.clientCode },
      update: client,
      create: client,
    });
  }
  console.log('Clients created');

  // Get client IDs for bookings
  const client1 = await prisma.client.findUnique({ where: { clientCode: 'CL001' } });
  const client3 = await prisma.client.findUnique({ where: { clientCode: 'CL003' } });
  const client5 = await prisma.client.findUnique({ where: { clientCode: 'CL005' } });

  const servicePlumbing = await prisma.service.findUnique({ where: { serviceCode: 'plumbing' } });
  const serviceHvac = await prisma.service.findUnique({ where: { serviceCode: 'hvac' } });
  const serviceElectrical = await prisma.service.findUnique({ where: { serviceCode: 'electrical' } });

  // 4. Create bookings
  const bookings = [
    {
      bookingCode: 'BK001',
      clientId: client1.id,
      clientName: 'Juan Martinez',
      clientPhone: '(956) 555-0101',
      serviceId: servicePlumbing.id,
      serviceName: 'Plumbing Repair',
      date: new Date('2026-01-15'),
      time: '14:00',
      address: '1234 Palm Ave, McAllen, TX 78501',
      city: 'McAllen',
      status: 'completed',
      price: 250,
      paymentStatus: 'paid',
      description: 'Leaky kitchen faucet replacement'
    },
    {
      bookingCode: 'BK002',
      clientId: client3.id,
      clientName: 'Robert & Lisa Thompson',
      clientPhone: '(956) 555-0103',
      serviceId: serviceHvac.id,
      serviceName: 'Climate Control',
      date: new Date('2026-01-18'),
      time: '09:00',
      address: '7890 Maple Dr, Mission, TX 78572',
      city: 'Mission',
      status: 'completed',
      price: 450,
      paymentStatus: 'paid',
      description: 'AC unit inspection and filter replacement'
    },
    {
      bookingCode: 'BK003',
      clientId: client5.id,
      clientName: 'Carlos Rodriguez',
      clientPhone: '(956) 555-0105',
      serviceId: serviceElectrical.id,
      serviceName: 'Electrical Services',
      date: new Date('2026-01-22'),
      time: '10:00',
      address: '5678 Veterans Blvd, Brownsville, TX 78520',
      city: 'Brownsville',
      status: 'completed',
      price: 375,
      paymentStatus: 'paid',
      description: 'Rewiring master bedroom'
    },
  ];

  for (const booking of bookings) {
    const existingBooking = await prisma.booking.findUnique({ where: { bookingCode: booking.bookingCode } });
    if (existingBooking) {
      console.log(`Booking ${booking.bookingCode} already exists, updating...`);
      await prisma.booking.update({
        where: { bookingCode: booking.bookingCode },
        data: booking,
      });
    } else {
      await prisma.booking.create({
        data: booking,
      });
    }
  }
  console.log('Bookings created');

  // 5. Update client stats
  const allClients = await prisma.client.findMany();
  for (const client of allClients) {
    const bookingsCount = await prisma.booking.count({ where: { clientId: client.id } });
    const lastBooking = await prisma.booking.findFirst({
      where: { clientId: client.id },
      orderBy: { date: 'desc' },
      select: { date: true },
    });
    await prisma.client.update({
      where: { id: client.id },
      data: { totalBookings: bookingsCount, lastBooking: lastBooking?.date || null },
    });
  }
  console.log('Client stats updated');

  console.log('Database seeding completed successfully');
  await prisma.$disconnect();
}

seed().catch(console.error);
