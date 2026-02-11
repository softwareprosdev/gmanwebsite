/**
 * Data Access Layer - API implementation
 * Uses API routes for database operations
 */

const API_BASE_URL = '/api';

// ==========================================
// CLIENTS
// ==========================================

export async function readClientData() {
  const response = await fetch(`${API_BASE_URL}/clients`);
  if (!response.ok) throw new Error('Failed to fetch clients');
  const data = await response.json();
  return data;
}

export async function getClientById(id: string) {
  const response = await fetch(`${API_BASE_URL}/clients/${id}`);
  if (!response.ok) throw new Error('Failed to fetch client');
  const data = await response.json();
  return data;
}

export async function getClientsByCity(city: string) {
  const response = await fetch(`${API_BASE_URL}/clients?city=${encodeURIComponent(city)}`);
  if (!response.ok) throw new Error('Failed to fetch clients');
  const data = await response.json();
  return data;
}

export async function searchClients(query: string) {
  const response = await fetch(`${API_BASE_URL}/clients?search=${encodeURIComponent(query)}`);
  if (!response.ok) throw new Error('Failed to search clients');
  const data = await response.json();
  return data;
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
  const response = await fetch(`${API_BASE_URL}/clients`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Failed to create client');
  return await response.json();
}

export async function updateClient(id: string, data: Partial<{ name: string; email: string; phone: string; address: string; city: string; zone: string; status: string; notes: string }>) {
  const response = await fetch(`${API_BASE_URL}/clients/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Failed to update client');
  return await response.json();
}

export async function deleteClient(id: string) {
  const response = await fetch(`${API_BASE_URL}/clients/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Failed to delete client');
  return await response.json();
}

// ==========================================
// SERVICES
// ==========================================

export async function readServicesData() {
  const response = await fetch(`${API_BASE_URL}/services`);
  if (!response.ok) throw new Error('Failed to fetch services');
  const data = await response.json();
  return data;
}

export async function getAllServices() {
  const response = await fetch(`${API_BASE_URL}/services?includeDisabled=true`);
  if (!response.ok) throw new Error('Failed to fetch services');
  const data = await response.json();
  return data;
}

export async function getServiceById(id: string) {
  const response = await fetch(`${API_BASE_URL}/services/${id}`);
  if (!response.ok) throw new Error('Failed to fetch service');
  const data = await response.json();
  return data;
}

export async function getServiceByCode(code: string) {
  const services = await getAllServices();
  return services.services.find((s: any) => s.serviceCode === code);
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
  const response = await fetch(`${API_BASE_URL}/services`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Failed to create service');
  return await response.json();
}

export async function updateService(id: string, data: Partial<{ title: string; description: string; icon: string; color: string; defaultPriceMin: number; defaultPriceMax: number; features: any; category: string; available: boolean }>) {
  const response = await fetch(`${API_BASE_URL}/services/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Failed to update service');
  return await response.json();
}

export async function deleteService(id: string) {
  const response = await fetch(`${API_BASE_URL}/services/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Failed to delete service');
  return await response.json();
}

// ==========================================
// BOOKINGS
// ==========================================

export async function readBookingData() {
  const response = await fetch(`${API_BASE_URL}/bookings`);
  if (!response.ok) throw new Error('Failed to fetch bookings');
  const data = await response.json();
  return data;
}

export async function getBookingById(id: string) {
  const response = await fetch(`${API_BASE_URL}/bookings/${id}`);
  if (!response.ok) throw new Error('Failed to fetch booking');
  const data = await response.json();
  return data;
}

export async function getBookingsByClient(clientId: string) {
  const response = await fetch(`${API_BASE_URL}/bookings?clientId=${encodeURIComponent(clientId)}`);
  if (!response.ok) throw new Error('Failed to fetch bookings');
  const data = await response.json();
  return data;
}

export async function getBookingsByStatus(status: string) {
  const response = await fetch(`${API_BASE_URL}/bookings?status=${encodeURIComponent(status)}`);
  if (!response.ok) throw new Error('Failed to fetch bookings');
  const data = await response.json();
  return data;
}

export async function getBookingsByDateRange(startDate: Date, endDate: Date) {
  const response = await fetch(`${API_BASE_URL}/bookings?startDate=${encodeURIComponent(startDate.toISOString())}&endDate=${encodeURIComponent(endDate.toISOString())}`);
  if (!response.ok) throw new Error('Failed to fetch bookings');
  const data = await response.json();
  return data;
}

export async function searchBookings(query: string) {
  const response = await fetch(`${API_BASE_URL}/bookings?search=${encodeURIComponent(query)}`);
  if (!response.ok) throw new Error('Failed to search bookings');
  const data = await response.json();
  return data;
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
  const response = await fetch(`${API_BASE_URL}/bookings`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Failed to create booking');
  return await response.json();
}

export async function updateBooking(id: string, data: Partial<{ clientId: string; clientName: string; clientPhone: string; serviceId: string; serviceName: string; date: Date; time: string; address: string; city: string; status: string; price: number; paymentStatus: string; description: string; completedAt: Date }>) {
  const response = await fetch(`${API_BASE_URL}/bookings/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Failed to update booking');
  return await response.json();
}

export async function deleteBooking(id: string) {
  const response = await fetch(`${API_BASE_URL}/bookings/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Failed to delete booking');
  return await response.json();
}

export async function updateBookingStatus(bookingId: string, newStatus: string) {
  const response = await fetch(`${API_BASE_URL}/bookings/${bookingId}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ status: newStatus }),
  });
  if (!response.ok) throw new Error('Failed to update booking status');
  return await response.json();
}

// ==========================================
// ESTIMATES
// ==========================================

export async function readEstimateData() {
  const response = await fetch(`${API_BASE_URL}/estimates`);
  if (!response.ok) throw new Error('Failed to fetch estimates');
  return await response.json();
}

export async function getEstimateById(id: string) {
  const response = await fetch(`${API_BASE_URL}/estimates/${id}`);
  if (!response.ok) throw new Error('Failed to fetch estimate');
  return await response.json();
}

export async function searchEstimates(query: string) {
  const response = await fetch(`${API_BASE_URL}/estimates?search=${encodeURIComponent(query)}`);
  if (!response.ok) throw new Error('Failed to search estimates');
  return await response.json();
}

export async function getEstimatesByStatus(status: string) {
  const response = await fetch(`${API_BASE_URL}/estimates?status=${encodeURIComponent(status)}`);
  if (!response.ok) throw new Error('Failed to fetch estimates');
  return await response.json();
}

export async function createEstimate(data: any) {
  const response = await fetch(`${API_BASE_URL}/estimates`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Failed to create estimate');
  return await response.json();
}

export async function updateEstimate(id: string, data: any) {
  const response = await fetch(`${API_BASE_URL}/estimates/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Failed to update estimate');
  return await response.json();
}

export async function deleteEstimate(id: string) {
  const response = await fetch(`${API_BASE_URL}/estimates/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Failed to delete estimate');
  return await response.json();
}

// ==========================================
// INVOICES
// ==========================================

export async function readInvoiceData() {
  const response = await fetch(`${API_BASE_URL}/invoices`);
  if (!response.ok) throw new Error('Failed to fetch invoices');
  return await response.json();
}

export async function getInvoiceById(id: string) {
  const response = await fetch(`${API_BASE_URL}/invoices/${id}`);
  if (!response.ok) throw new Error('Failed to fetch invoice');
  return await response.json();
}

export async function searchInvoices(query: string) {
  const response = await fetch(`${API_BASE_URL}/invoices?search=${encodeURIComponent(query)}`);
  if (!response.ok) throw new Error('Failed to search invoices');
  return await response.json();
}

export async function getInvoicesByStatus(status: string) {
  const response = await fetch(`${API_BASE_URL}/invoices?status=${encodeURIComponent(status)}`);
  if (!response.ok) throw new Error('Failed to fetch invoices');
  return await response.json();
}

export async function createInvoice(data: any) {
  const response = await fetch(`${API_BASE_URL}/invoices`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Failed to create invoice');
  return await response.json();
}

export async function updateInvoice(id: string, data: any) {
  const response = await fetch(`${API_BASE_URL}/invoices/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Failed to update invoice');
  return await response.json();
}

export async function deleteInvoice(id: string) {
  const response = await fetch(`${API_BASE_URL}/invoices/${id}`, {
    method: 'DELETE',
  });
  if (!response.ok) throw new Error('Failed to delete invoice');
  return await response.json();
}

// ==========================================
// ACTIVITY LOG
// ==========================================

export async function readActivityLog(limit = 50) {
  const response = await fetch(`${API_BASE_URL}/activity?limit=${limit}`);
  if (!response.ok) throw new Error('Failed to fetch activity log');
  return await response.json();
}

export async function getActivityByEntity(entityType: string, entityId: string) {
  const response = await fetch(`${API_BASE_URL}/activity?entityType=${encodeURIComponent(entityType)}&entityId=${encodeURIComponent(entityId)}`);
  if (!response.ok) throw new Error('Failed to fetch activity');
  return await response.json();
}

// ==========================================
// SETTINGS (DB-backed)
// ==========================================

export async function readSettings() {
  const response = await fetch(`${API_BASE_URL}/settings`);
  if (!response.ok) throw new Error('Failed to fetch settings');
  return await response.json();
}

export async function saveSettings(data: Record<string, any>) {
  const response = await fetch(`${API_BASE_URL}/settings`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Failed to save settings');
  return await response.json();
}

// ==========================================
// STATISTICS
// ==========================================

export async function calculateDashboardStats() {
  const [bookingsResponse, clientsResponse] = await Promise.all([
    fetch(`${API_BASE_URL}/bookings`),
    fetch(`${API_BASE_URL}/clients`),
  ]);

  if (!bookingsResponse.ok) throw new Error('Failed to fetch bookings');
  const bookingsData = await bookingsResponse.json();

  if (!clientsResponse.ok) throw new Error('Failed to fetch clients');
  const clientsData = await clientsResponse.json();

  const bookings = bookingsData.bookings || [];
  const totalClients = clientsData.clients?.length || 0;

  const pendingBookings = bookings.filter((b: any) => b.status === 'new' || b.status === 'contacted').length;
  const scheduledBookings = bookings.filter((b: any) => b.status === 'scheduled').length;
  const completedBookings = bookings.filter((b: any) => b.status === 'completed').length;
  const cancelledBookings = bookings.filter((b: any) => b.status === 'cancelled').length;
  const totalRevenue = bookings.reduce((sum: number, b: any) => sum + (b.price || 0), 0);

  return {
    totalClients,
    totalBookings: bookings.length,
    pendingBookings,
    scheduledBookings,
    completedBookings,
    cancelledBookings,
    totalRevenue,
  };
}

export async function getRecentBookings(limit: number = 5) {
  const bookings = await readBookingData();
  return (bookings.bookings || []).slice(0, limit);
}

export async function getBookingsByDay(days: number = 30) {
  const bookings = await readBookingData();
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);

  return (bookings.bookings || []).filter((b: any) => {
    const bookingDate = new Date(b.createdAt);
    return bookingDate >= startDate;
  });
}
