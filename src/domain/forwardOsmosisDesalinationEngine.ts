// src/domain/forwardOsmosisDesalinationEngine.ts
// Domain Engine: Forward Osmosis (FO) Desalination & Pressure Retarded Osmosis (PRO) Energy Harvesting
// Conforms strictly to IUPAC membrane transport standards, Kedem-Katchalsky equations, and Vietnam GDPT 2018 Chemistry.

export type FoMembraneType =
  | 'TFC_POLYAMIDE_ELECTROSPUN_NANOFIBER'
  | 'AQUAPORIN_BIOMIMETIC_TFC'
  | 'CELLULOSE_TRIACETATE_CTA_WOVEN'
  | 'GRAPHENE_OXIDE_COMPOSITE_FO';

export type DrawSolutionType =
  | 'THERMOLYTIC_AMMONIUM_BICARBONATE'
  | 'SODIUM_CHLORIDE_CONCENTRATED'
  | 'MAGNESIUM_CHLORIDE_HEXAHYDRATE'
  | 'MAGNETIC_NANOPARTICLE_POLYACRYLATE';

export type FeedWaterSourceType =
  | 'STANDARD_SEAWATER_35_PPT'
  | 'RO_DESALINATION_BRINE_70_PPT'
  | 'HYPERSALINE_INDUSTRIAL_WASTE_140_PPT'
  | 'MUNICIPAL_WASTEWATER_EFFLUENT_1_PPT';

export interface FoMembraneConfig {
  id: FoMembraneType;
  name: string;
  pureWaterPermeabilityA: number; // A in LMH/bar (L/(m2*h*bar))
  saltPermeabilityB: number; // B in LMH (L/(m2*h))
  structuralParameterS: number; // S in microns (t * tau / epsilon)
  burstPressureLimitBar: number; // bar
  foulingResistanceRating: 'EXCELLENT_HYDROPHILIC' | 'HIGH' | 'MODERATE';
}

export interface DrawSolutionConfig {
  id: DrawSolutionType;
  name: string;
  chemicalFormula: string;
  vanTHoffFactorI: number;
  osmoticPressurePerMolarBar: number; // bar / M at 25°C
  regenerationMethod: 'THERMOLYTIC_LOW_GRADE_HEAT' | 'NANOFILTRATION' | 'MAGNETIC_FIELD' | 'RO_RECYCLE';
  regenerationTempCelsius: number; // °C
  diffusivityD: number; // 1e-9 m2/s in water
}

export interface FeedWaterConfig {
  id: FeedWaterSourceType;
  name: string;
  totalDissolvedSolidsGPerL: number; // TDS in g/L
  molarConcentrationM: number; // M equivalent NaCl
  osmoticPressureBar: number; // bar
  foulantLoadCategory: 'LOW' | 'MEDIUM' | 'HIGH_SCALING_RISK';
}

export const FO_MEMBRANE_CATALOG: Record<FoMembraneType, FoMembraneConfig> = {
  TFC_POLYAMIDE_ELECTROSPUN_NANOFIBER: {
    id: 'TFC_POLYAMIDE_ELECTROSPUN_NANOFIBER',
    name: 'TFC Polyamide on Electrospun Nanofiber Substrate',
    pureWaterPermeabilityA: 3.2,
    saltPermeabilityB: 0.25,
    structuralParameterS: 220, // 220 um (ultra-low ICP)
    burstPressureLimitBar: 15.0,
    foulingResistanceRating: 'EXCELLENT_HYDROPHILIC'
  },
  AQUAPORIN_BIOMIMETIC_TFC: {
    id: 'AQUAPORIN_BIOMIMETIC_TFC',
    name: 'Aquaporin Inside™ Biomimetic Vesicle Membrane',
    pureWaterPermeabilityA: 4.8,
    saltPermeabilityB: 0.18,
    structuralParameterS: 260,
    burstPressureLimitBar: 12.0,
    foulingResistanceRating: 'EXCELLENT_HYDROPHILIC'
  },
  CELLULOSE_TRIACETATE_CTA_WOVEN: {
    id: 'CELLULOSE_TRIACETATE_CTA_WOVEN',
    name: 'Cellulose Triacetate (CTA) with Embedded Mesh',
    pureWaterPermeabilityA: 1.1,
    saltPermeabilityB: 0.65,
    structuralParameterS: 650, // High ICP
    burstPressureLimitBar: 8.0,
    foulingResistanceRating: 'MODERATE'
  },
  GRAPHENE_OXIDE_COMPOSITE_FO: {
    id: 'GRAPHENE_OXIDE_COMPOSITE_FO',
    name: 'Laminated Graphene Oxide / MXene Composite',
    pureWaterPermeabilityA: 5.5,
    saltPermeabilityB: 0.12,
    structuralParameterS: 180,
    burstPressureLimitBar: 20.0,
    foulingResistanceRating: 'EXCELLENT_HYDROPHILIC'
  }
};

export const DRAW_SOLUTION_CATALOG: Record<DrawSolutionType, DrawSolutionConfig> = {
  THERMOLYTIC_AMMONIUM_BICARBONATE: {
    id: 'THERMOLYTIC_AMMONIUM_BICARBONATE',
    name: 'Thermolytic Ammonium Bicarbonate',
    chemicalFormula: '(NH4)2CO3 / NH4HCO3',
    vanTHoffFactorI: 2.8,
    osmoticPressurePerMolarBar: 68.0,
    regenerationMethod: 'THERMOLYTIC_LOW_GRADE_HEAT',
    regenerationTempCelsius: 60.0, // Decomposes to NH3 + CO2 at 60°C
    diffusivityD: 1.65 // 1e-9 m2/s
  },
  SODIUM_CHLORIDE_CONCENTRATED: {
    id: 'SODIUM_CHLORIDE_CONCENTRATED',
    name: 'Concentrated Sodium Chloride',
    chemicalFormula: 'NaCl',
    vanTHoffFactorI: 1.95,
    osmoticPressurePerMolarBar: 46.5,
    regenerationMethod: 'RO_RECYCLE',
    regenerationTempCelsius: 25.0,
    diffusivityD: 1.61
  },
  MAGNESIUM_CHLORIDE_HEXAHYDRATE: {
    id: 'MAGNESIUM_CHLORIDE_HEXAHYDRATE',
    name: 'Magnesium Chloride Hexahydrate',
    chemicalFormula: 'MgCl2·6H2O',
    vanTHoffFactorI: 2.7,
    osmoticPressurePerMolarBar: 74.0,
    regenerationMethod: 'NANOFILTRATION',
    regenerationTempCelsius: 35.0,
    diffusivityD: 1.25
  },
  MAGNETIC_NANOPARTICLE_POLYACRYLATE: {
    id: 'MAGNETIC_NANOPARTICLE_POLYACRYLATE',
    name: 'Superparamagnetic Fe3O4-PAA Nanoparticles',
    chemicalFormula: 'Fe3O4@Polyacrylate',
    vanTHoffFactorI: 3.5,
    osmoticPressurePerMolarBar: 52.0,
    regenerationMethod: 'MAGNETIC_FIELD',
    regenerationTempCelsius: 25.0,
    diffusivityD: 0.45
  }
};

export const FEED_WATER_CATALOG: Record<FeedWaterSourceType, FeedWaterConfig> = {
  STANDARD_SEAWATER_35_PPT: {
    id: 'STANDARD_SEAWATER_35_PPT',
    name: 'Open Ocean Seawater (35 g/L TDS)',
    totalDissolvedSolidsGPerL: 35.0,
    molarConcentrationM: 0.60,
    osmoticPressureBar: 27.9,
    foulantLoadCategory: 'MEDIUM'
  },
  RO_DESALINATION_BRINE_70_PPT: {
    id: 'RO_DESALINATION_BRINE_70_PPT',
    name: 'Seawater RO Reject Brine (70 g/L TDS)',
    totalDissolvedSolidsGPerL: 70.0,
    molarConcentrationM: 1.20,
    osmoticPressureBar: 55.8,
    foulantLoadCategory: 'HIGH_SCALING_RISK'
  },
  HYPERSALINE_INDUSTRIAL_WASTE_140_PPT: {
    id: 'HYPERSALINE_INDUSTRIAL_WASTE_140_PPT',
    name: 'Hypersaline Chemical Wastewater (140 g/L TDS)',
    totalDissolvedSolidsGPerL: 140.0,
    molarConcentrationM: 2.40,
    osmoticPressureBar: 111.6,
    foulantLoadCategory: 'HIGH_SCALING_RISK'
  },
  MUNICIPAL_WASTEWATER_EFFLUENT_1_PPT: {
    id: 'MUNICIPAL_WASTEWATER_EFFLUENT_1_PPT',
    name: 'Treated Municipal Wastewater Effluent (1 g/L TDS)',
    totalDissolvedSolidsGPerL: 1.0,
    molarConcentrationM: 0.017,
    osmoticPressureBar: 0.8,
    foulantLoadCategory: 'LOW'
  }
};

export interface FoDesalinationFluxResult {
  drawMolarityM: number;
  drawBulkOsmoticPressureBar: number;
  feedBulkOsmoticPressureBar: number;
  effectiveMembraneOsmoticPressureDiffBar: number;
  internalConcentrationPolarizationModulus: number; // pi_m / pi_bulk
  waterFluxLmh: number; // L / (m2 * h)
  reverseSoluteFluxGmh: number; // g / (m2 * h)
  specificReverseSoluteFluxGPerL: number; // Js / Jw in g/L
  foulingFluxDeclinePct: number;
}

export interface ProPowerGenerationResult {
  appliedHydraulicPressureBar: number;
  optimalHydraulicPressureBar: number; // delta_pi / 2
  waterFluxUnderPressureLmh: number;
  powerDensityWPerM2: number; // W/m2
  annualNetEnergyMwhPer1000M2: number;
  isCommerciallyViable: boolean; // W > 5.0 W/m2
}

export interface CommercialZldPlantBalance {
  membraneAreaM2: number;
  dailyPureWaterPermeateM3: number;
  brineConcentrationRatio: number;
  finalConcentratedBrineTdsGPerL: number;
  thermalRegenerationHeatDutyKwt: number;
  specificEnergyConsumptionKwhPerM3: number;
  avoidedThermalCrystallizerCo2TonsPerYear: number;
  dailyDrawChemicalLossCostUsd: number;
}

/**
 * Calculates Forward Osmosis water and reverse salt flux incorporating dilutive internal concentration polarization (ICP).
 */
export function calculateFoFlux(
  membrane: FoMembraneConfig,
  drawSolution: DrawSolutionConfig,
  feedWater: FeedWaterConfig,
  drawMolarityM: number = 2.5,
  operatingTemperatureCelsius: number = 25.0
): FoDesalinationFluxResult {
  // Bulk osmotic pressures via van 't Hoff
  const tempKelvin = operatingTemperatureCelsius + 273.15;
  const gasConstR = 0.08314; // L*bar/(mol*K)
  const drawBulkOsmoticPressureBar = drawMolarityM * drawSolution.osmoticPressurePerMolarBar * (tempKelvin / 298.15);
  const feedBulkOsmoticPressureBar = feedWater.osmoticPressureBar * (tempKelvin / 298.15);

  // Dilutive Internal Concentration Polarization (ICP) in FO mode (Active Layer facing Feed Solution, AL-FS):
  // Jw = A * [ pi_draw * exp(-Jw * S / D) - pi_feed * exp(Jw * d / D_feed) ]
  // S in microns -> m: S * 1e-6; D in 1e-9 m2/s.
  // Exact Kedem-Katchalsky ICP exponent:
  // Jw (m/s) = Jw_lmh / (3.6e6)
  // S (m) = S_um * 1e-6
  // D (m2/s) = D_val * 1e-9
  // Exponent = (Jw_lmh * S_um) / (3600 * D_val)
  const icpPrefactor = (membrane.structuralParameterS) / (3600.0 * drawSolution.diffusivityD);

  // Iterative solution for Jw with relaxation damping
  let jw = 25.0; // Initial guess
  for (let iter = 0; iter < 20; iter++) {
    const icpModulus = Math.exp(-jw * icpPrefactor);
    const piDrawM = drawBulkOsmoticPressureBar * icpModulus;
    // Concentrative external concentration polarization on feed side
    const piFeedM = feedBulkOsmoticPressureBar * Math.exp(jw * 0.012);
    const deltaPiEff = Math.max(0, piDrawM - piFeedM);
    const jwTarget = membrane.pureWaterPermeabilityA * deltaPiEff;
    jw = 0.6 * jw + 0.4 * jwTarget;
  }

  // Fouling resistance factor
  const foulingDeclinePct = feedWater.foulantLoadCategory === 'HIGH_SCALING_RISK' ? 12.5 : feedWater.foulantLoadCategory === 'MEDIUM' ? 5.0 : 1.5;
  const netJw = parseFloat((jw * (1.0 - foulingDeclinePct / 100.0)).toFixed(2));

  const icpFinalModulus = parseFloat((Math.exp(-netJw * icpPrefactor)).toFixed(3));
  const effectiveDeltaPi = parseFloat((netJw / membrane.pureWaterPermeabilityA).toFixed(2));

  // Reverse solute flux Js = B * (C_draw_m - C_feed_m)
  const reverseSoluteFluxGmh = parseFloat(
    (membrane.saltPermeabilityB * drawMolarityM * 58.44 * icpFinalModulus * 0.08).toFixed(2)
  );

  const specificReverseSoluteFluxGPerL = parseFloat(
    (reverseSoluteFluxGmh / Math.max(0.1, netJw)).toFixed(3)
  );

  return {
    drawMolarityM,
    drawBulkOsmoticPressureBar: parseFloat(drawBulkOsmoticPressureBar.toFixed(1)),
    feedBulkOsmoticPressureBar: parseFloat(feedBulkOsmoticPressureBar.toFixed(1)),
    effectiveMembraneOsmoticPressureDiffBar: effectiveDeltaPi,
    internalConcentrationPolarizationModulus: icpFinalModulus,
    waterFluxLmh: netJw,
    reverseSoluteFluxGmh,
    specificReverseSoluteFluxGPerL,
    foulingFluxDeclinePct: foulingDeclinePct
  };
}

/**
 * Calculates Pressure Retarded Osmosis (PRO) power density and optimal hydraulic operating pressure.
 */
export function calculateProPowerDensity(
  membrane: FoMembraneConfig,
  drawSolution: DrawSolutionConfig,
  feedWater: FeedWaterConfig,
  drawMolarityM: number = 2.0,
  appliedPressureRatio: number = 0.50 // Delta P / Delta Pi
): ProPowerGenerationResult {
  const foBase = calculateFoFlux(membrane, drawSolution, feedWater, drawMolarityM);
  const deltaPiBulk = foBase.drawBulkOsmoticPressureBar - foBase.feedBulkOsmoticPressureBar;

  // Optimal hydraulic pressure = Delta Pi / 2
  const optimalHydraulicPressureBar = parseFloat((deltaPiBulk * 0.50 * foBase.internalConcentrationPolarizationModulus).toFixed(1));
  const appliedHydraulicPressureBar = parseFloat((deltaPiBulk * appliedPressureRatio * foBase.internalConcentrationPolarizationModulus).toFixed(1));

  // Water flux in PRO: Jw_pro = A * (Delta Pi_eff - Delta P)
  const effectiveDrivingPressure = Math.max(0, (deltaPiBulk * foBase.internalConcentrationPolarizationModulus) - appliedHydraulicPressureBar);
  const waterFluxUnderPressureLmh = parseFloat(
    (membrane.pureWaterPermeabilityA * effectiveDrivingPressure).toFixed(2)
  );

  // Power Density W = Jw (m/s) * Delta P (Pa)
  // W/m2 = (Jw / 3.6e6 m/s) * (Delta P * 1e5 Pa) = Jw * Delta P / 36
  const powerDensityWPerM2 = parseFloat(
    ((waterFluxUnderPressureLmh * appliedHydraulicPressureBar) / 36.0).toFixed(2)
  );

  // Annual Net Energy Generation per 1,000 m2 membrane stack (MWh)
  const hoursPerYear = 8760.0;
  const annualNetEnergyMwhPer1000M2 = parseFloat(
    ((powerDensityWPerM2 * 1000.0 * hoursPerYear * 0.90) / 1e6).toFixed(1)
  );

  const isCommerciallyViable = powerDensityWPerM2 >= 5.0;

  return {
    appliedHydraulicPressureBar,
    optimalHydraulicPressureBar,
    waterFluxUnderPressureLmh,
    powerDensityWPerM2,
    annualNetEnergyMwhPer1000M2,
    isCommerciallyViable
  };
}

/**
 * Calculates industrial-scale Zero Liquid Discharge (ZLD) plant mass balance, specific energy, and avoided emissions.
 */
export function calculateCommercialZldPlantBalance(
  foFlux: FoDesalinationFluxResult,
  membraneAreaM2: number = 5000.0, // 5,000 m2 industrial installation
  feedWater: FeedWaterConfig = FEED_WATER_CATALOG.RO_DESALINATION_BRINE_70_PPT
): CommercialZldPlantBalance {
  const dailyPermeateLiters = foFlux.waterFluxLmh * membraneAreaM2 * 24.0;
  const dailyPureWaterPermeateM3 = parseFloat((dailyPermeateLiters / 1000.0).toFixed(1));

  // Brine pre-concentration: concentrated from 70 g/L to 180-220 g/L
  const concentrationFactor = 2.6;
  const finalConcentratedBrineTdsGPerL = parseFloat(
    Math.min(260.0, feedWater.totalDissolvedSolidsGPerL * concentrationFactor).toFixed(1)
  );

  // Low-grade thermal duty (kW-thermal at 60°C for thermolytic draw stripping)
  // Latent heat of vaporization + stripping = ~ 280 kJ / kg water permeate
  const thermalRegenerationHeatDutyKwt = parseFloat(
    ((dailyPureWaterPermeateM3 * 1000.0 * 280.0) / (24.0 * 3600.0)).toFixed(1)
  );

  // Specific electrical energy consumption (pumping + auxiliary, kWh/m3)
  const specificEnergyConsumptionKwhPerM3 = 1.15; // Extremely low vs thermal crystallizers (20-30 kWh/m3)

  // Avoided carbon emissions vs conventional fossil thermal evaporator (22 kWh/m3)
  const annualPermeateM3 = dailyPureWaterPermeateM3 * 350.0;
  const avoidedEnergyMwh = annualPermeateM3 * (22.0 - specificEnergyConsumptionKwhPerM3) / 1000.0;
  const avoidedThermalCrystallizerCo2TonsPerYear = parseFloat(
    (avoidedEnergyMwh * 0.45).toFixed(1)
  );

  // Daily draw chemical makeup loss cost (USD/day)
  const dailySaltLossKg = (foFlux.reverseSoluteFluxGmh * membraneAreaM2 * 24.0) / 1000.0;
  const dailyDrawChemicalLossCostUsd = parseFloat((dailySaltLossKg * 0.40).toFixed(2));

  return {
    membraneAreaM2,
    dailyPureWaterPermeateM3,
    brineConcentrationRatio: concentrationFactor,
    finalConcentratedBrineTdsGPerL,
    thermalRegenerationHeatDutyKwt,
    specificEnergyConsumptionKwhPerM3,
    avoidedThermalCrystallizerCo2TonsPerYear,
    dailyDrawChemicalLossCostUsd
  };
}
