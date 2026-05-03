import { defineConfig } from "vite"
import { devtools } from "@tanstack/devtools-vite"
import { tanstackRouter } from "@tanstack/router-plugin/vite"
import viteReact from "@vitejs/plugin-react"
import tailwindcss from "@tailwindcss/vite"
import { visualizer } from "rollup-plugin-visualizer"

export default defineConfig({
  resolve: {
    tsconfigPaths: true,
  },
  plugins: [
    devtools(),
    tanstackRouter({ autoCodeSplitting: true }),
    tailwindcss(),
    viteReact(),
    visualizer({
      open: false,
      filename: "dist/stats.json",
      template: "raw-data",
      gzipSize: true,
      brotliSize: true,
    }),
  ],
  build: {
    rolldownOptions: {
      output: {
        manualChunks(id) {
          if (
            id.includes("node_modules/react") ||
            id.includes("node_modules/scheduler")
          ) {
            return "react-vendor"
          }
          if (
            id.includes("node_modules/@tanstack/react-router") ||
            id.includes("node_modules/@tanstack/router-core") ||
            id.includes("node_modules/@tanstack/history")
          ) {
            return "router-vendor"
          }
          if (id.includes("node_modules/@base-ui/react")) {
            return "base-ui-vendor"
          }
          if (id.includes("node_modules/@floating-ui")) {
            return "floating-ui-vendor"
          }
          if (id.includes("node_modules/nuqs")) {
            return "nuqs-vendor"
          }
          if (id.includes("node_modules/@tabler/icons-react")) {
            return "tabler-vendor"
          }
        },
      },
    },
  },
})
