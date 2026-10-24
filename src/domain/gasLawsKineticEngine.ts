// src/domain/gasLawsKineticEngine.ts
// ============================================================================
// ELEMENTA GAS LAWS, KINETIC MOLECULAR THEORY & MAXWELL-BOLTZMANN SPEED DISTRIBUTION ENGINE
// Standards: IUPAC Physical Chemistry & Vietnam GDPT 2018 Chemistry 10
// Covers: Ideal Gas Law (PV = nRT), Van der Waals Real Gas Equation [(P + a(n/V)^2)(V - nb) = nRT],
// Compressibility Factor (Z), Graham's Law of Effusion (r1/r2 = sqrt(M2/M1)),
// and Maxwell-Boltzmann Molecular Velocity Distribution [f(v) with v_mp < v_avg < v_rms].
// ============================================================================

export const IDEAL_GAS_CONSTANT_R_J = 8.314462618; // J/(mol·K)
export const IDEAL_GAS_CONSTANT_R_ATM = 0.082057338; // L·atm/(mol·K)
export const BOLTZMANN_CONSTANT = 1.380649e-23; // J/K
export const AVOGADRO_CONSTANT = 6.02214076e23; // mol^-1
export const STANDARD_TEMP_K = 273.15; // 0 °C
export const STANDARD_PRESSURE_ATM = 1.0; // 1 atm = 101,325 Pa

export interface GasSpecies {
  id: string;
  name: string;
  nameVI: string;
  formula: string;
  molarMassKgPerMol: number;
  molarMassGPerMol: number;
  vanDerWaalsA: number; // bar·L^2/mol^2 (attraction term)
  vanDerWaalsB: number; // L/mol (effective molecular volume term)
  criticalTemperatureK: number;
  criticalPressureBar: number;
  colorHex: string;
  descriptionVI: string;
}

export interface MaxwellSpeedPoint {
  speedMPerS: number;
  probabilityDensity: number; // s/m
}

export interface MaxwellDistributionResult {
  gasId: string;
  gasNameVI: string;
  temperatureK: number;
  temperatureC: number;
  vMostProbableMPerS: number; // v_mp = sqrt(2RT/M)
  vAverageMPerS: number; // v_avg = sqrt(8RT / (pi * M))
  vRootMeanSquareMPerS: number; // v_rms = sqrt(3RT/M)
  kineticEnergyPerMoleJ: number; // E_k = (3/2) RT
  curvePoints: MaxwellSpeedPoint[];
}

export interface RealVsIdealGasResult {
  gasId: string;
  gasNameVI: string;
  temperatureK: number;
  volumeL: number;
  moles: number;
  idealPressureAtm: number; // P_ideal = nRT / V
  vanDerWaalsPressureAtm: number; // P_real = nRT/(V - nb) - a(n/V)^2
  compressibilityFactorZ: number; // Z = P_real * V / (nRT)
  deviationPercent: number; // |P_real - P_ideal| / P_ideal * 100
  dominantIntermolecularRegimeVI: string;
}

export interface GrahamEffusionResult {
  gas1: GasSpecies;
  gas2: GasSpecies;
  effusionRateRatio: number; // r1 / r2 = sqrt(M2 / M1)
  diffusionDistanceRatio: number;
  fasterGasVI: string;
  pedagogicalInsightVI: string;
}

// ----------------------------------------------------------------------------
// BENCHMARK GAS SPECIES CATALOG
// ----------------------------------------------------------------------------
export const GAS_SPECIES: Record<string, GasSpecies> = {
  hydrogen: {
    id: 'hydrogen',
    name: 'Hydrogen',
    nameVI: 'Hiđro (H2)',
    formula: 'H2',
    molarMassGPerMol: 2.016,
    molarMassKgPerMol: 0.002016,
    vanDerWaalsA: 0.2476,
    vanDerWaalsB: 0.02661,
    criticalTemperatureK: 33.2,
    criticalPressureBar: 12.97,
    colorHex: '#38bdf8', // Sky Blue
    descriptionVI: 'Chất khí nhẹ nhất trong vũ trụ. Tốc độ chuyển động nhiệt cực cao (v_rms > 1900 m/s ở 25 °C), khuếch tán nhanh nhất.',
  },

  helium: {
    id: 'helium',
    name: 'Helium',
    nameVI: 'Heli (He)',
    formula: 'He',
    molarMassGPerMol: 4.003,
    molarMassKgPerMol: 0.004003,
    vanDerWaalsA: 0.0346,
    vanDerWaalsB: 0.0238,
    criticalTemperatureK: 5.2,
    criticalPressureBar: 2.29,
    colorHex: '#facc15', // Amber Yellow
    descriptionVI: 'Khí hiếm đơn nguyên tử, lực hút van der Waals yếu nhất trong tất cả các chất (a = 0.035). Hành xử gần với khí lý tưởng nhất.',
  },

  methane: {
    id: 'methane',
    name: 'Methane',
    nameVI: 'Metan (CH4)',
    formula: 'CH4',
    molarMassGPerMol: 16.043,
    molarMassKgPerMol: 0.016043,
    vanDerWaalsA: 2.303,
    vanDerWaalsB: 0.04306,
    criticalTemperatureK: 190.6,
    criticalPressureBar: 46.0,
    colorHex: '#34d399', // Emerald Green
    descriptionVI: 'Thành phần chính của khí thiên nhiên và khí Biogas, hình học tứ diện đều đối xứng không phân cực.',
  },

  nitrogen: {
    id: 'nitrogen',
    name: 'Nitrogen',
    nameVI: 'Nitơ (N2)',
    formula: 'N2',
    molarMassGPerMol: 28.014,
    molarMassKgPerMol: 0.028014,
    vanDerWaalsA: 1.370,
    vanDerWaalsB: 0.0387,
    criticalTemperatureK: 126.2,
    criticalPressureBar: 33.9,
    colorHex: '#60a5fa', // Blue
    descriptionVI: 'Chiếm 78% thể tích khí quyển Trái Đất, phân tử có liên kết ba N≡N siêu bền, là chuẩn so sánh của các bài toán khí.',
  },

  oxygen: {
    id: 'oxygen',
    name: 'Oxygen',
    nameVI: 'Oxi (O2)',
    formula: 'O2',
    molarMassGPerMol: 31.998,
    molarMassKgPerMol: 0.031998,
    vanDerWaalsA: 1.382,
    vanDerWaalsB: 0.03186,
    criticalTemperatureK: 154.6,
    criticalPressureBar: 50.4,
    colorHex: '#f87171', // Red
    descriptionVI: 'Chiếm 21% thể tích khí quyển, duy trì sự sống và sự cháy, thuận từ do có 2 electron độc thân ở orbital phản liên kết pi*.',
  },

  argon: {
    id: 'argon',
    name: 'Argon',
    nameVI: 'Agon (Ar)',
    formula: 'Ar',
    molarMassGPerMol: 39.948,
    molarMassKgPerMol: 0.039948,
    vanDerWaalsA: 1.355,
    vanDerWaalsB: 0.03201,
    criticalTemperatureK: 150.8,
    criticalPressureBar: 48.7,
    colorHex: '#c084fc', // Purple
    descriptionVI: 'Khí trơ phổ biến nhất trong khí quyển (chiếm gần 1%), dùng làm môi trường trơ cho hàn cắt kim loại.',
  },

  carbon_dioxide: {
    id: 'carbon_dioxide',
    name: 'Carbon Dioxide',
    nameVI: 'Cacbon đioxit (CO2)',
    formula: 'CO2',
    molarMassGPerMol: 44.01,
    molarMassKgPerMol: 0.04401,
    vanDerWaalsA: 3.658,
    vanDerWaalsB: 0.04286,
    criticalTemperatureK: 304.1,
    criticalPressureBar: 73.8,
    colorHex: '#fb923c', // Orange
    descriptionVI: 'Lực hút van der Waals lớn (a = 3.66), dễ hóa lỏng và tạo đá khô (CO2 rắn) thăng hoa ở -78.5 °C. Sai lệch đáng kể khỏi khí lý tưởng ở áp suất cao.',
  },

  ammonia: {
    id: 'ammonia',
    name: 'Ammonia',
    nameVI: 'Amoniac (NH3)',
    formula: 'NH3',
    molarMassGPerMol: 17.031,
    molarMassKgPerMol: 0.017031,
    vanDerWaalsA: 4.225,
    vanDerWaalsB: 0.03713,
    criticalTemperatureK: 405.5,
    criticalPressureBar: 112.8,
    colorHex: '#38bdf8', // Sky Blue
    descriptionVI: 'Khí có liên kết hiđro liên phân tử mạnh, tan cực nhiều trong nước và phân cực mạnh, kinh điển trong thí nghiệm ống khuếch tán Graham.',
  },

  neon: {
    id: 'neon',
    name: 'Neon',
    nameVI: 'Neon (Ne)',
    formula: 'Ne',
    molarMassGPerMol: 20.180,
    molarMassKgPerMol: 0.020180,
    vanDerWaalsA: 0.2135,
    vanDerWaalsB: 0.01709,
    criticalTemperatureK: 44.4,
    criticalPressureBar: 27.6,
    colorHex: '#f43f5e', // Rose
    descriptionVI: 'Khí hiếm đơn nguyên tử nhẹ, phát ánh sáng đỏ cam đặc trưng khi phóng điện qua ống chân không.',
  },

  sulfur_dioxide: {
    id: 'sulfur_dioxide',
    name: 'Sulfur Dioxide',
    nameVI: 'Lưu huỳnh đioxit (SO2)',
    formula: 'SO2',
    molarMassGPerMol: 64.066,
    molarMassKgPerMol: 0.064066,
    vanDerWaalsA: 6.865,
    vanDerWaalsB: 0.05679,
    criticalTemperatureK: 430.8,
    criticalPressureBar: 78.8,
    colorHex: '#eab308', // Yellow
    descriptionVI: 'Khí không màu, mùi hắc nồng, nặng gấp đôi không khí, tan trong nước tạo axit sunfurơ H2SO3.',
  },

  chlorine: {
    id: 'chlorine',
    name: 'Chlorine',
    nameVI: 'Clo (Cl2)',
    formula: 'Cl2',
    molarMassGPerMol: 70.906,
    molarMassKgPerMol: 0.070906,
    vanDerWaalsA: 6.579,
    vanDerWaalsB: 0.05622,
    criticalTemperatureK: 417.1,
    criticalPressureBar: 77.0,
    colorHex: '#a3e635', // Lime
    descriptionVI: 'Khí màu vàng lục, nặng hơn không khí gần 2.5 lần, tính oxi hóa mạnh, lực liên kết London tương đối lớn do khối lượng mol 71 g/mol.',
  },

  xenon: {
    id: 'xenon',
    name: 'Xenon',
    nameVI: 'Xenon (Xe)',
    formula: 'Xe',
    molarMassGPerMol: 131.293,
    molarMassKgPerMol: 0.131293,
    vanDerWaalsA: 4.250,
    vanDerWaalsB: 0.05105,
    criticalTemperatureK: 289.7,
    criticalPressureBar: 58.4,
    colorHex: '#a78bfa', // Violet
    descriptionVI: 'Khí hiếm rất nặng, đám mây electron cồng kềnh dễ bị biến dạng phân cực nên có lực hút liên phân tử lớn nhất trong các khí trơ.',
  },
};

// ----------------------------------------------------------------------------
// MAXWELL-BOLTZMANN SPEED DISTRIBUTION CALCULATIONS
// ----------------------------------------------------------------------------

/**
 * Calculates Maxwell-Boltzmann Speed Distribution:
 * f(v) = 4·pi · [M / (2·pi·R·T)]^(3/2) · v^2 · exp(-M·v^2 / (2·R·T))
 * Characteristic speeds:
 * v_mp = sqrt(2·R·T / M)
 * v_avg = sqrt(8·R·T / (pi·M))
 * v_rms = sqrt(3·R·T / M)
 * Invariant: v_mp < v_avg < v_rms
 */
export function calculateMaxwellBoltzmannDistribution(
  gasId: string,
  temperatureKelvin: number,
  maxVelocityMPerS = 2500,
  stepMPerS = 25
): MaxwellDistributionResult {
  const gas = GAS_SPECIES[gasId] || GAS_SPECIES.nitrogen;
  const T = Math.max(10, Math.min(3000, temperatureKelvin));
  const M = gas.molarMassKgPerMol;
  const R = IDEAL_GAS_CONSTANT_R_J;

  const vMp = Math.sqrt((2 * R * T) / M);
  const vAvg = Math.sqrt((8 * R * T) / (Math.PI * M));
  const vRms = Math.sqrt((3 * R * T) / M);
  const ekMole = (3 / 2) * R * T;

  const factor = 4 * Math.PI * Math.pow(M / (2 * Math.PI * R * T), 1.5);

  const points: MaxwellSpeedPoint[] = [];
  for (let v = 0; v <= maxVelocityMPerS; v += stepMPerS) {
    const exponent = -(M * v * v) / (2 * R * T);
    const prob = factor * v * v * Math.exp(exponent);
    points.push({
      speedMPerS: v,
      probabilityDensity: Number(prob.toFixed(8)),
    });
  }

  return {
    gasId: gas.id,
    gasNameVI: gas.nameVI,
    temperatureK: Number(T.toFixed(1)),
    temperatureC: Number((T - 273.15).toFixed(1)),
    vMostProbableMPerS: Number(vMp.toFixed(1)),
    vAverageMPerS: Number(vAvg.toFixed(1)),
    vRootMeanSquareMPerS: Number(vRms.toFixed(1)),
    kineticEnergyPerMoleJ: Number(ekMole.toFixed(1)),
    curvePoints: points,
  };
}

// ----------------------------------------------------------------------------
// REAL VS IDEAL GAS VAN DER WAALS EQUATION
// ----------------------------------------------------------------------------

/**
 * Compares Ideal Gas Pressure vs Real Gas (Van der Waals) Pressure:
 * P_ideal = n·R·T / V
 * P_real = [n·R·T / (V - n·b)] - a·(n / V)^2
 * Compressibility factor: Z = P_real·V / (n·R·T)
 */
export function calculateRealVsIdealGasComparison(
  gasId: string,
  temperatureKelvin: number,
  volumeLiters: number,
  moles: number
): RealVsIdealGasResult {
  const gas = GAS_SPECIES[gasId] || GAS_SPECIES.nitrogen;
  const T = Math.max(20, temperatureKelvin);
  const V = Math.max(0.01, volumeLiters);
  const n = Math.max(0.001, moles);

  const R = IDEAL_GAS_CONSTANT_R_ATM; // L·atm / (mol·K)

  // Ideal Gas Law
  const pIdealAtm = (n * R * T) / V;

  // Van der Waals (convert 'a' from bar·L^2/mol^2 to atm·L^2/mol^2: 1 bar = 0.986923 atm)
  const aAtm = gas.vanDerWaalsA * 0.986923;
  const bL = gas.vanDerWaalsB;

  let pRealAtm = pIdealAtm;
  if (V > n * bL) {
    const repulsiveTerm = (n * R * T) / (V - n * bL);
    const attractiveTerm = aAtm * Math.pow(n / V, 2);
    pRealAtm = Math.max(0.001, repulsiveTerm - attractiveTerm);
  }

  const Z = (pRealAtm * V) / (n * R * T);
  const devPercent = Math.abs((pRealAtm - pIdealAtm) / pIdealAtm) * 100;

  let regimeVI = 'Gần như lý tưởng (Z ≈ 1.00): Khoảng cách giữa các phân tử lớn, tương tác hút và thể tích riêng không đáng kể.';
  if (Z < 0.95) {
    regimeVI = `Lực hút chiếm ưu thế (Z = ${Z.toFixed(2)} < 1.0): Lực hút van der Waals kéo các phân tử lại gần nhau làm giảm áp suất tác dụng lên thành bình.`;
  } else if (Z > 1.05) {
    regimeVI = `Thể tích riêng chiếm ưu thế (Z = ${Z.toFixed(2)} > 1.0): Áp suất rất cao làm thể tích riêng của phân tử (b) chiếm phần đáng kể, đẩy mạnh nhau làm tăng áp suất.`;
  }

  return {
    gasId: gas.id,
    gasNameVI: gas.nameVI,
    temperatureK: Number(T.toFixed(1)),
    volumeL: Number(V.toFixed(2)),
    moles: Number(n.toFixed(3)),
    idealPressureAtm: Number(pIdealAtm.toFixed(3)),
    vanDerWaalsPressureAtm: Number(pRealAtm.toFixed(3)),
    compressibilityFactorZ: Number(Z.toFixed(3)),
    deviationPercent: Number(devPercent.toFixed(2)),
    dominantIntermolecularRegimeVI: regimeVI,
  };
}

// ----------------------------------------------------------------------------
// GRAHAM'S LAW OF EFFUSION & DIFFUSION
// ----------------------------------------------------------------------------

/**
 * Calculates Graham's Law of Effusion Ratio:
 * r1 / r2 = sqrt(M2 / M1)
 * Lighter gas effuses strictly faster than heavier gas through pinhole aperture.
 */
export function calculateGrahamEffusion(
  gas1Id: string,
  gas2Id: string
): GrahamEffusionResult {
  const g1 = GAS_SPECIES[gas1Id] || GAS_SPECIES.hydrogen;
  const g2 = GAS_SPECIES[gas2Id] || GAS_SPECIES.oxygen;

  const ratio = Math.sqrt(g2.molarMassGPerMol / g1.molarMassGPerMol);
  const roundedRatio = Number(ratio.toFixed(3));

  let fasterName = g1.nameVI;
  let explanation = `${g1.nameVI} nhẹ hơn ${g2.nameVI} nên tốc độ khuếch tán nhanh gấp ${roundedRatio} lần.`;
  if (ratio < 1.0) {
    fasterName = g2.nameVI;
    const inv = Number((1 / ratio).toFixed(3));
    explanation = `${g2.nameVI} nhẹ hơn ${g1.nameVI} nên tốc độ khuếch tán nhanh gấp ${inv} lần.`;
  }

  return {
    gas1: g1,
    gas2: g2,
    effusionRateRatio: roundedRatio,
    diffusionDistanceRatio: roundedRatio,
    fasterGasVI: fasterName,
    pedagogicalInsightVI: explanation,
  };
}

/**
 * Matches card to relevant gas species
 */
export function getMatchingGasSpecies(card: { id?: string; name?: string }): GasSpecies | null {
  if (!card) return null;
  const nameLower = (card.name || '').toLowerCase();
  const idLower = (card.id || '').toLowerCase();

  // Sort by specificity: longer formulas first (e.g. CO2, CH4, SO2 before O2)
  const speciesList = Object.values(GAS_SPECIES).sort((a, b) => b.formula.length - a.formula.length);

  // Exact ID / Name / Formula matching
  for (const gas of speciesList) {
    const fLower = gas.formula.toLowerCase();
    const idG = gas.id.toLowerCase();
    const nameG = gas.name.toLowerCase();

    // Check ID substring with delimiters
    if (idLower === idG || idLower.includes(`_${idG}`) || idLower.includes(`${idG}_`) || idLower.includes(`card_${idG}`)) {
      return gas;
    }

    // Check Vietnamese or English name
    if (nameLower.includes(nameG) || (gas.nameVI && nameLower.includes(gas.nameVI.toLowerCase()))) {
      return gas;
    }

    // Boundary-aware formula matching to prevent 'co2' matching 'o2'
    const formulaRegex = new RegExp(`(^|[^a-zA-Z0-9])${fLower}([^a-zA-Z0-9]|$)`, 'i');
    if (formulaRegex.test(nameLower) || formulaRegex.test(idLower)) {
      return gas;
    }
  }

  // Fallback for general gas cards
  if (nameLower.includes('khí lý tưởng') || nameLower.includes('áp suất khí') || nameLower.includes('bình khí')) {
    return GAS_SPECIES.nitrogen;
  }

  return null;
}
