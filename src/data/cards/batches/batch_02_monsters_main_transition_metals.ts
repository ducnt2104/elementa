// src/data/cards/batches/batch_02_monsters_main_transition_metals.ts
// Batch 02: Transition Metal Monsters (100 cards)
// Automatically generated and validated for ELEMENTA Tactical TCG

import { PlayableCardDef } from '../../../domain/cardGameTypes';

export const BATCH_02_CARDS: PlayableCardDef[] = [
  {
    "id": "card_b02_001_sc_1",
    "name": "Scandi — Chiến Giáp Đa Hóa Trị (Ký hiệu Sc2O3)",
    "name_en": "Scandium — Multivalent Chiến Giáp (Sc2O3)",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "TERRA",
    "manaCost": 2,
    "level": 3,
    "atk": 1800,
    "def": 1540,
    "chemicalFormula": "Sc2O3",
    "atomicNumber": 21,
    "effectCode": "ELEM_B02_SC_VALENCE_1",
    "effectText": "Một lần mỗi lượt: Có thể hoán đổi chỉ số ATK và DEF cơ bản đến hết lượt (chuyển đổi số oxi hóa).",
    "scientificLore": "Scandi (Sc, Z=21) là kim loại chuyển tiếp phân lớp d/f với nhiều mức oxi hóa bền vững trong hợp chất Sc2O3.",
    "relatedEquation": "4Sc + 3O₂ → 2Sc₂O₃",
    "iupacName": "Scandium Compound",
    "archetype": "TRANSITION_FORGE",
    "structuredEffects": [
      {
        "effectId": "B02_EFF_1",
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
        "description": "Tăng 300 ATK kích hoạt hóa trị."
      }
    ]
  },
  {
    "id": "card_b02_002_ti_2",
    "name": "Titan — Chiến Giáp Đa Hóa Trị (Ký hiệu TiO2)",
    "name_en": "Titanium — Multivalent Chiến Giáp (TiO2)",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "TERRA",
    "manaCost": 3,
    "level": 4,
    "atk": 2080,
    "def": 1780,
    "chemicalFormula": "TiO2",
    "atomicNumber": 22,
    "effectCode": "ELEM_B02_TI_VALENCE_2",
    "effectText": "Một lần mỗi lượt: Có thể hoán đổi chỉ số ATK và DEF cơ bản đến hết lượt (chuyển đổi số oxi hóa).",
    "scientificLore": "Titan (Ti, Z=22) là kim loại chuyển tiếp phân lớp d/f với nhiều mức oxi hóa bền vững trong hợp chất TiO2.",
    "relatedEquation": "Ti + O₂ → TiO₂",
    "iupacName": "Titanium Compound",
    "archetype": "TRANSITION_FORGE",
    "structuredEffects": [
      {
        "effectId": "B02_EFF_2",
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
        "description": "Tăng 300 ATK kích hoạt hóa trị."
      }
    ]
  },
  {
    "id": "card_b02_003_v_3",
    "name": "Vanadi — Chiến Giáp Đa Hóa Trị (Ký hiệu V2O5)",
    "name_en": "Vanadium — Multivalent Chiến Giáp (V2O5)",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "PYRO",
    "manaCost": 4,
    "level": 5,
    "atk": 2360,
    "def": 2020,
    "chemicalFormula": "V2O5",
    "atomicNumber": 23,
    "effectCode": "ELEM_B02_V_VALENCE_3",
    "effectText": "Một lần mỗi lượt: Có thể hoán đổi chỉ số ATK và DEF cơ bản đến hết lượt (chuyển đổi số oxi hóa).",
    "scientificLore": "Vanadi (V, Z=23) là kim loại chuyển tiếp phân lớp d/f với nhiều mức oxi hóa bền vững trong hợp chất V2O5.",
    "relatedEquation": "4V + 5O₂ → 2V₂O₅",
    "iupacName": "Vanadium Compound",
    "archetype": "TRANSITION_FORGE",
    "structuredEffects": [
      {
        "effectId": "B02_EFF_3",
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
        "description": "Tăng 300 ATK kích hoạt hóa trị."
      }
    ]
  },
  {
    "id": "card_b02_004_cr_4",
    "name": "Crom — Chiến Giáp Đa Hóa Trị (Ký hiệu Cr2O3)",
    "name_en": "Chromium — Multivalent Chiến Giáp (Cr2O3)",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "PYRO",
    "manaCost": 5,
    "level": 6,
    "atk": 2640,
    "def": 2260,
    "chemicalFormula": "Cr2O3",
    "atomicNumber": 24,
    "effectCode": "ELEM_B02_CR_VALENCE_4",
    "effectText": "Một lần mỗi lượt: Có thể hoán đổi chỉ số ATK và DEF cơ bản đến hết lượt (chuyển đổi số oxi hóa).",
    "scientificLore": "Crom (Cr, Z=24) là kim loại chuyển tiếp phân lớp d/f với nhiều mức oxi hóa bền vững trong hợp chất Cr2O3.",
    "relatedEquation": "4Cr + 3O₂ → 2Cr₂O₃",
    "iupacName": "Chromium Compound",
    "archetype": "TRANSITION_FORGE",
    "structuredEffects": [
      {
        "effectId": "B02_EFF_4",
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
        "description": "Tăng 300 ATK kích hoạt hóa trị."
      }
    ]
  },
  {
    "id": "card_b02_005_mn_5",
    "name": "Mangan — Chiến Giáp Đa Hóa Trị (Ký hiệu MnO2)",
    "name_en": "Manganese — Multivalent Chiến Giáp (MnO2)",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "ACID_DARK",
    "manaCost": 6,
    "level": 7,
    "atk": 2600,
    "def": 2500,
    "chemicalFormula": "MnO2",
    "atomicNumber": 25,
    "effectCode": "ELEM_B02_MN_VALENCE_5",
    "effectText": "Một lần mỗi lượt: Có thể hoán đổi chỉ số ATK và DEF cơ bản đến hết lượt (chuyển đổi số oxi hóa).",
    "scientificLore": "Mangan (Mn, Z=25) là kim loại chuyển tiếp phân lớp d/f với nhiều mức oxi hóa bền vững trong hợp chất MnO2.",
    "relatedEquation": "Mn + O₂ → MnO₂",
    "iupacName": "Manganese Compound",
    "archetype": "TRANSITION_FORGE",
    "structuredEffects": [
      {
        "effectId": "B02_EFF_5",
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
        "description": "Tăng 300 ATK kích hoạt hóa trị."
      }
    ]
  },
  {
    "id": "card_b02_006_fe_6",
    "name": "Sắt — Chiến Giáp Đa Hóa Trị (Ký hiệu Fe3O4)",
    "name_en": "Iron — Multivalent Chiến Giáp (Fe3O4)",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "ULTRA_RARE",
    "attribute": "TERRA",
    "manaCost": 7,
    "level": 8,
    "atk": 2880,
    "def": 2440,
    "chemicalFormula": "Fe3O4",
    "atomicNumber": 26,
    "effectCode": "ELEM_B02_FE_VALENCE_6",
    "effectText": "Một lần mỗi lượt: Có thể hoán đổi chỉ số ATK và DEF cơ bản đến hết lượt (chuyển đổi số oxi hóa).",
    "scientificLore": "Sắt (Fe, Z=26) là kim loại chuyển tiếp phân lớp d/f với nhiều mức oxi hóa bền vững trong hợp chất Fe3O4.",
    "relatedEquation": "3Fe + 2O₂ → Fe₃O₄",
    "iupacName": "Iron Compound",
    "archetype": "TRANSITION_FORGE",
    "structuredEffects": [
      {
        "effectId": "B02_EFF_6",
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
        "description": "Tăng 300 ATK kích hoạt hóa trị."
      }
    ]
  },
  {
    "id": "card_b02_007_co_7",
    "name": "Coban — Chiến Giáp Đa Hóa Trị (Ký hiệu CoCl2)",
    "name_en": "Cobalt — Multivalent Chiến Giáp (CoCl2)",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SECRET_RARE",
    "attribute": "ELECTRO",
    "manaCost": 2,
    "level": 3,
    "atk": 1960,
    "def": 1600,
    "chemicalFormula": "CoCl2",
    "atomicNumber": 27,
    "effectCode": "ELEM_B02_CO_VALENCE_7",
    "effectText": "Một lần mỗi lượt: Có thể hoán đổi chỉ số ATK và DEF cơ bản đến hết lượt (chuyển đổi số oxi hóa).",
    "scientificLore": "Coban (Co, Z=27) là kim loại chuyển tiếp phân lớp d/f với nhiều mức oxi hóa bền vững trong hợp chất CoCl2.",
    "relatedEquation": "Co + Cl₂ → CoCl₂",
    "iupacName": "Cobalt Compound",
    "archetype": "TRANSITION_FORGE",
    "structuredEffects": [
      {
        "effectId": "B02_EFF_7",
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
        "description": "Tăng 300 ATK kích hoạt hóa trị."
      }
    ]
  },
  {
    "id": "card_b02_008_ni_8",
    "name": "Niken — Chiến Giáp Đa Hóa Trị (Ký hiệu NiO)",
    "name_en": "Nickel — Multivalent Chiến Giáp (NiO)",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "ELECTRO",
    "manaCost": 3,
    "level": 4,
    "atk": 2240,
    "def": 1840,
    "chemicalFormula": "NiO",
    "atomicNumber": 28,
    "effectCode": "ELEM_B02_NI_VALENCE_8",
    "effectText": "Một lần mỗi lượt: Có thể hoán đổi chỉ số ATK và DEF cơ bản đến hết lượt (chuyển đổi số oxi hóa).",
    "scientificLore": "Niken (Ni, Z=28) là kim loại chuyển tiếp phân lớp d/f với nhiều mức oxi hóa bền vững trong hợp chất NiO.",
    "relatedEquation": "2Ni + O₂ → 2NiO",
    "iupacName": "Nickel Compound",
    "archetype": "TRANSITION_FORGE",
    "structuredEffects": [
      {
        "effectId": "B02_EFF_8",
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
        "description": "Tăng 300 ATK kích hoạt hóa trị."
      }
    ]
  },
  {
    "id": "card_b02_009_cu_9",
    "name": "Đồng — Chiến Giáp Đa Hóa Trị (Ký hiệu CuSO4)",
    "name_en": "Copper — Multivalent Chiến Giáp (CuSO4)",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "ELECTRO",
    "manaCost": 4,
    "level": 5,
    "atk": 2200,
    "def": 2080,
    "chemicalFormula": "CuSO4",
    "atomicNumber": 29,
    "effectCode": "ELEM_B02_CU_VALENCE_9",
    "effectText": "Một lần mỗi lượt: Có thể hoán đổi chỉ số ATK và DEF cơ bản đến hết lượt (chuyển đổi số oxi hóa).",
    "scientificLore": "Đồng (Cu, Z=29) là kim loại chuyển tiếp phân lớp d/f với nhiều mức oxi hóa bền vững trong hợp chất CuSO4.",
    "relatedEquation": "Cu + 2H₂SO₄ → CuSO₄ + SO₂ + 2H₂O",
    "iupacName": "Copper Compound",
    "archetype": "TRANSITION_FORGE",
    "structuredEffects": [
      {
        "effectId": "B02_EFF_9",
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
        "description": "Tăng 300 ATK kích hoạt hóa trị."
      }
    ]
  },
  {
    "id": "card_b02_010_zn_10",
    "name": "Kẽm — Chiến Giáp Đa Hóa Trị (Ký hiệu ZnO)",
    "name_en": "Zinc — Multivalent Chiến Giáp (ZnO)",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "TERRA",
    "manaCost": 5,
    "level": 6,
    "atk": 2480,
    "def": 2320,
    "chemicalFormula": "ZnO",
    "atomicNumber": 30,
    "effectCode": "ELEM_B02_ZN_VALENCE_10",
    "effectText": "Một lần mỗi lượt: Có thể hoán đổi chỉ số ATK và DEF cơ bản đến hết lượt (chuyển đổi số oxi hóa).",
    "scientificLore": "Kẽm (Zn, Z=30) là kim loại chuyển tiếp phân lớp d/f với nhiều mức oxi hóa bền vững trong hợp chất ZnO.",
    "relatedEquation": "2Zn + O₂ → 2ZnO",
    "iupacName": "Zinc Compound",
    "archetype": "TRANSITION_FORGE",
    "structuredEffects": [
      {
        "effectId": "B02_EFF_10",
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
        "description": "Tăng 300 ATK kích hoạt hóa trị."
      }
    ]
  },
  {
    "id": "card_b02_011_mo_11",
    "name": "Molipden — Chiến Giáp Đa Hóa Trị (Ký hiệu MoO3)",
    "name_en": "Molybdenum — Multivalent Chiến Giáp (MoO3)",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "TERRA",
    "manaCost": 6,
    "level": 7,
    "atk": 2760,
    "def": 2260,
    "chemicalFormula": "MoO3",
    "atomicNumber": 42,
    "effectCode": "ELEM_B02_MO_VALENCE_11",
    "effectText": "Một lần mỗi lượt: Có thể hoán đổi chỉ số ATK và DEF cơ bản đến hết lượt (chuyển đổi số oxi hóa).",
    "scientificLore": "Molipden (Mo, Z=42) là kim loại chuyển tiếp phân lớp d/f với nhiều mức oxi hóa bền vững trong hợp chất MoO3.",
    "relatedEquation": "2Mo + 3O₂ → 2MoO₃",
    "iupacName": "Molybdenum Compound",
    "archetype": "TRANSITION_FORGE",
    "structuredEffects": [
      {
        "effectId": "B02_EFF_11",
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
        "description": "Tăng 300 ATK kích hoạt hóa trị."
      }
    ]
  },
  {
    "id": "card_b02_012_w_12",
    "name": "Wolfram — Chiến Giáp Đa Hóa Trị (Ký hiệu WO3)",
    "name_en": "Tungsten — Multivalent Chiến Giáp (WO3)",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "PYRO",
    "manaCost": 7,
    "level": 8,
    "atk": 3040,
    "def": 2500,
    "chemicalFormula": "WO3",
    "atomicNumber": 74,
    "effectCode": "ELEM_B02_W_VALENCE_12",
    "effectText": "Một lần mỗi lượt: Có thể hoán đổi chỉ số ATK và DEF cơ bản đến hết lượt (chuyển đổi số oxi hóa).",
    "scientificLore": "Wolfram (W, Z=74) là kim loại chuyển tiếp phân lớp d/f với nhiều mức oxi hóa bền vững trong hợp chất WO3.",
    "relatedEquation": "2W + 3O₂ → 2WO₃",
    "iupacName": "Tungsten Compound",
    "archetype": "TRANSITION_FORGE",
    "structuredEffects": [
      {
        "effectId": "B02_EFF_12",
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
        "description": "Tăng 300 ATK kích hoạt hóa trị."
      }
    ]
  },
  {
    "id": "card_b02_013_ru_13",
    "name": "Ruteni — Chiến Giáp Đa Hóa Trị (Ký hiệu RuO4)",
    "name_en": "Ruthenium — Multivalent Chiến Giáp (RuO4)",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "AQUA",
    "manaCost": 2,
    "level": 3,
    "atk": 1800,
    "def": 1660,
    "chemicalFormula": "RuO4",
    "atomicNumber": 44,
    "effectCode": "ELEM_B02_RU_VALENCE_13",
    "effectText": "Một lần mỗi lượt: Giảm 1 Mana kích hoạt cho thẻ Phép tiếp theo. Khi chiến đấu, không bị tiêu diệt bởi quái thú có ATK thấp hơn.",
    "scientificLore": "Ruteni (Ru, Z=44) là kim loại chuyển tiếp phân lớp d/f với nhiều mức oxi hóa bền vững trong hợp chất RuO4.",
    "relatedEquation": "Ru + 2O₂ → RuO₄",
    "iupacName": "Ruthenium Compound",
    "archetype": "PRECIOUS_CATALYST",
    "structuredEffects": [
      {
        "effectId": "B02_EFF_13",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "RECOVER_RESOURCE",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Phục hồi 1 Mana xúc tác."
      }
    ]
  },
  {
    "id": "card_b02_014_rh_14",
    "name": "Rodi — Chiến Giáp Đa Hóa Trị (Ký hiệu Rh2O3)",
    "name_en": "Rhodium — Multivalent Chiến Giáp (Rh2O3)",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "AQUA",
    "manaCost": 3,
    "level": 4,
    "atk": 2080,
    "def": 1900,
    "chemicalFormula": "Rh2O3",
    "atomicNumber": 45,
    "effectCode": "ELEM_B02_RH_VALENCE_14",
    "effectText": "Một lần mỗi lượt: Giảm 1 Mana kích hoạt cho thẻ Phép tiếp theo. Khi chiến đấu, không bị tiêu diệt bởi quái thú có ATK thấp hơn.",
    "scientificLore": "Rodi (Rh, Z=45) là kim loại chuyển tiếp phân lớp d/f với nhiều mức oxi hóa bền vững trong hợp chất Rh2O3.",
    "relatedEquation": "4Rh + 3O₂ → 2Rh₂O₃",
    "iupacName": "Rhodium Compound",
    "archetype": "PRECIOUS_CATALYST",
    "structuredEffects": [
      {
        "effectId": "B02_EFF_14",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "RECOVER_RESOURCE",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Phục hồi 1 Mana xúc tác."
      }
    ]
  },
  {
    "id": "card_b02_015_pd_15",
    "name": "Paladi — Chiến Giáp Đa Hóa Trị (Ký hiệu PdCl2)",
    "name_en": "Palladium — Multivalent Chiến Giáp (PdCl2)",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "ULTRA_RARE",
    "attribute": "ELECTRO",
    "manaCost": 4,
    "level": 5,
    "atk": 2360,
    "def": 2140,
    "chemicalFormula": "PdCl2",
    "atomicNumber": 46,
    "effectCode": "ELEM_B02_PD_VALENCE_15",
    "effectText": "Một lần mỗi lượt: Giảm 1 Mana kích hoạt cho thẻ Phép tiếp theo. Khi chiến đấu, không bị tiêu diệt bởi quái thú có ATK thấp hơn.",
    "scientificLore": "Paladi (Pd, Z=46) là kim loại chuyển tiếp phân lớp d/f với nhiều mức oxi hóa bền vững trong hợp chất PdCl2.",
    "relatedEquation": "Pd + Cl₂ → PdCl₂",
    "iupacName": "Palladium Compound",
    "archetype": "PRECIOUS_CATALYST",
    "structuredEffects": [
      {
        "effectId": "B02_EFF_15",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "RECOVER_RESOURCE",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Phục hồi 1 Mana xúc tác."
      }
    ]
  },
  {
    "id": "card_b02_016_ag_16",
    "name": "Bạc — Chiến Giáp Đa Hóa Trị (Ký hiệu AgNO3)",
    "name_en": "Silver — Multivalent Chiến Giáp (AgNO3)",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SECRET_RARE",
    "attribute": "AQUA",
    "manaCost": 5,
    "level": 6,
    "atk": 2640,
    "def": 2080,
    "chemicalFormula": "AgNO3",
    "atomicNumber": 47,
    "effectCode": "ELEM_B02_AG_VALENCE_16",
    "effectText": "Một lần mỗi lượt: Giảm 1 Mana kích hoạt cho thẻ Phép tiếp theo. Khi chiến đấu, không bị tiêu diệt bởi quái thú có ATK thấp hơn.",
    "scientificLore": "Bạc (Ag, Z=47) là kim loại chuyển tiếp phân lớp d/f với nhiều mức oxi hóa bền vững trong hợp chất AgNO3.",
    "relatedEquation": "3Ag + 4HNO₃ → 3AgNO₃ + NO + 2H₂O",
    "iupacName": "Silver Compound",
    "archetype": "PRECIOUS_CATALYST",
    "structuredEffects": [
      {
        "effectId": "B02_EFF_16",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "RECOVER_RESOURCE",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Phục hồi 1 Mana xúc tác."
      }
    ]
  },
  {
    "id": "card_b02_017_pt_17",
    "name": "Bạch Kim — Chiến Giáp Đa Hóa Trị (Ký hiệu PtCl4)",
    "name_en": "Platinum — Multivalent Chiến Giáp (PtCl4)",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "NOBLE_VOID",
    "manaCost": 6,
    "level": 7,
    "atk": 2600,
    "def": 2320,
    "chemicalFormula": "PtCl4",
    "atomicNumber": 78,
    "effectCode": "ELEM_B02_PT_VALENCE_17",
    "effectText": "Một lần mỗi lượt: Giảm 1 Mana kích hoạt cho thẻ Phép tiếp theo. Khi chiến đấu, không bị tiêu diệt bởi quái thú có ATK thấp hơn.",
    "scientificLore": "Bạch Kim (Pt, Z=78) là kim loại chuyển tiếp phân lớp d/f với nhiều mức oxi hóa bền vững trong hợp chất PtCl4.",
    "relatedEquation": "Pt + 2Cl₂ → PtCl₄",
    "iupacName": "Platinum Compound",
    "archetype": "PRECIOUS_CATALYST",
    "structuredEffects": [
      {
        "effectId": "B02_EFF_17",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "RECOVER_RESOURCE",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Phục hồi 1 Mana xúc tác."
      }
    ]
  },
  {
    "id": "card_b02_018_au_18",
    "name": "Vàng — Chiến Giáp Đa Hóa Trị (Ký hiệu AuCl3)",
    "name_en": "Gold — Multivalent Chiến Giáp (AuCl3)",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "NOBLE_VOID",
    "manaCost": 7,
    "level": 8,
    "atk": 2880,
    "def": 2560,
    "chemicalFormula": "AuCl3",
    "atomicNumber": 79,
    "effectCode": "ELEM_B02_AU_VALENCE_18",
    "effectText": "Một lần mỗi lượt: Giảm 1 Mana kích hoạt cho thẻ Phép tiếp theo. Khi chiến đấu, không bị tiêu diệt bởi quái thú có ATK thấp hơn.",
    "scientificLore": "Vàng (Au, Z=79) là kim loại chuyển tiếp phân lớp d/f với nhiều mức oxi hóa bền vững trong hợp chất AuCl3.",
    "relatedEquation": "2Au + 3Cl₂ → 2AuCl₃",
    "iupacName": "Gold Compound",
    "archetype": "PRECIOUS_CATALYST",
    "structuredEffects": [
      {
        "effectId": "B02_EFF_18",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "RECOVER_RESOURCE",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Phục hồi 1 Mana xúc tác."
      }
    ]
  },
  {
    "id": "card_b02_019_sc_19",
    "name": "Scandi — Thợ Rèn Đa Hóa Trị (Ký hiệu Sc2O3)",
    "name_en": "Scandium — Multivalent Thợ Rèn (Sc2O3)",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "TERRA",
    "manaCost": 2,
    "level": 3,
    "atk": 1960,
    "def": 1720,
    "chemicalFormula": "Sc2O3",
    "atomicNumber": 21,
    "effectCode": "ELEM_B02_SC_VALENCE_19",
    "effectText": "Một lần mỗi lượt: Có thể hoán đổi chỉ số ATK và DEF cơ bản đến hết lượt (chuyển đổi số oxi hóa).",
    "scientificLore": "Scandi (Sc, Z=21) là kim loại chuyển tiếp phân lớp d/f với nhiều mức oxi hóa bền vững trong hợp chất Sc2O3.",
    "relatedEquation": "4Sc + 3O₂ → 2Sc₂O₃",
    "iupacName": "Scandium Compound",
    "archetype": "TRANSITION_FORGE",
    "structuredEffects": [
      {
        "effectId": "B02_EFF_19",
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
        "description": "Tăng 300 ATK kích hoạt hóa trị."
      }
    ]
  },
  {
    "id": "card_b02_020_ti_20",
    "name": "Titan — Thợ Rèn Đa Hóa Trị (Ký hiệu TiO2)",
    "name_en": "Titanium — Multivalent Thợ Rèn (TiO2)",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "TERRA",
    "manaCost": 3,
    "level": 4,
    "atk": 2240,
    "def": 1960,
    "chemicalFormula": "TiO2",
    "atomicNumber": 22,
    "effectCode": "ELEM_B02_TI_VALENCE_20",
    "effectText": "Một lần mỗi lượt: Có thể hoán đổi chỉ số ATK và DEF cơ bản đến hết lượt (chuyển đổi số oxi hóa).",
    "scientificLore": "Titan (Ti, Z=22) là kim loại chuyển tiếp phân lớp d/f với nhiều mức oxi hóa bền vững trong hợp chất TiO2.",
    "relatedEquation": "Ti + O₂ → TiO₂",
    "iupacName": "Titanium Compound",
    "archetype": "TRANSITION_FORGE",
    "structuredEffects": [
      {
        "effectId": "B02_EFF_20",
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
        "description": "Tăng 300 ATK kích hoạt hóa trị."
      }
    ]
  },
  {
    "id": "card_b02_021_v_21",
    "name": "Vanadi — Thợ Rèn Đa Hóa Trị (Ký hiệu V2O5)",
    "name_en": "Vanadium — Multivalent Thợ Rèn (V2O5)",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "PYRO",
    "manaCost": 4,
    "level": 5,
    "atk": 2200,
    "def": 1900,
    "chemicalFormula": "V2O5",
    "atomicNumber": 23,
    "effectCode": "ELEM_B02_V_VALENCE_21",
    "effectText": "Một lần mỗi lượt: Có thể hoán đổi chỉ số ATK và DEF cơ bản đến hết lượt (chuyển đổi số oxi hóa).",
    "scientificLore": "Vanadi (V, Z=23) là kim loại chuyển tiếp phân lớp d/f với nhiều mức oxi hóa bền vững trong hợp chất V2O5.",
    "relatedEquation": "4V + 5O₂ → 2V₂O₅",
    "iupacName": "Vanadium Compound",
    "archetype": "TRANSITION_FORGE",
    "structuredEffects": [
      {
        "effectId": "B02_EFF_21",
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
        "description": "Tăng 300 ATK kích hoạt hóa trị."
      }
    ]
  },
  {
    "id": "card_b02_022_cr_22",
    "name": "Crom — Thợ Rèn Đa Hóa Trị (Ký hiệu Cr2O3)",
    "name_en": "Chromium — Multivalent Thợ Rèn (Cr2O3)",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "PYRO",
    "manaCost": 5,
    "level": 6,
    "atk": 2480,
    "def": 2140,
    "chemicalFormula": "Cr2O3",
    "atomicNumber": 24,
    "effectCode": "ELEM_B02_CR_VALENCE_22",
    "effectText": "Một lần mỗi lượt: Có thể hoán đổi chỉ số ATK và DEF cơ bản đến hết lượt (chuyển đổi số oxi hóa).",
    "scientificLore": "Crom (Cr, Z=24) là kim loại chuyển tiếp phân lớp d/f với nhiều mức oxi hóa bền vững trong hợp chất Cr2O3.",
    "relatedEquation": "4Cr + 3O₂ → 2Cr₂O₃",
    "iupacName": "Chromium Compound",
    "archetype": "TRANSITION_FORGE",
    "structuredEffects": [
      {
        "effectId": "B02_EFF_22",
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
        "description": "Tăng 300 ATK kích hoạt hóa trị."
      }
    ]
  },
  {
    "id": "card_b02_023_mn_23",
    "name": "Mangan — Thợ Rèn Đa Hóa Trị (Ký hiệu MnO2)",
    "name_en": "Manganese — Multivalent Thợ Rèn (MnO2)",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "ACID_DARK",
    "manaCost": 6,
    "level": 7,
    "atk": 2760,
    "def": 2380,
    "chemicalFormula": "MnO2",
    "atomicNumber": 25,
    "effectCode": "ELEM_B02_MN_VALENCE_23",
    "effectText": "Một lần mỗi lượt: Có thể hoán đổi chỉ số ATK và DEF cơ bản đến hết lượt (chuyển đổi số oxi hóa).",
    "scientificLore": "Mangan (Mn, Z=25) là kim loại chuyển tiếp phân lớp d/f với nhiều mức oxi hóa bền vững trong hợp chất MnO2.",
    "relatedEquation": "Mn + O₂ → MnO₂",
    "iupacName": "Manganese Compound",
    "archetype": "TRANSITION_FORGE",
    "structuredEffects": [
      {
        "effectId": "B02_EFF_23",
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
        "description": "Tăng 300 ATK kích hoạt hóa trị."
      }
    ]
  },
  {
    "id": "card_b02_024_fe_24",
    "name": "Sắt — Thợ Rèn Đa Hóa Trị (Ký hiệu Fe3O4)",
    "name_en": "Iron — Multivalent Thợ Rèn (Fe3O4)",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "ULTRA_RARE",
    "attribute": "TERRA",
    "manaCost": 7,
    "level": 8,
    "atk": 3040,
    "def": 2620,
    "chemicalFormula": "Fe3O4",
    "atomicNumber": 26,
    "effectCode": "ELEM_B02_FE_VALENCE_24",
    "effectText": "Một lần mỗi lượt: Có thể hoán đổi chỉ số ATK và DEF cơ bản đến hết lượt (chuyển đổi số oxi hóa).",
    "scientificLore": "Sắt (Fe, Z=26) là kim loại chuyển tiếp phân lớp d/f với nhiều mức oxi hóa bền vững trong hợp chất Fe3O4.",
    "relatedEquation": "3Fe + 2O₂ → Fe₃O₄",
    "iupacName": "Iron Compound",
    "archetype": "TRANSITION_FORGE",
    "structuredEffects": [
      {
        "effectId": "B02_EFF_24",
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
        "description": "Tăng 300 ATK kích hoạt hóa trị."
      }
    ]
  },
  {
    "id": "card_b02_025_co_25",
    "name": "Coban — Thợ Rèn Đa Hóa Trị (Ký hiệu CoCl2)",
    "name_en": "Cobalt — Multivalent Thợ Rèn (CoCl2)",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SECRET_RARE",
    "attribute": "ELECTRO",
    "manaCost": 2,
    "level": 3,
    "atk": 1800,
    "def": 1780,
    "chemicalFormula": "CoCl2",
    "atomicNumber": 27,
    "effectCode": "ELEM_B02_CO_VALENCE_25",
    "effectText": "Một lần mỗi lượt: Có thể hoán đổi chỉ số ATK và DEF cơ bản đến hết lượt (chuyển đổi số oxi hóa).",
    "scientificLore": "Coban (Co, Z=27) là kim loại chuyển tiếp phân lớp d/f với nhiều mức oxi hóa bền vững trong hợp chất CoCl2.",
    "relatedEquation": "Co + Cl₂ → CoCl₂",
    "iupacName": "Cobalt Compound",
    "archetype": "TRANSITION_FORGE",
    "structuredEffects": [
      {
        "effectId": "B02_EFF_25",
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
        "description": "Tăng 300 ATK kích hoạt hóa trị."
      }
    ]
  },
  {
    "id": "card_b02_026_ni_26",
    "name": "Niken — Thợ Rèn Đa Hóa Trị (Ký hiệu NiO)",
    "name_en": "Nickel — Multivalent Thợ Rèn (NiO)",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "ELECTRO",
    "manaCost": 3,
    "level": 4,
    "atk": 2080,
    "def": 1720,
    "chemicalFormula": "NiO",
    "atomicNumber": 28,
    "effectCode": "ELEM_B02_NI_VALENCE_26",
    "effectText": "Một lần mỗi lượt: Có thể hoán đổi chỉ số ATK và DEF cơ bản đến hết lượt (chuyển đổi số oxi hóa).",
    "scientificLore": "Niken (Ni, Z=28) là kim loại chuyển tiếp phân lớp d/f với nhiều mức oxi hóa bền vững trong hợp chất NiO.",
    "relatedEquation": "2Ni + O₂ → 2NiO",
    "iupacName": "Nickel Compound",
    "archetype": "TRANSITION_FORGE",
    "structuredEffects": [
      {
        "effectId": "B02_EFF_26",
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
        "description": "Tăng 300 ATK kích hoạt hóa trị."
      }
    ]
  },
  {
    "id": "card_b02_027_cu_27",
    "name": "Đồng — Thợ Rèn Đa Hóa Trị (Ký hiệu CuSO4)",
    "name_en": "Copper — Multivalent Thợ Rèn (CuSO4)",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "ELECTRO",
    "manaCost": 4,
    "level": 5,
    "atk": 2360,
    "def": 1960,
    "chemicalFormula": "CuSO4",
    "atomicNumber": 29,
    "effectCode": "ELEM_B02_CU_VALENCE_27",
    "effectText": "Một lần mỗi lượt: Có thể hoán đổi chỉ số ATK và DEF cơ bản đến hết lượt (chuyển đổi số oxi hóa).",
    "scientificLore": "Đồng (Cu, Z=29) là kim loại chuyển tiếp phân lớp d/f với nhiều mức oxi hóa bền vững trong hợp chất CuSO4.",
    "relatedEquation": "Cu + 2H₂SO₄ → CuSO₄ + SO₂ + 2H₂O",
    "iupacName": "Copper Compound",
    "archetype": "TRANSITION_FORGE",
    "structuredEffects": [
      {
        "effectId": "B02_EFF_27",
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
        "description": "Tăng 300 ATK kích hoạt hóa trị."
      }
    ]
  },
  {
    "id": "card_b02_028_zn_28",
    "name": "Kẽm — Thợ Rèn Đa Hóa Trị (Ký hiệu ZnO)",
    "name_en": "Zinc — Multivalent Thợ Rèn (ZnO)",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "TERRA",
    "manaCost": 5,
    "level": 6,
    "atk": 2640,
    "def": 2200,
    "chemicalFormula": "ZnO",
    "atomicNumber": 30,
    "effectCode": "ELEM_B02_ZN_VALENCE_28",
    "effectText": "Một lần mỗi lượt: Có thể hoán đổi chỉ số ATK và DEF cơ bản đến hết lượt (chuyển đổi số oxi hóa).",
    "scientificLore": "Kẽm (Zn, Z=30) là kim loại chuyển tiếp phân lớp d/f với nhiều mức oxi hóa bền vững trong hợp chất ZnO.",
    "relatedEquation": "2Zn + O₂ → 2ZnO",
    "iupacName": "Zinc Compound",
    "archetype": "TRANSITION_FORGE",
    "structuredEffects": [
      {
        "effectId": "B02_EFF_28",
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
        "description": "Tăng 300 ATK kích hoạt hóa trị."
      }
    ]
  },
  {
    "id": "card_b02_029_mo_29",
    "name": "Molipden — Thợ Rèn Đa Hóa Trị (Ký hiệu MoO3)",
    "name_en": "Molybdenum — Multivalent Thợ Rèn (MoO3)",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "TERRA",
    "manaCost": 6,
    "level": 7,
    "atk": 2600,
    "def": 2440,
    "chemicalFormula": "MoO3",
    "atomicNumber": 42,
    "effectCode": "ELEM_B02_MO_VALENCE_29",
    "effectText": "Một lần mỗi lượt: Có thể hoán đổi chỉ số ATK và DEF cơ bản đến hết lượt (chuyển đổi số oxi hóa).",
    "scientificLore": "Molipden (Mo, Z=42) là kim loại chuyển tiếp phân lớp d/f với nhiều mức oxi hóa bền vững trong hợp chất MoO3.",
    "relatedEquation": "2Mo + 3O₂ → 2MoO₃",
    "iupacName": "Molybdenum Compound",
    "archetype": "TRANSITION_FORGE",
    "structuredEffects": [
      {
        "effectId": "B02_EFF_29",
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
        "description": "Tăng 300 ATK kích hoạt hóa trị."
      }
    ]
  },
  {
    "id": "card_b02_030_w_30",
    "name": "Wolfram — Thợ Rèn Đa Hóa Trị (Ký hiệu WO3)",
    "name_en": "Tungsten — Multivalent Thợ Rèn (WO3)",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "PYRO",
    "manaCost": 7,
    "level": 8,
    "atk": 2880,
    "def": 2680,
    "chemicalFormula": "WO3",
    "atomicNumber": 74,
    "effectCode": "ELEM_B02_W_VALENCE_30",
    "effectText": "Một lần mỗi lượt: Có thể hoán đổi chỉ số ATK và DEF cơ bản đến hết lượt (chuyển đổi số oxi hóa).",
    "scientificLore": "Wolfram (W, Z=74) là kim loại chuyển tiếp phân lớp d/f với nhiều mức oxi hóa bền vững trong hợp chất WO3.",
    "relatedEquation": "2W + 3O₂ → 2WO₃",
    "iupacName": "Tungsten Compound",
    "archetype": "TRANSITION_FORGE",
    "structuredEffects": [
      {
        "effectId": "B02_EFF_30",
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
        "description": "Tăng 300 ATK kích hoạt hóa trị."
      }
    ]
  },
  {
    "id": "card_b02_031_ru_31",
    "name": "Ruteni — Thợ Rèn Đa Hóa Trị (Ký hiệu RuO4)",
    "name_en": "Ruthenium — Multivalent Thợ Rèn (RuO4)",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "AQUA",
    "manaCost": 2,
    "level": 3,
    "atk": 1960,
    "def": 1540,
    "chemicalFormula": "RuO4",
    "atomicNumber": 44,
    "effectCode": "ELEM_B02_RU_VALENCE_31",
    "effectText": "Một lần mỗi lượt: Giảm 1 Mana kích hoạt cho thẻ Phép tiếp theo. Khi chiến đấu, không bị tiêu diệt bởi quái thú có ATK thấp hơn.",
    "scientificLore": "Ruteni (Ru, Z=44) là kim loại chuyển tiếp phân lớp d/f với nhiều mức oxi hóa bền vững trong hợp chất RuO4.",
    "relatedEquation": "Ru + 2O₂ → RuO₄",
    "iupacName": "Ruthenium Compound",
    "archetype": "PRECIOUS_CATALYST",
    "structuredEffects": [
      {
        "effectId": "B02_EFF_31",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "RECOVER_RESOURCE",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Phục hồi 1 Mana xúc tác."
      }
    ]
  },
  {
    "id": "card_b02_032_rh_32",
    "name": "Rodi — Thợ Rèn Đa Hóa Trị (Ký hiệu Rh2O3)",
    "name_en": "Rhodium — Multivalent Thợ Rèn (Rh2O3)",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "AQUA",
    "manaCost": 3,
    "level": 4,
    "atk": 2240,
    "def": 1780,
    "chemicalFormula": "Rh2O3",
    "atomicNumber": 45,
    "effectCode": "ELEM_B02_RH_VALENCE_32",
    "effectText": "Một lần mỗi lượt: Giảm 1 Mana kích hoạt cho thẻ Phép tiếp theo. Khi chiến đấu, không bị tiêu diệt bởi quái thú có ATK thấp hơn.",
    "scientificLore": "Rodi (Rh, Z=45) là kim loại chuyển tiếp phân lớp d/f với nhiều mức oxi hóa bền vững trong hợp chất Rh2O3.",
    "relatedEquation": "4Rh + 3O₂ → 2Rh₂O₃",
    "iupacName": "Rhodium Compound",
    "archetype": "PRECIOUS_CATALYST",
    "structuredEffects": [
      {
        "effectId": "B02_EFF_32",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "RECOVER_RESOURCE",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Phục hồi 1 Mana xúc tác."
      }
    ]
  },
  {
    "id": "card_b02_033_pd_33",
    "name": "Paladi — Thợ Rèn Đa Hóa Trị (Ký hiệu PdCl2)",
    "name_en": "Palladium — Multivalent Thợ Rèn (PdCl2)",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "ULTRA_RARE",
    "attribute": "ELECTRO",
    "manaCost": 4,
    "level": 5,
    "atk": 2200,
    "def": 2020,
    "chemicalFormula": "PdCl2",
    "atomicNumber": 46,
    "effectCode": "ELEM_B02_PD_VALENCE_33",
    "effectText": "Một lần mỗi lượt: Giảm 1 Mana kích hoạt cho thẻ Phép tiếp theo. Khi chiến đấu, không bị tiêu diệt bởi quái thú có ATK thấp hơn.",
    "scientificLore": "Paladi (Pd, Z=46) là kim loại chuyển tiếp phân lớp d/f với nhiều mức oxi hóa bền vững trong hợp chất PdCl2.",
    "relatedEquation": "Pd + Cl₂ → PdCl₂",
    "iupacName": "Palladium Compound",
    "archetype": "PRECIOUS_CATALYST",
    "structuredEffects": [
      {
        "effectId": "B02_EFF_33",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "RECOVER_RESOURCE",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Phục hồi 1 Mana xúc tác."
      }
    ]
  },
  {
    "id": "card_b02_034_ag_34",
    "name": "Bạc — Thợ Rèn Đa Hóa Trị (Ký hiệu AgNO3)",
    "name_en": "Silver — Multivalent Thợ Rèn (AgNO3)",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SECRET_RARE",
    "attribute": "AQUA",
    "manaCost": 5,
    "level": 6,
    "atk": 2480,
    "def": 2260,
    "chemicalFormula": "AgNO3",
    "atomicNumber": 47,
    "effectCode": "ELEM_B02_AG_VALENCE_34",
    "effectText": "Một lần mỗi lượt: Giảm 1 Mana kích hoạt cho thẻ Phép tiếp theo. Khi chiến đấu, không bị tiêu diệt bởi quái thú có ATK thấp hơn.",
    "scientificLore": "Bạc (Ag, Z=47) là kim loại chuyển tiếp phân lớp d/f với nhiều mức oxi hóa bền vững trong hợp chất AgNO3.",
    "relatedEquation": "3Ag + 4HNO₃ → 3AgNO₃ + NO + 2H₂O",
    "iupacName": "Silver Compound",
    "archetype": "PRECIOUS_CATALYST",
    "structuredEffects": [
      {
        "effectId": "B02_EFF_34",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "RECOVER_RESOURCE",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Phục hồi 1 Mana xúc tác."
      }
    ]
  },
  {
    "id": "card_b02_035_pt_35",
    "name": "Bạch Kim — Thợ Rèn Đa Hóa Trị (Ký hiệu PtCl4)",
    "name_en": "Platinum — Multivalent Thợ Rèn (PtCl4)",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "NOBLE_VOID",
    "manaCost": 6,
    "level": 7,
    "atk": 2760,
    "def": 2500,
    "chemicalFormula": "PtCl4",
    "atomicNumber": 78,
    "effectCode": "ELEM_B02_PT_VALENCE_35",
    "effectText": "Một lần mỗi lượt: Giảm 1 Mana kích hoạt cho thẻ Phép tiếp theo. Khi chiến đấu, không bị tiêu diệt bởi quái thú có ATK thấp hơn.",
    "scientificLore": "Bạch Kim (Pt, Z=78) là kim loại chuyển tiếp phân lớp d/f với nhiều mức oxi hóa bền vững trong hợp chất PtCl4.",
    "relatedEquation": "Pt + 2Cl₂ → PtCl₄",
    "iupacName": "Platinum Compound",
    "archetype": "PRECIOUS_CATALYST",
    "structuredEffects": [
      {
        "effectId": "B02_EFF_35",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "RECOVER_RESOURCE",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Phục hồi 1 Mana xúc tác."
      }
    ]
  },
  {
    "id": "card_b02_036_au_36",
    "name": "Vàng — Thợ Rèn Đa Hóa Trị (Ký hiệu AuCl3)",
    "name_en": "Gold — Multivalent Thợ Rèn (AuCl3)",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "NOBLE_VOID",
    "manaCost": 7,
    "level": 8,
    "atk": 3040,
    "def": 2440,
    "chemicalFormula": "AuCl3",
    "atomicNumber": 79,
    "effectCode": "ELEM_B02_AU_VALENCE_36",
    "effectText": "Một lần mỗi lượt: Giảm 1 Mana kích hoạt cho thẻ Phép tiếp theo. Khi chiến đấu, không bị tiêu diệt bởi quái thú có ATK thấp hơn.",
    "scientificLore": "Vàng (Au, Z=79) là kim loại chuyển tiếp phân lớp d/f với nhiều mức oxi hóa bền vững trong hợp chất AuCl3.",
    "relatedEquation": "2Au + 3Cl₂ → 2AuCl₃",
    "iupacName": "Gold Compound",
    "archetype": "PRECIOUS_CATALYST",
    "structuredEffects": [
      {
        "effectId": "B02_EFF_36",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "RECOVER_RESOURCE",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Phục hồi 1 Mana xúc tác."
      }
    ]
  },
  {
    "id": "card_b02_037_sc_37",
    "name": "Scandi — Kiếm Vương Đa Hóa Trị (Ký hiệu Sc2O3)",
    "name_en": "Scandium — Multivalent Kiếm Vương (Sc2O3)",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "TERRA",
    "manaCost": 2,
    "level": 3,
    "atk": 1800,
    "def": 1600,
    "chemicalFormula": "Sc2O3",
    "atomicNumber": 21,
    "effectCode": "ELEM_B02_SC_VALENCE_37",
    "effectText": "Một lần mỗi lượt: Có thể hoán đổi chỉ số ATK và DEF cơ bản đến hết lượt (chuyển đổi số oxi hóa).",
    "scientificLore": "Scandi (Sc, Z=21) là kim loại chuyển tiếp phân lớp d/f với nhiều mức oxi hóa bền vững trong hợp chất Sc2O3.",
    "relatedEquation": "4Sc + 3O₂ → 2Sc₂O₃",
    "iupacName": "Scandium Compound",
    "archetype": "TRANSITION_FORGE",
    "structuredEffects": [
      {
        "effectId": "B02_EFF_37",
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
        "description": "Tăng 300 ATK kích hoạt hóa trị."
      }
    ]
  },
  {
    "id": "card_b02_038_ti_38",
    "name": "Titan — Kiếm Vương Đa Hóa Trị (Ký hiệu TiO2)",
    "name_en": "Titanium — Multivalent Kiếm Vương (TiO2)",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "TERRA",
    "manaCost": 3,
    "level": 4,
    "atk": 2080,
    "def": 1840,
    "chemicalFormula": "TiO2",
    "atomicNumber": 22,
    "effectCode": "ELEM_B02_TI_VALENCE_38",
    "effectText": "Một lần mỗi lượt: Có thể hoán đổi chỉ số ATK và DEF cơ bản đến hết lượt (chuyển đổi số oxi hóa).",
    "scientificLore": "Titan (Ti, Z=22) là kim loại chuyển tiếp phân lớp d/f với nhiều mức oxi hóa bền vững trong hợp chất TiO2.",
    "relatedEquation": "Ti + O₂ → TiO₂",
    "iupacName": "Titanium Compound",
    "archetype": "TRANSITION_FORGE",
    "structuredEffects": [
      {
        "effectId": "B02_EFF_38",
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
        "description": "Tăng 300 ATK kích hoạt hóa trị."
      }
    ]
  },
  {
    "id": "card_b02_039_v_39",
    "name": "Vanadi — Kiếm Vương Đa Hóa Trị (Ký hiệu V2O5)",
    "name_en": "Vanadium — Multivalent Kiếm Vương (V2O5)",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "PYRO",
    "manaCost": 4,
    "level": 5,
    "atk": 2360,
    "def": 2080,
    "chemicalFormula": "V2O5",
    "atomicNumber": 23,
    "effectCode": "ELEM_B02_V_VALENCE_39",
    "effectText": "Một lần mỗi lượt: Có thể hoán đổi chỉ số ATK và DEF cơ bản đến hết lượt (chuyển đổi số oxi hóa).",
    "scientificLore": "Vanadi (V, Z=23) là kim loại chuyển tiếp phân lớp d/f với nhiều mức oxi hóa bền vững trong hợp chất V2O5.",
    "relatedEquation": "4V + 5O₂ → 2V₂O₅",
    "iupacName": "Vanadium Compound",
    "archetype": "TRANSITION_FORGE",
    "structuredEffects": [
      {
        "effectId": "B02_EFF_39",
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
        "description": "Tăng 300 ATK kích hoạt hóa trị."
      }
    ]
  },
  {
    "id": "card_b02_040_cr_40",
    "name": "Crom — Kiếm Vương Đa Hóa Trị (Ký hiệu Cr2O3)",
    "name_en": "Chromium — Multivalent Kiếm Vương (Cr2O3)",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "PYRO",
    "manaCost": 5,
    "level": 6,
    "atk": 2640,
    "def": 2320,
    "chemicalFormula": "Cr2O3",
    "atomicNumber": 24,
    "effectCode": "ELEM_B02_CR_VALENCE_40",
    "effectText": "Một lần mỗi lượt: Có thể hoán đổi chỉ số ATK và DEF cơ bản đến hết lượt (chuyển đổi số oxi hóa).",
    "scientificLore": "Crom (Cr, Z=24) là kim loại chuyển tiếp phân lớp d/f với nhiều mức oxi hóa bền vững trong hợp chất Cr2O3.",
    "relatedEquation": "4Cr + 3O₂ → 2Cr₂O₃",
    "iupacName": "Chromium Compound",
    "archetype": "TRANSITION_FORGE",
    "structuredEffects": [
      {
        "effectId": "B02_EFF_40",
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
        "description": "Tăng 300 ATK kích hoạt hóa trị."
      }
    ]
  },
  {
    "id": "card_b02_041_mn_41",
    "name": "Mangan — Kiếm Vương Đa Hóa Trị (Ký hiệu MnO2)",
    "name_en": "Manganese — Multivalent Kiếm Vương (MnO2)",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "ACID_DARK",
    "manaCost": 6,
    "level": 7,
    "atk": 2600,
    "def": 2260,
    "chemicalFormula": "MnO2",
    "atomicNumber": 25,
    "effectCode": "ELEM_B02_MN_VALENCE_41",
    "effectText": "Một lần mỗi lượt: Có thể hoán đổi chỉ số ATK và DEF cơ bản đến hết lượt (chuyển đổi số oxi hóa).",
    "scientificLore": "Mangan (Mn, Z=25) là kim loại chuyển tiếp phân lớp d/f với nhiều mức oxi hóa bền vững trong hợp chất MnO2.",
    "relatedEquation": "Mn + O₂ → MnO₂",
    "iupacName": "Manganese Compound",
    "archetype": "TRANSITION_FORGE",
    "structuredEffects": [
      {
        "effectId": "B02_EFF_41",
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
        "description": "Tăng 300 ATK kích hoạt hóa trị."
      }
    ]
  },
  {
    "id": "card_b02_042_fe_42",
    "name": "Sắt — Kiếm Vương Đa Hóa Trị (Ký hiệu Fe3O4)",
    "name_en": "Iron — Multivalent Kiếm Vương (Fe3O4)",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "ULTRA_RARE",
    "attribute": "TERRA",
    "manaCost": 7,
    "level": 8,
    "atk": 2880,
    "def": 2500,
    "chemicalFormula": "Fe3O4",
    "atomicNumber": 26,
    "effectCode": "ELEM_B02_FE_VALENCE_42",
    "effectText": "Một lần mỗi lượt: Có thể hoán đổi chỉ số ATK và DEF cơ bản đến hết lượt (chuyển đổi số oxi hóa).",
    "scientificLore": "Sắt (Fe, Z=26) là kim loại chuyển tiếp phân lớp d/f với nhiều mức oxi hóa bền vững trong hợp chất Fe3O4.",
    "relatedEquation": "3Fe + 2O₂ → Fe₃O₄",
    "iupacName": "Iron Compound",
    "archetype": "TRANSITION_FORGE",
    "structuredEffects": [
      {
        "effectId": "B02_EFF_42",
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
        "description": "Tăng 300 ATK kích hoạt hóa trị."
      }
    ]
  },
  {
    "id": "card_b02_043_co_43",
    "name": "Coban — Kiếm Vương Đa Hóa Trị (Ký hiệu CoCl2)",
    "name_en": "Cobalt — Multivalent Kiếm Vương (CoCl2)",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SECRET_RARE",
    "attribute": "ELECTRO",
    "manaCost": 2,
    "level": 3,
    "atk": 1960,
    "def": 1660,
    "chemicalFormula": "CoCl2",
    "atomicNumber": 27,
    "effectCode": "ELEM_B02_CO_VALENCE_43",
    "effectText": "Một lần mỗi lượt: Có thể hoán đổi chỉ số ATK và DEF cơ bản đến hết lượt (chuyển đổi số oxi hóa).",
    "scientificLore": "Coban (Co, Z=27) là kim loại chuyển tiếp phân lớp d/f với nhiều mức oxi hóa bền vững trong hợp chất CoCl2.",
    "relatedEquation": "Co + Cl₂ → CoCl₂",
    "iupacName": "Cobalt Compound",
    "archetype": "TRANSITION_FORGE",
    "structuredEffects": [
      {
        "effectId": "B02_EFF_43",
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
        "description": "Tăng 300 ATK kích hoạt hóa trị."
      }
    ]
  },
  {
    "id": "card_b02_044_ni_44",
    "name": "Niken — Kiếm Vương Đa Hóa Trị (Ký hiệu NiO)",
    "name_en": "Nickel — Multivalent Kiếm Vương (NiO)",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "ELECTRO",
    "manaCost": 3,
    "level": 4,
    "atk": 2240,
    "def": 1900,
    "chemicalFormula": "NiO",
    "atomicNumber": 28,
    "effectCode": "ELEM_B02_NI_VALENCE_44",
    "effectText": "Một lần mỗi lượt: Có thể hoán đổi chỉ số ATK và DEF cơ bản đến hết lượt (chuyển đổi số oxi hóa).",
    "scientificLore": "Niken (Ni, Z=28) là kim loại chuyển tiếp phân lớp d/f với nhiều mức oxi hóa bền vững trong hợp chất NiO.",
    "relatedEquation": "2Ni + O₂ → 2NiO",
    "iupacName": "Nickel Compound",
    "archetype": "TRANSITION_FORGE",
    "structuredEffects": [
      {
        "effectId": "B02_EFF_44",
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
        "description": "Tăng 300 ATK kích hoạt hóa trị."
      }
    ]
  },
  {
    "id": "card_b02_045_cu_45",
    "name": "Đồng — Kiếm Vương Đa Hóa Trị (Ký hiệu CuSO4)",
    "name_en": "Copper — Multivalent Kiếm Vương (CuSO4)",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "ELECTRO",
    "manaCost": 4,
    "level": 5,
    "atk": 2200,
    "def": 2140,
    "chemicalFormula": "CuSO4",
    "atomicNumber": 29,
    "effectCode": "ELEM_B02_CU_VALENCE_45",
    "effectText": "Một lần mỗi lượt: Có thể hoán đổi chỉ số ATK và DEF cơ bản đến hết lượt (chuyển đổi số oxi hóa).",
    "scientificLore": "Đồng (Cu, Z=29) là kim loại chuyển tiếp phân lớp d/f với nhiều mức oxi hóa bền vững trong hợp chất CuSO4.",
    "relatedEquation": "Cu + 2H₂SO₄ → CuSO₄ + SO₂ + 2H₂O",
    "iupacName": "Copper Compound",
    "archetype": "TRANSITION_FORGE",
    "structuredEffects": [
      {
        "effectId": "B02_EFF_45",
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
        "description": "Tăng 300 ATK kích hoạt hóa trị."
      }
    ]
  },
  {
    "id": "card_b02_046_zn_46",
    "name": "Kẽm — Kiếm Vương Đa Hóa Trị (Ký hiệu ZnO)",
    "name_en": "Zinc — Multivalent Kiếm Vương (ZnO)",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "TERRA",
    "manaCost": 5,
    "level": 6,
    "atk": 2480,
    "def": 2080,
    "chemicalFormula": "ZnO",
    "atomicNumber": 30,
    "effectCode": "ELEM_B02_ZN_VALENCE_46",
    "effectText": "Một lần mỗi lượt: Có thể hoán đổi chỉ số ATK và DEF cơ bản đến hết lượt (chuyển đổi số oxi hóa).",
    "scientificLore": "Kẽm (Zn, Z=30) là kim loại chuyển tiếp phân lớp d/f với nhiều mức oxi hóa bền vững trong hợp chất ZnO.",
    "relatedEquation": "2Zn + O₂ → 2ZnO",
    "iupacName": "Zinc Compound",
    "archetype": "TRANSITION_FORGE",
    "structuredEffects": [
      {
        "effectId": "B02_EFF_46",
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
        "description": "Tăng 300 ATK kích hoạt hóa trị."
      }
    ]
  },
  {
    "id": "card_b02_047_mo_47",
    "name": "Molipden — Kiếm Vương Đa Hóa Trị (Ký hiệu MoO3)",
    "name_en": "Molybdenum — Multivalent Kiếm Vương (MoO3)",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "TERRA",
    "manaCost": 6,
    "level": 7,
    "atk": 2760,
    "def": 2320,
    "chemicalFormula": "MoO3",
    "atomicNumber": 42,
    "effectCode": "ELEM_B02_MO_VALENCE_47",
    "effectText": "Một lần mỗi lượt: Có thể hoán đổi chỉ số ATK và DEF cơ bản đến hết lượt (chuyển đổi số oxi hóa).",
    "scientificLore": "Molipden (Mo, Z=42) là kim loại chuyển tiếp phân lớp d/f với nhiều mức oxi hóa bền vững trong hợp chất MoO3.",
    "relatedEquation": "2Mo + 3O₂ → 2MoO₃",
    "iupacName": "Molybdenum Compound",
    "archetype": "TRANSITION_FORGE",
    "structuredEffects": [
      {
        "effectId": "B02_EFF_47",
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
        "description": "Tăng 300 ATK kích hoạt hóa trị."
      }
    ]
  },
  {
    "id": "card_b02_048_w_48",
    "name": "Wolfram — Kiếm Vương Đa Hóa Trị (Ký hiệu WO3)",
    "name_en": "Tungsten — Multivalent Kiếm Vương (WO3)",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "PYRO",
    "manaCost": 7,
    "level": 8,
    "atk": 3040,
    "def": 2560,
    "chemicalFormula": "WO3",
    "atomicNumber": 74,
    "effectCode": "ELEM_B02_W_VALENCE_48",
    "effectText": "Một lần mỗi lượt: Có thể hoán đổi chỉ số ATK và DEF cơ bản đến hết lượt (chuyển đổi số oxi hóa).",
    "scientificLore": "Wolfram (W, Z=74) là kim loại chuyển tiếp phân lớp d/f với nhiều mức oxi hóa bền vững trong hợp chất WO3.",
    "relatedEquation": "2W + 3O₂ → 2WO₃",
    "iupacName": "Tungsten Compound",
    "archetype": "TRANSITION_FORGE",
    "structuredEffects": [
      {
        "effectId": "B02_EFF_48",
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
        "description": "Tăng 300 ATK kích hoạt hóa trị."
      }
    ]
  },
  {
    "id": "card_b02_049_ru_49",
    "name": "Ruteni — Kiếm Vương Đa Hóa Trị (Ký hiệu RuO4)",
    "name_en": "Ruthenium — Multivalent Kiếm Vương (RuO4)",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "AQUA",
    "manaCost": 2,
    "level": 3,
    "atk": 1800,
    "def": 1720,
    "chemicalFormula": "RuO4",
    "atomicNumber": 44,
    "effectCode": "ELEM_B02_RU_VALENCE_49",
    "effectText": "Một lần mỗi lượt: Giảm 1 Mana kích hoạt cho thẻ Phép tiếp theo. Khi chiến đấu, không bị tiêu diệt bởi quái thú có ATK thấp hơn.",
    "scientificLore": "Ruteni (Ru, Z=44) là kim loại chuyển tiếp phân lớp d/f với nhiều mức oxi hóa bền vững trong hợp chất RuO4.",
    "relatedEquation": "Ru + 2O₂ → RuO₄",
    "iupacName": "Ruthenium Compound",
    "archetype": "PRECIOUS_CATALYST",
    "structuredEffects": [
      {
        "effectId": "B02_EFF_49",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "RECOVER_RESOURCE",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Phục hồi 1 Mana xúc tác."
      }
    ]
  },
  {
    "id": "card_b02_050_rh_50",
    "name": "Rodi — Kiếm Vương Đa Hóa Trị (Ký hiệu Rh2O3)",
    "name_en": "Rhodium — Multivalent Kiếm Vương (Rh2O3)",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "AQUA",
    "manaCost": 3,
    "level": 4,
    "atk": 2080,
    "def": 1960,
    "chemicalFormula": "Rh2O3",
    "atomicNumber": 45,
    "effectCode": "ELEM_B02_RH_VALENCE_50",
    "effectText": "Một lần mỗi lượt: Giảm 1 Mana kích hoạt cho thẻ Phép tiếp theo. Khi chiến đấu, không bị tiêu diệt bởi quái thú có ATK thấp hơn.",
    "scientificLore": "Rodi (Rh, Z=45) là kim loại chuyển tiếp phân lớp d/f với nhiều mức oxi hóa bền vững trong hợp chất Rh2O3.",
    "relatedEquation": "4Rh + 3O₂ → 2Rh₂O₃",
    "iupacName": "Rhodium Compound",
    "archetype": "PRECIOUS_CATALYST",
    "structuredEffects": [
      {
        "effectId": "B02_EFF_50",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "RECOVER_RESOURCE",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Phục hồi 1 Mana xúc tác."
      }
    ]
  },
  {
    "id": "card_b02_051_pd_51",
    "name": "Paladi — Kiếm Vương Đa Hóa Trị (Ký hiệu PdCl2)",
    "name_en": "Palladium — Multivalent Kiếm Vương (PdCl2)",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "ULTRA_RARE",
    "attribute": "ELECTRO",
    "manaCost": 4,
    "level": 5,
    "atk": 2360,
    "def": 1900,
    "chemicalFormula": "PdCl2",
    "atomicNumber": 46,
    "effectCode": "ELEM_B02_PD_VALENCE_51",
    "effectText": "Một lần mỗi lượt: Giảm 1 Mana kích hoạt cho thẻ Phép tiếp theo. Khi chiến đấu, không bị tiêu diệt bởi quái thú có ATK thấp hơn.",
    "scientificLore": "Paladi (Pd, Z=46) là kim loại chuyển tiếp phân lớp d/f với nhiều mức oxi hóa bền vững trong hợp chất PdCl2.",
    "relatedEquation": "Pd + Cl₂ → PdCl₂",
    "iupacName": "Palladium Compound",
    "archetype": "PRECIOUS_CATALYST",
    "structuredEffects": [
      {
        "effectId": "B02_EFF_51",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "RECOVER_RESOURCE",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Phục hồi 1 Mana xúc tác."
      }
    ]
  },
  {
    "id": "card_b02_052_ag_52",
    "name": "Bạc — Kiếm Vương Đa Hóa Trị (Ký hiệu AgNO3)",
    "name_en": "Silver — Multivalent Kiếm Vương (AgNO3)",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SECRET_RARE",
    "attribute": "AQUA",
    "manaCost": 5,
    "level": 6,
    "atk": 2640,
    "def": 2140,
    "chemicalFormula": "AgNO3",
    "atomicNumber": 47,
    "effectCode": "ELEM_B02_AG_VALENCE_52",
    "effectText": "Một lần mỗi lượt: Giảm 1 Mana kích hoạt cho thẻ Phép tiếp theo. Khi chiến đấu, không bị tiêu diệt bởi quái thú có ATK thấp hơn.",
    "scientificLore": "Bạc (Ag, Z=47) là kim loại chuyển tiếp phân lớp d/f với nhiều mức oxi hóa bền vững trong hợp chất AgNO3.",
    "relatedEquation": "3Ag + 4HNO₃ → 3AgNO₃ + NO + 2H₂O",
    "iupacName": "Silver Compound",
    "archetype": "PRECIOUS_CATALYST",
    "structuredEffects": [
      {
        "effectId": "B02_EFF_52",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "RECOVER_RESOURCE",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Phục hồi 1 Mana xúc tác."
      }
    ]
  },
  {
    "id": "card_b02_053_pt_53",
    "name": "Bạch Kim — Kiếm Vương Đa Hóa Trị (Ký hiệu PtCl4)",
    "name_en": "Platinum — Multivalent Kiếm Vương (PtCl4)",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "NOBLE_VOID",
    "manaCost": 6,
    "level": 7,
    "atk": 2600,
    "def": 2380,
    "chemicalFormula": "PtCl4",
    "atomicNumber": 78,
    "effectCode": "ELEM_B02_PT_VALENCE_53",
    "effectText": "Một lần mỗi lượt: Giảm 1 Mana kích hoạt cho thẻ Phép tiếp theo. Khi chiến đấu, không bị tiêu diệt bởi quái thú có ATK thấp hơn.",
    "scientificLore": "Bạch Kim (Pt, Z=78) là kim loại chuyển tiếp phân lớp d/f với nhiều mức oxi hóa bền vững trong hợp chất PtCl4.",
    "relatedEquation": "Pt + 2Cl₂ → PtCl₄",
    "iupacName": "Platinum Compound",
    "archetype": "PRECIOUS_CATALYST",
    "structuredEffects": [
      {
        "effectId": "B02_EFF_53",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "RECOVER_RESOURCE",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Phục hồi 1 Mana xúc tác."
      }
    ]
  },
  {
    "id": "card_b02_054_au_54",
    "name": "Vàng — Kiếm Vương Đa Hóa Trị (Ký hiệu AuCl3)",
    "name_en": "Gold — Multivalent Kiếm Vương (AuCl3)",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "NOBLE_VOID",
    "manaCost": 7,
    "level": 8,
    "atk": 2880,
    "def": 2620,
    "chemicalFormula": "AuCl3",
    "atomicNumber": 79,
    "effectCode": "ELEM_B02_AU_VALENCE_54",
    "effectText": "Một lần mỗi lượt: Giảm 1 Mana kích hoạt cho thẻ Phép tiếp theo. Khi chiến đấu, không bị tiêu diệt bởi quái thú có ATK thấp hơn.",
    "scientificLore": "Vàng (Au, Z=79) là kim loại chuyển tiếp phân lớp d/f với nhiều mức oxi hóa bền vững trong hợp chất AuCl3.",
    "relatedEquation": "2Au + 3Cl₂ → 2AuCl₃",
    "iupacName": "Gold Compound",
    "archetype": "PRECIOUS_CATALYST",
    "structuredEffects": [
      {
        "effectId": "B02_EFF_54",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "RECOVER_RESOURCE",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Phục hồi 1 Mana xúc tác."
      }
    ]
  },
  {
    "id": "card_b02_055_sc_55",
    "name": "Scandi — Pháo Đài Đa Hóa Trị (Ký hiệu Sc2O3)",
    "name_en": "Scandium — Multivalent Pháo Đài (Sc2O3)",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "TERRA",
    "manaCost": 2,
    "level": 3,
    "atk": 1960,
    "def": 1780,
    "chemicalFormula": "Sc2O3",
    "atomicNumber": 21,
    "effectCode": "ELEM_B02_SC_VALENCE_55",
    "effectText": "Một lần mỗi lượt: Có thể hoán đổi chỉ số ATK và DEF cơ bản đến hết lượt (chuyển đổi số oxi hóa).",
    "scientificLore": "Scandi (Sc, Z=21) là kim loại chuyển tiếp phân lớp d/f với nhiều mức oxi hóa bền vững trong hợp chất Sc2O3.",
    "relatedEquation": "4Sc + 3O₂ → 2Sc₂O₃",
    "iupacName": "Scandium Compound",
    "archetype": "TRANSITION_FORGE",
    "structuredEffects": [
      {
        "effectId": "B02_EFF_55",
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
        "description": "Tăng 300 ATK kích hoạt hóa trị."
      }
    ]
  },
  {
    "id": "card_b02_056_ti_56",
    "name": "Titan — Pháo Đài Đa Hóa Trị (Ký hiệu TiO2)",
    "name_en": "Titanium — Multivalent Pháo Đài (TiO2)",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "TERRA",
    "manaCost": 3,
    "level": 4,
    "atk": 2240,
    "def": 1720,
    "chemicalFormula": "TiO2",
    "atomicNumber": 22,
    "effectCode": "ELEM_B02_TI_VALENCE_56",
    "effectText": "Một lần mỗi lượt: Có thể hoán đổi chỉ số ATK và DEF cơ bản đến hết lượt (chuyển đổi số oxi hóa).",
    "scientificLore": "Titan (Ti, Z=22) là kim loại chuyển tiếp phân lớp d/f với nhiều mức oxi hóa bền vững trong hợp chất TiO2.",
    "relatedEquation": "Ti + O₂ → TiO₂",
    "iupacName": "Titanium Compound",
    "archetype": "TRANSITION_FORGE",
    "structuredEffects": [
      {
        "effectId": "B02_EFF_56",
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
        "description": "Tăng 300 ATK kích hoạt hóa trị."
      }
    ]
  },
  {
    "id": "card_b02_057_v_57",
    "name": "Vanadi — Pháo Đài Đa Hóa Trị (Ký hiệu V2O5)",
    "name_en": "Vanadium — Multivalent Pháo Đài (V2O5)",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "PYRO",
    "manaCost": 4,
    "level": 5,
    "atk": 2200,
    "def": 1960,
    "chemicalFormula": "V2O5",
    "atomicNumber": 23,
    "effectCode": "ELEM_B02_V_VALENCE_57",
    "effectText": "Một lần mỗi lượt: Có thể hoán đổi chỉ số ATK và DEF cơ bản đến hết lượt (chuyển đổi số oxi hóa).",
    "scientificLore": "Vanadi (V, Z=23) là kim loại chuyển tiếp phân lớp d/f với nhiều mức oxi hóa bền vững trong hợp chất V2O5.",
    "relatedEquation": "4V + 5O₂ → 2V₂O₅",
    "iupacName": "Vanadium Compound",
    "archetype": "TRANSITION_FORGE",
    "structuredEffects": [
      {
        "effectId": "B02_EFF_57",
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
        "description": "Tăng 300 ATK kích hoạt hóa trị."
      }
    ]
  },
  {
    "id": "card_b02_058_cr_58",
    "name": "Crom — Pháo Đài Đa Hóa Trị (Ký hiệu Cr2O3)",
    "name_en": "Chromium — Multivalent Pháo Đài (Cr2O3)",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "PYRO",
    "manaCost": 5,
    "level": 6,
    "atk": 2480,
    "def": 2200,
    "chemicalFormula": "Cr2O3",
    "atomicNumber": 24,
    "effectCode": "ELEM_B02_CR_VALENCE_58",
    "effectText": "Một lần mỗi lượt: Có thể hoán đổi chỉ số ATK và DEF cơ bản đến hết lượt (chuyển đổi số oxi hóa).",
    "scientificLore": "Crom (Cr, Z=24) là kim loại chuyển tiếp phân lớp d/f với nhiều mức oxi hóa bền vững trong hợp chất Cr2O3.",
    "relatedEquation": "4Cr + 3O₂ → 2Cr₂O₃",
    "iupacName": "Chromium Compound",
    "archetype": "TRANSITION_FORGE",
    "structuredEffects": [
      {
        "effectId": "B02_EFF_58",
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
        "description": "Tăng 300 ATK kích hoạt hóa trị."
      }
    ]
  },
  {
    "id": "card_b02_059_mn_59",
    "name": "Mangan — Pháo Đài Đa Hóa Trị (Ký hiệu MnO2)",
    "name_en": "Manganese — Multivalent Pháo Đài (MnO2)",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "ACID_DARK",
    "manaCost": 6,
    "level": 7,
    "atk": 2760,
    "def": 2440,
    "chemicalFormula": "MnO2",
    "atomicNumber": 25,
    "effectCode": "ELEM_B02_MN_VALENCE_59",
    "effectText": "Một lần mỗi lượt: Có thể hoán đổi chỉ số ATK và DEF cơ bản đến hết lượt (chuyển đổi số oxi hóa).",
    "scientificLore": "Mangan (Mn, Z=25) là kim loại chuyển tiếp phân lớp d/f với nhiều mức oxi hóa bền vững trong hợp chất MnO2.",
    "relatedEquation": "Mn + O₂ → MnO₂",
    "iupacName": "Manganese Compound",
    "archetype": "TRANSITION_FORGE",
    "structuredEffects": [
      {
        "effectId": "B02_EFF_59",
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
        "description": "Tăng 300 ATK kích hoạt hóa trị."
      }
    ]
  },
  {
    "id": "card_b02_060_fe_60",
    "name": "Sắt — Pháo Đài Đa Hóa Trị (Ký hiệu Fe3O4)",
    "name_en": "Iron — Multivalent Pháo Đài (Fe3O4)",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "ULTRA_RARE",
    "attribute": "TERRA",
    "manaCost": 7,
    "level": 8,
    "atk": 3040,
    "def": 2680,
    "chemicalFormula": "Fe3O4",
    "atomicNumber": 26,
    "effectCode": "ELEM_B02_FE_VALENCE_60",
    "effectText": "Một lần mỗi lượt: Có thể hoán đổi chỉ số ATK và DEF cơ bản đến hết lượt (chuyển đổi số oxi hóa).",
    "scientificLore": "Sắt (Fe, Z=26) là kim loại chuyển tiếp phân lớp d/f với nhiều mức oxi hóa bền vững trong hợp chất Fe3O4.",
    "relatedEquation": "3Fe + 2O₂ → Fe₃O₄",
    "iupacName": "Iron Compound",
    "archetype": "TRANSITION_FORGE",
    "structuredEffects": [
      {
        "effectId": "B02_EFF_60",
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
        "description": "Tăng 300 ATK kích hoạt hóa trị."
      }
    ]
  },
  {
    "id": "card_b02_061_co_61",
    "name": "Coban — Pháo Đài Đa Hóa Trị (Ký hiệu CoCl2)",
    "name_en": "Cobalt — Multivalent Pháo Đài (CoCl2)",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SECRET_RARE",
    "attribute": "ELECTRO",
    "manaCost": 2,
    "level": 3,
    "atk": 1800,
    "def": 1540,
    "chemicalFormula": "CoCl2",
    "atomicNumber": 27,
    "effectCode": "ELEM_B02_CO_VALENCE_61",
    "effectText": "Một lần mỗi lượt: Có thể hoán đổi chỉ số ATK và DEF cơ bản đến hết lượt (chuyển đổi số oxi hóa).",
    "scientificLore": "Coban (Co, Z=27) là kim loại chuyển tiếp phân lớp d/f với nhiều mức oxi hóa bền vững trong hợp chất CoCl2.",
    "relatedEquation": "Co + Cl₂ → CoCl₂",
    "iupacName": "Cobalt Compound",
    "archetype": "TRANSITION_FORGE",
    "structuredEffects": [
      {
        "effectId": "B02_EFF_61",
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
        "description": "Tăng 300 ATK kích hoạt hóa trị."
      }
    ]
  },
  {
    "id": "card_b02_062_ni_62",
    "name": "Niken — Pháo Đài Đa Hóa Trị (Ký hiệu NiO)",
    "name_en": "Nickel — Multivalent Pháo Đài (NiO)",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "ELECTRO",
    "manaCost": 3,
    "level": 4,
    "atk": 2080,
    "def": 1780,
    "chemicalFormula": "NiO",
    "atomicNumber": 28,
    "effectCode": "ELEM_B02_NI_VALENCE_62",
    "effectText": "Một lần mỗi lượt: Có thể hoán đổi chỉ số ATK và DEF cơ bản đến hết lượt (chuyển đổi số oxi hóa).",
    "scientificLore": "Niken (Ni, Z=28) là kim loại chuyển tiếp phân lớp d/f với nhiều mức oxi hóa bền vững trong hợp chất NiO.",
    "relatedEquation": "2Ni + O₂ → 2NiO",
    "iupacName": "Nickel Compound",
    "archetype": "TRANSITION_FORGE",
    "structuredEffects": [
      {
        "effectId": "B02_EFF_62",
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
        "description": "Tăng 300 ATK kích hoạt hóa trị."
      }
    ]
  },
  {
    "id": "card_b02_063_cu_63",
    "name": "Đồng — Pháo Đài Đa Hóa Trị (Ký hiệu CuSO4)",
    "name_en": "Copper — Multivalent Pháo Đài (CuSO4)",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "ELECTRO",
    "manaCost": 4,
    "level": 5,
    "atk": 2360,
    "def": 2020,
    "chemicalFormula": "CuSO4",
    "atomicNumber": 29,
    "effectCode": "ELEM_B02_CU_VALENCE_63",
    "effectText": "Một lần mỗi lượt: Có thể hoán đổi chỉ số ATK và DEF cơ bản đến hết lượt (chuyển đổi số oxi hóa).",
    "scientificLore": "Đồng (Cu, Z=29) là kim loại chuyển tiếp phân lớp d/f với nhiều mức oxi hóa bền vững trong hợp chất CuSO4.",
    "relatedEquation": "Cu + 2H₂SO₄ → CuSO₄ + SO₂ + 2H₂O",
    "iupacName": "Copper Compound",
    "archetype": "TRANSITION_FORGE",
    "structuredEffects": [
      {
        "effectId": "B02_EFF_63",
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
        "description": "Tăng 300 ATK kích hoạt hóa trị."
      }
    ]
  },
  {
    "id": "card_b02_064_zn_64",
    "name": "Kẽm — Pháo Đài Đa Hóa Trị (Ký hiệu ZnO)",
    "name_en": "Zinc — Multivalent Pháo Đài (ZnO)",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "TERRA",
    "manaCost": 5,
    "level": 6,
    "atk": 2640,
    "def": 2260,
    "chemicalFormula": "ZnO",
    "atomicNumber": 30,
    "effectCode": "ELEM_B02_ZN_VALENCE_64",
    "effectText": "Một lần mỗi lượt: Có thể hoán đổi chỉ số ATK và DEF cơ bản đến hết lượt (chuyển đổi số oxi hóa).",
    "scientificLore": "Kẽm (Zn, Z=30) là kim loại chuyển tiếp phân lớp d/f với nhiều mức oxi hóa bền vững trong hợp chất ZnO.",
    "relatedEquation": "2Zn + O₂ → 2ZnO",
    "iupacName": "Zinc Compound",
    "archetype": "TRANSITION_FORGE",
    "structuredEffects": [
      {
        "effectId": "B02_EFF_64",
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
        "description": "Tăng 300 ATK kích hoạt hóa trị."
      }
    ]
  },
  {
    "id": "card_b02_065_mo_65",
    "name": "Molipden — Pháo Đài Đa Hóa Trị (Ký hiệu MoO3)",
    "name_en": "Molybdenum — Multivalent Pháo Đài (MoO3)",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "TERRA",
    "manaCost": 6,
    "level": 7,
    "atk": 2600,
    "def": 2500,
    "chemicalFormula": "MoO3",
    "atomicNumber": 42,
    "effectCode": "ELEM_B02_MO_VALENCE_65",
    "effectText": "Một lần mỗi lượt: Có thể hoán đổi chỉ số ATK và DEF cơ bản đến hết lượt (chuyển đổi số oxi hóa).",
    "scientificLore": "Molipden (Mo, Z=42) là kim loại chuyển tiếp phân lớp d/f với nhiều mức oxi hóa bền vững trong hợp chất MoO3.",
    "relatedEquation": "2Mo + 3O₂ → 2MoO₃",
    "iupacName": "Molybdenum Compound",
    "archetype": "TRANSITION_FORGE",
    "structuredEffects": [
      {
        "effectId": "B02_EFF_65",
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
        "description": "Tăng 300 ATK kích hoạt hóa trị."
      }
    ]
  },
  {
    "id": "card_b02_066_w_66",
    "name": "Wolfram — Pháo Đài Đa Hóa Trị (Ký hiệu WO3)",
    "name_en": "Tungsten — Multivalent Pháo Đài (WO3)",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "PYRO",
    "manaCost": 7,
    "level": 8,
    "atk": 2880,
    "def": 2440,
    "chemicalFormula": "WO3",
    "atomicNumber": 74,
    "effectCode": "ELEM_B02_W_VALENCE_66",
    "effectText": "Một lần mỗi lượt: Có thể hoán đổi chỉ số ATK và DEF cơ bản đến hết lượt (chuyển đổi số oxi hóa).",
    "scientificLore": "Wolfram (W, Z=74) là kim loại chuyển tiếp phân lớp d/f với nhiều mức oxi hóa bền vững trong hợp chất WO3.",
    "relatedEquation": "2W + 3O₂ → 2WO₃",
    "iupacName": "Tungsten Compound",
    "archetype": "TRANSITION_FORGE",
    "structuredEffects": [
      {
        "effectId": "B02_EFF_66",
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
        "description": "Tăng 300 ATK kích hoạt hóa trị."
      }
    ]
  },
  {
    "id": "card_b02_067_ru_67",
    "name": "Ruteni — Pháo Đài Đa Hóa Trị (Ký hiệu RuO4)",
    "name_en": "Ruthenium — Multivalent Pháo Đài (RuO4)",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "AQUA",
    "manaCost": 2,
    "level": 3,
    "atk": 1960,
    "def": 1600,
    "chemicalFormula": "RuO4",
    "atomicNumber": 44,
    "effectCode": "ELEM_B02_RU_VALENCE_67",
    "effectText": "Một lần mỗi lượt: Giảm 1 Mana kích hoạt cho thẻ Phép tiếp theo. Khi chiến đấu, không bị tiêu diệt bởi quái thú có ATK thấp hơn.",
    "scientificLore": "Ruteni (Ru, Z=44) là kim loại chuyển tiếp phân lớp d/f với nhiều mức oxi hóa bền vững trong hợp chất RuO4.",
    "relatedEquation": "Ru + 2O₂ → RuO₄",
    "iupacName": "Ruthenium Compound",
    "archetype": "PRECIOUS_CATALYST",
    "structuredEffects": [
      {
        "effectId": "B02_EFF_67",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "RECOVER_RESOURCE",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Phục hồi 1 Mana xúc tác."
      }
    ]
  },
  {
    "id": "card_b02_068_rh_68",
    "name": "Rodi — Pháo Đài Đa Hóa Trị (Ký hiệu Rh2O3)",
    "name_en": "Rhodium — Multivalent Pháo Đài (Rh2O3)",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "AQUA",
    "manaCost": 3,
    "level": 4,
    "atk": 2240,
    "def": 1840,
    "chemicalFormula": "Rh2O3",
    "atomicNumber": 45,
    "effectCode": "ELEM_B02_RH_VALENCE_68",
    "effectText": "Một lần mỗi lượt: Giảm 1 Mana kích hoạt cho thẻ Phép tiếp theo. Khi chiến đấu, không bị tiêu diệt bởi quái thú có ATK thấp hơn.",
    "scientificLore": "Rodi (Rh, Z=45) là kim loại chuyển tiếp phân lớp d/f với nhiều mức oxi hóa bền vững trong hợp chất Rh2O3.",
    "relatedEquation": "4Rh + 3O₂ → 2Rh₂O₃",
    "iupacName": "Rhodium Compound",
    "archetype": "PRECIOUS_CATALYST",
    "structuredEffects": [
      {
        "effectId": "B02_EFF_68",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "RECOVER_RESOURCE",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Phục hồi 1 Mana xúc tác."
      }
    ]
  },
  {
    "id": "card_b02_069_pd_69",
    "name": "Paladi — Pháo Đài Đa Hóa Trị (Ký hiệu PdCl2)",
    "name_en": "Palladium — Multivalent Pháo Đài (PdCl2)",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "ULTRA_RARE",
    "attribute": "ELECTRO",
    "manaCost": 4,
    "level": 5,
    "atk": 2200,
    "def": 2080,
    "chemicalFormula": "PdCl2",
    "atomicNumber": 46,
    "effectCode": "ELEM_B02_PD_VALENCE_69",
    "effectText": "Một lần mỗi lượt: Giảm 1 Mana kích hoạt cho thẻ Phép tiếp theo. Khi chiến đấu, không bị tiêu diệt bởi quái thú có ATK thấp hơn.",
    "scientificLore": "Paladi (Pd, Z=46) là kim loại chuyển tiếp phân lớp d/f với nhiều mức oxi hóa bền vững trong hợp chất PdCl2.",
    "relatedEquation": "Pd + Cl₂ → PdCl₂",
    "iupacName": "Palladium Compound",
    "archetype": "PRECIOUS_CATALYST",
    "structuredEffects": [
      {
        "effectId": "B02_EFF_69",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "RECOVER_RESOURCE",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Phục hồi 1 Mana xúc tác."
      }
    ]
  },
  {
    "id": "card_b02_070_ag_70",
    "name": "Bạc — Pháo Đài Đa Hóa Trị (Ký hiệu AgNO3)",
    "name_en": "Silver — Multivalent Pháo Đài (AgNO3)",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SECRET_RARE",
    "attribute": "AQUA",
    "manaCost": 5,
    "level": 6,
    "atk": 2480,
    "def": 2320,
    "chemicalFormula": "AgNO3",
    "atomicNumber": 47,
    "effectCode": "ELEM_B02_AG_VALENCE_70",
    "effectText": "Một lần mỗi lượt: Giảm 1 Mana kích hoạt cho thẻ Phép tiếp theo. Khi chiến đấu, không bị tiêu diệt bởi quái thú có ATK thấp hơn.",
    "scientificLore": "Bạc (Ag, Z=47) là kim loại chuyển tiếp phân lớp d/f với nhiều mức oxi hóa bền vững trong hợp chất AgNO3.",
    "relatedEquation": "3Ag + 4HNO₃ → 3AgNO₃ + NO + 2H₂O",
    "iupacName": "Silver Compound",
    "archetype": "PRECIOUS_CATALYST",
    "structuredEffects": [
      {
        "effectId": "B02_EFF_70",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "RECOVER_RESOURCE",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Phục hồi 1 Mana xúc tác."
      }
    ]
  },
  {
    "id": "card_b02_071_pt_71",
    "name": "Bạch Kim — Pháo Đài Đa Hóa Trị (Ký hiệu PtCl4)",
    "name_en": "Platinum — Multivalent Pháo Đài (PtCl4)",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "NOBLE_VOID",
    "manaCost": 6,
    "level": 7,
    "atk": 2760,
    "def": 2260,
    "chemicalFormula": "PtCl4",
    "atomicNumber": 78,
    "effectCode": "ELEM_B02_PT_VALENCE_71",
    "effectText": "Một lần mỗi lượt: Giảm 1 Mana kích hoạt cho thẻ Phép tiếp theo. Khi chiến đấu, không bị tiêu diệt bởi quái thú có ATK thấp hơn.",
    "scientificLore": "Bạch Kim (Pt, Z=78) là kim loại chuyển tiếp phân lớp d/f với nhiều mức oxi hóa bền vững trong hợp chất PtCl4.",
    "relatedEquation": "Pt + 2Cl₂ → PtCl₄",
    "iupacName": "Platinum Compound",
    "archetype": "PRECIOUS_CATALYST",
    "structuredEffects": [
      {
        "effectId": "B02_EFF_71",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "RECOVER_RESOURCE",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Phục hồi 1 Mana xúc tác."
      }
    ]
  },
  {
    "id": "card_b02_072_au_72",
    "name": "Vàng — Pháo Đài Đa Hóa Trị (Ký hiệu AuCl3)",
    "name_en": "Gold — Multivalent Pháo Đài (AuCl3)",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "NOBLE_VOID",
    "manaCost": 7,
    "level": 8,
    "atk": 3040,
    "def": 2500,
    "chemicalFormula": "AuCl3",
    "atomicNumber": 79,
    "effectCode": "ELEM_B02_AU_VALENCE_72",
    "effectText": "Một lần mỗi lượt: Giảm 1 Mana kích hoạt cho thẻ Phép tiếp theo. Khi chiến đấu, không bị tiêu diệt bởi quái thú có ATK thấp hơn.",
    "scientificLore": "Vàng (Au, Z=79) là kim loại chuyển tiếp phân lớp d/f với nhiều mức oxi hóa bền vững trong hợp chất AuCl3.",
    "relatedEquation": "2Au + 3Cl₂ → 2AuCl₃",
    "iupacName": "Gold Compound",
    "archetype": "PRECIOUS_CATALYST",
    "structuredEffects": [
      {
        "effectId": "B02_EFF_72",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "RECOVER_RESOURCE",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Phục hồi 1 Mana xúc tác."
      }
    ]
  },
  {
    "id": "card_b02_073_sc_73",
    "name": "Scandi — Đao Phủ Đa Hóa Trị (Ký hiệu Sc2O3)",
    "name_en": "Scandium — Multivalent Đao Phủ (Sc2O3)",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "TERRA",
    "manaCost": 2,
    "level": 3,
    "atk": 1800,
    "def": 1660,
    "chemicalFormula": "Sc2O3",
    "atomicNumber": 21,
    "effectCode": "ELEM_B02_SC_VALENCE_73",
    "effectText": "Một lần mỗi lượt: Có thể hoán đổi chỉ số ATK và DEF cơ bản đến hết lượt (chuyển đổi số oxi hóa).",
    "scientificLore": "Scandi (Sc, Z=21) là kim loại chuyển tiếp phân lớp d/f với nhiều mức oxi hóa bền vững trong hợp chất Sc2O3.",
    "relatedEquation": "4Sc + 3O₂ → 2Sc₂O₃",
    "iupacName": "Scandium Compound",
    "archetype": "TRANSITION_FORGE",
    "structuredEffects": [
      {
        "effectId": "B02_EFF_73",
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
        "description": "Tăng 300 ATK kích hoạt hóa trị."
      }
    ]
  },
  {
    "id": "card_b02_074_ti_74",
    "name": "Titan — Đao Phủ Đa Hóa Trị (Ký hiệu TiO2)",
    "name_en": "Titanium — Multivalent Đao Phủ (TiO2)",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "TERRA",
    "manaCost": 3,
    "level": 4,
    "atk": 2080,
    "def": 1900,
    "chemicalFormula": "TiO2",
    "atomicNumber": 22,
    "effectCode": "ELEM_B02_TI_VALENCE_74",
    "effectText": "Một lần mỗi lượt: Có thể hoán đổi chỉ số ATK và DEF cơ bản đến hết lượt (chuyển đổi số oxi hóa).",
    "scientificLore": "Titan (Ti, Z=22) là kim loại chuyển tiếp phân lớp d/f với nhiều mức oxi hóa bền vững trong hợp chất TiO2.",
    "relatedEquation": "Ti + O₂ → TiO₂",
    "iupacName": "Titanium Compound",
    "archetype": "TRANSITION_FORGE",
    "structuredEffects": [
      {
        "effectId": "B02_EFF_74",
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
        "description": "Tăng 300 ATK kích hoạt hóa trị."
      }
    ]
  },
  {
    "id": "card_b02_075_v_75",
    "name": "Vanadi — Đao Phủ Đa Hóa Trị (Ký hiệu V2O5)",
    "name_en": "Vanadium — Multivalent Đao Phủ (V2O5)",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "PYRO",
    "manaCost": 4,
    "level": 5,
    "atk": 2360,
    "def": 2140,
    "chemicalFormula": "V2O5",
    "atomicNumber": 23,
    "effectCode": "ELEM_B02_V_VALENCE_75",
    "effectText": "Một lần mỗi lượt: Có thể hoán đổi chỉ số ATK và DEF cơ bản đến hết lượt (chuyển đổi số oxi hóa).",
    "scientificLore": "Vanadi (V, Z=23) là kim loại chuyển tiếp phân lớp d/f với nhiều mức oxi hóa bền vững trong hợp chất V2O5.",
    "relatedEquation": "4V + 5O₂ → 2V₂O₅",
    "iupacName": "Vanadium Compound",
    "archetype": "TRANSITION_FORGE",
    "structuredEffects": [
      {
        "effectId": "B02_EFF_75",
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
        "description": "Tăng 300 ATK kích hoạt hóa trị."
      }
    ]
  },
  {
    "id": "card_b02_076_cr_76",
    "name": "Crom — Đao Phủ Đa Hóa Trị (Ký hiệu Cr2O3)",
    "name_en": "Chromium — Multivalent Đao Phủ (Cr2O3)",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "PYRO",
    "manaCost": 5,
    "level": 6,
    "atk": 2640,
    "def": 2080,
    "chemicalFormula": "Cr2O3",
    "atomicNumber": 24,
    "effectCode": "ELEM_B02_CR_VALENCE_76",
    "effectText": "Một lần mỗi lượt: Có thể hoán đổi chỉ số ATK và DEF cơ bản đến hết lượt (chuyển đổi số oxi hóa).",
    "scientificLore": "Crom (Cr, Z=24) là kim loại chuyển tiếp phân lớp d/f với nhiều mức oxi hóa bền vững trong hợp chất Cr2O3.",
    "relatedEquation": "4Cr + 3O₂ → 2Cr₂O₃",
    "iupacName": "Chromium Compound",
    "archetype": "TRANSITION_FORGE",
    "structuredEffects": [
      {
        "effectId": "B02_EFF_76",
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
        "description": "Tăng 300 ATK kích hoạt hóa trị."
      }
    ]
  },
  {
    "id": "card_b02_077_mn_77",
    "name": "Mangan — Đao Phủ Đa Hóa Trị (Ký hiệu MnO2)",
    "name_en": "Manganese — Multivalent Đao Phủ (MnO2)",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "ACID_DARK",
    "manaCost": 6,
    "level": 7,
    "atk": 2600,
    "def": 2320,
    "chemicalFormula": "MnO2",
    "atomicNumber": 25,
    "effectCode": "ELEM_B02_MN_VALENCE_77",
    "effectText": "Một lần mỗi lượt: Có thể hoán đổi chỉ số ATK và DEF cơ bản đến hết lượt (chuyển đổi số oxi hóa).",
    "scientificLore": "Mangan (Mn, Z=25) là kim loại chuyển tiếp phân lớp d/f với nhiều mức oxi hóa bền vững trong hợp chất MnO2.",
    "relatedEquation": "Mn + O₂ → MnO₂",
    "iupacName": "Manganese Compound",
    "archetype": "TRANSITION_FORGE",
    "structuredEffects": [
      {
        "effectId": "B02_EFF_77",
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
        "description": "Tăng 300 ATK kích hoạt hóa trị."
      }
    ]
  },
  {
    "id": "card_b02_078_fe_78",
    "name": "Sắt — Đao Phủ Đa Hóa Trị (Ký hiệu Fe3O4)",
    "name_en": "Iron — Multivalent Đao Phủ (Fe3O4)",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "ULTRA_RARE",
    "attribute": "TERRA",
    "manaCost": 7,
    "level": 8,
    "atk": 2880,
    "def": 2560,
    "chemicalFormula": "Fe3O4",
    "atomicNumber": 26,
    "effectCode": "ELEM_B02_FE_VALENCE_78",
    "effectText": "Một lần mỗi lượt: Có thể hoán đổi chỉ số ATK và DEF cơ bản đến hết lượt (chuyển đổi số oxi hóa).",
    "scientificLore": "Sắt (Fe, Z=26) là kim loại chuyển tiếp phân lớp d/f với nhiều mức oxi hóa bền vững trong hợp chất Fe3O4.",
    "relatedEquation": "3Fe + 2O₂ → Fe₃O₄",
    "iupacName": "Iron Compound",
    "archetype": "TRANSITION_FORGE",
    "structuredEffects": [
      {
        "effectId": "B02_EFF_78",
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
        "description": "Tăng 300 ATK kích hoạt hóa trị."
      }
    ]
  },
  {
    "id": "card_b02_079_co_79",
    "name": "Coban — Đao Phủ Đa Hóa Trị (Ký hiệu CoCl2)",
    "name_en": "Cobalt — Multivalent Đao Phủ (CoCl2)",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SECRET_RARE",
    "attribute": "ELECTRO",
    "manaCost": 2,
    "level": 3,
    "atk": 1960,
    "def": 1720,
    "chemicalFormula": "CoCl2",
    "atomicNumber": 27,
    "effectCode": "ELEM_B02_CO_VALENCE_79",
    "effectText": "Một lần mỗi lượt: Có thể hoán đổi chỉ số ATK và DEF cơ bản đến hết lượt (chuyển đổi số oxi hóa).",
    "scientificLore": "Coban (Co, Z=27) là kim loại chuyển tiếp phân lớp d/f với nhiều mức oxi hóa bền vững trong hợp chất CoCl2.",
    "relatedEquation": "Co + Cl₂ → CoCl₂",
    "iupacName": "Cobalt Compound",
    "archetype": "TRANSITION_FORGE",
    "structuredEffects": [
      {
        "effectId": "B02_EFF_79",
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
        "description": "Tăng 300 ATK kích hoạt hóa trị."
      }
    ]
  },
  {
    "id": "card_b02_080_ni_80",
    "name": "Niken — Đao Phủ Đa Hóa Trị (Ký hiệu NiO)",
    "name_en": "Nickel — Multivalent Đao Phủ (NiO)",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "ELECTRO",
    "manaCost": 3,
    "level": 4,
    "atk": 2240,
    "def": 1960,
    "chemicalFormula": "NiO",
    "atomicNumber": 28,
    "effectCode": "ELEM_B02_NI_VALENCE_80",
    "effectText": "Một lần mỗi lượt: Có thể hoán đổi chỉ số ATK và DEF cơ bản đến hết lượt (chuyển đổi số oxi hóa).",
    "scientificLore": "Niken (Ni, Z=28) là kim loại chuyển tiếp phân lớp d/f với nhiều mức oxi hóa bền vững trong hợp chất NiO.",
    "relatedEquation": "2Ni + O₂ → 2NiO",
    "iupacName": "Nickel Compound",
    "archetype": "TRANSITION_FORGE",
    "structuredEffects": [
      {
        "effectId": "B02_EFF_80",
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
        "description": "Tăng 300 ATK kích hoạt hóa trị."
      }
    ]
  },
  {
    "id": "card_b02_081_cu_81",
    "name": "Đồng — Đao Phủ Đa Hóa Trị (Ký hiệu CuSO4)",
    "name_en": "Copper — Multivalent Đao Phủ (CuSO4)",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "ELECTRO",
    "manaCost": 4,
    "level": 5,
    "atk": 2200,
    "def": 1900,
    "chemicalFormula": "CuSO4",
    "atomicNumber": 29,
    "effectCode": "ELEM_B02_CU_VALENCE_81",
    "effectText": "Một lần mỗi lượt: Có thể hoán đổi chỉ số ATK và DEF cơ bản đến hết lượt (chuyển đổi số oxi hóa).",
    "scientificLore": "Đồng (Cu, Z=29) là kim loại chuyển tiếp phân lớp d/f với nhiều mức oxi hóa bền vững trong hợp chất CuSO4.",
    "relatedEquation": "Cu + 2H₂SO₄ → CuSO₄ + SO₂ + 2H₂O",
    "iupacName": "Copper Compound",
    "archetype": "TRANSITION_FORGE",
    "structuredEffects": [
      {
        "effectId": "B02_EFF_81",
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
        "description": "Tăng 300 ATK kích hoạt hóa trị."
      }
    ]
  },
  {
    "id": "card_b02_082_zn_82",
    "name": "Kẽm — Đao Phủ Đa Hóa Trị (Ký hiệu ZnO)",
    "name_en": "Zinc — Multivalent Đao Phủ (ZnO)",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "TERRA",
    "manaCost": 5,
    "level": 6,
    "atk": 2480,
    "def": 2140,
    "chemicalFormula": "ZnO",
    "atomicNumber": 30,
    "effectCode": "ELEM_B02_ZN_VALENCE_82",
    "effectText": "Một lần mỗi lượt: Có thể hoán đổi chỉ số ATK và DEF cơ bản đến hết lượt (chuyển đổi số oxi hóa).",
    "scientificLore": "Kẽm (Zn, Z=30) là kim loại chuyển tiếp phân lớp d/f với nhiều mức oxi hóa bền vững trong hợp chất ZnO.",
    "relatedEquation": "2Zn + O₂ → 2ZnO",
    "iupacName": "Zinc Compound",
    "archetype": "TRANSITION_FORGE",
    "structuredEffects": [
      {
        "effectId": "B02_EFF_82",
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
        "description": "Tăng 300 ATK kích hoạt hóa trị."
      }
    ]
  },
  {
    "id": "card_b02_083_mo_83",
    "name": "Molipden — Đao Phủ Đa Hóa Trị (Ký hiệu MoO3)",
    "name_en": "Molybdenum — Multivalent Đao Phủ (MoO3)",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "TERRA",
    "manaCost": 6,
    "level": 7,
    "atk": 2760,
    "def": 2380,
    "chemicalFormula": "MoO3",
    "atomicNumber": 42,
    "effectCode": "ELEM_B02_MO_VALENCE_83",
    "effectText": "Một lần mỗi lượt: Có thể hoán đổi chỉ số ATK và DEF cơ bản đến hết lượt (chuyển đổi số oxi hóa).",
    "scientificLore": "Molipden (Mo, Z=42) là kim loại chuyển tiếp phân lớp d/f với nhiều mức oxi hóa bền vững trong hợp chất MoO3.",
    "relatedEquation": "2Mo + 3O₂ → 2MoO₃",
    "iupacName": "Molybdenum Compound",
    "archetype": "TRANSITION_FORGE",
    "structuredEffects": [
      {
        "effectId": "B02_EFF_83",
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
        "description": "Tăng 300 ATK kích hoạt hóa trị."
      }
    ]
  },
  {
    "id": "card_b02_084_w_84",
    "name": "Wolfram — Đao Phủ Đa Hóa Trị (Ký hiệu WO3)",
    "name_en": "Tungsten — Multivalent Đao Phủ (WO3)",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "PYRO",
    "manaCost": 7,
    "level": 8,
    "atk": 3040,
    "def": 2620,
    "chemicalFormula": "WO3",
    "atomicNumber": 74,
    "effectCode": "ELEM_B02_W_VALENCE_84",
    "effectText": "Một lần mỗi lượt: Có thể hoán đổi chỉ số ATK và DEF cơ bản đến hết lượt (chuyển đổi số oxi hóa).",
    "scientificLore": "Wolfram (W, Z=74) là kim loại chuyển tiếp phân lớp d/f với nhiều mức oxi hóa bền vững trong hợp chất WO3.",
    "relatedEquation": "2W + 3O₂ → 2WO₃",
    "iupacName": "Tungsten Compound",
    "archetype": "TRANSITION_FORGE",
    "structuredEffects": [
      {
        "effectId": "B02_EFF_84",
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
        "description": "Tăng 300 ATK kích hoạt hóa trị."
      }
    ]
  },
  {
    "id": "card_b02_085_ru_85",
    "name": "Ruteni — Đao Phủ Đa Hóa Trị (Ký hiệu RuO4)",
    "name_en": "Ruthenium — Multivalent Đao Phủ (RuO4)",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "AQUA",
    "manaCost": 2,
    "level": 3,
    "atk": 1800,
    "def": 1780,
    "chemicalFormula": "RuO4",
    "atomicNumber": 44,
    "effectCode": "ELEM_B02_RU_VALENCE_85",
    "effectText": "Một lần mỗi lượt: Giảm 1 Mana kích hoạt cho thẻ Phép tiếp theo. Khi chiến đấu, không bị tiêu diệt bởi quái thú có ATK thấp hơn.",
    "scientificLore": "Ruteni (Ru, Z=44) là kim loại chuyển tiếp phân lớp d/f với nhiều mức oxi hóa bền vững trong hợp chất RuO4.",
    "relatedEquation": "Ru + 2O₂ → RuO₄",
    "iupacName": "Ruthenium Compound",
    "archetype": "PRECIOUS_CATALYST",
    "structuredEffects": [
      {
        "effectId": "B02_EFF_85",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "RECOVER_RESOURCE",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Phục hồi 1 Mana xúc tác."
      }
    ]
  },
  {
    "id": "card_b02_086_rh_86",
    "name": "Rodi — Đao Phủ Đa Hóa Trị (Ký hiệu Rh2O3)",
    "name_en": "Rhodium — Multivalent Đao Phủ (Rh2O3)",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "AQUA",
    "manaCost": 3,
    "level": 4,
    "atk": 2080,
    "def": 1720,
    "chemicalFormula": "Rh2O3",
    "atomicNumber": 45,
    "effectCode": "ELEM_B02_RH_VALENCE_86",
    "effectText": "Một lần mỗi lượt: Giảm 1 Mana kích hoạt cho thẻ Phép tiếp theo. Khi chiến đấu, không bị tiêu diệt bởi quái thú có ATK thấp hơn.",
    "scientificLore": "Rodi (Rh, Z=45) là kim loại chuyển tiếp phân lớp d/f với nhiều mức oxi hóa bền vững trong hợp chất Rh2O3.",
    "relatedEquation": "4Rh + 3O₂ → 2Rh₂O₃",
    "iupacName": "Rhodium Compound",
    "archetype": "PRECIOUS_CATALYST",
    "structuredEffects": [
      {
        "effectId": "B02_EFF_86",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "RECOVER_RESOURCE",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Phục hồi 1 Mana xúc tác."
      }
    ]
  },
  {
    "id": "card_b02_087_pd_87",
    "name": "Paladi — Đao Phủ Đa Hóa Trị (Ký hiệu PdCl2)",
    "name_en": "Palladium — Multivalent Đao Phủ (PdCl2)",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "ULTRA_RARE",
    "attribute": "ELECTRO",
    "manaCost": 4,
    "level": 5,
    "atk": 2360,
    "def": 1960,
    "chemicalFormula": "PdCl2",
    "atomicNumber": 46,
    "effectCode": "ELEM_B02_PD_VALENCE_87",
    "effectText": "Một lần mỗi lượt: Giảm 1 Mana kích hoạt cho thẻ Phép tiếp theo. Khi chiến đấu, không bị tiêu diệt bởi quái thú có ATK thấp hơn.",
    "scientificLore": "Paladi (Pd, Z=46) là kim loại chuyển tiếp phân lớp d/f với nhiều mức oxi hóa bền vững trong hợp chất PdCl2.",
    "relatedEquation": "Pd + Cl₂ → PdCl₂",
    "iupacName": "Palladium Compound",
    "archetype": "PRECIOUS_CATALYST",
    "structuredEffects": [
      {
        "effectId": "B02_EFF_87",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "RECOVER_RESOURCE",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Phục hồi 1 Mana xúc tác."
      }
    ]
  },
  {
    "id": "card_b02_088_ag_88",
    "name": "Bạc — Đao Phủ Đa Hóa Trị (Ký hiệu AgNO3)",
    "name_en": "Silver — Multivalent Đao Phủ (AgNO3)",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SECRET_RARE",
    "attribute": "AQUA",
    "manaCost": 5,
    "level": 6,
    "atk": 2640,
    "def": 2200,
    "chemicalFormula": "AgNO3",
    "atomicNumber": 47,
    "effectCode": "ELEM_B02_AG_VALENCE_88",
    "effectText": "Một lần mỗi lượt: Giảm 1 Mana kích hoạt cho thẻ Phép tiếp theo. Khi chiến đấu, không bị tiêu diệt bởi quái thú có ATK thấp hơn.",
    "scientificLore": "Bạc (Ag, Z=47) là kim loại chuyển tiếp phân lớp d/f với nhiều mức oxi hóa bền vững trong hợp chất AgNO3.",
    "relatedEquation": "3Ag + 4HNO₃ → 3AgNO₃ + NO + 2H₂O",
    "iupacName": "Silver Compound",
    "archetype": "PRECIOUS_CATALYST",
    "structuredEffects": [
      {
        "effectId": "B02_EFF_88",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "RECOVER_RESOURCE",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Phục hồi 1 Mana xúc tác."
      }
    ]
  },
  {
    "id": "card_b02_089_pt_89",
    "name": "Bạch Kim — Đao Phủ Đa Hóa Trị (Ký hiệu PtCl4)",
    "name_en": "Platinum — Multivalent Đao Phủ (PtCl4)",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "NOBLE_VOID",
    "manaCost": 6,
    "level": 7,
    "atk": 2600,
    "def": 2440,
    "chemicalFormula": "PtCl4",
    "atomicNumber": 78,
    "effectCode": "ELEM_B02_PT_VALENCE_89",
    "effectText": "Một lần mỗi lượt: Giảm 1 Mana kích hoạt cho thẻ Phép tiếp theo. Khi chiến đấu, không bị tiêu diệt bởi quái thú có ATK thấp hơn.",
    "scientificLore": "Bạch Kim (Pt, Z=78) là kim loại chuyển tiếp phân lớp d/f với nhiều mức oxi hóa bền vững trong hợp chất PtCl4.",
    "relatedEquation": "Pt + 2Cl₂ → PtCl₄",
    "iupacName": "Platinum Compound",
    "archetype": "PRECIOUS_CATALYST",
    "structuredEffects": [
      {
        "effectId": "B02_EFF_89",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "RECOVER_RESOURCE",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Phục hồi 1 Mana xúc tác."
      }
    ]
  },
  {
    "id": "card_b02_090_au_90",
    "name": "Vàng — Đao Phủ Đa Hóa Trị (Ký hiệu AuCl3)",
    "name_en": "Gold — Multivalent Đao Phủ (AuCl3)",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "NOBLE_VOID",
    "manaCost": 7,
    "level": 8,
    "atk": 2880,
    "def": 2680,
    "chemicalFormula": "AuCl3",
    "atomicNumber": 79,
    "effectCode": "ELEM_B02_AU_VALENCE_90",
    "effectText": "Một lần mỗi lượt: Giảm 1 Mana kích hoạt cho thẻ Phép tiếp theo. Khi chiến đấu, không bị tiêu diệt bởi quái thú có ATK thấp hơn.",
    "scientificLore": "Vàng (Au, Z=79) là kim loại chuyển tiếp phân lớp d/f với nhiều mức oxi hóa bền vững trong hợp chất AuCl3.",
    "relatedEquation": "2Au + 3Cl₂ → 2AuCl₃",
    "iupacName": "Gold Compound",
    "archetype": "PRECIOUS_CATALYST",
    "structuredEffects": [
      {
        "effectId": "B02_EFF_90",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "RECOVER_RESOURCE",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Phục hồi 1 Mana xúc tác."
      }
    ]
  },
  {
    "id": "card_b02_091_sc_91",
    "name": "Scandi — Hộ Vệ Đa Hóa Trị (Ký hiệu Sc2O3)",
    "name_en": "Scandium — Multivalent Hộ Vệ (Sc2O3)",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "TERRA",
    "manaCost": 2,
    "level": 3,
    "atk": 1960,
    "def": 1540,
    "chemicalFormula": "Sc2O3",
    "atomicNumber": 21,
    "effectCode": "ELEM_B02_SC_VALENCE_91",
    "effectText": "Một lần mỗi lượt: Có thể hoán đổi chỉ số ATK và DEF cơ bản đến hết lượt (chuyển đổi số oxi hóa).",
    "scientificLore": "Scandi (Sc, Z=21) là kim loại chuyển tiếp phân lớp d/f với nhiều mức oxi hóa bền vững trong hợp chất Sc2O3.",
    "relatedEquation": "4Sc + 3O₂ → 2Sc₂O₃",
    "iupacName": "Scandium Compound",
    "archetype": "TRANSITION_FORGE",
    "structuredEffects": [
      {
        "effectId": "B02_EFF_91",
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
        "description": "Tăng 300 ATK kích hoạt hóa trị."
      }
    ]
  },
  {
    "id": "card_b02_092_ti_92",
    "name": "Titan — Hộ Vệ Đa Hóa Trị (Ký hiệu TiO2)",
    "name_en": "Titanium — Multivalent Hộ Vệ (TiO2)",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "TERRA",
    "manaCost": 3,
    "level": 4,
    "atk": 2240,
    "def": 1780,
    "chemicalFormula": "TiO2",
    "atomicNumber": 22,
    "effectCode": "ELEM_B02_TI_VALENCE_92",
    "effectText": "Một lần mỗi lượt: Có thể hoán đổi chỉ số ATK và DEF cơ bản đến hết lượt (chuyển đổi số oxi hóa).",
    "scientificLore": "Titan (Ti, Z=22) là kim loại chuyển tiếp phân lớp d/f với nhiều mức oxi hóa bền vững trong hợp chất TiO2.",
    "relatedEquation": "Ti + O₂ → TiO₂",
    "iupacName": "Titanium Compound",
    "archetype": "TRANSITION_FORGE",
    "structuredEffects": [
      {
        "effectId": "B02_EFF_92",
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
        "description": "Tăng 300 ATK kích hoạt hóa trị."
      }
    ]
  },
  {
    "id": "card_b02_093_v_93",
    "name": "Vanadi — Hộ Vệ Đa Hóa Trị (Ký hiệu V2O5)",
    "name_en": "Vanadium — Multivalent Hộ Vệ (V2O5)",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "PYRO",
    "manaCost": 4,
    "level": 5,
    "atk": 2200,
    "def": 2020,
    "chemicalFormula": "V2O5",
    "atomicNumber": 23,
    "effectCode": "ELEM_B02_V_VALENCE_93",
    "effectText": "Một lần mỗi lượt: Có thể hoán đổi chỉ số ATK và DEF cơ bản đến hết lượt (chuyển đổi số oxi hóa).",
    "scientificLore": "Vanadi (V, Z=23) là kim loại chuyển tiếp phân lớp d/f với nhiều mức oxi hóa bền vững trong hợp chất V2O5.",
    "relatedEquation": "4V + 5O₂ → 2V₂O₅",
    "iupacName": "Vanadium Compound",
    "archetype": "TRANSITION_FORGE",
    "structuredEffects": [
      {
        "effectId": "B02_EFF_93",
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
        "description": "Tăng 300 ATK kích hoạt hóa trị."
      }
    ]
  },
  {
    "id": "card_b02_094_cr_94",
    "name": "Crom — Hộ Vệ Đa Hóa Trị (Ký hiệu Cr2O3)",
    "name_en": "Chromium — Multivalent Hộ Vệ (Cr2O3)",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "PYRO",
    "manaCost": 5,
    "level": 6,
    "atk": 2480,
    "def": 2260,
    "chemicalFormula": "Cr2O3",
    "atomicNumber": 24,
    "effectCode": "ELEM_B02_CR_VALENCE_94",
    "effectText": "Một lần mỗi lượt: Có thể hoán đổi chỉ số ATK và DEF cơ bản đến hết lượt (chuyển đổi số oxi hóa).",
    "scientificLore": "Crom (Cr, Z=24) là kim loại chuyển tiếp phân lớp d/f với nhiều mức oxi hóa bền vững trong hợp chất Cr2O3.",
    "relatedEquation": "4Cr + 3O₂ → 2Cr₂O₃",
    "iupacName": "Chromium Compound",
    "archetype": "TRANSITION_FORGE",
    "structuredEffects": [
      {
        "effectId": "B02_EFF_94",
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
        "description": "Tăng 300 ATK kích hoạt hóa trị."
      }
    ]
  },
  {
    "id": "card_b02_095_mn_95",
    "name": "Mangan — Hộ Vệ Đa Hóa Trị (Ký hiệu MnO2)",
    "name_en": "Manganese — Multivalent Hộ Vệ (MnO2)",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "ACID_DARK",
    "manaCost": 6,
    "level": 7,
    "atk": 2760,
    "def": 2500,
    "chemicalFormula": "MnO2",
    "atomicNumber": 25,
    "effectCode": "ELEM_B02_MN_VALENCE_95",
    "effectText": "Một lần mỗi lượt: Có thể hoán đổi chỉ số ATK và DEF cơ bản đến hết lượt (chuyển đổi số oxi hóa).",
    "scientificLore": "Mangan (Mn, Z=25) là kim loại chuyển tiếp phân lớp d/f với nhiều mức oxi hóa bền vững trong hợp chất MnO2.",
    "relatedEquation": "Mn + O₂ → MnO₂",
    "iupacName": "Manganese Compound",
    "archetype": "TRANSITION_FORGE",
    "structuredEffects": [
      {
        "effectId": "B02_EFF_95",
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
        "description": "Tăng 300 ATK kích hoạt hóa trị."
      }
    ]
  },
  {
    "id": "card_b02_096_fe_96",
    "name": "Sắt — Hộ Vệ Đa Hóa Trị (Ký hiệu Fe3O4)",
    "name_en": "Iron — Multivalent Hộ Vệ (Fe3O4)",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "ULTRA_RARE",
    "attribute": "TERRA",
    "manaCost": 7,
    "level": 8,
    "atk": 3040,
    "def": 2440,
    "chemicalFormula": "Fe3O4",
    "atomicNumber": 26,
    "effectCode": "ELEM_B02_FE_VALENCE_96",
    "effectText": "Một lần mỗi lượt: Có thể hoán đổi chỉ số ATK và DEF cơ bản đến hết lượt (chuyển đổi số oxi hóa).",
    "scientificLore": "Sắt (Fe, Z=26) là kim loại chuyển tiếp phân lớp d/f với nhiều mức oxi hóa bền vững trong hợp chất Fe3O4.",
    "relatedEquation": "3Fe + 2O₂ → Fe₃O₄",
    "iupacName": "Iron Compound",
    "archetype": "TRANSITION_FORGE",
    "structuredEffects": [
      {
        "effectId": "B02_EFF_96",
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
        "description": "Tăng 300 ATK kích hoạt hóa trị."
      }
    ]
  },
  {
    "id": "card_b02_097_co_97",
    "name": "Coban — Hộ Vệ Đa Hóa Trị (Ký hiệu CoCl2)",
    "name_en": "Cobalt — Multivalent Hộ Vệ (CoCl2)",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SECRET_RARE",
    "attribute": "ELECTRO",
    "manaCost": 2,
    "level": 3,
    "atk": 1800,
    "def": 1600,
    "chemicalFormula": "CoCl2",
    "atomicNumber": 27,
    "effectCode": "ELEM_B02_CO_VALENCE_97",
    "effectText": "Một lần mỗi lượt: Có thể hoán đổi chỉ số ATK và DEF cơ bản đến hết lượt (chuyển đổi số oxi hóa).",
    "scientificLore": "Coban (Co, Z=27) là kim loại chuyển tiếp phân lớp d/f với nhiều mức oxi hóa bền vững trong hợp chất CoCl2.",
    "relatedEquation": "Co + Cl₂ → CoCl₂",
    "iupacName": "Cobalt Compound",
    "archetype": "TRANSITION_FORGE",
    "structuredEffects": [
      {
        "effectId": "B02_EFF_97",
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
        "description": "Tăng 300 ATK kích hoạt hóa trị."
      }
    ]
  },
  {
    "id": "card_b02_098_ni_98",
    "name": "Niken — Hộ Vệ Đa Hóa Trị (Ký hiệu NiO)",
    "name_en": "Nickel — Multivalent Hộ Vệ (NiO)",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "ELECTRO",
    "manaCost": 3,
    "level": 4,
    "atk": 2080,
    "def": 1840,
    "chemicalFormula": "NiO",
    "atomicNumber": 28,
    "effectCode": "ELEM_B02_NI_VALENCE_98",
    "effectText": "Một lần mỗi lượt: Có thể hoán đổi chỉ số ATK và DEF cơ bản đến hết lượt (chuyển đổi số oxi hóa).",
    "scientificLore": "Niken (Ni, Z=28) là kim loại chuyển tiếp phân lớp d/f với nhiều mức oxi hóa bền vững trong hợp chất NiO.",
    "relatedEquation": "2Ni + O₂ → 2NiO",
    "iupacName": "Nickel Compound",
    "archetype": "TRANSITION_FORGE",
    "structuredEffects": [
      {
        "effectId": "B02_EFF_98",
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
        "description": "Tăng 300 ATK kích hoạt hóa trị."
      }
    ]
  },
  {
    "id": "card_b02_099_cu_99",
    "name": "Đồng — Hộ Vệ Đa Hóa Trị (Ký hiệu CuSO4)",
    "name_en": "Copper — Multivalent Hộ Vệ (CuSO4)",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "ELECTRO",
    "manaCost": 4,
    "level": 5,
    "atk": 2360,
    "def": 2080,
    "chemicalFormula": "CuSO4",
    "atomicNumber": 29,
    "effectCode": "ELEM_B02_CU_VALENCE_99",
    "effectText": "Một lần mỗi lượt: Có thể hoán đổi chỉ số ATK và DEF cơ bản đến hết lượt (chuyển đổi số oxi hóa).",
    "scientificLore": "Đồng (Cu, Z=29) là kim loại chuyển tiếp phân lớp d/f với nhiều mức oxi hóa bền vững trong hợp chất CuSO4.",
    "relatedEquation": "Cu + 2H₂SO₄ → CuSO₄ + SO₂ + 2H₂O",
    "iupacName": "Copper Compound",
    "archetype": "TRANSITION_FORGE",
    "structuredEffects": [
      {
        "effectId": "B02_EFF_99",
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
        "description": "Tăng 300 ATK kích hoạt hóa trị."
      }
    ]
  },
  {
    "id": "card_b02_100_zn_100",
    "name": "Kẽm — Hộ Vệ Đa Hóa Trị (Ký hiệu ZnO)",
    "name_en": "Zinc — Multivalent Hộ Vệ (ZnO)",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "TERRA",
    "manaCost": 5,
    "level": 6,
    "atk": 2640,
    "def": 2320,
    "chemicalFormula": "ZnO",
    "atomicNumber": 30,
    "effectCode": "ELEM_B02_ZN_VALENCE_100",
    "effectText": "Một lần mỗi lượt: Có thể hoán đổi chỉ số ATK và DEF cơ bản đến hết lượt (chuyển đổi số oxi hóa).",
    "scientificLore": "Kẽm (Zn, Z=30) là kim loại chuyển tiếp phân lớp d/f với nhiều mức oxi hóa bền vững trong hợp chất ZnO.",
    "relatedEquation": "2Zn + O₂ → 2ZnO",
    "iupacName": "Zinc Compound",
    "archetype": "TRANSITION_FORGE",
    "structuredEffects": [
      {
        "effectId": "B02_EFF_100",
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
        "description": "Tăng 300 ATK kích hoạt hóa trị."
      }
    ]
  }
];
