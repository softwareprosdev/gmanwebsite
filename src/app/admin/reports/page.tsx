"use client";

import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import {
  FaDollarSign,
  FaUsers,
  FaClipboardList,
  FaChartLine,
  FaArrowUp,
  FaArrowDown,
} from "react-icons/fa";
import { readBookingData, readClientData, readInvoiceData } from "@/lib/data";

interface Booking {
  id: string;
  clientName: string;
  serviceName: string;
  status: string;
  price: number;
  paymentStatus: string;
  date: string;
  city?: string;
  createdAt: string;
}

export default function ReportsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [clients, setClients] = useState<any[]>([]);
  const [invoices, setInvoices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState<"7d" | "30d" | "90d" | "all">("30d");

  useEffect(() => {
    const load = async () => {
      try {
        const [bData, cData, iData] = await Promise.all([
          readBookingData(),
          readClientData(),
          readInvoiceData().catch(() => ({ invoices: [] })),
        ]);
        setBookings(bData.bookings || []);
        setClients(cData.clients || []);
        setInvoices(iData.invoices || []);
      } catch {
        // silently fail
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const filteredBookings = useMemo(() => {
    if (period === "all") return bookings;
    const days = period === "7d" ? 7 : period === "30d" ? 30 : 90;
    const cutoff = new Date();
    cutoff.setDate(cutoff.getDate() - days);
    return bookings.filter((b) => new Date(b.createdAt) >= cutoff);
  }, [bookings, period]);

  // Revenue metrics
  const totalRevenue = filteredBookings.reduce((s, b) => s + (b.price || 0), 0);
  const completedRevenue = filteredBookings.filter((b) => b.status === "completed").reduce((s, b) => s + (b.price || 0), 0);
  const paidRevenue = filteredBookings.filter((b) => b.paymentStatus === "paid").reduce((s, b) => s + (b.price || 0), 0);
  const avgJobValue = filteredBookings.length > 0 ? totalRevenue / filteredBookings.length : 0;

  // Booking metrics
  const totalBookingsCount = filteredBookings.length;
  const completedCount = filteredBookings.filter((b) => b.status === "completed").length;
  const cancelledCount = filteredBookings.filter((b) => b.status === "cancelled").length;
  const completionRate = totalBookingsCount > 0 ? ((completedCount / totalBookingsCount) * 100) : 0;

  // Service breakdown
  const serviceBreakdown = useMemo(() => {
    const map: Record<string, { count: number; revenue: number }> = {};
    filteredBookings.forEach((b) => {
      if (!map[b.serviceName]) map[b.serviceName] = { count: 0, revenue: 0 };
      map[b.serviceName].count++;
      map[b.serviceName].revenue += b.price || 0;
    });
    return Object.entries(map)
      .map(([name, data]) => ({ name, ...data }))
      .sort((a, b) => b.revenue - a.revenue);
  }, [filteredBookings]);

  // City breakdown
  const cityBreakdown = useMemo(() => {
    const map: Record<string, { count: number; revenue: number }> = {};
    filteredBookings.forEach((b) => {
      const city = b.city || "Unknown";
      if (!map[city]) map[city] = { count: 0, revenue: 0 };
      map[city].count++;
      map[city].revenue += b.price || 0;
    });
    return Object.entries(map)
      .map(([name, data]) => ({ name, ...data }))
      .sort((a, b) => b.count - a.count);
  }, [filteredBookings]);

  // Status distribution
  const statusDistribution = useMemo(() => {
    const map: Record<string, number> = {};
    filteredBookings.forEach((b) => {
      map[b.status] = (map[b.status] || 0) + 1;
    });
    return Object.entries(map).map(([status, count]) => ({ status, count }));
  }, [filteredBookings]);

  // Payment breakdown
  const paymentBreakdown = useMemo(() => {
    const map: Record<string, number> = {};
    filteredBookings.forEach((b) => {
      map[b.paymentStatus] = (map[b.paymentStatus] || 0) + 1;
    });
    return Object.entries(map).map(([status, count]) => ({ status, count }));
  }, [filteredBookings]);

  // Top clients
  const topClients = useMemo(() => {
    const map: Record<string, { name: string; count: number; revenue: number }> = {};
    filteredBookings.forEach((b) => {
      if (!map[b.clientName]) map[b.clientName] = { name: b.clientName, count: 0, revenue: 0 };
      map[b.clientName].count++;
      map[b.clientName].revenue += b.price || 0;
    });
    return Object.values(map).sort((a, b) => b.revenue - a.revenue).slice(0, 5);
  }, [filteredBookings]);

  const STATUS_COLORS: Record<string, string> = {
    new: "bg-amber-500",
    contacted: "bg-blue-500",
    scheduled: "bg-indigo-500",
    in_progress: "bg-cyan-500",
    completed: "bg-green-500",
    cancelled: "bg-red-500",
    overdue: "bg-orange-500",
  };

  const PAYMENT_COLORS: Record<string, string> = {
    pending: "bg-amber-500",
    deposit: "bg-blue-500",
    paid: "bg-green-500",
    refunded: "bg-purple-500",
    failed: "bg-red-500",
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Reports</h1>
          <p className="text-gray-400 mt-1">Business analytics and performance metrics</p>
        </div>
        <div className="flex bg-slate-800/50 border border-white/10 rounded-lg overflow-hidden">
          {(["7d", "30d", "90d", "all"] as const).map((p) => (
            <button
              key={p}
              onClick={() => setPeriod(p)}
              className={`px-4 py-2 text-sm font-medium transition-colors ${
                period === p ? "bg-teal-500 text-white" : "text-gray-400 hover:text-white"
              }`}
            >
              {p === "all" ? "All" : p}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Revenue", value: `$${totalRevenue.toFixed(0)}`, icon: FaDollarSign, color: "teal" },
          { label: "Bookings", value: totalBookingsCount, icon: FaClipboardList, color: "blue" },
          { label: "Avg Job Value", value: `$${avgJobValue.toFixed(0)}`, icon: FaChartLine, color: "gold" },
          { label: "Completion Rate", value: `${completionRate.toFixed(0)}%`, icon: FaArrowUp, color: "green" },
        ].map((kpi, i) => (
          <motion.div
            key={kpi.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-slate-900/50 border border-white/10 rounded-xl p-5"
          >
            <div className="flex items-center justify-between mb-3">
              <p className="text-gray-400 text-xs uppercase tracking-wider">{kpi.label}</p>
              <kpi.icon className={`text-${kpi.color === "gold" ? "amber" : kpi.color}-400`} size={18} />
            </div>
            <p className="text-3xl font-bold text-white">{kpi.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Revenue Breakdown + Status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue by Service */}
        <div className="bg-slate-900/50 border border-white/10 rounded-xl p-6">
          <h3 className="text-lg font-bold text-white mb-4">Revenue by Service</h3>
          {serviceBreakdown.length === 0 ? (
            <p className="text-gray-500 text-sm">No data for this period</p>
          ) : (
            <div className="space-y-3">
              {serviceBreakdown.map((s) => {
                const maxRevenue = serviceBreakdown[0]?.revenue || 1;
                return (
                  <div key={s.name}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-300">{s.name}</span>
                      <span className="text-gray-400">{s.count} jobs · ${s.revenue.toFixed(0)}</span>
                    </div>
                    <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-teal-500 rounded-full transition-all duration-500"
                        style={{ width: `${(s.revenue / maxRevenue) * 100}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Booking Status Distribution */}
        <div className="bg-slate-900/50 border border-white/10 rounded-xl p-6">
          <h3 className="text-lg font-bold text-white mb-4">Booking Status</h3>
          {statusDistribution.length === 0 ? (
            <p className="text-gray-500 text-sm">No data for this period</p>
          ) : (
            <div className="space-y-3">
              {statusDistribution.map((s) => (
                <div key={s.status} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${STATUS_COLORS[s.status] || "bg-gray-500"}`} />
                    <span className="text-gray-300 text-sm capitalize">{s.status.replace("_", " ")}</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-white font-medium">{s.count}</span>
                    <div className="w-20 h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${STATUS_COLORS[s.status] || "bg-gray-500"}`}
                        style={{ width: `${(s.count / totalBookingsCount) * 100}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Top Clients + City Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Clients */}
        <div className="bg-slate-900/50 border border-white/10 rounded-xl p-6">
          <h3 className="text-lg font-bold text-white mb-4">Top Clients</h3>
          {topClients.length === 0 ? (
            <p className="text-gray-500 text-sm">No data for this period</p>
          ) : (
            <div className="space-y-3">
              {topClients.map((c, i) => (
                <div key={c.name} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                  <div className="flex items-center space-x-3">
                    <span className="text-gray-500 text-sm font-mono w-6">#{i + 1}</span>
                    <span className="text-white font-medium text-sm">{c.name}</span>
                  </div>
                  <div className="text-right">
                    <span className="text-teal-400 font-semibold">${c.revenue.toFixed(0)}</span>
                    <span className="text-gray-500 text-xs ml-2">({c.count} jobs)</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Revenue by City */}
        <div className="bg-slate-900/50 border border-white/10 rounded-xl p-6">
          <h3 className="text-lg font-bold text-white mb-4">Revenue by City</h3>
          {cityBreakdown.length === 0 ? (
            <p className="text-gray-500 text-sm">No data for this period</p>
          ) : (
            <div className="space-y-3">
              {cityBreakdown.map((c) => {
                const maxCount = cityBreakdown[0]?.count || 1;
                return (
                  <div key={c.name}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-300">{c.name}</span>
                      <span className="text-gray-400">{c.count} jobs · ${c.revenue.toFixed(0)}</span>
                    </div>
                    <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-amber-500 rounded-full transition-all duration-500"
                        style={{ width: `${(c.count / maxCount) * 100}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Payment Status + Revenue Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-slate-900/50 border border-white/10 rounded-xl p-6">
          <h3 className="text-lg font-bold text-white mb-4">Payment Status</h3>
          {paymentBreakdown.length === 0 ? (
            <p className="text-gray-500 text-sm">No data for this period</p>
          ) : (
            <div className="space-y-3">
              {paymentBreakdown.map((p) => (
                <div key={p.status} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${PAYMENT_COLORS[p.status] || "bg-gray-500"}`} />
                    <span className="text-gray-300 text-sm capitalize">{p.status}</span>
                  </div>
                  <span className="text-white font-medium">{p.count}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="bg-slate-900/50 border border-white/10 rounded-xl p-6">
          <h3 className="text-lg font-bold text-white mb-4">Revenue Summary</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center py-2 border-b border-white/5">
              <span className="text-gray-400">Total Quoted</span>
              <span className="text-white font-bold text-lg">${totalRevenue.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-white/5">
              <span className="text-gray-400">Completed Work</span>
              <span className="text-green-400 font-bold text-lg">${completedRevenue.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-white/5">
              <span className="text-gray-400">Paid</span>
              <span className="text-teal-400 font-bold text-lg">${paidRevenue.toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center py-2">
              <span className="text-gray-400">Outstanding</span>
              <span className="text-amber-400 font-bold text-lg">${(completedRevenue - paidRevenue).toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
