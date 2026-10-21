import type { NextConfig } from "next";
import { BASE_PATH } from "./src/lib/asset";

const nextConfig: NextConfig = {
  // Tout se joue dans le navigateur : on publie un site statique (dossier out/)
  output: "export",
  // Le jeu est servi par le portfolio, à l'adresse garancewetz.netlify.app/journey
  basePath: BASE_PATH,
  outputFileTracingRoot: process.cwd(),
};

export default nextConfig;
