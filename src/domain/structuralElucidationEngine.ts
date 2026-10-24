// src/domain/structuralElucidationEngine.ts
// ============================================================================
// ELEMENTA MULTI-SPECTROSCOPIC STRUCTURAL ELUCIDATION & ISOMER DISCRIMINATION ENGINE
// Standards: IUPAC Gold Book & Vietnam GDPT 2018 Chemistry 11/12
// Covers: Combustion Analysis & Empirical Formula, Degree of Unsaturation / IHD / DBE,
// Four-Pillar Cross-Validation (Elemental Analysis + MS + IR + 1H/13C NMR),
// Step-by-step Analytical Deduction Logic, and Curriculum Constitutional Isomer Challenges.
// ============================================================================

export interface ElementalPercentComposition {
  percentC: number;
  percentH: number;
  percentO?: number;
  percentN?: number;
  percentCl?: number;
  percentBr?: number;
}

export interface EmpiricalFormulaResult {
  empiricalFormula: string;
  ratios: { C: number; H: number; O: number; N: number; Cl: number; Br: number };
  empiricalWeight: number;
}

export interface MultiSpectroCompound {
  id: string;
  name: string;
  vietnameseName: string;
  molecularFormula: string;
  iupacName: string;
  molecularWeight: number;
  ihd: number;
  functionalClassVI: string;
  elementalComposition: ElementalPercentComposition;
  msFingerprint: {
    molecularIonMz: number;
    basePeakMz: number;
    diagnosticFragments: { mz: number; species: string; significanceVI: string }[];
  };
  irFingerprint: {
    keyBandsCm: { waveNumber: number; bond: string; intensity: string; diagnosticVI: string }[];
    hasCarbonyl: boolean;
    hasAlcoholOH: boolean;
    hasAcidOH: boolean;
    hasAmineNH: boolean;
    hasAromaticC_C: boolean;
    hasAlkyne: boolean;
  };
  nmr1HFingerprint: {
    signalCount: number;
    signals: { deltaPpm: number; multiplicity: string; integration: number; assignmentVI: string }[];
  };
  nmr13CFingerprint: {
    signalCount: number;
    signals: { deltaPpm: number; assignmentVI: string }[];
  };
  symmetryExplanationVI: string;
  curriculumGrade: 'Grade 11' | 'Grade 12' | 'Chuyên / Olympic';
}

export interface IsomerChallengeSet {
  setId: string;
  titleVI: string;
  molecularFormula: string;
  molecularWeight: number;
  ihd: number;
  descriptionVI: string;
  isomers: MultiSpectroCompound[];
  discriminationGuideVI: string[];
}

// ----------------------------------------------------------------------------
// ATOMIC MASS CONSTANTS (IUPAC CIAAW)
// ----------------------------------------------------------------------------
export const ATOMIC_MASSES = {
  H: 1.008,
  C: 12.011,
  N: 14.007,
  O: 15.999,
  F: 18.998,
  Cl: 35.453,
  Br: 79.904,
  S: 32.065,
} as const;

// ----------------------------------------------------------------------------
// DOMAIN CALCULATION FUNCTIONS
// ----------------------------------------------------------------------------

/**
 * Calculates Degree of Unsaturation / Index of Hydrogen Deficiency (IHD / DBE):
 * IHD = C - H/2 + N/2 - X/2 + 1
 * where X = F, Cl, Br, I. Oxygen and Sulfur do not affect IHD.
 */
export function calculateIHD(atoms: {
  carbon?: number;
  hydrogen?: number;
  nitrogen?: number;
  halogen?: number;
}): number {
  const C = atoms.carbon || 0;
  const H = atoms.hydrogen || 0;
  const N = atoms.nitrogen || 0;
  const X = atoms.halogen || 0;

  if (C <= 0) return 0;
  const ihd = C - H / 2 + N / 2 - X / 2 + 1;
  return Number(ihd.toFixed(1));
}

/**
 * Parses simple molecular formulas (e.g. 'C3H6O', 'C2H4O2', 'C6H5CH3', 'C8H10', 'C2H4Cl2')
 * into atom counts and calculates IHD.
 */
export function parseFormulaAndCalculateIHD(formula: string): {
  carbon: number;
  hydrogen: number;
  oxygen: number;
  nitrogen: number;
  halogen: number;
  molecularWeight: number;
  ihd: number;
} {
  const clean = formula.replace(/\s+/g, '');
  let carbon = 0;
  let hydrogen = 0;
  let oxygen = 0;
  let nitrogen = 0;
  let halogen = 0;

  // Regex token parser
  const regex = /([A-Z][a-z]*)(\d*)/g;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(clean)) !== null) {
    const element = match[1];
    const count = match[2] ? parseInt(match[2], 10) : 1;

    switch (element) {
      case 'C':
        carbon += count;
        break;
      case 'H':
        hydrogen += count;
        break;
      case 'O':
        oxygen += count;
        break;
      case 'N':
        nitrogen += count;
        break;
      case 'F':
      case 'Cl':
      case 'Br':
      case 'I':
        halogen += count;
        break;
    }
  }

  const mw =
    carbon * ATOMIC_MASSES.C +
    hydrogen * ATOMIC_MASSES.H +
    oxygen * ATOMIC_MASSES.O +
    nitrogen * ATOMIC_MASSES.N +
    halogen * ATOMIC_MASSES.Cl;

  const ihd = calculateIHD({ carbon, hydrogen, nitrogen, halogen });

  return {
    carbon,
    hydrogen,
    oxygen,
    nitrogen,
    halogen,
    molecularWeight: Number(mw.toFixed(2)),
    ihd,
  };
}

/**
 * Calculates theoretical mass percentage composition for a formula
 */
export function calculateElementalPercentComposition(formula: string): ElementalPercentComposition {
  const p = parseFormulaAndCalculateIHD(formula);
  const mw = p.molecularWeight;
  if (mw <= 0) return { percentC: 0, percentH: 0 };

  return {
    percentC: Number(((p.carbon * ATOMIC_MASSES.C) / mw * 100).toFixed(2)),
    percentH: Number(((p.hydrogen * ATOMIC_MASSES.H) / mw * 100).toFixed(2)),
    percentO: p.oxygen > 0 ? Number(((p.oxygen * ATOMIC_MASSES.O) / mw * 100).toFixed(2)) : undefined,
    percentN: p.nitrogen > 0 ? Number(((p.nitrogen * ATOMIC_MASSES.N) / mw * 100).toFixed(2)) : undefined,
    percentCl: p.halogen > 0 ? Number(((p.halogen * ATOMIC_MASSES.Cl) / mw * 100).toFixed(2)) : undefined,
  };
}

/**
 * Derives empirical formula from mass percentage composition:
 * n_C = %C / 12.011, n_H = %H / 1.008, n_O = %O / 15.999
 */
export function calculateEmpiricalFormula(composition: ElementalPercentComposition): EmpiricalFormulaResult {
  const molesC = composition.percentC / ATOMIC_MASSES.C;
  const molesH = composition.percentH / ATOMIC_MASSES.H;
  const molesO = (composition.percentO || 0) / ATOMIC_MASSES.O;
  const molesN = (composition.percentN || 0) / ATOMIC_MASSES.N;
  const molesCl = (composition.percentCl || 0) / ATOMIC_MASSES.Cl;
  const molesBr = (composition.percentBr || 0) / ATOMIC_MASSES.Br;

  const validMoles = [molesC, molesH, molesO, molesN, molesCl, molesBr].filter(m => m > 0);
  const minMoles = validMoles.length > 0 ? Math.min(...validMoles) : 1;

  // Normalize to minimum
  let rC = molesC / minMoles;
  let rH = molesH / minMoles;
  let rO = molesO / minMoles;
  let rN = molesN / minMoles;
  let rCl = molesCl / minMoles;
  let rBr = molesBr / minMoles;

  // Find multiplier to make integer (1, 2, 3, 4, 5, 6)
  let bestMultiplier = 1;
  let minFractionalError = 999;

  for (let m = 1; m <= 6; m++) {
    const error =
      Math.abs(Math.round(rC * m) - rC * m) +
      Math.abs(Math.round(rH * m) - rH * m) +
      Math.abs(Math.round(rO * m) - rO * m) +
      Math.abs(Math.round(rN * m) - rN * m) +
      Math.abs(Math.round(rCl * m) - rCl * m);
    if (error < minFractionalError) {
      minFractionalError = error;
      bestMultiplier = m;
    }
  }

  const intC = Math.round(rC * bestMultiplier);
  const intH = Math.round(rH * bestMultiplier);
  const intO = Math.round(rO * bestMultiplier);
  const intN = Math.round(rN * bestMultiplier);
  const intCl = Math.round(rCl * bestMultiplier);
  const intBr = Math.round(rBr * bestMultiplier);

  let formulaStr = `C${intC > 1 ? intC : ''}H${intH > 1 ? intH : ''}`;
  if (intO > 0) formulaStr += `O${intO > 1 ? intO : ''}`;
  if (intN > 0) formulaStr += `N${intN > 1 ? intN : ''}`;
  if (intCl > 0) formulaStr += `Cl${intCl > 1 ? intCl : ''}`;
  if (intBr > 0) formulaStr += `Br${intBr > 1 ? intBr : ''}`;

  const empiricalWeight =
    intC * ATOMIC_MASSES.C +
    intH * ATOMIC_MASSES.H +
    intO * ATOMIC_MASSES.O +
    intN * ATOMIC_MASSES.N +
    intCl * ATOMIC_MASSES.Cl +
    intBr * ATOMIC_MASSES.Br;

  return {
    empiricalFormula: formulaStr,
    ratios: { C: intC, H: intH, O: intO, N: intN, Cl: intCl, Br: intBr },
    empiricalWeight: Number(empiricalWeight.toFixed(2)),
  };
}

/**
 * Step-by-Step Analytical Elucidation Chain:
 * Takes multi-spectroscopic analytical findings and yields a structured deductive proof.
 */
export function executeStepwiseElucidation(params: {
  composition: ElementalPercentComposition;
  molecularIonMz: number;
  irKeyWaveNumbers: number[];
  nmr1HSignalsCount: number;
  hasAldehydePeak1H?: boolean;
  hasCarboxylicAcidPeak1H?: boolean;
  hasAromaticMultiplet1H?: boolean;
}): {
  step1Empirical: string;
  step2MolecularFormula: string;
  step3IHD: number;
  step3IHDInterpretationVI: string;
  step4IRFunctionalGroupsVI: string[];
  step5NMRSymmetryInterpretationVI: string;
  step6IdentifiedCompoundVI: string;
} {
  // Step 1: Empirical Formula
  const empiricalRes = calculateEmpiricalFormula(params.composition);
  const step1Empirical = `Công thức đơn giản nhất: ${empiricalRes.empiricalFormula} (M_đgn = ${empiricalRes.empiricalWeight})`;

  // Step 2: Molecular Formula from Mass Spec [M]+.
  const multiplier = Math.max(1, Math.round(params.molecularIonMz / empiricalRes.empiricalWeight));
  const c = empiricalRes.ratios.C * multiplier;
  const h = empiricalRes.ratios.H * multiplier;
  const o = empiricalRes.ratios.O * multiplier;
  const n = empiricalRes.ratios.N * multiplier;
  const cl = empiricalRes.ratios.Cl * multiplier;

  let molFormula = `C${c > 1 ? c : ''}H${h > 1 ? h : ''}`;
  if (o > 0) molFormula += `O${o > 1 ? o : ''}`;
  if (n > 0) molFormula += `N${n > 1 ? n : ''}`;
  if (cl > 0) molFormula += `Cl${cl > 1 ? cl : ''}`;

  const step2MolecularFormula = `Từ pic ion phân tử [M]⁺• (m/z = ${params.molecularIonMz}) ⟹ Phân tử khối M = ${params.molecularIonMz} ⟹ CTPT: ${molFormula}`;

  // Step 3: Degree of Unsaturation / IHD
  const ihd = calculateIHD({ carbon: c, hydrogen: h, nitrogen: n, halogen: cl });
  let ihdInterp = '';
  if (ihd === 0) ihdInterp = 'IHD = 0: Hợp chất no, mạch hở (chỉ chứa liên kết đơn C-C, C-H, C-O, không có vòng hay liên kết π).';
  else if (ihd === 1) ihdInterp = 'IHD = 1: Phân tử chứa 1 liên kết đôi (C=C hoặc C=O) HOẶC 1 vòng no monocyclic.';
  else if (ihd === 2) ihdInterp = 'IHD = 2: Chứa 1 liên kết ba (C≡C, C≡N) hoặc 2 liên kết đôi, hoặc 1 vòng + 1 liên kết đôi.';
  else if (ihd >= 4) ihdInterp = `IHD = ${ihd} (≥ 4): Chứa hệ liên hợp thơm vòng benzen (1 vòng + 3 liên kết π = 4 IHD).`;
  else ihdInterp = `IHD = ${ihd}: Chứa ${ihd} liên kết π hoặc vòng.`;

  // Step 4: IR functional groups
  const irGroups: string[] = [];
  if (params.irKeyWaveNumbers.some(w => w >= 1680 && w <= 1750)) {
    irGroups.push('Pic sắc nhọn mạnh ở 1680 - 1750 cm⁻¹ ⟹ Chứa nhóm Cacbonyl C=O');
  }
  if (params.irKeyWaveNumbers.some(w => w >= 3200 && w <= 3650)) {
    irGroups.push('Dải hấp thụ tù rộng ở 3200 - 3650 cm⁻¹ ⟹ Chứa nhóm Hiđroxyl Ancol O-H');
  }
  if (params.irKeyWaveNumbers.some(w => w >= 2500 && w <= 3300) && params.irKeyWaveNumbers.some(w => w >= 1680 && w <= 1730)) {
    irGroups.push('Dải rộng khổng lồ 2500 - 3300 cm⁻¹ kết hợp đỉnh 1710 cm⁻¹ ⟹ Nhóm Axit Cacboxylic -COOH');
  }
  if (params.irKeyWaveNumbers.some(w => w >= 2700 && w <= 2850)) {
    irGroups.push('Cặp pic Fermi đôi ở 2720 và 2820 cm⁻¹ ⟹ Nhóm Anđehit -CHO');
  }

  // Step 5: NMR symmetry interpretation
  let nmrInterp = '';
  if (params.nmr1HSignalsCount === 1) {
    nmrInterp = 'Phổ ¹H NMR chỉ có 1 tín hiệu duy nhất ⟹ Phân tử có tính đối xứng cao, tất cả các nguyên tử hydro đều tương đương hóa học!';
  } else {
    nmrInterp = `Phổ ¹H NMR xuất hiện ${params.nmr1HSignalsCount} tín hiệu ⟹ Phân tử có ${params.nmr1HSignalsCount} môi trường proton khác nhau.`;
  }

  // Step 6: Identified compound deduction
  let identified = '';
  if (molFormula === 'C3H6O') {
    if (params.hasAldehydePeak1H || params.irKeyWaveNumbers.some(w => w >= 2700 && w <= 2850)) {
      identified = 'Propanal (CH3CH2CHO) - Anđehit 3 carbon';
    } else if (params.nmr1HSignalsCount === 1) {
      identified = 'Axeton ((CH3)2CO) - Xeton đối xứng cao 6H singlet';
    } else {
      identified = 'Ancol anlylic (CH2=CH-CH2OH) - Ancol chưa no';
    }
  } else if (molFormula === 'C2H4O2') {
    if (params.hasCarboxylicAcidPeak1H || params.irKeyWaveNumbers.some(w => w >= 2500 && w <= 3300)) {
      identified = 'Axit axetic (CH3COOH) - Axit etanoic';
    } else {
      identified = 'Metyl fomat (HCOOCH3) - Este metyl metanoat';
    }
  } else if (molFormula === 'C2H6O') {
    if (params.nmr1HSignalsCount === 1) {
      identified = 'Đimetyl ete (CH3-O-CH3) - Ete đối xứng';
    } else {
      identified = 'Ethanol (CH3CH2OH) - Ancol etylic';
    }
  } else if (molFormula === 'C8H10') {
    if (params.nmr1HSignalsCount === 2) {
      identified = 'p-Xilen (1,4-đimetylbenzen) - Đồng phân thơm đối xứng tâm';
    } else {
      identified = 'Etylbenzen (C6H5-CH2CH3) hoặc o/m-xilen';
    }
  } else {
    identified = `Cấu trúc tương ứng với CTPT ${molFormula}`;
  }

  return {
    step1Empirical,
    step2MolecularFormula,
    step3IHD: ihd,
    step3IHDInterpretationVI: ihdInterp,
    step4IRFunctionalGroupsVI: irGroups,
    step5NMRSymmetryInterpretationVI: nmrInterp,
    step6IdentifiedCompoundVI: identified,
  };
}

// ----------------------------------------------------------------------------
// BENCHMARK CURRICULUM CONSTITUTIONAL ISOMER CHALLENGE SETS
// ----------------------------------------------------------------------------
export const ISOMER_CHALLENGE_SETS: Record<string, IsomerChallengeSet> = {
  set_C3H6O: {
    setId: 'set_C3H6O',
    titleVI: 'Bộ Đồng Phân C3H6O: Anđehit vs Xeton vs Ancol Không No',
    molecularFormula: 'C3H6O',
    molecularWeight: 58.08,
    ihd: 1,
    descriptionVI: 'Thử thách kinh điển trong SGK Hóa 11. Ba hợp chất có cùng công thức phân tử C3H6O (M = 58, IHD = 1) nhưng thuộc 3 nhóm chức hữu cơ hoàn toàn khác nhau: Propanal, Axeton và Ancol Anlylic.',
    discriminationGuideVI: [
      'Hồng ngoại IR: Axeton và Propanal có pic C=O sắc nhọn ở ~1715-1730 cm⁻¹, còn Ancol anlylic không có C=O mà có O-H tù ở 3350 cm⁻¹ và C=C ở 1645 cm⁻¹.',
      'Phổ ¹H NMR: Axeton chỉ cho đúng 1 mũi đơn (6H singlet tại δ 2.17 ppm) do đối xứng C2v; Propanal cho 3 mũi (triplet + multiplet + triplet fomyl tại δ 9.8 ppm); Ancol anlylic có proton vinylic tại δ 5.0 - 6.0 ppm.',
      'Phổ khối lượng MS: Pic cơ bản của Axeton là m/z = 43 (mất •CH3); của Propanal là m/z = 29 (mất •CHO hoặc •C2H5).',
    ],
    isomers: [
      {
        id: 'acetone',
        name: 'Acetone',
        vietnameseName: 'Axeton (Propan-2-on)',
        molecularFormula: 'C3H6O',
        iupacName: 'Propan-2-one',
        molecularWeight: 58.08,
        ihd: 1,
        functionalClassVI: 'Xeton (Ketone)',
        curriculumGrade: 'Grade 11',
        elementalComposition: { percentC: 62.04, percentH: 10.41, percentO: 27.55 },
        msFingerprint: {
          molecularIonMz: 58,
          basePeakMz: 43,
          diagnosticFragments: [
            { mz: 58, species: '[M]+•', significanceVI: 'Ion phân tử' },
            { mz: 43, species: '[CH3CO]+ (Acylium)', significanceVI: 'Pic cơ sở 100% cắt đứt liên kết C-C' },
            { mz: 15, species: '[CH3]+', significanceVI: 'Gốc metyl' },
          ],
        },
        irFingerprint: {
          keyBandsCm: [{ waveNumber: 1715, bond: 'C=O', intensity: 'VERY_STRONG', diagnosticVI: 'Kéo dãn C=O xeton mạch hở' }],
          hasCarbonyl: true,
          hasAlcoholOH: false,
          hasAcidOH: false,
          hasAmineNH: false,
          hasAromaticC_C: false,
          hasAlkyne: false,
        },
        nmr1HFingerprint: {
          signalCount: 1,
          signals: [{ deltaPpm: 2.17, multiplicity: 's', integration: 6, assignmentVI: '2 × -CH3 tương đương hóa học (singlet 6H)' }],
        },
        nmr13CFingerprint: {
          signalCount: 2,
          signals: [
            { deltaPpm: 30.7, assignmentVI: '2 × -CH3 cacbon tương đương' },
            { deltaPpm: 206.3, assignmentVI: '>C=O cacbonyl xeton giải chắn cực mạnh' },
          ],
        },
        symmetryExplanationVI: 'Phân tử có đối xứng gương phẳng C2v: 2 nhóm metyl hoàn toàn tương đương, triệt tiêu phân tách spin.',
      },
      {
        id: 'propanal',
        name: 'Propanal',
        vietnameseName: 'Propanal (Anđehit propionic)',
        molecularFormula: 'C3H6O',
        iupacName: 'Propanal',
        molecularWeight: 58.08,
        ihd: 1,
        functionalClassVI: 'Anđehit (Aldehyde)',
        curriculumGrade: 'Grade 11',
        elementalComposition: { percentC: 62.04, percentH: 10.41, percentO: 27.55 },
        msFingerprint: {
          molecularIonMz: 58,
          basePeakMz: 29,
          diagnosticFragments: [
            { mz: 58, species: '[M]+•', significanceVI: 'Ion phân tử' },
            { mz: 29, species: '[CHO]+ / [C2H5]+', significanceVI: 'Pic cơ sở 100% của anđehit hoặc gốc etyl' },
            { mz: 57, species: '[M - H]+', significanceVI: 'Mất proton fomyl' },
          ],
        },
        irFingerprint: {
          keyBandsCm: [
            { waveNumber: 1730, bond: 'C=O', intensity: 'VERY_STRONG', diagnosticVI: 'Kéo dãn C=O anđehit' },
            { waveNumber: 2720, bond: 'C-H (fomyl)', intensity: 'MEDIUM', diagnosticVI: 'Vạch Fermi 1 của anđehit' },
            { waveNumber: 2820, bond: 'C-H (fomyl)', intensity: 'MEDIUM', diagnosticVI: 'Vạch Fermi 2 của anđehit' },
          ],
          hasCarbonyl: true,
          hasAlcoholOH: false,
          hasAcidOH: false,
          hasAmineNH: false,
          hasAromaticC_C: false,
          hasAlkyne: false,
        },
        nmr1HFingerprint: {
          signalCount: 3,
          signals: [
            { deltaPpm: 1.05, multiplicity: 't', integration: 3, assignmentVI: '-CH3 (triplet ghép với CH2)' },
            { deltaPpm: 2.45, multiplicity: 'm', integration: 2, assignmentVI: '-CH2- (multiplet ghép với CH3 và CHO)' },
            { deltaPpm: 9.80, multiplicity: 't', integration: 1, assignmentVI: '-CHO (triplet trường cực yếu fomyl)' },
          ],
        },
        nmr13CFingerprint: {
          signalCount: 3,
          signals: [
            { deltaPpm: 6.8, assignmentVI: '-CH3 cacbon' },
            { deltaPpm: 36.7, assignmentVI: '-CH2- cacbon' },
            { deltaPpm: 202.8, assignmentVI: '-CHO anđehit cacbon' },
          ],
        },
        symmetryExplanationVI: 'Bất đối xứng: toàn bộ 3 nguyên tử cacbon đều nằm ở môi trường hóa học khác nhau.',
      },
      {
        id: 'allyl_alcohol',
        name: 'Allyl Alcohol',
        vietnameseName: 'Ancol Anlylic (Prop-2-en-1-ol)',
        molecularFormula: 'C3H6O',
        iupacName: 'Prop-2-en-1-ol',
        molecularWeight: 58.08,
        ihd: 1,
        functionalClassVI: 'Ancol chưa no (Unsaturated Alcohol)',
        curriculumGrade: 'Grade 11',
        elementalComposition: { percentC: 62.04, percentH: 10.41, percentO: 27.55 },
        msFingerprint: {
          molecularIonMz: 58,
          basePeakMz: 31,
          diagnosticFragments: [
            { mz: 58, species: '[M]+•', significanceVI: 'Ion phân tử' },
            { mz: 57, species: '[M - H]+', significanceVI: 'Mất H gốc anlyl bền' },
            { mz: 31, species: '[H2C=OH]+', significanceVI: 'Mảnh oxonium đặc trưng của ancol bậc 1' },
          ],
        },
        irFingerprint: {
          keyBandsCm: [
            { waveNumber: 3350, bond: 'O-H', intensity: 'BROAD_STRONG', diagnosticVI: 'Kéo dãn O-H ancol liên kết hydro' },
            { waveNumber: 1645, bond: 'C=C', intensity: 'MEDIUM', diagnosticVI: 'Kéo dãn liên kết đôi C=C anken' },
          ],
          hasCarbonyl: false,
          hasAlcoholOH: true,
          hasAcidOH: false,
          hasAmineNH: false,
          hasAromaticC_C: false,
          hasAlkyne: false,
        },
        nmr1HFingerprint: {
          signalCount: 4,
          signals: [
            { deltaPpm: 4.15, multiplicity: 'd', integration: 2, assignmentVI: '-CH2-O- proton giải chắn' },
            { deltaPpm: 5.15, multiplicity: 'm', integration: 2, assignmentVI: '=CH2 vinylic proton ngoài' },
            { deltaPpm: 5.90, multiplicity: 'm', integration: 1, assignmentVI: '-CH= vinylic proton giữa' },
            { deltaPpm: 2.20, multiplicity: 's', integration: 1, assignmentVI: '-OH proton ancol' },
          ],
        },
        nmr13CFingerprint: {
          signalCount: 3,
          signals: [
            { deltaPpm: 63.5, assignmentVI: '-CH2-OH cacbon no đính Oxi' },
            { deltaPpm: 115.0, assignmentVI: '=CH2 cacbon anken đầu mạch' },
            { deltaPpm: 137.2, assignmentVI: '-CH= cacbon anken thân mạch' },
          ],
        },
        symmetryExplanationVI: 'Không đối xứng: chứa liên kết đôi vinylic và nhóm ancol bậc 1.',
      },
    ],
  },

  set_C2H4O2: {
    setId: 'set_C2H4O2',
    titleVI: 'Bộ Đồng Phân C2H4O2: Axit Axetic vs Metyl Fomat',
    molecularFormula: 'C2H4O2',
    molecularWeight: 60.05,
    ihd: 1,
    descriptionVI: 'Cặp đồng phân nhóm chức tiêu biểu trong chương este - axit cacboxylic Hóa 12: Axit axetic (CH3COOH) và Metyl fomat (HCOOCH3).',
    discriminationGuideVI: [
      'Hồng ngoại IR: Axit axetic có dải O-H liên hợp dime cực rộng (2500 - 3300 cm⁻¹) đè lên chùm C-H; Metyl fomat hoàn toàn không có O-H mà có vạch este C-O-C ở 1200 cm⁻¹.',
      'Phổ ¹H NMR: Axit axetic có proton axit ở trường cực yếu (δ 11.85 ppm) và singlet 3H ở δ 2.10 ppm; Metyl fomat có proton formyl ở δ 8.05 ppm và singlet metoxy 3H ở δ 3.75 ppm.',
      'Phổ khối lượng MS: Axit axetic có pic m/z = 43 ([CH3CO]+) và 45 ([COOH]+); Metyl fomat có pic cơ bản m/z = 31 ([CH3O]+).',
    ],
    isomers: [
      {
        id: 'acetic_acid',
        name: 'Acetic Acid',
        vietnameseName: 'Axit Axetic (Axit Etanoic)',
        molecularFormula: 'C2H4O2',
        iupacName: 'Ethanoic acid',
        molecularWeight: 60.05,
        ihd: 1,
        functionalClassVI: 'Axit Cacboxylic (Carboxylic Acid)',
        curriculumGrade: 'Grade 11',
        elementalComposition: { percentC: 40.00, percentH: 6.71, percentO: 53.29 },
        msFingerprint: {
          molecularIonMz: 60,
          basePeakMz: 43,
          diagnosticFragments: [
            { mz: 60, species: '[M]+•', significanceVI: 'Ion phân tử axit' },
            { mz: 45, species: '[COOH]+', significanceVI: 'Gốc axit cacboxyl' },
            { mz: 43, species: '[CH3CO]+', significanceVI: 'Pic cơ sở ion axylium' },
          ],
        },
        irFingerprint: {
          keyBandsCm: [
            { waveNumber: 3000, bond: 'O-H (Acid)', intensity: 'BROAD_STRONG', diagnosticVI: 'Dải khổng lồ O-H axit dime 2500 - 3300 cm⁻¹' },
            { waveNumber: 1710, bond: 'C=O', intensity: 'VERY_STRONG', diagnosticVI: 'Kéo dãn C=O axit' },
          ],
          hasCarbonyl: true,
          hasAlcoholOH: true,
          hasAcidOH: true,
          hasAmineNH: false,
          hasAromaticC_C: false,
          hasAlkyne: false,
        },
        nmr1HFingerprint: {
          signalCount: 2,
          signals: [
            { deltaPpm: 2.10, multiplicity: 's', integration: 3, assignmentVI: '-CH3 (singlet 3H kề cacboxyl)' },
            { deltaPpm: 11.85, multiplicity: 's', integration: 1, assignmentVI: '-COOH (singlet 1H trường cực yếu)' },
          ],
        },
        nmr13CFingerprint: {
          signalCount: 2,
          signals: [
            { deltaPpm: 20.8, assignmentVI: '-CH3 cacbon' },
            { deltaPpm: 178.1, assignmentVI: '-COOH cacbon axit' },
          ],
        },
        symmetryExplanationVI: 'Bất đối xứng: 1 nhóm metyl và 1 nhóm cacboxyl.',
      },
      {
        id: 'methyl_formate',
        name: 'Methyl Formate',
        vietnameseName: 'Metyl Fomat (Metyl Metanoat)',
        molecularFormula: 'C2H4O2',
        iupacName: 'Methyl methanoate',
        molecularWeight: 60.05,
        ihd: 1,
        functionalClassVI: 'Este (Ester)',
        curriculumGrade: 'Grade 12',
        elementalComposition: { percentC: 40.00, percentH: 6.71, percentO: 53.29 },
        msFingerprint: {
          molecularIonMz: 60,
          basePeakMz: 31,
          diagnosticFragments: [
            { mz: 60, species: '[M]+•', significanceVI: 'Ion phân tử este' },
            { mz: 31, species: '[OCH3]+', significanceVI: 'Pic cơ sở mảnh metoxi' },
            { mz: 29, species: '[HCO]+', significanceVI: 'Gốc fomat' },
          ],
        },
        irFingerprint: {
          keyBandsCm: [
            { waveNumber: 1740, bond: 'C=O', intensity: 'VERY_STRONG', diagnosticVI: 'Kéo dãn C=O este fomat' },
            { waveNumber: 1200, bond: 'C-O-C', intensity: 'STRONG', diagnosticVI: 'Kéo dãn este C-O' },
          ],
          hasCarbonyl: true,
          hasAlcoholOH: false,
          hasAcidOH: false,
          hasAmineNH: false,
          hasAromaticC_C: false,
          hasAlkyne: false,
        },
        nmr1HFingerprint: {
          signalCount: 2,
          signals: [
            { deltaPpm: 3.75, multiplicity: 's', integration: 3, assignmentVI: '-OCH3 (singlet 3H metoxi bị O giải chắn)' },
            { deltaPpm: 8.05, multiplicity: 's', integration: 1, assignmentVI: 'H-COO- (singlet 1H fomyl)' },
          ],
        },
        nmr13CFingerprint: {
          signalCount: 2,
          signals: [
            { deltaPpm: 51.2, assignmentVI: '-OCH3 cacbon metoxi' },
            { deltaPpm: 161.4, assignmentVI: 'H-C(=O)O- cacbon este' },
          ],
        },
        symmetryExplanationVI: 'Bất đối xứng: chứa 1 proton fomyl và 1 nhóm metoxi.',
      },
    ],
  },

  set_C8H10: {
    setId: 'set_C8H10',
    titleVI: 'Bộ Đồng Phân C8H10: Etylbenzen vs Các Đồng Phân Xilen',
    molecularFormula: 'C8H10',
    molecularWeight: 106.17,
    ihd: 4,
    descriptionVI: 'Hydrocacbon thơm đồng phân có cùng CTPT C8H10 (IHD = 4). Thể hiện vai trò quyết định của phổ ¹³C NMR và tính đối xứng phân tử.',
    discriminationGuideVI: [
      'Phổ ¹³C NMR phân định tuyệt đối: p-Xilen có đối xứng tâm cực cao chỉ cho đúng 2 tín hiệu; o-Xilen cho 4 tín hiệu; m-Xilen cho 5 tín hiệu; Etylbenzen cho 6 tín hiệu.',
      'Phổ ¹H NMR: Etylbenzen có cặp triplet (3H) + quartet (2H) của nhóm etyl; các xilen chỉ có mũi đơn metyl (6H singlet).',
    ],
    isomers: [
      {
        id: 'para_xylene',
        name: 'p-Xylene',
        vietnameseName: 'p-Xilen (1,4-Đimetylbenzen)',
        molecularFormula: 'C8H10',
        iupacName: '1,4-Dimethylbenzene',
        molecularWeight: 106.17,
        ihd: 4,
        functionalClassVI: 'Aren thơm đối xứng cao (Aromatic Hydrocarbon)',
        curriculumGrade: 'Grade 11',
        elementalComposition: { percentC: 90.51, percentH: 9.49 },
        msFingerprint: {
          molecularIonMz: 106,
          basePeakMz: 91,
          diagnosticFragments: [
            { mz: 106, species: '[M]+•', significanceVI: 'Ion phân tử bền thơm' },
            { mz: 91, species: '[C7H7]+ (Tropylium)', significanceVI: 'Pic cơ sở cation tropylium 7 cạnh thơm' },
          ],
        },
        irFingerprint: {
          keyBandsCm: [
            { waveNumber: 1515, bond: 'C=C (Thơm)', intensity: 'STRONG', diagnosticVI: 'Vòng thơm benzen thế 1,4-para' },
            { waveNumber: 810, bond: 'C-H (uốn thơm para)', intensity: 'STRONG', diagnosticVI: 'Đặc trưng thế vị trí para 2 proton kề' },
          ],
          hasCarbonyl: false,
          hasAlcoholOH: false,
          hasAcidOH: false,
          hasAmineNH: false,
          hasAromaticC_C: true,
          hasAlkyne: false,
        },
        nmr1HFingerprint: {
          signalCount: 2,
          signals: [
            { deltaPpm: 2.30, multiplicity: 's', integration: 6, assignmentVI: '2 × -CH3 tương đương đối xứng (singlet 6H)' },
            { deltaPpm: 7.05, multiplicity: 's', integration: 4, assignmentVI: '4 × Ar-H thơm hoàn toàn tương đương (singlet 4H)' },
          ],
        },
        nmr13CFingerprint: {
          signalCount: 2,
          signals: [
            { deltaPpm: 20.9, assignmentVI: '2 × -CH3 cacbon' },
            { deltaPpm: 129.1, assignmentVI: '4 × CH thơm tương đương' },
          ],
        },
        symmetryExplanationVI: 'Đối xứng tâm D2h: phân tử có 2 trục đối xứng vuông góc và tâm đảo, giảm số tín hiệu 13C xuống chỉ còn 2 vạch!',
      },
      {
        id: 'ethylbenzene',
        name: 'Ethylbenzene',
        vietnameseName: 'Etylbenzen',
        molecularFormula: 'C8H10',
        iupacName: 'Ethylbenzene',
        molecularWeight: 106.17,
        ihd: 4,
        functionalClassVI: 'Aren thơm nhánh etyl (Aromatic Hydrocarbon)',
        curriculumGrade: 'Grade 11',
        elementalComposition: { percentC: 90.51, percentH: 9.49 },
        msFingerprint: {
          molecularIonMz: 106,
          basePeakMz: 91,
          diagnosticFragments: [
            { mz: 106, species: '[M]+•', significanceVI: 'Ion phân tử' },
            { mz: 91, species: '[C7H7]+ (Tropylium)', significanceVI: 'Pic cơ sở ion tropylium do cắt đứt liên kết β-benzylic' },
          ],
        },
        irFingerprint: {
          keyBandsCm: [
            { waveNumber: 1600, bond: 'C=C (Thơm)', intensity: 'STRONG', diagnosticVI: 'Bộ xương nhân benzen' },
            { waveNumber: 745, bond: 'C-H (uốn mono)', intensity: 'STRONG', diagnosticVI: 'Benzen đơn thế' },
            { waveNumber: 695, bond: 'C-H (uốn mono)', intensity: 'STRONG', diagnosticVI: 'Đặc trưng nhân thơm đơn thế monosubstituted' },
          ],
          hasCarbonyl: false,
          hasAlcoholOH: false,
          hasAcidOH: false,
          hasAmineNH: false,
          hasAromaticC_C: true,
          hasAlkyne: false,
        },
        nmr1HFingerprint: {
          signalCount: 3,
          signals: [
            { deltaPpm: 1.22, multiplicity: 't', integration: 3, assignmentVI: '-CH3 (triplet 3H của nhóm etyl)' },
            { deltaPpm: 2.65, multiplicity: 'q', integration: 2, assignmentVI: '-CH2- (quartet 2H benzylic)' },
            { deltaPpm: 7.20, multiplicity: 'm', integration: 5, assignmentVI: '5 × Ar-H (multiplet chùm thơm 5H)' },
          ],
        },
        nmr13CFingerprint: {
          signalCount: 6,
          signals: [
            { deltaPpm: 15.6, assignmentVI: '-CH3 cacbon' },
            { deltaPpm: 28.9, assignmentVI: '-CH2- cacbon benzylic' },
            { deltaPpm: 125.6, assignmentVI: 'C-para thơm' },
            { deltaPpm: 127.8, assignmentVI: '2 × C-ortho thơm' },
            { deltaPpm: 128.3, assignmentVI: '2 × C-meta thơm' },
            { deltaPpm: 144.2, assignmentVI: 'C-ipso bậc 4 đính etyl' },
          ],
        },
        symmetryExplanationVI: 'Có mặt phẳng đối xứng: cho 6 tín hiệu 13C và cụm triplet/quartet etyl không thể nhầm lẫn.',
      },
    ],
  },
};
