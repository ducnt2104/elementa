/**
 * ELEMENTA - SOEC-SABATIER POWER-TO-GAS (PtG) & CARBON CIRCULARITY ENGINE
 *
 * IUPAC-grounded physicochemical and thermodynamic modeling of high-efficiency
 * Synthetic Natural Gas (e-methane / CH4) production via:
 * 1. High-Temperature Reversible Solid Oxide Electrolysis Cells (SOEC) at 750 - 850°C
 * 2. Multi-Stage Exothermic Catalytic Sabatier Methanation at 300 - 380°C
 * 3. Synergistic Exothermic Heat Integration: Methanation heat generates SOEC feed steam,
 *    boosting overall Power-to-Gas system efficiency to 78 - 84% (vs 55 - 62% for PEM-PtG).
 * 4. Grid-Quality e-Methane: CH4 > 97 vol%, Wobbe Index 49 - 53 MJ/m³, 100% infrastructure drop-in.
 */

export interface SoecOperatingPoint {
  temperatureC: number;                // 750 - 850°C (default 800°C)
  operatingCellVoltageV: number;       // 1.25 - 1.35 V (thermo-neutral ~1.283 V)
  currentDensityAcm2: number;          // 0.5 - 1.5 A/cm² (default 1.0 A/cm²)
  steamConversionRatio: number;        // 0.60 - 0.85 (default 0.75)
  stackElectricalEfficiencyLhv: number;// % (typically 98 - 100%)
  specificElectricityKWhPerNm3H2: number; // kWh/Nm³ H2
}

export interface SabatierReactorSpec {
  temperatureC: number;                // 300 - 380°C (default 340°C)
  pressureBar: number;                 // 5 - 25 bar (default 15 bar)
  catalystType: 'Ni_Al2O3' | 'Ru_CeO2' | 'Ni_Ru_Bimetallic';
  co2ConversionPercent: number;        // 98.0 - 99.8%
  ch4SelectivityPercent: number;       // 99.0 - 99.9%
  heatReleaseMJPerKgCH4: number;       // ~10.29 MJ/kg CH4 (exothermic)
}

export interface PtGPlantParameters {
  electricalInputMWe: number;          // Total power input to SOEC stack (e.g. 5 - 100 MWe)
  soecTemperatureC?: number;           // Default 800°C
  sabatierPressureBar?: number;        // Default 15 bar
  heatRecoveryEffectiveness?: number;  // 0.75 - 0.95 (default 0.88)
  co2SourceType?: 'DIRECT_AIR_CAPTURE' | 'BIOGAS_UPGRADING' | 'CEMENT_FLUE_GAS' | 'FERMENTATION_ETHANOL';
  operatingHoursPerYear?: number;      // Default 8000 hours
}

export interface PtGPlantPerformance {
  methaneProductionKgPerHour: number;
  methaneProductionNm3PerHour: number;
  methaneProductionTonsPerYear: number;
  co2ConsumptionKgPerHour: number;
  co2ConsumptionTonsPerYear: number;
  hydrogenFlowNm3PerHour: number;
  steamRequiredKgPerHour: number;
  heatRecuperatedFromSabatierMWth: number;
  netExternalSteamHeatRequiredMWth: number;
  powerToGasEfficiencyLhvPercent: number;
  wobbeIndexMJPerNm3: number;
  higherHeatingValueMJPerNm3: number;
  methanePurityVolPercent: number;
  annualAvoidedFossilGasMWh: number;
  co2SourceCaptured: {
    source: string;
    captureCostUSDPerTon: number;
    vietnameseName: string;
  };
}

export interface PtGTechnologyComparison {
  technologyName: string;
  vietnameseName: string;
  electrolyzerType: string;
  systemEfficiencyPtGPercent: number;
  externalSteamHeatRequired: string;
  productGasQuality: string;
  capitalCostUSDPerKWe: number;
  levelizedCostOfMethaneUSDPerMWh: number;
}

// Physical Constants
const MOLAR_MASS_CH4 = 0.016043;   // kg/mol
const MOLAR_MASS_CO2 = 0.044010;   // kg/mol
const MOLAR_MASS_H2 = 0.002016;    // kg/mol
const MOLAR_MASS_H2O = 0.018015;   // kg/mol
const NM3_PER_MOL = 0.022414;      // m³ STP per mol
const LHV_METHANE_MJ_PER_KG = 50.0; // MJ/kg
const LHV_METHANE_MJ_PER_NM3 = 35.8; // MJ/Nm³
const LHV_HYDROGEN_MJ_PER_KG = 120.0;
const FARADAY_CONSTANT = 96485.33; // C/mol

export const CO2_SOURCE_CATALOG = {
  DIRECT_AIR_CAPTURE: {
    source: 'Direct Air Capture (DAC)',
    captureCostUSDPerTon: 180.0,
    vietnameseName: 'Thu Hút Carbon Trực Tiếp Từ Khí Quyển (DAC 420 ppm)'
  },
  BIOGAS_UPGRADING: {
    source: 'Biogas Anaerobic Digestion Offgas',
    captureCostUSDPerTon: 35.0,
    vietnameseName: 'Khí Thải Tinh Chế Biogas Từ Chất Thải Nông Nghiệp'
  },
  CEMENT_FLUE_GAS: {
    source: 'Cement & Industrial Lime Kiln',
    captureCostUSDPerTon: 55.0,
    vietnameseName: 'Khí Lò Nung Xi Măng & Vôi Công Nghiệp (15 - 25% CO₂)'
  },
  FERMENTATION_ETHANOL: {
    source: 'Bioethanol Fermentation Brewery',
    captureCostUSDPerTon: 25.0,
    vietnameseName: 'Lên Men Rượu Sinh Học (Độ Tinh Khiết > 99% CO₂)'
  }
};

/**
 * Calculates SOEC stack operating parameters
 */
export function calculateSoecStackMetrics(
  temperatureC: number = 800,
  operatingVoltageV: number = 1.28
): SoecOperatingPoint {
  // Reversible cell potential at temperature T
  const tempK = temperatureC + 273.15;
  // Standard Gibbs free energy of steam reduction decreases linearly with temperature:
  // Delta G ~ 246000 - 54.8 * T (J/mol)
  const deltaGJPerMol = Math.max(160000, 246000 - 54.8 * tempK);
  const reversibleVoltage = deltaGJPerMol / (2 * FARADAY_CONSTANT); // ~0.98 V at 800°C

  // Specific electricity consumption:
  // Energy per mol H2 = 2 * F * V / 3.6e6 (kWh/mol)
  const kwhPerMolH2 = (2 * FARADAY_CONSTANT * operatingVoltageV) / 3.6e6;
  const specificElectricityKWhPerNm3H2 = kwhPerMolH2 / NM3_PER_MOL; // ~3.06 kWh/Nm³ H2

  // Stack electrical efficiency (LHV H2 = 10.79 MJ/Nm³ = 2.997 kWh/Nm³)
  const lhvKWhPerNm3H2 = 2.997;
  const stackElectricalEfficiencyLhv = (lhvKWhPerNm3H2 / specificElectricityKWhPerNm3H2) * 100;

  return {
    temperatureC,
    operatingCellVoltageV: operatingVoltageV,
    currentDensityAcm2: 1.0,
    steamConversionRatio: 0.75,
    stackElectricalEfficiencyLhv: Number(stackElectricalEfficiencyLhv.toFixed(1)),
    specificElectricityKWhPerNm3H2: Number(specificElectricityKWhPerNm3H2.toFixed(2))
  };
}

/**
 * Calculates complete SOEC-Sabatier Power-to-Gas plant mass and energy balance
 */
export function calculatePtGPlantPerformance(params: PtGPlantParameters): PtGPlantPerformance {
  const powerInputMWe = Math.max(0.5, params.electricalInputMWe);
  const soecTempC = params.soecTemperatureC ?? 800;
  const sabatierPressure = params.sabatierPressureBar ?? 15;
  const heatRecoveryEff = params.heatRecoveryEffectiveness ?? 0.88;
  const co2SourceKey = params.co2SourceType ?? 'BIOGAS_UPGRADING';
  const co2Source = CO2_SOURCE_CATALOG[co2SourceKey] || CO2_SOURCE_CATALOG.BIOGAS_UPGRADING;
  const operatingHours = params.operatingHoursPerYear ?? 8000;

  // 1. SOEC Hydrogen Production Rate
  const soecMetrics = calculateSoecStackMetrics(soecTempC, 1.28);
  const hydrogenNm3PerHour = (powerInputMWe * 1000) / soecMetrics.specificElectricityKWhPerNm3H2;
  const hydrogenMolesPerHour = hydrogenNm3PerHour / NM3_PER_MOL;

  // 2. Catalytic Sabatier Methanation Reaction Stoichiometry:
  // CO2 + 4 H2 -> CH4 + 2 H2O (Delta H = -165.0 kJ/mol)
  // Sabatier conversion and selectivity
  const sabatierConversion = 0.992; // 99.2% conversion at 15 bar, 340°C
  const methaneMolesPerHour = (hydrogenMolesPerHour / 4.0) * sabatierConversion;
  const methaneKgPerHour = methaneMolesPerHour * MOLAR_MASS_CH4;
  const methaneNm3PerHour = methaneMolesPerHour * NM3_PER_MOL;
  const methaneTonsPerYear = (methaneKgPerHour * operatingHours) / 1000;

  // CO2 consumed
  const co2MolesPerHour = methaneMolesPerHour;
  const co2KgPerHour = co2MolesPerHour * MOLAR_MASS_CO2;
  const co2TonsPerYear = (co2KgPerHour * operatingHours) / 1000;

  // Steam feed required by SOEC:
  // 1 mole H2 requires 1 mole H2O steam (plus excess for 75% conversion)
  const steamMolesPerHour = hydrogenMolesPerHour / soecMetrics.steamConversionRatio;
  const steamRequiredKgPerHour = steamMolesPerHour * MOLAR_MASS_H2O;

  // 3. Exothermic Heat Recuperation from Sabatier Reactor:
  // Reaction enthalpy: Delta H_rxn = 165 kJ/mol CH4
  // Fresh feed water required to replace consumed water = 2 moles H2O per mole CH4 (unreacted SOEC steam is recycled at 800°C)
  // Water vaporization + preheat enthalpy for fresh feed = 2 moles * 44 kJ/mol = 88 kJ/mol CH4.
  // The Sabatier reaction releases 165 kJ/mol sensible reaction heat plus latent condensation heat from product water.
  // With heat recovery effectiveness >= 80%, the Sabatier heat (165 * eff >= 132 kJ/mol) exceeds the 88 kJ/mol fresh vaporization duty.
  const sabatierHeatReleasedMJPerHour = methaneMolesPerHour * 0.165; // MJ/h
  const sabatierHeatMWth = sabatierHeatReleasedMJPerHour / 3600;      // MWth
  const heatRecuperatedFromSabatierMWth = sabatierHeatMWth * heatRecoveryEff;

  // Fresh water vaporization duty: 2 moles H2O per mole CH4
  const freshWaterHeatRequiredMJPerHour = methaneMolesPerHour * 2.0 * 0.044; // MJ/h
  const freshWaterHeatRequiredMWth = freshWaterHeatRequiredMJPerHour / 3600;

  // Net external steam heat needed after recuperation (0 MWth when thermally integrated)
  const netExternalSteamHeatRequiredMWth = Math.max(0, freshWaterHeatRequiredMWth - heatRecuperatedFromSabatierMWth);

  // 4. Overall Power-to-Gas System Efficiency (LHV Basis):
  // Chemical energy of methane produced / (Electrical Power Input + External Thermal Input)
  const methaneChemicalPowerLhvMW = (methaneKgPerHour * LHV_METHANE_MJ_PER_KG) / 3600;
  const totalEnergyInputMW = powerInputMWe + netExternalSteamHeatRequiredMWth;
  const powerToGasEfficiencyLhvPercent = (methaneChemicalPowerLhvMW / totalEnergyInputMW) * 100;

  // 5. Product Gas Quality & Standards:
  // High-pressure multi-stage condensation leaves dry gas with >97.5% CH4
  const methanePurityVolPercent = 98.2;
  const higherHeatingValueMJPerNm3 = 39.8; // Grid spec standard: 38 - 42 MJ/Nm³
  // Wobbe Index = HHV / sqrt(relative density). For 98.2% CH4, W ~ 50.8 MJ/Nm³
  const wobbeIndexMJPerNm3 = 50.8;

  // Annual Avoided Fossil Gas:
  // Equivalent energy in MWh of natural gas replaced
  const annualMethaneMWh = (methaneKgPerHour * LHV_METHANE_MJ_PER_KG * operatingHours) / 3600;

  return {
    methaneProductionKgPerHour: Number(methaneKgPerHour.toFixed(1)),
    methaneProductionNm3PerHour: Number(methaneNm3PerHour.toFixed(1)),
    methaneProductionTonsPerYear: Number(methaneTonsPerYear.toFixed(1)),
    co2ConsumptionKgPerHour: Number(co2KgPerHour.toFixed(1)),
    co2ConsumptionTonsPerYear: Number(co2TonsPerYear.toFixed(1)),
    hydrogenFlowNm3PerHour: Number(hydrogenNm3PerHour.toFixed(1)),
    steamRequiredKgPerHour: Number(steamRequiredKgPerHour.toFixed(1)),
    heatRecuperatedFromSabatierMWth: Number(heatRecuperatedFromSabatierMWth.toFixed(2)),
    netExternalSteamHeatRequiredMWth: Number(netExternalSteamHeatRequiredMWth.toFixed(2)),
    powerToGasEfficiencyLhvPercent: Number(powerToGasEfficiencyLhvPercent.toFixed(1)),
    wobbeIndexMJPerNm3: wobbeIndexMJPerNm3,
    higherHeatingValueMJPerNm3: higherHeatingValueMJPerNm3,
    methanePurityVolPercent: methanePurityVolPercent,
    annualAvoidedFossilGasMWh: Number(annualMethaneMWh.toFixed(0)),
    co2SourceCaptured: co2Source
  };
}

/**
 * Benchmark comparisons of SOEC-Sabatier vs competing PtG routes
 */
export function getPtGTechnologyComparisons(): PtGTechnologyComparison[] {
  return [
    {
      technologyName: 'SOEC-Sabatier Thermal Integration',
      vietnameseName: 'Điện Phân SOEC 800°C Tích Hợp Nhiệt Sabatier',
      electrolyzerType: 'Solid Oxide Electrolyzer Cell (SOEC)',
      systemEfficiencyPtGPercent: 81.5,
      externalSteamHeatRequired: '0% (Tự cấp 100% bằng nhiệt tỏa Sabatier)',
      productGasQuality: 'CH₄ > 98%, Wobbe Index 50.8 MJ/m³ (Bơm trực tiếp lưới khí)',
      capitalCostUSDPerKWe: 1450,
      levelizedCostOfMethaneUSDPerMWh: 78.5
    },
    {
      technologyName: 'PEM Electrolysis + Sabatier Methanation',
      vietnameseName: 'Điện Phân Nước PEM + Phản Ứng Sabatier',
      electrolyzerType: 'Proton Exchange Membrane (PEM)',
      systemEfficiencyPtGPercent: 57.0,
      externalSteamHeatRequired: 'Không áp dụng (Nhiệt Sabatier bị thải bỏ ra tháp giải nhiệt)',
      productGasQuality: 'CH₄ > 96%, Cần sấy tách ẩm bổ sung',
      capitalCostUSDPerKWe: 1200,
      levelizedCostOfMethaneUSDPerMWh: 115.0
    },
    {
      technologyName: 'Alkaline Liquid Electrolysis (AEL) + Sabatier',
      vietnameseName: 'Điện Phân Kiềm Dung Dịch (AEL) + Sabatier',
      electrolyzerType: 'Alkaline Electrolysis (KOH 30%)',
      systemEfficiencyPtGPercent: 53.5,
      externalSteamHeatRequired: 'Không áp dụng',
      productGasQuality: 'CH₄ ~ 94 - 96%, Tạp chất hơi kiềm cần lọc',
      capitalCostUSDPerKWe: 850,
      levelizedCostOfMethaneUSDPerMWh: 128.0
    },
    {
      technologyName: 'Biological Methanation (Archaea Microorganisms)',
      vietnameseName: 'Metan Hóa Sinh Học Bằng Vi Sinh Archaea',
      electrolyzerType: 'PEM cấp H₂ + Lên men sinh học (65°C)',
      systemEfficiencyPtGPercent: 52.0,
      externalSteamHeatRequired: 'Cần cấp nhiệt ổn định 65°C',
      productGasQuality: 'CH₄ ~ 95%, Tốc độ phản ứng chậm hơn 10x',
      capitalCostUSDPerKWe: 1600,
      levelizedCostOfMethaneUSDPerMWh: 135.0
    }
  ];
}
