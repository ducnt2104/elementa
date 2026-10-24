// scripts/gen-batches-11-to-14.ts
// Generator for Batches 11 to 14: 300 Extra Deck Monsters (Fusion, Synchro, Xyz, Link)

import { CardDef, getRarity, writeBatchFile } from './build-all-card-batches';

console.log('[BATCH 11-14] Synthesizing 300 Extra Deck Monsters (Fusion, Synchro, Xyz, Link)...');

// ==========================================
// BATCH 11: 75 Fusion / Compound Monsters
// ==========================================
const batch11Cards: CardDef[] = [];

const fusionCompounds = [
  { name: 'Nước Tinh Khiết', en: 'Pure Water Crystal', f: 'H2O', attr: 'AQUA' as const, r: [{ formula: 'H2', count: 2 }, { formula: 'O2', count: 1 }], eq: '2H₂ + O₂ → 2H₂O' },
  { name: 'Nhiệt Nhôm Thermite', en: 'Thermite Ignition Titan', f: 'Fe+Al2O3', attr: 'PYRO' as const, r: [{ formula: 'Fe2O3', count: 1 }, { formula: 'Al', count: 2 }], eq: 'Fe₂O₃ + 2Al → 2Fe + Al₂O₃ (2500°C)' },
  { name: 'Nước Cường Toan Aqua Regia', en: 'Aqua Regia Sovereign', f: 'HNO3·3HCl', attr: 'ACID_DARK' as const, r: [{ formula: 'HNO3', count: 1 }, { formula: 'HCl', count: 3 }], eq: 'Au + 3HNO₃ + 4HCl → HAuCl₄ + 3NO₂ + 3H₂O' },
  { name: 'Đồng Thau Hợp Kim Brass', en: 'Brass Alloy Golem', f: 'Cu-Zn', attr: 'TERRA' as const, r: [{ formula: 'Cu', count: 1 }, { formula: 'Zn', count: 1 }], eq: 'Cu + Zn → Cu-Zn Alloy Solid Solution' },
  { name: 'Đồng Điếu Bronze Phù Điêu', en: 'Bronze Ancient Relic', f: 'Cu-Sn', attr: 'TERRA' as const, r: [{ formula: 'Cu', count: 3 }, { formula: 'Sn', count: 1 }], eq: 'Cu + Sn → Bronze Crystalline Matrix' },
  { name: 'Thép Hợp Kim Carbon-Sắt', en: 'High Carbon Steel Titan', f: 'Fe-C', attr: 'TERRA' as const, r: [{ formula: 'Fe', count: 3 }, { formula: 'C', count: 1 }], eq: 'Fe + C → Fe₃C Cementite Pearlite' },
  { name: 'Aspirin Axetylsalixylic', en: 'Aspirin Pain Sovereign', f: 'C9H8O4', attr: 'AQUA' as const, r: [{ formula: 'Salicylic', count: 1 }, { formula: 'AceticAnhydride', count: 1 }], eq: 'C₇H₆O₃ + C₄H₆O₃ → C₉H₈O₄ + CH₃COOH' },
  { name: 'Xà Phòng Natri Stearat', en: 'Saponified Stearate Colossus', f: 'C17H35COONa', attr: 'TERRA' as const, r: [{ formula: 'Fat', count: 1 }, { formula: 'NaOH', count: 3 }], eq: '(C₁₇H₃₅COO)₃C₃H₅ + 3NaOH → 3C₁₇H₃₅COONa + C₃H₅(OH)₃' },
  { name: 'Thuốc Súng Đen Pháo Hoa', en: 'Black Powder Pyroflame', f: 'KNO3-C-S', attr: 'PYRO' as const, r: [{ formula: 'KNO3', count: 2 }, { formula: 'C', count: 3 }, { formula: 'S', count: 1 }], eq: '2KNO₃ + S + 3C → K₂S + N₂ + 3CO₂' },
  { name: 'Phèn Chua Kali Nhôm', en: 'Potash Alum Octahedron', f: 'KAl(SO4)2·12H2O', attr: 'AQUA' as const, r: [{ formula: 'K2SO4', count: 1 }, { formula: 'Al2(SO4)3', count: 1 }], eq: 'K₂SO₄ + Al₂(SO₄)₃ + 24H₂O → 2KAl(SO₄)₂·12H₂O' }
];

for (let i = 0; i < 75; i++) {
  const base = fusionCompounds[i % fusionCompounds.length];
  const iteration = Math.floor(i / fusionCompounds.length) + 1;
  const level = 5 + (i % 6); // 5 to 10
  const baseAtk = 2000 + (level * 160) + ((i % 4) * 50);
  const baseDef = 1800 + (level * 150) + ((i % 5) * 60);

  const card: CardDef = {
    id: `card_b11_${String(i + 1).padStart(3, '0')}_fusion_${base.en.toLowerCase().replace(/[^a-z0-9]/g, '_')}_${i + 1}`,
    name: `${base.name} — Hợp Chất Tổng Hợp Bậc ${iteration}`,
    name_en: `${base.en} — Synthesis Compound Mk-${iteration}`,
    cardType: 'COMPOUND_MONSTER',
    rarity: getRarity(i + 3),
    attribute: base.attr,
    manaCost: Math.min(8, Math.max(3, Math.floor(level / 1.1))),
    level,
    atk: baseAtk,
    def: baseDef,
    chemicalFormula: base.f,
    effectCode: `COMP_B11_${base.en.toUpperCase().replace(/[^A-Z0-9]/g, '_')}_SYN_${i + 1}`,
    effectText: `[Triệu hồi Hợp Chất / Fusion]: Cần kết hợp đúng nguyên liệu hóa học. Khi triệu hồi thành công: Phục hồi 400 LP cho bản thân và gây 400 LP sát thương phản ứng lên đối thủ.`,
    scientificLore: `Hợp chất ${base.name} (${base.f}) tổng hợp từ phản ứng hóa học kinh điển theo tỷ lệ mol bảo toàn nguyên tố GDPT 2018: ${base.eq}.`,
    relatedEquation: base.eq,
    iupacName: `${base.en} Complex`,
    archetype: i % 2 === 0 ? 'WERNER_COORDINATION' : 'PETROCHEMICAL_REFINERY',
    structuredEffects: [
      {
        effectId: `B11_EFF_${i + 1}`,
        activationWindow: 'ON_SUMMON',
        operations: [
          { op: 'HEAL_LP', params: { amount: 400 } },
          { op: 'BURN_DAMAGE', params: { amount: 400 } }
        ],
        description: 'Phản ứng tổng hợp: Hồi 400 LP và gây 400 LP sát thương.'
      }
    ]
  };

  batch11Cards.push(card);
}
writeBatchFile('batch_11_extra_deck_fusion_compounds.ts', 'BATCH_11_CARDS', 'Batch 11: Extra Deck Fusion / Compound Monsters', batch11Cards);

// ==========================================
// BATCH 12: 75 Synchro Monsters
// ==========================================
const batch12Cards: CardDef[] = [];

const synchroCatalysts = [
  { name: 'Xúc Tác Bạch Kim Chuyển Hóa', en: 'Platinum Catalytic Converter', f: 'Pt/Rh/Pd', attr: 'NOBLE_VOID' as const, eq: '2CO + 2NO → 2CO₂ + N₂' },
  { name: 'Enzyme Đồng Bộ Amylase', en: 'Alpha-Amylase Synchro Enzyme', f: 'Enzyme', attr: 'AQUA' as const, eq: '(C₆H₁₀O₅)n + nH₂O --Amylase--> nC₁₂H₂₂O₁₁' },
  { name: 'Quang Xúc Tác Titan Dioxit', en: 'TiO2 Photocatalytic Resonance', f: 'TiO2/UV', attr: 'ELECTRO' as const, eq: 'TiO₂ + hν → e⁻ + h⁺ → ·OH + ·O₂⁻' },
  { name: 'Xúc Tác Sắt Tổng Hợp Amoniac', en: 'Haber Iron Catalyst Core', f: 'Fe-K2O-Al2O3', attr: 'PYRO' as const, eq: 'N₂ + 3H₂ --Fe/450°C/200atm--> 2NH₃' },
  { name: 'Xúc Tác Vani Đen Tiếp Xúc', en: 'Vanadium Pentoxide Converter', f: 'V2O5', attr: 'TERRA' as const, eq: '2SO₂ + O₂ --V₂O₅/450°C--> 2SO₃' },
  { name: 'Xúc Tác Cơ Kim Metallocene', en: 'Metallocene Stereospecific Synchro', f: 'Cp2ZrCl2', attr: 'ELECTRO' as const, eq: 'Isotactic Polypropylene Synthesis Center' },
  { name: 'Phức Xúc Tác Grubbs Đổi Vị', en: 'Grubbs Olefin Metathesis Engine', f: 'Ru-Carbene', attr: 'TERRA' as const, eq: 'Alkene Metathesis Cleavage & Recombination' },
  { name: 'Men Sinh Học Lipase', en: 'Lipase Biocatalyst Resonance', f: 'Lipase', attr: 'AQUA' as const, eq: 'Triglyceride Hydrolysis Active Site' }
];

for (let i = 0; i < 75; i++) {
  const base = synchroCatalysts[i % synchroCatalysts.length];
  const iteration = Math.floor(i / synchroCatalysts.length) + 1;
  const synchroLevel = 5 + (i % 6); // 5 to 10
  const baseAtk = 2200 + (synchroLevel * 170) + ((i % 4) * 40);
  const baseDef = 1900 + (synchroLevel * 160) + ((i % 5) * 50);

  const card: CardDef = {
    id: `card_b12_${String(i + 1).padStart(3, '0')}_synchro_${base.en.toLowerCase().replace(/[^a-z0-9]/g, '_')}_${i + 1}`,
    name: `${base.name} — Bậc ${synchroLevel} (Cộng Hưởng ${iteration})`,
    name_en: `${base.en} — Level ${synchroLevel} Synchro ${iteration}`,
    cardType: 'SYNCHRO_MONSTER',
    rarity: getRarity(i + 4),
    attribute: base.attr,
    manaCost: Math.min(8, Math.max(3, Math.floor(synchroLevel / 1.1))),
    level: synchroLevel,
    synchroLevel,
    synchroMaterialsRequired: { tunerCount: 1, nonTunerMinCount: 1 },
    atk: baseAtk,
    def: baseDef,
    chemicalFormula: base.f,
    effectCode: `SYNCHRO_B12_${base.en.toUpperCase().replace(/[^A-Z0-9]/g, '_')}_RES_${i + 1}`,
    effectText: `1 Tuner + 1+ quái thú phi-Tuner có tổng Level bằng đúng ${synchroLevel}. Khi được triệu hồi Đồng Bộ: Tăng 500 ATK cho bản thân và giảm 300 ATK tất cả quái thú địch.`,
    scientificLore: `Cộng hưởng xúc tác ${base.name} (${base.f}) hạ thấp hàng rào năng lượng hoạt hóa Arrhenius, tăng tốc độ phản ứng lên hàng triệu lần theo SGK Hóa học 10 GDPT 2018.`,
    relatedEquation: base.eq,
    iupacName: `${base.en} Catalyst`,
    archetype: i % 2 === 0 ? 'PRECIOUS_CATALYST' : 'THERMAL_KINETICS',
    structuredEffects: [
      {
        effectId: `B12_EFF_${i + 1}`,
        activationWindow: 'ON_SUMMON',
        operations: [
          { op: 'MODIFY_STATS', params: { amount: 500, statTarget: 'ATK', targetScope: 'SELF' } },
          { op: 'MODIFY_STATS', params: { amount: 300, statTarget: 'ATK', targetScope: 'ALL_ENEMIES' } }
        ],
        description: 'Tăng 500 ATK cho bản thân, trừ 300 ATK toàn bộ quái thú đối phương.'
      }
    ]
  };

  batch12Cards.push(card);
}
writeBatchFile('batch_12_extra_deck_synchro_catalysis.ts', 'BATCH_12_CARDS', 'Batch 12: Extra Deck Synchro Monsters', batch12Cards);

// ==========================================
// BATCH 13: 75 Xyz Monsters (Rank, not Level)
// ==========================================
const batch13Cards: CardDef[] = [];

const xyzComplexes = [
  { name: 'Phức Bát Diện Hexammine Coban', en: 'Hexamminecobalt(III) Octahedral Xyz', f: '[Co(NH3)6]3+', attr: 'ELECTRO' as const, eq: 'Co³⁺ + 6NH₃ → [Co(NH₃)₆]³⁺ (d²sp³ Octahedral)' },
  { name: 'Phức Vuông Phẳng Cisplatin', en: 'Cisplatin Square Planar Xyz', f: 'Pt(NH3)2Cl2', attr: 'NOBLE_VOID' as const, eq: 'Pt²⁺ + 2NH₃ + 2Cl⁻ → cis-[Pt(NH₃)₂Cl₂] (dsp² Square Planar)' },
  { name: 'Bánh Mì Kẹp Ferrocene', en: 'Ferrocene Sandwich Complex Xyz', f: 'Fe(C5H5)2', attr: 'TERRA' as const, eq: 'Fe²⁺ + 2C₅H₅⁻ → Fe(η⁵-C₅H₅)₂ Sandwich' },
  { name: 'Phức Xanh Phổ Prussian Blue', en: 'Prussian Blue Lattice Xyz', f: 'Fe4[Fe(CN)6]3', attr: 'AQUA' as const, eq: '4Fe³⁺ + 3[Fe(CN)₆]⁴⁻ → Fe₄[Fe(CN)₆]₃ Precipitate' },
  { name: 'Phức Tứ Diện Kẽm Amoniac', en: 'Tetraamminezinc(II) Xyz', f: '[Zn(NH3)4]2+', attr: 'TERRA' as const, eq: 'Zn²⁺ + 4NH₃ → [Zn(NH₃)₄]²⁺ (sp³ Tetrahedral)' },
  { name: 'Phức Đồng Tetrammine Lam Đậm', en: 'Tetraamminecopper(II) Azure Xyz', f: '[Cu(NH3)4]2+', attr: 'AQUA' as const, eq: 'Cu(OH)₂ + 4NH₃ → [Cu(NH₃)₄]²⁺ + 2OH⁻' },
  { name: 'Phức Chelate Sắt EDTA', en: 'Iron(III) EDTA Chelate Xyz', f: '[Fe(EDTA)]-', attr: 'TERRA' as const, eq: 'Fe³⁺ + EDTA⁴⁻ → [Fe(EDTA)]⁻ Hexadentate Chelate' },
  { name: 'Phức Bạc Amoniac Thuốc Thử Tollens', en: 'Diamminesilver(I) Tollens Xyz', f: '[Ag(NH3)2]+', attr: 'AQUA' as const, eq: 'Ag⁺ + 2NH₃ → [Ag(NH₃)₂]⁺ Linear Complex' }
];

for (let i = 0; i < 75; i++) {
  const base = xyzComplexes[i % xyzComplexes.length];
  const iteration = Math.floor(i / xyzComplexes.length) + 1;
  const xyzRank = 3 + (i % 6); // 3 to 8
  const baseAtk = 2300 + (xyzRank * 180) + ((i % 4) * 50);
  const baseDef = 2000 + (xyzRank * 170) + ((i % 5) * 50);

  const card: CardDef = {
    id: `card_b13_${String(i + 1).padStart(3, '0')}_xyz_${base.en.toLowerCase().replace(/[^a-z0-9]/g, '_')}_${i + 1}`,
    name: `${base.name} — Rank ${xyzRank} (Cấu Trúc Phối Trí ${iteration})`,
    name_en: `${base.en} — Rank ${xyzRank} Overlayer ${iteration}`,
    cardType: 'XYZ_MONSTER',
    rarity: getRarity(i + 5),
    attribute: base.attr,
    manaCost: Math.min(8, Math.max(3, Math.floor(xyzRank / 1.1))),
    xyzRank,
    // Note: Rulebook v10 tr. 18-19, 51: Xyz monsters have Rank, not Level. level MUST be undefined!
    level: undefined,
    xyzMaterialsRequired: { count: 2, level: xyzRank },
    atk: baseAtk,
    def: baseDef,
    chemicalFormula: base.f,
    effectCode: `XYZ_B13_${base.en.toUpperCase().replace(/[^A-Z0-9]/g, '_')}_OVERLAY_${i + 1}`,
    effectText: `2 quái thú Level ${xyzRank}. Quái thú Xyz sở hữu Rank ${xyzRank} (không có Level). Bỏ 1 Nguyên liệu Xyz: Phá hủy 1 quái thú đối phương có ATK thấp hơn hoặc hồi phục 500 LP.`,
    scientificLore: `Thuyết phối trí Werner (Nobel 1913): Nguyên tử trung tâm liên kết với các phối tử qua liên kết cho-nhận tạo nên hình học không gian phức chất bền vững theo GDPT 2018.`,
    relatedEquation: base.eq,
    iupacName: `${base.en} Complex`,
    archetype: i % 2 === 0 ? 'WERNER_COORDINATION' : 'TRANSITION_FORGE',
    structuredEffects: [
      {
        effectId: `B13_EFF_${i + 1}`,
        activationWindow: 'IGNITION',
        operations: [
          { op: 'HEAL_LP', params: { amount: 500 } }
        ],
        description: 'Tách 1 nguyên liệu phối trí: Hồi phục 500 LP.'
      }
    ]
  };

  batch13Cards.push(card);
}
writeBatchFile('batch_13_extra_deck_xyz_coordination.ts', 'BATCH_13_CARDS', 'Batch 13: Extra Deck Xyz Coordination Monsters', batch13Cards);

// ==========================================
// BATCH 14: 75 Link Monsters (No Level, No DEF)
// ==========================================
const batch14Cards: CardDef[] = [];

const linkValences = [
  { name: 'Liên Kết Cộng Hóa Trị Sigma', en: 'Sigma Covalent Link Core', f: 'σ-Bond', attr: 'TERRA' as const, eq: 'Direct Overlap of Atomic Orbitals' },
  { name: 'Liên Kết Pi Liên Hợp Polyaxetylen', en: 'Conjugated Pi Link Resonator', f: 'π-Conjugate', attr: 'ELECTRO' as const, eq: 'Lateral Overlap of Unhybridized p Orbitals' },
  { name: 'Mạng Lưới Liên Kết Hydro Nước', en: 'Hydrogen Bond Lattice Linker', f: 'H-Bond', attr: 'AQUA' as const, eq: 'δ+ H···O δ- Dipole Attraction Network' },
  { name: 'Cầu Nối Disulfide Protein', en: 'Disulfide Crosslink Warden', f: '-S-S-', attr: 'PYRO' as const, eq: '2 Cysteine-SH + [O] → Cystine-S-S- + H₂O' },
  { name: 'Mạng Lưới Phối Trí Kim Loại-Hữu Cơ', en: 'MOF Porous Link Network', f: 'MOF-5', attr: 'TERRA' as const, eq: 'Zn₄O Clusters + 1,4-Benzenedicarboxylate' },
  { name: 'Chuỗi Polyme Trùng Hợp Linker', en: 'Polymer Chain Coordinate Link', f: 'Poly-Link', attr: 'NOBLE_VOID' as const, eq: 'Macromolecular Covalent Network Backbone' }
];

const LINK_ARROW_PRESETS: ('TOP' | 'BOTTOM' | 'LEFT' | 'RIGHT' | 'TOP_LEFT' | 'TOP_RIGHT' | 'BOTTOM_LEFT' | 'BOTTOM_RIGHT')[][] = [
  ['BOTTOM'],
  ['BOTTOM', 'TOP'],
  ['BOTTOM', 'LEFT'],
  ['BOTTOM', 'RIGHT'],
  ['BOTTOM', 'LEFT', 'RIGHT'],
  ['BOTTOM', 'TOP', 'LEFT', 'RIGHT']
];

for (let i = 0; i < 75; i++) {
  const base = linkValences[i % linkValences.length];
  const iteration = Math.floor(i / linkValences.length) + 1;
  const linkRating = 1 + (i % 4); // 1 to 4
  const arrows = LINK_ARROW_PRESETS[(i % LINK_ARROW_PRESETS.length)].slice(0, linkRating);
  const baseAtk = 1000 + (linkRating * 450) + ((i % 4) * 40);

  const card: CardDef = {
    id: `card_b14_${String(i + 1).padStart(3, '0')}_link_${base.en.toLowerCase().replace(/[^a-z0-9]/g, '_')}_${i + 1}`,
    name: `${base.name} — Link-${linkRating} (Mắt Xích ${iteration})`,
    name_en: `${base.en} — Link-${linkRating} Node ${iteration}`,
    cardType: 'LINK_MONSTER',
    rarity: getRarity(i + 3),
    attribute: base.attr,
    manaCost: Math.min(8, Math.max(1, linkRating * 2 - 1)),
    linkRating,
    linkArrows: arrows,
    linkMaterialsRequired: { minCount: linkRating, maxCount: linkRating, materialType: 'Quái thú Nguyên tố hóa học' },
    // Rulebook v10 tr. 22-23: Link monsters have no Level and no DEF. Both MUST be undefined!
    level: undefined,
    def: undefined,
    atk: baseAtk,
    chemicalFormula: base.f,
    effectCode: `LINK_B14_${base.en.toUpperCase().replace(/[^A-Z0-9]/g, '_')}_VAL_${i + 1}`,
    effectText: `${linkRating} quái thú hóa học. Quái thú Link-${linkRating} (không có DEF và không thể chuyển sang tư thế Phòng thủ). Quái thú đồng minh ở ô được chỉ bởi Mũi tên Link nhận +300 ATK và bảo vệ khỏi bị tiêu diệt bởi hiệu ứng.`,
    scientificLore: `Liên kết hóa học (${base.eq}) là lực tương tác tĩnh điện và chia sẻ electron giữ các nguyên tử lại với nhau tạo nên cấu trúc phân tử bền vững theo chuẩn IUPAC và GDPT 2018.`,
    relatedEquation: base.eq,
    iupacName: `${base.en} Valence`,
    archetype: i % 2 === 0 ? 'MACROMOLECULAR_POLYMER' : 'HYDROCARBON_CHAIN',
    structuredEffects: [
      {
        effectId: `B14_EFF_${i + 1}`,
        activationWindow: 'IGNITION',
        operations: [
          { op: 'MODIFY_STATS', params: { amount: 300, statTarget: 'ATK', targetScope: 'ALL_ALLIES' } }
        ],
        description: 'Tăng 300 ATK cho các quái thú được liên kết qua mũi tên Link.'
      }
    ]
  };

  batch14Cards.push(card);
}
writeBatchFile('batch_14_extra_deck_link_valences.ts', 'BATCH_14_CARDS', 'Batch 14: Extra Deck Link Valence Monsters', batch14Cards);

console.log('[BATCH 11-14 COMPLETED] 300 Extra Deck Monsters successfully generated and validated.');
