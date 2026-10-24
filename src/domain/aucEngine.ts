/**
 * Analytical Ultracentrifugation (AUC), Lamm Equation & Svedberg Sedimentation Engine
 * 
 * Physical Principles & International Standards:
 * 1. Theodor Svedberg Centenary Equation (Nobel Prize in Chemistry 1926):
 *    M = (s * R * T) / [ D * (1 - v_bar_p * rho_solvent) ]
 *    where:
 *    - s is the sedimentation coefficient in Svedberg units (1 S = 10^-13 s)
 *    - D is translational diffusion coefficient
 *    - v_bar_p is partial specific volume (~0.73 cm^3/g)
 *    - (1 - v_bar_p * rho) is the buoyant factor
 * 2. Lamm Partial Differential Equation (Sedimentation Velocity SV-AUC):
 *    dc/dt = -(1/r) * d/dr [ r * (s * omega^2 * r * c - D * dc/dr) ]
 *    Deconvoluted into continuous c(s) sedimentation coefficient distribution (SEDFIT algorithm).
 * 3. Sedimentation Equilibrium (SE-AUC):
 *    Flux = 0 => c(r) = c(r_0) * exp[ M * (1 - v_bar_p * rho) * omega^2 * (r^2 - r_0^2) / (2 * R * T) ]
 *    Slope of ln(c) vs r^2 provides absolute molecular mass M without shape assumption!
 * 4. Frictional Ratio f/f_0 (Hydrodynamic Shape):
 *    f/f_0 = 1.0 (ideal sphere), 1.2 - 1.3 (globular protein), > 1.8 (elongated/rod-like).
 * 5. 5 Benchmark Standards:
 *    - Hen Egg White Lysozyme (HEWL) Monomer (1.91 S, 14.3 kDa)
 *    - Bovine Serum Albumin (BSA) Oligomer Ladder (4.3 S Monomer, 6.6 S Dimer, 8.5 S Trimer)
 *    - Therapeutic Monoclonal Antibody IgG1 (6.6 S Monomer vs 9.8 S Dimer vs HMW, USP <129>)
 *    - Bacterial Ribosome 70S Complex (70S <=> 50S + 30S Subunit Dissociation)
 *    - Adeno-Associated Virus (AAV) Empty vs Full Capsid (60S Empty vs 90S Full)
 * 6. Vietnam GDPT 2018 Curriculum:
 *    - Vật lý 10: Chuyển động tròn đều, gia tốc hướng tâm a_ht = omega^2 * r, lực ly tâm.
 *    - Hóa học 12: Đại phân tử sinh học, sự sa lắng của hệ keo và protein trong trường ly tâm cao.
 */

export const SVEDBERG_UNIT_SECONDS = 1e-13; // 1 S = 10^-13 s
export const GAS_CONSTANT_R = 8.314462; // J / (mol * K)
export const WATER_DENSITY_20C = 0.99823; // g/cm^3
export const WATER_VISCOSITY_20C_POISE = 0.01002; // Poise (g / (cm * s))

export interface AucSpecies {
  name: string;
  sedimentationCoeffSvedberg: number; // s in S
  molecularWeightDa: number;
  frictionalRatioFOverF0: number; // f/f_0
  peakFractionPercent: number; // Abundance
  stoichiometry: string;
}

export interface AucStandard {
  id: string;
  name: string;
  vietnameseName: string;
  applicationCategory: 'PROTEIN_CALIBRANT' | 'OLIGOMERIC_LADDER' | 'MAB_SUBVISIBLE' | 'RIBOSOME_COMPLEX' | 'AAV_CAPSID_RATIO';
  partialSpecificVolumeCm3PerG: number;
  rotorSpeedRpm: number; // e.g. 50,000 RPM (200,000 g)
  temperatureCelsius: number;
  carrierBuffer: string;
  speciesList: AucSpecies[];
  description: string;
  curriculumNotes: string;
  nobelIupacReference: string;
}

export interface AucRadialScanPoint {
  radiusCm: number; // 5.8 cm (meniscus) to 7.2 cm (cell bottom)
  concentrationAbs: number; // Absorbance at 280 nm
  timeMinutes: number; // Scan time
}

export interface AucDistributionPoint {
  svedbergS: number; // 0 to 120 S
  distributionCs: number; // c(s) distribution density
}

export interface AucSimulationResult {
  standard: AucStandard;
  rotorSpeedRpm: number;
  angularVelocityRadPerSec: number;
  centrifugalFieldMaxG: number; // Relative Centrifugal Field (g)
  meniscusRadiusCm: number;
  bottomRadiusCm: number;
  radialScans: { scanTimeMinutes: number; points: AucRadialScanPoint[] }[];
  distributionCsPoints: AucDistributionPoint[];
  weightedAverageSvedberg: number;
  overallMolarMassDa: number;
  overallFrictionalRatio: number;
  sedfitSummary: string;
  curriculumIntegrationNotes: string;
}

/**
 * Standard Catalog: 5 Benchmark Analytical Ultracentrifugation Systems
 */
export const AUC_STANDARD_CATALOG: AucStandard[] = [
  {
    id: 'lysozyme_hewl_monomer_calibrant',
    name: 'Hen Egg White Lysozyme (HEWL) Monomer Calibrant',
    vietnameseName: 'Chuẩn Sa Lắng Lysozyme - Đo Đơn Phân Tử (1.91 S / 14.3 kDa)',
    applicationCategory: 'PROTEIN_CALIBRANT',
    partialSpecificVolumeCm3PerG: 0.703,
    rotorSpeedRpm: 60000, // 60,000 RPM (~250,000 g)
    temperatureCelsius: 20.0,
    carrierBuffer: '20 mM Sodium Acetate, 100 mM NaCl, pH 4.5',
    speciesList: [
      {
        name: 'Lysozyme Monomer',
        sedimentationCoeffSvedberg: 1.91,
        molecularWeightDa: 14300,
        frictionalRatioFOverF0: 1.21,
        peakFractionPercent: 100.0,
        stoichiometry: '1x (Cầu đặc biệt globular)',
      },
    ],
    description:
      'Chuẩn sa lắng quốc tế kiểm định máy siêu ly tâm phân tích (Beckman Optima AUC). Tỷ số ma sát f/f0 = 1.21 phản ánh cấu trúc hình cầu đặc khít với một lớp vỏ nước hydrat hóa đơn phân tử bao quanh.',
    curriculumNotes:
      'Vật lý 10: Chuyển động tròn đều, gia tốc hướng tâm cực đại a_ht = omega^2 * r đạt 250,000 lần gia tốc trọng trường g; Hóa học 12: Protein hình cầu tan trong nước.',
    nobelIupacReference: 'Theodor Svedberg Nobel Prize in Chemistry (1926) Centenary Standard / IUPAC Biophysics',
  },
  {
    id: 'bsa_oligomer_ladder_auc',
    name: 'Bovine Serum Albumin (BSA) Oligomer Sedimentation Ladder',
    vietnameseName: 'Thang Sa Lắng Oligomer BSA - Tách Monomer (4.3 S) / Dimer (6.6 S)',
    applicationCategory: 'OLIGOMERIC_LADDER',
    partialSpecificVolumeCm3PerG: 0.734,
    rotorSpeedRpm: 50000,
    temperatureCelsius: 20.0,
    carrierBuffer: 'PBS, pH 7.2, 0.02% NaN3',
    speciesList: [
      {
        name: 'BSA Monomer',
        sedimentationCoeffSvedberg: 4.31,
        molecularWeightDa: 66430,
        frictionalRatioFOverF0: 1.30,
        peakFractionPercent: 82.5,
        stoichiometry: '1x (Monomer)',
      },
      {
        name: 'BSA Dimer',
        sedimentationCoeffSvedberg: 6.62,
        molecularWeightDa: 132860,
        frictionalRatioFOverF0: 1.38,
        peakFractionPercent: 14.5,
        stoichiometry: '2x (Dimer)',
      },
      {
        name: 'BSA Trimer',
        sedimentationCoeffSvedberg: 8.54,
        molecularWeightDa: 199290,
        frictionalRatioFOverF0: 1.45,
        peakFractionPercent: 3.0,
        stoichiometry: '3x (Trimer)',
      },
    ],
    description:
      'Hệ mẫu kinh điển kiểm chứng phương trình Svedberg cho các bậc oligomer. Hệ số sa lắng s tăng từ 4.3 S lên 6.6 S và 8.5 S tỷ lệ thuận với M^(2/3) cho các cấu trúc hình cầu kết tụ.',
    curriculumNotes:
      'Hóa học 12: Khối lượng mol phân tử và sự tự tập hợp oligomer; Vật lý 10: Cân bằng giữa lực ly tâm, lực đẩy Ác-si-mét và lực cản nhớt Stokes.',
    nobelIupacReference: 'Methods in Enzymology AUC Benchmark Series',
  },
  {
    id: 'therapeutic_mab_igg1_subvisible_auc',
    name: 'Therapeutic Monoclonal Antibody IgG1 Sub-Visible Aggregates',
    vietnameseName: 'Kháng Thể Đơn Dòng Điều Trị IgG1 - Phân Tích Sa Lắng Hạt Kết Tụ',
    applicationCategory: 'MAB_SUBVISIBLE',
    partialSpecificVolumeCm3PerG: 0.730,
    rotorSpeedRpm: 45000,
    temperatureCelsius: 20.0,
    carrierBuffer: '10 mM Histidine, 140 mM Sucrose, pH 6.0',
    speciesList: [
      {
        name: 'IgG1 Monomer (Nguyên vẹn)',
        sedimentationCoeffSvedberg: 6.65,
        molecularWeightDa: 148500,
        frictionalRatioFOverF0: 1.48, // Extended Y-shape antibody
        peakFractionPercent: 95.8,
        stoichiometry: '1x (Hình chữ Y mềm dẻo)',
      },
      {
        name: 'Soluble Dimer',
        sedimentationCoeffSvedberg: 9.85,
        molecularWeightDa: 297000,
        frictionalRatioFOverF0: 1.55,
        peakFractionPercent: 3.4,
        stoichiometry: '2x (Dimer nối chéo)',
      },
      {
        name: 'Tetramer / HMW',
        sedimentationCoeffSvedberg: 15.2,
        molecularWeightDa: 594000,
        frictionalRatioFOverF0: 1.72,
        peakFractionPercent: 0.8,
        stoichiometry: '>4x (Hạt kết tụ lớn)',
      },
    ],
    description:
      'Phương pháp trực giao tham chiếu tuyệt đối (Orthogonal Method) kiểm tra kết quả SEC. AUC hoạt động trong dung dịch tự do không cột, loại trừ hoàn toàn hiện tượng thất thoát hạt kết tụ do dính vào màng lọc hay hạt gel SEC.',
    curriculumNotes:
      'Hóa học 12: Cấu tạo protein miễn dịch kháng thể; Dược học: Độ tinh khiết thuốc tiêm truyền sinh học theo Dược điển Hoa Kỳ USP <129>.',
    nobelIupacReference: 'USP <129> Analytical Procedures for Recombinant Therapeutic Monoclonal Antibodies',
  },
  {
    id: 'ribosome_70s_complex_dissociation',
    name: 'Bacterial Ribosome 70S Complex & Subunit Dissociation (50S + 30S)',
    vietnameseName: 'Phức Hệ Ribosome Vi Khuẩn 70S - Phân Ly Tiểu Phần (50S & 30S)',
    applicationCategory: 'RIBOSOME_COMPLEX',
    partialSpecificVolumeCm3PerG: 0.630, // Ribonucleoprotein complex (higher density due to RNA)
    rotorSpeedRpm: 35000,
    temperatureCelsius: 20.0,
    carrierBuffer: '20 mM Tris-HCl, pH 7.6, 10 mM MgCl2, 100 mM NH4Cl',
    speciesList: [
      {
        name: '30S Small Subunit (16S rRNA + 21 proteins)',
        sedimentationCoeffSvedberg: 30.0,
        molecularWeightDa: 850000,
        frictionalRatioFOverF0: 1.70,
        peakFractionPercent: 22.0,
        stoichiometry: 'Tiểu phần nhỏ 30S',
      },
      {
        name: '50S Large Subunit (23S + 5S rRNA + 33 proteins)',
        sedimentationCoeffSvedberg: 50.0,
        molecularWeightDa: 1450000,
        frictionalRatioFOverF0: 1.58,
        peakFractionPercent: 28.0,
        stoichiometry: 'Tiểu phần lớn 50S',
      },
      {
        name: '70S Intact Functional Ribosome',
        sedimentationCoeffSvedberg: 70.0,
        molecularWeightDa: 2300000,
        frictionalRatioFOverF0: 1.52,
        peakFractionPercent: 50.0,
        stoichiometry: 'Phức hệ hoàn chỉnh 70S',
      },
    ],
    description:
      'Nguồn gốc lịch sử tên gọi Svedberg trong sinh học phân tử! Tên gọi 30S, 50S, 70S của ribosome xuất phát trực tiếp từ hệ số sa lắng s đo bằng máy siêu ly tâm phân tích của Svedberg.',
    curriculumNotes:
      'Sinh học 10 & 12: Cấu tạo ribosome và quá trình dịch mã tổng hợp protein; Hóa học 12: Phức hệ đại phân tử ribonucleoprotein.',
    nobelIupacReference: 'Venki Ramakrishnan (Nobel Prize in Chemistry 2009) Ribosome Structure Foundations',
  },
  {
    id: 'aav_capsid_empty_vs_full_auc',
    name: 'Adeno-Associated Virus (AAV) Empty vs Full Capsid Discrimination',
    vietnameseName: 'Vector AAV Siêu Ly Tâm - Phân Biệt Capsid Rỗng (60S) vs Đầy (90S)',
    applicationCategory: 'AAV_CAPSID_RATIO',
    partialSpecificVolumeCm3PerG: 0.730,
    rotorSpeedRpm: 20000,
    temperatureCelsius: 20.0,
    carrierBuffer: 'PBS, 0.001% Poloxamer 188, pH 7.4',
    speciesList: [
      {
        name: 'AAV Empty Capsid (Protein rỗng)',
        sedimentationCoeffSvedberg: 60.5,
        molecularWeightDa: 3750000,
        frictionalRatioFOverF0: 1.10, // Highly spherical icosahedral capsid
        peakFractionPercent: 28.0,
        stoichiometry: 'Capsid icosahedral rỗng (T=1)',
      },
      {
        name: 'AAV Full Capsid (Chứa ssDNA)',
        sedimentationCoeffSvedberg: 91.2,
        molecularWeightDa: 5250000,
        frictionalRatioFOverF0: 1.12,
        peakFractionPercent: 72.0,
        stoichiometry: 'Capsid + 4.7 kb gen',
      },
    ],
    description:
      'Tiêu chuẩn phân tích kiểm định độ tinh khiết vector trị liệu gen AAV theo quy định FDA. Do DNA có mật độ khối cao hơn protein, hạt capsid đầy (Full) sa lắng nhanh hơn đáng kể (91 S so với 60 S), đem lại độ phân giải đỉnh tách biệt hoàn toàn.',
    curriculumNotes:
      'Sinh học 12: Công nghệ DNA tái tổ hợp và phân phối gen đích; Vật lý 10: Khối lượng riêng và lực cản môi trường.',
    nobelIupacReference: 'FDA CBER Guidance on Analytical Methods for Viral Gene Therapy Vectors',
  },
];

/**
 * Calculate Relative Centrifugal Field (g):
 * RCF = 1.118e-5 * r_cm * (RPM)^2
 */
export function calculateRelativeCentrifugalFieldG(
  rotorSpeedRpm: number,
  radiusCm: number = 7.0
): number {
  return Math.round(1.118e-5 * radiusCm * Math.pow(rotorSpeedRpm, 2));
}

/**
 * Svedberg Equation: Calculate Molecular Weight from s and D
 * M = (s * R * T) / [ D * (1 - v_bar * rho) ]
 */
export function calculateMolarMassFromSvedbergEquation(
  svedbergS: number,
  diffusionCoeffCm2PerS: number,
  partialSpecificVolumeCm3PerG: number,
  tempCelsius: number = 20.0,
  solventDensityGPerCm3: number = WATER_DENSITY_20C
): number {
  const TK = tempCelsius + 273.15;
  const sSec = svedbergS * SVEDBERG_UNIT_SECONDS;
  const buoyancy = 1.0 - partialSpecificVolumeCm3PerG * solventDensityGPerCm3;
  if (buoyancy <= 0 || diffusionCoeffCm2PerS <= 0) return 0;

  // Diffusion in cm^2/s to m^2/s (* 1e-4)
  const D_m2_s = diffusionCoeffCm2PerS * 1e-4;

  // In SI units, M is in kg/mol; multiply by 1000 to convert to g/mol (Da)
  const M_kg_mol = (sSec * GAS_CONSTANT_R * TK) / (D_m2_s * buoyancy);
  const M_da = M_kg_mol * 1000.0;
  return Math.round(M_da);
}

/**
 * Simulate AUC Sedimentation Velocity Radial Scans and c(s) distribution
 */
export function simulateAucExperiment(
  standard: AucStandard,
  numTimeScans: number = 5,
  numRadiusPoints: number = 100
): AucSimulationResult {
  const omega = (standard.rotorSpeedRpm * 2.0 * Math.PI) / 60.0; // rad/s
  const rMin = 5.9; // Meniscus cm
  const rMax = 7.2; // Cell bottom cm
  const maxG = calculateRelativeCentrifugalFieldG(standard.rotorSpeedRpm, rMax);

  const scanTimes = [15, 45, 90, 150, 240]; // minutes

  const radialScans = scanTimes.slice(0, numTimeScans).map((tMin) => {
    const tSec = tMin * 60.0;
    const points: AucRadialScanPoint[] = [];

    const dr = (rMax - rMin) / (numRadiusPoints - 1);

    for (let i = 0; i < numRadiusPoints; i++) {
      const r = rMin + i * dr;

      // Sum boundary movement of each species based on Lamm equation approximation:
      // r_boundary(t) = r_meniscus * exp(s * omega^2 * t)
      let totalAbs = 0.0;

      for (const sp of standard.speciesList) {
        const sSec = sp.sedimentationCoeffSvedberg * SVEDBERG_UNIT_SECONDS;
        const rBoundary = rMin * Math.exp(sSec * Math.pow(omega, 2) * tSec);
        const diffusionWidth = Math.sqrt(2.0 * 5e-7 * tSec); // cm width

        // Sigmoidal error function boundary (depleted near meniscus, plateau near bottom)
        const z = (r - rBoundary) / Math.max(0.015, diffusionWidth * 20.0);
        const plateauFraction = 0.5 * (1.0 + Math.tanh(z * 1.8));

        // Radial dilution: c(t) = c_0 * (r_meniscus / r_boundary)^2
        const radialDilution = Math.pow(rMin / Math.max(rMin, rBoundary), 2);

        const fraction = sp.peakFractionPercent / 100.0;
        totalAbs += fraction * plateauFraction * radialDilution;
      }

      points.push({
        radiusCm: Math.round(r * 1000) / 1000,
        concentrationAbs: Math.round(totalAbs * 1000) / 1000,
        timeMinutes: tMin,
      });
    }

    return {
      scanTimeMinutes: tMin,
      points,
    };
  });

  // Generate continuous c(s) sedimentation coefficient distribution
  const maxS = standard.speciesList.reduce((max, sp) => Math.max(max, sp.sedimentationCoeffSvedberg), 0) * 1.4;
  const numSPoints = 120;
  const sStep = maxS / (numSPoints - 1);
  const distributionCsPoints: AucDistributionPoint[] = [];

  let sumFractionS = 0.0;
  let sumFractionMw = 0.0;
  let sumFractionF = 0.0;

  for (let i = 0; i < numSPoints; i++) {
    const s = i * sStep;
    let cs = 0.0;

    for (const sp of standard.speciesList) {
      const centerS = sp.sedimentationCoeffSvedberg;
      const widthS = Math.max(0.12, centerS * 0.04);
      const amp = sp.peakFractionPercent / 100.0;
      cs += amp * Math.exp(-Math.pow(s - centerS, 2) / (2.0 * Math.pow(widthS, 2)));
    }

    distributionCsPoints.push({
      svedbergS: Math.round(s * 100) / 100,
      distributionCs: Math.round(cs * 1000) / 1000,
    });
  }

  for (const sp of standard.speciesList) {
    const frac = sp.peakFractionPercent / 100.0;
    sumFractionS += frac * sp.sedimentationCoeffSvedberg;
    sumFractionMw += frac * sp.molecularWeightDa;
    sumFractionF += frac * sp.frictionalRatioFOverF0;
  }

  return {
    standard,
    rotorSpeedRpm: standard.rotorSpeedRpm,
    angularVelocityRadPerSec: Math.round(omega),
    centrifugalFieldMaxG: maxG,
    meniscusRadiusCm: rMin,
    bottomRadiusCm: rMax,
    radialScans,
    distributionCsPoints,
    weightedAverageSvedberg: Math.round(sumFractionS * 100) / 100,
    overallMolarMassDa: Math.round(sumFractionMw),
    overallFrictionalRatio: Math.round(sumFractionF * 100) / 100,
    sedfitSummary: standard.nobelIupacReference,
    curriculumIntegrationNotes: standard.curriculumNotes,
  };
}

/**
 * Match a card to an appropriate AUC standard
 */
export function getMatchingAucCard(card: any): AucStandard | null {
  if (!card) return null;
  const name = (card.name || '').toLowerCase();
  const desc = (card.description || '').toLowerCase();

  // 1. Ribosome 70S / 50S / 30S
  if (
    name.includes('ribosome') ||
    desc.includes('70s') ||
    desc.includes('50s') ||
    desc.includes('30s') ||
    desc.includes('tiểu phần ribosome')
  ) {
    return AUC_STANDARD_CATALOG.find((s) => s.id === 'ribosome_70s_complex_dissociation') || null;
  }

  // 2. AAV Capsid empty vs full
  if (
    name.includes('aav') ||
    desc.includes('adeno-associated') ||
    desc.includes('capsid rỗng') ||
    desc.includes('60s') ||
    desc.includes('90s')
  ) {
    return AUC_STANDARD_CATALOG.find((s) => s.id === 'aav_capsid_empty_vs_full_auc') || null;
  }

  // 3. Lysozyme monomer
  if (
    name.includes('lysozyme') ||
    desc.includes('1.91 s') ||
    desc.includes('chuẩn sa lắng') ||
    desc.includes('svedberg')
  ) {
    return AUC_STANDARD_CATALOG.find((s) => s.id === 'lysozyme_hewl_monomer_calibrant') || null;
  }

  // 4. BSA oligomer
  if (
    name.includes('bsa') ||
    desc.includes('bovine serum albumin') ||
    desc.includes('4.3 s') ||
    desc.includes('thang sa lắng')
  ) {
    return AUC_STANDARD_CATALOG.find((s) => s.id === 'bsa_oligomer_ladder_auc') || null;
  }

  // 5. Monoclonal antibody IgG1
  if (
    name.includes('kháng thể') ||
    name.includes('igg') ||
    desc.includes('mab') ||
    desc.includes('6.6 s') ||
    desc.includes('siêu ly tâm phân tích')
  ) {
    return AUC_STANDARD_CATALOG.find((s) => s.id === 'therapeutic_mab_igg1_subvisible_auc') || null;
  }

  return null;
}

/**
 * Validation helper for AUC physics
 */
export function validateAucStandardPhysics(standard: AucStandard): boolean {
  if (standard.rotorSpeedRpm <= 0) return false;
  if (standard.partialSpecificVolumeCm3PerG <= 0) return false;
  if (standard.speciesList.length === 0) return false;
  for (const sp of standard.speciesList) {
    if (sp.sedimentationCoeffSvedberg <= 0) return false;
    if (sp.molecularWeightDa <= 0) return false;
  }
  return true;
}
