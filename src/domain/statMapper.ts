// src/domain/statMapper.ts
// Mathematical Game Mapping directly from IUPAC ground truth constants (Table 2 & 3 in Document)

import { ElementCategory } from './types';

export function calculateAtkOx(electronegativity: number | null, category: ElementCategory): number {
  // Group VIIIA (Noble gases) have no Pauling electronegativity -> routed to Shield archetype (ATK_ox = 5)
  if (category === 'NOBLE_GAS' || electronegativity === null || isNaN(electronegativity)) {
    return 5;
  }
  const chiMin = 0.79; // Cesium
  const chiMax = 3.98; // Fluorine
  const clampedChi = Math.max(chiMin, Math.min(chiMax, electronegativity));
  const normalized = (clampedChi - chiMin) / (chiMax - chiMin);
  const powerVal = Math.pow(normalized, 1.35);
  return Math.round(10 + 90 * powerVal);
}

export function calculateAtkRed(firstIeKjMol: number, category: ElementCategory): number {
  const ieMin = 375.7;  // Cesium
  const ieMax = 2372.3; // Helium
  const clampedIe = Math.max(ieMin, Math.min(ieMax, firstIeKjMol));

  // Category multiplier kappa_grp
  let kappa = 0.25; // Default for nonmetals & noble gases
  if (category === 'ALKALI_METAL') {
    kappa = 1.05;
  } else if (category === 'ALKALINE_EARTH') {
    kappa = 0.90;
  } else if (category === 'TRANSITION_METAL' || category === 'POST_TRANSITION') {
    kappa = 0.72;
  } else if (category === 'METALLOID') {
    kappa = 0.50;
  }

  const logRatio = Math.log(ieMax / clampedIe) / Math.log(ieMax / ieMin);
  const raw = (10 + 90 * logRatio) * kappa;
  return Math.round(Math.max(5, Math.min(100, raw)));
}

export function calculateDefStab(firstIeKjMol: number, symbol: string, category: ElementCategory): number {
  const ieMin = 375.7;
  const ieMax = 2372.3;
  const clampedIe = Math.max(ieMin, Math.min(ieMax, firstIeKjMol));

  // Crystal lattice & standard reduction potential inertness coefficient beta_inert
  // Calibrated to match Table 3 in GDPT 2018 Thuyết Minh: Au DEF=96, Cu DEF=82, Fe DEF=77
  let betaInert = 0;
  if (symbol === 'Au') betaInert = 63; // 10 + 88 * 0.258 + 63 = 96
  else if (symbol === 'Ag' || symbol === 'Pt') betaInert = 52;
  else if (symbol === 'Cu') betaInert = 56; // 10 + 88 * 0.1852 + 56 = 82
  else if (symbol === 'Fe' || symbol === 'Ni' || symbol === 'Co') betaInert = 50; // 10 + 88 * 0.1937 + 50 = 77
  else if (symbol === 'Zn' || symbol === 'Al' || symbol === 'Cr') betaInert = 45;
  else if (category === 'NOBLE_GAS') betaInert = 0; // Noble gas DEF is already maximized by huge I1 (He: 2372.3 -> ~98-100)

  const normalized = (clampedIe - ieMin) / (ieMax - ieMin);
  const raw = 10 + 88 * normalized + betaInert;
  return Math.round(Math.max(10, Math.min(100, raw)));
}

export function calculateManaCost(period: number, category: ElementCategory, defStab: number): number {
  let deltaRole = 0;
  if (category === 'NOBLE_GAS') deltaRole = 0;
  if (defStab >= 90) deltaRole = 1; // High tier noble metals or ultra shields
  const raw = 1 + Math.floor(0.75 * period) + deltaRole;
  return Math.max(1, Math.min(5, raw));
}
