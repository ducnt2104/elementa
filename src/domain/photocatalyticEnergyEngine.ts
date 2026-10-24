// src/domain/photocatalyticEnergyEngine.ts
// Domain Engine: Photocatalytic Water Splitting, Z-Scheme Artificial Photosynthesis & Perovskite Tandem Solar Cells
// Standards: IUPAC Gold Book, Honda-Fujishima Effect (1972) & Vietnam GDPT 2018 (Năng lượng Tái tạo & Xúc tác quang)

export interface PhotocatalystMaterial {
  id: string;
  nameVi: string;
  chemicalFormula: string;
  bandgapEv: number;
  conductionBandMinNheV: number; // E_CB in V vs NHE (Normal Hydrogen Electrode)
  valenceBandMaxNheV: number; // E_VB in V vs NHE
  lightAbsorptionRangeVi: string;
  canProduceH2Independently: boolean; // E_CB < 0.00 V
  canProduceO2Independently: boolean; // E_VB > +1.23 V
  roleInZSchemeVi: 'HYDROGEN_EVOLUTION_HEP' | 'OXYGEN_EVOLUTION_OEP' | 'STANDALONE_SPLITTER';
  stabilityNotesVi: string;
}

export interface ZSchemeSimulationResult {
  hepCatalyst: PhotocatalystMaterial;
  oepCatalyst: PhotocatalystMaterial;
  electronMediator: string; // e.g. "Tiếp xúc Ohmic Au nano", "Cặp oxi hóa khử Fe²⁺/Fe³⁺"
  solarFluxWm2: number; // Standard AM1.5G = 1000 W/m^2
  reactorAreaM2: number;
  h2EvolutionRateMmolPerHour: number;
  o2EvolutionRateMmolPerHour: number; // Stoichiometric 2:1 ratio
  solarToHydrogenEfficiencyPercent: number; // STH %
  meetsCommercialFeasibilityTarget: boolean; // STH >= 10.0%
  environmentalImpactVi: string;
}

export interface PerovskiteTandemResult {
  perovskiteBandgapEv: number; // Top cell, typically 1.65 - 1.70 eV
  siliconBandgapEv: number; // Bottom cell, 1.12 eV
  singleJunctionSiliconLimitPercent: number; // 29.4% (Shockley-Queisser)
  tandemPcePercent: number; // Power Conversion Efficiency %
  efficiencyBoostPercent: number;
  currentMatchingStatusVi: string;
}

// ---------------------------------------------------------------------------
// 1. PHOTOCATALYTIC MATERIALS CATALOG (BAND EDGES VS NHE AT PH = 0)
// ---------------------------------------------------------------------------
// Standard Redox Potentials at pH = 0:
// E°(H⁺/H₂) = 0.00 V vs NHE (Reduction to Green H2)
// E°(O₂/H₂O) = +1.23 V vs NHE (Oxidation to O2)
// Thermodynamic required minimum energy: 1.23 eV (ΔG° = 237.2 kJ/mol)

export const PHOTOCATALYST_CATALOG: Record<string, PhotocatalystMaterial> = {
  TIO2_ANATASE: {
    id: 'TIO2_ANATASE',
    nameVi: 'Titan Dioxit (Hiệu Ứng Lịch Sử Honda-Fujishima 1972)',
    chemicalFormula: 'TiO₂ (Anatase)',
    bandgapEv: 3.20,
    conductionBandMinNheV: -0.20, // Negative enough for H2
    valenceBandMaxNheV: +3.00, // Very positive, powerful oxidation
    lightAbsorptionRangeVi: 'Chỉ hấp thụ vùng tử ngoại UV (λ < 387 nm, chiếm ~4% ánh sáng mặt trời)',
    canProduceH2Independently: true,
    canProduceO2Independently: true,
    roleInZSchemeVi: 'STANDALONE_SPLITTER',
    stabilityNotesVi: 'Trơ hóa học hoàn toàn, chống ăn mòn quang tuyệt đối, giá thành rẻ nhất.'
  },
  SRTIO3_RH: {
    id: 'SRTIO3_RH',
    nameVi: 'Stronti Titanat Pha Tạp Rhodi (Xúc Tác Sinh Hydro Hiệu Năng Cao)',
    chemicalFormula: 'SrTiO₃:Rh',
    bandgapEv: 2.15,
    conductionBandMinNheV: -0.35,
    valenceBandMaxNheV: +1.80,
    lightAbsorptionRangeVi: 'Hấp thụ ánh sáng khả kiến (λ < 580 nm, màu đỏ sẫm)',
    canProduceH2Independently: true,
    canProduceO2Independently: false,
    roleInZSchemeVi: 'HYDROGEN_EVOLUTION_HEP',
    stabilityNotesVi: 'Phân lớp lai d của Rh³⁺ tạo mức trung gian trong vùng cấm cho phép hấp thụ ánh sáng nhìn thấy.'
  },
  BIVO4: {
    id: 'BIVO4',
    nameVi: 'Bismuth Vanadat (Xúc Tác Sinh Oxy Đỉnh Cao)',
    chemicalFormula: 'BiVO₄',
    bandgapEv: 2.40,
    conductionBandMinNheV: +0.02, // Cannot reduce H+ directly
    valenceBandMaxNheV: +2.42, // Great for water oxidation
    lightAbsorptionRangeVi: 'Hấp thụ ánh sáng xanh lam - lục (λ < 520 nm, màu vàng tươi)',
    canProduceH2Independently: false,
    canProduceO2Independently: true,
    roleInZSchemeVi: 'OXYGEN_EVOLUTION_OEP',
    stabilityNotesVi: 'Lỗ trống quang sinh linh động cao, xúc tác quang hóa oxi hóa nước sinh O₂ hàng đầu thế giới.'
  },
  G_C3N4: {
    id: 'G_C3N4',
    nameVi: 'Carbon Nitride Dạng Lớp Graphit (Xúc Tác Phi Kim Loại 2D)',
    chemicalFormula: 'g-C₃N₄',
    bandgapEv: 2.70,
    conductionBandMinNheV: -1.12, // Extremely strong reducing power!
    valenceBandMaxNheV: +1.58,
    lightAbsorptionRangeVi: 'Hấp thụ ánh sáng xanh (λ < 460 nm, màu vàng nhạt)',
    canProduceH2Independently: true,
    canProduceO2Independently: true,
    roleInZSchemeVi: 'HYDROGEN_EVOLUTION_HEP',
    stabilityNotesVi: 'Cấu trúc 2D từ Melamine/Urea, thế vùng dẫn cực âm (-1.12 V) khử ion H⁺ thành H₂ cực kỳ mãnh liệt.'
  },
  WO3: {
    id: 'WO3',
    nameVi: 'Wolfram Trioxit (Cực Dương Quang Hóa Bền Vững)',
    chemicalFormula: 'WO₃',
    bandgapEv: 2.60,
    conductionBandMinNheV: +0.40,
    valenceBandMaxNheV: +3.00,
    lightAbsorptionRangeVi: 'Hấp thụ ánh sáng xanh (λ < 480 nm)',
    canProduceH2Independently: false,
    canProduceO2Independently: true,
    roleInZSchemeVi: 'OXYGEN_EVOLUTION_OEP',
    stabilityNotesVi: 'Độ bền axit xuất sắc, không bị ăn mòn quang trong môi trường axit mạnh pH < 1.'
  }
};

// ---------------------------------------------------------------------------
// 2. Z-SCHEME ARTIFICIAL PHOTOSYNTHESIS SIMULATION
// ---------------------------------------------------------------------------

/**
 * Simulates dual-absorber Z-Scheme overall water splitting:
 * 2 H2O + 4 hν -> 2 H2 + O2
 * Mimicking Photosystem II (OEP) + Photosystem I (HEP) in green plants
 */
export function simulateZSchemeWaterSplitting(
  hepId: string = 'SRTIO3_RH',
  oepId: string = 'BIVO4',
  solarFluxWm2: number = 1000, // 1000 W/m^2 (AM1.5G Standard 1 Sun)
  reactorAreaM2: number = 2.0 // m^2 panel
): ZSchemeSimulationResult {
  const hep = PHOTOCATALYST_CATALOG[hepId] || PHOTOCATALYST_CATALOG.SRTIO3_RH;
  const oep = PHOTOCATALYST_CATALOG[oepId] || PHOTOCATALYST_CATALOG.BIVO4;

  // Overpotential checks:
  // HEP must have E_CB < 0.00 V (need driving force for 2H+ + 2e- -> H2)
  const drivingForceHep = 0.00 - hep.conductionBandMinNheV; // Positive if thermodynamically viable
  // OEP must have E_VB > +1.23 V (need driving force for 2H2O + 4h+ -> O2 + 4H+)
  const drivingForceOep = oep.valenceBandMaxNheV - 1.23;

  const isViable = drivingForceHep > 0.05 && drivingForceOep > 0.10;

  // Quantum efficiency factor based on driving forces and visible light overlap
  let quantumYieldFactor = isViable ? 0.065 : 0.005;
  if (hep.bandgapEv <= 2.2 && oep.bandgapEv <= 2.5) {
    quantumYieldFactor += 0.045; // Broad visible light absorption bonus
  }

  // Solar photon flux absorption:
  // Total solar power (W) = solarFluxWm2 * reactorAreaM2
  const totalSolarPowerW = solarFluxWm2 * reactorAreaM2;

  // Energy stored per mol H2: ΔG° = 237.2 kJ/mol = 237,200 J/mol
  // Rate of H2 production (mol/s) = (TotalPower * Efficiency) / 237,200
  const sthEfficiency = isViable ? +(quantumYieldFactor * 100).toFixed(2) : 0.5;
  const h2Watts = totalSolarPowerW * (sthEfficiency / 100);
  const h2MolPerSecond = h2Watts / 237200;
  const h2MmolPerHour = +(h2MolPerSecond * 1000 * 3600).toFixed(1);

  // Stoichiometric O2 evolution: 2 H2 : 1 O2
  const o2MmolPerHour = +(h2MmolPerHour / 2).toFixed(1);

  const meetsCommercialFeasibilityTarget = sthEfficiency >= 10.0;

  const environmentalImpactVi = `Hệ quang xúc tác chữ Z kép (Z-Scheme) sản xuất ${h2MmolPerHour} mmol H₂ sạch/giờ (${(h2MmolPerHour * 2.016 / 1000).toFixed(2)} g H₂/h) và ${o2MmolPerHour} mmol O₂ tinh khiết từ nước nguyên chất, hoàn toàn không phát thải khí nhà kính CO₂.`;

  return {
    hepCatalyst: hep,
    oepCatalyst: oep,
    electronMediator: 'Cầu nối Ohmic Au nano (Tiếp xúc chuyển điện tích nhanh)',
    solarFluxWm2,
    reactorAreaM2,
    h2EvolutionRateMmolPerHour: h2MmolPerHour,
    o2EvolutionRateMmolPerHour: o2MmolPerHour,
    solarToHydrogenEfficiencyPercent: sthEfficiency,
    meetsCommercialFeasibilityTarget,
    environmentalImpactVi
  };
}

// ---------------------------------------------------------------------------
// 3. PEROVSKITE-SILICON TANDEM SOLAR CELL ENGINE
// ---------------------------------------------------------------------------

/**
 * Calculates theoretical and realistic Power Conversion Efficiency (PCE) for
 * 2-terminal Perovskite / Silicon Tandem solar cells breaking the Shockley-Queisser limit (29.4%)
 */
export function calculatePerovskiteTandemEfficiency(
  perovskiteBandgapEv: number = 1.68 // Optimal top cell bandgap: 1.65 - 1.70 eV
): PerovskiteTandemResult {
  const siliconBandgapEv = 1.12; // Standard c-Si wafer
  const singleJunctionSiliconLimitPercent = 29.4; // Shockley-Queisser limit for single Si

  // Bandgap matching factor for current matching in 2T tandem:
  // Optimum top cell bandgap is ~1.68 eV for pairing with 1.12 eV Si
  const mismatchPenalty = Math.pow(Math.abs(perovskiteBandgapEv - 1.68), 2) * 45;

  // Max certified tandem efficiency reaches 34.6% (2024 world record)
  const basePce = 34.6;
  const tandemPcePercent = +Math.max(25.0, Math.min(36.0, basePce - mismatchPenalty)).toFixed(2);
  const efficiencyBoostPercent = +(tandemPcePercent - 24.5).toFixed(1); // Compared to typical commercial 24.5% Si panel

  let currentMatchingStatusVi = 'ĐỒNG BỘ DÒNG QUANG ĐIỆN HOÀN HẢO (Current Matched): Dòng điện tế bào trên (Perovskite) cân bằng với tế bào dưới (Silicon), cực đại hóa công suất đầu ra.';
  if (Math.abs(perovskiteBandgapEv - 1.68) > 0.08) {
    currentMatchingStatusVi = 'LỆCH DÒNG (Current Mismatched): Tế bào trên phát sinh dòng điện khác biệt gây nghẽn cổ chai trong cấu trúc 2 cực (2-Terminal). Cần điều chỉnh tỉ lệ I/Br halide để đưa vùng cấm về 1.68 eV.';
  }

  return {
    perovskiteBandgapEv,
    siliconBandgapEv,
    singleJunctionSiliconLimitPercent,
    tandemPcePercent,
    efficiencyBoostPercent,
    currentMatchingStatusVi
  };
}
