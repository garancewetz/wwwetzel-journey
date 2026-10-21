import type { Metadata, Viewport } from "next";
import { Pixelify_Sans } from "next/font/google";
import "./globals.css";
import PathsSprite from "@/components/PathsSprite";
import { asset } from "@/lib/asset";

// Une police pixel, lisible et avec les accents, pour rester dans l'esprit Game Boy
const pixel = Pixelify_Sans({
  variable: "--font-pixel",
  subsets: ["latin", "latin-ext"],
});

const description = "Un petit jeu en pixel art, en hommage aux Pokémon de la Game Boy Color : on marche dans le noir et on découvre en chemin le parcours de Garance Wetzel.";

export const metadata: Metadata = {
  // L'adresse publique : le portfolio, qui sert le jeu sous /journey
  metadataBase: new URL("https://garancewetz.netlify.app"),
  title: "wwwetzel journey",
  description,
  // L'aperçu quand on partage le lien : une vraie scène du jeu
  openGraph: {
    title: "wwwetzel journey",
    description,
    images: [{ url: asset("/og.png"), width: 1200, height: 630, alt: "L'héroïne en pixel art devant une maison, Salamèche à ses côtés, dans un rond de lumière sur fond noir." }],
    locale: "fr_FR",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
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
