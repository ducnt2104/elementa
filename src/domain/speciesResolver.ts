// src/domain/speciesResolver.ts
// Distinct Chemical Species Representation for ELEMENTA (Separating ElementCard from ChemicalSpecies)

export type SpeciesType = 'ELEMENT_SOLID' | 'ELEMENT_GAS' | 'ELEMENT_LIQUID' | 'AQUEOUS_ION' | 'PRECIPITATE_SOLID' | 'COMPOUND_AQUEOUS' | 'COMPOUND_GAS' | 'COMPOUND_LIQUID';

export interface ChemicalSpecies {
  id: string;
  formula: string; // e.g. "Na", "H2O", "Fe3O4", "BaSO4", "H+", "OH-", "Ba2+", "SO4^2-", "Fe2O3*xH2O"
  formulaDisplay: string; // e.g. "Na(s)", "H₂O(l)", "BaSO₄(s)↓", "H⁺(aq)", "OH⁻(aq)", "Ba²⁺(aq)", "SO₄²⁻(aq)"
  nameVI: string;
  nameIUPAC: string;
  type: SpeciesType;
  charge: number; // 0 for neutral molecules/atoms, +1, +2, -1, -2, etc.
  atomicComposition: Record<string, number>; // e.g. { Ba: 1, S: 1, O: 4 }
  parentElements: string[]; // Symbols: ['Ba', 'S', 'O']
  isPrecipitate: boolean;
  isGas: boolean;
  solubilityNote?: string;
}

export const CHEMICAL_SPECIES_CATALOG: Record<string, ChemicalSpecies> = {
  // Pure elemental solids
  'Na_s': {
    id: 'Na_s', formula: 'Na', formulaDisplay: 'Na(s)', nameVI: 'Natri kim loại', nameIUPAC: 'Sodium metal',
    type: 'ELEMENT_SOLID', charge: 0, atomicComposition: { Na: 1 }, parentElements: ['Na'], isPrecipitate: false, isGas: false
  },
  'K_s': {
    id: 'K_s', formula: 'K', formulaDisplay: 'K(s)', nameVI: 'Kali kim loại', nameIUPAC: 'Potassium metal',
    type: 'ELEMENT_SOLID', charge: 0, atomicComposition: { K: 1 }, parentElements: ['K'], isPrecipitate: false, isGas: false
  },
  'Ca_s': {
    id: 'Ca_s', formula: 'Ca', formulaDisplay: 'Ca(s)', nameVI: 'Canxi kim loại', nameIUPAC: 'Calcium metal',
    type: 'ELEMENT_SOLID', charge: 0, atomicComposition: { Ca: 1 }, parentElements: ['Ca'], isPrecipitate: false, isGas: false
  },
  'Ba_s': {
    id: 'Ba_s', formula: 'Ba', formulaDisplay: 'Ba(s)', nameVI: 'Bari kim loại', nameIUPAC: 'Barium metal',
    type: 'ELEMENT_SOLID', charge: 0, atomicComposition: { Ba: 1 }, parentElements: ['Ba'], isPrecipitate: false, isGas: false
  },
  'Fe_s': {
    id: 'Fe_s', formula: 'Fe', formulaDisplay: 'Fe(s)', nameVI: 'Sắt kim loại', nameIUPAC: 'Iron metal',
    type: 'ELEMENT_SOLID', charge: 0, atomicComposition: { Fe: 1 }, parentElements: ['Fe'], isPrecipitate: false, isGas: false
  },
  'Cu_s': {
    id: 'Cu_s', formula: 'Cu', formulaDisplay: 'Cu(s)', nameVI: 'Đồng kim loại', nameIUPAC: 'Copper metal',
    type: 'ELEMENT_SOLID', charge: 0, atomicComposition: { Cu: 1 }, parentElements: ['Cu'], isPrecipitate: false, isGas: false
  },
  'Zn_s': {
    id: 'Zn_s', formula: 'Zn', formulaDisplay: 'Zn(s)', nameVI: 'Kẽm kim loại', nameIUPAC: 'Zinc metal',
    type: 'ELEMENT_SOLID', charge: 0, atomicComposition: { Zn: 1 }, parentElements: ['Zn'], isPrecipitate: false, isGas: false
  },
  'Ag_s': {
    id: 'Ag_s', formula: 'Ag', formulaDisplay: 'Ag(s)', nameVI: 'Bạc kim loại', nameIUPAC: 'Silver metal',
    type: 'ELEMENT_SOLID', charge: 0, atomicComposition: { Ag: 1 }, parentElements: ['Ag'], isPrecipitate: false, isGas: false
  },
  'Au_s': {
    id: 'Au_s', formula: 'Au', formulaDisplay: 'Au(s)', nameVI: 'Vàng kim loại', nameIUPAC: 'Gold metal',
    type: 'ELEMENT_SOLID', charge: 0, atomicComposition: { Au: 1 }, parentElements: ['Au'], isPrecipitate: false, isGas: false
  },
  'Mg_s': {
    id: 'Mg_s', formula: 'Mg', formulaDisplay: 'Mg(s)', nameVI: 'Magie kim loại', nameIUPAC: 'Magnesium metal',
    type: 'ELEMENT_SOLID', charge: 0, atomicComposition: { Mg: 1 }, parentElements: ['Mg'], isPrecipitate: false, isGas: false
  },
  'Al_s': {
    id: 'Al_s', formula: 'Al', formulaDisplay: 'Al(s)', nameVI: 'Nhôm kim loại', nameIUPAC: 'Aluminium metal',
    type: 'ELEMENT_SOLID', charge: 0, atomicComposition: { Al: 1 }, parentElements: ['Al'], isPrecipitate: false, isGas: false
  },

  // Gases
  'O2_g': {
    id: 'O2_g', formula: 'O2', formulaDisplay: 'O₂(g)', nameVI: 'Khí Oxygen', nameIUPAC: 'Oxygen gas',
    type: 'ELEMENT_GAS', charge: 0, atomicComposition: { O: 2 }, parentElements: ['O'], isPrecipitate: false, isGas: true
  },
  'H2_g': {
    id: 'H2_g', formula: 'H2', formulaDisplay: 'H₂(g)↑', nameVI: 'Khí Hydrogen', nameIUPAC: 'Hydrogen gas',
    type: 'ELEMENT_GAS', charge: 0, atomicComposition: { H: 2 }, parentElements: ['H'], isPrecipitate: false, isGas: true
  },
  'Cl2_g': {
    id: 'Cl2_g', formula: 'Cl2', formulaDisplay: 'Cl₂(g)', nameVI: 'Khí Chlorine', nameIUPAC: 'Chlorine gas',
    type: 'ELEMENT_GAS', charge: 0, atomicComposition: { Cl: 2 }, parentElements: ['Cl'], isPrecipitate: false, isGas: true
  },
  'He_g': {
    id: 'He_g', formula: 'He', formulaDisplay: 'He(g)', nameVI: 'Khí Helium trơ', nameIUPAC: 'Helium gas',
    type: 'ELEMENT_GAS', charge: 0, atomicComposition: { He: 1 }, parentElements: ['He'], isPrecipitate: false, isGas: true
  },
  'Ne_g': {
    id: 'Ne_g', formula: 'Ne', formulaDisplay: 'Ne(g)', nameVI: 'Khí Neon trơ', nameIUPAC: 'Neon gas',
    type: 'ELEMENT_GAS', charge: 0, atomicComposition: { Ne: 1 }, parentElements: ['Ne'], isPrecipitate: false, isGas: true
  },

  // Liquids
  'H2O_l': {
    id: 'H2O_l', formula: 'H2O', formulaDisplay: 'H₂O(l)', nameVI: 'Nước / Dung môi', nameIUPAC: 'Water',
    type: 'COMPOUND_LIQUID', charge: 0, atomicComposition: { H: 2, O: 1 }, parentElements: ['H', 'O'], isPrecipitate: false, isGas: false
  },

  // Ions in aqueous solution
  'H_plus_aq': {
    id: 'H_plus_aq', formula: 'H+', formulaDisplay: 'H⁺(aq)', nameVI: 'Ion Hydrogen (Acid)', nameIUPAC: 'Hydrogen ion',
    type: 'AQUEOUS_ION', charge: 1, atomicComposition: { H: 1 }, parentElements: ['H'], isPrecipitate: false, isGas: false
  },
  'OH_minus_aq': {
    id: 'OH_minus_aq', formula: 'OH-', formulaDisplay: 'OH⁻(aq)', nameVI: 'Ion Hydroxide (Kiềm)', nameIUPAC: 'Hydroxide ion',
    type: 'AQUEOUS_ION', charge: -1, atomicComposition: { O: 1, H: 1 }, parentElements: ['O', 'H'], isPrecipitate: false, isGas: false
  },
  'Ba_2plus_aq': {
    id: 'Ba_2plus_aq', formula: 'Ba2+', formulaDisplay: 'Ba²⁺(aq)', nameVI: 'Ion Barium trong dung dịch', nameIUPAC: 'Barium(II) ion',
    type: 'AQUEOUS_ION', charge: 2, atomicComposition: { Ba: 1 }, parentElements: ['Ba'], isPrecipitate: false, isGas: false
  },
  'SO4_2minus_aq': {
    id: 'SO4_2minus_aq', formula: 'SO4^2-', formulaDisplay: 'SO₄²⁻(aq)', nameVI: 'Ion Sulfate trong dung dịch', nameIUPAC: 'Sulfate ion',
    type: 'AQUEOUS_ION', charge: -2, atomicComposition: { S: 1, O: 4 }, parentElements: ['S', 'O'], isPrecipitate: false, isGas: false
  },
  'Ag_plus_aq': {
    id: 'Ag_plus_aq', formula: 'Ag+', formulaDisplay: 'Ag⁺(aq)', nameVI: 'Ion Bạc trong dung dịch', nameIUPAC: 'Silver(I) ion',
    type: 'AQUEOUS_ION', charge: 1, atomicComposition: { Ag: 1 }, parentElements: ['Ag'], isPrecipitate: false, isGas: false
  },
  'Cl_minus_aq': {
    id: 'Cl_minus_aq', formula: 'Cl-', formulaDisplay: 'Cl⁻(aq)', nameVI: 'Ion Chloride trong dung dịch', nameIUPAC: 'Chloride ion',
    type: 'AQUEOUS_ION', charge: -1, atomicComposition: { Cl: 1 }, parentElements: ['Cl'], isPrecipitate: false, isGas: false
  },

  // Insoluble Precipitates & Oxides
  'BaSO4_s': {
    id: 'BaSO4_s', formula: 'BaSO4', formulaDisplay: 'BaSO₄(s)↓', nameVI: 'Barium sulfate (Kết tủa trắng)', nameIUPAC: 'Barium sulfate',
    type: 'PRECIPITATE_SOLID', charge: 0, atomicComposition: { Ba: 1, S: 1, O: 4 }, parentElements: ['Ba', 'S', 'O'], isPrecipitate: true, isGas: false, solubilityNote: 'Không tan trong nước và acid mạnh'
  },
  'AgCl_s': {
    id: 'AgCl_s', formula: 'AgCl', formulaDisplay: 'AgCl(s)↓', nameVI: 'Bạc clorua (Kết tủa trắng)', nameIUPAC: 'Silver chloride',
    type: 'PRECIPITATE_SOLID', charge: 0, atomicComposition: { Ag: 1, Cl: 1 }, parentElements: ['Ag', 'Cl'], isPrecipitate: true, isGas: false, solubilityNote: 'Kết tủa trắng nhạy sáng hóa xám đen'
  },
  'Fe3O4_s': {
    id: 'Fe3O4_s', formula: 'Fe3O4', formulaDisplay: 'Fe₃O₄(s)', nameVI: 'Oxide sắt từ (Magnetite)', nameIUPAC: 'Iron(II,III) oxide',
    type: 'PRECIPITATE_SOLID', charge: 0, atomicComposition: { Fe: 3, O: 4 }, parentElements: ['Fe', 'O'], isPrecipitate: false, isGas: false
  },
  'Fe2O3_rust': {
    id: 'Fe2O3_rust', formula: '2Fe2O3*xH2O', formulaDisplay: '2Fe₂O₃·xH₂O(s)', nameVI: 'Gỉ sắt xốp ngậm nước', nameIUPAC: 'Hydrated iron(III) oxide (rust)',
    type: 'PRECIPITATE_SOLID', charge: 0, atomicComposition: { Fe: 4, O: 6 }, parentElements: ['Fe', 'O', 'H'], isPrecipitate: true, isGas: false
  },
  'MgO_s': {
    id: 'MgO_s', formula: 'MgO', formulaDisplay: 'MgO(s)', nameVI: 'Magnesium oxide (Bột trắng)', nameIUPAC: 'Magnesium oxide',
    type: 'PRECIPITATE_SOLID', charge: 0, atomicComposition: { Mg: 1, O: 1 }, parentElements: ['Mg', 'O'], isPrecipitate: false, isGas: false
  },
  'FeCl3_s': {
    id: 'FeCl3_s', formula: 'FeCl3', formulaDisplay: 'FeCl₃(s)', nameVI: 'Sắt(III) clorua', nameIUPAC: 'Iron(III) chloride',
    type: 'PRECIPITATE_SOLID', charge: 0, atomicComposition: { Fe: 1, Cl: 3 }, parentElements: ['Fe', 'Cl'], isPrecipitate: false, isGas: false
  },
  'AlOH4_minus': {
    id: 'AlOH4_minus', formula: '[Al(OH)4]-', formulaDisplay: '[Al(OH)₄]⁻(aq)', nameVI: 'Ion Tetrahydroxoaluminate', nameIUPAC: 'Tetrahydroxoaluminate ion',
    type: 'AQUEOUS_ION', charge: -1, atomicComposition: { Al: 1, O: 4, H: 4 }, parentElements: ['Al', 'O', 'H'], isPrecipitate: false, isGas: false
  }
};
