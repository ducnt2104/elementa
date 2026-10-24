// src/data/cards/batches/batch_05_monsters_main_organic_hydrocarbons.ts
// Batch 05: Organic & Hydrocarbon Monsters (100 cards)
// Automatically generated and validated for ELEMENTA Tactical TCG

import { PlayableCardDef } from '../../../domain/cardGameTypes';

export const BATCH_05_CARDS: PlayableCardDef[] = [
  {
    "id": "card_b05_001_metan_1",
    "name": "Metan — Chiến Binh Mạch Hở (CH4 Đồng Đẳng 1)",
    "name_en": "Methane — Chiến Binh Mạch Hở Homolog 1",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "AERO",
    "manaCost": 1,
    "level": 2,
    "atk": 1370,
    "def": 1230,
    "chemicalFormula": "CH4",
    "effectCode": "ELEM_B05_METHANE_CHAIN_1",
    "effectText": "Khi có quái thú Hydrocarbon khác trên sân: Tăng 300 ATK và có thể dùng làm 2 nguyên liệu triệu hồi Link/Synchro.",
    "scientificLore": "Metan (CH4) là hydrocarbon tiêu biểu trong chương trình Hóa học hữu cơ lớp 11 GDPT 2018 với phản ứng cháy tỏa năng lượng lớn.",
    "relatedEquation": "CH₄ + 2O₂ → CO₂ + 2H₂O",
    "iupacName": "Methane",
    "archetype": "HYDROCARBON_CHAIN",
    "structuredEffects": [
      {
        "effectId": "B05_EFF_1",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "SELF"
            }
          }
        ],
        "description": "Tăng 300 ATK phản ứng nối mạch hydrocarbon."
      }
    ]
  },
  {
    "id": "card_b05_002_etan_2",
    "name": "Etan — Chiến Binh Mạch Hở (C2H6 Đồng Đẳng 2)",
    "name_en": "Ethane — Chiến Binh Mạch Hở Homolog 2",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "AERO",
    "manaCost": 2,
    "level": 3,
    "atk": 1630,
    "def": 1480,
    "chemicalFormula": "C2H6",
    "effectCode": "ELEM_B05_ETHANE_CHAIN_2",
    "effectText": "Khi có quái thú Hydrocarbon khác trên sân: Tăng 300 ATK và có thể dùng làm 2 nguyên liệu triệu hồi Link/Synchro.",
    "scientificLore": "Etan (C2H6) là hydrocarbon tiêu biểu trong chương trình Hóa học hữu cơ lớp 11 GDPT 2018 với phản ứng cháy tỏa năng lượng lớn.",
    "relatedEquation": "2C₂H₆ + 7O₂ → 4CO₂ + 6H₂O",
    "iupacName": "Ethane",
    "archetype": "HYDROCARBON_CHAIN",
    "structuredEffects": [
      {
        "effectId": "B05_EFF_2",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "SELF"
            }
          }
        ],
        "description": "Tăng 300 ATK phản ứng nối mạch hydrocarbon."
      }
    ]
  },
  {
    "id": "card_b05_003_propan_3",
    "name": "Propan — Chiến Binh Mạch Hở (C3H8 Đồng Đẳng 3)",
    "name_en": "Propane — Chiến Binh Mạch Hở Homolog 3",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "PYRO",
    "manaCost": 3,
    "level": 4,
    "atk": 1890,
    "def": 1730,
    "chemicalFormula": "C3H8",
    "effectCode": "ELEM_B05_PROPANE_CHAIN_3",
    "effectText": "Khi có quái thú Hydrocarbon khác trên sân: Tăng 300 ATK và có thể dùng làm 2 nguyên liệu triệu hồi Link/Synchro.",
    "scientificLore": "Propan (C3H8) là hydrocarbon tiêu biểu trong chương trình Hóa học hữu cơ lớp 11 GDPT 2018 với phản ứng cháy tỏa năng lượng lớn.",
    "relatedEquation": "C₃H₈ + 5O₂ → 3CO₂ + 4H₂O",
    "iupacName": "Propane",
    "archetype": "HYDROCARBON_CHAIN",
    "structuredEffects": [
      {
        "effectId": "B05_EFF_3",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "SELF"
            }
          }
        ],
        "description": "Tăng 300 ATK phản ứng nối mạch hydrocarbon."
      }
    ]
  },
  {
    "id": "card_b05_004_butan_4",
    "name": "Butan — Chiến Binh Mạch Hở (C4H10 Đồng Đẳng 4)",
    "name_en": "Butane — Chiến Binh Mạch Hở Homolog 4",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "PYRO",
    "manaCost": 4,
    "level": 5,
    "atk": 2150,
    "def": 1980,
    "chemicalFormula": "C4H10",
    "effectCode": "ELEM_B05_BUTANE_CHAIN_4",
    "effectText": "Khi có quái thú Hydrocarbon khác trên sân: Tăng 300 ATK và có thể dùng làm 2 nguyên liệu triệu hồi Link/Synchro.",
    "scientificLore": "Butan (C4H10) là hydrocarbon tiêu biểu trong chương trình Hóa học hữu cơ lớp 11 GDPT 2018 với phản ứng cháy tỏa năng lượng lớn.",
    "relatedEquation": "2C₄H₁₀ + 13O₂ → 8CO₂ + 10H₂O",
    "iupacName": "Butane",
    "archetype": "HYDROCARBON_CHAIN",
    "structuredEffects": [
      {
        "effectId": "B05_EFF_4",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "SELF"
            }
          }
        ],
        "description": "Tăng 300 ATK phản ứng nối mạch hydrocarbon."
      }
    ]
  },
  {
    "id": "card_b05_005_etylen_5",
    "name": "Etylen — Chiến Binh Mạch Hở (C2H4 Đồng Đẳng 5)",
    "name_en": "Ethylene — Chiến Binh Mạch Hở Homolog 5",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "ULTRA_RARE",
    "attribute": "AERO",
    "manaCost": 5,
    "level": 6,
    "atk": 2410,
    "def": 1990,
    "chemicalFormula": "C2H4",
    "effectCode": "ELEM_B05_ETHYLENE_CHAIN_5",
    "effectText": "Khi có quái thú Hydrocarbon khác trên sân: Tăng 300 ATK và có thể dùng làm 2 nguyên liệu triệu hồi Link/Synchro.",
    "scientificLore": "Etylen (C2H4) là hydrocarbon tiêu biểu trong chương trình Hóa học hữu cơ lớp 11 GDPT 2018 với phản ứng cháy tỏa năng lượng lớn.",
    "relatedEquation": "C₂H₄ + Br₂ → C₂H₄Br₂",
    "iupacName": "Ethylene",
    "archetype": "HYDROCARBON_CHAIN",
    "structuredEffects": [
      {
        "effectId": "B05_EFF_5",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "SELF"
            }
          }
        ],
        "description": "Tăng 300 ATK phản ứng nối mạch hydrocarbon."
      }
    ]
  },
  {
    "id": "card_b05_006_propylen_6",
    "name": "Propylen — Chiến Binh Mạch Hở (C3H6 Đồng Đẳng 6)",
    "name_en": "Propylene — Chiến Binh Mạch Hở Homolog 6",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SECRET_RARE",
    "attribute": "AERO",
    "manaCost": 5,
    "level": 7,
    "atk": 2420,
    "def": 2240,
    "chemicalFormula": "C3H6",
    "effectCode": "ELEM_B05_PROPYLENE_CHAIN_6",
    "effectText": "Khi có quái thú Hydrocarbon khác trên sân: Tăng 300 ATK và có thể dùng làm 2 nguyên liệu triệu hồi Link/Synchro.",
    "scientificLore": "Propylen (C3H6) là hydrocarbon tiêu biểu trong chương trình Hóa học hữu cơ lớp 11 GDPT 2018 với phản ứng cháy tỏa năng lượng lớn.",
    "relatedEquation": "C₃H₆ + H₂O → C₃H₇OH",
    "iupacName": "Propylene",
    "archetype": "HYDROCARBON_CHAIN",
    "structuredEffects": [
      {
        "effectId": "B05_EFF_6",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "SELF"
            }
          }
        ],
        "description": "Tăng 300 ATK phản ứng nối mạch hydrocarbon."
      }
    ]
  },
  {
    "id": "card_b05_007_axetylen_7",
    "name": "Axetylen — Chiến Binh Mạch Hở (C2H2 Đồng Đẳng 7)",
    "name_en": "Acetylene — Chiến Binh Mạch Hở Homolog 7",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "PYRO",
    "manaCost": 1,
    "level": 2,
    "atk": 1420,
    "def": 1350,
    "chemicalFormula": "C2H2",
    "effectCode": "ELEM_B05_ACETYLENE_CHAIN_7",
    "effectText": "Khi có quái thú Hydrocarbon khác trên sân: Tăng 300 ATK và có thể dùng làm 2 nguyên liệu triệu hồi Link/Synchro.",
    "scientificLore": "Axetylen (C2H2) là hydrocarbon tiêu biểu trong chương trình Hóa học hữu cơ lớp 11 GDPT 2018 với phản ứng cháy tỏa năng lượng lớn.",
    "relatedEquation": "2C₂H₂ + 5O₂ → 4CO₂ + 2H₂O",
    "iupacName": "Acetylene",
    "archetype": "HYDROCARBON_CHAIN",
    "structuredEffects": [
      {
        "effectId": "B05_EFF_7",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "SELF"
            }
          }
        ],
        "description": "Tăng 300 ATK phản ứng nối mạch hydrocarbon."
      }
    ]
  },
  {
    "id": "card_b05_008_butadien_8",
    "name": "Butadien — Chiến Binh Mạch Hở (C4H6 Đồng Đẳng 8)",
    "name_en": "Butadiene — Chiến Binh Mạch Hở Homolog 8",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "PYRO",
    "manaCost": 2,
    "level": 3,
    "atk": 1680,
    "def": 1600,
    "chemicalFormula": "C4H6",
    "effectCode": "ELEM_B05_BUTADIENE_CHAIN_8",
    "effectText": "Khi có quái thú Hydrocarbon khác trên sân: Tăng 300 ATK và có thể dùng làm 2 nguyên liệu triệu hồi Link/Synchro.",
    "scientificLore": "Butadien (C4H6) là hydrocarbon tiêu biểu trong chương trình Hóa học hữu cơ lớp 11 GDPT 2018 với phản ứng cháy tỏa năng lượng lớn.",
    "relatedEquation": "nC₄H₆ → (-CH₂-CH=CH-CH₂-)n",
    "iupacName": "Butadiene",
    "archetype": "HYDROCARBON_CHAIN",
    "structuredEffects": [
      {
        "effectId": "B05_EFF_8",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "SELF"
            }
          }
        ],
        "description": "Tăng 300 ATK phản ứng nối mạch hydrocarbon."
      }
    ]
  },
  {
    "id": "card_b05_009_benzen_9",
    "name": "Benzen — Chiến Binh Mạch Hở (C6H6 Đồng Đẳng 9)",
    "name_en": "Benzene — Chiến Binh Mạch Hở Homolog 9",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "TERRA",
    "manaCost": 3,
    "level": 4,
    "atk": 1940,
    "def": 1610,
    "chemicalFormula": "C6H6",
    "effectCode": "ELEM_B05_BENZENE_CHAIN_9",
    "effectText": "Hệ cộng hưởng electron π liên hợp: Giảm 400 sát thương chiến đấu nhận vào từ mỗi đòn tấn công.",
    "scientificLore": "Benzen (C6H6) là hydrocarbon tiêu biểu trong chương trình Hóa học hữu cơ lớp 11 GDPT 2018 với phản ứng cháy tỏa năng lượng lớn.",
    "relatedEquation": "C₆H₆ + Br₂ → C₆H₅Br + HBr",
    "iupacName": "Benzene",
    "archetype": "AROMATIC_RING",
    "structuredEffects": [
      {
        "effectId": "B05_EFF_9",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "SELF"
            }
          }
        ],
        "description": "Tăng 300 ATK phản ứng nối mạch hydrocarbon."
      }
    ]
  },
  {
    "id": "card_b05_010_toluen_10",
    "name": "Toluen — Chiến Binh Mạch Hở (C7H8 Đồng Đẳng 10)",
    "name_en": "Toluene — Chiến Binh Mạch Hở Homolog 10",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "TERRA",
    "manaCost": 4,
    "level": 5,
    "atk": 2200,
    "def": 1860,
    "chemicalFormula": "C7H8",
    "effectCode": "ELEM_B05_TOLUENE_CHAIN_10",
    "effectText": "Hệ cộng hưởng electron π liên hợp: Giảm 400 sát thương chiến đấu nhận vào từ mỗi đòn tấn công.",
    "scientificLore": "Toluen (C7H8) là hydrocarbon tiêu biểu trong chương trình Hóa học hữu cơ lớp 11 GDPT 2018 với phản ứng cháy tỏa năng lượng lớn.",
    "relatedEquation": "C₇H₈ + 3HNO₃ → TNT + 3H₂O",
    "iupacName": "Toluene",
    "archetype": "AROMATIC_RING",
    "structuredEffects": [
      {
        "effectId": "B05_EFF_10",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "SELF"
            }
          }
        ],
        "description": "Tăng 300 ATK phản ứng nối mạch hydrocarbon."
      }
    ]
  },
  {
    "id": "card_b05_011_naphtalen_11",
    "name": "Naphtalen — Chiến Binh Mạch Hở (C10H8 Đồng Đẳng 11)",
    "name_en": "Naphthalene — Chiến Binh Mạch Hở Homolog 11",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "TERRA",
    "manaCost": 5,
    "level": 6,
    "atk": 2210,
    "def": 2110,
    "chemicalFormula": "C10H8",
    "effectCode": "ELEM_B05_NAPHTHALENE_CHAIN_11",
    "effectText": "Hệ cộng hưởng electron π liên hợp: Giảm 400 sát thương chiến đấu nhận vào từ mỗi đòn tấn công.",
    "scientificLore": "Naphtalen (C10H8) là hydrocarbon tiêu biểu trong chương trình Hóa học hữu cơ lớp 11 GDPT 2018 với phản ứng cháy tỏa năng lượng lớn.",
    "relatedEquation": "C₁₀H₈ + 12O₂ → 10CO₂ + 4H₂O",
    "iupacName": "Naphthalene",
    "archetype": "AROMATIC_RING",
    "structuredEffects": [
      {
        "effectId": "B05_EFF_11",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "SELF"
            }
          }
        ],
        "description": "Tăng 300 ATK phản ứng nối mạch hydrocarbon."
      }
    ]
  },
  {
    "id": "card_b05_012_antraxen_12",
    "name": "Antraxen — Chiến Binh Mạch Hở (C14H10 Đồng Đẳng 12)",
    "name_en": "Anthracene — Chiến Binh Mạch Hở Homolog 12",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "TERRA",
    "manaCost": 5,
    "level": 7,
    "atk": 2470,
    "def": 2360,
    "chemicalFormula": "C14H10",
    "effectCode": "ELEM_B05_ANTHRACENE_CHAIN_12",
    "effectText": "Hệ cộng hưởng electron π liên hợp: Giảm 400 sát thương chiến đấu nhận vào từ mỗi đòn tấn công.",
    "scientificLore": "Antraxen (C14H10) là hydrocarbon tiêu biểu trong chương trình Hóa học hữu cơ lớp 11 GDPT 2018 với phản ứng cháy tỏa năng lượng lớn.",
    "relatedEquation": "C₁₄H₁₀ + 16.5O₂ → 14CO₂ + 5H₂O",
    "iupacName": "Anthracene",
    "archetype": "AROMATIC_RING",
    "structuredEffects": [
      {
        "effectId": "B05_EFF_12",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "SELF"
            }
          }
        ],
        "description": "Tăng 300 ATK phản ứng nối mạch hydrocarbon."
      }
    ]
  },
  {
    "id": "card_b05_013_metan_13",
    "name": "Metan — Kỵ Sĩ Vòng Thơm (CH4 Đồng Đẳng 13)",
    "name_en": "Methane — Kỵ Sĩ Vòng Thơm Homolog 13",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "AERO",
    "manaCost": 1,
    "level": 2,
    "atk": 1470,
    "def": 1230,
    "chemicalFormula": "CH4",
    "effectCode": "ELEM_B05_METHANE_CHAIN_13",
    "effectText": "Khi có quái thú Hydrocarbon khác trên sân: Tăng 300 ATK và có thể dùng làm 2 nguyên liệu triệu hồi Link/Synchro.",
    "scientificLore": "Metan (CH4) là hydrocarbon tiêu biểu trong chương trình Hóa học hữu cơ lớp 11 GDPT 2018 với phản ứng cháy tỏa năng lượng lớn.",
    "relatedEquation": "CH₄ + 2O₂ → CO₂ + 2H₂O",
    "iupacName": "Methane",
    "archetype": "HYDROCARBON_CHAIN",
    "structuredEffects": [
      {
        "effectId": "B05_EFF_13",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "SELF"
            }
          }
        ],
        "description": "Tăng 300 ATK phản ứng nối mạch hydrocarbon."
      }
    ]
  },
  {
    "id": "card_b05_014_etan_14",
    "name": "Etan — Kỵ Sĩ Vòng Thơm (C2H6 Đồng Đẳng 14)",
    "name_en": "Ethane — Kỵ Sĩ Vòng Thơm Homolog 14",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "ULTRA_RARE",
    "attribute": "AERO",
    "manaCost": 2,
    "level": 3,
    "atk": 1730,
    "def": 1480,
    "chemicalFormula": "C2H6",
    "effectCode": "ELEM_B05_ETHANE_CHAIN_14",
    "effectText": "Khi có quái thú Hydrocarbon khác trên sân: Tăng 300 ATK và có thể dùng làm 2 nguyên liệu triệu hồi Link/Synchro.",
    "scientificLore": "Etan (C2H6) là hydrocarbon tiêu biểu trong chương trình Hóa học hữu cơ lớp 11 GDPT 2018 với phản ứng cháy tỏa năng lượng lớn.",
    "relatedEquation": "2C₂H₆ + 7O₂ → 4CO₂ + 6H₂O",
    "iupacName": "Ethane",
    "archetype": "HYDROCARBON_CHAIN",
    "structuredEffects": [
      {
        "effectId": "B05_EFF_14",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "SELF"
            }
          }
        ],
        "description": "Tăng 300 ATK phản ứng nối mạch hydrocarbon."
      }
    ]
  },
  {
    "id": "card_b05_015_propan_15",
    "name": "Propan — Kỵ Sĩ Vòng Thơm (C3H8 Đồng Đẳng 15)",
    "name_en": "Propane — Kỵ Sĩ Vòng Thơm Homolog 15",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SECRET_RARE",
    "attribute": "PYRO",
    "manaCost": 3,
    "level": 4,
    "atk": 1990,
    "def": 1730,
    "chemicalFormula": "C3H8",
    "effectCode": "ELEM_B05_PROPANE_CHAIN_15",
    "effectText": "Khi có quái thú Hydrocarbon khác trên sân: Tăng 300 ATK và có thể dùng làm 2 nguyên liệu triệu hồi Link/Synchro.",
    "scientificLore": "Propan (C3H8) là hydrocarbon tiêu biểu trong chương trình Hóa học hữu cơ lớp 11 GDPT 2018 với phản ứng cháy tỏa năng lượng lớn.",
    "relatedEquation": "C₃H₈ + 5O₂ → 3CO₂ + 4H₂O",
    "iupacName": "Propane",
    "archetype": "HYDROCARBON_CHAIN",
    "structuredEffects": [
      {
        "effectId": "B05_EFF_15",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "SELF"
            }
          }
        ],
        "description": "Tăng 300 ATK phản ứng nối mạch hydrocarbon."
      }
    ]
  },
  {
    "id": "card_b05_016_butan_16",
    "name": "Butan — Kỵ Sĩ Vòng Thơm (C4H10 Đồng Đẳng 16)",
    "name_en": "Butane — Kỵ Sĩ Vòng Thơm Homolog 16",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "PYRO",
    "manaCost": 4,
    "level": 5,
    "atk": 2000,
    "def": 1980,
    "chemicalFormula": "C4H10",
    "effectCode": "ELEM_B05_BUTANE_CHAIN_16",
    "effectText": "Khi có quái thú Hydrocarbon khác trên sân: Tăng 300 ATK và có thể dùng làm 2 nguyên liệu triệu hồi Link/Synchro.",
    "scientificLore": "Butan (C4H10) là hydrocarbon tiêu biểu trong chương trình Hóa học hữu cơ lớp 11 GDPT 2018 với phản ứng cháy tỏa năng lượng lớn.",
    "relatedEquation": "2C₄H₁₀ + 13O₂ → 8CO₂ + 10H₂O",
    "iupacName": "Butane",
    "archetype": "HYDROCARBON_CHAIN",
    "structuredEffects": [
      {
        "effectId": "B05_EFF_16",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "SELF"
            }
          }
        ],
        "description": "Tăng 300 ATK phản ứng nối mạch hydrocarbon."
      }
    ]
  },
  {
    "id": "card_b05_017_etylen_17",
    "name": "Etylen — Kỵ Sĩ Vòng Thơm (C2H4 Đồng Đẳng 17)",
    "name_en": "Ethylene — Kỵ Sĩ Vòng Thơm Homolog 17",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "AERO",
    "manaCost": 5,
    "level": 6,
    "atk": 2260,
    "def": 1990,
    "chemicalFormula": "C2H4",
    "effectCode": "ELEM_B05_ETHYLENE_CHAIN_17",
    "effectText": "Khi có quái thú Hydrocarbon khác trên sân: Tăng 300 ATK và có thể dùng làm 2 nguyên liệu triệu hồi Link/Synchro.",
    "scientificLore": "Etylen (C2H4) là hydrocarbon tiêu biểu trong chương trình Hóa học hữu cơ lớp 11 GDPT 2018 với phản ứng cháy tỏa năng lượng lớn.",
    "relatedEquation": "C₂H₄ + Br₂ → C₂H₄Br₂",
    "iupacName": "Ethylene",
    "archetype": "HYDROCARBON_CHAIN",
    "structuredEffects": [
      {
        "effectId": "B05_EFF_17",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "SELF"
            }
          }
        ],
        "description": "Tăng 300 ATK phản ứng nối mạch hydrocarbon."
      }
    ]
  },
  {
    "id": "card_b05_018_propylen_18",
    "name": "Propylen — Kỵ Sĩ Vòng Thơm (C3H6 Đồng Đẳng 18)",
    "name_en": "Propylene — Kỵ Sĩ Vòng Thơm Homolog 18",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "AERO",
    "manaCost": 5,
    "level": 7,
    "atk": 2520,
    "def": 2240,
    "chemicalFormula": "C3H6",
    "effectCode": "ELEM_B05_PROPYLENE_CHAIN_18",
    "effectText": "Khi có quái thú Hydrocarbon khác trên sân: Tăng 300 ATK và có thể dùng làm 2 nguyên liệu triệu hồi Link/Synchro.",
    "scientificLore": "Propylen (C3H6) là hydrocarbon tiêu biểu trong chương trình Hóa học hữu cơ lớp 11 GDPT 2018 với phản ứng cháy tỏa năng lượng lớn.",
    "relatedEquation": "C₃H₆ + H₂O → C₃H₇OH",
    "iupacName": "Propylene",
    "archetype": "HYDROCARBON_CHAIN",
    "structuredEffects": [
      {
        "effectId": "B05_EFF_18",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "SELF"
            }
          }
        ],
        "description": "Tăng 300 ATK phản ứng nối mạch hydrocarbon."
      }
    ]
  },
  {
    "id": "card_b05_019_axetylen_19",
    "name": "Axetylen — Kỵ Sĩ Vòng Thơm (C2H2 Đồng Đẳng 19)",
    "name_en": "Acetylene — Kỵ Sĩ Vòng Thơm Homolog 19",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "PYRO",
    "manaCost": 1,
    "level": 2,
    "atk": 1520,
    "def": 1350,
    "chemicalFormula": "C2H2",
    "effectCode": "ELEM_B05_ACETYLENE_CHAIN_19",
    "effectText": "Khi có quái thú Hydrocarbon khác trên sân: Tăng 300 ATK và có thể dùng làm 2 nguyên liệu triệu hồi Link/Synchro.",
    "scientificLore": "Axetylen (C2H2) là hydrocarbon tiêu biểu trong chương trình Hóa học hữu cơ lớp 11 GDPT 2018 với phản ứng cháy tỏa năng lượng lớn.",
    "relatedEquation": "2C₂H₂ + 5O₂ → 4CO₂ + 2H₂O",
    "iupacName": "Acetylene",
    "archetype": "HYDROCARBON_CHAIN",
    "structuredEffects": [
      {
        "effectId": "B05_EFF_19",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "SELF"
            }
          }
        ],
        "description": "Tăng 300 ATK phản ứng nối mạch hydrocarbon."
      }
    ]
  },
  {
    "id": "card_b05_020_butadien_20",
    "name": "Butadien — Kỵ Sĩ Vòng Thơm (C4H6 Đồng Đẳng 20)",
    "name_en": "Butadiene — Kỵ Sĩ Vòng Thơm Homolog 20",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "PYRO",
    "manaCost": 2,
    "level": 3,
    "atk": 1780,
    "def": 1600,
    "chemicalFormula": "C4H6",
    "effectCode": "ELEM_B05_BUTADIENE_CHAIN_20",
    "effectText": "Khi có quái thú Hydrocarbon khác trên sân: Tăng 300 ATK và có thể dùng làm 2 nguyên liệu triệu hồi Link/Synchro.",
    "scientificLore": "Butadien (C4H6) là hydrocarbon tiêu biểu trong chương trình Hóa học hữu cơ lớp 11 GDPT 2018 với phản ứng cháy tỏa năng lượng lớn.",
    "relatedEquation": "nC₄H₆ → (-CH₂-CH=CH-CH₂-)n",
    "iupacName": "Butadiene",
    "archetype": "HYDROCARBON_CHAIN",
    "structuredEffects": [
      {
        "effectId": "B05_EFF_20",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "SELF"
            }
          }
        ],
        "description": "Tăng 300 ATK phản ứng nối mạch hydrocarbon."
      }
    ]
  },
  {
    "id": "card_b05_021_benzen_21",
    "name": "Benzen — Kỵ Sĩ Vòng Thơm (C6H6 Đồng Đẳng 21)",
    "name_en": "Benzene — Kỵ Sĩ Vòng Thơm Homolog 21",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "TERRA",
    "manaCost": 3,
    "level": 4,
    "atk": 1790,
    "def": 1610,
    "chemicalFormula": "C6H6",
    "effectCode": "ELEM_B05_BENZENE_CHAIN_21",
    "effectText": "Hệ cộng hưởng electron π liên hợp: Giảm 400 sát thương chiến đấu nhận vào từ mỗi đòn tấn công.",
    "scientificLore": "Benzen (C6H6) là hydrocarbon tiêu biểu trong chương trình Hóa học hữu cơ lớp 11 GDPT 2018 với phản ứng cháy tỏa năng lượng lớn.",
    "relatedEquation": "C₆H₆ + Br₂ → C₆H₅Br + HBr",
    "iupacName": "Benzene",
    "archetype": "AROMATIC_RING",
    "structuredEffects": [
      {
        "effectId": "B05_EFF_21",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "SELF"
            }
          }
        ],
        "description": "Tăng 300 ATK phản ứng nối mạch hydrocarbon."
      }
    ]
  },
  {
    "id": "card_b05_022_toluen_22",
    "name": "Toluen — Kỵ Sĩ Vòng Thơm (C7H8 Đồng Đẳng 22)",
    "name_en": "Toluene — Kỵ Sĩ Vòng Thơm Homolog 22",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "TERRA",
    "manaCost": 4,
    "level": 5,
    "atk": 2050,
    "def": 1860,
    "chemicalFormula": "C7H8",
    "effectCode": "ELEM_B05_TOLUENE_CHAIN_22",
    "effectText": "Hệ cộng hưởng electron π liên hợp: Giảm 400 sát thương chiến đấu nhận vào từ mỗi đòn tấn công.",
    "scientificLore": "Toluen (C7H8) là hydrocarbon tiêu biểu trong chương trình Hóa học hữu cơ lớp 11 GDPT 2018 với phản ứng cháy tỏa năng lượng lớn.",
    "relatedEquation": "C₇H₈ + 3HNO₃ → TNT + 3H₂O",
    "iupacName": "Toluene",
    "archetype": "AROMATIC_RING",
    "structuredEffects": [
      {
        "effectId": "B05_EFF_22",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "SELF"
            }
          }
        ],
        "description": "Tăng 300 ATK phản ứng nối mạch hydrocarbon."
      }
    ]
  },
  {
    "id": "card_b05_023_naphtalen_23",
    "name": "Naphtalen — Kỵ Sĩ Vòng Thơm (C10H8 Đồng Đẳng 23)",
    "name_en": "Naphthalene — Kỵ Sĩ Vòng Thơm Homolog 23",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "ULTRA_RARE",
    "attribute": "TERRA",
    "manaCost": 5,
    "level": 6,
    "atk": 2310,
    "def": 2110,
    "chemicalFormula": "C10H8",
    "effectCode": "ELEM_B05_NAPHTHALENE_CHAIN_23",
    "effectText": "Hệ cộng hưởng electron π liên hợp: Giảm 400 sát thương chiến đấu nhận vào từ mỗi đòn tấn công.",
    "scientificLore": "Naphtalen (C10H8) là hydrocarbon tiêu biểu trong chương trình Hóa học hữu cơ lớp 11 GDPT 2018 với phản ứng cháy tỏa năng lượng lớn.",
    "relatedEquation": "C₁₀H₈ + 12O₂ → 10CO₂ + 4H₂O",
    "iupacName": "Naphthalene",
    "archetype": "AROMATIC_RING",
    "structuredEffects": [
      {
        "effectId": "B05_EFF_23",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "SELF"
            }
          }
        ],
        "description": "Tăng 300 ATK phản ứng nối mạch hydrocarbon."
      }
    ]
  },
  {
    "id": "card_b05_024_antraxen_24",
    "name": "Antraxen — Kỵ Sĩ Vòng Thơm (C14H10 Đồng Đẳng 24)",
    "name_en": "Anthracene — Kỵ Sĩ Vòng Thơm Homolog 24",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SECRET_RARE",
    "attribute": "TERRA",
    "manaCost": 5,
    "level": 7,
    "atk": 2570,
    "def": 2360,
    "chemicalFormula": "C14H10",
    "effectCode": "ELEM_B05_ANTHRACENE_CHAIN_24",
    "effectText": "Hệ cộng hưởng electron π liên hợp: Giảm 400 sát thương chiến đấu nhận vào từ mỗi đòn tấn công.",
    "scientificLore": "Antraxen (C14H10) là hydrocarbon tiêu biểu trong chương trình Hóa học hữu cơ lớp 11 GDPT 2018 với phản ứng cháy tỏa năng lượng lớn.",
    "relatedEquation": "C₁₄H₁₀ + 16.5O₂ → 14CO₂ + 5H₂O",
    "iupacName": "Anthracene",
    "archetype": "AROMATIC_RING",
    "structuredEffects": [
      {
        "effectId": "B05_EFF_24",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "SELF"
            }
          }
        ],
        "description": "Tăng 300 ATK phản ứng nối mạch hydrocarbon."
      }
    ]
  },
  {
    "id": "card_b05_025_metan_25",
    "name": "Metan — Xúc Tác Trùng Hợp (CH4 Đồng Đẳng 25)",
    "name_en": "Methane — Xúc Tác Trùng Hợp Homolog 25",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "AERO",
    "manaCost": 1,
    "level": 2,
    "atk": 1570,
    "def": 1230,
    "chemicalFormula": "CH4",
    "effectCode": "ELEM_B05_METHANE_CHAIN_25",
    "effectText": "Khi có quái thú Hydrocarbon khác trên sân: Tăng 300 ATK và có thể dùng làm 2 nguyên liệu triệu hồi Link/Synchro.",
    "scientificLore": "Metan (CH4) là hydrocarbon tiêu biểu trong chương trình Hóa học hữu cơ lớp 11 GDPT 2018 với phản ứng cháy tỏa năng lượng lớn.",
    "relatedEquation": "CH₄ + 2O₂ → CO₂ + 2H₂O",
    "iupacName": "Methane",
    "archetype": "HYDROCARBON_CHAIN",
    "structuredEffects": [
      {
        "effectId": "B05_EFF_25",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "SELF"
            }
          }
        ],
        "description": "Tăng 300 ATK phản ứng nối mạch hydrocarbon."
      }
    ]
  },
  {
    "id": "card_b05_026_etan_26",
    "name": "Etan — Xúc Tác Trùng Hợp (C2H6 Đồng Đẳng 26)",
    "name_en": "Ethane — Xúc Tác Trùng Hợp Homolog 26",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "AERO",
    "manaCost": 2,
    "level": 3,
    "atk": 1580,
    "def": 1480,
    "chemicalFormula": "C2H6",
    "effectCode": "ELEM_B05_ETHANE_CHAIN_26",
    "effectText": "Khi có quái thú Hydrocarbon khác trên sân: Tăng 300 ATK và có thể dùng làm 2 nguyên liệu triệu hồi Link/Synchro.",
    "scientificLore": "Etan (C2H6) là hydrocarbon tiêu biểu trong chương trình Hóa học hữu cơ lớp 11 GDPT 2018 với phản ứng cháy tỏa năng lượng lớn.",
    "relatedEquation": "2C₂H₆ + 7O₂ → 4CO₂ + 6H₂O",
    "iupacName": "Ethane",
    "archetype": "HYDROCARBON_CHAIN",
    "structuredEffects": [
      {
        "effectId": "B05_EFF_26",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "SELF"
            }
          }
        ],
        "description": "Tăng 300 ATK phản ứng nối mạch hydrocarbon."
      }
    ]
  },
  {
    "id": "card_b05_027_propan_27",
    "name": "Propan — Xúc Tác Trùng Hợp (C3H8 Đồng Đẳng 27)",
    "name_en": "Propane — Xúc Tác Trùng Hợp Homolog 27",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "PYRO",
    "manaCost": 3,
    "level": 4,
    "atk": 1840,
    "def": 1730,
    "chemicalFormula": "C3H8",
    "effectCode": "ELEM_B05_PROPANE_CHAIN_27",
    "effectText": "Khi có quái thú Hydrocarbon khác trên sân: Tăng 300 ATK và có thể dùng làm 2 nguyên liệu triệu hồi Link/Synchro.",
    "scientificLore": "Propan (C3H8) là hydrocarbon tiêu biểu trong chương trình Hóa học hữu cơ lớp 11 GDPT 2018 với phản ứng cháy tỏa năng lượng lớn.",
    "relatedEquation": "C₃H₈ + 5O₂ → 3CO₂ + 4H₂O",
    "iupacName": "Propane",
    "archetype": "HYDROCARBON_CHAIN",
    "structuredEffects": [
      {
        "effectId": "B05_EFF_27",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "SELF"
            }
          }
        ],
        "description": "Tăng 300 ATK phản ứng nối mạch hydrocarbon."
      }
    ]
  },
  {
    "id": "card_b05_028_butan_28",
    "name": "Butan — Xúc Tác Trùng Hợp (C4H10 Đồng Đẳng 28)",
    "name_en": "Butane — Xúc Tác Trùng Hợp Homolog 28",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "PYRO",
    "manaCost": 4,
    "level": 5,
    "atk": 2100,
    "def": 1980,
    "chemicalFormula": "C4H10",
    "effectCode": "ELEM_B05_BUTANE_CHAIN_28",
    "effectText": "Khi có quái thú Hydrocarbon khác trên sân: Tăng 300 ATK và có thể dùng làm 2 nguyên liệu triệu hồi Link/Synchro.",
    "scientificLore": "Butan (C4H10) là hydrocarbon tiêu biểu trong chương trình Hóa học hữu cơ lớp 11 GDPT 2018 với phản ứng cháy tỏa năng lượng lớn.",
    "relatedEquation": "2C₄H₁₀ + 13O₂ → 8CO₂ + 10H₂O",
    "iupacName": "Butane",
    "archetype": "HYDROCARBON_CHAIN",
    "structuredEffects": [
      {
        "effectId": "B05_EFF_28",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "SELF"
            }
          }
        ],
        "description": "Tăng 300 ATK phản ứng nối mạch hydrocarbon."
      }
    ]
  },
  {
    "id": "card_b05_029_etylen_29",
    "name": "Etylen — Xúc Tác Trùng Hợp (C2H4 Đồng Đẳng 29)",
    "name_en": "Ethylene — Xúc Tác Trùng Hợp Homolog 29",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "AERO",
    "manaCost": 5,
    "level": 6,
    "atk": 2360,
    "def": 1990,
    "chemicalFormula": "C2H4",
    "effectCode": "ELEM_B05_ETHYLENE_CHAIN_29",
    "effectText": "Khi có quái thú Hydrocarbon khác trên sân: Tăng 300 ATK và có thể dùng làm 2 nguyên liệu triệu hồi Link/Synchro.",
    "scientificLore": "Etylen (C2H4) là hydrocarbon tiêu biểu trong chương trình Hóa học hữu cơ lớp 11 GDPT 2018 với phản ứng cháy tỏa năng lượng lớn.",
    "relatedEquation": "C₂H₄ + Br₂ → C₂H₄Br₂",
    "iupacName": "Ethylene",
    "archetype": "HYDROCARBON_CHAIN",
    "structuredEffects": [
      {
        "effectId": "B05_EFF_29",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "SELF"
            }
          }
        ],
        "description": "Tăng 300 ATK phản ứng nối mạch hydrocarbon."
      }
    ]
  },
  {
    "id": "card_b05_030_propylen_30",
    "name": "Propylen — Xúc Tác Trùng Hợp (C3H6 Đồng Đẳng 30)",
    "name_en": "Propylene — Xúc Tác Trùng Hợp Homolog 30",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "AERO",
    "manaCost": 5,
    "level": 7,
    "atk": 2620,
    "def": 2240,
    "chemicalFormula": "C3H6",
    "effectCode": "ELEM_B05_PROPYLENE_CHAIN_30",
    "effectText": "Khi có quái thú Hydrocarbon khác trên sân: Tăng 300 ATK và có thể dùng làm 2 nguyên liệu triệu hồi Link/Synchro.",
    "scientificLore": "Propylen (C3H6) là hydrocarbon tiêu biểu trong chương trình Hóa học hữu cơ lớp 11 GDPT 2018 với phản ứng cháy tỏa năng lượng lớn.",
    "relatedEquation": "C₃H₆ + H₂O → C₃H₇OH",
    "iupacName": "Propylene",
    "archetype": "HYDROCARBON_CHAIN",
    "structuredEffects": [
      {
        "effectId": "B05_EFF_30",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "SELF"
            }
          }
        ],
        "description": "Tăng 300 ATK phản ứng nối mạch hydrocarbon."
      }
    ]
  },
  {
    "id": "card_b05_031_axetylen_31",
    "name": "Axetylen — Xúc Tác Trùng Hợp (C2H2 Đồng Đẳng 31)",
    "name_en": "Acetylene — Xúc Tác Trùng Hợp Homolog 31",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "PYRO",
    "manaCost": 1,
    "level": 2,
    "atk": 1370,
    "def": 1350,
    "chemicalFormula": "C2H2",
    "effectCode": "ELEM_B05_ACETYLENE_CHAIN_31",
    "effectText": "Khi có quái thú Hydrocarbon khác trên sân: Tăng 300 ATK và có thể dùng làm 2 nguyên liệu triệu hồi Link/Synchro.",
    "scientificLore": "Axetylen (C2H2) là hydrocarbon tiêu biểu trong chương trình Hóa học hữu cơ lớp 11 GDPT 2018 với phản ứng cháy tỏa năng lượng lớn.",
    "relatedEquation": "2C₂H₂ + 5O₂ → 4CO₂ + 2H₂O",
    "iupacName": "Acetylene",
    "archetype": "HYDROCARBON_CHAIN",
    "structuredEffects": [
      {
        "effectId": "B05_EFF_31",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "SELF"
            }
          }
        ],
        "description": "Tăng 300 ATK phản ứng nối mạch hydrocarbon."
      }
    ]
  },
  {
    "id": "card_b05_032_butadien_32",
    "name": "Butadien — Xúc Tác Trùng Hợp (C4H6 Đồng Đẳng 32)",
    "name_en": "Butadiene — Xúc Tác Trùng Hợp Homolog 32",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "ULTRA_RARE",
    "attribute": "PYRO",
    "manaCost": 2,
    "level": 3,
    "atk": 1630,
    "def": 1600,
    "chemicalFormula": "C4H6",
    "effectCode": "ELEM_B05_BUTADIENE_CHAIN_32",
    "effectText": "Khi có quái thú Hydrocarbon khác trên sân: Tăng 300 ATK và có thể dùng làm 2 nguyên liệu triệu hồi Link/Synchro.",
    "scientificLore": "Butadien (C4H6) là hydrocarbon tiêu biểu trong chương trình Hóa học hữu cơ lớp 11 GDPT 2018 với phản ứng cháy tỏa năng lượng lớn.",
    "relatedEquation": "nC₄H₆ → (-CH₂-CH=CH-CH₂-)n",
    "iupacName": "Butadiene",
    "archetype": "HYDROCARBON_CHAIN",
    "structuredEffects": [
      {
        "effectId": "B05_EFF_32",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "SELF"
            }
          }
        ],
        "description": "Tăng 300 ATK phản ứng nối mạch hydrocarbon."
      }
    ]
  },
  {
    "id": "card_b05_033_benzen_33",
    "name": "Benzen — Xúc Tác Trùng Hợp (C6H6 Đồng Đẳng 33)",
    "name_en": "Benzene — Xúc Tác Trùng Hợp Homolog 33",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SECRET_RARE",
    "attribute": "TERRA",
    "manaCost": 3,
    "level": 4,
    "atk": 1890,
    "def": 1610,
    "chemicalFormula": "C6H6",
    "effectCode": "ELEM_B05_BENZENE_CHAIN_33",
    "effectText": "Hệ cộng hưởng electron π liên hợp: Giảm 400 sát thương chiến đấu nhận vào từ mỗi đòn tấn công.",
    "scientificLore": "Benzen (C6H6) là hydrocarbon tiêu biểu trong chương trình Hóa học hữu cơ lớp 11 GDPT 2018 với phản ứng cháy tỏa năng lượng lớn.",
    "relatedEquation": "C₆H₆ + Br₂ → C₆H₅Br + HBr",
    "iupacName": "Benzene",
    "archetype": "AROMATIC_RING",
    "structuredEffects": [
      {
        "effectId": "B05_EFF_33",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "SELF"
            }
          }
        ],
        "description": "Tăng 300 ATK phản ứng nối mạch hydrocarbon."
      }
    ]
  },
  {
    "id": "card_b05_034_toluen_34",
    "name": "Toluen — Xúc Tác Trùng Hợp (C7H8 Đồng Đẳng 34)",
    "name_en": "Toluene — Xúc Tác Trùng Hợp Homolog 34",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "TERRA",
    "manaCost": 4,
    "level": 5,
    "atk": 2150,
    "def": 1860,
    "chemicalFormula": "C7H8",
    "effectCode": "ELEM_B05_TOLUENE_CHAIN_34",
    "effectText": "Hệ cộng hưởng electron π liên hợp: Giảm 400 sát thương chiến đấu nhận vào từ mỗi đòn tấn công.",
    "scientificLore": "Toluen (C7H8) là hydrocarbon tiêu biểu trong chương trình Hóa học hữu cơ lớp 11 GDPT 2018 với phản ứng cháy tỏa năng lượng lớn.",
    "relatedEquation": "C₇H₈ + 3HNO₃ → TNT + 3H₂O",
    "iupacName": "Toluene",
    "archetype": "AROMATIC_RING",
    "structuredEffects": [
      {
        "effectId": "B05_EFF_34",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "SELF"
            }
          }
        ],
        "description": "Tăng 300 ATK phản ứng nối mạch hydrocarbon."
      }
    ]
  },
  {
    "id": "card_b05_035_naphtalen_35",
    "name": "Naphtalen — Xúc Tác Trùng Hợp (C10H8 Đồng Đẳng 35)",
    "name_en": "Naphthalene — Xúc Tác Trùng Hợp Homolog 35",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "TERRA",
    "manaCost": 5,
    "level": 6,
    "atk": 2410,
    "def": 2110,
    "chemicalFormula": "C10H8",
    "effectCode": "ELEM_B05_NAPHTHALENE_CHAIN_35",
    "effectText": "Hệ cộng hưởng electron π liên hợp: Giảm 400 sát thương chiến đấu nhận vào từ mỗi đòn tấn công.",
    "scientificLore": "Naphtalen (C10H8) là hydrocarbon tiêu biểu trong chương trình Hóa học hữu cơ lớp 11 GDPT 2018 với phản ứng cháy tỏa năng lượng lớn.",
    "relatedEquation": "C₁₀H₈ + 12O₂ → 10CO₂ + 4H₂O",
    "iupacName": "Naphthalene",
    "archetype": "AROMATIC_RING",
    "structuredEffects": [
      {
        "effectId": "B05_EFF_35",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "SELF"
            }
          }
        ],
        "description": "Tăng 300 ATK phản ứng nối mạch hydrocarbon."
      }
    ]
  },
  {
    "id": "card_b05_036_antraxen_36",
    "name": "Antraxen — Xúc Tác Trùng Hợp (C14H10 Đồng Đẳng 36)",
    "name_en": "Anthracene — Xúc Tác Trùng Hợp Homolog 36",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "TERRA",
    "manaCost": 5,
    "level": 7,
    "atk": 2420,
    "def": 2360,
    "chemicalFormula": "C14H10",
    "effectCode": "ELEM_B05_ANTHRACENE_CHAIN_36",
    "effectText": "Hệ cộng hưởng electron π liên hợp: Giảm 400 sát thương chiến đấu nhận vào từ mỗi đòn tấn công.",
    "scientificLore": "Antraxen (C14H10) là hydrocarbon tiêu biểu trong chương trình Hóa học hữu cơ lớp 11 GDPT 2018 với phản ứng cháy tỏa năng lượng lớn.",
    "relatedEquation": "C₁₄H₁₀ + 16.5O₂ → 14CO₂ + 5H₂O",
    "iupacName": "Anthracene",
    "archetype": "AROMATIC_RING",
    "structuredEffects": [
      {
        "effectId": "B05_EFF_36",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "SELF"
            }
          }
        ],
        "description": "Tăng 300 ATK phản ứng nối mạch hydrocarbon."
      }
    ]
  },
  {
    "id": "card_b05_037_metan_37",
    "name": "Metan — Lính Tiên Phong Carbon (CH4 Đồng Đẳng 37)",
    "name_en": "Methane — Lính Tiên Phong Carbon Homolog 37",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "AERO",
    "manaCost": 1,
    "level": 2,
    "atk": 1420,
    "def": 1230,
    "chemicalFormula": "CH4",
    "effectCode": "ELEM_B05_METHANE_CHAIN_37",
    "effectText": "Khi có quái thú Hydrocarbon khác trên sân: Tăng 300 ATK và có thể dùng làm 2 nguyên liệu triệu hồi Link/Synchro.",
    "scientificLore": "Metan (CH4) là hydrocarbon tiêu biểu trong chương trình Hóa học hữu cơ lớp 11 GDPT 2018 với phản ứng cháy tỏa năng lượng lớn.",
    "relatedEquation": "CH₄ + 2O₂ → CO₂ + 2H₂O",
    "iupacName": "Methane",
    "archetype": "HYDROCARBON_CHAIN",
    "structuredEffects": [
      {
        "effectId": "B05_EFF_37",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "SELF"
            }
          }
        ],
        "description": "Tăng 300 ATK phản ứng nối mạch hydrocarbon."
      }
    ]
  },
  {
    "id": "card_b05_038_etan_38",
    "name": "Etan — Lính Tiên Phong Carbon (C2H6 Đồng Đẳng 38)",
    "name_en": "Ethane — Lính Tiên Phong Carbon Homolog 38",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "AERO",
    "manaCost": 2,
    "level": 3,
    "atk": 1680,
    "def": 1480,
    "chemicalFormula": "C2H6",
    "effectCode": "ELEM_B05_ETHANE_CHAIN_38",
    "effectText": "Khi có quái thú Hydrocarbon khác trên sân: Tăng 300 ATK và có thể dùng làm 2 nguyên liệu triệu hồi Link/Synchro.",
    "scientificLore": "Etan (C2H6) là hydrocarbon tiêu biểu trong chương trình Hóa học hữu cơ lớp 11 GDPT 2018 với phản ứng cháy tỏa năng lượng lớn.",
    "relatedEquation": "2C₂H₆ + 7O₂ → 4CO₂ + 6H₂O",
    "iupacName": "Ethane",
    "archetype": "HYDROCARBON_CHAIN",
    "structuredEffects": [
      {
        "effectId": "B05_EFF_38",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "SELF"
            }
          }
        ],
        "description": "Tăng 300 ATK phản ứng nối mạch hydrocarbon."
      }
    ]
  },
  {
    "id": "card_b05_039_propan_39",
    "name": "Propan — Lính Tiên Phong Carbon (C3H8 Đồng Đẳng 39)",
    "name_en": "Propane — Lính Tiên Phong Carbon Homolog 39",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "PYRO",
    "manaCost": 3,
    "level": 4,
    "atk": 1940,
    "def": 1730,
    "chemicalFormula": "C3H8",
    "effectCode": "ELEM_B05_PROPANE_CHAIN_39",
    "effectText": "Khi có quái thú Hydrocarbon khác trên sân: Tăng 300 ATK và có thể dùng làm 2 nguyên liệu triệu hồi Link/Synchro.",
    "scientificLore": "Propan (C3H8) là hydrocarbon tiêu biểu trong chương trình Hóa học hữu cơ lớp 11 GDPT 2018 với phản ứng cháy tỏa năng lượng lớn.",
    "relatedEquation": "C₃H₈ + 5O₂ → 3CO₂ + 4H₂O",
    "iupacName": "Propane",
    "archetype": "HYDROCARBON_CHAIN",
    "structuredEffects": [
      {
        "effectId": "B05_EFF_39",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "SELF"
            }
          }
        ],
        "description": "Tăng 300 ATK phản ứng nối mạch hydrocarbon."
      }
    ]
  },
  {
    "id": "card_b05_040_butan_40",
    "name": "Butan — Lính Tiên Phong Carbon (C4H10 Đồng Đẳng 40)",
    "name_en": "Butane — Lính Tiên Phong Carbon Homolog 40",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "PYRO",
    "manaCost": 4,
    "level": 5,
    "atk": 2200,
    "def": 1980,
    "chemicalFormula": "C4H10",
    "effectCode": "ELEM_B05_BUTANE_CHAIN_40",
    "effectText": "Khi có quái thú Hydrocarbon khác trên sân: Tăng 300 ATK và có thể dùng làm 2 nguyên liệu triệu hồi Link/Synchro.",
    "scientificLore": "Butan (C4H10) là hydrocarbon tiêu biểu trong chương trình Hóa học hữu cơ lớp 11 GDPT 2018 với phản ứng cháy tỏa năng lượng lớn.",
    "relatedEquation": "2C₄H₁₀ + 13O₂ → 8CO₂ + 10H₂O",
    "iupacName": "Butane",
    "archetype": "HYDROCARBON_CHAIN",
    "structuredEffects": [
      {
        "effectId": "B05_EFF_40",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "SELF"
            }
          }
        ],
        "description": "Tăng 300 ATK phản ứng nối mạch hydrocarbon."
      }
    ]
  },
  {
    "id": "card_b05_041_etylen_41",
    "name": "Etylen — Lính Tiên Phong Carbon (C2H4 Đồng Đẳng 41)",
    "name_en": "Ethylene — Lính Tiên Phong Carbon Homolog 41",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "ULTRA_RARE",
    "attribute": "AERO",
    "manaCost": 5,
    "level": 6,
    "atk": 2210,
    "def": 1990,
    "chemicalFormula": "C2H4",
    "effectCode": "ELEM_B05_ETHYLENE_CHAIN_41",
    "effectText": "Khi có quái thú Hydrocarbon khác trên sân: Tăng 300 ATK và có thể dùng làm 2 nguyên liệu triệu hồi Link/Synchro.",
    "scientificLore": "Etylen (C2H4) là hydrocarbon tiêu biểu trong chương trình Hóa học hữu cơ lớp 11 GDPT 2018 với phản ứng cháy tỏa năng lượng lớn.",
    "relatedEquation": "C₂H₄ + Br₂ → C₂H₄Br₂",
    "iupacName": "Ethylene",
    "archetype": "HYDROCARBON_CHAIN",
    "structuredEffects": [
      {
        "effectId": "B05_EFF_41",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "SELF"
            }
          }
        ],
        "description": "Tăng 300 ATK phản ứng nối mạch hydrocarbon."
      }
    ]
  },
  {
    "id": "card_b05_042_propylen_42",
    "name": "Propylen — Lính Tiên Phong Carbon (C3H6 Đồng Đẳng 42)",
    "name_en": "Propylene — Lính Tiên Phong Carbon Homolog 42",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SECRET_RARE",
    "attribute": "AERO",
    "manaCost": 5,
    "level": 7,
    "atk": 2470,
    "def": 2240,
    "chemicalFormula": "C3H6",
    "effectCode": "ELEM_B05_PROPYLENE_CHAIN_42",
    "effectText": "Khi có quái thú Hydrocarbon khác trên sân: Tăng 300 ATK và có thể dùng làm 2 nguyên liệu triệu hồi Link/Synchro.",
    "scientificLore": "Propylen (C3H6) là hydrocarbon tiêu biểu trong chương trình Hóa học hữu cơ lớp 11 GDPT 2018 với phản ứng cháy tỏa năng lượng lớn.",
    "relatedEquation": "C₃H₆ + H₂O → C₃H₇OH",
    "iupacName": "Propylene",
    "archetype": "HYDROCARBON_CHAIN",
    "structuredEffects": [
      {
        "effectId": "B05_EFF_42",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "SELF"
            }
          }
        ],
        "description": "Tăng 300 ATK phản ứng nối mạch hydrocarbon."
      }
    ]
  },
  {
    "id": "card_b05_043_axetylen_43",
    "name": "Axetylen — Lính Tiên Phong Carbon (C2H2 Đồng Đẳng 43)",
    "name_en": "Acetylene — Lính Tiên Phong Carbon Homolog 43",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "PYRO",
    "manaCost": 1,
    "level": 2,
    "atk": 1470,
    "def": 1350,
    "chemicalFormula": "C2H2",
    "effectCode": "ELEM_B05_ACETYLENE_CHAIN_43",
    "effectText": "Khi có quái thú Hydrocarbon khác trên sân: Tăng 300 ATK và có thể dùng làm 2 nguyên liệu triệu hồi Link/Synchro.",
    "scientificLore": "Axetylen (C2H2) là hydrocarbon tiêu biểu trong chương trình Hóa học hữu cơ lớp 11 GDPT 2018 với phản ứng cháy tỏa năng lượng lớn.",
    "relatedEquation": "2C₂H₂ + 5O₂ → 4CO₂ + 2H₂O",
    "iupacName": "Acetylene",
    "archetype": "HYDROCARBON_CHAIN",
    "structuredEffects": [
      {
        "effectId": "B05_EFF_43",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "SELF"
            }
          }
        ],
        "description": "Tăng 300 ATK phản ứng nối mạch hydrocarbon."
      }
    ]
  },
  {
    "id": "card_b05_044_butadien_44",
    "name": "Butadien — Lính Tiên Phong Carbon (C4H6 Đồng Đẳng 44)",
    "name_en": "Butadiene — Lính Tiên Phong Carbon Homolog 44",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "PYRO",
    "manaCost": 2,
    "level": 3,
    "atk": 1730,
    "def": 1600,
    "chemicalFormula": "C4H6",
    "effectCode": "ELEM_B05_BUTADIENE_CHAIN_44",
    "effectText": "Khi có quái thú Hydrocarbon khác trên sân: Tăng 300 ATK và có thể dùng làm 2 nguyên liệu triệu hồi Link/Synchro.",
    "scientificLore": "Butadien (C4H6) là hydrocarbon tiêu biểu trong chương trình Hóa học hữu cơ lớp 11 GDPT 2018 với phản ứng cháy tỏa năng lượng lớn.",
    "relatedEquation": "nC₄H₆ → (-CH₂-CH=CH-CH₂-)n",
    "iupacName": "Butadiene",
    "archetype": "HYDROCARBON_CHAIN",
    "structuredEffects": [
      {
        "effectId": "B05_EFF_44",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "SELF"
            }
          }
        ],
        "description": "Tăng 300 ATK phản ứng nối mạch hydrocarbon."
      }
    ]
  },
  {
    "id": "card_b05_045_benzen_45",
    "name": "Benzen — Lính Tiên Phong Carbon (C6H6 Đồng Đẳng 45)",
    "name_en": "Benzene — Lính Tiên Phong Carbon Homolog 45",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "TERRA",
    "manaCost": 3,
    "level": 4,
    "atk": 1990,
    "def": 1610,
    "chemicalFormula": "C6H6",
    "effectCode": "ELEM_B05_BENZENE_CHAIN_45",
    "effectText": "Hệ cộng hưởng electron π liên hợp: Giảm 400 sát thương chiến đấu nhận vào từ mỗi đòn tấn công.",
    "scientificLore": "Benzen (C6H6) là hydrocarbon tiêu biểu trong chương trình Hóa học hữu cơ lớp 11 GDPT 2018 với phản ứng cháy tỏa năng lượng lớn.",
    "relatedEquation": "C₆H₆ + Br₂ → C₆H₅Br + HBr",
    "iupacName": "Benzene",
    "archetype": "AROMATIC_RING",
    "structuredEffects": [
      {
        "effectId": "B05_EFF_45",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "SELF"
            }
          }
        ],
        "description": "Tăng 300 ATK phản ứng nối mạch hydrocarbon."
      }
    ]
  },
  {
    "id": "card_b05_046_toluen_46",
    "name": "Toluen — Lính Tiên Phong Carbon (C7H8 Đồng Đẳng 46)",
    "name_en": "Toluene — Lính Tiên Phong Carbon Homolog 46",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "TERRA",
    "manaCost": 4,
    "level": 5,
    "atk": 2000,
    "def": 1860,
    "chemicalFormula": "C7H8",
    "effectCode": "ELEM_B05_TOLUENE_CHAIN_46",
    "effectText": "Hệ cộng hưởng electron π liên hợp: Giảm 400 sát thương chiến đấu nhận vào từ mỗi đòn tấn công.",
    "scientificLore": "Toluen (C7H8) là hydrocarbon tiêu biểu trong chương trình Hóa học hữu cơ lớp 11 GDPT 2018 với phản ứng cháy tỏa năng lượng lớn.",
    "relatedEquation": "C₇H₈ + 3HNO₃ → TNT + 3H₂O",
    "iupacName": "Toluene",
    "archetype": "AROMATIC_RING",
    "structuredEffects": [
      {
        "effectId": "B05_EFF_46",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "SELF"
            }
          }
        ],
        "description": "Tăng 300 ATK phản ứng nối mạch hydrocarbon."
      }
    ]
  },
  {
    "id": "card_b05_047_naphtalen_47",
    "name": "Naphtalen — Lính Tiên Phong Carbon (C10H8 Đồng Đẳng 47)",
    "name_en": "Naphthalene — Lính Tiên Phong Carbon Homolog 47",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "TERRA",
    "manaCost": 5,
    "level": 6,
    "atk": 2260,
    "def": 2110,
    "chemicalFormula": "C10H8",
    "effectCode": "ELEM_B05_NAPHTHALENE_CHAIN_47",
    "effectText": "Hệ cộng hưởng electron π liên hợp: Giảm 400 sát thương chiến đấu nhận vào từ mỗi đòn tấn công.",
    "scientificLore": "Naphtalen (C10H8) là hydrocarbon tiêu biểu trong chương trình Hóa học hữu cơ lớp 11 GDPT 2018 với phản ứng cháy tỏa năng lượng lớn.",
    "relatedEquation": "C₁₀H₈ + 12O₂ → 10CO₂ + 4H₂O",
    "iupacName": "Naphthalene",
    "archetype": "AROMATIC_RING",
    "structuredEffects": [
      {
        "effectId": "B05_EFF_47",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "SELF"
            }
          }
        ],
        "description": "Tăng 300 ATK phản ứng nối mạch hydrocarbon."
      }
    ]
  },
  {
    "id": "card_b05_048_antraxen_48",
    "name": "Antraxen — Lính Tiên Phong Carbon (C14H10 Đồng Đẳng 48)",
    "name_en": "Anthracene — Lính Tiên Phong Carbon Homolog 48",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "TERRA",
    "manaCost": 5,
    "level": 7,
    "atk": 2520,
    "def": 2360,
    "chemicalFormula": "C14H10",
    "effectCode": "ELEM_B05_ANTHRACENE_CHAIN_48",
    "effectText": "Hệ cộng hưởng electron π liên hợp: Giảm 400 sát thương chiến đấu nhận vào từ mỗi đòn tấn công.",
    "scientificLore": "Antraxen (C14H10) là hydrocarbon tiêu biểu trong chương trình Hóa học hữu cơ lớp 11 GDPT 2018 với phản ứng cháy tỏa năng lượng lớn.",
    "relatedEquation": "C₁₄H₁₀ + 16.5O₂ → 14CO₂ + 5H₂O",
    "iupacName": "Anthracene",
    "archetype": "AROMATIC_RING",
    "structuredEffects": [
      {
        "effectId": "B05_EFF_48",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "SELF"
            }
          }
        ],
        "description": "Tăng 300 ATK phản ứng nối mạch hydrocarbon."
      }
    ]
  },
  {
    "id": "card_b05_049_metan_49",
    "name": "Metan — Thần Tượng Năng Lượng (CH4 Đồng Đẳng 49)",
    "name_en": "Methane — Thần Tượng Năng Lượng Homolog 49",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "AERO",
    "manaCost": 1,
    "level": 2,
    "atk": 1520,
    "def": 1230,
    "chemicalFormula": "CH4",
    "effectCode": "ELEM_B05_METHANE_CHAIN_49",
    "effectText": "Khi có quái thú Hydrocarbon khác trên sân: Tăng 300 ATK và có thể dùng làm 2 nguyên liệu triệu hồi Link/Synchro.",
    "scientificLore": "Metan (CH4) là hydrocarbon tiêu biểu trong chương trình Hóa học hữu cơ lớp 11 GDPT 2018 với phản ứng cháy tỏa năng lượng lớn.",
    "relatedEquation": "CH₄ + 2O₂ → CO₂ + 2H₂O",
    "iupacName": "Methane",
    "archetype": "HYDROCARBON_CHAIN",
    "structuredEffects": [
      {
        "effectId": "B05_EFF_49",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "SELF"
            }
          }
        ],
        "description": "Tăng 300 ATK phản ứng nối mạch hydrocarbon."
      }
    ]
  },
  {
    "id": "card_b05_050_etan_50",
    "name": "Etan — Thần Tượng Năng Lượng (C2H6 Đồng Đẳng 50)",
    "name_en": "Ethane — Thần Tượng Năng Lượng Homolog 50",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "ULTRA_RARE",
    "attribute": "AERO",
    "manaCost": 2,
    "level": 3,
    "atk": 1780,
    "def": 1480,
    "chemicalFormula": "C2H6",
    "effectCode": "ELEM_B05_ETHANE_CHAIN_50",
    "effectText": "Khi có quái thú Hydrocarbon khác trên sân: Tăng 300 ATK và có thể dùng làm 2 nguyên liệu triệu hồi Link/Synchro.",
    "scientificLore": "Etan (C2H6) là hydrocarbon tiêu biểu trong chương trình Hóa học hữu cơ lớp 11 GDPT 2018 với phản ứng cháy tỏa năng lượng lớn.",
    "relatedEquation": "2C₂H₆ + 7O₂ → 4CO₂ + 6H₂O",
    "iupacName": "Ethane",
    "archetype": "HYDROCARBON_CHAIN",
    "structuredEffects": [
      {
        "effectId": "B05_EFF_50",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "SELF"
            }
          }
        ],
        "description": "Tăng 300 ATK phản ứng nối mạch hydrocarbon."
      }
    ]
  },
  {
    "id": "card_b05_051_propan_51",
    "name": "Propan — Thần Tượng Năng Lượng (C3H8 Đồng Đẳng 51)",
    "name_en": "Propane — Thần Tượng Năng Lượng Homolog 51",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SECRET_RARE",
    "attribute": "PYRO",
    "manaCost": 3,
    "level": 4,
    "atk": 1790,
    "def": 1730,
    "chemicalFormula": "C3H8",
    "effectCode": "ELEM_B05_PROPANE_CHAIN_51",
    "effectText": "Khi có quái thú Hydrocarbon khác trên sân: Tăng 300 ATK và có thể dùng làm 2 nguyên liệu triệu hồi Link/Synchro.",
    "scientificLore": "Propan (C3H8) là hydrocarbon tiêu biểu trong chương trình Hóa học hữu cơ lớp 11 GDPT 2018 với phản ứng cháy tỏa năng lượng lớn.",
    "relatedEquation": "C₃H₈ + 5O₂ → 3CO₂ + 4H₂O",
    "iupacName": "Propane",
    "archetype": "HYDROCARBON_CHAIN",
    "structuredEffects": [
      {
        "effectId": "B05_EFF_51",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "SELF"
            }
          }
        ],
        "description": "Tăng 300 ATK phản ứng nối mạch hydrocarbon."
      }
    ]
  },
  {
    "id": "card_b05_052_butan_52",
    "name": "Butan — Thần Tượng Năng Lượng (C4H10 Đồng Đẳng 52)",
    "name_en": "Butane — Thần Tượng Năng Lượng Homolog 52",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "PYRO",
    "manaCost": 4,
    "level": 5,
    "atk": 2050,
    "def": 1980,
    "chemicalFormula": "C4H10",
    "effectCode": "ELEM_B05_BUTANE_CHAIN_52",
    "effectText": "Khi có quái thú Hydrocarbon khác trên sân: Tăng 300 ATK và có thể dùng làm 2 nguyên liệu triệu hồi Link/Synchro.",
    "scientificLore": "Butan (C4H10) là hydrocarbon tiêu biểu trong chương trình Hóa học hữu cơ lớp 11 GDPT 2018 với phản ứng cháy tỏa năng lượng lớn.",
    "relatedEquation": "2C₄H₁₀ + 13O₂ → 8CO₂ + 10H₂O",
    "iupacName": "Butane",
    "archetype": "HYDROCARBON_CHAIN",
    "structuredEffects": [
      {
        "effectId": "B05_EFF_52",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "SELF"
            }
          }
        ],
        "description": "Tăng 300 ATK phản ứng nối mạch hydrocarbon."
      }
    ]
  },
  {
    "id": "card_b05_053_etylen_53",
    "name": "Etylen — Thần Tượng Năng Lượng (C2H4 Đồng Đẳng 53)",
    "name_en": "Ethylene — Thần Tượng Năng Lượng Homolog 53",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "AERO",
    "manaCost": 5,
    "level": 6,
    "atk": 2310,
    "def": 1990,
    "chemicalFormula": "C2H4",
    "effectCode": "ELEM_B05_ETHYLENE_CHAIN_53",
    "effectText": "Khi có quái thú Hydrocarbon khác trên sân: Tăng 300 ATK và có thể dùng làm 2 nguyên liệu triệu hồi Link/Synchro.",
    "scientificLore": "Etylen (C2H4) là hydrocarbon tiêu biểu trong chương trình Hóa học hữu cơ lớp 11 GDPT 2018 với phản ứng cháy tỏa năng lượng lớn.",
    "relatedEquation": "C₂H₄ + Br₂ → C₂H₄Br₂",
    "iupacName": "Ethylene",
    "archetype": "HYDROCARBON_CHAIN",
    "structuredEffects": [
      {
        "effectId": "B05_EFF_53",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "SELF"
            }
          }
        ],
        "description": "Tăng 300 ATK phản ứng nối mạch hydrocarbon."
      }
    ]
  },
  {
    "id": "card_b05_054_propylen_54",
    "name": "Propylen — Thần Tượng Năng Lượng (C3H6 Đồng Đẳng 54)",
    "name_en": "Propylene — Thần Tượng Năng Lượng Homolog 54",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "AERO",
    "manaCost": 5,
    "level": 7,
    "atk": 2570,
    "def": 2240,
    "chemicalFormula": "C3H6",
    "effectCode": "ELEM_B05_PROPYLENE_CHAIN_54",
    "effectText": "Khi có quái thú Hydrocarbon khác trên sân: Tăng 300 ATK và có thể dùng làm 2 nguyên liệu triệu hồi Link/Synchro.",
    "scientificLore": "Propylen (C3H6) là hydrocarbon tiêu biểu trong chương trình Hóa học hữu cơ lớp 11 GDPT 2018 với phản ứng cháy tỏa năng lượng lớn.",
    "relatedEquation": "C₃H₆ + H₂O → C₃H₇OH",
    "iupacName": "Propylene",
    "archetype": "HYDROCARBON_CHAIN",
    "structuredEffects": [
      {
        "effectId": "B05_EFF_54",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "SELF"
            }
          }
        ],
        "description": "Tăng 300 ATK phản ứng nối mạch hydrocarbon."
      }
    ]
  },
  {
    "id": "card_b05_055_axetylen_55",
    "name": "Axetylen — Thần Tượng Năng Lượng (C2H2 Đồng Đẳng 55)",
    "name_en": "Acetylene — Thần Tượng Năng Lượng Homolog 55",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "PYRO",
    "manaCost": 1,
    "level": 2,
    "atk": 1570,
    "def": 1350,
    "chemicalFormula": "C2H2",
    "effectCode": "ELEM_B05_ACETYLENE_CHAIN_55",
    "effectText": "Khi có quái thú Hydrocarbon khác trên sân: Tăng 300 ATK và có thể dùng làm 2 nguyên liệu triệu hồi Link/Synchro.",
    "scientificLore": "Axetylen (C2H2) là hydrocarbon tiêu biểu trong chương trình Hóa học hữu cơ lớp 11 GDPT 2018 với phản ứng cháy tỏa năng lượng lớn.",
    "relatedEquation": "2C₂H₂ + 5O₂ → 4CO₂ + 2H₂O",
    "iupacName": "Acetylene",
    "archetype": "HYDROCARBON_CHAIN",
    "structuredEffects": [
      {
        "effectId": "B05_EFF_55",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "SELF"
            }
          }
        ],
        "description": "Tăng 300 ATK phản ứng nối mạch hydrocarbon."
      }
    ]
  },
  {
    "id": "card_b05_056_butadien_56",
    "name": "Butadien — Thần Tượng Năng Lượng (C4H6 Đồng Đẳng 56)",
    "name_en": "Butadiene — Thần Tượng Năng Lượng Homolog 56",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "PYRO",
    "manaCost": 2,
    "level": 3,
    "atk": 1580,
    "def": 1600,
    "chemicalFormula": "C4H6",
    "effectCode": "ELEM_B05_BUTADIENE_CHAIN_56",
    "effectText": "Khi có quái thú Hydrocarbon khác trên sân: Tăng 300 ATK và có thể dùng làm 2 nguyên liệu triệu hồi Link/Synchro.",
    "scientificLore": "Butadien (C4H6) là hydrocarbon tiêu biểu trong chương trình Hóa học hữu cơ lớp 11 GDPT 2018 với phản ứng cháy tỏa năng lượng lớn.",
    "relatedEquation": "nC₄H₆ → (-CH₂-CH=CH-CH₂-)n",
    "iupacName": "Butadiene",
    "archetype": "HYDROCARBON_CHAIN",
    "structuredEffects": [
      {
        "effectId": "B05_EFF_56",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "SELF"
            }
          }
        ],
        "description": "Tăng 300 ATK phản ứng nối mạch hydrocarbon."
      }
    ]
  },
  {
    "id": "card_b05_057_benzen_57",
    "name": "Benzen — Thần Tượng Năng Lượng (C6H6 Đồng Đẳng 57)",
    "name_en": "Benzene — Thần Tượng Năng Lượng Homolog 57",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "TERRA",
    "manaCost": 3,
    "level": 4,
    "atk": 1840,
    "def": 1610,
    "chemicalFormula": "C6H6",
    "effectCode": "ELEM_B05_BENZENE_CHAIN_57",
    "effectText": "Hệ cộng hưởng electron π liên hợp: Giảm 400 sát thương chiến đấu nhận vào từ mỗi đòn tấn công.",
    "scientificLore": "Benzen (C6H6) là hydrocarbon tiêu biểu trong chương trình Hóa học hữu cơ lớp 11 GDPT 2018 với phản ứng cháy tỏa năng lượng lớn.",
    "relatedEquation": "C₆H₆ + Br₂ → C₆H₅Br + HBr",
    "iupacName": "Benzene",
    "archetype": "AROMATIC_RING",
    "structuredEffects": [
      {
        "effectId": "B05_EFF_57",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "SELF"
            }
          }
        ],
        "description": "Tăng 300 ATK phản ứng nối mạch hydrocarbon."
      }
    ]
  },
  {
    "id": "card_b05_058_toluen_58",
    "name": "Toluen — Thần Tượng Năng Lượng (C7H8 Đồng Đẳng 58)",
    "name_en": "Toluene — Thần Tượng Năng Lượng Homolog 58",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "TERRA",
    "manaCost": 4,
    "level": 5,
    "atk": 2100,
    "def": 1860,
    "chemicalFormula": "C7H8",
    "effectCode": "ELEM_B05_TOLUENE_CHAIN_58",
    "effectText": "Hệ cộng hưởng electron π liên hợp: Giảm 400 sát thương chiến đấu nhận vào từ mỗi đòn tấn công.",
    "scientificLore": "Toluen (C7H8) là hydrocarbon tiêu biểu trong chương trình Hóa học hữu cơ lớp 11 GDPT 2018 với phản ứng cháy tỏa năng lượng lớn.",
    "relatedEquation": "C₇H₈ + 3HNO₃ → TNT + 3H₂O",
    "iupacName": "Toluene",
    "archetype": "AROMATIC_RING",
    "structuredEffects": [
      {
        "effectId": "B05_EFF_58",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "SELF"
            }
          }
        ],
        "description": "Tăng 300 ATK phản ứng nối mạch hydrocarbon."
      }
    ]
  },
  {
    "id": "card_b05_059_naphtalen_59",
    "name": "Naphtalen — Thần Tượng Năng Lượng (C10H8 Đồng Đẳng 59)",
    "name_en": "Naphthalene — Thần Tượng Năng Lượng Homolog 59",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "ULTRA_RARE",
    "attribute": "TERRA",
    "manaCost": 5,
    "level": 6,
    "atk": 2360,
    "def": 2110,
    "chemicalFormula": "C10H8",
    "effectCode": "ELEM_B05_NAPHTHALENE_CHAIN_59",
    "effectText": "Hệ cộng hưởng electron π liên hợp: Giảm 400 sát thương chiến đấu nhận vào từ mỗi đòn tấn công.",
    "scientificLore": "Naphtalen (C10H8) là hydrocarbon tiêu biểu trong chương trình Hóa học hữu cơ lớp 11 GDPT 2018 với phản ứng cháy tỏa năng lượng lớn.",
    "relatedEquation": "C₁₀H₈ + 12O₂ → 10CO₂ + 4H₂O",
    "iupacName": "Naphthalene",
    "archetype": "AROMATIC_RING",
    "structuredEffects": [
      {
        "effectId": "B05_EFF_59",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "SELF"
            }
          }
        ],
        "description": "Tăng 300 ATK phản ứng nối mạch hydrocarbon."
      }
    ]
  },
  {
    "id": "card_b05_060_antraxen_60",
    "name": "Antraxen — Thần Tượng Năng Lượng (C14H10 Đồng Đẳng 60)",
    "name_en": "Anthracene — Thần Tượng Năng Lượng Homolog 60",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SECRET_RARE",
    "attribute": "TERRA",
    "manaCost": 5,
    "level": 7,
    "atk": 2620,
    "def": 2360,
    "chemicalFormula": "C14H10",
    "effectCode": "ELEM_B05_ANTHRACENE_CHAIN_60",
    "effectText": "Hệ cộng hưởng electron π liên hợp: Giảm 400 sát thương chiến đấu nhận vào từ mỗi đòn tấn công.",
    "scientificLore": "Antraxen (C14H10) là hydrocarbon tiêu biểu trong chương trình Hóa học hữu cơ lớp 11 GDPT 2018 với phản ứng cháy tỏa năng lượng lớn.",
    "relatedEquation": "C₁₄H₁₀ + 16.5O₂ → 14CO₂ + 5H₂O",
    "iupacName": "Anthracene",
    "archetype": "AROMATIC_RING",
    "structuredEffects": [
      {
        "effectId": "B05_EFF_60",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "SELF"
            }
          }
        ],
        "description": "Tăng 300 ATK phản ứng nối mạch hydrocarbon."
      }
    ]
  },
  {
    "id": "card_b05_061_metan_61",
    "name": "Metan — Chiến Binh Mạch Hở (CH4 Đồng Đẳng 61)",
    "name_en": "Methane — Chiến Binh Mạch Hở Homolog 61",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "AERO",
    "manaCost": 1,
    "level": 2,
    "atk": 1370,
    "def": 1230,
    "chemicalFormula": "CH4",
    "effectCode": "ELEM_B05_METHANE_CHAIN_61",
    "effectText": "Khi có quái thú Hydrocarbon khác trên sân: Tăng 300 ATK và có thể dùng làm 2 nguyên liệu triệu hồi Link/Synchro.",
    "scientificLore": "Metan (CH4) là hydrocarbon tiêu biểu trong chương trình Hóa học hữu cơ lớp 11 GDPT 2018 với phản ứng cháy tỏa năng lượng lớn.",
    "relatedEquation": "CH₄ + 2O₂ → CO₂ + 2H₂O",
    "iupacName": "Methane",
    "archetype": "HYDROCARBON_CHAIN",
    "structuredEffects": [
      {
        "effectId": "B05_EFF_61",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "SELF"
            }
          }
        ],
        "description": "Tăng 300 ATK phản ứng nối mạch hydrocarbon."
      }
    ]
  },
  {
    "id": "card_b05_062_etan_62",
    "name": "Etan — Chiến Binh Mạch Hở (C2H6 Đồng Đẳng 62)",
    "name_en": "Ethane — Chiến Binh Mạch Hở Homolog 62",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "AERO",
    "manaCost": 2,
    "level": 3,
    "atk": 1630,
    "def": 1480,
    "chemicalFormula": "C2H6",
    "effectCode": "ELEM_B05_ETHANE_CHAIN_62",
    "effectText": "Khi có quái thú Hydrocarbon khác trên sân: Tăng 300 ATK và có thể dùng làm 2 nguyên liệu triệu hồi Link/Synchro.",
    "scientificLore": "Etan (C2H6) là hydrocarbon tiêu biểu trong chương trình Hóa học hữu cơ lớp 11 GDPT 2018 với phản ứng cháy tỏa năng lượng lớn.",
    "relatedEquation": "2C₂H₆ + 7O₂ → 4CO₂ + 6H₂O",
    "iupacName": "Ethane",
    "archetype": "HYDROCARBON_CHAIN",
    "structuredEffects": [
      {
        "effectId": "B05_EFF_62",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "SELF"
            }
          }
        ],
        "description": "Tăng 300 ATK phản ứng nối mạch hydrocarbon."
      }
    ]
  },
  {
    "id": "card_b05_063_propan_63",
    "name": "Propan — Chiến Binh Mạch Hở (C3H8 Đồng Đẳng 63)",
    "name_en": "Propane — Chiến Binh Mạch Hở Homolog 63",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "PYRO",
    "manaCost": 3,
    "level": 4,
    "atk": 1890,
    "def": 1730,
    "chemicalFormula": "C3H8",
    "effectCode": "ELEM_B05_PROPANE_CHAIN_63",
    "effectText": "Khi có quái thú Hydrocarbon khác trên sân: Tăng 300 ATK và có thể dùng làm 2 nguyên liệu triệu hồi Link/Synchro.",
    "scientificLore": "Propan (C3H8) là hydrocarbon tiêu biểu trong chương trình Hóa học hữu cơ lớp 11 GDPT 2018 với phản ứng cháy tỏa năng lượng lớn.",
    "relatedEquation": "C₃H₈ + 5O₂ → 3CO₂ + 4H₂O",
    "iupacName": "Propane",
    "archetype": "HYDROCARBON_CHAIN",
    "structuredEffects": [
      {
        "effectId": "B05_EFF_63",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "SELF"
            }
          }
        ],
        "description": "Tăng 300 ATK phản ứng nối mạch hydrocarbon."
      }
    ]
  },
  {
    "id": "card_b05_064_butan_64",
    "name": "Butan — Chiến Binh Mạch Hở (C4H10 Đồng Đẳng 64)",
    "name_en": "Butane — Chiến Binh Mạch Hở Homolog 64",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "PYRO",
    "manaCost": 4,
    "level": 5,
    "atk": 2150,
    "def": 1980,
    "chemicalFormula": "C4H10",
    "effectCode": "ELEM_B05_BUTANE_CHAIN_64",
    "effectText": "Khi có quái thú Hydrocarbon khác trên sân: Tăng 300 ATK và có thể dùng làm 2 nguyên liệu triệu hồi Link/Synchro.",
    "scientificLore": "Butan (C4H10) là hydrocarbon tiêu biểu trong chương trình Hóa học hữu cơ lớp 11 GDPT 2018 với phản ứng cháy tỏa năng lượng lớn.",
    "relatedEquation": "2C₄H₁₀ + 13O₂ → 8CO₂ + 10H₂O",
    "iupacName": "Butane",
    "archetype": "HYDROCARBON_CHAIN",
    "structuredEffects": [
      {
        "effectId": "B05_EFF_64",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "SELF"
            }
          }
        ],
        "description": "Tăng 300 ATK phản ứng nối mạch hydrocarbon."
      }
    ]
  },
  {
    "id": "card_b05_065_etylen_65",
    "name": "Etylen — Chiến Binh Mạch Hở (C2H4 Đồng Đẳng 65)",
    "name_en": "Ethylene — Chiến Binh Mạch Hở Homolog 65",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "AERO",
    "manaCost": 5,
    "level": 6,
    "atk": 2410,
    "def": 1990,
    "chemicalFormula": "C2H4",
    "effectCode": "ELEM_B05_ETHYLENE_CHAIN_65",
    "effectText": "Khi có quái thú Hydrocarbon khác trên sân: Tăng 300 ATK và có thể dùng làm 2 nguyên liệu triệu hồi Link/Synchro.",
    "scientificLore": "Etylen (C2H4) là hydrocarbon tiêu biểu trong chương trình Hóa học hữu cơ lớp 11 GDPT 2018 với phản ứng cháy tỏa năng lượng lớn.",
    "relatedEquation": "C₂H₄ + Br₂ → C₂H₄Br₂",
    "iupacName": "Ethylene",
    "archetype": "HYDROCARBON_CHAIN",
    "structuredEffects": [
      {
        "effectId": "B05_EFF_65",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "SELF"
            }
          }
        ],
        "description": "Tăng 300 ATK phản ứng nối mạch hydrocarbon."
      }
    ]
  },
  {
    "id": "card_b05_066_propylen_66",
    "name": "Propylen — Chiến Binh Mạch Hở (C3H6 Đồng Đẳng 66)",
    "name_en": "Propylene — Chiến Binh Mạch Hở Homolog 66",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "AERO",
    "manaCost": 5,
    "level": 7,
    "atk": 2420,
    "def": 2240,
    "chemicalFormula": "C3H6",
    "effectCode": "ELEM_B05_PROPYLENE_CHAIN_66",
    "effectText": "Khi có quái thú Hydrocarbon khác trên sân: Tăng 300 ATK và có thể dùng làm 2 nguyên liệu triệu hồi Link/Synchro.",
    "scientificLore": "Propylen (C3H6) là hydrocarbon tiêu biểu trong chương trình Hóa học hữu cơ lớp 11 GDPT 2018 với phản ứng cháy tỏa năng lượng lớn.",
    "relatedEquation": "C₃H₆ + H₂O → C₃H₇OH",
    "iupacName": "Propylene",
    "archetype": "HYDROCARBON_CHAIN",
    "structuredEffects": [
      {
        "effectId": "B05_EFF_66",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "SELF"
            }
          }
        ],
        "description": "Tăng 300 ATK phản ứng nối mạch hydrocarbon."
      }
    ]
  },
  {
    "id": "card_b05_067_axetylen_67",
    "name": "Axetylen — Chiến Binh Mạch Hở (C2H2 Đồng Đẳng 67)",
    "name_en": "Acetylene — Chiến Binh Mạch Hở Homolog 67",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "PYRO",
    "manaCost": 1,
    "level": 2,
    "atk": 1420,
    "def": 1350,
    "chemicalFormula": "C2H2",
    "effectCode": "ELEM_B05_ACETYLENE_CHAIN_67",
    "effectText": "Khi có quái thú Hydrocarbon khác trên sân: Tăng 300 ATK và có thể dùng làm 2 nguyên liệu triệu hồi Link/Synchro.",
    "scientificLore": "Axetylen (C2H2) là hydrocarbon tiêu biểu trong chương trình Hóa học hữu cơ lớp 11 GDPT 2018 với phản ứng cháy tỏa năng lượng lớn.",
    "relatedEquation": "2C₂H₂ + 5O₂ → 4CO₂ + 2H₂O",
    "iupacName": "Acetylene",
    "archetype": "HYDROCARBON_CHAIN",
    "structuredEffects": [
      {
        "effectId": "B05_EFF_67",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "SELF"
            }
          }
        ],
        "description": "Tăng 300 ATK phản ứng nối mạch hydrocarbon."
      }
    ]
  },
  {
    "id": "card_b05_068_butadien_68",
    "name": "Butadien — Chiến Binh Mạch Hở (C4H6 Đồng Đẳng 68)",
    "name_en": "Butadiene — Chiến Binh Mạch Hở Homolog 68",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "ULTRA_RARE",
    "attribute": "PYRO",
    "manaCost": 2,
    "level": 3,
    "atk": 1680,
    "def": 1600,
    "chemicalFormula": "C4H6",
    "effectCode": "ELEM_B05_BUTADIENE_CHAIN_68",
    "effectText": "Khi có quái thú Hydrocarbon khác trên sân: Tăng 300 ATK và có thể dùng làm 2 nguyên liệu triệu hồi Link/Synchro.",
    "scientificLore": "Butadien (C4H6) là hydrocarbon tiêu biểu trong chương trình Hóa học hữu cơ lớp 11 GDPT 2018 với phản ứng cháy tỏa năng lượng lớn.",
    "relatedEquation": "nC₄H₆ → (-CH₂-CH=CH-CH₂-)n",
    "iupacName": "Butadiene",
    "archetype": "HYDROCARBON_CHAIN",
    "structuredEffects": [
      {
        "effectId": "B05_EFF_68",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "SELF"
            }
          }
        ],
        "description": "Tăng 300 ATK phản ứng nối mạch hydrocarbon."
      }
    ]
  },
  {
    "id": "card_b05_069_benzen_69",
    "name": "Benzen — Chiến Binh Mạch Hở (C6H6 Đồng Đẳng 69)",
    "name_en": "Benzene — Chiến Binh Mạch Hở Homolog 69",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SECRET_RARE",
    "attribute": "TERRA",
    "manaCost": 3,
    "level": 4,
    "atk": 1940,
    "def": 1610,
    "chemicalFormula": "C6H6",
    "effectCode": "ELEM_B05_BENZENE_CHAIN_69",
    "effectText": "Hệ cộng hưởng electron π liên hợp: Giảm 400 sát thương chiến đấu nhận vào từ mỗi đòn tấn công.",
    "scientificLore": "Benzen (C6H6) là hydrocarbon tiêu biểu trong chương trình Hóa học hữu cơ lớp 11 GDPT 2018 với phản ứng cháy tỏa năng lượng lớn.",
    "relatedEquation": "C₆H₆ + Br₂ → C₆H₅Br + HBr",
    "iupacName": "Benzene",
    "archetype": "AROMATIC_RING",
    "structuredEffects": [
      {
        "effectId": "B05_EFF_69",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "SELF"
            }
          }
        ],
        "description": "Tăng 300 ATK phản ứng nối mạch hydrocarbon."
      }
    ]
  },
  {
    "id": "card_b05_070_toluen_70",
    "name": "Toluen — Chiến Binh Mạch Hở (C7H8 Đồng Đẳng 70)",
    "name_en": "Toluene — Chiến Binh Mạch Hở Homolog 70",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "TERRA",
    "manaCost": 4,
    "level": 5,
    "atk": 2200,
    "def": 1860,
    "chemicalFormula": "C7H8",
    "effectCode": "ELEM_B05_TOLUENE_CHAIN_70",
    "effectText": "Hệ cộng hưởng electron π liên hợp: Giảm 400 sát thương chiến đấu nhận vào từ mỗi đòn tấn công.",
    "scientificLore": "Toluen (C7H8) là hydrocarbon tiêu biểu trong chương trình Hóa học hữu cơ lớp 11 GDPT 2018 với phản ứng cháy tỏa năng lượng lớn.",
    "relatedEquation": "C₇H₈ + 3HNO₃ → TNT + 3H₂O",
    "iupacName": "Toluene",
    "archetype": "AROMATIC_RING",
    "structuredEffects": [
      {
        "effectId": "B05_EFF_70",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "SELF"
            }
          }
        ],
        "description": "Tăng 300 ATK phản ứng nối mạch hydrocarbon."
      }
    ]
  },
  {
    "id": "card_b05_071_naphtalen_71",
    "name": "Naphtalen — Chiến Binh Mạch Hở (C10H8 Đồng Đẳng 71)",
    "name_en": "Naphthalene — Chiến Binh Mạch Hở Homolog 71",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "TERRA",
    "manaCost": 5,
    "level": 6,
    "atk": 2210,
    "def": 2110,
    "chemicalFormula": "C10H8",
    "effectCode": "ELEM_B05_NAPHTHALENE_CHAIN_71",
    "effectText": "Hệ cộng hưởng electron π liên hợp: Giảm 400 sát thương chiến đấu nhận vào từ mỗi đòn tấn công.",
    "scientificLore": "Naphtalen (C10H8) là hydrocarbon tiêu biểu trong chương trình Hóa học hữu cơ lớp 11 GDPT 2018 với phản ứng cháy tỏa năng lượng lớn.",
    "relatedEquation": "C₁₀H₈ + 12O₂ → 10CO₂ + 4H₂O",
    "iupacName": "Naphthalene",
    "archetype": "AROMATIC_RING",
    "structuredEffects": [
      {
        "effectId": "B05_EFF_71",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "SELF"
            }
          }
        ],
        "description": "Tăng 300 ATK phản ứng nối mạch hydrocarbon."
      }
    ]
  },
  {
    "id": "card_b05_072_antraxen_72",
    "name": "Antraxen — Chiến Binh Mạch Hở (C14H10 Đồng Đẳng 72)",
    "name_en": "Anthracene — Chiến Binh Mạch Hở Homolog 72",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "TERRA",
    "manaCost": 5,
    "level": 7,
    "atk": 2470,
    "def": 2360,
    "chemicalFormula": "C14H10",
    "effectCode": "ELEM_B05_ANTHRACENE_CHAIN_72",
    "effectText": "Hệ cộng hưởng electron π liên hợp: Giảm 400 sát thương chiến đấu nhận vào từ mỗi đòn tấn công.",
    "scientificLore": "Antraxen (C14H10) là hydrocarbon tiêu biểu trong chương trình Hóa học hữu cơ lớp 11 GDPT 2018 với phản ứng cháy tỏa năng lượng lớn.",
    "relatedEquation": "C₁₄H₁₀ + 16.5O₂ → 14CO₂ + 5H₂O",
    "iupacName": "Anthracene",
    "archetype": "AROMATIC_RING",
    "structuredEffects": [
      {
        "effectId": "B05_EFF_72",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "SELF"
            }
          }
        ],
        "description": "Tăng 300 ATK phản ứng nối mạch hydrocarbon."
      }
    ]
  },
  {
    "id": "card_b05_073_metan_73",
    "name": "Metan — Kỵ Sĩ Vòng Thơm (CH4 Đồng Đẳng 73)",
    "name_en": "Methane — Kỵ Sĩ Vòng Thơm Homolog 73",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "AERO",
    "manaCost": 1,
    "level": 2,
    "atk": 1470,
    "def": 1230,
    "chemicalFormula": "CH4",
    "effectCode": "ELEM_B05_METHANE_CHAIN_73",
    "effectText": "Khi có quái thú Hydrocarbon khác trên sân: Tăng 300 ATK và có thể dùng làm 2 nguyên liệu triệu hồi Link/Synchro.",
    "scientificLore": "Metan (CH4) là hydrocarbon tiêu biểu trong chương trình Hóa học hữu cơ lớp 11 GDPT 2018 với phản ứng cháy tỏa năng lượng lớn.",
    "relatedEquation": "CH₄ + 2O₂ → CO₂ + 2H₂O",
    "iupacName": "Methane",
    "archetype": "HYDROCARBON_CHAIN",
    "structuredEffects": [
      {
        "effectId": "B05_EFF_73",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "SELF"
            }
          }
        ],
        "description": "Tăng 300 ATK phản ứng nối mạch hydrocarbon."
      }
    ]
  },
  {
    "id": "card_b05_074_etan_74",
    "name": "Etan — Kỵ Sĩ Vòng Thơm (C2H6 Đồng Đẳng 74)",
    "name_en": "Ethane — Kỵ Sĩ Vòng Thơm Homolog 74",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "AERO",
    "manaCost": 2,
    "level": 3,
    "atk": 1730,
    "def": 1480,
    "chemicalFormula": "C2H6",
    "effectCode": "ELEM_B05_ETHANE_CHAIN_74",
    "effectText": "Khi có quái thú Hydrocarbon khác trên sân: Tăng 300 ATK và có thể dùng làm 2 nguyên liệu triệu hồi Link/Synchro.",
    "scientificLore": "Etan (C2H6) là hydrocarbon tiêu biểu trong chương trình Hóa học hữu cơ lớp 11 GDPT 2018 với phản ứng cháy tỏa năng lượng lớn.",
    "relatedEquation": "2C₂H₆ + 7O₂ → 4CO₂ + 6H₂O",
    "iupacName": "Ethane",
    "archetype": "HYDROCARBON_CHAIN",
    "structuredEffects": [
      {
        "effectId": "B05_EFF_74",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "SELF"
            }
          }
        ],
        "description": "Tăng 300 ATK phản ứng nối mạch hydrocarbon."
      }
    ]
  },
  {
    "id": "card_b05_075_propan_75",
    "name": "Propan — Kỵ Sĩ Vòng Thơm (C3H8 Đồng Đẳng 75)",
    "name_en": "Propane — Kỵ Sĩ Vòng Thơm Homolog 75",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "PYRO",
    "manaCost": 3,
    "level": 4,
    "atk": 1990,
    "def": 1730,
    "chemicalFormula": "C3H8",
    "effectCode": "ELEM_B05_PROPANE_CHAIN_75",
    "effectText": "Khi có quái thú Hydrocarbon khác trên sân: Tăng 300 ATK và có thể dùng làm 2 nguyên liệu triệu hồi Link/Synchro.",
    "scientificLore": "Propan (C3H8) là hydrocarbon tiêu biểu trong chương trình Hóa học hữu cơ lớp 11 GDPT 2018 với phản ứng cháy tỏa năng lượng lớn.",
    "relatedEquation": "C₃H₈ + 5O₂ → 3CO₂ + 4H₂O",
    "iupacName": "Propane",
    "archetype": "HYDROCARBON_CHAIN",
    "structuredEffects": [
      {
        "effectId": "B05_EFF_75",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "SELF"
            }
          }
        ],
        "description": "Tăng 300 ATK phản ứng nối mạch hydrocarbon."
      }
    ]
  },
  {
    "id": "card_b05_076_butan_76",
    "name": "Butan — Kỵ Sĩ Vòng Thơm (C4H10 Đồng Đẳng 76)",
    "name_en": "Butane — Kỵ Sĩ Vòng Thơm Homolog 76",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "PYRO",
    "manaCost": 4,
    "level": 5,
    "atk": 2000,
    "def": 1980,
    "chemicalFormula": "C4H10",
    "effectCode": "ELEM_B05_BUTANE_CHAIN_76",
    "effectText": "Khi có quái thú Hydrocarbon khác trên sân: Tăng 300 ATK và có thể dùng làm 2 nguyên liệu triệu hồi Link/Synchro.",
    "scientificLore": "Butan (C4H10) là hydrocarbon tiêu biểu trong chương trình Hóa học hữu cơ lớp 11 GDPT 2018 với phản ứng cháy tỏa năng lượng lớn.",
    "relatedEquation": "2C₄H₁₀ + 13O₂ → 8CO₂ + 10H₂O",
    "iupacName": "Butane",
    "archetype": "HYDROCARBON_CHAIN",
    "structuredEffects": [
      {
        "effectId": "B05_EFF_76",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "SELF"
            }
          }
        ],
        "description": "Tăng 300 ATK phản ứng nối mạch hydrocarbon."
      }
    ]
  },
  {
    "id": "card_b05_077_etylen_77",
    "name": "Etylen — Kỵ Sĩ Vòng Thơm (C2H4 Đồng Đẳng 77)",
    "name_en": "Ethylene — Kỵ Sĩ Vòng Thơm Homolog 77",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "ULTRA_RARE",
    "attribute": "AERO",
    "manaCost": 5,
    "level": 6,
    "atk": 2260,
    "def": 1990,
    "chemicalFormula": "C2H4",
    "effectCode": "ELEM_B05_ETHYLENE_CHAIN_77",
    "effectText": "Khi có quái thú Hydrocarbon khác trên sân: Tăng 300 ATK và có thể dùng làm 2 nguyên liệu triệu hồi Link/Synchro.",
    "scientificLore": "Etylen (C2H4) là hydrocarbon tiêu biểu trong chương trình Hóa học hữu cơ lớp 11 GDPT 2018 với phản ứng cháy tỏa năng lượng lớn.",
    "relatedEquation": "C₂H₄ + Br₂ → C₂H₄Br₂",
    "iupacName": "Ethylene",
    "archetype": "HYDROCARBON_CHAIN",
    "structuredEffects": [
      {
        "effectId": "B05_EFF_77",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "SELF"
            }
          }
        ],
        "description": "Tăng 300 ATK phản ứng nối mạch hydrocarbon."
      }
    ]
  },
  {
    "id": "card_b05_078_propylen_78",
    "name": "Propylen — Kỵ Sĩ Vòng Thơm (C3H6 Đồng Đẳng 78)",
    "name_en": "Propylene — Kỵ Sĩ Vòng Thơm Homolog 78",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SECRET_RARE",
    "attribute": "AERO",
    "manaCost": 5,
    "level": 7,
    "atk": 2520,
    "def": 2240,
    "chemicalFormula": "C3H6",
    "effectCode": "ELEM_B05_PROPYLENE_CHAIN_78",
    "effectText": "Khi có quái thú Hydrocarbon khác trên sân: Tăng 300 ATK và có thể dùng làm 2 nguyên liệu triệu hồi Link/Synchro.",
    "scientificLore": "Propylen (C3H6) là hydrocarbon tiêu biểu trong chương trình Hóa học hữu cơ lớp 11 GDPT 2018 với phản ứng cháy tỏa năng lượng lớn.",
    "relatedEquation": "C₃H₆ + H₂O → C₃H₇OH",
    "iupacName": "Propylene",
    "archetype": "HYDROCARBON_CHAIN",
    "structuredEffects": [
      {
        "effectId": "B05_EFF_78",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "SELF"
            }
          }
        ],
        "description": "Tăng 300 ATK phản ứng nối mạch hydrocarbon."
      }
    ]
  },
  {
    "id": "card_b05_079_axetylen_79",
    "name": "Axetylen — Kỵ Sĩ Vòng Thơm (C2H2 Đồng Đẳng 79)",
    "name_en": "Acetylene — Kỵ Sĩ Vòng Thơm Homolog 79",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "PYRO",
    "manaCost": 1,
    "level": 2,
    "atk": 1520,
    "def": 1350,
    "chemicalFormula": "C2H2",
    "effectCode": "ELEM_B05_ACETYLENE_CHAIN_79",
    "effectText": "Khi có quái thú Hydrocarbon khác trên sân: Tăng 300 ATK và có thể dùng làm 2 nguyên liệu triệu hồi Link/Synchro.",
    "scientificLore": "Axetylen (C2H2) là hydrocarbon tiêu biểu trong chương trình Hóa học hữu cơ lớp 11 GDPT 2018 với phản ứng cháy tỏa năng lượng lớn.",
    "relatedEquation": "2C₂H₂ + 5O₂ → 4CO₂ + 2H₂O",
    "iupacName": "Acetylene",
    "archetype": "HYDROCARBON_CHAIN",
    "structuredEffects": [
      {
        "effectId": "B05_EFF_79",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "SELF"
            }
          }
        ],
        "description": "Tăng 300 ATK phản ứng nối mạch hydrocarbon."
      }
    ]
  },
  {
    "id": "card_b05_080_butadien_80",
    "name": "Butadien — Kỵ Sĩ Vòng Thơm (C4H6 Đồng Đẳng 80)",
    "name_en": "Butadiene — Kỵ Sĩ Vòng Thơm Homolog 80",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "PYRO",
    "manaCost": 2,
    "level": 3,
    "atk": 1780,
    "def": 1600,
    "chemicalFormula": "C4H6",
    "effectCode": "ELEM_B05_BUTADIENE_CHAIN_80",
    "effectText": "Khi có quái thú Hydrocarbon khác trên sân: Tăng 300 ATK và có thể dùng làm 2 nguyên liệu triệu hồi Link/Synchro.",
    "scientificLore": "Butadien (C4H6) là hydrocarbon tiêu biểu trong chương trình Hóa học hữu cơ lớp 11 GDPT 2018 với phản ứng cháy tỏa năng lượng lớn.",
    "relatedEquation": "nC₄H₆ → (-CH₂-CH=CH-CH₂-)n",
    "iupacName": "Butadiene",
    "archetype": "HYDROCARBON_CHAIN",
    "structuredEffects": [
      {
        "effectId": "B05_EFF_80",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "SELF"
            }
          }
        ],
        "description": "Tăng 300 ATK phản ứng nối mạch hydrocarbon."
      }
    ]
  },
  {
    "id": "card_b05_081_benzen_81",
    "name": "Benzen — Kỵ Sĩ Vòng Thơm (C6H6 Đồng Đẳng 81)",
    "name_en": "Benzene — Kỵ Sĩ Vòng Thơm Homolog 81",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "TERRA",
    "manaCost": 3,
    "level": 4,
    "atk": 1790,
    "def": 1610,
    "chemicalFormula": "C6H6",
    "effectCode": "ELEM_B05_BENZENE_CHAIN_81",
    "effectText": "Hệ cộng hưởng electron π liên hợp: Giảm 400 sát thương chiến đấu nhận vào từ mỗi đòn tấn công.",
    "scientificLore": "Benzen (C6H6) là hydrocarbon tiêu biểu trong chương trình Hóa học hữu cơ lớp 11 GDPT 2018 với phản ứng cháy tỏa năng lượng lớn.",
    "relatedEquation": "C₆H₆ + Br₂ → C₆H₅Br + HBr",
    "iupacName": "Benzene",
    "archetype": "AROMATIC_RING",
    "structuredEffects": [
      {
        "effectId": "B05_EFF_81",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "SELF"
            }
          }
        ],
        "description": "Tăng 300 ATK phản ứng nối mạch hydrocarbon."
      }
    ]
  },
  {
    "id": "card_b05_082_toluen_82",
    "name": "Toluen — Kỵ Sĩ Vòng Thơm (C7H8 Đồng Đẳng 82)",
    "name_en": "Toluene — Kỵ Sĩ Vòng Thơm Homolog 82",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "TERRA",
    "manaCost": 4,
    "level": 5,
    "atk": 2050,
    "def": 1860,
    "chemicalFormula": "C7H8",
    "effectCode": "ELEM_B05_TOLUENE_CHAIN_82",
    "effectText": "Hệ cộng hưởng electron π liên hợp: Giảm 400 sát thương chiến đấu nhận vào từ mỗi đòn tấn công.",
    "scientificLore": "Toluen (C7H8) là hydrocarbon tiêu biểu trong chương trình Hóa học hữu cơ lớp 11 GDPT 2018 với phản ứng cháy tỏa năng lượng lớn.",
    "relatedEquation": "C₇H₈ + 3HNO₃ → TNT + 3H₂O",
    "iupacName": "Toluene",
    "archetype": "AROMATIC_RING",
    "structuredEffects": [
      {
        "effectId": "B05_EFF_82",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "SELF"
            }
          }
        ],
        "description": "Tăng 300 ATK phản ứng nối mạch hydrocarbon."
      }
    ]
  },
  {
    "id": "card_b05_083_naphtalen_83",
    "name": "Naphtalen — Kỵ Sĩ Vòng Thơm (C10H8 Đồng Đẳng 83)",
    "name_en": "Naphthalene — Kỵ Sĩ Vòng Thơm Homolog 83",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "TERRA",
    "manaCost": 5,
    "level": 6,
    "atk": 2310,
    "def": 2110,
    "chemicalFormula": "C10H8",
    "effectCode": "ELEM_B05_NAPHTHALENE_CHAIN_83",
    "effectText": "Hệ cộng hưởng electron π liên hợp: Giảm 400 sát thương chiến đấu nhận vào từ mỗi đòn tấn công.",
    "scientificLore": "Naphtalen (C10H8) là hydrocarbon tiêu biểu trong chương trình Hóa học hữu cơ lớp 11 GDPT 2018 với phản ứng cháy tỏa năng lượng lớn.",
    "relatedEquation": "C₁₀H₈ + 12O₂ → 10CO₂ + 4H₂O",
    "iupacName": "Naphthalene",
    "archetype": "AROMATIC_RING",
    "structuredEffects": [
      {
        "effectId": "B05_EFF_83",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "SELF"
            }
          }
        ],
        "description": "Tăng 300 ATK phản ứng nối mạch hydrocarbon."
      }
    ]
  },
  {
    "id": "card_b05_084_antraxen_84",
    "name": "Antraxen — Kỵ Sĩ Vòng Thơm (C14H10 Đồng Đẳng 84)",
    "name_en": "Anthracene — Kỵ Sĩ Vòng Thơm Homolog 84",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "TERRA",
    "manaCost": 5,
    "level": 7,
    "atk": 2570,
    "def": 2360,
    "chemicalFormula": "C14H10",
    "effectCode": "ELEM_B05_ANTHRACENE_CHAIN_84",
    "effectText": "Hệ cộng hưởng electron π liên hợp: Giảm 400 sát thương chiến đấu nhận vào từ mỗi đòn tấn công.",
    "scientificLore": "Antraxen (C14H10) là hydrocarbon tiêu biểu trong chương trình Hóa học hữu cơ lớp 11 GDPT 2018 với phản ứng cháy tỏa năng lượng lớn.",
    "relatedEquation": "C₁₄H₁₀ + 16.5O₂ → 14CO₂ + 5H₂O",
    "iupacName": "Anthracene",
    "archetype": "AROMATIC_RING",
    "structuredEffects": [
      {
        "effectId": "B05_EFF_84",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "SELF"
            }
          }
        ],
        "description": "Tăng 300 ATK phản ứng nối mạch hydrocarbon."
      }
    ]
  },
  {
    "id": "card_b05_085_metan_85",
    "name": "Metan — Xúc Tác Trùng Hợp (CH4 Đồng Đẳng 85)",
    "name_en": "Methane — Xúc Tác Trùng Hợp Homolog 85",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "AERO",
    "manaCost": 1,
    "level": 2,
    "atk": 1570,
    "def": 1230,
    "chemicalFormula": "CH4",
    "effectCode": "ELEM_B05_METHANE_CHAIN_85",
    "effectText": "Khi có quái thú Hydrocarbon khác trên sân: Tăng 300 ATK và có thể dùng làm 2 nguyên liệu triệu hồi Link/Synchro.",
    "scientificLore": "Metan (CH4) là hydrocarbon tiêu biểu trong chương trình Hóa học hữu cơ lớp 11 GDPT 2018 với phản ứng cháy tỏa năng lượng lớn.",
    "relatedEquation": "CH₄ + 2O₂ → CO₂ + 2H₂O",
    "iupacName": "Methane",
    "archetype": "HYDROCARBON_CHAIN",
    "structuredEffects": [
      {
        "effectId": "B05_EFF_85",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "SELF"
            }
          }
        ],
        "description": "Tăng 300 ATK phản ứng nối mạch hydrocarbon."
      }
    ]
  },
  {
    "id": "card_b05_086_etan_86",
    "name": "Etan — Xúc Tác Trùng Hợp (C2H6 Đồng Đẳng 86)",
    "name_en": "Ethane — Xúc Tác Trùng Hợp Homolog 86",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "ULTRA_RARE",
    "attribute": "AERO",
    "manaCost": 2,
    "level": 3,
    "atk": 1580,
    "def": 1480,
    "chemicalFormula": "C2H6",
    "effectCode": "ELEM_B05_ETHANE_CHAIN_86",
    "effectText": "Khi có quái thú Hydrocarbon khác trên sân: Tăng 300 ATK và có thể dùng làm 2 nguyên liệu triệu hồi Link/Synchro.",
    "scientificLore": "Etan (C2H6) là hydrocarbon tiêu biểu trong chương trình Hóa học hữu cơ lớp 11 GDPT 2018 với phản ứng cháy tỏa năng lượng lớn.",
    "relatedEquation": "2C₂H₆ + 7O₂ → 4CO₂ + 6H₂O",
    "iupacName": "Ethane",
    "archetype": "HYDROCARBON_CHAIN",
    "structuredEffects": [
      {
        "effectId": "B05_EFF_86",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "SELF"
            }
          }
        ],
        "description": "Tăng 300 ATK phản ứng nối mạch hydrocarbon."
      }
    ]
  },
  {
    "id": "card_b05_087_propan_87",
    "name": "Propan — Xúc Tác Trùng Hợp (C3H8 Đồng Đẳng 87)",
    "name_en": "Propane — Xúc Tác Trùng Hợp Homolog 87",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SECRET_RARE",
    "attribute": "PYRO",
    "manaCost": 3,
    "level": 4,
    "atk": 1840,
    "def": 1730,
    "chemicalFormula": "C3H8",
    "effectCode": "ELEM_B05_PROPANE_CHAIN_87",
    "effectText": "Khi có quái thú Hydrocarbon khác trên sân: Tăng 300 ATK và có thể dùng làm 2 nguyên liệu triệu hồi Link/Synchro.",
    "scientificLore": "Propan (C3H8) là hydrocarbon tiêu biểu trong chương trình Hóa học hữu cơ lớp 11 GDPT 2018 với phản ứng cháy tỏa năng lượng lớn.",
    "relatedEquation": "C₃H₈ + 5O₂ → 3CO₂ + 4H₂O",
    "iupacName": "Propane",
    "archetype": "HYDROCARBON_CHAIN",
    "structuredEffects": [
      {
        "effectId": "B05_EFF_87",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "SELF"
            }
          }
        ],
        "description": "Tăng 300 ATK phản ứng nối mạch hydrocarbon."
      }
    ]
  },
  {
    "id": "card_b05_088_butan_88",
    "name": "Butan — Xúc Tác Trùng Hợp (C4H10 Đồng Đẳng 88)",
    "name_en": "Butane — Xúc Tác Trùng Hợp Homolog 88",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "PYRO",
    "manaCost": 4,
    "level": 5,
    "atk": 2100,
    "def": 1980,
    "chemicalFormula": "C4H10",
    "effectCode": "ELEM_B05_BUTANE_CHAIN_88",
    "effectText": "Khi có quái thú Hydrocarbon khác trên sân: Tăng 300 ATK và có thể dùng làm 2 nguyên liệu triệu hồi Link/Synchro.",
    "scientificLore": "Butan (C4H10) là hydrocarbon tiêu biểu trong chương trình Hóa học hữu cơ lớp 11 GDPT 2018 với phản ứng cháy tỏa năng lượng lớn.",
    "relatedEquation": "2C₄H₁₀ + 13O₂ → 8CO₂ + 10H₂O",
    "iupacName": "Butane",
    "archetype": "HYDROCARBON_CHAIN",
    "structuredEffects": [
      {
        "effectId": "B05_EFF_88",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "SELF"
            }
          }
        ],
        "description": "Tăng 300 ATK phản ứng nối mạch hydrocarbon."
      }
    ]
  },
  {
    "id": "card_b05_089_etylen_89",
    "name": "Etylen — Xúc Tác Trùng Hợp (C2H4 Đồng Đẳng 89)",
    "name_en": "Ethylene — Xúc Tác Trùng Hợp Homolog 89",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "AERO",
    "manaCost": 5,
    "level": 6,
    "atk": 2360,
    "def": 1990,
    "chemicalFormula": "C2H4",
    "effectCode": "ELEM_B05_ETHYLENE_CHAIN_89",
    "effectText": "Khi có quái thú Hydrocarbon khác trên sân: Tăng 300 ATK và có thể dùng làm 2 nguyên liệu triệu hồi Link/Synchro.",
    "scientificLore": "Etylen (C2H4) là hydrocarbon tiêu biểu trong chương trình Hóa học hữu cơ lớp 11 GDPT 2018 với phản ứng cháy tỏa năng lượng lớn.",
    "relatedEquation": "C₂H₄ + Br₂ → C₂H₄Br₂",
    "iupacName": "Ethylene",
    "archetype": "HYDROCARBON_CHAIN",
    "structuredEffects": [
      {
        "effectId": "B05_EFF_89",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "SELF"
            }
          }
        ],
        "description": "Tăng 300 ATK phản ứng nối mạch hydrocarbon."
      }
    ]
  },
  {
    "id": "card_b05_090_propylen_90",
    "name": "Propylen — Xúc Tác Trùng Hợp (C3H6 Đồng Đẳng 90)",
    "name_en": "Propylene — Xúc Tác Trùng Hợp Homolog 90",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "AERO",
    "manaCost": 5,
    "level": 7,
    "atk": 2620,
    "def": 2240,
    "chemicalFormula": "C3H6",
    "effectCode": "ELEM_B05_PROPYLENE_CHAIN_90",
    "effectText": "Khi có quái thú Hydrocarbon khác trên sân: Tăng 300 ATK và có thể dùng làm 2 nguyên liệu triệu hồi Link/Synchro.",
    "scientificLore": "Propylen (C3H6) là hydrocarbon tiêu biểu trong chương trình Hóa học hữu cơ lớp 11 GDPT 2018 với phản ứng cháy tỏa năng lượng lớn.",
    "relatedEquation": "C₃H₆ + H₂O → C₃H₇OH",
    "iupacName": "Propylene",
    "archetype": "HYDROCARBON_CHAIN",
    "structuredEffects": [
      {
        "effectId": "B05_EFF_90",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "SELF"
            }
          }
        ],
        "description": "Tăng 300 ATK phản ứng nối mạch hydrocarbon."
      }
    ]
  },
  {
    "id": "card_b05_091_axetylen_91",
    "name": "Axetylen — Xúc Tác Trùng Hợp (C2H2 Đồng Đẳng 91)",
    "name_en": "Acetylene — Xúc Tác Trùng Hợp Homolog 91",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "PYRO",
    "manaCost": 1,
    "level": 2,
    "atk": 1370,
    "def": 1350,
    "chemicalFormula": "C2H2",
    "effectCode": "ELEM_B05_ACETYLENE_CHAIN_91",
    "effectText": "Khi có quái thú Hydrocarbon khác trên sân: Tăng 300 ATK và có thể dùng làm 2 nguyên liệu triệu hồi Link/Synchro.",
    "scientificLore": "Axetylen (C2H2) là hydrocarbon tiêu biểu trong chương trình Hóa học hữu cơ lớp 11 GDPT 2018 với phản ứng cháy tỏa năng lượng lớn.",
    "relatedEquation": "2C₂H₂ + 5O₂ → 4CO₂ + 2H₂O",
    "iupacName": "Acetylene",
    "archetype": "HYDROCARBON_CHAIN",
    "structuredEffects": [
      {
        "effectId": "B05_EFF_91",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "SELF"
            }
          }
        ],
        "description": "Tăng 300 ATK phản ứng nối mạch hydrocarbon."
      }
    ]
  },
  {
    "id": "card_b05_092_butadien_92",
    "name": "Butadien — Xúc Tác Trùng Hợp (C4H6 Đồng Đẳng 92)",
    "name_en": "Butadiene — Xúc Tác Trùng Hợp Homolog 92",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "PYRO",
    "manaCost": 2,
    "level": 3,
    "atk": 1630,
    "def": 1600,
    "chemicalFormula": "C4H6",
    "effectCode": "ELEM_B05_BUTADIENE_CHAIN_92",
    "effectText": "Khi có quái thú Hydrocarbon khác trên sân: Tăng 300 ATK và có thể dùng làm 2 nguyên liệu triệu hồi Link/Synchro.",
    "scientificLore": "Butadien (C4H6) là hydrocarbon tiêu biểu trong chương trình Hóa học hữu cơ lớp 11 GDPT 2018 với phản ứng cháy tỏa năng lượng lớn.",
    "relatedEquation": "nC₄H₆ → (-CH₂-CH=CH-CH₂-)n",
    "iupacName": "Butadiene",
    "archetype": "HYDROCARBON_CHAIN",
    "structuredEffects": [
      {
        "effectId": "B05_EFF_92",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "SELF"
            }
          }
        ],
        "description": "Tăng 300 ATK phản ứng nối mạch hydrocarbon."
      }
    ]
  },
  {
    "id": "card_b05_093_benzen_93",
    "name": "Benzen — Xúc Tác Trùng Hợp (C6H6 Đồng Đẳng 93)",
    "name_en": "Benzene — Xúc Tác Trùng Hợp Homolog 93",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "TERRA",
    "manaCost": 3,
    "level": 4,
    "atk": 1890,
    "def": 1610,
    "chemicalFormula": "C6H6",
    "effectCode": "ELEM_B05_BENZENE_CHAIN_93",
    "effectText": "Hệ cộng hưởng electron π liên hợp: Giảm 400 sát thương chiến đấu nhận vào từ mỗi đòn tấn công.",
    "scientificLore": "Benzen (C6H6) là hydrocarbon tiêu biểu trong chương trình Hóa học hữu cơ lớp 11 GDPT 2018 với phản ứng cháy tỏa năng lượng lớn.",
    "relatedEquation": "C₆H₆ + Br₂ → C₆H₅Br + HBr",
    "iupacName": "Benzene",
    "archetype": "AROMATIC_RING",
    "structuredEffects": [
      {
        "effectId": "B05_EFF_93",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "SELF"
            }
          }
        ],
        "description": "Tăng 300 ATK phản ứng nối mạch hydrocarbon."
      }
    ]
  },
  {
    "id": "card_b05_094_toluen_94",
    "name": "Toluen — Xúc Tác Trùng Hợp (C7H8 Đồng Đẳng 94)",
    "name_en": "Toluene — Xúc Tác Trùng Hợp Homolog 94",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "TERRA",
    "manaCost": 4,
    "level": 5,
    "atk": 2150,
    "def": 1860,
    "chemicalFormula": "C7H8",
    "effectCode": "ELEM_B05_TOLUENE_CHAIN_94",
    "effectText": "Hệ cộng hưởng electron π liên hợp: Giảm 400 sát thương chiến đấu nhận vào từ mỗi đòn tấn công.",
    "scientificLore": "Toluen (C7H8) là hydrocarbon tiêu biểu trong chương trình Hóa học hữu cơ lớp 11 GDPT 2018 với phản ứng cháy tỏa năng lượng lớn.",
    "relatedEquation": "C₇H₈ + 3HNO₃ → TNT + 3H₂O",
    "iupacName": "Toluene",
    "archetype": "AROMATIC_RING",
    "structuredEffects": [
      {
        "effectId": "B05_EFF_94",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "SELF"
            }
          }
        ],
        "description": "Tăng 300 ATK phản ứng nối mạch hydrocarbon."
      }
    ]
  },
  {
    "id": "card_b05_095_naphtalen_95",
    "name": "Naphtalen — Xúc Tác Trùng Hợp (C10H8 Đồng Đẳng 95)",
    "name_en": "Naphthalene — Xúc Tác Trùng Hợp Homolog 95",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "ULTRA_RARE",
    "attribute": "TERRA",
    "manaCost": 5,
    "level": 6,
    "atk": 2410,
    "def": 2110,
    "chemicalFormula": "C10H8",
    "effectCode": "ELEM_B05_NAPHTHALENE_CHAIN_95",
    "effectText": "Hệ cộng hưởng electron π liên hợp: Giảm 400 sát thương chiến đấu nhận vào từ mỗi đòn tấn công.",
    "scientificLore": "Naphtalen (C10H8) là hydrocarbon tiêu biểu trong chương trình Hóa học hữu cơ lớp 11 GDPT 2018 với phản ứng cháy tỏa năng lượng lớn.",
    "relatedEquation": "C₁₀H₈ + 12O₂ → 10CO₂ + 4H₂O",
    "iupacName": "Naphthalene",
    "archetype": "AROMATIC_RING",
    "structuredEffects": [
      {
        "effectId": "B05_EFF_95",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "SELF"
            }
          }
        ],
        "description": "Tăng 300 ATK phản ứng nối mạch hydrocarbon."
      }
    ]
  },
  {
    "id": "card_b05_096_antraxen_96",
    "name": "Antraxen — Xúc Tác Trùng Hợp (C14H10 Đồng Đẳng 96)",
    "name_en": "Anthracene — Xúc Tác Trùng Hợp Homolog 96",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SECRET_RARE",
    "attribute": "TERRA",
    "manaCost": 5,
    "level": 7,
    "atk": 2420,
    "def": 2360,
    "chemicalFormula": "C14H10",
    "effectCode": "ELEM_B05_ANTHRACENE_CHAIN_96",
    "effectText": "Hệ cộng hưởng electron π liên hợp: Giảm 400 sát thương chiến đấu nhận vào từ mỗi đòn tấn công.",
    "scientificLore": "Antraxen (C14H10) là hydrocarbon tiêu biểu trong chương trình Hóa học hữu cơ lớp 11 GDPT 2018 với phản ứng cháy tỏa năng lượng lớn.",
    "relatedEquation": "C₁₄H₁₀ + 16.5O₂ → 14CO₂ + 5H₂O",
    "iupacName": "Anthracene",
    "archetype": "AROMATIC_RING",
    "structuredEffects": [
      {
        "effectId": "B05_EFF_96",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "SELF"
            }
          }
        ],
        "description": "Tăng 300 ATK phản ứng nối mạch hydrocarbon."
      }
    ]
  },
  {
    "id": "card_b05_097_metan_97",
    "name": "Metan — Lính Tiên Phong Carbon (CH4 Đồng Đẳng 97)",
    "name_en": "Methane — Lính Tiên Phong Carbon Homolog 97",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "AERO",
    "manaCost": 1,
    "level": 2,
    "atk": 1420,
    "def": 1230,
    "chemicalFormula": "CH4",
    "effectCode": "ELEM_B05_METHANE_CHAIN_97",
    "effectText": "Khi có quái thú Hydrocarbon khác trên sân: Tăng 300 ATK và có thể dùng làm 2 nguyên liệu triệu hồi Link/Synchro.",
    "scientificLore": "Metan (CH4) là hydrocarbon tiêu biểu trong chương trình Hóa học hữu cơ lớp 11 GDPT 2018 với phản ứng cháy tỏa năng lượng lớn.",
    "relatedEquation": "CH₄ + 2O₂ → CO₂ + 2H₂O",
    "iupacName": "Methane",
    "archetype": "HYDROCARBON_CHAIN",
    "structuredEffects": [
      {
        "effectId": "B05_EFF_97",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "SELF"
            }
          }
        ],
        "description": "Tăng 300 ATK phản ứng nối mạch hydrocarbon."
      }
    ]
  },
  {
    "id": "card_b05_098_etan_98",
    "name": "Etan — Lính Tiên Phong Carbon (C2H6 Đồng Đẳng 98)",
    "name_en": "Ethane — Lính Tiên Phong Carbon Homolog 98",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "AERO",
    "manaCost": 2,
    "level": 3,
    "atk": 1680,
    "def": 1480,
    "chemicalFormula": "C2H6",
    "effectCode": "ELEM_B05_ETHANE_CHAIN_98",
    "effectText": "Khi có quái thú Hydrocarbon khác trên sân: Tăng 300 ATK và có thể dùng làm 2 nguyên liệu triệu hồi Link/Synchro.",
    "scientificLore": "Etan (C2H6) là hydrocarbon tiêu biểu trong chương trình Hóa học hữu cơ lớp 11 GDPT 2018 với phản ứng cháy tỏa năng lượng lớn.",
    "relatedEquation": "2C₂H₆ + 7O₂ → 4CO₂ + 6H₂O",
    "iupacName": "Ethane",
    "archetype": "HYDROCARBON_CHAIN",
    "structuredEffects": [
      {
        "effectId": "B05_EFF_98",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "SELF"
            }
          }
        ],
        "description": "Tăng 300 ATK phản ứng nối mạch hydrocarbon."
      }
    ]
  },
  {
    "id": "card_b05_099_propan_99",
    "name": "Propan — Lính Tiên Phong Carbon (C3H8 Đồng Đẳng 99)",
    "name_en": "Propane — Lính Tiên Phong Carbon Homolog 99",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "PYRO",
    "manaCost": 3,
    "level": 4,
    "atk": 1940,
    "def": 1730,
    "chemicalFormula": "C3H8",
    "effectCode": "ELEM_B05_PROPANE_CHAIN_99",
    "effectText": "Khi có quái thú Hydrocarbon khác trên sân: Tăng 300 ATK và có thể dùng làm 2 nguyên liệu triệu hồi Link/Synchro.",
    "scientificLore": "Propan (C3H8) là hydrocarbon tiêu biểu trong chương trình Hóa học hữu cơ lớp 11 GDPT 2018 với phản ứng cháy tỏa năng lượng lớn.",
    "relatedEquation": "C₃H₈ + 5O₂ → 3CO₂ + 4H₂O",
    "iupacName": "Propane",
    "archetype": "HYDROCARBON_CHAIN",
    "structuredEffects": [
      {
        "effectId": "B05_EFF_99",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "SELF"
            }
          }
        ],
        "description": "Tăng 300 ATK phản ứng nối mạch hydrocarbon."
      }
    ]
  },
  {
    "id": "card_b05_100_butan_100",
    "name": "Butan — Lính Tiên Phong Carbon (C4H10 Đồng Đẳng 100)",
    "name_en": "Butane — Lính Tiên Phong Carbon Homolog 100",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "PYRO",
    "manaCost": 4,
    "level": 5,
    "atk": 2200,
    "def": 1980,
    "chemicalFormula": "C4H10",
    "effectCode": "ELEM_B05_BUTANE_CHAIN_100",
    "effectText": "Khi có quái thú Hydrocarbon khác trên sân: Tăng 300 ATK và có thể dùng làm 2 nguyên liệu triệu hồi Link/Synchro.",
    "scientificLore": "Butan (C4H10) là hydrocarbon tiêu biểu trong chương trình Hóa học hữu cơ lớp 11 GDPT 2018 với phản ứng cháy tỏa năng lượng lớn.",
    "relatedEquation": "2C₄H₁₀ + 13O₂ → 8CO₂ + 10H₂O",
    "iupacName": "Butane",
    "archetype": "HYDROCARBON_CHAIN",
    "structuredEffects": [
      {
        "effectId": "B05_EFF_100",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "SELF"
            }
          }
        ],
        "description": "Tăng 300 ATK phản ứng nối mạch hydrocarbon."
      }
    ]
  }
];
