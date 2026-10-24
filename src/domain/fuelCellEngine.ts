// src/domain/fuelCellEngine.ts
// Milestone 47: Fuel Cells, Proton-Exchange Membrane (PEMFC), Solid Oxide (SOFC) & Butler-Volmer Overpotential Engine
// Standards: IUPAC Electrochemistry Recommendations & Grove-Nernst Thermodynamic Principles
// Curriculum: Vietnam GDPT 2018 (Hóa học 10: Phản ứng oxi hóa - khử & Năng lượng hóa học; Hóa học 12: Pin điện & Pin nhiên liệu Hydro)

export type FuelCellArchetype = 'PEMFC' | 'SOFC' | 'AFC' | 'DMFC';

export interface FuelCellSpec {
  id: string;
  name: string;
  nameVI: string;
  archetype: FuelCellArchetype;
  operatingTempCelsius: number;
  electrolyteVI: string;
  mobileChargeCarrier: string; // e.g. 'H+', 'O^2-', 'OH-'
  anodeReactionVI: string;
  cathodeReactionVI: string;
  overallReactionVI: string;
  exchangeCurrentDensityJ0MaPerCm2: number; // j0 (activation barrier)
  areaSpecificResistanceOhmCm2: number; // R_ASR (Ohmic resistance)
  limitingCurrentDensityJLMaPerCm2: number; // jL (mass transport limit)
  gibbsFreeEnergyDeltaGkJ: number; // Delta G in kJ/mol
  enthalpyDeltaHkJ: number; // Delta H in kJ/mol
  standardReversibleVoltageV: number; // E0 = -DeltaG / nF
  typicalElectricalEfficiencyPercent: number;
  descriptionVI: string;
  colorHex: string;
}

export interface PolarizationDataPoint {
  currentDensityMaPerCm2: number;
  cellVoltageVolts: number;
  powerDensityMwPerCm2: number;
  activationLossVolts: number;
  ohmicLossVolts: number;
  concentrationLossVolts: number;
}

export interface FuelCellSimulationResult {
  cellSpec: FuelCellSpec;
  temperatureCelsius: number;
  temperatureKelvin: number;
  currentDensityMaPerCm2: number;

  // Voltages and Overpotentials
  openCircuitVoltageErevV: number;
  activationOverpotentialV: number;
  ohmicOverpotentialV: number;
  concentrationOverpotentialV: number;
  operatingCellVoltageV: number;

  // Power and Efficiency
  powerDensityMwPerCm2: number;
  maximumPowerDensityMwPerCm2: number;
  voltageEfficiencyPercent: number; // V_cell / E_rev
  thermalEfficiencyHHVPercent: number; // V_cell / 1.482 V

  // Polarization Curve Points (for SVG plotting)
  polarizationCurve: PolarizationDataPoint[];

  pedagogicalAnalysisVI: string;
}

// ----------------------------------------------------------------------------
// CONSTANTS
// ----------------------------------------------------------------------------
export const SI_FARADAY_CONSTANT = 96485.3321; // C / mol
export const SI_GAS_CONSTANT_R = 8.314462618; // J / (mol·K)
export const THERMONEUTRAL_VOLTAGE_HHV = 1.482; // V (based on Higher Heating Value Delta H = -285.8 kJ/mol)

// ----------------------------------------------------------------------------
// FUEL CELL BENCHMARK CATALOG
// ----------------------------------------------------------------------------
export const FUEL_CELL_CATALOG: Record<string, FuelCellSpec> = {
  pemfc_hydrogen: {
    id: 'pemfc_hydrogen',
    name: 'Proton Exchange Membrane Fuel Cell (PEMFC)',
    nameVI: 'Pin Nhiên Liệu Màng Trao Đổi Proton (PEMFC - Ô Tô Điện Hydro)',
    archetype: 'PEMFC',
    operatingTempCelsius: 80.0,
    electrolyteVI: 'Màng Polyme Nafion (Chỉ cho ion H+ xuyên qua)',
    mobileChargeCarrier: 'H⁺ (Proton)',
    anodeReactionVI: 'H₂ → 2 H⁺ + 2 e⁻ (Oxi hóa hydro trên xúc tác Pt)',
    cathodeReactionVI: '½ O₂ + 2 H⁺ + 2 e⁻ → H₂O (Khử oxi)',
    overallReactionVI: 'H₂ + ½ O₂ → H₂O(l) (Phát thải duy nhất là nước tinh khiết)',
    exchangeCurrentDensityJ0MaPerCm2: 0.15, // Lower j0 due to sluggish cathode ORR
    areaSpecificResistanceOhmCm2: 0.18, // Nafion membrane resistance
    limitingCurrentDensityJLMaPerCm2: 1800.0, // 1800 mA/cm^2
    gibbsFreeEnergyDeltaGkJ: -237.13,
    enthalpyDeltaHkJ: -285.83,
    standardReversibleVoltageV: 1.229,
    typicalElectricalEfficiencyPercent: 55.0,
    descriptionVI: 'Công nghệ cốt lõi của xe hơi chạy bằng pin nhiên liệu hydro (Toyota Mirai, Hyundai Nexo). Khởi động nhanh trong vài giây ở nhiệt độ phòng, mật độ công suất cực cao và không phát thải khí nhà kính.',
    colorHex: '#0284c7', // Sky
  },

  sofc_stationary: {
    id: 'sofc_stationary',
    name: 'Solid Oxide Fuel Cell (SOFC)',
    nameVI: 'Pin Nhiên Liệu Gốm Oxit Rắn (SOFC - Nhà Máy Điện Đồng Phát)',
    archetype: 'SOFC',
    operatingTempCelsius: 800.0,
    electrolyteVI: 'Gốm Yttria-Stabilized Zirconia (YSZ dẫn ion O²⁻)',
    mobileChargeCarrier: 'O²⁻ (Ion Oxit)',
    anodeReactionVI: 'H₂ + O²⁻ → H₂O(g) + 2 e⁻',
    cathodeReactionVI: '½ O₂ + 2 e⁻ → O²⁻',
    overallReactionVI: 'H₂ + ½ O₂ → H₂O(g)',
    exchangeCurrentDensityJ0MaPerCm2: 15.0, // High j0 due to extreme temperature
    areaSpecificResistanceOhmCm2: 0.35, // Ceramic resistance at 800 °C
    limitingCurrentDensityJLMaPerCm2: 1400.0,
    gibbsFreeEnergyDeltaGkJ: -188.0, // Lower Delta G at 800 °C
    enthalpyDeltaHkJ: -248.0,
    standardReversibleVoltageV: 0.98, // E_rev lower at high T
    typicalElectricalEfficiencyPercent: 65.0, // Up to 85% with combined heat and power CHP
    descriptionVI: 'Hoạt động ở nhiệt độ cao 800 °C với màng gốm oxit, không cần kim loại quý bạch kim (Pt) đắt tiền. Nhiệt dư sinh ra được dùng để quay turbine hơi nước, đạt hiệu suất đồng phát điện-nhiệt (CHP) trên 80%.',
    colorHex: '#ea580c', // Orange
  },

  afc_space: {
    id: 'afc_space',
    name: 'Alkaline Fuel Cell (AFC)',
    nameVI: 'Pin Nhiên Liệu Kiềm (AFC - Tàu Vũ Trụ Apollo & Trạm Vũ Trụ)',
    archetype: 'AFC',
    operatingTempCelsius: 70.0,
    electrolyteVI: 'Dung dịch KOH kiềm đậm đặc',
    mobileChargeCarrier: 'OH⁻ (Hydroxit)',
    anodeReactionVI: 'H₂ + 2 OH⁻ → 2 H₂O + 2 e⁻',
    cathodeReactionVI: '½ O₂ + H₂O + 2 e⁻ → 2 OH⁻',
    overallReactionVI: 'H₂ + ½ O₂ → H₂O(l)',
    exchangeCurrentDensityJ0MaPerCm2: 1.2,
    areaSpecificResistanceOhmCm2: 0.22,
    limitingCurrentDensityJLMaPerCm2: 1200.0,
    gibbsFreeEnergyDeltaGkJ: -237.13,
    enthalpyDeltaHkJ: -285.83,
    standardReversibleVoltageV: 1.229,
    typicalElectricalEfficiencyPercent: 60.0,
    descriptionVI: 'Cung cấp toàn bộ điện năng và nước uống cho các phi hành gia trên tàu đổ bộ Mặt Trăng Apollo và Tàu con thoi không gian NASA.',
    colorHex: '#10b981', // Emerald
  },

  dmfc_methanol: {
    id: 'dmfc_methanol',
    name: 'Direct Methanol Fuel Cell (DMFC)',
    nameVI: 'Pin Nhiên Liệu Metanol Trực Tiếp (DMFC - Thiết Bị Di Động)',
    archetype: 'DMFC',
    operatingTempCelsius: 60.0,
    electrolyteVI: 'Màng polyme dẫn proton (Chống thấm chéo metanol)',
    mobileChargeCarrier: 'H⁺ (Proton)',
    anodeReactionVI: 'CH₃OH + H₂O → CO₂ + 6 H⁺ + 6 e⁻',
    cathodeReactionVI: '1.5 O₂ + 6 H⁺ + 6 e⁻ → 3 H₂O',
    overallReactionVI: 'CH₃OH + 1.5 O₂ → CO₂ + 2 H₂O',
    exchangeCurrentDensityJ0MaPerCm2: 0.02, // Sluggish methanol oxidation
    areaSpecificResistanceOhmCm2: 0.40,
    limitingCurrentDensityJLMaPerCm2: 800.0,
    gibbsFreeEnergyDeltaGkJ: -702.0, // n = 6
    enthalpyDeltaHkJ: -726.0,
    standardReversibleVoltageV: 1.214,
    typicalElectricalEfficiencyPercent: 40.0,
    descriptionVI: 'Sử dụng nhiên liệu lỏng metanol (CH3OH) nạp trực tiếp mà không cần bình chứa hydro nén áp suất cao. Lý tưởng cho các trạm quan trắc quân sự và thiết bị viễn thông dã ngoại.',
    colorHex: '#8b5cf6', // Violet
  },
};

// ----------------------------------------------------------------------------
// BUTLER-VOLMER & OVERPOTENTIAL POLARIZATION ENGINE
// ----------------------------------------------------------------------------

/**
 * Calculates real Fuel Cell Operating Voltage V_cell(j) across current density j:
 * V_cell(j) = E_rev - eta_act(j) - eta_ohmic(j) - eta_conc(j)
 * 
 * 1. eta_act = (RT / alpha·F) * ln(j / j0)   [Tafel equation]
 * 2. eta_ohmic = j * R_ASR                   [Ohm's law]
 * 3. eta_conc = -(RT / n·F) * ln(1 - j / jL) [Concentration / mass transport]
 */
export function calculateFuelCellPolarization(
  cellId: string,
  operatingCurrentDensityMaPerCm2 = 600.0, // Default 600 mA/cm^2
  temperatureOffsetCelsius = 0.0
): FuelCellSimulationResult {
  const cell = FUEL_CELL_CATALOG[cellId] || FUEL_CELL_CATALOG.pemfc_hydrogen;

  const TCelsius = Math.max(20.0, Math.min(1000.0, cell.operatingTempCelsius + temperatureOffsetCelsius));
  const TKelvin = TCelsius + 273.15;
  const jOperating = Math.max(0.1, Math.min(cell.limitingCurrentDensityJLMaPerCm2 - 5, operatingCurrentDensityMaPerCm2));

  // Reversible cell potential: E_rev(T) ~= E0 + (DeltaS / nF) * (T - 298.15)
  // Delta S = (Delta H - Delta G) / 298.15 is negative for water synthesis (-48.7 J/mol·K)
  const nElectrons = cell.archetype === 'DMFC' ? 6 : 2;
  const deltaS = (cell.enthalpyDeltaHkJ - cell.gibbsFreeEnergyDeltaGkJ) * 1000 / 298.15;
  const temperatureCorrection = (deltaS / (nElectrons * SI_FARADAY_CONSTANT)) * (TKelvin - 298.15);
  const openCircuitVoltage = Number((cell.standardReversibleVoltageV + temperatureCorrection).toFixed(3));

  // Charge transfer coefficient alpha ~= 0.5
  const alpha = 0.5;
  const tafelSlope = (SI_GAS_CONSTANT_R * TKelvin) / (alpha * SI_FARADAY_CONSTANT);

  // Helper function to calculate losses for a given j
  const computeLosses = (j: number) => {
    // 1. Activation loss eta_act
    const etaAct = j > cell.exchangeCurrentDensityJ0MaPerCm2
      ? tafelSlope * Math.log(j / cell.exchangeCurrentDensityJ0MaPerCm2)
      : (j / cell.exchangeCurrentDensityJ0MaPerCm2) * 0.05;

    // 2. Ohmic loss eta_ohmic
    // j in mA/cm^2 -> convert to A/cm^2 by / 1000
    const etaOhmic = (j / 1000.0) * cell.areaSpecificResistanceOhmCm2;

    // 3. Concentration loss eta_conc
    const jFraction = Math.min(0.995, j / cell.limitingCurrentDensityJLMaPerCm2);
    const etaConc = -((SI_GAS_CONSTANT_R * TKelvin) / (nElectrons * SI_FARADAY_CONSTANT)) * Math.log(1 - jFraction);

    const vCell = Math.max(0.0, openCircuitVoltage - etaAct - etaOhmic - etaConc);
    const powerDensity = Number(((j * vCell) / 1.0).toFixed(1)); // mW / cm^2

    return {
      vCell: Number(vCell.toFixed(3)),
      etaAct: Number(etaAct.toFixed(3)),
      etaOhmic: Number(etaOhmic.toFixed(3)),
      etaConc: Number(etaConc.toFixed(3)),
      powerDensity,
    };
  };

  // Operating point calculation
  const operatingLosses = computeLosses(jOperating);

  // Generate full polarization curve (0 to limiting current)
  const polarizationCurve: PolarizationDataPoint[] = [];
  let maxPower = 0.0;
  const step = cell.limitingCurrentDensityJLMaPerCm2 / 40.0;

  for (let j = 10.0; j < cell.limitingCurrentDensityJLMaPerCm2 - 10; j += step) {
    const pt = computeLosses(j);
    if (pt.powerDensity > maxPower) {
      maxPower = pt.powerDensity;
    }
    polarizationCurve.push({
      currentDensityMaPerCm2: Number(j.toFixed(0)),
      cellVoltageVolts: pt.vCell,
      powerDensityMwPerCm2: pt.powerDensity,
      activationLossVolts: pt.etaAct,
      ohmicLossVolts: pt.etaOhmic,
      concentrationLossVolts: pt.etaConc,
    });
  }

  // Efficiencies
  const voltageEff = Number(((operatingLosses.vCell / openCircuitVoltage) * 100).toFixed(1));
  const thermalEffHHV = Number(((operatingLosses.vCell / THERMONEUTRAL_VOLTAGE_HHV) * 100).toFixed(1));

  // Pedagogical Summary
  let summary = `${cell.nameVI} vận hành ở T = ${TCelsius.toFixed(0)} °C (${TKelvin.toFixed(1)} K). `;
  summary += `Điện thế thuận nghịch hở mạch (OCV): E_rev = ${openCircuitVoltage.toFixed(3)} V. `;
  summary += `Tại mật độ dòng điện j = ${jOperating.toFixed(0)} mA/cm²: `;
  summary += `Điện áp thực tế còn V_cell = ${operatingLosses.vCell.toFixed(3)} V (Tổn hao kích hoạt Tafel η_act = ${(operatingLosses.etaAct * 1000).toFixed(0)} mV, `;
  summary += `Tổn hao điện trở Ohm η_ohm = ${(operatingLosses.etaOhmic * 1000).toFixed(0)} mV, Tổn hao nồng độ khuếch tán η_conc = ${(operatingLosses.etaConc * 1000).toFixed(0)} mV). `;
  summary += `Mật độ công suất đạt ${operatingLosses.powerDensity.toFixed(0)} mW/cm² (Công suất cực đại: ${maxPower.toFixed(0)} mW/cm²). `;
  summary += `Hiệu suất nhiệt (HHV) đạt ${thermalEffHHV.toFixed(1)}%, vượt trội hoàn toàn so với động cơ đốt trong (30-35%).`;

  return {
    cellSpec: cell,
    temperatureCelsius: TCelsius,
    temperatureKelvin: TKelvin,
    currentDensityMaPerCm2: jOperating,
    openCircuitVoltageErevV: openCircuitVoltage,
    activationOverpotentialV: operatingLosses.etaAct,
    ohmicOverpotentialV: operatingLosses.etaOhmic,
    concentrationOverpotentialV: operatingLosses.etaConc,
    operatingCellVoltageV: operatingLosses.vCell,
    powerDensityMwPerCm2: operatingLosses.powerDensity,
    maximumPowerDensityMwPerCm2: maxPower,
    voltageEfficiencyPercent: voltageEff,
    thermalEfficiencyHHVPercent: thermalEffHHV,
    polarizationCurve,
    pedagogicalAnalysisVI: summary,
  };
}

// ----------------------------------------------------------------------------
// CARD MATCHING SERVICE FOR FUEL CELLS & CLEAN HYDROGEN
// ----------------------------------------------------------------------------

export function getMatchingFuelCellCard(card: { id?: string; name?: string }): FuelCellSpec | null {
  if (!card) return null;
  const nameLower = (card.name || '').toLowerCase();
  const idLower = (card.id || '').toLowerCase();

  for (const cell of Object.values(FUEL_CELL_CATALOG)) {
    const idC = cell.id.toLowerCase();
    const archC = cell.archetype.toLowerCase();
    if (idLower === idC || idLower.includes(idC) || idLower.includes(archC)) {
      return cell;
    }
  }

  if (nameLower.includes('pemfc') || nameLower.includes('proton') || nameLower.includes('nafion') || nameLower.includes('mirai')) {
    return FUEL_CELL_CATALOG.pemfc_hydrogen;
  }
  if (nameLower.includes('sofc') || nameLower.includes('gốm oxit') || nameLower.includes('zirconia') || nameLower.includes('chp')) {
    return FUEL_CELL_CATALOG.sofc_stationary;
  }
  if (nameLower.includes('afc') || nameLower.includes('pin kiềm') || nameLower.includes('apollo') || nameLower.includes('koh')) {
    return FUEL_CELL_CATALOG.afc_space;
  }
  if (nameLower.includes('dmfc') || nameLower.includes('metanol') || nameLower.includes('methanol')) {
    return FUEL_CELL_CATALOG.dmfc_methanol;
  }
  if (nameLower.includes('pin nhiên liệu') || nameLower.includes('fuel cell') || nameLower.includes('hydro xanh')) {
    return FUEL_CELL_CATALOG.pemfc_hydrogen;
  }

  return null;
}
