// src/domain/electronMicroscopyEngine.ts
// Milestone 52: Scanning Electron Microscopy (SEM), Transmission Electron Microscopy (TEM) & De Broglie Wavelength Engine
// Standards: Nobel Prize in Physics 1929 (Louis de Broglie) & Nobel Prize in Physics 1986 (Ernst Ruska)
// Curriculum: Vietnam GDPT 2018 (Vật lí 12 Chuyên đề: Sóng de Broglie, Kính hiển vi điện tử; Hóa học 12 Chuyên đề: Vật liệu Nano Carbon & Graphene)

export type MicroscopeMode = 'SEM_SE' | 'SEM_BSE' | 'TEM_BF' | 'TEM_HRTEM';

export interface NanomaterialSpecimen {
  id: string;
  name: string;
  nameVI: string;
  chemicalFormula: string;
  materialClassVI: string;
  typicalFeatureSizeNm: number;
  latticeSpacingNm?: number; // e.g. 0.34 nm for graphite (002), 0.235 nm for Au (111)
  recommendedVoltageKv: number;
  atomicNumberZ: number; // for BSE contrast
  descriptionVI: string;
  colorHex: string;
}

export interface ElectronMicroscopyResult {
  specimen: NanomaterialSpecimen;
  mode: MicroscopeMode;
  acceleratingVoltageKv: number; // e.g. 5 to 300 kV
  magnification: number; // e.g. 10,000x to 1,000,000x

  // Relativistic De Broglie Wavelength & Optics
  electronWavelengthPicometers: number; // pm (10^-12 m)
  electronWavelengthAngstrom: number; // Å (10^-10 m)
  electronVelocityFractionOfC: number; // v / c
  theoreticalAbbeResolutionNm: number;
  scherzerResolutionAngstrom: number;

  // Signal & Contrast Characteristics
  signalTypeVI: string;
  contrastMechanismVI: string;
  interactionDepthMicrons: number; // Monte Carlo tear-drop penetration depth

  // Comparison with Optical Microscope
  wavelengthRatioVsGreenLight: number; // ~ 550 nm / lambda
  resolutionAdvantageFold: number; // ~ 200 nm / d_electron

  pedagogicalAnalysisVI: string;
}

// ----------------------------------------------------------------------------
// CONSTANTS (CODATA 2018 / SI 2019 EXACT)
// ----------------------------------------------------------------------------
export const PLANCK_CONSTANT_H = 6.62607015e-34; // J·s
export const ELECTRON_MASS_M0 = 9.1093837015e-31; // kg
export const ELEMENTARY_CHARGE_E = 1.602176634e-19; // C
export const SPEED_OF_LIGHT_C = 299792458; // m/s
export const ELECTRON_REST_ENERGY_KEV = 510.99895; // keV (m0 * c^2)
export const GREEN_LIGHT_WAVELENGTH_NM = 550.0; // nm (Standard optical microscope reference)
export const OPTICAL_MICROSCOPE_RESOLUTION_LIMIT_NM = 200.0; // nm (Abbe limit in immersion oil)

// ----------------------------------------------------------------------------
// NANOMATERIAL SPECIMEN CATALOG
// ----------------------------------------------------------------------------
export const NANOMATERIAL_CATALOG: Record<string, NanomaterialSpecimen> = {
  multi_walled_cnt: {
    id: 'multi_walled_cnt',
    name: 'Multi-Walled Carbon Nanotubes (MWCNT)',
    nameVI: 'Ống Nano Carbon Đa Tường (MWCNT - Vật Liệu Thế Hệ Mới)',
    chemicalFormula: 'C (Carbon Nanotubes)',
    materialClassVI: 'Vật liệu lai hóa sp² một chiều (1D Nanomaterial)',
    typicalFeatureSizeNm: 15.0,
    latticeSpacingNm: 0.34, // Interlayer graphitic spacing d_002
    recommendedVoltageKv: 200.0,
    atomicNumberZ: 6, // Carbon Z=6
    descriptionVI: 'Các ống graphene cuộn đồng trục với khoảng cách giữa các lớp tinh thể đúng 0.34 nm, có độ bền kéo cao gấp 100 lần thép và dẫn nhiệt vượt trội hơn kim cương.',
    colorHex: '#38bdf8', // Sky
  },

  gold_nanoparticles_colloid: {
    id: 'gold_nanoparticles_colloid',
    name: 'Colloidal Gold Nanoparticles (Au NPs)',
    nameVI: 'Hạt Nano Vàng 15 nm (Hiệu Ứng Cộng Hưởng Plasmon Bề Mặt & Y Sinh)',
    chemicalFormula: 'Au (Gold Nanocrystals)',
    materialClassVI: 'Kim loại quý kích thước nano (0D Nanomaterial)',
    typicalFeatureSizeNm: 15.0,
    latticeSpacingNm: 0.235, // Au (111) lattice planes
    recommendedVoltageKv: 200.0,
    atomicNumberZ: 79, // Gold Z=79 (Extreme BSE contrast)
    descriptionVI: 'Hạt nano vàng 15 nm có màu đỏ rượu vang do cộng hưởng plasmon bề mặt (SPR). Dưới kính hiển vi TEM phân giải cao HRTEM, từng hàng nguyên tử vàng trong mặt phẳng (111) hiện rõ mồn một.',
    colorHex: '#f59e0b', // Amber
  },

  graphene_monolayer: {
    id: 'graphene_monolayer',
    name: 'Monolayer Graphene Honeycomb Lattice',
    nameVI: 'Graphene Đơn Lớp (Mạng Lục Giác Carbon 2D Siêu Dẫn Nhiệt)',
    chemicalFormula: 'C (Graphene Sheet)',
    materialClassVI: 'Vật liệu phẳng hai chiều (2D Nanomaterial)',
    typicalFeatureSizeNm: 0.142, // C-C bond length in honeycomb
    latticeSpacingNm: 0.246, // Lattice parameter a
    recommendedVoltageKv: 80.0, // Low voltage to avoid knock-on damage
    atomicNumberZ: 6,
    descriptionVI: 'Được trao giải Nobel Vật lý 2010 (Geim & Novoselov). Độ dày đúng 1 lớp nguyên tử carbon 0.335 nm, độ trong suốt 97.7% và độ linh động điện tử kỷ lục 200.000 cm²/(V·s).',
    colorHex: '#10b981', // Emerald
  },

  diatom_silica_frustule: {
    id: 'diatom_silica_frustule',
    name: 'Diatom Frustule Micro-Architecture',
    nameVI: 'Vỏ Silic Tảo Silic (Kiến Trúc Sinh Học Nano Xốp Tự Nhiên)',
    chemicalFormula: 'SiO₂·nH₂O (Hydrated Silica)',
    materialClassVI: 'Vật liệu sinh học micro/nano đa xốp',
    typicalFeatureSizeNm: 250.0,
    recommendedVoltageKv: 15.0,
    atomicNumberZ: 14, // Silicon Z=14
    descriptionVI: 'Vỏ ngoài tuyệt mỹ của vi tảo cát đại dương với hàng triệu lỗ xốp nano lục giác đều đặn, được ứng dụng làm màng lọc nano, cảm biến sinh học và chất mang giải phóng thuốc thông minh.',
    colorHex: '#8b5cf6', // Violet
  },
};

// ----------------------------------------------------------------------------
// RELATIVISTIC DE BROGLIE ELECTRON OPTICS ENGINE
// ----------------------------------------------------------------------------

/**
 * Calculates relativistic de Broglie wavelength:
 * lambda = h / sqrt(2 * m0 * e * V0 * (1 + (e * V0) / (2 * m0 * c^2)))
 */
export function calculateRelativisticDeBroglieWavelength(voltageKv: number): {
  wavelengthPm: number;
  wavelengthAngstrom: number;
  velocityFractionOfC: number;
} {
  const vVolts = Math.max(100.0, voltageKv * 1000.0);
  const eV = ELEMENTARY_CHARGE_E * vVolts;
  const restEnergy = ELECTRON_MASS_M0 * Math.pow(SPEED_OF_LIGHT_C, 2);

  // Relativistic correction factor (1 + eV / (2 * m0 * c^2))
  const relFactor = 1.0 + eV / (2.0 * restEnergy);
  const momentum = Math.sqrt(2.0 * ELECTRON_MASS_M0 * eV * relFactor);
  const lambdaMeters = PLANCK_CONSTANT_H / momentum;

  // Velocity v/c: gamma = 1 + eV / restEnergy; v/c = sqrt(1 - 1/gamma^2)
  const gamma = 1.0 + eV / restEnergy;
  const vFraction = Math.sqrt(1.0 - 1.0 / Math.pow(gamma, 2));

  const lambdaPm = Number((lambdaMeters * 1e12).toFixed(3));
  const lambdaAngstrom = Number((lambdaMeters * 1e10).toFixed(4));

  return {
    wavelengthPm: lambdaPm,
    wavelengthAngstrom: lambdaAngstrom,
    velocityFractionOfC: Number(vFraction.toFixed(3)),
  };
}

/**
 * Simulates electron beam resolution, penetration depth, and image formation
 */
export function simulateElectronMicroscopy(
  specimenId: string,
  microscopeMode: MicroscopeMode = 'TEM_HRTEM',
  voltageKv = 200.0,
  magnification = 250000
): ElectronMicroscopyResult {
  const specimen = NANOMATERIAL_CATALOG[specimenId] || NANOMATERIAL_CATALOG.multi_walled_cnt;
  const vKv = Math.max(1.0, Math.min(300.0, voltageKv));

  // 1. Relativistic de Broglie Wavelength
  const wave = calculateRelativisticDeBroglieWavelength(vKv);

  // 2. Resolution Limits
  // Abbe diffraction limit: d = 0.61 * lambda / alpha (aperture angle alpha ~ 10 mrad = 0.01 rad)
  const alphaRad = 0.01;
  const abbeResNm = Number(((0.61 * (wave.wavelengthPm / 1000.0)) / alphaRad).toFixed(3));

  // Scherzer resolution in HRTEM with spherical aberration Cs ~ 0.5 mm = 5e5 nm
  // d_Scherzer = 0.43 * Cs^(1/4) * lambda^(3/4)
  const csNm = 5e5;
  const lambdaNm = wave.wavelengthPm / 1000.0;
  const scherzerAngstrom = Number((0.43 * Math.pow(csNm, 0.25) * Math.pow(lambdaNm, 0.75) * 10.0).toFixed(2));

  // 3. Kanter-Kanaya Range (Electron penetration / interaction volume depth in microns)
  // R_K = (0.0276 * A / (Z^0.89 * rho)) * E0^1.67
  // Typical depth at 20 kV in carbon ~ 2.5 microns, at 5 kV ~ 0.3 microns
  const interactionDepth = Number((0.025 * Math.pow(vKv, 1.5) / Math.pow(specimen.atomicNumberZ, 0.5)).toFixed(2));

  // 4. Comparison Ratios
  const wavelengthRatio = Number(((GREEN_LIGHT_WAVELENGTH_NM * 1000.0) / wave.wavelengthPm).toFixed(0));
  const resolutionAdvantage = Number(((OPTICAL_MICROSCOPE_RESOLUTION_LIMIT_NM / (wave.wavelengthPm / 1000.0))).toFixed(0));

  // 5. Signal & Contrast Definitions
  let sigType = '';
  let contrastMech = '';
  if (microscopeMode === 'SEM_SE') {
    sigType = 'Electron thứ cấp SE (Secondary Electrons, E < 50 eV)';
    contrastMech = 'Độ dốc địa hình bề mặt (Topographic contrast) và hiệu ứng biên (Edge effect)';
  } else if (microscopeMode === 'SEM_BSE') {
    sigType = 'Electron tán xạ ngược BSE (Backscattered Electrons, E > 50 eV)';
    contrastMech = `Độ tương phản số hiệu nguyên tử (Z-contrast ~ Z²). Nguyên tố ${specimen.chemicalFormula} (Z=${specimen.atomicNumberZ}) phát xạ mạnh.`;
  } else if (microscopeMode === 'TEM_BF') {
    sigType = 'Electron truyền qua trường sáng (Bright Field TEM)';
    contrastMech = 'Độ tương phản khối lượng - độ dày (Mass-thickness) và nhiễu xạ mạng tinh thể';
  } else {
    sigType = 'Giao thoa pha điện tử phân giải cao (High-Resolution TEM / HRTEM)';
    contrastMech = `Vân giao thoa pha mạng tinh thể (Lattice fringes, d = ${specimen.latticeSpacingNm || 0.34} nm)`;
  }

  // 6. Pedagogical Summary
  let summary = `Kính hiển vi điện tử (${microscopeMode.startsWith('SEM') ? 'SEM quét bề mặt' : 'TEM truyền qua'}) phân tích mẫu ${specimen.nameVI}. `;
  summary += `Tại thế gia tốc U = ${vKv} kV, electron chuyển động tương đối tính với vận tốc v = ${(wave.velocityFractionOfC * 100).toFixed(1)}% tốc độ ánh sáng c. `;
  summary += `Theo hệ thức de Broglie (Nobel Vật lý 1929), bước sóng vật chất của chùm electron co lại chỉ còn λ = ${wave.wavelengthPm} pm (${wave.wavelengthAngstrom} Å), `;
  summary += `ngắn hơn ánh sáng nhìn thấy ${(wavelengthRatio).toLocaleString()} lần. `;
  summary += `Nhờ đó, giới hạn nhiễu xạ Abbe bị phá vỡ hoàn toàn, độ phân giải lý thuyết đạt ${scherzerAngstrom} Å, `;
  summary += `cho phép phóng đại ${magnification.toLocaleString()} lần và chụp rõ từng hàng nguyên tử trong mạng tinh thể.`;

  return {
    specimen,
    mode: microscopeMode,
    acceleratingVoltageKv: vKv,
    magnification,
    electronWavelengthPicometers: wave.wavelengthPm,
    electronWavelengthAngstrom: wave.wavelengthAngstrom,
    electronVelocityFractionOfC: wave.velocityFractionOfC,
    theoreticalAbbeResolutionNm: abbeResNm,
    scherzerResolutionAngstrom: scherzerAngstrom,
    signalTypeVI: sigType,
    contrastMechanismVI: contrastMech,
    interactionDepthMicrons: interactionDepth,
    wavelengthRatioVsGreenLight: wavelengthRatio,
    resolutionAdvantageFold: resolutionAdvantage,
    pedagogicalAnalysisVI: summary,
  };
}

// ----------------------------------------------------------------------------
// CARD MATCHING SERVICE FOR ELECTRON MICROSCOPY & NANOTECHNOLOGY
// ----------------------------------------------------------------------------

export function getMatchingMicroscopyCard(card: { id?: string; name?: string; description?: string }): NanomaterialSpecimen | null {
  if (!card) return null;
  const nameLower = (card.name || '').toLowerCase();
  const idLower = (card.id || '').toLowerCase();
  const descLower = (card.description || '').toLowerCase();

  for (const s of Object.values(NANOMATERIAL_CATALOG)) {
    if (idLower.includes(s.id) || idLower.includes(s.chemicalFormula.toLowerCase())) {
      return s;
    }
  }

  // Keywords
  if (nameLower.includes('cnt') || nameLower.includes('nanotube') || nameLower.includes('ống nano') || idLower.includes('cnt')) {
    return NANOMATERIAL_CATALOG.multi_walled_cnt;
  }
  if (nameLower.includes('vàng') || nameLower.includes('gold') || nameLower.includes('au') || nameLower.includes('colloid')) {
    return NANOMATERIAL_CATALOG.gold_nanoparticles_colloid;
  }
  if (nameLower.includes('graphene') || nameLower.includes('than chì 2d') || nameLower.includes('đơn lớp')) {
    return NANOMATERIAL_CATALOG.graphene_monolayer;
  }
  if (nameLower.includes('diatom') || nameLower.includes('tảo silic') || nameLower.includes('frustule') || nameLower.includes('vỏ')) {
    return NANOMATERIAL_CATALOG.diatom_silica_frustule;
  }
  if (nameLower.includes('sem') || nameLower.includes('tem') || nameLower.includes('hiển vi điện tử') || nameLower.includes('nano') || descLower.includes('sem')) {
    return NANOMATERIAL_CATALOG.multi_walled_cnt;
  }

  return null;
}
