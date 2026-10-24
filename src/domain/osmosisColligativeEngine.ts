// src/domain/osmosisColligativeEngine.ts
// Milestone 40: Chemical Osmosis, Colligative Properties & Van 't Hoff Factor Engine
// Standards: IUPAC Compendium of Analytical & Physical Chemistry + Vietnam GDPT 2018 (Hóa 10-12: Áp suất thẩm thấu, Tính chất nồng độ, Hệ số Van 't Hoff)

export const GAS_CONSTANT_R_ATM = 0.082057338; // L·atm / (mol·K)
export const WATER_KB = 0.512; // °C·kg/mol (Ebullioscopic constant for H2O)
export const WATER_KF = 1.86; // °C·kg/mol (Cryoscopic constant for H2O)
export const WATER_NORMAL_BP = 100.0; // °C
export const WATER_NORMAL_FP = 0.0; // °C
export const WATER_VAPOR_PRESSURE_25C_MMHG = 23.76; // mmHg at 298.15 K
export const PHYSIOLOGICAL_OSMOTIC_PRESSURE_ATM = 7.63; // ~300 mOsm/L at 37 °C (310.15 K)

export type SoluteType = 'NON_ELECTROLYTE' | 'STRONG_ELECTROLYTE' | 'WEAK_ELECTROLYTE';
export type TonicityClass = 'ISOTONIC' | 'HYPOTONIC' | 'HYPERTONIC';
export type RBCResponse = 'NORMAL_BICONCAVE' | 'TURGID_HEMOLYSIS' | 'CRENATION_SHRIVELED';

export interface ColligativeSolute {
  id: string;
  name: string;
  nameVI: string;
  formula: string;
  soluteType: SoluteType;
  molarMassGPerMol: number;
  ionCountN: number; // Number of ions per formula unit (1 for non-electrolytes)
  theoreticalMaxI: number; // Theoretical van 't Hoff factor at infinite dilution
  dissociationEquation: string;
  descriptionVI: string;
  colorHex: string;
}

export interface OsmoticPressureResult {
  solute: ColligativeSolute;
  temperatureKelvin: number;
  temperatureCelsius: number;
  molarConcentrationM: number;
  apparentVanTHoffI: number;
  effectiveOsmolarityOsmPerL: number;
  osmoticPressureAtm: number;
  osmoticPressureKPa: number;
  osmoticPressureBar: number;
  equilibriumWaterColumnHeightCm: number;
  tonicity: TonicityClass;
  rbcResponse: RBCResponse;
  rbcDescriptionVI: string;
  reverseOsmosisMinPressureAtm: number;
  pedagogicalInsightVI: string;
}

export interface ColligativePropertiesResult {
  solute: ColligativeSolute;
  molalityMolPerKg: number;
  apparentVanTHoffI: number;
  effectiveMolality: number;
  deltaTbCelsius: number;
  solutionBoilingPointCelsius: number;
  deltaTfCelsius: number;
  solutionFreezingPointCelsius: number;
  deltaPmmHg: number;
  vaporPressureMmHg: number;
  ebullioscopicVsCryoscopicRatio: number;
  deicingEfficiencyScore: number; // Scaled 1-100 compared to NaCl
  pedagogicalExplanationVI: string;
}

export interface ReverseOsmosisSimulation {
  feedSalinityGPerL: number;
  feedOsmoticPressureAtm: number;
  appliedPressureAtm: number;
  netDrivingPressureAtm: number;
  recoveryRatioPercent: number;
  permeateSalinityMgPerL: number;
  saltRejectionPercent: number;
  permeateFluxLPerM2Hour: number;
  isDesalinationFeasible: boolean;
  statusVI: string;
}

// ----------------------------------------------------------------------------
// SOLUTE CATALOG (IUPAC & VIETNAM GDPT 2018)
// ----------------------------------------------------------------------------
export const COLLIGATIVE_SOLUTES: Record<string, ColligativeSolute> = {
  glucose: {
    id: 'glucose',
    name: 'Glucose (D-Glucose)',
    nameVI: 'Glucozơ (C6H12O6)',
    formula: 'C6H12O6',
    soluteType: 'NON_ELECTROLYTE',
    molarMassGPerMol: 180.156,
    ionCountN: 1,
    theoreticalMaxI: 1.0,
    dissociationEquation: 'C6H12O6 (rắn) -> C6H12O6 (dd, không phân ly)',
    descriptionVI: 'Chất không điện ly kinh điển. Dung dịch 5% (khoảng 0.278 M) là dịch truyền đẳng trương với huyết tương người.',
    colorHex: '#38bdf8', // Sky Blue
  },

  sucrose: {
    id: 'sucrose',
    name: 'Sucrose (Cane Sugar)',
    nameVI: 'Saccarozơ (Đường kính C12H22O11)',
    formula: 'C12H22O11',
    soluteType: 'NON_ELECTROLYTE',
    molarMassGPerMol: 342.30,
    ionCountN: 1,
    theoreticalMaxI: 1.0,
    dissociationEquation: 'C12H22O11 (rắn) -> C12H22O11 (dd, không phân ly)',
    descriptionVI: 'Đường mía phân tử lớn, thường dùng trong thí nghiệm kinh điển đo áp suất thẩm thấu bằng ống Pfeffer của Wilhelm Pfeffer (1877).',
    colorHex: '#fbbf24', // Amber
  },

  urea: {
    id: 'urea',
    name: 'Urea (Carbamide)',
    nameVI: 'Urê ((NH2)2CO)',
    formula: '(NH2)2CO',
    soluteType: 'NON_ELECTROLYTE',
    molarMassGPerMol: 60.055,
    ionCountN: 1,
    theoreticalMaxI: 1.0,
    dissociationEquation: '(NH2)2CO (rắn) -> (NH2)2CO (dd, không phân ly)',
    descriptionVI: 'Sản phẩm chuyển hóa đạm của động vật, tan vô hạn trong nước, phân tử nhỏ không tích điện i = 1.',
    colorHex: '#a3e635', // Lime
  },

  sodium_chloride: {
    id: 'sodium_chloride',
    name: 'Sodium Chloride (Table Salt)',
    nameVI: 'Natri clorua (Muối ăn NaCl)',
    formula: 'NaCl',
    soluteType: 'STRONG_ELECTROLYTE',
    molarMassGPerMol: 58.443,
    ionCountN: 2,
    theoreticalMaxI: 2.0,
    dissociationEquation: 'NaCl (rắn) -> Na+ (dd) + Cl- (dd)',
    descriptionVI: 'Chất điện ly mạnh 1:1, phân ly hoàn toàn thành 2 ion. Dung dịch NaCl 0.9% (0.154 M) là nước muối sinh lý đẳng trương với máu.',
    colorHex: '#60a5fa', // Blue
  },

  calcium_chloride: {
    id: 'calcium_chloride',
    name: 'Calcium Chloride',
    nameVI: 'Canxi clorua (CaCl2)',
    formula: 'CaCl2',
    soluteType: 'STRONG_ELECTROLYTE',
    molarMassGPerMol: 110.98,
    ionCountN: 3,
    theoreticalMaxI: 3.0,
    dissociationEquation: 'CaCl2 (rắn) -> Ca2+ (dd) + 2Cl- (dd)',
    descriptionVI: 'Chất điện ly mạnh 1:2 cho 3 ion tự do (i ≈ 2.7 - 3.0). Hạ băng điểm cực mạnh, muối làm tan băng tuyết hiệu quả nhất ở nhiệt độ âm sâu (-30 °C).',
    colorHex: '#f87171', // Red
  },

  magnesium_sulfate: {
    id: 'magnesium_sulfate',
    name: 'Magnesium Sulfate (Epsom Salt)',
    nameVI: 'Magie sunfat (Muối Epsom MgSO4)',
    formula: 'MgSO4',
    soluteType: 'STRONG_ELECTROLYTE',
    molarMassGPerMol: 120.366,
    ionCountN: 2,
    theoreticalMaxI: 2.0,
    dissociationEquation: 'MgSO4 (rắn) -> Mg2+ (dd) + SO4 2- (dd)',
    descriptionVI: 'Chất điện ly 2:2 có mật độ điện tích cao, lực hút tĩnh điện liên ion mạnh tạo cặp ion (ion pairing) làm i giảm rõ rệt (i ≈ 1.3 - 1.6 ở 0.1 M).',
    colorHex: '#34d399', // Emerald
  },

  aluminum_sulfate: {
    id: 'aluminum_sulfate',
    name: 'Aluminum Sulfate (Alum component)',
    nameVI: 'Nhôm sunfat (Phèn nhôm Al2(SO4)3)',
    formula: 'Al2(SO4)3',
    soluteType: 'STRONG_ELECTROLYTE',
    molarMassGPerMol: 342.15,
    ionCountN: 5,
    theoreticalMaxI: 5.0,
    dissociationEquation: 'Al2(SO4)3 (rắn) -> 2Al 3+ (dd) + 3SO4 2- (dd)',
    descriptionVI: 'Chất điện ly 2:3 cung cấp tới 5 ion mỗi phân tử. Tạo áp suất thẩm thấu và độ hạ băng điểm khổng lồ trên mỗi mol chất tan.',
    colorHex: '#c084fc', // Purple
  },

  acetic_acid: {
    id: 'acetic_acid',
    name: 'Acetic Acid (Ethanoic Acid)',
    nameVI: 'Axit axetic (Giấm ăn CH3COOH)',
    formula: 'CH3COOH',
    soluteType: 'WEAK_ELECTROLYTE',
    molarMassGPerMol: 60.052,
    ionCountN: 2,
    theoreticalMaxI: 2.0,
    dissociationEquation: 'CH3COOH (dd) <=> CH3COO- (dd) + H+ (dd) [Ka = 1.75e-5]',
    descriptionVI: 'Chất điện ly yếu (Ka = 1.75e-5). Ở 0.1 M, độ điện ly alpha chỉ khoảng 1.3% khiến hệ số Van \'t Hoff i ≈ 1.013, hành xử gần với chất không điện ly.',
    colorHex: '#fb923c', // Orange
  },
};

// ----------------------------------------------------------------------------
// APPARENT VAN 'T HOFF FACTOR CALCULATION (DEBYE-HUCKEL / OSTWALD CORRECTION)
// ----------------------------------------------------------------------------

/**
 * Computes realistic van 't Hoff factor taking into account concentration,
 * ion pairing, and weak acid dissociation equilibrium.
 */
export function computeApparentVanTHoffI(solute: ColligativeSolute, concentrationM: number): number {
  const C = Math.max(0.0001, concentrationM);

  if (solute.soluteType === 'NON_ELECTROLYTE') {
    return 1.0;
  }

  if (solute.soluteType === 'WEAK_ELECTROLYTE') {
    // Ostwald's dilution law for monobasic weak acid: Ka = C·alpha^2 / (1 - alpha)
    const Ka = 1.75e-5;
    // Quadratic equation: C·alpha^2 + Ka·alpha - Ka = 0
    const alpha = (-Ka + Math.sqrt(Ka * Ka + 4 * C * Ka)) / (2 * C);
    const i = 1 + alpha * (solute.ionCountN - 1);
    return Number(Math.max(1.0, Math.min(solute.theoreticalMaxI, i)).toFixed(4));
  }

  // Strong electrolytes: Debye-Huckel interionic attraction effect
  // At infinite dilution (C -> 0), i -> n.
  // At C = 0.1 M, i ≈ n * (1 - 0.08 * sqrt(C) * z1 * z2)
  if (solute.id === 'sodium_chloride') {
    // NaCl: 1.90 at 0.1 M, 1.85 at 0.5 M
    const i = 2.0 - 0.316 * Math.sqrt(C);
    return Number(Math.max(1.6, Math.min(2.0, i)).toFixed(3));
  }

  if (solute.id === 'calcium_chloride') {
    // CaCl2: 2.70 at 0.1 M, 2.50 at 0.5 M
    const i = 3.0 - 0.95 * Math.sqrt(C);
    return Number(Math.max(2.1, Math.min(3.0, i)).toFixed(3));
  }

  if (solute.id === 'magnesium_sulfate') {
    // MgSO4: strong 2:2 ion pairing, i ≈ 1.35 at 0.1 M
    const i = 2.0 - 2.05 * Math.sqrt(C);
    return Number(Math.max(1.2, Math.min(2.0, i)).toFixed(3));
  }

  if (solute.id === 'aluminum_sulfate') {
    // Al2(SO4)3: 5 ions, i ≈ 4.1 at 0.05 M
    const i = 5.0 - 3.8 * Math.sqrt(C);
    return Number(Math.max(3.0, Math.min(5.0, i)).toFixed(3));
  }

  // Generic fallback for strong electrolyte
  const alphaEff = Math.max(0.7, 1.0 - 0.15 * Math.sqrt(C));
  const i = 1 + alphaEff * (solute.ionCountN - 1);
  return Number(Math.max(1.0, Math.min(solute.theoreticalMaxI, i)).toFixed(3));
}

// ----------------------------------------------------------------------------
// OSMOTIC PRESSURE ENGINE
// ----------------------------------------------------------------------------

/**
 * Calculates Osmotic Pressure according to Van 't Hoff's Law:
 * Π = i · C · R · T
 * Determines liquid column height h in Pfeffer osmometer: h = Π / (ρ · g)
 * Evaluates red blood cell tonicity and membrane response.
 */
export function calculateOsmoticPressure(
  soluteId: string,
  concentrationMolar: number,
  temperatureKelvin = 310.15 // Default body temperature: 37 °C = 310.15 K
): OsmoticPressureResult {
  const solute = COLLIGATIVE_SOLUTES[soluteId] || COLLIGATIVE_SOLUTES.sodium_chloride;
  const C = Math.max(0.001, Math.min(5.0, concentrationMolar));
  const T = Math.max(273.15, Math.min(373.15, temperatureKelvin));
  const TCelsius = T - 273.15;

  const i = computeApparentVanTHoffI(solute, C);
  const osmolarity = Number((i * C).toFixed(4)); // Osm/L

  // Van 't Hoff law: Π = i · C · R · T (in atm)
  const piAtm = Number((i * C * GAS_CONSTANT_R_ATM * T).toFixed(3));
  const piKPa = Number((piAtm * 101.325).toFixed(1));
  const piBar = Number((piAtm * 1.01325).toFixed(3));

  // Equilibrium liquid column height in Pfeffer cell:
  // 1 atm = 10.33 meters of water = 1033 cm H2O
  const colHeightCm = Number((piAtm * 1033.23).toFixed(1));

  // Tonicity relative to blood plasma (~7.63 atm or ~300 mOsm/L at 37 °C)
  let tonicity: TonicityClass = 'ISOTONIC';
  let rbcResponse: RBCResponse = 'NORMAL_BICONCAVE';
  let rbcDesc = 'Hồng cầu giữ nguyên hình đĩa lõm hai mặt chuẩn sinh học, không bị biến dạng.';

  if (piAtm < PHYSIOLOGICAL_OSMOTIC_PRESSURE_ATM * 0.92) {
    tonicity = 'HYPOTONIC';
    rbcResponse = 'TURGID_HEMOLYSIS';
    rbcDesc = 'Nước từ môi trường thẩm thấu ồ ạt vào trong hồng cầu làm tế bào trương phồng và vỡ (tiêu huyết / hemolysis).';
  } else if (piAtm > PHYSIOLOGICAL_OSMOTIC_PRESSURE_ATM * 1.08) {
    tonicity = 'HYPERTONIC';
    rbcResponse = 'CRENATION_SHRIVELED';
    rbcDesc = 'Nước trong tế bào thoát ra ngoài theo građien nồng độ làm hồng cầu co rút, teo nhỏ và có gai (crenation).';
  }

  // Reverse osmosis minimum applied pressure is equal to the osmotic pressure
  const roMinPressure = Number((piAtm * 1.05).toFixed(2));

  const insight = `${solute.nameVI} ở ${C} M (hệ số Van 't Hoff i = ${i}) tạo áp suất thẩm thấu Π = ${piAtm} atm (${piKPa} kPa). ${
    tonicity === 'ISOTONIC'
      ? 'Dung dịch này đẳng trương tuyệt đối với hồng cầu người (khoảng 300 mOsm/L).'
      : tonicity === 'HYPOTONIC'
      ? 'Dung dịch nhược trương: Áp suất thấp hơn nội bào gây nguy cơ tiêu huyết nếu truyền trực tiếp vào tĩnh mạch.'
      : 'Dung dịch ưu trương: Áp suất cao hơn nội bào kéo nước ra ngoài làm teo hồng cầu.'
  }`;

  return {
    solute,
    temperatureKelvin: T,
    temperatureCelsius: Number(TCelsius.toFixed(1)),
    molarConcentrationM: C,
    apparentVanTHoffI: i,
    effectiveOsmolarityOsmPerL: osmolarity,
    osmoticPressureAtm: piAtm,
    osmoticPressureKPa: piKPa,
    osmoticPressureBar: piBar,
    equilibriumWaterColumnHeightCm: colHeightCm,
    tonicity,
    rbcResponse,
    rbcDescriptionVI: rbcDesc,
    reverseOsmosisMinPressureAtm: roMinPressure,
    pedagogicalInsightVI: insight,
  };
}

// ----------------------------------------------------------------------------
// COLLIGATIVE PROPERTIES ENGINE (EBULLIOSCOPY & CRYOSCOPY)
// ----------------------------------------------------------------------------

/**
 * Calculates Colligative Properties for aqueous solutions:
 * 1. Boiling Point Elevation: ΔTb = i · Kb · m
 * 2. Freezing Point Depression: ΔTf = i · Kf · m
 * 3. Vapor Pressure Lowering (Raoult's Law at 25 °C): ΔP = x_eff · P0
 */
export function calculateColligativeProperties(
  soluteId: string,
  molalityMolPerKg: number,
  solventMassG = 1000
): ColligativePropertiesResult {
  const solute = COLLIGATIVE_SOLUTES[soluteId] || COLLIGATIVE_SOLUTES.sodium_chloride;
  const m = Math.max(0.001, Math.min(5.0, molalityMolPerKg));

  const i = computeApparentVanTHoffI(solute, m);
  const effectiveMolality = Number((i * m).toFixed(4));

  // Boiling point elevation
  const deltaTb = Number((i * WATER_KB * m).toFixed(4));
  const bp = Number((WATER_NORMAL_BP + deltaTb).toFixed(4));

  // Freezing point depression
  const deltaTf = Number((i * WATER_KF * m).toFixed(4));
  const fp = Number((WATER_NORMAL_FP - deltaTf).toFixed(4));

  // Vapor pressure lowering (Raoult's Law at 25 °C)
  // Moles of solvent water in 1 kg = 1000 / 18.015 = 55.51 mol
  const molesWater = (solventMassG / 1000) * 55.5084;
  const molesEffectiveSolute = i * m * (solventMassG / 1000);
  const xEffSolute = molesEffectiveSolute / (molesWater + molesEffectiveSolute);

  const deltaP = Number((xEffSolute * WATER_VAPOR_PRESSURE_25C_MMHG).toFixed(4));
  const pSol = Number((WATER_VAPOR_PRESSURE_25C_MMHG - deltaP).toFixed(4));

  // Ratio Kf / Kb = 1.86 / 0.512 ≈ 3.633 (Physical invariant for water)
  const ratioKfKb = Number((WATER_KF / WATER_KB).toFixed(3));

  // De-icing efficiency benchmark score relative to 1 molal NaCl
  // NaCl 1m produces ΔTf = 1.9 * 1.86 * 1.0 ≈ 3.53 °C (baseline 100)
  const baselineDeltaTfNaCl = 1.90 * WATER_KF * 1.0;
  const deicingScore = Math.min(250, Math.round((deltaTf / (baselineDeltaTfNaCl * (solute.molarMassGPerMol / 58.44))) * 100));

  const explanation = `${solute.nameVI} ở molality m = ${m} mol/kg (hệ số Van 't Hoff i = ${i}):\n` +
    `• Độ hạ băng điểm: ΔTf = ${deltaTf} °C -> Băng điểm hạ xuống ${fp} °C.\n` +
    `• Độ tăng điểm sôi: ΔTb = ${deltaTb} °C -> Nhiệt độ sôi tăng lên ${bp} °C.\n` +
    `• Băng điểm hạ mạnh gấp ${ratioKfKb} lần độ tăng nhiệt độ sôi vì Kf của nước (1.86) lớn hơn nhiều so với Kb (0.512).\n` +
    `• Độ giảm áp suất hơi bão hòa ở 25 °C: ΔP = ${deltaP} mmHg.`;

  return {
    solute,
    molalityMolPerKg: m,
    apparentVanTHoffI: i,
    effectiveMolality,
    deltaTbCelsius: deltaTb,
    solutionBoilingPointCelsius: bp,
    deltaTfCelsius: deltaTf,
    solutionFreezingPointCelsius: fp,
    deltaPmmHg: deltaP,
    vaporPressureMmHg: pSol,
    ebullioscopicVsCryoscopicRatio: ratioKfKb,
    deicingEfficiencyScore: deicingScore,
    pedagogicalExplanationVI: explanation,
  };
}

// ----------------------------------------------------------------------------
// REVERSE OSMOSIS DESALINATION SIMULATOR
// ----------------------------------------------------------------------------

/**
 * Simulates Industrial Seawater Reverse Osmosis (SWRO):
 * Pure water flux J = A · (P_applied - ΔΠ)
 * Membrane rejection: R = (1 - C_permeate / C_feed) * 100%
 */
export function simulateReverseOsmosisDesalination(
  feedSalinityGPerL: number, // Typical seawater = 35 g/L (~0.6 M NaCl)
  appliedPressureBar: number, // Typical SWRO = 55 - 75 bar (54 - 74 atm)
  recoveryRatioPercent = 45 // Standard seawater recovery = 40-50%
): ReverseOsmosisSimulation {
  const salinity = Math.max(1.0, Math.min(100.0, feedSalinityGPerL));
  const PAppliedBar = Math.max(10.0, Math.min(120.0, appliedPressureBar));
  const PAppliedAtm = PAppliedBar * 0.986923;
  const recovery = Math.max(10, Math.min(85, recoveryRatioPercent));

  // Approximate molarity of NaCl in feed
  const feedM = salinity / 58.443;
  const i = computeApparentVanTHoffI(COLLIGATIVE_SOLUTES.sodium_chloride, feedM);

  // Feed Osmotic pressure at 25 °C (298.15 K)
  const feedPiAtm = i * feedM * GAS_CONSTANT_R_ATM * 298.15;

  // Concentrated brine osmotic pressure (increases as recovery proceeds)
  const concentrationFactor = 1 / (1 - recovery / 100);
  const avgMembranePiAtm = feedPiAtm * Math.sqrt(concentrationFactor);

  const netDrivingPressureAtm = Math.max(0, PAppliedAtm - avgMembranePiAtm);
  const isFeasible = PAppliedAtm > avgMembranePiAtm;

  // Standard polyamide composite membrane permeability A ≈ 1.2 L/(m^2·h·bar)
  const fluxLmh = isFeasible ? Number((1.2 * (netDrivingPressureAtm * 1.01325)).toFixed(1)) : 0;

  // Salt rejection is typically > 99.4% when driving pressure > 10 atm
  const rejection = isFeasible
    ? Number(Math.min(99.8, 98.0 + 1.8 * (1 - Math.exp(-netDrivingPressureAtm / 15))).toFixed(2))
    : 0;

  const permeateSalinityMgPerL = isFeasible
    ? Number((salinity * 1000 * (1 - rejection / 100)).toFixed(1))
    : salinity * 1000;

  let statusVI = 'Áp suất tác dụng không đủ thắng áp suất thẩm thấu trung bình. Không thể tách nước ngọt!';
  if (isFeasible) {
    if (permeateSalinityMgPerL <= 500) {
      statusVI = `Thẩm thấu ngược thành công! Nước sau màng lọc đạt chuẩn nước uống WHO (< 500 mg/L, thực tế: ${permeateSalinityMgPerL} mg/L). Lực đẩy hiệu dụng: ${netDrivingPressureAtm.toFixed(1)} atm.`;
    } else {
      statusVI = `Thẩm thấu ngược tạo dòng nước ngọt nhưng độ mặn còn cao (${permeateSalinityMgPerL} mg/L), cần thêm giai đoạn màng lọc thứ 2 (second pass).`;
    }
  }

  return {
    feedSalinityGPerL: salinity,
    feedOsmoticPressureAtm: Number(feedPiAtm.toFixed(2)),
    appliedPressureAtm: Number(PAppliedAtm.toFixed(2)),
    netDrivingPressureAtm: Number(netDrivingPressureAtm.toFixed(2)),
    recoveryRatioPercent: recovery,
    permeateSalinityMgPerL,
    saltRejectionPercent: rejection,
    permeateFluxLPerM2Hour: fluxLmh,
    isDesalinationFeasible: isFeasible,
    statusVI,
  };
}

// ----------------------------------------------------------------------------
// CARD MATCHING FOR COLLIGATIVE SOLUTES
// ----------------------------------------------------------------------------

/**
 * Matches card to relevant colligative solute
 */
export function getMatchingOsmosisSolute(card: { id?: string; name?: string }): ColligativeSolute | null {
  if (!card) return null;
  const nameLower = (card.name || '').toLowerCase();
  const idLower = (card.id || '').toLowerCase();

  // Sort by specificity: longer formulas first
  const soluteList = Object.values(COLLIGATIVE_SOLUTES).sort((a, b) => b.formula.length - a.formula.length);

  for (const sol of soluteList) {
    const fLower = sol.formula.toLowerCase();
    const idS = sol.id.toLowerCase();
    const nameS = sol.name.toLowerCase();

    // Check ID match
    if (idLower === idS || idLower.includes(`_${idS}`) || idLower.includes(`${idS}_`) || idLower.includes(`card_${idS}`)) {
      return sol;
    }

    // Check Name match
    if (nameLower.includes(nameS) || (sol.nameVI && nameLower.includes(sol.nameVI.toLowerCase()))) {
      return sol;
    }

    // Check chemical formula with boundary
    const formulaRegex = new RegExp(`(^|[^a-zA-Z0-9])${fLower}([^a-zA-Z0-9]|$)`, 'i');
    if (formulaRegex.test(nameLower) || formulaRegex.test(idLower)) {
      return sol;
    }
  }

  // Vietnamese keyword matching
  if (nameLower.includes('muối ăn') || nameLower.includes('nacl') || nameLower.includes('natri clorua')) {
    return COLLIGATIVE_SOLUTES.sodium_chloride;
  }
  if (nameLower.includes('đường') || nameLower.includes('gluco') || nameLower.includes('glucose')) {
    return COLLIGATIVE_SOLUTES.glucose;
  }
  if (nameLower.includes('cacl2') || nameLower.includes('canxi clorua')) {
    return COLLIGATIVE_SOLUTES.calcium_chloride;
  }

  return null;
}
