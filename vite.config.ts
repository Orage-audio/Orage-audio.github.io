import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

// base: './' ensures GitHub Pages works on both root domain (orageaudio.github.io)
// and project subpath (orageaudio.github.io/evolver) or custom domain.
export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss()],
});
