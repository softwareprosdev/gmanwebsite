"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { readClientData, createClient, updateClient, deleteClient, searchClients } from "@/lib/data";

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

interface ClientContextType {
  clients: Client[];
  loading: boolean;
  error: string | null;
  refreshClients: () => Promise<void>;
  createClient: (data: any) => Promise<Client>;
  updateClient: (id: string, data: any) => Promise<Client>;
  deleteClient: (id: string) => Promise<void>;
  searchClients: (query: string) => Promise<Client[]>;
}

const ClientContext = createContext<ClientContextType | undefined>(undefined);

export function ClientProvider({ children }: { children: ReactNode }) {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchClients = async () => {
    try {
      setLoading(true);
      const data = await readClientData();
      setClients(data.clients || []);
      setError(null);
    } catch (err) {
      setError("Failed to load clients");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClients();
  }, []);

  const value: ClientContextType = {
    clients,
    loading,
    error,
    refreshClients: fetchClients,
    createClient: async (data) => {
      const newClient = await createClient(data);
      await fetchClients();
      return newClient;
    },
    updateClient: async (id, data) => {
      const updatedClient = await updateClient(id, data);
      await fetchClients();
      return updatedClient;
    },
    deleteClient: async (id) => {
      await deleteClient(id);
      await fetchClients();
    },
    searchClients: async (query) => {
      const data = await searchClients(query);
      setClients(data.clients || []);
      return data.clients || [];
    },
  };

  return <ClientContext.Provider value={value}>{children}</ClientContext.Provider>;
}

export function useClients() {
  const context = useContext(ClientContext);
  if (context === undefined) {
    throw new Error("useClients must be used within a ClientProvider");
  }
  return context;
}
