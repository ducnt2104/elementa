// src/domain/thermoelectricEngine.ts
// Domain Engine: Thermoelectric Seebeck & Peltier Modules (ZT > 2.5) & Industrial Waste Heat Recovery
// Standards: IUPAC Physical Chemistry, PGEC (Slack 1995) & Vietnam GDPT 2018 (Vật lý Nhiệt điện, Bán dẫn & Năng lượng)

export type SemiconductorDopingType = 'P_TYPE_POSITIVE' | 'N_TYPE_NEGATIVE';

export interface ThermoelectricMaterial {
  id: string;
  nameVi: string;
  chemicalFormula: string;
  dopingType: SemiconductorDopingType;
  dopingNameVi: string;
  seebeckCoefficientMicroVK: number; // Hệ số Seebeck S (µV/K)
  electricalConductivityScm: number; // Độ dẫn điện σ (S/cm)
  totalThermalConductivityWmK: number; // Độ dẫn nhiệt toàn phần κ = κ_e + κ_L (W/m·K)
  latticeThermalConductivityWmK: number; // Độ dẫn nhiệt mạng tinh thể κ_L (W/m·K)
  optimalOperatingTempKelvin: number; // Nhiệt độ hoạt động tối ưu T (K)
  peakZtValue: number; // Hệ số phẩm chất cực đại ZT
  pgecPhononRattling: boolean; // Cơ chế Phonon-Glass Electron-Crystal (PGEC)
  leadFreeEcoCompliant: boolean;
  advantagesVi: string;
  limitationsVi: string;
}

export interface ThermoelectricZtCalculation {
  material: ThermoelectricMaterial;
  temperatureKelvin: number;
  temperatureCelsius: number;
  powerFactorMicroWmK2: number; // Hệ số công suất PF = S² · σ (µW/cm·K²)
  figureOfMeritZt: number; // ZT = (S² · σ · T) / κ
  carnotEfficiencyLimitPercent: number; // Giới hạn Carnot η_Carnot
  thermoelectricEfficiencyPercent: number; // Hiệu suất chuyển đổi thực tế η_TEG
  performanceTierVi: 'TIÊU CHUẨN (ZT ~ 1.0)' | 'HIỆU SUẤT CAO (ZT ~ 1.5 - 2.0)' | 'KỶ LỤC THẾ GIỚI (ZT > 2.5)';
}

export interface TegWasteHeatSimulation {
  material: ThermoelectricMaterial;
  hotSideTempCelsius: number;
  coldSideTempCelsius: number;
  temperatureDifferenceDeltaT: number; // ΔT = T_h - T_c (K)
  coupleCount: number; // Số cặp lưỡng nhiệt điện p-n (thường 127 cặp)
  openCircuitVoltageV: number; // V_oc = N · (S_p - S_n) · ΔT
  internalResistanceOhms: number;
  matchedLoadResistanceOhms: number;
  maximumElectricPowerOutputWatts: number; // P_max = V_oc² / (4 · R_int)
  wasteHeatInputWatts: number;
  thermoelectricEfficiencyPercent: number;
  automotiveFuelSavingPercent: number; // Tiết kiệm nhiên liệu ô tô (%)
}

export interface PeltierCoolingSimulation {
  material: ThermoelectricMaterial;
  appliedCurrentAmperes: number;
  ambientTemperatureCelsius: number;
  activeHeatLoadWatts: number;
  peltierHeatPumpingRateWatts: number; // Q_c = 2 · N · (S · T_c · I - 0.5 · I² · R - K · ΔT)
  coldSideTemperatureCelsius: number;
  temperatureDropDeltaTCelsius: number;
  coefficientOfPerformanceCop: number; // COP = Q_c / W_electric
  isCoolingFeasible: boolean;
}

// 1. Danh mục Vật liệu Nhiệt điện Tiên tiến
export const THERMOELECTRIC_MATERIALS_CATALOG: ThermoelectricMaterial[] = [
  {
    id: 'BI2TE3_ROOM_TEMP',
    nameVi: 'Bismut Tellurit (Bi₂Te₃ / Sb₂Te₃ Chuẩn Phòng)',
    chemicalFormula: 'Bi₂Te₃ / Sb₂Te₃',
    dopingType: 'P_TYPE_POSITIVE',
    dopingNameVi: 'Bán dẫn p-type (Lỗ trống là hạt tải đa số)',
    seebeckCoefficientMicroVK: 215.0,
    electricalConductivityScm: 1100.0,
    totalThermalConductivityWmK: 1.35,
    latticeThermalConductivityWmK: 0.85,
    optimalOperatingTempKelvin: 320,
    peakZtValue: 1.15,
    pgecPhononRattling: false,
    leadFreeEcoCompliant: true,
    advantagesVi: 'Vật liệu thương phẩm số 1 thế giới cho tủ lạnh mini bán dẫn Peltier, tản nhiệt CPU máy tính và cảm biến nhiệt.',
    limitationsVi: 'Chỉ hoạt động tốt ở nhiệt độ thấp (< 150°C), Tellurium là nguyên tố hiếm và đắt đỏ.'
  },
  {
    id: 'SNSE_SINGLE_CRYSTAL',
    nameVi: 'Thiếc Selenua Đơn Tinh Thể Kỷ Lục (SnSe b-axis)',
    chemicalFormula: 'SnSe (Đơn tinh thể trực thoi)',
    dopingType: 'P_TYPE_POSITIVE',
    dopingNameVi: 'Bán dẫn p-type cấu trúc lớp xếp nếp',
    seebeckCoefficientMicroVK: 570.0,
    electricalConductivityScm: 120.0,
    totalThermalConductivityWmK: 0.38,
    latticeThermalConductivityWmK: 0.22,
    optimalOperatingTempKelvin: 923,
    peakZtValue: 2.65,
    pgecPhononRattling: true,
    leadFreeEcoCompliant: true,
    advantagesVi: 'Nắm giữ kỷ lục ZT thế giới (ZT = 2.65 tại 650°C), dẫn nhiệt mạng siêu thấp do tính bất đối xứng cấu trúc, hoàn toàn không chứa Chì độc.',
    limitationsVi: 'Độ giòn cơ học cao dọc theo mặt phẳng trượt, chế tạo đơn tinh thể quy mô công nghiệp đòi hỏi lò nung chân không cực cao.'
  },
  {
    id: 'FILLED_SKUTTERUDITE',
    nameVi: 'Skutterudite Lồng Nguyên Tử Khách (Ba₀.₃Yb₀.₂Co₄Sb₁₂)',
    chemicalFormula: 'Ba₀.₃Yb₀.₂Co₄Sb₁₂',
    dopingType: 'N_TYPE_NEGATIVE',
    dopingNameVi: 'Bán dẫn n-type cấu trúc lồng PGEC',
    seebeckCoefficientMicroVK: -245.0,
    electricalConductivityScm: 1450.0,
    totalThermalConductivityWmK: 1.95,
    latticeThermalConductivityWmK: 0.95,
    optimalOperatingTempKelvin: 750,
    peakZtValue: 1.65,
    pgecPhononRattling: true,
    leadFreeEcoCompliant: true,
    advantagesVi: 'Mô hình Tinh Thể Điện Tử - Thủy Tinh Âm Tử (PGEC), nguyên tử Bari và Ytterbi rung lắc trong lồng làm tán xạ mạnh phonon nhiệt.',
    limitationsVi: 'Đòi hỏi quá trình luyện kim bột và ép nóng xung điện (Spark Plasma Sintering - SPS) nghiêm ngặt.'
  },
  {
    id: 'SIGE_NASA_VOYAGER',
    nameVi: 'Hợp Kim Silic - Germani Vũ Trụ NASA (Si₀.₈Ge₀.₂ RTG)',
    chemicalFormula: 'Si₀.₈Ge₀.₂',
    dopingType: 'N_TYPE_NEGATIVE',
    dopingNameVi: 'Bán dẫn n-type chịu nhiệt độ siêu cao',
    seebeckCoefficientMicroVK: -280.0,
    electricalConductivityScm: 850.0,
    totalThermalConductivityWmK: 4.20,
    latticeThermalConductivityWmK: 3.10,
    optimalOperatingTempKelvin: 1100,
    peakZtValue: 1.25,
    pgecPhononRattling: false,
    leadFreeEcoCompliant: true,
    advantagesVi: 'Độ bền vật lý vĩnh cửu trong môi trường vũ trụ khắc nghiệt, cấp điện cho tàu Voyager 1/2 và xe tự hành Sao Hỏa Perseverance suốt 45 năm.',
    limitationsVi: 'Nhiệt độ kích hoạt tối thiểu phải trên 600°C, giá thành Germani độ tinh khiết cao rất đắt.'
  },
  {
    id: 'PEDOT_PSS_POLYMER',
    nameVi: 'Polyme Dẫn Linh Hoạt Uốn Dẻo (PEDOT:PSS Doped)',
    chemicalFormula: 'PEDOT:PSS / DMSO',
    dopingType: 'P_TYPE_POSITIVE',
    dopingNameVi: 'Polyme dẫn điện hữu cơ uốn dẻo (Flexible Organic)',
    seebeckCoefficientMicroVK: 65.0,
    electricalConductivityScm: 1250.0,
    totalThermalConductivityWmK: 0.28,
    latticeThermalConductivityWmK: 0.18,
    optimalOperatingTempKelvin: 310,
    peakZtValue: 0.42,
    pgecPhononRattling: false,
    leadFreeEcoCompliant: true,
    advantagesVi: 'Mềm dẻo tuyệt đối, in phun 3D lên vải may mặc, thu nhiệt cơ thể người (ΔT ~ 5 - 10°C) cấp điện cho đồng hồ thông minh.',
    limitationsVi: 'Hệ số ZT còn ở mức khiêm tốn so với bán dẫn vô cơ.'
  }
];

// Helper: Lấy danh mục vật liệu nhiệt điện
export function getThermoelectricMaterials(): ThermoelectricMaterial[] {
  return THERMOELECTRIC_MATERIALS_CATALOG;
}

// 2. Tính toán hệ số phẩm chất ZT và hiệu suất Carnot
export function calculateThermoelectricZt(
  materialId: string,
  temperatureCelsius: number = 300
): ThermoelectricZtCalculation {
  const material = THERMOELECTRIC_MATERIALS_CATALOG.find(m => m.id === materialId) || THERMOELECTRIC_MATERIALS_CATALOG[0];
  const T_kelvin = temperatureCelsius + 273.15;

  // Hệ số công suất PF = S² · σ
  // S (µV/K = 10⁻⁶ V/K) => S² (10⁻¹² V²/K²)
  // σ (S/cm = 100 S/m)
  // PF tính theo µW/cm·K² = (S_µV)² · σ_S/cm · 10⁻⁶
  const powerFactorMicroWmK2 = Math.round(Math.pow(material.seebeckCoefficientMicroVK, 2) * material.electricalConductivityScm * 1e-6 * 100) / 100;

  // Hệ số ZT = (S² · σ · T) / κ
  // S (V/K), σ (S/m), κ (W/m·K)
  const S_volts = material.seebeckCoefficientMicroVK * 1e-6;
  const sigma_Sm = material.electricalConductivityScm * 100.0;
  const kappa_WmK = material.totalThermalConductivityWmK;

  const rawZt = (Math.pow(S_volts, 2) * sigma_Sm * T_kelvin) / kappa_WmK;
  // Điều chỉnh ZT theo nhiệt độ tối ưu của vật liệu
  const tempRatio = T_kelvin / material.optimalOperatingTempKelvin;
  const temperatureAdaptedZt = rawZt * Math.exp(-Math.pow(Math.log(Math.max(0.1, tempRatio)), 2) * 2.0);
  const figureOfMeritZt = Math.max(0.05, Math.round(temperatureAdaptedZt * 100) / 100);

  // Hiệu suất chuyển đổi nhiệt điện:
  // η = η_Carnot · (sqrt(1 + ZT_avg) - 1) / (sqrt(1 + ZT_avg) + T_c / T_h)
  const Tc_kelvin = 298.15; // Môi trường 25°C
  const Th_kelvin = Math.max(Tc_kelvin + 10, T_kelvin);
  const carnotEfficiency = (Th_kelvin - Tc_kelvin) / Th_kelvin;
  const sqrtTerm = Math.sqrt(1 + figureOfMeritZt);
  const tegEfficiency = carnotEfficiency * ((sqrtTerm - 1) / (sqrtTerm + (Tc_kelvin / Th_kelvin)));

  let performanceTierVi: 'TIÊU CHUẨN (ZT ~ 1.0)' | 'HIỆU SUẤT CAO (ZT ~ 1.5 - 2.0)' | 'KỶ LỤC THẾ GIỚI (ZT > 2.5)' = 'TIÊU CHUẨN (ZT ~ 1.0)';
  if (figureOfMeritZt >= 2.2) {
    performanceTierVi = 'KỶ LỤC THẾ GIỚI (ZT > 2.5)';
  } else if (figureOfMeritZt >= 1.4) {
    performanceTierVi = 'HIỆU SUẤT CAO (ZT ~ 1.5 - 2.0)';
  }

  return {
    material,
    temperatureKelvin: Math.round(T_kelvin),
    temperatureCelsius,
    powerFactorMicroWmK2,
    figureOfMeritZt,
    carnotEfficiencyLimitPercent: Math.round(carnotEfficiency * 1000) / 10,
    thermoelectricEfficiencyPercent: Math.round(tegEfficiency * 1000) / 10,
    performanceTierVi
  };
}

// 3. Mô phỏng Module Thu Hồi Nhiệt Thải Công Nghiệp / Ô Tô (Waste Heat TEG)
export function simulateTegWasteHeatRecovery(
  materialId: string,
  hotSideTempCelsius: number = 350,
  coldSideTempCelsius: number = 50,
  coupleCount: number = 127
): TegWasteHeatSimulation {
  const material = THERMOELECTRIC_MATERIALS_CATALOG.find(m => m.id === materialId) || THERMOELECTRIC_MATERIALS_CATALOG[1];

  const deltaT = Math.max(1, hotSideTempCelsius - coldSideTempCelsius);
  const T_avg_kelvin = ((hotSideTempCelsius + coldSideTempCelsius) / 2) + 273.15;

  // Giả định cặp p-n đối xứng có hệ số Seebeck tổng hợp: S_pair = 2 · |S|
  const S_pair_V = (Math.abs(material.seebeckCoefficientMicroVK) * 2.0) * 1e-6;
  const openCircuitVoltageV = Math.round(coupleCount * S_pair_V * deltaT * 100) / 100;

  // Điện trở nội tại của 127 cặp trụ bán dẫn (kích thước chuẩn 1.4 x 1.4 x 2.0 mm)
  const legAreaM2 = 1.96e-6; // 1.4 mm x 1.4 mm
  const legLengthM = 2.0e-3; // 2.0 mm
  const sigma_Sm = material.electricalConductivityScm * 100.0;
  const singleLegResistance = legLengthM / (sigma_Sm * legAreaM2);
  const internalResistanceOhms = Math.round((2 * coupleCount * singleLegResistance) * 100) / 100;

  // Công suất cực đại khi tải ngoài khớp trở kháng: R_load = R_int => P_max = V_oc² / (4 · R_int)
  const maximumElectricPowerOutputWatts = Math.round((Math.pow(openCircuitVoltageV, 2) / (4 * Math.max(0.1, internalResistanceOhms))) * 10) / 10;

  // Dòng nhiệt dẫn qua module: Q_in = N · (2 · K_leg · ΔT) + Q_Peltier
  const K_leg = (material.totalThermalConductivityWmK * legAreaM2) / legLengthM;
  const totalConductionHeatWatts = 2 * coupleCount * K_leg * deltaT;
  const wasteHeatInputWatts = Math.round((totalConductionHeatWatts + maximumElectricPowerOutputWatts) * 10) / 10;

  // Hiệu suất nhiệt điện
  const thermoelectricEfficiencyPercent = Math.round((maximumElectricPowerOutputWatts / Math.max(1, wasteHeatInputWatts)) * 1000) / 10;

  // Tỷ lệ tiết kiệm nhiên liệu động cơ ô tô (thay thế máy phát điện alternator 12V)
  const automotiveFuelSavingPercent = Math.min(4.5, Math.round((maximumElectricPowerOutputWatts / 18.0) * 10) / 10);

  return {
    material,
    hotSideTempCelsius,
    coldSideTempCelsius,
    temperatureDifferenceDeltaT: deltaT,
    coupleCount,
    openCircuitVoltageV,
    internalResistanceOhms,
    matchedLoadResistanceOhms: internalResistanceOhms,
    maximumElectricPowerOutputWatts,
    wasteHeatInputWatts,
    thermoelectricEfficiencyPercent,
    automotiveFuelSavingPercent
  };
}

// 4. Mô phỏng Hiệu Ứng Peltier (Làm Lạnh Rắn Solid-State Cooling)
export function simulatePeltierCooling(
  materialId: string,
  appliedCurrentAmperes: number = 3.5,
  ambientTemperatureCelsius: number = 30,
  activeHeatLoadWatts: number = 15.0
): PeltierCoolingSimulation {
  const material = THERMOELECTRIC_MATERIALS_CATALOG.find(m => m.id === materialId) || THERMOELECTRIC_MATERIALS_CATALOG[0];

  const coupleCount = 127;
  const S_pair_V = (Math.abs(material.seebeckCoefficientMicroVK) * 2.0) * 1e-6;
  const sigma_Sm = material.electricalConductivityScm * 100.0;
  const legAreaM2 = 1.96e-6;
  const legLengthM = 2.0e-3;
  const R_module = 2 * coupleCount * (legLengthM / (sigma_Sm * legAreaM2));
  const K_module = 2 * coupleCount * ((material.totalThermalConductivityWmK * legAreaM2) / legLengthM);

  const Th_kelvin = ambientTemperatureCelsius + 273.15;

  // Công suất nhiệt Peltier bơm đi tại mặt lạnh:
  // Q_c = 2 · N · S · T_c · I - 0.5 · I² · R_module - K_module · (T_h - T_c)
  // Tại trạng thái cân bằng dừng Q_c = activeHeatLoadWatts
  // T_c = (activeHeatLoadWatts + 0.5 · I² · R_module + K_module · T_h) / (2 · N · S · I + K_module)
  const seebeckTerm = coupleCount * S_pair_V * appliedCurrentAmperes;
  const jouleHeatHalf = 0.5 * Math.pow(appliedCurrentAmperes, 2) * R_module;

  const Tc_kelvin = (activeHeatLoadWatts + jouleHeatHalf + K_module * Th_kelvin) / (seebeckTerm + K_module);
  const coldSideTemperatureCelsius = Math.round((Tc_kelvin - 273.15) * 10) / 10;
  const temperatureDropDeltaTCelsius = Math.round((ambientTemperatureCelsius - coldSideTemperatureCelsius) * 10) / 10;

  // Công suất điện tiêu thụ: W = I² · R_module + 2 · N · S · (T_h - T_c) · I
  const electricWorkWatts = Math.pow(appliedCurrentAmperes, 2) * R_module + seebeckTerm * (Th_kelvin - Tc_kelvin);

  // Hệ số hiệu quả làm lạnh: COP = Q_c / W
  const coefficientOfPerformanceCop = Math.max(0.1, Math.round((activeHeatLoadWatts / Math.max(0.5, electricWorkWatts)) * 100) / 100);
  const isCoolingFeasible = coldSideTemperatureCelsius < ambientTemperatureCelsius && temperatureDropDeltaTCelsius > 0;

  return {
    material,
    appliedCurrentAmperes,
    ambientTemperatureCelsius,
    activeHeatLoadWatts,
    peltierHeatPumpingRateWatts: activeHeatLoadWatts,
    coldSideTemperatureCelsius,
    temperatureDropDeltaTCelsius,
    coefficientOfPerformanceCop,
    isCoolingFeasible
  };
}
