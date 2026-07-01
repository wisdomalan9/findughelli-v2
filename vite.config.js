import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

export default defineConfig({
  plugins: [react()],

  build: {
    chunkSizeWarningLimit: 1000,

    rollupOptions: {
      output: {
        manualChunks(id) {

          if (id.includes("firebase")) {
            return "firebase"
          }

          if (id.includes("react-icons")) {
            return "icons"
          }

          if (
            id.includes("framer-motion")
          ) {
            return "motion"
          }

          if (
            id.includes("react") ||
            id.includes("react-router")
          ) {
            return "react-vendor"
          }

        },
      },
    },
  },
})
