"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { readServicesData, createService, updateService, deleteService } from "@/lib/data";

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

interface ServiceContextType {
  services: Service[];
  loading: boolean;
  error: string | null;
  refreshServices: () => Promise<void>;
  createService: (data: any) => Promise<Service>;
  updateService: (id: string, data: any) => Promise<Service>;
  deleteService: (id: string) => Promise<void>;
}

const ServiceContext = createContext<ServiceContextType | undefined>(undefined);

export function ServiceProvider({ children }: { children: ReactNode }) {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchServices = async () => {
    try {
      setLoading(true);
      const data = await readServicesData();
      setServices(data.services || []);
      setError(null);
    } catch (err) {
      setError("Failed to load services");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const value: ServiceContextType = {
    services,
    loading,
    error,
    refreshServices: fetchServices,
    createService: async (data) => {
      const newService = await createService(data);
      await fetchServices();
      return newService;
    },
    updateService: async (id, data) => {
      const updatedService = await updateService(id, data);
      await fetchServices();
      return updatedService;
    },
    deleteService: async (id) => {
      await deleteService(id);
      await fetchServices();
    },
  };

  return <ServiceContext.Provider value={value}>{children}</ServiceContext.Provider>;
}

export function useServices() {
  const context = useContext(ServiceContext);
  if (context === undefined) {
    throw new Error("useServices must be used within a ServiceProvider");
  }
  return context;
}
