// src/domain/chemicalKineticsEngine.ts
/**
 * ELEMENTA — Chemical Reaction Kinetics Domain Engine
 * Conforms strictly to GDPT 2018 Chemistry Grade 10 (Chủ đề 6: Tốc độ phản ứng hóa học) & IUPAC Standards.
 * 
 * Subsystems:
 * 1. Reaction Rate Law & Rate Constant (k): Differential rate equations v = k[A]^a [B]^b, reaction order (0, 1, 2).
 * 2. Van 't Hoff Temperature Rule: v2 / v1 = γ^((T2 - T1) / 10) with γ coefficient (2.0 to 4.0) and real-world preservation/cooking applications.
 * 3. 5 Kinetic Factors Simulator: Concentration, Temperature, Surface Area (powder vs chunk), Pressure, and Catalysts (activation energy reduction).
 * 4. Arrhenius Equation & Maxwell-Boltzmann Distribution: k = A * exp(-Ea / RT), effective collision fraction f = exp(-Ea / RT).
 * 5. Classic Thiosulfate-Acid Precipitation Experiment: Na2S2O3 + H2SO4 -> S↓ (yellow cloudiness) + SO2 + H2O with cross obscuration timing.
 */

export interface KineticReaction {
  id: string;
  nameVi: string;
  nameIupac: string;
  equation: string;
  orderA: number;
  orderB: number;
  overallOrder: number;
  baseRateConstantK: number;
  rateConstantUnit: string;
  activationEnergyEaKjMol: number;
  vanTHoffGamma: number;
  descriptionVi: string;
  gdptStandardRef: string;
}

export const KINETIC_REACTION_CATALOG: KineticReaction[] = [
  {
    id: 'thiosulfate-acid',
    nameVi: 'Thủy phân Natri thiosunfat trong môi trường axit (Thí nghiệm kinh điển)',
    nameIupac: 'Sodium thiosulfate acid decomposition',
    equation: 'Na2S2O3(aq) + H2SO4(aq) -> S↓ (vàng đục) + SO2(g) + Na2SO4(aq) + H2O(l)',
    orderA: 1,
    orderB: 1,
    overallOrder: 2,
    baseRateConstantK: 0.045,
    rateConstantUnit: 'L/(mol·s)',
    activationEnergyEaKjMol: 58.5,
    vanTHoffGamma: 2.2,
    descriptionVi: 'Thí nghiệm đo thời gian xuất hiện kết tủa lưu huỳnh (S) làm che khuất dấu thập đen dưới đáy bình tam giác khi thay đổi nồng độ hoặc nhiệt độ.',
    gdptStandardRef: 'GDPT 2018 Hóa học 10 - Bài 16: Tốc độ phản ứng hóa học'
  },
  {
    id: 'h2o2-decomposition',
    nameVi: 'Phân hủy Hidro peoxit xúc tác MnO2 (Oxy già)',
    nameIupac: 'Hydrogen peroxide catalytic decomposition',
    equation: '2H2O2(aq) --(MnO2)--> 2H2O(l) + O2(g)↑',
    orderA: 1,
    orderB: 0,
    overallOrder: 1,
    baseRateConstantK: 0.002,
    rateConstantUnit: 's^-1',
    activationEnergyEaKjMol: 75.0, // uncatalyzed; drops to 54.0 with MnO2
    vanTHoffGamma: 2.1,
    descriptionVi: 'Ở nhiệt độ phòng không có xúc tác, H2O2 phân hủy cực kỳ chậm; khi thêm một lượng nhỏ bột đen MnO2, bọt khí oxi sủi bọt mãnh liệt ngay lập tức.',
    gdptStandardRef: 'GDPT 2018 Hóa học 10 - Bài 16: Tốc độ phản ứng hóa học'
  },
  {
    id: 'caco3-hcl',
    nameVi: 'Canxi cacbonat phản ứng với axit clohiđric (Ảnh hưởng diện tích bề mặt)',
    nameIupac: 'Calcium carbonate reaction with hydrochloric acid',
    equation: 'CaCO3(s) + 2HCl(aq) -> CaCl2(aq) + CO2(g)↑ + H2O(l)',
    orderA: 1, // pseudo-order w.r.t surface area & [HCl]
    orderB: 1,
    overallOrder: 2,
    baseRateConstantK: 0.08,
    rateConstantUnit: 'L/(mol·s)',
    activationEnergyEaKjMol: 42.0,
    vanTHoffGamma: 2.0,
    descriptionVi: 'So sánh bột đá vôi mịn với viên đá vôi lớn có cùng khối lượng. Bột đá vôi có diện tích bề mặt riêng lớn hơn hàng trăm lần, thoát khí CO2 nhanh gấp nhiều lần.',
    gdptStandardRef: 'GDPT 2018 Hóa học 10 - Bài 16: Tốc độ phản ứng hóa học'
  },
  {
    id: 'haber-bosch-kinetics',
    nameVi: 'Tổng hợp amoniac Haber-Bosch (Khí nén và xúc tác sắt Fe)',
    nameIupac: 'Ammonia synthesis kinetics',
    equation: 'N2(g) + 3H2(g) --(Fe, t°, P)--> 2NH3(g)',
    orderA: 1,
    orderB: 2,
    overallOrder: 3,
    baseRateConstantK: 0.00015,
    rateConstantUnit: 'L^2/(mol^2·s)',
    activationEnergyEaKjMol: 335.0, // drops to 160.0 with promoter iron
    vanTHoffGamma: 2.3,
    descriptionVi: 'Liên kết ba N≡N cực kỳ bền (946 kJ/mol). Áp suất cao (200 bar) và xúc tác Fe/K2O/Al2O3 là bắt buộc để đạt tốc độ phản ứng có ý nghĩa công nghiệp.',
    gdptStandardRef: 'GDPT 2018 Hóa học 10 - Bài 16: Tốc độ phản ứng hóa học'
  }
];

export interface VanTHoffResult {
  t1Celsius: number;
  t2Celsius: number;
  gamma: number;
  deltaT: number;
  rateRatio: number;
  percentageIncrease: number;
  realWorldApplicationVi: string;
}

export function calculateVanTHoffEffect(
  t1Celsius: number = 20,
  t2Celsius: number = 50,
  gamma: number = 2.5
): VanTHoffResult {
  const deltaT = t2Celsius - t1Celsius;
  const exponent = deltaT / 10.0;
  const rateRatio = parseFloat(Math.pow(gamma, exponent).toFixed(2));
  const percentageIncrease = parseFloat(((rateRatio - 1) * 100).toFixed(1));

  let application = '';
  if (t1Celsius === 4 && t2Celsius === 25) {
    application = `Bảo quản thực phẩm trong ngăn mát tủ lạnh (4°C so với 25°C): Tốc độ phản ứng phân hủy thức ăn chậm đi ${rateRatio} lần, giúp kéo dài thời gian bảo quản an toàn.`;
  } else if (t1Celsius === 100 && t2Celsius === 120) {
    application = `Nồi áp suất nấu chín thức ăn ở 120°C (hơi nước 2 bar so với nồi thường 100°C): Tốc độ phản ứng tăng gấp ~${rateRatio} lần, giúp tiết kiệm 70-80% thời gian nấu và nhiên liệu.`;
  } else if (deltaT > 0) {
    application = `Khi tăng nhiệt độ từ ${t1Celsius}°C lên ${t2Celsius}°C (tăng ${deltaT}°C), tốc độ phản ứng tăng gấp ${rateRatio} lần (tương ứng tăng +${percentageIncrease}%).`;
  } else {
    application = `Khi hạ nhiệt độ từ ${t1Celsius}°C xuống ${t2Celsius}°C, tốc độ phản ứng giảm đi ${rateRatio} lần.`;
  }

  return {
    t1Celsius,
    t2Celsius,
    gamma,
    deltaT,
    rateRatio,
    percentageIncrease,
    realWorldApplicationVi: application
  };
}

export interface KineticsFactorsInput {
  reactionId: string;
  concentrationMolar: number; // e.g. 0.1 to 2.0 M
  temperatureCelsius: number; // e.g. 10 to 80 °C
  surfaceAreaState: 'CHUNKS' | 'GRANULES' | 'FINE_POWDER';
  hasCatalyst: boolean;
  pressureBar?: number; // for gas reactions
}

export interface KineticsFactorsResult {
  reactionNameVi: string;
  equation: string;
  calculatedRate: number; // relative rate units
  relativeRateMultiplier: number;
  effectiveActivationEnergyEa: number;
  collisionFrequencyFactor: number;
  cloudinessTimeSeconds: number; // for thiosulfate reaction
  factorBreakdown: {
    concentrationContributionVi: string;
    temperatureContributionVi: string;
    surfaceAreaContributionVi: string;
    catalystContributionVi: string;
  };
  summaryVi: string;
}

export function simulateKineticFactors(input: KineticsFactorsInput): KineticsFactorsResult {
  const rxn = KINETIC_REACTION_CATALOG.find(r => r.id === input.reactionId) || KINETIC_REACTION_CATALOG[0];

  // 1. Concentration factor: [A]^order
  const concFactor = Math.pow(input.concentrationMolar, rxn.orderA);

  // 2. Temperature factor via Arrhenius & Van 't Hoff
  // Standard baseline at 25°C
  const deltaT = input.temperatureCelsius - 25.0;
  const tempFactor = Math.pow(rxn.vanTHoffGamma, deltaT / 10.0);

  // 3. Surface area multiplier (applies to solid-liquid reactions like CaCO3)
  let surfaceAreaMultiplier = 1.0;
  if (rxn.id === 'caco3-hcl') {
    if (input.surfaceAreaState === 'FINE_POWDER') surfaceAreaMultiplier = 8.5;
    else if (input.surfaceAreaState === 'GRANULES') surfaceAreaMultiplier = 3.0;
    else surfaceAreaMultiplier = 1.0;
  }

  // 4. Catalyst: lowers Ea significantly
  let effectiveEa = rxn.activationEnergyEaKjMol;
  let catalystMultiplier = 1.0;
  if (input.hasCatalyst) {
    if (rxn.id === 'h2o2-decomposition') {
      effectiveEa = 54.0; // drops from 75 to 54 kJ/mol
      catalystMultiplier = 28.0; // dramatic speedup
    } else if (rxn.id === 'haber-bosch-kinetics') {
      effectiveEa = 160.0; // drops from 335 to 160 kJ/mol
      catalystMultiplier = 45.0;
    } else {
      effectiveEa = rxn.activationEnergyEaKjMol * 0.75;
      catalystMultiplier = 5.0;
    }
  }

  // Net relative rate
  const totalMultiplier = concFactor * tempFactor * surfaceAreaMultiplier * catalystMultiplier;
  const calculatedRate = parseFloat((rxn.baseRateConstantK * totalMultiplier).toFixed(6));

  // Thiosulfate cloudiness obscuration time: t = k_obscure / rate
  const baselineTime = 40.0; // seconds at 25°C, 1.0M
  const cloudinessTime = parseFloat((baselineTime / Math.max(0.05, totalMultiplier)).toFixed(1));

  return {
    reactionNameVi: rxn.nameVi,
    equation: rxn.equation,
    calculatedRate,
    relativeRateMultiplier: parseFloat(totalMultiplier.toFixed(2)),
    effectiveActivationEnergyEa: effectiveEa,
    collisionFrequencyFactor: parseFloat((concFactor * surfaceAreaMultiplier).toFixed(2)),
    cloudinessTimeSeconds: cloudinessTime,
    factorBreakdown: {
      concentrationContributionVi: `Nồng độ ${input.concentrationMolar}M: Đóng góp hệ số x${concFactor.toFixed(2)} vào mật độ va chạm hiệu quả giữa các tiểu phân.`,
      temperatureContributionVi: `Nhiệt độ ${input.temperatureCelsius}°C (chênh lệch ${deltaT > 0 ? `+${deltaT}` : deltaT}°C so với chuẩn 25°C): Tốc độ biến thiên x${tempFactor.toFixed(2)} theo hệ số γ = ${rxn.vanTHoffGamma}.`,
      surfaceAreaContributionVi: input.surfaceAreaState === 'FINE_POWDER'
        ? 'Dạng bột siêu mịn: Diện tích tiếp xúc tối đa, tăng tốc độ phản ứng gấp 8.5 lần so với khối lớn.'
        : (input.surfaceAreaState === 'GRANULES'
          ? 'Dạng hạt nhỏ: Tăng tốc độ gấp 3 lần so với dạng khối nguyên.'
          : 'Dạng khối đặc (Chunks): Diện tích tiếp xúc tối thiểu.'),
      catalystContributionVi: input.hasCatalyst
        ? `Có chất xúc tác: Hạ năng lượng hoạt hóa Ea từ ${rxn.activationEnergyEaKjMol} kJ/mol xuống ${effectiveEa} kJ/mol, gia tốc phản ứng x${catalystMultiplier} lần mà không bị tiêu hao.`
        : 'Không có chất xúc tác: Phản ứng phải vượt qua rào cản năng lượng hoạt hóa tự nhiên cao.'
    },
    summaryVi: `Tốc độ phản ứng tổng thể biến thiên gấp ${totalMultiplier.toFixed(1)} lần so với điều kiện chuẩn. Thời gian quan sát thấy lưu huỳnh vẩn đục che khuất dấu thập là ~${cloudinessTime} giây.`
  };
}

export interface ArrheniusActivationResult {
  temperatureKelvin: number;
  activationEnergyKjMol: number;
  effectiveCollisionFraction: number; // f = exp(-Ea / RT)
  effectiveCollisionsPerMillion: number;
  frequencyFactorA: number;
  rateConstantK: number;
  explanationVi: string;
}

export function calculateArrheniusCollision(
  temperatureCelsius: number = 25,
  activationEnergyKjMol: number = 50.0,
  frequencyFactorA: number = 1.0e11
): ArrheniusActivationResult {
  const R = 8.314; // J/(mol·K)
  const T = temperatureCelsius + 273.15;
  const EaJoules = activationEnergyKjMol * 1000;

  // f = exp(-Ea / RT)
  const exponent = -EaJoules / (R * T);
  const f = Math.exp(exponent);
  const perMillion = parseFloat((f * 1000000).toFixed(4));
  const k = frequencyFactorA * f;

  return {
    temperatureKelvin: parseFloat(T.toFixed(2)),
    activationEnergyKjMol,
    effectiveCollisionFraction: f,
    effectiveCollisionsPerMillion: perMillion,
    frequencyFactorA,
    rateConstantK: k,
    explanationVi: `Ở ${temperatureCelsius}°C (T = ${T.toFixed(1)} K), phân bố Maxwell-Boltzmann cho thấy chỉ có khoảng ${perMillion} trong mỗi 1 triệu va chạm có động năng đủ lớn (≥ ${activationEnergyKjMol} kJ/mol) để trở thành va chạm hiệu quả sinh ra phản ứng hóa học.`
  };
}
