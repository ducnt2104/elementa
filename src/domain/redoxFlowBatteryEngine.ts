// src/domain/redoxFlowBatteryEngine.ts
// Domain Engine: Redox Flow Batteries (VRFB & AORFB) & Long-Duration Energy Storage (LDES)
// Standards: IUPAC Electrochemistry, Grid LDES Benchmarks & Vietnam GDPT 2018 (Hóa 10 & 12: Oxi hóa khử, Điện thế chuẩn & Năng lượng tái tạo)

export type FlowBatteryChemistry = 'ALL_VANADIUM_VRFB' | 'ALL_IRON_FLOW' | 'AQUEOUS_ORGANIC_AQDS' | 'ZINC_BROMINE_HYBRID';

export interface FlowBatteryChemistrySpec {
  id: FlowBatteryChemistry;
  nameVi: string;
  scientificName: string;
  inventorYearVi: string;
  anolyteReactionVi: string;
  catholyteReactionVi: string;
  overallReactionVi: string;
  anolyteE0Volts: number;
  catholyteE0Volts: number;
  nominalCellVoltageVolts: number; // E°_cell
  anolyteActiveSpeciesVi: string;
  catholyteActiveSpeciesVi: string;
  activeSpeciesConcentrationMolar: number; // Nồng độ mol (M)
  membraneTypeVi: string;
  electrodeMaterialVi: string;
  crossContaminationImmunityVi: string;
  roundTripEfficiencyPercent: number; // RTE (%)
  calendarLifeYears: number;
  cycleLifeLimit: number;
  energyDensityWhPerLiter: number;
  levelizedCostOfStorageUsdPerKwh: number; // LCOS ($/kWh-cycle)
  primaryAdvantagesVi: string;
}

export interface FlowBatteryStateOfChargeResult {
  chemistry: FlowBatteryChemistrySpec;
  stateOfChargePercent: number; // SOC (0 - 100%)
  openCircuitVoltageV: number; // V_ocv(SOC)
  anolyteColorHex: string;
  anolyteColorNameVi: string;
  anolyteValenceStateVi: string;
  catholyteColorHex: string;
  catholyteColorNameVi: string;
  catholyteValenceStateVi: string;
}

export interface GridScaleLdesSimulationResult {
  chemistry: FlowBatteryChemistrySpec;
  ratedPowerMw: number; // Công suất danh định (MW)
  dischargeDurationHours: number; // Thời gian xả liên tục (h), e.g. 8h - 16h
  totalStoredEnergyMwh: number; // Tổng năng lượng lưu trữ (MWh)
  anolyteTankVolumeM3: number; // Thể tích bể anolyte (m³)
  catholyteTankVolumeM3: number; // Thể tích bể catholyte (m³)
  totalElectrolyteVolumeLiters: number;
  totalCellCount: number; // Tổng số tế bào trong các stack
  stackCount: number; // Số cụm stack module
  flowRateLitersPerMin: number; // Lưu lượng bơm điện giải
  pumpingParasiticLossKw: number; // Hao phí công suất bơm (kW)
  netDischargePowerMw: number;
  roundTripEfficiencyPercent: number;
  estimatedFootprintM2: number; // Diện tích đất trạm lưu trữ (m²)
  capexMillionUsd: number; // Vốn đầu tư ban đầu ($M)
}

// 1. Danh mục Hóa Học Pin Dòng Oxi Hóa Khử
export const FLOW_BATTERY_CHEMISTRIES_CATALOG: FlowBatteryChemistrySpec[] = [
  {
    id: 'ALL_VANADIUM_VRFB',
    nameVi: 'Pin Dòng Toàn Vanadi (VRFB - Maria Skyllas-Kazacos 1985)',
    scientificName: 'All-Vanadium Redox Flow Battery',
    inventorYearVi: 'Phát minh bởi GS. Maria Skyllas-Kazacos (ĐH New South Wales, 1985)',
    anolyteReactionVi: 'V³⁺ + e⁻ ⇌ V²⁺ (E° = -0.26 V vs SHE, Đổi màu Xanh lục ⇌ Tím)',
    catholyteReactionVi: 'VO²⁺ + H₂O ⇌ VO₂⁺ + 2H⁺ + e⁻ (E° = +1.00 V vs SHE, Xanh lam ⇌ Vàng chanh)',
    overallReactionVi: 'V³⁺ + VO²⁺ + H₂O ⇌ V²⁺ + VO₂⁺ + 2H⁺ (E° = 1.26 V)',
    anolyteE0Volts: -0.26,
    catholyteE0Volts: 1.00,
    nominalCellVoltageVolts: 1.26,
    anolyteActiveSpeciesVi: 'Cặp V(II)/V(III) hòa tan trong H₂SO₄ 2.5 M',
    catholyteActiveSpeciesVi: 'Cặp V(IV)/V(V) hòa tan trong H₂SO₄ 2.5 M',
    activeSpeciesConcentrationMolar: 2.0,
    membraneTypeVi: 'Màng trao đổi cation chọn lọc proton (Nafion 117 hoặc SPEEK hydrocarbon)',
    electrodeMaterialVi: 'Nỉ carbon hoạt hóa nhiệt diện tích bề mặt lớn (Thermal activated carbon felt)',
    crossContaminationImmunityVi: 'Miễn nhiễm thoái hóa chéo vĩnh viễn: Vì cả 2 buồng đều dùng nguyên tố Vanadi, ion thẩm thấu qua màng chỉ gây tự phóng điện nhẹ và hồi phục 100% bằng cách xáo trộn hoàn nguyên điện giải.',
    roundTripEfficiencyPercent: 78.5,
    calendarLifeYears: 25,
    cycleLifeLimit: 20000,
    energyDensityWhPerLiter: 30.0,
    levelizedCostOfStorageUsdPerKwh: 0.055,
    primaryAdvantagesVi: 'Tách rời hoàn toàn Công suất (MW) và Năng lượng (MWh); không nguy cơ cháy nổ nhiệt (nước chiếm >70%); tuổi thọ trên 20 năm không suy giảm dung lượng.'
  },
  {
    id: 'ALL_IRON_FLOW',
    nameVi: 'Pin Dòng Toàn Sắt Giá Rẻ (All-Iron Flow Battery - ESS Inc)',
    scientificName: 'All-Iron Redox Flow Battery (Fe-Fe)',
    inventorYearVi: 'Hylton & Giles (1981), thương mại hóa bởi ESS Inc (Energy Warehouse)',
    anolyteReactionVi: 'Fe²⁺ + 2e⁻ ⇌ Fe⁰ (E° = -0.44 V vs SHE, Mạ / Hòa tan sắt rắn)',
    catholyteReactionVi: '2Fe²⁺ ⇌ 2Fe³⁺ + 2e⁻ (E° = +0.77 V vs SHE)',
    overallReactionVi: '3Fe²⁺ ⇌ Fe⁰ + 2Fe³⁺ (E° = 1.21 V)',
    anolyteE0Volts: -0.44,
    catholyteE0Volts: 0.77,
    nominalCellVoltageVolts: 1.21,
    anolyteActiveSpeciesVi: 'Muối Sắt(II) Clorua FeCl₂ trong nước, pH 1.5 - 2.5',
    catholyteActiveSpeciesVi: 'Cặp Fe(II)/Fe(III) Clorua trong dung môi nước',
    activeSpeciesConcentrationMolar: 2.5,
    membraneTypeVi: 'Màng vi xốp polyethylene giá rẻ không cần fluoropolymer',
    electrodeMaterialVi: 'Tấm graphite phủ lớp mầm nucleate sắt chống gai dendrite',
    crossContaminationImmunityVi: 'Cực kỳ kinh tế: Hoạt chất là kim loại sắt Fe và muối ăn, sẵn có bậc nhất vỏ Trái Đất, an toàn sinh thái 100%.',
    roundTripEfficiencyPercent: 71.0,
    calendarLifeYears: 25,
    cycleLifeLimit: 20000,
    energyDensityWhPerLiter: 22.0,
    levelizedCostOfStorageUsdPerKwh: 0.038,
    primaryAdvantagesVi: 'Chi phí hóa chất cực rẻ (< 25 USD/kWh), vật liệu phi độc hại, không phụ thuộc chuỗi cung ứng đất hiếm hay kim loại chiến lược.'
  },
  {
    id: 'AQUEOUS_ORGANIC_AQDS',
    nameVi: 'Pin Dòng Hữu Cơ AQDS Không Kim Loại (Harvard Michael Aziz 2014)',
    scientificName: 'Aqueous Organic Redox Flow Battery (AORFB)',
    inventorYearVi: 'GS. Michael Aziz & Roy Gordon (Đại học Harvard, 2014 Nature)',
    anolyteReactionVi: 'AQDS + 2H⁺ + 2e⁻ ⇌ H₂AQDS (E° = +0.21 V vs SHE, Khử 2 electron nhanh)',
    catholyteReactionVi: '2[Fe(CN)₆]⁴⁻ ⇌ 2[Fe(CN)₆]³⁻ + 2e⁻ (E° = +0.48 V vs SHE)',
    overallReactionVi: 'AQDS + 2H⁺ + 2[Fe(CN)₆]⁴⁻ ⇌ H₂AQDS + 2[Fe(CN)₆]³⁻ (E° = 0.27 - 0.85 V)',
    anolyteE0Volts: 0.21,
    catholyteE0Volts: 0.48,
    nominalCellVoltageVolts: 0.85,
    anolyteActiveSpeciesVi: 'Anthraquinone-2,7-disulfonic acid (AQDS) nguồn gốc từ đại hoàng / than đá',
    catholyteActiveSpeciesVi: 'Muối Kali Ferrocyanide K₄[Fe(CN)₆] (Phụ gia thực phẩm an toàn)',
    activeSpeciesConcentrationMolar: 1.5,
    membraneTypeVi: 'Màng trao đổi anion hoặc cation sulfonated polysulfone',
    electrodeMaterialVi: 'Giấy carbon biến tính hydrophilicity oxy hóa acid',
    crossContaminationImmunityVi: 'Thân thiện sinh thái tuyệt đối: Không kim loại nặng độc hại, dung dịch trung tính hoặc acid nhẹ, có thể phân hủy sinh học.',
    roundTripEfficiencyPercent: 74.0,
    calendarLifeYears: 15,
    cycleLifeLimit: 12000,
    energyDensityWhPerLiter: 18.0,
    levelizedCostOfStorageUsdPerKwh: 0.045,
    primaryAdvantagesVi: 'Hóa chất hữu cơ tổng hợp quy mô lớn từ carbon và lưu huỳnh, an toàn chống rò rỉ hóa chất tuyệt đối cho các tòa nhà và khu dân cư đô thị.'
  },
  {
    id: 'ZINC_BROMINE_HYBRID',
    nameVi: 'Pin Dòng Kẽm - Brom Lai (Zn-Br₂ Flow Battery)',
    scientificName: 'Zinc-Bromine Hybrid Redox Flow Battery',
    inventorYearVi: 'Phát triển bởi Exxon (1970s), Redflow / Gelion',
    anolyteReactionVi: 'Zn²⁺ + 2e⁻ ⇌ Zn⁰ (E° = -0.76 V vs SHE, Mạ kẽm trên điện cực)',
    catholyteReactionVi: '2Br⁻ ⇌ Br₂ + 2e⁻ (E° = +1.09 V vs SHE, Bromine tạo phức pha dầu)',
    overallReactionVi: 'Zn²⁺ + 2Br⁻ ⇌ Zn + Br₂ (E° = 1.85 V)',
    anolyteE0Volts: -0.76,
    catholyteE0Volts: 1.09,
    nominalCellVoltageVolts: 1.85,
    anolyteActiveSpeciesVi: 'Muối Kẽm Bromua ZnBr₂ hòa tan 3 M trong nước',
    catholyteActiveSpeciesVi: 'Br₂ tự do kết hợp chất tạo phức muối amoni bậc 4 (MEM/MEP-Br) tạo pha dầu nặng lắng đáy bể',
    activeSpeciesConcentrationMolar: 3.0,
    membraneTypeVi: 'Màng vi xốp separator Daramic silica-polyethylene',
    electrodeMaterialVi: 'Nhựa dẫn điện carbon composite đúc ép',
    crossContaminationImmunityVi: 'Mật độ năng lượng cao gấp đôi pin vanadi nhờ điện thế danh định 1.85 V.',
    roundTripEfficiencyPercent: 72.0,
    calendarLifeYears: 15,
    cycleLifeLimit: 8000,
    energyDensityWhPerLiter: 70.0,
    levelizedCostOfStorageUsdPerKwh: 0.060,
    primaryAdvantagesVi: 'Điện thế tế bào cao nhất trong các dòng pin nước (1.85 V), mật độ năng lượng đạt tới 70 Wh/L, kích thước bể chứa nhỏ gọn hơn.'
  }
];

// Helper: Lấy danh mục pin dòng
export function getFlowBatteryChemistries(): FlowBatteryChemistrySpec[] {
  return FLOW_BATTERY_CHEMISTRIES_CATALOG;
}

// 2. Tính toán Trạng Thái Nạp SOC & Điện Thế Hở Mạch V_OCV Nernst
export function calculateFlowBatterySoc(
  chemistryId: FlowBatteryChemistry = 'ALL_VANADIUM_VRFB',
  socPercent: number = 50.0, // 0 - 100%
  temperatureCelsius: number = 25.0
): FlowBatteryStateOfChargeResult {
  const chem = FLOW_BATTERY_CHEMISTRIES_CATALOG.find(c => c.id === chemistryId) || FLOW_BATTERY_CHEMISTRIES_CATALOG[0];
  const clampedSoc = Math.max(1.0, Math.min(99.0, socPercent)); // Tránh cực điểm logarit 0 và 1
  const socRatio = clampedSoc / 100.0;

  const tempK = temperatureCelsius + 273.15;
  const R = 8.314;
  const F = 96485.33;

  // Phương trình Nernst cho VRFB:
  // V_ocv(SOC) = E°_cell + (2 * R * T / F) * ln(SOC / (1 - SOC))
  const nernstFactor = (2.0 * R * tempK) / F;
  const ocvOffset = nernstFactor * Math.log(socRatio / (1.0 - socRatio));
  const openCircuitVoltageV = Math.round((chem.nominalCellVoltageVolts + ocvOffset) * 1000) / 1000;

  // Đặc trưng quang học màu sắc theo trạng thái oxy hóa Vanadi
  let anolyteColorHex = '#7e22ce'; // Tím V2+ khi nạp đầy (SOC 100%)
  let anolyteColorNameVi = 'Tím thẫm (V²⁺)';
  let anolyteValenceStateVi = 'V²⁺ (Vanadi II khử)';
  let catholyteColorHex = '#eab308'; // Vàng chanh VO2+ khi nạp đầy
  let catholyteColorNameVi = 'Vàng chanh sáng (VO₂⁺)';
  let catholyteValenceStateVi = 'VO₂⁺ (Vanadi V oxi hóa)';

  if (chemistryId === 'ALL_VANADIUM_VRFB') {
    if (socRatio < 0.25) {
      anolyteColorHex = '#15803d'; // Xanh lá V3+
      anolyteColorNameVi = 'Xanh lục lá cây (V³⁺ nghèo điện)';
      anolyteValenceStateVi = 'V³⁺ (Vanadi III)';
      catholyteColorHex = '#0284c7'; // Xanh lam VO2+
      catholyteColorNameVi = 'Xanh lam đậm (VO²⁺ nghèo điện)';
      catholyteValenceStateVi = 'VO²⁺ (Vanadi IV)';
    } else if (socRatio < 0.7) {
      anolyteColorHex = '#4c1d95'; // Hỗn hợp V2+/V3+
      anolyteColorNameVi = 'Tím ánh lục (Hỗn hợp V²⁺/V³⁺)';
      anolyteValenceStateVi = 'V²⁺/V³⁺';
      catholyteColorHex = '#0d9488'; // Xanh ngọc hỗn hợp VO2+/VO2+
      catholyteColorNameVi = 'Xanh ngọc lục bảo (Hỗn hợp VO²⁺/VO₂⁺)';
      catholyteValenceStateVi = 'VO²⁺/VO₂⁺';
    }
  } else if (chemistryId === 'ALL_IRON_FLOW') {
    anolyteColorHex = '#64748b';
    anolyteColorNameVi = 'Xám mờ (Fe²⁺/Fe⁰)';
    anolyteValenceStateVi = 'Fe²⁺ / Fe⁰';
    catholyteColorHex = socRatio > 0.5 ? '#b45309' : '#16a34a';
    catholyteColorNameVi = socRatio > 0.5 ? 'Nâu đỏ gỉ sắt (Fe³⁺)' : 'Xanh rêu nhạt (Fe²⁺)';
    catholyteValenceStateVi = socRatio > 0.5 ? 'Fe³⁺' : 'Fe²⁺';
  } else if (chemistryId === 'AQUEOUS_ORGANIC_AQDS') {
    anolyteColorHex = socRatio > 0.5 ? '#f97316' : '#78350f';
    anolyteColorNameVi = socRatio > 0.5 ? 'Cam sáng (H₂AQDS khử)' : 'Nâu sẫm (AQDS oxi hóa)';
    anolyteValenceStateVi = 'H₂AQDS';
    catholyteColorHex = socRatio > 0.5 ? '#facc15' : '#ca8a04';
    catholyteColorNameVi = 'Vàng nhạt ([Fe(CN)₆]³⁻)';
    catholyteValenceStateVi = '[Fe(CN)₆]³⁻';
  } else if (chemistryId === 'ZINC_BROMINE_HYBRID') {
    anolyteColorHex = '#cbd5e1';
    anolyteColorNameVi = 'Trắng đục kẽm (Zn²⁺)';
    anolyteValenceStateVi = 'Zn²⁺';
    catholyteColorHex = socRatio > 0.5 ? '#7f1d1d' : '#f59e0b';
    catholyteColorNameVi = socRatio > 0.5 ? 'Đỏ nâu dầu đặc (Br₂ phức)' : 'Vàng hổ phách (Br⁻)';
    catholyteValenceStateVi = 'Br₂/Br⁻';
  }

  return {
    chemistry: chem,
    stateOfChargePercent: Math.round(socRatio * 100),
    openCircuitVoltageV,
    anolyteColorHex,
    anolyteColorNameVi,
    anolyteValenceStateVi,
    catholyteColorHex,
    catholyteColorNameVi,
    catholyteValenceStateVi
  };
}

// 3. Mô Phỏng Trạm Lưu Trữ Năng Lượng Lưới Điện Dài Hạn (Grid-Scale LDES Simulator)
export function simulateGridScaleLdesStation(
  chemistryId: FlowBatteryChemistry = 'ALL_VANADIUM_VRFB',
  ratedPowerMw: number = 10.0, // 10 MW công suất
  dischargeDurationHours: number = 8.0 // 8 giờ lưu trữ -> 80 MWh
): GridScaleLdesSimulationResult {
  const chem = FLOW_BATTERY_CHEMISTRIES_CATALOG.find(c => c.id === chemistryId) || FLOW_BATTERY_CHEMISTRIES_CATALOG[0];
  const totalStoredEnergyMwh = Math.round(ratedPowerMw * dischargeDurationHours * 10) / 10;

  // Tính thể tích dung dịch điện giải cần thiết:
  // E (Wh) = EnergyDensity (Wh/L) * Volume (L)
  // Tổng thể tích 2 bể anolyte + catholyte
  const totalElectrolyteLiters = (totalStoredEnergyMwh * 1e6) / chem.energyDensityWhPerLiter;
  const singleTankLiters = totalElectrolyteLiters / 2.0;
  const anolyteTankVolumeM3 = Math.round(singleTankLiters / 1000.0);
  const catholyteTankVolumeM3 = anolyteTankVolumeM3;

  // Thiết kế cụm Stack:
  // Mỗi cell diện tích 1000 cm² (0.1 m²), vận hành ở mật độ dòng J = 0.15 A/cm² -> I = 150 A
  // Điện thế mỗi cell khi xả ~ 1.15 V -> Công suất 1 cell = 1.15 * 150 = 172.5 W = 0.1725 kW
  // Mỗi stack module gồm 40 cells nối tiếp -> V_stack = 46 V, P_stack = 6.9 kW
  const cellPowerKw = 0.1725;
  const totalCellCount = Math.round((ratedPowerMw * 1000.0) / cellPowerKw);
  const cellsPerStack = 40;
  const stackCount = Math.ceil(totalCellCount / cellsPerStack);

  // Thủy lực học: Lưu lượng bơm điện giải
  // Tỷ lệ dòng stoichiometry ~ 4.0 để tránh phân cực nồng độ
  // Q (L/min) = (I_total * 60) / (n * F * c * deltaSOC)
  const totalAmps = stackCount * 150.0;
  const flowRateLitersPerMin = Math.round((totalAmps * 60.0 * 4.0) / (96485 * chem.activeSpeciesConcentrationMolar * 0.8));

  // Tổn thất công suất bơm tuần hoàn: Delta P ~ 1.5 bar (150 kPa) qua nỉ carbon
  // P_pump = (Q * DeltaP) / eta_pump (kW)
  const qM3PerSec = flowRateLitersPerMin / (60.0 * 1000.0);
  const deltaP = 150000; // Pa
  const pumpEfficiency = 0.70;
  const pumpingParasiticLossKw = Math.round(((qM3PerSec * deltaP) / pumpEfficiency) / 1000.0);

  const netDischargePowerMw = Math.round((ratedPowerMw - pumpingParasiticLossKw / 1000.0) * 100) / 100;

  // Hiệu suất chu trình Round-Trip Efficiency có tính hao phí bơm
  const roundTripEfficiencyPercent = Math.round((chem.roundTripEfficiencyPercent - (pumpingParasiticLossKw / (ratedPowerMw * 1000.0)) * 100) * 10) / 10;

  // Diện tích mặt bằng trạm LDES: Bể chứa + nhà stack + trạm biến áp
  // 1 m³ bể ~ 1.2 m² diện tích + 40% hành lang kỹ thuật
  const estimatedFootprintM2 = Math.round((anolyteTankVolumeM3 + catholyteTankVolumeM3) * 1.5 + stackCount * 2.5 + 200.0);

  // Chi phí vốn đầu tư Capex ($M):
  // Stack: ~ $400/kW; Electrolyte & Tanks: ~ $120/kWh; BoP & EPC: ~ $80/kWh
  const stackCostUsd = ratedPowerMw * 1000.0 * 400.0;
  const electrolyteTanksCostUsd = totalStoredEnergyMwh * 1000.0 * 120.0;
  const bopCostUsd = totalStoredEnergyMwh * 1000.0 * 80.0;
  const capexMillionUsd = Math.round(((stackCostUsd + electrolyteTanksCostUsd + bopCostUsd) / 1e6) * 10) / 10;

  return {
    chemistry: chem,
    ratedPowerMw,
    dischargeDurationHours,
    totalStoredEnergyMwh,
    anolyteTankVolumeM3,
    catholyteTankVolumeM3,
    totalElectrolyteVolumeLiters: Math.round(totalElectrolyteLiters),
    totalCellCount,
    stackCount,
    flowRateLitersPerMin,
    pumpingParasiticLossKw,
    netDischargePowerMw,
    roundTripEfficiencyPercent,
    estimatedFootprintM2,
    capexMillionUsd
  };
}
