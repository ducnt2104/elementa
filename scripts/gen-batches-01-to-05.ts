// scripts/gen-batches-01-to-05.ts
// Generator for Batches 01 to 05: 500 Main Deck Monsters

import { CardDef, getRarity, writeBatchFile } from './build-all-card-batches';

console.log('[BATCH 01-05] Synthesizing 500 Main Deck Elemental & Compound Monsters...');

// ==========================================
// BATCH 01: 100 Alkali & Alkaline Earth Monsters
// ==========================================
const batch01Cards: CardDef[] = [];

const alkaliData = [
  { el: 'Li', z: 3, name: 'Liti', en: 'Lithium', attr: 'PYRO' as const, salt: 'Hydride', f: 'LiH', eq: '2Li + H₂ → 2LiH' },
  { el: 'Na', z: 11, name: 'Natri', en: 'Sodium', attr: 'PYRO' as const, salt: 'Peroxide', f: 'Na2O2', eq: '2Na + O₂ → Na₂O₂' },
  { el: 'K', z: 19, name: 'Kali', en: 'Potassium', attr: 'PYRO' as const, salt: 'Superoxide', f: 'KO2', eq: 'K + O₂ → KO₂' },
  { el: 'Rb', z: 37, name: 'Rubidi', en: 'Rubidium', attr: 'PYRO' as const, salt: 'Nitrate', f: 'RbNO3', eq: 'Rb + HNO₃ → RbNO₃ + 1/2H₂' },
  { el: 'Cs', z: 55, name: 'Caesi', en: 'Cesium', attr: 'PYRO' as const, salt: 'Chloride', f: 'CsCl', eq: '2Cs + Cl₂ → 2CsCl' },
  { el: 'Fr', z: 87, name: 'Franxi', en: 'Francium', attr: 'PYRO' as const, salt: 'Radiate', f: 'FrF', eq: '2Fr + F₂ → 2FrF' },
  { el: 'Be', z: 4, name: 'Beryli', en: 'Beryllium', attr: 'TERRA' as const, salt: 'Hydroxide', f: 'Be(OH)2', eq: 'BeO + H₂O → Be(OH)₂' },
  { el: 'Mg', z: 12, name: 'Magie', en: 'Magnesium', attr: 'PYRO' as const, salt: 'Oxide Ribbon', f: 'MgO', eq: '2Mg + O₂ → 2MgO' },
  { el: 'Ca', z: 20, name: 'Canxi', en: 'Calcium', attr: 'TERRA' as const, salt: 'Carbonate Calcite', f: 'CaCO3', eq: 'CaO + CO₂ → CaCO₃' },
  { el: 'Sr', z: 38, name: 'Stronti', en: 'Strontium', attr: 'PYRO' as const, salt: 'Carmine Sulfate', f: 'SrSO4', eq: 'SrCl₂ + Na₂SO₄ → SrSO₄ + 2NaCl' },
  { el: 'Ba', z: 56, name: 'Bari', en: 'Barium', attr: 'TERRA' as const, salt: 'Heavy Spar', f: 'BaSO4', eq: 'Ba(OH)₂ + H₂SO₄ → BaSO₄ + 2H₂O' },
  { el: 'Ra', z: 88, name: 'Radi', en: 'Radium', attr: 'TERRA' as const, salt: 'Luminescent Bromide', f: 'RaBr2', eq: 'Ra + Br₂ → RaBr₂' }
];

const alkaliTitles = [
  'Chiến Binh', 'Vệ Binh', 'Hiệp Sĩ', 'Đại Pháp Sư', 'Lính Tiên Phong', 'Thần Tượng', 'Pháo Thủ', 'Kiếm Vũ'
];

for (let i = 0; i < 100; i++) {
  const base = alkaliData[i % alkaliData.length];
  const title = alkaliTitles[Math.floor(i / alkaliData.length) % alkaliTitles.length];
  const variant = Math.floor(i / 12) + 1;
  const isEarth = ['Be', 'Mg', 'Ca', 'Sr', 'Ba', 'Ra'].includes(base.el);
  const archetype = isEarth ? 'ALKALINE_EARTH_BASTION' : 'ALKALI_BURST';

  const level = 2 + (i % 6); // 2 to 7
  const baseAtk = 800 + (level * 250) + ((i % 5) * 50);
  const baseDef = isEarth ? baseAtk + 300 : baseAtk - 300;
  const manaCost = Math.min(8, Math.max(1, Math.floor(level / 1.2)));

  const card: CardDef = {
    id: `card_b01_${String(i + 1).padStart(3, '0')}_${base.el.toLowerCase()}_${i + 1}`,
    name: `${base.name} — ${title} ${base.salt} (Dạng ${variant})`,
    name_en: `${base.en} — ${base.salt} ${title} Mk-${variant}`,
    cardType: 'ELEMENT_MONSTER',
    rarity: getRarity(i),
    attribute: base.attr,
    manaCost,
    level,
    atk: baseAtk,
    def: Math.max(300, baseDef),
    chemicalFormula: base.f,
    atomicNumber: base.z,
    effectCode: `ELEM_B01_${base.el.toUpperCase()}_ACT_${i + 1}`,
    effectText: isEarth
      ? `Khi ở tư thế Phòng thủ: Tăng ${150 + (i % 4) * 50} DEF cho bản thân. Nếu bị tấn công bởi quái thú có ATK thấp hơn, đối thủ nhận ${200 + (i % 3) * 100} LP phản chấn.`
      : `Khi được triệu hồi: Bộc phát năng lượng kiềm gây ${250 + (i % 5) * 50} LP sát thương trực tiếp lên đối thủ.`,
    scientificLore: `${base.name} (${base.el}, Z=${base.z}) tạo hợp chất ${base.salt} (${base.f}) phản ứng tỏa nhiệt đặc trưng theo chuẩn GDPT 2018.`,
    relatedEquation: base.eq,
    iupacName: `${base.en} ${base.salt}`,
    archetype,
    structuredEffects: [
      {
        effectId: `B01_EFF_${i + 1}`,
        activationWindow: isEarth ? 'ON_ATTACK_DECLARE' : 'ON_SUMMON',
        operations: isEarth
          ? [{ op: 'MODIFY_STATS', params: { amount: 200, statTarget: 'DEF', targetScope: 'SELF' } }]
          : [{ op: 'BURN_DAMAGE', params: { amount: 300 } }],
        description: isEarth ? 'Tăng 200 DEF khi phòng thủ.' : 'Gây 300 LP bốc cháy kiềm.'
      }
    ]
  };

  batch01Cards.push(card);
}
writeBatchFile('batch_01_monsters_main_alkali_earth.ts', 'BATCH_01_CARDS', 'Batch 01: Alkali & Alkaline Earth Monsters', batch01Cards);

// ==========================================
// BATCH 02: 100 Transition Metal Monsters
// ==========================================
const batch02Cards: CardDef[] = [];

const transitionData = [
  { el: 'Sc', z: 21, name: 'Scandi', en: 'Scandium', attr: 'TERRA' as const, f: 'Sc2O3', eq: '4Sc + 3O₂ → 2Sc₂O₃' },
  { el: 'Ti', z: 22, name: 'Titan', en: 'Titanium', attr: 'TERRA' as const, f: 'TiO2', eq: 'Ti + O₂ → TiO₂' },
  { el: 'V', z: 23, name: 'Vanadi', en: 'Vanadium', attr: 'PYRO' as const, f: 'V2O5', eq: '4V + 5O₂ → 2V₂O₅' },
  { el: 'Cr', z: 24, name: 'Crom', en: 'Chromium', attr: 'PYRO' as const, f: 'Cr2O3', eq: '4Cr + 3O₂ → 2Cr₂O₃' },
  { el: 'Mn', z: 25, name: 'Mangan', en: 'Manganese', attr: 'ACID_DARK' as const, f: 'MnO2', eq: 'Mn + O₂ → MnO₂' },
  { el: 'Fe', z: 26, name: 'Sắt', en: 'Iron', attr: 'TERRA' as const, f: 'Fe3O4', eq: '3Fe + 2O₂ → Fe₃O₄' },
  { el: 'Co', z: 27, name: 'Coban', en: 'Cobalt', attr: 'ELECTRO' as const, f: 'CoCl2', eq: 'Co + Cl₂ → CoCl₂' },
  { el: 'Ni', z: 28, name: 'Niken', en: 'Nickel', attr: 'ELECTRO' as const, f: 'NiO', eq: '2Ni + O₂ → 2NiO' },
  { el: 'Cu', z: 29, name: 'Đồng', en: 'Copper', attr: 'ELECTRO' as const, f: 'CuSO4', eq: 'Cu + 2H₂SO₄ → CuSO₄ + SO₂ + 2H₂O' },
  { el: 'Zn', z: 30, name: 'Kẽm', en: 'Zinc', attr: 'TERRA' as const, f: 'ZnO', eq: '2Zn + O₂ → 2ZnO' },
  { el: 'Mo', z: 42, name: 'Molipden', en: 'Molybdenum', attr: 'TERRA' as const, f: 'MoO3', eq: '2Mo + 3O₂ → 2MoO₃' },
  { el: 'W', z: 74, name: 'Wolfram', en: 'Tungsten', attr: 'PYRO' as const, f: 'WO3', eq: '2W + 3O₂ → 2WO₃' },
  { el: 'Ru', z: 44, name: 'Ruteni', en: 'Ruthenium', attr: 'AQUA' as const, f: 'RuO4', eq: 'Ru + 2O₂ → RuO₄' },
  { el: 'Rh', z: 45, name: 'Rodi', en: 'Rhodium', attr: 'AQUA' as const, f: 'Rh2O3', eq: '4Rh + 3O₂ → 2Rh₂O₃' },
  { el: 'Pd', z: 46, name: 'Paladi', en: 'Palladium', attr: 'ELECTRO' as const, f: 'PdCl2', eq: 'Pd + Cl₂ → PdCl₂' },
  { el: 'Ag', z: 47, name: 'Bạc', en: 'Silver', attr: 'AQUA' as const, f: 'AgNO3', eq: '3Ag + 4HNO₃ → 3AgNO₃ + NO + 2H₂O' },
  { el: 'Pt', z: 78, name: 'Bạch Kim', en: 'Platinum', attr: 'NOBLE_VOID' as const, f: 'PtCl4', eq: 'Pt + 2Cl₂ → PtCl₄' },
  { el: 'Au', z: 79, name: 'Vàng', en: 'Gold', attr: 'NOBLE_VOID' as const, f: 'AuCl3', eq: '2Au + 3Cl₂ → 2AuCl₃' }
];

const transRoles = ['Chiến Giáp', 'Thợ Rèn', 'Kiếm Vương', 'Pháo Đài', 'Đao Phủ', 'Hộ Vệ'];

for (let i = 0; i < 100; i++) {
  const base = transitionData[i % transitionData.length];
  const role = transRoles[Math.floor(i / transitionData.length) % transRoles.length];
  const isPrecious = ['Ru', 'Rh', 'Pd', 'Ag', 'Pt', 'Au'].includes(base.el);
  const archetype = isPrecious ? 'PRECIOUS_CATALYST' : 'TRANSITION_FORGE';

  const level = 3 + (i % 6); // 3 to 8
  const baseAtk = 1200 + (level * 200) + ((i % 4) * 80);
  const baseDef = 1000 + (level * 180) + ((i % 5) * 60);
  const manaCost = Math.min(8, Math.max(2, Math.floor(level / 1.1)));

  const card: CardDef = {
    id: `card_b02_${String(i + 1).padStart(3, '0')}_${base.el.toLowerCase()}_${i + 1}`,
    name: `${base.name} — ${role} Đa Hóa Trị (Ký hiệu ${base.f})`,
    name_en: `${base.en} — Multivalent ${role} (${base.f})`,
    cardType: 'ELEMENT_MONSTER',
    rarity: getRarity(i + 2),
    attribute: base.attr,
    manaCost,
    level,
    atk: baseAtk,
    def: baseDef,
    chemicalFormula: base.f,
    atomicNumber: base.z,
    effectCode: `ELEM_B02_${base.el.toUpperCase()}_VALENCE_${i + 1}`,
    effectText: isPrecious
      ? `Một lần mỗi lượt: Giảm 1 Mana kích hoạt cho thẻ Phép tiếp theo. Khi chiến đấu, không bị tiêu diệt bởi quái thú có ATK thấp hơn.`
      : `Một lần mỗi lượt: Có thể hoán đổi chỉ số ATK và DEF cơ bản đến hết lượt (chuyển đổi số oxi hóa).`,
    scientificLore: `${base.name} (${base.el}, Z=${base.z}) là kim loại chuyển tiếp phân lớp d/f với nhiều mức oxi hóa bền vững trong hợp chất ${base.f}.`,
    relatedEquation: base.eq,
    iupacName: `${base.en} Compound`,
    archetype,
    structuredEffects: [
      {
        effectId: `B02_EFF_${i + 1}`,
        activationWindow: 'IGNITION',
        operations: isPrecious
          ? [{ op: 'RECOVER_RESOURCE', params: { amount: 1 } }]
          : [{ op: 'MODIFY_STATS', params: { amount: 300, statTarget: 'ATK', targetScope: 'SELF' } }],
        description: isPrecious ? 'Phục hồi 1 Mana xúc tác.' : 'Tăng 300 ATK kích hoạt hóa trị.'
      }
    ]
  };

  batch02Cards.push(card);
}
writeBatchFile('batch_02_monsters_main_transition_metals.ts', 'BATCH_02_CARDS', 'Batch 02: Transition Metal Monsters', batch02Cards);

// ==========================================
// BATCH 03: 100 Halogen & Chalcogen Monsters
// ==========================================
const batch03Cards: CardDef[] = [];

const haloChalcoData = [
  { el: 'F', z: 9, name: 'Flo', en: 'Fluorine', attr: 'AERO' as const, f: 'F2', eq: '2F₂ + 2H₂O → 4HF + O₂' },
  { el: 'Cl', z: 17, name: 'Clo', en: 'Chlorine', attr: 'AERO' as const, f: 'Cl2', eq: 'Cl₂ + H₂O ⇌ HCl + HClO' },
  { el: 'Br', z: 35, name: 'Brom', en: 'Bromine', attr: 'AQUA' as const, f: 'Br2', eq: 'Br₂ + 2KI → 2KBr + I₂' },
  { el: 'I', z: 53, name: 'Iot', en: 'Iodine', attr: 'TERRA' as const, f: 'I2', eq: 'I₂ + starch → Dark Blue Complex' },
  { el: 'At', z: 85, name: 'Astatin', en: 'Astatine', attr: 'ACID_DARK' as const, f: 'At2', eq: '2At⁻ - 2e⁻ → At₂' },
  { el: 'O', z: 8, name: 'Oxy', en: 'Oxygen', attr: 'AERO' as const, f: 'O3', eq: '3O₂ → 2O₃' },
  { el: 'S', z: 16, name: 'Lưu Huỳnh', en: 'Sulfur', attr: 'PYRO' as const, f: 'S8', eq: 'S + O₂ → SO₂' },
  { el: 'Se', z: 34, name: 'Selen', en: 'Selenium', attr: 'ELECTRO' as const, f: 'SeO2', eq: 'Se + O₂ → SeO₂' },
  { el: 'Te', z: 52, name: 'Telu', en: 'Tellurium', attr: 'TERRA' as const, f: 'TeO2', eq: 'Te + O₂ → TeO₂' },
  { el: 'Po', z: 84, name: 'Poloni', en: 'Polonium', attr: 'ACID_DARK' as const, f: 'PoO2', eq: 'Po + O₂ → PoO₂' }
];

const haloRoles = ['Kẻ Bào Mòn', 'Thợ Săn Oxi Hóa', 'Kẻ Huỷ Diệt', 'Hỏa Ngục', 'Bão Độc', 'Tia Chớp'];

for (let i = 0; i < 100; i++) {
  const base = haloChalcoData[i % haloChalcoData.length];
  const role = haloRoles[Math.floor(i / haloChalcoData.length) % haloRoles.length];
  const isHalogen = ['F', 'Cl', 'Br', 'I', 'At'].includes(base.el);
  const archetype = isHalogen ? 'HALOGEN_PURGE' : 'CHALCOGEN_EMBER';

  const level = 2 + (i % 6);
  const baseAtk = 900 + (level * 220) + ((i % 5) * 60);
  const baseDef = 700 + (level * 160) + ((i % 4) * 50);
  const manaCost = Math.min(8, Math.max(1, Math.floor(level / 1.2)));

  const card: CardDef = {
    id: `card_b03_${String(i + 1).padStart(3, '0')}_${base.el.toLowerCase()}_${i + 1}`,
    name: `${base.name} — ${role} (${base.f} Dạng ${i + 1})`,
    name_en: `${base.en} — ${role} Specimen ${i + 1}`,
    cardType: 'ELEMENT_MONSTER',
    rarity: getRarity(i + 4),
    attribute: base.attr,
    manaCost,
    level,
    atk: baseAtk,
    def: baseDef,
    chemicalFormula: base.f,
    atomicNumber: base.z,
    effectCode: `ELEM_B03_${base.el.toUpperCase()}_PURGE_${i + 1}`,
    effectText: isHalogen
      ? `Khi tấn công: Bào mòn ${200 + (i % 3) * 100} ATK của quái thú mục tiêu trước khi tính toán sát thương.`
      : `Khi bị tiêu diệt: Gây ${300 + (i % 4) * 100} LP sát thương nhiệt lên người chơi tiêu diệt nó.`,
    scientificLore: `${base.name} (${base.el}, Z=${base.z}) có độ âm điện lớn, tính oxi hóa mãnh liệt tạo thành dạng thù hình ${base.f}.`,
    relatedEquation: base.eq,
    iupacName: `${base.en} Allotrope`,
    archetype,
    structuredEffects: [
      {
        effectId: `B03_EFF_${i + 1}`,
        activationWindow: isHalogen ? 'ON_ATTACK_DECLARE' : 'ON_DESTROY',
        operations: isHalogen
          ? [{ op: 'MODIFY_STATS', params: { amount: 300, statTarget: 'ATK', targetScope: 'ALL_ENEMIES' } }]
          : [{ op: 'BURN_DAMAGE', params: { amount: 400 } }],
        description: isHalogen ? 'Bào mòn 300 ATK quái thú đối phương.' : 'Nổ 400 LP khi bị tiêu diệt.'
      }
    ]
  };

  batch03Cards.push(card);
}
writeBatchFile('batch_03_monsters_main_halogens_chalcogens.ts', 'BATCH_03_CARDS', 'Batch 03: Halogen & Chalcogen Monsters', batch03Cards);

// ==========================================
// BATCH 04: 100 Noble Gas & Pnictogen Monsters
// ==========================================
const batch04Cards: CardDef[] = [];

const noblePnicData = [
  { el: 'He', z: 2, name: 'Heli', en: 'Helium', attr: 'NOBLE_VOID' as const, f: 'He', eq: 'He (1s² Closed Duet Octet Equivalent)' },
  { el: 'Ne', z: 10, name: 'Neon', en: 'Neon', attr: 'NOBLE_VOID' as const, f: 'Ne', eq: 'Ne (2s² 2p⁶ Closed Shell)' },
  { el: 'Ar', z: 18, name: 'Argon', en: 'Argon', attr: 'NOBLE_VOID' as const, f: 'Ar', eq: 'Ar (3s² 3p⁶ Closed Shell)' },
  { el: 'Kr', z: 36, name: 'Krypton', en: 'Krypton', attr: 'NOBLE_VOID' as const, f: 'KrF2', eq: 'Kr + F₂ → KrF₂' },
  { el: 'Xe', z: 54, name: 'Xenon', en: 'Xenon', attr: 'NOBLE_VOID' as const, f: 'XeF4', eq: 'Xe + 2F₂ → XeF₄' },
  { el: 'Rn', z: 86, name: 'Radon', en: 'Radon', attr: 'NOBLE_VOID' as const, f: 'RnF2', eq: 'Rn + F₂ → RnF₂' },
  { el: 'N', z: 7, name: 'Nito', en: 'Nitrogen', attr: 'AERO' as const, f: 'N2', eq: 'N₂ + 3H₂ ⇌ 2NH₃' },
  { el: 'P', z: 15, name: 'Photpho', en: 'Phosphorus', attr: 'PYRO' as const, f: 'P4', eq: 'P₄ + 5O₂ → P₄O₁₀' },
  { el: 'As', z: 33, name: 'Asen', en: 'Arsenic', attr: 'ACID_DARK' as const, f: 'As2O3', eq: '4As + 3O₂ → 2As₂O₃' },
  { el: 'Sb', z: 51, name: 'Antimon', en: 'Antimony', attr: 'TERRA' as const, f: 'Sb2S3', eq: '2Sb + 3S → Sb₂S₃' },
  { el: 'Bi', z: 83, name: 'Bismut', en: 'Bismuth', attr: 'TERRA' as const, f: 'Bi2O3', eq: '4Bi + 3O₂ → 2Bi₂O₃' }
];

const nobleRoles = ['Hộ Thần', 'Linh Hồn', 'Bong Bóng Khí', 'Lăng Kính', 'Tiên Phong', 'Trọng Pháo'];

for (let i = 0; i < 100; i++) {
  const base = noblePnicData[i % noblePnicData.length];
  const role = nobleRoles[Math.floor(i / noblePnicData.length) % nobleRoles.length];
  const isNoble = ['He', 'Ne', 'Ar', 'Kr', 'Xe', 'Rn'].includes(base.el);
  const archetype = isNoble ? 'NOBLE_VOID' : 'PNICTOGEN_SPIRIT';

  const level = 2 + (i % 6);
  const baseAtk = isNoble ? 500 + (level * 180) : 1000 + (level * 230);
  const baseDef = isNoble ? 1500 + (level * 250) : 800 + (level * 180);
  const manaCost = Math.min(8, Math.max(1, Math.floor(level / 1.2)));

  const card: CardDef = {
    id: `card_b04_${String(i + 1).padStart(3, '0')}_${base.el.toLowerCase()}_${i + 1}`,
    name: `${base.name} — ${role} (${base.f} Biến Thể ${i + 1})`,
    name_en: `${base.en} — ${role} Kinetic ${i + 1}`,
    cardType: 'ELEMENT_MONSTER',
    rarity: getRarity(i + 1),
    attribute: base.attr,
    manaCost,
    level,
    atk: baseAtk,
    def: baseDef,
    chemicalFormula: base.f,
    atomicNumber: base.z,
    effectCode: `ELEM_B04_${base.el.toUpperCase()}_OCTET_${i + 1}`,
    effectText: isNoble
      ? `Lớp vỏ bát tử bền vững: Khi ở tư thế Phòng thủ, không thể bị tiêu diệt bởi hiệu ứng thẻ bài của đối phương.`
      : `Khi triệu hồi: Đối thủ chịu hiệu ứng nhiễm độc pnictogen, mất ${200 + (i % 4) * 100} LP.`,
    scientificLore: `${base.name} (${base.el}, Z=${base.z}) cấu hình electron bão hòa hoặc lai hóa $sp^3$ linh hoạt theo chương trình GDPT 2018.`,
    relatedEquation: base.eq,
    iupacName: `${base.en} Entity`,
    archetype,
    structuredEffects: [
      {
        effectId: `B04_EFF_${i + 1}`,
        activationWindow: isNoble ? 'IGNITION' : 'ON_SUMMON',
        operations: isNoble
          ? [{ op: 'APPLY_STATUS', params: { statusType: 'INERT_OCTET' } }]
          : [{ op: 'BURN_DAMAGE', params: { amount: 300 } }],
        description: isNoble ? 'Kích hoạt khiên bát tử trơ.' : 'Nhiễm độc 300 LP.'
      }
    ]
  };

  batch04Cards.push(card);
}
writeBatchFile('batch_04_monsters_main_noble_pnictogens.ts', 'BATCH_04_CARDS', 'Batch 04: Noble Gas & Pnictogen Monsters', batch04Cards);

// ==========================================
// BATCH 05: 100 Organic & Hydrocarbon Monsters
// ==========================================
const batch05Cards: CardDef[] = [];

const organicData = [
  { name: 'Metan', en: 'Methane', f: 'CH4', attr: 'AERO' as const, c: 1, eq: 'CH₄ + 2O₂ → CO₂ + 2H₂O' },
  { name: 'Etan', en: 'Ethane', f: 'C2H6', attr: 'AERO' as const, c: 2, eq: '2C₂H₆ + 7O₂ → 4CO₂ + 6H₂O' },
  { name: 'Propan', en: 'Propane', f: 'C3H8', attr: 'PYRO' as const, c: 3, eq: 'C₃H₈ + 5O₂ → 3CO₂ + 4H₂O' },
  { name: 'Butan', en: 'Butane', f: 'C4H10', attr: 'PYRO' as const, c: 4, eq: '2C₄H₁₀ + 13O₂ → 8CO₂ + 10H₂O' },
  { name: 'Etylen', en: 'Ethylene', f: 'C2H4', attr: 'AERO' as const, c: 2, eq: 'C₂H₄ + Br₂ → C₂H₄Br₂' },
  { name: 'Propylen', en: 'Propylene', f: 'C3H6', attr: 'AERO' as const, c: 3, eq: 'C₃H₆ + H₂O → C₃H₇OH' },
  { name: 'Axetylen', en: 'Acetylene', f: 'C2H2', attr: 'PYRO' as const, c: 2, eq: '2C₂H₂ + 5O₂ → 4CO₂ + 2H₂O' },
  { name: 'Butadien', en: 'Butadiene', f: 'C4H6', attr: 'PYRO' as const, c: 4, eq: 'nC₄H₆ → (-CH₂-CH=CH-CH₂-)n' },
  { name: 'Benzen', en: 'Benzene', f: 'C6H6', attr: 'TERRA' as const, c: 6, eq: 'C₆H₆ + Br₂ → C₆H₅Br + HBr' },
  { name: 'Toluen', en: 'Toluene', f: 'C7H8', attr: 'TERRA' as const, c: 7, eq: 'C₇H₈ + 3HNO₃ → TNT + 3H₂O' },
  { name: 'Naphtalen', en: 'Naphthalene', f: 'C10H8', attr: 'TERRA' as const, c: 10, eq: 'C₁₀H₈ + 12O₂ → 10CO₂ + 4H₂O' },
  { name: 'Antraxen', en: 'Anthracene', f: 'C14H10', attr: 'TERRA' as const, c: 14, eq: 'C₁₄H₁₀ + 16.5O₂ → 14CO₂ + 5H₂O' }
];

const orgClasses = ['Chiến Binh Mạch Hở', 'Kỵ Sĩ Vòng Thơm', 'Xúc Tác Trùng Hợp', 'Lính Tiên Phong Carbon', 'Thần Tượng Năng Lượng'];

for (let i = 0; i < 100; i++) {
  const base = organicData[i % organicData.length];
  const cls = orgClasses[Math.floor(i / organicData.length) % orgClasses.length];
  const isAromatic = ['Benzen', 'Toluen', 'Naphtalen', 'Antraxen'].includes(base.name);
  const archetype = isAromatic ? 'AROMATIC_RING' : 'HYDROCARBON_CHAIN';

  const level = 2 + (i % 6);
  const baseAtk = 950 + (level * 210) + ((i % 5) * 50);
  const baseDef = 850 + (level * 190) + ((i % 4) * 60);
  const manaCost = Math.min(8, Math.max(1, Math.floor(level / 1.2)));

  const card: CardDef = {
    id: `card_b05_${String(i + 1).padStart(3, '0')}_${base.name.toLowerCase()}_${i + 1}`,
    name: `${base.name} — ${cls} (${base.f} Đồng Đẳng ${i + 1})`,
    name_en: `${base.en} — ${cls} Homolog ${i + 1}`,
    cardType: 'ELEMENT_MONSTER',
    rarity: getRarity(i + 3),
    attribute: base.attr,
    manaCost,
    level,
    atk: baseAtk,
    def: baseDef,
    chemicalFormula: base.f,
    effectCode: `ELEM_B05_${base.en.toUpperCase()}_CHAIN_${i + 1}`,
    effectText: isAromatic
      ? `Hệ cộng hưởng electron π liên hợp: Giảm 400 sát thương chiến đấu nhận vào từ mỗi đòn tấn công.`
      : `Khi có quái thú Hydrocarbon khác trên sân: Tăng 300 ATK và có thể dùng làm 2 nguyên liệu triệu hồi Link/Synchro.`,
    scientificLore: `${base.name} (${base.f}) là hydrocarbon tiêu biểu trong chương trình Hóa học hữu cơ lớp 11 GDPT 2018 với phản ứng cháy tỏa năng lượng lớn.`,
    relatedEquation: base.eq,
    iupacName: base.en,
    archetype,
    structuredEffects: [
      {
        effectId: `B05_EFF_${i + 1}`,
        activationWindow: 'IGNITION',
        operations: [
          { op: 'MODIFY_STATS', params: { amount: 300, statTarget: 'ATK', targetScope: 'SELF' } }
        ],
        description: 'Tăng 300 ATK phản ứng nối mạch hydrocarbon.'
      }
    ]
  };

  batch05Cards.push(card);
}
writeBatchFile('batch_05_monsters_main_organic_hydrocarbons.ts', 'BATCH_05_CARDS', 'Batch 05: Organic & Hydrocarbon Monsters', batch05Cards);

console.log('[BATCH 01-05 COMPLETED] 500 Main Deck Monsters successfully generated and validated.');
