// src/domain/batteryIntercalationEngine.ts
// Milestone 48: Lithium-Ion Battery Intercalation, Solid Electrolyte Interphase (SEI) & Nernst Degradation Engine
// Standards: Nobel Prize in Chemistry 2019 (John B. Goodenough, M. Stanley Whittingham, Akira Yoshino)
// Curriculum: Vietnam GDPT 2018 (Hóa học 12 Chuyên đề: Pin Li-ion & Lưu trữ năng lượng; Dãy thế điện cực chuẩn E0(Li+/Li) = -3.04 V)

export type CathodeChemistryType = 'LFP' | 'NMC_811' | 'LCO' | 'LMO_SPINEL';
export type AnodeChemistryType = 'GRAPHITE' | 'SILICON_GRAPHITE' | 'LTO';

export interface BatteryChemistrySpec {
  id: string;
  name: string;
  nameVI: string;
  cathodeType: CathodeChemistryType;
  anodeType: AnodeChemistryType;
  cathodeFormula: string;
  anodeFormula: string;
  nominalVoltageV: number;
  chargeCutoffVoltageV: number;
  dischargeCutoffVoltageV: number;
  theoreticalSpecificCapacityMahPerG: number;
  gravimetricEnergyDensityWhPerKg: number;
  cycleLifeNominal: number;
  thermalRunawayTempCelsius: number;
  crystalStructureVI: string;
  cathodeReactionVI: string;
  anodeReactionVI: string;
  overallReactionVI: string;
  seiCharacteristicsVI: string;
  descriptionVI: string;
  colorHex: string;
}

export interface BatterySimulationResult {
  chemistry: BatteryChemistrySpec;
  stateOfChargePercent: number; // 0% to 100%
  cRate: number; // e.g. 0.5C, 1C, 2C, 5C
  temperatureCelsius: number;
  cycleCount: number; // e.g. 1 to 3000 cycles

  // State metrics
  openCircuitVoltageV: number;
  operatingVoltageV: number; // with IR drop & overpotential
  internalResistanceMilliohm: number;
  stateOfHealthPercent: number; // Capacity retention relative to nominal
  availableCapacityMah: number;

  // Intercalation states
  lithiumIntercalationFractionX: number; // x in Li_x C6 (anode) or Li_{1-x} CoO2
  anodePotentialVsLiV: number; // Plating danger if < 0.0V
  lithiumPlatingRiskVI: 'SAFE' | 'ELEVATED' | 'CRITICAL_DENDRITE_HAZARD';

  // SEI (Solid Electrolyte Interphase) Metrics
  seiThicknessNanometers: number;
  seiCapacityLossPercent: number;

  // Curves for visualization
  dischargeCurve: { soc: number; voltage: number }[];
  cycleAgingCurve: { cycle: number; capacityPercent: number; resistanceIncreasePercent: number }[];

  pedagogicalAnalysisVI: string;
}

// ----------------------------------------------------------------------------
// CONSTANTS
// ----------------------------------------------------------------------------
export const STANDARD_LI_REDUCTION_POTENTIAL_V = -3.040; // E0(Li+/Li) in standard hydrogen electrode scale (V)
export const NOMINAL_PACK_CAPACITY_MAH = 5000; // 5000 mAh (standard 21700 EV / power tool cell)

// ----------------------------------------------------------------------------
// BATTERY CHEMISTRY CATALOG
// ----------------------------------------------------------------------------
export const BATTERY_CATALOG: Record<string, BatteryChemistrySpec> = {
  lfp_iron_phosphate: {
    id: 'lfp_iron_phosphate',
    name: 'Lithium Iron Phosphate (LFP / LiFePO4)',
    nameVI: 'Pin Sắt Photphat (LFP - Cấu Trúc Olivine Siêu Bền & Chống Cháy)',
    cathodeType: 'LFP',
    anodeType: 'GRAPHITE',
    cathodeFormula: 'LiFePO₄',
    anodeFormula: 'C₆ (Graphite)',
    nominalVoltageV: 3.20,
    chargeCutoffVoltageV: 3.65,
    dischargeCutoffVoltageV: 2.50,
    theoreticalSpecificCapacityMahPerG: 170,
    gravimetricEnergyDensityWhPerKg: 160,
    cycleLifeNominal: 3500,
    thermalRunawayTempCelsius: 270, // Extremely safe
    crystalStructureVI: 'Mạng tinh thể Olivine trực thoi (Kênh dẫn ion Li+ 1 chiều [010])',
    cathodeReactionVI: 'LiFePO₄ ⇄ FePO₄ + Li⁺ + e⁻ (Hai pha ổn định)',
    anodeReactionVI: '6 C + Li⁺ + e⁻ ⇄ LiC₆',
    overallReactionVI: 'LiFePO₄ + 6 C ⇄ FePO₄ + LiC₆',
    seiCharacteristicsVI: 'Lớp màng SEI mỏng, ổn định cao, tiêu hao lithium ban đầu dưới 7%, kháng phân hủy nhiệt xuất sắc.',
    descriptionVI: 'Được John B. Goodenough phát minh năm 1996. Không chứa Coban độc hại và đắt đỏ, tuổi thọ trên 10 năm với hơn 3.500 chu kỳ nạp xả, là sự lựa chọn hàng đầu cho xe buýt điện, xe VinFast và lưu trữ điện mặt trời dân dụng.',
    colorHex: '#10b981', // Emerald
  },

  nmc_811_nickel_rich: {
    id: 'nmc_811_nickel_rich',
    name: 'Nickel-Manganese-Cobalt (NMC 811)',
    nameVI: 'Pin Niken Cao Cấp (NMC 811 - Mật Độ Năng Lượng Cho Xe Điện Hạng Sang)',
    cathodeType: 'NMC_811',
    anodeType: 'GRAPHITE',
    cathodeFormula: 'LiNi₀.₈Mn₀.₁Co₀.₁O₂',
    anodeFormula: 'C₆ (Graphite)',
    nominalVoltageV: 3.70,
    chargeCutoffVoltageV: 4.25,
    dischargeCutoffVoltageV: 2.80,
    theoreticalSpecificCapacityMahPerG: 200,
    gravimetricEnergyDensityWhPerKg: 260,
    cycleLifeNominal: 1500,
    thermalRunawayTempCelsius: 210,
    crystalStructureVI: 'Mạng tinh thể phân lớp kiểu α-NaFeO₂ (Khuếch tán 2 chiều trong mặt phẳng)',
    cathodeReactionVI: 'LiMO₂ ⇄ Li₁₋ₓMO₂ + x Li⁺ + x e⁻ (M = Ni0.8Mn0.1Co0.1)',
    anodeReactionVI: '6 C + x Li⁺ + x e⁻ ⇄ LiₓC₆',
    overallReactionVI: 'LiMO₂ + 6 C ⇄ Li₁₋ₓMO₂ + LiₓC₆',
    seiCharacteristicsVI: 'Lớp SEI cần phụ gia FEC/VC để ức chế hòa tan kim loại chuyển tiếp Ni/Mn/Co và hạn chế nứt vi mô tinh thể.',
    descriptionVI: 'Tỷ lệ 80% Ni, 10% Mn, 10% Co giúp giảm tối đa phụ thuộc vào mỏ quặng Coban tại Congo, cung cấp mật độ năng lượng kỷ lục giúp xe điện chạy trên 500-700 km sau một lần sạc.',
    colorHex: '#3b82f6', // Blue
  },

  lco_goodenough: {
    id: 'lco_goodenough',
    name: 'Lithium Cobalt Oxide (LCO / LiCoO2)',
    nameVI: 'Pin Coban Oxit (LCO - Cội Nguồn Giải Nobel Hóa Học 2019)',
    cathodeType: 'LCO',
    anodeType: 'GRAPHITE',
    cathodeFormula: 'LiCoO₂',
    anodeFormula: 'C₆ (Graphite)',
    nominalVoltageV: 3.90,
    chargeCutoffVoltageV: 4.35,
    dischargeCutoffVoltageV: 3.00,
    theoreticalSpecificCapacityMahPerG: 140, // limited to x = 0.5 to prevent lattice collapse
    gravimetricEnergyDensityWhPerKg: 200,
    cycleLifeNominal: 1000,
    thermalRunawayTempCelsius: 150, // lower thermal stability
    crystalStructureVI: 'Mạng tinh thể phân lớp đá muối trực giao (Layered rock-salt structure)',
    cathodeReactionVI: 'LiCoO₂ ⇄ Li₀.₅CoO₂ + 0.5 Li⁺ + 0.5 e⁻',
    anodeReactionVI: '6 C + 0.5 Li⁺ + 0.5 e⁻ ⇄ Li₀.₅C₆',
    overallReactionVI: 'LiCoO₂ + 6 C ⇄ Li₀.₅CoO₂ + Li₀.₅C₆',
    seiCharacteristicsVI: 'Lớp SEI chứa muối ROCO₂Li hữu cơ và LiF vô cơ, nhạy cảm với hiện tượng quá nạp trên 4.35V.',
    descriptionVI: 'Đột phá lịch sử năm 1980 của Goodenough đã biến pin sạc thành hiện thực, mở ra cuộc cách mạng điện thoại thông minh, máy tính xách tay và thiết bị điện tử cầm tay toàn cầu.',
    colorHex: '#8b5cf6', // Violet
  },

  lto_fast_charge: {
    id: 'lto_fast_charge',
    name: 'Lithium Titanate (LTO / Li4Ti5O12)',
    nameVI: 'Pin Lục Titanat (LTO - Cực Âm Zero-Strain Sạc Nhanh 6 Phút & 20.000 Chu Kỳ)',
    cathodeType: 'LFP',
    anodeType: 'LTO',
    cathodeFormula: 'LiFePO₄',
    anodeFormula: 'Li₄Ti₅O₁₂',
    nominalVoltageV: 2.40, // 3.45V - 1.55V
    chargeCutoffVoltageV: 2.80,
    dischargeCutoffVoltageV: 1.50,
    theoreticalSpecificCapacityMahPerG: 175,
    gravimetricEnergyDensityWhPerKg: 90,
    cycleLifeNominal: 20000,
    thermalRunawayTempCelsius: 320, // Cannot form dendrites
    crystalStructureVI: 'Mạng Spinel biến thiên thể tích gần bằng 0 (< 0.2% Zero-Strain)',
    cathodeReactionVI: 'LiFePO₄ ⇄ FePO₄ + Li⁺ + e⁻',
    anodeReactionVI: 'Li₄Ti₅O₁₂ + 3 Li⁺ + 3 e⁻ ⇄ Li₇Ti₅O₁₂ (Thế 1.55V vs Li)',
    overallReactionVI: '3 LiFePO₄ + Li₄Ti₅O₁₂ ⇄ 3 FePO₄ + Li₇Ti₅O₁₂',
    seiCharacteristicsVI: 'Hoàn toàn KHÔNG hình thành lớp SEI do điện thế cực âm 1.55V cao hơn vùng thế phân hủy chất điện phân (> 1.0V).',
    descriptionVI: 'Cực âm Titanat có thế vận hành 1.55V cao hơn thế kết tinh lithium kim loại, loại trừ 100% nguy cơ mọc nhánh cây dendrite. Sạc đầy trong 6 phút, hoạt động ở -30°C và tuổi thọ trên 20.000 chu kỳ.',
    colorHex: '#f59e0b', // Amber
  },
};

// ----------------------------------------------------------------------------
// OPEN CIRCUIT VOLTAGE (OCV) & POLARIZATION SIMULATOR
// ----------------------------------------------------------------------------

/**
 * Calculates Open Circuit Voltage OCV(SoC) based on chemistry and state of charge (0 to 1).
 */
export function calculateBatteryOcv(chemistry: BatteryChemistrySpec, soc: number): number {
  const s = Math.max(0.001, Math.min(0.999, soc));

  if (chemistry.cathodeType === 'LFP') {
    if (chemistry.anodeType === 'LTO') {
      // Flat plateau around 2.4V with sharp drops at ends
      return 2.40 + 0.15 * Math.log(s / (1 - s + 0.05)) + 0.05 * (s - 0.5);
    }
    // LFP vs Graphite: Extremely flat two-phase transition around 3.25V - 3.32V
    if (s < 0.1) {
      return 2.50 + s * 7.0; // Rapid ramp from 2.5 to 3.2V
    } else if (s > 0.9) {
      return 3.34 + (s - 0.9) * 2.8; // Sharp climb to 3.65V
    } else {
      return 3.26 + 0.08 * Math.pow(s, 0.5); // Flat plateau
    }
  }

  if (chemistry.cathodeType === 'NMC_811') {
    // Continuous slope from 3.0V to 4.25V characteristic of solid solution intercalation
    return 3.10 + 0.95 * s + 0.20 * Math.pow(s, 3);
  }

  if (chemistry.cathodeType === 'LCO') {
    // S-curve from 3.2V to 4.35V
    return 3.50 + 0.65 * s + 0.15 * Math.log(s / (1 - s + 0.01));
  }

  return chemistry.nominalVoltageV;
}

/**
 * Full Battery Intercalation & Degradation Simulation
 */
export function simulateBatteryIntercalation(
  chemistryId: string,
  socPercent = 70.0,
  cRate = 1.0,
  temperatureCelsius = 25.0,
  cycleCount = 100
): BatterySimulationResult {
  const chemistry = BATTERY_CATALOG[chemistryId] || BATTERY_CATALOG.lfp_iron_phosphate;
  const socNorm = Math.max(0.0, Math.min(1.0, socPercent / 100.0));
  const cycles = Math.max(0, cycleCount);

  // 1. OCV Calculation
  const ocv = Number(calculateBatteryOcv(chemistry, socNorm).toFixed(3));

  // 2. Internal Resistance R_int(T, Cycles)
  // Base resistance ~ 25 mOhm at 25 °C
  const tempFactor = Math.exp(-0.04 * (temperatureCelsius - 25.0)); // increases dramatically in freezing cold
  const cycleResistanceMultiplier = 1.0 + (cycles / chemistry.cycleLifeNominal) * 0.8;
  const baseR = chemistry.anodeType === 'LTO' ? 12.0 : 25.0; // LTO has lower resistance
  const rIntMilliohm = Number((baseR * tempFactor * cycleResistanceMultiplier).toFixed(1));

  // 3. Operating Voltage during 1C discharge (V_cell = OCV - I * R_int - Overpotential)
  // 1C current for 5000 mAh pack = 5.0 Amperes
  const currentAmperes = (NOMINAL_PACK_CAPACITY_MAH / 1000.0) * cRate;
  const irDropVolts = (currentAmperes * rIntMilliohm) / 1000.0;
  const operatingVoltage = Number(Math.max(chemistry.dischargeCutoffVoltageV - 0.2, ocv - irDropVolts).toFixed(3));

  // 4. SEI Layer Growth & Capacity Retention (SoH)
  // Parabolic diffusion-limited SEI growth: Thickness ~ sqrt(cycles)
  let seiThicknessNm = 0;
  let seiLossPercent = 0;
  if (chemistry.anodeType !== 'LTO') {
    seiThicknessNm = Number((15.0 + 2.5 * Math.sqrt(cycles)).toFixed(1)); // Initial 15 nm + growth
    seiLossPercent = Number((4.0 + 0.35 * Math.sqrt(cycles)).toFixed(1));
  }

  // State of Health: Capacity decay from SEI and active material loss
  const sohDecay = (cycles / chemistry.cycleLifeNominal) * 20.0; // 80% EOL standard
  const stateOfHealthPercent = Number(Math.max(40.0, 100.0 - (seiLossPercent + sohDecay)).toFixed(1));
  const availableCapacityMah = Number(((NOMINAL_PACK_CAPACITY_MAH * stateOfHealthPercent) / 100.0).toFixed(0));

  // 5. Lithium Intercalation Staging & Anode Potential vs Li/Li+
  // x in Li_x C6: 0 at 0% SoC, 1 at 100% SoC (full LiC6 golden stage)
  const xIntercalation = Number(socNorm.toFixed(2));

  // Anode potential: ~ 0.2V at low SoC, dropping to 0.07V at 100% SoC
  let anodePotentialVsLi = 0.22 - 0.15 * socNorm;
  if (chemistry.anodeType === 'LTO') {
    anodePotentialVsLi = 1.55; // Always 1.55V
  } else {
    // Polarization shift at high C-rate and cold temp
    const anodePolarization = (cRate * 0.04) + (temperatureCelsius < 0 ? 0.08 : 0);
    anodePotentialVsLi = Number((anodePotentialVsLi - anodePolarization).toFixed(3));
  }

  // Lithium Plating Risk Determination
  let platingRisk: 'SAFE' | 'ELEVATED' | 'CRITICAL_DENDRITE_HAZARD' = 'SAFE';
  if (chemistry.anodeType !== 'LTO') {
    if (anodePotentialVsLi <= 0.0) {
      platingRisk = 'CRITICAL_DENDRITE_HAZARD';
    } else if (anodePotentialVsLi < 0.05 || (cRate >= 2.0 && temperatureCelsius <= 5.0)) {
      platingRisk = 'ELEVATED';
    }
  }

  // 6. Generate Discharge Curve (100% down to 0% SoC)
  const dischargeCurve: { soc: number; voltage: number }[] = [];
  for (let s = 100; s >= 0; s -= 5) {
    const vOcv = calculateBatteryOcv(chemistry, s / 100.0);
    const vOper = Math.max(chemistry.dischargeCutoffVoltageV - 0.1, vOcv - irDropVolts);
    dischargeCurve.push({
      soc: s,
      voltage: Number(vOper.toFixed(3)),
    });
  }

  // 7. Generate Cycle Aging Curve (0 to Nominal Cycle Life)
  const cycleAgingCurve: { cycle: number; capacityPercent: number; resistanceIncreasePercent: number }[] = [];
  const cycleStep = Math.max(50, Math.floor(chemistry.cycleLifeNominal / 15));
  for (let c = 0; c <= chemistry.cycleLifeNominal; c += cycleStep) {
    const cLoss = (c / chemistry.cycleLifeNominal) * 20.0 + (chemistry.anodeType !== 'LTO' ? 4.0 + 0.35 * Math.sqrt(c) : 0);
    const cap = Math.max(60.0, 100.0 - cLoss);
    const rInc = (c / chemistry.cycleLifeNominal) * 80.0;
    cycleAgingCurve.push({
      cycle: c,
      capacityPercent: Number(cap.toFixed(1)),
      resistanceIncreasePercent: Number(rInc.toFixed(1)),
    });
  }

  // 8. Pedagogical Analysis
  let analysis = `${chemistry.nameVI}. Trạng thái sạc SoC = ${socPercent.toFixed(0)}%, Tải dòng ${cRate}C (${currentAmperes.toFixed(1)} A) ở T = ${temperatureCelsius}°C. `;
  analysis += `Điện thế hở mạch OCV = ${ocv.toFixed(3)} V, điện áp hoạt động V_cell = ${operatingVoltage.toFixed(3)} V (Sụt áp nội trở IR = ${(irDropVolts * 1000).toFixed(0)} mV tại R_int = ${rIntMilliohm} mΩ). `;
  analysis += `Tại cực âm Graphite, mức xen phủ x = ${xIntercalation.toFixed(2)} (Li_${xIntercalation.toFixed(2)}C₆), thế điện cực đạt ${anodePotentialVsLi.toFixed(3)} V so với Li⁺/Li. `;
  if (platingRisk === 'CRITICAL_DENDRITE_HAZARD') {
    analysis += `CẢNH BÁO: Thế cực âm sụt xuống âm (< 0 V) do nhiệt độ quá thấp hoặc dòng sạc quá cao, kích hoạt phản ứng kết tinh Lithium kim loại (Lithium Plating) hình thành nhánh cây Dendrite đâm thủng màng ngăn, nguy cơ đoản mạch nhiệt! `;
  } else if (platingRisk === 'ELEVATED') {
    analysis += `LƯU Ý: Vận hành gần ngưỡng biên an toàn thế cực âm, hệ thống quản lý pin BMS cần tự động giảm dòng sạc để bảo vệ lớp màng SEI. `;
  } else {
    analysis += `Vùng hoạt động hoàn toàn an toàn, lớp màng thụ động SEI bảo vệ điện cực và dẫn ion Li⁺ ổn định. `;
  }
  analysis += `Sau ${cycles} chu kỳ nạp/xả, độ suy giảm dung lượng SoH còn ${stateOfHealthPercent}%, dung lượng khả dụng đạt ${availableCapacityMah} mAh.`;

  return {
    chemistry,
    stateOfChargePercent: socPercent,
    cRate,
    temperatureCelsius,
    cycleCount: cycles,
    openCircuitVoltageV: ocv,
    operatingVoltageV: operatingVoltage,
    internalResistanceMilliohm: rIntMilliohm,
    stateOfHealthPercent,
    availableCapacityMah,
    lithiumIntercalationFractionX: xIntercalation,
    anodePotentialVsLiV: anodePotentialVsLi,
    lithiumPlatingRiskVI: platingRisk,
    seiThicknessNanometers: seiThicknessNm,
    seiCapacityLossPercent: seiLossPercent,
    dischargeCurve,
    cycleAgingCurve,
    pedagogicalAnalysisVI: analysis,
  };
}

// ----------------------------------------------------------------------------
// CARD MATCHING SERVICE FOR LITHIUM BATTERY MATERIALS
// ----------------------------------------------------------------------------

export function getMatchingBatteryCard(card: { id?: string; name?: string; element?: string }): BatteryChemistrySpec | null {
  if (!card) return null;
  const nameLower = (card.name || '').toLowerCase();
  const idLower = (card.id || '').toLowerCase();
  const elemLower = (card.element || '').toLowerCase();

  for (const chem of Object.values(BATTERY_CATALOG)) {
    if (idLower.includes(chem.id) || idLower.includes(chem.cathodeType.toLowerCase())) {
      return chem;
    }
  }

  // Keywords
  if (nameLower.includes('lfp') || nameLower.includes('sắt photphat') || nameLower.includes('lifepo4') || nameLower.includes('olivine')) {
    return BATTERY_CATALOG.lfp_iron_phosphate;
  }
  if (nameLower.includes('nmc') || nameLower.includes('niken') || nameLower.includes('vinfast') || nameLower.includes('tesla')) {
    return BATTERY_CATALOG.nmc_811_nickel_rich;
  }
  if (nameLower.includes('lco') || nameLower.includes('coban oxit') || nameLower.includes('licoo2') || nameLower.includes('goodenough')) {
    return BATTERY_CATALOG.lco_goodenough;
  }
  if (nameLower.includes('lto') || nameLower.includes('titanat') || nameLower.includes('li4ti5o12') || nameLower.includes('zero-strain')) {
    return BATTERY_CATALOG.lto_fast_charge;
  }
  if (nameLower.includes('lithium') || nameLower.includes('li-ion') || elemLower === 'li' || idLower.includes('lithium')) {
    return BATTERY_CATALOG.lfp_iron_phosphate;
  }

  return null;
}
