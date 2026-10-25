// src/domain/membraneMethaneAromatizationEngine.ts
// Direct Methane Non-Oxidative Dehydroaromatization (MDA) & Hydrogen Permselective Membrane Reactor
// Conforms to: IUPAC Catalysis Standards, Le Chatelier Equilibrium Shift, Sieverts' Law Permeation & Vietnam GDPT 2018

export type MdaCatalystType =
  | 'MO_ZSM5_STANDARD'
  | 'MO_FE_ZSM5_PROMOTED'
  | 'MO_MCM22_MESOPOROUS'
  | 'RE_ZSM5_PRECIOUS';

export type MembraneMaterialType =
  | 'CERAMIC_BZY_PEROVSKITE'       // BaZr0.8Y0.2O3-delta (650-800°C)
  | 'CERAMIC_BCZY_PROTONIC'        // BaCe0.7Zr0.1Y0.1Yb0.1O3-delta
  | 'METALLIC_PD_AG_ALLOY'         // Pd-23wt%Ag supported foil (500-600°C)
  | 'SILICA_MICROPOROUS_CVD';      // Carbon/Silica molecular sieve

export interface MdaCatalystProperties {
  id: MdaCatalystType;
  name: string;
  metalPhase: string;
  zeoliteSupport: string;
  poreChannelA: number; // Zeolite pore dimension (Angstroms)
  optimalTemperatureRangeC: [number, number];
  cokingResistance: 'MODERATE' | 'HIGH' | 'EXCELLENT';
  typicalBenzeneSelectivityPct: number;
  naphthaleneByproductPct: number;
  regenerationMethod: string;
  description: string;
}

export interface MembraneProperties {
  id: MembraneMaterialType;
  name: string;
  membraneClass: 'CERAMIC_PROTONIC' | 'METALLIC_DENSE' | 'MICROPOROUS';
  operatingTempRangeC: [number, number];
  h2PermeabilityMolPerMSPa05: number;
  h2N2SelectivityRatio: number; // Purity factor
  thermalStabilityLimitC: number;
  chemicalRobustness: string;
  description: string;
}

export interface ThermodynamicEquilibriumVsMembrane {
  temperatureC: number;
  equilibriumMethaneConversionPct: number;
  membraneMethaneConversionPct: number;
  conversionEnhancementFactor: number; // e.g. 4.5x over conventional equilibrium
  benzeneSelectivityPct: number;
  hydrogenRecoveryYieldPct: number;
}

export interface MembraneFluxMetrics {
  feedPressureBar: number;
  permeatePressureBar: number;
  membraneThicknessMicrons: number;
  sievertsPressureDrivingForcePa05: number;
  h2PermeationFluxMolPerM2S: number;
  h2PurityPct: number;
  sweepGasVelocityMPerS: number;
}

export interface MdaPlantMassEnergyBalance {
  methaneFeedNm3PerHour: number;
  operatingTempC: number;
  feedPressureBar: number;
  methaneConversionPct: number;
  methaneReactedKmolPerHour: number;
  benzeneProductionKgPerHour: number;
  benzeneAnnualMetricTons: number;
  pureHydrogenProducedNm3PerHour: number;
  pureHydrogenKgPerHour: number;
  hydrogenAnnualMetricTons: number;
  cokeFormationRateKgPerHour: number;
  endothermicHeatRequiredMwTh: number; // +99.7 kJ/mol CH4
  co2AvoidedVsSmrTonsPerYear: number;  // Displaces SMR (which emits ~10 kg CO2/kg H2)
  annualBenzeneMarketValueUsd: number; // ~$950/ton
  annualHydrogenValueUsd: number;     // ~$4.50/kg
}

export interface CatalystDeactivationKinetics {
  timeOnStreamHours: number;
  carbonCokeDepositedWtPct: number;
  relativeActivityPct: number;
  regenerationCycleHours: number;
  isRegenerationRequired: boolean;
  regenerationIntervention: string;
}

/**
 * Fundamental Physical & Catalytic Constants
 */
export const ENTHALPY_OF_MDA_REACTION_KJ_PER_MOL_BENZENE = 598.0; // 6 CH4 -> C6H6 + 9 H2 (+99.67 kJ/mol CH4)
export const SMR_CO2_EMISSION_FACTOR_KG_PER_KG_H2 = 10.2; // Steam methane reforming emits ~10.2 kg CO2 / kg H2
export const MOLAR_MASS_CH4 = 16.04;
export const MOLAR_MASS_BENZENE = 78.11;
export const MOLAR_MASS_H2 = 2.016;
export const BENZENE_MARKET_PRICE_USD_PER_TON = 950.0;
export const GREEN_TURQUOISE_H2_PRICE_USD_PER_KG = 4.50;

export const MDA_CATALYST_CATALOG: Record<MdaCatalystType, MdaCatalystProperties> = {
  MO_ZSM5_STANDARD: {
    id: 'MO_ZSM5_STANDARD',
    name: 'Molybden trên Zeolite ZSM-5 Chuẩn (Mo/ZSM-5, 4-6 wt% Mo)',
    metalPhase: 'Molybdenum Carbide (Mo₂C nano-clusters)',
    zeoliteSupport: 'H-ZSM-5 (MFI topology, Si/Al = 15-25)',
    poreChannelA: 5.5,
    optimalTemperatureRangeC: [680, 750],
    cokingResistance: 'MODERATE',
    typicalBenzeneSelectivityPct: 72.0,
    naphthaleneByproductPct: 9.5,
    regenerationMethod: 'Hồi lưu H₂ tuần hoàn hoặc oxy hóa nhẹ bằng CO₂ (CO₂ + C → 2 CO)',
    description: 'Chất xúc tác lưỡng chức năng tiêu chuẩn. Mo₂C bẻ gãy liên kết C-H tạo gốc metyl và etylen; các tâm axit Brønsted trong kênh 10-vòng của ZSM-5 đa tụ và đóng vòng chọn lọc hình học tạo benzen.'
  },
  MO_FE_ZSM5_PROMOTED: {
    id: 'MO_FE_ZSM5_PROMOTED',
    name: 'Molybden Biến Tính Sắt (Mo-Fe/ZSM-5, 0.5 wt% Fe)',
    metalPhase: 'Hợp kim nano Mo-Fe carbide',
    zeoliteSupport: 'H-ZSM-5 biến tính vi lượng',
    poreChannelA: 5.5,
    optimalTemperatureRangeC: [700, 760],
    cokingResistance: 'HIGH',
    typicalBenzeneSelectivityPct: 78.5,
    naphthaleneByproductPct: 5.2,
    regenerationMethod: 'Quét xung khí hydro định kỳ mỗi 8 giờ',
    description: 'Bổ sung lượng vết kim loại sắt (Fe) cản trở sự tích tụ muội than graphit nặng, kéo dài tuổi thọ xúc tác lên gấp 3 lần và tăng độ chọn lọc benzen lên gần 80%.'
  },
  MO_MCM22_MESOPOROUS: {
    id: 'MO_MCM22_MESOPOROUS',
    name: 'Molybden trên Cấu Trúc Lớp MCM-22 (Mo/MCM-22)',
    metalPhase: 'Mo₂C phân tán trong siêu khoang (supercages)',
    zeoliteSupport: 'MCM-22 (MWW topology)',
    poreChannelA: 7.1,
    optimalTemperatureRangeC: [670, 730],
    cokingResistance: 'HIGH',
    typicalBenzeneSelectivityPct: 75.0,
    naphthaleneByproductPct: 7.0,
    regenerationMethod: 'Tái sinh liên tục bằng dòng hydro hồi lưu',
    description: 'Cấu trúc lỗ xốp kép gồm hệ kênh 10 cạnh độc lập và các siêu hốc đường kính 7.1 Å, giảm trở lực khuếch tán nội phân tử giúp benzen thoát nhanh trước khi bị graphit hóa.'
  },
  RE_ZSM5_PRECIOUS: {
    id: 'RE_ZSM5_PRECIOUS',
    name: 'Rheni Nano trên Zeolite ZSM-5 (Re/ZSM-5, 2 wt% Re)',
    metalPhase: 'Hạt nano Rhenium',
    zeoliteSupport: 'H-ZSM-5 (Si/Al = 20)',
    poreChannelA: 5.5,
    optimalTemperatureRangeC: [650, 720],
    cokingResistance: 'EXCELLENT',
    typicalBenzeneSelectivityPct: 83.0,
    naphthaleneByproductPct: 3.5,
    regenerationMethod: 'Tự làm sạch khi dòng hydro permeation thẩm thấu liên tục',
    description: 'Xúc tác kim loại quý hoạt tính cao ở nhiệt độ thấp hơn (650°C), hạn chế tạo naphthalene và có khả năng tự khử muội than khi kết hợp màng trích ly hydro.'
  }
};

export const MEMBRANE_CATALOG: Record<MembraneMaterialType, MembraneProperties> = {
  CERAMIC_BZY_PEROVSKITE: {
    id: 'CERAMIC_BZY_PEROVSKITE',
    name: 'Màng Gốm Dẫn Proton Perovskite (BaZr₀.₈Y₀.₂O₃₋δ - BZY)',
    membraneClass: 'CERAMIC_PROTONIC',
    operatingTempRangeC: [650, 800],
    h2PermeabilityMolPerMSPa05: 1.8e-8,
    h2N2SelectivityRatio: 10000.0, // Infinite theoretical selectivity
    thermalStabilityLimitC: 900.0,
    chemicalRobustness: 'Trơ hoàn toàn với hợp chất thơm benzen và khí hydrocacbon nóng',
    description: 'Màng gốm điện hóa mỏng cho phép proton (H⁺) nhảy qua các nút mạng oxy. Chịu nhiệt độ cực cao (tới 900°C), tách chọn lọc 100% hydro tinh khiết cấp pin nhiên liệu FCEV (>99.999%).'
  },
  CERAMIC_BCZY_PROTONIC: {
    id: 'CERAMIC_BCZY_PROTONIC',
    name: 'Màng Gốm Ceri-Zirco Đồng Doping (BaCe₀.₇Zr₀.₁Y₀.₁Yb₀.₁O₃₋δ)',
    membraneClass: 'CERAMIC_PROTONIC',
    operatingTempRangeC: [600, 750],
    h2PermeabilityMolPerMSPa05: 3.2e-8, // Higher flux
    h2N2SelectivityRatio: 8000.0,
    thermalStabilityLimitC: 850.0,
    chemicalRobustness: 'Doping Zr và Yb kháng ăn mòn trong môi trường CO₂ và hơi nước',
    description: 'Tốc độ dẫn proton cao hơn BZY tiêu chuẩn nhờ mạng tinh thể cerate nới rộng, cho thông lượng trích hydro cực mạnh kéo cân bằng Le Chatelier dịch chuyển tối đa.'
  },
  METALLIC_PD_AG_ALLOY: {
    id: 'METALLIC_PD_AG_ALLOY',
    name: 'Màng Kim Loại Đặc Palladium-Bạc (Pd-23wt%Ag trên Ống Gốm Xốp)',
    membraneClass: 'METALLIC_DENSE',
    operatingTempRangeC: [500, 620],
    h2PermeabilityMolPerMSPa05: 8.5e-8,
    h2N2SelectivityRatio: 50000.0,
    thermalStabilityLimitC: 650.0,
    chemicalRobustness: 'Nhạy cảm với nhiệt độ >650°C (dễ bị biến tính bởi muội than)',
    description: 'Màng kim loại kinh điển cơ chế hòa tan-khuếch tán (Solution-Diffusion). Đạt thông lượng hydro cao nhất nhưng bị giới hạn nhiệt độ hoạt động dưới 620°C.'
  },
  SILICA_MICROPOROUS_CVD: {
    id: 'SILICA_MICROPOROUS_CVD',
    name: 'Màng Silica Lỗ Xốp Siêu Nhỏ Lắng Đọng Pha Hơi (CVD Silica)',
    membraneClass: 'MICROPOROUS',
    operatingTempRangeC: [550, 750],
    h2PermeabilityMolPerMSPa05: 4.5e-8,
    h2N2SelectivityRatio: 250.0,
    thermalStabilityLimitC: 800.0,
    chemicalRobustness: 'Bền hóa học cao, chi phí rẻ hơn màng Palladium',
    description: 'Màng sàng lọc phân tử kích thước lỗ 3.0 Å (phân tử H₂ = 2.89 Å lọt qua dễ dàng trong khi Benzen = 5.85 Å bị giữ lại 100%). Độ chọn lọc H₂/N₂ trung bình.'
  }
};

/**
 * Calculate Equilibrium vs Membrane-Shifted Methane Conversion
 * Le Chatelier Equilibrium calculation for 6 CH4 <=> C6H6 + 9 H2
 */
export function calculateEquilibriumVsMembrane(
  temperatureC: number,
  h2ExtractionRatePct: number // Percentage of H2 in situ removed through membrane (0 - 95%)
): ThermodynamicEquilibriumVsMembrane {
  const T_kelvin = temperatureC + 273.15;

  // Thermodynamic equilibrium constant Kp calculation:
  // Delta G° = Delta H° - T * Delta S°
  // Delta H° = 598 kJ/mol = 598,000 J/mol
  // Delta S° = 293 J/(mol K)
  const deltaG = 598000.0 - (T_kelvin * 293.0);
  const R = 8.314;
  const Kp = Math.exp(-deltaG / (R * T_kelvin));

  // In conventional fixed bed (1 bar total pressure):
  // X_eq typically: at 700°C ~ 11.5%, at 750°C ~ 16.2%, at 800°C ~ 22.0%
  let xEq = 0.115 * Math.exp(0.0095 * (temperatureC - 700));
  xEq = Math.max(0.03, Math.min(0.28, xEq));

  // Membrane in-situ H2 extraction shifts equilibrium forward (Le Chatelier):
  // When 80-90% of product H2 is continuously removed from the reaction zone,
  // the partial pressure of H2 drops drastically, driving CH4 conversion up to 55-75%
  const removalFrac = Math.max(0.0, Math.min(0.95, h2ExtractionRatePct / 100));
  const enhancementFactor = 1.0 + (removalFrac * 4.8); // Up to ~5.5x enhancement
  let xMem = xEq * enhancementFactor;
  xMem = Math.max(xEq, Math.min(0.78, xMem)); // Upper kinetic limit ~78%

  const benzeneSel = 78.0 - Math.max(0, (temperatureC - 700) * 0.08); // Slight drop at very high temp

  return {
    temperatureC,
    equilibriumMethaneConversionPct: Number((xEq * 100).toFixed(1)),
    membraneMethaneConversionPct: Number((xMem * 100).toFixed(1)),
    conversionEnhancementFactor: Number((xMem / xEq).toFixed(2)),
    benzeneSelectivityPct: Number(benzeneSel.toFixed(1)),
    hydrogenRecoveryYieldPct: Number((removalFrac * 100).toFixed(1))
  };
}

/**
 * Calculate Hydrogen Permeation Flux through the Membrane (Sieverts' Law)
 * Formula: J_H2 = (Permeability / L) * (p_ret^0.5 - p_perm^0.5)
 */
export function calculateMembraneFlux(params: {
  membraneType: MembraneMaterialType;
  feedPressureBar: number;
  permeatePressureBar: number;
  temperatureC: number;
  membraneThicknessMicrons: number;
  h2PartialPressureRetentateBar: number;
}): MembraneFluxMetrics {
  const {
    membraneType,
    feedPressureBar,
    permeatePressureBar,
    temperatureC,
    membraneThicknessMicrons,
    h2PartialPressureRetentateBar
  } = params;

  const membrane = MEMBRANE_CATALOG[membraneType];
  const pRetPa = Math.max(0.1, h2PartialPressureRetentateBar) * 1e5;
  const pPermPa = Math.max(0.01, permeatePressureBar) * 1e5;

  const drivingForce = Math.max(0, Math.sqrt(pRetPa) - Math.sqrt(pPermPa));
  const thicknessM = membraneThicknessMicrons * 1e-6;

  // Temperature Arrhenius activation for permeation
  const tNorm = (temperatureC + 273.15) / 973.15;
  const tempCorrection = Math.exp(-2500 / 8.314 * (1 / (temperatureC + 273.15) - 1 / 973.15));

  const permEffective = membrane.h2PermeabilityMolPerMSPa05 * tempCorrection;
  const fluxMolPerM2S = (permEffective / thicknessM) * drivingForce;

  const h2Purity = membrane.h2N2SelectivityRatio > 5000 ? 99.999 : 99.85;

  return {
    feedPressureBar,
    permeatePressureBar,
    membraneThicknessMicrons,
    sievertsPressureDrivingForcePa05: Number(drivingForce.toFixed(1)),
    h2PermeationFluxMolPerM2S: Number(fluxMolPerM2S.toFixed(4)),
    h2PurityPct: h2Purity,
    sweepGasVelocityMPerS: 1.2
  };
}

/**
 * Calculate Complete Plant Mass and Energy Balance
 */
export function calculateMdaPlantBalance(params: {
  methaneFeedNm3PerHour: number;
  operatingTempC: number;
  feedPressureBar: number;
  permeatePressureBar: number;
  catalystType: MdaCatalystType;
  membraneType: MembraneMaterialType;
  membraneAreaM2: number;
  membraneActive: boolean;
}): MdaPlantMassEnergyBalance {
  const {
    methaneFeedNm3PerHour,
    operatingTempC,
    feedPressureBar,
    catalystType,
    membraneActive
  } = params;

  const catalyst = MDA_CATALYST_CATALOG[catalystType];

  // Feed molar flow: 1 Nm3 ideal gas = 44.615 mol = 0.044615 kmol
  const ch4InletKmolPerHour = methaneFeedNm3PerHour / 22.414;

  // Determine conversion: equilibrium alone vs membrane-enhanced
  const h2ExtractionPct = membraneActive ? 85.0 : 0.0;
  const eqComparison = calculateEquilibriumVsMembrane(operatingTempC, h2ExtractionPct);
  const conversionPct = membraneActive
    ? eqComparison.membraneMethaneConversionPct
    : eqComparison.equilibriumMethaneConversionPct;

  const ch4ReactedKmolPerHour = ch4InletKmolPerHour * (conversionPct / 100);

  // Reaction stoichiometry: 6 CH4 -> 1 C6H6 + 9 H2
  const benzeneSelectivity = catalyst.typicalBenzeneSelectivityPct / 100;
  const ch4ToBenzeneKmolPerHour = ch4ReactedKmolPerHour * benzeneSelectivity;
  const benzeneProducedKmolPerHour = ch4ToBenzeneKmolPerHour / 6.0;
  const benzeneKgPerHour = benzeneProducedKmolPerHour * MOLAR_MASS_BENZENE;

  // Hydrogen production: 9 mol H2 per 1 mol benzene produced
  // Plus side cracking to coke: CH4 -> C + 2 H2
  const ch4ToCokeKmolPerHour = ch4ReactedKmolPerHour * (1 - benzeneSelectivity) * 0.70;
  const h2ProducedKmolPerHour = (benzeneProducedKmolPerHour * 9.0) + (ch4ToCokeKmolPerHour * 2.0);

  const h2KgPerHour = h2ProducedKmolPerHour * MOLAR_MASS_H2;
  const h2Nm3PerHour = h2ProducedKmolPerHour * 22.414;

  const cokeKgPerHour = ch4ToCokeKmolPerHour * 12.011;

  const plantHoursPerYear = 8000;
  const benzeneAnnualMetricTons = (benzeneKgPerHour * plantHoursPerYear) / 1000;
  const hydrogenAnnualMetricTons = (h2KgPerHour * plantHoursPerYear) / 1000;

  // Endothermic heat requirement: +99.67 kJ/mol CH4 reacted
  // MWth = (kmol/hr * 1000 mol/kmol * 99.67 kJ/mol) / 3,600,000 kJ/MWh
  const endothermicHeatMwTh = (ch4ReactedKmolPerHour * 1000 * 99.67) / 3.6e6;

  // Environmental benefit: Compared to Steam Methane Reforming (SMR) which emits ~10.2 kg CO2 / kg H2
  // MDA emits 0 kg CO2 into product stream (carbon is captured into liquid benzene C6H6)
  const co2AvoidedTonsPerYear = (hydrogenAnnualMetricTons * 1000 * SMR_CO2_EMISSION_FACTOR_KG_PER_KG_H2) / 1000;

  const annualBenzeneValue = benzeneAnnualMetricTons * BENZENE_MARKET_PRICE_USD_PER_TON;
  const annualH2Value = (hydrogenAnnualMetricTons * 1000) * GREEN_TURQUOISE_H2_PRICE_USD_PER_KG;

  return {
    methaneFeedNm3PerHour,
    operatingTempC,
    feedPressureBar,
    methaneConversionPct: Number(conversionPct.toFixed(1)),
    methaneReactedKmolPerHour: Number(ch4ReactedKmolPerHour.toFixed(2)),
    benzeneProductionKgPerHour: Number(benzeneKgPerHour.toFixed(1)),
    benzeneAnnualMetricTons: Number(benzeneAnnualMetricTons.toFixed(1)),
    pureHydrogenProducedNm3PerHour: Number(h2Nm3PerHour.toFixed(1)),
    pureHydrogenKgPerHour: Number(h2KgPerHour.toFixed(1)),
    hydrogenAnnualMetricTons: Number(hydrogenAnnualMetricTons.toFixed(1)),
    cokeFormationRateKgPerHour: Number(cokeKgPerHour.toFixed(1)),
    endothermicHeatRequiredMwTh: Number(endothermicHeatMwTh.toFixed(2)),
    co2AvoidedVsSmrTonsPerYear: Number(co2AvoidedTonsPerYear.toFixed(0)),
    annualBenzeneMarketValueUsd: Number(annualBenzeneValue.toFixed(0)),
    annualHydrogenValueUsd: Number(annualH2Value.toFixed(0))
  };
}

/**
 * Evaluate Catalyst Coking & In-Situ Regeneration Kinetics
 */
export function evaluateCatalystCoking(params: {
  timeOnStreamHours: number;
  catalystType: MdaCatalystType;
  membraneInSituH2Extraction: boolean;
}): CatalystDeactivationKinetics {
  const { timeOnStreamHours, catalystType, membraneInSituH2Extraction } = params;
  const cat = MDA_CATALYST_CATALOG[catalystType];

  let cokingRateMultiplier = 1.0;
  if (cat.cokingResistance === 'HIGH') cokingRateMultiplier = 0.55;
  if (cat.cokingResistance === 'EXCELLENT') cokingRateMultiplier = 0.35;

  // With membrane H2 extraction, product benzene leaves the zeolite pores faster,
  // reducing secondary polyaromatic condensation
  const membraneMitigation = membraneInSituH2Extraction ? 0.70 : 1.0;

  // Coke deposited: wt% grows with sqrt(time)
  const cokeWtPct = Math.min(18.0, 1.2 * Math.sqrt(timeOnStreamHours) * cokingRateMultiplier * membraneMitigation);

  // Activity drops as coke blocks pores (deactivation model)
  const relativeActivity = Math.max(15.0, 100.0 - (cokeWtPct * 4.8));

  const needsRegen = relativeActivity < 50.0 || timeOnStreamHours >= 12.0;

  let regenIntervention = '';
  if (needsRegen) {
    regenIntervention = `Cần kích hoạt chu kỳ tái sinh xúc tác: Lượng muội than tích tụ đạt ${cokeWtPct.toFixed(1)} wt%, hoạt tính giảm còn ${relativeActivity.toFixed(1)}%. Thực hiện thổi xung hydro (H₂) hoặc dòng CO₂ loãng (CO₂ + C → 2 CO) ở ${cat.optimalTemperatureRangeC[0]}°C để khôi phục 98% hoạt tính ban đầu.`;
  } else {
    regenIntervention = `Xúc tác hoạt động ổn định: Lượng muội than kiểm soát ở mức ${cokeWtPct.toFixed(1)} wt%, hoạt tính duy trì ${relativeActivity.toFixed(1)}%. Kênh zeolit ZSM-5 thông suốt, hình học chọn lọc benzen tối ưu.`;
  }

  return {
    timeOnStreamHours,
    carbonCokeDepositedWtPct: Number(cokeWtPct.toFixed(2)),
    relativeActivityPct: Number(relativeActivity.toFixed(1)),
    regenerationCycleHours: 12.0,
    isRegenerationRequired: needsRegen,
    regenerationIntervention: regenIntervention
  };
}

/**
 * Multi-Route Hydrogen & Chemical Production Benchmark
 */
export interface HydrogenAromaticsRouteBenchmark {
  processName: string;
  feedstock: string;
  co2EmissionsKgPerKgH2: number;
  productStateOfCarbon: string;
  energyEfficiencyLhvPct: number;
  hydrogenPurityRawPct: string;
  byproductCommercialValue: string;
}

export const HYDROGEN_AROMATICS_BENCHMARKS: HydrogenAromaticsRouteBenchmark[] = [
  {
    processName: 'Reforming Metan Hơi Nước Truyền Thống (Conventional SMR)',
    feedstock: 'Khí thiên nhiên CH₄ + Hơi nước H₂O',
    co2EmissionsKgPerKgH2: 10.2, // Huge carbon footprint
    productStateOfCarbon: 'Khí CO₂ phát thải thẳng vào khí quyển',
    energyEfficiencyLhvPct: 68.0,
    hydrogenPurityRawPct: '72 - 76% (cần hệ thống PSA 8 tháp phức tạp)',
    byproductCommercialValue: 'Không có (chỉ tạo khí thải nhà kính CO₂)'
  },
  {
    processName: 'Lò Phản Ứng Màng MDA (Membrane Methane Aromatization)',
    feedstock: 'Khí thiên nhiên CH₄ hoặc Biomethane sinh học',
    co2EmissionsKgPerKgH2: 0.0, // Zero direct CO2
    productStateOfCarbon: 'Hợp chất thơm lỏng giá trị cao (Benzen C₆H₆, Toluen)',
    energyEfficiencyLhvPct: 82.5,
    hydrogenPurityRawPct: '> 99.999% (Thẩm thấu qua màng gốm BZY/Pd)',
    byproductCommercialValue: 'Benzen hóa dầu tinh khiết ($950/tấn) dùng sản xuất polyme'
  },
  {
    processName: 'Nhiệt Phân Metan Khí Đốt (Methane Pyrolysis / Turquoise)',
    feedstock: 'Khí thiên nhiên CH₄ (Lò plasma / bể kim loại lỏng)',
    co2EmissionsKgPerKgH2: 0.8,
    productStateOfCarbon: 'Muội than rắn Carbon Black (C rắn)',
    energyEfficiencyLhvPct: 58.0,
    hydrogenPurityRawPct: '85 - 90%',
    byproductCommercialValue: 'Bột than carbon đen ($500/tấn) cho sản xuất vỏ lốp xe'
  },
  {
    processName: 'Điện Phân Nước Năng Lượng Tái Tạo (PEM Water Electrolysis)',
    feedstock: 'Nước siêu sạch H₂O + Điện gió / mặt trời',
    co2EmissionsKgPerKgH2: 0.0,
    productStateOfCarbon: 'Không có carbon trong chu trình',
    energyEfficiencyLhvPct: 65.0,
    hydrogenPurityRawPct: '99.99%',
    byproductCommercialValue: 'Khí oxy y tế tinh khiết (O₂)'
  }
];
