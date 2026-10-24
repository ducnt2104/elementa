// src/data/cards/batches/batch_26_monsters_main_actinides_nuclear.ts
// Batch 26: Actinides & Nuclear Isotopes (200 cards)
// Automatically generated and validated for ELEMENTA Tactical TCG

import { PlayableCardDef } from '../../../domain/cardGameTypes';

export const BATCH_26_CARDS: PlayableCardDef[] = [
  {
    "id": "card_b26_001_ac_1",
    "name": "Actini — Chúa Tể Phân Hạch (Biến Thể 1)",
    "name_en": "Actinium — Chúa Tể Phân Hạch Mod-1",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "ACID_DARK",
    "manaCost": 3,
    "level": 4,
    "atk": 2540,
    "def": 2160,
    "chemicalFormula": "Ac2O3",
    "atomicNumber": 89,
    "effectCode": "ELEM_B26_AC_ACT_1",
    "effectText": "Khi tiêu diệt quái thú đối phương: Bức xạ hạt nhân thiêu đốt 300 LP đối thủ và làm giảm 200 ATK của toàn bộ quái thú đối phương.",
    "scientificLore": "Actini (Z=89) thuộc họ Actini, hạt nhân phóng xạ không bền có chu kỳ bán rã đặc trưng, giải phóng năng lượng liên kết hạt nhân cực lớn.",
    "relatedEquation": "2Ac + 3/2O₂ → Ac₂O₃",
    "iupacName": "Actinium",
    "archetype": "ACTINIDE_FISSION",
    "structuredEffects": [
      {
        "effectId": "B26_EFF_1",
        "activationWindow": "ON_DESTROY_MONSTER",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 350
            }
          }
        ],
        "description": "Bức xạ phân hạch thiêu đốt LP đối thủ."
      }
    ]
  },
  {
    "id": "card_b26_002_th_2",
    "name": "Thori — Chúa Tể Phân Hạch (Biến Thể 1)",
    "name_en": "Thorium — Chúa Tể Phân Hạch Mod-1",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "PYRO",
    "manaCost": 4,
    "level": 5,
    "atk": 2795,
    "def": 2350,
    "chemicalFormula": "ThO2",
    "atomicNumber": 90,
    "effectCode": "ELEM_B26_TH_ACT_2",
    "effectText": "Khi tiêu diệt quái thú đối phương: Bức xạ hạt nhân thiêu đốt 380 LP đối thủ và làm giảm 200 ATK của toàn bộ quái thú đối phương.",
    "scientificLore": "Thori (Z=90) thuộc họ Actini, hạt nhân phóng xạ không bền có chu kỳ bán rã đặc trưng, giải phóng năng lượng liên kết hạt nhân cực lớn.",
    "relatedEquation": "Th + O₂ → ThO₂",
    "iupacName": "Thorium",
    "archetype": "ACTINIDE_FISSION",
    "structuredEffects": [
      {
        "effectId": "B26_EFF_2",
        "activationWindow": "ON_DESTROY_MONSTER",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 350
            }
          }
        ],
        "description": "Bức xạ phân hạch thiêu đốt LP đối thủ."
      }
    ]
  },
  {
    "id": "card_b26_003_pa_3",
    "name": "Protactini — Chúa Tể Phân Hạch (Biến Thể 1)",
    "name_en": "Protactinium — Chúa Tể Phân Hạch Mod-1",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "ACID_DARK",
    "manaCost": 5,
    "level": 6,
    "atk": 3050,
    "def": 2540,
    "chemicalFormula": "Pa2O5",
    "atomicNumber": 91,
    "effectCode": "ELEM_B26_PA_ACT_3",
    "effectText": "Khi tiêu diệt quái thú đối phương: Bức xạ hạt nhân thiêu đốt 460 LP đối thủ và làm giảm 200 ATK của toàn bộ quái thú đối phương.",
    "scientificLore": "Protactini (Z=91) thuộc họ Actini, hạt nhân phóng xạ không bền có chu kỳ bán rã đặc trưng, giải phóng năng lượng liên kết hạt nhân cực lớn.",
    "relatedEquation": "2Pa + 5/2O₂ → Pa₂O₅",
    "iupacName": "Protactinium",
    "archetype": "ACTINIDE_FISSION",
    "structuredEffects": [
      {
        "effectId": "B26_EFF_3",
        "activationWindow": "ON_DESTROY_MONSTER",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 350
            }
          }
        ],
        "description": "Bức xạ phân hạch thiêu đốt LP đối thủ."
      }
    ]
  },
  {
    "id": "card_b26_004_u_4",
    "name": "Urani — Chúa Tể Phân Hạch (Biến Thể 1)",
    "name_en": "Uranium — Chúa Tể Phân Hạch Mod-1",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "ACID_DARK",
    "manaCost": 5,
    "level": 7,
    "atk": 3305,
    "def": 2730,
    "chemicalFormula": "UO2(NO3)2",
    "atomicNumber": 92,
    "effectCode": "ELEM_B26_U_ACT_4",
    "effectText": "Khi tiêu diệt quái thú đối phương: Bức xạ hạt nhân thiêu đốt 540 LP đối thủ và làm giảm 200 ATK của toàn bộ quái thú đối phương.",
    "scientificLore": "Urani (Z=92) thuộc họ Actini, hạt nhân phóng xạ không bền có chu kỳ bán rã đặc trưng, giải phóng năng lượng liên kết hạt nhân cực lớn.",
    "relatedEquation": "U + 4HNO₃ → UO₂(NO₃)₂ + 2NO₂ + 2H₂O",
    "iupacName": "Uranium",
    "archetype": "ACTINIDE_FISSION",
    "structuredEffects": [
      {
        "effectId": "B26_EFF_4",
        "activationWindow": "ON_DESTROY_MONSTER",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 350
            }
          }
        ],
        "description": "Bức xạ phân hạch thiêu đốt LP đối thủ."
      }
    ]
  },
  {
    "id": "card_b26_005_np_5",
    "name": "Neptuni — Chúa Tể Phân Hạch (Biến Thể 1)",
    "name_en": "Neptunium — Chúa Tể Phân Hạch Mod-1",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "ACID_DARK",
    "manaCost": 6,
    "level": 8,
    "atk": 3560,
    "def": 2920,
    "chemicalFormula": "NpO2",
    "atomicNumber": 93,
    "effectCode": "ELEM_B26_NP_ACT_5",
    "effectText": "Khi tiêu diệt quái thú đối phương: Bức xạ hạt nhân thiêu đốt 300 LP đối thủ và làm giảm 200 ATK của toàn bộ quái thú đối phương.",
    "scientificLore": "Neptuni (Z=93) thuộc họ Actini, hạt nhân phóng xạ không bền có chu kỳ bán rã đặc trưng, giải phóng năng lượng liên kết hạt nhân cực lớn.",
    "relatedEquation": "Np + O₂ → NpO₂",
    "iupacName": "Neptunium",
    "archetype": "ACTINIDE_FISSION",
    "structuredEffects": [
      {
        "effectId": "B26_EFF_5",
        "activationWindow": "ON_DESTROY_MONSTER",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 350
            }
          }
        ],
        "description": "Bức xạ phân hạch thiêu đốt LP đối thủ."
      }
    ]
  },
  {
    "id": "card_b26_006_pu_6",
    "name": "Plutoni — Chúa Tể Phân Hạch (Biến Thể 1)",
    "name_en": "Plutonium — Chúa Tể Phân Hạch Mod-1",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "ULTRA_RARE",
    "attribute": "PYRO",
    "manaCost": 3,
    "level": 4,
    "atk": 2540,
    "def": 2160,
    "chemicalFormula": "PuO2",
    "atomicNumber": 94,
    "effectCode": "ELEM_B26_PU_ACT_6",
    "effectText": "Khi tiêu diệt quái thú đối phương: Bức xạ hạt nhân thiêu đốt 380 LP đối thủ và làm giảm 200 ATK của toàn bộ quái thú đối phương.",
    "scientificLore": "Plutoni (Z=94) thuộc họ Actini, hạt nhân phóng xạ không bền có chu kỳ bán rã đặc trưng, giải phóng năng lượng liên kết hạt nhân cực lớn.",
    "relatedEquation": "Pu + O₂ → PuO₂",
    "iupacName": "Plutonium",
    "archetype": "ACTINIDE_FISSION",
    "structuredEffects": [
      {
        "effectId": "B26_EFF_6",
        "activationWindow": "ON_DESTROY_MONSTER",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 350
            }
          }
        ],
        "description": "Bức xạ phân hạch thiêu đốt LP đối thủ."
      }
    ]
  },
  {
    "id": "card_b26_007_am_7",
    "name": "Americi — Chúa Tể Phân Hạch (Biến Thể 1)",
    "name_en": "Americium — Chúa Tể Phân Hạch Mod-1",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SECRET_RARE",
    "attribute": "PYRO",
    "manaCost": 4,
    "level": 5,
    "atk": 2795,
    "def": 2350,
    "chemicalFormula": "AmO2",
    "atomicNumber": 95,
    "effectCode": "ELEM_B26_AM_ACT_7",
    "effectText": "Khi tiêu diệt quái thú đối phương: Bức xạ hạt nhân thiêu đốt 460 LP đối thủ và làm giảm 200 ATK của toàn bộ quái thú đối phương.",
    "scientificLore": "Americi (Z=95) thuộc họ Actini, hạt nhân phóng xạ không bền có chu kỳ bán rã đặc trưng, giải phóng năng lượng liên kết hạt nhân cực lớn.",
    "relatedEquation": "Am + O₂ → AmO₂",
    "iupacName": "Americium",
    "archetype": "ACTINIDE_FISSION",
    "structuredEffects": [
      {
        "effectId": "B26_EFF_7",
        "activationWindow": "ON_DESTROY_MONSTER",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 350
            }
          }
        ],
        "description": "Bức xạ phân hạch thiêu đốt LP đối thủ."
      }
    ]
  },
  {
    "id": "card_b26_008_cm_8",
    "name": "Curi — Chúa Tể Phân Hạch (Biến Thể 1)",
    "name_en": "Curium — Chúa Tể Phân Hạch Mod-1",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "ACID_DARK",
    "manaCost": 5,
    "level": 6,
    "atk": 3050,
    "def": 2540,
    "chemicalFormula": "Cm2O3",
    "atomicNumber": 96,
    "effectCode": "ELEM_B26_CM_ACT_8",
    "effectText": "Khi tiêu diệt quái thú đối phương: Bức xạ hạt nhân thiêu đốt 540 LP đối thủ và làm giảm 200 ATK của toàn bộ quái thú đối phương.",
    "scientificLore": "Curi (Z=96) thuộc họ Actini, hạt nhân phóng xạ không bền có chu kỳ bán rã đặc trưng, giải phóng năng lượng liên kết hạt nhân cực lớn.",
    "relatedEquation": "2Cm + 3/2O₂ → Cm₂O₃",
    "iupacName": "Curium",
    "archetype": "ACTINIDE_FISSION",
    "structuredEffects": [
      {
        "effectId": "B26_EFF_8",
        "activationWindow": "ON_DESTROY_MONSTER",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 350
            }
          }
        ],
        "description": "Bức xạ phân hạch thiêu đốt LP đối thủ."
      }
    ]
  },
  {
    "id": "card_b26_009_bk_9",
    "name": "Berkeli — Chúa Tể Phân Hạch (Biến Thể 1)",
    "name_en": "Berkelium — Chúa Tể Phân Hạch Mod-1",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "ACID_DARK",
    "manaCost": 5,
    "level": 7,
    "atk": 3305,
    "def": 2730,
    "chemicalFormula": "BkO2",
    "atomicNumber": 97,
    "effectCode": "ELEM_B26_BK_ACT_9",
    "effectText": "Khi tiêu diệt quái thú đối phương: Bức xạ hạt nhân thiêu đốt 300 LP đối thủ và làm giảm 200 ATK của toàn bộ quái thú đối phương.",
    "scientificLore": "Berkeli (Z=97) thuộc họ Actini, hạt nhân phóng xạ không bền có chu kỳ bán rã đặc trưng, giải phóng năng lượng liên kết hạt nhân cực lớn.",
    "relatedEquation": "Bk + O₂ → BkO₂",
    "iupacName": "Berkelium",
    "archetype": "ACTINIDE_FISSION",
    "structuredEffects": [
      {
        "effectId": "B26_EFF_9",
        "activationWindow": "ON_DESTROY_MONSTER",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 350
            }
          }
        ],
        "description": "Bức xạ phân hạch thiêu đốt LP đối thủ."
      }
    ]
  },
  {
    "id": "card_b26_010_cf_10",
    "name": "Californi — Chúa Tể Phân Hạch (Biến Thể 1)",
    "name_en": "Californium — Chúa Tể Phân Hạch Mod-1",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "NOBLE_VOID",
    "manaCost": 6,
    "level": 8,
    "atk": 3560,
    "def": 2920,
    "chemicalFormula": "Cf2O3",
    "atomicNumber": 98,
    "effectCode": "ELEM_B26_CF_ACT_10",
    "effectText": "Khi tiêu diệt quái thú đối phương: Bức xạ hạt nhân thiêu đốt 380 LP đối thủ và làm giảm 200 ATK của toàn bộ quái thú đối phương.",
    "scientificLore": "Californi (Z=98) thuộc họ Actini, hạt nhân phóng xạ không bền có chu kỳ bán rã đặc trưng, giải phóng năng lượng liên kết hạt nhân cực lớn.",
    "relatedEquation": "2Cf + 3/2O₂ → Cf₂O₃",
    "iupacName": "Californium",
    "archetype": "ACTINIDE_FISSION",
    "structuredEffects": [
      {
        "effectId": "B26_EFF_10",
        "activationWindow": "ON_DESTROY_MONSTER",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 350
            }
          }
        ],
        "description": "Bức xạ phân hạch thiêu đốt LP đối thủ."
      }
    ]
  },
  {
    "id": "card_b26_011_ac_11",
    "name": "Actini — Hiệp Sĩ Nơ-tron (Biến Thể 2)",
    "name_en": "Actinium — Hiệp Sĩ Nơ-tron Mod-2",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "ACID_DARK",
    "manaCost": 3,
    "level": 4,
    "atk": 2540,
    "def": 2160,
    "chemicalFormula": "Ac2O3",
    "atomicNumber": 89,
    "effectCode": "ELEM_B26_AC_ACT_11",
    "effectText": "Khi tiêu diệt quái thú đối phương: Bức xạ hạt nhân thiêu đốt 460 LP đối thủ và làm giảm 200 ATK của toàn bộ quái thú đối phương.",
    "scientificLore": "Actini (Z=89) thuộc họ Actini, hạt nhân phóng xạ không bền có chu kỳ bán rã đặc trưng, giải phóng năng lượng liên kết hạt nhân cực lớn.",
    "relatedEquation": "2Ac + 3/2O₂ → Ac₂O₃",
    "iupacName": "Actinium",
    "archetype": "ACTINIDE_FISSION",
    "structuredEffects": [
      {
        "effectId": "B26_EFF_11",
        "activationWindow": "ON_DESTROY_MONSTER",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 350
            }
          }
        ],
        "description": "Bức xạ phân hạch thiêu đốt LP đối thủ."
      }
    ]
  },
  {
    "id": "card_b26_012_th_12",
    "name": "Thori — Hiệp Sĩ Nơ-tron (Biến Thể 2)",
    "name_en": "Thorium — Hiệp Sĩ Nơ-tron Mod-2",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "PYRO",
    "manaCost": 4,
    "level": 5,
    "atk": 2795,
    "def": 2350,
    "chemicalFormula": "ThO2",
    "atomicNumber": 90,
    "effectCode": "ELEM_B26_TH_ACT_12",
    "effectText": "Khi tiêu diệt quái thú đối phương: Bức xạ hạt nhân thiêu đốt 540 LP đối thủ và làm giảm 200 ATK của toàn bộ quái thú đối phương.",
    "scientificLore": "Thori (Z=90) thuộc họ Actini, hạt nhân phóng xạ không bền có chu kỳ bán rã đặc trưng, giải phóng năng lượng liên kết hạt nhân cực lớn.",
    "relatedEquation": "Th + O₂ → ThO₂",
    "iupacName": "Thorium",
    "archetype": "ACTINIDE_FISSION",
    "structuredEffects": [
      {
        "effectId": "B26_EFF_12",
        "activationWindow": "ON_DESTROY_MONSTER",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 350
            }
          }
        ],
        "description": "Bức xạ phân hạch thiêu đốt LP đối thủ."
      }
    ]
  },
  {
    "id": "card_b26_013_pa_13",
    "name": "Protactini — Hiệp Sĩ Nơ-tron (Biến Thể 2)",
    "name_en": "Protactinium — Hiệp Sĩ Nơ-tron Mod-2",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "ACID_DARK",
    "manaCost": 5,
    "level": 6,
    "atk": 3050,
    "def": 2540,
    "chemicalFormula": "Pa2O5",
    "atomicNumber": 91,
    "effectCode": "ELEM_B26_PA_ACT_13",
    "effectText": "Khi tiêu diệt quái thú đối phương: Bức xạ hạt nhân thiêu đốt 300 LP đối thủ và làm giảm 200 ATK của toàn bộ quái thú đối phương.",
    "scientificLore": "Protactini (Z=91) thuộc họ Actini, hạt nhân phóng xạ không bền có chu kỳ bán rã đặc trưng, giải phóng năng lượng liên kết hạt nhân cực lớn.",
    "relatedEquation": "2Pa + 5/2O₂ → Pa₂O₅",
    "iupacName": "Protactinium",
    "archetype": "ACTINIDE_FISSION",
    "structuredEffects": [
      {
        "effectId": "B26_EFF_13",
        "activationWindow": "ON_DESTROY_MONSTER",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 350
            }
          }
        ],
        "description": "Bức xạ phân hạch thiêu đốt LP đối thủ."
      }
    ]
  },
  {
    "id": "card_b26_014_u_14",
    "name": "Urani — Hiệp Sĩ Nơ-tron (Biến Thể 2)",
    "name_en": "Uranium — Hiệp Sĩ Nơ-tron Mod-2",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "ACID_DARK",
    "manaCost": 5,
    "level": 7,
    "atk": 3305,
    "def": 2730,
    "chemicalFormula": "UO2(NO3)2",
    "atomicNumber": 92,
    "effectCode": "ELEM_B26_U_ACT_14",
    "effectText": "Khi tiêu diệt quái thú đối phương: Bức xạ hạt nhân thiêu đốt 380 LP đối thủ và làm giảm 200 ATK của toàn bộ quái thú đối phương.",
    "scientificLore": "Urani (Z=92) thuộc họ Actini, hạt nhân phóng xạ không bền có chu kỳ bán rã đặc trưng, giải phóng năng lượng liên kết hạt nhân cực lớn.",
    "relatedEquation": "U + 4HNO₃ → UO₂(NO₃)₂ + 2NO₂ + 2H₂O",
    "iupacName": "Uranium",
    "archetype": "ACTINIDE_FISSION",
    "structuredEffects": [
      {
        "effectId": "B26_EFF_14",
        "activationWindow": "ON_DESTROY_MONSTER",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 350
            }
          }
        ],
        "description": "Bức xạ phân hạch thiêu đốt LP đối thủ."
      }
    ]
  },
  {
    "id": "card_b26_015_np_15",
    "name": "Neptuni — Hiệp Sĩ Nơ-tron (Biến Thể 2)",
    "name_en": "Neptunium — Hiệp Sĩ Nơ-tron Mod-2",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "ULTRA_RARE",
    "attribute": "ACID_DARK",
    "manaCost": 6,
    "level": 8,
    "atk": 3560,
    "def": 2920,
    "chemicalFormula": "NpO2",
    "atomicNumber": 93,
    "effectCode": "ELEM_B26_NP_ACT_15",
    "effectText": "Khi tiêu diệt quái thú đối phương: Bức xạ hạt nhân thiêu đốt 460 LP đối thủ và làm giảm 200 ATK của toàn bộ quái thú đối phương.",
    "scientificLore": "Neptuni (Z=93) thuộc họ Actini, hạt nhân phóng xạ không bền có chu kỳ bán rã đặc trưng, giải phóng năng lượng liên kết hạt nhân cực lớn.",
    "relatedEquation": "Np + O₂ → NpO₂",
    "iupacName": "Neptunium",
    "archetype": "ACTINIDE_FISSION",
    "structuredEffects": [
      {
        "effectId": "B26_EFF_15",
        "activationWindow": "ON_DESTROY_MONSTER",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 350
            }
          }
        ],
        "description": "Bức xạ phân hạch thiêu đốt LP đối thủ."
      }
    ]
  },
  {
    "id": "card_b26_016_pu_16",
    "name": "Plutoni — Hiệp Sĩ Nơ-tron (Biến Thể 2)",
    "name_en": "Plutonium — Hiệp Sĩ Nơ-tron Mod-2",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SECRET_RARE",
    "attribute": "PYRO",
    "manaCost": 3,
    "level": 4,
    "atk": 2540,
    "def": 2160,
    "chemicalFormula": "PuO2",
    "atomicNumber": 94,
    "effectCode": "ELEM_B26_PU_ACT_16",
    "effectText": "Khi tiêu diệt quái thú đối phương: Bức xạ hạt nhân thiêu đốt 540 LP đối thủ và làm giảm 200 ATK của toàn bộ quái thú đối phương.",
    "scientificLore": "Plutoni (Z=94) thuộc họ Actini, hạt nhân phóng xạ không bền có chu kỳ bán rã đặc trưng, giải phóng năng lượng liên kết hạt nhân cực lớn.",
    "relatedEquation": "Pu + O₂ → PuO₂",
    "iupacName": "Plutonium",
    "archetype": "ACTINIDE_FISSION",
    "structuredEffects": [
      {
        "effectId": "B26_EFF_16",
        "activationWindow": "ON_DESTROY_MONSTER",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 350
            }
          }
        ],
        "description": "Bức xạ phân hạch thiêu đốt LP đối thủ."
      }
    ]
  },
  {
    "id": "card_b26_017_am_17",
    "name": "Americi — Hiệp Sĩ Nơ-tron (Biến Thể 2)",
    "name_en": "Americium — Hiệp Sĩ Nơ-tron Mod-2",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "PYRO",
    "manaCost": 4,
    "level": 5,
    "atk": 2795,
    "def": 2350,
    "chemicalFormula": "AmO2",
    "atomicNumber": 95,
    "effectCode": "ELEM_B26_AM_ACT_17",
    "effectText": "Khi tiêu diệt quái thú đối phương: Bức xạ hạt nhân thiêu đốt 300 LP đối thủ và làm giảm 200 ATK của toàn bộ quái thú đối phương.",
    "scientificLore": "Americi (Z=95) thuộc họ Actini, hạt nhân phóng xạ không bền có chu kỳ bán rã đặc trưng, giải phóng năng lượng liên kết hạt nhân cực lớn.",
    "relatedEquation": "Am + O₂ → AmO₂",
    "iupacName": "Americium",
    "archetype": "ACTINIDE_FISSION",
    "structuredEffects": [
      {
        "effectId": "B26_EFF_17",
        "activationWindow": "ON_DESTROY_MONSTER",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 350
            }
          }
        ],
        "description": "Bức xạ phân hạch thiêu đốt LP đối thủ."
      }
    ]
  },
  {
    "id": "card_b26_018_cm_18",
    "name": "Curi — Hiệp Sĩ Nơ-tron (Biến Thể 2)",
    "name_en": "Curium — Hiệp Sĩ Nơ-tron Mod-2",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "ACID_DARK",
    "manaCost": 5,
    "level": 6,
    "atk": 3050,
    "def": 2540,
    "chemicalFormula": "Cm2O3",
    "atomicNumber": 96,
    "effectCode": "ELEM_B26_CM_ACT_18",
    "effectText": "Khi tiêu diệt quái thú đối phương: Bức xạ hạt nhân thiêu đốt 380 LP đối thủ và làm giảm 200 ATK của toàn bộ quái thú đối phương.",
    "scientificLore": "Curi (Z=96) thuộc họ Actini, hạt nhân phóng xạ không bền có chu kỳ bán rã đặc trưng, giải phóng năng lượng liên kết hạt nhân cực lớn.",
    "relatedEquation": "2Cm + 3/2O₂ → Cm₂O₃",
    "iupacName": "Curium",
    "archetype": "ACTINIDE_FISSION",
    "structuredEffects": [
      {
        "effectId": "B26_EFF_18",
        "activationWindow": "ON_DESTROY_MONSTER",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 350
            }
          }
        ],
        "description": "Bức xạ phân hạch thiêu đốt LP đối thủ."
      }
    ]
  },
  {
    "id": "card_b26_019_bk_19",
    "name": "Berkeli — Hiệp Sĩ Nơ-tron (Biến Thể 2)",
    "name_en": "Berkelium — Hiệp Sĩ Nơ-tron Mod-2",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "ACID_DARK",
    "manaCost": 5,
    "level": 7,
    "atk": 3305,
    "def": 2730,
    "chemicalFormula": "BkO2",
    "atomicNumber": 97,
    "effectCode": "ELEM_B26_BK_ACT_19",
    "effectText": "Khi tiêu diệt quái thú đối phương: Bức xạ hạt nhân thiêu đốt 460 LP đối thủ và làm giảm 200 ATK của toàn bộ quái thú đối phương.",
    "scientificLore": "Berkeli (Z=97) thuộc họ Actini, hạt nhân phóng xạ không bền có chu kỳ bán rã đặc trưng, giải phóng năng lượng liên kết hạt nhân cực lớn.",
    "relatedEquation": "Bk + O₂ → BkO₂",
    "iupacName": "Berkelium",
    "archetype": "ACTINIDE_FISSION",
    "structuredEffects": [
      {
        "effectId": "B26_EFF_19",
        "activationWindow": "ON_DESTROY_MONSTER",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 350
            }
          }
        ],
        "description": "Bức xạ phân hạch thiêu đốt LP đối thủ."
      }
    ]
  },
  {
    "id": "card_b26_020_cf_20",
    "name": "Californi — Hiệp Sĩ Nơ-tron (Biến Thể 2)",
    "name_en": "Californium — Hiệp Sĩ Nơ-tron Mod-2",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "NOBLE_VOID",
    "manaCost": 6,
    "level": 8,
    "atk": 3560,
    "def": 2920,
    "chemicalFormula": "Cf2O3",
    "atomicNumber": 98,
    "effectCode": "ELEM_B26_CF_ACT_20",
    "effectText": "Khi tiêu diệt quái thú đối phương: Bức xạ hạt nhân thiêu đốt 540 LP đối thủ và làm giảm 200 ATK của toàn bộ quái thú đối phương.",
    "scientificLore": "Californi (Z=98) thuộc họ Actini, hạt nhân phóng xạ không bền có chu kỳ bán rã đặc trưng, giải phóng năng lượng liên kết hạt nhân cực lớn.",
    "relatedEquation": "2Cf + 3/2O₂ → Cf₂O₃",
    "iupacName": "Californium",
    "archetype": "ACTINIDE_FISSION",
    "structuredEffects": [
      {
        "effectId": "B26_EFF_20",
        "activationWindow": "ON_DESTROY_MONSTER",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 350
            }
          }
        ],
        "description": "Bức xạ phân hạch thiêu đốt LP đối thủ."
      }
    ]
  },
  {
    "id": "card_b26_021_ac_21",
    "name": "Actini — Đại Bác Bức Xạ Alpha (Biến Thể 3)",
    "name_en": "Actinium — Đại Bác Bức Xạ Alpha Mod-3",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "ACID_DARK",
    "manaCost": 3,
    "level": 4,
    "atk": 2540,
    "def": 2160,
    "chemicalFormula": "Ac2O3",
    "atomicNumber": 89,
    "effectCode": "ELEM_B26_AC_ACT_21",
    "effectText": "Khi tiêu diệt quái thú đối phương: Bức xạ hạt nhân thiêu đốt 300 LP đối thủ và làm giảm 200 ATK của toàn bộ quái thú đối phương.",
    "scientificLore": "Actini (Z=89) thuộc họ Actini, hạt nhân phóng xạ không bền có chu kỳ bán rã đặc trưng, giải phóng năng lượng liên kết hạt nhân cực lớn.",
    "relatedEquation": "2Ac + 3/2O₂ → Ac₂O₃",
    "iupacName": "Actinium",
    "archetype": "ACTINIDE_FISSION",
    "structuredEffects": [
      {
        "effectId": "B26_EFF_21",
        "activationWindow": "ON_DESTROY_MONSTER",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 350
            }
          }
        ],
        "description": "Bức xạ phân hạch thiêu đốt LP đối thủ."
      }
    ]
  },
  {
    "id": "card_b26_022_th_22",
    "name": "Thori — Đại Bác Bức Xạ Alpha (Biến Thể 3)",
    "name_en": "Thorium — Đại Bác Bức Xạ Alpha Mod-3",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "PYRO",
    "manaCost": 4,
    "level": 5,
    "atk": 2795,
    "def": 2350,
    "chemicalFormula": "ThO2",
    "atomicNumber": 90,
    "effectCode": "ELEM_B26_TH_ACT_22",
    "effectText": "Khi tiêu diệt quái thú đối phương: Bức xạ hạt nhân thiêu đốt 380 LP đối thủ và làm giảm 200 ATK của toàn bộ quái thú đối phương.",
    "scientificLore": "Thori (Z=90) thuộc họ Actini, hạt nhân phóng xạ không bền có chu kỳ bán rã đặc trưng, giải phóng năng lượng liên kết hạt nhân cực lớn.",
    "relatedEquation": "Th + O₂ → ThO₂",
    "iupacName": "Thorium",
    "archetype": "ACTINIDE_FISSION",
    "structuredEffects": [
      {
        "effectId": "B26_EFF_22",
        "activationWindow": "ON_DESTROY_MONSTER",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 350
            }
          }
        ],
        "description": "Bức xạ phân hạch thiêu đốt LP đối thủ."
      }
    ]
  },
  {
    "id": "card_b26_023_pa_23",
    "name": "Protactini — Đại Bác Bức Xạ Alpha (Biến Thể 3)",
    "name_en": "Protactinium — Đại Bác Bức Xạ Alpha Mod-3",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "ACID_DARK",
    "manaCost": 5,
    "level": 6,
    "atk": 3050,
    "def": 2540,
    "chemicalFormula": "Pa2O5",
    "atomicNumber": 91,
    "effectCode": "ELEM_B26_PA_ACT_23",
    "effectText": "Khi tiêu diệt quái thú đối phương: Bức xạ hạt nhân thiêu đốt 460 LP đối thủ và làm giảm 200 ATK của toàn bộ quái thú đối phương.",
    "scientificLore": "Protactini (Z=91) thuộc họ Actini, hạt nhân phóng xạ không bền có chu kỳ bán rã đặc trưng, giải phóng năng lượng liên kết hạt nhân cực lớn.",
    "relatedEquation": "2Pa + 5/2O₂ → Pa₂O₅",
    "iupacName": "Protactinium",
    "archetype": "ACTINIDE_FISSION",
    "structuredEffects": [
      {
        "effectId": "B26_EFF_23",
        "activationWindow": "ON_DESTROY_MONSTER",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 350
            }
          }
        ],
        "description": "Bức xạ phân hạch thiêu đốt LP đối thủ."
      }
    ]
  },
  {
    "id": "card_b26_024_u_24",
    "name": "Urani — Đại Bác Bức Xạ Alpha (Biến Thể 3)",
    "name_en": "Uranium — Đại Bác Bức Xạ Alpha Mod-3",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "ULTRA_RARE",
    "attribute": "ACID_DARK",
    "manaCost": 5,
    "level": 7,
    "atk": 3305,
    "def": 2730,
    "chemicalFormula": "UO2(NO3)2",
    "atomicNumber": 92,
    "effectCode": "ELEM_B26_U_ACT_24",
    "effectText": "Khi tiêu diệt quái thú đối phương: Bức xạ hạt nhân thiêu đốt 540 LP đối thủ và làm giảm 200 ATK của toàn bộ quái thú đối phương.",
    "scientificLore": "Urani (Z=92) thuộc họ Actini, hạt nhân phóng xạ không bền có chu kỳ bán rã đặc trưng, giải phóng năng lượng liên kết hạt nhân cực lớn.",
    "relatedEquation": "U + 4HNO₃ → UO₂(NO₃)₂ + 2NO₂ + 2H₂O",
    "iupacName": "Uranium",
    "archetype": "ACTINIDE_FISSION",
    "structuredEffects": [
      {
        "effectId": "B26_EFF_24",
        "activationWindow": "ON_DESTROY_MONSTER",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 350
            }
          }
        ],
        "description": "Bức xạ phân hạch thiêu đốt LP đối thủ."
      }
    ]
  },
  {
    "id": "card_b26_025_np_25",
    "name": "Neptuni — Đại Bác Bức Xạ Alpha (Biến Thể 3)",
    "name_en": "Neptunium — Đại Bác Bức Xạ Alpha Mod-3",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SECRET_RARE",
    "attribute": "ACID_DARK",
    "manaCost": 6,
    "level": 8,
    "atk": 3560,
    "def": 2920,
    "chemicalFormula": "NpO2",
    "atomicNumber": 93,
    "effectCode": "ELEM_B26_NP_ACT_25",
    "effectText": "Khi tiêu diệt quái thú đối phương: Bức xạ hạt nhân thiêu đốt 300 LP đối thủ và làm giảm 200 ATK của toàn bộ quái thú đối phương.",
    "scientificLore": "Neptuni (Z=93) thuộc họ Actini, hạt nhân phóng xạ không bền có chu kỳ bán rã đặc trưng, giải phóng năng lượng liên kết hạt nhân cực lớn.",
    "relatedEquation": "Np + O₂ → NpO₂",
    "iupacName": "Neptunium",
    "archetype": "ACTINIDE_FISSION",
    "structuredEffects": [
      {
        "effectId": "B26_EFF_25",
        "activationWindow": "ON_DESTROY_MONSTER",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 350
            }
          }
        ],
        "description": "Bức xạ phân hạch thiêu đốt LP đối thủ."
      }
    ]
  },
  {
    "id": "card_b26_026_pu_26",
    "name": "Plutoni — Đại Bác Bức Xạ Alpha (Biến Thể 3)",
    "name_en": "Plutonium — Đại Bác Bức Xạ Alpha Mod-3",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "PYRO",
    "manaCost": 3,
    "level": 4,
    "atk": 2540,
    "def": 2160,
    "chemicalFormula": "PuO2",
    "atomicNumber": 94,
    "effectCode": "ELEM_B26_PU_ACT_26",
    "effectText": "Khi tiêu diệt quái thú đối phương: Bức xạ hạt nhân thiêu đốt 380 LP đối thủ và làm giảm 200 ATK của toàn bộ quái thú đối phương.",
    "scientificLore": "Plutoni (Z=94) thuộc họ Actini, hạt nhân phóng xạ không bền có chu kỳ bán rã đặc trưng, giải phóng năng lượng liên kết hạt nhân cực lớn.",
    "relatedEquation": "Pu + O₂ → PuO₂",
    "iupacName": "Plutonium",
    "archetype": "ACTINIDE_FISSION",
    "structuredEffects": [
      {
        "effectId": "B26_EFF_26",
        "activationWindow": "ON_DESTROY_MONSTER",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 350
            }
          }
        ],
        "description": "Bức xạ phân hạch thiêu đốt LP đối thủ."
      }
    ]
  },
  {
    "id": "card_b26_027_am_27",
    "name": "Americi — Đại Bác Bức Xạ Alpha (Biến Thể 3)",
    "name_en": "Americium — Đại Bác Bức Xạ Alpha Mod-3",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "PYRO",
    "manaCost": 4,
    "level": 5,
    "atk": 2795,
    "def": 2350,
    "chemicalFormula": "AmO2",
    "atomicNumber": 95,
    "effectCode": "ELEM_B26_AM_ACT_27",
    "effectText": "Khi tiêu diệt quái thú đối phương: Bức xạ hạt nhân thiêu đốt 460 LP đối thủ và làm giảm 200 ATK của toàn bộ quái thú đối phương.",
    "scientificLore": "Americi (Z=95) thuộc họ Actini, hạt nhân phóng xạ không bền có chu kỳ bán rã đặc trưng, giải phóng năng lượng liên kết hạt nhân cực lớn.",
    "relatedEquation": "Am + O₂ → AmO₂",
    "iupacName": "Americium",
    "archetype": "ACTINIDE_FISSION",
    "structuredEffects": [
      {
        "effectId": "B26_EFF_27",
        "activationWindow": "ON_DESTROY_MONSTER",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 350
            }
          }
        ],
        "description": "Bức xạ phân hạch thiêu đốt LP đối thủ."
      }
    ]
  },
  {
    "id": "card_b26_028_cm_28",
    "name": "Curi — Đại Bác Bức Xạ Alpha (Biến Thể 3)",
    "name_en": "Curium — Đại Bác Bức Xạ Alpha Mod-3",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "ACID_DARK",
    "manaCost": 5,
    "level": 6,
    "atk": 3050,
    "def": 2540,
    "chemicalFormula": "Cm2O3",
    "atomicNumber": 96,
    "effectCode": "ELEM_B26_CM_ACT_28",
    "effectText": "Khi tiêu diệt quái thú đối phương: Bức xạ hạt nhân thiêu đốt 540 LP đối thủ và làm giảm 200 ATK của toàn bộ quái thú đối phương.",
    "scientificLore": "Curi (Z=96) thuộc họ Actini, hạt nhân phóng xạ không bền có chu kỳ bán rã đặc trưng, giải phóng năng lượng liên kết hạt nhân cực lớn.",
    "relatedEquation": "2Cm + 3/2O₂ → Cm₂O₃",
    "iupacName": "Curium",
    "archetype": "ACTINIDE_FISSION",
    "structuredEffects": [
      {
        "effectId": "B26_EFF_28",
        "activationWindow": "ON_DESTROY_MONSTER",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 350
            }
          }
        ],
        "description": "Bức xạ phân hạch thiêu đốt LP đối thủ."
      }
    ]
  },
  {
    "id": "card_b26_029_bk_29",
    "name": "Berkeli — Đại Bác Bức Xạ Alpha (Biến Thể 3)",
    "name_en": "Berkelium — Đại Bác Bức Xạ Alpha Mod-3",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "ACID_DARK",
    "manaCost": 5,
    "level": 7,
    "atk": 3305,
    "def": 2730,
    "chemicalFormula": "BkO2",
    "atomicNumber": 97,
    "effectCode": "ELEM_B26_BK_ACT_29",
    "effectText": "Khi tiêu diệt quái thú đối phương: Bức xạ hạt nhân thiêu đốt 300 LP đối thủ và làm giảm 200 ATK của toàn bộ quái thú đối phương.",
    "scientificLore": "Berkeli (Z=97) thuộc họ Actini, hạt nhân phóng xạ không bền có chu kỳ bán rã đặc trưng, giải phóng năng lượng liên kết hạt nhân cực lớn.",
    "relatedEquation": "Bk + O₂ → BkO₂",
    "iupacName": "Berkelium",
    "archetype": "ACTINIDE_FISSION",
    "structuredEffects": [
      {
        "effectId": "B26_EFF_29",
        "activationWindow": "ON_DESTROY_MONSTER",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 350
            }
          }
        ],
        "description": "Bức xạ phân hạch thiêu đốt LP đối thủ."
      }
    ]
  },
  {
    "id": "card_b26_030_cf_30",
    "name": "Californi — Đại Bác Bức Xạ Alpha (Biến Thể 3)",
    "name_en": "Californium — Đại Bác Bức Xạ Alpha Mod-3",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "NOBLE_VOID",
    "manaCost": 6,
    "level": 8,
    "atk": 3560,
    "def": 2920,
    "chemicalFormula": "Cf2O3",
    "atomicNumber": 98,
    "effectCode": "ELEM_B26_CF_ACT_30",
    "effectText": "Khi tiêu diệt quái thú đối phương: Bức xạ hạt nhân thiêu đốt 380 LP đối thủ và làm giảm 200 ATK của toàn bộ quái thú đối phương.",
    "scientificLore": "Californi (Z=98) thuộc họ Actini, hạt nhân phóng xạ không bền có chu kỳ bán rã đặc trưng, giải phóng năng lượng liên kết hạt nhân cực lớn.",
    "relatedEquation": "2Cf + 3/2O₂ → Cf₂O₃",
    "iupacName": "Californium",
    "archetype": "ACTINIDE_FISSION",
    "structuredEffects": [
      {
        "effectId": "B26_EFF_30",
        "activationWindow": "ON_DESTROY_MONSTER",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 350
            }
          }
        ],
        "description": "Bức xạ phân hạch thiêu đốt LP đối thủ."
      }
    ]
  },
  {
    "id": "card_b26_031_ac_31",
    "name": "Actini — Hộ Vệ Lò Phản Ứng (Biến Thể 4)",
    "name_en": "Actinium — Hộ Vệ Lò Phản Ứng Mod-4",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "ACID_DARK",
    "manaCost": 3,
    "level": 4,
    "atk": 2540,
    "def": 2160,
    "chemicalFormula": "Ac2O3",
    "atomicNumber": 89,
    "effectCode": "ELEM_B26_AC_ACT_31",
    "effectText": "Khi tiêu diệt quái thú đối phương: Bức xạ hạt nhân thiêu đốt 460 LP đối thủ và làm giảm 200 ATK của toàn bộ quái thú đối phương.",
    "scientificLore": "Actini (Z=89) thuộc họ Actini, hạt nhân phóng xạ không bền có chu kỳ bán rã đặc trưng, giải phóng năng lượng liên kết hạt nhân cực lớn.",
    "relatedEquation": "2Ac + 3/2O₂ → Ac₂O₃",
    "iupacName": "Actinium",
    "archetype": "ACTINIDE_FISSION",
    "structuredEffects": [
      {
        "effectId": "B26_EFF_31",
        "activationWindow": "ON_DESTROY_MONSTER",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 350
            }
          }
        ],
        "description": "Bức xạ phân hạch thiêu đốt LP đối thủ."
      }
    ]
  },
  {
    "id": "card_b26_032_th_32",
    "name": "Thori — Hộ Vệ Lò Phản Ứng (Biến Thể 4)",
    "name_en": "Thorium — Hộ Vệ Lò Phản Ứng Mod-4",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "PYRO",
    "manaCost": 4,
    "level": 5,
    "atk": 2795,
    "def": 2350,
    "chemicalFormula": "ThO2",
    "atomicNumber": 90,
    "effectCode": "ELEM_B26_TH_ACT_32",
    "effectText": "Khi tiêu diệt quái thú đối phương: Bức xạ hạt nhân thiêu đốt 540 LP đối thủ và làm giảm 200 ATK của toàn bộ quái thú đối phương.",
    "scientificLore": "Thori (Z=90) thuộc họ Actini, hạt nhân phóng xạ không bền có chu kỳ bán rã đặc trưng, giải phóng năng lượng liên kết hạt nhân cực lớn.",
    "relatedEquation": "Th + O₂ → ThO₂",
    "iupacName": "Thorium",
    "archetype": "ACTINIDE_FISSION",
    "structuredEffects": [
      {
        "effectId": "B26_EFF_32",
        "activationWindow": "ON_DESTROY_MONSTER",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 350
            }
          }
        ],
        "description": "Bức xạ phân hạch thiêu đốt LP đối thủ."
      }
    ]
  },
  {
    "id": "card_b26_033_pa_33",
    "name": "Protactini — Hộ Vệ Lò Phản Ứng (Biến Thể 4)",
    "name_en": "Protactinium — Hộ Vệ Lò Phản Ứng Mod-4",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "ULTRA_RARE",
    "attribute": "ACID_DARK",
    "manaCost": 5,
    "level": 6,
    "atk": 3050,
    "def": 2540,
    "chemicalFormula": "Pa2O5",
    "atomicNumber": 91,
    "effectCode": "ELEM_B26_PA_ACT_33",
    "effectText": "Khi tiêu diệt quái thú đối phương: Bức xạ hạt nhân thiêu đốt 300 LP đối thủ và làm giảm 200 ATK của toàn bộ quái thú đối phương.",
    "scientificLore": "Protactini (Z=91) thuộc họ Actini, hạt nhân phóng xạ không bền có chu kỳ bán rã đặc trưng, giải phóng năng lượng liên kết hạt nhân cực lớn.",
    "relatedEquation": "2Pa + 5/2O₂ → Pa₂O₅",
    "iupacName": "Protactinium",
    "archetype": "ACTINIDE_FISSION",
    "structuredEffects": [
      {
        "effectId": "B26_EFF_33",
        "activationWindow": "ON_DESTROY_MONSTER",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 350
            }
          }
        ],
        "description": "Bức xạ phân hạch thiêu đốt LP đối thủ."
      }
    ]
  },
  {
    "id": "card_b26_034_u_34",
    "name": "Urani — Hộ Vệ Lò Phản Ứng (Biến Thể 4)",
    "name_en": "Uranium — Hộ Vệ Lò Phản Ứng Mod-4",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SECRET_RARE",
    "attribute": "ACID_DARK",
    "manaCost": 5,
    "level": 7,
    "atk": 3305,
    "def": 2730,
    "chemicalFormula": "UO2(NO3)2",
    "atomicNumber": 92,
    "effectCode": "ELEM_B26_U_ACT_34",
    "effectText": "Khi tiêu diệt quái thú đối phương: Bức xạ hạt nhân thiêu đốt 380 LP đối thủ và làm giảm 200 ATK của toàn bộ quái thú đối phương.",
    "scientificLore": "Urani (Z=92) thuộc họ Actini, hạt nhân phóng xạ không bền có chu kỳ bán rã đặc trưng, giải phóng năng lượng liên kết hạt nhân cực lớn.",
    "relatedEquation": "U + 4HNO₃ → UO₂(NO₃)₂ + 2NO₂ + 2H₂O",
    "iupacName": "Uranium",
    "archetype": "ACTINIDE_FISSION",
    "structuredEffects": [
      {
        "effectId": "B26_EFF_34",
        "activationWindow": "ON_DESTROY_MONSTER",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 350
            }
          }
        ],
        "description": "Bức xạ phân hạch thiêu đốt LP đối thủ."
      }
    ]
  },
  {
    "id": "card_b26_035_np_35",
    "name": "Neptuni — Hộ Vệ Lò Phản Ứng (Biến Thể 4)",
    "name_en": "Neptunium — Hộ Vệ Lò Phản Ứng Mod-4",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "ACID_DARK",
    "manaCost": 6,
    "level": 8,
    "atk": 3560,
    "def": 2920,
    "chemicalFormula": "NpO2",
    "atomicNumber": 93,
    "effectCode": "ELEM_B26_NP_ACT_35",
    "effectText": "Khi tiêu diệt quái thú đối phương: Bức xạ hạt nhân thiêu đốt 460 LP đối thủ và làm giảm 200 ATK của toàn bộ quái thú đối phương.",
    "scientificLore": "Neptuni (Z=93) thuộc họ Actini, hạt nhân phóng xạ không bền có chu kỳ bán rã đặc trưng, giải phóng năng lượng liên kết hạt nhân cực lớn.",
    "relatedEquation": "Np + O₂ → NpO₂",
    "iupacName": "Neptunium",
    "archetype": "ACTINIDE_FISSION",
    "structuredEffects": [
      {
        "effectId": "B26_EFF_35",
        "activationWindow": "ON_DESTROY_MONSTER",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 350
            }
          }
        ],
        "description": "Bức xạ phân hạch thiêu đốt LP đối thủ."
      }
    ]
  },
  {
    "id": "card_b26_036_pu_36",
    "name": "Plutoni — Hộ Vệ Lò Phản Ứng (Biến Thể 4)",
    "name_en": "Plutonium — Hộ Vệ Lò Phản Ứng Mod-4",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "PYRO",
    "manaCost": 3,
    "level": 4,
    "atk": 2540,
    "def": 2160,
    "chemicalFormula": "PuO2",
    "atomicNumber": 94,
    "effectCode": "ELEM_B26_PU_ACT_36",
    "effectText": "Khi tiêu diệt quái thú đối phương: Bức xạ hạt nhân thiêu đốt 540 LP đối thủ và làm giảm 200 ATK của toàn bộ quái thú đối phương.",
    "scientificLore": "Plutoni (Z=94) thuộc họ Actini, hạt nhân phóng xạ không bền có chu kỳ bán rã đặc trưng, giải phóng năng lượng liên kết hạt nhân cực lớn.",
    "relatedEquation": "Pu + O₂ → PuO₂",
    "iupacName": "Plutonium",
    "archetype": "ACTINIDE_FISSION",
    "structuredEffects": [
      {
        "effectId": "B26_EFF_36",
        "activationWindow": "ON_DESTROY_MONSTER",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 350
            }
          }
        ],
        "description": "Bức xạ phân hạch thiêu đốt LP đối thủ."
      }
    ]
  },
  {
    "id": "card_b26_037_am_37",
    "name": "Americi — Hộ Vệ Lò Phản Ứng (Biến Thể 4)",
    "name_en": "Americium — Hộ Vệ Lò Phản Ứng Mod-4",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "PYRO",
    "manaCost": 4,
    "level": 5,
    "atk": 2795,
    "def": 2350,
    "chemicalFormula": "AmO2",
    "atomicNumber": 95,
    "effectCode": "ELEM_B26_AM_ACT_37",
    "effectText": "Khi tiêu diệt quái thú đối phương: Bức xạ hạt nhân thiêu đốt 300 LP đối thủ và làm giảm 200 ATK của toàn bộ quái thú đối phương.",
    "scientificLore": "Americi (Z=95) thuộc họ Actini, hạt nhân phóng xạ không bền có chu kỳ bán rã đặc trưng, giải phóng năng lượng liên kết hạt nhân cực lớn.",
    "relatedEquation": "Am + O₂ → AmO₂",
    "iupacName": "Americium",
    "archetype": "ACTINIDE_FISSION",
    "structuredEffects": [
      {
        "effectId": "B26_EFF_37",
        "activationWindow": "ON_DESTROY_MONSTER",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 350
            }
          }
        ],
        "description": "Bức xạ phân hạch thiêu đốt LP đối thủ."
      }
    ]
  },
  {
    "id": "card_b26_038_cm_38",
    "name": "Curi — Hộ Vệ Lò Phản Ứng (Biến Thể 4)",
    "name_en": "Curium — Hộ Vệ Lò Phản Ứng Mod-4",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "ACID_DARK",
    "manaCost": 5,
    "level": 6,
    "atk": 3050,
    "def": 2540,
    "chemicalFormula": "Cm2O3",
    "atomicNumber": 96,
    "effectCode": "ELEM_B26_CM_ACT_38",
    "effectText": "Khi tiêu diệt quái thú đối phương: Bức xạ hạt nhân thiêu đốt 380 LP đối thủ và làm giảm 200 ATK của toàn bộ quái thú đối phương.",
    "scientificLore": "Curi (Z=96) thuộc họ Actini, hạt nhân phóng xạ không bền có chu kỳ bán rã đặc trưng, giải phóng năng lượng liên kết hạt nhân cực lớn.",
    "relatedEquation": "2Cm + 3/2O₂ → Cm₂O₃",
    "iupacName": "Curium",
    "archetype": "ACTINIDE_FISSION",
    "structuredEffects": [
      {
        "effectId": "B26_EFF_38",
        "activationWindow": "ON_DESTROY_MONSTER",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 350
            }
          }
        ],
        "description": "Bức xạ phân hạch thiêu đốt LP đối thủ."
      }
    ]
  },
  {
    "id": "card_b26_039_bk_39",
    "name": "Berkeli — Hộ Vệ Lò Phản Ứng (Biến Thể 4)",
    "name_en": "Berkelium — Hộ Vệ Lò Phản Ứng Mod-4",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "ACID_DARK",
    "manaCost": 5,
    "level": 7,
    "atk": 3305,
    "def": 2730,
    "chemicalFormula": "BkO2",
    "atomicNumber": 97,
    "effectCode": "ELEM_B26_BK_ACT_39",
    "effectText": "Khi tiêu diệt quái thú đối phương: Bức xạ hạt nhân thiêu đốt 460 LP đối thủ và làm giảm 200 ATK của toàn bộ quái thú đối phương.",
    "scientificLore": "Berkeli (Z=97) thuộc họ Actini, hạt nhân phóng xạ không bền có chu kỳ bán rã đặc trưng, giải phóng năng lượng liên kết hạt nhân cực lớn.",
    "relatedEquation": "Bk + O₂ → BkO₂",
    "iupacName": "Berkelium",
    "archetype": "ACTINIDE_FISSION",
    "structuredEffects": [
      {
        "effectId": "B26_EFF_39",
        "activationWindow": "ON_DESTROY_MONSTER",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 350
            }
          }
        ],
        "description": "Bức xạ phân hạch thiêu đốt LP đối thủ."
      }
    ]
  },
  {
    "id": "card_b26_040_cf_40",
    "name": "Californi — Hộ Vệ Lò Phản Ứng (Biến Thể 4)",
    "name_en": "Californium — Hộ Vệ Lò Phản Ứng Mod-4",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "NOBLE_VOID",
    "manaCost": 6,
    "level": 8,
    "atk": 3560,
    "def": 2920,
    "chemicalFormula": "Cf2O3",
    "atomicNumber": 98,
    "effectCode": "ELEM_B26_CF_ACT_40",
    "effectText": "Khi tiêu diệt quái thú đối phương: Bức xạ hạt nhân thiêu đốt 540 LP đối thủ và làm giảm 200 ATK của toàn bộ quái thú đối phương.",
    "scientificLore": "Californi (Z=98) thuộc họ Actini, hạt nhân phóng xạ không bền có chu kỳ bán rã đặc trưng, giải phóng năng lượng liên kết hạt nhân cực lớn.",
    "relatedEquation": "2Cf + 3/2O₂ → Cf₂O₃",
    "iupacName": "Californium",
    "archetype": "ACTINIDE_FISSION",
    "structuredEffects": [
      {
        "effectId": "B26_EFF_40",
        "activationWindow": "ON_DESTROY_MONSTER",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 350
            }
          }
        ],
        "description": "Bức xạ phân hạch thiêu đốt LP đối thủ."
      }
    ]
  },
  {
    "id": "card_b26_041_ac_41",
    "name": "Actini — Chiến Binh Đồng Vị Nặng (Biến Thể 5)",
    "name_en": "Actinium — Chiến Binh Đồng Vị Nặng Mod-5",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "ACID_DARK",
    "manaCost": 3,
    "level": 4,
    "atk": 2540,
    "def": 2160,
    "chemicalFormula": "Ac2O3",
    "atomicNumber": 89,
    "effectCode": "ELEM_B26_AC_ACT_41",
    "effectText": "Khi tiêu diệt quái thú đối phương: Bức xạ hạt nhân thiêu đốt 300 LP đối thủ và làm giảm 200 ATK của toàn bộ quái thú đối phương.",
    "scientificLore": "Actini (Z=89) thuộc họ Actini, hạt nhân phóng xạ không bền có chu kỳ bán rã đặc trưng, giải phóng năng lượng liên kết hạt nhân cực lớn.",
    "relatedEquation": "2Ac + 3/2O₂ → Ac₂O₃",
    "iupacName": "Actinium",
    "archetype": "ACTINIDE_FISSION",
    "structuredEffects": [
      {
        "effectId": "B26_EFF_41",
        "activationWindow": "ON_DESTROY_MONSTER",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 350
            }
          }
        ],
        "description": "Bức xạ phân hạch thiêu đốt LP đối thủ."
      }
    ]
  },
  {
    "id": "card_b26_042_th_42",
    "name": "Thori — Chiến Binh Đồng Vị Nặng (Biến Thể 5)",
    "name_en": "Thorium — Chiến Binh Đồng Vị Nặng Mod-5",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "ULTRA_RARE",
    "attribute": "PYRO",
    "manaCost": 4,
    "level": 5,
    "atk": 2795,
    "def": 2350,
    "chemicalFormula": "ThO2",
    "atomicNumber": 90,
    "effectCode": "ELEM_B26_TH_ACT_42",
    "effectText": "Khi tiêu diệt quái thú đối phương: Bức xạ hạt nhân thiêu đốt 380 LP đối thủ và làm giảm 200 ATK của toàn bộ quái thú đối phương.",
    "scientificLore": "Thori (Z=90) thuộc họ Actini, hạt nhân phóng xạ không bền có chu kỳ bán rã đặc trưng, giải phóng năng lượng liên kết hạt nhân cực lớn.",
    "relatedEquation": "Th + O₂ → ThO₂",
    "iupacName": "Thorium",
    "archetype": "ACTINIDE_FISSION",
    "structuredEffects": [
      {
        "effectId": "B26_EFF_42",
        "activationWindow": "ON_DESTROY_MONSTER",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 350
            }
          }
        ],
        "description": "Bức xạ phân hạch thiêu đốt LP đối thủ."
      }
    ]
  },
  {
    "id": "card_b26_043_pa_43",
    "name": "Protactini — Chiến Binh Đồng Vị Nặng (Biến Thể 5)",
    "name_en": "Protactinium — Chiến Binh Đồng Vị Nặng Mod-5",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SECRET_RARE",
    "attribute": "ACID_DARK",
    "manaCost": 5,
    "level": 6,
    "atk": 3050,
    "def": 2540,
    "chemicalFormula": "Pa2O5",
    "atomicNumber": 91,
    "effectCode": "ELEM_B26_PA_ACT_43",
    "effectText": "Khi tiêu diệt quái thú đối phương: Bức xạ hạt nhân thiêu đốt 460 LP đối thủ và làm giảm 200 ATK của toàn bộ quái thú đối phương.",
    "scientificLore": "Protactini (Z=91) thuộc họ Actini, hạt nhân phóng xạ không bền có chu kỳ bán rã đặc trưng, giải phóng năng lượng liên kết hạt nhân cực lớn.",
    "relatedEquation": "2Pa + 5/2O₂ → Pa₂O₅",
    "iupacName": "Protactinium",
    "archetype": "ACTINIDE_FISSION",
    "structuredEffects": [
      {
        "effectId": "B26_EFF_43",
        "activationWindow": "ON_DESTROY_MONSTER",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 350
            }
          }
        ],
        "description": "Bức xạ phân hạch thiêu đốt LP đối thủ."
      }
    ]
  },
  {
    "id": "card_b26_044_u_44",
    "name": "Urani — Chiến Binh Đồng Vị Nặng (Biến Thể 5)",
    "name_en": "Uranium — Chiến Binh Đồng Vị Nặng Mod-5",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "ACID_DARK",
    "manaCost": 5,
    "level": 7,
    "atk": 3305,
    "def": 2730,
    "chemicalFormula": "UO2(NO3)2",
    "atomicNumber": 92,
    "effectCode": "ELEM_B26_U_ACT_44",
    "effectText": "Khi tiêu diệt quái thú đối phương: Bức xạ hạt nhân thiêu đốt 540 LP đối thủ và làm giảm 200 ATK của toàn bộ quái thú đối phương.",
    "scientificLore": "Urani (Z=92) thuộc họ Actini, hạt nhân phóng xạ không bền có chu kỳ bán rã đặc trưng, giải phóng năng lượng liên kết hạt nhân cực lớn.",
    "relatedEquation": "U + 4HNO₃ → UO₂(NO₃)₂ + 2NO₂ + 2H₂O",
    "iupacName": "Uranium",
    "archetype": "ACTINIDE_FISSION",
    "structuredEffects": [
      {
        "effectId": "B26_EFF_44",
        "activationWindow": "ON_DESTROY_MONSTER",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 350
            }
          }
        ],
        "description": "Bức xạ phân hạch thiêu đốt LP đối thủ."
      }
    ]
  },
  {
    "id": "card_b26_045_np_45",
    "name": "Neptuni — Chiến Binh Đồng Vị Nặng (Biến Thể 5)",
    "name_en": "Neptunium — Chiến Binh Đồng Vị Nặng Mod-5",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "ACID_DARK",
    "manaCost": 6,
    "level": 8,
    "atk": 3560,
    "def": 2920,
    "chemicalFormula": "NpO2",
    "atomicNumber": 93,
    "effectCode": "ELEM_B26_NP_ACT_45",
    "effectText": "Khi tiêu diệt quái thú đối phương: Bức xạ hạt nhân thiêu đốt 300 LP đối thủ và làm giảm 200 ATK của toàn bộ quái thú đối phương.",
    "scientificLore": "Neptuni (Z=93) thuộc họ Actini, hạt nhân phóng xạ không bền có chu kỳ bán rã đặc trưng, giải phóng năng lượng liên kết hạt nhân cực lớn.",
    "relatedEquation": "Np + O₂ → NpO₂",
    "iupacName": "Neptunium",
    "archetype": "ACTINIDE_FISSION",
    "structuredEffects": [
      {
        "effectId": "B26_EFF_45",
        "activationWindow": "ON_DESTROY_MONSTER",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 350
            }
          }
        ],
        "description": "Bức xạ phân hạch thiêu đốt LP đối thủ."
      }
    ]
  },
  {
    "id": "card_b26_046_pu_46",
    "name": "Plutoni — Chiến Binh Đồng Vị Nặng (Biến Thể 5)",
    "name_en": "Plutonium — Chiến Binh Đồng Vị Nặng Mod-5",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "PYRO",
    "manaCost": 3,
    "level": 4,
    "atk": 2540,
    "def": 2160,
    "chemicalFormula": "PuO2",
    "atomicNumber": 94,
    "effectCode": "ELEM_B26_PU_ACT_46",
    "effectText": "Khi tiêu diệt quái thú đối phương: Bức xạ hạt nhân thiêu đốt 380 LP đối thủ và làm giảm 200 ATK của toàn bộ quái thú đối phương.",
    "scientificLore": "Plutoni (Z=94) thuộc họ Actini, hạt nhân phóng xạ không bền có chu kỳ bán rã đặc trưng, giải phóng năng lượng liên kết hạt nhân cực lớn.",
    "relatedEquation": "Pu + O₂ → PuO₂",
    "iupacName": "Plutonium",
    "archetype": "ACTINIDE_FISSION",
    "structuredEffects": [
      {
        "effectId": "B26_EFF_46",
        "activationWindow": "ON_DESTROY_MONSTER",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 350
            }
          }
        ],
        "description": "Bức xạ phân hạch thiêu đốt LP đối thủ."
      }
    ]
  },
  {
    "id": "card_b26_047_am_47",
    "name": "Americi — Chiến Binh Đồng Vị Nặng (Biến Thể 5)",
    "name_en": "Americium — Chiến Binh Đồng Vị Nặng Mod-5",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "PYRO",
    "manaCost": 4,
    "level": 5,
    "atk": 2795,
    "def": 2350,
    "chemicalFormula": "AmO2",
    "atomicNumber": 95,
    "effectCode": "ELEM_B26_AM_ACT_47",
    "effectText": "Khi tiêu diệt quái thú đối phương: Bức xạ hạt nhân thiêu đốt 460 LP đối thủ và làm giảm 200 ATK của toàn bộ quái thú đối phương.",
    "scientificLore": "Americi (Z=95) thuộc họ Actini, hạt nhân phóng xạ không bền có chu kỳ bán rã đặc trưng, giải phóng năng lượng liên kết hạt nhân cực lớn.",
    "relatedEquation": "Am + O₂ → AmO₂",
    "iupacName": "Americium",
    "archetype": "ACTINIDE_FISSION",
    "structuredEffects": [
      {
        "effectId": "B26_EFF_47",
        "activationWindow": "ON_DESTROY_MONSTER",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 350
            }
          }
        ],
        "description": "Bức xạ phân hạch thiêu đốt LP đối thủ."
      }
    ]
  },
  {
    "id": "card_b26_048_cm_48",
    "name": "Curi — Chiến Binh Đồng Vị Nặng (Biến Thể 5)",
    "name_en": "Curium — Chiến Binh Đồng Vị Nặng Mod-5",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "ACID_DARK",
    "manaCost": 5,
    "level": 6,
    "atk": 3050,
    "def": 2540,
    "chemicalFormula": "Cm2O3",
    "atomicNumber": 96,
    "effectCode": "ELEM_B26_CM_ACT_48",
    "effectText": "Khi tiêu diệt quái thú đối phương: Bức xạ hạt nhân thiêu đốt 540 LP đối thủ và làm giảm 200 ATK của toàn bộ quái thú đối phương.",
    "scientificLore": "Curi (Z=96) thuộc họ Actini, hạt nhân phóng xạ không bền có chu kỳ bán rã đặc trưng, giải phóng năng lượng liên kết hạt nhân cực lớn.",
    "relatedEquation": "2Cm + 3/2O₂ → Cm₂O₃",
    "iupacName": "Curium",
    "archetype": "ACTINIDE_FISSION",
    "structuredEffects": [
      {
        "effectId": "B26_EFF_48",
        "activationWindow": "ON_DESTROY_MONSTER",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 350
            }
          }
        ],
        "description": "Bức xạ phân hạch thiêu đốt LP đối thủ."
      }
    ]
  },
  {
    "id": "card_b26_049_bk_49",
    "name": "Berkeli — Chiến Binh Đồng Vị Nặng (Biến Thể 5)",
    "name_en": "Berkelium — Chiến Binh Đồng Vị Nặng Mod-5",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "ACID_DARK",
    "manaCost": 5,
    "level": 7,
    "atk": 3305,
    "def": 2730,
    "chemicalFormula": "BkO2",
    "atomicNumber": 97,
    "effectCode": "ELEM_B26_BK_ACT_49",
    "effectText": "Khi tiêu diệt quái thú đối phương: Bức xạ hạt nhân thiêu đốt 300 LP đối thủ và làm giảm 200 ATK của toàn bộ quái thú đối phương.",
    "scientificLore": "Berkeli (Z=97) thuộc họ Actini, hạt nhân phóng xạ không bền có chu kỳ bán rã đặc trưng, giải phóng năng lượng liên kết hạt nhân cực lớn.",
    "relatedEquation": "Bk + O₂ → BkO₂",
    "iupacName": "Berkelium",
    "archetype": "ACTINIDE_FISSION",
    "structuredEffects": [
      {
        "effectId": "B26_EFF_49",
        "activationWindow": "ON_DESTROY_MONSTER",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 350
            }
          }
        ],
        "description": "Bức xạ phân hạch thiêu đốt LP đối thủ."
      }
    ]
  },
  {
    "id": "card_b26_050_cf_50",
    "name": "Californi — Chiến Binh Đồng Vị Nặng (Biến Thể 5)",
    "name_en": "Californium — Chiến Binh Đồng Vị Nặng Mod-5",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "NOBLE_VOID",
    "manaCost": 6,
    "level": 8,
    "atk": 3560,
    "def": 2920,
    "chemicalFormula": "Cf2O3",
    "atomicNumber": 98,
    "effectCode": "ELEM_B26_CF_ACT_50",
    "effectText": "Khi tiêu diệt quái thú đối phương: Bức xạ hạt nhân thiêu đốt 380 LP đối thủ và làm giảm 200 ATK của toàn bộ quái thú đối phương.",
    "scientificLore": "Californi (Z=98) thuộc họ Actini, hạt nhân phóng xạ không bền có chu kỳ bán rã đặc trưng, giải phóng năng lượng liên kết hạt nhân cực lớn.",
    "relatedEquation": "2Cf + 3/2O₂ → Cf₂O₃",
    "iupacName": "Californium",
    "archetype": "ACTINIDE_FISSION",
    "structuredEffects": [
      {
        "effectId": "B26_EFF_50",
        "activationWindow": "ON_DESTROY_MONSTER",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 350
            }
          }
        ],
        "description": "Bức xạ phân hạch thiêu đốt LP đối thủ."
      }
    ]
  },
  {
    "id": "card_b26_051_ac_51",
    "name": "Actini — Thần Tượng Phân Rã Hạt Nhân (Biến Thể 6)",
    "name_en": "Actinium — Thần Tượng Phân Rã Hạt Nhân Mod-6",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "ULTRA_RARE",
    "attribute": "ACID_DARK",
    "manaCost": 3,
    "level": 4,
    "atk": 2540,
    "def": 2160,
    "chemicalFormula": "Ac2O3",
    "atomicNumber": 89,
    "effectCode": "ELEM_B26_AC_ACT_51",
    "effectText": "Khi tiêu diệt quái thú đối phương: Bức xạ hạt nhân thiêu đốt 460 LP đối thủ và làm giảm 200 ATK của toàn bộ quái thú đối phương.",
    "scientificLore": "Actini (Z=89) thuộc họ Actini, hạt nhân phóng xạ không bền có chu kỳ bán rã đặc trưng, giải phóng năng lượng liên kết hạt nhân cực lớn.",
    "relatedEquation": "2Ac + 3/2O₂ → Ac₂O₃",
    "iupacName": "Actinium",
    "archetype": "ACTINIDE_FISSION",
    "structuredEffects": [
      {
        "effectId": "B26_EFF_51",
        "activationWindow": "ON_DESTROY_MONSTER",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 350
            }
          }
        ],
        "description": "Bức xạ phân hạch thiêu đốt LP đối thủ."
      }
    ]
  },
  {
    "id": "card_b26_052_th_52",
    "name": "Thori — Thần Tượng Phân Rã Hạt Nhân (Biến Thể 6)",
    "name_en": "Thorium — Thần Tượng Phân Rã Hạt Nhân Mod-6",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SECRET_RARE",
    "attribute": "PYRO",
    "manaCost": 4,
    "level": 5,
    "atk": 2795,
    "def": 2350,
    "chemicalFormula": "ThO2",
    "atomicNumber": 90,
    "effectCode": "ELEM_B26_TH_ACT_52",
    "effectText": "Khi tiêu diệt quái thú đối phương: Bức xạ hạt nhân thiêu đốt 540 LP đối thủ và làm giảm 200 ATK của toàn bộ quái thú đối phương.",
    "scientificLore": "Thori (Z=90) thuộc họ Actini, hạt nhân phóng xạ không bền có chu kỳ bán rã đặc trưng, giải phóng năng lượng liên kết hạt nhân cực lớn.",
    "relatedEquation": "Th + O₂ → ThO₂",
    "iupacName": "Thorium",
    "archetype": "ACTINIDE_FISSION",
    "structuredEffects": [
      {
        "effectId": "B26_EFF_52",
        "activationWindow": "ON_DESTROY_MONSTER",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 350
            }
          }
        ],
        "description": "Bức xạ phân hạch thiêu đốt LP đối thủ."
      }
    ]
  },
  {
    "id": "card_b26_053_pa_53",
    "name": "Protactini — Thần Tượng Phân Rã Hạt Nhân (Biến Thể 6)",
    "name_en": "Protactinium — Thần Tượng Phân Rã Hạt Nhân Mod-6",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "ACID_DARK",
    "manaCost": 5,
    "level": 6,
    "atk": 3050,
    "def": 2540,
    "chemicalFormula": "Pa2O5",
    "atomicNumber": 91,
    "effectCode": "ELEM_B26_PA_ACT_53",
    "effectText": "Khi tiêu diệt quái thú đối phương: Bức xạ hạt nhân thiêu đốt 300 LP đối thủ và làm giảm 200 ATK của toàn bộ quái thú đối phương.",
    "scientificLore": "Protactini (Z=91) thuộc họ Actini, hạt nhân phóng xạ không bền có chu kỳ bán rã đặc trưng, giải phóng năng lượng liên kết hạt nhân cực lớn.",
    "relatedEquation": "2Pa + 5/2O₂ → Pa₂O₅",
    "iupacName": "Protactinium",
    "archetype": "ACTINIDE_FISSION",
    "structuredEffects": [
      {
        "effectId": "B26_EFF_53",
        "activationWindow": "ON_DESTROY_MONSTER",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 350
            }
          }
        ],
        "description": "Bức xạ phân hạch thiêu đốt LP đối thủ."
      }
    ]
  },
  {
    "id": "card_b26_054_u_54",
    "name": "Urani — Thần Tượng Phân Rã Hạt Nhân (Biến Thể 6)",
    "name_en": "Uranium — Thần Tượng Phân Rã Hạt Nhân Mod-6",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "ACID_DARK",
    "manaCost": 5,
    "level": 7,
    "atk": 3305,
    "def": 2730,
    "chemicalFormula": "UO2(NO3)2",
    "atomicNumber": 92,
    "effectCode": "ELEM_B26_U_ACT_54",
    "effectText": "Khi tiêu diệt quái thú đối phương: Bức xạ hạt nhân thiêu đốt 380 LP đối thủ và làm giảm 200 ATK của toàn bộ quái thú đối phương.",
    "scientificLore": "Urani (Z=92) thuộc họ Actini, hạt nhân phóng xạ không bền có chu kỳ bán rã đặc trưng, giải phóng năng lượng liên kết hạt nhân cực lớn.",
    "relatedEquation": "U + 4HNO₃ → UO₂(NO₃)₂ + 2NO₂ + 2H₂O",
    "iupacName": "Uranium",
    "archetype": "ACTINIDE_FISSION",
    "structuredEffects": [
      {
        "effectId": "B26_EFF_54",
        "activationWindow": "ON_DESTROY_MONSTER",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 350
            }
          }
        ],
        "description": "Bức xạ phân hạch thiêu đốt LP đối thủ."
      }
    ]
  },
  {
    "id": "card_b26_055_np_55",
    "name": "Neptuni — Thần Tượng Phân Rã Hạt Nhân (Biến Thể 6)",
    "name_en": "Neptunium — Thần Tượng Phân Rã Hạt Nhân Mod-6",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "ACID_DARK",
    "manaCost": 6,
    "level": 8,
    "atk": 3560,
    "def": 2920,
    "chemicalFormula": "NpO2",
    "atomicNumber": 93,
    "effectCode": "ELEM_B26_NP_ACT_55",
    "effectText": "Khi tiêu diệt quái thú đối phương: Bức xạ hạt nhân thiêu đốt 460 LP đối thủ và làm giảm 200 ATK của toàn bộ quái thú đối phương.",
    "scientificLore": "Neptuni (Z=93) thuộc họ Actini, hạt nhân phóng xạ không bền có chu kỳ bán rã đặc trưng, giải phóng năng lượng liên kết hạt nhân cực lớn.",
    "relatedEquation": "Np + O₂ → NpO₂",
    "iupacName": "Neptunium",
    "archetype": "ACTINIDE_FISSION",
    "structuredEffects": [
      {
        "effectId": "B26_EFF_55",
        "activationWindow": "ON_DESTROY_MONSTER",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 350
            }
          }
        ],
        "description": "Bức xạ phân hạch thiêu đốt LP đối thủ."
      }
    ]
  },
  {
    "id": "card_b26_056_pu_56",
    "name": "Plutoni — Thần Tượng Phân Rã Hạt Nhân (Biến Thể 6)",
    "name_en": "Plutonium — Thần Tượng Phân Rã Hạt Nhân Mod-6",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "PYRO",
    "manaCost": 3,
    "level": 4,
    "atk": 2540,
    "def": 2160,
    "chemicalFormula": "PuO2",
    "atomicNumber": 94,
    "effectCode": "ELEM_B26_PU_ACT_56",
    "effectText": "Khi tiêu diệt quái thú đối phương: Bức xạ hạt nhân thiêu đốt 540 LP đối thủ và làm giảm 200 ATK của toàn bộ quái thú đối phương.",
    "scientificLore": "Plutoni (Z=94) thuộc họ Actini, hạt nhân phóng xạ không bền có chu kỳ bán rã đặc trưng, giải phóng năng lượng liên kết hạt nhân cực lớn.",
    "relatedEquation": "Pu + O₂ → PuO₂",
    "iupacName": "Plutonium",
    "archetype": "ACTINIDE_FISSION",
    "structuredEffects": [
      {
        "effectId": "B26_EFF_56",
        "activationWindow": "ON_DESTROY_MONSTER",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 350
            }
          }
        ],
        "description": "Bức xạ phân hạch thiêu đốt LP đối thủ."
      }
    ]
  },
  {
    "id": "card_b26_057_am_57",
    "name": "Americi — Thần Tượng Phân Rã Hạt Nhân (Biến Thể 6)",
    "name_en": "Americium — Thần Tượng Phân Rã Hạt Nhân Mod-6",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "PYRO",
    "manaCost": 4,
    "level": 5,
    "atk": 2795,
    "def": 2350,
    "chemicalFormula": "AmO2",
    "atomicNumber": 95,
    "effectCode": "ELEM_B26_AM_ACT_57",
    "effectText": "Khi tiêu diệt quái thú đối phương: Bức xạ hạt nhân thiêu đốt 300 LP đối thủ và làm giảm 200 ATK của toàn bộ quái thú đối phương.",
    "scientificLore": "Americi (Z=95) thuộc họ Actini, hạt nhân phóng xạ không bền có chu kỳ bán rã đặc trưng, giải phóng năng lượng liên kết hạt nhân cực lớn.",
    "relatedEquation": "Am + O₂ → AmO₂",
    "iupacName": "Americium",
    "archetype": "ACTINIDE_FISSION",
    "structuredEffects": [
      {
        "effectId": "B26_EFF_57",
        "activationWindow": "ON_DESTROY_MONSTER",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 350
            }
          }
        ],
        "description": "Bức xạ phân hạch thiêu đốt LP đối thủ."
      }
    ]
  },
  {
    "id": "card_b26_058_cm_58",
    "name": "Curi — Thần Tượng Phân Rã Hạt Nhân (Biến Thể 6)",
    "name_en": "Curium — Thần Tượng Phân Rã Hạt Nhân Mod-6",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "ACID_DARK",
    "manaCost": 5,
    "level": 6,
    "atk": 3050,
    "def": 2540,
    "chemicalFormula": "Cm2O3",
    "atomicNumber": 96,
    "effectCode": "ELEM_B26_CM_ACT_58",
    "effectText": "Khi tiêu diệt quái thú đối phương: Bức xạ hạt nhân thiêu đốt 380 LP đối thủ và làm giảm 200 ATK của toàn bộ quái thú đối phương.",
    "scientificLore": "Curi (Z=96) thuộc họ Actini, hạt nhân phóng xạ không bền có chu kỳ bán rã đặc trưng, giải phóng năng lượng liên kết hạt nhân cực lớn.",
    "relatedEquation": "2Cm + 3/2O₂ → Cm₂O₃",
    "iupacName": "Curium",
    "archetype": "ACTINIDE_FISSION",
    "structuredEffects": [
      {
        "effectId": "B26_EFF_58",
        "activationWindow": "ON_DESTROY_MONSTER",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 350
            }
          }
        ],
        "description": "Bức xạ phân hạch thiêu đốt LP đối thủ."
      }
    ]
  },
  {
    "id": "card_b26_059_bk_59",
    "name": "Berkeli — Thần Tượng Phân Rã Hạt Nhân (Biến Thể 6)",
    "name_en": "Berkelium — Thần Tượng Phân Rã Hạt Nhân Mod-6",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "ACID_DARK",
    "manaCost": 5,
    "level": 7,
    "atk": 3305,
    "def": 2730,
    "chemicalFormula": "BkO2",
    "atomicNumber": 97,
    "effectCode": "ELEM_B26_BK_ACT_59",
    "effectText": "Khi tiêu diệt quái thú đối phương: Bức xạ hạt nhân thiêu đốt 460 LP đối thủ và làm giảm 200 ATK của toàn bộ quái thú đối phương.",
    "scientificLore": "Berkeli (Z=97) thuộc họ Actini, hạt nhân phóng xạ không bền có chu kỳ bán rã đặc trưng, giải phóng năng lượng liên kết hạt nhân cực lớn.",
    "relatedEquation": "Bk + O₂ → BkO₂",
    "iupacName": "Berkelium",
    "archetype": "ACTINIDE_FISSION",
    "structuredEffects": [
      {
        "effectId": "B26_EFF_59",
        "activationWindow": "ON_DESTROY_MONSTER",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 350
            }
          }
        ],
        "description": "Bức xạ phân hạch thiêu đốt LP đối thủ."
      }
    ]
  },
  {
    "id": "card_b26_060_cf_60",
    "name": "Californi — Thần Tượng Phân Rã Hạt Nhân (Biến Thể 6)",
    "name_en": "Californium — Thần Tượng Phân Rã Hạt Nhân Mod-6",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "ULTRA_RARE",
    "attribute": "NOBLE_VOID",
    "manaCost": 6,
    "level": 8,
    "atk": 3560,
    "def": 2920,
    "chemicalFormula": "Cf2O3",
    "atomicNumber": 98,
    "effectCode": "ELEM_B26_CF_ACT_60",
    "effectText": "Khi tiêu diệt quái thú đối phương: Bức xạ hạt nhân thiêu đốt 540 LP đối thủ và làm giảm 200 ATK của toàn bộ quái thú đối phương.",
    "scientificLore": "Californi (Z=98) thuộc họ Actini, hạt nhân phóng xạ không bền có chu kỳ bán rã đặc trưng, giải phóng năng lượng liên kết hạt nhân cực lớn.",
    "relatedEquation": "2Cf + 3/2O₂ → Cf₂O₃",
    "iupacName": "Californium",
    "archetype": "ACTINIDE_FISSION",
    "structuredEffects": [
      {
        "effectId": "B26_EFF_60",
        "activationWindow": "ON_DESTROY_MONSTER",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 350
            }
          }
        ],
        "description": "Bức xạ phân hạch thiêu đốt LP đối thủ."
      }
    ]
  },
  {
    "id": "card_b26_061_ac_61",
    "name": "Actini — Bậc Thầy Bán Rã (Biến Thể 7)",
    "name_en": "Actinium — Bậc Thầy Bán Rã Mod-7",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SECRET_RARE",
    "attribute": "ACID_DARK",
    "manaCost": 3,
    "level": 4,
    "atk": 2540,
    "def": 2160,
    "chemicalFormula": "Ac2O3",
    "atomicNumber": 89,
    "effectCode": "ELEM_B26_AC_ACT_61",
    "effectText": "Khi tiêu diệt quái thú đối phương: Bức xạ hạt nhân thiêu đốt 300 LP đối thủ và làm giảm 200 ATK của toàn bộ quái thú đối phương.",
    "scientificLore": "Actini (Z=89) thuộc họ Actini, hạt nhân phóng xạ không bền có chu kỳ bán rã đặc trưng, giải phóng năng lượng liên kết hạt nhân cực lớn.",
    "relatedEquation": "2Ac + 3/2O₂ → Ac₂O₃",
    "iupacName": "Actinium",
    "archetype": "ACTINIDE_FISSION",
    "structuredEffects": [
      {
        "effectId": "B26_EFF_61",
        "activationWindow": "ON_DESTROY_MONSTER",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 350
            }
          }
        ],
        "description": "Bức xạ phân hạch thiêu đốt LP đối thủ."
      }
    ]
  },
  {
    "id": "card_b26_062_th_62",
    "name": "Thori — Bậc Thầy Bán Rã (Biến Thể 7)",
    "name_en": "Thorium — Bậc Thầy Bán Rã Mod-7",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "PYRO",
    "manaCost": 4,
    "level": 5,
    "atk": 2795,
    "def": 2350,
    "chemicalFormula": "ThO2",
    "atomicNumber": 90,
    "effectCode": "ELEM_B26_TH_ACT_62",
    "effectText": "Khi tiêu diệt quái thú đối phương: Bức xạ hạt nhân thiêu đốt 380 LP đối thủ và làm giảm 200 ATK của toàn bộ quái thú đối phương.",
    "scientificLore": "Thori (Z=90) thuộc họ Actini, hạt nhân phóng xạ không bền có chu kỳ bán rã đặc trưng, giải phóng năng lượng liên kết hạt nhân cực lớn.",
    "relatedEquation": "Th + O₂ → ThO₂",
    "iupacName": "Thorium",
    "archetype": "ACTINIDE_FISSION",
    "structuredEffects": [
      {
        "effectId": "B26_EFF_62",
        "activationWindow": "ON_DESTROY_MONSTER",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 350
            }
          }
        ],
        "description": "Bức xạ phân hạch thiêu đốt LP đối thủ."
      }
    ]
  },
  {
    "id": "card_b26_063_pa_63",
    "name": "Protactini — Bậc Thầy Bán Rã (Biến Thể 7)",
    "name_en": "Protactinium — Bậc Thầy Bán Rã Mod-7",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "ACID_DARK",
    "manaCost": 5,
    "level": 6,
    "atk": 3050,
    "def": 2540,
    "chemicalFormula": "Pa2O5",
    "atomicNumber": 91,
    "effectCode": "ELEM_B26_PA_ACT_63",
    "effectText": "Khi tiêu diệt quái thú đối phương: Bức xạ hạt nhân thiêu đốt 460 LP đối thủ và làm giảm 200 ATK của toàn bộ quái thú đối phương.",
    "scientificLore": "Protactini (Z=91) thuộc họ Actini, hạt nhân phóng xạ không bền có chu kỳ bán rã đặc trưng, giải phóng năng lượng liên kết hạt nhân cực lớn.",
    "relatedEquation": "2Pa + 5/2O₂ → Pa₂O₅",
    "iupacName": "Protactinium",
    "archetype": "ACTINIDE_FISSION",
    "structuredEffects": [
      {
        "effectId": "B26_EFF_63",
        "activationWindow": "ON_DESTROY_MONSTER",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 350
            }
          }
        ],
        "description": "Bức xạ phân hạch thiêu đốt LP đối thủ."
      }
    ]
  },
  {
    "id": "card_b26_064_u_64",
    "name": "Urani — Bậc Thầy Bán Rã (Biến Thể 7)",
    "name_en": "Uranium — Bậc Thầy Bán Rã Mod-7",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "ACID_DARK",
    "manaCost": 5,
    "level": 7,
    "atk": 3305,
    "def": 2730,
    "chemicalFormula": "UO2(NO3)2",
    "atomicNumber": 92,
    "effectCode": "ELEM_B26_U_ACT_64",
    "effectText": "Khi tiêu diệt quái thú đối phương: Bức xạ hạt nhân thiêu đốt 540 LP đối thủ và làm giảm 200 ATK của toàn bộ quái thú đối phương.",
    "scientificLore": "Urani (Z=92) thuộc họ Actini, hạt nhân phóng xạ không bền có chu kỳ bán rã đặc trưng, giải phóng năng lượng liên kết hạt nhân cực lớn.",
    "relatedEquation": "U + 4HNO₃ → UO₂(NO₃)₂ + 2NO₂ + 2H₂O",
    "iupacName": "Uranium",
    "archetype": "ACTINIDE_FISSION",
    "structuredEffects": [
      {
        "effectId": "B26_EFF_64",
        "activationWindow": "ON_DESTROY_MONSTER",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 350
            }
          }
        ],
        "description": "Bức xạ phân hạch thiêu đốt LP đối thủ."
      }
    ]
  },
  {
    "id": "card_b26_065_np_65",
    "name": "Neptuni — Bậc Thầy Bán Rã (Biến Thể 7)",
    "name_en": "Neptunium — Bậc Thầy Bán Rã Mod-7",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "ACID_DARK",
    "manaCost": 6,
    "level": 8,
    "atk": 3560,
    "def": 2920,
    "chemicalFormula": "NpO2",
    "atomicNumber": 93,
    "effectCode": "ELEM_B26_NP_ACT_65",
    "effectText": "Khi tiêu diệt quái thú đối phương: Bức xạ hạt nhân thiêu đốt 300 LP đối thủ và làm giảm 200 ATK của toàn bộ quái thú đối phương.",
    "scientificLore": "Neptuni (Z=93) thuộc họ Actini, hạt nhân phóng xạ không bền có chu kỳ bán rã đặc trưng, giải phóng năng lượng liên kết hạt nhân cực lớn.",
    "relatedEquation": "Np + O₂ → NpO₂",
    "iupacName": "Neptunium",
    "archetype": "ACTINIDE_FISSION",
    "structuredEffects": [
      {
        "effectId": "B26_EFF_65",
        "activationWindow": "ON_DESTROY_MONSTER",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 350
            }
          }
        ],
        "description": "Bức xạ phân hạch thiêu đốt LP đối thủ."
      }
    ]
  },
  {
    "id": "card_b26_066_pu_66",
    "name": "Plutoni — Bậc Thầy Bán Rã (Biến Thể 7)",
    "name_en": "Plutonium — Bậc Thầy Bán Rã Mod-7",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "PYRO",
    "manaCost": 3,
    "level": 4,
    "atk": 2540,
    "def": 2160,
    "chemicalFormula": "PuO2",
    "atomicNumber": 94,
    "effectCode": "ELEM_B26_PU_ACT_66",
    "effectText": "Khi tiêu diệt quái thú đối phương: Bức xạ hạt nhân thiêu đốt 380 LP đối thủ và làm giảm 200 ATK của toàn bộ quái thú đối phương.",
    "scientificLore": "Plutoni (Z=94) thuộc họ Actini, hạt nhân phóng xạ không bền có chu kỳ bán rã đặc trưng, giải phóng năng lượng liên kết hạt nhân cực lớn.",
    "relatedEquation": "Pu + O₂ → PuO₂",
    "iupacName": "Plutonium",
    "archetype": "ACTINIDE_FISSION",
    "structuredEffects": [
      {
        "effectId": "B26_EFF_66",
        "activationWindow": "ON_DESTROY_MONSTER",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 350
            }
          }
        ],
        "description": "Bức xạ phân hạch thiêu đốt LP đối thủ."
      }
    ]
  },
  {
    "id": "card_b26_067_am_67",
    "name": "Americi — Bậc Thầy Bán Rã (Biến Thể 7)",
    "name_en": "Americium — Bậc Thầy Bán Rã Mod-7",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "PYRO",
    "manaCost": 4,
    "level": 5,
    "atk": 2795,
    "def": 2350,
    "chemicalFormula": "AmO2",
    "atomicNumber": 95,
    "effectCode": "ELEM_B26_AM_ACT_67",
    "effectText": "Khi tiêu diệt quái thú đối phương: Bức xạ hạt nhân thiêu đốt 460 LP đối thủ và làm giảm 200 ATK của toàn bộ quái thú đối phương.",
    "scientificLore": "Americi (Z=95) thuộc họ Actini, hạt nhân phóng xạ không bền có chu kỳ bán rã đặc trưng, giải phóng năng lượng liên kết hạt nhân cực lớn.",
    "relatedEquation": "Am + O₂ → AmO₂",
    "iupacName": "Americium",
    "archetype": "ACTINIDE_FISSION",
    "structuredEffects": [
      {
        "effectId": "B26_EFF_67",
        "activationWindow": "ON_DESTROY_MONSTER",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 350
            }
          }
        ],
        "description": "Bức xạ phân hạch thiêu đốt LP đối thủ."
      }
    ]
  },
  {
    "id": "card_b26_068_cm_68",
    "name": "Curi — Bậc Thầy Bán Rã (Biến Thể 7)",
    "name_en": "Curium — Bậc Thầy Bán Rã Mod-7",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "ACID_DARK",
    "manaCost": 5,
    "level": 6,
    "atk": 3050,
    "def": 2540,
    "chemicalFormula": "Cm2O3",
    "atomicNumber": 96,
    "effectCode": "ELEM_B26_CM_ACT_68",
    "effectText": "Khi tiêu diệt quái thú đối phương: Bức xạ hạt nhân thiêu đốt 540 LP đối thủ và làm giảm 200 ATK của toàn bộ quái thú đối phương.",
    "scientificLore": "Curi (Z=96) thuộc họ Actini, hạt nhân phóng xạ không bền có chu kỳ bán rã đặc trưng, giải phóng năng lượng liên kết hạt nhân cực lớn.",
    "relatedEquation": "2Cm + 3/2O₂ → Cm₂O₃",
    "iupacName": "Curium",
    "archetype": "ACTINIDE_FISSION",
    "structuredEffects": [
      {
        "effectId": "B26_EFF_68",
        "activationWindow": "ON_DESTROY_MONSTER",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 350
            }
          }
        ],
        "description": "Bức xạ phân hạch thiêu đốt LP đối thủ."
      }
    ]
  },
  {
    "id": "card_b26_069_bk_69",
    "name": "Berkeli — Bậc Thầy Bán Rã (Biến Thể 7)",
    "name_en": "Berkelium — Bậc Thầy Bán Rã Mod-7",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "ULTRA_RARE",
    "attribute": "ACID_DARK",
    "manaCost": 5,
    "level": 7,
    "atk": 3305,
    "def": 2730,
    "chemicalFormula": "BkO2",
    "atomicNumber": 97,
    "effectCode": "ELEM_B26_BK_ACT_69",
    "effectText": "Khi tiêu diệt quái thú đối phương: Bức xạ hạt nhân thiêu đốt 300 LP đối thủ và làm giảm 200 ATK của toàn bộ quái thú đối phương.",
    "scientificLore": "Berkeli (Z=97) thuộc họ Actini, hạt nhân phóng xạ không bền có chu kỳ bán rã đặc trưng, giải phóng năng lượng liên kết hạt nhân cực lớn.",
    "relatedEquation": "Bk + O₂ → BkO₂",
    "iupacName": "Berkelium",
    "archetype": "ACTINIDE_FISSION",
    "structuredEffects": [
      {
        "effectId": "B26_EFF_69",
        "activationWindow": "ON_DESTROY_MONSTER",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 350
            }
          }
        ],
        "description": "Bức xạ phân hạch thiêu đốt LP đối thủ."
      }
    ]
  },
  {
    "id": "card_b26_070_cf_70",
    "name": "Californi — Bậc Thầy Bán Rã (Biến Thể 7)",
    "name_en": "Californium — Bậc Thầy Bán Rã Mod-7",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SECRET_RARE",
    "attribute": "NOBLE_VOID",
    "manaCost": 6,
    "level": 8,
    "atk": 3560,
    "def": 2920,
    "chemicalFormula": "Cf2O3",
    "atomicNumber": 98,
    "effectCode": "ELEM_B26_CF_ACT_70",
    "effectText": "Khi tiêu diệt quái thú đối phương: Bức xạ hạt nhân thiêu đốt 380 LP đối thủ và làm giảm 200 ATK của toàn bộ quái thú đối phương.",
    "scientificLore": "Californi (Z=98) thuộc họ Actini, hạt nhân phóng xạ không bền có chu kỳ bán rã đặc trưng, giải phóng năng lượng liên kết hạt nhân cực lớn.",
    "relatedEquation": "2Cf + 3/2O₂ → Cf₂O₃",
    "iupacName": "Californium",
    "archetype": "ACTINIDE_FISSION",
    "structuredEffects": [
      {
        "effectId": "B26_EFF_70",
        "activationWindow": "ON_DESTROY_MONSTER",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 350
            }
          }
        ],
        "description": "Bức xạ phân hạch thiêu đốt LP đối thủ."
      }
    ]
  },
  {
    "id": "card_b26_071_ac_71",
    "name": "Actini — Kẻ Thao Túng Tia Gamma (Biến Thể 8)",
    "name_en": "Actinium — Kẻ Thao Túng Tia Gamma Mod-8",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "ACID_DARK",
    "manaCost": 3,
    "level": 4,
    "atk": 2540,
    "def": 2160,
    "chemicalFormula": "Ac2O3",
    "atomicNumber": 89,
    "effectCode": "ELEM_B26_AC_ACT_71",
    "effectText": "Khi tiêu diệt quái thú đối phương: Bức xạ hạt nhân thiêu đốt 460 LP đối thủ và làm giảm 200 ATK của toàn bộ quái thú đối phương.",
    "scientificLore": "Actini (Z=89) thuộc họ Actini, hạt nhân phóng xạ không bền có chu kỳ bán rã đặc trưng, giải phóng năng lượng liên kết hạt nhân cực lớn.",
    "relatedEquation": "2Ac + 3/2O₂ → Ac₂O₃",
    "iupacName": "Actinium",
    "archetype": "ACTINIDE_FISSION",
    "structuredEffects": [
      {
        "effectId": "B26_EFF_71",
        "activationWindow": "ON_DESTROY_MONSTER",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 350
            }
          }
        ],
        "description": "Bức xạ phân hạch thiêu đốt LP đối thủ."
      }
    ]
  },
  {
    "id": "card_b26_072_th_72",
    "name": "Thori — Kẻ Thao Túng Tia Gamma (Biến Thể 8)",
    "name_en": "Thorium — Kẻ Thao Túng Tia Gamma Mod-8",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "PYRO",
    "manaCost": 4,
    "level": 5,
    "atk": 2795,
    "def": 2350,
    "chemicalFormula": "ThO2",
    "atomicNumber": 90,
    "effectCode": "ELEM_B26_TH_ACT_72",
    "effectText": "Khi tiêu diệt quái thú đối phương: Bức xạ hạt nhân thiêu đốt 540 LP đối thủ và làm giảm 200 ATK của toàn bộ quái thú đối phương.",
    "scientificLore": "Thori (Z=90) thuộc họ Actini, hạt nhân phóng xạ không bền có chu kỳ bán rã đặc trưng, giải phóng năng lượng liên kết hạt nhân cực lớn.",
    "relatedEquation": "Th + O₂ → ThO₂",
    "iupacName": "Thorium",
    "archetype": "ACTINIDE_FISSION",
    "structuredEffects": [
      {
        "effectId": "B26_EFF_72",
        "activationWindow": "ON_DESTROY_MONSTER",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 350
            }
          }
        ],
        "description": "Bức xạ phân hạch thiêu đốt LP đối thủ."
      }
    ]
  },
  {
    "id": "card_b26_073_pa_73",
    "name": "Protactini — Kẻ Thao Túng Tia Gamma (Biến Thể 8)",
    "name_en": "Protactinium — Kẻ Thao Túng Tia Gamma Mod-8",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "ACID_DARK",
    "manaCost": 5,
    "level": 6,
    "atk": 3050,
    "def": 2540,
    "chemicalFormula": "Pa2O5",
    "atomicNumber": 91,
    "effectCode": "ELEM_B26_PA_ACT_73",
    "effectText": "Khi tiêu diệt quái thú đối phương: Bức xạ hạt nhân thiêu đốt 300 LP đối thủ và làm giảm 200 ATK của toàn bộ quái thú đối phương.",
    "scientificLore": "Protactini (Z=91) thuộc họ Actini, hạt nhân phóng xạ không bền có chu kỳ bán rã đặc trưng, giải phóng năng lượng liên kết hạt nhân cực lớn.",
    "relatedEquation": "2Pa + 5/2O₂ → Pa₂O₅",
    "iupacName": "Protactinium",
    "archetype": "ACTINIDE_FISSION",
    "structuredEffects": [
      {
        "effectId": "B26_EFF_73",
        "activationWindow": "ON_DESTROY_MONSTER",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 350
            }
          }
        ],
        "description": "Bức xạ phân hạch thiêu đốt LP đối thủ."
      }
    ]
  },
  {
    "id": "card_b26_074_u_74",
    "name": "Urani — Kẻ Thao Túng Tia Gamma (Biến Thể 8)",
    "name_en": "Uranium — Kẻ Thao Túng Tia Gamma Mod-8",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "ACID_DARK",
    "manaCost": 5,
    "level": 7,
    "atk": 3305,
    "def": 2730,
    "chemicalFormula": "UO2(NO3)2",
    "atomicNumber": 92,
    "effectCode": "ELEM_B26_U_ACT_74",
    "effectText": "Khi tiêu diệt quái thú đối phương: Bức xạ hạt nhân thiêu đốt 380 LP đối thủ và làm giảm 200 ATK của toàn bộ quái thú đối phương.",
    "scientificLore": "Urani (Z=92) thuộc họ Actini, hạt nhân phóng xạ không bền có chu kỳ bán rã đặc trưng, giải phóng năng lượng liên kết hạt nhân cực lớn.",
    "relatedEquation": "U + 4HNO₃ → UO₂(NO₃)₂ + 2NO₂ + 2H₂O",
    "iupacName": "Uranium",
    "archetype": "ACTINIDE_FISSION",
    "structuredEffects": [
      {
        "effectId": "B26_EFF_74",
        "activationWindow": "ON_DESTROY_MONSTER",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 350
            }
          }
        ],
        "description": "Bức xạ phân hạch thiêu đốt LP đối thủ."
      }
    ]
  },
  {
    "id": "card_b26_075_np_75",
    "name": "Neptuni — Kẻ Thao Túng Tia Gamma (Biến Thể 8)",
    "name_en": "Neptunium — Kẻ Thao Túng Tia Gamma Mod-8",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "ACID_DARK",
    "manaCost": 6,
    "level": 8,
    "atk": 3560,
    "def": 2920,
    "chemicalFormula": "NpO2",
    "atomicNumber": 93,
    "effectCode": "ELEM_B26_NP_ACT_75",
    "effectText": "Khi tiêu diệt quái thú đối phương: Bức xạ hạt nhân thiêu đốt 460 LP đối thủ và làm giảm 200 ATK của toàn bộ quái thú đối phương.",
    "scientificLore": "Neptuni (Z=93) thuộc họ Actini, hạt nhân phóng xạ không bền có chu kỳ bán rã đặc trưng, giải phóng năng lượng liên kết hạt nhân cực lớn.",
    "relatedEquation": "Np + O₂ → NpO₂",
    "iupacName": "Neptunium",
    "archetype": "ACTINIDE_FISSION",
    "structuredEffects": [
      {
        "effectId": "B26_EFF_75",
        "activationWindow": "ON_DESTROY_MONSTER",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 350
            }
          }
        ],
        "description": "Bức xạ phân hạch thiêu đốt LP đối thủ."
      }
    ]
  },
  {
    "id": "card_b26_076_pu_76",
    "name": "Plutoni — Kẻ Thao Túng Tia Gamma (Biến Thể 8)",
    "name_en": "Plutonium — Kẻ Thao Túng Tia Gamma Mod-8",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "PYRO",
    "manaCost": 3,
    "level": 4,
    "atk": 2540,
    "def": 2160,
    "chemicalFormula": "PuO2",
    "atomicNumber": 94,
    "effectCode": "ELEM_B26_PU_ACT_76",
    "effectText": "Khi tiêu diệt quái thú đối phương: Bức xạ hạt nhân thiêu đốt 540 LP đối thủ và làm giảm 200 ATK của toàn bộ quái thú đối phương.",
    "scientificLore": "Plutoni (Z=94) thuộc họ Actini, hạt nhân phóng xạ không bền có chu kỳ bán rã đặc trưng, giải phóng năng lượng liên kết hạt nhân cực lớn.",
    "relatedEquation": "Pu + O₂ → PuO₂",
    "iupacName": "Plutonium",
    "archetype": "ACTINIDE_FISSION",
    "structuredEffects": [
      {
        "effectId": "B26_EFF_76",
        "activationWindow": "ON_DESTROY_MONSTER",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 350
            }
          }
        ],
        "description": "Bức xạ phân hạch thiêu đốt LP đối thủ."
      }
    ]
  },
  {
    "id": "card_b26_077_am_77",
    "name": "Americi — Kẻ Thao Túng Tia Gamma (Biến Thể 8)",
    "name_en": "Americium — Kẻ Thao Túng Tia Gamma Mod-8",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "PYRO",
    "manaCost": 4,
    "level": 5,
    "atk": 2795,
    "def": 2350,
    "chemicalFormula": "AmO2",
    "atomicNumber": 95,
    "effectCode": "ELEM_B26_AM_ACT_77",
    "effectText": "Khi tiêu diệt quái thú đối phương: Bức xạ hạt nhân thiêu đốt 300 LP đối thủ và làm giảm 200 ATK của toàn bộ quái thú đối phương.",
    "scientificLore": "Americi (Z=95) thuộc họ Actini, hạt nhân phóng xạ không bền có chu kỳ bán rã đặc trưng, giải phóng năng lượng liên kết hạt nhân cực lớn.",
    "relatedEquation": "Am + O₂ → AmO₂",
    "iupacName": "Americium",
    "archetype": "ACTINIDE_FISSION",
    "structuredEffects": [
      {
        "effectId": "B26_EFF_77",
        "activationWindow": "ON_DESTROY_MONSTER",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 350
            }
          }
        ],
        "description": "Bức xạ phân hạch thiêu đốt LP đối thủ."
      }
    ]
  },
  {
    "id": "card_b26_078_cm_78",
    "name": "Curi — Kẻ Thao Túng Tia Gamma (Biến Thể 8)",
    "name_en": "Curium — Kẻ Thao Túng Tia Gamma Mod-8",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "ULTRA_RARE",
    "attribute": "ACID_DARK",
    "manaCost": 5,
    "level": 6,
    "atk": 3050,
    "def": 2540,
    "chemicalFormula": "Cm2O3",
    "atomicNumber": 96,
    "effectCode": "ELEM_B26_CM_ACT_78",
    "effectText": "Khi tiêu diệt quái thú đối phương: Bức xạ hạt nhân thiêu đốt 380 LP đối thủ và làm giảm 200 ATK của toàn bộ quái thú đối phương.",
    "scientificLore": "Curi (Z=96) thuộc họ Actini, hạt nhân phóng xạ không bền có chu kỳ bán rã đặc trưng, giải phóng năng lượng liên kết hạt nhân cực lớn.",
    "relatedEquation": "2Cm + 3/2O₂ → Cm₂O₃",
    "iupacName": "Curium",
    "archetype": "ACTINIDE_FISSION",
    "structuredEffects": [
      {
        "effectId": "B26_EFF_78",
        "activationWindow": "ON_DESTROY_MONSTER",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 350
            }
          }
        ],
        "description": "Bức xạ phân hạch thiêu đốt LP đối thủ."
      }
    ]
  },
  {
    "id": "card_b26_079_bk_79",
    "name": "Berkeli — Kẻ Thao Túng Tia Gamma (Biến Thể 8)",
    "name_en": "Berkelium — Kẻ Thao Túng Tia Gamma Mod-8",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SECRET_RARE",
    "attribute": "ACID_DARK",
    "manaCost": 5,
    "level": 7,
    "atk": 3305,
    "def": 2730,
    "chemicalFormula": "BkO2",
    "atomicNumber": 97,
    "effectCode": "ELEM_B26_BK_ACT_79",
    "effectText": "Khi tiêu diệt quái thú đối phương: Bức xạ hạt nhân thiêu đốt 460 LP đối thủ và làm giảm 200 ATK của toàn bộ quái thú đối phương.",
    "scientificLore": "Berkeli (Z=97) thuộc họ Actini, hạt nhân phóng xạ không bền có chu kỳ bán rã đặc trưng, giải phóng năng lượng liên kết hạt nhân cực lớn.",
    "relatedEquation": "Bk + O₂ → BkO₂",
    "iupacName": "Berkelium",
    "archetype": "ACTINIDE_FISSION",
    "structuredEffects": [
      {
        "effectId": "B26_EFF_79",
        "activationWindow": "ON_DESTROY_MONSTER",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 350
            }
          }
        ],
        "description": "Bức xạ phân hạch thiêu đốt LP đối thủ."
      }
    ]
  },
  {
    "id": "card_b26_080_cf_80",
    "name": "Californi — Kẻ Thao Túng Tia Gamma (Biến Thể 8)",
    "name_en": "Californium — Kẻ Thao Túng Tia Gamma Mod-8",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "NOBLE_VOID",
    "manaCost": 6,
    "level": 8,
    "atk": 3560,
    "def": 2920,
    "chemicalFormula": "Cf2O3",
    "atomicNumber": 98,
    "effectCode": "ELEM_B26_CF_ACT_80",
    "effectText": "Khi tiêu diệt quái thú đối phương: Bức xạ hạt nhân thiêu đốt 540 LP đối thủ và làm giảm 200 ATK của toàn bộ quái thú đối phương.",
    "scientificLore": "Californi (Z=98) thuộc họ Actini, hạt nhân phóng xạ không bền có chu kỳ bán rã đặc trưng, giải phóng năng lượng liên kết hạt nhân cực lớn.",
    "relatedEquation": "2Cf + 3/2O₂ → Cf₂O₃",
    "iupacName": "Californium",
    "archetype": "ACTINIDE_FISSION",
    "structuredEffects": [
      {
        "effectId": "B26_EFF_80",
        "activationWindow": "ON_DESTROY_MONSTER",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 350
            }
          }
        ],
        "description": "Bức xạ phân hạch thiêu đốt LP đối thủ."
      }
    ]
  },
  {
    "id": "card_b26_081_ac_81",
    "name": "Actini — Chúa Tể Phân Hạch (Biến Thể 9)",
    "name_en": "Actinium — Chúa Tể Phân Hạch Mod-9",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "ACID_DARK",
    "manaCost": 3,
    "level": 4,
    "atk": 2540,
    "def": 2160,
    "chemicalFormula": "Ac2O3",
    "atomicNumber": 89,
    "effectCode": "ELEM_B26_AC_ACT_81",
    "effectText": "Khi tiêu diệt quái thú đối phương: Bức xạ hạt nhân thiêu đốt 300 LP đối thủ và làm giảm 200 ATK của toàn bộ quái thú đối phương.",
    "scientificLore": "Actini (Z=89) thuộc họ Actini, hạt nhân phóng xạ không bền có chu kỳ bán rã đặc trưng, giải phóng năng lượng liên kết hạt nhân cực lớn.",
    "relatedEquation": "2Ac + 3/2O₂ → Ac₂O₃",
    "iupacName": "Actinium",
    "archetype": "ACTINIDE_FISSION",
    "structuredEffects": [
      {
        "effectId": "B26_EFF_81",
        "activationWindow": "ON_DESTROY_MONSTER",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 350
            }
          }
        ],
        "description": "Bức xạ phân hạch thiêu đốt LP đối thủ."
      }
    ]
  },
  {
    "id": "card_b26_082_th_82",
    "name": "Thori — Chúa Tể Phân Hạch (Biến Thể 9)",
    "name_en": "Thorium — Chúa Tể Phân Hạch Mod-9",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "PYRO",
    "manaCost": 4,
    "level": 5,
    "atk": 2795,
    "def": 2350,
    "chemicalFormula": "ThO2",
    "atomicNumber": 90,
    "effectCode": "ELEM_B26_TH_ACT_82",
    "effectText": "Khi tiêu diệt quái thú đối phương: Bức xạ hạt nhân thiêu đốt 380 LP đối thủ và làm giảm 200 ATK của toàn bộ quái thú đối phương.",
    "scientificLore": "Thori (Z=90) thuộc họ Actini, hạt nhân phóng xạ không bền có chu kỳ bán rã đặc trưng, giải phóng năng lượng liên kết hạt nhân cực lớn.",
    "relatedEquation": "Th + O₂ → ThO₂",
    "iupacName": "Thorium",
    "archetype": "ACTINIDE_FISSION",
    "structuredEffects": [
      {
        "effectId": "B26_EFF_82",
        "activationWindow": "ON_DESTROY_MONSTER",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 350
            }
          }
        ],
        "description": "Bức xạ phân hạch thiêu đốt LP đối thủ."
      }
    ]
  },
  {
    "id": "card_b26_083_pa_83",
    "name": "Protactini — Chúa Tể Phân Hạch (Biến Thể 9)",
    "name_en": "Protactinium — Chúa Tể Phân Hạch Mod-9",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "ACID_DARK",
    "manaCost": 5,
    "level": 6,
    "atk": 3050,
    "def": 2540,
    "chemicalFormula": "Pa2O5",
    "atomicNumber": 91,
    "effectCode": "ELEM_B26_PA_ACT_83",
    "effectText": "Khi tiêu diệt quái thú đối phương: Bức xạ hạt nhân thiêu đốt 460 LP đối thủ và làm giảm 200 ATK của toàn bộ quái thú đối phương.",
    "scientificLore": "Protactini (Z=91) thuộc họ Actini, hạt nhân phóng xạ không bền có chu kỳ bán rã đặc trưng, giải phóng năng lượng liên kết hạt nhân cực lớn.",
    "relatedEquation": "2Pa + 5/2O₂ → Pa₂O₅",
    "iupacName": "Protactinium",
    "archetype": "ACTINIDE_FISSION",
    "structuredEffects": [
      {
        "effectId": "B26_EFF_83",
        "activationWindow": "ON_DESTROY_MONSTER",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 350
            }
          }
        ],
        "description": "Bức xạ phân hạch thiêu đốt LP đối thủ."
      }
    ]
  },
  {
    "id": "card_b26_084_u_84",
    "name": "Urani — Chúa Tể Phân Hạch (Biến Thể 9)",
    "name_en": "Uranium — Chúa Tể Phân Hạch Mod-9",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "ACID_DARK",
    "manaCost": 5,
    "level": 7,
    "atk": 3305,
    "def": 2730,
    "chemicalFormula": "UO2(NO3)2",
    "atomicNumber": 92,
    "effectCode": "ELEM_B26_U_ACT_84",
    "effectText": "Khi tiêu diệt quái thú đối phương: Bức xạ hạt nhân thiêu đốt 540 LP đối thủ và làm giảm 200 ATK của toàn bộ quái thú đối phương.",
    "scientificLore": "Urani (Z=92) thuộc họ Actini, hạt nhân phóng xạ không bền có chu kỳ bán rã đặc trưng, giải phóng năng lượng liên kết hạt nhân cực lớn.",
    "relatedEquation": "U + 4HNO₃ → UO₂(NO₃)₂ + 2NO₂ + 2H₂O",
    "iupacName": "Uranium",
    "archetype": "ACTINIDE_FISSION",
    "structuredEffects": [
      {
        "effectId": "B26_EFF_84",
        "activationWindow": "ON_DESTROY_MONSTER",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 350
            }
          }
        ],
        "description": "Bức xạ phân hạch thiêu đốt LP đối thủ."
      }
    ]
  },
  {
    "id": "card_b26_085_np_85",
    "name": "Neptuni — Chúa Tể Phân Hạch (Biến Thể 9)",
    "name_en": "Neptunium — Chúa Tể Phân Hạch Mod-9",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "ACID_DARK",
    "manaCost": 6,
    "level": 8,
    "atk": 3560,
    "def": 2920,
    "chemicalFormula": "NpO2",
    "atomicNumber": 93,
    "effectCode": "ELEM_B26_NP_ACT_85",
    "effectText": "Khi tiêu diệt quái thú đối phương: Bức xạ hạt nhân thiêu đốt 300 LP đối thủ và làm giảm 200 ATK của toàn bộ quái thú đối phương.",
    "scientificLore": "Neptuni (Z=93) thuộc họ Actini, hạt nhân phóng xạ không bền có chu kỳ bán rã đặc trưng, giải phóng năng lượng liên kết hạt nhân cực lớn.",
    "relatedEquation": "Np + O₂ → NpO₂",
    "iupacName": "Neptunium",
    "archetype": "ACTINIDE_FISSION",
    "structuredEffects": [
      {
        "effectId": "B26_EFF_85",
        "activationWindow": "ON_DESTROY_MONSTER",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 350
            }
          }
        ],
        "description": "Bức xạ phân hạch thiêu đốt LP đối thủ."
      }
    ]
  },
  {
    "id": "card_b26_086_pu_86",
    "name": "Plutoni — Chúa Tể Phân Hạch (Biến Thể 9)",
    "name_en": "Plutonium — Chúa Tể Phân Hạch Mod-9",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "PYRO",
    "manaCost": 3,
    "level": 4,
    "atk": 2540,
    "def": 2160,
    "chemicalFormula": "PuO2",
    "atomicNumber": 94,
    "effectCode": "ELEM_B26_PU_ACT_86",
    "effectText": "Khi tiêu diệt quái thú đối phương: Bức xạ hạt nhân thiêu đốt 380 LP đối thủ và làm giảm 200 ATK của toàn bộ quái thú đối phương.",
    "scientificLore": "Plutoni (Z=94) thuộc họ Actini, hạt nhân phóng xạ không bền có chu kỳ bán rã đặc trưng, giải phóng năng lượng liên kết hạt nhân cực lớn.",
    "relatedEquation": "Pu + O₂ → PuO₂",
    "iupacName": "Plutonium",
    "archetype": "ACTINIDE_FISSION",
    "structuredEffects": [
      {
        "effectId": "B26_EFF_86",
        "activationWindow": "ON_DESTROY_MONSTER",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 350
            }
          }
        ],
        "description": "Bức xạ phân hạch thiêu đốt LP đối thủ."
      }
    ]
  },
  {
    "id": "card_b26_087_am_87",
    "name": "Americi — Chúa Tể Phân Hạch (Biến Thể 9)",
    "name_en": "Americium — Chúa Tể Phân Hạch Mod-9",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "ULTRA_RARE",
    "attribute": "PYRO",
    "manaCost": 4,
    "level": 5,
    "atk": 2795,
    "def": 2350,
    "chemicalFormula": "AmO2",
    "atomicNumber": 95,
    "effectCode": "ELEM_B26_AM_ACT_87",
    "effectText": "Khi tiêu diệt quái thú đối phương: Bức xạ hạt nhân thiêu đốt 460 LP đối thủ và làm giảm 200 ATK của toàn bộ quái thú đối phương.",
    "scientificLore": "Americi (Z=95) thuộc họ Actini, hạt nhân phóng xạ không bền có chu kỳ bán rã đặc trưng, giải phóng năng lượng liên kết hạt nhân cực lớn.",
    "relatedEquation": "Am + O₂ → AmO₂",
    "iupacName": "Americium",
    "archetype": "ACTINIDE_FISSION",
    "structuredEffects": [
      {
        "effectId": "B26_EFF_87",
        "activationWindow": "ON_DESTROY_MONSTER",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 350
            }
          }
        ],
        "description": "Bức xạ phân hạch thiêu đốt LP đối thủ."
      }
    ]
  },
  {
    "id": "card_b26_088_cm_88",
    "name": "Curi — Chúa Tể Phân Hạch (Biến Thể 9)",
    "name_en": "Curium — Chúa Tể Phân Hạch Mod-9",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SECRET_RARE",
    "attribute": "ACID_DARK",
    "manaCost": 5,
    "level": 6,
    "atk": 3050,
    "def": 2540,
    "chemicalFormula": "Cm2O3",
    "atomicNumber": 96,
    "effectCode": "ELEM_B26_CM_ACT_88",
    "effectText": "Khi tiêu diệt quái thú đối phương: Bức xạ hạt nhân thiêu đốt 540 LP đối thủ và làm giảm 200 ATK của toàn bộ quái thú đối phương.",
    "scientificLore": "Curi (Z=96) thuộc họ Actini, hạt nhân phóng xạ không bền có chu kỳ bán rã đặc trưng, giải phóng năng lượng liên kết hạt nhân cực lớn.",
    "relatedEquation": "2Cm + 3/2O₂ → Cm₂O₃",
    "iupacName": "Curium",
    "archetype": "ACTINIDE_FISSION",
    "structuredEffects": [
      {
        "effectId": "B26_EFF_88",
        "activationWindow": "ON_DESTROY_MONSTER",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 350
            }
          }
        ],
        "description": "Bức xạ phân hạch thiêu đốt LP đối thủ."
      }
    ]
  },
  {
    "id": "card_b26_089_bk_89",
    "name": "Berkeli — Chúa Tể Phân Hạch (Biến Thể 9)",
    "name_en": "Berkelium — Chúa Tể Phân Hạch Mod-9",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "ACID_DARK",
    "manaCost": 5,
    "level": 7,
    "atk": 3305,
    "def": 2730,
    "chemicalFormula": "BkO2",
    "atomicNumber": 97,
    "effectCode": "ELEM_B26_BK_ACT_89",
    "effectText": "Khi tiêu diệt quái thú đối phương: Bức xạ hạt nhân thiêu đốt 300 LP đối thủ và làm giảm 200 ATK của toàn bộ quái thú đối phương.",
    "scientificLore": "Berkeli (Z=97) thuộc họ Actini, hạt nhân phóng xạ không bền có chu kỳ bán rã đặc trưng, giải phóng năng lượng liên kết hạt nhân cực lớn.",
    "relatedEquation": "Bk + O₂ → BkO₂",
    "iupacName": "Berkelium",
    "archetype": "ACTINIDE_FISSION",
    "structuredEffects": [
      {
        "effectId": "B26_EFF_89",
        "activationWindow": "ON_DESTROY_MONSTER",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 350
            }
          }
        ],
        "description": "Bức xạ phân hạch thiêu đốt LP đối thủ."
      }
    ]
  },
  {
    "id": "card_b26_090_cf_90",
    "name": "Californi — Chúa Tể Phân Hạch (Biến Thể 9)",
    "name_en": "Californium — Chúa Tể Phân Hạch Mod-9",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "NOBLE_VOID",
    "manaCost": 6,
    "level": 8,
    "atk": 3560,
    "def": 2920,
    "chemicalFormula": "Cf2O3",
    "atomicNumber": 98,
    "effectCode": "ELEM_B26_CF_ACT_90",
    "effectText": "Khi tiêu diệt quái thú đối phương: Bức xạ hạt nhân thiêu đốt 380 LP đối thủ và làm giảm 200 ATK của toàn bộ quái thú đối phương.",
    "scientificLore": "Californi (Z=98) thuộc họ Actini, hạt nhân phóng xạ không bền có chu kỳ bán rã đặc trưng, giải phóng năng lượng liên kết hạt nhân cực lớn.",
    "relatedEquation": "2Cf + 3/2O₂ → Cf₂O₃",
    "iupacName": "Californium",
    "archetype": "ACTINIDE_FISSION",
    "structuredEffects": [
      {
        "effectId": "B26_EFF_90",
        "activationWindow": "ON_DESTROY_MONSTER",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 350
            }
          }
        ],
        "description": "Bức xạ phân hạch thiêu đốt LP đối thủ."
      }
    ]
  },
  {
    "id": "card_b26_091_ac_91",
    "name": "Actini — Hiệp Sĩ Nơ-tron (Biến Thể 10)",
    "name_en": "Actinium — Hiệp Sĩ Nơ-tron Mod-10",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "ACID_DARK",
    "manaCost": 3,
    "level": 4,
    "atk": 2540,
    "def": 2160,
    "chemicalFormula": "Ac2O3",
    "atomicNumber": 89,
    "effectCode": "ELEM_B26_AC_ACT_91",
    "effectText": "Khi tiêu diệt quái thú đối phương: Bức xạ hạt nhân thiêu đốt 460 LP đối thủ và làm giảm 200 ATK của toàn bộ quái thú đối phương.",
    "scientificLore": "Actini (Z=89) thuộc họ Actini, hạt nhân phóng xạ không bền có chu kỳ bán rã đặc trưng, giải phóng năng lượng liên kết hạt nhân cực lớn.",
    "relatedEquation": "2Ac + 3/2O₂ → Ac₂O₃",
    "iupacName": "Actinium",
    "archetype": "ACTINIDE_FISSION",
    "structuredEffects": [
      {
        "effectId": "B26_EFF_91",
        "activationWindow": "ON_DESTROY_MONSTER",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 350
            }
          }
        ],
        "description": "Bức xạ phân hạch thiêu đốt LP đối thủ."
      }
    ]
  },
  {
    "id": "card_b26_092_th_92",
    "name": "Thori — Hiệp Sĩ Nơ-tron (Biến Thể 10)",
    "name_en": "Thorium — Hiệp Sĩ Nơ-tron Mod-10",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "PYRO",
    "manaCost": 4,
    "level": 5,
    "atk": 2795,
    "def": 2350,
    "chemicalFormula": "ThO2",
    "atomicNumber": 90,
    "effectCode": "ELEM_B26_TH_ACT_92",
    "effectText": "Khi tiêu diệt quái thú đối phương: Bức xạ hạt nhân thiêu đốt 540 LP đối thủ và làm giảm 200 ATK của toàn bộ quái thú đối phương.",
    "scientificLore": "Thori (Z=90) thuộc họ Actini, hạt nhân phóng xạ không bền có chu kỳ bán rã đặc trưng, giải phóng năng lượng liên kết hạt nhân cực lớn.",
    "relatedEquation": "Th + O₂ → ThO₂",
    "iupacName": "Thorium",
    "archetype": "ACTINIDE_FISSION",
    "structuredEffects": [
      {
        "effectId": "B26_EFF_92",
        "activationWindow": "ON_DESTROY_MONSTER",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 350
            }
          }
        ],
        "description": "Bức xạ phân hạch thiêu đốt LP đối thủ."
      }
    ]
  },
  {
    "id": "card_b26_093_pa_93",
    "name": "Protactini — Hiệp Sĩ Nơ-tron (Biến Thể 10)",
    "name_en": "Protactinium — Hiệp Sĩ Nơ-tron Mod-10",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "ACID_DARK",
    "manaCost": 5,
    "level": 6,
    "atk": 3050,
    "def": 2540,
    "chemicalFormula": "Pa2O5",
    "atomicNumber": 91,
    "effectCode": "ELEM_B26_PA_ACT_93",
    "effectText": "Khi tiêu diệt quái thú đối phương: Bức xạ hạt nhân thiêu đốt 300 LP đối thủ và làm giảm 200 ATK của toàn bộ quái thú đối phương.",
    "scientificLore": "Protactini (Z=91) thuộc họ Actini, hạt nhân phóng xạ không bền có chu kỳ bán rã đặc trưng, giải phóng năng lượng liên kết hạt nhân cực lớn.",
    "relatedEquation": "2Pa + 5/2O₂ → Pa₂O₅",
    "iupacName": "Protactinium",
    "archetype": "ACTINIDE_FISSION",
    "structuredEffects": [
      {
        "effectId": "B26_EFF_93",
        "activationWindow": "ON_DESTROY_MONSTER",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 350
            }
          }
        ],
        "description": "Bức xạ phân hạch thiêu đốt LP đối thủ."
      }
    ]
  },
  {
    "id": "card_b26_094_u_94",
    "name": "Urani — Hiệp Sĩ Nơ-tron (Biến Thể 10)",
    "name_en": "Uranium — Hiệp Sĩ Nơ-tron Mod-10",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "ACID_DARK",
    "manaCost": 5,
    "level": 7,
    "atk": 3305,
    "def": 2730,
    "chemicalFormula": "UO2(NO3)2",
    "atomicNumber": 92,
    "effectCode": "ELEM_B26_U_ACT_94",
    "effectText": "Khi tiêu diệt quái thú đối phương: Bức xạ hạt nhân thiêu đốt 380 LP đối thủ và làm giảm 200 ATK của toàn bộ quái thú đối phương.",
    "scientificLore": "Urani (Z=92) thuộc họ Actini, hạt nhân phóng xạ không bền có chu kỳ bán rã đặc trưng, giải phóng năng lượng liên kết hạt nhân cực lớn.",
    "relatedEquation": "U + 4HNO₃ → UO₂(NO₃)₂ + 2NO₂ + 2H₂O",
    "iupacName": "Uranium",
    "archetype": "ACTINIDE_FISSION",
    "structuredEffects": [
      {
        "effectId": "B26_EFF_94",
        "activationWindow": "ON_DESTROY_MONSTER",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 350
            }
          }
        ],
        "description": "Bức xạ phân hạch thiêu đốt LP đối thủ."
      }
    ]
  },
  {
    "id": "card_b26_095_np_95",
    "name": "Neptuni — Hiệp Sĩ Nơ-tron (Biến Thể 10)",
    "name_en": "Neptunium — Hiệp Sĩ Nơ-tron Mod-10",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "ACID_DARK",
    "manaCost": 6,
    "level": 8,
    "atk": 3560,
    "def": 2920,
    "chemicalFormula": "NpO2",
    "atomicNumber": 93,
    "effectCode": "ELEM_B26_NP_ACT_95",
    "effectText": "Khi tiêu diệt quái thú đối phương: Bức xạ hạt nhân thiêu đốt 460 LP đối thủ và làm giảm 200 ATK của toàn bộ quái thú đối phương.",
    "scientificLore": "Neptuni (Z=93) thuộc họ Actini, hạt nhân phóng xạ không bền có chu kỳ bán rã đặc trưng, giải phóng năng lượng liên kết hạt nhân cực lớn.",
    "relatedEquation": "Np + O₂ → NpO₂",
    "iupacName": "Neptunium",
    "archetype": "ACTINIDE_FISSION",
    "structuredEffects": [
      {
        "effectId": "B26_EFF_95",
        "activationWindow": "ON_DESTROY_MONSTER",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 350
            }
          }
        ],
        "description": "Bức xạ phân hạch thiêu đốt LP đối thủ."
      }
    ]
  },
  {
    "id": "card_b26_096_pu_96",
    "name": "Plutoni — Hiệp Sĩ Nơ-tron (Biến Thể 10)",
    "name_en": "Plutonium — Hiệp Sĩ Nơ-tron Mod-10",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "ULTRA_RARE",
    "attribute": "PYRO",
    "manaCost": 3,
    "level": 4,
    "atk": 2540,
    "def": 2160,
    "chemicalFormula": "PuO2",
    "atomicNumber": 94,
    "effectCode": "ELEM_B26_PU_ACT_96",
    "effectText": "Khi tiêu diệt quái thú đối phương: Bức xạ hạt nhân thiêu đốt 540 LP đối thủ và làm giảm 200 ATK của toàn bộ quái thú đối phương.",
    "scientificLore": "Plutoni (Z=94) thuộc họ Actini, hạt nhân phóng xạ không bền có chu kỳ bán rã đặc trưng, giải phóng năng lượng liên kết hạt nhân cực lớn.",
    "relatedEquation": "Pu + O₂ → PuO₂",
    "iupacName": "Plutonium",
    "archetype": "ACTINIDE_FISSION",
    "structuredEffects": [
      {
        "effectId": "B26_EFF_96",
        "activationWindow": "ON_DESTROY_MONSTER",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 350
            }
          }
        ],
        "description": "Bức xạ phân hạch thiêu đốt LP đối thủ."
      }
    ]
  },
  {
    "id": "card_b26_097_am_97",
    "name": "Americi — Hiệp Sĩ Nơ-tron (Biến Thể 10)",
    "name_en": "Americium — Hiệp Sĩ Nơ-tron Mod-10",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SECRET_RARE",
    "attribute": "PYRO",
    "manaCost": 4,
    "level": 5,
    "atk": 2795,
    "def": 2350,
    "chemicalFormula": "AmO2",
    "atomicNumber": 95,
    "effectCode": "ELEM_B26_AM_ACT_97",
    "effectText": "Khi tiêu diệt quái thú đối phương: Bức xạ hạt nhân thiêu đốt 300 LP đối thủ và làm giảm 200 ATK của toàn bộ quái thú đối phương.",
    "scientificLore": "Americi (Z=95) thuộc họ Actini, hạt nhân phóng xạ không bền có chu kỳ bán rã đặc trưng, giải phóng năng lượng liên kết hạt nhân cực lớn.",
    "relatedEquation": "Am + O₂ → AmO₂",
    "iupacName": "Americium",
    "archetype": "ACTINIDE_FISSION",
    "structuredEffects": [
      {
        "effectId": "B26_EFF_97",
        "activationWindow": "ON_DESTROY_MONSTER",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 350
            }
          }
        ],
        "description": "Bức xạ phân hạch thiêu đốt LP đối thủ."
      }
    ]
  },
  {
    "id": "card_b26_098_cm_98",
    "name": "Curi — Hiệp Sĩ Nơ-tron (Biến Thể 10)",
    "name_en": "Curium — Hiệp Sĩ Nơ-tron Mod-10",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "ACID_DARK",
    "manaCost": 5,
    "level": 6,
    "atk": 3050,
    "def": 2540,
    "chemicalFormula": "Cm2O3",
    "atomicNumber": 96,
    "effectCode": "ELEM_B26_CM_ACT_98",
    "effectText": "Khi tiêu diệt quái thú đối phương: Bức xạ hạt nhân thiêu đốt 380 LP đối thủ và làm giảm 200 ATK của toàn bộ quái thú đối phương.",
    "scientificLore": "Curi (Z=96) thuộc họ Actini, hạt nhân phóng xạ không bền có chu kỳ bán rã đặc trưng, giải phóng năng lượng liên kết hạt nhân cực lớn.",
    "relatedEquation": "2Cm + 3/2O₂ → Cm₂O₃",
    "iupacName": "Curium",
    "archetype": "ACTINIDE_FISSION",
    "structuredEffects": [
      {
        "effectId": "B26_EFF_98",
        "activationWindow": "ON_DESTROY_MONSTER",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 350
            }
          }
        ],
        "description": "Bức xạ phân hạch thiêu đốt LP đối thủ."
      }
    ]
  },
  {
    "id": "card_b26_099_bk_99",
    "name": "Berkeli — Hiệp Sĩ Nơ-tron (Biến Thể 10)",
    "name_en": "Berkelium — Hiệp Sĩ Nơ-tron Mod-10",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "ACID_DARK",
    "manaCost": 5,
    "level": 7,
    "atk": 3305,
    "def": 2730,
    "chemicalFormula": "BkO2",
    "atomicNumber": 97,
    "effectCode": "ELEM_B26_BK_ACT_99",
    "effectText": "Khi tiêu diệt quái thú đối phương: Bức xạ hạt nhân thiêu đốt 460 LP đối thủ và làm giảm 200 ATK của toàn bộ quái thú đối phương.",
    "scientificLore": "Berkeli (Z=97) thuộc họ Actini, hạt nhân phóng xạ không bền có chu kỳ bán rã đặc trưng, giải phóng năng lượng liên kết hạt nhân cực lớn.",
    "relatedEquation": "Bk + O₂ → BkO₂",
    "iupacName": "Berkelium",
    "archetype": "ACTINIDE_FISSION",
    "structuredEffects": [
      {
        "effectId": "B26_EFF_99",
        "activationWindow": "ON_DESTROY_MONSTER",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 350
            }
          }
        ],
        "description": "Bức xạ phân hạch thiêu đốt LP đối thủ."
      }
    ]
  },
  {
    "id": "card_b26_100_cf_100",
    "name": "Californi — Hiệp Sĩ Nơ-tron (Biến Thể 10)",
    "name_en": "Californium — Hiệp Sĩ Nơ-tron Mod-10",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "NOBLE_VOID",
    "manaCost": 6,
    "level": 8,
    "atk": 3560,
    "def": 2920,
    "chemicalFormula": "Cf2O3",
    "atomicNumber": 98,
    "effectCode": "ELEM_B26_CF_ACT_100",
    "effectText": "Khi tiêu diệt quái thú đối phương: Bức xạ hạt nhân thiêu đốt 540 LP đối thủ và làm giảm 200 ATK của toàn bộ quái thú đối phương.",
    "scientificLore": "Californi (Z=98) thuộc họ Actini, hạt nhân phóng xạ không bền có chu kỳ bán rã đặc trưng, giải phóng năng lượng liên kết hạt nhân cực lớn.",
    "relatedEquation": "2Cf + 3/2O₂ → Cf₂O₃",
    "iupacName": "Californium",
    "archetype": "ACTINIDE_FISSION",
    "structuredEffects": [
      {
        "effectId": "B26_EFF_100",
        "activationWindow": "ON_DESTROY_MONSTER",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 350
            }
          }
        ],
        "description": "Bức xạ phân hạch thiêu đốt LP đối thủ."
      }
    ]
  },
  {
    "id": "card_b26_101_ac_101",
    "name": "Actini — Đại Bác Bức Xạ Alpha (Biến Thể 11)",
    "name_en": "Actinium — Đại Bác Bức Xạ Alpha Mod-11",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "ACID_DARK",
    "manaCost": 3,
    "level": 4,
    "atk": 2540,
    "def": 2160,
    "chemicalFormula": "Ac2O3",
    "atomicNumber": 89,
    "effectCode": "ELEM_B26_AC_ACT_101",
    "effectText": "Khi tiêu diệt quái thú đối phương: Bức xạ hạt nhân thiêu đốt 300 LP đối thủ và làm giảm 200 ATK của toàn bộ quái thú đối phương.",
    "scientificLore": "Actini (Z=89) thuộc họ Actini, hạt nhân phóng xạ không bền có chu kỳ bán rã đặc trưng, giải phóng năng lượng liên kết hạt nhân cực lớn.",
    "relatedEquation": "2Ac + 3/2O₂ → Ac₂O₃",
    "iupacName": "Actinium",
    "archetype": "ACTINIDE_FISSION",
    "structuredEffects": [
      {
        "effectId": "B26_EFF_101",
        "activationWindow": "ON_DESTROY_MONSTER",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 350
            }
          }
        ],
        "description": "Bức xạ phân hạch thiêu đốt LP đối thủ."
      }
    ]
  },
  {
    "id": "card_b26_102_th_102",
    "name": "Thori — Đại Bác Bức Xạ Alpha (Biến Thể 11)",
    "name_en": "Thorium — Đại Bác Bức Xạ Alpha Mod-11",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "PYRO",
    "manaCost": 4,
    "level": 5,
    "atk": 2795,
    "def": 2350,
    "chemicalFormula": "ThO2",
    "atomicNumber": 90,
    "effectCode": "ELEM_B26_TH_ACT_102",
    "effectText": "Khi tiêu diệt quái thú đối phương: Bức xạ hạt nhân thiêu đốt 380 LP đối thủ và làm giảm 200 ATK của toàn bộ quái thú đối phương.",
    "scientificLore": "Thori (Z=90) thuộc họ Actini, hạt nhân phóng xạ không bền có chu kỳ bán rã đặc trưng, giải phóng năng lượng liên kết hạt nhân cực lớn.",
    "relatedEquation": "Th + O₂ → ThO₂",
    "iupacName": "Thorium",
    "archetype": "ACTINIDE_FISSION",
    "structuredEffects": [
      {
        "effectId": "B26_EFF_102",
        "activationWindow": "ON_DESTROY_MONSTER",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 350
            }
          }
        ],
        "description": "Bức xạ phân hạch thiêu đốt LP đối thủ."
      }
    ]
  },
  {
    "id": "card_b26_103_pa_103",
    "name": "Protactini — Đại Bác Bức Xạ Alpha (Biến Thể 11)",
    "name_en": "Protactinium — Đại Bác Bức Xạ Alpha Mod-11",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "ACID_DARK",
    "manaCost": 5,
    "level": 6,
    "atk": 3050,
    "def": 2540,
    "chemicalFormula": "Pa2O5",
    "atomicNumber": 91,
    "effectCode": "ELEM_B26_PA_ACT_103",
    "effectText": "Khi tiêu diệt quái thú đối phương: Bức xạ hạt nhân thiêu đốt 460 LP đối thủ và làm giảm 200 ATK của toàn bộ quái thú đối phương.",
    "scientificLore": "Protactini (Z=91) thuộc họ Actini, hạt nhân phóng xạ không bền có chu kỳ bán rã đặc trưng, giải phóng năng lượng liên kết hạt nhân cực lớn.",
    "relatedEquation": "2Pa + 5/2O₂ → Pa₂O₅",
    "iupacName": "Protactinium",
    "archetype": "ACTINIDE_FISSION",
    "structuredEffects": [
      {
        "effectId": "B26_EFF_103",
        "activationWindow": "ON_DESTROY_MONSTER",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 350
            }
          }
        ],
        "description": "Bức xạ phân hạch thiêu đốt LP đối thủ."
      }
    ]
  },
  {
    "id": "card_b26_104_u_104",
    "name": "Urani — Đại Bác Bức Xạ Alpha (Biến Thể 11)",
    "name_en": "Uranium — Đại Bác Bức Xạ Alpha Mod-11",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "ACID_DARK",
    "manaCost": 5,
    "level": 7,
    "atk": 3305,
    "def": 2730,
    "chemicalFormula": "UO2(NO3)2",
    "atomicNumber": 92,
    "effectCode": "ELEM_B26_U_ACT_104",
    "effectText": "Khi tiêu diệt quái thú đối phương: Bức xạ hạt nhân thiêu đốt 540 LP đối thủ và làm giảm 200 ATK của toàn bộ quái thú đối phương.",
    "scientificLore": "Urani (Z=92) thuộc họ Actini, hạt nhân phóng xạ không bền có chu kỳ bán rã đặc trưng, giải phóng năng lượng liên kết hạt nhân cực lớn.",
    "relatedEquation": "U + 4HNO₃ → UO₂(NO₃)₂ + 2NO₂ + 2H₂O",
    "iupacName": "Uranium",
    "archetype": "ACTINIDE_FISSION",
    "structuredEffects": [
      {
        "effectId": "B26_EFF_104",
        "activationWindow": "ON_DESTROY_MONSTER",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 350
            }
          }
        ],
        "description": "Bức xạ phân hạch thiêu đốt LP đối thủ."
      }
    ]
  },
  {
    "id": "card_b26_105_np_105",
    "name": "Neptuni — Đại Bác Bức Xạ Alpha (Biến Thể 11)",
    "name_en": "Neptunium — Đại Bác Bức Xạ Alpha Mod-11",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "ULTRA_RARE",
    "attribute": "ACID_DARK",
    "manaCost": 6,
    "level": 8,
    "atk": 3560,
    "def": 2920,
    "chemicalFormula": "NpO2",
    "atomicNumber": 93,
    "effectCode": "ELEM_B26_NP_ACT_105",
    "effectText": "Khi tiêu diệt quái thú đối phương: Bức xạ hạt nhân thiêu đốt 300 LP đối thủ và làm giảm 200 ATK của toàn bộ quái thú đối phương.",
    "scientificLore": "Neptuni (Z=93) thuộc họ Actini, hạt nhân phóng xạ không bền có chu kỳ bán rã đặc trưng, giải phóng năng lượng liên kết hạt nhân cực lớn.",
    "relatedEquation": "Np + O₂ → NpO₂",
    "iupacName": "Neptunium",
    "archetype": "ACTINIDE_FISSION",
    "structuredEffects": [
      {
        "effectId": "B26_EFF_105",
        "activationWindow": "ON_DESTROY_MONSTER",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 350
            }
          }
        ],
        "description": "Bức xạ phân hạch thiêu đốt LP đối thủ."
      }
    ]
  },
  {
    "id": "card_b26_106_pu_106",
    "name": "Plutoni — Đại Bác Bức Xạ Alpha (Biến Thể 11)",
    "name_en": "Plutonium — Đại Bác Bức Xạ Alpha Mod-11",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SECRET_RARE",
    "attribute": "PYRO",
    "manaCost": 3,
    "level": 4,
    "atk": 2540,
    "def": 2160,
    "chemicalFormula": "PuO2",
    "atomicNumber": 94,
    "effectCode": "ELEM_B26_PU_ACT_106",
    "effectText": "Khi tiêu diệt quái thú đối phương: Bức xạ hạt nhân thiêu đốt 380 LP đối thủ và làm giảm 200 ATK của toàn bộ quái thú đối phương.",
    "scientificLore": "Plutoni (Z=94) thuộc họ Actini, hạt nhân phóng xạ không bền có chu kỳ bán rã đặc trưng, giải phóng năng lượng liên kết hạt nhân cực lớn.",
    "relatedEquation": "Pu + O₂ → PuO₂",
    "iupacName": "Plutonium",
    "archetype": "ACTINIDE_FISSION",
    "structuredEffects": [
      {
        "effectId": "B26_EFF_106",
        "activationWindow": "ON_DESTROY_MONSTER",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 350
            }
          }
        ],
        "description": "Bức xạ phân hạch thiêu đốt LP đối thủ."
      }
    ]
  },
  {
    "id": "card_b26_107_am_107",
    "name": "Americi — Đại Bác Bức Xạ Alpha (Biến Thể 11)",
    "name_en": "Americium — Đại Bác Bức Xạ Alpha Mod-11",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "PYRO",
    "manaCost": 4,
    "level": 5,
    "atk": 2795,
    "def": 2350,
    "chemicalFormula": "AmO2",
    "atomicNumber": 95,
    "effectCode": "ELEM_B26_AM_ACT_107",
    "effectText": "Khi tiêu diệt quái thú đối phương: Bức xạ hạt nhân thiêu đốt 460 LP đối thủ và làm giảm 200 ATK của toàn bộ quái thú đối phương.",
    "scientificLore": "Americi (Z=95) thuộc họ Actini, hạt nhân phóng xạ không bền có chu kỳ bán rã đặc trưng, giải phóng năng lượng liên kết hạt nhân cực lớn.",
    "relatedEquation": "Am + O₂ → AmO₂",
    "iupacName": "Americium",
    "archetype": "ACTINIDE_FISSION",
    "structuredEffects": [
      {
        "effectId": "B26_EFF_107",
        "activationWindow": "ON_DESTROY_MONSTER",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 350
            }
          }
        ],
        "description": "Bức xạ phân hạch thiêu đốt LP đối thủ."
      }
    ]
  },
  {
    "id": "card_b26_108_cm_108",
    "name": "Curi — Đại Bác Bức Xạ Alpha (Biến Thể 11)",
    "name_en": "Curium — Đại Bác Bức Xạ Alpha Mod-11",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "ACID_DARK",
    "manaCost": 5,
    "level": 6,
    "atk": 3050,
    "def": 2540,
    "chemicalFormula": "Cm2O3",
    "atomicNumber": 96,
    "effectCode": "ELEM_B26_CM_ACT_108",
    "effectText": "Khi tiêu diệt quái thú đối phương: Bức xạ hạt nhân thiêu đốt 540 LP đối thủ và làm giảm 200 ATK của toàn bộ quái thú đối phương.",
    "scientificLore": "Curi (Z=96) thuộc họ Actini, hạt nhân phóng xạ không bền có chu kỳ bán rã đặc trưng, giải phóng năng lượng liên kết hạt nhân cực lớn.",
    "relatedEquation": "2Cm + 3/2O₂ → Cm₂O₃",
    "iupacName": "Curium",
    "archetype": "ACTINIDE_FISSION",
    "structuredEffects": [
      {
        "effectId": "B26_EFF_108",
        "activationWindow": "ON_DESTROY_MONSTER",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 350
            }
          }
        ],
        "description": "Bức xạ phân hạch thiêu đốt LP đối thủ."
      }
    ]
  },
  {
    "id": "card_b26_109_bk_109",
    "name": "Berkeli — Đại Bác Bức Xạ Alpha (Biến Thể 11)",
    "name_en": "Berkelium — Đại Bác Bức Xạ Alpha Mod-11",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "ACID_DARK",
    "manaCost": 5,
    "level": 7,
    "atk": 3305,
    "def": 2730,
    "chemicalFormula": "BkO2",
    "atomicNumber": 97,
    "effectCode": "ELEM_B26_BK_ACT_109",
    "effectText": "Khi tiêu diệt quái thú đối phương: Bức xạ hạt nhân thiêu đốt 300 LP đối thủ và làm giảm 200 ATK của toàn bộ quái thú đối phương.",
    "scientificLore": "Berkeli (Z=97) thuộc họ Actini, hạt nhân phóng xạ không bền có chu kỳ bán rã đặc trưng, giải phóng năng lượng liên kết hạt nhân cực lớn.",
    "relatedEquation": "Bk + O₂ → BkO₂",
    "iupacName": "Berkelium",
    "archetype": "ACTINIDE_FISSION",
    "structuredEffects": [
      {
        "effectId": "B26_EFF_109",
        "activationWindow": "ON_DESTROY_MONSTER",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 350
            }
          }
        ],
        "description": "Bức xạ phân hạch thiêu đốt LP đối thủ."
      }
    ]
  },
  {
    "id": "card_b26_110_cf_110",
    "name": "Californi — Đại Bác Bức Xạ Alpha (Biến Thể 11)",
    "name_en": "Californium — Đại Bác Bức Xạ Alpha Mod-11",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "NOBLE_VOID",
    "manaCost": 6,
    "level": 8,
    "atk": 3560,
    "def": 2920,
    "chemicalFormula": "Cf2O3",
    "atomicNumber": 98,
    "effectCode": "ELEM_B26_CF_ACT_110",
    "effectText": "Khi tiêu diệt quái thú đối phương: Bức xạ hạt nhân thiêu đốt 380 LP đối thủ và làm giảm 200 ATK của toàn bộ quái thú đối phương.",
    "scientificLore": "Californi (Z=98) thuộc họ Actini, hạt nhân phóng xạ không bền có chu kỳ bán rã đặc trưng, giải phóng năng lượng liên kết hạt nhân cực lớn.",
    "relatedEquation": "2Cf + 3/2O₂ → Cf₂O₃",
    "iupacName": "Californium",
    "archetype": "ACTINIDE_FISSION",
    "structuredEffects": [
      {
        "effectId": "B26_EFF_110",
        "activationWindow": "ON_DESTROY_MONSTER",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 350
            }
          }
        ],
        "description": "Bức xạ phân hạch thiêu đốt LP đối thủ."
      }
    ]
  },
  {
    "id": "card_b26_111_ac_111",
    "name": "Actini — Hộ Vệ Lò Phản Ứng (Biến Thể 12)",
    "name_en": "Actinium — Hộ Vệ Lò Phản Ứng Mod-12",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "ACID_DARK",
    "manaCost": 3,
    "level": 4,
    "atk": 2540,
    "def": 2160,
    "chemicalFormula": "Ac2O3",
    "atomicNumber": 89,
    "effectCode": "ELEM_B26_AC_ACT_111",
    "effectText": "Khi tiêu diệt quái thú đối phương: Bức xạ hạt nhân thiêu đốt 460 LP đối thủ và làm giảm 200 ATK của toàn bộ quái thú đối phương.",
    "scientificLore": "Actini (Z=89) thuộc họ Actini, hạt nhân phóng xạ không bền có chu kỳ bán rã đặc trưng, giải phóng năng lượng liên kết hạt nhân cực lớn.",
    "relatedEquation": "2Ac + 3/2O₂ → Ac₂O₃",
    "iupacName": "Actinium",
    "archetype": "ACTINIDE_FISSION",
    "structuredEffects": [
      {
        "effectId": "B26_EFF_111",
        "activationWindow": "ON_DESTROY_MONSTER",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 350
            }
          }
        ],
        "description": "Bức xạ phân hạch thiêu đốt LP đối thủ."
      }
    ]
  },
  {
    "id": "card_b26_112_th_112",
    "name": "Thori — Hộ Vệ Lò Phản Ứng (Biến Thể 12)",
    "name_en": "Thorium — Hộ Vệ Lò Phản Ứng Mod-12",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "PYRO",
    "manaCost": 4,
    "level": 5,
    "atk": 2795,
    "def": 2350,
    "chemicalFormula": "ThO2",
    "atomicNumber": 90,
    "effectCode": "ELEM_B26_TH_ACT_112",
    "effectText": "Khi tiêu diệt quái thú đối phương: Bức xạ hạt nhân thiêu đốt 540 LP đối thủ và làm giảm 200 ATK của toàn bộ quái thú đối phương.",
    "scientificLore": "Thori (Z=90) thuộc họ Actini, hạt nhân phóng xạ không bền có chu kỳ bán rã đặc trưng, giải phóng năng lượng liên kết hạt nhân cực lớn.",
    "relatedEquation": "Th + O₂ → ThO₂",
    "iupacName": "Thorium",
    "archetype": "ACTINIDE_FISSION",
    "structuredEffects": [
      {
        "effectId": "B26_EFF_112",
        "activationWindow": "ON_DESTROY_MONSTER",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 350
            }
          }
        ],
        "description": "Bức xạ phân hạch thiêu đốt LP đối thủ."
      }
    ]
  },
  {
    "id": "card_b26_113_pa_113",
    "name": "Protactini — Hộ Vệ Lò Phản Ứng (Biến Thể 12)",
    "name_en": "Protactinium — Hộ Vệ Lò Phản Ứng Mod-12",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "ACID_DARK",
    "manaCost": 5,
    "level": 6,
    "atk": 3050,
    "def": 2540,
    "chemicalFormula": "Pa2O5",
    "atomicNumber": 91,
    "effectCode": "ELEM_B26_PA_ACT_113",
    "effectText": "Khi tiêu diệt quái thú đối phương: Bức xạ hạt nhân thiêu đốt 300 LP đối thủ và làm giảm 200 ATK của toàn bộ quái thú đối phương.",
    "scientificLore": "Protactini (Z=91) thuộc họ Actini, hạt nhân phóng xạ không bền có chu kỳ bán rã đặc trưng, giải phóng năng lượng liên kết hạt nhân cực lớn.",
    "relatedEquation": "2Pa + 5/2O₂ → Pa₂O₅",
    "iupacName": "Protactinium",
    "archetype": "ACTINIDE_FISSION",
    "structuredEffects": [
      {
        "effectId": "B26_EFF_113",
        "activationWindow": "ON_DESTROY_MONSTER",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 350
            }
          }
        ],
        "description": "Bức xạ phân hạch thiêu đốt LP đối thủ."
      }
    ]
  },
  {
    "id": "card_b26_114_u_114",
    "name": "Urani — Hộ Vệ Lò Phản Ứng (Biến Thể 12)",
    "name_en": "Uranium — Hộ Vệ Lò Phản Ứng Mod-12",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "ULTRA_RARE",
    "attribute": "ACID_DARK",
    "manaCost": 5,
    "level": 7,
    "atk": 3305,
    "def": 2730,
    "chemicalFormula": "UO2(NO3)2",
    "atomicNumber": 92,
    "effectCode": "ELEM_B26_U_ACT_114",
    "effectText": "Khi tiêu diệt quái thú đối phương: Bức xạ hạt nhân thiêu đốt 380 LP đối thủ và làm giảm 200 ATK của toàn bộ quái thú đối phương.",
    "scientificLore": "Urani (Z=92) thuộc họ Actini, hạt nhân phóng xạ không bền có chu kỳ bán rã đặc trưng, giải phóng năng lượng liên kết hạt nhân cực lớn.",
    "relatedEquation": "U + 4HNO₃ → UO₂(NO₃)₂ + 2NO₂ + 2H₂O",
    "iupacName": "Uranium",
    "archetype": "ACTINIDE_FISSION",
    "structuredEffects": [
      {
        "effectId": "B26_EFF_114",
        "activationWindow": "ON_DESTROY_MONSTER",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 350
            }
          }
        ],
        "description": "Bức xạ phân hạch thiêu đốt LP đối thủ."
      }
    ]
  },
  {
    "id": "card_b26_115_np_115",
    "name": "Neptuni — Hộ Vệ Lò Phản Ứng (Biến Thể 12)",
    "name_en": "Neptunium — Hộ Vệ Lò Phản Ứng Mod-12",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SECRET_RARE",
    "attribute": "ACID_DARK",
    "manaCost": 6,
    "level": 8,
    "atk": 3560,
    "def": 2920,
    "chemicalFormula": "NpO2",
    "atomicNumber": 93,
    "effectCode": "ELEM_B26_NP_ACT_115",
    "effectText": "Khi tiêu diệt quái thú đối phương: Bức xạ hạt nhân thiêu đốt 460 LP đối thủ và làm giảm 200 ATK của toàn bộ quái thú đối phương.",
    "scientificLore": "Neptuni (Z=93) thuộc họ Actini, hạt nhân phóng xạ không bền có chu kỳ bán rã đặc trưng, giải phóng năng lượng liên kết hạt nhân cực lớn.",
    "relatedEquation": "Np + O₂ → NpO₂",
    "iupacName": "Neptunium",
    "archetype": "ACTINIDE_FISSION",
    "structuredEffects": [
      {
        "effectId": "B26_EFF_115",
        "activationWindow": "ON_DESTROY_MONSTER",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 350
            }
          }
        ],
        "description": "Bức xạ phân hạch thiêu đốt LP đối thủ."
      }
    ]
  },
  {
    "id": "card_b26_116_pu_116",
    "name": "Plutoni — Hộ Vệ Lò Phản Ứng (Biến Thể 12)",
    "name_en": "Plutonium — Hộ Vệ Lò Phản Ứng Mod-12",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "PYRO",
    "manaCost": 3,
    "level": 4,
    "atk": 2540,
    "def": 2160,
    "chemicalFormula": "PuO2",
    "atomicNumber": 94,
    "effectCode": "ELEM_B26_PU_ACT_116",
    "effectText": "Khi tiêu diệt quái thú đối phương: Bức xạ hạt nhân thiêu đốt 540 LP đối thủ và làm giảm 200 ATK của toàn bộ quái thú đối phương.",
    "scientificLore": "Plutoni (Z=94) thuộc họ Actini, hạt nhân phóng xạ không bền có chu kỳ bán rã đặc trưng, giải phóng năng lượng liên kết hạt nhân cực lớn.",
    "relatedEquation": "Pu + O₂ → PuO₂",
    "iupacName": "Plutonium",
    "archetype": "ACTINIDE_FISSION",
    "structuredEffects": [
      {
        "effectId": "B26_EFF_116",
        "activationWindow": "ON_DESTROY_MONSTER",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 350
            }
          }
        ],
        "description": "Bức xạ phân hạch thiêu đốt LP đối thủ."
      }
    ]
  },
  {
    "id": "card_b26_117_am_117",
    "name": "Americi — Hộ Vệ Lò Phản Ứng (Biến Thể 12)",
    "name_en": "Americium — Hộ Vệ Lò Phản Ứng Mod-12",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "PYRO",
    "manaCost": 4,
    "level": 5,
    "atk": 2795,
    "def": 2350,
    "chemicalFormula": "AmO2",
    "atomicNumber": 95,
    "effectCode": "ELEM_B26_AM_ACT_117",
    "effectText": "Khi tiêu diệt quái thú đối phương: Bức xạ hạt nhân thiêu đốt 300 LP đối thủ và làm giảm 200 ATK của toàn bộ quái thú đối phương.",
    "scientificLore": "Americi (Z=95) thuộc họ Actini, hạt nhân phóng xạ không bền có chu kỳ bán rã đặc trưng, giải phóng năng lượng liên kết hạt nhân cực lớn.",
    "relatedEquation": "Am + O₂ → AmO₂",
    "iupacName": "Americium",
    "archetype": "ACTINIDE_FISSION",
    "structuredEffects": [
      {
        "effectId": "B26_EFF_117",
        "activationWindow": "ON_DESTROY_MONSTER",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 350
            }
          }
        ],
        "description": "Bức xạ phân hạch thiêu đốt LP đối thủ."
      }
    ]
  },
  {
    "id": "card_b26_118_cm_118",
    "name": "Curi — Hộ Vệ Lò Phản Ứng (Biến Thể 12)",
    "name_en": "Curium — Hộ Vệ Lò Phản Ứng Mod-12",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "ACID_DARK",
    "manaCost": 5,
    "level": 6,
    "atk": 3050,
    "def": 2540,
    "chemicalFormula": "Cm2O3",
    "atomicNumber": 96,
    "effectCode": "ELEM_B26_CM_ACT_118",
    "effectText": "Khi tiêu diệt quái thú đối phương: Bức xạ hạt nhân thiêu đốt 380 LP đối thủ và làm giảm 200 ATK của toàn bộ quái thú đối phương.",
    "scientificLore": "Curi (Z=96) thuộc họ Actini, hạt nhân phóng xạ không bền có chu kỳ bán rã đặc trưng, giải phóng năng lượng liên kết hạt nhân cực lớn.",
    "relatedEquation": "2Cm + 3/2O₂ → Cm₂O₃",
    "iupacName": "Curium",
    "archetype": "ACTINIDE_FISSION",
    "structuredEffects": [
      {
        "effectId": "B26_EFF_118",
        "activationWindow": "ON_DESTROY_MONSTER",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 350
            }
          }
        ],
        "description": "Bức xạ phân hạch thiêu đốt LP đối thủ."
      }
    ]
  },
  {
    "id": "card_b26_119_bk_119",
    "name": "Berkeli — Hộ Vệ Lò Phản Ứng (Biến Thể 12)",
    "name_en": "Berkelium — Hộ Vệ Lò Phản Ứng Mod-12",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "ACID_DARK",
    "manaCost": 5,
    "level": 7,
    "atk": 3305,
    "def": 2730,
    "chemicalFormula": "BkO2",
    "atomicNumber": 97,
    "effectCode": "ELEM_B26_BK_ACT_119",
    "effectText": "Khi tiêu diệt quái thú đối phương: Bức xạ hạt nhân thiêu đốt 460 LP đối thủ và làm giảm 200 ATK của toàn bộ quái thú đối phương.",
    "scientificLore": "Berkeli (Z=97) thuộc họ Actini, hạt nhân phóng xạ không bền có chu kỳ bán rã đặc trưng, giải phóng năng lượng liên kết hạt nhân cực lớn.",
    "relatedEquation": "Bk + O₂ → BkO₂",
    "iupacName": "Berkelium",
    "archetype": "ACTINIDE_FISSION",
    "structuredEffects": [
      {
        "effectId": "B26_EFF_119",
        "activationWindow": "ON_DESTROY_MONSTER",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 350
            }
          }
        ],
        "description": "Bức xạ phân hạch thiêu đốt LP đối thủ."
      }
    ]
  },
  {
    "id": "card_b26_120_cf_120",
    "name": "Californi — Hộ Vệ Lò Phản Ứng (Biến Thể 12)",
    "name_en": "Californium — Hộ Vệ Lò Phản Ứng Mod-12",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "NOBLE_VOID",
    "manaCost": 6,
    "level": 8,
    "atk": 3560,
    "def": 2920,
    "chemicalFormula": "Cf2O3",
    "atomicNumber": 98,
    "effectCode": "ELEM_B26_CF_ACT_120",
    "effectText": "Khi tiêu diệt quái thú đối phương: Bức xạ hạt nhân thiêu đốt 540 LP đối thủ và làm giảm 200 ATK của toàn bộ quái thú đối phương.",
    "scientificLore": "Californi (Z=98) thuộc họ Actini, hạt nhân phóng xạ không bền có chu kỳ bán rã đặc trưng, giải phóng năng lượng liên kết hạt nhân cực lớn.",
    "relatedEquation": "2Cf + 3/2O₂ → Cf₂O₃",
    "iupacName": "Californium",
    "archetype": "ACTINIDE_FISSION",
    "structuredEffects": [
      {
        "effectId": "B26_EFF_120",
        "activationWindow": "ON_DESTROY_MONSTER",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 350
            }
          }
        ],
        "description": "Bức xạ phân hạch thiêu đốt LP đối thủ."
      }
    ]
  },
  {
    "id": "card_b26_121_ac_121",
    "name": "Actini — Chiến Binh Đồng Vị Nặng (Biến Thể 13)",
    "name_en": "Actinium — Chiến Binh Đồng Vị Nặng Mod-13",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "ACID_DARK",
    "manaCost": 3,
    "level": 4,
    "atk": 2540,
    "def": 2160,
    "chemicalFormula": "Ac2O3",
    "atomicNumber": 89,
    "effectCode": "ELEM_B26_AC_ACT_121",
    "effectText": "Khi tiêu diệt quái thú đối phương: Bức xạ hạt nhân thiêu đốt 300 LP đối thủ và làm giảm 200 ATK của toàn bộ quái thú đối phương.",
    "scientificLore": "Actini (Z=89) thuộc họ Actini, hạt nhân phóng xạ không bền có chu kỳ bán rã đặc trưng, giải phóng năng lượng liên kết hạt nhân cực lớn.",
    "relatedEquation": "2Ac + 3/2O₂ → Ac₂O₃",
    "iupacName": "Actinium",
    "archetype": "ACTINIDE_FISSION",
    "structuredEffects": [
      {
        "effectId": "B26_EFF_121",
        "activationWindow": "ON_DESTROY_MONSTER",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 350
            }
          }
        ],
        "description": "Bức xạ phân hạch thiêu đốt LP đối thủ."
      }
    ]
  },
  {
    "id": "card_b26_122_th_122",
    "name": "Thori — Chiến Binh Đồng Vị Nặng (Biến Thể 13)",
    "name_en": "Thorium — Chiến Binh Đồng Vị Nặng Mod-13",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "PYRO",
    "manaCost": 4,
    "level": 5,
    "atk": 2795,
    "def": 2350,
    "chemicalFormula": "ThO2",
    "atomicNumber": 90,
    "effectCode": "ELEM_B26_TH_ACT_122",
    "effectText": "Khi tiêu diệt quái thú đối phương: Bức xạ hạt nhân thiêu đốt 380 LP đối thủ và làm giảm 200 ATK của toàn bộ quái thú đối phương.",
    "scientificLore": "Thori (Z=90) thuộc họ Actini, hạt nhân phóng xạ không bền có chu kỳ bán rã đặc trưng, giải phóng năng lượng liên kết hạt nhân cực lớn.",
    "relatedEquation": "Th + O₂ → ThO₂",
    "iupacName": "Thorium",
    "archetype": "ACTINIDE_FISSION",
    "structuredEffects": [
      {
        "effectId": "B26_EFF_122",
        "activationWindow": "ON_DESTROY_MONSTER",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 350
            }
          }
        ],
        "description": "Bức xạ phân hạch thiêu đốt LP đối thủ."
      }
    ]
  },
  {
    "id": "card_b26_123_pa_123",
    "name": "Protactini — Chiến Binh Đồng Vị Nặng (Biến Thể 13)",
    "name_en": "Protactinium — Chiến Binh Đồng Vị Nặng Mod-13",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "ULTRA_RARE",
    "attribute": "ACID_DARK",
    "manaCost": 5,
    "level": 6,
    "atk": 3050,
    "def": 2540,
    "chemicalFormula": "Pa2O5",
    "atomicNumber": 91,
    "effectCode": "ELEM_B26_PA_ACT_123",
    "effectText": "Khi tiêu diệt quái thú đối phương: Bức xạ hạt nhân thiêu đốt 460 LP đối thủ và làm giảm 200 ATK của toàn bộ quái thú đối phương.",
    "scientificLore": "Protactini (Z=91) thuộc họ Actini, hạt nhân phóng xạ không bền có chu kỳ bán rã đặc trưng, giải phóng năng lượng liên kết hạt nhân cực lớn.",
    "relatedEquation": "2Pa + 5/2O₂ → Pa₂O₅",
    "iupacName": "Protactinium",
    "archetype": "ACTINIDE_FISSION",
    "structuredEffects": [
      {
        "effectId": "B26_EFF_123",
        "activationWindow": "ON_DESTROY_MONSTER",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 350
            }
          }
        ],
        "description": "Bức xạ phân hạch thiêu đốt LP đối thủ."
      }
    ]
  },
  {
    "id": "card_b26_124_u_124",
    "name": "Urani — Chiến Binh Đồng Vị Nặng (Biến Thể 13)",
    "name_en": "Uranium — Chiến Binh Đồng Vị Nặng Mod-13",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SECRET_RARE",
    "attribute": "ACID_DARK",
    "manaCost": 5,
    "level": 7,
    "atk": 3305,
    "def": 2730,
    "chemicalFormula": "UO2(NO3)2",
    "atomicNumber": 92,
    "effectCode": "ELEM_B26_U_ACT_124",
    "effectText": "Khi tiêu diệt quái thú đối phương: Bức xạ hạt nhân thiêu đốt 540 LP đối thủ và làm giảm 200 ATK của toàn bộ quái thú đối phương.",
    "scientificLore": "Urani (Z=92) thuộc họ Actini, hạt nhân phóng xạ không bền có chu kỳ bán rã đặc trưng, giải phóng năng lượng liên kết hạt nhân cực lớn.",
    "relatedEquation": "U + 4HNO₃ → UO₂(NO₃)₂ + 2NO₂ + 2H₂O",
    "iupacName": "Uranium",
    "archetype": "ACTINIDE_FISSION",
    "structuredEffects": [
      {
        "effectId": "B26_EFF_124",
        "activationWindow": "ON_DESTROY_MONSTER",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 350
            }
          }
        ],
        "description": "Bức xạ phân hạch thiêu đốt LP đối thủ."
      }
    ]
  },
  {
    "id": "card_b26_125_np_125",
    "name": "Neptuni — Chiến Binh Đồng Vị Nặng (Biến Thể 13)",
    "name_en": "Neptunium — Chiến Binh Đồng Vị Nặng Mod-13",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "ACID_DARK",
    "manaCost": 6,
    "level": 8,
    "atk": 3560,
    "def": 2920,
    "chemicalFormula": "NpO2",
    "atomicNumber": 93,
    "effectCode": "ELEM_B26_NP_ACT_125",
    "effectText": "Khi tiêu diệt quái thú đối phương: Bức xạ hạt nhân thiêu đốt 300 LP đối thủ và làm giảm 200 ATK của toàn bộ quái thú đối phương.",
    "scientificLore": "Neptuni (Z=93) thuộc họ Actini, hạt nhân phóng xạ không bền có chu kỳ bán rã đặc trưng, giải phóng năng lượng liên kết hạt nhân cực lớn.",
    "relatedEquation": "Np + O₂ → NpO₂",
    "iupacName": "Neptunium",
    "archetype": "ACTINIDE_FISSION",
    "structuredEffects": [
      {
        "effectId": "B26_EFF_125",
        "activationWindow": "ON_DESTROY_MONSTER",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 350
            }
          }
        ],
        "description": "Bức xạ phân hạch thiêu đốt LP đối thủ."
      }
    ]
  },
  {
    "id": "card_b26_126_pu_126",
    "name": "Plutoni — Chiến Binh Đồng Vị Nặng (Biến Thể 13)",
    "name_en": "Plutonium — Chiến Binh Đồng Vị Nặng Mod-13",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "PYRO",
    "manaCost": 3,
    "level": 4,
    "atk": 2540,
    "def": 2160,
    "chemicalFormula": "PuO2",
    "atomicNumber": 94,
    "effectCode": "ELEM_B26_PU_ACT_126",
    "effectText": "Khi tiêu diệt quái thú đối phương: Bức xạ hạt nhân thiêu đốt 380 LP đối thủ và làm giảm 200 ATK của toàn bộ quái thú đối phương.",
    "scientificLore": "Plutoni (Z=94) thuộc họ Actini, hạt nhân phóng xạ không bền có chu kỳ bán rã đặc trưng, giải phóng năng lượng liên kết hạt nhân cực lớn.",
    "relatedEquation": "Pu + O₂ → PuO₂",
    "iupacName": "Plutonium",
    "archetype": "ACTINIDE_FISSION",
    "structuredEffects": [
      {
        "effectId": "B26_EFF_126",
        "activationWindow": "ON_DESTROY_MONSTER",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 350
            }
          }
        ],
        "description": "Bức xạ phân hạch thiêu đốt LP đối thủ."
      }
    ]
  },
  {
    "id": "card_b26_127_am_127",
    "name": "Americi — Chiến Binh Đồng Vị Nặng (Biến Thể 13)",
    "name_en": "Americium — Chiến Binh Đồng Vị Nặng Mod-13",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "PYRO",
    "manaCost": 4,
    "level": 5,
    "atk": 2795,
    "def": 2350,
    "chemicalFormula": "AmO2",
    "atomicNumber": 95,
    "effectCode": "ELEM_B26_AM_ACT_127",
    "effectText": "Khi tiêu diệt quái thú đối phương: Bức xạ hạt nhân thiêu đốt 460 LP đối thủ và làm giảm 200 ATK của toàn bộ quái thú đối phương.",
    "scientificLore": "Americi (Z=95) thuộc họ Actini, hạt nhân phóng xạ không bền có chu kỳ bán rã đặc trưng, giải phóng năng lượng liên kết hạt nhân cực lớn.",
    "relatedEquation": "Am + O₂ → AmO₂",
    "iupacName": "Americium",
    "archetype": "ACTINIDE_FISSION",
    "structuredEffects": [
      {
        "effectId": "B26_EFF_127",
        "activationWindow": "ON_DESTROY_MONSTER",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 350
            }
          }
        ],
        "description": "Bức xạ phân hạch thiêu đốt LP đối thủ."
      }
    ]
  },
  {
    "id": "card_b26_128_cm_128",
    "name": "Curi — Chiến Binh Đồng Vị Nặng (Biến Thể 13)",
    "name_en": "Curium — Chiến Binh Đồng Vị Nặng Mod-13",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "ACID_DARK",
    "manaCost": 5,
    "level": 6,
    "atk": 3050,
    "def": 2540,
    "chemicalFormula": "Cm2O3",
    "atomicNumber": 96,
    "effectCode": "ELEM_B26_CM_ACT_128",
    "effectText": "Khi tiêu diệt quái thú đối phương: Bức xạ hạt nhân thiêu đốt 540 LP đối thủ và làm giảm 200 ATK của toàn bộ quái thú đối phương.",
    "scientificLore": "Curi (Z=96) thuộc họ Actini, hạt nhân phóng xạ không bền có chu kỳ bán rã đặc trưng, giải phóng năng lượng liên kết hạt nhân cực lớn.",
    "relatedEquation": "2Cm + 3/2O₂ → Cm₂O₃",
    "iupacName": "Curium",
    "archetype": "ACTINIDE_FISSION",
    "structuredEffects": [
      {
        "effectId": "B26_EFF_128",
        "activationWindow": "ON_DESTROY_MONSTER",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 350
            }
          }
        ],
        "description": "Bức xạ phân hạch thiêu đốt LP đối thủ."
      }
    ]
  },
  {
    "id": "card_b26_129_bk_129",
    "name": "Berkeli — Chiến Binh Đồng Vị Nặng (Biến Thể 13)",
    "name_en": "Berkelium — Chiến Binh Đồng Vị Nặng Mod-13",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "ACID_DARK",
    "manaCost": 5,
    "level": 7,
    "atk": 3305,
    "def": 2730,
    "chemicalFormula": "BkO2",
    "atomicNumber": 97,
    "effectCode": "ELEM_B26_BK_ACT_129",
    "effectText": "Khi tiêu diệt quái thú đối phương: Bức xạ hạt nhân thiêu đốt 300 LP đối thủ và làm giảm 200 ATK của toàn bộ quái thú đối phương.",
    "scientificLore": "Berkeli (Z=97) thuộc họ Actini, hạt nhân phóng xạ không bền có chu kỳ bán rã đặc trưng, giải phóng năng lượng liên kết hạt nhân cực lớn.",
    "relatedEquation": "Bk + O₂ → BkO₂",
    "iupacName": "Berkelium",
    "archetype": "ACTINIDE_FISSION",
    "structuredEffects": [
      {
        "effectId": "B26_EFF_129",
        "activationWindow": "ON_DESTROY_MONSTER",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 350
            }
          }
        ],
        "description": "Bức xạ phân hạch thiêu đốt LP đối thủ."
      }
    ]
  },
  {
    "id": "card_b26_130_cf_130",
    "name": "Californi — Chiến Binh Đồng Vị Nặng (Biến Thể 13)",
    "name_en": "Californium — Chiến Binh Đồng Vị Nặng Mod-13",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "NOBLE_VOID",
    "manaCost": 6,
    "level": 8,
    "atk": 3560,
    "def": 2920,
    "chemicalFormula": "Cf2O3",
    "atomicNumber": 98,
    "effectCode": "ELEM_B26_CF_ACT_130",
    "effectText": "Khi tiêu diệt quái thú đối phương: Bức xạ hạt nhân thiêu đốt 380 LP đối thủ và làm giảm 200 ATK của toàn bộ quái thú đối phương.",
    "scientificLore": "Californi (Z=98) thuộc họ Actini, hạt nhân phóng xạ không bền có chu kỳ bán rã đặc trưng, giải phóng năng lượng liên kết hạt nhân cực lớn.",
    "relatedEquation": "2Cf + 3/2O₂ → Cf₂O₃",
    "iupacName": "Californium",
    "archetype": "ACTINIDE_FISSION",
    "structuredEffects": [
      {
        "effectId": "B26_EFF_130",
        "activationWindow": "ON_DESTROY_MONSTER",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 350
            }
          }
        ],
        "description": "Bức xạ phân hạch thiêu đốt LP đối thủ."
      }
    ]
  },
  {
    "id": "card_b26_131_ac_131",
    "name": "Actini — Thần Tượng Phân Rã Hạt Nhân (Biến Thể 14)",
    "name_en": "Actinium — Thần Tượng Phân Rã Hạt Nhân Mod-14",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "ACID_DARK",
    "manaCost": 3,
    "level": 4,
    "atk": 2540,
    "def": 2160,
    "chemicalFormula": "Ac2O3",
    "atomicNumber": 89,
    "effectCode": "ELEM_B26_AC_ACT_131",
    "effectText": "Khi tiêu diệt quái thú đối phương: Bức xạ hạt nhân thiêu đốt 460 LP đối thủ và làm giảm 200 ATK của toàn bộ quái thú đối phương.",
    "scientificLore": "Actini (Z=89) thuộc họ Actini, hạt nhân phóng xạ không bền có chu kỳ bán rã đặc trưng, giải phóng năng lượng liên kết hạt nhân cực lớn.",
    "relatedEquation": "2Ac + 3/2O₂ → Ac₂O₃",
    "iupacName": "Actinium",
    "archetype": "ACTINIDE_FISSION",
    "structuredEffects": [
      {
        "effectId": "B26_EFF_131",
        "activationWindow": "ON_DESTROY_MONSTER",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 350
            }
          }
        ],
        "description": "Bức xạ phân hạch thiêu đốt LP đối thủ."
      }
    ]
  },
  {
    "id": "card_b26_132_th_132",
    "name": "Thori — Thần Tượng Phân Rã Hạt Nhân (Biến Thể 14)",
    "name_en": "Thorium — Thần Tượng Phân Rã Hạt Nhân Mod-14",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "ULTRA_RARE",
    "attribute": "PYRO",
    "manaCost": 4,
    "level": 5,
    "atk": 2795,
    "def": 2350,
    "chemicalFormula": "ThO2",
    "atomicNumber": 90,
    "effectCode": "ELEM_B26_TH_ACT_132",
    "effectText": "Khi tiêu diệt quái thú đối phương: Bức xạ hạt nhân thiêu đốt 540 LP đối thủ và làm giảm 200 ATK của toàn bộ quái thú đối phương.",
    "scientificLore": "Thori (Z=90) thuộc họ Actini, hạt nhân phóng xạ không bền có chu kỳ bán rã đặc trưng, giải phóng năng lượng liên kết hạt nhân cực lớn.",
    "relatedEquation": "Th + O₂ → ThO₂",
    "iupacName": "Thorium",
    "archetype": "ACTINIDE_FISSION",
    "structuredEffects": [
      {
        "effectId": "B26_EFF_132",
        "activationWindow": "ON_DESTROY_MONSTER",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 350
            }
          }
        ],
        "description": "Bức xạ phân hạch thiêu đốt LP đối thủ."
      }
    ]
  },
  {
    "id": "card_b26_133_pa_133",
    "name": "Protactini — Thần Tượng Phân Rã Hạt Nhân (Biến Thể 14)",
    "name_en": "Protactinium — Thần Tượng Phân Rã Hạt Nhân Mod-14",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SECRET_RARE",
    "attribute": "ACID_DARK",
    "manaCost": 5,
    "level": 6,
    "atk": 3050,
    "def": 2540,
    "chemicalFormula": "Pa2O5",
    "atomicNumber": 91,
    "effectCode": "ELEM_B26_PA_ACT_133",
    "effectText": "Khi tiêu diệt quái thú đối phương: Bức xạ hạt nhân thiêu đốt 300 LP đối thủ và làm giảm 200 ATK của toàn bộ quái thú đối phương.",
    "scientificLore": "Protactini (Z=91) thuộc họ Actini, hạt nhân phóng xạ không bền có chu kỳ bán rã đặc trưng, giải phóng năng lượng liên kết hạt nhân cực lớn.",
    "relatedEquation": "2Pa + 5/2O₂ → Pa₂O₅",
    "iupacName": "Protactinium",
    "archetype": "ACTINIDE_FISSION",
    "structuredEffects": [
      {
        "effectId": "B26_EFF_133",
        "activationWindow": "ON_DESTROY_MONSTER",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 350
            }
          }
        ],
        "description": "Bức xạ phân hạch thiêu đốt LP đối thủ."
      }
    ]
  },
  {
    "id": "card_b26_134_u_134",
    "name": "Urani — Thần Tượng Phân Rã Hạt Nhân (Biến Thể 14)",
    "name_en": "Uranium — Thần Tượng Phân Rã Hạt Nhân Mod-14",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "ACID_DARK",
    "manaCost": 5,
    "level": 7,
    "atk": 3305,
    "def": 2730,
    "chemicalFormula": "UO2(NO3)2",
    "atomicNumber": 92,
    "effectCode": "ELEM_B26_U_ACT_134",
    "effectText": "Khi tiêu diệt quái thú đối phương: Bức xạ hạt nhân thiêu đốt 380 LP đối thủ và làm giảm 200 ATK của toàn bộ quái thú đối phương.",
    "scientificLore": "Urani (Z=92) thuộc họ Actini, hạt nhân phóng xạ không bền có chu kỳ bán rã đặc trưng, giải phóng năng lượng liên kết hạt nhân cực lớn.",
    "relatedEquation": "U + 4HNO₃ → UO₂(NO₃)₂ + 2NO₂ + 2H₂O",
    "iupacName": "Uranium",
    "archetype": "ACTINIDE_FISSION",
    "structuredEffects": [
      {
        "effectId": "B26_EFF_134",
        "activationWindow": "ON_DESTROY_MONSTER",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 350
            }
          }
        ],
        "description": "Bức xạ phân hạch thiêu đốt LP đối thủ."
      }
    ]
  },
  {
    "id": "card_b26_135_np_135",
    "name": "Neptuni — Thần Tượng Phân Rã Hạt Nhân (Biến Thể 14)",
    "name_en": "Neptunium — Thần Tượng Phân Rã Hạt Nhân Mod-14",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "ACID_DARK",
    "manaCost": 6,
    "level": 8,
    "atk": 3560,
    "def": 2920,
    "chemicalFormula": "NpO2",
    "atomicNumber": 93,
    "effectCode": "ELEM_B26_NP_ACT_135",
    "effectText": "Khi tiêu diệt quái thú đối phương: Bức xạ hạt nhân thiêu đốt 460 LP đối thủ và làm giảm 200 ATK của toàn bộ quái thú đối phương.",
    "scientificLore": "Neptuni (Z=93) thuộc họ Actini, hạt nhân phóng xạ không bền có chu kỳ bán rã đặc trưng, giải phóng năng lượng liên kết hạt nhân cực lớn.",
    "relatedEquation": "Np + O₂ → NpO₂",
    "iupacName": "Neptunium",
    "archetype": "ACTINIDE_FISSION",
    "structuredEffects": [
      {
        "effectId": "B26_EFF_135",
        "activationWindow": "ON_DESTROY_MONSTER",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 350
            }
          }
        ],
        "description": "Bức xạ phân hạch thiêu đốt LP đối thủ."
      }
    ]
  },
  {
    "id": "card_b26_136_pu_136",
    "name": "Plutoni — Thần Tượng Phân Rã Hạt Nhân (Biến Thể 14)",
    "name_en": "Plutonium — Thần Tượng Phân Rã Hạt Nhân Mod-14",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "PYRO",
    "manaCost": 3,
    "level": 4,
    "atk": 2540,
    "def": 2160,
    "chemicalFormula": "PuO2",
    "atomicNumber": 94,
    "effectCode": "ELEM_B26_PU_ACT_136",
    "effectText": "Khi tiêu diệt quái thú đối phương: Bức xạ hạt nhân thiêu đốt 540 LP đối thủ và làm giảm 200 ATK của toàn bộ quái thú đối phương.",
    "scientificLore": "Plutoni (Z=94) thuộc họ Actini, hạt nhân phóng xạ không bền có chu kỳ bán rã đặc trưng, giải phóng năng lượng liên kết hạt nhân cực lớn.",
    "relatedEquation": "Pu + O₂ → PuO₂",
    "iupacName": "Plutonium",
    "archetype": "ACTINIDE_FISSION",
    "structuredEffects": [
      {
        "effectId": "B26_EFF_136",
        "activationWindow": "ON_DESTROY_MONSTER",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 350
            }
          }
        ],
        "description": "Bức xạ phân hạch thiêu đốt LP đối thủ."
      }
    ]
  },
  {
    "id": "card_b26_137_am_137",
    "name": "Americi — Thần Tượng Phân Rã Hạt Nhân (Biến Thể 14)",
    "name_en": "Americium — Thần Tượng Phân Rã Hạt Nhân Mod-14",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "PYRO",
    "manaCost": 4,
    "level": 5,
    "atk": 2795,
    "def": 2350,
    "chemicalFormula": "AmO2",
    "atomicNumber": 95,
    "effectCode": "ELEM_B26_AM_ACT_137",
    "effectText": "Khi tiêu diệt quái thú đối phương: Bức xạ hạt nhân thiêu đốt 300 LP đối thủ và làm giảm 200 ATK của toàn bộ quái thú đối phương.",
    "scientificLore": "Americi (Z=95) thuộc họ Actini, hạt nhân phóng xạ không bền có chu kỳ bán rã đặc trưng, giải phóng năng lượng liên kết hạt nhân cực lớn.",
    "relatedEquation": "Am + O₂ → AmO₂",
    "iupacName": "Americium",
    "archetype": "ACTINIDE_FISSION",
    "structuredEffects": [
      {
        "effectId": "B26_EFF_137",
        "activationWindow": "ON_DESTROY_MONSTER",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 350
            }
          }
        ],
        "description": "Bức xạ phân hạch thiêu đốt LP đối thủ."
      }
    ]
  },
  {
    "id": "card_b26_138_cm_138",
    "name": "Curi — Thần Tượng Phân Rã Hạt Nhân (Biến Thể 14)",
    "name_en": "Curium — Thần Tượng Phân Rã Hạt Nhân Mod-14",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "ACID_DARK",
    "manaCost": 5,
    "level": 6,
    "atk": 3050,
    "def": 2540,
    "chemicalFormula": "Cm2O3",
    "atomicNumber": 96,
    "effectCode": "ELEM_B26_CM_ACT_138",
    "effectText": "Khi tiêu diệt quái thú đối phương: Bức xạ hạt nhân thiêu đốt 380 LP đối thủ và làm giảm 200 ATK của toàn bộ quái thú đối phương.",
    "scientificLore": "Curi (Z=96) thuộc họ Actini, hạt nhân phóng xạ không bền có chu kỳ bán rã đặc trưng, giải phóng năng lượng liên kết hạt nhân cực lớn.",
    "relatedEquation": "2Cm + 3/2O₂ → Cm₂O₃",
    "iupacName": "Curium",
    "archetype": "ACTINIDE_FISSION",
    "structuredEffects": [
      {
        "effectId": "B26_EFF_138",
        "activationWindow": "ON_DESTROY_MONSTER",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 350
            }
          }
        ],
        "description": "Bức xạ phân hạch thiêu đốt LP đối thủ."
      }
    ]
  },
  {
    "id": "card_b26_139_bk_139",
    "name": "Berkeli — Thần Tượng Phân Rã Hạt Nhân (Biến Thể 14)",
    "name_en": "Berkelium — Thần Tượng Phân Rã Hạt Nhân Mod-14",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "ACID_DARK",
    "manaCost": 5,
    "level": 7,
    "atk": 3305,
    "def": 2730,
    "chemicalFormula": "BkO2",
    "atomicNumber": 97,
    "effectCode": "ELEM_B26_BK_ACT_139",
    "effectText": "Khi tiêu diệt quái thú đối phương: Bức xạ hạt nhân thiêu đốt 460 LP đối thủ và làm giảm 200 ATK của toàn bộ quái thú đối phương.",
    "scientificLore": "Berkeli (Z=97) thuộc họ Actini, hạt nhân phóng xạ không bền có chu kỳ bán rã đặc trưng, giải phóng năng lượng liên kết hạt nhân cực lớn.",
    "relatedEquation": "Bk + O₂ → BkO₂",
    "iupacName": "Berkelium",
    "archetype": "ACTINIDE_FISSION",
    "structuredEffects": [
      {
        "effectId": "B26_EFF_139",
        "activationWindow": "ON_DESTROY_MONSTER",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 350
            }
          }
        ],
        "description": "Bức xạ phân hạch thiêu đốt LP đối thủ."
      }
    ]
  },
  {
    "id": "card_b26_140_cf_140",
    "name": "Californi — Thần Tượng Phân Rã Hạt Nhân (Biến Thể 14)",
    "name_en": "Californium — Thần Tượng Phân Rã Hạt Nhân Mod-14",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "NOBLE_VOID",
    "manaCost": 6,
    "level": 8,
    "atk": 3560,
    "def": 2920,
    "chemicalFormula": "Cf2O3",
    "atomicNumber": 98,
    "effectCode": "ELEM_B26_CF_ACT_140",
    "effectText": "Khi tiêu diệt quái thú đối phương: Bức xạ hạt nhân thiêu đốt 540 LP đối thủ và làm giảm 200 ATK của toàn bộ quái thú đối phương.",
    "scientificLore": "Californi (Z=98) thuộc họ Actini, hạt nhân phóng xạ không bền có chu kỳ bán rã đặc trưng, giải phóng năng lượng liên kết hạt nhân cực lớn.",
    "relatedEquation": "2Cf + 3/2O₂ → Cf₂O₃",
    "iupacName": "Californium",
    "archetype": "ACTINIDE_FISSION",
    "structuredEffects": [
      {
        "effectId": "B26_EFF_140",
        "activationWindow": "ON_DESTROY_MONSTER",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 350
            }
          }
        ],
        "description": "Bức xạ phân hạch thiêu đốt LP đối thủ."
      }
    ]
  },
  {
    "id": "card_b26_141_ac_141",
    "name": "Actini — Bậc Thầy Bán Rã (Biến Thể 15)",
    "name_en": "Actinium — Bậc Thầy Bán Rã Mod-15",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "ULTRA_RARE",
    "attribute": "ACID_DARK",
    "manaCost": 3,
    "level": 4,
    "atk": 2540,
    "def": 2160,
    "chemicalFormula": "Ac2O3",
    "atomicNumber": 89,
    "effectCode": "ELEM_B26_AC_ACT_141",
    "effectText": "Khi tiêu diệt quái thú đối phương: Bức xạ hạt nhân thiêu đốt 300 LP đối thủ và làm giảm 200 ATK của toàn bộ quái thú đối phương.",
    "scientificLore": "Actini (Z=89) thuộc họ Actini, hạt nhân phóng xạ không bền có chu kỳ bán rã đặc trưng, giải phóng năng lượng liên kết hạt nhân cực lớn.",
    "relatedEquation": "2Ac + 3/2O₂ → Ac₂O₃",
    "iupacName": "Actinium",
    "archetype": "ACTINIDE_FISSION",
    "structuredEffects": [
      {
        "effectId": "B26_EFF_141",
        "activationWindow": "ON_DESTROY_MONSTER",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 350
            }
          }
        ],
        "description": "Bức xạ phân hạch thiêu đốt LP đối thủ."
      }
    ]
  },
  {
    "id": "card_b26_142_th_142",
    "name": "Thori — Bậc Thầy Bán Rã (Biến Thể 15)",
    "name_en": "Thorium — Bậc Thầy Bán Rã Mod-15",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SECRET_RARE",
    "attribute": "PYRO",
    "manaCost": 4,
    "level": 5,
    "atk": 2795,
    "def": 2350,
    "chemicalFormula": "ThO2",
    "atomicNumber": 90,
    "effectCode": "ELEM_B26_TH_ACT_142",
    "effectText": "Khi tiêu diệt quái thú đối phương: Bức xạ hạt nhân thiêu đốt 380 LP đối thủ và làm giảm 200 ATK của toàn bộ quái thú đối phương.",
    "scientificLore": "Thori (Z=90) thuộc họ Actini, hạt nhân phóng xạ không bền có chu kỳ bán rã đặc trưng, giải phóng năng lượng liên kết hạt nhân cực lớn.",
    "relatedEquation": "Th + O₂ → ThO₂",
    "iupacName": "Thorium",
    "archetype": "ACTINIDE_FISSION",
    "structuredEffects": [
      {
        "effectId": "B26_EFF_142",
        "activationWindow": "ON_DESTROY_MONSTER",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 350
            }
          }
        ],
        "description": "Bức xạ phân hạch thiêu đốt LP đối thủ."
      }
    ]
  },
  {
    "id": "card_b26_143_pa_143",
    "name": "Protactini — Bậc Thầy Bán Rã (Biến Thể 15)",
    "name_en": "Protactinium — Bậc Thầy Bán Rã Mod-15",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "ACID_DARK",
    "manaCost": 5,
    "level": 6,
    "atk": 3050,
    "def": 2540,
    "chemicalFormula": "Pa2O5",
    "atomicNumber": 91,
    "effectCode": "ELEM_B26_PA_ACT_143",
    "effectText": "Khi tiêu diệt quái thú đối phương: Bức xạ hạt nhân thiêu đốt 460 LP đối thủ và làm giảm 200 ATK của toàn bộ quái thú đối phương.",
    "scientificLore": "Protactini (Z=91) thuộc họ Actini, hạt nhân phóng xạ không bền có chu kỳ bán rã đặc trưng, giải phóng năng lượng liên kết hạt nhân cực lớn.",
    "relatedEquation": "2Pa + 5/2O₂ → Pa₂O₅",
    "iupacName": "Protactinium",
    "archetype": "ACTINIDE_FISSION",
    "structuredEffects": [
      {
        "effectId": "B26_EFF_143",
        "activationWindow": "ON_DESTROY_MONSTER",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 350
            }
          }
        ],
        "description": "Bức xạ phân hạch thiêu đốt LP đối thủ."
      }
    ]
  },
  {
    "id": "card_b26_144_u_144",
    "name": "Urani — Bậc Thầy Bán Rã (Biến Thể 15)",
    "name_en": "Uranium — Bậc Thầy Bán Rã Mod-15",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "ACID_DARK",
    "manaCost": 5,
    "level": 7,
    "atk": 3305,
    "def": 2730,
    "chemicalFormula": "UO2(NO3)2",
    "atomicNumber": 92,
    "effectCode": "ELEM_B26_U_ACT_144",
    "effectText": "Khi tiêu diệt quái thú đối phương: Bức xạ hạt nhân thiêu đốt 540 LP đối thủ và làm giảm 200 ATK của toàn bộ quái thú đối phương.",
    "scientificLore": "Urani (Z=92) thuộc họ Actini, hạt nhân phóng xạ không bền có chu kỳ bán rã đặc trưng, giải phóng năng lượng liên kết hạt nhân cực lớn.",
    "relatedEquation": "U + 4HNO₃ → UO₂(NO₃)₂ + 2NO₂ + 2H₂O",
    "iupacName": "Uranium",
    "archetype": "ACTINIDE_FISSION",
    "structuredEffects": [
      {
        "effectId": "B26_EFF_144",
        "activationWindow": "ON_DESTROY_MONSTER",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 350
            }
          }
        ],
        "description": "Bức xạ phân hạch thiêu đốt LP đối thủ."
      }
    ]
  },
  {
    "id": "card_b26_145_np_145",
    "name": "Neptuni — Bậc Thầy Bán Rã (Biến Thể 15)",
    "name_en": "Neptunium — Bậc Thầy Bán Rã Mod-15",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "ACID_DARK",
    "manaCost": 6,
    "level": 8,
    "atk": 3560,
    "def": 2920,
    "chemicalFormula": "NpO2",
    "atomicNumber": 93,
    "effectCode": "ELEM_B26_NP_ACT_145",
    "effectText": "Khi tiêu diệt quái thú đối phương: Bức xạ hạt nhân thiêu đốt 300 LP đối thủ và làm giảm 200 ATK của toàn bộ quái thú đối phương.",
    "scientificLore": "Neptuni (Z=93) thuộc họ Actini, hạt nhân phóng xạ không bền có chu kỳ bán rã đặc trưng, giải phóng năng lượng liên kết hạt nhân cực lớn.",
    "relatedEquation": "Np + O₂ → NpO₂",
    "iupacName": "Neptunium",
    "archetype": "ACTINIDE_FISSION",
    "structuredEffects": [
      {
        "effectId": "B26_EFF_145",
        "activationWindow": "ON_DESTROY_MONSTER",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 350
            }
          }
        ],
        "description": "Bức xạ phân hạch thiêu đốt LP đối thủ."
      }
    ]
  },
  {
    "id": "card_b26_146_pu_146",
    "name": "Plutoni — Bậc Thầy Bán Rã (Biến Thể 15)",
    "name_en": "Plutonium — Bậc Thầy Bán Rã Mod-15",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "PYRO",
    "manaCost": 3,
    "level": 4,
    "atk": 2540,
    "def": 2160,
    "chemicalFormula": "PuO2",
    "atomicNumber": 94,
    "effectCode": "ELEM_B26_PU_ACT_146",
    "effectText": "Khi tiêu diệt quái thú đối phương: Bức xạ hạt nhân thiêu đốt 380 LP đối thủ và làm giảm 200 ATK của toàn bộ quái thú đối phương.",
    "scientificLore": "Plutoni (Z=94) thuộc họ Actini, hạt nhân phóng xạ không bền có chu kỳ bán rã đặc trưng, giải phóng năng lượng liên kết hạt nhân cực lớn.",
    "relatedEquation": "Pu + O₂ → PuO₂",
    "iupacName": "Plutonium",
    "archetype": "ACTINIDE_FISSION",
    "structuredEffects": [
      {
        "effectId": "B26_EFF_146",
        "activationWindow": "ON_DESTROY_MONSTER",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 350
            }
          }
        ],
        "description": "Bức xạ phân hạch thiêu đốt LP đối thủ."
      }
    ]
  },
  {
    "id": "card_b26_147_am_147",
    "name": "Americi — Bậc Thầy Bán Rã (Biến Thể 15)",
    "name_en": "Americium — Bậc Thầy Bán Rã Mod-15",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "PYRO",
    "manaCost": 4,
    "level": 5,
    "atk": 2795,
    "def": 2350,
    "chemicalFormula": "AmO2",
    "atomicNumber": 95,
    "effectCode": "ELEM_B26_AM_ACT_147",
    "effectText": "Khi tiêu diệt quái thú đối phương: Bức xạ hạt nhân thiêu đốt 460 LP đối thủ và làm giảm 200 ATK của toàn bộ quái thú đối phương.",
    "scientificLore": "Americi (Z=95) thuộc họ Actini, hạt nhân phóng xạ không bền có chu kỳ bán rã đặc trưng, giải phóng năng lượng liên kết hạt nhân cực lớn.",
    "relatedEquation": "Am + O₂ → AmO₂",
    "iupacName": "Americium",
    "archetype": "ACTINIDE_FISSION",
    "structuredEffects": [
      {
        "effectId": "B26_EFF_147",
        "activationWindow": "ON_DESTROY_MONSTER",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 350
            }
          }
        ],
        "description": "Bức xạ phân hạch thiêu đốt LP đối thủ."
      }
    ]
  },
  {
    "id": "card_b26_148_cm_148",
    "name": "Curi — Bậc Thầy Bán Rã (Biến Thể 15)",
    "name_en": "Curium — Bậc Thầy Bán Rã Mod-15",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "ACID_DARK",
    "manaCost": 5,
    "level": 6,
    "atk": 3050,
    "def": 2540,
    "chemicalFormula": "Cm2O3",
    "atomicNumber": 96,
    "effectCode": "ELEM_B26_CM_ACT_148",
    "effectText": "Khi tiêu diệt quái thú đối phương: Bức xạ hạt nhân thiêu đốt 540 LP đối thủ và làm giảm 200 ATK của toàn bộ quái thú đối phương.",
    "scientificLore": "Curi (Z=96) thuộc họ Actini, hạt nhân phóng xạ không bền có chu kỳ bán rã đặc trưng, giải phóng năng lượng liên kết hạt nhân cực lớn.",
    "relatedEquation": "2Cm + 3/2O₂ → Cm₂O₃",
    "iupacName": "Curium",
    "archetype": "ACTINIDE_FISSION",
    "structuredEffects": [
      {
        "effectId": "B26_EFF_148",
        "activationWindow": "ON_DESTROY_MONSTER",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 350
            }
          }
        ],
        "description": "Bức xạ phân hạch thiêu đốt LP đối thủ."
      }
    ]
  },
  {
    "id": "card_b26_149_bk_149",
    "name": "Berkeli — Bậc Thầy Bán Rã (Biến Thể 15)",
    "name_en": "Berkelium — Bậc Thầy Bán Rã Mod-15",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "ACID_DARK",
    "manaCost": 5,
    "level": 7,
    "atk": 3305,
    "def": 2730,
    "chemicalFormula": "BkO2",
    "atomicNumber": 97,
    "effectCode": "ELEM_B26_BK_ACT_149",
    "effectText": "Khi tiêu diệt quái thú đối phương: Bức xạ hạt nhân thiêu đốt 300 LP đối thủ và làm giảm 200 ATK của toàn bộ quái thú đối phương.",
    "scientificLore": "Berkeli (Z=97) thuộc họ Actini, hạt nhân phóng xạ không bền có chu kỳ bán rã đặc trưng, giải phóng năng lượng liên kết hạt nhân cực lớn.",
    "relatedEquation": "Bk + O₂ → BkO₂",
    "iupacName": "Berkelium",
    "archetype": "ACTINIDE_FISSION",
    "structuredEffects": [
      {
        "effectId": "B26_EFF_149",
        "activationWindow": "ON_DESTROY_MONSTER",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 350
            }
          }
        ],
        "description": "Bức xạ phân hạch thiêu đốt LP đối thủ."
      }
    ]
  },
  {
    "id": "card_b26_150_cf_150",
    "name": "Californi — Bậc Thầy Bán Rã (Biến Thể 15)",
    "name_en": "Californium — Bậc Thầy Bán Rã Mod-15",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "ULTRA_RARE",
    "attribute": "NOBLE_VOID",
    "manaCost": 6,
    "level": 8,
    "atk": 3560,
    "def": 2920,
    "chemicalFormula": "Cf2O3",
    "atomicNumber": 98,
    "effectCode": "ELEM_B26_CF_ACT_150",
    "effectText": "Khi tiêu diệt quái thú đối phương: Bức xạ hạt nhân thiêu đốt 380 LP đối thủ và làm giảm 200 ATK của toàn bộ quái thú đối phương.",
    "scientificLore": "Californi (Z=98) thuộc họ Actini, hạt nhân phóng xạ không bền có chu kỳ bán rã đặc trưng, giải phóng năng lượng liên kết hạt nhân cực lớn.",
    "relatedEquation": "2Cf + 3/2O₂ → Cf₂O₃",
    "iupacName": "Californium",
    "archetype": "ACTINIDE_FISSION",
    "structuredEffects": [
      {
        "effectId": "B26_EFF_150",
        "activationWindow": "ON_DESTROY_MONSTER",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 350
            }
          }
        ],
        "description": "Bức xạ phân hạch thiêu đốt LP đối thủ."
      }
    ]
  },
  {
    "id": "card_b26_151_ac_151",
    "name": "Actini — Kẻ Thao Túng Tia Gamma (Biến Thể 16)",
    "name_en": "Actinium — Kẻ Thao Túng Tia Gamma Mod-16",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SECRET_RARE",
    "attribute": "ACID_DARK",
    "manaCost": 3,
    "level": 4,
    "atk": 2540,
    "def": 2160,
    "chemicalFormula": "Ac2O3",
    "atomicNumber": 89,
    "effectCode": "ELEM_B26_AC_ACT_151",
    "effectText": "Khi tiêu diệt quái thú đối phương: Bức xạ hạt nhân thiêu đốt 460 LP đối thủ và làm giảm 200 ATK của toàn bộ quái thú đối phương.",
    "scientificLore": "Actini (Z=89) thuộc họ Actini, hạt nhân phóng xạ không bền có chu kỳ bán rã đặc trưng, giải phóng năng lượng liên kết hạt nhân cực lớn.",
    "relatedEquation": "2Ac + 3/2O₂ → Ac₂O₃",
    "iupacName": "Actinium",
    "archetype": "ACTINIDE_FISSION",
    "structuredEffects": [
      {
        "effectId": "B26_EFF_151",
        "activationWindow": "ON_DESTROY_MONSTER",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 350
            }
          }
        ],
        "description": "Bức xạ phân hạch thiêu đốt LP đối thủ."
      }
    ]
  },
  {
    "id": "card_b26_152_th_152",
    "name": "Thori — Kẻ Thao Túng Tia Gamma (Biến Thể 16)",
    "name_en": "Thorium — Kẻ Thao Túng Tia Gamma Mod-16",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "PYRO",
    "manaCost": 4,
    "level": 5,
    "atk": 2795,
    "def": 2350,
    "chemicalFormula": "ThO2",
    "atomicNumber": 90,
    "effectCode": "ELEM_B26_TH_ACT_152",
    "effectText": "Khi tiêu diệt quái thú đối phương: Bức xạ hạt nhân thiêu đốt 540 LP đối thủ và làm giảm 200 ATK của toàn bộ quái thú đối phương.",
    "scientificLore": "Thori (Z=90) thuộc họ Actini, hạt nhân phóng xạ không bền có chu kỳ bán rã đặc trưng, giải phóng năng lượng liên kết hạt nhân cực lớn.",
    "relatedEquation": "Th + O₂ → ThO₂",
    "iupacName": "Thorium",
    "archetype": "ACTINIDE_FISSION",
    "structuredEffects": [
      {
        "effectId": "B26_EFF_152",
        "activationWindow": "ON_DESTROY_MONSTER",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 350
            }
          }
        ],
        "description": "Bức xạ phân hạch thiêu đốt LP đối thủ."
      }
    ]
  },
  {
    "id": "card_b26_153_pa_153",
    "name": "Protactini — Kẻ Thao Túng Tia Gamma (Biến Thể 16)",
    "name_en": "Protactinium — Kẻ Thao Túng Tia Gamma Mod-16",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "ACID_DARK",
    "manaCost": 5,
    "level": 6,
    "atk": 3050,
    "def": 2540,
    "chemicalFormula": "Pa2O5",
    "atomicNumber": 91,
    "effectCode": "ELEM_B26_PA_ACT_153",
    "effectText": "Khi tiêu diệt quái thú đối phương: Bức xạ hạt nhân thiêu đốt 300 LP đối thủ và làm giảm 200 ATK của toàn bộ quái thú đối phương.",
    "scientificLore": "Protactini (Z=91) thuộc họ Actini, hạt nhân phóng xạ không bền có chu kỳ bán rã đặc trưng, giải phóng năng lượng liên kết hạt nhân cực lớn.",
    "relatedEquation": "2Pa + 5/2O₂ → Pa₂O₅",
    "iupacName": "Protactinium",
    "archetype": "ACTINIDE_FISSION",
    "structuredEffects": [
      {
        "effectId": "B26_EFF_153",
        "activationWindow": "ON_DESTROY_MONSTER",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 350
            }
          }
        ],
        "description": "Bức xạ phân hạch thiêu đốt LP đối thủ."
      }
    ]
  },
  {
    "id": "card_b26_154_u_154",
    "name": "Urani — Kẻ Thao Túng Tia Gamma (Biến Thể 16)",
    "name_en": "Uranium — Kẻ Thao Túng Tia Gamma Mod-16",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "ACID_DARK",
    "manaCost": 5,
    "level": 7,
    "atk": 3305,
    "def": 2730,
    "chemicalFormula": "UO2(NO3)2",
    "atomicNumber": 92,
    "effectCode": "ELEM_B26_U_ACT_154",
    "effectText": "Khi tiêu diệt quái thú đối phương: Bức xạ hạt nhân thiêu đốt 380 LP đối thủ và làm giảm 200 ATK của toàn bộ quái thú đối phương.",
    "scientificLore": "Urani (Z=92) thuộc họ Actini, hạt nhân phóng xạ không bền có chu kỳ bán rã đặc trưng, giải phóng năng lượng liên kết hạt nhân cực lớn.",
    "relatedEquation": "U + 4HNO₃ → UO₂(NO₃)₂ + 2NO₂ + 2H₂O",
    "iupacName": "Uranium",
    "archetype": "ACTINIDE_FISSION",
    "structuredEffects": [
      {
        "effectId": "B26_EFF_154",
        "activationWindow": "ON_DESTROY_MONSTER",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 350
            }
          }
        ],
        "description": "Bức xạ phân hạch thiêu đốt LP đối thủ."
      }
    ]
  },
  {
    "id": "card_b26_155_np_155",
    "name": "Neptuni — Kẻ Thao Túng Tia Gamma (Biến Thể 16)",
    "name_en": "Neptunium — Kẻ Thao Túng Tia Gamma Mod-16",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "ACID_DARK",
    "manaCost": 6,
    "level": 8,
    "atk": 3560,
    "def": 2920,
    "chemicalFormula": "NpO2",
    "atomicNumber": 93,
    "effectCode": "ELEM_B26_NP_ACT_155",
    "effectText": "Khi tiêu diệt quái thú đối phương: Bức xạ hạt nhân thiêu đốt 460 LP đối thủ và làm giảm 200 ATK của toàn bộ quái thú đối phương.",
    "scientificLore": "Neptuni (Z=93) thuộc họ Actini, hạt nhân phóng xạ không bền có chu kỳ bán rã đặc trưng, giải phóng năng lượng liên kết hạt nhân cực lớn.",
    "relatedEquation": "Np + O₂ → NpO₂",
    "iupacName": "Neptunium",
    "archetype": "ACTINIDE_FISSION",
    "structuredEffects": [
      {
        "effectId": "B26_EFF_155",
        "activationWindow": "ON_DESTROY_MONSTER",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 350
            }
          }
        ],
        "description": "Bức xạ phân hạch thiêu đốt LP đối thủ."
      }
    ]
  },
  {
    "id": "card_b26_156_pu_156",
    "name": "Plutoni — Kẻ Thao Túng Tia Gamma (Biến Thể 16)",
    "name_en": "Plutonium — Kẻ Thao Túng Tia Gamma Mod-16",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "PYRO",
    "manaCost": 3,
    "level": 4,
    "atk": 2540,
    "def": 2160,
    "chemicalFormula": "PuO2",
    "atomicNumber": 94,
    "effectCode": "ELEM_B26_PU_ACT_156",
    "effectText": "Khi tiêu diệt quái thú đối phương: Bức xạ hạt nhân thiêu đốt 540 LP đối thủ và làm giảm 200 ATK của toàn bộ quái thú đối phương.",
    "scientificLore": "Plutoni (Z=94) thuộc họ Actini, hạt nhân phóng xạ không bền có chu kỳ bán rã đặc trưng, giải phóng năng lượng liên kết hạt nhân cực lớn.",
    "relatedEquation": "Pu + O₂ → PuO₂",
    "iupacName": "Plutonium",
    "archetype": "ACTINIDE_FISSION",
    "structuredEffects": [
      {
        "effectId": "B26_EFF_156",
        "activationWindow": "ON_DESTROY_MONSTER",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 350
            }
          }
        ],
        "description": "Bức xạ phân hạch thiêu đốt LP đối thủ."
      }
    ]
  },
  {
    "id": "card_b26_157_am_157",
    "name": "Americi — Kẻ Thao Túng Tia Gamma (Biến Thể 16)",
    "name_en": "Americium — Kẻ Thao Túng Tia Gamma Mod-16",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "PYRO",
    "manaCost": 4,
    "level": 5,
    "atk": 2795,
    "def": 2350,
    "chemicalFormula": "AmO2",
    "atomicNumber": 95,
    "effectCode": "ELEM_B26_AM_ACT_157",
    "effectText": "Khi tiêu diệt quái thú đối phương: Bức xạ hạt nhân thiêu đốt 300 LP đối thủ và làm giảm 200 ATK của toàn bộ quái thú đối phương.",
    "scientificLore": "Americi (Z=95) thuộc họ Actini, hạt nhân phóng xạ không bền có chu kỳ bán rã đặc trưng, giải phóng năng lượng liên kết hạt nhân cực lớn.",
    "relatedEquation": "Am + O₂ → AmO₂",
    "iupacName": "Americium",
    "archetype": "ACTINIDE_FISSION",
    "structuredEffects": [
      {
        "effectId": "B26_EFF_157",
        "activationWindow": "ON_DESTROY_MONSTER",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 350
            }
          }
        ],
        "description": "Bức xạ phân hạch thiêu đốt LP đối thủ."
      }
    ]
  },
  {
    "id": "card_b26_158_cm_158",
    "name": "Curi — Kẻ Thao Túng Tia Gamma (Biến Thể 16)",
    "name_en": "Curium — Kẻ Thao Túng Tia Gamma Mod-16",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "ACID_DARK",
    "manaCost": 5,
    "level": 6,
    "atk": 3050,
    "def": 2540,
    "chemicalFormula": "Cm2O3",
    "atomicNumber": 96,
    "effectCode": "ELEM_B26_CM_ACT_158",
    "effectText": "Khi tiêu diệt quái thú đối phương: Bức xạ hạt nhân thiêu đốt 380 LP đối thủ và làm giảm 200 ATK của toàn bộ quái thú đối phương.",
    "scientificLore": "Curi (Z=96) thuộc họ Actini, hạt nhân phóng xạ không bền có chu kỳ bán rã đặc trưng, giải phóng năng lượng liên kết hạt nhân cực lớn.",
    "relatedEquation": "2Cm + 3/2O₂ → Cm₂O₃",
    "iupacName": "Curium",
    "archetype": "ACTINIDE_FISSION",
    "structuredEffects": [
      {
        "effectId": "B26_EFF_158",
        "activationWindow": "ON_DESTROY_MONSTER",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 350
            }
          }
        ],
        "description": "Bức xạ phân hạch thiêu đốt LP đối thủ."
      }
    ]
  },
  {
    "id": "card_b26_159_bk_159",
    "name": "Berkeli — Kẻ Thao Túng Tia Gamma (Biến Thể 16)",
    "name_en": "Berkelium — Kẻ Thao Túng Tia Gamma Mod-16",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "ULTRA_RARE",
    "attribute": "ACID_DARK",
    "manaCost": 5,
    "level": 7,
    "atk": 3305,
    "def": 2730,
    "chemicalFormula": "BkO2",
    "atomicNumber": 97,
    "effectCode": "ELEM_B26_BK_ACT_159",
    "effectText": "Khi tiêu diệt quái thú đối phương: Bức xạ hạt nhân thiêu đốt 460 LP đối thủ và làm giảm 200 ATK của toàn bộ quái thú đối phương.",
    "scientificLore": "Berkeli (Z=97) thuộc họ Actini, hạt nhân phóng xạ không bền có chu kỳ bán rã đặc trưng, giải phóng năng lượng liên kết hạt nhân cực lớn.",
    "relatedEquation": "Bk + O₂ → BkO₂",
    "iupacName": "Berkelium",
    "archetype": "ACTINIDE_FISSION",
    "structuredEffects": [
      {
        "effectId": "B26_EFF_159",
        "activationWindow": "ON_DESTROY_MONSTER",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 350
            }
          }
        ],
        "description": "Bức xạ phân hạch thiêu đốt LP đối thủ."
      }
    ]
  },
  {
    "id": "card_b26_160_cf_160",
    "name": "Californi — Kẻ Thao Túng Tia Gamma (Biến Thể 16)",
    "name_en": "Californium — Kẻ Thao Túng Tia Gamma Mod-16",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SECRET_RARE",
    "attribute": "NOBLE_VOID",
    "manaCost": 6,
    "level": 8,
    "atk": 3560,
    "def": 2920,
    "chemicalFormula": "Cf2O3",
    "atomicNumber": 98,
    "effectCode": "ELEM_B26_CF_ACT_160",
    "effectText": "Khi tiêu diệt quái thú đối phương: Bức xạ hạt nhân thiêu đốt 540 LP đối thủ và làm giảm 200 ATK của toàn bộ quái thú đối phương.",
    "scientificLore": "Californi (Z=98) thuộc họ Actini, hạt nhân phóng xạ không bền có chu kỳ bán rã đặc trưng, giải phóng năng lượng liên kết hạt nhân cực lớn.",
    "relatedEquation": "2Cf + 3/2O₂ → Cf₂O₃",
    "iupacName": "Californium",
    "archetype": "ACTINIDE_FISSION",
    "structuredEffects": [
      {
        "effectId": "B26_EFF_160",
        "activationWindow": "ON_DESTROY_MONSTER",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 350
            }
          }
        ],
        "description": "Bức xạ phân hạch thiêu đốt LP đối thủ."
      }
    ]
  },
  {
    "id": "card_b26_161_ac_161",
    "name": "Actini — Chúa Tể Phân Hạch (Biến Thể 17)",
    "name_en": "Actinium — Chúa Tể Phân Hạch Mod-17",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "ACID_DARK",
    "manaCost": 3,
    "level": 4,
    "atk": 2540,
    "def": 2160,
    "chemicalFormula": "Ac2O3",
    "atomicNumber": 89,
    "effectCode": "ELEM_B26_AC_ACT_161",
    "effectText": "Khi tiêu diệt quái thú đối phương: Bức xạ hạt nhân thiêu đốt 300 LP đối thủ và làm giảm 200 ATK của toàn bộ quái thú đối phương.",
    "scientificLore": "Actini (Z=89) thuộc họ Actini, hạt nhân phóng xạ không bền có chu kỳ bán rã đặc trưng, giải phóng năng lượng liên kết hạt nhân cực lớn.",
    "relatedEquation": "2Ac + 3/2O₂ → Ac₂O₃",
    "iupacName": "Actinium",
    "archetype": "ACTINIDE_FISSION",
    "structuredEffects": [
      {
        "effectId": "B26_EFF_161",
        "activationWindow": "ON_DESTROY_MONSTER",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 350
            }
          }
        ],
        "description": "Bức xạ phân hạch thiêu đốt LP đối thủ."
      }
    ]
  },
  {
    "id": "card_b26_162_th_162",
    "name": "Thori — Chúa Tể Phân Hạch (Biến Thể 17)",
    "name_en": "Thorium — Chúa Tể Phân Hạch Mod-17",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "PYRO",
    "manaCost": 4,
    "level": 5,
    "atk": 2795,
    "def": 2350,
    "chemicalFormula": "ThO2",
    "atomicNumber": 90,
    "effectCode": "ELEM_B26_TH_ACT_162",
    "effectText": "Khi tiêu diệt quái thú đối phương: Bức xạ hạt nhân thiêu đốt 380 LP đối thủ và làm giảm 200 ATK của toàn bộ quái thú đối phương.",
    "scientificLore": "Thori (Z=90) thuộc họ Actini, hạt nhân phóng xạ không bền có chu kỳ bán rã đặc trưng, giải phóng năng lượng liên kết hạt nhân cực lớn.",
    "relatedEquation": "Th + O₂ → ThO₂",
    "iupacName": "Thorium",
    "archetype": "ACTINIDE_FISSION",
    "structuredEffects": [
      {
        "effectId": "B26_EFF_162",
        "activationWindow": "ON_DESTROY_MONSTER",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 350
            }
          }
        ],
        "description": "Bức xạ phân hạch thiêu đốt LP đối thủ."
      }
    ]
  },
  {
    "id": "card_b26_163_pa_163",
    "name": "Protactini — Chúa Tể Phân Hạch (Biến Thể 17)",
    "name_en": "Protactinium — Chúa Tể Phân Hạch Mod-17",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "ACID_DARK",
    "manaCost": 5,
    "level": 6,
    "atk": 3050,
    "def": 2540,
    "chemicalFormula": "Pa2O5",
    "atomicNumber": 91,
    "effectCode": "ELEM_B26_PA_ACT_163",
    "effectText": "Khi tiêu diệt quái thú đối phương: Bức xạ hạt nhân thiêu đốt 460 LP đối thủ và làm giảm 200 ATK của toàn bộ quái thú đối phương.",
    "scientificLore": "Protactini (Z=91) thuộc họ Actini, hạt nhân phóng xạ không bền có chu kỳ bán rã đặc trưng, giải phóng năng lượng liên kết hạt nhân cực lớn.",
    "relatedEquation": "2Pa + 5/2O₂ → Pa₂O₅",
    "iupacName": "Protactinium",
    "archetype": "ACTINIDE_FISSION",
    "structuredEffects": [
      {
        "effectId": "B26_EFF_163",
        "activationWindow": "ON_DESTROY_MONSTER",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 350
            }
          }
        ],
        "description": "Bức xạ phân hạch thiêu đốt LP đối thủ."
      }
    ]
  },
  {
    "id": "card_b26_164_u_164",
    "name": "Urani — Chúa Tể Phân Hạch (Biến Thể 17)",
    "name_en": "Uranium — Chúa Tể Phân Hạch Mod-17",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "ACID_DARK",
    "manaCost": 5,
    "level": 7,
    "atk": 3305,
    "def": 2730,
    "chemicalFormula": "UO2(NO3)2",
    "atomicNumber": 92,
    "effectCode": "ELEM_B26_U_ACT_164",
    "effectText": "Khi tiêu diệt quái thú đối phương: Bức xạ hạt nhân thiêu đốt 540 LP đối thủ và làm giảm 200 ATK của toàn bộ quái thú đối phương.",
    "scientificLore": "Urani (Z=92) thuộc họ Actini, hạt nhân phóng xạ không bền có chu kỳ bán rã đặc trưng, giải phóng năng lượng liên kết hạt nhân cực lớn.",
    "relatedEquation": "U + 4HNO₃ → UO₂(NO₃)₂ + 2NO₂ + 2H₂O",
    "iupacName": "Uranium",
    "archetype": "ACTINIDE_FISSION",
    "structuredEffects": [
      {
        "effectId": "B26_EFF_164",
        "activationWindow": "ON_DESTROY_MONSTER",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 350
            }
          }
        ],
        "description": "Bức xạ phân hạch thiêu đốt LP đối thủ."
      }
    ]
  },
  {
    "id": "card_b26_165_np_165",
    "name": "Neptuni — Chúa Tể Phân Hạch (Biến Thể 17)",
    "name_en": "Neptunium — Chúa Tể Phân Hạch Mod-17",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "ACID_DARK",
    "manaCost": 6,
    "level": 8,
    "atk": 3560,
    "def": 2920,
    "chemicalFormula": "NpO2",
    "atomicNumber": 93,
    "effectCode": "ELEM_B26_NP_ACT_165",
    "effectText": "Khi tiêu diệt quái thú đối phương: Bức xạ hạt nhân thiêu đốt 300 LP đối thủ và làm giảm 200 ATK của toàn bộ quái thú đối phương.",
    "scientificLore": "Neptuni (Z=93) thuộc họ Actini, hạt nhân phóng xạ không bền có chu kỳ bán rã đặc trưng, giải phóng năng lượng liên kết hạt nhân cực lớn.",
    "relatedEquation": "Np + O₂ → NpO₂",
    "iupacName": "Neptunium",
    "archetype": "ACTINIDE_FISSION",
    "structuredEffects": [
      {
        "effectId": "B26_EFF_165",
        "activationWindow": "ON_DESTROY_MONSTER",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 350
            }
          }
        ],
        "description": "Bức xạ phân hạch thiêu đốt LP đối thủ."
      }
    ]
  },
  {
    "id": "card_b26_166_pu_166",
    "name": "Plutoni — Chúa Tể Phân Hạch (Biến Thể 17)",
    "name_en": "Plutonium — Chúa Tể Phân Hạch Mod-17",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "PYRO",
    "manaCost": 3,
    "level": 4,
    "atk": 2540,
    "def": 2160,
    "chemicalFormula": "PuO2",
    "atomicNumber": 94,
    "effectCode": "ELEM_B26_PU_ACT_166",
    "effectText": "Khi tiêu diệt quái thú đối phương: Bức xạ hạt nhân thiêu đốt 380 LP đối thủ và làm giảm 200 ATK của toàn bộ quái thú đối phương.",
    "scientificLore": "Plutoni (Z=94) thuộc họ Actini, hạt nhân phóng xạ không bền có chu kỳ bán rã đặc trưng, giải phóng năng lượng liên kết hạt nhân cực lớn.",
    "relatedEquation": "Pu + O₂ → PuO₂",
    "iupacName": "Plutonium",
    "archetype": "ACTINIDE_FISSION",
    "structuredEffects": [
      {
        "effectId": "B26_EFF_166",
        "activationWindow": "ON_DESTROY_MONSTER",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 350
            }
          }
        ],
        "description": "Bức xạ phân hạch thiêu đốt LP đối thủ."
      }
    ]
  },
  {
    "id": "card_b26_167_am_167",
    "name": "Americi — Chúa Tể Phân Hạch (Biến Thể 17)",
    "name_en": "Americium — Chúa Tể Phân Hạch Mod-17",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "PYRO",
    "manaCost": 4,
    "level": 5,
    "atk": 2795,
    "def": 2350,
    "chemicalFormula": "AmO2",
    "atomicNumber": 95,
    "effectCode": "ELEM_B26_AM_ACT_167",
    "effectText": "Khi tiêu diệt quái thú đối phương: Bức xạ hạt nhân thiêu đốt 460 LP đối thủ và làm giảm 200 ATK của toàn bộ quái thú đối phương.",
    "scientificLore": "Americi (Z=95) thuộc họ Actini, hạt nhân phóng xạ không bền có chu kỳ bán rã đặc trưng, giải phóng năng lượng liên kết hạt nhân cực lớn.",
    "relatedEquation": "Am + O₂ → AmO₂",
    "iupacName": "Americium",
    "archetype": "ACTINIDE_FISSION",
    "structuredEffects": [
      {
        "effectId": "B26_EFF_167",
        "activationWindow": "ON_DESTROY_MONSTER",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 350
            }
          }
        ],
        "description": "Bức xạ phân hạch thiêu đốt LP đối thủ."
      }
    ]
  },
  {
    "id": "card_b26_168_cm_168",
    "name": "Curi — Chúa Tể Phân Hạch (Biến Thể 17)",
    "name_en": "Curium — Chúa Tể Phân Hạch Mod-17",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "ULTRA_RARE",
    "attribute": "ACID_DARK",
    "manaCost": 5,
    "level": 6,
    "atk": 3050,
    "def": 2540,
    "chemicalFormula": "Cm2O3",
    "atomicNumber": 96,
    "effectCode": "ELEM_B26_CM_ACT_168",
    "effectText": "Khi tiêu diệt quái thú đối phương: Bức xạ hạt nhân thiêu đốt 540 LP đối thủ và làm giảm 200 ATK của toàn bộ quái thú đối phương.",
    "scientificLore": "Curi (Z=96) thuộc họ Actini, hạt nhân phóng xạ không bền có chu kỳ bán rã đặc trưng, giải phóng năng lượng liên kết hạt nhân cực lớn.",
    "relatedEquation": "2Cm + 3/2O₂ → Cm₂O₃",
    "iupacName": "Curium",
    "archetype": "ACTINIDE_FISSION",
    "structuredEffects": [
      {
        "effectId": "B26_EFF_168",
        "activationWindow": "ON_DESTROY_MONSTER",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 350
            }
          }
        ],
        "description": "Bức xạ phân hạch thiêu đốt LP đối thủ."
      }
    ]
  },
  {
    "id": "card_b26_169_bk_169",
    "name": "Berkeli — Chúa Tể Phân Hạch (Biến Thể 17)",
    "name_en": "Berkelium — Chúa Tể Phân Hạch Mod-17",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SECRET_RARE",
    "attribute": "ACID_DARK",
    "manaCost": 5,
    "level": 7,
    "atk": 3305,
    "def": 2730,
    "chemicalFormula": "BkO2",
    "atomicNumber": 97,
    "effectCode": "ELEM_B26_BK_ACT_169",
    "effectText": "Khi tiêu diệt quái thú đối phương: Bức xạ hạt nhân thiêu đốt 300 LP đối thủ và làm giảm 200 ATK của toàn bộ quái thú đối phương.",
    "scientificLore": "Berkeli (Z=97) thuộc họ Actini, hạt nhân phóng xạ không bền có chu kỳ bán rã đặc trưng, giải phóng năng lượng liên kết hạt nhân cực lớn.",
    "relatedEquation": "Bk + O₂ → BkO₂",
    "iupacName": "Berkelium",
    "archetype": "ACTINIDE_FISSION",
    "structuredEffects": [
      {
        "effectId": "B26_EFF_169",
        "activationWindow": "ON_DESTROY_MONSTER",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 350
            }
          }
        ],
        "description": "Bức xạ phân hạch thiêu đốt LP đối thủ."
      }
    ]
  },
  {
    "id": "card_b26_170_cf_170",
    "name": "Californi — Chúa Tể Phân Hạch (Biến Thể 17)",
    "name_en": "Californium — Chúa Tể Phân Hạch Mod-17",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "NOBLE_VOID",
    "manaCost": 6,
    "level": 8,
    "atk": 3560,
    "def": 2920,
    "chemicalFormula": "Cf2O3",
    "atomicNumber": 98,
    "effectCode": "ELEM_B26_CF_ACT_170",
    "effectText": "Khi tiêu diệt quái thú đối phương: Bức xạ hạt nhân thiêu đốt 380 LP đối thủ và làm giảm 200 ATK của toàn bộ quái thú đối phương.",
    "scientificLore": "Californi (Z=98) thuộc họ Actini, hạt nhân phóng xạ không bền có chu kỳ bán rã đặc trưng, giải phóng năng lượng liên kết hạt nhân cực lớn.",
    "relatedEquation": "2Cf + 3/2O₂ → Cf₂O₃",
    "iupacName": "Californium",
    "archetype": "ACTINIDE_FISSION",
    "structuredEffects": [
      {
        "effectId": "B26_EFF_170",
        "activationWindow": "ON_DESTROY_MONSTER",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 350
            }
          }
        ],
        "description": "Bức xạ phân hạch thiêu đốt LP đối thủ."
      }
    ]
  },
  {
    "id": "card_b26_171_ac_171",
    "name": "Actini — Hiệp Sĩ Nơ-tron (Biến Thể 18)",
    "name_en": "Actinium — Hiệp Sĩ Nơ-tron Mod-18",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "ACID_DARK",
    "manaCost": 3,
    "level": 4,
    "atk": 2540,
    "def": 2160,
    "chemicalFormula": "Ac2O3",
    "atomicNumber": 89,
    "effectCode": "ELEM_B26_AC_ACT_171",
    "effectText": "Khi tiêu diệt quái thú đối phương: Bức xạ hạt nhân thiêu đốt 460 LP đối thủ và làm giảm 200 ATK của toàn bộ quái thú đối phương.",
    "scientificLore": "Actini (Z=89) thuộc họ Actini, hạt nhân phóng xạ không bền có chu kỳ bán rã đặc trưng, giải phóng năng lượng liên kết hạt nhân cực lớn.",
    "relatedEquation": "2Ac + 3/2O₂ → Ac₂O₃",
    "iupacName": "Actinium",
    "archetype": "ACTINIDE_FISSION",
    "structuredEffects": [
      {
        "effectId": "B26_EFF_171",
        "activationWindow": "ON_DESTROY_MONSTER",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 350
            }
          }
        ],
        "description": "Bức xạ phân hạch thiêu đốt LP đối thủ."
      }
    ]
  },
  {
    "id": "card_b26_172_th_172",
    "name": "Thori — Hiệp Sĩ Nơ-tron (Biến Thể 18)",
    "name_en": "Thorium — Hiệp Sĩ Nơ-tron Mod-18",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "PYRO",
    "manaCost": 4,
    "level": 5,
    "atk": 2795,
    "def": 2350,
    "chemicalFormula": "ThO2",
    "atomicNumber": 90,
    "effectCode": "ELEM_B26_TH_ACT_172",
    "effectText": "Khi tiêu diệt quái thú đối phương: Bức xạ hạt nhân thiêu đốt 540 LP đối thủ và làm giảm 200 ATK của toàn bộ quái thú đối phương.",
    "scientificLore": "Thori (Z=90) thuộc họ Actini, hạt nhân phóng xạ không bền có chu kỳ bán rã đặc trưng, giải phóng năng lượng liên kết hạt nhân cực lớn.",
    "relatedEquation": "Th + O₂ → ThO₂",
    "iupacName": "Thorium",
    "archetype": "ACTINIDE_FISSION",
    "structuredEffects": [
      {
        "effectId": "B26_EFF_172",
        "activationWindow": "ON_DESTROY_MONSTER",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 350
            }
          }
        ],
        "description": "Bức xạ phân hạch thiêu đốt LP đối thủ."
      }
    ]
  },
  {
    "id": "card_b26_173_pa_173",
    "name": "Protactini — Hiệp Sĩ Nơ-tron (Biến Thể 18)",
    "name_en": "Protactinium — Hiệp Sĩ Nơ-tron Mod-18",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "ACID_DARK",
    "manaCost": 5,
    "level": 6,
    "atk": 3050,
    "def": 2540,
    "chemicalFormula": "Pa2O5",
    "atomicNumber": 91,
    "effectCode": "ELEM_B26_PA_ACT_173",
    "effectText": "Khi tiêu diệt quái thú đối phương: Bức xạ hạt nhân thiêu đốt 300 LP đối thủ và làm giảm 200 ATK của toàn bộ quái thú đối phương.",
    "scientificLore": "Protactini (Z=91) thuộc họ Actini, hạt nhân phóng xạ không bền có chu kỳ bán rã đặc trưng, giải phóng năng lượng liên kết hạt nhân cực lớn.",
    "relatedEquation": "2Pa + 5/2O₂ → Pa₂O₅",
    "iupacName": "Protactinium",
    "archetype": "ACTINIDE_FISSION",
    "structuredEffects": [
      {
        "effectId": "B26_EFF_173",
        "activationWindow": "ON_DESTROY_MONSTER",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 350
            }
          }
        ],
        "description": "Bức xạ phân hạch thiêu đốt LP đối thủ."
      }
    ]
  },
  {
    "id": "card_b26_174_u_174",
    "name": "Urani — Hiệp Sĩ Nơ-tron (Biến Thể 18)",
    "name_en": "Uranium — Hiệp Sĩ Nơ-tron Mod-18",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "ACID_DARK",
    "manaCost": 5,
    "level": 7,
    "atk": 3305,
    "def": 2730,
    "chemicalFormula": "UO2(NO3)2",
    "atomicNumber": 92,
    "effectCode": "ELEM_B26_U_ACT_174",
    "effectText": "Khi tiêu diệt quái thú đối phương: Bức xạ hạt nhân thiêu đốt 380 LP đối thủ và làm giảm 200 ATK của toàn bộ quái thú đối phương.",
    "scientificLore": "Urani (Z=92) thuộc họ Actini, hạt nhân phóng xạ không bền có chu kỳ bán rã đặc trưng, giải phóng năng lượng liên kết hạt nhân cực lớn.",
    "relatedEquation": "U + 4HNO₃ → UO₂(NO₃)₂ + 2NO₂ + 2H₂O",
    "iupacName": "Uranium",
    "archetype": "ACTINIDE_FISSION",
    "structuredEffects": [
      {
        "effectId": "B26_EFF_174",
        "activationWindow": "ON_DESTROY_MONSTER",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 350
            }
          }
        ],
        "description": "Bức xạ phân hạch thiêu đốt LP đối thủ."
      }
    ]
  },
  {
    "id": "card_b26_175_np_175",
    "name": "Neptuni — Hiệp Sĩ Nơ-tron (Biến Thể 18)",
    "name_en": "Neptunium — Hiệp Sĩ Nơ-tron Mod-18",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "ACID_DARK",
    "manaCost": 6,
    "level": 8,
    "atk": 3560,
    "def": 2920,
    "chemicalFormula": "NpO2",
    "atomicNumber": 93,
    "effectCode": "ELEM_B26_NP_ACT_175",
    "effectText": "Khi tiêu diệt quái thú đối phương: Bức xạ hạt nhân thiêu đốt 460 LP đối thủ và làm giảm 200 ATK của toàn bộ quái thú đối phương.",
    "scientificLore": "Neptuni (Z=93) thuộc họ Actini, hạt nhân phóng xạ không bền có chu kỳ bán rã đặc trưng, giải phóng năng lượng liên kết hạt nhân cực lớn.",
    "relatedEquation": "Np + O₂ → NpO₂",
    "iupacName": "Neptunium",
    "archetype": "ACTINIDE_FISSION",
    "structuredEffects": [
      {
        "effectId": "B26_EFF_175",
        "activationWindow": "ON_DESTROY_MONSTER",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 350
            }
          }
        ],
        "description": "Bức xạ phân hạch thiêu đốt LP đối thủ."
      }
    ]
  },
  {
    "id": "card_b26_176_pu_176",
    "name": "Plutoni — Hiệp Sĩ Nơ-tron (Biến Thể 18)",
    "name_en": "Plutonium — Hiệp Sĩ Nơ-tron Mod-18",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "PYRO",
    "manaCost": 3,
    "level": 4,
    "atk": 2540,
    "def": 2160,
    "chemicalFormula": "PuO2",
    "atomicNumber": 94,
    "effectCode": "ELEM_B26_PU_ACT_176",
    "effectText": "Khi tiêu diệt quái thú đối phương: Bức xạ hạt nhân thiêu đốt 540 LP đối thủ và làm giảm 200 ATK của toàn bộ quái thú đối phương.",
    "scientificLore": "Plutoni (Z=94) thuộc họ Actini, hạt nhân phóng xạ không bền có chu kỳ bán rã đặc trưng, giải phóng năng lượng liên kết hạt nhân cực lớn.",
    "relatedEquation": "Pu + O₂ → PuO₂",
    "iupacName": "Plutonium",
    "archetype": "ACTINIDE_FISSION",
    "structuredEffects": [
      {
        "effectId": "B26_EFF_176",
        "activationWindow": "ON_DESTROY_MONSTER",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 350
            }
          }
        ],
        "description": "Bức xạ phân hạch thiêu đốt LP đối thủ."
      }
    ]
  },
  {
    "id": "card_b26_177_am_177",
    "name": "Americi — Hiệp Sĩ Nơ-tron (Biến Thể 18)",
    "name_en": "Americium — Hiệp Sĩ Nơ-tron Mod-18",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "ULTRA_RARE",
    "attribute": "PYRO",
    "manaCost": 4,
    "level": 5,
    "atk": 2795,
    "def": 2350,
    "chemicalFormula": "AmO2",
    "atomicNumber": 95,
    "effectCode": "ELEM_B26_AM_ACT_177",
    "effectText": "Khi tiêu diệt quái thú đối phương: Bức xạ hạt nhân thiêu đốt 300 LP đối thủ và làm giảm 200 ATK của toàn bộ quái thú đối phương.",
    "scientificLore": "Americi (Z=95) thuộc họ Actini, hạt nhân phóng xạ không bền có chu kỳ bán rã đặc trưng, giải phóng năng lượng liên kết hạt nhân cực lớn.",
    "relatedEquation": "Am + O₂ → AmO₂",
    "iupacName": "Americium",
    "archetype": "ACTINIDE_FISSION",
    "structuredEffects": [
      {
        "effectId": "B26_EFF_177",
        "activationWindow": "ON_DESTROY_MONSTER",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 350
            }
          }
        ],
        "description": "Bức xạ phân hạch thiêu đốt LP đối thủ."
      }
    ]
  },
  {
    "id": "card_b26_178_cm_178",
    "name": "Curi — Hiệp Sĩ Nơ-tron (Biến Thể 18)",
    "name_en": "Curium — Hiệp Sĩ Nơ-tron Mod-18",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SECRET_RARE",
    "attribute": "ACID_DARK",
    "manaCost": 5,
    "level": 6,
    "atk": 3050,
    "def": 2540,
    "chemicalFormula": "Cm2O3",
    "atomicNumber": 96,
    "effectCode": "ELEM_B26_CM_ACT_178",
    "effectText": "Khi tiêu diệt quái thú đối phương: Bức xạ hạt nhân thiêu đốt 380 LP đối thủ và làm giảm 200 ATK của toàn bộ quái thú đối phương.",
    "scientificLore": "Curi (Z=96) thuộc họ Actini, hạt nhân phóng xạ không bền có chu kỳ bán rã đặc trưng, giải phóng năng lượng liên kết hạt nhân cực lớn.",
    "relatedEquation": "2Cm + 3/2O₂ → Cm₂O₃",
    "iupacName": "Curium",
    "archetype": "ACTINIDE_FISSION",
    "structuredEffects": [
      {
        "effectId": "B26_EFF_178",
        "activationWindow": "ON_DESTROY_MONSTER",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 350
            }
          }
        ],
        "description": "Bức xạ phân hạch thiêu đốt LP đối thủ."
      }
    ]
  },
  {
    "id": "card_b26_179_bk_179",
    "name": "Berkeli — Hiệp Sĩ Nơ-tron (Biến Thể 18)",
    "name_en": "Berkelium — Hiệp Sĩ Nơ-tron Mod-18",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "ACID_DARK",
    "manaCost": 5,
    "level": 7,
    "atk": 3305,
    "def": 2730,
    "chemicalFormula": "BkO2",
    "atomicNumber": 97,
    "effectCode": "ELEM_B26_BK_ACT_179",
    "effectText": "Khi tiêu diệt quái thú đối phương: Bức xạ hạt nhân thiêu đốt 460 LP đối thủ và làm giảm 200 ATK của toàn bộ quái thú đối phương.",
    "scientificLore": "Berkeli (Z=97) thuộc họ Actini, hạt nhân phóng xạ không bền có chu kỳ bán rã đặc trưng, giải phóng năng lượng liên kết hạt nhân cực lớn.",
    "relatedEquation": "Bk + O₂ → BkO₂",
    "iupacName": "Berkelium",
    "archetype": "ACTINIDE_FISSION",
    "structuredEffects": [
      {
        "effectId": "B26_EFF_179",
        "activationWindow": "ON_DESTROY_MONSTER",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 350
            }
          }
        ],
        "description": "Bức xạ phân hạch thiêu đốt LP đối thủ."
      }
    ]
  },
  {
    "id": "card_b26_180_cf_180",
    "name": "Californi — Hiệp Sĩ Nơ-tron (Biến Thể 18)",
    "name_en": "Californium — Hiệp Sĩ Nơ-tron Mod-18",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "NOBLE_VOID",
    "manaCost": 6,
    "level": 8,
    "atk": 3560,
    "def": 2920,
    "chemicalFormula": "Cf2O3",
    "atomicNumber": 98,
    "effectCode": "ELEM_B26_CF_ACT_180",
    "effectText": "Khi tiêu diệt quái thú đối phương: Bức xạ hạt nhân thiêu đốt 540 LP đối thủ và làm giảm 200 ATK của toàn bộ quái thú đối phương.",
    "scientificLore": "Californi (Z=98) thuộc họ Actini, hạt nhân phóng xạ không bền có chu kỳ bán rã đặc trưng, giải phóng năng lượng liên kết hạt nhân cực lớn.",
    "relatedEquation": "2Cf + 3/2O₂ → Cf₂O₃",
    "iupacName": "Californium",
    "archetype": "ACTINIDE_FISSION",
    "structuredEffects": [
      {
        "effectId": "B26_EFF_180",
        "activationWindow": "ON_DESTROY_MONSTER",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 350
            }
          }
        ],
        "description": "Bức xạ phân hạch thiêu đốt LP đối thủ."
      }
    ]
  },
  {
    "id": "card_b26_181_ac_181",
    "name": "Actini — Đại Bác Bức Xạ Alpha (Biến Thể 19)",
    "name_en": "Actinium — Đại Bác Bức Xạ Alpha Mod-19",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "ACID_DARK",
    "manaCost": 3,
    "level": 4,
    "atk": 2540,
    "def": 2160,
    "chemicalFormula": "Ac2O3",
    "atomicNumber": 89,
    "effectCode": "ELEM_B26_AC_ACT_181",
    "effectText": "Khi tiêu diệt quái thú đối phương: Bức xạ hạt nhân thiêu đốt 300 LP đối thủ và làm giảm 200 ATK của toàn bộ quái thú đối phương.",
    "scientificLore": "Actini (Z=89) thuộc họ Actini, hạt nhân phóng xạ không bền có chu kỳ bán rã đặc trưng, giải phóng năng lượng liên kết hạt nhân cực lớn.",
    "relatedEquation": "2Ac + 3/2O₂ → Ac₂O₃",
    "iupacName": "Actinium",
    "archetype": "ACTINIDE_FISSION",
    "structuredEffects": [
      {
        "effectId": "B26_EFF_181",
        "activationWindow": "ON_DESTROY_MONSTER",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 350
            }
          }
        ],
        "description": "Bức xạ phân hạch thiêu đốt LP đối thủ."
      }
    ]
  },
  {
    "id": "card_b26_182_th_182",
    "name": "Thori — Đại Bác Bức Xạ Alpha (Biến Thể 19)",
    "name_en": "Thorium — Đại Bác Bức Xạ Alpha Mod-19",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "PYRO",
    "manaCost": 4,
    "level": 5,
    "atk": 2795,
    "def": 2350,
    "chemicalFormula": "ThO2",
    "atomicNumber": 90,
    "effectCode": "ELEM_B26_TH_ACT_182",
    "effectText": "Khi tiêu diệt quái thú đối phương: Bức xạ hạt nhân thiêu đốt 380 LP đối thủ và làm giảm 200 ATK của toàn bộ quái thú đối phương.",
    "scientificLore": "Thori (Z=90) thuộc họ Actini, hạt nhân phóng xạ không bền có chu kỳ bán rã đặc trưng, giải phóng năng lượng liên kết hạt nhân cực lớn.",
    "relatedEquation": "Th + O₂ → ThO₂",
    "iupacName": "Thorium",
    "archetype": "ACTINIDE_FISSION",
    "structuredEffects": [
      {
        "effectId": "B26_EFF_182",
        "activationWindow": "ON_DESTROY_MONSTER",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 350
            }
          }
        ],
        "description": "Bức xạ phân hạch thiêu đốt LP đối thủ."
      }
    ]
  },
  {
    "id": "card_b26_183_pa_183",
    "name": "Protactini — Đại Bác Bức Xạ Alpha (Biến Thể 19)",
    "name_en": "Protactinium — Đại Bác Bức Xạ Alpha Mod-19",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "ACID_DARK",
    "manaCost": 5,
    "level": 6,
    "atk": 3050,
    "def": 2540,
    "chemicalFormula": "Pa2O5",
    "atomicNumber": 91,
    "effectCode": "ELEM_B26_PA_ACT_183",
    "effectText": "Khi tiêu diệt quái thú đối phương: Bức xạ hạt nhân thiêu đốt 460 LP đối thủ và làm giảm 200 ATK của toàn bộ quái thú đối phương.",
    "scientificLore": "Protactini (Z=91) thuộc họ Actini, hạt nhân phóng xạ không bền có chu kỳ bán rã đặc trưng, giải phóng năng lượng liên kết hạt nhân cực lớn.",
    "relatedEquation": "2Pa + 5/2O₂ → Pa₂O₅",
    "iupacName": "Protactinium",
    "archetype": "ACTINIDE_FISSION",
    "structuredEffects": [
      {
        "effectId": "B26_EFF_183",
        "activationWindow": "ON_DESTROY_MONSTER",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 350
            }
          }
        ],
        "description": "Bức xạ phân hạch thiêu đốt LP đối thủ."
      }
    ]
  },
  {
    "id": "card_b26_184_u_184",
    "name": "Urani — Đại Bác Bức Xạ Alpha (Biến Thể 19)",
    "name_en": "Uranium — Đại Bác Bức Xạ Alpha Mod-19",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "ACID_DARK",
    "manaCost": 5,
    "level": 7,
    "atk": 3305,
    "def": 2730,
    "chemicalFormula": "UO2(NO3)2",
    "atomicNumber": 92,
    "effectCode": "ELEM_B26_U_ACT_184",
    "effectText": "Khi tiêu diệt quái thú đối phương: Bức xạ hạt nhân thiêu đốt 540 LP đối thủ và làm giảm 200 ATK của toàn bộ quái thú đối phương.",
    "scientificLore": "Urani (Z=92) thuộc họ Actini, hạt nhân phóng xạ không bền có chu kỳ bán rã đặc trưng, giải phóng năng lượng liên kết hạt nhân cực lớn.",
    "relatedEquation": "U + 4HNO₃ → UO₂(NO₃)₂ + 2NO₂ + 2H₂O",
    "iupacName": "Uranium",
    "archetype": "ACTINIDE_FISSION",
    "structuredEffects": [
      {
        "effectId": "B26_EFF_184",
        "activationWindow": "ON_DESTROY_MONSTER",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 350
            }
          }
        ],
        "description": "Bức xạ phân hạch thiêu đốt LP đối thủ."
      }
    ]
  },
  {
    "id": "card_b26_185_np_185",
    "name": "Neptuni — Đại Bác Bức Xạ Alpha (Biến Thể 19)",
    "name_en": "Neptunium — Đại Bác Bức Xạ Alpha Mod-19",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "ACID_DARK",
    "manaCost": 6,
    "level": 8,
    "atk": 3560,
    "def": 2920,
    "chemicalFormula": "NpO2",
    "atomicNumber": 93,
    "effectCode": "ELEM_B26_NP_ACT_185",
    "effectText": "Khi tiêu diệt quái thú đối phương: Bức xạ hạt nhân thiêu đốt 300 LP đối thủ và làm giảm 200 ATK của toàn bộ quái thú đối phương.",
    "scientificLore": "Neptuni (Z=93) thuộc họ Actini, hạt nhân phóng xạ không bền có chu kỳ bán rã đặc trưng, giải phóng năng lượng liên kết hạt nhân cực lớn.",
    "relatedEquation": "Np + O₂ → NpO₂",
    "iupacName": "Neptunium",
    "archetype": "ACTINIDE_FISSION",
    "structuredEffects": [
      {
        "effectId": "B26_EFF_185",
        "activationWindow": "ON_DESTROY_MONSTER",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 350
            }
          }
        ],
        "description": "Bức xạ phân hạch thiêu đốt LP đối thủ."
      }
    ]
  },
  {
    "id": "card_b26_186_pu_186",
    "name": "Plutoni — Đại Bác Bức Xạ Alpha (Biến Thể 19)",
    "name_en": "Plutonium — Đại Bác Bức Xạ Alpha Mod-19",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "ULTRA_RARE",
    "attribute": "PYRO",
    "manaCost": 3,
    "level": 4,
    "atk": 2540,
    "def": 2160,
    "chemicalFormula": "PuO2",
    "atomicNumber": 94,
    "effectCode": "ELEM_B26_PU_ACT_186",
    "effectText": "Khi tiêu diệt quái thú đối phương: Bức xạ hạt nhân thiêu đốt 380 LP đối thủ và làm giảm 200 ATK của toàn bộ quái thú đối phương.",
    "scientificLore": "Plutoni (Z=94) thuộc họ Actini, hạt nhân phóng xạ không bền có chu kỳ bán rã đặc trưng, giải phóng năng lượng liên kết hạt nhân cực lớn.",
    "relatedEquation": "Pu + O₂ → PuO₂",
    "iupacName": "Plutonium",
    "archetype": "ACTINIDE_FISSION",
    "structuredEffects": [
      {
        "effectId": "B26_EFF_186",
        "activationWindow": "ON_DESTROY_MONSTER",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 350
            }
          }
        ],
        "description": "Bức xạ phân hạch thiêu đốt LP đối thủ."
      }
    ]
  },
  {
    "id": "card_b26_187_am_187",
    "name": "Americi — Đại Bác Bức Xạ Alpha (Biến Thể 19)",
    "name_en": "Americium — Đại Bác Bức Xạ Alpha Mod-19",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SECRET_RARE",
    "attribute": "PYRO",
    "manaCost": 4,
    "level": 5,
    "atk": 2795,
    "def": 2350,
    "chemicalFormula": "AmO2",
    "atomicNumber": 95,
    "effectCode": "ELEM_B26_AM_ACT_187",
    "effectText": "Khi tiêu diệt quái thú đối phương: Bức xạ hạt nhân thiêu đốt 460 LP đối thủ và làm giảm 200 ATK của toàn bộ quái thú đối phương.",
    "scientificLore": "Americi (Z=95) thuộc họ Actini, hạt nhân phóng xạ không bền có chu kỳ bán rã đặc trưng, giải phóng năng lượng liên kết hạt nhân cực lớn.",
    "relatedEquation": "Am + O₂ → AmO₂",
    "iupacName": "Americium",
    "archetype": "ACTINIDE_FISSION",
    "structuredEffects": [
      {
        "effectId": "B26_EFF_187",
        "activationWindow": "ON_DESTROY_MONSTER",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 350
            }
          }
        ],
        "description": "Bức xạ phân hạch thiêu đốt LP đối thủ."
      }
    ]
  },
  {
    "id": "card_b26_188_cm_188",
    "name": "Curi — Đại Bác Bức Xạ Alpha (Biến Thể 19)",
    "name_en": "Curium — Đại Bác Bức Xạ Alpha Mod-19",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "ACID_DARK",
    "manaCost": 5,
    "level": 6,
    "atk": 3050,
    "def": 2540,
    "chemicalFormula": "Cm2O3",
    "atomicNumber": 96,
    "effectCode": "ELEM_B26_CM_ACT_188",
    "effectText": "Khi tiêu diệt quái thú đối phương: Bức xạ hạt nhân thiêu đốt 540 LP đối thủ và làm giảm 200 ATK của toàn bộ quái thú đối phương.",
    "scientificLore": "Curi (Z=96) thuộc họ Actini, hạt nhân phóng xạ không bền có chu kỳ bán rã đặc trưng, giải phóng năng lượng liên kết hạt nhân cực lớn.",
    "relatedEquation": "2Cm + 3/2O₂ → Cm₂O₃",
    "iupacName": "Curium",
    "archetype": "ACTINIDE_FISSION",
    "structuredEffects": [
      {
        "effectId": "B26_EFF_188",
        "activationWindow": "ON_DESTROY_MONSTER",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 350
            }
          }
        ],
        "description": "Bức xạ phân hạch thiêu đốt LP đối thủ."
      }
    ]
  },
  {
    "id": "card_b26_189_bk_189",
    "name": "Berkeli — Đại Bác Bức Xạ Alpha (Biến Thể 19)",
    "name_en": "Berkelium — Đại Bác Bức Xạ Alpha Mod-19",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "ACID_DARK",
    "manaCost": 5,
    "level": 7,
    "atk": 3305,
    "def": 2730,
    "chemicalFormula": "BkO2",
    "atomicNumber": 97,
    "effectCode": "ELEM_B26_BK_ACT_189",
    "effectText": "Khi tiêu diệt quái thú đối phương: Bức xạ hạt nhân thiêu đốt 300 LP đối thủ và làm giảm 200 ATK của toàn bộ quái thú đối phương.",
    "scientificLore": "Berkeli (Z=97) thuộc họ Actini, hạt nhân phóng xạ không bền có chu kỳ bán rã đặc trưng, giải phóng năng lượng liên kết hạt nhân cực lớn.",
    "relatedEquation": "Bk + O₂ → BkO₂",
    "iupacName": "Berkelium",
    "archetype": "ACTINIDE_FISSION",
    "structuredEffects": [
      {
        "effectId": "B26_EFF_189",
        "activationWindow": "ON_DESTROY_MONSTER",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 350
            }
          }
        ],
        "description": "Bức xạ phân hạch thiêu đốt LP đối thủ."
      }
    ]
  },
  {
    "id": "card_b26_190_cf_190",
    "name": "Californi — Đại Bác Bức Xạ Alpha (Biến Thể 19)",
    "name_en": "Californium — Đại Bác Bức Xạ Alpha Mod-19",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "NOBLE_VOID",
    "manaCost": 6,
    "level": 8,
    "atk": 3560,
    "def": 2920,
    "chemicalFormula": "Cf2O3",
    "atomicNumber": 98,
    "effectCode": "ELEM_B26_CF_ACT_190",
    "effectText": "Khi tiêu diệt quái thú đối phương: Bức xạ hạt nhân thiêu đốt 380 LP đối thủ và làm giảm 200 ATK của toàn bộ quái thú đối phương.",
    "scientificLore": "Californi (Z=98) thuộc họ Actini, hạt nhân phóng xạ không bền có chu kỳ bán rã đặc trưng, giải phóng năng lượng liên kết hạt nhân cực lớn.",
    "relatedEquation": "2Cf + 3/2O₂ → Cf₂O₃",
    "iupacName": "Californium",
    "archetype": "ACTINIDE_FISSION",
    "structuredEffects": [
      {
        "effectId": "B26_EFF_190",
        "activationWindow": "ON_DESTROY_MONSTER",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 350
            }
          }
        ],
        "description": "Bức xạ phân hạch thiêu đốt LP đối thủ."
      }
    ]
  },
  {
    "id": "card_b26_191_ac_191",
    "name": "Actini — Hộ Vệ Lò Phản Ứng (Biến Thể 20)",
    "name_en": "Actinium — Hộ Vệ Lò Phản Ứng Mod-20",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "ACID_DARK",
    "manaCost": 3,
    "level": 4,
    "atk": 2540,
    "def": 2160,
    "chemicalFormula": "Ac2O3",
    "atomicNumber": 89,
    "effectCode": "ELEM_B26_AC_ACT_191",
    "effectText": "Khi tiêu diệt quái thú đối phương: Bức xạ hạt nhân thiêu đốt 460 LP đối thủ và làm giảm 200 ATK của toàn bộ quái thú đối phương.",
    "scientificLore": "Actini (Z=89) thuộc họ Actini, hạt nhân phóng xạ không bền có chu kỳ bán rã đặc trưng, giải phóng năng lượng liên kết hạt nhân cực lớn.",
    "relatedEquation": "2Ac + 3/2O₂ → Ac₂O₃",
    "iupacName": "Actinium",
    "archetype": "ACTINIDE_FISSION",
    "structuredEffects": [
      {
        "effectId": "B26_EFF_191",
        "activationWindow": "ON_DESTROY_MONSTER",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 350
            }
          }
        ],
        "description": "Bức xạ phân hạch thiêu đốt LP đối thủ."
      }
    ]
  },
  {
    "id": "card_b26_192_th_192",
    "name": "Thori — Hộ Vệ Lò Phản Ứng (Biến Thể 20)",
    "name_en": "Thorium — Hộ Vệ Lò Phản Ứng Mod-20",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "PYRO",
    "manaCost": 4,
    "level": 5,
    "atk": 2795,
    "def": 2350,
    "chemicalFormula": "ThO2",
    "atomicNumber": 90,
    "effectCode": "ELEM_B26_TH_ACT_192",
    "effectText": "Khi tiêu diệt quái thú đối phương: Bức xạ hạt nhân thiêu đốt 540 LP đối thủ và làm giảm 200 ATK của toàn bộ quái thú đối phương.",
    "scientificLore": "Thori (Z=90) thuộc họ Actini, hạt nhân phóng xạ không bền có chu kỳ bán rã đặc trưng, giải phóng năng lượng liên kết hạt nhân cực lớn.",
    "relatedEquation": "Th + O₂ → ThO₂",
    "iupacName": "Thorium",
    "archetype": "ACTINIDE_FISSION",
    "structuredEffects": [
      {
        "effectId": "B26_EFF_192",
        "activationWindow": "ON_DESTROY_MONSTER",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 350
            }
          }
        ],
        "description": "Bức xạ phân hạch thiêu đốt LP đối thủ."
      }
    ]
  },
  {
    "id": "card_b26_193_pa_193",
    "name": "Protactini — Hộ Vệ Lò Phản Ứng (Biến Thể 20)",
    "name_en": "Protactinium — Hộ Vệ Lò Phản Ứng Mod-20",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "ACID_DARK",
    "manaCost": 5,
    "level": 6,
    "atk": 3050,
    "def": 2540,
    "chemicalFormula": "Pa2O5",
    "atomicNumber": 91,
    "effectCode": "ELEM_B26_PA_ACT_193",
    "effectText": "Khi tiêu diệt quái thú đối phương: Bức xạ hạt nhân thiêu đốt 300 LP đối thủ và làm giảm 200 ATK của toàn bộ quái thú đối phương.",
    "scientificLore": "Protactini (Z=91) thuộc họ Actini, hạt nhân phóng xạ không bền có chu kỳ bán rã đặc trưng, giải phóng năng lượng liên kết hạt nhân cực lớn.",
    "relatedEquation": "2Pa + 5/2O₂ → Pa₂O₅",
    "iupacName": "Protactinium",
    "archetype": "ACTINIDE_FISSION",
    "structuredEffects": [
      {
        "effectId": "B26_EFF_193",
        "activationWindow": "ON_DESTROY_MONSTER",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 350
            }
          }
        ],
        "description": "Bức xạ phân hạch thiêu đốt LP đối thủ."
      }
    ]
  },
  {
    "id": "card_b26_194_u_194",
    "name": "Urani — Hộ Vệ Lò Phản Ứng (Biến Thể 20)",
    "name_en": "Uranium — Hộ Vệ Lò Phản Ứng Mod-20",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "ACID_DARK",
    "manaCost": 5,
    "level": 7,
    "atk": 3305,
    "def": 2730,
    "chemicalFormula": "UO2(NO3)2",
    "atomicNumber": 92,
    "effectCode": "ELEM_B26_U_ACT_194",
    "effectText": "Khi tiêu diệt quái thú đối phương: Bức xạ hạt nhân thiêu đốt 380 LP đối thủ và làm giảm 200 ATK của toàn bộ quái thú đối phương.",
    "scientificLore": "Urani (Z=92) thuộc họ Actini, hạt nhân phóng xạ không bền có chu kỳ bán rã đặc trưng, giải phóng năng lượng liên kết hạt nhân cực lớn.",
    "relatedEquation": "U + 4HNO₃ → UO₂(NO₃)₂ + 2NO₂ + 2H₂O",
    "iupacName": "Uranium",
    "archetype": "ACTINIDE_FISSION",
    "structuredEffects": [
      {
        "effectId": "B26_EFF_194",
        "activationWindow": "ON_DESTROY_MONSTER",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 350
            }
          }
        ],
        "description": "Bức xạ phân hạch thiêu đốt LP đối thủ."
      }
    ]
  },
  {
    "id": "card_b26_195_np_195",
    "name": "Neptuni — Hộ Vệ Lò Phản Ứng (Biến Thể 20)",
    "name_en": "Neptunium — Hộ Vệ Lò Phản Ứng Mod-20",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "ULTRA_RARE",
    "attribute": "ACID_DARK",
    "manaCost": 6,
    "level": 8,
    "atk": 3560,
    "def": 2920,
    "chemicalFormula": "NpO2",
    "atomicNumber": 93,
    "effectCode": "ELEM_B26_NP_ACT_195",
    "effectText": "Khi tiêu diệt quái thú đối phương: Bức xạ hạt nhân thiêu đốt 460 LP đối thủ và làm giảm 200 ATK của toàn bộ quái thú đối phương.",
    "scientificLore": "Neptuni (Z=93) thuộc họ Actini, hạt nhân phóng xạ không bền có chu kỳ bán rã đặc trưng, giải phóng năng lượng liên kết hạt nhân cực lớn.",
    "relatedEquation": "Np + O₂ → NpO₂",
    "iupacName": "Neptunium",
    "archetype": "ACTINIDE_FISSION",
    "structuredEffects": [
      {
        "effectId": "B26_EFF_195",
        "activationWindow": "ON_DESTROY_MONSTER",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 350
            }
          }
        ],
        "description": "Bức xạ phân hạch thiêu đốt LP đối thủ."
      }
    ]
  },
  {
    "id": "card_b26_196_pu_196",
    "name": "Plutoni — Hộ Vệ Lò Phản Ứng (Biến Thể 20)",
    "name_en": "Plutonium — Hộ Vệ Lò Phản Ứng Mod-20",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SECRET_RARE",
    "attribute": "PYRO",
    "manaCost": 3,
    "level": 4,
    "atk": 2540,
    "def": 2160,
    "chemicalFormula": "PuO2",
    "atomicNumber": 94,
    "effectCode": "ELEM_B26_PU_ACT_196",
    "effectText": "Khi tiêu diệt quái thú đối phương: Bức xạ hạt nhân thiêu đốt 540 LP đối thủ và làm giảm 200 ATK của toàn bộ quái thú đối phương.",
    "scientificLore": "Plutoni (Z=94) thuộc họ Actini, hạt nhân phóng xạ không bền có chu kỳ bán rã đặc trưng, giải phóng năng lượng liên kết hạt nhân cực lớn.",
    "relatedEquation": "Pu + O₂ → PuO₂",
    "iupacName": "Plutonium",
    "archetype": "ACTINIDE_FISSION",
    "structuredEffects": [
      {
        "effectId": "B26_EFF_196",
        "activationWindow": "ON_DESTROY_MONSTER",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 350
            }
          }
        ],
        "description": "Bức xạ phân hạch thiêu đốt LP đối thủ."
      }
    ]
  },
  {
    "id": "card_b26_197_am_197",
    "name": "Americi — Hộ Vệ Lò Phản Ứng (Biến Thể 20)",
    "name_en": "Americium — Hộ Vệ Lò Phản Ứng Mod-20",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "PYRO",
    "manaCost": 4,
    "level": 5,
    "atk": 2795,
    "def": 2350,
    "chemicalFormula": "AmO2",
    "atomicNumber": 95,
    "effectCode": "ELEM_B26_AM_ACT_197",
    "effectText": "Khi tiêu diệt quái thú đối phương: Bức xạ hạt nhân thiêu đốt 300 LP đối thủ và làm giảm 200 ATK của toàn bộ quái thú đối phương.",
    "scientificLore": "Americi (Z=95) thuộc họ Actini, hạt nhân phóng xạ không bền có chu kỳ bán rã đặc trưng, giải phóng năng lượng liên kết hạt nhân cực lớn.",
    "relatedEquation": "Am + O₂ → AmO₂",
    "iupacName": "Americium",
    "archetype": "ACTINIDE_FISSION",
    "structuredEffects": [
      {
        "effectId": "B26_EFF_197",
        "activationWindow": "ON_DESTROY_MONSTER",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 350
            }
          }
        ],
        "description": "Bức xạ phân hạch thiêu đốt LP đối thủ."
      }
    ]
  },
  {
    "id": "card_b26_198_cm_198",
    "name": "Curi — Hộ Vệ Lò Phản Ứng (Biến Thể 20)",
    "name_en": "Curium — Hộ Vệ Lò Phản Ứng Mod-20",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "ACID_DARK",
    "manaCost": 5,
    "level": 6,
    "atk": 3050,
    "def": 2540,
    "chemicalFormula": "Cm2O3",
    "atomicNumber": 96,
    "effectCode": "ELEM_B26_CM_ACT_198",
    "effectText": "Khi tiêu diệt quái thú đối phương: Bức xạ hạt nhân thiêu đốt 380 LP đối thủ và làm giảm 200 ATK của toàn bộ quái thú đối phương.",
    "scientificLore": "Curi (Z=96) thuộc họ Actini, hạt nhân phóng xạ không bền có chu kỳ bán rã đặc trưng, giải phóng năng lượng liên kết hạt nhân cực lớn.",
    "relatedEquation": "2Cm + 3/2O₂ → Cm₂O₃",
    "iupacName": "Curium",
    "archetype": "ACTINIDE_FISSION",
    "structuredEffects": [
      {
        "effectId": "B26_EFF_198",
        "activationWindow": "ON_DESTROY_MONSTER",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 350
            }
          }
        ],
        "description": "Bức xạ phân hạch thiêu đốt LP đối thủ."
      }
    ]
  },
  {
    "id": "card_b26_199_bk_199",
    "name": "Berkeli — Hộ Vệ Lò Phản Ứng (Biến Thể 20)",
    "name_en": "Berkelium — Hộ Vệ Lò Phản Ứng Mod-20",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "ACID_DARK",
    "manaCost": 5,
    "level": 7,
    "atk": 3305,
    "def": 2730,
    "chemicalFormula": "BkO2",
    "atomicNumber": 97,
    "effectCode": "ELEM_B26_BK_ACT_199",
    "effectText": "Khi tiêu diệt quái thú đối phương: Bức xạ hạt nhân thiêu đốt 460 LP đối thủ và làm giảm 200 ATK của toàn bộ quái thú đối phương.",
    "scientificLore": "Berkeli (Z=97) thuộc họ Actini, hạt nhân phóng xạ không bền có chu kỳ bán rã đặc trưng, giải phóng năng lượng liên kết hạt nhân cực lớn.",
    "relatedEquation": "Bk + O₂ → BkO₂",
    "iupacName": "Berkelium",
    "archetype": "ACTINIDE_FISSION",
    "structuredEffects": [
      {
        "effectId": "B26_EFF_199",
        "activationWindow": "ON_DESTROY_MONSTER",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 350
            }
          }
        ],
        "description": "Bức xạ phân hạch thiêu đốt LP đối thủ."
      }
    ]
  },
  {
    "id": "card_b26_200_cf_200",
    "name": "Californi — Hộ Vệ Lò Phản Ứng (Biến Thể 20)",
    "name_en": "Californium — Hộ Vệ Lò Phản Ứng Mod-20",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "NOBLE_VOID",
    "manaCost": 6,
    "level": 8,
    "atk": 3560,
    "def": 2920,
    "chemicalFormula": "Cf2O3",
    "atomicNumber": 98,
    "effectCode": "ELEM_B26_CF_ACT_200",
    "effectText": "Khi tiêu diệt quái thú đối phương: Bức xạ hạt nhân thiêu đốt 540 LP đối thủ và làm giảm 200 ATK của toàn bộ quái thú đối phương.",
    "scientificLore": "Californi (Z=98) thuộc họ Actini, hạt nhân phóng xạ không bền có chu kỳ bán rã đặc trưng, giải phóng năng lượng liên kết hạt nhân cực lớn.",
    "relatedEquation": "2Cf + 3/2O₂ → Cf₂O₃",
    "iupacName": "Californium",
    "archetype": "ACTINIDE_FISSION",
    "structuredEffects": [
      {
        "effectId": "B26_EFF_200",
        "activationWindow": "ON_DESTROY_MONSTER",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 350
            }
          }
        ],
        "description": "Bức xạ phân hạch thiêu đốt LP đối thủ."
      }
    ]
  }
];
