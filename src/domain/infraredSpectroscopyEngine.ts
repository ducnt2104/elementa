// src/domain/infraredSpectroscopyEngine.ts
// ============================================================================
// ELEMENTA INFRARED SPECTROSCOPY (IR) & MOLECULAR VIBRATION ENGINE
// Standards: IUPAC Gold Book & Vietnam GDPT 2018 Chemistry 11 (Chương 4: Hóa học hữu cơ)
// Covers: Hooke's Law Harmonic Oscillator (ν̃ = 1/(2πc) · √(k/μ)), Vibrational Degrees of Freedom,
// Isotopic Mass Shift (C-H vs C-D), 4 Characteristic Diagnostic Regions (4000 - 400 cm⁻¹),
// Functional Group Fingerprinting (O-H broad, C=O sharp, N-H doublet, C≡C, C≡N),
// and Curriculum Benchmark Organic Spectra.
// ============================================================================

export type IRIntensity = 'VERY_STRONG' | 'STRONG' | 'MEDIUM' | 'WEAK' | 'BROAD_STRONG';
export type IRVibrationMode = 'STRETCH_ASYM' | 'STRETCH_SYM' | 'BEND_SCISSOR' | 'BEND_WAG' | 'BEND_ROCK';

export interface IRBandDef {
  waveNumberCm: number;
  minWaveNumberCm: number;
  maxWaveNumberCm: number;
  intensity: IRIntensity;
  vibrationMode: IRVibrationMode;
  bond: string; // e.g., 'O-H', 'C=O', 'C-H', 'N-H'
  functionalGroup: string; // e.g., 'Alcohol', 'Carbonyl', 'Carboxylic acid'
  diagnosticSignificanceVI: string;
}

export interface IRDiagnosticRegion {
  name: string;
  vietnameseName: string;
  minWaveNumberCm: number;
  maxWaveNumberCm: number;
  descriptionVI: string;
  primaryBonds: string[];
}

export interface IRCompound {
  id: string;
  name: string;
  vietnameseName: string;
  chemicalFormula: string;
  functionalGroupVI: string;
  atomCount: number;
  isLinear: boolean;
  curriculumGrade: 'Grade 11' | 'Grade 12' | 'Chuyên / Olympic';
  description: string;
  diagnosticPeaks: IRBandDef[];
  practicalApplications: string[];
}

// ----------------------------------------------------------------------------
// 4 PRINCIPAL IR DIAGNOSTIC REGIONS (GDPT 2018 & IUPAC)
// ----------------------------------------------------------------------------
export const IR_DIAGNOSTIC_REGIONS: readonly IRDiagnosticRegion[] = [
  {
    name: 'X-H Stretching Region',
    vietnameseName: 'Vùng dao động hóa trị X-H (4000 - 2500 cm⁻¹)',
    minWaveNumberCm: 2500,
    maxWaveNumberCm: 4000,
    descriptionVI: 'Dao động của nguyên tử Hydro liên kết với các nguyên tố O, N, C. Nổi bật với dải O-H tù rộng (3200-3600 cm⁻¹) do liên kết hydro, dải C=O-OH của axit (2500-3300 cm⁻¹), và chùm C-H sp³/sp²/sp.',
    primaryBonds: ['O-H', 'N-H', 'C(sp)-H', 'C(sp²)-H', 'C(sp³)-H'],
  },
  {
    name: 'Triple Bond Region',
    vietnameseName: 'Vùng liên kết ba (2500 - 2000 cm⁻¹)',
    minWaveNumberCm: 2000,
    maxWaveNumberCm: 2500,
    descriptionVI: 'Dao động của các liên kết ba có độ cứng lực k rất lớn (~15×10⁵ dyn/cm). Vùng tương đối quang đãng, giúp nhận biết dễ dàng nhóm Alkyne C≡C (2100-2260 cm⁻¹) và Nitrile C≡N (2220-2260 cm⁻¹).',
    primaryBonds: ['C≡C', 'C≡N'],
  },
  {
    name: 'Double Bond Region',
    vietnameseName: 'Vùng liên kết đôi (2000 - 1500 cm⁻¹)',
    minWaveNumberCm: 1500,
    maxWaveNumberCm: 2000,
    descriptionVI: 'Khu vực chẩn đoán quan trọng nhất trong hóa học hữu cơ. Nổi bật với tín hiệu C=O cực mạnh (1680-1750 cm⁻¹) của anđehit, xeton, axit, este; và liên kết C=C (1620-1680 cm⁻¹) của anken và vòng thơm.',
    primaryBonds: ['C=O', 'C=C', 'C=N', 'Vòng thơm'],
  },
  {
    name: 'Fingerprint Region',
    vietnameseName: 'Vùng điểm chỉ / Vân tay (1500 - 400 cm⁻¹)',
    minWaveNumberCm: 400,
    maxWaveNumberCm: 1500,
    descriptionVI: 'Gồm các dao động uốn phức tạp của toàn bộ khung phân tử và dao động kéo dãn liên kết đơn C-C, C-O, C-Cl. Mỗi hợp chất hữu cơ có một phổ vân tay độc nhất vô nhị như dấu vân tay con người.',
    primaryBonds: ['C-O', 'C-C', 'C-Cl', 'Dao động uốn khung'],
  },
];

// ----------------------------------------------------------------------------
// BENCHMARK CURRICULUM IR SPECTRA CATALOG
// ----------------------------------------------------------------------------
export const IR_BENCHMARK_CATALOG: Record<string, IRCompound> = {
  ethanol: {
    id: 'ethanol',
    name: 'Ethanol',
    vietnameseName: 'Ethanol (Ancol etylic)',
    chemicalFormula: 'C2H5OH',
    functionalGroupVI: 'Ancol (Alcohol -OH)',
    atomCount: 9,
    isLinear: false,
    curriculumGrade: 'Grade 11',
    description: 'Ancol tiêu biểu trong SGK Hóa 11. Đặc trưng bởi dải hấp thụ O-H tù rộng (broad parabol) ở 3350 cm⁻¹ do liên kết hydro liên phân tử mạnh mẽ. Hoàn toàn không có đỉnh hấp thụ ở vùng 1680-1750 cm⁻¹ (không chứa nhóm cacbonyl C=O).',
    diagnosticPeaks: [
      { waveNumberCm: 3350, minWaveNumberCm: 3200, maxWaveNumberCm: 3600, intensity: 'BROAD_STRONG', vibrationMode: 'STRETCH_SYM', bond: 'O-H', functionalGroup: 'Alcohol', diagnosticSignificanceVI: 'Dải tù rộng đặc trưng của nhóm -OH liên kết hydro' },
      { waveNumberCm: 2974, minWaveNumberCm: 2850, maxWaveNumberCm: 2990, intensity: 'STRONG', vibrationMode: 'STRETCH_ASYM', bond: 'C(sp³)-H', functionalGroup: 'Alkane', diagnosticSignificanceVI: 'Kéo dãn bất đối xứng C-H của nhóm etyl' },
      { waveNumberCm: 2886, minWaveNumberCm: 2850, maxWaveNumberCm: 2900, intensity: 'MEDIUM', vibrationMode: 'STRETCH_SYM', bond: 'C(sp³)-H', functionalGroup: 'Alkane', diagnosticSignificanceVI: 'Kéo dãn đối xứng C-H' },
      { waveNumberCm: 1050, minWaveNumberCm: 1000, maxWaveNumberCm: 1100, intensity: 'STRONG', vibrationMode: 'STRETCH_SYM', bond: 'C-O', functionalGroup: 'Alcohol', diagnosticSignificanceVI: 'Kéo dãn liên kết đơn C-O ancol bậc 1' },
    ],
    practicalApplications: [
      'Phân biệt nhanh chóng ancol với xeton, anđehit và hiđrocacbon',
      'Đo hàm lượng cồn sinh học và kiểm tra độ tinh khiết cồn y tế',
    ],
  },

  acetone: {
    id: 'acetone',
    name: 'Acetone',
    vietnameseName: 'Axeton (Propan-2-one)',
    chemicalFormula: 'CH3COCH3',
    functionalGroupVI: 'Xeton (Ketone C=O)',
    atomCount: 10,
    isLinear: false,
    curriculumGrade: 'Grade 11',
    description: 'Xeton kinh điển trong SGK Hóa 11. Đặc trưng bởi một đỉnh hấp thụ C=O cực nhọn và rất mạnh ở 1715 cm⁻¹. Hoàn toàn không có dải tù O-H ở 3200-3600 cm⁻¹ và không có chùm Fermi anđehit ở 2720/2820 cm⁻¹.',
    diagnosticPeaks: [
      { waveNumberCm: 2925, minWaveNumberCm: 2850, maxWaveNumberCm: 2960, intensity: 'MEDIUM', vibrationMode: 'STRETCH_ASYM', bond: 'C(sp³)-H', functionalGroup: 'Alkane', diagnosticSignificanceVI: 'Kéo dãn C-H nhóm metyl' },
      { waveNumberCm: 1715, minWaveNumberCm: 1705, maxWaveNumberCm: 1725, intensity: 'VERY_STRONG', vibrationMode: 'STRETCH_SYM', bond: 'C=O', functionalGroup: 'Ketone', diagnosticSignificanceVI: 'Đỉnh nhọn cực mạnh đặc trưng của nhóm cacbonyl xeton' },
      { waveNumberCm: 1365, minWaveNumberCm: 1350, maxWaveNumberCm: 1380, intensity: 'MEDIUM', vibrationMode: 'BEND_SCISSOR', bond: 'C-H', functionalGroup: 'Ketone', diagnosticSignificanceVI: 'Dao động uốn biến dạng đối xứng của nhóm -COCH3' },
      { waveNumberCm: 1220, minWaveNumberCm: 1200, maxWaveNumberCm: 1240, intensity: 'STRONG', vibrationMode: 'STRETCH_SYM', bond: 'C-C(=O)-C', functionalGroup: 'Ketone', diagnosticSignificanceVI: 'Kéo dãn khung khung C-C(=O)-C' },
    ],
    practicalApplications: [
      'Nhận dạng nhóm chức xeton trong phân tích chất lượng dung môi công nghiệp',
      'Phân biệt acetone với alcohol và carboxylic acid nhờ đỉnh nhọn C=O đơn độc',
    ],
  },

  acetic_acid: {
    id: 'acetic_acid',
    name: 'Acetic Acid',
    vietnameseName: 'Axit axetic (Axit etanoic)',
    chemicalFormula: 'CH3COOH',
    functionalGroupVI: 'Axit cacboxylic (Carboxylic Acid -COOH)',
    atomCount: 8,
    isLinear: false,
    curriculumGrade: 'Grade 11',
    description: 'Axit cacboxylic mở đầu bài học axit trong SGK Hóa 11. Phổ IR mang hình thái "dãy núi khổng lồ" rất dễ nhận dạng: dải O-H liên kết hydro dime cực rộng bao trùm từ 2500 đến 3300 cm⁻¹ đè lên cả đỉnh C-H, cùng đỉnh C=O rất mạnh ở 1710 cm⁻¹.',
    diagnosticPeaks: [
      { waveNumberCm: 3000, minWaveNumberCm: 2500, maxWaveNumberCm: 3300, intensity: 'BROAD_STRONG', vibrationMode: 'STRETCH_SYM', bond: 'O-H (Acid)', functionalGroup: 'Carboxylic acid', diagnosticSignificanceVI: 'Dải O-H axit cực rộng bao trùm do tạo dime liên kết hydro kép' },
      { waveNumberCm: 1710, minWaveNumberCm: 1700, maxWaveNumberCm: 1725, intensity: 'VERY_STRONG', vibrationMode: 'STRETCH_SYM', bond: 'C=O', functionalGroup: 'Carboxylic acid', diagnosticSignificanceVI: 'Đỉnh cacbonyl axit liên hợp dime' },
      { waveNumberCm: 1415, minWaveNumberCm: 1400, maxWaveNumberCm: 1440, intensity: 'MEDIUM', vibrationMode: 'BEND_SCISSOR', bond: 'C-O-H', functionalGroup: 'Carboxylic acid', diagnosticSignificanceVI: 'Dao động uốn trong mặt phẳng của C-O-H' },
      { waveNumberCm: 1280, minWaveNumberCm: 1250, maxWaveNumberCm: 1320, intensity: 'STRONG', vibrationMode: 'STRETCH_SYM', bond: 'C-O', functionalGroup: 'Carboxylic acid', diagnosticSignificanceVI: 'Kéo dãn liên kết C-O axit' },
    ],
    practicalApplications: [
      'Giám sát quá trình lên men giấm ăn từ rượu etylic',
      'Phát hiện axit béo tự do trong dầu ăn chiên rán nhiều lần',
    ],
  },

  acetaldehyde: {
    id: 'acetaldehyde',
    name: 'Acetaldehyde',
    vietnameseName: 'Axetanđehit (Etanal)',
    chemicalFormula: 'CH3CHO',
    functionalGroupVI: 'Anđehit (Aldehyde -CHO)',
    atomCount: 7,
    isLinear: false,
    curriculumGrade: 'Grade 11',
    description: 'Anđehit tiêu biểu trong SGK Hóa 11. Dấu hiệu nhận biết then chốt là "chùm đôi Fermi" (Fermi doublet) của liên kết C-H anđehit ở 2720 cm⁻¹ và 2820 cm⁻¹, đi kèm đỉnh C=O rất mạnh ở 1730 cm⁻¹.',
    diagnosticPeaks: [
      { waveNumberCm: 2820, minWaveNumberCm: 2800, maxWaveNumberCm: 2840, intensity: 'MEDIUM', vibrationMode: 'STRETCH_SYM', bond: 'C(anđehit)-H', functionalGroup: 'Aldehyde', diagnosticSignificanceVI: 'Vạch trên của chùm đôi cộng hưởng Fermi C-H anđehit' },
      { waveNumberCm: 2720, minWaveNumberCm: 2700, maxWaveNumberCm: 2740, intensity: 'MEDIUM', vibrationMode: 'STRETCH_SYM', bond: 'C(anđehit)-H', functionalGroup: 'Aldehyde', diagnosticSignificanceVI: 'Vạch dưới của chùm đôi Fermi - dấu hiệu độc quyền anđehit' },
      { waveNumberCm: 1730, minWaveNumberCm: 1720, maxWaveNumberCm: 1740, intensity: 'VERY_STRONG', vibrationMode: 'STRETCH_SYM', bond: 'C=O', functionalGroup: 'Aldehyde', diagnosticSignificanceVI: 'Kéo dãn cacbonyl anđehit' },
      { waveNumberCm: 1390, minWaveNumberCm: 1370, maxWaveNumberCm: 1410, intensity: 'MEDIUM', vibrationMode: 'BEND_SCISSOR', bond: 'C-H', functionalGroup: 'Aldehyde', diagnosticSignificanceVI: 'Biến dạng C-H liên kết với C=O' },
    ],
    practicalApplications: [
      'Phân biệt tuyệt đối anđehit với xeton nhờ chùm đôi Fermi 2720/2820 cm⁻¹',
      'Quan trắc dư lượng anđehit gây ngộ độc trong rượu chưng cất dân gian',
    ],
  },

  ethyl_acetate: {
    id: 'ethyl_acetate',
    name: 'Ethyl Acetate',
    vietnameseName: 'Etyl axetat',
    chemicalFormula: 'CH3COOCH2CH3',
    functionalGroupVI: 'Este (Ester -COO-)',
    atomCount: 14,
    isLinear: false,
    curriculumGrade: 'Grade 12',
    description: 'Este kinh điển mở đầu chương 1 Hóa học 12. Phổ IR đặc trưng bởi đỉnh C=O este ở tần số cao hơn xeton (1740 cm⁻¹) do hiệu ứng hút electron của nguyên tử Oxy liền kề, cùng cặp đỉnh kép C-O-C este rất mạnh ở 1240 cm⁻¹ và 1050 cm⁻¹.',
    diagnosticPeaks: [
      { waveNumberCm: 2985, minWaveNumberCm: 2850, maxWaveNumberCm: 3000, intensity: 'MEDIUM', vibrationMode: 'STRETCH_ASYM', bond: 'C(sp³)-H', functionalGroup: 'Alkane', diagnosticSignificanceVI: 'Kéo dãn C-H của chuỗi ankyl' },
      { waveNumberCm: 1740, minWaveNumberCm: 1735, maxWaveNumberCm: 1750, intensity: 'VERY_STRONG', vibrationMode: 'STRETCH_SYM', bond: 'C=O (Ester)', functionalGroup: 'Ester', diagnosticSignificanceVI: 'Đỉnh C=O este tần số cao hơn xeton do hiệu ứng oxy' },
      { waveNumberCm: 1240, minWaveNumberCm: 1220, maxWaveNumberCm: 1260, intensity: 'VERY_STRONG', vibrationMode: 'STRETCH_ASYM', bond: 'C-O-C (Acetate)', functionalGroup: 'Ester', diagnosticSignificanceVI: 'Kéo dãn axetat C-O bất đối xứng cực mạnh' },
      { waveNumberCm: 1050, minWaveNumberCm: 1020, maxWaveNumberCm: 1080, intensity: 'STRONG', vibrationMode: 'STRETCH_SYM', bond: 'C-O-C (Ethyl)', functionalGroup: 'Ester', diagnosticSignificanceVI: 'Kéo dãn C-O phía gốc etyl' },
    ],
    practicalApplications: [
      'Phân tích thành phần tinh dầu hoa quả và chất thơm tổng hợp',
      'Kiểm tra chất lượng màng bọc thực phẩm và polymer phân hủy sinh học',
    ],
  },

  ethylamine: {
    id: 'ethylamine',
    name: 'Ethylamine',
    vietnameseName: 'Etylamin (Etanamine)',
    chemicalFormula: 'C2H5NH2',
    functionalGroupVI: 'Amin bậc 1 (Primary Amine -NH2)',
    atomCount: 10,
    isLinear: false,
    curriculumGrade: 'Grade 12',
    description: 'Amin bậc 1 tiêu biểu trong Hóa 12. Do có 2 nguyên tử hydro trên Nitơ, nhóm -NH2 xuất hiện "chùm đôi" (doublet) ở 3360 cm⁻¹ (dao động bất đối xứng) và 3280 cm⁻¹ (dao động đối xứng). Đỉnh uốn N-H scissoring xuất hiện rõ ở 1600 cm⁻¹.',
    diagnosticPeaks: [
      { waveNumberCm: 3360, minWaveNumberCm: 3330, maxWaveNumberCm: 3400, intensity: 'MEDIUM', vibrationMode: 'STRETCH_ASYM', bond: 'N-H (Asym)', functionalGroup: 'Amine', diagnosticSignificanceVI: 'Vạch kéo dãn bất đối xứng N-H (Vạch 1 của chùm đôi amin bậc 1)' },
      { waveNumberCm: 3280, minWaveNumberCm: 3250, maxWaveNumberCm: 3300, intensity: 'MEDIUM', vibrationMode: 'STRETCH_SYM', bond: 'N-H (Sym)', functionalGroup: 'Amine', diagnosticSignificanceVI: 'Vạch kéo dãn đối xứng N-H (Vạch 2 của chùm đôi amin bậc 1)' },
      { waveNumberCm: 1600, minWaveNumberCm: 1580, maxWaveNumberCm: 1650, intensity: 'STRONG', vibrationMode: 'BEND_SCISSOR', bond: 'N-H (Scissor)', functionalGroup: 'Amine', diagnosticSignificanceVI: 'Dao động uốn biến dạng hình chiếc kéo (scissoring) của nhóm -NH2' },
      { waveNumberCm: 1070, minWaveNumberCm: 1040, maxWaveNumberCm: 1100, intensity: 'MEDIUM', vibrationMode: 'STRETCH_SYM', bond: 'C-N', functionalGroup: 'Amine', diagnosticSignificanceVI: 'Kéo dãn liên kết C-N amin no' },
    ],
    practicalApplications: [
      'Phân biệt bậc của amin: bậc 1 có 2 vạch N-H, bậc 2 có 1 vạch, bậc 3 không có vạch N-H',
      'Giám sát sự hư hỏng của cá và thủy sản do vi khuẩn sinh bazơ amin bay hơi',
    ],
  },

  benzonitrile: {
    id: 'benzonitrile',
    name: 'Benzonitrile',
    vietnameseName: 'Benzonitrin (Xianobenzen)',
    chemicalFormula: 'C6H5CN',
    functionalGroupVI: 'Nitrin (Nitrile -C≡N) & Vòng thơm',
    atomCount: 13,
    isLinear: false,
    curriculumGrade: 'Grade 12',
    description: 'Hợp chất chứa liên kết ba Nitrile -C≡N có lực liên kết k rất lớn. Xuất hiện đỉnh nhọn cực kỳ sắc nét ở 2230 cm⁻¹ trong vùng liên kết ba hoàn toàn không bị nhiễu. Kèm theo là chùm vạch vòng benzen ở 1595 và 1490 cm⁻¹.',
    diagnosticPeaks: [
      { waveNumberCm: 3065, minWaveNumberCm: 3020, maxWaveNumberCm: 3100, intensity: 'MEDIUM', vibrationMode: 'STRETCH_SYM', bond: 'C(sp² thơm)-H', functionalGroup: 'Aromatic', diagnosticSignificanceVI: 'Kéo dãn C-H trên vòng benzen (> 3000 cm⁻¹)' },
      { waveNumberCm: 2230, minWaveNumberCm: 2220, maxWaveNumberCm: 2260, intensity: 'STRONG', vibrationMode: 'STRETCH_SYM', bond: 'C≡N', functionalGroup: 'Nitrile', diagnosticSignificanceVI: 'Đỉnh nhọn sắc nét đặc trưng của liên kết ba Nitrile' },
      { waveNumberCm: 1595, minWaveNumberCm: 1580, maxWaveNumberCm: 1610, intensity: 'STRONG', vibrationMode: 'STRETCH_SYM', bond: 'C=C (Thơm)', functionalGroup: 'Aromatic', diagnosticSignificanceVI: 'Dao động co giãn khung thơm vòng 6 cạnh' },
      { waveNumberCm: 1490, minWaveNumberCm: 1480, maxWaveNumberCm: 1510, intensity: 'STRONG', vibrationMode: 'STRETCH_SYM', bond: 'C=C (Thơm)', functionalGroup: 'Aromatic', diagnosticSignificanceVI: 'Vạch bộ xương vòng thơm thứ hai' },
    ],
    practicalApplications: [
      'Tổng hợp polymer kỹ thuật cao tơ nitron (polyacrylonitrile)',
      'Phân tích chất độc xianua trong quan trắc môi trường hóa chất',
    ],
  },

  but_1_yne: {
    id: 'but_1_yne',
    name: 'But-1-yne',
    vietnameseName: 'But-1-in (Etylaxetilen)',
    chemicalFormula: 'HC≡C-CH2CH3',
    functionalGroupVI: 'Ankin đầu mạch (Terminal Alkyne)',
    atomCount: 10,
    isLinear: false,
    curriculumGrade: 'Grade 11',
    description: 'Ankin đầu mạch tiêu biểu trong Hóa 11. Nhóm ≡C-H có liên kết C-H sp rất ngắn và cứng, tạo đỉnh nhọn đâm sâu đặc trưng ở 3310 cm⁻¹; đồng thời liên kết ba C≡C đầu mạch phát tín hiệu ở 2120 cm⁻¹.',
    diagnosticPeaks: [
      { waveNumberCm: 3310, minWaveNumberCm: 3280, maxWaveNumberCm: 3340, intensity: 'STRONG', vibrationMode: 'STRETCH_SYM', bond: '≡C(sp)-H', functionalGroup: 'Alkyne', diagnosticSignificanceVI: 'Đỉnh nhọn đâm sâu đặc trưng của C-H ankin đầu mạch' },
      { waveNumberCm: 2970, minWaveNumberCm: 2850, maxWaveNumberCm: 2990, intensity: 'MEDIUM', vibrationMode: 'STRETCH_ASYM', bond: 'C(sp³)-H', functionalGroup: 'Alkane', diagnosticSignificanceVI: 'Kéo dãn nhóm etyl' },
      { waveNumberCm: 2120, minWaveNumberCm: 2100, maxWaveNumberCm: 2140, intensity: 'MEDIUM', vibrationMode: 'STRETCH_SYM', bond: 'C≡C', functionalGroup: 'Alkyne', diagnosticSignificanceVI: 'Kéo dãn liên kết ba C≡C đầu mạch' },
      { waveNumberCm: 1460, minWaveNumberCm: 1440, maxWaveNumberCm: 1480, intensity: 'MEDIUM', vibrationMode: 'BEND_SCISSOR', bond: 'C-H', functionalGroup: 'Alkane', diagnosticSignificanceVI: 'Dao động uốn biến dạng nhóm metylen' },
    ],
    practicalApplications: [
      'Phân biệt ankin đầu mạch (có vạch 3310 cm⁻¹) với ankin giữa mạch (không có vạch 3310 cm⁻¹)',
      'Kiểm soát phản ứng thế ion kim loại (bạc axetilua AgC≡C-R)',
    ],
  },
};

// ----------------------------------------------------------------------------
// DOMAIN LOGIC FUNCTIONS
// ----------------------------------------------------------------------------

/**
 * Calculates theoretical vibrational wave number (cm⁻¹) using Hooke's Law:
 * ν̃ = 1 / (2πc) · √(k / μ)
 * where c = 2.99792458e10 cm/s
 * k = bond force constant in dyn/cm (single: 5e5, double: 10e5, triple: 15e5)
 * μ = reduced mass in grams = (m1 · m2 / (m1 + m2)) / NA
 */
export function calculateHarmonicWaveNumber(
  mass1Amu: number,
  mass2Amu: number,
  bondOrder: 1 | 2 | 3 = 1,
  customKDynPerCm?: number
): number {
  if (mass1Amu <= 0 || mass2Amu <= 0) return 0;

  const c = 2.99792458e10; // cm/s
  const NA = 6.02214076e23; // 1/mol

  // Force constant k (dyn/cm)
  let kDynPerCm = customKDynPerCm;
  if (!kDynPerCm) {
    if (bondOrder === 2) kDynPerCm = 10.0e5;
    else if (bondOrder === 3) kDynPerCm = 15.0e5;
    else kDynPerCm = 5.0e5;
  }

  // Reduced mass μ in grams
  const muGrams = ((mass1Amu * mass2Amu) / (mass1Amu + mass2Amu)) / NA;

  // ν̃ = 1 / (2πc) * sqrt(k / μ)
  const waveNumber = (1 / (2 * Math.PI * c)) * Math.sqrt(kDynPerCm / muGrams);
  return Number(waveNumber.toFixed(0));
}

/**
 * Calculates vibrational degrees of freedom for a molecule:
 * Non-linear: 3N - 6
 * Linear: 3N - 5
 */
export function calculateVibrationalDegreesOfFreedom(atomCount: number, isLinear: boolean): number {
  if (atomCount < 2) return 0;
  return isLinear ? 3 * atomCount - 5 : 3 * atomCount - 6;
}

/**
 * Evaluates the isotope substitution shift (e.g. C-H to C-D):
 * ν̃_H / ν̃_D = √(μ_D / μ_H)
 */
export function calculateIsotopeVibrationShift(
  baseWaveNumberCm: number,
  originalMuAmu: number,
  substitutedMuAmu: number
): { shiftedWaveNumberCm: number; shiftRatio: number } {
  if (originalMuAmu <= 0 || substitutedMuAmu <= 0 || baseWaveNumberCm <= 0) {
    return { shiftedWaveNumberCm: baseWaveNumberCm, shiftRatio: 1.0 };
  }
  const ratio = Math.sqrt(originalMuAmu / substitutedMuAmu);
  const shifted = baseWaveNumberCm * ratio;
  return {
    shiftedWaveNumberCm: Number(shifted.toFixed(0)),
    shiftRatio: Number(ratio.toFixed(3)),
  };
}

/**
 * Identifies functional groups from a given list of detected IR wave numbers (cm⁻¹)
 */
export function identifyFunctionalGroupsFromPeaks(detectedPeaksCm: number[]): {
  detectedGroups: string[];
  matchedBonds: string[];
  hasCarbonyl: boolean;
  hasAlcohol: boolean;
  hasAcid: boolean;
  hasAmine: boolean;
  hasAlkyne: boolean;
} {
  const detectedGroups = new Set<string>();
  const matchedBonds = new Set<string>();

  let hasCarbonyl = false;
  let hasAlcohol = false;
  let hasAcid = false;
  let hasAmine = false;
  let hasAlkyne = false;

  for (const wn of detectedPeaksCm) {
    // 1. Carbonyl C=O: 1680 - 1750 cm⁻¹
    if (wn >= 1680 && wn <= 1750) {
      hasCarbonyl = true;
      detectedGroups.add('Nhóm Cacbonyl C=O (Anđehit, Xeton, Axit hoặc Este)');
      matchedBonds.add('C=O (1680 - 1750 cm⁻¹)');
    }

    // 2. Alcohol O-H: 3200 - 3650 cm⁻¹
    if (wn >= 3200 && wn <= 3650) {
      hasAlcohol = true;
      detectedGroups.add('Nhóm Hiđroxyl Ancol / Phenol O-H');
      matchedBonds.add('O-H (3200 - 3650 cm⁻¹)');
    }

    // 3. Carboxylic acid O-H broad: 2500 - 3300 cm⁻¹
    if (wn >= 2500 && wn <= 3300) {
      hasAlcohol = true;
      detectedGroups.add('Vùng O-H Axit cacboxylic liên hợp dime');
      matchedBonds.add('O-H Acid (2500 - 3300 cm⁻¹)');
    }

    // 4. Amine N-H: 3300 - 3500 cm⁻¹
    if (wn >= 3300 && wn <= 3500) {
      hasAmine = true;
      detectedGroups.add('Nhóm Amino N-H (Amin hoặc Amit)');
      matchedBonds.add('N-H (3300 - 3500 cm⁻¹)');
    }

    // 5. Alkyne C≡C: 2100 - 2260 cm⁻¹
    if (wn >= 2100 && wn <= 2260) {
      hasAlkyne = true;
      detectedGroups.add('Liên kết ba C≡C (Ankin) hoặc C≡N (Nitrin)');
      matchedBonds.add('C≡C / C≡N (2100 - 2260 cm⁻¹)');
    }

    // 6. Terminal alkyne ≡C-H: 3280 - 3340 cm⁻¹
    if (wn >= 3280 && wn <= 3340) {
      hasAlkyne = true;
      detectedGroups.add('Ankin đầu mạch ≡C-H');
      matchedBonds.add('≡C-H (3300 cm⁻¹)');
    }
  }

  if (hasCarbonyl && hasAlcohol) {
    hasAcid = true;
  }

  return {
    detectedGroups: Array.from(detectedGroups),
    matchedBonds: Array.from(matchedBonds),
    hasCarbonyl,
    hasAlcohol,
    hasAcid,
    hasAmine,
    hasAlkyne,
  };
}

/**
 * Matches card against Infrared Spectroscopy Catalog
 */
export function getMatchingIRConcept(
  card: { name?: string; chemicalFormula?: string; description?: string; element?: string }
): IRCompound | null {
  const norm = `${card.name || ''} ${card.chemicalFormula || ''} ${card.description || ''}`.toLowerCase();

  if (norm.includes('c2h5oh') || norm.includes('c2h6o') || norm.includes('ethanol') || norm.includes('ancol etylic')) {
    return IR_BENCHMARK_CATALOG.ethanol;
  }
  if (norm.includes('ch3coch3') || norm.includes('c3h6o') || norm.includes('acetone') || norm.includes('axeton')) {
    return IR_BENCHMARK_CATALOG.acetone;
  }
  if (norm.includes('ch3cooh') || norm.includes('c2h4o2') || norm.includes('acetic acid') || norm.includes('axit axetic') || norm.includes('giấm')) {
    return IR_BENCHMARK_CATALOG.acetic_acid;
  }
  if (norm.includes('ch3cho') || norm.includes('acetaldehyde') || norm.includes('anđehit axetic') || norm.includes('fermi')) {
    return IR_BENCHMARK_CATALOG.acetaldehyde;
  }
  if (norm.includes('ch3cooc2h5') || norm.includes('c4h8o2') || norm.includes('ethyl acetate') || norm.includes('etyl axetat')) {
    return IR_BENCHMARK_CATALOG.ethyl_acetate;
  }
  if (norm.includes('c2h5nh2') || norm.includes('ethylamine') || norm.includes('etylamin') || norm.includes('amin bậc 1')) {
    return IR_BENCHMARK_CATALOG.ethylamine;
  }
  if (norm.includes('benzonitrile') || norm.includes('c6h5cn') || norm.includes('nitrile') || norm.includes('nitrin')) {
    return IR_BENCHMARK_CATALOG.benzonitrile;
  }
  if (norm.includes('but-1-yne') || norm.includes('alkyne') || norm.includes('ankin đầu mạch') || norm.includes('axetilen')) {
    return IR_BENCHMARK_CATALOG.but_1_yne;
  }
  if (norm.includes('ir') || norm.includes('hồng ngoại') || norm.includes('nhóm chức') || norm.includes('dao động hóa trị') || norm.includes('ftir')) {
    return IR_BENCHMARK_CATALOG.ethanol; // Default flagship standard
  }

  return null;
}
