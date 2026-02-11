"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaTachometerAlt,
  FaUsers,
  FaClipboardList,
  FaToolbox,
  FaCog,
  FaSignOutAlt,
  FaBars,
  FaTimes,
  FaCalendarAlt,
  FaFileInvoiceDollar,
  FaCalculator,
  FaChartBar,
  FaHistory,
} from "react-icons/fa";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const mainNavItems = [
  { name: "Dashboard", href: "/admin", icon: <FaTachometerAlt size={20} /> },
  { name: "Calendar", href: "/admin/calendar", icon: <FaCalendarAlt size={20} /> },
  { name: "Clients", href: "/admin/clients", icon: <FaUsers size={20} /> },
  { name: "Bookings", href: "/admin/bookings", icon: <FaClipboardList size={20} /> },
  { name: "Services", href: "/admin/services", icon: <FaToolbox size={20} /> },
];

const financeNavItems = [
  { name: "Estimates", href: "/admin/estimates", icon: <FaCalculator size={20} /> },
  { name: "Invoices", href: "/admin/invoices", icon: <FaFileInvoiceDollar size={20} /> },
];

const systemNavItems = [
  { name: "Reports", href: "/admin/reports", icon: <FaChartBar size={20} /> },
  { name: "Activity", href: "/admin/activity", icon: <FaHistory size={20} /> },
  { name: "Settings", href: "/admin/settings", icon: <FaCog size={20} /> },
];

export default function AdminLayout({ children }: AdminLayoutProps) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-slate-950 text-gray-100">
      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsSidebarOpen(false)}
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm md:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={{ x: -300 }}
        animate={{ x: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 border-r border-white/10 transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/5">
          <Link href="/admin" className="flex items-center space-x-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-teal-600 to-gold-500">
              <span className="text-lg font-bold text-white">NX</span>
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-base text-transparent bg-clip-text bg-gradient-to-r from-teal-500 to-gold-400" style={{ fontFamily: "var(--font-nosifer)" }}>
                Numix Pro
              </span>
              <span className="text-[10px] text-gray-500">Handyman CRM</span>
            </div>
          </Link>
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="md:hidden text-gray-400 hover:text-white"
          >
            <FaTimes size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="mt-4 px-4 space-y-1 overflow-y-auto max-h-[calc(100vh-180px)] scrollbar-thin">
          <p className="px-4 pb-1 text-[10px] font-semibold text-gray-500 uppercase tracking-wider">
            Main
          </p>
          {mainNavItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsSidebarOpen(false)}
                className={`relative flex items-center space-x-3 px-4 py-2.5 rounded-lg transition-all duration-200 ${
                  isActive
                    ? "bg-teal-500/10 text-teal-400"
                    : "text-gray-400 hover:bg-white/5 hover:text-teal-400"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-nav"
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-teal-500 rounded-r-full"
                  />
                )}
                {item.icon}
                <span className="font-medium text-sm">{item.name}</span>
              </Link>
            );
          })}

          <p className="px-4 pt-4 pb-1 text-[10px] font-semibold text-gray-500 uppercase tracking-wider">
            Finance
          </p>
          {financeNavItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsSidebarOpen(false)}
                className={`relative flex items-center space-x-3 px-4 py-2.5 rounded-lg transition-all duration-200 ${
                  isActive
                    ? "bg-teal-500/10 text-teal-400"
                    : "text-gray-400 hover:bg-white/5 hover:text-teal-400"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-nav"
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-teal-500 rounded-r-full"
                  />
                )}
                {item.icon}
                <span className="font-medium text-sm">{item.name}</span>
              </Link>
            );
          })}

          <p className="px-4 pt-4 pb-1 text-[10px] font-semibold text-gray-500 uppercase tracking-wider">
            System
          </p>
          {systemNavItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsSidebarOpen(false)}
                className={`relative flex items-center space-x-3 px-4 py-2.5 rounded-lg transition-all duration-200 ${
                  isActive
                    ? "bg-teal-500/10 text-teal-400"
                    : "text-gray-400 hover:bg-white/5 hover:text-teal-400"
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="active-nav"
                    className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-teal-500 rounded-r-full"
                  />
                )}
                {item.icon}
                <span className="font-medium text-sm">{item.name}</span>
              </Link>
            );
          })}

          {/* Logout Button */}
          <div className="pt-4">
            <button
              onClick={() => {
                localStorage.removeItem("adminAuth");
                window.location.href = "/admin/login";
              }}
              className="flex w-full items-center space-x-3 px-4 py-2.5 rounded-lg text-red-400 hover:bg-red-500/10 transition-all"
            >
              <FaSignOutAlt size={20} />
              <span className="font-medium text-sm">Logout</span>
            </button>
          </div>
        </nav>

        {/* Sidebar Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/5">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500">Handyman Numix Pro</p>
              <p className="text-[10px] text-gray-600">v2.0.0</p>
            </div>
            <div className="flex space-x-2">
              <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-[10px] text-gray-500">Online</span>
            </div>
          </div>
        </div>
      </motion.aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-0">
        {/* Mobile Header */}
        <header className="sticky top-0 z-30 flex items-center justify-between bg-slate-900/80 backdrop-blur-md border-b border-white/10 px-4 py-3 md:hidden">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="text-teal-400 hover:text-teal-300"
          >
            <FaBars size={24} />
          </button>
          <Link href="/admin" className="text-teal-500" style={{ fontFamily: "var(--font-nosifer)" }}>
            Numix Pro
          </Link>
          <div className="w-6"></div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-slate-950 p-4 md:p-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="max-w-7xl mx-auto"
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
}
