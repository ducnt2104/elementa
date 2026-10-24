// src/domain/enzymeKineticsEngine.ts
// Milestone 43: CENTURY MILESTONE (Test Suite 100) — Enzyme Catalysis, Michaelis-Menten Kinetics, Lineweaver-Burk Double Reciprocal & Allosteric Hill Equation Engine
// Standards: IUPAC Recommendations on Enzyme Kinetics (Symbolism & Terminology), Briggs-Haldane Steady-State & Vietnam GDPT 2018 (Sinh học 10 & Hóa học 12: Động học xúc tác sinh học)

export type EnzymeInhibitionType = 'NONE' | 'COMPETITIVE' | 'UNCOMPETITIVE' | 'NON_COMPETITIVE';
export type CooperativityType = 'HYPERBOLIC' | 'POSITIVE_COOPERATIVE' | 'NEGATIVE_COOPERATIVE';

export interface EnzymeBenchmarkSpec {
  id: string;
  name: string;
  nameVI: string;
  ecNumber: string; // Enzyme Commission number (e.g. EC 1.11.1.6)
  naturalSubstrateVI: string;
  catalyzedReactionVI: string;
  kmMolar: number; // Km in M (moles / L)
  kcatPerSec: number; // kcat (turnover number) in s^-1
  specificityConstantMInvSInv: number; // kcat / Km in M^-1·s^-1
  isNearDiffusionLimit: boolean; // > 10^7 M^-1·s^-1
  optimalPh: number;
  optimalTemperatureC: number;
  typicalInhibitorVI: string;
  typicalInhibitionType: EnzymeInhibitionType;
  inhibitorKiMolar: number;
  descriptionVI: string;
  colorHex: string;
}

export interface MichaelisMentenResult {
  enzyme: EnzymeBenchmarkSpec;
  substrateConcentrationM: number;
  enzymeTotalConcentrationM: number;
  inhibitionType: EnzymeInhibitionType;
  inhibitorConcentrationM: number;
  inhibitorKiM: number;

  // Kinetic parameters
  uninhibitedVmaxUmolPerMin: number;
  uninhibitedKmMolar: number;
  apparentVmaxUmolPerMin: number;
  apparentKmMolar: number;
  kcatPerSecond: number;
  specificityConstantMInvSInv: number;

  // Initial Velocity v0
  initialVelocityUmolPerMin: number;
  saturationRatioV0OverVmax: number; // v0 / Vmax

  // Lineweaver-Burk Coordinates (1/[S] vs 1/v0)
  reciprocalSubstrateInvM: number; // 1 / [S]
  reciprocalVelocityMinPerUmol: number; // 1 / v0
  lineweaverBurkSlope: number; // Km_app / Vmax_app
  lineweaverBurkYIntercept: number; // 1 / Vmax_app
  lineweaverBurkXIntercept: number; // -1 / Km_app

  pedagogicalAnalysisVI: string;
}

export interface HillCooperativityResult {
  substrateConcentrationM: number;
  hillCoefficientH: number;
  cooperativityType: CooperativityType;
  kHalfMolar: number; // K0.5
  initialVelocityPercent: number; // v0 as % of Vmax
  hyperbolicVelocityPercent: number; // v0 if h = 1.0
  sigmoidalCooperativityGainPercent: number; // Difference at threshold
  pedagogicalInsightVI: string;
}

// ----------------------------------------------------------------------------
// BENCHMARK ENZYME CATALOG (IUPAC & BRENDA DATABASE STANDARD)
// ----------------------------------------------------------------------------
export const BENCHMARK_ENZYMES: Record<string, EnzymeBenchmarkSpec> = {
  catalase: {
    id: 'catalase',
    name: 'Catalase',
    nameVI: 'Catalase (Xúc tác hoàn hảo)',
    ecNumber: 'EC 1.11.1.6',
    naturalSubstrateVI: 'Hiđro peoxit (H2O2)',
    catalyzedReactionVI: '2 H2O2 -> 2 H2O + O2 (Phân hủy 40 triệu phân tử/giây)',
    kmMolar: 1.1e-3, // 1.1 mM
    kcatPerSec: 4.0e7, // 40,000,000 s^-1 (Highest turnover number known)
    specificityConstantMInvSInv: 3.64e10, // Catalytic perfection!
    isNearDiffusionLimit: true,
    optimalPh: 7.0,
    optimalTemperatureC: 37.0,
    typicalInhibitorVI: 'Xianua (CN-) và Azit (N3-)',
    typicalInhibitionType: 'COMPETITIVE',
    inhibitorKiMolar: 1.2e-5,
    descriptionVI: 'Enzyme đạt tới giới hạn hoàn hảo của tiến hóa sinh học (catalytic perfection). Tốc độ xúc tác bị giới hạn duy nhất bởi tốc độ khuếch tán vật lý của phân tử H2O2 va chạm vào trung tâm hoạt động chứa heme.',
    colorHex: '#ef4444', // Red
  },

  acetylcholinesterase: {
    id: 'acetylcholinesterase',
    name: 'Acetylcholinesterase',
    nameVI: 'Axetylcholinesterase (Dẫn truyền xung thần kinh)',
    ecNumber: 'EC 3.1.1.7',
    naturalSubstrateVI: 'Axetylcholin (ACh)',
    catalyzedReactionVI: 'Axetylcholin + H2O -> Cholin + Axetat',
    kmMolar: 9.0e-5, // 0.09 mM
    kcatPerSec: 1.4e4, // 14,000 s^-1
    specificityConstantMInvSInv: 1.56e8, // Diffusion-controlled
    isNearDiffusionLimit: true,
    optimalPh: 8.0,
    optimalTemperatureC: 37.0,
    typicalInhibitorVI: 'Thuốc ức chế Neostigmine & Chất độc thần kinh Sarin/VX',
    typicalInhibitionType: 'COMPETITIVE',
    inhibitorKiMolar: 5.0e-7,
    descriptionVI: 'Chấm dứt dẫn truyền xung động thần kinh tại synap trong vài phần nghìn giây. Tốc độ xúc tác tiệm cận giới hạn khuếch tán.',
    colorHex: '#3b82f6', // Blue
  },

  carbonic_anhydrase: {
    id: 'carbonic_anhydrase',
    name: 'Carbonic Anhydrase',
    nameVI: 'Cacbonic Anhyđrase (Vận chuyển CO2 hồng cầu)',
    ecNumber: 'EC 4.2.1.1',
    naturalSubstrateVI: 'Khí CO2 và H2O',
    catalyzedReactionVI: 'CO2 + H2O <=> HCO3- + H+ (Chứa Zn2+ ở tâm hoạt động)',
    kmMolar: 1.2e-2, // 12 mM
    kcatPerSec: 1.0e6, // 1,000,000 s^-1
    specificityConstantMInvSInv: 8.33e7,
    isNearDiffusionLimit: true,
    optimalPh: 7.4,
    optimalTemperatureC: 37.0,
    typicalInhibitorVI: 'Acetazolamide (Thuốc lợi tiểu và hạ nhãn áp)',
    typicalInhibitionType: 'NON_COMPETITIVE',
    inhibitorKiMolar: 7.4e-8,
    descriptionVI: 'Enzyme chứa ion kẽm Zn2+, giúp cơ thể chuyển hóa và hòa tan khí CO2 vào máu dưới dạng ion bicacbonat với tốc độ hàng triệu phân tử mỗi giây.',
    colorHex: '#10b981', // Emerald
  },

  chymotrypsin: {
    id: 'chymotrypsin',
    name: 'Chymotrypsin',
    nameVI: 'Chymotrypsin (Protease tiêu hóa dịch tụy)',
    ecNumber: 'EC 3.4.21.1',
    naturalSubstrateVI: 'Polypeptit chứa gốc thơm (Phe, Tyr, Trp)',
    catalyzedReactionVI: 'Thủy phân liên kết peptit ở đầu C của axit amin thơm',
    kmMolar: 5.0e-3, // 5 mM
    kcatPerSec: 100.0, // 100 s^-1
    specificityConstantMInvSInv: 2.0e4,
    isNearDiffusionLimit: false,
    optimalPh: 8.0,
    optimalTemperatureC: 37.0,
    typicalInhibitorVI: 'Phenylmethanesulfonyl fluoride (PMSF)',
    typicalInhibitionType: 'COMPETITIVE',
    inhibitorKiMolar: 1.5e-4,
    descriptionVI: 'Serine protease kinh điển của tuyến tụy với bộ ba xúc tác (catalytic triad: Ser195 - His57 - Asp102). Mô hình chuẩn dạy về cơ chế xúc tác cộng hóa trị và trung gian tứ diện.',
    colorHex: '#f59e0b', // Amber
  },

  lysozyme: {
    id: 'lysozyme',
    name: 'Lysozyme',
    nameVI: 'Lysozyme (Kháng khuẩn tự nhiên trong nước mắt/lòng trắng trứng)',
    ecNumber: 'EC 3.2.1.17',
    naturalSubstrateVI: 'Peptidoglycan thành tế bào vi khuẩn',
    catalyzedReactionVI: 'Thủy phân liên kết beta-1,4-glycosidic giữa NAM và NAG',
    kmMolar: 6.0e-6, // 6 uM (ái lực rất cao)
    kcatPerSec: 0.5, // 0.5 s^-1
    specificityConstantMInvSInv: 8.33e4,
    isNearDiffusionLimit: false,
    optimalPh: 5.2,
    optimalTemperatureC: 37.0,
    typicalInhibitorVI: 'N-Acetylchitotriose (Chất ức chế cạnh tranh)',
    typicalInhibitionType: 'COMPETITIVE',
    inhibitorKiMolar: 8.0e-6,
    descriptionVI: 'Enzyme đầu tiên được giải cấu trúc tinh thể học tia X độ phân giải nguyên tử (David Phillips 1965), chứng minh thuyết cảm ứng khớp vừa (induced fit) của Koshland.',
    colorHex: '#8b5cf6', // Violet
  },
};

// ----------------------------------------------------------------------------
// MICHAELIS-MENTEN & LINEWEAVER-BURK KINETIC ENGINE
// ----------------------------------------------------------------------------

/**
 * Calculates Michaelis-Menten steady-state kinetics and Lineweaver-Burk parameters:
 * v0 = (Vmax_app * [S]) / (Km_app + [S])
 * Linear Lineweaver-Burk equation: 1/v0 = (Km_app / Vmax_app) * (1/[S]) + (1 / Vmax_app)
 */
export function calculateMichaelisMenten(
  enzymeId: string,
  substrateConcentrationM: number,
  enzymeTotalM = 1.0e-7, // Default 100 nM enzyme
  inhibitorConcentrationM = 0.0,
  inhibitionType: EnzymeInhibitionType = 'NONE',
  inhibitorKiM = 1.0e-4
): MichaelisMentenResult {
  const enzyme = BENCHMARK_ENZYMES[enzymeId] || BENCHMARK_ENZYMES.catalase;

  const S = Math.max(1.0e-7, substrateConcentrationM);
  const Et = Math.max(1.0e-11, enzymeTotalM);
  const I = Math.max(0, inhibitorConcentrationM);
  const Ki = Math.max(1.0e-9, inhibitorKiM);

  // Uninhibited parameters:
  // Vmax = kcat * [E]t in mol/(L·s) -> convert to umol/(L·min) = mol/(L·s) * 60 * 10^6
  const uninhibitedVmaxUmolPerMin = enzyme.kcatPerSec * Et * 60 * 1e6;
  const uninhibitedKm = enzyme.kmMolar;

  // Inhibition correction factors
  // alpha = 1 + [I] / Ki
  const alpha = 1 + I / Ki;

  let appKm = uninhibitedKm;
  let appVmax = uninhibitedVmaxUmolPerMin;

  if (inhibitionType === 'COMPETITIVE') {
    // Competitive: Km increases, Vmax is unchanged
    appKm = uninhibitedKm * alpha;
    appVmax = uninhibitedVmaxUmolPerMin;
  } else if (inhibitionType === 'UNCOMPETITIVE') {
    // Uncompetitive: Both Km and Vmax decrease by the same factor
    appKm = uninhibitedKm / alpha;
    appVmax = uninhibitedVmaxUmolPerMin / alpha;
  } else if (inhibitionType === 'NON_COMPETITIVE') {
    // Pure Non-Competitive: Vmax decreases, Km is unchanged
    appKm = uninhibitedKm;
    appVmax = uninhibitedVmaxUmolPerMin / alpha;
  }

  // Rate equation v0
  const v0 = (appVmax * S) / (appKm + S);
  const saturationRatio = Number((v0 / appVmax).toFixed(4));

  // Lineweaver-Burk coordinates: 1/[S] and 1/v0
  const invS = Number((1 / S).toFixed(2));
  const invV0 = v0 > 0 ? Number((1 / v0).toExponential(4)) : 0;
  const slope = Number((appKm / appVmax).toExponential(4));
  const yIntercept = Number((1 / appVmax).toExponential(4));
  const xIntercept = Number((-1 / appKm).toFixed(2));

  // Pedagogical Analysis
  let analysis = `${enzyme.nameVI} xúc tác phản ứng với cơ chất [S] = ${(S * 1000).toFixed(3)} mM. `;
  if (inhibitionType === 'NONE' || I === 0) {
    analysis += `Trạng thái không có chất ức chế: Vmax = ${appVmax.toFixed(1)} μmol/min, Km = ${(appKm * 1000).toFixed(3)} mM. Khi [S] = Km, tốc độ v0 đạt đúng một nửa Vmax (50% bão hòa).`;
  } else if (inhibitionType === 'COMPETITIVE') {
    analysis += `Ức chế cạnh tranh: Chất ức chế tranh chấp trung tâm hoạt động với cơ chất. Km biểu kiến tăng lên ${(appKm * 1000).toFixed(3)} mM (ái lực giảm), nhưng Vmax không đổi (${appVmax.toFixed(1)} μmol/min) vì nồng độ cơ chất rất cao có thể đánh bật hoàn toàn chất ức chế. Trên đồ thị Lineweaver-Burk, các đường thẳng cắt nhau trên trục tung 1/Vmax.`;
  } else if (inhibitionType === 'UNCOMPETITIVE') {
    analysis += `Ức chế phi cạnh tranh (Uncompetitive): Chất ức chế chỉ gắn vào phức hợp [ES], làm giảm đồng thời cả Vmax (${appVmax.toFixed(1)}) và Km (${(appKm * 1000).toFixed(3)} mM). Trên đồ thị Lineweaver-Burk, các đường thẳng song song hoàn toàn.`;
  } else if (inhibitionType === 'NON_COMPETITIVE') {
    analysis += `Ức chế không cạnh tranh (Non-competitive): Chất ức chế gắn vào vị trí dị lập thể (allosteric) làm giảm Vmax xuống ${appVmax.toFixed(1)} μmol/min nhưng giữ nguyên Km (${(appKm * 1000).toFixed(3)} mM). Trên đồ thị Lineweaver-Burk, các đường thẳng cắt nhau trên trục hoành -1/Km.`;
  }

  return {
    enzyme,
    substrateConcentrationM: S,
    enzymeTotalConcentrationM: Et,
    inhibitionType,
    inhibitorConcentrationM: I,
    inhibitorKiM: Ki,
    uninhibitedVmaxUmolPerMin: Number(uninhibitedVmaxUmolPerMin.toFixed(2)),
    uninhibitedKmMolar: uninhibitedKm,
    apparentVmaxUmolPerMin: Number(appVmax.toFixed(2)),
    apparentKmMolar: Number(appKm.toExponential(4)),
    kcatPerSecond: enzyme.kcatPerSec,
    specificityConstantMInvSInv: enzyme.specificityConstantMInvSInv,
    initialVelocityUmolPerMin: Number(v0.toFixed(2)),
    saturationRatioV0OverVmax: saturationRatio,
    reciprocalSubstrateInvM: invS,
    reciprocalVelocityMinPerUmol: Number(invV0),
    lineweaverBurkSlope: Number(slope),
    lineweaverBurkYIntercept: Number(yIntercept),
    lineweaverBurkXIntercept: xIntercept,
    pedagogicalAnalysisVI: analysis,
  };
}

// ----------------------------------------------------------------------------
// ALLOSTERIC COOPERATIVITY & HILL EQUATION ENGINE
// ----------------------------------------------------------------------------

/**
 * Calculates Allosteric Hill Equation for cooperative multi-subunit enzymes:
 * v0 / Vmax = [S]^h / (K0.5^h + [S]^h)
 * h > 1: Positive cooperativity (Sigmoidal S-curve)
 * h = 1: Non-cooperative hyperbolic (Michaelis-Menten)
 * h < 1: Negative cooperativity
 */
export function calculateHillCooperativity(
  substrateConcentrationM: number,
  hillCoefficientH = 2.8, // Default Hemoglobin-like cooperativity h = 2.8
  kHalfMolar = 1.0e-3
): HillCooperativityResult {
  const S = Math.max(1.0e-7, substrateConcentrationM);
  const h = Math.max(0.5, Math.min(6.0, hillCoefficientH));
  const K05 = Math.max(1.0e-6, kHalfMolar);

  // Hill rate fraction v0 / Vmax
  const sPowH = Math.pow(S, h);
  const kPowH = Math.pow(K05, h);
  const vFraction = sPowH / (kPowH + sPowH);
  const velocityPercent = Number((vFraction * 100).toFixed(2));

  // Hyperbolic standard (h = 1.0)
  const hypFraction = S / (K05 + S);
  const hypPercent = Number((hypFraction * 100).toFixed(2));

  const diffPercent = Number((velocityPercent - hypPercent).toFixed(2));

  let coopType: CooperativityType = 'HYPERBOLIC';
  let insight = 'Hệ số Hill h = 1.0: Động học hyperbolic chuẩn Michaelis-Menten, các vị trí hoạt động hoạt động độc lập.';

  if (h > 1.05) {
    coopType = 'POSITIVE_COOPERATIVE';
    insight = `Hệ số Hill h = ${h.toFixed(1)} > 1: Tương tác hợp tác dương (Positive Cooperativity). Khi phân tử cơ chất đầu tiên gắn vào, nó kích hoạt chuyển đổi cấu hình dị lập thể (allosteric R-state) làm tăng mạnh ái lực của các tiểu đơn vị kế tiếp, tạo đường cong sigmoidal hình chữ S cực nhạy cảm với biến thiên nồng độ cơ chất.`;
  } else if (h < 0.95) {
    coopType = 'NEGATIVE_COOPERATIVE';
    insight = `Hệ số Hill h = ${h.toFixed(1)} < 1: Hợp tác âm (Negative Cooperativity). Sự gắn cơ chất đầu tiên làm giảm ái lực của các vị trí còn lại.`;
  }

  return {
    substrateConcentrationM: S,
    hillCoefficientH: Number(h.toFixed(2)),
    cooperativityType: coopType,
    kHalfMolar: K05,
    initialVelocityPercent: velocityPercent,
    hyperbolicVelocityPercent: hypPercent,
    sigmoidalCooperativityGainPercent: diffPercent,
    pedagogicalInsightVI: insight,
  };
}

// ----------------------------------------------------------------------------
// CARD MATCHING FOR ENZYMES & BIOLOGICAL CATALYSTS
// ----------------------------------------------------------------------------

export function getMatchingEnzymeSpec(card: { id?: string; name?: string }): EnzymeBenchmarkSpec | null {
  if (!card) return null;
  const nameLower = (card.name || '').toLowerCase();
  const idLower = (card.id || '').toLowerCase();

  for (const enz of Object.values(BENCHMARK_ENZYMES)) {
    const idE = enz.id.toLowerCase();
    const nameE = enz.name.toLowerCase();

    if (idLower === idE || idLower.includes(`_${idE}`) || idLower.includes(`card_${idE}`)) {
      return enz;
    }

    if (nameLower.includes(nameE) || nameLower.includes(enz.nameVI.toLowerCase())) {
      return enz;
    }
  }

  // Keywords
  if (nameLower.includes('catalase') || nameLower.includes('h2o2') || nameLower.includes('peoxit')) {
    return BENCHMARK_ENZYMES.catalase;
  }
  if (nameLower.includes('cholin') || nameLower.includes('thần kinh') || nameLower.includes('synap')) {
    return BENCHMARK_ENZYMES.acetylcholinesterase;
  }
  if (nameLower.includes('carbonic') || nameLower.includes('anhyđrase') || nameLower.includes('co2')) {
    return BENCHMARK_ENZYMES.carbonic_anhydrase;
  }
  if (nameLower.includes('chymotrypsin') || nameLower.includes('protease') || nameLower.includes('peptit')) {
    return BENCHMARK_ENZYMES.chymotrypsin;
  }
  if (nameLower.includes('lysozyme') || nameLower.includes('kháng khuẩn')) {
    return BENCHMARK_ENZYMES.lysozyme;
  }

  return null;
}
