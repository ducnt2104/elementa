// src/domain/dmaEngine.ts
// Milestone 74: Dynamic Mechanical Analysis (DMA), Viscoelastic Loss Modulus & Glass Transition (Tg) Engine
// Standards: IUPAC Polymer Division & ISO 6721 / ASTM D4065 Dynamic Mechanical Testing Standards
// Curriculum: Vietnam GDPT 2018 (Hóa học 12: Đại cương về polymer, vật liệu polymer - chất dẻo, cao su, tơ sợi, vật liệu composite; Vật lý 12: Biến dạng cơ học của vật rắn, dao động cưỡng bức có ma sát và tiêu tán năng lượng nhiệt)

export const UNIVERSAL_GAS_CONSTANT_R = 8.314462618; // J / (mol K)
export const WLF_C1_UNIVERSAL = 17.44; // Universal Williams-Landel-Ferry constant C1
export const WLF_C2_UNIVERSAL = 51.6; // Universal Williams-Landel-Ferry constant C2 (Kelvin)

export type DmaDeformationMode =
  | 'SINGLE_CANTILEVER'
  | 'DUAL_CANTILEVER'
  | 'THREE_POINT_BENDING'
  | 'TENSION_FILM'
  | 'SHEAR_SANDWICH';

export type PolymerClassification =
  | 'AMORPHOUS_THERMOPLASTIC'
  | 'CROSSLINKED_ELASTOMER'
  | 'SEMICRYSTALLINE_BIOPOLYMER'
  | 'THERMOSET_COMPOSITE'
  | 'FLUOROPOLYMER';

export interface SecondaryRelaxation {
  name: string; // e.g. "beta-relaxation (ester side-group rotation)"
  temperatureCelsius: number;
  activationEnergyKjPerMol: number;
  tanDeltaPeak: number;
}

export interface DmaStandard {
  id: string;
  name: string;
  vietnameseName: string;
  chemicalFormula: string;
  iupacPolymerName: string;
  monomerName: string;
  classification: PolymerClassification;
  deformationMode: DmaDeformationMode;
  glassTransitionTgCelsius: number; // T_g from tan delta peak (deg C)
  glassyStorageModulusPa: number; // E'_g (e.g. 3.2e9 Pa = 3.2 GPa)
  rubberyStorageModulusPa: number; // E'_r (e.g. 3.5e6 Pa = 3.5 MPa)
  peakTanDelta: number; // Maximum tan delta at T_g
  transitionWidthCelsius: number; // Delta T_w (typically 10 - 25 deg C)
  secondaryRelaxations: SecondaryRelaxation[];
  hasColdCrystallization: boolean; // e.g. PLA cold crystallization
  coldCrystallizationTempCelsius?: number;
  recrystallizedModulusPa?: number;
  meltingTempCelsius?: number; // T_m (deg C)
  description: string;
  curriculumNotes: string;
  engineeringApplication: string;
}

export interface DmaTemperaturePoint {
  temperatureCelsius: number;
  storageModulusEPrimePa: number; // E' (Pa)
  storageModulusLogPa: number; // log10(E')
  lossModulusEDoublePrimePa: number; // E'' (Pa)
  lossModulusLogPa: number; // log10(E'')
  tanDelta: number; // E'' / E'
  lossAngleDegrees: number; // delta = arctan(tanDelta) * 180 / pi
  viscoelasticState: 'GLASSY' | 'TRANSITION' | 'RUBBERY_PLATEAU' | 'TERMINAL_FLOW' | 'CRYSTALLINE';
}

export interface DmaFrequencySweepPoint {
  frequencyHz: number; // 0.01 to 100 Hz
  effectiveShiftFactorLogAT: number; // log10(a_T) from WLF
  masterCurveStorageModulusPa: number;
  masterCurveLossModulusPa: number;
  tanDelta: number;
}

export interface DmaSimulationResult {
  standard: DmaStandard;
  currentTemperatureCelsius: number;
  oscillationFrequencyHz: number;
  dynamicStrainPercent: number; // gamma_0 (e.g. 0.05%)
  storageModulusEPrimePa: number;
  lossModulusEDoublePrimePa: number;
  tanDelta: number;
  lossAngleDegrees: number;
  energyDissipationJPerM3Cycle: number; // Delta W = pi * sigma_0 * gamma_0 * sin(delta)
  viscoelasticState: 'GLASSY' | 'TRANSITION' | 'RUBBERY_PLATEAU' | 'TERMINAL_FLOW' | 'CRYSTALLINE';
  wlfShiftFactorLogAT: number;
  temperatureScanCurve: DmaTemperaturePoint[];
  frequencySweepCurve: DmaFrequencySweepPoint[];
}

/**
 * Standard Catalog: 5 Comprehensive DMA Benchmark Polymers & Composites
 */
export const DMA_STANDARD_CATALOG: DmaStandard[] = [
  {
    id: 'pmma_plexiglas',
    name: 'Poly(methyl methacrylate) (PMMA / Plexiglas)',
    vietnameseName: 'Thủy Tinh Hữu Cơ Plexiglas (PMMA - Nhiệt Độ Hóa Thủy Tinh Tg = 105°C & Tách Mức Beta)',
    chemicalFormula: '[C5O2H8]n',
    iupacPolymerName: 'poly(methyl 2-methylpropenoate)',
    monomerName: 'Methyl methacrylate (CH2=C(CH3)COOCH3)',
    classification: 'AMORPHOUS_THERMOPLASTIC',
    deformationMode: 'SINGLE_CANTILEVER',
    glassTransitionTgCelsius: 105.0,
    glassyStorageModulusPa: 3.2e9, // 3.2 GPa
    rubberyStorageModulusPa: 3.5e6, // 3.5 MPa (3-decade drop!)
    peakTanDelta: 0.85,
    transitionWidthCelsius: 15.0,
    secondaryRelaxations: [
      {
        name: 'β-relaxation (Ester side-group -COOCH3 rotation)',
        temperatureCelsius: 30.0,
        activationEnergyKjPerMol: 85.0,
        tanDeltaPeak: 0.06,
      },
    ],
    hasColdCrystallization: false,
    meltingTempCelsius: 160.0, // Thermoplastic softening / viscous flow
    description:
      'PMMA is the classic archetype of an amorphous thermoplastic with high optical clarity. In DMA, it demonstrates a massive 3-decade plunge in storage modulus E\' across its glass transition at 105°C, accompanied by a prominent sub-Tg β-relaxation at ~30°C originating from hindered rotation of the bulky ester side group (-COOCH3).',
    curriculumNotes:
      'GDPT 2018 Hóa học 12 (Bài Polymer & Chất dẻo): Phản ứng trùng hợp methyl methacrylate tạo plexiglas; nhiệt độ chuyển hóa thủy tinh xác định giới hạn nhiệt độ sử dụng an toàn (dưới 100°C vật liệu giòn và cứng, trên 105°C hóa dẻo mềm dẻo).',
    engineeringApplication:
      'Aircraft cockpit canopies, optical lenses, illuminated signs, and bone cements in orthopedics.',
  },
  {
    id: 'natural_rubber_polyisoprene',
    name: 'Vulcanized Natural Rubber (Cis-1,4-Polyisoprene)',
    vietnameseName: 'Cao Su Thiên Nhiên Lưu Hóa (Polyisoprene - Tg = -70°C & Hiện Tượng Hóa Thủy Tinh Âm Sâu)',
    chemicalFormula: '[C5H8]n + S crosslinks',
    iupacPolymerName: 'cis-1,4-polyisoprene, sulfur-vulcanized',
    monomerName: 'Isoprene (2-methylbuta-1,3-diene)',
    classification: 'CROSSLINKED_ELASTOMER',
    deformationMode: 'TENSION_FILM',
    glassTransitionTgCelsius: -70.0,
    glassyStorageModulusPa: 2.8e9, // 2.8 GPa below -70°C (shatters like glass)
    rubberyStorageModulusPa: 2.4e6, // 2.4 MPa at room temp (highly resilient entropic elasticity)
    peakTanDelta: 1.45,
    transitionWidthCelsius: 12.0,
    secondaryRelaxations: [],
    hasColdCrystallization: false,
    description:
      'Sulfur-vulcanized natural rubber operates comfortably on its rubbery plateau at room temperature (25°C), where entropic elasticity dominates with low damping loss (tan δ ~ 0.04) and high resilience. When immersed in liquid nitrogen below its sub-ambient Tg (-70°C), its modulus shoots up by >1000x into the glassy zone (2.8 GPa), causing the rubber to shatter on impact.',
    curriculumNotes:
      'GDPT 2018 Hóa học 12 (Bài Cao su): Cấu hình cis của polyisoprene, mạng lưới liên kết cầu disulfur (-S-S-) từ lưu hóa Goodyear; giải thích tại sao cao su giữ tính đàn hồi ở nhiệt độ thường và bị giòn gãy ở nhiệt độ cực thấp.',
    engineeringApplication:
      'Automotive tires, seismic vibration isolation dampers, aerospace O-rings, and conveyor belts.',
  },
  {
    id: 'polylactic_acid_pla',
    name: 'Poly(lactic acid) (PLA Bio-Polyester)',
    vietnameseName: 'Poly(lactic acid) Sinh Học (PLA - Tg = 60°C & Hiện Tượng Kết Tinh Nguội Tái Tăng Modulus)',
    chemicalFormula: '[C3H4O2]n',
    iupacPolymerName: 'poly(2-hydroxypropanoic acid)',
    monomerName: 'Lactic acid / Lactide cyclic dimer',
    classification: 'SEMICRYSTALLINE_BIOPOLYMER',
    deformationMode: 'THREE_POINT_BENDING',
    glassTransitionTgCelsius: 60.0,
    glassyStorageModulusPa: 3.5e9, // 3.5 GPa
    rubberyStorageModulusPa: 1.2e7, // Drops to 12 MPa at 70°C
    peakTanDelta: 0.95,
    transitionWidthCelsius: 10.0,
    secondaryRelaxations: [],
    hasColdCrystallization: true,
    coldCrystallizationTempCelsius: 100.0,
    recrystallizedModulusPa: 2.5e8, // Rebounds to 250 MPa due to spherulite formation!
    meltingTempCelsius: 175.0, // Final melting of crystallites
    description:
      'PLA is a renewable, biodegradable thermoplastic polyester synthesized from fermented corn starch. In DMA heating scans, it displays a fascinating dual-stage signature: after dropping sharply at Tg (60°C), the mobilized polymer chains organize into dense crystalline spherulites in a "cold crystallization" exotherm at ~100°C, causing the storage modulus E\' to surge back up twenty-fold before finally melting at 175°C.',
    curriculumNotes:
      'GDPT 2018 Hóa học 12 (Bài Hóa học xanh & Polymer sinh học): Este hóa trùng ngưng acid lactic, phân hủy sinh học bảo vệ môi trường, ứng dụng in 3D FDM và chỉ khâu tự tiêu y tế.',
    engineeringApplication:
      '3D printing filament, compostable packaging, agricultural mulching films, and biodegradable orthopedic screws.',
  },
  {
    id: 'epoxy_carbon_composite',
    name: 'Carbon Fiber / Epoxy Aerospace Composite',
    vietnameseName: 'Vật Liệu Composite Epoxy - Sợi Carbon Hàng Không (Tg = 180°C & Độ Cứng 65 GPa Siêu Cao)',
    chemicalFormula: 'DGEBA Epoxy + Amine Curing + Carbon Fiber Fabric',
    iupacPolymerName: 'bisphenol A diglycidyl ether crosslinked matrix with continuous carbon fibers',
    monomerName: 'DGEBA prepolymer + 4,4\'-diaminodiphenyl sulfone (DDS)',
    classification: 'THERMOSET_COMPOSITE',
    deformationMode: 'DUAL_CANTILEVER',
    glassTransitionTgCelsius: 180.0,
    glassyStorageModulusPa: 6.5e10, // 65 GPa!
    rubberyStorageModulusPa: 4.8e10, // 48 GPa (minimal drop due to reinforcing high-modulus fibers)
    peakTanDelta: 0.18, // Very low damping, maximum mechanical rigidity
    transitionWidthCelsius: 25.0,
    secondaryRelaxations: [],
    hasColdCrystallization: false,
    description:
      'Aerospace structural composites combine a densely crosslinked aromatic epoxy thermoset matrix with continuous high-strength carbon fibers. DMA demonstrates an exceptionally elevated Tg (180°C) with negligible modulus degradation even through the glass transition zone (retaining >45 GPa stiffness), ensuring structural integrity under supersonic aerodynamic heating.',
    curriculumNotes:
      'GDPT 2018 Hóa học 12 (Bài Vật liệu Composite): Chất nền (epoxy) liên kết mạng không gian 3 chiều và cốt sợi carbon chịu lực; so sánh độ bền riêng (tỷ số độ bền / khối lượng riêng) vượt trội hơn thép hợp kim.',
    engineeringApplication:
      'Boeing 787 / Airbus A350 fuselage and wings, Formula 1 monocoques, spacecraft heat-shield struts, and high-end bicycle frames.',
  },
  {
    id: 'ptfe_teflon',
    name: 'Polytetrafluoroethylene (PTFE / Teflon)',
    vietnameseName: 'Polytetrafluoroethylene (Teflon PTFE - Chuyển Pha Tinh Thể Xoắn 19°C/30°C & Tiêu Tán Siêu Thấp)',
    chemicalFormula: '[C2F4]n',
    iupacPolymerName: 'poly(1,1,2,2-tetrafluoroethene)',
    monomerName: 'Tetrafluoroethylene (CF2=CF2)',
    classification: 'FLUOROPOLYMER',
    deformationMode: 'SHEAR_SANDWICH',
    glassTransitionTgCelsius: 126.0,
    glassyStorageModulusPa: 1.8e9, // 1.8 GPa
    rubberyStorageModulusPa: 3.8e7, // 38 MPa
    peakTanDelta: 0.28,
    transitionWidthCelsius: 20.0,
    secondaryRelaxations: [
      {
        name: 'Crystal-crystal transition I (13/6 to 15/7 helix untwisting)',
        temperatureCelsius: 19.0,
        activationEnergyKjPerMol: 120.0,
        tanDeltaPeak: 0.05,
      },
      {
        name: 'Crystal-crystal transition II (rotational disordering)',
        temperatureCelsius: 30.0,
        activationEnergyKjPerMol: 95.0,
        tanDeltaPeak: 0.04,
      },
    ],
    hasColdCrystallization: false,
    meltingTempCelsius: 327.0, // Very high crystalline melting
    description:
      'PTFE is renowned for its chemical inertness, high melting temperature (327°C), and ultra-low friction. DMA uniquely resolves two subtle room-temperature crystalline phase transitions at 19°C and 30°C involving the untwisting of its stiff helical chains, while maintaining an exceptionally low damping factor (tan δ ~ 0.015) critical for high-frequency RF dielectric substrates.',
    curriculumNotes:
      'GDPT 2018 Hóa học 12 (Bài Dẫn xuất Halogen & Polymer): Liên kết C-F cực bền (năng lượng liên kết 485 kJ/mol), trơ hóa học tuyệt đối với acid, kiềm và chất oxy hóa mạnh; giải thích tính chất trượt chống dính.',
    engineeringApplication:
      'Non-stick cookware coatings, chemical valve gaskets, high-frequency 5G RF circuit boards, and surgical vascular grafts.',
  },
];

/**
 * Calculate WLF (Williams-Landel-Ferry) shift factor: log10(a_T)
 * log10(a_T) = - (C1 * (T - Tg)) / (C2 + (T - Tg))
 */
export function calculateWlfShiftFactorLogAT(
  tempCelsius: number,
  tgCelsius: number,
  c1: number = WLF_C1_UNIVERSAL,
  c2: number = WLF_C2_UNIVERSAL
): number {
  const deltaT = tempCelsius - tgCelsius;
  if (deltaT === 0) return 0;
  const denominator = c2 + deltaT;
  if (denominator <= 0) {
    // Below WLF validity limit (Tg - 50 K)
    return -deltaT * 0.35;
  }
  return (-c1 * deltaT) / denominator;
}

/**
 * Calculate Storage Modulus E' (Pa), Loss Modulus E'' (Pa), and Tan Delta at a given temperature
 */
export function calculateDynamicModuliAtTemperature(
  tempCelsius: number,
  standard: DmaStandard,
  frequencyHz: number = 1.0
): {
  storageModulusEPrimePa: number;
  lossModulusEDoublePrimePa: number;
  tanDelta: number;
  lossAngleDegrees: number;
  viscoelasticState: 'GLASSY' | 'TRANSITION' | 'RUBBERY_PLATEAU' | 'TERMINAL_FLOW' | 'CRYSTALLINE';
} {
  const tg = standard.glassTransitionTgCelsius;
  const eg = standard.glassyStorageModulusPa;
  const er = standard.rubberyStorageModulusPa;
  const tw = standard.transitionWidthCelsius;

  // Frequency shift on apparent Tg: empirical ~ +7 K per decade of frequency
  const freqShiftDeg = 7.0 * Math.log10(Math.max(0.001, frequencyHz));
  const effectiveTg = tg + freqShiftDeg;

  // 1. Storage Modulus E'(T): Sigmoidal drop across Tg
  // E'(T) = E_r + (E_g - E_r) / 2 * [1 - tanh((T - effectiveTg) / tw)]
  const tanhVal = Math.tanh((tempCelsius - effectiveTg) / tw);
  let ePrime = er + ((eg - er) / 2) * (1 - tanhVal);

  // 2. Secondary relaxations (e.g. beta-transition)
  let secondaryLossBonus = 0;
  for (const sec of standard.secondaryRelaxations) {
    const secDist = tempCelsius - sec.temperatureCelsius;
    const secHwhm = 12.0;
    const secFactor = 1 / (1 + (secDist * secDist) / (secHwhm * secHwhm));
    secondaryLossBonus += sec.tanDeltaPeak * secFactor;
  }

  // 3. Handle Cold Crystallization (PLA)
  if (
    standard.hasColdCrystallization &&
    standard.coldCrystallizationTempCelsius !== undefined &&
    standard.recrystallizedModulusPa !== undefined
  ) {
    const tCold = standard.coldCrystallizationTempCelsius;
    const tM = standard.meltingTempCelsius || 175.0;
    if (tempCelsius >= tCold - 15 && tempCelsius < tM) {
      // Modulus rebounds due to crystallization
      const crystallizeProgress = 0.5 * (1 + Math.tanh((tempCelsius - tCold) / 8.0));
      const crystalE = er + (standard.recrystallizedModulusPa - er) * crystallizeProgress;
      // Before melting
      if (tempCelsius > tM - 15) {
        const meltFactor = 0.5 * (1 - Math.tanh((tempCelsius - tM) / 5.0));
        ePrime = crystalE * meltFactor;
      } else {
        ePrime = Math.max(ePrime, crystalE);
      }
    }
  }

  // 4. Handle Melting / Terminal Flow at very high temperature
  if (
    standard.meltingTempCelsius !== undefined &&
    tempCelsius > standard.meltingTempCelsius - 20 &&
    !standard.hasColdCrystallization
  ) {
    const meltFactor = 0.5 * (1 - Math.tanh((tempCelsius - standard.meltingTempCelsius) / 8.0));
    ePrime = Math.max(1e5, ePrime * meltFactor);
  }

  // 5. Tan Delta & Loss Modulus E''(T)
  // Modeled with characteristic Havriliak-Negami / Zener bell curve peaking at Tg
  const sech = 1 / Math.cosh((tempCelsius - effectiveTg) / tw);
  const primaryTanDelta = standard.peakTanDelta * (sech * sech);
  const baselineDamping = 0.015; // elastic baseline damping
  const tanDelta = primaryTanDelta + baselineDamping + secondaryLossBonus;

  // Loss Modulus E''(T) = E'(T) * tan(delta)
  let eDoublePrime = ePrime * tanDelta;

  // Sanity clamp: Loss cannot be negative
  eDoublePrime = Math.max(1e4, eDoublePrime);
  ePrime = Math.max(1e5, ePrime);

  const lossAngleRad = Math.atan(tanDelta);
  const lossAngleDegrees = (lossAngleRad * 180) / Math.PI;

  // Viscoelastic State Classification
  let state: 'GLASSY' | 'TRANSITION' | 'RUBBERY_PLATEAU' | 'TERMINAL_FLOW' | 'CRYSTALLINE' = 'GLASSY';
  if (tempCelsius < effectiveTg - tw * 0.8) {
    state = 'GLASSY';
  } else if (tempCelsius >= effectiveTg - tw * 0.8 && tempCelsius <= effectiveTg + tw * 1.2) {
    state = 'TRANSITION';
  } else if (
    standard.hasColdCrystallization &&
    standard.coldCrystallizationTempCelsius !== undefined &&
    tempCelsius >= standard.coldCrystallizationTempCelsius
  ) {
    state = 'CRYSTALLINE';
  } else if (
    standard.meltingTempCelsius !== undefined &&
    tempCelsius >= standard.meltingTempCelsius - 5
  ) {
    state = 'TERMINAL_FLOW';
  } else {
    state = 'RUBBERY_PLATEAU';
  }

  return {
    storageModulusEPrimePa: ePrime,
    lossModulusEDoublePrimePa: eDoublePrime,
    tanDelta,
    lossAngleDegrees,
    viscoelasticState: state,
  };
}

/**
 * Generate full temperature sweep scan curve (typically -100°C to +220°C)
 */
export function generateDmaTemperatureScan(
  standard: DmaStandard,
  tempStartCelsius: number = -100,
  tempEndCelsius: number = 220,
  stepCelsius: number = 2.0,
  frequencyHz: number = 1.0
): DmaTemperaturePoint[] {
  const points: DmaTemperaturePoint[] = [];

  for (let t = tempStartCelsius; t <= tempEndCelsius; t += stepCelsius) {
    const moduli = calculateDynamicModuliAtTemperature(t, standard, frequencyHz);
    points.push({
      temperatureCelsius: Math.round(t * 10) / 10,
      storageModulusEPrimePa: moduli.storageModulusEPrimePa,
      storageModulusLogPa: Math.log10(moduli.storageModulusEPrimePa),
      lossModulusEDoublePrimePa: moduli.lossModulusEDoublePrimePa,
      lossModulusLogPa: Math.log10(moduli.lossModulusEDoublePrimePa),
      tanDelta: Math.round(moduli.tanDelta * 1000) / 1000,
      lossAngleDegrees: Math.round(moduli.lossAngleDegrees * 10) / 10,
      viscoelasticState: moduli.viscoelasticState,
    });
  }

  return points;
}

/**
 * Generate frequency sweep curve (0.01 Hz to 100 Hz) with WLF master curve shift
 */
export function generateDmaFrequencySweep(
  standard: DmaStandard,
  tempCelsius: number
): DmaFrequencySweepPoint[] {
  const frequencies = [0.01, 0.02, 0.05, 0.1, 0.2, 0.5, 1.0, 2.0, 5.0, 10.0, 20.0, 50.0, 100.0];
  const shiftLogAT = calculateWlfShiftFactorLogAT(tempCelsius, standard.glassTransitionTgCelsius);

  return frequencies.map((freq) => {
    const moduli = calculateDynamicModuliAtTemperature(tempCelsius, standard, freq);
    return {
      frequencyHz: freq,
      effectiveShiftFactorLogAT: shiftLogAT,
      masterCurveStorageModulusPa: moduli.storageModulusEPrimePa,
      masterCurveLossModulusPa: moduli.lossModulusEDoublePrimePa,
      tanDelta: moduli.tanDelta,
    };
  });
}

/**
 * Simulate end-to-end DMA measurement
 */
export function simulateDmaMeasurement(
  standard: DmaStandard,
  temperatureCelsius: number,
  frequencyHz: number = 1.0,
  dynamicStrainPercent: number = 0.05
): DmaSimulationResult {
  const moduli = calculateDynamicModuliAtTemperature(temperatureCelsius, standard, frequencyHz);
  const shiftLogAT = calculateWlfShiftFactorLogAT(temperatureCelsius, standard.glassTransitionTgCelsius);

  // Dissipated mechanical energy per unit volume per oscillation cycle:
  // Delta W = pi * sigma_0 * gamma_0 * sin(delta) = pi * gamma_0^2 * E''
  const strainFraction = dynamicStrainPercent / 100.0;
  const energyDissipation =
    Math.PI * strainFraction * strainFraction * moduli.lossModulusEDoublePrimePa;

  // Temperature scan range adjusted for specific polymer
  const minTemp = standard.glassTransitionTgCelsius < 0 ? -120 : -20;
  const maxTemp = (standard.meltingTempCelsius || standard.glassTransitionTgCelsius + 80) + 20;

  const temperatureScanCurve = generateDmaTemperatureScan(standard, minTemp, maxTemp, 2.0, frequencyHz);
  const frequencySweepCurve = generateDmaFrequencySweep(standard, temperatureCelsius);

  return {
    standard,
    currentTemperatureCelsius: temperatureCelsius,
    oscillationFrequencyHz: frequencyHz,
    dynamicStrainPercent,
    storageModulusEPrimePa: moduli.storageModulusEPrimePa,
    lossModulusEDoublePrimePa: moduli.lossModulusEDoublePrimePa,
    tanDelta: moduli.tanDelta,
    lossAngleDegrees: moduli.lossAngleDegrees,
    energyDissipationJPerM3Cycle: Math.round(energyDissipation * 1000) / 1000,
    viscoelasticState: moduli.viscoelasticState,
    wlfShiftFactorLogAT: Math.round(shiftLogAT * 100) / 100,
    temperatureScanCurve,
    frequencySweepCurve,
  };
}

/**
 * Match card to corresponding DMA Polymer Standard
 */
export function getMatchingDmaCard(card: any): DmaStandard | null {
  if (!card) return null;
  const cardName = (card.name || '').toLowerCase();
  const cardFormula = (card.formula || '').toLowerCase();
  const cardCategory = (card.category || '').toLowerCase();

  // 1. PMMA / Plexiglas
  if (
    cardName.includes('pmma') ||
    cardName.includes('plexiglas') ||
    cardName.includes('thủy tinh hữu cơ') ||
    cardFormula.includes('c5o2h8')
  ) {
    return DMA_STANDARD_CATALOG.find((s) => s.id === 'pmma_plexiglas') || null;
  }

  // 2. Natural Rubber / Polyisoprene
  if (
    cardName.includes('cao su') ||
    cardName.includes('polyisoprene') ||
    cardName.includes('rubber') ||
    cardFormula.includes('c5h8')
  ) {
    return DMA_STANDARD_CATALOG.find((s) => s.id === 'natural_rubber_polyisoprene') || null;
  }

  // 3. PLA / Polylactic acid
  if (
    cardName.includes('pla') ||
    cardName.includes('polylactic') ||
    cardName.includes('lactic') ||
    cardFormula.includes('c3h4o2')
  ) {
    return DMA_STANDARD_CATALOG.find((s) => s.id === 'polylactic_acid_pla') || null;
  }

  // 4. Epoxy / Carbon fiber
  if (
    cardName.includes('composite') ||
    cardName.includes('epoxy') ||
    cardName.includes('carbon fiber') ||
    cardName.includes('sợi carbon')
  ) {
    return DMA_STANDARD_CATALOG.find((s) => s.id === 'epoxy_carbon_composite') || null;
  }

  // 5. PTFE / Teflon
  if (
    cardName.includes('teflon') ||
    cardName.includes('ptfe') ||
    cardName.includes('tetrafluoro') ||
    cardFormula.includes('c2f4')
  ) {
    return DMA_STANDARD_CATALOG.find((s) => s.id === 'ptfe_teflon') || null;
  }

  return null;
}

/**
 * Physics validity check for DMA standard
 */
export function validateDmaStandardPhysics(standard: DmaStandard): boolean {
  if (standard.glassyStorageModulusPa <= 0) return false;
  if (standard.rubberyStorageModulusPa <= 0) return false;
  if (standard.glassyStorageModulusPa <= standard.rubberyStorageModulusPa) return false;
  if (standard.peakTanDelta <= 0 || standard.peakTanDelta > 5.0) return false;
  if (standard.transitionWidthCelsius <= 0 || standard.transitionWidthCelsius > 60) return false;
  return true;
}
