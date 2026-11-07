import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// Tailwind v4 runs through PostCSS (postcss.config.mjs). We force the PostCSS
// transformer because Vite 8 otherwise hands CSS to lightningcss, which inlines
// @import "tailwindcss" and strips Tailwind's @theme/@utility at-rules before
// they can be compiled. Internal imports use relative paths (no `@/` alias),
// which resolve identically in dev and build.
// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    transformer: 'postcss',
  },
})
