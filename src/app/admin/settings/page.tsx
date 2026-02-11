"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaSave, FaTimes, FaCheck, FaSpinner } from "react-icons/fa";
import { readSettings, saveSettings } from "@/lib/data";

interface Settings {
  companyName: string;
  companyTagline: string;
  companyDescription: string;
  companyPhone: string;
  companyEmail: string;
  companyAddress: string;
  companyCity: string;
  companyState: string;
  companyZip: string;
  serviceAreas: string[];
  businessHours: Record<string, { open: string; close: string }>;
  paymentMethods: string[];
  taxRate: number;
  notificationEmail: string;
  notes: string;
}

const ALL_AREAS = ["McAllen", "Edinburg", "Mission", "Brownsville", "Harlingen", "Pharr", "Weslaco", "San Juan", "Raymondville", "Rio Grande City"];
const ALL_PAYMENT_METHODS = ["Cash", "Credit Card", "Debit Card", "Venmo", "Zelle", "PayPal", "Check"];
const DAYS = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export default function SettingsPage() {
  const [settings, setSettings] = useState<Settings | null>(null);
  const [originalSettings, setOriginalSettings] = useState<Settings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showSaveToast, setShowSaveToast] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const data = await readSettings();
        const s = data.settings;
        setSettings(s);
        setOriginalSettings(s);
      } catch (err) {
        console.error("Failed to load settings:", err);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const handleSave = async () => {
    if (!settings) return;
    setSaving(true);
    try {
      // Send each field as a separate key-value pair
      await saveSettings({
        companyName: settings.companyName,
        companyTagline: settings.companyTagline,
        companyDescription: settings.companyDescription,
        companyPhone: settings.companyPhone,
        companyEmail: settings.companyEmail,
        companyAddress: settings.companyAddress,
        companyCity: settings.companyCity,
        companyState: settings.companyState,
        companyZip: settings.companyZip,
        serviceAreas: settings.serviceAreas,
        businessHours: settings.businessHours,
        paymentMethods: settings.paymentMethods,
        taxRate: settings.taxRate,
        notificationEmail: settings.notificationEmail,
        notes: settings.notes,
      });
      setOriginalSettings(settings);
      setIsEditing(false);
      setShowSaveToast(true);
      setTimeout(() => setShowSaveToast(false), 3000);
    } catch (err) {
      console.error("Failed to save settings:", err);
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setSettings(originalSettings);
    setIsEditing(false);
  };

  const toggleServiceArea = (area: string) => {
    if (!settings) return;
    setSettings({
      ...settings,
      serviceAreas: settings.serviceAreas.includes(area)
        ? settings.serviceAreas.filter((a) => a !== area)
        : [...settings.serviceAreas, area],
    });
  };

  const togglePaymentMethod = (method: string) => {
    if (!settings) return;
    setSettings({
      ...settings,
      paymentMethods: settings.paymentMethods.includes(method)
        ? settings.paymentMethods.filter((m) => m !== method)
        : [...settings.paymentMethods, method],
    });
  };

  const updateHours = (day: string, field: "open" | "close", value: string) => {
    if (!settings) return;
    setSettings({
      ...settings,
      businessHours: {
        ...settings.businessHours,
        [day]: { ...settings.businessHours[day], [field]: value },
      },
    });
  };

  if (loading || !settings) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 space-y-8">
      {/* Header */}
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
                className="px-4 py-2 rounded-lg bg-slate-800 text-gray-300 hover:bg-slate-700 transition-colors flex items-center space-x-2 text-sm"
              >
                <FaTimes size={14} />
                <span>Cancel</span>
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="px-4 py-2 rounded-lg bg-teal-500 text-white font-medium hover:bg-teal-600 transition-all flex items-center space-x-2 text-sm disabled:opacity-50"
              >
                {saving ? <FaSpinner size={14} className="animate-spin" /> : <FaSave size={14} />}
                <span>{saving ? "Saving..." : "Save Changes"}</span>
              </button>
            </>
          ) : (
            <button
              onClick={() => setIsEditing(true)}
              className="px-4 py-2 rounded-lg bg-teal-500 text-white font-medium hover:bg-teal-600 transition-all flex items-center space-x-2 text-sm"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              <span>Edit Settings</span>
            </button>
          )}
        </div>
      </div>

      {/* Toast */}
      {showSaveToast && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed top-6 right-6 z-50 bg-green-600 text-white px-6 py-4 rounded-lg shadow-xl flex items-center space-x-3"
        >
          <FaCheck size={18} />
          <div>
            <h4 className="font-bold text-sm">Settings Saved</h4>
            <p className="text-xs text-green-100">Your settings have been saved to the database</p>
          </div>
        </motion.div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Company Information */}
        <div className="bg-slate-900/50 backdrop-blur-lg border border-white/10 rounded-xl p-6">
          <h2 className="text-lg font-bold text-white mb-4">Company Information</h2>
          <div className="space-y-4">
            {[
              { label: "Company Name", key: "companyName" },
              { label: "Tagline", key: "companyTagline" },
            ].map(({ label, key }) => (
              <div key={key}>
                <label className="block text-sm text-gray-400 mb-1">{label}</label>
                <input
                  type="text"
                  value={(settings as any)[key]}
                  onChange={(e) => setSettings({ ...settings, [key]: e.target.value })}
                  disabled={!isEditing}
                  className={`w-full px-4 py-2 bg-slate-950/50 border ${isEditing ? "border-white/10 focus:ring-2 focus:ring-teal-500" : "border-transparent"} rounded-lg text-white text-sm ${isEditing ? "" : "opacity-75"}`}
                />
              </div>
            ))}

            <div>
              <label className="block text-sm text-gray-400 mb-1">Description</label>
              <textarea
                value={settings.companyDescription}
                onChange={(e) => setSettings({ ...settings, companyDescription: e.target.value })}
                disabled={!isEditing}
                rows={3}
                className={`w-full px-4 py-2 bg-slate-950/50 border ${isEditing ? "border-white/10 focus:ring-2 focus:ring-teal-500" : "border-transparent"} rounded-lg text-white text-sm ${isEditing ? "" : "opacity-75"}`}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Phone</label>
                <input type="tel" value={settings.companyPhone} onChange={(e) => setSettings({ ...settings, companyPhone: e.target.value })} disabled={!isEditing} className={`w-full px-4 py-2 bg-slate-950/50 border ${isEditing ? "border-white/10" : "border-transparent"} rounded-lg text-white text-sm ${isEditing ? "" : "opacity-75"}`} />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Email</label>
                <input type="email" value={settings.companyEmail} onChange={(e) => setSettings({ ...settings, companyEmail: e.target.value })} disabled={!isEditing} className={`w-full px-4 py-2 bg-slate-950/50 border ${isEditing ? "border-white/10" : "border-transparent"} rounded-lg text-white text-sm ${isEditing ? "" : "opacity-75"}`} />
              </div>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">Address</label>
              <input type="text" value={settings.companyAddress} onChange={(e) => setSettings({ ...settings, companyAddress: e.target.value })} disabled={!isEditing} className={`w-full px-4 py-2 bg-slate-950/50 border ${isEditing ? "border-white/10" : "border-transparent"} rounded-lg text-white text-sm ${isEditing ? "" : "opacity-75"}`} />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">City</label>
                <input type="text" value={settings.companyCity} onChange={(e) => setSettings({ ...settings, companyCity: e.target.value })} disabled={!isEditing} className={`w-full px-4 py-2 bg-slate-950/50 border ${isEditing ? "border-white/10" : "border-transparent"} rounded-lg text-white text-sm ${isEditing ? "" : "opacity-75"}`} />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">State</label>
                <input type="text" value={settings.companyState} onChange={(e) => setSettings({ ...settings, companyState: e.target.value })} disabled={!isEditing} className={`w-full px-4 py-2 bg-slate-950/50 border ${isEditing ? "border-white/10" : "border-transparent"} rounded-lg text-white text-sm ${isEditing ? "" : "opacity-75"}`} />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">ZIP</label>
                <input type="text" value={settings.companyZip} onChange={(e) => setSettings({ ...settings, companyZip: e.target.value })} disabled={!isEditing} className={`w-full px-4 py-2 bg-slate-950/50 border ${isEditing ? "border-white/10" : "border-transparent"} rounded-lg text-white text-sm ${isEditing ? "" : "opacity-75"}`} />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Tax Rate (%)</label>
                <input type="number" step="0.01" value={settings.taxRate} onChange={(e) => setSettings({ ...settings, taxRate: parseFloat(e.target.value) || 0 })} disabled={!isEditing} className={`w-full px-4 py-2 bg-slate-950/50 border ${isEditing ? "border-white/10" : "border-transparent"} rounded-lg text-white text-sm ${isEditing ? "" : "opacity-75"}`} />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Notification Email</label>
                <input type="email" value={settings.notificationEmail} onChange={(e) => setSettings({ ...settings, notificationEmail: e.target.value })} disabled={!isEditing} className={`w-full px-4 py-2 bg-slate-950/50 border ${isEditing ? "border-white/10" : "border-transparent"} rounded-lg text-white text-sm ${isEditing ? "" : "opacity-75"}`} />
              </div>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* Service Areas */}
          <div className="bg-slate-900/50 backdrop-blur-lg border border-white/10 rounded-xl p-6">
            <h3 className="text-lg font-bold text-white mb-4">Service Areas</h3>
            <div className="flex flex-wrap gap-2">
              {ALL_AREAS.map((area) => (
                <button
                  key={area}
                  onClick={() => toggleServiceArea(area)}
                  disabled={!isEditing}
                  className={`px-4 py-2 rounded-lg text-sm transition-colors ${
                    settings.serviceAreas.includes(area)
                      ? "bg-teal-600 text-white"
                      : "bg-slate-800 text-gray-400 hover:bg-slate-700"
                  } ${!isEditing ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  {area}
                </button>
              ))}
            </div>
          </div>

          {/* Business Hours */}
          <div className="bg-slate-900/50 backdrop-blur-lg border border-white/10 rounded-xl p-6">
            <h3 className="text-lg font-bold text-white mb-4">Business Hours</h3>
            <div className="space-y-3">
              {DAYS.map((day) => {
                const hours = settings.businessHours[day] || { open: "", close: "" };
                return (
                  <div key={day} className="flex items-center justify-between">
                    <span className="text-gray-300 text-sm w-24">{day}</span>
                    <div className="flex items-center space-x-2">
                      <input
                        type="time"
                        value={hours.open}
                        onChange={(e) => updateHours(day, "open", e.target.value)}
                        disabled={!isEditing}
                        className={`px-2 py-1 bg-slate-950/50 border ${isEditing ? "border-white/10" : "border-transparent"} rounded text-white text-sm ${isEditing ? "" : "opacity-75"}`}
                      />
                      <span className="text-gray-500 text-xs">to</span>
                      <input
                        type="time"
                        value={hours.close}
                        onChange={(e) => updateHours(day, "close", e.target.value)}
                        disabled={!isEditing}
                        className={`px-2 py-1 bg-slate-950/50 border ${isEditing ? "border-white/10" : "border-transparent"} rounded text-white text-sm ${isEditing ? "" : "opacity-75"}`}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Payment Methods */}
          <div className="bg-slate-900/50 backdrop-blur-lg border border-white/10 rounded-xl p-6">
            <h3 className="text-lg font-bold text-white mb-4">Payment Methods</h3>
            <div className="flex flex-wrap gap-2">
              {ALL_PAYMENT_METHODS.map((method) => (
                <button
                  key={method}
                  onClick={() => togglePaymentMethod(method)}
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
        <textarea
          value={settings.notes}
          onChange={(e) => setSettings({ ...settings, notes: e.target.value })}
          disabled={!isEditing}
          rows={3}
          className={`w-full px-4 py-2 bg-slate-950/50 border ${isEditing ? "border-white/10 focus:ring-2 focus:ring-teal-500" : "border-transparent"} rounded-lg text-white text-sm ${isEditing ? "" : "opacity-75"}`}
          placeholder="Internal notes..."
        />
      </div>
    </div>
  );
}
