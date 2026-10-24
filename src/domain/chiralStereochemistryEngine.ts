// src/domain/chiralStereochemistryEngine.ts
// Comprehensive Chiral Stereochemistry, CIP Rules & Polarimetry Simulation Engine for ELEMENTA
// Conforming to Vietnam GDPT 2018 Chemistry Curriculum (Chuyên đề Hóa học Lập thể 11 & 12)
// and IUPAC Gold & Blue Book Stereochemical Standards

// =============================================================================
// 1. CIP (CAHN-INGOLD-PRELOG) PRIORITY RULES & R/S DETERMINATION
// =============================================================================

export interface ChiralSubstituent {
  priority: 1 | 2 | 3 | 4; // 1 = Highest, 4 = Lowest (typically -H)
  groupFormula: string; // e.g., '-OH', '-COOH', '-CH3', '-H'
  groupNameVi: string;
  directAtomicNumberZ: number; // e.g. O: 8, C: 6, H: 1
  tieBreakerAtomsDescriptionVi: string;
}

export interface ChiralMoleculeProfile {
  id: string;
  nameVi: string;
  nameEn: string;
  formula: string;
  stereocentersCount: number;
  rOrSDesignation: 'R' | 'S' | 'MESO' | 'RACEMIC';
  substituents: ChiralSubstituent[]; // 4 groups ordered 1 to 4
  specificRotationD20: number; // [alpha]_D^20 in deg * mL / (g * dm)
  opticalSign: '(+)' | '(-)' | '(±)';
  fischerProjectionDescriptionVi: string;
  pharmacologicalBiologicalSignificanceVi: string;
  isMesoCompound: boolean;
}

export const CHIRAL_MOLECULES_CATALOG: ChiralMoleculeProfile[] = [
  {
    id: 'R_LACTIC_ACID',
    nameVi: '(R)-Axit Lactic (D-Lactic acid)',
    nameEn: '(R)-Lactic acid',
    formula: 'CH₃-CH*(OH)-COOH',
    stereocentersCount: 1,
    rOrSDesignation: 'R',
    substituents: [
      { priority: 1, groupFormula: '-OH', groupNameVi: 'Nhóm Hydroxyl', directAtomicNumberZ: 8, tieBreakerAtomsDescriptionVi: 'Oxy (Z=8) có số hiệu nguyên tử lớn nhất' },
      { priority: 2, groupFormula: '-COOH', groupNameVi: 'Nhóm Carboxyl', directAtomicNumberZ: 6, tieBreakerAtomsDescriptionVi: 'Carbon liên kết với (O, O, O) do có liên kết đôi C=O' },
      { priority: 3, groupFormula: '-CH₃', groupNameVi: 'Nhóm Methyl', directAtomicNumberZ: 6, tieBreakerAtomsDescriptionVi: 'Carbon chỉ liên kết với (H, H, H) có độ ưu tiên thấp hơn' },
      { priority: 4, groupFormula: '-H', groupNameVi: 'Nguyên tử Hydro', directAtomicNumberZ: 1, tieBreakerAtomsDescriptionVi: 'Hydro (Z=1) có số hiệu nguyên tử thấp nhất, hướng ra sau' }
    ],
    specificRotationD20: -2.6, // Levorotatory (-)
    opticalSign: '(-)',
    fischerProjectionDescriptionVi: 'Phép chiếu Fischer: Nhóm -OH ở bên phải, -COOH ở trên đỉnh, -CH3 ở đáy.',
    pharmacologicalBiologicalSignificanceVi: 'Được sinh ra trong quá trình lên men vi khuẩn lactic chua; đối quang với (S)-lactic acid sinh ra trong cơ bắp người khi vận động gắng sức.',
    isMesoCompound: false
  },
  {
    id: 'S_LACTIC_ACID',
    nameVi: '(S)-Axit Lactic (L-Lactic acid / Sarcolactic acid)',
    nameEn: '(S)-Lactic acid',
    formula: 'CH₃-CH*(OH)-COOH',
    stereocentersCount: 1,
    rOrSDesignation: 'S',
    substituents: [
      { priority: 1, groupFormula: '-OH', groupNameVi: 'Nhóm Hydroxyl', directAtomicNumberZ: 8, tieBreakerAtomsDescriptionVi: 'Oxy (Z=8) ưu tiên số 1' },
      { priority: 2, groupFormula: '-COOH', groupNameVi: 'Nhóm Carboxyl', directAtomicNumberZ: 6, tieBreakerAtomsDescriptionVi: 'Carbon carboxyl (C=O, OH) ưu tiên số 2' },
      { priority: 3, groupFormula: '-CH₃', groupNameVi: 'Nhóm Methyl', directAtomicNumberZ: 6, tieBreakerAtomsDescriptionVi: 'Carbon methyl (H, H, H) ưu tiên số 3' },
      { priority: 4, groupFormula: '-H', groupNameVi: 'Nguyên tử Hydro', directAtomicNumberZ: 1, tieBreakerAtomsDescriptionVi: 'Hydro (Z=1) ưu tiên số 4' }
    ],
    specificRotationD20: +2.6, // Dextrorotatory (+)
    opticalSign: '(+)',
    fischerProjectionDescriptionVi: 'Phép chiếu Fischer: Nhóm -OH ở bên trái, -COOH ở trên đỉnh.',
    pharmacologicalBiologicalSignificanceVi: 'Dạng đồng phân sinh lý nội sinh chủ yếu trong cơ thể người, tích tụ trong cơ khi hô hấp kị khí gây mỏi cơ.',
    isMesoCompound: false
  },
  {
    id: 'S_ALANINE',
    nameVi: '(S)-Alanine (L-Alanine)',
    nameEn: '(S)-Alanine (L-Alanine)',
    formula: 'CH₃-CH*(NH₂)-COOH',
    stereocentersCount: 1,
    rOrSDesignation: 'S',
    substituents: [
      { priority: 1, groupFormula: '-NH₂', groupNameVi: 'Nhóm Amino', directAtomicNumberZ: 7, tieBreakerAtomsDescriptionVi: 'Nitơ (Z=7) ưu tiên cao nhất' },
      { priority: 2, groupFormula: '-COOH', groupNameVi: 'Nhóm Carboxyl', directAtomicNumberZ: 6, tieBreakerAtomsDescriptionVi: 'Carbon liên kết (O, O, O)' },
      { priority: 3, groupFormula: '-CH₃', groupNameVi: 'Nhóm Methyl', directAtomicNumberZ: 6, tieBreakerAtomsDescriptionVi: 'Carbon liên kết (H, H, H)' },
      { priority: 4, groupFormula: '-H', groupNameVi: 'Nguyên tử Hydro', directAtomicNumberZ: 1, tieBreakerAtomsDescriptionVi: 'Hydro (Z=1) thấp nhất' }
    ],
    specificRotationD20: +14.6, // in 1M HCl
    opticalSign: '(+)',
    fischerProjectionDescriptionVi: 'Cấu hình L: Nhóm -NH2 ở bên trái mạch chính thẳng đứng.',
    pharmacologicalBiologicalSignificanceVi: 'Một trong 20 acid amin chuẩn cấu tạo nên tất cả protein sinh học trong mọi sinh vật sống. D-Alanine chỉ có trong thành tế bào vi khuẩn.',
    isMesoCompound: false
  },
  {
    id: 'MESO_TARTARIC_ACID',
    nameVi: 'Axit Meso-Tartaric (2R, 3S-Tartaric acid)',
    nameEn: 'Meso-Tartaric acid',
    formula: 'HOOC-CH*(OH)-CH*(OH)-COOH',
    stereocentersCount: 2,
    rOrSDesignation: 'MESO',
    substituents: [
      { priority: 1, groupFormula: '-OH', groupNameVi: 'Nhóm Hydroxyl', directAtomicNumberZ: 8, tieBreakerAtomsDescriptionVi: 'Oxy (Z=8) ưu tiên số 1' },
      { priority: 2, groupFormula: '-COOH', groupNameVi: 'Nhóm Carboxyl', directAtomicNumberZ: 6, tieBreakerAtomsDescriptionVi: 'Carbon carboxyl' },
      { priority: 3, groupFormula: '-CH(OH)COOH', groupNameVi: 'Nửa phân tử còn lại', directAtomicNumberZ: 6, tieBreakerAtomsDescriptionVi: 'Carbon chiral thứ 2' },
      { priority: 4, groupFormula: '-H', groupNameVi: 'Nguyên tử Hydro', directAtomicNumberZ: 1, tieBreakerAtomsDescriptionVi: 'Hydro thấp nhất' }
    ],
    specificRotationD20: 0.0, // Optically inactive!
    opticalSign: '(±)',
    fischerProjectionDescriptionVi: 'Có mặt phẳng đối xứng nội phân tử (sigma) chia đôi phân tử thành hai nửa đối xứng gương phản chiếu nhau.',
    pharmacologicalBiologicalSignificanceVi: 'HỢP CHẤT MESO KINH ĐIỂN (Louis Pasteur 1848): Chứa 2 tâm chiral nhưng hoàn toàn KHÔNG CÓ HOẠT TÍNH QUANG HỌC ([alpha] = 0) do hai nửa phân tử quay cực ngược chiều triệt tiêu nhau.',
    isMesoCompound: true
  },
  {
    id: 'R_THALIDOMIDE',
    nameVi: '(R)-Thalidomide (Dược phẩm trị ốm nghén)',
    nameEn: '(R)-Thalidomide',
    formula: 'C₁₃H₁₀N₂O₄',
    stereocentersCount: 1,
    rOrSDesignation: 'R',
    substituents: [
      { priority: 1, groupFormula: '-N(Phthaloyl)', groupNameVi: 'Vòng Phthalimide', directAtomicNumberZ: 7, tieBreakerAtomsDescriptionVi: 'Nitơ vòng (Z=7)' },
      { priority: 2, groupFormula: '-CO-NH-CO-', groupNameVi: 'Nhóm Carbonyl vòng glutarimide', directAtomicNumberZ: 6, tieBreakerAtomsDescriptionVi: 'Carbon gắn oxy đôi' },
      { priority: 3, groupFormula: '-CH₂-CH₂-', groupNameVi: 'Nhánh Methylene', directAtomicNumberZ: 6, tieBreakerAtomsDescriptionVi: 'Carbon no' },
      { priority: 4, groupFormula: '-H', groupNameVi: 'Hydro trung tâm chiral', directAtomicNumberZ: 1, tieBreakerAtomsDescriptionVi: 'Hydro thấp nhất' }
    ],
    specificRotationD20: +64.5,
    opticalSign: '(+)',
    fischerProjectionDescriptionVi: 'Cấu hình R tuyệt đối.',
    pharmacologicalBiologicalSignificanceVi: 'Tác dụng an thần, gây ngủ và chống nôn nghén thai kỳ an toàn, KHÔNG gây quái thai ở dạng R tinh khiết.',
    isMesoCompound: false
  },
  {
    id: 'S_THALIDOMIDE',
    nameVi: '(S)-Thalidomide (Tác nhân gây quái thai thảm họa)',
    nameEn: '(S)-Thalidomide',
    formula: 'C₁₃H₁₀N₂O₄',
    stereocentersCount: 1,
    rOrSDesignation: 'S',
    substituents: [
      { priority: 1, groupFormula: '-N(Phthaloyl)', groupNameVi: 'Vòng Phthalimide', directAtomicNumberZ: 7, tieBreakerAtomsDescriptionVi: 'Nitơ vòng (Z=7)' },
      { priority: 2, groupFormula: '-CO-NH-CO-', groupNameVi: 'Nhóm Carbonyl vòng glutarimide', directAtomicNumberZ: 6, tieBreakerAtomsDescriptionVi: 'Carbon gắn oxy đôi' },
      { priority: 3, groupFormula: '-CH₂-CH₂-', groupNameVi: 'Nhánh Methylene', directAtomicNumberZ: 6, tieBreakerAtomsDescriptionVi: 'Carbon no' },
      { priority: 4, groupFormula: '-H', groupNameVi: 'Hydro trung tâm chiral', directAtomicNumberZ: 1, tieBreakerAtomsDescriptionVi: 'Hydro thấp nhất' }
    ],
    specificRotationD20: -64.5,
    opticalSign: '(-)',
    fischerProjectionDescriptionVi: 'Cấu hình S tuyệt đối.',
    pharmacologicalBiologicalSignificanceVi: 'THẢM HỌA DƯỢC PHẨM THALIDOMIDE (1957-1961): Tác nhân gây quái thai (teratogen) cực mạnh, gắn vào protein Cereblon ức chế tân tạo mạch máu chi, gây dị tật teo cụt chi (phocomelia) ở hơn 10.000 trẻ em. Đáng chú ý: trong máu người, dạng (R) tự động chuyển hóa epimerization thành dạng (S) với chu kỳ t1/2 ~ 4-5 giờ!',
    isMesoCompound: false
  }
];

// =============================================================================
// 2. BIOT'S LAW OF POLARIMETRY & ENANTIOMERIC EXCESS (% ee)
// =============================================================================

export interface PolarimeterReading {
  moleculeNameVi: string;
  specificRotationAlpha: number; // [alpha]_D^20
  tubeLengthDecimeters: number; // l in dm (usually 1.0 or 2.0 dm)
  concentrationGPerMl: number; // c in g/mL
  enantiomericExcessPercent: number; // % ee = (|R - S| / (R + S)) * 100
  dominantEnantiomer: 'R' | 'S' | 'RACEMIC_50_50';
  observedRotationAlphaDegrees: number; // alpha = [alpha] * l * c * (ee / 100)
  directionVi: 'QUAY PHẢI (HỮU TRIỀN - Dextrorotatory +)' | 'QUAY TRÁI (TẢ TRIỀN - Levorotatory -)' | 'KHÔNG QUAY CỰC (Triệt quang)';
  eyepieceExtinctionAngleDegrees: number;
  explanationVi: string;
}

/**
 * Calculates optical rotation using Biot's Law:
 * alpha = [alpha]_D^20 * l * c * (enantiomeric_excess / 100)
 */
export function calculatePolarimeterRotation(
  moleculeId: string,
  tubeLengthDecimeters: number = 1.0,
  concentrationGPerMl: number = 0.10,
  enantiomerRatioR: number = 100 // % of R enantiomer (0 to 100%)
): PolarimeterReading {
  const molecule = CHIRAL_MOLECULES_CATALOG.find(m => m.id === moleculeId) || CHIRAL_MOLECULES_CATALOG[0];

  const safeLength = Math.max(0.1, Math.min(5.0, tubeLengthDecimeters));
  const safeConc = Math.max(0.001, Math.min(1.0, concentrationGPerMl));
  const safeR = Math.max(0, Math.min(100, enantiomerRatioR));
  const sPercent = 100 - safeR;

  // Enantiomeric excess
  const eePercent = Math.abs(safeR - sPercent);
  const dominant: 'R' | 'S' | 'RACEMIC_50_50' = safeR > 50 ? 'R' : safeR < 50 ? 'S' : 'RACEMIC_50_50';

  if (molecule.isMesoCompound) {
    return {
      moleculeNameVi: molecule.nameVi,
      specificRotationAlpha: 0.0,
      tubeLengthDecimeters: safeLength,
      concentrationGPerMl: safeConc,
      enantiomericExcessPercent: 0,
      dominantEnantiomer: 'RACEMIC_50_50',
      observedRotationAlphaDegrees: 0.0,
      directionVi: 'KHÔNG QUAY CỰC (Triệt quang)',
      eyepieceExtinctionAngleDegrees: 0.0,
      explanationVi: 'Hợp chất Meso có mặt phẳng đối xứng gương nội phân tử, không làm quay mặt phẳng ánh sáng phân cực ở mọi nồng độ.'
    };
  }

  // Pure optical rotation if 100% of current molecule
  const pureRotation = molecule.specificRotationD20 * safeLength * safeConc;

  // Actual rotation scaled by enantiomeric purity
  let observedRotation: number;
  if (molecule.rOrSDesignation === 'R') {
    // If testing R sample: positive multiplier if R dominates, negative if S dominates
    observedRotation = pureRotation * ((safeR - sPercent) / 100);
  } else {
    // If testing S sample:
    observedRotation = pureRotation * ((sPercent - safeR) / 100);
  }

  const roundedAlpha = parseFloat(observedRotation.toFixed(3));

  let directionVi: 'QUAY PHẢI (HỮU TRIỀN - Dextrorotatory +)' | 'QUAY TRÁI (TẢ TRIỀN - Levorotatory -)' | 'KHÔNG QUAY CỰC (Triệt quang)';
  if (Math.abs(roundedAlpha) < 0.005) {
    directionVi = 'KHÔNG QUAY CỰC (Triệt quang)';
  } else if (roundedAlpha > 0) {
    directionVi = 'QUAY PHẢI (HỮU TRIỀN - Dextrorotatory +)';
  } else {
    directionVi = 'QUAY TRÁI (TẢ TRIỀN - Levorotatory -)';
  }

  const explanationVi = `Theo Định luật Biot: α = [α] × l × c × (%ee / 100) = ` +
    `(${molecule.specificRotationD20}) × (${safeLength} dm) × (${safeConc} g/mL) × (${eePercent}% / 100) = ${roundedAlpha}°. ` +
    (eePercent === 0 ? 'Hỗn hợp racemic 50:50 triệt tiêu góc quay cực hoàn toàn.' : `Độ dư đối quang %ee = ${eePercent}%.`);

  return {
    moleculeNameVi: molecule.nameVi,
    specificRotationAlpha: molecule.specificRotationD20,
    tubeLengthDecimeters: safeLength,
    concentrationGPerMl: safeConc,
    enantiomericExcessPercent: eePercent,
    dominantEnantiomer: dominant,
    observedRotationAlphaDegrees: roundedAlpha,
    directionVi,
    eyepieceExtinctionAngleDegrees: roundedAlpha,
    explanationVi
  };
}
