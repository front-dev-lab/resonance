import { defineConfig } from 'vite';

export default defineConfig({
  base: "/resonance",

  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        "tech-specs": resolve(__dirname, 'tech-specs.html'),
        compare: resolve(__dirname, 'compare.html'),
      },
    },
  },
});