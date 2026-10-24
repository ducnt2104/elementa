// src/domain/surfacePlasmonEngine.ts
// Milestone 55: Surface Plasmon Resonance (SPR), Kretschmann Configuration & Biomolecular Binding Kinetics Engine
// Standards: Otto Scherzer, Erich Kretschmann & Heinz Raether (1968 - Kretschmann Prism Coupling) & Biacore / GE Healthcare SPR Standards
// Curriculum: Vietnam GDPT 2018 (Vật lý 11: Hiện tượng phản xạ toàn phần & Góc tới hạn; Hóa học 10: Tốc độ phản ứng & Hằng số tốc độ; Hóa học 12: Tương tác kháng thể - kháng nguyên & Y sinh trúng đích)

export interface SprInteractionPair {
  id: string;
  name: string;
  nameVI: string;
  ligandImmobilized: string;
  ligandVI: string;
  analyteInSolution: string;
  analyteVI: string;
  molecularWeightAnalyteDa: number; // Dalton
  associationRateKon: number; // k_on (M⁻¹ · s⁻¹)
  dissociationRateKoff: number; // k_off (s⁻¹)
  equilibriumKdMolar: number; // K_D = k_off / k_on (M)
  rMaxResponseUnits: number; // R_max (RU)
  recommendedConcentrationNanomolar: number; // nM
  biomedicalApplicationVI: string;
  descriptionVI: string;
  colorHex: string;
}

export interface SprReflectivityPoint {
  incidentAngleDeg: number;
  reflectivityFraction: number; // 0 to 1
  phaseDegrees: number;
}

export interface SensorgramTimePoint {
  timeSeconds: number;
  responseUnits: number; // RU (1 RU ≈ 1 pg/mm² of bound protein)
  phase: 'baseline' | 'association' | 'dissociation' | 'regeneration';
  fractionBound: number;
}

export interface SprSimulationResult {
  interaction: SprInteractionPair;
  analyteConcentrationNanomolar: number;
  temperatureCelsius: number;
  prismRefractiveIndex: number;
  bufferRefractiveIndex: number;
  criticalTirAngleDeg: number;
  resonanceAngleBaselineDeg: number;
  resonanceAngleBoundDeg: number;
  resonanceAngleShiftMillidegrees: number; // mDeg
  equilibriumKdNanomolar: number;
  associationTimeSeconds: number;
  dissociationTimeSeconds: number;
  reflectivityCurveBaseline: SprReflectivityPoint[];
  reflectivityCurveBound: SprReflectivityPoint[];
  sensorgram: SensorgramTimePoint[];
  pedagogicalAnalysisVI: string;
}

// ============================================================================
// SPR INTERACTION STANDARDS CATALOG
// ============================================================================
export const SPR_INTERACTIONS_CATALOG: Record<string, SprInteractionPair> = {
  antibody_sars_cov2_spike: {
    id: 'antibody_sars_cov2_spike',
    name: 'Neutralizing mAb vs SARS-CoV-2 RBD Spike',
    nameVI: 'Kháng Thể Đơn Dòng Trung Hòa vs Gai Protein SARS-CoV-2 (RBD)',
    ligandImmobilized: 'SARS-CoV-2 Receptor Binding Domain (RBD)',
    ligandVI: 'Miền gắn thụ thể RBD của virus SARS-CoV-2 gắn cố định trên chip vàng',
    analyteInSolution: 'Monoclonal Neutralizing IgG Antibody',
    analyteVI: 'Kháng thể đơn dòng trung hòa IgG (150 kDa)',
    molecularWeightAnalyteDa: 150000,
    associationRateKon: 1.8e5, // 1.8 × 10⁵ M⁻¹ s⁻¹
    dissociationRateKoff: 2.2e-4, // 2.2 × 10⁻⁴ s⁻¹ (Rất chậm, bám cực bền)
    equilibriumKdMolar: 1.22e-9, // K_D = 1.22 nM (Ái lực picomolar/nanomolar cao)
    rMaxResponseUnits: 450,
    recommendedConcentrationNanomolar: 20,
    biomedicalApplicationVI: 'Sàng lọc thuốc kháng thể đơn dòng và đánh giá hiệu lực vaccine mRNA thế hệ mới.',
    descriptionVI: 'Tương tác kháng thể - kháng nguyên kinh điển với tốc độ phân ly siêu chậm (k_off = 2.2×10⁻⁴ s⁻¹), phản ánh khả năng trung hòa virus lâu dài trong máu bệnh nhân.',
    colorHex: '#38bdf8'
  },

  herceptin_her2_receptor: {
    id: 'herceptin_her2_receptor',
    name: 'Trastuzumab (Herceptin) vs HER2 Oncoprotein',
    nameVI: 'Thuốc Trúng Đích Trastuzumab (Herceptin) vs Thụ Thể Ung Thư HER2',
    ligandImmobilized: 'Recombinant Human HER2 Extracellular Domain',
    ligandVI: 'Vùng ngoại bào của thụ thể HER2/neu (110 kDa) trên chip CM5',
    analyteInSolution: 'Trastuzumab (Herceptin mAb)',
    analyteVI: 'Kháng thể nhân hóa Trastuzumab đặc trị ung thư vú di căn',
    molecularWeightAnalyteDa: 148000,
    associationRateKon: 2.5e5, // 2.5 × 10⁵ M⁻¹ s⁻¹
    dissociationRateKoff: 1.25e-4, // 1.25 × 10⁻⁴ s⁻¹
    equilibriumKdMolar: 5.0e-10, // K_D = 0.5 nM (500 pM)
    rMaxResponseUnits: 620,
    recommendedConcentrationNanomolar: 10,
    biomedicalApplicationVI: 'Liệu pháp điều trị trúng đích ung thư vú và ung thư dạ dày dương tính với HER2.',
    descriptionVI: 'Được FDA phê chuẩn điều trị trúng đích. Ái lực siêu cao K_D = 0.5 nM ngăn chặn hoàn toàn con đường tín hiệu tăng sinh tế bào ác tính MAPK/PI3K.',
    colorHex: '#ec4899'
  },

  biotin_streptavidin_benchmark: {
    id: 'biotin_streptavidin_benchmark',
    name: 'Streptavidin - Biotin Non-Covalent Ultra-Affinity',
    nameVI: 'Phức Hệ Streptavidin - Biotin (Liên Kết Phi Cộng Hóa Trị Mạnh Nhất)',
    ligandImmobilized: 'Tetrameric Streptavidin',
    ligandVI: 'Protein Streptavidin phủ dày trên màng dextran nền chip vàng',
    analyteInSolution: 'D-Biotin (Vitamin B7 / H)',
    analyteVI: 'Phân tử nhỏ Biotin (244.3 Da)',
    molecularWeightAnalyteDa: 244.3,
    associationRateKon: 7.5e6, // 7.5 × 10⁶ M⁻¹ s⁻¹
    dissociationRateKoff: 3.0e-7, // 3.0 × 10⁻⁷ s⁻¹ (Thời gian bán phân ly > 26 ngày!)
    equilibriumKdMolar: 4.0e-14, // K_D = 40 fM (Femtomolar kỷ lục)
    rMaxResponseUnits: 85,
    recommendedConcentrationNanomolar: 50,
    biomedicalApplicationVI: 'Chuẩn định lượng nano công nghệ sinh học và hệ thống tinh chế gắn thẻ sinh học.',
    descriptionVI: 'Cặp tương tác phi cộng hóa trị bền vững nhất từng được biết trong tự nhiên (K_D ~ 10⁻¹⁴ M), với 8 liên kết hydro và tương tác kỵ nước hoàn hảo.',
    colorHex: '#eab308'
  },

  small_molecule_aspirin_cox2: {
    id: 'small_molecule_aspirin_cox2',
    name: 'Small-Molecule Drug vs Cyclooxygenase-2 (COX-2)',
    nameVI: 'Thuốc Kháng Viêm Phân Tử Nhỏ vs Enzyme Cyclooxygenase (COX-2)',
    ligandImmobilized: 'Recombinant Human COX-2 Dimer',
    ligandVI: 'Enzyme tiền viêm COX-2 gắn trên bề mặt hạt nano vàng',
    analyteInSolution: 'NSAID Small-Molecule Inhibitor',
    analyteVI: 'Chất ức chế chọn lọc COX-2 (Celecoxib / Aspirin ~ 380 Da)',
    molecularWeightAnalyteDa: 381.4,
    associationRateKon: 4.2e4, // 4.2 × 10⁴ M⁻¹ s⁻¹
    dissociationRateKoff: 8.4e-2, // 8.4 × 10⁻² s⁻¹ (Phân ly nhanh, đảo ngược được)
    equilibriumKdMolar: 2.0e-6, // K_D = 2.0 μM
    rMaxResponseUnits: 65,
    recommendedConcentrationNanomolar: 2500,
    biomedicalApplicationVI: 'Dược lý học phát triển thuốc giảm đau kháng viêm thế hệ mới không hại dạ dày.',
    descriptionVI: 'Tương tác thuận nghịch phân tử nhỏ: tín hiệu RU khiêm tốn do trọng lượng phân tử thấp (381 Da), đòi hỏi độ nhạy góc SPR cao để đo hằng số phân ly nhanh.',
    colorHex: '#10b981'
  }
};

// ============================================================================
// SPR REFLECTIVITY & LANGMUIR KINETICS EQUATIONS
// ============================================================================

/**
 * Calculates Critical Angle of Total Internal Reflection (TIR):
 * θ_crit = arcsin(n_sample / n_prism)
 */
export function calculateCriticalTirAngleDeg(
  nPrism: number = 1.517, // BK7 Glass
  nBuffer: number = 1.333 // Aqueous buffer
): number {
  const sinCrit = nBuffer / nPrism;
  const rad = Math.asin(Math.min(1.0, sinCrit));
  return Number(((rad * 180) / Math.PI).toFixed(2));
}

/**
 * Calculates Surface Plasmon Resonance Angle θ_SPR (Kretschmann formula approximation):
 * sin(θ_SPR) = (1 / n_prism) * sqrt( (ε_metal_real * n_eff^2) / (ε_metal_real + n_eff^2) )
 * With typical gold film at 670 nm (ε_Au ≈ -12.5), θ_SPR lies ~2-4° above critical TIR angle.
 */
export function calculateSprResonanceAngleDeg(
  nPrism: number = 1.517,
  nSampleEffective: number = 1.333
): number {
  const epsGoldReal = -12.5; // Real permittivity of gold at 670 nm
  const n2 = nSampleEffective * nSampleEffective;
  const val = (epsGoldReal * n2) / (epsGoldReal + n2);
  const sinSpr = (1 / nPrism) * Math.sqrt(Math.max(0, val));
  const rad = Math.asin(Math.min(0.999, sinSpr));
  return Number(((rad * 180) / Math.PI).toFixed(3));
}

/**
 * Generates reflectance vs incident angle curve R(θ) with deep resonance dip
 */
export function generateSprReflectivityCurve(
  nPrism: number,
  nBuffer: number,
  addedDeltaN: number = 0
): SprReflectivityPoint[] {
  const critDeg = calculateCriticalTirAngleDeg(nPrism, nBuffer);
  const sprDeg = calculateSprResonanceAngleDeg(nPrism, nBuffer + addedDeltaN);

  const startAngle = critDeg - 2.5;
  const endAngle = sprDeg + 4.0;
  const numPoints = 120;
  const step = (endAngle - startAngle) / (numPoints - 1);

  const curve: SprReflectivityPoint[] = [];

  for (let i = 0; i < numPoints; i++) {
    const angle = startAngle + i * step;
    let r = 0;

    if (angle < critDeg) {
      // Below critical angle: standard Fresnel transmission + partial reflection
      const diff = critDeg - angle;
      r = 0.15 + 0.70 * Math.exp(-diff * 1.5);
    } else {
      // Total internal reflection regime with sharp Lorentzian plasmon absorption dip
      const dTheta = angle - sprDeg;
      const fwhm = 0.85; // Natural resonance angular width (deg)
      const dipDepth = 0.96; // 96% light absorbed into plasmons at resonance minimum
      const lorentzian = 1.0 - dipDepth / (1.0 + Math.pow(dTheta / (fwhm / 2), 2));
      r = lorentzian;
    }

    curve.push({
      incidentAngleDeg: Number(angle.toFixed(3)),
      reflectivityFraction: Number(Math.max(0.01, Math.min(1.0, r)).toFixed(4)),
      phaseDegrees: Number((angle * 12.0).toFixed(1))
    });
  }

  return curve;
}

/**
 * Simulates complete real-time SPR sensorgram (Langmuir 1:1 binding kinetics)
 */
export function simulateSprKinetics(
  interactionId: string,
  analyteConcentrationNanomolar: number = 20,
  temperatureCelsius: number = 25.0
): SprSimulationResult {
  const interaction = SPR_INTERACTIONS_CATALOG[interactionId] || SPR_INTERACTIONS_CATALOG.antibody_sars_cov2_spike;

  const nPrism = 1.517; // BK7 Glass
  const nBuffer = 1.333; // Phosphate Buffered Saline (PBS)

  const critAngleDeg = calculateCriticalTirAngleDeg(nPrism, nBuffer);
  const baselineSprAngleDeg = calculateSprResonanceAngleDeg(nPrism, nBuffer);

  const k_on = interaction.associationRateKon;
  const k_off = interaction.dissociationRateKoff;
  const C_molar = analyteConcentrationNanomolar * 1e-9;
  const R_max = interaction.rMaxResponseUnits;

  // Temperature adjustment on kinetics (Arrhenius Q10 ~ 1.5)
  const tempFactor = Math.pow(1.5, (temperatureCelsius - 25.0) / 10.0);
  const adjKon = k_on * tempFactor;
  const adjKoff = k_off * tempFactor;
  const K_D_molar = adjKoff / adjKon;
  const equilibriumKdNanomolar = Number((K_D_molar * 1e9).toFixed(3));

  // Equilibrium response at given concentration
  const R_eq = (C_molar / (C_molar + K_D_molar)) * R_max;

  // Sensorgram time phases:
  // 0 - 30s: Baseline buffer flow
  // 30 - 150s: Association (Analyte injection)
  // 150 - 300s: Dissociation (Running buffer wash)
  // 300 - 330s: Regeneration & return to baseline
  const sensorgram: SensorgramTimePoint[] = [];
  const tBaseline = 30;
  const tAssoc = 120; // 30s to 150s
  const tDissoc = 150; // 150s to 300s
  const totalTime = 320;

  let rAtDissocStart = 0;

  for (let t = 0; t <= totalTime; t += 2) {
    let ru = 0;
    let phase: SensorgramTimePoint['phase'] = 'baseline';

    if (t < tBaseline) {
      // Baseline
      phase = 'baseline';
      ru = 0.0 + (Math.sin(t * 0.5) * 0.3); // slight baseline drift
    } else if (t < tBaseline + tAssoc) {
      // Association Phase: R(t) = R_eq * (1 - exp(-(k_on*C + k_off)*t))
      phase = 'association';
      const dt = t - tBaseline;
      const k_obs = adjKon * C_molar + adjKoff;
      ru = R_eq * (1.0 - Math.exp(-k_obs * dt));
      rAtDissocStart = ru;
    } else if (t < tBaseline + tAssoc + tDissoc) {
      // Dissociation Phase: R(t) = R_dissoc * exp(-k_off * dt)
      phase = 'dissociation';
      const dt = t - (tBaseline + tAssoc);
      ru = rAtDissocStart * Math.exp(-adjKoff * dt);
    } else {
      // Regeneration
      phase = 'regeneration';
      const dt = t - (tBaseline + tAssoc + tDissoc);
      ru = Math.max(0, 8.0 * (1.0 - dt / 20.0));
    }

    sensorgram.push({
      timeSeconds: t,
      responseUnits: Number(ru.toFixed(2)),
      phase,
      fractionBound: Number((ru / R_max).toFixed(3))
    });
  }

  // Refractive index change and resonance angle shift:
  // 1000 RU ≈ 0.001 RIU ≈ 0.10° (100 mDeg)
  const maxSensorRu = Math.max(...sensorgram.map((s) => s.responseUnits));
  const deltaN = (maxSensorRu / 1000.0) * 0.001;
  const boundSprAngleDeg = calculateSprResonanceAngleDeg(nPrism, nBuffer + deltaN);
  const resonanceAngleShiftMillidegrees = Number(((boundSprAngleDeg - baselineSprAngleDeg) * 1000).toFixed(1));

  // Reflectivity curves (before vs after binding)
  const reflectivityCurveBaseline = generateSprReflectivityCurve(nPrism, nBuffer, 0);
  const reflectivityCurveBound = generateSprReflectivityCurve(nPrism, nBuffer, deltaN);

  const pedagogicalAnalysisVI = `Quang phổ cộng hưởng plasmon bề mặt (SPR) cấu hình lăng kính Kretschmann phân tích tương tác ${interaction.nameVI}. Sóng điện từ chiếu vào đáy lăng kính BK7 (n = ${nPrism}) bị phản xạ toàn phần (TIR) tại góc tới hạn θ_c = ${critAngleDeg}°, tạo ra sóng tắt dần (Evanescent wave) thâm nhập ~200 nm vào lớp dung dịch đệm. Tại góc cộng hưởng plasmon θ_SPR = ${baselineSprAngleDeg}°, xung lượng photon đồng pha hoàn toàn với dao động tập thể của đám mây electron tự do trên màng vàng 50 nm, khiến toàn bộ ánh sáng bị hấp thụ thành plasmon (độ phản xạ R rớt về 0). Khi kháng thể ${interaction.analyteVI} nồng độ ${analyteConcentrationNanomolar} nM gắn đặc hiệu vào phối tử ${interaction.ligandVI}, chiết suất cục bộ tăng thêm Δn = ${deltaN.toFixed(5)}, làm góc cộng hưởng dịch chuyển +${resonanceAngleShiftMillidegrees} mDeg. Đồ thị cảm biến thời gian thực (Sensorgram) cho phép giải chính xác hằng số tốc độ gắn kết k_on = ${adjKon.toExponential(2)} M⁻¹s⁻¹ và tốc độ phân ly k_off = ${adjKoff.toExponential(2)} s⁻¹, xác định hằng số ái lực nhiệt động K_D = ${equilibriumKdNanomolar} nM mà không cần đánh dấu huỳnh quang hay phóng xạ.`;

  return {
    interaction,
    analyteConcentrationNanomolar,
    temperatureCelsius,
    prismRefractiveIndex: nPrism,
    bufferRefractiveIndex: nBuffer,
    criticalTirAngleDeg: critAngleDeg,
    resonanceAngleBaselineDeg: baselineSprAngleDeg,
    resonanceAngleBoundDeg: boundSprAngleDeg,
    resonanceAngleShiftMillidegrees,
    equilibriumKdNanomolar,
    associationTimeSeconds: tAssoc,
    dissociationTimeSeconds: tDissoc,
    reflectivityCurveBaseline,
    reflectivityCurveBound,
    sensorgram,
    pedagogicalAnalysisVI
  };
}

/**
 * Card matching service: identifies if an ELEMENTA card corresponds to an SPR standard
 */
export function getMatchingSprCard(card: { id?: string; name?: string; description?: string }): SprInteractionPair | null {
  if (!card) return null;
  const text = `${card.id || ''} ${card.name || ''} ${card.description || ''}`.toLowerCase();

  if (text.includes('sars') || text.includes('spike') || text.includes('covid') || text.includes('kháng thể')) {
    return SPR_INTERACTIONS_CATALOG.antibody_sars_cov2_spike;
  }
  if (text.includes('herceptin') || text.includes('her2') || text.includes('ung thư') || text.includes('trúng đích')) {
    return SPR_INTERACTIONS_CATALOG.herceptin_her2_receptor;
  }
  if (text.includes('biotin') || text.includes('streptavidin') || text.includes('ái lực') || text.includes('vitamin b7')) {
    return SPR_INTERACTIONS_CATALOG.biotin_streptavidin_benchmark;
  }
  if (text.includes('aspirin') || text.includes('cox2') || text.includes('enzyme') || text.includes('kháng viêm')) {
    return SPR_INTERACTIONS_CATALOG.small_molecule_aspirin_cox2;
  }

  return null;
}
