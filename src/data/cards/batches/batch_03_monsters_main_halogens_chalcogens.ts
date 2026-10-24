// src/data/cards/batches/batch_03_monsters_main_halogens_chalcogens.ts
// Batch 03: Halogen & Chalcogen Monsters (100 cards)
// Automatically generated and validated for ELEMENTA Tactical TCG

import { PlayableCardDef } from '../../../domain/cardGameTypes';

export const BATCH_03_CARDS: PlayableCardDef[] = [
  {
    "id": "card_b03_001_f_1",
    "name": "Flo — Kẻ Bào Mòn (F2 Dạng 1)",
    "name_en": "Fluorine — Kẻ Bào Mòn Specimen 1",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "AERO",
    "manaCost": 1,
    "level": 2,
    "atk": 1340,
    "def": 1020,
    "chemicalFormula": "F2",
    "atomicNumber": 9,
    "effectCode": "ELEM_B03_F_PURGE_1",
    "effectText": "Khi tấn công: Bào mòn 200 ATK của quái thú mục tiêu trước khi tính toán sát thương.",
    "scientificLore": "Flo (F, Z=9) có độ âm điện lớn, tính oxi hóa mãnh liệt tạo thành dạng thù hình F2.",
    "relatedEquation": "2F₂ + 2H₂O → 4HF + O₂",
    "iupacName": "Fluorine Allotrope",
    "archetype": "HALOGEN_PURGE",
    "structuredEffects": [
      {
        "effectId": "B03_EFF_1",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Bào mòn 300 ATK quái thú đối phương."
      }
    ]
  },
  {
    "id": "card_b03_002_cl_2",
    "name": "Clo — Kẻ Bào Mòn (Cl2 Dạng 2)",
    "name_en": "Chlorine — Kẻ Bào Mòn Specimen 2",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "AERO",
    "manaCost": 2,
    "level": 3,
    "atk": 1620,
    "def": 1230,
    "chemicalFormula": "Cl2",
    "atomicNumber": 17,
    "effectCode": "ELEM_B03_CL_PURGE_2",
    "effectText": "Khi tấn công: Bào mòn 300 ATK của quái thú mục tiêu trước khi tính toán sát thương.",
    "scientificLore": "Clo (Cl, Z=17) có độ âm điện lớn, tính oxi hóa mãnh liệt tạo thành dạng thù hình Cl2.",
    "relatedEquation": "Cl₂ + H₂O ⇌ HCl + HClO",
    "iupacName": "Chlorine Allotrope",
    "archetype": "HALOGEN_PURGE",
    "structuredEffects": [
      {
        "effectId": "B03_EFF_2",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Bào mòn 300 ATK quái thú đối phương."
      }
    ]
  },
  {
    "id": "card_b03_003_br_3",
    "name": "Brom — Kẻ Bào Mòn (Br2 Dạng 3)",
    "name_en": "Bromine — Kẻ Bào Mòn Specimen 3",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "AQUA",
    "manaCost": 3,
    "level": 4,
    "atk": 1900,
    "def": 1440,
    "chemicalFormula": "Br2",
    "atomicNumber": 35,
    "effectCode": "ELEM_B03_BR_PURGE_3",
    "effectText": "Khi tấn công: Bào mòn 400 ATK của quái thú mục tiêu trước khi tính toán sát thương.",
    "scientificLore": "Brom (Br, Z=35) có độ âm điện lớn, tính oxi hóa mãnh liệt tạo thành dạng thù hình Br2.",
    "relatedEquation": "Br₂ + 2KI → 2KBr + I₂",
    "iupacName": "Bromine Allotrope",
    "archetype": "HALOGEN_PURGE",
    "structuredEffects": [
      {
        "effectId": "B03_EFF_3",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Bào mòn 300 ATK quái thú đối phương."
      }
    ]
  },
  {
    "id": "card_b03_004_i_4",
    "name": "Iot — Kẻ Bào Mòn (I2 Dạng 4)",
    "name_en": "Iodine — Kẻ Bào Mòn Specimen 4",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "ULTRA_RARE",
    "attribute": "TERRA",
    "manaCost": 4,
    "level": 5,
    "atk": 2180,
    "def": 1650,
    "chemicalFormula": "I2",
    "atomicNumber": 53,
    "effectCode": "ELEM_B03_I_PURGE_4",
    "effectText": "Khi tấn công: Bào mòn 200 ATK của quái thú mục tiêu trước khi tính toán sát thương.",
    "scientificLore": "Iot (I, Z=53) có độ âm điện lớn, tính oxi hóa mãnh liệt tạo thành dạng thù hình I2.",
    "relatedEquation": "I₂ + starch → Dark Blue Complex",
    "iupacName": "Iodine Allotrope",
    "archetype": "HALOGEN_PURGE",
    "structuredEffects": [
      {
        "effectId": "B03_EFF_4",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Bào mòn 300 ATK quái thú đối phương."
      }
    ]
  },
  {
    "id": "card_b03_005_at_5",
    "name": "Astatin — Kẻ Bào Mòn (At2 Dạng 5)",
    "name_en": "Astatine — Kẻ Bào Mòn Specimen 5",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SECRET_RARE",
    "attribute": "ACID_DARK",
    "manaCost": 5,
    "level": 6,
    "atk": 2460,
    "def": 1660,
    "chemicalFormula": "At2",
    "atomicNumber": 85,
    "effectCode": "ELEM_B03_AT_PURGE_5",
    "effectText": "Khi tấn công: Bào mòn 300 ATK của quái thú mục tiêu trước khi tính toán sát thương.",
    "scientificLore": "Astatin (At, Z=85) có độ âm điện lớn, tính oxi hóa mãnh liệt tạo thành dạng thù hình At2.",
    "relatedEquation": "2At⁻ - 2e⁻ → At₂",
    "iupacName": "Astatine Allotrope",
    "archetype": "HALOGEN_PURGE",
    "structuredEffects": [
      {
        "effectId": "B03_EFF_5",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Bào mòn 300 ATK quái thú đối phương."
      }
    ]
  },
  {
    "id": "card_b03_006_o_6",
    "name": "Oxy — Kẻ Bào Mòn (O3 Dạng 6)",
    "name_en": "Oxygen — Kẻ Bào Mòn Specimen 6",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "AERO",
    "manaCost": 5,
    "level": 7,
    "atk": 2440,
    "def": 1870,
    "chemicalFormula": "O3",
    "atomicNumber": 8,
    "effectCode": "ELEM_B03_O_PURGE_6",
    "effectText": "Khi bị tiêu diệt: Gây 400 LP sát thương nhiệt lên người chơi tiêu diệt nó.",
    "scientificLore": "Oxy (O, Z=8) có độ âm điện lớn, tính oxi hóa mãnh liệt tạo thành dạng thù hình O3.",
    "relatedEquation": "3O₂ → 2O₃",
    "iupacName": "Oxygen Allotrope",
    "archetype": "CHALCOGEN_EMBER",
    "structuredEffects": [
      {
        "effectId": "B03_EFF_6",
        "activationWindow": "ON_DESTROY",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 400
            }
          }
        ],
        "description": "Nổ 400 LP khi bị tiêu diệt."
      }
    ]
  },
  {
    "id": "card_b03_007_s_7",
    "name": "Lưu Huỳnh — Kẻ Bào Mòn (S8 Dạng 7)",
    "name_en": "Sulfur — Kẻ Bào Mòn Specimen 7",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "PYRO",
    "manaCost": 1,
    "level": 2,
    "atk": 1400,
    "def": 1120,
    "chemicalFormula": "S8",
    "atomicNumber": 16,
    "effectCode": "ELEM_B03_S_PURGE_7",
    "effectText": "Khi bị tiêu diệt: Gây 500 LP sát thương nhiệt lên người chơi tiêu diệt nó.",
    "scientificLore": "Lưu Huỳnh (S, Z=16) có độ âm điện lớn, tính oxi hóa mãnh liệt tạo thành dạng thù hình S8.",
    "relatedEquation": "S + O₂ → SO₂",
    "iupacName": "Sulfur Allotrope",
    "archetype": "CHALCOGEN_EMBER",
    "structuredEffects": [
      {
        "effectId": "B03_EFF_7",
        "activationWindow": "ON_DESTROY",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 400
            }
          }
        ],
        "description": "Nổ 400 LP khi bị tiêu diệt."
      }
    ]
  },
  {
    "id": "card_b03_008_se_8",
    "name": "Selen — Kẻ Bào Mòn (SeO2 Dạng 8)",
    "name_en": "Selenium — Kẻ Bào Mòn Specimen 8",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "ELECTRO",
    "manaCost": 2,
    "level": 3,
    "atk": 1680,
    "def": 1330,
    "chemicalFormula": "SeO2",
    "atomicNumber": 34,
    "effectCode": "ELEM_B03_SE_PURGE_8",
    "effectText": "Khi bị tiêu diệt: Gây 600 LP sát thương nhiệt lên người chơi tiêu diệt nó.",
    "scientificLore": "Selen (Se, Z=34) có độ âm điện lớn, tính oxi hóa mãnh liệt tạo thành dạng thù hình SeO2.",
    "relatedEquation": "Se + O₂ → SeO₂",
    "iupacName": "Selenium Allotrope",
    "archetype": "CHALCOGEN_EMBER",
    "structuredEffects": [
      {
        "effectId": "B03_EFF_8",
        "activationWindow": "ON_DESTROY",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 400
            }
          }
        ],
        "description": "Nổ 400 LP khi bị tiêu diệt."
      }
    ]
  },
  {
    "id": "card_b03_009_te_9",
    "name": "Telu — Kẻ Bào Mòn (TeO2 Dạng 9)",
    "name_en": "Tellurium — Kẻ Bào Mòn Specimen 9",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "TERRA",
    "manaCost": 3,
    "level": 4,
    "atk": 1960,
    "def": 1340,
    "chemicalFormula": "TeO2",
    "atomicNumber": 52,
    "effectCode": "ELEM_B03_TE_PURGE_9",
    "effectText": "Khi bị tiêu diệt: Gây 300 LP sát thương nhiệt lên người chơi tiêu diệt nó.",
    "scientificLore": "Telu (Te, Z=52) có độ âm điện lớn, tính oxi hóa mãnh liệt tạo thành dạng thù hình TeO2.",
    "relatedEquation": "Te + O₂ → TeO₂",
    "iupacName": "Tellurium Allotrope",
    "archetype": "CHALCOGEN_EMBER",
    "structuredEffects": [
      {
        "effectId": "B03_EFF_9",
        "activationWindow": "ON_DESTROY",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 400
            }
          }
        ],
        "description": "Nổ 400 LP khi bị tiêu diệt."
      }
    ]
  },
  {
    "id": "card_b03_010_po_10",
    "name": "Poloni — Kẻ Bào Mòn (PoO2 Dạng 10)",
    "name_en": "Polonium — Kẻ Bào Mòn Specimen 10",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "ACID_DARK",
    "manaCost": 4,
    "level": 5,
    "atk": 2240,
    "def": 1550,
    "chemicalFormula": "PoO2",
    "atomicNumber": 84,
    "effectCode": "ELEM_B03_PO_PURGE_10",
    "effectText": "Khi bị tiêu diệt: Gây 400 LP sát thương nhiệt lên người chơi tiêu diệt nó.",
    "scientificLore": "Poloni (Po, Z=84) có độ âm điện lớn, tính oxi hóa mãnh liệt tạo thành dạng thù hình PoO2.",
    "relatedEquation": "Po + O₂ → PoO₂",
    "iupacName": "Polonium Allotrope",
    "archetype": "CHALCOGEN_EMBER",
    "structuredEffects": [
      {
        "effectId": "B03_EFF_10",
        "activationWindow": "ON_DESTROY",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 400
            }
          }
        ],
        "description": "Nổ 400 LP khi bị tiêu diệt."
      }
    ]
  },
  {
    "id": "card_b03_011_f_11",
    "name": "Flo — Thợ Săn Oxi Hóa (F2 Dạng 11)",
    "name_en": "Fluorine — Thợ Săn Oxi Hóa Specimen 11",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "AERO",
    "manaCost": 5,
    "level": 6,
    "atk": 2220,
    "def": 1760,
    "chemicalFormula": "F2",
    "atomicNumber": 9,
    "effectCode": "ELEM_B03_F_PURGE_11",
    "effectText": "Khi tấn công: Bào mòn 300 ATK của quái thú mục tiêu trước khi tính toán sát thương.",
    "scientificLore": "Flo (F, Z=9) có độ âm điện lớn, tính oxi hóa mãnh liệt tạo thành dạng thù hình F2.",
    "relatedEquation": "2F₂ + 2H₂O → 4HF + O₂",
    "iupacName": "Fluorine Allotrope",
    "archetype": "HALOGEN_PURGE",
    "structuredEffects": [
      {
        "effectId": "B03_EFF_11",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Bào mòn 300 ATK quái thú đối phương."
      }
    ]
  },
  {
    "id": "card_b03_012_cl_12",
    "name": "Clo — Thợ Săn Oxi Hóa (Cl2 Dạng 12)",
    "name_en": "Chlorine — Thợ Săn Oxi Hóa Specimen 12",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "AERO",
    "manaCost": 5,
    "level": 7,
    "atk": 2500,
    "def": 1970,
    "chemicalFormula": "Cl2",
    "atomicNumber": 17,
    "effectCode": "ELEM_B03_CL_PURGE_12",
    "effectText": "Khi tấn công: Bào mòn 400 ATK của quái thú mục tiêu trước khi tính toán sát thương.",
    "scientificLore": "Clo (Cl, Z=17) có độ âm điện lớn, tính oxi hóa mãnh liệt tạo thành dạng thù hình Cl2.",
    "relatedEquation": "Cl₂ + H₂O ⇌ HCl + HClO",
    "iupacName": "Chlorine Allotrope",
    "archetype": "HALOGEN_PURGE",
    "structuredEffects": [
      {
        "effectId": "B03_EFF_12",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Bào mòn 300 ATK quái thú đối phương."
      }
    ]
  },
  {
    "id": "card_b03_013_br_13",
    "name": "Brom — Thợ Săn Oxi Hóa (Br2 Dạng 13)",
    "name_en": "Bromine — Thợ Săn Oxi Hóa Specimen 13",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "ULTRA_RARE",
    "attribute": "AQUA",
    "manaCost": 1,
    "level": 2,
    "atk": 1460,
    "def": 1020,
    "chemicalFormula": "Br2",
    "atomicNumber": 35,
    "effectCode": "ELEM_B03_BR_PURGE_13",
    "effectText": "Khi tấn công: Bào mòn 200 ATK của quái thú mục tiêu trước khi tính toán sát thương.",
    "scientificLore": "Brom (Br, Z=35) có độ âm điện lớn, tính oxi hóa mãnh liệt tạo thành dạng thù hình Br2.",
    "relatedEquation": "Br₂ + 2KI → 2KBr + I₂",
    "iupacName": "Bromine Allotrope",
    "archetype": "HALOGEN_PURGE",
    "structuredEffects": [
      {
        "effectId": "B03_EFF_13",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Bào mòn 300 ATK quái thú đối phương."
      }
    ]
  },
  {
    "id": "card_b03_014_i_14",
    "name": "Iot — Thợ Săn Oxi Hóa (I2 Dạng 14)",
    "name_en": "Iodine — Thợ Săn Oxi Hóa Specimen 14",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SECRET_RARE",
    "attribute": "TERRA",
    "manaCost": 2,
    "level": 3,
    "atk": 1740,
    "def": 1230,
    "chemicalFormula": "I2",
    "atomicNumber": 53,
    "effectCode": "ELEM_B03_I_PURGE_14",
    "effectText": "Khi tấn công: Bào mòn 300 ATK của quái thú mục tiêu trước khi tính toán sát thương.",
    "scientificLore": "Iot (I, Z=53) có độ âm điện lớn, tính oxi hóa mãnh liệt tạo thành dạng thù hình I2.",
    "relatedEquation": "I₂ + starch → Dark Blue Complex",
    "iupacName": "Iodine Allotrope",
    "archetype": "HALOGEN_PURGE",
    "structuredEffects": [
      {
        "effectId": "B03_EFF_14",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Bào mòn 300 ATK quái thú đối phương."
      }
    ]
  },
  {
    "id": "card_b03_015_at_15",
    "name": "Astatin — Thợ Săn Oxi Hóa (At2 Dạng 15)",
    "name_en": "Astatine — Thợ Săn Oxi Hóa Specimen 15",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "ACID_DARK",
    "manaCost": 3,
    "level": 4,
    "atk": 2020,
    "def": 1440,
    "chemicalFormula": "At2",
    "atomicNumber": 85,
    "effectCode": "ELEM_B03_AT_PURGE_15",
    "effectText": "Khi tấn công: Bào mòn 400 ATK của quái thú mục tiêu trước khi tính toán sát thương.",
    "scientificLore": "Astatin (At, Z=85) có độ âm điện lớn, tính oxi hóa mãnh liệt tạo thành dạng thù hình At2.",
    "relatedEquation": "2At⁻ - 2e⁻ → At₂",
    "iupacName": "Astatine Allotrope",
    "archetype": "HALOGEN_PURGE",
    "structuredEffects": [
      {
        "effectId": "B03_EFF_15",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Bào mòn 300 ATK quái thú đối phương."
      }
    ]
  },
  {
    "id": "card_b03_016_o_16",
    "name": "Oxy — Thợ Săn Oxi Hóa (O3 Dạng 16)",
    "name_en": "Oxygen — Thợ Săn Oxi Hóa Specimen 16",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "AERO",
    "manaCost": 4,
    "level": 5,
    "atk": 2000,
    "def": 1650,
    "chemicalFormula": "O3",
    "atomicNumber": 8,
    "effectCode": "ELEM_B03_O_PURGE_16",
    "effectText": "Khi bị tiêu diệt: Gây 600 LP sát thương nhiệt lên người chơi tiêu diệt nó.",
    "scientificLore": "Oxy (O, Z=8) có độ âm điện lớn, tính oxi hóa mãnh liệt tạo thành dạng thù hình O3.",
    "relatedEquation": "3O₂ → 2O₃",
    "iupacName": "Oxygen Allotrope",
    "archetype": "CHALCOGEN_EMBER",
    "structuredEffects": [
      {
        "effectId": "B03_EFF_16",
        "activationWindow": "ON_DESTROY",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 400
            }
          }
        ],
        "description": "Nổ 400 LP khi bị tiêu diệt."
      }
    ]
  },
  {
    "id": "card_b03_017_s_17",
    "name": "Lưu Huỳnh — Thợ Săn Oxi Hóa (S8 Dạng 17)",
    "name_en": "Sulfur — Thợ Săn Oxi Hóa Specimen 17",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "PYRO",
    "manaCost": 5,
    "level": 6,
    "atk": 2280,
    "def": 1660,
    "chemicalFormula": "S8",
    "atomicNumber": 16,
    "effectCode": "ELEM_B03_S_PURGE_17",
    "effectText": "Khi bị tiêu diệt: Gây 300 LP sát thương nhiệt lên người chơi tiêu diệt nó.",
    "scientificLore": "Lưu Huỳnh (S, Z=16) có độ âm điện lớn, tính oxi hóa mãnh liệt tạo thành dạng thù hình S8.",
    "relatedEquation": "S + O₂ → SO₂",
    "iupacName": "Sulfur Allotrope",
    "archetype": "CHALCOGEN_EMBER",
    "structuredEffects": [
      {
        "effectId": "B03_EFF_17",
        "activationWindow": "ON_DESTROY",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 400
            }
          }
        ],
        "description": "Nổ 400 LP khi bị tiêu diệt."
      }
    ]
  },
  {
    "id": "card_b03_018_se_18",
    "name": "Selen — Thợ Săn Oxi Hóa (SeO2 Dạng 18)",
    "name_en": "Selenium — Thợ Săn Oxi Hóa Specimen 18",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "ELECTRO",
    "manaCost": 5,
    "level": 7,
    "atk": 2560,
    "def": 1870,
    "chemicalFormula": "SeO2",
    "atomicNumber": 34,
    "effectCode": "ELEM_B03_SE_PURGE_18",
    "effectText": "Khi bị tiêu diệt: Gây 400 LP sát thương nhiệt lên người chơi tiêu diệt nó.",
    "scientificLore": "Selen (Se, Z=34) có độ âm điện lớn, tính oxi hóa mãnh liệt tạo thành dạng thù hình SeO2.",
    "relatedEquation": "Se + O₂ → SeO₂",
    "iupacName": "Selenium Allotrope",
    "archetype": "CHALCOGEN_EMBER",
    "structuredEffects": [
      {
        "effectId": "B03_EFF_18",
        "activationWindow": "ON_DESTROY",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 400
            }
          }
        ],
        "description": "Nổ 400 LP khi bị tiêu diệt."
      }
    ]
  },
  {
    "id": "card_b03_019_te_19",
    "name": "Telu — Thợ Săn Oxi Hóa (TeO2 Dạng 19)",
    "name_en": "Tellurium — Thợ Săn Oxi Hóa Specimen 19",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "TERRA",
    "manaCost": 1,
    "level": 2,
    "atk": 1520,
    "def": 1120,
    "chemicalFormula": "TeO2",
    "atomicNumber": 52,
    "effectCode": "ELEM_B03_TE_PURGE_19",
    "effectText": "Khi bị tiêu diệt: Gây 500 LP sát thương nhiệt lên người chơi tiêu diệt nó.",
    "scientificLore": "Telu (Te, Z=52) có độ âm điện lớn, tính oxi hóa mãnh liệt tạo thành dạng thù hình TeO2.",
    "relatedEquation": "Te + O₂ → TeO₂",
    "iupacName": "Tellurium Allotrope",
    "archetype": "CHALCOGEN_EMBER",
    "structuredEffects": [
      {
        "effectId": "B03_EFF_19",
        "activationWindow": "ON_DESTROY",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 400
            }
          }
        ],
        "description": "Nổ 400 LP khi bị tiêu diệt."
      }
    ]
  },
  {
    "id": "card_b03_020_po_20",
    "name": "Poloni — Thợ Săn Oxi Hóa (PoO2 Dạng 20)",
    "name_en": "Polonium — Thợ Săn Oxi Hóa Specimen 20",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "ACID_DARK",
    "manaCost": 2,
    "level": 3,
    "atk": 1800,
    "def": 1330,
    "chemicalFormula": "PoO2",
    "atomicNumber": 84,
    "effectCode": "ELEM_B03_PO_PURGE_20",
    "effectText": "Khi bị tiêu diệt: Gây 600 LP sát thương nhiệt lên người chơi tiêu diệt nó.",
    "scientificLore": "Poloni (Po, Z=84) có độ âm điện lớn, tính oxi hóa mãnh liệt tạo thành dạng thù hình PoO2.",
    "relatedEquation": "Po + O₂ → PoO₂",
    "iupacName": "Polonium Allotrope",
    "archetype": "CHALCOGEN_EMBER",
    "structuredEffects": [
      {
        "effectId": "B03_EFF_20",
        "activationWindow": "ON_DESTROY",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 400
            }
          }
        ],
        "description": "Nổ 400 LP khi bị tiêu diệt."
      }
    ]
  },
  {
    "id": "card_b03_021_f_21",
    "name": "Flo — Kẻ Huỷ Diệt (F2 Dạng 21)",
    "name_en": "Fluorine — Kẻ Huỷ Diệt Specimen 21",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "AERO",
    "manaCost": 3,
    "level": 4,
    "atk": 1780,
    "def": 1340,
    "chemicalFormula": "F2",
    "atomicNumber": 9,
    "effectCode": "ELEM_B03_F_PURGE_21",
    "effectText": "Khi tấn công: Bào mòn 400 ATK của quái thú mục tiêu trước khi tính toán sát thương.",
    "scientificLore": "Flo (F, Z=9) có độ âm điện lớn, tính oxi hóa mãnh liệt tạo thành dạng thù hình F2.",
    "relatedEquation": "2F₂ + 2H₂O → 4HF + O₂",
    "iupacName": "Fluorine Allotrope",
    "archetype": "HALOGEN_PURGE",
    "structuredEffects": [
      {
        "effectId": "B03_EFF_21",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Bào mòn 300 ATK quái thú đối phương."
      }
    ]
  },
  {
    "id": "card_b03_022_cl_22",
    "name": "Clo — Kẻ Huỷ Diệt (Cl2 Dạng 22)",
    "name_en": "Chlorine — Kẻ Huỷ Diệt Specimen 22",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "ULTRA_RARE",
    "attribute": "AERO",
    "manaCost": 4,
    "level": 5,
    "atk": 2060,
    "def": 1550,
    "chemicalFormula": "Cl2",
    "atomicNumber": 17,
    "effectCode": "ELEM_B03_CL_PURGE_22",
    "effectText": "Khi tấn công: Bào mòn 200 ATK của quái thú mục tiêu trước khi tính toán sát thương.",
    "scientificLore": "Clo (Cl, Z=17) có độ âm điện lớn, tính oxi hóa mãnh liệt tạo thành dạng thù hình Cl2.",
    "relatedEquation": "Cl₂ + H₂O ⇌ HCl + HClO",
    "iupacName": "Chlorine Allotrope",
    "archetype": "HALOGEN_PURGE",
    "structuredEffects": [
      {
        "effectId": "B03_EFF_22",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Bào mòn 300 ATK quái thú đối phương."
      }
    ]
  },
  {
    "id": "card_b03_023_br_23",
    "name": "Brom — Kẻ Huỷ Diệt (Br2 Dạng 23)",
    "name_en": "Bromine — Kẻ Huỷ Diệt Specimen 23",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SECRET_RARE",
    "attribute": "AQUA",
    "manaCost": 5,
    "level": 6,
    "atk": 2340,
    "def": 1760,
    "chemicalFormula": "Br2",
    "atomicNumber": 35,
    "effectCode": "ELEM_B03_BR_PURGE_23",
    "effectText": "Khi tấn công: Bào mòn 300 ATK của quái thú mục tiêu trước khi tính toán sát thương.",
    "scientificLore": "Brom (Br, Z=35) có độ âm điện lớn, tính oxi hóa mãnh liệt tạo thành dạng thù hình Br2.",
    "relatedEquation": "Br₂ + 2KI → 2KBr + I₂",
    "iupacName": "Bromine Allotrope",
    "archetype": "HALOGEN_PURGE",
    "structuredEffects": [
      {
        "effectId": "B03_EFF_23",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Bào mòn 300 ATK quái thú đối phương."
      }
    ]
  },
  {
    "id": "card_b03_024_i_24",
    "name": "Iot — Kẻ Huỷ Diệt (I2 Dạng 24)",
    "name_en": "Iodine — Kẻ Huỷ Diệt Specimen 24",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "TERRA",
    "manaCost": 5,
    "level": 7,
    "atk": 2620,
    "def": 1970,
    "chemicalFormula": "I2",
    "atomicNumber": 53,
    "effectCode": "ELEM_B03_I_PURGE_24",
    "effectText": "Khi tấn công: Bào mòn 400 ATK của quái thú mục tiêu trước khi tính toán sát thương.",
    "scientificLore": "Iot (I, Z=53) có độ âm điện lớn, tính oxi hóa mãnh liệt tạo thành dạng thù hình I2.",
    "relatedEquation": "I₂ + starch → Dark Blue Complex",
    "iupacName": "Iodine Allotrope",
    "archetype": "HALOGEN_PURGE",
    "structuredEffects": [
      {
        "effectId": "B03_EFF_24",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Bào mòn 300 ATK quái thú đối phương."
      }
    ]
  },
  {
    "id": "card_b03_025_at_25",
    "name": "Astatin — Kẻ Huỷ Diệt (At2 Dạng 25)",
    "name_en": "Astatine — Kẻ Huỷ Diệt Specimen 25",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "ACID_DARK",
    "manaCost": 1,
    "level": 2,
    "atk": 1580,
    "def": 1020,
    "chemicalFormula": "At2",
    "atomicNumber": 85,
    "effectCode": "ELEM_B03_AT_PURGE_25",
    "effectText": "Khi tấn công: Bào mòn 200 ATK của quái thú mục tiêu trước khi tính toán sát thương.",
    "scientificLore": "Astatin (At, Z=85) có độ âm điện lớn, tính oxi hóa mãnh liệt tạo thành dạng thù hình At2.",
    "relatedEquation": "2At⁻ - 2e⁻ → At₂",
    "iupacName": "Astatine Allotrope",
    "archetype": "HALOGEN_PURGE",
    "structuredEffects": [
      {
        "effectId": "B03_EFF_25",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Bào mòn 300 ATK quái thú đối phương."
      }
    ]
  },
  {
    "id": "card_b03_026_o_26",
    "name": "Oxy — Kẻ Huỷ Diệt (O3 Dạng 26)",
    "name_en": "Oxygen — Kẻ Huỷ Diệt Specimen 26",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "AERO",
    "manaCost": 2,
    "level": 3,
    "atk": 1560,
    "def": 1230,
    "chemicalFormula": "O3",
    "atomicNumber": 8,
    "effectCode": "ELEM_B03_O_PURGE_26",
    "effectText": "Khi bị tiêu diệt: Gây 400 LP sát thương nhiệt lên người chơi tiêu diệt nó.",
    "scientificLore": "Oxy (O, Z=8) có độ âm điện lớn, tính oxi hóa mãnh liệt tạo thành dạng thù hình O3.",
    "relatedEquation": "3O₂ → 2O₃",
    "iupacName": "Oxygen Allotrope",
    "archetype": "CHALCOGEN_EMBER",
    "structuredEffects": [
      {
        "effectId": "B03_EFF_26",
        "activationWindow": "ON_DESTROY",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 400
            }
          }
        ],
        "description": "Nổ 400 LP khi bị tiêu diệt."
      }
    ]
  },
  {
    "id": "card_b03_027_s_27",
    "name": "Lưu Huỳnh — Kẻ Huỷ Diệt (S8 Dạng 27)",
    "name_en": "Sulfur — Kẻ Huỷ Diệt Specimen 27",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "PYRO",
    "manaCost": 3,
    "level": 4,
    "atk": 1840,
    "def": 1440,
    "chemicalFormula": "S8",
    "atomicNumber": 16,
    "effectCode": "ELEM_B03_S_PURGE_27",
    "effectText": "Khi bị tiêu diệt: Gây 500 LP sát thương nhiệt lên người chơi tiêu diệt nó.",
    "scientificLore": "Lưu Huỳnh (S, Z=16) có độ âm điện lớn, tính oxi hóa mãnh liệt tạo thành dạng thù hình S8.",
    "relatedEquation": "S + O₂ → SO₂",
    "iupacName": "Sulfur Allotrope",
    "archetype": "CHALCOGEN_EMBER",
    "structuredEffects": [
      {
        "effectId": "B03_EFF_27",
        "activationWindow": "ON_DESTROY",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 400
            }
          }
        ],
        "description": "Nổ 400 LP khi bị tiêu diệt."
      }
    ]
  },
  {
    "id": "card_b03_028_se_28",
    "name": "Selen — Kẻ Huỷ Diệt (SeO2 Dạng 28)",
    "name_en": "Selenium — Kẻ Huỷ Diệt Specimen 28",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "ELECTRO",
    "manaCost": 4,
    "level": 5,
    "atk": 2120,
    "def": 1650,
    "chemicalFormula": "SeO2",
    "atomicNumber": 34,
    "effectCode": "ELEM_B03_SE_PURGE_28",
    "effectText": "Khi bị tiêu diệt: Gây 600 LP sát thương nhiệt lên người chơi tiêu diệt nó.",
    "scientificLore": "Selen (Se, Z=34) có độ âm điện lớn, tính oxi hóa mãnh liệt tạo thành dạng thù hình SeO2.",
    "relatedEquation": "Se + O₂ → SeO₂",
    "iupacName": "Selenium Allotrope",
    "archetype": "CHALCOGEN_EMBER",
    "structuredEffects": [
      {
        "effectId": "B03_EFF_28",
        "activationWindow": "ON_DESTROY",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 400
            }
          }
        ],
        "description": "Nổ 400 LP khi bị tiêu diệt."
      }
    ]
  },
  {
    "id": "card_b03_029_te_29",
    "name": "Telu — Kẻ Huỷ Diệt (TeO2 Dạng 29)",
    "name_en": "Tellurium — Kẻ Huỷ Diệt Specimen 29",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "TERRA",
    "manaCost": 5,
    "level": 6,
    "atk": 2400,
    "def": 1660,
    "chemicalFormula": "TeO2",
    "atomicNumber": 52,
    "effectCode": "ELEM_B03_TE_PURGE_29",
    "effectText": "Khi bị tiêu diệt: Gây 300 LP sát thương nhiệt lên người chơi tiêu diệt nó.",
    "scientificLore": "Telu (Te, Z=52) có độ âm điện lớn, tính oxi hóa mãnh liệt tạo thành dạng thù hình TeO2.",
    "relatedEquation": "Te + O₂ → TeO₂",
    "iupacName": "Tellurium Allotrope",
    "archetype": "CHALCOGEN_EMBER",
    "structuredEffects": [
      {
        "effectId": "B03_EFF_29",
        "activationWindow": "ON_DESTROY",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 400
            }
          }
        ],
        "description": "Nổ 400 LP khi bị tiêu diệt."
      }
    ]
  },
  {
    "id": "card_b03_030_po_30",
    "name": "Poloni — Kẻ Huỷ Diệt (PoO2 Dạng 30)",
    "name_en": "Polonium — Kẻ Huỷ Diệt Specimen 30",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "ACID_DARK",
    "manaCost": 5,
    "level": 7,
    "atk": 2680,
    "def": 1870,
    "chemicalFormula": "PoO2",
    "atomicNumber": 84,
    "effectCode": "ELEM_B03_PO_PURGE_30",
    "effectText": "Khi bị tiêu diệt: Gây 400 LP sát thương nhiệt lên người chơi tiêu diệt nó.",
    "scientificLore": "Poloni (Po, Z=84) có độ âm điện lớn, tính oxi hóa mãnh liệt tạo thành dạng thù hình PoO2.",
    "relatedEquation": "Po + O₂ → PoO₂",
    "iupacName": "Polonium Allotrope",
    "archetype": "CHALCOGEN_EMBER",
    "structuredEffects": [
      {
        "effectId": "B03_EFF_30",
        "activationWindow": "ON_DESTROY",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 400
            }
          }
        ],
        "description": "Nổ 400 LP khi bị tiêu diệt."
      }
    ]
  },
  {
    "id": "card_b03_031_f_31",
    "name": "Flo — Hỏa Ngục (F2 Dạng 31)",
    "name_en": "Fluorine — Hỏa Ngục Specimen 31",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "ULTRA_RARE",
    "attribute": "AERO",
    "manaCost": 1,
    "level": 2,
    "atk": 1340,
    "def": 1120,
    "chemicalFormula": "F2",
    "atomicNumber": 9,
    "effectCode": "ELEM_B03_F_PURGE_31",
    "effectText": "Khi tấn công: Bào mòn 200 ATK của quái thú mục tiêu trước khi tính toán sát thương.",
    "scientificLore": "Flo (F, Z=9) có độ âm điện lớn, tính oxi hóa mãnh liệt tạo thành dạng thù hình F2.",
    "relatedEquation": "2F₂ + 2H₂O → 4HF + O₂",
    "iupacName": "Fluorine Allotrope",
    "archetype": "HALOGEN_PURGE",
    "structuredEffects": [
      {
        "effectId": "B03_EFF_31",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Bào mòn 300 ATK quái thú đối phương."
      }
    ]
  },
  {
    "id": "card_b03_032_cl_32",
    "name": "Clo — Hỏa Ngục (Cl2 Dạng 32)",
    "name_en": "Chlorine — Hỏa Ngục Specimen 32",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SECRET_RARE",
    "attribute": "AERO",
    "manaCost": 2,
    "level": 3,
    "atk": 1620,
    "def": 1330,
    "chemicalFormula": "Cl2",
    "atomicNumber": 17,
    "effectCode": "ELEM_B03_CL_PURGE_32",
    "effectText": "Khi tấn công: Bào mòn 300 ATK của quái thú mục tiêu trước khi tính toán sát thương.",
    "scientificLore": "Clo (Cl, Z=17) có độ âm điện lớn, tính oxi hóa mãnh liệt tạo thành dạng thù hình Cl2.",
    "relatedEquation": "Cl₂ + H₂O ⇌ HCl + HClO",
    "iupacName": "Chlorine Allotrope",
    "archetype": "HALOGEN_PURGE",
    "structuredEffects": [
      {
        "effectId": "B03_EFF_32",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Bào mòn 300 ATK quái thú đối phương."
      }
    ]
  },
  {
    "id": "card_b03_033_br_33",
    "name": "Brom — Hỏa Ngục (Br2 Dạng 33)",
    "name_en": "Bromine — Hỏa Ngục Specimen 33",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "AQUA",
    "manaCost": 3,
    "level": 4,
    "atk": 1900,
    "def": 1340,
    "chemicalFormula": "Br2",
    "atomicNumber": 35,
    "effectCode": "ELEM_B03_BR_PURGE_33",
    "effectText": "Khi tấn công: Bào mòn 400 ATK của quái thú mục tiêu trước khi tính toán sát thương.",
    "scientificLore": "Brom (Br, Z=35) có độ âm điện lớn, tính oxi hóa mãnh liệt tạo thành dạng thù hình Br2.",
    "relatedEquation": "Br₂ + 2KI → 2KBr + I₂",
    "iupacName": "Bromine Allotrope",
    "archetype": "HALOGEN_PURGE",
    "structuredEffects": [
      {
        "effectId": "B03_EFF_33",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Bào mòn 300 ATK quái thú đối phương."
      }
    ]
  },
  {
    "id": "card_b03_034_i_34",
    "name": "Iot — Hỏa Ngục (I2 Dạng 34)",
    "name_en": "Iodine — Hỏa Ngục Specimen 34",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "TERRA",
    "manaCost": 4,
    "level": 5,
    "atk": 2180,
    "def": 1550,
    "chemicalFormula": "I2",
    "atomicNumber": 53,
    "effectCode": "ELEM_B03_I_PURGE_34",
    "effectText": "Khi tấn công: Bào mòn 200 ATK của quái thú mục tiêu trước khi tính toán sát thương.",
    "scientificLore": "Iot (I, Z=53) có độ âm điện lớn, tính oxi hóa mãnh liệt tạo thành dạng thù hình I2.",
    "relatedEquation": "I₂ + starch → Dark Blue Complex",
    "iupacName": "Iodine Allotrope",
    "archetype": "HALOGEN_PURGE",
    "structuredEffects": [
      {
        "effectId": "B03_EFF_34",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Bào mòn 300 ATK quái thú đối phương."
      }
    ]
  },
  {
    "id": "card_b03_035_at_35",
    "name": "Astatin — Hỏa Ngục (At2 Dạng 35)",
    "name_en": "Astatine — Hỏa Ngục Specimen 35",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "ACID_DARK",
    "manaCost": 5,
    "level": 6,
    "atk": 2460,
    "def": 1760,
    "chemicalFormula": "At2",
    "atomicNumber": 85,
    "effectCode": "ELEM_B03_AT_PURGE_35",
    "effectText": "Khi tấn công: Bào mòn 300 ATK của quái thú mục tiêu trước khi tính toán sát thương.",
    "scientificLore": "Astatin (At, Z=85) có độ âm điện lớn, tính oxi hóa mãnh liệt tạo thành dạng thù hình At2.",
    "relatedEquation": "2At⁻ - 2e⁻ → At₂",
    "iupacName": "Astatine Allotrope",
    "archetype": "HALOGEN_PURGE",
    "structuredEffects": [
      {
        "effectId": "B03_EFF_35",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Bào mòn 300 ATK quái thú đối phương."
      }
    ]
  },
  {
    "id": "card_b03_036_o_36",
    "name": "Oxy — Hỏa Ngục (O3 Dạng 36)",
    "name_en": "Oxygen — Hỏa Ngục Specimen 36",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "AERO",
    "manaCost": 5,
    "level": 7,
    "atk": 2440,
    "def": 1970,
    "chemicalFormula": "O3",
    "atomicNumber": 8,
    "effectCode": "ELEM_B03_O_PURGE_36",
    "effectText": "Khi bị tiêu diệt: Gây 600 LP sát thương nhiệt lên người chơi tiêu diệt nó.",
    "scientificLore": "Oxy (O, Z=8) có độ âm điện lớn, tính oxi hóa mãnh liệt tạo thành dạng thù hình O3.",
    "relatedEquation": "3O₂ → 2O₃",
    "iupacName": "Oxygen Allotrope",
    "archetype": "CHALCOGEN_EMBER",
    "structuredEffects": [
      {
        "effectId": "B03_EFF_36",
        "activationWindow": "ON_DESTROY",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 400
            }
          }
        ],
        "description": "Nổ 400 LP khi bị tiêu diệt."
      }
    ]
  },
  {
    "id": "card_b03_037_s_37",
    "name": "Lưu Huỳnh — Hỏa Ngục (S8 Dạng 37)",
    "name_en": "Sulfur — Hỏa Ngục Specimen 37",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "PYRO",
    "manaCost": 1,
    "level": 2,
    "atk": 1400,
    "def": 1020,
    "chemicalFormula": "S8",
    "atomicNumber": 16,
    "effectCode": "ELEM_B03_S_PURGE_37",
    "effectText": "Khi bị tiêu diệt: Gây 300 LP sát thương nhiệt lên người chơi tiêu diệt nó.",
    "scientificLore": "Lưu Huỳnh (S, Z=16) có độ âm điện lớn, tính oxi hóa mãnh liệt tạo thành dạng thù hình S8.",
    "relatedEquation": "S + O₂ → SO₂",
    "iupacName": "Sulfur Allotrope",
    "archetype": "CHALCOGEN_EMBER",
    "structuredEffects": [
      {
        "effectId": "B03_EFF_37",
        "activationWindow": "ON_DESTROY",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 400
            }
          }
        ],
        "description": "Nổ 400 LP khi bị tiêu diệt."
      }
    ]
  },
  {
    "id": "card_b03_038_se_38",
    "name": "Selen — Hỏa Ngục (SeO2 Dạng 38)",
    "name_en": "Selenium — Hỏa Ngục Specimen 38",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "ELECTRO",
    "manaCost": 2,
    "level": 3,
    "atk": 1680,
    "def": 1230,
    "chemicalFormula": "SeO2",
    "atomicNumber": 34,
    "effectCode": "ELEM_B03_SE_PURGE_38",
    "effectText": "Khi bị tiêu diệt: Gây 400 LP sát thương nhiệt lên người chơi tiêu diệt nó.",
    "scientificLore": "Selen (Se, Z=34) có độ âm điện lớn, tính oxi hóa mãnh liệt tạo thành dạng thù hình SeO2.",
    "relatedEquation": "Se + O₂ → SeO₂",
    "iupacName": "Selenium Allotrope",
    "archetype": "CHALCOGEN_EMBER",
    "structuredEffects": [
      {
        "effectId": "B03_EFF_38",
        "activationWindow": "ON_DESTROY",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 400
            }
          }
        ],
        "description": "Nổ 400 LP khi bị tiêu diệt."
      }
    ]
  },
  {
    "id": "card_b03_039_te_39",
    "name": "Telu — Hỏa Ngục (TeO2 Dạng 39)",
    "name_en": "Tellurium — Hỏa Ngục Specimen 39",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "TERRA",
    "manaCost": 3,
    "level": 4,
    "atk": 1960,
    "def": 1440,
    "chemicalFormula": "TeO2",
    "atomicNumber": 52,
    "effectCode": "ELEM_B03_TE_PURGE_39",
    "effectText": "Khi bị tiêu diệt: Gây 500 LP sát thương nhiệt lên người chơi tiêu diệt nó.",
    "scientificLore": "Telu (Te, Z=52) có độ âm điện lớn, tính oxi hóa mãnh liệt tạo thành dạng thù hình TeO2.",
    "relatedEquation": "Te + O₂ → TeO₂",
    "iupacName": "Tellurium Allotrope",
    "archetype": "CHALCOGEN_EMBER",
    "structuredEffects": [
      {
        "effectId": "B03_EFF_39",
        "activationWindow": "ON_DESTROY",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 400
            }
          }
        ],
        "description": "Nổ 400 LP khi bị tiêu diệt."
      }
    ]
  },
  {
    "id": "card_b03_040_po_40",
    "name": "Poloni — Hỏa Ngục (PoO2 Dạng 40)",
    "name_en": "Polonium — Hỏa Ngục Specimen 40",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "ULTRA_RARE",
    "attribute": "ACID_DARK",
    "manaCost": 4,
    "level": 5,
    "atk": 2240,
    "def": 1650,
    "chemicalFormula": "PoO2",
    "atomicNumber": 84,
    "effectCode": "ELEM_B03_PO_PURGE_40",
    "effectText": "Khi bị tiêu diệt: Gây 600 LP sát thương nhiệt lên người chơi tiêu diệt nó.",
    "scientificLore": "Poloni (Po, Z=84) có độ âm điện lớn, tính oxi hóa mãnh liệt tạo thành dạng thù hình PoO2.",
    "relatedEquation": "Po + O₂ → PoO₂",
    "iupacName": "Polonium Allotrope",
    "archetype": "CHALCOGEN_EMBER",
    "structuredEffects": [
      {
        "effectId": "B03_EFF_40",
        "activationWindow": "ON_DESTROY",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 400
            }
          }
        ],
        "description": "Nổ 400 LP khi bị tiêu diệt."
      }
    ]
  },
  {
    "id": "card_b03_041_f_41",
    "name": "Flo — Bão Độc (F2 Dạng 41)",
    "name_en": "Fluorine — Bão Độc Specimen 41",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SECRET_RARE",
    "attribute": "AERO",
    "manaCost": 5,
    "level": 6,
    "atk": 2220,
    "def": 1660,
    "chemicalFormula": "F2",
    "atomicNumber": 9,
    "effectCode": "ELEM_B03_F_PURGE_41",
    "effectText": "Khi tấn công: Bào mòn 300 ATK của quái thú mục tiêu trước khi tính toán sát thương.",
    "scientificLore": "Flo (F, Z=9) có độ âm điện lớn, tính oxi hóa mãnh liệt tạo thành dạng thù hình F2.",
    "relatedEquation": "2F₂ + 2H₂O → 4HF + O₂",
    "iupacName": "Fluorine Allotrope",
    "archetype": "HALOGEN_PURGE",
    "structuredEffects": [
      {
        "effectId": "B03_EFF_41",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Bào mòn 300 ATK quái thú đối phương."
      }
    ]
  },
  {
    "id": "card_b03_042_cl_42",
    "name": "Clo — Bão Độc (Cl2 Dạng 42)",
    "name_en": "Chlorine — Bão Độc Specimen 42",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "AERO",
    "manaCost": 5,
    "level": 7,
    "atk": 2500,
    "def": 1870,
    "chemicalFormula": "Cl2",
    "atomicNumber": 17,
    "effectCode": "ELEM_B03_CL_PURGE_42",
    "effectText": "Khi tấn công: Bào mòn 400 ATK của quái thú mục tiêu trước khi tính toán sát thương.",
    "scientificLore": "Clo (Cl, Z=17) có độ âm điện lớn, tính oxi hóa mãnh liệt tạo thành dạng thù hình Cl2.",
    "relatedEquation": "Cl₂ + H₂O ⇌ HCl + HClO",
    "iupacName": "Chlorine Allotrope",
    "archetype": "HALOGEN_PURGE",
    "structuredEffects": [
      {
        "effectId": "B03_EFF_42",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Bào mòn 300 ATK quái thú đối phương."
      }
    ]
  },
  {
    "id": "card_b03_043_br_43",
    "name": "Brom — Bão Độc (Br2 Dạng 43)",
    "name_en": "Bromine — Bão Độc Specimen 43",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "AQUA",
    "manaCost": 1,
    "level": 2,
    "atk": 1460,
    "def": 1120,
    "chemicalFormula": "Br2",
    "atomicNumber": 35,
    "effectCode": "ELEM_B03_BR_PURGE_43",
    "effectText": "Khi tấn công: Bào mòn 200 ATK của quái thú mục tiêu trước khi tính toán sát thương.",
    "scientificLore": "Brom (Br, Z=35) có độ âm điện lớn, tính oxi hóa mãnh liệt tạo thành dạng thù hình Br2.",
    "relatedEquation": "Br₂ + 2KI → 2KBr + I₂",
    "iupacName": "Bromine Allotrope",
    "archetype": "HALOGEN_PURGE",
    "structuredEffects": [
      {
        "effectId": "B03_EFF_43",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Bào mòn 300 ATK quái thú đối phương."
      }
    ]
  },
  {
    "id": "card_b03_044_i_44",
    "name": "Iot — Bão Độc (I2 Dạng 44)",
    "name_en": "Iodine — Bão Độc Specimen 44",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "TERRA",
    "manaCost": 2,
    "level": 3,
    "atk": 1740,
    "def": 1330,
    "chemicalFormula": "I2",
    "atomicNumber": 53,
    "effectCode": "ELEM_B03_I_PURGE_44",
    "effectText": "Khi tấn công: Bào mòn 300 ATK của quái thú mục tiêu trước khi tính toán sát thương.",
    "scientificLore": "Iot (I, Z=53) có độ âm điện lớn, tính oxi hóa mãnh liệt tạo thành dạng thù hình I2.",
    "relatedEquation": "I₂ + starch → Dark Blue Complex",
    "iupacName": "Iodine Allotrope",
    "archetype": "HALOGEN_PURGE",
    "structuredEffects": [
      {
        "effectId": "B03_EFF_44",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Bào mòn 300 ATK quái thú đối phương."
      }
    ]
  },
  {
    "id": "card_b03_045_at_45",
    "name": "Astatin — Bão Độc (At2 Dạng 45)",
    "name_en": "Astatine — Bão Độc Specimen 45",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "ACID_DARK",
    "manaCost": 3,
    "level": 4,
    "atk": 2020,
    "def": 1340,
    "chemicalFormula": "At2",
    "atomicNumber": 85,
    "effectCode": "ELEM_B03_AT_PURGE_45",
    "effectText": "Khi tấn công: Bào mòn 400 ATK của quái thú mục tiêu trước khi tính toán sát thương.",
    "scientificLore": "Astatin (At, Z=85) có độ âm điện lớn, tính oxi hóa mãnh liệt tạo thành dạng thù hình At2.",
    "relatedEquation": "2At⁻ - 2e⁻ → At₂",
    "iupacName": "Astatine Allotrope",
    "archetype": "HALOGEN_PURGE",
    "structuredEffects": [
      {
        "effectId": "B03_EFF_45",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Bào mòn 300 ATK quái thú đối phương."
      }
    ]
  },
  {
    "id": "card_b03_046_o_46",
    "name": "Oxy — Bão Độc (O3 Dạng 46)",
    "name_en": "Oxygen — Bão Độc Specimen 46",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "AERO",
    "manaCost": 4,
    "level": 5,
    "atk": 2000,
    "def": 1550,
    "chemicalFormula": "O3",
    "atomicNumber": 8,
    "effectCode": "ELEM_B03_O_PURGE_46",
    "effectText": "Khi bị tiêu diệt: Gây 400 LP sát thương nhiệt lên người chơi tiêu diệt nó.",
    "scientificLore": "Oxy (O, Z=8) có độ âm điện lớn, tính oxi hóa mãnh liệt tạo thành dạng thù hình O3.",
    "relatedEquation": "3O₂ → 2O₃",
    "iupacName": "Oxygen Allotrope",
    "archetype": "CHALCOGEN_EMBER",
    "structuredEffects": [
      {
        "effectId": "B03_EFF_46",
        "activationWindow": "ON_DESTROY",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 400
            }
          }
        ],
        "description": "Nổ 400 LP khi bị tiêu diệt."
      }
    ]
  },
  {
    "id": "card_b03_047_s_47",
    "name": "Lưu Huỳnh — Bão Độc (S8 Dạng 47)",
    "name_en": "Sulfur — Bão Độc Specimen 47",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "PYRO",
    "manaCost": 5,
    "level": 6,
    "atk": 2280,
    "def": 1760,
    "chemicalFormula": "S8",
    "atomicNumber": 16,
    "effectCode": "ELEM_B03_S_PURGE_47",
    "effectText": "Khi bị tiêu diệt: Gây 500 LP sát thương nhiệt lên người chơi tiêu diệt nó.",
    "scientificLore": "Lưu Huỳnh (S, Z=16) có độ âm điện lớn, tính oxi hóa mãnh liệt tạo thành dạng thù hình S8.",
    "relatedEquation": "S + O₂ → SO₂",
    "iupacName": "Sulfur Allotrope",
    "archetype": "CHALCOGEN_EMBER",
    "structuredEffects": [
      {
        "effectId": "B03_EFF_47",
        "activationWindow": "ON_DESTROY",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 400
            }
          }
        ],
        "description": "Nổ 400 LP khi bị tiêu diệt."
      }
    ]
  },
  {
    "id": "card_b03_048_se_48",
    "name": "Selen — Bão Độc (SeO2 Dạng 48)",
    "name_en": "Selenium — Bão Độc Specimen 48",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "ELECTRO",
    "manaCost": 5,
    "level": 7,
    "atk": 2560,
    "def": 1970,
    "chemicalFormula": "SeO2",
    "atomicNumber": 34,
    "effectCode": "ELEM_B03_SE_PURGE_48",
    "effectText": "Khi bị tiêu diệt: Gây 600 LP sát thương nhiệt lên người chơi tiêu diệt nó.",
    "scientificLore": "Selen (Se, Z=34) có độ âm điện lớn, tính oxi hóa mãnh liệt tạo thành dạng thù hình SeO2.",
    "relatedEquation": "Se + O₂ → SeO₂",
    "iupacName": "Selenium Allotrope",
    "archetype": "CHALCOGEN_EMBER",
    "structuredEffects": [
      {
        "effectId": "B03_EFF_48",
        "activationWindow": "ON_DESTROY",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 400
            }
          }
        ],
        "description": "Nổ 400 LP khi bị tiêu diệt."
      }
    ]
  },
  {
    "id": "card_b03_049_te_49",
    "name": "Telu — Bão Độc (TeO2 Dạng 49)",
    "name_en": "Tellurium — Bão Độc Specimen 49",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "ULTRA_RARE",
    "attribute": "TERRA",
    "manaCost": 1,
    "level": 2,
    "atk": 1520,
    "def": 1020,
    "chemicalFormula": "TeO2",
    "atomicNumber": 52,
    "effectCode": "ELEM_B03_TE_PURGE_49",
    "effectText": "Khi bị tiêu diệt: Gây 300 LP sát thương nhiệt lên người chơi tiêu diệt nó.",
    "scientificLore": "Telu (Te, Z=52) có độ âm điện lớn, tính oxi hóa mãnh liệt tạo thành dạng thù hình TeO2.",
    "relatedEquation": "Te + O₂ → TeO₂",
    "iupacName": "Tellurium Allotrope",
    "archetype": "CHALCOGEN_EMBER",
    "structuredEffects": [
      {
        "effectId": "B03_EFF_49",
        "activationWindow": "ON_DESTROY",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 400
            }
          }
        ],
        "description": "Nổ 400 LP khi bị tiêu diệt."
      }
    ]
  },
  {
    "id": "card_b03_050_po_50",
    "name": "Poloni — Bão Độc (PoO2 Dạng 50)",
    "name_en": "Polonium — Bão Độc Specimen 50",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SECRET_RARE",
    "attribute": "ACID_DARK",
    "manaCost": 2,
    "level": 3,
    "atk": 1800,
    "def": 1230,
    "chemicalFormula": "PoO2",
    "atomicNumber": 84,
    "effectCode": "ELEM_B03_PO_PURGE_50",
    "effectText": "Khi bị tiêu diệt: Gây 400 LP sát thương nhiệt lên người chơi tiêu diệt nó.",
    "scientificLore": "Poloni (Po, Z=84) có độ âm điện lớn, tính oxi hóa mãnh liệt tạo thành dạng thù hình PoO2.",
    "relatedEquation": "Po + O₂ → PoO₂",
    "iupacName": "Polonium Allotrope",
    "archetype": "CHALCOGEN_EMBER",
    "structuredEffects": [
      {
        "effectId": "B03_EFF_50",
        "activationWindow": "ON_DESTROY",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 400
            }
          }
        ],
        "description": "Nổ 400 LP khi bị tiêu diệt."
      }
    ]
  },
  {
    "id": "card_b03_051_f_51",
    "name": "Flo — Tia Chớp (F2 Dạng 51)",
    "name_en": "Fluorine — Tia Chớp Specimen 51",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "AERO",
    "manaCost": 3,
    "level": 4,
    "atk": 1780,
    "def": 1440,
    "chemicalFormula": "F2",
    "atomicNumber": 9,
    "effectCode": "ELEM_B03_F_PURGE_51",
    "effectText": "Khi tấn công: Bào mòn 400 ATK của quái thú mục tiêu trước khi tính toán sát thương.",
    "scientificLore": "Flo (F, Z=9) có độ âm điện lớn, tính oxi hóa mãnh liệt tạo thành dạng thù hình F2.",
    "relatedEquation": "2F₂ + 2H₂O → 4HF + O₂",
    "iupacName": "Fluorine Allotrope",
    "archetype": "HALOGEN_PURGE",
    "structuredEffects": [
      {
        "effectId": "B03_EFF_51",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Bào mòn 300 ATK quái thú đối phương."
      }
    ]
  },
  {
    "id": "card_b03_052_cl_52",
    "name": "Clo — Tia Chớp (Cl2 Dạng 52)",
    "name_en": "Chlorine — Tia Chớp Specimen 52",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "AERO",
    "manaCost": 4,
    "level": 5,
    "atk": 2060,
    "def": 1650,
    "chemicalFormula": "Cl2",
    "atomicNumber": 17,
    "effectCode": "ELEM_B03_CL_PURGE_52",
    "effectText": "Khi tấn công: Bào mòn 200 ATK của quái thú mục tiêu trước khi tính toán sát thương.",
    "scientificLore": "Clo (Cl, Z=17) có độ âm điện lớn, tính oxi hóa mãnh liệt tạo thành dạng thù hình Cl2.",
    "relatedEquation": "Cl₂ + H₂O ⇌ HCl + HClO",
    "iupacName": "Chlorine Allotrope",
    "archetype": "HALOGEN_PURGE",
    "structuredEffects": [
      {
        "effectId": "B03_EFF_52",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Bào mòn 300 ATK quái thú đối phương."
      }
    ]
  },
  {
    "id": "card_b03_053_br_53",
    "name": "Brom — Tia Chớp (Br2 Dạng 53)",
    "name_en": "Bromine — Tia Chớp Specimen 53",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "AQUA",
    "manaCost": 5,
    "level": 6,
    "atk": 2340,
    "def": 1660,
    "chemicalFormula": "Br2",
    "atomicNumber": 35,
    "effectCode": "ELEM_B03_BR_PURGE_53",
    "effectText": "Khi tấn công: Bào mòn 300 ATK của quái thú mục tiêu trước khi tính toán sát thương.",
    "scientificLore": "Brom (Br, Z=35) có độ âm điện lớn, tính oxi hóa mãnh liệt tạo thành dạng thù hình Br2.",
    "relatedEquation": "Br₂ + 2KI → 2KBr + I₂",
    "iupacName": "Bromine Allotrope",
    "archetype": "HALOGEN_PURGE",
    "structuredEffects": [
      {
        "effectId": "B03_EFF_53",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Bào mòn 300 ATK quái thú đối phương."
      }
    ]
  },
  {
    "id": "card_b03_054_i_54",
    "name": "Iot — Tia Chớp (I2 Dạng 54)",
    "name_en": "Iodine — Tia Chớp Specimen 54",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "TERRA",
    "manaCost": 5,
    "level": 7,
    "atk": 2620,
    "def": 1870,
    "chemicalFormula": "I2",
    "atomicNumber": 53,
    "effectCode": "ELEM_B03_I_PURGE_54",
    "effectText": "Khi tấn công: Bào mòn 400 ATK của quái thú mục tiêu trước khi tính toán sát thương.",
    "scientificLore": "Iot (I, Z=53) có độ âm điện lớn, tính oxi hóa mãnh liệt tạo thành dạng thù hình I2.",
    "relatedEquation": "I₂ + starch → Dark Blue Complex",
    "iupacName": "Iodine Allotrope",
    "archetype": "HALOGEN_PURGE",
    "structuredEffects": [
      {
        "effectId": "B03_EFF_54",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Bào mòn 300 ATK quái thú đối phương."
      }
    ]
  },
  {
    "id": "card_b03_055_at_55",
    "name": "Astatin — Tia Chớp (At2 Dạng 55)",
    "name_en": "Astatine — Tia Chớp Specimen 55",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "ACID_DARK",
    "manaCost": 1,
    "level": 2,
    "atk": 1580,
    "def": 1120,
    "chemicalFormula": "At2",
    "atomicNumber": 85,
    "effectCode": "ELEM_B03_AT_PURGE_55",
    "effectText": "Khi tấn công: Bào mòn 200 ATK của quái thú mục tiêu trước khi tính toán sát thương.",
    "scientificLore": "Astatin (At, Z=85) có độ âm điện lớn, tính oxi hóa mãnh liệt tạo thành dạng thù hình At2.",
    "relatedEquation": "2At⁻ - 2e⁻ → At₂",
    "iupacName": "Astatine Allotrope",
    "archetype": "HALOGEN_PURGE",
    "structuredEffects": [
      {
        "effectId": "B03_EFF_55",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Bào mòn 300 ATK quái thú đối phương."
      }
    ]
  },
  {
    "id": "card_b03_056_o_56",
    "name": "Oxy — Tia Chớp (O3 Dạng 56)",
    "name_en": "Oxygen — Tia Chớp Specimen 56",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "AERO",
    "manaCost": 2,
    "level": 3,
    "atk": 1560,
    "def": 1330,
    "chemicalFormula": "O3",
    "atomicNumber": 8,
    "effectCode": "ELEM_B03_O_PURGE_56",
    "effectText": "Khi bị tiêu diệt: Gây 600 LP sát thương nhiệt lên người chơi tiêu diệt nó.",
    "scientificLore": "Oxy (O, Z=8) có độ âm điện lớn, tính oxi hóa mãnh liệt tạo thành dạng thù hình O3.",
    "relatedEquation": "3O₂ → 2O₃",
    "iupacName": "Oxygen Allotrope",
    "archetype": "CHALCOGEN_EMBER",
    "structuredEffects": [
      {
        "effectId": "B03_EFF_56",
        "activationWindow": "ON_DESTROY",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 400
            }
          }
        ],
        "description": "Nổ 400 LP khi bị tiêu diệt."
      }
    ]
  },
  {
    "id": "card_b03_057_s_57",
    "name": "Lưu Huỳnh — Tia Chớp (S8 Dạng 57)",
    "name_en": "Sulfur — Tia Chớp Specimen 57",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "PYRO",
    "manaCost": 3,
    "level": 4,
    "atk": 1840,
    "def": 1340,
    "chemicalFormula": "S8",
    "atomicNumber": 16,
    "effectCode": "ELEM_B03_S_PURGE_57",
    "effectText": "Khi bị tiêu diệt: Gây 300 LP sát thương nhiệt lên người chơi tiêu diệt nó.",
    "scientificLore": "Lưu Huỳnh (S, Z=16) có độ âm điện lớn, tính oxi hóa mãnh liệt tạo thành dạng thù hình S8.",
    "relatedEquation": "S + O₂ → SO₂",
    "iupacName": "Sulfur Allotrope",
    "archetype": "CHALCOGEN_EMBER",
    "structuredEffects": [
      {
        "effectId": "B03_EFF_57",
        "activationWindow": "ON_DESTROY",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 400
            }
          }
        ],
        "description": "Nổ 400 LP khi bị tiêu diệt."
      }
    ]
  },
  {
    "id": "card_b03_058_se_58",
    "name": "Selen — Tia Chớp (SeO2 Dạng 58)",
    "name_en": "Selenium — Tia Chớp Specimen 58",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "ULTRA_RARE",
    "attribute": "ELECTRO",
    "manaCost": 4,
    "level": 5,
    "atk": 2120,
    "def": 1550,
    "chemicalFormula": "SeO2",
    "atomicNumber": 34,
    "effectCode": "ELEM_B03_SE_PURGE_58",
    "effectText": "Khi bị tiêu diệt: Gây 400 LP sát thương nhiệt lên người chơi tiêu diệt nó.",
    "scientificLore": "Selen (Se, Z=34) có độ âm điện lớn, tính oxi hóa mãnh liệt tạo thành dạng thù hình SeO2.",
    "relatedEquation": "Se + O₂ → SeO₂",
    "iupacName": "Selenium Allotrope",
    "archetype": "CHALCOGEN_EMBER",
    "structuredEffects": [
      {
        "effectId": "B03_EFF_58",
        "activationWindow": "ON_DESTROY",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 400
            }
          }
        ],
        "description": "Nổ 400 LP khi bị tiêu diệt."
      }
    ]
  },
  {
    "id": "card_b03_059_te_59",
    "name": "Telu — Tia Chớp (TeO2 Dạng 59)",
    "name_en": "Tellurium — Tia Chớp Specimen 59",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SECRET_RARE",
    "attribute": "TERRA",
    "manaCost": 5,
    "level": 6,
    "atk": 2400,
    "def": 1760,
    "chemicalFormula": "TeO2",
    "atomicNumber": 52,
    "effectCode": "ELEM_B03_TE_PURGE_59",
    "effectText": "Khi bị tiêu diệt: Gây 500 LP sát thương nhiệt lên người chơi tiêu diệt nó.",
    "scientificLore": "Telu (Te, Z=52) có độ âm điện lớn, tính oxi hóa mãnh liệt tạo thành dạng thù hình TeO2.",
    "relatedEquation": "Te + O₂ → TeO₂",
    "iupacName": "Tellurium Allotrope",
    "archetype": "CHALCOGEN_EMBER",
    "structuredEffects": [
      {
        "effectId": "B03_EFF_59",
        "activationWindow": "ON_DESTROY",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 400
            }
          }
        ],
        "description": "Nổ 400 LP khi bị tiêu diệt."
      }
    ]
  },
  {
    "id": "card_b03_060_po_60",
    "name": "Poloni — Tia Chớp (PoO2 Dạng 60)",
    "name_en": "Polonium — Tia Chớp Specimen 60",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "ACID_DARK",
    "manaCost": 5,
    "level": 7,
    "atk": 2680,
    "def": 1970,
    "chemicalFormula": "PoO2",
    "atomicNumber": 84,
    "effectCode": "ELEM_B03_PO_PURGE_60",
    "effectText": "Khi bị tiêu diệt: Gây 600 LP sát thương nhiệt lên người chơi tiêu diệt nó.",
    "scientificLore": "Poloni (Po, Z=84) có độ âm điện lớn, tính oxi hóa mãnh liệt tạo thành dạng thù hình PoO2.",
    "relatedEquation": "Po + O₂ → PoO₂",
    "iupacName": "Polonium Allotrope",
    "archetype": "CHALCOGEN_EMBER",
    "structuredEffects": [
      {
        "effectId": "B03_EFF_60",
        "activationWindow": "ON_DESTROY",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 400
            }
          }
        ],
        "description": "Nổ 400 LP khi bị tiêu diệt."
      }
    ]
  },
  {
    "id": "card_b03_061_f_61",
    "name": "Flo — Kẻ Bào Mòn (F2 Dạng 61)",
    "name_en": "Fluorine — Kẻ Bào Mòn Specimen 61",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "AERO",
    "manaCost": 1,
    "level": 2,
    "atk": 1340,
    "def": 1020,
    "chemicalFormula": "F2",
    "atomicNumber": 9,
    "effectCode": "ELEM_B03_F_PURGE_61",
    "effectText": "Khi tấn công: Bào mòn 200 ATK của quái thú mục tiêu trước khi tính toán sát thương.",
    "scientificLore": "Flo (F, Z=9) có độ âm điện lớn, tính oxi hóa mãnh liệt tạo thành dạng thù hình F2.",
    "relatedEquation": "2F₂ + 2H₂O → 4HF + O₂",
    "iupacName": "Fluorine Allotrope",
    "archetype": "HALOGEN_PURGE",
    "structuredEffects": [
      {
        "effectId": "B03_EFF_61",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Bào mòn 300 ATK quái thú đối phương."
      }
    ]
  },
  {
    "id": "card_b03_062_cl_62",
    "name": "Clo — Kẻ Bào Mòn (Cl2 Dạng 62)",
    "name_en": "Chlorine — Kẻ Bào Mòn Specimen 62",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "AERO",
    "manaCost": 2,
    "level": 3,
    "atk": 1620,
    "def": 1230,
    "chemicalFormula": "Cl2",
    "atomicNumber": 17,
    "effectCode": "ELEM_B03_CL_PURGE_62",
    "effectText": "Khi tấn công: Bào mòn 300 ATK của quái thú mục tiêu trước khi tính toán sát thương.",
    "scientificLore": "Clo (Cl, Z=17) có độ âm điện lớn, tính oxi hóa mãnh liệt tạo thành dạng thù hình Cl2.",
    "relatedEquation": "Cl₂ + H₂O ⇌ HCl + HClO",
    "iupacName": "Chlorine Allotrope",
    "archetype": "HALOGEN_PURGE",
    "structuredEffects": [
      {
        "effectId": "B03_EFF_62",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Bào mòn 300 ATK quái thú đối phương."
      }
    ]
  },
  {
    "id": "card_b03_063_br_63",
    "name": "Brom — Kẻ Bào Mòn (Br2 Dạng 63)",
    "name_en": "Bromine — Kẻ Bào Mòn Specimen 63",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "AQUA",
    "manaCost": 3,
    "level": 4,
    "atk": 1900,
    "def": 1440,
    "chemicalFormula": "Br2",
    "atomicNumber": 35,
    "effectCode": "ELEM_B03_BR_PURGE_63",
    "effectText": "Khi tấn công: Bào mòn 400 ATK của quái thú mục tiêu trước khi tính toán sát thương.",
    "scientificLore": "Brom (Br, Z=35) có độ âm điện lớn, tính oxi hóa mãnh liệt tạo thành dạng thù hình Br2.",
    "relatedEquation": "Br₂ + 2KI → 2KBr + I₂",
    "iupacName": "Bromine Allotrope",
    "archetype": "HALOGEN_PURGE",
    "structuredEffects": [
      {
        "effectId": "B03_EFF_63",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Bào mòn 300 ATK quái thú đối phương."
      }
    ]
  },
  {
    "id": "card_b03_064_i_64",
    "name": "Iot — Kẻ Bào Mòn (I2 Dạng 64)",
    "name_en": "Iodine — Kẻ Bào Mòn Specimen 64",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "TERRA",
    "manaCost": 4,
    "level": 5,
    "atk": 2180,
    "def": 1650,
    "chemicalFormula": "I2",
    "atomicNumber": 53,
    "effectCode": "ELEM_B03_I_PURGE_64",
    "effectText": "Khi tấn công: Bào mòn 200 ATK của quái thú mục tiêu trước khi tính toán sát thương.",
    "scientificLore": "Iot (I, Z=53) có độ âm điện lớn, tính oxi hóa mãnh liệt tạo thành dạng thù hình I2.",
    "relatedEquation": "I₂ + starch → Dark Blue Complex",
    "iupacName": "Iodine Allotrope",
    "archetype": "HALOGEN_PURGE",
    "structuredEffects": [
      {
        "effectId": "B03_EFF_64",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Bào mòn 300 ATK quái thú đối phương."
      }
    ]
  },
  {
    "id": "card_b03_065_at_65",
    "name": "Astatin — Kẻ Bào Mòn (At2 Dạng 65)",
    "name_en": "Astatine — Kẻ Bào Mòn Specimen 65",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "ACID_DARK",
    "manaCost": 5,
    "level": 6,
    "atk": 2460,
    "def": 1660,
    "chemicalFormula": "At2",
    "atomicNumber": 85,
    "effectCode": "ELEM_B03_AT_PURGE_65",
    "effectText": "Khi tấn công: Bào mòn 300 ATK của quái thú mục tiêu trước khi tính toán sát thương.",
    "scientificLore": "Astatin (At, Z=85) có độ âm điện lớn, tính oxi hóa mãnh liệt tạo thành dạng thù hình At2.",
    "relatedEquation": "2At⁻ - 2e⁻ → At₂",
    "iupacName": "Astatine Allotrope",
    "archetype": "HALOGEN_PURGE",
    "structuredEffects": [
      {
        "effectId": "B03_EFF_65",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Bào mòn 300 ATK quái thú đối phương."
      }
    ]
  },
  {
    "id": "card_b03_066_o_66",
    "name": "Oxy — Kẻ Bào Mòn (O3 Dạng 66)",
    "name_en": "Oxygen — Kẻ Bào Mòn Specimen 66",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "AERO",
    "manaCost": 5,
    "level": 7,
    "atk": 2440,
    "def": 1870,
    "chemicalFormula": "O3",
    "atomicNumber": 8,
    "effectCode": "ELEM_B03_O_PURGE_66",
    "effectText": "Khi bị tiêu diệt: Gây 400 LP sát thương nhiệt lên người chơi tiêu diệt nó.",
    "scientificLore": "Oxy (O, Z=8) có độ âm điện lớn, tính oxi hóa mãnh liệt tạo thành dạng thù hình O3.",
    "relatedEquation": "3O₂ → 2O₃",
    "iupacName": "Oxygen Allotrope",
    "archetype": "CHALCOGEN_EMBER",
    "structuredEffects": [
      {
        "effectId": "B03_EFF_66",
        "activationWindow": "ON_DESTROY",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 400
            }
          }
        ],
        "description": "Nổ 400 LP khi bị tiêu diệt."
      }
    ]
  },
  {
    "id": "card_b03_067_s_67",
    "name": "Lưu Huỳnh — Kẻ Bào Mòn (S8 Dạng 67)",
    "name_en": "Sulfur — Kẻ Bào Mòn Specimen 67",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "ULTRA_RARE",
    "attribute": "PYRO",
    "manaCost": 1,
    "level": 2,
    "atk": 1400,
    "def": 1120,
    "chemicalFormula": "S8",
    "atomicNumber": 16,
    "effectCode": "ELEM_B03_S_PURGE_67",
    "effectText": "Khi bị tiêu diệt: Gây 500 LP sát thương nhiệt lên người chơi tiêu diệt nó.",
    "scientificLore": "Lưu Huỳnh (S, Z=16) có độ âm điện lớn, tính oxi hóa mãnh liệt tạo thành dạng thù hình S8.",
    "relatedEquation": "S + O₂ → SO₂",
    "iupacName": "Sulfur Allotrope",
    "archetype": "CHALCOGEN_EMBER",
    "structuredEffects": [
      {
        "effectId": "B03_EFF_67",
        "activationWindow": "ON_DESTROY",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 400
            }
          }
        ],
        "description": "Nổ 400 LP khi bị tiêu diệt."
      }
    ]
  },
  {
    "id": "card_b03_068_se_68",
    "name": "Selen — Kẻ Bào Mòn (SeO2 Dạng 68)",
    "name_en": "Selenium — Kẻ Bào Mòn Specimen 68",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SECRET_RARE",
    "attribute": "ELECTRO",
    "manaCost": 2,
    "level": 3,
    "atk": 1680,
    "def": 1330,
    "chemicalFormula": "SeO2",
    "atomicNumber": 34,
    "effectCode": "ELEM_B03_SE_PURGE_68",
    "effectText": "Khi bị tiêu diệt: Gây 600 LP sát thương nhiệt lên người chơi tiêu diệt nó.",
    "scientificLore": "Selen (Se, Z=34) có độ âm điện lớn, tính oxi hóa mãnh liệt tạo thành dạng thù hình SeO2.",
    "relatedEquation": "Se + O₂ → SeO₂",
    "iupacName": "Selenium Allotrope",
    "archetype": "CHALCOGEN_EMBER",
    "structuredEffects": [
      {
        "effectId": "B03_EFF_68",
        "activationWindow": "ON_DESTROY",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 400
            }
          }
        ],
        "description": "Nổ 400 LP khi bị tiêu diệt."
      }
    ]
  },
  {
    "id": "card_b03_069_te_69",
    "name": "Telu — Kẻ Bào Mòn (TeO2 Dạng 69)",
    "name_en": "Tellurium — Kẻ Bào Mòn Specimen 69",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "TERRA",
    "manaCost": 3,
    "level": 4,
    "atk": 1960,
    "def": 1340,
    "chemicalFormula": "TeO2",
    "atomicNumber": 52,
    "effectCode": "ELEM_B03_TE_PURGE_69",
    "effectText": "Khi bị tiêu diệt: Gây 300 LP sát thương nhiệt lên người chơi tiêu diệt nó.",
    "scientificLore": "Telu (Te, Z=52) có độ âm điện lớn, tính oxi hóa mãnh liệt tạo thành dạng thù hình TeO2.",
    "relatedEquation": "Te + O₂ → TeO₂",
    "iupacName": "Tellurium Allotrope",
    "archetype": "CHALCOGEN_EMBER",
    "structuredEffects": [
      {
        "effectId": "B03_EFF_69",
        "activationWindow": "ON_DESTROY",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 400
            }
          }
        ],
        "description": "Nổ 400 LP khi bị tiêu diệt."
      }
    ]
  },
  {
    "id": "card_b03_070_po_70",
    "name": "Poloni — Kẻ Bào Mòn (PoO2 Dạng 70)",
    "name_en": "Polonium — Kẻ Bào Mòn Specimen 70",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "ACID_DARK",
    "manaCost": 4,
    "level": 5,
    "atk": 2240,
    "def": 1550,
    "chemicalFormula": "PoO2",
    "atomicNumber": 84,
    "effectCode": "ELEM_B03_PO_PURGE_70",
    "effectText": "Khi bị tiêu diệt: Gây 400 LP sát thương nhiệt lên người chơi tiêu diệt nó.",
    "scientificLore": "Poloni (Po, Z=84) có độ âm điện lớn, tính oxi hóa mãnh liệt tạo thành dạng thù hình PoO2.",
    "relatedEquation": "Po + O₂ → PoO₂",
    "iupacName": "Polonium Allotrope",
    "archetype": "CHALCOGEN_EMBER",
    "structuredEffects": [
      {
        "effectId": "B03_EFF_70",
        "activationWindow": "ON_DESTROY",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 400
            }
          }
        ],
        "description": "Nổ 400 LP khi bị tiêu diệt."
      }
    ]
  },
  {
    "id": "card_b03_071_f_71",
    "name": "Flo — Thợ Săn Oxi Hóa (F2 Dạng 71)",
    "name_en": "Fluorine — Thợ Săn Oxi Hóa Specimen 71",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "AERO",
    "manaCost": 5,
    "level": 6,
    "atk": 2220,
    "def": 1760,
    "chemicalFormula": "F2",
    "atomicNumber": 9,
    "effectCode": "ELEM_B03_F_PURGE_71",
    "effectText": "Khi tấn công: Bào mòn 300 ATK của quái thú mục tiêu trước khi tính toán sát thương.",
    "scientificLore": "Flo (F, Z=9) có độ âm điện lớn, tính oxi hóa mãnh liệt tạo thành dạng thù hình F2.",
    "relatedEquation": "2F₂ + 2H₂O → 4HF + O₂",
    "iupacName": "Fluorine Allotrope",
    "archetype": "HALOGEN_PURGE",
    "structuredEffects": [
      {
        "effectId": "B03_EFF_71",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Bào mòn 300 ATK quái thú đối phương."
      }
    ]
  },
  {
    "id": "card_b03_072_cl_72",
    "name": "Clo — Thợ Săn Oxi Hóa (Cl2 Dạng 72)",
    "name_en": "Chlorine — Thợ Săn Oxi Hóa Specimen 72",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "AERO",
    "manaCost": 5,
    "level": 7,
    "atk": 2500,
    "def": 1970,
    "chemicalFormula": "Cl2",
    "atomicNumber": 17,
    "effectCode": "ELEM_B03_CL_PURGE_72",
    "effectText": "Khi tấn công: Bào mòn 400 ATK của quái thú mục tiêu trước khi tính toán sát thương.",
    "scientificLore": "Clo (Cl, Z=17) có độ âm điện lớn, tính oxi hóa mãnh liệt tạo thành dạng thù hình Cl2.",
    "relatedEquation": "Cl₂ + H₂O ⇌ HCl + HClO",
    "iupacName": "Chlorine Allotrope",
    "archetype": "HALOGEN_PURGE",
    "structuredEffects": [
      {
        "effectId": "B03_EFF_72",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Bào mòn 300 ATK quái thú đối phương."
      }
    ]
  },
  {
    "id": "card_b03_073_br_73",
    "name": "Brom — Thợ Săn Oxi Hóa (Br2 Dạng 73)",
    "name_en": "Bromine — Thợ Săn Oxi Hóa Specimen 73",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "AQUA",
    "manaCost": 1,
    "level": 2,
    "atk": 1460,
    "def": 1020,
    "chemicalFormula": "Br2",
    "atomicNumber": 35,
    "effectCode": "ELEM_B03_BR_PURGE_73",
    "effectText": "Khi tấn công: Bào mòn 200 ATK của quái thú mục tiêu trước khi tính toán sát thương.",
    "scientificLore": "Brom (Br, Z=35) có độ âm điện lớn, tính oxi hóa mãnh liệt tạo thành dạng thù hình Br2.",
    "relatedEquation": "Br₂ + 2KI → 2KBr + I₂",
    "iupacName": "Bromine Allotrope",
    "archetype": "HALOGEN_PURGE",
    "structuredEffects": [
      {
        "effectId": "B03_EFF_73",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Bào mòn 300 ATK quái thú đối phương."
      }
    ]
  },
  {
    "id": "card_b03_074_i_74",
    "name": "Iot — Thợ Săn Oxi Hóa (I2 Dạng 74)",
    "name_en": "Iodine — Thợ Săn Oxi Hóa Specimen 74",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "TERRA",
    "manaCost": 2,
    "level": 3,
    "atk": 1740,
    "def": 1230,
    "chemicalFormula": "I2",
    "atomicNumber": 53,
    "effectCode": "ELEM_B03_I_PURGE_74",
    "effectText": "Khi tấn công: Bào mòn 300 ATK của quái thú mục tiêu trước khi tính toán sát thương.",
    "scientificLore": "Iot (I, Z=53) có độ âm điện lớn, tính oxi hóa mãnh liệt tạo thành dạng thù hình I2.",
    "relatedEquation": "I₂ + starch → Dark Blue Complex",
    "iupacName": "Iodine Allotrope",
    "archetype": "HALOGEN_PURGE",
    "structuredEffects": [
      {
        "effectId": "B03_EFF_74",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Bào mòn 300 ATK quái thú đối phương."
      }
    ]
  },
  {
    "id": "card_b03_075_at_75",
    "name": "Astatin — Thợ Săn Oxi Hóa (At2 Dạng 75)",
    "name_en": "Astatine — Thợ Săn Oxi Hóa Specimen 75",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "ACID_DARK",
    "manaCost": 3,
    "level": 4,
    "atk": 2020,
    "def": 1440,
    "chemicalFormula": "At2",
    "atomicNumber": 85,
    "effectCode": "ELEM_B03_AT_PURGE_75",
    "effectText": "Khi tấn công: Bào mòn 400 ATK của quái thú mục tiêu trước khi tính toán sát thương.",
    "scientificLore": "Astatin (At, Z=85) có độ âm điện lớn, tính oxi hóa mãnh liệt tạo thành dạng thù hình At2.",
    "relatedEquation": "2At⁻ - 2e⁻ → At₂",
    "iupacName": "Astatine Allotrope",
    "archetype": "HALOGEN_PURGE",
    "structuredEffects": [
      {
        "effectId": "B03_EFF_75",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Bào mòn 300 ATK quái thú đối phương."
      }
    ]
  },
  {
    "id": "card_b03_076_o_76",
    "name": "Oxy — Thợ Săn Oxi Hóa (O3 Dạng 76)",
    "name_en": "Oxygen — Thợ Săn Oxi Hóa Specimen 76",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "ULTRA_RARE",
    "attribute": "AERO",
    "manaCost": 4,
    "level": 5,
    "atk": 2000,
    "def": 1650,
    "chemicalFormula": "O3",
    "atomicNumber": 8,
    "effectCode": "ELEM_B03_O_PURGE_76",
    "effectText": "Khi bị tiêu diệt: Gây 600 LP sát thương nhiệt lên người chơi tiêu diệt nó.",
    "scientificLore": "Oxy (O, Z=8) có độ âm điện lớn, tính oxi hóa mãnh liệt tạo thành dạng thù hình O3.",
    "relatedEquation": "3O₂ → 2O₃",
    "iupacName": "Oxygen Allotrope",
    "archetype": "CHALCOGEN_EMBER",
    "structuredEffects": [
      {
        "effectId": "B03_EFF_76",
        "activationWindow": "ON_DESTROY",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 400
            }
          }
        ],
        "description": "Nổ 400 LP khi bị tiêu diệt."
      }
    ]
  },
  {
    "id": "card_b03_077_s_77",
    "name": "Lưu Huỳnh — Thợ Săn Oxi Hóa (S8 Dạng 77)",
    "name_en": "Sulfur — Thợ Săn Oxi Hóa Specimen 77",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SECRET_RARE",
    "attribute": "PYRO",
    "manaCost": 5,
    "level": 6,
    "atk": 2280,
    "def": 1660,
    "chemicalFormula": "S8",
    "atomicNumber": 16,
    "effectCode": "ELEM_B03_S_PURGE_77",
    "effectText": "Khi bị tiêu diệt: Gây 300 LP sát thương nhiệt lên người chơi tiêu diệt nó.",
    "scientificLore": "Lưu Huỳnh (S, Z=16) có độ âm điện lớn, tính oxi hóa mãnh liệt tạo thành dạng thù hình S8.",
    "relatedEquation": "S + O₂ → SO₂",
    "iupacName": "Sulfur Allotrope",
    "archetype": "CHALCOGEN_EMBER",
    "structuredEffects": [
      {
        "effectId": "B03_EFF_77",
        "activationWindow": "ON_DESTROY",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 400
            }
          }
        ],
        "description": "Nổ 400 LP khi bị tiêu diệt."
      }
    ]
  },
  {
    "id": "card_b03_078_se_78",
    "name": "Selen — Thợ Săn Oxi Hóa (SeO2 Dạng 78)",
    "name_en": "Selenium — Thợ Săn Oxi Hóa Specimen 78",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "ELECTRO",
    "manaCost": 5,
    "level": 7,
    "atk": 2560,
    "def": 1870,
    "chemicalFormula": "SeO2",
    "atomicNumber": 34,
    "effectCode": "ELEM_B03_SE_PURGE_78",
    "effectText": "Khi bị tiêu diệt: Gây 400 LP sát thương nhiệt lên người chơi tiêu diệt nó.",
    "scientificLore": "Selen (Se, Z=34) có độ âm điện lớn, tính oxi hóa mãnh liệt tạo thành dạng thù hình SeO2.",
    "relatedEquation": "Se + O₂ → SeO₂",
    "iupacName": "Selenium Allotrope",
    "archetype": "CHALCOGEN_EMBER",
    "structuredEffects": [
      {
        "effectId": "B03_EFF_78",
        "activationWindow": "ON_DESTROY",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 400
            }
          }
        ],
        "description": "Nổ 400 LP khi bị tiêu diệt."
      }
    ]
  },
  {
    "id": "card_b03_079_te_79",
    "name": "Telu — Thợ Săn Oxi Hóa (TeO2 Dạng 79)",
    "name_en": "Tellurium — Thợ Săn Oxi Hóa Specimen 79",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "TERRA",
    "manaCost": 1,
    "level": 2,
    "atk": 1520,
    "def": 1120,
    "chemicalFormula": "TeO2",
    "atomicNumber": 52,
    "effectCode": "ELEM_B03_TE_PURGE_79",
    "effectText": "Khi bị tiêu diệt: Gây 500 LP sát thương nhiệt lên người chơi tiêu diệt nó.",
    "scientificLore": "Telu (Te, Z=52) có độ âm điện lớn, tính oxi hóa mãnh liệt tạo thành dạng thù hình TeO2.",
    "relatedEquation": "Te + O₂ → TeO₂",
    "iupacName": "Tellurium Allotrope",
    "archetype": "CHALCOGEN_EMBER",
    "structuredEffects": [
      {
        "effectId": "B03_EFF_79",
        "activationWindow": "ON_DESTROY",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 400
            }
          }
        ],
        "description": "Nổ 400 LP khi bị tiêu diệt."
      }
    ]
  },
  {
    "id": "card_b03_080_po_80",
    "name": "Poloni — Thợ Săn Oxi Hóa (PoO2 Dạng 80)",
    "name_en": "Polonium — Thợ Săn Oxi Hóa Specimen 80",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "ACID_DARK",
    "manaCost": 2,
    "level": 3,
    "atk": 1800,
    "def": 1330,
    "chemicalFormula": "PoO2",
    "atomicNumber": 84,
    "effectCode": "ELEM_B03_PO_PURGE_80",
    "effectText": "Khi bị tiêu diệt: Gây 600 LP sát thương nhiệt lên người chơi tiêu diệt nó.",
    "scientificLore": "Poloni (Po, Z=84) có độ âm điện lớn, tính oxi hóa mãnh liệt tạo thành dạng thù hình PoO2.",
    "relatedEquation": "Po + O₂ → PoO₂",
    "iupacName": "Polonium Allotrope",
    "archetype": "CHALCOGEN_EMBER",
    "structuredEffects": [
      {
        "effectId": "B03_EFF_80",
        "activationWindow": "ON_DESTROY",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 400
            }
          }
        ],
        "description": "Nổ 400 LP khi bị tiêu diệt."
      }
    ]
  },
  {
    "id": "card_b03_081_f_81",
    "name": "Flo — Kẻ Huỷ Diệt (F2 Dạng 81)",
    "name_en": "Fluorine — Kẻ Huỷ Diệt Specimen 81",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "AERO",
    "manaCost": 3,
    "level": 4,
    "atk": 1780,
    "def": 1340,
    "chemicalFormula": "F2",
    "atomicNumber": 9,
    "effectCode": "ELEM_B03_F_PURGE_81",
    "effectText": "Khi tấn công: Bào mòn 400 ATK của quái thú mục tiêu trước khi tính toán sát thương.",
    "scientificLore": "Flo (F, Z=9) có độ âm điện lớn, tính oxi hóa mãnh liệt tạo thành dạng thù hình F2.",
    "relatedEquation": "2F₂ + 2H₂O → 4HF + O₂",
    "iupacName": "Fluorine Allotrope",
    "archetype": "HALOGEN_PURGE",
    "structuredEffects": [
      {
        "effectId": "B03_EFF_81",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Bào mòn 300 ATK quái thú đối phương."
      }
    ]
  },
  {
    "id": "card_b03_082_cl_82",
    "name": "Clo — Kẻ Huỷ Diệt (Cl2 Dạng 82)",
    "name_en": "Chlorine — Kẻ Huỷ Diệt Specimen 82",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "AERO",
    "manaCost": 4,
    "level": 5,
    "atk": 2060,
    "def": 1550,
    "chemicalFormula": "Cl2",
    "atomicNumber": 17,
    "effectCode": "ELEM_B03_CL_PURGE_82",
    "effectText": "Khi tấn công: Bào mòn 200 ATK của quái thú mục tiêu trước khi tính toán sát thương.",
    "scientificLore": "Clo (Cl, Z=17) có độ âm điện lớn, tính oxi hóa mãnh liệt tạo thành dạng thù hình Cl2.",
    "relatedEquation": "Cl₂ + H₂O ⇌ HCl + HClO",
    "iupacName": "Chlorine Allotrope",
    "archetype": "HALOGEN_PURGE",
    "structuredEffects": [
      {
        "effectId": "B03_EFF_82",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Bào mòn 300 ATK quái thú đối phương."
      }
    ]
  },
  {
    "id": "card_b03_083_br_83",
    "name": "Brom — Kẻ Huỷ Diệt (Br2 Dạng 83)",
    "name_en": "Bromine — Kẻ Huỷ Diệt Specimen 83",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "AQUA",
    "manaCost": 5,
    "level": 6,
    "atk": 2340,
    "def": 1760,
    "chemicalFormula": "Br2",
    "atomicNumber": 35,
    "effectCode": "ELEM_B03_BR_PURGE_83",
    "effectText": "Khi tấn công: Bào mòn 300 ATK của quái thú mục tiêu trước khi tính toán sát thương.",
    "scientificLore": "Brom (Br, Z=35) có độ âm điện lớn, tính oxi hóa mãnh liệt tạo thành dạng thù hình Br2.",
    "relatedEquation": "Br₂ + 2KI → 2KBr + I₂",
    "iupacName": "Bromine Allotrope",
    "archetype": "HALOGEN_PURGE",
    "structuredEffects": [
      {
        "effectId": "B03_EFF_83",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Bào mòn 300 ATK quái thú đối phương."
      }
    ]
  },
  {
    "id": "card_b03_084_i_84",
    "name": "Iot — Kẻ Huỷ Diệt (I2 Dạng 84)",
    "name_en": "Iodine — Kẻ Huỷ Diệt Specimen 84",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "TERRA",
    "manaCost": 5,
    "level": 7,
    "atk": 2620,
    "def": 1970,
    "chemicalFormula": "I2",
    "atomicNumber": 53,
    "effectCode": "ELEM_B03_I_PURGE_84",
    "effectText": "Khi tấn công: Bào mòn 400 ATK của quái thú mục tiêu trước khi tính toán sát thương.",
    "scientificLore": "Iot (I, Z=53) có độ âm điện lớn, tính oxi hóa mãnh liệt tạo thành dạng thù hình I2.",
    "relatedEquation": "I₂ + starch → Dark Blue Complex",
    "iupacName": "Iodine Allotrope",
    "archetype": "HALOGEN_PURGE",
    "structuredEffects": [
      {
        "effectId": "B03_EFF_84",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Bào mòn 300 ATK quái thú đối phương."
      }
    ]
  },
  {
    "id": "card_b03_085_at_85",
    "name": "Astatin — Kẻ Huỷ Diệt (At2 Dạng 85)",
    "name_en": "Astatine — Kẻ Huỷ Diệt Specimen 85",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "ULTRA_RARE",
    "attribute": "ACID_DARK",
    "manaCost": 1,
    "level": 2,
    "atk": 1580,
    "def": 1020,
    "chemicalFormula": "At2",
    "atomicNumber": 85,
    "effectCode": "ELEM_B03_AT_PURGE_85",
    "effectText": "Khi tấn công: Bào mòn 200 ATK của quái thú mục tiêu trước khi tính toán sát thương.",
    "scientificLore": "Astatin (At, Z=85) có độ âm điện lớn, tính oxi hóa mãnh liệt tạo thành dạng thù hình At2.",
    "relatedEquation": "2At⁻ - 2e⁻ → At₂",
    "iupacName": "Astatine Allotrope",
    "archetype": "HALOGEN_PURGE",
    "structuredEffects": [
      {
        "effectId": "B03_EFF_85",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Bào mòn 300 ATK quái thú đối phương."
      }
    ]
  },
  {
    "id": "card_b03_086_o_86",
    "name": "Oxy — Kẻ Huỷ Diệt (O3 Dạng 86)",
    "name_en": "Oxygen — Kẻ Huỷ Diệt Specimen 86",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SECRET_RARE",
    "attribute": "AERO",
    "manaCost": 2,
    "level": 3,
    "atk": 1560,
    "def": 1230,
    "chemicalFormula": "O3",
    "atomicNumber": 8,
    "effectCode": "ELEM_B03_O_PURGE_86",
    "effectText": "Khi bị tiêu diệt: Gây 400 LP sát thương nhiệt lên người chơi tiêu diệt nó.",
    "scientificLore": "Oxy (O, Z=8) có độ âm điện lớn, tính oxi hóa mãnh liệt tạo thành dạng thù hình O3.",
    "relatedEquation": "3O₂ → 2O₃",
    "iupacName": "Oxygen Allotrope",
    "archetype": "CHALCOGEN_EMBER",
    "structuredEffects": [
      {
        "effectId": "B03_EFF_86",
        "activationWindow": "ON_DESTROY",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 400
            }
          }
        ],
        "description": "Nổ 400 LP khi bị tiêu diệt."
      }
    ]
  },
  {
    "id": "card_b03_087_s_87",
    "name": "Lưu Huỳnh — Kẻ Huỷ Diệt (S8 Dạng 87)",
    "name_en": "Sulfur — Kẻ Huỷ Diệt Specimen 87",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "PYRO",
    "manaCost": 3,
    "level": 4,
    "atk": 1840,
    "def": 1440,
    "chemicalFormula": "S8",
    "atomicNumber": 16,
    "effectCode": "ELEM_B03_S_PURGE_87",
    "effectText": "Khi bị tiêu diệt: Gây 500 LP sát thương nhiệt lên người chơi tiêu diệt nó.",
    "scientificLore": "Lưu Huỳnh (S, Z=16) có độ âm điện lớn, tính oxi hóa mãnh liệt tạo thành dạng thù hình S8.",
    "relatedEquation": "S + O₂ → SO₂",
    "iupacName": "Sulfur Allotrope",
    "archetype": "CHALCOGEN_EMBER",
    "structuredEffects": [
      {
        "effectId": "B03_EFF_87",
        "activationWindow": "ON_DESTROY",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 400
            }
          }
        ],
        "description": "Nổ 400 LP khi bị tiêu diệt."
      }
    ]
  },
  {
    "id": "card_b03_088_se_88",
    "name": "Selen — Kẻ Huỷ Diệt (SeO2 Dạng 88)",
    "name_en": "Selenium — Kẻ Huỷ Diệt Specimen 88",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "ELECTRO",
    "manaCost": 4,
    "level": 5,
    "atk": 2120,
    "def": 1650,
    "chemicalFormula": "SeO2",
    "atomicNumber": 34,
    "effectCode": "ELEM_B03_SE_PURGE_88",
    "effectText": "Khi bị tiêu diệt: Gây 600 LP sát thương nhiệt lên người chơi tiêu diệt nó.",
    "scientificLore": "Selen (Se, Z=34) có độ âm điện lớn, tính oxi hóa mãnh liệt tạo thành dạng thù hình SeO2.",
    "relatedEquation": "Se + O₂ → SeO₂",
    "iupacName": "Selenium Allotrope",
    "archetype": "CHALCOGEN_EMBER",
    "structuredEffects": [
      {
        "effectId": "B03_EFF_88",
        "activationWindow": "ON_DESTROY",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 400
            }
          }
        ],
        "description": "Nổ 400 LP khi bị tiêu diệt."
      }
    ]
  },
  {
    "id": "card_b03_089_te_89",
    "name": "Telu — Kẻ Huỷ Diệt (TeO2 Dạng 89)",
    "name_en": "Tellurium — Kẻ Huỷ Diệt Specimen 89",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "TERRA",
    "manaCost": 5,
    "level": 6,
    "atk": 2400,
    "def": 1660,
    "chemicalFormula": "TeO2",
    "atomicNumber": 52,
    "effectCode": "ELEM_B03_TE_PURGE_89",
    "effectText": "Khi bị tiêu diệt: Gây 300 LP sát thương nhiệt lên người chơi tiêu diệt nó.",
    "scientificLore": "Telu (Te, Z=52) có độ âm điện lớn, tính oxi hóa mãnh liệt tạo thành dạng thù hình TeO2.",
    "relatedEquation": "Te + O₂ → TeO₂",
    "iupacName": "Tellurium Allotrope",
    "archetype": "CHALCOGEN_EMBER",
    "structuredEffects": [
      {
        "effectId": "B03_EFF_89",
        "activationWindow": "ON_DESTROY",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 400
            }
          }
        ],
        "description": "Nổ 400 LP khi bị tiêu diệt."
      }
    ]
  },
  {
    "id": "card_b03_090_po_90",
    "name": "Poloni — Kẻ Huỷ Diệt (PoO2 Dạng 90)",
    "name_en": "Polonium — Kẻ Huỷ Diệt Specimen 90",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "ACID_DARK",
    "manaCost": 5,
    "level": 7,
    "atk": 2680,
    "def": 1870,
    "chemicalFormula": "PoO2",
    "atomicNumber": 84,
    "effectCode": "ELEM_B03_PO_PURGE_90",
    "effectText": "Khi bị tiêu diệt: Gây 400 LP sát thương nhiệt lên người chơi tiêu diệt nó.",
    "scientificLore": "Poloni (Po, Z=84) có độ âm điện lớn, tính oxi hóa mãnh liệt tạo thành dạng thù hình PoO2.",
    "relatedEquation": "Po + O₂ → PoO₂",
    "iupacName": "Polonium Allotrope",
    "archetype": "CHALCOGEN_EMBER",
    "structuredEffects": [
      {
        "effectId": "B03_EFF_90",
        "activationWindow": "ON_DESTROY",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 400
            }
          }
        ],
        "description": "Nổ 400 LP khi bị tiêu diệt."
      }
    ]
  },
  {
    "id": "card_b03_091_f_91",
    "name": "Flo — Hỏa Ngục (F2 Dạng 91)",
    "name_en": "Fluorine — Hỏa Ngục Specimen 91",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "AERO",
    "manaCost": 1,
    "level": 2,
    "atk": 1340,
    "def": 1120,
    "chemicalFormula": "F2",
    "atomicNumber": 9,
    "effectCode": "ELEM_B03_F_PURGE_91",
    "effectText": "Khi tấn công: Bào mòn 200 ATK của quái thú mục tiêu trước khi tính toán sát thương.",
    "scientificLore": "Flo (F, Z=9) có độ âm điện lớn, tính oxi hóa mãnh liệt tạo thành dạng thù hình F2.",
    "relatedEquation": "2F₂ + 2H₂O → 4HF + O₂",
    "iupacName": "Fluorine Allotrope",
    "archetype": "HALOGEN_PURGE",
    "structuredEffects": [
      {
        "effectId": "B03_EFF_91",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Bào mòn 300 ATK quái thú đối phương."
      }
    ]
  },
  {
    "id": "card_b03_092_cl_92",
    "name": "Clo — Hỏa Ngục (Cl2 Dạng 92)",
    "name_en": "Chlorine — Hỏa Ngục Specimen 92",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "AERO",
    "manaCost": 2,
    "level": 3,
    "atk": 1620,
    "def": 1330,
    "chemicalFormula": "Cl2",
    "atomicNumber": 17,
    "effectCode": "ELEM_B03_CL_PURGE_92",
    "effectText": "Khi tấn công: Bào mòn 300 ATK của quái thú mục tiêu trước khi tính toán sát thương.",
    "scientificLore": "Clo (Cl, Z=17) có độ âm điện lớn, tính oxi hóa mãnh liệt tạo thành dạng thù hình Cl2.",
    "relatedEquation": "Cl₂ + H₂O ⇌ HCl + HClO",
    "iupacName": "Chlorine Allotrope",
    "archetype": "HALOGEN_PURGE",
    "structuredEffects": [
      {
        "effectId": "B03_EFF_92",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Bào mòn 300 ATK quái thú đối phương."
      }
    ]
  },
  {
    "id": "card_b03_093_br_93",
    "name": "Brom — Hỏa Ngục (Br2 Dạng 93)",
    "name_en": "Bromine — Hỏa Ngục Specimen 93",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "AQUA",
    "manaCost": 3,
    "level": 4,
    "atk": 1900,
    "def": 1340,
    "chemicalFormula": "Br2",
    "atomicNumber": 35,
    "effectCode": "ELEM_B03_BR_PURGE_93",
    "effectText": "Khi tấn công: Bào mòn 400 ATK của quái thú mục tiêu trước khi tính toán sát thương.",
    "scientificLore": "Brom (Br, Z=35) có độ âm điện lớn, tính oxi hóa mãnh liệt tạo thành dạng thù hình Br2.",
    "relatedEquation": "Br₂ + 2KI → 2KBr + I₂",
    "iupacName": "Bromine Allotrope",
    "archetype": "HALOGEN_PURGE",
    "structuredEffects": [
      {
        "effectId": "B03_EFF_93",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Bào mòn 300 ATK quái thú đối phương."
      }
    ]
  },
  {
    "id": "card_b03_094_i_94",
    "name": "Iot — Hỏa Ngục (I2 Dạng 94)",
    "name_en": "Iodine — Hỏa Ngục Specimen 94",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "ULTRA_RARE",
    "attribute": "TERRA",
    "manaCost": 4,
    "level": 5,
    "atk": 2180,
    "def": 1550,
    "chemicalFormula": "I2",
    "atomicNumber": 53,
    "effectCode": "ELEM_B03_I_PURGE_94",
    "effectText": "Khi tấn công: Bào mòn 200 ATK của quái thú mục tiêu trước khi tính toán sát thương.",
    "scientificLore": "Iot (I, Z=53) có độ âm điện lớn, tính oxi hóa mãnh liệt tạo thành dạng thù hình I2.",
    "relatedEquation": "I₂ + starch → Dark Blue Complex",
    "iupacName": "Iodine Allotrope",
    "archetype": "HALOGEN_PURGE",
    "structuredEffects": [
      {
        "effectId": "B03_EFF_94",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Bào mòn 300 ATK quái thú đối phương."
      }
    ]
  },
  {
    "id": "card_b03_095_at_95",
    "name": "Astatin — Hỏa Ngục (At2 Dạng 95)",
    "name_en": "Astatine — Hỏa Ngục Specimen 95",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SECRET_RARE",
    "attribute": "ACID_DARK",
    "manaCost": 5,
    "level": 6,
    "atk": 2460,
    "def": 1760,
    "chemicalFormula": "At2",
    "atomicNumber": 85,
    "effectCode": "ELEM_B03_AT_PURGE_95",
    "effectText": "Khi tấn công: Bào mòn 300 ATK của quái thú mục tiêu trước khi tính toán sát thương.",
    "scientificLore": "Astatin (At, Z=85) có độ âm điện lớn, tính oxi hóa mãnh liệt tạo thành dạng thù hình At2.",
    "relatedEquation": "2At⁻ - 2e⁻ → At₂",
    "iupacName": "Astatine Allotrope",
    "archetype": "HALOGEN_PURGE",
    "structuredEffects": [
      {
        "effectId": "B03_EFF_95",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Bào mòn 300 ATK quái thú đối phương."
      }
    ]
  },
  {
    "id": "card_b03_096_o_96",
    "name": "Oxy — Hỏa Ngục (O3 Dạng 96)",
    "name_en": "Oxygen — Hỏa Ngục Specimen 96",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "AERO",
    "manaCost": 5,
    "level": 7,
    "atk": 2440,
    "def": 1970,
    "chemicalFormula": "O3",
    "atomicNumber": 8,
    "effectCode": "ELEM_B03_O_PURGE_96",
    "effectText": "Khi bị tiêu diệt: Gây 600 LP sát thương nhiệt lên người chơi tiêu diệt nó.",
    "scientificLore": "Oxy (O, Z=8) có độ âm điện lớn, tính oxi hóa mãnh liệt tạo thành dạng thù hình O3.",
    "relatedEquation": "3O₂ → 2O₃",
    "iupacName": "Oxygen Allotrope",
    "archetype": "CHALCOGEN_EMBER",
    "structuredEffects": [
      {
        "effectId": "B03_EFF_96",
        "activationWindow": "ON_DESTROY",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 400
            }
          }
        ],
        "description": "Nổ 400 LP khi bị tiêu diệt."
      }
    ]
  },
  {
    "id": "card_b03_097_s_97",
    "name": "Lưu Huỳnh — Hỏa Ngục (S8 Dạng 97)",
    "name_en": "Sulfur — Hỏa Ngục Specimen 97",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "PYRO",
    "manaCost": 1,
    "level": 2,
    "atk": 1400,
    "def": 1020,
    "chemicalFormula": "S8",
    "atomicNumber": 16,
    "effectCode": "ELEM_B03_S_PURGE_97",
    "effectText": "Khi bị tiêu diệt: Gây 300 LP sát thương nhiệt lên người chơi tiêu diệt nó.",
    "scientificLore": "Lưu Huỳnh (S, Z=16) có độ âm điện lớn, tính oxi hóa mãnh liệt tạo thành dạng thù hình S8.",
    "relatedEquation": "S + O₂ → SO₂",
    "iupacName": "Sulfur Allotrope",
    "archetype": "CHALCOGEN_EMBER",
    "structuredEffects": [
      {
        "effectId": "B03_EFF_97",
        "activationWindow": "ON_DESTROY",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 400
            }
          }
        ],
        "description": "Nổ 400 LP khi bị tiêu diệt."
      }
    ]
  },
  {
    "id": "card_b03_098_se_98",
    "name": "Selen — Hỏa Ngục (SeO2 Dạng 98)",
    "name_en": "Selenium — Hỏa Ngục Specimen 98",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "ELECTRO",
    "manaCost": 2,
    "level": 3,
    "atk": 1680,
    "def": 1230,
    "chemicalFormula": "SeO2",
    "atomicNumber": 34,
    "effectCode": "ELEM_B03_SE_PURGE_98",
    "effectText": "Khi bị tiêu diệt: Gây 400 LP sát thương nhiệt lên người chơi tiêu diệt nó.",
    "scientificLore": "Selen (Se, Z=34) có độ âm điện lớn, tính oxi hóa mãnh liệt tạo thành dạng thù hình SeO2.",
    "relatedEquation": "Se + O₂ → SeO₂",
    "iupacName": "Selenium Allotrope",
    "archetype": "CHALCOGEN_EMBER",
    "structuredEffects": [
      {
        "effectId": "B03_EFF_98",
        "activationWindow": "ON_DESTROY",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 400
            }
          }
        ],
        "description": "Nổ 400 LP khi bị tiêu diệt."
      }
    ]
  },
  {
    "id": "card_b03_099_te_99",
    "name": "Telu — Hỏa Ngục (TeO2 Dạng 99)",
    "name_en": "Tellurium — Hỏa Ngục Specimen 99",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "TERRA",
    "manaCost": 3,
    "level": 4,
    "atk": 1960,
    "def": 1440,
    "chemicalFormula": "TeO2",
    "atomicNumber": 52,
    "effectCode": "ELEM_B03_TE_PURGE_99",
    "effectText": "Khi bị tiêu diệt: Gây 500 LP sát thương nhiệt lên người chơi tiêu diệt nó.",
    "scientificLore": "Telu (Te, Z=52) có độ âm điện lớn, tính oxi hóa mãnh liệt tạo thành dạng thù hình TeO2.",
    "relatedEquation": "Te + O₂ → TeO₂",
    "iupacName": "Tellurium Allotrope",
    "archetype": "CHALCOGEN_EMBER",
    "structuredEffects": [
      {
        "effectId": "B03_EFF_99",
        "activationWindow": "ON_DESTROY",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 400
            }
          }
        ],
        "description": "Nổ 400 LP khi bị tiêu diệt."
      }
    ]
  },
  {
    "id": "card_b03_100_po_100",
    "name": "Poloni — Hỏa Ngục (PoO2 Dạng 100)",
    "name_en": "Polonium — Hỏa Ngục Specimen 100",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "ACID_DARK",
    "manaCost": 4,
    "level": 5,
    "atk": 2240,
    "def": 1650,
    "chemicalFormula": "PoO2",
    "atomicNumber": 84,
    "effectCode": "ELEM_B03_PO_PURGE_100",
    "effectText": "Khi bị tiêu diệt: Gây 600 LP sát thương nhiệt lên người chơi tiêu diệt nó.",
    "scientificLore": "Poloni (Po, Z=84) có độ âm điện lớn, tính oxi hóa mãnh liệt tạo thành dạng thù hình PoO2.",
    "relatedEquation": "Po + O₂ → PoO₂",
    "iupacName": "Polonium Allotrope",
    "archetype": "CHALCOGEN_EMBER",
    "structuredEffects": [
      {
        "effectId": "B03_EFF_100",
        "activationWindow": "ON_DESTROY",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 400
            }
          }
        ],
        "description": "Nổ 400 LP khi bị tiêu diệt."
      }
    ]
  }
];
