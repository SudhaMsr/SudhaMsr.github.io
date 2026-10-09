import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";
import Starfield from "@/components/Starfield";
import Spotlight from "@/components/Spotlight";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Sudha Rani Maddala · Data Scientist & AI/ML Engineer",
  description:
    "Data scientist in Bristol, UK building LLM & RAG systems, real-time computer vision and accessible, responsible AI. MSc Data Science, University of Bristol.",
  keywords: ["Sudha Rani Maddala", "Data Scientist", "AI Engineer", "Machine Learning", "LLM", "RAG", "Computer Vision", "Bristol"],
  authors: [{ name: "Sudha Rani Maddala" }],
  openGraph: {
    title: "Sudha Rani Maddala · Data Scientist & AI/ML Engineer",
    description: "LLMs & RAG, real-time computer vision, model optimisation and accessible AI.",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0a0d12" },
    { media: "(prefers-color-scheme: light)", color: "#f5f6f3" },
  ],
};

// Apply the saved theme before first paint to avoid a flash. Dark is the default.
const themeScript = `try{var t=localStorage.getItem('theme');if(t==='light')document.documentElement.dataset.theme='light'}catch(e){}`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <Starfield />
        <Spotlight />
        {children}
      </body>
    </html>
  );
}
