/**
 * Server-side Database Access Layer
 * Direct Prisma queries for use in API routes and server components
 */

import { prisma } from './prisma';

// ==========================================
// CLIENTS
// ==========================================

export async function getClients() {
  return prisma.client.findMany({
    orderBy: { createdAt: 'desc' },
  });
}

export async function getClientById(id: string) {
  return prisma.client.findUnique({
    where: { id },
    include: { bookings: true },
  });
}

export async function getClientsByCity(city: string) {
  return prisma.client.findMany({
    where: { city: { equals: city, mode: 'insensitive' } },
    orderBy: { createdAt: 'desc' },
  });
}

export async function searchClients(query: string) {
  return prisma.client.findMany({
    where: {
      OR: [
        { name: { contains: query, mode: 'insensitive' } },
        { email: { contains: query, mode: 'insensitive' } },
        { phone: { contains: query } },
        { city: { contains: query, mode: 'insensitive' } },
      ],
    },
    orderBy: { createdAt: 'desc' },
  });
}

export async function createClient(data: {
  name: string;
  email?: string;
  phone: string;
  address?: string;
  city?: string;
  zone?: string;
  status?: string;
  notes?: string;
}) {
  const count = await prisma.client.count();
  const clientCode = `CL${String(count + 1).padStart(3, '0')}`;

  return prisma.client.create({
    data: {
      clientCode,
      name: data.name,
      email: data.email || null,
      phone: data.phone,
      address: data.address || null,
      city: data.city || null,
      zone: data.zone || null,
      status: (data.status as any) || 'active',
      notes: data.notes || null,
    },
  });
}

export async function updateClient(id: string, data: Record<string, any>) {
  return prisma.client.update({
    where: { id },
    data,
  });
}

export async function deleteClient(id: string) {
  return prisma.client.delete({
    where: { id },
  });
}

// ==========================================
// SERVICES
// ==========================================

export async function getServices(includeDisabled = false) {
  return prisma.service.findMany({
    where: includeDisabled ? {} : { available: true },
    orderBy: { createdAt: 'desc' },
  });
}

export async function getServiceById(id: string) {
  return prisma.service.findUnique({
    where: { id },
  });
}

export async function createService(data: {
  serviceCode: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  defaultPriceMin: number;
  defaultPriceMax: number;
  features: any;
  category: string;
  available?: boolean;
}) {
  return prisma.service.create({
    data: {
      serviceCode: data.serviceCode,
      title: data.title,
      description: data.description,
      icon: data.icon,
      color: data.color,
      defaultPriceMin: data.defaultPriceMin,
      defaultPriceMax: data.defaultPriceMax,
      features: data.features,
      category: data.category,
      available: data.available ?? true,
    },
  });
}

export async function updateService(id: string, data: Record<string, any>) {
  return prisma.service.update({
    where: { id },
    data,
  });
}

export async function deleteService(id: string) {
  return prisma.service.delete({
    where: { id },
  });
}

// ==========================================
// BOOKINGS
// ==========================================

export async function getBookings() {
  return prisma.booking.findMany({
    orderBy: { createdAt: 'desc' },
    include: { client: true, service: true },
  });
}

export async function getBookingById(id: string) {
  return prisma.booking.findUnique({
    where: { id },
    include: { client: true, service: true },
  });
}

export async function getBookingsByStatus(status: string) {
  return prisma.booking.findMany({
    where: { status: status as any },
    orderBy: { createdAt: 'desc' },
  });
}

export async function getBookingsByClient(clientId: string) {
  return prisma.booking.findMany({
    where: { clientId },
    orderBy: { createdAt: 'desc' },
  });
}

export async function searchBookings(query: string) {
  return prisma.booking.findMany({
    where: {
      OR: [
        { clientName: { contains: query, mode: 'insensitive' } },
        { serviceName: { contains: query, mode: 'insensitive' } },
        { bookingCode: { contains: query, mode: 'insensitive' } },
        { address: { contains: query, mode: 'insensitive' } },
      ],
    },
    orderBy: { createdAt: 'desc' },
  });
}

export async function getBookingsByDateRange(startDate: Date, endDate: Date) {
  return prisma.booking.findMany({
    where: {
      date: { gte: startDate, lte: endDate },
    },
    orderBy: { date: 'desc' },
  });
}

export async function createBooking(data: {
  clientId: string;
  clientName: string;
  clientPhone: string;
  serviceId: string;
  serviceName: string;
  date: Date;
  time: string;
  address: string;
  city?: string;
  status?: string;
  price: number;
  paymentStatus?: string;
  description?: string;
}) {
  const count = await prisma.booking.count();
  const bookingCode = `BK${String(count + 1).padStart(3, '0')}`;

  return prisma.booking.create({
    data: {
      bookingCode,
      clientId: data.clientId,
      clientName: data.clientName,
      clientPhone: data.clientPhone,
      serviceId: data.serviceId,
      serviceName: data.serviceName,
      date: data.date,
      time: data.time,
      address: data.address,
      city: data.city || null,
      status: (data.status as any) || 'new',
      price: data.price,
      paymentStatus: (data.paymentStatus as any) || 'pending',
      description: data.description || null,
    },
  });
}

export async function updateBooking(id: string, data: Record<string, any>) {
  return prisma.booking.update({
    where: { id },
    data,
  });
}

export async function deleteBooking(id: string) {
  return prisma.booking.delete({
    where: { id },
  });
}

// ==========================================
// STATISTICS
// ==========================================

export async function getDashboardStats() {
  const [totalClients, bookings] = await Promise.all([
    prisma.client.count(),
    prisma.booking.findMany(),
  ]);

  const totalBookings = bookings.length;
  const pendingBookings = bookings.filter(b => b.status === 'new' || b.status === 'contacted').length;
  const completedBookings = bookings.filter(b => b.status === 'completed').length;
  const totalRevenue = bookings.reduce((sum, b) => sum + (b.price || 0), 0);

  return {
    totalClients,
    totalBookings,
    pendingBookings,
    completedBookings,
    totalRevenue,
  };
}
