import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Tout se joue dans le navigateur : on publie un site statique (dossier out/)
  output: "export",
  outputFileTracingRoot: process.cwd(),
};

export default nextConfig;
