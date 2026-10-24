/**
 * ELEMENTA - Nitrogen & Sulfur Domain Engine
 * Conforms strictly to IUPAC Gold Book and Vietnam GDPT 2018 Grade 11 Chemistry Curriculum:
 * Chủ đề 2: Nitrogen và Sulfur (Nitrogen, Ammonia, Nitric Acid, Sulfur, Sulfur Dioxide, Sulfuric Acid).
 */

export interface NitrogenSpecies {
  id: string;
  formula: string;
  nameVi: string;
  oxidationStateN: number;
  standardState: 'KHÍ' | 'LỎNG' | 'RẮN' | 'DUNG_DỊCH';
  colorVi: string;
  odorVi: string;
  toxicityLevel: 'AN_TOÀN' | 'ĐỘC_NHẸ' | 'ĐỘC_MẠNH' | 'CỰC_ĐỘC';
  descriptionVi: string;
}

export interface SulfurSpecies {
  id: string;
  formula: string;
  nameVi: string;
  oxidationStateS: number;
  standardState: 'KHÍ' | 'LỎNG' | 'RẮN' | 'DUNG_DỊCH';
  colorVi: string;
  odorVi: string;
  descriptionVi: string;
}

export interface AmmoniaFountainResult {
  nh3VolumeLiters: number;
  waterAbsorbedLiters: number;
  dissolutionRatio: number; // ~700-800 L NH3 per 1 L H2O at 20C
  pressureDropAtm: number; // Pressure drop creating siphon suction
  fountainHeightCm: number;
  indicatorColor: string; // 'Hồng cánh sen rực rỡ' (Phenolphthalein)
  indicatorHex: string;
  chemicalEquation: string;
  explanationVi: string;
}

export interface Hno3RedoxResult {
  metalSymbol: string;
  metalNameVi: string;
  acidConcentration: 'ĐẶC' | 'LOÃNG' | 'RẤT_LOÃNG';
  isColdAcid: boolean;
  isPassivated: boolean;
  reductionProductVi: string;
  reductionProductFormula: string;
  gasColorVi: string;
  gasColorHex: string;
  chemicalEquation: string;
  explanationVi: string;
}

export interface AquaRegiaResult {
  metalSymbol: 'Au' | 'Pt';
  molesMetal: number;
  hno3MolarRatio: number; // 1
  hclMolarRatio: number; // 3
  complexAcidFormed: string;
  byproductGas: string;
  chemicalEquation: string;
  explanationVi: string;
}

export interface SugarDehydrationResult {
  sucroseGrams: number;
  carbonMassGrams: number;
  waterMolesEliminated: number;
  so2VolumeLiters: number;
  co2VolumeLiters: number;
  columnExpansionMultiplier: number;
  chemicalEquations: string[];
  safetyWarningVi: string;
  explanationVi: string;
}

export interface EutrophicationStatus {
  nitrateMgL: number; // NO3- mg/L
  phosphateMgL: number; // PO4(3-) mg/L
  dissolvedOxygenMgL: number; // DO mg/L
  statusVi: 'BÌNH_THƯỜNG' | 'NGUY_CƠ_PHÚ_DƯỠNG' | 'PHÚ_DƯỠNG_NGHIÊM_TRỌNG';
  statusColorHex: string;
  algalBloomRiskScore: number; // 0 to 100
  fishSurvivalProbability: number; // 0 to 100%
  explanationVi: string;
}

// 1. Catalog of Nitrogen Species
export const NITROGEN_SPECIES_CATALOG: NitrogenSpecies[] = [
  {
    id: 'n2',
    formula: 'N₂',
    nameVi: 'Khí Nitrogen',
    oxidationStateN: 0,
    standardState: 'KHÍ',
    colorVi: 'Không màu',
    odorVi: 'Không mùi',
    toxicityLevel: 'AN_TOÀN',
    descriptionVi: 'Chiếm 78% thể tích khí quyển. Liên kết ba N≡N rất bền (năng lượng liên kết 946 kJ/mol) nên trơ ở nhiệt độ thường. Dùng đóng gói bảo quản thực phẩm và sinh hàn lỏng.'
  },
  {
    id: 'nh3',
    formula: 'NH₃',
    nameVi: 'Amoniac (Ammonia)',
    oxidationStateN: -3,
    standardState: 'KHÍ',
    colorVi: 'Không màu',
    odorVi: 'Mùi khai sốc đặc trưng',
    toxicityLevel: 'ĐỘC_MẠNH',
    descriptionVi: 'Tan cực nhiều trong nước (~800 L khí trong 1 L nước ở 20°C). Có tính bazơ yếu (làm xanh quỳ tím ẩm) và tính khử mạnh. Nguyên liệu sản xuất phân đạm và axit nitric.'
  },
  {
    id: 'no',
    formula: 'NO',
    nameVi: 'Nitric oxide (Nitrogen monoxide)',
    oxidationStateN: +2,
    standardState: 'KHÍ',
    colorVi: 'Không màu (hóa nâu ngay trong không khí do tạo NO₂)',
    odorVi: 'Không mùi',
    toxicityLevel: 'ĐỘC_MẠNH',
    descriptionVi: 'Tạo thành khi sét đánh (t° > 3000°C) hoặc phản ứng giữa Cu và HNO₃ loãng. Không màu nhưng tác dụng ngay với O₂ không khí tạo NO₂ màu nâu đỏ.'
  },
  {
    id: 'no2',
    formula: 'NO₂',
    nameVi: 'Nitrogen dioxide',
    oxidationStateN: +4,
    standardState: 'KHÍ',
    colorVi: 'Nâu đỏ đặc trưng',
    odorVi: 'Mùi hắc cay nồng, ngột ngạt',
    toxicityLevel: 'CỰC_ĐỘC',
    descriptionVi: 'Khí màu nâu đỏ sinh ra khi kim loại tác dụng với HNO₃ đặc. Độc hại cho hệ hô hấp, là một trong các tác nhân chính gây mưa axit và mù quang hóa.'
  },
  {
    id: 'n2o',
    formula: 'N₂O',
    nameVi: 'Dinitrogen monoxide (Khí cười)',
    oxidationStateN: +1,
    standardState: 'KHÍ',
    colorVi: 'Không màu',
    odorVi: 'Mùi thơm ngọt nhẹ',
    toxicityLevel: 'ĐỘC_NHẸ',
    descriptionVi: 'Sản phẩm khử khi kim loại mạnh (Mg, Zn) tác dụng với HNO₃ loãng vừa phải. Tác dụng gây tê trong y tế (khí cười), lạm dụng gây tổn thương tủy sống.'
  },
  {
    id: 'hno3',
    formula: 'HNO₃',
    nameVi: 'Axit Nitric',
    oxidationStateN: +5,
    standardState: 'LỎNG',
    colorVi: 'Không màu (để lâu chuyển vàng do lẫn NO₂ phân hủy)',
    odorVi: 'Mùi hắc nồng, bốc khói trong không khí ẩm',
    toxicityLevel: 'CỰC_ĐỘC',
    descriptionVi: 'Axit mạnh và chất oxi hóa cực mạnh. Oxi hóa hầu hết kim loại (trừ Au, Pt) và phi kim (C, S, P). Fe, Al, Cr bị thụ động hóa trong HNO₃ đặc nguội.'
  }
];

// 2. Catalog of Sulfur Species
export const SULFUR_SPECIES_CATALOG: SulfurSpecies[] = [
  {
    id: 's',
    formula: 'S',
    nameVi: 'Lưu huỳnh (Sulfur)',
    oxidationStateS: 0,
    standardState: 'RẮN',
    colorVi: 'Màu vàng tươi',
    odorVi: 'Không mùi ở dạng tinh thể',
    descriptionVi: 'Phi kim màu vàng, tồn tại dạng vòng S₈. Dùng lưu hóa cao su, sản xuất H₂SO₄, thuốc súng đen và diêm.'
  },
  {
    id: 'h2s',
    formula: 'H₂S',
    nameVi: 'Hiđro sunfua (Hydrogen sulfide)',
    oxidationStateS: -2,
    standardState: 'KHÍ',
    colorVi: 'Không màu',
    odorVi: 'Mùi trứng thối đặc trưng',
    descriptionVi: 'Khí cực độc sinh ra từ sự thối rữa của chất hữu cơ chứa protein. Có tính khử rất mạnh, tác dụng với dung dịch muối chì tạo kết tủa đen PbS.'
  },
  {
    id: 'so2',
    formula: 'SO₂',
    nameVi: 'Lưu huỳnh đioxit (Sulfur dioxide)',
    oxidationStateS: +4,
    standardState: 'KHÍ',
    colorVi: 'Không màu',
    odorVi: 'Mùi hắc sốc nghẹt thở',
    descriptionVi: 'Khí làm mất màu nước brom và thuốc tím. Là tác nhân hàng đầu gây mưa axit ăn mòn tượng đá vôi và công trình kim loại.'
  },
  {
    id: 'h2so4',
    formula: 'H₂SO₄',
    nameVi: 'Axit Sunfuric',
    oxidationStateS: +6,
    standardState: 'LỎNG',
    colorVi: 'Chất lỏng sánh như dầu, không màu',
    odorVi: 'Không mùi',
    descriptionVi: 'Hóa chất công nghiệp số 1. H₂SO₄ đặc có tính háo nước mãnh liệt (than hóa đường saccarozơ) và tính oxi hóa mạnh khi đun nóng.'
  }
];

// 3. Ammonia Fountain Experiment Simulation
export function simulateAmmoniaFountain(nh3VolumeLiters: number = 0.5): AmmoniaFountainResult {
  const v = Math.max(0.1, Math.min(2.0, nh3VolumeLiters));
  // At 20C, 1 L of water dissolves ~800 L of NH3.
  // Dissolving NH3 in a sealed flask creates an almost total vacuum:
  // Pressure drops from 1.0 atm down to ~0.05 atm.
  const pressureDropAtm = 0.95;
  // Siphon jet height is proportional to pressure differential:
  const fountainHeightCm = Math.round(pressureDropAtm * 80); // ~76 cm
  const waterAbsorbedLiters = parseFloat((v / 800).toFixed(4));

  return {
    nh3VolumeLiters: v,
    waterAbsorbedLiters,
    dissolutionRatio: 800,
    pressureDropAtm,
    fountainHeightCm,
    indicatorColor: 'Hồng cánh sen rực rỡ (Phenolphthalein hóa hồng)',
    indicatorHex: '#EC4899',
    chemicalEquation: 'NH₃ (k) + H₂O (l) ⇌ NH₄⁺ (aq) + OH⁻ (aq)',
    explanationVi: 'Khí NH₃ tan cực nhanh và cực nhiều trong nước (khoảng 800 lít NH₃ trong 1 lít nước ở 20°C). Khi giọt nước đầu tiên tiếp xúc với NH₃ trong bình kín, NH₃ tan làm áp suất trong bình giảm đột ngột tạo chân không, hút nước từ chậu phun mạnh thành tia xối xả. Ion OH⁻ sinh ra làm dung dịch phenolphtalein không màu chuyển ngay sang màu hồng cánh sen tuyệt đẹp.'
  };
}

// 4. Nitric Acid (HNO3) Redox & Passivation Predictor
export function predictHno3Redox(
  metalSymbol: string,
  acidConcentration: 'ĐẶC' | 'LOÃNG' | 'RẤT_LOÃNG',
  isColdAcid: boolean = false
): Hno3RedoxResult {
  const sym = metalSymbol.toUpperCase();

  // Passivation rule: Fe, Al, Cr are passivated in cold concentrated HNO3
  if ((sym === 'FE' || sym === 'AL' || sym === 'CR') && acidConcentration === 'ĐẶC' && isColdAcid) {
    const metalName = sym === 'FE' ? 'Sắt (Fe)' : sym === 'AL' ? 'Nhôm (Al)' : 'Crom (Cr)';
    return {
      metalSymbol: sym,
      metalNameVi: metalName,
      acidConcentration,
      isColdAcid: true,
      isPassivated: true,
      reductionProductVi: 'Không có (Bị thụ động hóa)',
      reductionProductFormula: 'Không phản ứng',
      gasColorVi: 'Không có khí thoát ra',
      gasColorHex: '#64748B',
      chemicalEquation: `${sym} + HNO₃ (đặc, nguội) —→ BỊ THỤ ĐỘNG HÓA (KHÔNG PHẢN ỨNG)`,
      explanationVi: `Kim loại ${metalName} bị thụ động hóa trong axit HNO₃ đặc nguội do tạo màng oxit bảo vệ cực mỏng nhưng trơ bền vững trên bề mặt kim loại, ngăn cản phản ứng tiếp diễn. Sau khi bị thụ động hóa, kim loại cũng không còn phản ứng với dung dịch HCl hay H₂SO₄ loãng.`
    };
  }

  // Active metals (Mg, Al, Zn) with very dilute HNO3
  if ((sym === 'MG' || sym === 'ZN' || sym === 'AL') && acidConcentration === 'RẤT_LOÃNG') {
    const metalName = sym === 'MG' ? 'Magie (Mg)' : sym === 'ZN' ? 'Kẽm (Zn)' : 'Nhôm (Al)';
    return {
      metalSymbol: sym,
      metalNameVi: metalName,
      acidConcentration,
      isColdAcid,
      isPassivated: false,
      reductionProductVi: 'Amoni nitrat (NH₄NO₃) trong dung dịch (không có khí thoát ra)',
      reductionProductFormula: 'NH₄NO₃',
      gasColorVi: 'Không có khí (tạo muối NH₄NO₃ tan trong nước)',
      gasColorHex: '#F8FAFC',
      chemicalEquation: `4 ${sym} + 10 HNO₃ (rất loãng) → 4 ${sym}(NO₃)₂ + NH₄NO₃ + 3 H₂O`,
      explanationVi: `Kim loại có tính khử rất mạnh (${metalName}) khi tác dụng với HNO₃ rất loãng có thể khử ion N⁺⁵ xuống mức oxi hóa thấp nhất là N⁻³ tạo muối amoni nitrat NH₄NO₃ trong dung dịch mà không sinh ra chất khí nào (bẫy kinh điển trong bài toán kim loại tác dụng với axit nitric).`
    };
  }

  // Medium / Weak metals (Cu, Fe, Ag) or Concentrated HNO3
  if (acidConcentration === 'ĐẶC') {
    const metalName = sym === 'CU' ? 'Đồng (Cu)' : sym === 'FE' ? 'Sắt (Fe)' : sym === 'AG' ? 'Bạc (Ag)' : sym;
    const eq = sym === 'CU'
      ? 'Cu + 4 HNO₃ (đặc) —(t°)→ Cu(NO₃)₂ + 2 NO₂↑ (nâu đỏ) + 2 H₂O'
      : sym === 'FE'
      ? 'Fe + 6 HNO₃ (đặc) —(t°)→ Fe(NO₃)₃ + 3 NO₂↑ (nâu đỏ) + 3 H₂O'
      : `${sym} + 2 HNO₃ (đặc) → M(NO₃) + NO₂↑ + H₂O`;

    return {
      metalSymbol: sym,
      metalNameVi: metalName,
      acidConcentration,
      isColdAcid,
      isPassivated: false,
      reductionProductVi: 'Khí Nitrogen dioxide (NO₂) màu nâu đỏ',
      reductionProductFormula: 'NO₂',
      gasColorVi: 'Màu nâu đỏ đậm, mùi cay nồng',
      gasColorHex: '#78350F',
      chemicalEquation: eq,
      explanationVi: `Trong dung dịch HNO₃ đặc nóng, kim loại ${metalName} bị oxi hóa lên số oxi hóa cao nhất, đồng thời N⁺⁵ bị khử về N⁺⁴ tạo khí NO₂ màu nâu đỏ đặc trưng bốc lên mãnh liệt.`
    };
  }

  // Dilute HNO3 (LOÃNG)
  const metalName = sym === 'CU' ? 'Đồng (Cu)' : sym === 'FE' ? 'Sắt (Fe)' : sym;
  const eq = sym === 'CU'
    ? '3 Cu + 8 HNO₃ (loãng) → 3 Cu(NO₃)₂ + 2 NO↑ + 4 H₂O'
    : 'Fe + 4 HNO₃ (loãng) → Fe(NO₃)₃ + NO↑ + 2 H₂O';

  return {
    metalSymbol: sym,
    metalNameVi: metalName,
    acidConcentration,
    isColdAcid,
    isPassivated: false,
    reductionProductVi: 'Khí Nitric oxide (NO) không màu, hóa nâu trong không khí',
    reductionProductFormula: 'NO',
    gasColorVi: 'Không màu (sau đó hóa nâu đỏ ở miệng ống nghiệm do tạo NO₂)',
    gasColorHex: '#CBD5E1',
    chemicalEquation: eq,
    explanationVi: `Với axit HNO₃ loãng, kim loại khử N⁺⁵ về N⁺² tạo khí NO không màu. Khi thoát ra miệng ống nghiệm gặp O₂ không khí, khí NO lập tức kết hợp tạo NO₂ màu nâu đỏ (2 NO + O₂ → 2 NO₂).`
  };
}

// 5. Aqua Regia (Nước cường toan) Gold Dissolution
export function simulateAquaRegia(metal: 'Au' | 'Pt' = 'Au', moles: number = 0.01): AquaRegiaResult {
  const m = Math.max(0.001, moles);
  if (metal === 'Au') {
    return {
      metalSymbol: 'Au',
      molesMetal: m,
      hno3MolarRatio: 1,
      hclMolarRatio: 3,
      complexAcidFormed: 'Axit cloroauric (H[AuCl₄])',
      byproductGas: 'NO (hóa nâu trong không khí)',
      chemicalEquation: 'Au + HNO₃ + 4 HCl (đặc) → H[AuCl₄] + NO↑ + 2 H₂O',
      explanationVi: 'Nước cường toan là hỗn hợp gồm 1 thể tích HNO₃ đặc và 3 thể tích HCl đặc. HNO₃ đóng vai trò chất oxi hóa mạnh sinh ra clo nguyên tử hoạt động [Cl], kết hợp ion Cl⁻ tạo phức [AuCl₄]⁻ cực bền, làm giảm thế điện cực của Au và hòa tan hoàn toàn vàng kim loại.'
    };
  }

  return {
    metalSymbol: 'Pt',
    molesMetal: m,
    hno3MolarRatio: 1,
    hclMolarRatio: 3,
    complexAcidFormed: 'Axit cloroplatinic (H₂[PtCl₆])',
    byproductGas: 'NO',
    chemicalEquation: '3 Pt + 4 HNO₃ + 18 HCl → 3 H₂[PtCl₆] + 4 NO↑ + 8 H₂O',
    explanationVi: 'Nước cường toan cũng hòa tan được kim loại quý Platin (bạch kim) tạo dung dịch phức chất H₂[PtCl₆].'
  };
}

// 6. Sulfuric Acid Sugar Dehydration (Than Hóa Đường Saccarozơ)
export function simulateSugarDehydration(sucroseGrams: number = 20): SugarDehydrationResult {
  const mass = Math.max(5, Math.min(100, sucroseGrams));
  // C12H22O11 (342.3 g/mol) -> 12 C (144.1 g) + 11 H2O
  const molesSucrose = mass / 342.3;
  const carbonMassGrams = parseFloat((molesSucrose * 12 * 12.011).toFixed(2));
  const waterMolesEliminated = parseFloat((molesSucrose * 11).toFixed(3));

  // Secondary redox reaction:
  // C + 2 H2SO4 -> CO2 + 2 SO2 + 2 H2O
  // Assuming 25% of the produced carbon reacts with hot conc H2SO4 to generate lifting gas:
  const reactingCarbonMoles = molesSucrose * 12 * 0.25;
  const co2VolumeLiters = parseFloat((reactingCarbonMoles * 24.79).toFixed(2)); // at 25C (GDPT 2018 bar standard)
  const so2VolumeLiters = parseFloat((reactingCarbonMoles * 2 * 24.79).toFixed(2));

  // Column expands ~4 to 6 times original sugar volume
  const columnExpansionMultiplier = 5;

  return {
    sucroseGrams: mass,
    carbonMassGrams,
    waterMolesEliminated,
    so2VolumeLiters,
    co2VolumeLiters,
    columnExpansionMultiplier,
    chemicalEquations: [
      'Giai đoạn 1 (Háo nước): C₁₂H₂₂O₁₁ —(H₂SO₄ đặc)→ 12 C (than đen) + 11 H₂O',
      'Giai đoạn 2 (Oxi hóa đẩy cột than): C + 2 H₂SO₄ (đặc, nóng) → CO₂↑ + 2 SO₂↑ + 2 H₂O'
    ],
    safetyWarningVi: 'Phản ứng tỏa nhiệt cực lớn (>150°C), sinh ra lượng lớn khí SO₂ rất độc và mùi hắc nồng nặc. Bắt buộc phải thực hiện trong tủ hút khí độc hoặc ngoài trời thoáng khí!',
    explanationVi: 'Axit sunfuric đặc có tính háo nước cực kỳ mãnh liệt. Nó chiếm đoạt các nguyên tố H và O trong phân tử đường saccarozơ theo tỉ lệ nước (11 H₂O), biến đường trắng thành khối than xốp màu đen. Nhiệt tỏa ra làm một phần than tiếp tục bị H₂SO₄ đặc oxi hóa tạo khí CO₂ và SO₂; hai khí này sủi bọt đẩy cột than đen dâng trào cuồn cuộn lên miệng cốc như một con rắn đen khổng lồ (Sugar Snake).'
  };
}

// 7. Eutrophication (Phú Dưỡng) Ecosystem Model
export function evaluateEutrophication(nitrateMgL: number, phosphateMgL: number): EutrophicationStatus {
  const n = Math.max(0, nitrateMgL);
  const p = Math.max(0, phosphateMgL);

  // According to WHO and Vietnamese environmental standards:
  // Total N > 1.5 mg/L or Total P > 0.1 mg/L triggers eutrophic risk.
  // Severe eutrophication: N > 10 mg/L or P > 0.5 mg/L.
  let riskScore = 0;
  riskScore += Math.min(50, (n / 10) * 50);
  riskScore += Math.min(50, (p / 0.5) * 50);
  riskScore = Math.round(riskScore);

  // Dissolved Oxygen (DO) depletes as algal bloom decays
  // Normal DO is 7-9 mg/L. Depleted DO drops below 2-3 mg/L (hypoxia/anoxia).
  const dissolvedOxygenMgL = parseFloat(Math.max(0.5, 8.5 - (riskScore / 100) * 7.0).toFixed(1));

  let statusVi: EutrophicationStatus['statusVi'] = 'BÌNH_THƯỜNG';
  let statusColorHex = '#10B981'; // Green
  let fishSurvivalProbability = 95;

  if (riskScore >= 70 || dissolvedOxygenMgL <= 3.0) {
    statusVi = 'PHÚ_DƯỠNG_NGHIÊM_TRỌNG';
    statusColorHex = '#EF4444'; // Red
    fishSurvivalProbability = 10;
  } else if (riskScore >= 35 || dissolvedOxygenMgL <= 5.0) {
    statusVi = 'NGUY_CƠ_PHÚ_DƯỠNG';
    statusColorHex = '#F59E0B'; // Amber
    fishSurvivalProbability = 60;
  }

  let explanationVi = `Nồng độ Nitrate [NO₃⁻] = ${n.toFixed(1)} mg/L, Phosphate [PO₄³⁻] = ${p.toFixed(2)} mg/L: `;
  if (statusVi === 'PHÚ_DƯỠNG_NGHIÊM_TRỌNG') {
    explanationVi += 'Nguồn nước bị ô nhiễm dinh dưỡng nặng nề. Tảo độc nở hoa bùng phát che phủ mặt nước, vi sinh vật hiếu khí phân hủy xác tảo tiêu thụ hết oxy hòa tan (DO = ' + dissolvedOxygenMgL + ' mg/L), gây hiện tượng ngạt thở khiến cá và các loài thủy sinh chết hàng loạt, nước bốc mùi hôi thối.';
  } else if (statusVi === 'NGUY_CƠ_PHÚ_DƯỠNG') {
    explanationVi += 'Lượng dinh dưỡng bắt đầu dư thừa do phân bón nông nghiệp hoặc nước thải sinh hoạt. Cần giảm xả thải nitrat và photphat để tránh bùng phát tảo nở hoa.';
  } else {
    explanationVi += 'Nguồn nước trong sạch, hàm lượng dinh dưỡng ở mức cân bằng sinh thái, lượng oxy hòa tan dồi dào bảo đảm cho thủy sinh vật phát triển khỏe mạnh.';
  }

  return {
    nitrateMgL: n,
    phosphateMgL: p,
    dissolvedOxygenMgL,
    statusVi,
    statusColorHex,
    algalBloomRiskScore: riskScore,
    fishSurvivalProbability,
    explanationVi
  };
}
