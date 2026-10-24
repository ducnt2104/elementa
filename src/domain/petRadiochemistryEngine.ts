/**
 * ELEMENTA - Positron Emission Tomography (PET) Radiochemistry & β⁺ Annihilation Coincidence Engine
 *
 * Biophysical Foundations & International Standards:
 * - Positron Beta-Plus Decay (β⁺ Decay):
 *     ^A_Z X -> ^A_{Z-1} Y + e⁺ + ν_e
 *     Proton transforms into neutron, emitting a positron (anti-electron e⁺) and electron neutrino.
 * - Thermalization & Electron-Positron Annihilation:
 *     Positron loses kinetic energy over positron range R_pos (0.2 - 2.5 mm in tissue).
 *     Thermalized positron encounters an orbital electron:
 *     e⁺ + e⁻ -> 2 γ
 *     Conservation of energy and momentum yields two collinear gamma photons:
 *     E_γ = m_e · c² = 511.0 keV traveling in opposite directions (180° ± 0.25°).
 * - Coincidence Detection & Line of Response (LOR):
 *     Dual scintillation crystals (LSO/LYSO + SiPM) record simultaneous events within timing window τ_coin (3 - 6 ns).
 *     Time-of-Flight (TOF-PET) localization: Δx = (c · Δt) / 2 (Δt < 400 ps).
 * - Cyclotron Production & Radiosynthesis:
 *     - ¹⁸F: ¹⁸O(p, n)¹⁸F (t_1/2 = 109.8 min, E_β+,max = 634 keV).
 *     - [¹⁸F]FDG (2-deoxy-2-[¹⁸F]fluoro-D-glucose, Hamacher 1986):
 *       Mannose triflate nucleophilic substitution catalyzed by Kryptofix 2.2.2 (K_222).
 *     - Warburg Effect: Malignant cells overexpress GLUT1/3 and Hexokinase, phosphorylating [¹⁸F]FDG
 *       into [¹⁸F]FDG-6-phosphate, which cannot isomerize and becomes metabolically trapped!
 * - Standardized Uptake Value (SUV):
 *     SUV = [ Tissue Activity (Bq/g) ] / [ Injected Dose (Bq) / Body Weight (g) ].
 *     Malignant lesions exhibit SUV_max > 2.5 - 20.0.
 * - Curriculum: Vietnam GDPT 2018 (Vật lý 12: Phóng xạ hạt nhân β⁺, cặp phản vật chất positron-electron hủy cặp tạo photon 511 keV, định luật phóng xạ; Hóa học 12: Hóa học đồng vị, dẫn xuất glucose; Sinh học 11-12: Chuyển hóa glucose ung thư).
 *
 * Author: Antigravity × Gemini 3.8 Flash (Milestone 68)
 */

export const ELECTRON_REST_MASS_ENERGY_KEV = 511.0; // 511 keV per annihilation photon
export const SPEED_OF_LIGHT_CM_PER_NS = 29.979; // c in cm/ns

export interface PetCoincidenceEvent {
  detectorIndex1: number; // Angle 0 to 360°
  detectorIndex2: number; // Collinear ~ opposite angle (180° offset)
  timeOfFlightDeltaPs: number; // Δt in picoseconds (-500 to +500 ps)
  localizedOffsetMm: number; // Δx = (c · Δt) / 2
  photonEnergyKev: number; // 511.0 keV
}

export interface PetTissueCompartment {
  name: string;
  vietnameseName: string;
  suvValue: number; // Standardized Uptake Value
  activityConcentrationKbqPerMl: number; // kBq/mL
  metabolicStatus: 'NORMAL_PHYSIOLOGICAL' | 'HYPERMETABOLIC_MALIGNANT' | 'LOW_UPTAKE';
}

export interface PetSpecimenStandard {
  id: string;
  name: string;
  vietnameseName: string;
  radionuclide: 'F_18' | 'GA_68' | 'C_11' | 'N_13' | 'O_15';
  halfLifeMinutes: number; // t_1/2 in minutes
  positronMaxEnergyKev: number; // E_β+,max in keV
  meanPositronRangeMm: number; // Mean range in tissue (mm)
  targetOrganOrBiomarker: string;
  injectedDoseMbc: number; // Injected activity in MBq (typically 185 - 370 MBq)
  uptakeTimeMinutes: number; // Standard patient rest time (e.g. 60 min for FDG)
  compartments: PetTissueCompartment[];
  synthesisPrecursor?: string;
  clinicalApplication: string;
  description: string;
  curriculumNotes: string;
}

export interface PetSimulationResult {
  specimen: PetSpecimenStandard;
  elapsedTimeMinutes: number;
  decayFraction: number; // (1/2)^(t / t_1/2)
  currentActivityMbq: number; // A(t) = A_0 * decayFraction
  suvMax: number;
  coincidenceEvents: PetCoincidenceEvent[];
  annihilationCount: number;
  trueCoincidenceRateCps: number;
}

export const PET_RADIOCHEMISTRY_CATALOG: PetSpecimenStandard[] = [
  {
    id: 'f18_fdg_oncology_warburg',
    name: '[¹⁸F]FDG (2-Deoxy-2-[¹⁸F]fluoro-D-glucose) Tumor Glycolysis & Warburg Trapping',
    vietnameseName: '[¹⁸F]FDG Đánh Dấu Chuyển Hóa Đường & Bẫy Chuyển Hóa Warburg Ung Thư',
    radionuclide: 'F_18',
    halfLifeMinutes: 109.8,
    positronMaxEnergyKev: 634.0,
    meanPositronRangeMm: 0.6,
    targetOrganOrBiomarker: 'Hexokinase II & GLUT1/3 Transporters (Glycolytic Warburg Phenotype)',
    injectedDoseMbc: 370.0, // 370 MBq (~10 mCi)
    uptakeTimeMinutes: 60.0,
    synthesisPrecursor: 'Mannose Triflate + Kryptofix 2.2.2 / K₂CO₃',
    clinicalApplication: 'Staging and treatment response monitoring in lung cancer, lymphoma, and colorectal carcinoma.',
    compartments: [
      {
        name: 'Malignant Pulmonary Lesion (NSCLC)',
        vietnameseName: 'Khối U Phổi Ác Tính (NSCLC)',
        suvValue: 12.8,
        activityConcentrationKbqPerMl: 85.0,
        metabolicStatus: 'HYPERMETABOLIC_MALIGNANT'
      },
      {
        name: 'Brain Cerebral Cortex',
        vietnameseName: 'Vỏ Não (Tiêu Thụ Glucose Sinh Lý Rất Cao)',
        suvValue: 8.5,
        activityConcentrationKbqPerMl: 55.0,
        metabolicStatus: 'NORMAL_PHYSIOLOGICAL'
      },
      {
        name: 'Myocardium Left Ventricle',
        vietnameseName: 'Cơ Tim Thất Trái',
        suvValue: 6.2,
        activityConcentrationKbqPerMl: 40.0,
        metabolicStatus: 'NORMAL_PHYSIOLOGICAL'
      },
      {
        name: 'Normal Liver Parenchyma',
        vietnameseName: 'Nhu Mô Gan Bình Thường (Chuẩn Đối Chiếu Nền)',
        suvValue: 2.1,
        activityConcentrationKbqPerMl: 14.0,
        metabolicStatus: 'NORMAL_PHYSIOLOGICAL'
      },
      {
        name: 'Urinary Bladder Excretion',
        vietnameseName: 'Bàng Quang (Thải Trừ Qua Đường Tiết Niệu)',
        suvValue: 18.0,
        activityConcentrationKbqPerMl: 120.0,
        metabolicStatus: 'NORMAL_PHYSIOLOGICAL'
      }
    ],
    description: '[¹⁸F]FDG is the gold standard oncology PET tracer. Cancer cells consume glucose at up to 200× normal rates (Warburg effect). Hexokinase phosphorylates [¹⁸F]FDG to [¹⁸F]FDG-6-phosphate, trapping it inside tumor cells due to lack of 2-OH for phosphoglucose isomerase.',
    curriculumNotes: 'GDPT 2018 Vật lý 12: Hiện tượng phân rã β⁺, hạt positron, phản vật chất và sự hủy cặp e⁺-e⁻ sinh ra 2 photon gamma 511 keV đối song song; Sinh học 12: Chuyển hóa carbohydrate và bệnh ung thư.'
  },
  {
    id: 'ga68_dotatate_neuroendocrine',
    name: '[⁶⁸Ga]DOTATATE Somatostatin Receptor 2 (SSTR2) Neuroendocrine Imaging',
    vietnameseName: '[⁶⁸Ga]DOTATATE Gắn Thụ Thể Somatostatin SSTR2 U Nội Tiết Thần Kinh (NET)',
    radionuclide: 'GA_68',
    halfLifeMinutes: 67.7,
    positronMaxEnergyKev: 1899.0,
    meanPositronRangeMm: 2.4,
    targetOrganOrBiomarker: 'Somatostatin Subtype 2 Receptors (SSTR2)',
    injectedDoseMbc: 185.0, // 185 MBq (~5 mCi)
    uptakeTimeMinutes: 50.0,
    synthesisPrecursor: 'DOTA-(Tyr³)-Octreotate (DOTATATE) + ⁶⁸Ge/⁶⁸Ga Generator Eluate',
    clinicalApplication: 'Theranostics imaging and patient selection for ¹⁷⁷Lu-DOTATATE (Lutathera) peptide receptor radionuclide therapy.',
    compartments: [
      {
        name: 'Metastatic Neuroendocrine Tumor (NET)',
        vietnameseName: 'Ổ Di Căn U Nội Tiết Thần Kinh',
        suvValue: 28.5,
        activityConcentrationKbqPerMl: 145.0,
        metabolicStatus: 'HYPERMETABOLIC_MALIGNANT'
      },
      {
        name: 'Spleen (Physiological SSTR2 Reservoir)',
        vietnameseName: 'Lách (Cơ Quan Chứa Thụ Thể Somatostatin Tự Nhiên)',
        suvValue: 18.2,
        activityConcentrationKbqPerMl: 90.0,
        metabolicStatus: 'NORMAL_PHYSIOLOGICAL'
      },
      {
        name: 'Kidneys Renal Cortex',
        vietnameseName: 'Vỏ Thận (Thải Trừ Peptit)',
        suvValue: 14.0,
        activityConcentrationKbqPerMl: 70.0,
        metabolicStatus: 'NORMAL_PHYSIOLOGICAL'
      },
      {
        name: 'Liver Background',
        vietnameseName: 'Nền Nhu Mô Gan',
        suvValue: 4.5,
        activityConcentrationKbqPerMl: 22.0,
        metabolicStatus: 'NORMAL_PHYSIOLOGICAL'
      }
    ],
    description: '[⁶⁸Ga]DOTATATE uses a cyclic octapeptide analog of somatostatin labeled with generator-produced gallium-68. SSTR2 overexpression on neuroendocrine tumors creates extraordinary target-to-background contrast (SUV_max > 25).',
    curriculumNotes: 'GDPT 2018 Hóa học 12: Phức chất phối vị DOTA tạo phức càng cua bền với cation kim loại Ga³⁺; Sinh học 11: Hệ nội tiết và hormone somatostatin.'
  },
  {
    id: 'c11_pib_alzheimer_amyloid',
    name: '[¹¹C]PiB (Pittsburgh Compound B) Cortical β-Amyloid Plaque Quantification',
    vietnameseName: '[¹¹C]PiB (Hợp Chất Pittsburgh B) Định Lượng Mảng Bám Amyloid Não Alzheimer',
    radionuclide: 'C_11',
    halfLifeMinutes: 20.4,
    positronMaxEnergyKev: 960.0,
    meanPositronRangeMm: 1.1,
    targetOrganOrBiomarker: 'Cross-β Fibrillar Amyloid-β (Aβ₄₂ / Aβ₄₀) Aggregates',
    injectedDoseMbc: 555.0,
    uptakeTimeMinutes: 40.0,
    synthesisPrecursor: '6-OH-BTA-0 + [¹¹C]Methyl Triflate',
    clinicalApplication: 'Differential diagnosis of Alzheimer’s disease from frontotemporal lobar degeneration.',
    compartments: [
      {
        name: 'Frontal Cortex Amyloid Plaque Zone',
        vietnameseName: 'Vỏ Não Vùng Trán Đầy Mảng Bám Amyloid-β',
        suvValue: 2.8,
        activityConcentrationKbqPerMl: 24.0,
        metabolicStatus: 'HYPERMETABOLIC_MALIGNANT'
      },
      {
        name: 'Cerebellar Cortex (Reference Region Without Amyloid)',
        vietnameseName: 'Vỏ Tiểu Não (Vùng Chuẩn Đối Chứng Không Có Mảng Bám)',
        suvValue: 1.0,
        activityConcentrationKbqPerMl: 8.5,
        metabolicStatus: 'NORMAL_PHYSIOLOGICAL'
      },
      {
        name: 'Subcortical White Matter',
        vietnameseName: 'Chất Trắng Dưới Vỏ',
        suvValue: 1.9,
        activityConcentrationKbqPerMl: 16.0,
        metabolicStatus: 'NORMAL_PHYSIOLOGICAL'
      }
    ],
    description: '[¹¹C]PiB is a neutral lipophilic thioflavin-T derivative that crosses the blood-brain barrier rapidly and binds with nanomolar affinity to fibrillar β-amyloid sheets, providing in vivo pathology of Alzheimer’s neurodegeneration.',
    curriculumNotes: 'GDPT 2018 Sinh học 10 & 11: Cấu trúc nếp gấp protein β-pleated sheet, sự tích tụ độc tính thần kinh trong sa sút trí tuệ; Hóa học 12: Phản ứng methyl hóa hữu cơ gắn C-11.'
  },
  {
    id: 'n13_ammonia_myocardial_perfusion',
    name: '[¹³N]Ammonia Absolute Myocardial Blood Flow (MBF) & Ischemia Imaging',
    vietnameseName: '[¹³N]Amoniac Định Lượng Tưới Máu Cơ Tim & Thiếu Máu Cục Bộ',
    radionuclide: 'N_13',
    halfLifeMinutes: 9.97,
    positronMaxEnergyKev: 1198.0,
    meanPositronRangeMm: 1.5,
    targetOrganOrBiomarker: 'Glutamine Synthetase Metabolic Trapping in Cardiomyocytes',
    injectedDoseMbc: 740.0,
    uptakeTimeMinutes: 5.0,
    clinicalApplication: 'Quantification of coronary flow reserve (CFR) and detection of multi-vessel coronary artery disease.',
    compartments: [
      {
        name: 'Ischemic Anterior Wall (LAD Stenosis)',
        vietnameseName: 'Vùng Thành Trước Thiếu Máu (Hẹp Động Mạch Vành LAD)',
        suvValue: 1.8,
        activityConcentrationKbqPerMl: 15.0,
        metabolicStatus: 'LOW_UPTAKE'
      },
      {
        name: 'Normal Inferior Wall',
        vietnameseName: 'Thành Dưới Cơ Tim Tưới Máu Bình Thường',
        suvValue: 4.8,
        activityConcentrationKbqPerMl: 42.0,
        metabolicStatus: 'NORMAL_PHYSIOLOGICAL'
      },
      {
        name: 'Blood Pool (Left Ventricular Cavity)',
        vietnameseName: 'Dòng Máu Trong Buồng Thất Trái',
        suvValue: 0.9,
        activityConcentrationKbqPerMl: 7.5,
        metabolicStatus: 'NORMAL_PHYSIOLOGICAL'
      }
    ],
    description: '[¹³N]Ammonia crosses myocardial cell membranes by passive diffusion. Inside myocytes, it is converted to [¹³N]glutamine by glutamine synthetase, achieving near 100% first-pass extraction and enabling absolute myocardial blood flow (mL/min/g) quantification.',
    curriculumNotes: 'GDPT 2018 Sinh học 11: Tuần hoàn máu, sinh lý mạch vành tim và cơ chế thiếu máu cơ tim; Hóa học 11: Hợp chất amoniac và chu trình nitơ.'
  },
  {
    id: 'f18_fallypride_dopamine_d2',
    name: '[¹⁸F]Fallypride High-Affinity Dopamine D₂/D₃ Striatal & Extrastriatal Receptor Mapping',
    vietnameseName: '[¹⁸F]Fallypride Bản Đồ Thụ Thể Dopamine D₂/D₃ Thể Vân & Vỏ Não',
    radionuclide: 'F_18',
    halfLifeMinutes: 109.8,
    positronMaxEnergyKev: 634.0,
    meanPositronRangeMm: 0.6,
    targetOrganOrBiomarker: 'Dopamine D₂ and D₃ G-Protein Coupled Receptors',
    injectedDoseMbc: 185.0,
    uptakeTimeMinutes: 90.0,
    clinicalApplication: 'Schizophrenia dopamine hypothesis research, addiction neurobiology, and antipsychotic receptor occupancy.',
    compartments: [
      {
        name: 'Putamen & Caudate Nucleus (Striatum)',
        vietnameseName: 'Thể Vân (Nhân Bèo & Nhân Đuôi, Nồng Độ D₂ Rất Cao)',
        suvValue: 16.5,
        activityConcentrationKbqPerMl: 72.0,
        metabolicStatus: 'NORMAL_PHYSIOLOGICAL'
      },
      {
        name: 'Thalamus Extrastriatal Nuclei',
        vietnameseName: 'Đồi Thị (Vùng Thụ Thể Ngoài Thể Vân)',
        suvValue: 5.2,
        activityConcentrationKbqPerMl: 22.0,
        metabolicStatus: 'NORMAL_PHYSIOLOGICAL'
      },
      {
        name: 'Cerebellum (Non-Specific Binding Reference)',
        vietnameseName: 'Tiểu Não (Vùng Chuẩn Gắn Không Đặc Hiệu)',
        suvValue: 1.1,
        activityConcentrationKbqPerMl: 4.8,
        metabolicStatus: 'LOW_UPTAKE'
      }
    ],
    description: '[¹⁸F]Fallypride is a substituted benzamide with sub-nanomolar affinity (K_D ≈ 0.03 nM) for dopamine D₂/D₃ receptors, capable of quantifying receptors in both dense striatum and low-density cortical and limbic regions.',
    curriculumNotes: 'GDPT 2018 Sinh học 11: Dẫn truyền xung thần kinh qua synapse, chất dẫn truyền thần kinh dopamine và cơ chế nghiện chất.'
  }
];

/**
 * Calculates Radioactive Decay Fraction A(t) / A_0 = (1/2)^(t / t_1/2)
 */
export function calculateRadioactiveDecayFraction(
  elapsedMinutes: number,
  halfLifeMinutes: number
): number {
  if (halfLifeMinutes <= 0) return 0;
  const fraction = Math.pow(0.5, elapsedMinutes / halfLifeMinutes);
  return Number(fraction.toFixed(4));
}

/**
 * Simulates Positron Annihilation Coincidence Detection & Time-of-Flight Reconstruction
 */
export function simulatePetRadiochemistry(
  specimenId: string,
  elapsedMinutes: number = 60.0
): PetSimulationResult {
  const specimen = PET_RADIOCHEMISTRY_CATALOG.find((s) => s.id === specimenId) || PET_RADIOCHEMISTRY_CATALOG[0];

  const decayFraction = calculateRadioactiveDecayFraction(elapsedMinutes, specimen.halfLifeMinutes);
  const currentActivity = Number((specimen.injectedDoseMbc * decayFraction).toFixed(2));

  // Determine highest SUV in compartments
  const suvMax = Math.max(...specimen.compartments.map((c) => c.suvValue));

  // Generate 80 Simulated 511 keV Coincidence Lines of Response (LORs)
  const coincidenceEvents: PetCoincidenceEvent[] = [];
  const eventCount = 80;

  for (let i = 0; i < eventCount; i++) {
    // Primary detector angle around ring (0 to 360)
    const angle1 = Math.floor(Math.random() * 360);
    // Collinear opposite detector angle with ±3° physical non-collinearity wobble
    const wobble = (Math.random() - 0.5) * 5.0;
    const angle2 = Math.floor((angle1 + 180 + wobble + 360) % 360);

    // Time-of-flight Δt (-400 ps to +400 ps)
    const dt_ps = Number(((Math.random() - 0.5) * 800).toFixed(1));
    // Spatial localization along LOR: Δx = (c * Δt) / 2
    // c = 30 cm/ns = 0.03 cm/ps = 0.3 mm/ps -> (0.3 * dt) / 2 = 0.15 * dt mm
    const offsetMm = Number((dt_ps * 0.15).toFixed(1));

    coincidenceEvents.push({
      detectorIndex1: angle1,
      detectorIndex2: angle2,
      timeOfFlightDeltaPs: dt_ps,
      localizedOffsetMm: offsetMm,
      photonEnergyKev: ELECTRON_REST_MASS_ENERGY_KEV
    });
  }

  // True coincidence counting rate in counts per second (cps)
  const trueRateCps = Math.floor(currentActivity * 420);

  return {
    specimen,
    elapsedTimeMinutes: elapsedMinutes,
    decayFraction,
    currentActivityMbq: currentActivity,
    suvMax,
    coincidenceEvents,
    annihilationCount: eventCount,
    trueCoincidenceRateCps: trueRateCps
  };
}

/**
 * Intelligent Card Matcher for PET Radiochemistry & Radiotracer Systems
 */
export function getMatchingPetCard(card: { id?: string; name?: string; category?: string }): PetSpecimenStandard | null {
  if (!card) return null;
  const target = `${card.id || ''} ${card.name || ''} ${card.category || ''}`.toLowerCase();

  if (target.includes('fdg') || target.includes('warburg') || target.includes('glucose') || target.includes('glycolysis') || target.includes('tumor') || target.includes('f-18') || target.includes('18f')) {
    return PET_RADIOCHEMISTRY_CATALOG.find((s) => s.id === 'f18_fdg_oncology_warburg') || null;
  }
  if (target.includes('dotatate') || target.includes('gallium') || target.includes('ga-68') || target.includes('68ga') || target.includes('somatostatin') || target.includes('neuroendocrine')) {
    return PET_RADIOCHEMISTRY_CATALOG.find((s) => s.id === 'ga68_dotatate_neuroendocrine') || null;
  }
  if (target.includes('pib') || target.includes('alzheimer') || target.includes('amyloid') || target.includes('c-11') || target.includes('11c') || target.includes('plaque')) {
    return PET_RADIOCHEMISTRY_CATALOG.find((s) => s.id === 'c11_pib_alzheimer_amyloid') || null;
  }
  if (target.includes('ammonia') || target.includes('myocardial') || target.includes('perfusion') || target.includes('n-13') || target.includes('13n') || target.includes('heart')) {
    return PET_RADIOCHEMISTRY_CATALOG.find((s) => s.id === 'n13_ammonia_myocardial_perfusion') || null;
  }
  if (target.includes('dopamine') || target.includes('fallypride') || target.includes('striatum') || target.includes('receptor') || target.includes('schizophrenia')) {
    return PET_RADIOCHEMISTRY_CATALOG.find((s) => s.id === 'f18_fallypride_dopamine_d2') || null;
  }

  // Fallback
  if (target.includes('pet') || target.includes('positron') || target.includes('annihilation') || target.includes('511') || target.includes('decay')) {
    return PET_RADIOCHEMISTRY_CATALOG[0];
  }

  return null;
}
