// src/domain/deepSeaBioleachingEngine.ts
// Deep-Sea Polymetallic Nodule Bioleaching & Supercritical Hydrometallurgical Refining Engine
// Conforms to: IUPAC Hydrometallurgical Standards, Shrinking Core Dissolution Kinetics, Vietnam GDPT 2018 Chemistry

export type NoduleDepositLocation =
  | 'CLARION_CLIPPERTON_ZONE_CCZ'
  | 'PERU_BASIN_ABYSSAL'
  | 'CENTRAL_INDIAN_RIDGE_SEAMOUNT'
  | 'COOK_ISLANDS_EEZ';

export type BioleachingMicrobeConsortium =
  | 'ACIDITHIOBACILLUS_CONSORTIUM'
  | 'SULPHOBACILLUS_THERMOTOLERANT'
  | 'HETERO_FUNGAL_ASPERGILLUS'
  | 'ELECTRO_ASSISTED_BIOLEACH';

export type PrecursorRefiningRoute =
  | 'DIRECT_NMC811_COPRECIPITATION'
  | 'SOLVENT_EXTRACTION_SX_EW'
  | 'FERROMANGANESE_CO_PRODUCTION'
  | 'SUPERCRITICAL_HYDROTHERMAL_PRECIPITATION';

export interface NoduleOreAssay {
  deposit: NoduleDepositLocation;
  name: string;
  oceanDepthMeters: [number, number];
  nickelGradeWtPct: number;
  cobaltGradeWtPct: number;
  copperGradeWtPct: number;
  manganeseGradeWtPct: number;
  ironGradeWtPct: number;
  rareEarthsPpm: number;
  moistureContentWtPct: number;
  description: string;
}

export interface BioleachingSystemSpec {
  id: BioleachingMicrobeConsortium;
  name: string;
  dominantMicrobes: string[];
  optimalPhRange: [number, number];
  optimalTemperatureC: number;
  ironOxidationRateGPerLPerHour: number;
  sulfurOxidationRateGPerLPerHour: number;
  mno2ReductiveDissolutionRateConstantPerHour: number;
  relativeKineticsMultiplier: number;
  toleranceToHeavyMetalsGPerL: number;
  description: string;
}

export interface RefiningRouteSpec {
  id: PrecursorRefiningRoute;
  name: string;
  primaryEndProduct: string;
  specificEnergyConsumptionKwhPerKgNi: number;
  ghgEmissionsKgCo2PerKgNi: number;
  reagentCostUsdPerTonOre: number;
  nickelRecoveryPct: number;
  cobaltRecoveryPct: number;
  copperRecoveryPct: number;
  manganeseValorizationPct: number;
  description: string;
}

export interface LeachingKineticPoint {
  reactionHours: number;
  nickelExtractionPct: number;
  cobaltExtractionPct: number;
  copperExtractionPct: number;
  manganeseExtractionPct: number;
  ironInSolutionGPerL: number;
  solutionPh: number;
}

export interface IndustrialPlantMassBalance {
  annualOreFeedDryTons: number;
  bioleachingTankVolumeM3: number;
  annualNickelProductionTons: number;
  annualCobaltProductionTons: number;
  annualCopperProductionTons: number;
  annualManganeseProductTons: number;
  annualNmcPrecursorTons: number;
  annualGhgEmissionsTonsCo2: number;
  avoidedGhgEmissionsVsNpiTonsCo2: number; // vs Nickel Pig Iron (~60 t CO2/t Ni)
  annualGrossRevenueUsd: number;
  specificProductionCostUsdPerLbNi: number;
}

// ------------------------------------------------------------------------------------------------
// CATALOGS & REACTION CONSTANTS
// ------------------------------------------------------------------------------------------------

export const NODULE_ASSAY_CATALOG: Record<NoduleDepositLocation, NoduleOreAssay> = {
  CLARION_CLIPPERTON_ZONE_CCZ: {
    deposit: 'CLARION_CLIPPERTON_ZONE_CCZ',
    name: 'Clarion-Clipperton Zone (CCZ Abyssal Plain)',
    oceanDepthMeters: [4000, 5500],
    nickelGradeWtPct: 1.42,
    cobaltGradeWtPct: 0.24,
    copperGradeWtPct: 1.18,
    manganeseGradeWtPct: 29.5,
    ironGradeWtPct: 5.8,
    rareEarthsPpm: 1050,
    moistureContentWtPct: 32.0,
    description: 'Premier Pacific nodule field exhibiting highest density of high-grade nickel and cobalt, situated on siliceous sediment at abyssal depths.'
  },
  PERU_BASIN_ABYSSAL: {
    deposit: 'PERU_BASIN_ABYSSAL',
    name: 'Peru Basin Diagenetic Nodules',
    oceanDepthMeters: [3800, 4400],
    nickelGradeWtPct: 1.25,
    cobaltGradeWtPct: 0.15,
    copperGradeWtPct: 0.65,
    manganeseGradeWtPct: 34.2,
    ironGradeWtPct: 4.2,
    rareEarthsPpm: 820,
    moistureContentWtPct: 35.0,
    description: 'Manganese-rich nodules formed under suboxic diagenetic conditions with high Mn/Fe ratio (~8.1) and lower cobalt content.'
  },
  CENTRAL_INDIAN_RIDGE_SEAMOUNT: {
    deposit: 'CENTRAL_INDIAN_RIDGE_SEAMOUNT',
    name: 'Central Indian Ridge Cobalt-Rich Crusts',
    oceanDepthMeters: [1500, 3000],
    nickelGradeWtPct: 0.85,
    cobaltGradeWtPct: 0.65,
    copperGradeWtPct: 0.22,
    manganeseGradeWtPct: 24.0,
    ironGradeWtPct: 14.5,
    rareEarthsPpm: 1850,
    moistureContentWtPct: 25.0,
    description: 'Hydrogenous ferromanganese crust on submarine volcanic seamounts exhibiting exceptional cobalt grade (> 0.6%) and enriched heavy REEs.'
  },
  COOK_ISLANDS_EEZ: {
    deposit: 'COOK_ISLANDS_EEZ',
    name: 'Cook Islands EEZ Pelagic Field',
    oceanDepthMeters: [4800, 5200],
    nickelGradeWtPct: 0.72,
    cobaltGradeWtPct: 0.48,
    copperGradeWtPct: 0.38,
    manganeseGradeWtPct: 21.0,
    ironGradeWtPct: 16.2,
    rareEarthsPpm: 1400,
    moistureContentWtPct: 28.0,
    description: 'Deep South Pacific nodule beds characterized by elevated cobalt reserves and thick nodule coverage on red pelagic clay substrates.'
  }
};

export const BIOLEACHING_SYSTEM_CATALOG: Record<BioleachingMicrobeConsortium, BioleachingSystemSpec> = {
  ACIDITHIOBACILLUS_CONSORTIUM: {
    id: 'ACIDITHIOBACILLUS_CONSORTIUM',
    name: 'Mesophilic Acidophile Consortium (A. ferrooxidans + A. thiooxidans)',
    dominantMicrobes: ['Acidithiobacillus ferrooxidans', 'Acidithiobacillus thiooxidans', 'Leptospirillum ferrooxidans'],
    optimalPhRange: [1.5, 2.0],
    optimalTemperatureC: 32,
    ironOxidationRateGPerLPerHour: 0.85,
    sulfurOxidationRateGPerLPerHour: 0.42,
    mno2ReductiveDissolutionRateConstantPerHour: 0.045,
    relativeKineticsMultiplier: 1.0,
    toleranceToHeavyMetalsGPerL: 45.0,
    description: 'Gold-standard autotrophic chemolithotrophs. A. thiooxidans generates sulfuric acid from elemental sulfur, while Fe(II) reduces refractory Mn(IV) to release trapped Ni/Co/Cu cations.'
  },
  SULPHOBACILLUS_THERMOTOLERANT: {
    id: 'SULPHOBACILLUS_THERMOTOLERANT',
    name: 'Moderately Thermophilic Sulfobacillus Culture (48°C)',
    dominantMicrobes: ['Sulfobacillus thermosulfidooxidans', 'Acidiphilium cryptum'],
    optimalPhRange: [1.6, 2.2],
    optimalTemperatureC: 48,
    ironOxidationRateGPerLPerHour: 1.65,
    sulfurOxidationRateGPerLPerHour: 0.88,
    mno2ReductiveDissolutionRateConstantPerHour: 0.095,
    relativeKineticsMultiplier: 2.1,
    toleranceToHeavyMetalsGPerL: 60.0,
    description: 'Thermophilic mixotrophs operating at elevated temperatures where mineral dissolution kinetics and diffusion through the porous silica boundary layer are twice as fast.'
  },
  HETERO_FUNGAL_ASPERGILLUS: {
    id: 'HETERO_FUNGAL_ASPERGILLUS',
    name: 'Heterotrophic Organic Acid Fungal Bioleaching (Aspergillus niger)',
    dominantMicrobes: ['Aspergillus niger (citric acid hyper-producer)', 'Penicillium simplicissimum'],
    optimalPhRange: [3.0, 5.0],
    optimalTemperatureC: 30,
    ironOxidationRateGPerLPerHour: 0.15,
    sulfurOxidationRateGPerLPerHour: 0.05,
    mno2ReductiveDissolutionRateConstantPerHour: 0.035,
    relativeKineticsMultiplier: 0.75,
    toleranceToHeavyMetalsGPerL: 25.0,
    description: 'Secretes organic tricarboxylic acids (citric, oxalic, gluconic) that chelate and leach metals under mild pH, minimizing corrosive mineral acid consumption.'
  },
  ELECTRO_ASSISTED_BIOLEACH: {
    id: 'ELECTRO_ASSISTED_BIOLEACH',
    name: 'Bio-Electrochemical Cathodically Assisted Reactor (BEAR)',
    dominantMicrobes: ['Acidithiobacillus ferrooxidans (Biofilm electrode)', 'Acidiphilium sp.'],
    optimalPhRange: [1.4, 1.8],
    optimalTemperatureC: 35,
    ironOxidationRateGPerLPerHour: 2.40,
    sulfurOxidationRateGPerLPerHour: 0.65,
    mno2ReductiveDissolutionRateConstantPerHour: 0.140,
    relativeKineticsMultiplier: 3.2,
    toleranceToHeavyMetalsGPerL: 75.0,
    description: 'Imposes a gentle cathodic bias (-0.35 V vs Ag/AgCl) to continuously regenerate Fe(II) catalyst at the electrode, accelerating MnO2 dissolution without consuming sacrificial iron scrap.'
  }
};

export const REFINING_ROUTE_CATALOG: Record<PrecursorRefiningRoute, RefiningRouteSpec> = {
  DIRECT_NMC811_COPRECIPITATION: {
    id: 'DIRECT_NMC811_COPRECIPITATION',
    name: 'Direct Stoichiometric NMC-811 Cathode Co-Precipitation',
    primaryEndProduct: 'Battery Precursor Ni0.8Mn0.1Co0.1(OH)2',
    specificEnergyConsumptionKwhPerKgNi: 8.5,
    ghgEmissionsKgCo2PerKgNi: 4.8,
    reagentCostUsdPerTonOre: 65.0,
    nickelRecoveryPct: 96.5,
    cobaltRecoveryPct: 95.8,
    copperRecoveryPct: 97.2,
    manganeseValorizationPct: 85.0,
    description: 'Bypasses pure metal smelting by adjusting solution stoichiometry directly from PLS, co-precipitating uniform spherical hydroxide particles for Li-ion EV batteries.'
  },
  SOLVENT_EXTRACTION_SX_EW: {
    id: 'SOLVENT_EXTRACTION_SX_EW',
    name: 'Multi-Stage Solvent Extraction (Cyanex 272 + D2EHPA)',
    primaryEndProduct: 'Individual High-Purity Metal Sulfates (NiSO4, CoSO4, Cu Cathode)',
    specificEnergyConsumptionKwhPerKgNi: 14.2,
    ghgEmissionsKgCo2PerKgNi: 7.2,
    reagentCostUsdPerTonOre: 110.0,
    nickelRecoveryPct: 98.2,
    cobaltRecoveryPct: 97.5,
    copperRecoveryPct: 98.5,
    manganeseValorizationPct: 70.0,
    description: 'Classic chemical separation train yielding crystalline battery-grade nickel and cobalt sulfates plus electrowon LME Grade-A copper cathodes.'
  },
  FERROMANGANESE_CO_PRODUCTION: {
    id: 'FERROMANGANESE_CO_PRODUCTION',
    name: 'Silicomanganese / Ferromanganese Co-Production for Green Steel',
    primaryEndProduct: 'Refined Ni-Co Precursor + SiMn Slag for Electric Arc Furnace',
    specificEnergyConsumptionKwhPerKgNi: 11.0,
    ghgEmissionsKgCo2PerKgNi: 5.9,
    reagentCostUsdPerTonOre: 75.0,
    nickelRecoveryPct: 95.0,
    cobaltRecoveryPct: 94.0,
    copperRecoveryPct: 96.0,
    manganeseValorizationPct: 94.5,
    description: 'Valorizes 94.5% of the massive manganese content into industrial alloys for green structural steel, achieving virtually zero solid waste.'
  },
  SUPERCRITICAL_HYDROTHERMAL_PRECIPITATION: {
    id: 'SUPERCRITICAL_HYDROTHERMAL_PRECIPITATION',
    name: 'Supercritical Water Hydrothermal Synthesis (400°C, 250 bar)',
    primaryEndProduct: 'Nano-Crystalline Mixed Spinel / Layered Oxide Battery Powders',
    specificEnergyConsumptionKwhPerKgNi: 16.5,
    ghgEmissionsKgCo2PerKgNi: 6.2,
    reagentCostUsdPerTonOre: 90.0,
    nickelRecoveryPct: 97.0,
    cobaltRecoveryPct: 96.5,
    copperRecoveryPct: 98.0,
    manganeseValorizationPct: 88.0,
    description: 'Exploits the near-zero dielectric constant of supercritical water for instantaneous hydrothermal crystallization of sub-micron cathode active material.'
  }
};

// ------------------------------------------------------------------------------------------------
// KINETICS & CHEMICAL EQUATIONS
// ------------------------------------------------------------------------------------------------

/**
 * Calculates time-resolved leaching recovery using the Shrinking Core Model for mineral dissolution:
 * 1 - 2/3 * X - (1 - X)^(2/3) = k_diff * t
 */
export function calculateLeachingKinetics(
  ore: NoduleOreAssay,
  microbe: BioleachingSystemSpec,
  totalHours: number = 72,
  pulpDensityWtPct: number = 10.0
): LeachingKineticPoint[] {
  const points: LeachingKineticPoint[] = [];
  const kBase = microbe.mno2ReductiveDissolutionRateConstantPerHour * microbe.relativeKineticsMultiplier;
  const pulpFactor = Math.max(0.6, 1.0 - (pulpDensityWtPct - 10.0) * 0.02);
  const kEff = kBase * pulpFactor;

  for (let t = 0; t <= totalHours; t += 4) {
    // Shrinking core dissolution fraction X
    // Approximation: X(t) = 1 - exp(-kEff * t)^0.85
    const progress = 1 - Math.exp(-Math.pow(kEff * t, 0.9));
    const mnRecovery = Math.min(99.0, Math.max(0, progress * 98.0));
    
    // Ni, Co, Cu dissolution tracks MnO2 matrix breakdown since they are finely disseminated in the lattice
    const niRecovery = Math.min(99.5, mnRecovery * 1.02);
    const coRecovery = Math.min(99.2, mnRecovery * 1.01);
    const cuRecovery = Math.min(98.8, mnRecovery * 0.99);

    // Fe behavior: precipitates as jarosite at pH > 1.8
    const feInSolutionGPerL = Math.max(0.5, (ore.ironGradeWtPct * pulpDensityWtPct * 10 / 100) * (1 - mnRecovery / 120));
    const currentPh = Math.min(2.5, Math.max(1.2, 1.5 + (mnRecovery / 100) * 0.4 - (t / totalHours) * 0.2));

    points.push({
      reactionHours: t,
      nickelExtractionPct: parseFloat(niRecovery.toFixed(1)),
      cobaltExtractionPct: parseFloat(coRecovery.toFixed(1)),
      copperExtractionPct: parseFloat(cuRecovery.toFixed(1)),
      manganeseExtractionPct: parseFloat(mnRecovery.toFixed(1)),
      ironInSolutionGPerL: parseFloat(feInSolutionGPerL.toFixed(2)),
      solutionPh: parseFloat(currentPh.toFixed(2))
    });
  }

  return points;
}

/**
 * Calculates industrial-scale plant balance, product tonnages, and carbon abatement.
 */
export function calculateIndustrialPlantBalance(
  ore: NoduleOreAssay,
  microbe: BioleachingSystemSpec,
  refining: RefiningRouteSpec,
  annualOreFeedDryTons: number = 200000, // 200,000 tons/year commercial plant
  leachingDurationHours: number = 48,
  pulpDensityWtPct: number = 15.0
): IndustrialPlantMassBalance {
  const kinetics = calculateLeachingKinetics(ore, microbe, leachingDurationHours, pulpDensityWtPct);
  const finalPoint = kinetics[kinetics.length - 1];

  // Effective recoveries factoring in downstream refining yield
  const niEffectiveRecovery = (finalPoint.nickelExtractionPct / 100) * (refining.nickelRecoveryPct / 100);
  const coEffectiveRecovery = (finalPoint.cobaltExtractionPct / 100) * (refining.cobaltRecoveryPct / 100);
  const cuEffectiveRecovery = (finalPoint.copperExtractionPct / 100) * (refining.copperRecoveryPct / 100);
  const mnEffectiveRecovery = (finalPoint.manganeseExtractionPct / 100) * (refining.manganeseValorizationPct / 100);

  // Annual metal outputs (tons/year):
  const annualNiTons = annualOreFeedDryTons * (ore.nickelGradeWtPct / 100) * niEffectiveRecovery;
  const annualCoTons = annualOreFeedDryTons * (ore.cobaltGradeWtPct / 100) * coEffectiveRecovery;
  const annualCuTons = annualOreFeedDryTons * (ore.copperGradeWtPct / 100) * cuEffectiveRecovery;
  const annualMnTons = annualOreFeedDryTons * (ore.manganeseGradeWtPct / 100) * mnEffectiveRecovery;

  // Battery precursor output: Ni0.8Mn0.1Co0.1(OH)2
  // Molecular weight of NMC-811 hydroxide = 0.8*58.69 + 0.1*54.94 + 0.1*58.93 + 2*17.008 = 46.95 + 5.49 + 5.89 + 34.02 = 92.35 g/mol
  // Ni mass fraction in precursor = 46.95 / 92.35 = 50.84%
  const annualNmcPrecursorTons = annualNiTons / 0.5084;

  // Reactor volume sizing:
  // Continuous slurry flow: Ore rate = 200,000 tons / (330 days * 24 h) = 25.25 t/h ore.
  // At 15% pulp density: Slurry mass flow = 25.25 / 0.15 = 168.3 t/h ~ 155 m3/h.
  // Tank volume = Slurry flow * leachingDurationHours
  const slurryFlowM3PerHour = (annualOreFeedDryTons / (330 * 24)) / (pulpDensityWtPct / 100) * 0.92;
  const bioleachingTankVolumeM3 = slurryFlowM3PerHour * leachingDurationHours;

  // Carbon accounting:
  const annualGhgEmissionsTonsCo2 = (annualNiTons * 1000 * refining.ghgEmissionsKgCo2PerKgNi) / 1000;
  // Displacing Nickel Pig Iron (NPI: ~60 kg CO2 / kg Ni) and terrestrial laterite HPAL (~22 kg CO2 / kg Ni)
  const npiBaselineGhgTons = (annualNiTons * 1000 * 55.0) / 1000;
  const avoidedGhgTons = npiBaselineGhgTons - annualGhgEmissionsTonsCo2;

  // Economics:
  // Ni @ $16,000/ton, Co @ $32,000/ton, Cu @ $9,000/ton, Mn @ $1,200/ton
  const revenueNi = annualNiTons * 16000;
  const revenueCo = annualCoTons * 32000;
  const revenueCu = annualCuTons * 9000;
  const revenueMn = annualMnTons * 1200;
  const annualGrossRevenueUsd = revenueNi + revenueCo + revenueCu + revenueMn;

  // Production OPEX per lb Ni equivalent:
  // Industry benchmark OPEX for bio-hydrometallurgy is $2.80 - $3.80 / lb Ni
  const specificCostUsdPerLbNi = 3.25 * (refining.reagentCostUsdPerTonOre / 80.0);

  return {
    annualOreFeedDryTons,
    bioleachingTankVolumeM3: parseFloat(bioleachingTankVolumeM3.toFixed(0)),
    annualNickelProductionTons: parseFloat(annualNiTons.toFixed(1)),
    annualCobaltProductionTons: parseFloat(annualCoTons.toFixed(1)),
    annualCopperProductionTons: parseFloat(annualCuTons.toFixed(1)),
    annualManganeseProductTons: parseFloat(annualMnTons.toFixed(1)),
    annualNmcPrecursorTons: parseFloat(annualNmcPrecursorTons.toFixed(1)),
    annualGhgEmissionsTonsCo2: parseFloat(annualGhgEmissionsTonsCo2.toFixed(0)),
    avoidedGhgEmissionsVsNpiTonsCo2: parseFloat(avoidedGhgTons.toFixed(0)),
    annualGrossRevenueUsd: parseFloat(annualGrossRevenueUsd.toFixed(0)),
    specificProductionCostUsdPerLbNi: parseFloat(specificCostUsdPerLbNi.toFixed(2))
  };
}
