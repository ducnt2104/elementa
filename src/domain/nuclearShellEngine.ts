// src/domain/nuclearShellEngine.ts
// Milestone 41: Nuclear Shell Model, Magic Numbers, Binding Energy per Nucleon & Aston Packing Fraction Engine
// Standards: IUPAC Gold Book, CODATA 2018 Recommended Values, Nobel Prize in Physics 1963 (Nuclear Shell Model) & Vietnam GDPT 2018 (Hóa 10 & Vật lí 12: Hạt nhân nguyên tử, Năng lượng liên kết)

// ----------------------------------------------------------------------------
// CODATA 2018 RECOMMENDED PHYSICAL CONSTANTS
// ----------------------------------------------------------------------------
export const ATOMIC_MASS_UNIT_MEV = 931.49410242; // MeV/c^2 per u
export const PROTON_MASS_U = 1.007276466621; // u (rest mass of free proton)
export const NEUTRON_MASS_U = 1.00866491595; // u (rest mass of free neutron)
export const HYDROGEN_1_ATOM_MASS_U = 1.00782503223; // u (1H neutral atom mass: mp + me - EB)
export const ELECTRON_MASS_U = 0.000548579909; // u

// Standard magic numbers for protons (Z) and neutrons (N)
export const MAGIC_NUMBERS = [2, 8, 20, 28, 50, 82, 126] as const;
export const SUPERHEAVY_MAGIC_NUMBERS = [114, 120, 126, 184] as const;

// Bethe-Weizsäcker Semi-Empirical Mass Formula (SEMF) coefficients in MeV
export const SEMF_A_VOLUME = 15.75; // MeV
export const SEMF_A_SURFACE = 17.8; // MeV
export const SEMF_A_COULOMB = 0.711; // MeV
export const SEMF_A_ASYMMETRY = 23.7; // MeV
export const SEMF_A_PAIRING = 11.18; // MeV

export type NuclearMagicStatus = 'DOUBLY_MAGIC' | 'PROTON_MAGIC' | 'NEUTRON_MAGIC' | 'NON_MAGIC';
export type NucleonPairingType = 'EVEN_EVEN' | 'EVEN_ODD' | 'ODD_EVEN' | 'ODD_ODD';

export interface NuclearIsotope {
  id: string;
  name: string;
  nameVI: string;
  symbol: string;
  atomicNumberZ: number; // Protons
  neutronNumberN: number; // Neutrons
  massNumberA: number; // Z + N
  exactMassU: number; // Atomic mass in amu
  bindingEnergyTotalMeV: number; // Experimental total binding energy
  bindingEnergyPerNucleonMeV: number; // B / A
  magicStatus: NuclearMagicStatus;
  pairingType: NucleonPairingType;
  astonPackingFraction: number; // (M - A) / A * 10^4
  halfLifeVI: string;
  isStable: boolean;
  decayModeVI?: string;
  descriptionVI: string;
  colorHex: string;
}

export interface SemfComponents {
  volumeTermMeV: number;
  surfaceTermMeV: number;
  coulombTermMeV: number;
  asymmetryTermMeV: number;
  pairingTermMeV: number;
  totalBindingEnergyMeV: number;
  bindingEnergyPerNucleonMeV: number;
}

export interface NuclearReactionSimulation {
  reactionNameVI: string;
  reactants: { isotope: NuclearIsotope; count: number }[];
  products: { isotope: NuclearIsotope; count: number }[];
  qValueMeV: number;
  isExothermic: boolean;
  energyPerGramJoules: number;
  pedagogicalAnalysisVI: string;
}

// ----------------------------------------------------------------------------
// REFERENCE ISOTOPES CATALOG (BENCHMARK NUCLIDES)
// ----------------------------------------------------------------------------
export const NUCLEAR_ISOTOPES: Record<string, NuclearIsotope> = {
  h1: {
    id: 'h1',
    name: 'Hydrogen-1 (Protium)',
    nameVI: 'Hiđro-1 (Proti)',
    symbol: '1H',
    atomicNumberZ: 1,
    neutronNumberN: 0,
    massNumberA: 1,
    exactMassU: 1.007825,
    bindingEnergyTotalMeV: 0.0,
    bindingEnergyPerNucleonMeV: 0.0,
    magicStatus: 'NON_MAGIC',
    pairingType: 'ODD_EVEN',
    astonPackingFraction: 78.25,
    halfLifeVI: 'Bền vĩnh cửu (ổn định)',
    isStable: true,
    descriptionVI: 'Đơn nhân proton tự do liên kết với 1 electron, không có neutron nên năng lượng liên kết hạt nhân bằng 0.',
    colorHex: '#38bdf8',
  },

  h2: {
    id: 'h2',
    name: 'Hydrogen-2 (Deuterium)',
    nameVI: 'Hiđro-2 (Đơteri D)',
    symbol: '2H',
    atomicNumberZ: 1,
    neutronNumberN: 1,
    massNumberA: 2,
    exactMassU: 2.014102,
    bindingEnergyTotalMeV: 2.224,
    bindingEnergyPerNucleonMeV: 1.112,
    magicStatus: 'NON_MAGIC',
    pairingType: 'ODD_ODD',
    astonPackingFraction: 70.51,
    halfLifeVI: 'Bền (ổn định, 0.015% tự nhiên)',
    isStable: true,
    descriptionVI: 'Hạt nhân deuton gồm 1 proton và 1 neutron liên kết lỏng lẻo (B/A = 1.112 MeV), là nhiên liệu cốt lõi của phản ứng nhiệt hạch.',
    colorHex: '#0284c7',
  },

  h3: {
    id: 'h3',
    name: 'Hydrogen-3 (Tritium)',
    nameVI: 'Hiđro-3 (Triti T)',
    symbol: '3H',
    atomicNumberZ: 1,
    neutronNumberN: 2,
    massNumberA: 3,
    exactMassU: 3.016049,
    bindingEnergyTotalMeV: 8.482,
    bindingEnergyPerNucleonMeV: 2.827,
    magicStatus: 'NEUTRON_MAGIC', // N = 2 is magic!
    pairingType: 'ODD_EVEN',
    astonPackingFraction: 53.50,
    halfLifeVI: '12.32 năm',
    isStable: false,
    decayModeVI: 'Phân rã beta trừ (β-) tạo 3He',
    descriptionVI: 'Chứa số neutron ma thuật N = 2. Phản ứng D-T giải phóng năng lượng khổng lồ 17.59 MeV.',
    colorHex: '#0ea5e9',
  },

  he4: {
    id: 'he4',
    name: 'Helium-4 (Alpha Particle)',
    nameVI: 'Heli-4 (Hạt Alpha)',
    symbol: '4He',
    atomicNumberZ: 2,
    neutronNumberN: 2,
    massNumberA: 4,
    exactMassU: 4.002603,
    bindingEnergyTotalMeV: 28.296,
    bindingEnergyPerNucleonMeV: 7.074,
    magicStatus: 'DOUBLY_MAGIC', // Z=2, N=2
    pairingType: 'EVEN_EVEN',
    astonPackingFraction: 6.51,
    halfLifeVI: 'Bền vĩnh cửu (chiếm 99.999% Heli)',
    isStable: true,
    descriptionVI: 'Hạt nhân ma thuật kép (Z = 2, N = 2), cấu trúc phân lớp vỏ đóng kín hoàn hảo, năng lượng liên kết vọt lên 7.07 MeV/nucleon.',
    colorHex: '#facc15',
  },

  c12: {
    id: 'c12',
    name: 'Carbon-12',
    nameVI: 'Cacbon-12',
    symbol: '12C',
    atomicNumberZ: 6,
    neutronNumberN: 6,
    massNumberA: 12,
    exactMassU: 12.000000,
    bindingEnergyTotalMeV: 92.162,
    bindingEnergyPerNucleonMeV: 7.680,
    magicStatus: 'NON_MAGIC',
    pairingType: 'EVEN_EVEN',
    astonPackingFraction: 0.0,
    halfLifeVI: 'Bền vĩnh cửu (chuẩn khối lượng amu = 12)',
    isStable: true,
    descriptionVI: 'Chuẩn quy ước định nghĩa đơn vị khối lượng nguyên tử amu. Tạo thành từ 3 hạt alpha trong phản ứng sao 3-alpha.',
    colorHex: '#a3e635',
  },

  o16: {
    id: 'o16',
    name: 'Oxygen-16',
    nameVI: 'Oxi-16',
    symbol: '16O',
    atomicNumberZ: 8,
    neutronNumberN: 8,
    massNumberA: 16,
    exactMassU: 15.994915,
    bindingEnergyTotalMeV: 127.619,
    bindingEnergyPerNucleonMeV: 7.976,
    magicStatus: 'DOUBLY_MAGIC', // Z=8, N=8
    pairingType: 'EVEN_EVEN',
    astonPackingFraction: -3.18,
    halfLifeVI: 'Bền vĩnh cửu (chiếm 99.76% Oxi)',
    isStable: true,
    descriptionVI: 'Hạt nhân ma thuật kép (Z = 8, N = 8), vỏ proton và neutron 1p1/2 đều đã lấp đầy hoàn chỉnh, độ phổ biến thiên hà cực cao.',
    colorHex: '#f87171',
  },

  ca40: {
    id: 'ca40',
    name: 'Calcium-40',
    nameVI: 'Canxi-40',
    symbol: '40Ca',
    atomicNumberZ: 20,
    neutronNumberN: 20,
    massNumberA: 40,
    exactMassU: 39.962591,
    bindingEnergyTotalMeV: 342.052,
    bindingEnergyPerNucleonMeV: 8.551,
    magicStatus: 'DOUBLY_MAGIC', // Z=20, N=20
    pairingType: 'EVEN_EVEN',
    astonPackingFraction: -9.35,
    halfLifeVI: 'Bền (chiếm 96.94% Canxi)',
    isStable: true,
    descriptionVI: 'Hạt nhân ma thuật kép đối xứng proton-neutron (Z = 20, N = 20) nặng nhất còn ổn định, lấp đầy phân lớp 1d3/2.',
    colorHex: '#fb923c',
  },

  ca48: {
    id: 'ca48',
    name: 'Calcium-48',
    nameVI: 'Canxi-48',
    symbol: '48Ca',
    atomicNumberZ: 20,
    neutronNumberN: 28,
    massNumberA: 48,
    exactMassU: 47.952534,
    bindingEnergyTotalMeV: 415.991,
    bindingEnergyPerNucleonMeV: 8.666,
    magicStatus: 'DOUBLY_MAGIC', // Z=20, N=28
    pairingType: 'EVEN_EVEN',
    astonPackingFraction: -9.89,
    halfLifeVI: 'Bán rã cực dài 6.4e19 năm (phân rã beta kép)',
    isStable: true,
    descriptionVI: 'Hạt nhân ma thuật kép giàu neutron kỳ diệu (Z = 20, N = 28), viên đạn vàng để tổng hợp các nguyên tố siêu nặng (Oganesson 118, Tennessine 117).',
    colorHex: '#ea580c',
  },

  fe56: {
    id: 'fe56',
    name: 'Iron-56',
    nameVI: 'Sắt-56',
    symbol: '56Fe',
    atomicNumberZ: 26,
    neutronNumberN: 30,
    massNumberA: 56,
    exactMassU: 55.934937,
    bindingEnergyTotalMeV: 492.254,
    bindingEnergyPerNucleonMeV: 8.790,
    magicStatus: 'NON_MAGIC',
    pairingType: 'EVEN_EVEN',
    astonPackingFraction: -11.62,
    halfLifeVI: 'Bền (chiếm 91.75% Sắt)',
    isStable: true,
    descriptionVI: 'Đỉnh cao của năng lượng liên kết hạt nhân trong các phản ứng tổng hợp sao. Sau Fe-56, phản ứng nhiệt hạch trở nên thu nhiệt.',
    colorHex: '#94a3b8',
  },

  ni62: {
    id: 'ni62',
    name: 'Nickel-62',
    nameVI: 'Niken-62',
    symbol: '62Ni',
    atomicNumberZ: 28,
    neutronNumberN: 34,
    massNumberA: 62,
    exactMassU: 61.928345,
    bindingEnergyTotalMeV: 545.281,
    bindingEnergyPerNucleonMeV: 8.7946,
    magicStatus: 'PROTON_MAGIC', // Z=28
    pairingType: 'EVEN_EVEN',
    astonPackingFraction: -11.56,
    halfLifeVI: 'Bền (3.63% tự nhiên)',
    isStable: true,
    descriptionVI: 'Hạt nhân có năng lượng liên kết trên mỗi nucleon (B/A) cao nhất tuyệt đối trong toàn bộ vũ trụ (8.7946 MeV/nucleon). Z = 28 là số ma thuật.',
    colorHex: '#22c55e',
  },

  pb208: {
    id: 'pb208',
    name: 'Lead-208',
    nameVI: 'Chì-208',
    symbol: '208Pb',
    atomicNumberZ: 82,
    neutronNumberN: 126,
    massNumberA: 208,
    exactMassU: 207.976652,
    bindingEnergyTotalMeV: 1636.43,
    bindingEnergyPerNucleonMeV: 7.867,
    magicStatus: 'DOUBLY_MAGIC', // Z=82, N=126
    pairingType: 'EVEN_EVEN',
    astonPackingFraction: -1.12,
    halfLifeVI: 'Bền (chiếm 52.4% Chì tự nhiên)',
    isStable: true,
    descriptionVI: 'Hạt nhân ma thuật kép nặng nhất còn ổn định (Z = 82, N = 126). Điểm dừng cuối cùng của chuỗi phân rã phóng xạ tự nhiên phóng thích từ Urani và Thori.',
    colorHex: '#64748b',
  },

  u235: {
    id: 'u235',
    name: 'Uranium-235',
    nameVI: 'Urani-235',
    symbol: '235U',
    atomicNumberZ: 92,
    neutronNumberN: 143,
    massNumberA: 235,
    exactMassU: 235.043930,
    bindingEnergyTotalMeV: 1783.87,
    bindingEnergyPerNucleonMeV: 7.591,
    magicStatus: 'NON_MAGIC',
    pairingType: 'EVEN_ODD',
    astonPackingFraction: 1.87,
    halfLifeVI: '703.8 triệu năm',
    isStable: false,
    decayModeVI: 'Phân rã alpha & Phân hạch hạt nhân nơtron nhiệt',
    descriptionVI: 'Hạt nhân phân hạch quan trọng nhất lịch sử, bắt nơtron nhiệt tạo 236U kích thích rồi tách đôi giải phóng ~200 MeV.',
    colorHex: '#a855f7',
  },

  u238: {
    id: 'u238',
    name: 'Uranium-238',
    nameVI: 'Urani-238',
    symbol: '238U',
    atomicNumberZ: 92,
    neutronNumberN: 146,
    massNumberA: 238,
    exactMassU: 238.050788,
    bindingEnergyTotalMeV: 1801.69,
    bindingEnergyPerNucleonMeV: 7.570,
    magicStatus: 'NON_MAGIC',
    pairingType: 'EVEN_EVEN',
    astonPackingFraction: 2.13,
    halfLifeVI: '4.468 tỷ năm (bằng tuổi Trái Đất)',
    isStable: false,
    decayModeVI: 'Phân rã alpha khởi đầu chuỗi Urani 4n+2',
    descriptionVI: 'Đồng vị dồi dào nhất của Urani (99.27%), có thể hấp thụ nơtron nhanh để chuyển hóa thành Plutoni-239 trong lò phản ứng tái sinh.',
    colorHex: '#7c3aed',
  },

  fl298: {
    id: 'fl298',
    name: 'Flerovium-298 (Island of Stability)',
    nameVI: 'Flerovi-298 (Đảo Ổn Định)',
    symbol: '298Fl',
    atomicNumberZ: 114,
    neutronNumberN: 184,
    massNumberA: 298,
    exactMassU: 298.196,
    bindingEnergyTotalMeV: 2068.5,
    bindingEnergyPerNucleonMeV: 6.941,
    magicStatus: 'DOUBLY_MAGIC', // Z=114, N=184 (Superheavy magic!)
    pairingType: 'EVEN_EVEN',
    astonPackingFraction: 6.58,
    halfLifeVI: 'Dự đoán: vài ngày đến hàng triệu năm',
    isStable: false,
    decayModeVI: 'Dự đoán: Phân rã alpha rất chậm hoặc tự phân hạch',
    descriptionVI: 'Tâm điểm của Đảo Ổn Định (Island of Stability) dự đoán bởi Glenn Seaborg. Vỏ proton siêu nặng Z = 114 và neutron N = 184 đóng kín.',
    colorHex: '#ec4899',
  },
};

// ----------------------------------------------------------------------------
// MAGIC NUMBER & STABILITY CLASSIFIER
// ----------------------------------------------------------------------------

export function evaluateNuclearMagicStability(Z: number, N: number): {
  magicStatus: NuclearMagicStatus;
  isProtonMagic: boolean;
  isNeutronMagic: boolean;
  descriptionVI: string;
} {
  const isPMagic = (MAGIC_NUMBERS as readonly number[]).includes(Z) || (SUPERHEAVY_MAGIC_NUMBERS as readonly number[]).includes(Z);
  const isNMagic = (MAGIC_NUMBERS as readonly number[]).includes(N) || (SUPERHEAVY_MAGIC_NUMBERS as readonly number[]).includes(N);

  let status: NuclearMagicStatus = 'NON_MAGIC';
  let desc = 'Hạt nhân có lớp vỏ hạt nhân hở (không có số ma thuật).';

  if (isPMagic && isNMagic) {
    status = 'DOUBLY_MAGIC';
    desc = 'HẠT NHÂN MA THUẬT KÉP (DOUBLY MAGIC): Cả hai lớp vỏ Proton và Neutron đều đóng kín hoàn toàn. Năng lượng liên kết đặc biệt cao, độ bền vượt trội.';
  } else if (isPMagic) {
    status = 'PROTON_MAGIC';
    desc = `Lớp vỏ Proton đóng kín (Z = ${Z} là số ma thuật). Bền vững đặc biệt về mặt cấu trúc điện tích hạt nhân.`;
  } else if (isNMagic) {
    status = 'NEUTRON_MAGIC';
    desc = `Lớp vỏ Neutron đóng kín (N = ${N} là số ma thuật). Tiết diện bắt nơtron rất thấp.`;
  }

  return {
    magicStatus: status,
    isProtonMagic: isPMagic,
    isNeutronMagic: isNMagic,
    descriptionVI: desc,
  };
}

// ----------------------------------------------------------------------------
// MASS DEFECT & BINDING ENERGY CALCULATOR
// ----------------------------------------------------------------------------

/**
 * Calculates Mass Defect and Nuclear Binding Energy:
 * Δm = Z·m_p + N·m_n - M_nucleus
 * B = Δm · 931.494 MeV
 * B/A = B / (Z + N)
 */
export function calculateMassDefectAndBindingEnergy(
  atomicNumberZ: number,
  neutronNumberN: number,
  experimentalMassU?: number
): {
  atomicNumberZ: number;
  neutronNumberN: number;
  massNumberA: number;
  unboundNucleonsMassU: number;
  actualMassU: number;
  massDefectU: number;
  bindingEnergyTotalMeV: number;
  bindingEnergyPerNucleonMeV: number;
  astonPackingFraction: number;
} {
  const Z = Math.max(1, atomicNumberZ);
  const N = Math.max(0, neutronNumberN);
  const A = Z + N;

  // Mass of constituent nucleons before binding
  const unboundMassU = Z * HYDROGEN_1_ATOM_MASS_U + N * NEUTRON_MASS_U;

  // If experimental mass is provided, use it; otherwise approximate with Bethe-Weizsäcker
  let actualMass = experimentalMassU;
  if (!actualMass) {
    const semf = calculateSemiEmpiricalMassFormula(Z, A);
    const deltaMFromBE = semf.totalBindingEnergyMeV / ATOMIC_MASS_UNIT_MEV;
    actualMass = unboundMassU - deltaMFromBE;
  }

  const massDefect = Math.max(0, unboundMassU - actualMass);
  const totalBEMeV = massDefect * ATOMIC_MASS_UNIT_MEV;
  const bePerNucleon = A > 0 ? totalBEMeV / A : 0;
  const aston = ((actualMass - A) / A) * 10000;

  return {
    atomicNumberZ: Z,
    neutronNumberN: N,
    massNumberA: A,
    unboundNucleonsMassU: Number(unboundMassU.toFixed(6)),
    actualMassU: Number(actualMass.toFixed(6)),
    massDefectU: Number(massDefect.toFixed(6)),
    bindingEnergyTotalMeV: Number(totalBEMeV.toFixed(3)),
    bindingEnergyPerNucleonMeV: Number(bePerNucleon.toFixed(4)),
    astonPackingFraction: Number(aston.toFixed(2)),
  };
}

// ----------------------------------------------------------------------------
// BETHE-WEIZSÄCKER SEMI-EMPIRICAL MASS FORMULA (SEMF)
// ----------------------------------------------------------------------------

/**
 * Calculates Liquid Drop Model Binding Energy:
 * B(A, Z) = a_v·A - a_s·A^(2/3) - a_c·Z(Z-1)/A^(1/3) - a_a·(A-2Z)^2/A + δ(A, Z)
 */
export function calculateSemiEmpiricalMassFormula(Z: number, A: number): SemfComponents {
  if (A <= 1) {
    return {
      volumeTermMeV: 0,
      surfaceTermMeV: 0,
      coulombTermMeV: 0,
      asymmetryTermMeV: 0,
      pairingTermMeV: 0,
      totalBindingEnergyMeV: 0,
      bindingEnergyPerNucleonMeV: 0,
    };
  }

  const N = A - Z;

  // 1. Volume Term: a_v · A
  const vol = SEMF_A_VOLUME * A;

  // 2. Surface Term: -a_s · A^(2/3)
  const surf = SEMF_A_SURFACE * Math.pow(A, 2 / 3);

  // 3. Coulomb Term: -a_c · Z(Z - 1) / A^(1/3)
  const coul = (SEMF_A_COULOMB * Z * (Z - 1)) / Math.pow(A, 1 / 3);

  // 4. Asymmetry Term: -a_a · (A - 2Z)^2 / A
  const asym = (SEMF_A_ASYMMETRY * Math.pow(A - 2 * Z, 2)) / A;

  // 5. Pairing Term: +δ (even-even), 0 (odd-A), -δ (odd-odd)
  let delta = 0;
  if (Z % 2 === 0 && N % 2 === 0) {
    delta = SEMF_A_PAIRING / Math.sqrt(A); // Even-even: most stable
  } else if (Z % 2 !== 0 && N % 2 !== 0) {
    delta = -SEMF_A_PAIRING / Math.sqrt(A); // Odd-odd: least stable
  }

  const totalBE = Math.max(0, vol - surf - coul - asym + delta);
  const bePerNucleon = totalBE / A;

  return {
    volumeTermMeV: Number(vol.toFixed(2)),
    surfaceTermMeV: Number((-surf).toFixed(2)),
    coulombTermMeV: Number((-coul).toFixed(2)),
    asymmetryTermMeV: Number((-asym).toFixed(2)),
    pairingTermMeV: Number(delta.toFixed(2)),
    totalBindingEnergyMeV: Number(totalBE.toFixed(2)),
    bindingEnergyPerNucleonMeV: Number(bePerNucleon.toFixed(4)),
  };
}

// ----------------------------------------------------------------------------
// NUCLEAR REACTION ENERGETICS (FUSION VS FISSION Q-VALUES)
// ----------------------------------------------------------------------------

export function simulateDTFusionReaction(): NuclearReactionSimulation {
  const h2 = NUCLEAR_ISOTOPES.h2;
  const h3 = NUCLEAR_ISOTOPES.h3;
  const he4 = NUCLEAR_ISOTOPES.he4;

  // 2H + 3H -> 4He + 1n
  const initialMassU = h2.exactMassU + h3.exactMassU;
  const finalMassU = he4.exactMassU + NEUTRON_MASS_U;
  const deltaMU = initialMassU - finalMassU;
  const qValMeV = deltaMU * ATOMIC_MASS_UNIT_MEV; // ~17.59 MeV

  // Energy in Joules per gram of D-T fuel mixture:
  // 1 MeV = 1.602176634e-13 J
  // Molar mass of fuel D+T = 5.03 g/mol
  const energyPerMolJ = qValMeV * 1.60218e-13 * 6.02214e23;
  const energyPerGramJ = energyPerMolJ / 5.03;

  return {
    reactionNameVI: 'Nhiệt hạch Đơteri - Triti (D-T Nuclear Fusion)',
    reactants: [
      { isotope: h2, count: 1 },
      { isotope: h3, count: 1 },
    ],
    products: [{ isotope: he4, count: 1 }],
    qValueMeV: Number(qValMeV.toFixed(3)),
    isExothermic: true,
    energyPerGramJoules: Number(energyPerGramJ.toExponential(3)),
    pedagogicalAnalysisVI:
      'Hai hạt nhân nhẹ (2H và 3H) hợp nhất tạo hạt alpha (4He) ma thuật kép cực bền, giải phóng 17.59 MeV (khoảng 3.37×10^11 J/g, gấp 4 triệu lần đốt than đá).',
  };
}

export function simulateU235FissionReaction(): NuclearReactionSimulation {
  const u235 = NUCLEAR_ISOTOPES.u235;

  // Typical symmetric fission: 235U + 1n -> 141Ba + 92Kr + 3n
  const qValMeV = 200.0; // Standard empirical fission Q-value
  const energyPerGramJ = (qValMeV * 1.60218e-13 * 6.02214e23) / 235.0;

  return {
    reactionNameVI: 'Phân hạch Urani-235 bằng nơtron nhiệt (U-235 Fission)',
    reactants: [{ isotope: u235, count: 1 }],
    products: [],
    qValueMeV: qValMeV,
    isExothermic: true,
    energyPerGramJoules: Number(energyPerGramJ.toExponential(3)),
    pedagogicalAnalysisVI:
      'Hạt nhân nặng U-235 hấp thụ nơtron rồi phân hạch thành 2 mảnh hạt nhân cỡ trung có B/A cao hơn (khoảng 8.5 MeV so với 7.6 MeV), giải phóng khoảng 200 MeV năng lượng trên mỗi phân hạch.',
  };
}

// ----------------------------------------------------------------------------
// CARD MATCHING FOR NUCLEAR ISOTOPES
// ----------------------------------------------------------------------------

export function getMatchingNuclearIsotope(card: { id?: string; name?: string }): NuclearIsotope | null {
  if (!card) return null;
  const nameLower = (card.name || '').toLowerCase();
  const idLower = (card.id || '').toLowerCase();

  for (const iso of Object.values(NUCLEAR_ISOTOPES)) {
    const symLower = iso.symbol.toLowerCase();
    const idS = iso.id.toLowerCase();

    if (idLower === idS || idLower.includes(`_${idS}`) || idLower.includes(`card_${idS}`)) {
      return iso;
    }

    if (nameLower.includes(iso.nameVI.toLowerCase()) || nameLower.includes(iso.name.toLowerCase())) {
      return iso;
    }

    const symRegex = new RegExp(`(^|[^a-zA-Z0-9])${symLower}([^a-zA-Z0-9]|$)`, 'i');
    if (symRegex.test(nameLower) || symRegex.test(idLower)) {
      return iso;
    }
  }

  // Keywords
  if (nameLower.includes('alpha') || nameLower.includes('heli') || nameLower.includes('helium')) {
    return NUCLEAR_ISOTOPES.he4;
  }
  if (nameLower.includes('urani') || nameLower.includes('uranium') || nameLower.includes('phóng xạ')) {
    return NUCLEAR_ISOTOPES.u235;
  }
  if (nameLower.includes('chì') || nameLower.includes('lead')) {
    return NUCLEAR_ISOTOPES.pb208;
  }
  if (nameLower.includes('sắt') || nameLower.includes('iron')) {
    return NUCLEAR_ISOTOPES.fe56;
  }

  return null;
}
