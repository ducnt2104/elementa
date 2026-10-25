/**
 * ELEMENTA - SUBCRITICAL HYDROTHERMAL LIQUEFACTION (HTL) & BIOCRUDE REFINING ENGINE
 *
 * IUPAC-grounded physical chemistry, hydrothermal kinetics, and thermochemical modeling
 * of direct wet biomass conversion into Sustainable Aviation Fuel (SAF) and drop-in biocrude.
 *
 * Highlights:
 * 1. Subcritical Water Solvation (300 - 350°C, 15 - 22 MPa):
 *    - Dielectric constant drops (ε: 78.5 -> 14 - 20), dissolving organic polymers like lipids.
 *    - Ion product Kw increases (10^-14 -> 10^-11), self-catalyzing hydrolysis and decarboxylation.
 * 2. Zero-Drying Requirement:
 *    - Treats wet feedstock (75 - 90% water: microalgae, sewage sludge, manure), saving 2.5 MJ/kg H2O.
 * 3. 4-Phase Product Partitioning:
 *    - Biocrude Oil (HHV: 35 - 38 MJ/kg, 70 - 82% Energy Recovery Ratio).
 *    - Aqueous Phase (Recycled N, P fertilizer for circular aquaculture).
 *    - Solid Hydrochar (Soil carbon sequestration & porous adsorbent).
 *    - Clean Gas Phase (>85% biogenic CO2 with minor H2/CH4).
 */

export interface SubcriticalWaterProperties {
  temperatureC: number;
  pressureMPa: number;
  densityKgM3: number;
  dielectricConstant: number;
  ionProductKwLog10: number; // e.g. -11.2 at 320°C
  viscosityMicroPaS: number;
}

export type FeedstockType = 'WET_MICROALGAE' | 'MUNICIPAL_SEWAGE_SLUDGE' | 'DAIRY_MANURE' | 'SUGARCANE_BAGASSE_SLURRY';

export interface BiomassFeedstockSpec {
  id: FeedstockType;
  name: string;
  vietnameseName: string;
  moistureContentPercent: number;     // 70 - 90%
  lipidContentDryPercent: number;     // e.g. 25% for algae
  proteinContentDryPercent: number;   // e.g. 45%
  carbohydrateDryPercent: number;     // e.g. 20%
  ashContentDryPercent: number;       // e.g. 10%
  dryHhvMJPerKg: number;              // 18 - 22 MJ/kg
  description: string;
}

export interface HtlProcessParameters {
  feedstockType: FeedstockType;
  wetFeedstockFlowKgPerHour: number;  // e.g. 1,000 - 50,000 kg/h
  reactorTemperatureC?: number;       // 280 - 360°C (default 320°C)
  operatingPressureMPa?: number;      // 12 - 25 MPa (default 18 MPa)
  residenceTimeMinutes?: number;      // 10 - 45 min (default 20 min)
  heatRecoveryEffectiveness?: number; // 0.70 - 0.88 (default 0.80)
  solarThermalSupplementPercent?: number; // 0 - 100% (default 50% solar HTL)
}

export interface HtlPlantPerformance {
  biocrudeYieldKgPerHour: number;
  biocrudeYieldBarrelsPerDay: number;
  biocrudeEnergyDensityHhvMJPerKg: number;
  aqueousPhaseFlowKgPerHour: number;
  solidHydrocharKgPerHour: number;
  gasYieldKgPerHour: number;
  energyRecoveryRatioPercent: number; // ERR %
  netEnergyRatioNer: number;          // Energy out / Energy in (> 2.0)
  recycledNitrogenKgPerHour: number;
  recycledPhosphorusKgPerHour: number;
  annualAvoidedCO2Tons: number;
  subcriticalProperties: SubcriticalWaterProperties;
  feedstockUsed: BiomassFeedstockSpec;
}

export const BIOMASS_FEEDSTOCK_CATALOG: Record<FeedstockType, BiomassFeedstockSpec> = {
  WET_MICROALGAE: {
    id: 'WET_MICROALGAE',
    name: 'Wet Microalgae Slurry (Chlorella / Scenedesmus)',
    vietnameseName: 'Bùn Vi Tảo Tươi (Chlorella / Scenedesmus 80% ẩm)',
    moistureContentPercent: 80.0,
    lipidContentDryPercent: 28.0,
    proteinContentDryPercent: 46.0,
    carbohydrateDryPercent: 18.0,
    ashContentDryPercent: 8.0,
    dryHhvMJPerKg: 21.5,
    description: 'Vi tảo nuôi từ nước thải giàu dinh dưỡng, thu hoạch trực tiếp không cần sấy khô tốn kém.'
  },
  MUNICIPAL_SEWAGE_SLUDGE: {
    id: 'MUNICIPAL_SEWAGE_SLUDGE',
    name: 'Dewatered Municipal Sewage Sludge',
    vietnameseName: 'Bùn Thải Đô Thị Đã Ép Nước (82% độ ẩm)',
    moistureContentPercent: 82.0,
    lipidContentDryPercent: 16.0,
    proteinContentDryPercent: 34.0,
    carbohydrateDryPercent: 22.0,
    ashContentDryPercent: 28.0,
    dryHhvMJPerKg: 16.8,
    description: 'Chất thải đô thị từ nhà máy xử lý nước thải, loại bỏ hoàn toàn mầm bệnh và dược phẩm dư thừa.'
  },
  DAIRY_MANURE: {
    id: 'DAIRY_MANURE',
    name: 'Dairy Cattle Liquid Manure Slurry',
    vietnameseName: 'Phân Bò Sữa Dạng Lỏng Trang Trại (85% độ ẩm)',
    moistureContentPercent: 85.0,
    lipidContentDryPercent: 12.0,
    proteinContentDryPercent: 18.0,
    carbohydrateDryPercent: 45.0,
    ashContentDryPercent: 25.0,
    dryHhvMJPerKg: 15.2,
    description: 'Nước thải chuồng trại chăn nuôi quy mô lớn, thu hồi năng lượng sạch và khoáng N-P cho đồng ruộng.'
  },
  SUGARCANE_BAGASSE_SLURRY: {
    id: 'SUGARCANE_BAGASSE_SLURRY',
    name: 'Sugarcane Bagasse & Vinasse Slurry',
    vietnameseName: 'Hỗn Hợp Bã Mía & Hèm Rượu Nông Nghiệp (75% ẩm)',
    moistureContentPercent: 75.0,
    lipidContentDryPercent: 5.0,
    proteinContentDryPercent: 8.0,
    carbohydrateDryPercent: 78.0,
    ashContentDryPercent: 9.0,
    dryHhvMJPerKg: 17.5,
    description: 'Phụ phẩm nhà máy đường và cồn sinh học, giàu polyme lignocellulose được bẻ gãy ở 320°C.'
  }
};

/**
 * Calculates thermodynamic properties of subcritical water
 */
export function calculateSubcriticalWaterProperties(
  tempC: number = 320,
  pressureMPa: number = 18
): SubcriticalWaterProperties {
  const t = Math.max(260, Math.min(365, tempC));
  // Dielectric constant drops sharply from 78.5 at 25°C to ~18 at 320°C:
  // Empirical approximation: epsilon ~ 78.5 * exp(-0.0042 * (t - 25))
  const dielectricConstant = Math.max(12.0, 78.5 * Math.exp(-0.0044 * (t - 25)));

  // Ion product log10(Kw) peaks around 250 - 300°C (-11.2 vs -14.0 at 25°C):
  const ionProductKwLog10 = -14.0 + 3.0 * Math.exp(-Math.pow((t - 280) / 100, 2));

  // Density under 15 - 22 MPa subcritical pressure (NIST steam table calibration: ~667 kg/m³ at 320°C / 18 MPa):
  const densityKgM3 = Math.max(580, 997 - 0.85 * (t - 25) - 0.0009 * Math.pow(t - 25, 2) + 1.2 * (pressureMPa - 10));

  // Viscosity drops significantly:
  const viscosityMicroPaS = Math.max(70, 890 * Math.exp(-0.007 * (t - 25)));

  return {
    temperatureC: tempC,
    pressureMPa,
    densityKgM3: Number(densityKgM3.toFixed(1)),
    dielectricConstant: Number(dielectricConstant.toFixed(1)),
    ionProductKwLog10: Number(ionProductKwLog10.toFixed(2)),
    viscosityMicroPaS: Number(viscosityMicroPaS.toFixed(1))
  };
}

/**
 * Calculates HTL biocrude yield, mass balance, energy recovery ratio, and avoided CO2
 */
export function calculateHtlPerformance(params: HtlProcessParameters): HtlPlantPerformance {
  const feedstockSpec = BIOMASS_FEEDSTOCK_CATALOG[params.feedstockType] || BIOMASS_FEEDSTOCK_CATALOG.WET_MICROALGAE;
  const wetFlowKgH = Math.max(100, params.wetFeedstockFlowKgPerHour);
  const tempC = params.reactorTemperatureC ?? 320;
  const pressMPa = params.operatingPressureMPa ?? 18;
  const resTimeMin = params.residenceTimeMinutes ?? 20;
  const heatRecoveryEff = params.heatRecoveryEffectiveness ?? 0.80;

  const subWater = calculateSubcriticalWaterProperties(tempC, pressMPa);

  // Dry matter flow rate (kg/h):
  const dryFraction = (100 - feedstockSpec.moistureContentPercent) / 100;
  const dryBiomassKgH = wetFlowKgH * dryFraction;
  const waterFlowKgH = wetFlowKgH * (feedstockSpec.moistureContentPercent / 100);

  // Biocrude oil yield (% on dry ash-free basis):
  // Lipid-rich feeds produce significantly higher yields (lipids ~85% conversion to oil, proteins ~40%, carbs ~20%)
  const lipidContrib = (feedstockSpec.lipidContentDryPercent / 100) * 0.85;
  const proteinContrib = (feedstockSpec.proteinContentDryPercent / 100) * 0.38;
  const carbContrib = (feedstockSpec.carbohydrateDryPercent / 100) * 0.18;
  const baseYieldFraction = lipidContrib + proteinContrib + carbContrib; // ~0.38 for algae

  // Temperature and residence time tuning factor (bell curve centered around 320 - 330°C)
  const tempFactor = Math.exp(-Math.pow((tempC - 325) / 60, 2));
  const timeFactor = Math.min(1.05, Math.pow(resTimeMin / 20, 0.15));
  const finalYieldFraction = Math.max(0.20, baseYieldFraction * tempFactor * timeFactor);

  const biocrudeYieldKgH = dryBiomassKgH * finalYieldFraction;

  // Barrels per day (1 barrel of biocrude ~ 159 liters, density ~ 1.02 kg/L -> ~162 kg)
  const kgPerBarrel = 162.0;
  const biocrudeYieldBarrelsPerDay = (biocrudeYieldKgH * 24) / kgPerBarrel;

  // Biocrude Higher Heating Value (HHV):
  // Lipids boost HHV up to 37 - 38 MJ/kg (vs petroleum crude at 42 MJ/kg):
  const biocrudeEnergyDensityHhvMJPerKg = Number(
    (32.0 + (feedstockSpec.lipidContentDryPercent / 100) * 16.0).toFixed(1)
  ); // ~36.5 MJ/kg for algae

  // Co-product partitioning:
  // Solid Hydrochar: ~12% of dry biomass
  const solidHydrocharKgH = dryBiomassKgH * 0.12;
  // Gas phase (CO2 + minor CH4): ~18% of dry biomass
  const gasYieldKgH = dryBiomassKgH * 0.18;
  // Aqueous phase: water + dissolved organics (~remainder of dry mass)
  const dissolvedOrganicsKgH = Math.max(0, dryBiomassKgH - (biocrudeYieldKgH + solidHydrocharKgH + gasYieldKgH));
  const aqueousPhaseFlowKgPerHour = waterFlowKgH + dissolvedOrganicsKgH;

  // Nutrients recycled in aqueous phase:
  // Proteins contain ~16% Nitrogen, ash contains Phosphorus
  const nitrogenInFeedstockKgH = dryBiomassKgH * (feedstockSpec.proteinContentDryPercent / 100) * 0.16;
  const recycledNitrogenKgPerHour = Number((nitrogenInFeedstockKgH * 0.78).toFixed(1)); // 78% partitions to aqueous phase

  const phosphorusInFeedstockKgH = dryBiomassKgH * 0.015; // ~1.5% P in algae
  const recycledPhosphorusKgPerHour = Number((phosphorusInFeedstockKgH * 0.65).toFixed(1)); // 65% recovered

  // Energy Recovery Ratio (ERR %):
  // Energy in biocrude / Energy in raw dry biomass
  const energyInBiocrudeMJ = biocrudeYieldKgH * biocrudeEnergyDensityHhvMJPerKg;
  const energyInFeedstockMJ = dryBiomassKgH * feedstockSpec.dryHhvMJPerKg;
  const energyRecoveryRatioPercent = Number(((energyInBiocrudeMJ / energyInFeedstockMJ) * 100).toFixed(1));

  // Net Energy Ratio (NER):
  // Thermal energy needed to heat wet slurry to 320°C:
  // Cp_slurry ~ 4.1 kJ/(kg*K)
  const deltaT = tempC - 25;
  const grossThermalEnergyRequiredMJ = (wetFlowKgH * 4.18 * deltaT) / 1000;
  // Heat recovery exchanger captures heat from effluent:
  const netThermalEnergyMJ = grossThermalEnergyRequiredMJ * (1 - heatRecoveryEff);
  const netEnergyRatioNer = Number((energyInBiocrudeMJ / (netThermalEnergyMJ + 1e-4)).toFixed(2));

  // Annual Avoided CO2 emissions:
  // 1 kg biocrude replaces ~0.85 kg fossil petroleum (avoiding 3.15 kg CO2 / kg biocrude)
  const annualBiocrudeKg = biocrudeYieldKgH * 8000;
  const annualAvoidedCO2Tons = Number(((annualBiocrudeKg * 3.15) / 1000).toFixed(0));

  return {
    biocrudeYieldKgPerHour: Number(biocrudeYieldKgH.toFixed(1)),
    biocrudeYieldBarrelsPerDay: Number(biocrudeYieldBarrelsPerDay.toFixed(1)),
    biocrudeEnergyDensityHhvMJPerKg,
    aqueousPhaseFlowKgPerHour: Number(aqueousPhaseFlowKgPerHour.toFixed(1)),
    solidHydrocharKgPerHour: Number(solidHydrocharKgH.toFixed(1)),
    gasYieldKgPerHour: Number(gasYieldKgH.toFixed(1)),
    energyRecoveryRatioPercent,
    netEnergyRatioNer,
    recycledNitrogenKgPerHour,
    recycledPhosphorusKgPerHour,
    annualAvoidedCO2Tons,
    subcriticalProperties: subWater,
    feedstockUsed: feedstockSpec
  };
}
