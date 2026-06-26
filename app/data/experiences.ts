export interface Experience {
  id: string;
  filename: string;
  role: string;
  period: string;
  subtitles: string[];
  description: string;
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
    description: "Developed the interactive analytics dashboard and real-time notification system for a full-stack fleet management platform built with Next.js, React, TypeScript, and Supabase. Engineered data-aggregation APIs to visualize completed trip distances and fuel consumption trends over time, while implementing instant alerts for critical trip events to help operators monitor driver actions, optimize logistics, and reduce fuel costs."
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
    description: "Architected and shipped a full-stack inventory management system for a local salon business using Node.js, Express, Prisma, PostgreSQL (Supabase), and React (Vite) + Tailwind CSS. Replaced manual Excel processes to secure single-source-of-truth transaction visibility <strong class=\"font-bold text-[var(--foreground)]\">managing 500,000+ PHP in monthly transactions</strong>, while delivering embedded analytics to optimize purchasing and reduce overstock costs."
  },
  {
    id: "gdgoc",
    filename: "gdgoc-dlsu.md",
    role: "Google Developer Groups on Campus — Relations Executive",
    period: "Oct. 2025 – Present",
    subtitles: [
      "DLSU Manila, Philippines"
    ],
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
    description: "Coordinated logistics, scheduling, and attendance workflows for training sessions and social activities serving 200+ members, establishing internal records to streamline planning and committee communication.",
    extraSubtitles: [
      "+competing athlete"
    ]
  }
];
