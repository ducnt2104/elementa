// src/domain/microchannelFischerTropschEngine.ts
// Microchannel Fischer-Tropsch Catalytic Synthesis & Sustainable Aviation Fuel (SAF / PtL) Domain Engine
// Conforms to: ASTM D7566 Annex A2 (FT-SPK), ICAO CORSIA, EU ReFuelEU Aviation & Vietnam GDPT 2018 Chemistry

export type FtCatalystType =
  | 'COBALT_RE_AL2O3'
  | 'COBALT_PT_TIO2'
  | 'IRON_CU_K_SIO2'
  | 'RUTHENIUM_TIO2';

export type ReactorArchitectureType =
  | 'MICROCHANNEL_MODULAR'
  | 'MULTI_TUBULAR_FIXED_BED'
  | 'SLURRY_BUBBLE_COLUMN';

export interface FtCatalystProperties {
  id: FtCatalystType;
  name: string;
  activeMetal: string;
  promoter: string;
  support: string;
  optimalTemperatureRangeC: [number, number];
  optimalPressureBar: number;
  optimalH2CoRatio: number;
  typicalAlpha: number;
  waterGasShiftActivity: 'NEGLIGIBLE' | 'MODERATE' | 'HIGH';
  methaneSelectivityTypicalPct: number;
  costTier: 'LOW' | 'MEDIUM' | 'HIGH' | 'EXTREME_PRECIOUS';
  description: string;
}

export interface ReactorArchitectureProperties {
  id: ReactorArchitectureType;
  name: string;
  hydraulicDiameterMm: number;
  heatTransferCoefficientWPerM2K: number;
  radialDeltaTMaxDegC: number;
  volumetricProductivityGC5PerGCatHr: number;
  hotspotRisk: 'NEGLIGIBLE' | 'MODERATE' | 'CRITICAL';
  skidFootprintReductionPct: number;
  description: string;
}

export interface ProductFraction {
  name: string;
  carbonRange: string;
  formulaRepresentative: string;
  weightFractionPct: number;
  densityKgPerL: number;
  primaryApplication: string;
  boilingPointRangeC: string;
}

export interface AsfDistributionResult {
  alpha: number;
  c1MethaneSelectivityPct: number;
  c2C4LpgPct: number;
  c5C8NaphthaPct: number;
  c9C16KeroseneSafPct: number;
  c17C22DieselPct: number;
  c23PlusWaxPct: number;
  totalC5PlusSelectivityPct: number;
  fractions: ProductFraction[];
}

export interface ReactorHeatTransferMetrics {
  hydraulicDiameterMm: number;
  heatTransferCoefficientWPerM2K: number;
  radialDeltaTMaxDegC: number;
  volumetricProductivityGC5PerGCatHr: number;
  runawayHotspotRisk: 'NEGLIGIBLE' | 'MODERATE' | 'CRITICAL';
  reactorVolumeReductionPct: number;
}

export interface PlantMassAndEnergyBalance {
  syngasFeedNm3PerHour: number;
  h2CoRatio: number;
  coConversionPct: number;
  molarCoInletKmolPerHour: number;
  molarH2InletKmolPerHour: number;
  syncrudeProductionKgPerHour: number;
  syncrudeProductionBpd: number; // Barrels per day
  safAviationFuelProductionKgPerHour: number;
  safAnnualMetricTons: number;
  waxProductionKgPerHour: number;
  additionalSafFromWaxHydrocrackingKgPerHour: number;
  totalSafWithHydrocrackingKgPerHour: number;
  totalSafAnnualMetricTons: number;
  reactionHeatGeneratedMwTh: number; // Exothermic heat (-165 kJ/mol CO)
  mediumPressureSteamGeneratedTonsPerHour: number; // 20 bar saturated steam co-generated
  co2EquivalentAvoidedTonsPerYear: number;
  flightsPoweredPerYear: number; // Airbus A321 / Boeing 737 short-haul flights (~2,800 kg fuel/flight)
}

export interface AstmD7566SafCompliance {
  isCompliant: boolean;
  standardName: string;
  blendRatioMaxPct: number;
  freezingPointDegC: number;
  energyDensityMjPerKg: number;
  sulfurContentPpm: number;
  aromaticsContentNeatVolPct: number;
  sootReductionPct: number;
  ghgLifeCycleSavingsPct: number;
  certifications: string[];
  technicalAssessment: string;
}

/**
 * Fundamental Catalytic & Thermochemical Constants
 */
export const ENTHALPY_OF_FT_REACTION_KJ_PER_MOL_CO = 165.0; // Exothermic: CO + 2.1 H2 -> -CH2- + H2O
export const DENSITY_SYNCRUDE_KG_PER_L = 0.78; // Average syncrude liquid density
export const LITERS_PER_OIL_BARREL = 158.987;
export const JET_FUEL_CO2_EMISSION_FACTOR = 3.16; // kg CO2 per kg fossil Jet A-1 combusted
export const AVERAGE_SHORT_HAUL_FLIGHT_FUEL_KG = 2800; // Airbus A321 Hanoi - Ho Chi Minh City (~1,150 km)

export const FT_CATALYST_CATALOG: Record<FtCatalystType, FtCatalystProperties> = {
  COBALT_RE_AL2O3: {
    id: 'COBALT_RE_AL2O3',
    name: 'Cobalt Tăng Cường Rheni trên Al₂O₃ (Co-Re/γ-Al₂O₃)',
    activeMetal: 'Cobalt (Co 15-20 wt%)',
    promoter: 'Rhenium (Re 0.1-0.5 wt%)',
    support: 'Gamma Alumina (γ-Al₂O₃)',
    optimalTemperatureRangeC: [210, 230],
    optimalPressureBar: 25.0,
    optimalH2CoRatio: 2.1,
    typicalAlpha: 0.90,
    waterGasShiftActivity: 'NEGLIGIBLE',
    methaneSelectivityTypicalPct: 6.5,
    costTier: 'MEDIUM',
    description: 'Chất xúc tác chuẩn mực vàng công nghiệp cho tổng hợp Power-to-Liquid (PtL). Hoạt tính Water-Gas-Shift cực thấp giúp bảo toàn 100% hydro xanh, hệ số alpha cao (0.90) cho độ chọn lọc hydrocacbon nặng tối đa.'
  },
  COBALT_PT_TIO2: {
    id: 'COBALT_PT_TIO2',
    name: 'Cobalt Tăng Cường Bạch Kim trên TiO₂ (Co-Pt/TiO₂)',
    activeMetal: 'Cobalt (Co 12 wt%)',
    promoter: 'Platinum (Pt 0.05 wt%)',
    support: 'Titania Rutile/Anatase (TiO₂)',
    optimalTemperatureRangeC: [205, 225],
    optimalPressureBar: 20.0,
    optimalH2CoRatio: 2.05,
    typicalAlpha: 0.88,
    waterGasShiftActivity: 'NEGLIGIBLE',
    methaneSelectivityTypicalPct: 5.8,
    costTier: 'HIGH',
    description: 'Khả năng khử kim loại cao nhờ hiệu ứng tràn hydro (hydrogen spillover) từ hạt nano Pt. Kháng ngộ độc nước cực tốt trong các lò phản ứng vi kênh tải nhiệt cao.'
  },
  IRON_CU_K_SIO2: {
    id: 'IRON_CU_K_SIO2',
    name: 'Sắt Kết Tủa Biến Tính Cu-K (Fe-Cu-K/SiO₂)',
    activeMetal: 'Sắt (Fe 100 pbw)',
    promoter: 'Đồng (Cu 5 pbw) & Kali (K 4 pbw)',
    support: 'Silica vô định hình (SiO₂)',
    optimalTemperatureRangeC: [240, 270],
    optimalPressureBar: 25.0,
    optimalH2CoRatio: 1.2,
    typicalAlpha: 0.82,
    waterGasShiftActivity: 'HIGH',
    methaneSelectivityTypicalPct: 8.5,
    costTier: 'LOW',
    description: 'Chất xúc tác sắt giá rẻ tối ưu cho khí tổng hợp từ sinh khối (Biomass Gasification) có tỷ lệ H₂/CO thấp (~1.0 - 1.4), vì hoạt tính Water-Gas-Shift nội tại tự điều chỉnh hydro trong lò phản ứng.'
  },
  RUTHENIUM_TIO2: {
    id: 'RUTHENIUM_TIO2',
    name: 'Rutheni Nano trên Titania (Ru/TiO₂)',
    activeMetal: 'Ruthenium (Ru 2-5 wt%)',
    promoter: 'Không cần chất kích động',
    support: 'Titania (TiO₂)',
    optimalTemperatureRangeC: [180, 205],
    optimalPressureBar: 30.0,
    optimalH2CoRatio: 2.0,
    typicalAlpha: 0.93,
    waterGasShiftActivity: 'NEGLIGIBLE',
    methaneSelectivityTypicalPct: 3.5,
    costTier: 'EXTREME_PRECIOUS',
    description: 'Chất xúc tác có hoạt tính riêng cao nhất hành tinh ở nhiệt độ thấp (<200°C), triệt tiêu tạo khí metan (<3.5%) và sản sinh sáp parafin siêu nặng để bẻ gãy hydrocracking thành nhiên liệu phản lực SAF.'
  }
};

export const REACTOR_ARCHITECTURE_CATALOG: Record<ReactorArchitectureType, ReactorArchitectureProperties> = {
  MICROCHANNEL_MODULAR: {
    id: 'MICROCHANNEL_MODULAR',
    name: 'Lò Phản Ứng Vi Kênh Mô-Đun (Microchannel Process Intensification)',
    hydraulicDiameterMm: 1.5,
    heatTransferCoefficientWPerM2K: 7500.0, // 15x higher than fixed bed
    radialDeltaTMaxDegC: 1.2, // Near perfect isothermal
    volumetricProductivityGC5PerGCatHr: 2.2,
    hotspotRisk: 'NEGLIGIBLE',
    skidFootprintReductionPct: 88.0,
    description: 'Công nghệ kênh dẫn kích thước milimet xen kẽ lá tản nhiệt làm mát bằng nước sôi. Hệ số truyền nhiệt đạt 7,500 W/(m²·K), triệt tiêu hoàn toàn hiện tượng quá nhiệt cục bộ (hot-spots), tăng năng suất gấp 8 lần trên mỗi gram xúc tác.'
  },
  MULTI_TUBULAR_FIXED_BED: {
    id: 'MULTI_TUBULAR_FIXED_BED',
    name: 'Lò Phản Ứng Ống Cố Định Truyền Thống (Multi-tubular Fixed Bed)',
    hydraulicDiameterMm: 25.4, // 1 inch tube
    heatTransferCoefficientWPerM2K: 450.0,
    radialDeltaTMaxDegC: 18.5, // Severe radial thermal gradient
    volumetricProductivityGC5PerGCatHr: 0.35,
    hotspotRisk: 'CRITICAL',
    skidFootprintReductionPct: 0.0,
    description: 'Thiết kế cổ điển gồm hàng nghìn ống xúc tác dài 12m ngâm trong bể làm mát. Khả năng truyền nhiệt kém gây điểm nóng xuyên tâm chênh tới 18.5°C, dễ kích hoạt phản ứng runaway tạo khí metan vô dụng.'
  },
  SLURRY_BUBBLE_COLUMN: {
    id: 'SLURRY_BUBBLE_COLUMN',
    name: 'Cột Sục Khí Dạng Huyền Phù (Slurry Bubble Column Reactor - SBCR)',
    hydraulicDiameterMm: 100.0,
    heatTransferCoefficientWPerM2K: 1200.0,
    radialDeltaTMaxDegC: 4.5,
    volumetricProductivityGC5PerGCatHr: 0.65,
    hotspotRisk: 'MODERATE',
    skidFootprintReductionPct: 35.0,
    description: 'Hỗn hợp xúc tác bột phân tán trong sáp lỏng, khí tổng hợp sục từ đáy. Kiểm soát nhiệt tốt hơn ống cố định nhưng đòi hỏi tháp cao hàng chục mét và hệ thống tách lọc xúc tác sáp cực kỳ phức tạp.'
  }
};

/**
 * Anderson-Schulz-Flory (ASF) Polymerization Distribution Calculator
 * Formula: W_n = n * (1 - alpha)^2 * alpha^(n - 1)
 * Calculates mass fractions across fuel cuts: C1, C2-C4, C5-C8, C9-C16, C17-C22, C23+
 */
export function calculateAsfDistribution(alpha: number): AsfDistributionResult {
  const safeAlpha = Math.max(0.5, Math.min(0.98, alpha));
  const oneMinusAlphaSq = Math.pow(1 - safeAlpha, 2);

  // Exact summation for precision
  let wC1 = 0;
  let wC2C4 = 0;
  let wC5C8 = 0;
  let wC9C16 = 0;
  let wC17C22 = 0;
  let wC23Plus = 0;

  for (let n = 1; n <= 150; n++) {
    const wn = n * oneMinusAlphaSq * Math.pow(safeAlpha, n - 1);
    if (n === 1) {
      wC1 += wn;
    } else if (n >= 2 && n <= 4) {
      wC2C4 += wn;
    } else if (n >= 5 && n <= 8) {
      wC5C8 += wn;
    } else if (n >= 9 && n <= 16) {
      wC9C16 += wn;
    } else if (n >= 17 && n <= 22) {
      wC17C22 += wn;
    } else {
      wC23Plus += wn;
    }
  }

  const c1Pct = wC1 * 100;
  const c2C4Pct = wC2C4 * 100;
  const c5C8Pct = wC5C8 * 100;
  const c9C16Pct = wC9C16 * 100;
  const c17C22Pct = wC17C22 * 100;
  const c23PlusPct = wC23Plus * 100;
  const c5PlusPct = (wC5C8 + wC9C16 + wC17C22 + wC23Plus) * 100;

  const fractions: ProductFraction[] = [
    {
      name: 'Khí Đốt & Metan (Tail Gas / Methane)',
      carbonRange: 'C₁',
      formulaRepresentative: 'CH₄',
      weightFractionPct: Number(c1Pct.toFixed(2)),
      densityKgPerL: 0.0007,
      primaryApplication: 'Hồi lưu đốt lò sinh nhiệt hoặc reforming lại khí tổng hợp',
      boilingPointRangeC: '-161.5°C'
    },
    {
      name: 'Khí Hóa Lỏng LPG (Propane / Butane)',
      carbonRange: 'C₂ - C₄',
      formulaRepresentative: 'C₃H₈, C₄H₁₀',
      weightFractionPct: Number(c2C4Pct.toFixed(2)),
      densityKgPerL: 0.55,
      primaryApplication: 'Nhiên liệu khí đốt dân dụng LPG / Hóa dầu Ethylene-Propylene',
      boilingPointRangeC: '-42°C đến -0.5°C'
    },
    {
      name: 'Phân Đoạn Naphtha / Xăng Nhẹ',
      carbonRange: 'C₅ - C₈',
      formulaRepresentative: 'C₇H₁₆ (Heptane)',
      weightFractionPct: Number(c5C8Pct.toFixed(2)),
      densityKgPerL: 0.69,
      primaryApplication: 'Nguyên liệu Cracking hơi nước tạo hạt nhựa hoặc pha chế xăng sinh học',
      boilingPointRangeC: '36°C đến 125°C'
    },
    {
      name: 'Nhiên Liệu Hàng Không Bền Vững (SAF Kerosene Cut)',
      carbonRange: 'C₉ - C₁₆',
      formulaRepresentative: 'C₁₂H₂₆ (Dodecane)',
      weightFractionPct: Number(c9C16Pct.toFixed(2)),
      densityKgPerL: 0.76,
      primaryApplication: 'Nhiên liệu phản lực Drop-in SAF (ASTM D7566 Annex A2 FT-SPK)',
      boilingPointRangeC: '150°C đến 280°C'
    },
    {
      name: 'Dầu Diesel Sinh Học Tổng Hợp (GTL Diesel)',
      carbonRange: 'C₁₇ - C₂₂',
      formulaRepresentative: 'C₁₉H₄₀ (Nonadecane)',
      weightFractionPct: Number(c17C22Pct.toFixed(2)),
      densityKgPerL: 0.81,
      primaryApplication: 'Nhiên liệu động cơ nén diesel chỉ số Cetane cực cao (>75)',
      boilingPointRangeC: '290°C đến 350°C'
    },
    {
      name: 'Sáp Parafin Rắn Nặng (FT Wax)',
      carbonRange: 'C₂₃⁺',
      formulaRepresentative: 'C₃₀H₆₂ (Triacontane)',
      weightFractionPct: Number(c23PlusPct.toFixed(2)),
      densityKgPerL: 0.88,
      primaryApplication: 'Bẻ gãy xúc tác Hydrocracking để chuyển đổi 80% thành SAF bổ sung',
      boilingPointRangeC: '> 360°C'
    }
  ];

  return {
    alpha: safeAlpha,
    c1MethaneSelectivityPct: Number(c1Pct.toFixed(2)),
    c2C4LpgPct: Number(c2C4Pct.toFixed(2)),
    c5C8NaphthaPct: Number(c5C8Pct.toFixed(2)),
    c9C16KeroseneSafPct: Number(c9C16Pct.toFixed(2)),
    c17C22DieselPct: Number(c17C22Pct.toFixed(2)),
    c23PlusWaxPct: Number(c23PlusPct.toFixed(2)),
    totalC5PlusSelectivityPct: Number(c5PlusPct.toFixed(2)),
    fractions
  };
}

/**
 * Calculate Reactor Heat Transfer & Temperature Control Metrics
 */
export function calculateMicrochannelHeatTransfer(
  architecture: ReactorArchitectureType,
  customChannelDiaMm?: number
): ReactorHeatTransferMetrics {
  const base = REACTOR_ARCHITECTURE_CATALOG[architecture];
  const dia = customChannelDiaMm ?? base.hydraulicDiameterMm;

  let u = base.heatTransferCoefficientWPerM2K;
  let deltaT = base.radialDeltaTMaxDegC;
  let prod = base.volumetricProductivityGC5PerGCatHr;

  if (architecture === 'MICROCHANNEL_MODULAR' && customChannelDiaMm) {
    // Scaling heat transfer inversely with hydraulic diameter: U ~ 1 / D_h^0.8
    const scaling = Math.pow(1.5 / Math.max(0.5, dia), 0.8);
    u = base.heatTransferCoefficientWPerM2K * scaling;
    deltaT = Math.max(0.5, 1.2 * (dia / 1.5));
    prod = Math.max(1.0, 2.2 * Math.pow(1.5 / dia, 0.4));
  }

  let risk: 'NEGLIGIBLE' | 'MODERATE' | 'CRITICAL' = 'NEGLIGIBLE';
  if (deltaT > 10.0) {
    risk = 'CRITICAL';
  } else if (deltaT > 3.0) {
    risk = 'MODERATE';
  }

  return {
    hydraulicDiameterMm: Number(dia.toFixed(2)),
    heatTransferCoefficientWPerM2K: Number(u.toFixed(1)),
    radialDeltaTMaxDegC: Number(deltaT.toFixed(2)),
    volumetricProductivityGC5PerGCatHr: Number(prod.toFixed(2)),
    runawayHotspotRisk: risk,
    reactorVolumeReductionPct: base.skidFootprintReductionPct
  };
}

/**
 * Calculate Mass and Energy Balance for a Microchannel Fischer-Tropsch Plant
 */
export function calculatePlantMassEnergyBalance(params: {
  syngasFeedNm3PerHour: number;
  h2CoRatio: number;
  operatingTempC: number;
  alpha: number;
  catalystType: FtCatalystType;
  reactorType: ReactorArchitectureType;
  hydrocrackingWaxToSaf: boolean;
}): PlantMassAndEnergyBalance {
  const {
    syngasFeedNm3PerHour,
    h2CoRatio,
    alpha,
    reactorType,
    hydrocrackingWaxToSaf
  } = params;

  // 1 Nm3 of ideal gas contains 1 / 0.022414 = 44.615 mol
  const totalMolarGasKmolPerHour = syngasFeedNm3PerHour / 22.414;
  const coFractionInSyngas = 1 / (1 + h2CoRatio);
  const h2FractionInSyngas = h2CoRatio / (1 + h2CoRatio);

  const molarCoInletKmolPerHour = totalMolarGasKmolPerHour * coFractionInSyngas;
  const molarH2InletKmolPerHour = totalMolarGasKmolPerHour * h2FractionInSyngas;

  // Conversion of CO based on reactor type (microchannels achieve higher single-pass conversion)
  let coConversionPct = 80.0;
  if (reactorType === 'MICROCHANNEL_MODULAR') {
    coConversionPct = 85.0; // High isothermal efficiency
  } else if (reactorType === 'MULTI_TUBULAR_FIXED_BED') {
    coConversionPct = 68.0; // Limited by hot-spot prevention throttling
  } else {
    coConversionPct = 74.0;
  }

  const coConvertedKmolPerHour = molarCoInletKmolPerHour * (coConversionPct / 100);

  // Each kmol of CO converted to -CH2- yields ~14.027 kg of hydrocarbons
  const syncrudeKgPerHour = coConvertedKmolPerHour * 14.027;
  const syncrudeLitersPerHour = syncrudeKgPerHour / DENSITY_SYNCRUDE_KG_PER_L;
  const syncrudeBpd = (syncrudeLitersPerHour * 24) / LITERS_PER_OIL_BARREL;

  // ASF Distribution
  const asf = calculateAsfDistribution(alpha);
  const safFraction = asf.c9C16KeroseneSafPct / 100;
  const waxFraction = asf.c23PlusWaxPct / 100;

  const safDirectKgPerHour = syncrudeKgPerHour * safFraction;
  const waxKgPerHour = syncrudeKgPerHour * waxFraction;

  // Mild hydrocracking of wax: ~80% mass conversion of C23+ wax into C9-C16 SAF kerosene cut
  const additionalSafFromWax = hydrocrackingWaxToSaf ? waxKgPerHour * 0.80 : 0.0;
  const totalSafKgPerHour = safDirectKgPerHour + additionalSafFromWax;

  const hoursPerYear = 8000; // 91.3% plant availability factor
  const safAnnualMetricTons = (safDirectKgPerHour * hoursPerYear) / 1000;
  const totalSafAnnualMetricTons = (totalSafKgPerHour * hoursPerYear) / 1000;

  // Exothermic Reaction Heat Generation: -165 kJ per mol CO converted
  // MWth = (kmol/hr * 1000 mol/kmol * 165 kJ/mol) / 3,600,000 kJ/MWh
  const reactionHeatMwTh = (coConvertedKmolPerHour * 1000 * ENTHALPY_OF_FT_REACTION_KJ_PER_MOL_CO) / 3.6e6;

  // Waste Heat recovery: Boiling water cooling produces 20 bar saturated steam (latent heat ~1,900 kJ/kg)
  // Steam (tons/hr) = (reactionHeatMwTh * 3600 MJ/hr) / 1900 MJ/ton * 0.92 heat exchanger efficiency
  const steamTonsPerHour = (reactionHeatMwTh * 3600 * 0.92) / 1900;

  // Environmental Impact:
  // Displacing fossil Jet A-1 saves 3.16 kg CO2/kg fuel. With PtL DAC CO2 + Green H2, net life-cycle GHG reduction is 88%.
  const fossilCo2AvoidedPerKgSaf = JET_FUEL_CO2_EMISSION_FACTOR * 0.88;
  const co2AvoidedTonsPerYear = (totalSafAnnualMetricTons * 1000 * fossilCo2AvoidedPerKgSaf) / 1000;

  // Flight equivalents: A321 / B737 domestic flight burns ~2,800 kg fuel
  const flightsPoweredPerYear = Math.floor((totalSafAnnualMetricTons * 1000) / AVERAGE_SHORT_HAUL_FLIGHT_FUEL_KG);

  return {
    syngasFeedNm3PerHour,
    h2CoRatio,
    coConversionPct: Number(coConversionPct.toFixed(1)),
    molarCoInletKmolPerHour: Number(molarCoInletKmolPerHour.toFixed(2)),
    molarH2InletKmolPerHour: Number(molarH2InletKmolPerHour.toFixed(2)),
    syncrudeProductionKgPerHour: Number(syncrudeKgPerHour.toFixed(1)),
    syncrudeProductionBpd: Number(syncrudeBpd.toFixed(1)),
    safAviationFuelProductionKgPerHour: Number(safDirectKgPerHour.toFixed(1)),
    safAnnualMetricTons: Number(safAnnualMetricTons.toFixed(1)),
    waxProductionKgPerHour: Number(waxKgPerHour.toFixed(1)),
    additionalSafFromWaxHydrocrackingKgPerHour: Number(additionalSafFromWax.toFixed(1)),
    totalSafWithHydrocrackingKgPerHour: Number(totalSafKgPerHour.toFixed(1)),
    totalSafAnnualMetricTons: Number(totalSafAnnualMetricTons.toFixed(1)),
    reactionHeatGeneratedMwTh: Number(reactionHeatMwTh.toFixed(2)),
    mediumPressureSteamGeneratedTonsPerHour: Number(steamTonsPerHour.toFixed(2)),
    co2EquivalentAvoidedTonsPerYear: Number(co2AvoidedTonsPerYear.toFixed(0)),
    flightsPoweredPerYear
  };
}

/**
 * Evaluate ASTM D7566 Annex A2 (FT-SPK) Certification Compliance
 */
export function evaluateAstmD7566Compliance(params: {
  isomerizationIsoToNormalRatio: number; // Ratio of iso-paraffins to n-paraffins (target > 3.0)
  greenHydrogenSource: boolean;
  dacCarbonSource: boolean;
}): AstmD7566SafCompliance {
  const { isomerizationIsoToNormalRatio, greenHydrogenSource, dacCarbonSource } = params;

  // Freezing point correlation: High iso-paraffin ratio suppresses crystallization temperature
  // Neat n-alkanes freeze around -10°C to -25°C. Isomerized SPK reaches -50°C to -60°C.
  let freezingPoint = -20.0 - (isomerizationIsoToNormalRatio * 8.5);
  freezingPoint = Math.max(-65.0, Math.min(-20.0, freezingPoint));

  const isFreezingCompliant = freezingPoint <= -47.0; // Jet A-1 specification limit (-47°C)

  // Energy density of pure synthetic paraffinic kerosene is ~44.1 MJ/kg (> 42.8 MJ/kg ASTM min)
  const energyDensity = 44.1;
  const sulfurPpm = 0.05; // Negligible sulfur in synthetic PtL fuel (< 3000 ppm limit)
  const aromaticsNeatVolPct = 0.0; // Pure SPK has 0% aromatics; blends provide the 8-25% needed for nitrile seals

  // Life-cycle GHG savings calculation
  let ghgSavings = 55.0; // Baseline with grid power
  if (greenHydrogenSource && dacCarbonSource) {
    ghgSavings = 91.5; // Closed carbon loop DAC + Electrolysis
  } else if (greenHydrogenSource || dacCarbonSource) {
    ghgSavings = 74.0;
  }

  const sootReduction = 92.0; // 92% soot particle count reduction due to zero polyaromatics

  const isCompliant = isFreezingCompliant;

  const certifications: string[] = [
    'ASTM D7566 Annex A2 (FT-SPK)',
    'ASTM D1655 (Jet A-1 Blended Fuel)',
    'ICAO CORSIA Certified Sustainable Fuel',
    'EU ReFuelEU Aviation Directive Compliant'
  ];

  let technicalAssessment = '';
  if (isCompliant) {
    technicalAssessment = `Đạt chuẩn hàng không quốc tế ASTM D7566 Annex A2: Điểm đông đặc ${freezingPoint.toFixed(1)}°C (vượt chỉ tiêu Jet A-1 ≤ -47°C nhờ tỷ lệ đồng phân hóa iso/normal đạt ${isomerizationIsoToNormalRatio.toFixed(1)}). Mật độ năng lượng ${energyDensity} MJ/kg cao hơn xăng máy bay hóa thạch (43.2 MJ/kg), triệt tiêu 92% hạt bụi mịn (soot) và giảm ${ghgSavings.toFixed(1)}% phát thải CO₂ vòng đời.`;
  } else {
    technicalAssessment = `Chưa đạt điểm đông đặc: Điểm đông đặc hiện tại là ${freezingPoint.toFixed(1)}°C (yêu cầu Jet A-1 phải ≤ -47.0°C). Cần tăng cường độ đồng phân hóa hydroisomerization (iso/normal ratio phải ≥ 3.2) để ngăn hiện tượng đóng băng parafin ở trần bay cao 11,000 mét.`;
  }

  return {
    isCompliant,
    standardName: 'ASTM D7566 Annex A2 / Synthesized Paraffinic Kerosene (FT-SPK)',
    blendRatioMaxPct: 50.0, // Up to 50% drop-in blend with conventional Jet A-1
    freezingPointDegC: Number(freezingPoint.toFixed(1)),
    energyDensityMjPerKg: energyDensity,
    sulfurContentPpm: sulfurPpm,
    aromaticsContentNeatVolPct: aromaticsNeatVolPct,
    sootReductionPct: sootReduction,
    ghgLifeCycleSavingsPct: ghgSavings,
    certifications,
    technicalAssessment
  };
}

/**
 * Comparative Aviation Fuel Benchmark Matrix
 */
export interface AviationFuelBenchmark {
  fuelTypeName: string;
  sourceFeedstock: string;
  energyDensityMjPerKg: number;
  freezingPointLimitC: number;
  sulfurContentPpm: string;
  sootParticulateReductionPct: number;
  lifeCycleGhgReductionPct: number;
  maxDropInBlendPct: number;
  commercialReadiness: string;
}

export const AVIATION_FUEL_BENCHMARKS: AviationFuelBenchmark[] = [
  {
    fuelTypeName: 'Xăng Máy Bay Hóa Thạch (Conventional Jet A-1)',
    sourceFeedstock: 'Dầu mỏ thô hóa thạch (Crude Petroleum)',
    energyDensityMjPerKg: 43.2,
    freezingPointLimitC: -47.0,
    sulfurContentPpm: '500 - 3,000 ppm',
    sootParticulateReductionPct: 0.0,
    lifeCycleGhgReductionPct: 0.0,
    maxDropInBlendPct: 100.0,
    commercialReadiness: 'Thương mại toàn cầu (100% thị phần hiện hành)'
  },
  {
    fuelTypeName: 'Nhiên Liệu PtL FT-SPK (Microchannel SAF)',
    sourceFeedstock: 'DAC CO₂ thu từ khí quyển + Hydro xanh điện phân',
    energyDensityMjPerKg: 44.1,
    freezingPointLimitC: -52.0,
    sulfurContentPpm: '< 0.1 ppm (Không lưu huỳnh)',
    sootParticulateReductionPct: 92.0,
    lifeCycleGhgReductionPct: 91.5,
    maxDropInBlendPct: 50.0,
    commercialReadiness: 'Thương mại hóa quy mô Skid Modular (ASTM D7566 A2)'
  },
  {
    fuelTypeName: 'Nhiên Liệu Sinh Học HEFA-SPK',
    sourceFeedstock: 'Dầu ăn thải (UCO) & mỡ động vật hydro hóa',
    energyDensityMjPerKg: 44.0,
    freezingPointLimitC: -49.0,
    sulfurContentPpm: '< 1 ppm',
    sootParticulateReductionPct: 85.0,
    lifeCycleGhgReductionPct: 75.0,
    maxDropInBlendPct: 50.0,
    commercialReadiness: 'Đang bay thương mại thực tế (bị hạn chế nguồn dầu thải)'
  },
  {
    fuelTypeName: 'Hydro Lỏng Hàng Không (Cryogenic LH₂)',
    sourceFeedstock: 'Nước điện phân bằng năng lượng tái tạo',
    energyDensityMjPerKg: 120.0,
    freezingPointLimitC: -259.2,
    sulfurContentPpm: '0 ppm (Tuyệt đối)',
    sootParticulateReductionPct: 100.0,
    lifeCycleGhgReductionPct: 98.0,
    maxDropInBlendPct: 0.0, // Requires completely redesigned aircraft airframes & tanks
    commercialReadiness: 'Nghiên cứu nguyên mẫu (Dự án Airbus ZEROe 2035+)'
  }
];
