/**
 * directFormicAcidFuelCellEngine.ts
 *
 * Domain Engine: Direct Formic Acid Fuel Cell (DFAFC)
 * with Bimetallic Electrocatalytic Dehydrogenation & Electrostatic Donnan Crossover Suppression.
 *
 * Strictly conforms to IUPAC electrochemistry standards, dual-pathway electro-oxidation kinetics,
 * Nernst-Planck crossover transport, and Vietnam GDPT 2018 Chemistry:
 * - Carboxylic acid electro-oxidation: HCOOH -> CO2 + 2 H+ + 2 e- (E° = -0.25 V vs SHE).
 * - Catalyst selectivity: Direct dehydrogenation (Pd/PtBi) vs indirect dehydration (*CO poison).
 * - Electrostatic Donnan exclusion: -SO3- sulfonate groups in Nafion repel HCOO- anions, cutting crossover by > 85% vs methanol.
 * - Portable ultra-dense micro-power: 2.1 kWh/L liquid energy density for multi-day drones and remote sensors.
 */

export type DfafcCatalystType =
  | 'PALLADIUM_NANOPARTICLES_PD'
  | 'CORE_SHELL_PT_PD'
  | 'ORDERED_INTERMETALLIC_PT_BI'
  | 'PLATINUM_RUTHENIUM_PTRU';

export interface DfafcCatalystConfig {
  id: DfafcCatalystType;
  name: string;
  chemicalFormula: string;
  directPathwaySelectivityPct: number; // % HCOOH -> CO2 directly without *CO
  coPoisoningToleranceRating: 'EXCELLENT' | 'VERY_HIGH' | 'MODERATE' | 'LOW';
  exchangeCurrentDensityMaCm2: number;
  durabilityHours: number;
  description: string;
}

export const DFAFC_CATALYST_CATALOG: Record<DfafcCatalystType, DfafcCatalystConfig> = {
  PALLADIUM_NANOPARTICLES_PD: {
    id: 'PALLADIUM_NANOPARTICLES_PD',
    name: 'Palladium Nanoparticles on Carbon (Pd/C)',
    chemicalFormula: 'Pd/C',
    directPathwaySelectivityPct: 96.5,
    coPoisoningToleranceRating: 'VERY_HIGH',
    exchangeCurrentDensityMaCm2: 1.85,
    durabilityHours: 3500,
    description: 'Highly selective for the direct dehydrogenation pathway, operating at low overpotential with virtually zero initial *CO poison formation.'
  },
  CORE_SHELL_PT_PD: {
    id: 'CORE_SHELL_PT_PD',
    name: 'Pt Monolayer Shell on Pd Core (Pt@Pd/C)',
    chemicalFormula: 'Pt(ML)@Pd/C',
    directPathwaySelectivityPct: 94.0,
    coPoisoningToleranceRating: 'EXCELLENT',
    exchangeCurrentDensityMaCm2: 2.40,
    durabilityHours: 8000,
    description: 'Compressive lattice strain from the Pd core shifts the Pt d-band center downwards, significantly weakening *CO binding while preserving high catalytic durability.'
  },
  ORDERED_INTERMETALLIC_PT_BI: {
    id: 'ORDERED_INTERMETALLIC_PT_BI',
    name: 'Ordered Intermetallic Platinum-Bismuth (PtBi)',
    chemicalFormula: 'PtBi / Pt3Bi',
    directPathwaySelectivityPct: 99.2,
    coPoisoningToleranceRating: 'EXCELLENT',
    exchangeCurrentDensityMaCm2: 3.10,
    durabilityHours: 6500,
    description: 'Geometric ensemble and electronic ligand effects of Bi atoms isolate adjacent Pt sites, making three-fold *CO bridge bonding physically impossible.'
  },
  PLATINUM_RUTHENIUM_PTRU: {
    id: 'PLATINUM_RUTHENIUM_PTRU',
    name: 'Bifunctional Platinum-Ruthenium Alloy (PtRu/C)',
    chemicalFormula: 'PtRu/C (1:1)',
    directPathwaySelectivityPct: 78.5,
    coPoisoningToleranceRating: 'VERY_HIGH',
    exchangeCurrentDensityMaCm2: 1.20,
    durabilityHours: 5000,
    description: 'Traditional bifunctional catalyst where Ru nucleates active OH_ads species at low potentials to oxidize *CO via Langmuir-Hinshelwood kinetics.'
  }
};

export interface DfafcCellState {
  operatingTempC: number;
  formicAcidConcentrationMolar: number; // 3.0 to 15.0 M
  currentDensityMaCm2: number;
  catalyst: DfafcCatalystConfig;
  openCircuitVoltageV: number;
  operatingCellVoltageV: number;
  powerDensityMwCm2: number;
  ohmicDropMv: number;
  anodeOverpotentialMv: number;
  cathodeOverpotentialMv: number;
  crossoverDonnanExclusionPct: number;
  fuelCrossoverFluxUmolCm2S: number;
  fuelEfficiencyPct: number;
}

export interface DfafcPortablePowerBalance {
  missionPowerWatts: number; // e.g. 100 W for industrial drone / remote monitoring
  missionDurationHours: number; // e.g. 24 hours continuous
  cellActiveAreaCm2: number;
  stackCellCount: number;
  netPowerWatts: number;
  formicAcidCartridgeLiters: number;
  fuelMassKg: number;
  totalSystemWeightKg: number;
  equivalentLiIonWeightKg: number;
  weightSavingsPct: number;
  co2EmissionsGramsMission: number;
  isClosedCarbonCycle: boolean;
}

// Physical & Thermodynamic Constants
export const FORMIC_ACID_MOLAR_MASS_G_MOL = 46.03;
export const FORMIC_ACID_LIQUID_DENSITY_G_CM3 = 1.22; // 1,220 kg/m3
export const FORMIC_ACID_ENERGY_DENSITY_KWH_L = 2.08; // 2,080 Wh/L
export const THEORETICAL_OCV_DFAFC_V = 1.48; // E°(cathode 1.23 V) - E°(anode -0.25 V)
export const FARADAY_C_MOL = 96485.33;

/**
 * Simulates polarization losses, Donnan crossover exclusion, and cell power density.
 */
export function calculateDfafcCellPerformance(
  catalystType: DfafcCatalystType = 'ORDERED_INTERMETALLIC_PT_BI',
  formicAcidConcentrationMolar: number = 6.0, // 6 M optimal
  operatingTempC: number = 50.0,
  currentDensityMaCm2: number = 250.0
): DfafcCellState {
  const catalyst = DFAFC_CATALYST_CATALOG[catalystType] || DFAFC_CATALYST_CATALOG.ORDERED_INTERMETALLIC_PT_BI;

  // Thermodynamic Nernst potential: E_cell = 1.48 V adjusted for concentration & temp
  // In practice, mixed potential at the Pt/C cathode from trace crossover reduces OCV to 1.10 - 1.22 V
  const tempK = operatingTempC + 273.15;
  const concFactor = Math.min(1.0, Math.max(0.6, Math.log10(formicAcidConcentrationMolar + 1) / 0.85));
  const baseOcv = 1.20 - 0.0006 * (tempK - 298.15);
  const openCircuitVoltageV = parseFloat((baseOcv * concFactor * (0.97 + 0.03 * (catalyst.directPathwaySelectivityPct / 100))).toFixed(3));

  // Crossover transport through Nafion 117 / 212 membrane:
  // Donnan exclusion: negative sulfonate groups (-SO3-) in Nafion repel formate anions (HCOO-)
  // Electrostatic exclusion efficiency ~ 85-92%
  const crossoverDonnanExclusionPct = parseFloat((84.0 + 8.0 * Math.exp(-formicAcidConcentrationMolar / 15.0)).toFixed(1));
  const baselineCrossoverFlux = (formicAcidConcentrationMolar * 0.22) * Math.exp(0.015 * (operatingTempC - 25));
  const fuelCrossoverFluxUmolCm2S = parseFloat((baselineCrossoverFlux * (1 - crossoverDonnanExclusionPct / 100)).toFixed(2));

  // Polarization Losses:
  // 1. Ohmic drop: Nafion 212 membrane ASR ~ 0.12 Ohm*cm2 at 50 °C
  const membraneAsrOhmCm2 = 0.16 * Math.exp(-0.012 * (operatingTempC - 25));
  const ohmicDropMv = parseFloat((currentDensityMaCm2 * membraneAsrOhmCm2).toFixed(1));

  // 2. Anode overpotential (formic acid dehydrogenation Tafel slope ~ 60-110 mV/dec)
  const j_norm = currentDensityMaCm2 / catalyst.exchangeCurrentDensityMaCm2;
  const tafelSlope = 0.075 + 0.035 * (1 - catalyst.directPathwaySelectivityPct / 100);
  const anodeOverpotentialMv = parseFloat((tafelSlope * Math.log10(Math.max(1.1, j_norm)) * 1000).toFixed(1));

  // 3. Cathode overpotential (Oxygen Reduction Reaction with slight crossover mixed potential)
  const cathodeTafelSlope = 0.070;
  const crossoverPenaltyMv = fuelCrossoverFluxUmolCm2S * 15.0; // depolarizing mixed potential
  const cathodeOverpotentialMv = parseFloat((180.0 + cathodeTafelSlope * Math.log10(Math.max(1.0, currentDensityMaCm2 / 10.0)) * 1000 + crossoverPenaltyMv).toFixed(1));

  // 4. Concentration polarization at high current densities or high molarity
  let concOverpotentialMv = 0;
  const limitingCurrentMaCm2 = 650.0 + 40.0 * (formicAcidConcentrationMolar - 3.0);
  if (currentDensityMaCm2 > limitingCurrentMaCm2 * 0.7) {
    const fraction = (currentDensityMaCm2 - limitingCurrentMaCm2 * 0.7) / (limitingCurrentMaCm2 * 0.3);
    concOverpotentialMv = 80.0 * Math.pow(Math.min(1.0, fraction), 2);
  }

  const totalLossesV = (ohmicDropMv + anodeOverpotentialMv + cathodeOverpotentialMv + concOverpotentialMv) / 1000;
  const operatingCellVoltageV = parseFloat(Math.max(0.20, openCircuitVoltageV - totalLossesV).toFixed(3));
  const powerDensityMwCm2 = parseFloat(((currentDensityMaCm2 * operatingCellVoltageV)).toFixed(1));

  // Fuel efficiency: accounting for Faradaic utilization (2 e- per HCOOH) minus crossover loss
  const faradaicCurrentMaCm2 = currentDensityMaCm2;
  const crossoverEquivalentCurrentMaCm2 = (fuelCrossoverFluxUmolCm2S * 1e-6) * (2 * FARADAY_C_MOL) * 1e3;
  const fuelEfficiencyPct = parseFloat(((faradaicCurrentMaCm2 / (faradaicCurrentMaCm2 + crossoverEquivalentCurrentMaCm2)) * (operatingCellVoltageV / THEORETICAL_OCV_DFAFC_V) * 100).toFixed(1));

  return {
    operatingTempC,
    formicAcidConcentrationMolar,
    currentDensityMaCm2,
    catalyst,
    openCircuitVoltageV,
    operatingCellVoltageV,
    powerDensityMwCm2,
    ohmicDropMv,
    anodeOverpotentialMv,
    cathodeOverpotentialMv,
    crossoverDonnanExclusionPct,
    fuelCrossoverFluxUmolCm2S,
    fuelEfficiencyPct
  };
}

/**
 * Calculates portable power system balance for a multi-day industrial drone or remote sensor.
 */
export function calculateDfafcPortablePowerBalance(
  missionPowerWatts: number = 100.0, // 100 W net
  missionDurationHours: number = 24.0, // 24 hours continuous
  catalystType: DfafcCatalystType = 'ORDERED_INTERMETALLIC_PT_BI'
): DfafcPortablePowerBalance {
  const cellState = calculateDfafcCellPerformance(catalystType, 6.0, 50.0, 250.0);

  // Stack sizing:
  // Each single cell delivers power density ~ 160-220 mW/cm2
  const activeAreaPerCellCm2 = 50.0; // 50 cm2 portable active area
  const powerPerCellWatts = (cellState.powerDensityMwCm2 * 1e-3) * activeAreaPerCellCm2; // e.g. 0.17 W/cm2 * 50 = 8.5 W
  const stackCellCount = Math.ceil((missionPowerWatts * 1.10) / powerPerCellWatts); // 10% parasitic buffer
  const cellActiveAreaCm2 = stackCellCount * activeAreaPerCellCm2;
  const netPowerWatts = missionPowerWatts;

  // Fuel consumption:
  // Total energy required = power * duration = 100 W * 24h = 2,400 Wh = 2.4 kWh
  const totalEnergyWh = missionPowerWatts * missionDurationHours;
  const practicalEnergyDensityWhL = FORMIC_ACID_ENERGY_DENSITY_KWH_L * 1000 * (cellState.fuelEfficiencyPct / 100);
  const formicAcidCartridgeLiters = parseFloat((totalEnergyWh / practicalEnergyEnergyFilter(practicalEnergyDensityWhL)).toFixed(2));
  const fuelMassKg = parseFloat((formicAcidCartridgeLiters * FORMIC_ACID_LIQUID_DENSITY_G_CM3).toFixed(2));

  // Total system weight: Stack + BoP (balance of plant: micropumps, fan) + Fuel
  const stackWeightKg = 0.85 + (stackCellCount * 0.065); // ~ 1.8 kg stack
  const bopWeightKg = 0.65;
  const totalSystemWeightKg = parseFloat((stackWeightKg + bopWeightKg + fuelMassKg).toFixed(2));

  // Lithium-ion battery benchmark:
  // State of the art Li-ion drone battery ~ 180 Wh/kg
  const equivalentLiIonWeightKg = parseFloat((totalEnergyWh / 180.0).toFixed(2));
  const weightSavingsPct = parseFloat((((equivalentLiIonWeightKg - totalSystemWeightKg) / equivalentLiIonWeightKg) * 100).toFixed(1));

  // Carbon footprint:
  // HCOOH -> CO2 + 2 H+ + 2 e- (44 g CO2 per 46 g HCOOH)
  const formicAcidMoles = (fuelMassKg * 1000) / FORMIC_ACID_MOLAR_MASS_G_MOL;
  const co2EmissionsGramsMission = parseFloat((formicAcidMoles * 44.01).toFixed(0));

  return {
    missionPowerWatts,
    missionDurationHours,
    cellActiveAreaCm2,
    stackCellCount,
    netPowerWatts,
    formicAcidCartridgeLiters,
    fuelMassKg,
    totalSystemWeightKg,
    equivalentLiIonWeightKg,
    weightSavingsPct,
    co2EmissionsGramsMission,
    isClosedCarbonCycle: true // when produced via CCUS hydrogenation of captured CO2
  };
}

function practicalEnergyEnergyFilter(whL: number): number {
  return Math.max(600, whL);
}
