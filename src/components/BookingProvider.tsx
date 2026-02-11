"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { readBookingData, createBooking, updateBooking, deleteBooking, updateBookingStatus, searchBookings, getBookingsByStatus } from "@/lib/data";

interface Booking {
  id: string;
  clientId: string;
  clientName: string;
  clientPhone: string;
  serviceId: string;
  serviceName: string;
  date: string;
  time: string;
  address: string;
  city: string;
  status: "new" | "contacted" | "scheduled" | "in_progress" | "completed" | "cancelled" | "overdue";
  price: number;
  paymentStatus: "pending" | "deposit" | "paid" | "refunded" | "failed";
  description: string;
  createdAt: string;
  service?: any;
  client?: any;
}

interface BookingContextType {
  bookings: Booking[];
  loading: boolean;
  error: string | null;
  refreshBookings: () => Promise<void>;
  createBooking: (data: any) => Promise<Booking>;
  updateBooking: (id: string, data: any) => Promise<Booking>;
  deleteBooking: (id: string) => Promise<void>;
  updateBookingStatus: (id: string, status: string) => Promise<Booking>;
  searchBookings: (query: string) => Promise<Booking[]>;
  filterByStatus: (status: string) => Promise<Booking[]>;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export function BookingProvider({ children }: { children: ReactNode }) {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchBookings = async () => {
    try {
      setLoading(true);
      const data = await readBookingData();
      setBookings(data.bookings || []);
      setError(null);
    } catch (err) {
      setError("Failed to load bookings");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const value: BookingContextType = {
    bookings,
    loading,
    error,
    refreshBookings: fetchBookings,
    createBooking: async (data) => {
      const newBooking = await createBooking(data);
      await fetchBookings();
      return newBooking;
    },
    updateBooking: async (id, data) => {
      const updatedBooking = await updateBooking(id, data);
      await fetchBookings();
      return updatedBooking;
    },
    deleteBooking: async (id) => {
      await deleteBooking(id);
      await fetchBookings();
    },
    updateBookingStatus: async (id, status) => {
      const updatedBooking = await updateBookingStatus(id, status);
      await fetchBookings();
      return updatedBooking;
    },
    searchBookings: async (query) => {
      const data = await searchBookings(query);
      setBookings(data.bookings || []);
      return data.bookings || [];
    },
    filterByStatus: async (status) => {
      const data = await getBookingsByStatus(status);
      setBookings(data.bookings || []);
      return data.bookings || [];
    },
  };

  return <BookingContext.Provider value={value}>{children}</BookingContext.Provider>;
}

export function useBookings() {
  const context = useContext(BookingContext);
  if (context === undefined) {
    throw new Error("useBookings must be used within a BookingProvider");
  }
  return context;
}
