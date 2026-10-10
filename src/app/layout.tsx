import type { Metadata, Viewport } from "next";
import "@fontsource-variable/space-grotesk";
import "@fontsource-variable/cormorant-garamond";
import "@fontsource-variable/cormorant-garamond/wght-italic.css";
import "@fontsource/ibm-plex-mono/400.css";
import "./globals.css";
import "./beyond.css";

const title = "Muhammad Faiq Khan | AI Automation & AI Agents";
const description = "AI Automation & AI Agent specialist building intelligent business systems, voice agents, appointment automation, CRM workflows and AI-powered operations.";
export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000")),
  title, description,
  authors: [{ name: "Muhammad Faiq Khan" }],
  keywords: ["AI automation", "AI voice agents", "HVAC automation", "appointment automation", "Muhammad Faiq Khan", "CRM automation", "Islamabad"],
  openGraph: { title, description, type: "website", locale: "en_US", siteName: "FAIQ. — AI Automation & Agents" },
  twitter: { card: "summary_large_image", title, description },
  robots: { index: true, follow: true },
};
export const viewport: Viewport = { themeColor: "#030508" };

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><a href="#main" className="skip-link">Skip to content</a>{children}</body></html>;
}
