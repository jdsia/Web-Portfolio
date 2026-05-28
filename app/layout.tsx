import type { Metadata } from "next";
import { Newsreader, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const newsreader = Newsreader({
  variable: "--font-newsreader",
  subsets: ["latin"],
  style: ["normal", "italic"],
  weight: ["300", "400"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "600", "800"],
});

export const metadata: Metadata = {
  title: "Ethan Sia | Software Engineer & Full-Stack Developer",
  description: "Portfolio of Ethan Sia, a full-stack software engineer and co-founder of Stackform specializing in React, TypeScript, Node.js, and custom developer tools.",
  keywords: [
    "Ethan Sia",
    "Ethan Sia Portfolio",
    "Ethan Sia Software Engineer",
    "Stackform",
    "Stackform Agency",
    "Full-Stack Developer",
    "Tarlac Software Engineer",
    "React Native Expo",
    "Next.js Developer"
  ],
  authors: [{ name: "Ethan Sia" }],
  openGraph: {
    title: "Ethan Sia | Software Engineer & Full-Stack Developer",
    description: "Portfolio of Ethan Sia, a full-stack software engineer and co-founder of Stackform specializing in React, TypeScript, Node.js, and custom developer tools.",
    url: "https://jdsia.vercel.app",
    siteName: "Ethan Sia Portfolio",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ethan Sia | Software Engineer & Full-Stack Developer",
    description: "Portfolio of Ethan Sia, a full-stack software engineer and co-founder of Stackform.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${newsreader.variable} ${inter.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
