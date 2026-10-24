// src/domain/crisprCas9Engine.ts
// Milestone 50: GOLDEN HALF-CENTURY MILESTONE — CRISPR-Cas9 Gene Editing, PAM Recognition & DSB Repair Engine
// Standards: Nobel Prize in Chemistry 2020 (Emmanuelle Charpentier & Jennifer A. Doudna)
// Curriculum: Vietnam GDPT 2018 (Sinh học 12 Chuyên đề: Chỉnh sửa hệ gen bằng CRISPR-Cas9; Hóa học 12: Phối trí Mg2+ tại endonuclease)

export type CasVariantType = 'SP_CAS9' | 'SA_CAS9' | 'SP_G' | 'D_CAS9';
export type DsbRepairPathway = 'NHEJ' | 'HDR';

export interface CrisprTargetSpec {
  id: string;
  name: string;
  nameVI: string;
  targetGene: string;
  organismVI: string;
  genomicLocus: string;
  targetDnaSequence5to3: string; // 30 bp sequence containing 20nt protospacer + PAM
  protospacer20nt: string;
  pamSequence: string; // e.g. 'TGG'
  pamPositionIndex: number;
  cleavageSiteIndex: number; // 3 bp upstream of PAM
  diseaseOrApplicationVI: string;
  donorTemplateSequence?: string; // For HDR
  desiredMutationVI: string;
  descriptionVI: string;
  colorHex: string;
}

export interface CasVariantSpec {
  id: CasVariantType;
  name: string;
  nameVI: string;
  sourceOrganism: string;
  aminoAcidCount: number;
  pamRequirement: string;
  ruvcActive: boolean;
  hnhActive: boolean;
  canCleaveDsb: boolean;
  descriptionVI: string;
}

export interface CrisprSimulationResult {
  target: CrisprTargetSpec;
  casVariant: CasVariantSpec;
  repairPathway: DsbRepairPathway;
  seedMismatchCount: number;
  distalMismatchCount: number;
  mgConcentrationMm: number; // Magnesium Mg2+ cofactor (typical 5-10 mM for in vitro cleavage)

  // Cleavage Kinetics & Specificity
  pamMatched: boolean;
  onTargetCleavageEfficiencyPercent: number;
  offTargetRiskPercent: number;
  cleavageResultVI: string;

  // Repair Outcome Metrics
  repairSuccessPercent: number;
  frameshiftKnockoutPercent: number; // For NHEJ
  precisionEditInsertionPercent: number; // For HDR
  repairedSequence5to3: string;

  // Structural Domain States
  ruvcDomainStatusVI: string;
  hnhDomainStatusVI: string;

  pedagogicalAnalysisVI: string;
}

// ----------------------------------------------------------------------------
// CAS VARIANTS CATALOG
// ----------------------------------------------------------------------------
export const CAS_VARIANTS_CATALOG: Record<CasVariantType, CasVariantSpec> = {
  SP_CAS9: {
    id: 'SP_CAS9',
    name: 'Wild-Type SpCas9',
    nameVI: 'SpCas9 Tự Nhiên (Streptococcus pyogenes - Chuẩn Nobel 2020)',
    sourceOrganism: 'Streptococcus pyogenes',
    aminoAcidCount: 1368,
    pamRequirement: '5\'-NGG-3\'',
    ruvcActive: true,
    hnhActive: true,
    canCleaveDsb: true,
    descriptionVI: 'Endonuclease chuẩn được Jennifer Doudna và Emmanuelle Charpentier tối ưu hóa năm 2012. Sử dụng motif PAM 5\'-NGG-3\', cắt chính xác 3 cặp base phía trước PAM bằng hai trung tâm xúc tác RuvC và HNH.',
  },

  SA_CAS9: {
    id: 'SA_CAS9',
    name: 'Compact SaCas9',
    nameVI: 'SaCas9 Kích Thước Nhỏ (Staphylococcus aureus - Tối Ưu Cho Virus AAV)',
    sourceOrganism: 'Staphylococcus aureus',
    aminoAcidCount: 1053,
    pamRequirement: '5\'-NNGRRT-3\'',
    ruvcActive: true,
    hnhActive: true,
    canCleaveDsb: true,
    descriptionVI: 'Ngắn hơn 315 axit amin so với SpCas9, kích thước nhỏ gọn cho phép đóng gói nguyên vẹn vào một hạt virus Adeno-Associated Virus (AAV) để phân phối trực tiếp vào tế bào cơ quan sống (in vivo).',
  },

  SP_G: {
    id: 'SP_G',
    name: 'Engineered SpG Cas9',
    nameVI: 'SpG Cas9 Kỹ Thuật Protein (Mở Rộng Vùng Nhận Diện PAM 5\'-NGN-3\')',
    sourceOrganism: 'Streptococcus pyogenes (Đột biến cấu trúc)',
    aminoAcidCount: 1368,
    pamRequirement: '5\'-NGN-3\'',
    ruvcActive: true,
    hnhActive: true,
    canCleaveDsb: true,
    descriptionVI: 'Biến thể đột biến miền PI (PAM-interacting domain) giúp nới lỏng yêu cầu PAM từ NGG sang NGN, tăng mật độ vị trí có thể chỉnh sửa lên gấp 4 lần trên toàn bộ bộ gen.',
  },

  D_CAS9: {
    id: 'D_CAS9',
    name: 'Catalytically Dead dCas9',
    nameVI: 'dCas9 Bất Hoạt Xúc Tác (CRISPRi / CRISPRa Điều Hòa Phiên Mã Không Cắt DNA)',
    sourceOrganism: 'S. pyogenes (D10A + H840A mutations)',
    aminoAcidCount: 1368,
    pamRequirement: '5\'-NGG-3\'',
    ruvcActive: false,
    hnhActive: false,
    canCleaveDsb: false,
    descriptionVI: 'Đột biến bất hoạt cả hai miền RuvC và HNH (D10A/H840A). dCas9 vẫn bám chặt vào trình tự mục tiêu nhờ gRNA nhưng KHÔNG cắt đứt chuỗi kép DNA, được gắn với chất ức chế KRAB hoặc hoạt hóa VP64 để điều khiển biểu hiện gen mà không làm đột biến gen.',
  },
};

// ----------------------------------------------------------------------------
// CRISPR TARGETS CATALOG
// ----------------------------------------------------------------------------
export const CRISPR_TARGETS_CATALOG: Record<string, CrisprTargetSpec> = {
  sickle_cell_hbb: {
    id: 'sickle_cell_hbb',
    name: 'Beta-Globin HBB Gene (Sickle Cell Disease / Casgevy)',
    nameVI: 'Gen Beta-Globin HBB (Liệu Pháp Gen Chữa Bệnh Hồng Cầu Hình Liềm)',
    targetGene: 'Gen HBB (Chromosome 11p15.4)',
    organismVI: 'Người (Homo sapiens)',
    genomicLocus: 'Chr11: 5,227,002 - 5,227,031',
    targetDnaSequence5to3: 'CCTGTGGGGCAAGGTGAACGTGGATGAAGT',
    protospacer20nt: 'CCTGTGGGGCAAGGTGAACG',
    pamSequence: 'TGG',
    pamPositionIndex: 20,
    cleavageSiteIndex: 17, // 3 bp upstream of PAM
    diseaseOrApplicationVI: 'Trị dứt điểm bệnh thiếu máu hồng cầu hình liềm (Liệu pháp Casgevy FDA phê duyệt 2023).',
    desiredMutationVI: 'Kích hoạt lại gen Gamma-Globin bào thai (HbF) bằng cách phá hủy vùng ức chế BCL11A.',
    descriptionVI: 'Cột mốc lịch sử của y học nhân loại khi liệu pháp gen CRISPR Casgevy được phê duyệt điều trị dứt điểm cho các bệnh nhân thiếu máu tán huyết bẩm sinh hồng cầu hình liềm và Thalassemia.',
    colorHex: '#ef4444', // Red
  },

  hiv_ccr5_knockout: {
    id: 'hiv_ccr5_knockout',
    name: 'CCR5 Co-Receptor (HIV-1 Resistance)',
    nameVI: 'Đồng Thụ Thể CCR5 (Kháng Virus Thế Kỷ HIV-1 Tự Nhiên)',
    targetGene: 'Gen CCR5 (Chromosome 3p21.31)',
    organismVI: 'Người (Tế bào miễn dịch lympho T CD4+)',
    genomicLocus: 'Chr3: 46,373,450 - 46,373,479',
    targetDnaSequence5to3: 'GTCAGTATCAATTCTGGAAGAATTTCCAGG',
    protospacer20nt: 'GTCAGTATCAATTCTGGAAG',
    pamSequence: 'AGG',
    pamPositionIndex: 20,
    cleavageSiteIndex: 17,
    diseaseOrApplicationVI: 'Tạo đột biến mất đoạn CCR5-Delta32 ngăn virus HIV xâm nhập vào tế bào lympho T.',
    desiredMutationVI: 'Đột biến dịch khung (Frameshift mutation) knockout 100% thụ thể bề mặt CCR5.',
    descriptionVI: 'Mô phỏng cơ chế miễn nhiễm tự nhiên của bệnh nhân Berlin và London được chữa khỏi hoàn toàn HIV nhờ cấy ghép tế bào tủy có đột biến đồng hợp tử CCR5-Delta32.',
    colorHex: '#8b5cf6', // Violet
  },

  golden_rice_psy: {
    id: 'golden_rice_psy',
    name: 'Golden Rice Phytoene Synthase (PSY Biofortification)',
    nameVI: 'Lúa Vàng Giàu Beta-Carotene (An Ninh Dinh Dưỡng Chống Mù Lòa)',
    targetGene: 'Promoter Gen PSY (Oryza sativa)',
    organismVI: 'Lúa thuần chủng Việt Nam (Oryza sativa L.)',
    genomicLocus: 'Chr6: 31,450,110 - 31,450,139',
    targetDnaSequence5to3: 'ATGGCTGTGGTGGCTGCTGGTACTTCCCGG',
    protospacer20nt: 'ATGGCTGTGGTGGCTGCTGG',
    pamSequence: 'CGG',
    pamPositionIndex: 20,
    cleavageSiteIndex: 17,
    diseaseOrApplicationVI: 'Chèn chính xác đoạn gen tổng hợp Provitamin A vào hạt gạo để chống suy dinh dưỡng trẻ em.',
    desiredMutationVI: 'Chèn chính xác băng biểu hiện gen PSY từ ngô nhờ cơ chế sửa chữa HDR.',
    descriptionVI: 'Ứng dụng CRISPR trong nông nghiệp chính xác thế hệ mới tại Đồng bằng Sông Cửu Long, tạo giống lúa năng suất cao, giàu vi chất carotenoid mà không mang gen chuyển dị loài từ vi khuẩn.',
    colorHex: '#f59e0b', // Amber
  },

  pd1_cancer_car_t: {
    id: 'pd1_cancer_car_t',
    name: 'PD-1 Checkpoint (CAR-T Cell Cancer Immunotherapy)',
    nameVI: 'Điểm Kiểm Soát Miễn Dịch PD-1 (Tăng Lực Tế Bào CAR-T Tiêu Diệt Ung Thư)',
    targetGene: 'Gen PDCD1 (Chromosome 2q37.3)',
    organismVI: 'Tế bào lympho T tự thân của bệnh nhân ung thư',
    genomicLocus: 'Chr2: 241,850,200 - 241,850,229',
    targetDnaSequence5to3: 'GCAGTTGTGTGACACGGAAGCGGCTACAGG',
    protospacer20nt: 'GCAGTTGTGTGACACGGAAG',
    pamSequence: 'AGG',
    pamPositionIndex: 20,
    cleavageSiteIndex: 17,
    diseaseOrApplicationVI: 'Knockout chốt ức chế miễn dịch PD-1 để khối u không thể làm tê liệt tế bào T.',
    desiredMutationVI: 'Loại bỏ hoàn toàn tín hiệu tắt miễn dịch PD-1 / PD-L1.',
    descriptionVI: 'Công nghệ kết hợp đỉnh cao giữa liệu pháp thụ thể kháng nguyên dạng khảm (CAR-T) và chỉnh sửa gen CRISPR, biến tế bào miễn dịch thành siêu chiến binh đặc nhiệm tiêu diệt tế bào u ác tính.',
    colorHex: '#10b981', // Emerald
  },
};

// ----------------------------------------------------------------------------
// CRISPR-CAS9 SIMULATION ENGINE
// ----------------------------------------------------------------------------

/**
 * Simulates target recognition, RuvC/HNH cleavage, and repair outcomes (NHEJ vs HDR)
 */
export function simulateCrisprEditing(
  targetId: string,
  casVariantId: CasVariantType = 'SP_CAS9',
  repairPathway: DsbRepairPathway = 'NHEJ',
  seedMismatchCount = 0,
  distalMismatchCount = 0,
  mgConcentrationMm = 8.0 // Optimal 8.0 mM Mg2+ for endonuclease coordination
): CrisprSimulationResult {
  const target = CRISPR_TARGETS_CATALOG[targetId] || CRISPR_TARGETS_CATALOG.sickle_cell_hbb;
  const casVariant = CAS_VARIANTS_CATALOG[casVariantId] || CAS_VARIANTS_CATALOG.SP_CAS9;

  // 1. PAM Verification
  // Check if target PAM matches variant requirement
  let pamMatched = false;
  if (casVariant.id === 'SP_CAS9' || casVariant.id === 'D_CAS9') {
    pamMatched = target.pamSequence.endsWith('GG');
  } else if (casVariant.id === 'SP_G') {
    pamMatched = target.pamSequence[1] === 'G'; // NGN
  } else if (casVariant.id === 'SA_CAS9') {
    pamMatched = true; // Adapted
  }

  // 2. Cleavage Efficiency Calculation
  // Seed region (last 10 nt near PAM): each mismatch drops efficiency by 80%
  // Distal region (first 10 nt): each mismatch drops efficiency by 15%
  // Mg2+ cofactor factor: optimum 6 - 10 mM
  const mgFactor = Math.max(0.2, 1.0 - Math.abs(mgConcentrationMm - 8.0) * 0.1);
  const seedPenalties = Math.min(1.0, seedMismatchCount * 0.85);
  const distalPenalties = Math.min(0.6, distalMismatchCount * 0.15);

  let onTargetEfficiency = 0;
  if (pamMatched && casVariant.canCleaveDsb) {
    onTargetEfficiency = Math.max(0, (1.0 - seedPenalties - distalPenalties) * 92.0 * mgFactor);
  } else if (pamMatched && !casVariant.canCleaveDsb) {
    // dCas9 binds with high affinity but 0 cleavage
    onTargetEfficiency = 0;
  }
  onTargetEfficiency = Number(onTargetEfficiency.toFixed(1));

  // Off-target risk: rises if distal mismatches exist but cleavage still proceeds
  let offTargetRisk = 0;
  if (distalMismatchCount > 0 && onTargetEfficiency > 40) {
    offTargetRisk = Number((distalMismatchCount * 8.5).toFixed(1));
  }

  // 3. Cellular Repair Outcomes (NHEJ vs HDR)
  let repairSuccess = 0;
  let frameshiftPercent = 0;
  let precisionInsertPercent = 0;
  let repairedDna = target.targetDnaSequence5to3;

  if (casVariant.canCleaveDsb && onTargetEfficiency > 10) {
    if (repairPathway === 'NHEJ') {
      // Error-prone NHEJ creates indels (> 85% frameshift knockout)
      repairSuccess = Number((onTargetEfficiency * 0.95).toFixed(1));
      frameshiftPercent = Number((repairSuccess * 0.88).toFixed(1));
      precisionInsertPercent = 0;

      // Simulate a 4 bp deletion leading to frameshift
      const cut = target.cleavageSiteIndex;
      repairedDna = target.targetDnaSequence5to3.slice(0, cut - 2) + '[Δ4bp DEL]' + target.targetDnaSequence5to3.slice(cut + 2);
    } else {
      // High-fidelity HDR requires donor DNA template (typically 20% - 40% efficiency)
      repairSuccess = Number((onTargetEfficiency * 0.38).toFixed(1));
      frameshiftPercent = Number((onTargetEfficiency * 0.45).toFixed(1)); // Remainder goes to NHEJ
      precisionInsertPercent = repairSuccess;

      const cut = target.cleavageSiteIndex;
      repairedDna = target.targetDnaSequence5to3.slice(0, cut) + '[DONOR_HDR]' + target.targetDnaSequence5to3.slice(cut);
    }
  }

  // 4. Endonuclease Catalytic Domains
  let ruvcStatus = 'Hoạt hóa (Cắt mạch không bổ sung)';
  let hnhStatus = 'Hoạt hóa (Cắt mạch bổ sung gRNA)';
  if (!casVariant.ruvcActive) ruvcStatus = 'Bị đột biến D10A bất hoạt (Không cắt)';
  if (!casVariant.hnhActive) hnhStatus = 'Bị đột biến H840A bất hoạt (Không cắt)';

  // 5. Pedagogical Summary
  let cleavageMsg = '';
  if (!pamMatched) {
    cleavageMsg = `THẤT BẠI: Trình tự PAM (${target.pamSequence}) không tương thích với biến thể ${casVariant.name}. Cas9 không thể mở xoắn kép DNA.`;
  } else if (!casVariant.canCleaveDsb) {
    cleavageMsg = `KẾT HỢP KHÔNG CẮT: ${casVariant.nameVI} bám chặt vào đích protospacer nhưng không tạo đứt gãy sợi đôi DSB. Phù hợp cho CRISPRi ức chế phiên mã.`;
  } else if (seedMismatchCount > 0) {
    cleavageMsg = `HIỆU SUẤT CỰC THẤP: Phát hiện ${seedMismatchCount} sai khác trong vùng hạt giống (Seed Region 10nt gần PAM), ngăn cản chuyển dạng cấu hình hoạt hóa endonuclease.`;
  } else {
    cleavageMsg = `THÀNH CÔNG: SpCas9 nhận diện PAM ${target.pamSequence}, mở xoắn DNA, và cắt đứt chuỗi đôi DSB tại vị trí -3 bp phía trước PAM với hiệu suất ${onTargetEfficiency}%.`;
  }

  let summary = `${target.nameVI}. Biến thể Cas: ${casVariant.name}. `;
  summary += `Phức hợp ribonucleoprotein (RNP: Cas9 + sgRNA 20nt) nhận diện vùng đích. ${cleavageMsg} `;
  if (casVariant.canCleaveDsb && onTargetEfficiency > 10) {
    if (repairPathway === 'NHEJ') {
      summary += `Cơ chế sửa chữa NHEJ (Nối đầu so le không tương đồng) chiếm ưu thế, tạo đột biến mất/thêm đoạn Indel gây dịch khung mã đọc (Frameshift ${frameshiftPercent}%), knockout thành công gen mục tiêu.`;
    } else {
      summary += `Cơ chế sửa chữa HDR (Tái tổ hợp tương đồng có khuôn mẫu Donor DNA) đạt hiệu suất ${precisionInsertPercent}%, chèn chính xác trình tự mong muốn mà không gây sẹo lỗi Indel.`;
    }
  }

  return {
    target,
    casVariant,
    repairPathway,
    seedMismatchCount,
    distalMismatchCount,
    mgConcentrationMm,
    pamMatched,
    onTargetCleavageEfficiencyPercent: onTargetEfficiency,
    offTargetRiskPercent: offTargetRisk,
    cleavageResultVI: cleavageMsg,
    repairSuccessPercent: repairSuccess,
    frameshiftKnockoutPercent: frameshiftPercent,
    precisionEditInsertionPercent: precisionInsertPercent,
    repairedSequence5to3: repairedDna,
    ruvcDomainStatusVI: ruvcStatus,
    hnhDomainStatusVI: hnhStatus,
    pedagogicalAnalysisVI: summary,
  };
}

// ----------------------------------------------------------------------------
// CARD MATCHING SERVICE FOR CRISPR-CAS9 & GENE EDITING
// ----------------------------------------------------------------------------

export function getMatchingCrisprCard(card: { id?: string; name?: string; description?: string }): CrisprTargetSpec | null {
  if (!card) return null;
  const nameLower = (card.name || '').toLowerCase();
  const idLower = (card.id || '').toLowerCase();
  const descLower = (card.description || '').toLowerCase();

  for (const target of Object.values(CRISPR_TARGETS_CATALOG)) {
    if (idLower.includes(target.id) || idLower.includes(target.targetGene.toLowerCase())) {
      return target;
    }
  }

  // Keywords
  if (nameLower.includes('sickle') || nameLower.includes('hồng cầu') || nameLower.includes('casgevy') || nameLower.includes('globin') || nameLower.includes('hbb')) {
    return CRISPR_TARGETS_CATALOG.sickle_cell_hbb;
  }
  if (nameLower.includes('ccr5') || nameLower.includes('hiv') || nameLower.includes('delta32')) {
    return CRISPR_TARGETS_CATALOG.hiv_ccr5_knockout;
  }
  if (nameLower.includes('lúa') || nameLower.includes('rice') || nameLower.includes('carotene') || nameLower.includes('psy') || nameLower.includes('nông nghiệp')) {
    return CRISPR_TARGETS_CATALOG.golden_rice_psy;
  }
  if (nameLower.includes('car-t') || nameLower.includes('pd-1') || nameLower.includes('pd1') || nameLower.includes('ung thư') || nameLower.includes('cancer')) {
    return CRISPR_TARGETS_CATALOG.pd1_cancer_car_t;
  }
  if (nameLower.includes('crispr') || nameLower.includes('cas9') || nameLower.includes('chỉnh sửa gen') || nameLower.includes('grna') || descLower.includes('crispr')) {
    return CRISPR_TARGETS_CATALOG.sickle_cell_hbb;
  }

  return null;
}
