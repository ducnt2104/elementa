/**
 * ELEMENTA - PHOTOCATALYTIC ARTIFICIAL PHOTOSYNTHESIS & Z-SCHEME WATER SPLITTING ENGINE
 *
 * Conforms to:
 * - IUPAC Physical & Semiconductor Photochemistry (Bandgap Engineering, Flat-band Potential, Redox Alignments)
 * - Nernst Equation pH-dependent potential shifts for HER (0.00 - 0.0591*pH V vs NHE) and OER (1.23 - 0.0591*pH V vs NHE)
 * - Dual-Absorber Biomimetic Z-Scheme (Photosystem I & II mimicry with solid-state & liquid redox relays)
 * - Solar-to-Hydrogen (STH) Conversion Efficiency & Apparent Quantum Yield (AQY) Standards (AM1.5G, 1000 W/m²)
 * - Core-Shell Cocatalyst Architecture (Rh/Cr2O3 suppress back-reaction 2H2 + O2 -> 2H2O, Co-Pi for OER)
 * - Vietnam GDPT 2018 Chemistry (Quang hóa học, Phản ứng oxi hóa khử, Bán dẫn, Năng lượng tái tạo)
 */

export type SemiconductorClass = 'HYDROGEN_EVOLUTION_HEP' | 'OXYGEN_EVOLUTION_OEP' | 'SINGLE_ABSORBER';

export type PhotocatalystId =
  | 'SRTIO3_RH'
  | 'GRAPHITIC_CARBON_NITRIDE_G_C3N4'
  | 'TANTALUM_OXYNITRIDE_TAON'
  | 'CADMIUM_SULFIDE_CDS'
  | 'BISMUTH_VANADATE_BIVO4'
  | 'TUNGSTEN_TRIOXIDE_WO3'
  | 'TANTALUM_NITRIDE_TA3N5'
  | 'TITANIUM_DIOXIDE_TIO2_ANATASE';

export interface PhotocatalystMaterial {
  id: PhotocatalystId;
  name: string;
  chemicalFormula: string;
  semiconductorClass: SemiconductorClass;
  bandgapEv: number;               // Bandgap Eg in eV
  absorptionEdgeNm: number;        // Wavelength absorption edge lambda = 1240 / Eg in nm
  conductionBandMinV: number;      // E_CB at pH 0 (V vs NHE)
  valenceBandMaxV: number;        // E_VB at pH 0 (V vs NHE)
  primaryLightHarvesting: 'UV' | 'UV_VISIBLE' | 'BROAD_VISIBLE';
  recommendedCocatalyst: string;
  description: string;
}

export type ZSchemeRelayType =
  | 'SOLID_STATE_SHEET_RGO_GOLD'
  | 'REDOX_MEDIATOR_IODATE_IODIDE'
  | 'REDOX_MEDIATOR_FERRI_FERROCYANIDE';

export interface ZSchemeRelay {
  id: ZSchemeRelayType;
  name: string;
  formula: string;
  type: 'SOLID_STATE_OHMIC' | 'LIQUID_REDOX_ION';
  redoxPotentialVVsNHE: number;   // E° in V vs NHE (0.0 for ohmic sheet)
  electronTransferRateKPerSec: number;
  backReactionSuppressionPct: number;
  description: string;
}

export interface ZSchemeSystem {
  id: string;
  name: string;
  hepId: PhotocatalystId;
  oepId: PhotocatalystId;
  relayType: ZSchemeRelayType;
  herCocatalyst: string;
  oerCocatalyst: string;
  nominalSthEfficiencyPct: number; // Experimental Solar-to-Hydrogen efficiency %
  aqyAt420nmPct: number;           // Apparent Quantum Yield at 420 nm %
  backReactionRateFactor: number;  // 0.0 to 1.0 (lower is better, e.g. 0.05 with Rh/Cr2O3 shell)
  summary: string;
}

export interface WaterSplittingThermodynamics {
  ph: number;
  standardPotentialVolts: number;   // 1.23 V at 25°C
  herPotentialVVsNHE: number;        // E(H+/H2) = -0.0591 * pH
  oerPotentialVVsNHE: number;        // E(O2/H2O) = 1.23 - 0.0591 * pH
  gibbsFreeEnergyKjPerMolH2: number; // +237.18 kJ/mol
  theoreticalMinPhotonsPerH2: number;// 4 photons for dual-step Z-scheme (2 for single)
}

export interface SolarHydrogenProductionYield {
  panelAreaM2: number;
  solarIrradianceWPerM2: number;    // Standard AM1.5G = 1000 W/m²
  sunHoursPerDay: number;           // e.g. 5.5 hours in Central Vietnam
  sthEfficiencyPct: number;
  hydrogenRateMolPerHour: number;
  hydrogenRateGramsPerHour: number;
  hydrogenDailyKg: number;
  oxygenDailyKg: number;
  cleanWaterConsumedLitersPerDay: number;
  fossilCo2AvoidedKgPerDay: number; // ~10 kg CO2 per kg H2 vs SMR grey H2
  equivalentCleanFuelKmPerDay: number; // FCEV mileage ~100 km/kg H2
}

/**
 * Standard Photochemical Constants & Reference Materials
 */
export const STANDARD_SOLAR_IRRADIANCE_AM15G = 1000; // W/m²
export const FARADAY_CONSTANT = 96485.33; // C/mol
export const GIBBS_ENERGY_WATER_SPLITTING_J = 237180; // J/mol H2
export const MOLAR_MASS_H2_G = 2.016; // g/mol
export const MOLAR_MASS_O2_G = 31.999; // g/mol
export const MOLAR_MASS_H2O_G = 18.015; // g/mol

export const PHOTOCATALYST_CATALOG: Record<PhotocatalystId, PhotocatalystMaterial> = {
  SRTIO3_RH: {
    id: 'SRTIO3_RH',
    name: 'Stronti Titanat Pha Tạp Rhodi (SrTiO₃:Rh)',
    chemicalFormula: 'SrTiO₃:Rh,Bi',
    semiconductorClass: 'HYDROGEN_EVOLUTION_HEP',
    bandgapEv: 2.40,
    absorptionEdgeNm: 517,
    conductionBandMinV: -0.85, // Negative enough for strong HER
    valenceBandMaxV: 1.55,
    primaryLightHarvesting: 'UV_VISIBLE',
    recommendedCocatalyst: 'Rh/Cr₂O₃ Core-Shell',
    description: 'Chất xúc tác quang tiến hóa hydro (HEP) hàng đầu. Khi được bọc vỏ nano Cr₂O₃, ngăn cản 99% phản ứng ngược tái hợp H₂ và O₂ thành H₂O, duy trì hiệu suất chia tách nước tinh khiết ổn định.'
  },
  GRAPHITIC_CARBON_NITRIDE_G_C3N4: {
    id: 'GRAPHITIC_CARBON_NITRIDE_G_C3N4',
    name: 'Carbon Nitrit Dạng Than Chì (g-C₃N₄)',
    chemicalFormula: 'g-C₃N₄',
    semiconductorClass: 'HYDROGEN_EVOLUTION_HEP',
    bandgapEv: 2.70,
    absorptionEdgeNm: 459,
    conductionBandMinV: -1.13, // Extremely negative conduction band
    valenceBandMaxV: 1.57,
    primaryLightHarvesting: 'UV_VISIBLE',
    recommendedCocatalyst: 'Pt / Ni₂P',
    description: 'Bán dẫn polymer 2D phi kim loại thân thiện môi trường. Vùng dẫn cực âm (-1.13 V vs NHE) tạo động lực khử proton (H⁺ → H₂) vượt trội mà không sử dụng kim loại quý đắt đỏ.'
  },
  TANTALUM_OXYNITRIDE_TAON: {
    id: 'TANTALUM_OXYNITRIDE_TAON',
    name: 'Tantan Oxynitrit (TaON)',
    chemicalFormula: 'TaON',
    semiconductorClass: 'HYDROGEN_EVOLUTION_HEP',
    bandgapEv: 2.50,
    absorptionEdgeNm: 496,
    conductionBandMinV: -0.34,
    valenceBandMaxV: 2.16,
    primaryLightHarvesting: 'UV_VISIBLE',
    recommendedCocatalyst: 'Pt / Ru',
    description: 'Vật liệu oxynitrit dải hẹp hấp thụ ánh sáng nhìn thấy. Dùng làm HEP trong các hệ Z-scheme thế hệ mới ghép với BiVO₄.'
  },
  CADMIUM_SULFIDE_CDS: {
    id: 'CADMIUM_SULFIDE_CDS',
    name: 'Cadmi Sunfua (CdS)',
    chemicalFormula: 'CdS',
    semiconductorClass: 'HYDROGEN_EVOLUTION_HEP',
    bandgapEv: 2.40,
    absorptionEdgeNm: 516,
    conductionBandMinV: -0.52,
    valenceBandMaxV: 1.88,
    primaryLightHarvesting: 'BROAD_VISIBLE',
    recommendedCocatalyst: 'MoS₂ / Pt',
    description: 'Vật liệu bán dẫn kinh điển hấp thụ ánh sáng vàng-cam nhìn thấy mạnh mẽ. Cần lớp phủ bảo vệ để hạn chế hiện tượng quang ăn mòn (photocorrosion) của ion S²⁻.'
  },
  BISMUTH_VANADATE_BIVO4: {
    id: 'BISMUTH_VANADATE_BIVO4',
    name: 'Bitmut Vanadat (BiVO₄)',
    chemicalFormula: 'BiVO₄:Mo',
    semiconductorClass: 'OXYGEN_EVOLUTION_OEP',
    bandgapEv: 2.40,
    absorptionEdgeNm: 517,
    conductionBandMinV: 0.02,
    valenceBandMaxV: 2.42, // Positive enough for powerful water oxidation (OER)
    primaryLightHarvesting: 'UV_VISIBLE',
    recommendedCocatalyst: 'Co-Pi (Cobalt Phosphate) / CoOₓ',
    description: 'Vua của xúc tác quang tiến hóa oxy (OEP) trong phổ khả kiến. Vùng hóa trị dương sâu (+2.42 V vs NHE) sinh lỗ trống quang hóa (h⁺) oxy hóa nước thành O₂ với độ bền quang hóa tuyệt vời.'
  },
  TUNGSTEN_TRIOXIDE_WO3: {
    id: 'TUNGSTEN_TRIOXIDE_WO3',
    name: 'Vonfram Trioxit (WO₃)',
    chemicalFormula: 'WO₃',
    semiconductorClass: 'OXYGEN_EVOLUTION_OEP',
    bandgapEv: 2.60,
    absorptionEdgeNm: 477,
    conductionBandMinV: 0.40,
    valenceBandMaxV: 3.00, // Very deep valence band
    primaryLightHarvesting: 'UV_VISIBLE',
    recommendedCocatalyst: 'RuO₂ / IrO₂',
    description: 'Xúc tác quang hóa oxy ổn định hàng đầu trong môi trường axit. Thường kết hợp với cặp oxy hóa khử lỏng IO₃⁻/I⁻ trong hệ Z-scheme hai ngăn.'
  },
  TANTALUM_NITRIDE_TA3N5: {
    id: 'TANTALUM_NITRIDE_TA3N5',
    name: 'Tantan Nitrit (Ta₃N₅)',
    chemicalFormula: 'Ta₃N₅',
    semiconductorClass: 'OXYGEN_EVOLUTION_OEP',
    bandgapEv: 2.08,
    absorptionEdgeNm: 596, // Absorbs up to 600 nm red light!
    conductionBandMinV: -0.38,
    valenceBandMaxV: 1.70,
    primaryLightHarvesting: 'BROAD_VISIBLE',
    recommendedCocatalyst: 'CoOₓ / NiFeOₓ',
    description: 'Vật liệu dải hẹp đột phá với giới hạn hấp thụ lên tới 596 nm (gần 600 nm phổ đỏ). Về lý thuyết cho phép hiệu suất quang hóa STH vượt 10% khi kết hợp trong hệ Z-scheme tối ưu.'
  },
  TITANIUM_DIOXIDE_TIO2_ANATASE: {
    id: 'TITANIUM_DIOXIDE_TIO2_ANATASE',
    name: 'Titan Dioxit Anatase (TiO₂ - Chuẩn Fujishima-Honda)',
    chemicalFormula: 'TiO₂',
    semiconductorClass: 'SINGLE_ABSORBER',
    bandgapEv: 3.20,
    absorptionEdgeNm: 387, // UV only (< 400 nm)
    conductionBandMinV: -0.50,
    valenceBandMaxV: 2.70,
    primaryLightHarvesting: 'UV',
    recommendedCocatalyst: 'Pt / RuO₂',
    description: 'Cột mốc lịch sử quang phân tách nước của Fujishima & Honda (Nature 1972). Có vùng dẫn và hóa trị bao trùm cả thế khử và oxy hóa nước, nhưng dải cấm rộng 3.2 eV chỉ hấp thụ được tia cực tím (UV ~4% quang phổ mặt trời), giới hạn hiệu suất thực tế < 2%.'
  }
};

export const Z_SCHEME_RELAYS: Record<ZSchemeRelayType, ZSchemeRelay> = {
  SOLID_STATE_SHEET_RGO_GOLD: {
    id: 'SOLID_STATE_SHEET_RGO_GOLD',
    name: 'Tấm Tiếp Xúc Ohmic Rắn (Au / rGO Graphene Layer)',
    formula: 'Au / reduced-GO Sheet',
    type: 'SOLID_STATE_OHMIC',
    redoxPotentialVVsNHE: 0.0,
    electronTransferRateKPerSec: 1.5e7,
    backReactionSuppressionPct: 98.5,
    description: 'Lớp tiếp xúc dẫn điện rắn bằng vàng (Au) hoặc graphene oxit khử (rGO) in mỏng giữa các hạt HEP và OEP. Cho phép tái hợp trực tiếp electron vùng dẫn của OEP với lỗ trống vùng hóa trị của HEP mà không cần dung dịch điện ly lỏng.'
  },
  REDOX_MEDIATOR_IODATE_IODIDE: {
    id: 'REDOX_MEDIATOR_IODATE_IODIDE',
    name: 'Cặp Trung Gian Oxy Hóa Khử Iodat/Iodua (IO₃⁻/I⁻)',
    formula: 'IO₃⁻ + 6H⁺ + 6e⁻ ⇌ I⁻ + 3H₂O',
    type: 'LIQUID_REDOX_ION',
    redoxPotentialVVsNHE: 1.09,
    electronTransferRateKPerSec: 4.2e5,
    backReactionSuppressionPct: 82.0,
    description: 'Chất chuyển tải điện tử lỏng kinh điển cho hệ Z-scheme huyền phù hạt bột. IO₃⁻ bị khử thành I⁻ ở OEP và I⁻ bị oxy hóa lại thành IO₃⁻ ở HEP.'
  },
  REDOX_MEDIATOR_FERRI_FERROCYANIDE: {
    id: 'REDOX_MEDIATOR_FERRI_FERROCYANIDE',
    name: 'Cặp Phức Sắt Cyanua ([Fe(CN)₆]³⁻/[Fe(CN)₆]⁴⁻)',
    formula: '[Fe(CN)₆]³⁻ + e⁻ ⇌ [Fe(CN)₆]⁴⁻',
    type: 'LIQUID_REDOX_ION',
    redoxPotentialVVsNHE: 0.36,
    electronTransferRateKPerSec: 8.5e5,
    backReactionSuppressionPct: 87.5,
    description: 'Cặp ion chuyển điện tử 1-electron nhanh chóng, giảm thiểu năng lượng hoạt hóa tái hợp electron-lỗ trống giữa hai xúc tác quang.'
  }
};

export const Z_SCHEME_CATALOG: ZSchemeSystem[] = [
  {
    id: 'DOMEN_SRTIO3_BIVO4_SHEET',
    name: 'Tấm Xúc Tác Quang Domen (SrTiO₃:Rh | Au | BiVO₄:Mo)',
    hepId: 'SRTIO3_RH',
    oepId: 'BISMUTH_VANADATE_BIVO4',
    relayType: 'SOLID_STATE_SHEET_RGO_GOLD',
    herCocatalyst: 'Rh/Cr₂O₃ Core-Shell',
    oerCocatalyst: 'Co-Pi / CoOₓ',
    nominalSthEfficiencyPct: 1.20,
    aqyAt420nmPct: 33.0,
    backReactionRateFactor: 0.02,
    summary: 'Công nghệ tấm xúc tác quang học (photocatalyst sheet) đột phá từ nhóm GS. Domen (ĐH Tokyo/Nature). Vỏ bọc Rh/Cr₂O₃ triệt tiêu phản ứng nổ ngược H₂-O₂, đạt AQY kỷ lục 33% ở bước sóng 420 nm.'
  },
  {
    id: 'POLYMER_GC3N4_BIVO4_RGO',
    name: 'Hệ Lai Hóa Sinh Thái (g-C₃N₄ | rGO | BiVO₄)',
    hepId: 'GRAPHITIC_CARBON_NITRIDE_G_C3N4',
    oepId: 'BISMUTH_VANADATE_BIVO4',
    relayType: 'SOLID_STATE_SHEET_RGO_GOLD',
    herCocatalyst: 'Ni₂P / MoS₂',
    oerCocatalyst: 'CoOₓ',
    nominalSthEfficiencyPct: 2.15,
    aqyAt420nmPct: 24.5,
    backReactionRateFactor: 0.05,
    summary: 'Hệ thống xúc tác không chứa kim loại quý đắt đỏ (Pt-free). g-C₃N₄ 2D dẫn điện với graphene khử rGO, giá thành chế tạo chỉ bằng 1/15 so với hệ vật liệu chứa quý kim.'
  },
  {
    id: 'NARROW_BANDGAP_TA3N5_SHEET',
    name: 'Hệ Phổ Rộng Hấp Thụ 600nm (SrTiO₃:Rh | BiVO₄ - Ta₃N₅)',
    hepId: 'SRTIO3_RH',
    oepId: 'TANTALUM_NITRIDE_TA3N5',
    relayType: 'SOLID_STATE_SHEET_RGO_GOLD',
    herCocatalyst: 'Pt / Cr₂O₃',
    oerCocatalyst: 'NiFeOₓ',
    nominalSthEfficiencyPct: 5.60,
    aqyAt420nmPct: 45.0,
    backReactionRateFactor: 0.04,
    summary: 'Hệ xúc tác dải cấm hẹp tiên tiến hấp thụ dải phổ khả kiến đến 600 nm, nhân đôi lượng photon mặt trời thu hoạch và nâng hiệu suất STH lên trên 5.5%.'
  },
  {
    id: 'CONVENTIONAL_FUJISHIMA_HONDA_UV',
    name: 'Hệ Chuẩn Đơn Bán Dẫn UV (TiO₂ Anatase / Pt)',
    hepId: 'TITANIUM_DIOXIDE_TIO2_ANATASE',
    oepId: 'TITANIUM_DIOXIDE_TIO2_ANATASE',
    relayType: 'SOLID_STATE_SHEET_RGO_GOLD',
    herCocatalyst: 'Pt Nanoparticles',
    oerCocatalyst: 'RuO₂',
    nominalSthEfficiencyPct: 0.18,
    aqyAt420nmPct: 1.2,
    backReactionRateFactor: 0.35,
    summary: 'Hệ thống đơn chất kinh điển. Chỉ hấp thụ được bức xạ UV, thất thoát 96% quang phổ mặt trời, minh họa lý do tất yếu dẫn tới sự ra đời của cơ chế Z-Scheme hai vùng hấp thụ.'
  }
];

/**
 * Calculates Nernstian redox potentials for water splitting at given pH and temperature.
 * E(H+/H2) = 0.00 - (2.303*R*T/F) * pH = -0.0591 * pH at 25°C.
 * E(O2/H2O) = 1.23 - (2.303*R*T/F) * pH = 1.23 - 0.0591 * pH at 25°C.
 */
export function calculateWaterSplittingThermodynamics(ph: number = 7.0): WaterSplittingThermodynamics {
  const clampedPh = Math.max(0, Math.min(14, ph));
  const nernstSlope = 0.05916; // V / pH unit at 298.15 K
  const herPotential = -(nernstSlope * clampedPh);
  const oerPotential = 1.229 - (nernstSlope * clampedPh);

  return {
    ph: clampedPh,
    standardPotentialVolts: 1.229,
    herPotentialVVsNHE: Number(herPotential.toFixed(3)),
    oerPotentialVVsNHE: Number(oerPotential.toFixed(3)),
    gibbsFreeEnergyKjPerMolH2: 237.18,
    theoreticalMinPhotonsPerH2: 4 // Dual-step Z-scheme requires 2 photons for HEP + 2 photons for OEP = 4 photons per H2 molecule
  };
}

/**
 * Checks whether a single semiconductor or Z-Scheme system has sufficient band thermodynamic driving force
 * to split water into H2 and O2 at the specified pH.
 */
export function evaluateBandAlignmentFeasibility(
  hepId: PhotocatalystId,
  oepId: PhotocatalystId,
  ph: number = 7.0
): {
  isFeasible: boolean;
  herDrivingForceV: number; // E(H+/H2) - E_CB(HEP) > 0 for favorable reduction
  oerDrivingForceV: number; // E_VB(OEP) - E(O2/H2O) > 0 for favorable oxidation
  zSchemeRecombinationOverpotentialV: number; // E_CB(OEP) - E_VB(HEP)
  wavelengthLimitNm: number;
  assessment: string;
} {
  const thermo = calculateWaterSplittingThermodynamics(ph);
  const hep = PHOTOCATALYST_CATALOG[hepId];
  const oep = PHOTOCATALYST_CATALOG[oepId];

  // Adjust CB and VB for pH shift (-0.0591 V per pH unit relative to pH 0)
  const phShift = -0.05916 * ph;
  const hepCbAtPh = hep.conductionBandMinV + phShift;
  const hepVbAtPh = hep.valenceBandMaxV + phShift;
  const oepCbAtPh = oep.conductionBandMinV + phShift;
  const oepVbAtPh = oep.valenceBandMaxV + phShift;

  // Proton reduction driving force (more negative CB means larger positive driving force)
  const herDrivingForce = thermo.herPotentialVVsNHE - hepCbAtPh;

  // Water oxidation driving force (more positive VB means larger positive driving force)
  const oerDrivingForce = oepVbAtPh - thermo.oerPotentialVVsNHE;

  // Z-Scheme recombination driving force: OEP CB electrons recombine with HEP VB holes
  // Favorable when OEP CB is more negative/close to HEP VB
  const zSchemeRecombOverpotential = hepVbAtPh - oepCbAtPh;

  const isFeasible = herDrivingForce > 0.05 && oerDrivingForce > 0.05;

  // Wavelength limit is dictated by the wider bandgap of the two absorbers
  const maxEg = Math.max(hep.bandgapEv, oep.bandgapEv);
  const wavelengthLimit = Math.round(1240 / maxEg);

  let assessment = '';
  if (!isFeasible) {
    if (herDrivingForce <= 0) {
      assessment = 'Không khả thi: Đáy vùng dẫn (CB) của HEP không đủ âm để khử proton thành H₂.';
    } else {
      assessment = 'Không khả thi: Đỉnh vùng hóa trị (VB) của OEP không đủ dương để oxy hóa nước thành O₂.';
    }
  } else {
    assessment = `Khả thi tuyệt hảo: Lực động học khử H⁺ đạt +${herDrivingForce.toFixed(2)} V, oxy hóa H₂O đạt +${oerDrivingForce.toFixed(2)} V. Giới hạn hấp thụ dải phổ: ${wavelengthLimit} nm.`;
  }

  return {
    isFeasible,
    herDrivingForceV: Number(herDrivingForce.toFixed(3)),
    oerDrivingForceV: Number(oerDrivingForce.toFixed(3)),
    zSchemeRecombinationOverpotentialV: Number(zSchemeRecombOverpotential.toFixed(3)),
    wavelengthLimitNm: wavelengthLimit,
    assessment
  };
}

/**
 * Calculates Solar-to-Hydrogen (STH) solar farm production metrics
 * STH (%) = (ΔG° * r(H2)) / (P_solar * A) * 100%
 */
export function calculateSolarHydrogenProduction(
  panelAreaM2: number = 100,
  sthEfficiencyPct: number = 1.20,
  solarIrradianceWPerM2: number = STANDARD_SOLAR_IRRADIANCE_AM15G,
  sunHoursPerDay: number = 5.5
): SolarHydrogenProductionYield {
  const safeArea = Math.max(1, panelAreaM2);
  const safeSth = Math.max(0.01, Math.min(25, sthEfficiencyPct));
  const safeIrradiance = Math.max(100, solarIrradianceWPerM2);
  const safeHours = Math.max(1, Math.min(12, sunHoursPerDay));

  // Incident solar power (Watts = J/s)
  const incidentSolarPowerWatts = safeIrradiance * safeArea;

  // Useful chemical power stored in H2 (Watts = J/s)
  const chemicalPowerH2Watts = incidentSolarPowerWatts * (safeSth / 100);

  // Molar production rate of H2: r(H2) = Chemical Power / ΔG° (mol/s)
  const molesH2PerSecond = chemicalPowerH2Watts / GIBBS_ENERGY_WATER_SPLITTING_J;
  const molesH2PerHour = molesH2PerSecond * 3600;
  const gramsH2PerHour = molesH2PerHour * MOLAR_MASS_H2_G;

  // Daily totals
  const dailyMolesH2 = molesH2PerHour * safeHours;
  const dailyKgH2 = (dailyMolesH2 * MOLAR_MASS_H2_G) / 1000;

  // Stoichiometry: 2 H2O -> 2 H2 + O2 (1 mol O2 per 2 mol H2)
  const dailyMolesO2 = dailyMolesH2 / 2;
  const dailyKgO2 = (dailyMolesO2 * MOLAR_MASS_O2_G) / 1000;

  // Water consumed: 1 mol H2O per 1 mol H2 (18.015 g/mol, 1 L = 1000 g)
  const dailyKgWater = (dailyMolesH2 * MOLAR_MASS_H2O_G) / 1000;
  const cleanWaterConsumedLiters = dailyKgWater; // Density ~1 kg/L

  // Environmental and mileage benefits
  // Grey hydrogen from Steam Methane Reforming (SMR) emits ~10 kg CO2 per kg H2
  const fossilCo2AvoidedKg = dailyKgH2 * 10.5;

  // Modern Fuel Cell Electric Vehicle (e.g. Toyota Mirai, Hyundai Nexo) consumes ~0.95 kg H2 per 100 km (~105 km/kg)
  const equivalentCleanFuelKm = dailyKgH2 * 105;

  return {
    panelAreaM2: safeArea,
    solarIrradianceWPerM2: safeIrradiance,
    sunHoursPerDay: safeHours,
    sthEfficiencyPct: safeSth,
    hydrogenRateMolPerHour: Number(molesH2PerHour.toFixed(2)),
    hydrogenRateGramsPerHour: Number(gramsH2PerHour.toFixed(2)),
    hydrogenDailyKg: Number(dailyKgH2.toFixed(3)),
    oxygenDailyKg: Number(dailyKgO2.toFixed(3)),
    cleanWaterConsumedLitersPerDay: Number(cleanWaterConsumedLiters.toFixed(2)),
    fossilCo2AvoidedKgPerDay: Number(fossilCo2AvoidedKg.toFixed(2)),
    equivalentCleanFuelKmPerDay: Number(equivalentCleanFuelKm.toFixed(1))
  };
}

/**
 * Calculates Apparent Quantum Yield (AQY) at a specific monochromatic wavelength
 * AQY (%) = (2 * Number of evolved H2 molecules) / (Number of incident photons) * 100%
 */
export function calculateApparentQuantumYield(
  wavelengthNm: number,
  h2EvolutionRateMicromolPerHour: number,
  incidentLightIntensityMw: number
): {
  aqyPct: number;
  incidentPhotonRatePerSec: number;
  electronRatePerSec: number;
  explanation: string;
} {
  const lambda = Math.max(200, Math.min(800, wavelengthNm));
  const PLANCK_CONSTANT = 6.626e-34; // J*s
  const SPEED_OF_LIGHT = 3.0e8;      // m/s
  const AVOGADRO = 6.022e23;

  // Energy of one photon E = hc / lambda (J)
  const photonEnergyJ = (PLANCK_CONSTANT * SPEED_OF_LIGHT) / (lambda * 1e-9);

  // Incident power in Watts (J/s)
  const powerWatts = incidentLightIntensityMw * 1e-3;

  // Incident photons per second
  const incidentPhotonsPerSec = powerWatts / photonEnergyJ;

  // H2 molecules evolved per second: (rate in umol/h * 1e-6 / 3600) * N_A
  const molesH2PerSec = (h2EvolutionRateMicromolPerHour * 1e-6) / 3600;
  const h2MoleculesPerSec = molesH2PerSec * AVOGADRO;

  // Each H2 molecule requires 2 electrons:
  const reactingElectronsPerSec = 2 * h2MoleculesPerSec;

  const aqy = (reactingElectronsPerSec / incidentPhotonsPerSec) * 100;
  const clampedAqy = Math.max(0, Math.min(100, aqy));

  return {
    aqyPct: Number(clampedAqy.toFixed(2)),
    incidentPhotonRatePerSec: Number(incidentPhotonsPerSec.toExponential(2)),
    electronRatePerSec: Number(reactingElectronsPerSec.toExponential(2)),
    explanation: `Tại bước sóng ${lambda} nm: Cứ 100 photon tới có ${clampedAqy.toFixed(1)} electron quang hóa tham gia thành công vào phản ứng khử 2H⁺ + 2e⁻ → H₂.`
  };
}

/**
 * Technical Comparison Matrix: 3 Hydrogen Production Architectures
 */
export interface HydrogenTechComparison {
  name: string;
  category: 'PARTICULATE_PHOTOCATALYSIS' | 'PHOTOELECTROCHEMICAL_PEC' | 'PV_ELECTROLYZER';
  capitalCostUsdPerM2: number;
  overallEfficiencyPct: number;
  externalBiasRequired: boolean;
  systemComplexity: 'VERY_LOW' | 'MEDIUM' | 'HIGH';
  scalabilityPotential: string;
  pros: string[];
  cons: string[];
}

export const HYDROGEN_PRODUCTION_TECH_COMPARISON: HydrogenTechComparison[] = [
  {
    name: 'Tấm Xúc Tác Quang Hạt Z-Scheme (Particulate Photocatalysis)',
    category: 'PARTICULATE_PHOTOCATALYSIS',
    capitalCostUsdPerM2: 12.0, // Extremely low cost ($10-15/m²)
    overallEfficiencyPct: 1.5,
    externalBiasRequired: false,
    systemComplexity: 'VERY_LOW',
    scalabilityPotential: 'Cực cao (dễ triển khai diện tích hàng triệu m² trên hoang mạc, mặt hồ)',
    pros: [
      'Không cần nguồn điện hay dây dẫn bên ngoài (Zero external bias)',
      'Giá thành cực thấp ($10-15/m²), cấu trúc dạng túi panel nhựa đơn giản',
      'Tự chia tách nước trực tiếp bằng ánh sáng mặt trời tự nhiên',
      'Tuổi thọ quang học cao với xúc tác oxit vô cơ ổn định'
    ],
    cons: [
      'Hiệu suất STH hiện tại (~1.5 - 5%) thấp hơn hệ PV + Điện phân',
      'Cần màng tách khí an toàn để phân lập H₂ và O₂ sinh ra đồng thời'
    ]
  },
  {
    name: 'Tế Bào Quang Điện Hóa (PEC Tandem Cell)',
    category: 'PHOTOELECTROCHEMICAL_PEC',
    capitalCostUsdPerM2: 120.0,
    overallEfficiencyPct: 8.5,
    externalBiasRequired: false,
    systemComplexity: 'MEDIUM',
    scalabilityPotential: 'Trung bình (yêu cầu đế dẫn điện trong suốt FTO/ITO đắt tiền)',
    pros: [
      'Sinh riêng biệt H₂ ở cathode và O₂ ở anode, không lo nguy cơ hỗn hợp nổ',
      'Hiệu suất STH cao hơn xúc tác hạt bột rời',
      'Tích hợp phân tách điện tích nhờ thế tiếp xúc bán dẫn-dung dịch'
    ],
    cons: [
      'Chi phí đế FTO/ITO và màng trao đổi proton tương đối đắt',
      'Độ bền vật liệu bị hạn chế do hiện tượng quang ăn mòn điện cực'
    ]
  },
  {
    name: 'Hệ Lai Ghép Pin Mặt Trời & Điện Phân Nước (PV + PEM Electrolyzer)',
    category: 'PV_ELECTROLYZER',
    capitalCostUsdPerM2: 350.0,
    overallEfficiencyPct: 16.5,
    externalBiasRequired: true,
    systemComplexity: 'HIGH',
    scalabilityPotential: 'Cao nhưng chi phí đầu tư ban đầu (CAPEX) rất lớn',
    pros: [
      'Hiệu suất quang-điện-hóa (STH tương đương) cao nhất hiện nay (> 16%)',
      'Công nghệ thương mại hóa hoàn toàn sẵn có',
      'Phân tách khí tuyệt đối với độ tinh khiết hydro > 99.999%'
    ],
    cons: [
      'CAPEX rất cao ($300-400/m² bao gồm tấm PV, biến tần DC-DC, stack PEM)',
      'Phụ thuộc vào màng Nafion đắt đỏ và xúc tác màng quý kim Iridi/Bạch kim'
    ]
  }
];
