import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { fileURLToPath, URL } from "node:url";

export default defineConfig(({ command }) => {
  const repoName = process.env.GITHUB_REPOSITORY?.split("/")[1];
  const defaultBuildBase = repoName ? `/${repoName}/` : "/portfolio/";
  const defaultBase = command === "build" ? defaultBuildBase : "/";
  const basePath = process.env.VITE_BASE_PATH ?? defaultBase;

  return {
    base: basePath,
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
  };
});
