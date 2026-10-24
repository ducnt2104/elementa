// src/domain/quantumDotsEngine.ts
// Domain Engine: Quantum Dots, Quantum Confinement, Brus Equation & QLED Nanotechnology
// Standards: Nobel Prize in Chemistry 2023 (Bawendi, Brus, Ekimov), IUPAC & Vietnam GDPT 2018 (Chuyên đề Vật liệu Nano)

export interface QuantumDotMaterial {
  id: string;
  chemicalFormula: string;
  nameVi: string;
  bulkBandgapEv: number; // Eg,bulk in eV
  effectiveElectronMass: number; // m_e* in units of m0
  effectiveHoleMass: number; // m_h* in units of m0
  relativePermittivity: number; // dielectric constant epsilon_r
  excitonBohrRadiusNm: number; // a_B in nm
  rohsCompliant: boolean; // Eco-friendly / EU RoHS certified (Cd-free)
  industrialApplicationVi: string;
  synthesisPrecursorsVi: string;
}

export interface BrusSimulationResult {
  material: QuantumDotMaterial;
  radiusNm: number; // Particle radius in nm
  diameterNm: number;
  bulkBandgapEv: number;
  confinementEnergyEv: number; // ~ 1/R^2 term
  coulombEnergyEv: number; // ~ 1/R term
  effectiveBandgapEv: number; // Eg(R) in eV
  emissionWavelengthNm: number; // lambda in nm
  emissionColorHex: string; // RGB hex color of emitted fluorescence
  colorNameVi: string;
  confinementRegime: 'STRONG_CONFINEMENT' | 'INTERMEDIATE' | 'WEAK_CONFINEMENT';
  plqyPercent: number; // Photoluminescence quantum yield %
  qledDisplayUtilityVi: string;
}

export interface CoreShellBandAlignment {
  coreMaterial: string;
  shellMaterial: string;
  alignmentType: 'TYPE_I' | 'TYPE_II' | 'REVERSE_TYPE_I';
  conductionBandOffsetEv: number;
  valenceBandOffsetEv: number;
  passivationEfficiencyPercent: number;
  explanationVi: string;
}

// ---------------------------------------------------------------------------
// 1. QUANTUM DOT MATERIALS CATALOG
// ---------------------------------------------------------------------------

export const QUANTUM_DOT_CATALOG: Record<string, QuantumDotMaterial> = {
  CDSE: {
    id: 'CDSE',
    chemicalFormula: 'CdSe',
    nameVi: 'Cadmi Selenua (Hạt chuẩn mô hình Brus 1984)',
    bulkBandgapEv: 1.74,
    effectiveElectronMass: 0.13,
    effectiveHoleMass: 0.45,
    relativePermittivity: 9.3,
    excitonBohrRadiusNm: 5.6,
    rohsCompliant: false, // Contains toxic Cd
    industrialApplicationVi: 'Tiêu chuẩn vàng trong nghiên cứu quang lý đại học; đánh dấu huỳnh quang sinh học in vitro.',
    synthesisPrecursorsVi: 'CdO + Axit oleic + TOPSe (Tri-n-octylphosphine selenide) ở 300°C.'
  },
  INP: {
    id: 'INP',
    chemicalFormula: 'InP / ZnS',
    nameVi: 'Indi Photphua Vỏ Bọc Kẽm Sulfide (QLED Thương Mại Không Chì/Cadmi)',
    bulkBandgapEv: 1.35,
    effectiveElectronMass: 0.08,
    effectiveHoleMass: 0.60,
    relativePermittivity: 12.4,
    excitonBohrRadiusNm: 10.2,
    rohsCompliant: true, // Non-toxic, RoHS compliant
    industrialApplicationVi: 'Màn hình TV QLED thương mại thế hệ mới (Samsung, LG), dải màu siêu rộng DCI-P3 > 98%.',
    synthesisPrecursorsVi: 'In(AcO)₃ + Tris(trimethylsilyl)phosphine + Vỏ bọc Zn(stearate)₂.'
  },
  CSPBBR3: {
    id: 'CSPBBR3',
    chemicalFormula: 'CsPbBr₃',
    nameVi: 'Perovskite Chì Halide (Phát Xạ Độ Tinh Khiết Cao FWHM < 20 nm)',
    bulkBandgapEv: 2.35,
    effectiveElectronMass: 0.15,
    effectiveHoleMass: 0.14,
    relativePermittivity: 15.0,
    excitonBohrRadiusNm: 7.0,
    rohsCompliant: false,
    industrialApplicationVi: 'Laser chấm lượng tử và diode phát quang siêu sáng (PLQY > 95%), pin mặt trời nano.',
    synthesisPrecursorsVi: 'Cs-oleate + PbBr₂ trong ODE (1-octadecene) ở 170°C.'
  },
  CARBON_DOTS: {
    id: 'CARBON_DOTS',
    chemicalFormula: 'C-dots',
    nameVi: 'Chấm Lượng Tử Carbon Sinh Học (Tổng Hợp Từ Vỏ Trấu / Bã Mía Việt Nam)',
    bulkBandgapEv: 2.10,
    effectiveElectronMass: 0.20,
    effectiveHoleMass: 0.50,
    relativePermittivity: 6.0,
    excitonBohrRadiusNm: 3.5,
    rohsCompliant: true,
    industrialApplicationVi: 'Chẩn đoán y sinh in vivo, dẫn truyền thuốc kháng ung thư, cảm biến phát hiện kim loại nặng trong nước thải.',
    synthesisPrecursorsVi: 'Thủy nhiệt xanh từ sinh khối nông nghiệp (vỏ trấu, bã mía) + Axit citric ở 200°C.'
  }
};

// ---------------------------------------------------------------------------
// 2. BRUS EQUATION ENGINE (QUANTUM CONFINEMENT MODEL)
// ---------------------------------------------------------------------------
// Brus Equation (1984):
// E_g(R) = E_g,bulk + [ (hbar^2 * pi^2) / (2 * R^2) * (1/m_e* + 1/m_h*) ] - [ (1.786 * e^2) / (4 * pi * eps_0 * eps_r * R) ]

const HBAR = 1.054571817e-34; // J.s
const M0 = 9.1093837e-31; // kg (free electron mass)
const E_CHARGE = 1.602176634e-19; // C
const EPSILON_0 = 8.8541878128e-12; // F/m
const SPEED_OF_LIGHT = 299792458; // m/s
const PLANCK_H = 6.62607015e-34; // J.s

/**
 * Calculates effective bandgap and emission wavelength for a Quantum Dot using Brus Equation
 */
export function calculateBrusBandgap(
  materialId: string,
  radiusNm: number // Particle radius in nm (typically 1.0 to 6.0 nm)
): BrusSimulationResult {
  const material = QUANTUM_DOT_CATALOG[materialId] || QUANTUM_DOT_CATALOG.CDSE;
  const radiusMeters = Math.max(0.8e-9, Math.min(10e-9, radiusNm * 1e-9));

  // Reduced effective mass: 1/mu = 1/m_e* + 1/m_h*
  const invMu = (1 / material.effectiveElectronMass + 1 / material.effectiveHoleMass) / M0;

  // Kinetic Confinement Term (Joule -> eV)
  // E_conf = (hbar^2 * pi^2) / (2 * R^2) * (1/mu)
  const confJoules = (Math.pow(HBAR, 2) * Math.pow(Math.PI, 2) * invMu) / (2 * Math.pow(radiusMeters, 2));
  const confinementEnergyEv = confJoules / E_CHARGE;

  // Coulomb Attraction Term (Joule -> eV)
  // E_coul = (1.786 * e^2) / (4 * pi * eps_0 * eps_r * R)
  const coulJoules = (1.786 * Math.pow(E_CHARGE, 2)) / (4 * Math.PI * EPSILON_0 * material.relativePermittivity * radiusMeters);
  const coulombEnergyEv = coulJoules / E_CHARGE;

  // Effective Bandgap
  const effectiveBandgapEv = +(material.bulkBandgapEv + confinementEnergyEv - coulombEnergyEv).toFixed(3);

  // Emission wavelength: lambda = (h * c) / E_g
  // lambda (nm) = 1239.84 / E_g (eV)
  const emissionWavelengthNm = Math.round(1239.84 / effectiveBandgapEv);

  // Confinement regime based on Exciton Bohr Radius a_B
  let confinementRegime: BrusSimulationResult['confinementRegime'] = 'STRONG_CONFINEMENT';
  if (radiusNm > 2 * material.excitonBohrRadiusNm) {
    confinementRegime = 'WEAK_CONFINEMENT';
  } else if (radiusNm > material.excitonBohrRadiusNm) {
    confinementRegime = 'INTERMEDIATE';
  }

  // Wavelength to RGB color
  const { hex, nameVi } = wavelengthToColor(emissionWavelengthNm);

  // Core passivation PLQY: typically 75 - 95% depending on radius
  const plqyPercent = Math.min(95, Math.max(40, 92 - Math.abs(radiusNm - 2.8) * 6));

  const qledDisplayUtilityVi = material.rohsCompliant
    ? `Đạt tiêu chuẩn bảo vệ môi trường EU RoHS (Không chứa Cadmi / Chì). Bước sóng phát xạ ${emissionWavelengthNm} nm lý tưởng cho phân đoạn màu màn hình TV QLED.`
    : `Hiệu suất phát quang cực cao, nhưng chứa kim loại nặng (Cd/Pb). Cần công nghệ đóng gói kín (hermetic encapsulation) chống rò rỉ.`;

  return {
    material,
    radiusNm,
    diameterNm: +(radiusNm * 2).toFixed(2),
    bulkBandgapEv: material.bulkBandgapEv,
    confinementEnergyEv: +confinementEnergyEv.toFixed(3),
    coulombEnergyEv: +coulombEnergyEv.toFixed(3),
    effectiveBandgapEv,
    emissionWavelengthNm,
    emissionColorHex: hex,
    colorNameVi: nameVi,
    confinementRegime,
    plqyPercent,
    qledDisplayUtilityVi
  };
}

/**
 * Maps wavelength (nm) to representative RGB color and Vietnamese color name
 */
function wavelengthToColor(wl: number): { hex: string; nameVi: string } {
  if (wl < 440) return { hex: '#7c3aed', nameVi: 'Tím chàm (Violet/Deep Blue)' };
  if (wl < 490) return { hex: '#0284c7', nameVi: 'Xanh dương thuần khiết (Pure Blue)' };
  if (wl < 510) return { hex: '#06b6d4', nameVi: 'Xanh lục lam (Cyan)' };
  if (wl < 560) return { hex: '#10b981', nameVi: 'Xanh lá lục (Vibrant Green)' };
  if (wl < 590) return { hex: '#eab308', nameVi: 'Vàng rực (Golden Yellow)' };
  if (wl < 620) return { hex: '#f97316', nameVi: 'Cam tươi (Vivid Orange)' };
  if (wl < 750) return { hex: '#ef4444', nameVi: 'Đỏ thẫm (Deep Red)' };
  return { hex: '#881337', nameVi: 'Hồng ngoại gần (Near-Infrared NIR)' };
}

// ---------------------------------------------------------------------------
// 3. CORE-SHELL HETEROSTRUCTURE & TYPE-I BAND ALIGNMENT
// ---------------------------------------------------------------------------

export const CORE_SHELL_PROFILES: CoreShellBandAlignment[] = [
  {
    coreMaterial: 'CdSe',
    shellMaterial: 'ZnS',
    alignmentType: 'TYPE_I',
    conductionBandOffsetEv: 0.95,
    valenceBandOffsetEv: 0.60,
    passivationEfficiencyPercent: 94,
    explanationVi: 'Cấu trúc Vỏ-Lõi Loại I (Type-I): Cả electron và lỗ trống đều bị giam cầm chặt chẽ trong lõi CdSe bởi hàng rào thế năng ZnS rộng hơn, triệt tiêu bẫy bề mặt và tăng PLQY từ 10% lên > 90%.'
  },
  {
    coreMaterial: 'InP',
    shellMaterial: 'ZnSe / ZnS',
    alignmentType: 'TYPE_I',
    conductionBandOffsetEv: 0.70,
    valenceBandOffsetEv: 0.45,
    passivationEfficiencyPercent: 88,
    explanationVi: 'Lõi InP thân thiện môi trường bọc vỏ đệm ZnSe giúp giảm ứng suất mạng tinh thể (lattice mismatch), nâng cao độ bền quang hóa cho tivi QLED.'
  },
  {
    coreMaterial: 'CdTe',
    shellMaterial: 'CdSe',
    alignmentType: 'TYPE_II',
    conductionBandOffsetEv: -0.30,
    valenceBandOffsetEv: 0.85,
    passivationEfficiencyPercent: 78,
    explanationVi: 'Cấu trúc Loại II (Type-II): Phân tách điện tích không gian — electron nằm ở vỏ CdSe còn lỗ trống nằm ở lõi CdTe, kéo dài thời gian sống của exciton, lý tưởng cho pin mặt trời chấm lượng tử (QDSC).'
  }
];
