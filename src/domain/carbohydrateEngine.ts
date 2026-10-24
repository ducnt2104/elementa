// src/domain/carbohydrateEngine.ts
// Comprehensive Carbohydrate Biochemistry, Structural Equilibrium & Diagnostic Reactions Engine
// Strictly conforming to Vietnam GDPT 2018 Chemistry 12 (Chủ đề 2: Cacbohiđrat) & IUPAC Guidelines

export type CarbohydrateClass = 'MONOSACCHARIDE' | 'DISACCHARIDE' | 'POLYSACCHARIDE';

export interface CarbohydrateDef {
  id: string;
  nameVI: string;
  nameIUPAC: string;
  formula: string;
  molarMass: number; // g/mol (or monomer g/mol for polymers)
  classification: CarbohydrateClass;
  monomerUnitsVI: string[];
  glycosidicBondType?: string;
  isReducingSugar: boolean; // Has free hemiacetal / hemiketal group in open-chain equilibrium
  specificOpticalRotationDextroDegrees: number; // [alpha]_D^20 in degrees
  naturalSourcesVI: string[];
  sweetnessIndexVsSucrose: number; // Sucrose = 1.0 (Fructose = 1.5, Glucose = 0.7, Maltose = 0.5)
  curriculumContextVI: string;
}

export interface MutarotationEquilibrium {
  sugarId: 'glucose' | 'fructose';
  alphaAnomerPercent: number;
  betaAnomerPercent: number;
  openChainPercent: number;
  equilibriumSpecificRotationDegrees: number;
  explanationVI: string;
}

export interface TollensSilverMirrorResult {
  sugar: CarbohydrateDef;
  massSugarGrams: number;
  molesSugar: number;
  canReduceTollens: boolean;
  reductionMechanismVI: string;
  stoichiometricRatioSugarToAg: number; // 1 mol glucose -> 2 mol Ag
  theoreticalSilverYieldGrams: number;
  molesSilverDeposited: number;
  visualPhenomenonVI: string;
  chemicalEquationVI: string;
}

export interface FehlingCopperReactionResult {
  sugar: CarbohydrateDef;
  reactionCondition: 'ROOM_TEMPERATURE' | 'HEATING_ABOVE_80C';
  formsSolubleBlueComplex: boolean;
  formsRedBrickPrecipitate: boolean;
  redPrecipitateMassGrams: number; // Cu2O
  visualPhenomenonVI: string;
  chemicalEquationVI: string;
  pedagogicalRationaleVI: string;
}

export interface StarchIodineInclusionResult {
  temperatureCelsius: number;
  isHelixFormed: boolean;
  solutionColorHex: string;
  colorNameVI: string;
  pedagogicalInsightVI: string;
}

export interface SucroseInversionResult {
  initialSucroseMassGrams: number;
  initialOpticalRotationDegrees: number;
  hydrolysisConversionPercent: number; // 0 to 100%
  glucoseYieldGrams: number;
  fructoseYieldGrams: number;
  currentOpticalRotationDegrees: number;
  isInversionComplete: boolean;
  explanationVI: string;
}

export interface CelluloseNitrationResult {
  celluloseMassGrams: number;
  nitricAcidMolesNeeded: number;
  theoreticalCelluloseTrinitrateGrams: number;
  nitrogenMassPercent: number;
  combustionPhenomenonVI: string;
  militaryAndIndustrialApplicationVI: string;
}

// ----------------------------------------------------------------------------
// 1. CARBOHYDRATES CATALOG
// ----------------------------------------------------------------------------
export const CARBOHYDRATES_CATALOG: CarbohydrateDef[] = [
  {
    id: 'glucose',
    nameVI: 'Glucozơ (Đường nho)',
    nameIUPAC: 'D-Glucopyranose',
    formula: 'C6H12O6',
    molarMass: 180.16,
    classification: 'MONOSACCHARIDE',
    monomerUnitsVI: ['D-Glucose'],
    isReducingSugar: true,
    specificOpticalRotationDextroDegrees: +52.7,
    naturalSourcesVI: ['Nho chín (khoảng 20%)', 'Mật ong (khoảng 30%)', 'Máu người (khoảng 0.1% ~ 4.4 - 7.2 mmol/L)'],
    sweetnessIndexVsSucrose: 0.74,
    curriculumContextVI: 'Chất dinh dưỡng quan trọng hàng đầu của tế bào sống, điều chế dịch truyền y tế 5% và tham gia tráng gương bạc ruột phích.'
  },
  {
    id: 'fructose',
    nameVI: 'Fructozơ (Đường hoa quả / mật ong)',
    nameIUPAC: 'D-Fructofuranose',
    formula: 'C6H12O6',
    molarMass: 180.16,
    classification: 'MONOSACCHARIDE',
    monomerUnitsVI: ['D-Fructose'],
    isReducingSugar: true, // In alkaline medium (Tollens/Fehling), tautomerizes to glucose via enediol intermediate!
    specificOpticalRotationDextroDegrees: -92.4,
    naturalSourcesVI: ['Mật ong (khoảng 40%)', 'Trái cây ngọt chín'],
    sweetnessIndexVsSucrose: 1.5,
    curriculumContextVI: 'Loại đường ngọt nhất trong tự nhiên, dù chứa nhóm chức xeton (-C=O) nhưng trong môi trường kiềm bị đồng hóa thành glucozơ nên vẫn tráng bạc!'
  },
  {
    id: 'sucrose',
    nameVI: 'Saccarozơ (Đường mía / củ cải đường)',
    nameIUPAC: 'alpha-D-Glucopyranosyl-(1->2)-beta-D-fructofuranoside',
    formula: 'C12H22O11',
    molarMass: 342.30,
    classification: 'DISACCHARIDE',
    monomerUnitsVI: ['alpha-D-Glucose', 'beta-D-Fructose'],
    glycosidicBondType: 'alpha-1,beta-2-glycosidic bond',
    isReducingSugar: false, // Both anomeric carbons tied in glycosidic link, no free hemiacetal
    specificOpticalRotationDextroDegrees: +66.5,
    naturalSourcesVI: ['Cây mía đường (13-16%)', 'Củ cải đường', 'Thốt nốt'],
    sweetnessIndexVsSucrose: 1.0,
    curriculumContextVI: 'Đường ăn thông dụng hằng ngày; không có nhóm hemiacetal nên KHÔNG tráng gương, nhưng khi thủy phân tạo đường nghịch đảo tráng gương cực mạnh!'
  },
  {
    id: 'maltose',
    nameVI: 'Mantozơ (Đường mạch nha)',
    nameIUPAC: 'alpha-D-Glucopyranosyl-(1->4)-D-glucopyranose',
    formula: 'C12H22O11',
    molarMass: 342.30,
    classification: 'DISACCHARIDE',
    monomerUnitsVI: ['alpha-D-Glucose', 'alpha-D-Glucose'],
    glycosidicBondType: 'alpha-1,4-glycosidic bond',
    isReducingSugar: true, // One anomeric hemiacetal remains free
    specificOpticalRotationDextroDegrees: +138.0,
    naturalSourcesVI: ['Mầm lúa mạch', 'Kẹo mạch nha truyền thống'],
    sweetnessIndexVsSucrose: 0.5,
    curriculumContextVI: 'Sản phẩm trung gian của quá trình thủy phân tinh bột bằng enzym amylase trong khoang miệng.'
  },
  {
    id: 'starch',
    nameVI: 'Tinh bột (Amilozơ & Amilopectin)',
    nameIUPAC: 'Poly(alpha-1,4-D-glucan) & Poly(alpha-1,4/1,6-D-glucan)',
    formula: '(C6H10O5)n',
    molarMass: 162.14, // Monomer equivalent
    classification: 'POLYSACCHARIDE',
    monomerUnitsVI: ['alpha-D-Glucose'],
    glycosidicBondType: 'alpha-1,4 (Amilozơ) & alpha-1,4 xen kẽ alpha-1,6 (Amilopectin)',
    isReducingSugar: false,
    specificOpticalRotationDextroDegrees: +180.0,
    naturalSourcesVI: ['Hạt gạo (70-80%)', 'Ngô / bắp (65-75%)', 'Khoai tây, sắn'],
    sweetnessIndexVsSucrose: 0.0,
    curriculumContextVI: 'Nguồn tinh bột lương thực chính của nhân loại; tạo phức màu xanh tím đặc trưng với iot do cấu trúc xoắn ốc của amilozơ.'
  },
  {
    id: 'cellulose',
    nameVI: 'Xenlulozơ (Chất xơ thực vật)',
    nameIUPAC: 'Poly(beta-1,4-D-glucan)',
    formula: '(C6H10O5)n',
    molarMass: 162.14, // Monomer equivalent
    classification: 'POLYSACCHARIDE',
    monomerUnitsVI: ['beta-D-Glucose'],
    glycosidicBondType: 'beta-1,4-glycosidic bond',
    isReducingSugar: false,
    specificOpticalRotationDextroDegrees: 0.0,
    naturalSourcesVI: ['Sợi bông nõn (95-98%)', 'Gỗ rừng (40-50%)', 'Tre, nứa'],
    sweetnessIndexVsSucrose: 0.0,
    curriculumContextVI: 'Cấu tạo nên màng tế bào thực vật; không tan trong nước và dung môi thông thường; dùng chế tạo tơ visco, tơ axetat và thuốc súng không khói.'
  }
];

// ----------------------------------------------------------------------------
// 2. MUTAROTATION EQUILIBRIUM FOR GLUCOSE & FRUCTOSE
// ----------------------------------------------------------------------------
export function calculateMutarotationEquilibrium(sugarId: 'glucose' | 'fructose'): MutarotationEquilibrium {
  if (sugarId === 'glucose') {
    return {
      sugarId: 'glucose',
      alphaAnomerPercent: 36.0,
      betaAnomerPercent: 64.0,
      openChainPercent: 0.003, // Small fraction in dynamic equilibrium
      equilibriumSpecificRotationDegrees: +52.7,
      explanationVI: 'Trong dung dịch nước, glucozơ mở vòng và đóng vòng liên tục thông qua cân bằng hỗ biến. Dạng alpha-D-glucopyranose ([alpha] = +112°) và beta-D-glucopyranose ([alpha] = +18.7°) chuyển hóa lẫn nhau qua dạng mạch hở anđehit cho đến khi góc quay quang học ổn định ở +52.7°. Beta-anomer chiếm ưu thế (64%) do tất cả các nhóm -OH đều ở vị trí xích đạo (equatorial) ít bị cản trở không gian.'
    };
  } else {
    return {
      sugarId: 'fructose',
      alphaAnomerPercent: 30.0,
      betaAnomerPercent: 70.0,
      openChainPercent: 0.5,
      equilibriumSpecificRotationDegrees: -92.4,
      explanationVI: 'D-Fructozơ trong dung dịch nước tồn tại chủ yếu ở dạng vòng 5 cạnh beta-D-fructofuranose và vòng 6 cạnh fructopyranose. Cân bằng hỗ biến chuyển dịch đạt góc quay cực đại -92.4° (tả triền).'
    };
  }
}

// ----------------------------------------------------------------------------
// 3. TOLLENS SILVER MIRROR REDOX REACTION
// ----------------------------------------------------------------------------
export function calculateTollensSilverMirror(params: {
  sugarId: string;
  sugarMassGrams: number;
}): TollensSilverMirrorResult {
  const sugar = CARBOHYDRATES_CATALOG.find(s => s.id === params.sugarId);
  if (!sugar) {
    throw new Error(`Không tìm thấy cacbohiđrat với ID: ${params.sugarId}`);
  }

  const massG = params.sugarMassGrams;
  if (massG <= 0) {
    throw new Error('Khối lượng đường phải lớn hơn 0.');
  }

  const molesSugar = massG / sugar.molarMass;

  // Starch and cellulose are polysaccharides: do not reduce Tollens
  // Sucrose is a non-reducing disaccharide: do not reduce Tollens
  if (sugar.id === 'sucrose' || sugar.classification === 'POLYSACCHARIDE') {
    return {
      sugar,
      massSugarGrams: massG,
      molesSugar: Math.round(molesSugar * 10000) / 10000,
      canReduceTollens: false,
      reductionMechanismVI: `${sugar.nameVI} không có nhóm chức hemiacetal tự do (hoặc là chuỗi polymer dài), nên KHÔNG tham gia phản ứng tráng bạc với thuốc thử Tollens.`,
      stoichiometricRatioSugarToAg: 0,
      theoreticalSilverYieldGrams: 0,
      molesSilverDeposited: 0,
      visualPhenomenonVI: 'Không có hiện tượng. Dung dịch thuốc thử Tollens vẫn trong suốt, không có lớp bạc kim loại bám vào thành ống nghiệm.',
      chemicalEquationVI: `${sugar.formula} + [Ag(NH₃)₂]OH → Không phản ứng`
    };
  }

  // Glucose and Fructose: 1 mol sugar -> 2 mol Ag (M_Ag = 107.87 g/mol)
  // Maltose: 1 mol maltose -> 2 mol Ag
  const molesAg = molesSugar * 2;
  const silverGrams = Math.round(molesAg * 107.8682 * 100) / 100;

  let mechanismVI: string;
  if (sugar.id === 'fructose') {
    mechanismVI = 'Trong môi trường kiềm của thuốc thử Tollens (chứa NH₃), fructozơ chuyển hóa thuận nghịch thành glucozơ thông qua chất trung gian enđiol (enediol intermediate), do đó vẫn tráng bạc giống như glucozơ!';
  } else if (sugar.id === 'glucose') {
    mechanismVI = 'Nhóm -CHO của phân tử glucozơ dạng mạch hở bị oxi hóa bởi ion phức [Ag(NH₃)₂]⁺ thành muối amoni gluconat C₅H₁₁O₅-COONH₄, đồng thời ion Ag⁺ bị khử thành kim loại Ag sáng bóng bám lên thành thủy tinh.';
  } else {
    mechanismVI = 'Phân tử mantozơ còn chứa một nhóm hemiacetal tự do ở gốc glucozơ thứ hai, có thể mở vòng tạo nhóm -CHO khử được ion Ag⁺.';
  }

  const eqVI = sugar.id === 'glucose'
    ? 'CH₂OH[CHOH]₄CHO + 2 [Ag(NH₃)₂]OH → CH₂OH[CHOH]₄COONH₄ + 2 Ag↓ + 3 NH₃ + H₂O'
    : `${sugar.formula} + 2 [Ag(NH₃)₂]OH → Muối amoni + 2 Ag↓ + 3 NH₃ + H₂O`;

  return {
    sugar,
    massSugarGrams: massG,
    molesSugar: Math.round(molesSugar * 10000) / 10000,
    canReduceTollens: true,
    reductionMechanismVI: mechanismVI,
    stoichiometricRatioSugarToAg: 2,
    theoreticalSilverYieldGrams: silverGrams,
    molesSilverDeposited: Math.round(molesAg * 10000) / 10000,
    visualPhenomenonVI: `Xuất hiện một lớp bạc kim loại trắng sáng bóng như gương bám đều trên thành ống nghiệm (${silverGrams} g Ag).`,
    chemicalEquationVI: eqVI
  };
}

// ----------------------------------------------------------------------------
// 4. FEHLING / Cu(OH)2 DUAL REACTION
// ----------------------------------------------------------------------------
export function calculateFehlingReaction(params: {
  sugarId: string;
  reactionCondition: 'ROOM_TEMPERATURE' | 'HEATING_ABOVE_80C';
  sugarMassGrams: number;
}): FehlingCopperReactionResult {
  const sugar = CARBOHYDRATES_CATALOG.find(s => s.id === params.sugarId);
  if (!sugar) {
    throw new Error(`Không tìm thấy cacbohiđrat với ID: ${params.sugarId}`);
  }

  const massG = params.sugarMassGrams;
  const condition = params.reactionCondition;

  // Starch & Cellulose: insoluble / no reaction
  if (sugar.classification === 'POLYSACCHARIDE') {
    return {
      sugar,
      reactionCondition: condition,
      formsSolubleBlueComplex: false,
      formsRedBrickPrecipitate: false,
      redPrecipitateMassGrams: 0,
      visualPhenomenonVI: 'Không có hiện tượng tan hay đổi màu dung dịch Cu(OH)₂ do phân tử polymer kích thước quá lớn không tạo phức chelate.',
      chemicalEquationVI: 'Không phản ứng',
      pedagogicalRationaleVI: 'Polysaccharide không có cấu trúc đa chức vicinal diol tự do tương thích trong dung dịch kiềm.'
    };
  }

  // Room temperature: Polyol reaction (All mono & disaccharides have multiple adjacent -OH groups)
  // Forms deep-blue soluble copper complex: [Cu(C6H11O6)2]
  if (condition === 'ROOM_TEMPERATURE') {
    return {
      sugar,
      reactionCondition: condition,
      formsSolubleBlueComplex: true,
      formsRedBrickPrecipitate: false,
      redPrecipitateMassGrams: 0,
      visualPhenomenonVI: 'Kết tủa xanh lam nhạt Cu(OH)₂ tan dần, tạo thành dung dịch phức đồng màu xanh lam thẫm (dung dịch xanh lam trong suốt).',
      chemicalEquationVI: `2 C₆H₁₂O₆ + Cu(OH)₂ → [Cu(C₆H₁₁O₆)₂] + 2 H₂O (Phức đồng-ancol đa chức)`,
      pedagogicalRationaleVI: 'Chứng minh cấu tạo phân tử chứa nhiều nhóm hiđroxyl (-OH) liền kề (ancol đa chức vicinal diol), tạo liên kết phối trí với ion Cu²⁺ tạo phức chelate 5 cạnh bền vững.'
    };
  }

  // Heating above 80°C:
  // If reducing sugar (glucose, fructose, maltose): Cu2+ reduced to red-brick Cu2O precipitate!
  // If non-reducing (sucrose): remains deep blue, no red brick precipitate!
  if (sugar.id === 'sucrose') {
    return {
      sugar,
      reactionCondition: condition,
      formsSolubleBlueComplex: true,
      formsRedBrickPrecipitate: false,
      redPrecipitateMassGrams: 0,
      visualPhenomenonVI: 'Dung dịch vẫn giữ nguyên màu xanh lam thẫm của phức đồng saccarat, KHÔNG xuất hiện kết tủa đỏ gạch do saccarozơ không có nhóm anđehit.',
      chemicalEquationVI: 'Không có phản ứng oxi hóa khử tạo Cu₂O',
      pedagogicalRationaleVI: 'Saccarozơ là đisaccarit không có tính khử vì cả hai nguyên tử C anomer đều bị khóa trong liên kết alpha-1,beta-2-glicosizơ.'
    };
  }

  // Reducing sugars: 1 mol sugar oxidizes and reduces 2 mol Cu(OH)2 -> 1 mol Cu2O (M = 143.09 g/mol)
  const molesSugar = massG / sugar.molarMass;
  const cu2oGrams = Math.round(molesSugar * 143.091 * 100) / 100;

  return {
    sugar,
    reactionCondition: condition,
    formsSolubleBlueComplex: false,
    formsRedBrickPrecipitate: true,
    redPrecipitateMassGrams: cu2oGrams,
    visualPhenomenonVI: `Dung dịch đổi màu từ xanh sang đục rồi xuất hiện kết tủa màu đỏ gạch Cu₂O lắng xuống đáy ống nghiệm (${cu2oGrams} g Cu₂O).`,
    chemicalEquationVI: 'CH₂OH[CHOH]₄CHO + 2 Cu(OH)₂ + NaOH (đun nóng) → CH₂OH[CHOH]₄COONa + Cu₂O↓ (đỏ gạch) + 3 H₂O',
    pedagogicalRationaleVI: 'Phản ứng đặc trưng chứng minh tính khử của nhóm -CHO: ion Cu²⁺ (màu xanh) bị khử thành hợp chất đồng(I) oxit Cu₂O không tan có màu đỏ gạch đặc trưng.'
  };
}

// ----------------------------------------------------------------------------
// 5. STARCH-IODINE INCLUSION HELIX
// ----------------------------------------------------------------------------
export function simulateStarchIodineColor(temperatureCelsius: number): StarchIodineInclusionResult {
  if (temperatureCelsius < 60) {
    return {
      temperatureCelsius,
      isHelixFormed: true,
      solutionColorHex: '#1e1b4b', // Deep indigo / blue-purple
      colorNameVI: 'Màu xanh tím đặc trưng (Deep Blue-Purple)',
      pedagogicalInsightVI: 'Các phân tử amilozơ cuộn thành chuỗi xoắn ốc rỗng. Các phân tử iot (I₂) chui vào bên trong đường hầm xoắn ốc này tạo thành hợp chất bao (inclusion complex), gây hấp thụ ánh sáng ở bước sóng nhìn thấy làm dung dịch có màu xanh tím.'
    };
  } else {
    return {
      temperatureCelsius,
      isHelixFormed: false,
      solutionColorHex: '#cbd5e1', // Colorless / faint amber
      colorNameVI: 'Mất màu xanh tím (Dung dịch trong suốt hoặc vàng rơm rất nhạt)',
      pedagogicalInsightVI: 'Khi đun nóng (> 60-70°C), chuyển động nhiệt làm đứt gãy các liên kết hiđro giữ cấu trúc xoắn ốc của amilozơ, làm phân tử duỗi thẳng ra và các phân tử I₂ thoát ra ngoài, làm mất màu xanh tím. Khi để nguội, cấu trúc xoắn ốc tái lập và màu xanh tím xuất hiện trở lại!'
    };
  }
}

// ----------------------------------------------------------------------------
// 6. SUCROSE INVERSION (ĐƯỜNG NGHỊCH ĐẢO)
// ----------------------------------------------------------------------------
export function calculateSucroseInversion(params: {
  sucroseMassGrams: number;
  conversionPercent: number; // 0 to 100
}): SucroseInversionResult {
  const mSucrose = params.sucroseMassGrams;
  const conv = Math.min(100, Math.max(0, params.conversionPercent));

  // C12H22O11 (342.3 g/mol) + H2O (18 g/mol) -> C6H12O6 (glucose 180.16 g/mol) + C6H12O6 (fructose 180.16 g/mol)
  const molesReacted = (mSucrose / 342.30) * (conv / 100);
  const glucoseG = Math.round(molesReacted * 180.156 * 100) / 100;
  const fructoseG = Math.round(molesReacted * 180.156 * 100) / 100;

  // Specific rotation:
  // Pure sucrose = +66.5°
  // Hydrolyzed mixture: Glucose (+52.7°) + Fructose (-92.4°) => Average = (+52.7 - 92.4)/2 = -19.85°
  const unreactedFraction = 1 - (conv / 100);
  const reactedFraction = conv / 100;
  const currentRotation = Math.round((unreactedFraction * (+66.5) + reactedFraction * (-19.85)) * 10) / 10;

  const isComplete = conv >= 99.0;
  const explanationVI = `Thủy phân saccarozơ với xúc tác axit vô cơ hoặc enzym invertase phá vỡ liên kết glicosizơ tạo hỗn hợp đồng số mol glucozơ và fructozơ. Góc quay cực của dung dịch biến đổi từ hữu triền (+66.5°) sang tả triền (-19.9°) do độ quay của fructozơ (-92.4°) mạnh hơn glucozơ (+52.7°). Hiện tượng đảo chiều quay cực này được gọi là sự nghịch đảo đường (invert sugar). Hỗn hợp đường nghịch đảo ngọt hơn saccarozơ và không bị lại đường (kết tinh).`;

  return {
    initialSucroseMassGrams: mSucrose,
    initialOpticalRotationDegrees: +66.5,
    hydrolysisConversionPercent: conv,
    glucoseYieldGrams: glucoseG,
    fructoseYieldGrams: fructoseG,
    currentOpticalRotationDegrees: currentRotation,
    isInversionComplete: isComplete,
    explanationVI
  };
}

// ----------------------------------------------------------------------------
// 7. CELLULOSE TRINITRATE (THUỐC SÚNG KHÔNG KHÓI)
// ----------------------------------------------------------------------------
export function calculateCelluloseNitration(params: {
  celluloseMassGrams: number;
}): CelluloseNitrationResult {
  const mCellulose = params.celluloseMassGrams;
  if (mCellulose <= 0) {
    throw new Error('Khối lượng xenlulozơ phải lớn hơn 0.');
  }

  // [C6H7O2(OH)3]n (M = 162.14 g/mol) + 3n HNO3 -> [C6H7O2(ONO2)3]n (M = 297.14 g/mol) + 3n H2O
  const molesMonomer = mCellulose / 162.14;
  const molesHNO3 = molesMonomer * 3;
  const theoreticalTrinitrateG = Math.round(molesMonomer * 297.14 * 100) / 100;

  // % N in C6H7O2(ONO2)3 = (3 * 14.0067) / 297.14 = 14.14% N
  const nitrogenPct = 14.14;

  return {
    celluloseMassGrams: mCellulose,
    nitricAcidMolesNeeded: Math.round(molesHNO3 * 10000) / 10000,
    theoreticalCelluloseTrinitrateGrams: theoreticalTrinitrateG,
    nitrogenMassPercent: nitrogenPct,
    combustionPhenomenonVI: 'Xenlulozơ trinitrat cháy cực nhanh, tạo lượng khí khổng lồ (CO, CO₂, N₂, H₂O), không sinh khói hay muội than, tỏa nhiệt lượng cực mạnh.',
    militaryAndIndustrialApplicationVI: 'Chế tạo thuốc súng không khói (guncotton) dùng trong đạn pháo quân sự, ngòi nổ và màng phim nhựa dễ cháy thời kỳ đầu.'
  };
}
