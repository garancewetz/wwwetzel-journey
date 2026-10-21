import type { Metadata, Viewport } from "next";
import { Pixelify_Sans } from "next/font/google";
import "./globals.css";
import PathsSprite from "@/components/PathsSprite";

// Une police pixel, lisible et avec les accents, pour rester dans l'esprit Game Boy
const pixel = Pixelify_Sans({
  variable: "--font-pixel",
  subsets: ["latin", "latin-ext"],
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
    <html lang="fr" className={pixel.variable}>
      <body>
        <PathsSprite />
        {children}
      </body>
    </html>
  );
}
