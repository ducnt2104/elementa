// src/domain/nmrSpectroscopyEngine.ts
// ============================================================================
// ELEMENTA NUCLEAR MAGNETIC RESONANCE (¹H & ¹³C NMR) SPECTROSCOPY ENGINE
// Standards: IUPAC Recommendations & Vietnam GDPT 2018 Chemistry 11/12
// Covers: Nuclear Spin (I = 1/2), Larmor Precession (ν = γ·B0 / 2π),
// Chemical Shift (δ ppm relative to TMS = 0), Spin-Spin Scalar Coupling (n+1 rule),
// Pascal Triangle Multiplet Split Ratios, Proton Integration Area Proportionality,
// Chemical/Magnetic Equivalence & Symmetry, and Curriculum Benchmark Spectra.
// ============================================================================

export type NMRNucleus = '1H' | '13C';
export type NMRMultiplicityType = 's' | 'd' | 't' | 'q' | 'quint' | 'sext' | 'sept' | 'm';

export interface NMRPeakSignal {
  deltaPpm: number;
  multiplicity: NMRMultiplicityType;
  multiplicityLabelVI: string; // e.g., 'Singlet (Mũi đơn)', 'Triplet (Mũi ba)'
  integrationProtons: number; // For 1H (e.g., 3 for -CH3, 2 for -CH2-)
  couplingConstantHz?: number; // Scalar coupling J (e.g. 7.1 Hz)
  assignment: string; // e.g., '-CH3 adjacent to carbonyl', 'aromatic C2/C6'
  assignmentVI: string;
  pascalRatio: number[]; // e.g., [1, 2, 1] for triplet
}

export interface NMRDiagnosticRegion {
  nucleus: NMRNucleus;
  minDeltaPpm: number;
  maxDeltaPpm: number;
  name: string;
  nameVI: string;
  descriptionVI: string;
  typicalProtonsOrCarbons: string[];
}

export interface NMRCompound {
  id: string;
  name: string;
  vietnameseName: string;
  chemicalFormula: string;
  molecularWeight: number;
  symmetryDescriptionVI: string;
  curriculumGrade: 'Grade 11' | 'Grade 12' | 'Chuyên / Olympic';
  descriptionVI: string;
  protonSignals: NMRPeakSignal[]; // 1H NMR signals
  carbonSignals: NMRPeakSignal[]; // 13C NMR signals
  uniqueProtonEnvironments: number;
  uniqueCarbonEnvironments: number;
  totalProtons: number;
  totalCarbons: number;
  practicalApplicationsVI: string[];
}

// ----------------------------------------------------------------------------
// FUNDAMENTAL PHYSICAL CONSTANTS & NUCLEAR GYROMAGNETIC RATIOS (IUPAC)
// ----------------------------------------------------------------------------
export const GYROMAGNETIC_RATIOS = {
  // γ in rad / (s · T)
  '1H': 267.522e6,
  '13C': 67.2828e6,
  '19F': 251.815e6,
  '31P': 108.394e6,
  '14N': 19.331e6,
  '2H': 41.066e6,
} as const;

export interface NuclearSpinInfo {
  nucleus: string;
  spinQuantumNumber: number; // I
  isNMRActive: boolean;
  relativeSensitivity: number; // Relative to 1H = 1.00
  naturalAbundancePercent: number;
}

export const NUCLEAR_SPIN_CATALOG: Record<string, NuclearSpinInfo> = {
  '1H': { nucleus: '1H', spinQuantumNumber: 0.5, isNMRActive: true, relativeSensitivity: 1.00, naturalAbundancePercent: 99.9885 },
  '13C': { nucleus: '13C', spinQuantumNumber: 0.5, isNMRActive: true, relativeSensitivity: 0.0159, naturalAbundancePercent: 1.07 },
  '12C': { nucleus: '12C', spinQuantumNumber: 0.0, isNMRActive: false, relativeSensitivity: 0.0, naturalAbundancePercent: 98.93 },
  '16O': { nucleus: '16O', spinQuantumNumber: 0.0, isNMRActive: false, relativeSensitivity: 0.0, naturalAbundancePercent: 99.757 },
  '19F': { nucleus: '19F', spinQuantumNumber: 0.5, isNMRActive: true, relativeSensitivity: 0.83, naturalAbundancePercent: 100.0 },
  '31P': { nucleus: '31P', spinQuantumNumber: 0.5, isNMRActive: true, relativeSensitivity: 0.066, naturalAbundancePercent: 100.0 },
  '14N': { nucleus: '14N', spinQuantumNumber: 1.0, isNMRActive: true, relativeSensitivity: 0.001, naturalAbundancePercent: 99.63 },
};

// ----------------------------------------------------------------------------
// 1H & 13C CHEMICAL SHIFT DIAGNOSTIC REGIONS
// ----------------------------------------------------------------------------
export const PROTON_DIAGNOSTIC_REGIONS: readonly NMRDiagnosticRegion[] = [
  {
    nucleus: '1H',
    minDeltaPpm: 0.8,
    maxDeltaPpm: 1.8,
    name: 'Saturated Aliphatic Region',
    nameVI: 'Vùng no bão hòa Aliphatic (0.8 - 1.8 ppm)',
    descriptionVI: 'Proton liên kết với cacbon no sp³ không tiếp giáp nhóm hút electron mạnh (nhóm -CH3, -CH2-, >CH- của ankan). Tín hiệu dịch chuyển dần lên: CH3 (~0.9) < CH2 (~1.3) < CH (~1.5).',
    typicalProtonsOrCarbons: ['-CH3 (0.9 ppm)', '-CH2- (1.2-1.4 ppm)', '>CH- (1.4-1.7 ppm)'],
  },
  {
    nucleus: '1H',
    minDeltaPpm: 1.8,
    maxDeltaPpm: 2.8,
    name: 'Allylic & Carbonyl α-Position Region',
    nameVI: 'Vùng vị trí α của Cacbonyl & Allylic (1.8 - 2.8 ppm)',
    descriptionVI: 'Proton nằm kề liên kết bội hoặc nhóm cacbonyl: -C(=O)-CH3, C=C-CH3, -C≡C-H. Do hiệu ứng hút electron cảm ứng nhẹ và dị hướng từ trường của liên kết π.',
    typicalProtonsOrCarbons: ['-CO-CH3 (2.1-2.4 ppm)', 'Ar-CH3 (2.3 ppm)', '-C≡C-H (2.0-2.5 ppm)'],
  },
  {
    nucleus: '1H',
    minDeltaPpm: 2.8,
    maxDeltaPpm: 4.5,
    name: 'Heteroatom Deshielded Region',
    nameVI: 'Vùng giải chắn bởi Dị nguyên tử O, N, X (2.8 - 4.5 ppm)',
    descriptionVI: 'Proton đính trên cacbon liên kết trực tiếp với nguyên tử có độ âm điện lớn (Oxi, Nitơ, Halogen). Mật độ electron bị hút mạnh làm proton bị giải chắn (deshielded) và dịch về phía trường yếu.',
    typicalProtonsOrCarbons: ['-O-CH3 (3.3-3.8 ppm)', '-O-CH2- (3.5-4.2 ppm)', '-CH2-Cl (3.5-3.8 ppm)', '-N-CH3 (2.5-3.0 ppm)'],
  },
  {
    nucleus: '1H',
    minDeltaPpm: 4.5,
    maxDeltaPpm: 6.5,
    name: 'Vinylic (Olefinic) Region',
    nameVI: 'Vùng Proton Vinylic Anken (4.5 - 6.5 ppm)',
    descriptionVI: 'Proton gắn trực tiếp trên liên kết đôi C=C. Bị giải chắn mạnh bởi dị hướng từ trường cảm ứng của đám mây electron π liên kết đôi.',
    typicalProtonsOrCarbons: ['=C-H (4.5-6.5 ppm)', 'C=CH2 (4.8-5.3 ppm)'],
  },
  {
    nucleus: '1H',
    minDeltaPpm: 6.5,
    maxDeltaPpm: 8.5,
    name: 'Aromatic Ring Current Region',
    nameVI: 'Vùng dòng vòng thơm Aren (6.5 - 8.5 ppm)',
    descriptionVI: 'Dấu hiệu vàng nhận diện vòng thơm benzen. Dòng electron π thơm di chuyển tuần hoàn trong từ trường B0 sinh ra từ trường phụ cùng chiều với B0 ở ngoại vi vòng thơm, giải chắn cực mạnh proton thơm.',
    typicalProtonsOrCarbons: ['Ar-H benzen (7.27 ppm)', 'Ar-H thế ortho/meta/para (6.8-8.2 ppm)'],
  },
  {
    nucleus: '1H',
    minDeltaPpm: 9.0,
    maxDeltaPpm: 10.5,
    name: 'Aldehyde Formyl Region',
    nameVI: 'Vùng Anđehit Formyl (9.0 - 10.5 ppm)',
    descriptionVI: 'Proton nhóm formyl -CH=O bị cả hai hiệu ứng cộng hưởng cực mạnh: độ âm điện lớn của Oxi cacbonyl và dị hướng từ trường của liên kết đôi C=O.',
    typicalProtonsOrCarbons: ['-CHO (9.5-10.1 ppm)'],
  },
  {
    nucleus: '1H',
    minDeltaPpm: 10.5,
    maxDeltaPpm: 13.5,
    name: 'Carboxylic Acid Region',
    nameVI: 'Vùng Axit Cacboxylic (10.5 - 13.5 ppm)',
    descriptionVI: 'Proton nhóm -COOH nằm trong liên kết hydro liên phân tử cực mạnh dạng dime. Tín hiệu thường là một dải tù rộng đâm sâu về phía trường rất yếu.',
    typicalProtonsOrCarbons: ['-COOH (11.0-13.0 ppm)'],
  },
];

export const CARBON_DIAGNOSTIC_REGIONS: readonly NMRDiagnosticRegion[] = [
  {
    nucleus: '13C',
    minDeltaPpm: 0,
    maxDeltaPpm: 50,
    name: 'Aliphatic sp³ Carbons',
    nameVI: 'Cacbon no Aliphatic sp³ (0 - 50 ppm)',
    descriptionVI: 'Cacbon no của ankan và nhóm ankyl (-CH3, -CH2-, -CH<, >C<) không đính dị nguyên tử hút electron.',
    typicalProtonsOrCarbons: ['-CH3 (10-30 ppm)', '-CH2- (20-40 ppm)', '>CH- (30-50 ppm)'],
  },
  {
    nucleus: '13C',
    minDeltaPpm: 50,
    maxDeltaPpm: 90,
    name: 'Heteroatom Bonded sp³ & Alkyne sp',
    nameVI: 'Cacbon sp³ gắn O, N, X & Cacbon Ankin sp (50 - 90 ppm)',
    descriptionVI: 'Cacbon liên kết trực tiếp với oxi (ancol, ete, este: 50-80 ppm) và liên kết ba ankin -C≡C- (65-85 ppm).',
    typicalProtonsOrCarbons: ['C-O (55-80 ppm)', 'C-Cl (40-60 ppm)', 'C≡C (70-90 ppm)'],
  },
  {
    nucleus: '13C',
    minDeltaPpm: 100,
    maxDeltaPpm: 160,
    name: 'Alkene sp² & Aromatic Ring Carbons',
    nameVI: 'Cacbon Anken sp² & Vòng thơm Thơm (100 - 160 ppm)',
    descriptionVI: 'Cacbon của liên kết đôi C=C (100-140 ppm) và nhân benzen thơm (120-150 ppm).',
    typicalProtonsOrCarbons: ['C=C (110-140 ppm)', 'Ar-C (125-140 ppm)', 'Ar-C-O thế (150-160 ppm)'],
  },
  {
    nucleus: '13C',
    minDeltaPpm: 160,
    maxDeltaPpm: 185,
    name: 'Carboxylic Derivative Carbonyls',
    nameVI: 'Cacbonyl dẫn xuất Axit, Este, Amit (160 - 185 ppm)',
    descriptionVI: 'Cacbon trong nhóm -COOR (este: 165-175 ppm), -COOH (axit: 170-185 ppm), -CONH2 (amit: 165-175 ppm). Có sự cho electron liên hợp từ O/N vào C=O làm giảm bớt độ giải chắn so với xeton.',
    typicalProtonsOrCarbons: ['-COOR este (170-175 ppm)', '-COOH axit (175-180 ppm)'],
  },
  {
    nucleus: '13C',
    minDeltaPpm: 185,
    maxDeltaPpm: 220,
    name: 'Aldehyde & Ketone Carbonyls',
    nameVI: 'Cacbonyl Anđehit & Xeton (185 - 220 ppm)',
    descriptionVI: 'Cacbon nhóm cacbonyl tinh khiết không có dị nguyên tử cho electron liên hợp. Bị giải chắn tối đa: Anđehit -CHO (190-205 ppm), Xeton R2C=O (200-220 ppm).',
    typicalProtonsOrCarbons: ['-CHO anđehit (195-205 ppm)', 'R2C=O xeton (205-218 ppm)'],
  },
];

// ----------------------------------------------------------------------------
// BENCHMARK CURRICULUM NMR CATALOG (GDPT 2018 & IUPAC)
// ----------------------------------------------------------------------------
export const NMR_BENCHMARK_CATALOG: Record<string, NMRCompound> = {
  ethanol: {
    id: 'ethanol',
    name: 'Ethanol',
    vietnameseName: 'Ethanol (Ancol Etylic)',
    chemicalFormula: 'CH3CH2OH',
    molecularWeight: 46.07,
    symmetryDescriptionVI: 'Bất đối xứng: 3 môi trường proton khác nhau (CH3, CH2, OH) với tỉ lệ diện tích tích phân 3H : 2H : 1H; và 2 môi trường cacbon khác nhau.',
    curriculumGrade: 'Grade 11',
    descriptionVI: 'Phổ ¹H NMR kinh điển nhất trong SGK Hóa 11. Thể hiện quy tắc tách chùm ghép spin n+1 hoàn hảo giữa nhóm metyl (-CH3) và metylen (-CH2-): nhóm CH3 bị 2 proton lân cận chẻ thành triplet (1:2:1), nhóm CH2 bị 3 proton lân cận chẻ thành quartet (1:3:3:1).',
    totalProtons: 6,
    totalCarbons: 2,
    uniqueProtonEnvironments: 3,
    uniqueCarbonEnvironments: 2,
    protonSignals: [
      {
        deltaPpm: 1.25,
        multiplicity: 't',
        multiplicityLabelVI: 'Triplet (Mũi ba, tỉ lệ 1:2:1)',
        integrationProtons: 3,
        couplingConstantHz: 7.0,
        assignment: '-CH3 (vicinal to -CH2-)',
        assignmentVI: 'Nhóm metyl (-CH3), ghép với 2H của CH2 thành mũi ba',
        pascalRatio: [1, 2, 1],
      },
      {
        deltaPpm: 2.60,
        multiplicity: 's',
        multiplicityLabelVI: 'Singlet tù (Mũi đơn rộng trao đổi)',
        integrationProtons: 1,
        assignment: '-OH (hydroxyl proton)',
        assignmentVI: 'Proton nhóm hiđroxyl (-OH), có tính trao đổi nhanh không tách chùm trong mẫu thông thường',
        pascalRatio: [1],
      },
      {
        deltaPpm: 3.69,
        multiplicity: 'q',
        multiplicityLabelVI: 'Quartet (Mũi bốn, tỉ lệ 1:3:3:1)',
        integrationProtons: 2,
        couplingConstantHz: 7.0,
        assignment: '-CH2- (adjacent to -O- and -CH3)',
        assignmentVI: 'Nhóm metylen (-CH2-), ghép với 3H của CH3 thành mũi bốn, bị dịch về phía trường yếu do đính Oxi',
        pascalRatio: [1, 3, 3, 1],
      },
    ],
    carbonSignals: [
      {
        deltaPpm: 18.2,
        multiplicity: 's',
        multiplicityLabelVI: 'Singlet',
        integrationProtons: 1,
        assignment: '-CH3 carbon',
        assignmentVI: 'Cacbon nhóm metyl C(sp³)',
        pascalRatio: [1],
      },
      {
        deltaPpm: 58.3,
        multiplicity: 's',
        multiplicityLabelVI: 'Singlet',
        integrationProtons: 1,
        assignment: '-CH2-O- carbon',
        assignmentVI: 'Cacbon liên kết với Oxi bị giải chắn về 58.3 ppm',
        pascalRatio: [1],
      },
    ],
    practicalApplicationsVI: [
      'Xác định cấu trúc nhóm etyl tự do (-CH2-CH3) qua cặp tín hiệu đặc trưng triplet + quartet',
      'Định lượng nồng độ cồn và tạp chất metanol trong rượu bằng phép đo tích phân proton',
    ],
  },

  acetone: {
    id: 'acetone',
    name: 'Acetone',
    vietnameseName: 'Axeton (Propan-2-on)',
    chemicalFormula: '(CH3)2CO',
    molecularWeight: 58.08,
    symmetryDescriptionVI: 'Phân tử có đối xứng phẳng C2v: 2 nhóm metyl (-CH3) hoàn toàn tương đương hóa học và từ học. Do đó chỉ cho duy nhất 1 tín hiệu ¹H NMR (6H singlet)!',
    curriculumGrade: 'Grade 11',
    descriptionVI: 'Minh chứng xuất sắc về tính đối xứng trong hóa hữu cơ: dù có 6 nguyên tử hydro nhưng chỉ xuất hiện 1 mũi đơn nhọn duy nhất tại δ 2.17 ppm tích phân 6H vì không có hydro lân cận để ghép spin. Phổ ¹³C cho 2 mũi: 1 mũi C=O cực xa ở 206.3 ppm và 1 mũi 2×CH3 ở 30.7 ppm.',
    totalProtons: 6,
    totalCarbons: 3,
    uniqueProtonEnvironments: 1,
    uniqueCarbonEnvironments: 2,
    protonSignals: [
      {
        deltaPpm: 2.17,
        multiplicity: 's',
        multiplicityLabelVI: 'Singlet sắc nét (Mũi đơn 6H)',
        integrationProtons: 6,
        assignment: '2 × -CH3 (equivalent α-carbonyl)',
        assignmentVI: 'Hai nhóm metyl đối xứng hoàn toàn, nằm ở vị trí α của C=O nên dịch về 2.17 ppm',
        pascalRatio: [1],
      },
    ],
    carbonSignals: [
      {
        deltaPpm: 30.7,
        multiplicity: 's',
        multiplicityLabelVI: 'Singlet (2 tương đương)',
        integrationProtons: 2,
        assignment: '2 × -CH3 carbons',
        assignmentVI: 'Hai cacbon nhóm metyl tương đương',
        pascalRatio: [1],
      },
      {
        deltaPpm: 206.3,
        multiplicity: 's',
        multiplicityLabelVI: 'Singlet (C=O xeton)',
        integrationProtons: 1,
        assignment: '>C=O carbonyl carbon',
        assignmentVI: 'Cacbon nhóm cacbonyl xeton giải chắn cực mạnh tại 206.3 ppm',
        pascalRatio: [1],
      },
    ],
    practicalApplicationsVI: [
      'Chứng minh phân tử có trục đối xứng cao qua số lượng tín hiệu phổ rút gọn',
      'Dùng làm dung môi chuẩn hoặc chất đánh dấu chuẩn nội trong phân tích phổ NMR',
    ],
  },

  acetic_acid: {
    id: 'acetic_acid',
    name: 'Acetic Acid',
    vietnameseName: 'Axit Axetic (Axit Etanoic)',
    chemicalFormula: 'CH3COOH',
    molecularWeight: 60.05,
    symmetryDescriptionVI: 'Bất đối xứng: 2 môi trường proton (CH3 và COOH) với tích phân 3H : 1H; và 2 môi trường cacbon.',
    curriculumGrade: 'Grade 11',
    descriptionVI: 'Đặc trưng bởi proton nhóm cacboxyl -COOH bị giải chắn cực độ, xuất hiện ở tận cùng bên trái phổ (δ 11.5 - 12.0 ppm) do hiệu ứng hút electron của nhóm C=O và liên kết hydro dime cực mạnh. Nhóm metyl -CH3 là mũi đơn 3H tại δ 2.10 ppm.',
    totalProtons: 4,
    totalCarbons: 2,
    uniqueProtonEnvironments: 2,
    uniqueCarbonEnvironments: 2,
    protonSignals: [
      {
        deltaPpm: 2.10,
        multiplicity: 's',
        multiplicityLabelVI: 'Singlet (Mũi đơn 3H)',
        integrationProtons: 3,
        assignment: '-CH3 adjacent to carboxyl',
        assignmentVI: 'Nhóm metyl gắn trực tiếp với gốc cacboxyl, không có hydro lân cận',
        pascalRatio: [1],
      },
      {
        deltaPpm: 11.85,
        multiplicity: 's',
        multiplicityLabelVI: 'Singlet rộng (Mũi đơn 1H trường cực yếu)',
        integrationProtons: 1,
        assignment: '-COOH acidic proton',
        assignmentVI: 'Proton axit cacboxylic, bị giải chắn mãnh liệt do liên kết hiđro dime',
        pascalRatio: [1],
      },
    ],
    carbonSignals: [
      {
        deltaPpm: 20.8,
        multiplicity: 's',
        multiplicityLabelVI: 'Singlet',
        integrationProtons: 1,
        assignment: '-CH3 carbon',
        assignmentVI: 'Cacbon metyl no',
        pascalRatio: [1],
      },
      {
        deltaPpm: 178.1,
        multiplicity: 's',
        multiplicityLabelVI: 'Singlet (C=O axit)',
        integrationProtons: 1,
        assignment: '-COOH carbonyl carbon',
        assignmentVI: 'Cacbon nhóm axit cacboxylic tại 178.1 ppm',
        pascalRatio: [1],
      },
    ],
    practicalApplicationsVI: [
      'Phát hiện nhóm axit cacboxylic bằng tín hiệu proton trường cực yếu δ > 11 ppm',
      'Đo hằng số cân bằng dime hóa của axit trong các dung môi hữu cơ không phân cực',
    ],
  },

  ethyl_acetate: {
    id: 'ethyl_acetate',
    name: 'Ethyl Acetate',
    vietnameseName: 'Etyl Axetat (Este Etyl Etanoat)',
    chemicalFormula: 'CH3COOCH2CH3',
    molecularWeight: 88.11,
    symmetryDescriptionVI: 'Phân tử bất đối xứng: chứa 3 môi trường proton khác nhau (tỉ lệ 3H : 2H : 3H) và 4 môi trường cacbon khác nhau.',
    curriculumGrade: 'Grade 12',
    descriptionVI: 'Este tiêu biểu trong chương trình Hóa 12. Phổ phân biệt rõ 2 nhóm metyl khác biệt: nhóm metyl acetyl CH3-C=O là mũi đơn singlet 3H tại δ 2.04 ppm, còn nhóm metyl etyl CH3-CH2 là mũi ba triplet 3H tại δ 1.26 ppm. Nhóm metylen -O-CH2- bị Oxi giải chắn mạnh nên xuất hiện dưới dạng quartet 2H tại δ 4.12 ppm.',
    totalProtons: 8,
    totalCarbons: 4,
    uniqueProtonEnvironments: 3,
    uniqueCarbonEnvironments: 4,
    protonSignals: [
      {
        deltaPpm: 1.26,
        multiplicity: 't',
        multiplicityLabelVI: 'Triplet (Mũi ba 3H, tỉ lệ 1:2:1)',
        integrationProtons: 3,
        couplingConstantHz: 7.1,
        assignment: '-CH2-CH3 (ethyl terminal methyl)',
        assignmentVI: 'Nhóm metyl đuôi của gốc etyl, ghép spin với 2H của CH2 thành mũi ba',
        pascalRatio: [1, 2, 1],
      },
      {
        deltaPpm: 2.04,
        multiplicity: 's',
        multiplicityLabelVI: 'Singlet (Mũi đơn 3H axetyl)',
        integrationProtons: 3,
        assignment: 'CH3-C(=O)- (acetate methyl)',
        assignmentVI: 'Nhóm metyl của gốc axetat, không có hydro kề nên là mũi đơn',
        pascalRatio: [1],
      },
      {
        deltaPpm: 4.12,
        multiplicity: 'q',
        multiplicityLabelVI: 'Quartet (Mũi bốn 2H, tỉ lệ 1:3:3:1)',
        integrationProtons: 2,
        couplingConstantHz: 7.1,
        assignment: '-C(=O)O-CH2- (deshielded ester methylene)',
        assignmentVI: 'Nhóm metylen gắn với Oxi este, bị giải chắn mạnh về 4.12 ppm và chẻ thành quartet bởi 3H nhóm CH3',
        pascalRatio: [1, 3, 3, 1],
      },
    ],
    carbonSignals: [
      {
        deltaPpm: 14.2,
        multiplicity: 's',
        multiplicityLabelVI: 'Singlet',
        integrationProtons: 1,
        assignment: '-CH2-CH3 carbon',
        assignmentVI: 'Cacbon metyl của gốc etyl',
        pascalRatio: [1],
      },
      {
        deltaPpm: 21.0,
        multiplicity: 's',
        multiplicityLabelVI: 'Singlet',
        integrationProtons: 1,
        assignment: 'CH3-C(=O) carbon',
        assignmentVI: 'Cacbon metyl axetyl',
        pascalRatio: [1],
      },
      {
        deltaPpm: 60.4,
        multiplicity: 's',
        multiplicityLabelVI: 'Singlet',
        integrationProtons: 1,
        assignment: '-O-CH2- carbon',
        assignmentVI: 'Cacbon metylen gắn với Oxi este',
        pascalRatio: [1],
      },
      {
        deltaPpm: 171.1,
        multiplicity: 's',
        multiplicityLabelVI: 'Singlet',
        integrationProtons: 1,
        assignment: '-C(=O)O- ester carbonyl',
        assignmentVI: 'Cacbon nhóm este cacbonyl tại 171.1 ppm',
        pascalRatio: [1],
      },
    ],
    practicalApplicationsVI: [
      'Phân biệt đồng phân cấu tạo giữa etyl axetat (CH3COOC2H5) và metyl propionat (C2H5COOCH3)',
      'Giám sát hiệu suất phản ứng este hóa Fischer trong phòng thí nghiệm hóa hữu cơ',
    ],
  },

  toluene: {
    id: 'toluene',
    name: 'Toluene',
    vietnameseName: 'Toluen (Metylbenzen)',
    chemicalFormula: 'C6H5CH3',
    molecularWeight: 92.14,
    symmetryDescriptionVI: 'Có mặt phẳng đối xứng đi qua nhóm metyl và cacbon C1-C4. Vòng benzen có 3 môi trường proton thơm (2 ortho, 2 meta, 1 para) và 4 môi trường cacbon thơm.',
    curriculumGrade: 'Grade 11',
    descriptionVI: 'Hydrocacbon thơm tiêu biểu trong Hóa 11. Nhóm metyl -CH3 là mũi đơn 3H sắc nhọn tại δ 2.34 ppm. Năm proton trên nhân benzen bị dòng vòng thơm đẩy về phía trường yếu, xuất hiện dưới dạng chùm phức hợp (multiplet) đặc trưng từ δ 7.15 đến 7.30 ppm tích phân 5H.',
    totalProtons: 8,
    totalCarbons: 7,
    uniqueProtonEnvironments: 4,
    uniqueCarbonEnvironments: 5,
    protonSignals: [
      {
        deltaPpm: 2.34,
        multiplicity: 's',
        multiplicityLabelVI: 'Singlet (Mũi đơn 3H benzylic)',
        integrationProtons: 3,
        assignment: 'Ar-CH3 benzylic methyl',
        assignmentVI: 'Nhóm metyl gắn trực tiếp vào nhân benzen, dịch về 2.34 ppm',
        pascalRatio: [1],
      },
      {
        deltaPpm: 7.18,
        multiplicity: 'm',
        multiplicityLabelVI: 'Multiplet chùm thơm (5H tích phân gộp)',
        integrationProtons: 5,
        assignment: 'Ar-H (ortho, meta, para protons)',
        assignmentVI: 'Năm proton trên vòng thơm chịu tác động của dòng vòng thơm tạo thành chùm thơm 7.15 - 7.30 ppm',
        pascalRatio: [1, 2, 2],
      },
    ],
    carbonSignals: [
      {
        deltaPpm: 21.5,
        multiplicity: 's',
        multiplicityLabelVI: 'Singlet',
        integrationProtons: 1,
        assignment: '-CH3 methyl carbon',
        assignmentVI: 'Cacbon nhóm metyl',
        pascalRatio: [1],
      },
      {
        deltaPpm: 125.4,
        multiplicity: 's',
        multiplicityLabelVI: 'Singlet',
        integrationProtons: 1,
        assignment: 'C4 (para aromatic carbon)',
        assignmentVI: 'Cacbon thơm vị trí para',
        pascalRatio: [1],
      },
      {
        deltaPpm: 128.3,
        multiplicity: 's',
        multiplicityLabelVI: 'Singlet (2 tương đương)',
        integrationProtons: 2,
        assignment: 'C2, C6 (ortho aromatic carbons)',
        assignmentVI: 'Hai cacbon thơm vị trí ortho',
        pascalRatio: [1],
      },
      {
        deltaPpm: 129.1,
        multiplicity: 's',
        multiplicityLabelVI: 'Singlet (2 tương đương)',
        integrationProtons: 2,
        assignment: 'C3, C5 (meta aromatic carbons)',
        assignmentVI: 'Hai cacbon thơm vị trí meta',
        pascalRatio: [1],
      },
      {
        deltaPpm: 137.9,
        multiplicity: 's',
        multiplicityLabelVI: 'Singlet (ipso bậc 4)',
        integrationProtons: 1,
        assignment: 'C1 (ipso substituted carbon)',
        assignmentVI: 'Cacbon thơm bậc 4 đính nhóm metyl tại 137.9 ppm',
        pascalRatio: [1],
      },
    ],
    practicalApplicationsVI: [
      'Phát hiện nhân thơm Aren thông qua dải hấp thụ proton dòng vòng thơm 6.5 - 8.5 ppm',
      'Phân biệt toluen với các đồng phân xilen (o-, m-, p-xilen) dựa vào số đỉnh phổ cacbon thơm',
    ],
  },

  dichloroethane_1_2: {
    id: 'dichloroethane_1_2',
    name: '1,2-Dichloroethane',
    vietnameseName: '1,2-Đicloetan (Etylen diclorua)',
    chemicalFormula: 'Cl-CH2-CH2-Cl',
    molecularWeight: 98.96,
    symmetryDescriptionVI: 'Phân tử có tâm đối xứng và hai mặt phẳng đối xứng (nhóm C2h): cả 4 nguyên tử hydro và cả 2 nguyên tử cacbon hoàn toàn tương đương từ học!',
    curriculumGrade: 'Grade 11',
    descriptionVI: 'Ví dụ đỉnh cao về sự tiêu biến tách chùm spin do tương đương hóa học: mặc dù có 2 nhóm -CH2- đứng cạnh nhau, nhưng do chúng hoàn toàn tương đương nên không xuất hiện tách triplet như quy tắc n+1 thông thường. Toàn bộ 4 proton gộp thành 1 mũi đơn nhọn duy nhất tại δ 3.78 ppm tích phân 4H!',
    totalProtons: 4,
    totalCarbons: 2,
    uniqueProtonEnvironments: 1,
    uniqueCarbonEnvironments: 1,
    protonSignals: [
      {
        deltaPpm: 3.78,
        multiplicity: 's',
        multiplicityLabelVI: 'Singlet sắc nhọn (Mũi đơn 4H tương đương)',
        integrationProtons: 4,
        assignment: '4 × H (chemically & magnetically equivalent -CH2Cl)',
        assignmentVI: 'Bốn proton đối xứng hoàn toàn, bị Clo giải chắn về 3.78 ppm mà không bị tách chùm ghép spin',
        pascalRatio: [1],
      },
    ],
    carbonSignals: [
      {
        deltaPpm: 44.5,
        multiplicity: 's',
        multiplicityLabelVI: 'Singlet (1 mũi duy nhất)',
        integrationProtons: 2,
        assignment: '2 × -CH2Cl equivalent carbons',
        assignmentVI: 'Hai nguyên tử cacbon tương đương hoàn toàn cho 1 mũi duy nhất tại 44.5 ppm',
        pascalRatio: [1],
      },
    ],
    practicalApplicationsVI: [
      'Dạy học sinh hiện tượng tương đương hóa học: các hạt nhân tương đương không tách chùm lẫn nhau',
      'Phân biệt rõ ràng với đồng phân 1,1-đicloetan (CH3-CHCl2 có 1 doublet 3H và 1 quartet 1H)',
    ],
  },

  acetaldehyde: {
    id: 'acetaldehyde',
    name: 'Acetaldehyde',
    vietnameseName: 'Anđehit Axetic (Etanal)',
    chemicalFormula: 'CH3CHO',
    molecularWeight: 44.05,
    symmetryDescriptionVI: 'Bất đối xứng: 2 môi trường proton (CH3 và CHO) và 2 môi trường cacbon.',
    curriculumGrade: 'Grade 11',
    descriptionVI: 'Anđehit đơn giản nhất có ghép spin: Proton fomyl -CHO xuất hiện ở trường cực yếu δ 9.80 ppm bị 3 proton của nhóm CH3 tách thành quartet (J ≈ 2.9 Hz); đồng thời 3 proton nhóm CH3 bị proton -CHO tách thành doublet tại δ 2.20 ppm.',
    totalProtons: 4,
    totalCarbons: 2,
    uniqueProtonEnvironments: 2,
    uniqueCarbonEnvironments: 2,
    protonSignals: [
      {
        deltaPpm: 2.20,
        multiplicity: 'd',
        multiplicityLabelVI: 'Doublet (Mũi đôi 3H, tỉ lệ 1:1, J = 2.9 Hz)',
        integrationProtons: 3,
        couplingConstantHz: 2.9,
        assignment: '-CH3 (split by -CHO proton)',
        assignmentVI: 'Nhóm metyl bị proton anđehit tách thành mũi đôi với hằng số tách J nhỏ ~2.9 Hz',
        pascalRatio: [1, 1],
      },
      {
        deltaPpm: 9.80,
        multiplicity: 'q',
        multiplicityLabelVI: 'Quartet (Mũi bốn 1H trường cực yếu, J = 2.9 Hz)',
        integrationProtons: 1,
        couplingConstantHz: 2.9,
        assignment: '-CHO formyl proton',
        assignmentVI: 'Proton anđehit giải chắn mạnh tại 9.80 ppm, bị 3H nhóm metyl tách thành quartet',
        pascalRatio: [1, 3, 3, 1],
      },
    ],
    carbonSignals: [
      {
        deltaPpm: 31.2,
        multiplicity: 's',
        multiplicityLabelVI: 'Singlet',
        integrationProtons: 1,
        assignment: '-CH3 carbon',
        assignmentVI: 'Cacbon nhóm metyl',
        pascalRatio: [1],
      },
      {
        deltaPpm: 200.5,
        multiplicity: 's',
        multiplicityLabelVI: 'Singlet (C=O anđehit)',
        integrationProtons: 1,
        assignment: '-CHO formyl carbonyl carbon',
        assignmentVI: 'Cacbon anđehit giải chắn cực mạnh tại 200.5 ppm',
        pascalRatio: [1],
      },
    ],
    practicalApplicationsVI: [
      'Nhận biết nhóm anđehit thông qua đỉnh đặc trưng δ 9.5 - 10.0 ppm',
      'Đo hằng số ghép spin nhỏ qua cacbonyl J(H-C-C=O) ~ 2.9 Hz',
    ],
  },

  diethyl_ether: {
    id: 'diethyl_ether',
    name: 'Diethyl Ether',
    vietnameseName: 'Đietyl Ete (Etoxietan)',
    chemicalFormula: 'CH3CH2OCH2CH3',
    molecularWeight: 74.12,
    symmetryDescriptionVI: 'Phân tử có đối xứng trục C2: 2 gốc etyl (-CH2CH3) hoàn toàn tương đương. Do đó dù có 10 proton nhưng chỉ cho 2 cụm tín hiệu (triplet 6H và quartet 4H).',
    curriculumGrade: 'Grade 11',
    descriptionVI: 'Ete đối xứng kinh điển: 6 proton của 2 nhóm metyl gộp thành một triplet sắc nét tại δ 1.20 ppm (tích phân 6H); 4 proton của 2 nhóm metylen đính oxi gộp thành quartet tại δ 3.48 ppm (tích phân 4H). Phổ ¹³C chỉ có đúng 2 vạch.',
    totalProtons: 10,
    totalCarbons: 4,
    uniqueProtonEnvironments: 2,
    uniqueCarbonEnvironments: 2,
    protonSignals: [
      {
        deltaPpm: 1.20,
        multiplicity: 't',
        multiplicityLabelVI: 'Triplet (Mũi ba 6H tương đương)',
        integrationProtons: 6,
        couplingConstantHz: 7.0,
        assignment: '2 × -CH3 (equivalent methyls)',
        assignmentVI: 'Sáu proton của hai nhóm metyl tương đương, ghép với -CH2- thành mũi ba',
        pascalRatio: [1, 2, 1],
      },
      {
        deltaPpm: 3.48,
        multiplicity: 'q',
        multiplicityLabelVI: 'Quartet (Mũi bốn 4H tương đương)',
        integrationProtons: 4,
        couplingConstantHz: 7.0,
        assignment: '2 × -O-CH2- (equivalent methylenes)',
        assignmentVI: 'Bốn proton của hai nhóm metylen đính Oxi ete, bị chẻ thành quartet tại 3.48 ppm',
        pascalRatio: [1, 3, 3, 1],
      },
    ],
    carbonSignals: [
      {
        deltaPpm: 15.3,
        multiplicity: 's',
        multiplicityLabelVI: 'Singlet',
        integrationProtons: 2,
        assignment: '2 × -CH3 carbons',
        assignmentVI: 'Hai cacbon metyl tương đương',
        pascalRatio: [1],
      },
      {
        deltaPpm: 66.0,
        multiplicity: 's',
        multiplicityLabelVI: 'Singlet',
        integrationProtons: 2,
        assignment: '2 × -CH2-O- carbons',
        assignmentVI: 'Hai cacbon metylen gắn Oxi tương đương',
        pascalRatio: [1],
      },
    ],
    practicalApplicationsVI: [
      'Phân biệt ete đối xứng (2 vạch carbon) với ete bất đối xứng (ví dụ metyl propyl ete có 4 vạch carbon)',
      'Kiểm tra độ tinh khiết của dung môi ete trong chiết tách hóa dược phẩm',
    ],
  },
};

// ----------------------------------------------------------------------------
// DOMAIN LOGIC & CALCULATION FUNCTIONS
// ----------------------------------------------------------------------------

/**
 * Calculates Larmor Precession resonance frequency (MHz):
 * ν0 = (γ · B0) / (2π · 1e6)
 * @param nucleus '1H' | '13C'
 * @param magneticFieldTesla Magnetic field strength B0 (T) e.g., 7.05 T -> ~300 MHz
 */
export function calculateLarmorFrequencyMHz(nucleus: NMRNucleus, magneticFieldTesla: number): number {
  if (magneticFieldTesla <= 0) return 0;
  const gamma = GYROMAGNETIC_RATIOS[nucleus] || GYROMAGNETIC_RATIOS['1H'];
  const freqHz = (gamma * magneticFieldTesla) / (2 * Math.PI);
  return Number((freqHz / 1e6).toFixed(2));
}

/**
 * Converts frequency difference (Hz) from TMS to Chemical Shift δ (ppm):
 * δ = (Δν_Hz / ν0_MHz)
 */
export function calculateChemicalShiftPpm(deltaFreqHz: number, spectrometerFreqMHz: number): number {
  if (spectrometerFreqMHz <= 0) return 0;
  return Number((deltaFreqHz / spectrometerFreqMHz).toFixed(3));
}

/**
 * Converts Chemical Shift δ (ppm) to frequency difference (Hz) from TMS:
 * Δν_Hz = δ · ν0_MHz
 */
export function calculateFreqOffsetHz(deltaPpm: number, spectrometerFreqMHz: number): number {
  return Number((deltaPpm * spectrometerFreqMHz).toFixed(2));
}

/**
 * Calculates theoretical Pascal's triangle relative intensities for a spin-coupled multiplet
 * based on the n+1 rule (where n is number of neighboring equivalent spin-1/2 protons).
 */
export function calculatePascalTriangleRatios(neighborCount: number): number[] {
  if (neighborCount < 0) return [1];
  if (neighborCount === 0) return [1];

  let current = [1];
  for (let i = 1; i <= neighborCount; i++) {
    const next: number[] = [1];
    for (let j = 0; j < current.length - 1; j++) {
      next.push(current[j] + current[j + 1]);
    }
    next.push(1);
    current = next;
  }
  return current;
}

/**
 * Derives multiplicity type from neighboring proton count n:
 * n = 0 -> s (Singlet)
 * n = 1 -> d (Doublet)
 * n = 2 -> t (Triplet)
 * n = 3 -> q (Quartet)
 * n = 4 -> quint (Quintet)
 * n = 5 -> sext (Sextet)
 * n = 6 -> sept (Septet)
 * n >= 7 -> m (Multiplet)
 */
export function getMultiplicityFromNeighborCount(n: number): {
  type: NMRMultiplicityType;
  lines: number;
  labelVI: string;
  pascalRatio: number[];
} {
  const lines = n + 1;
  const pascalRatio = calculatePascalTriangleRatios(n);

  let type: NMRMultiplicityType = 'm';
  let labelVI = `Multiplet (${lines} vạch)`;

  switch (n) {
    case 0:
      type = 's';
      labelVI = 'Singlet (Mũi đơn, 1 vạch)';
      break;
    case 1:
      type = 'd';
      labelVI = 'Doublet (Mũi đôi, 2 vạch 1:1)';
      break;
    case 2:
      type = 't';
      labelVI = 'Triplet (Mũi ba, 3 vạch 1:2:1)';
      break;
    case 3:
      type = 'q';
      labelVI = 'Quartet (Mũi bốn, 4 vạch 1:3:3:1)';
      break;
    case 4:
      type = 'quint';
      labelVI = 'Quintet (Mũi năm, 5 vạch 1:4:6:4:1)';
      break;
    case 5:
      type = 'sext';
      labelVI = 'Sextet (Mũi sáu, 6 vạch)';
      break;
    case 6:
      type = 'sept';
      labelVI = 'Septet (Mũi bảy, 7 vạch)';
      break;
    default:
      type = 'm';
      labelVI = `Multiplet chùm phức hợp (${lines} vạch)`;
      break;
  }

  return { type, lines, labelVI, pascalRatio };
}

/**
 * Calculates multiplet line positions in ppm given center chemical shift, J in Hz, and spectrometer frequency in MHz:
 */
export function calculateMultipletPeakOffsetsPpm(
  centerPpm: number,
  neighborCount: number,
  couplingConstantHz: number,
  spectrometerFreqMHz: number
): { ppm: number; relativeHeight: number }[] {
  if (spectrometerFreqMHz <= 0 || neighborCount === 0 || couplingConstantHz <= 0) {
    return [{ ppm: centerPpm, relativeHeight: 1.0 }];
  }

  const ratios = calculatePascalTriangleRatios(neighborCount);
  const maxVal = Math.max(...ratios);
  const normalizedHeights = ratios.map(r => r / maxVal);

  const deltaPpmSpacing = couplingConstantHz / spectrometerFreqMHz;
  const lineCount = neighborCount + 1;
  const halfSpan = ((lineCount - 1) / 2) * deltaPpmSpacing;

  const result: { ppm: number; relativeHeight: number }[] = [];
  for (let i = 0; i < lineCount; i++) {
    const ppm = centerPpm + halfSpan - i * deltaPpmSpacing; // Inverted NMR scale
    result.push({
      ppm: Number(ppm.toFixed(4)),
      relativeHeight: Number(normalizedHeights[i].toFixed(3)),
    });
  }

  return result;
}

/**
 * Diagnostic Region Classifier: Maps any chemical shift δ to its characteristic functional region.
 */
export function classifyChemicalShiftRegion(nucleus: NMRNucleus, deltaPpm: number): NMRDiagnosticRegion | null {
  const regions = nucleus === '1H' ? PROTON_DIAGNOSTIC_REGIONS : CARBON_DIAGNOSTIC_REGIONS;
  for (const reg of regions) {
    if (deltaPpm >= reg.minDeltaPpm && deltaPpm <= reg.maxDeltaPpm) {
      return reg;
    }
  }
  return null;
}

/**
 * Structure Elucidation Helper: Takes observed 1H signals and suggests matching molecular functional motifs.
 */
export function deduceMolecularMotifsFromNMR(signals: { deltaPpm: number; multiplicity: string; integration?: number }[]): {
  hasAromaticRing: boolean;
  hasAldehyde: boolean;
  hasCarboxylicAcid: boolean;
  hasEthylGroup: boolean;
  hasIsolatedMethyl: boolean;
  hasEtherOrAlcoholCH: boolean;
  summaryVI: string[];
} {
  let hasAromaticRing = false;
  let hasAldehyde = false;
  let hasCarboxylicAcid = false;
  let hasEthylGroup = false;
  let hasIsolatedMethyl = false;
  let hasEtherOrAlcoholCH = false;

  const summaries: string[] = [];

  // Check aromatic: 6.5 - 8.5 ppm
  if (signals.some(s => s.deltaPpm >= 6.5 && s.deltaPpm <= 8.5)) {
    hasAromaticRing = true;
    summaries.push('Nhận diện nhân thơm Aren (dải 6.5 - 8.5 ppm do dòng vòng thơm benzen)');
  }

  // Check aldehyde: 9.0 - 10.5 ppm
  if (signals.some(s => s.deltaPpm >= 9.0 && s.deltaPpm <= 10.5)) {
    hasAldehyde = true;
    summaries.push('Nhận diện nhóm Anđehit -CHO (đỉnh proton formyl tại 9.0 - 10.5 ppm)');
  }

  // Check carboxylic acid: > 10.5 ppm
  if (signals.some(s => s.deltaPpm >= 10.5)) {
    hasCarboxylicAcid = true;
    summaries.push('Nhận diện Axit cacboxylic -COOH (đỉnh proton axit liên hợp dime > 10.5 ppm)');
  }

  // Check ethyl pattern: triplet around 1.0 - 1.4 ppm AND quartet around 3.0 - 4.5 ppm
  const hasTripletAliphatic = signals.some(s => s.multiplicity === 't' && s.deltaPpm >= 0.8 && s.deltaPpm <= 1.6);
  const hasQuartetDeshielded = signals.some(s => s.multiplicity === 'q' && s.deltaPpm >= 2.0 && s.deltaPpm <= 4.5);
  if (hasTripletAliphatic && hasQuartetDeshielded) {
    hasEthylGroup = true;
    summaries.push('Cặp tín hiệu kinh điển nhóm Etyl (-CH2CH3): 1 mũi triplet (~1.2 ppm, 3H) + 1 mũi quartet (~3.5-4.2 ppm, 2H)');
  }

  // Check isolated methyl: singlet around 2.0 - 2.5 ppm with integration 3H or 6H
  if (signals.some(s => s.multiplicity === 's' && s.deltaPpm >= 1.8 && s.deltaPpm <= 2.5 && (s.integration === 3 || s.integration === 6))) {
    hasIsolatedMethyl = true;
    summaries.push('Nhóm Metyl cô lập không ghép spin: CH3-C=O hoặc Ar-CH3 (mũi đơn singlet 1.8 - 2.5 ppm)');
  }

  // Check C-O protons: 3.2 - 4.5 ppm
  if (signals.some(s => s.deltaPpm >= 3.2 && s.deltaPpm <= 4.5)) {
    hasEtherOrAlcoholCH = true;
    summaries.push('Proton trên cacbon liên kết Oxi: nhóm ancol, ete hoặc este (3.2 - 4.5 ppm)');
  }

  return {
    hasAromaticRing,
    hasAldehyde,
    hasCarboxylicAcid,
    hasEthylGroup,
    hasIsolatedMethyl,
    hasEtherOrAlcoholCH,
    summaryVI: summaries,
  };
}

/**
 * Card Matcher for ELEMENTA TCG Cards:
 * Maps game cards containing chemical formulas or names to their NMR spectra.
 */
export function getMatchingNMRConcept(card: { name?: string; chemicalFormula?: string; id?: string }): NMRCompound | null {
  const normName = (card.name || '').toLowerCase();
  const formula = (card.chemicalFormula || '').replace(/\s+/g, '');

  if (formula === 'C2H5OH' || formula === 'CH3CH2OH' || normName.includes('ethanol') || normName.includes('ancol etylic') || normName.includes('rượu etylic')) {
    return NMR_BENCHMARK_CATALOG.ethanol;
  }

  if (formula === 'C3H6O' || formula === '(CH3)2CO' || formula === 'CH3COCH3' || normName.includes('axeton') || normName.includes('acetone') || normName.includes('propan-2-on')) {
    return NMR_BENCHMARK_CATALOG.acetone;
  }

  if (formula === 'CH3COOH' || formula === 'C2H4O2' || normName.includes('axit axetic') || normName.includes('acetic acid') || normName.includes('giấm ăn')) {
    return NMR_BENCHMARK_CATALOG.acetic_acid;
  }

  if (formula === 'CH3COOC2H5' || formula === 'C4H8O2' || normName.includes('etyl axetat') || normName.includes('ethyl acetate')) {
    return NMR_BENCHMARK_CATALOG.ethyl_acetate;
  }

  if (formula === 'C7H8' || formula === 'C6H5CH3' || normName.includes('toluen') || normName.includes('toluene') || normName.includes('metylbenzen')) {
    return NMR_BENCHMARK_CATALOG.toluene;
  }

  if (formula === 'C2H4Cl2' || formula === 'ClCH2CH2Cl' || normName.includes('1,2-đicloetan') || normName.includes('1,2-dichloroethane')) {
    return NMR_BENCHMARK_CATALOG.dichloroethane_1_2;
  }

  if (formula === 'CH3CHO' || formula === 'C2H4O' || normName.includes('anđehit axetic') || normName.includes('acetaldehyde') || normName.includes('etanal')) {
    return NMR_BENCHMARK_CATALOG.acetaldehyde;
  }

  if (formula === 'C4H10O' || formula === '(C2H5)2O' || formula === 'CH3CH2OCH2CH3' || normName.includes('đietyl ete') || normName.includes('diethyl ether')) {
    return NMR_BENCHMARK_CATALOG.diethyl_ether;
  }

  return null;
}
