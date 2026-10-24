import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    open: false
  },
  build: {
    chunkSizeWarningLimit: 1200,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules/react') || id.includes('node_modules/react-dom')) {
            return 'vendor-react';
          }
          if (id.includes('node_modules/lucide-react')) {
            return 'vendor-icons';
          }
          if (
            id.includes('src/data/reactionsData') ||
            id.includes('src/data/elementsData') ||
            id.includes('src/data/playableCardsData') ||
            id.includes('src/data/extraDeckCardsData') ||
            id.includes('src/data/diagnosticQuestionsData')
          ) {
            return 'chemistry-compendium-data';
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
