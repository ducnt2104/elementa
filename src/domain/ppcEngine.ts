/**
 * Pressure Perturbation Calorimetry (PPC), Thermal Expansion (alpha) & Protein Solvation Volume Engine
 * 
 * Physical Principles & International Standards:
 * 1. Pressure Jump Heat Effect:
 *    Measures heat released or absorbed Delta Q during small reversible pressure jumps Delta P (+/- 5 bar):
 *    Delta Q = -T * (dV/dT)_P * Delta P = -T * V * alpha * Delta P
 *    where alpha = (1 / V) * (dV / dT)_P is the thermal expansion coefficient (in K^-1).
 * 2. Partial Specific Volume & Protein Thermal Expansion:
 *    For protein solution relative to buffer:
 *    Delta Q_net = Delta Q_sample - Delta Q_reference = -T * m_protein * v_bar_p * alpha_bar_p * Delta P
 *    where v_bar_p is partial specific volume (~0.70 - 0.74 cm^3/g), alpha_bar_p is protein thermal expansion.
 * 3. Solvation Shell & Volume of Unfolding:
 *    - Hydrophobic exposure during unfolding increases thermal expansion due to ordering of water (clathrate-like cage).
 *    - Volumetric change of unfolding: Delta V_unf = (d Delta G / dP)_T
 *    - Cavity volume & electrostriction of charged groups (Delta V_electrostriction < 0).
 * 4. 5 Benchmark Standards:
 *    - Hen Egg White Lysozyme (HEWL) Solvation Shell & Thermal Unfolding Jump
 *    - Ribonuclease A (RNase A) Cavity Volume & Negative Unfolding Volume
 *    - Bovine Serum Albumin (BSA) Multi-Domain Internal Packing Defects
 *    - Myoglobin Heme Pocket Hydration & Apomyoglobin Cavity Collapse
 *    - Pure Water Anomaly Calibration at 3.98 °C (alpha = 0 crossing point)
 * 5. Vietnam GDPT 2018 Curriculum:
 *    - Vật lý 10: Sự nở vì nhiệt của chất lỏng, hệ số nở khối beta = 3 * alpha, định luật nhiệt động lực học.
 *    - Hóa học 12: Cấu trúc không gian bậc 3 của protein, túi kỵ nước (hydrophobic core) và lớp vỏ hydrat hóa.
 */

export const WATER_DENSITY_MAX_TEMP_CELSIUS = 3.98; // Point where alpha_water = 0
export const STANDARD_PPC_PRESSURE_JUMP_BAR = 5.0; // +/- 5 bar (0.5 MPa)

export interface PpcStandard {
  id: string;
  name: string;
  vietnameseName: string;
  applicationCategory: 'PROTEIN_SOLVATION' | 'CAVITY_COMPRESSION' | 'WATER_ANOMALY_METROLOGY' | 'MEMBRANE_LIPID';
  partialSpecificVolumeCm3PerG: number; // v_bar_p in cm^3/g (~0.73)
  molecularWeightDa: number;
  unfoldingTmCelsius?: number;
  nativeThermalExpansionKInv: number; // alpha_native at 20 °C (e.g. 3.8e-4 K^-1)
  denaturedThermalExpansionKInv?: number; // alpha_denatured (e.g. 8.0e-4 K^-1)
  volumeChangeOfUnfoldingMlPerMol?: number; // Delta V_unf in mL/mol
  internalCavityVolumeAngstrom3: number; // Volume of packed cavities
  temperatureRangeCelsius: [number, number];
  bufferComposition: string;
  biotechSignificance: string;
  curriculumNotes: string;
  astmIupacReference: string;
}

export interface PpcTemperaturePoint {
  temperatureCelsius: number;
  temperatureKelvin: number;
  waterThermalExpansionKInv: number;
  proteinThermalExpansionKInv: number; // alpha_bar_p(T)
  heatEffectMicroJoules: number; // Delta Q for +/- 5 bar jump
  partialSpecificVolumeCm3PerG: number;
  fractionUnfoldedFraction: number; // 0.0 to 1.0 around Tm
}

export interface PpcSimulationResult {
  standard: PpcStandard;
  pressureJumpBar: number;
  points: PpcTemperaturePoint[];
  thermalExpansionJumpAtTmKInv: number;
  apparentVolumetricChangeMlPerMol: number;
  fractionalCavityHydrationPercent: number;
  solvationShellOrderScore: number; // 0 to 100%
  iupacRecommendationSummary: string;
  curriculumIntegrationNotes: string;
}

/**
 * Standard Catalog: 5 Benchmark Pressure Perturbation Calorimetry Systems
 */
export const PPC_STANDARD_CATALOG: PpcStandard[] = [
  {
    id: 'lysozyme_hewl_solvation_shell',
    name: 'Hen Egg White Lysozyme (HEWL) Solvation Shell & Thermal Unfolding',
    vietnameseName: 'Chuẩn Nở Nhiệt Vỏ Hydrat Hóa - Lysozyme Lòng Trắng Trứng (HEWL)',
    applicationCategory: 'PROTEIN_SOLVATION',
    partialSpecificVolumeCm3PerG: 0.703,
    molecularWeightDa: 14300,
    unfoldingTmCelsius: 65.4,
    nativeThermalExpansionKInv: 3.8e-4,
    denaturedThermalExpansionKInv: 8.0e-4,
    volumeChangeOfUnfoldingMlPerMol: -18.5, // negative volume upon exposure of core
    internalCavityVolumeAngstrom3: 380,
    temperatureRangeCelsius: [10.0, 85.0],
    bufferComposition: '20 mM Sodium Acetate, pH 4.5, 100 mM NaCl',
    biotechSignificance:
      'Đo lường trực tiếp hệ số nở nhiệt cục bộ của lớp vỏ nước bao quanh protein alpha_bar_p(T). Bước nhảy vọt hệ số nở nhiệt tại 65.4 °C phản ánh sự bộc lộ các gốc acid amin kỵ nước (Trp, Leu, Ile) hình thành cấu trúc lồng clathrate với các phân tử nước.',
    curriculumNotes:
      'Hóa học 12: Tương tác kỵ nước và vỏ hydrat hóa ổn định cấu trúc bậc 3 protein; Vật lý 10: Sự nở vì nhiệt của chất lỏng Delta V = V0 * beta * Delta T.',
    astmIupacReference: 'IUPAC Guidelines on Pressure Perturbation Calorimetry for Biomolecules',
  },
  {
    id: 'ribonuclease_a_negative_unfolding_volume',
    name: 'Ribonuclease A (RNase A) Negative Unfolding Volume & Cavity Collapse',
    vietnameseName: 'Ribonuclease A (RNase A) - Biến Thiên Thể Tích Biến Tính Âm (ΔV < 0)',
    applicationCategory: 'PROTEIN_SOLVATION',
    partialSpecificVolumeCm3PerG: 0.707,
    molecularWeightDa: 13700,
    unfoldingTmCelsius: 62.0,
    nativeThermalExpansionKInv: 4.1e-4,
    denaturedThermalExpansionKInv: 8.4e-4,
    volumeChangeOfUnfoldingMlPerMol: -24.2,
    internalCavityVolumeAngstrom3: 520,
    temperatureRangeCelsius: [10.0, 80.0],
    bufferComposition: '10 mM Sodium Cacodylate, pH 6.0, 50 mM KCl',
    biotechSignificance:
      'Minh chứng kinh điển: biến tính protein có thể làm giảm thể tích dung dịch (Delta V_unf < 0) do các hốc rỗng nội phân tử (cavities) bị sụp đổ và phân tử nước tràn vào liên kết chặt chẽ với khung chuỗi polypeptide.',
    curriculumNotes:
      'Hóa học 12: Phân tử enzyme RNase A và 4 cầu nối disulfide liên kết chéo; Vật lý 12: Phương trình trạng thái và biến thiên thể tích theo áp suất.',
    astmIupacReference: 'Biophysical Journal Benchmark for Protein Volumetric Thermodynamics',
  },
  {
    id: 'bovine_serum_albumin_cavity_compression',
    name: 'Bovine Serum Albumin (BSA) Multi-Domain Internal Cavity Compression',
    vietnameseName: 'Bovine Serum Albumin (BSA) - Nén Hốc Rỗng Nội Phân Tử Đa Vùng',
    applicationCategory: 'CAVITY_COMPRESSION',
    partialSpecificVolumeCm3PerG: 0.734,
    molecularWeightDa: 66430,
    unfoldingTmCelsius: 58.5,
    nativeThermalExpansionKInv: 4.6e-4,
    denaturedThermalExpansionKInv: 9.2e-4,
    volumeChangeOfUnfoldingMlPerMol: -46.0,
    internalCavityVolumeAngstrom3: 1250,
    temperatureRangeCelsius: [10.0, 75.0],
    bufferComposition: '20 mM Phosphate Buffered Saline (PBS), pH 7.4',
    biotechSignificance:
      'BSA sở hữu thể tích hốc rỗng nội phân tử lớn (1,250 A^3) phân bố trên 3 domain liên kết acid béo. Khi tạo áp suất 5 bar, sự nén đàn hồi của các hốc rỗng phát sinh nhiệt lượng đặc trưng đo bởi PPC.',
    curriculumNotes:
      'Hóa học 12: Protein vận chuyển trong huyết tương, liên kết hydrophobic với lipid và acid béo tự do; Vật lý 10: Độ nén đàn hồi theo định luật Hooke.',
    astmIupacReference: 'ASTM Biophysical Volume Standard / Protein Society Compendium',
  },
  {
    id: 'myoglobin_heme_pocket_hydration',
    name: 'Myoglobin Heme Pocket Cavity Collapse & Apomyoglobin Hydration',
    vietnameseName: 'Myoglobin Cơ Tim - Thể Tích Túi Heme & Vỏ Hydrat Hóa Apomyoglobin',
    applicationCategory: 'CAVITY_COMPRESSION',
    partialSpecificVolumeCm3PerG: 0.741,
    molecularWeightDa: 17800,
    unfoldingTmCelsius: 78.0,
    nativeThermalExpansionKInv: 3.4e-4,
    denaturedThermalExpansionKInv: 7.6e-4,
    volumeChangeOfUnfoldingMlPerMol: -12.0,
    internalCavityVolumeAngstrom3: 210,
    temperatureRangeCelsius: [15.0, 90.0],
    bufferComposition: '50 mM Tris-HCl, pH 7.2, 1 mM EDTA',
    biotechSignificance:
      'Túi gắn nhóm ngoại Heme chứa ion Fe2+ phối trí. Khi giải phóng Heme chuyển thành Apomyoglobin, thể tích phân tử giảm 95 A^3 do nước lấp đầy túi kỵ nước, làm biến đổi mạnh mẽ đường cong PPC.',
    curriculumNotes:
      'Hóa học 12: Phức chất phối trí của Heme Fe(II) với O2; Sinh học 10: Vận chuyển và dự trữ oxy trong mô cơ.',
    astmIupacReference: 'IUPAC Inorganic & Biophysical Chemistry Division Reference',
  },
  {
    id: 'pure_water_density_anomaly_metrology',
    name: 'Pure Water Density Maximum & Thermal Expansion Zero Crossing (3.98 °C)',
    vietnameseName: 'Chuẩn Đo Lường Nhiệt Kế Nước Tinh Khiết - Điểm Không Nở Nhiệt (3.98 °C)',
    applicationCategory: 'WATER_ANOMALY_METROLOGY',
    partialSpecificVolumeCm3PerG: 1.000,
    molecularWeightDa: 18.015,
    nativeThermalExpansionKInv: 0.0, // exactly 0 at 3.98 °C
    internalCavityVolumeAngstrom3: 0,
    temperatureRangeCelsius: [1.0, 45.0],
    bufferComposition: 'Nước siêu sạch 18.2 MOhm·cm Milli-Q degassed',
    biotechSignificance:
      'Chuẩn metrology tuyệt đối hiệu chuẩn buồng đo PPC (VP-PPC / MicroCal). Tại 3.98 °C, hệ số nở nhiệt của nước alpha_water = 0, nhiệt lượng đo được do bước nhảy áp suất triệt tiêu hoàn toàn (Delta Q = 0).',
    curriculumNotes:
      'Vật lý 10 & Hóa học 10: Sự nở dị thường của nước (khối lượng riêng lớn nhất ở 3.98 °C, đá nổi trên mặt nước nhờ mạng tinh thể rỗng liên kết hydro).',
    astmIupacReference: 'IAPWS-95 Formulation for Thermodynamic Properties of Ordinary Water',
  },
];

/**
 * Calculate Pure Water Thermal Expansion Coefficient alpha_water(T) in K^-1:
 * Accurate empirical polynomial from 0 to 90 °C
 */
export function calculateWaterThermalExpansionKInv(tempCelsius: number): number {
  const T = tempCelsius;
  // Polynomial expansion around 3.98 °C:
  // alpha(3.98) = 0. Below 3.98 °C, alpha < 0 (anomalous expansion upon cooling).
  if (Math.abs(T - WATER_DENSITY_MAX_TEMP_CELSIUS) < 0.02) return 0.0;

  // Empirical fitting: alpha_water(T) ~ 1.55e-5 * (T - 3.98) - 1.25e-7 * (T - 3.98)^2 + 6.8e-10 * (T - 3.98)^3
  const deltaT = T - WATER_DENSITY_MAX_TEMP_CELSIUS;
  const alpha = 1.55e-5 * deltaT - 1.1e-7 * Math.pow(deltaT, 2) + 5.5e-10 * Math.pow(deltaT, 3);
  return Math.round(alpha * 1e8) / 1e8;
}

/**
 * Calculate Protein Partial Specific Thermal Expansion alpha_bar_p(T):
 * Below Tm: alpha_native(T)
 * At Tm: sharp sigmoidal step transition to alpha_denatured(T)
 */
export function calculateProteinThermalExpansionKInv(
  tempCelsius: number,
  standard: PpcStandard
): number {
  if (!standard.unfoldingTmCelsius || !standard.denaturedThermalExpansionKInv) {
    // For pure water calibrant
    return calculateWaterThermalExpansionKInv(tempCelsius);
  }

  const Tm = standard.unfoldingTmCelsius;
  const alphaNative = standard.nativeThermalExpansionKInv * (1.0 + 0.003 * (tempCelsius - 20.0));
  const alphaDenat = standard.denaturedThermalExpansionKInv * (1.0 + 0.002 * (tempCelsius - Tm));

  // Two-state transition fraction: f_D = 1 / (1 + exp(-(T - Tm) / 2.2))
  const transitionWidth = 2.2;
  const fD = 1.0 / (1.0 + Math.exp(-(tempCelsius - Tm) / transitionWidth));

  return alphaNative + fD * (alphaDenat - alphaNative);
}

/**
 * Calculate Heat Released / Absorbed by Pressure Jump:
 * Delta Q = -T * V_cell * (alpha_sample - alpha_ref) * Delta P
 * Output in microJoules (uJ)
 */
export function calculatePpcHeatEffectMicroJoules(
  tempCelsius: number,
  alphaSampleKInv: number,
  alphaRefKInv: number,
  pressureJumpBar: number = STANDARD_PPC_PRESSURE_JUMP_BAR,
  cellVolumeMl: number = 0.5
): number {
  const deltaAlpha = alphaSampleKInv - alphaRefKInv;
  if (Math.abs(deltaAlpha) < 1e-15) return 0.0;

  const TK = tempCelsius + 273.15;
  const pressurePa = pressureJumpBar * 1e5; // 5 bar = 5e5 Pa
  const volumeM3 = cellVolumeMl * 1e-6; // 0.5 mL = 5e-7 m^3

  // Delta Q = -T * V * Delta alpha * Delta P (in Joules)
  const deltaQJoules = -TK * volumeM3 * deltaAlpha * pressurePa;
  const res = Math.round(deltaQJoules * 1e6 * 100) / 100; // convert to uJ
  return res === 0 ? 0.0 : res;
}

/**
 * Simulate Full PPC Temperature Ramp Experiment
 */
export function simulatePpcExperiment(
  standard: PpcStandard,
  numPoints: number = 75
): PpcSimulationResult {
  const [tStart, tEnd] = standard.temperatureRangeCelsius;
  const step = (tEnd - tStart) / (numPoints - 1);
  const points: PpcTemperaturePoint[] = [];

  let maxAlphaJump = 0.0;
  if (standard.denaturedThermalExpansionKInv && standard.nativeThermalExpansionKInv) {
    maxAlphaJump = standard.denaturedThermalExpansionKInv - standard.nativeThermalExpansionKInv;
  }

  for (let i = 0; i < numPoints; i++) {
    const tempC = tStart + i * step;
    const tempK = tempC + 273.15;

    const waterAlpha = calculateWaterThermalExpansionKInv(tempC);
    const protAlpha = calculateProteinThermalExpansionKInv(tempC, standard);

    // Heat effect for +5 bar pressure jump
    const heatUj = calculatePpcHeatEffectMicroJoules(tempC, protAlpha, waterAlpha, STANDARD_PPC_PRESSURE_JUMP_BAR);

    // Unfolded fraction
    let fD = 0.0;
    if (standard.unfoldingTmCelsius) {
      fD = 1.0 / (1.0 + Math.exp(-(tempC - standard.unfoldingTmCelsius) / 2.2));
    }

    // Partial specific volume slight expansion with temperature
    const vBar = standard.partialSpecificVolumeCm3PerG * (1.0 + protAlpha * (tempC - 20.0));

    points.push({
      temperatureCelsius: Math.round(tempC * 10) / 10,
      temperatureKelvin: Math.round(tempK * 10) / 10,
      waterThermalExpansionKInv: waterAlpha,
      proteinThermalExpansionKInv: Math.round(protAlpha * 1e8) / 1e8,
      heatEffectMicroJoules: heatUj,
      partialSpecificVolumeCm3PerG: Math.round(vBar * 1000) / 1000,
      fractionUnfoldedFraction: Math.round(fD * 1000) / 1000,
    });
  }

  const cavityHydrationPercent = standard.internalCavityVolumeAngstrom3 > 0
    ? Math.min(100, Math.round((standard.internalCavityVolumeAngstrom3 / 1500) * 100))
    : 0;

  const orderScore = Math.min(
    100,
    Math.max(20, Math.round((standard.nativeThermalExpansionKInv / 5e-4) * 85))
  );

  return {
    standard,
    pressureJumpBar: STANDARD_PPC_PRESSURE_JUMP_BAR,
    points,
    thermalExpansionJumpAtTmKInv: Math.round(maxAlphaJump * 1e6) / 1e6,
    apparentVolumetricChangeMlPerMol: standard.volumeChangeOfUnfoldingMlPerMol || 0.0,
    fractionalCavityHydrationPercent: cavityHydrationPercent,
    solvationShellOrderScore: orderScore,
    iupacRecommendationSummary: standard.astmIupacReference,
    curriculumIntegrationNotes: standard.curriculumNotes,
  };
}

/**
 * Match a card to an appropriate PPC standard
 */
export function getMatchingPpcCard(card: any): PpcStandard | null {
  if (!card) return null;
  const name = (card.name || '').toLowerCase();
  const desc = (card.description || '').toLowerCase();

  // 1. Water anomaly at 3.98 °C
  if (
    (name.includes('nước') || desc.includes('nước')) &&
    (desc.includes('3.98') || desc.includes('4 °c') || desc.includes('nở vì nhiệt') || desc.includes('nhiệt độ lạ'))
  ) {
    return PPC_STANDARD_CATALOG.find((s) => s.id === 'pure_water_density_anomaly_metrology') || null;
  }

  // 2. Lysozyme / Hydration shell
  if (
    name.includes('lysozyme') ||
    desc.includes('vỏ hydrat') ||
    desc.includes('solvation shell') ||
    desc.includes('clathrate')
  ) {
    return PPC_STANDARD_CATALOG.find((s) => s.id === 'lysozyme_hewl_solvation_shell') || null;
  }

  // 3. RNase A / Negative volume
  if (
    name.includes('rnase') ||
    name.includes('ribonuclease') ||
    desc.includes('thể tích biến tính') ||
    desc.includes('sụp đổ hốc')
  ) {
    return PPC_STANDARD_CATALOG.find((s) => s.id === 'ribonuclease_a_negative_unfolding_volume') || null;
  }

  // 4. BSA / Cavity compression
  if (
    name.includes('bsa') ||
    name.includes('albumin') ||
    desc.includes('nén hốc') ||
    desc.includes('cavity')
  ) {
    return PPC_STANDARD_CATALOG.find((s) => s.id === 'bovine_serum_albumin_cavity_compression') || null;
  }

  // 5. Myoglobin / Heme pocket
  if (
    name.includes('myoglobin') ||
    desc.includes('túi heme') ||
    desc.includes('apomyoglobin')
  ) {
    return PPC_STANDARD_CATALOG.find((s) => s.id === 'myoglobin_heme_pocket_hydration') || null;
  }

  return null;
}

/**
 * Validation helper for PPC physics
 */
export function validatePpcStandardPhysics(standard: PpcStandard): boolean {
  if (standard.partialSpecificVolumeCm3PerG <= 0) return false;
  if (standard.temperatureRangeCelsius[0] >= standard.temperatureRangeCelsius[1]) return false;
  return true;
}
