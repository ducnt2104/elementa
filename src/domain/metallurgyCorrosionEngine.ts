// src/domain/metallurgyCorrosionEngine.ts
// Comprehensive Metallurgy, Metal Reactivity Series (Electrochemical Series) & Corrosion Engine
// Strictly conforming to Vietnam GDPT 2018 Chemistry 12 (Chủ đề 6: Đại cương về kim loại & Ăn mòn kim loại) & IUPAC Standards

export interface RedoxCoupleDef {
  oxidizedForm: string; // e.g. "Fe2+", "Cu2+"
  reducedForm: string; // e.g. "Fe", "Cu"
  standardPotentialE0Volts: number; // E0 vs SHE at 298K
  elementSymbol: string;
  elementNameVI: string;
  reactivityRank: number; // 1 = Strongest reducing agent (K), 16 = Weakest (Au)
  reductionMethodVI: 'DIEN_PHAN_NONG_CHAY' | 'NHIET_LUYEN_HOAC_THUY_LUYEN' | 'THUY_LUYEN_HOAC_DIEN_PHAN_DD';
  corrosionSusceptibilityVI: string;
}

export interface AlphaRuleReactionResult {
  oxidantCouple: RedoxCoupleDef;
  reductantCouple: RedoxCoupleDef;
  isReactionSpontaneous: boolean;
  standardCellEmfE0Volts: number; // E0 = E0_ox - E0_red
  gibbsFreeEnergyDeltaG0Kj: number;
  electronCount: number;
  balancedEquationVI: string;
  pedagogicalRationaleVI: string;
}

export interface CorrosionSimulationParams {
  metalAnodeOrCouple1: string; // e.g. "Fe"
  metalCouple2?: string; // e.g. "Zn" (galvanic), "Sn" (tin plate), "C" (cast iron/carbon steel), or "NONE"
  environmentType: 'DRY_AIR' | 'PURE_WATER' | 'ACID_DILUTE' | 'SALINE_SEAWATER';
  hasDirectElectricalContact: boolean;
}

export interface CorrosionSimulationResult {
  corrosionType: 'KHONG_AN_MON' | 'AN_MON_HOA_HOC' | 'AN_MON_DIEN_HOA';
  anodeMetalVI: string;
  anodeReactionVI: string;
  cathodeReactionVI: string;
  corrosionRateScore: number; // 0 to 100
  isSacrificialProtectionActive: boolean;
  protectedMetalVI?: string;
  visualPhenomenonVI: string;
  pedagogicalRationaleVI: string;
  curriculumExamTipVI: string;
}

// ----------------------------------------------------------------------------
// 1. ELECTROCHEMICAL SERIES CATALOG (GDPT 2018 Grade 12 Standard)
// ----------------------------------------------------------------------------
export const ELECTROCHEMICAL_SERIES: RedoxCoupleDef[] = [
  {
    oxidizedForm: 'K+',
    reducedForm: 'K',
    standardPotentialE0Volts: -2.93,
    elementSymbol: 'K',
    elementNameVI: 'Kali',
    reactivityRank: 1,
    reductionMethodVI: 'DIEN_PHAN_NONG_CHAY',
    corrosionSusceptibilityVI: 'Phản ứng nổ mãnh liệt với nước, bị oxi hóa tức thì trong không khí.'
  },
  {
    oxidizedForm: 'Na+',
    reducedForm: 'Na',
    standardPotentialE0Volts: -2.71,
    elementSymbol: 'Na',
    elementNameVI: 'Natri',
    reactivityRank: 2,
    reductionMethodVI: 'DIEN_PHAN_NONG_CHAY',
    corrosionSusceptibilityVI: 'Cháy trong không khí tạo ngọn lửa vàng, phản ứng mãnh liệt với nước.'
  },
  {
    oxidizedForm: 'Mg2+',
    reducedForm: 'Mg',
    standardPotentialE0Volts: -2.37,
    elementSymbol: 'Mg',
    elementNameVI: 'Magie',
    reactivityRank: 3,
    reductionMethodVI: 'DIEN_PHAN_NONG_CHAY',
    corrosionSusceptibilityVI: 'Cháy sáng chói trong không khí, khử được CO2 ở nhiệt độ cao.'
  },
  {
    oxidizedForm: 'Al3+',
    reducedForm: 'Al',
    standardPotentialE0Volts: -1.66,
    elementSymbol: 'Al',
    elementNameVI: 'Nhôm',
    reactivityRank: 4,
    reductionMethodVI: 'DIEN_PHAN_NONG_CHAY',
    corrosionSusceptibilityVI: 'Có màng oxit Al2O3 mỏng mịn bền vững bảo vệ bề mặt ngăn ăn mòn.'
  },
  {
    oxidizedForm: 'Zn2+',
    reducedForm: 'Zn',
    standardPotentialE0Volts: -0.76,
    elementSymbol: 'Zn',
    elementNameVI: 'Kẽm',
    reactivityRank: 5,
    reductionMethodVI: 'NHIET_LUYEN_HOAC_THUY_LUYEN',
    corrosionSusceptibilityVI: 'Kim loại hy sinh kinh điển dùng tráng tôn hoặc gắn vào vỏ tàu thép để chống ăn mòn.'
  },
  {
    oxidizedForm: 'Fe2+',
    reducedForm: 'Fe',
    standardPotentialE0Volts: -0.44,
    elementSymbol: 'Fe',
    elementNameVI: 'Sắt (Fe2+/Fe)',
    reactivityRank: 6,
    reductionMethodVI: 'NHIET_LUYEN_HOAC_THUY_LUYEN',
    corrosionSusceptibilityVI: 'Bị ăn mòn điện hóa mạnh nhất trong môi trường không khí ẩm tạo gỉ xốp Fe2O3.xH2O.'
  },
  {
    oxidizedForm: 'Ni2+',
    reducedForm: 'Ni',
    standardPotentialE0Volts: -0.26,
    elementSymbol: 'Ni',
    elementNameVI: 'Niken',
    reactivityRank: 7,
    reductionMethodVI: 'NHIET_LUYEN_HOAC_THUY_LUYEN',
    corrosionSusceptibilityVI: 'Bền với không khí và nước nhờ màng oxit thụ động.'
  },
  {
    oxidizedForm: 'Sn2+',
    reducedForm: 'Sn',
    standardPotentialE0Volts: -0.14,
    elementSymbol: 'Sn',
    elementNameVI: 'Thiếc',
    reactivityRank: 8,
    reductionMethodVI: 'NHIET_LUYEN_HOAC_THUY_LUYEN',
    corrosionSusceptibilityVI: 'Dùng mạ sắt tây (đồ hộp), nhưng khi bị xước sắt sẽ bị ăn mòn nhanh hơn!'
  },
  {
    oxidizedForm: 'Pb2+',
    reducedForm: 'Pb',
    standardPotentialE0Volts: -0.13,
    elementSymbol: 'Pb',
    elementNameVI: 'Chì',
    reactivityRank: 9,
    reductionMethodVI: 'NHIET_LUYEN_HOAC_THUY_LUYEN',
    corrosionSusceptibilityVI: 'Màng sunfat PbSO4 hoặc oxit bảo vệ bề mặt trong môi trường axit sunfuric.'
  },
  {
    oxidizedForm: '2H+',
    reducedForm: 'H2',
    standardPotentialE0Volts: 0.00,
    elementSymbol: 'H',
    elementNameVI: 'Hiđro (Điện cực chuẩn)',
    reactivityRank: 10,
    reductionMethodVI: 'THUY_LUYEN_HOAC_DIEN_PHAN_DD',
    corrosionSusceptibilityVI: 'Mốc phân định kim loại đứng trước H tan được trong axit loãng giải phóng H2.'
  },
  {
    oxidizedForm: 'Cu2+',
    reducedForm: 'Cu',
    standardPotentialE0Volts: +0.34,
    elementSymbol: 'Cu',
    elementNameVI: 'Đồng',
    reactivityRank: 11,
    reductionMethodVI: 'THUY_LUYEN_HOAC_DIEN_PHAN_DD',
    corrosionSusceptibilityVI: 'Không tan trong axit HCl/H2SO4 loãng; bị ăn mòn trong không khí ẩm tạo lớp gỉ xanh CuCO3.Cu(OH)2.'
  },
  {
    oxidizedForm: 'Fe3+',
    reducedForm: 'Fe2+',
    standardPotentialE0Volts: +0.77,
    elementSymbol: 'Fe_III',
    elementNameVI: 'Sắt(III) (Fe3+/Fe2+)',
    reactivityRank: 12,
    reductionMethodVI: 'THUY_LUYEN_HOAC_DIEN_PHAN_DD',
    corrosionSusceptibilityVI: 'Tính oxi hóa mạnh, hòa tan được kim loại Cu (Cu + 2FeCl3 -> CuCl2 + 2FeCl2).'
  },
  {
    oxidizedForm: 'Ag+',
    reducedForm: 'Ag',
    standardPotentialE0Volts: +0.80,
    elementSymbol: 'Ag',
    elementNameVI: 'Bạc',
    reactivityRank: 13,
    reductionMethodVI: 'THUY_LUYEN_HOAC_DIEN_PHAN_DD',
    corrosionSusceptibilityVI: 'Bị hóa đen khi tiếp xúc với H2S trong không khí ẩm tạo màng Ag2S màu đen.'
  },
  {
    oxidizedForm: 'Au3+',
    reducedForm: 'Au',
    standardPotentialE0Volts: +1.50,
    elementSymbol: 'Au',
    elementNameVI: 'Vàng',
    reactivityRank: 14,
    reductionMethodVI: 'THUY_LUYEN_HOAC_DIEN_PHAN_DD',
    corrosionSusceptibilityVI: 'Kim loại quý hoàn toàn trơ, chỉ tan trong nước cường toan (hỗn hợp 3 HCl + 1 HNO3).'
  }
];

// ----------------------------------------------------------------------------
// 2. ALPHA RULE REDOX PREDICTOR
// ----------------------------------------------------------------------------
export function predictAlphaRuleRedox(params: {
  oxidantCoupleSymbol: string; // e.g. "Cu" for Cu2+/Cu
  reductantCoupleSymbol: string; // e.g. "Fe" for Fe2+/Fe
}): AlphaRuleReactionResult {
  const oxCouple = ELECTROCHEMICAL_SERIES.find(c => c.elementSymbol === params.oxidantCoupleSymbol);
  const redCouple = ELECTROCHEMICAL_SERIES.find(c => c.elementSymbol === params.reductantCoupleSymbol);

  if (!oxCouple || !redCouple) {
    throw new Error('Không tìm thấy cặp oxi hóa khử tương ứng trong dãy điện hóa.');
  }

  // Cell potential: E0_cell = E0_cathode (ox couple) - E0_anode (red couple)
  const cellEmf = Math.round((oxCouple.standardPotentialE0Volts - redCouple.standardPotentialE0Volts) * 100) / 100;
  const isSpontaneous = cellEmf > 0;
  const n = 2; // Assume 2-electron transfer for main pairs
  const deltaG0 = Math.round(-n * 96.485 * cellEmf * 10) / 10;

  let eqVI: string;
  let rationaleVI: string;

  if (isSpontaneous) {
    eqVI = `${redCouple.reducedForm} + ${oxCouple.oxidizedForm} → ${redCouple.oxidizedForm} + ${oxCouple.reducedForm}`;
    rationaleVI = `Phản ứng xảy ra tự phát theo QUY TẮC α: Chất oxi hóa mạnh hơn (${oxCouple.oxidizedForm}, E° = ${oxCouple.standardPotentialE0Volts}V) oxi hóa chất khử mạnh hơn (${redCouple.reducedForm}, E° = ${redCouple.standardPotentialE0Volts}V) tạo chất oxi hóa yếu hơn và chất khử yếu hơn. Suất điện động chuẩn E°_pin = ${cellEmf} V > 0 (ΔG° = ${deltaG0} kJ).`;
  } else {
    eqVI = `${redCouple.reducedForm} + ${oxCouple.oxidizedForm} ↛ Không xảy ra ở điều kiện chuẩn`;
    rationaleVI = `Phản ứng KHÔNG xảy ra do vi phạm quy tắc α (Suất điện động E° = ${cellEmf} V < 0). ${redCouple.reducedForm} có tính khử yếu hơn ${oxCouple.reducedForm}, không thể tự khử được ${oxCouple.oxidizedForm}.`;
  }

  return {
    oxidantCouple: oxCouple,
    reductantCouple: redCouple,
    isReactionSpontaneous: isSpontaneous,
    standardCellEmfE0Volts: cellEmf,
    gibbsFreeEnergyDeltaG0Kj: deltaG0,
    electronCount: n,
    balancedEquationVI: eqVI,
    pedagogicalRationaleVI: rationaleVI
  };
}

// ----------------------------------------------------------------------------
// 3. CORROSION MECHANISM SIMULATOR (CHEMICAL VS ELECTROCHEMICAL)
// ----------------------------------------------------------------------------
export function simulateCorrosionMechanism(params: CorrosionSimulationParams): CorrosionSimulationResult {
  const { metalAnodeOrCouple1, metalCouple2, environmentType, hasDirectElectricalContact } = params;

  // Case 1: Dry Air -> Pure Chemical Corrosion (or no corrosion if noble)
  if (environmentType === 'DRY_AIR') {
    if (metalAnodeOrCouple1 === 'Au' || metalAnodeOrCouple1 === 'Ag') {
      return {
        corrosionType: 'KHONG_AN_MON',
        anodeMetalVI: 'Kim loại quý',
        anodeReactionVI: 'Không phản ứng',
        cathodeReactionVI: 'Không phản ứng',
        corrosionRateScore: 0,
        isSacrificialProtectionActive: false,
        visualPhenomenonVI: 'Bề mặt kim loại sáng bóng hoàn toàn, không có biến đổi hóa học.',
        pedagogicalRationaleVI: 'Vàng và bạc là kim loại quý có thế điện cực rất dương, trơ với oxi khô ở nhiệt độ phòng.',
        curriculumExamTipVI: 'Kim loại trơ không bị ăn mòn hóa học ở điều kiện thường.'
      };
    }

    return {
      corrosionType: 'AN_MON_HOA_HOC',
      anodeMetalVI: metalAnodeOrCouple1,
      anodeReactionVI: `2 ${metalAnodeOrCouple1} + O₂ (khô, t°) → 2 ${metalAnodeOrCouple1}O (Truyền e trực tiếp)`,
      cathodeReactionVI: 'O₂ nhận electron trực tiếp trên bề mặt kim loại',
      corrosionRateScore: 15,
      isSacrificialProtectionActive: false,
      visualPhenomenonVI: 'Bề mặt kim loại xỉn màu dần do hình thành màng oxit khô, không phát sinh dòng điện.',
      pedagogicalRationaleVI: 'Ăn mòn hóa học: Các electron của kim loại được chuyển trực tiếp đến chất oxi hóa trong môi trường, không tạo thành vi pin ganvani.',
      curriculumExamTipVI: 'Đặc điểm ăn mòn hóa học: KHÔNG phát sinh dòng điện; nhiệt độ càng cao tốc độ ăn mòn càng nhanh.'
    };
  }

  // Case 2: Pure Water (Poor electrolyte)
  if (environmentType === 'PURE_WATER') {
    return {
      corrosionType: 'AN_MON_HOA_HOC',
      anodeMetalVI: metalAnodeOrCouple1,
      anodeReactionVI: `${metalAnodeOrCouple1} + H₂O ⇌ ${metalAnodeOrCouple1}(OH)ₙ (Rất chậm)`,
      cathodeReactionVI: 'H₂O nhận electron rất yếu',
      corrosionRateScore: 5,
      isSacrificialProtectionActive: false,
      visualPhenomenonVI: 'Nước cất tinh khiết không dẫn điện, tốc độ ăn mòn cực kỳ chậm gần như không đáng kể.',
      pedagogicalRationaleVI: 'Thiếu dung dịch chất điện li dẫn điện tốt nên không thỏa mãn điều kiện ăn mòn điện hóa.',
      curriculumExamTipVI: 'Sắt ngâm trong nước cất không có không khí sẽ KHÔNG bị gỉ.'
    };
  }

  // Case 3: Acid or Saline Environment -> Potential Electrochemical Corrosion!
  // Check 3 conditions of electrochemical corrosion:
  // 1. Two different electrodes (e.g. Fe and Zn, Fe and C, Fe and Cu)
  // 2. Direct or indirect electrical contact
  // 3. Immersed in an electrolyte solution (ACID_DILUTE or SALINE_SEAWATER)
  const isBimetallic = metalCouple2 && metalCouple2 !== 'NONE' && metalCouple2 !== metalAnodeOrCouple1;
  const isElectrochemical = isBimetallic && hasDirectElectricalContact;

  if (!isElectrochemical) {
    // Single metal in acid or saline -> Chemical or micro-galvanic
    return {
      corrosionType: 'AN_MON_HOA_HOC',
      anodeMetalVI: metalAnodeOrCouple1,
      anodeReactionVI: `${metalAnodeOrCouple1} → ${metalAnodeOrCouple1}²⁺ + 2e⁻`,
      cathodeReactionVI: environmentType === 'ACID_DILUTE' ? '2H⁺ + 2e⁻ → H₂↑' : 'O₂ + 2H₂O + 4e⁻ → 4OH⁻',
      corrosionRateScore: environmentType === 'ACID_DILUTE' ? 45 : 30,
      isSacrificialProtectionActive: false,
      visualPhenomenonVI: environmentType === 'ACID_DILUTE'
        ? 'Kim loại tan dần, có bọt khí H₂ sủi lên bám trên bề mặt kim loại làm cản trở phản ứng tiếp diễn.'
        : 'Hình thành lớp gỉ sắt phân tán chậm trong dung dịch nước muối.',
      pedagogicalRationaleVI: 'Không có cặp điện cực tiếp xúc nên phản ứng diễn ra theo cơ chế ăn mòn hóa học đơn thuần, bọt khí H₂ thoát ra chậm do quá thế hiđro cao trên bề mặt kim loại nguyên chất.',
      curriculumExamTipVI: 'Thí nghiệm kinh điển: Sắt nguyên chất tác dụng với axit H2SO4 loãng giải phóng H2 rất chậm. Nhỏ thêm vài giọt CuSO4 thì H2 thoát ra mãnh liệt do chuyển sang ăn mòn điện hóa!'
    };
  }

  // BIMETALLIC PAIR PRESENT IN ELECTROLYTE WITH ELECTRICAL CONTACT:
  // Determine which metal is more reactive (Anode) and which is Cathode
  const couple1 = ELECTROCHEMICAL_SERIES.find(c => c.elementSymbol === metalAnodeOrCouple1);
  const couple2 = ELECTROCHEMICAL_SERIES.find(c => c.elementSymbol === metalCouple2);

  // Carbon (C) in cast iron / steel has positive potential (~ +0.2V)
  const e1 = couple1 ? couple1.standardPotentialE0Volts : -0.44; // default Fe
  const e2 = metalCouple2 === 'C' ? +0.20 : (couple2 ? couple2.standardPotentialE0Volts : 0.0);

  let anodeSymbol: string;
  let cathodeSymbol: string;
  let isSacrificial: boolean = false;
  let protectedMetal: string | undefined = undefined;

  if (e1 < e2) {
    // Metal 1 is more negative -> Anode (dissolves!)
    anodeSymbol = metalAnodeOrCouple1;
    cathodeSymbol = metalCouple2!;
    if (metalAnodeOrCouple1 === 'Zn' && metalCouple2 === 'Fe') {
      isSacrificial = true;
      protectedMetal = 'Sắt (Vỏ tàu biển Fe)';
    }
  } else {
    // Metal 2 is more negative -> Anode (dissolves!)
    anodeSymbol = metalCouple2!;
    cathodeSymbol = metalAnodeOrCouple1;
    if (metalCouple2 === 'Zn' && metalAnodeOrCouple1 === 'Fe') {
      isSacrificial = true;
      protectedMetal = 'Sắt (Vỏ tàu biển Fe)';
    }
  }

  const anodeRxn = `Cực âm (Anode): ${anodeSymbol} bị oxi hóa mãnh liệt: ${anodeSymbol} → ${anodeSymbol}ⁿ⁺ + ne⁻`;
  const cathodeRxn = environmentType === 'ACID_DILUTE'
    ? `Cực dương (Cathode - ${cathodeSymbol}): 2H⁺ + 2e⁻ → H₂↑ (Bọt khí H₂ thoát ra xối xả trên bề mặt ${cathodeSymbol})`
    : `Cực dương (Cathode - ${cathodeSymbol}): O₂ + 2H₂O + 4e⁻ → 4OH⁻ (Khử oxi hòa tan trong nước biển)`;

  let examTip = '';
  if (anodeSymbol === 'Zn' && (cathodeSymbol === 'Fe' || cathodeSymbol === 'Cu')) {
    examTip = 'BẢO VỆ ĐIỆN HÓA BẰNG KIM LOẠI HY SINH: Kẽm (Zn) có tính khử mạnh hơn Sắt (Fe), do đó Zn bị ăn mòn hy sinh, bảo vệ sắt thép hoàn toàn không bị gỉ trong nước biển!';
  } else if (anodeSymbol === 'Fe' && cathodeSymbol === 'Sn') {
    examTip = 'BẪY SẮT TÂY MẠ THIẾC (Fe-Sn): Thiếc trơ bảo vệ sắt, nhưng khi hộp sắt tây bị trầy xước, Fe có tính khử mạnh hơn Sn nên Fe đóng vai trò ANODE và bị ăn mòn NHANH HƠN CẢ SẮT THƯỜNG!';
  } else if (anodeSymbol === 'Fe' && cathodeSymbol === 'Cu') {
    examTip = 'CẶP Fe-Cu KINH ĐIỂN: Thêm vài giọt CuSO4 vào bình Fe + H2SO4 tạo vi pin điện hóa Fe-Cu, sắt tan nhanh gấp 10 lần và khí H2 sủi bọt mãnh liệt trên lá đồng!';
  } else {
    examTip = 'Thỏa mãn đủ 3 điều kiện ăn mòn điện hóa: Phát sinh dòng điện tự phát, kim loại có tính khử mạnh hơn luôn là ANODE bị ăn mòn!';
  }

  return {
    corrosionType: 'AN_MON_DIEN_HOA',
    anodeMetalVI: `${anodeSymbol} (Cực âm - Anode)`,
    anodeReactionVI: anodeRxn,
    cathodeReactionVI: cathodeRxn,
    corrosionRateScore: environmentType === 'ACID_DILUTE' ? 95 : 85,
    isSacrificialProtectionActive: isSacrificial,
    protectedMetalVI: protectedMetal,
    visualPhenomenonVI: environmentType === 'ACID_DILUTE'
      ? `Hình thành vi pin điện hóa! Khí H₂ thoát ra xối xả từ cực dương ${cathodeSymbol}, thanh ${anodeSymbol} bị ăn mòn và tan biến nhanh chóng.`
      : `Xuất hiện dòng electron chạy từ ${anodeSymbol} sang ${cathodeSymbol}. ${anodeSymbol} bị hòa tan tạo kết tủa, bảo vệ kim loại cực dương.`,
    pedagogicalRationaleVI: `Ăn mòn điện hóa học: Dòng electron chạy từ cực âm (${anodeSymbol}) sang cực dương (${cathodeSymbol}). Quá thế hiđro giảm đột ngột trên cực ${cathodeSymbol} làm tốc độ thoát khí và tốc độ ăn mòn tăng vọt so với ăn mòn hóa học.`,
    curriculumExamTipVI: examTip
  };
}
