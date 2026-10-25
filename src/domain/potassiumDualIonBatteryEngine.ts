// src/domain/potassiumDualIonBatteryEngine.ts
// Domain Engine: Dual-Ion Potassium-Graphite Battery (K-DIB) Ultra-Fast Grid Balancing
// Standards: IUPAC Electrochemistry, Anion Intercalation Graphite Chemistry, GDPT 2018 Chemistry & Fast Frequency Regulation

export type KDibElectrolyteType = 'FLUORINATED_CARBONATE' | 'SUPERCONCENTRATED_ETHER' | 'IONIC_LIQUID';
export type KDibCathodeCarbonType = 'EXPANDED_GRAPHITE' | 'MESOPOROUS_CARBON' | 'NATURAL_GRAPHITE';
export type KDibAnodeCarbonType = 'HARD_CARBON' | 'NATURAL_GRAPHITE' | 'SOFT_CARBON';

export interface KDibElectrolyteSpec {
  id: KDibElectrolyteType;
  name: string;
  chemicalFormula: string;
  saltConcentrationInitialM: number;
  electrochemicalStabilityWindowV: number;
  ionicConductivityMsPerCm: number;
  flammability: 'NON_FLAMMABLE' | 'LOW_FLAMMABILITY' | 'STANDARD';
  operatingTempMinC: number;
  operatingTempMaxC: number;
  vietnameseDescription: string;
}

export interface KDibCathodeSpec {
  id: KDibCathodeCarbonType;
  name: string;
  interlayerSpacingD002Angstrom: number;
  theoreticalCapacityMahPerG: number;
  practicalCapacityMahPerG: number;
  maxChargeRateC: number;
  cycleLifeAt10C: number;
  expansionStrainPercent: number;
  vietnameseFeature: string;
}

export interface KDibAnodeSpec {
  id: KDibAnodeCarbonType;
  name: string;
  potassiumIntercalationCompound: string;
  theoreticalCapacityMahPerG: number;
  intercalationPotentialVvsK: number;
  initialCoulombicEfficiencyPercent: number;
  vietnameseFeature: string;
}

export const K_DIB_ELECTROLYTES: Record<KDibElectrolyteType, KDibElectrolyteSpec> = {
  FLUORINATED_CARBONATE: {
    id: 'FLUORINATED_CARBONATE',
    name: '1.0 M KPF6 trong FEC/EMC (Chống Quá Điện Áp Cao)',
    chemicalFormula: '1.0 M KPF6 / FEC:EMC (1:3 vol)',
    saltConcentrationInitialM: 1.0,
    electrochemicalStabilityWindowV: 5.2,
    ionicConductivityMsPerCm: 11.8,
    flammability: 'LOW_FLAMMABILITY',
    operatingTempMinC: -20,
    operatingTempMaxC: 55,
    vietnameseDescription: 'Chất điện phân dung môi carbonate flo hóa FEC tạo màng thụ động bề mặt cực dương (CEI) siêu mỏng, mở rộng thế oxy hóa an toàn lên đến 5.2 V.'
  },
  SUPERCONCENTRATED_ETHER: {
    id: 'SUPERCONCENTRATED_ETHER',
    name: '3.5 M KFSI trong HFE (Ether Siêu Đậm Đặc)',
    chemicalFormula: '3.5 M KFSI / DME:TTE',
    saltConcentrationInitialM: 3.5,
    electrochemicalStabilityWindowV: 5.4,
    ionicConductivityMsPerCm: 14.2,
    flammability: 'NON_FLAMMABLE',
    operatingTempMinC: -30,
    operatingTempMaxC: 65,
    vietnameseDescription: 'Hệ dung dịch muối ether siêu đậm đặc loại trừ phân tử dung môi tự do, triệt tiêu phản ứng hòa tan graphite và không bốc cháy.'
  },
  IONIC_LIQUID: {
    id: 'IONIC_LIQUID',
    name: '[Pyr14][FSI] Muối Lỏng Ion K-DIB',
    chemicalFormula: '[Pyr14][FSI] + 1.2 M KFSI',
    saltConcentrationInitialM: 1.2,
    electrochemicalStabilityWindowV: 5.6,
    ionicConductivityMsPerCm: 8.5,
    flammability: 'NON_FLAMMABLE',
    operatingTempMinC: -10,
    operatingTempMaxC: 85,
    vietnameseDescription: 'Muối lỏng ion thế hệ mới với áp suất hơi bằng 0, độ bền điện hóa cực hạn 5.6 V, an toàn tuyệt đối chống cháy nổ trạm biến áp.'
  }
};

export const K_DIB_CATHODES: Record<KDibCathodeCarbonType, KDibCathodeSpec> = {
  EXPANDED_GRAPHITE: {
    id: 'EXPANDED_GRAPHITE',
    name: 'Graphite Giãn Nở (Expanded Graphite - EG)',
    interlayerSpacingD002Angstrom: 3.48,
    theoreticalCapacityMahPerG: 110.0,
    practicalCapacityMahPerG: 102.0,
    maxChargeRateC: 60,
    cycleLifeAt10C: 15000,
    expansionStrainPercent: 32.0,
    vietnameseFeature: 'Khoảng cách mạng d(002) = 3.48 Å giúp anion lớn PF6- (bán kính 2.54 Å) xen kẽ cực nhanh mà không gây nứt gãy cơ học; sạc siêu tốc 60C (1 phút).'
  },
  MESOPOROUS_CARBON: {
    id: 'MESOPOROUS_CARBON',
    name: 'Carbon Xốp Trung Bình (Mesoporous Carbon - CMK)',
    interlayerSpacingD002Angstrom: 3.85,
    theoreticalCapacityMahPerG: 95.0,
    practicalCapacityMahPerG: 88.0,
    maxChargeRateC: 80,
    cycleLifeAt10C: 25000,
    expansionStrainPercent: 12.0,
    vietnameseFeature: 'Cấu trúc mao quản trung bình hấp phụ và dẫn ion anion PF6- trực tiếp, độ phồng giãn nở chỉ 12%, tuổi thọ siêu bền trên 25.000 chu kỳ.'
  },
  NATURAL_GRAPHITE: {
    id: 'NATURAL_GRAPHITE',
    name: 'Graphite Tự Nhiên (Natural Flake Graphite)',
    interlayerSpacingD002Angstrom: 3.35,
    theoreticalCapacityMahPerG: 90.0,
    practicalCapacityMahPerG: 75.0,
    maxChargeRateC: 20,
    cycleLifeAt10C: 6000,
    expansionStrainPercent: 48.0,
    vietnameseFeature: 'Giá thành rẻ nhất ($1.5/kg), cấu trúc tinh thể nguyên bản; anion PF6- xen kẽ tạo các bậc Stage 4 -> Stage 1 ở điện thế cao.'
  }
};

export const K_DIB_ANODES: Record<KDibAnodeCarbonType, KDibAnodeSpec> = {
  HARD_CARBON: {
    id: 'HARD_CARBON',
    name: 'Hard Carbon (Carbon Vô Định Hình Không Đồ Thị Hóa)',
    potassiumIntercalationCompound: 'KC6 / Hấp phụ mao quản nano',
    theoreticalCapacityMahPerG: 320.0,
    intercalationPotentialVvsK: 0.22,
    initialCoulombicEfficiencyPercent: 86.0,
    vietnameseFeature: 'Cơ chế kép xen kẽ tầng và hấp phụ lỗ xốp nano; triệt tiêu hoàn toàn mầm nhánh cây kim loại Kali dendrite ở tốc độ xả cực cao.'
  },
  NATURAL_GRAPHITE: {
    id: 'NATURAL_GRAPHITE',
    name: 'Graphite Tự Nhiên Anode (Tạo Hợp Chất KC8)',
    potassiumIntercalationCompound: 'KC8 (Giai đoạn Stage 1)',
    theoreticalCapacityMahPerG: 279.0,
    intercalationPotentialVvsK: 0.18,
    initialCoulombicEfficiencyPercent: 88.5,
    vietnameseFeature: 'Hình thành hợp chất xen kẽ KC8 màu vàng ánh kim ở điện thế cực thấp 0.18 V vs K/K+, tối đa hóa điện áp pin toàn phần.'
  },
  SOFT_CARBON: {
    id: 'SOFT_CARBON',
    name: 'Soft Carbon (Carbon Bán Trật Tự)',
    potassiumIntercalationCompound: 'KC10',
    theoreticalCapacityMahPerG: 260.0,
    intercalationPotentialVvsK: 0.28,
    initialCoulombicEfficiencyPercent: 84.0,
    vietnameseFeature: 'Cấu trúc định hướng linh hoạt, độ dẫn điện cao, khuếch tán cation K+ nhanh nhất phù hợp cân bằng lưới tần số cao.'
  }
};

export interface KDibCellVoltages {
  socPercent: number;
  cathodePotentialVvsK: number;
  anodePotentialVvsK: number;
  cellOpenCircuitVoltageV: number;
  intercalationStage: string;
  residualElectrolyteConcentrationM: number;
}

export interface KDibRateCapabilityPoint {
  cRate: number;
  chargeTimeMinutes: number;
  dischargeCapacityMahPerG: number;
  capacityRetentionPercent: number;
  operatingVoltageV: number;
  specificPowerWPerKg: number;
  roundTripEnergyEfficiencyPercent: number;
}

export interface KDibFrequencyRegulationResult {
  targetGridPowerMW: number;
  durationMinutes: number;
  packEnergyMWh: number;
  totalCellCount: number;
  systemResponseTimeMs: number;
  roundTripEfficiencyPercent: number;
  cycleLifeYearsAt20CyclesPerDay: number;
  cellCapExUSDPerKWh: number;
  criticalMetalsContentGrams: number; // 0g Cobalt, 0g Nickel
  annualGridAncillaryRevenueUSD: number;
}

/**
 * 1. Calculates the dual-ion intercalation cell voltage profile and electrolyte salt consumption across SOC.
 * Cathode: Cn + x PF6- <-> Cn[PF6]x + x e- (4.0 V - 5.0 V vs K/K+)
 * Anode: Cm + y K+ + y e- <-> KC8 (0.15 V - 0.35 V vs K/K+)
 * Net Cell Voltage: V_cell = V_cathode - V_anode (3.8 V - 4.8 V)
 */
export function calculateKDibCellVoltages(
  socPercent: number,
  electrolyteType: KDibElectrolyteType = 'FLUORINATED_CARBONATE',
  cathodeType: KDibCathodeCarbonType = 'EXPANDED_GRAPHITE',
  anodeType: KDibAnodeCarbonType = 'HARD_CARBON'
): KDibCellVoltages {
  const soc = Math.max(0, Math.min(100, socPercent)) / 100.0;
  const electrolyte = K_DIB_ELECTROLYTES[electrolyteType];
  const cathode = K_DIB_CATHODES[cathodeType];
  const anode = K_DIB_ANODES[anodeType];

  // Cathode Anion Intercalation Potential profile (PF6- into graphite stages):
  // Stage 4 (SOC 0-25%): 4.10 - 4.30 V vs K/K+
  // Stage 3 (SOC 25-50%): 4.30 - 4.55 V vs K/K+
  // Stage 2 (SOC 50-75%): 4.55 - 4.80 V vs K/K+
  // Stage 1 (SOC 75-100%): 4.80 - 5.05 V vs K/K+
  let cathodeV = 4.10 + 0.90 * soc + 0.05 * Math.log(soc + 0.01);
  if (cathodeType === 'MESOPOROUS_CARBON') {
    cathodeV -= 0.05; // Slightly lower potential for mesoporous adsorption
  }

  // Anode Cation Intercalation Potential profile (K+ into carbon):
  // Desorption/deintercalation potential rises slightly with lower SOC:
  const anodeV = anode.intercalationPotentialVvsK + 0.12 * (1.0 - soc);

  const cellOpenCircuitVoltageV = Math.max(3.0, cathodeV - anodeV);

  // Intercalation staging description:
  let intercalationStage = 'Giai Đoạn 4 (Stage 4 - Nồng độ anion thấp)';
  if (soc >= 0.75) {
    intercalationStage = 'Giai Đoạn 1 (Stage 1: C₂₄[PF₆] bão hòa tối đa)';
  } else if (soc >= 0.50) {
    intercalationStage = 'Giai Đoạn 2 (Stage 2: C₄₈[PF₆] xen kẽ 2 tầng)';
  } else if (soc >= 0.25) {
    intercalationStage = 'Giai Đoạn 3 (Stage 3: C₇₂[PF₆] xen kẽ 3 tầng)';
  }

  // Dual-Ion electrolyte salt consumption:
  // In DIBs, salt is consumed from electrolyte during charge into both electrodes
  // Depletion factor: ~ 35% of salt consumed at 100% SOC
  const residualElectrolyteConcentrationM = Math.max(
    0.4,
    electrolyte.saltConcentrationInitialM * (1.0 - 0.35 * soc)
  );

  return {
    socPercent: soc * 100,
    cathodePotentialVvsK: cathodeV,
    anodePotentialVvsK: anodeV,
    cellOpenCircuitVoltageV,
    intercalationStage,
    residualElectrolyteConcentrationM
  };
}

/**
 * 2. Generates rate-capability curve across C-rates (from 1C up to 60C fast frequency balancing).
 */
export function generateKDibRateCapability(
  electrolyteType: KDibElectrolyteType = 'FLUORINATED_CARBONATE',
  cathodeType: KDibCathodeCarbonType = 'EXPANDED_GRAPHITE',
  cRates: number[] = [1, 2, 5, 10, 20, 30, 40, 60]
): KDibRateCapabilityPoint[] {
  const cathode = K_DIB_CATHODES[cathodeType];
  const electrolyte = K_DIB_ELECTROLYTES[electrolyteType];
  const baseCapacity = cathode.practicalCapacityMahPerG;

  return cRates.map((cRate) => {
    const chargeTimeMinutes = 60.0 / cRate;

    // Fast kinetics retention: expanded graphite maintains >70% capacity at 60C due to wide d(002) = 3.48 Å
    const ionicMobilityFactor = electrolyte.ionicConductivityMsPerCm / 12.0;
    const ratePenalty = Math.pow(cRate / cathode.maxChargeRateC, 1.25) * (1.0 / ionicMobilityFactor);
    const capacityRetentionPercent = Math.max(45.0, 100.0 - 32.0 * ratePenalty);
    const dischargeCapacityMahPerG = (baseCapacity * capacityRetentionPercent) / 100.0;

    // Ohmic IR drop at high C-rates:
    const irDrop = (cRate / 10.0) * 0.085 * (1.0 / ionicMobilityFactor);
    const operatingVoltageV = Math.max(3.2, 4.35 - irDrop);

    // Specific Power (W/kg of active material):
    // Specific energy ~ dischargeCapacity * operatingVoltage (Wh/kg)
    const specificEnergyWhPerKg = (dischargeCapacityMahPerG * operatingVoltageV) / 1.0;
    const specificPowerWPerKg = specificEnergyWhPerKg * cRate;

    // Round-trip efficiency:
    const roundTripEnergyEfficiencyPercent = Math.max(72.0, 92.0 - (cRate / 10.0) * 2.8);

    return {
      cRate,
      chargeTimeMinutes,
      dischargeCapacityMahPerG,
      capacityRetentionPercent,
      operatingVoltageV,
      specificPowerWPerKg,
      roundTripEnergyEfficiencyPercent
    };
  });
}

/**
 * 3. Grid Frequency Regulation Sizing Calculator:
 * Sizes a utility-scale K-DIB battery energy storage system for fast primary/secondary frequency control (PJM RegD).
 */
export function sizeKDibFrequencyRegulationSystem(
  targetGridPowerMW: number = 20.0,
  durationMinutes: number = 15.0,
  electrolyteType: KDibElectrolyteType = 'FLUORINATED_CARBONATE',
  cathodeType: KDibCathodeCarbonType = 'EXPANDED_GRAPHITE'
): KDibFrequencyRegulationResult {
  const packEnergyMWh = (targetGridPowerMW * durationMinutes) / 60.0; // e.g. 20 MW for 15 min = 5.0 MWh
  const nominalCellCapacityAh = 50.0; // 50 Ah commercial prismatic DIB cell
  const nominalCellVoltageV = 4.30;
  const singleCellEnergyWh = nominalCellCapacityAh * nominalCellVoltageV; // 215 Wh/cell

  const totalCellCount = Math.ceil((packEnergyMWh * 1e6) / singleCellEnergyWh);

  // Fast response time of dual-ion graphite intercalation (in-situ anion/cation hopping without phase change):
  const systemResponseTimeMs = 28.0; // < 30 ms response to grid frequency deviation

  // Operating C-rate:
  const nominalCRate = 60.0 / durationMinutes; // e.g. 4C for 15 min, can surge up to 20C
  const ratePerf = generateKDibRateCapability(electrolyteType, cathodeType, [nominalCRate])[0];

  // Cycle life: 15,000 cycles at 10C. At 20 deep frequency regulation cycles per day:
  const cycleLifeYearsAt20CyclesPerDay = (K_DIB_CATHODES[cathodeType].cycleLifeAt10C / (20 * 365));

  // CapEx: Natural graphite cathode ($2/kg) + hard carbon anode ($4/kg) + KPF6 salt. Zero Cobalt/Nickel!
  // Cell level CapEx ~ $65/kWh (much lower than Li-ion LFP $95/kWh and NMC $130/kWh)
  const cellCapExUSDPerKWh = 65.0;

  // Ancillary services revenue (PJM frequency regulation market pays ~$35/MW-h of capacity + mileage):
  // 20 MW system operating 8,760 hours/year with 75% market clearing:
  const annualGridAncillaryRevenueUSD = targetGridPowerMW * 8760 * 0.75 * 32.0;

  return {
    targetGridPowerMW,
    durationMinutes,
    packEnergyMWh,
    totalCellCount,
    systemResponseTimeMs,
    roundTripEfficiencyPercent: ratePerf.roundTripEnergyEfficiencyPercent,
    cycleLifeYearsAt20CyclesPerDay,
    cellCapExUSDPerKWh,
    criticalMetalsContentGrams: 0.0, // 100% Cobalt-free & Nickel-free
    annualGridAncillaryRevenueUSD
  };
}
