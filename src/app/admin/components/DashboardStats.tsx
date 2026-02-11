"use client";

import { motion } from "framer-motion";
import { FaUsers, FaClipboardList, FaDollarSign, FaClock } from "react-icons/fa";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  color: "teal" | "gold" | "green" | "blue";
  delay?: number;
}

const StatCard = ({ title, value, icon, color, delay = 0 }: StatCardProps) => {
  const colorStyles = {
    teal: "bg-teal-500/10 border-teal-500/30 text-teal-400 shadow-[0_0_15px_rgba(0,128,128,0.15)]",
    gold: "bg-amber-500/10 border-amber-500/30 text-amber-400 shadow-[0_0_15px_rgba(212,175,55,0.15)]",
    green: "bg-emerald-500/10 border-emerald-500/30 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.15)]",
    blue: "bg-blue-500/10 border-blue-500/30 text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.15)]",
  };

  const textColors = {
    teal: "text-teal-400",
    gold: "text-amber-400",
    green: "text-emerald-400",
    blue: "text-blue-400",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -5 }}
      className={`relative overflow-hidden rounded-xl border p-6 ${colorStyles[color]} backdrop-blur-sm transition-all duration-300`}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-400">{title}</p>
          <h3 className="mt-2 text-3xl font-bold text-white">{value}</h3>
        </div>
        <div className={`rounded-lg p-3 ${textColors[color]} bg-gray-950/30`}>
          {icon}
        </div>
      </div>

      {/* Decorative gradient background */}
      <div className="absolute -right-4 -bottom-4 h-24 w-24 bg-gradient-to-br from-teal-500/20 to-amber-500/20 blur-2xl"></div>
    </motion.div>
  );
};

interface DashboardStatsProps {
  totalClients: number;
  totalBookings: number;
  pendingBookings: number;
  totalRevenue: number;
  completedBookings: number;
}

export default function DashboardStats({
  totalClients,
  totalBookings,
  pendingBookings,
  totalRevenue,
  completedBookings,
}: DashboardStatsProps) {
  const revenueEstimate = (totalRevenue * 1.15).toFixed(2); // 15% buffer estimate

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {/* Total Clients */}
      <StatCard
        title="Total Clients"
        value={totalClients}
        icon={<FaUsers size={28} />}
        color="teal"
        delay={0}
      />

      {/* Pending Requests */}
      <StatCard
        title="Pending Requests"
        value={pendingBookings}
        icon={<FaClock size={28} />}
        color="gold"
        delay={0.1}
      />

      {/* Total Bookings */}
      <StatCard
        title="Total Bookings"
        value={totalBookings}
        icon={<FaClipboardList size={28} />}
        color="blue"
        delay={0.2}
      />

      {/* Completed Bookings */}
      <StatCard
        title="Completed Jobs"
        value={completedBookings}
        icon={<FaClipboardList size={28} />}
        color="green"
        delay={0.3}
      />

      {/* Revenue Estimate */}
      <StatCard
        title="Revenue Estimate"
        value={`$${revenueEstimate}`}
        icon={<FaDollarSign size={28} />}
        color="gold"
        delay={0.4}
      />

      {/* Completed Rate */}
      <StatCard
        title="Completion Rate"
        value={`${totalBookings > 0 ? ((completedBookings / totalBookings) * 100).toFixed(0) : 0}%`}
        icon={<FaDollarSign size={28} />}
        color="teal"
        delay={0.5}
      />
    </div>
  );
}
