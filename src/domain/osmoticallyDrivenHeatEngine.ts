// src/domain/osmoticallyDrivenHeatEngine.ts
// Domain Engine: Osmotically Driven Heat Engine (ODHE) Closed-Loop Salinity Power Generation
// Standards: Pressure-Retarded Osmosis (PRO), Thermolytic Draw Solutes, IUPAC & Second-Law Thermodynamics

export type OdheDrawSoluteType = 'AMMONIUM_BICARBONATE' | 'TRIMETHYLAMINE_CO2' | 'DIMETHYL_ETHER';
export type OdheMembraneType = 'TFC_POLYAMIDE' | 'GRAPHENE_OXIDE' | 'AQUAPORIN_BIOMIMETIC';

export interface OdheDrawSoluteSpec {
  id: OdheDrawSoluteType;
  name: string;
  chemicalFormula: string;
  molecularWeightGPerMol: number;
  decompositionTempC: number;
  vantHoffFactor: number;
  maxSolubilityMolar: number;
  osmoticCoefficientPhi: number;
  thermolyticVapors: string;
  decompositionEnthalpyKjPerMol: number;
  vietnameseDescription: string;
}

export interface OdheMembraneSpec {
  id: OdheMembraneType;
  name: string;
  waterPermeabilityA_L_m2_h_bar: number; // L / (m^2 * h * bar)
  saltPermeabilityB_L_m2_h: number;      // L / (m^2 * h)
  structuralParameterS_um: number;       // µm
  maxHydraulicPressureBar: number;       // bar
  saltRejectionPercent: number;          // %
  vietnameseFeature: string;
}

export const ODHE_DRAW_SOLUTES: Record<OdheDrawSoluteType, OdheDrawSoluteSpec> = {
  AMMONIUM_BICARBONATE: {
    id: 'AMMONIUM_BICARBONATE',
    name: 'Amoni Bicacbonat (NH₄HCO₃ Nhiệt Phân)',
    chemicalFormula: 'NH4HCO3',
    molecularWeightGPerMol: 79.06,
    decompositionTempC: 58,
    vantHoffFactor: 2.0,
    maxSolubilityMolar: 2.8,
    osmoticCoefficientPhi: 0.94,
    thermolyticVapors: 'NH₃ (k) + CO₂ (k) + H₂O (hơi)',
    decompositionEnthalpyKjPerMol: 64.2,
    vietnameseDescription: 'Chất hút thẩm thấu nhiệt phân kinh điển. Phân rã ở 58°C giải phóng khí NH₃ và CO₂, tái hấp thụ ở 25°C phục hồi dung dịch đậm đặc với áp suất thẩm thấu > 130 bar.'
  },
  TRIMETHYLAMINE_CO2: {
    id: 'TRIMETHYLAMINE_CO2',
    name: 'Phức Hệ Trimethylamine - CO₂ (TMA-CO₂)',
    chemicalFormula: '(CH3)3N - CO2 - H2O',
    molecularWeightGPerMol: 121.14,
    decompositionTempC: 45,
    vantHoffFactor: 2.0,
    maxSolubilityMolar: 3.2,
    osmoticCoefficientPhi: 0.98,
    thermolyticVapors: 'N(CH₃)₃ (k) + CO₂ (k)',
    decompositionEnthalpyKjPerMol: 48.5,
    vietnameseDescription: 'Phức hợp amine bậc ba siêu nhạy nhiệt. Bắt đầu phân tách chỉ tại 45°C, lý tưởng thu hồi nhiệt thải mát từ trung tâm máy chủ AI và mạch bán dẫn.'
  },
  DIMETHYL_ETHER: {
    id: 'DIMETHYL_ETHER',
    name: 'Dung Môi Thẩm Thấu Dimethyl Ether (DME)',
    chemicalFormula: 'CH3-O-CH3',
    molecularWeightGPerMol: 46.07,
    decompositionTempC: 50,
    vantHoffFactor: 1.0,
    maxSolubilityMolar: 2.2,
    osmoticCoefficientPhi: 1.02,
    thermolyticVapors: 'DME (hơi khí)',
    decompositionEnthalpyKjPerMol: 38.0,
    vietnameseDescription: 'Dung môi chuyển đổi trạng thái khí-lỏng DME. Áp suất bốc hơi cao ở 50°C cho phép tách thu hồi triệt để với tổn thất nhiệt dung tối thiểu.'
  }
};

export const ODHE_MEMBRANES: Record<OdheMembraneType, OdheMembraneSpec> = {
  TFC_POLYAMIDE: {
    id: 'TFC_POLYAMIDE',
    name: 'Polyamide Màng Mỏng TFC Tiêu Chuẩn',
    waterPermeabilityA_L_m2_h_bar: 4.8,
    saltPermeabilityB_L_m2_h: 0.22,
    structuralParameterS_um: 420,
    maxHydraulicPressureBar: 55,
    saltRejectionPercent: 98.8,
    vietnameseFeature: 'Màng lọc thương mại bền vững, chịu áp suất thủy tĩnh cao, lớp đệm xốp polysulfone gia cường.'
  },
  GRAPHENE_OXIDE: {
    id: 'GRAPHENE_OXIDE',
    name: 'Graphene Oxide Nanocomposite (GO-PRO)',
    waterPermeabilityA_L_m2_h_bar: 8.9,
    saltPermeabilityB_L_m2_h: 0.12,
    structuralParameterS_um: 210,
    maxHydraulicPressureBar: 75,
    saltRejectionPercent: 99.4,
    vietnameseFeature: 'Kênh dẫn nước nano siêu tốc giữa các phiến graphene; giảm mạnh hiện tượng phân cực nồng độ nội bào ICP.'
  },
  AQUAPORIN_BIOMIMETIC: {
    id: 'AQUAPORIN_BIOMIMETIC',
    name: 'Màng Sinh Học Mô Phỏng Kênh Aquaporin',
    waterPermeabilityA_L_m2_h_bar: 12.4,
    saltPermeabilityB_L_m2_h: 0.08,
    structuralParameterS_um: 160,
    maxHydraulicPressureBar: 65,
    saltRejectionPercent: 99.8,
    vietnameseFeature: 'Kênh protein Aquaporin Z chọn lọc phân tử nước tuyệt đối, cho độ thấm nước cực cao và chặn 100% ion muối.'
  }
};

export interface OdheOperatingConditions {
  soluteType: OdheDrawSoluteType;
  membraneType: OdheMembraneType;
  drawConcentrationMolar: number; // 0.5 to 3.0 M
  feedSalinityGPerL: number;       // 0 (Pure water) to 5.0 g/L
  wasteHeatTempC: number;         // 45°C to 85°C (thermal regeneration)
  coolingTempC: number;           // 15°C to 30°C (ambient condenser/absorber)
  appliedHydraulicPressureBar: number; // 0 to 60 bar
}

export interface OdheOsmoticResult {
  drawOsmoticPressureBar: number;
  feedOsmoticPressureBar: number;
  effectiveOsmoticPressureDeltaBar: number;
  dilutiveIcpFactor: number; // exp(-Jw * S / D)
  effectiveDrawOsmoticPressureAtActiveLayerBar: number;
  waterFluxLMH: number; // L / (m^2 * h)
  powerDensityWPerM2: number; // W / m^2
  optimalHydraulicPressureBar: number;
  maxPowerDensityWPerM2: number;
  powerCurve: Array<{ hydraulicPressureBar: number; waterFluxLMH: number; powerDensityWPerM2: number }>;
}

export interface OdheCycleThermodynamicsResult {
  thermalHeatInputKw: number;
  grossTurbinePowerKw: number;
  feedPumpPowerKw: number;
  netElectricalPowerKw: number;
  thermalEfficiencyPercent: number;
  carnotEfficiencyPercent: number;
  percentOfCarnotLimit: number;
  closedLoopWaterCirculationM3PerHour: number;
  soluteRegenerationRateKgPerHour: number;
  co2EmissionsAvoidedTonsPerYear: number;
}

export class OsmoticallyDrivenHeatEngineDomain {
  // Universal physical constants
  public static readonly GAS_CONSTANT_R = 0.0831446; // L * bar / (mol * K)
  public static readonly WATER_DENSITY_KG_M3 = 1000.0;
  public static readonly WATER_HEAT_CAPACITY_KJ_KG_K = 4.184; // kJ/(kg*K)
  public static readonly DIFFUSION_COEFF_SOLUTE = 1.3e-9; // m^2/s in water

  /**
   * Calculate osmotic pressure from van 't Hoff equation with osmotic coefficient:
   * Pi = i * phi * C * R * T
   */
  public static calculateOsmoticPressureBar(
    solute: OdheDrawSoluteSpec,
    molarConcentration: number,
    temperatureC: number
  ): number {
    const temperatureK = temperatureC + 273.15;
    return solute.vantHoffFactor * solute.osmoticCoefficientPhi * molarConcentration * this.GAS_CONSTANT_R * temperatureK;
  }

  /**
   * Calculate PRO water flux and power density accounting for Internal Concentration Polarization (ICP).
   * In PRO mode: Active Layer faces Draw Solution, Support Layer faces Feed.
   * Dilutive ICP reduces draw solute concentration at the active layer:
   * Pi_draw,m = Pi_draw * exp(-Jw * S / D)
   * Jw = A * [ Pi_draw,m - Pi_feed - Delta_P ]
   */
  public static calculateOsmoticPower(conditions: OdheOperatingConditions): OdheOsmoticResult {
    const solute = ODHE_DRAW_SOLUTES[conditions.soluteType];
    const membrane = ODHE_MEMBRANES[conditions.membraneType];

    const tempPRO = conditions.coolingTempC; // PRO membrane runs at ambient absorption temp (25°C)
    const drawOsmoticPressureBar = this.calculateOsmoticPressureBar(solute, conditions.drawConcentrationMolar, tempPRO);

    // Feed osmotic pressure: NaCl approx 1.15 bar per 1 g/L
    const feedOsmoticPressureBar = Math.max(0.01, conditions.feedSalinityGPerL * 1.15);
    const effectiveOsmoticPressureDeltaBar = Math.max(0.1, drawOsmoticPressureBar - feedOsmoticPressureBar);

    // S_D parameter scaling for ICP: S_eff / D (s/m)
    // S in µm, normalized with effective boundary layer mass transfer
    const S_eff_m = membrane.structuralParameterS_um * 1e-6 * 0.35;
    const S_D_factor = (S_eff_m / this.DIFFUSION_COEFF_SOLUTE) * 2.77778e-7; // per LMH
    const A_LMH_bar = membrane.waterPermeabilityA_L_m2_h_bar;

    const computeJwAtDeltaP = (deltaP: number): { jw: number; piDrawM: number; icpFactor: number } => {
      if (deltaP >= drawOsmoticPressureBar) {
        return { jw: 0, piDrawM: drawOsmoticPressureBar, icpFactor: 1.0 };
      }

      // Solve Jw = A * [ Pi_draw * exp(-Jw * S_D_factor) - feedOsmotic - deltaP ] via bisection
      let low = 0;
      let high = Math.min(200.0, A_LMH_bar * Math.max(0, drawOsmoticPressureBar - feedOsmoticPressureBar - deltaP));

      for (let iter = 0; iter < 28; iter++) {
        const mid = (low + high) / 2;
        const currentIcp = Math.exp(-mid * S_D_factor);
        const piEff = drawOsmoticPressureBar * currentIcp;
        const f = mid - A_LMH_bar * Math.max(0, piEff - feedOsmoticPressureBar - deltaP);
        if (f < 0) {
          low = mid;
        } else {
          high = mid;
        }
      }

      const jw = (low + high) / 2;
      const icpFactor = Math.exp(-jw * S_D_factor);
      const piDrawM = drawOsmoticPressureBar * icpFactor;

      return { jw, piDrawM, icpFactor };
    };

    const operatingMetrics = computeJwAtDeltaP(conditions.appliedHydraulicPressureBar);
    const waterFluxLMH = operatingMetrics.jw;

    // Power density: W = Jw * DeltaP
    // Jw in L/(m^2*h) = 1e-3 / 3600 m^3/(m^2*s) = 2.7778e-7 m/s
    // DeltaP in bar = 1e5 Pa
    // W = Jw_m_s * DeltaP_Pa = (Jw * 2.7778e-7) * (DeltaP * 1e5) = Jw * DeltaP * (100 / 3600) = Jw * DeltaP / 36
    const powerDensityWPerM2 = (waterFluxLMH * conditions.appliedHydraulicPressureBar) / 36.0;

    // Generate power curve across hydraulic pressure steps: 0 to burst pressure
    const maxP = Math.min(membrane.maxHydraulicPressureBar, Math.max(10, drawOsmoticPressureBar * 0.8));
    const stepCount = 10;
    const pStep = maxP / stepCount;
    const powerCurve: Array<{ hydraulicPressureBar: number; waterFluxLMH: number; powerDensityWPerM2: number }> = [];

    let maxPower = 0;
    let optimalP = 0;

    for (let i = 0; i <= stepCount; i++) {
      const p = i * pStep;
      const res = computeJwAtDeltaP(p);
      const w = (res.jw * p) / 36.0;
      powerCurve.push({
        hydraulicPressureBar: p,
        waterFluxLMH: res.jw,
        powerDensityWPerM2: w
      });
      if (w > maxPower) {
        maxPower = w;
        optimalP = p;
      }
    }

    return {
      drawOsmoticPressureBar,
      feedOsmoticPressureBar,
      effectiveOsmoticPressureDeltaBar,
      dilutiveIcpFactor: operatingMetrics.icpFactor,
      effectiveDrawOsmoticPressureAtActiveLayerBar: operatingMetrics.piDrawM,
      waterFluxLMH,
      powerDensityWPerM2,
      optimalHydraulicPressureBar: optimalP,
      maxPowerDensityWPerM2: maxPower,
      powerCurve
    };
  }

  /**
   * Calculate closed-loop ODHE system thermodynamics, net electrical power, and heat-to-electricity efficiency.
   * Reference plant: 1,000 m^2 membrane module.
   */
  public static calculateSystemThermodynamics(
    conditions: OdheOperatingConditions,
    membraneAreaM2: number = 1000.0 // 1000 m^2 commercial stack
  ): OdheCycleThermodynamicsResult {
    const solute = ODHE_DRAW_SOLUTES[conditions.soluteType];
    const osmoticResult = this.calculateOsmoticPower(conditions);

    // Permeate volumetric flow rate Q_perm:
    // Q = Jw * Area (L/h)
    const permeateLitersPerHour = osmoticResult.waterFluxLMH * membraneAreaM2;
    const permeateM3PerHour = permeateLitersPerHour / 1000.0;
    const permeateM3PerSec = permeateM3PerHour / 3600.0;

    // Gross turbine hydro-power:
    // P_gross = eta_turbine * DeltaP * Q_perm
    const etaTurbine = 0.88; // High-efficiency Pelton / Francis hydro-turbine
    const deltaP_Pa = conditions.appliedHydraulicPressureBar * 1e5;
    const grossTurbinePowerKw = (etaTurbine * deltaP_Pa * permeateM3PerSec) / 1000.0;

    // Feed and draw circulation pump power:
    // High-pressure draw pressurization pump:
    const etaPump = 0.82;
    const feedPumpPowerKw = Math.max(0.1, (deltaP_Pa * permeateM3PerSec * 0.15) / (1000.0 * etaPump));

    const netElectricalPowerKw = Math.max(0, grossTurbinePowerKw - feedPumpPowerKw);

    // Thermal distillation regeneration unit:
    // Heat required to strip the thermolytic solute at wasteHeatTempC (e.g. 60°C):
    // 1. Sensible heating of diluted draw solution: DeltaT = wasteHeatTemp - coolingTemp
    const deltaTThermal = Math.max(10, conditions.wasteHeatTempC - conditions.coolingTempC);
    const solutionSensibleHeatKw = (permeateM3PerSec * this.WATER_DENSITY_KG_M3 * this.WATER_HEAT_CAPACITY_KJ_KG_K * deltaTThermal);

    // Heat exchanger recuperator recovers 90% of sensible heat in closed-loop counter-flow:
    const recuperatorEffectiveness = 0.90;
    const netSensibleHeatKw = solutionSensibleHeatKw * (1 - recuperatorEffectiveness);

    // 2. Latent heat of thermolytic solute decomposition:
    // moles of solute regenerated per second:
    const molesSolutePerSec = permeateM3PerSec * 1000.0 * conditions.drawConcentrationMolar;
    const totalLatentDecompositionHeatKw = molesSolutePerSec * solute.decompositionEnthalpyKjPerMol;
    // Direct vapor condensation heat recovery in exothermic absorber recovers ~55% of decomposition enthalpy:
    const netLatentHeatKw = totalLatentDecompositionHeatKw * 0.45;

    const thermalHeatInputKw = Math.max(1.0, netSensibleHeatKw + netLatentHeatKw);

    // Efficiencies
    const thermalEfficiencyPercent = (netElectricalPowerKw / thermalHeatInputKw) * 100.0;

    // Carnot limit
    const tHotK = conditions.wasteHeatTempC + 273.15;
    const tColdK = conditions.coolingTempC + 273.15;
    const carnotEfficiencyPercent = (1 - (tColdK / tHotK)) * 100.0;
    const percentOfCarnotLimit = Math.min(50.0, (thermalEfficiencyPercent / Math.max(0.1, carnotEfficiencyPercent)) * 100.0);

    const soluteRegenerationRateKgPerHour = (molesSolutePerSec * 3600.0 * solute.molecularWeightGPerMol) / 1000.0;

    // Displaced fossil electricity: 8,000 h/year at 0.55 kg CO2/kWh
    const annualHours = 8000;
    const annualKwh = netElectricalPowerKw * annualHours;
    const co2EmissionsAvoidedTonsPerYear = (annualKwh * 0.55) / 1000.0;

    return {
      thermalHeatInputKw,
      grossTurbinePowerKw,
      feedPumpPowerKw,
      netElectricalPowerKw,
      thermalEfficiencyPercent,
      carnotEfficiencyPercent,
      percentOfCarnotLimit,
      closedLoopWaterCirculationM3PerHour: permeateM3PerHour,
      soluteRegenerationRateKgPerHour,
      co2EmissionsAvoidedTonsPerYear
    };
  }
}
