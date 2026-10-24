// src/domain/betavoltaicNuclearBatteryEngine.ts
// Comprehensive Domain Engine: Betavoltaic Nuclear Batteries, Radioisotope Decay Kinetics & Wide-Bandgap Semiconductor Transducers
// Standards: IUPAC Nuclear Chemistry, IEC 60062 / IAEA Safety Standards, GDPT 2018 (Vật lí & Hóa học 10/12: Phóng xạ, Bán dẫn & Năng lượng vĩnh cửu)

export type RadioisotopeId = 'TRITIUM_H3' | 'NICKEL_63' | 'CARBON_14' | 'PROMETHIUM_147';
export type SemiconductorId = 'DIAMOND' | 'SILICON_CARBIDE_4H' | 'GALLIUM_NITRIDE' | 'SILICON_BASE';

export interface RadioisotopeSpec {
  id: RadioisotopeId;
  name: string;
  chemicalSymbol: string;
  halfLifeYears: number;
  averageBetaEnergyKev: number;
  maxBetaEnergyKev: number;
  specificActivityCiPerGram: number;
  decayEquation: string;
  daughterNuclide: string;
  shieldingRequirement: string;
  isPureBetaEmitter: boolean;
  idealApplication: string;
  radioactiveWasteStatus: string;
}

export interface SemiconductorSpec {
  id: SemiconductorId;
  name: string;
  bandgapEv: number;
  electronHolePairCreationEnergyEv: number;
  radiationDamageThresholdEv: number;
  breakdownFieldMvPerCm: number;
  thermalConductivityWPerMK: number;
  radiationToleranceYears: number;
  reverseSaturationCurrentDensityAcm2: number;
}

export interface BetavoltaicIVPoint {
  voltageVolts: number;
  currentDensityMicroAmpPerCm2: number;
  powerDensityMicroWattPerCm2: number;
}

export interface BetavoltaicSystemResult {
  isotope: RadioisotopeSpec;
  semiconductor: SemiconductorSpec;
  initialActivityCi: number;
  initialThermalPowerMicroWatt: number;
  shortCircuitCurrentMicroAmp: number;
  openCircuitVoltageVolts: number;
  fillFactor: number;
  maxElectricalPowerMicroWatt: number;
  electricalConversionEfficiencyPercent: number;
  radiationHardnessScore: number; // 0 - 10
  decadesLongevitySummary: string;
}

export interface LongevityDataPoint {
  years: number;
  remainingActivityCi: number;
  activityRetentionPercent: number;
  electricalPowerMicroWatt: number;
  chemicalLiIonBaselineMicroWatt: number; // For comparison (dies after 10-15 years)
}

// -------------------------------------------------------------------------
// 1. ISOTOPES & SEMICONDUCTORS CATALOG
// -------------------------------------------------------------------------

export const RADIOISOTOPES_CATALOG: RadioisotopeSpec[] = [
  {
    id: 'TRITIUM_H3',
    name: 'Triti (Hydrogen-3)',
    chemicalSymbol: '³H (T)',
    halfLifeYears: 12.32,
    averageBetaEnergyKev: 5.7,
    maxBetaEnergyKev: 18.6,
    specificActivityCiPerGram: 9650,
    decayEquation: '³₁H ➔ ³₂He + e⁻ + ν̄ₑ',
    daughterNuclide: 'Helium-3 (³He, khí trơ bền, không phóng xạ)',
    shieldingRequirement: 'Lớp màng titan hoặc vỏ polymer dày 10 µm (an toàn tuyệt đối, không có tia gamma)',
    isPureBetaEmitter: true,
    idealApplication: 'Máy trợ tim sinh học, cấy ghép thần kinh, cảm biến áp suất sâu trong bê tông đập thủy điện',
    radioactiveWasteStatus: 'Sản phẩm phụ phân rã trong lò phản ứng nước nặng (CANDU), hoàn toàn tái chế được'
  },
  {
    id: 'NICKEL_63',
    name: 'Niken-63',
    chemicalSymbol: '⁶³Ni',
    halfLifeYears: 100.1,
    averageBetaEnergyKev: 17.4,
    maxBetaEnergyKev: 66.9,
    specificActivityCiPerGram: 57,
    decayEquation: '⁶³₂₈Ni ➔ ⁶³₂₉Cu + e⁻ + ν̄ₑ',
    daughterNuclide: 'Đồng-63 (⁶³Cu, kim loại bền, dẫn điện tốt)',
    shieldingRequirement: 'Lớp lá kim loại 25 µm (chặn 100% hạt beta, 0 phát xạ gamma thứ cấp)',
    isPureBetaEmitter: true,
    idealApplication: 'Cáp quang đáy biển sâu 6000m, phao cảnh báo hải dương, vi mạch bảo mật phần cứng quân sự',
    radioactiveWasteStatus: 'Lá kim loại mạ điện thể rắn, không bay hơi, tuổi thọ thế kỷ (> 100 năm)'
  },
  {
    id: 'CARBON_14',
    name: 'Carbon-14 (Pin Kim Cương Bristol)',
    chemicalSymbol: '¹⁴C',
    halfLifeYears: 5730,
    averageBetaEnergyKev: 49.5,
    maxBetaEnergyKev: 156.5,
    specificActivityCiPerGram: 4.46,
    decayEquation: '¹⁴₆C ➔ ¹⁴₇N + e⁻ + ν̄ₑ',
    daughterNuclide: 'Nitơ-14 (¹⁴N, khí trơ cấu tạo khí quyển)',
    shieldingRequirement: 'Kim cương đa tinh thể bao bọc ngoài cùng (kim cương tự hấp thụ hoàn toàn phóng xạ)',
    isPureBetaEmitter: true,
    idealApplication: 'Tàu thám hiểm không gian liên sao ngoài rìa Hệ Mặt Trời, hộp đen vĩnh cửu, ngọn hải đăng thiên niên kỷ',
    radioactiveWasteStatus: 'Tái chế từ khối graphite phóng xạ của lò phản ứng hạt nhân Magnox đã ngừng hoạt động'
  },
  {
    id: 'PROMETHIUM_147',
    name: 'Prometi-147',
    chemicalSymbol: '¹⁴⁷Pm',
    halfLifeYears: 2.62,
    averageBetaEnergyKev: 62.0,
    maxBetaEnergyKev: 224.0,
    specificActivityCiPerGram: 928,
    decayEquation: '¹⁴⁷₆₁Pm ➔ ¹⁴⁷₆₂Sm + e⁻ + ν̄ₑ',
    daughterNuclide: 'Samari-147 (¹⁴⁷Sm)',
    shieldingRequirement: 'Vỏ chì mỏng hoặc vonfram dày 0.5 mm để triệt tiêu bức xạ hãm (Bremsstrahlung)',
    isPureBetaEmitter: false,
    idealApplication: 'Nguồn phát mật độ công suất cao thời hạn ngắn (nhiệm vụ bay thăm dò quỹ đạo 2-3 năm)',
    radioactiveWasteStatus: 'Đồng vị đất hiếm nhân tạo phân hạch U-235'
  }
];

export const SEMICONDUCTORS_CATALOG: SemiconductorSpec[] = [
  {
    id: 'DIAMOND',
    name: 'Kim Cương Bán Dẫn (Synthetic Diamond p-n/Schottky)',
    bandgapEv: 5.47,
    electronHolePairCreationEnergyEv: 13.0,
    radiationDamageThresholdEv: 43.0,
    breakdownFieldMvPerCm: 10.0,
    thermalConductivityWPerMK: 2200,
    radiationToleranceYears: 1000,
    reverseSaturationCurrentDensityAcm2: 1e-25
  },
  {
    id: 'SILICON_CARBIDE_4H',
    name: 'Silicon Carbide (4H-SiC)',
    bandgapEv: 3.26,
    electronHolePairCreationEnergyEv: 7.8,
    radiationDamageThresholdEv: 21.8,
    breakdownFieldMvPerCm: 3.0,
    thermalConductivityWPerMK: 490,
    radiationToleranceYears: 150,
    reverseSaturationCurrentDensityAcm2: 1e-20
  },
  {
    id: 'GALLIUM_NITRIDE',
    name: 'Gali Nitride (GaN)',
    bandgapEv: 3.40,
    electronHolePairCreationEnergyEv: 8.9,
    radiationDamageThresholdEv: 20.0,
    breakdownFieldMvPerCm: 3.3,
    thermalConductivityWPerMK: 230,
    radiationToleranceYears: 120,
    reverseSaturationCurrentDensityAcm2: 5e-20
  },
  {
    id: 'SILICON_BASE',
    name: 'Silicon Tiêu Chuẩn (Si tinh thể p-n)',
    bandgapEv: 1.12,
    electronHolePairCreationEnergyEv: 3.6,
    radiationDamageThresholdEv: 13.0,
    breakdownFieldMvPerCm: 0.3,
    thermalConductivityWPerMK: 148,
    radiationToleranceYears: 5,
    reverseSaturationCurrentDensityAcm2: 1e-11
  }
];

// Physical Constants
const CHARGE_Q = 1.602176634e-19; // Coulombs
const BOLTZMANN_K = 1.380649e-23; // J/K
const ROOM_TEMP_K = 300; // 27°C
const BECQUEREL_PER_CURIE = 3.7e10; // 1 Ci = 3.7e10 Bq

// -------------------------------------------------------------------------
// 2. RADIOACTIVE DECAY KINETICS
// -------------------------------------------------------------------------

export function simulateRadioactiveDecay(
  isotopeId: RadioisotopeId,
  initialActivityCi: number,
  elapsedYears: number
): {
  remainingActivityCi: number;
  activityRetentionRatio: number;
  remainingActivityBq: number;
  emittedThermalPowerMicroWatt: number;
  daughterMolesAccumulated: number;
} {
  const isotope = RADIOISOTOPES_CATALOG.find(iso => iso.id === isotopeId) || RADIOISOTOPES_CATALOG[0];
  const lambda = Math.LN2 / isotope.halfLifeYears;
  const remainingActivityCi = initialActivityCi * Math.exp(-lambda * elapsedYears);
  const activityRetentionRatio = remainingActivityCi / initialActivityCi;
  const remainingActivityBq = remainingActivityCi * BECQUEREL_PER_CURIE;

  // Thermal power = Activity (Bq) * Avg Beta Energy (Joules)
  // 1 eV = 1.602e-19 J
  const avgEnergyJoules = isotope.averageBetaEnergyKev * 1000 * CHARGE_Q;
  const thermalPowerWatts = remainingActivityBq * avgEnergyJoules;
  const emittedThermalPowerMicroWatt = thermalPowerWatts * 1e6;

  // Disintegrated atoms
  const disintegratedAtoms = (initialActivityCi - remainingActivityCi) * BECQUEREL_PER_CURIE * (isotope.halfLifeYears * 365.25 * 86400 / Math.LN2);
  const daughterMolesAccumulated = disintegratedAtoms / 6.02214076e23;

  return {
    remainingActivityCi,
    activityRetentionRatio,
    remainingActivityBq,
    emittedThermalPowerMicroWatt,
    daughterMolesAccumulated
  };
}

// -------------------------------------------------------------------------
// 3. BETAVOLTAIC TRANSDUCER & IV POLARIZATION CURVE
// -------------------------------------------------------------------------

export function simulateBetavoltaicIVCurve(
  isotopeId: RadioisotopeId,
  semiconductorId: SemiconductorId,
  activityCi: number,
  deviceAreaCm2: number = 1.0
): {
  ivPoints: BetavoltaicIVPoint[];
  systemResult: BetavoltaicSystemResult;
} {
  const isotope = RADIOISOTOPES_CATALOG.find(i => i.id === isotopeId) || RADIOISOTOPES_CATALOG[0];
  const semiconductor = SEMICONDUCTORS_CATALOG.find(s => s.id === semiconductorId) || SEMICONDUCTORS_CATALOG[0];

  const decay = simulateRadioactiveDecay(isotopeId, activityCi, 0);
  const totalBq = decay.remainingActivityBq;

  // Energy balance:
  // Self-absorption in source layer & geometric view factor (typically ~50% to 75% beta escape)
  const betaEscapeEfficiency = 0.65;
  // Collection efficiency of generated EHP in depletion region (typically 70% - 90%)
  const collectionEfficiency = 0.85;

  // Number of electron-hole pairs generated per beta particle = E_avg / epsilon_pair
  const ehpPerBeta = (isotope.averageBetaEnergyKev * 1000) / semiconductor.electronHolePairCreationEnergyEv;

  // Total generated electron current (Amperes)
  const totalElectronsPerSec = totalBq * betaEscapeEfficiency * ehpPerBeta * collectionEfficiency;
  const shortCircuitCurrentA = totalElectronsPerSec * CHARGE_Q;
  const shortCircuitCurrentMicroAmp = shortCircuitCurrentA * 1e6;
  const jscAcm2 = shortCircuitCurrentA / deviceAreaCm2;
  const jscMicroAmpCm2 = jscAcm2 * 1e6;

  // Open Circuit Voltage: V_oc = n * (k*T/q) * ln(J_sc / J_0 + 1)
  // In wide-bandgap semiconductors (Diamond, SiC), generation-recombination in deep depletion region sets ideality factor n ~ 1.8 - 2.2
  const idealityFactor = semiconductor.id === 'DIAMOND' ? 2.1 
    : semiconductor.id === 'SILICON_CARBIDE_4H' ? 1.8 
    : semiconductor.id === 'GALLIUM_NITRIDE' ? 1.7 
    : 1.2;
  const thermalVoltage = (BOLTZMANN_K * ROOM_TEMP_K) / CHARGE_Q; // ~0.02585 V
  const effectiveThermalVoltage = idealityFactor * thermalVoltage;
  const j0 = semiconductor.reverseSaturationCurrentDensityAcm2;
  const voc = Math.max(0.1, effectiveThermalVoltage * Math.log(Math.max(1, jscAcm2 / j0 + 1)));

  // Fill Factor empirical approximation:
  const normalizedVoc = voc / effectiveThermalVoltage;
  const fillFactor = (normalizedVoc - Math.log(normalizedVoc + 0.72)) / (normalizedVoc + 1);

  // Maximum electrical power
  const maxElectricalPowerMicroWatt = shortCircuitCurrentMicroAmp * voc * fillFactor;
  const electricalConversionEfficiencyPercent = (maxElectricalPowerMicroWatt / decay.emittedThermalPowerMicroWatt) * 100;

  // Radiation hardness score
  const radiationHardnessScore = Math.min(10, (semiconductor.radiationDamageThresholdEv / 4.3));

  // Build IV Points (25 samples)
  const ivPoints: BetavoltaicIVPoint[] = [];
  const steps = 25;
  for (let i = 0; i <= steps; i++) {
    const v = (voc * i) / steps;
    // Shockley diode equation under irradiation: J(V) = J_sc - J_0 * (exp(qV / n*kT) - 1)
    const diodeCurrentAcm2 = j0 * (Math.exp(Math.min(50, v / effectiveThermalVoltage)) - 1);
    const netCurrentAcm2 = Math.max(0, jscAcm2 - diodeCurrentAcm2);
    const jMicroAmpCm2 = netCurrentAcm2 * 1e6;
    const powerMicroWattCm2 = v * jMicroAmpCm2;

    ivPoints.push({
      voltageVolts: Number(v.toFixed(3)),
      currentDensityMicroAmpPerCm2: Number(jMicroAmpCm2.toFixed(3)),
      powerDensityMicroWattPerCm2: Number(powerMicroWattCm2.toFixed(3))
    });
  }

  const systemResult: BetavoltaicSystemResult = {
    isotope,
    semiconductor,
    initialActivityCi: activityCi,
    initialThermalPowerMicroWatt: Number(decay.emittedThermalPowerMicroWatt.toFixed(2)),
    shortCircuitCurrentMicroAmp: Number(shortCircuitCurrentMicroAmp.toFixed(3)),
    openCircuitVoltageVolts: Number(voc.toFixed(3)),
    fillFactor: Number(fillFactor.toFixed(3)),
    maxElectricalPowerMicroWatt: Number(maxElectricalPowerMicroWatt.toFixed(3)),
    electricalConversionEfficiencyPercent: Number(electricalConversionEfficiencyPercent.toFixed(2)),
    radiationHardnessScore: Number(radiationHardnessScore.toFixed(1)),
    decadesLongevitySummary: `${isotope.name} kết hợp ${semiconductor.name}: Hoạt động liên tục ${isotope.halfLifeYears >= 100 ? '> 100 năm' : `${isotope.halfLifeYears} năm (bán rã)`} mà không cần sạc điện hay bảo dưỡng.`
  };

  return { ivPoints, systemResult };
}

// -------------------------------------------------------------------------
// 4. MULTI-DECADE LONGEVITY SIMULATION (NUCLEAR VS CHEMICAL LI-ION)
// -------------------------------------------------------------------------

export function simulateLongevityCurve(
  isotopeId: RadioisotopeId,
  semiconductorId: SemiconductorId,
  activityCi: number,
  maxYears: number = 100
): LongevityDataPoint[] {
  const isotope = RADIOISOTOPES_CATALOG.find(i => i.id === isotopeId) || RADIOISOTOPES_CATALOG[0];
  const semiconductor = SEMICONDUCTORS_CATALOG.find(s => s.id === semiconductorId) || SEMICONDUCTORS_CATALOG[0];

  // Base 0-year power
  const { systemResult: baseResult } = simulateBetavoltaicIVCurve(isotopeId, semiconductorId, activityCi);
  const initialPower = baseResult.maxElectricalPowerMicroWatt;

  const points: LongevityDataPoint[] = [];
  const yearsSamples = [0, 1, 2, 5, 10, 15, 20, 30, 40, 50, 60, 75, 100];
  const filteredYears = yearsSamples.filter(y => y <= maxYears);
  if (!filteredYears.includes(maxYears)) {
    filteredYears.push(maxYears);
  }

  for (const yr of filteredYears) {
    const decay = simulateRadioactiveDecay(isotopeId, activityCi, yr);
    
    // Radiation damage degradation in semiconductor lattice over time
    // Diamond has virtually zero degradation, Silicon suffers major degradation
    const degradationHalflife = semiconductor.radiationToleranceYears;
    const semiconductorHealthFactor = Math.exp(-Math.LN2 * yr / degradationHalflife);

    const electricalPower = initialPower * decay.activityRetentionRatio * semiconductorHealthFactor;

    // Chemical Li-Ion battery comparison (calendar fading & electrolyte dry-out):
    // Typically loses 2-3% per year + shelf life max 12-15 years
    let chemicalLiRatio = 1.0;
    if (yr <= 10) {
      chemicalLiRatio = Math.max(0, 1.0 - (yr * 0.08));
    } else if (yr <= 15) {
      chemicalLiRatio = Math.max(0, 0.2 - ((yr - 10) * 0.04));
    } else {
      chemicalLiRatio = 0.0; // Completely dead
    }
    const chemicalLiIonBaselineMicroWatt = initialPower * chemicalLiRatio;

    points.push({
      years: yr,
      remainingActivityCi: Number(decay.remainingActivityCi.toFixed(4)),
      activityRetentionPercent: Number((decay.activityRetentionRatio * 100).toFixed(1)),
      electricalPowerMicroWatt: Number(electricalPower.toFixed(3)),
      chemicalLiIonBaselineMicroWatt: Number(chemicalLiIonBaselineMicroWatt.toFixed(3))
    });
  }

  return points;
}
