"use client";

import Link from "next/link";
import Image from "next/image";

interface FooterProps {
  className?: string;
}

export function Footer({ className = "" }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    services: [
      { name: "Plumbing", href: "/services" },
      { name: "Electrical", href: "/services" },
      { name: "General Repair", href: "/services" },
      { name: "Painting", href: "/services" },
      { name: "HVAC", href: "/services" },
      { name: "Smart Home", href: "/services" },
    ],
    company: [
      { name: "About Us", href: "/about" },
      { name: "Portfolio", href: "/portfolio" },
      { name: "Contact", href: "/contact" },
    ],
  };

  return (
    <footer className={`bg-[#0f2340] text-white ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center space-x-3">
              <Image
                src="/images/logorgv.png"
                alt="RGV Handyman Services"
                width={50}
                height={50}
                className="rounded-lg"
              />
              <div>
                <span className="text-xl font-bold text-white">
                  RGV <span className="text-[#d4a017]">Handyman</span>
                </span>
                <span className="block text-xs text-gray-400">Services</span>
              </div>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed">
              Professional handyman services serving the Rio Grande Valley. Quality repairs, reliable service, and fair pricing for your home and business.
            </p>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold mb-6 text-lg">Services</h3>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-[#d4a017] text-sm transition-colors flex items-center group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#d4a017]/50 mr-3 group-hover:bg-[#d4a017] transition-all"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-white font-semibold mb-6 text-lg">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-400 hover:text-[#d4a017] text-sm transition-colors flex items-center group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-[#1e3a5f] mr-3 group-hover:bg-[#d4a017] transition-all"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-6 text-lg">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-start space-x-3">
                <svg className="w-5 h-5 text-[#d4a017] mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <span className="text-gray-400 text-sm">956.200.2815</span>
              </li>
              <li className="flex items-start space-x-3">
                <svg className="w-5 h-5 text-[#d4a017] mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <span className="text-gray-400 text-sm">hello@rgvhandyman.com</span>
              </li>
              <li className="flex items-start space-x-3">
                <svg className="w-5 h-5 text-[#d4a017] mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-gray-400 text-sm">McAllen, TX 78501<br />Rio Grande Valley</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          <p className="text-gray-500 text-sm">
            &copy; {currentYear} RGV Handyman Services. All rights reserved.
          </p>
          <div className="flex items-center space-x-6">
            <Link href="/contact" className="text-gray-500 text-sm hover:text-[#d4a017] transition-colors">
              Privacy Policy
            </Link>
            <Link href="/contact" className="text-gray-500 text-sm hover:text-[#d4a017] transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
