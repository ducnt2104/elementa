// src/domain/orbitalEngine.ts
// Quantum Orbital & Electron Configuration Engine
// Calibrated strictly to IUPAC standards & Vietnam GDPT 2018 Grade 10 Chemistry

export type OrbitalType = 's' | 'p' | 'd' | 'f';

export interface OrbitalBox {
  spinUp: boolean;   // ↑ (ms = +1/2)
  spinDown: boolean; // ↓ (ms = -1/2)
}

export interface SubshellOccupation {
  subshell: string;      // e.g. "3d"
  n: number;            // Principal quantum number (1-7)
  lType: OrbitalType;   // s, p, d, f
  electronCount: number;
  capacity: number;
  boxes: OrbitalBox[];
  unpairedCount: number;
}

export interface MagneticProperty {
  magneticType: 'PARAMAGNETIC' | 'DIAMAGNETIC';
  magneticTypeVI: 'Thuận Từ (Paramagnetic)' | 'Nghịch Từ (Diamagnetic)';
  unpairedCount: number;
  magneticMomentBohrMagneton: number; // BM = sqrt(n * (n + 2))
  descriptionVI: string;
}

export function computeMagneticProperty(unpairedCount: number): MagneticProperty {
  if (unpairedCount <= 0) {
    return {
      magneticType: 'DIAMAGNETIC',
      magneticTypeVI: 'Nghịch Từ (Diamagnetic)',
      unpairedCount: 0,
      magneticMomentBohrMagneton: 0.0,
      descriptionVI: 'Tất cả electron đều ghép đôi (spin triệt tiêu, S = 0). Chất bị từ trường đẩy nhẹ và không có mômen từ riêng (μ = 0 BM).'
    };
  }

  const rawMoment = Math.sqrt(unpairedCount * (unpairedCount + 2));
  const roundedMoment = Number(rawMoment.toFixed(2));

  return {
    magneticType: 'PARAMAGNETIC',
    magneticTypeVI: 'Thuận Từ (Paramagnetic)',
    unpairedCount,
    magneticMomentBohrMagneton: roundedMoment,
    descriptionVI: `Có ${unpairedCount} electron độc thân (spin song song). Chất bị hút vào từ trường với mômen từ spin μ = ${roundedMoment.toFixed(2)} BM.`
  };
}

export interface ElementElectronStructure {
  z: number;
  symbol: string;
  fullConfigString: string;
  nobleGasConfigString: string;
  subshells: SubshellOccupation[];
  valenceElectrons: number;
  valenceShellPrincipalN: number;
  totalUnpairedElectrons: number;
  magneticProperty: MagneticProperty;
  elementClass: 'METAL' | 'NONMETAL' | 'NOBLE_GAS' | 'METALLOID';
  chemicalTendencyVI: string;
}

// Subshells ordered by increasing Madelung energy order (n + l rule)
const AUFBAU_ORDER: { subshell: string; n: number; lType: OrbitalType; capacity: number }[] = [
  { subshell: '1s', n: 1, lType: 's', capacity: 2 },
  { subshell: '2s', n: 2, lType: 's', capacity: 2 },
  { subshell: '2p', n: 2, lType: 'p', capacity: 6 },
  { subshell: '3s', n: 3, lType: 's', capacity: 2 },
  { subshell: '3p', n: 3, lType: 'p', capacity: 6 },
  { subshell: '4s', n: 4, lType: 's', capacity: 2 },
  { subshell: '3d', n: 3, lType: 'd', capacity: 10 },
  { subshell: '4p', n: 4, lType: 'p', capacity: 6 },
  { subshell: '5s', n: 5, lType: 's', capacity: 2 },
  { subshell: '4d', n: 4, lType: 'd', capacity: 10 },
  { subshell: '5p', n: 5, lType: 'p', capacity: 6 },
  { subshell: '6s', n: 6, lType: 's', capacity: 2 },
  { subshell: '4f', n: 4, lType: 'f', capacity: 14 },
  { subshell: '5d', n: 5, lType: 'd', capacity: 10 },
  { subshell: '6p', n: 6, lType: 'p', capacity: 6 },
  { subshell: '7s', n: 7, lType: 's', capacity: 2 },
  { subshell: '5f', n: 5, lType: 'f', capacity: 14 },
  { subshell: '6d', n: 6, lType: 'd', capacity: 10 },
  { subshell: '7p', n: 7, lType: 'p', capacity: 6 }
];

// Helper to format number as superscript
export function toSuperscript(num: number): string {
  const map: Record<string, string> = {
    '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴',
    '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹'
  };
  return String(num).split('').map(c => map[c] || c).join('');
}

// Hund's rule orbital box filler
function fillOrbitalBoxes(type: OrbitalType, electronCount: number): OrbitalBox[] {
  const boxCount = type === 's' ? 1 : type === 'p' ? 3 : type === 'd' ? 5 : 7;
  const boxes: OrbitalBox[] = Array.from({ length: boxCount }, () => ({
    spinUp: false,
    spinDown: false
  }));

  // Step 1: Hund's Rule - Fill spin-up (↑) in each box first
  let remaining = electronCount;
  for (let i = 0; i < boxCount && remaining > 0; i++) {
    boxes[i].spinUp = true;
    remaining--;
  }

  // Step 2: Pauli Exclusion - Pair up with spin-down (↓)
  for (let i = 0; i < boxCount && remaining > 0; i++) {
    boxes[i].spinDown = true;
    remaining--;
  }

  return boxes;
}

// Known configuration anomalies (Half-filled / Fully-filled stability)
const ANOMALIES: Record<number, Record<string, number>> = {
  24: { '3d': 5, '4s': 1 }, // Cr: [Ar] 3d5 4s1
  29: { '3d': 10, '4s': 1 }, // Cu: [Ar] 3d10 4s1
  41: { '4d': 4, '5s': 1 }, // Nb: [Kr] 4d4 5s1
  42: { '4d': 5, '5s': 1 }, // Mo: [Kr] 4d5 5s1
  44: { '4d': 7, '5s': 1 }, // Ru: [Kr] 4d7 5s1
  45: { '4d': 8, '5s': 1 }, // Rh: [Kr] 4d8 5s1
  46: { '4d': 10, '5s': 0 }, // Pd: [Kr] 4d10 5s0
  47: { '4d': 10, '5s': 1 }, // Ag: [Kr] 4d10 5s1
  78: { '5d': 9, '6s': 1 }, // Pt: [Xe] 4f14 5d9 6s1
  79: { '5d': 10, '6s': 1 }  // Au: [Xe] 4f14 5d10 6s1
};

export function computeElectronStructure(z: number, symbol: string): ElementElectronStructure {
  if (z <= 0) throw new Error('Atomic number Z must be positive');

  // Baseline filling via Aufbau principle
  const subshellCounts: Record<string, number> = {};
  let remainingElectrons = z;

  for (const block of AUFBAU_ORDER) {
    if (remainingElectrons <= 0) break;
    const count = Math.min(remainingElectrons, block.capacity);
    subshellCounts[block.subshell] = count;
    remainingElectrons -= count;
  }

  // Apply anomalies if applicable
  if (ANOMALIES[z]) {
    for (const [sub, count] of Object.entries(ANOMALIES[z])) {
      subshellCounts[sub] = count;
    }
  }

  // Build SubshellOccupation list ordered by principal quantum number n, then l
  const occupiedSubshells: SubshellOccupation[] = [];
  // Sort occupied by n then l for standard chemistry presentation (e.g. 3d before 4s in written config)
  const lOrder: Record<OrbitalType, number> = { s: 0, p: 1, d: 2, f: 3 };

  const allSubshellDefs = AUFBAU_ORDER.filter(s => (subshellCounts[s.subshell] ?? 0) > 0);
  allSubshellDefs.sort((a, b) => {
    if (a.n !== b.n) return a.n - b.n;
    return lOrder[a.lType] - lOrder[b.lType];
  });

  let totalUnpaired = 0;
  let maxN = 1;

  for (const item of allSubshellDefs) {
    const count = subshellCounts[item.subshell];
    const boxes = fillOrbitalBoxes(item.lType, count);
    const unpaired = boxes.filter(b => (b.spinUp && !b.spinDown) || (!b.spinUp && b.spinDown)).length;
    totalUnpaired += unpaired;
    if (item.n > maxN) maxN = item.n;

    occupiedSubshells.push({
      subshell: item.subshell,
      n: item.n,
      lType: item.lType,
      electronCount: count,
      capacity: item.capacity,
      boxes,
      unpairedCount: unpaired
    });
  }

  // Generate full config string e.g. "1s² 2s² 2p⁶ 3s² 3p⁶ 3d⁶ 4s²"
  const fullConfigString = occupiedSubshells
    .map(s => `${s.subshell}${toSuperscript(s.electronCount)}`)
    .join(' ');

  // Noble gas cores
  const nobleCores: { symbol: string; z: number; nobleStr: string }[] = [
    { symbol: 'Rn', z: 86, nobleStr: '[Rn]' },
    { symbol: 'Xe', z: 54, nobleStr: '[Xe]' },
    { symbol: 'Kr', z: 36, nobleStr: '[Kr]' },
    { symbol: 'Ar', z: 18, nobleStr: '[Ar]' },
    { symbol: 'Ne', z: 10, nobleStr: '[Ne]' },
    { symbol: 'He', z: 2, nobleStr: '[He]' }
  ];

  let nobleGasConfigString = fullConfigString;
  const applicableCore = nobleCores.find(core => z > core.z);
  if (applicableCore) {
    // Collect subshells beyond the noble core
    const coreStruct = computeElectronStructure(applicableCore.z, applicableCore.symbol);
    const coreSubshellCounts: Record<string, number> = {};
    coreStruct.subshells.forEach(s => { coreSubshellCounts[s.subshell] = s.electronCount; });

    const outerParts: string[] = [];
    occupiedSubshells.forEach(s => {
      const coreCount = coreSubshellCounts[s.subshell] || 0;
      const diff = s.electronCount - coreCount;
      if (diff > 0) {
        outerParts.push(`${s.subshell}${toSuperscript(diff)}`);
      }
    });
    nobleGasConfigString = `${applicableCore.nobleStr} ${outerParts.join(' ')}`.trim();
  }

  // Calculate valence electrons:
  // For representative elements (s, p): electrons with n = maxN
  // For transition metals (d block): outermost ns electrons + incompletely filled (n-1)d electrons
  let valenceElectrons = 0;
  const isTransitionMetal = occupiedSubshells.some(s => s.n === maxN - 1 && s.lType === 'd' && s.electronCount < 10);
  if (isTransitionMetal) {
    const outermostS = occupiedSubshells.find(s => s.n === maxN && s.lType === 's')?.electronCount || 0;
    const penultD = occupiedSubshells.find(s => s.n === maxN - 1 && s.lType === 'd')?.electronCount || 0;
    valenceElectrons = outermostS + penultD;
  } else {
    valenceElectrons = occupiedSubshells
      .filter(s => s.n === maxN)
      .reduce((sum, s) => sum + s.electronCount, 0);
  }

  // Determine element class and chemical tendency
  let elementClass: 'METAL' | 'NONMETAL' | 'NOBLE_GAS' | 'METALLOID' = 'METAL';
  let tendencyVI = '';

  const outermostElectrons = occupiedSubshells
    .filter(s => s.n === maxN)
    .reduce((sum, s) => sum + s.electronCount, 0);

  if (z === 2 || outermostElectrons === 8) {
    elementClass = 'NOBLE_GAS';
    tendencyVI = 'Cấu hình electron bão hòa bền vững (Octet/Duet), rất trơ về mặt hóa học, khó tham gia phản ứng.';
  } else if (['B', 'Si', 'Ge', 'As', 'Sb', 'Te'].includes(symbol)) {
    elementClass = 'METALLOID';
    tendencyVI = 'Nguyên tố bán kim (á kim), có tính chất trung gian giữa kim loại và phi kim, có thể thể hiện tính oxi hóa hoặc tính khử tùy tác nhân.';
  } else if (outermostElectrons <= 3 && z !== 1 && z !== 2 && z !== 5) {
    elementClass = 'METAL';
    tendencyVI = `Lớp ngoài cùng có ${outermostElectrons}e: Dễ nhường ${outermostElectrons} electron để đạt cấu hình khí hiếm bền vững (Thể hiện tính khử đặc trưng của kim loại).`;
  } else if (outermostElectrons >= 5 || z === 1) {
    elementClass = 'NONMETAL';
    const needed = 8 - outermostElectrons;
    tendencyVI = `Lớp ngoài cùng có ${outermostElectrons}e: Dễ nhận thêm ${needed} electron hoặc góp chung electron (Thể hiện tính oxi hóa đặc trưng của phi kim).`;
  } else {
    // 4 electrons (C, Si, Sn, Pb)
    if (z === 6) {
      elementClass = 'NONMETAL';
      tendencyVI = 'Lớp ngoài cùng có 4e: Thường tạo 4 liên kết cộng hóa trị để đạt trạng thái bão hòa octet.';
    } else {
      elementClass = 'METAL';
      tendencyVI = 'Có thể nhường 2e hoặc 4e tùy điều kiện phản ứng.';
    }
  }

  return {
    z,
    symbol,
    fullConfigString,
    nobleGasConfigString,
    subshells: occupiedSubshells,
    valenceElectrons,
    valenceShellPrincipalN: maxN,
    totalUnpairedElectrons: totalUnpaired,
    magneticProperty: computeMagneticProperty(totalUnpaired),
    elementClass,
    chemicalTendencyVI: tendencyVI
  };
}

/**
 * Computes the exact distribution of electrons across principal quantum energy levels
 * (K=1, L=2, M=3, N=4, O=5, P=6, Q=7) for any element (Z=1 to 118) based on quantum orbital configurations.
 */
export function getShellElectrons(z: number, symbol?: string): number[] {
  if (z <= 0) return [];
  const struct = computeElectronStructure(z, symbol || '');
  const shellMap = new Map<number, number>();
  for (const s of struct.subshells) {
    shellMap.set(s.n, (shellMap.get(s.n) || 0) + s.electronCount);
  }
  const maxN = Math.max(...Array.from(shellMap.keys()), 1);
  const result: number[] = [];
  for (let n = 1; n <= maxN; n++) {
    result.push(shellMap.get(n) || 0);
  }
  return result;
}

export interface IonElectronStructure {
  z: number;
  symbol: string;
  charge: number;
  ionNotation: string;
  totalElectrons: number;
  configString: string;
  totalUnpairedElectrons: number;
  magneticProperty: MagneticProperty;
  isIsoelectronicWithNobleGas: boolean;
  nobleGasEquivalent?: string;
}

function formatIonCharge(charge: number): string {
  if (charge === 0) return '';
  const sign = charge > 0 ? '⁺' : '⁻';
  const abs = Math.abs(charge);
  if (abs === 1) return sign;
  const numSuperscripts: Record<number, string> = { 2: '²', 3: '³', 4: '⁴', 5: '⁵', 6: '⁶', 7: '⁷' };
  return `${numSuperscripts[abs] || abs}${sign}`;
}

/**
 * Computes the exact electron configuration, unpaired spin count, and magnetic moment for ions.
 * Follows the fundamental transition metal rule: outer 4s electrons are stripped before inner 3d electrons.
 */
export function computeIonElectronStructure(z: number, symbol: string, charge: number): IonElectronStructure {
  const neutral = computeElectronStructure(z, symbol);
  const totalElectrons = z - charge;
  if (totalElectrons <= 0) {
    throw new Error(`Invalid ion state: total electrons (${totalElectrons}) <= 0`);
  }

  // Clone occupied subshells
  let subshells = neutral.subshells.map(s => ({
    ...s,
    boxes: s.boxes.map(b => ({ ...b }))
  }));

  if (charge > 0) {
    let remainingToRemove = charge;
    const maxN = Math.max(...subshells.map(s => s.n));
    const isTransition = (z >= 21 && z <= 30) || (z >= 39 && z <= 48) || (z >= 72 && z <= 80);

    if (isTransition) {
      // 1. Remove from outermost s first (e.g. 4s before 3d)
      const outermostS = subshells.find(s => s.n === maxN && s.lType === 's');
      if (outermostS && outermostS.electronCount > 0) {
        const removeCount = Math.min(outermostS.electronCount, remainingToRemove);
        outermostS.electronCount -= removeCount;
        remainingToRemove -= removeCount;
      }

      // 2. Remove from (maxN-1)d if more needed
      if (remainingToRemove > 0) {
        const dSubshell = subshells.find(s => s.n === maxN - 1 && s.lType === 'd');
        if (dSubshell && dSubshell.electronCount > 0) {
          const removeCount = Math.min(dSubshell.electronCount, remainingToRemove);
          dSubshell.electronCount -= removeCount;
          remainingToRemove -= removeCount;
        }
      }
    } else {
      // Main group: remove from highest subshell in Aufbau order backwards
      for (let i = subshells.length - 1; i >= 0 && remainingToRemove > 0; i--) {
        const s = subshells[i];
        if (s.electronCount > 0) {
          const removeCount = Math.min(s.electronCount, remainingToRemove);
          s.electronCount -= removeCount;
          remainingToRemove -= removeCount;
        }
      }
    }
  } else if (charge < 0) {
    let remainingToAdd = -charge;
    for (const s of subshells) {
      if (s.electronCount < s.capacity && remainingToAdd > 0) {
        const addCount = Math.min(s.capacity - s.electronCount, remainingToAdd);
        s.electronCount += addCount;
        remainingToAdd -= addCount;
      }
    }
  }

  // Filter out empty subshells
  subshells = subshells.filter(s => s.electronCount > 0);

  // Rebuild orbital boxes and calculate unpaired count
  let totalUnpaired = 0;
  for (const s of subshells) {
    const boxCount = s.capacity / 2;
    const boxes: OrbitalBox[] = [];
    let upInSubshell = 0;

    for (let b = 0; b < boxCount; b++) {
      const spinUp = b < s.electronCount;
      const spinDown = (b + boxCount) < s.electronCount;
      if (spinUp && !spinDown) upInSubshell++;
      boxes.push({ spinUp, spinDown });
    }

    s.boxes = boxes;
    s.unpairedCount = upInSubshell;
    totalUnpaired += upInSubshell;
  }

  // Format config string
  const configParts = subshells.map(s => `${s.subshell}${toSuperscript(s.electronCount)}`);
  const configString = configParts.join(' ');

  // Isoelectronic check with noble gases (2=He, 10=Ne, 18=Ar, 36=Kr, 54=Xe, 86=Rn)
  const nobleMap: Record<number, string> = { 2: 'He', 10: 'Ne', 18: 'Ar', 36: 'Kr', 54: 'Xe', 86: 'Rn' };
  const isIsoelectronicWithNobleGas = totalElectrons in nobleMap;
  const nobleGasEquivalent = nobleMap[totalElectrons];

  const chargeStr = formatIonCharge(charge);
  const ionNotation = `${symbol}${chargeStr}`;

  return {
    z,
    symbol,
    charge,
    ionNotation,
    totalElectrons,
    configString,
    totalUnpairedElectrons: totalUnpaired,
    magneticProperty: computeMagneticProperty(totalUnpaired),
    isIsoelectronicWithNobleGas,
    nobleGasEquivalent
  };
}

