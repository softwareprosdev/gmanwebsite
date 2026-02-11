"use client";

import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronLeft, FaChevronRight, FaClock, FaMapMarkerAlt } from "react-icons/fa";
import { readBookingData } from "@/lib/data";

interface Booking {
  id: string;
  bookingCode: string;
  clientName: string;
  serviceName: string;
  date: string;
  time: string;
  address: string;
  city?: string;
  status: string;
  price: number;
}

const STATUS_COLORS: Record<string, string> = {
  new: "bg-amber-500/20 text-amber-300 border-amber-500/30",
  contacted: "bg-blue-500/20 text-blue-300 border-blue-500/30",
  scheduled: "bg-indigo-500/20 text-indigo-300 border-indigo-500/30",
  in_progress: "bg-cyan-500/20 text-cyan-300 border-cyan-500/30",
  completed: "bg-green-500/20 text-green-300 border-green-500/30",
  cancelled: "bg-red-500/20 text-red-300 border-red-500/30",
  overdue: "bg-orange-500/20 text-orange-300 border-orange-500/30",
};

export default function CalendarPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await readBookingData();
        setBookings(data.bookings || []);
      } catch {
        // silently fail
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const today = new Date();
  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}`;

  const bookingsByDate = useMemo(() => {
    const map: Record<string, Booking[]> = {};
    bookings.forEach((b) => {
      const d = new Date(b.date);
      const key = `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
      if (!map[key]) map[key] = [];
      map[key].push(b);
    });
    return map;
  }, [bookings]);

  const calendarDays = useMemo(() => {
    const days: (number | null)[] = [];
    for (let i = 0; i < firstDay; i++) days.push(null);
    for (let d = 1; d <= daysInMonth; d++) days.push(d);
    return days;
  }, [firstDay, daysInMonth]);

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));
  const goToday = () => {
    setCurrentDate(new Date());
    setSelectedDate(todayStr);
  };

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const selectedBookings = selectedDate ? bookingsByDate[selectedDate] || [] : [];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Calendar</h1>
          <p className="text-gray-400 mt-1">View and manage scheduled bookings</p>
        </div>
        <button
          onClick={goToday}
          className="px-4 py-2 bg-teal-500/10 text-teal-400 rounded-lg border border-teal-500/20 hover:bg-teal-500/20 transition-colors text-sm font-medium"
        >
          Today
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar Grid */}
        <div className="lg:col-span-2 bg-slate-900/50 backdrop-blur-lg border border-white/10 rounded-xl p-6">
          {/* Month Navigation */}
          <div className="flex items-center justify-between mb-6">
            <button onClick={prevMonth} className="p-2 hover:bg-white/5 rounded-lg transition-colors text-gray-400 hover:text-white">
              <FaChevronLeft />
            </button>
            <h2 className="text-xl font-bold text-white">
              {monthNames[month]} {year}
            </h2>
            <button onClick={nextMonth} className="p-2 hover:bg-white/5 rounded-lg transition-colors text-gray-400 hover:text-white">
              <FaChevronRight />
            </button>
          </div>

          {/* Day Headers */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {dayNames.map((d) => (
              <div key={d} className="text-center text-xs font-semibold text-gray-500 py-2">
                {d}
              </div>
            ))}
          </div>

          {/* Calendar Days */}
          <div className="grid grid-cols-7 gap-1">
            {calendarDays.map((day, i) => {
              if (day === null) return <div key={`empty-${i}`} />;
              const dateStr = `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
              const dayBookings = bookingsByDate[dateStr] || [];
              const isToday = dateStr === todayStr;
              const isSelected = dateStr === selectedDate;

              return (
                <button
                  key={dateStr}
                  onClick={() => setSelectedDate(dateStr)}
                  className={`relative p-2 min-h-[72px] rounded-lg text-left transition-all duration-200 ${
                    isSelected
                      ? "bg-teal-500/20 border border-teal-500/40"
                      : isToday
                      ? "bg-white/5 border border-white/10"
                      : "hover:bg-white/5 border border-transparent"
                  }`}
                >
                  <span className={`text-sm font-medium ${isToday ? "text-teal-400" : "text-gray-300"}`}>
                    {day}
                  </span>
                  {dayBookings.length > 0 && (
                    <div className="mt-1 space-y-0.5">
                      {dayBookings.slice(0, 2).map((b) => (
                        <div
                          key={b.id}
                          className={`text-[10px] px-1 py-0.5 rounded truncate ${STATUS_COLORS[b.status] || "bg-gray-500/20 text-gray-300"}`}
                        >
                          {b.clientName}
                        </div>
                      ))}
                      {dayBookings.length > 2 && (
                        <div className="text-[10px] text-gray-500">+{dayBookings.length - 2} more</div>
                      )}
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Day Detail Panel */}
        <div className="bg-slate-900/50 backdrop-blur-lg border border-white/10 rounded-xl p-6">
          <h3 className="text-lg font-bold text-white mb-4">
            {selectedDate
              ? new Date(selectedDate + "T12:00:00").toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })
              : "Select a date"}
          </h3>

          <AnimatePresence mode="wait">
            {selectedDate && (
              <motion.div
                key={selectedDate}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-3"
              >
                {selectedBookings.length === 0 ? (
                  <p className="text-gray-500 text-sm">No bookings on this date</p>
                ) : (
                  selectedBookings.map((booking) => (
                    <div
                      key={booking.id}
                      className="bg-slate-800/50 border border-white/5 rounded-lg p-4 space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-white font-medium text-sm">{booking.clientName}</span>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full border ${STATUS_COLORS[booking.status]}`}>
                          {booking.status.replace("_", " ")}
                        </span>
                      </div>
                      <p className="text-teal-400 text-sm">{booking.serviceName}</p>
                      <div className="flex items-center space-x-4 text-xs text-gray-400">
                        <span className="flex items-center space-x-1">
                          <FaClock size={10} />
                          <span>{booking.time}</span>
                        </span>
                        <span className="flex items-center space-x-1">
                          <FaMapMarkerAlt size={10} />
                          <span>{booking.city || booking.address}</span>
                        </span>
                      </div>
                      <div className="text-right">
                        <span className="text-green-400 font-semibold text-sm">${booking.price}</span>
                      </div>
                    </div>
                  ))
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {!selectedDate && (
            <p className="text-gray-500 text-sm">Click on a day to see scheduled bookings</p>
          )}
        </div>
      </div>
    </div>
  );
}
