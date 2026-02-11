// Services data
export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  color: string;
  features: string[];
}

export const services: Service[] = [
  {
    id: "plumbing",
    title: "Plumbing Repair",
    description: "Professional plumbing services with leak detection and repair technology. Fast, reliable, and thorough.",
    icon: "💧",
    color: "cyan",
    features: ["Smart leak detection", "Pipe repair & replacement", "Water heater services", "Drain cleaning"],
  },
  {
    id: "electrical",
    title: "Electrical Services",
    description: "Expert electrical work with modern safety standards. From wiring to full home automation integration.",
    icon: "⚡",
    color: "yellow",
    features: ["Wiring & installation", "Panel upgrades", "Lighting installation", "EV charging setup"],
  },
  {
    id: "general",
    title: "General Repair",
    description: "All-in-one repair solutions for your home. Fast response, expert technicians, quality workmanship.",
    icon: "🛠️",
    color: "orange",
    features: ["Furniture repair", "Appliance fixes", "Hardware installation", "Minor construction"],
  },
  {
    id: "painting",
    title: "Interior & Exterior",
    description: "Professional painting services using advanced techniques and premium materials for lasting results.",
    icon: "🎨",
    color: "purple",
    features: ["Room painting", "Surface preparation", "Deck & fence", "Color consultation"],
  },
  {
    id: "hvac",
    title: "Climate Control",
    description: "Heating and cooling system installation and repair. Keep your home comfortable year-round.",
    icon: "❄️",
    color: "blue",
    features: ["AC repair", "Heating system", "Air quality", "Energy efficiency"],
  },
  {
    id: "smart",
    title: "Smart Home Setup",
    description: "Integrate your home with cutting-edge smart technology. Security, lighting, and automation.",
    icon: "🤖",
    color: "pink",
    features: ["Security systems", "Smart lighting", "Voice control", "Home automation"],
  },
];
