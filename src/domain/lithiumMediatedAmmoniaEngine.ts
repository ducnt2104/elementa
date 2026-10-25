// src/domain/lithiumMediatedAmmoniaEngine.ts
// Lithium-Mediated Electrochemical Nitrogen Reduction (Li-NRR) & Ambient Green Ammonia Synthesis Engine
// Conforms to: IUPAC Electrochemical Nomenclature, Solid Electrolyte Interphase (SEI) Transport, Vietnam GDPT 2018 Chemistry

export type NonAqueousSolventType =
  | 'TETRAHYDROFURAN_THF'
  | 'CYCLOPENTYL_METHYL_ETHER_CPME'
  | 'DIMETHOXYETHANE_DME'
  | 'PROPYLENE_CARBONATE_PC';

export type ProtonShuttleAlcoholType =
  | 'ETHANOL_ETOH'
  | 'ONE_BUTANOL_BUOH'
  | 'PHENOL_WEAK_ACID'
  | 'ISOPROPANOL_IPROH';

export type SeiAdditiveEngineType =
  | 'OXYGEN_GAS_DOPING_1VOL'
  | 'FLUOROETHYLENE_CARBONATE_FEC'
  | 'LIFSI_FLUORINATED_SALT'
  | 'PRISTINE_NO_ADDITIVE';

export interface SolventProperties {
  id: NonAqueousSolventType;
  name: string;
  dielectricConstant: number;
  viscosityCP: number;
  n2SolubilityMolPerM3: number; // Nitrogen solubility at 25°C, 1 bar
  electrochemicalStabilityWindowV: [number, number]; // vs Li/Li+
  volatilityVaporPressureKPa: number;
  description: string;
}

export interface ProtonShuttleProperties {
  id: ProtonShuttleAlcoholType;
  name: string;
  chemicalFormula: string;
  pKaInSolvent: number;
  diffusionCoefficientCm2PerS: number;
  optimalConcentrationVolPct: number;
  protonDonationRateConstant: number;
  description: string;
}

export interface SeiAdditiveProperties {
  id: SeiAdditiveEngineType;
  name: string;
  seiCompositionPrimary: string;
  liIonConductivitySPerCm: number;
  parasiticHerSuppressionFactor: number; // Multiplier on selectivity
  cycleStabilityHours: number;
  description: string;
}

export interface LiNrrOperatingPoint {
  cellVoltageVolts: number;
  currentDensityMaPerCm2: number;
  faradaicEfficiencyPct: number;
  ammoniaYieldRateNmolPerSCm2: number;
  hydrogenParasiticRateNmolPerSCm2: number;
  specificEnergyConsumptionKwhPerKgNh3: number;
  isContinuousOperationStable: boolean;
  limitingMechanism: 'N2_DIFFUSION' | 'PROTON_TRANSFER' | 'SEI_BREAKDOWN' | 'OPTIMAL_BALANCED';
}

export interface AmmoniaPlantMassEnergyBalance {
  stackAreaM2: number;
  operatingCurrentA: number;
  nitrogenFeedRateKgPerHour: number;
  hydrogenAnodicFeedKgPerHour: number;
  ammoniaProductionKgPerHour: number;
  parasiticHydrogenVentedKgPerHour: number;
  electricPowerConsumptionKw: number;
  annualAmmoniaProductionTonsPerYear: number; // 8,000 hrs/year
  annualAvoidedCo2TonsPerYear: number;        // vs Haber-Bosch (1.8 t CO2/t NH3)
  annualRevenueUsd: number;                   // at $800/ton green NH3
}

// ------------------------------------------------------------------------------------------------
// CATALOGS & REACTION CONSTANTS
// ------------------------------------------------------------------------------------------------

export const FARADAY_CONSTANT = 96485.33; // C/mol e-
export const MOLAR_MASS_NH3_KG = 17.031e-3; // kg/mol
export const MOLAR_MASS_N2_KG = 28.014e-3; // kg/mol
export const MOLAR_MASS_H2_KG = 2.016e-3; // kg/mol

export const SOLVENT_CATALOG: Record<NonAqueousSolventType, SolventProperties> = {
  TETRAHYDROFURAN_THF: {
    id: 'TETRAHYDROFURAN_THF',
    name: 'Tetrahydrofuran (THF / LiFSI 1.0 M)',
    dielectricConstant: 7.58,
    viscosityCP: 0.46,
    n2SolubilityMolPerM3: 4.8,
    electrochemicalStabilityWindowV: [-0.2, 4.2],
    volatilityVaporPressureKPa: 19.3,
    description: 'Benchmark ether solvent for lithium-mediated NRR. Facilitates rapid Li+ solvation and high N2 solubility, requiring vapor condensation loops.'
  },
  CYCLOPENTYL_METHYL_ETHER_CPME: {
    id: 'CYCLOPENTYL_METHYL_ETHER_CPME',
    name: 'Cyclopentyl Methyl Ether (CPME)',
    dielectricConstant: 4.76,
    viscosityCP: 0.85,
    n2SolubilityMolPerM3: 5.4,
    electrochemicalStabilityWindowV: [-0.3, 4.5],
    volatilityVaporPressureKPa: 4.5,
    description: 'Low-volatility green ether solvent with high boiling point (106°C), superior resistance to peroxide formation and excellent continuous gas bubbling stability.'
  },
  DIMETHOXYETHANE_DME: {
    id: 'DIMETHOXYETHANE_DME',
    name: '1,2-Dimethoxyethane (DME)',
    dielectricConstant: 7.20,
    viscosityCP: 0.45,
    n2SolubilityMolPerM3: 4.2,
    electrochemicalStabilityWindowV: [-0.1, 4.1],
    volatilityVaporPressureKPa: 6.4,
    description: 'Bidentate chelating ether providing ultra-low charge transfer resistance for Li+ deposition, widely used in secondary lithium battery research.'
  },
  PROPYLENE_CARBONATE_PC: {
    id: 'PROPYLENE_CARBONATE_PC',
    name: 'Propylene Carbonate (PC)',
    dielectricConstant: 64.9,
    viscosityCP: 2.53,
    n2SolubilityMolPerM3: 2.1,
    electrochemicalStabilityWindowV: [-0.1, 4.8],
    volatilityVaporPressureKPa: 0.04,
    description: 'High-dielectric carbonate solvent with low volatility, but lower N2 solubility and propensity for irreversible co-intercalation exfoliation on carbon cathodes.'
  }
};

export const PROTON_SHUTTLE_CATALOG: Record<ProtonShuttleAlcoholType, ProtonShuttleProperties> = {
  ETHANOL_ETOH: {
    id: 'ETHANOL_ETOH',
    name: 'Ethanol (EtOH, 0.5 - 1.0 vol%)',
    chemicalFormula: 'CH3CH2OH',
    pKaInSolvent: 15.9,
    diffusionCoefficientCm2PerS: 1.2e-5,
    optimalConcentrationVolPct: 0.8,
    protonDonationRateConstant: 45.0,
    description: 'Classic proton shuttle with balanced kinetics: sufficiently acidic to rapidly protonate Li3N to NH3 while minimizing direct parasitic reduction on metallic Li.'
  },
  ONE_BUTANOL_BUOH: {
    id: 'ONE_BUTANOL_BUOH',
    name: '1-Butanol (n-BuOH, 1.0 - 2.0 vol%)',
    chemicalFormula: 'CH3(CH2)3OH',
    pKaInSolvent: 16.1,
    diffusionCoefficientCm2PerS: 0.85e-5,
    optimalConcentrationVolPct: 1.5,
    protonDonationRateConstant: 32.0,
    description: 'Longer alkyl chain reduces diffusion across the compact SEI, suppressing proton crossover and elevating Faradaic efficiency up to >70%.'
  },
  PHENOL_WEAK_ACID: {
    id: 'PHENOL_WEAK_ACID',
    name: 'Phenol / Fluorophenol Shuttle',
    chemicalFormula: 'C6H5OH',
    pKaInSolvent: 10.0,
    diffusionCoefficientCm2PerS: 0.95e-5,
    optimalConcentrationVolPct: 0.3,
    protonDonationRateConstant: 180.0,
    description: 'Stronger proton donor with lower pKa, driving fast protonation of nitride but requiring strict sub-percent dosing to avoid rapid hydrogen evolution.'
  },
  ISOPROPANOL_IPROH: {
    id: 'ISOPROPANOL_IPROH',
    name: 'Isopropanol (i-PrOH, 1.0 vol%)',
    chemicalFormula: '(CH3)2CHOH',
    pKaInSolvent: 16.5,
    diffusionCoefficientCm2PerS: 0.90e-5,
    optimalConcentrationVolPct: 1.0,
    protonDonationRateConstant: 25.0,
    description: 'Sterically hindered secondary alcohol exhibiting slow parasitic reaction with metallic lithium, offering good stability during prolonged runs.'
  }
};

export const SEI_ADDITIVE_CATALOG: Record<SeiAdditiveEngineType, SeiAdditiveProperties> = {
  OXYGEN_GAS_DOPING_1VOL: {
    id: 'OXYGEN_GAS_DOPING_1VOL',
    name: '0.5 - 1.0 vol% O₂ Gas Doping in N₂ Feed',
    seiCompositionPrimary: 'Amorphous Li2O / LiOH passivating matrix',
    liIonConductivitySPerCm: 1.8e-6,
    parasiticHerSuppressionFactor: 2.4,
    cycleStabilityHours: 120,
    description: 'Controlled trace oxygen feed in-situ forms a dense, cohesive Li2O-rich SEI that selectively blocks alcohol proton penetration while permitting N2 diffusion and rapid Li+ flux.'
  },
  FLUOROETHYLENE_CARBONATE_FEC: {
    id: 'FLUOROETHYLENE_CARBONATE_FEC',
    name: 'Fluoroethylene Carbonate (FEC 2.0 vol%)',
    seiCompositionPrimary: 'Nanocrystalline LiF / Polycarbonate interphase',
    liIonConductivitySPerCm: 2.5e-6,
    parasiticHerSuppressionFactor: 2.1,
    cycleStabilityHours: 85,
    description: 'Sacrificial reduction of FEC generates a conformal LiF-rich interphase possessing high mechanical modulus that suppresses lithium dendrite formation.'
  },
  LIFSI_FLUORINATED_SALT: {
    id: 'LIFSI_FLUORINATED_SALT',
    name: 'High-Concentration LiFSI (2.0 M)',
    seiCompositionPrimary: 'Inorganic LiF - Li2S - Li3N composite SEI',
    liIonConductivitySPerCm: 3.2e-6,
    parasiticHerSuppressionFactor: 1.9,
    cycleStabilityHours: 150,
    description: 'Anion-derived fluorinated interphase with low activation barrier for Li stripping and plating, enabling stable operation under elevated current densities.'
  },
  PRISTINE_NO_ADDITIVE: {
    id: 'PRISTINE_NO_ADDITIVE',
    name: 'Pristine Electrolyte (No Additives)',
    seiCompositionPrimary: 'Organic lithium alkoxide / alkyl carbonate porous film',
    liIonConductivitySPerCm: 0.5e-6,
    parasiticHerSuppressionFactor: 1.0,
    cycleStabilityHours: 12,
    description: 'Lacks dense inorganic passivating layers. Loose organic SEI allows rapid proton attack on metallic lithium, dropping Faradaic efficiency below 25% within hours.'
  }
};

// ------------------------------------------------------------------------------------------------
// KINETIC & MASS BALANCE FUNCTIONS
// ------------------------------------------------------------------------------------------------

/**
 * Calculates operating current density, Faradaic efficiency, and NH3 yield rate.
 * Reaction: N2 + 6 Li+ + 6 e- -> 2 Li3N
 *           Li3N + 3 ROH -> 3 LiOR + NH3
 * Overall: N2 + 6 H+ + 6 e- -> 2 NH3  (3 e- per NH3 formed)
 */
export function calculateLiNrrOperatingPoint(
  solvent: SolventProperties,
  shuttle: ProtonShuttleProperties,
  sei: SeiAdditiveProperties,
  appliedCellVoltageV: number = 3.8,
  n2PressureBar: number = 20.0,
  shuttleConcentrationVolPct: number = 0.8,
  temperatureC: number = 25
): LiNrrOperatingPoint {
  // Pressure enhances N2 solubility Henry's law: C_N2 = C_0 * (P / 1 bar)
  const effectiveN2Concentration = solvent.n2SolubilityMolPerM3 * (n2PressureBar / 1.0);

  // Overpotential driving current: V_cell - V_thermo (approx 3.0 V)
  const overpotential = Math.max(0.1, appliedCellVoltageV - 3.0);
  const baseCurrentDensityMaPerCm2 = 5.0 * Math.exp(overpotential / 0.35);

  // Faradaic efficiency model:
  // Dictated by local dissolved N2 concentration vs proton shuttle availability and SEI shielding
  const n2Saturation = Math.min(2.5, effectiveN2Concentration / 80.0);
  const protonRatio = shuttleConcentrationVolPct / shuttle.optimalConcentrationVolPct;
  const protonPenalty = protonRatio >= 1.0 ? Math.pow(protonRatio, 1.2) : (1.0 / Math.max(0.2, protonRatio));

  let baseFe = 28.0 * Math.pow(n2Saturation, 0.7) / protonPenalty;
  baseFe = baseFe * sei.parasiticHerSuppressionFactor;

  // Cap physical Faradaic efficiency between 5% and 82%
  const faradaicEfficiencyPct = Math.min(78.5, Math.max(5.0, baseFe));

  // Current partition:
  // J_NH3 = J_total * (FE / 100)
  // J_H2 = J_total * (1 - FE / 100)
  const currentDensityMaPerCm2 = Math.min(150.0, baseCurrentDensityMaPerCm2);
  const jNh3MaPerCm2 = currentDensityMaPerCm2 * (faradaicEfficiencyPct / 100);
  const jH2MaPerCm2 = currentDensityMaPerCm2 * (1 - faradaicEfficiencyPct / 100);

  // Yield rates by Faraday's Law:
  // 3 electrons per NH3 molecule:
  // Rate [mol/(s cm2)] = (J_NH3 [A/cm2]) / (3 * F)
  const rateNh3MolPerSCm2 = (jNh3MaPerCm2 / 1000) / (3 * FARADAY_CONSTANT);
  const rateNh3NmolPerSCm2 = rateNh3MolPerSCm2 * 1e9;

  // 2 electrons per H2 molecule:
  const rateH2MolPerSCm2 = (jH2MaPerCm2 / 1000) / (2 * FARADAY_CONSTANT);
  const rateH2NmolPerSCm2 = rateH2MolPerSCm2 * 1e9;

  // Specific energy consumption:
  // Energy = (Cell Voltage * Current * time) / mass_NH3
  // mass_NH3 = (Current * FE / (3 * F)) * M_NH3
  // Specific Energy [kWh/kg NH3] = (Cell Voltage [V] * 3 * F) / (FE/100 * M_NH3 * 3600 * 1000)
  const specificEnergyKwhPerKgNh3 =
    (appliedCellVoltageV * 3 * FARADAY_CONSTANT) /
    ((faradaicEfficiencyPct / 100) * MOLAR_MASS_NH3_KG * 3600 * 1000);

  let limitingMechanism: 'N2_DIFFUSION' | 'PROTON_TRANSFER' | 'SEI_BREAKDOWN' | 'OPTIMAL_BALANCED' = 'OPTIMAL_BALANCED';
  if (n2PressureBar < 5.0) {
    limitingMechanism = 'N2_DIFFUSION';
  } else if (protonRatio > 2.0 || sei.id === 'PRISTINE_NO_ADDITIVE') {
    limitingMechanism = 'SEI_BREAKDOWN';
  } else if (protonRatio < 0.4) {
    limitingMechanism = 'PROTON_TRANSFER';
  }

  const isContinuousOperationStable = sei.cycleStabilityHours >= 50 && faradaicEfficiencyPct >= 40.0;

  return {
    cellVoltageVolts: appliedCellVoltageV,
    currentDensityMaPerCm2: parseFloat(currentDensityMaPerCm2.toFixed(2)),
    faradaicEfficiencyPct: parseFloat(faradaicEfficiencyPct.toFixed(1)),
    ammoniaYieldRateNmolPerSCm2: parseFloat(rateNh3NmolPerSCm2.toFixed(2)),
    hydrogenParasiticRateNmolPerSCm2: parseFloat(rateH2NmolPerSCm2.toFixed(2)),
    specificEnergyConsumptionKwhPerKgNh3: parseFloat(specificEnergyKwhPerKgNh3.toFixed(1)),
    isContinuousOperationStable,
    limitingMechanism
  };
}

/**
 * Calculates continuous industrial Ammonia Plant balance of plant, feeds, and avoided emissions.
 */
export function calculateAmmoniaPlantBalance(
  operatingPoint: LiNrrOperatingPoint,
  stackAreaM2: number = 200,
  annualOperatingHours: number = 8000,
  greenNh3PriceUsdPerTon: number = 800
): AmmoniaPlantMassEnergyBalance {
  // Total current: I [A] = J [mA/cm2] * 10 [A/m2] * stackArea [m2]
  const totalCurrentA = operatingPoint.currentDensityMaPerCm2 * 10.0 * stackAreaM2;

  // Faradaic current for NH3
  const nh3CurrentA = totalCurrentA * (operatingPoint.faradaicEfficiencyPct / 100);
  const h2ParasiticCurrentA = totalCurrentA - nh3CurrentA;

  // Faraday stoichiometry for NH3 (3 e- per NH3):
  const molNh3PerSecond = nh3CurrentA / (3 * FARADAY_CONSTANT);
  const nh3KgPerHour = molNh3PerSecond * MOLAR_MASS_NH3_KG * 3600;

  // Stoichiometric N2 feed needed: 1/2 mol N2 per mol NH3
  const molN2PerSecond = molNh3PerSecond / 2.0;
  const n2FeedKgPerHour = molN2PerSecond * MOLAR_MASS_N2_KG * 3600;

  // Stoichiometric H2 feed at anode: 3/2 mol H2 per mol NH3 (assuming H2 oxidation anode)
  const molH2AnodicPerSecond = (molNh3PerSecond * 3.0) / 2.0;
  const h2AnodicKgPerHour = molH2AnodicPerSecond * MOLAR_MASS_H2_KG * 3600;

  // Parasitic H2 vented at cathode:
  const molH2CathodicPerSecond = h2ParasiticCurrentA / (2 * FARADAY_CONSTANT);
  const h2CathodicVentedKgPerHour = molH2CathodicPerSecond * MOLAR_MASS_H2_KG * 3600;

  // Electric Power: P = I * V [W] / 1000 = kW
  const electricPowerConsumptionKw = (totalCurrentA * operatingPoint.cellVoltageVolts) / 1000;

  // Annual production
  const annualNh3Tons = (nh3KgPerHour * annualOperatingHours) / 1000;
  // Haber-Bosch emits ~1.8 tons CO2 per ton of NH3:
  const annualAvoidedCo2Tons = annualNh3Tons * 1.8;
  const annualRevenueUsd = annualNh3Tons * greenNh3PriceUsdPerTon;

  return {
    stackAreaM2,
    operatingCurrentA: parseFloat(totalCurrentA.toFixed(1)),
    nitrogenFeedRateKgPerHour: parseFloat(n2FeedKgPerHour.toFixed(2)),
    hydrogenAnodicFeedKgPerHour: parseFloat(h2AnodicKgPerHour.toFixed(2)),
    ammoniaProductionKgPerHour: parseFloat(nh3KgPerHour.toFixed(2)),
    parasiticHydrogenVentedKgPerHour: parseFloat(h2CathodicVentedKgPerHour.toFixed(2)),
    electricPowerConsumptionKw: parseFloat(electricPowerConsumptionKw.toFixed(1)),
    annualAmmoniaProductionTonsPerYear: parseFloat(annualNh3Tons.toFixed(1)),
    annualAvoidedCo2TonsPerYear: parseFloat(annualAvoidedCo2Tons.toFixed(1)),
    annualRevenueUsd: parseFloat(annualRevenueUsd.toFixed(0))
  };
}
