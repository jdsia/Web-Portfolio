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
    id: "pumice",
    filename: "pumice/",
    title: "Pumice",
    technologies: [
      "Tauri v2",
      "Rust",
      "Svelte 5",
      "TypeScript",
      "CSS",
      "gray-matter",
      "markdown-it",
    ],
    bullets: [
      "Built a fast, lightweight desktop companion for Obsidian using Tauri v2 (Rust) and Svelte 5 to bypass the heavy memory tax of running multiple Electron apps.",
      "Connected directly to local Obsidian vaults to parse YAML frontmatter and auto-save edits instantly, featuring an instant-launch scratchpad and rapid search by filenames and tags.",
      "Built this app for personal use to avoid system lag on my laptop when running multiple electron based apps (chrome, spotify, etc+). I wanted something that could open quickly, and close even faster, as well as fit my design preference.",
    ],
    images: ["/pumice.png"],
    github: "https://github.com/jdsia/pumice",
  },
  {
    id: "akyat",
    filename: "akyat/",
    title: "Akyat",
    technologies: [
      "React",
      "React Native",
      "Expo",
      "TypeScript",
      "Node.js",
      "Prisma",
      "PostgreSQL",
      "Tailwind CSS",
      "Supabase",
      "Express",
    ],
    bullets: [
      "built a full-stack bouldering logging platform with Supabase Auth, session management, and user-scoped data isolation.",
      "Eliminated manual climb tracking via structured session logging with active-session persistence — reducing data loss during multi-hour gym sessions for highly reliable training records.",
      "Surfaced actionable training insights through an analytics dashboard with animated grade pyramids — identifying user weaknesses by hold type and wall angle to enable data-informed training decisions.",
    ],
    images: ["/akyat.png"],
    github: "https://boulder-training-app.vercel.app/",
  },
  {
    id: "products",
    filename: "salon-inventory/",
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
      "Co-engineered and shipped a custom full-stack inventory system under the Stackform agency for our client, a salon business located in Tarlac, utilizing React, Node.js, Express, Prisma, and PostgreSQL (Supabase) with RBAC, audit logs, and low-stock alerts.",
      "Led the transition from manual Excel workflows to a centralized, agency-built solution, capturing 500,000+ PHP in monthly transactions and eliminating salon stock discrepancies.",
      "Delivered custom inventory analytics modules to trace consumption trends, empowering the business owner with data-driven purchasing models to reduce overstock.",
    ],
    images: ["/salon-inventory.png"],
  },
  {
    id: "flood",
    filename: "flood-pipeline/",
    title: "Flood Control Data Analysis Pipeline",
    technologies: ["JavaScript", "Node.js"],
    bullets: [
      "Engineered high-throughput JavaScript data pipeline parsing, cleaning, and validating raw DPWH flood control datasets containing 10,000+ records across multi-year intervals.",
      "Implemented multi-level aggregation algorithms and statistical models computing derived metrics, transforming unstructured CSV inputs into regional infrastructure financial reports.",
      "Optimized data processing layers maintaining structural integrity and minimizing memory overhead during heavy validation and filtering workflows.",
    ],
    images: ["/pipeline.png"],
  },
];
