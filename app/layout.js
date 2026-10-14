import { Inter } from "next/font/google";
import "./globals.css";
import SiteChrome from "@/components/SiteChrome";
import { SITE_URL } from "@/lib/site";
import { getFredRates } from "@/lib/fredRates";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata = {
  metadataBase: new URL(SITE_URL),
  title: "GeniusMoneyDaily.com | High-Authority Financial Magazine & Daily Insights",
  description: "Smart, data-backed financial insights delivered daily. Expert analysis on loans, credit score hacks, high-yield savings, real estate trends, and tax planning.",
  keywords: ["financial magazine", "loans", "credit score", "high yield savings", "real estate mortgages", "tax strategy", "GeniusMoneyDaily"],
  authors: [{ name: "GeniusMoneyDaily Editorial Team" }],
  icons: {
    icon: "/icon.svg",
  },
  openGraph: {
    title: "GeniusMoneyDaily.com | Smart Financial Insights, Delivered Daily",
    description: "Data-backed mortgage strategies, high-yield rate updates, tax optimization, and credit hacks.",
    url: SITE_URL,
    siteName: "GeniusMoneyDaily",
    locale: "en_US",
    type: "website",
  },
};

export default async function RootLayout({ children }) {
  // ISR-style revalidate (not no-store): keeps every other page on the
  // site statically generatable instead of forcing full dynamic rendering
  // site-wide, while still refreshing this shared Data Cache entry at most
  // hourly. This is what makes the ticker's live values show up in the
  // initial server-rendered HTML — what crawlers, link previews, and
  // slow/no-JS connections actually see — instead of only after hydration.
  const rates = await getFredRates({ next: { revalidate: 3600 } });

  return (
    <html lang="en" className={`${inter.variable}`}>
      <body className="flex flex-col min-h-screen">
        <SiteChrome rates={rates}>{children}</SiteChrome>
      </body>
    </html>
  );
}
