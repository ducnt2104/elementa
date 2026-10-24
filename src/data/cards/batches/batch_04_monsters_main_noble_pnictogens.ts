// src/data/cards/batches/batch_04_monsters_main_noble_pnictogens.ts
// Batch 04: Noble Gas & Pnictogen Monsters (100 cards)
// Automatically generated and validated for ELEMENTA Tactical TCG

import { PlayableCardDef } from '../../../domain/cardGameTypes';

export const BATCH_04_CARDS: PlayableCardDef[] = [
  {
    "id": "card_b04_001_he_1",
    "name": "Heli — Hộ Thần (He Biến Thể 1)",
    "name_en": "Helium — Hộ Thần Kinetic 1",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "NOBLE_VOID",
    "manaCost": 1,
    "level": 2,
    "atk": 860,
    "def": 2000,
    "chemicalFormula": "He",
    "atomicNumber": 2,
    "effectCode": "ELEM_B04_HE_OCTET_1",
    "effectText": "Lớp vỏ bát tử bền vững: Khi ở tư thế Phòng thủ, không thể bị tiêu diệt bởi hiệu ứng thẻ bài của đối phương.",
    "scientificLore": "Heli (He, Z=2) cấu hình electron bão hòa hoặc lai hóa $sp^3$ linh hoạt theo chương trình GDPT 2018.",
    "relatedEquation": "He (1s² Closed Duet Octet Equivalent)",
    "iupacName": "Helium Entity",
    "archetype": "NOBLE_VOID",
    "structuredEffects": [
      {
        "effectId": "B04_EFF_1",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "APPLY_STATUS",
            "params": {
              "statusType": "INERT_OCTET"
            }
          }
        ],
        "description": "Kích hoạt khiên bát tử trơ."
      }
    ]
  },
  {
    "id": "card_b04_002_ne_2",
    "name": "Neon — Hộ Thần (Ne Biến Thể 2)",
    "name_en": "Neon — Hộ Thần Kinetic 2",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "NOBLE_VOID",
    "manaCost": 2,
    "level": 3,
    "atk": 1040,
    "def": 2250,
    "chemicalFormula": "Ne",
    "atomicNumber": 10,
    "effectCode": "ELEM_B04_NE_OCTET_2",
    "effectText": "Lớp vỏ bát tử bền vững: Khi ở tư thế Phòng thủ, không thể bị tiêu diệt bởi hiệu ứng thẻ bài của đối phương.",
    "scientificLore": "Neon (Ne, Z=10) cấu hình electron bão hòa hoặc lai hóa $sp^3$ linh hoạt theo chương trình GDPT 2018.",
    "relatedEquation": "Ne (2s² 2p⁶ Closed Shell)",
    "iupacName": "Neon Entity",
    "archetype": "NOBLE_VOID",
    "structuredEffects": [
      {
        "effectId": "B04_EFF_2",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "APPLY_STATUS",
            "params": {
              "statusType": "INERT_OCTET"
            }
          }
        ],
        "description": "Kích hoạt khiên bát tử trơ."
      }
    ]
  },
  {
    "id": "card_b04_003_ar_3",
    "name": "Argon — Hộ Thần (Ar Biến Thể 3)",
    "name_en": "Argon — Hộ Thần Kinetic 3",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "NOBLE_VOID",
    "manaCost": 3,
    "level": 4,
    "atk": 1220,
    "def": 2500,
    "chemicalFormula": "Ar",
    "atomicNumber": 18,
    "effectCode": "ELEM_B04_AR_OCTET_3",
    "effectText": "Lớp vỏ bát tử bền vững: Khi ở tư thế Phòng thủ, không thể bị tiêu diệt bởi hiệu ứng thẻ bài của đối phương.",
    "scientificLore": "Argon (Ar, Z=18) cấu hình electron bão hòa hoặc lai hóa $sp^3$ linh hoạt theo chương trình GDPT 2018.",
    "relatedEquation": "Ar (3s² 3p⁶ Closed Shell)",
    "iupacName": "Argon Entity",
    "archetype": "NOBLE_VOID",
    "structuredEffects": [
      {
        "effectId": "B04_EFF_3",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "APPLY_STATUS",
            "params": {
              "statusType": "INERT_OCTET"
            }
          }
        ],
        "description": "Kích hoạt khiên bát tử trơ."
      }
    ]
  },
  {
    "id": "card_b04_004_kr_4",
    "name": "Krypton — Hộ Thần (KrF2 Biến Thể 4)",
    "name_en": "Krypton — Hộ Thần Kinetic 4",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "NOBLE_VOID",
    "manaCost": 4,
    "level": 5,
    "atk": 1400,
    "def": 2750,
    "chemicalFormula": "KrF2",
    "atomicNumber": 36,
    "effectCode": "ELEM_B04_KR_OCTET_4",
    "effectText": "Lớp vỏ bát tử bền vững: Khi ở tư thế Phòng thủ, không thể bị tiêu diệt bởi hiệu ứng thẻ bài của đối phương.",
    "scientificLore": "Krypton (Kr, Z=36) cấu hình electron bão hòa hoặc lai hóa $sp^3$ linh hoạt theo chương trình GDPT 2018.",
    "relatedEquation": "Kr + F₂ → KrF₂",
    "iupacName": "Krypton Entity",
    "archetype": "NOBLE_VOID",
    "structuredEffects": [
      {
        "effectId": "B04_EFF_4",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "APPLY_STATUS",
            "params": {
              "statusType": "INERT_OCTET"
            }
          }
        ],
        "description": "Kích hoạt khiên bát tử trơ."
      }
    ]
  },
  {
    "id": "card_b04_005_xe_5",
    "name": "Xenon — Hộ Thần (XeF4 Biến Thể 5)",
    "name_en": "Xenon — Hộ Thần Kinetic 5",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "NOBLE_VOID",
    "manaCost": 5,
    "level": 6,
    "atk": 1580,
    "def": 3000,
    "chemicalFormula": "XeF4",
    "atomicNumber": 54,
    "effectCode": "ELEM_B04_XE_OCTET_5",
    "effectText": "Lớp vỏ bát tử bền vững: Khi ở tư thế Phòng thủ, không thể bị tiêu diệt bởi hiệu ứng thẻ bài của đối phương.",
    "scientificLore": "Xenon (Xe, Z=54) cấu hình electron bão hòa hoặc lai hóa $sp^3$ linh hoạt theo chương trình GDPT 2018.",
    "relatedEquation": "Xe + 2F₂ → XeF₄",
    "iupacName": "Xenon Entity",
    "archetype": "NOBLE_VOID",
    "structuredEffects": [
      {
        "effectId": "B04_EFF_5",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "APPLY_STATUS",
            "params": {
              "statusType": "INERT_OCTET"
            }
          }
        ],
        "description": "Kích hoạt khiên bát tử trơ."
      }
    ]
  },
  {
    "id": "card_b04_006_rn_6",
    "name": "Radon — Hộ Thần (RnF2 Biến Thể 6)",
    "name_en": "Radon — Hộ Thần Kinetic 6",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "NOBLE_VOID",
    "manaCost": 5,
    "level": 7,
    "atk": 1760,
    "def": 3250,
    "chemicalFormula": "RnF2",
    "atomicNumber": 86,
    "effectCode": "ELEM_B04_RN_OCTET_6",
    "effectText": "Lớp vỏ bát tử bền vững: Khi ở tư thế Phòng thủ, không thể bị tiêu diệt bởi hiệu ứng thẻ bài của đối phương.",
    "scientificLore": "Radon (Rn, Z=86) cấu hình electron bão hòa hoặc lai hóa $sp^3$ linh hoạt theo chương trình GDPT 2018.",
    "relatedEquation": "Rn + F₂ → RnF₂",
    "iupacName": "Radon Entity",
    "archetype": "NOBLE_VOID",
    "structuredEffects": [
      {
        "effectId": "B04_EFF_6",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "APPLY_STATUS",
            "params": {
              "statusType": "INERT_OCTET"
            }
          }
        ],
        "description": "Kích hoạt khiên bát tử trơ."
      }
    ]
  },
  {
    "id": "card_b04_007_n_7",
    "name": "Nito — Hộ Thần (N2 Biến Thể 7)",
    "name_en": "Nitrogen — Hộ Thần Kinetic 7",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "ULTRA_RARE",
    "attribute": "AERO",
    "manaCost": 1,
    "level": 2,
    "atk": 1460,
    "def": 1160,
    "chemicalFormula": "N2",
    "atomicNumber": 7,
    "effectCode": "ELEM_B04_N_OCTET_7",
    "effectText": "Khi triệu hồi: Đối thủ chịu hiệu ứng nhiễm độc pnictogen, mất 400 LP.",
    "scientificLore": "Nito (N, Z=7) cấu hình electron bão hòa hoặc lai hóa $sp^3$ linh hoạt theo chương trình GDPT 2018.",
    "relatedEquation": "N₂ + 3H₂ ⇌ 2NH₃",
    "iupacName": "Nitrogen Entity",
    "archetype": "PNICTOGEN_SPIRIT",
    "structuredEffects": [
      {
        "effectId": "B04_EFF_7",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Nhiễm độc 300 LP."
      }
    ]
  },
  {
    "id": "card_b04_008_p_8",
    "name": "Photpho — Hộ Thần (P4 Biến Thể 8)",
    "name_en": "Phosphorus — Hộ Thần Kinetic 8",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SECRET_RARE",
    "attribute": "PYRO",
    "manaCost": 2,
    "level": 3,
    "atk": 1690,
    "def": 1340,
    "chemicalFormula": "P4",
    "atomicNumber": 15,
    "effectCode": "ELEM_B04_P_OCTET_8",
    "effectText": "Khi triệu hồi: Đối thủ chịu hiệu ứng nhiễm độc pnictogen, mất 500 LP.",
    "scientificLore": "Photpho (P, Z=15) cấu hình electron bão hòa hoặc lai hóa $sp^3$ linh hoạt theo chương trình GDPT 2018.",
    "relatedEquation": "P₄ + 5O₂ → P₄O₁₀",
    "iupacName": "Phosphorus Entity",
    "archetype": "PNICTOGEN_SPIRIT",
    "structuredEffects": [
      {
        "effectId": "B04_EFF_8",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Nhiễm độc 300 LP."
      }
    ]
  },
  {
    "id": "card_b04_009_as_9",
    "name": "Asen — Hộ Thần (As2O3 Biến Thể 9)",
    "name_en": "Arsenic — Hộ Thần Kinetic 9",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "ACID_DARK",
    "manaCost": 3,
    "level": 4,
    "atk": 1920,
    "def": 1520,
    "chemicalFormula": "As2O3",
    "atomicNumber": 33,
    "effectCode": "ELEM_B04_AS_OCTET_9",
    "effectText": "Khi triệu hồi: Đối thủ chịu hiệu ứng nhiễm độc pnictogen, mất 200 LP.",
    "scientificLore": "Asen (As, Z=33) cấu hình electron bão hòa hoặc lai hóa $sp^3$ linh hoạt theo chương trình GDPT 2018.",
    "relatedEquation": "4As + 3O₂ → 2As₂O₃",
    "iupacName": "Arsenic Entity",
    "archetype": "PNICTOGEN_SPIRIT",
    "structuredEffects": [
      {
        "effectId": "B04_EFF_9",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Nhiễm độc 300 LP."
      }
    ]
  },
  {
    "id": "card_b04_010_sb_10",
    "name": "Antimon — Hộ Thần (Sb2S3 Biến Thể 10)",
    "name_en": "Antimony — Hộ Thần Kinetic 10",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "TERRA",
    "manaCost": 4,
    "level": 5,
    "atk": 2150,
    "def": 1700,
    "chemicalFormula": "Sb2S3",
    "atomicNumber": 51,
    "effectCode": "ELEM_B04_SB_OCTET_10",
    "effectText": "Khi triệu hồi: Đối thủ chịu hiệu ứng nhiễm độc pnictogen, mất 300 LP.",
    "scientificLore": "Antimon (Sb, Z=51) cấu hình electron bão hòa hoặc lai hóa $sp^3$ linh hoạt theo chương trình GDPT 2018.",
    "relatedEquation": "2Sb + 3S → Sb₂S₃",
    "iupacName": "Antimony Entity",
    "archetype": "PNICTOGEN_SPIRIT",
    "structuredEffects": [
      {
        "effectId": "B04_EFF_10",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Nhiễm độc 300 LP."
      }
    ]
  },
  {
    "id": "card_b04_011_bi_11",
    "name": "Bismut — Hộ Thần (Bi2O3 Biến Thể 11)",
    "name_en": "Bismuth — Hộ Thần Kinetic 11",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "TERRA",
    "manaCost": 5,
    "level": 6,
    "atk": 2380,
    "def": 1880,
    "chemicalFormula": "Bi2O3",
    "atomicNumber": 83,
    "effectCode": "ELEM_B04_BI_OCTET_11",
    "effectText": "Khi triệu hồi: Đối thủ chịu hiệu ứng nhiễm độc pnictogen, mất 400 LP.",
    "scientificLore": "Bismut (Bi, Z=83) cấu hình electron bão hòa hoặc lai hóa $sp^3$ linh hoạt theo chương trình GDPT 2018.",
    "relatedEquation": "4Bi + 3O₂ → 2Bi₂O₃",
    "iupacName": "Bismuth Entity",
    "archetype": "PNICTOGEN_SPIRIT",
    "structuredEffects": [
      {
        "effectId": "B04_EFF_11",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Nhiễm độc 300 LP."
      }
    ]
  },
  {
    "id": "card_b04_012_he_12",
    "name": "Heli — Linh Hồn (He Biến Thể 12)",
    "name_en": "Helium — Linh Hồn Kinetic 12",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "NOBLE_VOID",
    "manaCost": 5,
    "level": 7,
    "atk": 1760,
    "def": 3250,
    "chemicalFormula": "He",
    "atomicNumber": 2,
    "effectCode": "ELEM_B04_HE_OCTET_12",
    "effectText": "Lớp vỏ bát tử bền vững: Khi ở tư thế Phòng thủ, không thể bị tiêu diệt bởi hiệu ứng thẻ bài của đối phương.",
    "scientificLore": "Heli (He, Z=2) cấu hình electron bão hòa hoặc lai hóa $sp^3$ linh hoạt theo chương trình GDPT 2018.",
    "relatedEquation": "He (1s² Closed Duet Octet Equivalent)",
    "iupacName": "Helium Entity",
    "archetype": "NOBLE_VOID",
    "structuredEffects": [
      {
        "effectId": "B04_EFF_12",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "APPLY_STATUS",
            "params": {
              "statusType": "INERT_OCTET"
            }
          }
        ],
        "description": "Kích hoạt khiên bát tử trơ."
      }
    ]
  },
  {
    "id": "card_b04_013_ne_13",
    "name": "Neon — Linh Hồn (Ne Biến Thể 13)",
    "name_en": "Neon — Linh Hồn Kinetic 13",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "NOBLE_VOID",
    "manaCost": 1,
    "level": 2,
    "atk": 860,
    "def": 2000,
    "chemicalFormula": "Ne",
    "atomicNumber": 10,
    "effectCode": "ELEM_B04_NE_OCTET_13",
    "effectText": "Lớp vỏ bát tử bền vững: Khi ở tư thế Phòng thủ, không thể bị tiêu diệt bởi hiệu ứng thẻ bài của đối phương.",
    "scientificLore": "Neon (Ne, Z=10) cấu hình electron bão hòa hoặc lai hóa $sp^3$ linh hoạt theo chương trình GDPT 2018.",
    "relatedEquation": "Ne (2s² 2p⁶ Closed Shell)",
    "iupacName": "Neon Entity",
    "archetype": "NOBLE_VOID",
    "structuredEffects": [
      {
        "effectId": "B04_EFF_13",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "APPLY_STATUS",
            "params": {
              "statusType": "INERT_OCTET"
            }
          }
        ],
        "description": "Kích hoạt khiên bát tử trơ."
      }
    ]
  },
  {
    "id": "card_b04_014_ar_14",
    "name": "Argon — Linh Hồn (Ar Biến Thể 14)",
    "name_en": "Argon — Linh Hồn Kinetic 14",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "NOBLE_VOID",
    "manaCost": 2,
    "level": 3,
    "atk": 1040,
    "def": 2250,
    "chemicalFormula": "Ar",
    "atomicNumber": 18,
    "effectCode": "ELEM_B04_AR_OCTET_14",
    "effectText": "Lớp vỏ bát tử bền vững: Khi ở tư thế Phòng thủ, không thể bị tiêu diệt bởi hiệu ứng thẻ bài của đối phương.",
    "scientificLore": "Argon (Ar, Z=18) cấu hình electron bão hòa hoặc lai hóa $sp^3$ linh hoạt theo chương trình GDPT 2018.",
    "relatedEquation": "Ar (3s² 3p⁶ Closed Shell)",
    "iupacName": "Argon Entity",
    "archetype": "NOBLE_VOID",
    "structuredEffects": [
      {
        "effectId": "B04_EFF_14",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "APPLY_STATUS",
            "params": {
              "statusType": "INERT_OCTET"
            }
          }
        ],
        "description": "Kích hoạt khiên bát tử trơ."
      }
    ]
  },
  {
    "id": "card_b04_015_kr_15",
    "name": "Krypton — Linh Hồn (KrF2 Biến Thể 15)",
    "name_en": "Krypton — Linh Hồn Kinetic 15",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "NOBLE_VOID",
    "manaCost": 3,
    "level": 4,
    "atk": 1220,
    "def": 2500,
    "chemicalFormula": "KrF2",
    "atomicNumber": 36,
    "effectCode": "ELEM_B04_KR_OCTET_15",
    "effectText": "Lớp vỏ bát tử bền vững: Khi ở tư thế Phòng thủ, không thể bị tiêu diệt bởi hiệu ứng thẻ bài của đối phương.",
    "scientificLore": "Krypton (Kr, Z=36) cấu hình electron bão hòa hoặc lai hóa $sp^3$ linh hoạt theo chương trình GDPT 2018.",
    "relatedEquation": "Kr + F₂ → KrF₂",
    "iupacName": "Krypton Entity",
    "archetype": "NOBLE_VOID",
    "structuredEffects": [
      {
        "effectId": "B04_EFF_15",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "APPLY_STATUS",
            "params": {
              "statusType": "INERT_OCTET"
            }
          }
        ],
        "description": "Kích hoạt khiên bát tử trơ."
      }
    ]
  },
  {
    "id": "card_b04_016_xe_16",
    "name": "Xenon — Linh Hồn (XeF4 Biến Thể 16)",
    "name_en": "Xenon — Linh Hồn Kinetic 16",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "ULTRA_RARE",
    "attribute": "NOBLE_VOID",
    "manaCost": 4,
    "level": 5,
    "atk": 1400,
    "def": 2750,
    "chemicalFormula": "XeF4",
    "atomicNumber": 54,
    "effectCode": "ELEM_B04_XE_OCTET_16",
    "effectText": "Lớp vỏ bát tử bền vững: Khi ở tư thế Phòng thủ, không thể bị tiêu diệt bởi hiệu ứng thẻ bài của đối phương.",
    "scientificLore": "Xenon (Xe, Z=54) cấu hình electron bão hòa hoặc lai hóa $sp^3$ linh hoạt theo chương trình GDPT 2018.",
    "relatedEquation": "Xe + 2F₂ → XeF₄",
    "iupacName": "Xenon Entity",
    "archetype": "NOBLE_VOID",
    "structuredEffects": [
      {
        "effectId": "B04_EFF_16",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "APPLY_STATUS",
            "params": {
              "statusType": "INERT_OCTET"
            }
          }
        ],
        "description": "Kích hoạt khiên bát tử trơ."
      }
    ]
  },
  {
    "id": "card_b04_017_rn_17",
    "name": "Radon — Linh Hồn (RnF2 Biến Thể 17)",
    "name_en": "Radon — Linh Hồn Kinetic 17",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SECRET_RARE",
    "attribute": "NOBLE_VOID",
    "manaCost": 5,
    "level": 6,
    "atk": 1580,
    "def": 3000,
    "chemicalFormula": "RnF2",
    "atomicNumber": 86,
    "effectCode": "ELEM_B04_RN_OCTET_17",
    "effectText": "Lớp vỏ bát tử bền vững: Khi ở tư thế Phòng thủ, không thể bị tiêu diệt bởi hiệu ứng thẻ bài của đối phương.",
    "scientificLore": "Radon (Rn, Z=86) cấu hình electron bão hòa hoặc lai hóa $sp^3$ linh hoạt theo chương trình GDPT 2018.",
    "relatedEquation": "Rn + F₂ → RnF₂",
    "iupacName": "Radon Entity",
    "archetype": "NOBLE_VOID",
    "structuredEffects": [
      {
        "effectId": "B04_EFF_17",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "APPLY_STATUS",
            "params": {
              "statusType": "INERT_OCTET"
            }
          }
        ],
        "description": "Kích hoạt khiên bát tử trơ."
      }
    ]
  },
  {
    "id": "card_b04_018_n_18",
    "name": "Nito — Linh Hồn (N2 Biến Thể 18)",
    "name_en": "Nitrogen — Linh Hồn Kinetic 18",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "AERO",
    "manaCost": 5,
    "level": 7,
    "atk": 2610,
    "def": 2060,
    "chemicalFormula": "N2",
    "atomicNumber": 7,
    "effectCode": "ELEM_B04_N_OCTET_18",
    "effectText": "Khi triệu hồi: Đối thủ chịu hiệu ứng nhiễm độc pnictogen, mất 300 LP.",
    "scientificLore": "Nito (N, Z=7) cấu hình electron bão hòa hoặc lai hóa $sp^3$ linh hoạt theo chương trình GDPT 2018.",
    "relatedEquation": "N₂ + 3H₂ ⇌ 2NH₃",
    "iupacName": "Nitrogen Entity",
    "archetype": "PNICTOGEN_SPIRIT",
    "structuredEffects": [
      {
        "effectId": "B04_EFF_18",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Nhiễm độc 300 LP."
      }
    ]
  },
  {
    "id": "card_b04_019_p_19",
    "name": "Photpho — Linh Hồn (P4 Biến Thể 19)",
    "name_en": "Phosphorus — Linh Hồn Kinetic 19",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "PYRO",
    "manaCost": 1,
    "level": 2,
    "atk": 1460,
    "def": 1160,
    "chemicalFormula": "P4",
    "atomicNumber": 15,
    "effectCode": "ELEM_B04_P_OCTET_19",
    "effectText": "Khi triệu hồi: Đối thủ chịu hiệu ứng nhiễm độc pnictogen, mất 400 LP.",
    "scientificLore": "Photpho (P, Z=15) cấu hình electron bão hòa hoặc lai hóa $sp^3$ linh hoạt theo chương trình GDPT 2018.",
    "relatedEquation": "P₄ + 5O₂ → P₄O₁₀",
    "iupacName": "Phosphorus Entity",
    "archetype": "PNICTOGEN_SPIRIT",
    "structuredEffects": [
      {
        "effectId": "B04_EFF_19",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Nhiễm độc 300 LP."
      }
    ]
  },
  {
    "id": "card_b04_020_as_20",
    "name": "Asen — Linh Hồn (As2O3 Biến Thể 20)",
    "name_en": "Arsenic — Linh Hồn Kinetic 20",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "ACID_DARK",
    "manaCost": 2,
    "level": 3,
    "atk": 1690,
    "def": 1340,
    "chemicalFormula": "As2O3",
    "atomicNumber": 33,
    "effectCode": "ELEM_B04_AS_OCTET_20",
    "effectText": "Khi triệu hồi: Đối thủ chịu hiệu ứng nhiễm độc pnictogen, mất 500 LP.",
    "scientificLore": "Asen (As, Z=33) cấu hình electron bão hòa hoặc lai hóa $sp^3$ linh hoạt theo chương trình GDPT 2018.",
    "relatedEquation": "4As + 3O₂ → 2As₂O₃",
    "iupacName": "Arsenic Entity",
    "archetype": "PNICTOGEN_SPIRIT",
    "structuredEffects": [
      {
        "effectId": "B04_EFF_20",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Nhiễm độc 300 LP."
      }
    ]
  },
  {
    "id": "card_b04_021_sb_21",
    "name": "Antimon — Linh Hồn (Sb2S3 Biến Thể 21)",
    "name_en": "Antimony — Linh Hồn Kinetic 21",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "TERRA",
    "manaCost": 3,
    "level": 4,
    "atk": 1920,
    "def": 1520,
    "chemicalFormula": "Sb2S3",
    "atomicNumber": 51,
    "effectCode": "ELEM_B04_SB_OCTET_21",
    "effectText": "Khi triệu hồi: Đối thủ chịu hiệu ứng nhiễm độc pnictogen, mất 200 LP.",
    "scientificLore": "Antimon (Sb, Z=51) cấu hình electron bão hòa hoặc lai hóa $sp^3$ linh hoạt theo chương trình GDPT 2018.",
    "relatedEquation": "2Sb + 3S → Sb₂S₃",
    "iupacName": "Antimony Entity",
    "archetype": "PNICTOGEN_SPIRIT",
    "structuredEffects": [
      {
        "effectId": "B04_EFF_21",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Nhiễm độc 300 LP."
      }
    ]
  },
  {
    "id": "card_b04_022_bi_22",
    "name": "Bismut — Linh Hồn (Bi2O3 Biến Thể 22)",
    "name_en": "Bismuth — Linh Hồn Kinetic 22",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "TERRA",
    "manaCost": 4,
    "level": 5,
    "atk": 2150,
    "def": 1700,
    "chemicalFormula": "Bi2O3",
    "atomicNumber": 83,
    "effectCode": "ELEM_B04_BI_OCTET_22",
    "effectText": "Khi triệu hồi: Đối thủ chịu hiệu ứng nhiễm độc pnictogen, mất 300 LP.",
    "scientificLore": "Bismut (Bi, Z=83) cấu hình electron bão hòa hoặc lai hóa $sp^3$ linh hoạt theo chương trình GDPT 2018.",
    "relatedEquation": "4Bi + 3O₂ → 2Bi₂O₃",
    "iupacName": "Bismuth Entity",
    "archetype": "PNICTOGEN_SPIRIT",
    "structuredEffects": [
      {
        "effectId": "B04_EFF_22",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Nhiễm độc 300 LP."
      }
    ]
  },
  {
    "id": "card_b04_023_he_23",
    "name": "Heli — Bong Bóng Khí (He Biến Thể 23)",
    "name_en": "Helium — Bong Bóng Khí Kinetic 23",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "NOBLE_VOID",
    "manaCost": 5,
    "level": 6,
    "atk": 1580,
    "def": 3000,
    "chemicalFormula": "He",
    "atomicNumber": 2,
    "effectCode": "ELEM_B04_HE_OCTET_23",
    "effectText": "Lớp vỏ bát tử bền vững: Khi ở tư thế Phòng thủ, không thể bị tiêu diệt bởi hiệu ứng thẻ bài của đối phương.",
    "scientificLore": "Heli (He, Z=2) cấu hình electron bão hòa hoặc lai hóa $sp^3$ linh hoạt theo chương trình GDPT 2018.",
    "relatedEquation": "He (1s² Closed Duet Octet Equivalent)",
    "iupacName": "Helium Entity",
    "archetype": "NOBLE_VOID",
    "structuredEffects": [
      {
        "effectId": "B04_EFF_23",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "APPLY_STATUS",
            "params": {
              "statusType": "INERT_OCTET"
            }
          }
        ],
        "description": "Kích hoạt khiên bát tử trơ."
      }
    ]
  },
  {
    "id": "card_b04_024_ne_24",
    "name": "Neon — Bong Bóng Khí (Ne Biến Thể 24)",
    "name_en": "Neon — Bong Bóng Khí Kinetic 24",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "NOBLE_VOID",
    "manaCost": 5,
    "level": 7,
    "atk": 1760,
    "def": 3250,
    "chemicalFormula": "Ne",
    "atomicNumber": 10,
    "effectCode": "ELEM_B04_NE_OCTET_24",
    "effectText": "Lớp vỏ bát tử bền vững: Khi ở tư thế Phòng thủ, không thể bị tiêu diệt bởi hiệu ứng thẻ bài của đối phương.",
    "scientificLore": "Neon (Ne, Z=10) cấu hình electron bão hòa hoặc lai hóa $sp^3$ linh hoạt theo chương trình GDPT 2018.",
    "relatedEquation": "Ne (2s² 2p⁶ Closed Shell)",
    "iupacName": "Neon Entity",
    "archetype": "NOBLE_VOID",
    "structuredEffects": [
      {
        "effectId": "B04_EFF_24",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "APPLY_STATUS",
            "params": {
              "statusType": "INERT_OCTET"
            }
          }
        ],
        "description": "Kích hoạt khiên bát tử trơ."
      }
    ]
  },
  {
    "id": "card_b04_025_ar_25",
    "name": "Argon — Bong Bóng Khí (Ar Biến Thể 25)",
    "name_en": "Argon — Bong Bóng Khí Kinetic 25",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "ULTRA_RARE",
    "attribute": "NOBLE_VOID",
    "manaCost": 1,
    "level": 2,
    "atk": 860,
    "def": 2000,
    "chemicalFormula": "Ar",
    "atomicNumber": 18,
    "effectCode": "ELEM_B04_AR_OCTET_25",
    "effectText": "Lớp vỏ bát tử bền vững: Khi ở tư thế Phòng thủ, không thể bị tiêu diệt bởi hiệu ứng thẻ bài của đối phương.",
    "scientificLore": "Argon (Ar, Z=18) cấu hình electron bão hòa hoặc lai hóa $sp^3$ linh hoạt theo chương trình GDPT 2018.",
    "relatedEquation": "Ar (3s² 3p⁶ Closed Shell)",
    "iupacName": "Argon Entity",
    "archetype": "NOBLE_VOID",
    "structuredEffects": [
      {
        "effectId": "B04_EFF_25",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "APPLY_STATUS",
            "params": {
              "statusType": "INERT_OCTET"
            }
          }
        ],
        "description": "Kích hoạt khiên bát tử trơ."
      }
    ]
  },
  {
    "id": "card_b04_026_kr_26",
    "name": "Krypton — Bong Bóng Khí (KrF2 Biến Thể 26)",
    "name_en": "Krypton — Bong Bóng Khí Kinetic 26",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SECRET_RARE",
    "attribute": "NOBLE_VOID",
    "manaCost": 2,
    "level": 3,
    "atk": 1040,
    "def": 2250,
    "chemicalFormula": "KrF2",
    "atomicNumber": 36,
    "effectCode": "ELEM_B04_KR_OCTET_26",
    "effectText": "Lớp vỏ bát tử bền vững: Khi ở tư thế Phòng thủ, không thể bị tiêu diệt bởi hiệu ứng thẻ bài của đối phương.",
    "scientificLore": "Krypton (Kr, Z=36) cấu hình electron bão hòa hoặc lai hóa $sp^3$ linh hoạt theo chương trình GDPT 2018.",
    "relatedEquation": "Kr + F₂ → KrF₂",
    "iupacName": "Krypton Entity",
    "archetype": "NOBLE_VOID",
    "structuredEffects": [
      {
        "effectId": "B04_EFF_26",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "APPLY_STATUS",
            "params": {
              "statusType": "INERT_OCTET"
            }
          }
        ],
        "description": "Kích hoạt khiên bát tử trơ."
      }
    ]
  },
  {
    "id": "card_b04_027_xe_27",
    "name": "Xenon — Bong Bóng Khí (XeF4 Biến Thể 27)",
    "name_en": "Xenon — Bong Bóng Khí Kinetic 27",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "NOBLE_VOID",
    "manaCost": 3,
    "level": 4,
    "atk": 1220,
    "def": 2500,
    "chemicalFormula": "XeF4",
    "atomicNumber": 54,
    "effectCode": "ELEM_B04_XE_OCTET_27",
    "effectText": "Lớp vỏ bát tử bền vững: Khi ở tư thế Phòng thủ, không thể bị tiêu diệt bởi hiệu ứng thẻ bài của đối phương.",
    "scientificLore": "Xenon (Xe, Z=54) cấu hình electron bão hòa hoặc lai hóa $sp^3$ linh hoạt theo chương trình GDPT 2018.",
    "relatedEquation": "Xe + 2F₂ → XeF₄",
    "iupacName": "Xenon Entity",
    "archetype": "NOBLE_VOID",
    "structuredEffects": [
      {
        "effectId": "B04_EFF_27",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "APPLY_STATUS",
            "params": {
              "statusType": "INERT_OCTET"
            }
          }
        ],
        "description": "Kích hoạt khiên bát tử trơ."
      }
    ]
  },
  {
    "id": "card_b04_028_rn_28",
    "name": "Radon — Bong Bóng Khí (RnF2 Biến Thể 28)",
    "name_en": "Radon — Bong Bóng Khí Kinetic 28",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "NOBLE_VOID",
    "manaCost": 4,
    "level": 5,
    "atk": 1400,
    "def": 2750,
    "chemicalFormula": "RnF2",
    "atomicNumber": 86,
    "effectCode": "ELEM_B04_RN_OCTET_28",
    "effectText": "Lớp vỏ bát tử bền vững: Khi ở tư thế Phòng thủ, không thể bị tiêu diệt bởi hiệu ứng thẻ bài của đối phương.",
    "scientificLore": "Radon (Rn, Z=86) cấu hình electron bão hòa hoặc lai hóa $sp^3$ linh hoạt theo chương trình GDPT 2018.",
    "relatedEquation": "Rn + F₂ → RnF₂",
    "iupacName": "Radon Entity",
    "archetype": "NOBLE_VOID",
    "structuredEffects": [
      {
        "effectId": "B04_EFF_28",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "APPLY_STATUS",
            "params": {
              "statusType": "INERT_OCTET"
            }
          }
        ],
        "description": "Kích hoạt khiên bát tử trơ."
      }
    ]
  },
  {
    "id": "card_b04_029_n_29",
    "name": "Nito — Bong Bóng Khí (N2 Biến Thể 29)",
    "name_en": "Nitrogen — Bong Bóng Khí Kinetic 29",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "AERO",
    "manaCost": 5,
    "level": 6,
    "atk": 2380,
    "def": 1880,
    "chemicalFormula": "N2",
    "atomicNumber": 7,
    "effectCode": "ELEM_B04_N_OCTET_29",
    "effectText": "Khi triệu hồi: Đối thủ chịu hiệu ứng nhiễm độc pnictogen, mất 200 LP.",
    "scientificLore": "Nito (N, Z=7) cấu hình electron bão hòa hoặc lai hóa $sp^3$ linh hoạt theo chương trình GDPT 2018.",
    "relatedEquation": "N₂ + 3H₂ ⇌ 2NH₃",
    "iupacName": "Nitrogen Entity",
    "archetype": "PNICTOGEN_SPIRIT",
    "structuredEffects": [
      {
        "effectId": "B04_EFF_29",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Nhiễm độc 300 LP."
      }
    ]
  },
  {
    "id": "card_b04_030_p_30",
    "name": "Photpho — Bong Bóng Khí (P4 Biến Thể 30)",
    "name_en": "Phosphorus — Bong Bóng Khí Kinetic 30",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "PYRO",
    "manaCost": 5,
    "level": 7,
    "atk": 2610,
    "def": 2060,
    "chemicalFormula": "P4",
    "atomicNumber": 15,
    "effectCode": "ELEM_B04_P_OCTET_30",
    "effectText": "Khi triệu hồi: Đối thủ chịu hiệu ứng nhiễm độc pnictogen, mất 300 LP.",
    "scientificLore": "Photpho (P, Z=15) cấu hình electron bão hòa hoặc lai hóa $sp^3$ linh hoạt theo chương trình GDPT 2018.",
    "relatedEquation": "P₄ + 5O₂ → P₄O₁₀",
    "iupacName": "Phosphorus Entity",
    "archetype": "PNICTOGEN_SPIRIT",
    "structuredEffects": [
      {
        "effectId": "B04_EFF_30",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Nhiễm độc 300 LP."
      }
    ]
  },
  {
    "id": "card_b04_031_as_31",
    "name": "Asen — Bong Bóng Khí (As2O3 Biến Thể 31)",
    "name_en": "Arsenic — Bong Bóng Khí Kinetic 31",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "ACID_DARK",
    "manaCost": 1,
    "level": 2,
    "atk": 1460,
    "def": 1160,
    "chemicalFormula": "As2O3",
    "atomicNumber": 33,
    "effectCode": "ELEM_B04_AS_OCTET_31",
    "effectText": "Khi triệu hồi: Đối thủ chịu hiệu ứng nhiễm độc pnictogen, mất 400 LP.",
    "scientificLore": "Asen (As, Z=33) cấu hình electron bão hòa hoặc lai hóa $sp^3$ linh hoạt theo chương trình GDPT 2018.",
    "relatedEquation": "4As + 3O₂ → 2As₂O₃",
    "iupacName": "Arsenic Entity",
    "archetype": "PNICTOGEN_SPIRIT",
    "structuredEffects": [
      {
        "effectId": "B04_EFF_31",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Nhiễm độc 300 LP."
      }
    ]
  },
  {
    "id": "card_b04_032_sb_32",
    "name": "Antimon — Bong Bóng Khí (Sb2S3 Biến Thể 32)",
    "name_en": "Antimony — Bong Bóng Khí Kinetic 32",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "TERRA",
    "manaCost": 2,
    "level": 3,
    "atk": 1690,
    "def": 1340,
    "chemicalFormula": "Sb2S3",
    "atomicNumber": 51,
    "effectCode": "ELEM_B04_SB_OCTET_32",
    "effectText": "Khi triệu hồi: Đối thủ chịu hiệu ứng nhiễm độc pnictogen, mất 500 LP.",
    "scientificLore": "Antimon (Sb, Z=51) cấu hình electron bão hòa hoặc lai hóa $sp^3$ linh hoạt theo chương trình GDPT 2018.",
    "relatedEquation": "2Sb + 3S → Sb₂S₃",
    "iupacName": "Antimony Entity",
    "archetype": "PNICTOGEN_SPIRIT",
    "structuredEffects": [
      {
        "effectId": "B04_EFF_32",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Nhiễm độc 300 LP."
      }
    ]
  },
  {
    "id": "card_b04_033_bi_33",
    "name": "Bismut — Bong Bóng Khí (Bi2O3 Biến Thể 33)",
    "name_en": "Bismuth — Bong Bóng Khí Kinetic 33",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "TERRA",
    "manaCost": 3,
    "level": 4,
    "atk": 1920,
    "def": 1520,
    "chemicalFormula": "Bi2O3",
    "atomicNumber": 83,
    "effectCode": "ELEM_B04_BI_OCTET_33",
    "effectText": "Khi triệu hồi: Đối thủ chịu hiệu ứng nhiễm độc pnictogen, mất 200 LP.",
    "scientificLore": "Bismut (Bi, Z=83) cấu hình electron bão hòa hoặc lai hóa $sp^3$ linh hoạt theo chương trình GDPT 2018.",
    "relatedEquation": "4Bi + 3O₂ → 2Bi₂O₃",
    "iupacName": "Bismuth Entity",
    "archetype": "PNICTOGEN_SPIRIT",
    "structuredEffects": [
      {
        "effectId": "B04_EFF_33",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Nhiễm độc 300 LP."
      }
    ]
  },
  {
    "id": "card_b04_034_he_34",
    "name": "Heli — Lăng Kính (He Biến Thể 34)",
    "name_en": "Helium — Lăng Kính Kinetic 34",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "ULTRA_RARE",
    "attribute": "NOBLE_VOID",
    "manaCost": 4,
    "level": 5,
    "atk": 1400,
    "def": 2750,
    "chemicalFormula": "He",
    "atomicNumber": 2,
    "effectCode": "ELEM_B04_HE_OCTET_34",
    "effectText": "Lớp vỏ bát tử bền vững: Khi ở tư thế Phòng thủ, không thể bị tiêu diệt bởi hiệu ứng thẻ bài của đối phương.",
    "scientificLore": "Heli (He, Z=2) cấu hình electron bão hòa hoặc lai hóa $sp^3$ linh hoạt theo chương trình GDPT 2018.",
    "relatedEquation": "He (1s² Closed Duet Octet Equivalent)",
    "iupacName": "Helium Entity",
    "archetype": "NOBLE_VOID",
    "structuredEffects": [
      {
        "effectId": "B04_EFF_34",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "APPLY_STATUS",
            "params": {
              "statusType": "INERT_OCTET"
            }
          }
        ],
        "description": "Kích hoạt khiên bát tử trơ."
      }
    ]
  },
  {
    "id": "card_b04_035_ne_35",
    "name": "Neon — Lăng Kính (Ne Biến Thể 35)",
    "name_en": "Neon — Lăng Kính Kinetic 35",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SECRET_RARE",
    "attribute": "NOBLE_VOID",
    "manaCost": 5,
    "level": 6,
    "atk": 1580,
    "def": 3000,
    "chemicalFormula": "Ne",
    "atomicNumber": 10,
    "effectCode": "ELEM_B04_NE_OCTET_35",
    "effectText": "Lớp vỏ bát tử bền vững: Khi ở tư thế Phòng thủ, không thể bị tiêu diệt bởi hiệu ứng thẻ bài của đối phương.",
    "scientificLore": "Neon (Ne, Z=10) cấu hình electron bão hòa hoặc lai hóa $sp^3$ linh hoạt theo chương trình GDPT 2018.",
    "relatedEquation": "Ne (2s² 2p⁶ Closed Shell)",
    "iupacName": "Neon Entity",
    "archetype": "NOBLE_VOID",
    "structuredEffects": [
      {
        "effectId": "B04_EFF_35",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "APPLY_STATUS",
            "params": {
              "statusType": "INERT_OCTET"
            }
          }
        ],
        "description": "Kích hoạt khiên bát tử trơ."
      }
    ]
  },
  {
    "id": "card_b04_036_ar_36",
    "name": "Argon — Lăng Kính (Ar Biến Thể 36)",
    "name_en": "Argon — Lăng Kính Kinetic 36",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "NOBLE_VOID",
    "manaCost": 5,
    "level": 7,
    "atk": 1760,
    "def": 3250,
    "chemicalFormula": "Ar",
    "atomicNumber": 18,
    "effectCode": "ELEM_B04_AR_OCTET_36",
    "effectText": "Lớp vỏ bát tử bền vững: Khi ở tư thế Phòng thủ, không thể bị tiêu diệt bởi hiệu ứng thẻ bài của đối phương.",
    "scientificLore": "Argon (Ar, Z=18) cấu hình electron bão hòa hoặc lai hóa $sp^3$ linh hoạt theo chương trình GDPT 2018.",
    "relatedEquation": "Ar (3s² 3p⁶ Closed Shell)",
    "iupacName": "Argon Entity",
    "archetype": "NOBLE_VOID",
    "structuredEffects": [
      {
        "effectId": "B04_EFF_36",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "APPLY_STATUS",
            "params": {
              "statusType": "INERT_OCTET"
            }
          }
        ],
        "description": "Kích hoạt khiên bát tử trơ."
      }
    ]
  },
  {
    "id": "card_b04_037_kr_37",
    "name": "Krypton — Lăng Kính (KrF2 Biến Thể 37)",
    "name_en": "Krypton — Lăng Kính Kinetic 37",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "NOBLE_VOID",
    "manaCost": 1,
    "level": 2,
    "atk": 860,
    "def": 2000,
    "chemicalFormula": "KrF2",
    "atomicNumber": 36,
    "effectCode": "ELEM_B04_KR_OCTET_37",
    "effectText": "Lớp vỏ bát tử bền vững: Khi ở tư thế Phòng thủ, không thể bị tiêu diệt bởi hiệu ứng thẻ bài của đối phương.",
    "scientificLore": "Krypton (Kr, Z=36) cấu hình electron bão hòa hoặc lai hóa $sp^3$ linh hoạt theo chương trình GDPT 2018.",
    "relatedEquation": "Kr + F₂ → KrF₂",
    "iupacName": "Krypton Entity",
    "archetype": "NOBLE_VOID",
    "structuredEffects": [
      {
        "effectId": "B04_EFF_37",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "APPLY_STATUS",
            "params": {
              "statusType": "INERT_OCTET"
            }
          }
        ],
        "description": "Kích hoạt khiên bát tử trơ."
      }
    ]
  },
  {
    "id": "card_b04_038_xe_38",
    "name": "Xenon — Lăng Kính (XeF4 Biến Thể 38)",
    "name_en": "Xenon — Lăng Kính Kinetic 38",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "NOBLE_VOID",
    "manaCost": 2,
    "level": 3,
    "atk": 1040,
    "def": 2250,
    "chemicalFormula": "XeF4",
    "atomicNumber": 54,
    "effectCode": "ELEM_B04_XE_OCTET_38",
    "effectText": "Lớp vỏ bát tử bền vững: Khi ở tư thế Phòng thủ, không thể bị tiêu diệt bởi hiệu ứng thẻ bài của đối phương.",
    "scientificLore": "Xenon (Xe, Z=54) cấu hình electron bão hòa hoặc lai hóa $sp^3$ linh hoạt theo chương trình GDPT 2018.",
    "relatedEquation": "Xe + 2F₂ → XeF₄",
    "iupacName": "Xenon Entity",
    "archetype": "NOBLE_VOID",
    "structuredEffects": [
      {
        "effectId": "B04_EFF_38",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "APPLY_STATUS",
            "params": {
              "statusType": "INERT_OCTET"
            }
          }
        ],
        "description": "Kích hoạt khiên bát tử trơ."
      }
    ]
  },
  {
    "id": "card_b04_039_rn_39",
    "name": "Radon — Lăng Kính (RnF2 Biến Thể 39)",
    "name_en": "Radon — Lăng Kính Kinetic 39",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "NOBLE_VOID",
    "manaCost": 3,
    "level": 4,
    "atk": 1220,
    "def": 2500,
    "chemicalFormula": "RnF2",
    "atomicNumber": 86,
    "effectCode": "ELEM_B04_RN_OCTET_39",
    "effectText": "Lớp vỏ bát tử bền vững: Khi ở tư thế Phòng thủ, không thể bị tiêu diệt bởi hiệu ứng thẻ bài của đối phương.",
    "scientificLore": "Radon (Rn, Z=86) cấu hình electron bão hòa hoặc lai hóa $sp^3$ linh hoạt theo chương trình GDPT 2018.",
    "relatedEquation": "Rn + F₂ → RnF₂",
    "iupacName": "Radon Entity",
    "archetype": "NOBLE_VOID",
    "structuredEffects": [
      {
        "effectId": "B04_EFF_39",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "APPLY_STATUS",
            "params": {
              "statusType": "INERT_OCTET"
            }
          }
        ],
        "description": "Kích hoạt khiên bát tử trơ."
      }
    ]
  },
  {
    "id": "card_b04_040_n_40",
    "name": "Nito — Lăng Kính (N2 Biến Thể 40)",
    "name_en": "Nitrogen — Lăng Kính Kinetic 40",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "AERO",
    "manaCost": 4,
    "level": 5,
    "atk": 2150,
    "def": 1700,
    "chemicalFormula": "N2",
    "atomicNumber": 7,
    "effectCode": "ELEM_B04_N_OCTET_40",
    "effectText": "Khi triệu hồi: Đối thủ chịu hiệu ứng nhiễm độc pnictogen, mất 500 LP.",
    "scientificLore": "Nito (N, Z=7) cấu hình electron bão hòa hoặc lai hóa $sp^3$ linh hoạt theo chương trình GDPT 2018.",
    "relatedEquation": "N₂ + 3H₂ ⇌ 2NH₃",
    "iupacName": "Nitrogen Entity",
    "archetype": "PNICTOGEN_SPIRIT",
    "structuredEffects": [
      {
        "effectId": "B04_EFF_40",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Nhiễm độc 300 LP."
      }
    ]
  },
  {
    "id": "card_b04_041_p_41",
    "name": "Photpho — Lăng Kính (P4 Biến Thể 41)",
    "name_en": "Phosphorus — Lăng Kính Kinetic 41",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "PYRO",
    "manaCost": 5,
    "level": 6,
    "atk": 2380,
    "def": 1880,
    "chemicalFormula": "P4",
    "atomicNumber": 15,
    "effectCode": "ELEM_B04_P_OCTET_41",
    "effectText": "Khi triệu hồi: Đối thủ chịu hiệu ứng nhiễm độc pnictogen, mất 200 LP.",
    "scientificLore": "Photpho (P, Z=15) cấu hình electron bão hòa hoặc lai hóa $sp^3$ linh hoạt theo chương trình GDPT 2018.",
    "relatedEquation": "P₄ + 5O₂ → P₄O₁₀",
    "iupacName": "Phosphorus Entity",
    "archetype": "PNICTOGEN_SPIRIT",
    "structuredEffects": [
      {
        "effectId": "B04_EFF_41",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Nhiễm độc 300 LP."
      }
    ]
  },
  {
    "id": "card_b04_042_as_42",
    "name": "Asen — Lăng Kính (As2O3 Biến Thể 42)",
    "name_en": "Arsenic — Lăng Kính Kinetic 42",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "ACID_DARK",
    "manaCost": 5,
    "level": 7,
    "atk": 2610,
    "def": 2060,
    "chemicalFormula": "As2O3",
    "atomicNumber": 33,
    "effectCode": "ELEM_B04_AS_OCTET_42",
    "effectText": "Khi triệu hồi: Đối thủ chịu hiệu ứng nhiễm độc pnictogen, mất 300 LP.",
    "scientificLore": "Asen (As, Z=33) cấu hình electron bão hòa hoặc lai hóa $sp^3$ linh hoạt theo chương trình GDPT 2018.",
    "relatedEquation": "4As + 3O₂ → 2As₂O₃",
    "iupacName": "Arsenic Entity",
    "archetype": "PNICTOGEN_SPIRIT",
    "structuredEffects": [
      {
        "effectId": "B04_EFF_42",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Nhiễm độc 300 LP."
      }
    ]
  },
  {
    "id": "card_b04_043_sb_43",
    "name": "Antimon — Lăng Kính (Sb2S3 Biến Thể 43)",
    "name_en": "Antimony — Lăng Kính Kinetic 43",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "ULTRA_RARE",
    "attribute": "TERRA",
    "manaCost": 1,
    "level": 2,
    "atk": 1460,
    "def": 1160,
    "chemicalFormula": "Sb2S3",
    "atomicNumber": 51,
    "effectCode": "ELEM_B04_SB_OCTET_43",
    "effectText": "Khi triệu hồi: Đối thủ chịu hiệu ứng nhiễm độc pnictogen, mất 400 LP.",
    "scientificLore": "Antimon (Sb, Z=51) cấu hình electron bão hòa hoặc lai hóa $sp^3$ linh hoạt theo chương trình GDPT 2018.",
    "relatedEquation": "2Sb + 3S → Sb₂S₃",
    "iupacName": "Antimony Entity",
    "archetype": "PNICTOGEN_SPIRIT",
    "structuredEffects": [
      {
        "effectId": "B04_EFF_43",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Nhiễm độc 300 LP."
      }
    ]
  },
  {
    "id": "card_b04_044_bi_44",
    "name": "Bismut — Lăng Kính (Bi2O3 Biến Thể 44)",
    "name_en": "Bismuth — Lăng Kính Kinetic 44",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SECRET_RARE",
    "attribute": "TERRA",
    "manaCost": 2,
    "level": 3,
    "atk": 1690,
    "def": 1340,
    "chemicalFormula": "Bi2O3",
    "atomicNumber": 83,
    "effectCode": "ELEM_B04_BI_OCTET_44",
    "effectText": "Khi triệu hồi: Đối thủ chịu hiệu ứng nhiễm độc pnictogen, mất 500 LP.",
    "scientificLore": "Bismut (Bi, Z=83) cấu hình electron bão hòa hoặc lai hóa $sp^3$ linh hoạt theo chương trình GDPT 2018.",
    "relatedEquation": "4Bi + 3O₂ → 2Bi₂O₃",
    "iupacName": "Bismuth Entity",
    "archetype": "PNICTOGEN_SPIRIT",
    "structuredEffects": [
      {
        "effectId": "B04_EFF_44",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Nhiễm độc 300 LP."
      }
    ]
  },
  {
    "id": "card_b04_045_he_45",
    "name": "Heli — Tiên Phong (He Biến Thể 45)",
    "name_en": "Helium — Tiên Phong Kinetic 45",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "NOBLE_VOID",
    "manaCost": 3,
    "level": 4,
    "atk": 1220,
    "def": 2500,
    "chemicalFormula": "He",
    "atomicNumber": 2,
    "effectCode": "ELEM_B04_HE_OCTET_45",
    "effectText": "Lớp vỏ bát tử bền vững: Khi ở tư thế Phòng thủ, không thể bị tiêu diệt bởi hiệu ứng thẻ bài của đối phương.",
    "scientificLore": "Heli (He, Z=2) cấu hình electron bão hòa hoặc lai hóa $sp^3$ linh hoạt theo chương trình GDPT 2018.",
    "relatedEquation": "He (1s² Closed Duet Octet Equivalent)",
    "iupacName": "Helium Entity",
    "archetype": "NOBLE_VOID",
    "structuredEffects": [
      {
        "effectId": "B04_EFF_45",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "APPLY_STATUS",
            "params": {
              "statusType": "INERT_OCTET"
            }
          }
        ],
        "description": "Kích hoạt khiên bát tử trơ."
      }
    ]
  },
  {
    "id": "card_b04_046_ne_46",
    "name": "Neon — Tiên Phong (Ne Biến Thể 46)",
    "name_en": "Neon — Tiên Phong Kinetic 46",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "NOBLE_VOID",
    "manaCost": 4,
    "level": 5,
    "atk": 1400,
    "def": 2750,
    "chemicalFormula": "Ne",
    "atomicNumber": 10,
    "effectCode": "ELEM_B04_NE_OCTET_46",
    "effectText": "Lớp vỏ bát tử bền vững: Khi ở tư thế Phòng thủ, không thể bị tiêu diệt bởi hiệu ứng thẻ bài của đối phương.",
    "scientificLore": "Neon (Ne, Z=10) cấu hình electron bão hòa hoặc lai hóa $sp^3$ linh hoạt theo chương trình GDPT 2018.",
    "relatedEquation": "Ne (2s² 2p⁶ Closed Shell)",
    "iupacName": "Neon Entity",
    "archetype": "NOBLE_VOID",
    "structuredEffects": [
      {
        "effectId": "B04_EFF_46",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "APPLY_STATUS",
            "params": {
              "statusType": "INERT_OCTET"
            }
          }
        ],
        "description": "Kích hoạt khiên bát tử trơ."
      }
    ]
  },
  {
    "id": "card_b04_047_ar_47",
    "name": "Argon — Tiên Phong (Ar Biến Thể 47)",
    "name_en": "Argon — Tiên Phong Kinetic 47",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "NOBLE_VOID",
    "manaCost": 5,
    "level": 6,
    "atk": 1580,
    "def": 3000,
    "chemicalFormula": "Ar",
    "atomicNumber": 18,
    "effectCode": "ELEM_B04_AR_OCTET_47",
    "effectText": "Lớp vỏ bát tử bền vững: Khi ở tư thế Phòng thủ, không thể bị tiêu diệt bởi hiệu ứng thẻ bài của đối phương.",
    "scientificLore": "Argon (Ar, Z=18) cấu hình electron bão hòa hoặc lai hóa $sp^3$ linh hoạt theo chương trình GDPT 2018.",
    "relatedEquation": "Ar (3s² 3p⁶ Closed Shell)",
    "iupacName": "Argon Entity",
    "archetype": "NOBLE_VOID",
    "structuredEffects": [
      {
        "effectId": "B04_EFF_47",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "APPLY_STATUS",
            "params": {
              "statusType": "INERT_OCTET"
            }
          }
        ],
        "description": "Kích hoạt khiên bát tử trơ."
      }
    ]
  },
  {
    "id": "card_b04_048_kr_48",
    "name": "Krypton — Tiên Phong (KrF2 Biến Thể 48)",
    "name_en": "Krypton — Tiên Phong Kinetic 48",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "NOBLE_VOID",
    "manaCost": 5,
    "level": 7,
    "atk": 1760,
    "def": 3250,
    "chemicalFormula": "KrF2",
    "atomicNumber": 36,
    "effectCode": "ELEM_B04_KR_OCTET_48",
    "effectText": "Lớp vỏ bát tử bền vững: Khi ở tư thế Phòng thủ, không thể bị tiêu diệt bởi hiệu ứng thẻ bài của đối phương.",
    "scientificLore": "Krypton (Kr, Z=36) cấu hình electron bão hòa hoặc lai hóa $sp^3$ linh hoạt theo chương trình GDPT 2018.",
    "relatedEquation": "Kr + F₂ → KrF₂",
    "iupacName": "Krypton Entity",
    "archetype": "NOBLE_VOID",
    "structuredEffects": [
      {
        "effectId": "B04_EFF_48",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "APPLY_STATUS",
            "params": {
              "statusType": "INERT_OCTET"
            }
          }
        ],
        "description": "Kích hoạt khiên bát tử trơ."
      }
    ]
  },
  {
    "id": "card_b04_049_xe_49",
    "name": "Xenon — Tiên Phong (XeF4 Biến Thể 49)",
    "name_en": "Xenon — Tiên Phong Kinetic 49",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "NOBLE_VOID",
    "manaCost": 1,
    "level": 2,
    "atk": 860,
    "def": 2000,
    "chemicalFormula": "XeF4",
    "atomicNumber": 54,
    "effectCode": "ELEM_B04_XE_OCTET_49",
    "effectText": "Lớp vỏ bát tử bền vững: Khi ở tư thế Phòng thủ, không thể bị tiêu diệt bởi hiệu ứng thẻ bài của đối phương.",
    "scientificLore": "Xenon (Xe, Z=54) cấu hình electron bão hòa hoặc lai hóa $sp^3$ linh hoạt theo chương trình GDPT 2018.",
    "relatedEquation": "Xe + 2F₂ → XeF₄",
    "iupacName": "Xenon Entity",
    "archetype": "NOBLE_VOID",
    "structuredEffects": [
      {
        "effectId": "B04_EFF_49",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "APPLY_STATUS",
            "params": {
              "statusType": "INERT_OCTET"
            }
          }
        ],
        "description": "Kích hoạt khiên bát tử trơ."
      }
    ]
  },
  {
    "id": "card_b04_050_rn_50",
    "name": "Radon — Tiên Phong (RnF2 Biến Thể 50)",
    "name_en": "Radon — Tiên Phong Kinetic 50",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "NOBLE_VOID",
    "manaCost": 2,
    "level": 3,
    "atk": 1040,
    "def": 2250,
    "chemicalFormula": "RnF2",
    "atomicNumber": 86,
    "effectCode": "ELEM_B04_RN_OCTET_50",
    "effectText": "Lớp vỏ bát tử bền vững: Khi ở tư thế Phòng thủ, không thể bị tiêu diệt bởi hiệu ứng thẻ bài của đối phương.",
    "scientificLore": "Radon (Rn, Z=86) cấu hình electron bão hòa hoặc lai hóa $sp^3$ linh hoạt theo chương trình GDPT 2018.",
    "relatedEquation": "Rn + F₂ → RnF₂",
    "iupacName": "Radon Entity",
    "archetype": "NOBLE_VOID",
    "structuredEffects": [
      {
        "effectId": "B04_EFF_50",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "APPLY_STATUS",
            "params": {
              "statusType": "INERT_OCTET"
            }
          }
        ],
        "description": "Kích hoạt khiên bát tử trơ."
      }
    ]
  },
  {
    "id": "card_b04_051_n_51",
    "name": "Nito — Tiên Phong (N2 Biến Thể 51)",
    "name_en": "Nitrogen — Tiên Phong Kinetic 51",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "AERO",
    "manaCost": 3,
    "level": 4,
    "atk": 1920,
    "def": 1520,
    "chemicalFormula": "N2",
    "atomicNumber": 7,
    "effectCode": "ELEM_B04_N_OCTET_51",
    "effectText": "Khi triệu hồi: Đối thủ chịu hiệu ứng nhiễm độc pnictogen, mất 400 LP.",
    "scientificLore": "Nito (N, Z=7) cấu hình electron bão hòa hoặc lai hóa $sp^3$ linh hoạt theo chương trình GDPT 2018.",
    "relatedEquation": "N₂ + 3H₂ ⇌ 2NH₃",
    "iupacName": "Nitrogen Entity",
    "archetype": "PNICTOGEN_SPIRIT",
    "structuredEffects": [
      {
        "effectId": "B04_EFF_51",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Nhiễm độc 300 LP."
      }
    ]
  },
  {
    "id": "card_b04_052_p_52",
    "name": "Photpho — Tiên Phong (P4 Biến Thể 52)",
    "name_en": "Phosphorus — Tiên Phong Kinetic 52",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "ULTRA_RARE",
    "attribute": "PYRO",
    "manaCost": 4,
    "level": 5,
    "atk": 2150,
    "def": 1700,
    "chemicalFormula": "P4",
    "atomicNumber": 15,
    "effectCode": "ELEM_B04_P_OCTET_52",
    "effectText": "Khi triệu hồi: Đối thủ chịu hiệu ứng nhiễm độc pnictogen, mất 500 LP.",
    "scientificLore": "Photpho (P, Z=15) cấu hình electron bão hòa hoặc lai hóa $sp^3$ linh hoạt theo chương trình GDPT 2018.",
    "relatedEquation": "P₄ + 5O₂ → P₄O₁₀",
    "iupacName": "Phosphorus Entity",
    "archetype": "PNICTOGEN_SPIRIT",
    "structuredEffects": [
      {
        "effectId": "B04_EFF_52",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Nhiễm độc 300 LP."
      }
    ]
  },
  {
    "id": "card_b04_053_as_53",
    "name": "Asen — Tiên Phong (As2O3 Biến Thể 53)",
    "name_en": "Arsenic — Tiên Phong Kinetic 53",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SECRET_RARE",
    "attribute": "ACID_DARK",
    "manaCost": 5,
    "level": 6,
    "atk": 2380,
    "def": 1880,
    "chemicalFormula": "As2O3",
    "atomicNumber": 33,
    "effectCode": "ELEM_B04_AS_OCTET_53",
    "effectText": "Khi triệu hồi: Đối thủ chịu hiệu ứng nhiễm độc pnictogen, mất 200 LP.",
    "scientificLore": "Asen (As, Z=33) cấu hình electron bão hòa hoặc lai hóa $sp^3$ linh hoạt theo chương trình GDPT 2018.",
    "relatedEquation": "4As + 3O₂ → 2As₂O₃",
    "iupacName": "Arsenic Entity",
    "archetype": "PNICTOGEN_SPIRIT",
    "structuredEffects": [
      {
        "effectId": "B04_EFF_53",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Nhiễm độc 300 LP."
      }
    ]
  },
  {
    "id": "card_b04_054_sb_54",
    "name": "Antimon — Tiên Phong (Sb2S3 Biến Thể 54)",
    "name_en": "Antimony — Tiên Phong Kinetic 54",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "TERRA",
    "manaCost": 5,
    "level": 7,
    "atk": 2610,
    "def": 2060,
    "chemicalFormula": "Sb2S3",
    "atomicNumber": 51,
    "effectCode": "ELEM_B04_SB_OCTET_54",
    "effectText": "Khi triệu hồi: Đối thủ chịu hiệu ứng nhiễm độc pnictogen, mất 300 LP.",
    "scientificLore": "Antimon (Sb, Z=51) cấu hình electron bão hòa hoặc lai hóa $sp^3$ linh hoạt theo chương trình GDPT 2018.",
    "relatedEquation": "2Sb + 3S → Sb₂S₃",
    "iupacName": "Antimony Entity",
    "archetype": "PNICTOGEN_SPIRIT",
    "structuredEffects": [
      {
        "effectId": "B04_EFF_54",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Nhiễm độc 300 LP."
      }
    ]
  },
  {
    "id": "card_b04_055_bi_55",
    "name": "Bismut — Tiên Phong (Bi2O3 Biến Thể 55)",
    "name_en": "Bismuth — Tiên Phong Kinetic 55",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "TERRA",
    "manaCost": 1,
    "level": 2,
    "atk": 1460,
    "def": 1160,
    "chemicalFormula": "Bi2O3",
    "atomicNumber": 83,
    "effectCode": "ELEM_B04_BI_OCTET_55",
    "effectText": "Khi triệu hồi: Đối thủ chịu hiệu ứng nhiễm độc pnictogen, mất 400 LP.",
    "scientificLore": "Bismut (Bi, Z=83) cấu hình electron bão hòa hoặc lai hóa $sp^3$ linh hoạt theo chương trình GDPT 2018.",
    "relatedEquation": "4Bi + 3O₂ → 2Bi₂O₃",
    "iupacName": "Bismuth Entity",
    "archetype": "PNICTOGEN_SPIRIT",
    "structuredEffects": [
      {
        "effectId": "B04_EFF_55",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Nhiễm độc 300 LP."
      }
    ]
  },
  {
    "id": "card_b04_056_he_56",
    "name": "Heli — Trọng Pháo (He Biến Thể 56)",
    "name_en": "Helium — Trọng Pháo Kinetic 56",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "NOBLE_VOID",
    "manaCost": 2,
    "level": 3,
    "atk": 1040,
    "def": 2250,
    "chemicalFormula": "He",
    "atomicNumber": 2,
    "effectCode": "ELEM_B04_HE_OCTET_56",
    "effectText": "Lớp vỏ bát tử bền vững: Khi ở tư thế Phòng thủ, không thể bị tiêu diệt bởi hiệu ứng thẻ bài của đối phương.",
    "scientificLore": "Heli (He, Z=2) cấu hình electron bão hòa hoặc lai hóa $sp^3$ linh hoạt theo chương trình GDPT 2018.",
    "relatedEquation": "He (1s² Closed Duet Octet Equivalent)",
    "iupacName": "Helium Entity",
    "archetype": "NOBLE_VOID",
    "structuredEffects": [
      {
        "effectId": "B04_EFF_56",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "APPLY_STATUS",
            "params": {
              "statusType": "INERT_OCTET"
            }
          }
        ],
        "description": "Kích hoạt khiên bát tử trơ."
      }
    ]
  },
  {
    "id": "card_b04_057_ne_57",
    "name": "Neon — Trọng Pháo (Ne Biến Thể 57)",
    "name_en": "Neon — Trọng Pháo Kinetic 57",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "NOBLE_VOID",
    "manaCost": 3,
    "level": 4,
    "atk": 1220,
    "def": 2500,
    "chemicalFormula": "Ne",
    "atomicNumber": 10,
    "effectCode": "ELEM_B04_NE_OCTET_57",
    "effectText": "Lớp vỏ bát tử bền vững: Khi ở tư thế Phòng thủ, không thể bị tiêu diệt bởi hiệu ứng thẻ bài của đối phương.",
    "scientificLore": "Neon (Ne, Z=10) cấu hình electron bão hòa hoặc lai hóa $sp^3$ linh hoạt theo chương trình GDPT 2018.",
    "relatedEquation": "Ne (2s² 2p⁶ Closed Shell)",
    "iupacName": "Neon Entity",
    "archetype": "NOBLE_VOID",
    "structuredEffects": [
      {
        "effectId": "B04_EFF_57",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "APPLY_STATUS",
            "params": {
              "statusType": "INERT_OCTET"
            }
          }
        ],
        "description": "Kích hoạt khiên bát tử trơ."
      }
    ]
  },
  {
    "id": "card_b04_058_ar_58",
    "name": "Argon — Trọng Pháo (Ar Biến Thể 58)",
    "name_en": "Argon — Trọng Pháo Kinetic 58",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "NOBLE_VOID",
    "manaCost": 4,
    "level": 5,
    "atk": 1400,
    "def": 2750,
    "chemicalFormula": "Ar",
    "atomicNumber": 18,
    "effectCode": "ELEM_B04_AR_OCTET_58",
    "effectText": "Lớp vỏ bát tử bền vững: Khi ở tư thế Phòng thủ, không thể bị tiêu diệt bởi hiệu ứng thẻ bài của đối phương.",
    "scientificLore": "Argon (Ar, Z=18) cấu hình electron bão hòa hoặc lai hóa $sp^3$ linh hoạt theo chương trình GDPT 2018.",
    "relatedEquation": "Ar (3s² 3p⁶ Closed Shell)",
    "iupacName": "Argon Entity",
    "archetype": "NOBLE_VOID",
    "structuredEffects": [
      {
        "effectId": "B04_EFF_58",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "APPLY_STATUS",
            "params": {
              "statusType": "INERT_OCTET"
            }
          }
        ],
        "description": "Kích hoạt khiên bát tử trơ."
      }
    ]
  },
  {
    "id": "card_b04_059_kr_59",
    "name": "Krypton — Trọng Pháo (KrF2 Biến Thể 59)",
    "name_en": "Krypton — Trọng Pháo Kinetic 59",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "NOBLE_VOID",
    "manaCost": 5,
    "level": 6,
    "atk": 1580,
    "def": 3000,
    "chemicalFormula": "KrF2",
    "atomicNumber": 36,
    "effectCode": "ELEM_B04_KR_OCTET_59",
    "effectText": "Lớp vỏ bát tử bền vững: Khi ở tư thế Phòng thủ, không thể bị tiêu diệt bởi hiệu ứng thẻ bài của đối phương.",
    "scientificLore": "Krypton (Kr, Z=36) cấu hình electron bão hòa hoặc lai hóa $sp^3$ linh hoạt theo chương trình GDPT 2018.",
    "relatedEquation": "Kr + F₂ → KrF₂",
    "iupacName": "Krypton Entity",
    "archetype": "NOBLE_VOID",
    "structuredEffects": [
      {
        "effectId": "B04_EFF_59",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "APPLY_STATUS",
            "params": {
              "statusType": "INERT_OCTET"
            }
          }
        ],
        "description": "Kích hoạt khiên bát tử trơ."
      }
    ]
  },
  {
    "id": "card_b04_060_xe_60",
    "name": "Xenon — Trọng Pháo (XeF4 Biến Thể 60)",
    "name_en": "Xenon — Trọng Pháo Kinetic 60",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "NOBLE_VOID",
    "manaCost": 5,
    "level": 7,
    "atk": 1760,
    "def": 3250,
    "chemicalFormula": "XeF4",
    "atomicNumber": 54,
    "effectCode": "ELEM_B04_XE_OCTET_60",
    "effectText": "Lớp vỏ bát tử bền vững: Khi ở tư thế Phòng thủ, không thể bị tiêu diệt bởi hiệu ứng thẻ bài của đối phương.",
    "scientificLore": "Xenon (Xe, Z=54) cấu hình electron bão hòa hoặc lai hóa $sp^3$ linh hoạt theo chương trình GDPT 2018.",
    "relatedEquation": "Xe + 2F₂ → XeF₄",
    "iupacName": "Xenon Entity",
    "archetype": "NOBLE_VOID",
    "structuredEffects": [
      {
        "effectId": "B04_EFF_60",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "APPLY_STATUS",
            "params": {
              "statusType": "INERT_OCTET"
            }
          }
        ],
        "description": "Kích hoạt khiên bát tử trơ."
      }
    ]
  },
  {
    "id": "card_b04_061_rn_61",
    "name": "Radon — Trọng Pháo (RnF2 Biến Thể 61)",
    "name_en": "Radon — Trọng Pháo Kinetic 61",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "ULTRA_RARE",
    "attribute": "NOBLE_VOID",
    "manaCost": 1,
    "level": 2,
    "atk": 860,
    "def": 2000,
    "chemicalFormula": "RnF2",
    "atomicNumber": 86,
    "effectCode": "ELEM_B04_RN_OCTET_61",
    "effectText": "Lớp vỏ bát tử bền vững: Khi ở tư thế Phòng thủ, không thể bị tiêu diệt bởi hiệu ứng thẻ bài của đối phương.",
    "scientificLore": "Radon (Rn, Z=86) cấu hình electron bão hòa hoặc lai hóa $sp^3$ linh hoạt theo chương trình GDPT 2018.",
    "relatedEquation": "Rn + F₂ → RnF₂",
    "iupacName": "Radon Entity",
    "archetype": "NOBLE_VOID",
    "structuredEffects": [
      {
        "effectId": "B04_EFF_61",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "APPLY_STATUS",
            "params": {
              "statusType": "INERT_OCTET"
            }
          }
        ],
        "description": "Kích hoạt khiên bát tử trơ."
      }
    ]
  },
  {
    "id": "card_b04_062_n_62",
    "name": "Nito — Trọng Pháo (N2 Biến Thể 62)",
    "name_en": "Nitrogen — Trọng Pháo Kinetic 62",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SECRET_RARE",
    "attribute": "AERO",
    "manaCost": 2,
    "level": 3,
    "atk": 1690,
    "def": 1340,
    "chemicalFormula": "N2",
    "atomicNumber": 7,
    "effectCode": "ELEM_B04_N_OCTET_62",
    "effectText": "Khi triệu hồi: Đối thủ chịu hiệu ứng nhiễm độc pnictogen, mất 300 LP.",
    "scientificLore": "Nito (N, Z=7) cấu hình electron bão hòa hoặc lai hóa $sp^3$ linh hoạt theo chương trình GDPT 2018.",
    "relatedEquation": "N₂ + 3H₂ ⇌ 2NH₃",
    "iupacName": "Nitrogen Entity",
    "archetype": "PNICTOGEN_SPIRIT",
    "structuredEffects": [
      {
        "effectId": "B04_EFF_62",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Nhiễm độc 300 LP."
      }
    ]
  },
  {
    "id": "card_b04_063_p_63",
    "name": "Photpho — Trọng Pháo (P4 Biến Thể 63)",
    "name_en": "Phosphorus — Trọng Pháo Kinetic 63",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "PYRO",
    "manaCost": 3,
    "level": 4,
    "atk": 1920,
    "def": 1520,
    "chemicalFormula": "P4",
    "atomicNumber": 15,
    "effectCode": "ELEM_B04_P_OCTET_63",
    "effectText": "Khi triệu hồi: Đối thủ chịu hiệu ứng nhiễm độc pnictogen, mất 400 LP.",
    "scientificLore": "Photpho (P, Z=15) cấu hình electron bão hòa hoặc lai hóa $sp^3$ linh hoạt theo chương trình GDPT 2018.",
    "relatedEquation": "P₄ + 5O₂ → P₄O₁₀",
    "iupacName": "Phosphorus Entity",
    "archetype": "PNICTOGEN_SPIRIT",
    "structuredEffects": [
      {
        "effectId": "B04_EFF_63",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Nhiễm độc 300 LP."
      }
    ]
  },
  {
    "id": "card_b04_064_as_64",
    "name": "Asen — Trọng Pháo (As2O3 Biến Thể 64)",
    "name_en": "Arsenic — Trọng Pháo Kinetic 64",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "ACID_DARK",
    "manaCost": 4,
    "level": 5,
    "atk": 2150,
    "def": 1700,
    "chemicalFormula": "As2O3",
    "atomicNumber": 33,
    "effectCode": "ELEM_B04_AS_OCTET_64",
    "effectText": "Khi triệu hồi: Đối thủ chịu hiệu ứng nhiễm độc pnictogen, mất 500 LP.",
    "scientificLore": "Asen (As, Z=33) cấu hình electron bão hòa hoặc lai hóa $sp^3$ linh hoạt theo chương trình GDPT 2018.",
    "relatedEquation": "4As + 3O₂ → 2As₂O₃",
    "iupacName": "Arsenic Entity",
    "archetype": "PNICTOGEN_SPIRIT",
    "structuredEffects": [
      {
        "effectId": "B04_EFF_64",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Nhiễm độc 300 LP."
      }
    ]
  },
  {
    "id": "card_b04_065_sb_65",
    "name": "Antimon — Trọng Pháo (Sb2S3 Biến Thể 65)",
    "name_en": "Antimony — Trọng Pháo Kinetic 65",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "TERRA",
    "manaCost": 5,
    "level": 6,
    "atk": 2380,
    "def": 1880,
    "chemicalFormula": "Sb2S3",
    "atomicNumber": 51,
    "effectCode": "ELEM_B04_SB_OCTET_65",
    "effectText": "Khi triệu hồi: Đối thủ chịu hiệu ứng nhiễm độc pnictogen, mất 200 LP.",
    "scientificLore": "Antimon (Sb, Z=51) cấu hình electron bão hòa hoặc lai hóa $sp^3$ linh hoạt theo chương trình GDPT 2018.",
    "relatedEquation": "2Sb + 3S → Sb₂S₃",
    "iupacName": "Antimony Entity",
    "archetype": "PNICTOGEN_SPIRIT",
    "structuredEffects": [
      {
        "effectId": "B04_EFF_65",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Nhiễm độc 300 LP."
      }
    ]
  },
  {
    "id": "card_b04_066_bi_66",
    "name": "Bismut — Trọng Pháo (Bi2O3 Biến Thể 66)",
    "name_en": "Bismuth — Trọng Pháo Kinetic 66",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "TERRA",
    "manaCost": 5,
    "level": 7,
    "atk": 2610,
    "def": 2060,
    "chemicalFormula": "Bi2O3",
    "atomicNumber": 83,
    "effectCode": "ELEM_B04_BI_OCTET_66",
    "effectText": "Khi triệu hồi: Đối thủ chịu hiệu ứng nhiễm độc pnictogen, mất 300 LP.",
    "scientificLore": "Bismut (Bi, Z=83) cấu hình electron bão hòa hoặc lai hóa $sp^3$ linh hoạt theo chương trình GDPT 2018.",
    "relatedEquation": "4Bi + 3O₂ → 2Bi₂O₃",
    "iupacName": "Bismuth Entity",
    "archetype": "PNICTOGEN_SPIRIT",
    "structuredEffects": [
      {
        "effectId": "B04_EFF_66",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Nhiễm độc 300 LP."
      }
    ]
  },
  {
    "id": "card_b04_067_he_67",
    "name": "Heli — Hộ Thần (He Biến Thể 67)",
    "name_en": "Helium — Hộ Thần Kinetic 67",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "NOBLE_VOID",
    "manaCost": 1,
    "level": 2,
    "atk": 860,
    "def": 2000,
    "chemicalFormula": "He",
    "atomicNumber": 2,
    "effectCode": "ELEM_B04_HE_OCTET_67",
    "effectText": "Lớp vỏ bát tử bền vững: Khi ở tư thế Phòng thủ, không thể bị tiêu diệt bởi hiệu ứng thẻ bài của đối phương.",
    "scientificLore": "Heli (He, Z=2) cấu hình electron bão hòa hoặc lai hóa $sp^3$ linh hoạt theo chương trình GDPT 2018.",
    "relatedEquation": "He (1s² Closed Duet Octet Equivalent)",
    "iupacName": "Helium Entity",
    "archetype": "NOBLE_VOID",
    "structuredEffects": [
      {
        "effectId": "B04_EFF_67",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "APPLY_STATUS",
            "params": {
              "statusType": "INERT_OCTET"
            }
          }
        ],
        "description": "Kích hoạt khiên bát tử trơ."
      }
    ]
  },
  {
    "id": "card_b04_068_ne_68",
    "name": "Neon — Hộ Thần (Ne Biến Thể 68)",
    "name_en": "Neon — Hộ Thần Kinetic 68",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "NOBLE_VOID",
    "manaCost": 2,
    "level": 3,
    "atk": 1040,
    "def": 2250,
    "chemicalFormula": "Ne",
    "atomicNumber": 10,
    "effectCode": "ELEM_B04_NE_OCTET_68",
    "effectText": "Lớp vỏ bát tử bền vững: Khi ở tư thế Phòng thủ, không thể bị tiêu diệt bởi hiệu ứng thẻ bài của đối phương.",
    "scientificLore": "Neon (Ne, Z=10) cấu hình electron bão hòa hoặc lai hóa $sp^3$ linh hoạt theo chương trình GDPT 2018.",
    "relatedEquation": "Ne (2s² 2p⁶ Closed Shell)",
    "iupacName": "Neon Entity",
    "archetype": "NOBLE_VOID",
    "structuredEffects": [
      {
        "effectId": "B04_EFF_68",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "APPLY_STATUS",
            "params": {
              "statusType": "INERT_OCTET"
            }
          }
        ],
        "description": "Kích hoạt khiên bát tử trơ."
      }
    ]
  },
  {
    "id": "card_b04_069_ar_69",
    "name": "Argon — Hộ Thần (Ar Biến Thể 69)",
    "name_en": "Argon — Hộ Thần Kinetic 69",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "NOBLE_VOID",
    "manaCost": 3,
    "level": 4,
    "atk": 1220,
    "def": 2500,
    "chemicalFormula": "Ar",
    "atomicNumber": 18,
    "effectCode": "ELEM_B04_AR_OCTET_69",
    "effectText": "Lớp vỏ bát tử bền vững: Khi ở tư thế Phòng thủ, không thể bị tiêu diệt bởi hiệu ứng thẻ bài của đối phương.",
    "scientificLore": "Argon (Ar, Z=18) cấu hình electron bão hòa hoặc lai hóa $sp^3$ linh hoạt theo chương trình GDPT 2018.",
    "relatedEquation": "Ar (3s² 3p⁶ Closed Shell)",
    "iupacName": "Argon Entity",
    "archetype": "NOBLE_VOID",
    "structuredEffects": [
      {
        "effectId": "B04_EFF_69",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "APPLY_STATUS",
            "params": {
              "statusType": "INERT_OCTET"
            }
          }
        ],
        "description": "Kích hoạt khiên bát tử trơ."
      }
    ]
  },
  {
    "id": "card_b04_070_kr_70",
    "name": "Krypton — Hộ Thần (KrF2 Biến Thể 70)",
    "name_en": "Krypton — Hộ Thần Kinetic 70",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "ULTRA_RARE",
    "attribute": "NOBLE_VOID",
    "manaCost": 4,
    "level": 5,
    "atk": 1400,
    "def": 2750,
    "chemicalFormula": "KrF2",
    "atomicNumber": 36,
    "effectCode": "ELEM_B04_KR_OCTET_70",
    "effectText": "Lớp vỏ bát tử bền vững: Khi ở tư thế Phòng thủ, không thể bị tiêu diệt bởi hiệu ứng thẻ bài của đối phương.",
    "scientificLore": "Krypton (Kr, Z=36) cấu hình electron bão hòa hoặc lai hóa $sp^3$ linh hoạt theo chương trình GDPT 2018.",
    "relatedEquation": "Kr + F₂ → KrF₂",
    "iupacName": "Krypton Entity",
    "archetype": "NOBLE_VOID",
    "structuredEffects": [
      {
        "effectId": "B04_EFF_70",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "APPLY_STATUS",
            "params": {
              "statusType": "INERT_OCTET"
            }
          }
        ],
        "description": "Kích hoạt khiên bát tử trơ."
      }
    ]
  },
  {
    "id": "card_b04_071_xe_71",
    "name": "Xenon — Hộ Thần (XeF4 Biến Thể 71)",
    "name_en": "Xenon — Hộ Thần Kinetic 71",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SECRET_RARE",
    "attribute": "NOBLE_VOID",
    "manaCost": 5,
    "level": 6,
    "atk": 1580,
    "def": 3000,
    "chemicalFormula": "XeF4",
    "atomicNumber": 54,
    "effectCode": "ELEM_B04_XE_OCTET_71",
    "effectText": "Lớp vỏ bát tử bền vững: Khi ở tư thế Phòng thủ, không thể bị tiêu diệt bởi hiệu ứng thẻ bài của đối phương.",
    "scientificLore": "Xenon (Xe, Z=54) cấu hình electron bão hòa hoặc lai hóa $sp^3$ linh hoạt theo chương trình GDPT 2018.",
    "relatedEquation": "Xe + 2F₂ → XeF₄",
    "iupacName": "Xenon Entity",
    "archetype": "NOBLE_VOID",
    "structuredEffects": [
      {
        "effectId": "B04_EFF_71",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "APPLY_STATUS",
            "params": {
              "statusType": "INERT_OCTET"
            }
          }
        ],
        "description": "Kích hoạt khiên bát tử trơ."
      }
    ]
  },
  {
    "id": "card_b04_072_rn_72",
    "name": "Radon — Hộ Thần (RnF2 Biến Thể 72)",
    "name_en": "Radon — Hộ Thần Kinetic 72",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "NOBLE_VOID",
    "manaCost": 5,
    "level": 7,
    "atk": 1760,
    "def": 3250,
    "chemicalFormula": "RnF2",
    "atomicNumber": 86,
    "effectCode": "ELEM_B04_RN_OCTET_72",
    "effectText": "Lớp vỏ bát tử bền vững: Khi ở tư thế Phòng thủ, không thể bị tiêu diệt bởi hiệu ứng thẻ bài của đối phương.",
    "scientificLore": "Radon (Rn, Z=86) cấu hình electron bão hòa hoặc lai hóa $sp^3$ linh hoạt theo chương trình GDPT 2018.",
    "relatedEquation": "Rn + F₂ → RnF₂",
    "iupacName": "Radon Entity",
    "archetype": "NOBLE_VOID",
    "structuredEffects": [
      {
        "effectId": "B04_EFF_72",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "APPLY_STATUS",
            "params": {
              "statusType": "INERT_OCTET"
            }
          }
        ],
        "description": "Kích hoạt khiên bát tử trơ."
      }
    ]
  },
  {
    "id": "card_b04_073_n_73",
    "name": "Nito — Hộ Thần (N2 Biến Thể 73)",
    "name_en": "Nitrogen — Hộ Thần Kinetic 73",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "AERO",
    "manaCost": 1,
    "level": 2,
    "atk": 1460,
    "def": 1160,
    "chemicalFormula": "N2",
    "atomicNumber": 7,
    "effectCode": "ELEM_B04_N_OCTET_73",
    "effectText": "Khi triệu hồi: Đối thủ chịu hiệu ứng nhiễm độc pnictogen, mất 200 LP.",
    "scientificLore": "Nito (N, Z=7) cấu hình electron bão hòa hoặc lai hóa $sp^3$ linh hoạt theo chương trình GDPT 2018.",
    "relatedEquation": "N₂ + 3H₂ ⇌ 2NH₃",
    "iupacName": "Nitrogen Entity",
    "archetype": "PNICTOGEN_SPIRIT",
    "structuredEffects": [
      {
        "effectId": "B04_EFF_73",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Nhiễm độc 300 LP."
      }
    ]
  },
  {
    "id": "card_b04_074_p_74",
    "name": "Photpho — Hộ Thần (P4 Biến Thể 74)",
    "name_en": "Phosphorus — Hộ Thần Kinetic 74",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "PYRO",
    "manaCost": 2,
    "level": 3,
    "atk": 1690,
    "def": 1340,
    "chemicalFormula": "P4",
    "atomicNumber": 15,
    "effectCode": "ELEM_B04_P_OCTET_74",
    "effectText": "Khi triệu hồi: Đối thủ chịu hiệu ứng nhiễm độc pnictogen, mất 300 LP.",
    "scientificLore": "Photpho (P, Z=15) cấu hình electron bão hòa hoặc lai hóa $sp^3$ linh hoạt theo chương trình GDPT 2018.",
    "relatedEquation": "P₄ + 5O₂ → P₄O₁₀",
    "iupacName": "Phosphorus Entity",
    "archetype": "PNICTOGEN_SPIRIT",
    "structuredEffects": [
      {
        "effectId": "B04_EFF_74",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Nhiễm độc 300 LP."
      }
    ]
  },
  {
    "id": "card_b04_075_as_75",
    "name": "Asen — Hộ Thần (As2O3 Biến Thể 75)",
    "name_en": "Arsenic — Hộ Thần Kinetic 75",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "ACID_DARK",
    "manaCost": 3,
    "level": 4,
    "atk": 1920,
    "def": 1520,
    "chemicalFormula": "As2O3",
    "atomicNumber": 33,
    "effectCode": "ELEM_B04_AS_OCTET_75",
    "effectText": "Khi triệu hồi: Đối thủ chịu hiệu ứng nhiễm độc pnictogen, mất 400 LP.",
    "scientificLore": "Asen (As, Z=33) cấu hình electron bão hòa hoặc lai hóa $sp^3$ linh hoạt theo chương trình GDPT 2018.",
    "relatedEquation": "4As + 3O₂ → 2As₂O₃",
    "iupacName": "Arsenic Entity",
    "archetype": "PNICTOGEN_SPIRIT",
    "structuredEffects": [
      {
        "effectId": "B04_EFF_75",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Nhiễm độc 300 LP."
      }
    ]
  },
  {
    "id": "card_b04_076_sb_76",
    "name": "Antimon — Hộ Thần (Sb2S3 Biến Thể 76)",
    "name_en": "Antimony — Hộ Thần Kinetic 76",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "TERRA",
    "manaCost": 4,
    "level": 5,
    "atk": 2150,
    "def": 1700,
    "chemicalFormula": "Sb2S3",
    "atomicNumber": 51,
    "effectCode": "ELEM_B04_SB_OCTET_76",
    "effectText": "Khi triệu hồi: Đối thủ chịu hiệu ứng nhiễm độc pnictogen, mất 500 LP.",
    "scientificLore": "Antimon (Sb, Z=51) cấu hình electron bão hòa hoặc lai hóa $sp^3$ linh hoạt theo chương trình GDPT 2018.",
    "relatedEquation": "2Sb + 3S → Sb₂S₃",
    "iupacName": "Antimony Entity",
    "archetype": "PNICTOGEN_SPIRIT",
    "structuredEffects": [
      {
        "effectId": "B04_EFF_76",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Nhiễm độc 300 LP."
      }
    ]
  },
  {
    "id": "card_b04_077_bi_77",
    "name": "Bismut — Hộ Thần (Bi2O3 Biến Thể 77)",
    "name_en": "Bismuth — Hộ Thần Kinetic 77",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "TERRA",
    "manaCost": 5,
    "level": 6,
    "atk": 2380,
    "def": 1880,
    "chemicalFormula": "Bi2O3",
    "atomicNumber": 83,
    "effectCode": "ELEM_B04_BI_OCTET_77",
    "effectText": "Khi triệu hồi: Đối thủ chịu hiệu ứng nhiễm độc pnictogen, mất 200 LP.",
    "scientificLore": "Bismut (Bi, Z=83) cấu hình electron bão hòa hoặc lai hóa $sp^3$ linh hoạt theo chương trình GDPT 2018.",
    "relatedEquation": "4Bi + 3O₂ → 2Bi₂O₃",
    "iupacName": "Bismuth Entity",
    "archetype": "PNICTOGEN_SPIRIT",
    "structuredEffects": [
      {
        "effectId": "B04_EFF_77",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Nhiễm độc 300 LP."
      }
    ]
  },
  {
    "id": "card_b04_078_he_78",
    "name": "Heli — Linh Hồn (He Biến Thể 78)",
    "name_en": "Helium — Linh Hồn Kinetic 78",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "NOBLE_VOID",
    "manaCost": 5,
    "level": 7,
    "atk": 1760,
    "def": 3250,
    "chemicalFormula": "He",
    "atomicNumber": 2,
    "effectCode": "ELEM_B04_HE_OCTET_78",
    "effectText": "Lớp vỏ bát tử bền vững: Khi ở tư thế Phòng thủ, không thể bị tiêu diệt bởi hiệu ứng thẻ bài của đối phương.",
    "scientificLore": "Heli (He, Z=2) cấu hình electron bão hòa hoặc lai hóa $sp^3$ linh hoạt theo chương trình GDPT 2018.",
    "relatedEquation": "He (1s² Closed Duet Octet Equivalent)",
    "iupacName": "Helium Entity",
    "archetype": "NOBLE_VOID",
    "structuredEffects": [
      {
        "effectId": "B04_EFF_78",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "APPLY_STATUS",
            "params": {
              "statusType": "INERT_OCTET"
            }
          }
        ],
        "description": "Kích hoạt khiên bát tử trơ."
      }
    ]
  },
  {
    "id": "card_b04_079_ne_79",
    "name": "Neon — Linh Hồn (Ne Biến Thể 79)",
    "name_en": "Neon — Linh Hồn Kinetic 79",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "ULTRA_RARE",
    "attribute": "NOBLE_VOID",
    "manaCost": 1,
    "level": 2,
    "atk": 860,
    "def": 2000,
    "chemicalFormula": "Ne",
    "atomicNumber": 10,
    "effectCode": "ELEM_B04_NE_OCTET_79",
    "effectText": "Lớp vỏ bát tử bền vững: Khi ở tư thế Phòng thủ, không thể bị tiêu diệt bởi hiệu ứng thẻ bài của đối phương.",
    "scientificLore": "Neon (Ne, Z=10) cấu hình electron bão hòa hoặc lai hóa $sp^3$ linh hoạt theo chương trình GDPT 2018.",
    "relatedEquation": "Ne (2s² 2p⁶ Closed Shell)",
    "iupacName": "Neon Entity",
    "archetype": "NOBLE_VOID",
    "structuredEffects": [
      {
        "effectId": "B04_EFF_79",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "APPLY_STATUS",
            "params": {
              "statusType": "INERT_OCTET"
            }
          }
        ],
        "description": "Kích hoạt khiên bát tử trơ."
      }
    ]
  },
  {
    "id": "card_b04_080_ar_80",
    "name": "Argon — Linh Hồn (Ar Biến Thể 80)",
    "name_en": "Argon — Linh Hồn Kinetic 80",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SECRET_RARE",
    "attribute": "NOBLE_VOID",
    "manaCost": 2,
    "level": 3,
    "atk": 1040,
    "def": 2250,
    "chemicalFormula": "Ar",
    "atomicNumber": 18,
    "effectCode": "ELEM_B04_AR_OCTET_80",
    "effectText": "Lớp vỏ bát tử bền vững: Khi ở tư thế Phòng thủ, không thể bị tiêu diệt bởi hiệu ứng thẻ bài của đối phương.",
    "scientificLore": "Argon (Ar, Z=18) cấu hình electron bão hòa hoặc lai hóa $sp^3$ linh hoạt theo chương trình GDPT 2018.",
    "relatedEquation": "Ar (3s² 3p⁶ Closed Shell)",
    "iupacName": "Argon Entity",
    "archetype": "NOBLE_VOID",
    "structuredEffects": [
      {
        "effectId": "B04_EFF_80",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "APPLY_STATUS",
            "params": {
              "statusType": "INERT_OCTET"
            }
          }
        ],
        "description": "Kích hoạt khiên bát tử trơ."
      }
    ]
  },
  {
    "id": "card_b04_081_kr_81",
    "name": "Krypton — Linh Hồn (KrF2 Biến Thể 81)",
    "name_en": "Krypton — Linh Hồn Kinetic 81",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "NOBLE_VOID",
    "manaCost": 3,
    "level": 4,
    "atk": 1220,
    "def": 2500,
    "chemicalFormula": "KrF2",
    "atomicNumber": 36,
    "effectCode": "ELEM_B04_KR_OCTET_81",
    "effectText": "Lớp vỏ bát tử bền vững: Khi ở tư thế Phòng thủ, không thể bị tiêu diệt bởi hiệu ứng thẻ bài của đối phương.",
    "scientificLore": "Krypton (Kr, Z=36) cấu hình electron bão hòa hoặc lai hóa $sp^3$ linh hoạt theo chương trình GDPT 2018.",
    "relatedEquation": "Kr + F₂ → KrF₂",
    "iupacName": "Krypton Entity",
    "archetype": "NOBLE_VOID",
    "structuredEffects": [
      {
        "effectId": "B04_EFF_81",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "APPLY_STATUS",
            "params": {
              "statusType": "INERT_OCTET"
            }
          }
        ],
        "description": "Kích hoạt khiên bát tử trơ."
      }
    ]
  },
  {
    "id": "card_b04_082_xe_82",
    "name": "Xenon — Linh Hồn (XeF4 Biến Thể 82)",
    "name_en": "Xenon — Linh Hồn Kinetic 82",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "NOBLE_VOID",
    "manaCost": 4,
    "level": 5,
    "atk": 1400,
    "def": 2750,
    "chemicalFormula": "XeF4",
    "atomicNumber": 54,
    "effectCode": "ELEM_B04_XE_OCTET_82",
    "effectText": "Lớp vỏ bát tử bền vững: Khi ở tư thế Phòng thủ, không thể bị tiêu diệt bởi hiệu ứng thẻ bài của đối phương.",
    "scientificLore": "Xenon (Xe, Z=54) cấu hình electron bão hòa hoặc lai hóa $sp^3$ linh hoạt theo chương trình GDPT 2018.",
    "relatedEquation": "Xe + 2F₂ → XeF₄",
    "iupacName": "Xenon Entity",
    "archetype": "NOBLE_VOID",
    "structuredEffects": [
      {
        "effectId": "B04_EFF_82",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "APPLY_STATUS",
            "params": {
              "statusType": "INERT_OCTET"
            }
          }
        ],
        "description": "Kích hoạt khiên bát tử trơ."
      }
    ]
  },
  {
    "id": "card_b04_083_rn_83",
    "name": "Radon — Linh Hồn (RnF2 Biến Thể 83)",
    "name_en": "Radon — Linh Hồn Kinetic 83",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "NOBLE_VOID",
    "manaCost": 5,
    "level": 6,
    "atk": 1580,
    "def": 3000,
    "chemicalFormula": "RnF2",
    "atomicNumber": 86,
    "effectCode": "ELEM_B04_RN_OCTET_83",
    "effectText": "Lớp vỏ bát tử bền vững: Khi ở tư thế Phòng thủ, không thể bị tiêu diệt bởi hiệu ứng thẻ bài của đối phương.",
    "scientificLore": "Radon (Rn, Z=86) cấu hình electron bão hòa hoặc lai hóa $sp^3$ linh hoạt theo chương trình GDPT 2018.",
    "relatedEquation": "Rn + F₂ → RnF₂",
    "iupacName": "Radon Entity",
    "archetype": "NOBLE_VOID",
    "structuredEffects": [
      {
        "effectId": "B04_EFF_83",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "APPLY_STATUS",
            "params": {
              "statusType": "INERT_OCTET"
            }
          }
        ],
        "description": "Kích hoạt khiên bát tử trơ."
      }
    ]
  },
  {
    "id": "card_b04_084_n_84",
    "name": "Nito — Linh Hồn (N2 Biến Thể 84)",
    "name_en": "Nitrogen — Linh Hồn Kinetic 84",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "AERO",
    "manaCost": 5,
    "level": 7,
    "atk": 2610,
    "def": 2060,
    "chemicalFormula": "N2",
    "atomicNumber": 7,
    "effectCode": "ELEM_B04_N_OCTET_84",
    "effectText": "Khi triệu hồi: Đối thủ chịu hiệu ứng nhiễm độc pnictogen, mất 500 LP.",
    "scientificLore": "Nito (N, Z=7) cấu hình electron bão hòa hoặc lai hóa $sp^3$ linh hoạt theo chương trình GDPT 2018.",
    "relatedEquation": "N₂ + 3H₂ ⇌ 2NH₃",
    "iupacName": "Nitrogen Entity",
    "archetype": "PNICTOGEN_SPIRIT",
    "structuredEffects": [
      {
        "effectId": "B04_EFF_84",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Nhiễm độc 300 LP."
      }
    ]
  },
  {
    "id": "card_b04_085_p_85",
    "name": "Photpho — Linh Hồn (P4 Biến Thể 85)",
    "name_en": "Phosphorus — Linh Hồn Kinetic 85",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "PYRO",
    "manaCost": 1,
    "level": 2,
    "atk": 1460,
    "def": 1160,
    "chemicalFormula": "P4",
    "atomicNumber": 15,
    "effectCode": "ELEM_B04_P_OCTET_85",
    "effectText": "Khi triệu hồi: Đối thủ chịu hiệu ứng nhiễm độc pnictogen, mất 200 LP.",
    "scientificLore": "Photpho (P, Z=15) cấu hình electron bão hòa hoặc lai hóa $sp^3$ linh hoạt theo chương trình GDPT 2018.",
    "relatedEquation": "P₄ + 5O₂ → P₄O₁₀",
    "iupacName": "Phosphorus Entity",
    "archetype": "PNICTOGEN_SPIRIT",
    "structuredEffects": [
      {
        "effectId": "B04_EFF_85",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Nhiễm độc 300 LP."
      }
    ]
  },
  {
    "id": "card_b04_086_as_86",
    "name": "Asen — Linh Hồn (As2O3 Biến Thể 86)",
    "name_en": "Arsenic — Linh Hồn Kinetic 86",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "ACID_DARK",
    "manaCost": 2,
    "level": 3,
    "atk": 1690,
    "def": 1340,
    "chemicalFormula": "As2O3",
    "atomicNumber": 33,
    "effectCode": "ELEM_B04_AS_OCTET_86",
    "effectText": "Khi triệu hồi: Đối thủ chịu hiệu ứng nhiễm độc pnictogen, mất 300 LP.",
    "scientificLore": "Asen (As, Z=33) cấu hình electron bão hòa hoặc lai hóa $sp^3$ linh hoạt theo chương trình GDPT 2018.",
    "relatedEquation": "4As + 3O₂ → 2As₂O₃",
    "iupacName": "Arsenic Entity",
    "archetype": "PNICTOGEN_SPIRIT",
    "structuredEffects": [
      {
        "effectId": "B04_EFF_86",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Nhiễm độc 300 LP."
      }
    ]
  },
  {
    "id": "card_b04_087_sb_87",
    "name": "Antimon — Linh Hồn (Sb2S3 Biến Thể 87)",
    "name_en": "Antimony — Linh Hồn Kinetic 87",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "TERRA",
    "manaCost": 3,
    "level": 4,
    "atk": 1920,
    "def": 1520,
    "chemicalFormula": "Sb2S3",
    "atomicNumber": 51,
    "effectCode": "ELEM_B04_SB_OCTET_87",
    "effectText": "Khi triệu hồi: Đối thủ chịu hiệu ứng nhiễm độc pnictogen, mất 400 LP.",
    "scientificLore": "Antimon (Sb, Z=51) cấu hình electron bão hòa hoặc lai hóa $sp^3$ linh hoạt theo chương trình GDPT 2018.",
    "relatedEquation": "2Sb + 3S → Sb₂S₃",
    "iupacName": "Antimony Entity",
    "archetype": "PNICTOGEN_SPIRIT",
    "structuredEffects": [
      {
        "effectId": "B04_EFF_87",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Nhiễm độc 300 LP."
      }
    ]
  },
  {
    "id": "card_b04_088_bi_88",
    "name": "Bismut — Linh Hồn (Bi2O3 Biến Thể 88)",
    "name_en": "Bismuth — Linh Hồn Kinetic 88",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "ULTRA_RARE",
    "attribute": "TERRA",
    "manaCost": 4,
    "level": 5,
    "atk": 2150,
    "def": 1700,
    "chemicalFormula": "Bi2O3",
    "atomicNumber": 83,
    "effectCode": "ELEM_B04_BI_OCTET_88",
    "effectText": "Khi triệu hồi: Đối thủ chịu hiệu ứng nhiễm độc pnictogen, mất 500 LP.",
    "scientificLore": "Bismut (Bi, Z=83) cấu hình electron bão hòa hoặc lai hóa $sp^3$ linh hoạt theo chương trình GDPT 2018.",
    "relatedEquation": "4Bi + 3O₂ → 2Bi₂O₃",
    "iupacName": "Bismuth Entity",
    "archetype": "PNICTOGEN_SPIRIT",
    "structuredEffects": [
      {
        "effectId": "B04_EFF_88",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Nhiễm độc 300 LP."
      }
    ]
  },
  {
    "id": "card_b04_089_he_89",
    "name": "Heli — Bong Bóng Khí (He Biến Thể 89)",
    "name_en": "Helium — Bong Bóng Khí Kinetic 89",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SECRET_RARE",
    "attribute": "NOBLE_VOID",
    "manaCost": 5,
    "level": 6,
    "atk": 1580,
    "def": 3000,
    "chemicalFormula": "He",
    "atomicNumber": 2,
    "effectCode": "ELEM_B04_HE_OCTET_89",
    "effectText": "Lớp vỏ bát tử bền vững: Khi ở tư thế Phòng thủ, không thể bị tiêu diệt bởi hiệu ứng thẻ bài của đối phương.",
    "scientificLore": "Heli (He, Z=2) cấu hình electron bão hòa hoặc lai hóa $sp^3$ linh hoạt theo chương trình GDPT 2018.",
    "relatedEquation": "He (1s² Closed Duet Octet Equivalent)",
    "iupacName": "Helium Entity",
    "archetype": "NOBLE_VOID",
    "structuredEffects": [
      {
        "effectId": "B04_EFF_89",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "APPLY_STATUS",
            "params": {
              "statusType": "INERT_OCTET"
            }
          }
        ],
        "description": "Kích hoạt khiên bát tử trơ."
      }
    ]
  },
  {
    "id": "card_b04_090_ne_90",
    "name": "Neon — Bong Bóng Khí (Ne Biến Thể 90)",
    "name_en": "Neon — Bong Bóng Khí Kinetic 90",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "NOBLE_VOID",
    "manaCost": 5,
    "level": 7,
    "atk": 1760,
    "def": 3250,
    "chemicalFormula": "Ne",
    "atomicNumber": 10,
    "effectCode": "ELEM_B04_NE_OCTET_90",
    "effectText": "Lớp vỏ bát tử bền vững: Khi ở tư thế Phòng thủ, không thể bị tiêu diệt bởi hiệu ứng thẻ bài của đối phương.",
    "scientificLore": "Neon (Ne, Z=10) cấu hình electron bão hòa hoặc lai hóa $sp^3$ linh hoạt theo chương trình GDPT 2018.",
    "relatedEquation": "Ne (2s² 2p⁶ Closed Shell)",
    "iupacName": "Neon Entity",
    "archetype": "NOBLE_VOID",
    "structuredEffects": [
      {
        "effectId": "B04_EFF_90",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "APPLY_STATUS",
            "params": {
              "statusType": "INERT_OCTET"
            }
          }
        ],
        "description": "Kích hoạt khiên bát tử trơ."
      }
    ]
  },
  {
    "id": "card_b04_091_ar_91",
    "name": "Argon — Bong Bóng Khí (Ar Biến Thể 91)",
    "name_en": "Argon — Bong Bóng Khí Kinetic 91",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "NOBLE_VOID",
    "manaCost": 1,
    "level": 2,
    "atk": 860,
    "def": 2000,
    "chemicalFormula": "Ar",
    "atomicNumber": 18,
    "effectCode": "ELEM_B04_AR_OCTET_91",
    "effectText": "Lớp vỏ bát tử bền vững: Khi ở tư thế Phòng thủ, không thể bị tiêu diệt bởi hiệu ứng thẻ bài của đối phương.",
    "scientificLore": "Argon (Ar, Z=18) cấu hình electron bão hòa hoặc lai hóa $sp^3$ linh hoạt theo chương trình GDPT 2018.",
    "relatedEquation": "Ar (3s² 3p⁶ Closed Shell)",
    "iupacName": "Argon Entity",
    "archetype": "NOBLE_VOID",
    "structuredEffects": [
      {
        "effectId": "B04_EFF_91",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "APPLY_STATUS",
            "params": {
              "statusType": "INERT_OCTET"
            }
          }
        ],
        "description": "Kích hoạt khiên bát tử trơ."
      }
    ]
  },
  {
    "id": "card_b04_092_kr_92",
    "name": "Krypton — Bong Bóng Khí (KrF2 Biến Thể 92)",
    "name_en": "Krypton — Bong Bóng Khí Kinetic 92",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "NOBLE_VOID",
    "manaCost": 2,
    "level": 3,
    "atk": 1040,
    "def": 2250,
    "chemicalFormula": "KrF2",
    "atomicNumber": 36,
    "effectCode": "ELEM_B04_KR_OCTET_92",
    "effectText": "Lớp vỏ bát tử bền vững: Khi ở tư thế Phòng thủ, không thể bị tiêu diệt bởi hiệu ứng thẻ bài của đối phương.",
    "scientificLore": "Krypton (Kr, Z=36) cấu hình electron bão hòa hoặc lai hóa $sp^3$ linh hoạt theo chương trình GDPT 2018.",
    "relatedEquation": "Kr + F₂ → KrF₂",
    "iupacName": "Krypton Entity",
    "archetype": "NOBLE_VOID",
    "structuredEffects": [
      {
        "effectId": "B04_EFF_92",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "APPLY_STATUS",
            "params": {
              "statusType": "INERT_OCTET"
            }
          }
        ],
        "description": "Kích hoạt khiên bát tử trơ."
      }
    ]
  },
  {
    "id": "card_b04_093_xe_93",
    "name": "Xenon — Bong Bóng Khí (XeF4 Biến Thể 93)",
    "name_en": "Xenon — Bong Bóng Khí Kinetic 93",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "NOBLE_VOID",
    "manaCost": 3,
    "level": 4,
    "atk": 1220,
    "def": 2500,
    "chemicalFormula": "XeF4",
    "atomicNumber": 54,
    "effectCode": "ELEM_B04_XE_OCTET_93",
    "effectText": "Lớp vỏ bát tử bền vững: Khi ở tư thế Phòng thủ, không thể bị tiêu diệt bởi hiệu ứng thẻ bài của đối phương.",
    "scientificLore": "Xenon (Xe, Z=54) cấu hình electron bão hòa hoặc lai hóa $sp^3$ linh hoạt theo chương trình GDPT 2018.",
    "relatedEquation": "Xe + 2F₂ → XeF₄",
    "iupacName": "Xenon Entity",
    "archetype": "NOBLE_VOID",
    "structuredEffects": [
      {
        "effectId": "B04_EFF_93",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "APPLY_STATUS",
            "params": {
              "statusType": "INERT_OCTET"
            }
          }
        ],
        "description": "Kích hoạt khiên bát tử trơ."
      }
    ]
  },
  {
    "id": "card_b04_094_rn_94",
    "name": "Radon — Bong Bóng Khí (RnF2 Biến Thể 94)",
    "name_en": "Radon — Bong Bóng Khí Kinetic 94",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "NOBLE_VOID",
    "manaCost": 4,
    "level": 5,
    "atk": 1400,
    "def": 2750,
    "chemicalFormula": "RnF2",
    "atomicNumber": 86,
    "effectCode": "ELEM_B04_RN_OCTET_94",
    "effectText": "Lớp vỏ bát tử bền vững: Khi ở tư thế Phòng thủ, không thể bị tiêu diệt bởi hiệu ứng thẻ bài của đối phương.",
    "scientificLore": "Radon (Rn, Z=86) cấu hình electron bão hòa hoặc lai hóa $sp^3$ linh hoạt theo chương trình GDPT 2018.",
    "relatedEquation": "Rn + F₂ → RnF₂",
    "iupacName": "Radon Entity",
    "archetype": "NOBLE_VOID",
    "structuredEffects": [
      {
        "effectId": "B04_EFF_94",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "APPLY_STATUS",
            "params": {
              "statusType": "INERT_OCTET"
            }
          }
        ],
        "description": "Kích hoạt khiên bát tử trơ."
      }
    ]
  },
  {
    "id": "card_b04_095_n_95",
    "name": "Nito — Bong Bóng Khí (N2 Biến Thể 95)",
    "name_en": "Nitrogen — Bong Bóng Khí Kinetic 95",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "AERO",
    "manaCost": 5,
    "level": 6,
    "atk": 2380,
    "def": 1880,
    "chemicalFormula": "N2",
    "atomicNumber": 7,
    "effectCode": "ELEM_B04_N_OCTET_95",
    "effectText": "Khi triệu hồi: Đối thủ chịu hiệu ứng nhiễm độc pnictogen, mất 400 LP.",
    "scientificLore": "Nito (N, Z=7) cấu hình electron bão hòa hoặc lai hóa $sp^3$ linh hoạt theo chương trình GDPT 2018.",
    "relatedEquation": "N₂ + 3H₂ ⇌ 2NH₃",
    "iupacName": "Nitrogen Entity",
    "archetype": "PNICTOGEN_SPIRIT",
    "structuredEffects": [
      {
        "effectId": "B04_EFF_95",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Nhiễm độc 300 LP."
      }
    ]
  },
  {
    "id": "card_b04_096_p_96",
    "name": "Photpho — Bong Bóng Khí (P4 Biến Thể 96)",
    "name_en": "Phosphorus — Bong Bóng Khí Kinetic 96",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "PYRO",
    "manaCost": 5,
    "level": 7,
    "atk": 2610,
    "def": 2060,
    "chemicalFormula": "P4",
    "atomicNumber": 15,
    "effectCode": "ELEM_B04_P_OCTET_96",
    "effectText": "Khi triệu hồi: Đối thủ chịu hiệu ứng nhiễm độc pnictogen, mất 500 LP.",
    "scientificLore": "Photpho (P, Z=15) cấu hình electron bão hòa hoặc lai hóa $sp^3$ linh hoạt theo chương trình GDPT 2018.",
    "relatedEquation": "P₄ + 5O₂ → P₄O₁₀",
    "iupacName": "Phosphorus Entity",
    "archetype": "PNICTOGEN_SPIRIT",
    "structuredEffects": [
      {
        "effectId": "B04_EFF_96",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Nhiễm độc 300 LP."
      }
    ]
  },
  {
    "id": "card_b04_097_as_97",
    "name": "Asen — Bong Bóng Khí (As2O3 Biến Thể 97)",
    "name_en": "Arsenic — Bong Bóng Khí Kinetic 97",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "ULTRA_RARE",
    "attribute": "ACID_DARK",
    "manaCost": 1,
    "level": 2,
    "atk": 1460,
    "def": 1160,
    "chemicalFormula": "As2O3",
    "atomicNumber": 33,
    "effectCode": "ELEM_B04_AS_OCTET_97",
    "effectText": "Khi triệu hồi: Đối thủ chịu hiệu ứng nhiễm độc pnictogen, mất 200 LP.",
    "scientificLore": "Asen (As, Z=33) cấu hình electron bão hòa hoặc lai hóa $sp^3$ linh hoạt theo chương trình GDPT 2018.",
    "relatedEquation": "4As + 3O₂ → 2As₂O₃",
    "iupacName": "Arsenic Entity",
    "archetype": "PNICTOGEN_SPIRIT",
    "structuredEffects": [
      {
        "effectId": "B04_EFF_97",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Nhiễm độc 300 LP."
      }
    ]
  },
  {
    "id": "card_b04_098_sb_98",
    "name": "Antimon — Bong Bóng Khí (Sb2S3 Biến Thể 98)",
    "name_en": "Antimony — Bong Bóng Khí Kinetic 98",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SECRET_RARE",
    "attribute": "TERRA",
    "manaCost": 2,
    "level": 3,
    "atk": 1690,
    "def": 1340,
    "chemicalFormula": "Sb2S3",
    "atomicNumber": 51,
    "effectCode": "ELEM_B04_SB_OCTET_98",
    "effectText": "Khi triệu hồi: Đối thủ chịu hiệu ứng nhiễm độc pnictogen, mất 300 LP.",
    "scientificLore": "Antimon (Sb, Z=51) cấu hình electron bão hòa hoặc lai hóa $sp^3$ linh hoạt theo chương trình GDPT 2018.",
    "relatedEquation": "2Sb + 3S → Sb₂S₃",
    "iupacName": "Antimony Entity",
    "archetype": "PNICTOGEN_SPIRIT",
    "structuredEffects": [
      {
        "effectId": "B04_EFF_98",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Nhiễm độc 300 LP."
      }
    ]
  },
  {
    "id": "card_b04_099_bi_99",
    "name": "Bismut — Bong Bóng Khí (Bi2O3 Biến Thể 99)",
    "name_en": "Bismuth — Bong Bóng Khí Kinetic 99",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "TERRA",
    "manaCost": 3,
    "level": 4,
    "atk": 1920,
    "def": 1520,
    "chemicalFormula": "Bi2O3",
    "atomicNumber": 83,
    "effectCode": "ELEM_B04_BI_OCTET_99",
    "effectText": "Khi triệu hồi: Đối thủ chịu hiệu ứng nhiễm độc pnictogen, mất 400 LP.",
    "scientificLore": "Bismut (Bi, Z=83) cấu hình electron bão hòa hoặc lai hóa $sp^3$ linh hoạt theo chương trình GDPT 2018.",
    "relatedEquation": "4Bi + 3O₂ → 2Bi₂O₃",
    "iupacName": "Bismuth Entity",
    "archetype": "PNICTOGEN_SPIRIT",
    "structuredEffects": [
      {
        "effectId": "B04_EFF_99",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Nhiễm độc 300 LP."
      }
    ]
  },
  {
    "id": "card_b04_100_he_100",
    "name": "Heli — Lăng Kính (He Biến Thể 100)",
    "name_en": "Helium — Lăng Kính Kinetic 100",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "NOBLE_VOID",
    "manaCost": 4,
    "level": 5,
    "atk": 1400,
    "def": 2750,
    "chemicalFormula": "He",
    "atomicNumber": 2,
    "effectCode": "ELEM_B04_HE_OCTET_100",
    "effectText": "Lớp vỏ bát tử bền vững: Khi ở tư thế Phòng thủ, không thể bị tiêu diệt bởi hiệu ứng thẻ bài của đối phương.",
    "scientificLore": "Heli (He, Z=2) cấu hình electron bão hòa hoặc lai hóa $sp^3$ linh hoạt theo chương trình GDPT 2018.",
    "relatedEquation": "He (1s² Closed Duet Octet Equivalent)",
    "iupacName": "Helium Entity",
    "archetype": "NOBLE_VOID",
    "structuredEffects": [
      {
        "effectId": "B04_EFF_100",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "APPLY_STATUS",
            "params": {
              "statusType": "INERT_OCTET"
            }
          }
        ],
        "description": "Kích hoạt khiên bát tử trơ."
      }
    ]
  }
];
