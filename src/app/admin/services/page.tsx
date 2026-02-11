"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaEdit, FaTrash, FaPlus, FaCheck, FaTimes, FaCheckCircle } from "react-icons/fa";
import { useServices } from "@/components/ServiceProvider";

interface Service {
  id: string;
  serviceCode: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  defaultPriceMin: number;
  defaultPriceMax: number;
  features: string[];
  category: string;
  available: boolean;
  createdAt: string;
}

export default function ServicesPage() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const { services, loading, error, refreshServices, createService, updateService, deleteService } = useServices();

  const handleEdit = (service: Service) => {
    setSelectedService(service);
    setIsEditModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this service?")) {
      await deleteService(id);
    }
  };

  const handleToggleAvailability = async (id: string) => {
    const service = services.find((s) => s.id === id);
    if (service) {
      await updateService(id, { available: !service.available });
    }
  };

  const handleAddService = async (serviceData: Omit<Service, "id" | "createdAt">) => {
    await createService(serviceData);
    setIsAddModalOpen(false);
  };

  const handleUpdateService = async (serviceData: Omit<Service, "id" | "createdAt">) => {
    if (selectedService) {
      await updateService(selectedService.id, serviceData);
      setIsEditModalOpen(false);
      setSelectedService(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <p className="text-red-500 mb-4">{error}</p>
          <button
            onClick={() => refreshServices()}
            className="px-4 py-2 bg-teal-600 text-white rounded-lg"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-white">Services</h1>
          <p className="text-gray-400">Manage the services you offer to clients</p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-teal-600 to-gold-600 rounded-lg text-white font-medium hover:shadow-[0_0_15px_rgba(0,128,128,0.3)] transition-all"
        >
          <FaPlus size={18} />
          <span>Add Service</span>
        </button>
      </div>

      {/* Services Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {services.map((service, index) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="bg-slate-900/50 backdrop-blur-lg border border-white/10 rounded-xl p-6 hover:border-teal-500/30 transition-all duration-300"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-teal-600/20 to-gold-500/20 flex items-center justify-center text-3xl border border-white/10">
                  {service.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">{service.title}</h3>
                  <p className="text-sm text-gray-400 capitalize">{service.category}</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleToggleAvailability(service.id)}
                  className={`p-2 rounded-lg transition-colors ${
                    service.available
                      ? "text-green-400 hover:bg-green-500/10"
                      : "text-gray-500 hover:bg-gray-500/10"
                  }`}
                  title={service.available ? "Disable service" : "Enable service"}
                >
                  {service.available ? <FaCheck size={16} /> : <FaTimes size={16} />}
                </button>
                <button
                  onClick={() => handleEdit(service)}
                  className="p-2 text-gray-400 hover:text-teal-400 hover:bg-teal-500/10 rounded-lg transition-colors"
                >
                  <FaEdit size={16} />
                </button>
                <button
                  onClick={() => handleDelete(service.id)}
                  className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                >
                  <FaTrash size={16} />
                </button>
              </div>
            </div>

            <p className="text-gray-300 mb-4">{service.description}</p>

            <div className="space-y-3">
              <div>
                <p className="text-xs text-gray-500 uppercase font-semibold mb-2">Features</p>
                <div className="flex flex-wrap gap-2">
                  {service.features.map((feature, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-md bg-slate-950/50 border border-white/5 text-xs text-gray-300"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                <div className="text-sm">
                  <p className="text-gray-500">Price Range</p>
                  <p className="text-white font-medium">
                    ${service.defaultPriceMin} - ${service.defaultPriceMax}
                  </p>
                </div>
                <div className="text-sm">
                  <p className="text-gray-500">Service ID</p>
                  <p className="text-gray-400 font-mono">{service.serviceCode}</p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Add Service Modal */}
      {isAddModalOpen && (
        <ServiceModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onSave={handleAddService}
          mode="add"
        />
      )}

      {/* Edit Service Modal */}
      {isEditModalOpen && selectedService && (
        <ServiceModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          service={selectedService}
          onSave={handleUpdateService}
          mode="edit"
        />
      )}
    </div>
  );
}

function ServiceModal({
  isOpen,
  onClose,
  service,
  onSave,
  mode = "add",
}: {
  isOpen: boolean;
  onClose: () => void;
  service?: Service;
  onSave: (service: Omit<Service, "id" | "createdAt">) => void;
  mode?: "add" | "edit";
}) {
  const [formData, setFormData] = useState<Partial<Service>>({
    title: "",
    serviceCode: "",
    description: "",
    icon: "🔧",
    color: "teal",
    features: [],
    category: "Repair",
    defaultPriceMin: 100,
    defaultPriceMax: 500,
    available: true,
    ...service,
  });

  const [newFeature, setNewFeature] = useState("");

  const handleAddFeature = (e: React.FormEvent) => {
    e.preventDefault();
    if (newFeature.trim()) {
      setFormData({
        ...formData,
        features: [...(formData.features || []), newFeature.trim()],
      });
      setNewFeature("");
    }
  };

  const handleRemoveFeature = (index: number) => {
    setFormData({
      ...formData,
      features: formData.features?.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData as any);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-slate-900 border border-white/10 rounded-2xl w-full max-w-2xl shadow-2xl max-h-[90vh] overflow-y-auto"
      >
        <div className="flex items-center justify-between p-6 border-b border-white/10 sticky top-0 bg-slate-900 z-10">
          <h2 className="text-xl font-bold text-white">{mode === "add" ? "Add New Service" : "Edit Service"}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="col-span-2">
              <label className="block text-sm text-gray-400 mb-1">Service Title</label>
              <input
                required
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full px-4 py-2 bg-slate-950/50 border border-white/10 rounded-lg text-white focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              />
            </div>

            <div className="col-span-2">
              <label className="block text-sm text-gray-400 mb-1">Service Code</label>
              <input
                required
                type="text"
                value={formData.serviceCode}
                onChange={(e) => setFormData({ ...formData, serviceCode: e.target.value })}
                className="w-full px-4 py-2 bg-slate-950/50 border border-white/10 rounded-lg text-white focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                placeholder="e.g., plumbing, electrical"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full px-4 py-2 bg-slate-950/50 border border-white/10 rounded-lg text-white focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              >
                <option value="Repair">Repair</option>
                <option value="Installation">Installation</option>
                <option value="Renovation">Renovation</option>
                <option value="Maintenance">Maintenance</option>
              </select>
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">Icon</label>
              <input
                type="text"
                value={formData.icon}
                onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                className="w-full px-4 py-2 bg-slate-950/50 border border-white/10 rounded-lg text-white focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              />
            </div>

            <div>
              <label className="block text-sm text-gray-400 mb-1">Color Theme</label>
              <select
                value={formData.color}
                onChange={(e) => setFormData({ ...formData, color: e.target.value })}
                className="w-full px-4 py-2 bg-slate-950/50 border border-white/10 rounded-lg text-white focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              >
                <option value="teal">Teal</option>
                <option value="cyan">Cyan</option>
                <option value="yellow">Yellow</option>
                <option value="orange">Orange</option>
                <option value="purple">Purple</option>
                <option value="blue">Blue</option>
                <option value="pink">Pink</option>
              </select>
            </div>

            <div className="col-span-2">
              <label className="block text-sm text-gray-400 mb-1">Description</label>
              <textarea
                required
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                className="w-full px-4 py-2 bg-slate-950/50 border border-white/10 rounded-lg text-white focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              ></textarea>
            </div>

            <div className="col-span-2">
              <label className="block text-sm text-gray-400 mb-1">Features</label>
              <div className="space-y-3">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={newFeature}
                    onChange={(e) => setNewFeature(e.target.value)}
                    placeholder="Add a feature (e.g., 24/7 support)"
                    className="flex-1 px-4 py-2 bg-slate-950/50 border border-white/10 rounded-lg text-white focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  />
                  <button
                    type="submit"
                    onClick={handleAddFeature}
                    className="px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {(formData.features || []).map((feature, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 rounded-lg bg-teal-500/10 text-teal-300 text-sm flex items-center gap-2"
                    >
                      {feature}
                      <button
                        type="button"
                        onClick={() => handleRemoveFeature(i)}
                        className="text-teal-400 hover:text-teal-200"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="col-span-2 grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Min Price</label>
                <div className="relative">
                  <span className="absolute left-3 top-2 text-gray-500">$</span>
                  <input
                    type="number"
                    value={formData.defaultPriceMin}
                    onChange={(e) => setFormData({
                      ...formData,
                      defaultPriceMin: Number(e.target.value),
                    })}
                    className="w-full pl-7 pr-4 py-2 bg-slate-950/50 border border-white/10 rounded-lg text-white focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Max Price</label>
                <div className="relative">
                  <span className="absolute left-3 top-2 text-gray-500">$</span>
                  <input
                    type="number"
                    value={formData.defaultPriceMax}
                    onChange={(e) => setFormData({
                      ...formData,
                      defaultPriceMax: Number(e.target.value),
                    })}
                    className="w-full pl-7 pr-4 py-2 bg-slate-950/50 border border-white/10 rounded-lg text-white focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
                  />
                </div>
              </div>
            </div>

            <div className="col-span-2">
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.available}
                  onChange={(e) => setFormData({ ...formData, available: e.target.checked })}
                  className="w-5 h-5 rounded border-gray-700 bg-slate-800 text-teal-500 focus:ring-teal-500/50"
                />
                <span className="text-gray-300">Service Available</span>
              </label>
            </div>
          </div>

          <div className="flex space-x-3 pt-4 border-t border-white/10">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 px-4 rounded-lg bg-slate-800 text-gray-300 hover:bg-slate-700 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-2.5 px-4 rounded-lg bg-gradient-to-r from-teal-600 to-gold-600 text-white font-medium hover:shadow-[0_0_15px_rgba(0,128,128,0.3)] transition-all"
            >
              {mode === "add" ? "Add Service" : "Save Changes"}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
