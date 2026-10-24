// src/domain/quantumHallEngine.ts
// Milestone 44: Quantum Hall Effect, Topological Matter & Berry Phase Engine
// Standards: 2019 SI Metric Definition (von Klitzing constant R_K = h/e^2), Nobel Prize Physics 1985 (von Klitzing), 1998 (Laughlin-Störmer-Tsui), 2016 (Thouless-Kosterlitz-Haldane)
// Curriculum: Vietnam GDPT 2018 (Vật lí 12 Chuyên đề: Hiệu ứng Hall lượng tử & Vật liệu tô pô; Hóa học 12: Vật liệu nano & Graphene)

export type QuantumHallRegime = 'INTEGER_QHE' | 'FRACTIONAL_QHE' | 'CLASSICAL_HALL' | 'GRAPHENE_RELATIVISTIC';

export interface TwoDeeMaterialPreset {
  id: string;
  name: string;
  nameVI: string;
  effectiveMassRatio: number; // m* / m_e (e.g. GaAs = 0.067)
  typicalSheetDensityM2: number; // n_s in m^-2 (e.g. 3.0e15)
  electronMobilityM2PerVs: number; // mu in m^2 / (V·s)
  gFactor: number; // Effective Landé g-factor
  isDiracMaterial: boolean; // Graphene: linear dispersion E = hbar * v_F * k
  fermiVelocityMPerS?: number; // v_F for Graphene ~= 1.0e6 m/s
  descriptionVI: string;
}

export interface LandauLevelSpec {
  levelIndexN: number;
  energyJoules: number;
  energyEv: number;
  energyEvSpinUp: number;
  energyEvSpinDown: number;
  isOccupied: boolean;
  degeneracyPerM2: number;
}

export interface QuantumHallSimulationResult {
  material: TwoDeeMaterialPreset;
  magneticFieldTesla: number;
  sheetDensityM2: number;
  temperatureKelvin: number;

  // Fundamental Quantum Metrics
  cyclotronFrequencyRadPerS: number;
  cyclotronEnergyEv: number;
  magneticLengthNm: number;
  fluxQuantumWb: number; // h / e
  vonKlitzingConstantOhm: number; // R_K = h / e^2 = 25812.807459 Ohm (exact SI)

  // Filling Factor & Quantization
  fillingFactorNu: number;
  integerPlateauIndex: number; // Nearest plateau nu (1, 2, 3, 4, ...)
  isAtPlateau: boolean; // True when Fermi level is inside mobility gap

  // Hall Transport Quantities
  hallResistanceRxyOhm: number; // R_xy = R_K / nu
  hallConductanceGxySiemens: number; // G_xy = nu * (e^2 / h)
  longitudinalResistanceRxxOhm: number; // R_xx -> 0 at plateau, peaks at transition

  // Topological Properties
  chernNumber: number; // TKNN Invariant C = nu
  chiralEdgeStatesCount: number; // Bulk-boundary correspondence
  berryPhaseRadians: number; // pi for Dirac fermions in Graphene, 0 for 2DEG

  // Landau Level Spectrum
  landauLevels: LandauLevelSpec[];
  fermiEnergyEv: number;

  pedagogicalSummaryVI: string;
}

// ----------------------------------------------------------------------------
// EXACT SI PHYSICAL CONSTANTS (CODATA 2018 / 2019 SI REDEFINITION)
// ----------------------------------------------------------------------------
export const SI_ELEMENTARY_CHARGE = 1.602176634e-19; // C (exact)
export const SI_PLANCK_H = 6.62607015e-34; // J·s (exact)
export const SI_HBAR = SI_PLANCK_H / (2 * Math.PI); // J·s
export const SI_ELECTRON_MASS = 9.1093837015e-31; // kg
export const SI_BOHR_MAGNETON = 9.2740100783e-24; // J / T
export const SI_VON_KLITZING_RK = SI_PLANCK_H / (SI_ELEMENTARY_CHARGE * SI_ELEMENTARY_CHARGE); // 25812.807459... Ohm
export const SI_CONDUCTANCE_QUANTUM_G0 = (2 * SI_ELEMENTARY_CHARGE * SI_ELEMENTARY_CHARGE) / SI_PLANCK_H; // ~7.748e-5 S

// ----------------------------------------------------------------------------
// 2D ELECTRON GAS (2DEG) & TOPOLOGICAL MATERIAL BENCHMARKS
// ----------------------------------------------------------------------------
export const TWO_DEE_MATERIALS: Record<string, TwoDeeMaterialPreset> = {
  gaas_algaas: {
    id: 'gaas_algaas',
    name: 'GaAs / AlGaAs Heterostructure',
    nameVI: 'Dị thể GaAs / AlGaAs (Khí electron 2 chiều 2DEG chuẩn)',
    effectiveMassRatio: 0.067,
    typicalSheetDensityM2: 3.0e15, // 3.0 x 10^11 cm^-2
    electronMobilityM2PerVs: 100.0, // Extremely high mobility > 1,000,000 cm^2/(V·s)
    gFactor: -0.44,
    isDiracMaterial: false,
    descriptionVI: 'Môi trường kinh điển mà Klaus von Klitzing phát hiện Hiệu ứng Hall Lượng tử (Nobel Vật lí 1985) và Horst Störmer - Daniel Tsui - Robert Laughlin phát hiện Hall phân số (Nobel 1998). Khối lượng hiệu dụng m* = 0.067 m_e.',
  },

  graphene_monolayer: {
    id: 'graphene_monolayer',
    name: 'Monolayer Graphene',
    nameVI: 'Graphene Đơn Lớp (Fermion Dirac phi khối lượng & Pha Berry π)',
    effectiveMassRatio: 0.015, // Quasi-mass near Dirac cone
    typicalSheetDensityM2: 4.0e15,
    electronMobilityM2PerVs: 20.0,
    gFactor: 2.0,
    isDiracMaterial: true,
    fermiVelocityMPerS: 1.0e6,
    descriptionVI: 'Vật liệu 2 chiều carbon tổ ong với tán sắc Dirac hình nón E = ħ v_F k. Hiệu ứng Hall lượng tử dị thường nửa nguyên nu = ±4(n + 1/2) quan sát được ngay ở nhiệt độ phòng (Nobel Vật lí 2010 Geim & Novoselov).',
  },

  silicon_mosfet: {
    id: 'silicon_mosfet',
    name: 'Silicon MOSFET Inversion Layer',
    nameVI: 'Lớp Đảo Silicon MOSFET (Bán dẫn bán công nghiệp)',
    effectiveMassRatio: 0.19,
    typicalSheetDensityM2: 5.0e15,
    electronMobilityM2PerVs: 1.5,
    gFactor: 2.0,
    isDiracMaterial: false,
    descriptionVI: 'Lớp đảo điện tích 2D ở bề mặt tiếp giáp Si / SiO2 trong transistor hiệu ứng trường. Nơi von Klitzing thực hiện thí nghiệm đầu tiên đo điện trở Hall lượng tử hóa độc lập với hình học linh kiện.',
  },

  inas_quantum_well: {
    id: 'inas_quantum_well',
    name: 'InAs Quantum Well',
    nameVI: 'Giếng Lượng Tử InAs (Tương tác spin-quỹ đạo Rashba cực mạnh)',
    effectiveMassRatio: 0.026,
    typicalSheetDensityM2: 2.5e15,
    electronMobilityM2PerVs: 40.0,
    gFactor: -14.9, // Large negative g-factor -> strong Zeeman splitting
    isDiracMaterial: false,
    descriptionVI: 'Giếng lượng tử Indium Arsenide với độ linh động cao và hệ số tách mức Zeeman khổng lồ (g = -14.9), nền tảng chế tạo các trạng thái Majorana bất biến tô pô cho máy tính lượng tử.',
  },
};

// ----------------------------------------------------------------------------
// QUANTUM HALL SIMULATION ENGINE
// ----------------------------------------------------------------------------

/**
 * Calculates Quantum Hall metrics, Landau level splitting, filling factor,
 * quantized Hall resistance, and topological Chern invariant.
 */
export function calculateQuantumHallEffect(
  materialId: string,
  magneticFieldTesla = 6.0, // Default 6.0 T
  sheetDensityM2 = 3.0e15, // Default 3.0e15 m^-2
  temperatureKelvin = 1.5 // Cryogenic 1.5 K
): QuantumHallSimulationResult {
  const material = TWO_DEE_MATERIALS[materialId] || TWO_DEE_MATERIALS.gaas_algaas;

  const B = Math.max(0.1, Math.min(30.0, magneticFieldTesla));
  const ns = Math.max(1.0e14, sheetDensityM2);
  const T = Math.max(0.01, temperatureKelvin);

  const mStar = material.effectiveMassRatio * SI_ELECTRON_MASS;

  // 1. Cyclotron Frequency & Energy
  // omega_c = e * B / m*
  const omegaC = (SI_ELEMENTARY_CHARGE * B) / mStar;
  const cyclotronEnergyJ = SI_HBAR * omegaC;
  const cyclotronEnergyEv = cyclotronEnergyJ / SI_ELEMENTARY_CHARGE;

  // 2. Magnetic Length: l_B = sqrt(hbar / (e * B))
  const magneticLengthM = Math.sqrt(SI_HBAR / (SI_ELEMENTARY_CHARGE * B));
  const magneticLengthNm = Number((magneticLengthM * 1e9).toFixed(3));

  // 3. Landau Level Degeneracy per unit area: n_L = e * B / h = B / Phi_0
  const fluxQuantum = SI_PLANCK_H / SI_ELEMENTARY_CHARGE; // ~4.1357e-15 Wb
  const landauDegeneracyPerM2 = (SI_ELEMENTARY_CHARGE * B) / SI_PLANCK_H;

  // 4. Filling Factor nu = n_s / n_L = (h * n_s) / (e * B)
  const rawNu = (SI_PLANCK_H * ns) / (SI_ELEMENTARY_CHARGE * B);
  const fillingFactorNu = Number(rawNu.toFixed(4));

  // Determine nearest integer plateau
  const integerPlateau = Math.max(1, Math.round(rawNu));
  const distanceToInteger = Math.abs(rawNu - integerPlateau);
  // Plateau threshold: within 0.18 of an integer, Fermi energy is in localized states gap
  const isAtPlateau = distanceToInteger < 0.18;

  // 5. Hall Resistance R_xy & Conductance G_xy
  // If at plateau, R_xy is exactly quantized to R_K / nu
  // Otherwise, transitions linearly between plateaus
  const effectiveNu = isAtPlateau ? integerPlateau : rawNu;
  const hallResistanceRxy = SI_VON_KLITZING_RK / effectiveNu;
  const hallConductanceGxy = (effectiveNu * SI_ELEMENTARY_CHARGE * SI_ELEMENTARY_CHARGE) / SI_PLANCK_H;

  // Longitudinal Resistance R_xx:
  // Drops exponentially to 0 on plateaus (dissipationless edge states).
  // Peaks at plateau transitions due to bulk extended state conduction.
  let longitudinalRxx = 0.0;
  if (isAtPlateau) {
    // Thermal activation: R_xx ~ exp(-Delta_E / (2 * k_B * T))
    // Highly suppressed: milli-ohms to micro-ohms
    longitudinalRxx = Number((1.5 * Math.exp(-distanceToInteger * 12)).toFixed(4));
  } else {
    // Peak conduction: ~ 0.5 * R_K / (nu * (nu + 1))
    longitudinalRxx = Number(((0.5 * SI_VON_KLITZING_RK) / (integerPlateau * (integerPlateau + 1))).toFixed(2));
  }

  // 6. Topological Invariants (TKNN Chern Number & Edge States)
  const chernNumber = integerPlateau;
  const chiralEdgeStates = integerPlateau;
  const berryPhase = material.isDiracMaterial ? Math.PI : 0.0;

  // 7. Fermi Energy: E_F = (hbar^2 * pi * n_s) / m* in 2D
  const fermiEnergyJ = (SI_HBAR * SI_HBAR * Math.PI * ns) / mStar;
  const fermiEnergyEv = Number((fermiEnergyJ / SI_ELEMENTARY_CHARGE).toFixed(4));

  // 8. Generate First 8 Landau Levels
  const landauLevels: LandauLevelSpec[] = [];
  const zeemanEnergyJ = Math.abs(material.gFactor) * SI_BOHR_MAGNETON * B;
  const zeemanEnergyEv = zeemanEnergyJ / SI_ELEMENTARY_CHARGE;

  for (let n = 0; n < 8; n++) {
    let baseEnergyEv = 0;
    if (material.isDiracMaterial) {
      // Graphene: E_n = sgn(n) * v_F * sqrt(2 * e * hbar * B * |n|)
      const vF = material.fermiVelocityMPerS || 1.0e6;
      baseEnergyEv = (vF * Math.sqrt(2 * SI_ELEMENTARY_CHARGE * SI_HBAR * B * n)) / SI_ELEMENTARY_CHARGE;
    } else {
      // Standard 2DEG: E_n = hbar * omega_c * (n + 0.5)
      baseEnergyEv = cyclotronEnergyEv * (n + 0.5);
    }

    const energyUp = Number((baseEnergyEv + 0.5 * zeemanEnergyEv).toFixed(4));
    const energyDown = Number((baseEnergyEv - 0.5 * zeemanEnergyEv).toFixed(4));
    const isOccupied = baseEnergyEv <= fermiEnergyEv;

    landauLevels.push({
      levelIndexN: n,
      energyJoules: baseEnergyEv * SI_ELEMENTARY_CHARGE,
      energyEv: Number(baseEnergyEv.toFixed(4)),
      energyEvSpinUp: energyUp,
      energyEvSpinDown: energyDown,
      isOccupied,
      degeneracyPerM2: landauDegeneracyPerM2,
    });
  }

  // 9. Pedagogical Summary
  let summary = `${material.nameVI} đặt trong từ trường mạnh B = ${B.toFixed(2)} T, mật độ hạt n_s = ${(ns * 1e-15).toFixed(2)} × 10¹⁵ m⁻². `;
  summary += `Hệ số lấp đầy Landau ν = ${fillingFactorNu.toFixed(2)}. `;
  if (isAtPlateau) {
    summary += `Trạng thái NẰM TRÊN BẬC CAO NGUYÊN Hall (Plateau ν = ${integerPlateau}): Mức Fermi E_F nằm trong khe năng lượng (mobility gap). `;
    summary += `Điện trở Hall lượng tử hóa tuyệt đối: R_xy = R_K / ${integerPlateau} = ${hallResistanceRxy.toFixed(3)} Ω (Độ chính xác chuẩn đo lường quốc tế BIPM đạt 10⁻¹⁰). `;
    summary += `Điện trở dọc R_xx triệt tiêu về 0 do sự xuất hiện của ${chiralEdgeStates} kênh dòng biên bất biến tô pô (Chiral Edge States với Chern number C = ${chernNumber}) dẫn điện không tiêu tán và miễn nhiễm hoàn toàn với tán xạ ngược.`;
  } else {
    summary += `Trạng thái CHUYỂN TIẾP GIỮA CÁC BẬC: Mức Fermi cắt qua vùng trạng thái mở rộng (extended states) của mức Landau n = ${integerPlateau}. Điện trở dọc R_xx đạt đỉnh cực đại (${longitudinalRxx.toFixed(1)} Ω) do xảy ra tán xạ điện tử trong khối bulk.`;
  }

  if (material.isDiracMaterial) {
    summary += ' Với Graphene, cấu trúc Dirac tạo pha Berry Berry Phase = π, dẫn tới hiệu ứng Hall dị thường lượng tử hóa nửa nguyên.';
  }

  return {
    material,
    magneticFieldTesla: B,
    sheetDensityM2: ns,
    temperatureKelvin: T,
    cyclotronFrequencyRadPerS: omegaC,
    cyclotronEnergyEv: Number(cyclotronEnergyEv.toFixed(4)),
    magneticLengthNm,
    fluxQuantumWb: fluxQuantum,
    vonKlitzingConstantOhm: Number(SI_VON_KLITZING_RK.toFixed(6)),
    fillingFactorNu,
    integerPlateauIndex: integerPlateau,
    isAtPlateau,
    hallResistanceRxyOhm: Number(hallResistanceRxy.toFixed(3)),
    hallConductanceGxySiemens: Number(hallConductanceGxy.toExponential(4)),
    longitudinalResistanceRxxOhm: longitudinalRxx,
    chernNumber,
    chiralEdgeStatesCount: chiralEdgeStates,
    berryPhaseRadians: Number(berryPhase.toFixed(4)),
    landauLevels,
    fermiEnergyEv,
    pedagogicalSummaryVI: summary,
  };
}

// ----------------------------------------------------------------------------
// CARD MATCHING SERVICE FOR TOPOLOGICAL & 2D MATERIALS
// ----------------------------------------------------------------------------

export function getMatchingQuantumHallCard(card: { id?: string; name?: string }): TwoDeeMaterialPreset | null {
  if (!card) return null;
  const nameLower = (card.name || '').toLowerCase();
  const idLower = (card.id || '').toLowerCase();

  for (const mat of Object.values(TWO_DEE_MATERIALS)) {
    const idM = mat.id.toLowerCase();
    if (idLower === idM || idLower.includes(idM)) {
      return mat;
    }
  }

  if (nameLower.includes('graphene') || nameLower.includes('graphite') || nameLower.includes('cacbon 2d')) {
    return TWO_DEE_MATERIALS.graphene_monolayer;
  }
  if (nameLower.includes('gaas') || nameLower.includes('gali') || nameLower.includes('asen') || nameLower.includes('2deg')) {
    return TWO_DEE_MATERIALS.gaas_algaas;
  }
  if (nameLower.includes('mosfet') || nameLower.includes('silic') || nameLower.includes('chip') || nameLower.includes('transistor')) {
    return TWO_DEE_MATERIALS.silicon_mosfet;
  }
  if (nameLower.includes('inas') || nameLower.includes('quantum well') || nameLower.includes('giếng lượng tử') || nameLower.includes('majorana')) {
    return TWO_DEE_MATERIALS.inas_quantum_well;
  }

  return null;
}
