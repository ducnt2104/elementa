// src/domain/microbialElectrosynthesisEngine.ts
// Microbial Electrosynthesis (MES) & Gas-Diffusion Biocathode CO2 Valorization Domain Engine
// Conforms to: Wood-Ljungdahl Pathway (WLP), Nernstian Bioelectrochemical Kinetics, IUPAC & Vietnam GDPT 2018 Chemistry

export type ElectroactiveMicrobeType =
  | 'SPOROMUSA_OVATA'
  | 'CLOSTRIDIUM_AUTETHANOGENUM'
  | 'MOORELLA_THERMOACETICA'
  | 'METHANOBACTERIUM_PALUSTRE';

export type CathodeArchitectureType =
  | 'GAS_DIFFUSION_PTFE_CARBON'
  | 'CARBON_FELT_BIOCHAR_3D'
  | 'GRAPHITE_PLATE_PLANAR'
  | 'TITANIUM_MESH_MWCNT';

export interface MicrobeProperties {
  id: ElectroactiveMicrobeType;
  name: string;
  metabolicClassification: string;
  primaryPathway: string;
  electronUptakeMechanism: 'DIRECT_ELECTRON_TRANSFER' | 'MEDIATED_HYDROGENASE' | 'DUAL_MODE';
  optimalTemperatureC: number;
  optimalPh: number;
  targetProduct: string;
  maxCoulombicEfficiencyPct: number;
  description: string;
}

export interface CathodeProperties {
  id: CathodeArchitectureType;
  name: string;
  effectiveSurfaceAreaM2PerM2: number;
  co2MassTransferRateMolPerM3S: number;
  typicalCurrentDensityAPerM2: number;
  hydrophobicPtfeLayer: boolean;
  costTier: 'LOW' | 'MEDIUM' | 'HIGH';
  description: string;
}

export interface BiochemicalProductMetric {
  productName: string;
  chemicalFormula: string;
  molecularWeightGPerMol: number;
  electronCountPerMolecule: number; // e.g. 8e- for Acetate (2 CO2 + 8 H+ + 8e- -> CH3COOH + 2 H2O)
  coulombicEfficiencyPct: number;
  marketPriceUsdPerKg: number;
  primaryIndustrialUse: string;
}

export interface MesElectrochemicalKinetics {
  cathodePotentialVvsShe: number;
  currentDensityAPerM2: number;
  coulombicEfficiencyPct: number;
  co2ReductionOverpotentialV: number;
  cellVoltageVolts: number;
  volumetricProductivityGPerLDay: number;
  acetateSelectivityPct: number;
  ethanolSelectivityPct: number;
  isThermodynamicallyFeasible: boolean;
}

export interface MesPlantMassEnergyBalance {
  totalCathodeAreaM2: number;
  appliedCurrentAmperes: number;
  cellVoltageVolts: number;
  electricPowerInputKw: number;
  co2ConsumptionRateKgPerHour: number;
  co2AnnualMetricTonsCaptured: number;
  aceticAcidProductionKgPerHour: number;
  aceticAcidAnnualMetricTons: number;
  ethanolProductionKgPerHour: number;
  ethanolAnnualMetricTons: number;
  oxygenCoProductKgPerHour: number;
  annualProductMarketValueUsd: number;
  specificEnergyConsumptionKwhPerKgAcetate: number;
}

export interface BiofilmHealthAndLongevity {
  biofilmThicknessMicrons: number;
  liveCellDensityCellsPerCm2: number;
  extracellularPolymericSubstancePct: number;
  electronTransferResistanceOhms: number;
  biofilmStatus: 'HEALTHY_EXPONENTIAL' | 'STABLE_STATIONARY' | 'SLOUGHING_OVERTHICK' | 'STARVED';
  operationalAdvice: string;
}

/**
 * Fundamental Bioelectrochemical Constants
 */
export const FARADAY_CONSTANT = 96485.33; // C/mol e-
export const THERMODYNAMIC_CO2_ACETATE_POTENTIAL_V_SHE = -0.280; // at pH 7.0 (2 CO2 + 8 H+ + 8e- -> CH3COOH + 2 H2O)
export const THERMODYNAMIC_OER_POTENTIAL_V_SHE = 0.815; // at pH 7.0 (2 H2O -> O2 + 4 H+ + 4e-)
export const ACETATE_MW = 60.05; // g/mol
export const ETHANOL_MW = 46.07; // g/mol
export const CO2_MW = 44.01; // g/mol
export const ELECTRONS_PER_ACETATE = 8;
export const ELECTRONS_PER_ETHANOL = 12; // 2 CO2 + 12 H+ + 12e- -> CH3CH2OH + 3 H2O

export const ELECTROACTIVE_MICROBE_CATALOG: Record<ElectroactiveMicrobeType, MicrobeProperties> = {
  SPOROMUSA_OVATA: {
    id: 'SPOROMUSA_OVATA',
    name: 'Sporomusa ovata (Chuẩn Mực Vàng WLP)',
    metabolicClassification: 'Vi khuẩn kỵ khí sinh axetat (Acetogen)',
    primaryPathway: 'Con đường Wood-Ljungdahl (Reductive Acetyl-CoA)',
    electronUptakeMechanism: 'DIRECT_ELECTRON_TRANSFER',
    optimalTemperatureC: 30.0,
    optimalPh: 7.0,
    targetProduct: 'Axit Axetic (CH₃COOH) & Axetat',
    maxCoulombicEfficiencyPct: 92.5,
    description: 'Chủng vi sinh vật khử CO₂ thành axetat có hiệu suất dòng điện cao nhất thế giới (>90%). Sở hữu cytochrom màng ngoài và lông dẫn điện tiếp nhận electron trực tiếp từ bề mặt cực âm.'
  },
  CLOSTRIDIUM_AUTETHANOGENUM: {
    id: 'CLOSTRIDIUM_AUTETHANOGENUM',
    name: 'Clostridium autoethanogenum (Tổng Hợp Cồn Sinh Học)',
    metabolicClassification: 'Vi khuẩn kỵ khí lên men khí tổng hợp (Gas-fermenting)',
    primaryPathway: 'Wood-Ljungdahl phân nhánh Alcohol Dehydrogenase',
    electronUptakeMechanism: 'DUAL_MODE',
    optimalTemperatureC: 37.0,
    optimalPh: 5.8,
    targetProduct: 'Etanol sinh học (CH₃CH₂OH) & Axetat',
    maxCoulombicEfficiencyPct: 84.0,
    description: 'Chủng công nghiệp lên men khí thải carbon LanzaTech. Trong hệ điện hóa sinh học, có khả năng kéo dài chuỗi acetyl-CoA tạo etanol và 2,3-butanediol dùng làm nhiên liệu hàng không.'
  },
  MOORELLA_THERMOACETICA: {
    id: 'MOORELLA_THERMOACETICA',
    name: 'Moorella thermoacetica (Ưa Nhiệt 55°C)',
    metabolicClassification: 'Vi sinh vật ưa nhiệt (Thermophilic Acetogen)',
    primaryPathway: 'Wood-Ljungdahl enzyme chịu nhiệt',
    electronUptakeMechanism: 'MEDIATED_HYDROGENASE',
    optimalTemperatureC: 55.0,
    optimalPh: 6.8,
    targetProduct: 'Axetat nồng độ cao (>25 g/L)',
    maxCoulombicEfficiencyPct: 88.0,
    description: 'Vận hành ở 55°C giúp tăng tốc độ khuếch tán CO₂, giảm độ nhớt chất lỏng và ngăn ngừa triệt để sự nhiễm trùng vi khuẩn lạ trong lò phản ứng hở.'
  },
  METHANOBACTERIUM_PALUSTRE: {
    id: 'METHANOBACTERIUM_PALUSTRE',
    name: 'Methanobacterium palustre (Metan Sinh Học E-Methane)',
    metabolicClassification: 'Cổ khuẩn sinh metan (Methanogen Archaea)',
    primaryPathway: 'Hydrogenotrophic Methanogenesis: CO₂ + 8 H⁺ + 8e⁻ → CH₄ + 2 H₂O',
    electronUptakeMechanism: 'MEDIATED_HYDROGENASE',
    optimalTemperatureC: 35.0,
    optimalPh: 7.2,
    targetProduct: 'Khí Metan Sinh Học (Bio-CH₄ / RNG)',
    maxCoulombicEfficiencyPct: 95.0,
    description: 'Cổ khuẩn sinh học chuyên biệt chuyển hóa CO₂ trực tiếp thành khí thiên nhiên tái tạo (Renewable Natural Gas) cấp cho lưới khí đốt quốc gia.'
  }
};

export const CATHODE_ARCHITECTURE_CATALOG: Record<CathodeArchitectureType, CathodeProperties> = {
  GAS_DIFFUSION_PTFE_CARBON: {
    id: 'GAS_DIFFUSION_PTFE_CARBON',
    name: 'Cực Âm Khuếch Tán Khí GDB (Gas-Diffusion Carbon Cloth + PTFE)',
    effectiveSurfaceAreaM2PerM2: 125.0,
    co2MassTransferRateMolPerM3S: 4.8,
    typicalCurrentDensityAPerM2: 35.0, // Immense current density
    hydrophobicPtfeLayer: true,
    costTier: 'MEDIUM',
    description: 'Cấu trúc 3 pha tiên tiến: khí CO₂ tinh khiết được cấp trực tiếp qua màng kỵ nước PTFE tới màng sinh học biofilm, triệt tiêu hoàn toàn nút thắt hòa tan CO₂ trong nước.'
  },
  CARBON_FELT_BIOCHAR_3D: {
    id: 'CARBON_FELT_BIOCHAR_3D',
    name: 'Nỉ Carbon 3D Biến Tính Than Sinh Học (3D Biochar Carbon Felt)',
    effectiveSurfaceAreaM2PerM2: 85.0,
    co2MassTransferRateMolPerM3S: 1.2,
    typicalCurrentDensityAPerM2: 12.0,
    hydrophobicPtfeLayer: false,
    costTier: 'LOW',
    description: 'Vật liệu xốp 3 chiều giá rẻ, độ dẫn điện cao và tương thích sinh học tuyệt vời, tạo môi trường dồi dào cho vi khuẩn Sporomusa ovata bám dính thành cụm biofilm dày.'
  },
  GRAPHITE_PLATE_PLANAR: {
    id: 'GRAPHITE_PLATE_PLANAR',
    name: 'Tấm Than Chì Phẳng Truyền Thống (Planar Graphite Plate)',
    effectiveSurfaceAreaM2PerM2: 1.0,
    co2MassTransferRateMolPerM3S: 0.25,
    typicalCurrentDensityAPerM2: 1.5,
    hydrophobicPtfeLayer: false,
    costTier: 'LOW',
    description: 'Điện cực thí nghiệm cổ điển có diện tích tiếp xúc thấp và giới hạn nghiêm trọng bởi tốc độ truyền khối CO₂ hòa tan trong dung dịch (chỉ đạt ~1.5 A/m²).'
  },
  TITANIUM_MESH_MWCNT: {
    id: 'TITANIUM_MESH_MWCNT',
    name: 'Lưới Titan Phủ Ống Nano Carbon (Ti-Mesh / Multi-Walled CNT)',
    effectiveSurfaceAreaM2PerM2: 240.0,
    co2MassTransferRateMolPerM3S: 3.5,
    typicalCurrentDensityAPerM2: 45.0,
    hydrophobicPtfeLayer: false,
    costTier: 'HIGH',
    description: 'Khung lưới titan chống ăn mòn siêu bền gắn rừng ống nano carbon dẫn điện. Tối ưu cho các nhà máy điện hóa sinh học vận hành liên tục trên 10 năm.'
  }
};

/**
 * Calculate Bioelectrochemical Kinetics & Cell Overpotentials
 */
export function calculateMesKinetics(params: {
  microbeType: ElectroactiveMicrobeType;
  cathodeType: CathodeArchitectureType;
  cathodePotentialVvsShe: number; // typically -0.4 to -0.9 V vs SHE
  electrolytePh: number;
}): MesElectrochemicalKinetics {
  const { microbeType, cathodeType, cathodePotentialVvsShe, electrolytePh } = params;
  const microbe = ELECTROACTIVE_MICROBE_CATALOG[microbeType];
  const cathode = CATHODE_ARCHITECTURE_CATALOG[cathodeType];

  // Nernstian shift of thermodynamic potential with pH: E = E0 - 0.0591 * pH
  const nernstShiftV = -0.0591 * (electrolytePh - 7.0);
  const formalPotentialV = THERMODYNAMIC_CO2_ACETATE_POTENTIAL_V_SHE + nernstShiftV;

  // Overpotential at cathode: eta = E_formal - E_applied (must be > 0 for driving reduction)
  const overpotentialV = Math.max(0.01, formalPotentialV - cathodePotentialVvsShe);

  // Butler-Volmer bioelectrochemical current density:
  // j = j0 * [exp(alpha * F * eta / RT) - exp(-(1-alpha) * F * eta / RT)]
  // Scaled by cathode effective surface area and CO2 transfer rate
  const transferMultiplier = cathode.typicalCurrentDensityAPerM2 / 35.0;
  const expFactor = Math.min(25.0, (overpotentialV * 96485.33) / (2 * 8.314 * (microbe.optimalTemperatureC + 273.15)));
  let jA = 6.0 * Math.exp(expFactor * 0.18) * transferMultiplier;
  jA = Math.max(0.5, Math.min(65.0, jA));

  // Cell voltage: V_cell = E_anode(OER) - E_cathode + IR drop + membrane overpotential
  const eAnodeOer = THERMODYNAMIC_OER_POTENTIAL_V_SHE + (-0.0591 * (electrolytePh - 7.0));
  const ohmicDropV = (jA * 0.02) + 0.35; // Ohmic solution and membrane resistance
  const cellVoltage = (eAnodeOer - cathodePotentialVvsShe) + ohmicDropV;

  // Coulombic Efficiency (% of electrons routed to acetate)
  let cePct = microbe.maxCoulombicEfficiencyPct;
  if (overpotentialV > 0.50) {
    // Parasitic H2 evolution increases if cathode potential is pushed too negative (< -0.85 V)
    cePct -= (overpotentialV - 0.50) * 35.0;
  }
  cePct = Math.max(45.0, Math.min(94.0, cePct));

  // Volumetric productivity: g acetate / (L * day)
  // Faradaic rate: r = (j * Area * CE) / (8 * F)
  const volProdGPerLDay = (jA * 0.45 * (cePct / 100) * ACETATE_MW * 86400) / (ELECTRONS_PER_ACETATE * FARADAY_CONSTANT);

  let acetateSel = 90.0;
  let ethanolSel = 8.0;
  if (microbeType === 'CLOSTRIDIUM_AUTETHANOGENUM') {
    acetateSel = 62.0;
    ethanolSel = 32.0;
  }

  const isFeasible = cathodePotentialVvsShe < formalPotentialV;

  return {
    cathodePotentialVvsShe,
    currentDensityAPerM2: Number(jA.toFixed(1)),
    coulombicEfficiencyPct: Number(cePct.toFixed(1)),
    co2ReductionOverpotentialV: Number(overpotentialV.toFixed(3)),
    cellVoltageVolts: Number(cellVoltage.toFixed(2)),
    volumetricProductivityGPerLDay: Number(volProdGPerLDay.toFixed(2)),
    acetateSelectivityPct: acetateSel,
    ethanolSelectivityPct: ethanolSel,
    isThermodynamicallyFeasible: isFeasible
  };
}

/**
 * Calculate Complete Plant Mass and Energy Balance
 */
export function calculateMesPlantBalance(params: {
  totalCathodeAreaM2: number;
  microbeType: ElectroactiveMicrobeType;
  cathodeType: CathodeArchitectureType;
  cathodePotentialVvsShe: number;
  electrolytePh: number;
}): MesPlantMassEnergyBalance {
  const { totalCathodeAreaM2, microbeType, cathodeType, cathodePotentialVvsShe, electrolytePh } = params;

  const kinetics = calculateMesKinetics({
    microbeType,
    cathodeType,
    cathodePotentialVvsShe,
    electrolytePh
  });

  const appliedCurrentA = totalCathodeAreaM2 * kinetics.currentDensityAPerM2;
  const powerKw = (appliedCurrentA * kinetics.cellVoltageVolts) / 1000;

  // Molar electron flow per second: I / F (mol e-/s)
  const electronMolesPerSecond = appliedCurrentA / FARADAY_CONSTANT;
  const electronMolesPerHour = electronMolesPerSecond * 3600;

  // Electrons allocated to acetate (8 e- per acetate, 2 CO2 per acetate):
  const acetateMolesPerHour = (electronMolesPerHour * (kinetics.coulombicEfficiencyPct / 100) * (kinetics.acetateSelectivityPct / 100)) / ELECTRONS_PER_ACETATE;
  const aceticAcidKgPerHour = (acetateMolesPerHour * ACETATE_MW) / 1000;

  // Electrons allocated to ethanol (12 e- per ethanol, 2 CO2 per ethanol):
  const ethanolMolesPerHour = (electronMolesPerHour * (kinetics.coulombicEfficiencyPct / 100) * (kinetics.ethanolSelectivityPct / 100)) / ELECTRONS_PER_ETHANOL;
  const ethanolKgPerHour = (ethanolMolesPerHour * ETHANOL_MW) / 1000;

  // Total CO2 consumed: (2 * acetate mol) + (2 * ethanol mol)
  const co2MolesPerHour = (acetateMolesPerHour * 2.0) + (ethanolMolesPerHour * 2.0);
  const co2KgPerHour = (co2MolesPerHour * CO2_MW) / 1000;

  // Oxygen generated at anode (4 e- per O2: 2 H2O -> O2 + 4 H+ + 4e-):
  const o2MolesPerHour = electronMolesPerHour / 4.0;
  const o2KgPerHour = (o2MolesPerHour * 32.0) / 1000;

  const hoursPerYear = 8000;
  const annualAcetateTons = (aceticAcidKgPerHour * hoursPerYear) / 1000;
  const annualEthanolTons = (ethanolKgPerHour * hoursPerYear) / 1000;
  const annualCo2Tons = (co2KgPerHour * hoursPerYear) / 1000;

  // Economics: Acetic Acid ~$1,100 / metric ton, Ethanol ~$900 / ton
  const annualValueUsd = (annualAcetateTons * 1100.0) + (annualEthanolTons * 900.0);

  // Specific energy consumption: kWh / kg acetate produced
  const specificEnergyKwhPerKg = aceticAcidKgPerHour > 0 ? powerKw / aceticAcidKgPerHour : 0;

  return {
    totalCathodeAreaM2,
    appliedCurrentAmperes: Number(appliedCurrentA.toFixed(1)),
    cellVoltageVolts: kinetics.cellVoltageVolts,
    electricPowerInputKw: Number(powerKw.toFixed(1)),
    co2ConsumptionRateKgPerHour: Number(co2KgPerHour.toFixed(1)),
    co2AnnualMetricTonsCaptured: Number(annualCo2Tons.toFixed(1)),
    aceticAcidProductionKgPerHour: Number(aceticAcidKgPerHour.toFixed(1)),
    aceticAcidAnnualMetricTons: Number(annualAcetateTons.toFixed(1)),
    ethanolProductionKgPerHour: Number(ethanolKgPerHour.toFixed(1)),
    ethanolAnnualMetricTons: Number(annualEthanolTons.toFixed(1)),
    oxygenCoProductKgPerHour: Number(o2KgPerHour.toFixed(1)),
    annualProductMarketValueUsd: Number(annualValueUsd.toFixed(0)),
    specificEnergyConsumptionKwhPerKgAcetate: Number(specificEnergyKwhPerKg.toFixed(2))
  };
}

/**
 * Evaluate Microbial Biofilm Thickness & Mass Transfer Health
 */
export function evaluateBiofilmHealth(thicknessMicrons: number): BiofilmHealthAndLongevity {
  const safeThick = Math.max(5.0, Math.min(250.0, thicknessMicrons));

  // Optimal thickness is ~30 to 70 microns:
  // Thinner (<20 um): Low biomass, underutilized electrode
  // Thicker (>100 um): Severe diffusion limitation, dead necrotic core at bottom
  let status: 'HEALTHY_EXPONENTIAL' | 'STABLE_STATIONARY' | 'SLOUGHING_OVERTHICK' | 'STARVED' = 'STABLE_STATIONARY';
  let advice = '';

  if (safeThick < 20.0) {
    status = 'STARVED';
    advice = 'Màng sinh học biofilm quá mỏng: Cần nuôi cấy tăng mật độ tế bào vi khuẩn bám dính hoặc giảm tốc độ dòng chảy chất đệm để tránh rửa trôi.';
  } else if (safeThick <= 75.0) {
    status = 'HEALTHY_EXPONENTIAL';
    advice = 'Màng sinh học ở độ dày tối ưu hoàn hảo (30 - 75 µm): Quá trình truyền electron qua c-cytochromes và khuếch tán chất dinh dưỡng đạt cực đại, không có hiện tượng hoại tử đáy.';
  } else if (safeThick <= 130.0) {
    status = 'STABLE_STATIONARY';
    advice = 'Biofilm chuyển sang giai đoạn ổn định: Bắt đầu có sự cản trở khuếch tán proton H⁺ và CO₂ ở các lớp tế bào sâu sát bề mặt điện cực.';
  } else {
    status = 'SLOUGHING_OVERTHICK';
    advice = 'Cảnh báo biofilm quá dày (>130 µm): Lớp tế bào bên trong bị thiếu dinh dưỡng dẫn đến chết hoại tử và bong tróc. Cần sục khí quét bề mặt để gọt mỏng biofilm.';
  }

  // Live cell density (cells/cm2)
  const cellDensity = Math.min(5e9, safeThick * 2.8e7);
  const rOhms = 1.2 + (safeThick * 0.045);

  return {
    biofilmThicknessMicrons: safeThick,
    liveCellDensityCellsPerCm2: Math.floor(cellDensity),
    extracellularPolymericSubstancePct: Number((22.0 + (safeThick * 0.12)).toFixed(1)),
    electronTransferResistanceOhms: Number(rOhms.toFixed(2)),
    biofilmStatus: status,
    operationalAdvice: advice
  };
}

/**
 * Carbon Capture & Valorization Benchmark Matrix
 */
export interface CarbonValorizationBenchmark {
  technologyName: string;
  energyInputType: string;
  reactionCondition: string;
  primaryProduct: string;
  coulombicEnergyEfficiencyPct: number;
  productSelectivityPct: number;
  catalystDurability: string;
}

export const CARBON_VALORIZATION_BENCHMARKS: CarbonValorizationBenchmark[] = [
  {
    technologyName: 'Điện Hóa Sinh Học MES (Microbial Electrosynthesis)',
    energyInputType: 'Điện tái tạo (Điện áp thấp 2.5 - 3.2V)',
    reactionCondition: 'Áp suất thường, 30°C, pH 7.0 (Thân thiện sinh thái)',
    primaryProduct: 'Axit Axetic tinh khiết (CH₃COOH) & Etanol',
    coulombicEnergyEfficiencyPct: 88.5,
    productSelectivityPct: 92.0,
    catalystDurability: 'Tự sinh sôi, tự sửa chữa liên tục (Không thoái hóa)'
  },
  {
    technologyName: 'Điện Phân CO₂ Nhiệt Độ Cao (SOEC Carbon Dioxide)',
    energyInputType: 'Điện + Nhiệt nhiệt độ cao (750 - 850°C)',
    reactionCondition: 'Nhiệt độ cực cao 800°C, áp suất 1 - 10 bar',
    primaryProduct: 'Khí Carbon Monoxide (CO) & Syngas',
    coulombicEnergyEfficiencyPct: 75.0,
    productSelectivityPct: 98.0,
    catalystDurability: 'Màng gốm dễ nứt vỡ do sốc nhiệt và coking'
  },
  {
    technologyName: 'Khử Điện Hóa CO₂ Cực Kim Loại (Cu / Ag Electrocatalysis)',
    energyInputType: 'Điện một chiều (Quá thế cao, điện áp 3.5 - 4.5V)',
    reactionCondition: 'Nhiệt độ phòng 25°C, dung dịch kiềm KOH',
    primaryProduct: 'Hỗn hợp phức tạp: Axit Formic, CO, Etylen, Metanol',
    coulombicEnergyEfficiencyPct: 55.0,
    productSelectivityPct: 45.0, // Multi-product mixture requiring distillation
    catalystDurability: 'Kim loại nano Cu/Ag bị tái kết tinh và ngộ độc sau 200 giờ'
  },
  {
    technologyName: 'Quang Khử Nhân Tạo (Solar Artificial Photosynthesis)',
    energyInputType: 'Ánh sáng mặt trời trực tiếp (Photon hν)',
    reactionCondition: 'Nhiệt độ phòng, huyền phù xúc tác bán dẫn',
    primaryProduct: 'Axit Formic loãng / Khí CO nồng độ thấp',
    coulombicEnergyEfficiencyPct: 1.5, // Low STC efficiency
    productSelectivityPct: 60.0,
    catalystDurability: 'Quang ăn mòn (Photo-corrosion) làm suy giảm hoạt tính'
  }
];
