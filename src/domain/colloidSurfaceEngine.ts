// src/domain/colloidSurfaceEngine.ts
// Comprehensive Colloids, Surface Chemistry, Surfactants & Micelles Engine
// Conforming to Vietnam GDPT 2018 (Hóa học 10 & 11: Dung dịch & Hệ phân tán) & IUPAC Standards

export type DispersionSystemCategory =
  | 'TRUE_SOLUTION'      // Dung dịch thực (d < 1 nm)
  | 'COLLOIDAL_SYSTEM'   // Hệ keo (1 nm <= d <= 100 nm)
  | 'COARSE_DISPERSION'; // Hệ thô / Huyền phù / Nhũ tương (d > 100 nm)

export type ColloidStateType =
  | 'SOL'      // Rắn trong lỏng hoặc lỏng trong lỏng (Fe(OH)3 sol, hạt nano vàng)
  | 'GEL'      // Lỏng trong mạng rắn 3D (Gelatin, thạch agar, silica gel)
  | 'EMULSION' // Lỏng trong lỏng không trộn lẫn (Sữa, mayonnaise, O/W hoặc W/O)
  | 'AEROSOL'  // Rắn/lỏng trong khí (Khói, sương mù, mây trời)
  | 'FOAM';    // Khí trong lỏng/rắn (Bọt xà phòng, kem đánh bông, đá bọt)

export interface DispersedSystemDef {
  id: string;
  nameVI: string;
  category: DispersionSystemCategory;
  colloidType?: ColloidStateType;
  typicalParticleSizeRangeNm: [number, number];
  dispersedPhaseVI: string;
  dispersionMediumVI: string;
  opticalBehaviorVI: string;
  kineticStabilityVI: string;
  passFilterPaper: boolean;
  passDialysisMembrane: boolean;
  realWorldExamplesVI: string[];
  pedagogicalInsightVI: string;
}

export interface SurfactantPresetDef {
  id: string;
  nameVI: string;
  tradeNameVI: string;
  iupacFormula: string;
  surfactantType: 'ANIONIC' | 'CATIONIC' | 'NON_IONIC' | 'AMPHOTERIC';
  hydrophilicHeadGroupVI: string;
  lipophilicTailGroupVI: string;
  criticalMicelleConcentrationMolar: number; // CMC in mol/L
  aggregationNumberN: number; // ~ số phân tử trong 1 micelle
  pureWaterSurfaceTensionPlateau_mNm: number; // mN/m (nước nguyên chất = 72.8)
  griffinHLB: number; // 0 to 20
  primaryApplicationVI: string;
  cleansingMechanismVI: string;
}

// Fundamental constants
export const BOLTZMANN_CONSTANT = 1.380649e-23; // J/K
export const WATER_SURFACE_TENSION_20C = 72.75; // mN/m at 20°C
export const WATER_VISCOSITY_20C = 1.002e-3; // Pa·s (kg/(m·s))

// ==========================================
// 1. DISPERSED SYSTEMS CATALOG (GDPT 2018)
// ==========================================
export const DISPERSED_SYSTEMS_CATALOG: Record<string, DispersedSystemDef> = {
  nacl_solution: {
    id: 'nacl_solution',
    nameVI: 'Dung Dịch Nước Muối Ăn (Dung Dịch Thực)',
    category: 'TRUE_SOLUTION',
    typicalParticleSizeRangeNm: [0.1, 0.4],
    dispersedPhaseVI: 'Ion hòa tan Na⁺ và Cl⁻ bị hydrat hóa',
    dispersionMediumVI: 'Nước lỏng (H2O)',
    opticalBehaviorVI: 'Trong suốt hoàn toàn, không tán xạ ánh sáng (không có hiệu ứng Tyndall).',
    kineticStabilityVI: 'Bền vững nhiệt động học tuyệt đối, không bao giờ lắng cặn theo thời gian.',
    passFilterPaper: true,
    passDialysisMembrane: true,
    realWorldExamplesVI: ['Dung dịch NaCl 0.9% sinh lý', 'Dung dịch đường glucose', 'Nước khoáng tự nhiên'],
    pedagogicalInsightVI: 'Kích thước hạt siêu nhỏ dưới 1 nm khiến dung dịch thực đồng nhất ở cấp độ phân tử và ion, ánh sáng truyền qua thẳng mà không bị lệch pha.'
  },
  fe_oh_3_sol: {
    id: 'fe_oh_3_sol',
    nameVI: 'Sol Sắt(III) Hiđroxit Fe(OH)3 (Hệ Keo Dương)',
    category: 'COLLOIDAL_SYSTEM',
    colloidType: 'SOL',
    typicalParticleSizeRangeNm: [5, 40],
    dispersedPhaseVI: 'Hạt micelle keo Fe(OH)3 tích điện dương {[Fe(OH)3]m · n FeO⁺ · (n-x) Cl⁻}ˣ⁺',
    dispersionMediumVI: 'Nước lỏng (H2O)',
    opticalBehaviorVI: 'Có hiệu ứng Tyndall rõ rệt: chùm tia sáng laser đi qua hiện rõ vệt sáng hình nón màu lam/nâu đỏ.',
    kineticStabilityVI: 'Bền vững động học nhờ lớp điện kép chống sa lắng; keo tụ nhanh khi thêm ion đa âm (SO4²⁻, PO4³⁻).',
    passFilterPaper: true,
    passDialysisMembrane: false,
    realWorldExamplesVI: ['Sol Fe(OH)3 điều chế bằng cách nhỏ FeCl3 vào nước sôi', 'Keo vàng nano Faraday', 'Phù sa sông Hồng'],
    pedagogicalInsightVI: 'Thí nghiệm kinh điển GDPT 2018: Đun sôi nước cất, nhỏ từng giọt FeCl3 bão hòa vào sẽ thu được dung dịch keo Fe(OH)3 màu nâu đỏ trong suốt nhưng xuất hiện vệt sáng Tyndall khi chiếu đèn pin.'
  },
  milk_emulsion: {
    id: 'milk_emulsion',
    nameVI: 'Sữa Tươi (Nhũ Tương Dầu Trong Nước - O/W)',
    category: 'COLLOIDAL_SYSTEM',
    colloidType: 'EMULSION',
    typicalParticleSizeRangeNm: [80, 500],
    dispersedPhaseVI: 'Các giọt chất béo lipid hình cầu bọc màng protein casein',
    dispersionMediumVI: 'Dung dịch nước chứa đường lactose và khoáng chất',
    opticalBehaviorVI: 'Màu trắng đục do tán xạ ánh sáng mạnh mẽ ở mọi bước sóng khả kiến.',
    kineticStabilityVI: 'Bền nhờ protein casein đóng vai trò chất nhũ hóa; bị đông tụ (vón cục) khi thêm axit (lên men lactic pH < 4.6).',
    passFilterPaper: true,
    passDialysisMembrane: false,
    realWorldExamplesVI: ['Sữa bò tươi tiệt trùng', 'Sữa mẹ', 'Sốt mayonnaise (nhũ tương dầu-giấm nhờ lòng đỏ trứng lecithin)'],
    pedagogicalInsightVI: 'Minh họa vai trò quyết định của chất nhũ hóa (emulsifier): không có casein bọc ngoài, các giọt chất béo sẽ nhanh chóng kết tụ lại và tách lớp nổi lên trên.'
  },
  agar_gel: {
    id: 'agar_gel',
    nameVI: 'Thạch Rau Câu Agar (Hệ Gel / Thể Đông)',
    category: 'COLLOIDAL_SYSTEM',
    colloidType: 'GEL',
    typicalParticleSizeRangeNm: [20, 100],
    dispersedPhaseVI: 'Nước lỏng bị giữ chặt trong mạng lưới không gian 3 chiều',
    dispersionMediumVI: 'Mạng lưới polymer polysaccharide agarose và agaropectin liên kết hydro',
    opticalBehaviorVI: 'Bán trong suốt, có tính đàn hồi cao và khả năng giữ nước lớn.',
    kineticStabilityVI: 'Định hình dạng rắn đàn hồi; hiện tượng thoát nước (syneresis) xảy ra theo thời gian khi khung gel co rút.',
    passFilterPaper: false,
    passDialysisMembrane: false,
    realWorldExamplesVI: ['Thạch rau câu agar', 'Gelatin tráng miệng', 'Gel silica hút ẩm', 'Đĩa cấy vi sinh vật'],
    pedagogicalInsightVI: 'Quá trình chuyển hóa sol-gel (Sol-Gel Transition): khi đun nóng liên kết hydro đứt gãy tạo sol lỏng, khi nguội khung sợi polymer tự tái tổ chức giam giữ các phân tử nước bên trong.'
  },
  clay_suspension: {
    id: 'clay_suspension',
    nameVI: 'Nước Phù Sa / Bùn Đất Sét (Huyền Phù - Hệ Thô)',
    category: 'COARSE_DISPERSION',
    typicalParticleSizeRangeNm: [200, 10000],
    dispersedPhaseVI: 'Các vi tinh thể khoáng sét aluminosilicat tích điện âm',
    dispersionMediumVI: 'Nước sông',
    opticalBehaviorVI: 'Đục ngầu, cản trở hoàn toàn sự truyền qua của chùm sáng.',
    kineticStabilityVI: 'Không bền vững, các hạt thô tự lắng đọng dưới tác dụng của trọng lực sau vài giờ.',
    passFilterPaper: false,
    passDialysisMembrane: false,
    realWorldExamplesVI: ['Nước sông lũ bùn đỏ', 'Hỗn dịch thuốc kháng toan nhôm hiđroxit (Gastropulgite)', 'Sơn tường'],
    pedagogicalInsightVI: 'Giải thích hiện tượng hình thành Đồng Bằng & Cửa Sông (Delta formation): Khi nước sông phù sa (keo/huyền phù âm) gặp nước biển mặn chứa nồng độ ion Na⁺, Mg²⁺, Ca²⁺ cao, quy tắc Schulze-Hardy gây keo tụ ồ ạt tạo nên các bãi bồi ven biển.'
  }
};

// ==========================================
// 2. SURFACTANTS & MICELLES BENCHMARKS
// ==========================================
export const SURFACTANTS_CATALOG: Record<string, SurfactantPresetDef> = {
  sodium_dodecyl_sulfate: {
    id: 'sodium_dodecyl_sulfate',
    nameVI: 'Natri Đodexyl Sunfat (SDS / SLS)',
    tradeNameVI: 'Sodium Lauryl Sulfate (SLS)',
    iupacFormula: 'CH3-(CH2)11-OSO3⁻ Na⁺',
    surfactantType: 'ANIONIC',
    hydrophilicHeadGroupVI: 'Nhóm sunfat tích điện âm (-OSO3⁻)',
    lipophilicTailGroupVI: 'Chuỗi hydrocacbon bão hòa 12 cacbon (C12H25-)',
    criticalMicelleConcentrationMolar: 0.0082, // 8.2 mM at 25°C
    aggregationNumberN: 62,
    pureWaterSurfaceTensionPlateau_mNm: 38.5,
    griffinHLB: 40.0, // Quy đổi thang Davis (~11 trên thang Griffin thực nghiệm)
    primaryApplicationVI: 'Chất hoạt động bề mặt tạo bọt chính trong dầu gội, sữa tắm, kem đánh răng và điện di SDS-PAGE protein.',
    cleansingMechanismVI: 'Khi nồng độ > 8.2 mM, các đuôi hydrocacbon kỵ nước chụm vào tâm tạo micelle hình cầu bọc dầu mỡ, đầu sunfat ưa nước hướng ra ngoài giúp rửa trôi bằng nước sạch.'
  },
  sodium_stearate: {
    id: 'sodium_stearate',
    nameVI: 'Natri Stearat (Xà Phòng Truyền Thống)',
    tradeNameVI: 'Xà Bông Bánh (Soap)',
    iupacFormula: 'CH3-(CH2)16-COO⁻ Na⁺',
    surfactantType: 'ANIONIC',
    hydrophilicHeadGroupVI: 'Nhóm cacboxylat tích điện âm (-COO⁻)',
    lipophilicTailGroupVI: 'Chuỗi ankyl dài 17 cacbon (C17H35-)',
    criticalMicelleConcentrationMolar: 0.0006, // 0.6 mM
    aggregationNumberN: 80,
    pureWaterSurfaceTensionPlateau_mNm: 32.0,
    griffinHLB: 18.0,
    primaryApplicationVI: 'Xà phòng bánh rửa tay, tẩy rửa sinh hoạt gia đình từ quá trình xà phòng hóa chất béo triolein/tristearin.',
    cleansingMechanismVI: 'Đuôi kỵ nước hòa tan chất bẩn bã nhờn không phân cực trên da, tạo thành các hạt nhũ tương nano bị cuốn theo dòng nước rửa.'
  },
  ctab: {
    id: 'ctab',
    nameVI: 'Xetyltrimetylamoni Bromua (CTAB)',
    tradeNameVI: 'Cetrimonium Bromide',
    iupacFormula: '[CH3-(CH2)15-N⁺(CH3)3] Br⁻',
    surfactantType: 'CATIONIC',
    hydrophilicHeadGroupVI: 'Nhóm amoni bậc bốn tích điện dương (-N⁺(CH3)3)',
    lipophilicTailGroupVI: 'Chuỗi ankyl 16 cacbon (C16H33-)',
    criticalMicelleConcentrationMolar: 0.00092, // 0.92 mM
    aggregationNumberN: 90,
    pureWaterSurfaceTensionPlateau_mNm: 36.0,
    griffinHLB: 15.8,
    primaryApplicationVI: 'Thuốc sát trùng vết thương, chất xả mượt tóc chống tĩnh điện, chất định hướng tổng hợp thanh nano vàng.',
    cleansingMechanismVI: 'Đầu cation dương gắn chặt vào màng tế bào vi khuẩn tích điện âm, phá vỡ cấu trúc lipid màng gây tiêu diệt vi sinh vật.'
  },
  triton_x100: {
    id: 'triton_x100',
    nameVI: 'Triton X-100 (Chất Hoạt Động Bề Mặt Không Ion)',
    tradeNameVI: 'Polyethylene Glycol Octylphenyl Ether',
    iupacFormula: 'C8H17-C6H4-(OCH2CH2)9-10-OH',
    surfactantType: 'NON_IONIC',
    hydrophilicHeadGroupVI: 'Chuỗi polyoxyetylen trung hòa điện (-[O-CH2-CH2]n-OH)',
    lipophilicTailGroupVI: 'Nhóm isooctylphenyl cồng kềnh',
    criticalMicelleConcentrationMolar: 0.00024, // 0.24 mM
    aggregationNumberN: 140,
    pureWaterSurfaceTensionPlateau_mNm: 31.0,
    griffinHLB: 13.5,
    primaryApplicationVI: 'Chất tẩy rửa màng sinh học êm dịu, không làm biến tính protein trong phòng thí nghiệm sinh hóa.',
    cleansingMechanismVI: 'Phân tử không phân ly thành ion nên không bị kết tủa bởi nước cứng (ion Ca²⁺, Mg²⁺), duy trì hoạt tính tẩy rửa tuyệt hảo ở mọi độ cứng nước.'
  }
};

// ==========================================
// 3. QUANTITATIVE PHYSICAL CALCULATORS
// ==========================================

/**
 * Calculates Rayleigh Scattering Intensity (Tyndall Effect)
 * I_scattered ∝ 1 / λ^4
 * Compares relative scattering between blue light (450 nm) and red light (700 nm)
 */
export function calculateRayleighTyndallScattering(
  particleRadiusNm: number,
  wavelengthNm: number
): {
  wavelengthNm: number;
  relativeIntensityNormalized: number; // relative to 550nm green light
  colorAppearanceVI: string;
  isRayleighRegime: boolean; // True if 2*pi*r / lambda < 0.1
} {
  if (wavelengthNm <= 0 || particleRadiusNm <= 0) {
    throw new Error('Bước sóng và bán kính hạt phải lớn hơn 0.');
  }

  // Parameter size x = 2 * pi * r / lambda
  const sizeParam = (2 * Math.PI * particleRadiusNm) / wavelengthNm;
  const isRayleighRegime = sizeParam < 0.3; // Rayleigh scattering valid for small particles

  // I ∝ 1 / lambda^4
  // Reference: 550 nm (mid-visible green)
  const refWavelength = 550.0;
  const relativeIntensity = Math.pow(refWavelength / wavelengthNm, 4);

  let colorAppearanceVI = '';
  if (wavelengthNm < 490) {
    colorAppearanceVI = 'Ánh sáng lam/tím: tán xạ cực mạnh (làm khói và sol keo có màu lam nhạt đặc trưng).';
  } else if (wavelengthNm < 580) {
    colorAppearanceVI = 'Ánh sáng lục/vàng: tán xạ trung bình.';
  } else {
    colorAppearanceVI = 'Ánh sáng cam/đỏ: tán xạ rất yếu, truyền thẳng tốt (giải thích tại sao hoàng hôn có màu đỏ).';
  }

  return {
    wavelengthNm,
    relativeIntensityNormalized: Math.round(relativeIntensity * 100) / 100,
    colorAppearanceVI,
    isRayleighRegime
  };
}

/**
 * Calculates Einstein-Smoluchowski Brownian Diffusion Coefficient & Mean Displacement
 * D = (k_B * T) / (6 * pi * eta * r)
 * <x^2> = 2 * D * t
 */
export function calculateBrownianMotionDiffusion(
  particleRadiusNm: number,
  temperatureCelsius: number = 25,
  timeSeconds: number = 1.0,
  viscosityPaS: number = WATER_VISCOSITY_20C
): {
  diffusionCoefficientM2s: number;
  meanDisplacementMicrons: number;
  rmsDisplacementDisplay: string;
  interpretationVI: string;
} {
  if (particleRadiusNm <= 0 || timeSeconds <= 0) {
    throw new Error('Bán kính hạt và thời gian phải lớn hơn 0.');
  }

  const tempKelvin = temperatureCelsius + 273.15;
  const radiusMeters = particleRadiusNm * 1e-9;

  // D = (k_B * T) / (6 * pi * eta * r)
  const D = (BOLTZMANN_CONSTANT * tempKelvin) / (6 * Math.PI * viscosityPaS * radiusMeters);

  // Mean square displacement <x^2> = 2 * D * t
  const meanSquareDisplacement = 2 * D * timeSeconds;
  const rmsDisplacementMeters = Math.sqrt(meanSquareDisplacement);
  const rmsDisplacementMicrons = rmsDisplacementMeters * 1e6;

  return {
    diffusionCoefficientM2s: Number(D.toExponential(3)),
    meanDisplacementMicrons: Math.round(rmsDisplacementMicrons * 100) / 100,
    rmsDisplacementDisplay: `${rmsDisplacementMicrons.toFixed(2)} µm`,
    interpretationVI: `Ở nhiệt độ ${temperatureCelsius}°C, va chạm nhiệt của các phân tử nước làm hạt keo bán kính ${particleRadiusNm} nm dịch chuyển hỗn loạn khoảng cách bình phương trung bình ${rmsDisplacementMicrons.toFixed(2)} µm sau mỗi ${timeSeconds} giây.`
  };
}

/**
 * Calculates Young-Laplace Pressure inside a spherical droplet or soap bubble
 * Droplet: ΔP = 2γ / R
 * Bubble (two surfaces): ΔP = 4γ / R
 */
export function calculateYoungLaplacePressure(
  surfaceTension_mNm: number,
  radiusMicrons: number,
  isBubbleWithTwoSurfaces: boolean = false
): {
  overpressurePascals: number;
  overpressureAtm: number;
  interpretationVI: string;
} {
  if (surfaceTension_mNm <= 0 || radiusMicrons <= 0) {
    throw new Error('Sức căng bề mặt và bán kính phải lớn hơn 0.');
  }

  // gamma in N/m (1 mN/m = 1e-3 N/m)
  const gamma = surfaceTension_mNm * 1e-3;
  // radius in meters (1 um = 1e-6 m)
  const radius = radiusMicrons * 1e-6;

  // Factor: 4 for bubble (inside & outside film), 2 for liquid droplet
  const factor = isBubbleWithTwoSurfaces ? 4.0 : 2.0;
  const deltaP = (factor * gamma) / radius;

  // 1 atm = 101,325 Pa
  const deltaP_atm = deltaP / 101325;

  return {
    overpressurePascals: Math.round(deltaP * 10) / 10,
    overpressureAtm: Number(deltaP_atm.toExponential(3)),
    interpretationVI: `Áp suất mao dẫn phụ bên trong ${isBubbleWithTwoSurfaces ? 'bọt xà phòng' : 'giọt chất lỏng'} bán kính ${radiusMicrons} µm cao hơn môi trường ngoài ${Math.round(deltaP)} Pa (${deltaP_atm.toFixed(4)} atm). Giọt càng nhỏ thì áp suất nén bên trong càng lớn.`
  };
}

/**
 * Calculates Langmuir Adsorption Isotherm
 * θ = (K * C) / (1 + K * C)
 */
export function calculateLangmuirAdsorption(
  adsorptionConstantK: number,
  concentrationMolar: number
): {
  surfaceCoverageFractionTheta: number; // 0 to 1
  surfaceCoveragePercent: number; // 0 to 100%
  adsorptionRegimeVI: 'HENRY_LINEAR_REGIME' | 'TRANSITIONAL_REGIME' | 'MONOLAYER_SATURATION';
  explanationVI: string;
} {
  if (adsorptionConstantK <= 0 || concentrationMolar < 0) {
    throw new Error('Hằng số hấp phụ K phải lớn hơn 0 và nồng độ không âm.');
  }

  const kc = adsorptionConstantK * concentrationMolar;
  const theta = kc / (1 + kc);
  const thetaPercent = Math.min(100, Math.round(theta * 1000) / 10);

  let adsorptionRegimeVI: 'HENRY_LINEAR_REGIME' | 'TRANSITIONAL_REGIME' | 'MONOLAYER_SATURATION';
  let explanationVI = '';

  if (kc < 0.1) {
    adsorptionRegimeVI = 'HENRY_LINEAR_REGIME';
    explanationVI = 'Vùng tuyến tính Henry: Nồng độ thấp, lượng chất bị hấp phụ tỉ lệ thuận trực tiếp với nồng độ (θ ≈ K·C).';
  } else if (kc <= 10.0) {
    adsorptionRegimeVI = 'TRANSITIONAL_REGIME';
    explanationVI = 'Vùng chuyển tiếp: Bề mặt chất hấp phụ bắt đầu bị che phủ đáng kể, đường đẳng nhiệt uốn cong.';
  } else {
    adsorptionRegimeVI = 'MONOLAYER_SATURATION';
    explanationVI = 'Vùng bão hòa đơn lớp: Tất cả các tâm hấp phụ trên bề mặt đã được lấp đầy (θ → 1.0). Tăng thêm nồng độ không làm tăng lượng hấp phụ.';
  }

  return {
    surfaceCoverageFractionTheta: Math.round(theta * 1000) / 1000,
    surfaceCoveragePercent: thetaPercent,
    adsorptionRegimeVI,
    explanationVI
  };
}

/**
 * Calculates Schulze-Hardy Coagulation Threshold (Quy tắc Schulze-Hardy)
 * Critical Coagulation Concentration: CCC ∝ 1 / z^6
 */
export function calculateSchulzeHardyCoagulation(
  counterIonValencyZ: number,
  baseConcentrationMolar: number = 100.0 // Base CCC for monovalent ion z = 1 in mM
): {
  valencyZ: number;
  relativeCoagulationPower: number; // Power = z^6
  criticalConcentration_mM: number; // CCC = base / z^6
  interpretationVI: string;
} {
  if (counterIonValencyZ <= 0) {
    throw new Error('Hóa trị ion phải là số nguyên dương (1, 2, 3, 4).');
  }

  const z = Math.round(counterIonValencyZ);
  const relativePower = Math.pow(z, 6);
  const ccc_mM = baseConcentrationMolar / relativePower;

  return {
    valencyZ: z,
    relativeCoagulationPower: relativePower,
    criticalConcentration_mM: Number(ccc_mM.toFixed(4)),
    interpretationVI: `Ion hóa trị ${z} có năng lực keo tụ mạnh gấp ${relativePower.toLocaleString()} lần so với ion hóa trị 1 (tỉ lệ 1/z⁶). Nồng độ keo tụ tới hạn giảm từ ${baseConcentrationMolar} mM xuống chỉ còn ${ccc_mM.toFixed(4)} mM.`
  };
}

/**
 * Matches card or substance name with Colloid & Surface Chemistry concept
 */
export function getMatchingColloidSurfaceConcept(cardIdOrFormula: string): {
  dispersedSystem?: DispersedSystemDef;
  surfactant?: SurfactantPresetDef;
} | null {
  const norm = cardIdOrFormula.trim().toLowerCase();

  // Fe(OH)3 or Iron sol
  if (norm.includes('fe(oh)3') || (norm.includes('fe') && norm.includes('sol')) || norm.includes('sat_hidroxit')) {
    return {
      dispersedSystem: DISPERSED_SYSTEMS_CATALOG.fe_oh_3_sol
    };
  }

  // Soap / Stearate
  if (norm.includes('soap') || norm.includes('xa_phong') || norm.includes('stearat') || norm.includes('c17h35coo')) {
    return {
      surfactant: SURFACTANTS_CATALOG.sodium_stearate
    };
  }

  // SDS / Detergent
  if (norm.includes('sds') || norm.includes('sls') || norm.includes('dodecyl') || norm.includes('tay_rua')) {
    return {
      surfactant: SURFACTANTS_CATALOG.sodium_dodecyl_sulfate
    };
  }

  // Milk / Emulsion / Lipid
  if (norm.includes('milk') || norm.includes('sua') || norm.includes('emulsion') || norm.includes('nhu_tuong')) {
    return {
      dispersedSystem: DISPERSED_SYSTEMS_CATALOG.milk_emulsion
    };
  }

  // Gel / Agar / Gelatin
  if (norm.includes('gel') || norm.includes('agar') || norm.includes('thach') || norm.includes('gelatin')) {
    return {
      dispersedSystem: DISPERSED_SYSTEMS_CATALOG.agar_gel
    };
  }

  // Clay / Silt / Suspension
  if (norm.includes('clay') || norm.includes('phu_sa') || norm.includes('huyen_phu') || norm.includes('dat_set')) {
    return {
      dispersedSystem: DISPERSED_SYSTEMS_CATALOG.clay_suspension
    };
  }

  // NaCl true solution
  if (norm === 'nacl' || norm === 'muoi_an') {
    return {
      dispersedSystem: DISPERSED_SYSTEMS_CATALOG.nacl_solution
    };
  }

  return null;
}
