// src/domain/atmosphericPhotochemistryEngine.ts
// Domain Engine: Atmospheric Photochemistry, Stratospheric Ozone, Photochemical Smog & Acid Rain / FGD
// Fully aligned with Vietnam GDPT 2018 Chemistry Curriculum (Grade 10 & 11) & QCVN 19:2009/BTNMT / QCVN 05:2023/BTNMT Standards

export interface ChapmanStep {
  id: string;
  nameVi: string;
  chemicalEquationVi: string;
  wavelengthConditionVi: string;
  enthalpyChangeKj: number;
  biologicalRoleVi: string;
}

export interface OzoneSimulationResult {
  totalOzoneDu: number; // Dobson Units (normal ~300 DU; < 220 DU is ozone hole)
  uvbTransmittancePercent: number; // % UV-B transmitted to surface
  uvbIrradianceWm2: number; // W/m^2 reaching ground
  dnaDamageRisk: 'LOW' | 'MODERATE' | 'HIGH' | 'EXTREME';
  isOzoneHole: boolean;
  catalyticTurnoverPerCl: number; // 100,000 cycles
  activeReservoirSpecies: string[];
  polarCloudHeterogeneousReaction: string;
  environmentalNoticeVi: string;
}

export interface SmogHourlyData {
  hour: number; // 0 to 24
  sunlightIntensityPercent: number;
  noConcentrationPpb: number;
  no2ConcentrationPpb: number;
  vocConcentrationPpb: number;
  o3ConcentrationPpb: number;
  panConcentrationPpb: number;
  aqi: number;
  aqiCategory: 'GOOD' | 'MODERATE' | 'UNHEALTHY_SENSITIVE' | 'UNHEALTHY' | 'VERY_UNHEALTHY' | 'HAZARDOUS';
  hazeOpacityPercent: number;
  healthAdvisoryVi: string;
}

export interface AcidRainProfile {
  rainPh: number;
  hPlusConcentrationMolar: number;
  acidClassificationVi: 'Mưa tự nhiên sạch' | 'Mưa axit nhẹ' | 'Mưa axit nghiêm trọng' | 'Mưa axit cực đoan';
  limestoneCorrosionRateMicronsPerYear: number;
  damageDescriptionVi: string;
}

export interface FgdScrubberSimulation {
  so2InletPpm: number;
  slurryFlowRateLpm: number;
  slurryPh: number;
  so2RemovalEfficiencyPercent: number;
  so2OutletPpm: number;
  so2OutletMgNm3: number;
  compliesWithQCVN19: boolean;
  syntheticGypsumProductionKgPerHour: number;
  statusSummaryVi: string;
}

// ---------------------------------------------------------------------------
// 1. CHAPMAN STRATOSPHERIC OZONE CYCLE & CFC CATALYSIS
// ---------------------------------------------------------------------------

export const CHAPMAN_CYCLE_STEPS: ChapmanStep[] = [
  {
    id: 'O2_PHOTOLYSIS',
    nameVi: 'Quang phân phân tử Oxi (Tạo nguyên tử O)',
    chemicalEquationVi: 'O₂ + hν (λ < 242 nm) → O(³P) + O(³P)',
    wavelengthConditionVi: 'Tia cực tím sâu UV-C (λ < 242 nm)',
    enthalpyChangeKj: 498.4,
    biologicalRoleVi: 'Hấp thụ hoàn toàn bức xạ cực tím tử ngoại năng lượng cao nhất, bảo vệ tế bào sơ khai.'
  },
  {
    id: 'O3_FORMATION',
    nameVi: 'Tổng hợp phân tử Ozone (Tỏa nhiệt)',
    chemicalEquationVi: 'O(³P) + O₂ + M → O₃ + M (M = N₂ hoặc O₂ mang năng lượng thừa)',
    wavelengthConditionVi: 'Va chạm 3 vật thể (three-body collision) trong tầng bình lưu',
    enthalpyChangeKj: -106.5,
    biologicalRoleVi: 'Tái tạo và duy trì khiên chắn Ozone tầng bình lưu ở độ cao 15-35 km.'
  },
  {
    id: 'O3_UVB_ABSORPTION',
    nameVi: 'Hấp thụ bức xạ cực tím UV-B (Dải Hartley)',
    chemicalEquationVi: 'O₃ + hν (200 < λ < 310 nm) → O₂ + O(¹D)',
    wavelengthConditionVi: 'Bức xạ cực tím UV-B (λ 280 - 315 nm) & UV-C',
    enthalpyChangeKj: 386.5,
    biologicalRoleVi: 'Lá chắn sinh quyển: Chặn 98% tia UV-B gây ung thư da, đục thủy tinh thể và biến dị gen ADN.'
  },
  {
    id: 'O3_RECOMBINATION',
    nameVi: 'Tái kết hợp phân hủy tự nhiên (Chu trình Chapman)',
    chemicalEquationVi: 'O₃ + O(³P) → 2 O₂',
    wavelengthConditionVi: 'Phản ứng nhiệt học chậm (Hệ số tốc độ k₄ nhỏ)',
    enthalpyChangeKj: -391.9,
    biologicalRoleVi: 'Duy trì trạng thái dừng cân bằng động (Steady-state balance) nồng độ ozone tự nhiên (~300 DU).'
  }
];

export const CFC_CATALYTIC_MECHANISM = {
  cfcCompound: 'Freon-12 (Dichlorodifluoromethane, CCl₂F₂)',
  initiation: 'CCl₂F₂ + hν (λ < 220 nm) → CClF₂• + Cl• (Gốc Clo tự do)',
  propagationA: 'Cl• + O₃ → ClO• + O₂',
  propagationB: 'ClO• + O(³P) → Cl• + O₂',
  netReaction: 'O₃ + O(³P) → 2 O₂ (Clo đóng vai trò xúc tác đồng thể làm sụp đổ khiên Ozone)',
  turnoverRatio: 100000, // 1 nguyên tử Cl phá hủy hơn 100,000 phân tử O3
  chlorineReservoirs: ['HCl (Axit clohydric khí quyển)', 'ClONO₂ (Clo nitrat)'],
  polarStratosphericCloudIceEffectVi: 'Trong mùa đông Nam Cực (T < 195 K), mây bình lưu PSC xúc tác dị thể: HCl + ClONO₂ → Cl₂ + HNO₃. Vào mùa xuân (tháng 9-10), ánh sáng mặt trời giải phóng ồ ạt Cl• gây Lỗ thủng Ozone Nam Cực (< 220 DU).'
};

/**
 * Calculates stratospheric ozone concentration in Dobson Units and surface UV-B transmittance
 * Baseline: 300 DU (normal healthy ozone column, 3 mm pure O3 at STP)
 */
export function simulateStratosphericOzone(
  uvcSolarFluxPercent: number = 100,
  cfcConcentrationPpt: number = 250, // parts per trillion (historical peak ~500 ppt, today ~200-250 ppt)
  antarcticVortexActive: boolean = false
): OzoneSimulationResult {
  // Baseline natural steady state ozone in Dobson Units
  const baselineDu = 300 * (0.8 + 0.2 * (uvcSolarFluxPercent / 100));

  // Catalytic depletion factor: every 100 ppt of active CFC depletes ~25 DU in normal conditions
  let depletionDu = (cfcConcentrationPpt / 100) * 22;

  // Antarctic polar vortex enhancement (heterogeneous activation on PSC ice crystals)
  if (antarcticVortexActive) {
    depletionDu += (cfcConcentrationPpt / 100) * 45; // Spikes up to > 150 DU loss
  }

  const finalDu = Math.max(90, Math.min(420, baselineDu - depletionDu));
  const isOzoneHole = finalDu < 220;

  // Beer-Lambert transmittance of UV-B: T = exp(-k * [O3])
  // Normal 300 DU transmits ~2.0% UV-B to ground; 150 DU transmits ~14% UV-B
  const opticalDepth = (finalDu / 300) * 3.912;
  const uvbTransmittancePercent = Math.max(0.1, Math.min(100, Math.exp(-opticalDepth) * 100));

  // Irradiance at surface (normal noon tropical UV-B flux is ~1.5 W/m^2; under hole can reach 6.0 W/m^2)
  const uvbIrradianceWm2 = +(1.5 * (uvbTransmittancePercent / 2.0)).toFixed(2);

  let dnaDamageRisk: 'LOW' | 'MODERATE' | 'HIGH' | 'EXTREME' = 'LOW';
  if (finalDu < 150 || uvbIrradianceWm2 > 5.0) {
    dnaDamageRisk = 'EXTREME';
  } else if (finalDu < 220 || uvbIrradianceWm2 > 3.0) {
    dnaDamageRisk = 'HIGH';
  } else if (finalDu < 280) {
    dnaDamageRisk = 'MODERATE';
  }

  const environmentalNoticeVi = isOzoneHole
    ? `CẢNH BÁO: Tầng Ozone suy giảm nghiêm trọng (${finalDu.toFixed(1)} DU < 220 DU)! Xuất hiện lỗ thủng Ozone. Bức xạ cực tím UV-B xuyên xuống mặt đất tăng vọt (${uvbIrradianceWm2} W/m²), nguy cơ bỏng nắng và đột biến ADN cực cao.`
    : `Tầng Ozone ở trạng thái ổn định (${finalDu.toFixed(1)} DU ≥ 220 DU). Khiên chắn dải Hartley bảo vệ tốt sinh quyển Trái Đất.`;

  return {
    totalOzoneDu: +finalDu.toFixed(1),
    uvbTransmittancePercent: +uvbTransmittancePercent.toFixed(2),
    uvbIrradianceWm2,
    dnaDamageRisk,
    isOzoneHole,
    catalyticTurnoverPerCl: CFC_CATALYTIC_MECHANISM.turnoverRatio,
    activeReservoirSpecies: CFC_CATALYTIC_MECHANISM.chlorineReservoirs,
    polarCloudHeterogeneousReaction: CFC_CATALYTIC_MECHANISM.polarStratosphericCloudIceEffectVi,
    environmentalNoticeVi
  };
}

// ---------------------------------------------------------------------------
// 2. TROPOSPHERIC PHOTOCHEMICAL SMOG DIURNAL SIMULATOR
// ---------------------------------------------------------------------------

export const SMOG_REACTION_NETWORK = [
  {
    step: 1,
    titleVi: 'Phát thải ban đầu giờ cao điểm giao thông (06:00 - 08:00)',
    eqVi: 'N₂ + O₂ (động cơ nhiệt độ cao > 1300°C) → 2 NO; Xăng xe chưa cháy → Hydrocacbon (VOCs)',
    roleVi: 'Nồng độ NO và VOC sơ cấp tăng vọt khi xe cộ đông đúc buổi sáng.'
  },
  {
    step: 2,
    titleVi: 'Oxi hóa NO thành NO₂ khí nâu đỏ (08:00 - 11:00)',
    eqVi: '2 NO + O₂ → 2 NO₂ và RO₂• (từ VOCs + •OH) + NO → RO• + NO₂',
    roleVi: 'Khí NO₂ màu nâu đỏ tích tụ, làm giảm tầm nhìn khí quyển.'
  },
  {
    step: 3,
    titleVi: 'Quang phân giải phóng nguyên tử O và sinh ra Ozone tầng đối lưu (11:00 - 14:00)',
    eqVi: 'NO₂ + hν (λ < 420 nm) → NO + O(³P); O(³P) + O₂ + M → O₃ + M',
    roleVi: 'Dưới nắng gắt trưa, NO₂ quang phân sinh ra Ozone mặt đất (chất ô nhiễm thứ cấp độc hại).'
  },
  {
    step: 4,
    titleVi: 'Tạo chất cay mắt Peroxyacetyl Nitrate (PAN) & Đỉnh điểm khói mù (13:00 - 16:00)',
    eqVi: 'CH₃C(O)OO• + NO₂ ⇌ CH₃C(O)OONO₂ (PAN)',
    roleVi: 'Ozone và PAN đạt đỉnh; kích ứng niêm mạc mắt dữ dội, gây hen suyễn và phá hủy diệp lục thực vật.'
  },
  {
    step: 5,
    titleVi: 'Chu trình ban đêm: Chuẩn độ dập tắt Ozone (18:00 - 24:00)',
    eqVi: 'NO + O₃ → NO₂ + O₂',
    roleVi: 'Mất ánh sáng mặt trời, phản ứng quang phân dừng lại, NO dư chuẩn độ làm giảm nồng độ O₃ mặt đất.'
  }
];

/**
 * Simulates 24-hour diurnal cycle of Photochemical Smog
 * Produces hourly concentrations of NO, NO2, VOC, O3, PAN, and AQI
 */
export function generatePhotochemicalSmogDiurnalProfile(
  trafficDensityFactor: number = 1.0, // 0.5 to 2.0
  solarRadiationFactor: number = 1.0   // 0.5 to 1.5
): SmogHourlyData[] {
  const profile: SmogHourlyData[] = [];

  for (let hour = 0; hour <= 24; hour++) {
    // Sunlight intensity curve (peaks around 12:00 - 13:00, 0 at night)
    let sunFactor = 0;
    if (hour >= 6 && hour <= 18) {
      sunFactor = Math.sin(((hour - 6) / 12) * Math.PI) * solarRadiationFactor;
    }
    const sunlightIntensityPercent = +(sunFactor * 100).toFixed(1);

    // Morning rush hour traffic peak (07:00 - 08:00) and evening rush hour (17:00 - 18:00)
    const morningRush = Math.exp(-Math.pow((hour - 7.5) / 1.8, 2));
    const eveningRush = Math.exp(-Math.pow((hour - 17.5) / 2.2, 2));
    const trafficActivity = (0.2 + 0.8 * morningRush + 0.5 * eveningRush) * trafficDensityFactor;

    // NO emissions peak sharply during morning rush, then rapidly oxidize
    const noConcentrationPpb = +(
      (15 + 85 * morningRush * trafficDensityFactor + 25 * eveningRush) *
      (1 - 0.7 * sunFactor)
    ).toFixed(1);

    // NO2 peaks between 09:00 - 11:00 as NO oxidizes before high solar photolysis consumes it
    const no2PeakHour = Math.exp(-Math.pow((hour - 10.5) / 2.5, 2));
    const no2ConcentrationPpb = +(
      20 + 75 * no2PeakHour * trafficDensityFactor * (0.8 + 0.4 * sunFactor)
    ).toFixed(1);

    // VOCs track traffic emissions with slower oxidation decay
    const vocConcentrationPpb = +(
      40 + 120 * morningRush * trafficDensityFactor + 40 * eveningRush
    ).toFixed(1);

    // O3 (Ground level ozone) peaks during afternoon (13:00 - 15:00) when UV photolysis of NO2 + VOC radicals is maximal
    const o3PeakHour = Math.exp(-Math.pow((hour - 14.0) / 2.8, 2));
    const o3ConcentrationPpb = +(
      12 + 135 * o3PeakHour * sunFactor * trafficDensityFactor
    ).toFixed(1);

    // PAN (Peroxyacetyl Nitrate) tracks O3 and peaks around 14:00 - 15:30
    const panPeakHour = Math.exp(-Math.pow((hour - 14.5) / 2.5, 2));
    const panConcentrationPpb = +(
      1.5 + 24 * panPeakHour * sunFactor * trafficDensityFactor
    ).toFixed(1);

    // AQI index based on O3 and NO2 (QCVN 05:2023/BTNMT & US EPA AQI mapping)
    // 0-50 Good, 51-100 Moderate, 101-150 Sensitive, 151-200 Unhealthy, 201-300 Very Unhealthy, >300 Hazardous
    let aqi = Math.round(Math.max((o3ConcentrationPpb / 70) * 100, (no2ConcentrationPpb / 100) * 100));
    aqi = Math.min(380, Math.max(25, aqi));

    let aqiCategory: SmogHourlyData['aqiCategory'] = 'GOOD';
    let healthAdvisoryVi = 'Chất lượng không khí tốt, an toàn cho các hoạt động ngoài trời.';

    if (aqi > 300) {
      aqiCategory = 'HAZARDOUS';
      healthAdvisoryVi = 'NGUY HẠI: Mọi người hạn chế tối đa ra ngoài. Ozone và PAN đậm đặc kích ứng mắt, phổi dữ dội.';
    } else if (aqi > 200) {
      aqiCategory = 'VERY_UNHEALTHY';
      healthAdvisoryVi = 'RẤT XẤU: Cảnh báo sức khỏe khẩn cấp. Toàn bộ người dân bắt đầu chịu ảnh hưởng đường hô hấp.';
    } else if (aqi > 150) {
      aqiCategory = 'UNHEALTHY';
      healthAdvisoryVi = 'XẤU: Người có bệnh tim mạch, hen suyễn, người già và trẻ em nên ở trong nhà.';
    } else if (aqi > 100) {
      aqiCategory = 'UNHEALTHY_SENSITIVE';
      healthAdvisoryVi = 'KÉM: Nhóm người nhạy cảm đường hô hấp cần giảm bớt vận động mạnh ngoài trời.';
    } else if (aqi > 50) {
      aqiCategory = 'MODERATE';
      healthAdvisoryVi = 'TRUNG BÌNH: Chất lượng không khí chấp nhận được, một số ít người nhạy cảm có thể bị ho nhẹ.';
    }

    const hazeOpacityPercent = +(Math.min(90, (no2ConcentrationPpb * 0.45 + o3ConcentrationPpb * 0.35))).toFixed(1);

    profile.push({
      hour,
      sunlightIntensityPercent,
      noConcentrationPpb,
      no2ConcentrationPpb,
      vocConcentrationPpb,
      o3ConcentrationPpb,
      panConcentrationPpb,
      aqi,
      aqiCategory,
      hazeOpacityPercent,
      healthAdvisoryVi
    });
  }

  return profile;
}

// ---------------------------------------------------------------------------
// 3. ACID RAIN KINETICS & WET LIMESTONE FGD SCRUBBER
// ---------------------------------------------------------------------------

export const ACID_RAIN_REACTIONS = [
  {
    id: 'NATURAL_RAIN_BUFFER',
    titleVi: 'Cân bằng CO₂ tự nhiên trong nước mưa sạch (pH = 5.6)',
    eqVi: 'CO₂(khí) + H₂O ⇌ H₂CO₃(dd) ⇌ H⁺ + HCO₃⁻ (Ka₁ = 4.3 × 10⁻⁷ M)',
    descVi: 'Nước mưa hoàn toàn không ô nhiễm vẫn có tính axit yếu (pH ≈ 5.6) do khí cacbonic tự nhiên hòa tan.'
  },
  {
    id: 'SULFUR_OXIDATION',
    titleVi: 'Quá trình oxi hóa SO₂ thành Axit Sunfuric (H₂SO₄)',
    eqVi: 'SO₂ + •OH → HOSO₂• ; HOSO₂• + O₂ → SO₃ + HO₂• ; SO₃ + H₂O → H₂SO₄',
    descVi: 'Khí SO₂ sinh ra từ đốt than đá, quặng sulfide được gốc tự do •OH oxi hóa thành sol khí H₂SO₄.'
  },
  {
    id: 'NITROGEN_OXIDATION',
    titleVi: 'Quá trình oxi hóa NO₂ thành Axit Nitric (HNO₃)',
    eqVi: 'NO₂ + •OH + M → HNO₃ + M',
    descVi: 'Axit nitric có tính axit mạnh, đóng góp 30-40% độ chua của các trận mưa axit ở đô thị.'
  },
  {
    id: 'LIMESTONE_CORROSION',
    titleVi: 'Sự ăn mòn di sản kiến trúc đá vôi / cẩm thạch (CaCO₃)',
    eqVi: 'CaCO₃(r) + H₂SO₄(dd) → CaSO₄(r) + CO₂(khí)↑ + H₂O(l)',
    descVi: 'Đá cẩm thạch biến thành thạch cao (CaSO₄) có độ tan lớn hơn ~100 lần, bị nước mưa rửa trôi làm vỡ vụn pho tượng.'
  },
  {
    id: 'FGD_WET_SCRUBBER',
    titleVi: 'Khử lưu huỳnh khí thải FGD bằng huyền phù đá vôi (Limestone Scrubber)',
    eqVi: 'SO₂(k) + CaCO₃(r) + ½ O₂(k) + 2 H₂O(l) → CaSO₄•2H₂O(r)↓ + CO₂(k)↑',
    descVi: 'Thu giữ 95-99% SO₂ tại các nhà máy nhiệt điện than (Vĩnh Tân, Duyên Hải), tạo ra thạch cao nhân tạo tái chế cho xi măng.'
  }
];

/**
 * Evaluates the corrosive impact of acid rain on limestone monuments and aquatic ecosystems
 */
export function evaluateAcidRainImpact(
  rainPh: number, // 2.5 to 7.0
  annualRainfallMm: number = 1800 // Vietnam tropical monsoon average: 1600 - 2200 mm/year
): AcidRainProfile {
  const hPlusConcentrationMolar = Math.pow(10, -rainPh);

  let acidClassificationVi: AcidRainProfile['acidClassificationVi'] = 'Mưa tự nhiên sạch';
  let damageDescriptionVi = 'Nước mưa tự nhiên cân bằng với CO₂ khí quyển (pH ≈ 5.6). Cấu trúc đá vôi và hệ sinh thái thủy sinh an toàn.';

  if (rainPh < 3.5) {
    acidClassificationVi = 'Mưa axit cực đoan';
    damageDescriptionVi = 'Axit sulfuric đậm đặc; ăn mòn phá hủy nghiêm trọng bề mặt tượng đá cẩm thạch; hủy diệt 100% sinh vật phù du và cá trong ao hồ.';
  } else if (rainPh < 4.5) {
    acidClassificationVi = 'Mưa axit nghiêm trọng';
    damageDescriptionVi = 'Mưa axit mạnh (độ pH như giấm chua). Tượng đá vôi bị rỗ sâu, giải phóng nhôm Al³⁺ gây độc rễ cây và hủy diệt rừng nhiệt đới.';
  } else if (rainPh < 5.6) {
    acidClassificationVi = 'Mưa axit nhẹ';
    damageDescriptionVi = 'pH dưới ngưỡng tự nhiên 5.6. Bắt đầu hòa tan ion Ca²⁺ từ vỏ cây và đất canh tác, làm chua hóa nhẹ đất nông nghiệp.';
  }

  // Corrosion rate of CaCO3 surface: Empirical Lipfert damage function
  // Rate (microns/year) ~ a * [H+] * Rainfall + b * Rainfall
  const corrosionMicrons = Math.max(
    1.2,
    (annualRainfallMm / 1000) * (3.5 + 45000 * Math.max(0, hPlusConcentrationMolar - 2.5e-6))
  );

  return {
    rainPh,
    hPlusConcentrationMolar,
    acidClassificationVi,
    limestoneCorrosionRateMicronsPerYear: +corrosionMicrons.toFixed(2),
    damageDescriptionVi
  };
}

/**
 * Simulates Industrial Flue Gas Desulfurization (FGD) Wet Limestone Scrubber
 * Standard: QCVN 19:2009/BTNMT (Industrial emission standard for SO2 < 500 mg/Nm3)
 */
export function simulateFlueGasDesulfurization(
  so2InletPpm: number = 1800, // Typical raw coal thermal flue gas (1200 - 2500 ppm)
  slurryFlowRateLpm: number = 500, // Limestone slurry recirculation rate (L/min)
  slurryPh: number = 5.8 // Optimum operational pH window: 5.4 - 6.2
): FgdScrubberSimulation {
  // Efficiency model: Dependent on stoichiometric liquid-to-gas ratio and scrubber pH
  // Below pH 5.0, SO2 absorption drops drastically because of acidity saturation
  // Above pH 6.2, limestone dissolution drops and scaling occurs
  let phEfficiencyFactor = 1.0;
  if (slurryPh < 5.0) {
    phEfficiencyFactor = 0.45 + (slurryPh - 4.0) * 0.4;
  } else if (slurryPh > 6.2) {
    phEfficiencyFactor = 0.98 - (slurryPh - 6.2) * 0.25;
  } else {
    // Optimal bell peak at pH 5.8
    phEfficiencyFactor = 0.96 + 0.04 * (1 - Math.abs(slurryPh - 5.8) / 0.4);
  }

  // Flow rate factor: nominal 500 L/min gives full contact
  const flowFactor = Math.min(1.0, slurryFlowRateLpm / 450);

  const baseEfficiency = 0.985;
  const removalEfficiency = Math.max(0.2, Math.min(0.995, baseEfficiency * phEfficiencyFactor * flowFactor));
  const so2RemovalEfficiencyPercent = +(removalEfficiency * 100).toFixed(1);

  const so2OutletPpm = +(so2InletPpm * (1 - removalEfficiency)).toFixed(1);

  // Conversion: 1 ppm SO2 at STP (0°C, 101.3 kPa) = 2.857 mg/Nm3
  const so2OutletMgNm3 = +(so2OutletPpm * 2.857).toFixed(1);

  // QCVN 19:2009/BTNMT Column B limit for SO2 is 500 mg/Nm3
  const compliesWithQCVN19 = so2OutletMgNm3 <= 500;

  // Gypsum (CaSO4.2H2O, M = 172.17 g/mol) produced per hour from captured SO2 (M = 64.06 g/mol)
  // Assuming a flue gas flow of 10,000 Nm3/h:
  // Captured SO2 (kg/h) = 10,000 * (so2Inlet - so2Outlet) * 2.857 * 1e-6
  const capturedSo2KgH = 10000 * (so2InletPpm - so2OutletPpm) * 2.857 * 1e-6;
  const gypsumProductionKgH = +(capturedSo2KgH * (172.17 / 64.06)).toFixed(1);

  const statusSummaryVi = compliesWithQCVN19
    ? `ĐẠT CHUẨN QCVN 19:2009/BTNMT: Hiệu suất khử SO₂ đạt ${so2RemovalEfficiencyPercent}%. Khí thải đầu ra ${so2OutletMgNm3} mg/Nm³ (< 500 mg/Nm³). Thu hồi ${gypsumProductionKgH} kg thạch cao kỹ thuật/giờ.`
    : `VƯỢT NGƯỠNG CHO PHÉP: Khí thải SO₂ đầu ra ${so2OutletMgNm3} mg/Nm³ vượt quá quy chuẩn QCVN 19 (500 mg/Nm³). Cần tăng lưu lượng huyền phù đá vôi hoặc điều chỉnh pH về vùng tối ưu 5.5 - 6.0.`;

  return {
    so2InletPpm,
    slurryFlowRateLpm,
    slurryPh,
    so2RemovalEfficiencyPercent,
    so2OutletPpm,
    so2OutletMgNm3,
    compliesWithQCVN19,
    syntheticGypsumProductionKgPerHour: gypsumProductionKgH,
    statusSummaryVi
  };
}
