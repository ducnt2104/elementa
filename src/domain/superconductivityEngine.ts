// src/domain/superconductivityEngine.ts
// Milestone 46: Superconductivity, BCS Cooper Pairs, London Penetration Depth & Meissner Effect Engine
// Standards: Nobel Prize in Physics 1972 (Bardeen, Cooper, Schrieffer — BCS), 1987 (Bednorz & Müller — High-Tc Cuprates), 2003 (Abrikosov, Ginzburg, Leggett — Type II Superconductors)
// Curriculum: Vietnam GDPT 2018 (Vật lí 12 Chuyên đề: Hiện tượng siêu dẫn & Từ trường; Hóa học 12: Vật liệu tiên tiến & Gốm siêu dẫn YBCO)

export type SuperconductorType = 'TYPE_I' | 'TYPE_II';

export interface SuperconductorSpec {
  id: string;
  name: string;
  formula: string;
  nameVI: string;
  type: SuperconductorType;
  criticalTemperatureKelvin: number; // Tc in K
  thermodynamicCriticalFieldH0Tesla: number; // H0 in Tesla (Type I) or Hc in Tesla
  upperCriticalFieldHc2Tesla?: number; // Hc2 in Tesla (Type II)
  lowerCriticalFieldHc1Tesla?: number; // Hc1 in Tesla (Type II)
  londonPenetrationDepth0Nm: number; // lambda_0 in nm
  coherenceLength0Nm: number; // xi_0 in nm
  ginzburgLandauKappa: number; // kappa = lambda / xi
  isHighTcLiquidNitrogenAccessible: boolean; // Tc > 77.36 K (Liquid N2)
  discoveryYear: number;
  discovererVI: string;
  descriptionVI: string;
}

export interface SuperconductivitySimulationResult {
  material: SuperconductorSpec;
  temperatureKelvin: number;
  appliedMagneticFieldTesla: number;

  // State Evaluation
  isSuperconducting: boolean; // T < Tc and H < Hc (or H < Hc2)
  superconductingState: 'NORMAL' | 'MEISSNER_STATE' | 'MIXED_VORTEX_STATE';
  reducedTemperatureTOverTc: number; // T / Tc

  // Fundamental Quantum Scales
  bcsEnergyGapMilliEv: number; // Delta(T) in meV
  londonPenetrationDepthNm: number; // lambda_L(T) in nm
  coherenceLengthNm: number; // xi(T) in nm
  ginzburgLandauKappa: number;

  // Critical Fields at T
  criticalFieldTesla: number; // Hc(T) for Type I
  upperCriticalFieldHc2Tesla: number; // Hc2(T) for Type II
  lowerCriticalFieldHc1Tesla: number; // Hc1(T) for Type II

  // Quantized Flux & Levitation
  fluxQuantumWb: number; // Phi_0 = h / (2e) ~= 2.0678e-15 Wb
  magneticFluxExpulsionPercent: number; // 100% in Meissner, drops in vortex state
  magneticLevitationForceNewtons: number; // Meissner repulsive levitation force (model)

  pedagogicalInsightVI: string;
}

// ----------------------------------------------------------------------------
// FUNDAMENTAL CONSTANTS FOR SUPERCONDUCTIVITY
// ----------------------------------------------------------------------------
export const SI_BOLTZMANN_K = 1.380649e-23; // J / K
export const SI_ELEMENTARY_CHARGE = 1.602176634e-19; // C
export const SI_PLANCK_H = 6.62607015e-34; // J·s
export const SI_MAGNETIC_FLUX_QUANTUM_PHI0 = SI_PLANCK_H / (2 * SI_ELEMENTARY_CHARGE); // 2.067833848e-15 Wb
export const LIQUID_NITROGEN_BOILING_POINT_K = 77.36; // K
export const LIQUID_HELIUM_BOILING_POINT_K = 4.22; // K

// ----------------------------------------------------------------------------
// SUPERCONDUCTOR BENCHMARK CATALOG
// ----------------------------------------------------------------------------
export const SUPERCONDUCTOR_CATALOG: Record<string, SuperconductorSpec> = {
  mercury_elemental: {
    id: 'mercury_elemental',
    name: 'Mercury (Elemental)',
    formula: 'Hg',
    nameVI: 'Thủy Ngân Hg (Siêu dẫn đầu tiên trong lịch sử)',
    type: 'TYPE_I',
    criticalTemperatureKelvin: 4.15,
    thermodynamicCriticalFieldH0Tesla: 0.0411, // 41.1 mT
    londonPenetrationDepth0Nm: 38.0,
    coherenceLength0Nm: 1000.0,
    ginzburgLandauKappa: 0.038, // kappa = 38 / 1000 = 0.038 << 1/sqrt(2)
    isHighTcLiquidNitrogenAccessible: false,
    discoveryYear: 1911,
    discovererVI: 'Heike Kamerlingh Onnes (Nobel Vật lí 1913)',
    descriptionVI: 'Chất siêu dẫn đầu tiên được phát hiện khi làm lạnh thủy ngân bằng heli lỏng xuống 4.15 K, điện trở đột ngột biến mất hoàn toàn.',
  },

  lead_elemental: {
    id: 'lead_elemental',
    name: 'Lead (Elemental)',
    formula: 'Pb',
    nameVI: 'Chì Pb (Siêu dẫn Loại I nhiệt độ chuyển pha cao nhất)',
    type: 'TYPE_I',
    criticalTemperatureKelvin: 7.20,
    thermodynamicCriticalFieldH0Tesla: 0.0803, // 80.3 mT
    londonPenetrationDepth0Nm: 37.0,
    coherenceLength0Nm: 83.0,
    ginzburgLandauKappa: 0.446, // kappa < 0.707 (Type I)
    isHighTcLiquidNitrogenAccessible: false,
    discoveryYear: 1913,
    discovererVI: 'Heike Kamerlingh Onnes',
    descriptionVI: 'Kim loại siêu dẫn Loại I cổ điển với hiệu ứng Meissner tuyệt đối, đẩy hoàn toàn từ trường ra khỏi lòng vật thể.',
  },

  niobium_titanium: {
    id: 'niobium_titanium',
    name: 'Niobium-Titanium Alloy',
    formula: 'Nb-Ti',
    nameVI: 'Hợp Kim Nb-Ti (Trụ cột nam châm máy MRI y tế & CERN LHC)',
    type: 'TYPE_II',
    criticalTemperatureKelvin: 9.80,
    thermodynamicCriticalFieldH0Tesla: 0.20,
    lowerCriticalFieldHc1Tesla: 0.020, // 20 mT
    upperCriticalFieldHc2Tesla: 15.0, // 15 Tesla!
    londonPenetrationDepth0Nm: 240.0,
    coherenceLength0Nm: 4.0,
    ginzburgLandauKappa: 60.0, // kappa >> 0.707 (Type II)
    isHighTcLiquidNitrogenAccessible: false,
    discoveryYear: 1961,
    discovererVI: 'Hulm & Matthias',
    descriptionVI: 'Vật liệu siêu dẫn thương mại quan trọng nhất thế giới, được cuộn thành dây cáp nam châm chụp cộng hưởng từ hạt nhân MRI và máy gia tốc hạt lớn LHC.',
  },

  ybco_cuprate: {
    id: 'ybco_cuprate',
    name: 'Yttrium Barium Copper Oxide (YBCO)',
    formula: 'YBa2Cu3O7-δ',
    nameVI: 'Gốm Siêu Dẫn Nhiệt Độ Cao YBCO (Nobel Vật lí 1987)',
    type: 'TYPE_II',
    criticalTemperatureKelvin: 93.0, // Well above 77 K!
    thermodynamicCriticalFieldH0Tesla: 1.40,
    lowerCriticalFieldHc1Tesla: 0.035, // 35 mT
    upperCriticalFieldHc2Tesla: 120.0, // Extreme 120 T
    londonPenetrationDepth0Nm: 150.0,
    coherenceLength0Nm: 1.5,
    ginzburgLandauKappa: 100.0,
    isHighTcLiquidNitrogenAccessible: true,
    discoveryYear: 1987,
    discovererVI: 'J. Georg Bednorz & K. Alex Müller (Nobel Vật lí 1987) / Paul Chu & Maw-Kuen Wu',
    descriptionVI: 'Cột mốc lịch sử đưa siêu dẫn vượt qua bức tường nhiệt độ sôi của nitơ lỏng (77.36 K). Cho phép biểu diễn hiện tượng đệm từ Meissner và khóa lượng tử (flux pinning) với nitơ lỏng giá rẻ.',
  },

  magnesium_diboride: {
    id: 'magnesium_diboride',
    name: 'Magnesium Diboride',
    formula: 'MgB2',
    nameVI: 'Magie Điborua MgB2 (Siêu dẫn BCS hai khe năng lượng)',
    type: 'TYPE_II',
    criticalTemperatureKelvin: 39.0,
    thermodynamicCriticalFieldH0Tesla: 0.43,
    lowerCriticalFieldHc1Tesla: 0.030,
    upperCriticalFieldHc2Tesla: 30.0,
    londonPenetrationDepth0Nm: 85.0,
    coherenceLength0Nm: 5.0,
    ginzburgLandauKappa: 17.0,
    isHighTcLiquidNitrogenAccessible: false,
    discoveryYear: 2001,
    discovererVI: 'Jun Akimitsu',
    descriptionVI: 'Siêu dẫn thông thường (ghép electron-phonon BCS) có nhiệt độ chuyển pha cao nhất, cấu trúc hai khe năng lượng pi và sigma độc đáo.',
  },
};

// ----------------------------------------------------------------------------
// SUPERCONDUCTIVITY CALCULATION ENGINE
// ----------------------------------------------------------------------------

/**
 * Calculates Superconducting properties, BCS gap, London penetration depth,
 * critical magnetic fields, and Meissner state.
 */
export function calculateSuperconductivity(
  materialId: string,
  temperatureKelvin = 4.0, // Default 4.0 K
  appliedFieldTesla = 0.02 // Default 0.02 T (20 mT)
): SuperconductivitySimulationResult {
  const mat = SUPERCONDUCTOR_CATALOG[materialId] || SUPERCONDUCTOR_CATALOG.ybco_cuprate;

  const T = Math.max(0.01, temperatureKelvin);
  const H = Math.max(0.0, appliedFieldTesla);
  const Tc = mat.criticalTemperatureKelvin;

  const tReduced = Math.min(1.0, T / Tc);
  const isBelowTc = T < Tc;

  // 1. BCS Energy Gap Delta(T)
  // Delta(0) = 1.764 * k_B * Tc (BCS weak-coupling limit)
  const delta0Joules = 1.764 * SI_BOLTZMANN_K * Tc;
  const delta0MilliEv = (delta0Joules / SI_ELEMENTARY_CHARGE) * 1000;

  let deltaTMilliEv = 0.0;
  if (isBelowTc) {
    // BCS universal temperature dependence: Delta(T) ~= 1.74 * Delta(0) * sqrt(1 - T/Tc)
    deltaTMilliEv = Number((delta0MilliEv * Math.sqrt(Math.max(0, 1 - Math.pow(tReduced, 1.8)))).toFixed(3));
  }

  // 2. Critical Fields at Temperature T:
  // Hc(T) = H0 * [1 - (T/Tc)^2]
  const fieldFactor = Math.max(0, 1 - tReduced * tReduced);
  const Hc_T = Number((mat.thermodynamicCriticalFieldH0Tesla * fieldFactor).toFixed(4));

  let Hc1_T = 0.0;
  let Hc2_T = 0.0;
  if (mat.type === 'TYPE_II') {
    const Hc1_0 = mat.lowerCriticalFieldHc1Tesla || 0.03;
    const Hc2_0 = mat.upperCriticalFieldHc2Tesla || 20.0;
    Hc1_T = Number((Hc1_0 * fieldFactor).toFixed(4));
    Hc2_T = Number((Hc2_0 * fieldFactor).toFixed(4));
  }

  // 3. State Evaluation:
  let state: 'NORMAL' | 'MEISSNER_STATE' | 'MIXED_VORTEX_STATE' = 'NORMAL';
  let isSuperconducting = false;

  if (isBelowTc) {
    if (mat.type === 'TYPE_I') {
      if (H < Hc_T) {
        state = 'MEISSNER_STATE';
        isSuperconducting = true;
      } else {
        state = 'NORMAL'; // Quenched by magnetic field
      }
    } else {
      // Type II
      if (H < Hc1_T) {
        state = 'MEISSNER_STATE';
        isSuperconducting = true;
      } else if (H <= Hc2_T) {
        state = 'MIXED_VORTEX_STATE'; // Abrikosov flux vortex state
        isSuperconducting = true;
      } else {
        state = 'NORMAL'; // Upper critical field exceeded
      }
    }
  }

  // 4. London Penetration Depth lambda_L(T)
  // Gorter-Casimir two-fluid model: lambda_L(T) = lambda_0 / sqrt(1 - (T/Tc)^4)
  let lambdaT = mat.londonPenetrationDepth0Nm;
  if (isBelowTc) {
    const denom = Math.sqrt(Math.max(0.01, 1 - Math.pow(tReduced, 4)));
    lambdaT = Number((mat.londonPenetrationDepth0Nm / denom).toFixed(1));
  } else {
    lambdaT = 9999.0; // Infinite in normal state
  }

  // 5. Coherence Length xi(T)
  // xi(T) ~= xi_0 / sqrt(1 - T/Tc)
  let xiT = mat.coherenceLength0Nm;
  if (isBelowTc) {
    const denomXi = Math.sqrt(Math.max(0.01, 1 - tReduced));
    xiT = Number((mat.coherenceLength0Nm / denomXi).toFixed(2));
  } else {
    xiT = 0.0;
  }

  // 6. Flux Expulsion & Magnetic Levitation Force (Meissner effect model)
  let fluxExpulsion = 0.0;
  let levitationForceN = 0.0;

  if (state === 'MEISSNER_STATE') {
    fluxExpulsion = 100.0; // Complete diamagnetism chi = -1
    // Magnetic pressure: P_mag = B^2 / (2 * mu_0)
    // Model levitation force scaled to sample area
    levitationForceN = Number((H * H * 45.0 * (1 - tReduced)).toFixed(2));
  } else if (state === 'MIXED_VORTEX_STATE') {
    // Flux penetrates as quantized vortices, expulsion decreases towards Hc2
    const penetrationRatio = (H - Hc1_T) / Math.max(0.001, Hc2_T - Hc1_T);
    fluxExpulsion = Number((Math.max(0, 100 * (1 - penetrationRatio))).toFixed(1));
    levitationForceN = Number((Hc1_T * Hc1_T * 45.0 * (1 - tReduced)).toFixed(2));
  }

  // 7. Pedagogical Narrative
  let narrative = `${mat.nameVI} ở nhiệt độ T = ${T.toFixed(1)} K (T/Tc = ${tReduced.toFixed(2)}), từ trường ngoài H = ${(H * 1000).toFixed(1)} mT. `;
  if (!isBelowTc) {
    narrative += `Trạng thái BÌNH THƯỜNG (Normal State): Nhiệt độ vượt quá nhiệt độ tới hạn Tc = ${Tc.toFixed(1)} K. Dao động nhiệt phonon đã bẻ gãy hoàn toàn các cặp electron Cooper, vật liệu có điện trở hữu hạn.`;
  } else if (state === 'MEISSNER_STATE') {
    narrative += `Trạng thái SIÊU DẪN MEISSNER TUYỆT ĐỐI: Điện trở R = 0. Dòng điện siêu dẫn bề mặt tạo từ trường ngược chiều triệt tiêu hoàn toàn từ thông trong lòng vật thể (Độ cảm từ nghịch từ lý tưởng χ = -1). `;
    narrative += `Khe năng lượng BCS Δ = ${deltaTMilliEv.toFixed(2)} meV. Bề sâu xuyên thấu London λ_L = ${lambdaT.toFixed(1)} nm. Lực nâng đệm từ đạt ${levitationForceN.toFixed(1)} N (hiện tượng bay lơ lửng trên đường ray nam châm).`;
  } else if (state === 'MIXED_VORTEX_STATE') {
    narrative += `Trạng thái HỖN HỢP ABRIKOSOV (Vortex State - Siêu dẫn Loại II): Từ trường ngoài vượt qua trường tới hạn dưới Hc1 = ${(Hc1_T * 1000).toFixed(1)} mT nhưng chưa tới Hc2 = ${Hc2_T.toFixed(1)} T. `;
    narrative += `Từ trường thâm nhập dưới dạng các ống từ thông lượng tử hóa (Flux Vortices, mỗi ống mang đúng 1 lượng tử từ thông Φ₀ = h/2e ≈ 2.07 × 10⁻¹⁵ Wb). Các tâm xoáy bị ghim (flux pinning) giúp giữ vật liệu lơ lửng cố định ổn định trong không gian.`;
  } else {
    narrative += `Vật liệu bị dập tắt trạng thái siêu dẫn (Quenched) do từ trường ngoài vượt ngưỡng tới hạn.`;
  }

  if (mat.isHighTcLiquidNitrogenAccessible && T <= LIQUID_NITROGEN_BOILING_POINT_K) {
    narrative += ' ĐẶC BIỆT: Hoạt động bền vững trong môi trường NITƠ LỎNG (77 K), không cần heli lỏng đắt đỏ!';
  }

  return {
    material: mat,
    temperatureKelvin: T,
    appliedMagneticFieldTesla: H,
    isSuperconducting,
    superconductingState: state,
    reducedTemperatureTOverTc: Number(tReduced.toFixed(3)),
    bcsEnergyGapMilliEv: deltaTMilliEv,
    londonPenetrationDepthNm: lambdaT,
    coherenceLengthNm: xiT,
    ginzburgLandauKappa: mat.ginzburgLandauKappa,
    criticalFieldTesla: Hc_T,
    upperCriticalFieldHc2Tesla: Hc2_T,
    lowerCriticalFieldHc1Tesla: Hc1_T,
    fluxQuantumWb: SI_MAGNETIC_FLUX_QUANTUM_PHI0,
    magneticFluxExpulsionPercent: fluxExpulsion,
    magneticLevitationForceNewtons: levitationForceN,
    pedagogicalInsightVI: narrative,
  };
}

// ----------------------------------------------------------------------------
// CARD MATCHING SERVICE FOR SUPERCONDUCTORS
// ----------------------------------------------------------------------------

export function getMatchingSuperconductorCard(card: { id?: string; name?: string }): SuperconductorSpec | null {
  if (!card) return null;
  const nameLower = (card.name || '').toLowerCase();
  const idLower = (card.id || '').toLowerCase();

  for (const mat of Object.values(SUPERCONDUCTOR_CATALOG)) {
    const idM = mat.id.toLowerCase();
    const formulaM = mat.formula.toLowerCase();
    if (idLower === idM || idLower.includes(idM) || idLower.includes(formulaM)) {
      return mat;
    }
  }

  if (nameLower.includes('ybco') || nameLower.includes('yttri') || nameLower.includes('gốm siêu dẫn') || nameLower.includes('nitơ lỏng')) {
    return SUPERCONDUCTOR_CATALOG.ybco_cuprate;
  }
  if (nameLower.includes('niobi') || nameLower.includes('mri') || nameLower.includes('lhc') || nameLower.includes('nam châm')) {
    return SUPERCONDUCTOR_CATALOG.niobium_titanium;
  }
  if (nameLower.includes('thủy ngân') || nameLower.includes('hg') || nameLower.includes('onnes')) {
    return SUPERCONDUCTOR_CATALOG.mercury_elemental;
  }
  if (nameLower.includes('chì') || nameLower.includes('lead') || idLower.includes('pb')) {
    return SUPERCONDUCTOR_CATALOG.lead_elemental;
  }
  if (nameLower.includes('mgb2') || nameLower.includes('borua') || nameLower.includes('magnesium')) {
    return SUPERCONDUCTOR_CATALOG.magnesium_diboride;
  }

  return null;
}
