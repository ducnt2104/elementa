// scripts/gen-batches-15-to-20.ts
// Generator for Batches 15 to 20: 500 Spell Cards (Normal, Continuous, Equip, Field, Quick-Play, Ritual)

import { CardDef, getRarity, writeBatchFile } from './build-all-card-batches';

console.log('[BATCH 15-20] Synthesizing 500 Spell Cards (Normal, Continuous, Equip, Field, Quick-Play, Ritual)...');

// ==========================================
// BATCH 15: 100 Normal Chemical Reaction Spells
// ==========================================
const batch15Cards: CardDef[] = [];

const normalReactions = [
  { name: 'Phản Ứng Đốt Cháy Hoàn Toàn', en: 'Complete Combustion Flash', f: 'C_x H_y + O2', attr: 'PYRO' as const, eq: 'C_x H_y + (x+y/4)O₂ → xCO₂ + (y/2)H₂O' },
  { name: 'Phản Ứng Trung Hòa Chuẩn Độ', en: 'Acid-Base Neutralization Burst', f: 'H+ + OH-', attr: 'AQUA' as const, eq: 'H⁺(aq) + OH⁻(aq) → H₂O(l) (ΔH = -57.3 kJ/mol)' },
  { name: 'Phản Ứng Oxi Hóa Khử Pin Galvanic', en: 'Galvanic Redox Discharge', f: 'Zn + Cu2+', attr: 'ELECTRO' as const, eq: 'Zn(s) + Cu²⁺(aq) → Zn²⁺(aq) + Cu(s) (E° = +1.10V)' },
  { name: 'Phản Ứng Thế Halogen Ánh Sáng', en: 'Photochemical Halogenation', f: 'CH4 + Cl2', attr: 'AERO' as const, eq: 'CH₄ + Cl₂ --hν--> CH₃Cl + HCl' },
  { name: 'Phản Ứng Tách Nước Khử Ancol', en: 'Alcohol Acid Dehydration', f: 'C2H5OH', attr: 'TERRA' as const, eq: 'C₂H₅OH --H₂SO₄/170°C--> C₂H₄ + H₂O' },
  { name: 'Phản Ứng Este Hóa Fischer', en: 'Fischer Esterification Synthesis', f: 'RCOOH + R\'OH', attr: 'AQUA' as const, eq: 'RCOOH + R\'OH ⇌ RCOOR\' + H₂O' },
  { name: 'Phản Ứng Tráng Bạc Glucozo', en: 'Silver Mirror Tollens Reduction', f: 'C6H12O6 + Ag+', attr: 'NOBLE_VOID' as const, eq: 'C₆H₁₂O₆ + 2[Ag(NH₃)₂]OH → C₆H₁₂O₇ + 2Ag↓ + 4NH₃ + H₂O' },
  { name: 'Phản Ứng Nhiệt Phân Đá Vôi', en: 'Limestone Calcination Thermal Decomposition', f: 'CaCO3', attr: 'TERRA' as const, eq: 'CaCO₃ --1000°C--> CaO + CO₂↑' },
  { name: 'Phản Ứng Thủy Phân Muối Nhôm', en: 'Aluminum Cation Hydrolysis Acidification', f: 'Al3+ + 3H2O', attr: 'ACID_DARK' as const, eq: 'Al³⁺ + 3H₂O ⇌ Al(OH)₃↓ + 3H⁺' },
  { name: 'Phản Ứng Hòa Tan Vàng Bằng Cường Toan', en: 'Gold Solvation Dissolution', f: 'Au + HNO3 + 4HCl', attr: 'ACID_DARK' as const, eq: 'Au + HNO₃ + 4HCl → HAuCl₄ + NO + 2H₂O' }
];

for (let i = 0; i < 100; i++) {
  const base = normalReactions[i % normalReactions.length];
  const iteration = Math.floor(i / normalReactions.length) + 1;
  const manaCost = 1 + (i % 5);

  const card: CardDef = {
    id: `card_b15_${String(i + 1).padStart(3, '0')}_spell_${base.en.toLowerCase().replace(/[^a-z0-9]/g, '_')}_${i + 1}`,
    name: `${base.name} (Phương Trình ${iteration})`,
    name_en: `${base.en} (Equation ${iteration})`,
    cardType: 'REACTION_SPELL',
    spellTrapSubtype: 'NORMAL_SPELL',
    spellSpeed: 1,
    rarity: getRarity(i),
    attribute: base.attr,
    manaCost,
    chemicalFormula: base.f,
    effectCode: `SPELL_B15_${base.en.toUpperCase().replace(/[^A-Z0-9]/g, '_')}_ACT_${i + 1}`,
    effectText: `[Phép Phản Ứng Thường]: Kích hoạt hiệu ứng nhiệt/điện hóa: Gây ${300 + (i % 4) * 100} LP sát thương trực tiếp lên đối thủ hoặc rút 1 lá bài từ Bộ bài.`,
    scientificLore: `Phản ứng hóa học ${base.name} (${base.eq}) tuân thủ nghiêm ngặt định luật bảo toàn khối lượng và biến thiên enthalpy $\\Delta_r H^\\circ_{298}$ theo GDPT 2018.`,
    relatedEquation: base.eq,
    iupacName: `${base.en} Protocol`,
    archetype: i % 3 === 0 ? 'REDOX_CASCADE' : i % 3 === 1 ? 'GREEN_CHEMISTRY' : 'FREE_RADICAL_CASCADE',
    structuredEffects: [
      {
        effectId: `B15_EFF_${i + 1}`,
        activationWindow: 'IGNITION',
        operations: [
          { op: 'BURN_DAMAGE', params: { amount: 400 } },
          { op: 'DRAW_CARD', params: { amount: 1 } }
        ],
        description: 'Gây 400 LP sát thương phản ứng hóa học và rút 1 lá bài.'
      }
    ]
  };

  batch15Cards.push(card);
}
writeBatchFile('batch_15_spells_normal_reactions.ts', 'BATCH_15_CARDS', 'Batch 15: Normal Chemical Reaction Spells', batch15Cards);

// ==========================================
// BATCH 16: 80 Continuous Chemical Kinetics Spells
// ==========================================
const batch16Cards: CardDef[] = [];

const continuousKinetics = [
  { name: 'Buồng Gia Tốc Nhiệt Động Arrhenius', en: 'Arrhenius Thermal Activation Chamber', f: 'k = A*exp(-Ea/RT)', attr: 'PYRO' as const, eq: 'ln(k) = -Ea/R * (1/T) + ln(A)' },
  { name: 'Dòng Chảy Phản Ứng Ống PFR', en: 'Plug Flow Reactor Continuous Kinetic', f: 'dF/dV = r', attr: 'AQUA' as const, eq: 'Steady-State Mass Balance Differential' },
  { name: 'Tháp Chưng Cất Phân Đoạn Dầu Mỏ', en: 'Fractional Distillation Continuous Tower', f: 'Petro-Refinery', attr: 'TERRA' as const, eq: 'Continuous Equilibrium Stage Separation' },
  { name: 'Vòng Tuần Hoàn Tổng Hợp Haber-Bosch', en: 'Haber-Bosch Nitrogen Recycle Loop', f: 'N2+3H2 ⇌ 2NH3', attr: 'AERO' as const, eq: 'N₂ + 3H₂ ⇌ 2NH₃ (Continuous High-Pressure Recycle)' },
  { name: 'Bể Lắng Lọc Keo Tụ PAC', en: 'Poly-Aluminum Chloride Coagulation Basin', f: '[Al2(OH)nCl6-n]m', attr: 'AQUA' as const, eq: 'Colloidal Particle Neutralization & Sedimentation' },
  { name: 'Buồng Điện Phân Màng Ngăn Chloralkali', en: 'Chloralkali Membrane Electrolysis Cell', f: '2NaCl+2H2O', attr: 'ELECTRO' as const, eq: '2NaCl + 2H₂O → 2NaOH + Cl₂↑ + H₂↑' },
  { name: 'Đèn Chiếu Xạ Quang Hóa Liên Tục', en: 'Continuous UV Photoreactor Chamber', f: 'hν Radiation', attr: 'ELECTRO' as const, eq: 'Continuous Free Radical Initiation Flux' },
  { name: 'Màng Lọc Thẩm Thấu Ngược RO', en: 'Reverse Osmosis Desalination Cascade', f: 'RO Membrane', attr: 'AQUA' as const, eq: 'π = iMRT (High-Pressure Osmotic Solvent Driving)' }
];

for (let i = 0; i < 80; i++) {
  const base = continuousKinetics[i % continuousKinetics.length];
  const iteration = Math.floor(i / continuousKinetics.length) + 1;
  const manaCost = 2 + (i % 4);

  const card: CardDef = {
    id: `card_b16_${String(i + 1).padStart(3, '0')}_cont_${base.en.toLowerCase().replace(/[^a-z0-9]/g, '_')}_${i + 1}`,
    name: `${base.name} (Tầng ${iteration})`,
    name_en: `${base.en} (Stage ${iteration})`,
    cardType: 'REACTION_SPELL',
    spellTrapSubtype: 'CONTINUOUS_SPELL',
    spellSpeed: 1,
    rarity: getRarity(i + 2),
    attribute: base.attr,
    manaCost,
    chemicalFormula: base.f,
    effectCode: `SPELL_B16_${base.en.toUpperCase().replace(/[^A-Z0-9]/g, '_')}_KINETIC_${i + 1}`,
    effectText: `[Phép Liên Tục / Continuous]: Duy trì trên sân. Mỗi khi bắt đầu lượt của bạn: Nhận thêm 1 Mana và tăng 200 ATK cho tất cả quái thú đồng minh trên sân.`,
    scientificLore: `Quy trình động học dòng liên tục ${base.name} (${base.eq}) tối ưu hóa hiệu suất hóa học công nghiệp theo nguyên lý Hóa học Xanh và GDPT 2018.`,
    relatedEquation: base.eq,
    iupacName: `${base.en} Apparatus`,
    archetype: i % 2 === 0 ? 'THERMAL_KINETICS' : 'ATMOSPHERIC_NITROGEN_FIXATION',
    structuredEffects: [
      {
        effectId: `B16_EFF_${i + 1}`,
        activationWindow: 'IGNITION',
        operations: [
          { op: 'RECOVER_RESOURCE', params: { amount: 1 } },
          { op: 'MODIFY_STATS', params: { amount: 200, statTarget: 'ATK', targetScope: 'ALL_ALLIES' } }
        ],
        description: 'Tích lũy 1 Mana và tăng 200 ATK liên tục mỗi lượt.'
      }
    ]
  };

  batch16Cards.push(card);
}
writeBatchFile('batch_16_spells_continuous_kinetics.ts', 'BATCH_16_CARDS', 'Batch 16: Continuous Chemical Kinetics Spells', batch16Cards);

// ==========================================
// BATCH 17: 80 Equip Catalyst Spells
// ==========================================
const batch17Cards: CardDef[] = [];

const equipCatalysts = [
  { name: 'Lưới Bạch Kim Xúc Tác Ôtô', en: 'Platinum Gauze Catalyst Grid', f: 'Pt/Rh Mesh', attr: 'NOBLE_VOID' as const, eq: '2CO + O₂ --Pt--> 2CO₂' },
  { name: 'Hạt Xúc Tác Zeolit Lồng Chọn Lọc', en: 'Zeolite ZSM-5 Molecular Sieve', f: 'Zeolite', attr: 'TERRA' as const, eq: 'Shape-Selective Hydrocarbon Cracking Pores' },
  { name: 'Xúc Tác Niken Raney Xốp', en: 'Raney Nickel Spongy Catalyst', f: 'Ni-Al Porous', attr: 'PYRO' as const, eq: 'R-CH=CH-R + H₂ --Ni--> R-CH₂-CH₂-R' },
  { name: 'Chất Chelate Phối Trí EDTA', en: 'EDTA Octahedral Chelate Shield', f: 'Na2H2EDTA', attr: 'AQUA' as const, eq: 'Metal²⁺ + EDTA⁴⁻ → [Metal(EDTA)]²⁻ Complex' },
  { name: 'Vòng Vương Miện Crown Ether', en: '18-Crown-6 Ether Ring', f: 'C12H24O6', attr: 'ELECTRO' as const, eq: 'K⁺ + 18-Crown-6 → [K(18-Crown-6)]⁺ Cavity Inclusion' },
  { name: 'Ống Cacbon Dẫn Electron Phủ Vàng', en: 'Gold-Coated Carbon Nanotube Probe', f: 'Au-CNT', attr: 'ELECTRO' as const, eq: 'Ballistic Electron Transport Catalyst' },
  { name: 'Hạt Xúc Tác Bán Dẫn Cadmi Sunfua', en: 'Cadmium Sulfide Quantum Dot Sensor', f: 'CdS QD', attr: 'ELECTRO' as const, eq: 'Quantum Confinement Exciton Photocatalysis' },
  { name: 'Màng Xúc Tác Enzymatic Cố Định', en: 'Immobilized Biocatalytic Membrane', f: 'Enzyme-Mat', attr: 'AQUA' as const, eq: 'High-Turnover Enantioselective Synthesis' }
];

for (let i = 0; i < 80; i++) {
  const base = equipCatalysts[i % equipCatalysts.length];
  const iteration = Math.floor(i / equipCatalysts.length) + 1;
  const manaCost = 1 + (i % 4);

  const card: CardDef = {
    id: `card_b17_${String(i + 1).padStart(3, '0')}_equip_${base.en.toLowerCase().replace(/[^a-z0-9]/g, '_')}_${i + 1}`,
    name: `${base.name} (Modul ${iteration})`,
    name_en: `${base.en} (Module ${iteration})`,
    cardType: 'EQUIP_CATALYST',
    spellTrapSubtype: 'EQUIP_SPELL',
    spellSpeed: 1,
    rarity: getRarity(i + 1),
    attribute: base.attr,
    manaCost,
    chemicalFormula: base.f,
    effectCode: `SPELL_B17_${base.en.toUpperCase().replace(/[^A-Z0-9]/g, '_')}_EQUIP_${i + 1}`,
    effectText: `[Phép Trang Bị / Equip]: Trang bị cho 1 quái thú trên sân. Quái thú được trang bị nhận +500 ATK và +300 DEF, đồng thời được bảo vệ khỏi bị phá hủy bởi hiệu ứng bài phép một lần mỗi lượt.`,
    scientificLore: `Chất xúc tác bề mặt ${base.name} (${base.f}) cung cấp tâm hoạt động hạ thấp hàng rào thế năng phản ứng hóa học theo chương trình Hóa học 10 GDPT 2018.`,
    relatedEquation: base.eq,
    iupacName: `${base.en} Matrix`,
    archetype: i % 2 === 0 ? 'PRECIOUS_CATALYST' : 'ORGANOMETALLIC_CATALYSIS',
    structuredEffects: [
      {
        effectId: `B17_EFF_${i + 1}`,
        activationWindow: 'IGNITION',
        operations: [
          { op: 'MODIFY_STATS', params: { amount: 500, statTarget: 'ATK', targetScope: 'TARGET' } },
          { op: 'MODIFY_STATS', params: { amount: 300, statTarget: 'DEF', targetScope: 'TARGET' } }
        ],
        description: 'Tăng 500 ATK và 300 DEF cho quái thú trang bị.'
      }
    ]
  };

  batch17Cards.push(card);
}
writeBatchFile('batch_17_spells_equip_catalysts.ts', 'BATCH_17_CARDS', 'Batch 17: Equip Catalyst Spells', batch17Cards);

// ==========================================
// BATCH 18: 80 Field Environment Spells
// ==========================================
const batch18Cards: CardDef[] = [];

const fieldEnvironments = [
  { name: 'Vỏ Dung Môi Hydrat Hóa Solvation', en: 'Hydration Solvation Sphere Domain', f: '[M(H2O)6]n+', attr: 'AQUA' as const, eq: 'Ion-Dipole Solvent Shell Stabilization' },
  { name: 'Miệng Phun Thủy Nhiệt Đại Dương', en: 'Deep Sea Hydrothermal Vent Biosphere', f: 'FeS-H2S Vent', attr: 'PYRO' as const, eq: 'Prebiotic Chemosynthesis Matrix at 350°C' },
  { name: 'Bể Điện Hóa Galvanic Mạ Kền', en: 'Galvanic Electroplating Bath Chamber', f: 'NiSO4 Electrolyte', attr: 'ELECTRO' as const, eq: 'Faraday Law Cathodic Deposition m = (AIt)/(nF)' },
  { name: 'Ma Trận Khí Trơ Nhiệt Độ Siêu Lạnh', en: 'Cryogenic Argon Isolation Matrix', f: 'Ar(s) 10K', attr: 'NOBLE_VOID' as const, eq: 'Noble Gas Matrix Isolation of Reactive Radicals' },
  { name: 'Vùng Thoát Nước Mỏ Axit Cháy Rực', en: 'Acid Mine Drainage Pyrite Waste', f: 'FeS2 + O2 + H2O', attr: 'ACID_DARK' as const, eq: '2FeS₂ + 7O₂ + 2H₂O → 2Fe²⁺ + 4SO₄²⁻ + 4H⁺' },
  { name: 'Tầng Khí Quyển Ôzôn Hấp Thụ Tia Cực Tím', en: 'Stratospheric Ozone UV Shielding', f: 'O3 Layer', attr: 'AERO' as const, eq: 'O₃ + hν(UV) → O₂ + O· Chapman Cycle' },
  { name: 'Hệ Keo Khói Tyndall Tán Xạ', en: 'Tyndall Colloidal Aerosol Mist', f: 'Colloidal Sol', attr: 'AERO' as const, eq: 'Rayleigh/Tyndall Elastic Light Scattering' },
  { name: 'Hồ Tinh Thể Muối Bão Hòa Biển Chết', en: 'Dead Sea Hypersaline Crystallization Basin', f: 'NaCl-KCl-MgCl2', attr: 'TERRA' as const, eq: 'Fractional Halite Sylvite Evaporite Precipitation' }
];

for (let i = 0; i < 80; i++) {
  const base = fieldEnvironments[i % fieldEnvironments.length];
  const iteration = Math.floor(i / fieldEnvironments.length) + 1;
  const manaCost = 2 + (i % 4);

  const card: CardDef = {
    id: `card_b18_${String(i + 1).padStart(3, '0')}_field_${base.en.toLowerCase().replace(/[^a-z0-9]/g, '_')}_${i + 1}`,
    name: `${base.name} (Địa Bàn ${iteration})`,
    name_en: `${base.en} (Field ${iteration})`,
    cardType: 'FIELD_ENVIRONMENT',
    spellTrapSubtype: 'FIELD_SPELL',
    spellSpeed: 1,
    rarity: getRarity(i + 3),
    attribute: base.attr,
    manaCost,
    chemicalFormula: base.f,
    effectCode: `SPELL_B18_${base.en.toUpperCase().replace(/[^A-Z0-9]/g, '_')}_FIELD_${i + 1}`,
    effectText: `[Phép Môi Trường / Field]: Đặt vào Field Zone. Tất cả quái thú thuộc tính ${base.attr} nhận +400 ATK và +400 DEF. Quái thú đối phương khác thuộc tính bị giảm 200 ATK khi tuyên bố tấn công.`,
    scientificLore: `Môi trường địa hóa / điện hóa ${base.name} (${base.eq}) quyết định trạng thái tồn tại, độ bền liên kết và cân bằng phản ứng hóa học theo SGK GDPT 2018.`,
    relatedEquation: base.eq,
    iupacName: `${base.en} Environment`,
    archetype: i % 3 === 0 ? 'SOLVATION_SPHERE' : i % 3 === 1 ? 'COLLOIDAL_SOL' : 'FLUORESCENCE_SPECTRA',
    structuredEffects: [
      {
        effectId: `B18_EFF_${i + 1}`,
        activationWindow: 'IGNITION',
        operations: [
          { op: 'MODIFY_STATS', params: { amount: 400, statTarget: 'BOTH', targetScope: 'ALL_ALLIES' } }
        ],
        description: 'Tăng 400 ATK/DEF cho toàn bộ đồng minh trong môi trường trường địa bàn.'
      }
    ]
  };

  batch18Cards.push(card);
}
writeBatchFile('batch_18_spells_field_environments.ts', 'BATCH_18_CARDS', 'Batch 18: Field Environment Spells', batch18Cards);

// ==========================================
// BATCH 19: 100 Quick-Play Le Chatelier Equilibrium Spells
// ==========================================
const batch19Cards: CardDef[] = [];

const quickPlayEquilibrium = [
  { name: 'Chuyển Dịch Tăng Áp Suất Khí', en: 'High Pressure Equilibrium Shift', f: 'ΔP > 0', attr: 'AERO' as const, eq: 'Le Chatelier Shift towards Fewer Gas Moles' },
  { name: 'Hạ Nhiệt Độ Phản Ứng Tỏa Nhiệt', en: 'Exothermic Temperature Drop Flash', f: 'ΔT < 0 (ΔH < 0)', attr: 'AQUA' as const, eq: 'Cooling Shifts Equilibrium Forward (Exothermic)' },
  { name: 'Tăng Nồng Độ Tức Thời Chất Đầu', en: 'Reactant Concentration Surge Instant', f: '[Reactant] ↑', attr: 'PYRO' as const, eq: 'Surge in Reactant Drives Forward Reaction Speed' },
  { name: 'Hiệu Ứng Ion Chung Kìm Hãm', en: 'Common-Ion Suppression Shift', f: 'Common Ion', attr: 'TERRA' as const, eq: 'Addition of Common Ion Decreases Salt Solubility' },
  { name: 'Đệm Axit Axetic Cân Bằng pH', en: 'Acetic Buffer Dynamic Restoration', f: 'CH3COOH/CH3COO-', attr: 'AQUA' as const, eq: 'Buffer Capacity Neutralizes Sudden H⁺/OH⁻ Influx' },
  { name: 'Đột Biến Hằng Số Phản Ứng Kc', en: 'Equilibrium Constant Jump Pulse', f: 'Kc Mutation', attr: 'ELECTRO' as const, eq: 'Temperature Change Alters Equilibrium Constant Kc' },
  { name: 'Bơm Hút Sản Phẩm Kéo Theo', en: 'Continuous Product Evacuation Surge', f: '[Product] ↓', attr: 'AERO' as const, eq: 'Removing Product Forces 100% Forward Conversion' },
  { name: 'Đảo Chiều Phản Ứng Thuận Nghịch', en: 'Reversible Reaction Inversion Surge', f: 'v_rev > v_fwd', attr: 'NOBLE_VOID' as const, eq: 'Counter Shift Driving Reverse Chemical Reaction' }
];

for (let i = 0; i < 100; i++) {
  const base = quickPlayEquilibrium[i % quickPlayEquilibrium.length];
  const iteration = Math.floor(i / quickPlayEquilibrium.length) + 1;
  const manaCost = 1 + (i % 4);

  const card: CardDef = {
    id: `card_b19_${String(i + 1).padStart(3, '0')}_quick_${base.en.toLowerCase().replace(/[^a-z0-9]/g, '_')}_${i + 1}`,
    name: `${base.name} (Phản Ứng Nhanh ${iteration})`,
    name_en: `${base.en} (Quick-Play ${iteration})`,
    cardType: 'REACTION_SPELL',
    spellTrapSubtype: 'QUICK_PLAY_SPELL',
    spellSpeed: 2,
    rarity: getRarity(i + 2),
    attribute: base.attr,
    manaCost,
    chemicalFormula: base.f,
    effectCode: `SPELL_B19_${base.en.toUpperCase().replace(/[^A-Z0-9]/g, '_')}_LECHAT_${i + 1}`,
    effectText: `[Phép Nhanh / Quick-Play - Spell Speed 2]: Kích hoạt được trong lượt của đối thủ hoặc trong Chain. Chuyển dịch cân bằng hóa học: Tăng ngay 400 ATK cho 1 quái thú đồng minh hoặc giảm 400 ATK của 1 quái thú đối phương đang tấn công.`,
    scientificLore: `Nguyên lý Le Chatelier (SGK Hóa học 11 GDPT 2018): Khi tác động vào hệ cân bằng (nồng độ, nhiệt độ, áp suất), hệ sẽ tự chuyển dịch theo chiều chống lại tác động đó.`,
    relatedEquation: base.eq,
    iupacName: `${base.en} Surge`,
    archetype: i % 2 === 0 ? 'LE_CHATELIER_EQUILIBRIUM' : 'WEAK_ACID_BUFFER',
    structuredEffects: [
      {
        effectId: `B19_EFF_${i + 1}`,
        activationWindow: 'QUICK',
        operations: [
          { op: 'MODIFY_STATS', params: { amount: 400, statTarget: 'ATK', targetScope: 'ALL_ALLIES' } }
        ],
        description: 'Phép nhanh chuyển dịch cân bằng: Tăng 400 ATK cho toàn đội.'
      }
    ]
  };

  batch19Cards.push(card);
}
writeBatchFile('batch_19_spells_quickplay_lechatelier.ts', 'BATCH_19_CARDS', 'Batch 19: Quick-Play Le Chatelier Equilibrium Spells', batch19Cards);

// ==========================================
// BATCH 20: 60 Ritual Crystallization Spells
// ==========================================
const batch20Cards: CardDef[] = [];

const ritualCrystallization = [
  { name: 'Nghi Thức Kết Tinh Siêu Bão Hòa', en: 'Supersaturated Crystallization Ritual Altar', f: 'Crystallization', attr: 'AQUA' as const, eq: 'Supersaturation Nucleation & Crystal Growth' },
  { name: 'Nghi Thức Thăng Hoa Buckyball C60', en: 'C60 Fullerene Sublimation Altar', f: 'C60 Lattice', attr: 'NOBLE_VOID' as const, eq: 'Arc-Discharge Carbon Plasma Crystallization' },
  { name: 'Nghi Thức Luyện Kim Cương Dưới Áp Suất Khủng', en: 'HPHT Synthetic Diamond Altar', f: 'C(HPHT)', attr: 'TERRA' as const, eq: 'High-Pressure High-Temperature Diamond Synthesis' },
  { name: 'Nghi Thức Tinh Chế Vùng Nóng Chảy', en: 'Zone Refining Ultra-Pure Silicon Altar', f: 'Si 99.9999999%', attr: 'ELECTRO' as const, eq: 'Fractional Melting Molten Zone Impurity Sweep' },
  { name: 'Nghi Thức Phân Giải Quang Học Enantiomer', en: 'Enantiomeric Pasteurian Chiral Resolution', f: 'D/L-Resolution', attr: 'AQUA' as const, eq: 'Chiral Tartrate Salt Conglomerate Manual Separation' },
  { name: 'Nghi Thức Nuôi Cấy Đơn Tinh Thể Thạch Anh', en: 'Quartz Hydrothermal Single Crystal Seed', f: 'SiO2 Crystal', attr: 'TERRA' as const, eq: 'Autoclave High-Pressure Hydrothermal SiO₂ Growth' }
];

for (let i = 0; i < 60; i++) {
  const base = ritualCrystallization[i % ritualCrystallization.length];
  const iteration = Math.floor(i / ritualCrystallization.length) + 1;
  const manaCost = 2 + (i % 4);

  const card: CardDef = {
    id: `card_b20_${String(i + 1).padStart(3, '0')}_ritual_${base.en.toLowerCase().replace(/[^a-z0-9]/g, '_')}_${i + 1}`,
    name: `${base.name} (Tế Đàn Bậc ${iteration})`,
    name_en: `${base.en} (Altar Tier ${iteration})`,
    cardType: 'REACTION_SPELL',
    spellTrapSubtype: 'RITUAL_SPELL',
    spellSpeed: 1,
    rarity: getRarity(i + 3),
    attribute: base.attr,
    manaCost,
    chemicalFormula: base.f,
    effectCode: `SPELL_B20_${base.en.toUpperCase().replace(/[^A-Z0-9]/g, '_')}_RIT_${i + 1}`,
    effectText: `[Phép Nghi Thức / Ritual Spell]: Dùng để triệu hồi quái thú Nghi thức. Hiến tế quái thú từ tay hoặc sân có tổng Level bằng hoặc lớn hơn quái thú Nghi thức: Triệu hồi đặc biệt quái thú tinh thể từ tay!`,
    scientificLore: `Quá trình kết tinh và tạo mầm tinh thể ${base.name} (${base.eq}) là phương pháp chuẩn mực để thu nhận đơn chất siêu tinh khiết và thù hình bền vững theo GDPT 2018.`,
    relatedEquation: base.eq,
    iupacName: `${base.en} Rite`,
    archetype: i % 2 === 0 ? 'CRYSTAL_LATTICE' : 'ALLOTROPE_PHANTOM',
    structuredEffects: [
      {
        effectId: `B20_EFF_${i + 1}`,
        activationWindow: 'IGNITION',
        operations: [
          { op: 'RECOVER_RESOURCE', params: { amount: 2 } }
        ],
        description: 'Tế đàn kết tinh: Hồi phục 2 Mana nghi thức.'
      }
    ]
  };

  batch20Cards.push(card);
}
writeBatchFile('batch_20_spells_ritual_crystallization.ts', 'BATCH_20_CARDS', 'Batch 20: Ritual Crystallization Spells', batch20Cards);

console.log('[BATCH 15-20 COMPLETED] 500 Spell Cards successfully generated and validated.');
