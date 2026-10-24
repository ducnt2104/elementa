import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: './',
  plugins: [react()],
  server: {
    port: 3000,
    open: false
  },
  build: {
    chunkSizeWarningLimit: 3000,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
            return 'vendor-react';
          }
          if (id.includes('node_modules/lucide-react')) {
            return 'vendor-icons';
          }
          if (id.includes('node_modules/firebase') || id.includes('node_modules/@firebase')) {
            return 'vendor-firebase';
          }
          if (
            id.includes('src/data/reactionsData') ||
            id.includes('src/data/elementsData') ||
            id.includes('src/data/substancesData') ||
            id.includes('src/data/curriculumDiagnosticData')
          ) {
            return 'chemistry-reference-data';
          }
          if (id.includes('batch_') || id.includes('cards/batches') || id.includes('src/data/cards/')) {
            if (id.includes('monsters')) {
              return 'cards-monsters';
            }
            if (id.includes('spells')) {
              return 'cards-spells';
            }
            if (id.includes('traps')) {
              return 'cards-traps';
            }
            if (id.includes('extra_deck')) {
              return 'cards-extra-deck';
            }
            return 'cards-expansion-data';
          }
          if (id.includes('src/components/visualizations/')) {
            return 'chemistry-visualizers';
          }
          if (id.includes('src/components/moba/')) {
            return 'moba-arena';
          }
          if (id.includes('src/components/duel/')) {
            return 'duel-arena';
          }
        }
      }
    }
  }
});
