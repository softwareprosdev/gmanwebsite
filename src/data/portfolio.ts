// Portfolio data
export interface PortfolioItem {
  id: string;
  title: string;
  category: string;
  before: string;
  after: string;
  description: string;
}

export const portfolio: PortfolioItem[] = [
  {
    id: "1",
    title: "Kitchen Remodel",
    category: "Interior",
    before: "/portfolio/kitchen-before.jpg",
    after: "/portfolio/kitchen-after.jpg",
    description: "Complete kitchen transformation with modern cabinetry and quartz countertops.",
  },
  {
    id: "2",
    title: "Bathroom Upgrade",
    category: "Plumbing",
    before: "/portfolio/bath-before.jpg",
    after: "/portfolio/bath-after.jpg",
    description: "Luxury bathroom renovation with walk-in shower and heated floors.",
  },
  {
    id: "3",
    title: "Electrical Panel",
    category: "Electrical",
    before: "/portfolio/panel-before.jpg",
    after: "/portfolio/panel-after.jpg",
    description: "Upgraded electrical panel for increased capacity and modern safety.",
  },
  {
    id: "4",
    title: "Deck Reconstruction",
    category: "Exterior",
    before: "/portfolio/deck-before.jpg",
    after: "/portfolio/deck-after.jpg",
    description: "Full deck rebuild with composite materials and LED lighting.",
  },
  {
    id: "5",
    title: "Smart Lighting",
    category: "Technology",
    before: "/portfolio/lighting-before.jpg",
    after: "/portfolio/lighting-after.jpg",
    description: "Whole-home smart lighting system with voice control.",
  },
  {
    id: "6",
    title: "Basement Finishing",
    category: "Construction",
    before: "/portfolio/basement-before.jpg",
    after: "/portfolio/basement-after.jpg",
    description: "Transformed empty basement into a functional living space.",
  },
];
