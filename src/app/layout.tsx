import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { BoardProvider } from "../store/BoardContext";
import PathsSprite from "../components/atoms/PathsSprite";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "wwwetzel-journey | Portfolio interactif",
  description: "Portfolio front-end interactif de Garance Etzel, développé avec Next.js et TypeScript.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <PathsSprite />
        <BoardProvider>
          {children}
        </BoardProvider>
      </body>
    </html>
  );
}
