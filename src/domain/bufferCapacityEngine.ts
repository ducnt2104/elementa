// src/domain/bufferCapacityEngine.ts
// Comprehensive Buffer Solution, Henderson-Hasselbalch Equation & Van Slyke Buffer Capacity Engine
// Strictly conforming to Vietnam GDPT 2018 Chemistry 11 (Cân bằng trong dung dịch nước) & IUPAC Standards

export interface BufferSystemDef {
  id: string;
  nameVi: string;
  nameEn: string;
  weakAcidFormula: string;
  conjugateBaseFormula: string;
  pKa: number; // At standard 298.15 K
  optimalPHRange: [number, number]; // [pKa - 1, pKa + 1]
  equilibriumEquation: string;
  biologicalOrIndustrialContextVI: string;
  tacticalSynergyVI: string;
}

export const BUFFER_SYSTEMS_CATALOG: BufferSystemDef[] = [
  {
    id: 'acetate_buffer',
    nameVi: 'Hệ Đệm Axetat (CH₃COOH / CH₃COO⁻)',
    nameEn: 'Acetate Buffer',
    weakAcidFormula: 'CH₃COOH',
    conjugateBaseFormula: 'CH₃COO⁻',
    pKa: 4.76,
    optimalPHRange: [3.76, 5.76],
    equilibriumEquation: 'CH₃COOH + H₂O ⇌ CH₃COO⁻ + H₃O⁺',
    biologicalOrIndustrialContextVI: 'Sử dụng phổ biến trong sinh hóa thực phẩm, lên men giấm và tách chiết enzyme ở môi trường axit nhẹ.',
    tacticalSynergyVI: 'Hấp thụ sát thương Axit/Ăn mòn của đối thủ và giảm 35% hiệu lực của độc tố hữu cơ.'
  },
  {
    id: 'phosphate_intracellular_buffer',
    nameVi: 'Hệ Đệm Photphat Nội Bào (H₂PO₄⁻ / HPO₄²⁻)',
    nameEn: 'Phosphate Intracellular Buffer',
    weakAcidFormula: 'H₂PO₄⁻',
    conjugateBaseFormula: 'HPO₄²⁻',
    pKa: 7.20,
    optimalPHRange: [6.20, 8.20],
    equilibriumEquation: 'H₂PO₄⁻ + H₂O ⇌ HPO₄²⁻ + H₃O⁺',
    biologicalOrIndustrialContextVI: 'Hệ đệm chính bên trong tế bào chất của động thực vật, duy trì pH sinh lý tối ưu cho enzyme phosphoryl hóa.',
    tacticalSynergyVI: 'Bảo vệ tế bào khỏi shock áp suất thẩm thấu và kích hoạt hồi máu 150 HP mỗi lượt duy trì.'
  },
  {
    id: 'bicarbonate_blood_buffer',
    nameVi: 'Hệ Đệm Cacbonat Máu (H₂CO₃ / HCO₃⁻ & CO₂)',
    nameEn: 'Bicarbonate Blood Buffer',
    weakAcidFormula: 'H₂CO₃',
    conjugateBaseFormula: 'HCO₃⁻',
    pKa: 6.35,
    optimalPHRange: [5.35, 7.35],
    equilibriumEquation: 'CO₂ + H₂O ⇌ H₂CO₃ ⇌ HCO₃⁻ + H⁺',
    biologicalOrIndustrialContextVI: 'Hệ đệm mở sinh học tối quan trọng của huyết tương người (pH 7.35 - 7.45), phổi đào thải CO₂ và thận tái hấp thu HCO₃⁻.',
    tacticalSynergyVI: 'Kháng hoàn toàn trạng thái Nhiễm Toan (Acidosis) và Nhiễm Kiềm (Alkalosis), cân bằng tức thì điểm nội năng.'
  },
  {
    id: 'ammonia_buffer',
    nameVi: 'Hệ Đệm Amoniac (NH₄⁺ / NH₃)',
    nameEn: 'Ammonium / Ammonia Buffer',
    weakAcidFormula: 'NH₄⁺',
    conjugateBaseFormula: 'NH₃',
    pKa: 9.25,
    optimalPHRange: [8.25, 10.25],
    equilibriumEquation: 'NH₄⁺ + H₂O ⇌ NH₃ + H₃O⁺',
    biologicalOrIndustrialContextVI: 'Sử dụng rộng rãi trong hóa phân tích định lượng (chuẩn độ phức chất EDTA với Ca²⁺/Mg²⁺) ở môi trường kiềm.',
    tacticalSynergyVI: 'Gia tăng 25% sát thương nguyên tố Halogen và trung hòa các đòn công kích gốc kiềm mạnh.'
  },
  {
    id: 'formate_buffer',
    nameVi: 'Hệ Đệm Fomiat (HCOOH / HCOO⁻)',
    nameEn: 'Formate Buffer',
    weakAcidFormula: 'HCOOH',
    conjugateBaseFormula: 'HCOO⁻',
    pKa: 3.75,
    optimalPHRange: [2.75, 4.75],
    equilibriumEquation: 'HCOOH + H₂O ⇌ HCOO⁻ + H₃O⁺',
    biologicalOrIndustrialContextVI: 'Dùng trong sắc ký lỏng khối phổ (LC-MS) vì axit fomic và muối amoni fomiat dễ bay hơi trong buồng ion hóa ESI.',
    tacticalSynergyVI: 'Tăng tốc độ rút bài thêm 1 lá khi thi triển phản ứng pha loãng hoặc oxy hóa fomiat.'
  },
  {
    id: 'tris_biochem_buffer',
    nameVi: 'Hệ Đệm TRIS (Tris-H⁺ / Tris)',
    nameEn: 'TRIS Biochemical Buffer',
    weakAcidFormula: 'Tris-H⁺',
    conjugateBaseFormula: 'Tris',
    pKa: 8.06,
    optimalPHRange: [7.06, 9.06],
    equilibriumEquation: 'Tris-H⁺ + H₂O ⇌ Tris + H₃O⁺',
    biologicalOrIndustrialContextVI: 'Tiêu chuẩn vàng trong điện di DNA/RNA (đệm TAE, TBE) và tinh chế kháng thể tái tổ hợp.',
    tacticalSynergyVI: 'Ngăn chặn hiện tượng kết tủa protein và tạo lá chắn hấp thụ 20% sát thương chuẩn.'
  }
];

export interface BufferEvaluationResult {
  system: BufferSystemDef;
  acidConcM: number;
  baseConcM: number;
  volumeLiters: number;
  acidMoles: number;
  baseMoles: number;
  ratioBaseToAcid: number;
  pH: number;
  pOH: number;
  vanSlykeBufferCapacityBeta: number; // mol / (L · pH unit)
  isOptimalRange: boolean;
  stepByStepExplanationVI: string[];
}

export interface BufferPerturbationResult {
  system: BufferSystemDef;
  initialPH: number;
  finalPH: number;
  deltaPH: number;
  addedSpecies: 'STRONG_ACID' | 'STRONG_BASE';
  addedMoles: number;
  addedConcEquivalentM: number;
  initialAcidMoles: number;
  finalAcidMoles: number;
  initialBaseMoles: number;
  finalBaseMoles: number;
  isBufferBreached: boolean;
  breachReasonVI?: string;
  capacityUtilizationPct: number;
  vanSlykeBufferCapacityBeta: number;
  stepByStepExplanationVI: string[];
  gameplayModifier: {
    elementalWardPct: number;
    statusResistanceVI: string;
    descriptionVI: string;
  };
}

/**
 * 1. Henderson-Hasselbalch Equation: pH = pKa + log10([A-] / [HA])
 * 2. Van Slyke Differential Buffer Capacity:
 *    beta = 2.302585 * ( [H+] + [OH-] + (Ca * Cb) / (Ca + Cb) )
 */
export function calculateBufferState(params: {
  systemId: string;
  acidConcM: number;
  baseConcM: number;
  volumeLiters?: number;
}): BufferEvaluationResult {
  const system = BUFFER_SYSTEMS_CATALOG.find(s => s.id === params.systemId);
  if (!system) {
    throw new Error(`Không tìm thấy hệ đệm với ID: ${params.systemId}`);
  }

  const { acidConcM, baseConcM } = params;
  const volumeLiters = params.volumeLiters !== undefined ? params.volumeLiters : 1.0;

  if (acidConcM <= 0 || baseConcM <= 0) {
    throw new Error('Nồng độ axit yếu và bazơ liên hợp trong hệ đệm phải lớn hơn 0.');
  }
  if (volumeLiters <= 0) {
    throw new Error('Thể tích dung dịch đệm phải lớn hơn 0.');
  }

  const ratio = baseConcM / acidConcM;
  const logRatio = Math.log10(ratio);
  const rawPH = system.pKa + logRatio;
  const pH = Math.round(Math.max(0, Math.min(14, rawPH)) * 1000) / 1000;
  const pOH = Math.round((14.0 - pH) * 1000) / 1000;

  // Van Slyke buffer capacity beta (mol / (L * pH unit))
  const H_conc = Math.pow(10, -pH);
  const OH_conc = Math.pow(10, -(14.0 - pH));
  const beta = 2.302585 * (H_conc + OH_conc + (acidConcM * baseConcM) / (acidConcM + baseConcM));
  const roundedBeta = Math.round(beta * 10000) / 10000;

  const isOptimalRange = pH >= system.optimalPHRange[0] && pH <= system.optimalPHRange[1];

  const acidMoles = Math.round(acidConcM * volumeLiters * 10000) / 10000;
  const baseMoles = Math.round(baseConcM * volumeLiters * 10000) / 10000;

  const stepsVI: string[] = [
    `Bước 1: Nhận diện hệ đệm [${system.nameVi}], có pKa = ${system.pKa}.`,
    `Bước 2: Nồng độ dạng axit [${system.weakAcidFormula}] = ${acidConcM} M; bazơ liên hợp [${system.conjugateBaseFormula}] = ${baseConcM} M (tỉ lệ [B]/[A] = ${Math.round(ratio * 1000) / 1000}).`,
    `Bước 3: Áp dụng phương trình Henderson-Hasselbalch: pH = pKa + log₁₀([Bazơ]/[Axit]) = ${system.pKa} + log₁₀(${Math.round(ratio * 1000) / 1000}) = ${pH}.`,
    `Bước 4: Sức đệm Van Slyke: β = 2.303 × ( [H⁺] + [OH⁻] + (C_a · C_b)/(C_a + C_b) ) = ${roundedBeta} mol/(L·pH).`,
    `Bước 5: Đánh giá miền đệm: pH = ${pH} ${isOptimalRange ? 'nằm trong' : 'vượt ra ngoài'} khoảng đệm tối ưu [${system.optimalPHRange[0]} - ${system.optimalPHRange[1]}].`
  ];

  return {
    system,
    acidConcM,
    baseConcM,
    volumeLiters,
    acidMoles,
    baseMoles,
    ratioBaseToAcid: Math.round(ratio * 10000) / 10000,
    pH,
    pOH,
    vanSlykeBufferCapacityBeta: roundedBeta,
    isOptimalRange,
    stepByStepExplanationVI: stepsVI
  };
}

/**
 * Simulates disturbance by adding a strong acid (HCl -> H+) or strong base (NaOH -> OH-)
 */
export function simulateBufferPerturbation(params: {
  systemId: string;
  acidConcM: number;
  baseConcM: number;
  volumeLiters?: number;
  perturbType: 'STRONG_ACID' | 'STRONG_BASE';
  addedMoles: number;
}): BufferPerturbationResult {
  const initial = calculateBufferState({
    systemId: params.systemId,
    acidConcM: params.acidConcM,
    baseConcM: params.baseConcM,
    volumeLiters: params.volumeLiters
  });

  const { perturbType, addedMoles } = params;
  if (addedMoles <= 0) {
    throw new Error('Số mol axit/bazơ mạnh thêm vào phải lớn hơn 0.');
  }

  const vol = initial.volumeLiters;
  let finalAcidMoles: number;
  let finalBaseMoles: number;
  let isBufferBreached = false;
  let breachReasonVI: string | undefined;
  let capacityUtilizationPct: number;

  if (perturbType === 'STRONG_ACID') {
    // H+ reacts with conjugate base A-: A- + H+ -> HA
    capacityUtilizationPct = Math.round((addedMoles / initial.baseMoles) * 1000) / 10;
    if (addedMoles >= initial.baseMoles) {
      isBufferBreached = true;
      breachReasonVI = `Lượng H⁺ thêm vào (${addedMoles} mol) đã trung hòa cạn kiệt toàn bộ bazơ liên hợp ${initial.system.conjugateBaseFormula} (${initial.baseMoles} mol). Hệ đệm bị phá hủy hoàn toàn!`;
      finalBaseMoles = 0;
      finalAcidMoles = initial.acidMoles + initial.baseMoles;
    } else {
      finalBaseMoles = initial.baseMoles - addedMoles;
      finalAcidMoles = initial.acidMoles + addedMoles;
    }
  } else {
    // OH- reacts with weak acid HA: HA + OH- -> A- + H2O
    capacityUtilizationPct = Math.round((addedMoles / initial.acidMoles) * 1000) / 10;
    if (addedMoles >= initial.acidMoles) {
      isBufferBreached = true;
      breachReasonVI = `Lượng OH⁻ thêm vào (${addedMoles} mol) đã trung hòa hết toàn bộ axit yếu ${initial.system.weakAcidFormula} (${initial.acidMoles} mol). Hệ đệm bị kiềm hóa hoàn toàn!`;
      finalAcidMoles = 0;
      finalBaseMoles = initial.baseMoles + initial.acidMoles;
    } else {
      finalAcidMoles = initial.acidMoles - addedMoles;
      finalBaseMoles = initial.baseMoles + addedMoles;
    }
  }

  let finalPH: number;
  if (isBufferBreached) {
    if (perturbType === 'STRONG_ACID') {
      const excessH = addedMoles - initial.baseMoles;
      const excessHConc = excessH > 0 ? excessH / vol : 1e-4;
      finalPH = Math.round(-Math.log10(excessHConc) * 1000) / 1000;
    } else {
      const excessOH = addedMoles - initial.acidMoles;
      const excessOHConc = excessOH > 0 ? excessOH / vol : 1e-4;
      finalPH = Math.round((14.0 - -Math.log10(excessOHConc)) * 1000) / 1000;
    }
  } else {
    const finalRatio = finalBaseMoles / finalAcidMoles;
    const rawFinalPH = initial.system.pKa + Math.log10(finalRatio);
    finalPH = Math.round(Math.max(0, Math.min(14, rawFinalPH)) * 1000) / 1000;
  }

  const deltaPH = Math.round((finalPH - initial.pH) * 1000) / 1000;
  const addedConcEq = Math.round((addedMoles / vol) * 10000) / 10000;

  const stepsVI: string[] = [
    `Bước 1: Trạng thái ban đầu: pH₀ = ${initial.pH}, [A] = ${initial.acidMoles} mol, [B] = ${initial.baseMoles} mol.`,
    `Bước 2: Thêm ${addedMoles} mol ${perturbType === 'STRONG_ACID' ? 'H⁺ (axit mạnh)' : 'OH⁻ (bazơ mạnh)'}.`,
    perturbType === 'STRONG_ACID'
      ? `  • Phản ứng đệm: ${initial.system.conjugateBaseFormula} + H⁺ → ${initial.system.weakAcidFormula}`
      : `  • Phản ứng đệm: ${initial.system.weakAcidFormula} + OH⁻ → ${initial.system.conjugateBaseFormula} + H₂O`,
    `Bước 3: Trạng thái sau phản ứng: [A] = ${Math.round(finalAcidMoles * 1000) / 1000} mol; [B] = ${Math.round(finalBaseMoles * 1000) / 1000} mol.`,
    isBufferBreached
      ? `Bước 4: CẢNH BÁO: ${breachReasonVI} pH dịch chuyển cực mạnh về ${finalPH} (ΔpH = ${deltaPH}).`
      : `Bước 4: pH mới sau cân bằng đệm: pH = ${finalPH} (chỉ thay đổi ΔpH = ${deltaPH > 0 ? '+' : ''}${deltaPH}), chứng minh hiệu ứng đệm mạnh mẽ!`,
    `Bước 5: Dung lượng đã sử dụng: ${Math.min(100, capacityUtilizationPct)}% sức kháng chịu.`
  ];

  const elementalWard = isBufferBreached ? 0 : Math.max(10, Math.round(40 * (1 - Math.abs(deltaPH))));

  return {
    system: initial.system,
    initialPH: initial.pH,
    finalPH,
    deltaPH,
    addedSpecies: perturbType,
    addedMoles,
    addedConcEquivalentM: addedConcEq,
    initialAcidMoles: initial.acidMoles,
    finalAcidMoles: Math.round(finalAcidMoles * 10000) / 10000,
    initialBaseMoles: initial.baseMoles,
    finalBaseMoles: Math.round(finalBaseMoles * 10000) / 10000,
    isBufferBreached,
    breachReasonVI,
    capacityUtilizationPct,
    vanSlykeBufferCapacityBeta: initial.vanSlykeBufferCapacityBeta,
    stepByStepExplanationVI: stepsVI,
    gameplayModifier: {
      elementalWardPct: elementalWard,
      statusResistanceVI: isBufferBreached ? 'MẤT HIỆU LỰC (ĐỆM VỠ)' : 'KHÁNG SỐC ACID/BASE',
      descriptionVI: isBufferBreached
        ? 'Dung lượng đệm đã cạn kiệt, nhân vật nhận đủ 100% sát thương ăn mòn hóa học.'
        : `Lớp chắn đệm hóa học hấp thụ ${elementalWard}% sát thương ăn mòn và vô hiệu hóa trạng thái đổi pH.`
    }
  };
}

/**
 * Finds the optimal buffer system from the catalog for a target pH
 */
export function findBestBufferForTargetPH(targetPH: number): {
  system: BufferSystemDef;
  deltaFromPka: number;
  recommendationVI: string;
} {
  if (targetPH < 0 || targetPH > 14) {
    throw new Error('pH mục tiêu phải nằm trong dải [0, 14].');
  }

  let best = BUFFER_SYSTEMS_CATALOG[0];
  let minDiff = Math.abs(targetPH - best.pKa);

  for (const s of BUFFER_SYSTEMS_CATALOG) {
    const diff = Math.abs(targetPH - s.pKa);
    if (diff < minDiff) {
      minDiff = diff;
      best = s;
    }
  }

  return {
    system: best,
    deltaFromPka: Math.round(minDiff * 100) / 100,
    recommendationVI: `Hệ đệm tối ưu nhất cho pH = ${targetPH} là [${best.nameVi}] (pKa = ${best.pKa}). Khoảng đệm hiệu dụng: ${best.optimalPHRange[0]} - ${best.optimalPHRange[1]}.`
  };
}
