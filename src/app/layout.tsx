import type { Metadata } from "next";
import { Geist, Newsreader, Space_Mono } from "next/font/google";
import "./globals.css";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist", display: "swap" });
const serif = Newsreader({ subsets: ["latin"], style: ["normal", "italic"], variable: "--font-serif", display: "swap" });
const mono = Space_Mono({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-mono", display: "swap" });

export const metadata: Metadata = {
  title: "ATW Technologies & Forensics — AI Cybersecurity in Zimbabwe",
  description:
    "AI-driven intrusion detection and prevention, cybersecurity consulting, and digital forensics for institutions across Zimbabwe. You got it solved!",
  metadataBase: new URL("https://atwtechnologies.example"),
  openGraph: {
    title: "ATW Technologies & Forensics",
    description: "AI cybersecurity and digital forensics in Harare, Zimbabwe.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geist.variable} ${serif.variable} ${mono.variable}`}>
      <body>
        <AnnouncementBar />
        <Nav />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
