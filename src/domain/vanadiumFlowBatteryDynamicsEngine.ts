// src/domain/vanadiumFlowBatteryDynamicsEngine.ts
// Vanadium Redox Flow Battery (VRFB) Dual-Membrane Electrolyte Dynamics & Viscosity-Pressure Drop Engine
// Standards: IUPAC Electrochemistry, Darcy-Forchheimer Porous Flow & Vietnam GDPT 2018 (Hóa 10 & 12: Phản ứng Oxi hóa khử, Điện thế pin & Năng lượng)

export type VrfbMembraneType = 'CEM_NAFION' | 'AEM_FUMASEP' | 'SPEEK_HYDROCARBON';

export interface VrfbSpeciesProperties {
  symbol: string;
  valence: number;
  iupacNameVi: string;
  colorHex: string;
  colorVi: string;
  lambdaMaxNm: number;
  diffusionCoefficientCm2PerS: number; // 10^-6 cm2/s
}

export interface VrfbMembraneSpec {
  id: VrfbMembraneType;
  nameVi: string;
  typeVi: string;
  protonConductivitySPerCm: number;
  thicknessMicrons: number;
  vanadiumPermeabilityCm2PerMin: number; // 10^-6 cm2/min
  crossContaminationResistanceVi: string;
  capacityRetentionPerCyclePercent: number;
  costPerM2Usd: number;
}

export interface VrfbOperatingConditions {
  stateOfCharge: number; // 0.05 to 0.95 (5% - 95%)
  temperatureC: number; // 5 to 55 °C
  vanadiumConcentrationMolar: number; // 1.2 to 2.5 M
  sulfuricAcidConcentrationMolar: number; // 2.0 to 4.5 M
  currentDensityMaPerCm2: number; // 40 to 300 mA/cm2
  flowRateLitersPerMin: number; // 0.5 to 10.0 L/min per cell
  membrane: VrfbMembraneType;
  hasStabilizingAdditive: boolean; // e.g. H3PO4 or mixed acid
}

export interface VrfbElectrochemicalResult {
  openCircuitVoltageV: number;
  operatingCellVoltageDischargeV: number;
  operatingCellVoltageChargeV: number;
  powerDensityDischargeMwPerCm2: number;
  overpotentials: {
    activationV: number;
    ohmicV: number;
    concentrationV: number;
    totalV: number;
  };
  anolyteColor: {
    colorHex: string;
    descriptionVi: string;
    v2Fraction: number;
    v3Fraction: number;
  };
  catholyteColor: {
    colorHex: string;
    descriptionVi: string;
    vo2Fraction: number;
    voPlusFraction: number;
  };
}

export interface VrfbHydrodynamicResult {
  anolyteViscosityMpaS: number;
  catholyteViscosityMpaS: number;
  reynoldsNumber: number;
  hydraulicPressureDropKpa: number; // across carbon felt electrode
  pumpingPowerPerCellWatts: number;
  stoichiometricFlowFactor: number; // flow factor lambda (Q / Q_stoich)
  netDischargeEfficiencyPercent: number; // accounts for pumping parasitic losses
}

export interface VrfbThermalStabilityResult {
  catholyteV2O5PrecipitationRisk: 'SAFE' | 'WARNING' | 'CRITICAL_PRECIPITATION';
  anolyteLowTempPrecipitationRisk: 'SAFE' | 'WARNING' | 'FREEZING_PRECIPITATION';
  inductionTimeHours: number; // hours until precipitation
  stableOperatingTemperatureRangeVi: string;
  recommendationVi: string;
}

export interface VrfbGridPlantDesignResult {
  ratedPowerMw: number;
  storageDurationHours: number;
  totalCapacityMwh: number;
  cellActiveAreaCm2: number;
  totalCellCount: number;
  stackCount: number;
  totalElectrolyteVolumeM3: number;
  vanadiumPentoxideEquivalentTons: number;
  stackCapExMillionUsd: number;
  electrolyteCapExMillionUsd: number;
  totalCapExMillionUsd: number;
  capitalCostPerKwhUsd: number;
  systemRoundTripEfficiencyPercent: number;
  avoidedPeakerCo2TonsPerYear: number;
}

// 1. Vanadium 4 Redox Valence States Catalog
export const VRFB_VALENCE_SPECIES: Record<string, VrfbSpeciesProperties> = {
  V2: {
    symbol: 'V²⁺',
    valence: 2,
    iupacNameVi: 'Ion Vanadi(II) - Tím Tía (Violet)',
    colorHex: '#7C3AED',
    colorVi: 'Tím hoa cà (Violet)',
    lambdaMaxNm: 850,
    diffusionCoefficientCm2PerS: 2.4e-6
  },
  V3: {
    symbol: 'V³⁺',
    valence: 3,
    iupacNameVi: 'Ion Vanadi(III) - Xanh Lục Bảo (Green)',
    colorHex: '#059669',
    colorVi: 'Xanh lục đậm (Dark Green)',
    lambdaMaxNm: 600,
    diffusionCoefficientCm2PerS: 2.1e-6
  },
  VO2_PLUS: {
    symbol: 'VO²⁺',
    valence: 4,
    iupacNameVi: 'Ion Vanadyl / Vanadi(IV) - Xanh Lam Biển (Blue)',
    colorHex: '#0284C7',
    colorVi: 'Xanh lam biếc (Sky Blue)',
    lambdaMaxNm: 760,
    diffusionCoefficientCm2PerS: 3.9e-6
  },
  VO2_PLUS_V: {
    symbol: 'VO₂⁺',
    valence: 5,
    iupacNameVi: 'Ion Dioxovanadi(V) - Vàng Chanh / Hổ Phách (Yellow)',
    colorHex: '#F59E0B',
    colorVi: 'Vàng rực / Hổ phách (Golden Yellow)',
    lambdaMaxNm: 390,
    diffusionCoefficientCm2PerS: 4.8e-6
  }
};

// 2. Membrane Specs Catalog (CEM vs AEM vs SPEEK)
export const VRFB_MEMBRANE_CATALOG: Record<VrfbMembraneType, VrfbMembraneSpec> = {
  CEM_NAFION: {
    id: 'CEM_NAFION',
    nameVi: 'Màng Trao Đổi Cation Perfluorosulfonic Acid (Nafion 115/117)',
    typeVi: 'Cation Exchange Membrane (CEM)',
    protonConductivitySPerCm: 0.105,
    thicknessMicrons: 125,
    vanadiumPermeabilityCm2PerMin: 2.65e-6,
    crossContaminationResistanceVi: 'Thấp: Các ion V mang điện tích dương khuếch tán qua màng theo proton, gây tự phóng điện ~1.2%/ngày và suy giảm dung lượng tích lũy.',
    capacityRetentionPerCyclePercent: 99.82,
    costPerM2Usd: 550
  },
  AEM_FUMASEP: {
    id: 'AEM_FUMASEP',
    nameVi: 'Màng Trao Đổi Anion Đẩy Donnan (Fumasep FAP-450 / PiperION)',
    typeVi: 'Anion Exchange Membrane (AEM)',
    protonConductivitySPerCm: 0.048,
    thicknessMicrons: 50,
    vanadiumPermeabilityCm2PerMin: 0.32e-6,
    crossContaminationResistanceVi: 'Rất Cao (>88% chặn khuếch tán): Nhóm cation cố định (-NR₃⁺) tạo rào cản tĩnh điện Donnan đẩy ngược toàn bộ 4 cation Vanadi (V²⁺, V³⁺, VO²⁺, VO₂⁺).',
    capacityRetentionPerCyclePercent: 99.98,
    costPerM2Usd: 380
  },
  SPEEK_HYDROCARBON: {
    id: 'SPEEK_HYDROCARBON',
    nameVi: 'Màng Hydrocarbon Sulfonated Poly(Ether Ether Ketone) (sPEEK)',
    typeVi: 'Hydrocarbon Functionalized CEM',
    protonConductivitySPerCm: 0.075,
    thicknessMicrons: 60,
    vanadiumPermeabilityCm2PerMin: 0.82e-6,
    crossContaminationResistanceVi: 'Trung Bình - Cao: Kích thước kênh dẫn nước hẹp (1.2 nm vs 2.5 nm của Nafion) cản trở ion vanadi solvat hóa cồng kềnh, giảm giá thành màng.',
    capacityRetentionPerCyclePercent: 99.93,
    costPerM2Usd: 190
  }
};

export class VanadiumFlowBatteryDynamicsEngine {
  private static readonly R = 8.31446; // J/(mol*K)
  private static readonly F = 96485.33; // C/mol
  private static readonly E0_CELL = 1.26; // V (E0_pos = +1.00 V, E0_neg = -0.26 V)

  /**
   * Pha trộn màu RGB tuyến tính giữa 2 mã màu Hex theo trọng số weight (0..1)
   */
  private static blendColors(color1: string, color2: string, weight: number): string {
    const w = Math.max(0, Math.min(1, weight));
    const c1 = parseInt(color1.replace('#', ''), 16);
    const c2 = parseInt(color2.replace('#', ''), 16);

    const r1 = (c1 >> 16) & 255;
    const g1 = (c1 >> 8) & 255;
    const b1 = c1 & 255;

    const r2 = (c2 >> 16) & 255;
    const g2 = (c2 >> 8) & 255;
    const b2 = c2 & 255;

    const r = Math.round(r1 * w + r2 * (1 - w));
    const g = Math.round(g1 * w + g2 * (1 - w));
    const b = Math.round(b1 * w + b2 * (1 - w));

    return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
  }

  /**
   * Tính toán điện thế Nernst, phân rã quá thế và màu sắc quang phổ dung dịch
   */
  public static calculateElectrochemicalPerformance(
    conditions: VrfbOperatingConditions
  ): VrfbElectrochemicalResult {
    const soc = Math.min(0.95, Math.max(0.05, conditions.stateOfCharge));
    const tk = conditions.temperatureC + 273.15;
    const cV = conditions.vanadiumConcentrationMolar;
    const cH = conditions.sulfuricAcidConcentrationMolar * 2; // 2 H+ per H2SO4 dissociation
    const membrane = VRFB_MEMBRANE_CATALOG[conditions.membrane];

    // Nernst Equation: E_OCV = E0 + (RT/F)*ln[(VO2+)*(H+)^2*(V2+) / ((VO2+)*(V3+))]
    // VỚI: [VO2+] / [VO^2+] = SOC / (1 - SOC) và [V2+] / [V3+] = SOC / (1 - SOC)
    // => E_OCV = E0 + (2 * R * T / F) * ln(SOC / (1 - SOC)) + (R * T / F) * ln(cH^2)
    const nernstConcentrationTerm = (2 * this.R * tk / this.F) * Math.log(soc / (1 - soc));
    const protonTerm = (this.R * tk / this.F) * Math.log(Math.max(1, cH));
    const openCircuitVoltageV = Number((this.E0_CELL + nernstConcentrationTerm + protonTerm).toFixed(4));

    // Overpotentials deconstruction
    // 1. Ohmic Overpotential: Membrane ASR + Electrolyte + Carbon Felt Contact
    // Membrane ASR = thickness (cm) / conductivity (S/cm)
    const membraneThicknessCm = membrane.thicknessMicrons * 1e-4;
    const membraneAsr = membraneThicknessCm / membrane.protonConductivitySPerCm; // Ohm*cm2
    const electrolyteAndContactAsr = 0.55; // Ohm*cm2
    const totalAsr = membraneAsr + electrolyteAndContactAsr;
    const iDensityA = conditions.currentDensityMaPerCm2 * 1e-3; // A/cm2
    const etaOhmic = iDensityA * totalAsr;

    // 2. Activation Overpotential (Butler-Volmer):
    // In VRFB, 3D porous carbon felt electrodes provide huge volumetric surface area (ae ~ 150 cm2/cm2 geometric)
    // Geometric effective exchange current j0,eff ~ 80-120 mA/cm2
    const j0EffGeometric = 0.095; // A/cm2 (accounting for 3D porous felt surface area)
    const etaActivation = (this.R * tk / (0.5 * this.F)) * Math.asinh(iDensityA / (2 * j0EffGeometric));

    // 3. Concentration Overpotential:
    // Limiting current density I_lim proportional to flow velocity and reactant conc
    const iLim = 0.85 * (cV * (1 - soc)) * Math.sqrt(conditions.flowRateLitersPerMin); // A/cm2
    const safeILim = Math.max(iDensityA * 1.08, iLim);
    const etaConcentration = (this.R * tk / this.F) * Math.log(safeILim / (safeILim - iDensityA));

    const totalOverpotential = etaOhmic + etaActivation + etaConcentration;
    const operatingCellVoltageDischargeV = Number(Math.max(0.70, openCircuitVoltageV - totalOverpotential).toFixed(4));
    const operatingCellVoltageChargeV = Number((openCircuitVoltageV + totalOverpotential).toFixed(4));
    const powerDensityDischargeMwPerCm2 = Number((operatingCellVoltageDischargeV * conditions.currentDensityMaPerCm2).toFixed(2));

    // Optical Spectrophotometric Color Blending
    // Anolyte: V2+ (violet #7C3AED) + V3+ (green #059669)
    const v2Fraction = soc;
    const v3Fraction = 1 - soc;
    const anolyteColorHex = this.blendColors('#7C3AED', '#059669', v2Fraction);
    const anolyteDesc = `V²⁺ (${(v2Fraction * 100).toFixed(0)}%) Tím Cà + V³⁺ (${(v3Fraction * 100).toFixed(0)}%) Lục Bảo`;

    // Catholyte: VO2+ (blue #0284C7) + VO2^+ (yellow #F59E0B)
    const vo2Fraction = 1 - soc; // VO^2+ is charged to VO2^+
    const voPlusFraction = soc;
    const catholyteColorHex = this.blendColors('#F59E0B', '#0284C7', voPlusFraction);
    const catholyteDesc = `VO₂⁺ (${(voPlusFraction * 100).toFixed(0)}%) Vàng Hổ Phách + VO²⁺ (${(vo2Fraction * 100).toFixed(0)}%) Lam Biếc`;

    return {
      openCircuitVoltageV,
      operatingCellVoltageDischargeV,
      operatingCellVoltageChargeV,
      powerDensityDischargeMwPerCm2,
      overpotentials: {
        activationV: Number(etaActivation.toFixed(4)),
        ohmicV: Number(etaOhmic.toFixed(4)),
        concentrationV: Number(etaConcentration.toFixed(4)),
        totalV: Number(totalOverpotential.toFixed(4))
      },
      anolyteColor: {
        colorHex: anolyteColorHex,
        descriptionVi: anolyteDesc,
        v2Fraction: Number(v2Fraction.toFixed(3)),
        v3Fraction: Number(v3Fraction.toFixed(3))
      },
      catholyteColor: {
        colorHex: catholyteColorHex,
        descriptionVi: catholyteDesc,
        vo2Fraction: Number(vo2Fraction.toFixed(3)),
        voPlusFraction: Number(voPlusFraction.toFixed(3))
      }
    };
  }

  /**
   * Mô hình thủy động học Darcy-Forchheimer, độ nhớt và tổn thất áp suất bơm
   */
  public static calculateHydrodynamicsAndPumping(
    conditions: VrfbOperatingConditions,
    cellActiveAreaCm2 = 1000 // default 1000 cm2 (31.6 cm x 31.6 cm)
  ): VrfbHydrodynamicResult {
    const t = conditions.temperatureC;
    const cV = conditions.vanadiumConcentrationMolar;
    const cH2so4 = conditions.sulfuricAcidConcentrationMolar;
    const soc = conditions.stateOfCharge;

    // Dynamic Viscosity mu(T, cV, H2SO4):
    // Baseline water viscosity at T (mPa.s): mu_w = 2.414e-5 * 10^(247.8 / (T + 133.15)) * 1000
    const muWater = 2.414e-2 * Math.pow(10, 247.8 / (t + 133.15)); // mPa.s
    const viscosityFactor = (1 + 0.35 * cH2so4 + 0.42 * cV + 0.12 * cV * cV);
    
    // Catholyte viscosity increases with SOC due to VO2^+ solvation shell
    const catholyteViscosityMpaS = Number((muWater * viscosityFactor * (1 + 0.45 * soc)).toFixed(3));
    // Anolyte viscosity is slightly lower, peaking near 50% SOC
    const anolyteViscosityMpaS = Number((muWater * viscosityFactor * (0.95 + 0.15 * soc * (1 - soc))).toFixed(3));
    const avgViscosity = (catholyteViscosityMpaS + anolyteViscosityMpaS) / 2 * 1e-3; // Pa.s (kg/(m*s))

    // Flow geometry: Porous carbon felt electrode
    // L = 0.316 m (channel length), W = 0.316 m, Thickness d = 0.004 m (4 mm felt)
    const feltThicknessM = 0.004;
    const feltWidthM = Math.sqrt(cellActiveAreaCm2 * 1e-4);
    const feltLengthM = feltWidthM;
    const crossSectionAreaM2 = feltWidthM * feltThicknessM; // m2

    // Flow rate Q in m3/s
    const qM3PerS = (conditions.flowRateLitersPerMin * 1e-3) / 60;
    const superficialVelocity = qM3PerS / crossSectionAreaM2; // m/s

    // Darcy-Forchheimer pressure drop in carbon felt:
    // Carbon felt porosity ~ 92%, permeability K ~ 1.2e-9 m2 (Park et al. J. Power Sources)
    // Interdigitated / serpentine ribs give effective flow path Leff ~ 0.18 m
    const permeabilityK = 1.2e-9; // m2
    const forchheimerBeta = 1.5e3; // 1/m
    const rho = 1350; // kg/m3
    const effectiveFlowLengthM = feltLengthM * 0.60; // flow distribution in parallel channels

    const dpDarcy = (avgViscosity / permeabilityK) * superficialVelocity * effectiveFlowLengthM;
    const dpForchheimer = forchheimerBeta * rho * Math.pow(superficialVelocity, 2) * effectiveFlowLengthM;
    const totalDpPa = dpDarcy + dpForchheimer;
    const hydraulicPressureDropKpa = Number((totalDpPa / 1000).toFixed(2));

    // Pumping power: P_pump = 2 * (dp * Q) / eta_pump (2 loops: anolyte + catholyte, eta = 0.70)
    const pumpEfficiency = 0.70;
    const pumpingPowerPerCellWatts = Number((2 * (totalDpPa * qM3PerS) / pumpEfficiency).toFixed(3));

    // Reynolds Number in porous fiber (mean fiber diameter d_f = 10 um)
    const fiberDiameter = 10e-6; // m
    const reynoldsNumber = Number((rho * superficialVelocity * fiberDiameter / avgViscosity).toFixed(5));

    // Stoichiometric Flow Factor lambda = Q_actual / Q_stoich
    // I_cell = currentDensity * area
    const iCell = conditions.currentDensityMaPerCm2 * 1e-3 * cellActiveAreaCm2; // Amperes
    // Q_stoich = I_cell / (F * cV * 1000 * soc) in m3/s
    const qStoichM3PerS = iCell / (this.F * cV * 1000 * Math.max(0.05, soc));
    const stoichiometricFlowFactor = Number((qM3PerS / Math.max(1e-8, qStoichM3PerS)).toFixed(2));

    // Net Efficiency: Net electrical discharge power = P_elec - P_pump
    const electroResult = this.calculateElectrochemicalPerformance(conditions);
    const pElecDischargeWatts = (electroResult.operatingCellVoltageDischargeV * iCell);
    const pNetWatts = pElecDischargeWatts - pumpingPowerPerCellWatts;
    const pElecChargeWatts = (electroResult.operatingCellVoltageChargeV * iCell);
    const netDischargeEfficiencyPercent = Number(
      Math.max(40, Math.min(88, (pNetWatts / (pElecChargeWatts + pumpingPowerPerCellWatts)) * 100)).toFixed(2)
    );

    return {
      anolyteViscosityMpaS,
      catholyteViscosityMpaS,
      reynoldsNumber,
      hydraulicPressureDropKpa,
      pumpingPowerPerCellWatts,
      stoichiometricFlowFactor,
      netDischargeEfficiencyPercent
    };
  }

  /**
   * Đánh giá độ ổn định nhiệt và ranh giới kết tủa V2O5 / V(II)-V(III)
   */
  public static evaluateThermalStability(
    conditions: VrfbOperatingConditions
  ): VrfbThermalStabilityResult {
    const t = conditions.temperatureC;
    const soc = conditions.stateOfCharge;
    const cV = conditions.vanadiumConcentrationMolar;
    const additive = conditions.hasStabilizingAdditive;

    // Thermal precipitation threshold for VO2^+ into V2O5:
    // Un-stabilized electrolyte precipitates when T > 40°C and SOC > 80%
    const criticalTempCatholyte = additive ? 50.0 : 40.0;
    const criticalTempAnolyte = additive ? 5.0 : 10.0;

    let catholyteRisk: 'SAFE' | 'WARNING' | 'CRITICAL_PRECIPITATION' = 'SAFE';
    if (t > criticalTempCatholyte && soc >= 0.80) {
      catholyteRisk = 'CRITICAL_PRECIPITATION';
    } else if (t > criticalTempCatholyte - 5.0 || (t > 38 && soc >= 0.85)) {
      catholyteRisk = 'WARNING';
    }

    let anolyteRisk: 'SAFE' | 'WARNING' | 'FREEZING_PRECIPITATION' = 'SAFE';
    if (t < criticalTempAnolyte && cV >= 2.0) {
      anolyteRisk = 'FREEZING_PRECIPITATION';
    } else if (t < criticalTempAnolyte + 4.0 && cV >= 1.8) {
      anolyteRisk = 'WARNING';
    }

    // Induction time model: tau = tau0 * exp(Ea / RT) * (1 / soc^2)
    let inductionTimeHours = 10000;
    if (t > 35) {
      const dt = t - 35;
      const baseHours = additive ? 250 : 48;
      inductionTimeHours = Number(Math.max(0.5, baseHours * Math.exp(-0.16 * dt) * Math.pow(0.85 / Math.max(0.1, soc), 2)).toFixed(1));
    }

    let recommendationVi = 'Hệ thống vận hành trong ngưỡng nhiệt độ an toàn tối ưu (15°C - 35°C).';
    if (catholyteRisk === 'CRITICAL_PRECIPITATION') {
      recommendationVi = 'CẢNH BÁO NGUY CẤP: Nguy cơ kết tủa V₂O₅ rắn tại buồng Cathode! Cần kích hoạt bộ trao đổi nhiệt giải nhiệt khẩn cấp hoặc xả xả pin giảm SOC < 70%.';
    } else if (anolyteRisk === 'FREEZING_PRECIPITATION') {
      recommendationVi = 'CẢNH BÁO: Nhiệt độ thấp kích hoạt kết tủa muối VSO₄·7H₂O tại bể Anode! Bật điện trở gia nhiệt hoặc pha loãng nồng độ.';
    } else if (catholyteRisk === 'WARNING' || anolyteRisk === 'WARNING') {
      recommendationVi = 'Chú ý: Vận hành gần biên an toàn nhiệt. Khuyến nghị duy trì lưu lượng đối lưu và giám sát cảm biến quang.';
    }

    const stableOperatingTemperatureRangeVi = additive
      ? 'Dải nhiệt mở rộng: 5°C - 50°C (Nhờ phụ gia ổn định H₃PO₄ / axit hỗn hợp HCl-H₂SO₄)'
      : 'Dải nhiệt tiêu chuẩn: 10°C - 40°C (Cần hệ thống kiểm soát nhiệt độ HVAC/Chiller)';

    return {
      catholyteV2O5PrecipitationRisk: catholyteRisk,
      anolyteLowTempPrecipitationRisk: anolyteRisk,
      inductionTimeHours,
      stableOperatingTemperatureRangeVi,
      recommendationVi
    };
  }

  /**
   * Thiết kế và hoạch định kinh tế kỹ thuật nhà máy lưu trữ năng lượng lưới điện (Grid LDES)
   */
  public static designGridScaleStoragePlant(
    ratedPowerMw: number,
    storageDurationHours: number,
    membraneType: VrfbMembraneType = 'AEM_FUMASEP'
  ): VrfbGridPlantDesignResult {
    const totalCapacityMwh = ratedPowerMw * storageDurationHours;
    const membrane = VRFB_MEMBRANE_CATALOG[membraneType];

    // Standard industrial stack module: 50 kW per stack (e.g. 80 cells @ 1.4V, 450A, 1500 cm2 active area)
    const cellActiveAreaCm2 = 1500;
    const currentDensityA = 0.180; // 180 mA/cm2 => 270 A per cell
    const nominalCellVoltage = 1.35; // V
    const cellPowerWatts = cellActiveAreaCm2 * currentDensityA * nominalCellVoltage; // ~364.5 W
    const cellsPerStack = 138; // ~50 kW stack
    const stackPowerKw = (cellPowerWatts * cellsPerStack) / 1000; // ~50.3 kW

    const totalCellCount = Math.ceil((ratedPowerMw * 1e6) / cellPowerWatts);
    const stackCount = Math.ceil((ratedPowerMw * 1000) / stackPowerKw);

    // Vanadium electrolyte sizing:
    // Energy density: ~28 Wh/liter of total electrolyte (positive + negative) at 1.8 M V
    // Total Volume = Total MWh * 1e6 / 28 Wh/L = Liters => / 1000 = m3
    const totalElectrolyteVolumeM3 = Number(((totalCapacityMwh * 1e6) / 28 / 1000).toFixed(1));

    // Vanadium pentoxide (V2O5) equivalent:
    // M(V2O5) = 181.88 g/mol, containing 2 moles of V (50.94 g/mol)
    // 1 mole V requires 0.5 mole V2O5 = 90.94 g V2O5 per mole V
    // Total moles of V = totalElectrolyteVolumeLiters * 1.8 M
    const totalMolesV = totalElectrolyteVolumeM3 * 1000 * 1.8;
    const vanadiumPentoxideEquivalentTons = Number(((totalMolesV * 0.09094) / 1000).toFixed(1));

    // CapEx Economics:
    // Decoupled Power ($/kW for stacks, pumps, PCS, BoP) + Decoupled Energy ($/kWh for V2O5 & tanks)
    // Membrane cost per kW = (membrane cost per stack) / (stackPower in kW)
    const membraneCostPerStack = membrane.costPerM2Usd * (cellActiveAreaCm2 * 1e-4) * cellsPerStack;
    const stackCostPerKw = 340 + (membraneCostPerStack / stackPowerKw); // ~$450-$500/kW
    const stackCapExMillionUsd = Number(((ratedPowerMw * 1000 * stackCostPerKw) / 1e6).toFixed(2));

    // Electrolyte cost: V2O5 (~$22/kg) + H2SO4 + HDPE tanks & piping (~$140/kWh)
    const electrolyteCostPerKwh = 135; // $/kWh
    const electrolyteCapExMillionUsd = Number(((totalCapacityMwh * 1000 * electrolyteCostPerKwh) / 1e6).toFixed(2));

    const totalCapExMillionUsd = Number((stackCapExMillionUsd + electrolyteCapExMillionUsd).toFixed(2));
    const capitalCostPerKwhUsd = Number(((totalCapExMillionUsd * 1e6) / (totalCapacityMwh * 1000)).toFixed(1));

    // System Round-Trip Efficiency (Voltage eff * Coulombic eff * Pump eff)
    // AEM gives higher Coulombic efficiency (>97%) than Nafion (~93%)
    const coulombicEff = membrane.capacityRetentionPerCyclePercent > 99.9 ? 0.975 : 0.935;
    const voltageEff = 0.84;
    const pumpEffFactor = 0.96;
    const systemRoundTripEfficiencyPercent = Number((coulombicEff * voltageEff * pumpEffFactor * 100).toFixed(1));

    // Displaced peaker fossil emissions: 0.65 tons CO2 / MWh-cycle, 330 cycles/year
    const avoidedPeakerCo2TonsPerYear = Number((totalCapacityMwh * 330 * 0.65).toFixed(1));

    return {
      ratedPowerMw,
      storageDurationHours,
      totalCapacityMwh,
      cellActiveAreaCm2,
      totalCellCount,
      stackCount,
      totalElectrolyteVolumeM3,
      vanadiumPentoxideEquivalentTons,
      stackCapExMillionUsd,
      electrolyteCapExMillionUsd,
      totalCapExMillionUsd,
      capitalCostPerKwhUsd,
      systemRoundTripEfficiencyPercent,
      avoidedPeakerCo2TonsPerYear
    };
  }
}
