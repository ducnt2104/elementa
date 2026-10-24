// src/domain/solubilityEngine.ts
// Solubility Product Constant (K_sp), Precipitation Equilibrium & Amphoteric Re-dissolution Engine
// Strictly audited against Vietnam GDPT 2018 Chemistry & IUPAC Physical Chemistry

export interface SparinglySolubleSalt {
  id: string;
  formula: string;
  name_vi: string;
  name_en: string;
  cation: {
    symbol: string;
    charge: number;
    stoichiometry: number;
    label: string;
  };
  anion: {
    symbol: string;
    charge: number;
    stoichiometry: number;
    label: string;
  };
  ksp: number; // Equilibrium constant at 25°C
  molarMass: number; // g/mol
  colorHex: string;
  precipitateType: 'CURD' | 'CRYSTALLINE' | 'GELATINOUS' | 'FINE_POWDER';
  appearanceVI: string;
  isAmphoteric: boolean;
  amphotericReactionVI?: string;
  amphotericComplexFormula?: string;
  canDissolveInAmmonia?: boolean;
  ammoniaComplexFormula?: string;
  solubilityInAcidVI: string;
  pedagogicalRationaleVI: string;
  curriculumBenchmarkVI: string;
  tacticalBuff: {
    nameVI: string;
    descriptionVI: string;
    statType: 'DEF_SHIELD' | 'SLOW' | 'PURIFY' | 'HEAL';
    power: number;
  };
}

export const CURRICULUM_SPARINGLY_SOLUBLE_SALTS: SparinglySolubleSalt[] = [
  {
    id: 'salt_agcl',
    formula: 'AgCl',
    name_vi: 'Bạc Clorua (Silver Chloride)',
    name_en: 'Silver chloride',
    cation: { symbol: 'Ag', charge: 1, stoichiometry: 1, label: 'Ag⁺' },
    anion: { symbol: 'Cl', charge: -1, stoichiometry: 1, label: 'Cl⁻' },
    ksp: 1.77e-10,
    molarMass: 143.32,
    colorHex: '#F8FAFC',
    precipitateType: 'CURD',
    appearanceVI: 'Kết tủa trắng vón, hóa đen ngoài ánh sáng do AgCl phân hủy thành Ag kim loại',
    isAmphoteric: false,
    canDissolveInAmmonia: true,
    ammoniaComplexFormula: '[Ag(NH₃)₂]⁺',
    solubilityInAcidVI: 'Không tan trong HNO₃ loãng; tan hoàn toàn trong dung dịch NH₃ dư tạo phức [Ag(NH₃)₂]⁺',
    pedagogicalRationaleVI: 'Thuốc thử đặc trưng để nhận biết ion Cl⁻ bằng AgNO₃ trong môi trường axit HNO₃ loãng.',
    curriculumBenchmarkVI: 'GDPT 2018 Hóa 10 (Halogen) & Hóa 12 (Phức chất)',
    tacticalBuff: {
      nameVI: 'Khiên Bạc Chống Axit',
      descriptionVI: 'Tạo lớp màng bảo hộ trắng chặn 350 sát thương và giải trừ hiệu ứng ăn mòn.',
      statType: 'DEF_SHIELD',
      power: 350
    }
  },
  {
    id: 'salt_agbr',
    formula: 'AgBr',
    name_vi: 'Bạc Bromua (Silver Bromide)',
    name_en: 'Silver bromide',
    cation: { symbol: 'Ag', charge: 1, stoichiometry: 1, label: 'Ag⁺' },
    anion: { symbol: 'Br', charge: -1, stoichiometry: 1, label: 'Br⁻' },
    ksp: 5.35e-13,
    molarMass: 187.77,
    colorHex: '#FEF08A',
    precipitateType: 'CURD',
    appearanceVI: 'Kết tủa vàng nhạt, nhạy sáng cao (dùng tráng phim ảnh cổ điển)',
    isAmphoteric: false,
    canDissolveInAmmonia: true,
    ammoniaComplexFormula: '[Ag(NH₃)₂]⁺ (chỉ tan trong NH₃ đặc)',
    solubilityInAcidVI: 'Không tan trong HNO₃; tan rất ít trong NH₃ loãng, tan trong NH₃ đặc',
    pedagogicalRationaleVI: 'Nhận biết ion Br⁻ bằng dung dịch AgNO₃ cho kết tủa vàng nhạt.',
    curriculumBenchmarkVI: 'GDPT 2018 Hóa 10 (Halogen)',
    tacticalBuff: {
      nameVI: 'Hạt Nhạy Sáng Chói Lóa',
      descriptionVI: 'Gây hiệu ứng chói lóa làm giảm 30% độ chính xác công kích của đối phương.',
      statType: 'SLOW',
      power: 30
    }
  },
  {
    id: 'salt_agi',
    formula: 'AgI',
    name_vi: 'Bạc Iodua (Silver Iodide)',
    name_en: 'Silver iodide',
    cation: { symbol: 'Ag', charge: 1, stoichiometry: 1, label: 'Ag⁺' },
    anion: { symbol: 'I', charge: -1, stoichiometry: 1, label: 'I⁻' },
    ksp: 8.52e-17,
    molarMass: 234.77,
    colorHex: '#FACC15',
    precipitateType: 'CURD',
    appearanceVI: 'Kết tủa vàng đậm đặc trưng, K_sp cực nhỏ nên kết tủa đầu tiên khi kết tủa phân đoạn',
    isAmphoteric: false,
    canDissolveInAmmonia: false,
    solubilityInAcidVI: 'Không tan trong cả HNO₃ loãng lẫn dung dịch NH₃ (kể cả NH₃ đặc)',
    pedagogicalRationaleVI: 'Nhận biết ion I⁻ và ứng dụng tạo mầm tinh thể làm mưa nhân tạo.',
    curriculumBenchmarkVI: 'GDPT 2018 Hóa 10 (Halogen) & Kết tủa phân đoạn',
    tacticalBuff: {
      nameVI: 'Mầm Hạt Mưa Tinh Thể',
      descriptionVI: 'Tạo vùng mưa bão làm chậm 40% kẻ địch trong phạm vi 350 pixel.',
      statType: 'SLOW',
      power: 40
    }
  },
  {
    id: 'salt_baso4',
    formula: 'BaSO₄',
    name_vi: 'Bari Sunfat (Barium Sulfate)',
    name_en: 'Barium sulfate',
    cation: { symbol: 'Ba', charge: 2, stoichiometry: 1, label: 'Ba²⁺' },
    anion: { symbol: 'SO4', charge: -2, stoichiometry: 1, label: 'SO₄²⁻' },
    ksp: 1.08e-10,
    molarMass: 233.39,
    colorHex: '#FFFFFF',
    precipitateType: 'FINE_POWDER',
    appearanceVI: 'Kết tủa trắng tinh khiết, siêu bền, không độc do không tan (dùng làm chất cản quang X-quang)',
    isAmphoteric: false,
    canDissolveInAmmonia: false,
    solubilityInAcidVI: 'Không tan trong mọi axit mạnh (kể cả HCl, HNO₃, H₂SO₄ loãng)',
    pedagogicalRationaleVI: 'Thuốc thử định tính kinh điển: dùng muối Ba²⁺ (BaCl₂, Ba(OH)₂) để nhận biết gốc SO₄²⁻.',
    curriculumBenchmarkVI: 'GDPT 2018 Hóa 10 (Lưu huỳnh) & Hóa 11',
    tacticalBuff: {
      nameVI: 'Tấm Khiên Cản Quang BaSO₄',
      descriptionVI: 'Tăng 450 Khiên cản sát thương năng lượng và miễn nhiễm độc tố.',
      statType: 'DEF_SHIELD',
      power: 450
    }
  },
  {
    id: 'salt_caco3',
    formula: 'CaCO₃',
    name_vi: 'Canxi Cacbonat (Calcium Carbonate - Đá Vôi)',
    name_en: 'Calcium carbonate',
    cation: { symbol: 'Ca', charge: 2, stoichiometry: 1, label: 'Ca²⁺' },
    anion: { symbol: 'CO3', charge: -2, stoichiometry: 1, label: 'CO₃²⁻' },
    ksp: 3.36e-9,
    molarMass: 100.09,
    colorHex: '#F1F5F9',
    precipitateType: 'CRYSTALLINE',
    appearanceVI: 'Kết tủa trắng đục (hiện tượng nước vôi trong vẩn đục khi sục khí CO₂)',
    isAmphoteric: false,
    canDissolveInAmmonia: false,
    solubilityInAcidVI: 'Tan mạnh trong axit giải phóng khí CO₂ sủi bọt: CaCO₃ + 2HCl → CaCl₂ + CO₂↑ + H₂O; tan trong CO₂ dư: CaCO₃ + CO₂ + H₂O ⇌ Ca(HCO₃)₂ (xâm thực karst)',
    pedagogicalRationaleVI: 'Cân bằng hòa tan tạo thạch nhũ hang động và nhận biết khí CO₂ bằng nước vôi trong.',
    curriculumBenchmarkVI: 'GDPT 2018 Hóa 11 & Hóa 12 (Kim loại kiềm thổ)',
    tacticalBuff: {
      nameVI: 'Lớp Vỏ Giáp Đá Vôi',
      descriptionVI: 'Tăng 35 Giáp vật lý; khi bị phá vỡ giải phóng sương mù CO₂ đẩy lùi kẻ địch.',
      statType: 'DEF_SHIELD',
      power: 35
    }
  },
  {
    id: 'salt_al_oh3',
    formula: 'Al(OH)₃',
    name_vi: 'Nhôm Hydroxit (Aluminum Hydroxide)',
    name_en: 'Aluminum hydroxide',
    cation: { symbol: 'Al', charge: 3, stoichiometry: 1, label: 'Al³⁺' },
    anion: { symbol: 'OH', charge: -1, stoichiometry: 3, label: 'OH⁻' },
    ksp: 1.30e-33,
    molarMass: 78.00,
    colorHex: '#E2E8F0',
    precipitateType: 'GELATINOUS',
    appearanceVI: 'Kết tủa keo trắng, tính lưỡng tính điển hình, tan cả trong axit lẫn kiềm dư',
    isAmphoteric: true,
    amphotericReactionVI: 'Al(OH)₃ + OH⁻ ⇌ [Al(OH)₄]⁻ (tetrahydroxidoaluminate tan hoàn toàn)',
    amphotericComplexFormula: '[Al(OH)₄]⁻',
    solubilityInAcidVI: 'Tan trong axit: Al(OH)₃ + 3H⁺ → Al³⁺ + 3H₂O; tan trong kiềm mạnh dư: Al(OH)₃ + OH⁻ → [Al(OH)₄]⁻ (không tan trong NH₃ dư)',
    pedagogicalRationaleVI: 'Tính chất lưỡng tính trọng tâm trong đề thi THPT và SGK Hóa học 12 GDPT 2018.',
    curriculumBenchmarkVI: 'GDPT 2018 Hóa 12 (Nhôm & Hợp chất)',
    tacticalBuff: {
      nameVI: 'Keo Lưỡng Tính Biến Ảo',
      descriptionVI: 'Hấp thụ 40% sát thương nguyên tố và chuyển hóa thành Năng lượng Mana.',
      statType: 'HEAL',
      power: 40
    }
  },
  {
    id: 'salt_zn_oh2',
    formula: 'Zn(OH)₂',
    name_vi: 'Kẽm Hydroxit (Zinc Hydroxide)',
    name_en: 'Zinc hydroxide',
    cation: { symbol: 'Zn', charge: 2, stoichiometry: 1, label: 'Zn²⁺' },
    anion: { symbol: 'OH', charge: -1, stoichiometry: 2, label: 'OH⁻' },
    ksp: 3.00e-17,
    molarMass: 99.42,
    colorHex: '#CBD5E1',
    precipitateType: 'GELATINOUS',
    appearanceVI: 'Kết tủa keo trắng, lưỡng tính, tan trong kiềm dư VÀ tan cả trong NH₃ dư (tạo phức tetraammine)',
    isAmphoteric: true,
    amphotericReactionVI: 'Zn(OH)₂ + 2OH⁻ ⇌ [Zn(OH)₄]²⁻; Zn(OH)₂ + 4NH₃ ⇌ [Zn(NH₃)₄]²⁺ + 2OH⁻',
    amphotericComplexFormula: '[Zn(OH)₄]²⁻',
    canDissolveInAmmonia: true,
    ammoniaComplexFormula: '[Zn(NH₃)₄]²⁺',
    solubilityInAcidVI: 'Tan trong axit mạnh, tan trong kiềm dư [Zn(OH)₄]²⁻, tan trong dung dịch NH₃ dư [Zn(NH₃)₄]²⁺',
    pedagogicalRationaleVI: 'Phân biệt Al(OH)₃ và Zn(OH)₂ bằng dung dịch NH₃ dư (Zn(OH)₂ tan còn Al(OH)₃ không tan).',
    curriculumBenchmarkVI: 'GDPT 2018 Hóa 12 (Kim loại chuyển tiếp)',
    tacticalBuff: {
      nameVI: 'Lớp Phủ Kẽm Lưỡng Cực',
      descriptionVI: 'Phản đòn 25% sát thương nhận vào thành sát thương sốc điện.',
      statType: 'DEF_SHIELD',
      power: 25
    }
  },
  {
    id: 'salt_fe_oh3',
    formula: 'Fe(OH)₃',
    name_vi: 'Sắt(III) Hydroxit (Iron(III) Hydroxide)',
    name_en: 'Iron(III) hydroxide',
    cation: { symbol: 'Fe', charge: 3, stoichiometry: 1, label: 'Fe³⁺' },
    anion: { symbol: 'OH', charge: -1, stoichiometry: 3, label: 'OH⁻' },
    ksp: 2.79e-39,
    molarMass: 106.87,
    colorHex: '#991B1B',
    precipitateType: 'GELATINOUS',
    appearanceVI: 'Kết tủa màu nâu đỏ rỉ sắt đặc trưng, K_sp siêu nhỏ (kết tủa hoàn toàn ở pH > 3.5)',
    isAmphoteric: false,
    canDissolveInAmmonia: false,
    solubilityInAcidVI: 'Tan dễ dàng trong các axit mạnh giải phóng muối Fe³⁺ màu vàng nâu; không tan trong kiềm dư hay NH₃',
    pedagogicalRationaleVI: 'Nhận biết ion Fe³⁺ bằng dung dịch kiềm (NaOH/KOH/NH₃) tạo kết tủa nâu đỏ.',
    curriculumBenchmarkVI: 'GDPT 2018 Hóa 12 (Sắt & Hợp chất)',
    tacticalBuff: {
      nameVI: 'Lớp Rỉ Sắt Đỏ Nâu',
      descriptionVI: 'Gây hiệu ứng rỉ sét làm giảm 35% hồi máu của mục tiêu trong 4 giây.',
      statType: 'PURIFY',
      power: 35
    }
  },
  {
    id: 'salt_pbi2',
    formula: 'PbI₂',
    name_vi: 'Chì(II) Iodua (Lead(II) Iodide - Cơn Mưa Vàng)',
    name_en: 'Lead(II) iodide',
    cation: { symbol: 'Pb', charge: 2, stoichiometry: 1, label: 'Pb²⁺' },
    anion: { symbol: 'I', charge: -1, stoichiometry: 2, label: 'I⁻' },
    ksp: 9.80e-9,
    molarMass: 461.01,
    colorHex: '#EAB308',
    precipitateType: 'CRYSTALLINE',
    appearanceVI: 'Tinh thể lấp lánh màu vàng óng ánh (thí nghiệm kinh điển "Cơn mưa vàng" khi làm nguội dung dịch)',
    isAmphoteric: false,
    canDissolveInAmmonia: false,
    solubilityInAcidVI: 'Độ tan tăng mạnh theo nhiệt độ (tan trong nước sôi, kết tinh lại thành vảy vàng óng ánh khi để nguội)',
    pedagogicalRationaleVI: 'Minh họa sự phụ thuộc mạnh mẽ của độ tan và tích số tan vào nhiệt độ trong hóa học phổ thông.',
    curriculumBenchmarkVI: 'GDPT 2018 Hóa 10 & 11',
    tacticalBuff: {
      nameVI: 'Cơn Mưa Vàng Hoàng Kim',
      descriptionVI: 'Tăng 50% vàng và mảnh tri thức nhận được sau trận chiến thắng lợi.',
      statType: 'HEAL',
      power: 50
    }
  }
];

export class SolubilityEngine {
  /**
   * Calculate molar solubility (s) in pure water (mol/L) from K_sp
   * For M_p X_q: K_sp = p^p * q^q * s^(p+q) => s = (K_sp / (p^p * q^q))^(1 / (p + q))
   */
  public static calculateSolubilityInPureWater(salt: SparinglySolubleSalt): {
    molarSolubilityM: number;
    massSolubilityMgPerL: number;
    cationEquilibriumM: number;
    anionEquilibriumM: number;
    formulaText: string;
  } {
    const p = salt.cation.stoichiometry;
    const q = salt.anion.stoichiometry;
    const factor = Math.pow(p, p) * Math.pow(q, q);
    const power = 1 / (p + q);

    const molarSolubilityM = Math.pow(salt.ksp / factor, power);
    const massSolubilityMgPerL = molarSolubilityM * salt.molarMass * 1000;
    const cationEquilibriumM = p * molarSolubilityM;
    const anionEquilibriumM = q * molarSolubilityM;

    let formulaText = '';
    if (p === 1 && q === 1) {
      formulaText = 's = √(K_sp)';
    } else if (p === 1 && q === 2) {
      formulaText = 's = ∛(K_sp / 4)';
    } else if (p === 1 && q === 3) {
      formulaText = 's = ∜(K_sp / 27)';
    } else {
      formulaText = `s = (K_sp / (${p}^${p} × ${q}^${q}))^(1/${p + q})`;
    }

    return {
      molarSolubilityM,
      massSolubilityMgPerL,
      cationEquilibriumM,
      anionEquilibriumM,
      formulaText
    };
  }

  /**
   * Calculate solubility under the Common-Ion Effect (Hiệu ứng ion chung)
   * Adding common ion drastically suppresses the solubility according to Le Chatelier's principle.
   */
  public static calculateSolubilityWithCommonIon(
    salt: SparinglySolubleSalt,
    commonIonType: 'CATION' | 'ANION',
    addedConcentrationM: number
  ): {
    molarSolubilityM: number;
    suppressionRatio: number; // How many times solubility decreased
    massSolubilityMgPerL: number;
    explanationVI: string;
  } {
    const p = salt.cation.stoichiometry;
    const q = salt.anion.stoichiometry;
    const pureWaterSol = this.calculateSolubilityInPureWater(salt).molarSolubilityM;

    let s = 0;
    if (commonIonType === 'ANION') {
      // [Cation]^p * [Anion]^q = K_sp where [Anion] ≈ addedConcentrationM
      // (p * s)^p * (addedConcentrationM)^q = K_sp
      const c = Math.max(1e-9, addedConcentrationM);
      const cationEquil = Math.pow(salt.ksp / Math.pow(c, q), 1 / p);
      s = cationEquil / p;
    } else {
      // Common CATION
      const c = Math.max(1e-9, addedConcentrationM);
      const anionEquil = Math.pow(salt.ksp / Math.pow(c, p), 1 / q);
      s = anionEquil / q;
    }

    s = Math.min(pureWaterSol, s);
    const suppressionRatio = Number((pureWaterSol / Math.max(1e-20, s)).toFixed(1));
    const massSolubilityMgPerL = s * salt.molarMass * 1000;

    const ionName = commonIonType === 'ANION' ? salt.anion.label : salt.cation.label;
    const explanationVI = `Hiệu ứng ion chung: Khi nồng độ ion [${ionName}] tăng lên ${addedConcentrationM} M, cân bằng hòa tan dịch chuyển mạnh sang chiều nghịch (tạo kết tủa), làm độ tan giảm ${suppressionRatio.toLocaleString()} lần so với trong nước cất.`;

    return {
      molarSolubilityM: s,
      suppressionRatio,
      massSolubilityMgPerL,
      explanationVI
    };
  }

  /**
   * Evaluate precipitation condition based on Reaction Quotient Q_sp vs K_sp
   * Q_sp = [Cation]^p * [Anion]^q
   */
  public static evaluatePrecipitationCondition(
    salt: SparinglySolubleSalt,
    cationConcM: number,
    anionConcM: number,
    volumeLitres: number = 0.1
  ): {
    qSp: number;
    kSp: number;
    logRatio: number; // log10(Q_sp / K_sp)
    state: 'UNSATURATED' | 'SATURATED' | 'SUPERSATURATED';
    precipitateMassMg: number;
    percentPrecipitated: number;
    explanationVI: string;
  } {
    const p = salt.cation.stoichiometry;
    const q = salt.anion.stoichiometry;
    const c1 = Math.max(0, cationConcM);
    const c2 = Math.max(0, anionConcM);

    const qSp = Math.pow(c1, p) * Math.pow(c2, q);
    const logRatio = qSp > 0 ? Number((Math.log10(qSp) - Math.log10(salt.ksp)).toFixed(2)) : -99;

    let state: 'UNSATURATED' | 'SATURATED' | 'SUPERSATURATED' = 'UNSATURATED';
    let precipitateMassMg = 0;
    let percentPrecipitated = 0;
    let explanationVI = '';

    if (logRatio < -0.05) {
      state = 'UNSATURATED';
      explanationVI = `Q_sp (${qSp.toExponential(2)}) < K_sp (${salt.ksp.toExponential(2)}): Dung dịch chưa bão hòa, ion phân ly tự do trong dung môi, không có kết tủa xuất hiện.`;
    } else if (Math.abs(logRatio) <= 0.05) {
      state = 'SATURATED';
      explanationVI = `Q_sp ≈ K_sp (${salt.ksp.toExponential(2)}): Dung dịch đạt trạng thái bão hòa hoàn hảo, tốc độ hòa tan bằng tốc độ kết tinh.`;
    } else {
      state = 'SUPERSATURATED';
      // Moles of limiting reagent precipitated
      const limitingMolesMax = Math.min(c1 / p, c2 / q) * volumeLitres;
      // Approximate residual solubility after precipitation
      const { molarSolubilityM } = this.calculateSolubilityInPureWater(salt);
      const dissolvedMoles = molarSolubilityM * volumeLitres;
      const precipitatedMoles = Math.max(0, limitingMolesMax - dissolvedMoles);

      precipitateMassMg = Number((precipitatedMoles * salt.molarMass * 1000).toFixed(2));
      percentPrecipitated = Number(
        Math.min(100, Math.max(0, (precipitatedMoles / limitingMolesMax) * 100)).toFixed(1)
      );

      explanationVI = `Q_sp (${qSp.toExponential(2)}) > K_sp (${salt.ksp.toExponential(2)}): Dung dịch quá bão hòa! Quá trình mầm tinh thể bắt đầu, tạo ra ${precipitateMassMg} mg ${salt.formula}↓ (${percentPrecipitated}% ion bị kết tủa).`;
    }

    return {
      qSp,
      kSp: salt.ksp,
      logRatio,
      state,
      precipitateMassMg,
      percentPrecipitated,
      explanationVI
    };
  }

  /**
   * Simulate Fractional Precipitation (Kết tủa phân đoạn của hỗn hợp halogenua với Ag+)
   * Cl- (K_sp = 1.77e-10), Br- (K_sp = 5.35e-13), I- (K_sp = 8.52e-17)
   */
  public static simulateFractionalPrecipitation(
    halideConcentrations: { Cl_M: number; Br_M: number; I_M: number },
    agAddedMoles: number,
    solutionVolumeL: number = 0.1
  ): {
    precipitatedPhases: {
      halide: 'I' | 'Br' | 'Cl';
      formula: string;
      precipitatedMoles: number;
      precipitatedMassMg: number;
      remainingM: number;
      color: string;
    }[];
    currentFreeAgConcM: number;
    activePrecipitatingIon: 'I⁻' | 'Br⁻' | 'Cl⁻' | 'NONE';
    stageDescriptionVI: string;
  } {
    const kspI = 8.52e-17;
    const kspBr = 5.35e-13;
    const kspCl = 1.77e-10;

    let initialI_mol = halideConcentrations.I_M * solutionVolumeL;
    let initialBr_mol = halideConcentrations.Br_M * solutionVolumeL;
    let initialCl_mol = halideConcentrations.Cl_M * solutionVolumeL;

    let unconsumedAg = agAddedMoles;

    // 1. AgI precipitates first because K_sp is tiny (8.52e-17)
    const pptI_mol = Math.min(initialI_mol, unconsumedAg);
    unconsumedAg -= pptI_mol;
    const remainingI_mol = initialI_mol - pptI_mol;
    const remainingI_M = remainingI_mol / solutionVolumeL;

    // 2. AgBr precipitates second (K_sp = 5.35e-13)
    const pptBr_mol = Math.min(initialBr_mol, unconsumedAg);
    unconsumedAg -= pptBr_mol;
    const remainingBr_mol = initialBr_mol - pptBr_mol;
    const remainingBr_M = remainingBr_mol / solutionVolumeL;

    // 3. AgCl precipitates last (K_sp = 1.77e-10)
    const pptCl_mol = Math.min(initialCl_mol, unconsumedAg);
    unconsumedAg -= pptCl_mol;
    const remainingCl_mol = initialCl_mol - pptCl_mol;
    const remainingCl_M = remainingCl_mol / solutionVolumeL;

    // Free Ag+ equilibrium calculation
    let freeAgM = 0;
    let activeIon: 'I⁻' | 'Br⁻' | 'Cl⁻' | 'NONE' = 'NONE';
    let stageDescriptionVI = '';

    if (remainingI_mol > 0.0001 * initialI_mol) {
      activeIon = 'I⁻';
      freeAgM = kspI / Math.max(1e-9, remainingI_M);
      stageDescriptionVI = 'Giai đoạn 1: AgI (Vàng đậm) kết tủa đầu tiên do tích số tan K_sp siêu nhỏ (8.52 × 10⁻¹⁷). Nồng độ [Ag⁺] tự do bị giữ ở mức cực thấp ~10⁻¹⁵ M, Br⁻ và Cl⁻ chưa thể kết tủa.';
    } else if (remainingBr_mol > 0.0001 * initialBr_mol) {
      activeIon = 'Br⁻';
      freeAgM = kspBr / Math.max(1e-9, remainingBr_M);
      stageDescriptionVI = 'Giai đoạn 2: Sau khi I⁻ bị kết tủa >99.99%, [Ag⁺] tăng lên ~10⁻¹¹ M và AgBr (Vàng nhạt) bắt đầu kết tủa. Ion Cl⁻ vẫn hoàn toàn tan trong dung dịch.';
    } else if (remainingCl_mol > 0.0001 * initialCl_mol) {
      activeIon = 'Cl⁻';
      freeAgM = kspCl / Math.max(1e-9, remainingCl_M);
      stageDescriptionVI = 'Giai đoạn 3: Sau khi cả I⁻ và Br⁻ đã kết tủa hoàn toàn, [Ag⁺] tăng vọt lên ~10⁻⁸ M và AgCl (Trắng vón) bắt đầu kết tủa.';
    } else {
      activeIon = 'NONE';
      freeAgM = unconsumedAg / solutionVolumeL;
      stageDescriptionVI = 'Giai đoạn kết thúc: Toàn bộ I⁻, Br⁻, Cl⁻ đã bị kết tủa hoàn toàn định lượng thành AgI, AgBr, AgCl. Ag⁺ dư tự do trong dung dịch.';
    }

    return {
      precipitatedPhases: [
        {
          halide: 'I',
          formula: 'AgI↓',
          precipitatedMoles: pptI_mol,
          precipitatedMassMg: Number((pptI_mol * 234.77 * 1000).toFixed(2)),
          remainingM: remainingI_M,
          color: '#FACC15'
        },
        {
          halide: 'Br',
          formula: 'AgBr↓',
          precipitatedMoles: pptBr_mol,
          precipitatedMassMg: Number((pptBr_mol * 187.77 * 1000).toFixed(2)),
          remainingM: remainingBr_M,
          color: '#FEF08A'
        },
        {
          halide: 'Cl',
          formula: 'AgCl↓',
          precipitatedMoles: pptCl_mol,
          precipitatedMassMg: Number((pptCl_mol * 143.32 * 1000).toFixed(2)),
          remainingM: remainingCl_M,
          color: '#F8FAFC'
        }
      ],
      currentFreeAgConcM: freeAgM,
      activePrecipitatingIon: activeIon,
      stageDescriptionVI
    };
  }

  /**
   * Simulate Amphoteric Hydroxide Re-dissolution in Excess Alkali (Al(OH)3 & Zn(OH)2)
   */
  public static simulateAmphotericDissolution(
    metalType: 'ALUMINUM' | 'ZINC',
    initialMetalConcM: number = 0.1,
    addedOhConcentrationM: number = 0.0,
    volumeLitres: number = 0.1
  ): {
    precipitateMassMg: number;
    complexMoles: number;
    freeMetalRemainingM: number;
    isPrecipitatePresent: boolean;
    isComplexFormed: boolean;
    stageStateVI: string;
    explanationVI: string;
  } {
    const isAl = metalType === 'ALUMINUM';
    const molarMass = isAl ? 78.0 : 99.42; // Al(OH)3 vs Zn(OH)2
    const stoichPpt = isAl ? 3 : 2; // Al3+ + 3OH- or Zn2+ + 2OH-
    const stoichDissolve = 1; // Al(OH)3 + 1OH- -> [Al(OH)4]- ; Zn(OH)2 + 2OH- -> [Zn(OH)4]2-
    const totalDissolveRatio = isAl ? 4 : 4; // Total OH- needed per metal ion to fully dissolve

    const metalMolesInitial = initialMetalConcM * volumeLitres;
    const ohMolesAdded = addedOhConcentrationM * volumeLitres;
    const ratio = ohMolesAdded / Math.max(1e-9, metalMolesInitial);

    let precipitateMoles = 0;
    let complexMoles = 0;
    let freeMetalRemainingM = 0;
    let stageStateVI = '';
    let explanationVI = '';

    if (ratio < stoichPpt) {
      // Precipitation forming stage
      precipitateMoles = ohMolesAdded / stoichPpt;
      const consumedMetal = precipitateMoles;
      freeMetalRemainingM = (metalMolesInitial - consumedMetal) / volumeLitres;
      complexMoles = 0;
      stageStateVI = `Đang kết tủa (${(ratio / stoichPpt * 100).toFixed(0)}% cực đại)`;
      explanationVI = `Thêm từ từ dung dịch kiềm OH⁻: Ion kim loại ${isAl ? 'Al³⁺' : 'Zn²⁺'} phản ứng tạo kết tủa keo trắng ${isAl ? 'Al(OH)₃↓' : 'Zn(OH)₂↓'}. Nồng độ kết tủa tăng dần.`;
    } else if (ratio >= stoichPpt && ratio < totalDissolveRatio) {
      // Peak reached, beginning amphoteric dissolution
      const peakPrecipitate = metalMolesInitial;
      const excessOhMoles = ohMolesAdded - stoichPpt * metalMolesInitial;
      const redissolvedMoles = Math.min(peakPrecipitate, excessOhMoles / (isAl ? 1 : 2));
      precipitateMoles = peakPrecipitate - redissolvedMoles;
      complexMoles = redissolvedMoles;
      freeMetalRemainingM = 0;
      stageStateVI = `Đang hòa tan tạo phức (${((1 - precipitateMoles / peakPrecipitate) * 100).toFixed(0)}% đã tan)`;
      explanationVI = `Kiềm dư bắt đầu hòa tan kết tủa keo: ${isAl ? 'Al(OH)₃ + OH⁻ ⇌ [Al(OH)₄]⁻' : 'Zn(OH)₂ + 2OH⁻ ⇌ [Zn(OH)₄]²⁻'}. Lượng kết tủa giảm dần.`;
    } else {
      // Complete dissolution into clear complex solution
      precipitateMoles = 0;
      complexMoles = metalMolesInitial;
      freeMetalRemainingM = 0;
      stageStateVI = 'Tan hoàn toàn thành dung dịch trong suốt';
      explanationVI = `Kiềm mạnh dư hoàn toàn (tỉ lệ OH⁻/Kim loại ≥ ${totalDissolveRatio}): Toàn bộ kết tủa đã tan thành phức chất ${isAl ? '[Al(OH)₄]⁻' : '[Zn(OH)₄]²⁻'} tan trong suốt!`;
    }

    const precipitateMassMg = Number((precipitateMoles * molarMass * 1000).toFixed(2));

    return {
      precipitateMassMg,
      complexMoles,
      freeMetalRemainingM,
      isPrecipitatePresent: precipitateMassMg > 0.05,
      isComplexFormed: complexMoles > 0,
      stageStateVI,
      explanationVI
    };
  }

  /**
   * Normalize subscripts (e.g. BaSO₄ -> BASO4, Al(OH)₃ -> ALOH3)
   */
  public static normalizeFormula(str: string): string {
    const subscriptMap: Record<string, string> = {
      '₀': '0', '₁': '1', '₂': '2', '₃': '3', '₄': '4',
      '₅': '5', '₆': '6', '₇': '7', '₈': '8', '₉': '9'
    };
    return str
      .split('')
      .map(c => subscriptMap[c] || c)
      .join('')
      .toUpperCase()
      .replace(/[\s\-_()]/g, '');
  }

  /**
   * Look up salt by id or formula with subscript normalization
   */
  public static getSalt(query: string): SparinglySolubleSalt | undefined {
    const qNorm = this.normalizeFormula(query);
    return CURRICULUM_SPARINGLY_SOLUBLE_SALTS.find(s => {
      const sIdNorm = this.normalizeFormula(s.id);
      const sFormulaNorm = this.normalizeFormula(s.formula);
      return sIdNorm === qNorm || sFormulaNorm === qNorm;
    });
  }
}
