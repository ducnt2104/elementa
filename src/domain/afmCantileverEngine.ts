// src/domain/afmCantileverEngine.ts
// Milestone 54: Atomic Force Microscopy (AFM), Lennard-Jones Force-Distance Spectroscopy & Cantilever Mechanics Engine
// Standards: Nobel Prize in Physics 1986 (Gerd Binnig & Heinrich Rohrer / Christoph Gerber & Calvin Quate - SPM/AFM)
// Curriculum: Vietnam GDPT 2018 (Vật lý 10: Định luật Hooke & Lực đàn hồi; Vật lý 12: Dao động cưỡng bức & Cộng hưởng; Hóa học 10: Lực Van der Waals; Hóa học 12: Tương tác liên phân tử & Y sinh)

export type AfmOperationMode = 'CONTACT_MODE' | 'TAPPING_MODE' | 'NON_CONTACT_MODE';

export interface AfmCantileverSpec {
  id: string;
  name: string;
  nameVI: string;
  materialVI: string;
  springConstantNPerM: number; // k_c (N/m)
  resonantFrequencyKhz: number; // f_0 (kHz)
  lengthMicrons: number; // L (μm)
  widthMicrons: number; // w (μm)
  thicknessMicrons: number; // t (μm)
  tipRadiusNm: number; // R_tip (nm)
  recommendedMode: AfmOperationMode;
  descriptionVI: string;
}

export interface AfmSampleProfile {
  id: string;
  name: string;
  nameVI: string;
  materialClassVI: string;
  youngsModulusGpa: number; // Modulus đàn hồi Young E (GPa)
  adhesionForceNanoNewtons: number; // Lực dính F_adhesion (nN)
  surfaceRoughnessRqNm: number; // Độ nhám bình phương trung bình Rq (nm)
  vanDerWaalsEnergyEpsilonEv: number; // Năng lượng giếng thế Lennard-Jones ε (eV)
  equilibriumDistanceSigmaNm: number; // Khoảng cách cân bằng σ (nm)
  descriptionVI: string;
  colorHex: string;
}

export interface ForceDistancePoint {
  tipSampleDistanceNm: number; // Khoảng cách đầu dò - bề mặt z (nm)
  cantileverDeflectionNm: number; // Độ lệch cần quang học Δz (nm)
  interactionForceNanoNewtons: number; // Lực tương tác F (nN)
  potentialEnergyEv: number; // Thế năng Lennard-Jones V(z) (eV)
  phaseState: 'approach_free' | 'approach_attractive' | 'snap_in' | 'repulsive_contact' | 'retraction_adhesion' | 'pull_off';
}

export interface AfmSimulationResult {
  cantilever: AfmCantileverSpec;
  sample: AfmSampleProfile;
  mode: AfmOperationMode;
  cantileverSpringConstantNPerM: number;
  resonantFrequencyKhz: number;
  snapInDistanceNm: number;
  snapInForceNanoNewtons: number;
  pullOffDistanceNm: number;
  pullOffForceNanoNewtons: number;
  approachCurve: ForceDistancePoint[];
  retractionCurve: ForceDistancePoint[];
  tappingAmplitudeRatio: number; // A / A_0 in tapping mode
  phaseShiftDegrees: number; // Δφ phase shift reflecting viscoelastic dissipation
  pedagogicalAnalysisVI: string;
}

// ============================================================================
// CANTILEVER PROBE CATALOG & SAMPLE PROFILES
// ============================================================================
export const CANTILEVER_CATALOG: Record<string, AfmCantileverSpec> = {
  soft_contact_si3n4: {
    id: 'soft_contact_si3n4',
    name: 'Soft Silicon Nitride Contact Probe (Si₃N₄)',
    nameVI: 'Đầu Dò Silicon Nitride Mềm Dẻo (Đo Mẫu Sinh Học & Polymer)',
    materialVI: 'Silicon Nitride (Si₃N₄) mạ vàng mặt sau phản xạ laser',
    springConstantNPerM: 0.06, // 0.06 N/m siêu mềm để không làm rách tế bào
    resonantFrequencyKhz: 18.0,
    lengthMicrons: 200,
    widthMicrons: 20,
    thicknessMicrons: 0.6,
    tipRadiusNm: 10,
    recommendedMode: 'CONTACT_MODE',
    descriptionVI: 'Cần dầm tam giác Si₃N₄ mềm dẻo với hệ số đàn hồi siêu nhỏ k = 0.06 N/m, lý tưởng cho chế độ Contact đo tế bào sống, DNA và màng polymer mỏng.'
  },

  stiff_tapping_silicon: {
    id: 'stiff_tapping_silicon',
    name: 'Stiff Silicon Tapping Probe (n-doped Si)',
    nameVI: 'Đầu Dò Silicon Cứng Chế Độ Gõ Tapping (AC Mode)',
    materialVI: 'Đơn tinh thể Silicon (100) nguyên khối',
    springConstantNPerM: 42.0, // 42 N/m chống hiện tượng dính nước (capillary snap)
    resonantFrequencyKhz: 320.0,
    lengthMicrons: 125,
    widthMicrons: 30,
    thicknessMicrons: 4.0,
    tipRadiusNm: 7,
    recommendedMode: 'TAPPING_MODE',
    descriptionVI: 'Cần dầm hình chữ nhật bằng silicon cứng (k = 42 N/m, f₀ = 320 kHz), dao động gõ nhẹ nhàng lên bề mặt để loại bỏ hoàn toàn lực cắt ma sát ngang.'
  },

  uhv_noncontact_high_q: {
    id: 'uhv_noncontact_high_q',
    name: 'Ultra-High Vacuum NC-AFM Sensor (qPlus / High-Q)',
    nameVI: 'Cảm Biến Dao Động Chân Không Cao (Non-Contact & qPlus)',
    materialVI: 'Thạch anh áp điện (Quartz Tuning Fork) / Si đơn tinh thể',
    springConstantNPerM: 1800.0, // k = 1800 N/m biên độ picometer
    resonantFrequencyKhz: 28.5,
    lengthMicrons: 2400,
    widthMicrons: 120,
    thicknessMicrons: 200,
    tipRadiusNm: 1.5,
    recommendedMode: 'NON_CONTACT_MODE',
    descriptionVI: 'Cảm biến âm thoa thạch anh qPlus đo trong chân không siêu cao (UHV) với biên độ cực nhỏ (<0.1 nm), đạt độ phân giải dưới nguyên tử (Sub-atomic resolution).'
  }
};

export const AFM_SAMPLE_CATALOG: Record<string, AfmSampleProfile> = {
  dna_double_helix_mica: {
    id: 'dna_double_helix_mica',
    name: 'DNA Double Helix on Mica Substrate',
    nameVI: 'Chuỗi Xoắn Kép DNA Trên Chất Nền Mica (Y Sinh & Di Truyền)',
    materialClassVI: 'Đại phân tử sinh học (Biomolecule)',
    youngsModulusGpa: 0.35, // Rất mềm (350 MPa)
    adhesionForceNanoNewtons: 0.45,
    surfaceRoughnessRqNm: 0.12,
    vanDerWaalsEnergyEpsilonEv: 0.08,
    equilibriumDistanceSigmaNm: 0.34,
    colorHex: '#38bdf8',
    descriptionVI: 'Sợi đôi DNA (đường kính 2.0 nm, bước xoắn 3.4 nm) hấp phụ trên phiến đá mica phẳng nguyên tử nhờ cầu nối ion Mg²⁺. Chế độ Tapping hiển thị rõ từng vòng xoắn mà không đứt gãy mạch.'
  },

  gold_nanocrystals_substrate: {
    id: 'gold_nanocrystals_substrate',
    name: 'Epitaxial Gold Thin Film (Au 111)',
    nameVI: 'Màng Đơn Tinh Thể Vàng Au(111) Bậc Thang Nguyên Tử',
    materialClassVI: 'Kim loại quý dẫn điện cao',
    youngsModulusGpa: 78.0, // Kim loại cứng (78 GPa)
    adhesionForceNanoNewtons: 4.8,
    surfaceRoughnessRqNm: 0.08,
    vanDerWaalsEnergyEpsilonEv: 0.32,
    equilibriumDistanceSigmaNm: 0.28,
    colorHex: '#eab308',
    descriptionVI: 'Bề mặt màng vàng Au(111) với các bậc thềm nguyên tử cao đúng 0.235 nm và cấu trúc tái cấu trúc xương cá (Herringbone reconstruction) trứ danh.'
  },

  graphene_monolayer_sio2: {
    id: 'graphene_monolayer_sio2',
    name: 'Monolayer Graphene on SiO₂',
    nameVI: 'Tấm Graphene Đơn Lớp Trên Nền SiO₂ (Độ Dày 0.335 nm)',
    materialClassVI: 'Vật liệu nano carbon 2 chiều',
    youngsModulusGpa: 1000.0, // Kỷ lục 1 TPa
    adhesionForceNanoNewtons: 2.2,
    surfaceRoughnessRqNm: 0.18,
    vanDerWaalsEnergyEpsilonEv: 0.22,
    equilibriumDistanceSigmaNm: 0.335,
    colorHex: '#10b981',
    descriptionVI: 'Graphene một lớp nguyên tử carbon có độ bền kéo cao nhất thế giới. Đo lực ma sát ma sát biên (Atomic-scale friction) thể hiện tính trơn trượt siêu việt.'
  },

  polymer_blend_ps_pmma: {
    id: 'polymer_blend_ps_pmma',
    name: 'Polystyrene / PMMA Polymer Blend Film',
    nameVI: 'Màng Hỗn Hợp Polymer PS / PMMA (Tương Phản Pha Phase Imaging)',
    materialClassVI: 'Vật liệu polymer cao phân tử pha tách',
    youngsModulusGpa: 3.2,
    adhesionForceNanoNewtons: 3.5,
    surfaceRoughnessRqNm: 1.45,
    vanDerWaalsEnergyEpsilonEv: 0.15,
    equilibriumDistanceSigmaNm: 0.42,
    colorHex: '#ec4899',
    descriptionVI: 'Sự tách pha vi mô giữa vùng Polystyrene (PS) mềm và Polymethyl methacrylate (PMMA) cứng hơn được phân định xuất sắc qua góc lệch pha (Phase shift Δφ) trong chế độ Tapping.'
  }
};

// ============================================================================
// CANILEVER MECHANICS & LENNARD-JONES FORCE CALCULATIONS
// ============================================================================

/**
 * Calculates rectangular cantilever spring constant k_c (Euler-Bernoulli Beam):
 * k_c = (E * w * t^3) / (4 * L^3)
 */
export function calculateCantileverSpringConstant(
  youngsModulusGpa: number,
  widthMicrons: number,
  thicknessMicrons: number,
  lengthMicrons: number
): number {
  const E = youngsModulusGpa * 1e9; // Pa
  const w = widthMicrons * 1e-6; // m
  const t = thicknessMicrons * 1e-6; // m
  const L = lengthMicrons * 1e-6; // m
  const k = (E * w * Math.pow(t, 3)) / (4 * Math.pow(L, 3));
  return Number(k.toFixed(3));
}

/**
 * Calculates Lennard-Jones (12-6) interatomic potential:
 * V(r) = 4 * ε * [ (σ / r)^12 - (σ / r)^6 ]
 */
export function calculateLennardJonesPotential(
  distanceNm: number,
  epsilonEv: number,
  sigmaNm: number
): number {
  const r = Math.max(0.12, distanceNm);
  const ratio = sigmaNm / r;
  const ratio6 = Math.pow(ratio, 6);
  const ratio12 = ratio6 * ratio6;
  const v = 4 * epsilonEv * (ratio12 - ratio6);
  return Number(v.toFixed(3));
}

/**
 * Calculates Lennard-Jones Force:
 * F(r) = - dV/dr = 24 * (ε / σ) * [ 2 * (σ / r)^13 - (σ / r)^7 ]
 * Unit converted to nanoNewtons (nN).
 */
export function calculateLennardJonesForceNanoNewtons(
  distanceNm: number,
  epsilonEv: number,
  sigmaNm: number
): number {
  const r = Math.max(0.15, distanceNm);
  const ratio = sigmaNm / r;
  const ratio7 = Math.pow(ratio, 7);
  const ratio13 = Math.pow(ratio, 13);

  // 1 eV / nm = 0.1602176634 nN
  const forceEvPerNm = 24 * (epsilonEv / sigmaNm) * (2 * ratio13 - ratio7);
  const forceNn = forceEvPerNm * 0.1602176634;
  return Number(forceNn.toFixed(3));
}

/**
 * Simulates complete AFM Force-Distance Approach and Retraction cycle
 */
export function simulateAfmForceCurve(
  cantileverId: string,
  sampleId: string,
  mode: AfmOperationMode = 'CONTACT_MODE'
): AfmSimulationResult {
  const cantilever = CANTILEVER_CATALOG[cantileverId] || CANTILEVER_CATALOG.soft_contact_si3n4;
  const sample = AFM_SAMPLE_CATALOG[sampleId] || AFM_SAMPLE_CATALOG.dna_double_helix_mica;

  const k_c = cantilever.springConstantNPerM;
  const epsilon = sample.vanDerWaalsEnergyEpsilonEv;
  const sigma = sample.equilibriumDistanceSigmaNm;

  // Snap-in occurs when force gradient dF/dz exceeds cantilever spring constant k_c
  // For standard tip-surface van der Waals, snap-in distance is approx 1.15 * sigma
  const snapInDistanceNm = Number((sigma * 1.15).toFixed(2));
  const snapInForceNanoNewtons = Number((-0.85 * sample.adhesionForceNanoNewtons).toFixed(2));

  // Pull-off distance during retraction represents adhesion break
  const pullOffDistanceNm = Number((sigma * 1.65).toFixed(2));
  const pullOffForceNanoNewtons = Number((-sample.adhesionForceNanoNewtons).toFixed(2));

  const numPoints = 80;
  const maxDistanceNm = 4.0;
  const minContactDistanceNm = -0.8; // Indentation into surface

  const approachCurve: ForceDistancePoint[] = [];
  const retractionCurve: ForceDistancePoint[] = [];

  // 1. Approach Phase (Tip moving toward surface)
  for (let i = 0; i < numPoints; i++) {
    const z = maxDistanceNm - (i / (numPoints - 1)) * (maxDistanceNm - minContactDistanceNm);
    let force = 0;
    let deflection = 0;
    let phaseState: ForceDistancePoint['phaseState'] = 'approach_free';

    if (z > snapInDistanceNm) {
      // Long-range van der Waals attractive tail
      force = calculateLennardJonesForceNanoNewtons(z, epsilon, sigma);
      if (force < -0.05) {
        phaseState = 'approach_attractive';
      }
      deflection = force / k_c; // nm
    } else if (z > 0) {
      // Snap-in region
      phaseState = 'snap_in';
      force = snapInForceNanoNewtons;
      deflection = force / k_c;
    } else {
      // Repulsive contact regime (linear Hookean repulsion + sample modulus)
      phaseState = 'repulsive_contact';
      const indentation = -z;
      // Stiffer sample = steeper repulsive slope
      const sampleStiffness = Math.min(2.5, sample.youngsModulusGpa / 50.0);
      force = (indentation * k_c * 8.0 * (1 + sampleStiffness));
      deflection = indentation;
    }

    const potential = calculateLennardJonesPotential(Math.max(0.2, z), epsilon, sigma);
    approachCurve.push({
      tipSampleDistanceNm: Number(z.toFixed(2)),
      cantileverDeflectionNm: Number(deflection.toFixed(2)),
      interactionForceNanoNewtons: Number(force.toFixed(2)),
      potentialEnergyEv: potential,
      phaseState
    });
  }

  // 2. Retraction Phase (Tip pulling back from surface with adhesion hysteresis)
  for (let i = 0; i < numPoints; i++) {
    const z = minContactDistanceNm + (i / (numPoints - 1)) * (maxDistanceNm - minContactDistanceNm);
    let force = 0;
    let deflection = 0;
    let phaseState: ForceDistancePoint['phaseState'] = 'retraction_adhesion';

    if (z <= 0) {
      // Still in repulsive contact while withdrawing
      phaseState = 'repulsive_contact';
      const indentation = -z;
      const sampleStiffness = Math.min(2.5, sample.youngsModulusGpa / 50.0);
      force = (indentation * k_c * 8.0 * (1 + sampleStiffness));
      deflection = indentation;
    } else if (z < pullOffDistanceNm) {
      // Adhesion neck / Meniscus stretching regime
      phaseState = 'retraction_adhesion';
      const stretchFraction = z / pullOffDistanceNm;
      force = pullOffForceNanoNewtons * (1 - stretchFraction * 0.15);
      deflection = force / k_c;
    } else {
      // Rupture / Pull-off jump back to free cantilever position
      phaseState = 'pull_off';
      force = 0;
      deflection = 0;
    }

    const potential = calculateLennardJonesPotential(Math.max(0.2, z), epsilon, sigma);
    retractionCurve.push({
      tipSampleDistanceNm: Number(z.toFixed(2)),
      cantileverDeflectionNm: Number(deflection.toFixed(2)),
      interactionForceNanoNewtons: Number(force.toFixed(2)),
      potentialEnergyEv: potential,
      phaseState
    });
  }

  // Tapping mode phase shift calculation (viscoelastic damping)
  const tappingAmplitudeRatio = mode === 'TAPPING_MODE' ? 0.75 : 1.0;
  const phaseShiftDegrees = Number((15.0 + Math.atan(sample.adhesionForceNanoNewtons / (sample.youngsModulusGpa + 0.1)) * (180 / Math.PI)).toFixed(1));

  // Pedagogical analysis
  const pedagogicalAnalysisVI = `Kính hiển vi lực nguyên tử (AFM) phân tích mẫu ${sample.nameVI} bằng cần dầm ${cantilever.nameVI} (độ cứng k = ${k_c} N/m). Theo định luật thế năng Lennard-Jones (12-6), tương tác chuyển từ lực hút van der Waals ở cự ly xa sang lực đẩy Pauli siêu mạnh khi các đám mây electron nguyên tử xen phủ (z < ${sigma} nm). Chu trình tiếp cận - kéo lùi (Force-Distance curve) thể hiện hiện tượng nhảy dính (Snap-in) ở z = ${snapInDistanceNm} nm và hiện tượng kéo đứt lực dính (Pull-off force) F_adhesion = ${sample.adhesionForceNanoNewtons} nN. Độ uốn của cần dầm tuân thủ định luật Hooke F = -k·Δz, cho phép phát hiện lực ở thang đo piconewton (10⁻¹² N), cảm nhận từng phân tử đơn lẻ mà không cần mẫu phải dẫn điện như kính hiển vi điện tử.`;

  return {
    cantilever,
    sample,
    mode,
    cantileverSpringConstantNPerM: k_c,
    resonantFrequencyKhz: cantilever.resonantFrequencyKhz,
    snapInDistanceNm,
    snapInForceNanoNewtons,
    pullOffDistanceNm,
    pullOffForceNanoNewtons,
    approachCurve,
    retractionCurve,
    tappingAmplitudeRatio,
    phaseShiftDegrees,
    pedagogicalAnalysisVI
  };
}

/**
 * Card matching service: identifies if an ELEMENTA card corresponds to an AFM standard
 */
export function getMatchingAfmCard(card: { id?: string; name?: string; description?: string }): AfmSampleProfile | null {
  if (!card) return null;
  const text = `${card.id || ''} ${card.name || ''} ${card.description || ''}`.toLowerCase();

  if (text.includes('dna') || text.includes('acid nucleic') || text.includes('di truyền') || text.includes('sinh học')) {
    return AFM_SAMPLE_CATALOG.dna_double_helix_mica;
  }
  if (text.includes('vàng') || text.includes('gold') || text.includes('au(111)') || text.includes('kim loại')) {
    return AFM_SAMPLE_CATALOG.gold_nanocrystals_substrate;
  }
  if (text.includes('graphene') || text.includes('carbon') || text.includes('đơn lớp') || text.includes('2d')) {
    return AFM_SAMPLE_CATALOG.graphene_monolayer_sio2;
  }
  if (text.includes('polymer') || text.includes('pmma') || text.includes('polystyrene') || text.includes('nhựa')) {
    return AFM_SAMPLE_CATALOG.polymer_blend_ps_pmma;
  }

  return null;
}
