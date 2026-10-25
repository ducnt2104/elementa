// src/domain/directFormicAcidSolidOxideEngine.ts
// Domain Engine: Direct Formic Acid Solid Oxide Fuel Cell (DFA-SOFC) Intermediate-Temperature Co-Generation
// Standards: IUPAC Electrochemistry, Protonic Ceramic Fuel Cells (PCFC), GDPT 2018 Chemistry & Combined Heat and Power (CHP)

export type DfaSofcElectrolyteType = 'BZCY_PROTONIC' | 'SDC_CERIA' | 'YSZ_ZIRCONIA';
export type DfaSofcAnodeType = 'NI_BZCY' | 'NI_SDC' | 'CU_SDC';

export interface DfaSofcElectrolyteSpec {
  id: DfaSofcElectrolyteType;
  name: string;
  chemicalFormula: string;
  chargeCarrier: 'H+' | 'O2-';
  minTempC: number;
  maxTempC: number;
  defaultTempC: number;
  activationEnergyEv: number;
  preExponentialConductivitySPerCm: number;
  standardThicknessUm: number;
  faradaicTransportNumber: number;
  vietnameseDescription: string;
  waterFormationSide: 'CATHODE' | 'ANODE';
}

export interface DfaSofcAnodeSpec {
  id: DfaSofcAnodeType;
  name: string;
  cokingResistance: 'ULTRA_HIGH' | 'HIGH' | 'MODERATE';
  sulfurTolerancePpm: number;
  exchangeCurrentDensityBaseAcm2: number;
  internalReformingEfficiencyPercent: number;
  vietnameseFeature: string;
}

export const DFA_SOFC_ELECTROLYTES: Record<DfaSofcElectrolyteType, DfaSofcElectrolyteSpec> = {
  BZCY_PROTONIC: {
    id: 'BZCY_PROTONIC',
    name: 'BaCe0.7Zr0.1Y0.2O3-δ (Gốm Dẫn Proton PCFC)',
    chemicalFormula: 'BaCe0.7Zr0.1Y0.2O3-δ',
    chargeCarrier: 'H+',
    minTempC: 500,
    maxTempC: 650,
    defaultTempC: 600,
    activationEnergyEv: 0.44,
    preExponentialConductivitySPerCm: 12000.0,
    standardThicknessUm: 15,
    faradaicTransportNumber: 0.98,
    vietnameseDescription: 'Chất điện phân gốm dẫn proton BZCY. Nước sinh ra tại cathode oxy, giúp khí CO2 ở cực anode hoàn toàn khô, tinh khiết 100% không pha loãng.',
    waterFormationSide: 'CATHODE'
  },
  SDC_CERIA: {
    id: 'SDC_CERIA',
    name: 'Sm0.2Ce0.8O1.9 (Samarium-Doped Ceria IT-SOFC)',
    chemicalFormula: 'Sm0.2Ce0.8O1.9',
    chargeCarrier: 'O2-',
    minTempC: 550,
    maxTempC: 700,
    defaultTempC: 650,
    activationEnergyEv: 0.68,
    preExponentialConductivitySPerCm: 45000.0,
    standardThicknessUm: 20,
    faradaicTransportNumber: 0.92,
    vietnameseDescription: 'Gốm Ceria pha tạp Samarium dẫn ion oxy O²⁻. Độ dẫn ion cực cao ở 600-650°C, pha trộn dẫn điện tử nhẹ ở điện thế khử sâu.',
    waterFormationSide: 'ANODE'
  },
  YSZ_ZIRCONIA: {
    id: 'YSZ_ZIRCONIA',
    name: '8YSZ (8 mol% Y2O3-Stabilized ZrO2 Chuẩn)',
    chemicalFormula: 'Zr0.84Y0.16O1.92',
    chargeCarrier: 'O2-',
    minTempC: 650,
    maxTempC: 800,
    defaultTempC: 750,
    activationEnergyEv: 0.91,
    preExponentialConductivitySPerCm: 150000.0,
    standardThicknessUm: 10,
    faradaicTransportNumber: 0.999,
    vietnameseDescription: 'Gốm zirconia ổn định hóa bằng yttria kinh điển. Không rò rỉ điện tử, độ bền cơ học cao, yêu cầu nhiệt độ vận hành 700-750°C.',
    waterFormationSide: 'ANODE'
  }
};

export const DFA_SOFC_ANODES: Record<DfaSofcAnodeType, DfaSofcAnodeSpec> = {
  NI_BZCY: {
    id: 'NI_BZCY',
    name: 'Ni-BZCY Cermet Tự Cải Tạo',
    cokingResistance: 'ULTRA_HIGH',
    sulfurTolerancePpm: 25,
    exchangeCurrentDensityBaseAcm2: 0.32,
    internalReformingEfficiencyPercent: 99.2,
    vietnameseFeature: 'Hoạt tính phân ly HCOOH thành H2 + CO2 vượt trội; môi trường hơi ẩm ngăn chặn lắng đọng muội than C.'
  },
  NI_SDC: {
    id: 'NI_SDC',
    name: 'Ni-SDC Cermet Dẫn Hỗn Hợp MIEC',
    cokingResistance: 'HIGH',
    sulfurTolerancePpm: 15,
    exchangeCurrentDensityBaseAcm2: 0.38,
    internalReformingEfficiencyPercent: 98.4,
    vietnameseFeature: 'Dẫn truyền hỗn hợp ion-điện tử thúc đẩy trực tiếp oxy hóa điện hóa CO và H2 tại vùng phản ứng mở rộng.'
  },
  CU_SDC: {
    id: 'CU_SDC',
    name: 'Cu-SDC Cermet Kháng Muội Than',
    cokingResistance: 'ULTRA_HIGH',
    sulfurTolerancePpm: 50,
    exchangeCurrentDensityBaseAcm2: 0.22,
    internalReformingEfficiencyPercent: 95.0,
    vietnameseFeature: 'Đồng (Cu) hoàn toàn trơ với phản ứng polyme hóa tạo muội than, chịu tải nhiên liệu hydrocacbon và axit béo pha tạp.'
  }
};

export interface DfaSofcOperatingConditions {
  electrolyteType: DfaSofcElectrolyteType;
  anodeType: DfaSofcAnodeType;
  temperatureC: number;
  steamToFormicAcidRatio: number; // e.g. 0.0 (pure HCOOH) to 1.5
  currentDensityAcm2: number;     // 0.05 to 2.0 A/cm2
  formicAcidConcentrationPercent: number; // 85% to 99% pure HCOOH
}

export interface ReformingEquilibriumResult {
  temperatureK: number;
  dehydrogenationRatioPercent: number; // HCOOH -> H2 + CO2
  decarbonylationRatioPercent: number; // HCOOH -> CO + H2O
  equilibriumH2MolarFraction: number;
  equilibriumCo2MolarFraction: number;
  equilibriumCoMolarFraction: number;
  equilibriumH2oMolarFraction: number;
  cokingTendencyIndex: number; // 0 (safe) to 1 (high coking danger)
}

export interface DfaSofcPolarizationResult {
  temperatureK: number;
  reversibleNernstVoltageV: number;
  ionicConductivitySPerCm: number;
  areaSpecificOhmicResistanceOhmCm2: number;
  activationOverpotentialV: number;
  concentrationOverpotentialV: number;
  operatingCellVoltageV: number;
  powerDensityWPerCm2: number;
  polarizationCurve: Array<{ currentDensityAcm2: number; cellVoltageV: number; powerDensityWPerCm2: number }>;
}

export interface DfaChpSystemPerformance {
  electricalPowerKw: number;
  highGradeThermalPowerKw: number;
  totalCombinedPowerKw: number;
  formicAcidConsumptionKgPerHour: number;
  formicAcidConsumptionLitersPerHour: number;
  electricalEfficiencyLhvPercent: number;
  thermalEfficiencyPercent: number;
  combinedChpEfficiencyPercent: number;
  annualAvoidedCo2Tons: number; // vs Grid electricity (0.55 kg/kWh) + Gas boiler (80% eff)
  exhaustTemperatureC: number;
}

export class DirectFormicAcidSolidOxideEngine {
  // Constants
  public static readonly FARADAY_CONSTANT = 96485.33; // C/mol
  public static readonly GAS_CONSTANT_R = 8.31446; // J/(mol*K)
  public static readonly BOLTZMANN_EV = 8.61733e-5; // eV/K
  public static readonly HCOOH_MOLAR_MASS_G_MOL = 46.03; // g/mol
  public static readonly HCOOH_DENSITY_KG_L = 1.22; // kg/L
  public static readonly HCOOH_LHV_KJ_PER_MOL = 254.6; // Lower Heating Value kJ/mol
  public static readonly HCOOH_LHV_MJ_PER_KG = 5.53; // MJ/kg

  /**
   * Calculate catalytic internal decomposition & reforming equilibrium of formic acid.
   * Path 1 (Dehydrogenation): HCOOH -> H2 + CO2 (Delta H = +31.2 kJ/mol)
   * Path 2 (Dehydration): HCOOH -> CO + H2O (Delta H = +26.0 kJ/mol)
   * Followed by Water-Gas Shift: CO + H2O <=> CO2 + H2 (Delta H = -41.2 kJ/mol)
   */
  public static calculateDecompositionEquilibrium(
    temperatureC: number,
    steamRatio: number,
    anode: DfaSofcAnodeSpec
  ): ReformingEquilibriumResult {
    const temperatureK = temperatureC + 273.15;

    // At intermediate temperatures (500 - 750°C), HCOOH decomposition is virtually 100% complete.
    // Dehydrogenation is kinetically and thermodynamically favored on Ni/Cu cermets.
    const baseDehydro = 93.0 + (temperatureC - 500) * 0.02 * (anode.internalReformingEfficiencyPercent / 100);
    const dehydrogenationRatioPercent = Math.min(99.4, Math.max(88.0, baseDehydro));
    const decarbonylationRatioPercent = 100 - dehydrogenationRatioPercent;

    // Water-gas shift equilibrium constant K_wgs = exp(4276 / T - 3.961)
    const lnKwgs = (4276 / temperatureK) - 3.961;
    const Kwgs = Math.exp(lnKwgs);

    // Initial catalytic decomposition breakdown:
    // HCOOH -> alpha * (H2 + CO2) + (1-alpha) * (CO + H2O)
    // Steam ratio adds extra H2O: n_H2O_in = (1 - alpha) + steamRatio
    const alpha = dehydrogenationRatioPercent / 100;
    let n_H2 = alpha;
    let n_CO2 = alpha;
    let n_CO = 1 - alpha;
    let n_H2O = (1 - alpha) + steamRatio;

    // On catalytic cermet, forward water-gas shift converts residual CO when H2O is present:
    // CO + H2O -> CO2 + H2
    if (n_CO > 0 && n_H2O > 0) {
      // Forward shift conversion efficiency is high on ceria/BZCY cermets (85-98%)
      const shiftConversion = Math.min(0.98, Math.max(0.60, (Kwgs / (Kwgs + 1)) * (1 + steamRatio * 0.5)));
      const deltaShift = Math.min(n_CO, n_H2O) * shiftConversion;
      n_CO -= deltaShift;
      n_H2O -= deltaShift;
      n_CO2 += deltaShift;
      n_H2 += deltaShift;
    }

    const totalMoles = n_H2 + n_CO2 + n_CO + n_H2O;

    // Coking tendency index: High CO and low H2O/CO2 promote Boudouard reaction: 2CO -> C(s) + CO2
    // Adding steam (steamRatio > 0) dramatically suppresses coking.
    const resistanceDivisor = anode.cokingResistance === 'ULTRA_HIGH' ? 3.0 : (anode.cokingResistance === 'HIGH' ? 1.5 : 0.8);
    const boudouardDrive = (n_CO * n_CO) / (n_CO2 * (steamRatio + 0.05));
    const cokingTendencyIndex = Math.min(1.0, Math.max(0.00001, boudouardDrive / resistanceDivisor));

    return {
      temperatureK,
      dehydrogenationRatioPercent,
      decarbonylationRatioPercent,
      equilibriumH2MolarFraction: n_H2 / totalMoles,
      equilibriumCo2MolarFraction: n_CO2 / totalMoles,
      equilibriumCoMolarFraction: n_CO / totalMoles,
      equilibriumH2oMolarFraction: n_H2O / totalMoles,
      cokingTendencyIndex
    };
  }

  /**
   * Calculate cell polarization curve and voltage at operating current density.
   */
  public static calculateCellPolarization(conditions: DfaSofcOperatingConditions): DfaSofcPolarizationResult {
    const electrolyte = DFA_SOFC_ELECTROLYTES[conditions.electrolyteType];
    const anode = DFA_SOFC_ANODES[conditions.anodeType];
    const temperatureK = conditions.temperatureC + 273.15;

    // Arrhenius ionic conductivity: sigma = (sigma_0 / T) * exp(-Ea / (k_B * T))
    const sigma = (electrolyte.preExponentialConductivitySPerCm / temperatureK) *
      Math.exp(-electrolyte.activationEnergyEv / (this.BOLTZMANN_EV * temperatureK));

    // Area specific ohmic resistance: ASR_ohm = thickness_cm / sigma (Ohm*cm^2)
    const thicknessCm = electrolyte.standardThicknessUm * 1e-4;
    const areaSpecificOhmicResistanceOhmCm2 = thicknessCm / Math.max(1e-5, sigma);

    // Reversible cell potential (Nernst equation) for H2 + 0.5 O2 -> H2O
    // Delta G0(T) ~ -247.4e3 + 54.3 * T (J/mol)
    const deltaG = -247400 + 54.3 * temperatureK;
    const E0 = -deltaG / (2 * this.FARADAY_CONSTANT);

    const equilibrium = this.calculateDecompositionEquilibrium(
      conditions.temperatureC,
      conditions.steamToFormicAcidRatio,
      anode
    );

    // Partial pressures: P_O2 = 0.21 bar (air cathode), P_H2 and P_H2O from equilibrium
    const pO2 = 0.21;
    const pH2 = equilibrium.equilibriumH2MolarFraction;
    const pH2o = Math.max(0.02, equilibrium.equilibriumH2oMolarFraction);

    const nernstCorrection = (this.GAS_CONSTANT_R * temperatureK / (2 * this.FARADAY_CONSTANT)) *
      Math.log((pH2 * Math.sqrt(pO2)) / pH2o);
    const reversibleNernstVoltageV = Math.max(0.95, Math.min(1.20, E0 + nernstCorrection));

    // Polarization curve generation
    const currentDensitySteps = [0.05, 0.2, 0.4, 0.6, 0.8, 1.0, 1.2, 1.4, 1.6, 1.8, 2.0];
    const jLim = 2.4; // Limiting current density A/cm2

    const computeVoltageAtJ = (j: number): { cellVoltageV: number; actLoss: number; concLoss: number } => {
      // Ohmic loss
      const vOhm = j * areaSpecificOhmicResistanceOhmCm2;

      // Activation loss via Butler-Volmer approximation: eta_act = 2 * (R*T / F) * asinh(j / (2 * j0))
      const j0 = anode.exchangeCurrentDensityBaseAcm2 * Math.exp(1200 * (1 / 873.15 - 1 / temperatureK));
      const actLoss = 2 * ((this.GAS_CONSTANT_R * temperatureK) / this.FARADAY_CONSTANT) *
        Math.asinh(j / (2 * Math.max(0.01, j0)));

      // Concentration loss
      const ratio = Math.min(0.98, j / jLim);
      const concLoss = -((this.GAS_CONSTANT_R * temperatureK) / (2 * this.FARADAY_CONSTANT)) * Math.log(1 - ratio);

      const cellVoltageV = Math.max(0.2, reversibleNernstVoltageV - vOhm - actLoss - concLoss);
      return { cellVoltageV, actLoss, concLoss };
    };

    const operatingMetrics = computeVoltageAtJ(conditions.currentDensityAcm2);
    const operatingCellVoltageV = operatingMetrics.cellVoltageV;
    const powerDensityWPerCm2 = conditions.currentDensityAcm2 * operatingCellVoltageV;

    const polarizationCurve = currentDensitySteps.map(j => {
      const metrics = computeVoltageAtJ(j);
      return {
        currentDensityAcm2: j,
        cellVoltageV: metrics.cellVoltageV,
        powerDensityWPerCm2: j * metrics.cellVoltageV
      };
    });

    return {
      temperatureK,
      reversibleNernstVoltageV,
      ionicConductivitySPerCm: sigma,
      areaSpecificOhmicResistanceOhmCm2,
      activationOverpotentialV: operatingMetrics.actLoss,
      concentrationOverpotentialV: operatingMetrics.concLoss,
      operatingCellVoltageV,
      powerDensityWPerCm2,
      polarizationCurve
    };
  }

  /**
   * Calculate Combined Heat and Power (CHP) system performance for a multi-cell stack.
   * Standard reference stack: 5 kW to 100 kW module.
   */
  public static calculateChpSystemPerformance(
    conditions: DfaSofcOperatingConditions,
    stackAreaCm2: number = 250, // cell active area
    numCells: number = 60       // 60-cell stack
  ): DfaChpSystemPerformance {
    const polarization = this.calculateCellPolarization(conditions);
    const currentA = conditions.currentDensityAcm2 * stackAreaCm2;
    const stackVoltageV = polarization.operatingCellVoltageV * numCells;
    const electricalPowerKw = (currentA * stackVoltageV) / 1000;

    // Fuel consumption from Faraday's law:
    // HCOOH -> H2 + CO2 -> 2e- per molecule of HCOOH
    // moles HCOOH/s = (currentA * numCells) / (2 * F * FaradaicEfficiency)
    const faradaicEff = DFA_SOFC_ELECTROLYTES[conditions.electrolyteType].faradaicTransportNumber;
    const molesHcoohPerSec = (currentA * numCells) / (2 * this.FARADAY_CONSTANT * faradaicEff);
    const molesHcoohPerHour = molesHcoohPerSec * 3600;

    // Account for fuel purity
    const purityFraction = conditions.formicAcidConcentrationPercent / 100;
    const formicAcidConsumptionKgPerHour = (molesHcoohPerHour * this.HCOOH_MOLAR_MASS_G_MOL) / (1000 * purityFraction);
    const formicAcidConsumptionLitersPerHour = formicAcidConsumptionKgPerHour / this.HCOOH_DENSITY_KG_L;

    // Fuel thermal input rate (LHV basis in kW)
    // LHV = 254.6 kJ/mol -> kW_th = moles/s * 254.6
    const fuelInputKwLhv = molesHcoohPerSec * this.HCOOH_LHV_KJ_PER_MOL;

    // Electrical efficiency
    const electricalEfficiencyLhvPercent = Math.min(65.0, (electricalPowerKw / fuelInputKwLhv) * 100);

    // Heat generated in the cell = Fuel Energy In - Electrical Power Out
    const stackHeatGenerationKw = Math.max(0.1, fuelInputKwLhv - electricalPowerKw);
    // High-grade exhaust heat recovery heat exchanger efficiency (~82% recovery of waste heat)
    const heatRecoveryFactor = 0.82;
    const highGradeThermalPowerKw = stackHeatGenerationKw * heatRecoveryFactor;
    const thermalEfficiencyPercent = (highGradeThermalPowerKw / fuelInputKwLhv) * 100;

    const totalCombinedPowerKw = electricalPowerKw + highGradeThermalPowerKw;
    const combinedChpEfficiencyPercent = electricalEfficiencyLhvPercent + thermalEfficiencyPercent;

    // Annual CO2 avoidance:
    // Formic acid from captured CO2 / green H2 is carbon-neutral.
    // Fossil electricity emits ~0.55 kg CO2/kWh; Gas heating emits ~0.20 kg CO2/kWh_th (at 85% boiler eff).
    const annualHours = 8000; // 8000 hours of continuous operation/year
    const annualElectricityKwh = electricalPowerKw * annualHours;
    const annualHeatKwh = highGradeThermalPowerKw * annualHours;
    const displacedGridCo2Kg = annualElectricityKwh * 0.55;
    const displacedBoilerCo2Kg = (annualHeatKwh / 0.85) * 0.20;
    const annualAvoidedCo2Tons = (displacedGridCo2Kg + displacedBoilerCo2Kg) / 1000;

    const exhaustTemperatureC = conditions.temperatureC - 35; // Slight expansion temperature drop

    return {
      electricalPowerKw,
      highGradeThermalPowerKw,
      totalCombinedPowerKw,
      formicAcidConsumptionKgPerHour,
      formicAcidConsumptionLitersPerHour,
      electricalEfficiencyLhvPercent,
      thermalEfficiencyPercent,
      combinedChpEfficiencyPercent,
      annualAvoidedCo2Tons,
      exhaustTemperatureC
    };
  }
}
