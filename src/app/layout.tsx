import type { Metadata } from "next";
import { Inter, Krub } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";

const inter = Inter({
  variable: "--font-vdh-sans",
  subsets: ["latin"],
  display: "swap",
});

const krub = Krub({
  variable: "--font-vdh-serif",
  subsets: ["latin"],
  display: "swap",
  weight: ["200", "300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "VDH Enterprises — Property Advisory in Spain",
    template: "%s | VDH Enterprises",
  },
  description:
    "Independent property advisory for international buyers in Spain. Based in Barcelona since 1995.",
  metadataBase: new URL("https://vdhenterprises.com"),
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const hdrs = await headers();
  const lang = hdrs.get('x-vdh-locale') ?? 'en';

  return (
    <html lang={lang} className={`${inter.variable} ${krub.variable}`}>
      <body className="min-h-screen flex flex-col bg-off-white text-text antialiased">
        {children}
      </body>
    </html>
  );
}
