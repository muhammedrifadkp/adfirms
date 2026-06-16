import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Fraunces } from "next/font/google";
import { GoogleTagManager } from "@next/third-parties/google";
import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
  weight: ["300", "400", "500", "600", "700", "800"],
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  weight: ["300", "600", "700"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Business Setup in Dubai, UAE | Ad Firms – Launch in 24 Hours",
  description: "Set up your business in Dubai from AED 4,888. Free Zone, Mainland & Offshore company formation. 100% ownership, UAE visa, bank account support. Expert advisors.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1.0,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${plusJakartaSans.variable} ${fraunces.variable}`} suppressHydrationWarning>
      <body>
        <GoogleTagManager gtmId="GTM-WSHRNQCK" />
        {children}
      </body>
    </html>
  );
}
