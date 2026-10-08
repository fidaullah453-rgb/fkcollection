import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import SaleBar from "./components/SaleBar";
import { SITE } from "./lib/site";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const TITLE = "FK Collection | Premium Watches in Pakistan - Cash on Delivery";
const DESC = "Buy premium watches, rings and bracelets online in Pakistan. Gift box included, 7 days return, free delivery above Rs. 5000 and cash on delivery.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: { default: TITLE, template: "%s | FK Collection" },
  description: DESC,
  keywords: ["watches Pakistan", "buy watches online Pakistan", "men watches", "watch with ring and bracelet", "cash on delivery watches", "FK Collection"],
  alternates: { canonical: "/" },
  openGraph: { type: "website", siteName: "FK Collection", locale: "en_PK", title: TITLE, description: DESC, images: ["/watch1.jpg"] },
  robots: { index: true, follow: true },
};

const orgLd = {
  "@context": "https://schema.org",
  "@type": "Store",
  name: "FK Collection",
  url: SITE,
  telephone: "+923099956578",
  areaServed: "PK",
  paymentAccepted: "Cash on delivery, Easypaisa, JazzCash",
  address: { "@type": "PostalAddress", addressLocality: "Swat", addressCountry: "PK" },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgLd) }} />
        <SaleBar />
        {children}
      </body>
    </html>
  );
}
