"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/Header";
import NewsletterGate from "@/components/NewsletterGate";
import Footer from "@/components/Footer";

// /links is a standalone bio-link landing page (Instagram/TikTok bio link)
// and must render with zero site chrome. Next.js has a single root layout
// (app/layout.js), and a route group's own layout can't opt a page out of
// an ancestor layout — only a second, fully independent root layout can,
// which would require moving every existing route into its own route
// group. This pathname check gets the same visual result (no header, no
// newsletter popup, no footer, everywhere else unaffected) without that
// large a restructure.
const NO_CHROME_PATHS = ["/links"];

export default function SiteChrome({ children }) {
  const pathname = usePathname();
  const hideChrome = NO_CHROME_PATHS.some((path) => pathname === path || pathname.startsWith(`${path}/`));

  if (hideChrome) {
    return <main className="flex-grow">{children}</main>;
  }

  return (
    <>
      <Header />
      <main className="flex-grow">{children}</main>
      <NewsletterGate />
      <Footer />
    </>
  );
}
