// src/domain/xpsSpectroscopyEngine.ts
// Milestone 53: X-Ray Photoelectron Spectroscopy (XPS / ESCA), Auger Electron Spectroscopy (AES) & Chemical Shift Engine
// Standards: Nobel Prize in Physics 1981 (Kai Siegbahn - High-Resolution Electron Spectroscopy / ESCA) & Nobel Prize in Physics 1921 (Albert Einstein - Photoelectric Effect)
// Curriculum: Vietnam GDPT 2018 (Hóa học 10: Năng lượng ion hóa I_n, phân lớp electron; Hóa học 11: Số oxi hóa, liên kết cộng hóa trị có cực; Hóa học 12: Hóa học bề mặt & Vật liệu bán dẫn)

export type XpsXRaySource = 'AL_KA' | 'MG_KA';

export interface XpsPeakComponent {
  id: string;
  label: string;
  chemicalStateVI: string;
  oxidationState: string;
  centerBindingEnergyEv: number;
  fwhmEv: number; // Full Width at Half Maximum (eV)
  areaPercentage: number; // Relative percentage of total core-level envelope
  spinOrbitPartner?: string;
  branchingRatio?: number; // e.g. 0.5 for 2p1/2:2p3/2, 0.75 for 4f5/2:4f7/2
  colorHex: string;
  descriptionVI: string;
}

export interface AugerTransition {
  label: string;
  kineticEnergyEv: number;
  initialHole: string;
  relaxedState: string;
  descriptionVI: string;
}

export interface XpsSampleProfile {
  id: string;
  name: string;
  nameVI: string;
  chemicalFormula: string;
  coreElement: string;
  coreOrbital: string;
  materialClassVI: string;
  surveyRange: [number, number]; // [minBindingEnergy, maxBindingEnergy] in eV
  highResRange: [number, number]; // [minBindingEnergy, maxBindingEnergy] in eV
  adventitiousCarbonShiftEv: number; // Correction relative to 284.8 eV
  components: XpsPeakComponent[];
  augerTransitions: AugerTransition[];
  descriptionVI: string;
  colorHex: string;
}

export interface XpsSimulationResult {
  sample: XpsSampleProfile;
  xraySource: XpsXRaySource;
  photonEnergyEv: number;
  analyzerWorkFunctionEv: number;
  takeOffAngleDeg: number;
  imfpNm: number;
  samplingDepthNm: number;
  spectrum: {
    bindingEnergies: number[];
    kineticEnergies: number[];
    totalIntensity: number[];
    componentIntensities: { id: string; label: string; color: string; intensities: number[] }[];
  };
  pedagogicalAnalysisVI: string;
}

// ============================================================================
// FUNDAMENTAL CONSTANTS & SPECTROMETER PARAMETERS (IUPAC / CODATA)
// ============================================================================
export const XRAY_SOURCE_ENERGIES_EV: Record<XpsXRaySource, { name: string; energyEv: number; naturalLinewidthEv: number }> = {
  AL_KA: {
    name: 'Al Kα (Monochromatized Aluminum Anode)',
    energyEv: 1486.6,
    naturalLinewidthEv: 0.85
  },
  MG_KA: {
    name: 'Mg Kα (Standard Magnesium Anode)',
    energyEv: 1253.6,
    naturalLinewidthEv: 0.70
  }
};

export const STANDARD_SPECTROMETER_WORK_FUNCTION_EV = 4.3; // eV (Typical hemispherical analyzer calibration)
export const C1S_ADVENTITIOUS_CARBON_STANDARD_EV = 284.8; // eV (Universal ISO/ASTM adventitious C-C/C-H sp3 reference)

// ============================================================================
// EXPERIMENTAL XPS STANDARDS CATALOG
// ============================================================================
export const XPS_CATALOG: Record<string, XpsSampleProfile> = {
  graphene_oxide_sheet: {
    id: 'graphene_oxide_sheet',
    name: 'Graphene Oxide Nanoflakes (GO)',
    nameVI: 'Tấm Graphene Oxide (Phân Tích Chuyển Dịch Hóa Học Nhóm Chức Carbon C 1s)',
    chemicalFormula: 'C_xO_yH_z (Graphene Oxide)',
    coreElement: 'Carbon (C)',
    coreOrbital: 'C 1s',
    materialClassVI: 'Vật liệu carbon 2 chiều chức hóa bề mặt',
    surveyRange: [0, 1000],
    highResRange: [280, 294],
    adventitiousCarbonShiftEv: 0.0,
    colorHex: '#38bdf8',
    descriptionVI: 'Phổ C 1s phân giải cao giải chập thành 4 nhóm chức: liên kết C-C/C-H không phân cực ở 284.8 eV, liên kết C-O (hydroxyl/epoxy) ở 286.7 eV (+1.9 eV), nhóm carbonyl C=O ở 288.1 eV (+3.3 eV) và carboxyl O-C=O ở 289.2 eV (+4.4 eV).',
    components: [
      {
        id: 'c_sp2_sp3',
        label: 'C-C / C-H (sp³ & sp²)',
        chemicalStateVI: 'Mạng khung carbon aliphatic / aromatic',
        oxidationState: '0',
        centerBindingEnergyEv: 284.8,
        fwhmEv: 1.15,
        areaPercentage: 42.0,
        colorHex: '#94a3b8',
        descriptionVI: 'Chuẩn năng lượng liên kết IUPAC 284.8 eV hiệu chuẩn bề mặt (Adventitious Carbon calibration).'
      },
      {
        id: 'c_o_epoxy_hydroxyl',
        label: 'C-O (Epoxy & Hydroxyl)',
        chemicalStateVI: 'Nhóm ether vòng oxirane và alcohol -OH',
        oxidationState: '+1',
        centerBindingEnergyEv: 286.7,
        fwhmEv: 1.25,
        areaPercentage: 35.0,
        colorHex: '#38bdf8',
        descriptionVI: 'Độ âm điện lớn của oxy (χ = 3.44) hút mật độ electron làm tăng lực hút hạt nhân lên electron 1s, dịch chuyển +1.9 eV.'
      },
      {
        id: 'c_double_o_carbonyl',
        label: 'C=O (Carbonyl)',
        chemicalStateVI: 'Nhóm aldehyde và ketone',
        oxidationState: '+2',
        centerBindingEnergyEv: 288.1,
        fwhmEv: 1.25,
        areaPercentage: 15.0,
        colorHex: '#f59e0b',
        descriptionVI: 'Liên kết đôi C=O làm giảm chắn hạt nhân mạnh hơn, năng lượng liên kết tăng vọt lên 288.1 eV (+3.3 eV).'
      },
      {
        id: 'o_c_double_o_carboxyl',
        label: 'O-C=O (Carboxyl / Ester)',
        chemicalStateVI: 'Nhóm acid carboxylic -COOH ở biên tấm nano',
        oxidationState: '+3',
        centerBindingEnergyEv: 289.2,
        fwhmEv: 1.30,
        areaPercentage: 8.0,
        colorHex: '#ef4444',
        descriptionVI: 'Hai nguyên tử oxy có độ âm điện cao cùng kéo electron tạo chuyển dịch hóa học cực đại +4.4 eV.'
      }
    ],
    augerTransitions: [
      {
        label: 'C KLL',
        kineticEnergyEv: 260.0,
        initialHole: 'K shell (1s)',
        relaxedState: 'L1 L2,3 double hole',
        descriptionVI: 'Chuyển dời Auger không bức xạ C KLL đặc trưng giải phóng electron động năng ~260 eV.'
      },
      {
        label: 'O KLL',
        kineticEnergyEv: 512.0,
        initialHole: 'K shell (1s)',
        relaxedState: 'L shell double hole',
        descriptionVI: 'Đỉnh Auger oxy O KLL xuất hiện do hàm lượng oxy phong phú trong graphene oxide.'
      }
    ]
  },

  tio2_anatase_nanoparticles: {
    id: 'tio2_anatase_nanoparticles',
    name: 'Titanium Dioxide Anatase (TiO₂)',
    nameVI: 'Titanium Dioxide Anatase (Tách Vạch Spin-Orbit Ti 2p & Trạng Thái Oxi Hóa Ti⁴⁺)',
    chemicalFormula: 'TiO₂ (Anatase Phase)',
    coreElement: 'Titanium (Ti)',
    coreOrbital: 'Ti 2p',
    materialClassVI: 'Oxit bán dẫn quang xúc tác & pin mặt trời perovskite',
    surveyRange: [0, 1100],
    highResRange: [450, 470],
    adventitiousCarbonShiftEv: 0.0,
    colorHex: '#10b981',
    descriptionVI: 'Phổ Ti 2p thể hiện sự tách vạch spin-orbit rõ rệt thành cặp doublet Ti 2p3/2 (458.7 eV) và Ti 2p1/2 (464.4 eV) với khoảng cách cố định ΔE = 5.7 eV và tỷ lệ diện tích lý thuyết đúng 2:1 (do độ thoái biến 2j+1).',
    components: [
      {
        id: 'ti_2p_3_2_ti4',
        label: 'Ti 2p₃/₂ (Ti⁴⁺ in TiO₂)',
        chemicalStateVI: 'Trạng thái oxi hóa cực đại Ti(IV) phối trí bát diện [TiO₆]',
        oxidationState: '+4',
        centerBindingEnergyEv: 458.7,
        fwhmEv: 1.10,
        areaPercentage: 66.67,
        spinOrbitPartner: 'ti_2p_1_2_ti4',
        branchingRatio: 1.0,
        colorHex: '#10b981',
        descriptionVI: 'Đỉnh chủ đạo Ti 2p3/2 tại 458.7 eV, dịch chuyển +4.9 eV so với kim loại Ti° (453.8 eV) do mất 4 electron hóa trị.'
      },
      {
        id: 'ti_2p_1_2_ti4',
        label: 'Ti 2p₁/₂ (Ti⁴⁺ in TiO₂)',
        chemicalStateVI: 'Vạch tách cặp spin-orbit j = 1/2',
        oxidationState: '+4',
        centerBindingEnergyEv: 464.4,
        fwhmEv: 1.45,
        areaPercentage: 33.33,
        spinOrbitPartner: 'ti_2p_3_2_ti4',
        branchingRatio: 0.5,
        colorHex: '#059669',
        descriptionVI: 'Đỉnh Ti 2p1/2 tại 464.4 eV. Tương tác spin-quỹ đạo (l·s) phân tách trạng thái 2p thành j=3/2 và j=1/2 cách nhau đúng 5.7 eV.'
      }
    ],
    augerTransitions: [
      {
        label: 'Ti L3M23M23',
        kineticEnergyEv: 418.0,
        initialHole: 'L3 subshell',
        relaxedState: 'M2,3 double hole',
        descriptionVI: 'Đỉnh phát xạ Auger chuyển mức L-M-M đặc trưng của kim loại chuyển tiếp titanium.'
      }
    ]
  },

  silicon_native_oxide_wafer: {
    id: 'silicon_native_oxide_wafer',
    name: 'Silicon Wafer with Native Oxide (Si / SiO₂)',
    nameVI: 'Phiến Bán Dẫn Silicon Phủ Màng Oxit Tự Nhiên (Si⁰ Substrate vs SiO₂ Dielectric)',
    chemicalFormula: 'Si / SiO₂ (Semiconductor Heterojunction)',
    coreElement: 'Silicon (Si)',
    coreOrbital: 'Si 2p',
    materialClassVI: 'Vật liệu bán dẫn tích hợp vi mạch VLSI',
    surveyRange: [0, 1000],
    highResRange: [96, 108],
    adventitiousCarbonShiftEv: 0.0,
    colorHex: '#6366f1',
    descriptionVI: 'Minh chứng kinh điển trong công nghệ vi mạch máy tính: Phổ Si 2p phân biệt rõ rệt lớp nền đơn tinh thể Si° kim loại ở 99.3 eV và lớp màng oxit cách điện SiO₂ tự nhiên dày 1.8 nm ở 103.5 eV (chuyển dịch hóa học khổng lồ +4.2 eV).',
    components: [
      {
        id: 'si_substrate_zero',
        label: 'Si 2p₃/₂ & 2p₁/₂ (Si⁰ Substrate)',
        chemicalStateVI: 'Silicon đơn tinh thể kim loại (Bulk substrate)',
        oxidationState: '0',
        centerBindingEnergyEv: 99.3,
        fwhmEv: 0.75,
        areaPercentage: 55.0,
        colorHex: '#6366f1',
        descriptionVI: 'Liên kết đồng vị Si-Si cộng hóa trị không phân cực tại 99.3 eV với vạch quang phổ siêu hẹp (FWHM = 0.75 eV).'
      },
      {
        id: 'si_suboxide_intermediate',
        label: 'Si¹⁺, Si²⁺, Si³⁺ (Sub-oxides)',
        chemicalStateVI: 'Trạng thái chuyển tiếp tại mặt phân giới Si/SiO₂',
        oxidationState: '+1 to +3',
        centerBindingEnergyEv: 101.5,
        fwhmEv: 1.30,
        areaPercentage: 10.0,
        colorHex: '#a855f7',
        descriptionVI: 'Các trạng thái oxi hóa trung gian (Si₂O, SiO, Si₂O₃) phân bố tại ranh giới chuyển tiếp dày 0.5 nm.'
      },
      {
        id: 'si_dioxide_film',
        label: 'Si 2p (SiO₂ Native Dielectric)',
        chemicalStateVI: 'Màng oxit tự nhiên vô định hình tứ diện [SiO₄]',
        oxidationState: '+4',
        centerBindingEnergyEv: 103.5,
        fwhmEv: 1.35,
        areaPercentage: 35.0,
        colorHex: '#ec4899',
        descriptionVI: 'Mỗi liên kết Si-O rút điện tích làm tăng thế tĩnh điện nội tại nguyên tử silicon, tạo độ chuyển dịch hóa học +4.2 eV.'
      }
    ],
    augerTransitions: [
      {
        label: 'Si LVV',
        kineticEnergyEv: 92.0,
        initialHole: 'L subshell',
        relaxedState: 'Valence band double hole',
        descriptionVI: 'Vạch Auger Si LVV cực nhạy cảm với liên kết hóa trị và trạng thái bề mặt silicon.'
      }
    ]
  },

  gold_thin_film_au: {
    id: 'gold_thin_film_au',
    name: 'Polycrystalline Gold Film (Au 4f Standard)',
    nameVI: 'Màng Vàng Tinh Khiết Chuẩn Quốc Tế (Chuẩn Năng Lượng Liên Kết Au 4f & Công Thoát)',
    chemicalFormula: 'Au (Pure Gold Film)',
    coreElement: 'Gold (Au)',
    coreOrbital: 'Au 4f',
    materialClassVI: 'Kim loại quý dẫn điện cao & chuẩn hiệu chuẩn XPS quốc tế',
    surveyRange: [0, 1000],
    highResRange: [80, 93],
    adventitiousCarbonShiftEv: 0.0,
    colorHex: '#eab308',
    descriptionVI: 'Chuẩn năng lượng vàng quốc tế (IUPAC / ISO TC 201). Cặp doublet Au 4f7/2 (84.00 eV) và Au 4f5/2 (87.67 eV) có độ phân giải cao nhất với khoảng cách tách vạch spin-orbit 3.67 eV và tỷ lệ diện tích 4:3 (l=3, j=7/2 và 5/2).',
    components: [
      {
        id: 'au_4f_7_2',
        label: 'Au 4f₇/₂ (Zero-Valent Au⁰)',
        chemicalStateVI: 'Kim loại vàng tự do cấu trúc lập phương tâm mặt (FCC)',
        oxidationState: '0',
        centerBindingEnergyEv: 84.0,
        fwhmEv: 0.72,
        areaPercentage: 57.14,
        spinOrbitPartner: 'au_4f_5_2',
        branchingRatio: 1.0,
        colorHex: '#eab308',
        descriptionVI: 'Chuẩn năng lượng liên kết vàng Au 4f7/2 được ấn định đúng 84.00 ± 0.02 eV để hiệu chuẩn máy quang phổ.'
      },
      {
        id: 'au_4f_5_2',
        label: 'Au 4f₅/₂ (Spin-Orbit Partner)',
        chemicalStateVI: 'Trạng thái spin-quỹ đạo j = 5/2',
        oxidationState: '0',
        centerBindingEnergyEv: 87.67,
        fwhmEv: 0.75,
        areaPercentage: 42.86,
        spinOrbitPartner: 'au_4f_7_2',
        branchingRatio: 0.75,
        colorHex: '#ca8a04',
        descriptionVI: 'Đỉnh tách cặp Au 4f5/2 cách 3.67 eV. Tỷ lệ diện tích phân nhánh (2j+1) bằng (2*3.5+1)/(2*2.5+1) = 8/6 = 4:3.'
      }
    ],
    augerTransitions: [
      {
        label: 'Au M4N67N67',
        kineticEnergyEv: 2015.0,
        initialHole: 'M4 subshell',
        relaxedState: 'N shell double hole',
        descriptionVI: 'Chuyển dời Auger năng lượng cao của kim loại vàng nặng chu kỳ 6.'
      }
    ]
  }
};

// ============================================================================
// CORE MATHEMATICAL EQUATIONS & CALCULATION ENGINE
// ============================================================================

/**
 * Calculates electron Binding Energy from measured Kinetic Energy:
 * E_binding = hν - E_kinetic - Φ_analyzer
 * (Einstein-Siegbahn Photoelectric Relation)
 */
export function calculateBindingEnergy(
  kineticEnergyEv: number,
  xraySource: XpsXRaySource = 'AL_KA',
  analyzerWorkFunctionEv: number = STANDARD_SPECTROMETER_WORK_FUNCTION_EV
): number {
  const hNu = XRAY_SOURCE_ENERGIES_EV[xraySource].energyEv;
  const eb = hNu - kineticEnergyEv - analyzerWorkFunctionEv;
  return Number(eb.toFixed(3));
}

/**
 * Calculates electron Kinetic Energy from known Binding Energy:
 * E_kinetic = hν - E_binding - Φ_analyzer
 */
export function calculateKineticEnergy(
  bindingEnergyEv: number,
  xraySource: XpsXRaySource = 'AL_KA',
  analyzerWorkFunctionEv: number = STANDARD_SPECTROMETER_WORK_FUNCTION_EV
): number {
  const hNu = XRAY_SOURCE_ENERGIES_EV[xraySource].energyEv;
  const ek = hNu - bindingEnergyEv - analyzerWorkFunctionEv;
  return Number(Math.max(0, ek).toFixed(3));
}

/**
 * Calculates Inelastic Mean Free Path (IMFP) and XPS Sampling Depth:
 * Uses Seah & Dench semi-empirical relationship:
 * λ_IMFP ≈ 0.05 * sqrt(E_kinetic) (nm)
 * Sampling depth d_sampling = 3 * λ_IMFP * cos(θ_takeoff) (nm)
 * Emits ~95% of total detected photoelectrons within 3λ depth.
 */
export function calculateSamplingDepth(
  kineticEnergyEv: number,
  takeOffAngleDeg: number = 0 // 0° = surface normal (maximum penetration), 60° = surface sensitive
): { imfpNm: number; samplingDepthNm: number } {
  const ek = Math.max(10, kineticEnergyEv);
  const imfpNm = Number((0.055 * Math.sqrt(ek)).toFixed(2));
  const rad = (takeOffAngleDeg * Math.PI) / 180.0;
  const samplingDepthNm = Number((3.0 * imfpNm * Math.cos(rad)).toFixed(2));
  return { imfpNm, samplingDepthNm };
}

/**
 * Pseudo-Voigt Profile Function (Sum of Gaussian and Lorentzian functions):
 * V(E) = η * L(E) + (1 - η) * G(E)
 * Where η is the Lorentzian fraction (typically 0.3 for core XPS lines).
 */
function pseudoVoigt(
  energy: number,
  center: number,
  fwhm: number,
  area: number,
  lorentzianFraction: number = 0.3
): number {
  const sigma = fwhm / (2 * Math.sqrt(2 * Math.log(2)));
  const gamma = fwhm / 2;
  const deltaE = energy - center;

  const gaussian = (1 / (sigma * Math.sqrt(2 * Math.PI))) * Math.exp(-(deltaE * deltaE) / (2 * sigma * sigma));
  const lorentzian = (1 / Math.PI) * (gamma / (deltaE * deltaE + gamma * gamma));

  return area * (lorentzianFraction * lorentzian + (1 - lorentzianFraction) * gaussian);
}

/**
 * Simulates high-resolution XPS core-level deconvolution spectrum
 */
export function simulateXpsSpectrum(
  sampleId: string,
  xraySource: XpsXRaySource = 'AL_KA',
  takeOffAngleDeg: number = 0,
  analyzerWorkFunctionEv: number = STANDARD_SPECTROMETER_WORK_FUNCTION_EV
): XpsSimulationResult {
  const sample = XPS_CATALOG[sampleId] || XPS_CATALOG.graphene_oxide_sheet;
  const photonEnergyEv = XRAY_SOURCE_ENERGIES_EV[xraySource].energyEv;

  const [minEb, maxEb] = sample.highResRange;
  const numPoints = 140;
  const step = (maxEb - minEb) / (numPoints - 1);

  const bindingEnergies: number[] = [];
  const kineticEnergies: number[] = [];
  const totalIntensity: number[] = new Array(numPoints).fill(0);
  const componentIntensities = sample.components.map((comp) => ({
    id: comp.id,
    label: comp.label,
    color: comp.colorHex,
    intensities: new Array(numPoints).fill(0)
  }));

  // Average kinetic energy of core level
  const avgEb = (minEb + maxEb) / 2;
  const avgEk = calculateKineticEnergy(avgEb, xraySource, analyzerWorkFunctionEv);
  const { imfpNm, samplingDepthNm } = calculateSamplingDepth(avgEk, takeOffAngleDeg);

  // Surface sensitivity attenuation factor for deeper layers when angle is high
  const angleFactor = Math.cos((takeOffAngleDeg * Math.PI) / 180.0);

  // Generate energy grid (Binding energy from high to low as conventional in XPS)
  for (let i = 0; i < numPoints; i++) {
    const eb = maxEb - i * step;
    bindingEnergies.push(Number(eb.toFixed(2)));
    kineticEnergies.push(calculateKineticEnergy(eb, xraySource, analyzerWorkFunctionEv));
  }

  // Linear background + component synthesis
  const bgSlope = 12.0;
  const bgIntercept = 40.0;

  for (let i = 0; i < numPoints; i++) {
    const eb = bindingEnergies[i];
    // Baseline Shirley/linear background
    const baseline = bgIntercept + bgSlope * ((maxEb - eb) / (maxEb - minEb));
    let pointTotal = baseline;

    sample.components.forEach((comp, compIdx) => {
      // Scale area: surface oxide/carboxyl is enriched at grazing angles (low angleFactor)
      let adjustedArea = comp.areaPercentage * 10.0;
      if (comp.oxidationState !== '0' && angleFactor < 0.7) {
        adjustedArea *= 1.0 + (0.7 - angleFactor) * 0.8; // Surface enhancement
      }

      const val = pseudoVoigt(eb, comp.centerBindingEnergyEv, comp.fwhmEv, adjustedArea, 0.35);
      componentIntensities[compIdx].intensities[i] = Number(val.toFixed(2));
      pointTotal += val;
    });

    totalIntensity[i] = Number(pointTotal.toFixed(2));
  }

  // Construct rigorous pedagogical commentary
  const pedagogicalAnalysisVI = `Quang phổ quang điện tử tia X (XPS / ESCA) phân tích orbital lõi ${sample.coreOrbital} của ${sample.nameVI}. Dưới chùm photon tia X đơn sắc ${XRAY_SOURCE_ENERGIES_EV[xraySource].name} (hν = ${photonEnergyEv} eV), các electron liên kết sâu bị ion hóa theo định luật quang điện Einstein (Nobel Vật lý 1921). Theo phương trình Siegbahn (Nobel Vật lý 1981): E_binding = hν - E_kinetic - Φ_analyzer, động năng đo được E_kin ~ ${avgEk.toFixed(1)} eV phản ánh chính xác năng lượng liên kết E_b ~ ${avgEb.toFixed(1)} eV. Độ sâu lấy mẫu bề mặt cực nông d_sampling = ${samplingDepthNm} nm (quãng đường tự do không đàn hồi IMFP λ = ${imfpNm} nm). Chuyển dịch hóa học (Chemical shift) phân định rạch ròi các trạng thái oxi hóa: liên kết phân cực kéo electron làm suy giảm hiệu ứng chắn, tăng tương tác hút tĩnh điện hạt nhân khiến năng lượng liên kết dịch chuyển về vùng năng lượng cao hơn.`;

  return {
    sample,
    xraySource,
    photonEnergyEv,
    analyzerWorkFunctionEv,
    takeOffAngleDeg,
    imfpNm,
    samplingDepthNm,
    spectrum: {
      bindingEnergies,
      kineticEnergies,
      totalIntensity,
      componentIntensities
    },
    pedagogicalAnalysisVI
  };
}

/**
 * Card matching service: identifies if an ELEMENTA card corresponds to an XPS standard
 */
export function getMatchingXpsCard(card: { id?: string; name?: string; description?: string }): XpsSampleProfile | null {
  if (!card) return null;
  const text = `${card.id || ''} ${card.name || ''} ${card.description || ''}`.toLowerCase();

  if (text.includes('graphene') || text.includes('carbon') || text.includes('graphite') || text.includes('than chì')) {
    return XPS_CATALOG.graphene_oxide_sheet;
  }
  if (text.includes('titan') || text.includes('tio2') || text.includes('anatase') || text.includes('rutile')) {
    return XPS_CATALOG.tio2_anatase_nanoparticles;
  }
  if (text.includes('silic') || text.includes('silicon') || text.includes('sio2') || text.includes('wafer') || text.includes('vi mạch')) {
    return XPS_CATALOG.silicon_native_oxide_wafer;
  }
  if (text.includes('vàng') || text.includes('gold') || text.includes('au') || text.includes('hoàng kim')) {
    return XPS_CATALOG.gold_thin_film_au;
  }

  return null;
}
