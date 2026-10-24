// src/domain/perovskiteSolarEngine.ts
// Comprehensive Domain Engine: Perovskite Solar Cells, ABX3 Crystal Lattices & 2-Terminal Tandem Perovskite/Silicon Record
// Standards: IUPAC Photovoltaics, NREL Best Research-Cell Efficiency Chart, ISOS Solar Cell Testing Protocols & Vietnam GDPT 2018 (Hóa học 10 & 11: Liên kết ion, Tinh thể & Năng lượng mặt trời)

export type PerovskiteCompositionId = 
  | 'MAPI_PURE' 
  | 'FAPI_STABILIZED_CS' 
  | 'MIXED_HALIDE_WIDE_GAP' 
  | 'TIN_HALIDE_LEAD_FREE';

export type SolarArchitectureType = 'SINGLE_JUNCTION_PEROVSKITE' | 'SINGLE_JUNCTION_SILICON' | 'TANDEM_PEROVSKITE_SILICON_2T';

export interface PerovskiteCompositionSpec {
  id: PerovskiteCompositionId;
  formula: string;
  name: string;
  aSiteCation: string; // MA+, FA+, Cs+
  bSiteCation: string; // Pb2+, Sn2+
  xSiteAnion: string; // I-, Br-, Cl-
  aRadiusAngstrom: number;
  bRadiusAngstrom: number;
  xRadiusAngstrom: number;
  goldschmidtToleranceFactor: number;
  octahedralFactor: number;
  phaseStability: string; // 'Stable Cubic Alpha Phase' | 'Metastable' | 'Yellow Delta Phase Risk'
  bandgapEv: number;
  theoreticalMaxVocVolts: number;
  absorptionCutoffNm: number;
  isLeadFree: boolean;
  commercialStatus: string;
}

export interface SolarIVPoint {
  voltageVolts: number;
  currentDensityMaPerCm2: number;
  powerDensityMwPerCm2: number;
}

export interface SolarPerformanceResult {
  architecture: SolarArchitectureType;
  composition: PerovskiteCompositionSpec;
  incidentIrradianceMwPerCm2: number; // 100 mW/cm² = 1 Sun (AM1.5G)
  shortCircuitCurrentJscMaPerCm2: number;
  openCircuitVoltageVocVolts: number;
  fillFactorPercent: number;
  powerConversionEfficiencyPercent: number; // PCE (%)
  shockleyQueisserLimitPercent: number;
  exceedsSingleJunctionLimit: boolean;
  currentMatchingStatus?: string;
  temperatureCoefficientPcePerK: number;
}

export interface PerovskiteDegradationPoint {
  hoursIllumination: number;
  standardUnpassivatedPcePercent: number;
  passivated2d3dEncapsulatedPcePercent: number;
  siliconBaselinePcePercent: number;
}

// -------------------------------------------------------------------------
// 1. GOLDSCHMIDT TOLERANCE FACTOR CALCULATOR
// -------------------------------------------------------------------------

export function calculateGoldschmidtTolerance(
  rA: number,
  rB: number,
  rX: number
): { toleranceFactor: number; octahedralFactor: number; crystalVerdict: string } {
  // t = (rA + rX) / (sqrt(2) * (rB + rX))
  const toleranceFactor = (rA + rX) / (Math.SQRT2 * (rB + rX));
  // mu = rB / rX
  const octahedralFactor = rB / rX;

  let crystalVerdict = '';
  if (toleranceFactor >= 0.88 && toleranceFactor <= 1.02 && octahedralFactor >= 0.44 && octahedralFactor <= 0.90) {
    crystalVerdict = 'Pha lập phương lý tưởng (Ideal Cubic Alpha-Perovskite, Quang hoạt mạnh nhất)';
  } else if (toleranceFactor >= 0.80 && toleranceFactor < 0.88) {
    crystalVerdict = 'Pha trực thoi/trụ lục giác lệch (Orthorhombic/Tetragonal, Cần biến tính cation để ổn định)';
  } else if (toleranceFactor > 1.02) {
    crystalVerdict = 'Pha 2D lục giác không quang hoạt (Hexagonal Non-perovskite Yellow Phase, Kém hiệu quả)';
  } else {
    crystalVerdict = 'Mạng tinh thể sụp đổ (Cation A quá nhỏ, biến dạng bát diện [BX6]⁴⁻)';
  }

  return {
    toleranceFactor: Number(toleranceFactor.toFixed(3)),
    octahedralFactor: Number(octahedralFactor.toFixed(3)),
    crystalVerdict
  };
}

// -------------------------------------------------------------------------
// 2. PEROVSKITE COMPOSITIONS CATALOG
// -------------------------------------------------------------------------

export const PEROVSKITE_COMPOSITIONS_CATALOG: PerovskiteCompositionSpec[] = [
  {
    id: 'MAPI_PURE',
    formula: 'CH₃NH₃PbI₃ (MAPbI₃)',
    name: 'Methylammonium Chì Iodide (MAPI Cổ Điển)',
    aSiteCation: 'MA⁺ (Methylammonium, r = 2.17 Å)',
    bSiteCation: 'Pb²⁺ (Chì, r = 1.19 Å)',
    xSiteAnion: 'I⁻ (Iodide, r = 2.20 Å)',
    aRadiusAngstrom: 2.17,
    bRadiusAngstrom: 1.19,
    xRadiusAngstrom: 2.20,
    goldschmidtToleranceFactor: 0.912,
    octahedralFactor: 0.541,
    phaseStability: 'Pha tứ giác α-quang hoạt tại 25°C, dễ bị thủy phân bởi hơi ẩm',
    bandgapEv: 1.55,
    theoreticalMaxVocVolts: 1.22,
    absorptionCutoffNm: 800,
    isLeadFree: false,
    commercialStatus: 'Vật liệu mốc lịch sử khởi xướng kỷ nguyên Perovskite (2009: 3.8% -> 2020: 22%)'
  },
  {
    id: 'FAPI_STABILIZED_CS',
    formula: 'Cs₀.₀₅FA₀.₉₅PbI₃ (Cs-FAPI Ổn Định)',
    name: 'Formamidinium-Cesium Chì Iodide (Kỷ Lục Hiệu Suất)',
    aSiteCation: 'FA⁺ (0.95, r = 2.53 Å) + Cs⁺ (0.05, r = 1.88 Å)',
    bSiteCation: 'Pb²⁺ (Chì, r = 1.19 Å)',
    xSiteAnion: 'I⁻ (Iodide, r = 2.20 Å)',
    aRadiusAngstrom: 2.50,
    bRadiusAngstrom: 1.19,
    xRadiusAngstrom: 2.20,
    goldschmidtToleranceFactor: 0.981,
    octahedralFactor: 0.541,
    phaseStability: 'Bền vững tuyệt đối chống chuyển pha vàng δ nhờ pha tạp 5% cation nhỏ Cs⁺ khóa mạng',
    bandgapEv: 1.48,
    theoreticalMaxVocVolts: 1.18,
    absorptionCutoffNm: 838,
    isLeadFree: false,
    commercialStatus: 'Đạt kỷ lục thế giới pin đơn lớp perovskite (NREL certified PCE > 26.1%)'
  },
  {
    id: 'MIXED_HALIDE_WIDE_GAP',
    formula: 'Cs₀.₁₇FA₀.₈₃Pb(I₀.₇₇Br₀.₂₃)₃',
    name: 'Perovskite Halogen Trộn Vùng Cấm Rộng (Top-Cell Tandem)',
    aSiteCation: 'FA⁺/Cs⁺ hỗn hợp (r = 2.42 Å)',
    bSiteCation: 'Pb²⁺ (Chì, r = 1.19 Å)',
    xSiteAnion: 'I⁻/Br⁻ hỗn hợp (r = 2.14 Å)',
    aRadiusAngstrom: 2.42,
    bRadiusAngstrom: 1.19,
    xRadiusAngstrom: 2.14,
    goldschmidtToleranceFactor: 0.970,
    octahedralFactor: 0.556,
    phaseStability: 'Vùng cấm mở rộng tối ưu 1.68 eV, hấp thụ photon xanh/tím năng lượng cao không phân kỳ',
    bandgapEv: 1.68,
    theoreticalMaxVocVolts: 1.33,
    absorptionCutoffNm: 738,
    isLeadFree: false,
    commercialStatus: 'Trụ cột của pin mặt trời Tandem 2 cực kết hợp tấm nền Silicon phá vỡ mốc 33.9%'
  },
  {
    id: 'TIN_HALIDE_LEAD_FREE',
    formula: 'CH₃NH₃SnI₃ (MASnI₃ Không Chì Xanh)',
    name: 'Tin Halide Thân Thiện Môi Trường (Lead-Free Perovskite)',
    aSiteCation: 'MA⁺ (Methylammonium, r = 2.17 Å)',
    bSiteCation: 'Sn²⁺ (Thiếc, r = 1.10 Å)',
    xSiteAnion: 'I⁻ (Iodide, r = 2.20 Å)',
    aRadiusAngstrom: 2.17,
    bRadiusAngstrom: 1.10,
    xRadiusAngstrom: 2.20,
    goldschmidtToleranceFactor: 0.937,
    octahedralFactor: 0.500,
    phaseStability: 'Hoàn toàn không độc hại, tuy nhiên cation Sn²⁺ nhạy cảm tự oxi hóa thành Sn⁴⁺ trong khí quyển',
    bandgapEv: 1.30,
    theoreticalMaxVocVolts: 0.98,
    absorptionCutoffNm: 954,
    isLeadFree: true,
    commercialStatus: 'Đang nghiên cứu khử Sn⁴⁺ bằng phụ gia axit ascorbic và hydrazine'
  }
];

// -------------------------------------------------------------------------
// 3. PHOTOVOLTAIC SIMULATION & CURRENT-MATCHED TANDEM CALCULATOR
// -------------------------------------------------------------------------

export function simulateSolarCellPerformance(
  architecture: SolarArchitectureType,
  compositionId: PerovskiteCompositionId,
  irradianceSuns: number = 1.0,
  temperatureCelsius: number = 25
): {
  performance: SolarPerformanceResult;
  ivPoints: SolarIVPoint[];
} {
  const composition = PEROVSKITE_COMPOSITIONS_CATALOG.find(c => c.id === compositionId) || PEROVSKITE_COMPOSITIONS_CATALOG[0];
  const incidentIrradianceMwPerCm2 = irradianceSuns * 100; // AM1.5G = 100 mW/cm²

  let jsc = 0;
  let voc = 0;
  let ff = 0;
  let pce = 0;
  let sqLimit = 33.7;
  let currentMatchingStatus: string | undefined = undefined;

  // Temperature impact: Perovskites have negative temperature coefficient (~ -0.15%/K to -0.25%/K)
  const deltaT = temperatureCelsius - 25;
  const tempFactor = 1 - (0.002 * deltaT);

  if (architecture === 'SINGLE_JUNCTION_PEROVSKITE') {
    sqLimit = 33.7; // Single junction Shockley-Queisser
    // Jsc calibrated to AM1.5G photon flux above bandgap
    // Eg = 1.48 eV -> ~26.2 mA/cm²; Eg = 1.55 eV -> ~23.8 mA/cm²; Eg = 1.68 eV -> ~20.8 mA/cm²
    const baseJsc = composition.id === 'FAPI_STABILIZED_CS' ? 26.2
      : composition.id === 'MAPI_PURE' ? 23.8
      : composition.id === 'MIXED_HALIDE_WIDE_GAP' ? 20.8
      : 31.5; // MASnI3
    jsc = baseJsc * irradianceSuns;
    voc = Math.max(0.7, composition.theoreticalMaxVocVolts * 0.96) * tempFactor;
    ff = 0.83; // 83% fill factor for state-of-the-art passivation
    const maxPowerMw = (jsc * voc * ff);
    pce = (maxPowerMw / incidentIrradianceMwPerCm2) * 100;
  } 
  else if (architecture === 'SINGLE_JUNCTION_SILICON') {
    sqLimit = 29.4; // Intrinsic Auger limit for crystalline silicon (Eg = 1.12 eV)
    jsc = 42.5 * irradianceSuns; // Broad absorption up to 1100 nm
    voc = 0.745 * (1 - 0.003 * deltaT); // Silicon has larger temp loss
    ff = 0.835;
    const maxPowerMw = (jsc * voc * ff);
    pce = (maxPowerMw / incidentIrradianceMwPerCm2) * 100;
  } 
  else {
    // 2-TERMINAL TANDEM PEROVSKITE/SILICON MONOLITHIC
    sqLimit = 44.5; // Tandem theoretical thermodynamic limit
    
    // Top Cell: Perovskite absorbs blue/green photons (300 nm to 750 nm)
    // For optimum tandem, top Eg ~ 1.68 eV (MIXED_HALIDE_WIDE_GAP)
    const topJsc = 20.8 * irradianceSuns;
    const topVoc = 1.25 * tempFactor;

    // Bottom Cell: Silicon Heterojunction absorbs infrared photons (750 nm to 1200 nm) transmitted through top cell
    const bottomJsc = 20.2 * irradianceSuns;
    const bottomVoc = 0.74 * (1 - 0.003 * deltaT);

    // 2-Terminal Series Connection Constraint: Current Matching!
    // Current is strictly limited by the lower sub-cell current
    jsc = Math.min(topJsc, bottomJsc);
    // Voltages add up in series!
    voc = topVoc + bottomVoc; // ~1.99 V!
    ff = 0.825;

    const maxPowerMw = (jsc * voc * ff);
    pce = (maxPowerMw / incidentIrradianceMwPerCm2) * 100;

    const currentMismatchRatio = Math.abs(topJsc - bottomJsc) / Math.max(topJsc, bottomJsc);
    if (currentMismatchRatio < 0.04) {
      currentMatchingStatus = `Khớp dòng hoàn hảo (Current-Matched: Top = ${topJsc.toFixed(1)} mA/cm², Bottom = ${bottomJsc.toFixed(1)} mA/cm², Lệch < 4%)`;
    } else {
      currentMatchingStatus = `Lệch dòng nhẹ (Top = ${topJsc.toFixed(1)} mA/cm², Bottom = ${bottomJsc.toFixed(1)} mA/cm², Dòng tandem bị giới hạn bởi cực nhỏ hơn)`;
    }
  }

  // Generate 25 IV sample points
  const ivPoints: SolarIVPoint[] = [];
  const steps = 25;
  for (let i = 0; i <= steps; i++) {
    const v = (voc * i) / steps;
    // Standard one-diode photovoltaic equation: J(V) = J_sc - J_0 * (exp(qV / n*kT) - 1)
    const normalizedV = v / voc;
    // Approximate curve matching Fill Factor
    const current = Math.max(0, jsc * (1 - Math.pow(normalizedV, 7.5)));
    const power = v * current;

    ivPoints.push({
      voltageVolts: Number(v.toFixed(3)),
      currentDensityMaPerCm2: Number(current.toFixed(2)),
      powerDensityMwPerCm2: Number(power.toFixed(2))
    });
  }

  const performance: SolarPerformanceResult = {
    architecture,
    composition,
    incidentIrradianceMwPerCm2,
    shortCircuitCurrentJscMaPerCm2: Number(jsc.toFixed(2)),
    openCircuitVoltageVocVolts: Number(voc.toFixed(3)),
    fillFactorPercent: Number((ff * 100).toFixed(1)),
    powerConversionEfficiencyPercent: Number(pce.toFixed(2)),
    shockleyQueisserLimitPercent: sqLimit,
    exceedsSingleJunctionLimit: pce > 30.0,
    currentMatchingStatus,
    temperatureCoefficientPcePerK: architecture === 'TANDEM_PEROVSKITE_SILICON_2T' ? -0.22 : architecture === 'SINGLE_JUNCTION_SILICON' ? -0.32 : -0.16
  };

  return { performance, ivPoints };
}

// -------------------------------------------------------------------------
// 4. LONG-TERM OPERATIONAL STABILITY & PASSIVATION SIMULATION
// -------------------------------------------------------------------------

export function simulatePerovskiteStabilityISOS(
  maxHours: number = 2000
): PerovskiteDegradationPoint[] {
  const points: PerovskiteDegradationPoint[] = [];
  const hourSteps = [0, 50, 100, 200, 300, 500, 750, 1000, 1500, 2000];

  for (const h of hourSteps) {
    if (h > maxHours) continue;

    // 1. Unpassivated 3D MAPI in humid air (Rapid hydrolysis & phase breakdown)
    // Drops to < 50% in 300h due to moisture & iodine escape
    const unpassivatedRatio = Math.max(0.1, Math.exp(-h / 250));

    // 2. State-of-the-art 2D/3D heterostructure with fluorinated hydrophobic encapsulation
    // Retains > 95% PCE after 1000h (Passing international ISOS-L-1 benchmark)
    const passivatedRatio = 1.0 - (0.05 * (h / 1000));

    // 3. Silicon baseline (extremely slow degradation, ~0.5%/year)
    const siliconRatio = 1.0 - (0.01 * (h / 2000));

    points.push({
      hoursIllumination: h,
      standardUnpassivatedPcePercent: Number((22.0 * unpassivatedRatio).toFixed(1)),
      passivated2d3dEncapsulatedPcePercent: Number((25.5 * Math.max(0.85, passivatedRatio)).toFixed(1)),
      siliconBaselinePcePercent: Number((24.5 * siliconRatio).toFixed(1))
    });
  }

  return points;
}
