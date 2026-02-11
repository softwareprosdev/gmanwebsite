// Services configuration for admin panel
export interface ServiceConfig {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  defaultPriceRange: {
    min: number;
    max: number;
  };
  features: string[];
  category: string;
  available: boolean;
}

export const services: ServiceConfig[] = [
  {
    id: "plumbing",
    title: "Plumbing Repair",
    description: "Professional plumbing services with leak detection and repair technology. Fast, reliable, and thorough.",
    icon: "💧",
    color: "cyan",
    defaultPriceRange: { min: 100, max: 500 },
    features: ["Smart leak detection", "Pipe repair & replacement", "Water heater services", "Drain cleaning"],
    category: "Repair",
    available: true,
  },
  {
    id: "electrical",
    title: "Electrical Services",
    description: "Expert electrical work with modern safety standards. From wiring to full home automation integration.",
    icon: "⚡",
    color: "yellow",
    defaultPriceRange: { min: 150, max: 800 },
    features: ["Wiring & installation", "Panel upgrades", "Lighting installation", "EV charging setup"],
    category: "Installation",
    available: true,
  },
  {
    id: "general",
    title: "General Repair",
    description: "All-in-one repair solutions for your home. Fast response, expert technicians, quality workmanship.",
    icon: "🛠️",
    color: "orange",
    defaultPriceRange: { min: 75, max: 300 },
    features: ["Furniture repair", "Appliance fixes", "Hardware installation", "Minor construction"],
    category: "Repair",
    available: true,
  },
  {
    id: "painting",
    title: "Interior & Exterior",
    description: "Professional painting services using advanced techniques and premium materials for lasting results.",
    icon: "🎨",
    color: "purple",
    defaultPriceRange: { min: 300, max: 2000 },
    features: ["Room painting", "Surface preparation", "Deck & fence", "Color consultation"],
    category: "Renovation",
    available: true,
  },
  {
    id: "hvac",
    title: "Climate Control",
    description: "Heating and cooling system installation and repair. Keep your home comfortable year-round.",
    icon: "❄️",
    color: "blue",
    defaultPriceRange: { min: 200, max: 1000 },
    features: ["AC repair", "Heating system", "Air quality", "Energy efficiency"],
    category: "Installation",
    available: true,
  },
  {
    id: "smart",
    title: "Smart Home Setup",
    description: "Integrate your home with cutting-edge smart technology. Security, lighting, and automation.",
    icon: "🤖",
    color: "pink",
    defaultPriceRange: { min: 250, max: 1500 },
    features: ["Security systems", "Smart lighting", "Voice control", "Home automation"],
    category: "Installation",
    available: true,
  },
];

export const getServiceById = (id: string): ServiceConfig | undefined => {
  return services.find((service) => service.id === id);
};

export const getServiceCategories = (): string[] => {
  const categories = new Set(services.map((s) => s.category));
  return Array.from(categories);
};

export const getServiceByCategory = (category: string): ServiceConfig[] => {
  return services.filter((s) => s.category === category);
};
