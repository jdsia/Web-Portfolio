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
    id: "akyat",
    filename: "akyat.md",
    title: "Akyat — Bouldering Training & Logging Platform",
    technologies: [
      "React",
      "TypeScript",
      "Node.js",
      "Express",
      "Prisma",
      "PostgreSQL",
      "Supabase Auth",
      "Tailwind CSS",
    ],
    bullets: [
      "Architected full-stack bouldering training and logging platform with JWT authentication, Supabase Auth, HTTP-only cookie session management, and role-scoped data isolation.",
      "Eliminated manual climb tracking via structured session logging with active-session persistence — reducing data loss during multi-hour gym sessions for reliable climbing/training records.",
      "Surfaced actionable training insights through an analytics dashboard with animated grade pyramids, performance trends, and a 'Climbing DNA' breakdown — identifying weaknesses by hold type and wall angle to enable data-informed training decisions.",
    ],
    images: ["/akyat.png"],
  },
  {
    id: "pipeline",
    filename: "flood-control-pipeline.md",
    title: "Flood Control Data Analysis Pipeline",
    technologies: [
      "JavaScript",
      "Node.js",
      "CSV Parsing",
      "Data Analytics",
    ],
    bullets: [
      "Engineered high-throughput JavaScript data pipeline parsing, cleaning, and validating raw DPWH flood control datasets containing 10,000+ records across multi-year intervals.",
      "Implemented multi-level aggregation algorithms and statistical models computing derived metrics, transforming unstructured CSV inputs into actionable regional infrastructure financial reports.",
      "Optimized data processing layers maintaining structural integrity and minimizing memory overhead during heavy validation and multi-field filtering workflows.",
    ],
    images: ["/pipeline.png"],
  },
  {
    id: "products",
    filename: "salon-inventory.md",
    title: "Salon Product Inventory Management System (Stackform)",
    technologies: [
      "React (Vite)",
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
      "Built stoppage tracking in the interactive map modal with Next.js, React, TypeScript, and Supabase — reducing fuel costs and surfacing actionable insights for fleet operators.",
    ],
  },
];
