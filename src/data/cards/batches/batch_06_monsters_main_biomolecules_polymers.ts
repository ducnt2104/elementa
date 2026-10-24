// src/data/cards/batches/batch_06_monsters_main_biomolecules_polymers.ts
// Batch 06: Biomolecule & Polymer Monsters (100 cards)
// Automatically generated and validated for ELEMENTA Tactical TCG

import { PlayableCardDef } from '../../../domain/cardGameTypes';

export const BATCH_06_CARDS: PlayableCardDef[] = [
  {
    "id": "card_b06_001_glycine_1",
    "name": "Glyxin — Hạt Nhân Sự Sống (Cấu Trúc 1)",
    "name_en": "Glycine — Hạt Nhân Sự Sống Isolate 1",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "TERRA",
    "manaCost": 1,
    "level": 2,
    "atk": 1340,
    "def": 1460,
    "chemicalFormula": "C2H5NO2",
    "effectCode": "ELEM_B06_GLYCINE_VITAL_1",
    "effectText": "Khi có mặt trên sân: Hồi phục 300 LP cho người chơi sau mỗi lượt kết thúc (cân bằng nội môi).",
    "scientificLore": "Glyxin (C2H5NO2) là hợp chất sinh học / polymer quan trọng trong chương trình Hóa học 12 GDPT 2018 với khả năng tạo liên kết hydro và chuỗi mạch bền vững.",
    "relatedEquation": "H₂N-CH₂-COOH ⇌ H₃N⁺-CH₂-COO⁻",
    "iupacName": "Glycine",
    "archetype": "BIOMOLECULE_VITAL",
    "structuredEffects": [
      {
        "effectId": "B06_EFF_1",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "HEAL_LP",
            "params": {
              "amount": 400
            }
          }
        ],
        "description": "Hồi 400 LP dinh dưỡng sinh học."
      }
    ]
  },
  {
    "id": "card_b06_002_alanine_2",
    "name": "Alanin — Hạt Nhân Sự Sống (Cấu Trúc 2)",
    "name_en": "Alanine — Hạt Nhân Sự Sống Isolate 2",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "TERRA",
    "manaCost": 2,
    "level": 3,
    "atk": 1610,
    "def": 1750,
    "chemicalFormula": "C3H7NO2",
    "effectCode": "ELEM_B06_ALANINE_VITAL_2",
    "effectText": "Khi có mặt trên sân: Hồi phục 300 LP cho người chơi sau mỗi lượt kết thúc (cân bằng nội môi).",
    "scientificLore": "Alanin (C3H7NO2) là hợp chất sinh học / polymer quan trọng trong chương trình Hóa học 12 GDPT 2018 với khả năng tạo liên kết hydro và chuỗi mạch bền vững.",
    "relatedEquation": "CH₃-CH(NH₂)-COOH ⇌ CH₃-CH(NH₃⁺)-COO⁻",
    "iupacName": "Alanine",
    "archetype": "BIOMOLECULE_VITAL",
    "structuredEffects": [
      {
        "effectId": "B06_EFF_2",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "HEAL_LP",
            "params": {
              "amount": 400
            }
          }
        ],
        "description": "Hồi 400 LP dinh dưỡng sinh học."
      }
    ]
  },
  {
    "id": "card_b06_003_valine_3",
    "name": "Valin — Hạt Nhân Sự Sống (Cấu Trúc 3)",
    "name_en": "Valine — Hạt Nhân Sự Sống Isolate 3",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "TERRA",
    "manaCost": 3,
    "level": 4,
    "atk": 1880,
    "def": 2040,
    "chemicalFormula": "C5H11NO2",
    "effectCode": "ELEM_B06_VALINE_VITAL_3",
    "effectText": "Khi có mặt trên sân: Hồi phục 300 LP cho người chơi sau mỗi lượt kết thúc (cân bằng nội môi).",
    "scientificLore": "Valin (C5H11NO2) là hợp chất sinh học / polymer quan trọng trong chương trình Hóa học 12 GDPT 2018 với khả năng tạo liên kết hydro và chuỗi mạch bền vững.",
    "relatedEquation": "(CH₃)₂CH-CH(NH₂)-COOH",
    "iupacName": "Valine",
    "archetype": "BIOMOLECULE_VITAL",
    "structuredEffects": [
      {
        "effectId": "B06_EFF_3",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "HEAL_LP",
            "params": {
              "amount": 400
            }
          }
        ],
        "description": "Hồi 400 LP dinh dưỡng sinh học."
      }
    ]
  },
  {
    "id": "card_b06_004_glutamic_acid_4",
    "name": "Axit Glutamic — Hạt Nhân Sự Sống (Cấu Trúc 4)",
    "name_en": "Glutamic Acid — Hạt Nhân Sự Sống Isolate 4",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "ACID_DARK",
    "manaCost": 4,
    "level": 5,
    "atk": 2150,
    "def": 2330,
    "chemicalFormula": "C5H9NO4",
    "effectCode": "ELEM_B06_GLUTAMIC_ACID_VITAL_4",
    "effectText": "Khi có mặt trên sân: Hồi phục 300 LP cho người chơi sau mỗi lượt kết thúc (cân bằng nội môi).",
    "scientificLore": "Axit Glutamic (C5H9NO4) là hợp chất sinh học / polymer quan trọng trong chương trình Hóa học 12 GDPT 2018 với khả năng tạo liên kết hydro và chuỗi mạch bền vững.",
    "relatedEquation": "HOOC-(CH₂)₂-CH(NH₂)-COOH",
    "iupacName": "Glutamic Acid",
    "archetype": "BIOMOLECULE_VITAL",
    "structuredEffects": [
      {
        "effectId": "B06_EFF_4",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "HEAL_LP",
            "params": {
              "amount": 400
            }
          }
        ],
        "description": "Hồi 400 LP dinh dưỡng sinh học."
      }
    ]
  },
  {
    "id": "card_b06_005_lysine_5",
    "name": "Lysin — Hạt Nhân Sự Sống (Cấu Trúc 5)",
    "name_en": "Lysine — Hạt Nhân Sự Sống Isolate 5",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "AQUA",
    "manaCost": 5,
    "level": 6,
    "atk": 2420,
    "def": 2380,
    "chemicalFormula": "C6H14N2O2",
    "effectCode": "ELEM_B06_LYSINE_VITAL_5",
    "effectText": "Khi có mặt trên sân: Hồi phục 300 LP cho người chơi sau mỗi lượt kết thúc (cân bằng nội môi).",
    "scientificLore": "Lysin (C6H14N2O2) là hợp chất sinh học / polymer quan trọng trong chương trình Hóa học 12 GDPT 2018 với khả năng tạo liên kết hydro và chuỗi mạch bền vững.",
    "relatedEquation": "H₂N-(CH₂)₄-CH(NH₂)-COOH",
    "iupacName": "Lysine",
    "archetype": "BIOMOLECULE_VITAL",
    "structuredEffects": [
      {
        "effectId": "B06_EFF_5",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "HEAL_LP",
            "params": {
              "amount": 400
            }
          }
        ],
        "description": "Hồi 400 LP dinh dưỡng sinh học."
      }
    ]
  },
  {
    "id": "card_b06_006_glucose_6",
    "name": "Glucozo — Hạt Nhân Sự Sống (Cấu Trúc 6)",
    "name_en": "Glucose — Hạt Nhân Sự Sống Isolate 6",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "ULTRA_RARE",
    "attribute": "PYRO",
    "manaCost": 5,
    "level": 7,
    "atk": 2440,
    "def": 2670,
    "chemicalFormula": "C6H12O6",
    "effectCode": "ELEM_B06_GLUCOSE_VITAL_6",
    "effectText": "Khi có mặt trên sân: Hồi phục 300 LP cho người chơi sau mỗi lượt kết thúc (cân bằng nội môi).",
    "scientificLore": "Glucozo (C6H12O6) là hợp chất sinh học / polymer quan trọng trong chương trình Hóa học 12 GDPT 2018 với khả năng tạo liên kết hydro và chuỗi mạch bền vững.",
    "relatedEquation": "C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O",
    "iupacName": "Glucose",
    "archetype": "BIOMOLECULE_VITAL",
    "structuredEffects": [
      {
        "effectId": "B06_EFF_6",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "HEAL_LP",
            "params": {
              "amount": 400
            }
          }
        ],
        "description": "Hồi 400 LP dinh dưỡng sinh học."
      }
    ]
  },
  {
    "id": "card_b06_007_fructose_7",
    "name": "Fructozo — Hạt Nhân Sự Sống (Cấu Trúc 7)",
    "name_en": "Fructose — Hạt Nhân Sự Sống Isolate 7",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SECRET_RARE",
    "attribute": "PYRO",
    "manaCost": 1,
    "level": 2,
    "atk": 1390,
    "def": 1580,
    "chemicalFormula": "C6H12O6",
    "effectCode": "ELEM_B06_FRUCTOSE_VITAL_7",
    "effectText": "Khi có mặt trên sân: Hồi phục 300 LP cho người chơi sau mỗi lượt kết thúc (cân bằng nội môi).",
    "scientificLore": "Fructozo (C6H12O6) là hợp chất sinh học / polymer quan trọng trong chương trình Hóa học 12 GDPT 2018 với khả năng tạo liên kết hydro và chuỗi mạch bền vững.",
    "relatedEquation": "C₆H₁₂O₆ (Ketohexose Isomer)",
    "iupacName": "Fructose",
    "archetype": "BIOMOLECULE_VITAL",
    "structuredEffects": [
      {
        "effectId": "B06_EFF_7",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "HEAL_LP",
            "params": {
              "amount": 400
            }
          }
        ],
        "description": "Hồi 400 LP dinh dưỡng sinh học."
      }
    ]
  },
  {
    "id": "card_b06_008_sucrose_8",
    "name": "Saccarozo — Hạt Nhân Sự Sống (Cấu Trúc 8)",
    "name_en": "Sucrose — Hạt Nhân Sự Sống Isolate 8",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "TERRA",
    "manaCost": 2,
    "level": 3,
    "atk": 1660,
    "def": 1870,
    "chemicalFormula": "C12H22O11",
    "effectCode": "ELEM_B06_SUCROSE_VITAL_8",
    "effectText": "Khi có mặt trên sân: Hồi phục 300 LP cho người chơi sau mỗi lượt kết thúc (cân bằng nội môi).",
    "scientificLore": "Saccarozo (C12H22O11) là hợp chất sinh học / polymer quan trọng trong chương trình Hóa học 12 GDPT 2018 với khả năng tạo liên kết hydro và chuỗi mạch bền vững.",
    "relatedEquation": "C₁₂H₂₂O₁₁ + H₂O → C₆H₁₂O₆ + C₆H₁₂O₆",
    "iupacName": "Sucrose",
    "archetype": "BIOMOLECULE_VITAL",
    "structuredEffects": [
      {
        "effectId": "B06_EFF_8",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "HEAL_LP",
            "params": {
              "amount": 400
            }
          }
        ],
        "description": "Hồi 400 LP dinh dưỡng sinh học."
      }
    ]
  },
  {
    "id": "card_b06_009_polyethylene_9",
    "name": "Polyetylen — Hạt Nhân Sự Sống (Cấu Trúc 9)",
    "name_en": "Polyethylene — Hạt Nhân Sự Sống Isolate 9",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "TERRA",
    "manaCost": 3,
    "level": 4,
    "atk": 1930,
    "def": 1920,
    "chemicalFormula": "(-C2H4-)n",
    "effectCode": "ELEM_B06_POLYETHYLENE_VITAL_9",
    "effectText": "Liên kết chuỗi polymer cực đại: Không thể bị phá hủy bởi đòn tấn công đầu tiên trong mỗi lượt.",
    "scientificLore": "Polyetylen ((-C2H4-)n) là hợp chất sinh học / polymer quan trọng trong chương trình Hóa học 12 GDPT 2018 với khả năng tạo liên kết hydro và chuỗi mạch bền vững.",
    "relatedEquation": "nCH₂=CH₂ → (-CH₂-CH₂-)n",
    "iupacName": "Polyethylene",
    "archetype": "MACROMOLECULAR_POLYMER",
    "structuredEffects": [
      {
        "effectId": "B06_EFF_9",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "APPLY_STATUS",
            "params": {
              "statusType": "PASSIVATION"
            }
          }
        ],
        "description": "Bảo vệ màng polymer bền cơ học."
      }
    ]
  },
  {
    "id": "card_b06_010_polytetrafluoroethylene_10",
    "name": "Teflon — Hạt Nhân Sự Sống (Cấu Trúc 10)",
    "name_en": "Polytetrafluoroethylene — Hạt Nhân Sự Sống Isolate 10",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "NOBLE_VOID",
    "manaCost": 4,
    "level": 5,
    "atk": 2200,
    "def": 2210,
    "chemicalFormula": "(-C2F4-)n",
    "effectCode": "ELEM_B06_POLYTETRAFLUOROETHYLENE_VITAL_10",
    "effectText": "Liên kết chuỗi polymer cực đại: Không thể bị phá hủy bởi đòn tấn công đầu tiên trong mỗi lượt.",
    "scientificLore": "Teflon ((-C2F4-)n) là hợp chất sinh học / polymer quan trọng trong chương trình Hóa học 12 GDPT 2018 với khả năng tạo liên kết hydro và chuỗi mạch bền vững.",
    "relatedEquation": "nCF₂=CF₂ → (-CF₂-CF₂-)n",
    "iupacName": "Polytetrafluoroethylene",
    "archetype": "MACROMOLECULAR_POLYMER",
    "structuredEffects": [
      {
        "effectId": "B06_EFF_10",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "APPLY_STATUS",
            "params": {
              "statusType": "PASSIVATION"
            }
          }
        ],
        "description": "Bảo vệ màng polymer bền cơ học."
      }
    ]
  },
  {
    "id": "card_b06_011_nylon_66_11",
    "name": "Nylon-6,6 — Hạt Nhân Sự Sống (Cấu Trúc 11)",
    "name_en": "Nylon 66 — Hạt Nhân Sự Sống Isolate 11",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "TERRA",
    "manaCost": 5,
    "level": 6,
    "atk": 2220,
    "def": 2500,
    "chemicalFormula": "C12H22N2O2",
    "effectCode": "ELEM_B06_NYLON_66_VITAL_11",
    "effectText": "Liên kết chuỗi polymer cực đại: Không thể bị phá hủy bởi đòn tấn công đầu tiên trong mỗi lượt.",
    "scientificLore": "Nylon-6,6 (C12H22N2O2) là hợp chất sinh học / polymer quan trọng trong chương trình Hóa học 12 GDPT 2018 với khả năng tạo liên kết hydro và chuỗi mạch bền vững.",
    "relatedEquation": "nHexamethylenediamine + nAdipic Acid → Nylon-6,6 + 2nH₂O",
    "iupacName": "Nylon 66",
    "archetype": "MACROMOLECULAR_POLYMER",
    "structuredEffects": [
      {
        "effectId": "B06_EFF_11",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "APPLY_STATUS",
            "params": {
              "statusType": "PASSIVATION"
            }
          }
        ],
        "description": "Bảo vệ màng polymer bền cơ học."
      }
    ]
  },
  {
    "id": "card_b06_012_poly_paraphenylene_terephthalamide_12",
    "name": "Kevlar — Hạt Nhân Sự Sống (Cấu Trúc 12)",
    "name_en": "Poly-paraphenylene terephthalamide — Hạt Nhân Sự Sống Isolate 12",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "NOBLE_VOID",
    "manaCost": 5,
    "level": 7,
    "atk": 2490,
    "def": 2790,
    "chemicalFormula": "(-C14H10N2O2-)n",
    "effectCode": "ELEM_B06_POLY_PARAPHENYLENE_TEREPHTHALAMIDE_VITAL_12",
    "effectText": "Liên kết chuỗi polymer cực đại: Không thể bị phá hủy bởi đòn tấn công đầu tiên trong mỗi lượt.",
    "scientificLore": "Kevlar ((-C14H10N2O2-)n) là hợp chất sinh học / polymer quan trọng trong chương trình Hóa học 12 GDPT 2018 với khả năng tạo liên kết hydro và chuỗi mạch bền vững.",
    "relatedEquation": "1,4-phenylene-diamine + terephthaloyl chloride → Kevlar",
    "iupacName": "Poly-paraphenylene terephthalamide",
    "archetype": "MACROMOLECULAR_POLYMER",
    "structuredEffects": [
      {
        "effectId": "B06_EFF_12",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "APPLY_STATUS",
            "params": {
              "statusType": "PASSIVATION"
            }
          }
        ],
        "description": "Bảo vệ màng polymer bền cơ học."
      }
    ]
  },
  {
    "id": "card_b06_013_glycine_13",
    "name": "Glyxin — Chuỗi Đại Phân Tử (Cấu Trúc 13)",
    "name_en": "Glycine — Chuỗi Đại Phân Tử Isolate 13",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "TERRA",
    "manaCost": 1,
    "level": 2,
    "atk": 1440,
    "def": 1460,
    "chemicalFormula": "C2H5NO2",
    "effectCode": "ELEM_B06_GLYCINE_VITAL_13",
    "effectText": "Khi có mặt trên sân: Hồi phục 300 LP cho người chơi sau mỗi lượt kết thúc (cân bằng nội môi).",
    "scientificLore": "Glyxin (C2H5NO2) là hợp chất sinh học / polymer quan trọng trong chương trình Hóa học 12 GDPT 2018 với khả năng tạo liên kết hydro và chuỗi mạch bền vững.",
    "relatedEquation": "H₂N-CH₂-COOH ⇌ H₃N⁺-CH₂-COO⁻",
    "iupacName": "Glycine",
    "archetype": "BIOMOLECULE_VITAL",
    "structuredEffects": [
      {
        "effectId": "B06_EFF_13",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "HEAL_LP",
            "params": {
              "amount": 400
            }
          }
        ],
        "description": "Hồi 400 LP dinh dưỡng sinh học."
      }
    ]
  },
  {
    "id": "card_b06_014_alanine_14",
    "name": "Alanin — Chuỗi Đại Phân Tử (Cấu Trúc 14)",
    "name_en": "Alanine — Chuỗi Đại Phân Tử Isolate 14",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "TERRA",
    "manaCost": 2,
    "level": 3,
    "atk": 1710,
    "def": 1750,
    "chemicalFormula": "C3H7NO2",
    "effectCode": "ELEM_B06_ALANINE_VITAL_14",
    "effectText": "Khi có mặt trên sân: Hồi phục 300 LP cho người chơi sau mỗi lượt kết thúc (cân bằng nội môi).",
    "scientificLore": "Alanin (C3H7NO2) là hợp chất sinh học / polymer quan trọng trong chương trình Hóa học 12 GDPT 2018 với khả năng tạo liên kết hydro và chuỗi mạch bền vững.",
    "relatedEquation": "CH₃-CH(NH₂)-COOH ⇌ CH₃-CH(NH₃⁺)-COO⁻",
    "iupacName": "Alanine",
    "archetype": "BIOMOLECULE_VITAL",
    "structuredEffects": [
      {
        "effectId": "B06_EFF_14",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "HEAL_LP",
            "params": {
              "amount": 400
            }
          }
        ],
        "description": "Hồi 400 LP dinh dưỡng sinh học."
      }
    ]
  },
  {
    "id": "card_b06_015_valine_15",
    "name": "Valin — Chuỗi Đại Phân Tử (Cấu Trúc 15)",
    "name_en": "Valine — Chuỗi Đại Phân Tử Isolate 15",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "ULTRA_RARE",
    "attribute": "TERRA",
    "manaCost": 3,
    "level": 4,
    "atk": 1980,
    "def": 2040,
    "chemicalFormula": "C5H11NO2",
    "effectCode": "ELEM_B06_VALINE_VITAL_15",
    "effectText": "Khi có mặt trên sân: Hồi phục 300 LP cho người chơi sau mỗi lượt kết thúc (cân bằng nội môi).",
    "scientificLore": "Valin (C5H11NO2) là hợp chất sinh học / polymer quan trọng trong chương trình Hóa học 12 GDPT 2018 với khả năng tạo liên kết hydro và chuỗi mạch bền vững.",
    "relatedEquation": "(CH₃)₂CH-CH(NH₂)-COOH",
    "iupacName": "Valine",
    "archetype": "BIOMOLECULE_VITAL",
    "structuredEffects": [
      {
        "effectId": "B06_EFF_15",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "HEAL_LP",
            "params": {
              "amount": 400
            }
          }
        ],
        "description": "Hồi 400 LP dinh dưỡng sinh học."
      }
    ]
  },
  {
    "id": "card_b06_016_glutamic_acid_16",
    "name": "Axit Glutamic — Chuỗi Đại Phân Tử (Cấu Trúc 16)",
    "name_en": "Glutamic Acid — Chuỗi Đại Phân Tử Isolate 16",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SECRET_RARE",
    "attribute": "ACID_DARK",
    "manaCost": 4,
    "level": 5,
    "atk": 2000,
    "def": 2330,
    "chemicalFormula": "C5H9NO4",
    "effectCode": "ELEM_B06_GLUTAMIC_ACID_VITAL_16",
    "effectText": "Khi có mặt trên sân: Hồi phục 300 LP cho người chơi sau mỗi lượt kết thúc (cân bằng nội môi).",
    "scientificLore": "Axit Glutamic (C5H9NO4) là hợp chất sinh học / polymer quan trọng trong chương trình Hóa học 12 GDPT 2018 với khả năng tạo liên kết hydro và chuỗi mạch bền vững.",
    "relatedEquation": "HOOC-(CH₂)₂-CH(NH₂)-COOH",
    "iupacName": "Glutamic Acid",
    "archetype": "BIOMOLECULE_VITAL",
    "structuredEffects": [
      {
        "effectId": "B06_EFF_16",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "HEAL_LP",
            "params": {
              "amount": 400
            }
          }
        ],
        "description": "Hồi 400 LP dinh dưỡng sinh học."
      }
    ]
  },
  {
    "id": "card_b06_017_lysine_17",
    "name": "Lysin — Chuỗi Đại Phân Tử (Cấu Trúc 17)",
    "name_en": "Lysine — Chuỗi Đại Phân Tử Isolate 17",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "AQUA",
    "manaCost": 5,
    "level": 6,
    "atk": 2270,
    "def": 2380,
    "chemicalFormula": "C6H14N2O2",
    "effectCode": "ELEM_B06_LYSINE_VITAL_17",
    "effectText": "Khi có mặt trên sân: Hồi phục 300 LP cho người chơi sau mỗi lượt kết thúc (cân bằng nội môi).",
    "scientificLore": "Lysin (C6H14N2O2) là hợp chất sinh học / polymer quan trọng trong chương trình Hóa học 12 GDPT 2018 với khả năng tạo liên kết hydro và chuỗi mạch bền vững.",
    "relatedEquation": "H₂N-(CH₂)₄-CH(NH₂)-COOH",
    "iupacName": "Lysine",
    "archetype": "BIOMOLECULE_VITAL",
    "structuredEffects": [
      {
        "effectId": "B06_EFF_17",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "HEAL_LP",
            "params": {
              "amount": 400
            }
          }
        ],
        "description": "Hồi 400 LP dinh dưỡng sinh học."
      }
    ]
  },
  {
    "id": "card_b06_018_glucose_18",
    "name": "Glucozo — Chuỗi Đại Phân Tử (Cấu Trúc 18)",
    "name_en": "Glucose — Chuỗi Đại Phân Tử Isolate 18",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "PYRO",
    "manaCost": 5,
    "level": 7,
    "atk": 2540,
    "def": 2670,
    "chemicalFormula": "C6H12O6",
    "effectCode": "ELEM_B06_GLUCOSE_VITAL_18",
    "effectText": "Khi có mặt trên sân: Hồi phục 300 LP cho người chơi sau mỗi lượt kết thúc (cân bằng nội môi).",
    "scientificLore": "Glucozo (C6H12O6) là hợp chất sinh học / polymer quan trọng trong chương trình Hóa học 12 GDPT 2018 với khả năng tạo liên kết hydro và chuỗi mạch bền vững.",
    "relatedEquation": "C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O",
    "iupacName": "Glucose",
    "archetype": "BIOMOLECULE_VITAL",
    "structuredEffects": [
      {
        "effectId": "B06_EFF_18",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "HEAL_LP",
            "params": {
              "amount": 400
            }
          }
        ],
        "description": "Hồi 400 LP dinh dưỡng sinh học."
      }
    ]
  },
  {
    "id": "card_b06_019_fructose_19",
    "name": "Fructozo — Chuỗi Đại Phân Tử (Cấu Trúc 19)",
    "name_en": "Fructose — Chuỗi Đại Phân Tử Isolate 19",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "PYRO",
    "manaCost": 1,
    "level": 2,
    "atk": 1490,
    "def": 1580,
    "chemicalFormula": "C6H12O6",
    "effectCode": "ELEM_B06_FRUCTOSE_VITAL_19",
    "effectText": "Khi có mặt trên sân: Hồi phục 300 LP cho người chơi sau mỗi lượt kết thúc (cân bằng nội môi).",
    "scientificLore": "Fructozo (C6H12O6) là hợp chất sinh học / polymer quan trọng trong chương trình Hóa học 12 GDPT 2018 với khả năng tạo liên kết hydro và chuỗi mạch bền vững.",
    "relatedEquation": "C₆H₁₂O₆ (Ketohexose Isomer)",
    "iupacName": "Fructose",
    "archetype": "BIOMOLECULE_VITAL",
    "structuredEffects": [
      {
        "effectId": "B06_EFF_19",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "HEAL_LP",
            "params": {
              "amount": 400
            }
          }
        ],
        "description": "Hồi 400 LP dinh dưỡng sinh học."
      }
    ]
  },
  {
    "id": "card_b06_020_sucrose_20",
    "name": "Saccarozo — Chuỗi Đại Phân Tử (Cấu Trúc 20)",
    "name_en": "Sucrose — Chuỗi Đại Phân Tử Isolate 20",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "TERRA",
    "manaCost": 2,
    "level": 3,
    "atk": 1760,
    "def": 1870,
    "chemicalFormula": "C12H22O11",
    "effectCode": "ELEM_B06_SUCROSE_VITAL_20",
    "effectText": "Khi có mặt trên sân: Hồi phục 300 LP cho người chơi sau mỗi lượt kết thúc (cân bằng nội môi).",
    "scientificLore": "Saccarozo (C12H22O11) là hợp chất sinh học / polymer quan trọng trong chương trình Hóa học 12 GDPT 2018 với khả năng tạo liên kết hydro và chuỗi mạch bền vững.",
    "relatedEquation": "C₁₂H₂₂O₁₁ + H₂O → C₆H₁₂O₆ + C₆H₁₂O₆",
    "iupacName": "Sucrose",
    "archetype": "BIOMOLECULE_VITAL",
    "structuredEffects": [
      {
        "effectId": "B06_EFF_20",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "HEAL_LP",
            "params": {
              "amount": 400
            }
          }
        ],
        "description": "Hồi 400 LP dinh dưỡng sinh học."
      }
    ]
  },
  {
    "id": "card_b06_021_polyethylene_21",
    "name": "Polyetylen — Chuỗi Đại Phân Tử (Cấu Trúc 21)",
    "name_en": "Polyethylene — Chuỗi Đại Phân Tử Isolate 21",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "TERRA",
    "manaCost": 3,
    "level": 4,
    "atk": 1780,
    "def": 1920,
    "chemicalFormula": "(-C2H4-)n",
    "effectCode": "ELEM_B06_POLYETHYLENE_VITAL_21",
    "effectText": "Liên kết chuỗi polymer cực đại: Không thể bị phá hủy bởi đòn tấn công đầu tiên trong mỗi lượt.",
    "scientificLore": "Polyetylen ((-C2H4-)n) là hợp chất sinh học / polymer quan trọng trong chương trình Hóa học 12 GDPT 2018 với khả năng tạo liên kết hydro và chuỗi mạch bền vững.",
    "relatedEquation": "nCH₂=CH₂ → (-CH₂-CH₂-)n",
    "iupacName": "Polyethylene",
    "archetype": "MACROMOLECULAR_POLYMER",
    "structuredEffects": [
      {
        "effectId": "B06_EFF_21",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "APPLY_STATUS",
            "params": {
              "statusType": "PASSIVATION"
            }
          }
        ],
        "description": "Bảo vệ màng polymer bền cơ học."
      }
    ]
  },
  {
    "id": "card_b06_022_polytetrafluoroethylene_22",
    "name": "Teflon — Chuỗi Đại Phân Tử (Cấu Trúc 22)",
    "name_en": "Polytetrafluoroethylene — Chuỗi Đại Phân Tử Isolate 22",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "NOBLE_VOID",
    "manaCost": 4,
    "level": 5,
    "atk": 2050,
    "def": 2210,
    "chemicalFormula": "(-C2F4-)n",
    "effectCode": "ELEM_B06_POLYTETRAFLUOROETHYLENE_VITAL_22",
    "effectText": "Liên kết chuỗi polymer cực đại: Không thể bị phá hủy bởi đòn tấn công đầu tiên trong mỗi lượt.",
    "scientificLore": "Teflon ((-C2F4-)n) là hợp chất sinh học / polymer quan trọng trong chương trình Hóa học 12 GDPT 2018 với khả năng tạo liên kết hydro và chuỗi mạch bền vững.",
    "relatedEquation": "nCF₂=CF₂ → (-CF₂-CF₂-)n",
    "iupacName": "Polytetrafluoroethylene",
    "archetype": "MACROMOLECULAR_POLYMER",
    "structuredEffects": [
      {
        "effectId": "B06_EFF_22",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "APPLY_STATUS",
            "params": {
              "statusType": "PASSIVATION"
            }
          }
        ],
        "description": "Bảo vệ màng polymer bền cơ học."
      }
    ]
  },
  {
    "id": "card_b06_023_nylon_66_23",
    "name": "Nylon-6,6 — Chuỗi Đại Phân Tử (Cấu Trúc 23)",
    "name_en": "Nylon 66 — Chuỗi Đại Phân Tử Isolate 23",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "TERRA",
    "manaCost": 5,
    "level": 6,
    "atk": 2320,
    "def": 2500,
    "chemicalFormula": "C12H22N2O2",
    "effectCode": "ELEM_B06_NYLON_66_VITAL_23",
    "effectText": "Liên kết chuỗi polymer cực đại: Không thể bị phá hủy bởi đòn tấn công đầu tiên trong mỗi lượt.",
    "scientificLore": "Nylon-6,6 (C12H22N2O2) là hợp chất sinh học / polymer quan trọng trong chương trình Hóa học 12 GDPT 2018 với khả năng tạo liên kết hydro và chuỗi mạch bền vững.",
    "relatedEquation": "nHexamethylenediamine + nAdipic Acid → Nylon-6,6 + 2nH₂O",
    "iupacName": "Nylon 66",
    "archetype": "MACROMOLECULAR_POLYMER",
    "structuredEffects": [
      {
        "effectId": "B06_EFF_23",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "APPLY_STATUS",
            "params": {
              "statusType": "PASSIVATION"
            }
          }
        ],
        "description": "Bảo vệ màng polymer bền cơ học."
      }
    ]
  },
  {
    "id": "card_b06_024_poly_paraphenylene_terephthalamide_24",
    "name": "Kevlar — Chuỗi Đại Phân Tử (Cấu Trúc 24)",
    "name_en": "Poly-paraphenylene terephthalamide — Chuỗi Đại Phân Tử Isolate 24",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "ULTRA_RARE",
    "attribute": "NOBLE_VOID",
    "manaCost": 5,
    "level": 7,
    "atk": 2590,
    "def": 2790,
    "chemicalFormula": "(-C14H10N2O2-)n",
    "effectCode": "ELEM_B06_POLY_PARAPHENYLENE_TEREPHTHALAMIDE_VITAL_24",
    "effectText": "Liên kết chuỗi polymer cực đại: Không thể bị phá hủy bởi đòn tấn công đầu tiên trong mỗi lượt.",
    "scientificLore": "Kevlar ((-C14H10N2O2-)n) là hợp chất sinh học / polymer quan trọng trong chương trình Hóa học 12 GDPT 2018 với khả năng tạo liên kết hydro và chuỗi mạch bền vững.",
    "relatedEquation": "1,4-phenylene-diamine + terephthaloyl chloride → Kevlar",
    "iupacName": "Poly-paraphenylene terephthalamide",
    "archetype": "MACROMOLECULAR_POLYMER",
    "structuredEffects": [
      {
        "effectId": "B06_EFF_24",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "APPLY_STATUS",
            "params": {
              "statusType": "PASSIVATION"
            }
          }
        ],
        "description": "Bảo vệ màng polymer bền cơ học."
      }
    ]
  },
  {
    "id": "card_b06_025_glycine_25",
    "name": "Glyxin — Khối Kháng Sinh (Cấu Trúc 25)",
    "name_en": "Glycine — Khối Kháng Sinh Isolate 25",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SECRET_RARE",
    "attribute": "TERRA",
    "manaCost": 1,
    "level": 2,
    "atk": 1540,
    "def": 1460,
    "chemicalFormula": "C2H5NO2",
    "effectCode": "ELEM_B06_GLYCINE_VITAL_25",
    "effectText": "Khi có mặt trên sân: Hồi phục 300 LP cho người chơi sau mỗi lượt kết thúc (cân bằng nội môi).",
    "scientificLore": "Glyxin (C2H5NO2) là hợp chất sinh học / polymer quan trọng trong chương trình Hóa học 12 GDPT 2018 với khả năng tạo liên kết hydro và chuỗi mạch bền vững.",
    "relatedEquation": "H₂N-CH₂-COOH ⇌ H₃N⁺-CH₂-COO⁻",
    "iupacName": "Glycine",
    "archetype": "BIOMOLECULE_VITAL",
    "structuredEffects": [
      {
        "effectId": "B06_EFF_25",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "HEAL_LP",
            "params": {
              "amount": 400
            }
          }
        ],
        "description": "Hồi 400 LP dinh dưỡng sinh học."
      }
    ]
  },
  {
    "id": "card_b06_026_alanine_26",
    "name": "Alanin — Khối Kháng Sinh (Cấu Trúc 26)",
    "name_en": "Alanine — Khối Kháng Sinh Isolate 26",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "TERRA",
    "manaCost": 2,
    "level": 3,
    "atk": 1560,
    "def": 1750,
    "chemicalFormula": "C3H7NO2",
    "effectCode": "ELEM_B06_ALANINE_VITAL_26",
    "effectText": "Khi có mặt trên sân: Hồi phục 300 LP cho người chơi sau mỗi lượt kết thúc (cân bằng nội môi).",
    "scientificLore": "Alanin (C3H7NO2) là hợp chất sinh học / polymer quan trọng trong chương trình Hóa học 12 GDPT 2018 với khả năng tạo liên kết hydro và chuỗi mạch bền vững.",
    "relatedEquation": "CH₃-CH(NH₂)-COOH ⇌ CH₃-CH(NH₃⁺)-COO⁻",
    "iupacName": "Alanine",
    "archetype": "BIOMOLECULE_VITAL",
    "structuredEffects": [
      {
        "effectId": "B06_EFF_26",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "HEAL_LP",
            "params": {
              "amount": 400
            }
          }
        ],
        "description": "Hồi 400 LP dinh dưỡng sinh học."
      }
    ]
  },
  {
    "id": "card_b06_027_valine_27",
    "name": "Valin — Khối Kháng Sinh (Cấu Trúc 27)",
    "name_en": "Valine — Khối Kháng Sinh Isolate 27",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "TERRA",
    "manaCost": 3,
    "level": 4,
    "atk": 1830,
    "def": 2040,
    "chemicalFormula": "C5H11NO2",
    "effectCode": "ELEM_B06_VALINE_VITAL_27",
    "effectText": "Khi có mặt trên sân: Hồi phục 300 LP cho người chơi sau mỗi lượt kết thúc (cân bằng nội môi).",
    "scientificLore": "Valin (C5H11NO2) là hợp chất sinh học / polymer quan trọng trong chương trình Hóa học 12 GDPT 2018 với khả năng tạo liên kết hydro và chuỗi mạch bền vững.",
    "relatedEquation": "(CH₃)₂CH-CH(NH₂)-COOH",
    "iupacName": "Valine",
    "archetype": "BIOMOLECULE_VITAL",
    "structuredEffects": [
      {
        "effectId": "B06_EFF_27",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "HEAL_LP",
            "params": {
              "amount": 400
            }
          }
        ],
        "description": "Hồi 400 LP dinh dưỡng sinh học."
      }
    ]
  },
  {
    "id": "card_b06_028_glutamic_acid_28",
    "name": "Axit Glutamic — Khối Kháng Sinh (Cấu Trúc 28)",
    "name_en": "Glutamic Acid — Khối Kháng Sinh Isolate 28",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "ACID_DARK",
    "manaCost": 4,
    "level": 5,
    "atk": 2100,
    "def": 2330,
    "chemicalFormula": "C5H9NO4",
    "effectCode": "ELEM_B06_GLUTAMIC_ACID_VITAL_28",
    "effectText": "Khi có mặt trên sân: Hồi phục 300 LP cho người chơi sau mỗi lượt kết thúc (cân bằng nội môi).",
    "scientificLore": "Axit Glutamic (C5H9NO4) là hợp chất sinh học / polymer quan trọng trong chương trình Hóa học 12 GDPT 2018 với khả năng tạo liên kết hydro và chuỗi mạch bền vững.",
    "relatedEquation": "HOOC-(CH₂)₂-CH(NH₂)-COOH",
    "iupacName": "Glutamic Acid",
    "archetype": "BIOMOLECULE_VITAL",
    "structuredEffects": [
      {
        "effectId": "B06_EFF_28",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "HEAL_LP",
            "params": {
              "amount": 400
            }
          }
        ],
        "description": "Hồi 400 LP dinh dưỡng sinh học."
      }
    ]
  },
  {
    "id": "card_b06_029_lysine_29",
    "name": "Lysin — Khối Kháng Sinh (Cấu Trúc 29)",
    "name_en": "Lysine — Khối Kháng Sinh Isolate 29",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "AQUA",
    "manaCost": 5,
    "level": 6,
    "atk": 2370,
    "def": 2380,
    "chemicalFormula": "C6H14N2O2",
    "effectCode": "ELEM_B06_LYSINE_VITAL_29",
    "effectText": "Khi có mặt trên sân: Hồi phục 300 LP cho người chơi sau mỗi lượt kết thúc (cân bằng nội môi).",
    "scientificLore": "Lysin (C6H14N2O2) là hợp chất sinh học / polymer quan trọng trong chương trình Hóa học 12 GDPT 2018 với khả năng tạo liên kết hydro và chuỗi mạch bền vững.",
    "relatedEquation": "H₂N-(CH₂)₄-CH(NH₂)-COOH",
    "iupacName": "Lysine",
    "archetype": "BIOMOLECULE_VITAL",
    "structuredEffects": [
      {
        "effectId": "B06_EFF_29",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "HEAL_LP",
            "params": {
              "amount": 400
            }
          }
        ],
        "description": "Hồi 400 LP dinh dưỡng sinh học."
      }
    ]
  },
  {
    "id": "card_b06_030_glucose_30",
    "name": "Glucozo — Khối Kháng Sinh (Cấu Trúc 30)",
    "name_en": "Glucose — Khối Kháng Sinh Isolate 30",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "PYRO",
    "manaCost": 5,
    "level": 7,
    "atk": 2640,
    "def": 2670,
    "chemicalFormula": "C6H12O6",
    "effectCode": "ELEM_B06_GLUCOSE_VITAL_30",
    "effectText": "Khi có mặt trên sân: Hồi phục 300 LP cho người chơi sau mỗi lượt kết thúc (cân bằng nội môi).",
    "scientificLore": "Glucozo (C6H12O6) là hợp chất sinh học / polymer quan trọng trong chương trình Hóa học 12 GDPT 2018 với khả năng tạo liên kết hydro và chuỗi mạch bền vững.",
    "relatedEquation": "C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O",
    "iupacName": "Glucose",
    "archetype": "BIOMOLECULE_VITAL",
    "structuredEffects": [
      {
        "effectId": "B06_EFF_30",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "HEAL_LP",
            "params": {
              "amount": 400
            }
          }
        ],
        "description": "Hồi 400 LP dinh dưỡng sinh học."
      }
    ]
  },
  {
    "id": "card_b06_031_fructose_31",
    "name": "Fructozo — Khối Kháng Sinh (Cấu Trúc 31)",
    "name_en": "Fructose — Khối Kháng Sinh Isolate 31",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "PYRO",
    "manaCost": 1,
    "level": 2,
    "atk": 1340,
    "def": 1580,
    "chemicalFormula": "C6H12O6",
    "effectCode": "ELEM_B06_FRUCTOSE_VITAL_31",
    "effectText": "Khi có mặt trên sân: Hồi phục 300 LP cho người chơi sau mỗi lượt kết thúc (cân bằng nội môi).",
    "scientificLore": "Fructozo (C6H12O6) là hợp chất sinh học / polymer quan trọng trong chương trình Hóa học 12 GDPT 2018 với khả năng tạo liên kết hydro và chuỗi mạch bền vững.",
    "relatedEquation": "C₆H₁₂O₆ (Ketohexose Isomer)",
    "iupacName": "Fructose",
    "archetype": "BIOMOLECULE_VITAL",
    "structuredEffects": [
      {
        "effectId": "B06_EFF_31",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "HEAL_LP",
            "params": {
              "amount": 400
            }
          }
        ],
        "description": "Hồi 400 LP dinh dưỡng sinh học."
      }
    ]
  },
  {
    "id": "card_b06_032_sucrose_32",
    "name": "Saccarozo — Khối Kháng Sinh (Cấu Trúc 32)",
    "name_en": "Sucrose — Khối Kháng Sinh Isolate 32",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "TERRA",
    "manaCost": 2,
    "level": 3,
    "atk": 1610,
    "def": 1870,
    "chemicalFormula": "C12H22O11",
    "effectCode": "ELEM_B06_SUCROSE_VITAL_32",
    "effectText": "Khi có mặt trên sân: Hồi phục 300 LP cho người chơi sau mỗi lượt kết thúc (cân bằng nội môi).",
    "scientificLore": "Saccarozo (C12H22O11) là hợp chất sinh học / polymer quan trọng trong chương trình Hóa học 12 GDPT 2018 với khả năng tạo liên kết hydro và chuỗi mạch bền vững.",
    "relatedEquation": "C₁₂H₂₂O₁₁ + H₂O → C₆H₁₂O₆ + C₆H₁₂O₆",
    "iupacName": "Sucrose",
    "archetype": "BIOMOLECULE_VITAL",
    "structuredEffects": [
      {
        "effectId": "B06_EFF_32",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "HEAL_LP",
            "params": {
              "amount": 400
            }
          }
        ],
        "description": "Hồi 400 LP dinh dưỡng sinh học."
      }
    ]
  },
  {
    "id": "card_b06_033_polyethylene_33",
    "name": "Polyetylen — Khối Kháng Sinh (Cấu Trúc 33)",
    "name_en": "Polyethylene — Khối Kháng Sinh Isolate 33",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "ULTRA_RARE",
    "attribute": "TERRA",
    "manaCost": 3,
    "level": 4,
    "atk": 1880,
    "def": 1920,
    "chemicalFormula": "(-C2H4-)n",
    "effectCode": "ELEM_B06_POLYETHYLENE_VITAL_33",
    "effectText": "Liên kết chuỗi polymer cực đại: Không thể bị phá hủy bởi đòn tấn công đầu tiên trong mỗi lượt.",
    "scientificLore": "Polyetylen ((-C2H4-)n) là hợp chất sinh học / polymer quan trọng trong chương trình Hóa học 12 GDPT 2018 với khả năng tạo liên kết hydro và chuỗi mạch bền vững.",
    "relatedEquation": "nCH₂=CH₂ → (-CH₂-CH₂-)n",
    "iupacName": "Polyethylene",
    "archetype": "MACROMOLECULAR_POLYMER",
    "structuredEffects": [
      {
        "effectId": "B06_EFF_33",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "APPLY_STATUS",
            "params": {
              "statusType": "PASSIVATION"
            }
          }
        ],
        "description": "Bảo vệ màng polymer bền cơ học."
      }
    ]
  },
  {
    "id": "card_b06_034_polytetrafluoroethylene_34",
    "name": "Teflon — Khối Kháng Sinh (Cấu Trúc 34)",
    "name_en": "Polytetrafluoroethylene — Khối Kháng Sinh Isolate 34",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SECRET_RARE",
    "attribute": "NOBLE_VOID",
    "manaCost": 4,
    "level": 5,
    "atk": 2150,
    "def": 2210,
    "chemicalFormula": "(-C2F4-)n",
    "effectCode": "ELEM_B06_POLYTETRAFLUOROETHYLENE_VITAL_34",
    "effectText": "Liên kết chuỗi polymer cực đại: Không thể bị phá hủy bởi đòn tấn công đầu tiên trong mỗi lượt.",
    "scientificLore": "Teflon ((-C2F4-)n) là hợp chất sinh học / polymer quan trọng trong chương trình Hóa học 12 GDPT 2018 với khả năng tạo liên kết hydro và chuỗi mạch bền vững.",
    "relatedEquation": "nCF₂=CF₂ → (-CF₂-CF₂-)n",
    "iupacName": "Polytetrafluoroethylene",
    "archetype": "MACROMOLECULAR_POLYMER",
    "structuredEffects": [
      {
        "effectId": "B06_EFF_34",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "APPLY_STATUS",
            "params": {
              "statusType": "PASSIVATION"
            }
          }
        ],
        "description": "Bảo vệ màng polymer bền cơ học."
      }
    ]
  },
  {
    "id": "card_b06_035_nylon_66_35",
    "name": "Nylon-6,6 — Khối Kháng Sinh (Cấu Trúc 35)",
    "name_en": "Nylon 66 — Khối Kháng Sinh Isolate 35",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "TERRA",
    "manaCost": 5,
    "level": 6,
    "atk": 2420,
    "def": 2500,
    "chemicalFormula": "C12H22N2O2",
    "effectCode": "ELEM_B06_NYLON_66_VITAL_35",
    "effectText": "Liên kết chuỗi polymer cực đại: Không thể bị phá hủy bởi đòn tấn công đầu tiên trong mỗi lượt.",
    "scientificLore": "Nylon-6,6 (C12H22N2O2) là hợp chất sinh học / polymer quan trọng trong chương trình Hóa học 12 GDPT 2018 với khả năng tạo liên kết hydro và chuỗi mạch bền vững.",
    "relatedEquation": "nHexamethylenediamine + nAdipic Acid → Nylon-6,6 + 2nH₂O",
    "iupacName": "Nylon 66",
    "archetype": "MACROMOLECULAR_POLYMER",
    "structuredEffects": [
      {
        "effectId": "B06_EFF_35",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "APPLY_STATUS",
            "params": {
              "statusType": "PASSIVATION"
            }
          }
        ],
        "description": "Bảo vệ màng polymer bền cơ học."
      }
    ]
  },
  {
    "id": "card_b06_036_poly_paraphenylene_terephthalamide_36",
    "name": "Kevlar — Khối Kháng Sinh (Cấu Trúc 36)",
    "name_en": "Poly-paraphenylene terephthalamide — Khối Kháng Sinh Isolate 36",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "NOBLE_VOID",
    "manaCost": 5,
    "level": 7,
    "atk": 2440,
    "def": 2790,
    "chemicalFormula": "(-C14H10N2O2-)n",
    "effectCode": "ELEM_B06_POLY_PARAPHENYLENE_TEREPHTHALAMIDE_VITAL_36",
    "effectText": "Liên kết chuỗi polymer cực đại: Không thể bị phá hủy bởi đòn tấn công đầu tiên trong mỗi lượt.",
    "scientificLore": "Kevlar ((-C14H10N2O2-)n) là hợp chất sinh học / polymer quan trọng trong chương trình Hóa học 12 GDPT 2018 với khả năng tạo liên kết hydro và chuỗi mạch bền vững.",
    "relatedEquation": "1,4-phenylene-diamine + terephthaloyl chloride → Kevlar",
    "iupacName": "Poly-paraphenylene terephthalamide",
    "archetype": "MACROMOLECULAR_POLYMER",
    "structuredEffects": [
      {
        "effectId": "B06_EFF_36",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "APPLY_STATUS",
            "params": {
              "statusType": "PASSIVATION"
            }
          }
        ],
        "description": "Bảo vệ màng polymer bền cơ học."
      }
    ]
  },
  {
    "id": "card_b06_037_glycine_37",
    "name": "Glyxin — Cấu Trúc Tự Nhiên (Cấu Trúc 37)",
    "name_en": "Glycine — Cấu Trúc Tự Nhiên Isolate 37",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "TERRA",
    "manaCost": 1,
    "level": 2,
    "atk": 1390,
    "def": 1460,
    "chemicalFormula": "C2H5NO2",
    "effectCode": "ELEM_B06_GLYCINE_VITAL_37",
    "effectText": "Khi có mặt trên sân: Hồi phục 300 LP cho người chơi sau mỗi lượt kết thúc (cân bằng nội môi).",
    "scientificLore": "Glyxin (C2H5NO2) là hợp chất sinh học / polymer quan trọng trong chương trình Hóa học 12 GDPT 2018 với khả năng tạo liên kết hydro và chuỗi mạch bền vững.",
    "relatedEquation": "H₂N-CH₂-COOH ⇌ H₃N⁺-CH₂-COO⁻",
    "iupacName": "Glycine",
    "archetype": "BIOMOLECULE_VITAL",
    "structuredEffects": [
      {
        "effectId": "B06_EFF_37",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "HEAL_LP",
            "params": {
              "amount": 400
            }
          }
        ],
        "description": "Hồi 400 LP dinh dưỡng sinh học."
      }
    ]
  },
  {
    "id": "card_b06_038_alanine_38",
    "name": "Alanin — Cấu Trúc Tự Nhiên (Cấu Trúc 38)",
    "name_en": "Alanine — Cấu Trúc Tự Nhiên Isolate 38",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "TERRA",
    "manaCost": 2,
    "level": 3,
    "atk": 1660,
    "def": 1750,
    "chemicalFormula": "C3H7NO2",
    "effectCode": "ELEM_B06_ALANINE_VITAL_38",
    "effectText": "Khi có mặt trên sân: Hồi phục 300 LP cho người chơi sau mỗi lượt kết thúc (cân bằng nội môi).",
    "scientificLore": "Alanin (C3H7NO2) là hợp chất sinh học / polymer quan trọng trong chương trình Hóa học 12 GDPT 2018 với khả năng tạo liên kết hydro và chuỗi mạch bền vững.",
    "relatedEquation": "CH₃-CH(NH₂)-COOH ⇌ CH₃-CH(NH₃⁺)-COO⁻",
    "iupacName": "Alanine",
    "archetype": "BIOMOLECULE_VITAL",
    "structuredEffects": [
      {
        "effectId": "B06_EFF_38",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "HEAL_LP",
            "params": {
              "amount": 400
            }
          }
        ],
        "description": "Hồi 400 LP dinh dưỡng sinh học."
      }
    ]
  },
  {
    "id": "card_b06_039_valine_39",
    "name": "Valin — Cấu Trúc Tự Nhiên (Cấu Trúc 39)",
    "name_en": "Valine — Cấu Trúc Tự Nhiên Isolate 39",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "TERRA",
    "manaCost": 3,
    "level": 4,
    "atk": 1930,
    "def": 2040,
    "chemicalFormula": "C5H11NO2",
    "effectCode": "ELEM_B06_VALINE_VITAL_39",
    "effectText": "Khi có mặt trên sân: Hồi phục 300 LP cho người chơi sau mỗi lượt kết thúc (cân bằng nội môi).",
    "scientificLore": "Valin (C5H11NO2) là hợp chất sinh học / polymer quan trọng trong chương trình Hóa học 12 GDPT 2018 với khả năng tạo liên kết hydro và chuỗi mạch bền vững.",
    "relatedEquation": "(CH₃)₂CH-CH(NH₂)-COOH",
    "iupacName": "Valine",
    "archetype": "BIOMOLECULE_VITAL",
    "structuredEffects": [
      {
        "effectId": "B06_EFF_39",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "HEAL_LP",
            "params": {
              "amount": 400
            }
          }
        ],
        "description": "Hồi 400 LP dinh dưỡng sinh học."
      }
    ]
  },
  {
    "id": "card_b06_040_glutamic_acid_40",
    "name": "Axit Glutamic — Cấu Trúc Tự Nhiên (Cấu Trúc 40)",
    "name_en": "Glutamic Acid — Cấu Trúc Tự Nhiên Isolate 40",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "ACID_DARK",
    "manaCost": 4,
    "level": 5,
    "atk": 2200,
    "def": 2330,
    "chemicalFormula": "C5H9NO4",
    "effectCode": "ELEM_B06_GLUTAMIC_ACID_VITAL_40",
    "effectText": "Khi có mặt trên sân: Hồi phục 300 LP cho người chơi sau mỗi lượt kết thúc (cân bằng nội môi).",
    "scientificLore": "Axit Glutamic (C5H9NO4) là hợp chất sinh học / polymer quan trọng trong chương trình Hóa học 12 GDPT 2018 với khả năng tạo liên kết hydro và chuỗi mạch bền vững.",
    "relatedEquation": "HOOC-(CH₂)₂-CH(NH₂)-COOH",
    "iupacName": "Glutamic Acid",
    "archetype": "BIOMOLECULE_VITAL",
    "structuredEffects": [
      {
        "effectId": "B06_EFF_40",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "HEAL_LP",
            "params": {
              "amount": 400
            }
          }
        ],
        "description": "Hồi 400 LP dinh dưỡng sinh học."
      }
    ]
  },
  {
    "id": "card_b06_041_lysine_41",
    "name": "Lysin — Cấu Trúc Tự Nhiên (Cấu Trúc 41)",
    "name_en": "Lysine — Cấu Trúc Tự Nhiên Isolate 41",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "AQUA",
    "manaCost": 5,
    "level": 6,
    "atk": 2220,
    "def": 2380,
    "chemicalFormula": "C6H14N2O2",
    "effectCode": "ELEM_B06_LYSINE_VITAL_41",
    "effectText": "Khi có mặt trên sân: Hồi phục 300 LP cho người chơi sau mỗi lượt kết thúc (cân bằng nội môi).",
    "scientificLore": "Lysin (C6H14N2O2) là hợp chất sinh học / polymer quan trọng trong chương trình Hóa học 12 GDPT 2018 với khả năng tạo liên kết hydro và chuỗi mạch bền vững.",
    "relatedEquation": "H₂N-(CH₂)₄-CH(NH₂)-COOH",
    "iupacName": "Lysine",
    "archetype": "BIOMOLECULE_VITAL",
    "structuredEffects": [
      {
        "effectId": "B06_EFF_41",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "HEAL_LP",
            "params": {
              "amount": 400
            }
          }
        ],
        "description": "Hồi 400 LP dinh dưỡng sinh học."
      }
    ]
  },
  {
    "id": "card_b06_042_glucose_42",
    "name": "Glucozo — Cấu Trúc Tự Nhiên (Cấu Trúc 42)",
    "name_en": "Glucose — Cấu Trúc Tự Nhiên Isolate 42",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "ULTRA_RARE",
    "attribute": "PYRO",
    "manaCost": 5,
    "level": 7,
    "atk": 2490,
    "def": 2670,
    "chemicalFormula": "C6H12O6",
    "effectCode": "ELEM_B06_GLUCOSE_VITAL_42",
    "effectText": "Khi có mặt trên sân: Hồi phục 300 LP cho người chơi sau mỗi lượt kết thúc (cân bằng nội môi).",
    "scientificLore": "Glucozo (C6H12O6) là hợp chất sinh học / polymer quan trọng trong chương trình Hóa học 12 GDPT 2018 với khả năng tạo liên kết hydro và chuỗi mạch bền vững.",
    "relatedEquation": "C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O",
    "iupacName": "Glucose",
    "archetype": "BIOMOLECULE_VITAL",
    "structuredEffects": [
      {
        "effectId": "B06_EFF_42",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "HEAL_LP",
            "params": {
              "amount": 400
            }
          }
        ],
        "description": "Hồi 400 LP dinh dưỡng sinh học."
      }
    ]
  },
  {
    "id": "card_b06_043_fructose_43",
    "name": "Fructozo — Cấu Trúc Tự Nhiên (Cấu Trúc 43)",
    "name_en": "Fructose — Cấu Trúc Tự Nhiên Isolate 43",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SECRET_RARE",
    "attribute": "PYRO",
    "manaCost": 1,
    "level": 2,
    "atk": 1440,
    "def": 1580,
    "chemicalFormula": "C6H12O6",
    "effectCode": "ELEM_B06_FRUCTOSE_VITAL_43",
    "effectText": "Khi có mặt trên sân: Hồi phục 300 LP cho người chơi sau mỗi lượt kết thúc (cân bằng nội môi).",
    "scientificLore": "Fructozo (C6H12O6) là hợp chất sinh học / polymer quan trọng trong chương trình Hóa học 12 GDPT 2018 với khả năng tạo liên kết hydro và chuỗi mạch bền vững.",
    "relatedEquation": "C₆H₁₂O₆ (Ketohexose Isomer)",
    "iupacName": "Fructose",
    "archetype": "BIOMOLECULE_VITAL",
    "structuredEffects": [
      {
        "effectId": "B06_EFF_43",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "HEAL_LP",
            "params": {
              "amount": 400
            }
          }
        ],
        "description": "Hồi 400 LP dinh dưỡng sinh học."
      }
    ]
  },
  {
    "id": "card_b06_044_sucrose_44",
    "name": "Saccarozo — Cấu Trúc Tự Nhiên (Cấu Trúc 44)",
    "name_en": "Sucrose — Cấu Trúc Tự Nhiên Isolate 44",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "TERRA",
    "manaCost": 2,
    "level": 3,
    "atk": 1710,
    "def": 1870,
    "chemicalFormula": "C12H22O11",
    "effectCode": "ELEM_B06_SUCROSE_VITAL_44",
    "effectText": "Khi có mặt trên sân: Hồi phục 300 LP cho người chơi sau mỗi lượt kết thúc (cân bằng nội môi).",
    "scientificLore": "Saccarozo (C12H22O11) là hợp chất sinh học / polymer quan trọng trong chương trình Hóa học 12 GDPT 2018 với khả năng tạo liên kết hydro và chuỗi mạch bền vững.",
    "relatedEquation": "C₁₂H₂₂O₁₁ + H₂O → C₆H₁₂O₆ + C₆H₁₂O₆",
    "iupacName": "Sucrose",
    "archetype": "BIOMOLECULE_VITAL",
    "structuredEffects": [
      {
        "effectId": "B06_EFF_44",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "HEAL_LP",
            "params": {
              "amount": 400
            }
          }
        ],
        "description": "Hồi 400 LP dinh dưỡng sinh học."
      }
    ]
  },
  {
    "id": "card_b06_045_polyethylene_45",
    "name": "Polyetylen — Cấu Trúc Tự Nhiên (Cấu Trúc 45)",
    "name_en": "Polyethylene — Cấu Trúc Tự Nhiên Isolate 45",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "TERRA",
    "manaCost": 3,
    "level": 4,
    "atk": 1980,
    "def": 1920,
    "chemicalFormula": "(-C2H4-)n",
    "effectCode": "ELEM_B06_POLYETHYLENE_VITAL_45",
    "effectText": "Liên kết chuỗi polymer cực đại: Không thể bị phá hủy bởi đòn tấn công đầu tiên trong mỗi lượt.",
    "scientificLore": "Polyetylen ((-C2H4-)n) là hợp chất sinh học / polymer quan trọng trong chương trình Hóa học 12 GDPT 2018 với khả năng tạo liên kết hydro và chuỗi mạch bền vững.",
    "relatedEquation": "nCH₂=CH₂ → (-CH₂-CH₂-)n",
    "iupacName": "Polyethylene",
    "archetype": "MACROMOLECULAR_POLYMER",
    "structuredEffects": [
      {
        "effectId": "B06_EFF_45",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "APPLY_STATUS",
            "params": {
              "statusType": "PASSIVATION"
            }
          }
        ],
        "description": "Bảo vệ màng polymer bền cơ học."
      }
    ]
  },
  {
    "id": "card_b06_046_polytetrafluoroethylene_46",
    "name": "Teflon — Cấu Trúc Tự Nhiên (Cấu Trúc 46)",
    "name_en": "Polytetrafluoroethylene — Cấu Trúc Tự Nhiên Isolate 46",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "NOBLE_VOID",
    "manaCost": 4,
    "level": 5,
    "atk": 2000,
    "def": 2210,
    "chemicalFormula": "(-C2F4-)n",
    "effectCode": "ELEM_B06_POLYTETRAFLUOROETHYLENE_VITAL_46",
    "effectText": "Liên kết chuỗi polymer cực đại: Không thể bị phá hủy bởi đòn tấn công đầu tiên trong mỗi lượt.",
    "scientificLore": "Teflon ((-C2F4-)n) là hợp chất sinh học / polymer quan trọng trong chương trình Hóa học 12 GDPT 2018 với khả năng tạo liên kết hydro và chuỗi mạch bền vững.",
    "relatedEquation": "nCF₂=CF₂ → (-CF₂-CF₂-)n",
    "iupacName": "Polytetrafluoroethylene",
    "archetype": "MACROMOLECULAR_POLYMER",
    "structuredEffects": [
      {
        "effectId": "B06_EFF_46",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "APPLY_STATUS",
            "params": {
              "statusType": "PASSIVATION"
            }
          }
        ],
        "description": "Bảo vệ màng polymer bền cơ học."
      }
    ]
  },
  {
    "id": "card_b06_047_nylon_66_47",
    "name": "Nylon-6,6 — Cấu Trúc Tự Nhiên (Cấu Trúc 47)",
    "name_en": "Nylon 66 — Cấu Trúc Tự Nhiên Isolate 47",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "TERRA",
    "manaCost": 5,
    "level": 6,
    "atk": 2270,
    "def": 2500,
    "chemicalFormula": "C12H22N2O2",
    "effectCode": "ELEM_B06_NYLON_66_VITAL_47",
    "effectText": "Liên kết chuỗi polymer cực đại: Không thể bị phá hủy bởi đòn tấn công đầu tiên trong mỗi lượt.",
    "scientificLore": "Nylon-6,6 (C12H22N2O2) là hợp chất sinh học / polymer quan trọng trong chương trình Hóa học 12 GDPT 2018 với khả năng tạo liên kết hydro và chuỗi mạch bền vững.",
    "relatedEquation": "nHexamethylenediamine + nAdipic Acid → Nylon-6,6 + 2nH₂O",
    "iupacName": "Nylon 66",
    "archetype": "MACROMOLECULAR_POLYMER",
    "structuredEffects": [
      {
        "effectId": "B06_EFF_47",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "APPLY_STATUS",
            "params": {
              "statusType": "PASSIVATION"
            }
          }
        ],
        "description": "Bảo vệ màng polymer bền cơ học."
      }
    ]
  },
  {
    "id": "card_b06_048_poly_paraphenylene_terephthalamide_48",
    "name": "Kevlar — Cấu Trúc Tự Nhiên (Cấu Trúc 48)",
    "name_en": "Poly-paraphenylene terephthalamide — Cấu Trúc Tự Nhiên Isolate 48",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "NOBLE_VOID",
    "manaCost": 5,
    "level": 7,
    "atk": 2540,
    "def": 2790,
    "chemicalFormula": "(-C14H10N2O2-)n",
    "effectCode": "ELEM_B06_POLY_PARAPHENYLENE_TEREPHTHALAMIDE_VITAL_48",
    "effectText": "Liên kết chuỗi polymer cực đại: Không thể bị phá hủy bởi đòn tấn công đầu tiên trong mỗi lượt.",
    "scientificLore": "Kevlar ((-C14H10N2O2-)n) là hợp chất sinh học / polymer quan trọng trong chương trình Hóa học 12 GDPT 2018 với khả năng tạo liên kết hydro và chuỗi mạch bền vững.",
    "relatedEquation": "1,4-phenylene-diamine + terephthaloyl chloride → Kevlar",
    "iupacName": "Poly-paraphenylene terephthalamide",
    "archetype": "MACROMOLECULAR_POLYMER",
    "structuredEffects": [
      {
        "effectId": "B06_EFF_48",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "APPLY_STATUS",
            "params": {
              "statusType": "PASSIVATION"
            }
          }
        ],
        "description": "Bảo vệ màng polymer bền cơ học."
      }
    ]
  },
  {
    "id": "card_b06_049_glycine_49",
    "name": "Glyxin — Mạng Lưới Sinh Học (Cấu Trúc 49)",
    "name_en": "Glycine — Mạng Lưới Sinh Học Isolate 49",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "TERRA",
    "manaCost": 1,
    "level": 2,
    "atk": 1490,
    "def": 1460,
    "chemicalFormula": "C2H5NO2",
    "effectCode": "ELEM_B06_GLYCINE_VITAL_49",
    "effectText": "Khi có mặt trên sân: Hồi phục 300 LP cho người chơi sau mỗi lượt kết thúc (cân bằng nội môi).",
    "scientificLore": "Glyxin (C2H5NO2) là hợp chất sinh học / polymer quan trọng trong chương trình Hóa học 12 GDPT 2018 với khả năng tạo liên kết hydro và chuỗi mạch bền vững.",
    "relatedEquation": "H₂N-CH₂-COOH ⇌ H₃N⁺-CH₂-COO⁻",
    "iupacName": "Glycine",
    "archetype": "BIOMOLECULE_VITAL",
    "structuredEffects": [
      {
        "effectId": "B06_EFF_49",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "HEAL_LP",
            "params": {
              "amount": 400
            }
          }
        ],
        "description": "Hồi 400 LP dinh dưỡng sinh học."
      }
    ]
  },
  {
    "id": "card_b06_050_alanine_50",
    "name": "Alanin — Mạng Lưới Sinh Học (Cấu Trúc 50)",
    "name_en": "Alanine — Mạng Lưới Sinh Học Isolate 50",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "TERRA",
    "manaCost": 2,
    "level": 3,
    "atk": 1760,
    "def": 1750,
    "chemicalFormula": "C3H7NO2",
    "effectCode": "ELEM_B06_ALANINE_VITAL_50",
    "effectText": "Khi có mặt trên sân: Hồi phục 300 LP cho người chơi sau mỗi lượt kết thúc (cân bằng nội môi).",
    "scientificLore": "Alanin (C3H7NO2) là hợp chất sinh học / polymer quan trọng trong chương trình Hóa học 12 GDPT 2018 với khả năng tạo liên kết hydro và chuỗi mạch bền vững.",
    "relatedEquation": "CH₃-CH(NH₂)-COOH ⇌ CH₃-CH(NH₃⁺)-COO⁻",
    "iupacName": "Alanine",
    "archetype": "BIOMOLECULE_VITAL",
    "structuredEffects": [
      {
        "effectId": "B06_EFF_50",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "HEAL_LP",
            "params": {
              "amount": 400
            }
          }
        ],
        "description": "Hồi 400 LP dinh dưỡng sinh học."
      }
    ]
  },
  {
    "id": "card_b06_051_valine_51",
    "name": "Valin — Mạng Lưới Sinh Học (Cấu Trúc 51)",
    "name_en": "Valine — Mạng Lưới Sinh Học Isolate 51",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "ULTRA_RARE",
    "attribute": "TERRA",
    "manaCost": 3,
    "level": 4,
    "atk": 1780,
    "def": 2040,
    "chemicalFormula": "C5H11NO2",
    "effectCode": "ELEM_B06_VALINE_VITAL_51",
    "effectText": "Khi có mặt trên sân: Hồi phục 300 LP cho người chơi sau mỗi lượt kết thúc (cân bằng nội môi).",
    "scientificLore": "Valin (C5H11NO2) là hợp chất sinh học / polymer quan trọng trong chương trình Hóa học 12 GDPT 2018 với khả năng tạo liên kết hydro và chuỗi mạch bền vững.",
    "relatedEquation": "(CH₃)₂CH-CH(NH₂)-COOH",
    "iupacName": "Valine",
    "archetype": "BIOMOLECULE_VITAL",
    "structuredEffects": [
      {
        "effectId": "B06_EFF_51",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "HEAL_LP",
            "params": {
              "amount": 400
            }
          }
        ],
        "description": "Hồi 400 LP dinh dưỡng sinh học."
      }
    ]
  },
  {
    "id": "card_b06_052_glutamic_acid_52",
    "name": "Axit Glutamic — Mạng Lưới Sinh Học (Cấu Trúc 52)",
    "name_en": "Glutamic Acid — Mạng Lưới Sinh Học Isolate 52",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SECRET_RARE",
    "attribute": "ACID_DARK",
    "manaCost": 4,
    "level": 5,
    "atk": 2050,
    "def": 2330,
    "chemicalFormula": "C5H9NO4",
    "effectCode": "ELEM_B06_GLUTAMIC_ACID_VITAL_52",
    "effectText": "Khi có mặt trên sân: Hồi phục 300 LP cho người chơi sau mỗi lượt kết thúc (cân bằng nội môi).",
    "scientificLore": "Axit Glutamic (C5H9NO4) là hợp chất sinh học / polymer quan trọng trong chương trình Hóa học 12 GDPT 2018 với khả năng tạo liên kết hydro và chuỗi mạch bền vững.",
    "relatedEquation": "HOOC-(CH₂)₂-CH(NH₂)-COOH",
    "iupacName": "Glutamic Acid",
    "archetype": "BIOMOLECULE_VITAL",
    "structuredEffects": [
      {
        "effectId": "B06_EFF_52",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "HEAL_LP",
            "params": {
              "amount": 400
            }
          }
        ],
        "description": "Hồi 400 LP dinh dưỡng sinh học."
      }
    ]
  },
  {
    "id": "card_b06_053_lysine_53",
    "name": "Lysin — Mạng Lưới Sinh Học (Cấu Trúc 53)",
    "name_en": "Lysine — Mạng Lưới Sinh Học Isolate 53",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "AQUA",
    "manaCost": 5,
    "level": 6,
    "atk": 2320,
    "def": 2380,
    "chemicalFormula": "C6H14N2O2",
    "effectCode": "ELEM_B06_LYSINE_VITAL_53",
    "effectText": "Khi có mặt trên sân: Hồi phục 300 LP cho người chơi sau mỗi lượt kết thúc (cân bằng nội môi).",
    "scientificLore": "Lysin (C6H14N2O2) là hợp chất sinh học / polymer quan trọng trong chương trình Hóa học 12 GDPT 2018 với khả năng tạo liên kết hydro và chuỗi mạch bền vững.",
    "relatedEquation": "H₂N-(CH₂)₄-CH(NH₂)-COOH",
    "iupacName": "Lysine",
    "archetype": "BIOMOLECULE_VITAL",
    "structuredEffects": [
      {
        "effectId": "B06_EFF_53",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "HEAL_LP",
            "params": {
              "amount": 400
            }
          }
        ],
        "description": "Hồi 400 LP dinh dưỡng sinh học."
      }
    ]
  },
  {
    "id": "card_b06_054_glucose_54",
    "name": "Glucozo — Mạng Lưới Sinh Học (Cấu Trúc 54)",
    "name_en": "Glucose — Mạng Lưới Sinh Học Isolate 54",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "PYRO",
    "manaCost": 5,
    "level": 7,
    "atk": 2590,
    "def": 2670,
    "chemicalFormula": "C6H12O6",
    "effectCode": "ELEM_B06_GLUCOSE_VITAL_54",
    "effectText": "Khi có mặt trên sân: Hồi phục 300 LP cho người chơi sau mỗi lượt kết thúc (cân bằng nội môi).",
    "scientificLore": "Glucozo (C6H12O6) là hợp chất sinh học / polymer quan trọng trong chương trình Hóa học 12 GDPT 2018 với khả năng tạo liên kết hydro và chuỗi mạch bền vững.",
    "relatedEquation": "C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O",
    "iupacName": "Glucose",
    "archetype": "BIOMOLECULE_VITAL",
    "structuredEffects": [
      {
        "effectId": "B06_EFF_54",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "HEAL_LP",
            "params": {
              "amount": 400
            }
          }
        ],
        "description": "Hồi 400 LP dinh dưỡng sinh học."
      }
    ]
  },
  {
    "id": "card_b06_055_fructose_55",
    "name": "Fructozo — Mạng Lưới Sinh Học (Cấu Trúc 55)",
    "name_en": "Fructose — Mạng Lưới Sinh Học Isolate 55",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "PYRO",
    "manaCost": 1,
    "level": 2,
    "atk": 1540,
    "def": 1580,
    "chemicalFormula": "C6H12O6",
    "effectCode": "ELEM_B06_FRUCTOSE_VITAL_55",
    "effectText": "Khi có mặt trên sân: Hồi phục 300 LP cho người chơi sau mỗi lượt kết thúc (cân bằng nội môi).",
    "scientificLore": "Fructozo (C6H12O6) là hợp chất sinh học / polymer quan trọng trong chương trình Hóa học 12 GDPT 2018 với khả năng tạo liên kết hydro và chuỗi mạch bền vững.",
    "relatedEquation": "C₆H₁₂O₆ (Ketohexose Isomer)",
    "iupacName": "Fructose",
    "archetype": "BIOMOLECULE_VITAL",
    "structuredEffects": [
      {
        "effectId": "B06_EFF_55",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "HEAL_LP",
            "params": {
              "amount": 400
            }
          }
        ],
        "description": "Hồi 400 LP dinh dưỡng sinh học."
      }
    ]
  },
  {
    "id": "card_b06_056_sucrose_56",
    "name": "Saccarozo — Mạng Lưới Sinh Học (Cấu Trúc 56)",
    "name_en": "Sucrose — Mạng Lưới Sinh Học Isolate 56",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "TERRA",
    "manaCost": 2,
    "level": 3,
    "atk": 1560,
    "def": 1870,
    "chemicalFormula": "C12H22O11",
    "effectCode": "ELEM_B06_SUCROSE_VITAL_56",
    "effectText": "Khi có mặt trên sân: Hồi phục 300 LP cho người chơi sau mỗi lượt kết thúc (cân bằng nội môi).",
    "scientificLore": "Saccarozo (C12H22O11) là hợp chất sinh học / polymer quan trọng trong chương trình Hóa học 12 GDPT 2018 với khả năng tạo liên kết hydro và chuỗi mạch bền vững.",
    "relatedEquation": "C₁₂H₂₂O₁₁ + H₂O → C₆H₁₂O₆ + C₆H₁₂O₆",
    "iupacName": "Sucrose",
    "archetype": "BIOMOLECULE_VITAL",
    "structuredEffects": [
      {
        "effectId": "B06_EFF_56",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "HEAL_LP",
            "params": {
              "amount": 400
            }
          }
        ],
        "description": "Hồi 400 LP dinh dưỡng sinh học."
      }
    ]
  },
  {
    "id": "card_b06_057_polyethylene_57",
    "name": "Polyetylen — Mạng Lưới Sinh Học (Cấu Trúc 57)",
    "name_en": "Polyethylene — Mạng Lưới Sinh Học Isolate 57",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "TERRA",
    "manaCost": 3,
    "level": 4,
    "atk": 1830,
    "def": 1920,
    "chemicalFormula": "(-C2H4-)n",
    "effectCode": "ELEM_B06_POLYETHYLENE_VITAL_57",
    "effectText": "Liên kết chuỗi polymer cực đại: Không thể bị phá hủy bởi đòn tấn công đầu tiên trong mỗi lượt.",
    "scientificLore": "Polyetylen ((-C2H4-)n) là hợp chất sinh học / polymer quan trọng trong chương trình Hóa học 12 GDPT 2018 với khả năng tạo liên kết hydro và chuỗi mạch bền vững.",
    "relatedEquation": "nCH₂=CH₂ → (-CH₂-CH₂-)n",
    "iupacName": "Polyethylene",
    "archetype": "MACROMOLECULAR_POLYMER",
    "structuredEffects": [
      {
        "effectId": "B06_EFF_57",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "APPLY_STATUS",
            "params": {
              "statusType": "PASSIVATION"
            }
          }
        ],
        "description": "Bảo vệ màng polymer bền cơ học."
      }
    ]
  },
  {
    "id": "card_b06_058_polytetrafluoroethylene_58",
    "name": "Teflon — Mạng Lưới Sinh Học (Cấu Trúc 58)",
    "name_en": "Polytetrafluoroethylene — Mạng Lưới Sinh Học Isolate 58",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "NOBLE_VOID",
    "manaCost": 4,
    "level": 5,
    "atk": 2100,
    "def": 2210,
    "chemicalFormula": "(-C2F4-)n",
    "effectCode": "ELEM_B06_POLYTETRAFLUOROETHYLENE_VITAL_58",
    "effectText": "Liên kết chuỗi polymer cực đại: Không thể bị phá hủy bởi đòn tấn công đầu tiên trong mỗi lượt.",
    "scientificLore": "Teflon ((-C2F4-)n) là hợp chất sinh học / polymer quan trọng trong chương trình Hóa học 12 GDPT 2018 với khả năng tạo liên kết hydro và chuỗi mạch bền vững.",
    "relatedEquation": "nCF₂=CF₂ → (-CF₂-CF₂-)n",
    "iupacName": "Polytetrafluoroethylene",
    "archetype": "MACROMOLECULAR_POLYMER",
    "structuredEffects": [
      {
        "effectId": "B06_EFF_58",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "APPLY_STATUS",
            "params": {
              "statusType": "PASSIVATION"
            }
          }
        ],
        "description": "Bảo vệ màng polymer bền cơ học."
      }
    ]
  },
  {
    "id": "card_b06_059_nylon_66_59",
    "name": "Nylon-6,6 — Mạng Lưới Sinh Học (Cấu Trúc 59)",
    "name_en": "Nylon 66 — Mạng Lưới Sinh Học Isolate 59",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "TERRA",
    "manaCost": 5,
    "level": 6,
    "atk": 2370,
    "def": 2500,
    "chemicalFormula": "C12H22N2O2",
    "effectCode": "ELEM_B06_NYLON_66_VITAL_59",
    "effectText": "Liên kết chuỗi polymer cực đại: Không thể bị phá hủy bởi đòn tấn công đầu tiên trong mỗi lượt.",
    "scientificLore": "Nylon-6,6 (C12H22N2O2) là hợp chất sinh học / polymer quan trọng trong chương trình Hóa học 12 GDPT 2018 với khả năng tạo liên kết hydro và chuỗi mạch bền vững.",
    "relatedEquation": "nHexamethylenediamine + nAdipic Acid → Nylon-6,6 + 2nH₂O",
    "iupacName": "Nylon 66",
    "archetype": "MACROMOLECULAR_POLYMER",
    "structuredEffects": [
      {
        "effectId": "B06_EFF_59",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "APPLY_STATUS",
            "params": {
              "statusType": "PASSIVATION"
            }
          }
        ],
        "description": "Bảo vệ màng polymer bền cơ học."
      }
    ]
  },
  {
    "id": "card_b06_060_poly_paraphenylene_terephthalamide_60",
    "name": "Kevlar — Mạng Lưới Sinh Học (Cấu Trúc 60)",
    "name_en": "Poly-paraphenylene terephthalamide — Mạng Lưới Sinh Học Isolate 60",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "ULTRA_RARE",
    "attribute": "NOBLE_VOID",
    "manaCost": 5,
    "level": 7,
    "atk": 2640,
    "def": 2790,
    "chemicalFormula": "(-C14H10N2O2-)n",
    "effectCode": "ELEM_B06_POLY_PARAPHENYLENE_TEREPHTHALAMIDE_VITAL_60",
    "effectText": "Liên kết chuỗi polymer cực đại: Không thể bị phá hủy bởi đòn tấn công đầu tiên trong mỗi lượt.",
    "scientificLore": "Kevlar ((-C14H10N2O2-)n) là hợp chất sinh học / polymer quan trọng trong chương trình Hóa học 12 GDPT 2018 với khả năng tạo liên kết hydro và chuỗi mạch bền vững.",
    "relatedEquation": "1,4-phenylene-diamine + terephthaloyl chloride → Kevlar",
    "iupacName": "Poly-paraphenylene terephthalamide",
    "archetype": "MACROMOLECULAR_POLYMER",
    "structuredEffects": [
      {
        "effectId": "B06_EFF_60",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "APPLY_STATUS",
            "params": {
              "statusType": "PASSIVATION"
            }
          }
        ],
        "description": "Bảo vệ màng polymer bền cơ học."
      }
    ]
  },
  {
    "id": "card_b06_061_glycine_61",
    "name": "Glyxin — Hạt Nhân Sự Sống (Cấu Trúc 61)",
    "name_en": "Glycine — Hạt Nhân Sự Sống Isolate 61",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SECRET_RARE",
    "attribute": "TERRA",
    "manaCost": 1,
    "level": 2,
    "atk": 1340,
    "def": 1460,
    "chemicalFormula": "C2H5NO2",
    "effectCode": "ELEM_B06_GLYCINE_VITAL_61",
    "effectText": "Khi có mặt trên sân: Hồi phục 300 LP cho người chơi sau mỗi lượt kết thúc (cân bằng nội môi).",
    "scientificLore": "Glyxin (C2H5NO2) là hợp chất sinh học / polymer quan trọng trong chương trình Hóa học 12 GDPT 2018 với khả năng tạo liên kết hydro và chuỗi mạch bền vững.",
    "relatedEquation": "H₂N-CH₂-COOH ⇌ H₃N⁺-CH₂-COO⁻",
    "iupacName": "Glycine",
    "archetype": "BIOMOLECULE_VITAL",
    "structuredEffects": [
      {
        "effectId": "B06_EFF_61",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "HEAL_LP",
            "params": {
              "amount": 400
            }
          }
        ],
        "description": "Hồi 400 LP dinh dưỡng sinh học."
      }
    ]
  },
  {
    "id": "card_b06_062_alanine_62",
    "name": "Alanin — Hạt Nhân Sự Sống (Cấu Trúc 62)",
    "name_en": "Alanine — Hạt Nhân Sự Sống Isolate 62",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "TERRA",
    "manaCost": 2,
    "level": 3,
    "atk": 1610,
    "def": 1750,
    "chemicalFormula": "C3H7NO2",
    "effectCode": "ELEM_B06_ALANINE_VITAL_62",
    "effectText": "Khi có mặt trên sân: Hồi phục 300 LP cho người chơi sau mỗi lượt kết thúc (cân bằng nội môi).",
    "scientificLore": "Alanin (C3H7NO2) là hợp chất sinh học / polymer quan trọng trong chương trình Hóa học 12 GDPT 2018 với khả năng tạo liên kết hydro và chuỗi mạch bền vững.",
    "relatedEquation": "CH₃-CH(NH₂)-COOH ⇌ CH₃-CH(NH₃⁺)-COO⁻",
    "iupacName": "Alanine",
    "archetype": "BIOMOLECULE_VITAL",
    "structuredEffects": [
      {
        "effectId": "B06_EFF_62",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "HEAL_LP",
            "params": {
              "amount": 400
            }
          }
        ],
        "description": "Hồi 400 LP dinh dưỡng sinh học."
      }
    ]
  },
  {
    "id": "card_b06_063_valine_63",
    "name": "Valin — Hạt Nhân Sự Sống (Cấu Trúc 63)",
    "name_en": "Valine — Hạt Nhân Sự Sống Isolate 63",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "TERRA",
    "manaCost": 3,
    "level": 4,
    "atk": 1880,
    "def": 2040,
    "chemicalFormula": "C5H11NO2",
    "effectCode": "ELEM_B06_VALINE_VITAL_63",
    "effectText": "Khi có mặt trên sân: Hồi phục 300 LP cho người chơi sau mỗi lượt kết thúc (cân bằng nội môi).",
    "scientificLore": "Valin (C5H11NO2) là hợp chất sinh học / polymer quan trọng trong chương trình Hóa học 12 GDPT 2018 với khả năng tạo liên kết hydro và chuỗi mạch bền vững.",
    "relatedEquation": "(CH₃)₂CH-CH(NH₂)-COOH",
    "iupacName": "Valine",
    "archetype": "BIOMOLECULE_VITAL",
    "structuredEffects": [
      {
        "effectId": "B06_EFF_63",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "HEAL_LP",
            "params": {
              "amount": 400
            }
          }
        ],
        "description": "Hồi 400 LP dinh dưỡng sinh học."
      }
    ]
  },
  {
    "id": "card_b06_064_glutamic_acid_64",
    "name": "Axit Glutamic — Hạt Nhân Sự Sống (Cấu Trúc 64)",
    "name_en": "Glutamic Acid — Hạt Nhân Sự Sống Isolate 64",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "ACID_DARK",
    "manaCost": 4,
    "level": 5,
    "atk": 2150,
    "def": 2330,
    "chemicalFormula": "C5H9NO4",
    "effectCode": "ELEM_B06_GLUTAMIC_ACID_VITAL_64",
    "effectText": "Khi có mặt trên sân: Hồi phục 300 LP cho người chơi sau mỗi lượt kết thúc (cân bằng nội môi).",
    "scientificLore": "Axit Glutamic (C5H9NO4) là hợp chất sinh học / polymer quan trọng trong chương trình Hóa học 12 GDPT 2018 với khả năng tạo liên kết hydro và chuỗi mạch bền vững.",
    "relatedEquation": "HOOC-(CH₂)₂-CH(NH₂)-COOH",
    "iupacName": "Glutamic Acid",
    "archetype": "BIOMOLECULE_VITAL",
    "structuredEffects": [
      {
        "effectId": "B06_EFF_64",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "HEAL_LP",
            "params": {
              "amount": 400
            }
          }
        ],
        "description": "Hồi 400 LP dinh dưỡng sinh học."
      }
    ]
  },
  {
    "id": "card_b06_065_lysine_65",
    "name": "Lysin — Hạt Nhân Sự Sống (Cấu Trúc 65)",
    "name_en": "Lysine — Hạt Nhân Sự Sống Isolate 65",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "AQUA",
    "manaCost": 5,
    "level": 6,
    "atk": 2420,
    "def": 2380,
    "chemicalFormula": "C6H14N2O2",
    "effectCode": "ELEM_B06_LYSINE_VITAL_65",
    "effectText": "Khi có mặt trên sân: Hồi phục 300 LP cho người chơi sau mỗi lượt kết thúc (cân bằng nội môi).",
    "scientificLore": "Lysin (C6H14N2O2) là hợp chất sinh học / polymer quan trọng trong chương trình Hóa học 12 GDPT 2018 với khả năng tạo liên kết hydro và chuỗi mạch bền vững.",
    "relatedEquation": "H₂N-(CH₂)₄-CH(NH₂)-COOH",
    "iupacName": "Lysine",
    "archetype": "BIOMOLECULE_VITAL",
    "structuredEffects": [
      {
        "effectId": "B06_EFF_65",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "HEAL_LP",
            "params": {
              "amount": 400
            }
          }
        ],
        "description": "Hồi 400 LP dinh dưỡng sinh học."
      }
    ]
  },
  {
    "id": "card_b06_066_glucose_66",
    "name": "Glucozo — Hạt Nhân Sự Sống (Cấu Trúc 66)",
    "name_en": "Glucose — Hạt Nhân Sự Sống Isolate 66",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "PYRO",
    "manaCost": 5,
    "level": 7,
    "atk": 2440,
    "def": 2670,
    "chemicalFormula": "C6H12O6",
    "effectCode": "ELEM_B06_GLUCOSE_VITAL_66",
    "effectText": "Khi có mặt trên sân: Hồi phục 300 LP cho người chơi sau mỗi lượt kết thúc (cân bằng nội môi).",
    "scientificLore": "Glucozo (C6H12O6) là hợp chất sinh học / polymer quan trọng trong chương trình Hóa học 12 GDPT 2018 với khả năng tạo liên kết hydro và chuỗi mạch bền vững.",
    "relatedEquation": "C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O",
    "iupacName": "Glucose",
    "archetype": "BIOMOLECULE_VITAL",
    "structuredEffects": [
      {
        "effectId": "B06_EFF_66",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "HEAL_LP",
            "params": {
              "amount": 400
            }
          }
        ],
        "description": "Hồi 400 LP dinh dưỡng sinh học."
      }
    ]
  },
  {
    "id": "card_b06_067_fructose_67",
    "name": "Fructozo — Hạt Nhân Sự Sống (Cấu Trúc 67)",
    "name_en": "Fructose — Hạt Nhân Sự Sống Isolate 67",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "PYRO",
    "manaCost": 1,
    "level": 2,
    "atk": 1390,
    "def": 1580,
    "chemicalFormula": "C6H12O6",
    "effectCode": "ELEM_B06_FRUCTOSE_VITAL_67",
    "effectText": "Khi có mặt trên sân: Hồi phục 300 LP cho người chơi sau mỗi lượt kết thúc (cân bằng nội môi).",
    "scientificLore": "Fructozo (C6H12O6) là hợp chất sinh học / polymer quan trọng trong chương trình Hóa học 12 GDPT 2018 với khả năng tạo liên kết hydro và chuỗi mạch bền vững.",
    "relatedEquation": "C₆H₁₂O₆ (Ketohexose Isomer)",
    "iupacName": "Fructose",
    "archetype": "BIOMOLECULE_VITAL",
    "structuredEffects": [
      {
        "effectId": "B06_EFF_67",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "HEAL_LP",
            "params": {
              "amount": 400
            }
          }
        ],
        "description": "Hồi 400 LP dinh dưỡng sinh học."
      }
    ]
  },
  {
    "id": "card_b06_068_sucrose_68",
    "name": "Saccarozo — Hạt Nhân Sự Sống (Cấu Trúc 68)",
    "name_en": "Sucrose — Hạt Nhân Sự Sống Isolate 68",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "TERRA",
    "manaCost": 2,
    "level": 3,
    "atk": 1660,
    "def": 1870,
    "chemicalFormula": "C12H22O11",
    "effectCode": "ELEM_B06_SUCROSE_VITAL_68",
    "effectText": "Khi có mặt trên sân: Hồi phục 300 LP cho người chơi sau mỗi lượt kết thúc (cân bằng nội môi).",
    "scientificLore": "Saccarozo (C12H22O11) là hợp chất sinh học / polymer quan trọng trong chương trình Hóa học 12 GDPT 2018 với khả năng tạo liên kết hydro và chuỗi mạch bền vững.",
    "relatedEquation": "C₁₂H₂₂O₁₁ + H₂O → C₆H₁₂O₆ + C₆H₁₂O₆",
    "iupacName": "Sucrose",
    "archetype": "BIOMOLECULE_VITAL",
    "structuredEffects": [
      {
        "effectId": "B06_EFF_68",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "HEAL_LP",
            "params": {
              "amount": 400
            }
          }
        ],
        "description": "Hồi 400 LP dinh dưỡng sinh học."
      }
    ]
  },
  {
    "id": "card_b06_069_polyethylene_69",
    "name": "Polyetylen — Hạt Nhân Sự Sống (Cấu Trúc 69)",
    "name_en": "Polyethylene — Hạt Nhân Sự Sống Isolate 69",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "ULTRA_RARE",
    "attribute": "TERRA",
    "manaCost": 3,
    "level": 4,
    "atk": 1930,
    "def": 1920,
    "chemicalFormula": "(-C2H4-)n",
    "effectCode": "ELEM_B06_POLYETHYLENE_VITAL_69",
    "effectText": "Liên kết chuỗi polymer cực đại: Không thể bị phá hủy bởi đòn tấn công đầu tiên trong mỗi lượt.",
    "scientificLore": "Polyetylen ((-C2H4-)n) là hợp chất sinh học / polymer quan trọng trong chương trình Hóa học 12 GDPT 2018 với khả năng tạo liên kết hydro và chuỗi mạch bền vững.",
    "relatedEquation": "nCH₂=CH₂ → (-CH₂-CH₂-)n",
    "iupacName": "Polyethylene",
    "archetype": "MACROMOLECULAR_POLYMER",
    "structuredEffects": [
      {
        "effectId": "B06_EFF_69",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "APPLY_STATUS",
            "params": {
              "statusType": "PASSIVATION"
            }
          }
        ],
        "description": "Bảo vệ màng polymer bền cơ học."
      }
    ]
  },
  {
    "id": "card_b06_070_polytetrafluoroethylene_70",
    "name": "Teflon — Hạt Nhân Sự Sống (Cấu Trúc 70)",
    "name_en": "Polytetrafluoroethylene — Hạt Nhân Sự Sống Isolate 70",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SECRET_RARE",
    "attribute": "NOBLE_VOID",
    "manaCost": 4,
    "level": 5,
    "atk": 2200,
    "def": 2210,
    "chemicalFormula": "(-C2F4-)n",
    "effectCode": "ELEM_B06_POLYTETRAFLUOROETHYLENE_VITAL_70",
    "effectText": "Liên kết chuỗi polymer cực đại: Không thể bị phá hủy bởi đòn tấn công đầu tiên trong mỗi lượt.",
    "scientificLore": "Teflon ((-C2F4-)n) là hợp chất sinh học / polymer quan trọng trong chương trình Hóa học 12 GDPT 2018 với khả năng tạo liên kết hydro và chuỗi mạch bền vững.",
    "relatedEquation": "nCF₂=CF₂ → (-CF₂-CF₂-)n",
    "iupacName": "Polytetrafluoroethylene",
    "archetype": "MACROMOLECULAR_POLYMER",
    "structuredEffects": [
      {
        "effectId": "B06_EFF_70",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "APPLY_STATUS",
            "params": {
              "statusType": "PASSIVATION"
            }
          }
        ],
        "description": "Bảo vệ màng polymer bền cơ học."
      }
    ]
  },
  {
    "id": "card_b06_071_nylon_66_71",
    "name": "Nylon-6,6 — Hạt Nhân Sự Sống (Cấu Trúc 71)",
    "name_en": "Nylon 66 — Hạt Nhân Sự Sống Isolate 71",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "TERRA",
    "manaCost": 5,
    "level": 6,
    "atk": 2220,
    "def": 2500,
    "chemicalFormula": "C12H22N2O2",
    "effectCode": "ELEM_B06_NYLON_66_VITAL_71",
    "effectText": "Liên kết chuỗi polymer cực đại: Không thể bị phá hủy bởi đòn tấn công đầu tiên trong mỗi lượt.",
    "scientificLore": "Nylon-6,6 (C12H22N2O2) là hợp chất sinh học / polymer quan trọng trong chương trình Hóa học 12 GDPT 2018 với khả năng tạo liên kết hydro và chuỗi mạch bền vững.",
    "relatedEquation": "nHexamethylenediamine + nAdipic Acid → Nylon-6,6 + 2nH₂O",
    "iupacName": "Nylon 66",
    "archetype": "MACROMOLECULAR_POLYMER",
    "structuredEffects": [
      {
        "effectId": "B06_EFF_71",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "APPLY_STATUS",
            "params": {
              "statusType": "PASSIVATION"
            }
          }
        ],
        "description": "Bảo vệ màng polymer bền cơ học."
      }
    ]
  },
  {
    "id": "card_b06_072_poly_paraphenylene_terephthalamide_72",
    "name": "Kevlar — Hạt Nhân Sự Sống (Cấu Trúc 72)",
    "name_en": "Poly-paraphenylene terephthalamide — Hạt Nhân Sự Sống Isolate 72",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "NOBLE_VOID",
    "manaCost": 5,
    "level": 7,
    "atk": 2490,
    "def": 2790,
    "chemicalFormula": "(-C14H10N2O2-)n",
    "effectCode": "ELEM_B06_POLY_PARAPHENYLENE_TEREPHTHALAMIDE_VITAL_72",
    "effectText": "Liên kết chuỗi polymer cực đại: Không thể bị phá hủy bởi đòn tấn công đầu tiên trong mỗi lượt.",
    "scientificLore": "Kevlar ((-C14H10N2O2-)n) là hợp chất sinh học / polymer quan trọng trong chương trình Hóa học 12 GDPT 2018 với khả năng tạo liên kết hydro và chuỗi mạch bền vững.",
    "relatedEquation": "1,4-phenylene-diamine + terephthaloyl chloride → Kevlar",
    "iupacName": "Poly-paraphenylene terephthalamide",
    "archetype": "MACROMOLECULAR_POLYMER",
    "structuredEffects": [
      {
        "effectId": "B06_EFF_72",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "APPLY_STATUS",
            "params": {
              "statusType": "PASSIVATION"
            }
          }
        ],
        "description": "Bảo vệ màng polymer bền cơ học."
      }
    ]
  },
  {
    "id": "card_b06_073_glycine_73",
    "name": "Glyxin — Chuỗi Đại Phân Tử (Cấu Trúc 73)",
    "name_en": "Glycine — Chuỗi Đại Phân Tử Isolate 73",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "TERRA",
    "manaCost": 1,
    "level": 2,
    "atk": 1440,
    "def": 1460,
    "chemicalFormula": "C2H5NO2",
    "effectCode": "ELEM_B06_GLYCINE_VITAL_73",
    "effectText": "Khi có mặt trên sân: Hồi phục 300 LP cho người chơi sau mỗi lượt kết thúc (cân bằng nội môi).",
    "scientificLore": "Glyxin (C2H5NO2) là hợp chất sinh học / polymer quan trọng trong chương trình Hóa học 12 GDPT 2018 với khả năng tạo liên kết hydro và chuỗi mạch bền vững.",
    "relatedEquation": "H₂N-CH₂-COOH ⇌ H₃N⁺-CH₂-COO⁻",
    "iupacName": "Glycine",
    "archetype": "BIOMOLECULE_VITAL",
    "structuredEffects": [
      {
        "effectId": "B06_EFF_73",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "HEAL_LP",
            "params": {
              "amount": 400
            }
          }
        ],
        "description": "Hồi 400 LP dinh dưỡng sinh học."
      }
    ]
  },
  {
    "id": "card_b06_074_alanine_74",
    "name": "Alanin — Chuỗi Đại Phân Tử (Cấu Trúc 74)",
    "name_en": "Alanine — Chuỗi Đại Phân Tử Isolate 74",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "TERRA",
    "manaCost": 2,
    "level": 3,
    "atk": 1710,
    "def": 1750,
    "chemicalFormula": "C3H7NO2",
    "effectCode": "ELEM_B06_ALANINE_VITAL_74",
    "effectText": "Khi có mặt trên sân: Hồi phục 300 LP cho người chơi sau mỗi lượt kết thúc (cân bằng nội môi).",
    "scientificLore": "Alanin (C3H7NO2) là hợp chất sinh học / polymer quan trọng trong chương trình Hóa học 12 GDPT 2018 với khả năng tạo liên kết hydro và chuỗi mạch bền vững.",
    "relatedEquation": "CH₃-CH(NH₂)-COOH ⇌ CH₃-CH(NH₃⁺)-COO⁻",
    "iupacName": "Alanine",
    "archetype": "BIOMOLECULE_VITAL",
    "structuredEffects": [
      {
        "effectId": "B06_EFF_74",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "HEAL_LP",
            "params": {
              "amount": 400
            }
          }
        ],
        "description": "Hồi 400 LP dinh dưỡng sinh học."
      }
    ]
  },
  {
    "id": "card_b06_075_valine_75",
    "name": "Valin — Chuỗi Đại Phân Tử (Cấu Trúc 75)",
    "name_en": "Valine — Chuỗi Đại Phân Tử Isolate 75",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "TERRA",
    "manaCost": 3,
    "level": 4,
    "atk": 1980,
    "def": 2040,
    "chemicalFormula": "C5H11NO2",
    "effectCode": "ELEM_B06_VALINE_VITAL_75",
    "effectText": "Khi có mặt trên sân: Hồi phục 300 LP cho người chơi sau mỗi lượt kết thúc (cân bằng nội môi).",
    "scientificLore": "Valin (C5H11NO2) là hợp chất sinh học / polymer quan trọng trong chương trình Hóa học 12 GDPT 2018 với khả năng tạo liên kết hydro và chuỗi mạch bền vững.",
    "relatedEquation": "(CH₃)₂CH-CH(NH₂)-COOH",
    "iupacName": "Valine",
    "archetype": "BIOMOLECULE_VITAL",
    "structuredEffects": [
      {
        "effectId": "B06_EFF_75",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "HEAL_LP",
            "params": {
              "amount": 400
            }
          }
        ],
        "description": "Hồi 400 LP dinh dưỡng sinh học."
      }
    ]
  },
  {
    "id": "card_b06_076_glutamic_acid_76",
    "name": "Axit Glutamic — Chuỗi Đại Phân Tử (Cấu Trúc 76)",
    "name_en": "Glutamic Acid — Chuỗi Đại Phân Tử Isolate 76",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "ACID_DARK",
    "manaCost": 4,
    "level": 5,
    "atk": 2000,
    "def": 2330,
    "chemicalFormula": "C5H9NO4",
    "effectCode": "ELEM_B06_GLUTAMIC_ACID_VITAL_76",
    "effectText": "Khi có mặt trên sân: Hồi phục 300 LP cho người chơi sau mỗi lượt kết thúc (cân bằng nội môi).",
    "scientificLore": "Axit Glutamic (C5H9NO4) là hợp chất sinh học / polymer quan trọng trong chương trình Hóa học 12 GDPT 2018 với khả năng tạo liên kết hydro và chuỗi mạch bền vững.",
    "relatedEquation": "HOOC-(CH₂)₂-CH(NH₂)-COOH",
    "iupacName": "Glutamic Acid",
    "archetype": "BIOMOLECULE_VITAL",
    "structuredEffects": [
      {
        "effectId": "B06_EFF_76",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "HEAL_LP",
            "params": {
              "amount": 400
            }
          }
        ],
        "description": "Hồi 400 LP dinh dưỡng sinh học."
      }
    ]
  },
  {
    "id": "card_b06_077_lysine_77",
    "name": "Lysin — Chuỗi Đại Phân Tử (Cấu Trúc 77)",
    "name_en": "Lysine — Chuỗi Đại Phân Tử Isolate 77",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "AQUA",
    "manaCost": 5,
    "level": 6,
    "atk": 2270,
    "def": 2380,
    "chemicalFormula": "C6H14N2O2",
    "effectCode": "ELEM_B06_LYSINE_VITAL_77",
    "effectText": "Khi có mặt trên sân: Hồi phục 300 LP cho người chơi sau mỗi lượt kết thúc (cân bằng nội môi).",
    "scientificLore": "Lysin (C6H14N2O2) là hợp chất sinh học / polymer quan trọng trong chương trình Hóa học 12 GDPT 2018 với khả năng tạo liên kết hydro và chuỗi mạch bền vững.",
    "relatedEquation": "H₂N-(CH₂)₄-CH(NH₂)-COOH",
    "iupacName": "Lysine",
    "archetype": "BIOMOLECULE_VITAL",
    "structuredEffects": [
      {
        "effectId": "B06_EFF_77",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "HEAL_LP",
            "params": {
              "amount": 400
            }
          }
        ],
        "description": "Hồi 400 LP dinh dưỡng sinh học."
      }
    ]
  },
  {
    "id": "card_b06_078_glucose_78",
    "name": "Glucozo — Chuỗi Đại Phân Tử (Cấu Trúc 78)",
    "name_en": "Glucose — Chuỗi Đại Phân Tử Isolate 78",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "ULTRA_RARE",
    "attribute": "PYRO",
    "manaCost": 5,
    "level": 7,
    "atk": 2540,
    "def": 2670,
    "chemicalFormula": "C6H12O6",
    "effectCode": "ELEM_B06_GLUCOSE_VITAL_78",
    "effectText": "Khi có mặt trên sân: Hồi phục 300 LP cho người chơi sau mỗi lượt kết thúc (cân bằng nội môi).",
    "scientificLore": "Glucozo (C6H12O6) là hợp chất sinh học / polymer quan trọng trong chương trình Hóa học 12 GDPT 2018 với khả năng tạo liên kết hydro và chuỗi mạch bền vững.",
    "relatedEquation": "C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O",
    "iupacName": "Glucose",
    "archetype": "BIOMOLECULE_VITAL",
    "structuredEffects": [
      {
        "effectId": "B06_EFF_78",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "HEAL_LP",
            "params": {
              "amount": 400
            }
          }
        ],
        "description": "Hồi 400 LP dinh dưỡng sinh học."
      }
    ]
  },
  {
    "id": "card_b06_079_fructose_79",
    "name": "Fructozo — Chuỗi Đại Phân Tử (Cấu Trúc 79)",
    "name_en": "Fructose — Chuỗi Đại Phân Tử Isolate 79",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SECRET_RARE",
    "attribute": "PYRO",
    "manaCost": 1,
    "level": 2,
    "atk": 1490,
    "def": 1580,
    "chemicalFormula": "C6H12O6",
    "effectCode": "ELEM_B06_FRUCTOSE_VITAL_79",
    "effectText": "Khi có mặt trên sân: Hồi phục 300 LP cho người chơi sau mỗi lượt kết thúc (cân bằng nội môi).",
    "scientificLore": "Fructozo (C6H12O6) là hợp chất sinh học / polymer quan trọng trong chương trình Hóa học 12 GDPT 2018 với khả năng tạo liên kết hydro và chuỗi mạch bền vững.",
    "relatedEquation": "C₆H₁₂O₆ (Ketohexose Isomer)",
    "iupacName": "Fructose",
    "archetype": "BIOMOLECULE_VITAL",
    "structuredEffects": [
      {
        "effectId": "B06_EFF_79",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "HEAL_LP",
            "params": {
              "amount": 400
            }
          }
        ],
        "description": "Hồi 400 LP dinh dưỡng sinh học."
      }
    ]
  },
  {
    "id": "card_b06_080_sucrose_80",
    "name": "Saccarozo — Chuỗi Đại Phân Tử (Cấu Trúc 80)",
    "name_en": "Sucrose — Chuỗi Đại Phân Tử Isolate 80",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "TERRA",
    "manaCost": 2,
    "level": 3,
    "atk": 1760,
    "def": 1870,
    "chemicalFormula": "C12H22O11",
    "effectCode": "ELEM_B06_SUCROSE_VITAL_80",
    "effectText": "Khi có mặt trên sân: Hồi phục 300 LP cho người chơi sau mỗi lượt kết thúc (cân bằng nội môi).",
    "scientificLore": "Saccarozo (C12H22O11) là hợp chất sinh học / polymer quan trọng trong chương trình Hóa học 12 GDPT 2018 với khả năng tạo liên kết hydro và chuỗi mạch bền vững.",
    "relatedEquation": "C₁₂H₂₂O₁₁ + H₂O → C₆H₁₂O₆ + C₆H₁₂O₆",
    "iupacName": "Sucrose",
    "archetype": "BIOMOLECULE_VITAL",
    "structuredEffects": [
      {
        "effectId": "B06_EFF_80",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "HEAL_LP",
            "params": {
              "amount": 400
            }
          }
        ],
        "description": "Hồi 400 LP dinh dưỡng sinh học."
      }
    ]
  },
  {
    "id": "card_b06_081_polyethylene_81",
    "name": "Polyetylen — Chuỗi Đại Phân Tử (Cấu Trúc 81)",
    "name_en": "Polyethylene — Chuỗi Đại Phân Tử Isolate 81",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "TERRA",
    "manaCost": 3,
    "level": 4,
    "atk": 1780,
    "def": 1920,
    "chemicalFormula": "(-C2H4-)n",
    "effectCode": "ELEM_B06_POLYETHYLENE_VITAL_81",
    "effectText": "Liên kết chuỗi polymer cực đại: Không thể bị phá hủy bởi đòn tấn công đầu tiên trong mỗi lượt.",
    "scientificLore": "Polyetylen ((-C2H4-)n) là hợp chất sinh học / polymer quan trọng trong chương trình Hóa học 12 GDPT 2018 với khả năng tạo liên kết hydro và chuỗi mạch bền vững.",
    "relatedEquation": "nCH₂=CH₂ → (-CH₂-CH₂-)n",
    "iupacName": "Polyethylene",
    "archetype": "MACROMOLECULAR_POLYMER",
    "structuredEffects": [
      {
        "effectId": "B06_EFF_81",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "APPLY_STATUS",
            "params": {
              "statusType": "PASSIVATION"
            }
          }
        ],
        "description": "Bảo vệ màng polymer bền cơ học."
      }
    ]
  },
  {
    "id": "card_b06_082_polytetrafluoroethylene_82",
    "name": "Teflon — Chuỗi Đại Phân Tử (Cấu Trúc 82)",
    "name_en": "Polytetrafluoroethylene — Chuỗi Đại Phân Tử Isolate 82",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "NOBLE_VOID",
    "manaCost": 4,
    "level": 5,
    "atk": 2050,
    "def": 2210,
    "chemicalFormula": "(-C2F4-)n",
    "effectCode": "ELEM_B06_POLYTETRAFLUOROETHYLENE_VITAL_82",
    "effectText": "Liên kết chuỗi polymer cực đại: Không thể bị phá hủy bởi đòn tấn công đầu tiên trong mỗi lượt.",
    "scientificLore": "Teflon ((-C2F4-)n) là hợp chất sinh học / polymer quan trọng trong chương trình Hóa học 12 GDPT 2018 với khả năng tạo liên kết hydro và chuỗi mạch bền vững.",
    "relatedEquation": "nCF₂=CF₂ → (-CF₂-CF₂-)n",
    "iupacName": "Polytetrafluoroethylene",
    "archetype": "MACROMOLECULAR_POLYMER",
    "structuredEffects": [
      {
        "effectId": "B06_EFF_82",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "APPLY_STATUS",
            "params": {
              "statusType": "PASSIVATION"
            }
          }
        ],
        "description": "Bảo vệ màng polymer bền cơ học."
      }
    ]
  },
  {
    "id": "card_b06_083_nylon_66_83",
    "name": "Nylon-6,6 — Chuỗi Đại Phân Tử (Cấu Trúc 83)",
    "name_en": "Nylon 66 — Chuỗi Đại Phân Tử Isolate 83",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "TERRA",
    "manaCost": 5,
    "level": 6,
    "atk": 2320,
    "def": 2500,
    "chemicalFormula": "C12H22N2O2",
    "effectCode": "ELEM_B06_NYLON_66_VITAL_83",
    "effectText": "Liên kết chuỗi polymer cực đại: Không thể bị phá hủy bởi đòn tấn công đầu tiên trong mỗi lượt.",
    "scientificLore": "Nylon-6,6 (C12H22N2O2) là hợp chất sinh học / polymer quan trọng trong chương trình Hóa học 12 GDPT 2018 với khả năng tạo liên kết hydro và chuỗi mạch bền vững.",
    "relatedEquation": "nHexamethylenediamine + nAdipic Acid → Nylon-6,6 + 2nH₂O",
    "iupacName": "Nylon 66",
    "archetype": "MACROMOLECULAR_POLYMER",
    "structuredEffects": [
      {
        "effectId": "B06_EFF_83",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "APPLY_STATUS",
            "params": {
              "statusType": "PASSIVATION"
            }
          }
        ],
        "description": "Bảo vệ màng polymer bền cơ học."
      }
    ]
  },
  {
    "id": "card_b06_084_poly_paraphenylene_terephthalamide_84",
    "name": "Kevlar — Chuỗi Đại Phân Tử (Cấu Trúc 84)",
    "name_en": "Poly-paraphenylene terephthalamide — Chuỗi Đại Phân Tử Isolate 84",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "NOBLE_VOID",
    "manaCost": 5,
    "level": 7,
    "atk": 2590,
    "def": 2790,
    "chemicalFormula": "(-C14H10N2O2-)n",
    "effectCode": "ELEM_B06_POLY_PARAPHENYLENE_TEREPHTHALAMIDE_VITAL_84",
    "effectText": "Liên kết chuỗi polymer cực đại: Không thể bị phá hủy bởi đòn tấn công đầu tiên trong mỗi lượt.",
    "scientificLore": "Kevlar ((-C14H10N2O2-)n) là hợp chất sinh học / polymer quan trọng trong chương trình Hóa học 12 GDPT 2018 với khả năng tạo liên kết hydro và chuỗi mạch bền vững.",
    "relatedEquation": "1,4-phenylene-diamine + terephthaloyl chloride → Kevlar",
    "iupacName": "Poly-paraphenylene terephthalamide",
    "archetype": "MACROMOLECULAR_POLYMER",
    "structuredEffects": [
      {
        "effectId": "B06_EFF_84",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "APPLY_STATUS",
            "params": {
              "statusType": "PASSIVATION"
            }
          }
        ],
        "description": "Bảo vệ màng polymer bền cơ học."
      }
    ]
  },
  {
    "id": "card_b06_085_glycine_85",
    "name": "Glyxin — Khối Kháng Sinh (Cấu Trúc 85)",
    "name_en": "Glycine — Khối Kháng Sinh Isolate 85",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "TERRA",
    "manaCost": 1,
    "level": 2,
    "atk": 1540,
    "def": 1460,
    "chemicalFormula": "C2H5NO2",
    "effectCode": "ELEM_B06_GLYCINE_VITAL_85",
    "effectText": "Khi có mặt trên sân: Hồi phục 300 LP cho người chơi sau mỗi lượt kết thúc (cân bằng nội môi).",
    "scientificLore": "Glyxin (C2H5NO2) là hợp chất sinh học / polymer quan trọng trong chương trình Hóa học 12 GDPT 2018 với khả năng tạo liên kết hydro và chuỗi mạch bền vững.",
    "relatedEquation": "H₂N-CH₂-COOH ⇌ H₃N⁺-CH₂-COO⁻",
    "iupacName": "Glycine",
    "archetype": "BIOMOLECULE_VITAL",
    "structuredEffects": [
      {
        "effectId": "B06_EFF_85",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "HEAL_LP",
            "params": {
              "amount": 400
            }
          }
        ],
        "description": "Hồi 400 LP dinh dưỡng sinh học."
      }
    ]
  },
  {
    "id": "card_b06_086_alanine_86",
    "name": "Alanin — Khối Kháng Sinh (Cấu Trúc 86)",
    "name_en": "Alanine — Khối Kháng Sinh Isolate 86",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "TERRA",
    "manaCost": 2,
    "level": 3,
    "atk": 1560,
    "def": 1750,
    "chemicalFormula": "C3H7NO2",
    "effectCode": "ELEM_B06_ALANINE_VITAL_86",
    "effectText": "Khi có mặt trên sân: Hồi phục 300 LP cho người chơi sau mỗi lượt kết thúc (cân bằng nội môi).",
    "scientificLore": "Alanin (C3H7NO2) là hợp chất sinh học / polymer quan trọng trong chương trình Hóa học 12 GDPT 2018 với khả năng tạo liên kết hydro và chuỗi mạch bền vững.",
    "relatedEquation": "CH₃-CH(NH₂)-COOH ⇌ CH₃-CH(NH₃⁺)-COO⁻",
    "iupacName": "Alanine",
    "archetype": "BIOMOLECULE_VITAL",
    "structuredEffects": [
      {
        "effectId": "B06_EFF_86",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "HEAL_LP",
            "params": {
              "amount": 400
            }
          }
        ],
        "description": "Hồi 400 LP dinh dưỡng sinh học."
      }
    ]
  },
  {
    "id": "card_b06_087_valine_87",
    "name": "Valin — Khối Kháng Sinh (Cấu Trúc 87)",
    "name_en": "Valine — Khối Kháng Sinh Isolate 87",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "ULTRA_RARE",
    "attribute": "TERRA",
    "manaCost": 3,
    "level": 4,
    "atk": 1830,
    "def": 2040,
    "chemicalFormula": "C5H11NO2",
    "effectCode": "ELEM_B06_VALINE_VITAL_87",
    "effectText": "Khi có mặt trên sân: Hồi phục 300 LP cho người chơi sau mỗi lượt kết thúc (cân bằng nội môi).",
    "scientificLore": "Valin (C5H11NO2) là hợp chất sinh học / polymer quan trọng trong chương trình Hóa học 12 GDPT 2018 với khả năng tạo liên kết hydro và chuỗi mạch bền vững.",
    "relatedEquation": "(CH₃)₂CH-CH(NH₂)-COOH",
    "iupacName": "Valine",
    "archetype": "BIOMOLECULE_VITAL",
    "structuredEffects": [
      {
        "effectId": "B06_EFF_87",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "HEAL_LP",
            "params": {
              "amount": 400
            }
          }
        ],
        "description": "Hồi 400 LP dinh dưỡng sinh học."
      }
    ]
  },
  {
    "id": "card_b06_088_glutamic_acid_88",
    "name": "Axit Glutamic — Khối Kháng Sinh (Cấu Trúc 88)",
    "name_en": "Glutamic Acid — Khối Kháng Sinh Isolate 88",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SECRET_RARE",
    "attribute": "ACID_DARK",
    "manaCost": 4,
    "level": 5,
    "atk": 2100,
    "def": 2330,
    "chemicalFormula": "C5H9NO4",
    "effectCode": "ELEM_B06_GLUTAMIC_ACID_VITAL_88",
    "effectText": "Khi có mặt trên sân: Hồi phục 300 LP cho người chơi sau mỗi lượt kết thúc (cân bằng nội môi).",
    "scientificLore": "Axit Glutamic (C5H9NO4) là hợp chất sinh học / polymer quan trọng trong chương trình Hóa học 12 GDPT 2018 với khả năng tạo liên kết hydro và chuỗi mạch bền vững.",
    "relatedEquation": "HOOC-(CH₂)₂-CH(NH₂)-COOH",
    "iupacName": "Glutamic Acid",
    "archetype": "BIOMOLECULE_VITAL",
    "structuredEffects": [
      {
        "effectId": "B06_EFF_88",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "HEAL_LP",
            "params": {
              "amount": 400
            }
          }
        ],
        "description": "Hồi 400 LP dinh dưỡng sinh học."
      }
    ]
  },
  {
    "id": "card_b06_089_lysine_89",
    "name": "Lysin — Khối Kháng Sinh (Cấu Trúc 89)",
    "name_en": "Lysine — Khối Kháng Sinh Isolate 89",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "AQUA",
    "manaCost": 5,
    "level": 6,
    "atk": 2370,
    "def": 2380,
    "chemicalFormula": "C6H14N2O2",
    "effectCode": "ELEM_B06_LYSINE_VITAL_89",
    "effectText": "Khi có mặt trên sân: Hồi phục 300 LP cho người chơi sau mỗi lượt kết thúc (cân bằng nội môi).",
    "scientificLore": "Lysin (C6H14N2O2) là hợp chất sinh học / polymer quan trọng trong chương trình Hóa học 12 GDPT 2018 với khả năng tạo liên kết hydro và chuỗi mạch bền vững.",
    "relatedEquation": "H₂N-(CH₂)₄-CH(NH₂)-COOH",
    "iupacName": "Lysine",
    "archetype": "BIOMOLECULE_VITAL",
    "structuredEffects": [
      {
        "effectId": "B06_EFF_89",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "HEAL_LP",
            "params": {
              "amount": 400
            }
          }
        ],
        "description": "Hồi 400 LP dinh dưỡng sinh học."
      }
    ]
  },
  {
    "id": "card_b06_090_glucose_90",
    "name": "Glucozo — Khối Kháng Sinh (Cấu Trúc 90)",
    "name_en": "Glucose — Khối Kháng Sinh Isolate 90",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "PYRO",
    "manaCost": 5,
    "level": 7,
    "atk": 2640,
    "def": 2670,
    "chemicalFormula": "C6H12O6",
    "effectCode": "ELEM_B06_GLUCOSE_VITAL_90",
    "effectText": "Khi có mặt trên sân: Hồi phục 300 LP cho người chơi sau mỗi lượt kết thúc (cân bằng nội môi).",
    "scientificLore": "Glucozo (C6H12O6) là hợp chất sinh học / polymer quan trọng trong chương trình Hóa học 12 GDPT 2018 với khả năng tạo liên kết hydro và chuỗi mạch bền vững.",
    "relatedEquation": "C₆H₁₂O₆ + 6O₂ → 6CO₂ + 6H₂O",
    "iupacName": "Glucose",
    "archetype": "BIOMOLECULE_VITAL",
    "structuredEffects": [
      {
        "effectId": "B06_EFF_90",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "HEAL_LP",
            "params": {
              "amount": 400
            }
          }
        ],
        "description": "Hồi 400 LP dinh dưỡng sinh học."
      }
    ]
  },
  {
    "id": "card_b06_091_fructose_91",
    "name": "Fructozo — Khối Kháng Sinh (Cấu Trúc 91)",
    "name_en": "Fructose — Khối Kháng Sinh Isolate 91",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "PYRO",
    "manaCost": 1,
    "level": 2,
    "atk": 1340,
    "def": 1580,
    "chemicalFormula": "C6H12O6",
    "effectCode": "ELEM_B06_FRUCTOSE_VITAL_91",
    "effectText": "Khi có mặt trên sân: Hồi phục 300 LP cho người chơi sau mỗi lượt kết thúc (cân bằng nội môi).",
    "scientificLore": "Fructozo (C6H12O6) là hợp chất sinh học / polymer quan trọng trong chương trình Hóa học 12 GDPT 2018 với khả năng tạo liên kết hydro và chuỗi mạch bền vững.",
    "relatedEquation": "C₆H₁₂O₆ (Ketohexose Isomer)",
    "iupacName": "Fructose",
    "archetype": "BIOMOLECULE_VITAL",
    "structuredEffects": [
      {
        "effectId": "B06_EFF_91",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "HEAL_LP",
            "params": {
              "amount": 400
            }
          }
        ],
        "description": "Hồi 400 LP dinh dưỡng sinh học."
      }
    ]
  },
  {
    "id": "card_b06_092_sucrose_92",
    "name": "Saccarozo — Khối Kháng Sinh (Cấu Trúc 92)",
    "name_en": "Sucrose — Khối Kháng Sinh Isolate 92",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "TERRA",
    "manaCost": 2,
    "level": 3,
    "atk": 1610,
    "def": 1870,
    "chemicalFormula": "C12H22O11",
    "effectCode": "ELEM_B06_SUCROSE_VITAL_92",
    "effectText": "Khi có mặt trên sân: Hồi phục 300 LP cho người chơi sau mỗi lượt kết thúc (cân bằng nội môi).",
    "scientificLore": "Saccarozo (C12H22O11) là hợp chất sinh học / polymer quan trọng trong chương trình Hóa học 12 GDPT 2018 với khả năng tạo liên kết hydro và chuỗi mạch bền vững.",
    "relatedEquation": "C₁₂H₂₂O₁₁ + H₂O → C₆H₁₂O₆ + C₆H₁₂O₆",
    "iupacName": "Sucrose",
    "archetype": "BIOMOLECULE_VITAL",
    "structuredEffects": [
      {
        "effectId": "B06_EFF_92",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "HEAL_LP",
            "params": {
              "amount": 400
            }
          }
        ],
        "description": "Hồi 400 LP dinh dưỡng sinh học."
      }
    ]
  },
  {
    "id": "card_b06_093_polyethylene_93",
    "name": "Polyetylen — Khối Kháng Sinh (Cấu Trúc 93)",
    "name_en": "Polyethylene — Khối Kháng Sinh Isolate 93",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "TERRA",
    "manaCost": 3,
    "level": 4,
    "atk": 1880,
    "def": 1920,
    "chemicalFormula": "(-C2H4-)n",
    "effectCode": "ELEM_B06_POLYETHYLENE_VITAL_93",
    "effectText": "Liên kết chuỗi polymer cực đại: Không thể bị phá hủy bởi đòn tấn công đầu tiên trong mỗi lượt.",
    "scientificLore": "Polyetylen ((-C2H4-)n) là hợp chất sinh học / polymer quan trọng trong chương trình Hóa học 12 GDPT 2018 với khả năng tạo liên kết hydro và chuỗi mạch bền vững.",
    "relatedEquation": "nCH₂=CH₂ → (-CH₂-CH₂-)n",
    "iupacName": "Polyethylene",
    "archetype": "MACROMOLECULAR_POLYMER",
    "structuredEffects": [
      {
        "effectId": "B06_EFF_93",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "APPLY_STATUS",
            "params": {
              "statusType": "PASSIVATION"
            }
          }
        ],
        "description": "Bảo vệ màng polymer bền cơ học."
      }
    ]
  },
  {
    "id": "card_b06_094_polytetrafluoroethylene_94",
    "name": "Teflon — Khối Kháng Sinh (Cấu Trúc 94)",
    "name_en": "Polytetrafluoroethylene — Khối Kháng Sinh Isolate 94",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "NOBLE_VOID",
    "manaCost": 4,
    "level": 5,
    "atk": 2150,
    "def": 2210,
    "chemicalFormula": "(-C2F4-)n",
    "effectCode": "ELEM_B06_POLYTETRAFLUOROETHYLENE_VITAL_94",
    "effectText": "Liên kết chuỗi polymer cực đại: Không thể bị phá hủy bởi đòn tấn công đầu tiên trong mỗi lượt.",
    "scientificLore": "Teflon ((-C2F4-)n) là hợp chất sinh học / polymer quan trọng trong chương trình Hóa học 12 GDPT 2018 với khả năng tạo liên kết hydro và chuỗi mạch bền vững.",
    "relatedEquation": "nCF₂=CF₂ → (-CF₂-CF₂-)n",
    "iupacName": "Polytetrafluoroethylene",
    "archetype": "MACROMOLECULAR_POLYMER",
    "structuredEffects": [
      {
        "effectId": "B06_EFF_94",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "APPLY_STATUS",
            "params": {
              "statusType": "PASSIVATION"
            }
          }
        ],
        "description": "Bảo vệ màng polymer bền cơ học."
      }
    ]
  },
  {
    "id": "card_b06_095_nylon_66_95",
    "name": "Nylon-6,6 — Khối Kháng Sinh (Cấu Trúc 95)",
    "name_en": "Nylon 66 — Khối Kháng Sinh Isolate 95",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "TERRA",
    "manaCost": 5,
    "level": 6,
    "atk": 2420,
    "def": 2500,
    "chemicalFormula": "C12H22N2O2",
    "effectCode": "ELEM_B06_NYLON_66_VITAL_95",
    "effectText": "Liên kết chuỗi polymer cực đại: Không thể bị phá hủy bởi đòn tấn công đầu tiên trong mỗi lượt.",
    "scientificLore": "Nylon-6,6 (C12H22N2O2) là hợp chất sinh học / polymer quan trọng trong chương trình Hóa học 12 GDPT 2018 với khả năng tạo liên kết hydro và chuỗi mạch bền vững.",
    "relatedEquation": "nHexamethylenediamine + nAdipic Acid → Nylon-6,6 + 2nH₂O",
    "iupacName": "Nylon 66",
    "archetype": "MACROMOLECULAR_POLYMER",
    "structuredEffects": [
      {
        "effectId": "B06_EFF_95",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "APPLY_STATUS",
            "params": {
              "statusType": "PASSIVATION"
            }
          }
        ],
        "description": "Bảo vệ màng polymer bền cơ học."
      }
    ]
  },
  {
    "id": "card_b06_096_poly_paraphenylene_terephthalamide_96",
    "name": "Kevlar — Khối Kháng Sinh (Cấu Trúc 96)",
    "name_en": "Poly-paraphenylene terephthalamide — Khối Kháng Sinh Isolate 96",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "ULTRA_RARE",
    "attribute": "NOBLE_VOID",
    "manaCost": 5,
    "level": 7,
    "atk": 2440,
    "def": 2790,
    "chemicalFormula": "(-C14H10N2O2-)n",
    "effectCode": "ELEM_B06_POLY_PARAPHENYLENE_TEREPHTHALAMIDE_VITAL_96",
    "effectText": "Liên kết chuỗi polymer cực đại: Không thể bị phá hủy bởi đòn tấn công đầu tiên trong mỗi lượt.",
    "scientificLore": "Kevlar ((-C14H10N2O2-)n) là hợp chất sinh học / polymer quan trọng trong chương trình Hóa học 12 GDPT 2018 với khả năng tạo liên kết hydro và chuỗi mạch bền vững.",
    "relatedEquation": "1,4-phenylene-diamine + terephthaloyl chloride → Kevlar",
    "iupacName": "Poly-paraphenylene terephthalamide",
    "archetype": "MACROMOLECULAR_POLYMER",
    "structuredEffects": [
      {
        "effectId": "B06_EFF_96",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "APPLY_STATUS",
            "params": {
              "statusType": "PASSIVATION"
            }
          }
        ],
        "description": "Bảo vệ màng polymer bền cơ học."
      }
    ]
  },
  {
    "id": "card_b06_097_glycine_97",
    "name": "Glyxin — Cấu Trúc Tự Nhiên (Cấu Trúc 97)",
    "name_en": "Glycine — Cấu Trúc Tự Nhiên Isolate 97",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SECRET_RARE",
    "attribute": "TERRA",
    "manaCost": 1,
    "level": 2,
    "atk": 1390,
    "def": 1460,
    "chemicalFormula": "C2H5NO2",
    "effectCode": "ELEM_B06_GLYCINE_VITAL_97",
    "effectText": "Khi có mặt trên sân: Hồi phục 300 LP cho người chơi sau mỗi lượt kết thúc (cân bằng nội môi).",
    "scientificLore": "Glyxin (C2H5NO2) là hợp chất sinh học / polymer quan trọng trong chương trình Hóa học 12 GDPT 2018 với khả năng tạo liên kết hydro và chuỗi mạch bền vững.",
    "relatedEquation": "H₂N-CH₂-COOH ⇌ H₃N⁺-CH₂-COO⁻",
    "iupacName": "Glycine",
    "archetype": "BIOMOLECULE_VITAL",
    "structuredEffects": [
      {
        "effectId": "B06_EFF_97",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "HEAL_LP",
            "params": {
              "amount": 400
            }
          }
        ],
        "description": "Hồi 400 LP dinh dưỡng sinh học."
      }
    ]
  },
  {
    "id": "card_b06_098_alanine_98",
    "name": "Alanin — Cấu Trúc Tự Nhiên (Cấu Trúc 98)",
    "name_en": "Alanine — Cấu Trúc Tự Nhiên Isolate 98",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "TERRA",
    "manaCost": 2,
    "level": 3,
    "atk": 1660,
    "def": 1750,
    "chemicalFormula": "C3H7NO2",
    "effectCode": "ELEM_B06_ALANINE_VITAL_98",
    "effectText": "Khi có mặt trên sân: Hồi phục 300 LP cho người chơi sau mỗi lượt kết thúc (cân bằng nội môi).",
    "scientificLore": "Alanin (C3H7NO2) là hợp chất sinh học / polymer quan trọng trong chương trình Hóa học 12 GDPT 2018 với khả năng tạo liên kết hydro và chuỗi mạch bền vững.",
    "relatedEquation": "CH₃-CH(NH₂)-COOH ⇌ CH₃-CH(NH₃⁺)-COO⁻",
    "iupacName": "Alanine",
    "archetype": "BIOMOLECULE_VITAL",
    "structuredEffects": [
      {
        "effectId": "B06_EFF_98",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "HEAL_LP",
            "params": {
              "amount": 400
            }
          }
        ],
        "description": "Hồi 400 LP dinh dưỡng sinh học."
      }
    ]
  },
  {
    "id": "card_b06_099_valine_99",
    "name": "Valin — Cấu Trúc Tự Nhiên (Cấu Trúc 99)",
    "name_en": "Valine — Cấu Trúc Tự Nhiên Isolate 99",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "TERRA",
    "manaCost": 3,
    "level": 4,
    "atk": 1930,
    "def": 2040,
    "chemicalFormula": "C5H11NO2",
    "effectCode": "ELEM_B06_VALINE_VITAL_99",
    "effectText": "Khi có mặt trên sân: Hồi phục 300 LP cho người chơi sau mỗi lượt kết thúc (cân bằng nội môi).",
    "scientificLore": "Valin (C5H11NO2) là hợp chất sinh học / polymer quan trọng trong chương trình Hóa học 12 GDPT 2018 với khả năng tạo liên kết hydro và chuỗi mạch bền vững.",
    "relatedEquation": "(CH₃)₂CH-CH(NH₂)-COOH",
    "iupacName": "Valine",
    "archetype": "BIOMOLECULE_VITAL",
    "structuredEffects": [
      {
        "effectId": "B06_EFF_99",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "HEAL_LP",
            "params": {
              "amount": 400
            }
          }
        ],
        "description": "Hồi 400 LP dinh dưỡng sinh học."
      }
    ]
  },
  {
    "id": "card_b06_100_glutamic_acid_100",
    "name": "Axit Glutamic — Cấu Trúc Tự Nhiên (Cấu Trúc 100)",
    "name_en": "Glutamic Acid — Cấu Trúc Tự Nhiên Isolate 100",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "ACID_DARK",
    "manaCost": 4,
    "level": 5,
    "atk": 2200,
    "def": 2330,
    "chemicalFormula": "C5H9NO4",
    "effectCode": "ELEM_B06_GLUTAMIC_ACID_VITAL_100",
    "effectText": "Khi có mặt trên sân: Hồi phục 300 LP cho người chơi sau mỗi lượt kết thúc (cân bằng nội môi).",
    "scientificLore": "Axit Glutamic (C5H9NO4) là hợp chất sinh học / polymer quan trọng trong chương trình Hóa học 12 GDPT 2018 với khả năng tạo liên kết hydro và chuỗi mạch bền vững.",
    "relatedEquation": "HOOC-(CH₂)₂-CH(NH₂)-COOH",
    "iupacName": "Glutamic Acid",
    "archetype": "BIOMOLECULE_VITAL",
    "structuredEffects": [
      {
        "effectId": "B06_EFF_100",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "HEAL_LP",
            "params": {
              "amount": 400
            }
          }
        ],
        "description": "Hồi 400 LP dinh dưỡng sinh học."
      }
    ]
  }
];
