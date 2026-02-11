"use client";

import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import { FaSearch, FaPlus, FaEdit, FaTrash, FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { useClients } from "@/components/ClientProvider";

interface Client {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  zone: string;
  status: "active" | "inactive" | "pending" | "blocked";
  totalBookings: number;
  lastBooking: string | null;
  notes: string;
  createdAt: string;
}

export default function ClientsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);

  const { clients, loading, error, refreshClients, createClient, updateClient, deleteClient, searchClients } = useClients();

  const [filteredClients, setFilteredClients] = useState<Client[]>([]);

  useEffect(() => {
    if (!searchQuery) {
      setFilteredClients(clients);
    }
  }, [clients, searchQuery]);

  // Search clients when query changes
  useEffect(() => {
    if (searchQuery) {
      searchClients(searchQuery).then(setFilteredClients);
    }
  }, [searchQuery]);

  const handleEdit = (client: Client) => {
    setSelectedClient(client);
    setIsEditModalOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this client?")) {
      await deleteClient(id);
    }
  };

  const handleAddClient = async (clientData: Omit<Client, "id" | "createdAt" | "totalBookings" | "lastBooking">) => {
    const newClient = await createClient(clientData);
    setIsAddModalOpen(false);
  };

  const handleUpdateClient = async (clientData: Omit<Client, "id" | "createdAt" | "totalBookings" | "lastBooking">) => {
    if (selectedClient) {
      await updateClient(selectedClient.id, clientData);
      setIsEditModalOpen(false);
      setSelectedClient(null);
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
            onClick={() => refreshClients()}
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
          <h1 className="text-3xl font-bold text-white">Clients</h1>
          <p className="text-gray-400">Manage your client database and relationships</p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-teal-600 to-gold-600 rounded-lg text-white font-medium hover:shadow-[0_0_15px_rgba(0,128,128,0.3)] transition-all"
        >
          <FaPlus size={18} />
          <span>Add Client</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="bg-slate-900/50 backdrop-blur-lg border border-white/10 rounded-xl p-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaSearch className="text-gray-500" />
          </div>
          <input
            type="text"
            placeholder="Search clients by name, email, phone, or city..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-slate-950/50 border border-white/10 rounded-lg text-white placeholder-gray-600 focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
          />
        </div>
      </div>

      {/* Clients Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredClients.map((client, index) => (
          <motion.div
            key={client.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className="bg-slate-900/50 backdrop-blur-lg border border-white/10 rounded-xl p-6 hover:border-teal-500/30 transition-all duration-300 group"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-teal-600 to-gold-500 flex items-center justify-center text-white font-bold text-lg">
                  {client.name.charAt(0)}
                </div>
                <div>
                  <h3 className="text-white font-semibold text-lg">{client.name}</h3>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    client.status === 'active' ? 'bg-teal-500/10 text-teal-400' :
                    client.status === 'inactive' ? 'bg-gray-500/10 text-gray-400' :
                    client.status === 'pending' ? 'bg-amber-500/10 text-amber-400' :
                    'bg-red-500/10 text-red-400'
                  }`}>
                    {client.status}
                  </span>
                </div>
              </div>
              <div className="flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => handleEdit(client)}
                  className="p-2 text-gray-400 hover:text-teal-400 hover:bg-teal-500/10 rounded-lg transition-colors"
                >
                  <FaEdit size={16} />
                </button>
                <button
                  onClick={() => handleDelete(client.id)}
                  className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                >
                  <FaTrash size={16} />
                </button>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center text-gray-400 text-sm">
                <FaPhone className="mr-2 text-teal-500" size={14} />
                <span>{client.phone}</span>
              </div>
              <div className="flex items-center text-gray-400 text-sm">
                <FaEnvelope className="mr-2 text-teal-500" size={14} />
                <span>{client.email}</span>
              </div>
              <div className="flex items-center text-gray-400 text-sm">
                <FaMapMarkerAlt className="mr-2 text-teal-500" size={14} />
                <span>{client.city}</span>
              </div>
            </div>

            <div className="pt-4 border-t border-white/5 flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-500">Total Bookings</p>
                <p className="text-lg font-bold text-white">{client.totalBookings}</p>
              </div>
              {client.lastBooking && (
                <div className="text-right">
                  <p className="text-xs text-gray-500">Last Booking</p>
                  <p className="text-sm font-medium text-teal-400">{client.lastBooking}</p>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {filteredClients.length === 0 && !loading && (
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-slate-900/50 flex items-center justify-center">
            <FaSearch className="text-gray-500" size={32} />
          </div>
          <h3 className="text-xl font-bold text-white mb-2">No clients found</h3>
          <p className="text-gray-400">Try adjusting your search criteria</p>
        </div>
      )}

      {/* Add Client Modal */}
      {isAddModalOpen && (
        <ClientModal
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
          onSave={handleAddClient}
          mode="add"
        />
      )}

      {/* Edit Client Modal */}
      {isEditModalOpen && selectedClient && (
        <ClientModal
          isOpen={isEditModalOpen}
          onClose={() => setIsEditModalOpen(false)}
          client={selectedClient}
          onSave={handleUpdateClient}
          mode="edit"
        />
      )}
    </div>
  );
}

function ClientModal({
  isOpen,
  onClose,
  client,
  onSave,
  mode = "add",
}: {
  isOpen: boolean;
  onClose: () => void;
  client?: Client;
  onSave: (client: Omit<Client, "id" | "createdAt" | "totalBookings" | "lastBooking">) => void;
  mode?: "add" | "edit";
}) {
  const [formData, setFormData] = useState<Partial<Client>>({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    zone: "Lower Rio Grande Valley",
    status: "active",
    notes: "",
    ...client,
  });

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
        className="bg-slate-900 border border-white/10 rounded-2xl w-full max-w-lg shadow-2xl"
      >
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <h2 className="text-xl font-bold text-white">{mode === "add" ? "Add New Client" : "Edit Client"}</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="block text-sm text-gray-400 mb-1">Full Name</label>
              <input
                required
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-2 bg-slate-950/50 border border-white/10 rounded-lg text-white focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-2 bg-slate-950/50 border border-white/10 rounded-lg text-white focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Phone</label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full px-4 py-2 bg-slate-950/50 border border-white/10 rounded-lg text-white focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              />
            </div>
            <div className="col-span-2">
              <label className="block text-sm text-gray-400 mb-1">Address</label>
              <input
                type="text"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full px-4 py-2 bg-slate-950/50 border border-white/10 rounded-lg text-white focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">City</label>
              <input
                type="text"
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                className="w-full px-4 py-2 bg-slate-950/50 border border-white/10 rounded-lg text-white focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Zone</label>
              <select
                value={formData.zone}
                onChange={(e) => setFormData({ ...formData, zone: e.target.value })}
                className="w-full px-4 py-2 bg-slate-950/50 border border-white/10 rounded-lg text-white focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              >
                <option value="Lower Rio Grande Valley">Lower Rio Grande Valley</option>
                <option value="Upper Valley">Upper Valley</option>
                <option value="Coastal">Coastal</option>
              </select>
            </div>
            <div className="col-span-2">
              <label className="block text-sm text-gray-400 mb-1">Status</label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                className="w-full px-4 py-2 bg-slate-950/50 border border-white/10 rounded-lg text-white focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="pending">Pending</option>
                <option value="blocked">Blocked</option>
              </select>
            </div>
            <div className="col-span-2">
              <label className="block text-sm text-gray-400 mb-1">Notes</label>
              <textarea
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                rows={3}
                className="w-full px-4 py-2 bg-slate-950/50 border border-white/10 rounded-lg text-white focus:ring-2 focus:ring-teal-500 focus:border-teal-500"
              ></textarea>
            </div>
          </div>

          <div className="flex space-x-3 pt-4">
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
              {mode === "add" ? "Add Client" : "Save Changes"}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
