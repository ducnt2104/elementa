// src/domain/crystalFieldTheoryEngine.ts
// Milestone 42: Transition Metal Crystal Field Theory (CFT), Octahedral/Tetrahedral Splitting, High-Spin/Low-Spin & Spectrochemical Series Engine
// Standards: IUPAC Compendium of Chemical Terminology (Gold Book), Tanabe-Sugano Diagrams & Vietnam GDPT 2018 (Hóa 12 Chuyên đề: Phức chất & Phổ hấp thụ d-d)

export type CoordinationGeometry = 'OCTAHEDRAL' | 'TETRAHEDRAL' | 'SQUARE_PLANAR';
export type SpinState = 'HIGH_SPIN' | 'LOW_SPIN';
export type MagneticBehavior = 'PARAMAGNETIC' | 'DIAMAGNETIC';
export type JahnTellerDistortionType = 'STRONG_ELONGATION' | 'WEAK' | 'NONE';

export interface LigandSpec {
  id: string;
  name: string;
  nameVI: string;
  formula: string;
  donorAtom: string;
  spectrochemicalRank: number; // 1 (weakest I-) to 12 (strongest CO)
  splittingFactor: number; // Multiplier relative to H2O (1.00)
  charge: number;
  denticity: number;
  fieldStrength: 'WEAK_FIELD' | 'INTERMEDIATE' | 'STRONG_FIELD';
  descriptionVI: string;
}

export interface MetalCationSpec {
  id: string;
  name: string;
  nameVI: string;
  symbol: string;
  atomicNumberZ: number;
  oxidationState: number;
  dElectronCount: number; // d^1 to d^10
  freeIonTerm: string;
  meanPairingEnergyCmInv: number; // P in cm^-1
  baseDeltaOCmInv: number; // Base Delta_o with H2O in cm^-1
  colorHex: string;
  descriptionVI: string;
}

export interface CrystalFieldSplittingResult {
  metal: MetalCationSpec;
  ligand: LigandSpec;
  geometry: CoordinationGeometry;
  coordinationNumber: number;
  complexFormula: string;
  complexNameVI: string;
  dElectronCount: number;

  // Energy Parameters
  deltaEnergyCmInv: number; // Delta_o, Delta_t, or Delta_sp in cm^-1
  deltaEnergyKjPerMol: number;
  pairingEnergyCmInv: number;

  // Spin State & Occupancies
  spinState: SpinState;
  hasHighLowSpinChoice: boolean; // Only d^4 to d^7 in octahedral have HS/LS choice
  t2gElectrons: number;
  egElectrons: number;
  unpairedElectronsCount: number;
  magneticBehavior: MagneticBehavior;
  spinOnlyMagneticMomentBM: number; // mu_eff = sqrt(n(n+2)) Bohr Magnetons

  // CFSE
  cfseDeltaUnits: number; // in units of Delta_o (e.g. -0.4, -2.4)
  cfseKjPerMol: number;

  // Optical Absorption & Color
  absorptionWavelengthNm: number; // lambda = 10^7 / nu_bar
  absorbedColorNameVI: string;
  transmittedComplementaryColorHex: string;
  transmittedComplementaryColorNameVI: string;

  // Jahn-Teller Effect
  jahnTellerType: JahnTellerDistortionType;
  jahnTellerExplanationVI: string;
  pedagogicalInsightVI: string;
}

// ----------------------------------------------------------------------------
// SPECTROCHEMICAL SERIES OF LIGANDS (IUPAC ORDERING)
// I- < Br- < S2- < SCN- < Cl- < NO3- < F- < OH- < C2O4 2- < H2O < NCS- < NH3 < en < NO2- < CN- < CO
// ----------------------------------------------------------------------------
export const SPECTROCHEMICAL_LIGANDS: Record<string, LigandSpec> = {
  iodide: {
    id: 'iodide',
    name: 'Iodide',
    nameVI: 'Iotua (I-)',
    formula: 'I-',
    donorAtom: 'I',
    spectrochemicalRank: 1,
    splittingFactor: 0.70,
    charge: -1,
    denticity: 1,
    fieldStrength: 'WEAK_FIELD',
    descriptionVI: 'Phối tử pi-donor rất mạnh, độ âm điện thấp, trường tinh thể rất yếu. Luôn tạo phức Spin cao (High-Spin).',
  },

  chloride: {
    id: 'chloride',
    name: 'Chloride',
    nameVI: 'Clorua (Cl-)',
    formula: 'Cl-',
    donorAtom: 'Cl',
    spectrochemicalRank: 3,
    splittingFactor: 0.78,
    charge: -1,
    denticity: 1,
    fieldStrength: 'WEAK_FIELD',
    descriptionVI: 'Phối tử halogen đơn càng phổ biến, tạo phức bát diện hoặc tứ diện [CoCl4]2- màu xanh lam thẫm.',
  },

  fluoride: {
    id: 'fluoride',
    name: 'Fluoride',
    nameVI: 'Florua (F-)',
    formula: 'F-',
    donorAtom: 'F',
    spectrochemicalRank: 5,
    splittingFactor: 0.90,
    charge: -1,
    denticity: 1,
    fieldStrength: 'WEAK_FIELD',
    descriptionVI: 'Độ âm điện cực đại nhưng liên kết ion chiếm ưu thế, tạo trường tinh thể yếu, [FeF6]3- có Spin cao (5 electron độc thân).',
  },

  hydroxide: {
    id: 'hydroxide',
    name: 'Hydroxide',
    nameVI: 'Hiđroxit (OH-)',
    formula: 'OH-',
    donorAtom: 'O',
    spectrochemicalRank: 6,
    splittingFactor: 0.94,
    charge: -1,
    denticity: 1,
    fieldStrength: 'WEAK_FIELD',
    descriptionVI: 'Phối tử oxo-donor, làm kết tủa hiđroxit kim loại rồi hòa tan tạo phức hiđroxo [Zn(OH)4]2-, [Al(OH)4]-.',
  },

  water: {
    id: 'water',
    name: 'Aqua (Water)',
    nameVI: 'Nước (Aqua H2O)',
    formula: 'H2O',
    donorAtom: 'O',
    spectrochemicalRank: 7,
    splittingFactor: 1.00, // Reference benchmark 1.00
    charge: 0,
    denticity: 1,
    fieldStrength: 'INTERMEDIATE',
    descriptionVI: 'Chuẩn quy chiếu của dãy hóa quang phổ. Hầu hết cation kim loại chuyển tiếp trong dung dịch nước tồn tại dạng phức bát diện [M(H2O)6]n+.',
  },

  ammonia: {
    id: 'ammonia',
    name: 'Ammine',
    nameVI: 'Amoniac (Ammine NH3)',
    formula: 'NH3',
    donorAtom: 'N',
    spectrochemicalRank: 9,
    splittingFactor: 1.25,
    charge: 0,
    denticity: 1,
    fieldStrength: 'STRONG_FIELD',
    descriptionVI: 'Phối tử sigma-donor mạnh qua cặp electron tự do của Nitơ, làm tăng vọt Delta_o, biến Co(III) thành Spin thấp hoàn toàn.',
  },

  ethylenediamine: {
    id: 'ethylenediamine',
    name: 'Ethylenediamine (en)',
    nameVI: 'Etylenđiamin (en)',
    formula: 'en (H2NCH2CH2NH2)',
    donorAtom: 'N, N',
    spectrochemicalRank: 10,
    splittingFactor: 1.28,
    charge: 0,
    denticity: 2,
    fieldStrength: 'STRONG_FIELD',
    descriptionVI: 'Phối tử tạo vòng càng (chelate) hai càng 5 cạnh siêu bền (hiệu ứng chelate), trường mạnh hơn amoniac.',
  },

  nitrite: {
    id: 'nitrite',
    name: 'Nitro (N-bound Nitrite)',
    nameVI: 'Nitro (NO2-)',
    formula: 'NO2-',
    donorAtom: 'N',
    spectrochemicalRank: 11,
    splittingFactor: 1.40,
    charge: -1,
    denticity: 1,
    fieldStrength: 'STRONG_FIELD',
    descriptionVI: 'Phối tử liên kết qua Nitơ có orbital pi* phản liên kết rỗng nhận electron ngược (pi-backbonding), trường tinh thể rất mạnh.',
  },

  cyanide: {
    id: 'cyanide',
    name: 'Cyanide',
    nameVI: 'Xianua (CN-)',
    formula: 'CN-',
    donorAtom: 'C',
    spectrochemicalRank: 12,
    splittingFactor: 1.70,
    charge: -1,
    denticity: 1,
    fieldStrength: 'STRONG_FIELD',
    descriptionVI: 'Phối tử C-donor và pi-acceptor cực mạnh, Delta_o vượt xa năng lượng ghép đôi P. Luôn ép các electron ghép đôi tạo phức Spin thấp [Fe(CN)6]4- nghịch từ.',
  },

  carbon_monoxide: {
    id: 'carbon_monoxide',
    name: 'Carbonyl',
    nameVI: 'Cacbonyl (CO)',
    formula: 'CO',
    donorAtom: 'C',
    spectrochemicalRank: 13,
    splittingFactor: 1.90,
    charge: 0,
    denticity: 1,
    fieldStrength: 'STRONG_FIELD',
    descriptionVI: 'Đỉnh cao của dãy hóa quang phổ. Hiệu ứng liên kết pi ngược M -> CO đẩy Delta_o lên mức tối đa, ổn định kim loại ở số oxi hóa 0 như Ni(CO)4, Fe(CO)5.',
  },
};

// ----------------------------------------------------------------------------
// TRANSITION METAL CATION CATALOG (d^1 to d^10)
// ----------------------------------------------------------------------------
export const TRANSITION_METAL_CATIONS: Record<string, MetalCationSpec> = {
  ti3: {
    id: 'ti3',
    name: 'Titanium(III)',
    nameVI: 'Titan(III) - Ti³⁺',
    symbol: 'Ti³⁺',
    atomicNumberZ: 22,
    oxidationState: 3,
    dElectronCount: 1, // d^1
    freeIonTerm: '²D',
    meanPairingEnergyCmInv: 0, // No pairing needed for 1 electron
    baseDeltaOCmInv: 20300, // [Ti(H2O)6]3+ absorbs at ~500 nm (20,300 cm^-1) -> purple
    colorHex: '#c084fc', // Purple
    descriptionVI: 'Hệ d¹ kinh điển trong sách giáo khoa hóa học. Chỉ có một bước chuyển d-d duy nhất t2g¹ -> eg¹, hấp thụ ánh sáng vàng lục nên dung dịch có màu tím đặc trưng.',
  },

  v3: {
    id: 'v3',
    name: 'Vanadium(III)',
    nameVI: 'Vanađi(III) - V³⁺',
    symbol: 'V³⁺',
    atomicNumberZ: 23,
    oxidationState: 3,
    dElectronCount: 2, // d^2
    freeIonTerm: '³F',
    meanPairingEnergyCmInv: 25000,
    baseDeltaOCmInv: 17800,
    colorHex: '#22c55e', // Green
    descriptionVI: 'Hệ d² với 2 electron độc thân ở orbital t2g (t2g² eg⁰), dung dịch nước có màu xanh lục.',
  },

  cr3: {
    id: 'cr3',
    name: 'Chromium(III)',
    nameVI: 'Crom(III) - Cr³⁺',
    symbol: 'Cr³⁺',
    atomicNumberZ: 24,
    oxidationState: 3,
    dElectronCount: 3, // d^3
    freeIonTerm: '⁴F',
    meanPairingEnergyCmInv: 23000,
    baseDeltaOCmInv: 17400,
    colorHex: '#10b981', // Emerald
    descriptionVI: 'Hệ d³ có phân lớp t2g bán bão hòa hoàn hảo (t2g³ eg⁰), CFSE = -1.2 Delta_o cực kỳ bền vững, trơ về mặt nhiệt động và động học trao đổi phối tử.',
  },

  cr2: {
    id: 'cr2',
    name: 'Chromium(II)',
    nameVI: 'Crom(II) - Cr²⁺',
    symbol: 'Cr²⁺',
    atomicNumberZ: 24,
    oxidationState: 2,
    dElectronCount: 4, // d^4 (First High-Spin / Low-Spin choice point!)
    freeIonTerm: '⁵D',
    meanPairingEnergyCmInv: 23500,
    baseDeltaOCmInv: 14100,
    colorHex: '#38bdf8', // Blue
    descriptionVI: 'Hệ d⁴ điểm khởi đầu phân nhánh Spin cao/thấp. Ở Spin cao (t2g³ eg¹), electron đơn độc ở eg gây hiệu ứng biến dạng Jahn-Teller mạnh mẽ.',
  },

  fe3: {
    id: 'fe3',
    name: 'Iron(III)',
    nameVI: 'Sắt(III) - Fe³⁺',
    symbol: 'Fe³⁺',
    atomicNumberZ: 26,
    oxidationState: 3,
    dElectronCount: 5, // d^5
    freeIonTerm: '⁶S',
    meanPairingEnergyCmInv: 30000,
    baseDeltaOCmInv: 13700,
    colorHex: '#f59e0b', // Amber/Yellow
    descriptionVI: 'Hệ d⁵ Spin cao (t2g³ eg²) có cấu hình bán bão hòa toàn phần: CFSE = 0, chuyển mức d-d bị cấm spin nên màu vàng nâu rất nhạt. Ở Spin thấp với CN-, tạo [Fe(CN)6]3- nghịch từ.',
  },

  fe2: {
    id: 'fe2',
    name: 'Iron(II)',
    nameVI: 'Sắt(II) - Fe²⁺',
    symbol: 'Fe²⁺',
    atomicNumberZ: 26,
    oxidationState: 2,
    dElectronCount: 6, // d^6
    freeIonTerm: '⁵D',
    meanPairingEnergyCmInv: 17600,
    baseDeltaOCmInv: 10400,
    colorHex: '#86efac', // Pale green
    descriptionVI: 'Hệ d⁶ kinh điển: [Fe(H2O)6]2+ có Delta_o (10,400) < P (17,600) nên là Spin cao (t2g⁴ eg², n = 4, thuận từ). Nhưng [Fe(CN)6]4- có Delta_o (33,000) > P nên là Spin thấp (t2g⁶ eg⁰, n = 0, nghịch từ).',
  },

  co3: {
    id: 'co3',
    name: 'Cobalt(III)',
    nameVI: 'Coban(III) - Co³⁺',
    symbol: 'Co³⁺',
    atomicNumberZ: 27,
    oxidationState: 3,
    dElectronCount: 6, // d^6
    freeIonTerm: '⁵D',
    meanPairingEnergyCmInv: 21000,
    baseDeltaOCmInv: 18200,
    colorHex: '#fbbf24', // Golden yellow
    descriptionVI: 'Hệ d⁶ của cation tích điện +3. Ngay cả với phối tử tầm trung như NH3, Delta_o tăng vọt lên 23,000 cm^-1 > P, tạo phức vàng [Co(NH3)6]3+ Spin thấp hoàn toàn nghịch từ.',
  },

  co2: {
    id: 'co2',
    name: 'Cobalt(II)',
    nameVI: 'Coban(II) - Co²⁺',
    symbol: 'Co²⁺',
    atomicNumberZ: 27,
    oxidationState: 2,
    dElectronCount: 7, // d^7
    freeIonTerm: '⁴F',
    meanPairingEnergyCmInv: 22500,
    baseDeltaOCmInv: 9300,
    colorHex: '#f43f5e', // Pink / Blue in Cl-
    descriptionVI: 'Hệ d⁷: Phức bát diện [Co(H2O)6]2+ màu hồng nhạt. Khi thêm Cl- tạo phức tứ diện [CoCl4]2- màu xanh coban thẫm do mất tâm đối xứng inversion.',
  },

  ni2: {
    id: 'ni2',
    name: 'Nickel(II)',
    nameVI: 'Niken(II) - Ni²⁺',
    symbol: 'Ni²⁺',
    atomicNumberZ: 28,
    oxidationState: 2,
    dElectronCount: 8, // d^8
    freeIonTerm: '³F',
    meanPairingEnergyCmInv: 20000,
    baseDeltaOCmInv: 8500,
    colorHex: '#4ade80', // Emerald green
    descriptionVI: 'Hệ d⁸: Trong trường bát diện luôn có cấu hình t2g⁶ eg² (n = 2 thuận từ). Khi gặp phối tử trường mạnh CN-, chuyển thành hình vuông phẳng [Ni(CN)4]2- nghịch từ.',
  },

  cu2: {
    id: 'cu2',
    name: 'Copper(II)',
    nameVI: 'Đồng(II) - Cu²⁺',
    symbol: 'Cu²⁺',
    atomicNumberZ: 29,
    oxidationState: 2,
    dElectronCount: 9, // d^9 (Maximum Jahn-Teller effect!)
    freeIonTerm: '²D',
    meanPairingEnergyCmInv: 20500,
    baseDeltaOCmInv: 12600,
    colorHex: '#0284c7', // Royal Cyan/Blue
    descriptionVI: 'Hệ d⁹ kinh điển (t2g⁶ eg³): Orbital eg chứa 3 electron bất đối xứng, gây biến dạng Jahn-Teller cực đại kéo dài 2 trục dọc trục z (tetragonal elongation).',
  },

  zn2: {
    id: 'zn2',
    name: 'Zinc(II)',
    nameVI: 'Kẽm(II) - Zn²⁺',
    symbol: 'Zn²⁺',
    atomicNumberZ: 30,
    oxidationState: 2,
    dElectronCount: 10, // d^10
    freeIonTerm: '¹S',
    meanPairingEnergyCmInv: 0,
    baseDeltaOCmInv: 0,
    colorHex: '#94a3b8', // Colorless
    descriptionVI: 'Hệ d¹⁰ phân lớp d lấp đầy hoàn toàn (t2g⁶ eg⁴): CFSE = 0, không có bước chuyển d-d nên các phức chất của Zn²⁺ đều không màu và nghịch từ.',
  },
};

// ----------------------------------------------------------------------------
// COMPLEMENTARY COLOR WHEEL MATCHER (d-d ABSORPTION)
// ----------------------------------------------------------------------------
export function getComplementaryColor(wavelengthNm: number): {
  absorbedColorVI: string;
  transmittedHex: string;
  transmittedColorVI: string;
} {
  // Visible spectrum: 380 nm - 750 nm
  if (wavelengthNm < 420) {
    return { absorbedColorVI: 'Tím (< 420 nm)', transmittedHex: '#facc15', transmittedColorVI: 'Vàng lục' };
  } else if (wavelengthNm < 450) {
    return { absorbedColorVI: 'Chàm - Xanh lam (420-450 nm)', transmittedHex: '#f59e0b', transmittedColorVI: 'Vàng cam' };
  } else if (wavelengthNm < 490) {
    return { absorbedColorVI: 'Xanh lam (450-490 nm)', transmittedHex: '#ea580c', transmittedColorVI: 'Cam' };
  } else if (wavelengthNm < 520) {
    return { absorbedColorVI: 'Lục - Xanh lá (490-520 nm)', transmittedHex: '#dc2626', transmittedColorVI: 'Đỏ' };
  } else if (wavelengthNm < 570) {
    return { absorbedColorVI: 'Vàng lục (520-570 nm)', transmittedHex: '#a855f7', transmittedColorVI: 'Tím - Tía' };
  } else if (wavelengthNm < 620) {
    return { absorbedColorVI: 'Vàng - Cam (570-620 nm)', transmittedHex: '#0284c7', transmittedColorVI: 'Xanh lam đậm' };
  } else if (wavelengthNm < 750) {
    return { absorbedColorVI: 'Đỏ (620-750 nm)', transmittedHex: '#06b6d4', transmittedColorVI: 'Xanh lơ (Cyan)' };
  } else {
    return { absorbedColorVI: 'Hồng ngoại (> 750 nm)', transmittedHex: '#38bdf8', transmittedColorVI: 'Xanh lam rất nhạt' };
  }
}

// ----------------------------------------------------------------------------
// CRYSTAL FIELD SPLITTING ENGINE
// ----------------------------------------------------------------------------

export function calculateCrystalFieldSplitting(
  metalId: string,
  ligandId: string,
  geometry: CoordinationGeometry = 'OCTAHEDRAL'
): CrystalFieldSplittingResult {
  const metal = TRANSITION_METAL_CATIONS[metalId] || TRANSITION_METAL_CATIONS.fe2;
  const ligand = SPECTROCHEMICAL_LIGANDS[ligandId] || SPECTROCHEMICAL_LIGANDS.water;

  const d = metal.dElectronCount;
  const P = metal.meanPairingEnergyCmInv;

  // Calculate Delta
  let deltaCmInv = metal.baseDeltaOCmInv * ligand.splittingFactor;
  let coordNumber = 6;

  if (geometry === 'TETRAHEDRAL') {
    // Delta_t = 4/9 * Delta_o ≈ 0.444 Delta_o
    deltaCmInv = deltaCmInv * (4 / 9);
    coordNumber = 4;
  } else if (geometry === 'SQUARE_PLANAR') {
    // Delta_sp ≈ 1.3 * Delta_o
    deltaCmInv = deltaCmInv * 1.3;
    coordNumber = 4;
  }

  // 1 cm^-1 = 0.0119627 kJ/mol
  const deltaKjPerMol = Number((deltaCmInv * 0.0119627).toFixed(1));

  // Determine High-Spin vs Low-Spin
  // Tetrahedral is virtually always High-Spin because Delta_t << P
  let spinState: SpinState = 'HIGH_SPIN';
  const hasChoice = (d >= 4 && d <= 7 && geometry === 'OCTAHEDRAL');

  if (geometry === 'OCTAHEDRAL') {
    if (hasChoice) {
      spinState = deltaCmInv > P ? 'LOW_SPIN' : 'HIGH_SPIN';
    } else {
      // d^1-d^3 and d^8-d^10 have identical configuration regardless of spin
      spinState = 'HIGH_SPIN';
    }
  } else if (geometry === 'SQUARE_PLANAR') {
    spinState = 'LOW_SPIN';
  }

  // Electronic occupancies
  let t2g = 0;
  let eg = 0;
  let unpaired = 0;
  let cfseDelta = 0;

  if (geometry === 'OCTAHEDRAL') {
    if (spinState === 'HIGH_SPIN') {
      // High-spin filling: fill t2g with 1, 2, 3, then eg with 4, 5, then pair t2g 6, 7, 8, then eg 9, 10
      if (d <= 3) {
        t2g = d; eg = 0; unpaired = d;
      } else if (d === 4) {
        t2g = 3; eg = 1; unpaired = 4;
      } else if (d === 5) {
        t2g = 3; eg = 2; unpaired = 5;
      } else if (d === 6) {
        t2g = 4; eg = 2; unpaired = 4;
      } else if (d === 7) {
        t2g = 5; eg = 2; unpaired = 3;
      } else if (d === 8) {
        t2g = 6; eg = 2; unpaired = 2;
      } else if (d === 9) {
        t2g = 6; eg = 3; unpaired = 1;
      } else if (d === 10) {
        t2g = 6; eg = 4; unpaired = 0;
      }
    } else {
      // Low-spin filling: pair up completely in t2g before placing into eg
      if (d <= 6) {
        t2g = d; eg = 0;
        unpaired = d <= 3 ? d : (6 - d);
      } else if (d === 7) {
        t2g = 6; eg = 1; unpaired = 1;
      } else if (d === 8) {
        t2g = 6; eg = 2; unpaired = 2;
      } else if (d === 9) {
        t2g = 6; eg = 3; unpaired = 1;
      } else if (d === 10) {
        t2g = 6; eg = 4; unpaired = 0;
      }
    }
    // CFSE = (-0.4 * t2g + 0.6 * eg) * Delta_o
    cfseDelta = Number((-0.4 * t2g + 0.6 * eg).toFixed(2)) || 0;
  } else if (geometry === 'TETRAHEDRAL') {
    // In T_d: e is lower (-0.6), t2 is higher (+0.4)
    // Always high-spin
    if (d <= 2) {
      eg = d; t2g = 0; unpaired = d; // using eg for e, t2g for t2
    } else if (d <= 5) {
      eg = 2; t2g = d - 2; unpaired = d;
    } else if (d <= 7) {
      eg = 2 + (d - 5); t2g = 3; unpaired = 10 - d;
    } else {
      eg = 4; t2g = d - 4; unpaired = 10 - d;
    }
    cfseDelta = Number((-0.6 * eg + 0.4 * t2g).toFixed(2)) || 0;
  } else if (geometry === 'SQUARE_PLANAR') {
    // For d^8 square planar (e.g. [Ni(CN)4]2-):
    if (d === 8) {
      unpaired = 0; // Diamagnetic
      cfseDelta = -1.74;
    } else {
      unpaired = d % 2;
      cfseDelta = -1.0;
    }
  }

  const cfseKj = Number((Math.abs(cfseDelta) * deltaKjPerMol).toFixed(1));

  // Magnetic properties
  const magneticBehavior: MagneticBehavior = unpaired > 0 ? 'PARAMAGNETIC' : 'DIAMAGNETIC';
  // Spin-only formula: mu = sqrt(n*(n+2))
  const muEff = Number(Math.sqrt(unpaired * (unpaired + 2)).toFixed(2));

  // d-d absorption wavelength: lambda (nm) = 10^7 / delta (cm^-1)
  const wavelengthNm = deltaCmInv > 0 ? Math.round(10000000 / deltaCmInv) : 0;
  const colorInfo = getComplementaryColor(wavelengthNm);

  // Jahn-Teller assessment
  let jtType: JahnTellerDistortionType = 'NONE';
  let jtExp = 'Cấu hình điện tử có mật độ phân bố đối xứng, không có hiệu ứng Jahn-Teller.';

  if (geometry === 'OCTAHEDRAL') {
    if (d === 9) {
      jtType = 'STRONG_ELONGATION';
      jtExp = 'Hệ d⁹ (eg³): Hiệu ứng Jahn-Teller gây biến dạng kéo dài hai trục liên kết dọc trục z (tetragonal elongation) do 3 electron ở eg bất đối xứng, loại bỏ hoàn toàn suy biến năng lượng.';
    } else if (d === 4 && spinState === 'HIGH_SPIN') {
      jtType = 'STRONG_ELONGATION';
      jtExp = 'Hệ d⁴ Spin cao (t2g³ eg¹): Phân lớp eg chỉ có 1 electron đơn độc, gây hiệu ứng Jahn-Teller mạnh mẽ kéo dài trục z.';
    } else if (d === 7 && spinState === 'LOW_SPIN') {
      jtType = 'STRONG_ELONGATION';
      jtExp = 'Hệ d⁷ Spin thấp (t2g⁶ eg¹): Phân lớp eg chỉ có 1 electron đơn độc, gây biến dạng Jahn-Teller mạnh.';
    } else if ((t2g % 3 !== 0 && t2g > 0) && eg % 2 === 0) {
      jtType = 'WEAK';
      jtExp = 'Mật độ electron t2g không đối xứng nhưng orbital t2g không hướng thẳng vào phối tử nên hiệu ứng biến dạng Jahn-Teller chỉ ở mức rất yếu.';
    }
  }

  // Complex formula & naming
  let compFormula = `[${metal.symbol.replace(/[0-9+]/g, '')}(${ligand.formula})${coordNumber}]`;
  const netCharge = metal.oxidationState + coordNumber * ligand.charge;
  if (netCharge > 0) compFormula += `${netCharge}+`;
  else if (netCharge < 0) compFormula += `${Math.abs(netCharge)}-`;

  const complexName = `Phức ${geometry === 'OCTAHEDRAL' ? 'bát diện' : geometry === 'TETRAHEDRAL' ? 'tứ diện' : 'vuông phẳng'} ${metal.nameVI} với phối tử ${ligand.nameVI}`;

  const insight = `${compFormula} có cấu hình ${geometry === 'OCTAHEDRAL' ? `t2g^${t2g} eg^${eg}` : `e^${eg} t2^${t2g}`}, ${
    unpaired === 0
      ? 'nghịch từ (diamagnetic, μ = 0 BM)'
      : `thuận từ (paramagnetic, n = ${unpaired} electron độc thân, μ = ${muEff} BM)`
  }. Năng lượng tách trường tinh thể Δ = ${deltaCmInv} cm⁻¹ (${deltaKjPerMol} kJ/mol), hấp thụ photon bước sóng ${wavelengthNm} nm (${colorInfo.absorbedColorVI}) tạo ra màu dung dịch ${colorInfo.transmittedColorVI}.`;

  return {
    metal,
    ligand,
    geometry,
    coordinationNumber: coordNumber,
    complexFormula: compFormula,
    complexNameVI: complexName,
    dElectronCount: d,
    deltaEnergyCmInv: Math.round(deltaCmInv),
    deltaEnergyKjPerMol: deltaKjPerMol,
    pairingEnergyCmInv: P,
    spinState,
    hasHighLowSpinChoice: hasChoice,
    t2gElectrons: t2g,
    egElectrons: eg,
    unpairedElectronsCount: unpaired,
    magneticBehavior,
    spinOnlyMagneticMomentBM: muEff,
    cfseDeltaUnits: cfseDelta,
    cfseKjPerMol: cfseKj,
    absorptionWavelengthNm: wavelengthNm,
    absorbedColorNameVI: colorInfo.absorbedColorVI,
    transmittedComplementaryColorHex: colorInfo.transmittedHex,
    transmittedComplementaryColorNameVI: colorInfo.transmittedColorVI,
    jahnTellerType: jtType,
    jahnTellerExplanationVI: jtExp,
    pedagogicalInsightVI: insight,
  };
}

// ----------------------------------------------------------------------------
// CARD MATCHING FOR TRANSITION METAL COORDINATION COMPLEXES
// ----------------------------------------------------------------------------

export function getMatchingCoordinationCard(card: { id?: string; name?: string }): {
  metal: MetalCationSpec;
  ligand: LigandSpec;
} | null {
  if (!card) return null;
  const nameLower = (card.name || '').toLowerCase();
  const idLower = (card.id || '').toLowerCase();

  // Check matching complexes
  if (nameLower.includes('cu') || nameLower.includes('đồng') || idLower.includes('cu')) {
    if (nameLower.includes('amoniac') || nameLower.includes('nh3')) {
      return { metal: TRANSITION_METAL_CATIONS.cu2, ligand: SPECTROCHEMICAL_LIGANDS.ammonia };
    }
    return { metal: TRANSITION_METAL_CATIONS.cu2, ligand: SPECTROCHEMICAL_LIGANDS.water };
  }

  if (nameLower.includes('fe') || nameLower.includes('sắt') || idLower.includes('fe')) {
    if (nameLower.includes('xianua') || nameLower.includes('cn')) {
      return { metal: TRANSITION_METAL_CATIONS.fe2, ligand: SPECTROCHEMICAL_LIGANDS.cyanide };
    }
    return { metal: TRANSITION_METAL_CATIONS.fe2, ligand: SPECTROCHEMICAL_LIGANDS.water };
  }

  if (nameLower.includes('co') || nameLower.includes('coban') || idLower.includes('co')) {
    if (nameLower.includes('cl') || nameLower.includes('clorua')) {
      return { metal: TRANSITION_METAL_CATIONS.co2, ligand: SPECTROCHEMICAL_LIGANDS.chloride };
    }
    return { metal: TRANSITION_METAL_CATIONS.co3, ligand: SPECTROCHEMICAL_LIGANDS.ammonia };
  }

  if (nameLower.includes('ni') || nameLower.includes('niken') || idLower.includes('ni')) {
    return { metal: TRANSITION_METAL_CATIONS.ni2, ligand: SPECTROCHEMICAL_LIGANDS.water };
  }

  if (nameLower.includes('titan') || nameLower.includes('ti')) {
    return { metal: TRANSITION_METAL_CATIONS.ti3, ligand: SPECTROCHEMICAL_LIGANDS.water };
  }

  return null;
}
