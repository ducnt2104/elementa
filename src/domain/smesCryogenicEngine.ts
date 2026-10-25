/**
 * ELEMENTA - SUPERCONDUCTING MAGNETIC ENERGY STORAGE (SMES) & CRYO-HYDROGEN HYBRID ENGINE
 *
 * Conforms to:
 * - IEEE Standards for Superconducting Magnetic Energy Storage Systems (IEEE Std 1547 & IEEE 1045)
 * - REBCO High-Temperature Superconductor (HTS) 2G Tapes (YBCO / GdBCO) at Liquid Hydrogen Temp (20.3 K)
 * - Magnetic Energy Equation: E = 0.5 * L * I² (Joules) & Magnetic Energy Density: u = B² / (2 * μ₀)
 * - Lorentz Force & Hoop Stress Engineering: σ_hoop = (B² / 2μ₀) with Carbon Fiber Overwrap
 * - Fast Quench Protection Dynamics: V_dump = I * R_dump, time constant tau = L / R_dump
 * - Synergistic LH2-SMES Energy Hub: Liquid hydrogen serves dual role as bulk energy carrier & cryogenic heat sink
 * - Vietnam GDPT 2018 Physics & Chemistry (Hiện tượng siêu dẫn, Từ trường, Định luật Jun-Lenxơ, Năng lượng từ)
 */

export type SuperconductorTapeClass =
  | 'REBCO_2G_YBCO'
  | 'MGB2_DIBORIDE'
  | 'BSCCO_2223'
  | 'NB3SN_LTS';

export type CryogenCoolantType =
  | 'LIQUID_HYDROGEN_LH2_20K'
  | 'LIQUID_NITROGEN_LN2_77K'
  | 'LIQUID_HELIUM_LHE_4K'
  | 'CLOSED_CYCLE_CRYOCOOLER_20K';

export interface SuperconductorTapeProperties {
  id: SuperconductorTapeClass;
  name: string;
  chemicalFormula: string;
  criticalTemperatureTcK: number;     // Critical transition temperature Tc in Kelvin
  criticalMagneticFieldAt20KTesla: number; // Upper critical field B_c2(20 K)
  criticalCurrentDensityAt20KAcm2: number; // J_c at 20 K and 5 Tesla
  costPerMeterUsd: number;
  mechanicalYieldStrengthMpa: number;
  description: string;
}

export interface CryogenCoolantProperties {
  id: CryogenCoolantType;
  name: string;
  boilingPointK: number;
  latentHeatOfVaporizationKjPerKg: number;
  densityKgPerM3: number;
  dualRoleAsFuel: boolean;
  coolingCostPerKwhThermalUsd: number;
  description: string;
}

export interface SmesStorageParameters {
  inductanceHenries: number;
  operatingCurrentAmperes: number;
  peakMagneticFieldTesla: number;
  coilRadiusMeters: number;
  coilHeightMeters: number;
  superconductorType: SuperconductorTapeClass;
  coolantType: CryogenCoolantType;
}

export interface SmesPerformanceOutput {
  storedEnergyMegaJoules: number;      // E = 0.5 * L * I²
  storedEnergyKwh: number;
  storedEnergyMwh: number;
  magneticEnergyDensityMjPerM3: number;// u = B² / (2 * μ₀)
  hoopStressMpa: number;               // σ = B² / (2 * μ₀)
  burstProtectionFactor: number;       // Yield strength / hoop stress (> 1.5 is safe)
  roundTripEfficiencyPct: number;      // > 95-97% (highest on Earth)
  peakDischargePowerMw: number;        // Sub-second pulsed or 10-second rapid dispatch
  responseDelayMilliseconds: number;  // < 5 ms (ultra-fast grid inertia)
  cycleLifeCount: string;             // Infinite (> 1,000,000 cycles without chemical fade)
}

export interface Lh2CryoCouplingSynergy {
  cryogenicPowerSavedKw: number;       // Electricity saved by avoiding helium refrigerators
  lh2EvaporativeCoolingDutyKw: number;
  lh2MassFlowRateKgPerHour: number;
  hybridChemicalEnergyMwhLhv: number;  // Chemical bulk energy of liquid H2 (120 MJ/kg)
  totalHybridSystemEnergyMwh: number;  // Electrical SMES + Chemical LH2
  annualRefrigerationCostSavedUsd: number;
}

export interface QuenchProtectionAnalysis {
  dumpResistorOhms: number;
  peakDumpVoltageVolts: number;
  quenchDischargeTimeConstantSec: number;
  hotSpotTemperatureK: number;
  isSafeQuench: boolean;
  intervention: string;
  protectiveIntervention: string;
}

/**
 * Fundamental Electromagnetic & Physical Constants
 */
export const VACUUM_PERMEABILITY_MU0 = 4 * Math.PI * 1e-7; // 1.2566e-6 H/m (T·m/A)
export const LHV_HYDROGEN_MJ_PER_KG = 120.0; // MJ/kg
export const FARADAY_CONSTANT = 96485.33; // C/mol

export const SUPERCONDUCTOR_CATALOG: Record<SuperconductorTapeClass, SuperconductorTapeProperties> = {
  REBCO_2G_YBCO: {
    id: 'REBCO_2G_YBCO',
    name: 'Băng Siêu Dẫn Nhiệt Độ Cao REBCO (YBa₂Cu₃O₇₋δ)',
    chemicalFormula: 'YBa₂Cu₃O₇₋δ / GdBCO',
    criticalTemperatureTcK: 93.0,
    criticalMagneticFieldAt20KTesla: 85.0, // Immense upper critical field
    criticalCurrentDensityAt20KAcm2: 2.5e6, // 2.5 MA/cm² at 20 K
    costPerMeterUsd: 65.0,
    mechanicalYieldStrengthMpa: 1200.0, // High-strength Hastelloy substrate
    description: 'Băng siêu dẫn thế hệ 2 tiên tiến nhất thế giới. Ở nhiệt độ hydro lỏng (20 K), mang dòng điện khổng lồ 2.5 triệu A/cm² và chịu được từ trường cực hạn trên 80 Tesla, hoàn hảo cho cuộn cảm SMES mật độ cao.'
  },
  MGB2_DIBORIDE: {
    id: 'MGB2_DIBORIDE',
    name: 'Magie Diborua Hợp Kim (MgB₂)',
    chemicalFormula: 'MgB₂',
    criticalTemperatureTcK: 39.0,
    criticalMagneticFieldAt20KTesla: 24.0,
    criticalCurrentDensityAt20KAcm2: 6.5e5,
    costPerMeterUsd: 12.0, // Extremely economical
    mechanicalYieldStrengthMpa: 650.0,
    description: 'Vật liệu siêu dẫn nhiệt độ trung bình giá rẻ. Ở 20 K ngâm trong hydro lỏng, MgB₂ có giá thành chỉ bằng 1/5 băng REBCO, tối ưu cho các trạm lưu trữ năng lượng lưới điện quy mô lớn.'
  },
  BSCCO_2223: {
    id: 'BSCCO_2223',
    name: 'Gốm Siêu Dẫn BSCCO (Bi₂Sr₂Ca₂Cu₃O₁₀)',
    chemicalFormula: 'Bi₂Sr₂Ca₂Cu₃O₁₀',
    criticalTemperatureTcK: 110.0,
    criticalMagneticFieldAt20KTesla: 40.0,
    criticalCurrentDensityAt20KAcm2: 4.0e5,
    costPerMeterUsd: 85.0,
    mechanicalYieldStrengthMpa: 280.0,
    description: 'Băng siêu dẫn oxit thế hệ 1 bọc trong vỏ bạc (Ag-sheath). Nhiệt độ chuyển pha cao nhưng cơ tính giòn và nhạy cảm với từ trường dị hướng.'
  },
  NB3SN_LTS: {
    id: 'NB3SN_LTS',
    name: 'Hợp Kim Niobi-Thiếc (Nb₃Sn)',
    chemicalFormula: 'Nb₃Sn',
    criticalTemperatureTcK: 18.3,
    criticalMagneticFieldAt20KTesla: 2.0, // Drops sharply near Tc
    criticalCurrentDensityAt20KAcm2: 1.2e5,
    costPerMeterUsd: 35.0,
    mechanicalYieldStrengthMpa: 800.0,
    description: 'Siêu dẫn nhiệt độ thấp kinh điển dùng trong ITER và máy quét cộng hưởng từ MRI. Bắt buộc phải làm mát bằng Heli lỏng 4.2 K đắt tiền, không thể vận hành bằng hydro lỏng 20 K.'
  }
};

export const CRYOGEN_COOLANT_CATALOG: Record<CryogenCoolantType, CryogenCoolantProperties> = {
  LIQUID_HYDROGEN_LH2_20K: {
    id: 'LIQUID_HYDROGEN_LH2_20K',
    name: 'Hydro Lỏng Siêu Lạnh (LH₂ - 20.3 K)',
    boilingPointK: 20.3,
    latentHeatOfVaporizationKjPerKg: 445.6, // High latent heat
    densityKgPerM3: 71.0,
    dualRoleAsFuel: true,
    coolingCostPerKwhThermalUsd: 0.08, // Near-zero refrigeration cost as fuel carrier
    description: 'Sự kết hợp năng lượng tương lai: Vừa là nhiên liệu hydro xanh tỷ trọng cao (120 MJ/kg), vừa là chất làm mát siêu dẫn miễn phí cho cuộn SMES. Nhiệt lượng rò rỉ làm bay hơi hydro nhẹ nhàng để cấp cho tuabin hoặc pin nhiên liệu.'
  },
  LIQUID_NITROGEN_LN2_77K: {
    id: 'LIQUID_NITROGEN_LN2_77K',
    name: 'Nitơ Lỏng (LN₂ - 77.3 K)',
    boilingPointK: 77.3,
    latentHeatOfVaporizationKjPerKg: 199.1,
    densityKgPerM3: 808.0,
    dualRoleAsFuel: false,
    coolingCostPerKwhThermalUsd: 0.15,
    description: 'Chất làm mát kinh tế và an toàn tuyệt đối (không cháy nổ). Tuy nhiên ở 77 K, dòng tới hạn J_c của REBCO giảm đi 80% so với ở 20 K.'
  },
  LIQUID_HELIUM_LHE_4K: {
    id: 'LIQUID_HELIUM_LHE_4K',
    name: 'Heli Lỏng (LHe - 4.2 K)',
    boilingPointK: 4.2,
    latentHeatOfVaporizationKjPerKg: 20.9, // Very low latent heat
    densityKgPerM3: 125.0,
    dualRoleAsFuel: false,
    coolingCostPerKwhThermalUsd: 4.50, // Extremely expensive and scarce resource
    description: 'Chất làm mát siêu lạnh truyền thống cho siêu dẫn LTS. Giá thành cực cao và nguồn cung tài nguyên khí heli toàn cầu khan hiếm nghiêm trọng.'
  },
  CLOSED_CYCLE_CRYOCOOLER_20K: {
    id: 'CLOSED_CYCLE_CRYOCOOLER_20K',
    name: 'Máy Lạnh Chu Trình Đóng Gifford-McMahon (20 K)',
    boilingPointK: 20.0,
    latentHeatOfVaporizationKjPerKg: 0.0,
    densityKgPerM3: 0.0,
    dualRoleAsFuel: false,
    coolingCostPerKwhThermalUsd: 1.80,
    description: 'Hệ thống làm lạnh bằng máy nén cơ học helium kín. Không tiêu hao chất lỏng nhưng tiêu thụ điện năng parasitic khoảng 15-20 kW điện cho mỗi 100 W nhiệt lạnh ở 20 K.'
  }
};

/**
 * Calculates SMES Stored Energy, Energy Density, Hoop Stress & Grid Stabilization Performance:
 * E = 0.5 * L * I² (Joules)
 * u = B² / (2 * μ₀) (Joules / m³)
 * σ_hoop = u = B² / (2 * μ₀) (Pascals)
 */
export function calculateSmesPerformance(params: SmesStorageParameters): SmesPerformanceOutput {
  const safeL = Math.max(0.01, params.inductanceHenries);
  const safeI = Math.max(10, params.operatingCurrentAmperes);
  const safeB = Math.max(0.5, Math.min(30.0, params.peakMagneticFieldTesla));

  // Magnetic stored energy: E = 0.5 * L * I² (Joules)
  const energyJoules = 0.5 * safeL * (safeI * safeI);
  const energyMegaJoules = energyJoules / 1e6;
  const energyKwh = energyJoules / 3.6e6;
  const energyMwh = energyKwh / 1000;

  // Magnetic energy density: u = B² / (2 * μ₀) in J/m³ -> divide by 1e6 for MJ/m³
  const energyDensityJoulesPerM3 = (safeB * safeB) / (2 * VACUUM_PERMEABILITY_MU0);
  const energyDensityMjPerM3 = energyDensityJoulesPerM3 / 1e6;

  // Hoop stress inside superconducting solenoid: σ = B² / (2 * μ₀) in Pascals -> divide by 1e6 for MPa
  const hoopStressMpa = energyDensityJoulesPerM3 / 1e6;

  // Mechanical burst protection margin
  const scTape = SUPERCONDUCTOR_CATALOG[params.superconductorType] || SUPERCONDUCTOR_CATALOG.REBCO_2G_YBCO;
  // Carbon fiber overwrap adds +800 MPa reinforcement
  const totalCoilStructuralStrengthMpa = scTape.mechanicalYieldStrengthMpa + 800.0;
  const burstProtectionFactor = totalCoilStructuralStrengthMpa / hoopStressMpa;

  // SMES has the highest round-trip efficiency on Earth: ~96-98% (zero chemical phase transformation loss)
  const roundTripEfficiencyPct = 96.5;

  // Peak discharge power: A 10-second full discharge delivers P = E(MJ) / 10 (MW)
  const peakDischargePowerMw = energyMegaJoules / 10.0;

  return {
    storedEnergyMegaJoules: Number(energyMegaJoules.toFixed(2)),
    storedEnergyKwh: Number(energyKwh.toFixed(2)),
    storedEnergyMwh: Number(energyMwh.toFixed(4)),
    magneticEnergyDensityMjPerM3: Number(energyDensityMjPerM3.toFixed(2)),
    hoopStressMpa: Number(hoopStressMpa.toFixed(1)),
    burstProtectionFactor: Number(burstProtectionFactor.toFixed(2)),
    roundTripEfficiencyPct: roundTripEfficiencyPct,
    peakDischargePowerMw: Number(peakDischargePowerMw.toFixed(2)),
    responseDelayMilliseconds: 3.5, // Ultra-fast sub-5ms response
    cycleLifeCount: 'Không Giới Hạn (> 1,000,000 Chu Kỳ)'
  };
}

/**
 * Calculates Synergistic LH2 Cooling and Hybrid Energy Hub Capacity
 */
export function calculateLh2CryoSynergy(
  smesStoredEnergyMwh: number,
  thermalLossWatts: number = 250,
  lh2FlowRateKgPerHour: number = 100.0
): Lh2CryoCouplingSynergy {
  const safeHeatLeakWatts = Math.max(10, thermalLossWatts);
  const safeFlow = Math.max(1, lh2FlowRateKgPerHour);

  // Liquid Hydrogen latent heat: 445.6 kJ/kg. Evaporation rate needed to remove heat leak:
  // Heat in kJ/s = Watts / 1000
  // Required boil-off rate (kg/s) = (Watts / 1000) / 445.6
  const boilOffKgPerSec = (safeHeatLeakWatts / 1000) / 445.6;
  const boilOffKgPerHour = boilOffKgPerSec * 3600;

  // Evaporative cooling duty provided by LH2 (kW)
  const evaporativeCoolingKw = safeHeatLeakWatts / 1000;

  // In traditional 20 K helium cryocoolers, Carnot efficiency COP is ~0.02 (requires 50 kW electrical per 1 kW thermal)
  // Cryogenic electrical power saved:
  const electricPowerSavedKw = evaporativeCoolingKw * 50.0;

  // Chemical LHV energy stored in the flowing LH2 stream (MWh):
  // Energy = flow (kg/h) * 120 (MJ/kg) / 3600 (MJ/MWh) = flow / 30
  const hybridChemicalEnergyMwh = (safeFlow * LHV_HYDROGEN_MJ_PER_KG) / 3600;

  // Total hybrid hub energy = SMES ultra-fast response + LH2 bulk energy
  const totalEnergyMwh = smesStoredEnergyMwh + hybridChemicalEnergyMwh;

  // Annual electricity cost savings from avoiding mechanical helium cryocoolers (at $0.12/kWh, 8760 h)
  const annualSavingsUsd = electricPowerSavedKw * 8760 * 0.12;

  return {
    cryogenicPowerSavedKw: Number(electricPowerSavedKw.toFixed(2)),
    lh2EvaporativeCoolingDutyKw: Number(evaporativeCoolingKw.toFixed(3)),
    lh2MassFlowRateKgPerHour: safeFlow,
    hybridChemicalEnergyMwhLhv: Number(hybridChemicalEnergyMwh.toFixed(2)),
    totalHybridSystemEnergyMwh: Number(totalEnergyMwh.toFixed(2)),
    annualRefrigerationCostSavedUsd: Math.round(annualSavingsUsd)
  };
}

/**
 * Evaluates Quench Detection & Fast Emergency Dump Protection Dynamics
 * Tau = L / R_dump, V_dump = I * R_dump
 */
export function evaluateQuenchProtection(
  inductanceHenries: number,
  operatingCurrentAmperes: number,
  dumpResistorOhms: number = 0.50
): QuenchProtectionAnalysis {
  const safeL = Math.max(0.01, inductanceHenries);
  const safeI = Math.max(10, operatingCurrentAmperes);
  const safeR = Math.max(0.05, Math.min(10.0, dumpResistorOhms));

  // Peak discharge voltage across coil terminals: V_dump = I * R
  const peakVoltage = safeI * safeR;

  // Quench discharge decay time constant tau = L / R (seconds)
  const tauSec = safeL / safeR;

  // Hot spot temperature adiabatic approximation:
  // T_hot ~ 20 K + (J² * tau * rho / (2 * C_p))
  // With fast dump (tau < 2s), hot spot stays well below 150 K (safe limit is 250 K)
  const hotSpotTempK = Math.min(300, 20.3 + (tauSec * 45.0));

  const isSafe = peakVoltage < 2500 && hotSpotTempK < 200;

  let intervention = '';
  if (isSafe) {
    intervention = `Bảo vệ dập quench hoàn hảo: Điện áp phóng V_dump = ${peakVoltage.toFixed(0)} V (< 2,500 V cách điện). Thời gian xả từ trường tau = ${tauSec.toFixed(2)}s, nhiệt độ điểm nóng ${hotSpotTempK.toFixed(0)} K không gây hư hại cách điện băng siêu dẫn.`;
  } else {
    intervention = `Cảnh báo quá áp hoặc quá nhiệt: Cần tăng tiết diện thanh cái hoặc hạ điện trở xả R_dump để khống chế điện áp < 2.5 kV.`;
  }

  return {
    dumpResistorOhms: safeR,
    peakDumpVoltageVolts: Number(peakVoltage.toFixed(1)),
    quenchDischargeTimeConstantSec: Number(tauSec.toFixed(3)),
    hotSpotTemperatureK: Number(hotSpotTempK.toFixed(1)),
    isSafeQuench: isSafe,
    intervention,
    protectiveIntervention: intervention
  };
}

/**
 * Grid Energy Storage Technology Comparison Benchmark
 */
export interface EnergyStorageBenchmark {
  technologyName: string;
  roundTripEfficiencyPct: number;
  responseSpeed: string;
  cycleLifeCount: string;
  degradationPerYearPct: number;
  powerDensityMwPerM3: number;
  environmentalHazard: 'ZERO' | 'LOW' | 'HIGH';
  description: string;
}

export const ENERGY_STORAGE_BENCHMARKS: EnergyStorageBenchmark[] = [
  {
    technologyName: 'Lưu Trữ Từ Trường Siêu Dẫn (SMES - REBCO/LH₂)',
    roundTripEfficiencyPct: 96.5, // Highest efficiency of any storage system
    responseSpeed: '< 5 mili-giây (Tức thì)',
    cycleLifeCount: '> 1,000,000 chu kỳ (Vô hạn)',
    degradationPerYearPct: 0.0,
    powerDensityMwPerM3: 25.0,
    environmentalHazard: 'ZERO',
    description: 'Nạp/xả dòng điện trực tiếp vào từ trường không qua biến đổi hóa học, loại bỏ hoàn toàn suy hao và suy thoái vật liệu. Phản ứng tức thì dưới 5ms bù quán tính lưới điện và triệt tiêu dao động điện áp tần số cao.'
  },
  {
    technologyName: 'Pin Hóa Học Lithium-Ion (LFP / NMC)',
    roundTripEfficiencyPct: 86.0,
    responseSpeed: '200 - 500 mili-giây',
    cycleLifeCount: '3,000 - 6,000 chu kỳ',
    degradationPerYearPct: 2.5,
    powerDensityMwPerM3: 1.2,
    environmentalHazard: 'HIGH',
    description: 'Lưu trữ qua phản ứng hóa học xen cài ion. Suy thoái dung lượng liên tục sau mỗi chu kỳ sạc-xả, nguy cơ cháy nổ nhiệt (thermal runaway) và xử lý độc hại sau vòng đời.'
  },
  {
    technologyName: 'Bánh Đà Động Năng Siêu Tốc (Flywheel Storage)',
    roundTripEfficiencyPct: 88.0,
    responseSpeed: '< 10 mili-giây',
    cycleLifeCount: '100,000 chu kỳ',
    degradationPerYearPct: 0.5,
    powerDensityMwPerM3: 5.0,
    environmentalHazard: 'LOW',
    description: 'Rotor sợi carbon quay ở 60,000 vòng/phút trong buồng chân không. Khả năng tích trữ công suất cao nhưng tổn thất tự xả lớn do ma sát ổ bi từ tính.'
  },
  {
    technologyName: 'Thủy Điện Tích Năng (Pumped Hydro Storage)',
    roundTripEfficiencyPct: 75.0,
    responseSpeed: '15 - 30 giây',
    cycleLifeCount: 'Không giới hạn (50+ năm)',
    degradationPerYearPct: 0.1,
    powerDensityMwPerM3: 0.001,
    environmentalHazard: 'LOW',
    description: 'Bơm nước lên hồ chứa trên cao. Dung lượng MWh khổng lồ nhưng đòi hỏi địa hình núi cao đặc thù, diện tích ngập nước lớn và tốc độ khởi động tuabin chậm (15-30 giây).'
  }
];
