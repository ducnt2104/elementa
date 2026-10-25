/**
 * ELEMENTA - METAL-HYDRIDE SOLID-STATE HYDROGEN STORAGE ENGINE
 *
 * Conforms to:
 * - IUPAC Physical Chemistry & Van 't Hoff PCT (Pressure-Composition-Temperature) Sorption Isotherms
 * - International Energy Agency (IEA) Hydrogen Technology Collaboration Programme (TCP) Standards
 * - AB5 Intermetallic (LaNi5), AB2 Laves Phase (TiMn2), and Complex Hydrides (MgH2, NaAlH4, LiBH4)
 * - Fuel Cell Thermal Integration: Waste heat recuperation (PEMFC / SOFC) for endothermic desorption
 * - Comparison Matrix: Solid Hydride (< 10 bar) vs 700 bar Compressed Gas vs 20K Liquid H2
 * - Vietnam GDPT 2018 Chemistry & Physics (Phương trình Van 't Hoff, Cân bằng pha, Entanpy tạo thành)
 */

export type HydrideAlloyClass =
  | 'AB5_INTERMETALLIC_LANI5'
  | 'AB2_LAVES_TIMN2'
  | 'MAGNESIUM_HYDRIDE_MGH2'
  | 'COMPLEX_SODIUM_ALANATE_NAALH4'
  | 'COMPLEX_BOROHYDRIDE_LIBH4';

export interface MetalHydrideProperties {
  name: string;
  chemicalFormula: string;
  alloyClass: HydrideAlloyClass;
  gravimetricCapacityWtPct: number;    // wt% H2 of total alloy mass
  volumetricDensityKgH2PerM3: number;  // Volumetric density in kg H2 / m³ (compared to liquid H2 at 71 kg/m³)
  enthalpyOfFormationKjPerMolH2: number; // Delta H in kJ/mol H2 (negative for exothermic absorption)
  entropyOfFormationJPerMolK: number;   // Delta S in J/(mol K)
  plateauPressureAt25CBar: number;     // Equilibrium plateau pressure at 25°C
  desorptionTemperatureAt1BarC: number;// Temperature at which P_eq = 1.0 bar
  hysteresisFactor: number;            // P_absorption / P_desorption ratio
  description: string;
}

export const METAL_HYDRIDE_CATALOG: Record<HydrideAlloyClass, MetalHydrideProperties> = {
  AB5_INTERMETALLIC_LANI5: {
    name: 'Hợp Kim Liên Kim Lanthanum-Niken (LaNi₅)',
    chemicalFormula: 'LaNi₅H₆',
    alloyClass: 'AB5_INTERMETALLIC_LANI5',
    gravimetricCapacityWtPct: 1.49,
    volumetricDensityKgH2PerM3: 115.0, // 115 kg/m³ > 71 kg/m³ of liquid hydrogen!
    enthalpyOfFormationKjPerMolH2: -30.8,
    entropyOfFormationJPerMolK: -108.0,
    plateauPressureAt25CBar: 1.76,
    desorptionTemperatureAt1BarC: 12.0,
    hysteresisFactor: 1.15,
    description: 'Hợp kim kinh điển nạp-xả hydro ở nhiệt độ phòng và áp suất cực thấp (~2 bar). Mật độ thể tích 115 kg H₂/m³ vượt xa hydro lỏng ở 20K (71 kg/m³), hoàn hảo ghép nối nhiệt thải với pin nhiên liệu PEMFC (60-80°C).'
  },
  AB2_LAVES_TIMN2: {
    name: 'Pha Laves Titan-Mangan (Ti₀.₉Zr₀.₁Mn₁.₄V₀.₂Fe₀.₄)',
    chemicalFormula: 'Ti-Zr-Mn-V-Fe-H',
    alloyClass: 'AB2_LAVES_TIMN2',
    gravimetricCapacityWtPct: 1.85,
    volumetricDensityKgH2PerM3: 105.0,
    enthalpyOfFormationKjPerMolH2: -27.5,
    entropyOfFormationJPerMolK: -104.5,
    plateauPressureAt25CBar: 8.50,
    desorptionTemperatureAt1BarC: -10.0,
    hysteresisFactor: 1.12,
    description: 'Pha Laves có động học nạp xả cực nhanh và dải nhiệt độ rộng (-20°C đến +50°C), chịu được tạp chất vết trong khí hydro, lý tưởng cho xe nâng và lưu trữ trạm biến áp.'
  },
  MAGNESIUM_HYDRIDE_MGH2: {
    name: 'Magie Hydride Xúc Tác Nano (MgH₂ + 2 mol% Nb₂O₅)',
    chemicalFormula: 'MgH₂',
    alloyClass: 'MAGNESIUM_HYDRIDE_MGH2',
    gravimetricCapacityWtPct: 7.60,
    volumetricDensityKgH2PerM3: 110.0,
    enthalpyOfFormationKjPerMolH2: -74.5,
    entropyOfFormationJPerMolK: -135.0,
    plateauPressureAt25CBar: 0.00015,
    desorptionTemperatureAt1BarC: 278.0,
    hysteresisFactor: 1.25,
    description: 'Dung lượng khối lượng cao (7.6 wt%). Liên kết Mg-H bền vững đòi hỏi nhiệt độ nhả hydro ~300°C, lý tưởng tích hợp nhiệt dư lò phản ứng hạt nhân MSR / VHTR hoặc nhiệt công nghiệp lò luyện thép.'
  },
  COMPLEX_SODIUM_ALANATE_NAALH4: {
    name: 'Natri Alanat Phức Hợp (NaAlH₄ biến tính TiCl₃)',
    chemicalFormula: 'NaAlH₄ ⇌ ⅓ Na₃AlH₆ + ⅔ Al + H₂',
    alloyClass: 'COMPLEX_SODIUM_ALANATE_NAALH4',
    gravimetricCapacityWtPct: 5.50,
    volumetricDensityKgH2PerM3: 72.0,
    enthalpyOfFormationKjPerMolH2: -37.0,
    entropyOfFormationJPerMolK: -122.0,
    plateauPressureAt25CBar: 0.045,
    desorptionTemperatureAt1BarC: 85.0,
    hysteresisFactor: 1.35,
    description: 'Hydride phức hợp thuận nghịch ở nhiệt độ trung bình (100-150°C). Xúc tác nano titan phá vỡ rào cản động học, giúp nạp nhả hydro thuận nghịch hàng nghìn chu kỳ.'
  },
  COMPLEX_BOROHYDRIDE_LIBH4: {
    name: 'Liti Bo-Hydride Mật Độ Siêu Cao (LiBH₄)',
    chemicalFormula: 'LiBH₄',
    alloyClass: 'COMPLEX_BOROHYDRIDE_LIBH4',
    gravimetricCapacityWtPct: 18.50, // World record gravimetric density
    volumetricDensityKgH2PerM3: 122.0,
    enthalpyOfFormationKjPerMolH2: -74.0,
    entropyOfFormationJPerMolK: -115.0,
    plateauPressureAt25CBar: 0.00008,
    desorptionTemperatureAt1BarC: 370.0,
    hysteresisFactor: 1.45,
    description: 'Kỷ lục thế giới về mật độ hydro theo trọng lượng (18.5 wt%). Chứa 122 kg H₂/m³ ở trạng thái rắn kết tinh, tương lai cho hàng không và tàu vũ trụ thám hiểm không gian sâu.'
  }
};

export interface HydrideStorageConditions {
  alloyType: HydrideAlloyClass;
  storageTargetH2Kg: number;           // Target mass of H2 to store (e.g. 50 kg for bus / microgrid)
  operatingTemperatureC: number;      // Tank temperature (°C)
  appliedSupplyPressureBar: number;   // External H2 supply pressure during charge (e.g. 10 bar)
  coolingWaterSupplyTempC: number;    // Heat exchanger coolant temp (°C) during exothermic charge
  wasteHeatSourceTempC: number;        // Heat source temp (°C) available for endothermic desorption
}

export interface HydrideStorageResult {
  alloyName: string;
  chemicalFormula: string;
  alloyMassRequiredKg: number;
  tankBedVolumeM3: number;
  volumetricDensityKgH2PerM3: number;
  gravimetricCapacityWtPct: number;

  thermodynamics: {
    plateauEquilibriumPressureBar: number;
    absorptionPressureBar: number;
    desorptionPressureBar: number;
    desorptionTemperatureAt1BarC: number;
    drivingPressureGradientBar: number; // Supply P - P_eq
    isThermodynamicallyFeasibleToCharge: boolean;
    isThermodynamicallyFeasibleToDischarge: boolean;
  };

  thermalManagement: {
    totalEnthalpyReleasedDuringChargeKj: number;
    coolingPowerRequiredKwAt1HourRate: number;
    totalEnthalpyRequiredDuringDischargeKj: number;
    heatingPowerRequiredKwAt1HourRate: number;
    pemfcThermalCouplingFeasibility: 'PERFECT_MATCH_AUTOTHERMAL' | 'REQUIRES_AUXILIARY_HEAT' | 'HIGH_TEMPERATURE_COUPLING_ONLY';
    pemfcCouplingDescription: string;
  };

  storageTechnologyComparison: {
    solidHydrideTank: {
      storagePressureBar: number;
      safetyLevel: string;
      compressorEnergyPenaltyPct: number;
      dailyBoilOffLossPct: number;
      tankVolumeLitersFor50Kg: number;
    };
    compressedGas700Bar: {
      storagePressureBar: number;
      safetyLevel: string;
      compressorEnergyPenaltyPct: number;
      dailyBoilOffLossPct: number;
      tankVolumeLitersFor50Kg: number;
    };
    cryogenicLiquid20K: {
      storagePressureBar: number;
      safetyLevel: string;
      compressorEnergyPenaltyPct: number;
      dailyBoilOffLossPct: number;
      tankVolumeLitersFor50Kg: number;
    };
  };
}

/**
 * Calculates Van 't Hoff equilibrium plateau pressure
 * P_eq = P_0 * exp( (Delta H / RT) - (Delta S / R) )
 */
export function calculateVanTHoffEquilibriumPressure(
  deltaH_kJPerMol: number,
  deltaS_JPerMolK: number,
  tempC: number
): number {
  const R = 8.314462618; // J / (mol K)
  const T_kelvin = tempC + 273.15;
  const deltaH_J = deltaH_kJPerMol * 1000.0;
  // ln(P / P_0) = (Delta H / (R * T)) - (Delta S / R)
  // Standard P_0 = 1.0 bar
  const lnP = deltaH_J / (R * T_kelvin) - deltaS_JPerMolK / R;
  return Math.exp(lnP);
}

/**
 * Main Metal Hydride Solid-State Storage Simulation Engine
 */
export function calculateHydrideStoragePerformance(
  conditions: HydrideStorageConditions
): HydrideStorageResult {
  const {
    alloyType,
    storageTargetH2Kg,
    operatingTemperatureC,
    appliedSupplyPressureBar,
    coolingWaterSupplyTempC,
    wasteHeatSourceTempC
  } = conditions;

  const props = METAL_HYDRIDE_CATALOG[alloyType];

  // 1. Alloy Mass & Volume Sizing
  // Mass of alloy = storageTargetH2Kg / (wt% / 100)
  const alloyMassRequiredKg = Math.round((storageTargetH2Kg / (props.gravimetricCapacityWtPct / 100.0)) * 10) / 10;
  // Bed volume (m³) = storageTargetH2Kg / volumetricDensity
  const tankBedVolumeM3 = Math.round((storageTargetH2Kg / props.volumetricDensityKgH2PerM3) * 1000) / 1000;

  // 2. Van 't Hoff Plateau Thermodynamics
  const plateauEquilibriumPressureBar = calculateVanTHoffEquilibriumPressure(
    props.enthalpyOfFormationKjPerMolH2,
    props.entropyOfFormationJPerMolK,
    operatingTemperatureC
  );

  const absorptionPressureBar = Math.round(plateauEquilibriumPressureBar * props.hysteresisFactor * 100) / 100;
  const desorptionPressureBar = Math.round((plateauEquilibriumPressureBar / props.hysteresisFactor) * 100) / 100;
  const drivingPressureGradientBar = Math.round((appliedSupplyPressureBar - absorptionPressureBar) * 100) / 100;

  const isThermodynamicallyFeasibleToCharge = drivingPressureGradientBar > 0;
  // Discharge is feasible if waste heat temp creates P_eq >= 1.5 bar (fuel cell inlet requirement)
  const pEqAtWasteHeat = calculateVanTHoffEquilibriumPressure(
    props.enthalpyOfFormationKjPerMolH2,
    props.entropyOfFormationJPerMolK,
    wasteHeatSourceTempC
  );
  const isThermodynamicallyFeasibleToDischarge = pEqAtWasteHeat >= 1.5;

  // 3. Thermal Management Calculations
  // Total moles of H2 stored:
  const molesH2 = (storageTargetH2Kg * 1000.0) / 2.016;
  const totalEnthalpyKj = Math.round(Math.abs(props.enthalpyOfFormationKjPerMolH2) * molesH2);

  // Power required if charged or discharged at a 1-hour rate (1C rate):
  const powerKwAt1HourRate = Math.round((totalEnthalpyKj / 3600.0) * 10) / 10;

  // Fuel Cell Thermal Coupling Assessment:
  // A typical PEMFC operates at 65-80°C and rejects ~50% of input fuel energy as heat.
  let pemfcThermalCouplingFeasibility: 'PERFECT_MATCH_AUTOTHERMAL' | 'REQUIRES_AUXILIARY_HEAT' | 'HIGH_TEMPERATURE_COUPLING_ONLY' = 'REQUIRES_AUXILIARY_HEAT';
  let pemfcCouplingDescription = '';

  if (props.desorptionTemperatureAt1BarC <= 45.0) {
    pemfcThermalCouplingFeasibility = 'PERFECT_MATCH_AUTOTHERMAL';
    pemfcCouplingDescription = 'Tương thích hoàn hảo tự nhiệt (Autothermal): Nhiệt thải nước làm mát của pin nhiên liệu PEMFC (65-80°C) cung cấp 100% entanpy giải phóng hydro mà không cần điện trở sưởi phụ trợ.';
  } else if (props.desorptionTemperatureAt1BarC <= 120.0) {
    pemfcThermalCouplingFeasibility = 'REQUIRES_AUXILIARY_HEAT';
    pemfcCouplingDescription = 'Cần gia nhiệt nhẹ: Nhiệt độ nhả hydro (85-120°C) có thể tận dụng nhiệt thải khí xả pin nhiên liệu PEMFC áp suất cao hoặc pin nhiên liệu màng HT-PEM (160°C).';
  } else {
    pemfcThermalCouplingFeasibility = 'HIGH_TEMPERATURE_COUPLING_ONLY';
    pemfcCouplingDescription = 'Cần nguồn nhiệt cao cấp (> 250°C): Phù hợp tích hợp với pin nhiên liệu oxit rắn SOFC (700°C), nhiệt thải lò phản ứng hạt nhân MSR/VHTR hoặc nhiệt công nghiệp hóa dầu.';
  }

  // 4. Multi-technology Storage Benchmark for storageTargetH2Kg (e.g. 50 kg H2):
  // 50 kg H2 comparison:
  // - Solid Hydride: Volume = 50 / props.volumetricDensity * 1000 L
  // - 700 bar compressed gas: density ~ 40 kg/m³ -> 1,250 Liters
  // - 20K liquid H2: density ~ 71 kg/m³ -> 704 Liters
  const tankVolumeSolidLiters = Math.round((storageTargetH2Kg / props.volumetricDensityKgH2PerM3) * 1000);
  const tankVolume700BarLiters = Math.round((storageTargetH2Kg / 40.0) * 1000);
  const tankVolumeLiquidLiters = Math.round((storageTargetH2Kg / 71.0) * 1000);

  return {
    alloyName: props.name,
    chemicalFormula: props.chemicalFormula,
    alloyMassRequiredKg,
    tankBedVolumeM3,
    volumetricDensityKgH2PerM3: props.volumetricDensityKgH2PerM3,
    gravimetricCapacityWtPct: props.gravimetricCapacityWtPct,

    thermodynamics: {
      plateauEquilibriumPressureBar: Math.round(plateauEquilibriumPressureBar * 1000) / 1000,
      absorptionPressureBar,
      desorptionPressureBar,
      desorptionTemperatureAt1BarC: props.desorptionTemperatureAt1BarC,
      drivingPressureGradientBar,
      isThermodynamicallyFeasibleToCharge,
      isThermodynamicallyFeasibleToDischarge
    },

    thermalManagement: {
      totalEnthalpyReleasedDuringChargeKj: totalEnthalpyKj,
      coolingPowerRequiredKwAt1HourRate: powerKwAt1HourRate,
      totalEnthalpyRequiredDuringDischargeKj: totalEnthalpyKj,
      heatingPowerRequiredKwAt1HourRate: powerKwAt1HourRate,
      pemfcThermalCouplingFeasibility,
      pemfcCouplingDescription
    },

    storageTechnologyComparison: {
      solidHydrideTank: {
        storagePressureBar: Math.round(absorptionPressureBar * 10) / 10,
        safetyLevel: 'An toàn tuyệt đối: Áp suất thấp < 10 bar, không nổ nén, hydro bị khóa chặt trong mạng tinh thể kim loại.',
        compressorEnergyPenaltyPct: 1.8,
        dailyBoilOffLossPct: 0.0,
        tankVolumeLitersFor50Kg: tankVolumeSolidLiters
      },
      compressedGas700Bar: {
        storagePressureBar: 700.0,
        safetyLevel: 'Rủi ro nổ áp lực cao: Yêu cầu bình composite carbon 4 lớp cực dày, vùng cách ly nghiêm ngặt.',
        compressorEnergyPenaltyPct: 15.4,
        dailyBoilOffLossPct: 0.0,
        tankVolumeLitersFor50Kg: tankVolume700BarLiters
      },
      cryogenicLiquid20K: {
        storagePressureBar: 3.5,
        safetyLevel: 'Rủi ro đông lạnh sâu (-253°C): Tự bay hơi sinh áp suất, yêu cầu van xả giảm áp liên tục.',
        compressorEnergyPenaltyPct: 32.5, // 30-35% energy consumed just for liquefaction
        dailyBoilOffLossPct: 1.5,
        tankVolumeLitersFor50Kg: tankVolumeLiquidLiters
      }
    }
  };
}
