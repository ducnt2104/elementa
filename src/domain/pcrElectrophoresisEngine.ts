// src/domain/pcrElectrophoresisEngine.ts
// Milestone 49: Polymerase Chain Reaction (PCR), Thermal Cycling & Agarose Gel Electrophoresis Engine
// Standards: Nobel Prize in Chemistry 1993 (Kary B. Mullis) & Nobel Prize in Chemistry 1948 (Arne Tiselius)
// Curriculum: Vietnam GDPT 2018 (Sinh học 10 & 12 Chuyên đề: Kỹ thuật PCR nhân bản DNA; Hóa học 12 Chuyên đề: Cấu trúc Nucleic Acid)

export interface PcrAmpliconSpec {
  id: string;
  name: string;
  nameVI: string;
  targetGene: string;
  organismVI: string;
  ampliconLengthBp: number; // Length in base pairs
  forwardPrimerSequence: string;
  reversePrimerSequence: string;
  forwardPrimerTmCelsius: number;
  reversePrimerTmCelsius: number;
  optimalAnnealingTempCelsius: number;
  expectedBandPositionPercent: number; // 0 (top/well) to 100 (bottom/fast)
  diagnosticSignificanceVI: string;
  descriptionVI: string;
  colorHex: string;
}

export interface PcrSimulationResult {
  amplicon: PcrAmpliconSpec;
  cycleCount: number; // 0 to 40 cycles
  initialCopyNumberN0: number; // e.g. 100 molecules
  reactionEfficiencyE: number; // 0.70 to 1.00 (70% to 100%)
  annealingTemperatureCelsius: number;
  mgConcentrationMm: number; // Magnesium Mg2+ cofactor (typical 1.5 - 2.5 mM)

  // Amplification Kinetics
  currentCopiesTotal: number;
  amplificationFold: number;
  theoreticalMaxCopies: number;
  cycleThresholdCt: number | null; // Cycle where signal crosses detection limit (e.g. 10^8 copies)
  isPlateauReached: boolean;

  // Thermal Profile Data (for current cycle step visualization)
  currentPhase: 'DENATURATION' | 'ANNEALING' | 'EXTENSION';
  currentPhaseTempCelsius: number;
  denaturationTempCelsius: number; // 95 °C
  extensionTempCelsius: number; // 72 °C

  // Exponential Growth Curve Points
  growthCurve: { cycle: number; copies: number; log10Copies: number }[];

  // Electrophoresis Gel Lanes
  gelLanes: {
    laneIndex: number;
    labelVI: string;
    isLadder: boolean;
    bands: { sizeBp: number; migrationPercent: number; relativeIntensity: number }[];
  }[];

  pedagogicalAnalysisVI: string;
}

// ----------------------------------------------------------------------------
// BENCHMARK DNA LADDER (100 bp - 2000 bp)
// ----------------------------------------------------------------------------
export interface LadderBand {
  sizeBp: number;
  relativeMassNg: number;
}

export const STANDARD_DNA_LADDER_BANDS: LadderBand[] = [
  { sizeBp: 2000, relativeMassNg: 40 },
  { sizeBp: 1500, relativeMassNg: 40 },
  { sizeBp: 1000, relativeMassNg: 85 }, // Reference bright band
  { sizeBp: 750, relativeMassNg: 35 },
  { sizeBp: 500, relativeMassNg: 80 },  // Reference bright band
  { sizeBp: 300, relativeMassNg: 30 },
  { sizeBp: 200, relativeMassNg: 30 },
  { sizeBp: 100, relativeMassNg: 45 },
];

/**
 * Migration formula on 1.5% Agarose Gel (Ferguson logarithmic sieving):
 * distance ~ -k * log10(bp) + constant
 */
export function calculateElectrophoresisMigration(sizeBp: number): number {
  const minBp = 80;
  const maxBp = 2500;
  const logMin = Math.log10(minBp);
  const logMax = Math.log10(maxBp);
  const logBp = Math.log10(Math.max(minBp, Math.min(maxBp, sizeBp)));

  // 15% distance at 2000bp, 88% distance at 100bp
  const fraction = (logMax - logBp) / (logMax - logMin);
  return Number((15.0 + fraction * 73.0).toFixed(1));
}

// ----------------------------------------------------------------------------
// PCR AMPLICON TARGET CATALOG
// ----------------------------------------------------------------------------
export const PCR_AMPLICON_CATALOG: Record<string, PcrAmpliconSpec> = {
  sars_cov2_n_gene: {
    id: 'sars_cov2_n_gene',
    name: 'SARS-CoV-2 N Gene (CDC RT-PCR N1)',
    nameVI: 'Gen Nucleocapsid SARS-CoV-2 (Chuẩn RT-qPCR Y Tế Phòng Dịch COVID-19)',
    targetGene: 'Gene N (Nucleocapsid)',
    organismVI: 'Virus Corona SARS-CoV-2',
    ampliconLengthBp: 72,
    forwardPrimerSequence: "5'-GAC CCC AAA ATC AGC GAA AT-3'",
    reversePrimerSequence: "5'-TCT GGT TAC TGC CAG TTG AAT CTG-3'",
    forwardPrimerTmCelsius: 58.5,
    reversePrimerTmCelsius: 59.2,
    optimalAnnealingTempCelsius: 55.0,
    expectedBandPositionPercent: 90.5,
    diagnosticSignificanceVI: 'Chẩn đoán xác định ca nhiễm COVID-19 với độ nhạy tuyệt đối trong mẫu tỵ hầu.',
    descriptionVI: 'Quy trình RT-qPCR chuẩn của Trung tâm Kiểm soát và Phòng ngừa Dịch bệnh (CDC). Đoạn khuếch đại siêu ngắn 72 bp tối ưu hóa tốc độ nhân bản và giảm thiểu ảnh hưởng của RNA bị phân mảnh.',
    colorHex: '#ef4444', // Red
  },

  human_brca1_exon11: {
    id: 'human_brca1_exon11',
    name: 'Human BRCA1 Gene (Exon 11 Screening)',
    nameVI: 'Gen Ức Chế Khối U BRCA1 (Tầm Soát Ung Thư Vú & Buồng Trứng Di Truyền)',
    targetGene: 'BRCA1 Exon 11',
    organismVI: 'Người (Homo sapiens)',
    ampliconLengthBp: 450,
    forwardPrimerSequence: "5'-GAA GTC TCT TTT TCC TTT AAT G-3'",
    reversePrimerSequence: "5'-TCT TTA GTG TGA GGC TTC TTT G-3'",
    forwardPrimerTmCelsius: 55.8,
    reversePrimerTmCelsius: 56.4,
    optimalAnnealingTempCelsius: 54.0,
    expectedBandPositionPercent: 55.0,
    diagnosticSignificanceVI: 'Phát hiện đột biến mất đoạn/thay thế trên gen BRCA1 giúp tầm soát ung thư sớm.',
    descriptionVI: 'Đoạn exon 11 mã hóa phần lớn trung tâm chức năng sửa chữa đứt gãy sợi kép DNA (Homologous Recombination). Phát hiện đột biến sớm giúp đưa ra phác đồ can thiệp y học dự phòng chính xác.',
    colorHex: '#ec4899', // Pink
  },

  gmo_soybean_35s: {
    id: 'gmo_soybean_35s',
    name: 'CaMV 35S Promoter (GMO Detection)',
    nameVI: 'Promoter 35S Virus Khảm Hoa Lơ (Giám Định Sinh Vật Biến Đổi Gen GMO)',
    targetGene: 'CaMV 35S Promoter',
    organismVI: 'Đậu nành & Ngô biến đổi gen (Roundup Ready)',
    ampliconLengthBp: 195,
    forwardPrimerSequence: "5'-GCT CCT ACA AAT GCC ATC A-3'",
    reversePrimerSequence: "5'-GAT AGT GGG ATT GTG CGT CA-3'",
    forwardPrimerTmCelsius: 56.0,
    reversePrimerTmCelsius: 57.5,
    optimalAnnealingTempCelsius: 55.0,
    expectedBandPositionPercent: 77.0,
    diagnosticSignificanceVI: 'Kiểm định chất lượng vệ sinh an toàn thực phẩm nhập khẩu và dán nhãn thực phẩm GMO.',
    descriptionVI: 'Promoter 35S từ virus súp lơ (Cauliflower Mosaic Virus) là đoạn khởi động phiên mã siêu mạnh được sử dụng phổ biến trong hầu hết các giống cây trồng chuyển gen chịu thuốc diệt cỏ glyphosate.',
    colorHex: '#10b981', // Emerald
  },

  bacterial_16s_rrna: {
    id: 'bacterial_16s_rrna',
    name: 'Bacterial 16S rRNA Universal Target',
    nameVI: 'Đoạn 16S rRNA Phổ Quát (Định Danh Vi Khuẩn & Giải Mã Hệ Vi Sinh)',
    targetGene: '16S Ribosomal RNA (V3-V4)',
    organismVI: 'Vi khuẩn E. coli, Bacillus subtilis & Probiotics',
    ampliconLengthBp: 465,
    forwardPrimerSequence: "5'-CCT ACG GGN GGC WGC AG-3'",
    reversePrimerSequence: "5'-GAC TAC HVG GGT ATC TAA TCC-3'",
    forwardPrimerTmCelsius: 57.0,
    reversePrimerTmCelsius: 58.0,
    optimalAnnealingTempCelsius: 56.0,
    expectedBandPositionPercent: 54.0,
    diagnosticSignificanceVI: 'Mã vạch sinh học (DNA Barcoding) định danh phân loại loài vi sinh vật.',
    descriptionVI: 'Gen 16S rRNA bảo tồn cao qua hàng tỷ năm tiến hóa xen kẽ với 9 vùng đa hình (V1-V9). Là công cụ nền tảng của giải trình tự metagenomics và y học hệ vi sinh đường ruột.',
    colorHex: '#3b82f6', // Blue
  },
};

// ----------------------------------------------------------------------------
// PCR & ELECTROPHORESIS KINETICS ENGINE
// ----------------------------------------------------------------------------

/**
 * Calculates exponential PCR amplification with saturation plateau:
 * N_n = N0 * (1 + E)^n / (1 + (N0 * (1 + E)^n) / N_max)
 */
export function simulatePcrAmplification(
  ampliconId: string,
  cycleCount = 30,
  initialCopies = 100,
  annealingTempCelsius = 55.0,
  mgConcentrationMm = 2.0,
  currentPhase: 'DENATURATION' | 'ANNEALING' | 'EXTENSION' = 'EXTENSION'
): PcrSimulationResult {
  const amplicon = PCR_AMPLICON_CATALOG[ampliconId] || PCR_AMPLICON_CATALOG.sars_cov2_n_gene;
  const cycles = Math.max(0, Math.min(40, cycleCount));
  const n0 = Math.max(1, initialCopies);

  // Reaction efficiency E: depends on annealing temperature mismatch and Mg2+ concentration
  // Optimum Mg2+ = 2.0 mM. If Mg2+ is too low, Taq stalls; if too high, non-specific binding occurs.
  const tempDiff = Math.abs(annealingTempCelsius - amplicon.optimalAnnealingTempCelsius);
  const tempPenalty = Math.max(0.0, 0.04 * tempDiff); // -4% per degree mismatch
  const mgPenalty = Math.abs(mgConcentrationMm - 2.0) * 0.08;
  const efficiency = Number(Math.max(0.60, Math.min(1.0, 0.98 - tempPenalty - mgPenalty)).toFixed(3));

  // Max carrying capacity (saturation due to dNTP exhaustion and Taq denaturation)
  const nMax = 2.5e11; // ~250 billion copies

  // Compute growth curve
  const growthCurve: { cycle: number; copies: number; log10Copies: number }[] = [];
  let currentCopies = n0;
  let thresholdCycle: number | null = null;
  const detectionLimit = 1e8; // Ct threshold

  for (let c = 0; c <= 40; c++) {
    // Exact logistic amplification
    const theoreticalIdeal = n0 * Math.pow(1 + efficiency, c);
    const copies = theoreticalIdeal / (1.0 + theoreticalIdeal / nMax);
    const log10 = Math.log10(Math.max(1, copies));

    if (copies >= detectionLimit && thresholdCycle === null) {
      thresholdCycle = c;
    }

    if (c <= cycles) {
      currentCopies = copies;
    }

    growthCurve.push({
      cycle: c,
      copies: Number(copies.toFixed(0)),
      log10Copies: Number(log10.toFixed(2)),
    });
  }

  const amplificationFold = Number((currentCopies / n0).toFixed(0));
  const isPlateau = currentCopies >= nMax * 0.85;

  // Thermal Profile current step
  const currentTemp =
    currentPhase === 'DENATURATION' ? 95.0 : currentPhase === 'ANNEALING' ? annealingTempCelsius : 72.0;

  // Agarose Gel Electrophoresis Simulator
  // Lane 1: Ladder
  // Lane 2: Negative Template Control (NTC - Blank)
  // Lane 3: Amplified Patient / Sample (Target band appears if cycles > 18)
  // Lane 4: Diluted sample (1/10x)
  const targetMigration = calculateElectrophoresisMigration(amplicon.ampliconLengthBp);
  const targetIntensity = Math.min(1.0, Math.max(0.0, (Math.log10(currentCopies) - 5.0) / 5.5));

  const ladderBands = STANDARD_DNA_LADDER_BANDS.map((b) => ({
    sizeBp: b.sizeBp,
    migrationPercent: calculateElectrophoresisMigration(b.sizeBp),
    relativeIntensity: b.relativeMassNg / 85.0,
  }));

  const sampleBands =
    targetIntensity > 0.05
      ? [
          {
            sizeBp: amplicon.ampliconLengthBp,
            migrationPercent: targetMigration,
            relativeIntensity: targetIntensity,
          },
        ]
      : [];

  const gelLanes = [
    {
      laneIndex: 1,
      labelVI: 'Thang DNA Ladder (100-2000 bp)',
      isLadder: true,
      bands: ladderBands,
    },
    {
      laneIndex: 2,
      labelVI: 'Chứng Âm NTC (Không có DNA mẫu)',
      isLadder: false,
      bands: [], // Must remain blank!
    },
    {
      laneIndex: 3,
      labelVI: `Mẫu Thử (${amplicon.targetGene})`,
      isLadder: false,
      bands: sampleBands,
    },
    {
      laneIndex: 4,
      labelVI: 'Mẫu Pha Loãng 1:10',
      isLadder: false,
      bands: sampleBands.map((b) => ({ ...b, relativeIntensity: b.relativeIntensity * 0.4 })),
    },
  ];

  // Pedagogical Summary
  let summary = `Khuếch đại ${amplicon.nameVI}. Mẫu ban đầu N₀ = ${n0} phân tử. `;
  summary += `Tại chu kỳ n = ${cycles}, số lượng bản sao DNA đạt ${currentCopies.toExponential(2)} (tăng gấp ${amplificationFold.toLocaleString()} lần) `;
  summary += `với hiệu suất phản ứng E = ${(efficiency * 100).toFixed(1)}%. `;
  if (thresholdCycle !== null && cycles >= thresholdCycle) {
    summary += `Chu kỳ ngưỡng phát hiện đạt được tại Ct = ${thresholdCycle} (Vượt ngưỡng phát hiện huỳnh quang 10⁸ bản sao). `;
  } else {
    summary += `Chưa đạt chu kỳ ngưỡng phát hiện Ct (cần thêm chu kỳ nạp). `;
  }
  if (isPlateau) {
    summary += `Phản ứng đã bước vào pha bão hòa (Plateau) do cạn kiệt dNTP và enzyme Taq polymerase bị suy giảm hoạt tính. `;
  } else {
    summary += `Phản ứng đang ở pha tăng trưởng hàm mũ (Exponential Phase). `;
  }
  summary += `Điện di gel agarose 1.5% xác định vạch DNA mục tiêu tại vị trí ${amplicon.ampliconLengthBp} bp, di chuyển đến ${targetMigration}% chiều dài bản gel theo điện trường từ cực âm (-) sang cực dương (+).`;

  return {
    amplicon,
    cycleCount: cycles,
    initialCopyNumberN0: n0,
    reactionEfficiencyE: efficiency,
    annealingTemperatureCelsius: annealingTempCelsius,
    mgConcentrationMm,
    currentCopiesTotal: Number(currentCopies.toFixed(0)),
    amplificationFold,
    theoreticalMaxCopies: nMax,
    cycleThresholdCt: thresholdCycle,
    isPlateauReached: isPlateau,
    currentPhase,
    currentPhaseTempCelsius: currentTemp,
    denaturationTempCelsius: 95.0,
    extensionTempCelsius: 72.0,
    growthCurve,
    gelLanes,
    pedagogicalAnalysisVI: summary,
  };
}

// ----------------------------------------------------------------------------
// CARD MATCHING SERVICE FOR PCR & NUCLEIC ACIDS
// ----------------------------------------------------------------------------

export function getMatchingPcrCard(card: { id?: string; name?: string; description?: string }): PcrAmpliconSpec | null {
  if (!card) return null;
  const nameLower = (card.name || '').toLowerCase();
  const idLower = (card.id || '').toLowerCase();
  const descLower = (card.description || '').toLowerCase();

  for (const amplicon of Object.values(PCR_AMPLICON_CATALOG)) {
    if (idLower.includes(amplicon.id) || idLower.includes(amplicon.targetGene.toLowerCase())) {
      return amplicon;
    }
  }

  // Keywords
  if (nameLower.includes('covid') || nameLower.includes('sars') || nameLower.includes('coronavirus') || nameLower.includes('nucleocapsid')) {
    return PCR_AMPLICON_CATALOG.sars_cov2_n_gene;
  }
  if (nameLower.includes('brca') || nameLower.includes('ung thư') || nameLower.includes('di truyền') || nameLower.includes('cancer')) {
    return PCR_AMPLICON_CATALOG.human_brca1_exon11;
  }
  if (nameLower.includes('gmo') || nameLower.includes('đậu nành') || nameLower.includes('biến đổi gen') || nameLower.includes('35s')) {
    return PCR_AMPLICON_CATALOG.gmo_soybean_35s;
  }
  if (nameLower.includes('16s') || nameLower.includes('vi khuẩn') || nameLower.includes('bacteria') || nameLower.includes('rrna')) {
    return PCR_AMPLICON_CATALOG.bacterial_16s_rrna;
  }
  if (nameLower.includes('pcr') || nameLower.includes('dna') || nameLower.includes('rna') || nameLower.includes('polymerase') || nameLower.includes('nucleic') || descLower.includes('pcr')) {
    return PCR_AMPLICON_CATALOG.sars_cov2_n_gene;
  }

  return null;
}
