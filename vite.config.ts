import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    tailwindcss(),
    react(),
  ],
  build: {
    chunkSizeWarningLimit: 2100,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react': ['react', 'react-dom'],
          'vendor-three': ['three', '@react-three/fiber', '@react-three/drei', '@react-three/postprocessing'],
          'vendor-animation': ['gsap', 'lenis', 'framer-motion', 'motion'],
          'vendor-particles': ['@tsparticles/react', '@tsparticles/engine', '@tsparticles/slim'],
          'vendor-shaders': ['@paper-design/shaders-react'],
        },
      },
    },
  },
})
