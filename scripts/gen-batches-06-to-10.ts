// scripts/gen-batches-06-to-10.ts
// Generator for Batches 06 to 10: 500 Main Deck Monsters (Batches 06-10)

import { CardDef, getRarity, writeBatchFile } from './build-all-card-batches';

console.log('[BATCH 06-10] Synthesizing 500 Main Deck Biomolecule, Acid/Base, Catalyst & Guardian Monsters...');

// ==========================================
// BATCH 06: 100 Biomolecule & Polymer Monsters
// ==========================================
const batch06Cards: CardDef[] = [];

const biomolData = [
  { name: 'Glyxin', en: 'Glycine', f: 'C2H5NO2', attr: 'TERRA' as const, eq: 'H₂N-CH₂-COOH ⇌ H₃N⁺-CH₂-COO⁻' },
  { name: 'Alanin', en: 'Alanine', f: 'C3H7NO2', attr: 'TERRA' as const, eq: 'CH₃-CH(NH₂)-COOH ⇌ CH₃-CH(NH₃⁺)-COO⁻' },
  { name: 'Valin', en: 'Valine', f: 'C5H11NO2', attr: 'TERRA' as const, eq: '(CH₃)₂CH-CH(NH₂)-COOH' },
  { name: 'Axit Glutamic', en: 'Glutamic Acid', f: 'C5H9NO4', attr: 'ACID_DARK' as const, eq: 'HOOC-(CH₂)₂-CH(NH₂)-COOH' },
  { name: 'Lysin', en: 'Lysine', f: 'C6H14N2O2', attr: 'AQUA' as const, eq: 'H₂N-(CH₂)₄-CH(NH₂)-COOH' },
  { name: 'Glucozo', en: 'Glucose', f: 'C6H12O6', attr: 'PYRO' as const, eq: 'C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O' },
  { name: 'Fructozo', en: 'Fructose', f: 'C6H12O6', attr: 'PYRO' as const, eq: 'C₆H₁₂O₆ (Ketohexose Isomer)' },
  { name: 'Saccarozo', en: 'Sucrose', f: 'C12H22O11', attr: 'TERRA' as const, eq: 'C₁₂H₂₂O₁₁ + H₂O → C₆H₁₂O₆ + C₆H₁₂O₆' },
  { name: 'Polyetylen', en: 'Polyethylene', f: '(-C2H4-)n', attr: 'TERRA' as const, eq: 'nCH₂=CH₂ → (-CH₂-CH₂-)n' },
  { name: 'Teflon', en: 'Polytetrafluoroethylene', f: '(-C2F4-)n', attr: 'NOBLE_VOID' as const, eq: 'nCF₂=CF₂ → (-CF₂-CF₂-)n' },
  { name: 'Nylon-6,6', en: 'Nylon 66', f: 'C12H22N2O2', attr: 'TERRA' as const, eq: 'nHexamethylenediamine + nAdipic Acid → Nylon-6,6 + 2nH₂O' },
  { name: 'Kevlar', en: 'Poly-paraphenylene terephthalamide', f: '(-C14H10N2O2-)n', attr: 'NOBLE_VOID' as const, eq: '1,4-phenylene-diamine + terephthaloyl chloride → Kevlar' }
];

const biomolRoles = ['Hạt Nhân Sự Sống', 'Chuỗi Đại Phân Tử', 'Khối Kháng Sinh', 'Cấu Trúc Tự Nhiên', 'Mạng Lưới Sinh Học'];

for (let i = 0; i < 100; i++) {
  const base = biomolData[i % biomolData.length];
  const role = biomolRoles[Math.floor(i / biomolData.length) % biomolRoles.length];
  const isPoly = base.f.includes('n') || ['Polyetylen', 'Teflon', 'Nylon-6,6', 'Kevlar'].includes(base.name);
  const archetype = isPoly ? 'MACROMOLECULAR_POLYMER' : 'BIOMOLECULE_VITAL';

  const level = 2 + (i % 6);
  const baseAtk = 900 + (level * 220) + ((i % 5) * 50);
  const baseDef = 1000 + (level * 230) + ((i % 4) * 60);
  const manaCost = Math.min(8, Math.max(1, Math.floor(level / 1.2)));

  const card: CardDef = {
    id: `card_b06_${String(i + 1).padStart(3, '0')}_${base.en.toLowerCase().replace(/[^a-z0-9]/g, '_')}_${i + 1}`,
    name: `${base.name} — ${role} (Cấu Trúc ${i + 1})`,
    name_en: `${base.en} — ${role} Isolate ${i + 1}`,
    cardType: 'ELEMENT_MONSTER',
    rarity: getRarity(i + 2),
    attribute: base.attr,
    manaCost,
    level,
    atk: baseAtk,
    def: baseDef,
    chemicalFormula: base.f,
    effectCode: `ELEM_B06_${base.en.toUpperCase().replace(/[^A-Z0-9]/g, '_')}_VITAL_${i + 1}`,
    effectText: isPoly
      ? `Liên kết chuỗi polymer cực đại: Không thể bị phá hủy bởi đòn tấn công đầu tiên trong mỗi lượt.`
      : `Khi có mặt trên sân: Hồi phục 300 LP cho người chơi sau mỗi lượt kết thúc (cân bằng nội môi).`,
    scientificLore: `${base.name} (${base.f}) là hợp chất sinh học / polymer quan trọng trong chương trình Hóa học 12 GDPT 2018 với khả năng tạo liên kết hydro và chuỗi mạch bền vững.`,
    relatedEquation: base.eq,
    iupacName: base.en,
    archetype,
    structuredEffects: [
      {
        effectId: `B06_EFF_${i + 1}`,
        activationWindow: isPoly ? 'ON_ATTACK_DECLARE' : 'IGNITION',
        operations: isPoly
          ? [{ op: 'APPLY_STATUS', params: { statusType: 'PASSIVATION' } }]
          : [{ op: 'HEAL_LP', params: { amount: 400 } }],
        description: isPoly ? 'Bảo vệ màng polymer bền cơ học.' : 'Hồi 400 LP dinh dưỡng sinh học.'
      }
    ]
  };

  batch06Cards.push(card);
}
writeBatchFile('batch_06_monsters_main_biomolecules_polymers.ts', 'BATCH_06_CARDS', 'Batch 06: Biomolecule & Polymer Monsters', batch06Cards);

// ==========================================
// BATCH 07: 100 Acid, Base & Salt Monsters
// ==========================================
const batch07Cards: CardDef[] = [];

const acidBaseData = [
  { name: 'Axit Clohidric', en: 'Hydrochloric Acid', f: 'HCl', attr: 'ACID_DARK' as const, eq: 'HCl → H⁺ + Cl⁻' },
  { name: 'Axit Sunfuric', en: 'Sulfuric Acid', f: 'H2SO4', attr: 'ACID_DARK' as const, eq: 'H₂SO₄ → H⁺ + HSO₄⁻' },
  { name: 'Axit Nitric', en: 'Nitric Acid', f: 'HNO3', attr: 'ACID_DARK' as const, eq: 'HNO₃ → H⁺ + NO₃⁻' },
  { name: 'Axit Photphoric', en: 'Phosphoric Acid', f: 'H3PO4', attr: 'ACID_DARK' as const, eq: 'H₃PO₄ ⇌ H⁺ + H₂PO₄⁻' },
  { name: 'Axit Axetic', en: 'Acetic Acid', f: 'CH3COOH', attr: 'AQUA' as const, eq: 'CH₃COOH ⇌ H⁺ + CH₃COO⁻' },
  { name: 'Natri Hydroxit', en: 'Sodium Hydroxide', f: 'NaOH', attr: 'TERRA' as const, eq: 'NaOH → Na⁺ + OH⁻' },
  { name: 'Kali Hydroxit', en: 'Potassium Hydroxide', f: 'KOH', attr: 'TERRA' as const, eq: 'KOH → K⁺ + OH⁻' },
  { name: 'Canxi Hydroxit', en: 'Calcium Hydroxide', f: 'Ca(OH)2', attr: 'TERRA' as const, eq: 'Ca(OH)₂ ⇌ Ca²⁺ + 2OH⁻' },
  { name: 'Bari Hydroxit', en: 'Barium Hydroxide', f: 'Ba(OH)2', attr: 'TERRA' as const, eq: 'Ba(OH)₂ → Ba²⁺ + 2OH⁻' },
  { name: 'Đồng(II) Sunfat', en: 'Copper Sulfate', f: 'CuSO4', attr: 'ELECTRO' as const, eq: 'CuSO₄ → Cu²⁺ + SO₄²⁻' },
  { name: 'Sắt(III) Clorua', en: 'Iron(III) Chloride', f: 'FeCl3', attr: 'TERRA' as const, eq: 'FeCl₃ → Fe³⁺ + 3Cl⁻' },
  { name: 'Nhôm Sunfat', en: 'Aluminum Sulfate', f: 'Al2(SO4)3', attr: 'TERRA' as const, eq: 'Al₂(SO₄)₃ → 2Al³⁺ + 3SO₄²⁻' }
];

const abRoles = ['Bậc Thầy Ăn Mòn', 'Chiến Binh Kiềm Hóa', 'Pháo Đài Muối Ion', 'Đao Phủ Axit', 'Lính Thủy Phân'];

for (let i = 0; i < 100; i++) {
  const base = acidBaseData[i % acidBaseData.length];
  const role = abRoles[Math.floor(i / acidBaseData.length) % abRoles.length];
  const isAcid = base.name.includes('Axit');
  const archetype = isAcid ? 'STRONG_ACID_CORROSION' : 'BASE_HYDROXIDE';

  const level = 2 + (i % 6);
  const baseAtk = isAcid ? 1100 + (level * 240) : 850 + (level * 200);
  const baseDef = isAcid ? 700 + (level * 180) : 1100 + (level * 250);
  const manaCost = Math.min(8, Math.max(1, Math.floor(level / 1.2)));

  const card: CardDef = {
    id: `card_b07_${String(i + 1).padStart(3, '0')}_${base.en.toLowerCase().replace(/[^a-z0-9]/g, '_')}_${i + 1}`,
    name: `${base.name} — ${role} (${base.f} Nồng Độ ${i + 1})`,
    name_en: `${base.en} — ${role} Molarity ${i + 1}`,
    cardType: 'ELEMENT_MONSTER',
    rarity: getRarity(i + 4),
    attribute: base.attr,
    manaCost,
    level,
    atk: baseAtk,
    def: baseDef,
    chemicalFormula: base.f,
    effectCode: `ELEM_B07_${base.en.toUpperCase().replace(/[^A-Z0-9]/g, '_')}_CORR_${i + 1}`,
    effectText: isAcid
      ? `Phân ly hoàn toàn proton H+: Gây sát thương xuyên giáp, nếu tấn công quái thú phòng thủ sẽ trừ thẳng chênh lệch vào LP đối phương.`
      : `Dung dịch kiềm xà phòng hóa: Giảm 300 ATK của quái thú đối phương khi chúng tuyên bố tấn công.`,
    scientificLore: `${base.name} (${base.f}) là hóa chất cơ bản tuân theo thuyết điện ly Arrhenius / Bronsted-Lowry trong SGK Hóa học 11 GDPT 2018.`,
    relatedEquation: base.eq,
    iupacName: base.en,
    archetype,
    structuredEffects: [
      {
        effectId: `B07_EFF_${i + 1}`,
        activationWindow: 'ON_ATTACK_DECLARE',
        operations: isAcid
          ? [{ op: 'MODIFY_STATS', params: { amount: 300, statTarget: 'ATK', targetScope: 'SELF' } }]
          : [{ op: 'MODIFY_STATS', params: { amount: 300, statTarget: 'ATK', targetScope: 'ALL_ENEMIES' } }],
        description: isAcid ? 'Tăng 300 ATK ăn mòn axit mạnh.' : 'Giảm 300 ATK quái thú địch bằng bazơ.'
      }
    ]
  };

  batch07Cards.push(card);
}
writeBatchFile('batch_07_monsters_main_acids_bases_salts.ts', 'BATCH_07_CARDS', 'Batch 07: Acid, Base & Salt Monsters', batch07Cards);

// ==========================================
// BATCH 08: 100 Catalyst & Allotrope Monsters
// ==========================================
const batch08Cards: CardDef[] = [];

const catAllotropeData = [
  { name: 'Xúc Tác Ziegler-Natta', en: 'Ziegler-Natta Catalyst', f: 'TiCl4·Al(C2H5)3', attr: 'ELECTRO' as const, eq: 'TiCl₄ + Al(C₂H₅)₃ → Active Polymerization Center' },
  { name: 'Thuốc Thử Grignard', en: 'Grignard Reagent', f: 'R-Mg-X', attr: 'PYRO' as const, eq: 'R-X + Mg → R-Mg-X' },
  { name: 'Xúc Tác Wilkinson', en: 'Wilkinson Catalyst', f: 'RhCl(PPh3)3', attr: 'AQUA' as const, eq: 'RhCl(PPh₃)₃ + H₂ → Active Hydrogenation Specie' },
  { name: 'Than Chì Graphite', en: 'Graphite Lattice', f: 'C', attr: 'TERRA' as const, eq: 'C(graphite) (sp² Hexagonal Layers)' },
  { name: 'Kim Cương Bát Diện', en: 'Diamond Octahedral', f: 'C', attr: 'NOBLE_VOID' as const, eq: 'C(diamond) (sp³ Tetrahedral Giant Lattice)' },
  { name: 'Graphene Đơn Lớp', en: 'Graphene Monolayer', f: 'C', attr: 'ELECTRO' as const, eq: 'Graphene (2D Hexagonal Carbon Network)' },
  { name: 'Fullerene C60', en: 'Buckminsterfullerene C60', f: 'C60', attr: 'NOBLE_VOID' as const, eq: 'C₆₀ (Truncated Icosahedron Buckyball)' },
  { name: 'Ống Nano Carbon', en: 'Carbon Nanotube', f: 'CNT', attr: 'ELECTRO' as const, eq: 'Rolled Graphene Cylindrical Shell' },
  { name: 'Photpho Trắng', en: 'White Phosphorus', f: 'P4', attr: 'PYRO' as const, eq: 'P₄ + 5O₂ → P₄O₁₀ (Self-Ignition)' },
  { name: 'Photpho Đỏ', en: 'Red Phosphorus', f: 'Pn', attr: 'PYRO' as const, eq: 'P₄(white) --heat--> Pn(red)' }
];

const catRoles = ['Kiến Trúc Sư Cấu Trúc', 'Chúa Tể Thù Hình', 'Kẻ Thúc Đẩy Phản Ứng', 'Lưới Tinh Thể', 'Trung Tâm Hoạt Hóa'];

for (let i = 0; i < 100; i++) {
  const base = catAllotropeData[i % catAllotropeData.length];
  const role = catRoles[Math.floor(i / catAllotropeData.length) % catRoles.length];
  const isOrgano = base.name.includes('Xúc Tác') || base.name.includes('Grignard');
  const archetype = isOrgano ? 'ORGANOMETALLIC_CATALYSIS' : 'ALLOTROPE_PHANTOM';

  const level = 3 + (i % 6);
  const baseAtk = 1100 + (level * 220) + ((i % 5) * 50);
  const baseDef = 1200 + (level * 210) + ((i % 4) * 60);
  const manaCost = Math.min(8, Math.max(2, Math.floor(level / 1.2)));

  const card: CardDef = {
    id: `card_b08_${String(i + 1).padStart(3, '0')}_${base.en.toLowerCase().replace(/[^a-z0-9]/g, '_')}_${i + 1}`,
    name: `${base.name} — ${role} (Dạng ${i + 1})`,
    name_en: `${base.en} — ${role} Lattice ${i + 1}`,
    cardType: 'ELEMENT_MONSTER',
    rarity: getRarity(i + 1),
    attribute: base.attr,
    manaCost,
    level,
    atk: baseAtk,
    def: baseDef,
    chemicalFormula: base.f,
    effectCode: `ELEM_B08_${base.en.toUpperCase().replace(/[^A-Z0-9]/g, '_')}_ALLO_${i + 1}`,
    effectText: isOrgano
      ? `Hạ thấp năng lượng hoạt hóa: Giảm 1 Mana triệu hồi cho quái thú tiếp theo từ tay trong lượt này.`
      : `Đa dạng thù hình: Có thể thay đổi thuộc tính của quái thú này sang bất kỳ thuộc tính nào 1 lần mỗi lượt.`,
    scientificLore: `${base.name} (${base.f}) đại diện cho đỉnh cao cấu trúc hóa học vật liệu tiên tiến và xúc tác chọn lọc trong chương trình GDPT 2018.`,
    relatedEquation: base.eq,
    iupacName: base.en,
    archetype,
    structuredEffects: [
      {
        effectId: `B08_EFF_${i + 1}`,
        activationWindow: 'IGNITION',
        operations: [
          { op: 'RECOVER_RESOURCE', params: { amount: 1 } }
        ],
        description: 'Tăng tốc độ phản ứng hồi 1 Mana xúc tác.'
      }
    ]
  };

  batch08Cards.push(card);
}
writeBatchFile('batch_08_monsters_main_catalysts_allotropes.ts', 'BATCH_08_CARDS', 'Batch 08: Catalyst & Allotrope Monsters', batch08Cards);

// ==========================================
// BATCH 09: 100 Scientific Pioneer Entities
// ==========================================
const batch09Cards: CardDef[] = [];

const pioneers = [
  { name: 'Lavoisier', en: 'Lavoisier Spirit', theory: 'Định Luật Bảo Toàn Khối Lượng', f: '∑m_react = ∑m_prod', attr: 'TERRA' as const },
  { name: 'Mendeleev', en: 'Mendeleev Avatar', theory: 'Bảng Tuần Hoàn Nguyên Tố', f: 'f(Z) Periodic Law', attr: 'NOBLE_VOID' as const },
  { name: 'Marie Curie', en: 'Curie Radiant', theory: 'Phóng Xạ Alpha/Beta/Gamma', f: '²²⁶Ra → ²²²Rn + ⁴He', attr: 'ELECTRO' as const },
  { name: 'Arrhenius', en: 'Arrhenius Specter', theory: 'Năng Lượng Hoạt Hóa Phản Ứng', f: 'k = A·e^(-Ea/RT)', attr: 'PYRO' as const },
  { name: 'Le Chatelier', en: 'Le Chatelier Phantom', theory: 'Chuyển Dịch Cân Bằng Hóa Học', f: 'K_c Equilibrium Shift', attr: 'AQUA' as const },
  { name: 'Gilbert Lewis', en: 'Lewis Core', theory: 'Cặp Electron Liên Kết Hóa Trị', f: 'Octet Shared Pair', attr: 'AERO' as const },
  { name: 'Willard Gibbs', en: 'Gibbs Energy Titan', theory: 'Năng Lượng Tự Do Nhiệt Động', f: 'ΔG = ΔH - TΔS', attr: 'PYRO' as const },
  { name: 'Alfred Werner', en: 'Werner Coordination Architect', theory: 'Thuyết Phức Chất Phối Trí', f: '[Co(NH3)6]Cl3', attr: 'ELECTRO' as const },
  { name: 'Walther Nernst', en: 'Nernst Potential Warden', theory: 'Điện Thế Điện Cực Điện Hóa', f: 'E = E° - (RT/nF)lnQ', attr: 'ELECTRO' as const },
  { name: 'John Dalton', en: 'Dalton Atomic Sovereign', theory: 'Thuyết Nguyên Tử Căn Bản', f: 'Atomic Mass Unit', attr: 'TERRA' as const }
];

for (let i = 0; i < 100; i++) {
  const base = pioneers[i % pioneers.length];
  const iteration = Math.floor(i / pioneers.length) + 1;
  const isKinetics = ['Arrhenius', 'Gibbs', 'Le Chatelier', 'Lavoisier'].includes(base.name);
  const archetype = isKinetics ? 'THERMAL_KINETICS' : 'RADIOACTIVE_ISOTOPE';

  const level = 4 + (i % 5);
  const baseAtk = 1400 + (level * 210) + ((i % 4) * 60);
  const baseDef = 1300 + (level * 220) + ((i % 5) * 50);
  const manaCost = Math.min(8, Math.max(2, Math.floor(level / 1.1)));

  const card: CardDef = {
    id: `card_b09_${String(i + 1).padStart(3, '0')}_${base.name.toLowerCase().replace(/[^a-z0-9]/g, '_')}_${i + 1}`,
    name: `${base.name} — ${base.theory} (Thực Thể ${iteration})`,
    name_en: `${base.en} — Principle Form ${iteration}`,
    cardType: 'ELEMENT_MONSTER',
    rarity: getRarity(i + 5),
    attribute: base.attr,
    manaCost,
    level,
    atk: baseAtk,
    def: baseDef,
    chemicalFormula: base.f,
    effectCode: `ELEM_B09_${base.name.toUpperCase().replace(/[^A-Z0-9]/g, '_')}_LAW_${i + 1}`,
    effectText: `Định luật khoa học ${base.theory}: Khi được triệu hồi, rút 1 lá bài từ Bộ bài và gây ${200 + (i % 3) * 100} LP sát thương chuẩn lên đối thủ.`,
    scientificLore: `Tôn vinh nhà khoa học vĩ đại ${base.name} với công trình "${base.theory}" là nền tảng cốt lõi của hóa học thực nghiệm và định lượng GDPT 2018.`,
    relatedEquation: base.f,
    iupacName: `${base.en} Principle`,
    archetype,
    structuredEffects: [
      {
        effectId: `B09_EFF_${i + 1}`,
        activationWindow: 'ON_SUMMON',
        operations: [
          { op: 'DRAW_CARD', params: { amount: 1 } },
          { op: 'BURN_DAMAGE', params: { amount: 300 } }
        ],
        description: `Kích hoạt định luật ${base.theory}: Rút 1 lá bài và gây 300 LP sát thương.`
      }
    ]
  };

  batch09Cards.push(card);
}
writeBatchFile('batch_09_monsters_main_scientific_entities.ts', 'BATCH_09_CARDS', 'Batch 09: Scientific Pioneer Entities', batch09Cards);

// ==========================================
// BATCH 10: 100 Elemental Guardian Monsters
// ==========================================
const batch10Cards: CardDef[] = [];

const guardians = [
  { name: 'Hộ Vệ Tinh Thể Kim Cương', en: 'Diamond Lattice Guardian', f: 'C(diamond)', attr: 'NOBLE_VOID' as const, eq: 'Giant Covalent 3D Network' },
  { name: 'Chúa Tể Siêu Axit Fluoroantimonic', en: 'Fluoroantimonic Superacid Sovereign', f: 'HSbF6', attr: 'ACID_DARK' as const, eq: 'HF + SbF₅ ⇌ H₂F⁺ + SbF₆⁻ (H₀ = -31.3)' },
  { name: 'Kỵ Sĩ Mạng Tinh Thể Muối Ăn', en: 'Halite Crystal Knight', f: 'NaCl(s)', attr: 'TERRA' as const, eq: 'Na⁺(fcc) + Cl⁻(fcc) Lattice' },
  { name: 'Vua Lửa Magie Pháo Sáng', en: 'Magnesium Flare King', f: 'MgO(s)', attr: 'PYRO' as const, eq: '2Mg + O₂ → 2MgO + 1204 kJ' },
  { name: 'Long Vương Thủy Phân Điện Phân', en: 'Hydrolysis Dragon King', f: '2H2O', attr: 'AQUA' as const, eq: '2H₂O --electrolysis--> 2H₂ + O₂' },
  { name: 'Bão Tố Khí Halogen Cực Đại', en: 'Halogen Storm Supreme', f: 'Cl2/Br2/I2', attr: 'AERO' as const, eq: 'Electronegativity Cascade' },
  { name: 'Thần Sấm Pin Galvanic Lithium', en: 'Lithium Galvanic Titan', f: 'Li/Li+', attr: 'ELECTRO' as const, eq: 'Li → Li⁺ + e⁻ (E° = -3.04V)' },
  { name: 'Hộ Pháp Năng Lượng Liên Kết', en: 'Bond Enthalpy Protector', f: 'ΔH_bond', attr: 'PYRO' as const, eq: 'ΔH_rxn = ∑Eb(react) - ∑Eb(prod)' },
  { name: 'Bóng Ma Tinh Thể Băng Khô', en: 'Dry Ice Sublimation Phantom', f: 'CO2(s)', attr: 'AERO' as const, eq: 'CO₂(s) → CO₂(g) (-78.5°C)' },
  { name: 'Vệ Thần Polyme Kevlar Chống Đạn', en: 'Kevlar Armor Bastion', f: 'Aramid', attr: 'NOBLE_VOID' as const, eq: 'Interchain Hydrogen Bonding Network' }
];

for (let i = 0; i < 100; i++) {
  const base = guardians[i % guardians.length];
  const iteration = Math.floor(i / guardians.length) + 1;
  const isSuperacid = base.name.includes('Axit') || base.name.includes('Magie');
  const archetype = isSuperacid ? 'SUPERACID_EXTREME' : 'CRYSTAL_LATTICE';

  const level = 4 + (i % 5); // 4 to 8
  const baseAtk = 1500 + (level * 230) + ((i % 4) * 50);
  const baseDef = 1600 + (level * 220) + ((i % 5) * 60);
  const manaCost = Math.min(8, Math.max(3, Math.floor(level / 1.1)));

  const card: CardDef = {
    id: `card_b10_${String(i + 1).padStart(3, '0')}_${base.en.toLowerCase().replace(/[^a-z0-9]/g, '_')}_${i + 1}`,
    name: `${base.name} — Bậc ${iteration}`,
    name_en: `${base.en} — Tier ${iteration}`,
    cardType: 'ELEMENT_MONSTER',
    rarity: getRarity(i + 6),
    attribute: base.attr,
    manaCost,
    level,
    atk: baseAtk,
    def: baseDef,
    chemicalFormula: base.f,
    effectCode: `ELEM_B10_${base.en.toUpperCase().replace(/[^A-Z0-9]/g, '_')}_GUARD_${i + 1}`,
    effectText: `Bảo vệ mạng tinh thể nguyên tố: Tăng 400 DEF cho tất cả quái thú cùng thuộc tính trên sân. Không thể bị tiêu diệt bởi đòn tấn công đầu tiên mỗi lượt.`,
    scientificLore: `${base.name} đại diện cho giới hạn cực đại của liên kết hóa học (${base.eq}), độ cứng tinh thể hoặc khả năng nhường proton mạnh nhất trong tự nhiên theo GDPT 2018.`,
    relatedEquation: base.eq,
    iupacName: `${base.en} Sovereign`,
    archetype,
    structuredEffects: [
      {
        effectId: `B10_EFF_${i + 1}`,
        activationWindow: 'ON_ATTACK_DECLARE',
        operations: [
          { op: 'MODIFY_STATS', params: { amount: 400, statTarget: 'DEF', targetScope: 'ALL_ALLIES' } }
        ],
        description: 'Tăng 400 DEF cho toàn thể đồng minh bằng mạng tinh thể.'
      }
    ]
  };

  batch10Cards.push(card);
}
writeBatchFile('batch_10_monsters_main_elemental_guardians.ts', 'BATCH_10_CARDS', 'Batch 10: Elemental Guardian Monsters', batch10Cards);

console.log('[BATCH 06-10 COMPLETED] 500 Main Deck Monsters successfully generated and validated.');
