// src/domain/thermophotovoltaicGridStorageEngine.ts
// Thermophotovoltaic (TPV) Ultra-High Temperature Grid Energy Storage (Thermal Battery & Photonic Selective Emitter) Engine
// Conforms to: Planck Radiation Law, Stefan-Boltzmann Electrodynamics, Shockley-Queisser Limits & Vietnam GDPT 2018

export type TpvCellArchitecture =
  | 'DUAL_JUNCTION_GAASSB_INGAAS'
  | 'TANDEM_INGAASP_INGAAS'
  | 'SINGLE_JUNCTION_INGAAS_074EV'
  | 'LOW_COST_GERMANIUM_GE';

export type ThermalStorageCoreMaterial =
  | 'HIGH_PURITY_ISOSTATIC_GRAPHITE'
  | 'LIQUID_TIN_IN_GRAPHITE_MATRIX'
  | 'SILICON_BORON_PHASE_CHANGE'
  | 'REFRACTORY_TUNGSTEN_COMPOSITE';

export type SelectiveEmitterOpticalType =
  | 'TUNGSTEN_1D_PHOTONIC_CRYSTAL'
  | 'HFO2_TA_MULTI_LAYER_METAMATERIAL'
  | 'TANTALUM_SURFACE_GRATING'
  | 'BLACKBODY_GREY_EMITTER';

export interface TpvCellSpec {
  id: TpvCellArchitecture;
  name: string;
  topBandgapEv: number;
  bottomBandgapEv: number;
  subBandgapReflectivityPct: number; // Back surface reflector (BSR) photon recycling
  externalQuantumEfficiencyAboveEg: number;
  openCircuitVoltageVoc: number;
  shortCircuitCurrentDensityAcm2: number; // In TPV, currents are A/cm2, not mA/cm2!
  fillFactor: number;
  benchmarkedEfficiencyAt2400KPct: number;
  cellCostPerM2Usd: number;
  description: string;
}

export interface StorageCoreSpec {
  id: ThermalStorageCoreMaterial;
  name: string;
  meltingPointC: number;
  maxOperatingTempC: number;
  volumetricHeatCapacityKwhThPerM3: number; // at operating range
  gravimetricHeatCapacityKwhThPerTon: number;
  thermalConductivityWPerMK: number;
  latentHeatOfFusionKwhPerTon?: number;
  rawMaterialCostUsdPerTon: number;
  description: string;
}

export interface SelectiveEmitterSpec {
  id: SelectiveEmitterOpticalType;
  name: string;
  cutoffWavelengthUm: number;
  inBandEmissivity: number;
  subBandgapSuppressionRatio: number;
  maxStableTemperatureC: number;
  description: string;
}

export interface PlanckSpectralPoint {
  wavelengthUm: number;
  spectralRadianceWPerM2Um: number;
  isAboveBandgap: boolean;
  absorbedPhotonicFraction: number;
}

export interface TpvOperatingResult {
  emitterTemperatureC: number;
  cellTemperatureC: number;
  blackbodyTotalRadiationWPerCm2: number;
  absorbedAboveEgRadiationWPerCm2: number;
  recycledSubBandgapRadiationWPerCm2: number;
  generatedElectricalPowerWPerCm2: number;
  cellElectricalEfficiencyPct: number; // Power_elec / (Radiation_in - Radiation_recycled)
  wasteHeatPowerWPerCm2: number;
  totalRoundTripEfficiencyPct: number; // RTE = eta_charge * eta_storage * eta_TPV (~40-52%)
}

export interface TpvGridStorageSystemBalance {
  storageCapacityMwhElectric: number;
  storageCapacityMwhThermal: number;
  graphiteCoreMassTons: number;
  graphiteCoreVolumeM3: number;
  tpvCellActiveAreaM2: number;
  dischargeElectricalPowerMw: number;
  dischargeDurationHours: number;
  thermalStandbyLossRatePctPerDay: number;
  levelizedCostOfStorageUsdPerKwh: number; // LCOS ($/kWh-cycle)
  capexUsdPerKwhStorageCapacity: number;
  annualAvoidedCo2TonsPerYear: number;     // Replacing peaker gas turbine (~500 g CO2/kWh)
}

// ------------------------------------------------------------------------------------------------
// PHYSICAL CONSTANTS
// ------------------------------------------------------------------------------------------------

export const STEFAN_BOLTZMANN_CONSTANT = 5.670374e-8; // W / (m^2 K^4)
export const PLANCK_CONSTANT = 6.62607e-34; // J s
export const SPEED_OF_LIGHT = 2.99792e8; // m/s
export const BOLTZMANN_CONSTANT = 1.380649e-23; // J / K
export const ELEMENTARY_CHARGE = 1.60217663e-19; // C

// ------------------------------------------------------------------------------------------------
// CATALOGS
// ------------------------------------------------------------------------------------------------

export const TPV_CELL_CATALOG: Record<TpvCellArchitecture, TpvCellSpec> = {
  DUAL_JUNCTION_GAASSB_INGAAS: {
    id: 'DUAL_JUNCTION_GAASSB_INGAAS',
    name: 'Dual-Junction GaAsSb / InGaAs (MIT / NREL Benchmark)',
    topBandgapEv: 1.20,
    bottomBandgapEv: 0.95,
    subBandgapReflectivityPct: 98.4,
    externalQuantumEfficiencyAboveEg: 0.94,
    openCircuitVoltageVoc: 1.48,
    shortCircuitCurrentDensityAcm2: 6.8, // 6.8 A/cm2 = 68,000 A/m2
    fillFactor: 0.81,
    benchmarkedEfficiencyAt2400KPct: 41.1,
    cellCostPerM2Usd: 12000,
    description: 'State-of-the-art dual-junction lattice-matched thermophotovoltaic device with ultra-reflective gold/dielectric back mirror exceeding 41% efficiency at 2,400 K.'
  },
  TANDEM_INGAASP_INGAAS: {
    id: 'TANDEM_INGAASP_INGAAS',
    name: 'Tandem InGaAsP / InGaAs on InP',
    topBandgapEv: 1.05,
    bottomBandgapEv: 0.74,
    subBandgapReflectivityPct: 96.5,
    externalQuantumEfficiencyAboveEg: 0.90,
    openCircuitVoltageVoc: 1.15,
    shortCircuitCurrentDensityAcm2: 8.5,
    fillFactor: 0.78,
    benchmarkedEfficiencyAt2400KPct: 37.8,
    cellCostPerM2Usd: 8500,
    description: 'Epitaxial dual-bandgap cell optimized for broad infrared harvesting down to 1.67 μm with high open circuit photovoltage.'
  },
  SINGLE_JUNCTION_INGAAS_074EV: {
    id: 'SINGLE_JUNCTION_INGAAS_074EV',
    name: 'Single-Junction In₀.₅₃Ga₀.₄₇As (0.74 eV)',
    topBandgapEv: 0.74,
    bottomBandgapEv: 0.74,
    subBandgapReflectivityPct: 94.0,
    externalQuantumEfficiencyAboveEg: 0.88,
    openCircuitVoltageVoc: 0.48,
    shortCircuitCurrentDensityAcm2: 12.2,
    fillFactor: 0.74,
    benchmarkedEfficiencyAt2400KPct: 32.5,
    cellCostPerM2Usd: 4500,
    description: 'Industry-standard high-current infrared photovoltaic receiver with simple single p-n junction architecture and low manufacturing complexity.'
  },
  LOW_COST_GERMANIUM_GE: {
    id: 'LOW_COST_GERMANIUM_GE',
    name: 'Crystalline Germanium (c-Ge 0.66 eV)',
    topBandgapEv: 0.66,
    bottomBandgapEv: 0.66,
    subBandgapReflectivityPct: 91.0,
    externalQuantumEfficiencyAboveEg: 0.82,
    openCircuitVoltageVoc: 0.38,
    shortCircuitCurrentDensityAcm2: 14.5,
    fillFactor: 0.70,
    benchmarkedEfficiencyAt2400KPct: 26.2,
    cellCostPerM2Usd: 1200,
    description: 'Abundant, low-cost elemental semiconductor substrate suitable for ultra-cheap thermal battery balance of plant.'
  }
};

export const STORAGE_CORE_CATALOG: Record<ThermalStorageCoreMaterial, StorageCoreSpec> = {
  HIGH_PURITY_ISOSTATIC_GRAPHITE: {
    id: 'HIGH_PURITY_ISOSTATIC_GRAPHITE',
    name: 'Isostatic Synthetic Graphite Blocks',
    meltingPointC: 3650, // Sublimes at ~3650°C
    maxOperatingTempC: 2400,
    volumetricHeatCapacityKwhThPerM3: 1150, // Integral from 800°C to 2400°C
    gravimetricHeatCapacityKwhThPerTon: 640,
    thermalConductivityWPerMK: 130.0,
    rawMaterialCostUsdPerTon: 2800,
    description: 'Dense synthetic carbon blocks capable of indefinite thermal cycling up to 2,400°C under vacuum/argon with zero phase change, zero chemical degradation, and high emissivity (ε ~ 0.85).'
  },
  LIQUID_TIN_IN_GRAPHITE_MATRIX: {
    id: 'LIQUID_TIN_IN_GRAPHITE_MATRIX',
    name: 'Liquid Tin (Sn) in Graphite Thermal Piping',
    meltingPointC: 232,
    maxOperatingTempC: 2100,
    volumetricHeatCapacityKwhThPerM3: 1450,
    gravimetricHeatCapacityKwhThPerTon: 420,
    thermalConductivityWPerMK: 85.0,
    rawMaterialCostUsdPerTon: 22000,
    description: 'Circulating liquid metal heat transfer medium allowing continuous convective heat transfer from deep core blocks to TPV receiver chambers without thermal gradients.'
  },
  SILICON_BORON_PHASE_CHANGE: {
    id: 'SILICON_BORON_PHASE_CHANGE',
    name: 'Silicon-Boron (Si-B) Latent Heat Phase Change Alloy',
    meltingPointC: 1414,
    maxOperatingTempC: 1800,
    volumetricHeatCapacityKwhThPerM3: 1800,
    gravimetricHeatCapacityKwhThPerTon: 1100,
    thermalConductivityWPerMK: 50.0,
    latentHeatOfFusionKwhPerTon: 500,
    rawMaterialCostUsdPerTon: 4200,
    description: 'High-enthalpy latent heat storage utilizing the immense heat of fusion of elemental silicon (1,790 kJ/kg = 497 kWh/ton) for isothermal discharge.'
  },
  REFRACTORY_TUNGSTEN_COMPOSITE: {
    id: 'REFRACTORY_TUNGSTEN_COMPOSITE',
    name: 'Tungsten-Heavy Alloy (W-Ni-Fe)',
    meltingPointC: 3422,
    maxOperatingTempC: 2500,
    volumetricHeatCapacityKwhThPerM3: 1350,
    gravimetricHeatCapacityKwhThPerTon: 310,
    thermalConductivityWPerMK: 160.0,
    rawMaterialCostUsdPerTon: 35000,
    description: 'Ultra-dense refractory metal core suited for extreme temperature service (> 2,400°C) and superior high-temperature mechanical creep resistance.'
  }
};

export const SELECTIVE_EMITTER_CATALOG: Record<SelectiveEmitterOpticalType, SelectiveEmitterSpec> = {
  TUNGSTEN_1D_PHOTONIC_CRYSTAL: {
    id: 'TUNGSTEN_1D_PHOTONIC_CRYSTAL',
    name: '1D Microcavity Tungsten (W) Photonic Crystal',
    cutoffWavelengthUm: 1.25,
    inBandEmissivity: 0.92,
    subBandgapSuppressionRatio: 0.12,
    maxStableTemperatureC: 2200,
    description: 'Micro-patterned tungsten surface with sub-micron photonic cavities suppressing infrared emission beyond 1.25 μm while maximizing visible/near-IR output.'
  },
  HFO2_TA_MULTI_LAYER_METAMATERIAL: {
    id: 'HFO2_TA_MULTI_LAYER_METAMATERIAL',
    name: 'HfO₂ / Tantalum Multi-Layer Metamaterial Filter',
    cutoffWavelengthUm: 1.30,
    inBandEmissivity: 0.95,
    subBandgapSuppressionRatio: 0.08,
    maxStableTemperatureC: 2000,
    description: 'Dielectric-refractory metal quarter-wave stack serving as an edge optical filter with ultra-steep cutoff and low optical scatter.'
  },
  TANTALUM_SURFACE_GRATING: {
    id: 'TANTALUM_SURFACE_GRATING',
    name: 'Tantalum (Ta) 2D Sub-Wavelength Grating',
    cutoffWavelengthUm: 1.40,
    inBandEmissivity: 0.89,
    subBandgapSuppressionRatio: 0.18,
    maxStableTemperatureC: 2100,
    description: 'Lithographically patterned periodic 2D array of tantalum pillars coupling resonant plasmonic modes into directional thermal radiation.'
  },
  BLACKBODY_GREY_EMITTER: {
    id: 'BLACKBODY_GREY_EMITTER',
    name: 'Unpatterned Pristine Graphite Greybody',
    cutoffWavelengthUm: 2.50,
    inBandEmissivity: 0.85,
    subBandgapSuppressionRatio: 0.85,
    maxStableTemperatureC: 2500,
    description: 'Broadband Planck emitter relying entirely on the TPV cell back surface reflector to reject and recycle sub-bandgap photons.'
  }
};

// ------------------------------------------------------------------------------------------------
// RADIATIVE TRANSFER & TPV EQUATIONS
// ------------------------------------------------------------------------------------------------

/**
 * Calculates spectral radiance according to Planck's Law:
 * I(lambda, T) = (2 * h * c^2 / lambda^5) / (exp(h * c / (lambda * k * T)) - 1)
 */
export function calculatePlanckSpectralRadiance(
  wavelengthUm: number,
  temperatureKelvin: number,
  emissivity: number = 0.85
): number {
  const lambdaM = wavelengthUm * 1e-6;
  const c1 = 2 * PLANCK_CONSTANT * Math.pow(SPEED_OF_LIGHT, 2);
  const c2 = (PLANCK_CONSTANT * SPEED_OF_LIGHT) / (BOLTZMANN_CONSTANT * temperatureKelvin);

  const denom = Math.exp(c2 / lambdaM) - 1;
  if (denom <= 0 || !isFinite(denom)) return 0;

  const radianceWPerM2M = (c1 / Math.pow(lambdaM, 5)) / denom;
  const radianceWPerM2Um = (radianceWPerM2M * 1e-6) * emissivity;
  return radianceWPerM2Um;
}

/**
 * Generates Planck radiation spectrum points and marks supra-bandgap vs sub-bandgap photons.
 */
export function generatePlanckSpectrum(
  temperatureKelvin: number,
  bandgapEv: number,
  emissivity: number = 0.85
): PlanckSpectralPoint[] {
  // Cutoff wavelength lambda_cutoff = h * c / E_g
  const cutoffUm = (1.2398 / bandgapEv);
  const points: PlanckSpectralPoint[] = [];

  for (let lambda = 0.2; lambda <= 4.0; lambda += 0.05) {
    const radiance = calculatePlanckSpectralRadiance(lambda, temperatureKelvin, emissivity);
    const isAbove = lambda <= cutoffUm;
    points.push({
      wavelengthUm: parseFloat(lambda.toFixed(2)),
      spectralRadianceWPerM2Um: parseFloat(radiance.toFixed(1)),
      isAboveBandgap: isAbove,
      absorbedPhotonicFraction: isAbove ? 0.95 : 0.02
    });
  }

  return points;
}

/**
 * Solves the high-power TPV cell operating point at high emitter temperature.
 * Emitter radiation flux: q = epsilon * sigma * (T_emitter^4 - T_cell^4)
 */
export function solveTpvCellOperatingPoint(
  cellSpec: TpvCellSpec,
  emitterTempC: number = 2200,
  emitterEmissivity: number = 0.88,
  cellTempC: number = 30
): TpvOperatingResult {
  const tEmitterK = emitterTempC + 273.15;
  const tCellK = cellTempC + 273.15;

  // Total Stefan-Boltzmann flux from emitter to cell (W/m2):
  const fluxWPerM2 = emitterEmissivity * STEFAN_BOLTZMANN_CONSTANT * (Math.pow(tEmitterK, 4) - Math.pow(tCellK, 4));
  const fluxWPerCm2 = fluxWPerM2 * 1e-4; // 1 m2 = 10,000 cm2

  // Cutoff wavelength for the bottom sub-cell
  const cutoffWavelengthUm = 1.2398 / cellSpec.bottomBandgapEv;

  // Integrate Planck supra-bandgap vs sub-bandgap fractions
  // At 2,400 K (2,127°C), ~35-45% of blackbody energy lies below 1.3 μm
  // Wien displacement law: lambda_max = 2898 / T [μm] ~ 1.20 μm at 2400 K
  const lambdaMaxUm = 2898 / tEmitterK;
  const inBandFraction = Math.max(0.15, Math.min(0.55, 0.48 - (cutoffWavelengthUm - lambdaMaxUm) * 0.12));

  const absorbedAboveEgWPerCm2 = fluxWPerCm2 * inBandFraction;
  const subBandgapWPerCm2 = fluxWPerCm2 * (1 - inBandFraction);

  // Sub-bandgap photon recycling via Back Surface Reflector (BSR)
  const recycledSubBandgapWPerCm2 = subBandgapWPerCm2 * (cellSpec.subBandgapReflectivityPct / 100);
  const unreflectedSubBandgapWasteWPerCm2 = subBandgapWPerCm2 - recycledSubBandgapWPerCm2;

  // Net absorbed thermal energy into cell:
  const netAbsorbedFluxWPerCm2 = absorbedAboveEgWPerCm2 + unreflectedSubBandgapWasteWPerCm2;

  // Electrical efficiency of TPV:
  // Base benchmark efficiency scaled with emitter temperature:
  const tempScale = Math.min(1.05, Math.max(0.70, tEmitterK / 2400));
  const cellElectricalEfficiencyPct = Math.min(48.0, cellSpec.benchmarkedEfficiencyAt2400KPct * tempScale);

  const generatedElectricalPowerWPerCm2 = netAbsorbedFluxWPerCm2 * (cellElectricalEfficiencyPct / 100);
  const wasteHeatPowerWPerCm2 = netAbsorbedFluxWPerCm2 - generatedElectricalPowerWPerCm2;

  // Overall grid storage round-trip efficiency:
  // Charging (electric -> heat in graphite via resistive heating) = 98.5%
  // Standby insulation = 98.0%
  // TPV conversion = cellElectricalEfficiencyPct
  const roundTripEfficiencyPct = 0.985 * 0.98 * cellElectricalEfficiencyPct;

  return {
    emitterTemperatureC: emitterTempC,
    cellTemperatureC: cellTempC,
    blackbodyTotalRadiationWPerCm2: parseFloat(fluxWPerCm2.toFixed(2)),
    absorbedAboveEgRadiationWPerCm2: parseFloat(absorbedAboveEgWPerCm2.toFixed(2)),
    recycledSubBandgapRadiationWPerCm2: parseFloat(recycledSubBandgapWPerCm2.toFixed(2)),
    generatedElectricalPowerWPerCm2: parseFloat(generatedElectricalPowerWPerCm2.toFixed(2)),
    cellElectricalEfficiencyPct: parseFloat(cellElectricalEfficiencyPct.toFixed(1)),
    wasteHeatPowerWPerCm2: parseFloat(wasteHeatPowerWPerCm2.toFixed(2)),
    totalRoundTripEfficiencyPct: parseFloat(roundTripEfficiencyPct.toFixed(1))
  };
}

/**
 * Calculates complete TPV grid-scale thermal battery balance of plant.
 */
export function calculateTpvGridStorageSystemBalance(
  cellSpec: TpvCellSpec,
  coreSpec: StorageCoreSpec,
  storageCapacityMwhElectric: number = 100,
  emitterTempC: number = 2200,
  dischargeHours: number = 10
): TpvGridStorageSystemBalance {
  const op = solveTpvCellOperatingPoint(cellSpec, emitterTempC);

  // Thermal capacity needed = Electric capacity / (TPV efficiency / 100)
  const thermalStorageMwh = storageCapacityMwhElectric / (op.cellElectricalEfficiencyPct / 100);

  // Graphite core mass and volume:
  const graphiteCoreMassTons = thermalStorageMwh / (coreSpec.gravimetricHeatCapacityKwhThPerTon / 1000);
  const graphiteCoreVolumeM3 = thermalStorageMwh / (coreSpec.volumetricHeatCapacityKwhThPerM3 / 1000);

  // Discharge electric power (MW):
  const dischargeElectricalPowerMw = storageCapacityMwhElectric / dischargeHours;

  // TPV active receiver area (m2):
  // generatedElectricalPowerWPerCm2 * 10,000 = W/m2 = 1e-6 MW/m2
  const powerDensityMwPerM2 = op.generatedElectricalPowerWPerCm2 * 1e-2;
  const tpvCellActiveAreaM2 = dischargeElectricalPowerMw / powerDensityMwPerM2;

  // CAPEX calculation:
  // Core cost + Vacuum insulation container + TPV receiver + balance of plant
  const coreCostUsd = graphiteCoreMassTons * coreSpec.rawMaterialCostUsdPerTon;
  const tpvCostUsd = tpvCellActiveAreaM2 * cellSpec.cellCostPerM2Usd;
  const balanceCostUsd = (storageCapacityMwhElectric * 1000) * 8.0; // ~$8/kWh-e container & pumps
  const totalCapexUsd = coreCostUsd + tpvCostUsd + balanceCostUsd;

  const capexUsdPerKwhStorageCapacity = totalCapexUsd / (storageCapacityMwhElectric * 1000);

  // Levelized Cost of Storage (LCOS) over 30 years / 10,000 cycles:
  // LCOS = (CAPEX / Cycles) + O&M + charging_electricity / RTE
  // Charging at $0.025/kWh (excess solar/wind)
  const chargingCostPerKwhDischarged = 0.025 / (op.totalRoundTripEfficiencyPct / 100);
  const capitalCostPerCycle = capexUsdPerKwhStorageCapacity / 10000;
  const lcosUsdPerKwh = capitalCostPerCycle + 0.003 + chargingCostPerKwhDischarged;

  // Avoided emissions: displacing simple cycle gas peaker turbines (500 g CO2/kWh)
  const annualDischargeMwh = storageCapacityMwhElectric * 250; // 250 cycles/year
  const annualAvoidedCo2Tons = (annualDischargeMwh * 1000 * 0.500) / 1000;

  return {
    storageCapacityMwhElectric,
    storageCapacityMwhThermal: parseFloat(thermalStorageMwh.toFixed(1)),
    graphiteCoreMassTons: parseFloat(graphiteCoreMassTons.toFixed(1)),
    graphiteCoreVolumeM3: parseFloat(graphiteCoreVolumeM3.toFixed(1)),
    tpvCellActiveAreaM2: parseFloat(tpvCellActiveAreaM2.toFixed(1)),
    dischargeElectricalPowerMw: parseFloat(dischargeElectricalPowerMw.toFixed(1)),
    dischargeDurationHours: dischargeHours,
    thermalStandbyLossRatePctPerDay: 0.8, // 0.8%/day in vacuum multi-foil insulation
    levelizedCostOfStorageUsdPerKwh: parseFloat(lcosUsdPerKwh.toFixed(3)),
    capexUsdPerKwhStorageCapacity: parseFloat(capexUsdPerKwhStorageCapacity.toFixed(1)),
    annualAvoidedCo2TonsPerYear: parseFloat(annualAvoidedCo2Tons.toFixed(0))
  };
}
