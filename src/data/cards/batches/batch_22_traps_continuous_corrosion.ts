// src/data/cards/batches/batch_22_traps_continuous_corrosion.ts
// Batch 22: Continuous Passivation & Corrosion Traps (100 cards)
// Automatically generated and validated for ELEMENTA Tactical TCG

import { PlayableCardDef } from '../../../domain/cardGameTypes';

export const BATCH_22_CARDS: PlayableCardDef[] = [
  {
    "id": "card_b22_001_cont_trap_al2o3_passivation_shield_net_1",
    "name": "Màng Thụ Động Hóa Oxit Nhôm Bền Vững (Quá Trình 1)",
    "name_en": "Al2O3 Passivation Shield Net (Process 1)",
    "cardType": "TRAP",
    "spellTrapSubtype": "CONTINUOUS_TRAP",
    "spellSpeed": 2,
    "rarity": "COMMON",
    "attribute": "TERRA",
    "manaCost": 2,
    "chemicalFormula": "Al2O3 Film",
    "effectCode": "TRAP_B22_AL2O3_PASSIVATION_SHIELD_NET_CONT_1",
    "effectText": "[Bẫy Liên Tục / Continuous Trap - Spell Speed 2]: Duy trì trên sân. Mỗi khi đối thủ tuyên bố đòn tấn công hoặc kích hoạt hiệu ứng: Giảm 200 ATK của quái thú đó và đối thủ nhận 200 LP sát thương ăn mòn tích lũy.",
    "scientificLore": "Quá trình ăn mòn kim loại và thụ động hóa Màng Thụ Động Hóa Oxit Nhôm Bền Vững (4Al + 3O₂ → 2Al₂O₃ (Impermeable Protective Oxide Film)) là bài toán thực tiễn quan trọng bậc nhất trong chuyên đề Hóa học 12 GDPT 2018.",
    "relatedEquation": "4Al + 3O₂ → 2Al₂O₃ (Impermeable Protective Oxide Film)",
    "iupacName": "Al2O3 Passivation Shield Net Field",
    "archetype": "STRONG_ACID_CORROSION",
    "structuredEffects": [
      {
        "effectId": "B22_EFF_1",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 200
            }
          }
        ],
        "description": "Bào mòn 200 ATK địch và gây 200 LP sát thương ăn mòn tích lũy."
      }
    ]
  },
  {
    "id": "card_b22_002_cont_trap_electrochemical_rust_pitting_corrosion_2",
    "name": "Quá Trình Rỉ Sét Ăn Mòn Điện Hóa (Quá Trình 1)",
    "name_en": "Electrochemical Rust Pitting Corrosion (Process 1)",
    "cardType": "TRAP",
    "spellTrapSubtype": "CONTINUOUS_TRAP",
    "spellSpeed": 2,
    "rarity": "RARE",
    "attribute": "ACID_DARK",
    "manaCost": 3,
    "chemicalFormula": "Fe2O3·xH2O",
    "effectCode": "TRAP_B22_ELECTROCHEMICAL_RUST_PITTING_CORROSION_CONT_2",
    "effectText": "[Bẫy Liên Tục / Continuous Trap - Spell Speed 2]: Duy trì trên sân. Mỗi khi đối thủ tuyên bố đòn tấn công hoặc kích hoạt hiệu ứng: Giảm 200 ATK của quái thú đó và đối thủ nhận 200 LP sát thương ăn mòn tích lũy.",
    "scientificLore": "Quá trình ăn mòn kim loại và thụ động hóa Quá Trình Rỉ Sét Ăn Mòn Điện Hóa (4Fe + 3O₂ + 2xH₂O → 2Fe₂O₃·xH₂O (Rust Pitting)) là bài toán thực tiễn quan trọng bậc nhất trong chuyên đề Hóa học 12 GDPT 2018.",
    "relatedEquation": "4Fe + 3O₂ + 2xH₂O → 2Fe₂O₃·xH₂O (Rust Pitting)",
    "iupacName": "Electrochemical Rust Pitting Corrosion Field",
    "archetype": "SURFACE_ADSORPTION",
    "structuredEffects": [
      {
        "effectId": "B22_EFF_2",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 200
            }
          }
        ],
        "description": "Bào mòn 200 ATK địch và gây 200 LP sát thương ăn mòn tích lũy."
      }
    ]
  },
  {
    "id": "card_b22_003_cont_trap_acid_rain_chemical_leaching_3",
    "name": "Mưa Axit Bào Mòn Đá Vôi Lâu Dài (Quá Trình 1)",
    "name_en": "Acid Rain Chemical Leaching (Process 1)",
    "cardType": "TRAP",
    "spellTrapSubtype": "CONTINUOUS_TRAP",
    "spellSpeed": 2,
    "rarity": "RARE",
    "attribute": "ACID_DARK",
    "manaCost": 4,
    "chemicalFormula": "H2SO4+CaCO3",
    "effectCode": "TRAP_B22_ACID_RAIN_CHEMICAL_LEACHING_CONT_3",
    "effectText": "[Bẫy Liên Tục / Continuous Trap - Spell Speed 2]: Duy trì trên sân. Mỗi khi đối thủ tuyên bố đòn tấn công hoặc kích hoạt hiệu ứng: Giảm 200 ATK của quái thú đó và đối thủ nhận 200 LP sát thương ăn mòn tích lũy.",
    "scientificLore": "Quá trình ăn mòn kim loại và thụ động hóa Mưa Axit Bào Mòn Đá Vôi Lâu Dài (CaCO₃ + H₂SO₄ → CaSO₄ + H₂O + CO₂↑) là bài toán thực tiễn quan trọng bậc nhất trong chuyên đề Hóa học 12 GDPT 2018.",
    "relatedEquation": "CaCO₃ + H₂SO₄ → CaSO₄ + H₂O + CO₂↑",
    "iupacName": "Acid Rain Chemical Leaching Field",
    "archetype": "STRONG_ACID_CORROSION",
    "structuredEffects": [
      {
        "effectId": "B22_EFF_3",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 200
            }
          }
        ],
        "description": "Bào mòn 200 ATK địch và gây 200 LP sát thương ăn mòn tích lũy."
      }
    ]
  },
  {
    "id": "card_b22_004_cont_trap_electroless_nickel_plating_armor_4",
    "name": "Lớp Vỏ Mạ Niken Chống Oxy Hóa (Quá Trình 1)",
    "name_en": "Electroless Nickel Plating Armor (Process 1)",
    "cardType": "TRAP",
    "spellTrapSubtype": "CONTINUOUS_TRAP",
    "spellSpeed": 2,
    "rarity": "SUPER_RARE",
    "attribute": "ELECTRO",
    "manaCost": 5,
    "chemicalFormula": "Ni-P Alloy",
    "effectCode": "TRAP_B22_ELECTROLESS_NICKEL_PLATING_ARMOR_CONT_4",
    "effectText": "[Bẫy Liên Tục / Continuous Trap - Spell Speed 2]: Duy trì trên sân. Mỗi khi đối thủ tuyên bố đòn tấn công hoặc kích hoạt hiệu ứng: Giảm 200 ATK của quái thú đó và đối thủ nhận 200 LP sát thương ăn mòn tích lũy.",
    "scientificLore": "Quá trình ăn mòn kim loại và thụ động hóa Lớp Vỏ Mạ Niken Chống Oxy Hóa (Ni²⁺ + H₂PO₂⁻ + H₂O → Ni + H₂PO₃⁻ + 2H⁺) là bài toán thực tiễn quan trọng bậc nhất trong chuyên đề Hóa học 12 GDPT 2018.",
    "relatedEquation": "Ni²⁺ + H₂PO₂⁻ + H₂O → Ni + H₂PO₃⁻ + 2H⁺",
    "iupacName": "Electroless Nickel Plating Armor Field",
    "archetype": "SURFACE_ADSORPTION",
    "structuredEffects": [
      {
        "effectId": "B22_EFF_4",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 200
            }
          }
        ],
        "description": "Bào mòn 200 ATK địch và gây 200 LP sát thương ăn mòn tích lũy."
      }
    ]
  },
  {
    "id": "card_b22_005_cont_trap_zinc_phosphate_anti_corrosive_primer_5",
    "name": "Màng Sơn Chống Gỉ Chứa Kẽm Phốt Phát (Quá Trình 1)",
    "name_en": "Zinc Phosphate Anti-Corrosive Primer (Process 1)",
    "cardType": "TRAP",
    "spellTrapSubtype": "CONTINUOUS_TRAP",
    "spellSpeed": 2,
    "rarity": "SUPER_RARE",
    "attribute": "TERRA",
    "manaCost": 2,
    "chemicalFormula": "Zn3(PO4)2",
    "effectCode": "TRAP_B22_ZINC_PHOSPHATE_ANTI_CORROSIVE_PRIMER_CONT_5",
    "effectText": "[Bẫy Liên Tục / Continuous Trap - Spell Speed 2]: Duy trì trên sân. Mỗi khi đối thủ tuyên bố đòn tấn công hoặc kích hoạt hiệu ứng: Giảm 200 ATK của quái thú đó và đối thủ nhận 200 LP sát thương ăn mòn tích lũy.",
    "scientificLore": "Quá trình ăn mòn kim loại và thụ động hóa Màng Sơn Chống Gỉ Chứa Kẽm Phốt Phát (Metal Phosphatizing Crystalline Surface Passivation) là bài toán thực tiễn quan trọng bậc nhất trong chuyên đề Hóa học 12 GDPT 2018.",
    "relatedEquation": "Metal Phosphatizing Crystalline Surface Passivation",
    "iupacName": "Zinc Phosphate Anti-Corrosive Primer Field",
    "archetype": "STRONG_ACID_CORROSION",
    "structuredEffects": [
      {
        "effectId": "B22_EFF_5",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 200
            }
          }
        ],
        "description": "Bào mòn 200 ATK địch và gây 200 LP sát thương ăn mòn tích lũy."
      }
    ]
  },
  {
    "id": "card_b22_006_cont_trap_intergranular_corrosion_sensitization_6",
    "name": "Ăn Mòn Ranh Giới Hạt Thép Không Gỉ (Quá Trình 1)",
    "name_en": "Intergranular Corrosion Sensitization (Process 1)",
    "cardType": "TRAP",
    "spellTrapSubtype": "CONTINUOUS_TRAP",
    "spellSpeed": 2,
    "rarity": "ULTRA_RARE",
    "attribute": "ACID_DARK",
    "manaCost": 3,
    "chemicalFormula": "Cr23C6 Depletion",
    "effectCode": "TRAP_B22_INTERGRANULAR_CORROSION_SENSITIZATION_CONT_6",
    "effectText": "[Bẫy Liên Tục / Continuous Trap - Spell Speed 2]: Duy trì trên sân. Mỗi khi đối thủ tuyên bố đòn tấn công hoặc kích hoạt hiệu ứng: Giảm 200 ATK của quái thú đó và đối thủ nhận 200 LP sát thương ăn mòn tích lũy.",
    "scientificLore": "Quá trình ăn mòn kim loại và thụ động hóa Ăn Mòn Ranh Giới Hạt Thép Không Gỉ (Chromium Carbide Precipitation at Grain Boundaries) là bài toán thực tiễn quan trọng bậc nhất trong chuyên đề Hóa học 12 GDPT 2018.",
    "relatedEquation": "Chromium Carbide Precipitation at Grain Boundaries",
    "iupacName": "Intergranular Corrosion Sensitization Field",
    "archetype": "SURFACE_ADSORPTION",
    "structuredEffects": [
      {
        "effectId": "B22_EFF_6",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 200
            }
          }
        ],
        "description": "Bào mòn 200 ATK địch và gây 200 LP sát thương ăn mòn tích lũy."
      }
    ]
  },
  {
    "id": "card_b22_007_cont_trap_hydrogen_sulfide_stress_cracking_7",
    "name": "Xâm Nhập Khí H2S Gây Giòn Kim Loại (Quá Trình 1)",
    "name_en": "Hydrogen Sulfide Stress Cracking (Process 1)",
    "cardType": "TRAP",
    "spellTrapSubtype": "CONTINUOUS_TRAP",
    "spellSpeed": 2,
    "rarity": "SECRET_RARE",
    "attribute": "ACID_DARK",
    "manaCost": 4,
    "chemicalFormula": "Fe + H2S",
    "effectCode": "TRAP_B22_HYDROGEN_SULFIDE_STRESS_CRACKING_CONT_7",
    "effectText": "[Bẫy Liên Tục / Continuous Trap - Spell Speed 2]: Duy trì trên sân. Mỗi khi đối thủ tuyên bố đòn tấn công hoặc kích hoạt hiệu ứng: Giảm 200 ATK của quái thú đó và đối thủ nhận 200 LP sát thương ăn mòn tích lũy.",
    "scientificLore": "Quá trình ăn mòn kim loại và thụ động hóa Xâm Nhập Khí H2S Gây Giòn Kim Loại (Fe + H₂S → FeS + 2H(absorbed atomic embrittlement)) là bài toán thực tiễn quan trọng bậc nhất trong chuyên đề Hóa học 12 GDPT 2018.",
    "relatedEquation": "Fe + H₂S → FeS + 2H(absorbed atomic embrittlement)",
    "iupacName": "Hydrogen Sulfide Stress Cracking Field",
    "archetype": "STRONG_ACID_CORROSION",
    "structuredEffects": [
      {
        "effectId": "B22_EFF_7",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 200
            }
          }
        ],
        "description": "Bào mòn 200 ATK địch và gây 200 LP sát thương ăn mòn tích lũy."
      }
    ]
  },
  {
    "id": "card_b22_008_cont_trap_cathodic_delamination_paint_strip_8",
    "name": "Bong Tróc Điện Hóa Vùng Cathode (Quá Trình 1)",
    "name_en": "Cathodic Delamination Paint Strip (Process 1)",
    "cardType": "TRAP",
    "spellTrapSubtype": "CONTINUOUS_TRAP",
    "spellSpeed": 2,
    "rarity": "COMMON",
    "attribute": "ELECTRO",
    "manaCost": 5,
    "chemicalFormula": "2H2O + 2e-",
    "effectCode": "TRAP_B22_CATHODIC_DELAMINATION_PAINT_STRIP_CONT_8",
    "effectText": "[Bẫy Liên Tục / Continuous Trap - Spell Speed 2]: Duy trì trên sân. Mỗi khi đối thủ tuyên bố đòn tấn công hoặc kích hoạt hiệu ứng: Giảm 200 ATK của quái thú đó và đối thủ nhận 200 LP sát thương ăn mòn tích lũy.",
    "scientificLore": "Quá trình ăn mòn kim loại và thụ động hóa Bong Tróc Điện Hóa Vùng Cathode (2H₂O + 2e⁻ + O₂ → 4OH⁻ (High Local pH Delamination)) là bài toán thực tiễn quan trọng bậc nhất trong chuyên đề Hóa học 12 GDPT 2018.",
    "relatedEquation": "2H₂O + 2e⁻ + O₂ → 4OH⁻ (High Local pH Delamination)",
    "iupacName": "Cathodic Delamination Paint Strip Field",
    "archetype": "SURFACE_ADSORPTION",
    "structuredEffects": [
      {
        "effectId": "B22_EFF_8",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 200
            }
          }
        ],
        "description": "Bào mòn 200 ATK địch và gây 200 LP sát thương ăn mòn tích lũy."
      }
    ]
  },
  {
    "id": "card_b22_009_cont_trap_al2o3_passivation_shield_net_9",
    "name": "Màng Thụ Động Hóa Oxit Nhôm Bền Vững (Quá Trình 2)",
    "name_en": "Al2O3 Passivation Shield Net (Process 2)",
    "cardType": "TRAP",
    "spellTrapSubtype": "CONTINUOUS_TRAP",
    "spellSpeed": 2,
    "rarity": "COMMON",
    "attribute": "TERRA",
    "manaCost": 2,
    "chemicalFormula": "Al2O3 Film",
    "effectCode": "TRAP_B22_AL2O3_PASSIVATION_SHIELD_NET_CONT_9",
    "effectText": "[Bẫy Liên Tục / Continuous Trap - Spell Speed 2]: Duy trì trên sân. Mỗi khi đối thủ tuyên bố đòn tấn công hoặc kích hoạt hiệu ứng: Giảm 200 ATK của quái thú đó và đối thủ nhận 200 LP sát thương ăn mòn tích lũy.",
    "scientificLore": "Quá trình ăn mòn kim loại và thụ động hóa Màng Thụ Động Hóa Oxit Nhôm Bền Vững (4Al + 3O₂ → 2Al₂O₃ (Impermeable Protective Oxide Film)) là bài toán thực tiễn quan trọng bậc nhất trong chuyên đề Hóa học 12 GDPT 2018.",
    "relatedEquation": "4Al + 3O₂ → 2Al₂O₃ (Impermeable Protective Oxide Film)",
    "iupacName": "Al2O3 Passivation Shield Net Field",
    "archetype": "STRONG_ACID_CORROSION",
    "structuredEffects": [
      {
        "effectId": "B22_EFF_9",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 200
            }
          }
        ],
        "description": "Bào mòn 200 ATK địch và gây 200 LP sát thương ăn mòn tích lũy."
      }
    ]
  },
  {
    "id": "card_b22_010_cont_trap_electrochemical_rust_pitting_corrosion_10",
    "name": "Quá Trình Rỉ Sét Ăn Mòn Điện Hóa (Quá Trình 2)",
    "name_en": "Electrochemical Rust Pitting Corrosion (Process 2)",
    "cardType": "TRAP",
    "spellTrapSubtype": "CONTINUOUS_TRAP",
    "spellSpeed": 2,
    "rarity": "COMMON",
    "attribute": "ACID_DARK",
    "manaCost": 3,
    "chemicalFormula": "Fe2O3·xH2O",
    "effectCode": "TRAP_B22_ELECTROCHEMICAL_RUST_PITTING_CORROSION_CONT_10",
    "effectText": "[Bẫy Liên Tục / Continuous Trap - Spell Speed 2]: Duy trì trên sân. Mỗi khi đối thủ tuyên bố đòn tấn công hoặc kích hoạt hiệu ứng: Giảm 200 ATK của quái thú đó và đối thủ nhận 200 LP sát thương ăn mòn tích lũy.",
    "scientificLore": "Quá trình ăn mòn kim loại và thụ động hóa Quá Trình Rỉ Sét Ăn Mòn Điện Hóa (4Fe + 3O₂ + 2xH₂O → 2Fe₂O₃·xH₂O (Rust Pitting)) là bài toán thực tiễn quan trọng bậc nhất trong chuyên đề Hóa học 12 GDPT 2018.",
    "relatedEquation": "4Fe + 3O₂ + 2xH₂O → 2Fe₂O₃·xH₂O (Rust Pitting)",
    "iupacName": "Electrochemical Rust Pitting Corrosion Field",
    "archetype": "SURFACE_ADSORPTION",
    "structuredEffects": [
      {
        "effectId": "B22_EFF_10",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 200
            }
          }
        ],
        "description": "Bào mòn 200 ATK địch và gây 200 LP sát thương ăn mòn tích lũy."
      }
    ]
  },
  {
    "id": "card_b22_011_cont_trap_acid_rain_chemical_leaching_11",
    "name": "Mưa Axit Bào Mòn Đá Vôi Lâu Dài (Quá Trình 2)",
    "name_en": "Acid Rain Chemical Leaching (Process 2)",
    "cardType": "TRAP",
    "spellTrapSubtype": "CONTINUOUS_TRAP",
    "spellSpeed": 2,
    "rarity": "RARE",
    "attribute": "ACID_DARK",
    "manaCost": 4,
    "chemicalFormula": "H2SO4+CaCO3",
    "effectCode": "TRAP_B22_ACID_RAIN_CHEMICAL_LEACHING_CONT_11",
    "effectText": "[Bẫy Liên Tục / Continuous Trap - Spell Speed 2]: Duy trì trên sân. Mỗi khi đối thủ tuyên bố đòn tấn công hoặc kích hoạt hiệu ứng: Giảm 200 ATK của quái thú đó và đối thủ nhận 200 LP sát thương ăn mòn tích lũy.",
    "scientificLore": "Quá trình ăn mòn kim loại và thụ động hóa Mưa Axit Bào Mòn Đá Vôi Lâu Dài (CaCO₃ + H₂SO₄ → CaSO₄ + H₂O + CO₂↑) là bài toán thực tiễn quan trọng bậc nhất trong chuyên đề Hóa học 12 GDPT 2018.",
    "relatedEquation": "CaCO₃ + H₂SO₄ → CaSO₄ + H₂O + CO₂↑",
    "iupacName": "Acid Rain Chemical Leaching Field",
    "archetype": "STRONG_ACID_CORROSION",
    "structuredEffects": [
      {
        "effectId": "B22_EFF_11",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 200
            }
          }
        ],
        "description": "Bào mòn 200 ATK địch và gây 200 LP sát thương ăn mòn tích lũy."
      }
    ]
  },
  {
    "id": "card_b22_012_cont_trap_electroless_nickel_plating_armor_12",
    "name": "Lớp Vỏ Mạ Niken Chống Oxy Hóa (Quá Trình 2)",
    "name_en": "Electroless Nickel Plating Armor (Process 2)",
    "cardType": "TRAP",
    "spellTrapSubtype": "CONTINUOUS_TRAP",
    "spellSpeed": 2,
    "rarity": "RARE",
    "attribute": "ELECTRO",
    "manaCost": 5,
    "chemicalFormula": "Ni-P Alloy",
    "effectCode": "TRAP_B22_ELECTROLESS_NICKEL_PLATING_ARMOR_CONT_12",
    "effectText": "[Bẫy Liên Tục / Continuous Trap - Spell Speed 2]: Duy trì trên sân. Mỗi khi đối thủ tuyên bố đòn tấn công hoặc kích hoạt hiệu ứng: Giảm 200 ATK của quái thú đó và đối thủ nhận 200 LP sát thương ăn mòn tích lũy.",
    "scientificLore": "Quá trình ăn mòn kim loại và thụ động hóa Lớp Vỏ Mạ Niken Chống Oxy Hóa (Ni²⁺ + H₂PO₂⁻ + H₂O → Ni + H₂PO₃⁻ + 2H⁺) là bài toán thực tiễn quan trọng bậc nhất trong chuyên đề Hóa học 12 GDPT 2018.",
    "relatedEquation": "Ni²⁺ + H₂PO₂⁻ + H₂O → Ni + H₂PO₃⁻ + 2H⁺",
    "iupacName": "Electroless Nickel Plating Armor Field",
    "archetype": "SURFACE_ADSORPTION",
    "structuredEffects": [
      {
        "effectId": "B22_EFF_12",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 200
            }
          }
        ],
        "description": "Bào mòn 200 ATK địch và gây 200 LP sát thương ăn mòn tích lũy."
      }
    ]
  },
  {
    "id": "card_b22_013_cont_trap_zinc_phosphate_anti_corrosive_primer_13",
    "name": "Màng Sơn Chống Gỉ Chứa Kẽm Phốt Phát (Quá Trình 2)",
    "name_en": "Zinc Phosphate Anti-Corrosive Primer (Process 2)",
    "cardType": "TRAP",
    "spellTrapSubtype": "CONTINUOUS_TRAP",
    "spellSpeed": 2,
    "rarity": "SUPER_RARE",
    "attribute": "TERRA",
    "manaCost": 2,
    "chemicalFormula": "Zn3(PO4)2",
    "effectCode": "TRAP_B22_ZINC_PHOSPHATE_ANTI_CORROSIVE_PRIMER_CONT_13",
    "effectText": "[Bẫy Liên Tục / Continuous Trap - Spell Speed 2]: Duy trì trên sân. Mỗi khi đối thủ tuyên bố đòn tấn công hoặc kích hoạt hiệu ứng: Giảm 200 ATK của quái thú đó và đối thủ nhận 200 LP sát thương ăn mòn tích lũy.",
    "scientificLore": "Quá trình ăn mòn kim loại và thụ động hóa Màng Sơn Chống Gỉ Chứa Kẽm Phốt Phát (Metal Phosphatizing Crystalline Surface Passivation) là bài toán thực tiễn quan trọng bậc nhất trong chuyên đề Hóa học 12 GDPT 2018.",
    "relatedEquation": "Metal Phosphatizing Crystalline Surface Passivation",
    "iupacName": "Zinc Phosphate Anti-Corrosive Primer Field",
    "archetype": "STRONG_ACID_CORROSION",
    "structuredEffects": [
      {
        "effectId": "B22_EFF_13",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 200
            }
          }
        ],
        "description": "Bào mòn 200 ATK địch và gây 200 LP sát thương ăn mòn tích lũy."
      }
    ]
  },
  {
    "id": "card_b22_014_cont_trap_intergranular_corrosion_sensitization_14",
    "name": "Ăn Mòn Ranh Giới Hạt Thép Không Gỉ (Quá Trình 2)",
    "name_en": "Intergranular Corrosion Sensitization (Process 2)",
    "cardType": "TRAP",
    "spellTrapSubtype": "CONTINUOUS_TRAP",
    "spellSpeed": 2,
    "rarity": "SUPER_RARE",
    "attribute": "ACID_DARK",
    "manaCost": 3,
    "chemicalFormula": "Cr23C6 Depletion",
    "effectCode": "TRAP_B22_INTERGRANULAR_CORROSION_SENSITIZATION_CONT_14",
    "effectText": "[Bẫy Liên Tục / Continuous Trap - Spell Speed 2]: Duy trì trên sân. Mỗi khi đối thủ tuyên bố đòn tấn công hoặc kích hoạt hiệu ứng: Giảm 200 ATK của quái thú đó và đối thủ nhận 200 LP sát thương ăn mòn tích lũy.",
    "scientificLore": "Quá trình ăn mòn kim loại và thụ động hóa Ăn Mòn Ranh Giới Hạt Thép Không Gỉ (Chromium Carbide Precipitation at Grain Boundaries) là bài toán thực tiễn quan trọng bậc nhất trong chuyên đề Hóa học 12 GDPT 2018.",
    "relatedEquation": "Chromium Carbide Precipitation at Grain Boundaries",
    "iupacName": "Intergranular Corrosion Sensitization Field",
    "archetype": "SURFACE_ADSORPTION",
    "structuredEffects": [
      {
        "effectId": "B22_EFF_14",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 200
            }
          }
        ],
        "description": "Bào mòn 200 ATK địch và gây 200 LP sát thương ăn mòn tích lũy."
      }
    ]
  },
  {
    "id": "card_b22_015_cont_trap_hydrogen_sulfide_stress_cracking_15",
    "name": "Xâm Nhập Khí H2S Gây Giòn Kim Loại (Quá Trình 2)",
    "name_en": "Hydrogen Sulfide Stress Cracking (Process 2)",
    "cardType": "TRAP",
    "spellTrapSubtype": "CONTINUOUS_TRAP",
    "spellSpeed": 2,
    "rarity": "ULTRA_RARE",
    "attribute": "ACID_DARK",
    "manaCost": 4,
    "chemicalFormula": "Fe + H2S",
    "effectCode": "TRAP_B22_HYDROGEN_SULFIDE_STRESS_CRACKING_CONT_15",
    "effectText": "[Bẫy Liên Tục / Continuous Trap - Spell Speed 2]: Duy trì trên sân. Mỗi khi đối thủ tuyên bố đòn tấn công hoặc kích hoạt hiệu ứng: Giảm 200 ATK của quái thú đó và đối thủ nhận 200 LP sát thương ăn mòn tích lũy.",
    "scientificLore": "Quá trình ăn mòn kim loại và thụ động hóa Xâm Nhập Khí H2S Gây Giòn Kim Loại (Fe + H₂S → FeS + 2H(absorbed atomic embrittlement)) là bài toán thực tiễn quan trọng bậc nhất trong chuyên đề Hóa học 12 GDPT 2018.",
    "relatedEquation": "Fe + H₂S → FeS + 2H(absorbed atomic embrittlement)",
    "iupacName": "Hydrogen Sulfide Stress Cracking Field",
    "archetype": "STRONG_ACID_CORROSION",
    "structuredEffects": [
      {
        "effectId": "B22_EFF_15",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 200
            }
          }
        ],
        "description": "Bào mòn 200 ATK địch và gây 200 LP sát thương ăn mòn tích lũy."
      }
    ]
  },
  {
    "id": "card_b22_016_cont_trap_cathodic_delamination_paint_strip_16",
    "name": "Bong Tróc Điện Hóa Vùng Cathode (Quá Trình 2)",
    "name_en": "Cathodic Delamination Paint Strip (Process 2)",
    "cardType": "TRAP",
    "spellTrapSubtype": "CONTINUOUS_TRAP",
    "spellSpeed": 2,
    "rarity": "SECRET_RARE",
    "attribute": "ELECTRO",
    "manaCost": 5,
    "chemicalFormula": "2H2O + 2e-",
    "effectCode": "TRAP_B22_CATHODIC_DELAMINATION_PAINT_STRIP_CONT_16",
    "effectText": "[Bẫy Liên Tục / Continuous Trap - Spell Speed 2]: Duy trì trên sân. Mỗi khi đối thủ tuyên bố đòn tấn công hoặc kích hoạt hiệu ứng: Giảm 200 ATK của quái thú đó và đối thủ nhận 200 LP sát thương ăn mòn tích lũy.",
    "scientificLore": "Quá trình ăn mòn kim loại và thụ động hóa Bong Tróc Điện Hóa Vùng Cathode (2H₂O + 2e⁻ + O₂ → 4OH⁻ (High Local pH Delamination)) là bài toán thực tiễn quan trọng bậc nhất trong chuyên đề Hóa học 12 GDPT 2018.",
    "relatedEquation": "2H₂O + 2e⁻ + O₂ → 4OH⁻ (High Local pH Delamination)",
    "iupacName": "Cathodic Delamination Paint Strip Field",
    "archetype": "SURFACE_ADSORPTION",
    "structuredEffects": [
      {
        "effectId": "B22_EFF_16",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 200
            }
          }
        ],
        "description": "Bào mòn 200 ATK địch và gây 200 LP sát thương ăn mòn tích lũy."
      }
    ]
  },
  {
    "id": "card_b22_017_cont_trap_al2o3_passivation_shield_net_17",
    "name": "Màng Thụ Động Hóa Oxit Nhôm Bền Vững (Quá Trình 3)",
    "name_en": "Al2O3 Passivation Shield Net (Process 3)",
    "cardType": "TRAP",
    "spellTrapSubtype": "CONTINUOUS_TRAP",
    "spellSpeed": 2,
    "rarity": "COMMON",
    "attribute": "TERRA",
    "manaCost": 2,
    "chemicalFormula": "Al2O3 Film",
    "effectCode": "TRAP_B22_AL2O3_PASSIVATION_SHIELD_NET_CONT_17",
    "effectText": "[Bẫy Liên Tục / Continuous Trap - Spell Speed 2]: Duy trì trên sân. Mỗi khi đối thủ tuyên bố đòn tấn công hoặc kích hoạt hiệu ứng: Giảm 200 ATK của quái thú đó và đối thủ nhận 200 LP sát thương ăn mòn tích lũy.",
    "scientificLore": "Quá trình ăn mòn kim loại và thụ động hóa Màng Thụ Động Hóa Oxit Nhôm Bền Vững (4Al + 3O₂ → 2Al₂O₃ (Impermeable Protective Oxide Film)) là bài toán thực tiễn quan trọng bậc nhất trong chuyên đề Hóa học 12 GDPT 2018.",
    "relatedEquation": "4Al + 3O₂ → 2Al₂O₃ (Impermeable Protective Oxide Film)",
    "iupacName": "Al2O3 Passivation Shield Net Field",
    "archetype": "STRONG_ACID_CORROSION",
    "structuredEffects": [
      {
        "effectId": "B22_EFF_17",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 200
            }
          }
        ],
        "description": "Bào mòn 200 ATK địch và gây 200 LP sát thương ăn mòn tích lũy."
      }
    ]
  },
  {
    "id": "card_b22_018_cont_trap_electrochemical_rust_pitting_corrosion_18",
    "name": "Quá Trình Rỉ Sét Ăn Mòn Điện Hóa (Quá Trình 3)",
    "name_en": "Electrochemical Rust Pitting Corrosion (Process 3)",
    "cardType": "TRAP",
    "spellTrapSubtype": "CONTINUOUS_TRAP",
    "spellSpeed": 2,
    "rarity": "COMMON",
    "attribute": "ACID_DARK",
    "manaCost": 3,
    "chemicalFormula": "Fe2O3·xH2O",
    "effectCode": "TRAP_B22_ELECTROCHEMICAL_RUST_PITTING_CORROSION_CONT_18",
    "effectText": "[Bẫy Liên Tục / Continuous Trap - Spell Speed 2]: Duy trì trên sân. Mỗi khi đối thủ tuyên bố đòn tấn công hoặc kích hoạt hiệu ứng: Giảm 200 ATK của quái thú đó và đối thủ nhận 200 LP sát thương ăn mòn tích lũy.",
    "scientificLore": "Quá trình ăn mòn kim loại và thụ động hóa Quá Trình Rỉ Sét Ăn Mòn Điện Hóa (4Fe + 3O₂ + 2xH₂O → 2Fe₂O₃·xH₂O (Rust Pitting)) là bài toán thực tiễn quan trọng bậc nhất trong chuyên đề Hóa học 12 GDPT 2018.",
    "relatedEquation": "4Fe + 3O₂ + 2xH₂O → 2Fe₂O₃·xH₂O (Rust Pitting)",
    "iupacName": "Electrochemical Rust Pitting Corrosion Field",
    "archetype": "SURFACE_ADSORPTION",
    "structuredEffects": [
      {
        "effectId": "B22_EFF_18",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 200
            }
          }
        ],
        "description": "Bào mòn 200 ATK địch và gây 200 LP sát thương ăn mòn tích lũy."
      }
    ]
  },
  {
    "id": "card_b22_019_cont_trap_acid_rain_chemical_leaching_19",
    "name": "Mưa Axit Bào Mòn Đá Vôi Lâu Dài (Quá Trình 3)",
    "name_en": "Acid Rain Chemical Leaching (Process 3)",
    "cardType": "TRAP",
    "spellTrapSubtype": "CONTINUOUS_TRAP",
    "spellSpeed": 2,
    "rarity": "COMMON",
    "attribute": "ACID_DARK",
    "manaCost": 4,
    "chemicalFormula": "H2SO4+CaCO3",
    "effectCode": "TRAP_B22_ACID_RAIN_CHEMICAL_LEACHING_CONT_19",
    "effectText": "[Bẫy Liên Tục / Continuous Trap - Spell Speed 2]: Duy trì trên sân. Mỗi khi đối thủ tuyên bố đòn tấn công hoặc kích hoạt hiệu ứng: Giảm 200 ATK của quái thú đó và đối thủ nhận 200 LP sát thương ăn mòn tích lũy.",
    "scientificLore": "Quá trình ăn mòn kim loại và thụ động hóa Mưa Axit Bào Mòn Đá Vôi Lâu Dài (CaCO₃ + H₂SO₄ → CaSO₄ + H₂O + CO₂↑) là bài toán thực tiễn quan trọng bậc nhất trong chuyên đề Hóa học 12 GDPT 2018.",
    "relatedEquation": "CaCO₃ + H₂SO₄ → CaSO₄ + H₂O + CO₂↑",
    "iupacName": "Acid Rain Chemical Leaching Field",
    "archetype": "STRONG_ACID_CORROSION",
    "structuredEffects": [
      {
        "effectId": "B22_EFF_19",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 200
            }
          }
        ],
        "description": "Bào mòn 200 ATK địch và gây 200 LP sát thương ăn mòn tích lũy."
      }
    ]
  },
  {
    "id": "card_b22_020_cont_trap_electroless_nickel_plating_armor_20",
    "name": "Lớp Vỏ Mạ Niken Chống Oxy Hóa (Quá Trình 3)",
    "name_en": "Electroless Nickel Plating Armor (Process 3)",
    "cardType": "TRAP",
    "spellTrapSubtype": "CONTINUOUS_TRAP",
    "spellSpeed": 2,
    "rarity": "RARE",
    "attribute": "ELECTRO",
    "manaCost": 5,
    "chemicalFormula": "Ni-P Alloy",
    "effectCode": "TRAP_B22_ELECTROLESS_NICKEL_PLATING_ARMOR_CONT_20",
    "effectText": "[Bẫy Liên Tục / Continuous Trap - Spell Speed 2]: Duy trì trên sân. Mỗi khi đối thủ tuyên bố đòn tấn công hoặc kích hoạt hiệu ứng: Giảm 200 ATK của quái thú đó và đối thủ nhận 200 LP sát thương ăn mòn tích lũy.",
    "scientificLore": "Quá trình ăn mòn kim loại và thụ động hóa Lớp Vỏ Mạ Niken Chống Oxy Hóa (Ni²⁺ + H₂PO₂⁻ + H₂O → Ni + H₂PO₃⁻ + 2H⁺) là bài toán thực tiễn quan trọng bậc nhất trong chuyên đề Hóa học 12 GDPT 2018.",
    "relatedEquation": "Ni²⁺ + H₂PO₂⁻ + H₂O → Ni + H₂PO₃⁻ + 2H⁺",
    "iupacName": "Electroless Nickel Plating Armor Field",
    "archetype": "SURFACE_ADSORPTION",
    "structuredEffects": [
      {
        "effectId": "B22_EFF_20",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 200
            }
          }
        ],
        "description": "Bào mòn 200 ATK địch và gây 200 LP sát thương ăn mòn tích lũy."
      }
    ]
  },
  {
    "id": "card_b22_021_cont_trap_zinc_phosphate_anti_corrosive_primer_21",
    "name": "Màng Sơn Chống Gỉ Chứa Kẽm Phốt Phát (Quá Trình 3)",
    "name_en": "Zinc Phosphate Anti-Corrosive Primer (Process 3)",
    "cardType": "TRAP",
    "spellTrapSubtype": "CONTINUOUS_TRAP",
    "spellSpeed": 2,
    "rarity": "RARE",
    "attribute": "TERRA",
    "manaCost": 2,
    "chemicalFormula": "Zn3(PO4)2",
    "effectCode": "TRAP_B22_ZINC_PHOSPHATE_ANTI_CORROSIVE_PRIMER_CONT_21",
    "effectText": "[Bẫy Liên Tục / Continuous Trap - Spell Speed 2]: Duy trì trên sân. Mỗi khi đối thủ tuyên bố đòn tấn công hoặc kích hoạt hiệu ứng: Giảm 200 ATK của quái thú đó và đối thủ nhận 200 LP sát thương ăn mòn tích lũy.",
    "scientificLore": "Quá trình ăn mòn kim loại và thụ động hóa Màng Sơn Chống Gỉ Chứa Kẽm Phốt Phát (Metal Phosphatizing Crystalline Surface Passivation) là bài toán thực tiễn quan trọng bậc nhất trong chuyên đề Hóa học 12 GDPT 2018.",
    "relatedEquation": "Metal Phosphatizing Crystalline Surface Passivation",
    "iupacName": "Zinc Phosphate Anti-Corrosive Primer Field",
    "archetype": "STRONG_ACID_CORROSION",
    "structuredEffects": [
      {
        "effectId": "B22_EFF_21",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 200
            }
          }
        ],
        "description": "Bào mòn 200 ATK địch và gây 200 LP sát thương ăn mòn tích lũy."
      }
    ]
  },
  {
    "id": "card_b22_022_cont_trap_intergranular_corrosion_sensitization_22",
    "name": "Ăn Mòn Ranh Giới Hạt Thép Không Gỉ (Quá Trình 3)",
    "name_en": "Intergranular Corrosion Sensitization (Process 3)",
    "cardType": "TRAP",
    "spellTrapSubtype": "CONTINUOUS_TRAP",
    "spellSpeed": 2,
    "rarity": "SUPER_RARE",
    "attribute": "ACID_DARK",
    "manaCost": 3,
    "chemicalFormula": "Cr23C6 Depletion",
    "effectCode": "TRAP_B22_INTERGRANULAR_CORROSION_SENSITIZATION_CONT_22",
    "effectText": "[Bẫy Liên Tục / Continuous Trap - Spell Speed 2]: Duy trì trên sân. Mỗi khi đối thủ tuyên bố đòn tấn công hoặc kích hoạt hiệu ứng: Giảm 200 ATK của quái thú đó và đối thủ nhận 200 LP sát thương ăn mòn tích lũy.",
    "scientificLore": "Quá trình ăn mòn kim loại và thụ động hóa Ăn Mòn Ranh Giới Hạt Thép Không Gỉ (Chromium Carbide Precipitation at Grain Boundaries) là bài toán thực tiễn quan trọng bậc nhất trong chuyên đề Hóa học 12 GDPT 2018.",
    "relatedEquation": "Chromium Carbide Precipitation at Grain Boundaries",
    "iupacName": "Intergranular Corrosion Sensitization Field",
    "archetype": "SURFACE_ADSORPTION",
    "structuredEffects": [
      {
        "effectId": "B22_EFF_22",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 200
            }
          }
        ],
        "description": "Bào mòn 200 ATK địch và gây 200 LP sát thương ăn mòn tích lũy."
      }
    ]
  },
  {
    "id": "card_b22_023_cont_trap_hydrogen_sulfide_stress_cracking_23",
    "name": "Xâm Nhập Khí H2S Gây Giòn Kim Loại (Quá Trình 3)",
    "name_en": "Hydrogen Sulfide Stress Cracking (Process 3)",
    "cardType": "TRAP",
    "spellTrapSubtype": "CONTINUOUS_TRAP",
    "spellSpeed": 2,
    "rarity": "SUPER_RARE",
    "attribute": "ACID_DARK",
    "manaCost": 4,
    "chemicalFormula": "Fe + H2S",
    "effectCode": "TRAP_B22_HYDROGEN_SULFIDE_STRESS_CRACKING_CONT_23",
    "effectText": "[Bẫy Liên Tục / Continuous Trap - Spell Speed 2]: Duy trì trên sân. Mỗi khi đối thủ tuyên bố đòn tấn công hoặc kích hoạt hiệu ứng: Giảm 200 ATK của quái thú đó và đối thủ nhận 200 LP sát thương ăn mòn tích lũy.",
    "scientificLore": "Quá trình ăn mòn kim loại và thụ động hóa Xâm Nhập Khí H2S Gây Giòn Kim Loại (Fe + H₂S → FeS + 2H(absorbed atomic embrittlement)) là bài toán thực tiễn quan trọng bậc nhất trong chuyên đề Hóa học 12 GDPT 2018.",
    "relatedEquation": "Fe + H₂S → FeS + 2H(absorbed atomic embrittlement)",
    "iupacName": "Hydrogen Sulfide Stress Cracking Field",
    "archetype": "STRONG_ACID_CORROSION",
    "structuredEffects": [
      {
        "effectId": "B22_EFF_23",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 200
            }
          }
        ],
        "description": "Bào mòn 200 ATK địch và gây 200 LP sát thương ăn mòn tích lũy."
      }
    ]
  },
  {
    "id": "card_b22_024_cont_trap_cathodic_delamination_paint_strip_24",
    "name": "Bong Tróc Điện Hóa Vùng Cathode (Quá Trình 3)",
    "name_en": "Cathodic Delamination Paint Strip (Process 3)",
    "cardType": "TRAP",
    "spellTrapSubtype": "CONTINUOUS_TRAP",
    "spellSpeed": 2,
    "rarity": "ULTRA_RARE",
    "attribute": "ELECTRO",
    "manaCost": 5,
    "chemicalFormula": "2H2O + 2e-",
    "effectCode": "TRAP_B22_CATHODIC_DELAMINATION_PAINT_STRIP_CONT_24",
    "effectText": "[Bẫy Liên Tục / Continuous Trap - Spell Speed 2]: Duy trì trên sân. Mỗi khi đối thủ tuyên bố đòn tấn công hoặc kích hoạt hiệu ứng: Giảm 200 ATK của quái thú đó và đối thủ nhận 200 LP sát thương ăn mòn tích lũy.",
    "scientificLore": "Quá trình ăn mòn kim loại và thụ động hóa Bong Tróc Điện Hóa Vùng Cathode (2H₂O + 2e⁻ + O₂ → 4OH⁻ (High Local pH Delamination)) là bài toán thực tiễn quan trọng bậc nhất trong chuyên đề Hóa học 12 GDPT 2018.",
    "relatedEquation": "2H₂O + 2e⁻ + O₂ → 4OH⁻ (High Local pH Delamination)",
    "iupacName": "Cathodic Delamination Paint Strip Field",
    "archetype": "SURFACE_ADSORPTION",
    "structuredEffects": [
      {
        "effectId": "B22_EFF_24",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 200
            }
          }
        ],
        "description": "Bào mòn 200 ATK địch và gây 200 LP sát thương ăn mòn tích lũy."
      }
    ]
  },
  {
    "id": "card_b22_025_cont_trap_al2o3_passivation_shield_net_25",
    "name": "Màng Thụ Động Hóa Oxit Nhôm Bền Vững (Quá Trình 4)",
    "name_en": "Al2O3 Passivation Shield Net (Process 4)",
    "cardType": "TRAP",
    "spellTrapSubtype": "CONTINUOUS_TRAP",
    "spellSpeed": 2,
    "rarity": "SECRET_RARE",
    "attribute": "TERRA",
    "manaCost": 2,
    "chemicalFormula": "Al2O3 Film",
    "effectCode": "TRAP_B22_AL2O3_PASSIVATION_SHIELD_NET_CONT_25",
    "effectText": "[Bẫy Liên Tục / Continuous Trap - Spell Speed 2]: Duy trì trên sân. Mỗi khi đối thủ tuyên bố đòn tấn công hoặc kích hoạt hiệu ứng: Giảm 200 ATK của quái thú đó và đối thủ nhận 200 LP sát thương ăn mòn tích lũy.",
    "scientificLore": "Quá trình ăn mòn kim loại và thụ động hóa Màng Thụ Động Hóa Oxit Nhôm Bền Vững (4Al + 3O₂ → 2Al₂O₃ (Impermeable Protective Oxide Film)) là bài toán thực tiễn quan trọng bậc nhất trong chuyên đề Hóa học 12 GDPT 2018.",
    "relatedEquation": "4Al + 3O₂ → 2Al₂O₃ (Impermeable Protective Oxide Film)",
    "iupacName": "Al2O3 Passivation Shield Net Field",
    "archetype": "STRONG_ACID_CORROSION",
    "structuredEffects": [
      {
        "effectId": "B22_EFF_25",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 200
            }
          }
        ],
        "description": "Bào mòn 200 ATK địch và gây 200 LP sát thương ăn mòn tích lũy."
      }
    ]
  },
  {
    "id": "card_b22_026_cont_trap_electrochemical_rust_pitting_corrosion_26",
    "name": "Quá Trình Rỉ Sét Ăn Mòn Điện Hóa (Quá Trình 4)",
    "name_en": "Electrochemical Rust Pitting Corrosion (Process 4)",
    "cardType": "TRAP",
    "spellTrapSubtype": "CONTINUOUS_TRAP",
    "spellSpeed": 2,
    "rarity": "COMMON",
    "attribute": "ACID_DARK",
    "manaCost": 3,
    "chemicalFormula": "Fe2O3·xH2O",
    "effectCode": "TRAP_B22_ELECTROCHEMICAL_RUST_PITTING_CORROSION_CONT_26",
    "effectText": "[Bẫy Liên Tục / Continuous Trap - Spell Speed 2]: Duy trì trên sân. Mỗi khi đối thủ tuyên bố đòn tấn công hoặc kích hoạt hiệu ứng: Giảm 200 ATK của quái thú đó và đối thủ nhận 200 LP sát thương ăn mòn tích lũy.",
    "scientificLore": "Quá trình ăn mòn kim loại và thụ động hóa Quá Trình Rỉ Sét Ăn Mòn Điện Hóa (4Fe + 3O₂ + 2xH₂O → 2Fe₂O₃·xH₂O (Rust Pitting)) là bài toán thực tiễn quan trọng bậc nhất trong chuyên đề Hóa học 12 GDPT 2018.",
    "relatedEquation": "4Fe + 3O₂ + 2xH₂O → 2Fe₂O₃·xH₂O (Rust Pitting)",
    "iupacName": "Electrochemical Rust Pitting Corrosion Field",
    "archetype": "SURFACE_ADSORPTION",
    "structuredEffects": [
      {
        "effectId": "B22_EFF_26",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 200
            }
          }
        ],
        "description": "Bào mòn 200 ATK địch và gây 200 LP sát thương ăn mòn tích lũy."
      }
    ]
  },
  {
    "id": "card_b22_027_cont_trap_acid_rain_chemical_leaching_27",
    "name": "Mưa Axit Bào Mòn Đá Vôi Lâu Dài (Quá Trình 4)",
    "name_en": "Acid Rain Chemical Leaching (Process 4)",
    "cardType": "TRAP",
    "spellTrapSubtype": "CONTINUOUS_TRAP",
    "spellSpeed": 2,
    "rarity": "COMMON",
    "attribute": "ACID_DARK",
    "manaCost": 4,
    "chemicalFormula": "H2SO4+CaCO3",
    "effectCode": "TRAP_B22_ACID_RAIN_CHEMICAL_LEACHING_CONT_27",
    "effectText": "[Bẫy Liên Tục / Continuous Trap - Spell Speed 2]: Duy trì trên sân. Mỗi khi đối thủ tuyên bố đòn tấn công hoặc kích hoạt hiệu ứng: Giảm 200 ATK của quái thú đó và đối thủ nhận 200 LP sát thương ăn mòn tích lũy.",
    "scientificLore": "Quá trình ăn mòn kim loại và thụ động hóa Mưa Axit Bào Mòn Đá Vôi Lâu Dài (CaCO₃ + H₂SO₄ → CaSO₄ + H₂O + CO₂↑) là bài toán thực tiễn quan trọng bậc nhất trong chuyên đề Hóa học 12 GDPT 2018.",
    "relatedEquation": "CaCO₃ + H₂SO₄ → CaSO₄ + H₂O + CO₂↑",
    "iupacName": "Acid Rain Chemical Leaching Field",
    "archetype": "STRONG_ACID_CORROSION",
    "structuredEffects": [
      {
        "effectId": "B22_EFF_27",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 200
            }
          }
        ],
        "description": "Bào mòn 200 ATK địch và gây 200 LP sát thương ăn mòn tích lũy."
      }
    ]
  },
  {
    "id": "card_b22_028_cont_trap_electroless_nickel_plating_armor_28",
    "name": "Lớp Vỏ Mạ Niken Chống Oxy Hóa (Quá Trình 4)",
    "name_en": "Electroless Nickel Plating Armor (Process 4)",
    "cardType": "TRAP",
    "spellTrapSubtype": "CONTINUOUS_TRAP",
    "spellSpeed": 2,
    "rarity": "COMMON",
    "attribute": "ELECTRO",
    "manaCost": 5,
    "chemicalFormula": "Ni-P Alloy",
    "effectCode": "TRAP_B22_ELECTROLESS_NICKEL_PLATING_ARMOR_CONT_28",
    "effectText": "[Bẫy Liên Tục / Continuous Trap - Spell Speed 2]: Duy trì trên sân. Mỗi khi đối thủ tuyên bố đòn tấn công hoặc kích hoạt hiệu ứng: Giảm 200 ATK của quái thú đó và đối thủ nhận 200 LP sát thương ăn mòn tích lũy.",
    "scientificLore": "Quá trình ăn mòn kim loại và thụ động hóa Lớp Vỏ Mạ Niken Chống Oxy Hóa (Ni²⁺ + H₂PO₂⁻ + H₂O → Ni + H₂PO₃⁻ + 2H⁺) là bài toán thực tiễn quan trọng bậc nhất trong chuyên đề Hóa học 12 GDPT 2018.",
    "relatedEquation": "Ni²⁺ + H₂PO₂⁻ + H₂O → Ni + H₂PO₃⁻ + 2H⁺",
    "iupacName": "Electroless Nickel Plating Armor Field",
    "archetype": "SURFACE_ADSORPTION",
    "structuredEffects": [
      {
        "effectId": "B22_EFF_28",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 200
            }
          }
        ],
        "description": "Bào mòn 200 ATK địch và gây 200 LP sát thương ăn mòn tích lũy."
      }
    ]
  },
  {
    "id": "card_b22_029_cont_trap_zinc_phosphate_anti_corrosive_primer_29",
    "name": "Màng Sơn Chống Gỉ Chứa Kẽm Phốt Phát (Quá Trình 4)",
    "name_en": "Zinc Phosphate Anti-Corrosive Primer (Process 4)",
    "cardType": "TRAP",
    "spellTrapSubtype": "CONTINUOUS_TRAP",
    "spellSpeed": 2,
    "rarity": "RARE",
    "attribute": "TERRA",
    "manaCost": 2,
    "chemicalFormula": "Zn3(PO4)2",
    "effectCode": "TRAP_B22_ZINC_PHOSPHATE_ANTI_CORROSIVE_PRIMER_CONT_29",
    "effectText": "[Bẫy Liên Tục / Continuous Trap - Spell Speed 2]: Duy trì trên sân. Mỗi khi đối thủ tuyên bố đòn tấn công hoặc kích hoạt hiệu ứng: Giảm 200 ATK của quái thú đó và đối thủ nhận 200 LP sát thương ăn mòn tích lũy.",
    "scientificLore": "Quá trình ăn mòn kim loại và thụ động hóa Màng Sơn Chống Gỉ Chứa Kẽm Phốt Phát (Metal Phosphatizing Crystalline Surface Passivation) là bài toán thực tiễn quan trọng bậc nhất trong chuyên đề Hóa học 12 GDPT 2018.",
    "relatedEquation": "Metal Phosphatizing Crystalline Surface Passivation",
    "iupacName": "Zinc Phosphate Anti-Corrosive Primer Field",
    "archetype": "STRONG_ACID_CORROSION",
    "structuredEffects": [
      {
        "effectId": "B22_EFF_29",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 200
            }
          }
        ],
        "description": "Bào mòn 200 ATK địch và gây 200 LP sát thương ăn mòn tích lũy."
      }
    ]
  },
  {
    "id": "card_b22_030_cont_trap_intergranular_corrosion_sensitization_30",
    "name": "Ăn Mòn Ranh Giới Hạt Thép Không Gỉ (Quá Trình 4)",
    "name_en": "Intergranular Corrosion Sensitization (Process 4)",
    "cardType": "TRAP",
    "spellTrapSubtype": "CONTINUOUS_TRAP",
    "spellSpeed": 2,
    "rarity": "RARE",
    "attribute": "ACID_DARK",
    "manaCost": 3,
    "chemicalFormula": "Cr23C6 Depletion",
    "effectCode": "TRAP_B22_INTERGRANULAR_CORROSION_SENSITIZATION_CONT_30",
    "effectText": "[Bẫy Liên Tục / Continuous Trap - Spell Speed 2]: Duy trì trên sân. Mỗi khi đối thủ tuyên bố đòn tấn công hoặc kích hoạt hiệu ứng: Giảm 200 ATK của quái thú đó và đối thủ nhận 200 LP sát thương ăn mòn tích lũy.",
    "scientificLore": "Quá trình ăn mòn kim loại và thụ động hóa Ăn Mòn Ranh Giới Hạt Thép Không Gỉ (Chromium Carbide Precipitation at Grain Boundaries) là bài toán thực tiễn quan trọng bậc nhất trong chuyên đề Hóa học 12 GDPT 2018.",
    "relatedEquation": "Chromium Carbide Precipitation at Grain Boundaries",
    "iupacName": "Intergranular Corrosion Sensitization Field",
    "archetype": "SURFACE_ADSORPTION",
    "structuredEffects": [
      {
        "effectId": "B22_EFF_30",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 200
            }
          }
        ],
        "description": "Bào mòn 200 ATK địch và gây 200 LP sát thương ăn mòn tích lũy."
      }
    ]
  },
  {
    "id": "card_b22_031_cont_trap_hydrogen_sulfide_stress_cracking_31",
    "name": "Xâm Nhập Khí H2S Gây Giòn Kim Loại (Quá Trình 4)",
    "name_en": "Hydrogen Sulfide Stress Cracking (Process 4)",
    "cardType": "TRAP",
    "spellTrapSubtype": "CONTINUOUS_TRAP",
    "spellSpeed": 2,
    "rarity": "SUPER_RARE",
    "attribute": "ACID_DARK",
    "manaCost": 4,
    "chemicalFormula": "Fe + H2S",
    "effectCode": "TRAP_B22_HYDROGEN_SULFIDE_STRESS_CRACKING_CONT_31",
    "effectText": "[Bẫy Liên Tục / Continuous Trap - Spell Speed 2]: Duy trì trên sân. Mỗi khi đối thủ tuyên bố đòn tấn công hoặc kích hoạt hiệu ứng: Giảm 200 ATK của quái thú đó và đối thủ nhận 200 LP sát thương ăn mòn tích lũy.",
    "scientificLore": "Quá trình ăn mòn kim loại và thụ động hóa Xâm Nhập Khí H2S Gây Giòn Kim Loại (Fe + H₂S → FeS + 2H(absorbed atomic embrittlement)) là bài toán thực tiễn quan trọng bậc nhất trong chuyên đề Hóa học 12 GDPT 2018.",
    "relatedEquation": "Fe + H₂S → FeS + 2H(absorbed atomic embrittlement)",
    "iupacName": "Hydrogen Sulfide Stress Cracking Field",
    "archetype": "STRONG_ACID_CORROSION",
    "structuredEffects": [
      {
        "effectId": "B22_EFF_31",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 200
            }
          }
        ],
        "description": "Bào mòn 200 ATK địch và gây 200 LP sát thương ăn mòn tích lũy."
      }
    ]
  },
  {
    "id": "card_b22_032_cont_trap_cathodic_delamination_paint_strip_32",
    "name": "Bong Tróc Điện Hóa Vùng Cathode (Quá Trình 4)",
    "name_en": "Cathodic Delamination Paint Strip (Process 4)",
    "cardType": "TRAP",
    "spellTrapSubtype": "CONTINUOUS_TRAP",
    "spellSpeed": 2,
    "rarity": "SUPER_RARE",
    "attribute": "ELECTRO",
    "manaCost": 5,
    "chemicalFormula": "2H2O + 2e-",
    "effectCode": "TRAP_B22_CATHODIC_DELAMINATION_PAINT_STRIP_CONT_32",
    "effectText": "[Bẫy Liên Tục / Continuous Trap - Spell Speed 2]: Duy trì trên sân. Mỗi khi đối thủ tuyên bố đòn tấn công hoặc kích hoạt hiệu ứng: Giảm 200 ATK của quái thú đó và đối thủ nhận 200 LP sát thương ăn mòn tích lũy.",
    "scientificLore": "Quá trình ăn mòn kim loại và thụ động hóa Bong Tróc Điện Hóa Vùng Cathode (2H₂O + 2e⁻ + O₂ → 4OH⁻ (High Local pH Delamination)) là bài toán thực tiễn quan trọng bậc nhất trong chuyên đề Hóa học 12 GDPT 2018.",
    "relatedEquation": "2H₂O + 2e⁻ + O₂ → 4OH⁻ (High Local pH Delamination)",
    "iupacName": "Cathodic Delamination Paint Strip Field",
    "archetype": "SURFACE_ADSORPTION",
    "structuredEffects": [
      {
        "effectId": "B22_EFF_32",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 200
            }
          }
        ],
        "description": "Bào mòn 200 ATK địch và gây 200 LP sát thương ăn mòn tích lũy."
      }
    ]
  },
  {
    "id": "card_b22_033_cont_trap_al2o3_passivation_shield_net_33",
    "name": "Màng Thụ Động Hóa Oxit Nhôm Bền Vững (Quá Trình 5)",
    "name_en": "Al2O3 Passivation Shield Net (Process 5)",
    "cardType": "TRAP",
    "spellTrapSubtype": "CONTINUOUS_TRAP",
    "spellSpeed": 2,
    "rarity": "ULTRA_RARE",
    "attribute": "TERRA",
    "manaCost": 2,
    "chemicalFormula": "Al2O3 Film",
    "effectCode": "TRAP_B22_AL2O3_PASSIVATION_SHIELD_NET_CONT_33",
    "effectText": "[Bẫy Liên Tục / Continuous Trap - Spell Speed 2]: Duy trì trên sân. Mỗi khi đối thủ tuyên bố đòn tấn công hoặc kích hoạt hiệu ứng: Giảm 200 ATK của quái thú đó và đối thủ nhận 200 LP sát thương ăn mòn tích lũy.",
    "scientificLore": "Quá trình ăn mòn kim loại và thụ động hóa Màng Thụ Động Hóa Oxit Nhôm Bền Vững (4Al + 3O₂ → 2Al₂O₃ (Impermeable Protective Oxide Film)) là bài toán thực tiễn quan trọng bậc nhất trong chuyên đề Hóa học 12 GDPT 2018.",
    "relatedEquation": "4Al + 3O₂ → 2Al₂O₃ (Impermeable Protective Oxide Film)",
    "iupacName": "Al2O3 Passivation Shield Net Field",
    "archetype": "STRONG_ACID_CORROSION",
    "structuredEffects": [
      {
        "effectId": "B22_EFF_33",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 200
            }
          }
        ],
        "description": "Bào mòn 200 ATK địch và gây 200 LP sát thương ăn mòn tích lũy."
      }
    ]
  },
  {
    "id": "card_b22_034_cont_trap_electrochemical_rust_pitting_corrosion_34",
    "name": "Quá Trình Rỉ Sét Ăn Mòn Điện Hóa (Quá Trình 5)",
    "name_en": "Electrochemical Rust Pitting Corrosion (Process 5)",
    "cardType": "TRAP",
    "spellTrapSubtype": "CONTINUOUS_TRAP",
    "spellSpeed": 2,
    "rarity": "SECRET_RARE",
    "attribute": "ACID_DARK",
    "manaCost": 3,
    "chemicalFormula": "Fe2O3·xH2O",
    "effectCode": "TRAP_B22_ELECTROCHEMICAL_RUST_PITTING_CORROSION_CONT_34",
    "effectText": "[Bẫy Liên Tục / Continuous Trap - Spell Speed 2]: Duy trì trên sân. Mỗi khi đối thủ tuyên bố đòn tấn công hoặc kích hoạt hiệu ứng: Giảm 200 ATK của quái thú đó và đối thủ nhận 200 LP sát thương ăn mòn tích lũy.",
    "scientificLore": "Quá trình ăn mòn kim loại và thụ động hóa Quá Trình Rỉ Sét Ăn Mòn Điện Hóa (4Fe + 3O₂ + 2xH₂O → 2Fe₂O₃·xH₂O (Rust Pitting)) là bài toán thực tiễn quan trọng bậc nhất trong chuyên đề Hóa học 12 GDPT 2018.",
    "relatedEquation": "4Fe + 3O₂ + 2xH₂O → 2Fe₂O₃·xH₂O (Rust Pitting)",
    "iupacName": "Electrochemical Rust Pitting Corrosion Field",
    "archetype": "SURFACE_ADSORPTION",
    "structuredEffects": [
      {
        "effectId": "B22_EFF_34",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 200
            }
          }
        ],
        "description": "Bào mòn 200 ATK địch và gây 200 LP sát thương ăn mòn tích lũy."
      }
    ]
  },
  {
    "id": "card_b22_035_cont_trap_acid_rain_chemical_leaching_35",
    "name": "Mưa Axit Bào Mòn Đá Vôi Lâu Dài (Quá Trình 5)",
    "name_en": "Acid Rain Chemical Leaching (Process 5)",
    "cardType": "TRAP",
    "spellTrapSubtype": "CONTINUOUS_TRAP",
    "spellSpeed": 2,
    "rarity": "COMMON",
    "attribute": "ACID_DARK",
    "manaCost": 4,
    "chemicalFormula": "H2SO4+CaCO3",
    "effectCode": "TRAP_B22_ACID_RAIN_CHEMICAL_LEACHING_CONT_35",
    "effectText": "[Bẫy Liên Tục / Continuous Trap - Spell Speed 2]: Duy trì trên sân. Mỗi khi đối thủ tuyên bố đòn tấn công hoặc kích hoạt hiệu ứng: Giảm 200 ATK của quái thú đó và đối thủ nhận 200 LP sát thương ăn mòn tích lũy.",
    "scientificLore": "Quá trình ăn mòn kim loại và thụ động hóa Mưa Axit Bào Mòn Đá Vôi Lâu Dài (CaCO₃ + H₂SO₄ → CaSO₄ + H₂O + CO₂↑) là bài toán thực tiễn quan trọng bậc nhất trong chuyên đề Hóa học 12 GDPT 2018.",
    "relatedEquation": "CaCO₃ + H₂SO₄ → CaSO₄ + H₂O + CO₂↑",
    "iupacName": "Acid Rain Chemical Leaching Field",
    "archetype": "STRONG_ACID_CORROSION",
    "structuredEffects": [
      {
        "effectId": "B22_EFF_35",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 200
            }
          }
        ],
        "description": "Bào mòn 200 ATK địch và gây 200 LP sát thương ăn mòn tích lũy."
      }
    ]
  },
  {
    "id": "card_b22_036_cont_trap_electroless_nickel_plating_armor_36",
    "name": "Lớp Vỏ Mạ Niken Chống Oxy Hóa (Quá Trình 5)",
    "name_en": "Electroless Nickel Plating Armor (Process 5)",
    "cardType": "TRAP",
    "spellTrapSubtype": "CONTINUOUS_TRAP",
    "spellSpeed": 2,
    "rarity": "COMMON",
    "attribute": "ELECTRO",
    "manaCost": 5,
    "chemicalFormula": "Ni-P Alloy",
    "effectCode": "TRAP_B22_ELECTROLESS_NICKEL_PLATING_ARMOR_CONT_36",
    "effectText": "[Bẫy Liên Tục / Continuous Trap - Spell Speed 2]: Duy trì trên sân. Mỗi khi đối thủ tuyên bố đòn tấn công hoặc kích hoạt hiệu ứng: Giảm 200 ATK của quái thú đó và đối thủ nhận 200 LP sát thương ăn mòn tích lũy.",
    "scientificLore": "Quá trình ăn mòn kim loại và thụ động hóa Lớp Vỏ Mạ Niken Chống Oxy Hóa (Ni²⁺ + H₂PO₂⁻ + H₂O → Ni + H₂PO₃⁻ + 2H⁺) là bài toán thực tiễn quan trọng bậc nhất trong chuyên đề Hóa học 12 GDPT 2018.",
    "relatedEquation": "Ni²⁺ + H₂PO₂⁻ + H₂O → Ni + H₂PO₃⁻ + 2H⁺",
    "iupacName": "Electroless Nickel Plating Armor Field",
    "archetype": "SURFACE_ADSORPTION",
    "structuredEffects": [
      {
        "effectId": "B22_EFF_36",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 200
            }
          }
        ],
        "description": "Bào mòn 200 ATK địch và gây 200 LP sát thương ăn mòn tích lũy."
      }
    ]
  },
  {
    "id": "card_b22_037_cont_trap_zinc_phosphate_anti_corrosive_primer_37",
    "name": "Màng Sơn Chống Gỉ Chứa Kẽm Phốt Phát (Quá Trình 5)",
    "name_en": "Zinc Phosphate Anti-Corrosive Primer (Process 5)",
    "cardType": "TRAP",
    "spellTrapSubtype": "CONTINUOUS_TRAP",
    "spellSpeed": 2,
    "rarity": "COMMON",
    "attribute": "TERRA",
    "manaCost": 2,
    "chemicalFormula": "Zn3(PO4)2",
    "effectCode": "TRAP_B22_ZINC_PHOSPHATE_ANTI_CORROSIVE_PRIMER_CONT_37",
    "effectText": "[Bẫy Liên Tục / Continuous Trap - Spell Speed 2]: Duy trì trên sân. Mỗi khi đối thủ tuyên bố đòn tấn công hoặc kích hoạt hiệu ứng: Giảm 200 ATK của quái thú đó và đối thủ nhận 200 LP sát thương ăn mòn tích lũy.",
    "scientificLore": "Quá trình ăn mòn kim loại và thụ động hóa Màng Sơn Chống Gỉ Chứa Kẽm Phốt Phát (Metal Phosphatizing Crystalline Surface Passivation) là bài toán thực tiễn quan trọng bậc nhất trong chuyên đề Hóa học 12 GDPT 2018.",
    "relatedEquation": "Metal Phosphatizing Crystalline Surface Passivation",
    "iupacName": "Zinc Phosphate Anti-Corrosive Primer Field",
    "archetype": "STRONG_ACID_CORROSION",
    "structuredEffects": [
      {
        "effectId": "B22_EFF_37",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 200
            }
          }
        ],
        "description": "Bào mòn 200 ATK địch và gây 200 LP sát thương ăn mòn tích lũy."
      }
    ]
  },
  {
    "id": "card_b22_038_cont_trap_intergranular_corrosion_sensitization_38",
    "name": "Ăn Mòn Ranh Giới Hạt Thép Không Gỉ (Quá Trình 5)",
    "name_en": "Intergranular Corrosion Sensitization (Process 5)",
    "cardType": "TRAP",
    "spellTrapSubtype": "CONTINUOUS_TRAP",
    "spellSpeed": 2,
    "rarity": "RARE",
    "attribute": "ACID_DARK",
    "manaCost": 3,
    "chemicalFormula": "Cr23C6 Depletion",
    "effectCode": "TRAP_B22_INTERGRANULAR_CORROSION_SENSITIZATION_CONT_38",
    "effectText": "[Bẫy Liên Tục / Continuous Trap - Spell Speed 2]: Duy trì trên sân. Mỗi khi đối thủ tuyên bố đòn tấn công hoặc kích hoạt hiệu ứng: Giảm 200 ATK của quái thú đó và đối thủ nhận 200 LP sát thương ăn mòn tích lũy.",
    "scientificLore": "Quá trình ăn mòn kim loại và thụ động hóa Ăn Mòn Ranh Giới Hạt Thép Không Gỉ (Chromium Carbide Precipitation at Grain Boundaries) là bài toán thực tiễn quan trọng bậc nhất trong chuyên đề Hóa học 12 GDPT 2018.",
    "relatedEquation": "Chromium Carbide Precipitation at Grain Boundaries",
    "iupacName": "Intergranular Corrosion Sensitization Field",
    "archetype": "SURFACE_ADSORPTION",
    "structuredEffects": [
      {
        "effectId": "B22_EFF_38",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 200
            }
          }
        ],
        "description": "Bào mòn 200 ATK địch và gây 200 LP sát thương ăn mòn tích lũy."
      }
    ]
  },
  {
    "id": "card_b22_039_cont_trap_hydrogen_sulfide_stress_cracking_39",
    "name": "Xâm Nhập Khí H2S Gây Giòn Kim Loại (Quá Trình 5)",
    "name_en": "Hydrogen Sulfide Stress Cracking (Process 5)",
    "cardType": "TRAP",
    "spellTrapSubtype": "CONTINUOUS_TRAP",
    "spellSpeed": 2,
    "rarity": "RARE",
    "attribute": "ACID_DARK",
    "manaCost": 4,
    "chemicalFormula": "Fe + H2S",
    "effectCode": "TRAP_B22_HYDROGEN_SULFIDE_STRESS_CRACKING_CONT_39",
    "effectText": "[Bẫy Liên Tục / Continuous Trap - Spell Speed 2]: Duy trì trên sân. Mỗi khi đối thủ tuyên bố đòn tấn công hoặc kích hoạt hiệu ứng: Giảm 200 ATK của quái thú đó và đối thủ nhận 200 LP sát thương ăn mòn tích lũy.",
    "scientificLore": "Quá trình ăn mòn kim loại và thụ động hóa Xâm Nhập Khí H2S Gây Giòn Kim Loại (Fe + H₂S → FeS + 2H(absorbed atomic embrittlement)) là bài toán thực tiễn quan trọng bậc nhất trong chuyên đề Hóa học 12 GDPT 2018.",
    "relatedEquation": "Fe + H₂S → FeS + 2H(absorbed atomic embrittlement)",
    "iupacName": "Hydrogen Sulfide Stress Cracking Field",
    "archetype": "STRONG_ACID_CORROSION",
    "structuredEffects": [
      {
        "effectId": "B22_EFF_39",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 200
            }
          }
        ],
        "description": "Bào mòn 200 ATK địch và gây 200 LP sát thương ăn mòn tích lũy."
      }
    ]
  },
  {
    "id": "card_b22_040_cont_trap_cathodic_delamination_paint_strip_40",
    "name": "Bong Tróc Điện Hóa Vùng Cathode (Quá Trình 5)",
    "name_en": "Cathodic Delamination Paint Strip (Process 5)",
    "cardType": "TRAP",
    "spellTrapSubtype": "CONTINUOUS_TRAP",
    "spellSpeed": 2,
    "rarity": "SUPER_RARE",
    "attribute": "ELECTRO",
    "manaCost": 5,
    "chemicalFormula": "2H2O + 2e-",
    "effectCode": "TRAP_B22_CATHODIC_DELAMINATION_PAINT_STRIP_CONT_40",
    "effectText": "[Bẫy Liên Tục / Continuous Trap - Spell Speed 2]: Duy trì trên sân. Mỗi khi đối thủ tuyên bố đòn tấn công hoặc kích hoạt hiệu ứng: Giảm 200 ATK của quái thú đó và đối thủ nhận 200 LP sát thương ăn mòn tích lũy.",
    "scientificLore": "Quá trình ăn mòn kim loại và thụ động hóa Bong Tróc Điện Hóa Vùng Cathode (2H₂O + 2e⁻ + O₂ → 4OH⁻ (High Local pH Delamination)) là bài toán thực tiễn quan trọng bậc nhất trong chuyên đề Hóa học 12 GDPT 2018.",
    "relatedEquation": "2H₂O + 2e⁻ + O₂ → 4OH⁻ (High Local pH Delamination)",
    "iupacName": "Cathodic Delamination Paint Strip Field",
    "archetype": "SURFACE_ADSORPTION",
    "structuredEffects": [
      {
        "effectId": "B22_EFF_40",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 200
            }
          }
        ],
        "description": "Bào mòn 200 ATK địch và gây 200 LP sát thương ăn mòn tích lũy."
      }
    ]
  },
  {
    "id": "card_b22_041_cont_trap_al2o3_passivation_shield_net_41",
    "name": "Màng Thụ Động Hóa Oxit Nhôm Bền Vững (Quá Trình 6)",
    "name_en": "Al2O3 Passivation Shield Net (Process 6)",
    "cardType": "TRAP",
    "spellTrapSubtype": "CONTINUOUS_TRAP",
    "spellSpeed": 2,
    "rarity": "SUPER_RARE",
    "attribute": "TERRA",
    "manaCost": 2,
    "chemicalFormula": "Al2O3 Film",
    "effectCode": "TRAP_B22_AL2O3_PASSIVATION_SHIELD_NET_CONT_41",
    "effectText": "[Bẫy Liên Tục / Continuous Trap - Spell Speed 2]: Duy trì trên sân. Mỗi khi đối thủ tuyên bố đòn tấn công hoặc kích hoạt hiệu ứng: Giảm 200 ATK của quái thú đó và đối thủ nhận 200 LP sát thương ăn mòn tích lũy.",
    "scientificLore": "Quá trình ăn mòn kim loại và thụ động hóa Màng Thụ Động Hóa Oxit Nhôm Bền Vững (4Al + 3O₂ → 2Al₂O₃ (Impermeable Protective Oxide Film)) là bài toán thực tiễn quan trọng bậc nhất trong chuyên đề Hóa học 12 GDPT 2018.",
    "relatedEquation": "4Al + 3O₂ → 2Al₂O₃ (Impermeable Protective Oxide Film)",
    "iupacName": "Al2O3 Passivation Shield Net Field",
    "archetype": "STRONG_ACID_CORROSION",
    "structuredEffects": [
      {
        "effectId": "B22_EFF_41",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 200
            }
          }
        ],
        "description": "Bào mòn 200 ATK địch và gây 200 LP sát thương ăn mòn tích lũy."
      }
    ]
  },
  {
    "id": "card_b22_042_cont_trap_electrochemical_rust_pitting_corrosion_42",
    "name": "Quá Trình Rỉ Sét Ăn Mòn Điện Hóa (Quá Trình 6)",
    "name_en": "Electrochemical Rust Pitting Corrosion (Process 6)",
    "cardType": "TRAP",
    "spellTrapSubtype": "CONTINUOUS_TRAP",
    "spellSpeed": 2,
    "rarity": "ULTRA_RARE",
    "attribute": "ACID_DARK",
    "manaCost": 3,
    "chemicalFormula": "Fe2O3·xH2O",
    "effectCode": "TRAP_B22_ELECTROCHEMICAL_RUST_PITTING_CORROSION_CONT_42",
    "effectText": "[Bẫy Liên Tục / Continuous Trap - Spell Speed 2]: Duy trì trên sân. Mỗi khi đối thủ tuyên bố đòn tấn công hoặc kích hoạt hiệu ứng: Giảm 200 ATK của quái thú đó và đối thủ nhận 200 LP sát thương ăn mòn tích lũy.",
    "scientificLore": "Quá trình ăn mòn kim loại và thụ động hóa Quá Trình Rỉ Sét Ăn Mòn Điện Hóa (4Fe + 3O₂ + 2xH₂O → 2Fe₂O₃·xH₂O (Rust Pitting)) là bài toán thực tiễn quan trọng bậc nhất trong chuyên đề Hóa học 12 GDPT 2018.",
    "relatedEquation": "4Fe + 3O₂ + 2xH₂O → 2Fe₂O₃·xH₂O (Rust Pitting)",
    "iupacName": "Electrochemical Rust Pitting Corrosion Field",
    "archetype": "SURFACE_ADSORPTION",
    "structuredEffects": [
      {
        "effectId": "B22_EFF_42",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 200
            }
          }
        ],
        "description": "Bào mòn 200 ATK địch và gây 200 LP sát thương ăn mòn tích lũy."
      }
    ]
  },
  {
    "id": "card_b22_043_cont_trap_acid_rain_chemical_leaching_43",
    "name": "Mưa Axit Bào Mòn Đá Vôi Lâu Dài (Quá Trình 6)",
    "name_en": "Acid Rain Chemical Leaching (Process 6)",
    "cardType": "TRAP",
    "spellTrapSubtype": "CONTINUOUS_TRAP",
    "spellSpeed": 2,
    "rarity": "SECRET_RARE",
    "attribute": "ACID_DARK",
    "manaCost": 4,
    "chemicalFormula": "H2SO4+CaCO3",
    "effectCode": "TRAP_B22_ACID_RAIN_CHEMICAL_LEACHING_CONT_43",
    "effectText": "[Bẫy Liên Tục / Continuous Trap - Spell Speed 2]: Duy trì trên sân. Mỗi khi đối thủ tuyên bố đòn tấn công hoặc kích hoạt hiệu ứng: Giảm 200 ATK của quái thú đó và đối thủ nhận 200 LP sát thương ăn mòn tích lũy.",
    "scientificLore": "Quá trình ăn mòn kim loại và thụ động hóa Mưa Axit Bào Mòn Đá Vôi Lâu Dài (CaCO₃ + H₂SO₄ → CaSO₄ + H₂O + CO₂↑) là bài toán thực tiễn quan trọng bậc nhất trong chuyên đề Hóa học 12 GDPT 2018.",
    "relatedEquation": "CaCO₃ + H₂SO₄ → CaSO₄ + H₂O + CO₂↑",
    "iupacName": "Acid Rain Chemical Leaching Field",
    "archetype": "STRONG_ACID_CORROSION",
    "structuredEffects": [
      {
        "effectId": "B22_EFF_43",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 200
            }
          }
        ],
        "description": "Bào mòn 200 ATK địch và gây 200 LP sát thương ăn mòn tích lũy."
      }
    ]
  },
  {
    "id": "card_b22_044_cont_trap_electroless_nickel_plating_armor_44",
    "name": "Lớp Vỏ Mạ Niken Chống Oxy Hóa (Quá Trình 6)",
    "name_en": "Electroless Nickel Plating Armor (Process 6)",
    "cardType": "TRAP",
    "spellTrapSubtype": "CONTINUOUS_TRAP",
    "spellSpeed": 2,
    "rarity": "COMMON",
    "attribute": "ELECTRO",
    "manaCost": 5,
    "chemicalFormula": "Ni-P Alloy",
    "effectCode": "TRAP_B22_ELECTROLESS_NICKEL_PLATING_ARMOR_CONT_44",
    "effectText": "[Bẫy Liên Tục / Continuous Trap - Spell Speed 2]: Duy trì trên sân. Mỗi khi đối thủ tuyên bố đòn tấn công hoặc kích hoạt hiệu ứng: Giảm 200 ATK của quái thú đó và đối thủ nhận 200 LP sát thương ăn mòn tích lũy.",
    "scientificLore": "Quá trình ăn mòn kim loại và thụ động hóa Lớp Vỏ Mạ Niken Chống Oxy Hóa (Ni²⁺ + H₂PO₂⁻ + H₂O → Ni + H₂PO₃⁻ + 2H⁺) là bài toán thực tiễn quan trọng bậc nhất trong chuyên đề Hóa học 12 GDPT 2018.",
    "relatedEquation": "Ni²⁺ + H₂PO₂⁻ + H₂O → Ni + H₂PO₃⁻ + 2H⁺",
    "iupacName": "Electroless Nickel Plating Armor Field",
    "archetype": "SURFACE_ADSORPTION",
    "structuredEffects": [
      {
        "effectId": "B22_EFF_44",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 200
            }
          }
        ],
        "description": "Bào mòn 200 ATK địch và gây 200 LP sát thương ăn mòn tích lũy."
      }
    ]
  },
  {
    "id": "card_b22_045_cont_trap_zinc_phosphate_anti_corrosive_primer_45",
    "name": "Màng Sơn Chống Gỉ Chứa Kẽm Phốt Phát (Quá Trình 6)",
    "name_en": "Zinc Phosphate Anti-Corrosive Primer (Process 6)",
    "cardType": "TRAP",
    "spellTrapSubtype": "CONTINUOUS_TRAP",
    "spellSpeed": 2,
    "rarity": "COMMON",
    "attribute": "TERRA",
    "manaCost": 2,
    "chemicalFormula": "Zn3(PO4)2",
    "effectCode": "TRAP_B22_ZINC_PHOSPHATE_ANTI_CORROSIVE_PRIMER_CONT_45",
    "effectText": "[Bẫy Liên Tục / Continuous Trap - Spell Speed 2]: Duy trì trên sân. Mỗi khi đối thủ tuyên bố đòn tấn công hoặc kích hoạt hiệu ứng: Giảm 200 ATK của quái thú đó và đối thủ nhận 200 LP sát thương ăn mòn tích lũy.",
    "scientificLore": "Quá trình ăn mòn kim loại và thụ động hóa Màng Sơn Chống Gỉ Chứa Kẽm Phốt Phát (Metal Phosphatizing Crystalline Surface Passivation) là bài toán thực tiễn quan trọng bậc nhất trong chuyên đề Hóa học 12 GDPT 2018.",
    "relatedEquation": "Metal Phosphatizing Crystalline Surface Passivation",
    "iupacName": "Zinc Phosphate Anti-Corrosive Primer Field",
    "archetype": "STRONG_ACID_CORROSION",
    "structuredEffects": [
      {
        "effectId": "B22_EFF_45",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 200
            }
          }
        ],
        "description": "Bào mòn 200 ATK địch và gây 200 LP sát thương ăn mòn tích lũy."
      }
    ]
  },
  {
    "id": "card_b22_046_cont_trap_intergranular_corrosion_sensitization_46",
    "name": "Ăn Mòn Ranh Giới Hạt Thép Không Gỉ (Quá Trình 6)",
    "name_en": "Intergranular Corrosion Sensitization (Process 6)",
    "cardType": "TRAP",
    "spellTrapSubtype": "CONTINUOUS_TRAP",
    "spellSpeed": 2,
    "rarity": "COMMON",
    "attribute": "ACID_DARK",
    "manaCost": 3,
    "chemicalFormula": "Cr23C6 Depletion",
    "effectCode": "TRAP_B22_INTERGRANULAR_CORROSION_SENSITIZATION_CONT_46",
    "effectText": "[Bẫy Liên Tục / Continuous Trap - Spell Speed 2]: Duy trì trên sân. Mỗi khi đối thủ tuyên bố đòn tấn công hoặc kích hoạt hiệu ứng: Giảm 200 ATK của quái thú đó và đối thủ nhận 200 LP sát thương ăn mòn tích lũy.",
    "scientificLore": "Quá trình ăn mòn kim loại và thụ động hóa Ăn Mòn Ranh Giới Hạt Thép Không Gỉ (Chromium Carbide Precipitation at Grain Boundaries) là bài toán thực tiễn quan trọng bậc nhất trong chuyên đề Hóa học 12 GDPT 2018.",
    "relatedEquation": "Chromium Carbide Precipitation at Grain Boundaries",
    "iupacName": "Intergranular Corrosion Sensitization Field",
    "archetype": "SURFACE_ADSORPTION",
    "structuredEffects": [
      {
        "effectId": "B22_EFF_46",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 200
            }
          }
        ],
        "description": "Bào mòn 200 ATK địch và gây 200 LP sát thương ăn mòn tích lũy."
      }
    ]
  },
  {
    "id": "card_b22_047_cont_trap_hydrogen_sulfide_stress_cracking_47",
    "name": "Xâm Nhập Khí H2S Gây Giòn Kim Loại (Quá Trình 6)",
    "name_en": "Hydrogen Sulfide Stress Cracking (Process 6)",
    "cardType": "TRAP",
    "spellTrapSubtype": "CONTINUOUS_TRAP",
    "spellSpeed": 2,
    "rarity": "RARE",
    "attribute": "ACID_DARK",
    "manaCost": 4,
    "chemicalFormula": "Fe + H2S",
    "effectCode": "TRAP_B22_HYDROGEN_SULFIDE_STRESS_CRACKING_CONT_47",
    "effectText": "[Bẫy Liên Tục / Continuous Trap - Spell Speed 2]: Duy trì trên sân. Mỗi khi đối thủ tuyên bố đòn tấn công hoặc kích hoạt hiệu ứng: Giảm 200 ATK của quái thú đó và đối thủ nhận 200 LP sát thương ăn mòn tích lũy.",
    "scientificLore": "Quá trình ăn mòn kim loại và thụ động hóa Xâm Nhập Khí H2S Gây Giòn Kim Loại (Fe + H₂S → FeS + 2H(absorbed atomic embrittlement)) là bài toán thực tiễn quan trọng bậc nhất trong chuyên đề Hóa học 12 GDPT 2018.",
    "relatedEquation": "Fe + H₂S → FeS + 2H(absorbed atomic embrittlement)",
    "iupacName": "Hydrogen Sulfide Stress Cracking Field",
    "archetype": "STRONG_ACID_CORROSION",
    "structuredEffects": [
      {
        "effectId": "B22_EFF_47",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 200
            }
          }
        ],
        "description": "Bào mòn 200 ATK địch và gây 200 LP sát thương ăn mòn tích lũy."
      }
    ]
  },
  {
    "id": "card_b22_048_cont_trap_cathodic_delamination_paint_strip_48",
    "name": "Bong Tróc Điện Hóa Vùng Cathode (Quá Trình 6)",
    "name_en": "Cathodic Delamination Paint Strip (Process 6)",
    "cardType": "TRAP",
    "spellTrapSubtype": "CONTINUOUS_TRAP",
    "spellSpeed": 2,
    "rarity": "RARE",
    "attribute": "ELECTRO",
    "manaCost": 5,
    "chemicalFormula": "2H2O + 2e-",
    "effectCode": "TRAP_B22_CATHODIC_DELAMINATION_PAINT_STRIP_CONT_48",
    "effectText": "[Bẫy Liên Tục / Continuous Trap - Spell Speed 2]: Duy trì trên sân. Mỗi khi đối thủ tuyên bố đòn tấn công hoặc kích hoạt hiệu ứng: Giảm 200 ATK của quái thú đó và đối thủ nhận 200 LP sát thương ăn mòn tích lũy.",
    "scientificLore": "Quá trình ăn mòn kim loại và thụ động hóa Bong Tróc Điện Hóa Vùng Cathode (2H₂O + 2e⁻ + O₂ → 4OH⁻ (High Local pH Delamination)) là bài toán thực tiễn quan trọng bậc nhất trong chuyên đề Hóa học 12 GDPT 2018.",
    "relatedEquation": "2H₂O + 2e⁻ + O₂ → 4OH⁻ (High Local pH Delamination)",
    "iupacName": "Cathodic Delamination Paint Strip Field",
    "archetype": "SURFACE_ADSORPTION",
    "structuredEffects": [
      {
        "effectId": "B22_EFF_48",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 200
            }
          }
        ],
        "description": "Bào mòn 200 ATK địch và gây 200 LP sát thương ăn mòn tích lũy."
      }
    ]
  },
  {
    "id": "card_b22_049_cont_trap_al2o3_passivation_shield_net_49",
    "name": "Màng Thụ Động Hóa Oxit Nhôm Bền Vững (Quá Trình 7)",
    "name_en": "Al2O3 Passivation Shield Net (Process 7)",
    "cardType": "TRAP",
    "spellTrapSubtype": "CONTINUOUS_TRAP",
    "spellSpeed": 2,
    "rarity": "SUPER_RARE",
    "attribute": "TERRA",
    "manaCost": 2,
    "chemicalFormula": "Al2O3 Film",
    "effectCode": "TRAP_B22_AL2O3_PASSIVATION_SHIELD_NET_CONT_49",
    "effectText": "[Bẫy Liên Tục / Continuous Trap - Spell Speed 2]: Duy trì trên sân. Mỗi khi đối thủ tuyên bố đòn tấn công hoặc kích hoạt hiệu ứng: Giảm 200 ATK của quái thú đó và đối thủ nhận 200 LP sát thương ăn mòn tích lũy.",
    "scientificLore": "Quá trình ăn mòn kim loại và thụ động hóa Màng Thụ Động Hóa Oxit Nhôm Bền Vững (4Al + 3O₂ → 2Al₂O₃ (Impermeable Protective Oxide Film)) là bài toán thực tiễn quan trọng bậc nhất trong chuyên đề Hóa học 12 GDPT 2018.",
    "relatedEquation": "4Al + 3O₂ → 2Al₂O₃ (Impermeable Protective Oxide Film)",
    "iupacName": "Al2O3 Passivation Shield Net Field",
    "archetype": "STRONG_ACID_CORROSION",
    "structuredEffects": [
      {
        "effectId": "B22_EFF_49",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 200
            }
          }
        ],
        "description": "Bào mòn 200 ATK địch và gây 200 LP sát thương ăn mòn tích lũy."
      }
    ]
  },
  {
    "id": "card_b22_050_cont_trap_electrochemical_rust_pitting_corrosion_50",
    "name": "Quá Trình Rỉ Sét Ăn Mòn Điện Hóa (Quá Trình 7)",
    "name_en": "Electrochemical Rust Pitting Corrosion (Process 7)",
    "cardType": "TRAP",
    "spellTrapSubtype": "CONTINUOUS_TRAP",
    "spellSpeed": 2,
    "rarity": "SUPER_RARE",
    "attribute": "ACID_DARK",
    "manaCost": 3,
    "chemicalFormula": "Fe2O3·xH2O",
    "effectCode": "TRAP_B22_ELECTROCHEMICAL_RUST_PITTING_CORROSION_CONT_50",
    "effectText": "[Bẫy Liên Tục / Continuous Trap - Spell Speed 2]: Duy trì trên sân. Mỗi khi đối thủ tuyên bố đòn tấn công hoặc kích hoạt hiệu ứng: Giảm 200 ATK của quái thú đó và đối thủ nhận 200 LP sát thương ăn mòn tích lũy.",
    "scientificLore": "Quá trình ăn mòn kim loại và thụ động hóa Quá Trình Rỉ Sét Ăn Mòn Điện Hóa (4Fe + 3O₂ + 2xH₂O → 2Fe₂O₃·xH₂O (Rust Pitting)) là bài toán thực tiễn quan trọng bậc nhất trong chuyên đề Hóa học 12 GDPT 2018.",
    "relatedEquation": "4Fe + 3O₂ + 2xH₂O → 2Fe₂O₃·xH₂O (Rust Pitting)",
    "iupacName": "Electrochemical Rust Pitting Corrosion Field",
    "archetype": "SURFACE_ADSORPTION",
    "structuredEffects": [
      {
        "effectId": "B22_EFF_50",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 200
            }
          }
        ],
        "description": "Bào mòn 200 ATK địch và gây 200 LP sát thương ăn mòn tích lũy."
      }
    ]
  },
  {
    "id": "card_b22_051_cont_trap_acid_rain_chemical_leaching_51",
    "name": "Mưa Axit Bào Mòn Đá Vôi Lâu Dài (Quá Trình 7)",
    "name_en": "Acid Rain Chemical Leaching (Process 7)",
    "cardType": "TRAP",
    "spellTrapSubtype": "CONTINUOUS_TRAP",
    "spellSpeed": 2,
    "rarity": "ULTRA_RARE",
    "attribute": "ACID_DARK",
    "manaCost": 4,
    "chemicalFormula": "H2SO4+CaCO3",
    "effectCode": "TRAP_B22_ACID_RAIN_CHEMICAL_LEACHING_CONT_51",
    "effectText": "[Bẫy Liên Tục / Continuous Trap - Spell Speed 2]: Duy trì trên sân. Mỗi khi đối thủ tuyên bố đòn tấn công hoặc kích hoạt hiệu ứng: Giảm 200 ATK của quái thú đó và đối thủ nhận 200 LP sát thương ăn mòn tích lũy.",
    "scientificLore": "Quá trình ăn mòn kim loại và thụ động hóa Mưa Axit Bào Mòn Đá Vôi Lâu Dài (CaCO₃ + H₂SO₄ → CaSO₄ + H₂O + CO₂↑) là bài toán thực tiễn quan trọng bậc nhất trong chuyên đề Hóa học 12 GDPT 2018.",
    "relatedEquation": "CaCO₃ + H₂SO₄ → CaSO₄ + H₂O + CO₂↑",
    "iupacName": "Acid Rain Chemical Leaching Field",
    "archetype": "STRONG_ACID_CORROSION",
    "structuredEffects": [
      {
        "effectId": "B22_EFF_51",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 200
            }
          }
        ],
        "description": "Bào mòn 200 ATK địch và gây 200 LP sát thương ăn mòn tích lũy."
      }
    ]
  },
  {
    "id": "card_b22_052_cont_trap_electroless_nickel_plating_armor_52",
    "name": "Lớp Vỏ Mạ Niken Chống Oxy Hóa (Quá Trình 7)",
    "name_en": "Electroless Nickel Plating Armor (Process 7)",
    "cardType": "TRAP",
    "spellTrapSubtype": "CONTINUOUS_TRAP",
    "spellSpeed": 2,
    "rarity": "SECRET_RARE",
    "attribute": "ELECTRO",
    "manaCost": 5,
    "chemicalFormula": "Ni-P Alloy",
    "effectCode": "TRAP_B22_ELECTROLESS_NICKEL_PLATING_ARMOR_CONT_52",
    "effectText": "[Bẫy Liên Tục / Continuous Trap - Spell Speed 2]: Duy trì trên sân. Mỗi khi đối thủ tuyên bố đòn tấn công hoặc kích hoạt hiệu ứng: Giảm 200 ATK của quái thú đó và đối thủ nhận 200 LP sát thương ăn mòn tích lũy.",
    "scientificLore": "Quá trình ăn mòn kim loại và thụ động hóa Lớp Vỏ Mạ Niken Chống Oxy Hóa (Ni²⁺ + H₂PO₂⁻ + H₂O → Ni + H₂PO₃⁻ + 2H⁺) là bài toán thực tiễn quan trọng bậc nhất trong chuyên đề Hóa học 12 GDPT 2018.",
    "relatedEquation": "Ni²⁺ + H₂PO₂⁻ + H₂O → Ni + H₂PO₃⁻ + 2H⁺",
    "iupacName": "Electroless Nickel Plating Armor Field",
    "archetype": "SURFACE_ADSORPTION",
    "structuredEffects": [
      {
        "effectId": "B22_EFF_52",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 200
            }
          }
        ],
        "description": "Bào mòn 200 ATK địch và gây 200 LP sát thương ăn mòn tích lũy."
      }
    ]
  },
  {
    "id": "card_b22_053_cont_trap_zinc_phosphate_anti_corrosive_primer_53",
    "name": "Màng Sơn Chống Gỉ Chứa Kẽm Phốt Phát (Quá Trình 7)",
    "name_en": "Zinc Phosphate Anti-Corrosive Primer (Process 7)",
    "cardType": "TRAP",
    "spellTrapSubtype": "CONTINUOUS_TRAP",
    "spellSpeed": 2,
    "rarity": "COMMON",
    "attribute": "TERRA",
    "manaCost": 2,
    "chemicalFormula": "Zn3(PO4)2",
    "effectCode": "TRAP_B22_ZINC_PHOSPHATE_ANTI_CORROSIVE_PRIMER_CONT_53",
    "effectText": "[Bẫy Liên Tục / Continuous Trap - Spell Speed 2]: Duy trì trên sân. Mỗi khi đối thủ tuyên bố đòn tấn công hoặc kích hoạt hiệu ứng: Giảm 200 ATK của quái thú đó và đối thủ nhận 200 LP sát thương ăn mòn tích lũy.",
    "scientificLore": "Quá trình ăn mòn kim loại và thụ động hóa Màng Sơn Chống Gỉ Chứa Kẽm Phốt Phát (Metal Phosphatizing Crystalline Surface Passivation) là bài toán thực tiễn quan trọng bậc nhất trong chuyên đề Hóa học 12 GDPT 2018.",
    "relatedEquation": "Metal Phosphatizing Crystalline Surface Passivation",
    "iupacName": "Zinc Phosphate Anti-Corrosive Primer Field",
    "archetype": "STRONG_ACID_CORROSION",
    "structuredEffects": [
      {
        "effectId": "B22_EFF_53",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 200
            }
          }
        ],
        "description": "Bào mòn 200 ATK địch và gây 200 LP sát thương ăn mòn tích lũy."
      }
    ]
  },
  {
    "id": "card_b22_054_cont_trap_intergranular_corrosion_sensitization_54",
    "name": "Ăn Mòn Ranh Giới Hạt Thép Không Gỉ (Quá Trình 7)",
    "name_en": "Intergranular Corrosion Sensitization (Process 7)",
    "cardType": "TRAP",
    "spellTrapSubtype": "CONTINUOUS_TRAP",
    "spellSpeed": 2,
    "rarity": "COMMON",
    "attribute": "ACID_DARK",
    "manaCost": 3,
    "chemicalFormula": "Cr23C6 Depletion",
    "effectCode": "TRAP_B22_INTERGRANULAR_CORROSION_SENSITIZATION_CONT_54",
    "effectText": "[Bẫy Liên Tục / Continuous Trap - Spell Speed 2]: Duy trì trên sân. Mỗi khi đối thủ tuyên bố đòn tấn công hoặc kích hoạt hiệu ứng: Giảm 200 ATK của quái thú đó và đối thủ nhận 200 LP sát thương ăn mòn tích lũy.",
    "scientificLore": "Quá trình ăn mòn kim loại và thụ động hóa Ăn Mòn Ranh Giới Hạt Thép Không Gỉ (Chromium Carbide Precipitation at Grain Boundaries) là bài toán thực tiễn quan trọng bậc nhất trong chuyên đề Hóa học 12 GDPT 2018.",
    "relatedEquation": "Chromium Carbide Precipitation at Grain Boundaries",
    "iupacName": "Intergranular Corrosion Sensitization Field",
    "archetype": "SURFACE_ADSORPTION",
    "structuredEffects": [
      {
        "effectId": "B22_EFF_54",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 200
            }
          }
        ],
        "description": "Bào mòn 200 ATK địch và gây 200 LP sát thương ăn mòn tích lũy."
      }
    ]
  },
  {
    "id": "card_b22_055_cont_trap_hydrogen_sulfide_stress_cracking_55",
    "name": "Xâm Nhập Khí H2S Gây Giòn Kim Loại (Quá Trình 7)",
    "name_en": "Hydrogen Sulfide Stress Cracking (Process 7)",
    "cardType": "TRAP",
    "spellTrapSubtype": "CONTINUOUS_TRAP",
    "spellSpeed": 2,
    "rarity": "COMMON",
    "attribute": "ACID_DARK",
    "manaCost": 4,
    "chemicalFormula": "Fe + H2S",
    "effectCode": "TRAP_B22_HYDROGEN_SULFIDE_STRESS_CRACKING_CONT_55",
    "effectText": "[Bẫy Liên Tục / Continuous Trap - Spell Speed 2]: Duy trì trên sân. Mỗi khi đối thủ tuyên bố đòn tấn công hoặc kích hoạt hiệu ứng: Giảm 200 ATK của quái thú đó và đối thủ nhận 200 LP sát thương ăn mòn tích lũy.",
    "scientificLore": "Quá trình ăn mòn kim loại và thụ động hóa Xâm Nhập Khí H2S Gây Giòn Kim Loại (Fe + H₂S → FeS + 2H(absorbed atomic embrittlement)) là bài toán thực tiễn quan trọng bậc nhất trong chuyên đề Hóa học 12 GDPT 2018.",
    "relatedEquation": "Fe + H₂S → FeS + 2H(absorbed atomic embrittlement)",
    "iupacName": "Hydrogen Sulfide Stress Cracking Field",
    "archetype": "STRONG_ACID_CORROSION",
    "structuredEffects": [
      {
        "effectId": "B22_EFF_55",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 200
            }
          }
        ],
        "description": "Bào mòn 200 ATK địch và gây 200 LP sát thương ăn mòn tích lũy."
      }
    ]
  },
  {
    "id": "card_b22_056_cont_trap_cathodic_delamination_paint_strip_56",
    "name": "Bong Tróc Điện Hóa Vùng Cathode (Quá Trình 7)",
    "name_en": "Cathodic Delamination Paint Strip (Process 7)",
    "cardType": "TRAP",
    "spellTrapSubtype": "CONTINUOUS_TRAP",
    "spellSpeed": 2,
    "rarity": "RARE",
    "attribute": "ELECTRO",
    "manaCost": 5,
    "chemicalFormula": "2H2O + 2e-",
    "effectCode": "TRAP_B22_CATHODIC_DELAMINATION_PAINT_STRIP_CONT_56",
    "effectText": "[Bẫy Liên Tục / Continuous Trap - Spell Speed 2]: Duy trì trên sân. Mỗi khi đối thủ tuyên bố đòn tấn công hoặc kích hoạt hiệu ứng: Giảm 200 ATK của quái thú đó và đối thủ nhận 200 LP sát thương ăn mòn tích lũy.",
    "scientificLore": "Quá trình ăn mòn kim loại và thụ động hóa Bong Tróc Điện Hóa Vùng Cathode (2H₂O + 2e⁻ + O₂ → 4OH⁻ (High Local pH Delamination)) là bài toán thực tiễn quan trọng bậc nhất trong chuyên đề Hóa học 12 GDPT 2018.",
    "relatedEquation": "2H₂O + 2e⁻ + O₂ → 4OH⁻ (High Local pH Delamination)",
    "iupacName": "Cathodic Delamination Paint Strip Field",
    "archetype": "SURFACE_ADSORPTION",
    "structuredEffects": [
      {
        "effectId": "B22_EFF_56",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 200
            }
          }
        ],
        "description": "Bào mòn 200 ATK địch và gây 200 LP sát thương ăn mòn tích lũy."
      }
    ]
  },
  {
    "id": "card_b22_057_cont_trap_al2o3_passivation_shield_net_57",
    "name": "Màng Thụ Động Hóa Oxit Nhôm Bền Vững (Quá Trình 8)",
    "name_en": "Al2O3 Passivation Shield Net (Process 8)",
    "cardType": "TRAP",
    "spellTrapSubtype": "CONTINUOUS_TRAP",
    "spellSpeed": 2,
    "rarity": "RARE",
    "attribute": "TERRA",
    "manaCost": 2,
    "chemicalFormula": "Al2O3 Film",
    "effectCode": "TRAP_B22_AL2O3_PASSIVATION_SHIELD_NET_CONT_57",
    "effectText": "[Bẫy Liên Tục / Continuous Trap - Spell Speed 2]: Duy trì trên sân. Mỗi khi đối thủ tuyên bố đòn tấn công hoặc kích hoạt hiệu ứng: Giảm 200 ATK của quái thú đó và đối thủ nhận 200 LP sát thương ăn mòn tích lũy.",
    "scientificLore": "Quá trình ăn mòn kim loại và thụ động hóa Màng Thụ Động Hóa Oxit Nhôm Bền Vững (4Al + 3O₂ → 2Al₂O₃ (Impermeable Protective Oxide Film)) là bài toán thực tiễn quan trọng bậc nhất trong chuyên đề Hóa học 12 GDPT 2018.",
    "relatedEquation": "4Al + 3O₂ → 2Al₂O₃ (Impermeable Protective Oxide Film)",
    "iupacName": "Al2O3 Passivation Shield Net Field",
    "archetype": "STRONG_ACID_CORROSION",
    "structuredEffects": [
      {
        "effectId": "B22_EFF_57",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 200
            }
          }
        ],
        "description": "Bào mòn 200 ATK địch và gây 200 LP sát thương ăn mòn tích lũy."
      }
    ]
  },
  {
    "id": "card_b22_058_cont_trap_electrochemical_rust_pitting_corrosion_58",
    "name": "Quá Trình Rỉ Sét Ăn Mòn Điện Hóa (Quá Trình 8)",
    "name_en": "Electrochemical Rust Pitting Corrosion (Process 8)",
    "cardType": "TRAP",
    "spellTrapSubtype": "CONTINUOUS_TRAP",
    "spellSpeed": 2,
    "rarity": "SUPER_RARE",
    "attribute": "ACID_DARK",
    "manaCost": 3,
    "chemicalFormula": "Fe2O3·xH2O",
    "effectCode": "TRAP_B22_ELECTROCHEMICAL_RUST_PITTING_CORROSION_CONT_58",
    "effectText": "[Bẫy Liên Tục / Continuous Trap - Spell Speed 2]: Duy trì trên sân. Mỗi khi đối thủ tuyên bố đòn tấn công hoặc kích hoạt hiệu ứng: Giảm 200 ATK của quái thú đó và đối thủ nhận 200 LP sát thương ăn mòn tích lũy.",
    "scientificLore": "Quá trình ăn mòn kim loại và thụ động hóa Quá Trình Rỉ Sét Ăn Mòn Điện Hóa (4Fe + 3O₂ + 2xH₂O → 2Fe₂O₃·xH₂O (Rust Pitting)) là bài toán thực tiễn quan trọng bậc nhất trong chuyên đề Hóa học 12 GDPT 2018.",
    "relatedEquation": "4Fe + 3O₂ + 2xH₂O → 2Fe₂O₃·xH₂O (Rust Pitting)",
    "iupacName": "Electrochemical Rust Pitting Corrosion Field",
    "archetype": "SURFACE_ADSORPTION",
    "structuredEffects": [
      {
        "effectId": "B22_EFF_58",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 200
            }
          }
        ],
        "description": "Bào mòn 200 ATK địch và gây 200 LP sát thương ăn mòn tích lũy."
      }
    ]
  },
  {
    "id": "card_b22_059_cont_trap_acid_rain_chemical_leaching_59",
    "name": "Mưa Axit Bào Mòn Đá Vôi Lâu Dài (Quá Trình 8)",
    "name_en": "Acid Rain Chemical Leaching (Process 8)",
    "cardType": "TRAP",
    "spellTrapSubtype": "CONTINUOUS_TRAP",
    "spellSpeed": 2,
    "rarity": "SUPER_RARE",
    "attribute": "ACID_DARK",
    "manaCost": 4,
    "chemicalFormula": "H2SO4+CaCO3",
    "effectCode": "TRAP_B22_ACID_RAIN_CHEMICAL_LEACHING_CONT_59",
    "effectText": "[Bẫy Liên Tục / Continuous Trap - Spell Speed 2]: Duy trì trên sân. Mỗi khi đối thủ tuyên bố đòn tấn công hoặc kích hoạt hiệu ứng: Giảm 200 ATK của quái thú đó và đối thủ nhận 200 LP sát thương ăn mòn tích lũy.",
    "scientificLore": "Quá trình ăn mòn kim loại và thụ động hóa Mưa Axit Bào Mòn Đá Vôi Lâu Dài (CaCO₃ + H₂SO₄ → CaSO₄ + H₂O + CO₂↑) là bài toán thực tiễn quan trọng bậc nhất trong chuyên đề Hóa học 12 GDPT 2018.",
    "relatedEquation": "CaCO₃ + H₂SO₄ → CaSO₄ + H₂O + CO₂↑",
    "iupacName": "Acid Rain Chemical Leaching Field",
    "archetype": "STRONG_ACID_CORROSION",
    "structuredEffects": [
      {
        "effectId": "B22_EFF_59",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 200
            }
          }
        ],
        "description": "Bào mòn 200 ATK địch và gây 200 LP sát thương ăn mòn tích lũy."
      }
    ]
  },
  {
    "id": "card_b22_060_cont_trap_electroless_nickel_plating_armor_60",
    "name": "Lớp Vỏ Mạ Niken Chống Oxy Hóa (Quá Trình 8)",
    "name_en": "Electroless Nickel Plating Armor (Process 8)",
    "cardType": "TRAP",
    "spellTrapSubtype": "CONTINUOUS_TRAP",
    "spellSpeed": 2,
    "rarity": "ULTRA_RARE",
    "attribute": "ELECTRO",
    "manaCost": 5,
    "chemicalFormula": "Ni-P Alloy",
    "effectCode": "TRAP_B22_ELECTROLESS_NICKEL_PLATING_ARMOR_CONT_60",
    "effectText": "[Bẫy Liên Tục / Continuous Trap - Spell Speed 2]: Duy trì trên sân. Mỗi khi đối thủ tuyên bố đòn tấn công hoặc kích hoạt hiệu ứng: Giảm 200 ATK của quái thú đó và đối thủ nhận 200 LP sát thương ăn mòn tích lũy.",
    "scientificLore": "Quá trình ăn mòn kim loại và thụ động hóa Lớp Vỏ Mạ Niken Chống Oxy Hóa (Ni²⁺ + H₂PO₂⁻ + H₂O → Ni + H₂PO₃⁻ + 2H⁺) là bài toán thực tiễn quan trọng bậc nhất trong chuyên đề Hóa học 12 GDPT 2018.",
    "relatedEquation": "Ni²⁺ + H₂PO₂⁻ + H₂O → Ni + H₂PO₃⁻ + 2H⁺",
    "iupacName": "Electroless Nickel Plating Armor Field",
    "archetype": "SURFACE_ADSORPTION",
    "structuredEffects": [
      {
        "effectId": "B22_EFF_60",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 200
            }
          }
        ],
        "description": "Bào mòn 200 ATK địch và gây 200 LP sát thương ăn mòn tích lũy."
      }
    ]
  },
  {
    "id": "card_b22_061_cont_trap_zinc_phosphate_anti_corrosive_primer_61",
    "name": "Màng Sơn Chống Gỉ Chứa Kẽm Phốt Phát (Quá Trình 8)",
    "name_en": "Zinc Phosphate Anti-Corrosive Primer (Process 8)",
    "cardType": "TRAP",
    "spellTrapSubtype": "CONTINUOUS_TRAP",
    "spellSpeed": 2,
    "rarity": "SECRET_RARE",
    "attribute": "TERRA",
    "manaCost": 2,
    "chemicalFormula": "Zn3(PO4)2",
    "effectCode": "TRAP_B22_ZINC_PHOSPHATE_ANTI_CORROSIVE_PRIMER_CONT_61",
    "effectText": "[Bẫy Liên Tục / Continuous Trap - Spell Speed 2]: Duy trì trên sân. Mỗi khi đối thủ tuyên bố đòn tấn công hoặc kích hoạt hiệu ứng: Giảm 200 ATK của quái thú đó và đối thủ nhận 200 LP sát thương ăn mòn tích lũy.",
    "scientificLore": "Quá trình ăn mòn kim loại và thụ động hóa Màng Sơn Chống Gỉ Chứa Kẽm Phốt Phát (Metal Phosphatizing Crystalline Surface Passivation) là bài toán thực tiễn quan trọng bậc nhất trong chuyên đề Hóa học 12 GDPT 2018.",
    "relatedEquation": "Metal Phosphatizing Crystalline Surface Passivation",
    "iupacName": "Zinc Phosphate Anti-Corrosive Primer Field",
    "archetype": "STRONG_ACID_CORROSION",
    "structuredEffects": [
      {
        "effectId": "B22_EFF_61",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 200
            }
          }
        ],
        "description": "Bào mòn 200 ATK địch và gây 200 LP sát thương ăn mòn tích lũy."
      }
    ]
  },
  {
    "id": "card_b22_062_cont_trap_intergranular_corrosion_sensitization_62",
    "name": "Ăn Mòn Ranh Giới Hạt Thép Không Gỉ (Quá Trình 8)",
    "name_en": "Intergranular Corrosion Sensitization (Process 8)",
    "cardType": "TRAP",
    "spellTrapSubtype": "CONTINUOUS_TRAP",
    "spellSpeed": 2,
    "rarity": "COMMON",
    "attribute": "ACID_DARK",
    "manaCost": 3,
    "chemicalFormula": "Cr23C6 Depletion",
    "effectCode": "TRAP_B22_INTERGRANULAR_CORROSION_SENSITIZATION_CONT_62",
    "effectText": "[Bẫy Liên Tục / Continuous Trap - Spell Speed 2]: Duy trì trên sân. Mỗi khi đối thủ tuyên bố đòn tấn công hoặc kích hoạt hiệu ứng: Giảm 200 ATK của quái thú đó và đối thủ nhận 200 LP sát thương ăn mòn tích lũy.",
    "scientificLore": "Quá trình ăn mòn kim loại và thụ động hóa Ăn Mòn Ranh Giới Hạt Thép Không Gỉ (Chromium Carbide Precipitation at Grain Boundaries) là bài toán thực tiễn quan trọng bậc nhất trong chuyên đề Hóa học 12 GDPT 2018.",
    "relatedEquation": "Chromium Carbide Precipitation at Grain Boundaries",
    "iupacName": "Intergranular Corrosion Sensitization Field",
    "archetype": "SURFACE_ADSORPTION",
    "structuredEffects": [
      {
        "effectId": "B22_EFF_62",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 200
            }
          }
        ],
        "description": "Bào mòn 200 ATK địch và gây 200 LP sát thương ăn mòn tích lũy."
      }
    ]
  },
  {
    "id": "card_b22_063_cont_trap_hydrogen_sulfide_stress_cracking_63",
    "name": "Xâm Nhập Khí H2S Gây Giòn Kim Loại (Quá Trình 8)",
    "name_en": "Hydrogen Sulfide Stress Cracking (Process 8)",
    "cardType": "TRAP",
    "spellTrapSubtype": "CONTINUOUS_TRAP",
    "spellSpeed": 2,
    "rarity": "COMMON",
    "attribute": "ACID_DARK",
    "manaCost": 4,
    "chemicalFormula": "Fe + H2S",
    "effectCode": "TRAP_B22_HYDROGEN_SULFIDE_STRESS_CRACKING_CONT_63",
    "effectText": "[Bẫy Liên Tục / Continuous Trap - Spell Speed 2]: Duy trì trên sân. Mỗi khi đối thủ tuyên bố đòn tấn công hoặc kích hoạt hiệu ứng: Giảm 200 ATK của quái thú đó và đối thủ nhận 200 LP sát thương ăn mòn tích lũy.",
    "scientificLore": "Quá trình ăn mòn kim loại và thụ động hóa Xâm Nhập Khí H2S Gây Giòn Kim Loại (Fe + H₂S → FeS + 2H(absorbed atomic embrittlement)) là bài toán thực tiễn quan trọng bậc nhất trong chuyên đề Hóa học 12 GDPT 2018.",
    "relatedEquation": "Fe + H₂S → FeS + 2H(absorbed atomic embrittlement)",
    "iupacName": "Hydrogen Sulfide Stress Cracking Field",
    "archetype": "STRONG_ACID_CORROSION",
    "structuredEffects": [
      {
        "effectId": "B22_EFF_63",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 200
            }
          }
        ],
        "description": "Bào mòn 200 ATK địch và gây 200 LP sát thương ăn mòn tích lũy."
      }
    ]
  },
  {
    "id": "card_b22_064_cont_trap_cathodic_delamination_paint_strip_64",
    "name": "Bong Tróc Điện Hóa Vùng Cathode (Quá Trình 8)",
    "name_en": "Cathodic Delamination Paint Strip (Process 8)",
    "cardType": "TRAP",
    "spellTrapSubtype": "CONTINUOUS_TRAP",
    "spellSpeed": 2,
    "rarity": "COMMON",
    "attribute": "ELECTRO",
    "manaCost": 5,
    "chemicalFormula": "2H2O + 2e-",
    "effectCode": "TRAP_B22_CATHODIC_DELAMINATION_PAINT_STRIP_CONT_64",
    "effectText": "[Bẫy Liên Tục / Continuous Trap - Spell Speed 2]: Duy trì trên sân. Mỗi khi đối thủ tuyên bố đòn tấn công hoặc kích hoạt hiệu ứng: Giảm 200 ATK của quái thú đó và đối thủ nhận 200 LP sát thương ăn mòn tích lũy.",
    "scientificLore": "Quá trình ăn mòn kim loại và thụ động hóa Bong Tróc Điện Hóa Vùng Cathode (2H₂O + 2e⁻ + O₂ → 4OH⁻ (High Local pH Delamination)) là bài toán thực tiễn quan trọng bậc nhất trong chuyên đề Hóa học 12 GDPT 2018.",
    "relatedEquation": "2H₂O + 2e⁻ + O₂ → 4OH⁻ (High Local pH Delamination)",
    "iupacName": "Cathodic Delamination Paint Strip Field",
    "archetype": "SURFACE_ADSORPTION",
    "structuredEffects": [
      {
        "effectId": "B22_EFF_64",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 200
            }
          }
        ],
        "description": "Bào mòn 200 ATK địch và gây 200 LP sát thương ăn mòn tích lũy."
      }
    ]
  },
  {
    "id": "card_b22_065_cont_trap_al2o3_passivation_shield_net_65",
    "name": "Màng Thụ Động Hóa Oxit Nhôm Bền Vững (Quá Trình 9)",
    "name_en": "Al2O3 Passivation Shield Net (Process 9)",
    "cardType": "TRAP",
    "spellTrapSubtype": "CONTINUOUS_TRAP",
    "spellSpeed": 2,
    "rarity": "RARE",
    "attribute": "TERRA",
    "manaCost": 2,
    "chemicalFormula": "Al2O3 Film",
    "effectCode": "TRAP_B22_AL2O3_PASSIVATION_SHIELD_NET_CONT_65",
    "effectText": "[Bẫy Liên Tục / Continuous Trap - Spell Speed 2]: Duy trì trên sân. Mỗi khi đối thủ tuyên bố đòn tấn công hoặc kích hoạt hiệu ứng: Giảm 200 ATK của quái thú đó và đối thủ nhận 200 LP sát thương ăn mòn tích lũy.",
    "scientificLore": "Quá trình ăn mòn kim loại và thụ động hóa Màng Thụ Động Hóa Oxit Nhôm Bền Vững (4Al + 3O₂ → 2Al₂O₃ (Impermeable Protective Oxide Film)) là bài toán thực tiễn quan trọng bậc nhất trong chuyên đề Hóa học 12 GDPT 2018.",
    "relatedEquation": "4Al + 3O₂ → 2Al₂O₃ (Impermeable Protective Oxide Film)",
    "iupacName": "Al2O3 Passivation Shield Net Field",
    "archetype": "STRONG_ACID_CORROSION",
    "structuredEffects": [
      {
        "effectId": "B22_EFF_65",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 200
            }
          }
        ],
        "description": "Bào mòn 200 ATK địch và gây 200 LP sát thương ăn mòn tích lũy."
      }
    ]
  },
  {
    "id": "card_b22_066_cont_trap_electrochemical_rust_pitting_corrosion_66",
    "name": "Quá Trình Rỉ Sét Ăn Mòn Điện Hóa (Quá Trình 9)",
    "name_en": "Electrochemical Rust Pitting Corrosion (Process 9)",
    "cardType": "TRAP",
    "spellTrapSubtype": "CONTINUOUS_TRAP",
    "spellSpeed": 2,
    "rarity": "RARE",
    "attribute": "ACID_DARK",
    "manaCost": 3,
    "chemicalFormula": "Fe2O3·xH2O",
    "effectCode": "TRAP_B22_ELECTROCHEMICAL_RUST_PITTING_CORROSION_CONT_66",
    "effectText": "[Bẫy Liên Tục / Continuous Trap - Spell Speed 2]: Duy trì trên sân. Mỗi khi đối thủ tuyên bố đòn tấn công hoặc kích hoạt hiệu ứng: Giảm 200 ATK của quái thú đó và đối thủ nhận 200 LP sát thương ăn mòn tích lũy.",
    "scientificLore": "Quá trình ăn mòn kim loại và thụ động hóa Quá Trình Rỉ Sét Ăn Mòn Điện Hóa (4Fe + 3O₂ + 2xH₂O → 2Fe₂O₃·xH₂O (Rust Pitting)) là bài toán thực tiễn quan trọng bậc nhất trong chuyên đề Hóa học 12 GDPT 2018.",
    "relatedEquation": "4Fe + 3O₂ + 2xH₂O → 2Fe₂O₃·xH₂O (Rust Pitting)",
    "iupacName": "Electrochemical Rust Pitting Corrosion Field",
    "archetype": "SURFACE_ADSORPTION",
    "structuredEffects": [
      {
        "effectId": "B22_EFF_66",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 200
            }
          }
        ],
        "description": "Bào mòn 200 ATK địch và gây 200 LP sát thương ăn mòn tích lũy."
      }
    ]
  },
  {
    "id": "card_b22_067_cont_trap_acid_rain_chemical_leaching_67",
    "name": "Mưa Axit Bào Mòn Đá Vôi Lâu Dài (Quá Trình 9)",
    "name_en": "Acid Rain Chemical Leaching (Process 9)",
    "cardType": "TRAP",
    "spellTrapSubtype": "CONTINUOUS_TRAP",
    "spellSpeed": 2,
    "rarity": "SUPER_RARE",
    "attribute": "ACID_DARK",
    "manaCost": 4,
    "chemicalFormula": "H2SO4+CaCO3",
    "effectCode": "TRAP_B22_ACID_RAIN_CHEMICAL_LEACHING_CONT_67",
    "effectText": "[Bẫy Liên Tục / Continuous Trap - Spell Speed 2]: Duy trì trên sân. Mỗi khi đối thủ tuyên bố đòn tấn công hoặc kích hoạt hiệu ứng: Giảm 200 ATK của quái thú đó và đối thủ nhận 200 LP sát thương ăn mòn tích lũy.",
    "scientificLore": "Quá trình ăn mòn kim loại và thụ động hóa Mưa Axit Bào Mòn Đá Vôi Lâu Dài (CaCO₃ + H₂SO₄ → CaSO₄ + H₂O + CO₂↑) là bài toán thực tiễn quan trọng bậc nhất trong chuyên đề Hóa học 12 GDPT 2018.",
    "relatedEquation": "CaCO₃ + H₂SO₄ → CaSO₄ + H₂O + CO₂↑",
    "iupacName": "Acid Rain Chemical Leaching Field",
    "archetype": "STRONG_ACID_CORROSION",
    "structuredEffects": [
      {
        "effectId": "B22_EFF_67",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 200
            }
          }
        ],
        "description": "Bào mòn 200 ATK địch và gây 200 LP sát thương ăn mòn tích lũy."
      }
    ]
  },
  {
    "id": "card_b22_068_cont_trap_electroless_nickel_plating_armor_68",
    "name": "Lớp Vỏ Mạ Niken Chống Oxy Hóa (Quá Trình 9)",
    "name_en": "Electroless Nickel Plating Armor (Process 9)",
    "cardType": "TRAP",
    "spellTrapSubtype": "CONTINUOUS_TRAP",
    "spellSpeed": 2,
    "rarity": "SUPER_RARE",
    "attribute": "ELECTRO",
    "manaCost": 5,
    "chemicalFormula": "Ni-P Alloy",
    "effectCode": "TRAP_B22_ELECTROLESS_NICKEL_PLATING_ARMOR_CONT_68",
    "effectText": "[Bẫy Liên Tục / Continuous Trap - Spell Speed 2]: Duy trì trên sân. Mỗi khi đối thủ tuyên bố đòn tấn công hoặc kích hoạt hiệu ứng: Giảm 200 ATK của quái thú đó và đối thủ nhận 200 LP sát thương ăn mòn tích lũy.",
    "scientificLore": "Quá trình ăn mòn kim loại và thụ động hóa Lớp Vỏ Mạ Niken Chống Oxy Hóa (Ni²⁺ + H₂PO₂⁻ + H₂O → Ni + H₂PO₃⁻ + 2H⁺) là bài toán thực tiễn quan trọng bậc nhất trong chuyên đề Hóa học 12 GDPT 2018.",
    "relatedEquation": "Ni²⁺ + H₂PO₂⁻ + H₂O → Ni + H₂PO₃⁻ + 2H⁺",
    "iupacName": "Electroless Nickel Plating Armor Field",
    "archetype": "SURFACE_ADSORPTION",
    "structuredEffects": [
      {
        "effectId": "B22_EFF_68",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 200
            }
          }
        ],
        "description": "Bào mòn 200 ATK địch và gây 200 LP sát thương ăn mòn tích lũy."
      }
    ]
  },
  {
    "id": "card_b22_069_cont_trap_zinc_phosphate_anti_corrosive_primer_69",
    "name": "Màng Sơn Chống Gỉ Chứa Kẽm Phốt Phát (Quá Trình 9)",
    "name_en": "Zinc Phosphate Anti-Corrosive Primer (Process 9)",
    "cardType": "TRAP",
    "spellTrapSubtype": "CONTINUOUS_TRAP",
    "spellSpeed": 2,
    "rarity": "ULTRA_RARE",
    "attribute": "TERRA",
    "manaCost": 2,
    "chemicalFormula": "Zn3(PO4)2",
    "effectCode": "TRAP_B22_ZINC_PHOSPHATE_ANTI_CORROSIVE_PRIMER_CONT_69",
    "effectText": "[Bẫy Liên Tục / Continuous Trap - Spell Speed 2]: Duy trì trên sân. Mỗi khi đối thủ tuyên bố đòn tấn công hoặc kích hoạt hiệu ứng: Giảm 200 ATK của quái thú đó và đối thủ nhận 200 LP sát thương ăn mòn tích lũy.",
    "scientificLore": "Quá trình ăn mòn kim loại và thụ động hóa Màng Sơn Chống Gỉ Chứa Kẽm Phốt Phát (Metal Phosphatizing Crystalline Surface Passivation) là bài toán thực tiễn quan trọng bậc nhất trong chuyên đề Hóa học 12 GDPT 2018.",
    "relatedEquation": "Metal Phosphatizing Crystalline Surface Passivation",
    "iupacName": "Zinc Phosphate Anti-Corrosive Primer Field",
    "archetype": "STRONG_ACID_CORROSION",
    "structuredEffects": [
      {
        "effectId": "B22_EFF_69",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 200
            }
          }
        ],
        "description": "Bào mòn 200 ATK địch và gây 200 LP sát thương ăn mòn tích lũy."
      }
    ]
  },
  {
    "id": "card_b22_070_cont_trap_intergranular_corrosion_sensitization_70",
    "name": "Ăn Mòn Ranh Giới Hạt Thép Không Gỉ (Quá Trình 9)",
    "name_en": "Intergranular Corrosion Sensitization (Process 9)",
    "cardType": "TRAP",
    "spellTrapSubtype": "CONTINUOUS_TRAP",
    "spellSpeed": 2,
    "rarity": "SECRET_RARE",
    "attribute": "ACID_DARK",
    "manaCost": 3,
    "chemicalFormula": "Cr23C6 Depletion",
    "effectCode": "TRAP_B22_INTERGRANULAR_CORROSION_SENSITIZATION_CONT_70",
    "effectText": "[Bẫy Liên Tục / Continuous Trap - Spell Speed 2]: Duy trì trên sân. Mỗi khi đối thủ tuyên bố đòn tấn công hoặc kích hoạt hiệu ứng: Giảm 200 ATK của quái thú đó và đối thủ nhận 200 LP sát thương ăn mòn tích lũy.",
    "scientificLore": "Quá trình ăn mòn kim loại và thụ động hóa Ăn Mòn Ranh Giới Hạt Thép Không Gỉ (Chromium Carbide Precipitation at Grain Boundaries) là bài toán thực tiễn quan trọng bậc nhất trong chuyên đề Hóa học 12 GDPT 2018.",
    "relatedEquation": "Chromium Carbide Precipitation at Grain Boundaries",
    "iupacName": "Intergranular Corrosion Sensitization Field",
    "archetype": "SURFACE_ADSORPTION",
    "structuredEffects": [
      {
        "effectId": "B22_EFF_70",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 200
            }
          }
        ],
        "description": "Bào mòn 200 ATK địch và gây 200 LP sát thương ăn mòn tích lũy."
      }
    ]
  },
  {
    "id": "card_b22_071_cont_trap_hydrogen_sulfide_stress_cracking_71",
    "name": "Xâm Nhập Khí H2S Gây Giòn Kim Loại (Quá Trình 9)",
    "name_en": "Hydrogen Sulfide Stress Cracking (Process 9)",
    "cardType": "TRAP",
    "spellTrapSubtype": "CONTINUOUS_TRAP",
    "spellSpeed": 2,
    "rarity": "COMMON",
    "attribute": "ACID_DARK",
    "manaCost": 4,
    "chemicalFormula": "Fe + H2S",
    "effectCode": "TRAP_B22_HYDROGEN_SULFIDE_STRESS_CRACKING_CONT_71",
    "effectText": "[Bẫy Liên Tục / Continuous Trap - Spell Speed 2]: Duy trì trên sân. Mỗi khi đối thủ tuyên bố đòn tấn công hoặc kích hoạt hiệu ứng: Giảm 200 ATK của quái thú đó và đối thủ nhận 200 LP sát thương ăn mòn tích lũy.",
    "scientificLore": "Quá trình ăn mòn kim loại và thụ động hóa Xâm Nhập Khí H2S Gây Giòn Kim Loại (Fe + H₂S → FeS + 2H(absorbed atomic embrittlement)) là bài toán thực tiễn quan trọng bậc nhất trong chuyên đề Hóa học 12 GDPT 2018.",
    "relatedEquation": "Fe + H₂S → FeS + 2H(absorbed atomic embrittlement)",
    "iupacName": "Hydrogen Sulfide Stress Cracking Field",
    "archetype": "STRONG_ACID_CORROSION",
    "structuredEffects": [
      {
        "effectId": "B22_EFF_71",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 200
            }
          }
        ],
        "description": "Bào mòn 200 ATK địch và gây 200 LP sát thương ăn mòn tích lũy."
      }
    ]
  },
  {
    "id": "card_b22_072_cont_trap_cathodic_delamination_paint_strip_72",
    "name": "Bong Tróc Điện Hóa Vùng Cathode (Quá Trình 9)",
    "name_en": "Cathodic Delamination Paint Strip (Process 9)",
    "cardType": "TRAP",
    "spellTrapSubtype": "CONTINUOUS_TRAP",
    "spellSpeed": 2,
    "rarity": "COMMON",
    "attribute": "ELECTRO",
    "manaCost": 5,
    "chemicalFormula": "2H2O + 2e-",
    "effectCode": "TRAP_B22_CATHODIC_DELAMINATION_PAINT_STRIP_CONT_72",
    "effectText": "[Bẫy Liên Tục / Continuous Trap - Spell Speed 2]: Duy trì trên sân. Mỗi khi đối thủ tuyên bố đòn tấn công hoặc kích hoạt hiệu ứng: Giảm 200 ATK của quái thú đó và đối thủ nhận 200 LP sát thương ăn mòn tích lũy.",
    "scientificLore": "Quá trình ăn mòn kim loại và thụ động hóa Bong Tróc Điện Hóa Vùng Cathode (2H₂O + 2e⁻ + O₂ → 4OH⁻ (High Local pH Delamination)) là bài toán thực tiễn quan trọng bậc nhất trong chuyên đề Hóa học 12 GDPT 2018.",
    "relatedEquation": "2H₂O + 2e⁻ + O₂ → 4OH⁻ (High Local pH Delamination)",
    "iupacName": "Cathodic Delamination Paint Strip Field",
    "archetype": "SURFACE_ADSORPTION",
    "structuredEffects": [
      {
        "effectId": "B22_EFF_72",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 200
            }
          }
        ],
        "description": "Bào mòn 200 ATK địch và gây 200 LP sát thương ăn mòn tích lũy."
      }
    ]
  },
  {
    "id": "card_b22_073_cont_trap_al2o3_passivation_shield_net_73",
    "name": "Màng Thụ Động Hóa Oxit Nhôm Bền Vững (Quá Trình 10)",
    "name_en": "Al2O3 Passivation Shield Net (Process 10)",
    "cardType": "TRAP",
    "spellTrapSubtype": "CONTINUOUS_TRAP",
    "spellSpeed": 2,
    "rarity": "COMMON",
    "attribute": "TERRA",
    "manaCost": 2,
    "chemicalFormula": "Al2O3 Film",
    "effectCode": "TRAP_B22_AL2O3_PASSIVATION_SHIELD_NET_CONT_73",
    "effectText": "[Bẫy Liên Tục / Continuous Trap - Spell Speed 2]: Duy trì trên sân. Mỗi khi đối thủ tuyên bố đòn tấn công hoặc kích hoạt hiệu ứng: Giảm 200 ATK của quái thú đó và đối thủ nhận 200 LP sát thương ăn mòn tích lũy.",
    "scientificLore": "Quá trình ăn mòn kim loại và thụ động hóa Màng Thụ Động Hóa Oxit Nhôm Bền Vững (4Al + 3O₂ → 2Al₂O₃ (Impermeable Protective Oxide Film)) là bài toán thực tiễn quan trọng bậc nhất trong chuyên đề Hóa học 12 GDPT 2018.",
    "relatedEquation": "4Al + 3O₂ → 2Al₂O₃ (Impermeable Protective Oxide Film)",
    "iupacName": "Al2O3 Passivation Shield Net Field",
    "archetype": "STRONG_ACID_CORROSION",
    "structuredEffects": [
      {
        "effectId": "B22_EFF_73",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 200
            }
          }
        ],
        "description": "Bào mòn 200 ATK địch và gây 200 LP sát thương ăn mòn tích lũy."
      }
    ]
  },
  {
    "id": "card_b22_074_cont_trap_electrochemical_rust_pitting_corrosion_74",
    "name": "Quá Trình Rỉ Sét Ăn Mòn Điện Hóa (Quá Trình 10)",
    "name_en": "Electrochemical Rust Pitting Corrosion (Process 10)",
    "cardType": "TRAP",
    "spellTrapSubtype": "CONTINUOUS_TRAP",
    "spellSpeed": 2,
    "rarity": "RARE",
    "attribute": "ACID_DARK",
    "manaCost": 3,
    "chemicalFormula": "Fe2O3·xH2O",
    "effectCode": "TRAP_B22_ELECTROCHEMICAL_RUST_PITTING_CORROSION_CONT_74",
    "effectText": "[Bẫy Liên Tục / Continuous Trap - Spell Speed 2]: Duy trì trên sân. Mỗi khi đối thủ tuyên bố đòn tấn công hoặc kích hoạt hiệu ứng: Giảm 200 ATK của quái thú đó và đối thủ nhận 200 LP sát thương ăn mòn tích lũy.",
    "scientificLore": "Quá trình ăn mòn kim loại và thụ động hóa Quá Trình Rỉ Sét Ăn Mòn Điện Hóa (4Fe + 3O₂ + 2xH₂O → 2Fe₂O₃·xH₂O (Rust Pitting)) là bài toán thực tiễn quan trọng bậc nhất trong chuyên đề Hóa học 12 GDPT 2018.",
    "relatedEquation": "4Fe + 3O₂ + 2xH₂O → 2Fe₂O₃·xH₂O (Rust Pitting)",
    "iupacName": "Electrochemical Rust Pitting Corrosion Field",
    "archetype": "SURFACE_ADSORPTION",
    "structuredEffects": [
      {
        "effectId": "B22_EFF_74",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 200
            }
          }
        ],
        "description": "Bào mòn 200 ATK địch và gây 200 LP sát thương ăn mòn tích lũy."
      }
    ]
  },
  {
    "id": "card_b22_075_cont_trap_acid_rain_chemical_leaching_75",
    "name": "Mưa Axit Bào Mòn Đá Vôi Lâu Dài (Quá Trình 10)",
    "name_en": "Acid Rain Chemical Leaching (Process 10)",
    "cardType": "TRAP",
    "spellTrapSubtype": "CONTINUOUS_TRAP",
    "spellSpeed": 2,
    "rarity": "RARE",
    "attribute": "ACID_DARK",
    "manaCost": 4,
    "chemicalFormula": "H2SO4+CaCO3",
    "effectCode": "TRAP_B22_ACID_RAIN_CHEMICAL_LEACHING_CONT_75",
    "effectText": "[Bẫy Liên Tục / Continuous Trap - Spell Speed 2]: Duy trì trên sân. Mỗi khi đối thủ tuyên bố đòn tấn công hoặc kích hoạt hiệu ứng: Giảm 200 ATK của quái thú đó và đối thủ nhận 200 LP sát thương ăn mòn tích lũy.",
    "scientificLore": "Quá trình ăn mòn kim loại và thụ động hóa Mưa Axit Bào Mòn Đá Vôi Lâu Dài (CaCO₃ + H₂SO₄ → CaSO₄ + H₂O + CO₂↑) là bài toán thực tiễn quan trọng bậc nhất trong chuyên đề Hóa học 12 GDPT 2018.",
    "relatedEquation": "CaCO₃ + H₂SO₄ → CaSO₄ + H₂O + CO₂↑",
    "iupacName": "Acid Rain Chemical Leaching Field",
    "archetype": "STRONG_ACID_CORROSION",
    "structuredEffects": [
      {
        "effectId": "B22_EFF_75",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 200
            }
          }
        ],
        "description": "Bào mòn 200 ATK địch và gây 200 LP sát thương ăn mòn tích lũy."
      }
    ]
  },
  {
    "id": "card_b22_076_cont_trap_electroless_nickel_plating_armor_76",
    "name": "Lớp Vỏ Mạ Niken Chống Oxy Hóa (Quá Trình 10)",
    "name_en": "Electroless Nickel Plating Armor (Process 10)",
    "cardType": "TRAP",
    "spellTrapSubtype": "CONTINUOUS_TRAP",
    "spellSpeed": 2,
    "rarity": "SUPER_RARE",
    "attribute": "ELECTRO",
    "manaCost": 5,
    "chemicalFormula": "Ni-P Alloy",
    "effectCode": "TRAP_B22_ELECTROLESS_NICKEL_PLATING_ARMOR_CONT_76",
    "effectText": "[Bẫy Liên Tục / Continuous Trap - Spell Speed 2]: Duy trì trên sân. Mỗi khi đối thủ tuyên bố đòn tấn công hoặc kích hoạt hiệu ứng: Giảm 200 ATK của quái thú đó và đối thủ nhận 200 LP sát thương ăn mòn tích lũy.",
    "scientificLore": "Quá trình ăn mòn kim loại và thụ động hóa Lớp Vỏ Mạ Niken Chống Oxy Hóa (Ni²⁺ + H₂PO₂⁻ + H₂O → Ni + H₂PO₃⁻ + 2H⁺) là bài toán thực tiễn quan trọng bậc nhất trong chuyên đề Hóa học 12 GDPT 2018.",
    "relatedEquation": "Ni²⁺ + H₂PO₂⁻ + H₂O → Ni + H₂PO₃⁻ + 2H⁺",
    "iupacName": "Electroless Nickel Plating Armor Field",
    "archetype": "SURFACE_ADSORPTION",
    "structuredEffects": [
      {
        "effectId": "B22_EFF_76",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 200
            }
          }
        ],
        "description": "Bào mòn 200 ATK địch và gây 200 LP sát thương ăn mòn tích lũy."
      }
    ]
  },
  {
    "id": "card_b22_077_cont_trap_zinc_phosphate_anti_corrosive_primer_77",
    "name": "Màng Sơn Chống Gỉ Chứa Kẽm Phốt Phát (Quá Trình 10)",
    "name_en": "Zinc Phosphate Anti-Corrosive Primer (Process 10)",
    "cardType": "TRAP",
    "spellTrapSubtype": "CONTINUOUS_TRAP",
    "spellSpeed": 2,
    "rarity": "SUPER_RARE",
    "attribute": "TERRA",
    "manaCost": 2,
    "chemicalFormula": "Zn3(PO4)2",
    "effectCode": "TRAP_B22_ZINC_PHOSPHATE_ANTI_CORROSIVE_PRIMER_CONT_77",
    "effectText": "[Bẫy Liên Tục / Continuous Trap - Spell Speed 2]: Duy trì trên sân. Mỗi khi đối thủ tuyên bố đòn tấn công hoặc kích hoạt hiệu ứng: Giảm 200 ATK của quái thú đó và đối thủ nhận 200 LP sát thương ăn mòn tích lũy.",
    "scientificLore": "Quá trình ăn mòn kim loại và thụ động hóa Màng Sơn Chống Gỉ Chứa Kẽm Phốt Phát (Metal Phosphatizing Crystalline Surface Passivation) là bài toán thực tiễn quan trọng bậc nhất trong chuyên đề Hóa học 12 GDPT 2018.",
    "relatedEquation": "Metal Phosphatizing Crystalline Surface Passivation",
    "iupacName": "Zinc Phosphate Anti-Corrosive Primer Field",
    "archetype": "STRONG_ACID_CORROSION",
    "structuredEffects": [
      {
        "effectId": "B22_EFF_77",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 200
            }
          }
        ],
        "description": "Bào mòn 200 ATK địch và gây 200 LP sát thương ăn mòn tích lũy."
      }
    ]
  },
  {
    "id": "card_b22_078_cont_trap_intergranular_corrosion_sensitization_78",
    "name": "Ăn Mòn Ranh Giới Hạt Thép Không Gỉ (Quá Trình 10)",
    "name_en": "Intergranular Corrosion Sensitization (Process 10)",
    "cardType": "TRAP",
    "spellTrapSubtype": "CONTINUOUS_TRAP",
    "spellSpeed": 2,
    "rarity": "ULTRA_RARE",
    "attribute": "ACID_DARK",
    "manaCost": 3,
    "chemicalFormula": "Cr23C6 Depletion",
    "effectCode": "TRAP_B22_INTERGRANULAR_CORROSION_SENSITIZATION_CONT_78",
    "effectText": "[Bẫy Liên Tục / Continuous Trap - Spell Speed 2]: Duy trì trên sân. Mỗi khi đối thủ tuyên bố đòn tấn công hoặc kích hoạt hiệu ứng: Giảm 200 ATK của quái thú đó và đối thủ nhận 200 LP sát thương ăn mòn tích lũy.",
    "scientificLore": "Quá trình ăn mòn kim loại và thụ động hóa Ăn Mòn Ranh Giới Hạt Thép Không Gỉ (Chromium Carbide Precipitation at Grain Boundaries) là bài toán thực tiễn quan trọng bậc nhất trong chuyên đề Hóa học 12 GDPT 2018.",
    "relatedEquation": "Chromium Carbide Precipitation at Grain Boundaries",
    "iupacName": "Intergranular Corrosion Sensitization Field",
    "archetype": "SURFACE_ADSORPTION",
    "structuredEffects": [
      {
        "effectId": "B22_EFF_78",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 200
            }
          }
        ],
        "description": "Bào mòn 200 ATK địch và gây 200 LP sát thương ăn mòn tích lũy."
      }
    ]
  },
  {
    "id": "card_b22_079_cont_trap_hydrogen_sulfide_stress_cracking_79",
    "name": "Xâm Nhập Khí H2S Gây Giòn Kim Loại (Quá Trình 10)",
    "name_en": "Hydrogen Sulfide Stress Cracking (Process 10)",
    "cardType": "TRAP",
    "spellTrapSubtype": "CONTINUOUS_TRAP",
    "spellSpeed": 2,
    "rarity": "SECRET_RARE",
    "attribute": "ACID_DARK",
    "manaCost": 4,
    "chemicalFormula": "Fe + H2S",
    "effectCode": "TRAP_B22_HYDROGEN_SULFIDE_STRESS_CRACKING_CONT_79",
    "effectText": "[Bẫy Liên Tục / Continuous Trap - Spell Speed 2]: Duy trì trên sân. Mỗi khi đối thủ tuyên bố đòn tấn công hoặc kích hoạt hiệu ứng: Giảm 200 ATK của quái thú đó và đối thủ nhận 200 LP sát thương ăn mòn tích lũy.",
    "scientificLore": "Quá trình ăn mòn kim loại và thụ động hóa Xâm Nhập Khí H2S Gây Giòn Kim Loại (Fe + H₂S → FeS + 2H(absorbed atomic embrittlement)) là bài toán thực tiễn quan trọng bậc nhất trong chuyên đề Hóa học 12 GDPT 2018.",
    "relatedEquation": "Fe + H₂S → FeS + 2H(absorbed atomic embrittlement)",
    "iupacName": "Hydrogen Sulfide Stress Cracking Field",
    "archetype": "STRONG_ACID_CORROSION",
    "structuredEffects": [
      {
        "effectId": "B22_EFF_79",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 200
            }
          }
        ],
        "description": "Bào mòn 200 ATK địch và gây 200 LP sát thương ăn mòn tích lũy."
      }
    ]
  },
  {
    "id": "card_b22_080_cont_trap_cathodic_delamination_paint_strip_80",
    "name": "Bong Tróc Điện Hóa Vùng Cathode (Quá Trình 10)",
    "name_en": "Cathodic Delamination Paint Strip (Process 10)",
    "cardType": "TRAP",
    "spellTrapSubtype": "CONTINUOUS_TRAP",
    "spellSpeed": 2,
    "rarity": "COMMON",
    "attribute": "ELECTRO",
    "manaCost": 5,
    "chemicalFormula": "2H2O + 2e-",
    "effectCode": "TRAP_B22_CATHODIC_DELAMINATION_PAINT_STRIP_CONT_80",
    "effectText": "[Bẫy Liên Tục / Continuous Trap - Spell Speed 2]: Duy trì trên sân. Mỗi khi đối thủ tuyên bố đòn tấn công hoặc kích hoạt hiệu ứng: Giảm 200 ATK của quái thú đó và đối thủ nhận 200 LP sát thương ăn mòn tích lũy.",
    "scientificLore": "Quá trình ăn mòn kim loại và thụ động hóa Bong Tróc Điện Hóa Vùng Cathode (2H₂O + 2e⁻ + O₂ → 4OH⁻ (High Local pH Delamination)) là bài toán thực tiễn quan trọng bậc nhất trong chuyên đề Hóa học 12 GDPT 2018.",
    "relatedEquation": "2H₂O + 2e⁻ + O₂ → 4OH⁻ (High Local pH Delamination)",
    "iupacName": "Cathodic Delamination Paint Strip Field",
    "archetype": "SURFACE_ADSORPTION",
    "structuredEffects": [
      {
        "effectId": "B22_EFF_80",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 200
            }
          }
        ],
        "description": "Bào mòn 200 ATK địch và gây 200 LP sát thương ăn mòn tích lũy."
      }
    ]
  },
  {
    "id": "card_b22_081_cont_trap_al2o3_passivation_shield_net_81",
    "name": "Màng Thụ Động Hóa Oxit Nhôm Bền Vững (Quá Trình 11)",
    "name_en": "Al2O3 Passivation Shield Net (Process 11)",
    "cardType": "TRAP",
    "spellTrapSubtype": "CONTINUOUS_TRAP",
    "spellSpeed": 2,
    "rarity": "COMMON",
    "attribute": "TERRA",
    "manaCost": 2,
    "chemicalFormula": "Al2O3 Film",
    "effectCode": "TRAP_B22_AL2O3_PASSIVATION_SHIELD_NET_CONT_81",
    "effectText": "[Bẫy Liên Tục / Continuous Trap - Spell Speed 2]: Duy trì trên sân. Mỗi khi đối thủ tuyên bố đòn tấn công hoặc kích hoạt hiệu ứng: Giảm 200 ATK của quái thú đó và đối thủ nhận 200 LP sát thương ăn mòn tích lũy.",
    "scientificLore": "Quá trình ăn mòn kim loại và thụ động hóa Màng Thụ Động Hóa Oxit Nhôm Bền Vững (4Al + 3O₂ → 2Al₂O₃ (Impermeable Protective Oxide Film)) là bài toán thực tiễn quan trọng bậc nhất trong chuyên đề Hóa học 12 GDPT 2018.",
    "relatedEquation": "4Al + 3O₂ → 2Al₂O₃ (Impermeable Protective Oxide Film)",
    "iupacName": "Al2O3 Passivation Shield Net Field",
    "archetype": "STRONG_ACID_CORROSION",
    "structuredEffects": [
      {
        "effectId": "B22_EFF_81",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 200
            }
          }
        ],
        "description": "Bào mòn 200 ATK địch và gây 200 LP sát thương ăn mòn tích lũy."
      }
    ]
  },
  {
    "id": "card_b22_082_cont_trap_electrochemical_rust_pitting_corrosion_82",
    "name": "Quá Trình Rỉ Sét Ăn Mòn Điện Hóa (Quá Trình 11)",
    "name_en": "Electrochemical Rust Pitting Corrosion (Process 11)",
    "cardType": "TRAP",
    "spellTrapSubtype": "CONTINUOUS_TRAP",
    "spellSpeed": 2,
    "rarity": "COMMON",
    "attribute": "ACID_DARK",
    "manaCost": 3,
    "chemicalFormula": "Fe2O3·xH2O",
    "effectCode": "TRAP_B22_ELECTROCHEMICAL_RUST_PITTING_CORROSION_CONT_82",
    "effectText": "[Bẫy Liên Tục / Continuous Trap - Spell Speed 2]: Duy trì trên sân. Mỗi khi đối thủ tuyên bố đòn tấn công hoặc kích hoạt hiệu ứng: Giảm 200 ATK của quái thú đó và đối thủ nhận 200 LP sát thương ăn mòn tích lũy.",
    "scientificLore": "Quá trình ăn mòn kim loại và thụ động hóa Quá Trình Rỉ Sét Ăn Mòn Điện Hóa (4Fe + 3O₂ + 2xH₂O → 2Fe₂O₃·xH₂O (Rust Pitting)) là bài toán thực tiễn quan trọng bậc nhất trong chuyên đề Hóa học 12 GDPT 2018.",
    "relatedEquation": "4Fe + 3O₂ + 2xH₂O → 2Fe₂O₃·xH₂O (Rust Pitting)",
    "iupacName": "Electrochemical Rust Pitting Corrosion Field",
    "archetype": "SURFACE_ADSORPTION",
    "structuredEffects": [
      {
        "effectId": "B22_EFF_82",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 200
            }
          }
        ],
        "description": "Bào mòn 200 ATK địch và gây 200 LP sát thương ăn mòn tích lũy."
      }
    ]
  },
  {
    "id": "card_b22_083_cont_trap_acid_rain_chemical_leaching_83",
    "name": "Mưa Axit Bào Mòn Đá Vôi Lâu Dài (Quá Trình 11)",
    "name_en": "Acid Rain Chemical Leaching (Process 11)",
    "cardType": "TRAP",
    "spellTrapSubtype": "CONTINUOUS_TRAP",
    "spellSpeed": 2,
    "rarity": "RARE",
    "attribute": "ACID_DARK",
    "manaCost": 4,
    "chemicalFormula": "H2SO4+CaCO3",
    "effectCode": "TRAP_B22_ACID_RAIN_CHEMICAL_LEACHING_CONT_83",
    "effectText": "[Bẫy Liên Tục / Continuous Trap - Spell Speed 2]: Duy trì trên sân. Mỗi khi đối thủ tuyên bố đòn tấn công hoặc kích hoạt hiệu ứng: Giảm 200 ATK của quái thú đó và đối thủ nhận 200 LP sát thương ăn mòn tích lũy.",
    "scientificLore": "Quá trình ăn mòn kim loại và thụ động hóa Mưa Axit Bào Mòn Đá Vôi Lâu Dài (CaCO₃ + H₂SO₄ → CaSO₄ + H₂O + CO₂↑) là bài toán thực tiễn quan trọng bậc nhất trong chuyên đề Hóa học 12 GDPT 2018.",
    "relatedEquation": "CaCO₃ + H₂SO₄ → CaSO₄ + H₂O + CO₂↑",
    "iupacName": "Acid Rain Chemical Leaching Field",
    "archetype": "STRONG_ACID_CORROSION",
    "structuredEffects": [
      {
        "effectId": "B22_EFF_83",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 200
            }
          }
        ],
        "description": "Bào mòn 200 ATK địch và gây 200 LP sát thương ăn mòn tích lũy."
      }
    ]
  },
  {
    "id": "card_b22_084_cont_trap_electroless_nickel_plating_armor_84",
    "name": "Lớp Vỏ Mạ Niken Chống Oxy Hóa (Quá Trình 11)",
    "name_en": "Electroless Nickel Plating Armor (Process 11)",
    "cardType": "TRAP",
    "spellTrapSubtype": "CONTINUOUS_TRAP",
    "spellSpeed": 2,
    "rarity": "RARE",
    "attribute": "ELECTRO",
    "manaCost": 5,
    "chemicalFormula": "Ni-P Alloy",
    "effectCode": "TRAP_B22_ELECTROLESS_NICKEL_PLATING_ARMOR_CONT_84",
    "effectText": "[Bẫy Liên Tục / Continuous Trap - Spell Speed 2]: Duy trì trên sân. Mỗi khi đối thủ tuyên bố đòn tấn công hoặc kích hoạt hiệu ứng: Giảm 200 ATK của quái thú đó và đối thủ nhận 200 LP sát thương ăn mòn tích lũy.",
    "scientificLore": "Quá trình ăn mòn kim loại và thụ động hóa Lớp Vỏ Mạ Niken Chống Oxy Hóa (Ni²⁺ + H₂PO₂⁻ + H₂O → Ni + H₂PO₃⁻ + 2H⁺) là bài toán thực tiễn quan trọng bậc nhất trong chuyên đề Hóa học 12 GDPT 2018.",
    "relatedEquation": "Ni²⁺ + H₂PO₂⁻ + H₂O → Ni + H₂PO₃⁻ + 2H⁺",
    "iupacName": "Electroless Nickel Plating Armor Field",
    "archetype": "SURFACE_ADSORPTION",
    "structuredEffects": [
      {
        "effectId": "B22_EFF_84",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 200
            }
          }
        ],
        "description": "Bào mòn 200 ATK địch và gây 200 LP sát thương ăn mòn tích lũy."
      }
    ]
  },
  {
    "id": "card_b22_085_cont_trap_zinc_phosphate_anti_corrosive_primer_85",
    "name": "Màng Sơn Chống Gỉ Chứa Kẽm Phốt Phát (Quá Trình 11)",
    "name_en": "Zinc Phosphate Anti-Corrosive Primer (Process 11)",
    "cardType": "TRAP",
    "spellTrapSubtype": "CONTINUOUS_TRAP",
    "spellSpeed": 2,
    "rarity": "SUPER_RARE",
    "attribute": "TERRA",
    "manaCost": 2,
    "chemicalFormula": "Zn3(PO4)2",
    "effectCode": "TRAP_B22_ZINC_PHOSPHATE_ANTI_CORROSIVE_PRIMER_CONT_85",
    "effectText": "[Bẫy Liên Tục / Continuous Trap - Spell Speed 2]: Duy trì trên sân. Mỗi khi đối thủ tuyên bố đòn tấn công hoặc kích hoạt hiệu ứng: Giảm 200 ATK của quái thú đó và đối thủ nhận 200 LP sát thương ăn mòn tích lũy.",
    "scientificLore": "Quá trình ăn mòn kim loại và thụ động hóa Màng Sơn Chống Gỉ Chứa Kẽm Phốt Phát (Metal Phosphatizing Crystalline Surface Passivation) là bài toán thực tiễn quan trọng bậc nhất trong chuyên đề Hóa học 12 GDPT 2018.",
    "relatedEquation": "Metal Phosphatizing Crystalline Surface Passivation",
    "iupacName": "Zinc Phosphate Anti-Corrosive Primer Field",
    "archetype": "STRONG_ACID_CORROSION",
    "structuredEffects": [
      {
        "effectId": "B22_EFF_85",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 200
            }
          }
        ],
        "description": "Bào mòn 200 ATK địch và gây 200 LP sát thương ăn mòn tích lũy."
      }
    ]
  },
  {
    "id": "card_b22_086_cont_trap_intergranular_corrosion_sensitization_86",
    "name": "Ăn Mòn Ranh Giới Hạt Thép Không Gỉ (Quá Trình 11)",
    "name_en": "Intergranular Corrosion Sensitization (Process 11)",
    "cardType": "TRAP",
    "spellTrapSubtype": "CONTINUOUS_TRAP",
    "spellSpeed": 2,
    "rarity": "SUPER_RARE",
    "attribute": "ACID_DARK",
    "manaCost": 3,
    "chemicalFormula": "Cr23C6 Depletion",
    "effectCode": "TRAP_B22_INTERGRANULAR_CORROSION_SENSITIZATION_CONT_86",
    "effectText": "[Bẫy Liên Tục / Continuous Trap - Spell Speed 2]: Duy trì trên sân. Mỗi khi đối thủ tuyên bố đòn tấn công hoặc kích hoạt hiệu ứng: Giảm 200 ATK của quái thú đó và đối thủ nhận 200 LP sát thương ăn mòn tích lũy.",
    "scientificLore": "Quá trình ăn mòn kim loại và thụ động hóa Ăn Mòn Ranh Giới Hạt Thép Không Gỉ (Chromium Carbide Precipitation at Grain Boundaries) là bài toán thực tiễn quan trọng bậc nhất trong chuyên đề Hóa học 12 GDPT 2018.",
    "relatedEquation": "Chromium Carbide Precipitation at Grain Boundaries",
    "iupacName": "Intergranular Corrosion Sensitization Field",
    "archetype": "SURFACE_ADSORPTION",
    "structuredEffects": [
      {
        "effectId": "B22_EFF_86",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 200
            }
          }
        ],
        "description": "Bào mòn 200 ATK địch và gây 200 LP sát thương ăn mòn tích lũy."
      }
    ]
  },
  {
    "id": "card_b22_087_cont_trap_hydrogen_sulfide_stress_cracking_87",
    "name": "Xâm Nhập Khí H2S Gây Giòn Kim Loại (Quá Trình 11)",
    "name_en": "Hydrogen Sulfide Stress Cracking (Process 11)",
    "cardType": "TRAP",
    "spellTrapSubtype": "CONTINUOUS_TRAP",
    "spellSpeed": 2,
    "rarity": "ULTRA_RARE",
    "attribute": "ACID_DARK",
    "manaCost": 4,
    "chemicalFormula": "Fe + H2S",
    "effectCode": "TRAP_B22_HYDROGEN_SULFIDE_STRESS_CRACKING_CONT_87",
    "effectText": "[Bẫy Liên Tục / Continuous Trap - Spell Speed 2]: Duy trì trên sân. Mỗi khi đối thủ tuyên bố đòn tấn công hoặc kích hoạt hiệu ứng: Giảm 200 ATK của quái thú đó và đối thủ nhận 200 LP sát thương ăn mòn tích lũy.",
    "scientificLore": "Quá trình ăn mòn kim loại và thụ động hóa Xâm Nhập Khí H2S Gây Giòn Kim Loại (Fe + H₂S → FeS + 2H(absorbed atomic embrittlement)) là bài toán thực tiễn quan trọng bậc nhất trong chuyên đề Hóa học 12 GDPT 2018.",
    "relatedEquation": "Fe + H₂S → FeS + 2H(absorbed atomic embrittlement)",
    "iupacName": "Hydrogen Sulfide Stress Cracking Field",
    "archetype": "STRONG_ACID_CORROSION",
    "structuredEffects": [
      {
        "effectId": "B22_EFF_87",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 200
            }
          }
        ],
        "description": "Bào mòn 200 ATK địch và gây 200 LP sát thương ăn mòn tích lũy."
      }
    ]
  },
  {
    "id": "card_b22_088_cont_trap_cathodic_delamination_paint_strip_88",
    "name": "Bong Tróc Điện Hóa Vùng Cathode (Quá Trình 11)",
    "name_en": "Cathodic Delamination Paint Strip (Process 11)",
    "cardType": "TRAP",
    "spellTrapSubtype": "CONTINUOUS_TRAP",
    "spellSpeed": 2,
    "rarity": "SECRET_RARE",
    "attribute": "ELECTRO",
    "manaCost": 5,
    "chemicalFormula": "2H2O + 2e-",
    "effectCode": "TRAP_B22_CATHODIC_DELAMINATION_PAINT_STRIP_CONT_88",
    "effectText": "[Bẫy Liên Tục / Continuous Trap - Spell Speed 2]: Duy trì trên sân. Mỗi khi đối thủ tuyên bố đòn tấn công hoặc kích hoạt hiệu ứng: Giảm 200 ATK của quái thú đó và đối thủ nhận 200 LP sát thương ăn mòn tích lũy.",
    "scientificLore": "Quá trình ăn mòn kim loại và thụ động hóa Bong Tróc Điện Hóa Vùng Cathode (2H₂O + 2e⁻ + O₂ → 4OH⁻ (High Local pH Delamination)) là bài toán thực tiễn quan trọng bậc nhất trong chuyên đề Hóa học 12 GDPT 2018.",
    "relatedEquation": "2H₂O + 2e⁻ + O₂ → 4OH⁻ (High Local pH Delamination)",
    "iupacName": "Cathodic Delamination Paint Strip Field",
    "archetype": "SURFACE_ADSORPTION",
    "structuredEffects": [
      {
        "effectId": "B22_EFF_88",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 200
            }
          }
        ],
        "description": "Bào mòn 200 ATK địch và gây 200 LP sát thương ăn mòn tích lũy."
      }
    ]
  },
  {
    "id": "card_b22_089_cont_trap_al2o3_passivation_shield_net_89",
    "name": "Màng Thụ Động Hóa Oxit Nhôm Bền Vững (Quá Trình 12)",
    "name_en": "Al2O3 Passivation Shield Net (Process 12)",
    "cardType": "TRAP",
    "spellTrapSubtype": "CONTINUOUS_TRAP",
    "spellSpeed": 2,
    "rarity": "COMMON",
    "attribute": "TERRA",
    "manaCost": 2,
    "chemicalFormula": "Al2O3 Film",
    "effectCode": "TRAP_B22_AL2O3_PASSIVATION_SHIELD_NET_CONT_89",
    "effectText": "[Bẫy Liên Tục / Continuous Trap - Spell Speed 2]: Duy trì trên sân. Mỗi khi đối thủ tuyên bố đòn tấn công hoặc kích hoạt hiệu ứng: Giảm 200 ATK của quái thú đó và đối thủ nhận 200 LP sát thương ăn mòn tích lũy.",
    "scientificLore": "Quá trình ăn mòn kim loại và thụ động hóa Màng Thụ Động Hóa Oxit Nhôm Bền Vững (4Al + 3O₂ → 2Al₂O₃ (Impermeable Protective Oxide Film)) là bài toán thực tiễn quan trọng bậc nhất trong chuyên đề Hóa học 12 GDPT 2018.",
    "relatedEquation": "4Al + 3O₂ → 2Al₂O₃ (Impermeable Protective Oxide Film)",
    "iupacName": "Al2O3 Passivation Shield Net Field",
    "archetype": "STRONG_ACID_CORROSION",
    "structuredEffects": [
      {
        "effectId": "B22_EFF_89",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 200
            }
          }
        ],
        "description": "Bào mòn 200 ATK địch và gây 200 LP sát thương ăn mòn tích lũy."
      }
    ]
  },
  {
    "id": "card_b22_090_cont_trap_electrochemical_rust_pitting_corrosion_90",
    "name": "Quá Trình Rỉ Sét Ăn Mòn Điện Hóa (Quá Trình 12)",
    "name_en": "Electrochemical Rust Pitting Corrosion (Process 12)",
    "cardType": "TRAP",
    "spellTrapSubtype": "CONTINUOUS_TRAP",
    "spellSpeed": 2,
    "rarity": "COMMON",
    "attribute": "ACID_DARK",
    "manaCost": 3,
    "chemicalFormula": "Fe2O3·xH2O",
    "effectCode": "TRAP_B22_ELECTROCHEMICAL_RUST_PITTING_CORROSION_CONT_90",
    "effectText": "[Bẫy Liên Tục / Continuous Trap - Spell Speed 2]: Duy trì trên sân. Mỗi khi đối thủ tuyên bố đòn tấn công hoặc kích hoạt hiệu ứng: Giảm 200 ATK của quái thú đó và đối thủ nhận 200 LP sát thương ăn mòn tích lũy.",
    "scientificLore": "Quá trình ăn mòn kim loại và thụ động hóa Quá Trình Rỉ Sét Ăn Mòn Điện Hóa (4Fe + 3O₂ + 2xH₂O → 2Fe₂O₃·xH₂O (Rust Pitting)) là bài toán thực tiễn quan trọng bậc nhất trong chuyên đề Hóa học 12 GDPT 2018.",
    "relatedEquation": "4Fe + 3O₂ + 2xH₂O → 2Fe₂O₃·xH₂O (Rust Pitting)",
    "iupacName": "Electrochemical Rust Pitting Corrosion Field",
    "archetype": "SURFACE_ADSORPTION",
    "structuredEffects": [
      {
        "effectId": "B22_EFF_90",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 200
            }
          }
        ],
        "description": "Bào mòn 200 ATK địch và gây 200 LP sát thương ăn mòn tích lũy."
      }
    ]
  },
  {
    "id": "card_b22_091_cont_trap_acid_rain_chemical_leaching_91",
    "name": "Mưa Axit Bào Mòn Đá Vôi Lâu Dài (Quá Trình 12)",
    "name_en": "Acid Rain Chemical Leaching (Process 12)",
    "cardType": "TRAP",
    "spellTrapSubtype": "CONTINUOUS_TRAP",
    "spellSpeed": 2,
    "rarity": "COMMON",
    "attribute": "ACID_DARK",
    "manaCost": 4,
    "chemicalFormula": "H2SO4+CaCO3",
    "effectCode": "TRAP_B22_ACID_RAIN_CHEMICAL_LEACHING_CONT_91",
    "effectText": "[Bẫy Liên Tục / Continuous Trap - Spell Speed 2]: Duy trì trên sân. Mỗi khi đối thủ tuyên bố đòn tấn công hoặc kích hoạt hiệu ứng: Giảm 200 ATK của quái thú đó và đối thủ nhận 200 LP sát thương ăn mòn tích lũy.",
    "scientificLore": "Quá trình ăn mòn kim loại và thụ động hóa Mưa Axit Bào Mòn Đá Vôi Lâu Dài (CaCO₃ + H₂SO₄ → CaSO₄ + H₂O + CO₂↑) là bài toán thực tiễn quan trọng bậc nhất trong chuyên đề Hóa học 12 GDPT 2018.",
    "relatedEquation": "CaCO₃ + H₂SO₄ → CaSO₄ + H₂O + CO₂↑",
    "iupacName": "Acid Rain Chemical Leaching Field",
    "archetype": "STRONG_ACID_CORROSION",
    "structuredEffects": [
      {
        "effectId": "B22_EFF_91",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 200
            }
          }
        ],
        "description": "Bào mòn 200 ATK địch và gây 200 LP sát thương ăn mòn tích lũy."
      }
    ]
  },
  {
    "id": "card_b22_092_cont_trap_electroless_nickel_plating_armor_92",
    "name": "Lớp Vỏ Mạ Niken Chống Oxy Hóa (Quá Trình 12)",
    "name_en": "Electroless Nickel Plating Armor (Process 12)",
    "cardType": "TRAP",
    "spellTrapSubtype": "CONTINUOUS_TRAP",
    "spellSpeed": 2,
    "rarity": "RARE",
    "attribute": "ELECTRO",
    "manaCost": 5,
    "chemicalFormula": "Ni-P Alloy",
    "effectCode": "TRAP_B22_ELECTROLESS_NICKEL_PLATING_ARMOR_CONT_92",
    "effectText": "[Bẫy Liên Tục / Continuous Trap - Spell Speed 2]: Duy trì trên sân. Mỗi khi đối thủ tuyên bố đòn tấn công hoặc kích hoạt hiệu ứng: Giảm 200 ATK của quái thú đó và đối thủ nhận 200 LP sát thương ăn mòn tích lũy.",
    "scientificLore": "Quá trình ăn mòn kim loại và thụ động hóa Lớp Vỏ Mạ Niken Chống Oxy Hóa (Ni²⁺ + H₂PO₂⁻ + H₂O → Ni + H₂PO₃⁻ + 2H⁺) là bài toán thực tiễn quan trọng bậc nhất trong chuyên đề Hóa học 12 GDPT 2018.",
    "relatedEquation": "Ni²⁺ + H₂PO₂⁻ + H₂O → Ni + H₂PO₃⁻ + 2H⁺",
    "iupacName": "Electroless Nickel Plating Armor Field",
    "archetype": "SURFACE_ADSORPTION",
    "structuredEffects": [
      {
        "effectId": "B22_EFF_92",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 200
            }
          }
        ],
        "description": "Bào mòn 200 ATK địch và gây 200 LP sát thương ăn mòn tích lũy."
      }
    ]
  },
  {
    "id": "card_b22_093_cont_trap_zinc_phosphate_anti_corrosive_primer_93",
    "name": "Màng Sơn Chống Gỉ Chứa Kẽm Phốt Phát (Quá Trình 12)",
    "name_en": "Zinc Phosphate Anti-Corrosive Primer (Process 12)",
    "cardType": "TRAP",
    "spellTrapSubtype": "CONTINUOUS_TRAP",
    "spellSpeed": 2,
    "rarity": "RARE",
    "attribute": "TERRA",
    "manaCost": 2,
    "chemicalFormula": "Zn3(PO4)2",
    "effectCode": "TRAP_B22_ZINC_PHOSPHATE_ANTI_CORROSIVE_PRIMER_CONT_93",
    "effectText": "[Bẫy Liên Tục / Continuous Trap - Spell Speed 2]: Duy trì trên sân. Mỗi khi đối thủ tuyên bố đòn tấn công hoặc kích hoạt hiệu ứng: Giảm 200 ATK của quái thú đó và đối thủ nhận 200 LP sát thương ăn mòn tích lũy.",
    "scientificLore": "Quá trình ăn mòn kim loại và thụ động hóa Màng Sơn Chống Gỉ Chứa Kẽm Phốt Phát (Metal Phosphatizing Crystalline Surface Passivation) là bài toán thực tiễn quan trọng bậc nhất trong chuyên đề Hóa học 12 GDPT 2018.",
    "relatedEquation": "Metal Phosphatizing Crystalline Surface Passivation",
    "iupacName": "Zinc Phosphate Anti-Corrosive Primer Field",
    "archetype": "STRONG_ACID_CORROSION",
    "structuredEffects": [
      {
        "effectId": "B22_EFF_93",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 200
            }
          }
        ],
        "description": "Bào mòn 200 ATK địch và gây 200 LP sát thương ăn mòn tích lũy."
      }
    ]
  },
  {
    "id": "card_b22_094_cont_trap_intergranular_corrosion_sensitization_94",
    "name": "Ăn Mòn Ranh Giới Hạt Thép Không Gỉ (Quá Trình 12)",
    "name_en": "Intergranular Corrosion Sensitization (Process 12)",
    "cardType": "TRAP",
    "spellTrapSubtype": "CONTINUOUS_TRAP",
    "spellSpeed": 2,
    "rarity": "SUPER_RARE",
    "attribute": "ACID_DARK",
    "manaCost": 3,
    "chemicalFormula": "Cr23C6 Depletion",
    "effectCode": "TRAP_B22_INTERGRANULAR_CORROSION_SENSITIZATION_CONT_94",
    "effectText": "[Bẫy Liên Tục / Continuous Trap - Spell Speed 2]: Duy trì trên sân. Mỗi khi đối thủ tuyên bố đòn tấn công hoặc kích hoạt hiệu ứng: Giảm 200 ATK của quái thú đó và đối thủ nhận 200 LP sát thương ăn mòn tích lũy.",
    "scientificLore": "Quá trình ăn mòn kim loại và thụ động hóa Ăn Mòn Ranh Giới Hạt Thép Không Gỉ (Chromium Carbide Precipitation at Grain Boundaries) là bài toán thực tiễn quan trọng bậc nhất trong chuyên đề Hóa học 12 GDPT 2018.",
    "relatedEquation": "Chromium Carbide Precipitation at Grain Boundaries",
    "iupacName": "Intergranular Corrosion Sensitization Field",
    "archetype": "SURFACE_ADSORPTION",
    "structuredEffects": [
      {
        "effectId": "B22_EFF_94",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 200
            }
          }
        ],
        "description": "Bào mòn 200 ATK địch và gây 200 LP sát thương ăn mòn tích lũy."
      }
    ]
  },
  {
    "id": "card_b22_095_cont_trap_hydrogen_sulfide_stress_cracking_95",
    "name": "Xâm Nhập Khí H2S Gây Giòn Kim Loại (Quá Trình 12)",
    "name_en": "Hydrogen Sulfide Stress Cracking (Process 12)",
    "cardType": "TRAP",
    "spellTrapSubtype": "CONTINUOUS_TRAP",
    "spellSpeed": 2,
    "rarity": "SUPER_RARE",
    "attribute": "ACID_DARK",
    "manaCost": 4,
    "chemicalFormula": "Fe + H2S",
    "effectCode": "TRAP_B22_HYDROGEN_SULFIDE_STRESS_CRACKING_CONT_95",
    "effectText": "[Bẫy Liên Tục / Continuous Trap - Spell Speed 2]: Duy trì trên sân. Mỗi khi đối thủ tuyên bố đòn tấn công hoặc kích hoạt hiệu ứng: Giảm 200 ATK của quái thú đó và đối thủ nhận 200 LP sát thương ăn mòn tích lũy.",
    "scientificLore": "Quá trình ăn mòn kim loại và thụ động hóa Xâm Nhập Khí H2S Gây Giòn Kim Loại (Fe + H₂S → FeS + 2H(absorbed atomic embrittlement)) là bài toán thực tiễn quan trọng bậc nhất trong chuyên đề Hóa học 12 GDPT 2018.",
    "relatedEquation": "Fe + H₂S → FeS + 2H(absorbed atomic embrittlement)",
    "iupacName": "Hydrogen Sulfide Stress Cracking Field",
    "archetype": "STRONG_ACID_CORROSION",
    "structuredEffects": [
      {
        "effectId": "B22_EFF_95",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 200
            }
          }
        ],
        "description": "Bào mòn 200 ATK địch và gây 200 LP sát thương ăn mòn tích lũy."
      }
    ]
  },
  {
    "id": "card_b22_096_cont_trap_cathodic_delamination_paint_strip_96",
    "name": "Bong Tróc Điện Hóa Vùng Cathode (Quá Trình 12)",
    "name_en": "Cathodic Delamination Paint Strip (Process 12)",
    "cardType": "TRAP",
    "spellTrapSubtype": "CONTINUOUS_TRAP",
    "spellSpeed": 2,
    "rarity": "ULTRA_RARE",
    "attribute": "ELECTRO",
    "manaCost": 5,
    "chemicalFormula": "2H2O + 2e-",
    "effectCode": "TRAP_B22_CATHODIC_DELAMINATION_PAINT_STRIP_CONT_96",
    "effectText": "[Bẫy Liên Tục / Continuous Trap - Spell Speed 2]: Duy trì trên sân. Mỗi khi đối thủ tuyên bố đòn tấn công hoặc kích hoạt hiệu ứng: Giảm 200 ATK của quái thú đó và đối thủ nhận 200 LP sát thương ăn mòn tích lũy.",
    "scientificLore": "Quá trình ăn mòn kim loại và thụ động hóa Bong Tróc Điện Hóa Vùng Cathode (2H₂O + 2e⁻ + O₂ → 4OH⁻ (High Local pH Delamination)) là bài toán thực tiễn quan trọng bậc nhất trong chuyên đề Hóa học 12 GDPT 2018.",
    "relatedEquation": "2H₂O + 2e⁻ + O₂ → 4OH⁻ (High Local pH Delamination)",
    "iupacName": "Cathodic Delamination Paint Strip Field",
    "archetype": "SURFACE_ADSORPTION",
    "structuredEffects": [
      {
        "effectId": "B22_EFF_96",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 200
            }
          }
        ],
        "description": "Bào mòn 200 ATK địch và gây 200 LP sát thương ăn mòn tích lũy."
      }
    ]
  },
  {
    "id": "card_b22_097_cont_trap_al2o3_passivation_shield_net_97",
    "name": "Màng Thụ Động Hóa Oxit Nhôm Bền Vững (Quá Trình 13)",
    "name_en": "Al2O3 Passivation Shield Net (Process 13)",
    "cardType": "TRAP",
    "spellTrapSubtype": "CONTINUOUS_TRAP",
    "spellSpeed": 2,
    "rarity": "SECRET_RARE",
    "attribute": "TERRA",
    "manaCost": 2,
    "chemicalFormula": "Al2O3 Film",
    "effectCode": "TRAP_B22_AL2O3_PASSIVATION_SHIELD_NET_CONT_97",
    "effectText": "[Bẫy Liên Tục / Continuous Trap - Spell Speed 2]: Duy trì trên sân. Mỗi khi đối thủ tuyên bố đòn tấn công hoặc kích hoạt hiệu ứng: Giảm 200 ATK của quái thú đó và đối thủ nhận 200 LP sát thương ăn mòn tích lũy.",
    "scientificLore": "Quá trình ăn mòn kim loại và thụ động hóa Màng Thụ Động Hóa Oxit Nhôm Bền Vững (4Al + 3O₂ → 2Al₂O₃ (Impermeable Protective Oxide Film)) là bài toán thực tiễn quan trọng bậc nhất trong chuyên đề Hóa học 12 GDPT 2018.",
    "relatedEquation": "4Al + 3O₂ → 2Al₂O₃ (Impermeable Protective Oxide Film)",
    "iupacName": "Al2O3 Passivation Shield Net Field",
    "archetype": "STRONG_ACID_CORROSION",
    "structuredEffects": [
      {
        "effectId": "B22_EFF_97",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 200
            }
          }
        ],
        "description": "Bào mòn 200 ATK địch và gây 200 LP sát thương ăn mòn tích lũy."
      }
    ]
  },
  {
    "id": "card_b22_098_cont_trap_electrochemical_rust_pitting_corrosion_98",
    "name": "Quá Trình Rỉ Sét Ăn Mòn Điện Hóa (Quá Trình 13)",
    "name_en": "Electrochemical Rust Pitting Corrosion (Process 13)",
    "cardType": "TRAP",
    "spellTrapSubtype": "CONTINUOUS_TRAP",
    "spellSpeed": 2,
    "rarity": "COMMON",
    "attribute": "ACID_DARK",
    "manaCost": 3,
    "chemicalFormula": "Fe2O3·xH2O",
    "effectCode": "TRAP_B22_ELECTROCHEMICAL_RUST_PITTING_CORROSION_CONT_98",
    "effectText": "[Bẫy Liên Tục / Continuous Trap - Spell Speed 2]: Duy trì trên sân. Mỗi khi đối thủ tuyên bố đòn tấn công hoặc kích hoạt hiệu ứng: Giảm 200 ATK của quái thú đó và đối thủ nhận 200 LP sát thương ăn mòn tích lũy.",
    "scientificLore": "Quá trình ăn mòn kim loại và thụ động hóa Quá Trình Rỉ Sét Ăn Mòn Điện Hóa (4Fe + 3O₂ + 2xH₂O → 2Fe₂O₃·xH₂O (Rust Pitting)) là bài toán thực tiễn quan trọng bậc nhất trong chuyên đề Hóa học 12 GDPT 2018.",
    "relatedEquation": "4Fe + 3O₂ + 2xH₂O → 2Fe₂O₃·xH₂O (Rust Pitting)",
    "iupacName": "Electrochemical Rust Pitting Corrosion Field",
    "archetype": "SURFACE_ADSORPTION",
    "structuredEffects": [
      {
        "effectId": "B22_EFF_98",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 200
            }
          }
        ],
        "description": "Bào mòn 200 ATK địch và gây 200 LP sát thương ăn mòn tích lũy."
      }
    ]
  },
  {
    "id": "card_b22_099_cont_trap_acid_rain_chemical_leaching_99",
    "name": "Mưa Axit Bào Mòn Đá Vôi Lâu Dài (Quá Trình 13)",
    "name_en": "Acid Rain Chemical Leaching (Process 13)",
    "cardType": "TRAP",
    "spellTrapSubtype": "CONTINUOUS_TRAP",
    "spellSpeed": 2,
    "rarity": "COMMON",
    "attribute": "ACID_DARK",
    "manaCost": 4,
    "chemicalFormula": "H2SO4+CaCO3",
    "effectCode": "TRAP_B22_ACID_RAIN_CHEMICAL_LEACHING_CONT_99",
    "effectText": "[Bẫy Liên Tục / Continuous Trap - Spell Speed 2]: Duy trì trên sân. Mỗi khi đối thủ tuyên bố đòn tấn công hoặc kích hoạt hiệu ứng: Giảm 200 ATK của quái thú đó và đối thủ nhận 200 LP sát thương ăn mòn tích lũy.",
    "scientificLore": "Quá trình ăn mòn kim loại và thụ động hóa Mưa Axit Bào Mòn Đá Vôi Lâu Dài (CaCO₃ + H₂SO₄ → CaSO₄ + H₂O + CO₂↑) là bài toán thực tiễn quan trọng bậc nhất trong chuyên đề Hóa học 12 GDPT 2018.",
    "relatedEquation": "CaCO₃ + H₂SO₄ → CaSO₄ + H₂O + CO₂↑",
    "iupacName": "Acid Rain Chemical Leaching Field",
    "archetype": "STRONG_ACID_CORROSION",
    "structuredEffects": [
      {
        "effectId": "B22_EFF_99",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 200
            }
          }
        ],
        "description": "Bào mòn 200 ATK địch và gây 200 LP sát thương ăn mòn tích lũy."
      }
    ]
  },
  {
    "id": "card_b22_100_cont_trap_electroless_nickel_plating_armor_100",
    "name": "Lớp Vỏ Mạ Niken Chống Oxy Hóa (Quá Trình 13)",
    "name_en": "Electroless Nickel Plating Armor (Process 13)",
    "cardType": "TRAP",
    "spellTrapSubtype": "CONTINUOUS_TRAP",
    "spellSpeed": 2,
    "rarity": "COMMON",
    "attribute": "ELECTRO",
    "manaCost": 5,
    "chemicalFormula": "Ni-P Alloy",
    "effectCode": "TRAP_B22_ELECTROLESS_NICKEL_PLATING_ARMOR_CONT_100",
    "effectText": "[Bẫy Liên Tục / Continuous Trap - Spell Speed 2]: Duy trì trên sân. Mỗi khi đối thủ tuyên bố đòn tấn công hoặc kích hoạt hiệu ứng: Giảm 200 ATK của quái thú đó và đối thủ nhận 200 LP sát thương ăn mòn tích lũy.",
    "scientificLore": "Quá trình ăn mòn kim loại và thụ động hóa Lớp Vỏ Mạ Niken Chống Oxy Hóa (Ni²⁺ + H₂PO₂⁻ + H₂O → Ni + H₂PO₃⁻ + 2H⁺) là bài toán thực tiễn quan trọng bậc nhất trong chuyên đề Hóa học 12 GDPT 2018.",
    "relatedEquation": "Ni²⁺ + H₂PO₂⁻ + H₂O → Ni + H₂PO₃⁻ + 2H⁺",
    "iupacName": "Electroless Nickel Plating Armor Field",
    "archetype": "SURFACE_ADSORPTION",
    "structuredEffects": [
      {
        "effectId": "B22_EFF_100",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 200
            }
          }
        ],
        "description": "Bào mòn 200 ATK địch và gây 200 LP sát thương ăn mòn tích lũy."
      }
    ]
  }
];
