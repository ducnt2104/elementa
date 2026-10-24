// scripts/gen-batches-21-to-24.ts
// Generator for Batches 21 to 24: 400 Trap Cards (Normal, Continuous, Counter, Titration)

import { CardDef, getRarity, writeBatchFile } from './build-all-card-batches';

console.log('[BATCH 21-24] Synthesizing 400 Trap Cards (Normal, Continuous, Counter, Titration)...');

// ==========================================
// BATCH 21: 120 Normal Countermeasure Traps
// ==========================================
const batch21Cards: CardDef[] = [];

const normalTraps = [
  { name: 'Bẫy Kết Tủa Bạc Clorua Trắng', en: 'Silver Chloride Precipitation Barrier', f: 'AgCl↓', attr: 'TERRA' as const, eq: 'Ag⁺(aq) + Cl⁻(aq) → AgCl(s)↓ (Ksp = 1.77×10⁻¹⁰)' },
  { name: 'Bẫy Phun Khí Bột Chữa Cháy NaHCO3', en: 'Dry Chemical Extinguisher Quench', f: '2NaHCO3', attr: 'AERO' as const, eq: '2NaHCO₃ --heat--> Na₂CO₃ + H₂O + CO₂↑' },
  { name: 'Bẫy Anode Hy Sinh Chống Ăn Mòn', en: 'Sacrificial Zinc Anode Discharge', f: 'Zn → Zn2+ + 2e-', attr: 'ELECTRO' as const, eq: 'Zn(s) → Zn²⁺(aq) + 2e⁻ (E° = -0.76V vs Fe -0.44V)' },
  { name: 'Bẫy Kết Tủa Vàng Bari Sunfat', en: 'Heavy Barium Sulfate Blockade', f: 'BaSO4↓', attr: 'TERRA' as const, eq: 'Ba²⁺(aq) + SO₄²⁻(aq) → BaSO₄(s)↓ (Ksp = 1.08×10⁻¹⁰)' },
  { name: 'Bẫy Khí Clo Khử Trùng Cực Mạnh', en: 'Bleach Hypochlorite Vapor Trap', f: 'NaClO + HCl', attr: 'AERO' as const, eq: 'NaClO + 2HCl → NaCl + Cl₂↑ + H₂O' },
  { name: 'Bẫy Hấp Phụ Khí Độc Bằng Than Hoạt Tính', en: 'Activated Carbon Adsorption Net', f: 'C(adsorb)', attr: 'TERRA' as const, eq: 'Langmuir / Freundlich Multilayer Adsorption' },
  { name: 'Bẫy Kết Tủa Chì(II) Iotua Hoàng Kim', en: 'Lead(II) Iodide Golden Rain Trap', f: 'PbI2↓', attr: 'TERRA' as const, eq: 'Pb²⁺(aq) + 2I⁻(aq) → PbI₂(s)↓ (Golden Glitter)' },
  { name: 'Bẫy Thoát Khí Hydro Nổ Tức Thời', en: 'Hydrogen Gas Knallgas Detonation Trap', f: '2H2 + O2', attr: 'PYRO' as const, eq: '2H₂ + O₂ → 2H₂O (Explosive Shockwave)' }
];

for (let i = 0; i < 120; i++) {
  const base = normalTraps[i % normalTraps.length];
  const iteration = Math.floor(i / normalTraps.length) + 1;
  const manaCost = 1 + (i % 4);

  const card: CardDef = {
    id: `card_b21_${String(i + 1).padStart(3, '0')}_trap_${base.en.toLowerCase().replace(/[^a-z0-9]/g, '_')}_${i + 1}`,
    name: `${base.name} (Tầng Bẫy ${iteration})`,
    name_en: `${base.en} (Barrier Level ${iteration})`,
    cardType: 'TRAP',
    spellTrapSubtype: 'NORMAL_TRAP',
    spellSpeed: 2,
    rarity: getRarity(i),
    attribute: base.attr,
    manaCost,
    chemicalFormula: base.f,
    effectCode: `TRAP_B21_${base.en.toUpperCase().replace(/[^A-Z0-9]/g, '_')}_NORM_${i + 1}`,
    effectText: `[Bẫy Thường / Normal Trap - Spell Speed 2]: Khi quái thú đối phương tuyên bố tấn công: Hủy bỏ đòn tấn công và chuyển quái thú đó sang tư thế Phòng thủ, đồng thời gây 300 LP phản chấn.`,
    scientificLore: `Hiện tượng hóa học ${base.name} (${base.eq}) ngăn chặn sự lan truyền phản ứng hoặc bẫy bắt các ion tự do thành pha rắn/khí trơ theo chuẩn GDPT 2018.`,
    relatedEquation: base.eq,
    iupacName: `${base.en} Countermeasure`,
    archetype: i % 2 === 0 ? 'PRECIPITATION_TRAP' : 'HALOGEN_PURGE',
    structuredEffects: [
      {
        effectId: `B21_EFF_${i + 1}`,
        activationWindow: 'ON_ATTACK_DECLARE',
        operations: [
          { op: 'APPLY_STATUS', params: { statusType: 'POSITION_LOCKED', turns: 1 } },
          { op: 'BURN_DAMAGE', params: { amount: 300 } }
        ],
        description: 'Chặn đứng đòn tấn công, khóa tư thế quái thú địch và gây 300 LP.'
      }
    ]
  };

  batch21Cards.push(card);
}
writeBatchFile('batch_21_traps_normal_countermeasures.ts', 'BATCH_21_CARDS', 'Batch 21: Normal Countermeasure Traps', batch21Cards);

// ==========================================
// BATCH 22: 100 Continuous Corrosion & Passivation Traps
// ==========================================
const batch22Cards: CardDef[] = [];

const continuousTraps = [
  { name: 'Màng Thụ Động Hóa Oxit Nhôm Bền Vững', en: 'Al2O3 Passivation Shield Net', f: 'Al2O3 Film', attr: 'TERRA' as const, eq: '4Al + 3O₂ → 2Al₂O₃ (Impermeable Protective Oxide Film)' },
  { name: 'Quá Trình Rỉ Sét Ăn Mòn Điện Hóa', en: 'Electrochemical Rust Pitting Corrosion', f: 'Fe2O3·xH2O', attr: 'ACID_DARK' as const, eq: '4Fe + 3O₂ + 2xH₂O → 2Fe₂O₃·xH₂O (Rust Pitting)' },
  { name: 'Mưa Axit Bào Mòn Đá Vôi Lâu Dài', en: 'Acid Rain Chemical Leaching', f: 'H2SO4+CaCO3', attr: 'ACID_DARK' as const, eq: 'CaCO₃ + H₂SO₄ → CaSO₄ + H₂O + CO₂↑' },
  { name: 'Lớp Vỏ Mạ Niken Chống Oxy Hóa', en: 'Electroless Nickel Plating Armor', f: 'Ni-P Alloy', attr: 'ELECTRO' as const, eq: 'Ni²⁺ + H₂PO₂⁻ + H₂O → Ni + H₂PO₃⁻ + 2H⁺' },
  { name: 'Màng Sơn Chống Gỉ Chứa Kẽm Phốt Phát', en: 'Zinc Phosphate Anti-Corrosive Primer', f: 'Zn3(PO4)2', attr: 'TERRA' as const, eq: 'Metal Phosphatizing Crystalline Surface Passivation' },
  { name: 'Ăn Mòn Ranh Giới Hạt Thép Không Gỉ', en: 'Intergranular Corrosion Sensitization', f: 'Cr23C6 Depletion', attr: 'ACID_DARK' as const, eq: 'Chromium Carbide Precipitation at Grain Boundaries' },
  { name: 'Xâm Nhập Khí H2S Gây Giòn Kim Loại', en: 'Hydrogen Sulfide Stress Cracking', f: 'Fe + H2S', attr: 'ACID_DARK' as const, eq: 'Fe + H₂S → FeS + 2H(absorbed atomic embrittlement)' },
  { name: 'Bong Tróc Điện Hóa Vùng Cathode', en: 'Cathodic Delamination Paint Strip', f: '2H2O + 2e-', attr: 'ELECTRO' as const, eq: '2H₂O + 2e⁻ + O₂ → 4OH⁻ (High Local pH Delamination)' }
];

for (let i = 0; i < 100; i++) {
  const base = continuousTraps[i % continuousTraps.length];
  const iteration = Math.floor(i / continuousTraps.length) + 1;
  const manaCost = 2 + (i % 4);

  const card: CardDef = {
    id: `card_b22_${String(i + 1).padStart(3, '0')}_cont_trap_${base.en.toLowerCase().replace(/[^a-z0-9]/g, '_')}_${i + 1}`,
    name: `${base.name} (Quá Trình ${iteration})`,
    name_en: `${base.en} (Process ${iteration})`,
    cardType: 'TRAP',
    spellTrapSubtype: 'CONTINUOUS_TRAP',
    spellSpeed: 2,
    rarity: getRarity(i + 2),
    attribute: base.attr,
    manaCost,
    chemicalFormula: base.f,
    effectCode: `TRAP_B22_${base.en.toUpperCase().replace(/[^A-Z0-9]/g, '_')}_CONT_${i + 1}`,
    effectText: `[Bẫy Liên Tục / Continuous Trap - Spell Speed 2]: Duy trì trên sân. Mỗi khi đối thủ tuyên bố đòn tấn công hoặc kích hoạt hiệu ứng: Giảm 200 ATK của quái thú đó và đối thủ nhận 200 LP sát thương ăn mòn tích lũy.`,
    scientificLore: `Quá trình ăn mòn kim loại và thụ động hóa ${base.name} (${base.eq}) là bài toán thực tiễn quan trọng bậc nhất trong chuyên đề Hóa học 12 GDPT 2018.`,
    relatedEquation: base.eq,
    iupacName: `${base.en} Field`,
    archetype: i % 2 === 0 ? 'STRONG_ACID_CORROSION' : 'SURFACE_ADSORPTION',
    structuredEffects: [
      {
        effectId: `B22_EFF_${i + 1}`,
        activationWindow: 'ON_ATTACK_DECLARE',
        operations: [
          { op: 'MODIFY_STATS', params: { amount: 200, statTarget: 'ATK', targetScope: 'ALL_ENEMIES' } },
          { op: 'BURN_DAMAGE', params: { amount: 200 } }
        ],
        description: 'Bào mòn 200 ATK địch và gây 200 LP sát thương ăn mòn tích lũy.'
      }
    ]
  };

  batch22Cards.push(card);
}
writeBatchFile('batch_22_traps_continuous_corrosion.ts', 'BATCH_22_CARDS', 'Batch 22: Continuous Passivation & Corrosion Traps', batch22Cards);

// ==========================================
// BATCH 23: 100 Counter Traps (Spell Speed 3!)
// ==========================================
const batch23Cards: CardDef[] = [];

const counterTraps = [
  { name: 'Phản Đòn Cân Bằng Động Le Chatelier', en: 'Le Chatelier Counter Displacement', f: 'Kc Reversion', attr: 'NOBLE_VOID' as const, eq: 'Instantaneous Shift Neutralizing External Disturbance' },
  { name: 'Quá Thế Điện Cực Chặn Đứng Dòng Electron', en: 'Electrochemical Overpotential Counter Stop', f: 'η Overpotential', attr: 'ELECTRO' as const, eq: 'Kinetic Activation Overpotential Halting Electrolysis' },
  { name: 'Chất Độc Xúc Tác Vô Hiệu Trung Tâm Hoạt Hóa', en: 'Catalyst Poison Irreversible Inhibition', f: 'CO/H2S Poison', attr: 'ACID_DARK' as const, eq: 'Irreversible Chemisorption Blocking Active Catalyst Sites' },
  { name: 'Bẫy Triệt Tiêu Hiệu Ứng Bằng Phức Chelate', en: 'Chelation Metal Ion Quench Counter', f: 'EDTA Binding', attr: 'AQUA' as const, eq: 'Thermodynamic Chelate Effect ΔS > 0 Formation' },
  { name: 'Bẫy Đệm Chống Đột Biến Proton pH', en: 'Universal Buffer Proton Quench', f: 'Buffer Capacity', attr: 'AQUA' as const, eq: 'Henderson-Hasselbalch Equation pH Homeostasis' },
  { name: 'Bẫy Khử Gốc Tự Do Bằng Chất Chống Oxi Hóa', en: 'Free Radical Scavenger Chain Terminator', f: 'Antioxidant', attr: 'TERRA' as const, eq: 'R· + Inh-H → RH + Inh· (Stable Inactive Radical)' },
  { name: 'Bẫy Kháng Điện Áp Ngược Pin Galvanic', en: 'Reverse Polar Electro-Quench Counter', f: 'Back-EMF', attr: 'ELECTRO' as const, eq: 'External Opposing Voltage Exceeding Cell Potential E_cell' },
  { name: 'Bẫy Triệt Phá Tinh Thể Bằng Chất Ức Chế Mầm', en: 'Nucleation Inhibitor Crystal Shatter', f: 'Polyphosphate', attr: 'NOBLE_VOID' as const, eq: 'Sub-Stoichiometric Threshold Scale Inhibition' }
];

for (let i = 0; i < 100; i++) {
  const base = counterTraps[i % counterTraps.length];
  const iteration = Math.floor(i / counterTraps.length) + 1;
  const manaCost = 1 + (i % 4);

  const card: CardDef = {
    id: `card_b23_${String(i + 1).padStart(3, '0')}_counter_${base.en.toLowerCase().replace(/[^a-z0-9]/g, '_')}_${i + 1}`,
    name: `${base.name} (Cấp Độ Phản Kích ${iteration})`,
    name_en: `${base.en} (Counter Rank ${iteration})`,
    cardType: 'TRAP',
    spellTrapSubtype: 'COUNTER_TRAP',
    // Rulebook v10 tr. 14, 46: Counter Traps have Spell Speed 3! Only Counter Traps can chain to Counter Traps.
    spellSpeed: 3,
    rarity: getRarity(i + 4),
    attribute: base.attr,
    manaCost,
    chemicalFormula: base.f,
    effectCode: `TRAP_B23_${base.en.toUpperCase().replace(/[^A-Z0-9]/g, '_')}_CNTR_${i + 1}`,
    effectText: `[Bẫy Phản Công / Counter Trap - Spell Speed 3]: Khi đối thủ kích hoạt một lá bài Phép, Bẫy hoặc hiệu ứng quái thú: Vô hiệu hóa kích hoạt đó và phá hủy lá bài của đối thủ!`,
    scientificLore: `Cơ chế triệt tiêu tức thời ${base.name} (${base.eq}) ngăn chặn phản ứng chuỗi ngay từ giai đoạn khởi đầu theo nguyên lý động học xúc tác GDPT 2018.`,
    relatedEquation: base.eq,
    iupacName: `${base.en} Protocol`,
    archetype: i % 2 === 0 ? 'LE_CHATELIER_EQUILIBRIUM' : 'ELECTROCHEMICAL_CELL',
    structuredEffects: [
      {
        effectId: `B23_EFF_${i + 1}`,
        activationWindow: 'QUICK',
        operations: [
          { op: 'NEGATE_EFFECT', params: {} },
          { op: 'DESTROY_CARD', params: { targetScope: 'ALL_ENEMIES' } }
        ],
        description: 'Spell Speed 3: Vô hiệu hóa kích hoạt của đối thủ và phá hủy lá bài đó.'
      }
    ]
  };

  batch23Cards.push(card);
}
writeBatchFile('batch_23_traps_counter_equilibrium.ts', 'BATCH_23_CARDS', 'Batch 23: Counter Chemical Equilibrium Traps', batch23Cards);

// ==========================================
// BATCH 24: 80 Titration & Precipitation Precision Traps
// ==========================================
const batch24Cards: CardDef[] = [];

const titrationTraps = [
  { name: 'Chỉ Thị Màu Phenolphthalein Điểm Đổi Màu', en: 'Phenolphthalein Equivalence Point Trap', f: 'C20H14O4', attr: 'AQUA' as const, eq: 'Colorless pH < 8.2 → Pink/Magenta pH > 10.0' },
  { name: 'Chỉ Thị Màu Metyl Da Cam Vùng Axit', en: 'Methyl Orange Acidic Endpoint Barrier', f: 'C14H14N3NaO3S', attr: 'PYRO' as const, eq: 'Red pH < 3.1 → Yellow pH > 4.4' },
  { name: 'Chuẩn Độ Kết Tủa Phương Pháp Mohr', en: 'Mohr Silver Chromate Endpoint Trap', f: 'Ag2CrO4(red)', attr: 'TERRA' as const, eq: '2Ag⁺ + CrO₄²⁻ → Ag₂CrO₄(s)↓ (Brick Red Precipitate)' },
  { name: 'Chuẩn Độ Oxi Hóa Khử Permanganat', en: 'Permanganate Self-Indicating Redox Endpoint', f: 'KMnO4', attr: 'ELECTRO' as const, eq: 'MnO₄⁻ + 8H⁺ + 5e⁻ → Mn²⁺ + 4H₂O (Purple to Colorless)' },
  { name: 'Chuẩn Độ Iot Định Lượng Tinh Bột', en: 'Iodometric Starch Blue Complex Trap', f: 'I2-Starch', attr: 'AQUA' as const, eq: 'I₂ + 2S₂O₃²⁻ → 2I⁻ + S₄O₆²⁻ (Blue Disappearance)' },
  { name: 'Đường Cong Chuẩn Độ pH Bước Nhảy Vọt', en: 'Titration Curve Sharp Equivalence Leap', f: 'dpH/dV_titrant', attr: 'ACID_DARK' as const, eq: 'Maximum 1st Derivative Inflection Point at Equivalence' },
  { name: 'Chuẩn Độ Điện Thế Bằng Điện Cực Thủy Tinh', en: 'Potentiometric Glass Electrode Endpoint Sensor', f: 'E_glass', attr: 'ELECTRO' as const, eq: 'Nernstian Potential Response to H⁺ Activity' },
  { name: 'Chuẩn Độ Độ Dẫn Điện Dung Dịch Muối', en: 'Conductometric Ion Replacement Endpoint Barrier', f: 'Conductivity κ', attr: 'ELECTRO' as const, eq: 'Conductivity V-Shape Minimum at Equivalence Point' }
];

for (let i = 0; i < 80; i++) {
  const base = titrationTraps[i % titrationTraps.length];
  const iteration = Math.floor(i / titrationTraps.length) + 1;
  const manaCost = 1 + (i % 4);

  const card: CardDef = {
    id: `card_b24_${String(i + 1).padStart(3, '0')}_titr_${base.en.toLowerCase().replace(/[^a-z0-9]/g, '_')}_${i + 1}`,
    name: `${base.name} (Điểm Chuẩn ${iteration})`,
    name_en: `${base.en} (Endpoint Rank ${iteration})`,
    cardType: 'TRAP',
    spellTrapSubtype: 'NORMAL_TRAP',
    spellSpeed: 2,
    rarity: getRarity(i + 3),
    attribute: base.attr,
    manaCost,
    chemicalFormula: base.f,
    effectCode: `TRAP_B24_${base.en.toUpperCase().replace(/[^A-Z0-9]/g, '_')}_TITR_${i + 1}`,
    effectText: `[Bẫy Chuẩn Độ / Titration Trap - Spell Speed 2]: Kích hoạt khi điểm sinh mệnh của bất kỳ đấu thủ nào thay đổi: Gây chính xác 500 LP sát thương chuẩn lên đối thủ và rút 1 lá bài từ Bộ bài.`,
    scientificLore: `Kỹ thuật chuẩn độ hóa học định lượng ${base.name} (${base.eq}) xác định chính xác nồng độ tại điểm tương đương theo chuẩn thực nghiệm Hóa học GDPT 2018.`,
    relatedEquation: base.eq,
    iupacName: `${base.en} Assay`,
    archetype: i % 2 === 0 ? 'TITRATION_PRECISION' : 'ALKALINE_EARTH_BASTION',
    structuredEffects: [
      {
        effectId: `B24_EFF_${i + 1}`,
        activationWindow: 'ON_LP_CHANGE',
        operations: [
          { op: 'BURN_DAMAGE', params: { amount: 500 } },
          { op: 'DRAW_CARD', params: { amount: 1 } }
        ],
        description: 'Chuẩn độ chính xác: Gây 500 LP và rút 1 lá bài khi LP biến động.'
      }
    ]
  };

  batch24Cards.push(card);
}
writeBatchFile('batch_24_traps_titration_passivation.ts', 'BATCH_24_CARDS', 'Batch 24: Titration & Precipitation Precision Traps', batch24Cards);

console.log('[BATCH 21-24 COMPLETED] 400 Trap Cards successfully generated and validated.');
