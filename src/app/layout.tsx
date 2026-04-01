import type { Metadata } from "next";
import { Playfair_Display, Lato } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-vdh-serif",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const lato = Lato({
  variable: "--font-vdh-sans",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "700"],
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
    <html lang={lang} className={`${playfair.variable} ${lato.variable}`}>
      <body className="min-h-screen flex flex-col bg-off-white text-text antialiased">
        {children}
      </body>
    </html>
  );
}
