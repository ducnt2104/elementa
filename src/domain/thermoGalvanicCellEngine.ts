// src/domain/thermoGalvanicCellEngine.ts
// Thermoelectrochemical (Thermo-Galvanic) Cell Engine for Wearable & Low-Power Continuous Energy Harvesting (Delta T < 10-30 K)
// Standards: IUPAC Electrochemistry, Non-Equilibrium Thermodynamics, Seebeck Coefficient (Se = dV/dT = Delta S / nF),
// Maximum Power Transfer Theorem & Vietnam GDPT 2018 Chemistry (Hóa 10: Nhiệt hóa học, Hóa 12: Thế điện cực & Năng lượng tái tạo)

export type ThermoGalvanicSystemType =
  | 'AQUEOUS_FERRI_FERROCYANIDE'
  | 'GUANIDINIUM_ENHANCED_HYDROGEL'
  | 'IODIDE_TRIIODIDE_NONAQUEOUS'
  | 'QUASI_SOLID_FLEXIBLE_PATCH';

export interface ThermoGalvanicSystemSpec {
  id: ThermoGalvanicSystemType;
  nameVi: string;
  redoxCouple: string;
  electrolyteMedium: string;
  seebeckCoefficientMvPerK: number; // S_e = dV/dT (mV/K)
  ionicConductivitySPerM: number; // S/m
  thermalConductivityWPerMK: number; // W/(m*K)
  relativeSolvationEntropyJPerMolK: number; // Delta S_solv
  figureOfMeritZtTimes1000: number; // Dimensionless ZT * 1000
  mechanismVi: string;
}

export interface ThermoGalvanicConditions {
  systemType: ThermoGalvanicSystemType;
  hotTempC: number; // e.g. 35.0 °C (Skin or heat pipe)
  coldTempC: number; // e.g. 25.0 °C (Ambient air)
  cellAreaCm2: number; // 4 to 100 cm2
  cellThicknessMm: number; // 2 to 10 mm
  externalLoadOhm?: number; // If undefined, auto-matched to R_int for P_max
}

export interface ThermoGalvanicPerformanceResult {
  deltaTemperatureK: number;
  openCircuitVoltageMv: number;
  internalResistanceOhm: number;
  matchedLoadResistanceOhm: number;
  operatingVoltageMv: number;
  currentMilliAmps: number;
  powerOutputMicroWatts: number;
  arealPowerDensityMwPerM2: number;
  normalizedPowerDensityMwPerM2K2: number; // P / (A * Delta T^2)
  carnotEfficiencyPercent: number;
  conversionEfficiencyPercent: number;
  relativeCarnotPercent: number;
}

export interface WearableDeviceHarvestingResult {
  patchAreaCm2: number;
  skinTempC: number;
  ambientTempC: number;
  netHarvestedPowerMicroWatts: number;
  supportedDevices: {
    deviceNameVi: string;
    requiredPowerMicroWatts: number;
    canOperateContinuously: boolean;
    dutyCyclePercent: number;
  }[];
  annualCleanEnergyJoules: number;
  batteryEliminatedPerDecade: number; // Coin cells saved
}

// 1. Catalog of Thermo-Galvanic Redox Electrolyte Systems
export const THERMO_GALVANIC_SYSTEMS: Record<ThermoGalvanicSystemType, ThermoGalvanicSystemSpec> = {
  AQUEOUS_FERRI_FERROCYANIDE: {
    id: 'AQUEOUS_FERRI_FERROCYANIDE',
    nameVi: 'Hệ Dung Dịch Nước Ferri/Ferrocyanide Fe(CN)₆³⁻/⁴⁻',
    redoxCouple: '[Fe(CN)₆]³⁻ + e⁻ ⇌ [Fe(CN)₆]⁴⁻',
    electrolyteMedium: '0.4 M K₃Fe(CN)₆ + 0.4 M K₄Fe(CN)₆ (Aqueous)',
    seebeckCoefficientMvPerK: -1.45,
    ionicConductivitySPerM: 18.5,
    thermalConductivityWPerMK: 0.58,
    relativeSolvationEntropyJPerMolK: -139.8,
    figureOfMeritZtTimes1000: 1.42,
    mechanismVi: 'Ion [Fe(CN)₆]⁴⁻ có điện tích âm cao hơn (-4) nên định hướng các phân tử nước xung quanh mạnh hơn [Fe(CN)₆]³⁻ (-3). Sự chênh lệch solvat hóa này tạo biến thiên entropi âm lớn, làm cho điện cực nóng tích điện dương hơn điện cực lạnh.'
  },
  GUANIDINIUM_ENHANCED_HYDROGEL: {
    id: 'GUANIDINIUM_ENHANCED_HYDROGEL',
    nameVi: 'Hydrogel Polyacrylamide Pha Tạp Guanidinium (Siêu Hệ Số Seebeck)',
    redoxCouple: '[Fe(CN)₆]³⁻ + e⁻ ⇌ [Fe(CN)₆]⁴⁻ + C(NH₂)₃⁺',
    electrolyteMedium: 'PAM Hydrogel + 1.0 M Guanidinium Chloride + 0.4 M Redox',
    seebeckCoefficientMvPerK: -3.85,
    ionicConductivitySPerM: 12.2,
    thermalConductivityWPerMK: 0.35,
    relativeSolvationEntropyJPerMolK: -371.5,
    figureOfMeritZtTimes1000: 5.86,
    mechanismVi: 'Ion chaotropic guanidinium liên kết hydro chọn lọc với [Fe(CN)₆]⁴⁻, phá vỡ vỏ solvat hóa nước phụ thuộc nhiệt độ cực nhạy. Tăng vọt hệ số Seebeck lên đến -3.85 mV/K (gấp gần 3 lần hệ nước thường) trong khi giảm độ dẫn nhiệt.'
  },
  IODIDE_TRIIODIDE_NONAQUEOUS: {
    id: 'IODIDE_TRIIODIDE_NONAQUEOUS',
    nameVi: 'Hệ N-Type Iodide / Triiodide I⁻/I₃⁻ (Hệ Số Seebeck Dương)',
    redoxCouple: '3 I⁻ ⇌ I₃⁻ + 2e⁻',
    electrolyteMedium: '0.5 M KI + 0.05 M I₂ trong Ethylene Glycol',
    seebeckCoefficientMvPerK: 0.88, // Positive Seebeck coefficient (p-type / opposite polarity)
    ionicConductivitySPerM: 8.5,
    thermalConductivityWPerMK: 0.28,
    relativeSolvationEntropyJPerMolK: 84.9,
    figureOfMeritZtTimes1000: 0.95,
    mechanismVi: 'Cặp I⁻/I₃⁻ có biến thiên entropi dương (ΔS > 0) khi oxi hóa. Kết hợp mô-đun p-type (I⁻/I₃⁻) và n-type (Fe(CN)₆³⁻/⁴⁻) mắc nối tiếp điện học và song song nhiệt học tạo nên pin nhiệt điện hóa lưỡng cực nhân đôi điện áp.'
  },
  QUASI_SOLID_FLEXIBLE_PATCH: {
    id: 'QUASI_SOLID_FLEXIBLE_PATCH',
    nameVi: 'Màng Bán Rắn Cellulose Nanocrystal Dẻo Cho Thiết Bị Đeo',
    redoxCouple: '[Fe(CN)₆]³⁻ + e⁻ ⇌ [Fe(CN)₆]⁴⁻',
    electrolyteMedium: 'Màng Gel CNC Dẻo Chống Bay Hơi Nước',
    seebeckCoefficientMvPerK: -2.15,
    ionicConductivitySPerM: 14.8,
    thermalConductivityWPerMK: 0.24,
    relativeSolvationEntropyJPerMolK: -207.4,
    figureOfMeritZtTimes1000: 2.78,
    mechanismVi: 'Mạng lưới sợi nano cellulose giam giữ dung dịch điện phân chống rò rỉ và bay hơi, sở hữu độ dẻo cơ học cao để dán lên da người hoặc ống dẫn nhiệt cong, duy trì phát điện ổn định qua hàng triệu chu kỳ uốn cong.'
  }
};

export class ThermoGalvanicCellEngine {
  /**
   * Tính toán hiệu suất phát điện nhiệt điện hóa liên tục ở trạng thái dừng
   */
  public static calculatePerformance(
    conditions: ThermoGalvanicConditions
  ): ThermoGalvanicPerformanceResult {
    const spec = THERMO_GALVANIC_SYSTEMS[conditions.systemType];
    const thK = conditions.hotTempC + 273.15;
    const tcK = conditions.coldTempC + 273.15;
    const deltaT = Number(Math.max(0.1, conditions.hotTempC - conditions.coldTempC).toFixed(2));

    // 1. Open Circuit Voltage (Voc):
    // Voc = S_e * Delta T (mV)
    const vocMv = Number((spec.seebeckCoefficientMvPerK * deltaT).toFixed(2));
    const vocMvAbs = Math.abs(vocMv);

    // 2. Internal Resistance:
    // R_int = R_electrolyte + R_charge_transfer + R_diffusion
    // R_elec = d / (sigma * A)
    // where d is thickness (m), sigma is conductivity (S/m), A is area (m2)
    const thicknessM = conditions.cellThicknessMm * 1e-3;
    const areaM2 = conditions.cellAreaCm2 * 1e-4;
    const rElectrolyte = thicknessM / (spec.ionicConductivitySPerM * areaM2);
    // Contact & charge transfer ASR ~ 28 Ohm*cm2 = 0.0028 Ohm*m2 on flexible carbon nanotube electrodes
    const asrChargeTransferAndDiffusion = 0.0028; // Ohm*m2
    const rChargeTransfer = asrChargeTransferAndDiffusion / areaM2;
    const rInt = Number((rElectrolyte + rChargeTransfer).toFixed(2));

    // 3. Matched Load Power Output:
    // R_L = R_int gives maximum power P_max = Voc^2 / (4 * R_int)
    const loadOhm = conditions.externalLoadOhm !== undefined ? conditions.externalLoadOhm : rInt;
    const operatingVoltageMv = Number((vocMvAbs * (loadOhm / (loadOhm + rInt))).toFixed(2));
    const currentA = (operatingVoltageMv * 1e-3) / Math.max(0.01, loadOhm);
    const currentMilliAmps = Number((currentA * 1e3).toFixed(3));

    // Power output (microWatts):
    const powerOutputMicroWatts = Number(((operatingVoltageMv * 1e-3) * currentA * 1e6).toFixed(2));

    // Areal Power Density (mW/m2):
    const arealPowerDensityMwPerM2 = Number(((powerOutputMicroWatts * 1e-3) / areaM2).toFixed(2));

    // Normalized Power Density (mW / (m2 * K2)):
    const normalizedPowerDensityMwPerM2K2 = Number(
      (arealPowerDensityMwPerM2 / (deltaT * deltaT)).toFixed(3)
    );

    // 4. Efficiency Metrics:
    // Heat flux Q_dot = k_th * A * (Delta T / d)
    const heatFluxWatts = spec.thermalConductivityWPerMK * areaM2 * (deltaT / thicknessM);
    const carnotEfficiencyPercent = Number(((deltaT / thK) * 100).toFixed(3));
    const conversionEfficiencyPercent = Number(
      (((powerOutputMicroWatts * 1e-6) / Math.max(1e-6, heatFluxWatts)) * 100).toFixed(4)
    );
    const relativeCarnotPercent = Number(
      carnotEfficiencyPercent > 0
        ? ((conversionEfficiencyPercent / carnotEfficiencyPercent) * 100).toFixed(2)
        : '0.00'
    );

    return {
      deltaTemperatureK: deltaT,
      openCircuitVoltageMv: vocMv,
      internalResistanceOhm: rInt,
      matchedLoadResistanceOhm: rInt,
      operatingVoltageMv,
      currentMilliAmps,
      powerOutputMicroWatts,
      arealPowerDensityMwPerM2,
      normalizedPowerDensityMwPerM2K2,
      carnotEfficiencyPercent,
      conversionEfficiencyPercent,
      relativeCarnotPercent
    };
  }

  /**
   * Thiết kế miếng dán thu nhiệt cơ thể người (Wearable Thermogalvanic Patch)
   */
  public static designWearablePatch(
    patchAreaCm2: number = 25.0, // 5 cm x 5 cm patch
    systemType: ThermoGalvanicSystemType = 'GUANIDINIUM_ENHANCED_HYDROGEL',
    skinTempC: number = 34.0,
    ambientTempC: number = 24.0
  ): WearableDeviceHarvestingResult {
    const conditions: ThermoGalvanicConditions = {
      systemType,
      hotTempC: skinTempC,
      coldTempC: ambientTempC,
      cellAreaCm2: patchAreaCm2,
      cellThicknessMm: 3.5
    };

    const perf = this.calculatePerformance(conditions);
    const pNetMicroW = perf.powerOutputMicroWatts;

    // Supported wearable medical sensors & IoT nodes:
    const supportedDevices = [
      {
        deviceNameVi: 'Cảm Biến Nhịp Tim & SpO₂ Quang Học (Pulse Oximeter)',
        requiredPowerMicroWatts: 180.0,
        canOperateContinuously: pNetMicroW >= 180.0,
        dutyCyclePercent: Number(Math.min(100, (pNetMicroW / 180.0) * 100).toFixed(0))
      },
      {
        deviceNameVi: 'Mô-đun Truyền Tin Không Dây Bluetooth Low Energy (BLE Beacon)',
        requiredPowerMicroWatts: 65.0,
        canOperateContinuously: pNetMicroW >= 65.0,
        dutyCyclePercent: Number(Math.min(100, (pNetMicroW / 65.0) * 100).toFixed(0))
      },
      {
        deviceNameVi: 'Cảm Biến Đường Huyết Liên Tục (Continuous Glucose Monitor - CGM)',
        requiredPowerMicroWatts: 45.0,
        canOperateContinuously: pNetMicroW >= 45.0,
        dutyCyclePercent: Number(Math.min(100, (pNetMicroW / 45.0) * 100).toFixed(0))
      },
      {
        deviceNameVi: 'Cảm Biến Gia Tốc Kế Đo Bước Chân (Low-Power MEMS Accelerometer)',
        requiredPowerMicroWatts: 25.0,
        canOperateContinuously: pNetMicroW >= 25.0,
        dutyCyclePercent: Number(Math.min(100, (pNetMicroW / 25.0) * 100).toFixed(0))
      }
    ];

    // Annual energy harvested (Joules): 1 W*s = 1 J
    // 365 * 24 * 3600 = 31,536,000 s
    const annualCleanEnergyJoules = Number(((pNetMicroW * 1e-6) * 31536000).toFixed(0));

    // Coin cells eliminated (CR2032 holds ~220 mAh @ 3V = 0.66 Wh = 2,376 J):
    const batteryEliminatedPerDecade = Number(((annualCleanEnergyJoules * 10) / 2376).toFixed(0));

    return {
      patchAreaCm2,
      skinTempC,
      ambientTempC,
      netHarvestedPowerMicroWatts: pNetMicroW,
      supportedDevices,
      annualCleanEnergyJoules,
      batteryEliminatedPerDecade
    };
  }
}
