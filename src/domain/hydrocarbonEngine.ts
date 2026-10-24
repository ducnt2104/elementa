// src/domain/hydrocarbonEngine.ts
/**
 * ELEMENTA — Hydrocarbons (Alkanes, Alkenes, Alkynes, Arenes) Domain Engine
 * Conforms strictly to GDPT 2018 Chemistry Grade 11 (Chủ đề 4: Hydrocarbon) & IUPAC Gold Book.
 * 
 * Subsystems:
 * 1. Hydrocarbon Catalog: Alkanes, Alkenes, Alkynes, Arenes with hybridizations, geometries, and physical properties.
 * 2. Alkane Free-Radical Halogenation & Cracking: Selectivity ratios (3° > 2° > 1°) and thermal cracking equations.
 * 3. Alkene Electrophilic Addition: Markovnikov's rule vs Anti-Markovnikov (Kharasch peroxide effect) and Bayer KMnO4 oxidation.
 * 4. Terminal Alkyne Tollens Silver Test: Identification of R-C≡C-H with ammoniacal AgNO3 yellow precipitate, Kucherov hydration, and polymerization.
 * 5. Aromatic Substitution & Side-chain Oxidation: Benzene inertia vs Toluene ortho/para activating directing effect, TNT synthesis, and benzoic acid oxidation.
 */

export type HydrocarbonClass = 'ALKANE' | 'ALKENE' | 'ALKYNE' | 'ARENE';

export interface HydrocarbonCompound {
  id: string;
  nameVi: string;
  nameIupac: string;
  formula: string;
  condensedFormula: string;
  class: HydrocarbonClass;
  carbonHybridization: 'sp3' | 'sp2' | 'sp' | 'sp2_aromatic';
  molecularGeometry: string;
  boilingPointC: number;
  molarMassGmol: number;
  isTerminal?: boolean; // For alkynes (R-C≡C-H)
  descriptionVi: string;
  gdptStandardRef: string;
}

export const HYDROCARBON_CATALOG: HydrocarbonCompound[] = [
  // Alkanes (CnH2n+2)
  {
    id: 'methane',
    nameVi: 'Metan',
    nameIupac: 'Methane',
    formula: 'CH4',
    condensedFormula: 'CH4',
    class: 'ALKANE',
    carbonHybridization: 'sp3',
    molecularGeometry: 'Tứ diện đều (109.5°)',
    boilingPointC: -161.5,
    molarMassGmol: 16.04,
    descriptionVi: 'Thành phần chính của khí thiên nhiên và khí bùn ao (biogas). Tham gia phản ứng thế halogen dưới ánh sáng tử ngoại.',
    gdptStandardRef: 'GDPT 2018 Hóa học 11 - Bài 12: Alkane'
  },
  {
    id: 'propane',
    nameVi: 'Propan',
    nameIupac: 'Propane',
    formula: 'C3H8',
    condensedFormula: 'CH3-CH2-CH3',
    class: 'ALKANE',
    carbonHybridization: 'sp3',
    molecularGeometry: 'Gấp khúc (chuỗi tetrahedral 109.5°)',
    boilingPointC: -42.1,
    molarMassGmol: 44.1,
    descriptionVi: 'Chứa carbon bậc 1 và bậc 2. Khi clo hóa tạo hỗn hợp 1-clopropan và 2-clopropan (sản phẩm chính ưu tiên bậc 2).',
    gdptStandardRef: 'GDPT 2018 Hóa học 11 - Bài 12: Alkane'
  },
  {
    id: 'butane',
    nameVi: 'Butan',
    nameIupac: 'Butane',
    formula: 'C4H10',
    condensedFormula: 'CH3-CH2-CH2-CH3',
    class: 'ALKANE',
    carbonHybridization: 'sp3',
    molecularGeometry: 'Chuỗi zigzag tứ diện (109.5°)',
    boilingPointC: -0.5,
    molarMassGmol: 58.12,
    descriptionVi: 'Thành phần gas hóa lỏng (LPG). Ở nhiệt độ cao và xúc tác cracking phân cắt mạch C tạo ankan và anken nhỏ hơn.',
    gdptStandardRef: 'GDPT 2018 Hóa học 11 - Bài 12: Alkane'
  },
  {
    id: 'isobutane',
    nameVi: 'Isobutan (2-Metylpropan)',
    nameIupac: '2-Methylpropane',
    formula: 'C4H10',
    condensedFormula: 'CH3-CH(CH3)-CH3',
    class: 'ALKANE',
    carbonHybridization: 'sp3',
    molecularGeometry: 'Nhánh tứ diện trung tâm',
    boilingPointC: -11.7,
    molarMassGmol: 58.12,
    descriptionVi: 'Chứa 1 carbon bậc 3 (3°). Gốc tự do bậc 3 bền nhất nên khi clo/brom hóa, thế vào C bậc 3 chiếm tỷ lệ vượt trội.',
    gdptStandardRef: 'GDPT 2018 Hóa học 11 - Bài 12: Alkane'
  },

  // Alkenes (CnH2n)
  {
    id: 'ethene',
    nameVi: 'Etilen (Eten)',
    nameIupac: 'Ethene',
    formula: 'C2H4',
    condensedFormula: 'CH2=CH2',
    class: 'ALKENE',
    carbonHybridization: 'sp2',
    molecularGeometry: 'Phẳng (tam giác phẳng 120°)',
    boilingPointC: -103.7,
    molarMassGmol: 28.05,
    descriptionVi: 'Khí làm chín trái cây (phytocid). Làm mất màu nhanh nước brom và dung dịch thuốc tím KMnO4 (thuốc thử Bayer).',
    gdptStandardRef: 'GDPT 2018 Hóa học 11 - Bài 13: Hydrocarbon không no'
  },
  {
    id: 'propene',
    nameVi: 'Propilen (Propen)',
    nameIupac: 'Propene',
    formula: 'C3H6',
    condensedFormula: 'CH3-CH=CH2',
    class: 'ALKENE',
    carbonHybridization: 'sp2',
    molecularGeometry: 'Phẳng cục bộ tại liên kết đôi C=C (120°)',
    boilingPointC: -47.6,
    molarMassGmol: 42.08,
    descriptionVi: 'Anken bất đối xứng kinh điển tuân theo quy tắc Markovnikov khi cộng HX: H gắn vào C nhiều H hơn, X vào C ít H hơn.',
    gdptStandardRef: 'GDPT 2018 Hóa học 11 - Bài 13: Hydrocarbon không no'
  },
  {
    id: 'but-2-ene',
    nameVi: 'But-2-en',
    nameIupac: 'But-2-ene',
    formula: 'C4H8',
    condensedFormula: 'CH3-CH=CH-CH3',
    class: 'ALKENE',
    carbonHybridization: 'sp2',
    molecularGeometry: 'Phẳng cục bộ, có đồng phân hình học cis-trans',
    boilingPointC: 3.7,
    molarMassGmol: 56.11,
    descriptionVi: 'Anken đối xứng trục, tồn tại 2 đồng phân cis-but-2-en và trans-but-2-en. Cộng HX chỉ cho duy nhất 1 sản phẩm chính.',
    gdptStandardRef: 'GDPT 2018 Hóa học 11 - Bài 13: Hydrocarbon không no'
  },

  // Alkynes (CnH2n-2)
  {
    id: 'ethyne',
    nameVi: 'Axetilen (Etin)',
    nameIupac: 'Ethyne',
    formula: 'C2H2',
    condensedFormula: 'CH≡CH',
    class: 'ALKYNE',
    carbonHybridization: 'sp',
    molecularGeometry: 'Đường thẳng (180°)',
    boilingPointC: -84.0,
    molarMassGmol: 26.04,
    isTerminal: true,
    descriptionVi: 'Khí hàn xì đất đèn (CaC2). Chứa 2 nguyên tử H linh động ở liên kết ba đầu mạch, tạo kết tủa vàng nhạt Ag-C≡C-Ag với AgNO3/NH3.',
    gdptStandardRef: 'GDPT 2018 Hóa học 11 - Bài 13: Hydrocarbon không no'
  },
  {
    id: 'propyne',
    nameVi: 'Propin',
    nameIupac: 'Propyne',
    formula: 'C3H4',
    condensedFormula: 'CH3-C≡CH',
    class: 'ALKYNE',
    carbonHybridization: 'sp',
    molecularGeometry: 'Thẳng hàng tại liên kết ba C≡C (180°)',
    boilingPointC: -23.2,
    molarMassGmol: 40.06,
    isTerminal: true,
    descriptionVi: 'Ankin đầu mạch (alk-1-yne). Phản ứng với AgNO3/NH3 tạo kết tủa vàng nhạt CH3-C≡C-Ag.',
    gdptStandardRef: 'GDPT 2018 Hóa học 11 - Bài 13: Hydrocarbon không no'
  },
  {
    id: 'but-2-yne',
    nameVi: 'But-2-in',
    nameIupac: 'But-2-yne',
    formula: 'C4H6',
    condensedFormula: 'CH3-C≡C-CH3',
    class: 'ALKYNE',
    carbonHybridization: 'sp',
    molecularGeometry: 'Thẳng hàng tại liên kết ba nội mạch',
    boilingPointC: 27.0,
    molarMassGmol: 54.09,
    isTerminal: false,
    descriptionVi: 'Ankin giữa mạch. KHÔNG có nguyên tử H linh động gắn vào liên kết ba nên HOÀN TOÀN KHÔNG phản ứng với AgNO3/NH3.',
    gdptStandardRef: 'GDPT 2018 Hóa học 11 - Bài 13: Hydrocarbon không no'
  },

  // Arenes (Aromatic Hydrocarbons)
  {
    id: 'benzene',
    nameVi: 'Benzen',
    nameIupac: 'Benzene',
    formula: 'C6H6',
    condensedFormula: 'C6H6',
    class: 'ARENE',
    carbonHybridization: 'sp2_aromatic',
    molecularGeometry: 'Lục giác đều phẳng (120°)',
    boilingPointC: 80.1,
    molarMassGmol: 78.11,
    descriptionVi: 'Hệ thơm 6 electron pi liên hợp cực kỳ bền vững (năng lượng cộng hưởng 150 kJ/mol). Không làm mất màu nước brom hay KMnO4 kể cả đun nóng.',
    gdptStandardRef: 'GDPT 2018 Hóa học 11 - Bài 14: Arene (Hydrocarbon thơm)'
  },
  {
    id: 'toluene',
    nameVi: 'Toluen (Metylbenzen)',
    nameIupac: 'Methylbenzene',
    formula: 'C7H8',
    condensedFormula: 'C6H5-CH3',
    class: 'ARENE',
    carbonHybridization: 'sp2_aromatic',
    molecularGeometry: 'Vòng phẳng gắn nhóm metyl tứ diện',
    boilingPointC: 110.6,
    molarMassGmol: 92.14,
    descriptionVi: 'Nhóm -CH3 đẩy electron làm tăng mật độ electron ở vị trí ortho và para, dễ tham gia phản ứng thế tạo thuốc nổ TNT. Bị oxy hóa bởi KMnO4 khi đun nóng tạo axit benzoic.',
    gdptStandardRef: 'GDPT 2018 Hóa học 11 - Bài 14: Arene (Hydrocarbon thơm)'
  }
];

export interface MarkovnikovAdditionResult {
  alkeneName: string;
  reagent: string;
  hasPeroxide: boolean;
  majorProduct: {
    nameIupac: string;
    formula: string;
    percentage: number;
    reasonVi: string;
  };
  minorProduct?: {
    nameIupac: string;
    formula: string;
    percentage: number;
    reasonVi: string;
  };
  ruleAppliedVi: string;
  chemicalEquation: string;
  carbocationStabilityVi: string;
  bayerDecolorization: {
    occurs: boolean;
    colorChange: string;
    precipitate: string;
    reactionEquation: string;
  };
}

export function simulateMarkovnikovAddition(
  alkeneId: string,
  reagent: 'HBr' | 'HCl' | 'H2O',
  hasPeroxide: boolean = false
): MarkovnikovAdditionResult {
  const alkene = HYDROCARBON_CATALOG.find(c => c.id === alkeneId && c.class === 'ALKENE');
  if (!alkene) {
    throw new Error(`Alkene not found: ${alkeneId}`);
  }

  // Bayer KMnO4 test is standard for all alkenes
  const bayerTest = {
    occurs: true,
    colorChange: 'Dung dịch tím KMnO4 nhạt dần rồi mất màu hoàn toàn',
    precipitate: 'Xuất hiện kết tủa nâu đen MnO2 lắng xuống đáy ống nghiệm',
    reactionEquation: alkene.id === 'ethene'
      ? '3CH2=CH2 + 2KMnO4 + 4H2O -> 3CH2(OH)-CH2(OH) + 2MnO2↓ + 2KOH'
      : '3R-CH=CH2 + 2KMnO4 + 4H2O -> 3R-CH(OH)-CH2(OH) + 2MnO2↓ + 2KOH'
  };

  // Ethene is symmetric
  if (alkene.id === 'ethene') {
    const prodName = reagent === 'HBr' ? 'Bromoethane' : (reagent === 'HCl' ? 'Chloroethane' : 'Ethanol');
    const prodFormula = reagent === 'HBr' ? 'CH3-CH2Br' : (reagent === 'HCl' ? 'CH3-CH2Cl' : 'CH3-CH2OH');
    return {
      alkeneName: 'Etilen (Ethene)',
      reagent: `${reagent}${hasPeroxide ? ' (có peroxide)' : ''}`,
      hasPeroxide,
      majorProduct: {
        nameIupac: prodName,
        formula: prodFormula,
        percentage: 100,
        reasonVi: 'Anken đối xứng trục, cộng vào vị trí nào cũng sinh ra cùng 1 sản phẩm duy nhất.'
      },
      ruleAppliedVi: 'Đối xứng phân tử — không phân chia sản phẩm chính/phụ.',
      chemicalEquation: `CH2=CH2 + ${reagent} -> ${prodFormula}`,
      carbocationStabilityVi: 'Carbocation bậc 1 đối xứng (CH3-CH2+).',
      bayerDecolorization: bayerTest
    };
  }

  // Propene is asymmetric
  if (alkene.id === 'propene') {
    if (reagent === 'HBr' && hasPeroxide) {
      // Kharasch effect (Anti-Markovnikov via free-radical mechanism)
      return {
        alkeneName: 'Propilen (Propene)',
        reagent: 'HBr (có mặt Peroxide ROOR)',
        hasPeroxide: true,
        majorProduct: {
          nameIupac: '1-Bromopropane',
          formula: 'CH3-CH2-CH2Br',
          percentage: 95,
          reasonVi: 'Hiệu ứng Kharasch: Gốc tự do Br• tấn công trước vào C bậc 1 để tạo gốc tự do trung gian bậc 2 bền hơn (CH3-•CH-CH2Br).'
        },
        minorProduct: {
          nameIupac: '2-Bromopropane',
          formula: 'CH3-CH(Br)-CH3',
          percentage: 5,
          reasonVi: 'Tạo từ gốc tự do bậc 1 kém bền hơn.'
        },
        ruleAppliedVi: 'Hiệu ứng Peoxit (Quy tắc Anti-Markovnikov): Chỉ áp dụng đặc thù cho HBr với peroxide.',
        chemicalEquation: 'CH3-CH=CH2 + HBr --(peroxide)--> CH3-CH2-CH2Br (sản phẩm chính)',
        carbocationStabilityVi: 'Cơ chế gốc tự do: Gốc bậc 2 bền hơn gốc bậc 1.',
        bayerDecolorization: bayerTest
      };
    }

    // Normal Markovnikov
    const majorName = reagent === 'HBr' ? '2-Bromopropane' : (reagent === 'HCl' ? '2-Chloropropane' : 'Propan-2-ol');
    const majorForm = reagent === 'HBr' ? 'CH3-CH(Br)-CH3' : (reagent === 'HCl' ? 'CH3-CH(Cl)-CH3' : 'CH3-CH(OH)-CH3');
    const minorName = reagent === 'HBr' ? '1-Bromopropane' : (reagent === 'HCl' ? '1-Chloropropane' : 'Propan-1-ol');
    const minorForm = reagent === 'HBr' ? 'CH3-CH2-CH2Br' : (reagent === 'HCl' ? 'CH3-CH2-CH2Cl' : 'CH3-CH2-CH2OH');

    return {
      alkeneName: 'Propilen (Propene)',
      reagent,
      hasPeroxide: false,
      majorProduct: {
        nameIupac: majorName,
        formula: majorForm,
        percentage: 85,
        reasonVi: 'Theo quy tắc Markovnikov: H+ ưu tiên cộng vào C mang nhiều H hơn (C bậc 1), phần âm (X-/OH-) cộng vào C ít H hơn (C bậc 2).'
      },
      minorProduct: {
        nameIupac: minorName,
        formula: minorForm,
        percentage: 15,
        reasonVi: 'Sản phẩm phụ hình thành qua carbocation bậc 1 kém bền.'
      },
      ruleAppliedVi: 'Quy tắc cộng Markovnikov (Carbocation 2° bền hơn 1° do hiệu ứng siêu liên hợp).',
      chemicalEquation: `CH3-CH=CH2 + ${reagent} -> ${majorForm} (sp chính) + ${minorForm} (sp phụ)`,
      carbocationStabilityVi: 'Carbocation bậc 2 CH3-CH(+)-CH3 bền hơn nhiều so với carbocation bậc 1 CH3-CH2-CH2(+).',
      bayerDecolorization: bayerTest
    };
  }

  // But-2-ene is symmetric
  const majorName = reagent === 'HBr' ? '2-Bromobutane' : (reagent === 'HCl' ? '2-Chlorobutane' : 'Butan-2-ol');
  const majorForm = reagent === 'HBr' ? 'CH3-CH(Br)-CH2-CH3' : (reagent === 'HCl' ? 'CH3-CH(Cl)-CH2-CH3' : 'CH3-CH(OH)-CH2-CH3');

  return {
    alkeneName: 'But-2-en',
    reagent,
    hasPeroxide,
    majorProduct: {
      nameIupac: majorName,
      formula: majorForm,
      percentage: 100,
      reasonVi: 'Anken đối xứng, hai carbon mang liên kết đôi có số lượng H tương đương nhau nên chỉ tạo 1 sản phẩm.'
    },
    ruleAppliedVi: 'Cộng anken đối xứng.',
    chemicalEquation: `CH3-CH=CH-CH3 + ${reagent} -> ${majorForm}`,
    carbocationStabilityVi: 'Carbocation bậc 2 tương đương ở cả 2 vị trí C2 và C3.',
    bayerDecolorization: bayerTest
  };
}

export interface TerminalAlkyneSilverResult {
  alkyneNameVi: string;
  alkyneFormula: string;
  isTerminal: boolean;
  reactsWithAgNO3NH3: boolean;
  precipitateColor: string;
  precipitateNameVi: string;
  precipitateFormula: string;
  precipitateMolarMassGmol: number;
  calculatedPrecipitateMassG: number;
  reactionEquation: string;
  diagnosticNoteVi: string;
  polymerizationOrHydrationInfo: {
    kucherovEquation: string;
    kucherovProductVi: string;
    polymerizationReactionVi: string;
  };
}

export function simulateTerminalAlkyneSilverTest(
  alkyneId: string,
  moles: number = 0.05
): TerminalAlkyneSilverResult {
  const alkyne = HYDROCARBON_CATALOG.find(c => c.id === alkyneId && c.class === 'ALKYNE');
  if (!alkyne) {
    throw new Error(`Alkyne not found: ${alkyneId}`);
  }

  if (alkyne.id === 'ethyne') {
    // Acetylene has 2 acidic hydrogens!
    // CH≡CH + 2AgNO3 + 2NH3 -> Ag-C≡C-Ag↓ + 2NH4NO3
    // Molar mass of Ag2C2 = 107.87*2 + 12.01*2 = 239.76 ~ 240 g/mol
    const molarMass = 239.76;
    const pptMass = parseFloat((moles * molarMass).toFixed(3));
    return {
      alkyneNameVi: 'Axetilen (Etin)',
      alkyneFormula: 'CH≡CH',
      isTerminal: true,
      reactsWithAgNO3NH3: true,
      precipitateColor: 'Vàng nhạt (đậm dần khi tiếp xúc ánh sáng)',
      precipitateNameVi: 'Bạc axetilua (Silver acetylide)',
      precipitateFormula: 'Ag-C≡C-Ag↓ (hoặc Ag2C2)',
      precipitateMolarMassGmol: molarMass,
      calculatedPrecipitateMassG: pptMass,
      reactionEquation: 'CH≡CH + 2AgNO3 + 2NH3 -> Ag-C≡C-Ag↓ + 2NH4NO3',
      diagnosticNoteVi: 'Đặc trưng riêng của axetilen: 1 mol C2H2 thế 2 mol Ag (tỉ lệ 1:2) do có 2 nguyên tử H linh động ở 2 đầu liên kết ba.',
      polymerizationOrHydrationInfo: {
        kucherovEquation: 'CH≡CH + H2O --(HgSO4/H2SO4, 80°C)--> CH3-CHO (Acetaldehyde)',
        kucherovProductVi: 'Phản ứng hidrat hóa Kucherov tạo Andehit axetic (không tạo ancol do ancol vinylic không bền hỗ biến thành andehit).',
        polymerizationReactionVi: 'Dime hóa tạo vinylaxetilen (CH2=CH-C≡CH); Trime hóa xúc tác than hoạt tính ở 600°C tạo benzen (C6H6).'
      }
    };
  }

  if (alkyne.id === 'propyne') {
    // Propyne has 1 acidic hydrogen: CH3-C≡CH + AgNO3 + NH3 -> CH3-C≡C-Ag↓ + NH4NO3
    // Molar mass of CH3-C≡C-Ag = 15 + 12 + 12 + 107.87 = 146.87 g/mol
    const molarMass = 146.87;
    const pptMass = parseFloat((moles * molarMass).toFixed(3));
    return {
      alkyneNameVi: 'Propin',
      alkyneFormula: 'CH3-C≡CH',
      isTerminal: true,
      reactsWithAgNO3NH3: true,
      precipitateColor: 'Vàng nhạt',
      precipitateNameVi: 'Bạc propinua (Silver propynide)',
      precipitateFormula: 'CH3-C≡C-Ag↓',
      precipitateMolarMassGmol: molarMass,
      calculatedPrecipitateMassG: pptMass,
      reactionEquation: 'CH3-C≡CH + AgNO3 + NH3 -> CH3-C≡C-Ag↓ + NH4NO3',
      diagnosticNoteVi: 'Ankin-1-in chứa 1 H linh động ở liên kết ba đầu mạch, thế 1 nguyên tử Ag tạo kết tủa màu vàng nhạt.',
      polymerizationOrHydrationInfo: {
        kucherovEquation: 'CH3-C≡CH + H2O --(HgSO4/H2SO4, 80°C)--> CH3-CO-CH3 (Axeton)',
        kucherovProductVi: 'Cộng nước theo Markovnikov tạo xeton (axeton) thay vì andehit.',
        polymerizationReactionVi: 'Trime hóa tạo 1,3,5-trimetylbenzen (mesitylene).'
      }
    };
  }

  // Non-terminal alkyne (But-2-yne)
  return {
    alkyneNameVi: 'But-2-in',
    alkyneFormula: 'CH3-C≡C-CH3',
    isTerminal: false,
    reactsWithAgNO3NH3: false,
    precipitateColor: 'Trong suốt (Không đổi màu, không có kết tủa)',
    precipitateNameVi: 'Không phản ứng',
    precipitateFormula: 'Không có',
    precipitateMolarMassGmol: 0,
    calculatedPrecipitateMassG: 0,
    reactionEquation: 'CH3-C≡C-CH3 + AgNO3 + NH3 -> Không phản ứng',
    diagnosticNoteVi: 'BẪY THI ĐẠI HỌC KINH ĐIỂN: But-2-in là ankin liên kết ba nằm ở giữa mạch (C bậc 2 không gắn H), do đó KHÔNG có H linh động và HOÀN TOÀN KHÔNG phản ứng với thuốc thử Tollens AgNO3/NH3.',
    polymerizationOrHydrationInfo: {
      kucherovEquation: 'CH3-C≡C-CH3 + H2O --(HgSO4, 80°C)--> CH3-CO-CH2-CH3 (Butan-2-on)',
      kucherovProductVi: 'Thủy phân Kucherov tạo Butan-2-on (Ethyl methyl ketone).',
      polymerizationReactionVi: 'Phản ứng cộng halogen brom theo từng nấc (tối đa cộng 2 phân tử Br2 làm mất màu brom).'
    }
  };
}

export interface AlkaneHalogenationResult {
  alkaneNameVi: string;
  halogen: 'Cl2' | 'Br2';
  uvLightPresent: boolean;
  reactionOccurs: boolean;
  products: {
    productNameVi: string;
    productFormula: string;
    carbonDegree: '1°' | '2°' | '3°';
    yieldPercentage: number;
    isMajor: boolean;
    reasonVi: string;
  }[];
  selectivityExplanationVi: string;
  mechanismVi: string;
}

export function simulateAlkaneHalogenation(
  alkaneId: string,
  halogen: 'Cl2' | 'Br2',
  uvLightPresent: boolean = true
): AlkaneHalogenationResult {
  if (!uvLightPresent) {
    return {
      alkaneNameVi: alkaneId,
      halogen,
      uvLightPresent: false,
      reactionOccurs: false,
      products: [],
      selectivityExplanationVi: 'Không có ánh sáng tử ngoại (UV) hoặc đun nóng cao: Liên kết Halogen không bị phân cắt đồng ly (homolytic cleavage) tạo gốc tự do X•, phản ứng thế không thể diễn ra trong bóng tối ở nhiệt độ phòng.',
      mechanismVi: 'Thiếu giai đoạn khơi mào quang hóa (Chain initiation): Cl2 --(as)--> 2Cl•.'
    };
  }

  if (alkaneId === 'methane') {
    return {
      alkaneNameVi: 'Metan (CH4)',
      halogen,
      uvLightPresent: true,
      reactionOccurs: true,
      products: [
        {
          productNameVi: 'Clometan (Methyl chloride)',
          productFormula: 'CH3Cl',
          carbonDegree: '1°',
          yieldPercentage: 100,
          isMajor: true,
          reasonVi: 'CH4 chỉ có 4 nguyên tử H tương đương, thế tỉ lệ 1:1 tạo CH3Cl duy nhất ở nấc thứ nhất.'
        }
      ],
      selectivityExplanationVi: '4 nguyên tử H hoàn toàn đối xứng trong hình học tứ diện.',
      mechanismVi: 'Cơ chế thế gốc tự do (SR): Khơi mào (Cl2 -> 2Cl•) -> Phát triển mạch (CH4 + Cl• -> •CH3 + HCl; •CH3 + Cl2 -> CH3Cl + Cl•) -> Đứt mạch (2Cl• -> Cl2; 2•CH3 -> C2H6).'
    };
  }

  if (alkaneId === 'propane') {
    // Relative reactivity:
    // For Cl2 at 25°C: 3° (5.0) : 2° (3.8) : 1° (1.0)
    // Propane has six 1° H and two 2° H
    // Rate 1° = 6 * 1.0 = 6.0 (44%)
    // Rate 2° = 2 * 3.8 = 7.6 (56%)
    // For Br2 at 127°C: 3° (1600) : 2° (82) : 1° (1)
    // Rate 1° = 6 * 1 = 6 (3.5%)
    // Rate 2° = 2 * 82 = 164 (96.5%)
    const isBromine = halogen === 'Br2';
    const majorPercent = isBromine ? 97 : 56;
    const minorPercent = isBromine ? 3 : 44;

    return {
      alkaneNameVi: 'Propan (CH3-CH2-CH3)',
      halogen,
      uvLightPresent: true,
      reactionOccurs: true,
      products: [
        {
          productNameVi: isBromine ? '2-Bromopropan (sản phẩm chính)' : '2-Clopropan (sản phẩm chính)',
          productFormula: isBromine ? 'CH3-CH(Br)-CH3' : 'CH3-CH(Cl)-CH3',
          carbonDegree: '2°',
          yieldPercentage: majorPercent,
          isMajor: true,
          reasonVi: 'Gốc tự do trung gian bậc 2 (CH3-•CH-CH3) bền hơn gốc bậc 1, năng lượng hoạt hóa tách H bậc 2 thấp hơn.'
        },
        {
          productNameVi: isBromine ? '1-Bromopropan (sản phẩm phụ)' : '1-Clopropan (sản phẩm phụ)',
          productFormula: isBromine ? 'CH3-CH2-CH2Br' : 'CH3-CH2-CH2Cl',
          carbonDegree: '1°',
          yieldPercentage: minorPercent,
          isMajor: false,
          reasonVi: 'Thế vào C bậc 1 hình thành gốc tự do bậc 1 kém bền.'
        }
      ],
      selectivityExplanationVi: isBromine
        ? 'Brom có tính chọn lọc cực kỳ cao (tỉ lệ phản ứng tương đối 2°/1° ~ 82:1), do đó sản phẩm 2-bromopropan chiếm tới gần 97%.'
        : 'Clo phản ứng mãnh liệt và kém chọn lọc hơn brom (tỉ lệ phản ứng tương đối 2°/1° ~ 3.8:1), tỷ lệ 2-clopropan đạt khoảng 56%.',
      mechanismVi: 'Quy tắc thế ankan: Nguyên tử halogen ưu tiên thế nguyên tử hydro ở carbon bậc cao hơn (3° > 2° > 1°).'
    };
  }

  // Isobutane (2-Methylpropane)
  // Has nine 1° H and one 3° H
  // Cl2: 1° = 9*1 = 9 (64%); 3° = 1*5 = 5 (36%)
  // Br2: 1° = 9*1 = 9 (0.5%); 3° = 1*1600 = 1600 (99.5%)
  const isBromine = halogen === 'Br2';
  return {
    alkaneNameVi: 'Isobutan (2-Metylpropan)',
    halogen,
    uvLightPresent: true,
    reactionOccurs: true,
    products: [
      {
        productNameVi: isBromine ? '2-Bromo-2-metylpropan (sản phẩm duy nhất áp đảo)' : '2-Clo-2-metylpropan',
        productFormula: isBromine ? '(CH3)3C-Br' : '(CH3)3C-Cl',
        carbonDegree: '3°',
        yieldPercentage: isBromine ? 99 : 36,
        isMajor: isBromine,
        reasonVi: 'Thế vào carbon bậc 3 (3°). Gốc tự do bậc 3 (CH3)3C• có độ bền lớn nhất do 3 nhóm metyl siêu liên hợp đẩy e.'
      },
      {
        productNameVi: isBromine ? '1-Bromo-2-metylpropan (vết)' : '1-Clo-2-metylpropan (sản phẩm chính do thống kê 9 H)',
        productFormula: isBromine ? '(CH3)2CH-CH2Br' : '(CH3)2CH-CH2Cl',
        carbonDegree: '1°',
        yieldPercentage: isBromine ? 1 : 64,
        isMajor: !isBromine,
        reasonVi: 'Thế vào carbon bậc 1. Clo hóa bị chi phối lớn bởi yếu tố xác suất thống kê (9 nguyên tử H bậc 1 so với 1 H bậc 3).'
      }
    ],
    selectivityExplanationVi: isBromine
      ? 'Brom hóa có tính chọn lọc nguyên tử tuyệt đối (3° : 1° ~ 1600 : 1), biến (CH3)3C-Br thành sản phẩm gần như độc nhất.'
      : 'Clo hóa có tính chọn lọc vừa phải (3° : 1° ~ 5 : 1), do số H bậc 1 gấp 9 lần nên 1-clo-2-metylpropan chiếm ưu thế thống kê.',
    mechanismVi: 'Độ bền gốc tự do alkyl: R3C• (3°) > R2CH• (2°) > RCH2• (1°) > •CH3.'
  };
}

export interface AromaticReactionResult {
  areneNameVi: string;
  reagentVi: string;
  reactionOccurs: boolean;
  productsSummaryVi: string;
  chemicalEquation: string;
  ringActivationVi: string;
  directingEffectVi: string;
  tntFormation?: {
    isFormed: boolean;
    tntMassG: number;
    tntFormula: string;
    hazardNoteVi: string;
  };
  benzoicAcidYield?: {
    isFormed: boolean;
    whiteCrystalsFormula: string;
    colorChangeVi: string;
  };
}

export function simulateAromaticReaction(
  areneId: 'benzene' | 'toluene',
  reactionType: 'KMNO4_HEAT' | 'NITRATION_HNO3_H2SO4' | 'BROMINATION_FEBR3' | 'BROMINE_WATER'
): AromaticReactionResult {
  if (areneId === 'benzene') {
    if (reactionType === 'KMNO4_HEAT') {
      return {
        areneNameVi: 'Benzen (C6H6)',
        reagentVi: 'Thuốc tím KMnO4 (đun nóng đến 100°C)',
        reactionOccurs: false,
        productsSummaryVi: 'Dung dịch giữ nguyên màu tím đậm đặc trưng, không có bất kỳ hiện tượng phản ứng hay kết tủa nào.',
        chemicalEquation: 'C6H6 + KMnO4 + H2SO4 --(t°=100°C)--> Không phản ứng',
        ringActivationVi: 'Vòng benzen không có nhánh ankyl và có năng lượng cộng hưởng thơm rất cao (150 kJ/mol), bền trơ tuyệt đối trước các chất oxy hóa mạnh thông thường.',
        directingEffectVi: 'Không áp dụng.'
      };
    }

    if (reactionType === 'BROMINE_WATER') {
      return {
        areneNameVi: 'Benzen (C6H6)',
        reagentVi: 'Nước brom (Br2 trong H2O)',
        reactionOccurs: false,
        productsSummaryVi: 'Nước brom không bị mất màu. Benzen chiết brom từ pha nước lên lớp trên do brom tan tốt hơn trong benzen (hiện tượng vật lý chiết tách, không có phản ứng hóa học).',
        chemicalEquation: 'C6H6 + Br2 (dung dịch nước) -> Không phản ứng hóa học',
        ringActivationVi: 'Mật độ electron phân tán đều khắp 6 carbon, không đủ hoạt tính phản ứng cộng hay thế nếu thiếu xúc tác acid Lewis mạnh.',
        directingEffectVi: 'Không áp dụng.'
      };
    }

    if (reactionType === 'BROMINATION_FEBR3') {
      return {
        areneNameVi: 'Benzen (C6H6)',
        reagentVi: 'Brom khan (Br2 nguyên chất) xúc tác bột sắt Fe/FeBr3',
        reactionOccurs: true,
        productsSummaryVi: 'Sinh ra brombenzen (chất lỏng không màu, nặng hơn nước) và khí HBr bay ra làm quỳ tím ẩm hóa đỏ.',
        chemicalEquation: 'C6H6 + Br2 --(FeBr3, t°)--> C6H5Br + HBr↑',
        ringActivationVi: 'FeBr3 đóng vai trò acid Lewis phân cực phân tử Br-Br tạo electrophile Br+ cực mạnh tấn công vào vòng thơm.',
        directingEffectVi: '6 vị trí trong vòng benzen đồng nhất, chỉ thu được 1 dẫn xuất monobrom duy nhất.'
      };
    }

    // Nitration
    return {
      areneNameVi: 'Benzen (C6H6)',
      reagentVi: 'Hỗn hợp HNO3 đặc + H2SO4 đặc (tỉ lệ 1:2)',
      reactionOccurs: true,
      productsSummaryVi: 'Tạo nitrobenzen (chất lỏng màu vàng nhạt, mùi hạnh nhân đắng, lắng xuống đáy).',
      chemicalEquation: 'C6H6 + HNO3 --(H2SO4 đ, 50-60°C)--> C6H5NO2 + H2O',
      ringActivationVi: 'H2SO4 đặc proton hóa HNO3 tạo ion nitroni NO2+ đóng vai trò tác nhân electrophile.',
      directingEffectVi: 'Tạo nitrobenzen mononitro ở nhiệt độ thường; muốn nitro hóa tiếp cần nâng nhiệt độ lên >90°C.'
    };
  }

  // Toluene (C6H5-CH3)
  if (reactionType === 'KMNO4_HEAT') {
    return {
      areneNameVi: 'Toluen (C6H5-CH3)',
      reagentVi: 'Dung dịch thuốc tím KMnO4 (đun cách thủy 80-100°C)',
      reactionOccurs: true,
      productsSummaryVi: 'Dung dịch KMnO4 mất màu tím, sinh kết tủa nâu đen MnO2. Khi axit hóa dung dịch sau phản ứng bằng HCl, xuất hiện kết tủa trắng tinh thể axit benzoic (C6H5COOH).',
      chemicalEquation: 'C6H5-CH3 + 2KMnO4 --(t°)--> C6H5COOK + 2MnO2↓ + KOH + H2O; sau đó C6H5COOK + HCl -> C6H5COOH↓ + KCl',
      ringActivationVi: 'Nguyên tử H ở vị trí benzylic (C đính trực tiếp vào vòng) linh động cao, dễ bị oxy hóa cắt mạch thành nhóm carboxyl -COOH.',
      directingEffectVi: 'Oxy hóa chọn lọc tại mạch nhánh ankyl benzylic mà không phá vỡ vòng thơm.',
      benzoicAcidYield: {
        isFormed: true,
        whiteCrystalsFormula: 'C6H5COOH↓ (Axit benzoic)',
        colorChangeVi: 'Tím đậm KMnO4 -> Mất màu + MnO2 nâu đen -> Kết tủa trắng axit benzoic'
      }
    };
  }

  if (reactionType === 'BROMINE_WATER') {
    return {
      areneNameVi: 'Toluen (C6H5-CH3)',
      reagentVi: 'Nước brom (Br2 trong H2O)',
      reactionOccurs: false,
      productsSummaryVi: 'Không làm mất màu nước brom ở điều kiện thường (tương tự benzen, cần xúc tác acid Lewis hoặc chiếu sáng).',
      chemicalEquation: 'C6H5-CH3 + Br2 (dung dịch nước) -> Không phản ứng',
      ringActivationVi: 'Mặc dù có nhóm metyl hoạt hóa nhẹ, năng lượng hoạt hóa thế brom dung dịch nước vẫn quá cao.',
      directingEffectVi: 'Cần phân biệt rõ: Brom khan (FeBr3) thế nhân; Brom hơi chiếu sáng (as, t°) thế nhánh benzylic (C6H5-CH2Br).'
    };
  }

  if (reactionType === 'BROMINATION_FEBR3') {
    return {
      areneNameVi: 'Toluen (C6H5-CH3)',
      reagentVi: 'Brom khan (Br2 lỏng) xúc tác FeBr3',
      reactionOccurs: true,
      productsSummaryVi: 'Phản ứng thế vào nhân thơm diễn ra nhanh hơn nhiều so với benzen, tạo hỗn hợp đồng phân ortho-bromotoluen và para-bromotoluen.',
      chemicalEquation: 'C6H5-CH3 + Br2 --(FeBr3)--> o-Br-C6H4-CH3 (sản phẩm ortho) + p-Br-C6H4-CH3 (sản phẩm para) + HBr↑',
      ringActivationVi: 'Nhóm metyl (-CH3) có hiệu ứng cảm ứng dương (+I) và siêu liên hợp làm tăng mật độ electron trong nhân thơm.',
      directingEffectVi: 'Định hướng nhóm thế mới vào vị trí Ortho và Para (nhóm thế loại 1 hoạt hóa vòng).'
    };
  }

  // Nitration of Toluene -> TNT
  return {
    areneNameVi: 'Toluen (C6H5-CH3)',
    reagentVi: 'Hỗn hợp HNO3 đặc dư + H2SO4 đặc (đun nóng nấc nhiệt độ)',
    reactionOccurs: true,
    productsSummaryVi: 'Nitro hóa 3 nấc liên tiếp vào 2 vị trí ortho và 1 vị trí para tạo 2,4,6-trinitrotoluen (thuốc nổ TNT kết tinh màu vàng nhạt).',
    chemicalEquation: 'C6H5-CH3 + 3HNO3 --(H2SO4 đ, t°)--> C6H2(NO2)3-CH3 (TNT) + 3H2O',
    ringActivationVi: 'Toluen phản ứng nitro hóa dễ dàng gấp hàng nghìn lần so với benzen nhờ nhóm metyl đẩy electron.',
    directingEffectVi: 'Định hướng Ortho và Para tuyệt đối vào các vị trí 2, 4, 6 quanh vòng benzen.',
    tntFormation: {
      isFormed: true,
      tntMassG: 22.71, // for 0.1 mol
      tntFormula: 'C6H2(NO2)3-CH3 (2,4,6-Trinitrotoluen)',
      hazardNoteVi: 'TNT là thuốc nổ quân dụng mạnh, bền nhiệt, nhạy nổ khi kích nổ kíp nhưng an toàn trước va đập cơ học thông thường.'
    }
  };
}
