// src/domain/femtosecondPumpProbeEngine.ts
// Milestone 70: Ultrafast Femtosecond Pump-Probe Spectroscopy & Zewail Transition-State Chemical Dynamics Engine
// Standards: Ahmed H. Zewail (Nobel Prize in Chemistry 1999) & Landau-Zener Wavepacket Theory
// Curriculum: Vietnam GDPT 2018 (Hóa học 10 & 11: Tốc độ phản ứng, năng lượng hoạt hóa Ea, trạng thái chuyển tiếp [A...B]‡, liên kết hóa học; Vật lý 12: Lượng tử ánh sáng, giao thoa sóng de Broglie, dao động điều hòa)

export const SPEED_OF_LIGHT_MICRON_PER_FS = 0.299792458; // c in μm / fs
export const FEMTOSECOND_IN_SECONDS = 1e-15; // 1 fs = 10^-15 s
export const PICOSECOND_IN_FS = 1000; // 1 ps = 1000 fs

/**
 * Optical path delay in Michelson translation stage:
 * Δt = (2 · Δx) / c
 * 1 μm of stage movement yields 6.67128 fs delay
 */
export const MICHELSON_DELAY_FACTOR_FS_PER_MICRON = 2.0 / SPEED_OF_LIGHT_MICRON_PER_FS; // ~6.67128 fs/μm

export interface PumpProbeTransientPoint {
  delayTimeFs: number; // Optical delay in femtoseconds (-200 fs to 4000 fs)
  stageDisplacementMicrons: number; // Mechanical stage displacement in μm
  transientAbsorbanceMilliOd: number; // ΔA = -log10(I_probe / I_ref) in mOD
  wavepacketPositionAngstroms: number; // Internuclear distance R(t) in Å
  freeProductYieldFraction: number; // Cumulative dissociated product (0.0 to 1.0)
  isTransitionStateWindow: boolean; // True when probe captures transient [A...B]‡
}

export interface PotentialEnergyCurvePoint {
  internuclearDistanceAngstroms: number; // R in Å
  groundStateEnergyEv: number; // V_0(R)
  covalentStateEnergyEv: number; // V_cov(R)
  ionicStateEnergyEv: number; // V_ion(R) = IP - EA - e^2 / (4 pi eps0 R)
  adiabaticLowerEnergyEv: number; // Avoided crossing lower surface
  adiabaticUpperEnergyEv: number; // Avoided crossing upper surface
}

export interface PumpProbeStandard {
  id: string;
  name: string;
  vietnameseName: string;
  reactionEquation: string;
  chemicalSystem: 'ALKALI_HALIDE_PHOTODISSOCIATION' | 'HALOGEN_NONADIABATIC_BRANCHING' | 'VISION_RETINAL_ISOMERIZATION' | 'PHOTOSYNTHETIC_EXCITON_TRANSFER' | 'LIQUID_WATER_HYDROGEN_NETWORK';
  pumpWavelengthNm: number; // Pump excitation wavelength
  probeWavelengthNm: number; // Probe interrogation wavelength
  transitionStateWavelengthNm: number; // Wavelength specific to [A...B]‡
  wavepacketPeriodFs: number; // Round-trip vibrational period (e.g. 1250 fs for NaI)
  crossingDistanceAngstroms: number; // Avoided crossing point R_c in Å
  landauZenerProbabilityPerPass: number; // Leakage probability per passage to neutral channel
  typicalLifetimeFs: number; // Excited state or decay lifetime
  quantumYieldPercent: number; // Overall reaction yield
  description: string;
  curriculumNotes: string;
  nobelCitation: string;
}

export interface PumpProbeSimulationResult {
  standard: PumpProbeStandard;
  currentStageDisplacementMicrons: number;
  currentDelayTimeFs: number;
  probeMode: 'TRANSITION_STATE' | 'FREE_PRODUCT';
  currentTransientPoint: PumpProbeTransientPoint;
  timeResolvedTransientCurve: PumpProbeTransientPoint[];
  potentialEnergyCurves: PotentialEnergyCurvePoint[];
  coherenceDampingRatio: number; // Decay of quantum beatings
}

export const FEMTOSECOND_PUMP_PROBE_CATALOG: PumpProbeStandard[] = [
  {
    id: 'nai_photodissociation_avoided_crossing',
    name: 'Sodium Iodide (NaI) Photodissociation & Ionic-Covalent Avoided Crossing',
    vietnameseName: 'Quang Phân Cắt Natri Iodide (NaI) & Giao Nhau Tránh Trạng Thái Covalent-Ionic (Zewail 1989)',
    reactionEquation: 'NaI + hν(pump: 310 nm) → [Na···I]‡ (covalent) → Na(2S) + I(2P3/2)',
    chemicalSystem: 'ALKALI_HALIDE_PHOTODISSOCIATION',
    pumpWavelengthNm: 310,
    probeWavelengthNm: 589, // Na D-line probe (free sodium product)
    transitionStateWavelengthNm: 610, // Transition state [Na···I]‡ probe
    wavepacketPeriodFs: 1250, // 1.25 ps oscillation
    crossingDistanceAngstroms: 6.93, // Avoided crossing at 6.93 Å
    landauZenerProbabilityPerPass: 0.11, // ~11% escapes per bounce to neutral atoms
    typicalLifetimeFs: 4500, // ~4.5 ps until wavepacket completely leaks
    quantumYieldPercent: 100.0,
    description: 'The monumental benchmark of femtochemistry. A 310 nm UV pump launches a coherent wave packet on the covalent potential curve. As the packet oscillates in the well (period 1.25 ps), it passes the ionic-covalent avoided crossing (6.93 Å). Every bounce, ~11% leaks through via Landau-Zener nonadiabatic tunneling, producing stepwise stair-like pulses of free sodium atoms and decaying oscillatory spikes at the transition state.',
    curriculumNotes: 'GDPT 2018 Hóa học 10 & 11: Liên kết ion vs liên kết cộng hóa trị; Tốc độ phản ứng hóa học và trạng thái hoạt động hóa [Na···I]‡; Vật lý 12: Thuyết lượng tử ánh sáng và giao thoa sóng vật chất de Broglie.',
    nobelCitation: 'Ahmed H. Zewail, Nobel Prize in Chemistry 1999: "For his studies of the transition states of chemical reactions using femtosecond spectroscopy".'
  },
  {
    id: 'ibr_nonadiabatic_branching',
    name: 'Iodine Monobromide (IBr) Nonadiabatic Curve Crossing & Spin-Orbit Branching',
    vietnameseName: 'Phân Nhánh Spin-Quỹ Đạo & Giao Nhau Phi Đoạn Nhiệt IBr (Zewail 1992)',
    reactionEquation: 'IBr + hν(pump: 500 nm) → I(2P3/2) + Br(2P3/2) [covalent] vs I(2P3/2) + Br*(2P1/2) [spin-orbit excited]',
    chemicalSystem: 'HALOGEN_NONADIABATIC_BRANCHING',
    pumpWavelengthNm: 500,
    probeWavelengthNm: 267,
    transitionStateWavelengthNm: 380,
    wavepacketPeriodFs: 450,
    crossingDistanceAngstroms: 3.28,
    landauZenerProbabilityPerPass: 0.72,
    typicalLifetimeFs: 180, // Ultrafast prompt dissociation
    quantumYieldPercent: 98.5,
    description: 'Ultrafast photochemical branching in interhalogen molecules. Visible pump excitation at 500 nm excites IBr to the bound B(3Pi_0+) surface. As the bond stretches, wavepacket splits at the conical crossing with the repulsive Y(0+) curve, partitioning products into ground-state Br and spin-orbit excited Br* within 180 femtoseconds.',
    curriculumNotes: 'GDPT 2018 Hóa học 10: Nguyên tố nhóm Halogen (Iodine, Bromine); Vật lý 12: Tương tác spin-quỹ đạo trong nguyên tử và chuyển mức năng lượng quang học.',
    nobelCitation: 'Ahmed H. Zewail, Nobel Prize in Chemistry 1999: Real-time clocking of bond breaking and non-adiabatic branchings.'
  },
  {
    id: 'rhodopsin_vision_cis_trans',
    name: 'Rhodopsin 11-cis Retinal Ultrafast Photoisomerization (Primary Event in Vision)',
    vietnameseName: 'Đồng Phân Hóa Siêu Nhanh 11-cis Retinal Trong Rhodopsin (Khởi Thủy Thị Giác Người)',
    reactionEquation: '11-cis Retinylidene (Rhodopsin) + hν(500 nm) → [Retinal]‡ → all-trans Bathorhodopsin (200 fs)',
    chemicalSystem: 'VISION_RETINAL_ISOMERIZATION',
    pumpWavelengthNm: 500,
    probeWavelengthNm: 570,
    transitionStateWavelengthNm: 620,
    wavepacketPeriodFs: 150, // C=C torsional vibration
    crossingDistanceAngstroms: 1.45, // C11=C12 torsion coordinate
    landauZenerProbabilityPerPass: 0.67, // Quantum yield = 0.67
    typicalLifetimeFs: 200, // 200 fs reaction time!
    quantumYieldPercent: 67.0,
    description: 'The fastest chemical reaction in human biology. A single photon triggers the 11-cis to all-trans conformational change of retinal in rhodopsin protein within 200 fs via a barrierless conical intersection. Coherent vibrational wavepacket motion directs the trajectory with extreme quantum efficiency (67%).',
    curriculumNotes: 'GDPT 2018 Hóa học 11 & 12: Đồng phân hình học cis-trans, hợp chất carbonyl và sắc tố polyene; Sinh học 11: Cơ chế cảm nhận thị giác của tế bào nón và que tại võng mạc mắt người.',
    nobelCitation: 'Ahmed H. Zewail, Nobel Prize in Chemistry 1999: Biological femtochemistry and the visual cycle.'
  },
  {
    id: 'bacteriochlorophyll_lh2_coherence',
    name: 'Photosynthetic LH2 Antenna Complex Ultrafast Exciton Transfer & Quantum Beats',
    vietnameseName: 'Truyền Năng Lượng Exciton Phức Hệ Quang Hợp LH2 & Phách Lượng Tử (B800 → B850)',
    reactionEquation: 'B800* + B850 (LH2 Ring) → B800 + B850* (700 fs) + Coherent Exciton Beats (120 fs)',
    chemicalSystem: 'PHOTOSYNTHETIC_EXCITON_TRANSFER',
    pumpWavelengthNm: 800, // Excites B800 bacteriochlorophyll ring
    probeWavelengthNm: 850, // Probes B850 acceptor ring
    transitionStateWavelengthNm: 825,
    wavepacketPeriodFs: 220, // Quantum beating period
    crossingDistanceAngstroms: 9.2, // Inter-ring distance
    landauZenerProbabilityPerPass: 0.95, // Near unity transfer efficiency
    typicalLifetimeFs: 700,
    quantumYieldPercent: 99.0,
    description: 'Ultrafast electronic energy transfer in purple bacteria light-harvesting complex 2 (LH2). Energy captured by the outer B800 ring is transferred to the concentric B850 ring in 700 fs. Coherent quantum beats persisting for >150 fs prove long-lived quantum coherence assists photosynthetic light harvesting.',
    curriculumNotes: 'GDPT 2018 Hóa học 12: Phức chất phối tử porphyrin chứa Mg2+ trong diệp lục; Sinh học 11: Quá trình quang hợp và quang hóa tại màng thylakoid.',
    nobelCitation: 'Ahmed H. Zewail, Nobel Prize in Chemistry 1999: Ultrafast photosynthetic energy transfer and macromolecular dynamics.'
  },
  {
    id: 'water_hydrogen_bond_network',
    name: 'Liquid Water O-H Stretch Vibrational Echo & Hydrogen-Bond Fluctuation',
    vietnameseName: 'Tiếng Vọng Dao Động O-H & Biến Thiên Mạng Lưới Liên Kết Hydrogen Trong Nước (H2O)',
    reactionEquation: 'H2O(liquid, v=1 O-H stretch) → H2O(v=0) [200 fs] → Thermalized H-Bond Network [1.4 ps]',
    chemicalSystem: 'LIQUID_WATER_HYDROGEN_NETWORK',
    pumpWavelengthNm: 2940, // 3400 cm^-1 Mid-IR OH stretch
    probeWavelengthNm: 2940,
    transitionStateWavelengthNm: 3100,
    wavepacketPeriodFs: 180, // Intermolecular O···O hydrogen-bond libration
    crossingDistanceAngstroms: 2.80, // O-H···O distance
    landauZenerProbabilityPerPass: 0.85,
    typicalLifetimeFs: 200, // Fast vibrational dephasing
    quantumYieldPercent: 100.0,
    description: 'Real-time observation of the fastest structural rearrangements in nature: liquid water hydrogen-bonding network. Femtosecond Mid-IR pump pulses excite the O-H stretch (3400 cm^-1). The vibrational energy dissipates into intermolecular hydrogen-bond modes in 200 fs, followed by structural reorganization of the hydrogen network in 1.4 ps.',
    curriculumNotes: 'GDPT 2018 Hóa học 10 & 11: Liên kết Hydrogen và cấu trúc cụm phân tử nước; Vật lý 12: Dao động nhiệt phân tử và năng lượng nội tại.',
    nobelCitation: 'Ahmed H. Zewail, Nobel Prize in Chemistry 1999: Femtochemistry of aqueous solution dynamics and hydrogen-bonding networks.'
  }
];

/**
 * Calculates optical delay time in femtoseconds from stage displacement in micrometers
 */
export function calculateMichelsonDelayFs(stageDisplacementMicrons: number): number {
  return Number((stageDisplacementMicrons * MICHELSON_DELAY_FACTOR_FS_PER_MICRON).toFixed(2));
}

/**
 * Calculates mechanical translation stage displacement in micrometers from target delay in femtoseconds
 */
export function calculateStageDisplacementMicrons(delayTimeFs: number): number {
  return Number((delayTimeFs / MICHELSON_DELAY_FACTOR_FS_PER_MICRON).toFixed(3));
}

/**
 * Generates potential energy curves (ground, covalent, ionic, and adiabatic avoided crossing)
 */
export function generatePotentialEnergyCurves(standard: PumpProbeStandard): PotentialEnergyCurvePoint[] {
  const points: PotentialEnergyCurvePoint[] = [];
  const Rc = standard.crossingDistanceAngstroms;

  for (let r = 2.0; r <= 12.0; r += 0.2) {
    const rNum = Number(r.toFixed(2));
    // Ground state: Morse potential
    const deGround = 3.2; // eV
    const aGround = 1.2;
    const reGround = 2.71; // Å
    const vGround = deGround * Math.pow(1 - Math.exp(-aGround * (rNum - reGround)), 2);

    // Covalent excited curve: weakly bound / quasi-bound
    const deCov = 1.8;
    const reCov = 3.5;
    const vCov = 2.2 + deCov * Math.pow(1 - Math.exp(-0.8 * (rNum - reCov)), 2);

    // Ionic curve: Coulomb attraction -e^2 / (4 pi eps0 R) + (IP - EA)
    // 14.4 eV·Å / R
    const ipMinusEa = 5.14 - 3.06; // 2.08 eV for Na + I -> Na+ + I-
    const vIon = ipMinusEa - (14.4 / rNum) + 2.0;

    // Avoided crossing adiabatic coupling H12
    const h12 = 0.05; // 0.05 eV coupling at Rc
    const vAvg = (vCov + vIon) / 2.0;
    const vDiff = (vCov - vIon) / 2.0;
    const vLower = vAvg - Math.sqrt(vDiff * vDiff + h12 * h12);
    const vUpper = vAvg + Math.sqrt(vDiff * vDiff + h12 * h12);

    points.push({
      internuclearDistanceAngstroms: rNum,
      groundStateEnergyEv: Number(vGround.toFixed(3)),
      covalentStateEnergyEv: Number(vCov.toFixed(3)),
      ionicStateEnergyEv: Number(vIon.toFixed(3)),
      adiabaticLowerEnergyEv: Number(vLower.toFixed(3)),
      adiabaticUpperEnergyEv: Number(vUpper.toFixed(3))
    });
  }

  return points;
}

/**
 * Simulates Femtosecond Pump-Probe Reaction Dynamics
 */
export function simulatePumpProbeDynamics(
  standardId: string,
  stageDisplacementMicrons?: number,
  probeMode: 'TRANSITION_STATE' | 'FREE_PRODUCT' = 'TRANSITION_STATE'
): PumpProbeSimulationResult {
  const standard =
    FEMTOSECOND_PUMP_PROBE_CATALOG.find((s) => s.id === standardId) ||
    FEMTOSECOND_PUMP_PROBE_CATALOG[0];

  // Stage displacement and corresponding delay
  const stageMicrons = stageDisplacementMicrons !== undefined ? stageDisplacementMicrons : 93.7; // ~625 fs (half period)
  const currentDelayFs = calculateMichelsonDelayFs(stageMicrons);

  const potentialEnergyCurves = generatePotentialEnergyCurves(standard);
  const timeResolvedTransientCurve: PumpProbeTransientPoint[] = [];

  const periodFs = standard.wavepacketPeriodFs;
  const pLeak = standard.landauZenerProbabilityPerPass;
  const lifetime = standard.typicalLifetimeFs;

  // Generate transient signal from -200 fs to 4000 fs
  const timeStepFs = 25; // 25 fs resolution
  for (let t = -200; t <= 4000; t += timeStepFs) {
    let signalMod = 0;
    let rPacket = 2.71; // Ground state equilibrium distance
    let yieldFrac = 0;
    let isTransition = false;

    if (t < 0) {
      // Prior to pump arrival
      signalMod = 0.0;
      rPacket = 2.71;
      yieldFrac = 0.0;
      isTransition = false;
    } else {
      // Damping envelope of wavepacket due to dephasing and leakage
      const damping = Math.exp(-t / lifetime);

      // Wavepacket oscillatory position R(t): oscillates between inner wall ~3.0 Å and outer turning point ~8.0 Å
      const omega = (2 * Math.PI) / periodFs;
      const wavePhase = omega * t;
      rPacket = 5.2 + 2.5 * Math.cos(wavePhase);

      // Avoided crossing occurs around R_c = standard.crossingDistanceAngstroms (~6.93 Å)
      const distFromRc = Math.abs(rPacket - standard.crossingDistanceAngstroms);
      isTransition = distFromRc < 0.6;

      // Cumulative number of crossings N_cross = (2 * t) / periodFs
      const numCrossings = (2.0 * t) / periodFs;
      // Fraction dissociated into free products: 1 - (1 - pLeak)^numCrossings
      yieldFrac = Number((1.0 - Math.pow(1.0 - pLeak, numCrossings)).toFixed(4));
      if (yieldFrac > 1.0) yieldFrac = 1.0;

      if (probeMode === 'TRANSITION_STATE') {
        // Probing the transition state [Na···I]‡:
        // Signal spikes each time wavepacket passes through R_c (twice per period, at ~312 fs, 937 fs, 1562 fs, etc.)
        const passingFactor = Math.exp(-Math.pow(distFromRc / 0.5, 2));
        signalMod = 120 * passingFactor * damping;
      } else {
        // Probing free product (e.g. free Na atoms at 589 nm):
        // Signal rises in staircase steps at each crossing and plateaus
        const stairOscillation = 0.05 * Math.sin(wavePhase); // Small residual modulation
        signalMod = (yieldFrac + stairOscillation) * 150;
      }
    }

    const stageMicron = calculateStageDisplacementMicrons(t);

    timeResolvedTransientCurve.push({
      delayTimeFs: t,
      stageDisplacementMicrons: stageMicron,
      transientAbsorbanceMilliOd: Number(Math.max(0, signalMod).toFixed(2)),
      wavepacketPositionAngstroms: Number(rPacket.toFixed(2)),
      freeProductYieldFraction: Number(yieldFrac.toFixed(3)),
      isTransitionStateWindow: isTransition
    });
  }

  // Find or interpolate current transient point at currentDelayFs
  const closestPoint = timeResolvedTransientCurve.reduce((prev, curr) => {
    return Math.abs(curr.delayTimeFs - currentDelayFs) < Math.abs(prev.delayTimeFs - currentDelayFs) ? curr : prev;
  });

  return {
    standard,
    currentStageDisplacementMicrons: stageMicrons,
    currentDelayTimeFs: currentDelayFs,
    probeMode,
    currentTransientPoint: closestPoint,
    timeResolvedTransientCurve,
    potentialEnergyCurves,
    coherenceDampingRatio: Number(Math.exp(-Math.max(0, currentDelayFs) / lifetime).toFixed(3))
  };
}

/**
 * Intelligent Card Matcher for Femtosecond Pump-Probe Reaction Dynamics
 */
export function getMatchingPumpProbeCard(card: { id?: string; name?: string; category?: string }): PumpProbeStandard | null {
  if (!card) return null;
  const target = `${card.id || ''} ${card.name || ''} ${card.category || ''}`.toLowerCase();

  if (target.includes('sodium iodide') || target.includes('nai') || target.includes('iodide') || target.includes('zewail') || target.includes('femtosecond') || target.includes('avoided crossing')) {
    return FEMTOSECOND_PUMP_PROBE_CATALOG.find((s) => s.id === 'nai_photodissociation_avoided_crossing') || null;
  }
  if (target.includes('ibr') || target.includes('bromine') || target.includes('halogen') || target.includes('spin-orbit') || target.includes('nonadiabatic')) {
    return FEMTOSECOND_PUMP_PROBE_CATALOG.find((s) => s.id === 'ibr_nonadiabatic_branching') || null;
  }
  if (target.includes('rhodopsin') || target.includes('retinal') || target.includes('vision') || target.includes('cis-trans') || target.includes('eye')) {
    return FEMTOSECOND_PUMP_PROBE_CATALOG.find((s) => s.id === 'rhodopsin_vision_cis_trans') || null;
  }
  if (target.includes('lh2') || target.includes('photosynthesis') || target.includes('bacteriochlorophyll') || target.includes('exciton') || target.includes('chlorophyll')) {
    return FEMTOSECOND_PUMP_PROBE_CATALOG.find((s) => s.id === 'bacteriochlorophyll_lh2_coherence') || null;
  }
  if (target.includes('water') || target.includes('h2o') || target.includes('hydrogen bond') || target.includes('vibrational echo') || target.includes('liquid water')) {
    return FEMTOSECOND_PUMP_PROBE_CATALOG.find((s) => s.id === 'water_hydrogen_bond_network') || null;
  }

  // Fallback keyword detection
  if (target.includes('laser') || target.includes('pump-probe') || target.includes('transition state') || target.includes('kinetics') || target.includes('ultrafast')) {
    return FEMTOSECOND_PUMP_PROBE_CATALOG[0];
  }

  return null;
}
