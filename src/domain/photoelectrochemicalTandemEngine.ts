// src/domain/photoelectrochemicalTandemEngine.ts
// Direct Photoelectrochemical (PEC) Solar Tandem Water-Splitting & Concentrated PV-Electrolysis Engine
// Conforms to: IUPAC Photochemical & Electrochemical Standards, Shockley-Queisser Tandem Physics, Vietnam GDPT 2018 Chemistry

export type TandemCellArchitecture =
  | 'III_V_GAINP2_GAAS'
  | 'PEROVSKITE_SILICON_TANDEM'
  | 'BIVO4_PEROVSKITE_OXIDE'
  | 'CONCENTRATED_CPV_ELECTROLYZER';

export type PassivationLayerType =
  | 'ALD_TIO2_AMORPHOUS'
  | 'SPUTTERED_NIOX_COAT'
  | 'GRAPHENE_2D_ENCAPSULATION'
  | 'BARE_UNPROTECTED';

export type ElectrocatalystType =
  | 'NIFEOX_OER_PT_HER'
  | 'COBALT_PHOSPHATE_COPI'
  | 'IRIDIUM_RUTHENIUM_OXIDE'
  | 'EARTH_ABUNDANT_MOS2_FES2';

export interface SubCellSpec {
  name: string;
  material: string;
  bandgapEv: number;
  openCircuitVoltageVoc: number;
  shortCircuitCurrentJscMaPerCm2: number;
  fillFactor: number;
  absorptionCutoffNm: number;
}

export interface TandemArchitectureConfig {
  id: TandemCellArchitecture;
  name: string;
  description: string;
  topCell: SubCellSpec;
  bottomCell: SubCellSpec;
  combinedVocVolts: number;
  theoreticalMatchedJscMaPerCm2: number;
  fillFactor: number;
  benchmarkedSthEfficiencyPct: number;
  opticalConcentrationCompatible: boolean;
  maxConcentrationRatio: number;
  estimatedSemiconductorCostPerM2: number;
}

export interface PassivationSpec {
  id: PassivationLayerType;
  name: string;
  material: string;
  thicknessNm: number;
  depositionMethod: string;
  chemicalStabilityPhRange: [number, number];
  holeConductanceMhoPerCm2: number;
  opticalTransmittancePct: number;
  operationalLifetimeHours: number;
  corrosionRateNmPerHour: number;
  description: string;
}

export interface CatalystSpec {
  id: ElectrocatalystType;
  name: string;
  oerCatalyst: string;
  herCatalyst: string;
  oerOverpotentialEtaAt10MaV: number;
  herOverpotentialEtaAt10MaV: number;
  oerTafelSlopeMvPerDec: number;
  herTafelSlopeMvPerDec: number;
  optimalPh: number;
  faradaicEfficiencyPct: number;
  preciousMetalContent: 'NONE' | 'LOW' | 'HIGH';
  description: string;
}

export interface JVCharacteristicPoint {
  voltageV: number;
  photocurrentDensityMaPerCm2: number;
  electrochemicalLoadCurrentMaPerCm2: number;
}

export interface OperatingPointResult {
  operatingVoltageV: number;
  operatingCurrentDensityMaPerCm2: number;
  isSpontaneousUnassisted: boolean;
  requiredExternalBiasV: number;
  thermodynamicVoltageV: number;
  oerOverpotentialV: number;
  herOverpotentialV: number;
  ohmicDropV: number;
  solarToHydrogenEfficiencyPct: number;
}

export interface PECSolarFarmBalance {
  collectorAreaM2: number;
  opticalConcentrationRatio: number;
  solarIrradianceWPerM2: number;
  totalSolarPowerInKw: number;
  operatingCurrentA: number;
  hydrogenProductionRateKgPerHour: number;
  oxygenProductionRateKgPerHour: number;
  hydrogenEnergyRateKwLHV: number; // based on 33.33 kWh/kg LHV
  annualSolarHoursEquivalent: number;
  annualHydrogenProductionTonsPerYear: number;
  annualAvoidedCo2TonsPerYear: number; // vs gray H2 (~10.5 kg CO2/kg H2)
  annualRevenueUsd: number;            // assuming $5.00/kg clean H2
  specificEnergyConsumptionKwhPerKgH2: number;
}

export interface LifetimeDegradationPoint {
  elapsedHours: number;
  passivationRemainingThicknessNm: number;
  relativeSthRetentionPct: number;
  waterSplittingActive: boolean;
}

// ------------------------------------------------------------------------------------------------
// CATALOG CONSTANTS & DATABASE
// ------------------------------------------------------------------------------------------------

export const TANDEM_ARCHITECTURES: Record<TandemCellArchitecture, TandemArchitectureConfig> = {
  III_V_GAINP2_GAAS: {
    id: 'III_V_GAINP2_GAAS',
    name: 'III-V Monolithic GaInP₂ / GaAs Tandem',
    description: 'High-performance monolithic epitaxial III-V dual-junction tandem photoelectrode. State-of-the-art efficiency benchmark for direct water splitting.',
    topCell: {
      name: 'GaInP₂ (Top Photoanode)',
      material: 'Ga0.51In0.49P',
      bandgapEv: 1.83,
      openCircuitVoltageVoc: 1.35,
      shortCircuitCurrentJscMaPerCm2: 15.2,
      fillFactor: 0.84,
      absorptionCutoffNm: 678
    },
    bottomCell: {
      name: 'GaAs (Bottom Photocathode)',
      material: 'GaAs',
      bandgapEv: 1.42,
      openCircuitVoltageVoc: 0.98,
      shortCircuitCurrentJscMaPerCm2: 15.5,
      fillFactor: 0.82,
      absorptionCutoffNm: 873
    },
    combinedVocVolts: 2.33,
    theoreticalMatchedJscMaPerCm2: 15.2,
    fillFactor: 0.81,
    benchmarkedSthEfficiencyPct: 19.3,
    opticalConcentrationCompatible: true,
    maxConcentrationRatio: 100,
    estimatedSemiconductorCostPerM2: 4500
  },
  PEROVSKITE_SILICON_TANDEM: {
    id: 'PEROVSKITE_SILICON_TANDEM',
    name: 'Perovskite / Silicon 2T Tandem',
    description: 'Wide-bandgap metal-halide perovskite top cell paired with standard crystalline Silicon bottom cell. High efficiency at low manufacturing cost.',
    topCell: {
      name: 'Mixed Halide Perovskite',
      material: 'Cs0.05FA0.85MA0.10Pb(I0.75Br0.25)3',
      bandgapEv: 1.68,
      openCircuitVoltageVoc: 1.22,
      shortCircuitCurrentJscMaPerCm2: 17.8,
      fillFactor: 0.79,
      absorptionCutoffNm: 738
    },
    bottomCell: {
      name: 'Crystalline Silicon (c-Si)',
      material: 'c-Si Heterojunction',
      bandgapEv: 1.12,
      openCircuitVoltageVoc: 0.73,
      shortCircuitCurrentJscMaPerCm2: 18.2,
      fillFactor: 0.80,
      absorptionCutoffNm: 1107
    },
    combinedVocVolts: 1.95,
    theoreticalMatchedJscMaPerCm2: 17.5,
    fillFactor: 0.77,
    benchmarkedSthEfficiencyPct: 17.4,
    opticalConcentrationCompatible: false,
    maxConcentrationRatio: 5,
    estimatedSemiconductorCostPerM2: 220
  },
  BIVO4_PEROVSKITE_OXIDE: {
    id: 'BIVO4_PEROVSKITE_OXIDE',
    name: 'BiVO₄ Metal-Oxide / Si Heterotandem',
    description: 'Earth-abundant bismuth vanadate photoanode optically combined with silicon/perovskite. Non-toxic, robust, highly stable against oxidation.',
    topCell: {
      name: 'Doped BiVO₄ (Photoanode)',
      material: 'BiVO4:W,Mo',
      bandgapEv: 2.40,
      openCircuitVoltageVoc: 0.85,
      shortCircuitCurrentJscMaPerCm2: 6.8,
      fillFactor: 0.65,
      absorptionCutoffNm: 516
    },
    bottomCell: {
      name: 'Silicon / Perovskite Dual-Junction',
      material: 'Si / CH3NH3PbI3',
      bandgapEv: 1.12,
      openCircuitVoltageVoc: 1.25,
      shortCircuitCurrentJscMaPerCm2: 7.2,
      fillFactor: 0.72,
      absorptionCutoffNm: 1100
    },
    combinedVocVolts: 2.10,
    theoreticalMatchedJscMaPerCm2: 6.5,
    fillFactor: 0.68,
    benchmarkedSthEfficiencyPct: 8.2,
    opticalConcentrationCompatible: false,
    maxConcentrationRatio: 2,
    estimatedSemiconductorCostPerM2: 140
  },
  CONCENTRATED_CPV_ELECTROLYZER: {
    id: 'CONCENTRATED_CPV_ELECTROLYZER',
    name: 'High-Concentration CPV (300×) + PEM Electrolyzer',
    description: 'High-efficiency multi-junction III-V solar microcells under 300× Fresnel optical concentration directly coupled to a zero-gap PEM electrolysis stack.',
    topCell: {
      name: 'GaInP / GaInAs Dual Top Junction',
      material: 'GaInP / GaInAs',
      bandgapEv: 1.90,
      openCircuitVoltageVoc: 2.20,
      shortCircuitCurrentJscMaPerCm2: 14.8,
      fillFactor: 0.86,
      absorptionCutoffNm: 652
    },
    bottomCell: {
      name: 'Ge / InGaAs Bottom Junction',
      material: 'Germanium / InGaAs',
      bandgapEv: 0.67,
      openCircuitVoltageVoc: 0.55,
      shortCircuitCurrentJscMaPerCm2: 15.1,
      fillFactor: 0.80,
      absorptionCutoffNm: 1850
    },
    combinedVocVolts: 2.75,
    theoreticalMatchedJscMaPerCm2: 14.8, // at 1 sun equivalent; scales with concentration
    fillFactor: 0.84,
    benchmarkedSthEfficiencyPct: 26.5,
    opticalConcentrationCompatible: true,
    maxConcentrationRatio: 500,
    estimatedSemiconductorCostPerM2: 9500
  }
};

export const PASSIVATION_LAYERS: Record<PassivationLayerType, PassivationSpec> = {
  ALD_TIO2_AMORPHOUS: {
    id: 'ALD_TIO2_AMORPHOUS',
    name: 'ALD Amorphous TiO₂ (10 nm) Pin-Hole Free',
    material: 'amorphous-TiO2 / ALD (TiCl4 + H2O precursor)',
    thicknessNm: 10.0,
    depositionMethod: 'Atomic Layer Deposition (ALD) at 150°C',
    chemicalStabilityPhRange: [0, 14],
    holeConductanceMhoPerCm2: 0.85,
    opticalTransmittancePct: 94.5,
    operationalLifetimeHours: 3500,
    corrosionRateNmPerHour: 0.0015,
    description: 'Chemically resilient dielectric film acting as an electronic hole-conductor via localized defect states while completely sealing semiconductor against chemical dissolution.'
  },
  SPUTTERED_NIOX_COAT: {
    id: 'SPUTTERED_NIOX_COAT',
    name: 'Reactive Sputtered NiOₓ (25 nm)',
    material: 'Non-stoichiometric NiOx',
    thicknessNm: 25.0,
    depositionMethod: 'RF Magnetron Sputtering',
    chemicalStabilityPhRange: [12, 14], // mostly alkaline stable
    holeConductanceMhoPerCm2: 0.65,
    opticalTransmittancePct: 88.0,
    operationalLifetimeHours: 1200,
    corrosionRateNmPerHour: 0.012,
    description: 'P-type semiconducting oxide facilitating hole extraction, stable in concentrated alkaline KOH electrolytes but vulnerable in strong acids.'
  },
  GRAPHENE_2D_ENCAPSULATION: {
    id: 'GRAPHENE_2D_ENCAPSULATION',
    name: 'Multi-Layer Graphene Impermeable Barrier (3-layer)',
    material: 'CVD Graphene 3L',
    thicknessNm: 1.0,
    depositionMethod: 'CVD Roll-to-Roll Transfer',
    chemicalStabilityPhRange: [1, 13],
    holeConductanceMhoPerCm2: 1.20,
    opticalTransmittancePct: 93.2,
    operationalLifetimeHours: 2200,
    corrosionRateNmPerHour: 0.0002,
    description: 'Impermeable 2D honeycomb lattice blocking ion penetration while preserving ballistic carrier transport and ultra-high optical transparency.'
  },
  BARE_UNPROTECTED: {
    id: 'BARE_UNPROTECTED',
    name: 'Bare Unprotected Semiconductor Surface',
    material: 'Direct Semiconductor / Electrolyte Interface',
    thicknessNm: 0.0,
    depositionMethod: 'None',
    chemicalStabilityPhRange: [6.5, 7.5],
    holeConductanceMhoPerCm2: 1.50,
    opticalTransmittancePct: 100.0,
    operationalLifetimeHours: 3.5,
    corrosionRateNmPerHour: 45.0,
    description: 'No passivation barrier. Under anodic photo-oxidation, photogenerated holes oxidize the semiconductor into insulating oxides (SiO2) or dissolvable species within hours.'
  }
};

export const ELECTROCATALYSTS: Record<ElectrocatalystType, CatalystSpec> = {
  NIFEOX_OER_PT_HER: {
    id: 'NIFEOX_OER_PT_HER',
    name: 'NiFeOₓ (OER) & Pt Nanoparticles (HER)',
    oerCatalyst: 'Ni0.8Fe0.2Ox (Mixed metal oxide)',
    herCatalyst: 'Pt Nanoparticles on Carbon (0.05 mg/cm²)',
    oerOverpotentialEtaAt10MaV: 0.250,
    herOverpotentialEtaAt10MaV: 0.035,
    oerTafelSlopeMvPerDec: 42.0,
    herTafelSlopeMvPerDec: 30.0,
    optimalPh: 14.0, // 1.0 M KOH
    faradaicEfficiencyPct: 98.5,
    preciousMetalContent: 'LOW',
    description: 'Benchmark alkaline pairing: earth-abundant nickel-iron oxyhydroxide for OER with minimal loading of Pt for near-zero overpotential HER.'
  },
  COBALT_PHOSPHATE_COPI: {
    id: 'COBALT_PHOSPHATE_COPI',
    name: 'Co-Pi Catalyst (Neutral pH Water Splitting)',
    oerCatalyst: 'Amorphous Cobalt Phosphate (Co-Pi)',
    herCatalyst: 'Ni-Mo Alloy Film',
    oerOverpotentialEtaAt10MaV: 0.380,
    herOverpotentialEtaAt10MaV: 0.090,
    oerTafelSlopeMvPerDec: 60.0,
    herTafelSlopeMvPerDec: 45.0,
    optimalPh: 7.0,
    faradaicEfficiencyPct: 95.0,
    preciousMetalContent: 'NONE',
    description: 'Nocera self-healing catalyst capable of operating in benign neutral freshwater or municipal wastewater without extreme acids or caustics.'
  },
  IRIDIUM_RUTHENIUM_OXIDE: {
    id: 'IRIDIUM_RUTHENIUM_OXIDE',
    name: 'IrO₂ / RuO₂ (Acidic PEM Electrolysis)',
    oerCatalyst: 'IrO2 - RuO2 solid solution',
    herCatalyst: 'Pt/C benchmark',
    oerOverpotentialEtaAt10MaV: 0.280,
    herOverpotentialEtaAt10MaV: 0.025,
    oerTafelSlopeMvPerDec: 48.0,
    herTafelSlopeMvPerDec: 28.0,
    optimalPh: 0.5, // 0.5 M H2SO4 or Nafion PEM
    faradaicEfficiencyPct: 99.2,
    preciousMetalContent: 'HIGH',
    description: 'Industry standard for acidic proton exchange membrane (PEM) environments with superior kinetics and acid corrosion tolerance.'
  },
  EARTH_ABUNDANT_MOS2_FES2: {
    id: 'EARTH_ABUNDANT_MOS2_FES2',
    name: 'MoS₂ Edges (HER) & FeS₂ / Ni₃S₂ (OER)',
    oerCatalyst: 'Hierarchical Ni3S2 / FeS2',
    herCatalyst: 'Edge-engineered MoS2 nanosheets',
    oerOverpotentialEtaAt10MaV: 0.320,
    herOverpotentialEtaAt10MaV: 0.110,
    oerTafelSlopeMvPerDec: 55.0,
    herTafelSlopeMvPerDec: 48.0,
    optimalPh: 13.0,
    faradaicEfficiencyPct: 94.0,
    preciousMetalContent: 'NONE',
    description: '100% noble-metal-free catalyst pairing based on chalcogenides and earth-abundant transition metals for ultra-low capital costs.'
  }
};

// ------------------------------------------------------------------------------------------------
// THERMODYNAMIC & ELECTROCHEMICAL EQUATIONS
// ------------------------------------------------------------------------------------------------

export const FARADAY_CONSTANT = 96485.33; // C/mol e-
export const MOLAR_MASS_H2_KG = 2.016e-3; // kg/mol
export const MOLAR_MASS_O2_KG = 31.999e-3; // kg/mol
export const H2_LHV_KWH_PER_KG = 33.33; // Lower Heating Value kWh/kg
export const STANDARD_THERMO_WATER_SPLITTING_VOLTAGE = 1.229; // V at 298.15 K

/**
 * Calculates reversible thermodynamic water-splitting voltage as a function of temperature.
 * E_rev(T) = 1.229 - 0.000845 * (T - 298.15)
 */
export function calculateReversibleElectrolysisVoltage(temperatureKelvin: number = 298.15): number {
  return STANDARD_THERMO_WATER_SPLITTING_VOLTAGE - 0.000845 * (temperatureKelvin - 298.15);
}

/**
 * Generates the tandem Photovoltaic J-V curve points.
 * J(V) = J_sc * (G / 1000) * C - J_0 * (exp(qV / (n k T)) - 1)
 */
export function generateTandemJVCurve(
  archConfig: TandemArchitectureConfig,
  passivation: PassivationSpec,
  solarIrradianceWPerM2: number = 1000,
  opticalConcentrationRatio: number = 1.0,
  temperatureC: number = 25
): { voltage: number; currentDensity: number }[] {
  const points: { voltage: number; currentDensity: number }[] = [];
  const C = Math.min(opticalConcentrationRatio, archConfig.maxConcentrationRatio);
  const opticalFactor = (solarIrradianceWPerM2 / 1000) * C * (passivation.opticalTransmittancePct / 100);
  const jsc = archConfig.theoreticalMatchedJscMaPerCm2 * opticalFactor;
  const voc = archConfig.combinedVocVolts + (C > 1 ? 0.059 * Math.log10(C) : 0);

  // Ideality and thermal voltage
  const Vt = (8.6173e-5 * (temperatureC + 273.15)); // k_B * T in eV
  const idealityFactor = 2.2; // dual diode tandem equivalent

  for (let v = 0; v <= voc + 0.05; v += 0.02) {
    let j = 0;
    if (v < voc) {
      // Modified empirical 2-diode solar curve with Fill Factor matching
      const normalizedV = v / voc;
      j = jsc * (1 - Math.pow(normalizedV, 1 / (1 - archConfig.fillFactor)));
      if (j < 0) j = 0;
    } else {
      j = 0;
    }
    points.push({ voltage: parseFloat(v.toFixed(3)), currentDensity: parseFloat(j.toFixed(2)) });
  }

  return points;
}

/**
 * Generates the Electrochemical Water Electrolysis Load Curve.
 * V_EC(J) = E_rev + eta_OER(J) + eta_HER(J) + IR_solution(J)
 */
export function generateElectrochemicalLoadCurve(
  catalyst: CatalystSpec,
  temperatureC: number = 25,
  solutionResistanceOhmCm2: number = 2.0,
  maxCurrentDensityMaPerCm2: number = 40.0
): { currentDensity: number; voltageRequired: number }[] {
  const Erev = calculateReversibleElectrolysisVoltage(temperatureC + 273.15);
  const points: { currentDensity: number; voltageRequired: number }[] = [];

  for (let j = 0.1; j <= maxCurrentDensityMaPerCm2; j += 0.5) {
    // Tafel equation for OER: eta_OER = eta_10 + b_OER * log10(J / 10)
    const logRatio = Math.log10(Math.max(j / 10.0, 0.01));
    const etaOer = catalyst.oerOverpotentialEtaAt10MaV + (catalyst.oerTafelSlopeMvPerDec / 1000) * logRatio;
    const etaHer = catalyst.herOverpotentialEtaAt10MaV + (catalyst.herTafelSlopeMvPerDec / 1000) * logRatio;
    const irDrop = (j / 1000) * solutionResistanceOhmCm2; // J in A/cm2 * Ohm.cm2 = Volts

    const vTotal = Erev + Math.max(etaOer, 0.05) + Math.max(etaHer, 0.01) + irDrop;
    points.push({ currentDensity: parseFloat(j.toFixed(2)), voltageRequired: parseFloat(vTotal.toFixed(3)) });
  }

  return points;
}

/**
 * Solves the operating point (J_op, V_op) by finding the intersection of the Tandem PV curve and the EC load curve.
 */
export function solveOperatingPoint(
  archConfig: TandemArchitectureConfig,
  passivation: PassivationSpec,
  catalyst: CatalystSpec,
  solarIrradianceWPerM2: number = 1000,
  opticalConcentrationRatio: number = 1.0,
  solutionResistanceOhmCm2: number = 2.0,
  temperatureC: number = 25
): OperatingPointResult {
  const C = Math.min(opticalConcentrationRatio, archConfig.maxConcentrationRatio);
  const opticalFactor = (solarIrradianceWPerM2 / 1000) * C * (passivation.opticalTransmittancePct / 100);
  const effectiveJsc = archConfig.theoreticalMatchedJscMaPerCm2 * opticalFactor;
  const voc = archConfig.combinedVocVolts + (C > 1 ? 0.059 * Math.log10(C) : 0);
  const Erev = calculateReversibleElectrolysisVoltage(temperatureC + 273.15);

  // Baseline load at J = 0.5 mA/cm2
  const minLoadV = Erev + catalyst.oerOverpotentialEtaAt10MaV * 0.7 + catalyst.herOverpotentialEtaAt10MaV * 0.7;

  // Check if unassisted water splitting is thermodynamically viable
  if (voc < minLoadV) {
    return {
      operatingVoltageV: voc,
      operatingCurrentDensityMaPerCm2: 0,
      isSpontaneousUnassisted: false,
      requiredExternalBiasV: parseFloat((minLoadV - voc).toFixed(3)),
      thermodynamicVoltageV: Erev,
      oerOverpotentialV: 0,
      herOverpotentialV: 0,
      ohmicDropV: 0,
      solarToHydrogenEfficiencyPct: 0
    };
  }

  // Numerical search for intersection
  let bestJ = 0;
  let bestV = 0;
  let minDiff = 9999;

  for (let j = 0.1; j <= effectiveJsc; j += 0.05) {
    // V_pv from tandem: J = Jsc * (1 - (V/Voc)^(1/(1-FF))) => V = Voc * (1 - J/Jsc)^(1-FF)
    const ratio = Math.max(0, 1 - j / effectiveJsc);
    const vPv = voc * Math.pow(ratio, 1 - archConfig.fillFactor);

    // V_ec from load
    const logRatio = Math.log10(Math.max(j / 10.0, 0.01));
    const etaOer = catalyst.oerOverpotentialEtaAt10MaV + (catalyst.oerTafelSlopeMvPerDec / 1000) * logRatio;
    const etaHer = catalyst.herOverpotentialEtaAt10MaV + (catalyst.herTafelSlopeMvPerDec / 1000) * logRatio;
    // Series resistance includes passivation layer impedance: R_pass = 1 / holeConductance
    const rTotal = solutionResistanceOhmCm2 + (1.0 / Math.max(passivation.holeConductanceMhoPerCm2, 0.01));
    const irDrop = (j / 1000) * rTotal;
    const vEc = Erev + Math.max(etaOer, 0.02) + Math.max(etaHer, 0.01) + irDrop;

    const diff = Math.abs(vPv - vEc);
    if (diff < minDiff) {
      minDiff = diff;
      bestJ = j;
      bestV = vEc;
    }
  }

  const logOp = Math.log10(Math.max(bestJ / 10.0, 0.01));
  const oerOp = catalyst.oerOverpotentialEtaAt10MaV + (catalyst.oerTafelSlopeMvPerDec / 1000) * logOp;
  const herOp = catalyst.herOverpotentialEtaAt10MaV + (catalyst.herTafelSlopeMvPerDec / 1000) * logOp;
  const rTot = solutionResistanceOhmCm2 + (1.0 / Math.max(passivation.holeConductanceMhoPerCm2, 0.01));
  const irOp = (bestJ / 1000) * rTot;

  // STH calculation:
  // STH = (J_op [mA/cm2] * 1.229 V * eta_F) / (P_in [mW/cm2]) * 100%
  // P_in = 100 mW/cm2 * (solarIrradianceWPerM2 / 1000) * C
  const pinMwPerCm2 = 100 * (solarIrradianceWPerM2 / 1000) * C;
  const etaF = catalyst.faradaicEfficiencyPct / 100;
  const sth = (bestJ * STANDARD_THERMO_WATER_SPLITTING_VOLTAGE * etaF / pinMwPerCm2) * 100;

  return {
    operatingVoltageV: parseFloat(bestV.toFixed(3)),
    operatingCurrentDensityMaPerCm2: parseFloat(bestJ.toFixed(2)),
    isSpontaneousUnassisted: true,
    requiredExternalBiasV: 0.0,
    thermodynamicVoltageV: parseFloat(Erev.toFixed(3)),
    oerOverpotentialV: parseFloat(Math.max(oerOp, 0).toFixed(3)),
    herOverpotentialV: parseFloat(Math.max(herOp, 0).toFixed(3)),
    ohmicDropV: parseFloat(irOp.toFixed(3)),
    solarToHydrogenEfficiencyPct: parseFloat(sth.toFixed(2))
  };
}

/**
 * Calculates complete Solar Farm balance of plant, hydrogen generation, and techno-economics.
 */
export function calculatePECSolarFarmBalance(
  archConfig: TandemArchitectureConfig,
  passivation: PassivationSpec,
  catalyst: CatalystSpec,
  collectorAreaM2: number = 1000,
  opticalConcentrationRatio: number = 1.0,
  solarIrradianceWPerM2: number = 1000,
  annualSolarHoursEquivalent: number = 1800,
  h2SellingPriceUsdPerKg: number = 5.00
): PECSolarFarmBalance {
  const op = solveOperatingPoint(archConfig, passivation, catalyst, solarIrradianceWPerM2, opticalConcentrationRatio);
  const C = Math.min(opticalConcentrationRatio, archConfig.maxConcentrationRatio);

  const totalSolarPowerInKw = (solarIrradianceWPerM2 * collectorAreaM2 * C) / 1000;

  // Operating current: J_op [mA/cm2] = J_op * 10 [A/m2]
  // Active cell area: For direct PEC (C=1), active area = collector area.
  // For CPV (C > 1), active semiconductor area = collectorArea / C, but current density is C times higher.
  // Total current = J_op [mA/cm2] * 10 [A/m2] * (collectorArea / C) * (C if direct) = J_op * 10 * collectorArea
  const currentDensityAmpPerM2 = op.operatingCurrentDensityMaPerCm2 * 10.0;
  const totalOperatingCurrentA = currentDensityAmpPerM2 * (collectorAreaM2 / C);

  // Faraday's Law for H2:
  // n_dot_H2 [mol/s] = (I * eta_F) / (2 * F)
  const etaF = catalyst.faradaicEfficiencyPct / 100;
  const molH2PerSecond = (totalOperatingCurrentA * etaF) / (2 * FARADAY_CONSTANT);
  const molO2PerSecond = molH2PerSecond / 2.0;

  const h2KgPerHour = molH2PerSecond * MOLAR_MASS_H2_KG * 3600;
  const o2KgPerHour = molO2PerSecond * MOLAR_MASS_O2_KG * 3600;

  const hydrogenEnergyRateKwLHV = h2KgPerHour * H2_LHV_KWH_PER_KG;

  // Annual figures
  const annualHydrogenProductionTons = (h2KgPerHour * annualSolarHoursEquivalent) / 1000;
  const annualAvoidedCo2Tons = annualHydrogenProductionTons * 10.5; // 10.5 tons CO2 avoided per ton green H2 vs SMR
  const annualRevenueUsd = annualHydrogenProductionTons * 1000 * h2SellingPriceUsdPerKg;

  // Specific energy consumption (kWh of solar or equivalent per kg H2)
  const specificEnergyKwhPerKg = h2KgPerHour > 0 ? totalSolarPowerInKw / h2KgPerHour : 0;

  return {
    collectorAreaM2,
    opticalConcentrationRatio: C,
    solarIrradianceWPerM2,
    totalSolarPowerInKw: parseFloat(totalSolarPowerInKw.toFixed(1)),
    operatingCurrentA: parseFloat(totalOperatingCurrentA.toFixed(1)),
    hydrogenProductionRateKgPerHour: parseFloat(h2KgPerHour.toFixed(3)),
    oxygenProductionRateKgPerHour: parseFloat(o2KgPerHour.toFixed(3)),
    hydrogenEnergyRateKwLHV: parseFloat(hydrogenEnergyRateKwLHV.toFixed(1)),
    annualSolarHoursEquivalent,
    annualHydrogenProductionTonsPerYear: parseFloat(annualHydrogenProductionTons.toFixed(2)),
    annualAvoidedCo2TonsPerYear: parseFloat(annualAvoidedCo2Tons.toFixed(1)),
    annualRevenueUsd: parseFloat(annualRevenueUsd.toFixed(0)),
    specificEnergyConsumptionKwhPerKgH2: parseFloat(specificEnergyKwhPerKg.toFixed(1))
  };
}

/**
 * Simulates long-term operational degradation of passivation layers and STH retention over time.
 */
export function simulateLifetimeDegradation(
  passivation: PassivationSpec,
  simulationDurationHours: number = 4000
): LifetimeDegradationPoint[] {
  const points: LifetimeDegradationPoint[] = [];
  const initialThickness = passivation.thicknessNm;
  const step = Math.max(50, Math.floor(simulationDurationHours / 40));

  for (let t = 0; t <= simulationDurationHours; t += step) {
    if (initialThickness === 0) {
      // Bare unprotected semiconductor
      const active = t < passivation.operationalLifetimeHours;
      const retention = active ? Math.max(0, 100 - (t / passivation.operationalLifetimeHours) * 90) : 0;
      points.push({
        elapsedHours: t,
        passivationRemainingThicknessNm: 0,
        relativeSthRetentionPct: parseFloat(retention.toFixed(1)),
        waterSplittingActive: active
      });
      continue;
    }

    const remainingThickness = Math.max(0, initialThickness - t * passivation.corrosionRateNmPerHour);
    const active = remainingThickness > 0.5 && t < passivation.operationalLifetimeHours;

    let retention = 100;
    if (active) {
      // Slight degradation due to catalyst leaching or interfacial trap accumulation (~5-10% over lifetime)
      retention = 100 - (t / passivation.operationalLifetimeHours) * 8.0;
    } else {
      retention = 0;
    }

    points.push({
      elapsedHours: t,
      passivationRemainingThicknessNm: parseFloat(remainingThickness.toFixed(2)),
      relativeSthRetentionPct: parseFloat(Math.max(retention, 0).toFixed(1)),
      waterSplittingActive: active
    });
  }

  return points;
}
