"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { FaSearch, FaFilter, FaCalendar, FaClock, FaMapMarkerAlt, FaDollarSign, FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import { readBookingData, searchBookings, updateBookingStatus, readClientData } from "../lib/data";

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
  status: "new" | "contacted" | "scheduled" | "completed" | "cancelled";
  price: number;
  paymentStatus: "pending" | "deposit" | "paid" | "refunded";
  description: string;
  createdAt: string;
}

const statusColors = {
  new: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  contacted: "bg-amber-500/20 text-amber-300 border-amber-500/30",
  scheduled: "bg-purple-500/20 text-purple-300 border-purple-500/30",
  completed: "bg-green-500/20 text-green-300 border-green-500/30",
  cancelled: "bg-red-500/20 text-red-300 border-red-500/30",
};

const paymentStatusColors = {
  pending: "bg-gray-500/20 text-gray-300",
  deposit: "bg-amber-500/20 text-amber-300",
  paid: "bg-green-500/20 text-green-300",
  refunded: "bg-red-500/20 text-red-300",
};

export default function BookingsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [clients, setClients] = useState<any[]>([]);

  useState(() => {
    const bookingData = readBookingData();
    const clientData = readClientData();
    setBookings(bookingData.bookings as Booking[]);
    setClients(clientData.clients);
  });

  const filteredBookings = useMemo(() => {
    let result = bookings;

    // Apply status filter
    if (statusFilter !== "all") {
      result = result.filter((b) => b.status === statusFilter);
    }

    // Apply search
    if (searchQuery) {
      result = searchBookings(searchQuery) as Booking[];
    }

    return result;
  }, [bookings, statusFilter, searchQuery]);

  const handleStatusChange = (bookingId: string, newStatus: Booking["status"]) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === bookingId ? { ...b, status: newStatus } : b))
    );
  };

  const getClientName = (clientId: string) => {
    const client = clients.find((c) => c.id === clientId);
    return client ? client.name : "Unknown Client";
  };

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Bookings & Leads</h1>
          <p className="text-gray-400">Manage service requests and track job progress</p>
        </div>
        <button
          onClick={() => alert("Add booking feature coming soon!")}
          className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-teal-600 to-gold-600 rounded-lg text-white font-medium hover:shadow-[0_0_15px_rgba(0,128,128,0.3)] transition-all"
        >
          <FaPlus size={18} />
          <span>New Booking</span>
        </button>
      </div>

      {/* Filters */}
      <div className="bg-slate-900/50 backdrop-blur-lg border border-white/10 rounded-xl p-4">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="flex-1 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaSearch className="text-gray-500" />
            </div>
            <input
              type="text"
              placeholder="Search bookings..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-slate-950/50 border border-white/10 rounded-lg text-white placeholder-gray-600 focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
            />
          </div>

          {/* Status Filter */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FaFilter className="text-gray-500" />
            </div>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full pl-10 pr-8 py-2.5 bg-slate-950/50 border border-white/10 rounded-lg text-white focus:ring-2 focus:ring-teal-500 focus:border-teal-500 appearance-none cursor-pointer"
            >
              <option value="all">All Statuses</option>
              <option value="new">New</option>
              <option value="contacted">Contacted</option>
              <option value="scheduled">Scheduled</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
            <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
              <svg className="text-gray-500 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      {/* Bookings List */}
      <div className="space-y-4">
        {filteredBookings.length > 0 ? (
          filteredBookings.map((booking, index) => (
            <motion.div
              key={booking.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="bg-slate-900/50 backdrop-blur-lg border border-white/10 rounded-xl p-6 hover:border-teal-500/30 transition-all duration-300 group"
            >
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                {/* Booking Info */}
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                      <span className="text-teal-400">{booking.id}</span>
                      <span className="text-gray-400">•</span>
                      <span>{booking.clientName}</span>
                    </h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium border ${statusColors[booking.status]}`}>
                      {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400">
                    <div className="flex items-center">
                      <FaCalendar className="mr-2 text-teal-500" />
                      {booking.date}
                    </div>
                    <div className="flex items-center">
                      <FaClock className="mr-2 text-teal-500" />
                      {booking.time}
                    </div>
                    <div className="flex items-center">
                      <FaDollarSign className="mr-2 text-teal-500" />
                      <span className="font-medium text-white">${booking.price}</span>
                    </div>
                    <div className="flex items-center">
                      <span className={`px-2 py-0.5 rounded text-xs ${paymentStatusColors[booking.paymentStatus]}`}>
                        {booking.paymentStatus}
                      </span>
                    </div>
                  </div>

                  <div className="mt-2 text-gray-500 text-sm">
                    {booking.serviceName} - {booking.description}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap items-center gap-3 lg:justify-end">
                  {/* Status Dropdown */}
                  <div className="relative group/status">
                    <button className="px-4 py-2 rounded-lg bg-slate-800 text-gray-300 hover:bg-slate-700 transition-colors flex items-center gap-2">
                      <FaFilter size={14} />
                      <span>Update Status</span>
                    </button>
                    <div className="absolute right-0 mt-2 w-48 bg-slate-950 border border-white/10 rounded-lg shadow-xl hidden group-hover/status:block z-50">
                      {["new", "contacted", "scheduled", "completed", "cancelled"].map((status) => (
                        <button
                          key={status}
                          onClick={() => handleStatusChange(booking.id, status as any)}
                          className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-teal-500/10 hover:text-teal-400 capitalize"
                        >
                          {status}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => alert("Edit booking feature coming soon!")}
                    className="p-2 text-gray-400 hover:text-teal-400 hover:bg-teal-500/10 rounded-lg transition-colors"
                  >
                    <FaEdit size={18} />
                  </button>
                  <button
                    onClick={() => alert("Delete booking feature coming soon!")}
                    className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                  >
                    <FaTrash size={18} />
                  </button>
                </div>
              </div>

              {/* Location Info */}
              <div className="mt-4 pt-4 border-t border-white/5 flex items-center text-sm text-gray-400">
                <FaMapMarkerAlt className="mr-2 text-teal-500" />
                {booking.address}, {booking.city}
              </div>
            </motion.div>
          ))
        ) : (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-slate-900/50 flex items-center justify-center">
              <FaSearch className="text-gray-500" size={32} />
            </div>
            <h3 className="text-xl font-bold text-white mb-2">No bookings found</h3>
            <p className="text-gray-400">Try adjusting your filters or search criteria</p>
          </div>
        )}
      </div>
    </div>
  );
}
