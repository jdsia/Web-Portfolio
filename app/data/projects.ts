export interface Project {
  id: string;
  filename: string;
  title: string;
  technologies: string[];
  bullets: string[];
}

export const PROJECTS: Project[] = [
  {
    id: "akyat",
    filename: "akyat.md",
    title: "Akyat",
    technologies: ["React", "TypeScript", "Node.js", "Prisma", "PostgreSQL", "Tailwind CSS", "Supabase Auth", "JWT", "Express"],
    bullets: [
      "Architected full-stack bouldering logging platform with Supabase Auth, HTTP-only cookie session management, and role-scoped data isolation.",
      "Eliminated manual climb tracking via structured session logging with active-session persistence — reducing data loss during multi-hour gym sessions for highly reliable training records.",
      "Surfaced actionable training insights through an analytics dashboard with animated grade pyramids — identifying user weaknesses by hold type and wall angle to enable data-informed training decisions."
    ]
  },
  {
    id: "flood",
    filename: "flood-pipeline.md",
    title: "Flood Control Data Analysis Pipeline",
    technologies: ["JavaScript", "Node.js", "CSV Parsing", "Data Analytics"],
    bullets: [
      "Engineered high-throughput JavaScript data pipeline parsing, cleaning, and validating raw DPWH flood control datasets containing 10,000+ records across multi-year intervals.",
      "Implemented multi-level aggregation algorithms and statistical models computing derived metrics, transforming unstructured CSV inputs into regional infrastructure financial reports.",
      "Optimized data processing layers maintaining structural integrity and minimizing memory overhead during heavy validation and filtering workflows."
    ]
  }
];
