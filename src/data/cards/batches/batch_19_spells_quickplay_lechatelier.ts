// src/data/cards/batches/batch_19_spells_quickplay_lechatelier.ts
// Batch 19: Quick-Play Le Chatelier Equilibrium Spells (100 cards)
// Automatically generated and validated for ELEMENTA Tactical TCG

import { PlayableCardDef } from '../../../domain/cardGameTypes';

export const BATCH_19_CARDS: PlayableCardDef[] = [
  {
    "id": "card_b19_001_quick_high_pressure_equilibrium_shift_1",
    "name": "Chuyển Dịch Tăng Áp Suất Khí (Phản Ứng Nhanh 1)",
    "name_en": "High Pressure Equilibrium Shift (Quick-Play 1)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "QUICK_PLAY_SPELL",
    "spellSpeed": 2,
    "rarity": "COMMON",
    "attribute": "AERO",
    "manaCost": 1,
    "chemicalFormula": "ΔP > 0",
    "effectCode": "SPELL_B19_HIGH_PRESSURE_EQUILIBRIUM_SHIFT_LECHAT_1",
    "effectText": "[Phép Nhanh / Quick-Play - Spell Speed 2]: Kích hoạt được trong lượt của đối thủ hoặc trong Chain. Chuyển dịch cân bằng hóa học: Tăng ngay 400 ATK cho 1 quái thú đồng minh hoặc giảm 400 ATK của 1 quái thú đối phương đang tấn công.",
    "scientificLore": "Nguyên lý Le Chatelier (SGK Hóa học 11 GDPT 2018): Khi tác động vào hệ cân bằng (nồng độ, nhiệt độ, áp suất), hệ sẽ tự chuyển dịch theo chiều chống lại tác động đó.",
    "relatedEquation": "Le Chatelier Shift towards Fewer Gas Moles",
    "iupacName": "High Pressure Equilibrium Shift Surge",
    "archetype": "LE_CHATELIER_EQUILIBRIUM",
    "structuredEffects": [
      {
        "effectId": "B19_EFF_1",
        "activationWindow": "QUICK",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Phép nhanh chuyển dịch cân bằng: Tăng 400 ATK cho toàn đội."
      }
    ]
  },
  {
    "id": "card_b19_002_quick_exothermic_temperature_drop_flash_2",
    "name": "Hạ Nhiệt Độ Phản Ứng Tỏa Nhiệt (Phản Ứng Nhanh 1)",
    "name_en": "Exothermic Temperature Drop Flash (Quick-Play 1)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "QUICK_PLAY_SPELL",
    "spellSpeed": 2,
    "rarity": "RARE",
    "attribute": "AQUA",
    "manaCost": 2,
    "chemicalFormula": "ΔT < 0 (ΔH < 0)",
    "effectCode": "SPELL_B19_EXOTHERMIC_TEMPERATURE_DROP_FLASH_LECHAT_2",
    "effectText": "[Phép Nhanh / Quick-Play - Spell Speed 2]: Kích hoạt được trong lượt của đối thủ hoặc trong Chain. Chuyển dịch cân bằng hóa học: Tăng ngay 400 ATK cho 1 quái thú đồng minh hoặc giảm 400 ATK của 1 quái thú đối phương đang tấn công.",
    "scientificLore": "Nguyên lý Le Chatelier (SGK Hóa học 11 GDPT 2018): Khi tác động vào hệ cân bằng (nồng độ, nhiệt độ, áp suất), hệ sẽ tự chuyển dịch theo chiều chống lại tác động đó.",
    "relatedEquation": "Cooling Shifts Equilibrium Forward (Exothermic)",
    "iupacName": "Exothermic Temperature Drop Flash Surge",
    "archetype": "WEAK_ACID_BUFFER",
    "structuredEffects": [
      {
        "effectId": "B19_EFF_2",
        "activationWindow": "QUICK",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Phép nhanh chuyển dịch cân bằng: Tăng 400 ATK cho toàn đội."
      }
    ]
  },
  {
    "id": "card_b19_003_quick_reactant_concentration_surge_instant_3",
    "name": "Tăng Nồng Độ Tức Thời Chất Đầu (Phản Ứng Nhanh 1)",
    "name_en": "Reactant Concentration Surge Instant (Quick-Play 1)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "QUICK_PLAY_SPELL",
    "spellSpeed": 2,
    "rarity": "RARE",
    "attribute": "PYRO",
    "manaCost": 3,
    "chemicalFormula": "[Reactant] ↑",
    "effectCode": "SPELL_B19_REACTANT_CONCENTRATION_SURGE_INSTANT_LECHAT_3",
    "effectText": "[Phép Nhanh / Quick-Play - Spell Speed 2]: Kích hoạt được trong lượt của đối thủ hoặc trong Chain. Chuyển dịch cân bằng hóa học: Tăng ngay 400 ATK cho 1 quái thú đồng minh hoặc giảm 400 ATK của 1 quái thú đối phương đang tấn công.",
    "scientificLore": "Nguyên lý Le Chatelier (SGK Hóa học 11 GDPT 2018): Khi tác động vào hệ cân bằng (nồng độ, nhiệt độ, áp suất), hệ sẽ tự chuyển dịch theo chiều chống lại tác động đó.",
    "relatedEquation": "Surge in Reactant Drives Forward Reaction Speed",
    "iupacName": "Reactant Concentration Surge Instant Surge",
    "archetype": "LE_CHATELIER_EQUILIBRIUM",
    "structuredEffects": [
      {
        "effectId": "B19_EFF_3",
        "activationWindow": "QUICK",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Phép nhanh chuyển dịch cân bằng: Tăng 400 ATK cho toàn đội."
      }
    ]
  },
  {
    "id": "card_b19_004_quick_common_ion_suppression_shift_4",
    "name": "Hiệu Ứng Ion Chung Kìm Hãm (Phản Ứng Nhanh 1)",
    "name_en": "Common-Ion Suppression Shift (Quick-Play 1)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "QUICK_PLAY_SPELL",
    "spellSpeed": 2,
    "rarity": "SUPER_RARE",
    "attribute": "TERRA",
    "manaCost": 4,
    "chemicalFormula": "Common Ion",
    "effectCode": "SPELL_B19_COMMON_ION_SUPPRESSION_SHIFT_LECHAT_4",
    "effectText": "[Phép Nhanh / Quick-Play - Spell Speed 2]: Kích hoạt được trong lượt của đối thủ hoặc trong Chain. Chuyển dịch cân bằng hóa học: Tăng ngay 400 ATK cho 1 quái thú đồng minh hoặc giảm 400 ATK của 1 quái thú đối phương đang tấn công.",
    "scientificLore": "Nguyên lý Le Chatelier (SGK Hóa học 11 GDPT 2018): Khi tác động vào hệ cân bằng (nồng độ, nhiệt độ, áp suất), hệ sẽ tự chuyển dịch theo chiều chống lại tác động đó.",
    "relatedEquation": "Addition of Common Ion Decreases Salt Solubility",
    "iupacName": "Common-Ion Suppression Shift Surge",
    "archetype": "WEAK_ACID_BUFFER",
    "structuredEffects": [
      {
        "effectId": "B19_EFF_4",
        "activationWindow": "QUICK",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Phép nhanh chuyển dịch cân bằng: Tăng 400 ATK cho toàn đội."
      }
    ]
  },
  {
    "id": "card_b19_005_quick_acetic_buffer_dynamic_restoration_5",
    "name": "Đệm Axit Axetic Cân Bằng pH (Phản Ứng Nhanh 1)",
    "name_en": "Acetic Buffer Dynamic Restoration (Quick-Play 1)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "QUICK_PLAY_SPELL",
    "spellSpeed": 2,
    "rarity": "SUPER_RARE",
    "attribute": "AQUA",
    "manaCost": 1,
    "chemicalFormula": "CH3COOH/CH3COO-",
    "effectCode": "SPELL_B19_ACETIC_BUFFER_DYNAMIC_RESTORATION_LECHAT_5",
    "effectText": "[Phép Nhanh / Quick-Play - Spell Speed 2]: Kích hoạt được trong lượt của đối thủ hoặc trong Chain. Chuyển dịch cân bằng hóa học: Tăng ngay 400 ATK cho 1 quái thú đồng minh hoặc giảm 400 ATK của 1 quái thú đối phương đang tấn công.",
    "scientificLore": "Nguyên lý Le Chatelier (SGK Hóa học 11 GDPT 2018): Khi tác động vào hệ cân bằng (nồng độ, nhiệt độ, áp suất), hệ sẽ tự chuyển dịch theo chiều chống lại tác động đó.",
    "relatedEquation": "Buffer Capacity Neutralizes Sudden H⁺/OH⁻ Influx",
    "iupacName": "Acetic Buffer Dynamic Restoration Surge",
    "archetype": "LE_CHATELIER_EQUILIBRIUM",
    "structuredEffects": [
      {
        "effectId": "B19_EFF_5",
        "activationWindow": "QUICK",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Phép nhanh chuyển dịch cân bằng: Tăng 400 ATK cho toàn đội."
      }
    ]
  },
  {
    "id": "card_b19_006_quick_equilibrium_constant_jump_pulse_6",
    "name": "Đột Biến Hằng Số Phản Ứng Kc (Phản Ứng Nhanh 1)",
    "name_en": "Equilibrium Constant Jump Pulse (Quick-Play 1)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "QUICK_PLAY_SPELL",
    "spellSpeed": 2,
    "rarity": "ULTRA_RARE",
    "attribute": "ELECTRO",
    "manaCost": 2,
    "chemicalFormula": "Kc Mutation",
    "effectCode": "SPELL_B19_EQUILIBRIUM_CONSTANT_JUMP_PULSE_LECHAT_6",
    "effectText": "[Phép Nhanh / Quick-Play - Spell Speed 2]: Kích hoạt được trong lượt của đối thủ hoặc trong Chain. Chuyển dịch cân bằng hóa học: Tăng ngay 400 ATK cho 1 quái thú đồng minh hoặc giảm 400 ATK của 1 quái thú đối phương đang tấn công.",
    "scientificLore": "Nguyên lý Le Chatelier (SGK Hóa học 11 GDPT 2018): Khi tác động vào hệ cân bằng (nồng độ, nhiệt độ, áp suất), hệ sẽ tự chuyển dịch theo chiều chống lại tác động đó.",
    "relatedEquation": "Temperature Change Alters Equilibrium Constant Kc",
    "iupacName": "Equilibrium Constant Jump Pulse Surge",
    "archetype": "WEAK_ACID_BUFFER",
    "structuredEffects": [
      {
        "effectId": "B19_EFF_6",
        "activationWindow": "QUICK",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Phép nhanh chuyển dịch cân bằng: Tăng 400 ATK cho toàn đội."
      }
    ]
  },
  {
    "id": "card_b19_007_quick_continuous_product_evacuation_surge_7",
    "name": "Bơm Hút Sản Phẩm Kéo Theo (Phản Ứng Nhanh 1)",
    "name_en": "Continuous Product Evacuation Surge (Quick-Play 1)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "QUICK_PLAY_SPELL",
    "spellSpeed": 2,
    "rarity": "SECRET_RARE",
    "attribute": "AERO",
    "manaCost": 3,
    "chemicalFormula": "[Product] ↓",
    "effectCode": "SPELL_B19_CONTINUOUS_PRODUCT_EVACUATION_SURGE_LECHAT_7",
    "effectText": "[Phép Nhanh / Quick-Play - Spell Speed 2]: Kích hoạt được trong lượt của đối thủ hoặc trong Chain. Chuyển dịch cân bằng hóa học: Tăng ngay 400 ATK cho 1 quái thú đồng minh hoặc giảm 400 ATK của 1 quái thú đối phương đang tấn công.",
    "scientificLore": "Nguyên lý Le Chatelier (SGK Hóa học 11 GDPT 2018): Khi tác động vào hệ cân bằng (nồng độ, nhiệt độ, áp suất), hệ sẽ tự chuyển dịch theo chiều chống lại tác động đó.",
    "relatedEquation": "Removing Product Forces 100% Forward Conversion",
    "iupacName": "Continuous Product Evacuation Surge Surge",
    "archetype": "LE_CHATELIER_EQUILIBRIUM",
    "structuredEffects": [
      {
        "effectId": "B19_EFF_7",
        "activationWindow": "QUICK",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Phép nhanh chuyển dịch cân bằng: Tăng 400 ATK cho toàn đội."
      }
    ]
  },
  {
    "id": "card_b19_008_quick_reversible_reaction_inversion_surge_8",
    "name": "Đảo Chiều Phản Ứng Thuận Nghịch (Phản Ứng Nhanh 1)",
    "name_en": "Reversible Reaction Inversion Surge (Quick-Play 1)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "QUICK_PLAY_SPELL",
    "spellSpeed": 2,
    "rarity": "COMMON",
    "attribute": "NOBLE_VOID",
    "manaCost": 4,
    "chemicalFormula": "v_rev > v_fwd",
    "effectCode": "SPELL_B19_REVERSIBLE_REACTION_INVERSION_SURGE_LECHAT_8",
    "effectText": "[Phép Nhanh / Quick-Play - Spell Speed 2]: Kích hoạt được trong lượt của đối thủ hoặc trong Chain. Chuyển dịch cân bằng hóa học: Tăng ngay 400 ATK cho 1 quái thú đồng minh hoặc giảm 400 ATK của 1 quái thú đối phương đang tấn công.",
    "scientificLore": "Nguyên lý Le Chatelier (SGK Hóa học 11 GDPT 2018): Khi tác động vào hệ cân bằng (nồng độ, nhiệt độ, áp suất), hệ sẽ tự chuyển dịch theo chiều chống lại tác động đó.",
    "relatedEquation": "Counter Shift Driving Reverse Chemical Reaction",
    "iupacName": "Reversible Reaction Inversion Surge Surge",
    "archetype": "WEAK_ACID_BUFFER",
    "structuredEffects": [
      {
        "effectId": "B19_EFF_8",
        "activationWindow": "QUICK",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Phép nhanh chuyển dịch cân bằng: Tăng 400 ATK cho toàn đội."
      }
    ]
  },
  {
    "id": "card_b19_009_quick_high_pressure_equilibrium_shift_9",
    "name": "Chuyển Dịch Tăng Áp Suất Khí (Phản Ứng Nhanh 2)",
    "name_en": "High Pressure Equilibrium Shift (Quick-Play 2)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "QUICK_PLAY_SPELL",
    "spellSpeed": 2,
    "rarity": "COMMON",
    "attribute": "AERO",
    "manaCost": 1,
    "chemicalFormula": "ΔP > 0",
    "effectCode": "SPELL_B19_HIGH_PRESSURE_EQUILIBRIUM_SHIFT_LECHAT_9",
    "effectText": "[Phép Nhanh / Quick-Play - Spell Speed 2]: Kích hoạt được trong lượt của đối thủ hoặc trong Chain. Chuyển dịch cân bằng hóa học: Tăng ngay 400 ATK cho 1 quái thú đồng minh hoặc giảm 400 ATK của 1 quái thú đối phương đang tấn công.",
    "scientificLore": "Nguyên lý Le Chatelier (SGK Hóa học 11 GDPT 2018): Khi tác động vào hệ cân bằng (nồng độ, nhiệt độ, áp suất), hệ sẽ tự chuyển dịch theo chiều chống lại tác động đó.",
    "relatedEquation": "Le Chatelier Shift towards Fewer Gas Moles",
    "iupacName": "High Pressure Equilibrium Shift Surge",
    "archetype": "LE_CHATELIER_EQUILIBRIUM",
    "structuredEffects": [
      {
        "effectId": "B19_EFF_9",
        "activationWindow": "QUICK",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Phép nhanh chuyển dịch cân bằng: Tăng 400 ATK cho toàn đội."
      }
    ]
  },
  {
    "id": "card_b19_010_quick_exothermic_temperature_drop_flash_10",
    "name": "Hạ Nhiệt Độ Phản Ứng Tỏa Nhiệt (Phản Ứng Nhanh 2)",
    "name_en": "Exothermic Temperature Drop Flash (Quick-Play 2)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "QUICK_PLAY_SPELL",
    "spellSpeed": 2,
    "rarity": "COMMON",
    "attribute": "AQUA",
    "manaCost": 2,
    "chemicalFormula": "ΔT < 0 (ΔH < 0)",
    "effectCode": "SPELL_B19_EXOTHERMIC_TEMPERATURE_DROP_FLASH_LECHAT_10",
    "effectText": "[Phép Nhanh / Quick-Play - Spell Speed 2]: Kích hoạt được trong lượt của đối thủ hoặc trong Chain. Chuyển dịch cân bằng hóa học: Tăng ngay 400 ATK cho 1 quái thú đồng minh hoặc giảm 400 ATK của 1 quái thú đối phương đang tấn công.",
    "scientificLore": "Nguyên lý Le Chatelier (SGK Hóa học 11 GDPT 2018): Khi tác động vào hệ cân bằng (nồng độ, nhiệt độ, áp suất), hệ sẽ tự chuyển dịch theo chiều chống lại tác động đó.",
    "relatedEquation": "Cooling Shifts Equilibrium Forward (Exothermic)",
    "iupacName": "Exothermic Temperature Drop Flash Surge",
    "archetype": "WEAK_ACID_BUFFER",
    "structuredEffects": [
      {
        "effectId": "B19_EFF_10",
        "activationWindow": "QUICK",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Phép nhanh chuyển dịch cân bằng: Tăng 400 ATK cho toàn đội."
      }
    ]
  },
  {
    "id": "card_b19_011_quick_reactant_concentration_surge_instant_11",
    "name": "Tăng Nồng Độ Tức Thời Chất Đầu (Phản Ứng Nhanh 2)",
    "name_en": "Reactant Concentration Surge Instant (Quick-Play 2)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "QUICK_PLAY_SPELL",
    "spellSpeed": 2,
    "rarity": "RARE",
    "attribute": "PYRO",
    "manaCost": 3,
    "chemicalFormula": "[Reactant] ↑",
    "effectCode": "SPELL_B19_REACTANT_CONCENTRATION_SURGE_INSTANT_LECHAT_11",
    "effectText": "[Phép Nhanh / Quick-Play - Spell Speed 2]: Kích hoạt được trong lượt của đối thủ hoặc trong Chain. Chuyển dịch cân bằng hóa học: Tăng ngay 400 ATK cho 1 quái thú đồng minh hoặc giảm 400 ATK của 1 quái thú đối phương đang tấn công.",
    "scientificLore": "Nguyên lý Le Chatelier (SGK Hóa học 11 GDPT 2018): Khi tác động vào hệ cân bằng (nồng độ, nhiệt độ, áp suất), hệ sẽ tự chuyển dịch theo chiều chống lại tác động đó.",
    "relatedEquation": "Surge in Reactant Drives Forward Reaction Speed",
    "iupacName": "Reactant Concentration Surge Instant Surge",
    "archetype": "LE_CHATELIER_EQUILIBRIUM",
    "structuredEffects": [
      {
        "effectId": "B19_EFF_11",
        "activationWindow": "QUICK",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Phép nhanh chuyển dịch cân bằng: Tăng 400 ATK cho toàn đội."
      }
    ]
  },
  {
    "id": "card_b19_012_quick_common_ion_suppression_shift_12",
    "name": "Hiệu Ứng Ion Chung Kìm Hãm (Phản Ứng Nhanh 2)",
    "name_en": "Common-Ion Suppression Shift (Quick-Play 2)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "QUICK_PLAY_SPELL",
    "spellSpeed": 2,
    "rarity": "RARE",
    "attribute": "TERRA",
    "manaCost": 4,
    "chemicalFormula": "Common Ion",
    "effectCode": "SPELL_B19_COMMON_ION_SUPPRESSION_SHIFT_LECHAT_12",
    "effectText": "[Phép Nhanh / Quick-Play - Spell Speed 2]: Kích hoạt được trong lượt của đối thủ hoặc trong Chain. Chuyển dịch cân bằng hóa học: Tăng ngay 400 ATK cho 1 quái thú đồng minh hoặc giảm 400 ATK của 1 quái thú đối phương đang tấn công.",
    "scientificLore": "Nguyên lý Le Chatelier (SGK Hóa học 11 GDPT 2018): Khi tác động vào hệ cân bằng (nồng độ, nhiệt độ, áp suất), hệ sẽ tự chuyển dịch theo chiều chống lại tác động đó.",
    "relatedEquation": "Addition of Common Ion Decreases Salt Solubility",
    "iupacName": "Common-Ion Suppression Shift Surge",
    "archetype": "WEAK_ACID_BUFFER",
    "structuredEffects": [
      {
        "effectId": "B19_EFF_12",
        "activationWindow": "QUICK",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Phép nhanh chuyển dịch cân bằng: Tăng 400 ATK cho toàn đội."
      }
    ]
  },
  {
    "id": "card_b19_013_quick_acetic_buffer_dynamic_restoration_13",
    "name": "Đệm Axit Axetic Cân Bằng pH (Phản Ứng Nhanh 2)",
    "name_en": "Acetic Buffer Dynamic Restoration (Quick-Play 2)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "QUICK_PLAY_SPELL",
    "spellSpeed": 2,
    "rarity": "SUPER_RARE",
    "attribute": "AQUA",
    "manaCost": 1,
    "chemicalFormula": "CH3COOH/CH3COO-",
    "effectCode": "SPELL_B19_ACETIC_BUFFER_DYNAMIC_RESTORATION_LECHAT_13",
    "effectText": "[Phép Nhanh / Quick-Play - Spell Speed 2]: Kích hoạt được trong lượt của đối thủ hoặc trong Chain. Chuyển dịch cân bằng hóa học: Tăng ngay 400 ATK cho 1 quái thú đồng minh hoặc giảm 400 ATK của 1 quái thú đối phương đang tấn công.",
    "scientificLore": "Nguyên lý Le Chatelier (SGK Hóa học 11 GDPT 2018): Khi tác động vào hệ cân bằng (nồng độ, nhiệt độ, áp suất), hệ sẽ tự chuyển dịch theo chiều chống lại tác động đó.",
    "relatedEquation": "Buffer Capacity Neutralizes Sudden H⁺/OH⁻ Influx",
    "iupacName": "Acetic Buffer Dynamic Restoration Surge",
    "archetype": "LE_CHATELIER_EQUILIBRIUM",
    "structuredEffects": [
      {
        "effectId": "B19_EFF_13",
        "activationWindow": "QUICK",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Phép nhanh chuyển dịch cân bằng: Tăng 400 ATK cho toàn đội."
      }
    ]
  },
  {
    "id": "card_b19_014_quick_equilibrium_constant_jump_pulse_14",
    "name": "Đột Biến Hằng Số Phản Ứng Kc (Phản Ứng Nhanh 2)",
    "name_en": "Equilibrium Constant Jump Pulse (Quick-Play 2)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "QUICK_PLAY_SPELL",
    "spellSpeed": 2,
    "rarity": "SUPER_RARE",
    "attribute": "ELECTRO",
    "manaCost": 2,
    "chemicalFormula": "Kc Mutation",
    "effectCode": "SPELL_B19_EQUILIBRIUM_CONSTANT_JUMP_PULSE_LECHAT_14",
    "effectText": "[Phép Nhanh / Quick-Play - Spell Speed 2]: Kích hoạt được trong lượt của đối thủ hoặc trong Chain. Chuyển dịch cân bằng hóa học: Tăng ngay 400 ATK cho 1 quái thú đồng minh hoặc giảm 400 ATK của 1 quái thú đối phương đang tấn công.",
    "scientificLore": "Nguyên lý Le Chatelier (SGK Hóa học 11 GDPT 2018): Khi tác động vào hệ cân bằng (nồng độ, nhiệt độ, áp suất), hệ sẽ tự chuyển dịch theo chiều chống lại tác động đó.",
    "relatedEquation": "Temperature Change Alters Equilibrium Constant Kc",
    "iupacName": "Equilibrium Constant Jump Pulse Surge",
    "archetype": "WEAK_ACID_BUFFER",
    "structuredEffects": [
      {
        "effectId": "B19_EFF_14",
        "activationWindow": "QUICK",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Phép nhanh chuyển dịch cân bằng: Tăng 400 ATK cho toàn đội."
      }
    ]
  },
  {
    "id": "card_b19_015_quick_continuous_product_evacuation_surge_15",
    "name": "Bơm Hút Sản Phẩm Kéo Theo (Phản Ứng Nhanh 2)",
    "name_en": "Continuous Product Evacuation Surge (Quick-Play 2)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "QUICK_PLAY_SPELL",
    "spellSpeed": 2,
    "rarity": "ULTRA_RARE",
    "attribute": "AERO",
    "manaCost": 3,
    "chemicalFormula": "[Product] ↓",
    "effectCode": "SPELL_B19_CONTINUOUS_PRODUCT_EVACUATION_SURGE_LECHAT_15",
    "effectText": "[Phép Nhanh / Quick-Play - Spell Speed 2]: Kích hoạt được trong lượt của đối thủ hoặc trong Chain. Chuyển dịch cân bằng hóa học: Tăng ngay 400 ATK cho 1 quái thú đồng minh hoặc giảm 400 ATK của 1 quái thú đối phương đang tấn công.",
    "scientificLore": "Nguyên lý Le Chatelier (SGK Hóa học 11 GDPT 2018): Khi tác động vào hệ cân bằng (nồng độ, nhiệt độ, áp suất), hệ sẽ tự chuyển dịch theo chiều chống lại tác động đó.",
    "relatedEquation": "Removing Product Forces 100% Forward Conversion",
    "iupacName": "Continuous Product Evacuation Surge Surge",
    "archetype": "LE_CHATELIER_EQUILIBRIUM",
    "structuredEffects": [
      {
        "effectId": "B19_EFF_15",
        "activationWindow": "QUICK",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Phép nhanh chuyển dịch cân bằng: Tăng 400 ATK cho toàn đội."
      }
    ]
  },
  {
    "id": "card_b19_016_quick_reversible_reaction_inversion_surge_16",
    "name": "Đảo Chiều Phản Ứng Thuận Nghịch (Phản Ứng Nhanh 2)",
    "name_en": "Reversible Reaction Inversion Surge (Quick-Play 2)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "QUICK_PLAY_SPELL",
    "spellSpeed": 2,
    "rarity": "SECRET_RARE",
    "attribute": "NOBLE_VOID",
    "manaCost": 4,
    "chemicalFormula": "v_rev > v_fwd",
    "effectCode": "SPELL_B19_REVERSIBLE_REACTION_INVERSION_SURGE_LECHAT_16",
    "effectText": "[Phép Nhanh / Quick-Play - Spell Speed 2]: Kích hoạt được trong lượt của đối thủ hoặc trong Chain. Chuyển dịch cân bằng hóa học: Tăng ngay 400 ATK cho 1 quái thú đồng minh hoặc giảm 400 ATK của 1 quái thú đối phương đang tấn công.",
    "scientificLore": "Nguyên lý Le Chatelier (SGK Hóa học 11 GDPT 2018): Khi tác động vào hệ cân bằng (nồng độ, nhiệt độ, áp suất), hệ sẽ tự chuyển dịch theo chiều chống lại tác động đó.",
    "relatedEquation": "Counter Shift Driving Reverse Chemical Reaction",
    "iupacName": "Reversible Reaction Inversion Surge Surge",
    "archetype": "WEAK_ACID_BUFFER",
    "structuredEffects": [
      {
        "effectId": "B19_EFF_16",
        "activationWindow": "QUICK",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Phép nhanh chuyển dịch cân bằng: Tăng 400 ATK cho toàn đội."
      }
    ]
  },
  {
    "id": "card_b19_017_quick_high_pressure_equilibrium_shift_17",
    "name": "Chuyển Dịch Tăng Áp Suất Khí (Phản Ứng Nhanh 3)",
    "name_en": "High Pressure Equilibrium Shift (Quick-Play 3)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "QUICK_PLAY_SPELL",
    "spellSpeed": 2,
    "rarity": "COMMON",
    "attribute": "AERO",
    "manaCost": 1,
    "chemicalFormula": "ΔP > 0",
    "effectCode": "SPELL_B19_HIGH_PRESSURE_EQUILIBRIUM_SHIFT_LECHAT_17",
    "effectText": "[Phép Nhanh / Quick-Play - Spell Speed 2]: Kích hoạt được trong lượt của đối thủ hoặc trong Chain. Chuyển dịch cân bằng hóa học: Tăng ngay 400 ATK cho 1 quái thú đồng minh hoặc giảm 400 ATK của 1 quái thú đối phương đang tấn công.",
    "scientificLore": "Nguyên lý Le Chatelier (SGK Hóa học 11 GDPT 2018): Khi tác động vào hệ cân bằng (nồng độ, nhiệt độ, áp suất), hệ sẽ tự chuyển dịch theo chiều chống lại tác động đó.",
    "relatedEquation": "Le Chatelier Shift towards Fewer Gas Moles",
    "iupacName": "High Pressure Equilibrium Shift Surge",
    "archetype": "LE_CHATELIER_EQUILIBRIUM",
    "structuredEffects": [
      {
        "effectId": "B19_EFF_17",
        "activationWindow": "QUICK",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Phép nhanh chuyển dịch cân bằng: Tăng 400 ATK cho toàn đội."
      }
    ]
  },
  {
    "id": "card_b19_018_quick_exothermic_temperature_drop_flash_18",
    "name": "Hạ Nhiệt Độ Phản Ứng Tỏa Nhiệt (Phản Ứng Nhanh 3)",
    "name_en": "Exothermic Temperature Drop Flash (Quick-Play 3)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "QUICK_PLAY_SPELL",
    "spellSpeed": 2,
    "rarity": "COMMON",
    "attribute": "AQUA",
    "manaCost": 2,
    "chemicalFormula": "ΔT < 0 (ΔH < 0)",
    "effectCode": "SPELL_B19_EXOTHERMIC_TEMPERATURE_DROP_FLASH_LECHAT_18",
    "effectText": "[Phép Nhanh / Quick-Play - Spell Speed 2]: Kích hoạt được trong lượt của đối thủ hoặc trong Chain. Chuyển dịch cân bằng hóa học: Tăng ngay 400 ATK cho 1 quái thú đồng minh hoặc giảm 400 ATK của 1 quái thú đối phương đang tấn công.",
    "scientificLore": "Nguyên lý Le Chatelier (SGK Hóa học 11 GDPT 2018): Khi tác động vào hệ cân bằng (nồng độ, nhiệt độ, áp suất), hệ sẽ tự chuyển dịch theo chiều chống lại tác động đó.",
    "relatedEquation": "Cooling Shifts Equilibrium Forward (Exothermic)",
    "iupacName": "Exothermic Temperature Drop Flash Surge",
    "archetype": "WEAK_ACID_BUFFER",
    "structuredEffects": [
      {
        "effectId": "B19_EFF_18",
        "activationWindow": "QUICK",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Phép nhanh chuyển dịch cân bằng: Tăng 400 ATK cho toàn đội."
      }
    ]
  },
  {
    "id": "card_b19_019_quick_reactant_concentration_surge_instant_19",
    "name": "Tăng Nồng Độ Tức Thời Chất Đầu (Phản Ứng Nhanh 3)",
    "name_en": "Reactant Concentration Surge Instant (Quick-Play 3)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "QUICK_PLAY_SPELL",
    "spellSpeed": 2,
    "rarity": "COMMON",
    "attribute": "PYRO",
    "manaCost": 3,
    "chemicalFormula": "[Reactant] ↑",
    "effectCode": "SPELL_B19_REACTANT_CONCENTRATION_SURGE_INSTANT_LECHAT_19",
    "effectText": "[Phép Nhanh / Quick-Play - Spell Speed 2]: Kích hoạt được trong lượt của đối thủ hoặc trong Chain. Chuyển dịch cân bằng hóa học: Tăng ngay 400 ATK cho 1 quái thú đồng minh hoặc giảm 400 ATK của 1 quái thú đối phương đang tấn công.",
    "scientificLore": "Nguyên lý Le Chatelier (SGK Hóa học 11 GDPT 2018): Khi tác động vào hệ cân bằng (nồng độ, nhiệt độ, áp suất), hệ sẽ tự chuyển dịch theo chiều chống lại tác động đó.",
    "relatedEquation": "Surge in Reactant Drives Forward Reaction Speed",
    "iupacName": "Reactant Concentration Surge Instant Surge",
    "archetype": "LE_CHATELIER_EQUILIBRIUM",
    "structuredEffects": [
      {
        "effectId": "B19_EFF_19",
        "activationWindow": "QUICK",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Phép nhanh chuyển dịch cân bằng: Tăng 400 ATK cho toàn đội."
      }
    ]
  },
  {
    "id": "card_b19_020_quick_common_ion_suppression_shift_20",
    "name": "Hiệu Ứng Ion Chung Kìm Hãm (Phản Ứng Nhanh 3)",
    "name_en": "Common-Ion Suppression Shift (Quick-Play 3)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "QUICK_PLAY_SPELL",
    "spellSpeed": 2,
    "rarity": "RARE",
    "attribute": "TERRA",
    "manaCost": 4,
    "chemicalFormula": "Common Ion",
    "effectCode": "SPELL_B19_COMMON_ION_SUPPRESSION_SHIFT_LECHAT_20",
    "effectText": "[Phép Nhanh / Quick-Play - Spell Speed 2]: Kích hoạt được trong lượt của đối thủ hoặc trong Chain. Chuyển dịch cân bằng hóa học: Tăng ngay 400 ATK cho 1 quái thú đồng minh hoặc giảm 400 ATK của 1 quái thú đối phương đang tấn công.",
    "scientificLore": "Nguyên lý Le Chatelier (SGK Hóa học 11 GDPT 2018): Khi tác động vào hệ cân bằng (nồng độ, nhiệt độ, áp suất), hệ sẽ tự chuyển dịch theo chiều chống lại tác động đó.",
    "relatedEquation": "Addition of Common Ion Decreases Salt Solubility",
    "iupacName": "Common-Ion Suppression Shift Surge",
    "archetype": "WEAK_ACID_BUFFER",
    "structuredEffects": [
      {
        "effectId": "B19_EFF_20",
        "activationWindow": "QUICK",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Phép nhanh chuyển dịch cân bằng: Tăng 400 ATK cho toàn đội."
      }
    ]
  },
  {
    "id": "card_b19_021_quick_acetic_buffer_dynamic_restoration_21",
    "name": "Đệm Axit Axetic Cân Bằng pH (Phản Ứng Nhanh 3)",
    "name_en": "Acetic Buffer Dynamic Restoration (Quick-Play 3)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "QUICK_PLAY_SPELL",
    "spellSpeed": 2,
    "rarity": "RARE",
    "attribute": "AQUA",
    "manaCost": 1,
    "chemicalFormula": "CH3COOH/CH3COO-",
    "effectCode": "SPELL_B19_ACETIC_BUFFER_DYNAMIC_RESTORATION_LECHAT_21",
    "effectText": "[Phép Nhanh / Quick-Play - Spell Speed 2]: Kích hoạt được trong lượt của đối thủ hoặc trong Chain. Chuyển dịch cân bằng hóa học: Tăng ngay 400 ATK cho 1 quái thú đồng minh hoặc giảm 400 ATK của 1 quái thú đối phương đang tấn công.",
    "scientificLore": "Nguyên lý Le Chatelier (SGK Hóa học 11 GDPT 2018): Khi tác động vào hệ cân bằng (nồng độ, nhiệt độ, áp suất), hệ sẽ tự chuyển dịch theo chiều chống lại tác động đó.",
    "relatedEquation": "Buffer Capacity Neutralizes Sudden H⁺/OH⁻ Influx",
    "iupacName": "Acetic Buffer Dynamic Restoration Surge",
    "archetype": "LE_CHATELIER_EQUILIBRIUM",
    "structuredEffects": [
      {
        "effectId": "B19_EFF_21",
        "activationWindow": "QUICK",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Phép nhanh chuyển dịch cân bằng: Tăng 400 ATK cho toàn đội."
      }
    ]
  },
  {
    "id": "card_b19_022_quick_equilibrium_constant_jump_pulse_22",
    "name": "Đột Biến Hằng Số Phản Ứng Kc (Phản Ứng Nhanh 3)",
    "name_en": "Equilibrium Constant Jump Pulse (Quick-Play 3)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "QUICK_PLAY_SPELL",
    "spellSpeed": 2,
    "rarity": "SUPER_RARE",
    "attribute": "ELECTRO",
    "manaCost": 2,
    "chemicalFormula": "Kc Mutation",
    "effectCode": "SPELL_B19_EQUILIBRIUM_CONSTANT_JUMP_PULSE_LECHAT_22",
    "effectText": "[Phép Nhanh / Quick-Play - Spell Speed 2]: Kích hoạt được trong lượt của đối thủ hoặc trong Chain. Chuyển dịch cân bằng hóa học: Tăng ngay 400 ATK cho 1 quái thú đồng minh hoặc giảm 400 ATK của 1 quái thú đối phương đang tấn công.",
    "scientificLore": "Nguyên lý Le Chatelier (SGK Hóa học 11 GDPT 2018): Khi tác động vào hệ cân bằng (nồng độ, nhiệt độ, áp suất), hệ sẽ tự chuyển dịch theo chiều chống lại tác động đó.",
    "relatedEquation": "Temperature Change Alters Equilibrium Constant Kc",
    "iupacName": "Equilibrium Constant Jump Pulse Surge",
    "archetype": "WEAK_ACID_BUFFER",
    "structuredEffects": [
      {
        "effectId": "B19_EFF_22",
        "activationWindow": "QUICK",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Phép nhanh chuyển dịch cân bằng: Tăng 400 ATK cho toàn đội."
      }
    ]
  },
  {
    "id": "card_b19_023_quick_continuous_product_evacuation_surge_23",
    "name": "Bơm Hút Sản Phẩm Kéo Theo (Phản Ứng Nhanh 3)",
    "name_en": "Continuous Product Evacuation Surge (Quick-Play 3)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "QUICK_PLAY_SPELL",
    "spellSpeed": 2,
    "rarity": "SUPER_RARE",
    "attribute": "AERO",
    "manaCost": 3,
    "chemicalFormula": "[Product] ↓",
    "effectCode": "SPELL_B19_CONTINUOUS_PRODUCT_EVACUATION_SURGE_LECHAT_23",
    "effectText": "[Phép Nhanh / Quick-Play - Spell Speed 2]: Kích hoạt được trong lượt của đối thủ hoặc trong Chain. Chuyển dịch cân bằng hóa học: Tăng ngay 400 ATK cho 1 quái thú đồng minh hoặc giảm 400 ATK của 1 quái thú đối phương đang tấn công.",
    "scientificLore": "Nguyên lý Le Chatelier (SGK Hóa học 11 GDPT 2018): Khi tác động vào hệ cân bằng (nồng độ, nhiệt độ, áp suất), hệ sẽ tự chuyển dịch theo chiều chống lại tác động đó.",
    "relatedEquation": "Removing Product Forces 100% Forward Conversion",
    "iupacName": "Continuous Product Evacuation Surge Surge",
    "archetype": "LE_CHATELIER_EQUILIBRIUM",
    "structuredEffects": [
      {
        "effectId": "B19_EFF_23",
        "activationWindow": "QUICK",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Phép nhanh chuyển dịch cân bằng: Tăng 400 ATK cho toàn đội."
      }
    ]
  },
  {
    "id": "card_b19_024_quick_reversible_reaction_inversion_surge_24",
    "name": "Đảo Chiều Phản Ứng Thuận Nghịch (Phản Ứng Nhanh 3)",
    "name_en": "Reversible Reaction Inversion Surge (Quick-Play 3)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "QUICK_PLAY_SPELL",
    "spellSpeed": 2,
    "rarity": "ULTRA_RARE",
    "attribute": "NOBLE_VOID",
    "manaCost": 4,
    "chemicalFormula": "v_rev > v_fwd",
    "effectCode": "SPELL_B19_REVERSIBLE_REACTION_INVERSION_SURGE_LECHAT_24",
    "effectText": "[Phép Nhanh / Quick-Play - Spell Speed 2]: Kích hoạt được trong lượt của đối thủ hoặc trong Chain. Chuyển dịch cân bằng hóa học: Tăng ngay 400 ATK cho 1 quái thú đồng minh hoặc giảm 400 ATK của 1 quái thú đối phương đang tấn công.",
    "scientificLore": "Nguyên lý Le Chatelier (SGK Hóa học 11 GDPT 2018): Khi tác động vào hệ cân bằng (nồng độ, nhiệt độ, áp suất), hệ sẽ tự chuyển dịch theo chiều chống lại tác động đó.",
    "relatedEquation": "Counter Shift Driving Reverse Chemical Reaction",
    "iupacName": "Reversible Reaction Inversion Surge Surge",
    "archetype": "WEAK_ACID_BUFFER",
    "structuredEffects": [
      {
        "effectId": "B19_EFF_24",
        "activationWindow": "QUICK",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Phép nhanh chuyển dịch cân bằng: Tăng 400 ATK cho toàn đội."
      }
    ]
  },
  {
    "id": "card_b19_025_quick_high_pressure_equilibrium_shift_25",
    "name": "Chuyển Dịch Tăng Áp Suất Khí (Phản Ứng Nhanh 4)",
    "name_en": "High Pressure Equilibrium Shift (Quick-Play 4)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "QUICK_PLAY_SPELL",
    "spellSpeed": 2,
    "rarity": "SECRET_RARE",
    "attribute": "AERO",
    "manaCost": 1,
    "chemicalFormula": "ΔP > 0",
    "effectCode": "SPELL_B19_HIGH_PRESSURE_EQUILIBRIUM_SHIFT_LECHAT_25",
    "effectText": "[Phép Nhanh / Quick-Play - Spell Speed 2]: Kích hoạt được trong lượt của đối thủ hoặc trong Chain. Chuyển dịch cân bằng hóa học: Tăng ngay 400 ATK cho 1 quái thú đồng minh hoặc giảm 400 ATK của 1 quái thú đối phương đang tấn công.",
    "scientificLore": "Nguyên lý Le Chatelier (SGK Hóa học 11 GDPT 2018): Khi tác động vào hệ cân bằng (nồng độ, nhiệt độ, áp suất), hệ sẽ tự chuyển dịch theo chiều chống lại tác động đó.",
    "relatedEquation": "Le Chatelier Shift towards Fewer Gas Moles",
    "iupacName": "High Pressure Equilibrium Shift Surge",
    "archetype": "LE_CHATELIER_EQUILIBRIUM",
    "structuredEffects": [
      {
        "effectId": "B19_EFF_25",
        "activationWindow": "QUICK",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Phép nhanh chuyển dịch cân bằng: Tăng 400 ATK cho toàn đội."
      }
    ]
  },
  {
    "id": "card_b19_026_quick_exothermic_temperature_drop_flash_26",
    "name": "Hạ Nhiệt Độ Phản Ứng Tỏa Nhiệt (Phản Ứng Nhanh 4)",
    "name_en": "Exothermic Temperature Drop Flash (Quick-Play 4)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "QUICK_PLAY_SPELL",
    "spellSpeed": 2,
    "rarity": "COMMON",
    "attribute": "AQUA",
    "manaCost": 2,
    "chemicalFormula": "ΔT < 0 (ΔH < 0)",
    "effectCode": "SPELL_B19_EXOTHERMIC_TEMPERATURE_DROP_FLASH_LECHAT_26",
    "effectText": "[Phép Nhanh / Quick-Play - Spell Speed 2]: Kích hoạt được trong lượt của đối thủ hoặc trong Chain. Chuyển dịch cân bằng hóa học: Tăng ngay 400 ATK cho 1 quái thú đồng minh hoặc giảm 400 ATK của 1 quái thú đối phương đang tấn công.",
    "scientificLore": "Nguyên lý Le Chatelier (SGK Hóa học 11 GDPT 2018): Khi tác động vào hệ cân bằng (nồng độ, nhiệt độ, áp suất), hệ sẽ tự chuyển dịch theo chiều chống lại tác động đó.",
    "relatedEquation": "Cooling Shifts Equilibrium Forward (Exothermic)",
    "iupacName": "Exothermic Temperature Drop Flash Surge",
    "archetype": "WEAK_ACID_BUFFER",
    "structuredEffects": [
      {
        "effectId": "B19_EFF_26",
        "activationWindow": "QUICK",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Phép nhanh chuyển dịch cân bằng: Tăng 400 ATK cho toàn đội."
      }
    ]
  },
  {
    "id": "card_b19_027_quick_reactant_concentration_surge_instant_27",
    "name": "Tăng Nồng Độ Tức Thời Chất Đầu (Phản Ứng Nhanh 4)",
    "name_en": "Reactant Concentration Surge Instant (Quick-Play 4)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "QUICK_PLAY_SPELL",
    "spellSpeed": 2,
    "rarity": "COMMON",
    "attribute": "PYRO",
    "manaCost": 3,
    "chemicalFormula": "[Reactant] ↑",
    "effectCode": "SPELL_B19_REACTANT_CONCENTRATION_SURGE_INSTANT_LECHAT_27",
    "effectText": "[Phép Nhanh / Quick-Play - Spell Speed 2]: Kích hoạt được trong lượt của đối thủ hoặc trong Chain. Chuyển dịch cân bằng hóa học: Tăng ngay 400 ATK cho 1 quái thú đồng minh hoặc giảm 400 ATK của 1 quái thú đối phương đang tấn công.",
    "scientificLore": "Nguyên lý Le Chatelier (SGK Hóa học 11 GDPT 2018): Khi tác động vào hệ cân bằng (nồng độ, nhiệt độ, áp suất), hệ sẽ tự chuyển dịch theo chiều chống lại tác động đó.",
    "relatedEquation": "Surge in Reactant Drives Forward Reaction Speed",
    "iupacName": "Reactant Concentration Surge Instant Surge",
    "archetype": "LE_CHATELIER_EQUILIBRIUM",
    "structuredEffects": [
      {
        "effectId": "B19_EFF_27",
        "activationWindow": "QUICK",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Phép nhanh chuyển dịch cân bằng: Tăng 400 ATK cho toàn đội."
      }
    ]
  },
  {
    "id": "card_b19_028_quick_common_ion_suppression_shift_28",
    "name": "Hiệu Ứng Ion Chung Kìm Hãm (Phản Ứng Nhanh 4)",
    "name_en": "Common-Ion Suppression Shift (Quick-Play 4)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "QUICK_PLAY_SPELL",
    "spellSpeed": 2,
    "rarity": "COMMON",
    "attribute": "TERRA",
    "manaCost": 4,
    "chemicalFormula": "Common Ion",
    "effectCode": "SPELL_B19_COMMON_ION_SUPPRESSION_SHIFT_LECHAT_28",
    "effectText": "[Phép Nhanh / Quick-Play - Spell Speed 2]: Kích hoạt được trong lượt của đối thủ hoặc trong Chain. Chuyển dịch cân bằng hóa học: Tăng ngay 400 ATK cho 1 quái thú đồng minh hoặc giảm 400 ATK của 1 quái thú đối phương đang tấn công.",
    "scientificLore": "Nguyên lý Le Chatelier (SGK Hóa học 11 GDPT 2018): Khi tác động vào hệ cân bằng (nồng độ, nhiệt độ, áp suất), hệ sẽ tự chuyển dịch theo chiều chống lại tác động đó.",
    "relatedEquation": "Addition of Common Ion Decreases Salt Solubility",
    "iupacName": "Common-Ion Suppression Shift Surge",
    "archetype": "WEAK_ACID_BUFFER",
    "structuredEffects": [
      {
        "effectId": "B19_EFF_28",
        "activationWindow": "QUICK",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Phép nhanh chuyển dịch cân bằng: Tăng 400 ATK cho toàn đội."
      }
    ]
  },
  {
    "id": "card_b19_029_quick_acetic_buffer_dynamic_restoration_29",
    "name": "Đệm Axit Axetic Cân Bằng pH (Phản Ứng Nhanh 4)",
    "name_en": "Acetic Buffer Dynamic Restoration (Quick-Play 4)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "QUICK_PLAY_SPELL",
    "spellSpeed": 2,
    "rarity": "RARE",
    "attribute": "AQUA",
    "manaCost": 1,
    "chemicalFormula": "CH3COOH/CH3COO-",
    "effectCode": "SPELL_B19_ACETIC_BUFFER_DYNAMIC_RESTORATION_LECHAT_29",
    "effectText": "[Phép Nhanh / Quick-Play - Spell Speed 2]: Kích hoạt được trong lượt của đối thủ hoặc trong Chain. Chuyển dịch cân bằng hóa học: Tăng ngay 400 ATK cho 1 quái thú đồng minh hoặc giảm 400 ATK của 1 quái thú đối phương đang tấn công.",
    "scientificLore": "Nguyên lý Le Chatelier (SGK Hóa học 11 GDPT 2018): Khi tác động vào hệ cân bằng (nồng độ, nhiệt độ, áp suất), hệ sẽ tự chuyển dịch theo chiều chống lại tác động đó.",
    "relatedEquation": "Buffer Capacity Neutralizes Sudden H⁺/OH⁻ Influx",
    "iupacName": "Acetic Buffer Dynamic Restoration Surge",
    "archetype": "LE_CHATELIER_EQUILIBRIUM",
    "structuredEffects": [
      {
        "effectId": "B19_EFF_29",
        "activationWindow": "QUICK",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Phép nhanh chuyển dịch cân bằng: Tăng 400 ATK cho toàn đội."
      }
    ]
  },
  {
    "id": "card_b19_030_quick_equilibrium_constant_jump_pulse_30",
    "name": "Đột Biến Hằng Số Phản Ứng Kc (Phản Ứng Nhanh 4)",
    "name_en": "Equilibrium Constant Jump Pulse (Quick-Play 4)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "QUICK_PLAY_SPELL",
    "spellSpeed": 2,
    "rarity": "RARE",
    "attribute": "ELECTRO",
    "manaCost": 2,
    "chemicalFormula": "Kc Mutation",
    "effectCode": "SPELL_B19_EQUILIBRIUM_CONSTANT_JUMP_PULSE_LECHAT_30",
    "effectText": "[Phép Nhanh / Quick-Play - Spell Speed 2]: Kích hoạt được trong lượt của đối thủ hoặc trong Chain. Chuyển dịch cân bằng hóa học: Tăng ngay 400 ATK cho 1 quái thú đồng minh hoặc giảm 400 ATK của 1 quái thú đối phương đang tấn công.",
    "scientificLore": "Nguyên lý Le Chatelier (SGK Hóa học 11 GDPT 2018): Khi tác động vào hệ cân bằng (nồng độ, nhiệt độ, áp suất), hệ sẽ tự chuyển dịch theo chiều chống lại tác động đó.",
    "relatedEquation": "Temperature Change Alters Equilibrium Constant Kc",
    "iupacName": "Equilibrium Constant Jump Pulse Surge",
    "archetype": "WEAK_ACID_BUFFER",
    "structuredEffects": [
      {
        "effectId": "B19_EFF_30",
        "activationWindow": "QUICK",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Phép nhanh chuyển dịch cân bằng: Tăng 400 ATK cho toàn đội."
      }
    ]
  },
  {
    "id": "card_b19_031_quick_continuous_product_evacuation_surge_31",
    "name": "Bơm Hút Sản Phẩm Kéo Theo (Phản Ứng Nhanh 4)",
    "name_en": "Continuous Product Evacuation Surge (Quick-Play 4)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "QUICK_PLAY_SPELL",
    "spellSpeed": 2,
    "rarity": "SUPER_RARE",
    "attribute": "AERO",
    "manaCost": 3,
    "chemicalFormula": "[Product] ↓",
    "effectCode": "SPELL_B19_CONTINUOUS_PRODUCT_EVACUATION_SURGE_LECHAT_31",
    "effectText": "[Phép Nhanh / Quick-Play - Spell Speed 2]: Kích hoạt được trong lượt của đối thủ hoặc trong Chain. Chuyển dịch cân bằng hóa học: Tăng ngay 400 ATK cho 1 quái thú đồng minh hoặc giảm 400 ATK của 1 quái thú đối phương đang tấn công.",
    "scientificLore": "Nguyên lý Le Chatelier (SGK Hóa học 11 GDPT 2018): Khi tác động vào hệ cân bằng (nồng độ, nhiệt độ, áp suất), hệ sẽ tự chuyển dịch theo chiều chống lại tác động đó.",
    "relatedEquation": "Removing Product Forces 100% Forward Conversion",
    "iupacName": "Continuous Product Evacuation Surge Surge",
    "archetype": "LE_CHATELIER_EQUILIBRIUM",
    "structuredEffects": [
      {
        "effectId": "B19_EFF_31",
        "activationWindow": "QUICK",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Phép nhanh chuyển dịch cân bằng: Tăng 400 ATK cho toàn đội."
      }
    ]
  },
  {
    "id": "card_b19_032_quick_reversible_reaction_inversion_surge_32",
    "name": "Đảo Chiều Phản Ứng Thuận Nghịch (Phản Ứng Nhanh 4)",
    "name_en": "Reversible Reaction Inversion Surge (Quick-Play 4)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "QUICK_PLAY_SPELL",
    "spellSpeed": 2,
    "rarity": "SUPER_RARE",
    "attribute": "NOBLE_VOID",
    "manaCost": 4,
    "chemicalFormula": "v_rev > v_fwd",
    "effectCode": "SPELL_B19_REVERSIBLE_REACTION_INVERSION_SURGE_LECHAT_32",
    "effectText": "[Phép Nhanh / Quick-Play - Spell Speed 2]: Kích hoạt được trong lượt của đối thủ hoặc trong Chain. Chuyển dịch cân bằng hóa học: Tăng ngay 400 ATK cho 1 quái thú đồng minh hoặc giảm 400 ATK của 1 quái thú đối phương đang tấn công.",
    "scientificLore": "Nguyên lý Le Chatelier (SGK Hóa học 11 GDPT 2018): Khi tác động vào hệ cân bằng (nồng độ, nhiệt độ, áp suất), hệ sẽ tự chuyển dịch theo chiều chống lại tác động đó.",
    "relatedEquation": "Counter Shift Driving Reverse Chemical Reaction",
    "iupacName": "Reversible Reaction Inversion Surge Surge",
    "archetype": "WEAK_ACID_BUFFER",
    "structuredEffects": [
      {
        "effectId": "B19_EFF_32",
        "activationWindow": "QUICK",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Phép nhanh chuyển dịch cân bằng: Tăng 400 ATK cho toàn đội."
      }
    ]
  },
  {
    "id": "card_b19_033_quick_high_pressure_equilibrium_shift_33",
    "name": "Chuyển Dịch Tăng Áp Suất Khí (Phản Ứng Nhanh 5)",
    "name_en": "High Pressure Equilibrium Shift (Quick-Play 5)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "QUICK_PLAY_SPELL",
    "spellSpeed": 2,
    "rarity": "ULTRA_RARE",
    "attribute": "AERO",
    "manaCost": 1,
    "chemicalFormula": "ΔP > 0",
    "effectCode": "SPELL_B19_HIGH_PRESSURE_EQUILIBRIUM_SHIFT_LECHAT_33",
    "effectText": "[Phép Nhanh / Quick-Play - Spell Speed 2]: Kích hoạt được trong lượt của đối thủ hoặc trong Chain. Chuyển dịch cân bằng hóa học: Tăng ngay 400 ATK cho 1 quái thú đồng minh hoặc giảm 400 ATK của 1 quái thú đối phương đang tấn công.",
    "scientificLore": "Nguyên lý Le Chatelier (SGK Hóa học 11 GDPT 2018): Khi tác động vào hệ cân bằng (nồng độ, nhiệt độ, áp suất), hệ sẽ tự chuyển dịch theo chiều chống lại tác động đó.",
    "relatedEquation": "Le Chatelier Shift towards Fewer Gas Moles",
    "iupacName": "High Pressure Equilibrium Shift Surge",
    "archetype": "LE_CHATELIER_EQUILIBRIUM",
    "structuredEffects": [
      {
        "effectId": "B19_EFF_33",
        "activationWindow": "QUICK",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Phép nhanh chuyển dịch cân bằng: Tăng 400 ATK cho toàn đội."
      }
    ]
  },
  {
    "id": "card_b19_034_quick_exothermic_temperature_drop_flash_34",
    "name": "Hạ Nhiệt Độ Phản Ứng Tỏa Nhiệt (Phản Ứng Nhanh 5)",
    "name_en": "Exothermic Temperature Drop Flash (Quick-Play 5)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "QUICK_PLAY_SPELL",
    "spellSpeed": 2,
    "rarity": "SECRET_RARE",
    "attribute": "AQUA",
    "manaCost": 2,
    "chemicalFormula": "ΔT < 0 (ΔH < 0)",
    "effectCode": "SPELL_B19_EXOTHERMIC_TEMPERATURE_DROP_FLASH_LECHAT_34",
    "effectText": "[Phép Nhanh / Quick-Play - Spell Speed 2]: Kích hoạt được trong lượt của đối thủ hoặc trong Chain. Chuyển dịch cân bằng hóa học: Tăng ngay 400 ATK cho 1 quái thú đồng minh hoặc giảm 400 ATK của 1 quái thú đối phương đang tấn công.",
    "scientificLore": "Nguyên lý Le Chatelier (SGK Hóa học 11 GDPT 2018): Khi tác động vào hệ cân bằng (nồng độ, nhiệt độ, áp suất), hệ sẽ tự chuyển dịch theo chiều chống lại tác động đó.",
    "relatedEquation": "Cooling Shifts Equilibrium Forward (Exothermic)",
    "iupacName": "Exothermic Temperature Drop Flash Surge",
    "archetype": "WEAK_ACID_BUFFER",
    "structuredEffects": [
      {
        "effectId": "B19_EFF_34",
        "activationWindow": "QUICK",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Phép nhanh chuyển dịch cân bằng: Tăng 400 ATK cho toàn đội."
      }
    ]
  },
  {
    "id": "card_b19_035_quick_reactant_concentration_surge_instant_35",
    "name": "Tăng Nồng Độ Tức Thời Chất Đầu (Phản Ứng Nhanh 5)",
    "name_en": "Reactant Concentration Surge Instant (Quick-Play 5)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "QUICK_PLAY_SPELL",
    "spellSpeed": 2,
    "rarity": "COMMON",
    "attribute": "PYRO",
    "manaCost": 3,
    "chemicalFormula": "[Reactant] ↑",
    "effectCode": "SPELL_B19_REACTANT_CONCENTRATION_SURGE_INSTANT_LECHAT_35",
    "effectText": "[Phép Nhanh / Quick-Play - Spell Speed 2]: Kích hoạt được trong lượt của đối thủ hoặc trong Chain. Chuyển dịch cân bằng hóa học: Tăng ngay 400 ATK cho 1 quái thú đồng minh hoặc giảm 400 ATK của 1 quái thú đối phương đang tấn công.",
    "scientificLore": "Nguyên lý Le Chatelier (SGK Hóa học 11 GDPT 2018): Khi tác động vào hệ cân bằng (nồng độ, nhiệt độ, áp suất), hệ sẽ tự chuyển dịch theo chiều chống lại tác động đó.",
    "relatedEquation": "Surge in Reactant Drives Forward Reaction Speed",
    "iupacName": "Reactant Concentration Surge Instant Surge",
    "archetype": "LE_CHATELIER_EQUILIBRIUM",
    "structuredEffects": [
      {
        "effectId": "B19_EFF_35",
        "activationWindow": "QUICK",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Phép nhanh chuyển dịch cân bằng: Tăng 400 ATK cho toàn đội."
      }
    ]
  },
  {
    "id": "card_b19_036_quick_common_ion_suppression_shift_36",
    "name": "Hiệu Ứng Ion Chung Kìm Hãm (Phản Ứng Nhanh 5)",
    "name_en": "Common-Ion Suppression Shift (Quick-Play 5)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "QUICK_PLAY_SPELL",
    "spellSpeed": 2,
    "rarity": "COMMON",
    "attribute": "TERRA",
    "manaCost": 4,
    "chemicalFormula": "Common Ion",
    "effectCode": "SPELL_B19_COMMON_ION_SUPPRESSION_SHIFT_LECHAT_36",
    "effectText": "[Phép Nhanh / Quick-Play - Spell Speed 2]: Kích hoạt được trong lượt của đối thủ hoặc trong Chain. Chuyển dịch cân bằng hóa học: Tăng ngay 400 ATK cho 1 quái thú đồng minh hoặc giảm 400 ATK của 1 quái thú đối phương đang tấn công.",
    "scientificLore": "Nguyên lý Le Chatelier (SGK Hóa học 11 GDPT 2018): Khi tác động vào hệ cân bằng (nồng độ, nhiệt độ, áp suất), hệ sẽ tự chuyển dịch theo chiều chống lại tác động đó.",
    "relatedEquation": "Addition of Common Ion Decreases Salt Solubility",
    "iupacName": "Common-Ion Suppression Shift Surge",
    "archetype": "WEAK_ACID_BUFFER",
    "structuredEffects": [
      {
        "effectId": "B19_EFF_36",
        "activationWindow": "QUICK",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Phép nhanh chuyển dịch cân bằng: Tăng 400 ATK cho toàn đội."
      }
    ]
  },
  {
    "id": "card_b19_037_quick_acetic_buffer_dynamic_restoration_37",
    "name": "Đệm Axit Axetic Cân Bằng pH (Phản Ứng Nhanh 5)",
    "name_en": "Acetic Buffer Dynamic Restoration (Quick-Play 5)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "QUICK_PLAY_SPELL",
    "spellSpeed": 2,
    "rarity": "COMMON",
    "attribute": "AQUA",
    "manaCost": 1,
    "chemicalFormula": "CH3COOH/CH3COO-",
    "effectCode": "SPELL_B19_ACETIC_BUFFER_DYNAMIC_RESTORATION_LECHAT_37",
    "effectText": "[Phép Nhanh / Quick-Play - Spell Speed 2]: Kích hoạt được trong lượt của đối thủ hoặc trong Chain. Chuyển dịch cân bằng hóa học: Tăng ngay 400 ATK cho 1 quái thú đồng minh hoặc giảm 400 ATK của 1 quái thú đối phương đang tấn công.",
    "scientificLore": "Nguyên lý Le Chatelier (SGK Hóa học 11 GDPT 2018): Khi tác động vào hệ cân bằng (nồng độ, nhiệt độ, áp suất), hệ sẽ tự chuyển dịch theo chiều chống lại tác động đó.",
    "relatedEquation": "Buffer Capacity Neutralizes Sudden H⁺/OH⁻ Influx",
    "iupacName": "Acetic Buffer Dynamic Restoration Surge",
    "archetype": "LE_CHATELIER_EQUILIBRIUM",
    "structuredEffects": [
      {
        "effectId": "B19_EFF_37",
        "activationWindow": "QUICK",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Phép nhanh chuyển dịch cân bằng: Tăng 400 ATK cho toàn đội."
      }
    ]
  },
  {
    "id": "card_b19_038_quick_equilibrium_constant_jump_pulse_38",
    "name": "Đột Biến Hằng Số Phản Ứng Kc (Phản Ứng Nhanh 5)",
    "name_en": "Equilibrium Constant Jump Pulse (Quick-Play 5)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "QUICK_PLAY_SPELL",
    "spellSpeed": 2,
    "rarity": "RARE",
    "attribute": "ELECTRO",
    "manaCost": 2,
    "chemicalFormula": "Kc Mutation",
    "effectCode": "SPELL_B19_EQUILIBRIUM_CONSTANT_JUMP_PULSE_LECHAT_38",
    "effectText": "[Phép Nhanh / Quick-Play - Spell Speed 2]: Kích hoạt được trong lượt của đối thủ hoặc trong Chain. Chuyển dịch cân bằng hóa học: Tăng ngay 400 ATK cho 1 quái thú đồng minh hoặc giảm 400 ATK của 1 quái thú đối phương đang tấn công.",
    "scientificLore": "Nguyên lý Le Chatelier (SGK Hóa học 11 GDPT 2018): Khi tác động vào hệ cân bằng (nồng độ, nhiệt độ, áp suất), hệ sẽ tự chuyển dịch theo chiều chống lại tác động đó.",
    "relatedEquation": "Temperature Change Alters Equilibrium Constant Kc",
    "iupacName": "Equilibrium Constant Jump Pulse Surge",
    "archetype": "WEAK_ACID_BUFFER",
    "structuredEffects": [
      {
        "effectId": "B19_EFF_38",
        "activationWindow": "QUICK",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Phép nhanh chuyển dịch cân bằng: Tăng 400 ATK cho toàn đội."
      }
    ]
  },
  {
    "id": "card_b19_039_quick_continuous_product_evacuation_surge_39",
    "name": "Bơm Hút Sản Phẩm Kéo Theo (Phản Ứng Nhanh 5)",
    "name_en": "Continuous Product Evacuation Surge (Quick-Play 5)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "QUICK_PLAY_SPELL",
    "spellSpeed": 2,
    "rarity": "RARE",
    "attribute": "AERO",
    "manaCost": 3,
    "chemicalFormula": "[Product] ↓",
    "effectCode": "SPELL_B19_CONTINUOUS_PRODUCT_EVACUATION_SURGE_LECHAT_39",
    "effectText": "[Phép Nhanh / Quick-Play - Spell Speed 2]: Kích hoạt được trong lượt của đối thủ hoặc trong Chain. Chuyển dịch cân bằng hóa học: Tăng ngay 400 ATK cho 1 quái thú đồng minh hoặc giảm 400 ATK của 1 quái thú đối phương đang tấn công.",
    "scientificLore": "Nguyên lý Le Chatelier (SGK Hóa học 11 GDPT 2018): Khi tác động vào hệ cân bằng (nồng độ, nhiệt độ, áp suất), hệ sẽ tự chuyển dịch theo chiều chống lại tác động đó.",
    "relatedEquation": "Removing Product Forces 100% Forward Conversion",
    "iupacName": "Continuous Product Evacuation Surge Surge",
    "archetype": "LE_CHATELIER_EQUILIBRIUM",
    "structuredEffects": [
      {
        "effectId": "B19_EFF_39",
        "activationWindow": "QUICK",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Phép nhanh chuyển dịch cân bằng: Tăng 400 ATK cho toàn đội."
      }
    ]
  },
  {
    "id": "card_b19_040_quick_reversible_reaction_inversion_surge_40",
    "name": "Đảo Chiều Phản Ứng Thuận Nghịch (Phản Ứng Nhanh 5)",
    "name_en": "Reversible Reaction Inversion Surge (Quick-Play 5)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "QUICK_PLAY_SPELL",
    "spellSpeed": 2,
    "rarity": "SUPER_RARE",
    "attribute": "NOBLE_VOID",
    "manaCost": 4,
    "chemicalFormula": "v_rev > v_fwd",
    "effectCode": "SPELL_B19_REVERSIBLE_REACTION_INVERSION_SURGE_LECHAT_40",
    "effectText": "[Phép Nhanh / Quick-Play - Spell Speed 2]: Kích hoạt được trong lượt của đối thủ hoặc trong Chain. Chuyển dịch cân bằng hóa học: Tăng ngay 400 ATK cho 1 quái thú đồng minh hoặc giảm 400 ATK của 1 quái thú đối phương đang tấn công.",
    "scientificLore": "Nguyên lý Le Chatelier (SGK Hóa học 11 GDPT 2018): Khi tác động vào hệ cân bằng (nồng độ, nhiệt độ, áp suất), hệ sẽ tự chuyển dịch theo chiều chống lại tác động đó.",
    "relatedEquation": "Counter Shift Driving Reverse Chemical Reaction",
    "iupacName": "Reversible Reaction Inversion Surge Surge",
    "archetype": "WEAK_ACID_BUFFER",
    "structuredEffects": [
      {
        "effectId": "B19_EFF_40",
        "activationWindow": "QUICK",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Phép nhanh chuyển dịch cân bằng: Tăng 400 ATK cho toàn đội."
      }
    ]
  },
  {
    "id": "card_b19_041_quick_high_pressure_equilibrium_shift_41",
    "name": "Chuyển Dịch Tăng Áp Suất Khí (Phản Ứng Nhanh 6)",
    "name_en": "High Pressure Equilibrium Shift (Quick-Play 6)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "QUICK_PLAY_SPELL",
    "spellSpeed": 2,
    "rarity": "SUPER_RARE",
    "attribute": "AERO",
    "manaCost": 1,
    "chemicalFormula": "ΔP > 0",
    "effectCode": "SPELL_B19_HIGH_PRESSURE_EQUILIBRIUM_SHIFT_LECHAT_41",
    "effectText": "[Phép Nhanh / Quick-Play - Spell Speed 2]: Kích hoạt được trong lượt của đối thủ hoặc trong Chain. Chuyển dịch cân bằng hóa học: Tăng ngay 400 ATK cho 1 quái thú đồng minh hoặc giảm 400 ATK của 1 quái thú đối phương đang tấn công.",
    "scientificLore": "Nguyên lý Le Chatelier (SGK Hóa học 11 GDPT 2018): Khi tác động vào hệ cân bằng (nồng độ, nhiệt độ, áp suất), hệ sẽ tự chuyển dịch theo chiều chống lại tác động đó.",
    "relatedEquation": "Le Chatelier Shift towards Fewer Gas Moles",
    "iupacName": "High Pressure Equilibrium Shift Surge",
    "archetype": "LE_CHATELIER_EQUILIBRIUM",
    "structuredEffects": [
      {
        "effectId": "B19_EFF_41",
        "activationWindow": "QUICK",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Phép nhanh chuyển dịch cân bằng: Tăng 400 ATK cho toàn đội."
      }
    ]
  },
  {
    "id": "card_b19_042_quick_exothermic_temperature_drop_flash_42",
    "name": "Hạ Nhiệt Độ Phản Ứng Tỏa Nhiệt (Phản Ứng Nhanh 6)",
    "name_en": "Exothermic Temperature Drop Flash (Quick-Play 6)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "QUICK_PLAY_SPELL",
    "spellSpeed": 2,
    "rarity": "ULTRA_RARE",
    "attribute": "AQUA",
    "manaCost": 2,
    "chemicalFormula": "ΔT < 0 (ΔH < 0)",
    "effectCode": "SPELL_B19_EXOTHERMIC_TEMPERATURE_DROP_FLASH_LECHAT_42",
    "effectText": "[Phép Nhanh / Quick-Play - Spell Speed 2]: Kích hoạt được trong lượt của đối thủ hoặc trong Chain. Chuyển dịch cân bằng hóa học: Tăng ngay 400 ATK cho 1 quái thú đồng minh hoặc giảm 400 ATK của 1 quái thú đối phương đang tấn công.",
    "scientificLore": "Nguyên lý Le Chatelier (SGK Hóa học 11 GDPT 2018): Khi tác động vào hệ cân bằng (nồng độ, nhiệt độ, áp suất), hệ sẽ tự chuyển dịch theo chiều chống lại tác động đó.",
    "relatedEquation": "Cooling Shifts Equilibrium Forward (Exothermic)",
    "iupacName": "Exothermic Temperature Drop Flash Surge",
    "archetype": "WEAK_ACID_BUFFER",
    "structuredEffects": [
      {
        "effectId": "B19_EFF_42",
        "activationWindow": "QUICK",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Phép nhanh chuyển dịch cân bằng: Tăng 400 ATK cho toàn đội."
      }
    ]
  },
  {
    "id": "card_b19_043_quick_reactant_concentration_surge_instant_43",
    "name": "Tăng Nồng Độ Tức Thời Chất Đầu (Phản Ứng Nhanh 6)",
    "name_en": "Reactant Concentration Surge Instant (Quick-Play 6)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "QUICK_PLAY_SPELL",
    "spellSpeed": 2,
    "rarity": "SECRET_RARE",
    "attribute": "PYRO",
    "manaCost": 3,
    "chemicalFormula": "[Reactant] ↑",
    "effectCode": "SPELL_B19_REACTANT_CONCENTRATION_SURGE_INSTANT_LECHAT_43",
    "effectText": "[Phép Nhanh / Quick-Play - Spell Speed 2]: Kích hoạt được trong lượt của đối thủ hoặc trong Chain. Chuyển dịch cân bằng hóa học: Tăng ngay 400 ATK cho 1 quái thú đồng minh hoặc giảm 400 ATK của 1 quái thú đối phương đang tấn công.",
    "scientificLore": "Nguyên lý Le Chatelier (SGK Hóa học 11 GDPT 2018): Khi tác động vào hệ cân bằng (nồng độ, nhiệt độ, áp suất), hệ sẽ tự chuyển dịch theo chiều chống lại tác động đó.",
    "relatedEquation": "Surge in Reactant Drives Forward Reaction Speed",
    "iupacName": "Reactant Concentration Surge Instant Surge",
    "archetype": "LE_CHATELIER_EQUILIBRIUM",
    "structuredEffects": [
      {
        "effectId": "B19_EFF_43",
        "activationWindow": "QUICK",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Phép nhanh chuyển dịch cân bằng: Tăng 400 ATK cho toàn đội."
      }
    ]
  },
  {
    "id": "card_b19_044_quick_common_ion_suppression_shift_44",
    "name": "Hiệu Ứng Ion Chung Kìm Hãm (Phản Ứng Nhanh 6)",
    "name_en": "Common-Ion Suppression Shift (Quick-Play 6)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "QUICK_PLAY_SPELL",
    "spellSpeed": 2,
    "rarity": "COMMON",
    "attribute": "TERRA",
    "manaCost": 4,
    "chemicalFormula": "Common Ion",
    "effectCode": "SPELL_B19_COMMON_ION_SUPPRESSION_SHIFT_LECHAT_44",
    "effectText": "[Phép Nhanh / Quick-Play - Spell Speed 2]: Kích hoạt được trong lượt của đối thủ hoặc trong Chain. Chuyển dịch cân bằng hóa học: Tăng ngay 400 ATK cho 1 quái thú đồng minh hoặc giảm 400 ATK của 1 quái thú đối phương đang tấn công.",
    "scientificLore": "Nguyên lý Le Chatelier (SGK Hóa học 11 GDPT 2018): Khi tác động vào hệ cân bằng (nồng độ, nhiệt độ, áp suất), hệ sẽ tự chuyển dịch theo chiều chống lại tác động đó.",
    "relatedEquation": "Addition of Common Ion Decreases Salt Solubility",
    "iupacName": "Common-Ion Suppression Shift Surge",
    "archetype": "WEAK_ACID_BUFFER",
    "structuredEffects": [
      {
        "effectId": "B19_EFF_44",
        "activationWindow": "QUICK",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Phép nhanh chuyển dịch cân bằng: Tăng 400 ATK cho toàn đội."
      }
    ]
  },
  {
    "id": "card_b19_045_quick_acetic_buffer_dynamic_restoration_45",
    "name": "Đệm Axit Axetic Cân Bằng pH (Phản Ứng Nhanh 6)",
    "name_en": "Acetic Buffer Dynamic Restoration (Quick-Play 6)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "QUICK_PLAY_SPELL",
    "spellSpeed": 2,
    "rarity": "COMMON",
    "attribute": "AQUA",
    "manaCost": 1,
    "chemicalFormula": "CH3COOH/CH3COO-",
    "effectCode": "SPELL_B19_ACETIC_BUFFER_DYNAMIC_RESTORATION_LECHAT_45",
    "effectText": "[Phép Nhanh / Quick-Play - Spell Speed 2]: Kích hoạt được trong lượt của đối thủ hoặc trong Chain. Chuyển dịch cân bằng hóa học: Tăng ngay 400 ATK cho 1 quái thú đồng minh hoặc giảm 400 ATK của 1 quái thú đối phương đang tấn công.",
    "scientificLore": "Nguyên lý Le Chatelier (SGK Hóa học 11 GDPT 2018): Khi tác động vào hệ cân bằng (nồng độ, nhiệt độ, áp suất), hệ sẽ tự chuyển dịch theo chiều chống lại tác động đó.",
    "relatedEquation": "Buffer Capacity Neutralizes Sudden H⁺/OH⁻ Influx",
    "iupacName": "Acetic Buffer Dynamic Restoration Surge",
    "archetype": "LE_CHATELIER_EQUILIBRIUM",
    "structuredEffects": [
      {
        "effectId": "B19_EFF_45",
        "activationWindow": "QUICK",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Phép nhanh chuyển dịch cân bằng: Tăng 400 ATK cho toàn đội."
      }
    ]
  },
  {
    "id": "card_b19_046_quick_equilibrium_constant_jump_pulse_46",
    "name": "Đột Biến Hằng Số Phản Ứng Kc (Phản Ứng Nhanh 6)",
    "name_en": "Equilibrium Constant Jump Pulse (Quick-Play 6)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "QUICK_PLAY_SPELL",
    "spellSpeed": 2,
    "rarity": "COMMON",
    "attribute": "ELECTRO",
    "manaCost": 2,
    "chemicalFormula": "Kc Mutation",
    "effectCode": "SPELL_B19_EQUILIBRIUM_CONSTANT_JUMP_PULSE_LECHAT_46",
    "effectText": "[Phép Nhanh / Quick-Play - Spell Speed 2]: Kích hoạt được trong lượt của đối thủ hoặc trong Chain. Chuyển dịch cân bằng hóa học: Tăng ngay 400 ATK cho 1 quái thú đồng minh hoặc giảm 400 ATK của 1 quái thú đối phương đang tấn công.",
    "scientificLore": "Nguyên lý Le Chatelier (SGK Hóa học 11 GDPT 2018): Khi tác động vào hệ cân bằng (nồng độ, nhiệt độ, áp suất), hệ sẽ tự chuyển dịch theo chiều chống lại tác động đó.",
    "relatedEquation": "Temperature Change Alters Equilibrium Constant Kc",
    "iupacName": "Equilibrium Constant Jump Pulse Surge",
    "archetype": "WEAK_ACID_BUFFER",
    "structuredEffects": [
      {
        "effectId": "B19_EFF_46",
        "activationWindow": "QUICK",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Phép nhanh chuyển dịch cân bằng: Tăng 400 ATK cho toàn đội."
      }
    ]
  },
  {
    "id": "card_b19_047_quick_continuous_product_evacuation_surge_47",
    "name": "Bơm Hút Sản Phẩm Kéo Theo (Phản Ứng Nhanh 6)",
    "name_en": "Continuous Product Evacuation Surge (Quick-Play 6)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "QUICK_PLAY_SPELL",
    "spellSpeed": 2,
    "rarity": "RARE",
    "attribute": "AERO",
    "manaCost": 3,
    "chemicalFormula": "[Product] ↓",
    "effectCode": "SPELL_B19_CONTINUOUS_PRODUCT_EVACUATION_SURGE_LECHAT_47",
    "effectText": "[Phép Nhanh / Quick-Play - Spell Speed 2]: Kích hoạt được trong lượt của đối thủ hoặc trong Chain. Chuyển dịch cân bằng hóa học: Tăng ngay 400 ATK cho 1 quái thú đồng minh hoặc giảm 400 ATK của 1 quái thú đối phương đang tấn công.",
    "scientificLore": "Nguyên lý Le Chatelier (SGK Hóa học 11 GDPT 2018): Khi tác động vào hệ cân bằng (nồng độ, nhiệt độ, áp suất), hệ sẽ tự chuyển dịch theo chiều chống lại tác động đó.",
    "relatedEquation": "Removing Product Forces 100% Forward Conversion",
    "iupacName": "Continuous Product Evacuation Surge Surge",
    "archetype": "LE_CHATELIER_EQUILIBRIUM",
    "structuredEffects": [
      {
        "effectId": "B19_EFF_47",
        "activationWindow": "QUICK",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Phép nhanh chuyển dịch cân bằng: Tăng 400 ATK cho toàn đội."
      }
    ]
  },
  {
    "id": "card_b19_048_quick_reversible_reaction_inversion_surge_48",
    "name": "Đảo Chiều Phản Ứng Thuận Nghịch (Phản Ứng Nhanh 6)",
    "name_en": "Reversible Reaction Inversion Surge (Quick-Play 6)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "QUICK_PLAY_SPELL",
    "spellSpeed": 2,
    "rarity": "RARE",
    "attribute": "NOBLE_VOID",
    "manaCost": 4,
    "chemicalFormula": "v_rev > v_fwd",
    "effectCode": "SPELL_B19_REVERSIBLE_REACTION_INVERSION_SURGE_LECHAT_48",
    "effectText": "[Phép Nhanh / Quick-Play - Spell Speed 2]: Kích hoạt được trong lượt của đối thủ hoặc trong Chain. Chuyển dịch cân bằng hóa học: Tăng ngay 400 ATK cho 1 quái thú đồng minh hoặc giảm 400 ATK của 1 quái thú đối phương đang tấn công.",
    "scientificLore": "Nguyên lý Le Chatelier (SGK Hóa học 11 GDPT 2018): Khi tác động vào hệ cân bằng (nồng độ, nhiệt độ, áp suất), hệ sẽ tự chuyển dịch theo chiều chống lại tác động đó.",
    "relatedEquation": "Counter Shift Driving Reverse Chemical Reaction",
    "iupacName": "Reversible Reaction Inversion Surge Surge",
    "archetype": "WEAK_ACID_BUFFER",
    "structuredEffects": [
      {
        "effectId": "B19_EFF_48",
        "activationWindow": "QUICK",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Phép nhanh chuyển dịch cân bằng: Tăng 400 ATK cho toàn đội."
      }
    ]
  },
  {
    "id": "card_b19_049_quick_high_pressure_equilibrium_shift_49",
    "name": "Chuyển Dịch Tăng Áp Suất Khí (Phản Ứng Nhanh 7)",
    "name_en": "High Pressure Equilibrium Shift (Quick-Play 7)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "QUICK_PLAY_SPELL",
    "spellSpeed": 2,
    "rarity": "SUPER_RARE",
    "attribute": "AERO",
    "manaCost": 1,
    "chemicalFormula": "ΔP > 0",
    "effectCode": "SPELL_B19_HIGH_PRESSURE_EQUILIBRIUM_SHIFT_LECHAT_49",
    "effectText": "[Phép Nhanh / Quick-Play - Spell Speed 2]: Kích hoạt được trong lượt của đối thủ hoặc trong Chain. Chuyển dịch cân bằng hóa học: Tăng ngay 400 ATK cho 1 quái thú đồng minh hoặc giảm 400 ATK của 1 quái thú đối phương đang tấn công.",
    "scientificLore": "Nguyên lý Le Chatelier (SGK Hóa học 11 GDPT 2018): Khi tác động vào hệ cân bằng (nồng độ, nhiệt độ, áp suất), hệ sẽ tự chuyển dịch theo chiều chống lại tác động đó.",
    "relatedEquation": "Le Chatelier Shift towards Fewer Gas Moles",
    "iupacName": "High Pressure Equilibrium Shift Surge",
    "archetype": "LE_CHATELIER_EQUILIBRIUM",
    "structuredEffects": [
      {
        "effectId": "B19_EFF_49",
        "activationWindow": "QUICK",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Phép nhanh chuyển dịch cân bằng: Tăng 400 ATK cho toàn đội."
      }
    ]
  },
  {
    "id": "card_b19_050_quick_exothermic_temperature_drop_flash_50",
    "name": "Hạ Nhiệt Độ Phản Ứng Tỏa Nhiệt (Phản Ứng Nhanh 7)",
    "name_en": "Exothermic Temperature Drop Flash (Quick-Play 7)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "QUICK_PLAY_SPELL",
    "spellSpeed": 2,
    "rarity": "SUPER_RARE",
    "attribute": "AQUA",
    "manaCost": 2,
    "chemicalFormula": "ΔT < 0 (ΔH < 0)",
    "effectCode": "SPELL_B19_EXOTHERMIC_TEMPERATURE_DROP_FLASH_LECHAT_50",
    "effectText": "[Phép Nhanh / Quick-Play - Spell Speed 2]: Kích hoạt được trong lượt của đối thủ hoặc trong Chain. Chuyển dịch cân bằng hóa học: Tăng ngay 400 ATK cho 1 quái thú đồng minh hoặc giảm 400 ATK của 1 quái thú đối phương đang tấn công.",
    "scientificLore": "Nguyên lý Le Chatelier (SGK Hóa học 11 GDPT 2018): Khi tác động vào hệ cân bằng (nồng độ, nhiệt độ, áp suất), hệ sẽ tự chuyển dịch theo chiều chống lại tác động đó.",
    "relatedEquation": "Cooling Shifts Equilibrium Forward (Exothermic)",
    "iupacName": "Exothermic Temperature Drop Flash Surge",
    "archetype": "WEAK_ACID_BUFFER",
    "structuredEffects": [
      {
        "effectId": "B19_EFF_50",
        "activationWindow": "QUICK",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Phép nhanh chuyển dịch cân bằng: Tăng 400 ATK cho toàn đội."
      }
    ]
  },
  {
    "id": "card_b19_051_quick_reactant_concentration_surge_instant_51",
    "name": "Tăng Nồng Độ Tức Thời Chất Đầu (Phản Ứng Nhanh 7)",
    "name_en": "Reactant Concentration Surge Instant (Quick-Play 7)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "QUICK_PLAY_SPELL",
    "spellSpeed": 2,
    "rarity": "ULTRA_RARE",
    "attribute": "PYRO",
    "manaCost": 3,
    "chemicalFormula": "[Reactant] ↑",
    "effectCode": "SPELL_B19_REACTANT_CONCENTRATION_SURGE_INSTANT_LECHAT_51",
    "effectText": "[Phép Nhanh / Quick-Play - Spell Speed 2]: Kích hoạt được trong lượt của đối thủ hoặc trong Chain. Chuyển dịch cân bằng hóa học: Tăng ngay 400 ATK cho 1 quái thú đồng minh hoặc giảm 400 ATK của 1 quái thú đối phương đang tấn công.",
    "scientificLore": "Nguyên lý Le Chatelier (SGK Hóa học 11 GDPT 2018): Khi tác động vào hệ cân bằng (nồng độ, nhiệt độ, áp suất), hệ sẽ tự chuyển dịch theo chiều chống lại tác động đó.",
    "relatedEquation": "Surge in Reactant Drives Forward Reaction Speed",
    "iupacName": "Reactant Concentration Surge Instant Surge",
    "archetype": "LE_CHATELIER_EQUILIBRIUM",
    "structuredEffects": [
      {
        "effectId": "B19_EFF_51",
        "activationWindow": "QUICK",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Phép nhanh chuyển dịch cân bằng: Tăng 400 ATK cho toàn đội."
      }
    ]
  },
  {
    "id": "card_b19_052_quick_common_ion_suppression_shift_52",
    "name": "Hiệu Ứng Ion Chung Kìm Hãm (Phản Ứng Nhanh 7)",
    "name_en": "Common-Ion Suppression Shift (Quick-Play 7)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "QUICK_PLAY_SPELL",
    "spellSpeed": 2,
    "rarity": "SECRET_RARE",
    "attribute": "TERRA",
    "manaCost": 4,
    "chemicalFormula": "Common Ion",
    "effectCode": "SPELL_B19_COMMON_ION_SUPPRESSION_SHIFT_LECHAT_52",
    "effectText": "[Phép Nhanh / Quick-Play - Spell Speed 2]: Kích hoạt được trong lượt của đối thủ hoặc trong Chain. Chuyển dịch cân bằng hóa học: Tăng ngay 400 ATK cho 1 quái thú đồng minh hoặc giảm 400 ATK của 1 quái thú đối phương đang tấn công.",
    "scientificLore": "Nguyên lý Le Chatelier (SGK Hóa học 11 GDPT 2018): Khi tác động vào hệ cân bằng (nồng độ, nhiệt độ, áp suất), hệ sẽ tự chuyển dịch theo chiều chống lại tác động đó.",
    "relatedEquation": "Addition of Common Ion Decreases Salt Solubility",
    "iupacName": "Common-Ion Suppression Shift Surge",
    "archetype": "WEAK_ACID_BUFFER",
    "structuredEffects": [
      {
        "effectId": "B19_EFF_52",
        "activationWindow": "QUICK",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Phép nhanh chuyển dịch cân bằng: Tăng 400 ATK cho toàn đội."
      }
    ]
  },
  {
    "id": "card_b19_053_quick_acetic_buffer_dynamic_restoration_53",
    "name": "Đệm Axit Axetic Cân Bằng pH (Phản Ứng Nhanh 7)",
    "name_en": "Acetic Buffer Dynamic Restoration (Quick-Play 7)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "QUICK_PLAY_SPELL",
    "spellSpeed": 2,
    "rarity": "COMMON",
    "attribute": "AQUA",
    "manaCost": 1,
    "chemicalFormula": "CH3COOH/CH3COO-",
    "effectCode": "SPELL_B19_ACETIC_BUFFER_DYNAMIC_RESTORATION_LECHAT_53",
    "effectText": "[Phép Nhanh / Quick-Play - Spell Speed 2]: Kích hoạt được trong lượt của đối thủ hoặc trong Chain. Chuyển dịch cân bằng hóa học: Tăng ngay 400 ATK cho 1 quái thú đồng minh hoặc giảm 400 ATK của 1 quái thú đối phương đang tấn công.",
    "scientificLore": "Nguyên lý Le Chatelier (SGK Hóa học 11 GDPT 2018): Khi tác động vào hệ cân bằng (nồng độ, nhiệt độ, áp suất), hệ sẽ tự chuyển dịch theo chiều chống lại tác động đó.",
    "relatedEquation": "Buffer Capacity Neutralizes Sudden H⁺/OH⁻ Influx",
    "iupacName": "Acetic Buffer Dynamic Restoration Surge",
    "archetype": "LE_CHATELIER_EQUILIBRIUM",
    "structuredEffects": [
      {
        "effectId": "B19_EFF_53",
        "activationWindow": "QUICK",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Phép nhanh chuyển dịch cân bằng: Tăng 400 ATK cho toàn đội."
      }
    ]
  },
  {
    "id": "card_b19_054_quick_equilibrium_constant_jump_pulse_54",
    "name": "Đột Biến Hằng Số Phản Ứng Kc (Phản Ứng Nhanh 7)",
    "name_en": "Equilibrium Constant Jump Pulse (Quick-Play 7)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "QUICK_PLAY_SPELL",
    "spellSpeed": 2,
    "rarity": "COMMON",
    "attribute": "ELECTRO",
    "manaCost": 2,
    "chemicalFormula": "Kc Mutation",
    "effectCode": "SPELL_B19_EQUILIBRIUM_CONSTANT_JUMP_PULSE_LECHAT_54",
    "effectText": "[Phép Nhanh / Quick-Play - Spell Speed 2]: Kích hoạt được trong lượt của đối thủ hoặc trong Chain. Chuyển dịch cân bằng hóa học: Tăng ngay 400 ATK cho 1 quái thú đồng minh hoặc giảm 400 ATK của 1 quái thú đối phương đang tấn công.",
    "scientificLore": "Nguyên lý Le Chatelier (SGK Hóa học 11 GDPT 2018): Khi tác động vào hệ cân bằng (nồng độ, nhiệt độ, áp suất), hệ sẽ tự chuyển dịch theo chiều chống lại tác động đó.",
    "relatedEquation": "Temperature Change Alters Equilibrium Constant Kc",
    "iupacName": "Equilibrium Constant Jump Pulse Surge",
    "archetype": "WEAK_ACID_BUFFER",
    "structuredEffects": [
      {
        "effectId": "B19_EFF_54",
        "activationWindow": "QUICK",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Phép nhanh chuyển dịch cân bằng: Tăng 400 ATK cho toàn đội."
      }
    ]
  },
  {
    "id": "card_b19_055_quick_continuous_product_evacuation_surge_55",
    "name": "Bơm Hút Sản Phẩm Kéo Theo (Phản Ứng Nhanh 7)",
    "name_en": "Continuous Product Evacuation Surge (Quick-Play 7)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "QUICK_PLAY_SPELL",
    "spellSpeed": 2,
    "rarity": "COMMON",
    "attribute": "AERO",
    "manaCost": 3,
    "chemicalFormula": "[Product] ↓",
    "effectCode": "SPELL_B19_CONTINUOUS_PRODUCT_EVACUATION_SURGE_LECHAT_55",
    "effectText": "[Phép Nhanh / Quick-Play - Spell Speed 2]: Kích hoạt được trong lượt của đối thủ hoặc trong Chain. Chuyển dịch cân bằng hóa học: Tăng ngay 400 ATK cho 1 quái thú đồng minh hoặc giảm 400 ATK của 1 quái thú đối phương đang tấn công.",
    "scientificLore": "Nguyên lý Le Chatelier (SGK Hóa học 11 GDPT 2018): Khi tác động vào hệ cân bằng (nồng độ, nhiệt độ, áp suất), hệ sẽ tự chuyển dịch theo chiều chống lại tác động đó.",
    "relatedEquation": "Removing Product Forces 100% Forward Conversion",
    "iupacName": "Continuous Product Evacuation Surge Surge",
    "archetype": "LE_CHATELIER_EQUILIBRIUM",
    "structuredEffects": [
      {
        "effectId": "B19_EFF_55",
        "activationWindow": "QUICK",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Phép nhanh chuyển dịch cân bằng: Tăng 400 ATK cho toàn đội."
      }
    ]
  },
  {
    "id": "card_b19_056_quick_reversible_reaction_inversion_surge_56",
    "name": "Đảo Chiều Phản Ứng Thuận Nghịch (Phản Ứng Nhanh 7)",
    "name_en": "Reversible Reaction Inversion Surge (Quick-Play 7)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "QUICK_PLAY_SPELL",
    "spellSpeed": 2,
    "rarity": "RARE",
    "attribute": "NOBLE_VOID",
    "manaCost": 4,
    "chemicalFormula": "v_rev > v_fwd",
    "effectCode": "SPELL_B19_REVERSIBLE_REACTION_INVERSION_SURGE_LECHAT_56",
    "effectText": "[Phép Nhanh / Quick-Play - Spell Speed 2]: Kích hoạt được trong lượt của đối thủ hoặc trong Chain. Chuyển dịch cân bằng hóa học: Tăng ngay 400 ATK cho 1 quái thú đồng minh hoặc giảm 400 ATK của 1 quái thú đối phương đang tấn công.",
    "scientificLore": "Nguyên lý Le Chatelier (SGK Hóa học 11 GDPT 2018): Khi tác động vào hệ cân bằng (nồng độ, nhiệt độ, áp suất), hệ sẽ tự chuyển dịch theo chiều chống lại tác động đó.",
    "relatedEquation": "Counter Shift Driving Reverse Chemical Reaction",
    "iupacName": "Reversible Reaction Inversion Surge Surge",
    "archetype": "WEAK_ACID_BUFFER",
    "structuredEffects": [
      {
        "effectId": "B19_EFF_56",
        "activationWindow": "QUICK",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Phép nhanh chuyển dịch cân bằng: Tăng 400 ATK cho toàn đội."
      }
    ]
  },
  {
    "id": "card_b19_057_quick_high_pressure_equilibrium_shift_57",
    "name": "Chuyển Dịch Tăng Áp Suất Khí (Phản Ứng Nhanh 8)",
    "name_en": "High Pressure Equilibrium Shift (Quick-Play 8)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "QUICK_PLAY_SPELL",
    "spellSpeed": 2,
    "rarity": "RARE",
    "attribute": "AERO",
    "manaCost": 1,
    "chemicalFormula": "ΔP > 0",
    "effectCode": "SPELL_B19_HIGH_PRESSURE_EQUILIBRIUM_SHIFT_LECHAT_57",
    "effectText": "[Phép Nhanh / Quick-Play - Spell Speed 2]: Kích hoạt được trong lượt của đối thủ hoặc trong Chain. Chuyển dịch cân bằng hóa học: Tăng ngay 400 ATK cho 1 quái thú đồng minh hoặc giảm 400 ATK của 1 quái thú đối phương đang tấn công.",
    "scientificLore": "Nguyên lý Le Chatelier (SGK Hóa học 11 GDPT 2018): Khi tác động vào hệ cân bằng (nồng độ, nhiệt độ, áp suất), hệ sẽ tự chuyển dịch theo chiều chống lại tác động đó.",
    "relatedEquation": "Le Chatelier Shift towards Fewer Gas Moles",
    "iupacName": "High Pressure Equilibrium Shift Surge",
    "archetype": "LE_CHATELIER_EQUILIBRIUM",
    "structuredEffects": [
      {
        "effectId": "B19_EFF_57",
        "activationWindow": "QUICK",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Phép nhanh chuyển dịch cân bằng: Tăng 400 ATK cho toàn đội."
      }
    ]
  },
  {
    "id": "card_b19_058_quick_exothermic_temperature_drop_flash_58",
    "name": "Hạ Nhiệt Độ Phản Ứng Tỏa Nhiệt (Phản Ứng Nhanh 8)",
    "name_en": "Exothermic Temperature Drop Flash (Quick-Play 8)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "QUICK_PLAY_SPELL",
    "spellSpeed": 2,
    "rarity": "SUPER_RARE",
    "attribute": "AQUA",
    "manaCost": 2,
    "chemicalFormula": "ΔT < 0 (ΔH < 0)",
    "effectCode": "SPELL_B19_EXOTHERMIC_TEMPERATURE_DROP_FLASH_LECHAT_58",
    "effectText": "[Phép Nhanh / Quick-Play - Spell Speed 2]: Kích hoạt được trong lượt của đối thủ hoặc trong Chain. Chuyển dịch cân bằng hóa học: Tăng ngay 400 ATK cho 1 quái thú đồng minh hoặc giảm 400 ATK của 1 quái thú đối phương đang tấn công.",
    "scientificLore": "Nguyên lý Le Chatelier (SGK Hóa học 11 GDPT 2018): Khi tác động vào hệ cân bằng (nồng độ, nhiệt độ, áp suất), hệ sẽ tự chuyển dịch theo chiều chống lại tác động đó.",
    "relatedEquation": "Cooling Shifts Equilibrium Forward (Exothermic)",
    "iupacName": "Exothermic Temperature Drop Flash Surge",
    "archetype": "WEAK_ACID_BUFFER",
    "structuredEffects": [
      {
        "effectId": "B19_EFF_58",
        "activationWindow": "QUICK",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Phép nhanh chuyển dịch cân bằng: Tăng 400 ATK cho toàn đội."
      }
    ]
  },
  {
    "id": "card_b19_059_quick_reactant_concentration_surge_instant_59",
    "name": "Tăng Nồng Độ Tức Thời Chất Đầu (Phản Ứng Nhanh 8)",
    "name_en": "Reactant Concentration Surge Instant (Quick-Play 8)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "QUICK_PLAY_SPELL",
    "spellSpeed": 2,
    "rarity": "SUPER_RARE",
    "attribute": "PYRO",
    "manaCost": 3,
    "chemicalFormula": "[Reactant] ↑",
    "effectCode": "SPELL_B19_REACTANT_CONCENTRATION_SURGE_INSTANT_LECHAT_59",
    "effectText": "[Phép Nhanh / Quick-Play - Spell Speed 2]: Kích hoạt được trong lượt của đối thủ hoặc trong Chain. Chuyển dịch cân bằng hóa học: Tăng ngay 400 ATK cho 1 quái thú đồng minh hoặc giảm 400 ATK của 1 quái thú đối phương đang tấn công.",
    "scientificLore": "Nguyên lý Le Chatelier (SGK Hóa học 11 GDPT 2018): Khi tác động vào hệ cân bằng (nồng độ, nhiệt độ, áp suất), hệ sẽ tự chuyển dịch theo chiều chống lại tác động đó.",
    "relatedEquation": "Surge in Reactant Drives Forward Reaction Speed",
    "iupacName": "Reactant Concentration Surge Instant Surge",
    "archetype": "LE_CHATELIER_EQUILIBRIUM",
    "structuredEffects": [
      {
        "effectId": "B19_EFF_59",
        "activationWindow": "QUICK",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Phép nhanh chuyển dịch cân bằng: Tăng 400 ATK cho toàn đội."
      }
    ]
  },
  {
    "id": "card_b19_060_quick_common_ion_suppression_shift_60",
    "name": "Hiệu Ứng Ion Chung Kìm Hãm (Phản Ứng Nhanh 8)",
    "name_en": "Common-Ion Suppression Shift (Quick-Play 8)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "QUICK_PLAY_SPELL",
    "spellSpeed": 2,
    "rarity": "ULTRA_RARE",
    "attribute": "TERRA",
    "manaCost": 4,
    "chemicalFormula": "Common Ion",
    "effectCode": "SPELL_B19_COMMON_ION_SUPPRESSION_SHIFT_LECHAT_60",
    "effectText": "[Phép Nhanh / Quick-Play - Spell Speed 2]: Kích hoạt được trong lượt của đối thủ hoặc trong Chain. Chuyển dịch cân bằng hóa học: Tăng ngay 400 ATK cho 1 quái thú đồng minh hoặc giảm 400 ATK của 1 quái thú đối phương đang tấn công.",
    "scientificLore": "Nguyên lý Le Chatelier (SGK Hóa học 11 GDPT 2018): Khi tác động vào hệ cân bằng (nồng độ, nhiệt độ, áp suất), hệ sẽ tự chuyển dịch theo chiều chống lại tác động đó.",
    "relatedEquation": "Addition of Common Ion Decreases Salt Solubility",
    "iupacName": "Common-Ion Suppression Shift Surge",
    "archetype": "WEAK_ACID_BUFFER",
    "structuredEffects": [
      {
        "effectId": "B19_EFF_60",
        "activationWindow": "QUICK",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Phép nhanh chuyển dịch cân bằng: Tăng 400 ATK cho toàn đội."
      }
    ]
  },
  {
    "id": "card_b19_061_quick_acetic_buffer_dynamic_restoration_61",
    "name": "Đệm Axit Axetic Cân Bằng pH (Phản Ứng Nhanh 8)",
    "name_en": "Acetic Buffer Dynamic Restoration (Quick-Play 8)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "QUICK_PLAY_SPELL",
    "spellSpeed": 2,
    "rarity": "SECRET_RARE",
    "attribute": "AQUA",
    "manaCost": 1,
    "chemicalFormula": "CH3COOH/CH3COO-",
    "effectCode": "SPELL_B19_ACETIC_BUFFER_DYNAMIC_RESTORATION_LECHAT_61",
    "effectText": "[Phép Nhanh / Quick-Play - Spell Speed 2]: Kích hoạt được trong lượt của đối thủ hoặc trong Chain. Chuyển dịch cân bằng hóa học: Tăng ngay 400 ATK cho 1 quái thú đồng minh hoặc giảm 400 ATK của 1 quái thú đối phương đang tấn công.",
    "scientificLore": "Nguyên lý Le Chatelier (SGK Hóa học 11 GDPT 2018): Khi tác động vào hệ cân bằng (nồng độ, nhiệt độ, áp suất), hệ sẽ tự chuyển dịch theo chiều chống lại tác động đó.",
    "relatedEquation": "Buffer Capacity Neutralizes Sudden H⁺/OH⁻ Influx",
    "iupacName": "Acetic Buffer Dynamic Restoration Surge",
    "archetype": "LE_CHATELIER_EQUILIBRIUM",
    "structuredEffects": [
      {
        "effectId": "B19_EFF_61",
        "activationWindow": "QUICK",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Phép nhanh chuyển dịch cân bằng: Tăng 400 ATK cho toàn đội."
      }
    ]
  },
  {
    "id": "card_b19_062_quick_equilibrium_constant_jump_pulse_62",
    "name": "Đột Biến Hằng Số Phản Ứng Kc (Phản Ứng Nhanh 8)",
    "name_en": "Equilibrium Constant Jump Pulse (Quick-Play 8)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "QUICK_PLAY_SPELL",
    "spellSpeed": 2,
    "rarity": "COMMON",
    "attribute": "ELECTRO",
    "manaCost": 2,
    "chemicalFormula": "Kc Mutation",
    "effectCode": "SPELL_B19_EQUILIBRIUM_CONSTANT_JUMP_PULSE_LECHAT_62",
    "effectText": "[Phép Nhanh / Quick-Play - Spell Speed 2]: Kích hoạt được trong lượt của đối thủ hoặc trong Chain. Chuyển dịch cân bằng hóa học: Tăng ngay 400 ATK cho 1 quái thú đồng minh hoặc giảm 400 ATK của 1 quái thú đối phương đang tấn công.",
    "scientificLore": "Nguyên lý Le Chatelier (SGK Hóa học 11 GDPT 2018): Khi tác động vào hệ cân bằng (nồng độ, nhiệt độ, áp suất), hệ sẽ tự chuyển dịch theo chiều chống lại tác động đó.",
    "relatedEquation": "Temperature Change Alters Equilibrium Constant Kc",
    "iupacName": "Equilibrium Constant Jump Pulse Surge",
    "archetype": "WEAK_ACID_BUFFER",
    "structuredEffects": [
      {
        "effectId": "B19_EFF_62",
        "activationWindow": "QUICK",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Phép nhanh chuyển dịch cân bằng: Tăng 400 ATK cho toàn đội."
      }
    ]
  },
  {
    "id": "card_b19_063_quick_continuous_product_evacuation_surge_63",
    "name": "Bơm Hút Sản Phẩm Kéo Theo (Phản Ứng Nhanh 8)",
    "name_en": "Continuous Product Evacuation Surge (Quick-Play 8)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "QUICK_PLAY_SPELL",
    "spellSpeed": 2,
    "rarity": "COMMON",
    "attribute": "AERO",
    "manaCost": 3,
    "chemicalFormula": "[Product] ↓",
    "effectCode": "SPELL_B19_CONTINUOUS_PRODUCT_EVACUATION_SURGE_LECHAT_63",
    "effectText": "[Phép Nhanh / Quick-Play - Spell Speed 2]: Kích hoạt được trong lượt của đối thủ hoặc trong Chain. Chuyển dịch cân bằng hóa học: Tăng ngay 400 ATK cho 1 quái thú đồng minh hoặc giảm 400 ATK của 1 quái thú đối phương đang tấn công.",
    "scientificLore": "Nguyên lý Le Chatelier (SGK Hóa học 11 GDPT 2018): Khi tác động vào hệ cân bằng (nồng độ, nhiệt độ, áp suất), hệ sẽ tự chuyển dịch theo chiều chống lại tác động đó.",
    "relatedEquation": "Removing Product Forces 100% Forward Conversion",
    "iupacName": "Continuous Product Evacuation Surge Surge",
    "archetype": "LE_CHATELIER_EQUILIBRIUM",
    "structuredEffects": [
      {
        "effectId": "B19_EFF_63",
        "activationWindow": "QUICK",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Phép nhanh chuyển dịch cân bằng: Tăng 400 ATK cho toàn đội."
      }
    ]
  },
  {
    "id": "card_b19_064_quick_reversible_reaction_inversion_surge_64",
    "name": "Đảo Chiều Phản Ứng Thuận Nghịch (Phản Ứng Nhanh 8)",
    "name_en": "Reversible Reaction Inversion Surge (Quick-Play 8)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "QUICK_PLAY_SPELL",
    "spellSpeed": 2,
    "rarity": "COMMON",
    "attribute": "NOBLE_VOID",
    "manaCost": 4,
    "chemicalFormula": "v_rev > v_fwd",
    "effectCode": "SPELL_B19_REVERSIBLE_REACTION_INVERSION_SURGE_LECHAT_64",
    "effectText": "[Phép Nhanh / Quick-Play - Spell Speed 2]: Kích hoạt được trong lượt của đối thủ hoặc trong Chain. Chuyển dịch cân bằng hóa học: Tăng ngay 400 ATK cho 1 quái thú đồng minh hoặc giảm 400 ATK của 1 quái thú đối phương đang tấn công.",
    "scientificLore": "Nguyên lý Le Chatelier (SGK Hóa học 11 GDPT 2018): Khi tác động vào hệ cân bằng (nồng độ, nhiệt độ, áp suất), hệ sẽ tự chuyển dịch theo chiều chống lại tác động đó.",
    "relatedEquation": "Counter Shift Driving Reverse Chemical Reaction",
    "iupacName": "Reversible Reaction Inversion Surge Surge",
    "archetype": "WEAK_ACID_BUFFER",
    "structuredEffects": [
      {
        "effectId": "B19_EFF_64",
        "activationWindow": "QUICK",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Phép nhanh chuyển dịch cân bằng: Tăng 400 ATK cho toàn đội."
      }
    ]
  },
  {
    "id": "card_b19_065_quick_high_pressure_equilibrium_shift_65",
    "name": "Chuyển Dịch Tăng Áp Suất Khí (Phản Ứng Nhanh 9)",
    "name_en": "High Pressure Equilibrium Shift (Quick-Play 9)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "QUICK_PLAY_SPELL",
    "spellSpeed": 2,
    "rarity": "RARE",
    "attribute": "AERO",
    "manaCost": 1,
    "chemicalFormula": "ΔP > 0",
    "effectCode": "SPELL_B19_HIGH_PRESSURE_EQUILIBRIUM_SHIFT_LECHAT_65",
    "effectText": "[Phép Nhanh / Quick-Play - Spell Speed 2]: Kích hoạt được trong lượt của đối thủ hoặc trong Chain. Chuyển dịch cân bằng hóa học: Tăng ngay 400 ATK cho 1 quái thú đồng minh hoặc giảm 400 ATK của 1 quái thú đối phương đang tấn công.",
    "scientificLore": "Nguyên lý Le Chatelier (SGK Hóa học 11 GDPT 2018): Khi tác động vào hệ cân bằng (nồng độ, nhiệt độ, áp suất), hệ sẽ tự chuyển dịch theo chiều chống lại tác động đó.",
    "relatedEquation": "Le Chatelier Shift towards Fewer Gas Moles",
    "iupacName": "High Pressure Equilibrium Shift Surge",
    "archetype": "LE_CHATELIER_EQUILIBRIUM",
    "structuredEffects": [
      {
        "effectId": "B19_EFF_65",
        "activationWindow": "QUICK",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Phép nhanh chuyển dịch cân bằng: Tăng 400 ATK cho toàn đội."
      }
    ]
  },
  {
    "id": "card_b19_066_quick_exothermic_temperature_drop_flash_66",
    "name": "Hạ Nhiệt Độ Phản Ứng Tỏa Nhiệt (Phản Ứng Nhanh 9)",
    "name_en": "Exothermic Temperature Drop Flash (Quick-Play 9)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "QUICK_PLAY_SPELL",
    "spellSpeed": 2,
    "rarity": "RARE",
    "attribute": "AQUA",
    "manaCost": 2,
    "chemicalFormula": "ΔT < 0 (ΔH < 0)",
    "effectCode": "SPELL_B19_EXOTHERMIC_TEMPERATURE_DROP_FLASH_LECHAT_66",
    "effectText": "[Phép Nhanh / Quick-Play - Spell Speed 2]: Kích hoạt được trong lượt của đối thủ hoặc trong Chain. Chuyển dịch cân bằng hóa học: Tăng ngay 400 ATK cho 1 quái thú đồng minh hoặc giảm 400 ATK của 1 quái thú đối phương đang tấn công.",
    "scientificLore": "Nguyên lý Le Chatelier (SGK Hóa học 11 GDPT 2018): Khi tác động vào hệ cân bằng (nồng độ, nhiệt độ, áp suất), hệ sẽ tự chuyển dịch theo chiều chống lại tác động đó.",
    "relatedEquation": "Cooling Shifts Equilibrium Forward (Exothermic)",
    "iupacName": "Exothermic Temperature Drop Flash Surge",
    "archetype": "WEAK_ACID_BUFFER",
    "structuredEffects": [
      {
        "effectId": "B19_EFF_66",
        "activationWindow": "QUICK",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Phép nhanh chuyển dịch cân bằng: Tăng 400 ATK cho toàn đội."
      }
    ]
  },
  {
    "id": "card_b19_067_quick_reactant_concentration_surge_instant_67",
    "name": "Tăng Nồng Độ Tức Thời Chất Đầu (Phản Ứng Nhanh 9)",
    "name_en": "Reactant Concentration Surge Instant (Quick-Play 9)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "QUICK_PLAY_SPELL",
    "spellSpeed": 2,
    "rarity": "SUPER_RARE",
    "attribute": "PYRO",
    "manaCost": 3,
    "chemicalFormula": "[Reactant] ↑",
    "effectCode": "SPELL_B19_REACTANT_CONCENTRATION_SURGE_INSTANT_LECHAT_67",
    "effectText": "[Phép Nhanh / Quick-Play - Spell Speed 2]: Kích hoạt được trong lượt của đối thủ hoặc trong Chain. Chuyển dịch cân bằng hóa học: Tăng ngay 400 ATK cho 1 quái thú đồng minh hoặc giảm 400 ATK của 1 quái thú đối phương đang tấn công.",
    "scientificLore": "Nguyên lý Le Chatelier (SGK Hóa học 11 GDPT 2018): Khi tác động vào hệ cân bằng (nồng độ, nhiệt độ, áp suất), hệ sẽ tự chuyển dịch theo chiều chống lại tác động đó.",
    "relatedEquation": "Surge in Reactant Drives Forward Reaction Speed",
    "iupacName": "Reactant Concentration Surge Instant Surge",
    "archetype": "LE_CHATELIER_EQUILIBRIUM",
    "structuredEffects": [
      {
        "effectId": "B19_EFF_67",
        "activationWindow": "QUICK",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Phép nhanh chuyển dịch cân bằng: Tăng 400 ATK cho toàn đội."
      }
    ]
  },
  {
    "id": "card_b19_068_quick_common_ion_suppression_shift_68",
    "name": "Hiệu Ứng Ion Chung Kìm Hãm (Phản Ứng Nhanh 9)",
    "name_en": "Common-Ion Suppression Shift (Quick-Play 9)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "QUICK_PLAY_SPELL",
    "spellSpeed": 2,
    "rarity": "SUPER_RARE",
    "attribute": "TERRA",
    "manaCost": 4,
    "chemicalFormula": "Common Ion",
    "effectCode": "SPELL_B19_COMMON_ION_SUPPRESSION_SHIFT_LECHAT_68",
    "effectText": "[Phép Nhanh / Quick-Play - Spell Speed 2]: Kích hoạt được trong lượt của đối thủ hoặc trong Chain. Chuyển dịch cân bằng hóa học: Tăng ngay 400 ATK cho 1 quái thú đồng minh hoặc giảm 400 ATK của 1 quái thú đối phương đang tấn công.",
    "scientificLore": "Nguyên lý Le Chatelier (SGK Hóa học 11 GDPT 2018): Khi tác động vào hệ cân bằng (nồng độ, nhiệt độ, áp suất), hệ sẽ tự chuyển dịch theo chiều chống lại tác động đó.",
    "relatedEquation": "Addition of Common Ion Decreases Salt Solubility",
    "iupacName": "Common-Ion Suppression Shift Surge",
    "archetype": "WEAK_ACID_BUFFER",
    "structuredEffects": [
      {
        "effectId": "B19_EFF_68",
        "activationWindow": "QUICK",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Phép nhanh chuyển dịch cân bằng: Tăng 400 ATK cho toàn đội."
      }
    ]
  },
  {
    "id": "card_b19_069_quick_acetic_buffer_dynamic_restoration_69",
    "name": "Đệm Axit Axetic Cân Bằng pH (Phản Ứng Nhanh 9)",
    "name_en": "Acetic Buffer Dynamic Restoration (Quick-Play 9)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "QUICK_PLAY_SPELL",
    "spellSpeed": 2,
    "rarity": "ULTRA_RARE",
    "attribute": "AQUA",
    "manaCost": 1,
    "chemicalFormula": "CH3COOH/CH3COO-",
    "effectCode": "SPELL_B19_ACETIC_BUFFER_DYNAMIC_RESTORATION_LECHAT_69",
    "effectText": "[Phép Nhanh / Quick-Play - Spell Speed 2]: Kích hoạt được trong lượt của đối thủ hoặc trong Chain. Chuyển dịch cân bằng hóa học: Tăng ngay 400 ATK cho 1 quái thú đồng minh hoặc giảm 400 ATK của 1 quái thú đối phương đang tấn công.",
    "scientificLore": "Nguyên lý Le Chatelier (SGK Hóa học 11 GDPT 2018): Khi tác động vào hệ cân bằng (nồng độ, nhiệt độ, áp suất), hệ sẽ tự chuyển dịch theo chiều chống lại tác động đó.",
    "relatedEquation": "Buffer Capacity Neutralizes Sudden H⁺/OH⁻ Influx",
    "iupacName": "Acetic Buffer Dynamic Restoration Surge",
    "archetype": "LE_CHATELIER_EQUILIBRIUM",
    "structuredEffects": [
      {
        "effectId": "B19_EFF_69",
        "activationWindow": "QUICK",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Phép nhanh chuyển dịch cân bằng: Tăng 400 ATK cho toàn đội."
      }
    ]
  },
  {
    "id": "card_b19_070_quick_equilibrium_constant_jump_pulse_70",
    "name": "Đột Biến Hằng Số Phản Ứng Kc (Phản Ứng Nhanh 9)",
    "name_en": "Equilibrium Constant Jump Pulse (Quick-Play 9)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "QUICK_PLAY_SPELL",
    "spellSpeed": 2,
    "rarity": "SECRET_RARE",
    "attribute": "ELECTRO",
    "manaCost": 2,
    "chemicalFormula": "Kc Mutation",
    "effectCode": "SPELL_B19_EQUILIBRIUM_CONSTANT_JUMP_PULSE_LECHAT_70",
    "effectText": "[Phép Nhanh / Quick-Play - Spell Speed 2]: Kích hoạt được trong lượt của đối thủ hoặc trong Chain. Chuyển dịch cân bằng hóa học: Tăng ngay 400 ATK cho 1 quái thú đồng minh hoặc giảm 400 ATK của 1 quái thú đối phương đang tấn công.",
    "scientificLore": "Nguyên lý Le Chatelier (SGK Hóa học 11 GDPT 2018): Khi tác động vào hệ cân bằng (nồng độ, nhiệt độ, áp suất), hệ sẽ tự chuyển dịch theo chiều chống lại tác động đó.",
    "relatedEquation": "Temperature Change Alters Equilibrium Constant Kc",
    "iupacName": "Equilibrium Constant Jump Pulse Surge",
    "archetype": "WEAK_ACID_BUFFER",
    "structuredEffects": [
      {
        "effectId": "B19_EFF_70",
        "activationWindow": "QUICK",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Phép nhanh chuyển dịch cân bằng: Tăng 400 ATK cho toàn đội."
      }
    ]
  },
  {
    "id": "card_b19_071_quick_continuous_product_evacuation_surge_71",
    "name": "Bơm Hút Sản Phẩm Kéo Theo (Phản Ứng Nhanh 9)",
    "name_en": "Continuous Product Evacuation Surge (Quick-Play 9)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "QUICK_PLAY_SPELL",
    "spellSpeed": 2,
    "rarity": "COMMON",
    "attribute": "AERO",
    "manaCost": 3,
    "chemicalFormula": "[Product] ↓",
    "effectCode": "SPELL_B19_CONTINUOUS_PRODUCT_EVACUATION_SURGE_LECHAT_71",
    "effectText": "[Phép Nhanh / Quick-Play - Spell Speed 2]: Kích hoạt được trong lượt của đối thủ hoặc trong Chain. Chuyển dịch cân bằng hóa học: Tăng ngay 400 ATK cho 1 quái thú đồng minh hoặc giảm 400 ATK của 1 quái thú đối phương đang tấn công.",
    "scientificLore": "Nguyên lý Le Chatelier (SGK Hóa học 11 GDPT 2018): Khi tác động vào hệ cân bằng (nồng độ, nhiệt độ, áp suất), hệ sẽ tự chuyển dịch theo chiều chống lại tác động đó.",
    "relatedEquation": "Removing Product Forces 100% Forward Conversion",
    "iupacName": "Continuous Product Evacuation Surge Surge",
    "archetype": "LE_CHATELIER_EQUILIBRIUM",
    "structuredEffects": [
      {
        "effectId": "B19_EFF_71",
        "activationWindow": "QUICK",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Phép nhanh chuyển dịch cân bằng: Tăng 400 ATK cho toàn đội."
      }
    ]
  },
  {
    "id": "card_b19_072_quick_reversible_reaction_inversion_surge_72",
    "name": "Đảo Chiều Phản Ứng Thuận Nghịch (Phản Ứng Nhanh 9)",
    "name_en": "Reversible Reaction Inversion Surge (Quick-Play 9)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "QUICK_PLAY_SPELL",
    "spellSpeed": 2,
    "rarity": "COMMON",
    "attribute": "NOBLE_VOID",
    "manaCost": 4,
    "chemicalFormula": "v_rev > v_fwd",
    "effectCode": "SPELL_B19_REVERSIBLE_REACTION_INVERSION_SURGE_LECHAT_72",
    "effectText": "[Phép Nhanh / Quick-Play - Spell Speed 2]: Kích hoạt được trong lượt của đối thủ hoặc trong Chain. Chuyển dịch cân bằng hóa học: Tăng ngay 400 ATK cho 1 quái thú đồng minh hoặc giảm 400 ATK của 1 quái thú đối phương đang tấn công.",
    "scientificLore": "Nguyên lý Le Chatelier (SGK Hóa học 11 GDPT 2018): Khi tác động vào hệ cân bằng (nồng độ, nhiệt độ, áp suất), hệ sẽ tự chuyển dịch theo chiều chống lại tác động đó.",
    "relatedEquation": "Counter Shift Driving Reverse Chemical Reaction",
    "iupacName": "Reversible Reaction Inversion Surge Surge",
    "archetype": "WEAK_ACID_BUFFER",
    "structuredEffects": [
      {
        "effectId": "B19_EFF_72",
        "activationWindow": "QUICK",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Phép nhanh chuyển dịch cân bằng: Tăng 400 ATK cho toàn đội."
      }
    ]
  },
  {
    "id": "card_b19_073_quick_high_pressure_equilibrium_shift_73",
    "name": "Chuyển Dịch Tăng Áp Suất Khí (Phản Ứng Nhanh 10)",
    "name_en": "High Pressure Equilibrium Shift (Quick-Play 10)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "QUICK_PLAY_SPELL",
    "spellSpeed": 2,
    "rarity": "COMMON",
    "attribute": "AERO",
    "manaCost": 1,
    "chemicalFormula": "ΔP > 0",
    "effectCode": "SPELL_B19_HIGH_PRESSURE_EQUILIBRIUM_SHIFT_LECHAT_73",
    "effectText": "[Phép Nhanh / Quick-Play - Spell Speed 2]: Kích hoạt được trong lượt của đối thủ hoặc trong Chain. Chuyển dịch cân bằng hóa học: Tăng ngay 400 ATK cho 1 quái thú đồng minh hoặc giảm 400 ATK của 1 quái thú đối phương đang tấn công.",
    "scientificLore": "Nguyên lý Le Chatelier (SGK Hóa học 11 GDPT 2018): Khi tác động vào hệ cân bằng (nồng độ, nhiệt độ, áp suất), hệ sẽ tự chuyển dịch theo chiều chống lại tác động đó.",
    "relatedEquation": "Le Chatelier Shift towards Fewer Gas Moles",
    "iupacName": "High Pressure Equilibrium Shift Surge",
    "archetype": "LE_CHATELIER_EQUILIBRIUM",
    "structuredEffects": [
      {
        "effectId": "B19_EFF_73",
        "activationWindow": "QUICK",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Phép nhanh chuyển dịch cân bằng: Tăng 400 ATK cho toàn đội."
      }
    ]
  },
  {
    "id": "card_b19_074_quick_exothermic_temperature_drop_flash_74",
    "name": "Hạ Nhiệt Độ Phản Ứng Tỏa Nhiệt (Phản Ứng Nhanh 10)",
    "name_en": "Exothermic Temperature Drop Flash (Quick-Play 10)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "QUICK_PLAY_SPELL",
    "spellSpeed": 2,
    "rarity": "RARE",
    "attribute": "AQUA",
    "manaCost": 2,
    "chemicalFormula": "ΔT < 0 (ΔH < 0)",
    "effectCode": "SPELL_B19_EXOTHERMIC_TEMPERATURE_DROP_FLASH_LECHAT_74",
    "effectText": "[Phép Nhanh / Quick-Play - Spell Speed 2]: Kích hoạt được trong lượt của đối thủ hoặc trong Chain. Chuyển dịch cân bằng hóa học: Tăng ngay 400 ATK cho 1 quái thú đồng minh hoặc giảm 400 ATK của 1 quái thú đối phương đang tấn công.",
    "scientificLore": "Nguyên lý Le Chatelier (SGK Hóa học 11 GDPT 2018): Khi tác động vào hệ cân bằng (nồng độ, nhiệt độ, áp suất), hệ sẽ tự chuyển dịch theo chiều chống lại tác động đó.",
    "relatedEquation": "Cooling Shifts Equilibrium Forward (Exothermic)",
    "iupacName": "Exothermic Temperature Drop Flash Surge",
    "archetype": "WEAK_ACID_BUFFER",
    "structuredEffects": [
      {
        "effectId": "B19_EFF_74",
        "activationWindow": "QUICK",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Phép nhanh chuyển dịch cân bằng: Tăng 400 ATK cho toàn đội."
      }
    ]
  },
  {
    "id": "card_b19_075_quick_reactant_concentration_surge_instant_75",
    "name": "Tăng Nồng Độ Tức Thời Chất Đầu (Phản Ứng Nhanh 10)",
    "name_en": "Reactant Concentration Surge Instant (Quick-Play 10)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "QUICK_PLAY_SPELL",
    "spellSpeed": 2,
    "rarity": "RARE",
    "attribute": "PYRO",
    "manaCost": 3,
    "chemicalFormula": "[Reactant] ↑",
    "effectCode": "SPELL_B19_REACTANT_CONCENTRATION_SURGE_INSTANT_LECHAT_75",
    "effectText": "[Phép Nhanh / Quick-Play - Spell Speed 2]: Kích hoạt được trong lượt của đối thủ hoặc trong Chain. Chuyển dịch cân bằng hóa học: Tăng ngay 400 ATK cho 1 quái thú đồng minh hoặc giảm 400 ATK của 1 quái thú đối phương đang tấn công.",
    "scientificLore": "Nguyên lý Le Chatelier (SGK Hóa học 11 GDPT 2018): Khi tác động vào hệ cân bằng (nồng độ, nhiệt độ, áp suất), hệ sẽ tự chuyển dịch theo chiều chống lại tác động đó.",
    "relatedEquation": "Surge in Reactant Drives Forward Reaction Speed",
    "iupacName": "Reactant Concentration Surge Instant Surge",
    "archetype": "LE_CHATELIER_EQUILIBRIUM",
    "structuredEffects": [
      {
        "effectId": "B19_EFF_75",
        "activationWindow": "QUICK",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Phép nhanh chuyển dịch cân bằng: Tăng 400 ATK cho toàn đội."
      }
    ]
  },
  {
    "id": "card_b19_076_quick_common_ion_suppression_shift_76",
    "name": "Hiệu Ứng Ion Chung Kìm Hãm (Phản Ứng Nhanh 10)",
    "name_en": "Common-Ion Suppression Shift (Quick-Play 10)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "QUICK_PLAY_SPELL",
    "spellSpeed": 2,
    "rarity": "SUPER_RARE",
    "attribute": "TERRA",
    "manaCost": 4,
    "chemicalFormula": "Common Ion",
    "effectCode": "SPELL_B19_COMMON_ION_SUPPRESSION_SHIFT_LECHAT_76",
    "effectText": "[Phép Nhanh / Quick-Play - Spell Speed 2]: Kích hoạt được trong lượt của đối thủ hoặc trong Chain. Chuyển dịch cân bằng hóa học: Tăng ngay 400 ATK cho 1 quái thú đồng minh hoặc giảm 400 ATK của 1 quái thú đối phương đang tấn công.",
    "scientificLore": "Nguyên lý Le Chatelier (SGK Hóa học 11 GDPT 2018): Khi tác động vào hệ cân bằng (nồng độ, nhiệt độ, áp suất), hệ sẽ tự chuyển dịch theo chiều chống lại tác động đó.",
    "relatedEquation": "Addition of Common Ion Decreases Salt Solubility",
    "iupacName": "Common-Ion Suppression Shift Surge",
    "archetype": "WEAK_ACID_BUFFER",
    "structuredEffects": [
      {
        "effectId": "B19_EFF_76",
        "activationWindow": "QUICK",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Phép nhanh chuyển dịch cân bằng: Tăng 400 ATK cho toàn đội."
      }
    ]
  },
  {
    "id": "card_b19_077_quick_acetic_buffer_dynamic_restoration_77",
    "name": "Đệm Axit Axetic Cân Bằng pH (Phản Ứng Nhanh 10)",
    "name_en": "Acetic Buffer Dynamic Restoration (Quick-Play 10)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "QUICK_PLAY_SPELL",
    "spellSpeed": 2,
    "rarity": "SUPER_RARE",
    "attribute": "AQUA",
    "manaCost": 1,
    "chemicalFormula": "CH3COOH/CH3COO-",
    "effectCode": "SPELL_B19_ACETIC_BUFFER_DYNAMIC_RESTORATION_LECHAT_77",
    "effectText": "[Phép Nhanh / Quick-Play - Spell Speed 2]: Kích hoạt được trong lượt của đối thủ hoặc trong Chain. Chuyển dịch cân bằng hóa học: Tăng ngay 400 ATK cho 1 quái thú đồng minh hoặc giảm 400 ATK của 1 quái thú đối phương đang tấn công.",
    "scientificLore": "Nguyên lý Le Chatelier (SGK Hóa học 11 GDPT 2018): Khi tác động vào hệ cân bằng (nồng độ, nhiệt độ, áp suất), hệ sẽ tự chuyển dịch theo chiều chống lại tác động đó.",
    "relatedEquation": "Buffer Capacity Neutralizes Sudden H⁺/OH⁻ Influx",
    "iupacName": "Acetic Buffer Dynamic Restoration Surge",
    "archetype": "LE_CHATELIER_EQUILIBRIUM",
    "structuredEffects": [
      {
        "effectId": "B19_EFF_77",
        "activationWindow": "QUICK",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Phép nhanh chuyển dịch cân bằng: Tăng 400 ATK cho toàn đội."
      }
    ]
  },
  {
    "id": "card_b19_078_quick_equilibrium_constant_jump_pulse_78",
    "name": "Đột Biến Hằng Số Phản Ứng Kc (Phản Ứng Nhanh 10)",
    "name_en": "Equilibrium Constant Jump Pulse (Quick-Play 10)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "QUICK_PLAY_SPELL",
    "spellSpeed": 2,
    "rarity": "ULTRA_RARE",
    "attribute": "ELECTRO",
    "manaCost": 2,
    "chemicalFormula": "Kc Mutation",
    "effectCode": "SPELL_B19_EQUILIBRIUM_CONSTANT_JUMP_PULSE_LECHAT_78",
    "effectText": "[Phép Nhanh / Quick-Play - Spell Speed 2]: Kích hoạt được trong lượt của đối thủ hoặc trong Chain. Chuyển dịch cân bằng hóa học: Tăng ngay 400 ATK cho 1 quái thú đồng minh hoặc giảm 400 ATK của 1 quái thú đối phương đang tấn công.",
    "scientificLore": "Nguyên lý Le Chatelier (SGK Hóa học 11 GDPT 2018): Khi tác động vào hệ cân bằng (nồng độ, nhiệt độ, áp suất), hệ sẽ tự chuyển dịch theo chiều chống lại tác động đó.",
    "relatedEquation": "Temperature Change Alters Equilibrium Constant Kc",
    "iupacName": "Equilibrium Constant Jump Pulse Surge",
    "archetype": "WEAK_ACID_BUFFER",
    "structuredEffects": [
      {
        "effectId": "B19_EFF_78",
        "activationWindow": "QUICK",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Phép nhanh chuyển dịch cân bằng: Tăng 400 ATK cho toàn đội."
      }
    ]
  },
  {
    "id": "card_b19_079_quick_continuous_product_evacuation_surge_79",
    "name": "Bơm Hút Sản Phẩm Kéo Theo (Phản Ứng Nhanh 10)",
    "name_en": "Continuous Product Evacuation Surge (Quick-Play 10)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "QUICK_PLAY_SPELL",
    "spellSpeed": 2,
    "rarity": "SECRET_RARE",
    "attribute": "AERO",
    "manaCost": 3,
    "chemicalFormula": "[Product] ↓",
    "effectCode": "SPELL_B19_CONTINUOUS_PRODUCT_EVACUATION_SURGE_LECHAT_79",
    "effectText": "[Phép Nhanh / Quick-Play - Spell Speed 2]: Kích hoạt được trong lượt của đối thủ hoặc trong Chain. Chuyển dịch cân bằng hóa học: Tăng ngay 400 ATK cho 1 quái thú đồng minh hoặc giảm 400 ATK của 1 quái thú đối phương đang tấn công.",
    "scientificLore": "Nguyên lý Le Chatelier (SGK Hóa học 11 GDPT 2018): Khi tác động vào hệ cân bằng (nồng độ, nhiệt độ, áp suất), hệ sẽ tự chuyển dịch theo chiều chống lại tác động đó.",
    "relatedEquation": "Removing Product Forces 100% Forward Conversion",
    "iupacName": "Continuous Product Evacuation Surge Surge",
    "archetype": "LE_CHATELIER_EQUILIBRIUM",
    "structuredEffects": [
      {
        "effectId": "B19_EFF_79",
        "activationWindow": "QUICK",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Phép nhanh chuyển dịch cân bằng: Tăng 400 ATK cho toàn đội."
      }
    ]
  },
  {
    "id": "card_b19_080_quick_reversible_reaction_inversion_surge_80",
    "name": "Đảo Chiều Phản Ứng Thuận Nghịch (Phản Ứng Nhanh 10)",
    "name_en": "Reversible Reaction Inversion Surge (Quick-Play 10)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "QUICK_PLAY_SPELL",
    "spellSpeed": 2,
    "rarity": "COMMON",
    "attribute": "NOBLE_VOID",
    "manaCost": 4,
    "chemicalFormula": "v_rev > v_fwd",
    "effectCode": "SPELL_B19_REVERSIBLE_REACTION_INVERSION_SURGE_LECHAT_80",
    "effectText": "[Phép Nhanh / Quick-Play - Spell Speed 2]: Kích hoạt được trong lượt của đối thủ hoặc trong Chain. Chuyển dịch cân bằng hóa học: Tăng ngay 400 ATK cho 1 quái thú đồng minh hoặc giảm 400 ATK của 1 quái thú đối phương đang tấn công.",
    "scientificLore": "Nguyên lý Le Chatelier (SGK Hóa học 11 GDPT 2018): Khi tác động vào hệ cân bằng (nồng độ, nhiệt độ, áp suất), hệ sẽ tự chuyển dịch theo chiều chống lại tác động đó.",
    "relatedEquation": "Counter Shift Driving Reverse Chemical Reaction",
    "iupacName": "Reversible Reaction Inversion Surge Surge",
    "archetype": "WEAK_ACID_BUFFER",
    "structuredEffects": [
      {
        "effectId": "B19_EFF_80",
        "activationWindow": "QUICK",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Phép nhanh chuyển dịch cân bằng: Tăng 400 ATK cho toàn đội."
      }
    ]
  },
  {
    "id": "card_b19_081_quick_high_pressure_equilibrium_shift_81",
    "name": "Chuyển Dịch Tăng Áp Suất Khí (Phản Ứng Nhanh 11)",
    "name_en": "High Pressure Equilibrium Shift (Quick-Play 11)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "QUICK_PLAY_SPELL",
    "spellSpeed": 2,
    "rarity": "COMMON",
    "attribute": "AERO",
    "manaCost": 1,
    "chemicalFormula": "ΔP > 0",
    "effectCode": "SPELL_B19_HIGH_PRESSURE_EQUILIBRIUM_SHIFT_LECHAT_81",
    "effectText": "[Phép Nhanh / Quick-Play - Spell Speed 2]: Kích hoạt được trong lượt của đối thủ hoặc trong Chain. Chuyển dịch cân bằng hóa học: Tăng ngay 400 ATK cho 1 quái thú đồng minh hoặc giảm 400 ATK của 1 quái thú đối phương đang tấn công.",
    "scientificLore": "Nguyên lý Le Chatelier (SGK Hóa học 11 GDPT 2018): Khi tác động vào hệ cân bằng (nồng độ, nhiệt độ, áp suất), hệ sẽ tự chuyển dịch theo chiều chống lại tác động đó.",
    "relatedEquation": "Le Chatelier Shift towards Fewer Gas Moles",
    "iupacName": "High Pressure Equilibrium Shift Surge",
    "archetype": "LE_CHATELIER_EQUILIBRIUM",
    "structuredEffects": [
      {
        "effectId": "B19_EFF_81",
        "activationWindow": "QUICK",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Phép nhanh chuyển dịch cân bằng: Tăng 400 ATK cho toàn đội."
      }
    ]
  },
  {
    "id": "card_b19_082_quick_exothermic_temperature_drop_flash_82",
    "name": "Hạ Nhiệt Độ Phản Ứng Tỏa Nhiệt (Phản Ứng Nhanh 11)",
    "name_en": "Exothermic Temperature Drop Flash (Quick-Play 11)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "QUICK_PLAY_SPELL",
    "spellSpeed": 2,
    "rarity": "COMMON",
    "attribute": "AQUA",
    "manaCost": 2,
    "chemicalFormula": "ΔT < 0 (ΔH < 0)",
    "effectCode": "SPELL_B19_EXOTHERMIC_TEMPERATURE_DROP_FLASH_LECHAT_82",
    "effectText": "[Phép Nhanh / Quick-Play - Spell Speed 2]: Kích hoạt được trong lượt của đối thủ hoặc trong Chain. Chuyển dịch cân bằng hóa học: Tăng ngay 400 ATK cho 1 quái thú đồng minh hoặc giảm 400 ATK của 1 quái thú đối phương đang tấn công.",
    "scientificLore": "Nguyên lý Le Chatelier (SGK Hóa học 11 GDPT 2018): Khi tác động vào hệ cân bằng (nồng độ, nhiệt độ, áp suất), hệ sẽ tự chuyển dịch theo chiều chống lại tác động đó.",
    "relatedEquation": "Cooling Shifts Equilibrium Forward (Exothermic)",
    "iupacName": "Exothermic Temperature Drop Flash Surge",
    "archetype": "WEAK_ACID_BUFFER",
    "structuredEffects": [
      {
        "effectId": "B19_EFF_82",
        "activationWindow": "QUICK",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Phép nhanh chuyển dịch cân bằng: Tăng 400 ATK cho toàn đội."
      }
    ]
  },
  {
    "id": "card_b19_083_quick_reactant_concentration_surge_instant_83",
    "name": "Tăng Nồng Độ Tức Thời Chất Đầu (Phản Ứng Nhanh 11)",
    "name_en": "Reactant Concentration Surge Instant (Quick-Play 11)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "QUICK_PLAY_SPELL",
    "spellSpeed": 2,
    "rarity": "RARE",
    "attribute": "PYRO",
    "manaCost": 3,
    "chemicalFormula": "[Reactant] ↑",
    "effectCode": "SPELL_B19_REACTANT_CONCENTRATION_SURGE_INSTANT_LECHAT_83",
    "effectText": "[Phép Nhanh / Quick-Play - Spell Speed 2]: Kích hoạt được trong lượt của đối thủ hoặc trong Chain. Chuyển dịch cân bằng hóa học: Tăng ngay 400 ATK cho 1 quái thú đồng minh hoặc giảm 400 ATK của 1 quái thú đối phương đang tấn công.",
    "scientificLore": "Nguyên lý Le Chatelier (SGK Hóa học 11 GDPT 2018): Khi tác động vào hệ cân bằng (nồng độ, nhiệt độ, áp suất), hệ sẽ tự chuyển dịch theo chiều chống lại tác động đó.",
    "relatedEquation": "Surge in Reactant Drives Forward Reaction Speed",
    "iupacName": "Reactant Concentration Surge Instant Surge",
    "archetype": "LE_CHATELIER_EQUILIBRIUM",
    "structuredEffects": [
      {
        "effectId": "B19_EFF_83",
        "activationWindow": "QUICK",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Phép nhanh chuyển dịch cân bằng: Tăng 400 ATK cho toàn đội."
      }
    ]
  },
  {
    "id": "card_b19_084_quick_common_ion_suppression_shift_84",
    "name": "Hiệu Ứng Ion Chung Kìm Hãm (Phản Ứng Nhanh 11)",
    "name_en": "Common-Ion Suppression Shift (Quick-Play 11)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "QUICK_PLAY_SPELL",
    "spellSpeed": 2,
    "rarity": "RARE",
    "attribute": "TERRA",
    "manaCost": 4,
    "chemicalFormula": "Common Ion",
    "effectCode": "SPELL_B19_COMMON_ION_SUPPRESSION_SHIFT_LECHAT_84",
    "effectText": "[Phép Nhanh / Quick-Play - Spell Speed 2]: Kích hoạt được trong lượt của đối thủ hoặc trong Chain. Chuyển dịch cân bằng hóa học: Tăng ngay 400 ATK cho 1 quái thú đồng minh hoặc giảm 400 ATK của 1 quái thú đối phương đang tấn công.",
    "scientificLore": "Nguyên lý Le Chatelier (SGK Hóa học 11 GDPT 2018): Khi tác động vào hệ cân bằng (nồng độ, nhiệt độ, áp suất), hệ sẽ tự chuyển dịch theo chiều chống lại tác động đó.",
    "relatedEquation": "Addition of Common Ion Decreases Salt Solubility",
    "iupacName": "Common-Ion Suppression Shift Surge",
    "archetype": "WEAK_ACID_BUFFER",
    "structuredEffects": [
      {
        "effectId": "B19_EFF_84",
        "activationWindow": "QUICK",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Phép nhanh chuyển dịch cân bằng: Tăng 400 ATK cho toàn đội."
      }
    ]
  },
  {
    "id": "card_b19_085_quick_acetic_buffer_dynamic_restoration_85",
    "name": "Đệm Axit Axetic Cân Bằng pH (Phản Ứng Nhanh 11)",
    "name_en": "Acetic Buffer Dynamic Restoration (Quick-Play 11)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "QUICK_PLAY_SPELL",
    "spellSpeed": 2,
    "rarity": "SUPER_RARE",
    "attribute": "AQUA",
    "manaCost": 1,
    "chemicalFormula": "CH3COOH/CH3COO-",
    "effectCode": "SPELL_B19_ACETIC_BUFFER_DYNAMIC_RESTORATION_LECHAT_85",
    "effectText": "[Phép Nhanh / Quick-Play - Spell Speed 2]: Kích hoạt được trong lượt của đối thủ hoặc trong Chain. Chuyển dịch cân bằng hóa học: Tăng ngay 400 ATK cho 1 quái thú đồng minh hoặc giảm 400 ATK của 1 quái thú đối phương đang tấn công.",
    "scientificLore": "Nguyên lý Le Chatelier (SGK Hóa học 11 GDPT 2018): Khi tác động vào hệ cân bằng (nồng độ, nhiệt độ, áp suất), hệ sẽ tự chuyển dịch theo chiều chống lại tác động đó.",
    "relatedEquation": "Buffer Capacity Neutralizes Sudden H⁺/OH⁻ Influx",
    "iupacName": "Acetic Buffer Dynamic Restoration Surge",
    "archetype": "LE_CHATELIER_EQUILIBRIUM",
    "structuredEffects": [
      {
        "effectId": "B19_EFF_85",
        "activationWindow": "QUICK",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Phép nhanh chuyển dịch cân bằng: Tăng 400 ATK cho toàn đội."
      }
    ]
  },
  {
    "id": "card_b19_086_quick_equilibrium_constant_jump_pulse_86",
    "name": "Đột Biến Hằng Số Phản Ứng Kc (Phản Ứng Nhanh 11)",
    "name_en": "Equilibrium Constant Jump Pulse (Quick-Play 11)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "QUICK_PLAY_SPELL",
    "spellSpeed": 2,
    "rarity": "SUPER_RARE",
    "attribute": "ELECTRO",
    "manaCost": 2,
    "chemicalFormula": "Kc Mutation",
    "effectCode": "SPELL_B19_EQUILIBRIUM_CONSTANT_JUMP_PULSE_LECHAT_86",
    "effectText": "[Phép Nhanh / Quick-Play - Spell Speed 2]: Kích hoạt được trong lượt của đối thủ hoặc trong Chain. Chuyển dịch cân bằng hóa học: Tăng ngay 400 ATK cho 1 quái thú đồng minh hoặc giảm 400 ATK của 1 quái thú đối phương đang tấn công.",
    "scientificLore": "Nguyên lý Le Chatelier (SGK Hóa học 11 GDPT 2018): Khi tác động vào hệ cân bằng (nồng độ, nhiệt độ, áp suất), hệ sẽ tự chuyển dịch theo chiều chống lại tác động đó.",
    "relatedEquation": "Temperature Change Alters Equilibrium Constant Kc",
    "iupacName": "Equilibrium Constant Jump Pulse Surge",
    "archetype": "WEAK_ACID_BUFFER",
    "structuredEffects": [
      {
        "effectId": "B19_EFF_86",
        "activationWindow": "QUICK",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Phép nhanh chuyển dịch cân bằng: Tăng 400 ATK cho toàn đội."
      }
    ]
  },
  {
    "id": "card_b19_087_quick_continuous_product_evacuation_surge_87",
    "name": "Bơm Hút Sản Phẩm Kéo Theo (Phản Ứng Nhanh 11)",
    "name_en": "Continuous Product Evacuation Surge (Quick-Play 11)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "QUICK_PLAY_SPELL",
    "spellSpeed": 2,
    "rarity": "ULTRA_RARE",
    "attribute": "AERO",
    "manaCost": 3,
    "chemicalFormula": "[Product] ↓",
    "effectCode": "SPELL_B19_CONTINUOUS_PRODUCT_EVACUATION_SURGE_LECHAT_87",
    "effectText": "[Phép Nhanh / Quick-Play - Spell Speed 2]: Kích hoạt được trong lượt của đối thủ hoặc trong Chain. Chuyển dịch cân bằng hóa học: Tăng ngay 400 ATK cho 1 quái thú đồng minh hoặc giảm 400 ATK của 1 quái thú đối phương đang tấn công.",
    "scientificLore": "Nguyên lý Le Chatelier (SGK Hóa học 11 GDPT 2018): Khi tác động vào hệ cân bằng (nồng độ, nhiệt độ, áp suất), hệ sẽ tự chuyển dịch theo chiều chống lại tác động đó.",
    "relatedEquation": "Removing Product Forces 100% Forward Conversion",
    "iupacName": "Continuous Product Evacuation Surge Surge",
    "archetype": "LE_CHATELIER_EQUILIBRIUM",
    "structuredEffects": [
      {
        "effectId": "B19_EFF_87",
        "activationWindow": "QUICK",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Phép nhanh chuyển dịch cân bằng: Tăng 400 ATK cho toàn đội."
      }
    ]
  },
  {
    "id": "card_b19_088_quick_reversible_reaction_inversion_surge_88",
    "name": "Đảo Chiều Phản Ứng Thuận Nghịch (Phản Ứng Nhanh 11)",
    "name_en": "Reversible Reaction Inversion Surge (Quick-Play 11)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "QUICK_PLAY_SPELL",
    "spellSpeed": 2,
    "rarity": "SECRET_RARE",
    "attribute": "NOBLE_VOID",
    "manaCost": 4,
    "chemicalFormula": "v_rev > v_fwd",
    "effectCode": "SPELL_B19_REVERSIBLE_REACTION_INVERSION_SURGE_LECHAT_88",
    "effectText": "[Phép Nhanh / Quick-Play - Spell Speed 2]: Kích hoạt được trong lượt của đối thủ hoặc trong Chain. Chuyển dịch cân bằng hóa học: Tăng ngay 400 ATK cho 1 quái thú đồng minh hoặc giảm 400 ATK của 1 quái thú đối phương đang tấn công.",
    "scientificLore": "Nguyên lý Le Chatelier (SGK Hóa học 11 GDPT 2018): Khi tác động vào hệ cân bằng (nồng độ, nhiệt độ, áp suất), hệ sẽ tự chuyển dịch theo chiều chống lại tác động đó.",
    "relatedEquation": "Counter Shift Driving Reverse Chemical Reaction",
    "iupacName": "Reversible Reaction Inversion Surge Surge",
    "archetype": "WEAK_ACID_BUFFER",
    "structuredEffects": [
      {
        "effectId": "B19_EFF_88",
        "activationWindow": "QUICK",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Phép nhanh chuyển dịch cân bằng: Tăng 400 ATK cho toàn đội."
      }
    ]
  },
  {
    "id": "card_b19_089_quick_high_pressure_equilibrium_shift_89",
    "name": "Chuyển Dịch Tăng Áp Suất Khí (Phản Ứng Nhanh 12)",
    "name_en": "High Pressure Equilibrium Shift (Quick-Play 12)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "QUICK_PLAY_SPELL",
    "spellSpeed": 2,
    "rarity": "COMMON",
    "attribute": "AERO",
    "manaCost": 1,
    "chemicalFormula": "ΔP > 0",
    "effectCode": "SPELL_B19_HIGH_PRESSURE_EQUILIBRIUM_SHIFT_LECHAT_89",
    "effectText": "[Phép Nhanh / Quick-Play - Spell Speed 2]: Kích hoạt được trong lượt của đối thủ hoặc trong Chain. Chuyển dịch cân bằng hóa học: Tăng ngay 400 ATK cho 1 quái thú đồng minh hoặc giảm 400 ATK của 1 quái thú đối phương đang tấn công.",
    "scientificLore": "Nguyên lý Le Chatelier (SGK Hóa học 11 GDPT 2018): Khi tác động vào hệ cân bằng (nồng độ, nhiệt độ, áp suất), hệ sẽ tự chuyển dịch theo chiều chống lại tác động đó.",
    "relatedEquation": "Le Chatelier Shift towards Fewer Gas Moles",
    "iupacName": "High Pressure Equilibrium Shift Surge",
    "archetype": "LE_CHATELIER_EQUILIBRIUM",
    "structuredEffects": [
      {
        "effectId": "B19_EFF_89",
        "activationWindow": "QUICK",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Phép nhanh chuyển dịch cân bằng: Tăng 400 ATK cho toàn đội."
      }
    ]
  },
  {
    "id": "card_b19_090_quick_exothermic_temperature_drop_flash_90",
    "name": "Hạ Nhiệt Độ Phản Ứng Tỏa Nhiệt (Phản Ứng Nhanh 12)",
    "name_en": "Exothermic Temperature Drop Flash (Quick-Play 12)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "QUICK_PLAY_SPELL",
    "spellSpeed": 2,
    "rarity": "COMMON",
    "attribute": "AQUA",
    "manaCost": 2,
    "chemicalFormula": "ΔT < 0 (ΔH < 0)",
    "effectCode": "SPELL_B19_EXOTHERMIC_TEMPERATURE_DROP_FLASH_LECHAT_90",
    "effectText": "[Phép Nhanh / Quick-Play - Spell Speed 2]: Kích hoạt được trong lượt của đối thủ hoặc trong Chain. Chuyển dịch cân bằng hóa học: Tăng ngay 400 ATK cho 1 quái thú đồng minh hoặc giảm 400 ATK của 1 quái thú đối phương đang tấn công.",
    "scientificLore": "Nguyên lý Le Chatelier (SGK Hóa học 11 GDPT 2018): Khi tác động vào hệ cân bằng (nồng độ, nhiệt độ, áp suất), hệ sẽ tự chuyển dịch theo chiều chống lại tác động đó.",
    "relatedEquation": "Cooling Shifts Equilibrium Forward (Exothermic)",
    "iupacName": "Exothermic Temperature Drop Flash Surge",
    "archetype": "WEAK_ACID_BUFFER",
    "structuredEffects": [
      {
        "effectId": "B19_EFF_90",
        "activationWindow": "QUICK",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Phép nhanh chuyển dịch cân bằng: Tăng 400 ATK cho toàn đội."
      }
    ]
  },
  {
    "id": "card_b19_091_quick_reactant_concentration_surge_instant_91",
    "name": "Tăng Nồng Độ Tức Thời Chất Đầu (Phản Ứng Nhanh 12)",
    "name_en": "Reactant Concentration Surge Instant (Quick-Play 12)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "QUICK_PLAY_SPELL",
    "spellSpeed": 2,
    "rarity": "COMMON",
    "attribute": "PYRO",
    "manaCost": 3,
    "chemicalFormula": "[Reactant] ↑",
    "effectCode": "SPELL_B19_REACTANT_CONCENTRATION_SURGE_INSTANT_LECHAT_91",
    "effectText": "[Phép Nhanh / Quick-Play - Spell Speed 2]: Kích hoạt được trong lượt của đối thủ hoặc trong Chain. Chuyển dịch cân bằng hóa học: Tăng ngay 400 ATK cho 1 quái thú đồng minh hoặc giảm 400 ATK của 1 quái thú đối phương đang tấn công.",
    "scientificLore": "Nguyên lý Le Chatelier (SGK Hóa học 11 GDPT 2018): Khi tác động vào hệ cân bằng (nồng độ, nhiệt độ, áp suất), hệ sẽ tự chuyển dịch theo chiều chống lại tác động đó.",
    "relatedEquation": "Surge in Reactant Drives Forward Reaction Speed",
    "iupacName": "Reactant Concentration Surge Instant Surge",
    "archetype": "LE_CHATELIER_EQUILIBRIUM",
    "structuredEffects": [
      {
        "effectId": "B19_EFF_91",
        "activationWindow": "QUICK",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Phép nhanh chuyển dịch cân bằng: Tăng 400 ATK cho toàn đội."
      }
    ]
  },
  {
    "id": "card_b19_092_quick_common_ion_suppression_shift_92",
    "name": "Hiệu Ứng Ion Chung Kìm Hãm (Phản Ứng Nhanh 12)",
    "name_en": "Common-Ion Suppression Shift (Quick-Play 12)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "QUICK_PLAY_SPELL",
    "spellSpeed": 2,
    "rarity": "RARE",
    "attribute": "TERRA",
    "manaCost": 4,
    "chemicalFormula": "Common Ion",
    "effectCode": "SPELL_B19_COMMON_ION_SUPPRESSION_SHIFT_LECHAT_92",
    "effectText": "[Phép Nhanh / Quick-Play - Spell Speed 2]: Kích hoạt được trong lượt của đối thủ hoặc trong Chain. Chuyển dịch cân bằng hóa học: Tăng ngay 400 ATK cho 1 quái thú đồng minh hoặc giảm 400 ATK của 1 quái thú đối phương đang tấn công.",
    "scientificLore": "Nguyên lý Le Chatelier (SGK Hóa học 11 GDPT 2018): Khi tác động vào hệ cân bằng (nồng độ, nhiệt độ, áp suất), hệ sẽ tự chuyển dịch theo chiều chống lại tác động đó.",
    "relatedEquation": "Addition of Common Ion Decreases Salt Solubility",
    "iupacName": "Common-Ion Suppression Shift Surge",
    "archetype": "WEAK_ACID_BUFFER",
    "structuredEffects": [
      {
        "effectId": "B19_EFF_92",
        "activationWindow": "QUICK",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Phép nhanh chuyển dịch cân bằng: Tăng 400 ATK cho toàn đội."
      }
    ]
  },
  {
    "id": "card_b19_093_quick_acetic_buffer_dynamic_restoration_93",
    "name": "Đệm Axit Axetic Cân Bằng pH (Phản Ứng Nhanh 12)",
    "name_en": "Acetic Buffer Dynamic Restoration (Quick-Play 12)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "QUICK_PLAY_SPELL",
    "spellSpeed": 2,
    "rarity": "RARE",
    "attribute": "AQUA",
    "manaCost": 1,
    "chemicalFormula": "CH3COOH/CH3COO-",
    "effectCode": "SPELL_B19_ACETIC_BUFFER_DYNAMIC_RESTORATION_LECHAT_93",
    "effectText": "[Phép Nhanh / Quick-Play - Spell Speed 2]: Kích hoạt được trong lượt của đối thủ hoặc trong Chain. Chuyển dịch cân bằng hóa học: Tăng ngay 400 ATK cho 1 quái thú đồng minh hoặc giảm 400 ATK của 1 quái thú đối phương đang tấn công.",
    "scientificLore": "Nguyên lý Le Chatelier (SGK Hóa học 11 GDPT 2018): Khi tác động vào hệ cân bằng (nồng độ, nhiệt độ, áp suất), hệ sẽ tự chuyển dịch theo chiều chống lại tác động đó.",
    "relatedEquation": "Buffer Capacity Neutralizes Sudden H⁺/OH⁻ Influx",
    "iupacName": "Acetic Buffer Dynamic Restoration Surge",
    "archetype": "LE_CHATELIER_EQUILIBRIUM",
    "structuredEffects": [
      {
        "effectId": "B19_EFF_93",
        "activationWindow": "QUICK",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Phép nhanh chuyển dịch cân bằng: Tăng 400 ATK cho toàn đội."
      }
    ]
  },
  {
    "id": "card_b19_094_quick_equilibrium_constant_jump_pulse_94",
    "name": "Đột Biến Hằng Số Phản Ứng Kc (Phản Ứng Nhanh 12)",
    "name_en": "Equilibrium Constant Jump Pulse (Quick-Play 12)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "QUICK_PLAY_SPELL",
    "spellSpeed": 2,
    "rarity": "SUPER_RARE",
    "attribute": "ELECTRO",
    "manaCost": 2,
    "chemicalFormula": "Kc Mutation",
    "effectCode": "SPELL_B19_EQUILIBRIUM_CONSTANT_JUMP_PULSE_LECHAT_94",
    "effectText": "[Phép Nhanh / Quick-Play - Spell Speed 2]: Kích hoạt được trong lượt của đối thủ hoặc trong Chain. Chuyển dịch cân bằng hóa học: Tăng ngay 400 ATK cho 1 quái thú đồng minh hoặc giảm 400 ATK của 1 quái thú đối phương đang tấn công.",
    "scientificLore": "Nguyên lý Le Chatelier (SGK Hóa học 11 GDPT 2018): Khi tác động vào hệ cân bằng (nồng độ, nhiệt độ, áp suất), hệ sẽ tự chuyển dịch theo chiều chống lại tác động đó.",
    "relatedEquation": "Temperature Change Alters Equilibrium Constant Kc",
    "iupacName": "Equilibrium Constant Jump Pulse Surge",
    "archetype": "WEAK_ACID_BUFFER",
    "structuredEffects": [
      {
        "effectId": "B19_EFF_94",
        "activationWindow": "QUICK",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Phép nhanh chuyển dịch cân bằng: Tăng 400 ATK cho toàn đội."
      }
    ]
  },
  {
    "id": "card_b19_095_quick_continuous_product_evacuation_surge_95",
    "name": "Bơm Hút Sản Phẩm Kéo Theo (Phản Ứng Nhanh 12)",
    "name_en": "Continuous Product Evacuation Surge (Quick-Play 12)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "QUICK_PLAY_SPELL",
    "spellSpeed": 2,
    "rarity": "SUPER_RARE",
    "attribute": "AERO",
    "manaCost": 3,
    "chemicalFormula": "[Product] ↓",
    "effectCode": "SPELL_B19_CONTINUOUS_PRODUCT_EVACUATION_SURGE_LECHAT_95",
    "effectText": "[Phép Nhanh / Quick-Play - Spell Speed 2]: Kích hoạt được trong lượt của đối thủ hoặc trong Chain. Chuyển dịch cân bằng hóa học: Tăng ngay 400 ATK cho 1 quái thú đồng minh hoặc giảm 400 ATK của 1 quái thú đối phương đang tấn công.",
    "scientificLore": "Nguyên lý Le Chatelier (SGK Hóa học 11 GDPT 2018): Khi tác động vào hệ cân bằng (nồng độ, nhiệt độ, áp suất), hệ sẽ tự chuyển dịch theo chiều chống lại tác động đó.",
    "relatedEquation": "Removing Product Forces 100% Forward Conversion",
    "iupacName": "Continuous Product Evacuation Surge Surge",
    "archetype": "LE_CHATELIER_EQUILIBRIUM",
    "structuredEffects": [
      {
        "effectId": "B19_EFF_95",
        "activationWindow": "QUICK",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Phép nhanh chuyển dịch cân bằng: Tăng 400 ATK cho toàn đội."
      }
    ]
  },
  {
    "id": "card_b19_096_quick_reversible_reaction_inversion_surge_96",
    "name": "Đảo Chiều Phản Ứng Thuận Nghịch (Phản Ứng Nhanh 12)",
    "name_en": "Reversible Reaction Inversion Surge (Quick-Play 12)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "QUICK_PLAY_SPELL",
    "spellSpeed": 2,
    "rarity": "ULTRA_RARE",
    "attribute": "NOBLE_VOID",
    "manaCost": 4,
    "chemicalFormula": "v_rev > v_fwd",
    "effectCode": "SPELL_B19_REVERSIBLE_REACTION_INVERSION_SURGE_LECHAT_96",
    "effectText": "[Phép Nhanh / Quick-Play - Spell Speed 2]: Kích hoạt được trong lượt của đối thủ hoặc trong Chain. Chuyển dịch cân bằng hóa học: Tăng ngay 400 ATK cho 1 quái thú đồng minh hoặc giảm 400 ATK của 1 quái thú đối phương đang tấn công.",
    "scientificLore": "Nguyên lý Le Chatelier (SGK Hóa học 11 GDPT 2018): Khi tác động vào hệ cân bằng (nồng độ, nhiệt độ, áp suất), hệ sẽ tự chuyển dịch theo chiều chống lại tác động đó.",
    "relatedEquation": "Counter Shift Driving Reverse Chemical Reaction",
    "iupacName": "Reversible Reaction Inversion Surge Surge",
    "archetype": "WEAK_ACID_BUFFER",
    "structuredEffects": [
      {
        "effectId": "B19_EFF_96",
        "activationWindow": "QUICK",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Phép nhanh chuyển dịch cân bằng: Tăng 400 ATK cho toàn đội."
      }
    ]
  },
  {
    "id": "card_b19_097_quick_high_pressure_equilibrium_shift_97",
    "name": "Chuyển Dịch Tăng Áp Suất Khí (Phản Ứng Nhanh 13)",
    "name_en": "High Pressure Equilibrium Shift (Quick-Play 13)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "QUICK_PLAY_SPELL",
    "spellSpeed": 2,
    "rarity": "SECRET_RARE",
    "attribute": "AERO",
    "manaCost": 1,
    "chemicalFormula": "ΔP > 0",
    "effectCode": "SPELL_B19_HIGH_PRESSURE_EQUILIBRIUM_SHIFT_LECHAT_97",
    "effectText": "[Phép Nhanh / Quick-Play - Spell Speed 2]: Kích hoạt được trong lượt của đối thủ hoặc trong Chain. Chuyển dịch cân bằng hóa học: Tăng ngay 400 ATK cho 1 quái thú đồng minh hoặc giảm 400 ATK của 1 quái thú đối phương đang tấn công.",
    "scientificLore": "Nguyên lý Le Chatelier (SGK Hóa học 11 GDPT 2018): Khi tác động vào hệ cân bằng (nồng độ, nhiệt độ, áp suất), hệ sẽ tự chuyển dịch theo chiều chống lại tác động đó.",
    "relatedEquation": "Le Chatelier Shift towards Fewer Gas Moles",
    "iupacName": "High Pressure Equilibrium Shift Surge",
    "archetype": "LE_CHATELIER_EQUILIBRIUM",
    "structuredEffects": [
      {
        "effectId": "B19_EFF_97",
        "activationWindow": "QUICK",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Phép nhanh chuyển dịch cân bằng: Tăng 400 ATK cho toàn đội."
      }
    ]
  },
  {
    "id": "card_b19_098_quick_exothermic_temperature_drop_flash_98",
    "name": "Hạ Nhiệt Độ Phản Ứng Tỏa Nhiệt (Phản Ứng Nhanh 13)",
    "name_en": "Exothermic Temperature Drop Flash (Quick-Play 13)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "QUICK_PLAY_SPELL",
    "spellSpeed": 2,
    "rarity": "COMMON",
    "attribute": "AQUA",
    "manaCost": 2,
    "chemicalFormula": "ΔT < 0 (ΔH < 0)",
    "effectCode": "SPELL_B19_EXOTHERMIC_TEMPERATURE_DROP_FLASH_LECHAT_98",
    "effectText": "[Phép Nhanh / Quick-Play - Spell Speed 2]: Kích hoạt được trong lượt của đối thủ hoặc trong Chain. Chuyển dịch cân bằng hóa học: Tăng ngay 400 ATK cho 1 quái thú đồng minh hoặc giảm 400 ATK của 1 quái thú đối phương đang tấn công.",
    "scientificLore": "Nguyên lý Le Chatelier (SGK Hóa học 11 GDPT 2018): Khi tác động vào hệ cân bằng (nồng độ, nhiệt độ, áp suất), hệ sẽ tự chuyển dịch theo chiều chống lại tác động đó.",
    "relatedEquation": "Cooling Shifts Equilibrium Forward (Exothermic)",
    "iupacName": "Exothermic Temperature Drop Flash Surge",
    "archetype": "WEAK_ACID_BUFFER",
    "structuredEffects": [
      {
        "effectId": "B19_EFF_98",
        "activationWindow": "QUICK",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Phép nhanh chuyển dịch cân bằng: Tăng 400 ATK cho toàn đội."
      }
    ]
  },
  {
    "id": "card_b19_099_quick_reactant_concentration_surge_instant_99",
    "name": "Tăng Nồng Độ Tức Thời Chất Đầu (Phản Ứng Nhanh 13)",
    "name_en": "Reactant Concentration Surge Instant (Quick-Play 13)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "QUICK_PLAY_SPELL",
    "spellSpeed": 2,
    "rarity": "COMMON",
    "attribute": "PYRO",
    "manaCost": 3,
    "chemicalFormula": "[Reactant] ↑",
    "effectCode": "SPELL_B19_REACTANT_CONCENTRATION_SURGE_INSTANT_LECHAT_99",
    "effectText": "[Phép Nhanh / Quick-Play - Spell Speed 2]: Kích hoạt được trong lượt của đối thủ hoặc trong Chain. Chuyển dịch cân bằng hóa học: Tăng ngay 400 ATK cho 1 quái thú đồng minh hoặc giảm 400 ATK của 1 quái thú đối phương đang tấn công.",
    "scientificLore": "Nguyên lý Le Chatelier (SGK Hóa học 11 GDPT 2018): Khi tác động vào hệ cân bằng (nồng độ, nhiệt độ, áp suất), hệ sẽ tự chuyển dịch theo chiều chống lại tác động đó.",
    "relatedEquation": "Surge in Reactant Drives Forward Reaction Speed",
    "iupacName": "Reactant Concentration Surge Instant Surge",
    "archetype": "LE_CHATELIER_EQUILIBRIUM",
    "structuredEffects": [
      {
        "effectId": "B19_EFF_99",
        "activationWindow": "QUICK",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Phép nhanh chuyển dịch cân bằng: Tăng 400 ATK cho toàn đội."
      }
    ]
  },
  {
    "id": "card_b19_100_quick_common_ion_suppression_shift_100",
    "name": "Hiệu Ứng Ion Chung Kìm Hãm (Phản Ứng Nhanh 13)",
    "name_en": "Common-Ion Suppression Shift (Quick-Play 13)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "QUICK_PLAY_SPELL",
    "spellSpeed": 2,
    "rarity": "COMMON",
    "attribute": "TERRA",
    "manaCost": 4,
    "chemicalFormula": "Common Ion",
    "effectCode": "SPELL_B19_COMMON_ION_SUPPRESSION_SHIFT_LECHAT_100",
    "effectText": "[Phép Nhanh / Quick-Play - Spell Speed 2]: Kích hoạt được trong lượt của đối thủ hoặc trong Chain. Chuyển dịch cân bằng hóa học: Tăng ngay 400 ATK cho 1 quái thú đồng minh hoặc giảm 400 ATK của 1 quái thú đối phương đang tấn công.",
    "scientificLore": "Nguyên lý Le Chatelier (SGK Hóa học 11 GDPT 2018): Khi tác động vào hệ cân bằng (nồng độ, nhiệt độ, áp suất), hệ sẽ tự chuyển dịch theo chiều chống lại tác động đó.",
    "relatedEquation": "Addition of Common Ion Decreases Salt Solubility",
    "iupacName": "Common-Ion Suppression Shift Surge",
    "archetype": "WEAK_ACID_BUFFER",
    "structuredEffects": [
      {
        "effectId": "B19_EFF_100",
        "activationWindow": "QUICK",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Phép nhanh chuyển dịch cân bằng: Tăng 400 ATK cho toàn đội."
      }
    ]
  }
];
