// src/domain/spectrophotometryEngine.ts
// ============================================================================
// ELEMENTA SPECTROPHOTOMETRY, BEER-LAMBERT LAW & ANALYTICAL CHEMISTRY ENGINE
// Standard: IUPAC Gold Book & Vietnam GDPT 2018 Chemistry 10, 11 & 12
// Covers: Beer-Lambert Law (A = ε·l·c), Transmittance-Absorbance Conversion,
// Photometric Error Analysis (Twyman-Lothian), Calibration Curve Regression (OLS),
// Limits of Detection (LOD) & Quantitation (LOQ), Complementary Color Spectrum,
// Stray Light & High Concentration Deviations, and Benchmark Standard Analytes.
// ============================================================================

export interface SpectroStandard {
  id: string;
  name: string;
  vietnameseName: string;
  chemicalFormula: string;
  colorName: string;
  solutionColorHex: string;
  absorbedColorName: string;
  absorbedColorHex: string;
  lambdaMaxNm: number; // Peak absorption wavelength (nm)
  molarAbsorptivity: number; // Molar extinction coefficient ε (L·mol⁻¹·cm⁻¹)
  electronicTransition: string; // e.g., LMCT, d-d, π→π*
  curriculumGrade: 'Grade 10' | 'Grade 11' | 'Grade 12' | 'Chuyên / Olympic';
  description: string;
  practicalApplications: string[];
  defaultPathLengthCm: number;
  typicalConcRangeM: { min: number; max: number };
}

export interface CalibrationPoint {
  concentrationM: number;
  absorbance: number;
  transmittancePct?: number;
}

export interface CalibrationRegressionResult {
  slope: number; // m in A = m·c + b
  intercept: number; // b in A = m·c + b
  rSquared: number; // Coefficient of determination R²
  pearsonR: number; // Pearson correlation coefficient r
  standardErrorOfEstimate: number; // Sy/x
  lodM: number; // Limit of Detection (3.3 · Sy/x / m)
  loqM: number; // Limit of Quantitation (10 · Sy/x / m)
  points: CalibrationPoint[];
}

export interface PhotometricMeasurement {
  pathLengthCm: number;
  concentrationM: number;
  molarAbsorptivity: number;
  theoreticalAbsorbance: number;
  apparentAbsorbance: number; // With stray light & high-concentration effects
  transmittance: number; // T = I / I0 (0 to 1)
  transmittancePct: number; // %T = 100 · T
  relativePhotometricErrorPct: number; // Twyman-Lothian error (assuming ΔT = 0.005)
  withinOptimumRange: boolean; // True if A in [0.2, 0.8]
  lightAbsorbedColor: string;
  solutionApparentColor: string;
}

export interface ComplementaryColorPair {
  minWavelengthNm: number;
  maxWavelengthNm: number;
  absorbedColor: string;
  absorbedHex: string;
  transmittedColor: string;
  transmittedHex: string;
}

// ----------------------------------------------------------------------------
// COMPLEMENTARY COLOR PAIRINGS (VIS-SPECTRUM 380 - 780 nm)
// ----------------------------------------------------------------------------
export const COMPLEMENTARY_COLOR_TABLE: readonly ComplementaryColorPair[] = [
  { minWavelengthNm: 380, maxWavelengthNm: 435, absorbedColor: 'Tím (Violet)', absorbedHex: '#8B00FF', transmittedColor: 'Vàng - Lục (Yellow-Green)', transmittedHex: '#9ACD32' },
  { minWavelengthNm: 435, maxWavelengthNm: 480, absorbedColor: 'Chàm - Lam (Blue)', absorbedHex: '#0000FF', transmittedColor: 'Vàng (Yellow)', transmittedHex: '#FFD700' },
  { minWavelengthNm: 480, maxWavelengthNm: 490, absorbedColor: 'Lam - Lục (Green-Blue)', absorbedHex: '#008080', transmittedColor: 'Da cam (Orange)', transmittedHex: '#FFA500' },
  { minWavelengthNm: 490, maxWavelengthNm: 500, absorbedColor: 'Lục - Lam (Blue-Green)', absorbedHex: '#00FA9A', transmittedColor: 'Đỏ (Red)', transmittedHex: '#FF0000' },
  { minWavelengthNm: 500, maxWavelengthNm: 560, absorbedColor: 'Lục (Green)', absorbedHex: '#008000', transmittedColor: 'Tím hồng (Purple/Magenta)', transmittedHex: '#FF00FF' },
  { minWavelengthNm: 560, maxWavelengthNm: 580, absorbedColor: 'Vàng - Lục (Yellow-Green)', absorbedHex: '#9ACD32', transmittedColor: 'Tím biếc (Violet)', transmittedHex: '#8A2BE2' },
  { minWavelengthNm: 580, maxWavelengthNm: 595, absorbedColor: 'Vàng (Yellow)', absorbedHex: '#FFD700', transmittedColor: 'Lam (Blue)', transmittedHex: '#1E90FF' },
  { minWavelengthNm: 595, maxWavelengthNm: 650, absorbedColor: 'Da cam (Orange)', absorbedHex: '#FFA500', transmittedColor: 'Lam - Lục (Greenish-Blue)', transmittedHex: '#00CED1' },
  { minWavelengthNm: 650, maxWavelengthNm: 750, absorbedColor: 'Đỏ (Red)', absorbedHex: '#FF0000', transmittedColor: 'Lục - Lam / Xanh ngọc (Cyan)', transmittedHex: '#00FFFF' },
  { minWavelengthNm: 750, maxWavelengthNm: 850, absorbedColor: 'Hồng ngoại gần (Near-IR)', absorbedHex: '#800000', transmittedColor: 'Xanh da trời nhạt (Pale Cyan)', transmittedHex: '#87CEEB' },
];

// ----------------------------------------------------------------------------
// BENCHMARK SPECTROPHOTOMETRIC STANDARDS CATALOG
// ----------------------------------------------------------------------------
export const SPECTRO_STANDARDS: Record<string, SpectroStandard> = {
  kmno4: {
    id: 'kmno4',
    name: 'Potassium Permanganate',
    vietnameseName: 'Thuốc tím (Kali pemanganat)',
    chemicalFormula: 'KMnO4',
    colorName: 'Tím đậm / Tím hoa cà',
    solutionColorHex: '#800080',
    absorbedColorName: 'Lục (Green)',
    absorbedColorHex: '#008000',
    lambdaMaxNm: 525,
    molarAbsorptivity: 2400,
    electronicTransition: 'Chuyển dịch điện tích phối tử - kim loại (LMCT O²⁻ 2p → Mn⁷⁺ 3d)',
    curriculumGrade: 'Grade 10',
    description: 'Chất oxy hóa kinh điển trong chuẩn độ oxy hóa khử và trắc quang quang phổ UV-Vis. Dung dịch tím đậm do dải hấp thụ cực mạnh ở vùng ánh sáng màu lục (525 nm).',
    practicalApplications: [
      'Xác định nồng độ Fe²⁺ trong quặng hoặc nước thải bằng quang phổ UV-Vis',
      'Định lượng chỉ số Pemanganat (COD-Mn) đo hàm lượng chất hữu cơ trong nước',
      'Minh họa định luật Beer-Lambert chuẩn mực trong phòng thí nghiệm trường phổ thông',
    ],
    defaultPathLengthCm: 1.0,
    typicalConcRangeM: { min: 0.00005, max: 0.0008 },
  },
  cuso4: {
    id: 'cuso4',
    name: 'Copper(II) Sulfate Pentahydrate',
    vietnameseName: 'Đồng(II) sunfat ngậm nước ([Cu(H2O)6]²⁺)',
    chemicalFormula: 'CuSO4 · 5H2O',
    colorName: 'Xanh lam / Lam sáng',
    solutionColorHex: '#1E90FF',
    absorbedColorName: 'Đỏ / Cận hồng ngoại (Red/NIR)',
    absorbedColorHex: '#FF2400',
    lambdaMaxNm: 810,
    molarAbsorptivity: 12.6,
    electronicTransition: 'Chuyển mức năng lượng trường phối tử d-d (²Eg → ²T2g với biến dạng Jahn-Teller)',
    curriculumGrade: 'Grade 12',
    description: 'Phức chất bát diện của ion Cu²⁺ tạo màu xanh lam đặc trưng do hấp thụ mạnh ánh sáng đỏ và cận hồng ngoại (810 nm). Hệ số hấp thụ mol ε khiêm tốn (~12.6) do quy tắc chọn lọc Laporte cấm chuyển mức d-d.',
    practicalApplications: [
      'Định lượng ion Cu²⁺ trong dung dịch mạ điện và vi chất nông nghiệp',
      'Phức chất Biuret màu tím khi Cu²⁺ tạo phức peptide trong định lượng protein',
      'Minh họa hiện tượng méo mạng Jahn-Teller của cấu hình d⁹ trong trường phối tử',
    ],
    defaultPathLengthCm: 1.0,
    typicalConcRangeM: { min: 0.005, max: 0.1 },
  },
  k2cr2o7: {
    id: 'k2cr2o7',
    name: 'Potassium Dichromate',
    vietnameseName: 'Kali đicromat',
    chemicalFormula: 'K2Cr2O7',
    colorName: 'Da cam rực rỡ',
    solutionColorHex: '#FF8C00',
    absorbedColorName: 'Chàm - Lam / Tử ngoại gần (Blue/UV)',
    absorbedColorHex: '#0000CD',
    lambdaMaxNm: 350,
    molarAbsorptivity: 3150,
    electronicTransition: 'Chuyển dịch điện tích phối tử - kim loại (LMCT O²⁻ → Cr⁶⁺)',
    curriculumGrade: 'Grade 12',
    description: 'Chất oxy hóa chuẩn cấp 1 trong phép đo đicromat. Cân bằng Cr2O7²⁻ (da cam, môi trường axit) ⇌ 2CrO4²⁻ (vàng, môi trường kiềm) là bài học kinh điển về cân bằng hóa học ảnh hưởng đến quang phổ hấp thụ.',
    practicalApplications: [
      'Đo nồng độ cồn (Ethanol) trong khí thở của tài xế bằng máy đo nồng độ cồn',
      'Xác định chỉ số nhu cầu oxy hóa học (COD) trong quan trắc nước thải công nghiệp',
      'Nghiên cứu dịch chuyển phổ hấp thụ theo pH và cân bằng Cr(VI)',
    ],
    defaultPathLengthCm: 1.0,
    typicalConcRangeM: { min: 0.00005, max: 0.0005 },
  },
  fe_scn: {
    id: 'fe_scn',
    name: 'Iron(III) Thiocyanate Complex',
    vietnameseName: 'Phức sắt(III) thioxianat ([Fe(SCN)]²⁺)',
    chemicalFormula: '[Fe(NCS)]²⁺',
    colorName: 'Đỏ máu (Blood Red)',
    solutionColorHex: '#8B0000',
    absorbedColorName: 'Lam - Chàm (Blue)',
    absorbedColorHex: '#1E90FF',
    lambdaMaxNm: 447,
    molarAbsorptivity: 4700,
    electronicTransition: 'Chuyển dịch điện tích phối tử - kim loại (LMCT SCN⁻ π → Fe³⁺ 3d)',
    curriculumGrade: 'Grade 11',
    description: 'Phức chất có màu đỏ máu đặc trưng với hệ số ε rất lớn (4,700). Được sử dụng trong SGK Hóa học 11 để đo hằng số cân bằng hóa học Kc bằng phương pháp so màu đo quang.',
    practicalApplications: [
      'Xác định chính xác hằng số cân bằng Kc của phản ứng Fe³⁺ + SCN⁻ ⇌ [Fe(SCN)]²⁺',
      'Định lượng vết sắt trong dược phẩm và nước sinh hoạt',
      'Phát hiện dấu vết máu trong pháp y (phản ứng phối tử thiocyanate)',
    ],
    defaultPathLengthCm: 1.0,
    typicalConcRangeM: { min: 0.00002, max: 0.0003 },
  },
  nicl2: {
    id: 'nicl2',
    name: 'Nickel(II) Hexahydrate Complex',
    vietnameseName: 'Niken(II) ngậm nước ([Ni(H2O)6]²⁺)',
    chemicalFormula: '[Ni(H2O)6]²⁺',
    colorName: 'Xanh lục ngọc (Emerald Green)',
    solutionColorHex: '#2E8B57',
    absorbedColorName: 'Đỏ & Tím (Red & Violet)',
    absorbedColorHex: '#DC143C',
    lambdaMaxNm: 395,
    molarAbsorptivity: 5.5,
    electronicTransition: 'Chuyển mức d-d trong trường bát diện d⁸ (³A2g → ³T1g và ³A2g → ³T2g)',
    curriculumGrade: 'Grade 12',
    description: 'Dung dịch ion Ni²⁺ có màu xanh lục do sở hữu hai cực đại hấp thụ ở vùng tím (395 nm) và đỏ (720 nm), chỉ cho ánh sáng xanh lục ở khoảng 500-550 nm truyền qua mắt người nhìn thấy.',
    practicalApplications: [
      'Kiểm định chất lượng trong công nghệ mạ niken điện hóa',
      'Nghiên cứu phổ d-d kép trong thuyết trường tinh thể (Crystal Field Theory)',
      'Phát hiện dị ứng trang sức niken bằng phản ứng so màu dimethylglyoxime',
    ],
    defaultPathLengthCm: 1.0,
    typicalConcRangeM: { min: 0.01, max: 0.2 },
  },
  phenolphthalein: {
    id: 'phenolphthalein',
    name: 'Phenolphthalein Dianion (Alkaline)',
    vietnameseName: 'Chỉ thị phenolphtalein trong môi trường kiềm (pH > 8.2)',
    chemicalFormula: 'C20H12O4²⁻',
    colorName: 'Hồng cánh sen / Hồng thắm',
    solutionColorHex: '#FF1493',
    absorbedColorName: 'Lục - Vàng (Yellow-Green)',
    absorbedColorHex: '#32CD32',
    lambdaMaxNm: 553,
    molarAbsorptivity: 31000,
    electronicTransition: 'Chuyển mức π → π* trong hệ liên hợp quinonoid giải tỏa electron',
    curriculumGrade: 'Grade 11',
    description: 'Ở pH < 8.2, dạng lactone không màu do vòng trung tâm lai hóa sp³. Khi pH > 8.2, vòng mở thành ion dianion quinonoid phẳng với hệ liên hợp π rộng lớn, hấp thụ cực mạnh ở 553 nm tạo màu hồng cánh sen rực rỡ.',
    practicalApplications: [
      'Chỉ thị điểm tương đương chuẩn độ axit - bazơ chuẩn quốc gia',
      'Định lượng hoạt độ enzym phosphatase kiềm trong hóa sinh lâm sàng',
      'Thử nghiệm độ cacbonat hóa của kết cấu bê tông công trình xây dựng',
    ],
    defaultPathLengthCm: 1.0,
    typicalConcRangeM: { min: 0.000005, max: 0.00006 },
  },
  chlorophyll_a: {
    id: 'chlorophyll_a',
    name: 'Chlorophyll a',
    vietnameseName: 'Diệp lục a (Chlorophyll a)',
    chemicalFormula: 'C55H72MgN4O5',
    colorName: 'Xanh lục lá cây (Forest Green)',
    solutionColorHex: '#228B22',
    absorbedColorName: 'Đỏ (Dải Q) & Lam (Dải Soret)',
    absorbedColorHex: '#000080',
    lambdaMaxNm: 662,
    molarAbsorptivity: 86000,
    electronicTransition: 'Chuyển dịch vòng porphyrin nhân Magie π → π* (Q-band & Soret-band)',
    curriculumGrade: 'Grade 12',
    description: 'Sắc tố quang hợp chủ đạo của thực vật. Hấp thụ ánh sáng xanh lam (dải Soret 430 nm) và đỏ (dải Q 662 nm), phản chiếu ánh sáng lục tạo màu xanh của rừng cây.',
    practicalApplications: [
      'Đo mật độ tảo và hiện tượng phú dưỡng (eutrophication) trong hồ đầm',
      'Nghiên cứu hiệu suất quang hợp và quang hóa sinh học',
      'Đánh giá chất lượng nông sản và độ tươi của rau quả',
    ],
    defaultPathLengthCm: 1.0,
    typicalConcRangeM: { min: 0.000002, max: 0.00003 },
  },
  methyl_orange: {
    id: 'methyl_orange',
    name: 'Methyl Orange (Acidic Quinoid)',
    vietnameseName: 'Chỉ thị Metyl da cam (Môi trường axit, pH < 3.1)',
    chemicalFormula: 'C14H14N3NaO3S',
    colorName: 'Đỏ tươi / Đỏ cam',
    solutionColorHex: '#FF4500',
    absorbedColorName: 'Lục - Lam (Blue-Green)',
    absorbedColorHex: '#00CED1',
    lambdaMaxNm: 505,
    molarAbsorptivity: 37500,
    electronicTransition: 'Chuyển dịch π → π* nhóm mang màu azo (-N=N-) proton hóa liên hợp',
    curriculumGrade: 'Grade 11',
    description: 'Phẩm nhuộm azo chuyển màu từ vàng (dạng bazơ, λmax = 464 nm) sang đỏ (dạng axit quinoid proton hóa, λmax = 505 nm). Cực kỳ hữu ích trong trắc quang so màu định lượng.',
    practicalApplications: [
      'Chỉ thị điểm kết thúc trong chuẩn độ axit mạnh - bazơ yếu',
      'Nghiên cứu cơ chế solvatochromism và ảnh hưởng của dung môi đến bước sóng hấp thụ',
      'Xử lý phân hủy phẩm màu azo trong công nghệ nước thải dệt nhuộm',
    ],
    defaultPathLengthCm: 1.0,
    typicalConcRangeM: { min: 0.000005, max: 0.00005 },
  },
};

// ----------------------------------------------------------------------------
// DOMAIN LOGIC FUNCTIONS
// ----------------------------------------------------------------------------

/**
 * Calculates theoretical Absorbance from Beer-Lambert Law: A = ε · l · c
 */
export function calculateAbsorbance(
  molarAbsorptivity: number,
  pathLengthCm: number,
  concentrationM: number
): number {
  if (molarAbsorptivity < 0 || pathLengthCm < 0 || concentrationM < 0) {
    return 0;
  }
  return Number((molarAbsorptivity * pathLengthCm * concentrationM).toFixed(4));
}

/**
 * Calculates Transmittance T (0 to 1) and %T (0 to 100%) from Absorbance
 */
export function calculateTransmittance(absorbance: number): { transmittance: number; transmittancePct: number } {
  if (absorbance <= 0) {
    return { transmittance: 1.0, transmittancePct: 100.0 };
  }
  if (absorbance >= 6.0) {
    return { transmittance: 0.0, transmittancePct: 0.0 };
  }
  const T = Math.pow(10, -absorbance);
  const TPct = T * 100.0;
  return {
    transmittance: Number(T.toFixed(6)),
    transmittancePct: Number(TPct.toFixed(3)),
  };
}

/**
 * Calculates Absorbance from %Transmittance: A = 2 - log10(%T)
 */
export function calculateAbsorbanceFromTransmittancePct(transmittancePct: number): number {
  if (transmittancePct >= 100) return 0;
  if (transmittancePct <= 0.000001) return 6.0; // Instrumental saturation limit
  const A = 2 - Math.log10(transmittancePct);
  return Number(Math.max(0, A).toFixed(4));
}

/**
 * Evaluates Twyman-Lothian Photometric Error:
 * Relative concentration error (Δc/c) / ΔT = 0.4343 / (T · log10(1/T))
 * Assuming an instrument photodetector error ΔT = 0.005 (0.5% transmittance noise).
 */
export function calculatePhotometricRelativeError(absorbance: number, deltaT: number = 0.005): number {
  if (absorbance <= 0.001) return 100.0;
  const T = Math.pow(10, -absorbance);
  if (T <= 0.000001) return 100.0;
  
  // Twyman-Lothian formula:
  // (Δc / c) = (0.4343 · ΔT) / (T · A)
  const relErrorFraction = (0.4343 * deltaT) / (T * absorbance);
  const relErrorPct = relErrorFraction * 100.0;
  return Number(Math.min(100.0, relErrorPct).toFixed(2));
}

/**
 * Computes apparent absorbance considering non-ideal stray light and high concentration deviations.
 * Stray light ratio 's' causes absorbance ceiling: A_apparent = -log10(10^(-A) + s) + log10(1 + s)
 * High concentration (> 0.01 M) causes negative deviation due to electrostatic interaction.
 */
export function calculateApparentAbsorbance(
  theoreticalAbsorbance: number,
  concentrationM: number,
  strayLightFraction: number = 0.002
): number {
  if (theoreticalAbsorbance <= 0) return 0;

  // 1. High concentration electrostatic suppression (inter-ionic perturbation above 0.01 M)
  let effectiveAbsorbance = theoreticalAbsorbance;
  if (concentrationM > 0.01) {
    const concFactor = 1 - Math.min(0.25, 0.08 * Math.log10(concentrationM / 0.01 + 1));
    effectiveAbsorbance = theoreticalAbsorbance * concFactor;
  }

  // 2. Stray light instrumental limitation
  if (strayLightFraction > 0) {
    const term = Math.pow(10, -effectiveAbsorbance) + strayLightFraction;
    const apparent = -Math.log10(term) + Math.log10(1 + strayLightFraction);
    return Number(Math.max(0, apparent).toFixed(4));
  }

  return Number(effectiveAbsorbance.toFixed(4));
}

/**
 * Performs full spectrophotometric measurement analysis
 */
export function measureSpectrophotometry(
  standard: SpectroStandard,
  concentrationM: number,
  pathLengthCm: number = 1.0,
  strayLightFraction: number = 0.001
): PhotometricMeasurement {
  const theoreticalA = calculateAbsorbance(standard.molarAbsorptivity, pathLengthCm, concentrationM);
  const apparentA = calculateApparentAbsorbance(theoreticalA, concentrationM, strayLightFraction);
  const { transmittance, transmittancePct } = calculateTransmittance(apparentA);
  const relativeErrorPct = calculatePhotometricRelativeError(apparentA);
  const withinOptimumRange = apparentA >= 0.2 && apparentA <= 0.8;

  return {
    pathLengthCm,
    concentrationM,
    molarAbsorptivity: standard.molarAbsorptivity,
    theoreticalAbsorbance: theoreticalA,
    apparentAbsorbance: apparentA,
    transmittance,
    transmittancePct,
    relativePhotometricErrorPct: relativeErrorPct,
    withinOptimumRange,
    lightAbsorbedColor: standard.absorbedColorName,
    solutionApparentColor: standard.colorName,
  };
}

/**
 * Finds complementary color pair for a given wavelength (nm)
 */
export function getComplementaryColor(wavelengthNm: number): ComplementaryColorPair {
  for (const pair of COMPLEMENTARY_COLOR_TABLE) {
    if (wavelengthNm >= pair.minWavelengthNm && wavelengthNm <= pair.maxWavelengthNm) {
      return pair;
    }
  }
  // Default to mid-spectrum visible if out of table bounds
  if (wavelengthNm < 380) {
    return {
      minWavelengthNm: 200,
      maxWavelengthNm: 380,
      absorbedColor: 'Tử ngoại (UV)',
      absorbedHex: '#4B0082',
      transmittedColor: 'Trong suốt / Không màu (Colorless)',
      transmittedHex: '#FFFFFF',
    };
  }
  return {
    minWavelengthNm: 750,
    maxWavelengthNm: 1000,
    absorbedColor: 'Hồng ngoại (Infrared)',
    absorbedHex: '#800000',
    transmittedColor: 'Trong suốt / Lục lam nhạt',
    transmittedHex: '#E0FFFF',
  };
}

/**
 * Performs Ordinary Least Squares (OLS) Linear Regression for Analytical Calibration Curve:
 * A = m · c + b
 * Also computes Pearson r, R², Sy/x, LOD, LOQ.
 */
export function computeCalibrationRegression(
  points: CalibrationPoint[]
): CalibrationRegressionResult {
  const n = points.length;
  if (n < 2) {
    return {
      slope: 0,
      intercept: 0,
      rSquared: 0,
      pearsonR: 0,
      standardErrorOfEstimate: 0,
      lodM: 0,
      loqM: 0,
      points,
    };
  }

  let sumC = 0;
  let sumA = 0;
  let sumC2 = 0;
  let sumA2 = 0;
  let sumCA = 0;

  for (const p of points) {
    sumC += p.concentrationM;
    sumA += p.absorbance;
    sumC2 += p.concentrationM * p.concentrationM;
    sumA2 += p.absorbance * p.absorbance;
    sumCA += p.concentrationM * p.absorbance;
  }

  const denominator = n * sumC2 - sumC * sumC;
  if (Math.abs(denominator) < 1e-12) {
    return {
      slope: 0,
      intercept: points[0].absorbance,
      rSquared: 0,
      pearsonR: 0,
      standardErrorOfEstimate: 0,
      lodM: 0,
      loqM: 0,
      points,
    };
  }

  const slope = (n * sumCA - sumC * sumA) / denominator;
  const intercept = (sumA - slope * sumC) / n;

  // Pearson r and R²
  const meanA = sumA / n;
  let ssTot = 0;
  let ssRes = 0;

  for (const p of points) {
    const predictedA = slope * p.concentrationM + intercept;
    ssTot += Math.pow(p.absorbance - meanA, 2);
    ssRes += Math.pow(p.absorbance - predictedA, 2);
  }

  const rSquared = ssTot > 0 ? Math.max(0, 1 - ssRes / ssTot) : 1.0;
  const pearsonR = slope >= 0 ? Math.sqrt(rSquared) : -Math.sqrt(rSquared);

  // Standard error of the estimate Sy/x (dof = n - 2)
  const syx = n > 2 ? Math.sqrt(ssRes / (n - 2)) : Math.sqrt(ssRes);

  // Limits of detection & quantitation (IUPAC: LOD = 3.3 * Sy/x / m, LOQ = 10 * Sy/x / m)
  const lod = slope > 0 ? (3.3 * syx) / slope : 0;
  const loq = slope > 0 ? (10.0 * syx) / slope : 0;

  return {
    slope: Number(slope.toFixed(4)),
    intercept: Number(intercept.toFixed(4)),
    rSquared: Number(rSquared.toFixed(5)),
    pearsonR: Number(pearsonR.toFixed(5)),
    standardErrorOfEstimate: Number(syx.toFixed(6)),
    lodM: Number(lod.toExponential(3)),
    loqM: Number(loq.toExponential(3)),
    points,
  };
}

/**
 * Predicts concentration of an unknown sample from its measured absorbance using calibration curve
 */
export function quantifyUnknownSample(
  sampleAbsorbance: number,
  regression: CalibrationRegressionResult
): { concentrationM: number; isValidRange: boolean; warning?: string } {
  if (regression.slope <= 0) {
    return { concentrationM: 0, isValidRange: false, warning: 'Độ dốc đường chuẩn không hợp lệ (slope <= 0).' };
  }

  const c = (sampleAbsorbance - regression.intercept) / regression.slope;
  const clampedC = Math.max(0, c);

  // Find min and max concentrations in calibration points
  let minC = Infinity;
  let maxC = -Infinity;
  for (const p of regression.points) {
    if (p.concentrationM < minC) minC = p.concentrationM;
    if (p.concentrationM > maxC) maxC = p.concentrationM;
  }

  const isBelowLOD = clampedC < regression.lodM;
  const isExtrapolatedHigh = clampedC > maxC * 1.05;
  const isValidRange = !isBelowLOD && !isExtrapolatedHigh;

  let warning: string | undefined;
  if (isBelowLOD) {
    warning = `Nồng độ mẫu (${clampedC.toExponential(2)} M) nhỏ hơn Giới hạn phát hiện LOD (${regression.lodM.toExponential(2)} M). Cần làm giàu mẫu hoặc đo lại.`;
  } else if (isExtrapolatedHigh) {
    warning = `Nồng độ mẫu (${clampedC.toExponential(2)} M) vượt quá dải chuẩn tuyến tính (${maxC.toExponential(2)} M). Cần pha loãng mẫu để đo lại.`;
  }

  return {
    concentrationM: Number(clampedC.toPrecision(4)),
    isValidRange,
    warning,
  };
}

/**
 * Generates synthetic benchmark calibration curve for a standard
 */
export function generateStandardCalibrationPoints(
  standard: SpectroStandard,
  numPoints: number = 5,
  noiseSigma: number = 0.002
): CalibrationPoint[] {
  const points: CalibrationPoint[] = [];
  const minC = standard.typicalConcRangeM.min;
  const maxC = standard.typicalConcRangeM.max;
  const step = (maxC - minC) / (numPoints - 1);

  for (let i = 0; i < numPoints; i++) {
    const conc = minC + i * step;
    const trueA = calculateAbsorbance(standard.molarAbsorptivity, standard.defaultPathLengthCm, conc);
    // Add deterministic reproducible pseudo-random noise
    const pseudoRandom = Math.sin(i * 12.9898 + standard.lambdaMaxNm) * noiseSigma;
    const measuredA = Math.max(0, trueA + pseudoRandom);
    const { transmittancePct } = calculateTransmittance(measuredA);

    points.push({
      concentrationM: Number(conc.toPrecision(3)),
      absorbance: Number(measuredA.toFixed(4)),
      transmittancePct,
    });
  }

  return points;
}

/**
 * Matching function for Card Detail modal and Codex
 */
export function getMatchingSpectrophotometryConcept(
  card: { name?: string; chemicalFormula?: string; description?: string; element?: string }
): SpectroStandard | null {
  const norm = `${card.name || ''} ${card.chemicalFormula || ''} ${card.description || ''}`.toLowerCase();

  if (norm.includes('kmno4') || norm.includes('pemanganat') || norm.includes('permanganate') || norm.includes('thuốc tím')) {
    return SPECTRO_STANDARDS.kmno4;
  }
  if (norm.includes('cuso4') || norm.includes('copper') || norm.includes('đồng') || norm.includes('cu2+') || norm.includes('biuret')) {
    return SPECTRO_STANDARDS.cuso4;
  }
  if (norm.includes('k2cr2o7') || norm.includes('dichromate') || norm.includes('đicromat') || norm.includes('cr2o7') || norm.includes('nồng độ cồn')) {
    return SPECTRO_STANDARDS.k2cr2o7;
  }
  if (norm.includes('scn') || norm.includes('thiocyanate') || norm.includes('thioxianat') || norm.includes('fe(scn)') || norm.includes('màu máu')) {
    return SPECTRO_STANDARDS.fe_scn;
  }
  if (norm.includes('nicl2') || norm.includes('nickel') || norm.includes('niken') || norm.includes('ni2+')) {
    return SPECTRO_STANDARDS.nicl2;
  }
  if (norm.includes('phenolphthalein') || norm.includes('phenolphtalein') || norm.includes('hồng cánh sen')) {
    return SPECTRO_STANDARDS.phenolphthalein;
  }
  if (norm.includes('chlorophyll') || norm.includes('diệp lục') || norm.includes('quang hợp')) {
    return SPECTRO_STANDARDS.chlorophyll_a;
  }
  if (norm.includes('methyl orange') || norm.includes('metyl da cam') || norm.includes('azo')) {
    return SPECTRO_STANDARDS.methyl_orange;
  }
  if (norm.includes('spectro') || norm.includes('quang phổ') || norm.includes('beer-lambert') || norm.includes('cuvette') || norm.includes('so màu')) {
    return SPECTRO_STANDARDS.kmno4; // Default flagship standard
  }

  return null;
}
