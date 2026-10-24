// src/domain/periodicTrendsOctetEngine.ts
// Comprehensive Periodic Trends, Period 3 Oxide/Hydroxide Acid-Base, Ionization Anomalies & Octet Exceptions Engine
// Strictly conforming to Vietnam GDPT 2018 Chemistry Grade 10 (Chủ đề 2 & 3: Bảng tuần hoàn & Liên kết hóa học) & IUPAC Standards

export interface Period3ElementTrend {
  symbol: string;
  nameVi: string;
  atomicNumber: number;
  electronConfig: string;
  valenceElectrons: number;
  atomicRadiusPm: number; // Picometers
  firstIonizationEnergyKj: number; // kJ/mol
  electronegativity: number; // Pauling
  highestOxideFormula: string;
  highestOxideState: number;
  highestHydroxideFormula: string;
  acidBaseCharacterVi: string;
  acidBaseCategory: 'STRONG_BASE' | 'MEDIUM_BASE' | 'AMPHOTERIC' | 'WEAK_ACID' | 'MEDIUM_ACID' | 'STRONG_ACID' | 'VERY_STRONG_ACID' | 'INERT';
  chemicalEquationVi: string;
}

export interface IonizationAnomaly {
  pairNameVi: string;
  element1: { symbol: string; config: string; i1: number };
  element2: { symbol: string; config: string; i1: number };
  isAnomaly: boolean; // true if element1 > element2 despite higher Z in element2
  explanationVi: string;
  quantumPrincipleVi: string;
}

export type OctetCategory = 'REGULAR_OCTET' | 'INCOMPLETE_OCTET' | 'EXPANDED_OCTET' | 'ODD_ELECTRON_RADICAL';

export interface OctetMoleculeCase {
  formula: string;
  nameVi: string;
  category: OctetCategory;
  categoryNameVi: string;
  centralAtom: string;
  valenceElectronsAroundCentral: number;
  geometryVi: string;
  lewisStructureDescriptionVi: string;
  reactivitySignificanceVi: string;
}

// -----------------------------------------------------------------------------
// 1. PERIOD 3 TRENDS CATALOG (Na to Ar)
// -----------------------------------------------------------------------------

export const PERIOD_3_TRENDS_CATALOG: Period3ElementTrend[] = [
  {
    symbol: 'Na',
    nameVi: 'Sodium',
    atomicNumber: 11,
    electronConfig: '[Ne] 3s¹',
    valenceElectrons: 1,
    atomicRadiusPm: 186,
    firstIonizationEnergyKj: 496,
    electronegativity: 0.93,
    highestOxideFormula: 'Na2O',
    highestOxideState: 1,
    highestHydroxideFormula: 'NaOH',
    acidBaseCharacterVi: 'Base mạnh (kiềm ăn da)',
    acidBaseCategory: 'STRONG_BASE',
    chemicalEquationVi: 'Na2O + H2O -> 2NaOH (tan hoàn toàn, pH > 13)'
  },
  {
    symbol: 'Mg',
    nameVi: 'Magnesium',
    atomicNumber: 12,
    electronConfig: '[Ne] 3s²',
    valenceElectrons: 2,
    atomicRadiusPm: 160,
    firstIonizationEnergyKj: 738,
    electronegativity: 1.31,
    highestOxideFormula: 'MgO',
    highestOxideState: 2,
    highestHydroxideFormula: 'Mg(OH)2',
    acidBaseCharacterVi: 'Base trung bình yếu (ít tan)',
    acidBaseCategory: 'MEDIUM_BASE',
    chemicalEquationVi: 'MgO + 2HCl -> MgCl2 + H2O (chỉ tan trong acid)'
  },
  {
    symbol: 'Al',
    nameVi: 'Aluminium',
    atomicNumber: 13,
    electronConfig: '[Ne] 3s² 3p¹',
    valenceElectrons: 3,
    atomicRadiusPm: 143,
    firstIonizationEnergyKj: 578, // ANOMALY: lower than Mg (738)
    electronegativity: 1.61,
    highestOxideFormula: 'Al2O3',
    highestOxideState: 3,
    highestHydroxideFormula: 'Al(OH)3',
    acidBaseCharacterVi: 'Hydroxide lưỡng tính (vừa tan trong acid vừa tan trong kiềm)',
    acidBaseCategory: 'AMPHOTERIC',
    chemicalEquationVi: 'Al(OH)3 + 3HCl -> AlCl3 + 3H2O; Al(OH)3 + NaOH -> Na[Al(OH)4]'
  },
  {
    symbol: 'Si',
    nameVi: 'Silicon',
    atomicNumber: 14,
    electronConfig: '[Ne] 3s² 3p²',
    valenceElectrons: 4,
    atomicRadiusPm: 118,
    firstIonizationEnergyKj: 786,
    electronegativity: 1.90,
    highestOxideFormula: 'SiO2',
    highestOxideState: 4,
    highestHydroxideFormula: 'H2SiO3 (H4SiO4)',
    acidBaseCharacterVi: 'Acid rất yếu (kết tủa keo trắng, yếu hơn cả H2CO3)',
    acidBaseCategory: 'WEAK_ACID',
    chemicalEquationVi: 'Na2SiO3 + CO2 + H2O -> Na2CO3 + H2SiO3 v'
  },
  {
    symbol: 'P',
    nameVi: 'Phosphorus',
    atomicNumber: 15,
    electronConfig: '[Ne] 3s² 3p³',
    valenceElectrons: 5,
    atomicRadiusPm: 110,
    firstIonizationEnergyKj: 1012,
    electronegativity: 2.19,
    highestOxideFormula: 'P2O5',
    highestOxideState: 5,
    highestHydroxideFormula: 'H3PO4',
    acidBaseCharacterVi: 'Acid có độ mạnh trung bình (axit ba nấc)',
    acidBaseCategory: 'MEDIUM_ACID',
    chemicalEquationVi: 'P2O5 + 3H2O -> 2H3PO4 (phản ứng tỏa nhiệt mạnh)'
  },
  {
    symbol: 'S',
    nameVi: 'Sulfur',
    atomicNumber: 16,
    electronConfig: '[Ne] 3s² 3p⁴',
    valenceElectrons: 6,
    atomicRadiusPm: 104,
    firstIonizationEnergyKj: 1000, // ANOMALY: slightly lower than P (1012)
    electronegativity: 2.58,
    highestOxideFormula: 'SO3',
    highestOxideState: 6,
    highestHydroxideFormula: 'H2SO4',
    acidBaseCharacterVi: 'Acid mạnh (axit hai nấc, hóa chất công nghiệp số 1 thế giới)',
    acidBaseCategory: 'STRONG_ACID',
    chemicalEquationVi: 'SO3 + H2O -> H2SO4 (hấp thụ vào H2SO4 đặc tạo oleum)'
  },
  {
    symbol: 'Cl',
    nameVi: 'Chlorine',
    atomicNumber: 17,
    electronConfig: '[Ne] 3s² 3p⁵',
    valenceElectrons: 7,
    atomicRadiusPm: 99,
    firstIonizationEnergyKj: 1251,
    electronegativity: 3.16,
    highestOxideFormula: 'Cl2O7',
    highestOxideState: 7,
    highestHydroxideFormula: 'HClO4',
    acidBaseCharacterVi: 'Acid rất mạnh (mạnh nhất trong các oxoacid vô cơ, pKa ≈ -10)',
    acidBaseCategory: 'VERY_STRONG_ACID',
    chemicalEquationVi: 'Cl2O7 + H2O -> 2HClO4 (chất oxi hóa cực mạnh ở nhiệt độ cao)'
  },
  {
    symbol: 'Ar',
    nameVi: 'Argon',
    atomicNumber: 18,
    electronConfig: '[Ne] 3s² 3p⁶',
    valenceElectrons: 8,
    atomicRadiusPm: 98,
    highestOxideFormula: 'Không có (khí hiếm)',
    highestOxideState: 0,
    highestHydroxideFormula: 'Không có',
    firstIonizationEnergyKj: 1521,
    electronegativity: 0, // Noble gas
    acidBaseCharacterVi: 'Khí hiếm trơ về mặt hóa học do đạt vỏ octet bão hòa bền vững',
    acidBaseCategory: 'INERT',
    chemicalEquationVi: 'Cấu hình octet bền vững 3s² 3p⁶, không tạo oxide hay hydroxide ở điều kiện thường'
  }
];

// -----------------------------------------------------------------------------
// 2. FIRST IONIZATION ENERGY ANOMALIES (Quantum Subshell Half-Filled Stability)
// -----------------------------------------------------------------------------

export const IONIZATION_ANOMALIES: IonizationAnomaly[] = [
  {
    pairNameVi: 'Beryllium (Be) vs Boron (B) — Chu kỳ 2',
    element1: { symbol: 'Be', config: '1s² 2s²', i1: 899 },
    element2: { symbol: 'B', config: '1s² 2s² 2p¹', i1: 801 },
    isAnomaly: true,
    explanationVi: 'Mặc dù Boron có Z = 5 lớn hơn Beryllium (Z = 4), I1 của B (801 kJ/mol) lại nhỏ hơn Be (899 kJ/mol). Nguyên nhân: Be có phân lớp 2s² bão hòa bền vững; electron tách ra của B nằm ở phân lớp 2p¹ có mức năng lượng cao hơn và bị chắn bởi lớp 2s² nên dễ bứt ra hơn.',
    quantumPrincipleVi: 'Bền vững phân lớp bão hòa (s²) và hiệu ứng chắn (shielding effect) của các phân lớp bên trong.'
  },
  {
    pairNameVi: 'Nitrogen (N) vs Oxygen (O) — Chu kỳ 2',
    element1: { symbol: 'N', config: '1s² 2s² 2p³', i1: 1402 },
    element2: { symbol: 'O', config: '1s² 2s² 2p⁴', i1: 1314 },
    isAnomaly: true,
    explanationVi: 'Nitrogen có Z = 7 nhưng I1 (1402 kJ/mol) lại cao hơn Oxygen (Z = 8, 1314 kJ/mol). Nguyên nhân: N có phân lớp 2p³ bán bão hòa (mỗi orbital p chứa 1 electron độc thân cùng chiều spin) có năng lượng trao đổi đối xứng cực kỳ bền vững. Ở O (2p⁴), có 1 orbital 2p chứa cặp electron ghép đôi; lực đẩy tĩnh điện giữa 2 electron trong cùng 1 orbital làm giảm năng lượng cần thiết để bứt electron này ra.',
    quantumPrincipleVi: 'Quy tắc Hund và sự bền vững của cấu hình phân lớp bán bão hòa (p³).'
  },
  {
    pairNameVi: 'Magnesium (Mg) vs Aluminium (Al) — Chu kỳ 3',
    element1: { symbol: 'Mg', config: '[Ne] 3s²', i1: 738 },
    element2: { symbol: 'Al', config: '[Ne] 3s² 3p¹', i1: 578 },
    isAnomaly: true,
    explanationVi: 'Tương tự cặp Be/B: Mg có phân lớp 3s² bão hòa (738 kJ/mol) bền vững hơn so với electron độc thân 3p¹ của Al (578 kJ/mol).',
    quantumPrincipleVi: 'Bền vững phân lớp bão hòa 3s² so với 3s² 3p¹.'
  },
  {
    pairNameVi: 'Phosphorus (P) vs Sulfur (S) — Chu kỳ 3',
    element1: { symbol: 'P', config: '[Ne] 3s² 3p³', i1: 1012 },
    element2: { symbol: 'S', config: '[Ne] 3s² 3p⁴', i1: 1000 },
    isAnomaly: true,
    explanationVi: 'Tương tự cặp N/O: P có phân lớp 3p³ bán bão hòa (1012 kJ/mol) bền hơn so với cặp electron đẩy nhau ở orbital 3p của S (1000 kJ/mol).',
    quantumPrincipleVi: 'Bền vững phân lớp bán bão hòa 3p³ so với 3p⁴.'
  }
];

// -----------------------------------------------------------------------------
// 3. OCTET RULE AND EXCEPTIONS (GDPT 2018 Grade 10)
// -----------------------------------------------------------------------------

export const OCTET_CASES: OctetMoleculeCase[] = [
  {
    formula: 'CH4',
    nameVi: 'Methane (Khí bãi bùn)',
    category: 'REGULAR_OCTET',
    categoryNameVi: 'Thỏa mãn quy tắc Octet hoàn toàn (8e)',
    centralAtom: 'C',
    valenceElectronsAroundCentral: 8,
    geometryVi: 'Tứ diện đều (Tetrahedral, góc liên kết 109.5°)',
    lewisStructureDescriptionVi: 'Carbon dùng chung 4 cặp electron liên kết với 4 nguyên tử Hydrogen (4 liên kết C-H), đạt đủ 8 electron vỏ ngoài.',
    reactivitySignificanceVi: 'Phân tử không cực, rất bền vững ở điều kiện thường, chỉ phản ứng cháy hoặc thế halogen quang hóa.'
  },
  {
    formula: 'NH3',
    nameVi: 'Ammonia',
    category: 'REGULAR_OCTET',
    categoryNameVi: 'Thỏa mãn quy tắc Octet hoàn toàn (8e)',
    centralAtom: 'N',
    valenceElectronsAroundCentral: 8,
    geometryVi: 'Chóp tam giác (Trigonal pyramidal, góc 107°)',
    lewisStructureDescriptionVi: 'Nitrogen có 3 liên kết N-H và 1 cặp electron tự do (lone pair) chưa liên kết, tổng cộng 8 electron quanh N.',
    reactivitySignificanceVi: 'Cặp electron tự do giúp NH3 có tính base và khả năng tạo phức chất với ion kim loại chuyển tiếp.'
  },
  {
    formula: 'BeCl2',
    nameVi: 'Beryllium chloride (khí)',
    category: 'INCOMPLETE_OCTET',
    categoryNameVi: 'Thiếu Octet (Chỉ có 4 electron quanh Be)',
    centralAtom: 'Be',
    valenceElectronsAroundCentral: 4,
    geometryVi: 'Đường thẳng (Linear, góc liên kết 180°)',
    lewisStructureDescriptionVi: 'Be chỉ có 2 electron hóa trị tạo 2 liên kết cộng hóa trị đơn với 2 nguyên tử Cl, xung quanh Be chỉ có 4 electron (thiếu octet).',
    reactivitySignificanceVi: 'BeCl2 rất háo electron, dễ trùng hợp tạo cầu nối Cl hoặc nhận cặp electron từ base Lewis.'
  },
  {
    formula: 'BF3',
    nameVi: 'Boron trifluoride',
    category: 'INCOMPLETE_OCTET',
    categoryNameVi: 'Thiếu Octet (Chỉ có 6 electron quanh B)',
    centralAtom: 'B',
    valenceElectronsAroundCentral: 6,
    geometryVi: 'Tam giác phẳng (Trigonal planar, góc 120°)',
    lewisStructureDescriptionVi: 'B chỉ có 3 electron hóa trị tạo 3 liên kết B-F, xung quanh B có 6 electron, còn 1 orbital p trống.',
    reactivitySignificanceVi: 'Acid Lewis kinh điển trong hóa học hữu cơ; tạo liên kết cho - nhận (phối trí) mạnh mẽ với NH3: F3B <- :NH3.'
  },
  {
    formula: 'PCl5',
    nameVi: 'Phosphorus pentachloride',
    category: 'EXPANDED_OCTET',
    categoryNameVi: 'Mở rộng Octet (10 electron quanh P)',
    centralAtom: 'P',
    valenceElectronsAroundCentral: 10,
    geometryVi: 'Lưỡng chóp tam giác (Trigonal bipyramidal)',
    lewisStructureDescriptionVi: 'P ở chu kỳ 3 có phân lớp 3d trống, kích thích electron tạo 5 liên kết đơn P-Cl, chứa 10 electron xung quanh.',
    reactivitySignificanceVi: 'Chất clo hóa mạnh trong tổng hợp hóa dược và phân hủy nhiệt thành PCl3 + Cl2.'
  },
  {
    formula: 'SF6',
    nameVi: 'Sulfur hexafluoride',
    category: 'EXPANDED_OCTET',
    categoryNameVi: 'Mở rộng Octet (12 electron quanh S)',
    centralAtom: 'S',
    valenceElectronsAroundCentral: 12,
    geometryVi: 'Bát diện đều (Octahedral, góc 90°)',
    lewisStructureDescriptionVi: 'S sử dụng các orbital 3s, 3p và 3d để tạo 6 liên kết S-F đối xứng hoàn hảo, chứa 12 electron xung quanh S.',
    reactivitySignificanceVi: 'Khí cách điện siêu việt trong máy cắt cao thế nhờ độ trơ hóa học tuyệt đối và không độc hại.'
  },
  {
    formula: 'NO2',
    nameVi: 'Nitrogen dioxide (Khí màu nâu đỏ)',
    category: 'ODD_ELECTRON_RADICAL',
    categoryNameVi: 'Phân tử electron lẻ / Gốc tự do (17 electron hóa trị)',
    centralAtom: 'N',
    valenceElectronsAroundCentral: 7, // 1 unshared lone electron
    geometryVi: 'Góc (Bent, góc 134°)',
    lewisStructureDescriptionVi: 'Tổng số electron hóa trị của phân tử là 5 + 2*6 = 17 (số lẻ). Nguyên tử N mang 1 electron độc thân (radical) chưa ghép đôi.',
    reactivitySignificanceVi: 'Có tính thuận từ (paramagnetic) và màu nâu đỏ; có xu hướng nhị hợp hóa giải phóng nhiệt để triệt tiêu electron độc thân: 2NO2 (nâu) <=> N2O4 (không màu), delta H < 0.'
  }
];

// -----------------------------------------------------------------------------
// 4. NO2 - N2O4 EQUILIBRIUM SIMULATOR (Temperature & Pressure Le Chatelier)
// -----------------------------------------------------------------------------

export interface NO2DimerizationState {
  temperatureC: number;
  pressureAtm: number;
  fractionNO2: number; // 0.0 to 1.0 (Brown color intensity)
  fractionN2O4: number; // 0.0 to 1.0 (Colorless)
  hexColor: string; // RGB gradient from transparent to deep reddish brown
  dominantSpeciesVi: string;
  explanationVi: string;
}

export function simulateNO2Dimerization(
  temperatureC: number = 25,
  pressureAtm: number = 1.0
): NO2DimerizationState {
  // Reaction: 2 NO2(g) [brown] <=> N2O4(g) [colorless], delta_r H° = -57.2 kJ/mol (Exothermic)
  // Higher temperature shifts equilibrium LEFT (favoring NO2, brown increases)
  // Higher pressure shifts equilibrium RIGHT (2 moles gas -> 1 mole gas, favoring N2O4, color fades)
  // T in Kelvin
  const T = temperatureC + 273.15;
  // Approximate standard equilibrium constant Kp = P(N2O4) / P(NO2)^2
  // At 298.15 K (25°C), Kp ≈ 8.8 atm^-1
  // Van 't Hoff: ln(Kp(T) / Kp(298)) = (-delta H / R) * (1/T - 1/298.15)
  const R = 8.314; // J/(mol*K)
  const deltaH = -57200; // J/mol
  const lnRatio = (-deltaH / R) * (1 / T - 1 / 298.15);
  const Kp = 8.8 * Math.exp(lnRatio);

  // Equilibrium equation with total pressure P:
  // Let alpha = degree of dissociation of N2O4 into 2 NO2:
  // N2O4 <=> 2 NO2
  // Kp_diss = 1 / Kp = 4*alpha^2 * P / (1 - alpha^2)
  // 4*P*alpha^2 = Kp_diss * (1 - alpha^2) = Kp_diss - Kp_diss * alpha^2
  // alpha^2 * (4*P + Kp_diss) = Kp_diss
  // alpha = sqrt( Kp_diss / (4*P + Kp_diss) )
  const Kp_diss = 1 / Math.max(0.001, Kp);
  const alpha = Math.sqrt(Kp_diss / (4 * pressureAtm + Kp_diss));

  // Mole fraction of NO2 in equilibrium mixture:
  // Total moles = (1 - alpha) + 2*alpha = 1 + alpha
  // y(NO2) = 2*alpha / (1 + alpha)
  // y(N2O4) = (1 - alpha) / (1 + alpha)
  const fractionNO2 = Math.min(1.0, Math.max(0.0, (2 * alpha) / (1 + alpha)));
  const fractionN2O4 = Math.max(0.0, 1.0 - fractionNO2);

  // Color calculation: NO2 is brown (#7c2d12 / #9a3412 / #b45309).
  // Alpha blending from almost clear (#fef3c7 at low NO2) to intense brown (#451a03)
  const r = Math.round(254 - fractionNO2 * (254 - 69));
  const g = Math.round(243 - fractionNO2 * (243 - 26));
  const b = Math.round(199 - fractionNO2 * (199 - 3));
  const hexColor = `rgb(${r}, ${g}, ${b})`;

  let dominantSpeciesVi = '';
  let explanationVi = '';

  if (temperatureC < 0) {
    dominantSpeciesVi = 'Dinitrogen tetroxide (N2O4) chiếm ưu thế áp đảo (> 95%)';
    explanationVi = 'Ở nhiệt độ thấp (hạ nhiệt bằng nước đá), cân bằng chuyển dịch theo chiều thuận tỏa nhiệt tạo N2O4 không màu.';
  } else if (temperatureC > 60) {
    dominantSpeciesVi = 'Nitrogen dioxide (NO2) chiếm ưu thế áp đảo (> 85%)';
    explanationVi = 'Ở nhiệt độ cao (đun nóng bằng nước sôi), cân bằng chuyển dịch theo chiều nghịch thu nhiệt tạo khí NO2 màu nâu đỏ đậm.';
  } else {
    dominantSpeciesVi = 'Hỗn hợp cân bằng động NO2 và N2O4';
    explanationVi = `Ở ${temperatureC}°C và ${pressureAtm} atm, khí có màu nâu nhạt với ${Math.round(fractionNO2 * 100)}% NO2 và ${Math.round(fractionN2O4 * 100)}% N2O4.`;
  }

  return {
    temperatureC,
    pressureAtm,
    fractionNO2: Number(fractionNO2.toFixed(3)),
    fractionN2O4: Number(fractionN2O4.toFixed(3)),
    hexColor,
    dominantSpeciesVi,
    explanationVi
  };
}
