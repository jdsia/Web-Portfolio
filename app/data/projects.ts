export interface Project {
  id: string;
  filename: string;
  title: string;
  technologies: string[];
  bullets: string[];
  images?: string[];
  github?: string;
}

export const PROJECTS: Project[] = [
  {
    id: "fleet",
    filename: "fleet-management.md",
    title: "Fleet Management & Logistics Platform (Innovare)",
    technologies: [
      "Next.js",
      "React",
      "TypeScript",
      "Supabase",
      "APIs",
      "Real-time Alerts",
    ],
    bullets: [
      "Developed the interactive analytics dashboard for a full-stack fleet management platform, engineering data-aggregation APIs to visualize completed trip distances and fuel consumption trends over time.",
      "Implemented a real-time notification system for critical trip events, enabling operators to monitor driver actions instantly and optimize logistics decisions.",
      "Built with Next.js, React, TypeScript, and Supabase — helping reduce fuel costs and surface actionable insights for fleet operators.",
    ],
  },
  {
    id: "products",
    filename: "salon-inventory.md",
    title: "Salon Product Inventory Management System (Stackform)",
    technologies: [
      "React",
      "Vite",
      "Node.js",
      "Express",
      "Prisma",
      "PostgreSQL",
      "Tailwind CSS",
      "Supabase",
    ],
    bullets: [
      "Co-engineered and shipped a custom full-stack inventory system under the Stackform agency for a salon business in Tarlac, utilizing React, Node.js, Express, Prisma, and PostgreSQL (Supabase) with RBAC, audit logs, and low-stock alerts.",
      "Led the transition from manual Excel workflows to a centralized, agency-built solution, capturing 500,000+ PHP in monthly transactions and eliminating stock discrepancies.",
      "Delivered custom inventory analytics modules to trace consumption trends, empowering the business owner with data-driven purchasing models to reduce overstock.",
    ],
    images: ["/salon-inventory.png"],
  },
];
