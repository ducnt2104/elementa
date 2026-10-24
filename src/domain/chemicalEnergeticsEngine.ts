// src/domain/chemicalEnergeticsEngine.ts
/**
 * ELEMENTA — Chemical Energetics, Enthalpy of Formation & Hess's Law Domain Engine
 * Conforms strictly to GDPT 2018 Chemistry Grade 10 (Chủ đề 5: Năng lượng hóa học) & IUPAC Standards.
 * 
 * Standards:
 * - Standard state: T = 298 K (25°C), P = 1 bar (10^5 Pa) (GDPT 2018 / IUPAC Gold Book).
 * - Standard enthalpy of formation (Δf H°298) of elements in their most stable reference state ≡ 0 kJ/mol.
 * - Enthalpy of reaction from formation enthalpies: Δr H°298 = Σ(products) - Σ(reactants).
 * - Enthalpy of reaction from bond dissociation energies: Δr H°298 = Σ(Eb reactants) - Σ(Eb products).
 * - Hess's Law: Path-independent state function linearity.
 * - Calorimetry: q = mcΔT and thermal temperature shifts.
 */

export interface SubstanceEnthalpyData {
  formula: string;
  nameVi: string;
  nameIupac: string;
  state: '(g)' | '(l)' | '(s)' | '(aq)';
  deltaHf298KjMol: number;
  isStandardReferenceElement: boolean;
  molarMassGmol: number;
}

export const SUBSTANCE_ENTHALPY_CATALOG: Record<string, SubstanceEnthalpyData> = {
  // Elements in stable reference state (Δf H° ≡ 0)
  'O2(g)': { formula: 'O2', nameVi: 'Khí oxi', nameIupac: 'Oxygen gas', state: '(g)', deltaHf298KjMol: 0.0, isStandardReferenceElement: true, molarMassGmol: 32.0 },
  'N2(g)': { formula: 'N2', nameVi: 'Khí nitơ', nameIupac: 'Nitrogen gas', state: '(g)', deltaHf298KjMol: 0.0, isStandardReferenceElement: true, molarMassGmol: 28.02 },
  'H2(g)': { formula: 'H2', nameVi: 'Khí hiđro', nameIupac: 'Hydrogen gas', state: '(g)', deltaHf298KjMol: 0.0, isStandardReferenceElement: true, molarMassGmol: 2.02 },
  'C(graphite)': { formula: 'C', nameVi: 'Cacbon graphit', nameIupac: 'Carbon (graphite)', state: '(s)', deltaHf298KjMol: 0.0, isStandardReferenceElement: true, molarMassGmol: 12.01 },
  'Fe(s)': { formula: 'Fe', nameVi: 'Sắt kim loại', nameIupac: 'Iron metal', state: '(s)', deltaHf298KjMol: 0.0, isStandardReferenceElement: true, molarMassGmol: 55.85 },
  'Al(s)': { formula: 'Al', nameVi: 'Nhôm kim loại', nameIupac: 'Aluminium metal', state: '(s)', deltaHf298KjMol: 0.0, isStandardReferenceElement: true, molarMassGmol: 26.98 },
  'Cu(s)': { formula: 'Cu', nameVi: 'Đồng kim loại', nameIupac: 'Copper metal', state: '(s)', deltaHf298KjMol: 0.0, isStandardReferenceElement: true, molarMassGmol: 63.55 },
  'Cl2(g)': { formula: 'Cl2', nameVi: 'Khí clo', nameIupac: 'Chlorine gas', state: '(g)', deltaHf298KjMol: 0.0, isStandardReferenceElement: true, molarMassGmol: 70.9 },
  'Br2(l)': { formula: 'Br2', nameVi: 'Brom lỏng', nameIupac: 'Bromine liquid', state: '(l)', deltaHf298KjMol: 0.0, isStandardReferenceElement: true, molarMassGmol: 159.8 },
  'I2(s)': { formula: 'I2', nameVi: 'Iot tinh thể', nameIupac: 'Iodine solid', state: '(s)', deltaHf298KjMol: 0.0, isStandardReferenceElement: true, molarMassGmol: 253.8 },

  // Non-reference allotropes
  'C(diamond)': { formula: 'C', nameVi: 'Kim cương', nameIupac: 'Carbon (diamond)', state: '(s)', deltaHf298KjMol: 1.9, isStandardReferenceElement: false, molarMassGmol: 12.01 },
  'O3(g)': { formula: 'O3', nameVi: 'Khí ozon', nameIupac: 'Ozone gas', state: '(g)', deltaHf298KjMol: 142.7, isStandardReferenceElement: false, molarMassGmol: 48.0 },
  'Br2(g)': { formula: 'Br2', nameVi: 'Khí brom', nameIupac: 'Bromine vapor', state: '(g)', deltaHf298KjMol: 30.9, isStandardReferenceElement: false, molarMassGmol: 159.8 },

  // Inorganic compounds
  'CO2(g)': { formula: 'CO2', nameVi: 'Khí cacbonic', nameIupac: 'Carbon dioxide', state: '(g)', deltaHf298KjMol: -393.5, isStandardReferenceElement: false, molarMassGmol: 44.01 },
  'CO(g)': { formula: 'CO', nameVi: 'Khí cacbon oxit', nameIupac: 'Carbon monoxide', state: '(g)', deltaHf298KjMol: -110.5, isStandardReferenceElement: false, molarMassGmol: 28.01 },
  'H2O(l)': { formula: 'H2O', nameVi: 'Nước lỏng', nameIupac: 'Liquid water', state: '(l)', deltaHf298KjMol: -285.8, isStandardReferenceElement: false, molarMassGmol: 18.02 },
  'H2O(g)': { formula: 'H2O', nameVi: 'Hơi nước', nameIupac: 'Water vapor', state: '(g)', deltaHf298KjMol: -241.8, isStandardReferenceElement: false, molarMassGmol: 18.02 },
  'NH3(g)': { formula: 'NH3', nameVi: 'Amoniac', nameIupac: 'Ammonia', state: '(g)', deltaHf298KjMol: -45.9, isStandardReferenceElement: false, molarMassGmol: 17.03 },
  'NO(g)': { formula: 'NO', nameVi: 'Nitơ monoxit', nameIupac: 'Nitric oxide', state: '(g)', deltaHf298KjMol: 90.3, isStandardReferenceElement: false, molarMassGmol: 30.01 },
  'NO2(g)': { formula: 'NO2', nameVi: 'Nitơ đioxit', nameIupac: 'Nitrogen dioxide', state: '(g)', deltaHf298KjMol: 33.2, isStandardReferenceElement: false, molarMassGmol: 46.01 },
  'SO2(g)': { formula: 'SO2', nameVi: 'Lưu huỳnh đioxit', nameIupac: 'Sulfur dioxide', state: '(g)', deltaHf298KjMol: -296.8, isStandardReferenceElement: false, molarMassGmol: 64.07 },
  'SO3(g)': { formula: 'SO3', nameVi: 'Lưu huỳnh trioxit', nameIupac: 'Sulfur trioxide', state: '(g)', deltaHf298KjMol: -395.7, isStandardReferenceElement: false, molarMassGmol: 80.07 },
  'CaO(s)': { formula: 'CaO', nameVi: 'Vôi sống', nameIupac: 'Calcium oxide', state: '(s)', deltaHf298KjMol: -635.1, isStandardReferenceElement: false, molarMassGmol: 56.08 },
  'CaCO3(s)': { formula: 'CaCO3', nameVi: 'Đá vôi', nameIupac: 'Calcium carbonate', state: '(s)', deltaHf298KjMol: -1206.9, isStandardReferenceElement: false, molarMassGmol: 100.09 },
  'Fe2O3(s)': { formula: 'Fe2O3', nameVi: 'Sắt(III) oxit (Gỉ sắt)', nameIupac: 'Iron(III) oxide', state: '(s)', deltaHf298KjMol: -824.2, isStandardReferenceElement: false, molarMassGmol: 159.69 },
  'Al2O3(s)': { formula: 'Al2O3', nameVi: 'Nhôm oxit', nameIupac: 'Aluminium oxide', state: '(s)', deltaHf298KjMol: -1675.7, isStandardReferenceElement: false, molarMassGmol: 101.96 },
  'HCl(g)': { formula: 'HCl', nameVi: 'Hiđro clorua', nameIupac: 'Hydrogen chloride', state: '(g)', deltaHf298KjMol: -92.3, isStandardReferenceElement: false, molarMassGmol: 36.46 },

  // Organic compounds
  'CH4(g)': { formula: 'CH4', nameVi: 'Khí metan', nameIupac: 'Methane', state: '(g)', deltaHf298KjMol: -74.8, isStandardReferenceElement: false, molarMassGmol: 16.04 },
  'C2H6(g)': { formula: 'C2H6', nameVi: 'Khí etan', nameIupac: 'Ethane', state: '(g)', deltaHf298KjMol: -84.7, isStandardReferenceElement: false, molarMassGmol: 30.07 },
  'C2H4(g)': { formula: 'C2H4', nameVi: 'Khí etilen', nameIupac: 'Ethene', state: '(g)', deltaHf298KjMol: 52.4, isStandardReferenceElement: false, molarMassGmol: 28.05 },
  'C2H2(g)': { formula: 'C2H2', nameVi: 'Khí axetilen', nameIupac: 'Ethyne', state: '(g)', deltaHf298KjMol: 227.4, isStandardReferenceElement: false, molarMassGmol: 26.04 },
  'C3H8(g)': { formula: 'C3H8', nameVi: 'Khí propan', nameIupac: 'Propane', state: '(g)', deltaHf298KjMol: -103.8, isStandardReferenceElement: false, molarMassGmol: 44.1 },
  'C4H10(g)': { formula: 'C4H10', nameVi: 'Khí butan', nameIupac: 'Butane', state: '(g)', deltaHf298KjMol: -125.6, isStandardReferenceElement: false, molarMassGmol: 58.12 },
  'C2H5OH(l)': { formula: 'C2H5OH', nameVi: 'Rượu etylic (Etanol)', nameIupac: 'Ethanol', state: '(l)', deltaHf298KjMol: -277.7, isStandardReferenceElement: false, molarMassGmol: 46.07 }
};

export const BOND_ENERGY_CATALOG: Record<string, { bond: string; energyKjMol: number; descriptionVi: string }> = {
  'H-H': { bond: 'H-H', energyKjMol: 436, descriptionVi: 'Liên kết cộng hóa trị đơn trong phân tử H2' },
  'C-H': { bond: 'C-H', energyKjMol: 413, descriptionVi: 'Liên kết C-H trong ankan' },
  'C-C': { bond: 'C-C', energyKjMol: 347, descriptionVi: 'Liên kết đơn C-C' },
  'C=C': { bond: 'C=C', energyKjMol: 614, descriptionVi: 'Liên kết đôi C=C (1 sigma + 1 pi)' },
  'C≡C': { bond: 'C≡C', energyKjMol: 839, descriptionVi: 'Liên kết ba C≡C (1 sigma + 2 pi)' },
  'O=O': { bond: 'O=O', energyKjMol: 498, descriptionVi: 'Liên kết đôi trong phân tử oxi O2' },
  'N≡N': { bond: 'N≡N', energyKjMol: 946, descriptionVi: 'Liên kết ba cực bền trong phân tử nitơ N2' },
  'C=O': { bond: 'C=O', energyKjMol: 799, descriptionVi: 'Liên kết đôi C=O trong carbonyl' },
  'C=O_in_CO2': { bond: 'C=O (trong CO2)', energyKjMol: 803, descriptionVi: 'Liên kết C=O thẳng hàng trong CO2' },
  'O-H': { bond: 'O-H', energyKjMol: 464, descriptionVi: 'Liên kết O-H trong nước và ancol' },
  'N-H': { bond: 'N-H', energyKjMol: 391, descriptionVi: 'Liên kết N-H trong amoniac' },
  'Cl-Cl': { bond: 'Cl-Cl', energyKjMol: 243, descriptionVi: 'Liên kết Cl-Cl trong khí clo' },
  'H-Cl': { bond: 'H-Cl', energyKjMol: 431, descriptionVi: 'Liên kết H-Cl trong hiđro clorua' },
  'C-Cl': { bond: 'C-Cl', energyKjMol: 339, descriptionVi: 'Liên kết C-Cl trong dẫn xuất halogen' }
};

export interface ReactionEnthalpyResult {
  reactionId: string;
  nameVi: string;
  equation: string;
  isExothermic: boolean;
  deltaRH298Kj: number;
  activationEnergyEaKj: number;
  reactantsEnergyKj: number;
  productsEnergyKj: number;
  transitionStateEnergyKj: number;
  thermodynamicNatureVi: string;
  calculationMethod: 'FORMATION_ENTHALPIES' | 'BOND_ENERGIES';
  stepByStepBreakdownVi: string;
  safetyOrRealWorldApplicationVi: string;
}

export function calculateEnthalpyFromFormation(
  reactants: { key: string; coeff: number }[],
  products: { key: string; coeff: number }[],
  reactionNameVi: string,
  equation: string,
  activationEnergyEaKj: number = 50.0,
  safetyOrRealWorldApplicationVi: string = ''
): ReactionEnthalpyResult {
  let sumReactantsHf = 0;
  let sumProductsHf = 0;

  for (const r of reactants) {
    const sub = SUBSTANCE_ENTHALPY_CATALOG[r.key];
    if (!sub) throw new Error(`Substance not found: ${r.key}`);
    sumReactantsHf += r.coeff * sub.deltaHf298KjMol;
  }

  for (const p of products) {
    const sub = SUBSTANCE_ENTHALPY_CATALOG[p.key];
    if (!sub) throw new Error(`Substance not found: ${p.key}`);
    sumProductsHf += p.coeff * sub.deltaHf298KjMol;
  }

  const deltaRH = parseFloat((sumProductsHf - sumReactantsHf).toFixed(2));
  const isExo = deltaRH < 0;

  // Energy profile baseline: reactants = 0 kJ relative baseline
  const reactantsE = 0;
  const productsE = deltaRH;
  const transitionStateE = Math.max(reactantsE, productsE) + activationEnergyEaKj;

  const breakdown = `Δr H°298 = Σ(sp) - Σ(cđ) = [${products.map(p => `${p.coeff} * (${SUBSTANCE_ENTHALPY_CATALOG[p.key].deltaHf298KjMol})`).join(' + ')}] - [${reactants.map(r => `${r.coeff} * (${SUBSTANCE_ENTHALPY_CATALOG[r.key].deltaHf298KjMol})`).join(' + ')}] = ${deltaRH} kJ`;

  return {
    reactionId: reactionNameVi.toLowerCase().replace(/\s+/g, '-'),
    nameVi: reactionNameVi,
    equation,
    isExothermic: isExo,
    deltaRH298Kj: deltaRH,
    activationEnergyEaKj,
    reactantsEnergyKj: reactantsE,
    productsEnergyKj: productsE,
    transitionStateEnergyKj: transitionStateE,
    thermodynamicNatureVi: isExo
      ? 'Phản ứng tỏa nhiệt (Exothermic): Δr H°298 < 0, giải phóng nhiệt lượng ra môi trường, sản phẩm có thế năng thấp hơn và bền hơn chất đầu.'
      : 'Phản ứng thu nhiệt (Endothermic): Δr H°298 > 0, hấp thụ nhiệt từ môi trường xung quanh, làm nhiệt độ môi trường hạ xuống.',
    calculationMethod: 'FORMATION_ENTHALPIES',
    stepByStepBreakdownVi: breakdown,
    safetyOrRealWorldApplicationVi
  };
}

export function calculateEnthalpyFromBondEnergies(
  brokenBonds: { bondKey: string; count: number }[],
  formedBonds: { bondKey: string; count: number }[],
  reactionNameVi: string,
  equation: string,
  activationEnergyEaKj: number = 40.0
): ReactionEnthalpyResult {
  let sumBroken = 0;
  let sumFormed = 0;

  for (const b of brokenBonds) {
    const bond = BOND_ENERGY_CATALOG[b.bondKey];
    if (!bond) throw new Error(`Bond not found: ${b.bondKey}`);
    sumBroken += b.count * bond.energyKjMol;
  }

  for (const f of formedBonds) {
    const bond = BOND_ENERGY_CATALOG[f.bondKey];
    if (!bond) throw new Error(`Bond not found: ${f.bondKey}`);
    sumFormed += f.count * bond.energyKjMol;
  }

  // NOTE IUPAC rule for bond energies: Δr H°298 = Σ(Eb reactants) - Σ(Eb products)
  const deltaRH = parseFloat((sumBroken - sumFormed).toFixed(2));
  const isExo = deltaRH < 0;

  const breakdown = `Δr H°298 = Σ Eb(chất đầu bị bẻ gãy) - Σ Eb(liên kết mới tạo thành) = [${brokenBonds.map(b => `${b.count} * ${BOND_ENERGY_CATALOG[b.bondKey].energyKjMol}`).join(' + ')}] - [${formedBonds.map(f => `${f.count} * ${BOND_ENERGY_CATALOG[f.bondKey].energyKjMol}`).join(' + ')}] = ${sumBroken} - ${sumFormed} = ${deltaRH} kJ`;

  return {
    reactionId: reactionNameVi.toLowerCase().replace(/\s+/g, '-'),
    nameVi: reactionNameVi,
    equation,
    isExothermic: isExo,
    deltaRH298Kj: deltaRH,
    activationEnergyEaKj,
    reactantsEnergyKj: 0,
    productsEnergyKj: deltaRH,
    transitionStateEnergyKj: Math.max(0, deltaRH) + activationEnergyEaKj,
    thermodynamicNatureVi: isExo
      ? 'Phản ứng tỏa nhiệt: Năng lượng giải phóng khi hình thành liên kết mới lớn hơn năng lượng cần tiêu tốn để bẻ gãy liên kết cũ.'
      : 'Phản ứng thu nhiệt: Năng lượng cần bẻ gãy liên kết cũ lớn hơn năng lượng giải phóng khi tạo liên kết mới.',
    calculationMethod: 'BOND_ENERGIES',
    stepByStepBreakdownVi: breakdown,
    safetyOrRealWorldApplicationVi: 'Phương pháp năng lượng liên kết áp dụng cho các phản ứng mà tất cả chất tham gia và sản phẩm đều ở thể khí (gas).'
  };
}

export interface CalorimeterSimulationResult {
  initialTempC: number;
  finalTempC: number;
  deltaTempC: number;
  heatJoules: number;
  waterMassG: number;
  reactionMoles: number;
  deltaRH298KjMol: number;
  isHeating: boolean;
  explanationVi: string;
}

export function simulateCalorimeterTemperature(
  deltaRH298KjMol: number,
  reactionMoles: number = 0.05,
  waterMassG: number = 100.0,
  initialTempC: number = 25.0
): CalorimeterSimulationResult {
  // Specific heat of water c = 4.184 J/(g·°C)
  const c = 4.184;
  // q_rxn = n * Δr H (in kJ)
  const qRxnJoules = deltaRH298KjMol * reactionMoles * 1000;
  // In insulated calorimeter: q_water = -q_rxn
  const qWaterJoules = -qRxnJoules;
  // ΔT = q_water / (m * c)
  const deltaT = parseFloat((qWaterJoules / (waterMassG * c)).toFixed(2));
  const finalTemp = parseFloat((initialTempC + deltaT).toFixed(2));
  const isHeating = deltaT > 0;

  return {
    initialTempC,
    finalTempC: finalTemp,
    deltaTempC: deltaT,
    heatJoules: Math.abs(parseFloat(qRxnJoules.toFixed(1))),
    waterMassG,
    reactionMoles,
    deltaRH298KjMol,
    isHeating,
    explanationVi: isHeating
      ? `Phản ứng tỏa ra ${Math.abs(qRxnJoules).toFixed(0)} J nhiệt lượng, làm nhiệt độ của ${waterMassG}g nước tăng từ ${initialTempC}°C lên ${finalTemp}°C (tăng +${deltaT}°C).`
      : `Phản ứng thu vào ${Math.abs(qRxnJoules).toFixed(0)} J nhiệt lượng từ nước, làm nhiệt độ giảm từ ${initialTempC}°C xuống ${finalTemp}°C (hạ ${deltaT}°C).`
  };
}

export interface HessCycleStep {
  stepNameVi: string;
  equation: string;
  deltaHKj: number;
  multiplier: number;
  isReversed: boolean;
}

export interface HessCycleResult {
  targetReactionNameVi: string;
  targetEquation: string;
  steps: HessCycleStep[];
  calculatedDeltaRH298Kj: number;
  verificationVi: string;
  pathIndependenceNoteVi: string;
}

export function simulateHessLawCycle(cycleType: 'CO_SYNTHESIS' | 'NO2_SYNTHESIS' | 'C2H2_HYDROGENATION'): HessCycleResult {
  if (cycleType === 'CO_SYNTHESIS') {
    // Target: C(graphite) + 1/2 O2(g) -> CO(g)
    // Step 1: C(graphite) + O2(g) -> CO2(g)                 ΔH1 = -393.5 kJ
    // Step 2: CO(g) + 1/2 O2(g) -> CO2(g)                  ΔH2 = -283.0 kJ (need to reverse: CO2 -> CO + 1/2 O2, ΔH = +283.0 kJ)
    // Sum: C + O2 + CO2 -> CO2 + CO + 1/2 O2 => C + 1/2 O2 -> CO, ΔH = -393.5 + 283.0 = -110.5 kJ
    const deltaH1 = -393.5;
    const deltaH2_rev = 283.0;
    const targetDeltaH = parseFloat((deltaH1 + deltaH2_rev).toFixed(2));

    return {
      targetReactionNameVi: 'Tổng hợp khí Cacbon monoxit (CO) từ than chì và oxi',
      targetEquation: 'C(graphite) + 1/2 O2(g) -> CO(g)',
      steps: [
        {
          stepNameVi: 'Phản ứng cháy hoàn toàn than chì (Giữ nguyên chiều)',
          equation: 'C(graphite) + O2(g) -> CO2(g)',
          deltaHKj: -393.5,
          multiplier: 1,
          isReversed: false
        },
        {
          stepNameVi: 'Phản ứng đốt cháy CO (Đảo ngược chiều phản ứng)',
          equation: 'CO2(g) -> CO(g) + 1/2 O2(g)',
          deltaHKj: 283.0,
          multiplier: 1,
          isReversed: true
        }
      ],
      calculatedDeltaRH298Kj: targetDeltaH,
      verificationVi: 'Cực kỳ chính xác: Δr H°(CO) = -393.5 + 283.0 = -110.5 kJ/mol. Thực nghiệm không thể đo trực tiếp nhiệt đốt than cháy dở thành CO vì luôn sinh kèm CO2; định luật Hess cho phép xác định chính xác giá trị này.',
      pathIndependenceNoteVi: 'Định luật Hess: Biến thiên enthalpy của một phản ứng hóa học chỉ phụ thuộc vào trạng thái đầu và trạng thái cuối của các chất phản ứng, không phụ thuộc vào con đường hay số giai đoạn mà phản ứng trải qua.'
    };
  }

  if (cycleType === 'NO2_SYNTHESIS') {
    // Target: 1/2 N2(g) + O2(g) -> NO2(g)
    // Step 1: 1/2 N2(g) + 1/2 O2(g) -> NO(g)                 ΔH1 = +90.3 kJ
    // Step 2: NO(g) + 1/2 O2(g) -> NO2(g)                   ΔH2 = -57.1 kJ
    // Sum: 1/2 N2 + O2 -> NO2, ΔH = +90.3 - 57.1 = +33.2 kJ
    const targetDeltaH = 33.2;
    return {
      targetReactionNameVi: 'Tổng hợp khí Nitơ đioxit (NO2) qua 2 nấc oxy hóa',
      targetEquation: '1/2 N2(g) + O2(g) -> NO2(g)',
      steps: [
        {
          stepNameVi: 'Nấc 1: Oxy hóa N2 ở nhiệt độ cao/tia lửa điện tạo NO',
          equation: '1/2 N2(g) + 1/2 O2(g) -> NO(g)',
          deltaHKj: 90.3,
          multiplier: 1,
          isReversed: false
        },
        {
          stepNameVi: 'Nấc 2: Oxy hóa NO trong không khí ở nhiệt độ thường tạo NO2',
          equation: 'NO(g) + 1/2 O2(g) -> NO2(g)',
          deltaHKj: -57.1,
          multiplier: 1,
          isReversed: false
        }
      ],
      calculatedDeltaRH298Kj: targetDeltaH,
      verificationVi: 'Δr H° = ΔH1 + ΔH2 = 90.3 + (-57.1) = +33.2 kJ/mol (chính xác với nhiệt tạo thành chuẩn của NO2 trong bảng tra cứu).',
      pathIndependenceNoteVi: 'Chứng minh nguyên lý chu trình nhiệt động lực học khép kín của Hess.'
    };
  }

  // C2H2 Hydrogenation
  // Target: C2H2(g) + 2H2(g) -> C2H6(g)
  // Step 1: C2H2(g) + H2(g) -> C2H4(g)  ΔH1 = -175.0 kJ
  // Step 2: C2H4(g) + H2(g) -> C2H6(g)  ΔH2 = -137.1 kJ
  // Sum = -312.1 kJ
  return {
    targetReactionNameVi: 'Hidro hóa hoàn toàn axetilen thành etan',
    targetEquation: 'C2H2(g) + 2H2(g) -> C2H6(g)',
    steps: [
      {
        stepNameVi: 'Giai đoạn 1: Hidro hóa axetilen thành etilen (Pd/PbCO3)',
        equation: 'C2H2(g) + H2(g) -> C2H4(g)',
        deltaHKj: -175.0,
        multiplier: 1,
        isReversed: false
      },
      {
        stepNameVi: 'Giai đoạn 2: Hidro hóa etilen thành etan (Ni, t°)',
        equation: 'C2H4(g) + H2(g) -> C2H6(g)',
        deltaHKj: -137.1,
        multiplier: 1,
        isReversed: false
      }
    ],
    calculatedDeltaRH298Kj: -312.1,
    verificationVi: 'Cộng đại số trực tiếp 2 giai đoạn: Δr H° = (-175.0) + (-137.1) = -312.1 kJ. Cả 2 giai đoạn đều tỏa nhiệt mạnh do bẻ gãy liên kết pi kém bền để hình thành liên kết sigma C-H bền vững.',
    pathIndependenceNoteVi: 'Định luật Hess áp dụng hoàn hảo cho các chuỗi phản ứng hữu cơ nhiều giai đoạn.'
  };
}
