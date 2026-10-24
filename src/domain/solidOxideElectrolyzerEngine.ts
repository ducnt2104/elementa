// src/domain/solidOxideElectrolyzerEngine.ts
// Comprehensive Domain Engine: Solid Oxide Electrolyzer Cells (SOEC), High-Temperature H2O/CO2 Co-Electrolysis & Power-to-X Green Syngas
// Standards: IUPAC Electrochemistry, IEA Clean Hydrogen & Power-to-X Protocols, Vietnam GDPT 2018 (Hóa học 10 & 12: Điện phân nhiệt độ cao, Cân bằng hóa học RWGS, Khí than ướt & Tổng hợp Fischer-Tropsch)

export type ElectrolyzerOperatingMode = 'ENDOTHERMIC' | 'THERMONEUTRAL' | 'EXOTHERMIC';
export type FuelFeedType = 'PURE_STEAM_H2O' | 'CO_ELECTROLYSIS_SYNGAS' | 'PURE_CO2_REDUCTION';
export type DownstreamFuelProduct = 'FISCHER_TROPSCH_E_KEROSENE' | 'E_METHANOL' | 'SYNTHETIC_NATURAL_GAS_CH4';

export interface SOECMaterialSpec {
  electrolyte: string;
  fuelCathode: string;
  oxygenAnode: string;
  interlayerBarrier: string;
  operatingTempMinC: number;
  operatingTempMaxC: number;
  ionicConductivitySPerCm: number;
  cokingResistanceScore: number; // 0 - 10
}

export interface SOECCoElectrolysisResult {
  operatingTempC: number;
  pressureBar: number;
  steamFractionPercent: number; // H2O in feed (e.g. 67%)
  co2FractionPercent: number;    // CO2 in feed (e.g. 33%)
  cellVoltageVolts: number;
  currentDensityAcm2: number;
  reversibleVoltageV: number;
  thermoneutralVoltageV: number;
  operatingMode: ElectrolyzerOperatingMode;
  h2ProductionRateNm3PerHour: number;
  coProductionRateNm3PerHour: number;
  o2ProductionRateNm3PerHour: number;
  syngasH2ToCoRatio: number;
  electricalEfficiencyLhvPercent: number;
  heatDemandOrReleaseKwPerNm3: number; // Positive = requires external heat, Negative = generates heat
  downstreamSuitability: string;
  faradaicEfficiencyPercent: number;
}

export interface SOECPolarizationPoint {
  currentDensityAcm2: number;
  cellVoltageVolts: number;
  ohmicOverpotentialVolts: number;
  activationOverpotentialVolts: number;
  concentrationOverpotentialVolts: number;
  powerDensityWcm2: number;
}

// -------------------------------------------------------------------------
// 1. THERMODYNAMIC CONSTANTS & ENTHALPY/GIBBS ENERGY RELATIONS
// -------------------------------------------------------------------------

const FARADAY_F = 96485.3321; // C/mol
const GAS_CONST_R = 8.314462618; // J/(mol*K)
const LITERS_PER_MOL_STP = 22.414; // L/mol at STP

// Calculate temperature-dependent Delta G and Delta H for H2O splitting:
// H2O(g) -> H2 + 0.5 O2
export function calculateWaterThermodynamics(tempCelsius: number): {
  deltaGJoulesPerMol: number;
  deltaHJoulesPerMol: number;
  tDeltaSJoulesPerMol: number;
  reversibleVoltageV: number;
  thermoneutralVoltageV: number;
} {
  const tempK = tempCelsius + 273.15;

  // NIST-JANAF empirical polynomial for H2O(g) steam splitting:
  // Delta H ~ 241,800 + 8.0 * (T - 298.15)
  const deltaHJoulesPerMol = 241800 + 8.0 * (tempK - 298.15);
  // Delta S ~ 44.4 + 7.8 * ln(T / 298.15)
  const deltaSJoulesPerMolK = 44.4 + 7.8 * Math.log(tempK / 298.15);
  const tDeltaSJoulesPerMol = tempK * deltaSJoulesPerMolK;
  const deltaGJoulesPerMol = deltaHJoulesPerMol - tDeltaSJoulesPerMol;

  // E_rev = Delta G / (2 * F)
  const reversibleVoltageV = deltaGJoulesPerMol / (2 * FARADAY_F);
  // V_tn = Delta H / (2 * F)
  const thermoneutralVoltageV = deltaHJoulesPerMol / (2 * FARADAY_F);

  return {
    deltaGJoulesPerMol,
    deltaHJoulesPerMol,
    tDeltaSJoulesPerMol,
    reversibleVoltageV: Number(reversibleVoltageV.toFixed(3)),
    thermoneutralVoltageV: Number(thermoneutralVoltageV.toFixed(3))
  };
}

// -------------------------------------------------------------------------
// 2. SOEC MATERIAL SPECIFICATION
// -------------------------------------------------------------------------

export const SOEC_STANDARD_MATERIALS: SOECMaterialSpec = {
  electrolyte: '8YSZ (8 mol% Y₂O₃-stabilized ZrO₂, màng gốm dẫn ion O²⁻)',
  fuelCathode: 'Ni-YSZ Cermet xốp (Mạng lưới Niken dẫn điện tử & xúc tác khử H₂O/CO₂)',
  oxygenAnode: 'LSCF (La₀.₆Sr₀.₄Co₀.₂Fe₀.₈O₃₋δ, chất dẫn hỗn hợp ion-điện tử MIEC)',
  interlayerBarrier: 'GDC (Gd-doped Ceria, ngăn phản ứng tạo pha SrZrO₃ cách điện)',
  operatingTempMinC: 700,
  operatingTempMaxC: 850,
  ionicConductivitySPerCm: 0.12,
  cokingResistanceScore: 8.5
};

// -------------------------------------------------------------------------
// 3. POLARIZATION CURVE SIMULATION (700°C - 850°C)
// -------------------------------------------------------------------------

export function simulateSOECPolarization(
  operatingTempC: number = 800,
  pressureBar: number = 1.0,
  steamFraction: number = 0.65
): SOECPolarizationPoint[] {
  const thermo = calculateWaterThermodynamics(operatingTempC);
  const tempK = operatingTempC + 273.15;
  const eRev = thermo.reversibleVoltageV;

  // Internal ASR (Area Specific Resistance, Ohm*cm²)
  // ASR decreases exponentially with temperature (Arrhenius relation)
  // At 800°C, typical SOEC ASR ~ 0.22 Ohm*cm²
  const asrOhmCm2 = 0.22 * Math.exp(9500 / tempK - 9500 / (800 + 273.15));

  const points: SOECPolarizationPoint[] = [];
  const maxCurrentDensity = 2.0; // 2.0 A/cm²
  const steps = 25;

  for (let i = 0; i <= steps; i++) {
    const j = (maxCurrentDensity * i) / steps;

    if (j === 0) {
      points.push({
        currentDensityAcm2: 0,
        cellVoltageVolts: eRev,
        ohmicOverpotentialVolts: 0,
        activationOverpotentialVolts: 0,
        concentrationOverpotentialVolts: 0,
        powerDensityWcm2: 0
      });
      continue;
    }

    // 1. Ohmic loss = j * ASR
    const etaOhmic = j * asrOhmCm2;

    // 2. Activation overpotential (Butler-Volmer approximation):
    // eta_act = (2 * R * T / F) * asinh(j / (2 * j0))
    const j0 = 0.55 * Math.exp(6500 / tempK - 6500 / (800 + 273.15));
    const etaAct = (2 * GAS_CONST_R * tempK / FARADAY_F) * Math.asinh(j / (2 * j0));

    // 3. Concentration overpotential:
    // Limiting current j_lim ~ 2.4 A/cm²
    const jLim = 2.4 * Math.sqrt(pressureBar);
    const etaConc = j < jLim ? -(GAS_CONST_R * tempK / (2 * FARADAY_F)) * Math.log(Math.max(0.01, 1 - j / jLim)) : 0.45;

    const cellVoltage = eRev + etaOhmic + etaAct + etaConc;
    const powerDensity = cellVoltage * j;

    points.push({
      currentDensityAcm2: Number(j.toFixed(3)),
      cellVoltageVolts: Number(cellVoltage.toFixed(3)),
      ohmicOverpotentialVolts: Number(etaOhmic.toFixed(3)),
      activationOverpotentialVolts: Number(etaAct.toFixed(3)),
      concentrationOverpotentialVolts: Number(etaConc.toFixed(3)),
      powerDensityWcm2: Number(powerDensity.toFixed(3))
    });
  }

  return points;
}

// -------------------------------------------------------------------------
// 4. CO-ELECTROLYSIS & POWER-TO-X GREEN SYNGAS CALCULATOR
// -------------------------------------------------------------------------

export function simulateSOECCoElectrolysis(
  operatingTempC: number = 800,
  pressureBar: number = 1.0,
  steamFractionPercent: number = 67, // Default 2:1 steam:CO2 for Fischer-Tropsch
  currentDensityAcm2: number = 1.0,
  stackActiveAreaM2: number = 10.0 // 10 m² stack area
): SOECCoElectrolysisResult {
  const co2FractionPercent = 100 - steamFractionPercent;
  const thermo = calculateWaterThermodynamics(operatingTempC);
  const vRev = thermo.reversibleVoltageV;
  const vTn = thermo.thermoneutralVoltageV;

  // Polarization curve point for chosen current density
  const polCurve = simulateSOECPolarization(operatingTempC, pressureBar, steamFractionPercent / 100);
  const matchedPoint = polCurve.reduce((prev, curr) => 
    Math.abs(curr.currentDensityAcm2 - currentDensityAcm2) < Math.abs(prev.currentDensityAcm2 - currentDensityAcm2) ? curr : prev
  );

  const cellVoltage = matchedPoint.cellVoltageVolts;

  // Determine operating thermal mode
  let operatingMode: ElectrolyzerOperatingMode = 'THERMONEUTRAL';
  if (cellVoltage < vTn - 0.02) {
    operatingMode = 'ENDOTHERMIC'; // Absorbs heat from outside (Q > 0)
  } else if (cellVoltage > vTn + 0.02) {
    operatingMode = 'EXOTHERMIC';  // Releases waste Joule heat (Q < 0)
  } else {
    operatingMode = 'THERMONEUTRAL';
  }

  // Faraday's Law for gas production:
  // I = j * Area
  const totalCurrentAmperes = currentDensityAcm2 * (stackActiveAreaM2 * 10000); // 1 m² = 10,000 cm²
  const faradaicEfficiencyPercent = 99.0;
  const molesElectronsPerSec = (totalCurrentAmperes * (faradaicEfficiencyPercent / 100)) / FARADAY_F;

  // Total syngas (H2 + CO) moles produced:
  // H2O + 2e- -> H2 + O2-
  // CO2 + 2e- -> CO + O2-
  // Each mole of H2 or CO takes 2 moles of electrons
  const totalSyngasMolesPerSec = molesElectronsPerSec / 2;

  // Steam to CO2 ratio governs H2 to CO syngas ratio:
  const steamRatio = steamFractionPercent / 100;
  const co2Ratio = co2FractionPercent / 100;

  // Reverse Water Gas Shift (RWGS) equilibrium constant Kp at T:
  // CO2 + H2 <=> CO + H2O
  // At 800°C, Kp ~ 1.0
  const h2MolesPerSec = totalSyngasMolesPerSec * steamRatio;
  const coMolesPerSec = totalSyngasMolesPerSec * co2Ratio;
  const o2MolesPerSec = totalSyngasMolesPerSec / 2;

  // Convert to Nm³/h (1 mol = 22.414 L at STP = 0.022414 Nm³)
  const h2ProductionRateNm3PerHour = h2MolesPerSec * LITERS_PER_MOL_STP * 3600 / 1000;
  const coProductionRateNm3PerHour = coMolesPerSec * LITERS_PER_MOL_STP * 3600 / 1000;
  const o2ProductionRateNm3PerHour = o2MolesPerSec * LITERS_PER_MOL_STP * 3600 / 1000;

  const syngasH2ToCoRatio = coMolesPerSec > 0 ? Number((h2MolesPerSec / coMolesPerSec).toFixed(2)) : 999;

  // Electrical efficiency based on LHV:
  // LHV of H2 = 10.79 MJ/Nm³ = 2.997 kWh/Nm³
  // LHV of CO = 12.63 MJ/Nm³ = 3.508 kWh/Nm³
  const syngasEnergyOutputKw = (h2ProductionRateNm3PerHour * 2.997) + (coProductionRateNm3PerHour * 3.508);
  const electricalInputPowerKw = (cellVoltage * totalCurrentAmperes) / 1000;
  const electricalEfficiencyLhvPercent = Number(((syngasEnergyOutputKw / electricalInputPowerKw) * 100).toFixed(1));

  // Heat balance: Q = (V_tn - V_cell) * I
  const heatKw = ((vTn - cellVoltage) * totalCurrentAmperes) / 1000;
  const totalSyngasNm3H = h2ProductionRateNm3PerHour + coProductionRateNm3PerHour;
  const heatDemandOrReleaseKwPerNm3 = totalSyngasNm3H > 0 ? Number((heatKw / totalSyngasNm3H).toFixed(2)) : 0;

  // Suitability for downstream Power-to-X processes:
  let downstreamSuitability = '';
  if (Math.abs(syngasH2ToCoRatio - 2.05) <= 0.25) {
    downstreamSuitability = 'Tối ưu lý tưởng cho tổng hợp e-Kerosene hàng không (Fischer-Tropsch: H₂/CO = 2.0 - 2.1) & e-Methanol';
  } else if (syngasH2ToCoRatio > 2.5) {
    downstreamSuitability = 'Tỷ lệ giàu Hydro thích hợp cho tổng hợp Khí thiên nhiên nhân tạo (SNG / Methane: CO + 3H₂ ➔ CH₄ + H₂O)';
  } else {
    downstreamSuitability = 'Tỷ lệ giàu Cacbon Monoxide thích hợp cho sản xuất hóa chất hữu cơ cơ bản (Axit Axetic & Polycarbonate)';
  }

  return {
    operatingTempC,
    pressureBar,
    steamFractionPercent,
    co2FractionPercent,
    cellVoltageVolts: Number(cellVoltage.toFixed(3)),
    currentDensityAcm2,
    reversibleVoltageV: vRev,
    thermoneutralVoltageV: vTn,
    operatingMode,
    h2ProductionRateNm3PerHour: Number(h2ProductionRateNm3PerHour.toFixed(2)),
    coProductionRateNm3PerHour: Number(coProductionRateNm3PerHour.toFixed(2)),
    o2ProductionRateNm3PerHour: Number(o2ProductionRateNm3PerHour.toFixed(2)),
    syngasH2ToCoRatio,
    electricalEfficiencyLhvPercent,
    heatDemandOrReleaseKwPerNm3,
    downstreamSuitability,
    faradaicEfficiencyPercent
  };
}
