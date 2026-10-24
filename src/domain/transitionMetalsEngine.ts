/**
 * ELEMENTA - Transition Metals & Coordination Complexes Domain Engine
 * Conforms strictly to IUPAC Gold Book and Vietnam GDPT 2018 Grade 12 Chemistry Curriculum:
 * Chủ đề 8: Kim loại chuyển tiếp dãy thứ nhất & Phức chất (First-Row Transition Metals & Coordination Compounds).
 */

export interface TransitionMetal {
  atomicNumber: number;
  symbol: string;
  nameVi: string;
  nameEn: string;
  electronConfig: string;
  valenceElectrons: string; // e.g. "3d5 4s1"
  isAnomalous: boolean;
  anomalyReason?: string;
  commonOxidationStates: number[];
  colorInAqueous?: { [oxState: number]: { colorVi: string; hex: string; species: string } };
  descriptionVi: string;
}

export interface Ligand {
  formula: string;
  nameIupacVi: string;
  nameEn: string;
  charge: number;
  fieldStrength: 'YẾU' | 'TRUNG_BÌNH' | 'MẠNH';
  spectrochemicalRank: number; // 1 (weakest I-) to 11 (strongest CO)
  denticity: number; // 1 = monodentate, 2 = bidentate
}

export type CoordinationGeometry = 'ĐƯỜNG_THẲNG' | 'TỨ_DIỆN' | 'VUÔNG_PHẲNG' | 'BÁT_DIỆN';

export interface ComplexIon {
  id: string;
  formula: string;
  centralAtom: string;
  centralOxidationState: number;
  dElectronsCount: number; // e.g. Fe(III) is d5, Cu(II) is d9
  ligands: { ligandFormula: string; count: number }[];
  coordinationNumber: number;
  geometry: CoordinationGeometry;
  netCharge: number;
  iupacNameVi: string;
  solutionColorVi: string;
  colorHex: string;
  fieldSpinState?: 'HIGH_SPIN' | 'LOW_SPIN' | 'NOT_APPLICABLE';
  unpairedElectrons?: number;
  magneticNature?: 'THUẬN_TỪ' | 'NGHỊCH_TỪ';
  magneticMomentBM?: number; // sqrt(n*(n+2)) Bohr Magnetons
  t2gElectrons?: number;
  egElectrons?: number;
  specialApplicationVi?: string;
}

export interface ChromateEquilibriumResult {
  pH: number;
  crO4Percentage: number; // yellow
  cr2O7Percentage: number; // orange
  dominantSpecies: 'CrO4(2-)' | 'Cr2O7(2-)' | 'CÂN_BẰNG_HỖN_HỢP';
  solutionColorVi: string;
  colorHex: string;
  chemicalEquation: string;
  explanationVi: string;
}

export interface CobaltChlorideResult {
  temperatureC: number;
  clConcentrationM: number;
  waterFraction: number;
  coH2O6Percentage: number; // pink octahedral
  coCl4Percentage: number; // blue tetrahedral
  dominantSpecies: '[Co(H2O)6]2+' | '[CoCl4]2-' | 'HỖN_HỢP';
  solutionColorVi: string;
  colorHex: string;
  reactionEquation: string;
  explanationVi: string;
}

// 1. Catalog of First-Row Transition Metals (Sc to Zn, Z=21 to 30)
export const TRANSITION_METALS_SERIES: TransitionMetal[] = [
  {
    atomicNumber: 21,
    symbol: 'Sc',
    nameVi: 'Scandium',
    nameEn: 'Scandium',
    electronConfig: '[Ar] 3d¹ 4s²',
    valenceElectrons: '3d¹ 4s²',
    isAnomalous: false,
    commonOxidationStates: [3],
    colorInAqueous: {
      3: { colorVi: 'Không màu', hex: '#F8FAFC', species: '[Sc(H₂O)₆]³⁺ (d⁰)' }
    },
    descriptionVi: 'Kim loại chuyển tiếp đầu tiên, chỉ tạo hợp chất +3 không màu do ion Sc³⁺ mất hết e hóa trị (cấu hình bền của Ar).'
  },
  {
    atomicNumber: 22,
    symbol: 'Ti',
    nameVi: 'Titanium',
    nameEn: 'Titanium',
    electronConfig: '[Ar] 3d² 4s²',
    valenceElectrons: '3d² 4s²',
    isAnomalous: false,
    commonOxidationStates: [2, 3, 4],
    colorInAqueous: {
      3: { colorVi: 'Tím', hex: '#A855F7', species: '[Ti(H₂O)₆]³⁺ (d¹)' },
      4: { colorVi: 'Không màu', hex: '#F8FAFC', species: 'TiO²⁺ (d⁰)' }
    },
    descriptionVi: 'Kim loại siêu bền, nhẹ, chống ăn mòn tuyệt vời trong hàng không và y tế. TiO₂ là bột màu trắng quang xúc tác.'
  },
  {
    atomicNumber: 23,
    symbol: 'V',
    nameVi: 'Vanadium',
    nameEn: 'Vanadium',
    electronConfig: '[Ar] 3d³ 4s²',
    valenceElectrons: '3d³ 4s²',
    isAnomalous: false,
    commonOxidationStates: [2, 3, 4, 5],
    colorInAqueous: {
      2: { colorVi: 'Tím hoa cà', hex: '#7C3AED', species: '[V(H₂O)₆]²⁺ (d³)' },
      3: { colorVi: 'Xanh lục', hex: '#16A34A', species: '[V(H₂O)₆]³⁺ (d²)' },
      4: { colorVi: 'Xanh lam đậm', hex: '#2563EB', species: 'VO²⁺ (d¹)' },
      5: { colorVi: 'Vàng cam', hex: '#EAB308', species: 'VO₂⁺ (d⁰)' }
    },
    descriptionVi: 'Nổi tiếng với cầu vồng màu sắc của 4 số oxi hóa liên tiếp (+2 tím -> +3 lục -> +4 lam -> +5 vàng) dùng trong pin Vanadium redox.'
  },
  {
    atomicNumber: 24,
    symbol: 'Cr',
    nameVi: 'Chromium',
    nameEn: 'Chromium',
    electronConfig: '[Ar] 3d⁵ 4s¹',
    valenceElectrons: '3d⁵ 4s¹',
    isAnomalous: true,
    anomalyReason: 'Cấu hình bán bão hòa phân lớp 3d⁵ có năng lượng thấp hơn và bền vững hơn so với 3d⁴ 4s².',
    commonOxidationStates: [2, 3, 6],
    colorInAqueous: {
      2: { colorVi: 'Xanh lam', hex: '#3B82F6', species: 'Cr²⁺ (tính khử rất mạnh)' },
      3: { colorVi: 'Xanh lục tím', hex: '#059669', species: '[Cr(H₂O)₆]³⁺' },
      6: { colorVi: 'Vàng (CrO₄²⁻) / Da cam (Cr₂O₇²⁻)', hex: '#EA580C', species: 'Cr(VI) (tính oxi hóa cực mạnh)' }
    },
    descriptionVi: 'Kim loại cứng nhất, cấu hình bất thường [Ar]3d⁵4s¹. Hợp chất Cr(III) bền nhất, Cr(VI) có tính oxi hóa mãnh liệt và độc tính cao.'
  },
  {
    atomicNumber: 25,
    symbol: 'Mn',
    nameVi: 'Manganese',
    nameEn: 'Manganese',
    electronConfig: '[Ar] 3d⁵ 4s²',
    valenceElectrons: '3d⁵ 4s²',
    isAnomalous: false,
    commonOxidationStates: [2, 4, 6, 7],
    colorInAqueous: {
      2: { colorVi: 'Hồng rất nhạt (gần không màu)', hex: '#FBCFE8', species: '[Mn(H₂O)₆]²⁺ (d⁵ spin cao)' },
      4: { colorVi: 'Nâu đen kết tủa', hex: '#78350F', species: 'MnO₂ (rắn)' },
      6: { colorVi: 'Xanh lục thẫm', hex: '#047857', species: 'MnO₄²⁻ (manganat)' },
      7: { colorVi: 'Tím đậm thuốc tím', hex: '#9333EA', species: 'MnO₄⁻ (pemanganat)' }
    },
    descriptionVi: 'Có dải số oxi hóa phong phú nhất từ +2 đến +7. KMnO₄ (thuốc tím) là chất oxi hóa kinh điển trong chuẩn độ redox GDPT 2018.'
  },
  {
    atomicNumber: 26,
    symbol: 'Fe',
    nameVi: 'Iron (Sắt)',
    nameEn: 'Iron',
    electronConfig: '[Ar] 3d⁶ 4s²',
    valenceElectrons: '3d⁶ 4s²',
    isAnomalous: false,
    commonOxidationStates: [2, 3],
    colorInAqueous: {
      2: { colorVi: 'Xanh lục nhạt', hex: '#86EFAC', species: '[Fe(H₂O)₆]²⁺' },
      3: { colorVi: 'Vàng nâu', hex: '#D97706', species: '[Fe(H₂O)₆]³⁺ / Fe(OH)₃ kết tủa đỏ nâu' }
    },
    descriptionVi: 'Nguyên tố phổ biến nhất trong lõi Trái Đất và hợp kim gang thép. Fe²⁺ dễ bị oxi hóa lên Fe³⁺ bởi O₂ không khí.'
  },
  {
    atomicNumber: 27,
    symbol: 'Co',
    nameVi: 'Cobalt',
    nameEn: 'Cobalt',
    electronConfig: '[Ar] 3d⁷ 4s²',
    valenceElectrons: '3d⁷ 4s²',
    isAnomalous: false,
    commonOxidationStates: [2, 3],
    colorInAqueous: {
      2: { colorVi: 'Hồng cánh sen', hex: '#F472B6', species: '[Co(H₂O)₆]²⁺ (bát diện)' }
    },
    descriptionVi: 'Thành phần cốt lõi của Vitamin B12. Phức chất Co(II) chuyển màu hồng <-> xanh lam dùng làm chất chỉ thị độ ẩm và nhiệt độ.'
  },
  {
    atomicNumber: 28,
    symbol: 'Ni',
    nameVi: 'Nickel',
    nameEn: 'Nickel',
    electronConfig: '[Ar] 3d⁸ 4s²',
    valenceElectrons: '3d⁸ 4s²',
    isAnomalous: false,
    commonOxidationStates: [2],
    colorInAqueous: {
      2: { colorVi: 'Xanh ngọc lục bảo', hex: '#10B981', species: '[Ni(H₂O)₆]²⁺' }
    },
    descriptionVi: 'Kim loại màu trắng bạc, dùng mạ chống gỉ, chế tạo thép không gỉ (Inox 18/8) và xúc tác hiđro hóa dầu thực vật.'
  },
  {
    atomicNumber: 29,
    symbol: 'Cu',
    nameVi: 'Copper (Đồng)',
    nameEn: 'Copper',
    electronConfig: '[Ar] 3d¹⁰ 4s¹',
    valenceElectrons: '3d¹⁰ 4s¹',
    isAnomalous: true,
    anomalyReason: 'Cấu hình bão hòa hoàn toàn phân lớp 3d¹⁰ có độ bền nhiệt động học cao hơn cấu hình 3d⁹ 4s².',
    commonOxidationStates: [1, 2],
    colorInAqueous: {
      1: { colorVi: 'Đỏ gạch kết tủa', hex: '#DC2626', species: 'Cu₂O (rắn)' },
      2: { colorVi: 'Xanh lam', hex: '#0284C7', species: '[Cu(H₂O)₆]²⁺' }
    },
    descriptionVi: 'Cấu hình bất thường [Ar]3d¹⁰4s¹. Dẫn điện và dẫn nhiệt xuất sắc. Phức ammine [Cu(NH₃)₄(H₂O)₂]²⁺ có màu xanh lam thẫm đặc trưng.'
  },
  {
    atomicNumber: 30,
    symbol: 'Zn',
    nameVi: 'Zinc (Kẽm)',
    nameEn: 'Zinc',
    electronConfig: '[Ar] 3d¹⁰ 4s²',
    valenceElectrons: '3d¹⁰ 4s²',
    isAnomalous: false,
    commonOxidationStates: [2],
    colorInAqueous: {
      2: { colorVi: 'Không màu', hex: '#F8FAFC', species: '[Zn(H₂O)₄]²⁺ / [Zn(OH)₄]²⁻ (d¹⁰)' }
    },
    descriptionVi: 'Phân lớp 3d đã điền đầy 10 electron ở cả nguyên tử và ion Zn²⁺ (d¹⁰), nên hợp chất Zn(II) không có chuyển dời d-d, luôn không màu.'
  }
];

// 2. Spectrochemical Series of Ligands (IUPAC / GDPT 2018)
export const SPECTROCHEMICAL_LIGANDS: Ligand[] = [
  { formula: 'I-', nameIupacVi: 'Iođua (Iodido)', nameEn: 'Iodide', charge: -1, fieldStrength: 'YẾU', spectrochemicalRank: 1, denticity: 1 },
  { formula: 'Br-', nameIupacVi: 'Bromua (Bromido)', nameEn: 'Bromide', charge: -1, fieldStrength: 'YẾU', spectrochemicalRank: 2, denticity: 1 },
  { formula: 'Cl-', nameIupacVi: 'Clorua (Chlorido)', nameEn: 'Chloride', charge: -1, fieldStrength: 'YẾU', spectrochemicalRank: 3, denticity: 1 },
  { formula: 'F-', nameIupacVi: 'Florua (Fluorido)', nameEn: 'Fluoride', charge: -1, fieldStrength: 'YẾU', spectrochemicalRank: 4, denticity: 1 },
  { formula: 'OH-', nameIupacVi: 'Hiđroxit (Hydroxido)', nameEn: 'Hydroxide', charge: -1, fieldStrength: 'YẾU', spectrochemicalRank: 5, denticity: 1 },
  { formula: 'H2O', nameIupacVi: 'Aqua (Aqua)', nameEn: 'Aqua', charge: 0, fieldStrength: 'TRUNG_BÌNH', spectrochemicalRank: 6, denticity: 1 },
  { formula: 'SCN-', nameIupacVi: 'Thiocyanato', nameEn: 'Thiocyanate', charge: -1, fieldStrength: 'TRUNG_BÌNH', spectrochemicalRank: 7, denticity: 1 },
  { formula: 'NH3', nameIupacVi: 'Ammin (Ammine)', nameEn: 'Ammine', charge: 0, fieldStrength: 'MẠNH', spectrochemicalRank: 8, denticity: 1 },
  { formula: 'en', nameIupacVi: 'Ethylenediamine', nameEn: 'Ethylenediamine', charge: 0, fieldStrength: 'MẠNH', spectrochemicalRank: 9, denticity: 2 },
  { formula: 'NO2-', nameIupacVi: 'Nitrito-N (Nitro)', nameEn: 'Nitrite', charge: -1, fieldStrength: 'MẠNH', spectrochemicalRank: 10, denticity: 1 },
  { formula: 'CN-', nameIupacVi: 'Xianua (Cyanido)', nameEn: 'Cyanide', charge: -1, fieldStrength: 'MẠNH', spectrochemicalRank: 11, denticity: 1 },
  { formula: 'CO', nameIupacVi: 'Cacbonyl (Carbonyl)', nameEn: 'Carbonyl', charge: 0, fieldStrength: 'MẠNH', spectrochemicalRank: 12, denticity: 1 }
];

// 3. Coordination Complexes Catalog
export const COORDINATION_COMPLEXES: ComplexIon[] = [
  {
    id: 'cu-aqua',
    formula: '[Cu(H2O)6]2+',
    centralAtom: 'Cu',
    centralOxidationState: 2,
    dElectronsCount: 9,
    ligands: [{ ligandFormula: 'H2O', count: 6 }],
    coordinationNumber: 6,
    geometry: 'BÁT_DIỆN',
    netCharge: 2,
    iupacNameVi: 'Hexaaquadồng(II)',
    solutionColorVi: 'Xanh lam nhạt',
    colorHex: '#38BDF8',
    fieldSpinState: 'NOT_APPLICABLE', // d9 has 1 hole regardless of spin
    unpairedElectrons: 1,
    magneticNature: 'THUẬN_TỪ',
    magneticMomentBM: 1.73,
    t2gElectrons: 6,
    egElectrons: 3,
    specialApplicationVi: 'Dạng tồn tại phổ biến của ion Cu²⁺ trong dung dịch nước loãng.'
  },
  {
    id: 'cu-ammine',
    formula: '[Cu(NH3)4(H2O)2]2+',
    centralAtom: 'Cu',
    centralOxidationState: 2,
    dElectronsCount: 9,
    ligands: [
      { ligandFormula: 'NH3', count: 4 },
      { ligandFormula: 'H2O', count: 2 }
    ],
    coordinationNumber: 6,
    geometry: 'BÁT_DIỆN',
    netCharge: 2,
    iupacNameVi: 'Tetraammindiaquadồng(II)',
    solutionColorVi: 'Xanh lam thẫm (Royal Blue)',
    colorHex: '#1D4ED8',
    fieldSpinState: 'NOT_APPLICABLE',
    unpairedElectrons: 1,
    magneticNature: 'THUẬN_TỪ',
    magneticMomentBM: 1.73,
    t2gElectrons: 6,
    egElectrons: 3,
    specialApplicationVi: 'Phản ứng đặc trưng nhận biết ion Cu²⁺ và NH₃. Dung dịch Schweizer hòa tan xenlulozo để sản xuất tơ đồng-amoniac.'
  },
  {
    id: 'ag-ammine',
    formula: '[Ag(NH3)2]+',
    centralAtom: 'Ag',
    centralOxidationState: 1,
    dElectronsCount: 10,
    ligands: [{ ligandFormula: 'NH3', count: 2 }],
    coordinationNumber: 2,
    geometry: 'ĐƯỜNG_THẲNG',
    netCharge: 1,
    iupacNameVi: 'Diamminbạc(I)',
    solutionColorVi: 'Không màu',
    colorHex: '#F1F5F9',
    fieldSpinState: 'NOT_APPLICABLE',
    unpairedElectrons: 0,
    magneticNature: 'NGHỊCH_TỪ',
    magneticMomentBM: 0,
    specialApplicationVi: 'Thuốc thử Tollens tráng gương nhận biết anđehit, glucozơ, fructozơ và ankin có liên kết ba đầu mạch.'
  },
  {
    id: 'fe-h2o-6-3',
    formula: '[Fe(H2O)6]3+',
    centralAtom: 'Fe',
    centralOxidationState: 3,
    dElectronsCount: 5,
    ligands: [{ ligandFormula: 'H2O', count: 6 }],
    coordinationNumber: 6,
    geometry: 'BÁT_DIỆN',
    netCharge: 3,
    iupacNameVi: 'Hexaaquasắt(III)',
    solutionColorVi: 'Vàng nâu nhạt (thủy phân ra Fe(OH)₃)',
    colorHex: '#D97706',
    fieldSpinState: 'HIGH_SPIN',
    unpairedElectrons: 5,
    magneticNature: 'THUẬN_TỪ',
    magneticMomentBM: 5.92,
    t2gElectrons: 3,
    egElectrons: 2,
    specialApplicationVi: 'Phối tử H₂O là trường yếu -> phức bát diện spin cao (5 electron độc thân).'
  },
  {
    id: 'fe-cn-6-3',
    formula: '[Fe(CN)6]3-',
    centralAtom: 'Fe',
    centralOxidationState: 3,
    dElectronsCount: 5,
    ligands: [{ ligandFormula: 'CN-', count: 6 }],
    coordinationNumber: 6,
    geometry: 'BÁT_DIỆN',
    netCharge: -3,
    iupacNameVi: 'Hexaxianidoferrat(III)',
    solutionColorVi: 'Đỏ hồng ngọc (Ruby red)',
    colorHex: '#BE123C',
    fieldSpinState: 'LOW_SPIN',
    unpairedElectrons: 1,
    magneticNature: 'THUẬN_TỪ',
    magneticMomentBM: 1.73,
    t2gElectrons: 5,
    egElectrons: 0,
    specialApplicationVi: 'Phối tử CN⁻ là trường rất mạnh -> năng lượng tách bát diện lớn -> phức spin thấp (chỉ 1 electron độc thân).'
  },
  {
    id: 'fe-cn-6-4',
    formula: '[Fe(CN)6]4-',
    centralAtom: 'Fe',
    centralOxidationState: 2,
    dElectronsCount: 6,
    ligands: [{ ligandFormula: 'CN-', count: 6 }],
    coordinationNumber: 6,
    geometry: 'BÁT_DIỆN',
    netCharge: -4,
    iupacNameVi: 'Hexaxianidoferrat(II)',
    solutionColorVi: 'Vàng chanh nhạt',
    colorHex: '#FEF08A',
    fieldSpinState: 'LOW_SPIN',
    unpairedElectrons: 0,
    magneticNature: 'NGHỊCH_TỪ',
    magneticMomentBM: 0,
    t2gElectrons: 6,
    egElectrons: 0,
    specialApplicationVi: 'Ion Fe²⁺ d⁶ kết hợp CN⁻ trường mạnh tạo t2g⁶ eg⁰ -> hoàn toàn không còn e độc thân (nghịch từ).'
  },
  {
    id: 'fe-scn',
    formula: '[Fe(SCN)]2+',
    centralAtom: 'Fe',
    centralOxidationState: 3,
    dElectronsCount: 5,
    ligands: [{ ligandFormula: 'SCN-', count: 1 }],
    coordinationNumber: 6, // 1 SCN- and 5 H2O
    geometry: 'BÁT_DIỆN',
    netCharge: 2,
    iupacNameVi: 'Thiocyanatosắt(III)',
    solutionColorVi: 'Đỏ máu (Blood Red)',
    colorHex: '#991B1B',
    fieldSpinState: 'HIGH_SPIN',
    unpairedElectrons: 5,
    magneticNature: 'THUẬN_TỪ',
    magneticMomentBM: 5.92,
    specialApplicationVi: 'Phản ứng cực nhạy phát hiện vết ion Fe³⁺ trong phân tích định tính và trắc quang hóa học.'
  },
  {
    id: 'co-aqua',
    formula: '[Co(H2O)6]2+',
    centralAtom: 'Co',
    centralOxidationState: 2,
    dElectronsCount: 7,
    ligands: [{ ligandFormula: 'H2O', count: 6 }],
    coordinationNumber: 6,
    geometry: 'BÁT_DIỆN',
    netCharge: 2,
    iupacNameVi: 'Hexaaquacobalt(II)',
    solutionColorVi: 'Hồng cánh sen',
    colorHex: '#F472B6',
    fieldSpinState: 'HIGH_SPIN',
    unpairedElectrons: 3,
    magneticNature: 'THUẬN_TỪ',
    magneticMomentBM: 3.87,
    t2gElectrons: 5,
    egElectrons: 2,
    specialApplicationVi: 'Cấu hình bát diện trường yếu d⁷, phối tử nước. Khi đun nóng hoặc thêm ion Cl⁻ chuyển thành [CoCl₄]²⁻ màu xanh.'
  },
  {
    id: 'co-chloro',
    formula: '[CoCl4]2-',
    centralAtom: 'Co',
    centralOxidationState: 2,
    dElectronsCount: 7,
    ligands: [{ ligandFormula: 'Cl-', count: 4 }],
    coordinationNumber: 4,
    geometry: 'TỨ_DIỆN',
    netCharge: -2,
    iupacNameVi: 'Tetracloridocobaltat(II)',
    solutionColorVi: 'Xanh lam đậm (Deep Blue)',
    colorHex: '#1E40AF',
    fieldSpinState: 'NOT_APPLICABLE',
    unpairedElectrons: 3,
    magneticNature: 'THUẬN_TỪ',
    magneticMomentBM: 3.87,
    specialApplicationVi: 'Phức tứ diện số phối trí 4, hình thành khi tăng nồng độ Cl⁻ hoặc tăng nhiệt độ dung dịch CoCl₂.'
  },
  {
    id: 'cisplatin',
    formula: '[Pt(NH3)2Cl2]',
    centralAtom: 'Pt',
    centralOxidationState: 2,
    dElectronsCount: 8,
    ligands: [
      { ligandFormula: 'NH3', count: 2 },
      { ligandFormula: 'Cl-', count: 2 }
    ],
    coordinationNumber: 4,
    geometry: 'VUÔNG_PHẲNG',
    netCharge: 0,
    iupacNameVi: 'cis-Diammindicloridoplatin(II)',
    solutionColorVi: 'Vàng kem nhạt',
    colorHex: '#FEF9C3',
    fieldSpinState: 'LOW_SPIN',
    unpairedElectrons: 0,
    magneticNature: 'NGHỊCH_TỪ',
    magneticMomentBM: 0,
    specialApplicationVi: 'Thuốc hóa trị chống ung thư huyền thoại (Cisplatin). Đồng phân trans- không có hoạt tính sinh học điều trị.'
  },
  {
    id: 'zn-hydroxo',
    formula: '[Zn(OH)4]2-',
    centralAtom: 'Zn',
    centralOxidationState: 2,
    dElectronsCount: 10,
    ligands: [{ ligandFormula: 'OH-', count: 4 }],
    coordinationNumber: 4,
    geometry: 'TỨ_DIỆN',
    netCharge: -2,
    iupacNameVi: 'Tetrahiđroxidozincat(II)',
    solutionColorVi: 'Không màu',
    colorHex: '#F8FAFC',
    fieldSpinState: 'NOT_APPLICABLE',
    unpairedElectrons: 0,
    magneticNature: 'NGHỊCH_TỪ',
    magneticMomentBM: 0,
    specialApplicationVi: 'Minh chứng cho tính lưỡng tính của Zn(OH)₂: kết tủa tan trong kiềm dư tạo dung dịch phức trong suốt.'
  }
];

// 4. Chromate - Dichromate Equilibrium Model
export function calculateChromateEquilibrium(pH: number): ChromateEquilibriumResult {
  // 2 CrO4(2-) (yellow) + 2 H(+) <=> Cr2O7(2-) (orange) + H2O
  // Log K equilibrium transition center point ~ pH 6.0
  const normalizedPh = Math.max(0, Math.min(14, pH));
  
  // Sigmoid response curve centered at pH 6.0:
  // At low pH (acidic), Cr2O7(2-) dominates.
  // At high pH (basic), CrO4(2-) dominates.
  const sigmoid = 1 / (1 + Math.exp(-2.5 * (normalizedPh - 6.0)));
  const crO4Percentage = Math.round(sigmoid * 100);
  const cr2O7Percentage = 100 - crO4Percentage;

  let dominantSpecies: ChromateEquilibriumResult['dominantSpecies'] = 'CÂN_BẰNG_HỖN_HỢP';
  let solutionColorVi = 'Vàng cam trung gian';
  let colorHex = '#F59E0B';

  if (cr2O7Percentage >= 75) {
    dominantSpecies = 'Cr2O7(2-)';
    solutionColorVi = 'Da cam đậm (Cr₂O₇²⁻)';
    colorHex = '#EA580C';
  } else if (crO4Percentage >= 75) {
    dominantSpecies = 'CrO4(2-)';
    solutionColorVi = 'Vàng tươi (CrO₄²⁻)';
    colorHex = '#FACC15';
  }

  const explanationVi = normalizedPh < 6.0
    ? `Môi trường axit (pH = ${normalizedPh.toFixed(1)} < 6.0): Thêm ion H⁺ làm cân bằng dịch chuyển sang chiều thuận tạo Cr₂O₇²⁻, dung dịch chuyển sang màu da cam đậm.`
    : normalizedPh > 6.0
    ? `Môi trường bazơ (pH = ${normalizedPh.toFixed(1)} > 6.0): OH⁻ trung hòa H⁺ làm giảm nồng độ H⁺, cân bằng dịch chuyển sang chiều nghịch tạo CrO₄²⁻, dung dịch chuyển sang màu vàng tươi.`
    : `Tại pH = 6.0: Nồng độ CrO₄²⁻ và Cr₂O₇²⁻ cân bằng xấp xỉ nhau, dung dịch có màu vàng cam lai.`;

  return {
    pH: normalizedPh,
    crO4Percentage,
    cr2O7Percentage,
    dominantSpecies,
    solutionColorVi,
    colorHex,
    chemicalEquation: '2 CrO₄²⁻ (vàng) + 2 H⁺ ⇌ Cr₂O₇²⁻ (da cam) + H₂O',
    explanationVi
  };
}

// 5. Cobalt Chloride Octahedral - Tetrahedral Thermal & Concentration Switch
export function calculateCobaltEquilibrium(
  temperatureC: number,
  clConcentrationM: number,
  waterFraction: number = 1.0
): CobaltChlorideResult {
  // [Co(H2O)6]2+ (pink octahedral) + 4 Cl- + Heat <=> [CoCl4]2- (blue tetrahedral) + 6 H2O
  // Delta H > 0 (endothermic forward direction).
  // Heating and adding Cl- favors blue [CoCl4]2-.
  // Cooling and adding water favors pink [Co(H2O)6]2+.
  const t = Math.max(0, Math.min(100, temperatureC));
  const cl = Math.max(0, Math.min(12, clConcentrationM));
  const w = Math.max(0.1, Math.min(2.0, waterFraction));

  // Empirical coordination transition score
  const tempContribution = (t - 25) * 1.2; // 0 at 25C, positive when hot
  const clContribution = (cl - 1.0) * 15.0; // high Cl favors forward
  const waterDepression = (w - 1.0) * 30.0; // dilution favors reverse

  const totalScore = tempContribution + clContribution - waterDepression;
  const sigmoid = 1 / (1 + Math.exp(-0.08 * totalScore));
  
  const coCl4Percentage = Math.round(sigmoid * 100);
  const coH2O6Percentage = 100 - coCl4Percentage;

  let dominantSpecies: CobaltChlorideResult['dominantSpecies'] = 'HỖN_HỢP';
  let solutionColorVi = 'Tím hoa cà (Hỗn hợp cân bằng)';
  let colorHex = '#A855F7';

  if (coCl4Percentage >= 70) {
    dominantSpecies = '[CoCl4]2-';
    solutionColorVi = 'Xanh lam đậm ([CoCl₄]²⁻)';
    colorHex = '#1D4ED8';
  } else if (coH2O6Percentage >= 70) {
    dominantSpecies = '[Co(H2O)6]2+';
    solutionColorVi = 'Hồng cánh sen ([Co(H₂O)₆]²⁺)';
    colorHex = '#F472B6';
  }

  let explanationVi = `Tại ${t}°C và [Cl⁻] = ${cl.toFixed(1)}M: `;
  if (t > 50 && cl > 3) {
    explanationVi += 'Nhiệt độ cao và nồng độ Cl⁻ lớn kích hoạt phản ứng thu nhiệt tạo phức tứ diện [CoCl₄]²⁻ màu xanh lam thẫm.';
  } else if (w > 1.2 || cl < 1) {
    explanationVi += 'Pha loãng nước hoặc nồng độ Cl⁻ thấp làm cân bằng dịch chuyển sang chiều nghịch tái tạo phức bát diện [Co(H₂O)₆]²⁺ màu hồng.';
  } else {
    explanationVi += 'Dung dịch nằm ở vùng chuyển tiếp cân bằng động giữa dạng bát diện hồng và dạng tứ diện lam.';
  }

  return {
    temperatureC: t,
    clConcentrationM: cl,
    waterFraction: w,
    coH2O6Percentage,
    coCl4Percentage,
    dominantSpecies,
    solutionColorVi,
    colorHex,
    reactionEquation: '[Co(H₂O)₆]²⁺ (hồng, bát diện) + 4 Cl⁻ + Q ⇌ [CoCl₄]²⁻ (lam, tứ diện) + 6 H₂O',
    explanationVi
  };
}

// 6. Crystal Field Splitting Spin & Magnetic Calculator
export function calculateOctahedralSplitting(dCount: number, fieldStrength: 'YẾU' | 'MẠNH'): {
  t2g: number;
  eg: number;
  unpaired: number;
  spinType: 'HIGH_SPIN' | 'LOW_SPIN' | 'INVARIANT';
  magneticNature: 'THUẬN_TỪ' | 'NGHỊCH_TỪ';
  magneticMomentBM: number;
} {
  const d = Math.max(0, Math.min(10, Math.round(dCount)));

  // d0 to d3 and d8 to d10 are invariant to ligand field strength
  if (d <= 3 || d >= 8) {
    let t2g = 0;
    let eg = 0;
    if (d <= 3) {
      t2g = d;
      eg = 0;
    } else if (d === 8) {
      t2g = 6;
      eg = 2;
    } else if (d === 9) {
      t2g = 6;
      eg = 3;
    } else {
      t2g = 6;
      eg = 4;
    }
    const unpaired = d <= 3 ? d : d === 8 ? 2 : d === 9 ? 1 : 0;
    const magneticMomentBM = parseFloat(Math.sqrt(unpaired * (unpaired + 2)).toFixed(2));
    return {
      t2g,
      eg,
      unpaired,
      spinType: 'INVARIANT',
      magneticNature: unpaired > 0 ? 'THUẬN_TỪ' : 'NGHỊCH_TỪ',
      magneticMomentBM
    };
  }

  // d4, d5, d6, d7 depend on ligand field strength
  if (fieldStrength === 'YẾU') {
    // High spin (Hund's rule applies across all 5 orbitals before pairing)
    let t2g = 3;
    let eg = d - 3;
    let unpaired = 0;
    if (d === 4) { t2g = 3; eg = 1; unpaired = 4; }
    if (d === 5) { t2g = 3; eg = 2; unpaired = 5; }
    if (d === 6) { t2g = 4; eg = 2; unpaired = 4; }
    if (d === 7) { t2g = 5; eg = 2; unpaired = 3; }
    const magneticMomentBM = parseFloat(Math.sqrt(unpaired * (unpaired + 2)).toFixed(2));
    return {
      t2g,
      eg,
      unpaired,
      spinType: 'HIGH_SPIN',
      magneticNature: 'THUẬN_TỪ',
      magneticMomentBM
    };
  } else {
    // Strong field: Low spin (pair in t2g first)
    let t2g = d;
    let eg = 0;
    let unpaired = 0;
    if (d === 4) { t2g = 4; eg = 0; unpaired = 2; }
    if (d === 5) { t2g = 5; eg = 0; unpaired = 1; }
    if (d === 6) { t2g = 6; eg = 0; unpaired = 0; }
    if (d === 7) { t2g = 6; eg = 1; unpaired = 1; }
    const magneticMomentBM = parseFloat(Math.sqrt(unpaired * (unpaired + 2)).toFixed(2));
    return {
      t2g,
      eg,
      unpaired,
      spinType: 'LOW_SPIN',
      magneticNature: unpaired > 0 ? 'THUẬN_TỪ' : 'NGHỊCH_TỪ',
      magneticMomentBM
    };
  }
}
