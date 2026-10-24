// src/domain/sodiumIonBatteryEngine.ts
// Domain Engine: Sodium-Ion (Na-ion) Batteries, Prussian Blue Analogues (PBA) & Hard Carbon Anodes
// Standards: IUPAC Electrochemistry, Battery Benchmarks & Vietnam GDPT 2018 (Hóa 10 & 12: Bán kính ion kim loại kiềm, Cấu trúc mạng tinh thể & Pin thứ cấp)

export type NaIonCathodeClass = 'LAYERED_OXIDE_NFM' | 'PRUSSIAN_BLUE_ANALOGUE' | 'POLYANIONIC_NVPF';

export interface NaIonCathodeMaterialSpec {
  id: NaIonCathodeClass;
  nameVi: string;
  chemicalFormula: string;
  crystalStructureVi: string;
  specificCapacityMahG: number;
  averageWorkingVoltageVsNaV: number;
  energyDensityWhKg: number;
  synthesisPrecursorsVi: string;
  rateCapabilityMaxC: number;
  cobaltFreeEcoCompliant: boolean;
  thermalStabilityCelsius: number;
  primaryAdvantagesVi: string;
}

export interface HardCarbonAnodeSpec {
  id: string;
  nameVi: string;
  biomassPrecursorVi: string;
  interlayerSpacingD002Nm: number; // d002 > 0.37 nm (Graphite chỉ có 0.335 nm)
  slopeCapacityMahG: number; // Vùng dốc (adsorption vào khuyết tật)
  plateauCapacityMahG: number; // Vùng thềm (intercalation / pore filling)
  totalReversibleCapacityMahG: number;
  initialCoulombicEfficiencyPercent: number; // ICE (%)
  sodiumPlatingResistanceVi: string;
}

export interface NaIonVsLiIonComparisonResult {
  temperatureCelsius: number;
  naIonCapacityRetentionPercent: number;
  liIonLfpCapacityRetentionPercent: number;
  liIonNmcCapacityRetentionPercent: number;
  naIonDischargeToZeroVoltSafe: boolean;
  liIonDischargeToZeroVoltSafe: boolean;
  anodeCurrentCollectorMaterialVi: string;
  cathodeCurrentCollectorMaterialVi: string;
  copperEliminatedCostSavingPercent: number;
  rawMaterialAbundanceRatioNaVsLi: number; // Na phong phú gấp > 1000 lần Li
}

export interface NaIonDischargeCurvePoint {
  depthOfDischargePercent: number;
  cellVoltageV: number;
  capacityMahG: number;
  anodeStorageRegimeVi: 'SLOPE_DEFECT_ADSORPTION' | 'PLATEAU_INTERCALATION_PORE_FILLING';
}

// 1. Danh mục Vật Liệu Cực Dương (Cathode) Pin Na-ion
export const NA_ION_CATHODES_CATALOG: NaIonCathodeMaterialSpec[] = [
  {
    id: 'LAYERED_OXIDE_NFM',
    nameVi: 'Oxit Lớp Chuyển Tiếp Na(Fe,Mn,Ni)O₂ (O3 / P2 Phase)',
    chemicalFormula: 'Na₀.₉[Fe₀.₅Mn₀.₅]O₂ (hoặc NaNi⅓Fe⅓Mn⅓O₂)',
    crystalStructureVi: 'Cấu trúc xếp lớp bát diện O3/P2 (Layered transition metal oxide)',
    specificCapacityMahG: 145.0,
    averageWorkingVoltageVsNaV: 3.10,
    energyDensityWhKg: 160.0,
    synthesisPrecursorsVi: 'Muối sắt FeSO₄, mangan MnSO₄ và Na₂CO₃ kết tủa đồng thể',
    rateCapabilityMaxC: 5.0,
    cobaltFreeEcoCompliant: true,
    thermalStabilityCelsius: 240,
    primaryAdvantagesVi: 'Mật độ nén khối cao (Volumetric tap density), công nghệ sản xuất tương tự NMC của pin Lithium, nguyên liệu cực rẻ từ Sắt và Mangan.'
  },
  {
    id: 'PRUSSIAN_BLUE_ANALOGUE',
    nameVi: 'Chất Tương Tự Xanh Phổ Khung Lồng Mở (Prussian Blue Analogue - PBA)',
    chemicalFormula: 'Na₂₋ₓFe[Fe(CN)₆] · yH₂O (Sodium Iron Hexacyanoferrate)',
    crystalStructureVi: 'Mạng tinh thể lập phương khung mở 3D (Giant open interstitial cages)',
    specificCapacityMahG: 130.0,
    averageWorkingVoltageVsNaV: 3.35,
    energyDensityWhKg: 155.0,
    synthesisPrecursorsVi: 'Phức chất muối K₄[Fe(CN)₆] và FeCl₂ kết tủa nhiệt độ thấp 60°C',
    rateCapabilityMaxC: 20.0,
    cobaltFreeEcoCompliant: true,
    thermalStabilityCelsius: 280,
    primaryAdvantagesVi: 'Kênh khuếch tán 3D khổng lồ cho phép ion Na⁺ (1.02 Å) di chuyển siêu tốc, hỗ trợ sạc siêu nhanh 10C - 20C (80% pin trong 10 phút), hoàn toàn không chứa niken và coban.'
  },
  {
    id: 'POLYANIONIC_NVPF',
    nameVi: 'Hợp Chất Đa Anion NASICON Huỳnh Quang (Na₃V₂(PO₄)₂F₃ - NVPF)',
    chemicalFormula: 'Na₃V₂(PO₄)₂F₃ (Sodium Vanadium Fluorophosphate)',
    crystalStructureVi: 'Khung cấu trúc siêu dẫn ion natri NASICON 3 chiều bền vững',
    specificCapacityMahG: 128.0,
    averageWorkingVoltageVsNaV: 3.90,
    energyDensityWhKg: 165.0,
    synthesisPrecursorsVi: 'V₂O₅, NaF và NH₄H₂PO₄ tổng hợp thủy nhiệt / gốm nung',
    rateCapabilityMaxC: 15.0,
    cobaltFreeEcoCompliant: true,
    thermalStabilityCelsius: 350,
    primaryAdvantagesVi: 'Điện thế làm việc cực cao (3.9 V) nhờ hiệu ứng cảm ứng điện từ của ion F⁻, tuổi thọ chu kỳ bền bỉ vượt trội (> 6,000 chu kỳ), độ an toàn nhiệt xuất sắc tới 350°C.'
  }
];

// 2. Danh mục Vật Liệu Cực Âm Carbon Cứng (Hard Carbon)
export const HARD_CARBON_ANODES_CATALOG: HardCarbonAnodeSpec[] = [
  {
    id: 'BIOMASS_HARD_CARBON',
    nameVi: 'Carbon Cứng Tái Chế Từ Sinh Khối Nông Nghiệp (Biomass-derived Hard Carbon)',
    biomassPrecursorVi: 'Vỏ trấu lúa gạo, bã mía, vỏ xơ dừa nhiệt phân ở 1200°C',
    interlayerSpacingD002Nm: 0.385, // Rộng hơn nhiều so với graphite (0.335 nm)
    slopeCapacityMahG: 140.0, // Vùng dốc (adsorption)
    plateauCapacityMahG: 190.0, // Vùng thềm (pore-filling)
    totalReversibleCapacityMahG: 330.0,
    initialCoulombicEfficiencyPercent: 88.5,
    sodiumPlatingResistanceVi: 'Khoảng cách giữa các lớp graphene uốn lượn mở rộng (0.385 nm) giúp ion Na⁺ chèn vào dễ dàng mà không bị tróc vảy màng như than chì.'
  },
  {
    id: 'RESIN_HARD_CARBON_PREMIUM',
    nameVi: 'Carbon Cứng Trùng Ngưng Nhựa Phenolic Độ Tinh Khiết Cao',
    biomassPrecursorVi: 'Nhựa phenol-formaldehyde carbon hóa có kiểm soát khoảng trống nano',
    interlayerSpacingD002Nm: 0.378,
    slopeCapacityMahG: 110.0,
    plateauCapacityMahG: 240.0,
    totalReversibleCapacityMahG: 350.0,
    initialCoulombicEfficiencyPercent: 92.0,
    sodiumPlatingResistanceVi: 'Cấu trúc lỗ xốp nano khép kín (closed nanopores) tối ưu hóa khả năng ngưng tụ cụm natri giả mạ (quasi-metallic Na clusters) an toàn.'
  }
];

// Helper: Lấy danh mục cathode
export function getNaIonCathodes(): NaIonCathodeMaterialSpec[] {
  return NA_ION_CATHODES_CATALOG;
}

// Helper: Lấy danh mục hard carbon
export function getHardCarbonAnodes(): HardCarbonAnodeSpec[] {
  return HARD_CARBON_ANODES_CATALOG;
}

// 3. So Sánh Đột Phá Giữa Pin Na-ion và Pin Li-ion (Nhiệt Độ Thấp & An Toàn 0V)
export function compareNaIonVsLiIon(temperatureCelsius: number = -20.0): NaIonVsLiIonComparisonResult {
  // Động học nhiệt độ thấp: Năng lượng giải solvate của ion Na+ nhỏ hơn ion Li+
  // Tại -20°C: Na-ion duy trì ~88% dung lượng, Li-ion LFP rơi xuống ~55%, NMC rơi xuống ~68%
  // Tại -40°C: Na-ion vẫn hoạt động ~70%, Li-ion đông cứng đóng băng < 25%
  let naRet = 100.0;
  let lfpRet = 100.0;
  let nmcRet = 100.0;

  if (temperatureCelsius < 25.0) {
    const deltaT = 25.0 - temperatureCelsius;
    naRet = Math.max(35.0, Math.round((100.0 - deltaT * 0.45) * 10) / 10);
    lfpRet = Math.max(10.0, Math.round((100.0 - deltaT * 1.05) * 10) / 10);
    nmcRet = Math.max(15.0, Math.round((100.0 - deltaT * 0.75) * 10) / 10);
  }

  return {
    temperatureCelsius,
    naIonCapacityRetentionPercent: naRet,
    liIonLfpCapacityRetentionPercent: lfpRet,
    liIonNmcCapacityRetentionPercent: nmcRet,
    naIonDischargeToZeroVoltSafe: true, // Xả về 0V an toàn tuyệt đối
    liIonDischargeToZeroVoltSafe: false, // Li-ion xả < 2.0V làm tan lá đồng cực âm (Cu dissolution) gây chập cháy
    anodeCurrentCollectorMaterialVi: 'Lá Nhôm (Aluminum foil) rẻ tiền, nhẹ cân',
    cathodeCurrentCollectorMaterialVi: 'Lá Nhôm (Aluminum foil)',
    copperEliminatedCostSavingPercent: 8.5, // Tiết kiệm 8.5% giá thành toàn bộ cell nhờ bỏ lá đồng
    rawMaterialAbundanceRatioNaVsLi: 1300 // Natri phong phú gấp 1300 lần Lithi
  };
}

// 4. Tạo Đường Cong Phóng Điện (Slope-Plateau Model) Của Cực Âm Hard Carbon & Full Cell
export function generateHardCarbonDischargeCurve(
  cathodeId: NaIonCathodeClass = 'LAYERED_OXIDE_NFM',
  hardCarbonId: string = 'BIOMASS_HARD_CARBON'
): NaIonDischargeCurvePoint[] {
  const cathode = NA_ION_CATHODES_CATALOG.find(c => c.id === cathodeId) || NA_ION_CATHODES_CATALOG[0];
  const anode = HARD_CARBON_ANODES_CATALOG.find(a => a.id === hardCarbonId) || HARD_CARBON_ANODES_CATALOG[0];

  const points: NaIonDischargeCurvePoint[] = [];
  const steps = 30;

  for (let i = 0; i <= steps; i++) {
    const dodPercent = (i / steps) * 100.0; // 0% (đầy) -> 100% (cạn)
    const capacityDelivered = Math.round((dodPercent / 100.0) * anode.totalReversibleCapacityMahG * 10) / 10;

    // Phân chia 2 vùng lưu trữ của Hard Carbon:
    // Vùng dốc (Slope region): Chiếm khoảng 40% đầu tiên, điện thế cell giảm dốc do hấp phụ khuyết tật
    // Vùng thềm (Plateau region): 60% tiếp theo, điện thế cell đi ngang do chèn lớp và ngưng tụ lỗ xốp
    const isSlope = dodPercent < (anode.slopeCapacityMahG / anode.totalReversibleCapacityMahG) * 100.0;

    let cellVoltage = 0.0;
    if (isSlope) {
      // Vùng dốc: Điện thế cell từ 3.8 V giảm dần về 3.0 V
      const slopeProgress = dodPercent / 40.0;
      cellVoltage = 3.80 - slopeProgress * 0.80;
    } else {
      // Vùng thềm: Điện thế cell duy trì ổn định quanh 2.9 V - 2.6 V
      const plateauProgress = (dodPercent - 40.0) / 60.0;
      cellVoltage = 3.00 - plateauProgress * 0.40 - Math.pow(plateauProgress, 3) * 0.45;
    }

    points.push({
      depthOfDischargePercent: Math.round(dodPercent),
      cellVoltageV: Math.max(1.5, Math.round(cellVoltage * 1000) / 1000),
      capacityMahG: capacityDelivered,
      anodeStorageRegimeVi: isSlope ? 'SLOPE_DEFECT_ADSORPTION' : 'PLATEAU_INTERCALATION_PORE_FILLING'
    });
  }

  return points;
}
