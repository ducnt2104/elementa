// src/domain/anionExchangeElectrolyzerEngine.ts
// Comprehensive Domain Engine: Anion Exchange Membrane Water Electrolysis (AEMWE), PGM-Free NiFe-LDH Catalysts & Low-Cost Terawatt Hydrogen
// Standards: IUPAC Electrochemistry, IEA / IRENA Green Hydrogen Protocols & Vietnam GDPT 2018 (Hóa học 10 & 12: Điện phân dung dịch kiềm, Ăn mòn kim loại, Xúc tác dị thể & Năng lượng Hydro)

export type ElectrolyzerTechnologyType = 'AEMWE_PGM_FREE' | 'PEMWE_PRECIOUS_METALS' | 'AEL_TRADITIONAL_ALKALINE';
export type AEMCatalystPairId = 'NIFE_LDH_NIMO' | 'NI_FE_OXIDE_RANEY_NI' | 'PRECIOUS_IR_PT_BENCHMARK';

export interface AEMWEStackSpec {
  id: string;
  technology: ElectrolyzerTechnologyType;
  membraneName: string;
  membraneThicknessMicrons: number;
  ohIonicConductivitySPerCm: number;
  anodeOerCatalyst: string;
  cathodeHerCatalyst: string;
  isPgmFree: boolean;
  bipolarPlateMaterial: string;
  stackCostUsdPerKw: number;
  iridiumLoadingGramsPerKw: number; // 0 for AEMWE, ~0.4 - 1.0 for PEMWE
  differentialPressureLimitBar: number;
}

export interface AEMWEPolarizationPoint {
  currentDensityAcm2: number;
  cellVoltageVolts: number;
  ohmicOverpotentialVolts: number;
  anodeOerOverpotentialVolts: number;
  cathodeHerOverpotentialVolts: number;
  powerDensityWcm2: number;
}

export interface AEMWEPerformanceResult {
  stackSpec: AEMWEStackSpec;
  operatingTempC: number;
  operatingPressureBar: number;
  electrolyteFeed: string;
  cellVoltageVolts: number;
  currentDensityAcm2: number;
  h2ProductionRateKgPerHour: number;
  h2ProductionRateNm3PerHour: number;
  o2ProductionRateNm3PerHour: number;
  specificEnergyConsumptionKwhPerKg: number;
  specificEnergyConsumptionKwhPerNm3: number;
  stackEfficiencyLhvPercent: number;
  levelizedCostOfHydrogenUsdPerKg: number; // LCOH
  terawattScalabilityBottleneckVerdict: string;
}

// -------------------------------------------------------------------------
// 1. COMPARATIVE ELECTROLYZER TECHNOLOGIES CATALOG
// -------------------------------------------------------------------------

export const ELECTROLYZER_TECHNOLOGIES_CATALOG: AEMWEStackSpec[] = [
  {
    id: 'AEMWE_PIPERION_NIFE',
    technology: 'AEMWE_PGM_FREE',
    membraneName: 'PiperION / Sustainion (Màng polyme gốc piperidinium dẫn ion OH⁻)',
    membraneThicknessMicrons: 40,
    ohIonicConductivitySPerCm: 0.085,
    anodeOerCatalyst: 'NiFe-LDH (Niken-Sắt Hydroxit 2 chiều, OER overpotential ~220 mV)',
    cathodeHerCatalyst: 'NiMo / Mạng lưới Niken xốp (Raney Nickel, 100% không bạch kim)',
    isPgmFree: true,
    bipolarPlateMaterial: 'Thép không gỉ 316L mạ niken (Chi phí siêu rẻ)',
    stackCostUsdPerKw: 280,
    iridiumLoadingGramsPerKw: 0.0,
    differentialPressureLimitBar: 35
  },
  {
    id: 'PEMWE_NAFION_IRIDIUM',
    technology: 'PEMWE_PRECIOUS_METALS',
    membraneName: 'Nafion 117 / 212 (Polyme perfluorosulfonic acid dẫn proton H⁺)',
    membraneThicknessMicrons: 50,
    ohIonicConductivitySPerCm: 0.11,
    anodeOerCatalyst: 'IrO₂ / RuO₂ (Iridium oxide kim loại quý hiếm bậc nhất Trái Đất)',
    cathodeHerCatalyst: 'Pt/C (Bạch kim nano trên than hoạt tính)',
    isPgmFree: false,
    bipolarPlateMaterial: 'Titanium nguyên chất phủ bạch kim (Chống ăn mòn axit mạnh)',
    stackCostUsdPerKw: 950,
    iridiumLoadingGramsPerKw: 0.45,
    differentialPressureLimitBar: 40
  },
  {
    id: 'AEL_KOH_ZIRFON',
    technology: 'AEL_TRADITIONAL_ALKALINE',
    membraneName: 'Màng ngăn xốp Zirfon Perl (Zirconia/Polysulfone)',
    membraneThicknessMicrons: 500,
    ohIonicConductivitySPerCm: 0.045,
    anodeOerCatalyst: 'Lưới Niken mạ (Nickel mesh OER)',
    cathodeHerCatalyst: 'Lưới Thép mạ Niken (Perforated Nickel plate)',
    isPgmFree: true,
    bipolarPlateMaterial: 'Thép carbon mạ niken',
    stackCostUsdPerKw: 450,
    iridiumLoadingGramsPerKw: 0.0,
    differentialPressureLimitBar: 5
  }
];

// Physical constants
const FARADAY_F = 96485.3321; // C/mol
const GAS_CONST_R = 8.314462618;
const MOLAR_MASS_H2_KG = 0.00201588; // kg/mol
const LITERS_PER_MOL_STP = 22.414; // L/mol
const LHV_H2_KWH_PER_KG = 33.33; // kWh/kg (120 MJ/kg)

// -------------------------------------------------------------------------
// 2. POLARIZATION CURVE SIMULATION FOR AEMWE & PEMWE
// -------------------------------------------------------------------------

export function simulateElectrolyzerPolarization(
  specId: string = 'AEMWE_PIPERION_NIFE',
  operatingTempC: number = 65,
  pressureBar: number = 1.0
): AEMWEPolarizationPoint[] {
  const spec = ELECTROLYZER_TECHNOLOGIES_CATALOG.find(s => s.id === specId) || ELECTROLYZER_TECHNOLOGIES_CATALOG[0];
  const tempK = operatingTempC + 273.15;

  // Reversible voltage at temperature and pressure (Nernst equation):
  // E_rev(T) ~ 1.229 - 0.00085 * (T - 298.15)
  const eRev0 = 1.229 - 0.00085 * (tempK - 298.15);
  // Pressure adjustment: Delta V = (R*T / 2F) * ln(P_H2 * sqrt(P_O2))
  const pressureNernstTerm = (GAS_CONST_R * tempK / (2 * FARADAY_F)) * Math.log(pressureBar * Math.sqrt(pressureBar));
  const eRev = eRev0 + (pressureBar > 1 ? pressureNernstTerm : 0);

  // Area-specific resistance (ASR, Ohm*cm²):
  // Membrane thickness / conductivity + contact resistances
  const memThicknessCm = spec.membraneThicknessMicrons * 1e-4;
  const memResistance = memThicknessCm / spec.ohIonicConductivitySPerCm;
  const contactAndBubbleResistance = spec.technology === 'AEMWE_PGM_FREE' ? 0.06 : spec.technology === 'PEMWE_PRECIOUS_METALS' ? 0.04 : 0.18;
  const asrOhmCm2 = memResistance + contactAndBubbleResistance;

  // Catalyst Tafel parameters:
  // Anode OER Tafel slope (b_a) and exchange current density (j_0,a)
  let oerTafelSlope = 0.042; // NiFe-LDH ~42 mV/dec
  let oerJ0 = 1e-4;
  let herTafelSlope = 0.075; // NiMo ~75 mV/dec
  let herJ0 = 5e-3;

  if (spec.technology === 'PEMWE_PRECIOUS_METALS') {
    oerTafelSlope = 0.055; // IrO2 ~55 mV/dec
    oerJ0 = 2e-4;
    herTafelSlope = 0.035; // Pt/C ~35 mV/dec
    herJ0 = 1e-2;
  } else if (spec.technology === 'AEL_TRADITIONAL_ALKALINE') {
    oerTafelSlope = 0.085;
    oerJ0 = 5e-5;
    herTafelSlope = 0.095;
    herJ0 = 1e-3;
  }

  const points: AEMWEPolarizationPoint[] = [];
  const maxCurrent = 2.0; // 2.0 A/cm²
  const steps = 25;

  for (let i = 0; i <= steps; i++) {
    const j = (maxCurrent * i) / steps;

    if (j === 0) {
      points.push({
        currentDensityAcm2: 0,
        cellVoltageVolts: Number(eRev.toFixed(3)),
        ohmicOverpotentialVolts: 0,
        anodeOerOverpotentialVolts: 0,
        cathodeHerOverpotentialVolts: 0,
        powerDensityWcm2: 0
      });
      continue;
    }

    // 1. Ohmic Overpotential:
    const etaOhmic = j * asrOhmCm2;

    // 2. Anode OER Overpotential (Tafel slope per decade):
    const etaOer = oerTafelSlope * Math.log10(Math.max(1.0, j / oerJ0));

    // 3. Cathode HER Overpotential (Tafel slope per decade):
    const etaHer = herTafelSlope * Math.log10(Math.max(1.0, j / herJ0));

    const cellVoltage = eRev + etaOhmic + etaOer + etaHer;
    const powerDensity = cellVoltage * j;

    points.push({
      currentDensityAcm2: Number(j.toFixed(3)),
      cellVoltageVolts: Number(cellVoltage.toFixed(3)),
      ohmicOverpotentialVolts: Number(etaOhmic.toFixed(3)),
      anodeOerOverpotentialVolts: Number(etaOer.toFixed(3)),
      cathodeHerOverpotentialVolts: Number(etaHer.toFixed(3)),
      powerDensityWcm2: Number(powerDensity.toFixed(3))
    });
  }

  return points;
}

// -------------------------------------------------------------------------
// 3. COMPLETE AEMWE SYSTEM PERFORMANCE & LCOH CALCULATOR
// -------------------------------------------------------------------------

export function simulateAEMWEPerformance(
  specId: string = 'AEMWE_PIPERION_NIFE',
  operatingTempC: number = 65,
  pressureBar: number = 30,
  currentDensityAcm2: number = 1.2,
  stackActiveAreaM2: number = 5.0, // 5 m² commercial stack
  electricityPriceUsdPerKwh: number = 0.03 // $0.03/kWh cheap renewable solar/wind
): AEMWEPerformanceResult {
  const spec = ELECTROLYZER_TECHNOLOGIES_CATALOG.find(s => s.id === specId) || ELECTROLYZER_TECHNOLOGIES_CATALOG[0];

  // Polarization curve point
  const polPoints = simulateElectrolyzerPolarization(specId, operatingTempC, pressureBar);
  const matchedPoint = polPoints.reduce((prev, curr) => 
    Math.abs(curr.currentDensityAcm2 - currentDensityAcm2) < Math.abs(prev.currentDensityAcm2 - currentDensityAcm2) ? curr : prev
  );

  const cellVoltage = matchedPoint.cellVoltageVolts;
  const totalCurrentAmperes = currentDensityAcm2 * (stackActiveAreaM2 * 10000); // 1 m² = 10,000 cm²

  // Faraday's Law for H2 production:
  // n_H2 = (I * eta_faraday) / (2 * F)
  const faradaicEfficiency = 0.995;
  const molesH2PerSec = (totalCurrentAmperes * faradaicEfficiency) / (2 * FARADAY_F);
  const h2ProductionRateKgPerHour = molesH2PerSec * MOLAR_MASS_H2_KG * 3600;
  const h2ProductionRateNm3PerHour = (molesH2PerSec * LITERS_PER_MOL_STP * 3600) / 1000;
  const o2ProductionRateNm3PerHour = h2ProductionRateNm3PerHour / 2;

  // Power and Specific Energy Consumption:
  // Electrical input power (kW)
  const electricalInputPowerKw = (cellVoltage * totalCurrentAmperes) / 1000;
  const specificEnergyConsumptionKwhPerKg = h2ProductionRateKgPerHour > 0 ? electricalInputPowerKw / h2ProductionRateKgPerHour : 0;
  const specificEnergyConsumptionKwhPerNm3 = h2ProductionRateNm3PerHour > 0 ? electricalInputPowerKw / h2ProductionRateNm3PerHour : 0;

  // Stack Efficiency (LHV basis, LHV of H2 = 33.33 kWh/kg):
  const stackEfficiencyLhvPercent = (LHV_H2_KWH_PER_KG / specificEnergyConsumptionKwhPerKg) * 100;

  // Levelized Cost of Hydrogen (LCOH, $/kg H2):
  // LCOH = Electricity Cost + CAPEX contribution + OPEX contribution
  const electricityCostPerKg = specificEnergyConsumptionKwhPerKg * electricityPriceUsdPerKwh;
  // CAPEX annualized: assume 8,000 operating hours/year over 10-year lifetime
  const annualH2ProductionKg = h2ProductionRateKgPerHour * 8000;
  const stackCapexTotalUsd = spec.stackCostUsdPerKw * (electricalInputPowerKw);
  const capexPerKg = annualH2ProductionKg > 0 ? (stackCapexTotalUsd / (annualH2ProductionKg * 10)) : 0.8;
  const opexPerKg = 0.25; // water, maintenance
  const levelizedCostOfHydrogenUsdPerKg = Number((electricityCostPerKg + capexPerKg + opexPerKg).toFixed(2));

  // Terawatt scalability bottleneck assessment:
  let terawattScalabilityBottleneckVerdict = '';
  if (spec.isPgmFree) {
    terawattScalabilityBottleneckVerdict = 'KHÔNG BỊ NGHẼN NGUYÊN LIỆU: Sử dụng 100% kim loại dồi dào (Niken, Sắt, Thép 316L). Sẵn sàng sản xuất quy mô Terawatt (TW) toàn cầu!';
  } else {
    terawattScalabilityBottleneckVerdict = 'NGHẼN TRẦM TRỌNG BỞI IRIDIUM: Cần 0.45g Iridium/kW. Sản lượng Iridium toàn cầu chỉ ~8 tấn/năm, tối đa chỉ đáp ứng được < 20 GW/năm, không thể mở rộng quy mô Terawatt!';
  }

  return {
    stackSpec: spec,
    operatingTempC,
    operatingPressureBar: pressureBar,
    electrolyteFeed: spec.technology === 'AEMWE_PGM_FREE' ? '0.1M - 1.0M KOH hoặc H₂O tinh khiết có ionomer' : spec.technology === 'PEMWE_PRECIOUS_METALS' ? 'Nước siêu sạch DI (18.2 MΩ·cm)' : 'Dung dịch kiềm ăn mòn nồng độ cao 6M KOH (30%)',
    cellVoltageVolts: Number(cellVoltage.toFixed(3)),
    currentDensityAcm2,
    h2ProductionRateKgPerHour: Number(h2ProductionRateKgPerHour.toFixed(2)),
    h2ProductionRateNm3PerHour: Number(h2ProductionRateNm3PerHour.toFixed(2)),
    o2ProductionRateNm3PerHour: Number(o2ProductionRateNm3PerHour.toFixed(2)),
    specificEnergyConsumptionKwhPerKg: Number(specificEnergyConsumptionKwhPerKg.toFixed(1)),
    specificEnergyConsumptionKwhPerNm3: Number(specificEnergyConsumptionKwhPerNm3.toFixed(2)),
    stackEfficiencyLhvPercent: Number(stackEfficiencyLhvPercent.toFixed(1)),
    levelizedCostOfHydrogenUsdPerKg,
    terawattScalabilityBottleneckVerdict
  };
}
