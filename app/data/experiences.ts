export interface Experience {
  id: string;
  filename: string;
  role: string;
  period: string;
  subtitles: string[];
  description: string;
  bullets?: string[];
  tags?: string[];
  extraSubtitles?: string[];
}

export const EXPERIENCES: Experience[] = [
  {
    id: "innovare",
    filename: "innovare.md",
    role: "Innovare — Software Engineer",
    period: "June 2026 – Present",
    subtitles: [
      "Fleet Management & Logistics Platform",
      "Remote"
    ],
    tags: ["Next.js", "React", "TypeScript", "Supabase", "Tailwind CSS", "Leaflet", "Recharts", "APIs", "Real-time Alerts"],
    description: "Engineered full-stack features for an enterprise fleet management platform and built TripSync, a conversion-focused product landing page with a self-contained interactive demo. Delivered interactive analytics dashboards, real-time alert notifications, and stoppage tracking within live map modals to optimize route efficiency and fleet visibility.",
    bullets: [
      "Engineered full-stack features and interactive analytics dashboards for a fleet management platform using Next.js, React, TypeScript, and Supabase, visualizing trip metrics and fuel consumption trends.",
      "Implemented a real-time notification and event-triggered alerting system, enabling operators and dispatchers to monitor critical trip events and stoppage tracking instantly on interactive map modals.",
      "Designed and integrated data-aggregation APIs to streamline telemetry processing, optimize state management, and surface actionable logistics insights for enterprise clients.",
      "Architected and shipped TripSync, a standalone product landing page and zero-config interactive demo environment for the fleet platform, enabling prospective clients to test live telemetry, anomaly flagging, and dispatch workflows without backend setup."
    ]
  },
  {
    id: "stackform",
    filename: "stackform.md",
    role: "Stackform — Co-Founder & Lead Engineer",
    period: "April 2026 – Present",
    subtitles: [
      "Full-Stack Inventory & Client Solutions",
      "Remote"
    ],
    tags: ["React (Vite)", "Node.js", "Express", "Prisma", "PostgreSQL", "Supabase", "Tailwind CSS"],
    description: "Architected and shipped full-stack inventory management system for local salon business using Node.js, Express, Prisma ORM, PostgreSQL (Supabase), React (Vite) + Tailwind CSS — JWT authentication, RBAC (Admin/Staff), audit logging, automated low-stock alerting. Replaced manual Excel/paper inventory with centralized software managing 500,000+ PHP in monthly transactions, and delivered embedded analytics surfacing consumption trends to reduce overstock costs.",
    bullets: [
      "Architected and shipped full-stack inventory management system for local salon business using Node.js, Express, Prisma ORM, PostgreSQL (Supabase), React (Vite) + Tailwind CSS — JWT authentication, RBAC (Admin/Staff), audit logging, automated low-stock alerting.",
      "Replaced manual Excel/paper inventory with centralized software managing 500,000+ PHP in monthly transactions — eliminated stock discrepancies, provided employee-level transaction visibility to reduce inventory loss, providing single source of truth across transactions, deliveries, and supplier orders.",
      "Delivered embedded analytics surfacing consumption trends and underperforming stock, enabling data-informed purchasing — reducing overstock costs and preventing operational stockouts."
    ]
  },
  {
    id: "gdgoc",
    filename: "gdgoc-dlsu.md",
    role: "Google Developer Groups on Campus — Relations Executive",
    period: "Oct. 2025 – Oct. 2026",
    subtitles: [
      "Industry Partnerships",
      "DLSU Manila, Philippines"
    ],
    tags: ["Partnerships", "Sponsorships", "Outreach", "Community Relations"],
    description: "Managed external partnerships with student organizations and technical communities, coordinating event collaborations and sponsorship engagements, and leading outreach communications for partnership opportunities.",
    bullets: [
      "Managed external partnerships with student organizations and technical communities, coordinating event collaborations and sponsorship engagements.",
      "Lead outreach communications to university and non-university organizations for event invitations and partnership opportunities."
    ]
  },
  {
    id: "dlsu-futsal",
    filename: "dlsu-futsal.md",
    role: "DLSU Futsal Club — Internals Committee Officer",
    period: "Oct. 2025 – Present",
    subtitles: [
      "Manila, Philippines"
    ],
    tags: ["Logistics", "Scheduling", "Workflow Coordination", "Internal Records"],
    description: "Coordinated logistics for training sessions, team-building events, and social activities serving 200+ members, and maintained internal records and communication workflows to support organizational planning.",
    bullets: [
      "Coordinate logistics for training sessions, team-building events, and social activities serving 250+ members — handling scheduling and attendance tracking.",
      "Maintain internal records and communication workflows to support organizational planning and improve information flow across the committee."
    ],
    extraSubtitles: [
      "+competing athlete"
    ]
  }
];
