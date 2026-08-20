import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import NewsletterGate from "@/components/NewsletterGate";
import Footer from "@/components/Footer";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata = {
  title: "GeniusMoneyDaily.com | High-Authority Financial Magazine & Daily Insights",
  description: "Smart, data-backed financial insights delivered daily. Expert analysis on loans, credit score hacks, high-yield savings, real estate trends, and tax planning.",
  keywords: ["financial magazine", "loans", "credit score", "high yield savings", "real estate mortgages", "tax strategy", "GeniusMoneyDaily"],
  authors: [{ name: "GeniusMoneyDaily Editorial Team" }],
  openGraph: {
    title: "GeniusMoneyDaily.com | Smart Financial Insights, Delivered Daily",
    description: "Data-backed mortgage strategies, high-yield rate updates, tax optimization, and credit hacks.",
    url: "https://geniusmoneydaily.com",
    siteName: "GeniusMoneyDaily",
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable}`}>
      <body className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow">{children}</main>
        <NewsletterGate />
        <Footer />
      </body>
    </html>
  );
}
