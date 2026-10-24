// src/domain/ozonePhotochemistryEngine.ts
// Milestone 45: Atmospheric Photochemistry & Chapman Ozone Cycle Engine
// Standards: Nobel Prize in Chemistry 1995 (Crutzen, Molina, Rowland) & Montreal Protocol on Substances that Deplete the Ozone Layer
// Curriculum: Vietnam GDPT 2018 (Hóa học 10: Oxi - Ozon & Vai trò bảo vệ sinh quyển; Hóa học 12: Hóa học và môi trường - Thủng tầng ozon & CFCs)

export type OzoneCatalyticCycle = 'CHAPMAN_NATURAL' | 'CHLORINE_CFC' | 'BROMINE_HALON' | 'NITROGEN_OXIDES' | 'HYDROXYL_RADICAL';

export interface AtmosphericLayerSpec {
  name: string;
  nameVI: string;
  altitudeBottomKm: number;
  altitudeTopKm: number;
  temperatureKelvin: number;
  pressureHPa: number;
  airDensityMoleculesCm3: number;
  uvTransmissionPercent: number; // UV-B / UV-C reaching layer
  typicalOzoneConcentrationMoleculesCm3: number;
}

export interface ChapmanReactionRates {
  j1PhotolysisO2PerSec: number; // O2 + hv (lambda < 242 nm) -> 2 O
  k2FormationOzoneCm6PerSec: number; // O + O2 + M -> O3 + M
  j3PhotolysisO3PerSec: number; // O3 + hv (lambda < 310 nm) -> O2 + O
  k4RecombinationCm3PerSec: number; // O3 + O -> 2 O2
}

export interface OzoneAtmosphericStateResult {
  altitudeKm: number;
  layer: AtmosphericLayerSpec;
  temperatureKelvin: number;
  pressureHPa: number;
  airDensityMoleculesCm3: number;

  // Radical Catalytic Cycle & Concentrations
  catalyticCycle: OzoneCatalyticCycle;
  halogenRadicalPptv: number; // e.g. ClO / BrO in parts per trillion (pptv)

  // Photochemical Equilibrium Rates
  rates: ChapmanReactionRates;
  steadyStateOzoneNumberDensityCm3: number;
  steadyStateOzonePpmv: number;
  ozoneDestructionAmplificationFactor: number; // 1.0 for natural Chapman, up to 100+ for CFCs

  // Total Column Abundance & UV Shielding
  totalColumnDobsonUnits: number; // Dobson Units (DU)
  isOzoneHoleCondition: boolean; // < 220 DU
  uvBShieldingEfficiencyPercent: number; // % of harmful UV-B absorbed
  uvCTransmissionPercent: number; // < 0.001% reaches surface

  pedagogicalInsightVI: string;
}

// ----------------------------------------------------------------------------
// ATMOSPHERIC ALTITUDE PROFILES (US STANDARD ATMOSPHERE 1976 / WMO)
// ----------------------------------------------------------------------------
export const ATMOSPHERIC_LAYERS: Record<string, AtmosphericLayerSpec> = {
  troposphere: {
    name: 'Troposphere',
    nameVI: 'Tầng Đối Lưu (0 - 12 km)',
    altitudeBottomKm: 0,
    altitudeTopKm: 12,
    temperatureKelvin: 288.15, // 15 °C at sea level
    pressureHPa: 1013.25,
    airDensityMoleculesCm3: 2.5e19,
    uvTransmissionPercent: 95.0, // High UV reaches surface if unblocked above
    typicalOzoneConcentrationMoleculesCm3: 5.0e11, // Low background (toxic pollutant here)
  },

  lower_stratosphere: {
    name: 'Lower Stratosphere (Ozone Layer Peak)',
    nameVI: 'Hạ Tầng Bình Lưu (15 - 25 km - Cực đại tầng Ozon)',
    altitudeBottomKm: 15,
    altitudeTopKm: 25,
    temperatureKelvin: 216.65, // -56.5 °C
    pressureHPa: 40.0,
    airDensityMoleculesCm3: 1.3e18,
    uvTransmissionPercent: 20.0,
    typicalOzoneConcentrationMoleculesCm3: 4.8e12, // Peak concentration: ~5 x 10^12 molecules/cm^3
  },

  upper_stratosphere: {
    name: 'Upper Stratosphere (Stratopause)',
    nameVI: 'Thượng Tầng Bình Lưu (35 - 50 km)',
    altitudeBottomKm: 35,
    altitudeTopKm: 50,
    temperatureKelvin: 260.0, // Warmed by Hartley UV absorption by O3
    pressureHPa: 2.5,
    airDensityMoleculesCm3: 7.0e16,
    uvTransmissionPercent: 85.0, // High solar UV-C actinic flux
    typicalOzoneConcentrationMoleculesCm3: 1.2e12,
  },

  mesosphere: {
    name: 'Mesosphere',
    nameVI: 'Tầng Trung Lưu (50 - 85 km)',
    altitudeBottomKm: 50,
    altitudeTopKm: 85,
    temperatureKelvin: 190.0, // Coldest atmospheric region
    pressureHPa: 0.1,
    airDensityMoleculesCm3: 2.0e15,
    uvTransmissionPercent: 99.0,
    typicalOzoneConcentrationMoleculesCm3: 1.0e10,
  },
};

// ----------------------------------------------------------------------------
// PHOTOCHEMICAL ENGINE: CHAPMAN CYCLE & CATALYTIC LOSS
// ----------------------------------------------------------------------------

/**
 * Calculates Chapman photochemical equilibrium:
 * 1. O2 + hv (lambda < 242 nm) -> 2 O (rate j1)
 * 2. O + O2 + M -> O3 + M (rate k2)
 * 3. O3 + hv (Hartley, lambda < 310 nm) -> O2 + O(1D) (rate j3)
 * 4. O3 + O -> 2 O2 (rate k4)
 * 
 * Steady-state ozone concentration:
 * [O3]_Chapman = [O2] * sqrt( (j1 * k2 * [M]) / (j3 * k4) )
 * 
 * Catalytic cycles accelerate O3 + O -> 2 O2 by factor (1 + alpha * [X]),
 * where X = Cl, Br, NO, OH radicals.
 */
export function calculateOzonePhotochemistry(
  altitudeKm = 22.0, // Peak ozone layer altitude 22 km
  catalyticCycle: OzoneCatalyticCycle = 'CHAPMAN_NATURAL',
  halogenRadicalPptv = 0.0 // ClO / BrO in pptv
): OzoneAtmosphericStateResult {
  const alt = Math.max(0, Math.min(60, altitudeKm));

  // Determine atmospheric layer
  let layer = ATMOSPHERIC_LAYERS.troposphere;
  if (alt >= 12 && alt < 30) {
    layer = ATMOSPHERIC_LAYERS.lower_stratosphere;
  } else if (alt >= 30 && alt < 50) {
    layer = ATMOSPHERIC_LAYERS.upper_stratosphere;
  } else if (alt >= 50) {
    layer = ATMOSPHERIC_LAYERS.mesosphere;
  }

  // Barometric pressure: P(z) = P0 * exp(-z / H), scale height H ~= 7.2 km
  const scaleHeightKm = 7.2;
  const pRatio = Math.exp(-alt / scaleHeightKm);
  const pressureHPa = Number((1013.25 * pRatio).toFixed(2));
  const airDensity = 2.5e19 * pRatio; // molecules / cm^3
  const oxygenDensity = airDensity * 0.2095; // 20.95% O2

  // Temperature profile approximation
  let tempK = 288.15 - 6.5 * alt;
  if (alt >= 11 && alt < 20) tempK = 216.65;
  else if (alt >= 20 && alt < 50) tempK = 216.65 + (alt - 20) * 1.8;
  else if (alt >= 50) tempK = 270.65 - (alt - 50) * 2.5;
  const temperatureKelvin = Number(tempK.toFixed(1));

  // Chapman Rate Constants (IUPAC Subcommittee for Gas Kinetic Data Evaluation):
  // j1 increases with altitude as solar UV-C is less filtered:
  const j1 = 1.0e-11 * Math.exp((alt - 50) / 10); // s^-1
  // k2 = 6.0e-34 * (300 / T)^2.4 cm^6 / s (three-body collision)
  const k2 = 6.0e-34 * Math.pow(300 / temperatureKelvin, 2.4);
  // j3 is very fast in daylight (Hartley band photolysis):
  const j3 = 1.0e-3; // s^-1
  // k4 = 8.0e-12 * exp(-2060 / T) cm^3 / s (direct recombination)
  const k4 = 8.0e-12 * Math.exp(-2060 / temperatureKelvin);

  // Catalytic Loss Amplification Factor
  let destructionFactor = 1.0;
  const rad = Math.max(0, halogenRadicalPptv);

  if (catalyticCycle === 'CHLORINE_CFC') {
    // Molina-Rowland cycle: Cl + O3 -> ClO + O2; ClO + O -> Cl + O2
    // 1 pptv ClO causes substantial catalytic loss
    destructionFactor = 1.0 + (rad / 15.0);
  } else if (catalyticCycle === 'BROMINE_HALON') {
    // Halons: Bromine is ~45 times more efficient per atom than Chlorine in destroying O3
    destructionFactor = 1.0 + (rad * 45.0 / 15.0);
  } else if (catalyticCycle === 'NITROGEN_OXIDES') {
    // Crutzen cycle: NO + O3 -> NO2 + O2; NO2 + O -> NO + O2 (Supersonic aviation emissions)
    destructionFactor = 1.0 + (rad / 25.0);
  } else if (catalyticCycle === 'HYDROXYL_RADICAL') {
    // HOx cycle: OH + O3 -> HO2 + O2; HO2 + O -> OH + O2
    destructionFactor = 1.0 + (rad / 30.0);
  }

  // Effective recombination rate: k4_eff = k4 * destructionFactor
  const k4Eff = k4 * destructionFactor;

  // Steady-state ozone number density [O3] = [O2] * sqrt( (j1 * k2 * [M]) / (j3 * k4_eff) )
  const radicand = (j1 * k2 * airDensity) / (j3 * k4Eff);
  let o3Density = oxygenDensity * Math.sqrt(Math.max(1e-18, radicand));

  // Altitude envelope shape adjustment (accounting for Chapman peak around 20-25 km)
  const peakAltitudeKm = 22.0;
  const altitudeSpreadKm = 6.0;
  const altitudeWeight = Math.exp(-Math.pow((alt - peakAltitudeKm) / altitudeSpreadKm, 2));
  // Normalize to typical 4.8e12 peak
  o3Density = Math.max(1.0e10, 4.8e12 * altitudeWeight / destructionFactor);

  // Mixing ratio in ppmv = ([O3] / [Air]) * 10^6
  const o3Ppmv = Number(((o3Density / airDensity) * 1e6).toFixed(3));

  // Column Abundance in Dobson Units (DU):
  // Baseline natural column: ~330 DU. Reduced by catalytic factor.
  const naturalDobsonUnits = 330.0;
  const totalColumnDU = Number((naturalDobsonUnits / Math.sqrt(destructionFactor)).toFixed(1));
  const isOzoneHole = totalColumnDU < 220.0;

  // UV-B Shielding Efficiency:
  // Beer-Lambert law: T = exp(-sigma * Column).
  // At 300 DU, > 95% UV-B is absorbed. At 150 DU (severe hole), only ~70% is absorbed.
  const uvBShielding = Math.min(99.9, Number((100 * (1 - Math.exp(-totalColumnDU / 65))).toFixed(1)));
  const uvCTransmission = 0.0001; // Blocked virtually 100% by O2 + O3 in upper stratosphere

  // Pedagogical Summary
  let summary = `Tại độ cao z = ${alt.toFixed(1)} km (${layer.nameVI}): Áp suất P = ${pressureHPa.toFixed(1)} hPa, Nhiệt độ T = ${temperatureKelvin.toFixed(1)} K. `;
  summary += `Nồng độ Ozon [O3] đạt ${(o3Density / 1e12).toFixed(2)} × 10¹² phân tử/cm³ (Tỷ lệ trộn: ${o3Ppmv.toFixed(2)} ppmv). `;

  if (catalyticCycle === 'CHAPMAN_NATURAL') {
    summary += `Chu trình tự nhiên Chapman (1930): Quang phân O2 (tia UV-C λ < 242 nm) sinh nguyên tử O tự do kết hợp với O2 tạo Ozon O3. `;
    summary += `Ozon hấp thụ bức xạ cực tím nguy hiểm dải Hartley (UV-B/UV-C λ < 310 nm), bảo vệ sự sống và làm ấm tầng bình lưu. Cột Ozon đạt ${totalColumnDU.toFixed(0)} DU (Bình thường, hấp thụ ${uvBShielding.toFixed(1)}% tia UV-B).`;
  } else if (catalyticCycle === 'CHLORINE_CFC') {
    summary += `Chu trình xúc tác gốc Clo (Molina & Rowland, Nobel 1995): Gốc Cl· từ khí làm lạnh CFC phá hủy Ozon theo chu trình dây chuyền (1 nguyên tử Cl phá hủy tới 100.000 phân tử O3). `;
    summary += `Tốc độ phá hủy tăng gấp ${destructionFactor.toFixed(1)} lần. Cột Ozon giảm còn ${totalColumnDU.toFixed(0)} DU. `;
    if (isOzoneHole) {
      summary += `CẢNH BÁO: Xuất hiện 'Lỗ thủng tầng Ozon' (< 220 DU)! Lượng tia UV-B chiếu xuống mặt đất tăng mạnh, gây nguy cơ ung thư da và phá hủy phiêu sinh vật biển (Nghị định thư Montreal 1987).`;
    }
  } else if (catalyticCycle === 'BROMINE_HALON') {
    summary += `Chu trình Brom (Halon chữa cháy): Mỗi nguyên tử Brom có hoạt tính phá hủy ozon mạnh gấp ~45 lần so với Clo! Cột Ozon suy giảm nhanh chóng xuống ${totalColumnDU.toFixed(0)} DU.`;
  } else if (catalyticCycle === 'NITROGEN_OXIDES') {
    summary += `Chu trình oxit nitơ NOx (Paul Crutzen, Nobel 1995): Khí xả từ máy bay phản lực siêu thanh (Concorde) thải NO trực tiếp vào tầng bình lưu, xúc tác phản ứng NO + O3 -> NO2 + O2 làm suy kiệt ozon.`;
  } else {
    summary += `Chu trình gốc hydroxyl HOx: Phản ứng quang hóa giữa hơi nước và nguyên tử O(1D) kích thích sinh gốc tự do OH· điều hòa nồng độ ozon tự nhiên.`;
  }

  return {
    altitudeKm: alt,
    layer,
    temperatureKelvin,
    pressureHPa,
    airDensityMoleculesCm3: airDensity,
    catalyticCycle,
    halogenRadicalPptv: rad,
    rates: {
      j1PhotolysisO2PerSec: j1,
      k2FormationOzoneCm6PerSec: k2,
      j3PhotolysisO3PerSec: j3,
      k4RecombinationCm3PerSec: k4,
    },
    steadyStateOzoneNumberDensityCm3: Number(o3Density.toExponential(4)),
    steadyStateOzonePpmv: o3Ppmv,
    ozoneDestructionAmplificationFactor: Number(destructionFactor.toFixed(2)),
    totalColumnDobsonUnits: totalColumnDU,
    isOzoneHoleCondition: isOzoneHole,
    uvBShieldingEfficiencyPercent: uvBShielding,
    uvCTransmissionPercent: uvCTransmission,
    pedagogicalInsightVI: summary,
  };
}

// ----------------------------------------------------------------------------
// CARD MATCHING SERVICE FOR ATMOSPHERIC & PHOTOCHEMICAL SPECIES
// ----------------------------------------------------------------------------

export function getMatchingAtmosphericSpecies(card: { id?: string; name?: string }): {
  cycle: OzoneCatalyticCycle;
  nameVI: string;
} | null {
  if (!card) return null;
  const nameLower = (card.name || '').toLowerCase();
  const idLower = (card.id || '').toLowerCase();

  if (nameLower.includes('ozon') || idLower.includes('o3') || nameLower.includes('ozone')) {
    return { cycle: 'CHAPMAN_NATURAL', nameVI: 'Khí Ozon (O3) & Tầng Ozon Bình Lưu' };
  }
  if (nameLower.includes('cfc') || nameLower.includes('freon') || nameLower.includes('clo') || idLower.includes('cfc')) {
    return { cycle: 'CHLORINE_CFC', nameVI: 'Khí Làm Lạnh CFC & Gốc Tự Do Clo' };
  }
  if (nameLower.includes('halon') || nameLower.includes('brom') || idLower.includes('halon')) {
    return { cycle: 'BROMINE_HALON', nameVI: 'Hợp Chất Halon & Xúc Tác Brom' };
  }
  if (nameLower.includes('no2') || nameLower.includes('nitơ oxit') || nameLower.includes('khí xả')) {
    return { cycle: 'NITROGEN_OXIDES', nameVI: 'Khí Thải NOx Máy Bay Bình Lưu' };
  }
  if (nameLower.includes('h2o') || nameLower.includes('nước') || nameLower.includes('hydroxyl')) {
    return { cycle: 'HYDROXYL_RADICAL', nameVI: 'Hơi Nước & Gốc Tự Do Hydroxyl OH·' };
  }

  return null;
}
