"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FaSave, FaTimes, FaUpload, FaCheck } from "react-icons/fa";

interface CompanySettings {
  companyName: string;
  tagline: string;
  description: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  serviceAreas: string[];
  businessHours: {
   monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
    sunday: string;
  };
  socialMedia: {
    facebook: string;
    instagram: string;
    twitter: string;
    linkedin: string;
  };
  paymentMethods: string[];
  notes: string;
}

export default function SettingsPage() {
  const [settings, setSettings] = useState<CompanySettings>({
    companyName: "RGV Handyman",
    tagline: "Your Trusted Home Repair Partner in South Texas",
    description: "Professional handyman services across the Rio Grande Valley. We provide quality home repair, maintenance, and renovation services for residential and commercial properties.",
    phone: "956.200.2815",
    email: "info@rgvhandyman.com",
    address: "123 Service Center Dr",
    city: "McAllen",
    state: "TX",
    zipCode: "78501",
    serviceAreas: ["McAllen", "Edinburg", "Mission", "Brownsville", "Harlingen", "Pharr", "Weslaco", "San Juan"],
    businessHours: {
      monday: "8:00 AM - 6:00 PM",
      tuesday: "8:00 AM - 6:00 PM",
      wednesday: "8:00 AM - 6:00 PM",
      thursday: "8:00 AM - 6:00 PM",
      friday: "8:00 AM - 6:00 PM",
      saturday: "9:00 AM - 4:00 PM",
      sunday: "Closed",
    },
    socialMedia: {
      facebook: "https://facebook.com/rgvhandyman",
      instagram: "https://instagram.com/rgvhandyman",
      twitter: "",
      linkedin: "",
    },
    paymentMethods: ["Cash", "Credit Card", "Venmo", "Zelle", "Check"],
    notes: "Last updated: January 2026",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [showSaveToast, setShowSaveToast] = useState(false);

  const toggleServiceArea = (area: string) => {
    setSettings((prev) => ({
      ...prev,
      serviceAreas: prev.serviceAreas.includes(area)
        ? prev.serviceAreas.filter((a) => a !== area)
        : [...prev.serviceAreas, area],
    }));
  };

  const handleSave = () => {
    // In production, this would save to a backend
    console.log("Saving settings:", settings);
    setIsEditing(false);
    setShowSaveToast(true);
    setTimeout(() => setShowSaveToast(false), 3000);
  };

  const handleCancel = () => {
    setIsEditing(false);
    // Reset to original values
    setSettings({
      companyName: "RGV Handyman",
      tagline: "Your Trusted Home Repair Partner in South Texas",
      description: "Professional handyman services across the Rio Grande Valley. We provide quality home repair, maintenance, and renovation services for residential and commercial properties.",
      phone: "956.200.2815",
      email: "info@rgvhandyman.com",
      address: "123 Service Center Dr",
      city: "McAllen",
      state: "TX",
      zipCode: "78501",
      serviceAreas: ["McAllen", "Edinburg", "Mission", "Brownsville", "Harlingen", "Pharr", "Weslaco", "San Juan"],
      businessHours: {
        monday: "8:00 AM - 6:00 PM",
        tuesday: "8:00 AM - 6:00 PM",
        wednesday: "8:00 AM - 6:00 PM",
        thursday: "8:00 AM - 6:00 PM",
        friday: "8:00 AM - 6:00 PM",
        saturday: "9:00 AM - 4:00 PM",
        sunday: "Closed",
      },
      socialMedia: {
        facebook: "https://facebook.com/rgvhandyman",
        instagram: "https://instagram.com/rgvhandyman",
        twitter: "",
        linkedin: "",
      },
      paymentMethods: ["Cash", "Credit Card", "Venmo", "Zelle", "Check"],
      notes: "Last updated: January 2026",
    });
  };

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Settings</h1>
          <p className="text-gray-400">Manage company information and system preferences</p>
        </div>
        <div className="flex space-x-3">
          {isEditing ? (
            <>
              <button
                onClick={handleCancel}
                className="px-4 py-2 rounded-lg bg-slate-800 text-gray-300 hover:bg-slate-700 transition-colors flex items-center space-x-2"
              >
                <FaTimes size={18} />
                <span>Cancel</span>
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-teal-600 to-gold-600 text-white font-medium hover:shadow-[0_0_15px_rgba(0,128,128,0.3)] transition-all flex items-center space-x-2"
              >
                <FaSave size={18} />
                <span>Save Changes</span>
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-teal-600 to-gold-600 text-white font-medium hover:shadow-[0_0_15px_rgba(0,128,128,0.3)] transition-all flex items-center space-x-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              <span>Edit Settings</span>
            </button>
          )}
        </div>
      </div>

      {/* Save Toast */}
      {showSaveToast && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed top-6 right-6 z-50 bg-green-600 text-white px-6 py-4 rounded-lg shadow-xl flex items-center space-x-3"
        >
          <FaCheck size={24} />
          <div>
            <h4 className="font-bold">Settings Saved</h4>
            <p className="text-sm text-green-100">Your company settings have been updated</p>
          </div>
        </motion.div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Company Information */}
        <div className="bg-slate-900/50 backdrop-blur-lg border border-white/10 rounded-xl p-6">
          <div className="flex items-center mb-6">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <svg className="w-6 h-6 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
              Company Info
            </h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Company Name</label>
              <input
                type="text"
                value={settings.companyName}
                onChange={(e) => setSettings({ ...settings, companyName: e.target.value })}
                disabled={!isEditing}
                className={`w-full px-4 py-2 bg-slate-950/50 border ${isEditing ? "border-white/10 focus:ring-2 focus:ring-teal-500" : "border-transparent"} rounded-lg text-white ${isEditing ? "" : "opacity-75"}`}
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">Tagline</label>
              <input
                type="text"
                value={settings.tagline}
                onChange={(e) => setSettings({ ...settings, tagline: e.target.value })}
                disabled={!isEditing}
                className={`w-full px-4 py-2 bg-slate-950/50 border ${isEditing ? "border-white/10 focus:ring-2 focus:ring-teal-500" : "border-transparent"} rounded-lg text-white ${isEditing ? "" : "opacity-75"}`}
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">Description</label>
              <textarea
                value={settings.description}
                onChange={(e) => setSettings({ ...settings, description: e.target.value })}
                disabled={!isEditing}
                rows={3}
                className={`w-full px-4 py-2 bg-slate-950/50 border ${isEditing ? "border-white/10 focus:ring-2 focus:ring-teal-500" : "border-transparent"} rounded-lg text-white ${isEditing ? "" : "opacity-75"}`}
              ></textarea>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Phone</label>
                <input
                  type="tel"
                  value={settings.phone}
                  onChange={(e) => setSettings({ ...settings, phone: e.target.value })}
                  disabled={!isEditing}
                  className={`w-full px-4 py-2 bg-slate-950/50 border ${isEditing ? "border-white/10 focus:ring-2 focus:ring-teal-500" : "border-transparent"} rounded-lg text-white ${isEditing ? "" : "opacity-75"}`}
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Email</label>
                <input
                  type="email"
                  value={settings.email}
                  onChange={(e) => setSettings({ ...settings, email: e.target.value })}
                  disabled={!isEditing}
                  className={`w-full px-4 py-2 bg-slate-950/50 border ${isEditing ? "border-white/10 focus:ring-2 focus:ring-teal-500" : "border-transparent"} rounded-lg text-white ${isEditing ? "" : "opacity-75"}`}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <label className="block text-sm text-gray-400 mb-1">Address</label>
                <input
                  type="text"
                  value={settings.address}
                  onChange={(e) => setSettings({ ...settings, address: e.target.value })}
                  disabled={!isEditing}
                  className={`w-full px-4 py-2 bg-slate-950/50 border ${isEditing ? "border-white/10 focus:ring-2 focus:ring-teal-500" : "border-transparent"} rounded-lg text-white ${isEditing ? "" : "opacity-75"}`}
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">City</label>
                <input
                  type="text"
                  value={settings.city}
                  onChange={(e) => setSettings({ ...settings, city: e.target.value })}
                  disabled={!isEditing}
                  className={`w-full px-4 py-2 bg-slate-950/50 border ${isEditing ? "border-white/10 focus:ring-2 focus:ring-teal-500" : "border-transparent"} rounded-lg text-white ${isEditing ? "" : "opacity-75"}`}
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">State</label>
                <input
                  type="text"
                  value={settings.state}
                  onChange={(e) => setSettings({ ...settings, state: e.target.value })}
                  disabled={!isEditing}
                  className={`w-full px-4 py-2 bg-slate-950/50 border ${isEditing ? "border-white/10 focus:ring-2 focus:ring-teal-500" : "border-transparent"} rounded-lg text-white ${isEditing ? "" : "opacity-75"}`}
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">ZIP Code</label>
                <input
                  type="text"
                  value={settings.zipCode}
                  onChange={(e) => setSettings({ ...settings, zipCode: e.target.value })}
                  disabled={!isEditing}
                  className={`w-full px-4 py-2 bg-slate-950/50 border ${isEditing ? "border-white/10 focus:ring-2 focus:ring-teal-500" : "border-transparent"} rounded-lg text-white ${isEditing ? "" : "opacity-75"}`}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Service Areas & Hours */}
        <div className="space-y-6">
          {/* Service Areas */}
          <div className="bg-slate-900/50 backdrop-blur-lg border border-white/10 rounded-xl p-6">
            <div className="flex items-center mb-4">
              <h3 className="text-lg font-bold text-white">Service Areas</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {["McAllen", "Edinburg", "Mission", "Brownsville", "Harlingen", "Pharr", "Weslaco", "San Juan", "Raymondville", "Rio Grande City"].map((area) => (
                <button
                  key={area}
                  onClick={() => toggleServiceArea(area)}
                  className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                    settings.serviceAreas.includes(area)
                      ? "bg-teal-600 text-white"
                      : "bg-slate-800 text-gray-400 hover:bg-slate-700"
                  } ${!isEditing ? "opacity-50 cursor-not-allowed" : ""}`}
                  disabled={!isEditing}
                >
                  {area}
                </button>
              ))}
            </div>
          </div>

          {/* Business Hours */}
          <div className="bg-slate-900/50 backdrop-blur-lg border border-white/10 rounded-xl p-6">
            <div className="flex items-center mb-4">
              <h3 className="text-lg font-bold text-white">Business Hours</h3>
            </div>
            <div className="space-y-3">
              {[
                { day: "Monday", key: "monday" },
                { day: "Tuesday", key: "tuesday" },
                { day: "Wednesday", key: "wednesday" },
                { day: "Thursday", key: "thursday" },
                { day: "Friday", key: "friday" },
                { day: "Saturday", key: "saturday" },
                { day: "Sunday", key: "sunday" },
              ].map((day) => (
                <div key={day.key} className="flex items-center justify-between">
                  <span className="text-gray-300">{day.day}</span>
                  <input
                    type="text"
                    value={settings.businessHours[day.key as keyof typeof settings.businessHours]}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        businessHours: {
                          ...settings.businessHours,
                          [day.key]: e.target.value,
                        },
                      })
                    }
                    disabled={!isEditing}
                    className={`w-48 px-3 py-1.5 bg-slate-950/50 border ${isEditing ? "border-white/10 focus:ring-2 focus:ring-teal-500" : "border-transparent"} rounded-lg text-white text-sm ${isEditing ? "" : "opacity-75"}`}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Payment Methods */}
          <div className="bg-slate-900/50 backdrop-blur-lg border border-white/10 rounded-xl p-6">
            <div className="flex items-center mb-4">
              <h3 className="text-lg font-bold text-white">Payment Methods</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {["Cash", "Credit Card", "Debit Card", "Venmo", "Zelle", "PayPal", "Check"].map((method) => (
                <button
                  key={method}
                  onClick={() =>
                    setSettings((prev) => ({
                      ...prev,
                      paymentMethods: prev.paymentMethods.includes(method)
                        ? prev.paymentMethods.filter((m) => m !== method)
                        : [...prev.paymentMethods, method],
                    }))
                  }
                  disabled={!isEditing}
                  className={`px-3 py-1.5 rounded-lg text-sm transition-colors ${
                    settings.paymentMethods.includes(method)
                      ? "bg-amber-600/20 text-amber-400 border border-amber-500/30"
                      : "bg-slate-800 text-gray-400 hover:bg-slate-700"
                  } ${!isEditing ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  {method}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Notes */}
      <div className="bg-slate-900/50 backdrop-blur-lg border border-white/10 rounded-xl p-6">
        <h3 className="text-lg font-bold text-white mb-4">Notes</h3>
        <div className="p-4 bg-slate-950/50 rounded-lg border border-white/5">
          <p className="text-gray-400 text-sm">{settings.notes}</p>
        </div>
      </div>
    </div>
  );
}
