// src/domain/microbialFuelCellEngine.ts
// Domain Engine: Bioelectrochemical Microbial Fuel Cells (MFCs) & Extracellular Electron Transfer (EET)
// Standards: IUPAC Bioelectrochemistry, QCVN 40:2011/BTNMT (Wastewater COD) & Vietnam GDPT 2018 (Hóa sinh, Điện hóa học & Môi trường)

export type EetTransferMechanism = 'DIRECT_CYTOCHROME' | 'MICROBIAL_NANOWIRES_PILI' | 'SOLUBLE_FLAVIN_SHUTTLE' | 'SYNTHETIC_CONSORTIUM';

export interface ExoelectrogenSpecies {
  id: string;
  nameVi: string;
  scientificName: string;
  transferMechanism: EetTransferMechanism;
  mechanismNameVi: string;
  electronCarriersVi: string; // e.g. Cytochrome OmcZ/OmcS, PilA nanowires, Riboflavin
  biofilmConductivityScm: number; // Độ dẫn điện màng sinh học (S/cm)
  maxCurrentDensityAm2: number; // Mật độ dòng điện cực đại (A/m²)
  optimalPh: number;
  optimalTemperatureCelsius: number;
  anaerobicRequirementVi: string;
  advantagesVi: string;
}

export interface MfcReactorConfiguration {
  id: string;
  nameVi: string;
  chamberType: 'DUAL_CHAMBER_CEM' | 'SINGLE_CHAMBER_AIR_CATHODE';
  chamberNameVi: string;
  membraneSeparatorVi: string; // Cation Exchange Membrane (Nafion 117) hoặc Không màng
  anodeMaterialVi: string; // Chổi sợi carbon (Carbon fiber brush) / Carbon felt
  cathodeCatalystVi: string; // Pt/C hoặc Fe-N-C phi kim loại
  nominalOcvVolts: number; // Điện thế hở mạch danh định V_OCV (V)
  nominalInternalResistanceOhms: number; // Trở kháng nội R_int (Ω)
  typicalAnodeSurfaceAreaM2: number; // Diện tích bề mặt anode (m²)
  reactorVolumeLiters: number;
  advantagesVi: string;
}

export interface WastewaterRemediationResult {
  reactor: MfcReactorConfiguration;
  microbe: ExoelectrogenSpecies;
  influentCodMgL: number; // Nồng độ COD đầu vào (mg/L)
  effluentCodMgL: number; // Nồng độ COD sau xử lý (mg/L)
  codRemovalEfficiencyPercent: number; // % loại bỏ COD
  coulombicEfficiencyPercent: number; // Hiệu suất Coulombic CE (%)
  operatingCellVoltageV: number; // Hiệu điện thế hoạt động trên tải V_cell (V)
  operatingCurrentMa: number; // Dòng điện tế bào (mA)
  powerDensityMilliWm2: number; // Mật độ công suất (mW/m²)
  meetsQcvn40ColumnA: boolean; // Đạt QCVN 40:2011/BTNMT Cột A (COD < 75 mg/L)
  remediationVerdictVi: string;
}

export interface PolarizationDataPoint {
  currentDensityMaM2: number;
  cellVoltageV: number;
  powerDensityMilliWm2: number;
}

// 1. Danh mục Vi khuẩn Điện sinh học (Exoelectrogens)
export const EXOELECTROGENS_CATALOG: ExoelectrogenSpecies[] = [
  {
    id: 'GEOBACTER_SULFURREDUCENS',
    nameVi: 'Vi Khuẩn Dây Nano Geobacter (G. sulfurreducens)',
    scientificName: 'Geobacter sulfurreducens',
    transferMechanism: 'MICROBIAL_NANOWIRES_PILI',
    mechanismNameVi: 'Dây Nano Sinh Học (e-pili) & Cytochrome OmcZ',
    electronCarriersVi: 'Sợi protein PilA dẫn điện kim loại + Cytochrome đa nhân hem OmcZ',
    biofilmConductivityScm: 0.0055,
    maxCurrentDensityAm2: 2.8,
    optimalPh: 7.0,
    optimalTemperatureCelsius: 30,
    anaerobicRequirementVi: 'Kỵ khí tuyệt đối (Bị ức chế hoàn toàn bởi O₂)',
    advantagesVi: 'Khả năng tạo màng sinh học dẫn điện dày (> 50 µm), dẫn truyền electron trực tiếp khoảng cách xa tới cực anode graphite không cần chất trung gian.'
  },
  {
    id: 'SHEWANELLA_ONEIDENSIS',
    nameVi: 'Vi Khuẩn Con Thoi Shewanella (S. oneidensis MR-1)',
    scientificName: 'Shewanella oneidensis MR-1',
    transferMechanism: 'SOLUBLE_FLAVIN_SHUTTLE',
    mechanismNameVi: 'Chất Con Thoi Khử Hòa Tan (Flavin Mediators) & MtrCAB',
    electronCarriersVi: 'Phức hệ màng ngoài MtrC-MtrA-MtrB + Riboflavin / FMN tự tiết',
    biofilmConductivityScm: 0.0012,
    maxCurrentDensityAm2: 1.6,
    optimalPh: 7.2,
    optimalTemperatureCelsius: 30,
    anaerobicRequirementVi: 'Kỵ khí tùy ý (Sống được cả trong môi trường có oxy nhẹ)',
    advantagesVi: 'Rất linh hoạt, chịu đựng được oxy hòa tan nhẹ, tự tiết chất con thoi riboflavin hòa tan giúp khuếch tán electron tới ngóc ngách của điện cực xốp.'
  },
  {
    id: 'PSEUDOMONAS_AERUGINOSA',
    nameVi: 'Trực Khuẩn Mủ Xanh Tiết Phenazine (P. aeruginosa)',
    scientificName: 'Pseudomonas aeruginosa',
    transferMechanism: 'SOLUBLE_FLAVIN_SHUTTLE',
    mechanismNameVi: 'Chất Màu Hòa Tan Phenazine (Pyocyanin / PCA)',
    electronCarriersVi: 'Pyocyanin và Axit Phenazine-1-carboxylic (PCA)',
    biofilmConductivityScm: 0.0008,
    maxCurrentDensityAm2: 0.95,
    optimalPh: 7.4,
    optimalTemperatureCelsius: 37,
    anaerobicRequirementVi: 'Hiếu khí / Kỵ khí linh hoạt',
    advantagesVi: 'Chuyển hóa được nhiều loại độc chất thơm, dầu mỡ khó phân hủy, chất con thoi phenazine rất bền hóa học.'
  },
  {
    id: 'ANAEROBIC_MUNICIPAL_CONSORTIUM',
    nameVi: 'Quần Thể Vi Sinh Bùn Kỵ Khí Hỗn Hợp (Municipal Sludge Consortium)',
    scientificName: 'Mixed Electroactive Biofilm Consortium',
    transferMechanism: 'SYNTHETIC_CONSORTIUM',
    mechanismNameVi: 'Cộng Sinh Đa Loài (Syntrophic Consortium)',
    electronCarriersVi: 'Cộng sinh lên men (Clostridium) phân giải đường + Geobacter chuyển điện tích',
    biofilmConductivityScm: 0.0035,
    maxCurrentDensityAm2: 2.2,
    optimalPh: 6.8,
    optimalTemperatureCelsius: 32,
    anaerobicRequirementVi: 'Kỵ khí thích nghi nước thải',
    advantagesVi: 'Thích ứng tuyệt vời với nước thải đô thị và công nghiệp thực tế đa thành phần, khả năng chống sốc tải ô nhiễm cao.'
  }
];

// 2. Danh mục Cấu Hình Buồng Phản Ứng MFC
export const MFC_REACTORS_CATALOG: MfcReactorConfiguration[] = [
  {
    id: 'SINGLE_CHAMBER_AIR_CATHODE',
    nameVi: 'MFC Một Buồng Catot Không Khí Tự Do (Air-Cathode MFC)',
    chamberType: 'SINGLE_CHAMBER_AIR_CATHODE',
    chamberNameVi: 'Một Buồng Không Màng (Air-Cathode Membrane-less)',
    membraneSeparatorVi: 'Màng lọc khuếch tán khí PTFE (Không cần màng trao đổi proton Nafion)',
    anodeMaterialVi: 'Chổi sợi carbon 3D diện tích cao (Carbon fiber brush)',
    cathodeCatalystVi: 'Chất xúc tác Fe-N-C phi kim loại kết hợp lớp chống thấm PTFE',
    nominalOcvVolts: 0.80,
    nominalInternalResistanceOhms: 18.0,
    typicalAnodeSurfaceAreaM2: 0.02, // 200 cm²
    reactorVolumeLiters: 1.0,
    advantagesVi: 'Không cần sục khí nhân tạo tốn điện ở catot (hấp thụ O₂ trực tiếp từ không khí), không nghẽn màng, chi phí thấp thích hợp xử lý nước thải quy mô lớn.'
  },
  {
    id: 'DUAL_CHAMBER_NAFION',
    nameVi: 'MFC Hai Buồng Truyền Thống Có Màng Trao Đổi Cation (Nafion 117)',
    chamberType: 'DUAL_CHAMBER_CEM',
    chamberNameVi: 'Hai Buồng Ngăn Cách Bởi Màng Cation (Dual-Chamber Nafion CEM)',
    membraneSeparatorVi: 'Màng trao đổi cation Nafion 117 chọn lọc H⁺',
    anodeMaterialVi: 'Nỉ carbon hoạt hóa axit (Acid-treated carbon felt)',
    cathodeCatalystVi: 'Muối Ferricyanide K₃[Fe(CN)₆] hoặc Platin Pt/C sục khí O₂',
    nominalOcvVolts: 0.85,
    nominalInternalResistanceOhms: 65.0,
    typicalAnodeSurfaceAreaM2: 0.02, // 200 cm²
    reactorVolumeLiters: 0.8,
    advantagesVi: 'Độ tinh khiết cao, kiểm soát độc lập 2 buồng anốt và catốt, thích hợp nghiên cứu động học vi sinh và điện hóa học chính xác.'
  }
];

// Helper: Lấy danh mục vi sinh vật
export function getExoelectrogens(): ExoelectrogenSpecies[] {
  return EXOELECTROGENS_CATALOG;
}

// Helper: Lấy danh mục buồng phản ứng
export function getMfcReactors(): MfcReactorConfiguration[] {
  return MFC_REACTORS_CATALOG;
}

// 3. Mô phỏng Xử lý Nước Thải & Sản Sinh Điện Năng MFC
export function simulateWastewaterMfc(
  reactorId: string,
  microbeId: string,
  influentCodMgL: number = 800.0, // Nước thải sinh hoạt/thực phẩm 800 mg/L COD
  hydraulicRetentionTimeHours: number = 24.0, // Thời gian lưu nước HRT 24h
  externalResistanceOhms: number = 100.0 // Tải ngoài 100 Ω
): WastewaterRemediationResult {
  const reactor = MFC_REACTORS_CATALOG.find(r => r.id === reactorId) || MFC_REACTORS_CATALOG[0];
  const microbe = EXOELECTROGENS_CATALOG.find(m => m.id === microbeId) || EXOELECTROGENS_CATALOG[0];

  // Tốc độ phân hủy COD phụ thuộc vi sinh vật và thời gian lưu HRT
  // Động học bậc 1: COD_out = COD_in * exp(-k * HRT)
  const kineticConstantK = 0.105 * (microbe.biofilmConductivityScm / 0.0035);
  const effluentCodRaw = influentCodMgL * Math.exp(-kineticConstantK * hydraulicRetentionTimeHours);
  const effluentCodMgL = Math.max(25.0, Math.round(effluentCodRaw * 10) / 10);
  const deltaCodMgL = influentCodMgL - effluentCodMgL;
  const codRemovalEfficiencyPercent = Math.round((deltaCodMgL / influentCodMgL) * 1000) / 10;

  // Hiệu điện thế hoạt động của cell: V_cell = V_OCV * (R_ext / (R_ext + R_int))
  const totalResistance = externalResistanceOhms + reactor.nominalInternalResistanceOhms;
  const operatingCellVoltageV = Math.round((reactor.nominalOcvVolts * (externalResistanceOhms / totalResistance)) * 1000) / 1000;

  // Dòng điện I = V_cell / R_ext (A) -> mA
  const operatingCurrentA = operatingCellVoltageV / externalResistanceOhms;
  const operatingCurrentMa = Math.round(operatingCurrentA * 1000.0 * 10) / 10;

  // Mật độ công suất P = (I * V) / Area (mW/m²)
  const powerWatts = operatingCellVoltageV * operatingCurrentA;
  const powerDensityMilliWm2 = Math.round((powerWatts / reactor.typicalAnodeSurfaceAreaM2) * 1000.0 * 10) / 10;

  // Hiệu suất Coulombic CE (%): tỷ lệ electron chuyển thành dòng điện so với tổng COD tiêu thụ
  // CE = (8 * I * t) / (F * b * V * deltaCOD)
  // Thực tế đối với Geobacter ~ 25 - 55%, Shewanella ~ 15 - 35%
  let baseCe = 38.0;
  if (microbe.id === 'GEOBACTER_SULFURREDUCENS') baseCe = 48.5;
  else if (microbe.id === 'SHEWANELLA_ONEIDENSIS') baseCe = 28.0;
  else if (microbe.id === 'PSEUDOMONAS_AERUGINOSA') baseCe = 18.5;

  const coulombicEfficiencyPercent = Math.min(65.0, Math.round(baseCe * (operatingCellVoltageV / 0.45) * 10) / 10);

  // Đánh giá quy chuẩn xả thải QCVN 40:2011/BTNMT Cột A (COD <= 75 mg/L)
  const meetsQcvn40ColumnA = effluentCodMgL <= 75.0;

  let remediationVerdictVi = 'ĐẠT CHUẨN XẢ THẢI QCVN 40 CỘT A (Nước sạch xả ra nguồn tiếp nhận sinh hoạt)';
  if (!meetsQcvn40ColumnA) {
    if (effluentCodMgL <= 150.0) {
      remediationVerdictVi = 'ĐẠT CHUẨN QCVN 40 CỘT B (Cần thời gian lưu HRT dài hơn để đạt Cột A)';
    } else {
      remediationVerdictVi = 'CHƯA ĐẠT CHUẨN XẢ THẢI (Nước thải ô nhiễm cao, cần tăng diện tích anode biofilm)';
    }
  }

  return {
    reactor,
    microbe,
    influentCodMgL,
    effluentCodMgL,
    codRemovalEfficiencyPercent,
    coulombicEfficiencyPercent,
    operatingCellVoltageV,
    operatingCurrentMa,
    powerDensityMilliWm2,
    meetsQcvn40ColumnA,
    remediationVerdictVi
  };
}

// 4. Tạo đường cong phân cực (Polarization Curve: V vs I và P vs I)
export function generateMfcPolarizationCurve(
  reactorId: string,
  microbeId: string
): PolarizationDataPoint[] {
  const reactor = MFC_REACTORS_CATALOG.find(r => r.id === reactorId) || MFC_REACTORS_CATALOG[0];
  const microbe = EXOELECTROGENS_CATALOG.find(m => m.id === microbeId) || EXOELECTROGENS_CATALOG[0];
  const points: PolarizationDataPoint[] = [];

  const areaResistance = reactor.nominalInternalResistanceOhms * reactor.typicalAnodeSurfaceAreaM2; // Ω·m²
  const maxOhmicJ = (reactor.nominalOcvVolts / areaResistance) * 1000.0; // mA/m²
  const theoreticalLimitJ = Math.min(microbe.maxCurrentDensityAm2 * 1000.0, maxOhmicJ * 0.95);

  const steps = 30;
  const dJ = theoreticalLimitJ / steps;

  for (let i = 0; i <= steps; i++) {
    const j = i * dJ; // mA/m²

    if (j === 0) {
      points.push({
        currentDensityMaM2: 0,
        cellVoltageV: reactor.nominalOcvVolts,
        powerDensityMilliWm2: 0
      });
      continue;
    }

    // 1. Phân cực hoạt hóa (Activation loss) theo định luật Tafel: eta_act = a * ln(1 + j / j0)
    const actLoss = 0.035 * Math.log(1.0 + j / 35.0);

    // 2. Tổn thất Ohmic tuyến tính: eta_ohm = j * R_area
    const ohmicLoss = (j / 1000.0) * areaResistance;

    // 3. Phân cực nồng độ / trở ngại khuếch tán (Concentration mass-transfer loss)
    const concentrationRatio = j / theoreticalLimitJ;
    let concLoss = 0.0;
    if (concentrationRatio > 0.8) {
      concLoss = 0.02 + 0.18 * Math.exp((concentrationRatio - 0.8) / 0.07);
    } else {
      concLoss = 0.02 * concentrationRatio;
    }

    const vCellRaw = reactor.nominalOcvVolts - actLoss - ohmicLoss - concLoss;
    const vCell = Math.max(0.0, Math.round(vCellRaw * 1000) / 1000);
    const pDensity = Math.round(vCell * j * 10) / 10;

    points.push({
      currentDensityMaM2: Math.round(j),
      cellVoltageV: vCell,
      powerDensityMilliWm2: pDensity
    });
  }

  return points;
}
