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
            const energyKeywords = [
              'AlkalineMembrane', 'AllIronFlow', 'AluminumAir', 'AmmoniaWaterAbsorption', 'AnionExchange', 'BioConcrete', 'CuCl', 'DeepSea', 'DirectAir', 'DirectEthanol', 'DirectFormicAcid', 'DirectFormicAcidSolidOxide', 'DirectLithium', 'ElectrochemicalCorr', 'ElectrostaticSupercapacitor', 'ForwardOsmosis', 'Geothermal',
              'IodineSulfur', 'IronAir', 'IronSlurry', 'LiquidAir', 'LiquidMetal', 'LithiumCarbonDioxide', 'LithiumCo2', 'LithiumMediated', 'Magnetocaloric', 'ManganeseHydrogen', 'MembraneMethane', 'MetalAir', 'MetalHydride',
              'MicrobialElectrosynthesis', 'MicrobialFuelCell', 'MicrochannelFischerTropsch',
              'MoltenMetal', 'MoltenSalt', 'OceanThermal', 'OsmoticallyDrivenHeatEngine', 'PerovskiteSolar', 'Photocatalytic',
              'Photoelectrochemical', 'PotassiumDualIon', 'ProtonSolidOxide', 'RedoxFlow', 'SalinityGradient', 'SmesCryogenic',
              'SodiumIon', 'SodiumSulfur', 'Sofc', 'SolidOxide', 'SupercriticalCo2', 'SupercriticalWater', 'ThermallyRegenerative', 'Thermoelectric', 'ThermoGalvanic', 'Thermophotovoltaic', 'Tokamak',
              'VanadiumFlow', 'ZincBromine'
            ];
            if (energyKeywords.some(keyword => id.includes(keyword))) {
              return 'chemistry-visualizers-energy';
            }
            const advancedKeywords = [
              'Af4', 'Afm', 'Auc', 'Battery', 'Bli', 'Capillary', 'Circular', 'Crispr', 'Cryo', 'Dma',
              'Dsc', 'DualPolarization', 'DynamicLight', 'ElectronMicroscopy', 'Enzyme', 'Esi',
              'Fcs', 'Femtosecond', 'Flim', 'FuelCell', 'Itc', 'Magnetic', 'Mossbauer', 'Mst',
              'Nmr', 'Nta', 'Optical', 'Ozone', 'Pcr', 'Pet', 'Ppc', 'Qcmd', 'Quantum', 'Rmm',
              'Saxs', 'SecMals', 'Sfc', 'Sims', 'SmFret', 'SolidState', 'Stm', 'StoppedFlow',
              'Superconductivity', 'SurfacePlasmon', 'Tda', 'ThermalAnalysis', 'ThermalShift', 'Xafs', 'Xps'
            ];
            if (advancedKeywords.some(keyword => id.includes(keyword))) {
              return 'chemistry-visualizers-advanced';
            }
            return 'chemistry-visualizers-curriculum';
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
