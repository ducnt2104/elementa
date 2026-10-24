// src/domain/saltHydrolysisEngine.ts
// Comprehensive Salt Hydrolysis, Aqueous Solution pH, Indicator Colors & Alum Water Clarification Engine
// Strictly conforming to Vietnam GDPT 2018 Chemistry Grade 11 (Chủ đề 2: Cân bằng trong dung dịch nước) & IUPAC Standards

export type SaltHydrolysisType =
  | 'NEUTRAL_NO_HYDROLYSIS' // Strong Base + Strong Acid (NaCl, KNO3) -> pH = 7
  | 'BASIC_ANION_HYDROLYSIS' // Strong Base + Weak Acid (CH3COONa, Na2CO3) -> pH > 7
  | 'ACIDIC_CATION_HYDROLYSIS' // Weak Base + Strong Acid (NH4Cl, Al2(SO4)3, FeCl3) -> pH < 7
  | 'DUAL_HYDROLYSIS'; // Weak Base + Weak Acid (CH3COONH4, (NH4)2CO3) -> depends on Ka/Kb

export interface SaltHydrolysisProfile {
  formula: string;
  nameVi: string;
  nameEn: string;
  cation: string;
  anion: string;
  parentBaseVi: string;
  parentAcidVi: string;
  hydrolysisType: SaltHydrolysisType;
  typeDescriptionVi: string;
  hydrolysisEquationVi: string;
  nominalPh01M: number;
  litmusColorVi: string;
  litmusHex: string;
  phenolphthaleinColorVi: string;
  phenolphthaleinHex: string;
  methylOrangeColorVi: string;
  methylOrangeHex: string;
  realWorldApplicationVi: string;
}

export interface AlumClarificationSimulation {
  initialTurbidityNtu: number; // Nephelometric Turbidity Units (e.g., 200 NTU muddy river water)
  alumDoseMgL: number; // mg/L of KAl(SO4)2.12H2O
  equilibriumPh: number;
  colloidalAlOH3MgL: number;
  sedimentRemovedPercent: number;
  finalTurbidityNtu: number;
  waterAppearanceVi: string;
  waterHexColor: string;
  scientificMechanismVi: string;
}

// -----------------------------------------------------------------------------
// 1. SALT HYDROLYSIS PROFILES CATALOG (GDPT 2018 Grade 11)
// -----------------------------------------------------------------------------

export const SALT_HYDROLYSIS_CATALOG: SaltHydrolysisProfile[] = [
  {
    formula: 'NaCl',
    nameVi: 'Sodium chloride (Muối ăn)',
    nameEn: 'Sodium chloride',
    cation: 'Na+ (từ base mạnh NaOH)',
    anion: 'Cl- (từ acid mạnh HCl)',
    parentBaseVi: 'NaOH (Base mạnh)',
    parentAcidVi: 'HCl (Acid mạnh)',
    hydrolysisType: 'NEUTRAL_NO_HYDROLYSIS',
    typeDescriptionVi: 'Muối của base mạnh và acid mạnh, cả cation và anion đều không bị thủy phân.',
    hydrolysisEquationVi: 'Na+ + H2O -> Không phản ứng; Cl- + H2O -> Không phản ứng',
    nominalPh01M: 7.0,
    litmusColorVi: 'Màu tím (Không đổi màu)',
    litmusHex: '#a855f7',
    phenolphthaleinColorVi: 'Không màu',
    phenolphthaleinHex: '#f8fafc',
    methylOrangeColorVi: 'Màu vàng',
    methylOrangeHex: '#eab308',
    realWorldApplicationVi: 'Dung dịch đẳng trương sinh lý 0.9% tiêm truyền y tế; bảo quản thực phẩm.'
  },
  {
    formula: 'CH3COONa',
    nameVi: 'Sodium acetate',
    nameEn: 'Sodium acetate',
    cation: 'Na+ (từ base mạnh NaOH)',
    anion: 'CH3COO- (từ acid yếu CH3COOH)',
    parentBaseVi: 'NaOH (Base mạnh)',
    parentAcidVi: 'CH3COOH (Acid yếu, Ka = 1.8e-5)',
    hydrolysisType: 'BASIC_ANION_HYDROLYSIS',
    typeDescriptionVi: 'Anion của acid yếu nhận proton từ nước tạo OH-, dung dịch có tính kiềm (pH > 7).',
    hydrolysisEquationVi: 'CH3COO- + H2O <=> CH3COOH + OH- (Kb = Kw/Ka = 5.56e-10)',
    nominalPh01M: 8.87,
    litmusColorVi: 'Màu xanh lục / xanh lam',
    litmusHex: '#3b82f6',
    phenolphthaleinColorVi: 'Màu hồng nhạt',
    phenolphthaleinHex: '#f472b6',
    methylOrangeColorVi: 'Màu vàng',
    methylOrangeHex: '#eab308',
    realWorldApplicationVi: 'Dung dịch đệm pH trong phòng thí nghiệm; túi sưởi nhiệt tinh thể nóng (hot ice).'
  },
  {
    formula: 'Na2CO3',
    nameVi: 'Sodium carbonate (Soda / Thuốc giặt)',
    nameEn: 'Sodium carbonate',
    cation: 'Na+ (từ base mạnh NaOH)',
    anion: 'CO3(2-) (từ acid yếu H2CO3)',
    parentBaseVi: 'NaOH (Base mạnh)',
    parentAcidVi: 'H2CO3 (Acid yếu, Ka2 = 4.8e-11)',
    hydrolysisType: 'BASIC_ANION_HYDROLYSIS',
    typeDescriptionVi: 'Anion carbonate thủy phân mạnh nấc 1 giải phóng nhiều ion OH-, dung dịch có tính kiềm mạnh (pH ≈ 11.6).',
    hydrolysisEquationVi: 'CO3^2- + H2O <=> HCO3^- + OH- (nấc 1); HCO3^- + H2O <=> H2CO3 + OH- (nấc 2)',
    nominalPh01M: 11.64,
    litmusColorVi: 'Màu xanh thẫm',
    litmusHex: '#1d4ed8',
    phenolphthaleinColorVi: 'Màu đỏ tía (hồng thẫm)',
    phenolphthaleinHex: '#db2777',
    methylOrangeColorVi: 'Màu vàng',
    methylOrangeHex: '#eab308',
    realWorldApplicationVi: 'Chất tẩy dầu mỡ công nghiệp; làm mềm nước cứng vĩnh cửu và tạm thời; sản xuất thủy tinh.'
  },
  {
    formula: 'NH4Cl',
    nameVi: 'Ammonium chloride (Muối xơ an)',
    nameEn: 'Ammonium chloride',
    cation: 'NH4+ (từ base yếu NH3)',
    anion: 'Cl- (từ acid mạnh HCl)',
    parentBaseVi: 'NH3 (Base yếu, Kb = 1.8e-5)',
    parentAcidVi: 'HCl (Acid mạnh)',
    hydrolysisType: 'ACIDIC_CATION_HYDROLYSIS',
    typeDescriptionVi: 'Cation ammonium nhường proton cho nước tạo ion H3O+, dung dịch có tính acid (pH < 7).',
    hydrolysisEquationVi: 'NH4^+ + H2O <=> NH3 + H3O^+ (Ka = Kw/Kb = 5.56e-10)',
    nominalPh01M: 5.13,
    litmusColorVi: 'Màu đỏ / hồng cam',
    litmusHex: '#ef4444',
    phenolphthaleinColorVi: 'Không màu',
    phenolphthaleinHex: '#f8fafc',
    methylOrangeColorVi: 'Màu da cam',
    methylOrangeHex: '#f97316',
    realWorldApplicationVi: 'Phân bón đạm amoni (làm chua đất phèn); chất trợ hàn kim loại (tẩy màng oxit); pin khô Leclanché.'
  },
  {
    formula: 'Al2(SO4)3',
    nameVi: 'Aluminium sulfate (Phèn nhôm / Phèn chua)',
    nameEn: 'Aluminium sulfate',
    cation: 'Al3+ (từ base yếu Al(OH)3)',
    anion: 'SO4(2-) (từ acid mạnh H2SO4)',
    parentBaseVi: 'Al(OH)3 (Hydroxide lưỡng tính ít tan)',
    parentAcidVi: 'H2SO4 (Acid mạnh)',
    hydrolysisType: 'ACIDIC_CATION_HYDROLYSIS',
    typeDescriptionVi: 'Ion Al3+ phân cực mạnh làm phân ly liên kết O-H của các phân tử nước trong phức aqua [Al(H2O)6]3+, giải phóng H+ làm dung dịch có tính acid mạnh (pH ≈ 3.4).',
    hydrolysisEquationVi: 'Al^3+ + 3H2O <=> Al(OH)3 v (keo) + 3H^+',
    nominalPh01M: 3.42,
    litmusColorVi: 'Màu đỏ tươi',
    litmusHex: '#dc2626',
    phenolphthaleinColorVi: 'Không màu',
    phenolphthaleinHex: '#f8fafc',
    methylOrangeColorVi: 'Màu đỏ',
    methylOrangeHex: '#ef4444',
    realWorldApplicationVi: 'Keo tụ làm trong nước sinh hoạt và nước lũ; thuộc da; định hình sợi trong sản xuất giấy.'
  },
  {
    formula: 'FeCl3',
    nameVi: 'Iron(III) chloride',
    nameEn: 'Iron(III) chloride',
    cation: 'Fe3+ (từ base yếu Fe(OH)3)',
    anion: 'Cl- (từ acid mạnh HCl)',
    parentBaseVi: 'Fe(OH)3 (Base yếu kết tủa nâu đỏ)',
    parentAcidVi: 'HCl (Acid mạnh)',
    hydrolysisType: 'ACIDIC_CATION_HYDROLYSIS',
    typeDescriptionVi: 'Ion Fe3+ có mật độ điện tích cực cao, thủy phân mạnh tạo dung dịch có màu vàng nâu và tính acid mạnh (pH ≈ 2.1).',
    hydrolysisEquationVi: 'Fe^3+ + 3H2O <=> Fe(OH)3 v + 3H^+',
    nominalPh01M: 2.15,
    litmusColorVi: 'Màu đỏ sẫm',
    litmusHex: '#b91c1c',
    phenolphthaleinColorVi: 'Không màu',
    phenolphthaleinHex: '#f8fafc',
    methylOrangeColorVi: 'Màu đỏ',
    methylOrangeHex: '#dc2626',
    realWorldApplicationVi: 'Chất keo tụ xử lý nước thải công nghiệp; chất ăn mòn chế tạo bo mạch in điện tử (PCB).'
  },
  {
    formula: 'CH3COONH4',
    nameVi: 'Ammonium acetate',
    nameEn: 'Ammonium acetate',
    cation: 'NH4+ (từ base yếu NH3, Kb = 1.8e-5)',
    anion: 'CH3COO- (từ acid yếu CH3COOH, Ka = 1.8e-5)',
    parentBaseVi: 'NH3 (Base yếu)',
    parentAcidVi: 'CH3COOH (Acid yếu)',
    hydrolysisType: 'DUAL_HYDROLYSIS',
    typeDescriptionVi: 'Cả cation và anion đều bị thủy phân. Do Ka(CH3COOH) = Kb(NH3) = 1.8e-5 nên dung dịch trung tính (pH ≈ 7.0).',
    hydrolysisEquationVi: 'NH4^+ + CH3COO^- + H2O <=> NH3 + CH3COOH + H2O (pH = 7 + 0.5*(pKa - pKb) = 7.00)',
    nominalPh01M: 7.0,
    litmusColorVi: 'Màu tím (Không đổi màu)',
    litmusHex: '#a855f7',
    phenolphthaleinColorVi: 'Không màu',
    phenolphthaleinHex: '#f8fafc',
    methylOrangeColorVi: 'Màu vàng',
    methylOrangeHex: '#eab308',
    realWorldApplicationVi: 'Dung dịch đệm bay hơi trong sắc ký lỏng khối phổ (LC-MS); chất lợi tiểu trong y học.'
  }
];

// -----------------------------------------------------------------------------
// 2. ALUM WATER CLARIFICATION SIMULATOR (GDPT 2018 Experiment)
// -----------------------------------------------------------------------------

export function simulateAlumClarification(
  initialTurbidityNtu: number = 250, // 250 NTU muddy flood water
  alumDoseMgL: number = 50 // 0 to 120 mg/L
): AlumClarificationSimulation {
  // Reaction: Al3+ + 3 H2O <=> Al(OH)3 (floc) + 3 H+
  // Each mg of alum precipitates colloidal Al(OH)3 which sweeps negatively charged clay silt particles
  // Optimal dose around 40-70 mg/L removes > 96% turbidity
  // Overdose ( > 100 mg/L) drops pH too low and can re-stabilize colloids slightly
  const optimalDose = 55;
  const doseFactor = Math.min(1.0, alumDoseMgL / optimalDose);
  
  let sedimentRemovedPercent = 0;
  if (alumDoseMgL <= optimalDose) {
    sedimentRemovedPercent = Math.min(98.5, doseFactor * 96);
  } else {
    // slight overdosing efficiency plateau
    const excess = alumDoseMgL - optimalDose;
    sedimentRemovedPercent = Math.max(88, 98.5 - excess * 0.15);
  }

  const finalTurbidityNtu = Math.max(1.5, Number((initialTurbidityNtu * (1 - sedimentRemovedPercent / 100)).toFixed(1)));
  
  // pH drop due to released H+ ions (baseline water pH ~ 7.4)
  // Each 30 mg/L alum drops pH by ~0.4 units
  const equilibriumPh = Math.max(5.2, Number((7.4 - (alumDoseMgL / 30) * 0.45).toFixed(2)));
  const colloidalAlOH3MgL = Number((alumDoseMgL * 0.234).toFixed(1));

  // Visual appearance
  let waterAppearanceVi = '';
  let waterHexColor = '';

  if (alumDoseMgL === 0) {
    waterAppearanceVi = 'Nước phù sa đục ngầu, các hạt đất sét tích điện âm lơ lửng không thể tự lắng đọng.';
    waterHexColor = '#78350f'; // muddy brown
  } else if (alumDoseMgL < 25) {
    waterAppearanceVi = 'Bắt đầu hình thành các bông cặn nhỏ li ti, nước vẫn còn đục nhẹ chưa trong.';
    waterHexColor = '#d97706'; // yellowish brown
  } else if (alumDoseMgL <= 80) {
    waterAppearanceVi = 'Hình thành các mảng bông keo Al(OH)3 lớn xốp, kéo toàn bộ hạt sét lắng chặt xuống đáy bình, nước trong vắt!';
    waterHexColor = '#38bdf8'; // crystal clear sky blue
  } else {
    waterAppearanceVi = 'Dư thừa phèn nhôm: Bông keo tan một phần do môi trường acid (pH thấp), nước trong nhưng có vị chua chát.';
    waterHexColor = '#93c5fd'; // slightly acidic clear
  }

  const scientificMechanismVi = `Al³⁺ thủy phân mạnh theo cân bằng: Al³⁺ + 3H₂O ⇌ Al(OH)₃ (keo) + 3H⁺. Các hạt keo Al(OH)₃ tích điện dương (+) trung hòa điện tích âm (-) của hạt phù sa lơ lửng, tạo thành bông cặn lớn lắng xuống đáy, loại bỏ ${sedimentRemovedPercent.toFixed(1)}% độ đục.`;

  return {
    initialTurbidityNtu,
    alumDoseMgL,
    equilibriumPh,
    colloidalAlOH3MgL,
    sedimentRemovedPercent: Number(sedimentRemovedPercent.toFixed(1)),
    finalTurbidityNtu,
    waterAppearanceVi,
    waterHexColor,
    scientificMechanismVi
  };
}
