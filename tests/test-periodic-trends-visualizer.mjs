// test-periodic-trends-visualizer.mjs
// Automated Verification Suite for Periodic Trends, IUPAC Ground Truth & GDPT 2018 Grade 10 Subshell Anomalies

import assert from 'assert';
import { ALL_ELEMENTS, CORE_MVP_ELEMENTS } from '../src/data/elementsData.ts';

console.log('============================================================');
console.log('   ELEMENTA: PERIODIC TRENDS & IUPAC ANOMALIES AUDIT       ');
console.log('============================================================\n');

let passedAssertions = 0;

function it(desc, fn) {
  try {
    fn();
    console.log(`  ✓ PASS: ${desc}`);
    passedAssertions++;
  } catch (err) {
    console.error(`  ✗ FAIL: ${desc}`);
    console.error(err);
    process.exit(1);
  }
}

// 1. Scope Cohorts Resolution
console.log('--- 1. Periodic Scope Cohorts Integrity ---');

it('Period 2 contains exactly 8 representative elements (Li to Ne)', () => {
  const p2 = ALL_ELEMENTS.filter(e => e.period === 2).sort((a, b) => a.z - b.z);
  assert.strictEqual(p2.length, 8);
  const symbols = p2.map(e => e.symbol);
  assert.deepStrictEqual(symbols, ['Li', 'Be', 'B', 'C', 'N', 'O', 'F', 'Ne']);
});

it('Period 3 contains exactly 8 representative elements (Na to Ar)', () => {
  const p3 = ALL_ELEMENTS.filter(e => e.period === 3).sort((a, b) => a.z - b.z);
  assert.strictEqual(p3.length, 8);
  const symbols = p3.map(e => e.symbol);
  assert.deepStrictEqual(symbols, ['Na', 'Mg', 'Al', 'Si', 'P', 'S', 'Cl', 'Ar']);
});

it('Core MVP dataset contains exactly 28 tactical elements', () => {
  assert.strictEqual(CORE_MVP_ELEMENTS.length, 28);
  assert(CORE_MVP_ELEMENTS.every(e => e.stats && e.stats.atk_red > 0 && e.stats.atk_ox > 0));
});

// 2. Period 2 Ionization Energy & Subshell Stability Anomalies
console.log('\n--- 2. Period 2 Ionization Energy (I₁) Subshell Stability Anomalies ---');

it('Beryllium has higher I₁ than Boron due to stable 2s² subshell vs 2p¹ (Be > B)', () => {
  const be = ALL_ELEMENTS.find(e => e.symbol === 'Be');
  const b = ALL_ELEMENTS.find(e => e.symbol === 'B');
  assert(be && b);
  assert(
    be.first_ionization_energy > b.first_ionization_energy,
    `Expected I1(Be) > I1(B), got Be=${be.first_ionization_energy}, B=${b.first_ionization_energy}`
  );
  assert.strictEqual(be.first_ionization_energy, 899.5);
  assert.strictEqual(b.first_ionization_energy, 800.6);
});

it('Nitrogen has higher I₁ than Oxygen due to half-filled 2p³ subshell stability (N > O)', () => {
  const n = ALL_ELEMENTS.find(e => e.symbol === 'N');
  const o = ALL_ELEMENTS.find(e => e.symbol === 'O');
  assert(n && o);
  assert(
    n.first_ionization_energy > o.first_ionization_energy,
    `Expected I1(N) > I1(O), got N=${n.first_ionization_energy}, O=${o.first_ionization_energy}`
  );
  assert.strictEqual(n.first_ionization_energy, 1402.3);
  assert.strictEqual(o.first_ionization_energy, 1313.9);
});

// 3. Period 3 Ionization Energy & Subshell Stability Anomalies
console.log('\n--- 3. Period 3 Ionization Energy (I₁) Subshell Stability Anomalies ---');

it('Magnesium has higher I₁ than Aluminum due to stable 3s² subshell vs 3p¹ (Mg > Al)', () => {
  const mg = ALL_ELEMENTS.find(e => e.symbol === 'Mg');
  const al = ALL_ELEMENTS.find(e => e.symbol === 'Al');
  assert(mg && al);
  assert(
    mg.first_ionization_energy > al.first_ionization_energy,
    `Expected I1(Mg) > I1(Al), got Mg=${mg.first_ionization_energy}, Al=${al.first_ionization_energy}`
  );
  assert.strictEqual(mg.first_ionization_energy, 737.7);
  assert.strictEqual(al.first_ionization_energy, 577.5);
});

it('Phosphorus has higher I₁ than Sulfur due to half-filled 3p³ subshell stability (P > S)', () => {
  const p = ALL_ELEMENTS.find(e => e.symbol === 'P');
  const s = ALL_ELEMENTS.find(e => e.symbol === 'S');
  assert(p && s);
  assert(
    p.first_ionization_energy > s.first_ionization_energy,
    `Expected I1(P) > I1(S), got P=${p.first_ionization_energy}, S=${s.first_ionization_energy}`
  );
  assert.strictEqual(p.first_ionization_energy, 1011.8);
  assert.strictEqual(s.first_ionization_energy, 999.6);
});

// 4. Electronegativity (Pauling chi) Monotonicity & Halogen Maxima
console.log('\n--- 4. Electronegativity (Pauling chi) Strict Monotonicity ---');

it('Period 2 electronegativity increases monotonically from Li to F (Peaking at Fluorine chi = 3.98)', () => {
  const p2NonNoble = ALL_ELEMENTS.filter(e => e.period === 2 && e.electronegativity !== null).sort((a, b) => a.z - b.z);
  for (let i = 0; i < p2NonNoble.length - 1; i++) {
    const cur = p2NonNoble[i];
    const next = p2NonNoble[i + 1];
    assert(
      (cur.electronegativity ?? 0) <= (next.electronegativity ?? 0),
      `Monotonicity violation in Period 2: ${cur.symbol} (${cur.electronegativity}) > ${next.symbol} (${next.electronegativity})`
    );
  }
  const f = ALL_ELEMENTS.find(e => e.symbol === 'F');
  assert.strictEqual(f?.electronegativity, 3.98);
});

it('Period 3 electronegativity increases monotonically from Na to Cl (Peaking at Chlorine chi = 3.16)', () => {
  const p3NonNoble = ALL_ELEMENTS.filter(e => e.period === 3 && e.electronegativity !== null).sort((a, b) => a.z - b.z);
  for (let i = 0; i < p3NonNoble.length - 1; i++) {
    const cur = p3NonNoble[i];
    const next = p3NonNoble[i + 1];
    assert(
      (cur.electronegativity ?? 0) <= (next.electronegativity ?? 0),
      `Monotonicity violation in Period 3: ${cur.symbol} (${cur.electronegativity}) > ${next.symbol} (${next.electronegativity})`
    );
  }
  const cl = ALL_ELEMENTS.find(e => e.symbol === 'Cl');
  assert.strictEqual(cl?.electronegativity, 3.16);
});

it('Light noble gases (He, Ne, Ar, Og) have null electronegativity; heavy noble gases (Kr, Xe, Rn) have fluorinated compound scale values', () => {
  const he = ALL_ELEMENTS.find(e => e.symbol === 'He');
  const ne = ALL_ELEMENTS.find(e => e.symbol === 'Ne');
  const ar = ALL_ELEMENTS.find(e => e.symbol === 'Ar');
  const og = ALL_ELEMENTS.find(e => e.symbol === 'Og');
  const kr = ALL_ELEMENTS.find(e => e.symbol === 'Kr');
  const xe = ALL_ELEMENTS.find(e => e.symbol === 'Xe');
  const rn = ALL_ELEMENTS.find(e => e.symbol === 'Rn');

  assert.strictEqual(he?.electronegativity, null);
  assert.strictEqual(ne?.electronegativity, null);
  assert.strictEqual(ar?.electronegativity, null);
  assert.strictEqual(og?.electronegativity, null);

  assert.strictEqual(kr?.electronegativity, 3.0);
  assert.strictEqual(xe?.electronegativity, 2.6);
  assert.strictEqual(rn?.electronegativity, 2.2);
});

// 5. Atomic Weight & Natural Isotope Inversion
console.log('\n--- 5. Atomic Weight & Natural Isotopic Inversions ---');

it('Correctly models natural isotopic inversion: Argon (Z=18) has higher atomic weight than Potassium (Z=19)', () => {
  const ar = ALL_ELEMENTS.find(e => e.symbol === 'Ar');
  const k = ALL_ELEMENTS.find(e => e.symbol === 'K');
  assert(ar && k);
  assert(
    ar.atomic_weight > k.atomic_weight,
    `Expected isotopic inversion Ar (${ar.atomic_weight}) > K (${k.atomic_weight})`
  );
  assert.strictEqual(ar.atomic_weight, 39.95);
  assert.strictEqual(k.atomic_weight, 39.098);
});

it('Correctly models natural isotopic inversion: Cobalt (Z=27) has higher atomic weight than Nickel (Z=28)', () => {
  const co = ALL_ELEMENTS.find(e => e.symbol === 'Co');
  const ni = ALL_ELEMENTS.find(e => e.symbol === 'Ni');
  assert(co && ni);
  assert(
    co.atomic_weight > ni.atomic_weight,
    `Expected isotopic inversion Co (${co.atomic_weight}) > Ni (${ni.atomic_weight})`
  );
  assert.strictEqual(co.atomic_weight, 58.933);
  assert.strictEqual(ni.atomic_weight, 58.693);
});

it('Correctly models natural isotopic inversion: Tellurium (Z=52) has higher atomic weight than Iodine (Z=53)', () => {
  const te = ALL_ELEMENTS.find(e => e.symbol === 'Te');
  const i = ALL_ELEMENTS.find(e => e.symbol === 'I');
  assert(te && i);
  assert(
    te.atomic_weight > i.atomic_weight,
    `Expected isotopic inversion Te (${te.atomic_weight}) > I (${i.atomic_weight})`
  );
  assert.strictEqual(te.atomic_weight, 127.6);
  assert.strictEqual(i.atomic_weight, 126.9);
});

// 6. Tactical Reducing Power (ATK_red) Calibration
console.log('\n--- 6. Tactical Reducing Power (ATK_red) Calibration ---');

it('Alkali metals exhibit top-tier reducing power (ATK_red >= 85)', () => {
  const alkalis = ALL_ELEMENTS.filter(e => e.category === 'ALKALI_METAL');
  assert(alkalis.length >= 3);
  for (const alkali of alkalis) {
    const atkRed = alkali.stats?.atk_red ?? 0;
    assert(
      atkRed >= 85,
      `Expected alkali metal ${alkali.symbol} ATK_red >= 85, got ${atkRed}`
    );
  }
});

it('Noble gases exhibit minimal inert reducing power (ATK_red <= 15, light noble gases <= 10)', () => {
  const nobleGases = ALL_ELEMENTS.filter(e => e.category === 'NOBLE_GAS');
  assert(nobleGases.length >= 6);
  for (const noble of nobleGases) {
    const atkRed = noble.stats?.atk_red ?? 0;
    assert(
      atkRed <= 15,
      `Expected noble gas ${noble.symbol} ATK_red <= 15, got ${atkRed}`
    );
  }
  const he = ALL_ELEMENTS.find(e => e.symbol === 'He');
  assert.strictEqual(he?.stats?.atk_red, 5);
});

// 7. Period 4 3d-Transition Series & Subshell Stability Anomalies
console.log('\n--- 7. Period 4 3d-Transition Series & Subshell Stability Anomalies ---');

it('Period 4 transition series contains exactly 10 elements (Sc to Zn)', () => {
  const p4d = ALL_ELEMENTS.filter(e => e.period === 4 && e.category === 'TRANSITION_METAL').sort((a, b) => a.z - b.z);
  assert.strictEqual(p4d.length, 10);
  const symbols = p4d.map(e => e.symbol);
  assert.deepStrictEqual(symbols, ['Sc', 'Ti', 'V', 'Cr', 'Mn', 'Fe', 'Co', 'Ni', 'Cu', 'Zn']);
});

it('Chromium (Z=24) and Copper (Z=29) exhibit subshell promotional anomalies in electron configs', () => {
  const cr = ALL_ELEMENTS.find(e => e.symbol === 'Cr');
  const cu = ALL_ELEMENTS.find(e => e.symbol === 'Cu');
  assert(cr && cu);
  assert(cr.electron_config.includes('3d5') || cr.electron_config.includes('3d⁵'), `Expected Cr 3d5, got ${cr.electron_config}`);
  assert(cu.electron_config.includes('3d10') || cu.electron_config.includes('3d¹⁰'), `Expected Cu 3d10, got ${cu.electron_config}`);
});

it('Zinc (Z=30) full 3d¹⁰ 4s² shell exhibits higher I₁ than Copper (Z=29) 3d¹⁰ 4s¹', () => {
  const zn = ALL_ELEMENTS.find(e => e.symbol === 'Zn');
  const cu = ALL_ELEMENTS.find(e => e.symbol === 'Cu');
  assert(zn && cu);
  assert(
    zn.first_ionization_energy > cu.first_ionization_energy,
    `Expected I1(Zn) > I1(Cu), got Zn=${zn.first_ionization_energy}, Cu=${cu.first_ionization_energy}`
  );
  assert.strictEqual(zn.first_ionization_energy, 906.4);
  assert.strictEqual(cu.first_ionization_energy, 745.5);
});

// 8. Tactical Oxidizing Power (ATK_ox) Calibration
console.log('\n--- 8. Tactical Oxidizing Power (ATK_ox) Calibration ---');

it('Fluorine reaches maximum ATK_ox (100) and halogens follow strict monotonic oxidizing hierarchy (F > Cl > Br > I >= 50)', () => {
  const f = ALL_ELEMENTS.find(e => e.symbol === 'F');
  const cl = ALL_ELEMENTS.find(e => e.symbol === 'Cl');
  const br = ALL_ELEMENTS.find(e => e.symbol === 'Br');
  const i = ALL_ELEMENTS.find(e => e.symbol === 'I');
  assert(f && cl && br && i);

  assert.strictEqual(f.stats?.atk_ox, 100);
  assert.strictEqual(cl.stats?.atk_ox, 70);
  assert.strictEqual(br.stats?.atk_ox, 63);
  assert.strictEqual(i.stats?.atk_ox, 54);

  assert(f.stats.atk_ox > cl.stats.atk_ox);
  assert(cl.stats.atk_ox > br.stats.atk_ox);
  assert(br.stats.atk_ox > i.stats.atk_ox);
  assert(i.stats.atk_ox >= 50);
});

// 9. Standard State Physical Aggregates at 298.15 K
console.log('\n--- 9. Standard State Aggregate Phases at 298.15 K ---');

it('Standard state partitions all 118 elements: exactly 11 gases, 3 liquids, and 104 solids', () => {
  const gases = ALL_ELEMENTS.filter(e => e.standard_state === 'GAS');
  const liquids = ALL_ELEMENTS.filter(e => e.standard_state === 'LIQUID');
  const solids = ALL_ELEMENTS.filter(e => e.standard_state === 'SOLID');

  assert.strictEqual(gases.length, 11, `Expected exactly 11 gases, got ${gases.length}`);
  assert.strictEqual(liquids.length, 3, `Expected exactly 3 liquids, got ${liquids.length}`);
  assert.strictEqual(solids.length, 104, `Expected exactly 104 solids, got ${solids.length}`);
  assert.strictEqual(gases.length + liquids.length + solids.length, 118, 'Sum must equal 118');

  // Verify the 11 canonical gases
  const gasSymbols = gases.map(e => e.symbol).sort();
  const expectedGases = ['Ar', 'Cl', 'F', 'H', 'He', 'Kr', 'N', 'Ne', 'O', 'Rn', 'Xe'].sort();
  assert.deepStrictEqual(gasSymbols, expectedGases);

  // Verify liquids
  const liquidSymbols = liquids.map(e => e.symbol).sort();
  assert.deepStrictEqual(liquidSymbols, ['Br', 'Cn', 'Hg'].sort());
});

// 10. Oxidation State Extremes & Invariants
console.log('\n--- 10. Oxidation State Extremes & Invariants ---');

it('Fluorine strictly only exhibits -1 oxidation state in chemical compounds', () => {
  const f = ALL_ELEMENTS.find(e => e.symbol === 'F');
  assert(f);
  assert.deepStrictEqual(f.oxidation_states, [-1], 'Fluorine can only have oxidation state -1');
});

it('Manganese reaches +7 and Osmium reaches maximum +8 oxidation state', () => {
  const mn = ALL_ELEMENTS.find(e => e.symbol === 'Mn');
  const os = ALL_ELEMENTS.find(e => e.symbol === 'Os');
  assert(mn && os);
  assert.ok(mn.oxidation_states.includes(7), 'Mn must exhibit +7 in permanganate');
  assert.ok(os.oxidation_states.includes(8), 'Os must exhibit +8 in osmium tetroxide');
});

it('All Group 1 alkali metals strictly possess +1 oxidation state in compounds', () => {
  const alkalis = ALL_ELEMENTS.filter(e => e.group === 1 && e.symbol !== 'H');
  assert.strictEqual(alkalis.length, 6); // Li, Na, K, Rb, Cs, Fr
  for (const alkali of alkalis) {
    assert.deepStrictEqual(alkali.oxidation_states, [1], `${alkali.symbol} must only exhibit +1`);
  }
});

it('All Group 2 alkaline earth metals strictly possess +2 oxidation state in compounds', () => {
  const alkalines = ALL_ELEMENTS.filter(e => e.group === 2);
  assert.strictEqual(alkalines.length, 6); // Be, Mg, Ca, Sr, Ba, Ra
  for (const alkaline of alkalines) {
    assert.deepStrictEqual(alkaline.oxidation_states, [2], `${alkaline.symbol} must only exhibit +2`);
  }
});

// 11. First Ionization Energy Global Extremes & Group 18 Monotonic Column Trend
console.log('\n--- 11. First Ionization Energy Global Extremes & Group 18 Trend ---');

it('Helium has the highest I₁ (2372.3 kJ/mol) and Caesium has lowest I₁ (375.7 kJ/mol)', () => {
  const he = ALL_ELEMENTS.find(e => e.symbol === 'He');
  const cs = ALL_ELEMENTS.find(e => e.symbol === 'Cs');
  assert(he && cs);

  // Helium is maximum among all 118 elements
  for (const elem of ALL_ELEMENTS) {
    assert.ok(
      he.first_ionization_energy >= elem.first_ionization_energy,
      `Helium I1 (${he.first_ionization_energy}) must be >= ${elem.symbol} (${elem.first_ionization_energy})`
    );
  }

  assert.strictEqual(he.first_ionization_energy, 2372.3);
  assert.strictEqual(cs.first_ionization_energy, 375.7);
});

it('Group 18 noble gases exhibit strictly monotonic decreasing I₁ down the group column', () => {
  const nobleGases = ALL_ELEMENTS.filter(e => e.group === 18).sort((a, b) => a.period - b.period);
  assert.strictEqual(nobleGases.length, 7); // He, Ne, Ar, Kr, Xe, Rn, Og

  for (let i = 0; i < nobleGases.length - 1; i++) {
    const cur = nobleGases[i];
    const next = nobleGases[i + 1];
    assert.ok(
      cur.first_ionization_energy > next.first_ionization_energy,
      `Group 18 monotonicity violation: ${cur.symbol} (${cur.first_ionization_energy}) must be > ${next.symbol} (${next.first_ionization_energy})`
    );
  }
});

console.log('============================================================');
console.log(` AUDIT RESULT: ${passedAssertions} PASSED, 0 FAILED`);
console.log('============================================================\n');
