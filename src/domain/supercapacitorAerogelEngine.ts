// src/domain/supercapacitorAerogelEngine.ts
// Domain Engine: Supercapacitors, Pseudocapacitance & Graphene Aerogels
// Standards: IUPAC Physical & Materials Chemistry, Conway Model & Vietnam GDPT 2018 (Vật liệu Năng lượng & Điện hóa Siêu tụ điện)

export type ChargeStorageMechanism = 'EDLC_ELECTROSTATIC' | 'PSEUDOCAPACITIVE_FARADAIC' | 'HYBRID_COMPOSITE';

export interface ElectrodeMaterial {
  id: string;
  nameVi: string;
  chemicalFormula: string;
  mechanism: ChargeStorageMechanism;
  mechanismNameVi: string;
  specificSurfaceAreaM2g: number; // Diện tích bề mặt riêng BET (m²/g)
  specificCapacitanceFg: number; // Điện dung riêng lý thuyết / đo đạc (F/g)
  electricalConductivityScm: number; // Độ dẫn điện (S/cm)
  cycleLifeCount: number; // Tuổi thọ số chu kỳ nạp/xả
  costTierVi: 'THẤP (KINH TẾ)' | 'TRUNG BÌNH' | 'RẤT CAO (ĐẮT ĐỎ)';
  redoxReactionVi?: string; // Phản ứng oxi hóa khử giả điện dung (nếu có)
  advantagesVi: string;
  limitationsVi: string;
}

export interface ElectrolyteSystem {
  id: string;
  nameVi: string;
  formula: string;
  solventType: 'AQUEOUS' | 'ORGANIC' | 'IONIC_LIQUID';
  operatingVoltageWindowV: number; // Cửa sổ thế hoạt động an toàn (V)
  ionicConductivitymScm: number; // Độ dẫn ion (mS/cm)
  equivalentSeriesResistanceOhms: number; // Trở kháng nối tiếp tương đương ESR danh định (Ω)
  temperatureRangeCelsius: string;
  safetyNotesVi: string;
}

export interface SupercapacitorCellMetrics {
  material: ElectrodeMaterial;
  electrolyte: ElectrolyteSystem;
  electrodeMassGrams: number;
  cellVoltageV: number;
  totalCapacitanceFarads: number; // Điện dung toàn cell C_cell = (1/2) * C_electrode (cho cell đối xứng 2 cực)
  energyDensityWhKg: number; // Mật độ năng lượng E = (1/8) * C_spec * V² / 3.6 (Wh/kg trên khối lượng 2 cực)
  maxPowerDensityWKg: number; // Mật độ công suất đỉnh P_max = V² / (4 * ESR * mass) (W/kg)
  typicalDischargeTimeSeconds: number; // Thời gian phóng điện điển hình (s)
  ragoneClassificationVi: string;
}

export interface RagoneComparisonData {
  deviceTypeVi: string;
  energyDensityRangeWhKg: [number, number]; // [min, max]
  powerDensityRangeWKg: [number, number]; // [min, max]
  dischargeTimeVi: string;
  cycleLifeVi: string;
  typicalApplicationsVi: string;
}

export interface CyclicVoltammetryPoint {
  potentialV: number;
  currentMa: number;
}

export interface GrapheneAerogelSynthesisResult {
  freezingTemperatureCelsius: number;
  goPrecursorMgMl: number;
  aerogelDensityMgCm3: number; // Mật độ siêu nhẹ (< 10 mg/cm³)
  porosityPercent: number; // Độ xốp (> 99%)
  compressiveModulusKPa: number; // Độ bền cơ học chịu nén (kPa)
  poreMorphologyVi: string;
  ionDiffusionConductivityScm: number;
}

// 1. Danh mục Vật liệu Điện cực Siêu tụ điện
export const ELECTRODE_MATERIALS_CATALOG: ElectrodeMaterial[] = [
  {
    id: 'ACTIVATED_CARBON',
    nameVi: 'Than Hoạt Tính Diện Tích Cao (AC)',
    chemicalFormula: 'C (xốp vi mô)',
    mechanism: 'EDLC_ELECTROSTATIC',
    mechanismNameVi: 'Tụ điện lớp kép điện tích (EDLC - Tích trữ tĩnh điện)',
    specificSurfaceAreaM2g: 1850,
    specificCapacitanceFg: 160,
    electricalConductivityScm: 12.5,
    cycleLifeCount: 1000000,
    costTierVi: 'THẤP (KINH TẾ)',
    advantagesVi: 'Nguồn gốc vỏ dừa / sinh khối giá rẻ, trơ hóa học tuyệt đối, tuổi thọ nạp xả > 1.000.000 chu kỳ.',
    limitationsVi: 'Điện dung riêng và mật độ năng lượng ở mức cơ bản, nhiều lỗ xốp vi mô nghẽn ion ở tốc độ quét cao.'
  },
  {
    id: 'GRAPHENE_AEROGEL',
    nameVi: 'Khí Gel Graphene 3D (Graphene Aerogel)',
    chemicalFormula: 'C (mạng lưới r-GO 3D)',
    mechanism: 'EDLC_ELECTROSTATIC',
    mechanismNameVi: 'Tụ điện lớp kép điện tích 3D siêu nhẹ (3D EDLC)',
    specificSurfaceAreaM2g: 2450,
    specificCapacitanceFg: 310,
    electricalConductivityScm: 1450.0,
    cycleLifeCount: 1000000,
    costTierVi: 'TRUNG BÌNH',
    advantagesVi: 'Cấu trúc xốp 3D liên thông không nghẽn ion, dẫn điện kim loại vượt trội, tỷ trọng siêu nhẹ < 5 mg/cm³.',
    limitationsVi: 'Đòi hỏi quy trình đông khô định hướng (ice-templating freeze-drying) kiểm soát chặt chẽ.'
  },
  {
    id: 'RUO2_HYDRATE',
    nameVi: 'Rutheni(IV) Oxit Ngậm Nước (RuO₂·xH₂O)',
    chemicalFormula: 'RuO₂·xH₂O',
    mechanism: 'PSEUDOCAPACITIVE_FARADAIC',
    mechanismNameVi: 'Giả điện dung Faradaic nhanh (Pseudocapacitance)',
    specificSurfaceAreaM2g: 140,
    specificCapacitanceFg: 960,
    electricalConductivityScm: 8500.0,
    cycleLifeCount: 100000,
    costTierVi: 'RẤT CAO (ĐẮT ĐỎ)',
    redoxReactionVi: 'RuO₂ + xH⁺ + xe⁻ ⇌ RuO₂₋ₓ(OH)ₓ (Trạng thái oxi hóa liên tục Ru²⁺ ↔ Ru⁴⁺)',
    advantagesVi: 'Điện dung riêng cực khủng ~1000 F/g, độ dẫn điện kim loại, đường cong nạp xả cực kỳ tuyến tính.',
    limitationsVi: 'Kim loại quý đắt đỏ bậc nhất Trái Đất, chỉ ứng dụng trong quân sự, hàng không vũ trụ và vi mạch y sinh.'
  },
  {
    id: 'MNO2_NANORODS',
    nameVi: 'Mangan(IV) Oxit Thanh Nano (MnO₂ Nanorods)',
    chemicalFormula: 'MnO₂',
    mechanism: 'PSEUDOCAPACITIVE_FARADAIC',
    mechanismNameVi: 'Giả điện dung Faradaic kim loại chuyển tiếp',
    specificSurfaceAreaM2g: 280,
    specificCapacitanceFg: 240,
    electricalConductivityScm: 0.0015,
    cycleLifeCount: 15000,
    costTierVi: 'THẤP (KINH TẾ)',
    redoxReactionVi: 'MnO₂ + Na⁺ + e⁻ ⇌ MnOONa (Chèn/nhả cation Na⁺ kết hợp chuyển đổi Mn³⁺/Mn⁴⁺)',
    advantagesVi: 'Nguyên tố dồi dào, thân thiện môi trường, chi phí sản xuất cực thấp, hoạt động tốt trong dung dịch muối trung tính.',
    limitationsVi: 'Độ dẫn điện nội tại rất thấp, cần lai ghép với chất dẫn điện như than nano hoặc graphene để giảm ESR.'
  },
  {
    id: 'TI3C2TX_MXENE',
    nameVi: 'Vật Liệu 2D MXene (Ti₃C₂Tₓ Nanoflakes)',
    chemicalFormula: 'Ti₃C₂Tₓ (T = -OH, -F, =O)',
    mechanism: 'PSEUDOCAPACITIVE_FARADAIC',
    mechanismNameVi: 'Giả điện dung xen kẽ 2D (Intercalation Pseudocapacitance)',
    specificSurfaceAreaM2g: 480,
    specificCapacitanceFg: 380,
    electricalConductivityScm: 7200.0,
    cycleLifeCount: 30000,
    costTierVi: 'TRUNG BÌNH',
    redoxReactionVi: 'Ti₃C₂Tₓ + δH⁺ + δe⁻ ⇌ Ti₃C₂Tₓ₋δ(OH)δ (Chuyển dịch điện tích bề mặt nhóm thế T)',
    advantagesVi: 'Độ dẫn điện ngang ngửa kim loại, điện dung thể tích cực cao (> 1500 F/cm³), chế tạo màng dẻo tự đỡ.',
    limitationsVi: 'Dễ bị oxi hóa thành TiO₂ khi tiếp xúc oxy hòa tan lâu ngày ở nhiệt độ cao.'
  },
  {
    id: 'PANI_COMPOSITE',
    nameVi: 'Polyme Dẫn Polyaniline (PANI / Graphene)',
    chemicalFormula: '(C₆H₄NH)ₙ / C',
    mechanism: 'HYBRID_COMPOSITE',
    mechanismNameVi: 'Lai ghép Giả điện dung Polyme dẫn & EDLC',
    specificSurfaceAreaM2g: 620,
    specificCapacitanceFg: 450,
    electricalConductivityScm: 45.0,
    cycleLifeCount: 8000,
    costTierVi: 'THẤP (KINH TẾ)',
    redoxReactionVi: 'Leucoemeraldine (khử) ⇌ Emeraldine (bán dẫn) ⇌ Pernigraniline (oxi hóa hoàn toàn)',
    advantagesVi: 'Điện dung cao, dễ gia công màng mỏng in ấn linh hoạt, cơ chế pha tạp doping proton nhanh.',
    limitationsVi: 'Hiện tượng trương nở/co rút cấu trúc polyme trong chu kỳ nạp xả gây suy giảm dung lượng cơ học sau ~10,000 lần.'
  }
];

// 2. Danh mục Hệ Dung dịch Điện Ly (Electrolytes)
export const ELECTROLYTE_CATALOG: ElectrolyteSystem[] = [
  {
    id: 'AQUEOUS_KOH',
    nameVi: 'Dung dịch Kiềm Nước 6M KOH (Aqueous Alkaline)',
    formula: '6M KOH(aq)',
    solventType: 'AQUEOUS',
    operatingVoltageWindowV: 1.0,
    ionicConductivitymScm: 540.0,
    equivalentSeriesResistanceOhms: 0.12,
    temperatureRangeCelsius: '-20°C đến +60°C',
    safetyNotesVi: 'Không cháy nổ, dẫn ion cực cao, nhưng cửa sổ thế bị giới hạn bởi phân hủy nước (1.23 V).'
  },
  {
    id: 'AQUEOUS_NA2SO4',
    nameVi: 'Dung dịch Muối Trung Tính 1M Na₂SO₄ (Neutral Aqueous)',
    formula: '1M Na₂SO₄(aq)',
    solventType: 'AQUEOUS',
    operatingVoltageWindowV: 1.2,
    ionicConductivitymScm: 85.0,
    equivalentSeriesResistanceOhms: 0.35,
    temperatureRangeCelsius: '0°C đến +70°C',
    safetyNotesVi: 'An toàn tuyệt đối, không ăn mòn thiết bị, thích hợp cho oxit kim loại như MnO₂.'
  },
  {
    id: 'ORGANIC_ACN_TEABF4',
    nameVi: 'Dung dịch Hữu Cơ 1M TEABF₄ trong Acetonitrile (Commercial)',
    formula: '(C₂H₅)₄NBF₄ / CH₃CN',
    solventType: 'ORGANIC',
    operatingVoltageWindowV: 2.7,
    ionicConductivitymScm: 62.0,
    equivalentSeriesResistanceOhms: 0.75,
    temperatureRangeCelsius: '-40°C đến +65°C',
    safetyNotesVi: 'Cửa sổ thế mở rộng 2.7 V giúp năng lượng E ∝ V² tăng gấp 5 lần so với hệ nước, nhưng dung môi dễ cháy.'
  },
  {
    id: 'IONIC_LIQUID_EMIM_TFSI',
    nameVi: 'Chất Lỏng Ion Nhiệt Độ Phòng EMIM-TFSI (Next-Gen)',
    formula: '[EMIM][TFSI]',
    solventType: 'IONIC_LIQUID',
    operatingVoltageWindowV: 3.5,
    ionicConductivitymScm: 11.5,
    equivalentSeriesResistanceOhms: 1.65,
    temperatureRangeCelsius: '-20°C đến +100°C',
    safetyNotesVi: 'Hoàn toàn không bay hơi, không cháy, chịu nhiệt cao và cửa sổ thế đạt 3.5 V; trở kháng nội tại cao hơn.'
  }
];

// 3. Danh mục So sánh Đồ thị Ragone (Ragone Plot Benchmark)
export const RAGONE_BENCHMARK_CATALOG: RagoneComparisonData[] = [
  {
    deviceTypeVi: 'Tụ Điện Tĩnh Điện Truyền Thống (Electrostatic Capacitor)',
    energyDensityRangeWhKg: [0.01, 0.1],
    powerDensityRangeWKg: [10000, 100000],
    dischargeTimeVi: '10⁻⁶ s đến 10⁻³ s (Micro-giây)',
    cycleLifeVi: '> 10.000.000 chu kỳ',
    typicalApplicationsVi: 'Lọc nhiễu tần số cao, mạch dao động vi điện tử, kích nổ xung laser cực ngắn.'
  },
  {
    deviceTypeVi: 'Siêu Tụ Điện Lớp Kép / Giả Điện Dung (Supercapacitor EDLC / Pseudocapacitor)',
    energyDensityRangeWhKg: [5.0, 35.0],
    powerDensityRangeWKg: [1000, 15000],
    dischargeTimeVi: '0.1 s đến 30 s (Giây)',
    cycleLifeVi: '100.000 đến 1.000.000 chu kỳ',
    typicalApplicationsVi: 'Thu hồi năng lượng phanh tái sinh xe điện (KERS), nâng hạ cần cẩu cảng biển, dự phòng trạm viễn thông UPS.'
  },
  {
    deviceTypeVi: 'Pin Lithium-Ion Năng Lượng (Li-Ion Battery)',
    energyDensityRangeWhKg: [150.0, 280.0],
    powerDensityRangeWKg: [150, 600],
    dischargeTimeVi: '1 giờ đến 5 giờ (Giờ)',
    cycleLifeVi: '1.000 đến 3.000 chu kỳ',
    typicalApplicationsVi: 'Cung cấp năng lượng liên tục cho điện thoại thông minh, laptop, ô tô điện Tesla quãng đường dài.'
  },
  {
    deviceTypeVi: 'Pin Nhiên Liệu Hydro (H₂ Fuel Cell System)',
    energyDensityRangeWhKg: [400.0, 1000.0],
    powerDensityRangeWKg: [50, 200],
    dischargeTimeVi: 'Vài giờ đến vài ngày',
    cycleLifeVi: '10.000 giờ hoạt động',
    typicalApplicationsVi: 'Vận tải tải trọng nặng đường dài (xe buýt, xe tải hạng nặng, tàu thủy không phát thải).'
  }
];

// Helper: Lấy danh mục vật liệu điện cực
export function getElectrodeMaterials(): ElectrodeMaterial[] {
  return ELECTRODE_MATERIALS_CATALOG;
}

// Helper: Lấy danh mục chất điện ly
export function getElectrolyteSystems(): ElectrolyteSystem[] {
  return ELECTROLYTE_CATALOG;
}

// Helper: Lấy danh mục đồ thị Ragone
export function getRagoneBenchmarkCatalog(): RagoneComparisonData[] {
  return RAGONE_BENCHMARK_CATALOG;
}

// Tính toán các thông số điện hóa của Siêu tụ điện
export function calculateSupercapacitorCellMetrics(
  materialId: string,
  electrolyteId: string,
  electrodeMassGrams: number = 10.0
): SupercapacitorCellMetrics {
  const material = ELECTRODE_MATERIALS_CATALOG.find(m => m.id === materialId) || ELECTRODE_MATERIALS_CATALOG[1];
  const electrolyte = ELECTROLYTE_CATALOG.find(e => e.id === electrolyteId) || ELECTROLYTE_CATALOG[2];

  const cellVoltageV = electrolyte.operatingVoltageWindowV;
  // Trong cell đối xứng 2 cực: 2 tụ điện nối tiếp C_cell = (C_el * C_el) / (C_el + C_el) = C_el / 2
  // Với khối lượng mỗi cực là (electrodeMassGrams / 2): C_el = C_spec * (m / 2)
  // Suy ra C_total = (1/4) * C_spec * m
  const totalCapacitanceFarads = (1 / 4) * material.specificCapacitanceFg * electrodeMassGrams;

  // Năng lượng tích trữ E (Joules) = (1/2) * C_cell * V²
  // Chuyển sang Wh/kg: E (Wh) = E (J) / 3600
  // Mật độ năng lượng Wh/kg = (E (Wh) / (electrodeMassGrams / 1000)) = (1/8) * C_spec * V² / 3.6
  const energyDensityWhKg = (1 / 8) * (material.specificCapacitanceFg * Math.pow(cellVoltageV, 2)) / 3.6;

  // ESR của cell tỷ lệ nghịch với diện tích/khối lượng điện cực (R = rho * l / A)
  // Quy chuẩn điện trở riêng diện tích của hệ điện ly (Ohm.g):
  const specificEsrOhmGrams = electrolyte.equivalentSeriesResistanceOhms * 1.5; // Ohm.g
  const totalEsrOhms = specificEsrOhmGrams / electrodeMassGrams;
  const massKg = electrodeMassGrams / 1000.0;
  // Mật độ công suất cực đại (W/kg): P_max = V² / (4 * ESR * mass_kg)
  const maxPowerDensityWKg = Math.pow(cellVoltageV, 2) / (4 * totalEsrOhms * massKg);

  // Thời gian phóng điện điển hình (s)
  const typicalDischargeTimeSeconds = (energyDensityWhKg * 3600) / (maxPowerDensityWKg * 0.4);

  let ragoneClassificationVi = 'Siêu tụ điện xung công suất cao';
  if (energyDensityWhKg >= 25) {
    ragoneClassificationVi = 'Siêu tụ điện mật độ năng lượng cao (Next-Gen High Energy Supercap)';
  } else if (maxPowerDensityWKg >= 8000) {
    ragoneClassificationVi = 'Siêu tụ điện siêu công suất phóng xả tức thời (Ultra-High Power Supercap)';
  }

  return {
    material,
    electrolyte,
    electrodeMassGrams,
    cellVoltageV,
    totalCapacitanceFarads: Math.round(totalCapacitanceFarads * 10) / 10,
    energyDensityWhKg: Math.round(energyDensityWhKg * 100) / 100,
    maxPowerDensityWKg: Math.round(maxPowerDensityWKg),
    typicalDischargeTimeSeconds: Math.round(typicalDischargeTimeSeconds * 100) / 100,
    ragoneClassificationVi
  };
}

// Mô phỏng đường cong Vôn-Ampe tuần hoàn Cyclic Voltammetry (CV)
export function simulateCyclicVoltammetry(
  materialId: string,
  scanRateMvS: number = 20,
  voltageWindowV: number = 1.0
): CyclicVoltammetryPoint[] {
  const material = ELECTRODE_MATERIALS_CATALOG.find(m => m.id === materialId) || ELECTRODE_MATERIALS_CATALOG[1];
  const points: CyclicVoltammetryPoint[] = [];

  const steps = 40;
  const vMin = 0.0;
  const vMax = voltageWindowV;
  const dV = (vMax - vMin) / steps;

  // Tốc độ quét v (V/s)
  const vScan = scanRateMvS / 1000.0;
  // Dòng điện dung thuần I = C * (dV/dt) = C * vScan
  const baseCapacitiveCurrentMa = material.specificCapacitanceFg * vScan * 0.2;

  // Nhánh quét thuận (Anodic forward sweep: 0 -> V_max)
  for (let i = 0; i <= steps; i++) {
    const v = vMin + i * dV;
    let current = baseCapacitiveCurrentMa;

    // Nếu là vật liệu giả điện dung Faradaic: xuất hiện đỉnh oxi hóa thuận
    if (material.mechanism === 'PSEUDOCAPACITIVE_FARADAIC') {
      const peakCenter = vMax * 0.55;
      const peakWidth = 0.15;
      const peakHeight = baseCapacitiveCurrentMa * 1.6;
      current += peakHeight * Math.exp(-Math.pow(v - peakCenter, 2) / (2 * Math.pow(peakWidth, 2)));
    } else if (material.mechanism === 'HYBRID_COMPOSITE') {
      const peakCenter = vMax * 0.45;
      const peakWidth = 0.2;
      const peakHeight = baseCapacitiveCurrentMa * 0.8;
      current += peakHeight * Math.exp(-Math.pow(v - peakCenter, 2) / (2 * Math.pow(peakWidth, 2)));
    }

    // Hiệu ứng điện trở nội ESR làm nghiêng nhẹ đường cong ở hai đầu điện thế
    const esrTilt = (v / vMax - 0.5) * (baseCapacitiveCurrentMa * 0.15);
    points.push({
      potentialV: Math.round(v * 100) / 100,
      currentMa: Math.round((current + esrTilt) * 100) / 100
    });
  }

  // Nhánh quét nghịch (Cathodic reverse sweep: V_max -> 0)
  for (let i = steps; i >= 0; i--) {
    const v = vMin + i * dV;
    let current = -baseCapacitiveCurrentMa;

    // Nếu là vật liệu giả điện dung: xuất hiện đỉnh khử nghịch đối xứng
    if (material.mechanism === 'PSEUDOCAPACITIVE_FARADAIC') {
      const peakCenter = vMax * 0.45;
      const peakWidth = 0.15;
      const peakHeight = baseCapacitiveCurrentMa * 1.5;
      current -= peakHeight * Math.exp(-Math.pow(v - peakCenter, 2) / (2 * Math.pow(peakWidth, 2)));
    } else if (material.mechanism === 'HYBRID_COMPOSITE') {
      const peakCenter = vMax * 0.38;
      const peakWidth = 0.2;
      const peakHeight = baseCapacitiveCurrentMa * 0.75;
      current -= peakHeight * Math.exp(-Math.pow(v - peakCenter, 2) / (2 * Math.pow(peakWidth, 2)));
    }

    const esrTilt = (v / vMax - 0.5) * (baseCapacitiveCurrentMa * 0.15);
    points.push({
      potentialV: Math.round(v * 100) / 100,
      currentMa: Math.round((current + esrTilt) * 100) / 100
    });
  }

  return points;
}

// Mô phỏng chế tạo Khí Gel Graphene qua phương pháp Đông Khô (Ice-Templating Freeze-Drying)
export function simulateGrapheneAerogelFreezeDrying(
  freezingTemperatureCelsius: number = -50,
  goPrecursorMgMl: number = 3.0
): GrapheneAerogelSynthesisResult {
  // Nhiệt độ càng sâu (-80°C đến -20°C): tốc độ đóng băng tinh thể đá càng nhanh -> kích thước lỗ xốp càng nhỏ mịn
  const absTemp = Math.abs(freezingTemperatureCelsius);
  const aerogelDensityMgCm3 = Math.max(1.2, Math.min(8.5, goPrecursorMgMl * 1.15));
  // Độ xốp: Porosity = 1 - (rho_aerogel / rho_graphite), với rho_graphite = 2.2 g/cm³ = 2200 mg/cm³
  const porosityPercent = (1 - aerogelDensityMgCm3 / 2200.0) * 100.0;

  // Độ bền nén cơ học kPa phụ thuộc mật độ và nhiệt độ định hướng mạng rGO
  const compressiveModulusKPa = 15.0 + aerogelDensityMgCm3 * 8.5 + (absTemp / 50.0) * 10.0;

  let poreMorphologyVi = 'Cấu trúc xốp tổ ong liên thông đa chiều (3D Honeycomb)';
  if (freezingTemperatureCelsius <= -60) {
    poreMorphologyVi = 'Cấu trúc mao quản song song định hướng siêu mịn (Oriented Micro-channels)';
  } else if (freezingTemperatureCelsius >= -30) {
    poreMorphologyVi = 'Cấu trúc lỗ xốp ngẫu nhiên dạng phiến lá rộng (Lamellar Macropores)';
  }

  // Độ dẫn ion tương đối qua mạng mao quản (S/cm)
  const ionDiffusionConductivityScm = 0.85 + (porosityPercent / 100.0) * 0.35;

  return {
    freezingTemperatureCelsius,
    goPrecursorMgMl,
    aerogelDensityMgCm3: Math.round(aerogelDensityMgCm3 * 100) / 100,
    porosityPercent: Math.round(porosityPercent * 100) / 100,
    compressiveModulusKPa: Math.round(compressiveModulusKPa * 10) / 10,
    poreMorphologyVi,
    ionDiffusionConductivityScm: Math.round(ionDiffusionConductivityScm * 1000) / 1000
  };
}
