// src/domain/solidStateInterphaseMechanicsEngine.ts
// Domain Engine: Solid-State Battery Cathode Electrolyte Interphase (CEI) & Halide/Sulfide Chemo-Mechanics
// Conforms strictly to IUPAC electrochemistry, Monroe-Newman elasticity criterion, and Vietnam GDPT 2018 Chemistry.

export type SolidElectrolyteType =
  | 'LGPS_SULFIDE'
  | 'ARGYRODITE_SULFIDE'
  | 'HALIDE_LI3INCL6'
  | 'LLZO_GARNET_OXIDE'
  | 'PEO_COMPOSITE_POLYMER';

export type CathodeActiveMaterialType =
  | 'NMC_811'
  | 'NMC_532'
  | 'LCO_LITHIUM_COBALT_OXIDE'
  | 'LNMO_HIGH_VOLTAGE_SPINEL';

export type InterfacialCeiLayerType =
  | 'BARE_UNCOATED'
  | 'LITHIUM_NIOBATE_LINBO3'
  | 'LITHIUM_ZIRCONATE_LIZRO3'
  | 'HALIDE_BUFFER_LI3INCL6';

export interface SolidElectrolyteConfig {
  id: SolidElectrolyteType;
  name: string;
  chemicalFormula: string;
  roomTempIonicConductivityMscm: number; // mS/cm at 25°C
  activationEnergyEv: number; // eV
  electrochemicalStabilityWindowMinV: number; // vs Li/Li+
  electrochemicalStabilityWindowMaxV: number; // vs Li/Li+
  shearModulusGpa: number; // G in GPa
  electronicConductivityScm: number; // S/cm
  densityGcm3: number;
  moistureSensitivityRating: 'EXTREME_H2S_EMISSION' | 'HIGH' | 'LOW_MOISTURE_TOLERANT' | 'STABLE_AIR';
}

export interface CathodeMaterialConfig {
  id: CathodeActiveMaterialType;
  name: string;
  nominalVoltageV: number;
  maxChargeVoltageV: number;
  specificCapacityMahG: number;
  volumeShrinkageDelithiationPct: number; // % volume change during full charge
  densityGcm3: number;
}

export interface CeiLayerConfig {
  id: InterfacialCeiLayerType;
  name: string;
  thicknessNm: number;
  ionicConductivityMscm: number;
  electronicConductivityScm: number;
  interfacialDecompositionSuppressionPct: number; // % suppression of oxidation
}

export const SOLID_ELECTROLYTE_CATALOG: Record<SolidElectrolyteType, SolidElectrolyteConfig> = {
  LGPS_SULFIDE: {
    id: 'LGPS_SULFIDE',
    name: 'Lithium Germanium Phosphorus Sulfide (LGPS)',
    chemicalFormula: 'Li10GeP2S12',
    roomTempIonicConductivityMscm: 12.0,
    activationEnergyEv: 0.22,
    electrochemicalStabilityWindowMinV: 1.71,
    electrochemicalStabilityWindowMaxV: 2.31,
    shearModulusGpa: 15.0,
    electronicConductivityScm: 1e-9,
    densityGcm3: 2.03,
    moistureSensitivityRating: 'EXTREME_H2S_EMISSION'
  },
  ARGYRODITE_SULFIDE: {
    id: 'ARGYRODITE_SULFIDE',
    name: 'Lithium Argyrodite Halosulfur (LPSCl)',
    chemicalFormula: 'Li6PS5Cl',
    roomTempIonicConductivityMscm: 3.5,
    activationEnergyEv: 0.28,
    electrochemicalStabilityWindowMinV: 1.70,
    electrochemicalStabilityWindowMaxV: 2.35,
    shearModulusGpa: 12.5,
    electronicConductivityScm: 5e-10,
    densityGcm3: 1.88,
    moistureSensitivityRating: 'EXTREME_H2S_EMISSION'
  },
  HALIDE_LI3INCL6: {
    id: 'HALIDE_LI3INCL6',
    name: 'Lithium Indium Chloride Halide (LIC)',
    chemicalFormula: 'Li3InCl6',
    roomTempIonicConductivityMscm: 2.0,
    activationEnergyEv: 0.32,
    electrochemicalStabilityWindowMinV: 2.35,
    electrochemicalStabilityWindowMaxV: 4.80,
    shearModulusGpa: 11.0,
    electronicConductivityScm: 1e-11,
    densityGcm3: 2.65,
    moistureSensitivityRating: 'LOW_MOISTURE_TOLERANT'
  },
  LLZO_GARNET_OXIDE: {
    id: 'LLZO_GARNET_OXIDE',
    name: 'Garnet Tantalum-Doped LLZO',
    chemicalFormula: 'Li6.4La3Zr1.4Ta0.6O12',
    roomTempIonicConductivityMscm: 1.0,
    activationEnergyEv: 0.35,
    electrochemicalStabilityWindowMinV: 2.90,
    electrochemicalStabilityWindowMaxV: 4.05,
    shearModulusGpa: 60.0,
    electronicConductivityScm: 1e-8,
    densityGcm3: 5.10,
    moistureSensitivityRating: 'STABLE_AIR'
  },
  PEO_COMPOSITE_POLYMER: {
    id: 'PEO_COMPOSITE_POLYMER',
    name: 'Polyethylene Oxide - LiTFSI Polymer',
    chemicalFormula: '(C2H4O)n-LiTFSI',
    roomTempIonicConductivityMscm: 0.05,
    activationEnergyEv: 0.50,
    electrochemicalStabilityWindowMinV: 1.20,
    electrochemicalStabilityWindowMaxV: 3.80,
    shearModulusGpa: 0.01,
    electronicConductivityScm: 1e-12,
    densityGcm3: 1.20,
    moistureSensitivityRating: 'HIGH'
  }
};

export const CATHODE_MATERIAL_CATALOG: Record<CathodeActiveMaterialType, CathodeMaterialConfig> = {
  NMC_811: {
    id: 'NMC_811',
    name: 'High-Nickel NMC-811',
    nominalVoltageV: 3.85,
    maxChargeVoltageV: 4.35,
    specificCapacityMahG: 205.0,
    volumeShrinkageDelithiationPct: 4.2,
    densityGcm3: 4.75
  },
  NMC_532: {
    id: 'NMC_532',
    name: 'Conventional NMC-532',
    nominalVoltageV: 3.80,
    maxChargeVoltageV: 4.30,
    specificCapacityMahG: 165.0,
    volumeShrinkageDelithiationPct: 2.1,
    densityGcm3: 4.65
  },
  LCO_LITHIUM_COBALT_OXIDE: {
    id: 'LCO_LITHIUM_COBALT_OXIDE',
    name: 'Lithium Cobalt Oxide (LCO)',
    nominalVoltageV: 3.90,
    maxChargeVoltageV: 4.45,
    specificCapacityMahG: 175.0,
    volumeShrinkageDelithiationPct: 3.0,
    densityGcm3: 5.05
  },
  LNMO_HIGH_VOLTAGE_SPINEL: {
    id: 'LNMO_HIGH_VOLTAGE_SPINEL',
    name: 'High-Voltage Spinel (LNMO)',
    nominalVoltageV: 4.70,
    maxChargeVoltageV: 4.95,
    specificCapacityMahG: 140.0,
    volumeShrinkageDelithiationPct: 1.8,
    densityGcm3: 4.45
  }
};

export const CEI_LAYER_CATALOG: Record<InterfacialCeiLayerType, CeiLayerConfig> = {
  BARE_UNCOATED: {
    id: 'BARE_UNCOATED',
    name: 'Bare Uncoated Surface',
    thicknessNm: 0,
    ionicConductivityMscm: 0,
    electronicConductivityScm: 1.0,
    interfacialDecompositionSuppressionPct: 0.0
  },
  LITHIUM_NIOBATE_LINBO3: {
    id: 'LITHIUM_NIOBATE_LINBO3',
    name: 'Conformal ALD LiNbO3 Coating',
    thicknessNm: 5.0,
    ionicConductivityMscm: 0.15,
    electronicConductivityScm: 1e-11,
    interfacialDecompositionSuppressionPct: 92.5
  },
  LITHIUM_ZIRCONATE_LIZRO3: {
    id: 'LITHIUM_ZIRCONATE_LIZRO3',
    name: 'Sol-Gel Li2ZrO3 Buffer',
    thicknessNm: 8.0,
    ionicConductivityMscm: 0.08,
    electronicConductivityScm: 5e-11,
    interfacialDecompositionSuppressionPct: 86.0
  },
  HALIDE_BUFFER_LI3INCL6: {
    id: 'HALIDE_BUFFER_LI3INCL6',
    name: 'Halide Catholyte Sheath (Li3InCl6)',
    thicknessNm: 15.0,
    ionicConductivityMscm: 1.8,
    electronicConductivityScm: 1e-12,
    interfacialDecompositionSuppressionPct: 97.0
  }
};

export interface InterfacialStabilityResult {
  operatingVoltageV: number;
  isThermodynamicallyStable: boolean;
  overpotentialDecompositionV: number;
  interfacialArealResistanceOhmCm2: number;
  spaceChargeLayerThicknessNm: number;
  passivationQuality: 'POOR_SEVERE_DECOMPOSITION' | 'MODERATE_GROWING_PASSIVATION' | 'EXCELLENT_PINHOLE_FREE';
  dominantDecompositionProducts: string[];
}

export interface ChemoMechanicalStressResult {
  externalStackPressureMpa: number;
  contactAreaRetentionPct: number;
  interfacialVonMisesStressMpa: number;
  criticalStrippingCurrentDensityMacm2: number; // CCD stripping
  criticalPlatingCurrentDensityMacm2: number;   // CCD plating (dendrite onset)
  dendriteSuppressionStatus: 'SAFE_DENDRITE_FREE' | 'GRAIN_BOUNDARY_SHORTING_RISK' | 'HIGH_VOID_DELAMINATION';
}

export interface CycleRetentionDataPoint {
  cycleNumber: number;
  capacityRetentionPct: number;
  coulombicEfficiencyPct: number;
  cellInternalResistanceOhmCm2: number;
}

export interface SolidStateFullCellMetrics {
  cellGravimetricEnergyDensityWhKg: number;
  cellVolumetricEnergyDensityWhL: number;
  anodeLithiumThicknessMicrons: number;
  solidElectrolyteSeparatorMicrons: number;
  cathodeActiveLoadingMghCm2: number;
  arealCapacityMahCm2: number;
  thermalRunawayOnsetTempCelsius: number;
  avoidedToxicSolventsGPerKwh: number;
}

/**
 * Calculates electrochemical and chemical stability of the cathode/solid electrolyte interface.
 */
export function calculateInterfacialStability(
  solidElectrolyte: SolidElectrolyteConfig,
  cathode: CathodeMaterialConfig,
  ceiLayer: CeiLayerConfig,
  chargeCutoffVoltageV: number = 4.30
): InterfacialStabilityResult {
  const overpotentialDecompositionV = Math.max(
    0,
    chargeCutoffVoltageV - solidElectrolyte.electrochemicalStabilityWindowMaxV
  );

  const isThermodynamicallyStable = overpotentialDecompositionV <= 0;

  // Suppression efficiency factor from CEI coating
  const unmitigatedFraction = Math.max(0.01, 1 - ceiLayer.interfacialDecompositionSuppressionPct / 100);

  // Interfacial resistance based on decomposition layer growth
  const baseResistance = (1.0 / solidElectrolyte.roomTempIonicConductivityMscm) * 10;
  const decompositionResistance = overpotentialDecompositionV * 180.0 * unmitigatedFraction;
  const coatingResistance = (ceiLayer.thicknessNm > 0) ? (ceiLayer.thicknessNm / 10.0) * (0.1 / Math.max(0.01, ceiLayer.ionicConductivityMscm)) : 0;

  const interfacialArealResistanceOhmCm2 = parseFloat(
    (baseResistance + decompositionResistance + coatingResistance).toFixed(2)
  );

  // Space-charge layer thickness (Debye length scaling)
  const sclBaseNm = 8.5;
  const spaceChargeLayerThicknessNm = parseFloat(
    (sclBaseNm * (1 + overpotentialDecompositionV * 1.5) * unmitigatedFraction).toFixed(2)
  );

  let passivationQuality: 'POOR_SEVERE_DECOMPOSITION' | 'MODERATE_GROWING_PASSIVATION' | 'EXCELLENT_PINHOLE_FREE' = 'EXCELLENT_PINHOLE_FREE';
  if (interfacialArealResistanceOhmCm2 > 120 || overpotentialDecompositionV > 1.5) {
    passivationQuality = 'POOR_SEVERE_DECOMPOSITION';
  } else if (interfacialArealResistanceOhmCm2 > 40 || overpotentialDecompositionV > 0.5) {
    passivationQuality = 'MODERATE_GROWING_PASSIVATION';
  }

  // Decomposition products based on chemistry
  const products: string[] = [];
  if (solidElectrolyte.id === 'LGPS_SULFIDE' || solidElectrolyte.id === 'ARGYRODITE_SULFIDE') {
    if (overpotentialDecompositionV > 0 && ceiLayer.id === 'BARE_UNCOATED') {
      products.push('Sulfur (S⁰)', 'Phosphorus Pentasulfide (P2S5)', 'Germanium Disulfide (GeS2)', 'Li3P');
    } else {
      products.push('Passivated LiNbO3/LPS Interface', 'Stable Li-P-S Matrix');
    }
  } else if (solidElectrolyte.id === 'HALIDE_LI3INCL6') {
    products.push('High-Voltage Chlorinated In-O-Cl Passivation', 'Resistant Halide Interphase');
  } else if (solidElectrolyte.id === 'LLZO_GARNET_OXIDE') {
    products.push('Li2CO3 Surface Passivation', 'Transition Metal Cross-Diffusion Interphase');
  } else {
    products.push('Polymer Dehydrogenation Oligomers', 'TFSI Anion Cleavage Products');
  }

  return {
    operatingVoltageV: chargeCutoffVoltageV,
    isThermodynamicallyStable,
    overpotentialDecompositionV: parseFloat(overpotentialDecompositionV.toFixed(3)),
    interfacialArealResistanceOhmCm2,
    spaceChargeLayerThicknessNm,
    passivationQuality,
    dominantDecompositionProducts: products
  };
}

/**
 * Calculates chemo-mechanical contact and dendrite suppression thresholds based on Monroe-Newman & stack pressure.
 */
export function calculateChemoMechanicalStress(
  solidElectrolyte: SolidElectrolyteConfig,
  cathode: CathodeMaterialConfig,
  externalStackPressureMpa: number = 3.0 // 0.1 to 10 MPa
): ChemoMechanicalStressResult {
  // Monroe-Newman criterion: G_se > 2 * G_Li (G_Li = 3.4 GPa => ~6.8 GPa threshold)
  const lithiumShearModulusGpa = 3.4;
  const monroeNewmanThresholdGpa = lithiumShearModulusGpa * 2.0;

  // Contact area retention during cathode breathing
  // Higher stack pressure prevents void formation during delithiation shrinkage
  const volumeShrinkFactor = cathode.volumeShrinkageDelithiationPct / 100.0;
  const pressureEffect = Math.min(1.0, externalStackPressureMpa / 5.0);
  const contactAreaRetentionPct = parseFloat(
    Math.min(99.5, 70.0 + 29.5 * pressureEffect - volumeShrinkFactor * 80.0 * (1 - pressureEffect)).toFixed(1)
  );

  // Interfacial von Mises stress
  const interfacialVonMisesStressMpa = parseFloat(
    (externalStackPressureMpa * 1.8 + solidElectrolyte.shearModulusGpa * volumeShrinkFactor * 4.5).toFixed(2)
  );

  // Critical current density (CCD) for stripping and plating
  // In sulfide/halide SE, electronic conductivity at grain boundaries causes dendrites
  const logSigmaE = Math.log10(solidElectrolyte.electronicConductivityScm);
  const baseCcdPlating = Math.max(0.2, (solidElectrolyte.roomTempIonicConductivityMscm / 2.0) * (externalStackPressureMpa / 2.5) * (1.0 / (1.0 + Math.max(0, logSigmaE + 10) * 0.5)));
  const criticalPlatingCurrentDensityMacm2 = parseFloat(baseCcdPlating.toFixed(2));
  const criticalStrippingCurrentDensityMacm2 = parseFloat((criticalPlatingCurrentDensityMacm2 * 1.25).toFixed(2));

  let dendriteSuppressionStatus: 'SAFE_DENDRITE_FREE' | 'GRAIN_BOUNDARY_SHORTING_RISK' | 'HIGH_VOID_DELAMINATION' = 'SAFE_DENDRITE_FREE';
  if (externalStackPressureMpa < 1.0) {
    dendriteSuppressionStatus = 'HIGH_VOID_DELAMINATION';
  } else if (solidElectrolyte.shearModulusGpa < monroeNewmanThresholdGpa || solidElectrolyte.electronicConductivityScm > 1e-9) {
    dendriteSuppressionStatus = 'GRAIN_BOUNDARY_SHORTING_RISK';
  }

  return {
    externalStackPressureMpa,
    contactAreaRetentionPct,
    interfacialVonMisesStressMpa,
    criticalStrippingCurrentDensityMacm2,
    criticalPlatingCurrentDensityMacm2,
    dendriteSuppressionStatus
  };
}

/**
 * Simulates cycle retention over 1,000 cycles for solid-state cells.
 */
export function simulateCapacityRetentionCycles(
  stability: InterfacialStabilityResult,
  mechanics: ChemoMechanicalStressResult,
  totalCycles: number = 1000
): CycleRetentionDataPoint[] {
  const points: CycleRetentionDataPoint[] = [];
  const step = Math.max(1, Math.floor(totalCycles / 20));

  // Degradation factors
  const resistancePenalty = (stability.interfacialArealResistanceOhmCm2 / 100.0) * 0.00015;
  const voidPenalty = ((100.0 - mechanics.contactAreaRetentionPct) / 100.0) * 0.00025;
  const totalDegradationRatePerCycle = 0.00008 + resistancePenalty + voidPenalty;

  let currentCapacityPct = 100.0;
  let currentResistance = stability.interfacialArealResistanceOhmCm2;

  for (let c = 0; c <= totalCycles; c += step) {
    if (c === 0) {
      points.push({
        cycleNumber: 0,
        capacityRetentionPct: 100.0,
        coulombicEfficiencyPct: 99.85,
        cellInternalResistanceOhmCm2: stability.interfacialArealResistanceOhmCm2
      });
      continue;
    }

    currentCapacityPct = Math.max(40.0, 100.0 * Math.exp(-totalDegradationRatePerCycle * c));
    currentResistance = stability.interfacialArealResistanceOhmCm2 + (100.0 - currentCapacityPct) * 1.4;

    const coulombicEfficiencyPct = Math.min(
      99.98,
      99.80 + 0.18 * (1.0 - Math.exp(-c / 50.0)) - (voidPenalty > 0.0001 ? 0.15 : 0)
    );

    points.push({
      cycleNumber: c,
      capacityRetentionPct: parseFloat(currentCapacityPct.toFixed(1)),
      coulombicEfficiencyPct: parseFloat(coulombicEfficiencyPct.toFixed(2)),
      cellInternalResistanceOhmCm2: parseFloat(currentResistance.toFixed(1))
    });
  }

  return points;
}

/**
 * Full-cell energy density and life-cycle safety metrics.
 */
export function calculateSolidStateFullCellMetrics(
  solidElectrolyte: SolidElectrolyteConfig,
  cathode: CathodeMaterialConfig,
  arealCapacityTargetMahCm2: number = 4.0 // 4.0 mAh/cm2
): SolidStateFullCellMetrics {
  // Cathode active loading
  const cathodeLoadingMgCm2 = (arealCapacityTargetMahCm2 / cathode.specificCapacityMahG) * 1000.0; // mg/cm2
  const cathodeThicknessMicrons = (cathodeLoadingMgCm2 * 1e-3 / cathode.densityGcm3) * 1e4 / 0.70; // 70% active volume

  // Lithium metal anode thickness (100% excess = 20-30 microns)
  // Theoretical lithium capacity: 3,860 mAh/g, density 0.534 g/cm3 => 2.06 mAh/cm2 per 10 um
  const anodeLithiumThicknessMicrons = parseFloat(
    Math.max(15.0, (arealCapacityTargetMahCm2 / 2.06) * 10.0 * 1.5).toFixed(1)
  );

  // Solid electrolyte separator thickness (target 25 - 40 um)
  const solidElectrolyteSeparatorMicrons = 30.0;

  // Stack component weights (g/m2):
  // Note: 1 m2 = 10,000 cm2. Volume (cm3) for thickness t (um) is (t * 1e-4 cm) * 1e4 cm2 = t cm3!
  // Hence, mass (g/m2) = thickness (um) * density (g/cm3).
  const cathodeWeightGm2 = (cathodeLoadingMgCm2 / 0.85) * 10.0; // 85 wt% active in composite cathode (19.5 mg/cm2 = 195 g/m2 active => ~230 g/m2)
  const seSeparatorWeightGm2 = solidElectrolyteSeparatorMicrons * solidElectrolyte.densityGcm3;
  const anodeLithiumWeightGm2 = anodeLithiumThicknessMicrons * 0.534;
  const currentCollectorsWeightGm2 = 6.0 * 2.7 + 6.0 * 8.96; // Al foil 6 um + Cu foil 6 um (~70 g/m2)
  const packagingWeightGm2 = 25.0; // Pouch aluminum-laminate foil

  const totalCellStackWeightGm2 = cathodeWeightGm2 + seSeparatorWeightGm2 + anodeLithiumWeightGm2 + currentCollectorsWeightGm2 + packagingWeightGm2;

  // Energy per m2 = arealCapacityTarget (mAh/cm2) * 10,000 (cm2/m2) / 1000 (Ah) * nominalVoltage (V) = Wh/m2
  const energyPerM2Wh = (arealCapacityTargetMahCm2 * 10.0 * cathode.nominalVoltageV);

  const cellGravimetricEnergyDensityWhKg = parseFloat(
    (energyPerM2Wh / (totalCellStackWeightGm2 / 1000.0)).toFixed(1)
  );

  // Cell volumetric stack thickness (microns)
  // Total stack volume (cm3 per m2) = totalStackThicknessMicrons * 1.0 = cm3
  // Volume in Liters per m2 = cm3 / 1000 = totalStackThicknessMicrons / 1000
  const totalStackThicknessMicrons = cathodeThicknessMicrons + solidElectrolyteSeparatorMicrons + anodeLithiumThicknessMicrons + 12.0 + 15.0; // +12 um foils +15 um pouch
  const volumePerM2L = totalStackThicknessMicrons / 1000.0;

  const cellVolumetricEnergyDensityWhL = parseFloat(
    (energyPerM2Wh / volumePerM2L).toFixed(1)
  );

  // Thermal runaway onset: solid electrolytes do not contain volatile flammable carbonates (EC/DMC/EMC)
  // Safe up to 250 - 400°C vs 130°C in liquid Li-ion
  const thermalRunawayOnsetTempCelsius = solidElectrolyte.id === 'PEO_COMPOSITE_POLYMER' ? 180 : 380;

  // Avoided volatile organic solvents
  const avoidedToxicSolventsGPerKwh = 450.0; // ~450 g toxic carbonates & fluoro-solvents replaced per kWh

  return {
    cellGravimetricEnergyDensityWhKg,
    cellVolumetricEnergyDensityWhL,
    anodeLithiumThicknessMicrons,
    solidElectrolyteSeparatorMicrons,
    cathodeActiveLoadingMghCm2: parseFloat(cathodeLoadingMgCm2.toFixed(1)),
    arealCapacityMahCm2: arealCapacityTargetMahCm2,
    thermalRunawayOnsetTempCelsius,
    avoidedToxicSolventsGPerKwh
  };
}
