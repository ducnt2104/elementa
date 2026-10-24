/**
 * ELEMENTA - DIRECT LITHIUM EXTRACTION (DLE) & GEOTHERMAL BRINE ION-SIEVE ENGINE
 *
 * Conforms to:
 * - IUPAC Ion Exchange & Coordination Thermodynamics
 * - IEA Critical Minerals Market Review 2024 (Battery-Grade Lithium Supply)
 * - Benchmark DLE Chemistries: Manganese/Titanium Oxide Sieve (HMO/HTO) & Layered Double Hydroxide (Al-LDH)
 * - Vietnam GDPT 2018 Chemistry Grade 12 (Kim loại kiềm, Bán kính ion, Trao đổi ion, Tích số tan Ksp & Pin Lithium-ion)
 */

export type DleTechnologyType = 'MANGANESE_ION_SIEVE' | 'ALUMINUM_LDH_SORBENT' | 'ELECTROCHEMICAL_INTERCALATION';

export interface BrineComposition {
  name: string;
  sourceType: 'GEOTHERMAL' | 'CONTINENTAL_SALAR' | 'OILFIELD_PRODUCED_WATER';
  temperatureC: number;
  liPpm: number;          // Lithium concentration in mg/L (ppm)
  naPpm: number;          // Sodium concentration
  kPpm: number;           // Potassium concentration
  mgPpm: number;          // Magnesium concentration (the critical competitor!)
  caPpm: number;          // Calcium concentration
  totalDissolvedSolidsG_L: number;
  mgToLiMassRatio: number; // Ratio > 10 makes traditional evaporation impossible
}

export interface DleOperatingConditions {
  brineFlowRateM3h: number;        // Brine feed rate in m³/h (e.g. 500 m³/h)
  sorbentBedVolumeM3: number;       // Volume of ion-exchange column
  operatingCycleMinutes: number;   // Adsorption / desorption cycle time (typ. 60 - 120 mins)
  acidElutionConcentrationM?: number; // HCl molarity for acid-eluted sieves (0.1 - 0.5 M)
  elutionTempC: number;             // Temperature of water/acid wash (50 - 85°C)
  heatRecoveryEnabled: boolean;
  electricityPriceUsdKwh: number;
  hydrochloricAcidPriceUsdTon: number; // Price of HCl 32% (~$120/ton)
  sodaAshPriceUsdTon: number;          // Price of Na2CO3 for precipitation (~$300/ton)
}

export interface DleKineticsResult {
  technology: DleTechnologyType;
  techName: string;
  brineProcessedM3Day: number;
  liInflowKgDay: number;
  recoveryEfficiencyPct: number;
  liExtractedKgDay: number;
  lceProductionTonsYear: number; // Lithium Carbonate Equivalent (LCE: Li2CO3 has 18.78% Li -> factor 5.323)
  selectivityLiOverMg: number;
  selectivityLiOverNa: number;
  purityEluatePct: number;
  waterConsumptionM3PerTonLce: number; // DLE vs Evaporation pond benchmark
  energyConsumptionKwhPerKgLce: number;
  operatingCostsBreakdown: {
    reagentsCostPerKgLce: number;   // HCl, NaOH, Na2CO3
    electricityCostPerKgLce: number;
    thermalCostPerKgLce: number;
    sorbentDepreciationPerKgLce: number;
    totalOpexPerKgLce: number;
    totalOpexPerTonLce: number;
  };
  traditionalEvaporationComparison: {
    evaporationFootprintKm2: number;
    evaporationLeadTimeMonths: number;
    evaporationRecoveryPct: number;
    dleWaterSavingsM3Year: number;
  };
}

export interface IonSieveStericSpec {
  ion: string;
  symbol: string;
  ionicRadiusAngstrom: number;
  hydratedRadiusAngstrom: number;
  hydrationEnthalpyKjMol: number;
  sieveStericFit: 'PERFECT_FIT' | 'EXCLUDED_TOO_LARGE' | 'EXCLUDED_HIGH_HYDRATION_ENERGY';
}

export const KNOWN_BRINE_RESERVOIRS: BrineComposition[] = [
  {
    name: 'Salton Sea Geothermal (California, USA)',
    sourceType: 'GEOTHERMAL',
    temperatureC: 110,
    liPpm: 220,
    naPpm: 55000,
    kPpm: 18000,
    mgPpm: 350,
    caPpm: 28000,
    totalDissolvedSolidsG_L: 250,
    mgToLiMassRatio: 1.59
  },
  {
    name: 'Upper Rhine Graben Geothermal (Germany/France)',
    sourceType: 'GEOTHERMAL',
    temperatureC: 160,
    liPpm: 180,
    naPpm: 26000,
    kPpm: 3200,
    mgPpm: 120,
    caPpm: 6800,
    totalDissolvedSolidsG_L: 110,
    mgToLiMassRatio: 0.67
  },
  {
    name: 'Salar de Atacama (Chile - High Mg)',
    sourceType: 'CONTINENTAL_SALAR',
    temperatureC: 25,
    liPpm: 1400,
    naPpm: 75000,
    kPpm: 19000,
    mgPpm: 8800,
    caPpm: 450,
    totalDissolvedSolidsG_L: 320,
    mgToLiMassRatio: 6.29
  },
  {
    name: 'Smackover Oilfield Formation (Arkansas, USA)',
    sourceType: 'OILFIELD_PRODUCED_WATER',
    temperatureC: 80,
    liPpm: 350,
    naPpm: 68000,
    kPpm: 2500,
    mgPpm: 2800,
    caPpm: 32000,
    totalDissolvedSolidsG_L: 280,
    mgToLiMassRatio: 8.00
  }
];

export const ION_STERIC_PROFILES: IonSieveStericSpec[] = [
  {
    ion: 'Lithium (Li⁺)',
    symbol: 'Li⁺',
    ionicRadiusAngstrom: 0.76,
    hydratedRadiusAngstrom: 3.82,
    hydrationEnthalpyKjMol: -519,
    sieveStericFit: 'PERFECT_FIT'
  },
  {
    ion: 'Magnesium (Mg²⁺)',
    symbol: 'Mg²⁺',
    ionicRadiusAngstrom: 0.72,
    hydratedRadiusAngstrom: 4.28,
    hydrationEnthalpyKjMol: -1921,
    sieveStericFit: 'EXCLUDED_HIGH_HYDRATION_ENERGY'
  },
  {
    ion: 'Sodium (Na⁺)',
    symbol: 'Na⁺',
    ionicRadiusAngstrom: 1.02,
    hydratedRadiusAngstrom: 3.58,
    hydrationEnthalpyKjMol: -409,
    sieveStericFit: 'EXCLUDED_TOO_LARGE'
  },
  {
    ion: 'Calcium (Ca²⁺)',
    symbol: 'Ca²⁺',
    ionicRadiusAngstrom: 1.00,
    hydratedRadiusAngstrom: 4.12,
    hydrationEnthalpyKjMol: -1577,
    sieveStericFit: 'EXCLUDED_TOO_LARGE'
  },
  {
    ion: 'Potassium (K⁺)',
    symbol: 'K⁺',
    ionicRadiusAngstrom: 1.38,
    hydratedRadiusAngstrom: 3.31,
    hydrationEnthalpyKjMol: -322,
    sieveStericFit: 'EXCLUDED_TOO_LARGE'
  }
];

const LCE_FACTOR = 5.323; // 1 kg Li = 5.323 kg Li2CO3 (Lithium Carbonate Equivalent)

/**
 * Simulates DLE performance, recovery rates, selectivity, chemical reagent consumption and economics.
 */
export function simulateDlePerformance(
  tech: DleTechnologyType,
  brine: BrineComposition,
  conditions: DleOperatingConditions
): DleKineticsResult {
  const {
    brineFlowRateM3h,
    acidElutionConcentrationM = 0.25,
    elutionTempC,
    heatRecoveryEnabled,
    electricityPriceUsdKwh,
    hydrochloricAcidPriceUsdTon,
    sodaAshPriceUsdTon
  } = conditions;

  const brineProcessedM3Day = brineFlowRateM3h * 24;
  // Li inflow in kg/day: (m³/day * 1000 L/m³ * ppm mg/L) / 1e6 mg/kg = m³/day * ppm / 1000
  const liInflowKgDay = (brineProcessedM3Day * brine.liPpm) / 1000;

  let recoveryEfficiencyPct = 0;
  let selectivityLiOverMg = 0;
  let selectivityLiOverNa = 0;
  let purityEluatePct = 0;
  let waterConsumptionM3PerTonLce = 0;
  let energyConsumptionKwhPerKgLce = 0;
  let acidConsumptionKgPerKgLi = 0; // kg HCl 100% per kg Li extracted
  let sorbentDepreciationPerKgLce = 0;

  if (tech === 'MANGANESE_ION_SIEVE') {
    // Manganese oxide (HMO / Li1+xMn2-xO4) has highest selectivity and fits high-temperature brines
    recoveryEfficiencyPct = 92.5;
    selectivityLiOverMg = 3200; // Steric rejection of hydrated Mg²⁺
    selectivityLiOverNa = 4800; // Size exclusion of 1.02 Å Na⁺
    purityEluatePct = 99.4;
    waterConsumptionM3PerTonLce = 3.5; // Closed loop water wash
    energyConsumptionKwhPerKgLce = 4.2;
    acidConsumptionKgPerKgLi = 5.4;    // Stoichiometric H⁺ replacement of Li⁺
    sorbentDepreciationPerKgLce = 0.45; // ~0.2% manganese dissolution per acid cycle
  } else if (tech === 'ALUMINUM_LDH_SORBENT') {
    // Aluminum layered double hydroxide (Al-LDH / Gibbsite) elutes with hot pure water (no acid!)
    recoveryEfficiencyPct = 87.0;
    selectivityLiOverMg = 1800;
    selectivityLiOverNa = 2200;
    purityEluatePct = 98.2;
    waterConsumptionM3PerTonLce = 5.8; // Higher water wash volume
    energyConsumptionKwhPerKgLce = 5.8; // Thermal heat required to warm wash water
    acidConsumptionKgPerKgLi = 0.0;    // Zero acid consumption! Water-eluted!
    sorbentDepreciationPerKgLce = 0.25; // Highly stable LDH structure
  } else {
    // Electrochemical intercalation (LiFePO4 / λ-MnO2)
    recoveryEfficiencyPct = 84.0;
    selectivityLiOverMg = 2100;
    selectivityLiOverNa = 3500;
    purityEluatePct = 98.8;
    waterConsumptionM3PerTonLce = 2.2;
    energyConsumptionKwhPerKgLce = 6.5; // Electrical potential applied across flow cell
    acidConsumptionKgPerKgLi = 0.0;
    sorbentDepreciationPerKgLce = 0.60;
  }

  // Temperature boost on kinetics if geothermal brine is hot (> 80°C)
  if (brine.temperatureC >= 100) {
    recoveryEfficiencyPct = Math.min(96.0, recoveryEfficiencyPct * 1.03);
  }

  const liExtractedKgDay = liInflowKgDay * (recoveryEfficiencyPct / 100);
  const lceProductionTonsYear = (liExtractedKgDay * 365 * LCE_FACTOR) / 1000;

  // OPEX Breakdown per kg LCE:
  // Soda ash stoichiometry: 2 Li⁺ + Na₂CO₃ -> Li₂CO₃↓ + 2 Na⁺
  // 1 mol Na2CO3 (105.99 g) precipitates 1 mol Li2CO3 (73.89 g)
  // 1.434 kg Na2CO3 per kg Li2CO3 (LCE)
  const sodaAshCostPerKgLce = 1.434 * (sodaAshPriceUsdTon / 1000);
  // Acid cost: acidConsumptionKgPerKgLi / LCE_FACTOR (converted from 32% industrial HCl)
  const acidCostPerKgLce = (acidConsumptionKgPerKgLi / LCE_FACTOR) * 3.125 * (hydrochloricAcidPriceUsdTon / 1000);
  const reagentsCostPerKgLce = parseFloat((sodaAshCostPerKgLce + acidCostPerKgLce).toFixed(2));

  let thermalEnergyKwhPerKgLce = 2.5;
  if (heatRecoveryEnabled || brine.temperatureC >= 100) {
    thermalEnergyKwhPerKgLce = 0.5; // Direct use of geothermal heat
  }
  const thermalCostPerKgLce = parseFloat((thermalEnergyKwhPerKgLce * 0.02).toFixed(2));
  const electricityCostPerKgLce = parseFloat((energyConsumptionKwhPerKgLce * electricityPriceUsdKwh).toFixed(2));

  const totalOpexPerKgLce = parseFloat(
    (reagentsCostPerKgLce + electricityCostPerKgLce + thermalCostPerKgLce + sorbentDepreciationPerKgLce + 0.35).toFixed(2)
  );
  const totalOpexPerTonLce = parseFloat((totalOpexPerKgLce * 1000).toFixed(0));

  // Comparison against massive traditional Salar evaporation ponds:
  // Traditional ponds lose ~250 m³ water per ton LCE by solar evaporation, take 18 months, recovery only ~45%
  const evaporationRecoveryPct = 48.0;
  const evaporationLeadTimeMonths = 18;
  const evaporationFootprintKm2 = parseFloat(((lceProductionTonsYear / 20000) * 15).toFixed(1)); // 20k tons takes ~15 km²
  const traditionalWaterLostM3Year = lceProductionTonsYear * 250;
  const dleWaterUsedM3Year = lceProductionTonsYear * waterConsumptionM3PerTonLce;
  const dleWaterSavingsM3Year = Math.max(0, traditionalWaterLostM3Year - dleWaterUsedM3Year);

  return {
    technology: tech,
    techName:
      tech === 'MANGANESE_ION_SIEVE'
        ? 'Sàng Ion Oxit Mangan Axit (HMO Ion Sieve)'
        : tech === 'ALUMINUM_LDH_SORBENT'
        ? 'Hấp Phụ Nhôm Hydroxit Xen Lớp (Al-LDH Sorbent)'
        : 'Bơm Khử Xen Lớp Điện Hóa (Electrochemical Pumping)',
    brineProcessedM3Day: parseFloat(brineProcessedM3Day.toFixed(0)),
    liInflowKgDay: parseFloat(liInflowKgDay.toFixed(1)),
    recoveryEfficiencyPct: parseFloat(recoveryEfficiencyPct.toFixed(1)),
    liExtractedKgDay: parseFloat(liExtractedKgDay.toFixed(1)),
    lceProductionTonsYear: parseFloat(lceProductionTonsYear.toFixed(1)),
    selectivityLiOverMg,
    selectivityLiOverNa,
    purityEluatePct,
    waterConsumptionM3PerTonLce: parseFloat(waterConsumptionM3PerTonLce.toFixed(1)),
    energyConsumptionKwhPerKgLce: parseFloat(energyConsumptionKwhPerKgLce.toFixed(1)),
    operatingCostsBreakdown: {
      reagentsCostPerKgLce,
      electricityCostPerKgLce,
      thermalCostPerKgLce,
      sorbentDepreciationPerKgLce,
      totalOpexPerKgLce,
      totalOpexPerTonLce
    },
    traditionalEvaporationComparison: {
      evaporationFootprintKm2,
      evaporationLeadTimeMonths,
      evaporationRecoveryPct,
      dleWaterSavingsM3Year: parseFloat(dleWaterSavingsM3Year.toFixed(0))
    }
  };
}
