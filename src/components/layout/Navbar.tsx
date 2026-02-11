"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaSignInAlt } from "react-icons/fa";

interface NavbarProps {
  className?: string;
}

export function Navbar({ className = "" }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState("/");

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setActiveLink(window.location.pathname);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md border-b border-gray-200 py-2 shadow-sm"
          : "bg-white/80 backdrop-blur-sm py-4"
      } ${className}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo - Text Only */}
          <Link href="/" className="group relative flex items-center space-x-3">
            <div className="hidden sm:block">
              <span className="text-2xl md:text-3xl font-black text-[#1e3a5f] leading-tight">
                RGV <span className="text-[#d4a017]">Handyman</span>
              </span>
            </div>
            <div className="sm:hidden">
              <span className="text-lg font-black text-[#1e3a5f]">
                RGV <span className="text-[#d4a017]">Handyman</span> <span className="text-base">🔨</span>
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className={`relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                  activeLink === link.href
                    ? "text-[#1e3a5f] bg-blue-50"
                    : "text-gray-600 hover:text-[#1e3a5f] hover:bg-gray-50"
                }`}
              >
                {link.name}
                {activeLink === link.href && (
                  <motion.div
                    layoutId="navbar-underline"
                    className="absolute bottom-0 left-2 right-2 h-0.5 bg-[#d4a017]"
                  />
                )}
              </Link>
            ))}
            <Link
              href="/contact"
              className="px-6 py-2.5 rounded-lg bg-[#1e3a5f] text-white text-sm font-bold hover:bg-[#2a5080] transition-all duration-300 hover:shadow-lg hover:shadow-blue-900/20"
            >
              Book Now
            </Link>
            <Link
              href="/admin/login"
              className="flex items-center space-x-2 px-4 py-2 rounded-lg border border-[#1e3a5f]/30 text-[#1e3a5f] text-sm font-medium hover:bg-[#1e3a5f] hover:text-white transition-all duration-300"
            >
              <FaSignInAlt size={16} />
              <span>Client Login</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-[#1e3a5f] hover:text-[#d4a017] p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-gray-200 overflow-hidden shadow-lg"
          >
            <div className="px-4 py-4 space-y-2">
              {navLinks.map((link, index) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-4 py-3 rounded-lg text-base font-medium transition-all duration-300 ${
                    activeLink === link.href
                      ? "bg-blue-50 text-[#1e3a5f]"
                      : "text-gray-600 hover:bg-gray-50 hover:text-[#1e3a5f]"
                  }`}
                  style={{ transitionDelay: `${index * 50}ms` }}
                >
                  {link.name}
                </Link>
              ))}
              <Link
                href="/contact"
                onClick={() => setIsMenuOpen(false)}
                className="block mt-4 w-full px-4 py-3 rounded-lg bg-[#1e3a5f] text-center text-white font-bold hover:bg-[#2a5080] transition-all"
              >
                Book Your Service
              </Link>
              <Link
                href="/admin/login"
                onClick={() => setIsMenuOpen(false)}
                className="block mt-4 w-full px-4 py-3 rounded-lg border border-[#1e3a5f]/30 text-[#1e3a5f] text-center font-medium hover:bg-[#1e3a5f] hover:text-white transition-all"
              >
                Client Login
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
