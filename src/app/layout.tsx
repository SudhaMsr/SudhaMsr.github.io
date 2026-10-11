import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";
import Starfield from "@/components/Starfield";
import Spotlight from "@/components/Spotlight";
import { SITE_URL } from "@/data/profile";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

const TITLE = "Sudha Rani Maddala · Applied AI/ML Engineer & Data Scientist";
const DESCRIPTION =
  "Applied AI/ML engineer and data scientist in Bristol, UK (MSc Data Science, University of Bristol). Builds and evaluates LLM-integrated tools, computer vision and data products with Python, FastAPI and React. Open to roles in the UK, the Netherlands and Germany.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  keywords: ["Sudha Rani Maddala", "Data Scientist", "Applied AI Engineer", "Machine Learning Engineer", "Data Engineer", "LLM", "Computer Vision", "FastAPI", "Bristol"],
  authors: [{ name: "Sudha Rani Maddala", url: SITE_URL }],
  alternates: { canonical: "/" },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: "/",
    siteName: "Sudha Rani Maddala",
    type: "profile",
    locale: "en_GB",
    images: [{ url: "/images/sudha.jpg", width: 800, height: 800, alt: "Sudha Rani Maddala" }],
  },
  twitter: { card: "summary", title: TITLE, description: DESCRIPTION, images: ["/images/sudha.jpg"] },
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
      lang="en-GB"
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
