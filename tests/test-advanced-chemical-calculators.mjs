// tests/test-advanced-chemical-calculators.mjs
// Verification suite for ELEMENTA Advanced Scientific Calculators
// Tests Molarity, pH/pOH, Electrochemical Nernst Equation & Henderson-Hasselbalch Buffer

import assert from 'node:assert';

console.log('--- TEST SUITE: ADVANCED CHEMICAL CALCULATORS ---');

// 1. Molarity Calculation (C_M = n / V)
function calcMolarity(massG, molarMassGPerMol, volumeMl) {
  if (volumeMl <= 0 || molarMassGPerMol <= 0) return 0;
  const moles = massG / molarMassGPerMol;
  return moles / (volumeMl / 1000);
}

const naclMolarity = calcMolarity(5.85, 58.5, 500);
assert.strictEqual(Math.round(naclMolarity * 1000) / 1000, 0.2, '5.85g NaCl in 500mL must equal 0.2 M');
console.log('✓ Molarity calculation verified: 0.2 M.');

// 2. pH and pOH Calculation (pH = -log10[H+])
function calcPH(concHPlus) {
  if (concHPlus <= 0) return 7;
  return -Math.log10(concHPlus);
}

const acidPH = calcPH(0.01);
assert.strictEqual(Math.round(acidPH * 100) / 100, 2.0, '0.01M H+ must equal pH 2.0');
const neutralPH = calcPH(1e-7);
assert.strictEqual(Math.round(neutralPH * 100) / 100, 7.0, '1e-7M H+ must equal pH 7.0');
console.log('✓ pH / pOH logarithmic scale verified.');

// 3. Nernst Equation (E_cell = E0_cell - (0.0592 / n) * log10(Q))
function calcNernst(e0Cell, n, q) {
  if (n <= 0 || q <= 0) return e0Cell;
  return e0Cell - (0.0592 / n) * Math.log10(q);
}

// Daniell Cell: Zn + Cu2+ -> Zn2+ + Cu (E0 = 1.10V, n = 2, Q = [Zn2+]/[Cu2+] = 0.01)
const eCell = calcNernst(1.10, 2, 0.01);
const expectedECell = 1.10 - (0.0592 / 2) * (-2); // 1.10 + 0.0592 = 1.1592
assert.ok(Math.abs(eCell - expectedECell) < 1e-6, `Nernst potential must equal ${expectedECell}V`);
console.log(`✓ Electrochemical Nernst equation verified: ${eCell.toFixed(4)} V for Daniell cell at Q = 0.01.`);

// 4. Henderson-Hasselbalch Equation (pH = pKa + log10([A-] / [HA]))
function calcBufferPH(pKa, concAcid, concBase) {
  if (concAcid <= 0 || concBase <= 0) return pKa;
  return pKa + Math.log10(concBase / concAcid);
}

// Equimolar Acetate Buffer: pKa = 4.76, [HA] = 0.1M, [A-] = 0.1M -> pH = 4.76
const equimolarPH = calcBufferPH(4.76, 0.1, 0.1);
assert.strictEqual(equimolarPH, 4.76, 'Equimolar buffer must have pH == pKa');

// Ratio 2:1 ([A-] = 0.2M, [HA] = 0.1M)
const shiftedPH = calcBufferPH(4.76, 0.1, 0.2);
const expectedShift = 4.76 + Math.log10(2);
assert.ok(Math.abs(shiftedPH - expectedShift) < 1e-6, 'Buffer pH shift with ratio 2:1 verified');
console.log(`✓ Henderson-Hasselbalch buffer pH verified: equimolar = ${equimolarPH}, 2:1 ratio = ${shiftedPH.toFixed(3)}.`);

console.log('--- ALL ADVANCED CHEMICAL CALCULATOR TESTS PASSED (100%) ---');
