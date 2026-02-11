"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaPlus,
  FaSearch,
  FaEdit,
  FaTrash,
  FaPaperPlane,
  FaCheck,
  FaTimes,
  FaFileInvoiceDollar,
} from "react-icons/fa";
import {
  readInvoiceData,
  createInvoice,
  updateInvoice,
  deleteInvoice,
  searchInvoices,
  getInvoicesByStatus,
} from "@/lib/data";
import { readClientData, readBookingData } from "@/lib/data";

interface LineItem {
  description: string;
  quantity: number;
  unitPrice: number;
}

interface Invoice {
  id: string;
  invoiceCode: string;
  bookingId?: string;
  clientId: string;
  clientName: string;
  clientEmail?: string;
  clientPhone: string;
  clientAddress?: string;
  items: LineItem[];
  subtotal: number;
  tax: number;
  total: number;
  status: "draft" | "sent" | "paid" | "overdue" | "cancelled";
  dueDate?: string;
  paidAt?: string;
  notes?: string;
  createdAt: string;
}

const STATUS_STYLES: Record<string, string> = {
  draft: "bg-gray-500/20 text-gray-300",
  sent: "bg-blue-500/20 text-blue-300",
  paid: "bg-green-500/20 text-green-300",
  overdue: "bg-red-500/20 text-red-300",
  cancelled: "bg-orange-500/20 text-orange-300",
};

export default function InvoicesPage() {
  const [invoices, setInvoices] = useState<Invoice[]>([]);
  const [clients, setClients] = useState<any[]>([]);
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingInvoice, setEditingInvoice] = useState<Invoice | null>(null);

  // Form
  const [formClientId, setFormClientId] = useState("");
  const [formBookingId, setFormBookingId] = useState("");
  const [formItems, setFormItems] = useState<LineItem[]>([{ description: "", quantity: 1, unitPrice: 0 }]);
  const [formNotes, setFormNotes] = useState("");
  const [formDueDays, setFormDueDays] = useState(30);
  const [formTaxRate, setFormTaxRate] = useState(8.25);

  const fetchInvoices = async () => {
    try {
      setLoading(true);
      const data = await readInvoiceData();
      setInvoices(data.invoices || []);
    } catch {
      // silently fail
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInvoices();
    const loadDeps = async () => {
      try {
        const [cData, bData] = await Promise.all([readClientData(), readBookingData()]);
        setClients(cData.clients || []);
        setBookings(bData.bookings || []);
      } catch {
        // silently fail
      }
    };
    loadDeps();
  }, []);

  const handleSearch = async (q: string) => {
    setSearchQuery(q);
    if (!q) { fetchInvoices(); return; }
    const data = await searchInvoices(q);
    setInvoices(data.invoices || []);
  };

  const handleStatusFilter = async (status: string) => {
    setStatusFilter(status);
    if (!status) { fetchInvoices(); return; }
    const data = await getInvoicesByStatus(status);
    setInvoices(data.invoices || []);
  };

  const calcTotals = (items: LineItem[], taxRate: number) => {
    const subtotal = items.reduce((sum, item) => sum + item.quantity * item.unitPrice, 0);
    const tax = subtotal * (taxRate / 100);
    return { subtotal, tax, total: subtotal + tax };
  };

  const openCreate = () => {
    setEditingInvoice(null);
    setFormClientId("");
    setFormBookingId("");
    setFormItems([{ description: "", quantity: 1, unitPrice: 0 }]);
    setFormNotes("");
    setFormDueDays(30);
    setFormTaxRate(8.25);
    setShowModal(true);
  };

  const openEdit = (inv: Invoice) => {
    setEditingInvoice(inv);
    setFormClientId(inv.clientId);
    setFormBookingId(inv.bookingId || "");
    setFormItems(
      Array.isArray(inv.items) && inv.items.length > 0
        ? inv.items
        : [{ description: "", quantity: 1, unitPrice: 0 }]
    );
    setFormNotes(inv.notes || "");
    setFormTaxRate(inv.subtotal > 0 ? (inv.tax / inv.subtotal) * 100 : 8.25);
    setFormDueDays(30);
    setShowModal(true);
  };

  const handleSave = async () => {
    const client = clients.find((c) => c.id === formClientId);
    if (!client) return;

    const { subtotal, tax, total } = calcTotals(formItems, formTaxRate);
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + formDueDays);

    const payload = {
      clientId: client.id,
      clientName: client.name,
      clientEmail: client.email || undefined,
      clientPhone: client.phone,
      clientAddress: client.address || undefined,
      bookingId: formBookingId || undefined,
      items: formItems.filter((item) => item.description),
      subtotal,
      tax,
      total,
      notes: formNotes || undefined,
      dueDate: dueDate.toISOString(),
    };

    if (editingInvoice) {
      await updateInvoice(editingInvoice.id, payload);
    } else {
      await createInvoice(payload);
    }

    setShowModal(false);
    fetchInvoices();
  };

  const handleDelete = async (id: string) => {
    await deleteInvoice(id);
    fetchInvoices();
  };

  const handleStatusUpdate = async (id: string, status: string, extra?: Record<string, any>) => {
    await updateInvoice(id, { status, ...extra });
    fetchInvoices();
  };

  const addLineItem = () => setFormItems([...formItems, { description: "", quantity: 1, unitPrice: 0 }]);
  const removeLineItem = (i: number) => setFormItems(formItems.filter((_, idx) => idx !== i));
  const updateLineItem = (i: number, field: keyof LineItem, value: string | number) => {
    const updated = [...formItems];
    (updated[i] as any)[field] = value;
    setFormItems(updated);
  };

  const formTotals = calcTotals(formItems, formTaxRate);

  // Summary stats
  const totalOutstanding = invoices.filter((i) => i.status === "sent" || i.status === "overdue").reduce((s, i) => s + i.total, 0);
  const totalPaid = invoices.filter((i) => i.status === "paid").reduce((s, i) => s + i.total, 0);

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
          <h1 className="text-3xl font-bold text-white">Invoices</h1>
          <p className="text-gray-400 mt-1">Create and track client invoices</p>
        </div>
        <button
          onClick={openCreate}
          className="flex items-center space-x-2 px-4 py-2.5 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors font-medium text-sm"
        >
          <FaPlus size={14} />
          <span>New Invoice</span>
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-slate-900/50 border border-white/10 rounded-xl p-4">
          <p className="text-gray-400 text-xs uppercase tracking-wider">Total Invoices</p>
          <p className="text-2xl font-bold text-white mt-1">{invoices.length}</p>
        </div>
        <div className="bg-slate-900/50 border border-white/10 rounded-xl p-4">
          <p className="text-gray-400 text-xs uppercase tracking-wider">Outstanding</p>
          <p className="text-2xl font-bold text-amber-400 mt-1">${totalOutstanding.toFixed(2)}</p>
        </div>
        <div className="bg-slate-900/50 border border-white/10 rounded-xl p-4">
          <p className="text-gray-400 text-xs uppercase tracking-wider">Paid</p>
          <p className="text-2xl font-bold text-green-400 mt-1">${totalPaid.toFixed(2)}</p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={14} />
          <input
            type="text"
            placeholder="Search invoices..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-slate-800/50 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:ring-2 focus:ring-teal-500/50 text-sm"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => handleStatusFilter(e.target.value)}
          className="px-4 py-2.5 bg-slate-800/50 border border-white/10 rounded-lg text-gray-300 focus:ring-2 focus:ring-teal-500/50 text-sm"
        >
          <option value="">All Statuses</option>
          <option value="draft">Draft</option>
          <option value="sent">Sent</option>
          <option value="paid">Paid</option>
          <option value="overdue">Overdue</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      {/* Invoice List */}
      <div className="space-y-3">
        {invoices.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <FaFileInvoiceDollar size={48} className="mx-auto mb-4 opacity-30" />
            <p>No invoices yet. Create your first invoice to get started.</p>
          </div>
        ) : (
          invoices.map((inv, i) => (
            <motion.div
              key={inv.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-slate-900/50 backdrop-blur-lg border border-white/10 rounded-xl p-5"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-1">
                    <span className="text-teal-400 font-mono text-sm">{inv.invoiceCode}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${STATUS_STYLES[inv.status]}`}>
                      {inv.status}
                    </span>
                  </div>
                  <h3 className="text-white font-medium">{inv.clientName}</h3>
                  <p className="text-gray-500 text-xs mt-1">
                    Created {new Date(inv.createdAt).toLocaleDateString()}
                    {inv.dueDate && ` · Due ${new Date(inv.dueDate).toLocaleDateString()}`}
                    {inv.paidAt && ` · Paid ${new Date(inv.paidAt).toLocaleDateString()}`}
                  </p>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-2xl font-bold text-white">${inv.total.toFixed(2)}</span>
                  <div className="flex space-x-1">
                    {inv.status === "draft" && (
                      <button
                        onClick={() => handleStatusUpdate(inv.id, "sent")}
                        className="p-2 text-blue-400 hover:bg-blue-500/10 rounded-lg transition-colors"
                        title="Send Invoice"
                      >
                        <FaPaperPlane size={14} />
                      </button>
                    )}
                    {(inv.status === "sent" || inv.status === "overdue") && (
                      <button
                        onClick={() => handleStatusUpdate(inv.id, "paid", { paidAt: new Date().toISOString() })}
                        className="p-2 text-green-400 hover:bg-green-500/10 rounded-lg transition-colors"
                        title="Mark as Paid"
                      >
                        <FaCheck size={14} />
                      </button>
                    )}
                    <button
                      onClick={() => openEdit(inv)}
                      className="p-2 text-gray-400 hover:bg-white/5 rounded-lg transition-colors"
                    >
                      <FaEdit size={14} />
                    </button>
                    <button
                      onClick={() => handleDelete(inv.id)}
                      className="p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                    >
                      <FaTrash size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>

      {/* Create/Edit Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-slate-900 border border-white/10 rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            >
              <h2 className="text-xl font-bold text-white mb-6">
                {editingInvoice ? "Edit Invoice" : "New Invoice"}
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Client</label>
                  <select
                    value={formClientId}
                    onChange={(e) => setFormClientId(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-800 border border-white/10 rounded-lg text-white text-sm"
                  >
                    <option value="">Select a client...</option>
                    {clients.map((c) => (
                      <option key={c.id} value={c.id}>{c.name} - {c.phone}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Linked Booking (optional)</label>
                  <select
                    value={formBookingId}
                    onChange={(e) => setFormBookingId(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-800 border border-white/10 rounded-lg text-white text-sm"
                  >
                    <option value="">No linked booking</option>
                    {bookings
                      .filter((b) => !formClientId || b.clientId === formClientId)
                      .map((b) => (
                        <option key={b.id} value={b.id}>
                          {b.bookingCode} - {b.serviceName} (${b.price})
                        </option>
                      ))}
                  </select>
                </div>

                {/* Line Items */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="text-sm font-medium text-gray-400">Line Items</label>
                    <button onClick={addLineItem} className="text-xs text-teal-400 hover:text-teal-300">
                      + Add Item
                    </button>
                  </div>
                  <div className="space-y-2">
                    {formItems.map((item, i) => (
                      <div key={i} className="flex gap-2 items-center">
                        <input
                          type="text"
                          placeholder="Description"
                          value={item.description}
                          onChange={(e) => updateLineItem(i, "description", e.target.value)}
                          className="flex-1 px-3 py-2 bg-slate-800 border border-white/10 rounded-lg text-white text-sm"
                        />
                        <input
                          type="number"
                          placeholder="Qty"
                          value={item.quantity}
                          onChange={(e) => updateLineItem(i, "quantity", parseFloat(e.target.value) || 0)}
                          className="w-20 px-3 py-2 bg-slate-800 border border-white/10 rounded-lg text-white text-sm text-center"
                        />
                        <input
                          type="number"
                          placeholder="Price"
                          value={item.unitPrice}
                          onChange={(e) => updateLineItem(i, "unitPrice", parseFloat(e.target.value) || 0)}
                          className="w-28 px-3 py-2 bg-slate-800 border border-white/10 rounded-lg text-white text-sm text-right"
                        />
                        <span className="text-gray-400 text-sm w-24 text-right">
                          ${(item.quantity * item.unitPrice).toFixed(2)}
                        </span>
                        {formItems.length > 1 && (
                          <button onClick={() => removeLineItem(i)} className="text-red-400 hover:text-red-300 p-1">
                            <FaTimes size={12} />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tax */}
                <div className="flex items-center space-x-3">
                  <label className="text-sm font-medium text-gray-400">Tax Rate (%)</label>
                  <input
                    type="number"
                    value={formTaxRate}
                    onChange={(e) => setFormTaxRate(parseFloat(e.target.value) || 0)}
                    className="w-24 px-3 py-2 bg-slate-800 border border-white/10 rounded-lg text-white text-sm text-right"
                  />
                </div>

                {/* Totals */}
                <div className="bg-slate-800/50 rounded-lg p-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Subtotal</span>
                    <span className="text-white">${formTotals.subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Tax ({formTaxRate}%)</span>
                    <span className="text-white">${formTotals.tax.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold border-t border-white/10 pt-2">
                    <span className="text-gray-300">Total</span>
                    <span className="text-teal-400">${formTotals.total.toFixed(2)}</span>
                  </div>
                </div>

                {/* Due Days */}
                <div className="flex items-center space-x-3">
                  <label className="text-sm font-medium text-gray-400">Payment due in (days)</label>
                  <input
                    type="number"
                    value={formDueDays}
                    onChange={(e) => setFormDueDays(parseInt(e.target.value) || 30)}
                    className="w-24 px-3 py-2 bg-slate-800 border border-white/10 rounded-lg text-white text-sm text-center"
                  />
                </div>

                {/* Notes */}
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">Notes</label>
                  <textarea
                    value={formNotes}
                    onChange={(e) => setFormNotes(e.target.value)}
                    rows={3}
                    className="w-full px-3 py-2 bg-slate-800 border border-white/10 rounded-lg text-white text-sm"
                    placeholder="Payment instructions or additional notes..."
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button onClick={() => setShowModal(false)} className="px-4 py-2 text-gray-400 hover:text-white transition-colors text-sm">
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={!formClientId}
                  className="px-6 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600 transition-colors font-medium text-sm disabled:opacity-50"
                >
                  {editingInvoice ? "Update" : "Create"} Invoice
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
