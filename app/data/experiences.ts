export interface Experience {
  id: string;
  filename: string;
  role: string;
  period: string;
  subtitles: string[];
  description: string;
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
    tags: ["Next.js", "React", "TypeScript", "Supabase", "APIs", "Real-time Alerts"],
    description: "Joined as a software engineer to work on product features for a client in the construction sector. Developed the analytics and notifications system, as well as stoppage tracking in the map modal, working closely with the a small team to surface the right insights."
  },
  {
    id: "stackform",
    filename: "stackform.md",
    role: "Stackform — Co-Founder & Lead Engineer",
    period: "April 2026 – Present",
    subtitles: [
      "a web agency focused on providing client-first solutions",
      "Remote"
    ],
    tags: ["Node.js", "Express", "Prisma", "PostgreSQL", "Supabase", "React (Vite)", "Tailwind CSS"],
    description: "Built and shipped the agency's first client project end-to-end, taking responsibility for both frontend and backend across the full development cycle. Worked with co-founder to architect a production-ready solution that replaced a fragile manual process and handled real business volume"
  },
  {
    id: "gdgoc",
    filename: "gdgoc-dlsu.md",
    role: "Google Developer Groups on Campus — Relations Executive",
    period: "Oct. 2025 – Present",
    subtitles: [
      "DLSU Manila, Philippines"
    ],
    tags: ["Partnerships", "Sponsorships", "Outreach", "Community Relations"],
    description: "Managed external partnerships and sponsorships with technical communities and student organizations, leading outreach initiatives to drive event collaborations and partnership opportunities."
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
    description: "Coordinated logistics, scheduling, and attendance workflows for training sessions and social activities serving 200+ members, establishing internal records to streamline planning and committee communication.",
    extraSubtitles: [
      "+competing athlete"
    ]
  }
];
