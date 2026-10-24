// src/domain/industrialElectrochemicalRefiningEngine.ts
// Comprehensive Industrial Membrane Chlor-Alkali Electrolysis, Anodic Copper Refining & Green H2 Engine
// Conforming to Vietnam GDPT 2018 Chemistry Curriculum (Chuyên đề Hóa học 12: Điện phân công nghiệp & Luyện kim)
// and IUPAC Electrochemical Engineering Standards & ISO 22734 / Euro Chlor Best Available Techniques (BAT)

export const FARADAY_CONSTANT = 96485; // C / mol e-
export const STANDARD_MOLAR_VOLUME_GAS = 24.79; // L/mol at 25°C, 1 bar (Vietnam GDPT 2018)

// =============================================================================
// 1. INDUSTRIAL MEMBRANE CHLOR-ALKALI ELECTROLYSIS (XÚT - CLO MÀNG TRAO ĐỔI ION)
// =============================================================================

export interface ChlorAlkaliCellParameters {
  currentAmperes: number; // e.g., 5000 to 20000 A in industrial cells
  currentDensityKAperM2: number; // typical 3.0 - 6.0 kA/m2
  operatingTempCelsius: number; // typical 85 - 90°C
  anolyteBrineFeedNaclGPerL: number; // typical 300 - 310 g/L (saturated)
  membraneType: 'PERFLUOROSULFONIC_BILAYER' | 'ASBESTOS_DIAPHRAGM_LEGACY' | 'MERCURY_CATHODE_LEGACY';
  currentEfficiencyPercent: number; // typical 94 - 96%
  hoursOfOperation: number;
}

export interface VoltageLossComponents {
  reversibleDecompositionVoltageV: number; // E0_rev ~ 2.19 - 2.23 V
  anodeChlorineOverpotentialV: number; // eta_anode ~ 0.05 - 0.12 V (RuO2-TiO2 DSA)
  cathodeHydrogenOverpotentialV: number; // eta_cathode ~ 0.08 - 0.15 V (Raney Ni)
  membraneOhmicDropV: number; // IR_membrane ~ 0.35 - 0.55 V
  electrolyteOhmicDropV: number; // IR_sol ~ 0.15 - 0.25 V
  structuralContactResistanceV: number; // IR_struct ~ 0.05 - 0.10 V
  totalCellVoltageV: number; // V_cell = Sum
}

export interface ChlorAlkaliProductionOutput {
  params: ChlorAlkaliCellParameters;
  voltageLosses: VoltageLossComponents;
  naohMassProducedKg: number;
  cl2GasProducedKg: number;
  cl2VolumeStandardM3: number;
  h2GasProducedKg: number;
  h2VolumeStandardM3: number;
  specificEnergyKwhPerTonNaoh: number; // kWh / metric ton 100% NaOH
  specificEnergyKwhPerTonCl2: number; // kWh / metric ton Cl2
  anolyteExitNaclGPerL: number; // depleted brine ~ 200 - 210 g/L
  catholyteProductConcentrationPercent: number; // 32 - 35% NaOH
  donnanExclusionEfficacyPercent: number; // % rejection of Cl- and OH- by membrane
  brineHardnessRiskLevel: 'SAFE' | 'MEMBRANE_FOULING_WARNING' | 'CRITICAL_FAILURE';
  vietnamIndustrialSiteVi: string;
  chemicalProcessSummaryVi: string;
}

/**
 * Calculates industrial chlor-alkali membrane cell performance, voltage drop,
 * Faraday mass yields, specific energy consumption, and Donnan membrane exclusion.
 */
export function simulateChlorAlkaliMembraneCell(
  params: ChlorAlkaliCellParameters,
  brineHardnessPpbCaMg: number = 10 // parts per billion Ca2+ + Mg2+ in feed
): ChlorAlkaliProductionOutput {
  const safeI = Math.max(100, Math.min(50000, params.currentAmperes));
  const safeHours = Math.max(0.1, Math.min(720, params.hoursOfOperation));
  const eta_I = Math.max(0.7, Math.min(0.99, params.currentEfficiencyPercent / 100));

  // Charge passed Q in Coulombs
  const totalChargeQ = safeI * (safeHours * 3600); // Coulombs
  const molesElectrons = (totalChargeQ / FARADAY_CONSTANT) * eta_I;

  // Stoichiometry:
  // Anode: 2Cl- -> Cl2 + 2e- (1 mole Cl2 requires 2 moles e-)
  // Cathode: 2H2O + 2e- -> H2 + 2OH- (1 mole H2 requires 2 moles e-, 2 moles NaOH per 2 moles e-)
  // 1 mole e- produces 1 mole NaOH, 0.5 mole Cl2, 0.5 mole H2
  const molesNaOH = molesElectrons;
  const molesCl2 = molesElectrons / 2;
  const molesH2 = molesElectrons / 2;

  const naohMassProducedKg = parseFloat(((molesNaOH * 39.997) / 1000).toFixed(2));
  const cl2GasProducedKg = parseFloat(((molesCl2 * 70.906) / 1000).toFixed(2));
  const cl2VolumeStandardM3 = parseFloat(((molesCl2 * (STANDARD_MOLAR_VOLUME_GAS / 1000))).toFixed(2));
  const h2GasProducedKg = parseFloat(((molesH2 * 2.016) / 1000).toFixed(2));
  const h2VolumeStandardM3 = parseFloat(((molesH2 * (STANDARD_MOLAR_VOLUME_GAS / 1000))).toFixed(2));

  // Voltage decomposition calculation (at current density J)
  const J = params.currentDensityKAperM2;
  let revV = 2.20; // Reversible decomposition potential at 85-90°C
  let etaAnode = 0.05 + 0.015 * J;
  let etaCathode = 0.08 + 0.02 * J;
  let irMembrane = 0.30 + 0.06 * J;
  let irSol = 0.12 + 0.03 * J;
  let irStruct = 0.06;

  let donnanExclusion = 99.8; // Perfluorosulfonic bilayer membrane

  if (params.membraneType === 'ASBESTOS_DIAPHRAGM_LEGACY') {
    revV = 2.22;
    irMembrane = 0.70;
    donnanExclusion = 85.0; // Poor anion rejection -> NaCl contaminates NaOH product!
  } else if (params.membraneType === 'MERCURY_CATHODE_LEGACY') {
    revV = 3.15; // Na-Hg amalgam overpotential is much higher
    irMembrane = 0.0;
    donnanExclusion = 100;
  }

  const totalCellVoltageV = parseFloat(
    (revV + etaAnode + etaCathode + irMembrane + irSol + irStruct).toFixed(2)
  );

  const voltageLosses: VoltageLossComponents = {
    reversibleDecompositionVoltageV: parseFloat(revV.toFixed(2)),
    anodeChlorineOverpotentialV: parseFloat(etaAnode.toFixed(2)),
    cathodeHydrogenOverpotentialV: parseFloat(etaCathode.toFixed(2)),
    membraneOhmicDropV: parseFloat(irMembrane.toFixed(2)),
    electrolyteOhmicDropV: parseFloat(irSol.toFixed(2)),
    structuralContactResistanceV: parseFloat(irStruct.toFixed(2)),
    totalCellVoltageV
  };

  // Specific Electrical Energy Consumption:
  // Total Energy consumed E_total = V_cell * I * t (in Watt-hours) / 1000 = kWh
  const totalEnergyKwh = (totalCellVoltageV * safeI * safeHours) / 1000;
  const specificEnergyKwhPerTonNaoh = parseFloat(
    ((totalEnergyKwh / (naohMassProducedKg / 1000))).toFixed(1)
  );
  const specificEnergyKwhPerTonCl2 = parseFloat(
    ((totalEnergyKwh / (cl2GasProducedKg / 1000))).toFixed(1)
  );

  // Depleted brine concentration
  const anolyteExitNaclGPerL = Math.max(180, parseFloat((params.anolyteBrineFeedNaclGPerL - 95).toFixed(1)));
  const catholyteProductConcentrationPercent = params.membraneType === 'ASBESTOS_DIAPHRAGM_LEGACY' ? 12.0 : 33.5;

  // Brine hardness impurity risk (Ca2+ / Mg2+)
  let brineHardnessRiskLevel: 'SAFE' | 'MEMBRANE_FOULING_WARNING' | 'CRITICAL_FAILURE' = 'SAFE';
  if (brineHardnessPpbCaMg > 50) {
    brineHardnessRiskLevel = 'CRITICAL_FAILURE';
  } else if (brineHardnessPpbCaMg > 20) {
    brineHardnessRiskLevel = 'MEMBRANE_FOULING_WARNING';
  }

  const chemicalProcessSummaryVi = `Quá trình điện phân dung dịch NaCl bão hòa bằng màng trao đổi ion cation Nafion:
- Cực dương (Anot titan phủ DSA RuO₂-TiO₂): 2Cl⁻ → Cl₂↑ + 2e⁻ (E° = +1.36V).
- Cực âm (Catot niken xúc tác bọt): 2H₂O + 2e⁻ → H₂↑ + 2OH⁻ (E° = -0.83V).
- Màng Nafion phân lớp chứa các nhóm tích điện âm (-SO₃⁻ và -COO⁻) đẩy lùi anion Cl⁻ và OH⁻ (hiệu ứng Donnan ${donnanExclusion}%), chỉ cho ion Na⁺ đi qua, giúp dung dịch NaOH tạo thành đạt độ tinh khiết cao (${catholyteProductConcentrationPercent}%), hoàn toàn không bị lẫn muối ăn NaCl hay tạo nước Javel.`;

  return {
    params,
    voltageLosses,
    naohMassProducedKg,
    cl2GasProducedKg,
    cl2VolumeStandardM3,
    h2GasProducedKg,
    h2VolumeStandardM3,
    specificEnergyKwhPerTonNaoh,
    specificEnergyKwhPerTonCl2,
    anolyteExitNaclGPerL,
    catholyteProductConcentrationPercent,
    donnanExclusionEfficacyPercent: donnanExclusion,
    brineHardnessRiskLevel,
    vietnamIndustrialSiteVi: 'Tổ hợp Hóa chất Việt Trì (Phú Thọ) & Hóa chất Đức Giang (Lào Cai)',
    chemicalProcessSummaryVi
  };
}

// =============================================================================
// 2. BLISTER COPPER ANODIC REFINING & ANODE SLIME RECOVERY (TINH LUYỆN ĐỒNG ANOT)
// =============================================================================

export interface ImpureCopperElement {
  symbol: string;
  nameVi: string;
  weightPercent: number;
  standardPotentialE0V: number;
  anodicFateVi: 'DISSOLVES_AS_ION' | 'PRECIPITATES_IN_SLIME' | 'DEPOSITS_AT_CATHODE';
  fateDescriptionVi: string;
}

export const BLISTER_COPPER_TYPICAL_COMPOSITION: ImpureCopperElement[] = [
  {
    symbol: 'Cu',
    nameVi: 'Đồng thô (Blister Copper)',
    weightPercent: 98.80,
    standardPotentialE0V: +0.34,
    anodicFateVi: 'DEPOSITS_AT_CATHODE',
    fateDescriptionVi: 'Cu tan ở anot thành Cu²⁺ rồi di chuyển sang catot nhận 2e⁻ kết tinh thành đồng độ tinh khiết 99.99%.'
  },
  {
    symbol: 'Ni',
    nameVi: 'Niken',
    weightPercent: 0.35,
    standardPotentialE0V: -0.25,
    anodicFateVi: 'DISSOLVES_AS_ION',
    fateDescriptionVi: 'Tan thành Ni²⁺ trong dung dịch điện phân. Do E°(Ni²⁺/Ni) < E°(Cu²⁺/Cu), Ni²⁺ không bị khử ở catot và tích tụ trong bể.'
  },
  {
    symbol: 'Fe',
    nameVi: 'Sắt',
    weightPercent: 0.12,
    standardPotentialE0V: -0.44,
    anodicFateVi: 'DISSOLVES_AS_ION',
    fateDescriptionVi: 'Tan thành Fe²⁺ trong dung dịch, không kết tủa ở catot.'
  },
  {
    symbol: 'Zn',
    nameVi: 'Kẽm',
    weightPercent: 0.08,
    standardPotentialE0V: -0.76,
    anodicFateVi: 'DISSOLVES_AS_ION',
    fateDescriptionVi: 'Tan thành Zn²⁺ hòa tan hoàn toàn, không khử ở điện thế anot Cu.'
  },
  {
    symbol: 'Pb',
    nameVi: 'Chì',
    weightPercent: 0.15,
    standardPotentialE0V: -0.13,
    anodicFateVi: 'PRECIPITATES_IN_SLIME',
    fateDescriptionVi: 'Bị oxi hóa thành Pb²⁺ nhưng lập tức kết tủa với SO₄²⁻ tạo PbSO₄ không tan rơi xuống bùn dương cực.'
  },
  {
    symbol: 'Ag',
    nameVi: 'Bạc',
    weightPercent: 0.045, // ~450 g / metric ton
    standardPotentialE0V: +0.80,
    anodicFateVi: 'PRECIPITATES_IN_SLIME',
    fateDescriptionVi: 'Có tính khử yếu hơn Cu, trơ ở điện thế anot (+0.3V), rụng xuống đáy bể thành bùn dương cực (Anode Slime).'
  },
  {
    symbol: 'Au',
    nameVi: 'Vàng',
    weightPercent: 0.0015, // ~15 g / metric ton
    standardPotentialE0V: +1.50,
    anodicFateVi: 'PRECIPITATES_IN_SLIME',
    fateDescriptionVi: 'Kim loại quý trơ tuyệt đối, không bị oxi hóa, thu hồi giá trị cao từ bùn anot.'
  },
  {
    symbol: 'Pt',
    nameVi: 'Bạch kim (Platinum)',
    weightPercent: 0.0005, // ~5 g / metric ton
    standardPotentialE0V: +1.18,
    anodicFateVi: 'PRECIPITATES_IN_SLIME',
    fateDescriptionVi: 'Kim loại quý nhóm Platin trơ, lắng đọng trong bùn dương cực.'
  },
  {
    symbol: 'Se_Te',
    nameVi: 'Selen & Telu (dưới dạng Cu₂Se)',
    weightPercent: 0.453,
    standardPotentialE0V: +0.74,
    anodicFateVi: 'PRECIPITATES_IN_SLIME',
    fateDescriptionVi: 'Hợp chất selenua và telulua trơ không tan, rơi xuống bùn dương cực phục vụ sản xuất bán dẫn.'
  }
];

export interface CopperRefiningResult {
  totalBlisterAnodeKg: number;
  electrolysisHours: number;
  cellCurrentAmperes: number;
  refinedCathodeCopperKg: number;
  cathodePurityPercent: number; // 99.99%
  dissolvedAnodeMassKg: number;
  residualAnodeScrapKg: number;
  anodeSlimeTotalKg: number;
  recoveredSilverGrams: number;
  recoveredGoldGrams: number;
  recoveredPlatinumGrams: number;
  preciousMetalsEconomicValueUsd: number;
  cellOperatingVoltageV: number; // 0.25 - 0.35 V
  energyKwhPerTonCopper: number; // ~ 250 - 300 kWh / ton Cu
  selectiveDissolutionLadderVi: string[];
}

export function simulateCopperAnodicRefining(
  blisterCopperAnodeKg: number = 1000, // 1 metric ton
  cellCurrentAmperes: number = 25000,
  electrolysisDays: number = 14
): CopperRefiningResult {
  const safeMass = Math.max(10, Math.min(50000, blisterCopperAnodeKg));
  const safeI = Math.max(100, Math.min(100000, cellCurrentAmperes));
  const safeDays = Math.max(1, Math.min(30, electrolysisDays));
  const totalHours = safeDays * 24;

  const currentEfficiency = 0.97; // 97% for industrial copper refining
  const totalSeconds = totalHours * 3600;

  // Faraday law for theoretical Cu deposition:
  // m = (A * I * t * eta) / (n * F)
  // Cu: A = 63.546 g/mol, n = 2
  const theoreticalDepositionKg = (63.546 * safeI * totalSeconds * currentEfficiency) / (2 * FARADAY_CONSTANT * 1000);
  
  // Cathode Cu cannot exceed available copper in anode (typically 85% dissolves before recycling anode scrap)
  const availableCopperKg = safeMass * 0.988 * 0.85; // 85% dissolved
  const refinedCathodeCopperKg = parseFloat(Math.min(availableCopperKg, theoreticalDepositionKg).toFixed(1));

  // Dissolved anode mass & actual operating duration to achieve this yield
  const dissolvedAnodeMassKg = parseFloat((refinedCathodeCopperKg / 0.988).toFixed(1));
  const residualAnodeScrapKg = parseFloat((safeMass - dissolvedAnodeMassKg).toFixed(1));

  // Effective operating hours required for this mass transfer
  const effectiveElectrolysisHours = Math.min(
    totalHours,
    (refinedCathodeCopperKg * 1000 * 2 * FARADAY_CONSTANT) / (63.546 * safeI * currentEfficiency * 3600)
  );

  // Anode slime calculation based on dissolved mass
  const slimeFraction = (0.15 + 0.045 + 0.0015 + 0.0005 + 0.453) / 100; // sum of insoluble %
  const anodeSlimeTotalKg = parseFloat((dissolvedAnodeMassKg * slimeFraction * 1.5).toFixed(2)); // With bound oxides/sulfates

  // Precious metals recovered (from dissolved portion)
  const recoveredSilverGrams = parseFloat((dissolvedAnodeMassKg * 0.45).toFixed(1)); // 450 g/t
  const recoveredGoldGrams = parseFloat((dissolvedAnodeMassKg * 0.015).toFixed(2)); // 15 g/t
  const recoveredPlatinumGrams = parseFloat((dissolvedAnodeMassKg * 0.005).toFixed(3)); // 5 g/t

  // Estimated economic value:
  // Ag ~$1.0/g, Au ~$80/g, Pt ~$35/g
  const preciousMetalsEconomicValueUsd = Math.round(
    recoveredSilverGrams * 1.0 + recoveredGoldGrams * 80.0 + recoveredPlatinumGrams * 35.0
  );

  const cellVoltageV = 0.28; // Very low voltage because anode and cathode are both Cu!
  // Energy = V * I * effectiveHours / (1000 * ton_Cu)
  const totalEnergyKwh = (cellVoltageV * safeI * effectiveElectrolysisHours) / 1000;
  const energyKwhPerTonCopper = parseFloat(
    ((totalEnergyKwh / (refinedCathodeCopperKg / 1000))).toFixed(1)
  );

  const selectiveDissolutionLadderVi = [
    '1. Kim loại hoạt động mạnh hơn Cu (Zn, Fe, Ni): Bị oxi hóa tan thành ion Zn²⁺, Fe²⁺, Ni²⁺ trong dung dịch, không thể bám vào catot vì E° khử quá âm.',
    '2. Đồng (Cu): Chiếm 98.8% khối lượng, tan thành ion Cu²⁺ ở anot và kết tinh có chọn lọc ở catot thành tấm đồng 99.99% (Cu-ETP).',
    '3. Chì (Pb): Tan thành Pb²⁺ nhưng kết tủa ngay với ion SO₄²⁻ trong chất điện phân thành PbSO₄ lắng xuống bùn dương cực.',
    '4. Kim loại quý kém hoạt động hơn Cu (Ag, Au, Pt): Hoàn toàn trơ ở điện thế anot +0.28V, không mất electron, rụng xuống đáy bể tạo Bùn dương cực có giá trị kinh tế khổng lồ.'
  ];

  return {
    totalBlisterAnodeKg: safeMass,
    electrolysisHours: totalHours,
    cellCurrentAmperes: safeI,
    refinedCathodeCopperKg,
    cathodePurityPercent: 99.99,
    dissolvedAnodeMassKg,
    residualAnodeScrapKg,
    anodeSlimeTotalKg,
    recoveredSilverGrams,
    recoveredGoldGrams,
    recoveredPlatinumGrams,
    preciousMetalsEconomicValueUsd,
    cellOperatingVoltageV: cellVoltageV,
    energyKwhPerTonCopper,
    selectiveDissolutionLadderVi
  };
}

// =============================================================================
// 3. GREEN HYDROGEN WATER ELECTROLYSIS (PEM VS ALKALINE VS SOEC)
// =============================================================================

export interface ElectrolyzerTechnology {
  id: 'PEM' | 'ALKALINE_AEL' | 'SOLID_OXIDE_SOEC';
  nameVi: string;
  electrolyteVi: string;
  chargeCarrier: string; // H+, OH-, or O2-
  operatingTempCelsius: number;
  cellEfficiencyHhvPercent: number; // Higher Heating Value efficiency
  specificPowerConsumptionKwhPerKgH2: number;
  rampUpTimeSeconds: number; // For intermittent renewable wind/solar integration
  durabilityHours: number;
  catalystMaterialVi: string;
}

export const ELECTROLYZER_TECHNOLOGIES: Record<string, ElectrolyzerTechnology> = {
  PEM: {
    id: 'PEM',
    nameVi: 'Màng trao đổi proton PEM (Proton Exchange Membrane)',
    electrolyteVi: 'Màng polyme rắn fluoropolymer perfluorosulfonic (Nafion)',
    chargeCarrier: 'H⁺ (Proton)',
    operatingTempCelsius: 70,
    cellEfficiencyHhvPercent: 78,
    specificPowerConsumptionKwhPerKgH2: 52.0,
    rampUpTimeSeconds: 1, // Ultra-fast response for wind/solar surges
    durabilityHours: 60000,
    catalystMaterialVi: 'Anot: IrO₂ (Iridium oxide); Catot: Pt/C (Platinum carbon)'
  },
  ALKALINE_AEL: {
    id: 'ALKALINE_AEL',
    nameVi: 'Điện phân kiềm truyền thống (Alkaline Electrolysis - AEL)',
    electrolyteVi: 'Dung dịch KOH 25 - 30% lỏng có màng xốp Zirfon',
    chargeCarrier: 'OH⁻ (Hydroxide)',
    operatingTempCelsius: 80,
    cellEfficiencyHhvPercent: 68,
    specificPowerConsumptionKwhPerKgH2: 58.5,
    rampUpTimeSeconds: 900, // 15 mins (slower ramp)
    durabilityHours: 90000,
    catalystMaterialVi: 'Niken mạ lưới thép (không dùng kim loại quý đắt đỏ)'
  },
  SOLID_OXIDE_SOEC: {
    id: 'SOLID_OXIDE_SOEC',
    nameVi: 'Điện phân gốm oxit rắn nhiệt độ cao (SOEC)',
    electrolyteVi: 'Gốm YSZ (Yttria-Stabilized Zirconia) thể rắn',
    chargeCarrier: 'O²⁻ (Oxide ion)',
    operatingTempCelsius: 750,
    cellEfficiencyHhvPercent: 92, // Utilizing waste heat from nuclear/industrial plants
    specificPowerConsumptionKwhPerKgH2: 42.0,
    rampUpTimeSeconds: 7200, // Hours (thermal stress)
    durabilityHours: 25000,
    catalystMaterialVi: 'Gốm perovskite LSCF / Cermet Ni-YSZ'
  }
};
