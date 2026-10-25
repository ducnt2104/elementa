// src/domain/bioConcreteMineralizationEngine.ts
// Biochemical Carbon-Negative Bio-Concrete & Microbial Carbonate Precipitation (MICP) Mineralization Engine
// Conforms to: ASTM C39 Compressive Strength Standards, IUPAC Crystal Growth Kinetics, Vietnam GDPT 2018 Chemistry

export type MicpBacterialSpecies =
  | 'SPOROSARCINA_PASTEURII'
  | 'BACILLUS_PSEUDOFIRMUS_ALKALIPHILE'
  | 'BACILLUS_SPHAERICUS_ENDOSPORE'
  | 'CYANOBACTERIA_PHOTOSYNTHETIC';

export type AggregateMatrixType =
  | 'DESERT_DUNE_SAND_FINE'
  | 'RECYCLED_CONSTRUCTION_DEMOLITION_AGGREGATE'
  | 'STEEL_SLAG_CALCIUM_SILICATE'
  | 'STANDARD_RIVER_SAND_GRANULAR';

export type MineralizationPathwayType =
  | 'UREOLYSIS_INDUCED_CALCITE'
  | 'CARBONIC_ANHYDRASE_FLUE_GAS_SEQUESTRATION'
  | 'ORGANIC_ACID_NUTRIENT_HEALING'
  | 'MAGNESIUM_CARBONATE_HYDRATION';

export interface BacterialCultureSpec {
  id: MicpBacterialSpecies;
  name: string;
  ureaseActivityUPerMl: number; // 1 U = 1 umol urea hydrolyzed / min
  optimalPhEnvelope: [number, number];
  sporeLongevityYears: number;
  cellSurfaceZetaPotentialMv: number; // Negative potential attracts Ca2+
  maximumSalinityToleranceMolar: number;
  description: string;
}

export interface AggregateSpec {
  id: AggregateMatrixType;
  name: string;
  grainSizeD50Mm: number;
  porosityFraction: number;
  initialCalciumContentWtPct: number;
  embodiedCarbonKgCo2PerTon: number;
  circularEconomyWasteUtilization: boolean;
  description: string;
}

export interface MineralizationPathwaySpec {
  id: MineralizationPathwayType;
  name: string;
  primaryPrecipitateMineral: string;
  crystallizationRateConstantPerHour: number;
  carbonDioxideUptakeKgPerTonPrecipitate: number;
  unconfinedCompressiveStrengthContributionMpaPerWtPct: number;
  description: string;
}

export interface MicpKineticPoint {
  reactionHours: number;
  ureaHydrolysisPct: number;
  calcitePrecipitatedWtPct: number;
  unconfinedCompressiveStrengthMpa: number;
  slurryPh: number;
  residualAmmoniaMmolPerL: number;
}

export interface CrackSelfHealingSimulationPoint {
  elapsedDays: number;
  crackWidthRemainingMm: number;
  healingRatioPct: number;
  waterPermeabilityReductionPct: number;
  isCrackStructurallySealed: boolean;
}

export interface BioConcreteLcaMassBalance {
  productionVolumeM3: number;
  aggregateMassTons: number;
  calcitePrecipitatedTons: number;
  netCarbonDioxideSequestrationTons: number; // Negative = net carbon sink
  opcBaselineCarbonEmissionsTons: number;    // Standard concrete (~350 kg CO2/m3)
  avoidedCarbonEmissionsTons: number;
  finalStructuralStrengthMpa: number;
  structuralGradeClassification: 'NON_STRUCTURAL' | 'C20_PAVEMENT' | 'C30_STRUCTURAL' | 'C45_HIGH_STRENGTH';
  costPerCubicMeterUsd: number;
}

// ------------------------------------------------------------------------------------------------
// CATALOGS & REACTION CONSTANTS
// ------------------------------------------------------------------------------------------------

export const BACTERIAL_CULTURE_CATALOG: Record<MicpBacterialSpecies, BacterialCultureSpec> = {
  SPOROSARCINA_PASTEURII: {
    id: 'SPOROSARCINA_PASTEURII',
    name: 'Sporosarcina pasteurii (ATCC 11859)',
    ureaseActivityUPerMl: 18.5,
    optimalPhEnvelope: [8.5, 9.5],
    sporeLongevityYears: 5,
    cellSurfaceZetaPotentialMv: -38.5,
    maximumSalinityToleranceMolar: 1.5,
    description: 'Gold-standard non-pathogenic soil bacterium exhibiting hyper-active urease synthesis for rapid urea hydrolysis and robust calcite crystal nucleation.'
  },
  BACILLUS_PSEUDOFIRMUS_ALKALIPHILE: {
    id: 'BACILLUS_PSEUDOFIRMUS_ALKALIPHILE',
    name: 'Bacillus pseudofirmus (Extreme Alkaliphile)',
    ureaseActivityUPerMl: 12.0,
    optimalPhEnvelope: [9.5, 12.0],
    sporeLongevityYears: 50,
    cellSurfaceZetaPotentialMv: -45.0,
    maximumSalinityToleranceMolar: 2.0,
    description: 'Extreme alkaliphile thriving inside fresh alkaline concrete matrices (pH > 11.5), generating dormant endospores that survive for over 50 years.'
  },
  BACILLUS_SPHAERICUS_ENDOSPORE: {
    id: 'BACILLUS_SPHAERICUS_ENDOSPORE',
    name: 'Bacillus sphaericus Microencapsulated',
    ureaseActivityUPerMl: 15.2,
    optimalPhEnvelope: [8.0, 10.5],
    sporeLongevityYears: 30,
    cellSurfaceZetaPotentialMv: -32.0,
    maximumSalinityToleranceMolar: 1.2,
    description: 'Encapsulated inside porous lightweight expanded clay aggregates (LWA) or hydrogels, shielding spores from mechanical mixing stresses until cracked.'
  },
  CYANOBACTERIA_PHOTOSYNTHETIC: {
    id: 'CYANOBACTERIA_PHOTOSYNTHETIC',
    name: 'Synechococcus sp. (Photosynthetic Biomineralizer)',
    ureaseActivityUPerMl: 4.5,
    optimalPhEnvelope: [7.5, 9.0],
    sporeLongevityYears: 2,
    cellSurfaceZetaPotentialMv: -28.0,
    maximumSalinityToleranceMolar: 0.8,
    description: 'Photosynthetic cyanobacteria assimilating bicarbonate via Rubisco, elevating local microenvironment pH via CO2 depletion to precipitate calcium carbonate without urea.'
  }
};

export const AGGREGATE_CATALOG: Record<AggregateMatrixType, AggregateSpec> = {
  DESERT_DUNE_SAND_FINE: {
    id: 'DESERT_DUNE_SAND_FINE',
    name: 'Desert Dune Sand (Fine Aeolian 0.15 mm)',
    grainSizeD50Mm: 0.15,
    porosityFraction: 0.42,
    initialCalciumContentWtPct: 3.2,
    embodiedCarbonKgCo2PerTon: 2.5,
    circularEconomyWasteUtilization: true,
    description: 'Abundant desert sand historically unusable in conventional concrete due to fine round grains, but easily consolidated into load-bearing sandstone bricks via MICP.'
  },
  RECYCLED_CONSTRUCTION_DEMOLITION_AGGREGATE: {
    id: 'RECYCLED_CONSTRUCTION_DEMOLITION_AGGREGATE',
    name: 'Recycled Concrete Demolition Waste (RCA)',
    grainSizeD50Mm: 4.75,
    porosityFraction: 0.35,
    initialCalciumContentWtPct: 8.5,
    embodiedCarbonKgCo2PerTon: 4.8,
    circularEconomyWasteUtilization: true,
    description: 'Crushed demolition rubble with adhering porous mortar. Bio-deposition seals pores and micro-cracks, upgrading recycled aggregate quality to match virgin rock.'
  },
  STEEL_SLAG_CALCIUM_SILICATE: {
    id: 'STEEL_SLAG_CALCIUM_SILICATE',
    name: 'Basic Oxygen Furnace (BOF) Steel Slag',
    grainSizeD50Mm: 2.36,
    porosityFraction: 0.28,
    initialCalciumContentWtPct: 38.0,
    embodiedCarbonKgCo2PerTon: -45.0, // Credited industrial by-product
    circularEconomyWasteUtilization: true,
    description: 'Calcium-rich metallurgical slag providing an internal source of reactive Ca2+ ions, drastically lowering external calcium salt chemical additions.'
  },
  STANDARD_RIVER_SAND_GRANULAR: {
    id: 'STANDARD_RIVER_SAND_GRANULAR',
    name: 'Standard Natural River Sand (Graded 0.6 mm)',
    grainSizeD50Mm: 0.60,
    porosityFraction: 0.32,
    initialCalciumContentWtPct: 1.5,
    embodiedCarbonKgCo2PerTon: 8.5,
    circularEconomyWasteUtilization: false,
    description: 'High-purity quartz river aggregate conforming to ASTM C33 gradation for benchmark civil construction comparisons.'
  }
};

export const MINERALIZATION_PATHWAY_CATALOG: Record<MineralizationPathwayType, MineralizationPathwaySpec> = {
  UREOLYSIS_INDUCED_CALCITE: {
    id: 'UREOLYSIS_INDUCED_CALCITE',
    name: 'Enzymatic Ureolysis (Urea + Ca²⁺ → CaCO₃)',
    primaryPrecipitateMineral: 'Calcite (Rhombohedral crystal)',
    crystallizationRateConstantPerHour: 0.085,
    carbonDioxideUptakeKgPerTonPrecipitate: 440.0,
    unconfinedCompressiveStrengthContributionMpaPerWtPct: 2.35,
    description: 'High-speed enzymatic precipitation yielding well-crystallized rhombohedral calcite bridges between aggregate contacts.'
  },
  CARBONIC_ANHYDRASE_FLUE_GAS_SEQUESTRATION: {
    id: 'CARBONIC_ANHYDRASE_FLUE_GAS_SEQUESTRATION',
    name: 'Carbonic Anhydrase (CA) Industrial Flue Gas Mineralization',
    primaryPrecipitateMineral: 'Vaterite & Aragonite Needle Matrix',
    crystallizationRateConstantPerHour: 0.055,
    carbonDioxideUptakeKgPerTonPrecipitate: 880.0, // Direct CO2 gas fixation
    unconfinedCompressiveStrengthContributionMpaPerWtPct: 2.10,
    description: 'Captures raw gaseous CO2 from cement/steel flue gas and hydrates it at 10^6 reactions/sec into carbonate ions, locking gaseous carbon directly into solid rock.'
  },
  ORGANIC_ACID_NUTRIENT_HEALING: {
    id: 'ORGANIC_ACID_NUTRIENT_HEALING',
    name: 'Calcium Lactate Spore Oxidation (Self-Healing)',
    primaryPrecipitateMineral: 'Microcrystalline Calcium Carbonate',
    crystallizationRateConstantPerHour: 0.035,
    carbonDioxideUptakeKgPerTonPrecipitate: 320.0,
    unconfinedCompressiveStrengthContributionMpaPerWtPct: 1.80,
    description: 'Metabolic oxidation of calcium lactate by activated bacterial endospores upon moisture ingress, sealing cracks autogenously without nitrogenous by-products.'
  },
  MAGNESIUM_CARBONATE_HYDRATION: {
    id: 'MAGNESIUM_CARBONATE_HYDRATION',
    name: 'Hydromagnesite / Nesquehonite Reactive Eco-Cement',
    primaryPrecipitateMineral: 'Hydrated Magnesium Carbonate (MgCO3·3H2O)',
    crystallizationRateConstantPerHour: 0.045,
    carbonDioxideUptakeKgPerTonPrecipitate: 520.0,
    unconfinedCompressiveStrengthContributionMpaPerWtPct: 1.95,
    description: 'Low-energy non-calcium mineralization based on reactive MgO, forming interlocked needle-like nesquehonite crystals with superior fire resistance.'
  }
};

// ------------------------------------------------------------------------------------------------
// KINETICS & MECHANICAL STRENGTH FUNCTIONS
// ------------------------------------------------------------------------------------------------

/**
 * Calculates time-resolved biocementation kinetics and unconfined compressive strength development.
 */
export function calculateMicpCuringKinetics(
  bacterium: BacterialCultureSpec,
  aggregate: AggregateSpec,
  pathway: MineralizationPathwaySpec,
  totalCuringHours: number = 72,
  calciumConcentrationMolar: number = 0.50,
  targetCalciteTargetWtPct: number = 15.0
): MicpKineticPoint[] {
  const points: MicpKineticPoint[] = [];
  const kRate = pathway.crystallizationRateConstantPerHour * (bacterium.ureaseActivityUPerMl / 15.0);

  for (let t = 0; t <= totalCuringHours; t += 4) {
    // Fraction of target mineralization achieved
    const fraction = 1 - Math.exp(-Math.pow(kRate * t, 0.85));
    const calciteWtPct = targetCalciteTargetWtPct * fraction;
    const ureaHydrolysisPct = Math.min(100.0, fraction * 105.0);

    // Compressive strength: empirical exponential fit matching ASTM C39 experimental data
    // UCS = A * (calciteWtPct)^1.25 / (1 + porosity)
    const baseUcs = pathway.unconfinedCompressiveStrengthContributionMpaPerWtPct * Math.pow(calciteWtPct, 1.15);
    const porosityPenalty = 1.0 / (1.0 + aggregate.porosityFraction * 1.5);
    const ucsMpa = baseUcs * porosityPenalty;

    // pH dynamics: rises from 7.0 to 9.2 as urea hydrolyzes
    const ph = Math.min(9.3, 7.2 + fraction * 2.0);
    const residualAmmonia = Math.min(600, fraction * calciumConcentrationMolar * 2000 * 0.9);

    points.push({
      reactionHours: t,
      ureaHydrolysisPct: parseFloat(ureaHydrolysisPct.toFixed(1)),
      calcitePrecipitatedWtPct: parseFloat(calciteWtPct.toFixed(2)),
      unconfinedCompressiveStrengthMpa: parseFloat(ucsMpa.toFixed(1)),
      slurryPh: parseFloat(ph.toFixed(2)),
      residualAmmoniaMmolPerL: parseFloat(residualAmmonia.toFixed(0))
    });
  }

  return points;
}

/**
 * Simulates crack self-healing kinetics over a 28-day water-immersion period.
 */
export function simulateCrackSelfHealing(
  initialCrackWidthMm: number = 0.60,
  sporeViabilityFactor: number = 0.95,
  simulationDays: number = 28
): CrackSelfHealingSimulationPoint[] {
  const points: CrackSelfHealingSimulationPoint[] = [];
  // Mineral growth rate in crack: ~0.025 mm / day at room temperature with active bacteria
  const healingRateMmPerDay = 0.026 * sporeViabilityFactor;

  for (let d = 0; d <= simulationDays; d += 2) {
    const healedWidth = Math.min(initialCrackWidthMm, d * healingRateMmPerDay);
    const remainingWidth = Math.max(0, initialCrackWidthMm - healedWidth);
    const healingRatioPct = ((initialCrackWidthMm - remainingWidth) / initialCrackWidthMm) * 100;
    
    // Water permeability drops exponentially with cube of crack width (Poiseuille flow)
    const permeabilityReductionPct = (1 - Math.pow(remainingWidth / initialCrackWidthMm, 3)) * 100;
    const isStructurallySealed = remainingWidth <= 0.05;

    points.push({
      elapsedDays: d,
      crackWidthRemainingMm: parseFloat(remainingWidth.toFixed(3)),
      healingRatioPct: parseFloat(healingRatioPct.toFixed(1)),
      waterPermeabilityReductionPct: parseFloat(permeabilityReductionPct.toFixed(1)),
      isCrackStructurallySealed: isStructurallySealed
    });
  }

  return points;
}

/**
 * Calculates complete life-cycle assessment (LCA), mass balance, and carbon-negative footprint.
 */
export function calculateBioConcreteLcaBalance(
  bacterium: BacterialCultureSpec,
  aggregate: AggregateSpec,
  pathway: MineralizationPathwaySpec,
  productionVolumeM3: number = 100,
  calcitePrecipitatedWtPct: number = 14.0
): BioConcreteLcaMassBalance {
  // Density of compacted bio-concrete ~ 2,100 kg/m3 = 2.1 t/m3
  const totalConcreteMassTons = productionVolumeM3 * 2.1;
  const calciteFraction = calcitePrecipitatedWtPct / 100;
  const calcitePrecipitatedTons = totalConcreteMassTons * calciteFraction;
  const aggregateMassTons = totalConcreteMassTons * (1 - calciteFraction);

  // Carbon accounting:
  // CO2 mineralized chemically into CaCO3: M_CO2 / M_CaCO3 = 44.01 / 100.09 = 43.97%
  const co2SequesteredChemicallyTons = calcitePrecipitatedTons * (pathway.carbonDioxideUptakeKgPerTonPrecipitate / 1000);
  const aggregateEmbodiedCo2Tons = aggregateMassTons * (aggregate.embodiedCarbonKgCo2PerTon / 1000);
  const mixingAndProcessCo2Tons = productionVolumeM3 * 0.015; // 15 kg CO2/m3 mixing energy

  const totalEmissionsTons = aggregateEmbodiedCo2Tons + mixingAndProcessCo2Tons;
  const netCarbonDioxideSequestrationTons = totalEmissionsTons - co2SequesteredChemicallyTons;

  // Ordinary Portland Cement (OPC) baseline: ~350 kg CO2 per m3 of concrete
  const opcBaselineCarbonEmissionsTons = productionVolumeM3 * 0.350;
  const avoidedCarbonEmissionsTons = opcBaselineCarbonEmissionsTons - netCarbonDioxideSequestrationTons;

  // Final strength:
  const porosityPenalty = 1.0 / (1.0 + aggregate.porosityFraction * 1.5);
  const finalStructuralStrengthMpa =
    pathway.unconfinedCompressiveStrengthContributionMpaPerWtPct *
    Math.pow(calcitePrecipitatedWtPct, 1.15) *
    porosityPenalty;

  let structuralGradeClassification: 'NON_STRUCTURAL' | 'C20_PAVEMENT' | 'C30_STRUCTURAL' | 'C45_HIGH_STRENGTH' = 'C30_STRUCTURAL';
  if (finalStructuralStrengthMpa >= 45.0) {
    structuralGradeClassification = 'C45_HIGH_STRENGTH';
  } else if (finalStructuralStrengthMpa >= 30.0) {
    structuralGradeClassification = 'C30_STRUCTURAL';
  } else if (finalStructuralStrengthMpa >= 20.0) {
    structuralGradeClassification = 'C20_PAVEMENT';
  } else {
    structuralGradeClassification = 'NON_STRUCTURAL';
  }

  // Cost per m3:
  const costPerCubicMeterUsd = 65.0 + (calcitePrecipitatedWtPct / 15.0) * 25.0;

  return {
    productionVolumeM3,
    aggregateMassTons: parseFloat(aggregateMassTons.toFixed(1)),
    calcitePrecipitatedTons: parseFloat(calcitePrecipitatedTons.toFixed(1)),
    netCarbonDioxideSequestrationTons: parseFloat(netCarbonDioxideSequestrationTons.toFixed(1)),
    opcBaselineCarbonEmissionsTons: parseFloat(opcBaselineCarbonEmissionsTons.toFixed(1)),
    avoidedCarbonEmissionsTons: parseFloat(avoidedCarbonEmissionsTons.toFixed(1)),
    finalStructuralStrengthMpa: parseFloat(finalStructuralStrengthMpa.toFixed(1)),
    structuralGradeClassification,
    costPerCubicMeterUsd: parseFloat(costPerCubicMeterUsd.toFixed(1))
  };
}
