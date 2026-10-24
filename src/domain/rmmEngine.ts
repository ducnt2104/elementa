/**
 * Resonant Mass Measurement (RMM), Suspended Microchannel Resonator (SMR) & Single-Particle Buoyant Mass Engine
 * 
 * Standards & Physical Principles:
 * 1. Archimedes Suspended Microchannel Resonator (SMR):
 *    Vacuum-packaged microcantilever with embedded microfluidic channel oscillating at fundamental frequency f_0 (~400 kHz).
 *    Delta f / f_0 = -m_b / (2 * M_eff)
 *    where m_b is the buoyant mass of the transiting single particle:
 *    m_b = V_p * (rho_p - rho_fluid) = m_p * (1 - rho_fluid / rho_p)
 * 2. Positively vs Negatively Buoyant Particles:
 *    - Positively buoyant (rho_p < rho_fluid, e.g. silicone oil droplets rho ~ 0.97 g/cm^3) cause frequency INCREASE (Delta f > 0).
 *    - Negatively buoyant (rho_p > rho_fluid, e.g. protein aggregates rho ~ 1.32 g/cm^3) cause frequency DECREASE (Delta f < 0).
 *    - Resolves USP <788> / USP <1788> pre-filled syringe sub-visible particle discrimination.
 * 3. Two-fluid density measurement (H2O vs D2O):
 *    rho_p = (m_b,1 * rho_fluid,2 - m_b,2 * rho_fluid,1) / (m_b,1 - m_b,2)
 *    Extracts true physical dry mass m_p, volume V_p, and absolute particle density rho_p without optical bias.
 * 4. 5 Benchmark Standards:
 *    - Therapeutic Syringe Pre-filled Formulation (IgG Aggregate vs Silicone Oil Droplet)
 *    - Single Yeast Cell Growth (Saccharomyces cerevisiae biomass accumulation)
 *    - NIST Gold Nanoparticle High-Density Standard (AuNP rho = 19.32 g/cm^3)
 *    - Bacterial Endospore Dehydration (Bacillus subtilis dormant spore coat)
 *    - Environmental Microplastics (Polyethylene / Polystyrene micro-fragments)
 * 5. Curriculum: Vietnam GDPT 2018 (Vật lý 10: Lực đẩy Ác-si-mét F_A = d*V, khối lượng riêng rho = m/V; Vật lý 12: Dao động cơ học và tần số riêng; Hóa học 12: Protein kết tụ và tiêu chuẩn thuốc tiêm).
 */

export const WATER_DENSITY_20C_G_CM3 = 0.9982; // g/cm^3
export const HEAVY_WATER_DENSITY_G_CM3 = 1.1050; // D2O g/cm^3
export const SMR_RESONATOR_F0_HZ = 405000.0; // 405 kHz fundamental frequency
export const SMR_EFFECTIVE_MASS_NANOGRAMS = 2.45; // M_eff of cantilever

export type ParticleBuoyancySign = 'POSITIVE_BUOYANT' | 'NEGATIVE_BUOYANT' | 'NEUTRAL';

export interface RmmParticlePopulation {
  name: string;
  chemicalFormula: string;
  nominalDensityGPerCm3: number;
  nominalDiameterNm: number;
  buoyancySign: ParticleBuoyancySign;
  populationFractionPercent: number; // e.g. 70% aggregates, 30% silicone oil
  clinicalRiskDescription: string;
}

export interface RmmStandard {
  id: string;
  name: string;
  vietnameseName: string;
  applicationCategory: 'PREFILLED_SYRINGE_QC' | 'SINGLE_CELL_BIOMASS' | 'METALLIC_CALIBRANT' | 'BACTERIAL_SPORE' | 'MICROPLASTICS';
  carrierFluidName: string;
  carrierFluidDensityGPerCm3: number;
  populations: RmmParticlePopulation[];
  limitOfDetectionFemtograms: number; // e.g. 0.05 fg (50 attograms)
  description: string;
  curriculumNotes: string;
  biotechSignificance: string;
  uspStandardRef: string;
}

export interface TransitPulsePoint {
  timeMicrosec: number; // 0 to 120 us
  frequencyShiftHz: number; // Peak frequency shift Delta f
}

export interface RmmParticleEvent {
  eventId: number;
  analyteName: string;
  buoyantMassFemtograms: number; // m_b in fg (1 fg = 10^-15 g)
  dryMassFemtograms: number; // m_p in fg
  densityGPerCm3: number;
  equivalentDiameterNm: number;
  buoyancySign: ParticleBuoyancySign;
  peakFrequencyShiftHz: number;
  pulseTrace: TransitPulsePoint[];
}

export interface RmmSimulationResult {
  standard: RmmStandard;
  totalEventsCount: number;
  negativeBuoyantCount: number; // Protein aggregates, dense debris
  positiveBuoyantCount: number; // Silicone oil droplets, microbubbles
  medianNegativeMassFg: number;
  medianPositiveMassFg: number;
  resolvedSiliconOilVsProteinRatio: string;
  events: RmmParticleEvent[];
}

/**
 * Standard Catalog: 5 Benchmark Resonant Mass Measurement Systems
 */
export const RMM_STANDARD_CATALOG: RmmStandard[] = [
  {
    id: 'prefilled_syringe_igg_silicone',
    name: 'Pre-filled Syringe Biotherapeutic (IgG Aggregates vs Silicone Oil Droplets)',
    vietnameseName: 'Bơm Tiêm Đóng Sẵn Thuốc Sinh Học (Protein Kết Tụ vs Giọt Dầu Silicone - USP <1788>)',
    applicationCategory: 'PREFILLED_SYRINGE_QC',
    carrierFluidName: 'Phosphate-Buffered Saline (PBS)',
    carrierFluidDensityGPerCm3: 1.005,
    populations: [
      {
        name: 'Kháng thể IgG kết tụ (Protein Aggregates)',
        chemicalFormula: '[IgG]n (Dense globular protein cross-linked)',
        nominalDensityGPerCm3: 1.32,
        nominalDiameterNm: 1200,
        buoyancySign: 'NEGATIVE_BUOYANT',
        populationFractionPercent: 65,
        clinicalRiskDescription: 'Nguy cơ gây phản ứng miễn dịch kháng thuốc (anti-drug antibody ADA) và sốc phản vệ.',
      },
      {
        name: 'Giọt dầu bôi trơn Silicone (Polydimethylsiloxane PDMS)',
        chemicalFormula: '[(CH3)2SiO]n (Low density syringe lubricant)',
        nominalDensityGPerCm3: 0.965,
        nominalDiameterNm: 1500,
        buoyancySign: 'POSITIVE_BUOYANT',
        populationFractionPercent: 35,
        clinicalRiskDescription: 'Dầu bôi trơn pít-tông trôi vào thuốc; quang học thông thường bị nhầm lẫn với protein kết tụ.',
      },
    ],
    limitOfDetectionFemtograms: 0.1,
    description:
      'The definitive biopharmaceutical quality control application under USP <788> and USP <1788>. Optical particle counters (light obscuration / MFI) cannot distinguish protein aggregates from silicone oil droplets because both appear as sub-visible spherical particles. Resonant Mass Measurement (Archimedes) relies on buoyancy: dense protein aggregates sink (negative frequency shift Delta f < 0), while lighter silicone oil floats (positive frequency shift Delta f > 0).',
    curriculumNotes:
      'GDPT 2018 Vật lý 10 & Hóa học 12: Lực đẩy Ác-si-mét trong chất lỏng; khối lượng riêng phân biệt giọt dầu silicone (d < d_nước) và hạt protein (d > d_nước); tiêu chuẩn an toàn thuốc tiêm sinh học.',
    biotechSignificance:
      'Mandatory FDA release testing for pre-filled syringes, autoinjectors, and ophthalmic antibody therapeutics.',
    uspStandardRef: 'USP <1788> Methods for the Determination of Sub-visible Particulate Matter',
  },
  {
    id: 'yeast_single_cell_growth_biomass',
    name: 'Single Yeast Cell Growth & Cell-Cycle Biomass Accumulation',
    vietnameseName: 'Đo Khối Lượng Tế Bào Đơn Nấm Men (Tăng Trưởng Sinh Khối Chu Kỳ Tế Bào - Scott Manalis MIT)',
    applicationCategory: 'SINGLE_CELL_BIOMASS',
    carrierFluidName: 'Yeast Peptone Dextrose (YPD) Growth Medium',
    carrierFluidDensityGPerCm3: 1.012,
    populations: [
      {
        name: 'Tế bào mẹ nấm men đang nảy chồi (Budding Yeast)',
        chemicalFormula: 'Saccharomyces cerevisiae single cell',
        nominalDensityGPerCm3: 1.115,
        nominalDiameterNm: 5200, // 5.2 um
        buoyancySign: 'NEGATIVE_BUOYANT',
        populationFractionPercent: 100,
        clinicalRiskDescription: 'Đo đạc tốc độ tăng trưởng sinh khối độc lập với thể tích để phát hiện điểm kiểm soát G1/S.',
      },
    ],
    limitOfDetectionFemtograms: 0.2,
    description:
      'Pioneered by Scott Manalis at MIT. The Suspended Microchannel Resonator tracks individual live cells as they flow through the oscillating cantilever. By repeatedly passing the same single cell back and forth, sub-femtogram growth rates are measured in real time without fluorescent perturbation.',
    curriculumNotes:
      'GDPT 2018 Sinh học 10: Chu kỳ tế bào, sự nhân đôi sinh khối, nguyên phân và kiểm soát kích thước tế bào ở sinh vật nhân thực.',
    biotechSignificance:
      'Single-cell drug sensitivity testing for precision oncology, evaluating chemotherapy response within hours.',
    uspStandardRef: 'Manalis et al. Nature Biotechnology Single-Cell Resonant Mass',
  },
  {
    id: 'gold_nanoparticle_extreme_density',
    name: 'NIST Gold Nanoparticle Extreme Density Standard (AuNP 19.3 g/cm³)',
    vietnameseName: 'Hạt Nano Vàng Chuẩn Tỷ Trọng Cực Cao (AuNP - Khối Lượng Riêng 19.32 g/cm³ & Sút Giảm Tần Số Sâu)',
    applicationCategory: 'METALLIC_CALIBRANT',
    carrierFluidName: 'Ultrapure Water (18.2 MOhm*cm)',
    carrierFluidDensityGPerCm3: 0.9982,
    populations: [
      {
        name: 'Hạt Nano Vàng Nguyên Chất (AuNP 60 nm)',
        chemicalFormula: 'Au(0) face-centered cubic lattice',
        nominalDensityGPerCm3: 19.32,
        nominalDiameterNm: 60,
        buoyancySign: 'NEGATIVE_BUOYANT',
        populationFractionPercent: 100,
        clinicalRiskDescription: 'Chuẩn khối lượng siêu nặng dùng hiệu chuẩn độ nhạy tuyệt đối của cantilever vi lưu.',
      },
    ],
    limitOfDetectionFemtograms: 0.05,
    description:
      'Gold possesses one of the highest elemental densities in the periodic table (19.32 g/cm³). Even a tiny 60 nm gold nanoparticle carries a buoyant mass over 18 times greater than a biological particle of identical size, causing an unmistakable sharp negative frequency spike.',
    curriculumNotes:
      'GDPT 2018 Hóa học 11 & Vật lý 10: Khối lượng riêng kim loại nặng chuyển tiếp; ứng dụng hạt nano vàng trong chẩn đoán sinh học và hiệu chuẩn thiết bị vi cơ điện tử MEMS.',
    biotechSignificance:
      'Primary calibration of cantilever stiffness k and effective mass M_eff.',
    uspStandardRef: 'NIST SRM 8012 Gold Nanoparticles Nominal 60 nm',
  },
  {
    id: 'bacterial_endospore_dehydration',
    name: 'Bacterial Endospore Dehydration & Spore Coat Density (Bacillus)',
    vietnameseName: 'Nội Bào Tử Vi Khuẩn Khử Nước (Bacillus subtilis - Bào Tử Đậm Đặc vs Tế Bào Sinh Dưỡng)',
    applicationCategory: 'BACTERIAL_SPORE',
    carrierFluidName: 'Sterile Saline',
    carrierFluidDensityGPerCm3: 1.004,
    populations: [
      {
        name: 'Nội bào tử mất nước (Dormant Endospore)',
        chemicalFormula: 'Dipicolinic acid + Calcium complex core + Keratin coat',
        nominalDensityGPerCm3: 1.48,
        nominalDiameterNm: 1100,
        buoyancySign: 'NEGATIVE_BUOYANT',
        populationFractionPercent: 80,
        clinicalRiskDescription: 'Bào tử bất hoạt chịu nhiệt và hóa chất khử trùng cực hạn; tỷ trọng cao do khử nước sâu.',
      },
      {
        name: 'Tế bào sinh dưỡng ngậm nước (Vegetative Cell)',
        chemicalFormula: 'Hydrated bacterial cell with active cytoplasm',
        nominalDensityGPerCm3: 1.10,
        nominalDiameterNm: 1600,
        buoyancySign: 'NEGATIVE_BUOYANT',
        populationFractionPercent: 20,
        clinicalRiskDescription: 'Tế bào nảy mầm đang phân chia; tỷ trọng thấp hơn gần với môi trường nước.',
      },
    ],
    limitOfDetectionFemtograms: 0.15,
    description:
      'Bacterial endospores survive extreme autoclaving and radiation due to core dehydration mediated by calcium dipicolinate. RMM directly measures single-spore buoyant density, clearly separating dormant dehydrated spores (1.48 g/cm³) from germinating vegetative cells (1.10 g/cm³).',
    curriculumNotes:
      'GDPT 2018 Sinh học 10: Sinh sản và tự vệ của vi khuẩn; trạng thái tiềm sinh nội bào tử và nguyên lý tiệt trùng y tế.',
    biotechSignificance:
      'Sterility assurance in pharmaceutical cleanrooms and biological defense spore detection.',
    uspStandardRef: 'USP <55> Biological Indicators for Sterilization',
  },
  {
    id: 'environmental_microplastics_debris',
    name: 'Environmental Microplastics & Nanoplastics Debris (PE vs PS)',
    vietnameseName: 'Hạt Vi Nhựa Môi Trường (Polyethylene Nổi vs Polystyrene Lắng - SMR Phân Tích)',
    applicationCategory: 'MICROPLASTICS',
    carrierFluidName: 'Filtered Environmental River Water',
    carrierFluidDensityGPerCm3: 1.000,
    populations: [
      {
        name: 'Vi nhựa Polyethylene nổi (LDPE/HDPE)',
        chemicalFormula: '[C2H4]n (Density < water)',
        nominalDensityGPerCm3: 0.935,
        nominalDiameterNm: 1800,
        buoyancySign: 'POSITIVE_BUOYANT',
        populationFractionPercent: 55,
        clinicalRiskDescription: 'Vi nhựa mật độ thấp trôi nổi trên mặt nước mặt, mang theo hóa chất phụ gia độc hại.',
      },
      {
        name: 'Vi nhựa Polystyrene lắng (PS debris)',
        chemicalFormula: '[C8H8]n (Density > water)',
        nominalDensityGPerCm3: 1.055,
        nominalDiameterNm: 1400,
        buoyancySign: 'NEGATIVE_BUOYANT',
        populationFractionPercent: 45,
        clinicalRiskDescription: 'Vi nhựa mật độ cao lắng chìm xuống trầm tích đáy sông biển, tích lũy sinh học trong cá và giáp xác.',
      },
    ],
    limitOfDetectionFemtograms: 0.2,
    description:
      'Microplastics contamination threatens global aquatic ecosystems. In river water, RMM simultaneously sizes sub-micron plastic debris and sorts them by polymer buoyancy: light polyethylene (0.935 g/cm³) produces positive frequency spikes, while dense polystyrene (1.055 g/cm³) yields negative spikes.',
    curriculumNotes:
      'GDPT 2018 Hóa học 12 & Sinh học 12: Polyme tổng hợp, rác thải nhựa, ô nhiễm vi nhựa trong chuỗi thức ăn và bài toán kinh tế tuần hoàn.',
    biotechSignificance:
      'Rapid potable water testing and environmental nanoplastic characterization.',
    uspStandardRef: 'WHO Drinking Water Microplastics Technical Report',
  },
];

/**
 * Calculate Single Particle Buoyant Mass:
 * m_b = V_p * (rho_p - rho_fluid)
 * Output in femtograms (1 fg = 10^-15 g)
 */
export function calculateBuoyantMassFemtograms(
  diameterNm: number,
  particleDensityGPerCm3: number,
  fluidDensityGPerCm3: number
): number {
  const rCm = (diameterNm / 2.0) * 1e-7;
  const volumeCm3 = (4.0 / 3.0) * Math.PI * Math.pow(rCm, 3);
  const deltaRho = particleDensityGPerCm3 - fluidDensityGPerCm3;
  const buoyantMassG = volumeCm3 * deltaRho;
  return buoyantMassG * 1e15; // convert g to femtograms (fg)
}

/**
 * Calculate Resonator Frequency Shift:
 * Delta f / f_0 = -m_b / (2 * M_eff)
 * where f_0 = 405 kHz, M_eff = 2.45 ng = 2.45e6 fg
 */
export function calculateFrequencyShiftHz(
  buoyantMassFg: number,
  f0Hz: number = SMR_RESONATOR_F0_HZ,
  mEffNanograms: number = SMR_EFFECTIVE_MASS_NANOGRAMS
): number {
  const mEffFg = mEffNanograms * 1e6; // ng to fg
  const deltaF = -(buoyantMassFg / (2.0 * mEffFg)) * f0Hz;
  return Math.round(deltaF * 100) / 100; // in Hz
}

/**
 * Calculate Dry Mass from Volume and Density:
 * m_p = V_p * rho_p
 */
export function calculateDryMassFemtograms(
  diameterNm: number,
  particleDensityGPerCm3: number
): number {
  const rCm = (diameterNm / 2.0) * 1e-7;
  const volumeCm3 = (4.0 / 3.0) * Math.PI * Math.pow(rCm, 3);
  return volumeCm3 * particleDensityGPerCm3 * 1e15;
}

/**
 * Calculate Equivalent Spherical Diameter from Dry Mass and Density:
 * V_p = m_p / rho_p = (4/3) * pi * r^3 => d = 2 * ( (3 * m_p / (4 * pi * rho_p)) )^(1/3)
 */
export function calculateApparentDryDiameterNm(
  dryMassFg: number,
  particleDensityGPerCm3: number
): number {
  if (particleDensityGPerCm3 <= 0 || dryMassFg <= 0) return 0;
  const massG = dryMassFg * 1e-15;
  const volumeCm3 = massG / particleDensityGPerCm3;
  const radiusCm = Math.cbrt((3.0 * volumeCm3) / (4.0 * Math.PI));
  return Math.round(radiusCm * 2.0 * 1e7 * 10) / 10;
}

/**
 * Two-Fluid Density Extraction:
 * Passes identical particle through fluid 1 and fluid 2:
 * rho_p = (m_b,1 * rho_2 - m_b,2 * rho_1) / (m_b,1 - m_b,2)
 */
export function calculateTwoFluidDensityGPerCm3(
  buoyantMassFluid1Fg: number,
  buoyantMassFluid2Fg: number,
  fluidDensity1GPerCm3: number,
  fluidDensity2GPerCm3: number
): number {
  const deltaMb = buoyantMassFluid1Fg - buoyantMassFluid2Fg;
  if (Math.abs(deltaMb) < 1e-12) return fluidDensity1GPerCm3;
  const numerator = buoyantMassFluid1Fg * fluidDensity2GPerCm3 - buoyantMassFluid2Fg * fluidDensity1GPerCm3;
  return Math.round((numerator / deltaMb) * 10000) / 10000;
}

/**
 * Generate Characteristic Suspended Microchannel Transit Pulse:
 * As particle transits the cantilever U-tube tip:
 * - Starts at 0 Hz baseline
 * - Reaches peak shift Delta f at apex of U-tube (center at 60 us)
 * - Returns to 0 Hz baseline
 */
export function generateTransitPulse(
  peakShiftHz: number,
  transitDurationUs: number = 80
): TransitPulsePoint[] {
  const points: TransitPulsePoint[] = [];
  const centerT = transitDurationUs / 2.0;
  const sigmaT = transitDurationUs / 4.5;

  for (let t = 0; t <= transitDurationUs; t += 2) {
    const dt = t - centerT;
    const shape = Math.exp(-(dt * dt) / (2 * sigmaT * sigmaT));
    const shift = peakShiftHz * shape;
    // Add minor baseline vibration noise (0.15 Hz)
    const noise = (Math.sin(t * 1.8) + Math.cos(t * 2.7)) * 0.08;

    points.push({
      timeMicrosec: t,
      frequencyShiftHz: Math.round((shift + noise) * 100) / 100,
    });
  }

  return points;
}

/**
 * Simulate Resonant Mass Measurement Experiment
 */
export function simulateRmmExperiment(
  standard: RmmStandard,
  totalEventsToSimulate: number = 24
): RmmSimulationResult {
  const fluidRho = standard.carrierFluidDensityGPerCm3;
  const events: RmmParticleEvent[] = [];

  let negCount = 0;
  let posCount = 0;
  const negMasses: number[] = [];
  const posMasses: number[] = [];

  for (let i = 0; i < totalEventsToSimulate; i++) {
    // Pick population based on percentage
    const rand = Math.random() * 100.0;
    let cum = 0.0;
    let pop = standard.populations[0];
    for (const p of standard.populations) {
      cum += p.populationFractionPercent;
      if (rand <= cum) {
        pop = p;
        break;
      }
    }

    // Gaussian jitter around nominal diameter and density
    const dJitter = pop.nominalDiameterNm * (1.0 + (Math.random() - 0.5) * 0.25);
    const rhoJitter = pop.nominalDensityGPerCm3 * (1.0 + (Math.random() - 0.5) * 0.04);

    const mbFg = calculateBuoyantMassFemtograms(dJitter, rhoJitter, fluidRho);
    const mpFg = calculateDryMassFemtograms(dJitter, rhoJitter);
    const deltaFHz = calculateFrequencyShiftHz(mbFg);

    const pulse = generateTransitPulse(deltaFHz);

    const sign: ParticleBuoyancySign =
      mbFg > 0.05 ? 'NEGATIVE_BUOYANT' : mbFg < -0.05 ? 'POSITIVE_BUOYANT' : 'NEUTRAL';

    if (sign === 'NEGATIVE_BUOYANT') {
      negCount++;
      negMasses.push(Math.abs(mbFg));
    } else {
      posCount++;
      posMasses.push(Math.abs(mbFg));
    }

    events.push({
      eventId: i + 1,
      analyteName: pop.name,
      buoyantMassFemtograms: Math.round(mbFg * 100) / 100,
      dryMassFemtograms: Math.round(mpFg * 100) / 100,
      densityGPerCm3: Math.round(rhoJitter * 1000) / 1000,
      equivalentDiameterNm: Math.round(dJitter),
      buoyancySign: sign,
      peakFrequencyShiftHz: deltaFHz,
      pulseTrace: pulse,
    });
  }

  const medianNeg =
    negMasses.length > 0 ? negMasses.sort((a, b) => a - b)[Math.floor(negMasses.length / 2)] : 0.0;
  const medianPos =
    posMasses.length > 0 ? posMasses.sort((a, b) => a - b)[Math.floor(posMasses.length / 2)] : 0.0;

  const ratioStr =
    posCount > 0
      ? `${((posCount / totalEventsToSimulate) * 100).toFixed(0)}% Dầu Nổi / ${((negCount / totalEventsToSimulate) * 100).toFixed(0)}% Protein Lắng`
      : '100% Hạt Lắng';

  return {
    standard,
    totalEventsCount: totalEventsToSimulate,
    negativeBuoyantCount: negCount,
    positiveBuoyantCount: posCount,
    medianNegativeMassFg: Math.round(medianNeg * 100) / 100,
    medianPositiveMassFg: Math.round(medianPos * 100) / 100,
    resolvedSiliconOilVsProteinRatio: ratioStr,
    events,
  };
}

/**
 * Match a card to an appropriate RMM standard
 */
export function getMatchingRmmCard(card: any): RmmStandard | null {
  if (!card) return null;
  const name = (card.name || '').toLowerCase();
  const desc = (card.description || '').toLowerCase();
  const formula = (card.chemicalFormula || card.formula || '').toLowerCase();

  // 1. Pre-filled syringe / Silicone / Protein aggregate
  if (
    name.includes('silicon') ||
    desc.includes('silicon') ||
    name.includes('kết tụ') ||
    desc.includes('kết tụ') ||
    desc.includes('bơm tiêm') ||
    desc.includes('ống tiêm') ||
    desc.includes('syringe') ||
    desc.includes('1788')
  ) {
    return RMM_STANDARD_CATALOG.find((s) => s.id === 'prefilled_syringe_igg_silicone') || null;
  }

  // 2. Yeast cell / Biomass
  if (
    name.includes('nấm men') ||
    name.includes('yeast') ||
    desc.includes('sinh khối') ||
    desc.includes('chu kỳ tế bào')
  ) {
    return RMM_STANDARD_CATALOG.find((s) => s.id === 'yeast_single_cell_growth_biomass') || null;
  }

  // 3. Gold nanoparticle / Density
  if (
    name.includes('vàng') &&
    (desc.includes('tỷ trọng') || desc.includes('density') || desc.includes('khối lượng riêng'))
  ) {
    return RMM_STANDARD_CATALOG.find((s) => s.id === 'gold_nanoparticle_extreme_density') || null;
  }

  // 4. Bacterial spore
  if (
    name.includes('bào tử') ||
    desc.includes('spore') ||
    name.includes('bacillus')
  ) {
    return RMM_STANDARD_CATALOG.find((s) => s.id === 'bacterial_endospore_dehydration') || null;
  }

  // 5. Microplastics
  if (
    name.includes('vi nhựa') ||
    desc.includes('microplastic') ||
    name.includes('plastic')
  ) {
    return RMM_STANDARD_CATALOG.find((s) => s.id === 'environmental_microplastics_debris') || null;
  }

  return null;
}

/**
 * Validation helper for RMM standard physics
 */
export function validateRmmStandardPhysics(standard: RmmStandard): boolean {
  if (standard.carrierFluidDensityGPerCm3 <= 0) return false;
  if (standard.populations.length === 0) return false;
  for (const pop of standard.populations) {
    if (pop.nominalDensityGPerCm3 <= 0) return false;
    if (pop.nominalDiameterNm <= 0) return false;
  }
  return true;
}
