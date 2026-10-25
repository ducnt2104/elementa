// src/domain/protonSolidOxideElectrolyzerEngine.ts
// Proton-Conducting Solid Oxide Electrolysis Cells (P-SOEC / PCEL) Co-Electrolysis Engine
// Standards: IUPAC Electrochemistry, Kröger-Vink Defect Hydration, Power-to-X Benchmarks & Vietnam GDPT 2018 (Hóa 10 & 12: Điện phân, Nhiệt động học & Năng lượng tái tạo)

export type PsoecElectrolyteType = 'BZCYYB_PEROVSKITE' | 'BZY20_YTTRIUM' | 'BCZY_CERIUM';

export interface PsoecElectrolyteSpec {
  id: PsoecElectrolyteType;
  nameVi: string;
  chemicalFormula: string;
  nominalOperatingTemperatureC: number; // 450 to 650 °C
  protonConductivitySPerCm: number; // S/cm at T_nom
  activationEnergyEv: number;
  hydrationEnthalpyKjPerMol: number; // Delta H_hydration (typically -75 to -90 kJ/mol)
  hydrationEntropyJPerMolK: number;
  areaSpecificResistanceOhmCm2: number; // ASR at standard 15 micron thin film
  degradationRatePercentPer1000Hours: number;
  primaryAdvantagesVi: string;
}

export interface PsoecOperatingConditions {
  electrolyte: PsoecElectrolyteType;
  temperatureC: number; // 450 to 650 °C
  currentDensityA: number; // 0.2 to 2.5 A/cm2 (200 to 2,500 mA/cm2)
  steamPartialPressureBar: number; // 0.1 to 1.5 bar (Anode feed)
  co2CathodeFeedRatio: number; // 0.0 to 1.0 (CO2 fraction in cathode feed for co-electrolysis)
  operatingPressureBar: number; // 1 to 25 bar
  cellActiveAreaCm2: number; // e.g. 100 to 1,000 cm2
  targetSyngasH2ToCoRatio: number; // e.g. 2.0 (ideal for Fischer-Tropsch or Methanol synthesis)
}

export interface PsoecElectrochemicalResult {
  thermodynamicNernstReversiblePotentialV: number;
  thermoneutralVoltageV: number; // V_tn (~1.28 V to 1.30 V)
  operatingCellElectrolysisVoltageV: number;
  electricalPowerDensityWPerCm2: number;
  thermalMode: 'ENDOTHERMIC_REQUIRES_HEAT' | 'THERMONEUTRAL' | 'EXOTHERMIC_SELF_COOLING';
  overpotentials: {
    ohmicV: number;
    anodeOerV: number; // Oxygen Evolution Reaction on BGLC / PBSCF
    cathodeHerAndRwgsV: number; // Cathode pure dry syngas generation
    concentrationV: number;
    totalV: number;
  };
  protonHydrationMetrics: {
    protonConcentrationMolPerCm3: number; // [OH_O^.] defect concentration
    hydrationExtentPercent: number; // fraction of oxygen vacancies hydrated
    dryCathodeSyngasPurityPercent: number; // 100% dry, un-diluted with steam!
  };
  faradaicEfficiencies: {
    h2ProductionPercent: number;
    coProductionPercent: number;
    totalFaradaicPercent: number;
  };
}

export interface PsoecPowerToXPlantResult {
  plantElectricalPowerMw: number;
  operatingTemperatureC: number;
  stackCellCount: number;
  totalActiveAreaM2: number;
  h2ProductionKgPerHour: number;
  coProductionKgPerHour: number;
  syngasVolumeNm3PerHour: number;
  actualSyngasH2ToCoRatio: number;
  downstreamProductVi: string; // e.g. E-Methanol (CH3OH) or Sustainable Aviation Fuel (SAF)
  downstreamProductMetricTonsPerDay: number;
  annualCo2UtilizedTons: number;
  powerToSyngasLhvEfficiencyPercent: number;
  avoidedFossilCo2TonsPerYear: number;
}

// 1. Catalog of Proton-Conducting Perovskite Electrolytes
export const PSOEC_ELECTROLYTE_CATALOG: Record<PsoecElectrolyteType, PsoecElectrolyteSpec> = {
  BZCYYB_PEROVSKITE: {
    id: 'BZCYYB_PEROVSKITE',
    nameVi: 'Perovskite BaCe₀.₇Zr₀.₁Y₀.₁Yb₀.₁O₃₋δ (BZCYYb Đa Nguyên Tố)',
    chemicalFormula: 'BaCe0.7Zr0.1Y0.1Yb0.1O3-δ',
    nominalOperatingTemperatureC: 550,
    protonConductivitySPerCm: 0.028,
    activationEnergyEv: 0.44,
    hydrationEnthalpyKjPerMol: -82.5,
    hydrationEntropyJPerMolK: -88.0,
    areaSpecificResistanceOhmCm2: 0.054, // 15 µm thin film
    degradationRatePercentPer1000Hours: 0.12,
    primaryAdvantagesVi: 'Dung hòa hoàn hảo giữa độ dẫn proton siêu cao của Ce và độ bền hóa học trong CO₂/H₂O của Zr; đồng pha tạp Y-Yb tối ưu hóa hốc oxy tạo nồng độ proton cao nhất.'
  },
  BZY20_YTTRIUM: {
    id: 'BZY20_YTTRIUM',
    nameVi: 'Perovskite BaZr₀.₈Y₀.₂O₃₋δ (BZY20 Siêu Bền Hóa Học)',
    chemicalFormula: 'BaZr0.8Y0.2O3-δ',
    nominalOperatingTemperatureC: 600,
    protonConductivitySPerCm: 0.016,
    activationEnergyEv: 0.48,
    hydrationEnthalpyKjPerMol: -88.0,
    hydrationEntropyJPerMolK: -92.0,
    areaSpecificResistanceOhmCm2: 0.094,
    degradationRatePercentPer1000Hours: 0.08,
    primaryAdvantagesVi: 'Bền vững tuyệt đối trong môi trường khí CO₂ áp suất cao (không tạo muối BaCO₃ gây phân rã màng); thích hợp cho đồng điện phân CO₂-H₂O thương mại dài hạn.'
  },
  BCZY_CERIUM: {
    id: 'BCZY_CERIUM',
    nameVi: 'Perovskite BaCe₀.₆Zr₀.₂Y₀.₂O₃₋δ (BCZY Nhiệt Độ Trung Bình)',
    chemicalFormula: 'BaCe0.6Zr0.2Y0.2O3-δ',
    nominalOperatingTemperatureC: 500,
    protonConductivitySPerCm: 0.022,
    activationEnergyEv: 0.42,
    hydrationEnthalpyKjPerMol: -79.0,
    hydrationEntropyJPerMolK: -85.0,
    areaSpecificResistanceOhmCm2: 0.068,
    degradationRatePercentPer1000Hours: 0.18,
    primaryAdvantagesVi: 'Cho phép vận hành ở nhiệt độ cực êm (450°C - 500°C), triệt tiêu hoàn toàn hiện tượng bay hơi crom từ các tấm phân cực kim loại interconnect.'
  }
};

export class ProtonSolidOxideElectrolyzerEngine {
  private static readonly R = 8.31446; // J/(mol*K)
  private static readonly F = 96485.33; // C/mol

  /**
   * Tính toán nhiệt động học Nernst, cơ chế hydrat hóa Kröger-Vink và điện thế tế bào điện phân
   */
  public static calculateElectrochemicalPerformance(
    conditions: PsoecOperatingConditions
  ): PsoecElectrochemicalResult {
    const spec = PSOEC_ELECTROLYTE_CATALOG[conditions.electrolyte];
    const tk = conditions.temperatureC + 273.15;
    const jA = conditions.currentDensityA; // A/cm2

    // 1. Kröger-Vink Defect Hydration Equilibrium:
    // H2O(g) + O_O^x + V_O^.. <=> 2 OH_O^.
    // K_hyd(T) = exp(-Delta H_hyd / (R*T) + Delta S_hyd / R)
    const deltaH = spec.hydrationEnthalpyKjPerMol * 1000; // J/mol
    const deltaS = spec.hydrationEntropyJPerMolK; // J/(mol*K)
    const kHyd = Math.exp(-deltaH / (this.R * tk) + deltaS / this.R);

    // Exact Kröger-Vink defect quadratic solution for hydration fraction theta = [OH_O^.] / x:
    // theta^2 + K*p*theta - K*p = 0 => theta = (-Kp + sqrt((Kp)^2 + 4*Kp)) / 2
    const pWater = Math.max(0.05, conditions.steamPartialPressureBar);
    const kp = kHyd * pWater;
    const thetaHydration = (-kp + Math.sqrt(Math.pow(kp, 2) + 4 * kp)) / 2;
    const hydrationExtentPercent = Number((Math.min(0.96, Math.max(0.10, thetaHydration)) * 100).toFixed(1));
    const protonConcentrationMolPerCm3 = Number(((hydrationExtentPercent / 100) * 0.0042).toFixed(5));

    // 2. Thermodynamic Reversible Potential E_rev(T, P):
    // Gaseous Steam splitting: H2O(g) -> H2(g) + 0.5 O2(g)
    // Delta H_steam(298K) = 241.8 kJ/mol (LHV, water already vaporized)
    // Delta H_steam(T) ~ 241800 + 11.2 * (tk - 298.15) (J/mol)
    const deltaH0 = 241800 + 11.2 * (tk - 298.15); // J/mol
    const deltaG0 = 246500 - 54.8 * tk; // J/mol
    const e0Rev = deltaG0 / (2 * this.F); // V (~1.05 V at 550°C)
    const vThermoneutral = Number((deltaH0 / (2 * this.F)).toFixed(4)); // V_tn (~1.28 V)

    // Nernst Correction for P_H2O, P_O2, P_H2, P_CO2
    const nernstPressureTerm = (this.R * tk / (2 * this.F)) * Math.log(
      Math.pow(conditions.operatingPressureBar, 0.5) / Math.max(0.1, pWater)
    );
    const thermodynamicNernstReversiblePotentialV = Number((e0Rev + nernstPressureTerm).toFixed(4));

    // 3. Overpotential Deconstruction:
    // A. Ohmic Overpotential: Thin film perovskite proton electrolyte ASR (15 µm)
    // sigma_H+(T) = (A / T) * exp(-E_a / (R*T))
    const sigmaActual = spec.protonConductivitySPerCm * Math.exp(-spec.activationEnergyEv * 1.602e-19 / (1.38e-23 * tk) + spec.activationEnergyEv * 1.602e-19 / (1.38e-23 * (spec.nominalOperatingTemperatureC + 273.15)));
    const thinFilmThicknessCm = 15e-4; // 15 microns
    const ohmicAsr = thinFilmThicknessCm / sigmaActual + 0.045; // Ohm*cm2 (including interconnects)
    const etaOhmic = Number((jA * ohmicAsr).toFixed(4));

    // B. Anode OER (Oxygen Evolution Reaction): H2O -> 2H+ + 0.5 O2 + 2e-
    // High-activity perovskite air electrode (BGLC / PBSCF): j0_ref ~ 0.22 A/cm2 at 550°C (823 K)
    const tRefK = 550 + 273.15;
    const j0Oer = 0.22 * Math.exp((-35000 / this.R) * (1 / tk - 1 / tRefK));
    const etaAnodeOer = Number(((this.R * tk / (0.75 * this.F)) * Math.asinh(jA / (2 * j0Oer))).toFixed(4));

    // C. Cathode Co-Electrolysis / Hydrogenation: 2H+ + 2e- -> H2 & CO2 + 2H+ + 2e- -> CO + H2O
    // Ni-BZCYYb cermet cathode: j0_ref ~ 0.32 A/cm2 at 550°C
    const j0Cat = 0.32 * Math.exp((-32000 / this.R) * (1 / tk - 1 / tRefK));
    const etaCathode = Number(((this.R * tk / (0.65 * this.F)) * Math.asinh(jA / (2 * j0Cat))).toFixed(4));

    // D. Concentration Overpotential:
    const jLim = 3.2 * (pWater / 1.0); // A/cm2
    const safeJLim = Math.max(jA * 1.08, jLim);
    const etaConcentration = Number(((this.R * tk / (2 * this.F)) * Math.log(safeJLim / (safeJLim - jA))).toFixed(4));

    const totalOverpotential = etaOhmic + etaAnodeOer + etaCathode + etaConcentration;
    const operatingCellElectrolysisVoltageV = Number((thermodynamicNernstReversiblePotentialV + totalOverpotential).toFixed(4));
    const electricalPowerDensityWPerCm2 = Number((operatingCellElectrolysisVoltageV * jA).toFixed(3));

    // Thermal Operating Mode:
    // If V_cell < V_tn => Endothermic (absorbs waste heat, delta Q > 0)
    // If V_cell == V_tn => Thermoneutral (zero heat exchange)
    // If V_cell > V_tn => Exothermic (Joule heating dominates)
    let thermalMode: 'ENDOTHERMIC_REQUIRES_HEAT' | 'THERMONEUTRAL' | 'EXOTHERMIC_SELF_COOLING' = 'EXOTHERMIC_SELF_COOLING';
    if (operatingCellElectrolysisVoltageV < vThermoneutral - 0.015) {
      thermalMode = 'ENDOTHERMIC_REQUIRES_HEAT';
    } else if (Math.abs(operatingCellElectrolysisVoltageV - vThermoneutral) <= 0.015) {
      thermalMode = 'THERMONEUTRAL';
    }

    // 4. Faradaic Syngas Ratio & Pure Dry Cathode Output:
    // IN P-SOEC, steam is fed ONLY to the Anode.
    // Cathode receives dry CO2 and generates dry CO and H2!
    // Dry cathode syngas purity = 100% (No unconverted steam contamination!)
    const dryCathodeSyngasPurityPercent = 100.0;

    // Co-electrolysis partition:
    // Controlled by cathode CO2 feed ratio and thermodynamic RWGS
    const co2Ratio = conditions.co2CathodeFeedRatio;
    const coFaradaicPct = Number((co2Ratio * 0.42 * 100).toFixed(1));
    const h2FaradaicPct = Number((98.5 - coFaradaicPct).toFixed(1));

    return {
      thermodynamicNernstReversiblePotentialV,
      thermoneutralVoltageV: vThermoneutral,
      operatingCellElectrolysisVoltageV,
      electricalPowerDensityWPerCm2,
      thermalMode,
      overpotentials: {
        ohmicV: etaOhmic,
        anodeOerV: etaAnodeOer,
        cathodeHerAndRwgsV: etaCathode,
        concentrationV: etaConcentration,
        totalV: Number(totalOverpotential.toFixed(4))
      },
      protonHydrationMetrics: {
        protonConcentrationMolPerCm3,
        hydrationExtentPercent,
        dryCathodeSyngasPurityPercent
      },
      faradaicEfficiencies: {
        h2ProductionPercent: h2FaradaicPct,
        coProductionPercent: coFaradaicPct,
        totalFaradaicPercent: 98.5
      }
    };
  }

  /**
   * Thiết kế nhà máy Power-to-Syngas / E-Fuel quy mô công nghiệp (1 - 50 MW)
   */
  public static designPowerToSyngasPlant(
    plantElectricalPowerMw: number,
    conditions: PsoecOperatingConditions
  ): PsoecPowerToXPlantResult {
    const electroResult = this.calculateElectrochemicalPerformance(conditions);
    const vCell = electroResult.operatingCellElectrolysisVoltageV;
    const jA = conditions.currentDensityA;
    const powerDensityW = electroResult.electricalPowerDensityWPerCm2; // W/cm2

    // Total active area required: Area = Power / PowerDensity
    const totalActiveAreaCm2 = (plantElectricalPowerMw * 1e6) / powerDensityW;
    const totalActiveAreaM2 = Number((totalActiveAreaCm2 * 1e-4).toFixed(1));

    // Standard industrial stack: 100 cells @ 550 cm2 = 5.5 m2 per stack (~50 kWe)
    const cellAreaCm2 = 550;
    const totalCellCount = Math.ceil(totalActiveAreaCm2 / cellAreaCm2);

    // Total Electrolysis Current:
    const totalCurrentA = (plantElectricalPowerMw * 1e6) / vCell;

    // Hydrogen & CO Production Rates (Faraday's Law):
    // n_dot_H2 = (I * eta_H2) / (2 * F) mol/s
    // n_dot_CO = (I * eta_CO) / (2 * F) mol/s
    const etaH2 = electroResult.faradaicEfficiencies.h2ProductionPercent / 100;
    const etaCO = electroResult.faradaicEfficiencies.coProductionPercent / 100;

    const nDotH2MolPerS = (totalCurrentA * etaH2) / (2 * this.F);
    const nDotCOMolPerS = (totalCurrentA * etaCO) / (2 * this.F);

    const h2ProductionKgPerHour = Number((nDotH2MolPerS * 2.016e-3 * 3600).toFixed(1));
    const coProductionKgPerHour = Number((nDotCOMolPerS * 28.01e-3 * 3600).toFixed(1));

    // Normal cubic meters per hour: 1 mol = 0.022414 Nm3
    const syngasVolumeNm3PerHour = Number(((nDotH2MolPerS + nDotCOMolPerS) * 0.022414 * 3600).toFixed(1));
    const actualSyngasH2ToCoRatio = Number((nDotH2MolPerS / Math.max(1e-4, nDotCOMolPerS)).toFixed(2));

    // Downstream E-Fuel Conversion (Methanol CH3OH or SAF):
    // CO + 2 H2 -> CH3OH (M = 32.04 g/mol)
    // Or CO2 + 3 H2 -> CH3OH + H2O
    let downstreamProductVi = 'Khí Tổng Hợp Syngas Khô Sạch (H₂ + CO)';
    let downstreamProductMetricTonsPerDay = 0;
    if (actualSyngasH2ToCoRatio >= 1.8 && actualSyngasH2ToCoRatio <= 2.2) {
      downstreamProductVi = 'E-Methanol Tinh Khiết (CH₃OH Nhiên Liệu Xanh)';
      const methanolMolPerS = Math.min(nDotCOMolPerS, nDotH2MolPerS / 2);
      downstreamProductMetricTonsPerDay = Number(((methanolMolPerS * 32.04e-3 * 86400) / 1000).toFixed(1));
    } else if (actualSyngasH2ToCoRatio > 2.2) {
      downstreamProductVi = 'Hydro Xanh Tinh Khiết & Syngas Tách Nước';
      downstreamProductMetricTonsPerDay = Number(((h2ProductionKgPerHour * 24) / 1000).toFixed(1));
    }

    // Annual CO2 utilized (tons/year):
    // M_CO2 = nDotCO * 44.01 g/mol * 8000 operating hours
    const annualCo2UtilizedTons = Number(((nDotCOMolPerS * 44.01e-3 * 3600 * 8000) / 1000).toFixed(1));

    // Power-to-Syngas LHV Efficiency:
    // LHV_H2 = 120 MJ/kg = 33.33 kWh/kg, LHV_CO = 10.1 MJ/kg = 2.81 kWh/kg
    const syngasEnergyOutputMwh = (h2ProductionKgPerHour * 33.33 + coProductionKgPerHour * 2.81) / 1000;
    const powerToSyngasLhvEfficiencyPercent = Number(((syngasEnergyOutputMwh / plantElectricalPowerMw) * 100).toFixed(1));

    // Displaced fossil emissions:
    const avoidedFossilCo2TonsPerYear = Number((annualCo2UtilizedTons * 1.45 + (plantElectricalPowerMw * 8000 * 0.35)).toFixed(1));

    return {
      plantElectricalPowerMw,
      operatingTemperatureC: conditions.temperatureC,
      stackCellCount: totalCellCount,
      totalActiveAreaM2,
      h2ProductionKgPerHour,
      coProductionKgPerHour,
      syngasVolumeNm3PerHour,
      actualSyngasH2ToCoRatio,
      downstreamProductVi,
      downstreamProductMetricTonsPerDay,
      annualCo2UtilizedTons,
      powerToSyngasLhvEfficiencyPercent,
      avoidedFossilCo2TonsPerYear
    };
  }
}
