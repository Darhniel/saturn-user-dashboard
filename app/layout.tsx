import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const fontss = localFont({
  src: [
    {
      path: "../public/fonts/Thin.otf",
      weight: "100",
      style: "normal",
    },
    {
      path: "../public/fonts/ExtraLight.otf",
      weight: "200",
      style: "normal",
    },
    {
      path: "../public/fonts/Glancyr-Light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "../public/fonts/Glancyr-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/Glancyr-Medium.otf",
      weight: "500",
      style: "normal",
    },

    {
      path: "../public/fonts/SemiBold.otf",
      weight: "600",
      style: "normal",
    },

    {
      path: "../public/fonts/Bold.otf",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-geist-sans",
});

export const metadata: Metadata = {
  title: "Syarpa",
  description: "AI-Powered Asset Strategies for the Digital Economy",
  keywords: [
    "AI trading",
    "cryptocurrency trading",
    "digital asset management",
    "AI investment strategies",
    "automated trading",
    "crypto portfolio management",
    "blockchain investment",
    "digital economy",
    "asset optimization",
    "AI financial analysis",
    "algorithmic trading",
    "crypto market analysis",
    "digital wealth management",
    "smart portfolio allocation",
    "cryptocurrency investment",
    "AI market prediction",
    "digital asset strategies",
    "automated portfolio management",
    "blockchain technology",
    "crypto trading signals",
    "AI risk management",
    "digital investment platform",
    "cryptocurrency analytics",
    "asset diversification",
    "blockchain trading",
    "AI-powered investing",
    "digital asset trading",
    "crypto market intelligence",
    "automated investment solutions",
    "blockchain asset management",
  ],
  authors: [{ name: "Syarpa" }],
  openGraph: {
    title: "Syarpa",
    description: "AI-Powered Asset Strategies for the Digital Economy",
    type: "website",
    locale: "en_US",
    siteName: "Syarpa",
    url: "https://new-syarpa-website.vercel.app",
    images: [
      {
        url: "https://new-syarpa-website.vercel.app/images/thumbnail.png",
        width: 1200,
        height: 630,
        alt: "Syarpa",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Syarpa",
    description: "AI-Powered Asset Strategies for the Digital Economy",
    creator: "@Syarpa",
    images: ["https://new-syarpa-website.vercel.app/images/thumbnail.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/icon.png",
    apple: "/icon.png",
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${fontss.className} bg-[#FDFBFF] text-black antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
