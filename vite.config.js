import { defineConfig } from 'vite';

export default defineConfig({
  base: "/resonance",

  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        "tech-specs": 'tech-specs.html',
        compare: 'compare.html',
      },
    },
  },
});