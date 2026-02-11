// Data reader functions for admin panel
// In production, these would fetch from an API

import clientsData from "./clients.json";
import bookingsData from "./bookings.json";
import { services as servicesConfig } from "./services";

// Clients
export function readClientData() {
  return clientsData as { clients: any[] };
}

export function getClientById(id: string) {
  const data = readClientData();
  return data.clients.find((c) => c.id === id);
}

export function getClientsByCity(city: string) {
  const data = readClientData();
  return data.clients.filter((c) => c.city.toLowerCase() === city.toLowerCase());
}

export function searchClients(query: string) {
  const data = readClientData();
  const lowerQuery = query.toLowerCase();
  return data.clients.filter(
    (c) =>
      c.name.toLowerCase().includes(lowerQuery) ||
      c.email.toLowerCase().includes(lowerQuery) ||
      c.phone.includes(lowerQuery) ||
      c.city.toLowerCase().includes(lowerQuery)
  );
}

// Bookings
export function readBookingData() {
  return bookingsData as { bookings: any[] };
}

export function getBookingById(id: string) {
  const data = readBookingData();
  return data.bookings.find((b) => b.id === id);
}

export function getBookingsByClient(clientId: string) {
  const data = readBookingData();
  return data.bookings.filter((b) => b.clientId === clientId);
}

export function getBookingsByStatus(status: string) {
  const data = readBookingData();
  return data.bookings.filter((b) => b.status === status);
}

export function searchBookings(query: string) {
  const data = readBookingData();
  const lowerQuery = query.toLowerCase();
  return data.bookings.filter(
    (b) =>
      b.clientName.toLowerCase().includes(lowerQuery) ||
      b.serviceName.toLowerCase().includes(lowerQuery) ||
      b.id.toLowerCase().includes(lowerQuery)
  );
}

export function updateBookingStatus(bookingId: string, newStatus: string) {
  const data = readBookingData();
  const booking = data.bookings.find((b) => b.id === bookingId);
  if (booking) {
    booking.status = newStatus;
  }
  return booking;
}

// Services
export function readServicesData() {
  return servicesConfig;
}

export function getServiceById(id: string) {
  return servicesConfig.find((s) => s.id === id);
}

// Calculate stats
export function calculateDashboardStats() {
  const clientsData = readClientData();
  const bookingsData = readBookingData();

  const totalClients = clientsData.clients.length;
  const totalBookings = bookingsData.bookings.length;
  const pendingBookings = bookingsData.bookings.filter((b: any) => b.status === "new" || b.status === "contacted").length;
  const scheduledBookings = bookingsData.bookings.filter((b: any) => b.status === "scheduled").length;
  const completedBookings = bookingsData.bookings.filter((b: any) => b.status === "completed").length;
  const cancelledBookings = bookingsData.bookings.filter((b: any) => b.status === "cancelled").length;
  const totalRevenue = bookingsData.bookings.reduce((sum: number, b: any) => sum + (b.price || 0), 0);

  return {
    totalClients,
    totalBookings,
    pendingBookings,
    scheduledBookings,
    completedBookings,
    cancelledBookings,
    totalRevenue,
  };
}
