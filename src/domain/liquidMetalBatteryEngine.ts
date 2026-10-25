// src/domain/liquidMetalBatteryEngine.ts
// Liquid Metal Battery (LMB) Density-Stratified High-Temperature Grid Storage Engine
// Standards: IUPAC Electrochemistry, Molten Salt Metallurgy, Ambri/Sadoway Benchmarks & Vietnam GDPT 2018 (Hóa 10 & 12: Kim loại kiềm thổ, Nhiệt hóa học & Năng lượng)

export type LmbChemistryType = 'MG_SB' | 'LI_BI' | 'CA_SB';

export interface LmbLayerSpec {
  nameVi: string;
  chemicalFormula: string;
  phaseStateVi: string;
  densityGPerCm3: number;
  meltingPointC: number;
  thicknessMm: number;
  colorHex: string;
}

export interface LmbChemistrySpec {
  id: LmbChemistryType;
  nameVi: string;
  scientificName: string;
  operatingTemperatureC: number;
  anodeReactionVi: string;
  cathodeReactionVi: string;
  overallAlloyingReactionVi: string;
  standardPotentialE0V: number;
  theoreticalSpecificEnergyWhPerKg: number;
  anodeLayer: LmbLayerSpec;
  electrolyteLayer: LmbLayerSpec;
  cathodeLayer: LmbLayerSpec;
  cycleLifeLimit: number;
  capacityFadeRatePerCyclePercent: number; // e.g. 0.0005%/cycle
  primaryAdvantagesVi: string;
}

export interface LmbCellOperatingConditions {
  chemistry: LmbChemistryType;
  temperatureC: number; // 420 to 550 °C
  depthOfDischarge: number; // 0.05 to 0.95 (5% - 95%)
  currentDensityMaPerCm2: number; // 100 to 800 mA/cm2
  cellActiveAreaCm2: number; // e.g. 400 to 1600 cm2
  ambientTemperatureC: number; // e.g. 25 °C
  thermalInsulationConductivityWPerMK: number; // e.g. 0.035 W/(m*K)
}

export interface LmbElectrochemicalResult {
  openCircuitVoltageV: number;
  operatingDischargeVoltageV: number;
  operatingChargeVoltageV: number;
  powerDensityMwPerCm2: number;
  overpotentials: {
    ohmicV: number;
    activationV: number; // extremely low due to liquid-liquid fast kinetics
    concentrationV: number;
    totalV: number;
  };
  liquidInterfacesStability: {
    densityGradientMaintained: boolean;
    anodeElectrolyteDensityDiffGPerCm3: number;
    electrolyteCathodeDensityDiffGPerCm3: number;
    marangoniConvectionRisk: 'STABLE' | 'MODERATE_CIRCULATION' | 'INTERFACIAL_RUPTURE';
  };
  selfHeatingThermalBalance: {
    jouleanHeatGeneratedWatts: number;
    heatLossToAmbientWatts: number;
    thermalSelfSustaining: boolean; // Does Joulian heat keep cell at T_op without heaters?
    netTemperatureRateOfChangeCDegPerHr: number;
  };
}

export interface LmbContainerizedSystemResult {
  ratedPowerMw: number;
  dischargeDurationHours: number;
  totalStorageCapacityMwh: number;
  containerCount20Ft: number; // Standard 20ft ISO containers
  cellsPerContainer: number;
  totalCellCount: number;
  magnesiumAnodeTons: number;
  antimonyCathodeTons: number;
  moltenElectrolyteSaltTons: number;
  totalSystemWeightTons: number;
  roundTripEfficiencyPercent: number;
  capitalCostPerKwhUsd: number;
  totalCapExMillionUsd: number;
  twentyYearCalendarDegradationPercent: number; // < 1.0% over 20 years
  avoidedPeakerCo2TonsPerYear: number;
}

// 1. Catalog of Liquid Metal Battery Chemistries
export const LMB_CHEMISTRY_CATALOG: Record<LmbChemistryType, LmbChemistrySpec> = {
  MG_SB: {
    id: 'MG_SB',
    nameVi: 'Hệ Magie - Antimon (Mg || Molten Salt || Sb)',
    scientificName: 'Liquid Magnesium-Antimony High-Temperature Battery',
    operatingTemperatureC: 475,
    anodeReactionVi: '3 Mg(l) → 3 Mg²⁺ + 6 e⁻ (Cực âm lỏng)',
    cathodeReactionVi: '2 Sb(l) + 3 Mg²⁺ + 6 e⁻ → Mg₃Sb₂(l) (Tạo hợp kim lỏng intermetallic)',
    overallAlloyingReactionVi: '3 Mg(l) + 2 Sb(l) ⇌ Mg₃Sb₂(l) (E° = 0.95 V - 1.25 V)',
    standardPotentialE0V: 1.18,
    theoreticalSpecificEnergyWhPerKg: 275,
    anodeLayer: {
      nameVi: 'Cực Âm Magie Lỏng (Top)',
      chemicalFormula: 'Mg(l)',
      phaseStateVi: 'Kim loại lỏng (Nóng chảy ở 650°C hoặc hợp kim Mg-Bi ở 450°C)',
      densityGPerCm3: 1.58,
      meltingPointC: 450,
      thicknessMm: 12,
      colorHex: '#94A3B8'
    },
    electrolyteLayer: {
      nameVi: 'Chất Điện Giải Muối Halide Nóng Chảy (Middle)',
      chemicalFormula: 'MgCl₂ - NaCl - KCl (Eutectic)',
      phaseStateVi: 'Muối nóng chảy trong suốt ion hóa cao',
      densityGPerCm3: 1.72,
      meltingPointC: 385,
      thicknessMm: 4,
      colorHex: '#38BDF8'
    },
    cathodeLayer: {
      nameVi: 'Cực Dương Antimon Lỏng (Bottom)',
      chemicalFormula: 'Sb(l) / Sb-Bi',
      phaseStateVi: 'Bể kim loại bán dẫn lỏng mật độ cao',
      densityGPerCm3: 6.53,
      meltingPointC: 430,
      thicknessMm: 18,
      colorHex: '#F59E0B'
    },
    cycleLifeLimit: 15000,
    capacityFadeRatePerCyclePercent: 0.0004,
    primaryAdvantagesVi: 'Tự phục hồi bề mặt tiếp xúc lỏng-lỏng vĩnh viễn; không có cấu trúc tinh thể rắn bị biến dạng hay nứt vỡ; tự sinh nhiệt Joule duy trì nhiệt độ mà không cần bộ sưởi ngoài.'
  },
  LI_BI: {
    id: 'LI_BI',
    nameVi: 'Hệ Liti - Bismut (Li || LiCl-LiI || Bi)',
    scientificName: 'Liquid Lithium-Bismuth Low-Temperature Battery',
    operatingTemperatureC: 420,
    anodeReactionVi: '3 Li(l) → 3 Li⁺ + 3 e⁻',
    cathodeReactionVi: 'Bi(l) + 3 Li⁺ + 3 e⁻ → Li₃Bi(l)',
    overallAlloyingReactionVi: '3 Li(l) + Bi(l) ⇌ Li₃Bi(l) (E° = 0.98 V)',
    standardPotentialE0V: 0.98,
    theoreticalSpecificEnergyWhPerKg: 310,
    anodeLayer: {
      nameVi: 'Cực Âm Liti Lỏng (Top)',
      chemicalFormula: 'Li(l)',
      phaseStateVi: 'Kim loại kiềm lỏng siêu nhẹ',
      densityGPerCm3: 0.51,
      meltingPointC: 180,
      thicknessMm: 10,
      colorHex: '#CBD5E1'
    },
    electrolyteLayer: {
      nameVi: 'Chất Điện Giải LiCl-LiI Nóng Chảy (Middle)',
      chemicalFormula: 'LiCl - LiI Eutectic',
      phaseStateVi: 'Muối halogen nóng chảy độ dẫn ion cực cao',
      densityGPerCm3: 2.85,
      meltingPointC: 370,
      thicknessMm: 3,
      colorHex: '#06B6D4'
    },
    cathodeLayer: {
      nameVi: 'Cực Dương Bismut Lỏng (Bottom)',
      chemicalFormula: 'Bi(l)',
      phaseStateVi: 'Kim loại lỏng tỷ trọng siêu cao',
      densityGPerCm3: 9.80,
      meltingPointC: 271,
      thicknessMm: 15,
      colorHex: '#EC4899'
    },
    cycleLifeLimit: 20000,
    capacityFadeRatePerCyclePercent: 0.0002,
    primaryAdvantagesVi: 'Nhiệt độ vận hành thấp hơn (420°C), độ dẫn ion muối cực lớn (3.2 S/cm) cho phép mật độ dòng tới 1,500 mA/cm².'
  },
  CA_SB: {
    id: 'CA_SB',
    nameVi: 'Hệ Canxi - Antimon (Ca-Mg || CaCl₂-CaF₂ || Sb-Bi)',
    scientificName: 'Liquid Calcium-Magnesium/Antimony Battery (Ambri Commercial Standard)',
    operatingTemperatureC: 500,
    anodeReactionVi: 'Ca(l) + Mg(l) → Ca²⁺ + Mg²⁺ + 4 e⁻',
    cathodeReactionVi: 'Sb-Bi(l) + Ca²⁺ + Mg²⁺ + 4 e⁻ → Ca₃Sb₂ / Mg₃Sb₂(l)',
    overallAlloyingReactionVi: 'Ca(l) + Sb(l) ⇌ Ca₃Sb₂(l) (E° = 1.22 V)',
    standardPotentialE0V: 1.22,
    theoreticalSpecificEnergyWhPerKg: 320,
    anodeLayer: {
      nameVi: 'Cực Âm Hợp Kim Canxi-Magie Lỏng (Top)',
      chemicalFormula: 'Ca - Mg(l)',
      phaseStateVi: 'Hợp kim kiềm thổ lỏng nóng chảy',
      densityGPerCm3: 1.62,
      meltingPointC: 445,
      thicknessMm: 14,
      colorHex: '#A78BFA'
    },
    electrolyteLayer: {
      nameVi: 'Chất Điện Giải CaCl₂ - LiCl Nóng Chảy (Middle)',
      chemicalFormula: 'CaCl₂ - LiCl - CaF₂',
      phaseStateVi: 'Muối nóng chảy eutectic bền nhiệt',
      densityGPerCm3: 1.95,
      meltingPointC: 425,
      thicknessMm: 4,
      colorHex: '#38BDF8'
    },
    cathodeLayer: {
      nameVi: 'Cực Dương Antimon-Bismut Lỏng (Bottom)',
      chemicalFormula: 'Sb - Bi(l)',
      phaseStateVi: 'Hợp kim nặng nhiệt độ nóng chảy thấp',
      densityGPerCm3: 7.20,
      meltingPointC: 410,
      thicknessMm: 20,
      colorHex: '#F59E0B'
    },
    cycleLifeLimit: 18000,
    capacityFadeRatePerCyclePercent: 0.0003,
    primaryAdvantagesVi: 'Hóa học thương mại của Ambri: Nguyên liệu Canxi và Antimon phong phú, giá rẻ; điện thế tế bào cao hơn 1.2V; không cần van thông khí hay hệ thống quản lý bơm phức tạp.'
  }
};

export class LiquidMetalBatteryEngine {
  private static readonly R = 8.31446; // J/(mol*K)
  private static readonly F = 96485.33; // C/mol

  /**
   * Tính toán điện thế hợp kim lỏng Nernst, phân rã quá thế và cân bằng nhiệt Joule tự sưởi
   */
  public static calculateElectrochemicalPerformance(
    conditions: LmbCellOperatingConditions
  ): LmbElectrochemicalResult {
    const spec = LMB_CHEMISTRY_CATALOG[conditions.chemistry];
    const tk = conditions.temperatureC + 273.15;
    const dod = Math.min(0.95, Math.max(0.05, conditions.depthOfDischarge));
    const currentDensityA = conditions.currentDensityMaPerCm2 * 1e-3; // A/cm2

    // Alloying Thermodynamics & Open Circuit Voltage (OCV)
    // As cell discharges, concentration of Mg in Sb cathode increases (forming Mg3Sb2 intermetallic)
    // OCV drops linearly from E0 at 5% DOD down to ~0.82V at 95% DOD:
    // E_OCV(DOD) = E0 - (R*T / 2F) * ln(a_intermetallic / a_pure)
    const deltaEAlloy = (this.R * tk / (2 * this.F)) * Math.log(Math.pow(dod / (1 - dod * 0.95), 1.6));
    const openCircuitVoltageV = Number(Math.max(0.78, spec.standardPotentialE0V - deltaEAlloy * 0.35).toFixed(4));

    // Overpotential Deconstruction:
    // 1. Liquid-liquid interface charge transfer activation overpotential is extraordinarily small!
    // Exchange current density j0 in molten metals exceeds 5.0 to 15.0 A/cm2 (1000x faster than aqueous/Li-ion)
    const j0LiquidMetal = 8.5; // A/cm2
    const etaActivation = Number(((2 * this.R * tk / this.F) * Math.asinh(currentDensityA / (2 * j0LiquidMetal))).toFixed(4)); // < 2 mV

    // 2. Ohmic Overpotential in Molten Salt Electrolyte:
    // Molten salt ionic conductivity sigma ~ 1.8 to 3.0 S/cm
    const moltenSaltConductivity = conditions.chemistry === 'LI_BI' ? 3.1 : 2.1; // S/cm
    const electrolyteThicknessCm = spec.electrolyteLayer.thicknessMm * 0.1; // cm
    const electrolyteAsr = electrolyteThicknessCm / moltenSaltConductivity; // Ohm*cm2 (~0.15 - 0.20 Ohm*cm2)
    const currentCollectorContactAsr = 0.08; // Ohm*cm2
    const totalAsr = electrolyteAsr + currentCollectorContactAsr;
    const etaOhmic = Number((currentDensityA * totalAsr).toFixed(4));

    // 3. Liquid Diffusion Concentration Overpotential:
    // Liquid metal diffusion is very rapid (D ~ 2e-5 cm2/s), but at high DOD concentration gradient builds in cathode
    const etaConcentration = Number(((this.R * tk / (2 * this.F)) * Math.log(1 + 0.35 * dod * currentDensityA)).toFixed(4));

    const totalOverpotential = etaActivation + etaOhmic + etaConcentration;
    const operatingDischargeVoltageV = Number(Math.max(0.60, openCircuitVoltageV - totalOverpotential).toFixed(4));
    const operatingChargeVoltageV = Number((openCircuitVoltageV + totalOverpotential).toFixed(4));
    const powerDensityMwPerCm2 = Number((operatingDischargeVoltageV * conditions.currentDensityMaPerCm2).toFixed(1));

    // Density Stratification & Interfacial Stability
    const anodeDensity = spec.anodeLayer.densityGPerCm3;
    const electrolyteDensity = spec.electrolyteLayer.densityGPerCm3;
    const cathodeDensity = spec.cathodeLayer.densityGPerCm3;

    const diffAnodeElec = Number((electrolyteDensity - anodeDensity).toFixed(2));
    const diffElecCathode = Number((cathodeDensity - electrolyteDensity).toFixed(2));
    const densityGradientMaintained = diffAnodeElec > 0.08 && diffElecCathode > 1.0;

    // Marangoni Convection & Electromagnetic Pinch Risk:
    // At very high current densities (>1000 mA/cm2), Lorentz force / Marangoni instabilities can swirl the interface
    let marangoniConvectionRisk: 'STABLE' | 'MODERATE_CIRCULATION' | 'INTERFACIAL_RUPTURE' = 'STABLE';
    if (conditions.currentDensityMaPerCm2 > 750) {
      marangoniConvectionRisk = 'INTERFACIAL_RUPTURE';
    } else if (conditions.currentDensityMaPerCm2 > 450) {
      marangoniConvectionRisk = 'MODERATE_CIRCULATION';
    }

    // Thermal Balance & Self-Heating Calculation:
    // Cell Total Current I = currentDensity * Area
    const cellCurrentA = currentDensityA * conditions.cellActiveAreaCm2;
    // Internal Resistance R_int = totalAsr / Area
    const rIntOhms = totalAsr / conditions.cellActiveAreaCm2;
    // Joulian Heat Generation: P_joule = I^2 * R_int
    const jouleanHeatGeneratedWatts = Number((Math.pow(cellCurrentA, 2) * rIntOhms).toFixed(2));

    // Heat Loss across insulation: Q_loss = U * A_effective * (T_cell - T_amb)
    // In a multi-cell pack/module, adjacent cells insulate each other (pack boundary sharing factor ~ 0.28)
    const sideM = Math.sqrt(conditions.cellActiveAreaCm2 * 1e-4);
    const surfaceAreaM2 = (2 * Math.pow(sideM, 2) + 4 * sideM * 0.15) * 0.28; // pack-insulated sharing
    const insulationThicknessM = 0.10; // 10 cm high-performance microporous vacuum insulation
    const uOverall = conditions.thermalInsulationConductivityWPerMK / insulationThicknessM; // W/(m2*K)
    const deltaT = conditions.temperatureC - conditions.ambientTemperatureC;
    const heatLossToAmbientWatts = Number((uOverall * surfaceAreaM2 * deltaT).toFixed(2));

    const netThermalPowerWatts = jouleanHeatGeneratedWatts - heatLossToAmbientWatts;
    const thermalSelfSustaining = netThermalPowerWatts >= 0;

    // Thermal capacity C_th ~ 1200 J/K per cell
    const cellThermalCapacityJPerK = 1450;
    const netTemperatureRateOfChangeCDegPerHr = Number(((netThermalPowerWatts * 3600) / cellThermalCapacityJPerK).toFixed(2));

    return {
      openCircuitVoltageV,
      operatingDischargeVoltageV,
      operatingChargeVoltageV,
      powerDensityMwPerCm2,
      overpotentials: {
        ohmicV: etaOhmic,
        activationV: etaActivation,
        concentrationV: etaConcentration,
        totalV: Number(totalOverpotential.toFixed(4))
      },
      liquidInterfacesStability: {
        densityGradientMaintained,
        anodeElectrolyteDensityDiffGPerCm3: diffAnodeElec,
        electrolyteCathodeDensityDiffGPerCm3: diffElecCathode,
        marangoniConvectionRisk
      },
      selfHeatingThermalBalance: {
        jouleanHeatGeneratedWatts,
        heatLossToAmbientWatts,
        thermalSelfSustaining,
        netTemperatureRateOfChangeCDegPerHr
      }
    };
  }

  /**
   * Thiết kế và hoạch định hệ thống container hóa lưu trữ năng lượng lưới điện (ISO Containerized LDES)
   */
  public static designContainerizedGridSystem(
    ratedPowerMw: number,
    dischargeDurationHours: number,
    chemistry: LmbChemistryType = 'CA_SB'
  ): LmbContainerizedSystemResult {
    const totalStorageCapacityMwh = ratedPowerMw * dischargeDurationHours;
    const spec = LMB_CHEMISTRY_CATALOG[chemistry];

    // Commercial LMB cell spec (Ambri Standard Cell):
    // Cell active area: 400 cm2 (20 cm x 20 cm)
    // Capacity per cell: ~1.2 kWh (nominal 1.05V, ~1150 Ah)
    // Continuous discharge power per cell: ~250 W (at 250 A)
    const cellEnergyKwh = 1.25;
    const cellPowerKw = 0.25;

    const totalCellCount = Math.ceil((totalStorageCapacityMwh * 1000) / cellEnergyKwh);

    // Standard 20-Foot ISO Thermal Container:
    // Houses ~800 to 1,000 insulated LMB cells = ~1.0 MWh / 250 kW container module
    const cellsPerContainer = 800;
    const containerCount20Ft = Math.ceil(totalCellCount / cellsPerContainer);

    // Physical Material Inventory:
    // 1 kWh stored requires:
    // ~1.8 kg Active Anode (Ca or Mg)
    // ~4.5 kg Active Cathode (Sb or Bi)
    // ~2.2 kg Molten Salt Halide
    const anodeKgPerKwh = chemistry === 'CA_SB' ? 1.6 : 1.9;
    const cathodeKgPerKwh = chemistry === 'CA_SB' ? 4.2 : 4.8;
    const electrolyteKgPerKwh = 2.1;

    const totalKwh = totalStorageCapacityMwh * 1000;
    const magnesiumAnodeTons = Number(((totalKwh * anodeKgPerKwh) / 1000).toFixed(1));
    const antimonyCathodeTons = Number(((totalKwh * cathodeKgPerKwh) / 1000).toFixed(1));
    const moltenElectrolyteSaltTons = Number(((totalKwh * electrolyteKgPerKwh) / 1000).toFixed(1));

    // Steel housing, busbars, vacuum insulation packaging
    const structureWeightTons = containerCount20Ft * 6.5;
    const totalSystemWeightTons = Number(
      (magnesiumAnodeTons + antimonyCathodeTons + moltenElectrolyteSaltTons + structureWeightTons).toFixed(1)
    );

    // Efficiency: Coulombic eff = 98.8%, Voltage eff = 81.5% => Round-Trip RTE ~ 80.5%
    const roundTripEfficiencyPercent = 80.5;

    // Capital Cost ($/kWh):
    // Earth-abundant materials (Ca, Mg, Sb) + low manufacturing cost (liquid filling, no cleanroom)
    // Target utility scale: $180 - $210 / kWh installed
    const capitalCostPerKwhUsd = chemistry === 'CA_SB' ? 185 : 210;
    const totalCapExMillionUsd = Number(((totalKwh * capitalCostPerKwhUsd) / 1e6).toFixed(2));

    // 20-Year Calendar Degradation:
    // Due to complete absence of solid-phase mechanical strain or dendrites, degradation is < 0.05% / year!
    const twentyYearCalendarDegradationPercent = Number((spec.capacityFadeRatePerCyclePercent * 365 * 20 * 0.1).toFixed(2));

    // Displaced peaker fossil emissions: 0.65 tons CO2 / MWh-cycle, 330 cycles/year
    const avoidedPeakerCo2TonsPerYear = Number((totalStorageCapacityMwh * 330 * 0.65).toFixed(1));

    return {
      ratedPowerMw,
      dischargeDurationHours,
      totalStorageCapacityMwh,
      containerCount20Ft,
      cellsPerContainer,
      totalCellCount,
      magnesiumAnodeTons,
      antimonyCathodeTons,
      moltenElectrolyteSaltTons,
      totalSystemWeightTons,
      roundTripEfficiencyPercent,
      capitalCostPerKwhUsd,
      totalCapExMillionUsd,
      twentyYearCalendarDegradationPercent,
      avoidedPeakerCo2TonsPerYear
    };
  }
}
