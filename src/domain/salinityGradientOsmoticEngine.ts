/**
 * ELEMENTA - SALINITY GRADIENT ENERGY & OSMOTIC POWER (BLUE ENERGY) ENGINE
 *
 * Conforms to:
 * - IUPAC Physical Chemistry & Van 't Hoff Osmotic Pressure Thermodynamics
 * - International Energy Agency Ocean Energy Systems (IEA-OES) Blue Energy Benchmarks
 * - Pressure Retarded Osmosis (PRO) & Reverse Electrodialysis (RED) Membrane Architectures
 * - Vietnam GDPT 2018 Chemistry Grade 11 & 12 (Dung dịch điện li, Áp suất thẩm thấu Van 't Hoff, Năng lượng Gibbs hòa trộn & Pin điện hóa ion)
 */

export type OsmoticTechnologyType = 'PRESSURE_RETARDED_OSMOSIS' | 'REVERSE_ELECTRODIALYSIS';

export interface SalinityWaterSource {
  name: string;
  salinityGramsPerLiter: number; // TDS in g/L
  naclConcentrationMolar: number; // Molarity of NaCl (mol/L)
  osmoticPressureBar: number;     // Van 't Hoff osmotic pressure at 25°C
  description: string;
}

export interface OsmoticOperatingConditions {
  riverWaterFlowRateM3s: number;    // River / fresh water intake in m³/s (e.g. 10 m³/s)
  seawaterFlowRateM3s: number;      // Seawater / brine intake in m³/s (typically 2 - 3x river water)
  operatingTempC: number;           // Water temperature (typically 15 - 30°C)
  membraneAreaM2: number;           // Total membrane active area (e.g. 500,000 m²)
  proHydraulicPressureBar?: number; // Applied pressure in PRO draw channel (optimal ~ Delta Pi / 2)
  internalConcentrationPolarizationS: number; // S-parameter of membrane support in µm (typically 200 - 800 µm)
  membraneWaterPermeabilityA: number; // A-value in L / (m² h bar) (typically 1.5 - 4.5)
  membraneSaltPermeabilityB: number;  // B-value in L / (m² h) (typically 0.1 - 0.5)
}

export interface OsmoticKineticsResult {
  technology: OsmoticTechnologyType;
  techName: string;
  feedSource: SalinityWaterSource;
  drawSource: SalinityWaterSource;
  osmoticPressureDifferenceBar: number;
  equivalentHydrostaticHeadMeters: number; // Equivalent height of waterfall in meters (h = DeltaPi / (rho * g))
  gibbsFreeEnergyOfMixingMjM3: number;     // Theoretical maximum work per m³ of river water
  waterFluxLmH: number;                    // Water flux J_w in L / (m² h)
  powerDensityWPerM2: number;              // Net membrane power density in W/m² (commercial target > 5 W/m²)
  grossPowerOutputMw: number;
  parasiticPumpingPowerMw: number;
  netPowerExportMw: number;
  annualElectricityGenerationGwh: number;
  levelizedCostOfElectricityUsdMwh: number;
  environmentalBenefits: {
    co2EmissionsPerMwhKg: number;          // Exactly 0.0 kg/MWh (100% clean baseload blue energy)
    capacityFactorPct: number;             // 90% - 95% continuous baseload (unlike solar/wind, river flows 24/7)
  };
}

export const WATER_SALINITY_PROFILES: SalinityWaterSource[] = [
  {
    name: 'Nước Sông / Nước Ngọt Tự Nhiên (River Fresh Water)',
    salinityGramsPerLiter: 0.5,
    naclConcentrationMolar: 0.0085,
    osmoticPressureBar: 0.42,
    description: 'Nước ngọt từ cửa sông (Mê Kông, Sông Hồng) chứa ít muối khoáng hòa tan.'
  },
  {
    name: 'Nước Biển Tiêu Chuẩn (Standard Seawater 3.5%)',
    salinityGramsPerLiter: 35.0,
    naclConcentrationMolar: 0.55,
    osmoticPressureBar: 27.2,
    description: 'Nước biển đại dương trung bình chứa 35 g/L muối (chủ yếu là NaCl, MgCl2, Na2SO4).'
  },
  {
    name: 'Nước Xả Thải Nhà Máy Khử Mặn RO (Desalination SWRO Brine 7.0%)',
    salinityGramsPerLiter: 70.0,
    naclConcentrationMolar: 1.15,
    osmoticPressureBar: 56.8,
    description: 'Nước cô đặc từ nhà máy lọc nước biển RO có độ mặn gấp đôi, lý tưởng để thu hồi năng lượng.'
  },
  {
    name: 'Nước Muối Siêu Mặn Biển Chết (Dead Sea Hypersaline Brine)',
    salinityGramsPerLiter: 280.0,
    naclConcentrationMolar: 4.80,
    osmoticPressureBar: 245.0,
    description: 'Nước muối bão hòa có áp suất thẩm thấu lên tới 245 bar (tương đương cột nước cao 2,450 mét!).'
  }
];

const R_GAS = 8.314462618; // J / (mol K)
const RHO_WATER = 1000;    // kg / m³
const G_GRAVITY = 9.80665; // m / s²

/**
 * Calculates Van 't Hoff theoretical osmotic pressure:
 * Pi = i * C * R * T
 * where i = 2 for NaCl dissociating into Na⁺ and Cl⁻.
 */
export function calculateVanTHoffOsmoticPressure(
  naclMolarity: number,
  tempC: number
): number {
  const T_kelvin = tempC + 273.15;
  const i_factor = 1.92; // Slight non-ideality osmotic coefficient at moderate salinity
  // Pi in Pascal = i * C (mol/m³ = mol/L * 1000) * R * T
  const pressurePa = i_factor * (naclMolarity * 1000) * R_GAS * T_kelvin;
  const pressureBar = pressurePa / 1e5;
  return parseFloat(pressureBar.toFixed(2));
}

/**
 * Calculates theoretical Gibbs free energy of mixing per m³ of river water.
 * Delta G_mix = - T * Delta S_mix
 */
export function calculateGibbsMixingEnergy(
  riverMolarity: number,
  seawaterMolarity: number,
  tempC: number = 25
): { gibbsMjM3: number; equivalentHeadMeters: number } {
  const T = tempC + 273.15;
  // Rigorous mixing energy per m³ of freshwater when mixed with abundant seawater:
  // Delta G_mix ~ 2 * R * T * C_river * ln(C_seawater / C_river) + ...
  // For standard seawater (0.55M) and river (0.01M), Delta G_mix is ~2.2 - 2.8 MJ / m³ of fresh water
  const deltaPiBar = calculateVanTHoffOsmoticPressure(seawaterMolarity - riverMolarity, tempC);
  const deltaPiPa = deltaPiBar * 1e5;

  // Potential energy: Delta G = Delta Pi * Volume (J / m³)
  const gibbsJoulesM3 = deltaPiPa;
  const gibbsMjM3 = parseFloat((gibbsJoulesM3 / 1e6).toFixed(2));

  // Hydrostatic equivalent head: h = Delta P / (rho * g)
  const headMeters = parseFloat((deltaPiPa / (RHO_WATER * G_GRAVITY)).toFixed(1));

  return { gibbsMjM3, equivalentHeadMeters: headMeters };
}

/**
 * Simulates Pressure Retarded Osmosis (PRO) and Reverse Electrodialysis (RED) power systems.
 */
export function simulateOsmoticPowerPlant(
  tech: OsmoticTechnologyType,
  feedSource: SalinityWaterSource,
  drawSource: SalinityWaterSource,
  conditions: OsmoticOperatingConditions
): OsmoticKineticsResult {
  const {
    riverWaterFlowRateM3s,
    seawaterFlowRateM3s,
    operatingTempC,
    membraneAreaM2,
    proHydraulicPressureBar,
    internalConcentrationPolarizationS = 400, // µm
    membraneWaterPermeabilityA = 2.8,         // L / (m² h bar)
    membraneSaltPermeabilityB = 0.25          // L / (m² h)
  } = conditions;

  const deltaPiBar = Math.max(
    0.1,
    drawSource.osmoticPressureBar - feedSource.osmoticPressureBar
  );
  const { gibbsMjM3, equivalentHeadMeters } = calculateGibbsMixingEnergy(
    feedSource.naclConcentrationMolar,
    drawSource.naclConcentrationMolar,
    operatingTempC
  );

  let waterFluxLmH = 0;
  let powerDensityWPerM2 = 0;
  let optimalHydraulicPressureBar = deltaPiBar / 2;

  if (tech === 'PRESSURE_RETARDED_OSMOSIS') {
    // PRO power density: W = J_w * Delta P
    // Internal Concentration Polarization (ICP) factor suppresses effective driving force:
    // ICP factor = exp(-J_w * S / D) ~ 0.55 - 0.75 in commercial hollow fiber or flat sheet membranes
    const icpDampingFactor = Math.max(0.40, Math.min(0.85, 1 - (internalConcentrationPolarizationS / 1200)));
    optimalHydraulicPressureBar = proHydraulicPressureBar !== undefined && proHydraulicPressureBar > 0
      ? proHydraulicPressureBar
      : parseFloat((deltaPiBar * 0.48).toFixed(1));

    const effectiveDrivingForceBar = Math.max(
      0.0,
      deltaPiBar * icpDampingFactor - optimalHydraulicPressureBar
    );

    // Water flux in L / (m² h)
    waterFluxLmH = parseFloat(
      (membraneWaterPermeabilityA * effectiveDrivingForceBar).toFixed(2)
    );

    // Power density W/m² = J_w (m/s) * Delta P (Pa)
    // J_w (m/s) = (waterFluxLmH / 1000) / 3600
    // Delta P (Pa) = optimalHydraulicPressureBar * 1e5
    const fluxMS = (waterFluxLmH / 1000) / 3600;
    const deltaPPa = optimalHydraulicPressureBar * 1e5;
    powerDensityWPerM2 = parseFloat((fluxMS * deltaPPa).toFixed(2));
  } else {
    // REVERSE ELECTRODIALYSIS (RED)
    // Nernst potential per cell pair: E_cell = 2 * (alpha * R * T / F) * ln(a_seawater / a_river)
    // Power density governed by stack internal area resistance R_stack (~ 1.5 - 2.5 Ohm * m²)
    // Optimal RED power density reaches 2.5 - 4.5 W/m²
    optimalHydraulicPressureBar = 0.0; // Pure electrical potential, zero hydraulic pressure required!
    waterFluxLmH = 1.2; // Minor osmotic water leakage
    powerDensityWPerM2 = parseFloat(
      (2.8 * Math.log(Math.max(1.5, drawSource.naclConcentrationMolar / Math.max(0.005, feedSource.naclConcentrationMolar))) / Math.log(65)).toFixed(2)
    );
  }

  // Gross power generated across total membrane area
  const grossPowerWatts = membraneAreaM2 * powerDensityWPerM2;
  const grossPowerOutputMw = parseFloat((grossPowerWatts / 1e6).toFixed(3));

  // Parasitic pumping power: pumping river water + seawater through spacers and channels
  // Typically 15% - 25% of gross power in well-designed low-pressure-drop modules
  const parasiticPumpingPowerMw = parseFloat((grossPowerOutputMw * 0.18).toFixed(3));
  const netPowerExportMw = parseFloat(
    Math.max(0, grossPowerOutputMw - parasiticPumpingPowerMw).toFixed(3)
  );

  // Annual electricity output with 92% capacity factor (baseload river flow):
  const annualElectricityGenerationGwh = parseFloat(
    ((netPowerExportMw * 8760 * 0.92) / 1000).toFixed(2)
  );

  // Levelized Cost of Electricity (LCOE):
  // Membrane CAPEX amortization (~$35/m² membrane cost with 7-year life) + Opex
  // Modern PRO/RED estimates: ~$65 - $110 / MWh
  const levelizedCostOfElectricityUsdMwh = parseFloat(
    (65 + 120 / Math.max(1.0, powerDensityWPerM2)).toFixed(1)
  );

  return {
    technology: tech,
    techName:
      tech === 'PRESSURE_RETARDED_OSMOSIS'
        ? 'Thẩm Thấu Chậm Áp Suất (Pressure Retarded Osmosis - PRO)'
        : 'Điện Phân Thẩm Thấu Ngược (Reverse Electrodialysis - RED)',
    feedSource,
    drawSource,
    osmoticPressureDifferenceBar: deltaPiBar,
    equivalentHydrostaticHeadMeters: equivalentHeadMeters,
    gibbsFreeEnergyOfMixingMjM3: gibbsMjM3,
    waterFluxLmH,
    powerDensityWPerM2,
    grossPowerOutputMw,
    parasiticPumpingPowerMw,
    netPowerExportMw,
    annualElectricityGenerationGwh,
    levelizedCostOfElectricityUsdMwh,
    environmentalBenefits: {
      co2EmissionsPerMwhKg: 0.0,
      capacityFactorPct: 92
    }
  };
}
