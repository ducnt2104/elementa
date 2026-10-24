// src/domain/massSpectrometryEngine.ts
// ============================================================================
// ELEMENTA MASS SPECTROMETRY (MS) & ISOTOPE PATTERN ANALYSIS ENGINE
// Standards: IUPAC Gold Book, CIAAW (2022) & Vietnam GDPT 2018 Chemistry 10 & 11
// Covers: Exact Isotopic Mass, Molecular Ion Peak [M]+•, Nitrogen Rule,
// Isotopic Clusters (Cl 3:1, Br 1:1, 13C 1.1% satellite), Common Neutral Losses,
// High-Resolution Mass Spectrometry (HRMS) ppm Mass Defect, and Spectral Catalog.
// ============================================================================

export interface IsotopeDef {
  symbol: string;
  massNumber: number;
  exactMassDa: number;
  naturalAbundancePct: number;
}

export interface MassSpecPeak {
  mz: number; // Mass-to-charge ratio (m/z)
  exactMz: number; // High-resolution exact mass
  relativeIntensityPct: number; // Relative to base peak (0 - 100%)
  peakType: 'MOLECULAR_ION' | 'M_PLUS_1' | 'M_PLUS_2' | 'M_PLUS_4' | 'BASE_PEAK' | 'FRAGMENT' | 'ISOTOPE_CLUSTER';
  ionFormula: string;
  lossFragment?: string; // e.g., 'M - 15 (•CH3)', 'M - 18 (H2O)'
  mechanism?: string; // e.g., 'α-cleavage', 'Tropylium rearrangement'
}

export interface FragmentationPath {
  precursorMz: number;
  productMz: number;
  neutralLossDa: number;
  neutralLossFormula: string;
  nameVI: string;
  mechanism: string;
}

export interface MassSpecCompound {
  id: string;
  name: string;
  vietnameseName: string;
  chemicalFormula: string;
  nominalMass: number;
  exactMassDa: number;
  basePeakMz: number;
  molecularIonMz: number;
  curriculumGrade: 'Grade 10' | 'Grade 11' | 'Grade 12' | 'Chuyên / Olympic';
  description: string;
  nitrogenCount: number;
  hasHalogenCluster: boolean;
  halogenType?: 'CHLORINE' | 'BROMINE' | 'MIXED' | 'NONE';
  peaks: MassSpecPeak[];
  fragmentations: FragmentationPath[];
  practicalApplications: string[];
}

export interface HRMSFormulaCandidate {
  formula: string;
  exactMassDa: number;
  deltaPpm: number;
  nitrogenCount: number;
  satisfiesNitrogenRule: boolean;
}

// ----------------------------------------------------------------------------
// EXACT ISOTOPIC MASSES & NATURAL ABUNDANCES (IUPAC CIAAW 2022)
// ----------------------------------------------------------------------------
export const ISOTOPE_STANDARDS: Record<string, IsotopeDef[]> = {
  H: [
    { symbol: '1H', massNumber: 1, exactMassDa: 1.007825, naturalAbundancePct: 99.9885 },
    { symbol: '2H (D)', massNumber: 2, exactMassDa: 2.014102, naturalAbundancePct: 0.0115 },
  ],
  C: [
    { symbol: '12C', massNumber: 12, exactMassDa: 12.000000, naturalAbundancePct: 98.93 },
    { symbol: '13C', massNumber: 13, exactMassDa: 13.003355, naturalAbundancePct: 1.07 },
  ],
  N: [
    { symbol: '14N', massNumber: 14, exactMassDa: 14.003074, naturalAbundancePct: 99.636 },
    { symbol: '15N', massNumber: 15, exactMassDa: 15.000109, naturalAbundancePct: 0.364 },
  ],
  O: [
    { symbol: '16O', massNumber: 16, exactMassDa: 15.994915, naturalAbundancePct: 99.757 },
    { symbol: '17O', massNumber: 17, exactMassDa: 16.999132, naturalAbundancePct: 0.038 },
    { symbol: '18O', massNumber: 18, exactMassDa: 17.999160, naturalAbundancePct: 0.205 },
  ],
  Cl: [
    { symbol: '35Cl', massNumber: 35, exactMassDa: 34.968853, naturalAbundancePct: 75.76 },
    { symbol: '37Cl', massNumber: 37, exactMassDa: 36.965903, naturalAbundancePct: 24.24 },
  ],
  Br: [
    { symbol: '79Br', massNumber: 79, exactMassDa: 78.918338, naturalAbundancePct: 50.69 },
    { symbol: '81Br', massNumber: 81, exactMassDa: 80.916291, naturalAbundancePct: 49.31 },
  ],
  S: [
    { symbol: '32S', massNumber: 32, exactMassDa: 31.972071, naturalAbundancePct: 94.99 },
    { symbol: '34S', massNumber: 34, exactMassDa: 33.967867, naturalAbundancePct: 4.25 },
  ],
};

// ----------------------------------------------------------------------------
// BENCHMARK CURRICULUM MASS SPECTRA CATALOG
// ----------------------------------------------------------------------------
export const MASS_SPEC_CATALOG: Record<string, MassSpecCompound> = {
  ethanol: {
    id: 'ethanol',
    name: 'Ethanol',
    vietnameseName: 'Ethanol (Ancol etylic)',
    chemicalFormula: 'C2H6O',
    nominalMass: 46,
    exactMassDa: 46.041865,
    basePeakMz: 31,
    molecularIonMz: 46,
    curriculumGrade: 'Grade 11',
    description: 'Ancol bậc 1 kinh điển trong SGK Hóa 11. Đỉnh ion phân tử [M]+• (m/z = 46) cường độ thấp (~15%) do liên kết C-C dễ bị đứt gãy qua cơ chế cắt α (α-cleavage) tạo mảnh ion oxonium [CH2=OH]+ (m/z = 31) là đỉnh cơ bản (base peak, 100%).',
    nitrogenCount: 0,
    hasHalogenCluster: false,
    halogenType: 'NONE',
    peaks: [
      { mz: 15, exactMz: 15.023475, relativeIntensityPct: 12, peakType: 'FRAGMENT', ionFormula: 'CH3+', lossFragment: 'M - 31 (•CH2OH)', mechanism: 'Đứt liên kết C-C' },
      { mz: 27, exactMz: 27.023475, relativeIntensityPct: 22, peakType: 'FRAGMENT', ionFormula: 'C2H3+', lossFragment: 'M - 19', mechanism: 'Tách H2O và H' },
      { mz: 29, exactMz: 29.039125, relativeIntensityPct: 28, peakType: 'FRAGMENT', ionFormula: 'C2H5+ / CHO+', lossFragment: 'M - 17 (•OH)', mechanism: 'Tách gốc hydroxyl' },
      { mz: 31, exactMz: 31.018390, relativeIntensityPct: 100, peakType: 'BASE_PEAK', ionFormula: 'CH2=OH+', lossFragment: 'M - 15 (•CH3)', mechanism: 'Cắt α (α-cleavage) giải tỏa điện tích trên O' },
      { mz: 45, exactMz: 45.034040, relativeIntensityPct: 35, peakType: 'FRAGMENT', ionFormula: 'C2H5O+', lossFragment: 'M - 1 (•H)', mechanism: 'Tách nguyên tử H từ C hoặc O' },
      { mz: 46, exactMz: 46.041865, relativeIntensityPct: 15, peakType: 'MOLECULAR_ION', ionFormula: '[C2H6O]+•', mechanism: 'Ion hóa bắn phá electron (EI 70 eV)' },
      { mz: 47, exactMz: 47.045220, relativeIntensityPct: 0.36, peakType: 'M_PLUS_1', ionFormula: '[13C 12C H6 O]+•', mechanism: 'Vệ tinh đồng vị 13C (2 x 1.1% ≈ 2.2% của [M])' },
    ],
    fragmentations: [
      { precursorMz: 46, productMz: 31, neutralLossDa: 15, neutralLossFormula: '•CH3', nameVI: 'Mất gốc metyl (Cắt α)', mechanism: 'Đứt dị ly giải tỏa cation trên oxy' },
      { precursorMz: 46, productMz: 45, neutralLossDa: 1, neutralLossFormula: '•H', nameVI: 'Mất nguyên tử hydro', mechanism: 'Tách proton gốc' },
      { precursorMz: 46, productMz: 29, neutralLossDa: 17, neutralLossFormula: '•OH', nameVI: 'Mất nhóm hiđroxyl', mechanism: 'Đứt liên kết C-O' },
    ],
    practicalApplications: [
      'Xác định cấu trúc ancol bậc 1 thông qua mảnh ion oxonium m/z = 31',
      'Định lượng nồng độ cồn trong pháp y và kiểm nghiệm đồ uống có cồn',
    ],
  },

  acetone: {
    id: 'acetone',
    name: 'Acetone',
    vietnameseName: 'Axeton (Propan-2-one)',
    chemicalFormula: 'C3H6O',
    nominalMass: 58,
    exactMassDa: 58.041865,
    basePeakMz: 43,
    molecularIonMz: 58,
    curriculumGrade: 'Grade 11',
    description: 'Xeton đối xứng tiêu biểu trong SGK Hóa 11. Đỉnh ion phân tử m/z = 58 rõ nét (~25%). Cắt liên kết C-C cạnh nhóm cacbonyl tạo ion axyli (acylium ion [CH3-C≡O]+, m/z = 43) cực bền nhờ giải tỏa cộng hưởng ba liên kết, trở thành đỉnh cơ bản (100%).',
    nitrogenCount: 0,
    hasHalogenCluster: false,
    halogenType: 'NONE',
    peaks: [
      { mz: 15, exactMz: 15.023475, relativeIntensityPct: 30, peakType: 'FRAGMENT', ionFormula: 'CH3+', lossFragment: 'M - 43 (•COCH3)', mechanism: 'Mảnh cation metyl' },
      { mz: 42, exactMz: 42.010565, relativeIntensityPct: 8, peakType: 'FRAGMENT', ionFormula: 'CH2=C=O+•', lossFragment: 'M - 16 (CH4)', mechanism: 'Tách metan tạo ion keten' },
      { mz: 43, exactMz: 43.018390, relativeIntensityPct: 100, peakType: 'BASE_PEAK', ionFormula: 'CH3-C≡O+', lossFragment: 'M - 15 (•CH3)', mechanism: 'Cắt α tạo ion axyli (acylium) bền vững' },
      { mz: 58, exactMz: 58.041865, relativeIntensityPct: 26, peakType: 'MOLECULAR_ION', ionFormula: '[C3H6O]+•', mechanism: 'Ion hóa electron phân tử nguyên vẹn' },
      { mz: 59, exactMz: 59.045220, relativeIntensityPct: 0.86, peakType: 'M_PLUS_1', ionFormula: '[13C C2 H6 O]+•', mechanism: 'Vệ tinh đồng vị 13C (3 x 1.1% ≈ 3.3% của [M])' },
    ],
    fragmentations: [
      { precursorMz: 58, productMz: 43, neutralLossDa: 15, neutralLossFormula: '•CH3', nameVI: 'Mất gốc metyl (Tạo ion axyli)', mechanism: 'Cắt α nhóm cacbonyl' },
      { precursorMz: 43, productMz: 15, neutralLossDa: 28, neutralLossFormula: 'CO', nameVI: 'Mất khí carbon monoxide', mechanism: 'Tách CO trung hòa tạo cation metyl' },
    ],
    practicalApplications: [
      'Phân biệt xeton và anđehit trong phân tích cấu trúc phổ nghiệm',
      'Định lượng axeton trong nước tiểu người bệnh tiểu đường (xeton niệu)',
    ],
  },

  toluene: {
    id: 'toluene',
    name: 'Toluene',
    vietnameseName: 'Toluen (Metylbenzen)',
    chemicalFormula: 'C7H8',
    nominalMass: 92,
    exactMassDa: 92.062600,
    basePeakMz: 91,
    molecularIonMz: 92,
    curriculumGrade: 'Grade 11',
    description: 'Aren tiêu biểu trong SGK Hóa 11. Đỉnh ion phân tử [M]+• (m/z = 92) rất mạnh (~65%). Tách một nguyên tử hydro benzylic tạo cation tropylium (vòng 7 cạnh thơm [C7H7]+, m/z = 91) cực kỳ bền vững theo quy tắc Huckel 6e π, tạo đỉnh cơ bản 100%.',
    nitrogenCount: 0,
    hasHalogenCluster: false,
    halogenType: 'NONE',
    peaks: [
      { mz: 39, exactMz: 39.023475, relativeIntensityPct: 15, peakType: 'FRAGMENT', ionFormula: 'C3H3+', mechanism: 'Phân mảnh sâu vòng thơm' },
      { mz: 51, exactMz: 51.023475, relativeIntensityPct: 12, peakType: 'FRAGMENT', ionFormula: 'C4H3+', mechanism: 'Phân mảnh cation phenyl' },
      { mz: 65, exactMz: 65.039125, relativeIntensityPct: 18, peakType: 'FRAGMENT', ionFormula: 'C5H5+', lossFragment: '91 - 26 (C2H2)', mechanism: 'Ion tropylium tách axetilen' },
      { mz: 91, exactMz: 91.054775, relativeIntensityPct: 100, peakType: 'BASE_PEAK', ionFormula: '[C7H7]+ (Tropylium)', lossFragment: 'M - 1 (•H)', mechanism: 'Mở rộng vòng thành ion tropylium thơm bền' },
      { mz: 92, exactMz: 92.062600, relativeIntensityPct: 68, peakType: 'MOLECULAR_ION', ionFormula: '[C7H8]+•', mechanism: 'Ion hóa electron phân tử thơm' },
      { mz: 93, exactMz: 93.065955, relativeIntensityPct: 5.2, peakType: 'M_PLUS_1', ionFormula: '[13C C6 H8]+•', mechanism: 'Vệ tinh đồng vị 13C (7 x 1.1% ≈ 7.7% của [M])' },
    ],
    fragmentations: [
      { precursorMz: 92, productMz: 91, neutralLossDa: 1, neutralLossFormula: '•H', nameVI: 'Tách nguyên tử H benzylic', mechanism: 'Chuyển vị tạo ion Tropylium thơm' },
      { precursorMz: 91, productMz: 65, neutralLossDa: 26, neutralLossFormula: 'C2H2', nameVI: 'Mất phân tử axetilen', mechanism: 'Thu hẹp vòng thơm 7 cạnh về vòng 5 cạnh cyclopentadienyl' },
    ],
    practicalApplications: [
      'Nhận diện nhóm benzyl (-CH2-C6H5) trong hợp chất thiên nhiên qua mảnh m/z = 91',
      'Quan trắc ô nhiễm dung môi thơm BTX trong không khí đô thị',
    ],
  },

  chlorobenzene: {
    id: 'chlorobenzene',
    name: 'Chlorobenzene',
    vietnameseName: 'Clorobenzen',
    chemicalFormula: 'C6H5Cl',
    nominalMass: 112,
    exactMassDa: 112.007978,
    basePeakMz: 112,
    molecularIonMz: 112,
    curriculumGrade: 'Grade 11',
    description: 'Dẫn xuất halogen kinh điển minh họa dải đồng vị Clo: 35Cl (75.8%) và 37Cl (24.2%). Đỉnh ion phân tử [M]+• xuất hiện dưới dạng chùm đôi (doublet) đặc trưng ở m/z = 112 và [M+2] = 114 với tỷ lệ cường độ chuẩn mực xấp xỉ 3 : 1.',
    nitrogenCount: 0,
    hasHalogenCluster: true,
    halogenType: 'CHLORINE',
    peaks: [
      { mz: 51, exactMz: 51.023475, relativeIntensityPct: 25, peakType: 'FRAGMENT', ionFormula: 'C4H3+', mechanism: 'Phân mảnh thứ cấp vòng phenyl' },
      { mz: 77, exactMz: 77.039125, relativeIntensityPct: 65, peakType: 'FRAGMENT', ionFormula: '[C6H5]+ (Phenyl)', lossFragment: 'M - 35 (•Cl)', mechanism: 'Mất gốc clo tự do' },
      { mz: 112, exactMz: 112.007978, relativeIntensityPct: 100, peakType: 'BASE_PEAK', ionFormula: '[C6H5 35Cl]+•', mechanism: 'Ion phân tử chứa đồng vị 35Cl' },
      { mz: 113, exactMz: 113.011333, relativeIntensityPct: 6.6, peakType: 'M_PLUS_1', ionFormula: '[13C C5 H5 35Cl]+•', mechanism: 'Vệ tinh 13C của đỉnh 112 (6 x 1.1% = 6.6%)' },
      { mz: 114, exactMz: 114.005028, relativeIntensityPct: 32.5, peakType: 'M_PLUS_2', ionFormula: '[C6H5 37Cl]+•', mechanism: 'Ion phân tử chứa đồng vị 37Cl (tỷ lệ 3:1)' },
      { mz: 115, exactMz: 115.008383, relativeIntensityPct: 2.1, peakType: 'ISOTOPE_CLUSTER', ionFormula: '[13C C5 H5 37Cl]+•', mechanism: 'Vệ tinh 13C của đỉnh 114' },
    ],
    fragmentations: [
      { precursorMz: 112, productMz: 77, neutralLossDa: 35, neutralLossFormula: '•35Cl', nameVI: 'Mất gốc clo 35', mechanism: 'Đứt liên kết C-Cl tạo cation phenyl' },
      { precursorMz: 114, productMz: 77, neutralLossDa: 37, neutralLossFormula: '•37Cl', nameVI: 'Mất gốc clo 37', mechanism: 'Đứt liên kết C-Cl tạo cation phenyl' },
    ],
    practicalApplications: [
      'Nhận biết số lượng nguyên tử Clo trong hợp chất nhờ tỷ lệ chùm đỉnh [M] : [M+2] = 3:1',
      'Giám sát dư lượng thuốc bảo vệ thực vật clo hữu cơ (DDT, Lindane) trong môi trường',
    ],
  },

  bromobenzene: {
    id: 'bromobenzene',
    name: 'Bromobenzene',
    vietnameseName: 'Bromobenzen',
    chemicalFormula: 'C6H5Br',
    nominalMass: 156,
    exactMassDa: 155.957463,
    basePeakMz: 156,
    molecularIonMz: 156,
    curriculumGrade: 'Grade 11',
    description: 'Dẫn xuất halogen minh họa dải đồng vị Brom: 79Br (50.7%) và 81Br (49.3%). Xuất hiện cặp chùm đôi (doublet) m/z = 156 và [M+2] = 158 có chiều cao gần như ngang nhau (tỷ lệ chuẩn mực xấp xỉ 1 : 1), đặc điểm nhận dạng không thể nhầm lẫn.',
    nitrogenCount: 0,
    hasHalogenCluster: true,
    halogenType: 'BROMINE',
    peaks: [
      { mz: 50, exactMz: 50.015650, relativeIntensityPct: 18, peakType: 'FRAGMENT', ionFormula: 'C4H2+•', mechanism: 'Phân mảnh thứ cấp' },
      { mz: 77, exactMz: 77.039125, relativeIntensityPct: 70, peakType: 'FRAGMENT', ionFormula: '[C6H5]+ (Phenyl)', lossFragment: 'M - 79/81 (•Br)', mechanism: 'Mất gốc brom tự do' },
      { mz: 156, exactMz: 155.957463, relativeIntensityPct: 100, peakType: 'BASE_PEAK', ionFormula: '[C6H5 79Br]+•', mechanism: 'Ion phân tử chứa đồng vị 79Br' },
      { mz: 157, exactMz: 156.960818, relativeIntensityPct: 6.6, peakType: 'M_PLUS_1', ionFormula: '[13C C5 H5 79Br]+•', mechanism: 'Vệ tinh 13C của đỉnh 156' },
      { mz: 158, exactMz: 157.955416, relativeIntensityPct: 98.0, peakType: 'M_PLUS_2', ionFormula: '[C6H5 81Br]+•', mechanism: 'Ion phân tử chứa đồng vị 81Br (tỷ lệ 1:1)' },
      { mz: 159, exactMz: 158.958771, relativeIntensityPct: 6.5, peakType: 'ISOTOPE_CLUSTER', ionFormula: '[13C C5 H5 81Br]+•', mechanism: 'Vệ tinh 13C của đỉnh 158' },
    ],
    fragmentations: [
      { precursorMz: 156, productMz: 77, neutralLossDa: 79, neutralLossFormula: '•79Br', nameVI: 'Mất gốc brom 79', mechanism: 'Đứt liên kết C-Br tạo cation phenyl' },
      { precursorMz: 158, productMz: 77, neutralLossDa: 81, neutralLossFormula: '•81Br', nameVI: 'Mất gốc brom 81', mechanism: 'Đứt liên kết C-Br tạo cation phenyl' },
    ],
    practicalApplications: [
      'Phát hiện chất chống cháy brom hóa (BFRs) và phụ gia polymer độc hại',
      'Minh họa cặp đồng vị ngang bằng [M]:[M+2] ≈ 1:1 trong giảng dạy SGK',
    ],
  },

  ethyl_acetate: {
    id: 'ethyl_acetate',
    name: 'Ethyl Acetate',
    vietnameseName: 'Etyl axetat',
    chemicalFormula: 'C4H8O2',
    nominalMass: 88,
    exactMassDa: 88.052429,
    basePeakMz: 43,
    molecularIonMz: 88,
    curriculumGrade: 'Grade 12',
    description: 'Este no đơn chức mở đầu chương 1 Hóa học 12. Phổ khối có ion phân tử m/z = 88 cường độ nhỏ (~8%). Đỉnh cơ bản cực lớn m/z = 43 tương ứng ion axyli [CH3CO]+ do đứt liên kết C-O este; đỉnh m/z = 61 tương ứng axit axetic proton hóa do chuyển vị McLafferty-like.',
    nitrogenCount: 0,
    hasHalogenCluster: false,
    halogenType: 'NONE',
    peaks: [
      { mz: 29, exactMz: 29.039125, relativeIntensityPct: 22, peakType: 'FRAGMENT', ionFormula: 'C2H5+', lossFragment: 'M - 59 (•COOCH3)', mechanism: 'Cation etyl' },
      { mz: 43, exactMz: 43.018390, relativeIntensityPct: 100, peakType: 'BASE_PEAK', ionFormula: 'CH3-C≡O+', lossFragment: 'M - 45 (•OCH2CH3)', mechanism: 'Cắt liên kết este tạo ion axyli bền' },
      { mz: 45, exactMz: 45.034040, relativeIntensityPct: 14, peakType: 'FRAGMENT', ionFormula: 'CH3CH2O+', lossFragment: 'M - 43 (•COCH3)', mechanism: 'Cation etoxy' },
      { mz: 61, exactMz: 61.028955, relativeIntensityPct: 16, peakType: 'FRAGMENT', ionFormula: 'CH3C(OH)2+', lossFragment: 'M - 27 (C2H3)', mechanism: 'Chuyển vị hydro tạo ion axit proton hóa' },
      { mz: 73, exactMz: 73.028955, relativeIntensityPct: 6, peakType: 'FRAGMENT', ionFormula: 'C3H5O2+', lossFragment: 'M - 15 (•CH3)', mechanism: 'Tách metyl' },
      { mz: 88, exactMz: 88.052429, relativeIntensityPct: 8, peakType: 'MOLECULAR_ION', ionFormula: '[C4H8O2]+•', mechanism: 'Ion hóa phân tử este' },
    ],
    fragmentations: [
      { precursorMz: 88, productMz: 43, neutralLossDa: 45, neutralLossFormula: '•OCH2CH3', nameVI: 'Mất gốc etoxy', mechanism: 'Đứt liên kết este axyl-oxy' },
      { precursorMz: 88, productMz: 61, neutralLossDa: 27, neutralLossFormula: 'C2H4 - H', nameVI: 'Chuyển dịch H & mất etilen', mechanism: 'Chuyển vị McLafferty mất C2H4 (28 Da) cho ion m/z=60/61' },
    ],
    practicalApplications: [
      'Phân tích hương liệu mùi thơm hoa quả trong thực phẩm và nước hoa',
      'Giám sát phản ứng este hóa Fischer và độ tinh khiết sản phẩm',
    ],
  },

  aniline: {
    id: 'aniline',
    name: 'Aniline',
    vietnameseName: 'Anilin (Benzenamin)',
    chemicalFormula: 'C6H7N',
    nominalMass: 93,
    exactMassDa: 93.057849,
    basePeakMz: 93,
    molecularIonMz: 93,
    curriculumGrade: 'Grade 12',
    description: 'Amin thơm tiêu biểu minh họa Quy Tắc Nitơ (Nitrogen Rule): Vì phân tử chứa 1 nguyên tử N (số lẻ), phân tử khối danh nghĩa là 93 (SỐ LẺ). Đỉnh ion phân tử [M]+• (m/z = 93) đồng thời là đỉnh cơ bản (100%) do hệ liên hợp thơm giải tỏa điện tích cực kỳ bền vững.',
    nitrogenCount: 1,
    hasHalogenCluster: false,
    halogenType: 'NONE',
    peaks: [
      { mz: 39, exactMz: 39.023475, relativeIntensityPct: 16, peakType: 'FRAGMENT', ionFormula: 'C3H3+', mechanism: 'Phân mảnh sâu' },
      { mz: 65, exactMz: 65.039125, relativeIntensityPct: 24, peakType: 'FRAGMENT', ionFormula: 'C5H5+', lossFragment: '93 - 28 (HCN/H)', mechanism: 'Tách hydro xyanua HCN tạo cation cyclopentadienyl' },
      { mz: 66, exactMz: 66.046950, relativeIntensityPct: 35, peakType: 'FRAGMENT', ionFormula: 'C5H6+•', lossFragment: 'M - 27 (HCN)', mechanism: 'Mất phân tử hydro xyanua (HCN = 27 Da)' },
      { mz: 92, exactMz: 92.050024, relativeIntensityPct: 12, peakType: 'FRAGMENT', ionFormula: '[C6H6N]+', lossFragment: 'M - 1 (•H)', mechanism: 'Tách H từ nhóm amino' },
      { mz: 93, exactMz: 93.057849, relativeIntensityPct: 100, peakType: 'BASE_PEAK', ionFormula: '[C6H7N]+•', mechanism: 'Ion hóa electron phân tử thơm (Khối lượng LẺ 93)' },
      { mz: 94, exactMz: 94.061204, relativeIntensityPct: 7.0, peakType: 'M_PLUS_1', ionFormula: '[13C C5 H7 N]+•', mechanism: 'Vệ tinh 13C (6 x 1.1% + 1 x 0.36% ≈ 7.0%)' },
    ],
    fragmentations: [
      { precursorMz: 93, productMz: 66, neutralLossDa: 27, neutralLossFormula: 'HCN', nameVI: 'Mất phân tử Hydro xyanua (HCN)', mechanism: 'Thu hẹp vòng amin thơm mất mảnh 27 Da' },
      { precursorMz: 93, productMz: 92, neutralLossDa: 1, neutralLossFormula: '•H', nameVI: 'Tách hydro từ nhóm -NH2', mechanism: 'Giải tỏa gốc tự do' },
    ],
    practicalApplications: [
      'Minh họa Quy tắc Nitơ (Nitrogen Rule): 1 nguyên tử N → Phân tử khối lẻ 93',
      'Kiểm soát độc chất amin thơm và phẩm màu azo trong công nghiệp dệt may',
    ],
  },

  dichloromethane: {
    id: 'dichloromethane',
    name: 'Dichloromethane',
    vietnameseName: 'Điclometan (Metylen clorua)',
    chemicalFormula: 'CH2Cl2',
    nominalMass: 84,
    exactMassDa: 83.953356,
    basePeakMz: 49,
    molecularIonMz: 84,
    curriculumGrade: 'Grade 11',
    description: 'Hợp chất chứa 2 nguyên tử Clo minh họa tam bội thể đồng vị (triplet cluster): Khai triển nhị thức (3a + b)² cho tỷ lệ chùm đỉnh [M] : [M+2] : [M+4] xấp xỉ 9 : 6 : 1 ở các giá trị m/z = 84, 86, 88. Đỉnh cơ bản m/z = 49 là ion [CH2(35Cl)]+.',
    nitrogenCount: 0,
    hasHalogenCluster: true,
    halogenType: 'CHLORINE',
    peaks: [
      { mz: 49, exactMz: 48.984503, relativeIntensityPct: 100, peakType: 'BASE_PEAK', ionFormula: '[CH2 35Cl]+', lossFragment: 'M - 35 (•35Cl)', mechanism: 'Mất gốc clo 35' },
      { mz: 51, exactMz: 50.981553, relativeIntensityPct: 32, peakType: 'FRAGMENT', ionFormula: '[CH2 37Cl]+', lossFragment: 'M - 35 (•35Cl)', mechanism: 'Mất gốc clo 35 từ phân tử mang clo 37' },
      { mz: 84, exactMz: 83.953356, relativeIntensityPct: 58, peakType: 'MOLECULAR_ION', ionFormula: '[CH2 35Cl2]+•', mechanism: 'Ion phân tử [M] (hai nguyên tử 35Cl)' },
      { mz: 86, exactMz: 85.950406, relativeIntensityPct: 37, peakType: 'M_PLUS_2', ionFormula: '[CH2 35Cl 37Cl]+•', mechanism: 'Ion phân tử [M+2] (một 35Cl, một 37Cl) tỷ lệ 6/9' },
      { mz: 88, exactMz: 87.947456, relativeIntensityPct: 6, peakType: 'M_PLUS_4', ionFormula: '[CH2 37Cl2]+•', mechanism: 'Ion phân tử [M+4] (hai nguyên tử 37Cl) tỷ lệ 1/9' },
    ],
    fragmentations: [
      { precursorMz: 84, productMz: 49, neutralLossDa: 35, neutralLossFormula: '•35Cl', nameVI: 'Mất gốc clo 35', mechanism: 'Đứt liên kết C-Cl' },
      { precursorMz: 86, productMz: 51, neutralLossDa: 35, neutralLossFormula: '•35Cl', nameVI: 'Mất gốc clo 35 từ mảnh Cl37', mechanism: 'Đứt liên kết C-Cl' },
    ],
    practicalApplications: [
      'Chứng minh tỷ lệ nhị thức tam giác Pascal cho hệ 2 dị nguyên tử Clo (9:6:1)',
      'Phát hiện dung môi độc hại trong trích ly dược phẩm và cafein',
    ],
  },
};

// ----------------------------------------------------------------------------
// DOMAIN LOGIC FUNCTIONS
// ----------------------------------------------------------------------------

/**
 * Checks the Nitrogen Rule for a given molecular formula or nominal mass and nitrogen count:
 * Even mass -> 0, 2, 4... nitrogens
 * Odd mass -> 1, 3, 5... nitrogens
 */
export function checkNitrogenRule(nominalMass: number, nitrogenCount: number): {
  satisfiesRule: boolean;
  isEvenMass: boolean;
  message: string;
} {
  const isEvenMass = nominalMass % 2 === 0;
  const isEvenNitrogen = nitrogenCount % 2 === 0;
  const satisfiesRule = (isEvenMass && isEvenNitrogen) || (!isEvenMass && !isEvenNitrogen);

  let message = '';
  if (satisfiesRule) {
    message = isEvenMass
      ? `Phù hợp Quy tắc Nitơ: Phân tử khối chẵn (${nominalMass}) chứa số chẵn nguyên tử N (${nitrogenCount}).`
      : `Phù hợp Quy tắc Nitơ: Phân tử khối lẻ (${nominalMass}) chứa số lẻ nguyên tử N (${nitrogenCount}).`;
  } else {
    message = isEvenMass
      ? `Vi phạm Quy tắc Nitơ: Phân tử khối chẵn (${nominalMass}) không thể chứa số lẻ nguyên tử N (${nitrogenCount}).`
      : `Vi phạm Quy tắc Nitơ: Phân tử khối lẻ (${nominalMass}) không thể chứa số chẵn nguyên tử N (${nitrogenCount}).`;
  }

  return { satisfiesRule, isEvenMass, message };
}

/**
 * Estimates the number of Carbon atoms from [M] and [M+1] peak intensities:
 * n_C ≈ [M+1] / (0.011 · [M])
 */
export function estimateCarbonCountFromMPlusOne(
  mIntensity: number,
  mPlusOneIntensity: number
): { estimatedCarbons: number; formulaConfidence: string } {
  if (mIntensity <= 0 || mPlusOneIntensity <= 0) {
    return { estimatedCarbons: 0, formulaConfidence: 'Không đủ dữ liệu vệt vệ tinh 13C.' };
  }
  const rawN = mPlusOneIntensity / (0.011 * mIntensity);
  const estimatedCarbons = Math.max(1, Math.round(rawN));
  const diff = Math.abs(rawN - estimatedCarbons);
  const confidence = diff < 0.25 ? 'Độ tin cậy cao (Rất khớp 13C)' : 'Độ tin cậy trung bình (Có thể có đóng góp từ 2H hoặc 15N)';

  return { estimatedCarbons, formulaConfidence: confidence };
}

/**
 * Computes theoretical binomial isotope cluster intensities for halogen combinations:
 * Chlorine: p = 0.7576 (35Cl), q = 0.2424 (37Cl)
 * Bromine: p = 0.5069 (79Br), q = 0.4931 (81Br)
 */
export function calculateHalogenIsotopePattern(
  clCount: number,
  brCount: number
): { deltaM: number; relativeIntensityPct: number }[] {
  // If no halogens, only monoisotopic peak
  if (clCount === 0 && brCount === 0) {
    return [{ deltaM: 0, relativeIntensityPct: 100.0 }];
  }

  // Polynomial multiplication for (p35 + q37)^cl * (p79 + q81)^br
  // Each step increases mass by 2 Da
  const maxDeltaM = (clCount + brCount) * 2;
  const numPeaks = clCount + brCount + 1;
  const probs = new Array(numPeaks).fill(0);

  // Single chlorine: [0] = 0.7576, [1] = 0.2424
  // Single bromine: [0] = 0.5069, [1] = 0.4931
  let current = [1.0];

  for (let c = 0; c < clCount; c++) {
    const next = new Array(current.length + 1).fill(0);
    for (let i = 0; i < current.length; i++) {
      next[i] += current[i] * 0.7576;
      next[i + 1] += current[i] * 0.2424;
    }
    current = next;
  }

  for (let b = 0; b < brCount; b++) {
    const next = new Array(current.length + 1).fill(0);
    for (let i = 0; i < current.length; i++) {
      next[i] += current[i] * 0.5069;
      next[i + 1] += current[i] * 0.4931;
    }
    current = next;
  }

  const maxProb = Math.max(...current);
  const result: { deltaM: number; relativeIntensityPct: number }[] = [];

  for (let k = 0; k < current.length; k++) {
    result.push({
      deltaM: k * 2,
      relativeIntensityPct: Number(((current[k] / maxProb) * 100.0).toFixed(1)),
    });
  }

  return result;
}

/**
 * Calculates mass measurement accuracy in parts per million (ppm) for High-Resolution MS:
 * Δppm = |m_observed - m_theoretical| / m_theoretical * 10^6
 */
export function calculateMassAccuracyPpm(observedMz: number, theoreticalMz: number): number {
  if (theoreticalMz <= 0) return 999999;
  const deltaPpm = (Math.abs(observedMz - theoreticalMz) / theoreticalMz) * 1e6;
  return Number(deltaPpm.toFixed(2));
}

/**
 * Searches and ranks HRMS candidate formulas for nominal mass 44/46 within ppm tolerance
 */
export function matchHRMSFormulaCandidates(
  observedExactMz: number,
  tolerancePpm: number = 10.0
): HRMSFormulaCandidate[] {
  // Common volatile formulas around mass 44-46
  const CANDIDATES: { formula: string; exactMassDa: number; nitrogenCount: number }[] = [
    // Mass 44 candidates
    { formula: 'CO2', exactMassDa: 43.989830, nitrogenCount: 0 },
    { formula: 'N2O', exactMassDa: 44.001064, nitrogenCount: 2 },
    { formula: 'C2H4O (Acetaldehyde / Ethylene oxide)', exactMassDa: 44.026215, nitrogenCount: 0 },
    { formula: 'C3H8 (Propane)', exactMassDa: 44.062600, nitrogenCount: 0 },
    { formula: 'CH2NO', exactMassDa: 44.013639, nitrogenCount: 1 },

    // Mass 46 candidates
    { formula: 'C2H6O (Ethanol / Dimethyl ether)', exactMassDa: 46.041865, nitrogenCount: 0 },
    { formula: 'NO2', exactMassDa: 45.992904, nitrogenCount: 1 },
    { formula: 'H2CO2 (Formic acid)', exactMassDa: 46.005479, nitrogenCount: 0 },
  ];

  const results: HRMSFormulaCandidate[] = [];

  for (const cand of CANDIDATES) {
    const deltaPpm = calculateMassAccuracyPpm(observedExactMz, cand.exactMassDa);
    if (deltaPpm <= tolerancePpm) {
      const nominal = Math.round(cand.exactMassDa);
      const rule = checkNitrogenRule(nominal, cand.nitrogenCount);
      results.push({
        formula: cand.formula,
        exactMassDa: cand.exactMassDa,
        deltaPpm,
        nitrogenCount: cand.nitrogenCount,
        satisfiesNitrogenRule: rule.satisfiesRule,
      });
    }
  }

  return results.sort((a, b) => a.deltaPpm - b.deltaPpm);
}

/**
 * Matching function for Card Detail modal and Codex
 */
export function getMatchingMassSpecConcept(
  card: { name?: string; chemicalFormula?: string; description?: string; element?: string }
): MassSpecCompound | null {
  const norm = `${card.name || ''} ${card.chemicalFormula || ''} ${card.description || ''}`.toLowerCase();

  if (norm.includes('c2h6o') || norm.includes('ethanol') || norm.includes('ancol etylic') || norm.includes('rượu etylic')) {
    return MASS_SPEC_CATALOG.ethanol;
  }
  if (norm.includes('c3h6o') || norm.includes('acetone') || norm.includes('axeton') || norm.includes('propan-2-one')) {
    return MASS_SPEC_CATALOG.acetone;
  }
  if (norm.includes('c7h8') || norm.includes('toluene') || norm.includes('toluen') || norm.includes('tropylium')) {
    return MASS_SPEC_CATALOG.toluene;
  }
  if (norm.includes('c6h5cl') || norm.includes('chlorobenzene') || norm.includes('clorobenzen')) {
    return MASS_SPEC_CATALOG.chlorobenzene;
  }
  if (norm.includes('c6h5br') || norm.includes('bromobenzene') || norm.includes('bromobenzen')) {
    return MASS_SPEC_CATALOG.bromobenzene;
  }
  if (norm.includes('c4h8o2') || norm.includes('ethyl acetate') || norm.includes('etyl axetat')) {
    return MASS_SPEC_CATALOG.ethyl_acetate;
  }
  if (norm.includes('c6h7n') || norm.includes('aniline') || norm.includes('anilin') || norm.includes('benzenamin')) {
    return MASS_SPEC_CATALOG.aniline;
  }
  if (norm.includes('ch2cl2') || norm.includes('dichloromethane') || norm.includes('điclometan')) {
    return MASS_SPEC_CATALOG.dichloromethane;
  }
  if (norm.includes('mass spec') || norm.includes('phổ khối') || norm.includes('ion phân tử') || norm.includes('m/z') || norm.includes('mclafferty')) {
    return MASS_SPEC_CATALOG.toluene; // Default flagship compound
  }

  return null;
}
