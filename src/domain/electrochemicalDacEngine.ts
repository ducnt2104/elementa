// src/domain/electrochemicalDacEngine.ts
// ============================================================================
// ELECTROCHEMICAL DIRECT AIR CAPTURE (e-DAC) & BIPOLAR MEMBRANE ELECTRODIALYSIS (BPMED)
// Conforming to IUPAC Chemical Thermodynamics, Electrochemical Kinetics,
// and Net-Zero Atmospheric Carbon Removal Standards (US DOE Carbon Negative Shot)
// ============================================================================

export interface AirContactorSpecs {
  ambientCo2Ppm: number;           // ppm (typically 420 ppm)
  airFlowRateM3h: number;          // m³/h air drafting across packing
  solventType: 'KOH' | 'K2CO3' | 'NaOH' | 'AminoAcidSalt';
  solventConcentrationM: number;   // M (e.g. 2.0 M KOH)
  liquidToGasRatio: number;        // L/G ratio (L liquid / m³ air, e.g. 1.2 - 2.5)
  packingType: 'Structured_PVC' | 'Microchannel_Graphene' | 'Random_Pall_Rings';
  captureEfficiency: number;       // 0.0 - 1.0 (typically 0.75 - 0.85)
}

export interface BpmedStackSpecs {
  cellPairCount: number;           // repeating triplet cell units
  currentDensityMaCm2: number;     // mA/cm² (typically 50 - 120 mA/cm²)
  cellVoltageV: number;            // V per triplet cell (1.15 - 1.60 V)
  faradaicEfficiency: number;      // 0.0 - 1.0 (typically 0.88 - 0.95)
  membraneAreaM2: number;          // total effective membrane active area
  acidCompartmentPh: number;       // pH target for complete CO2 desorption (3.5 - 4.5)
  baseCompartmentPh: number;       // regenerated caustic pH (13.2 - 14.0)
  waterDissociationCatalyst: 'Fe-TiOx' | 'RuO2' | 'Polymer_Hyperbranched';
}

export interface PlantCapacitySpecs {
  annualTargetTonsCo2: number;     // tons CO2/year (e.g. 100,000 tons/year)
  operatingHoursPerYear: number;   // typically 8,000 - 8,400 h/year
  electricityPricePerKwh: number;  // $ / kWh (e.g. 0.035 for dedicated solar/wind)
  capexPerTonYearCapacity: number; // $ / (ton/yr) (e.g. 850 - 1200)
}

export interface EdacOperatingResults {
  hourlyCo2CapturedKg: number;
  dailyCo2CapturedTons: number;
  annualCo2CapturedTons: number;
  thermodynamicMinWorkKwhPerTon: number; // theoretical minimum work for 420 ppm -> 1 bar CO2
  bpmedStackPowerMw: number;
  auxiliaryPowerMw: number;             // air blowers, pumps, CO2 compression to 150 bar
  totalPlantPowerMw: number;
  specificEnergyKwhPerTonCo2: number;   // total kWh/ton CO2
  specificEnergyGjPerTonCo2: number;    // total GJ/ton CO2
  energySavingsVsThermalCalcinationPercent: number; // vs 8.5 GJ/ton for thermal DAC
  co2PurityPercent: number;             // dry basis (> 99.5%)
  waterConsumptionKgPerTonCo2: number;  // net stoichiometric & evaporative
  potassiumSolventRecycleRate: number;  // 100% closed loop (> 99.9%)
  lcodDollarsPerTonCo2: number;         // Levelized Cost of DAC ($/ton)
  avoidedFossilEmissionsTonsYear: number;
}

export interface SequestrationOption {
  id: 'mineral_carbonation' | 'saline_aquifer' | 'synthetic_fuels' | 'concrete_curing';
  name: string;
  vietnameseName: string;
  permanenceYears: number;
  costPerTon: number;
  storageCapacityGt: number;
  description: string;
}

// Physical & Thermodynamic Constants (IUPAC)
export const R_IDEAL_GAS = 8.314462;     // J / (mol · K)
export const FARADAY_CONST = 96485.33;   // C / mol electrons
export const MOLAR_MASS_CO2 = 0.04401;   // kg / mol
export const DENSITY_AIR_25C = 1.184;    // kg / m³ at 25°C, 1 atm
export const THERMAL_DAC_ENERGY_GJ_TON = 8.50; // Reference high-temp thermal calcination (GJ/ton)

export const SEQUESTRATION_PORTFOLIO: SequestrationOption[] = [
  {
    id: 'mineral_carbonation',
    name: 'Basalt In-Situ Mineralization (Carbfix)',
    vietnameseName: 'Khoáng Hóa Tự Nhiên Vào Đá Bazan (Carbfix)',
    permanenceYears: 100000,
    costPerTon: 25,
    storageCapacityGt: 10000,
    description: 'Hòa tan CO₂ vào nước ở 25 bar và bơm vào vỉa đá bazan sâu. Phản ứng địa hóa tạo thành khoáng Canxit (CaCO₃) và Magnesit (MgCO₃) vĩnh cửu trong vòng 2 năm mà không có nguy cơ rò rỉ.'
  },
  {
    id: 'saline_aquifer',
    name: 'Deep Saline Aquifer Geological Storage',
    vietnameseName: 'Lưu Trữ Địa Chất Vỉa Nước Mặn Sâu',
    permanenceYears: 10000,
    costPerTon: 15,
    storageCapacityGt: 5000,
    description: 'Nén CO₂ lên trạng thái siêu tới hạn (>150 bar) và bơm xuống các tầng cát kết chứa nước mặn sâu > 1,500m dưới tầng chắn sét dày kín khít.'
  },
  {
    id: 'synthetic_fuels',
    name: 'Power-to-Liquid e-Kerosene (SAF)',
    vietnameseName: 'Tổng Hợp Nhiên Liệu Hàng Không Bền Vững (SAF)',
    permanenceYears: 1,
    costPerTon: -80, // Revenue offset when sold as premium fuel
    storageCapacityGt: 50,
    description: 'Kết hợp CO₂ thu hồi từ khí quyển với Hydro xanh trong lò tổng hợp Fischer-Tropsch để sản xuất dầu hỏa hàng không e-Kerosene không phát thải ròng.'
  },
  {
    id: 'concrete_curing',
    name: 'Mineralized Concrete Curing',
    vietnameseName: 'Đóng Rắn Bê Tông Bằng Khí CO₂',
    permanenceYears: 1000,
    costPerTon: 20,
    storageCapacityGt: 100,
    description: 'Bơm CO₂ vào hỗn hợp bê tông tươi trong quá trình dưỡng hộ, tạo các tinh thể nano CaCO₃ làm tăng độ bền nén của bê tông thêm 15% và khóa CO₂ vĩnh viễn.'
  }
];

export class ElectrochemicalDacEngine {
  /**
   * Calculate theoretical thermodynamic minimum work for capturing CO2 from ambient air (420 ppm) to 1 bar pure gas.
   * W_min = - R * T * ln(y_CO2) (J/mol)
   */
  public static calculateThermodynamicMinWork(
    ambientPpm: number = 420,
    temperatureK: number = 298.15
  ): { joulesPerMol: number; kwhPerTon: number; gjPerTon: number } {
    const moleFraction = ambientPpm / 1_000_000;
    const joulesPerMol = -R_IDEAL_GAS * temperatureK * Math.log(moleFraction);
    const joulesPerKg = joulesPerMol / MOLAR_MASS_CO2;
    const kwhPerTon = (joulesPerKg * 1000) / 3_600_000;
    const gjPerTon = (joulesPerKg * 1000) / 1_000_000_000;
    return {
      joulesPerMol: Number(joulesPerMol.toFixed(2)),
      kwhPerTon: Number(kwhPerTon.toFixed(2)),
      gjPerTon: Number(gjPerTon.toFixed(3))
    };
  }

  /**
   * Calculate mass balance and absorption kinetics in ambient air contactor.
   */
  public static calculateContactorPerformance(
    airFlowRateM3h: number,
    ambientPpm: number = 420,
    captureEfficiency: number = 0.80
  ): {
    inletCo2KgH: number;
    capturedCo2KgH: number;
    exhaustPpm: number;
    airVolumePerTonCo2M3: number;
  } {
    // Air density ~ 1.184 kg/m³, average molar mass ~ 28.97 g/mol -> moles of air per m³ ~ 40.87 mol/m³
    const molesAirPerM3 = 1000 / 24.465; // mol/m³ at 25°C, 1 atm
    const inletCo2MolH = airFlowRateM3h * molesAirPerM3 * (ambientPpm / 1_000_000);
    const inletCo2KgH = inletCo2MolH * MOLAR_MASS_CO2;
    const capturedCo2KgH = inletCo2KgH * captureEfficiency;
    const exhaustPpm = ambientPpm * (1 - captureEfficiency);
    const airVolumePerTonCo2M3 = (1000 / capturedCo2KgH) * airFlowRateM3h;

    return {
      inletCo2KgH: Number(inletCo2KgH.toFixed(2)),
      capturedCo2KgH: Number(capturedCo2KgH.toFixed(2)),
      exhaustPpm: Number(exhaustPpm.toFixed(1)),
      airVolumePerTonCo2M3: Number(airVolumePerTonCo2M3.toFixed(0))
    };
  }

  /**
   * Calculate Bipolar Membrane Electrodialysis (BPMED) stack performance:
   * Reaction: KHCO3 + H+ (from BPM) -> K+ + H2O + CO2(g)
   * Stoichiometry: 1 mol H+ per mol CO2 released from bicarbonate.
   * If starting from K2CO3: 2 mol H+ per mol CO2 released (carbonate -> bicarbonate -> CO2).
   * In a tuned absorption column, solvent operates at bicarbonate-rich ratio (average 1.2 - 1.4 H+ per CO2).
   */
  public static calculateBpmedStack(
    hourlyCo2Kg: number,
    cellVoltageV: number = 1.35,
    faradaicEfficiency: number = 0.91,
    hPerCo2Ratio: number = 1.25
  ): {
    molarFlowMolS: number;
    totalCurrentAmperes: number;
    stackElectricPowerKw: number;
    stackSpecificEnergyKwhPerTon: number;
    waterDissociatedLitersPerHour: number;
  } {
    const molarFlowMolH = (hourlyCo2Kg / MOLAR_MASS_CO2);
    const molarFlowMolS = molarFlowMolH / 3600;

    // Total required protons per second:
    const protonFlowMolS = molarFlowMolS * hPerCo2Ratio;

    // Faraday's Law: I = (n * F) / (Faradaic_eff)
    const totalCurrentAmperes = (protonFlowMolS * FARADAY_CONST) / faradaicEfficiency;

    // Electrical Power: P = I * V (assuming cells arranged in series or equivalent stack power)
    // For a single equivalent cell carrying total current: P = I * cellVoltage
    const stackElectricPowerW = totalCurrentAmperes * cellVoltageV;
    const stackElectricPowerKw = stackElectricPowerW / 1000;

    // Specific Energy (stack only):
    const stackSpecificEnergyKwhPerTon = (stackElectricPowerKw / (hourlyCo2Kg / 1000));

    // Water consumption in BPM: 1 mol H2O dissociated -> 1 mol H+ + 1 mol OH-
    const waterDissociatedMolH = protonFlowMolS * 3600;
    const waterDissociatedKgH = waterDissociatedMolH * 0.018015;

    return {
      molarFlowMolS: Number(molarFlowMolS.toFixed(3)),
      totalCurrentAmperes: Number(totalCurrentAmperes.toFixed(1)),
      stackElectricPowerKw: Number(stackElectricPowerKw.toFixed(2)),
      stackSpecificEnergyKwhPerTon: Number(stackSpecificEnergyKwhPerTon.toFixed(2)),
      waterDissociatedLitersPerHour: Number(waterDissociatedKgH.toFixed(2))
    };
  }

  /**
   * Complete industrial e-DAC plant simulation and techno-economic sizing.
   */
  public static simulatePlant(
    capacitySpecs: PlantCapacitySpecs,
    airSpecs: Partial<AirContactorSpecs> = {},
    bpmedSpecs: Partial<BpmedStackSpecs> = {}
  ): EdacOperatingResults {
    const ambientPpm = airSpecs.ambientCo2Ppm ?? 420;
    const captureEff = airSpecs.captureEfficiency ?? 0.80;
    const cellVoltage = bpmedSpecs.cellVoltageV ?? 1.35;
    const faradaicEff = bpmedSpecs.faradaicEfficiency ?? 0.91;
    const operatingHours = capacitySpecs.operatingHoursPerYear || 8200;

    const annualTons = capacitySpecs.annualTargetTonsCo2;
    const hourlyCo2CapturedKg = (annualTons * 1000) / operatingHours;
    const dailyCo2CapturedTons = (hourlyCo2CapturedKg * 24) / 1000;

    // Thermodynamic minimum work
    const thermoMin = this.calculateThermodynamicMinWork(ambientPpm);

    // BPMED Stack calculations
    const bpmed = this.calculateBpmedStack(hourlyCo2CapturedKg, cellVoltage, faradaicEff, 1.25);
    const bpmedStackPowerMw = bpmed.stackElectricPowerKw / 1000;

    // Auxiliary Power:
    // 1. Air contactor fans (drafting air across packing): ~ 0.12 MWh/ton
    // 2. Liquid circulating pumps: ~ 0.05 MWh/ton
    // 3. Vacuum stripper / degasser: ~ 0.04 MWh/ton
    // 4. CO2 multi-stage compressor with intercooling to 150 bar: ~ 0.11 MWh/ton
    const auxSpecificKwhPerTon = 320; // 0.32 MWh/ton CO2
    const auxiliaryPowerMw = (hourlyCo2CapturedKg / 1000) * (auxSpecificKwhPerTon / 1000);
    const totalPlantPowerMw = bpmedStackPowerMw + auxiliaryPowerMw;

    const totalKwhPerTon = (totalPlantPowerMw * 1000) / (hourlyCo2CapturedKg / 1000);
    const totalGjPerTon = (totalKwhPerTon * 3.6) / 1000;

    // Energy savings vs high-temperature thermal calcination (8.5 GJ/ton)
    const energySavingsPercent = ((THERMAL_DAC_ENERGY_GJ_TON - totalGjPerTon) / THERMAL_DAC_ENERGY_GJ_TON) * 100;

    // Economic analysis (Levelized Cost of Direct Air Capture - LCOD)
    // CapEx annualized:
    const totalCapex = annualTons * capacitySpecs.capexPerTonYearCapacity;
    const discountRate = 0.08;
    const plantLifetimeYears = 25;
    const crf = (discountRate * Math.pow(1 + discountRate, plantLifetimeYears)) / (Math.pow(1 + discountRate, plantLifetimeYears) - 1);
    const annualizedCapex = totalCapex * crf;
    const capexPerTon = annualizedCapex / annualTons;

    // OpEx components:
    const electricityCostPerTon = totalKwhPerTon * capacitySpecs.electricityPricePerKwh;
    const membraneReplacementPerTon = 18.50; // $/ton (BPM membrane life ~ 5-7 years)
    const oAndMPerTon = 16.00;              // $/ton (labor, chemicals, water)
    const lcod = capexPerTon + electricityCostPerTon + membraneReplacementPerTon + oAndMPerTon;

    // Water consumption (net stoichiometric water dissociated + small contactor evaporation):
    const waterConsumptionKgPerTon = (bpmed.waterDissociatedLitersPerHour / (hourlyCo2CapturedKg / 1000)) + 450; // contactor evaporative balance

    return {
      hourlyCo2CapturedKg: Number(hourlyCo2CapturedKg.toFixed(2)),
      dailyCo2CapturedTons: Number(dailyCo2CapturedTons.toFixed(2)),
      annualCo2CapturedTons: annualTons,
      thermodynamicMinWorkKwhPerTon: thermoMin.kwhPerTon,
      bpmedStackPowerMw: Number(bpmedStackPowerMw.toFixed(3)),
      auxiliaryPowerMw: Number(auxiliaryPowerMw.toFixed(3)),
      totalPlantPowerMw: Number(totalPlantPowerMw.toFixed(3)),
      specificEnergyKwhPerTonCo2: Number(totalKwhPerTon.toFixed(1)),
      specificEnergyGjPerTonCo2: Number(totalGjPerTon.toFixed(2)),
      energySavingsVsThermalCalcinationPercent: Number(energySavingsPercent.toFixed(1)),
      co2PurityPercent: 99.8,
      waterConsumptionKgPerTonCo2: Number(waterConsumptionKgPerTon.toFixed(1)),
      potassiumSolventRecycleRate: 99.95,
      lcodDollarsPerTonCo2: Number(lcod.toFixed(2)),
      avoidedFossilEmissionsTonsYear: Number((annualTons * 0.96).toFixed(0))
    };
  }
}
