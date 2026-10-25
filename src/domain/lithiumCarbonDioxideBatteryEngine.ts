// src/domain/lithiumCarbonDioxideBatteryEngine.ts
// Lithium-Carbon Dioxide (Li-CO2) Battery & Deep Space Carbon Capture Energy Storage Engine
// Standards: IUPAC Electrochemistry, NASA Mars Surface Exploration Benchmarks (P_CO2 ~ 7 mbar),
// Redox Mediator (RM) Lower-Overpotential Catalysis & Vietnam GDPT 2018 Chemistry (Hóa 10: Nhiệt phản ứng, Hóa 12: Pin điện hóa & Công nghệ vũ trụ)

export type LiCo2MediatorType =
  | 'IODINE_REDOX_MEDIATOR'
  | 'BROMINE_HIGH_POTENTIAL'
  | 'RUO2_SOLID_NANOCATALYST'
  | 'UNMEDIATED_PRISTINE_CNT';

export type LiCo2EnvironmentType =
  | 'MARS_SURFACE_ATMOSPHERE'
  | 'EARTH_FLUE_GAS_CAPTURE'
  | 'PURE_LAB_CO2';

export interface LiCo2MediatorSpec {
  id: LiCo2MediatorType;
  nameVi: string;
  catalystMechanism: string;
  chargingCutoffVoltageV: number;
  chargeVoltagePlateauV: number;
  dischargeVoltagePlateauV: number;
  roundTripEfficiencyPercent: number;
  cycleLifeCount: number;
  mechanismVi: string;
}

export interface LiCo2OperatingConditions {
  mediatorType: LiCo2MediatorType;
  environmentType: LiCo2EnvironmentType;
  temperatureC: number; // -40 to 60 °C (Mars daytime/nighttime)
  co2PartialPressureBar: number; // 0.006 to 1.0 bar (Mars is ~0.007 bar)
  currentDensityMaCm2: number; // 0.05 to 1.0 mA/cm2
  cellActiveAreaCm2: number; // 100 to 500 cm2
  arealCapacityMahCm2: number; // 1.0 to 10.0 mAh/cm2
}

export interface LiCo2PerformanceResult {
  openCircuitVoltageV: number; // Theoretical 2.80 V (4Li + 3CO2 -> 2Li2CO3 + C)
  operatingDischargeVoltageV: number;
  operatingChargeVoltageV: number;
  roundTripEfficiencyPercent: number;
  overpotentials: {
    chargeOverpotentialV: number;
    dischargeOverpotentialV: number;
    totalHysteresisV: number;
  };
  carbonCaptureMetrics: {
    co2CapturedPerCycleGrams: number;
    solidLi2Co3DepositedGrams: number;
    carbonPorousDepositGrams: number;
    co2DesorbedDuringRechargeLiters: number;
  };
  specificEnergyWhPerKgCathode: number;
}

export interface LiCo2MarsRoverPackResult {
  totalPackCapacityKwh: number;
  drivingRangeSols: number; // Sols (Martian days)
  liCo2BatteryPackWeightKg: number;
  equivalentLiIonPackWeightKg: number;
  massSavingsKg: number;
  massSavingsPercent: number;
  co2GasHarvestedFromMarsPerMissionKg: number;
  roverPayloadAdvantageVi: string;
}

// 1. Catalog of Li-CO2 Catalytic Redox Mediators
export const LI_CO2_MEDIATORS: Record<LiCo2MediatorType, LiCo2MediatorSpec> = {
  IODINE_REDOX_MEDIATOR: {
    id: 'IODINE_REDOX_MEDIATOR',
    nameVi: 'Chất Điều Hòa Khử Oxi Hóa Iod (LiI / I⁻/I₃⁻ Shuttle)',
    catalystMechanism: 'Soluble Redox Mediator LiI (0.05 M) in DMSO/TEGDME',
    chargingCutoffVoltageV: 3.85,
    chargeVoltagePlateauV: 3.65,
    dischargeVoltagePlateauV: 2.75,
    roundTripEfficiencyPercent: 75.3,
    cycleLifeCount: 250,
    mechanismVi: 'Ion iodua I⁻ bị oxy hóa thành I₃⁻ tại bề mặt điện cực ở thế thấp 3.55 V. Phân tử I₃⁻ hòa tan khuếch tán đến phân hủy hóa học lớp cách điện Li₂CO₃ rắn, giải phóng khí CO₂ mà không làm phân hủy dung môi.'
  },
  BROMINE_HIGH_POTENTIAL: {
    id: 'BROMINE_HIGH_POTENTIAL',
    nameVi: 'Chất Trung Gian Bromua Thế Cao (LiBr / Br⁻/Br₃⁻)',
    catalystMechanism: 'LiBr in Ionic Liquid (EMIM-TFSI)',
    chargingCutoffVoltageV: 4.10,
    chargeVoltagePlateauV: 3.92,
    dischargeVoltagePlateauV: 2.72,
    roundTripEfficiencyPercent: 69.4,
    cycleLifeCount: 180,
    mechanismVi: 'Cặp Br⁻/Br₃⁻ hoạt động ở thế oxy hóa cao hơn (+3.92 V), tăng tốc độ phân hủy triệt để các tinh thể Li₂CO₃ kết tinh kích thước lớn, hạn chế sự tắc nghẽn lỗ rỗng màng carbon nanotube.'
  },
  RUO2_SOLID_NANOCATALYST: {
    id: 'RUO2_SOLID_NANOCATALYST',
    nameVi: 'Hạt Nano Rutheni Oxit (RuO₂/CNT Dị Thể Rắn)',
    catalystMechanism: 'Heterogeneous RuO2 Nanoparticles on Multi-Walled CNTs',
    chargingCutoffVoltageV: 4.30,
    chargeVoltagePlateauV: 4.05,
    dischargeVoltagePlateauV: 2.70,
    roundTripEfficiencyPercent: 66.7,
    cycleLifeCount: 150,
    mechanismVi: 'Xúc tác dị thể rắn RuO₂ tạo liên kết hấp phụ bề mặt làm suy yếu liên kết C-O trong Li₂CO₃, giảm quá thế nạp mà không cần bổ sung phụ gia lỏng có nguy cơ bay hơi trong chân không vũ trụ.'
  },
  UNMEDIATED_PRISTINE_CNT: {
    id: 'UNMEDIATED_PRISTINE_CNT',
    nameVi: 'Carbon Nanotube Nguyên Bản Không Xúc Tác (Pristine CNT)',
    catalystMechanism: 'Pure Porous Carbon Nanotube Matrix (Reference)',
    chargingCutoffVoltageV: 4.60,
    chargeVoltagePlateauV: 4.42,
    dischargeVoltagePlateauV: 2.58,
    roundTripEfficiencyPercent: 58.4,
    cycleLifeCount: 40,
    mechanismVi: 'Hệ chuẩn không xúc tác: Độ trễ quá thế cực lớn (>1.8 V) do Li₂CO₃ là chất cách điện có độ rộng vùng cấm Eg ~ 5.0 eV, gây phân hủy dung môi điện phân và giảm nhanh dung lượng chỉ sau vài chục chu kỳ.'
  }
};

export class LithiumCarbonDioxideBatteryEngine {
  private static readonly F = 96485.33; // Faraday constant (C/mol)
  private static readonly R = 8.31446; // J/(mol*K)
  public static readonly THEORETICAL_OCV = 2.80; // V (4Li + 3CO2 -> 2Li2CO3 + C)
  public static readonly THEORETICAL_SPECIFIC_ENERGY_WH_KG = 1876; // Wh/kg

  /**
   * Tính toán điện thế xả/nạp, quá thế độ trễ và khối lượng CO2 thu hồi
   */
  public static calculatePerformance(
    conditions: LiCo2OperatingConditions
  ): LiCo2PerformanceResult {
    const spec = LI_CO2_MEDIATORS[conditions.mediatorType];
    const tk = conditions.temperatureC + 273.15;

    // 1. Nernst Open Circuit Voltage under Martian / Earth CO2 pressure:
    // Reaction: 4 Li + 3 CO2(g) -> 2 Li2CO3(s) + C(s) (n = 4 electrons per 3 CO2)
    // E(T, P) = E0 + (RT/4F) * ln(P_CO2^3)
    const pCo2 = Math.max(0.001, conditions.co2PartialPressureBar);
    const nernstShift = ((this.R * tk) / (4 * this.F)) * Math.log(Math.pow(pCo2, 3));
    const ocv = Number((this.THEORETICAL_OCV + nernstShift).toFixed(3));

    // 2. Overpotentials & Operating Voltages:
    // Polarization increases at low temperature (Martian cold) and higher current
    const tempFactor = Math.exp(-0.02 * (conditions.temperatureC - 20));
    const currentOverpotentialDischarge = (conditions.currentDensityMaCm2 * 0.12) * tempFactor;
    const currentOverpotentialCharge = (conditions.currentDensityMaCm2 * 0.18) * tempFactor;

    const vDis = Number(Math.max(1.8, spec.dischargeVoltagePlateauV + nernstShift - currentOverpotentialDischarge).toFixed(3));
    const vChg = Number((spec.chargeVoltagePlateauV + currentOverpotentialCharge).toFixed(3));

    const chargeOverpotentialV = Number((vChg - ocv).toFixed(3));
    const dischargeOverpotentialV = Number((ocv - vDis).toFixed(3));
    const totalHysteresisV = Number((vChg - vDis).toFixed(3));

    // Round-Trip Efficiency:
    const rte = Number(((vDis / vChg) * 100).toFixed(1));

    // 3. Carbon Capture & Deposit Calculations per Cell:
    // Q (Ah) = arealCapacity (mAh/cm2) * 1e-3 * area (cm2)
    const totalCellCapacityAh = (conditions.arealCapacityMahCm2 * 1e-3) * conditions.cellActiveAreaCm2;
    const totalCoulombs = totalCellCapacityAh * 3600;
    // Moles of e- = Q / F
    const molesElectron = totalCoulombs / this.F;
    // 3 moles CO2 per 4 moles e-
    const molesCo2 = molesElectron * (3.0 / 4.0);
    const co2CapturedPerCycleGrams = Number((molesCo2 * 44.01).toFixed(2));

    // Solid deposits: 2 moles Li2CO3 (M = 73.89 g/mol) + 1 mole C (M = 12.011 g/mol) per 4 mol e-
    const molesLi2Co3 = molesElectron * (2.0 / 4.0);
    const molesCarbon = molesElectron * (1.0 / 4.0);
    const solidLi2Co3DepositedGrams = Number((molesLi2Co3 * 73.89).toFixed(2));
    const carbonPorousDepositGrams = Number((molesCarbon * 12.011).toFixed(2));

    // Gas volume released during solar daytime recharge (Liters at STP):
    const co2DesorbedDuringRechargeLiters = Number(((molesCo2 * 22.414)).toFixed(2));

    // Specific Energy per kg cathode deposit:
    const totalDepositWeightKg = (solidLi2Co3DepositedGrams + carbonPorousDepositGrams) * 1e-3;
    const cellEnergyWh = vDis * totalCellCapacityAh;
    const specificEnergyWhPerKgCathode = Number(
      totalDepositWeightKg > 0 ? (cellEnergyWh / totalDepositWeightKg).toFixed(0) : '1200'
    );

    return {
      openCircuitVoltageV: ocv,
      operatingDischargeVoltageV: vDis,
      operatingChargeVoltageV: vChg,
      roundTripEfficiencyPercent: rte,
      overpotentials: {
        chargeOverpotentialV,
        dischargeOverpotentialV,
        totalHysteresisV
      },
      carbonCaptureMetrics: {
        co2CapturedPerCycleGrams,
        solidLi2Co3DepositedGrams,
        carbonPorousDepositGrams,
        co2DesorbedDuringRechargeLiters
      },
      specificEnergyWhPerKgCathode
    };
  }

  /**
   * Thiết kế gói pin tự nạp khí CO2 Sao Hỏa 10 kWh cho Robot Tự Hành (Mars Rover)
   */
  public static designMarsRoverBatteryPack(
    totalPackCapacityKwh: number = 10.0,
    mediatorType: LiCo2MediatorType = 'IODINE_REDOX_MEDIATOR'
  ): LiCo2MarsRoverPackResult {
    const spec = LI_CO2_MEDIATORS[mediatorType];

    // Practical pack-level specific energy:
    // Li-CO2 achieves ~550 Wh/kg (since cathode reactant CO2 is drawn directly from Mars atmosphere!)
    const liCo2PackSpecificEnergyWhPerKg = 550.0;
    const liCo2BatteryPackWeightKg = Number(((totalPackCapacityKwh * 1000) / liCo2PackSpecificEnergyWhPerKg).toFixed(1));

    // Equivalent State-of-the-Art Space-Qualified Lithium-Ion Pack (Perseverance/Curiosity ~ 130 Wh/kg):
    const spaceLiIonSpecificEnergyWhPerKg = 130.0;
    const equivalentLiIonPackWeightKg = Number(((totalPackCapacityKwh * 1000) / spaceLiIonSpecificEnergyWhPerKg).toFixed(1));

    const massSavingsKg = Number((equivalentLiIonPackWeightKg - liCo2BatteryPackWeightKg).toFixed(1));
    const massSavingsPercent = Number(((massSavingsKg / equivalentLiIonPackWeightKg) * 100).toFixed(1));

    // Mission duration: 10 kWh pack powers 200 W continuous science payload for 50 hours (2 Martian Sols)
    const drivingRangeSols = Number(((totalPackCapacityKwh * 1000) / (200 * 24.6)).toFixed(1));

    // Total CO2 harvested from Martian atmosphere over 500 charge/discharge cycles:
    // 10 kWh corresponds to ~4.5 kg CO2 per cycle
    const co2PerCycleKg = Number(((totalPackCapacityKwh / 2.2)).toFixed(2));
    const co2GasHarvestedFromMarsPerMissionKg = Number((co2PerCycleKg * spec.cycleLifeCount).toFixed(0));

    return {
      totalPackCapacityKwh,
      drivingRangeSols,
      liCo2BatteryPackWeightKg,
      equivalentLiIonPackWeightKg,
      massSavingsKg,
      massSavingsPercent,
      co2GasHarvestedFromMarsPerMissionKg,
      roverPayloadAdvantageVi: `Tiết kiệm ${massSavingsKg} kg khối lượng pin cho phép mang thêm máy bay không người lái (Mars Helicopter) và thiết bị quang phổ Raman phục vụ tìm kiếm dấu vết sự sống cổ đại!`
    };
  }
}
