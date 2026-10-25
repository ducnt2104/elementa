// src/domain/electrochemicalCarbonMonoxideReductionEngine.ts
// Domain Engine: Electrochemical Carbon Monoxide Reduction (CO-RR) to Multi-Carbon Alcohols (C2+)
// Conforms strictly to IUPAC electrocatalysis standards and Vietnam GDPT 2018 Organic & Redox Chemistry.

export type CuCatalystMorphologyType =
  | 'OXIDE_DERIVED_COPPER_OD_CU'
  | 'COPPER_FACET_CU100_NANOCUBES'
  | 'BORON_DOPED_COPPER_B_CU'
  | 'BIMETALLIC_CU_AG_TANDEM';

export type CorrPrimaryTargetProduct =
  | 'ETHANOL_C2H5OH'
  | 'ETHYLENE_C2H4'
  | 'ACETATE_CH3COO'
  | 'N_PROPANOL_C3H7OH';

export type CorrElectrolyteType =
  | 'AQUEOUS_KOH_1M'
  | 'AQUEOUS_KHCO3_0_5M'
  | 'PURE_WATER_AEM_ZERO_GAP';

export interface CuCatalystConfig {
  id: CuCatalystMorphologyType;
  name: string;
  activeFacets: string;
  coAdsorptionFreeEnergyEv: number; // ΔG(*CO) in eV
  ccCouplingKineticBarrierEv: number; // Activation energy for *CO-*CO dimerization
  maxStableCurrentDensityMacm2: number; // mA/cm2
  c2PlusFaradaicEfficiencyPct: number; // % FE towards C2+ products
  preferredProduct: CorrPrimaryTargetProduct;
}

export interface TargetProductConfig {
  id: CorrPrimaryTargetProduct;
  name: string;
  chemicalFormula: string;
  electronsTransferred: number; // n
  standardEquilibriumPotentialV: number; // E° vs RHE
  molecularWeightGmol: number;
  productPhase: 'LIQUID_ALCOHOL' | 'GAS_OLEFIN' | 'LIQUID_CARBOXYLATE';
  marketPriceUsdPerKg: number;
}

export const CU_CATALYST_CATALOG: Record<CuCatalystMorphologyType, CuCatalystConfig> = {
  OXIDE_DERIVED_COPPER_OD_CU: {
    id: 'OXIDE_DERIVED_COPPER_OD_CU',
    name: 'Oxide-Derived Nanoporous Cu (OD-Cu)',
    activeFacets: 'Cu(100) / Cu(111) Grain Boundaries',
    coAdsorptionFreeEnergyEv: -0.62,
    ccCouplingKineticBarrierEv: 0.65,
    maxStableCurrentDensityMacm2: 500,
    c2PlusFaradaicEfficiencyPct: 72.5,
    preferredProduct: 'ETHANOL_C2H5OH'
  },
  COPPER_FACET_CU100_NANOCUBES: {
    id: 'COPPER_FACET_CU100_NANOCUBES',
    name: 'Shape-Controlled Cu(100) Nanocubes',
    activeFacets: 'Pure Cu(100) Square Terraces',
    coAdsorptionFreeEnergyEv: -0.58,
    ccCouplingKineticBarrierEv: 0.62,
    maxStableCurrentDensityMacm2: 600,
    c2PlusFaradaicEfficiencyPct: 76.0,
    preferredProduct: 'ETHYLENE_C2H4'
  },
  BORON_DOPED_COPPER_B_CU: {
    id: 'BORON_DOPED_COPPER_B_CU',
    name: 'Boron-Modulated Electron-Deficient Cu (B-Cu)',
    activeFacets: 'B-Cuδ+ Interstitial Sites',
    coAdsorptionFreeEnergyEv: -0.74,
    ccCouplingKineticBarrierEv: 0.58,
    maxStableCurrentDensityMacm2: 700,
    c2PlusFaradaicEfficiencyPct: 79.5,
    preferredProduct: 'ETHANOL_C2H5OH'
  },
  BIMETALLIC_CU_AG_TANDEM: {
    id: 'BIMETALLIC_CU_AG_TANDEM',
    name: 'Bimetallic Phase-Separated Cu-Ag Interface',
    activeFacets: 'Ag (CO donor) / Cu (C-C coupling acceptor)',
    coAdsorptionFreeEnergyEv: -0.68,
    ccCouplingKineticBarrierEv: 0.55,
    maxStableCurrentDensityMacm2: 850,
    c2PlusFaradaicEfficiencyPct: 83.0,
    preferredProduct: 'N_PROPANOL_C3H7OH'
  }
};

export const TARGET_PRODUCT_CATALOG: Record<CorrPrimaryTargetProduct, TargetProductConfig> = {
  ETHANOL_C2H5OH: {
    id: 'ETHANOL_C2H5OH',
    name: 'Ethanol (Green Fuel & Solvent)',
    chemicalFormula: 'C2H5OH',
    electronsTransferred: 8, // 2 CO + 8 e- + 7 H2O -> C2H5OH + 8 OH-
    standardEquilibriumPotentialV: 0.17,
    molecularWeightGmol: 46.07,
    productPhase: 'LIQUID_ALCOHOL',
    marketPriceUsdPerKg: 1.15
  },
  ETHYLENE_C2H4: {
    id: 'ETHYLENE_C2H4',
    name: 'Ethylene (Polymer Precursor)',
    chemicalFormula: 'C2H4',
    electronsTransferred: 8, // 2 CO + 8 e- + 6 H2O -> C2H4 + 8 OH-
    standardEquilibriumPotentialV: 0.15,
    molecularWeightGmol: 28.05,
    productPhase: 'GAS_OLEFIN',
    marketPriceUsdPerKg: 1.25
  },
  ACETATE_CH3COO: {
    id: 'ACETATE_CH3COO',
    name: 'Acetate / Acetic Acid',
    chemicalFormula: 'CH3COOH',
    electronsTransferred: 4, // 2 CO + 4 e- + 4 H2O -> CH3COO- + 3 OH- + H+
    standardEquilibriumPotentialV: 0.22,
    molecularWeightGmol: 60.05,
    productPhase: 'LIQUID_CARBOXYLATE',
    marketPriceUsdPerKg: 0.95
  },
  N_PROPANOL_C3H7OH: {
    id: 'N_PROPANOL_C3H7OH',
    name: 'n-Propanol (C3 Alcohol)',
    chemicalFormula: 'C3H7OH',
    electronsTransferred: 14, // 3 CO + 14 e- + 12 H2O -> C3H7OH + 14 OH-
    standardEquilibriumPotentialV: 0.19,
    molecularWeightGmol: 60.10,
    productPhase: 'LIQUID_ALCOHOL',
    marketPriceUsdPerKg: 2.40
  }
};

export interface CorrElectrolysisKineticsResult {
  currentDensityMacm2: number;
  cellOperatingVoltageV: number;
  overpotentialV: number;
  cathodicPotentialVsRheV: number;
  ethanolFaradaicEfficiencyPct: number;
  c2PlusOverallFaradaicEfficiencyPct: number;
  hydrogenEvolutionFePct: number;
  coSurfaceCoverageThetaCo: number; // 0.0 to 1.0
  coSinglePassConversionPct: number;
}

export interface CorrIndustrialPlantBalance {
  stackActiveAreaM2: number;
  dailyCoFeedMassKg: number;
  dailyEthanolProductionKg: number;
  dailyEthyleneProductionKg: number;
  dailyPropanolProductionKg: number;
  stackElectricalPowerKw: number;
  specificEnergyConsumptionKwhPerKgEthanol: number;
  avoidedFossilCo2EmissionsTonsPerYear: number;
  annualNetRevenueUsd: number;
}

/**
 * Calculates electrochemical kinetics, Tafel polarization, and product selectivity for CO reduction.
 */
export function calculateCorrKinetics(
  catalyst: CuCatalystConfig,
  electrolyte: CorrElectrolyteType = 'PURE_WATER_AEM_ZERO_GAP',
  currentDensityMacm2: number = 400.0,
  feedCoPressureBar: number = 5.0
): CorrElectrolysisKineticsResult {
  const currentFraction = Math.min(1.2, currentDensityMacm2 / catalyst.maxStableCurrentDensityMacm2);

  // Butler-Volmer / Tafel overpotential for C-C coupling
  const tafelSlopeMv = 115.0; // mV/dec for CO-CO coupling
  const exchangeCurrentDensityMacm2 = 0.05;
  const activationOverpotentialV = (tafelSlopeMv / 1000.0) * Math.log10(Math.max(1, currentDensityMacm2 / exchangeCurrentDensityMacm2));

  // Ohmic IR drop across AEM membrane and gas diffusion electrode
  const membraneAreaSpecificResistanceOhmCm2 = electrolyte === 'PURE_WATER_AEM_ZERO_GAP' ? 0.65 : 0.40;
  const ohmicDropV = (currentDensityMacm2 * 1e-3) * membraneAreaSpecificResistanceOhmCm2;

  // Anode OER (oxygen evolution) overpotential on IrO2 / NiFe LDH
  const anodeOerOverpotentialV = 0.28 + (currentDensityMacm2 * 1e-3) * 0.12;
  const thermodynamicCellVoltageV = 1.23 - 0.17; // 1.06 V reversible

  const cellOperatingVoltageV = parseFloat(
    (thermodynamicCellVoltageV + activationOverpotentialV + anodeOerOverpotentialV + ohmicDropV).toFixed(2)
  );

  const cathodicPotentialVsRheV = parseFloat(
    (-0.17 - activationOverpotentialV - (currentDensityMacm2 * 1e-3) * 0.10).toFixed(2)
  );

  // *CO surface coverage from Langmuir-Hinshelwood isotherm under pressure
  const adsorptionConstant = Math.exp(-catalyst.coAdsorptionFreeEnergyEv / 0.0257); // kT at 298K ~ 25.7 meV
  const thetaCo = parseFloat(
    Math.min(0.95, (adsorptionConstant * feedCoPressureBar) / (1 + adsorptionConstant * feedCoPressureBar)).toFixed(2)
  );

  // C-C coupling rate scales quadratically with thetaCo: Rate ~ k * (thetaCo)^2
  const couplingFactor = Math.pow(thetaCo, 1.6);
  const baselineC2PlusFe = catalyst.c2PlusFaradaicEfficiencyPct * couplingFactor;

  // Current density optimum: very low current has high HER; very high current causes mass transport starvation
  const massTransportPenalty = currentDensityMacm2 > 500 ? (currentDensityMacm2 - 500) * 0.04 : 0;
  const c2PlusOverallFaradaicEfficiencyPct = parseFloat(
    Math.max(30.0, Math.min(88.0, baselineC2PlusFe - massTransportPenalty)).toFixed(1)
  );

  // Selective distribution of C2+ products
  let ethanolShare = 0.55;
  if (catalyst.preferredProduct === 'ETHANOL_C2H5OH') ethanolShare = 0.68;
  if (catalyst.preferredProduct === 'N_PROPANOL_C3H7OH') ethanolShare = 0.40;

  const ethanolFaradaicEfficiencyPct = parseFloat(
    (c2PlusOverallFaradaicEfficiencyPct * ethanolShare).toFixed(1)
  );

  const hydrogenEvolutionFePct = parseFloat(
    Math.max(4.0, (100.0 - c2PlusOverallFaradaicEfficiencyPct)).toFixed(1)
  );

  // Single-pass CO conversion efficiency in high-pressure GDE
  const coSinglePassConversionPct = parseFloat(
    Math.min(85.0, 35.0 + feedCoPressureBar * 4.5 + currentDensityMacm2 * 0.04).toFixed(1)
  );

  return {
    currentDensityMacm2,
    cellOperatingVoltageV,
    overpotentialV: parseFloat((activationOverpotentialV + anodeOerOverpotentialV).toFixed(2)),
    cathodicPotentialVsRheV,
    ethanolFaradaicEfficiencyPct,
    c2PlusOverallFaradaicEfficiencyPct,
    hydrogenEvolutionFePct,
    coSurfaceCoverageThetaCo: thetaCo,
    coSinglePassConversionPct
  };
}

/**
 * Calculates industrial-scale plant balance, product rates, specific energy consumption, and avoided CO2.
 */
export function calculateCorrIndustrialBalance(
  kinetics: CorrElectrolysisKineticsResult,
  stackActiveAreaM2: number = 250.0 // 250 m2 stack
): CorrIndustrialPlantBalance {
  const faradayConstant = 96485; // C / mol e-
  const hoursPerDay = 24.0;
  const currentTotalA = kinetics.currentDensityMacm2 * 10.0 * stackActiveAreaM2; // mA/cm2 * 10 = A/m2

  // Total daily charge (Coulombs) = Current (A) * 86,400 s
  const dailyChargeCoulombs = currentTotalA * hoursPerDay * 3600.0;

  // 1. Ethanol production: 2 CO + 8 e- + 7 H2O -> C2H5OH + 8 OH-
  // Moles = (Q * FE_ethanol) / (8 * F)
  const ethanolCharge = dailyChargeCoulombs * (kinetics.ethanolFaradaicEfficiencyPct / 100.0);
  const ethanolMoles = ethanolCharge / (8.0 * faradayConstant);
  const dailyEthanolProductionKg = parseFloat(((ethanolMoles * 46.07) / 1000.0).toFixed(1));

  // 2. Ethylene production (olefin co-product)
  const ethyleneShareFe = kinetics.c2PlusOverallFaradaicEfficiencyPct - kinetics.ethanolFaradaicEfficiencyPct;
  const ethyleneCharge = dailyChargeCoulombs * (Math.max(0, ethyleneShareFe * 0.65) / 100.0);
  const ethyleneMoles = ethyleneCharge / (8.0 * faradayConstant);
  const dailyEthyleneProductionKg = parseFloat(((ethyleneMoles * 28.05) / 1000.0).toFixed(1));

  // 3. n-Propanol production (14 e-)
  const propanolCharge = dailyChargeCoulombs * (Math.max(0, ethyleneShareFe * 0.35) / 100.0);
  const propanolMoles = propanolCharge / (14.0 * faradayConstant);
  const dailyPropanolProductionKg = parseFloat(((propanolMoles * 60.10) / 1000.0).toFixed(1));

  // Feed CO consumption (stoichiometric: 2 mol CO per mol C2, 3 mol per mol C3)
  const coMolesConsumed = (ethanolMoles * 2.0) + (ethyleneMoles * 2.0) + (propanolMoles * 3.0);
  const dailyCoFeedMassKg = parseFloat(((coMolesConsumed * 28.01) / 1000.0).toFixed(1));

  // Stack electrical power (kW) = Current (A) * Voltage (V) / 1000
  const stackElectricalPowerKw = parseFloat(
    ((currentTotalA * kinetics.cellOperatingVoltageV) / 1000.0).toFixed(1)
  );

  // Daily energy consumption (kWh)
  const dailyEnergyKwh = stackElectricalPowerKw * hoursPerDay;
  const specificEnergyConsumptionKwhPerKgEthanol = parseFloat(
    (dailyEnergyKwh / Math.max(1, dailyEthanolProductionKg)).toFixed(1)
  );

  // Avoided CO2 emissions: Displaces petroleum ethylene/ethanol production + locks captured CO
  // 1 kg bio/e-ethanol avoids ~ 2.45 kg fossil CO2
  const annualEthanolTons = (dailyEthanolProductionKg * 350.0) / 1000.0;
  const avoidedFossilCo2EmissionsTonsPerYear = parseFloat(
    (annualEthanolTons * 2.45).toFixed(1)
  );

  // Annual gross product revenue (USD)
  const annualEthanolRevenue = dailyEthanolProductionKg * 1.15 * 350.0;
  const annualEthyleneRevenue = dailyEthyleneProductionKg * 1.25 * 350.0;
  const annualPropanolRevenue = dailyPropanolProductionKg * 2.40 * 350.0;
  const annualNetRevenueUsd = parseFloat(
    (annualEthanolRevenue + annualEthyleneRevenue + annualPropanolRevenue).toFixed(0)
  );

  return {
    stackActiveAreaM2,
    dailyCoFeedMassKg,
    dailyEthanolProductionKg,
    dailyEthyleneProductionKg,
    dailyPropanolProductionKg,
    stackElectricalPowerKw,
    specificEnergyConsumptionKwhPerKgEthanol,
    avoidedFossilCo2EmissionsTonsPerYear,
    annualNetRevenueUsd
  };
}
