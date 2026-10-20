import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import PathsSprite from "@/components/PathsSprite";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "wwwetzel journey",
  description: "Un petit jeu en pixel art : on marche dans le noir et on découvre en chemin le parcours de Garance Wetzel.",
};

export const viewport: Viewport = {
  themeColor: "#000000",
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${geistSans.variable} antialiased`}>
        <PathsSprite />
        {children}
      </body>
    </html>
  );
}
