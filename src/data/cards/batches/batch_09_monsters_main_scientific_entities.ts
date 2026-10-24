// src/data/cards/batches/batch_09_monsters_main_scientific_entities.ts
// Batch 09: Scientific Pioneer Entities (100 cards)
// Automatically generated and validated for ELEMENTA Tactical TCG

import { PlayableCardDef } from '../../../domain/cardGameTypes';

export const BATCH_09_CARDS: PlayableCardDef[] = [
  {
    "id": "card_b09_001_lavoisier_1",
    "name": "Lavoisier — Định Luật Bảo Toàn Khối Lượng (Thực Thể 1)",
    "name_en": "Lavoisier Spirit — Principle Form 1",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "TERRA",
    "manaCost": 3,
    "level": 4,
    "atk": 2240,
    "def": 2180,
    "chemicalFormula": "∑m_react = ∑m_prod",
    "effectCode": "ELEM_B09_LAVOISIER_LAW_1",
    "effectText": "Định luật khoa học Định Luật Bảo Toàn Khối Lượng: Khi được triệu hồi, rút 1 lá bài từ Bộ bài và gây 200 LP sát thương chuẩn lên đối thủ.",
    "scientificLore": "Tôn vinh nhà khoa học vĩ đại Lavoisier với công trình \"Định Luật Bảo Toàn Khối Lượng\" là nền tảng cốt lõi của hóa học thực nghiệm và định lượng GDPT 2018.",
    "relatedEquation": "∑m_react = ∑m_prod",
    "iupacName": "Lavoisier Spirit Principle",
    "archetype": "THERMAL_KINETICS",
    "structuredEffects": [
      {
        "effectId": "B09_EFF_1",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Kích hoạt định luật Định Luật Bảo Toàn Khối Lượng: Rút 1 lá bài và gây 300 LP sát thương."
      }
    ]
  },
  {
    "id": "card_b09_002_mendeleev_2",
    "name": "Mendeleev — Bảng Tuần Hoàn Nguyên Tố (Thực Thể 1)",
    "name_en": "Mendeleev Avatar — Principle Form 1",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "NOBLE_VOID",
    "manaCost": 4,
    "level": 5,
    "atk": 2510,
    "def": 2450,
    "chemicalFormula": "f(Z) Periodic Law",
    "effectCode": "ELEM_B09_MENDELEEV_LAW_2",
    "effectText": "Định luật khoa học Bảng Tuần Hoàn Nguyên Tố: Khi được triệu hồi, rút 1 lá bài từ Bộ bài và gây 300 LP sát thương chuẩn lên đối thủ.",
    "scientificLore": "Tôn vinh nhà khoa học vĩ đại Mendeleev với công trình \"Bảng Tuần Hoàn Nguyên Tố\" là nền tảng cốt lõi của hóa học thực nghiệm và định lượng GDPT 2018.",
    "relatedEquation": "f(Z) Periodic Law",
    "iupacName": "Mendeleev Avatar Principle",
    "archetype": "RADIOACTIVE_ISOTOPE",
    "structuredEffects": [
      {
        "effectId": "B09_EFF_2",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Kích hoạt định luật Bảng Tuần Hoàn Nguyên Tố: Rút 1 lá bài và gây 300 LP sát thương."
      }
    ]
  },
  {
    "id": "card_b09_003_marie_curie_3",
    "name": "Marie Curie — Phóng Xạ Alpha/Beta/Gamma (Thực Thể 1)",
    "name_en": "Curie Radiant — Principle Form 1",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "ULTRA_RARE",
    "attribute": "ELECTRO",
    "manaCost": 5,
    "level": 6,
    "atk": 2780,
    "def": 2720,
    "chemicalFormula": "²²⁶Ra → ²²²Rn + ⁴He",
    "effectCode": "ELEM_B09_MARIE_CURIE_LAW_3",
    "effectText": "Định luật khoa học Phóng Xạ Alpha/Beta/Gamma: Khi được triệu hồi, rút 1 lá bài từ Bộ bài và gây 400 LP sát thương chuẩn lên đối thủ.",
    "scientificLore": "Tôn vinh nhà khoa học vĩ đại Marie Curie với công trình \"Phóng Xạ Alpha/Beta/Gamma\" là nền tảng cốt lõi của hóa học thực nghiệm và định lượng GDPT 2018.",
    "relatedEquation": "²²⁶Ra → ²²²Rn + ⁴He",
    "iupacName": "Curie Radiant Principle",
    "archetype": "RADIOACTIVE_ISOTOPE",
    "structuredEffects": [
      {
        "effectId": "B09_EFF_3",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Kích hoạt định luật Phóng Xạ Alpha/Beta/Gamma: Rút 1 lá bài và gây 300 LP sát thương."
      }
    ]
  },
  {
    "id": "card_b09_004_arrhenius_4",
    "name": "Arrhenius — Năng Lượng Hoạt Hóa Phản Ứng (Thực Thể 1)",
    "name_en": "Arrhenius Specter — Principle Form 1",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SECRET_RARE",
    "attribute": "PYRO",
    "manaCost": 6,
    "level": 7,
    "atk": 3050,
    "def": 2990,
    "chemicalFormula": "k = A·e^(-Ea/RT)",
    "effectCode": "ELEM_B09_ARRHENIUS_LAW_4",
    "effectText": "Định luật khoa học Năng Lượng Hoạt Hóa Phản Ứng: Khi được triệu hồi, rút 1 lá bài từ Bộ bài và gây 200 LP sát thương chuẩn lên đối thủ.",
    "scientificLore": "Tôn vinh nhà khoa học vĩ đại Arrhenius với công trình \"Năng Lượng Hoạt Hóa Phản Ứng\" là nền tảng cốt lõi của hóa học thực nghiệm và định lượng GDPT 2018.",
    "relatedEquation": "k = A·e^(-Ea/RT)",
    "iupacName": "Arrhenius Specter Principle",
    "archetype": "THERMAL_KINETICS",
    "structuredEffects": [
      {
        "effectId": "B09_EFF_4",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Kích hoạt định luật Năng Lượng Hoạt Hóa Phản Ứng: Rút 1 lá bài và gây 300 LP sát thương."
      }
    ]
  },
  {
    "id": "card_b09_005_le_chatelier_5",
    "name": "Le Chatelier — Chuyển Dịch Cân Bằng Hóa Học (Thực Thể 1)",
    "name_en": "Le Chatelier Phantom — Principle Form 1",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "AQUA",
    "manaCost": 7,
    "level": 8,
    "atk": 3080,
    "def": 3260,
    "chemicalFormula": "K_c Equilibrium Shift",
    "effectCode": "ELEM_B09_LE_CHATELIER_LAW_5",
    "effectText": "Định luật khoa học Chuyển Dịch Cân Bằng Hóa Học: Khi được triệu hồi, rút 1 lá bài từ Bộ bài và gây 300 LP sát thương chuẩn lên đối thủ.",
    "scientificLore": "Tôn vinh nhà khoa học vĩ đại Le Chatelier với công trình \"Chuyển Dịch Cân Bằng Hóa Học\" là nền tảng cốt lõi của hóa học thực nghiệm và định lượng GDPT 2018.",
    "relatedEquation": "K_c Equilibrium Shift",
    "iupacName": "Le Chatelier Phantom Principle",
    "archetype": "THERMAL_KINETICS",
    "structuredEffects": [
      {
        "effectId": "B09_EFF_5",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Kích hoạt định luật Chuyển Dịch Cân Bằng Hóa Học: Rút 1 lá bài và gây 300 LP sát thương."
      }
    ]
  },
  {
    "id": "card_b09_006_gilbert_lewis_6",
    "name": "Gilbert Lewis — Cặp Electron Liên Kết Hóa Trị (Thực Thể 1)",
    "name_en": "Lewis Core — Principle Form 1",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "AERO",
    "manaCost": 3,
    "level": 4,
    "atk": 2300,
    "def": 2180,
    "chemicalFormula": "Octet Shared Pair",
    "effectCode": "ELEM_B09_GILBERT_LEWIS_LAW_6",
    "effectText": "Định luật khoa học Cặp Electron Liên Kết Hóa Trị: Khi được triệu hồi, rút 1 lá bài từ Bộ bài và gây 400 LP sát thương chuẩn lên đối thủ.",
    "scientificLore": "Tôn vinh nhà khoa học vĩ đại Gilbert Lewis với công trình \"Cặp Electron Liên Kết Hóa Trị\" là nền tảng cốt lõi của hóa học thực nghiệm và định lượng GDPT 2018.",
    "relatedEquation": "Octet Shared Pair",
    "iupacName": "Lewis Core Principle",
    "archetype": "RADIOACTIVE_ISOTOPE",
    "structuredEffects": [
      {
        "effectId": "B09_EFF_6",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Kích hoạt định luật Cặp Electron Liên Kết Hóa Trị: Rút 1 lá bài và gây 300 LP sát thương."
      }
    ]
  },
  {
    "id": "card_b09_007_willard_gibbs_7",
    "name": "Willard Gibbs — Năng Lượng Tự Do Nhiệt Động (Thực Thể 1)",
    "name_en": "Gibbs Energy Titan — Principle Form 1",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "PYRO",
    "manaCost": 4,
    "level": 5,
    "atk": 2570,
    "def": 2450,
    "chemicalFormula": "ΔG = ΔH - TΔS",
    "effectCode": "ELEM_B09_WILLARD_GIBBS_LAW_7",
    "effectText": "Định luật khoa học Năng Lượng Tự Do Nhiệt Động: Khi được triệu hồi, rút 1 lá bài từ Bộ bài và gây 200 LP sát thương chuẩn lên đối thủ.",
    "scientificLore": "Tôn vinh nhà khoa học vĩ đại Willard Gibbs với công trình \"Năng Lượng Tự Do Nhiệt Động\" là nền tảng cốt lõi của hóa học thực nghiệm và định lượng GDPT 2018.",
    "relatedEquation": "ΔG = ΔH - TΔS",
    "iupacName": "Gibbs Energy Titan Principle",
    "archetype": "RADIOACTIVE_ISOTOPE",
    "structuredEffects": [
      {
        "effectId": "B09_EFF_7",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Kích hoạt định luật Năng Lượng Tự Do Nhiệt Động: Rút 1 lá bài và gây 300 LP sát thương."
      }
    ]
  },
  {
    "id": "card_b09_008_alfred_werner_8",
    "name": "Alfred Werner — Thuyết Phức Chất Phối Trí (Thực Thể 1)",
    "name_en": "Werner Coordination Architect — Principle Form 1",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "ELECTRO",
    "manaCost": 5,
    "level": 6,
    "atk": 2840,
    "def": 2720,
    "chemicalFormula": "[Co(NH3)6]Cl3",
    "effectCode": "ELEM_B09_ALFRED_WERNER_LAW_8",
    "effectText": "Định luật khoa học Thuyết Phức Chất Phối Trí: Khi được triệu hồi, rút 1 lá bài từ Bộ bài và gây 300 LP sát thương chuẩn lên đối thủ.",
    "scientificLore": "Tôn vinh nhà khoa học vĩ đại Alfred Werner với công trình \"Thuyết Phức Chất Phối Trí\" là nền tảng cốt lõi của hóa học thực nghiệm và định lượng GDPT 2018.",
    "relatedEquation": "[Co(NH3)6]Cl3",
    "iupacName": "Werner Coordination Architect Principle",
    "archetype": "RADIOACTIVE_ISOTOPE",
    "structuredEffects": [
      {
        "effectId": "B09_EFF_8",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Kích hoạt định luật Thuyết Phức Chất Phối Trí: Rút 1 lá bài và gây 300 LP sát thương."
      }
    ]
  },
  {
    "id": "card_b09_009_walther_nernst_9",
    "name": "Walther Nernst — Điện Thế Điện Cực Điện Hóa (Thực Thể 1)",
    "name_en": "Nernst Potential Warden — Principle Form 1",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "ELECTRO",
    "manaCost": 6,
    "level": 7,
    "atk": 2870,
    "def": 2990,
    "chemicalFormula": "E = E° - (RT/nF)lnQ",
    "effectCode": "ELEM_B09_WALTHER_NERNST_LAW_9",
    "effectText": "Định luật khoa học Điện Thế Điện Cực Điện Hóa: Khi được triệu hồi, rút 1 lá bài từ Bộ bài và gây 400 LP sát thương chuẩn lên đối thủ.",
    "scientificLore": "Tôn vinh nhà khoa học vĩ đại Walther Nernst với công trình \"Điện Thế Điện Cực Điện Hóa\" là nền tảng cốt lõi của hóa học thực nghiệm và định lượng GDPT 2018.",
    "relatedEquation": "E = E° - (RT/nF)lnQ",
    "iupacName": "Nernst Potential Warden Principle",
    "archetype": "RADIOACTIVE_ISOTOPE",
    "structuredEffects": [
      {
        "effectId": "B09_EFF_9",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Kích hoạt định luật Điện Thế Điện Cực Điện Hóa: Rút 1 lá bài và gây 300 LP sát thương."
      }
    ]
  },
  {
    "id": "card_b09_010_john_dalton_10",
    "name": "John Dalton — Thuyết Nguyên Tử Căn Bản (Thực Thể 1)",
    "name_en": "Dalton Atomic Sovereign — Principle Form 1",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "TERRA",
    "manaCost": 7,
    "level": 8,
    "atk": 3140,
    "def": 3260,
    "chemicalFormula": "Atomic Mass Unit",
    "effectCode": "ELEM_B09_JOHN_DALTON_LAW_10",
    "effectText": "Định luật khoa học Thuyết Nguyên Tử Căn Bản: Khi được triệu hồi, rút 1 lá bài từ Bộ bài và gây 200 LP sát thương chuẩn lên đối thủ.",
    "scientificLore": "Tôn vinh nhà khoa học vĩ đại John Dalton với công trình \"Thuyết Nguyên Tử Căn Bản\" là nền tảng cốt lõi của hóa học thực nghiệm và định lượng GDPT 2018.",
    "relatedEquation": "Atomic Mass Unit",
    "iupacName": "Dalton Atomic Sovereign Principle",
    "archetype": "RADIOACTIVE_ISOTOPE",
    "structuredEffects": [
      {
        "effectId": "B09_EFF_10",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Kích hoạt định luật Thuyết Nguyên Tử Căn Bản: Rút 1 lá bài và gây 300 LP sát thương."
      }
    ]
  },
  {
    "id": "card_b09_011_lavoisier_11",
    "name": "Lavoisier — Định Luật Bảo Toàn Khối Lượng (Thực Thể 2)",
    "name_en": "Lavoisier Spirit — Principle Form 2",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "TERRA",
    "manaCost": 3,
    "level": 4,
    "atk": 2360,
    "def": 2180,
    "chemicalFormula": "∑m_react = ∑m_prod",
    "effectCode": "ELEM_B09_LAVOISIER_LAW_11",
    "effectText": "Định luật khoa học Định Luật Bảo Toàn Khối Lượng: Khi được triệu hồi, rút 1 lá bài từ Bộ bài và gây 300 LP sát thương chuẩn lên đối thủ.",
    "scientificLore": "Tôn vinh nhà khoa học vĩ đại Lavoisier với công trình \"Định Luật Bảo Toàn Khối Lượng\" là nền tảng cốt lõi của hóa học thực nghiệm và định lượng GDPT 2018.",
    "relatedEquation": "∑m_react = ∑m_prod",
    "iupacName": "Lavoisier Spirit Principle",
    "archetype": "THERMAL_KINETICS",
    "structuredEffects": [
      {
        "effectId": "B09_EFF_11",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Kích hoạt định luật Định Luật Bảo Toàn Khối Lượng: Rút 1 lá bài và gây 300 LP sát thương."
      }
    ]
  },
  {
    "id": "card_b09_012_mendeleev_12",
    "name": "Mendeleev — Bảng Tuần Hoàn Nguyên Tố (Thực Thể 2)",
    "name_en": "Mendeleev Avatar — Principle Form 2",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "ULTRA_RARE",
    "attribute": "NOBLE_VOID",
    "manaCost": 4,
    "level": 5,
    "atk": 2630,
    "def": 2450,
    "chemicalFormula": "f(Z) Periodic Law",
    "effectCode": "ELEM_B09_MENDELEEV_LAW_12",
    "effectText": "Định luật khoa học Bảng Tuần Hoàn Nguyên Tố: Khi được triệu hồi, rút 1 lá bài từ Bộ bài và gây 400 LP sát thương chuẩn lên đối thủ.",
    "scientificLore": "Tôn vinh nhà khoa học vĩ đại Mendeleev với công trình \"Bảng Tuần Hoàn Nguyên Tố\" là nền tảng cốt lõi của hóa học thực nghiệm và định lượng GDPT 2018.",
    "relatedEquation": "f(Z) Periodic Law",
    "iupacName": "Mendeleev Avatar Principle",
    "archetype": "RADIOACTIVE_ISOTOPE",
    "structuredEffects": [
      {
        "effectId": "B09_EFF_12",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Kích hoạt định luật Bảng Tuần Hoàn Nguyên Tố: Rút 1 lá bài và gây 300 LP sát thương."
      }
    ]
  },
  {
    "id": "card_b09_013_marie_curie_13",
    "name": "Marie Curie — Phóng Xạ Alpha/Beta/Gamma (Thực Thể 2)",
    "name_en": "Curie Radiant — Principle Form 2",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SECRET_RARE",
    "attribute": "ELECTRO",
    "manaCost": 5,
    "level": 6,
    "atk": 2660,
    "def": 2720,
    "chemicalFormula": "²²⁶Ra → ²²²Rn + ⁴He",
    "effectCode": "ELEM_B09_MARIE_CURIE_LAW_13",
    "effectText": "Định luật khoa học Phóng Xạ Alpha/Beta/Gamma: Khi được triệu hồi, rút 1 lá bài từ Bộ bài và gây 200 LP sát thương chuẩn lên đối thủ.",
    "scientificLore": "Tôn vinh nhà khoa học vĩ đại Marie Curie với công trình \"Phóng Xạ Alpha/Beta/Gamma\" là nền tảng cốt lõi của hóa học thực nghiệm và định lượng GDPT 2018.",
    "relatedEquation": "²²⁶Ra → ²²²Rn + ⁴He",
    "iupacName": "Curie Radiant Principle",
    "archetype": "RADIOACTIVE_ISOTOPE",
    "structuredEffects": [
      {
        "effectId": "B09_EFF_13",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Kích hoạt định luật Phóng Xạ Alpha/Beta/Gamma: Rút 1 lá bài và gây 300 LP sát thương."
      }
    ]
  },
  {
    "id": "card_b09_014_arrhenius_14",
    "name": "Arrhenius — Năng Lượng Hoạt Hóa Phản Ứng (Thực Thể 2)",
    "name_en": "Arrhenius Specter — Principle Form 2",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "PYRO",
    "manaCost": 6,
    "level": 7,
    "atk": 2930,
    "def": 2990,
    "chemicalFormula": "k = A·e^(-Ea/RT)",
    "effectCode": "ELEM_B09_ARRHENIUS_LAW_14",
    "effectText": "Định luật khoa học Năng Lượng Hoạt Hóa Phản Ứng: Khi được triệu hồi, rút 1 lá bài từ Bộ bài và gây 300 LP sát thương chuẩn lên đối thủ.",
    "scientificLore": "Tôn vinh nhà khoa học vĩ đại Arrhenius với công trình \"Năng Lượng Hoạt Hóa Phản Ứng\" là nền tảng cốt lõi của hóa học thực nghiệm và định lượng GDPT 2018.",
    "relatedEquation": "k = A·e^(-Ea/RT)",
    "iupacName": "Arrhenius Specter Principle",
    "archetype": "THERMAL_KINETICS",
    "structuredEffects": [
      {
        "effectId": "B09_EFF_14",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Kích hoạt định luật Năng Lượng Hoạt Hóa Phản Ứng: Rút 1 lá bài và gây 300 LP sát thương."
      }
    ]
  },
  {
    "id": "card_b09_015_le_chatelier_15",
    "name": "Le Chatelier — Chuyển Dịch Cân Bằng Hóa Học (Thực Thể 2)",
    "name_en": "Le Chatelier Phantom — Principle Form 2",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "AQUA",
    "manaCost": 7,
    "level": 8,
    "atk": 3200,
    "def": 3260,
    "chemicalFormula": "K_c Equilibrium Shift",
    "effectCode": "ELEM_B09_LE_CHATELIER_LAW_15",
    "effectText": "Định luật khoa học Chuyển Dịch Cân Bằng Hóa Học: Khi được triệu hồi, rút 1 lá bài từ Bộ bài và gây 400 LP sát thương chuẩn lên đối thủ.",
    "scientificLore": "Tôn vinh nhà khoa học vĩ đại Le Chatelier với công trình \"Chuyển Dịch Cân Bằng Hóa Học\" là nền tảng cốt lõi của hóa học thực nghiệm và định lượng GDPT 2018.",
    "relatedEquation": "K_c Equilibrium Shift",
    "iupacName": "Le Chatelier Phantom Principle",
    "archetype": "THERMAL_KINETICS",
    "structuredEffects": [
      {
        "effectId": "B09_EFF_15",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Kích hoạt định luật Chuyển Dịch Cân Bằng Hóa Học: Rút 1 lá bài và gây 300 LP sát thương."
      }
    ]
  },
  {
    "id": "card_b09_016_gilbert_lewis_16",
    "name": "Gilbert Lewis — Cặp Electron Liên Kết Hóa Trị (Thực Thể 2)",
    "name_en": "Lewis Core — Principle Form 2",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "AERO",
    "manaCost": 3,
    "level": 4,
    "atk": 2420,
    "def": 2180,
    "chemicalFormula": "Octet Shared Pair",
    "effectCode": "ELEM_B09_GILBERT_LEWIS_LAW_16",
    "effectText": "Định luật khoa học Cặp Electron Liên Kết Hóa Trị: Khi được triệu hồi, rút 1 lá bài từ Bộ bài và gây 200 LP sát thương chuẩn lên đối thủ.",
    "scientificLore": "Tôn vinh nhà khoa học vĩ đại Gilbert Lewis với công trình \"Cặp Electron Liên Kết Hóa Trị\" là nền tảng cốt lõi của hóa học thực nghiệm và định lượng GDPT 2018.",
    "relatedEquation": "Octet Shared Pair",
    "iupacName": "Lewis Core Principle",
    "archetype": "RADIOACTIVE_ISOTOPE",
    "structuredEffects": [
      {
        "effectId": "B09_EFF_16",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Kích hoạt định luật Cặp Electron Liên Kết Hóa Trị: Rút 1 lá bài và gây 300 LP sát thương."
      }
    ]
  },
  {
    "id": "card_b09_017_willard_gibbs_17",
    "name": "Willard Gibbs — Năng Lượng Tự Do Nhiệt Động (Thực Thể 2)",
    "name_en": "Gibbs Energy Titan — Principle Form 2",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "PYRO",
    "manaCost": 4,
    "level": 5,
    "atk": 2450,
    "def": 2450,
    "chemicalFormula": "ΔG = ΔH - TΔS",
    "effectCode": "ELEM_B09_WILLARD_GIBBS_LAW_17",
    "effectText": "Định luật khoa học Năng Lượng Tự Do Nhiệt Động: Khi được triệu hồi, rút 1 lá bài từ Bộ bài và gây 300 LP sát thương chuẩn lên đối thủ.",
    "scientificLore": "Tôn vinh nhà khoa học vĩ đại Willard Gibbs với công trình \"Năng Lượng Tự Do Nhiệt Động\" là nền tảng cốt lõi của hóa học thực nghiệm và định lượng GDPT 2018.",
    "relatedEquation": "ΔG = ΔH - TΔS",
    "iupacName": "Gibbs Energy Titan Principle",
    "archetype": "RADIOACTIVE_ISOTOPE",
    "structuredEffects": [
      {
        "effectId": "B09_EFF_17",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Kích hoạt định luật Năng Lượng Tự Do Nhiệt Động: Rút 1 lá bài và gây 300 LP sát thương."
      }
    ]
  },
  {
    "id": "card_b09_018_alfred_werner_18",
    "name": "Alfred Werner — Thuyết Phức Chất Phối Trí (Thực Thể 2)",
    "name_en": "Werner Coordination Architect — Principle Form 2",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "ELECTRO",
    "manaCost": 5,
    "level": 6,
    "atk": 2720,
    "def": 2720,
    "chemicalFormula": "[Co(NH3)6]Cl3",
    "effectCode": "ELEM_B09_ALFRED_WERNER_LAW_18",
    "effectText": "Định luật khoa học Thuyết Phức Chất Phối Trí: Khi được triệu hồi, rút 1 lá bài từ Bộ bài và gây 400 LP sát thương chuẩn lên đối thủ.",
    "scientificLore": "Tôn vinh nhà khoa học vĩ đại Alfred Werner với công trình \"Thuyết Phức Chất Phối Trí\" là nền tảng cốt lõi của hóa học thực nghiệm và định lượng GDPT 2018.",
    "relatedEquation": "[Co(NH3)6]Cl3",
    "iupacName": "Werner Coordination Architect Principle",
    "archetype": "RADIOACTIVE_ISOTOPE",
    "structuredEffects": [
      {
        "effectId": "B09_EFF_18",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Kích hoạt định luật Thuyết Phức Chất Phối Trí: Rút 1 lá bài và gây 300 LP sát thương."
      }
    ]
  },
  {
    "id": "card_b09_019_walther_nernst_19",
    "name": "Walther Nernst — Điện Thế Điện Cực Điện Hóa (Thực Thể 2)",
    "name_en": "Nernst Potential Warden — Principle Form 2",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "ELECTRO",
    "manaCost": 6,
    "level": 7,
    "atk": 2990,
    "def": 2990,
    "chemicalFormula": "E = E° - (RT/nF)lnQ",
    "effectCode": "ELEM_B09_WALTHER_NERNST_LAW_19",
    "effectText": "Định luật khoa học Điện Thế Điện Cực Điện Hóa: Khi được triệu hồi, rút 1 lá bài từ Bộ bài và gây 200 LP sát thương chuẩn lên đối thủ.",
    "scientificLore": "Tôn vinh nhà khoa học vĩ đại Walther Nernst với công trình \"Điện Thế Điện Cực Điện Hóa\" là nền tảng cốt lõi của hóa học thực nghiệm và định lượng GDPT 2018.",
    "relatedEquation": "E = E° - (RT/nF)lnQ",
    "iupacName": "Nernst Potential Warden Principle",
    "archetype": "RADIOACTIVE_ISOTOPE",
    "structuredEffects": [
      {
        "effectId": "B09_EFF_19",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Kích hoạt định luật Điện Thế Điện Cực Điện Hóa: Rút 1 lá bài và gây 300 LP sát thương."
      }
    ]
  },
  {
    "id": "card_b09_020_john_dalton_20",
    "name": "John Dalton — Thuyết Nguyên Tử Căn Bản (Thực Thể 2)",
    "name_en": "Dalton Atomic Sovereign — Principle Form 2",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "TERRA",
    "manaCost": 7,
    "level": 8,
    "atk": 3260,
    "def": 3260,
    "chemicalFormula": "Atomic Mass Unit",
    "effectCode": "ELEM_B09_JOHN_DALTON_LAW_20",
    "effectText": "Định luật khoa học Thuyết Nguyên Tử Căn Bản: Khi được triệu hồi, rút 1 lá bài từ Bộ bài và gây 300 LP sát thương chuẩn lên đối thủ.",
    "scientificLore": "Tôn vinh nhà khoa học vĩ đại John Dalton với công trình \"Thuyết Nguyên Tử Căn Bản\" là nền tảng cốt lõi của hóa học thực nghiệm và định lượng GDPT 2018.",
    "relatedEquation": "Atomic Mass Unit",
    "iupacName": "Dalton Atomic Sovereign Principle",
    "archetype": "RADIOACTIVE_ISOTOPE",
    "structuredEffects": [
      {
        "effectId": "B09_EFF_20",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Kích hoạt định luật Thuyết Nguyên Tử Căn Bản: Rút 1 lá bài và gây 300 LP sát thương."
      }
    ]
  },
  {
    "id": "card_b09_021_lavoisier_21",
    "name": "Lavoisier — Định Luật Bảo Toàn Khối Lượng (Thực Thể 3)",
    "name_en": "Lavoisier Spirit — Principle Form 3",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "ULTRA_RARE",
    "attribute": "TERRA",
    "manaCost": 3,
    "level": 4,
    "atk": 2240,
    "def": 2180,
    "chemicalFormula": "∑m_react = ∑m_prod",
    "effectCode": "ELEM_B09_LAVOISIER_LAW_21",
    "effectText": "Định luật khoa học Định Luật Bảo Toàn Khối Lượng: Khi được triệu hồi, rút 1 lá bài từ Bộ bài và gây 400 LP sát thương chuẩn lên đối thủ.",
    "scientificLore": "Tôn vinh nhà khoa học vĩ đại Lavoisier với công trình \"Định Luật Bảo Toàn Khối Lượng\" là nền tảng cốt lõi của hóa học thực nghiệm và định lượng GDPT 2018.",
    "relatedEquation": "∑m_react = ∑m_prod",
    "iupacName": "Lavoisier Spirit Principle",
    "archetype": "THERMAL_KINETICS",
    "structuredEffects": [
      {
        "effectId": "B09_EFF_21",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Kích hoạt định luật Định Luật Bảo Toàn Khối Lượng: Rút 1 lá bài và gây 300 LP sát thương."
      }
    ]
  },
  {
    "id": "card_b09_022_mendeleev_22",
    "name": "Mendeleev — Bảng Tuần Hoàn Nguyên Tố (Thực Thể 3)",
    "name_en": "Mendeleev Avatar — Principle Form 3",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SECRET_RARE",
    "attribute": "NOBLE_VOID",
    "manaCost": 4,
    "level": 5,
    "atk": 2510,
    "def": 2450,
    "chemicalFormula": "f(Z) Periodic Law",
    "effectCode": "ELEM_B09_MENDELEEV_LAW_22",
    "effectText": "Định luật khoa học Bảng Tuần Hoàn Nguyên Tố: Khi được triệu hồi, rút 1 lá bài từ Bộ bài và gây 200 LP sát thương chuẩn lên đối thủ.",
    "scientificLore": "Tôn vinh nhà khoa học vĩ đại Mendeleev với công trình \"Bảng Tuần Hoàn Nguyên Tố\" là nền tảng cốt lõi của hóa học thực nghiệm và định lượng GDPT 2018.",
    "relatedEquation": "f(Z) Periodic Law",
    "iupacName": "Mendeleev Avatar Principle",
    "archetype": "RADIOACTIVE_ISOTOPE",
    "structuredEffects": [
      {
        "effectId": "B09_EFF_22",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Kích hoạt định luật Bảng Tuần Hoàn Nguyên Tố: Rút 1 lá bài và gây 300 LP sát thương."
      }
    ]
  },
  {
    "id": "card_b09_023_marie_curie_23",
    "name": "Marie Curie — Phóng Xạ Alpha/Beta/Gamma (Thực Thể 3)",
    "name_en": "Curie Radiant — Principle Form 3",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "ELECTRO",
    "manaCost": 5,
    "level": 6,
    "atk": 2780,
    "def": 2720,
    "chemicalFormula": "²²⁶Ra → ²²²Rn + ⁴He",
    "effectCode": "ELEM_B09_MARIE_CURIE_LAW_23",
    "effectText": "Định luật khoa học Phóng Xạ Alpha/Beta/Gamma: Khi được triệu hồi, rút 1 lá bài từ Bộ bài và gây 300 LP sát thương chuẩn lên đối thủ.",
    "scientificLore": "Tôn vinh nhà khoa học vĩ đại Marie Curie với công trình \"Phóng Xạ Alpha/Beta/Gamma\" là nền tảng cốt lõi của hóa học thực nghiệm và định lượng GDPT 2018.",
    "relatedEquation": "²²⁶Ra → ²²²Rn + ⁴He",
    "iupacName": "Curie Radiant Principle",
    "archetype": "RADIOACTIVE_ISOTOPE",
    "structuredEffects": [
      {
        "effectId": "B09_EFF_23",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Kích hoạt định luật Phóng Xạ Alpha/Beta/Gamma: Rút 1 lá bài và gây 300 LP sát thương."
      }
    ]
  },
  {
    "id": "card_b09_024_arrhenius_24",
    "name": "Arrhenius — Năng Lượng Hoạt Hóa Phản Ứng (Thực Thể 3)",
    "name_en": "Arrhenius Specter — Principle Form 3",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "PYRO",
    "manaCost": 6,
    "level": 7,
    "atk": 3050,
    "def": 2990,
    "chemicalFormula": "k = A·e^(-Ea/RT)",
    "effectCode": "ELEM_B09_ARRHENIUS_LAW_24",
    "effectText": "Định luật khoa học Năng Lượng Hoạt Hóa Phản Ứng: Khi được triệu hồi, rút 1 lá bài từ Bộ bài và gây 400 LP sát thương chuẩn lên đối thủ.",
    "scientificLore": "Tôn vinh nhà khoa học vĩ đại Arrhenius với công trình \"Năng Lượng Hoạt Hóa Phản Ứng\" là nền tảng cốt lõi của hóa học thực nghiệm và định lượng GDPT 2018.",
    "relatedEquation": "k = A·e^(-Ea/RT)",
    "iupacName": "Arrhenius Specter Principle",
    "archetype": "THERMAL_KINETICS",
    "structuredEffects": [
      {
        "effectId": "B09_EFF_24",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Kích hoạt định luật Năng Lượng Hoạt Hóa Phản Ứng: Rút 1 lá bài và gây 300 LP sát thương."
      }
    ]
  },
  {
    "id": "card_b09_025_le_chatelier_25",
    "name": "Le Chatelier — Chuyển Dịch Cân Bằng Hóa Học (Thực Thể 3)",
    "name_en": "Le Chatelier Phantom — Principle Form 3",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "AQUA",
    "manaCost": 7,
    "level": 8,
    "atk": 3080,
    "def": 3260,
    "chemicalFormula": "K_c Equilibrium Shift",
    "effectCode": "ELEM_B09_LE_CHATELIER_LAW_25",
    "effectText": "Định luật khoa học Chuyển Dịch Cân Bằng Hóa Học: Khi được triệu hồi, rút 1 lá bài từ Bộ bài và gây 200 LP sát thương chuẩn lên đối thủ.",
    "scientificLore": "Tôn vinh nhà khoa học vĩ đại Le Chatelier với công trình \"Chuyển Dịch Cân Bằng Hóa Học\" là nền tảng cốt lõi của hóa học thực nghiệm và định lượng GDPT 2018.",
    "relatedEquation": "K_c Equilibrium Shift",
    "iupacName": "Le Chatelier Phantom Principle",
    "archetype": "THERMAL_KINETICS",
    "structuredEffects": [
      {
        "effectId": "B09_EFF_25",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Kích hoạt định luật Chuyển Dịch Cân Bằng Hóa Học: Rút 1 lá bài và gây 300 LP sát thương."
      }
    ]
  },
  {
    "id": "card_b09_026_gilbert_lewis_26",
    "name": "Gilbert Lewis — Cặp Electron Liên Kết Hóa Trị (Thực Thể 3)",
    "name_en": "Lewis Core — Principle Form 3",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "AERO",
    "manaCost": 3,
    "level": 4,
    "atk": 2300,
    "def": 2180,
    "chemicalFormula": "Octet Shared Pair",
    "effectCode": "ELEM_B09_GILBERT_LEWIS_LAW_26",
    "effectText": "Định luật khoa học Cặp Electron Liên Kết Hóa Trị: Khi được triệu hồi, rút 1 lá bài từ Bộ bài và gây 300 LP sát thương chuẩn lên đối thủ.",
    "scientificLore": "Tôn vinh nhà khoa học vĩ đại Gilbert Lewis với công trình \"Cặp Electron Liên Kết Hóa Trị\" là nền tảng cốt lõi của hóa học thực nghiệm và định lượng GDPT 2018.",
    "relatedEquation": "Octet Shared Pair",
    "iupacName": "Lewis Core Principle",
    "archetype": "RADIOACTIVE_ISOTOPE",
    "structuredEffects": [
      {
        "effectId": "B09_EFF_26",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Kích hoạt định luật Cặp Electron Liên Kết Hóa Trị: Rút 1 lá bài và gây 300 LP sát thương."
      }
    ]
  },
  {
    "id": "card_b09_027_willard_gibbs_27",
    "name": "Willard Gibbs — Năng Lượng Tự Do Nhiệt Động (Thực Thể 3)",
    "name_en": "Gibbs Energy Titan — Principle Form 3",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "PYRO",
    "manaCost": 4,
    "level": 5,
    "atk": 2570,
    "def": 2450,
    "chemicalFormula": "ΔG = ΔH - TΔS",
    "effectCode": "ELEM_B09_WILLARD_GIBBS_LAW_27",
    "effectText": "Định luật khoa học Năng Lượng Tự Do Nhiệt Động: Khi được triệu hồi, rút 1 lá bài từ Bộ bài và gây 400 LP sát thương chuẩn lên đối thủ.",
    "scientificLore": "Tôn vinh nhà khoa học vĩ đại Willard Gibbs với công trình \"Năng Lượng Tự Do Nhiệt Động\" là nền tảng cốt lõi của hóa học thực nghiệm và định lượng GDPT 2018.",
    "relatedEquation": "ΔG = ΔH - TΔS",
    "iupacName": "Gibbs Energy Titan Principle",
    "archetype": "RADIOACTIVE_ISOTOPE",
    "structuredEffects": [
      {
        "effectId": "B09_EFF_27",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Kích hoạt định luật Năng Lượng Tự Do Nhiệt Động: Rút 1 lá bài và gây 300 LP sát thương."
      }
    ]
  },
  {
    "id": "card_b09_028_alfred_werner_28",
    "name": "Alfred Werner — Thuyết Phức Chất Phối Trí (Thực Thể 3)",
    "name_en": "Werner Coordination Architect — Principle Form 3",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "ELECTRO",
    "manaCost": 5,
    "level": 6,
    "atk": 2840,
    "def": 2720,
    "chemicalFormula": "[Co(NH3)6]Cl3",
    "effectCode": "ELEM_B09_ALFRED_WERNER_LAW_28",
    "effectText": "Định luật khoa học Thuyết Phức Chất Phối Trí: Khi được triệu hồi, rút 1 lá bài từ Bộ bài và gây 200 LP sát thương chuẩn lên đối thủ.",
    "scientificLore": "Tôn vinh nhà khoa học vĩ đại Alfred Werner với công trình \"Thuyết Phức Chất Phối Trí\" là nền tảng cốt lõi của hóa học thực nghiệm và định lượng GDPT 2018.",
    "relatedEquation": "[Co(NH3)6]Cl3",
    "iupacName": "Werner Coordination Architect Principle",
    "archetype": "RADIOACTIVE_ISOTOPE",
    "structuredEffects": [
      {
        "effectId": "B09_EFF_28",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Kích hoạt định luật Thuyết Phức Chất Phối Trí: Rút 1 lá bài và gây 300 LP sát thương."
      }
    ]
  },
  {
    "id": "card_b09_029_walther_nernst_29",
    "name": "Walther Nernst — Điện Thế Điện Cực Điện Hóa (Thực Thể 3)",
    "name_en": "Nernst Potential Warden — Principle Form 3",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "ELECTRO",
    "manaCost": 6,
    "level": 7,
    "atk": 2870,
    "def": 2990,
    "chemicalFormula": "E = E° - (RT/nF)lnQ",
    "effectCode": "ELEM_B09_WALTHER_NERNST_LAW_29",
    "effectText": "Định luật khoa học Điện Thế Điện Cực Điện Hóa: Khi được triệu hồi, rút 1 lá bài từ Bộ bài và gây 300 LP sát thương chuẩn lên đối thủ.",
    "scientificLore": "Tôn vinh nhà khoa học vĩ đại Walther Nernst với công trình \"Điện Thế Điện Cực Điện Hóa\" là nền tảng cốt lõi của hóa học thực nghiệm và định lượng GDPT 2018.",
    "relatedEquation": "E = E° - (RT/nF)lnQ",
    "iupacName": "Nernst Potential Warden Principle",
    "archetype": "RADIOACTIVE_ISOTOPE",
    "structuredEffects": [
      {
        "effectId": "B09_EFF_29",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Kích hoạt định luật Điện Thế Điện Cực Điện Hóa: Rút 1 lá bài và gây 300 LP sát thương."
      }
    ]
  },
  {
    "id": "card_b09_030_john_dalton_30",
    "name": "John Dalton — Thuyết Nguyên Tử Căn Bản (Thực Thể 3)",
    "name_en": "Dalton Atomic Sovereign — Principle Form 3",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "ULTRA_RARE",
    "attribute": "TERRA",
    "manaCost": 7,
    "level": 8,
    "atk": 3140,
    "def": 3260,
    "chemicalFormula": "Atomic Mass Unit",
    "effectCode": "ELEM_B09_JOHN_DALTON_LAW_30",
    "effectText": "Định luật khoa học Thuyết Nguyên Tử Căn Bản: Khi được triệu hồi, rút 1 lá bài từ Bộ bài và gây 400 LP sát thương chuẩn lên đối thủ.",
    "scientificLore": "Tôn vinh nhà khoa học vĩ đại John Dalton với công trình \"Thuyết Nguyên Tử Căn Bản\" là nền tảng cốt lõi của hóa học thực nghiệm và định lượng GDPT 2018.",
    "relatedEquation": "Atomic Mass Unit",
    "iupacName": "Dalton Atomic Sovereign Principle",
    "archetype": "RADIOACTIVE_ISOTOPE",
    "structuredEffects": [
      {
        "effectId": "B09_EFF_30",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Kích hoạt định luật Thuyết Nguyên Tử Căn Bản: Rút 1 lá bài và gây 300 LP sát thương."
      }
    ]
  },
  {
    "id": "card_b09_031_lavoisier_31",
    "name": "Lavoisier — Định Luật Bảo Toàn Khối Lượng (Thực Thể 4)",
    "name_en": "Lavoisier Spirit — Principle Form 4",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SECRET_RARE",
    "attribute": "TERRA",
    "manaCost": 3,
    "level": 4,
    "atk": 2360,
    "def": 2180,
    "chemicalFormula": "∑m_react = ∑m_prod",
    "effectCode": "ELEM_B09_LAVOISIER_LAW_31",
    "effectText": "Định luật khoa học Định Luật Bảo Toàn Khối Lượng: Khi được triệu hồi, rút 1 lá bài từ Bộ bài và gây 200 LP sát thương chuẩn lên đối thủ.",
    "scientificLore": "Tôn vinh nhà khoa học vĩ đại Lavoisier với công trình \"Định Luật Bảo Toàn Khối Lượng\" là nền tảng cốt lõi của hóa học thực nghiệm và định lượng GDPT 2018.",
    "relatedEquation": "∑m_react = ∑m_prod",
    "iupacName": "Lavoisier Spirit Principle",
    "archetype": "THERMAL_KINETICS",
    "structuredEffects": [
      {
        "effectId": "B09_EFF_31",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Kích hoạt định luật Định Luật Bảo Toàn Khối Lượng: Rút 1 lá bài và gây 300 LP sát thương."
      }
    ]
  },
  {
    "id": "card_b09_032_mendeleev_32",
    "name": "Mendeleev — Bảng Tuần Hoàn Nguyên Tố (Thực Thể 4)",
    "name_en": "Mendeleev Avatar — Principle Form 4",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "NOBLE_VOID",
    "manaCost": 4,
    "level": 5,
    "atk": 2630,
    "def": 2450,
    "chemicalFormula": "f(Z) Periodic Law",
    "effectCode": "ELEM_B09_MENDELEEV_LAW_32",
    "effectText": "Định luật khoa học Bảng Tuần Hoàn Nguyên Tố: Khi được triệu hồi, rút 1 lá bài từ Bộ bài và gây 300 LP sát thương chuẩn lên đối thủ.",
    "scientificLore": "Tôn vinh nhà khoa học vĩ đại Mendeleev với công trình \"Bảng Tuần Hoàn Nguyên Tố\" là nền tảng cốt lõi của hóa học thực nghiệm và định lượng GDPT 2018.",
    "relatedEquation": "f(Z) Periodic Law",
    "iupacName": "Mendeleev Avatar Principle",
    "archetype": "RADIOACTIVE_ISOTOPE",
    "structuredEffects": [
      {
        "effectId": "B09_EFF_32",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Kích hoạt định luật Bảng Tuần Hoàn Nguyên Tố: Rút 1 lá bài và gây 300 LP sát thương."
      }
    ]
  },
  {
    "id": "card_b09_033_marie_curie_33",
    "name": "Marie Curie — Phóng Xạ Alpha/Beta/Gamma (Thực Thể 4)",
    "name_en": "Curie Radiant — Principle Form 4",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "ELECTRO",
    "manaCost": 5,
    "level": 6,
    "atk": 2660,
    "def": 2720,
    "chemicalFormula": "²²⁶Ra → ²²²Rn + ⁴He",
    "effectCode": "ELEM_B09_MARIE_CURIE_LAW_33",
    "effectText": "Định luật khoa học Phóng Xạ Alpha/Beta/Gamma: Khi được triệu hồi, rút 1 lá bài từ Bộ bài và gây 400 LP sát thương chuẩn lên đối thủ.",
    "scientificLore": "Tôn vinh nhà khoa học vĩ đại Marie Curie với công trình \"Phóng Xạ Alpha/Beta/Gamma\" là nền tảng cốt lõi của hóa học thực nghiệm và định lượng GDPT 2018.",
    "relatedEquation": "²²⁶Ra → ²²²Rn + ⁴He",
    "iupacName": "Curie Radiant Principle",
    "archetype": "RADIOACTIVE_ISOTOPE",
    "structuredEffects": [
      {
        "effectId": "B09_EFF_33",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Kích hoạt định luật Phóng Xạ Alpha/Beta/Gamma: Rút 1 lá bài và gây 300 LP sát thương."
      }
    ]
  },
  {
    "id": "card_b09_034_arrhenius_34",
    "name": "Arrhenius — Năng Lượng Hoạt Hóa Phản Ứng (Thực Thể 4)",
    "name_en": "Arrhenius Specter — Principle Form 4",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "PYRO",
    "manaCost": 6,
    "level": 7,
    "atk": 2930,
    "def": 2990,
    "chemicalFormula": "k = A·e^(-Ea/RT)",
    "effectCode": "ELEM_B09_ARRHENIUS_LAW_34",
    "effectText": "Định luật khoa học Năng Lượng Hoạt Hóa Phản Ứng: Khi được triệu hồi, rút 1 lá bài từ Bộ bài và gây 200 LP sát thương chuẩn lên đối thủ.",
    "scientificLore": "Tôn vinh nhà khoa học vĩ đại Arrhenius với công trình \"Năng Lượng Hoạt Hóa Phản Ứng\" là nền tảng cốt lõi của hóa học thực nghiệm và định lượng GDPT 2018.",
    "relatedEquation": "k = A·e^(-Ea/RT)",
    "iupacName": "Arrhenius Specter Principle",
    "archetype": "THERMAL_KINETICS",
    "structuredEffects": [
      {
        "effectId": "B09_EFF_34",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Kích hoạt định luật Năng Lượng Hoạt Hóa Phản Ứng: Rút 1 lá bài và gây 300 LP sát thương."
      }
    ]
  },
  {
    "id": "card_b09_035_le_chatelier_35",
    "name": "Le Chatelier — Chuyển Dịch Cân Bằng Hóa Học (Thực Thể 4)",
    "name_en": "Le Chatelier Phantom — Principle Form 4",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "AQUA",
    "manaCost": 7,
    "level": 8,
    "atk": 3200,
    "def": 3260,
    "chemicalFormula": "K_c Equilibrium Shift",
    "effectCode": "ELEM_B09_LE_CHATELIER_LAW_35",
    "effectText": "Định luật khoa học Chuyển Dịch Cân Bằng Hóa Học: Khi được triệu hồi, rút 1 lá bài từ Bộ bài và gây 300 LP sát thương chuẩn lên đối thủ.",
    "scientificLore": "Tôn vinh nhà khoa học vĩ đại Le Chatelier với công trình \"Chuyển Dịch Cân Bằng Hóa Học\" là nền tảng cốt lõi của hóa học thực nghiệm và định lượng GDPT 2018.",
    "relatedEquation": "K_c Equilibrium Shift",
    "iupacName": "Le Chatelier Phantom Principle",
    "archetype": "THERMAL_KINETICS",
    "structuredEffects": [
      {
        "effectId": "B09_EFF_35",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Kích hoạt định luật Chuyển Dịch Cân Bằng Hóa Học: Rút 1 lá bài và gây 300 LP sát thương."
      }
    ]
  },
  {
    "id": "card_b09_036_gilbert_lewis_36",
    "name": "Gilbert Lewis — Cặp Electron Liên Kết Hóa Trị (Thực Thể 4)",
    "name_en": "Lewis Core — Principle Form 4",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "AERO",
    "manaCost": 3,
    "level": 4,
    "atk": 2420,
    "def": 2180,
    "chemicalFormula": "Octet Shared Pair",
    "effectCode": "ELEM_B09_GILBERT_LEWIS_LAW_36",
    "effectText": "Định luật khoa học Cặp Electron Liên Kết Hóa Trị: Khi được triệu hồi, rút 1 lá bài từ Bộ bài và gây 400 LP sát thương chuẩn lên đối thủ.",
    "scientificLore": "Tôn vinh nhà khoa học vĩ đại Gilbert Lewis với công trình \"Cặp Electron Liên Kết Hóa Trị\" là nền tảng cốt lõi của hóa học thực nghiệm và định lượng GDPT 2018.",
    "relatedEquation": "Octet Shared Pair",
    "iupacName": "Lewis Core Principle",
    "archetype": "RADIOACTIVE_ISOTOPE",
    "structuredEffects": [
      {
        "effectId": "B09_EFF_36",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Kích hoạt định luật Cặp Electron Liên Kết Hóa Trị: Rút 1 lá bài và gây 300 LP sát thương."
      }
    ]
  },
  {
    "id": "card_b09_037_willard_gibbs_37",
    "name": "Willard Gibbs — Năng Lượng Tự Do Nhiệt Động (Thực Thể 4)",
    "name_en": "Gibbs Energy Titan — Principle Form 4",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "PYRO",
    "manaCost": 4,
    "level": 5,
    "atk": 2450,
    "def": 2450,
    "chemicalFormula": "ΔG = ΔH - TΔS",
    "effectCode": "ELEM_B09_WILLARD_GIBBS_LAW_37",
    "effectText": "Định luật khoa học Năng Lượng Tự Do Nhiệt Động: Khi được triệu hồi, rút 1 lá bài từ Bộ bài và gây 200 LP sát thương chuẩn lên đối thủ.",
    "scientificLore": "Tôn vinh nhà khoa học vĩ đại Willard Gibbs với công trình \"Năng Lượng Tự Do Nhiệt Động\" là nền tảng cốt lõi của hóa học thực nghiệm và định lượng GDPT 2018.",
    "relatedEquation": "ΔG = ΔH - TΔS",
    "iupacName": "Gibbs Energy Titan Principle",
    "archetype": "RADIOACTIVE_ISOTOPE",
    "structuredEffects": [
      {
        "effectId": "B09_EFF_37",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Kích hoạt định luật Năng Lượng Tự Do Nhiệt Động: Rút 1 lá bài và gây 300 LP sát thương."
      }
    ]
  },
  {
    "id": "card_b09_038_alfred_werner_38",
    "name": "Alfred Werner — Thuyết Phức Chất Phối Trí (Thực Thể 4)",
    "name_en": "Werner Coordination Architect — Principle Form 4",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "ELECTRO",
    "manaCost": 5,
    "level": 6,
    "atk": 2720,
    "def": 2720,
    "chemicalFormula": "[Co(NH3)6]Cl3",
    "effectCode": "ELEM_B09_ALFRED_WERNER_LAW_38",
    "effectText": "Định luật khoa học Thuyết Phức Chất Phối Trí: Khi được triệu hồi, rút 1 lá bài từ Bộ bài và gây 300 LP sát thương chuẩn lên đối thủ.",
    "scientificLore": "Tôn vinh nhà khoa học vĩ đại Alfred Werner với công trình \"Thuyết Phức Chất Phối Trí\" là nền tảng cốt lõi của hóa học thực nghiệm và định lượng GDPT 2018.",
    "relatedEquation": "[Co(NH3)6]Cl3",
    "iupacName": "Werner Coordination Architect Principle",
    "archetype": "RADIOACTIVE_ISOTOPE",
    "structuredEffects": [
      {
        "effectId": "B09_EFF_38",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Kích hoạt định luật Thuyết Phức Chất Phối Trí: Rút 1 lá bài và gây 300 LP sát thương."
      }
    ]
  },
  {
    "id": "card_b09_039_walther_nernst_39",
    "name": "Walther Nernst — Điện Thế Điện Cực Điện Hóa (Thực Thể 4)",
    "name_en": "Nernst Potential Warden — Principle Form 4",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "ULTRA_RARE",
    "attribute": "ELECTRO",
    "manaCost": 6,
    "level": 7,
    "atk": 2990,
    "def": 2990,
    "chemicalFormula": "E = E° - (RT/nF)lnQ",
    "effectCode": "ELEM_B09_WALTHER_NERNST_LAW_39",
    "effectText": "Định luật khoa học Điện Thế Điện Cực Điện Hóa: Khi được triệu hồi, rút 1 lá bài từ Bộ bài và gây 400 LP sát thương chuẩn lên đối thủ.",
    "scientificLore": "Tôn vinh nhà khoa học vĩ đại Walther Nernst với công trình \"Điện Thế Điện Cực Điện Hóa\" là nền tảng cốt lõi của hóa học thực nghiệm và định lượng GDPT 2018.",
    "relatedEquation": "E = E° - (RT/nF)lnQ",
    "iupacName": "Nernst Potential Warden Principle",
    "archetype": "RADIOACTIVE_ISOTOPE",
    "structuredEffects": [
      {
        "effectId": "B09_EFF_39",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Kích hoạt định luật Điện Thế Điện Cực Điện Hóa: Rút 1 lá bài và gây 300 LP sát thương."
      }
    ]
  },
  {
    "id": "card_b09_040_john_dalton_40",
    "name": "John Dalton — Thuyết Nguyên Tử Căn Bản (Thực Thể 4)",
    "name_en": "Dalton Atomic Sovereign — Principle Form 4",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SECRET_RARE",
    "attribute": "TERRA",
    "manaCost": 7,
    "level": 8,
    "atk": 3260,
    "def": 3260,
    "chemicalFormula": "Atomic Mass Unit",
    "effectCode": "ELEM_B09_JOHN_DALTON_LAW_40",
    "effectText": "Định luật khoa học Thuyết Nguyên Tử Căn Bản: Khi được triệu hồi, rút 1 lá bài từ Bộ bài và gây 200 LP sát thương chuẩn lên đối thủ.",
    "scientificLore": "Tôn vinh nhà khoa học vĩ đại John Dalton với công trình \"Thuyết Nguyên Tử Căn Bản\" là nền tảng cốt lõi của hóa học thực nghiệm và định lượng GDPT 2018.",
    "relatedEquation": "Atomic Mass Unit",
    "iupacName": "Dalton Atomic Sovereign Principle",
    "archetype": "RADIOACTIVE_ISOTOPE",
    "structuredEffects": [
      {
        "effectId": "B09_EFF_40",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Kích hoạt định luật Thuyết Nguyên Tử Căn Bản: Rút 1 lá bài và gây 300 LP sát thương."
      }
    ]
  },
  {
    "id": "card_b09_041_lavoisier_41",
    "name": "Lavoisier — Định Luật Bảo Toàn Khối Lượng (Thực Thể 5)",
    "name_en": "Lavoisier Spirit — Principle Form 5",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "TERRA",
    "manaCost": 3,
    "level": 4,
    "atk": 2240,
    "def": 2180,
    "chemicalFormula": "∑m_react = ∑m_prod",
    "effectCode": "ELEM_B09_LAVOISIER_LAW_41",
    "effectText": "Định luật khoa học Định Luật Bảo Toàn Khối Lượng: Khi được triệu hồi, rút 1 lá bài từ Bộ bài và gây 300 LP sát thương chuẩn lên đối thủ.",
    "scientificLore": "Tôn vinh nhà khoa học vĩ đại Lavoisier với công trình \"Định Luật Bảo Toàn Khối Lượng\" là nền tảng cốt lõi của hóa học thực nghiệm và định lượng GDPT 2018.",
    "relatedEquation": "∑m_react = ∑m_prod",
    "iupacName": "Lavoisier Spirit Principle",
    "archetype": "THERMAL_KINETICS",
    "structuredEffects": [
      {
        "effectId": "B09_EFF_41",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Kích hoạt định luật Định Luật Bảo Toàn Khối Lượng: Rút 1 lá bài và gây 300 LP sát thương."
      }
    ]
  },
  {
    "id": "card_b09_042_mendeleev_42",
    "name": "Mendeleev — Bảng Tuần Hoàn Nguyên Tố (Thực Thể 5)",
    "name_en": "Mendeleev Avatar — Principle Form 5",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "NOBLE_VOID",
    "manaCost": 4,
    "level": 5,
    "atk": 2510,
    "def": 2450,
    "chemicalFormula": "f(Z) Periodic Law",
    "effectCode": "ELEM_B09_MENDELEEV_LAW_42",
    "effectText": "Định luật khoa học Bảng Tuần Hoàn Nguyên Tố: Khi được triệu hồi, rút 1 lá bài từ Bộ bài và gây 400 LP sát thương chuẩn lên đối thủ.",
    "scientificLore": "Tôn vinh nhà khoa học vĩ đại Mendeleev với công trình \"Bảng Tuần Hoàn Nguyên Tố\" là nền tảng cốt lõi của hóa học thực nghiệm và định lượng GDPT 2018.",
    "relatedEquation": "f(Z) Periodic Law",
    "iupacName": "Mendeleev Avatar Principle",
    "archetype": "RADIOACTIVE_ISOTOPE",
    "structuredEffects": [
      {
        "effectId": "B09_EFF_42",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Kích hoạt định luật Bảng Tuần Hoàn Nguyên Tố: Rút 1 lá bài và gây 300 LP sát thương."
      }
    ]
  },
  {
    "id": "card_b09_043_marie_curie_43",
    "name": "Marie Curie — Phóng Xạ Alpha/Beta/Gamma (Thực Thể 5)",
    "name_en": "Curie Radiant — Principle Form 5",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "ELECTRO",
    "manaCost": 5,
    "level": 6,
    "atk": 2780,
    "def": 2720,
    "chemicalFormula": "²²⁶Ra → ²²²Rn + ⁴He",
    "effectCode": "ELEM_B09_MARIE_CURIE_LAW_43",
    "effectText": "Định luật khoa học Phóng Xạ Alpha/Beta/Gamma: Khi được triệu hồi, rút 1 lá bài từ Bộ bài và gây 200 LP sát thương chuẩn lên đối thủ.",
    "scientificLore": "Tôn vinh nhà khoa học vĩ đại Marie Curie với công trình \"Phóng Xạ Alpha/Beta/Gamma\" là nền tảng cốt lõi của hóa học thực nghiệm và định lượng GDPT 2018.",
    "relatedEquation": "²²⁶Ra → ²²²Rn + ⁴He",
    "iupacName": "Curie Radiant Principle",
    "archetype": "RADIOACTIVE_ISOTOPE",
    "structuredEffects": [
      {
        "effectId": "B09_EFF_43",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Kích hoạt định luật Phóng Xạ Alpha/Beta/Gamma: Rút 1 lá bài và gây 300 LP sát thương."
      }
    ]
  },
  {
    "id": "card_b09_044_arrhenius_44",
    "name": "Arrhenius — Năng Lượng Hoạt Hóa Phản Ứng (Thực Thể 5)",
    "name_en": "Arrhenius Specter — Principle Form 5",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "PYRO",
    "manaCost": 6,
    "level": 7,
    "atk": 3050,
    "def": 2990,
    "chemicalFormula": "k = A·e^(-Ea/RT)",
    "effectCode": "ELEM_B09_ARRHENIUS_LAW_44",
    "effectText": "Định luật khoa học Năng Lượng Hoạt Hóa Phản Ứng: Khi được triệu hồi, rút 1 lá bài từ Bộ bài và gây 300 LP sát thương chuẩn lên đối thủ.",
    "scientificLore": "Tôn vinh nhà khoa học vĩ đại Arrhenius với công trình \"Năng Lượng Hoạt Hóa Phản Ứng\" là nền tảng cốt lõi của hóa học thực nghiệm và định lượng GDPT 2018.",
    "relatedEquation": "k = A·e^(-Ea/RT)",
    "iupacName": "Arrhenius Specter Principle",
    "archetype": "THERMAL_KINETICS",
    "structuredEffects": [
      {
        "effectId": "B09_EFF_44",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Kích hoạt định luật Năng Lượng Hoạt Hóa Phản Ứng: Rút 1 lá bài và gây 300 LP sát thương."
      }
    ]
  },
  {
    "id": "card_b09_045_le_chatelier_45",
    "name": "Le Chatelier — Chuyển Dịch Cân Bằng Hóa Học (Thực Thể 5)",
    "name_en": "Le Chatelier Phantom — Principle Form 5",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "AQUA",
    "manaCost": 7,
    "level": 8,
    "atk": 3080,
    "def": 3260,
    "chemicalFormula": "K_c Equilibrium Shift",
    "effectCode": "ELEM_B09_LE_CHATELIER_LAW_45",
    "effectText": "Định luật khoa học Chuyển Dịch Cân Bằng Hóa Học: Khi được triệu hồi, rút 1 lá bài từ Bộ bài và gây 400 LP sát thương chuẩn lên đối thủ.",
    "scientificLore": "Tôn vinh nhà khoa học vĩ đại Le Chatelier với công trình \"Chuyển Dịch Cân Bằng Hóa Học\" là nền tảng cốt lõi của hóa học thực nghiệm và định lượng GDPT 2018.",
    "relatedEquation": "K_c Equilibrium Shift",
    "iupacName": "Le Chatelier Phantom Principle",
    "archetype": "THERMAL_KINETICS",
    "structuredEffects": [
      {
        "effectId": "B09_EFF_45",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Kích hoạt định luật Chuyển Dịch Cân Bằng Hóa Học: Rút 1 lá bài và gây 300 LP sát thương."
      }
    ]
  },
  {
    "id": "card_b09_046_gilbert_lewis_46",
    "name": "Gilbert Lewis — Cặp Electron Liên Kết Hóa Trị (Thực Thể 5)",
    "name_en": "Lewis Core — Principle Form 5",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "AERO",
    "manaCost": 3,
    "level": 4,
    "atk": 2300,
    "def": 2180,
    "chemicalFormula": "Octet Shared Pair",
    "effectCode": "ELEM_B09_GILBERT_LEWIS_LAW_46",
    "effectText": "Định luật khoa học Cặp Electron Liên Kết Hóa Trị: Khi được triệu hồi, rút 1 lá bài từ Bộ bài và gây 200 LP sát thương chuẩn lên đối thủ.",
    "scientificLore": "Tôn vinh nhà khoa học vĩ đại Gilbert Lewis với công trình \"Cặp Electron Liên Kết Hóa Trị\" là nền tảng cốt lõi của hóa học thực nghiệm và định lượng GDPT 2018.",
    "relatedEquation": "Octet Shared Pair",
    "iupacName": "Lewis Core Principle",
    "archetype": "RADIOACTIVE_ISOTOPE",
    "structuredEffects": [
      {
        "effectId": "B09_EFF_46",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Kích hoạt định luật Cặp Electron Liên Kết Hóa Trị: Rút 1 lá bài và gây 300 LP sát thương."
      }
    ]
  },
  {
    "id": "card_b09_047_willard_gibbs_47",
    "name": "Willard Gibbs — Năng Lượng Tự Do Nhiệt Động (Thực Thể 5)",
    "name_en": "Gibbs Energy Titan — Principle Form 5",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "PYRO",
    "manaCost": 4,
    "level": 5,
    "atk": 2570,
    "def": 2450,
    "chemicalFormula": "ΔG = ΔH - TΔS",
    "effectCode": "ELEM_B09_WILLARD_GIBBS_LAW_47",
    "effectText": "Định luật khoa học Năng Lượng Tự Do Nhiệt Động: Khi được triệu hồi, rút 1 lá bài từ Bộ bài và gây 300 LP sát thương chuẩn lên đối thủ.",
    "scientificLore": "Tôn vinh nhà khoa học vĩ đại Willard Gibbs với công trình \"Năng Lượng Tự Do Nhiệt Động\" là nền tảng cốt lõi của hóa học thực nghiệm và định lượng GDPT 2018.",
    "relatedEquation": "ΔG = ΔH - TΔS",
    "iupacName": "Gibbs Energy Titan Principle",
    "archetype": "RADIOACTIVE_ISOTOPE",
    "structuredEffects": [
      {
        "effectId": "B09_EFF_47",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Kích hoạt định luật Năng Lượng Tự Do Nhiệt Động: Rút 1 lá bài và gây 300 LP sát thương."
      }
    ]
  },
  {
    "id": "card_b09_048_alfred_werner_48",
    "name": "Alfred Werner — Thuyết Phức Chất Phối Trí (Thực Thể 5)",
    "name_en": "Werner Coordination Architect — Principle Form 5",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "ULTRA_RARE",
    "attribute": "ELECTRO",
    "manaCost": 5,
    "level": 6,
    "atk": 2840,
    "def": 2720,
    "chemicalFormula": "[Co(NH3)6]Cl3",
    "effectCode": "ELEM_B09_ALFRED_WERNER_LAW_48",
    "effectText": "Định luật khoa học Thuyết Phức Chất Phối Trí: Khi được triệu hồi, rút 1 lá bài từ Bộ bài và gây 400 LP sát thương chuẩn lên đối thủ.",
    "scientificLore": "Tôn vinh nhà khoa học vĩ đại Alfred Werner với công trình \"Thuyết Phức Chất Phối Trí\" là nền tảng cốt lõi của hóa học thực nghiệm và định lượng GDPT 2018.",
    "relatedEquation": "[Co(NH3)6]Cl3",
    "iupacName": "Werner Coordination Architect Principle",
    "archetype": "RADIOACTIVE_ISOTOPE",
    "structuredEffects": [
      {
        "effectId": "B09_EFF_48",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Kích hoạt định luật Thuyết Phức Chất Phối Trí: Rút 1 lá bài và gây 300 LP sát thương."
      }
    ]
  },
  {
    "id": "card_b09_049_walther_nernst_49",
    "name": "Walther Nernst — Điện Thế Điện Cực Điện Hóa (Thực Thể 5)",
    "name_en": "Nernst Potential Warden — Principle Form 5",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SECRET_RARE",
    "attribute": "ELECTRO",
    "manaCost": 6,
    "level": 7,
    "atk": 2870,
    "def": 2990,
    "chemicalFormula": "E = E° - (RT/nF)lnQ",
    "effectCode": "ELEM_B09_WALTHER_NERNST_LAW_49",
    "effectText": "Định luật khoa học Điện Thế Điện Cực Điện Hóa: Khi được triệu hồi, rút 1 lá bài từ Bộ bài và gây 200 LP sát thương chuẩn lên đối thủ.",
    "scientificLore": "Tôn vinh nhà khoa học vĩ đại Walther Nernst với công trình \"Điện Thế Điện Cực Điện Hóa\" là nền tảng cốt lõi của hóa học thực nghiệm và định lượng GDPT 2018.",
    "relatedEquation": "E = E° - (RT/nF)lnQ",
    "iupacName": "Nernst Potential Warden Principle",
    "archetype": "RADIOACTIVE_ISOTOPE",
    "structuredEffects": [
      {
        "effectId": "B09_EFF_49",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Kích hoạt định luật Điện Thế Điện Cực Điện Hóa: Rút 1 lá bài và gây 300 LP sát thương."
      }
    ]
  },
  {
    "id": "card_b09_050_john_dalton_50",
    "name": "John Dalton — Thuyết Nguyên Tử Căn Bản (Thực Thể 5)",
    "name_en": "Dalton Atomic Sovereign — Principle Form 5",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "TERRA",
    "manaCost": 7,
    "level": 8,
    "atk": 3140,
    "def": 3260,
    "chemicalFormula": "Atomic Mass Unit",
    "effectCode": "ELEM_B09_JOHN_DALTON_LAW_50",
    "effectText": "Định luật khoa học Thuyết Nguyên Tử Căn Bản: Khi được triệu hồi, rút 1 lá bài từ Bộ bài và gây 300 LP sát thương chuẩn lên đối thủ.",
    "scientificLore": "Tôn vinh nhà khoa học vĩ đại John Dalton với công trình \"Thuyết Nguyên Tử Căn Bản\" là nền tảng cốt lõi của hóa học thực nghiệm và định lượng GDPT 2018.",
    "relatedEquation": "Atomic Mass Unit",
    "iupacName": "Dalton Atomic Sovereign Principle",
    "archetype": "RADIOACTIVE_ISOTOPE",
    "structuredEffects": [
      {
        "effectId": "B09_EFF_50",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Kích hoạt định luật Thuyết Nguyên Tử Căn Bản: Rút 1 lá bài và gây 300 LP sát thương."
      }
    ]
  },
  {
    "id": "card_b09_051_lavoisier_51",
    "name": "Lavoisier — Định Luật Bảo Toàn Khối Lượng (Thực Thể 6)",
    "name_en": "Lavoisier Spirit — Principle Form 6",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "TERRA",
    "manaCost": 3,
    "level": 4,
    "atk": 2360,
    "def": 2180,
    "chemicalFormula": "∑m_react = ∑m_prod",
    "effectCode": "ELEM_B09_LAVOISIER_LAW_51",
    "effectText": "Định luật khoa học Định Luật Bảo Toàn Khối Lượng: Khi được triệu hồi, rút 1 lá bài từ Bộ bài và gây 400 LP sát thương chuẩn lên đối thủ.",
    "scientificLore": "Tôn vinh nhà khoa học vĩ đại Lavoisier với công trình \"Định Luật Bảo Toàn Khối Lượng\" là nền tảng cốt lõi của hóa học thực nghiệm và định lượng GDPT 2018.",
    "relatedEquation": "∑m_react = ∑m_prod",
    "iupacName": "Lavoisier Spirit Principle",
    "archetype": "THERMAL_KINETICS",
    "structuredEffects": [
      {
        "effectId": "B09_EFF_51",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Kích hoạt định luật Định Luật Bảo Toàn Khối Lượng: Rút 1 lá bài và gây 300 LP sát thương."
      }
    ]
  },
  {
    "id": "card_b09_052_mendeleev_52",
    "name": "Mendeleev — Bảng Tuần Hoàn Nguyên Tố (Thực Thể 6)",
    "name_en": "Mendeleev Avatar — Principle Form 6",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "NOBLE_VOID",
    "manaCost": 4,
    "level": 5,
    "atk": 2630,
    "def": 2450,
    "chemicalFormula": "f(Z) Periodic Law",
    "effectCode": "ELEM_B09_MENDELEEV_LAW_52",
    "effectText": "Định luật khoa học Bảng Tuần Hoàn Nguyên Tố: Khi được triệu hồi, rút 1 lá bài từ Bộ bài và gây 200 LP sát thương chuẩn lên đối thủ.",
    "scientificLore": "Tôn vinh nhà khoa học vĩ đại Mendeleev với công trình \"Bảng Tuần Hoàn Nguyên Tố\" là nền tảng cốt lõi của hóa học thực nghiệm và định lượng GDPT 2018.",
    "relatedEquation": "f(Z) Periodic Law",
    "iupacName": "Mendeleev Avatar Principle",
    "archetype": "RADIOACTIVE_ISOTOPE",
    "structuredEffects": [
      {
        "effectId": "B09_EFF_52",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Kích hoạt định luật Bảng Tuần Hoàn Nguyên Tố: Rút 1 lá bài và gây 300 LP sát thương."
      }
    ]
  },
  {
    "id": "card_b09_053_marie_curie_53",
    "name": "Marie Curie — Phóng Xạ Alpha/Beta/Gamma (Thực Thể 6)",
    "name_en": "Curie Radiant — Principle Form 6",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "ELECTRO",
    "manaCost": 5,
    "level": 6,
    "atk": 2660,
    "def": 2720,
    "chemicalFormula": "²²⁶Ra → ²²²Rn + ⁴He",
    "effectCode": "ELEM_B09_MARIE_CURIE_LAW_53",
    "effectText": "Định luật khoa học Phóng Xạ Alpha/Beta/Gamma: Khi được triệu hồi, rút 1 lá bài từ Bộ bài và gây 300 LP sát thương chuẩn lên đối thủ.",
    "scientificLore": "Tôn vinh nhà khoa học vĩ đại Marie Curie với công trình \"Phóng Xạ Alpha/Beta/Gamma\" là nền tảng cốt lõi của hóa học thực nghiệm và định lượng GDPT 2018.",
    "relatedEquation": "²²⁶Ra → ²²²Rn + ⁴He",
    "iupacName": "Curie Radiant Principle",
    "archetype": "RADIOACTIVE_ISOTOPE",
    "structuredEffects": [
      {
        "effectId": "B09_EFF_53",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Kích hoạt định luật Phóng Xạ Alpha/Beta/Gamma: Rút 1 lá bài và gây 300 LP sát thương."
      }
    ]
  },
  {
    "id": "card_b09_054_arrhenius_54",
    "name": "Arrhenius — Năng Lượng Hoạt Hóa Phản Ứng (Thực Thể 6)",
    "name_en": "Arrhenius Specter — Principle Form 6",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "PYRO",
    "manaCost": 6,
    "level": 7,
    "atk": 2930,
    "def": 2990,
    "chemicalFormula": "k = A·e^(-Ea/RT)",
    "effectCode": "ELEM_B09_ARRHENIUS_LAW_54",
    "effectText": "Định luật khoa học Năng Lượng Hoạt Hóa Phản Ứng: Khi được triệu hồi, rút 1 lá bài từ Bộ bài và gây 400 LP sát thương chuẩn lên đối thủ.",
    "scientificLore": "Tôn vinh nhà khoa học vĩ đại Arrhenius với công trình \"Năng Lượng Hoạt Hóa Phản Ứng\" là nền tảng cốt lõi của hóa học thực nghiệm và định lượng GDPT 2018.",
    "relatedEquation": "k = A·e^(-Ea/RT)",
    "iupacName": "Arrhenius Specter Principle",
    "archetype": "THERMAL_KINETICS",
    "structuredEffects": [
      {
        "effectId": "B09_EFF_54",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Kích hoạt định luật Năng Lượng Hoạt Hóa Phản Ứng: Rút 1 lá bài và gây 300 LP sát thương."
      }
    ]
  },
  {
    "id": "card_b09_055_le_chatelier_55",
    "name": "Le Chatelier — Chuyển Dịch Cân Bằng Hóa Học (Thực Thể 6)",
    "name_en": "Le Chatelier Phantom — Principle Form 6",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "AQUA",
    "manaCost": 7,
    "level": 8,
    "atk": 3200,
    "def": 3260,
    "chemicalFormula": "K_c Equilibrium Shift",
    "effectCode": "ELEM_B09_LE_CHATELIER_LAW_55",
    "effectText": "Định luật khoa học Chuyển Dịch Cân Bằng Hóa Học: Khi được triệu hồi, rút 1 lá bài từ Bộ bài và gây 200 LP sát thương chuẩn lên đối thủ.",
    "scientificLore": "Tôn vinh nhà khoa học vĩ đại Le Chatelier với công trình \"Chuyển Dịch Cân Bằng Hóa Học\" là nền tảng cốt lõi của hóa học thực nghiệm và định lượng GDPT 2018.",
    "relatedEquation": "K_c Equilibrium Shift",
    "iupacName": "Le Chatelier Phantom Principle",
    "archetype": "THERMAL_KINETICS",
    "structuredEffects": [
      {
        "effectId": "B09_EFF_55",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Kích hoạt định luật Chuyển Dịch Cân Bằng Hóa Học: Rút 1 lá bài và gây 300 LP sát thương."
      }
    ]
  },
  {
    "id": "card_b09_056_gilbert_lewis_56",
    "name": "Gilbert Lewis — Cặp Electron Liên Kết Hóa Trị (Thực Thể 6)",
    "name_en": "Lewis Core — Principle Form 6",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "AERO",
    "manaCost": 3,
    "level": 4,
    "atk": 2420,
    "def": 2180,
    "chemicalFormula": "Octet Shared Pair",
    "effectCode": "ELEM_B09_GILBERT_LEWIS_LAW_56",
    "effectText": "Định luật khoa học Cặp Electron Liên Kết Hóa Trị: Khi được triệu hồi, rút 1 lá bài từ Bộ bài và gây 300 LP sát thương chuẩn lên đối thủ.",
    "scientificLore": "Tôn vinh nhà khoa học vĩ đại Gilbert Lewis với công trình \"Cặp Electron Liên Kết Hóa Trị\" là nền tảng cốt lõi của hóa học thực nghiệm và định lượng GDPT 2018.",
    "relatedEquation": "Octet Shared Pair",
    "iupacName": "Lewis Core Principle",
    "archetype": "RADIOACTIVE_ISOTOPE",
    "structuredEffects": [
      {
        "effectId": "B09_EFF_56",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Kích hoạt định luật Cặp Electron Liên Kết Hóa Trị: Rút 1 lá bài và gây 300 LP sát thương."
      }
    ]
  },
  {
    "id": "card_b09_057_willard_gibbs_57",
    "name": "Willard Gibbs — Năng Lượng Tự Do Nhiệt Động (Thực Thể 6)",
    "name_en": "Gibbs Energy Titan — Principle Form 6",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "ULTRA_RARE",
    "attribute": "PYRO",
    "manaCost": 4,
    "level": 5,
    "atk": 2450,
    "def": 2450,
    "chemicalFormula": "ΔG = ΔH - TΔS",
    "effectCode": "ELEM_B09_WILLARD_GIBBS_LAW_57",
    "effectText": "Định luật khoa học Năng Lượng Tự Do Nhiệt Động: Khi được triệu hồi, rút 1 lá bài từ Bộ bài và gây 400 LP sát thương chuẩn lên đối thủ.",
    "scientificLore": "Tôn vinh nhà khoa học vĩ đại Willard Gibbs với công trình \"Năng Lượng Tự Do Nhiệt Động\" là nền tảng cốt lõi của hóa học thực nghiệm và định lượng GDPT 2018.",
    "relatedEquation": "ΔG = ΔH - TΔS",
    "iupacName": "Gibbs Energy Titan Principle",
    "archetype": "RADIOACTIVE_ISOTOPE",
    "structuredEffects": [
      {
        "effectId": "B09_EFF_57",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Kích hoạt định luật Năng Lượng Tự Do Nhiệt Động: Rút 1 lá bài và gây 300 LP sát thương."
      }
    ]
  },
  {
    "id": "card_b09_058_alfred_werner_58",
    "name": "Alfred Werner — Thuyết Phức Chất Phối Trí (Thực Thể 6)",
    "name_en": "Werner Coordination Architect — Principle Form 6",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SECRET_RARE",
    "attribute": "ELECTRO",
    "manaCost": 5,
    "level": 6,
    "atk": 2720,
    "def": 2720,
    "chemicalFormula": "[Co(NH3)6]Cl3",
    "effectCode": "ELEM_B09_ALFRED_WERNER_LAW_58",
    "effectText": "Định luật khoa học Thuyết Phức Chất Phối Trí: Khi được triệu hồi, rút 1 lá bài từ Bộ bài và gây 200 LP sát thương chuẩn lên đối thủ.",
    "scientificLore": "Tôn vinh nhà khoa học vĩ đại Alfred Werner với công trình \"Thuyết Phức Chất Phối Trí\" là nền tảng cốt lõi của hóa học thực nghiệm và định lượng GDPT 2018.",
    "relatedEquation": "[Co(NH3)6]Cl3",
    "iupacName": "Werner Coordination Architect Principle",
    "archetype": "RADIOACTIVE_ISOTOPE",
    "structuredEffects": [
      {
        "effectId": "B09_EFF_58",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Kích hoạt định luật Thuyết Phức Chất Phối Trí: Rút 1 lá bài và gây 300 LP sát thương."
      }
    ]
  },
  {
    "id": "card_b09_059_walther_nernst_59",
    "name": "Walther Nernst — Điện Thế Điện Cực Điện Hóa (Thực Thể 6)",
    "name_en": "Nernst Potential Warden — Principle Form 6",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "ELECTRO",
    "manaCost": 6,
    "level": 7,
    "atk": 2990,
    "def": 2990,
    "chemicalFormula": "E = E° - (RT/nF)lnQ",
    "effectCode": "ELEM_B09_WALTHER_NERNST_LAW_59",
    "effectText": "Định luật khoa học Điện Thế Điện Cực Điện Hóa: Khi được triệu hồi, rút 1 lá bài từ Bộ bài và gây 300 LP sát thương chuẩn lên đối thủ.",
    "scientificLore": "Tôn vinh nhà khoa học vĩ đại Walther Nernst với công trình \"Điện Thế Điện Cực Điện Hóa\" là nền tảng cốt lõi của hóa học thực nghiệm và định lượng GDPT 2018.",
    "relatedEquation": "E = E° - (RT/nF)lnQ",
    "iupacName": "Nernst Potential Warden Principle",
    "archetype": "RADIOACTIVE_ISOTOPE",
    "structuredEffects": [
      {
        "effectId": "B09_EFF_59",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Kích hoạt định luật Điện Thế Điện Cực Điện Hóa: Rút 1 lá bài và gây 300 LP sát thương."
      }
    ]
  },
  {
    "id": "card_b09_060_john_dalton_60",
    "name": "John Dalton — Thuyết Nguyên Tử Căn Bản (Thực Thể 6)",
    "name_en": "Dalton Atomic Sovereign — Principle Form 6",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "TERRA",
    "manaCost": 7,
    "level": 8,
    "atk": 3260,
    "def": 3260,
    "chemicalFormula": "Atomic Mass Unit",
    "effectCode": "ELEM_B09_JOHN_DALTON_LAW_60",
    "effectText": "Định luật khoa học Thuyết Nguyên Tử Căn Bản: Khi được triệu hồi, rút 1 lá bài từ Bộ bài và gây 400 LP sát thương chuẩn lên đối thủ.",
    "scientificLore": "Tôn vinh nhà khoa học vĩ đại John Dalton với công trình \"Thuyết Nguyên Tử Căn Bản\" là nền tảng cốt lõi của hóa học thực nghiệm và định lượng GDPT 2018.",
    "relatedEquation": "Atomic Mass Unit",
    "iupacName": "Dalton Atomic Sovereign Principle",
    "archetype": "RADIOACTIVE_ISOTOPE",
    "structuredEffects": [
      {
        "effectId": "B09_EFF_60",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Kích hoạt định luật Thuyết Nguyên Tử Căn Bản: Rút 1 lá bài và gây 300 LP sát thương."
      }
    ]
  },
  {
    "id": "card_b09_061_lavoisier_61",
    "name": "Lavoisier — Định Luật Bảo Toàn Khối Lượng (Thực Thể 7)",
    "name_en": "Lavoisier Spirit — Principle Form 7",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "TERRA",
    "manaCost": 3,
    "level": 4,
    "atk": 2240,
    "def": 2180,
    "chemicalFormula": "∑m_react = ∑m_prod",
    "effectCode": "ELEM_B09_LAVOISIER_LAW_61",
    "effectText": "Định luật khoa học Định Luật Bảo Toàn Khối Lượng: Khi được triệu hồi, rút 1 lá bài từ Bộ bài và gây 200 LP sát thương chuẩn lên đối thủ.",
    "scientificLore": "Tôn vinh nhà khoa học vĩ đại Lavoisier với công trình \"Định Luật Bảo Toàn Khối Lượng\" là nền tảng cốt lõi của hóa học thực nghiệm và định lượng GDPT 2018.",
    "relatedEquation": "∑m_react = ∑m_prod",
    "iupacName": "Lavoisier Spirit Principle",
    "archetype": "THERMAL_KINETICS",
    "structuredEffects": [
      {
        "effectId": "B09_EFF_61",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Kích hoạt định luật Định Luật Bảo Toàn Khối Lượng: Rút 1 lá bài và gây 300 LP sát thương."
      }
    ]
  },
  {
    "id": "card_b09_062_mendeleev_62",
    "name": "Mendeleev — Bảng Tuần Hoàn Nguyên Tố (Thực Thể 7)",
    "name_en": "Mendeleev Avatar — Principle Form 7",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "NOBLE_VOID",
    "manaCost": 4,
    "level": 5,
    "atk": 2510,
    "def": 2450,
    "chemicalFormula": "f(Z) Periodic Law",
    "effectCode": "ELEM_B09_MENDELEEV_LAW_62",
    "effectText": "Định luật khoa học Bảng Tuần Hoàn Nguyên Tố: Khi được triệu hồi, rút 1 lá bài từ Bộ bài và gây 300 LP sát thương chuẩn lên đối thủ.",
    "scientificLore": "Tôn vinh nhà khoa học vĩ đại Mendeleev với công trình \"Bảng Tuần Hoàn Nguyên Tố\" là nền tảng cốt lõi của hóa học thực nghiệm và định lượng GDPT 2018.",
    "relatedEquation": "f(Z) Periodic Law",
    "iupacName": "Mendeleev Avatar Principle",
    "archetype": "RADIOACTIVE_ISOTOPE",
    "structuredEffects": [
      {
        "effectId": "B09_EFF_62",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Kích hoạt định luật Bảng Tuần Hoàn Nguyên Tố: Rút 1 lá bài và gây 300 LP sát thương."
      }
    ]
  },
  {
    "id": "card_b09_063_marie_curie_63",
    "name": "Marie Curie — Phóng Xạ Alpha/Beta/Gamma (Thực Thể 7)",
    "name_en": "Curie Radiant — Principle Form 7",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "ELECTRO",
    "manaCost": 5,
    "level": 6,
    "atk": 2780,
    "def": 2720,
    "chemicalFormula": "²²⁶Ra → ²²²Rn + ⁴He",
    "effectCode": "ELEM_B09_MARIE_CURIE_LAW_63",
    "effectText": "Định luật khoa học Phóng Xạ Alpha/Beta/Gamma: Khi được triệu hồi, rút 1 lá bài từ Bộ bài và gây 400 LP sát thương chuẩn lên đối thủ.",
    "scientificLore": "Tôn vinh nhà khoa học vĩ đại Marie Curie với công trình \"Phóng Xạ Alpha/Beta/Gamma\" là nền tảng cốt lõi của hóa học thực nghiệm và định lượng GDPT 2018.",
    "relatedEquation": "²²⁶Ra → ²²²Rn + ⁴He",
    "iupacName": "Curie Radiant Principle",
    "archetype": "RADIOACTIVE_ISOTOPE",
    "structuredEffects": [
      {
        "effectId": "B09_EFF_63",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Kích hoạt định luật Phóng Xạ Alpha/Beta/Gamma: Rút 1 lá bài và gây 300 LP sát thương."
      }
    ]
  },
  {
    "id": "card_b09_064_arrhenius_64",
    "name": "Arrhenius — Năng Lượng Hoạt Hóa Phản Ứng (Thực Thể 7)",
    "name_en": "Arrhenius Specter — Principle Form 7",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "PYRO",
    "manaCost": 6,
    "level": 7,
    "atk": 3050,
    "def": 2990,
    "chemicalFormula": "k = A·e^(-Ea/RT)",
    "effectCode": "ELEM_B09_ARRHENIUS_LAW_64",
    "effectText": "Định luật khoa học Năng Lượng Hoạt Hóa Phản Ứng: Khi được triệu hồi, rút 1 lá bài từ Bộ bài và gây 200 LP sát thương chuẩn lên đối thủ.",
    "scientificLore": "Tôn vinh nhà khoa học vĩ đại Arrhenius với công trình \"Năng Lượng Hoạt Hóa Phản Ứng\" là nền tảng cốt lõi của hóa học thực nghiệm và định lượng GDPT 2018.",
    "relatedEquation": "k = A·e^(-Ea/RT)",
    "iupacName": "Arrhenius Specter Principle",
    "archetype": "THERMAL_KINETICS",
    "structuredEffects": [
      {
        "effectId": "B09_EFF_64",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Kích hoạt định luật Năng Lượng Hoạt Hóa Phản Ứng: Rút 1 lá bài và gây 300 LP sát thương."
      }
    ]
  },
  {
    "id": "card_b09_065_le_chatelier_65",
    "name": "Le Chatelier — Chuyển Dịch Cân Bằng Hóa Học (Thực Thể 7)",
    "name_en": "Le Chatelier Phantom — Principle Form 7",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "AQUA",
    "manaCost": 7,
    "level": 8,
    "atk": 3080,
    "def": 3260,
    "chemicalFormula": "K_c Equilibrium Shift",
    "effectCode": "ELEM_B09_LE_CHATELIER_LAW_65",
    "effectText": "Định luật khoa học Chuyển Dịch Cân Bằng Hóa Học: Khi được triệu hồi, rút 1 lá bài từ Bộ bài và gây 300 LP sát thương chuẩn lên đối thủ.",
    "scientificLore": "Tôn vinh nhà khoa học vĩ đại Le Chatelier với công trình \"Chuyển Dịch Cân Bằng Hóa Học\" là nền tảng cốt lõi của hóa học thực nghiệm và định lượng GDPT 2018.",
    "relatedEquation": "K_c Equilibrium Shift",
    "iupacName": "Le Chatelier Phantom Principle",
    "archetype": "THERMAL_KINETICS",
    "structuredEffects": [
      {
        "effectId": "B09_EFF_65",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Kích hoạt định luật Chuyển Dịch Cân Bằng Hóa Học: Rút 1 lá bài và gây 300 LP sát thương."
      }
    ]
  },
  {
    "id": "card_b09_066_gilbert_lewis_66",
    "name": "Gilbert Lewis — Cặp Electron Liên Kết Hóa Trị (Thực Thể 7)",
    "name_en": "Lewis Core — Principle Form 7",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "ULTRA_RARE",
    "attribute": "AERO",
    "manaCost": 3,
    "level": 4,
    "atk": 2300,
    "def": 2180,
    "chemicalFormula": "Octet Shared Pair",
    "effectCode": "ELEM_B09_GILBERT_LEWIS_LAW_66",
    "effectText": "Định luật khoa học Cặp Electron Liên Kết Hóa Trị: Khi được triệu hồi, rút 1 lá bài từ Bộ bài và gây 400 LP sát thương chuẩn lên đối thủ.",
    "scientificLore": "Tôn vinh nhà khoa học vĩ đại Gilbert Lewis với công trình \"Cặp Electron Liên Kết Hóa Trị\" là nền tảng cốt lõi của hóa học thực nghiệm và định lượng GDPT 2018.",
    "relatedEquation": "Octet Shared Pair",
    "iupacName": "Lewis Core Principle",
    "archetype": "RADIOACTIVE_ISOTOPE",
    "structuredEffects": [
      {
        "effectId": "B09_EFF_66",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Kích hoạt định luật Cặp Electron Liên Kết Hóa Trị: Rút 1 lá bài và gây 300 LP sát thương."
      }
    ]
  },
  {
    "id": "card_b09_067_willard_gibbs_67",
    "name": "Willard Gibbs — Năng Lượng Tự Do Nhiệt Động (Thực Thể 7)",
    "name_en": "Gibbs Energy Titan — Principle Form 7",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SECRET_RARE",
    "attribute": "PYRO",
    "manaCost": 4,
    "level": 5,
    "atk": 2570,
    "def": 2450,
    "chemicalFormula": "ΔG = ΔH - TΔS",
    "effectCode": "ELEM_B09_WILLARD_GIBBS_LAW_67",
    "effectText": "Định luật khoa học Năng Lượng Tự Do Nhiệt Động: Khi được triệu hồi, rút 1 lá bài từ Bộ bài và gây 200 LP sát thương chuẩn lên đối thủ.",
    "scientificLore": "Tôn vinh nhà khoa học vĩ đại Willard Gibbs với công trình \"Năng Lượng Tự Do Nhiệt Động\" là nền tảng cốt lõi của hóa học thực nghiệm và định lượng GDPT 2018.",
    "relatedEquation": "ΔG = ΔH - TΔS",
    "iupacName": "Gibbs Energy Titan Principle",
    "archetype": "RADIOACTIVE_ISOTOPE",
    "structuredEffects": [
      {
        "effectId": "B09_EFF_67",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Kích hoạt định luật Năng Lượng Tự Do Nhiệt Động: Rút 1 lá bài và gây 300 LP sát thương."
      }
    ]
  },
  {
    "id": "card_b09_068_alfred_werner_68",
    "name": "Alfred Werner — Thuyết Phức Chất Phối Trí (Thực Thể 7)",
    "name_en": "Werner Coordination Architect — Principle Form 7",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "ELECTRO",
    "manaCost": 5,
    "level": 6,
    "atk": 2840,
    "def": 2720,
    "chemicalFormula": "[Co(NH3)6]Cl3",
    "effectCode": "ELEM_B09_ALFRED_WERNER_LAW_68",
    "effectText": "Định luật khoa học Thuyết Phức Chất Phối Trí: Khi được triệu hồi, rút 1 lá bài từ Bộ bài và gây 300 LP sát thương chuẩn lên đối thủ.",
    "scientificLore": "Tôn vinh nhà khoa học vĩ đại Alfred Werner với công trình \"Thuyết Phức Chất Phối Trí\" là nền tảng cốt lõi của hóa học thực nghiệm và định lượng GDPT 2018.",
    "relatedEquation": "[Co(NH3)6]Cl3",
    "iupacName": "Werner Coordination Architect Principle",
    "archetype": "RADIOACTIVE_ISOTOPE",
    "structuredEffects": [
      {
        "effectId": "B09_EFF_68",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Kích hoạt định luật Thuyết Phức Chất Phối Trí: Rút 1 lá bài và gây 300 LP sát thương."
      }
    ]
  },
  {
    "id": "card_b09_069_walther_nernst_69",
    "name": "Walther Nernst — Điện Thế Điện Cực Điện Hóa (Thực Thể 7)",
    "name_en": "Nernst Potential Warden — Principle Form 7",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "ELECTRO",
    "manaCost": 6,
    "level": 7,
    "atk": 2870,
    "def": 2990,
    "chemicalFormula": "E = E° - (RT/nF)lnQ",
    "effectCode": "ELEM_B09_WALTHER_NERNST_LAW_69",
    "effectText": "Định luật khoa học Điện Thế Điện Cực Điện Hóa: Khi được triệu hồi, rút 1 lá bài từ Bộ bài và gây 400 LP sát thương chuẩn lên đối thủ.",
    "scientificLore": "Tôn vinh nhà khoa học vĩ đại Walther Nernst với công trình \"Điện Thế Điện Cực Điện Hóa\" là nền tảng cốt lõi của hóa học thực nghiệm và định lượng GDPT 2018.",
    "relatedEquation": "E = E° - (RT/nF)lnQ",
    "iupacName": "Nernst Potential Warden Principle",
    "archetype": "RADIOACTIVE_ISOTOPE",
    "structuredEffects": [
      {
        "effectId": "B09_EFF_69",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Kích hoạt định luật Điện Thế Điện Cực Điện Hóa: Rút 1 lá bài và gây 300 LP sát thương."
      }
    ]
  },
  {
    "id": "card_b09_070_john_dalton_70",
    "name": "John Dalton — Thuyết Nguyên Tử Căn Bản (Thực Thể 7)",
    "name_en": "Dalton Atomic Sovereign — Principle Form 7",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "TERRA",
    "manaCost": 7,
    "level": 8,
    "atk": 3140,
    "def": 3260,
    "chemicalFormula": "Atomic Mass Unit",
    "effectCode": "ELEM_B09_JOHN_DALTON_LAW_70",
    "effectText": "Định luật khoa học Thuyết Nguyên Tử Căn Bản: Khi được triệu hồi, rút 1 lá bài từ Bộ bài và gây 200 LP sát thương chuẩn lên đối thủ.",
    "scientificLore": "Tôn vinh nhà khoa học vĩ đại John Dalton với công trình \"Thuyết Nguyên Tử Căn Bản\" là nền tảng cốt lõi của hóa học thực nghiệm và định lượng GDPT 2018.",
    "relatedEquation": "Atomic Mass Unit",
    "iupacName": "Dalton Atomic Sovereign Principle",
    "archetype": "RADIOACTIVE_ISOTOPE",
    "structuredEffects": [
      {
        "effectId": "B09_EFF_70",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Kích hoạt định luật Thuyết Nguyên Tử Căn Bản: Rút 1 lá bài và gây 300 LP sát thương."
      }
    ]
  },
  {
    "id": "card_b09_071_lavoisier_71",
    "name": "Lavoisier — Định Luật Bảo Toàn Khối Lượng (Thực Thể 8)",
    "name_en": "Lavoisier Spirit — Principle Form 8",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "TERRA",
    "manaCost": 3,
    "level": 4,
    "atk": 2360,
    "def": 2180,
    "chemicalFormula": "∑m_react = ∑m_prod",
    "effectCode": "ELEM_B09_LAVOISIER_LAW_71",
    "effectText": "Định luật khoa học Định Luật Bảo Toàn Khối Lượng: Khi được triệu hồi, rút 1 lá bài từ Bộ bài và gây 300 LP sát thương chuẩn lên đối thủ.",
    "scientificLore": "Tôn vinh nhà khoa học vĩ đại Lavoisier với công trình \"Định Luật Bảo Toàn Khối Lượng\" là nền tảng cốt lõi của hóa học thực nghiệm và định lượng GDPT 2018.",
    "relatedEquation": "∑m_react = ∑m_prod",
    "iupacName": "Lavoisier Spirit Principle",
    "archetype": "THERMAL_KINETICS",
    "structuredEffects": [
      {
        "effectId": "B09_EFF_71",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Kích hoạt định luật Định Luật Bảo Toàn Khối Lượng: Rút 1 lá bài và gây 300 LP sát thương."
      }
    ]
  },
  {
    "id": "card_b09_072_mendeleev_72",
    "name": "Mendeleev — Bảng Tuần Hoàn Nguyên Tố (Thực Thể 8)",
    "name_en": "Mendeleev Avatar — Principle Form 8",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "NOBLE_VOID",
    "manaCost": 4,
    "level": 5,
    "atk": 2630,
    "def": 2450,
    "chemicalFormula": "f(Z) Periodic Law",
    "effectCode": "ELEM_B09_MENDELEEV_LAW_72",
    "effectText": "Định luật khoa học Bảng Tuần Hoàn Nguyên Tố: Khi được triệu hồi, rút 1 lá bài từ Bộ bài và gây 400 LP sát thương chuẩn lên đối thủ.",
    "scientificLore": "Tôn vinh nhà khoa học vĩ đại Mendeleev với công trình \"Bảng Tuần Hoàn Nguyên Tố\" là nền tảng cốt lõi của hóa học thực nghiệm và định lượng GDPT 2018.",
    "relatedEquation": "f(Z) Periodic Law",
    "iupacName": "Mendeleev Avatar Principle",
    "archetype": "RADIOACTIVE_ISOTOPE",
    "structuredEffects": [
      {
        "effectId": "B09_EFF_72",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Kích hoạt định luật Bảng Tuần Hoàn Nguyên Tố: Rút 1 lá bài và gây 300 LP sát thương."
      }
    ]
  },
  {
    "id": "card_b09_073_marie_curie_73",
    "name": "Marie Curie — Phóng Xạ Alpha/Beta/Gamma (Thực Thể 8)",
    "name_en": "Curie Radiant — Principle Form 8",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "ELECTRO",
    "manaCost": 5,
    "level": 6,
    "atk": 2660,
    "def": 2720,
    "chemicalFormula": "²²⁶Ra → ²²²Rn + ⁴He",
    "effectCode": "ELEM_B09_MARIE_CURIE_LAW_73",
    "effectText": "Định luật khoa học Phóng Xạ Alpha/Beta/Gamma: Khi được triệu hồi, rút 1 lá bài từ Bộ bài và gây 200 LP sát thương chuẩn lên đối thủ.",
    "scientificLore": "Tôn vinh nhà khoa học vĩ đại Marie Curie với công trình \"Phóng Xạ Alpha/Beta/Gamma\" là nền tảng cốt lõi của hóa học thực nghiệm và định lượng GDPT 2018.",
    "relatedEquation": "²²⁶Ra → ²²²Rn + ⁴He",
    "iupacName": "Curie Radiant Principle",
    "archetype": "RADIOACTIVE_ISOTOPE",
    "structuredEffects": [
      {
        "effectId": "B09_EFF_73",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Kích hoạt định luật Phóng Xạ Alpha/Beta/Gamma: Rút 1 lá bài và gây 300 LP sát thương."
      }
    ]
  },
  {
    "id": "card_b09_074_arrhenius_74",
    "name": "Arrhenius — Năng Lượng Hoạt Hóa Phản Ứng (Thực Thể 8)",
    "name_en": "Arrhenius Specter — Principle Form 8",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "PYRO",
    "manaCost": 6,
    "level": 7,
    "atk": 2930,
    "def": 2990,
    "chemicalFormula": "k = A·e^(-Ea/RT)",
    "effectCode": "ELEM_B09_ARRHENIUS_LAW_74",
    "effectText": "Định luật khoa học Năng Lượng Hoạt Hóa Phản Ứng: Khi được triệu hồi, rút 1 lá bài từ Bộ bài và gây 300 LP sát thương chuẩn lên đối thủ.",
    "scientificLore": "Tôn vinh nhà khoa học vĩ đại Arrhenius với công trình \"Năng Lượng Hoạt Hóa Phản Ứng\" là nền tảng cốt lõi của hóa học thực nghiệm và định lượng GDPT 2018.",
    "relatedEquation": "k = A·e^(-Ea/RT)",
    "iupacName": "Arrhenius Specter Principle",
    "archetype": "THERMAL_KINETICS",
    "structuredEffects": [
      {
        "effectId": "B09_EFF_74",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Kích hoạt định luật Năng Lượng Hoạt Hóa Phản Ứng: Rút 1 lá bài và gây 300 LP sát thương."
      }
    ]
  },
  {
    "id": "card_b09_075_le_chatelier_75",
    "name": "Le Chatelier — Chuyển Dịch Cân Bằng Hóa Học (Thực Thể 8)",
    "name_en": "Le Chatelier Phantom — Principle Form 8",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "ULTRA_RARE",
    "attribute": "AQUA",
    "manaCost": 7,
    "level": 8,
    "atk": 3200,
    "def": 3260,
    "chemicalFormula": "K_c Equilibrium Shift",
    "effectCode": "ELEM_B09_LE_CHATELIER_LAW_75",
    "effectText": "Định luật khoa học Chuyển Dịch Cân Bằng Hóa Học: Khi được triệu hồi, rút 1 lá bài từ Bộ bài và gây 400 LP sát thương chuẩn lên đối thủ.",
    "scientificLore": "Tôn vinh nhà khoa học vĩ đại Le Chatelier với công trình \"Chuyển Dịch Cân Bằng Hóa Học\" là nền tảng cốt lõi của hóa học thực nghiệm và định lượng GDPT 2018.",
    "relatedEquation": "K_c Equilibrium Shift",
    "iupacName": "Le Chatelier Phantom Principle",
    "archetype": "THERMAL_KINETICS",
    "structuredEffects": [
      {
        "effectId": "B09_EFF_75",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Kích hoạt định luật Chuyển Dịch Cân Bằng Hóa Học: Rút 1 lá bài và gây 300 LP sát thương."
      }
    ]
  },
  {
    "id": "card_b09_076_gilbert_lewis_76",
    "name": "Gilbert Lewis — Cặp Electron Liên Kết Hóa Trị (Thực Thể 8)",
    "name_en": "Lewis Core — Principle Form 8",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SECRET_RARE",
    "attribute": "AERO",
    "manaCost": 3,
    "level": 4,
    "atk": 2420,
    "def": 2180,
    "chemicalFormula": "Octet Shared Pair",
    "effectCode": "ELEM_B09_GILBERT_LEWIS_LAW_76",
    "effectText": "Định luật khoa học Cặp Electron Liên Kết Hóa Trị: Khi được triệu hồi, rút 1 lá bài từ Bộ bài và gây 200 LP sát thương chuẩn lên đối thủ.",
    "scientificLore": "Tôn vinh nhà khoa học vĩ đại Gilbert Lewis với công trình \"Cặp Electron Liên Kết Hóa Trị\" là nền tảng cốt lõi của hóa học thực nghiệm và định lượng GDPT 2018.",
    "relatedEquation": "Octet Shared Pair",
    "iupacName": "Lewis Core Principle",
    "archetype": "RADIOACTIVE_ISOTOPE",
    "structuredEffects": [
      {
        "effectId": "B09_EFF_76",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Kích hoạt định luật Cặp Electron Liên Kết Hóa Trị: Rút 1 lá bài và gây 300 LP sát thương."
      }
    ]
  },
  {
    "id": "card_b09_077_willard_gibbs_77",
    "name": "Willard Gibbs — Năng Lượng Tự Do Nhiệt Động (Thực Thể 8)",
    "name_en": "Gibbs Energy Titan — Principle Form 8",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "PYRO",
    "manaCost": 4,
    "level": 5,
    "atk": 2450,
    "def": 2450,
    "chemicalFormula": "ΔG = ΔH - TΔS",
    "effectCode": "ELEM_B09_WILLARD_GIBBS_LAW_77",
    "effectText": "Định luật khoa học Năng Lượng Tự Do Nhiệt Động: Khi được triệu hồi, rút 1 lá bài từ Bộ bài và gây 300 LP sát thương chuẩn lên đối thủ.",
    "scientificLore": "Tôn vinh nhà khoa học vĩ đại Willard Gibbs với công trình \"Năng Lượng Tự Do Nhiệt Động\" là nền tảng cốt lõi của hóa học thực nghiệm và định lượng GDPT 2018.",
    "relatedEquation": "ΔG = ΔH - TΔS",
    "iupacName": "Gibbs Energy Titan Principle",
    "archetype": "RADIOACTIVE_ISOTOPE",
    "structuredEffects": [
      {
        "effectId": "B09_EFF_77",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Kích hoạt định luật Năng Lượng Tự Do Nhiệt Động: Rút 1 lá bài và gây 300 LP sát thương."
      }
    ]
  },
  {
    "id": "card_b09_078_alfred_werner_78",
    "name": "Alfred Werner — Thuyết Phức Chất Phối Trí (Thực Thể 8)",
    "name_en": "Werner Coordination Architect — Principle Form 8",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "ELECTRO",
    "manaCost": 5,
    "level": 6,
    "atk": 2720,
    "def": 2720,
    "chemicalFormula": "[Co(NH3)6]Cl3",
    "effectCode": "ELEM_B09_ALFRED_WERNER_LAW_78",
    "effectText": "Định luật khoa học Thuyết Phức Chất Phối Trí: Khi được triệu hồi, rút 1 lá bài từ Bộ bài và gây 400 LP sát thương chuẩn lên đối thủ.",
    "scientificLore": "Tôn vinh nhà khoa học vĩ đại Alfred Werner với công trình \"Thuyết Phức Chất Phối Trí\" là nền tảng cốt lõi của hóa học thực nghiệm và định lượng GDPT 2018.",
    "relatedEquation": "[Co(NH3)6]Cl3",
    "iupacName": "Werner Coordination Architect Principle",
    "archetype": "RADIOACTIVE_ISOTOPE",
    "structuredEffects": [
      {
        "effectId": "B09_EFF_78",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Kích hoạt định luật Thuyết Phức Chất Phối Trí: Rút 1 lá bài và gây 300 LP sát thương."
      }
    ]
  },
  {
    "id": "card_b09_079_walther_nernst_79",
    "name": "Walther Nernst — Điện Thế Điện Cực Điện Hóa (Thực Thể 8)",
    "name_en": "Nernst Potential Warden — Principle Form 8",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "ELECTRO",
    "manaCost": 6,
    "level": 7,
    "atk": 2990,
    "def": 2990,
    "chemicalFormula": "E = E° - (RT/nF)lnQ",
    "effectCode": "ELEM_B09_WALTHER_NERNST_LAW_79",
    "effectText": "Định luật khoa học Điện Thế Điện Cực Điện Hóa: Khi được triệu hồi, rút 1 lá bài từ Bộ bài và gây 200 LP sát thương chuẩn lên đối thủ.",
    "scientificLore": "Tôn vinh nhà khoa học vĩ đại Walther Nernst với công trình \"Điện Thế Điện Cực Điện Hóa\" là nền tảng cốt lõi của hóa học thực nghiệm và định lượng GDPT 2018.",
    "relatedEquation": "E = E° - (RT/nF)lnQ",
    "iupacName": "Nernst Potential Warden Principle",
    "archetype": "RADIOACTIVE_ISOTOPE",
    "structuredEffects": [
      {
        "effectId": "B09_EFF_79",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Kích hoạt định luật Điện Thế Điện Cực Điện Hóa: Rút 1 lá bài và gây 300 LP sát thương."
      }
    ]
  },
  {
    "id": "card_b09_080_john_dalton_80",
    "name": "John Dalton — Thuyết Nguyên Tử Căn Bản (Thực Thể 8)",
    "name_en": "Dalton Atomic Sovereign — Principle Form 8",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "TERRA",
    "manaCost": 7,
    "level": 8,
    "atk": 3260,
    "def": 3260,
    "chemicalFormula": "Atomic Mass Unit",
    "effectCode": "ELEM_B09_JOHN_DALTON_LAW_80",
    "effectText": "Định luật khoa học Thuyết Nguyên Tử Căn Bản: Khi được triệu hồi, rút 1 lá bài từ Bộ bài và gây 300 LP sát thương chuẩn lên đối thủ.",
    "scientificLore": "Tôn vinh nhà khoa học vĩ đại John Dalton với công trình \"Thuyết Nguyên Tử Căn Bản\" là nền tảng cốt lõi của hóa học thực nghiệm và định lượng GDPT 2018.",
    "relatedEquation": "Atomic Mass Unit",
    "iupacName": "Dalton Atomic Sovereign Principle",
    "archetype": "RADIOACTIVE_ISOTOPE",
    "structuredEffects": [
      {
        "effectId": "B09_EFF_80",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Kích hoạt định luật Thuyết Nguyên Tử Căn Bản: Rút 1 lá bài và gây 300 LP sát thương."
      }
    ]
  },
  {
    "id": "card_b09_081_lavoisier_81",
    "name": "Lavoisier — Định Luật Bảo Toàn Khối Lượng (Thực Thể 9)",
    "name_en": "Lavoisier Spirit — Principle Form 9",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "TERRA",
    "manaCost": 3,
    "level": 4,
    "atk": 2240,
    "def": 2180,
    "chemicalFormula": "∑m_react = ∑m_prod",
    "effectCode": "ELEM_B09_LAVOISIER_LAW_81",
    "effectText": "Định luật khoa học Định Luật Bảo Toàn Khối Lượng: Khi được triệu hồi, rút 1 lá bài từ Bộ bài và gây 400 LP sát thương chuẩn lên đối thủ.",
    "scientificLore": "Tôn vinh nhà khoa học vĩ đại Lavoisier với công trình \"Định Luật Bảo Toàn Khối Lượng\" là nền tảng cốt lõi của hóa học thực nghiệm và định lượng GDPT 2018.",
    "relatedEquation": "∑m_react = ∑m_prod",
    "iupacName": "Lavoisier Spirit Principle",
    "archetype": "THERMAL_KINETICS",
    "structuredEffects": [
      {
        "effectId": "B09_EFF_81",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Kích hoạt định luật Định Luật Bảo Toàn Khối Lượng: Rút 1 lá bài và gây 300 LP sát thương."
      }
    ]
  },
  {
    "id": "card_b09_082_mendeleev_82",
    "name": "Mendeleev — Bảng Tuần Hoàn Nguyên Tố (Thực Thể 9)",
    "name_en": "Mendeleev Avatar — Principle Form 9",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "NOBLE_VOID",
    "manaCost": 4,
    "level": 5,
    "atk": 2510,
    "def": 2450,
    "chemicalFormula": "f(Z) Periodic Law",
    "effectCode": "ELEM_B09_MENDELEEV_LAW_82",
    "effectText": "Định luật khoa học Bảng Tuần Hoàn Nguyên Tố: Khi được triệu hồi, rút 1 lá bài từ Bộ bài và gây 200 LP sát thương chuẩn lên đối thủ.",
    "scientificLore": "Tôn vinh nhà khoa học vĩ đại Mendeleev với công trình \"Bảng Tuần Hoàn Nguyên Tố\" là nền tảng cốt lõi của hóa học thực nghiệm và định lượng GDPT 2018.",
    "relatedEquation": "f(Z) Periodic Law",
    "iupacName": "Mendeleev Avatar Principle",
    "archetype": "RADIOACTIVE_ISOTOPE",
    "structuredEffects": [
      {
        "effectId": "B09_EFF_82",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Kích hoạt định luật Bảng Tuần Hoàn Nguyên Tố: Rút 1 lá bài và gây 300 LP sát thương."
      }
    ]
  },
  {
    "id": "card_b09_083_marie_curie_83",
    "name": "Marie Curie — Phóng Xạ Alpha/Beta/Gamma (Thực Thể 9)",
    "name_en": "Curie Radiant — Principle Form 9",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "ELECTRO",
    "manaCost": 5,
    "level": 6,
    "atk": 2780,
    "def": 2720,
    "chemicalFormula": "²²⁶Ra → ²²²Rn + ⁴He",
    "effectCode": "ELEM_B09_MARIE_CURIE_LAW_83",
    "effectText": "Định luật khoa học Phóng Xạ Alpha/Beta/Gamma: Khi được triệu hồi, rút 1 lá bài từ Bộ bài và gây 300 LP sát thương chuẩn lên đối thủ.",
    "scientificLore": "Tôn vinh nhà khoa học vĩ đại Marie Curie với công trình \"Phóng Xạ Alpha/Beta/Gamma\" là nền tảng cốt lõi của hóa học thực nghiệm và định lượng GDPT 2018.",
    "relatedEquation": "²²⁶Ra → ²²²Rn + ⁴He",
    "iupacName": "Curie Radiant Principle",
    "archetype": "RADIOACTIVE_ISOTOPE",
    "structuredEffects": [
      {
        "effectId": "B09_EFF_83",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Kích hoạt định luật Phóng Xạ Alpha/Beta/Gamma: Rút 1 lá bài và gây 300 LP sát thương."
      }
    ]
  },
  {
    "id": "card_b09_084_arrhenius_84",
    "name": "Arrhenius — Năng Lượng Hoạt Hóa Phản Ứng (Thực Thể 9)",
    "name_en": "Arrhenius Specter — Principle Form 9",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "ULTRA_RARE",
    "attribute": "PYRO",
    "manaCost": 6,
    "level": 7,
    "atk": 3050,
    "def": 2990,
    "chemicalFormula": "k = A·e^(-Ea/RT)",
    "effectCode": "ELEM_B09_ARRHENIUS_LAW_84",
    "effectText": "Định luật khoa học Năng Lượng Hoạt Hóa Phản Ứng: Khi được triệu hồi, rút 1 lá bài từ Bộ bài và gây 400 LP sát thương chuẩn lên đối thủ.",
    "scientificLore": "Tôn vinh nhà khoa học vĩ đại Arrhenius với công trình \"Năng Lượng Hoạt Hóa Phản Ứng\" là nền tảng cốt lõi của hóa học thực nghiệm và định lượng GDPT 2018.",
    "relatedEquation": "k = A·e^(-Ea/RT)",
    "iupacName": "Arrhenius Specter Principle",
    "archetype": "THERMAL_KINETICS",
    "structuredEffects": [
      {
        "effectId": "B09_EFF_84",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Kích hoạt định luật Năng Lượng Hoạt Hóa Phản Ứng: Rút 1 lá bài và gây 300 LP sát thương."
      }
    ]
  },
  {
    "id": "card_b09_085_le_chatelier_85",
    "name": "Le Chatelier — Chuyển Dịch Cân Bằng Hóa Học (Thực Thể 9)",
    "name_en": "Le Chatelier Phantom — Principle Form 9",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SECRET_RARE",
    "attribute": "AQUA",
    "manaCost": 7,
    "level": 8,
    "atk": 3080,
    "def": 3260,
    "chemicalFormula": "K_c Equilibrium Shift",
    "effectCode": "ELEM_B09_LE_CHATELIER_LAW_85",
    "effectText": "Định luật khoa học Chuyển Dịch Cân Bằng Hóa Học: Khi được triệu hồi, rút 1 lá bài từ Bộ bài và gây 200 LP sát thương chuẩn lên đối thủ.",
    "scientificLore": "Tôn vinh nhà khoa học vĩ đại Le Chatelier với công trình \"Chuyển Dịch Cân Bằng Hóa Học\" là nền tảng cốt lõi của hóa học thực nghiệm và định lượng GDPT 2018.",
    "relatedEquation": "K_c Equilibrium Shift",
    "iupacName": "Le Chatelier Phantom Principle",
    "archetype": "THERMAL_KINETICS",
    "structuredEffects": [
      {
        "effectId": "B09_EFF_85",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Kích hoạt định luật Chuyển Dịch Cân Bằng Hóa Học: Rút 1 lá bài và gây 300 LP sát thương."
      }
    ]
  },
  {
    "id": "card_b09_086_gilbert_lewis_86",
    "name": "Gilbert Lewis — Cặp Electron Liên Kết Hóa Trị (Thực Thể 9)",
    "name_en": "Lewis Core — Principle Form 9",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "AERO",
    "manaCost": 3,
    "level": 4,
    "atk": 2300,
    "def": 2180,
    "chemicalFormula": "Octet Shared Pair",
    "effectCode": "ELEM_B09_GILBERT_LEWIS_LAW_86",
    "effectText": "Định luật khoa học Cặp Electron Liên Kết Hóa Trị: Khi được triệu hồi, rút 1 lá bài từ Bộ bài và gây 300 LP sát thương chuẩn lên đối thủ.",
    "scientificLore": "Tôn vinh nhà khoa học vĩ đại Gilbert Lewis với công trình \"Cặp Electron Liên Kết Hóa Trị\" là nền tảng cốt lõi của hóa học thực nghiệm và định lượng GDPT 2018.",
    "relatedEquation": "Octet Shared Pair",
    "iupacName": "Lewis Core Principle",
    "archetype": "RADIOACTIVE_ISOTOPE",
    "structuredEffects": [
      {
        "effectId": "B09_EFF_86",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Kích hoạt định luật Cặp Electron Liên Kết Hóa Trị: Rút 1 lá bài và gây 300 LP sát thương."
      }
    ]
  },
  {
    "id": "card_b09_087_willard_gibbs_87",
    "name": "Willard Gibbs — Năng Lượng Tự Do Nhiệt Động (Thực Thể 9)",
    "name_en": "Gibbs Energy Titan — Principle Form 9",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "PYRO",
    "manaCost": 4,
    "level": 5,
    "atk": 2570,
    "def": 2450,
    "chemicalFormula": "ΔG = ΔH - TΔS",
    "effectCode": "ELEM_B09_WILLARD_GIBBS_LAW_87",
    "effectText": "Định luật khoa học Năng Lượng Tự Do Nhiệt Động: Khi được triệu hồi, rút 1 lá bài từ Bộ bài và gây 400 LP sát thương chuẩn lên đối thủ.",
    "scientificLore": "Tôn vinh nhà khoa học vĩ đại Willard Gibbs với công trình \"Năng Lượng Tự Do Nhiệt Động\" là nền tảng cốt lõi của hóa học thực nghiệm và định lượng GDPT 2018.",
    "relatedEquation": "ΔG = ΔH - TΔS",
    "iupacName": "Gibbs Energy Titan Principle",
    "archetype": "RADIOACTIVE_ISOTOPE",
    "structuredEffects": [
      {
        "effectId": "B09_EFF_87",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Kích hoạt định luật Năng Lượng Tự Do Nhiệt Động: Rút 1 lá bài và gây 300 LP sát thương."
      }
    ]
  },
  {
    "id": "card_b09_088_alfred_werner_88",
    "name": "Alfred Werner — Thuyết Phức Chất Phối Trí (Thực Thể 9)",
    "name_en": "Werner Coordination Architect — Principle Form 9",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "ELECTRO",
    "manaCost": 5,
    "level": 6,
    "atk": 2840,
    "def": 2720,
    "chemicalFormula": "[Co(NH3)6]Cl3",
    "effectCode": "ELEM_B09_ALFRED_WERNER_LAW_88",
    "effectText": "Định luật khoa học Thuyết Phức Chất Phối Trí: Khi được triệu hồi, rút 1 lá bài từ Bộ bài và gây 200 LP sát thương chuẩn lên đối thủ.",
    "scientificLore": "Tôn vinh nhà khoa học vĩ đại Alfred Werner với công trình \"Thuyết Phức Chất Phối Trí\" là nền tảng cốt lõi của hóa học thực nghiệm và định lượng GDPT 2018.",
    "relatedEquation": "[Co(NH3)6]Cl3",
    "iupacName": "Werner Coordination Architect Principle",
    "archetype": "RADIOACTIVE_ISOTOPE",
    "structuredEffects": [
      {
        "effectId": "B09_EFF_88",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Kích hoạt định luật Thuyết Phức Chất Phối Trí: Rút 1 lá bài và gây 300 LP sát thương."
      }
    ]
  },
  {
    "id": "card_b09_089_walther_nernst_89",
    "name": "Walther Nernst — Điện Thế Điện Cực Điện Hóa (Thực Thể 9)",
    "name_en": "Nernst Potential Warden — Principle Form 9",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "ELECTRO",
    "manaCost": 6,
    "level": 7,
    "atk": 2870,
    "def": 2990,
    "chemicalFormula": "E = E° - (RT/nF)lnQ",
    "effectCode": "ELEM_B09_WALTHER_NERNST_LAW_89",
    "effectText": "Định luật khoa học Điện Thế Điện Cực Điện Hóa: Khi được triệu hồi, rút 1 lá bài từ Bộ bài và gây 300 LP sát thương chuẩn lên đối thủ.",
    "scientificLore": "Tôn vinh nhà khoa học vĩ đại Walther Nernst với công trình \"Điện Thế Điện Cực Điện Hóa\" là nền tảng cốt lõi của hóa học thực nghiệm và định lượng GDPT 2018.",
    "relatedEquation": "E = E° - (RT/nF)lnQ",
    "iupacName": "Nernst Potential Warden Principle",
    "archetype": "RADIOACTIVE_ISOTOPE",
    "structuredEffects": [
      {
        "effectId": "B09_EFF_89",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Kích hoạt định luật Điện Thế Điện Cực Điện Hóa: Rút 1 lá bài và gây 300 LP sát thương."
      }
    ]
  },
  {
    "id": "card_b09_090_john_dalton_90",
    "name": "John Dalton — Thuyết Nguyên Tử Căn Bản (Thực Thể 9)",
    "name_en": "Dalton Atomic Sovereign — Principle Form 9",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "TERRA",
    "manaCost": 7,
    "level": 8,
    "atk": 3140,
    "def": 3260,
    "chemicalFormula": "Atomic Mass Unit",
    "effectCode": "ELEM_B09_JOHN_DALTON_LAW_90",
    "effectText": "Định luật khoa học Thuyết Nguyên Tử Căn Bản: Khi được triệu hồi, rút 1 lá bài từ Bộ bài và gây 400 LP sát thương chuẩn lên đối thủ.",
    "scientificLore": "Tôn vinh nhà khoa học vĩ đại John Dalton với công trình \"Thuyết Nguyên Tử Căn Bản\" là nền tảng cốt lõi của hóa học thực nghiệm và định lượng GDPT 2018.",
    "relatedEquation": "Atomic Mass Unit",
    "iupacName": "Dalton Atomic Sovereign Principle",
    "archetype": "RADIOACTIVE_ISOTOPE",
    "structuredEffects": [
      {
        "effectId": "B09_EFF_90",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Kích hoạt định luật Thuyết Nguyên Tử Căn Bản: Rút 1 lá bài và gây 300 LP sát thương."
      }
    ]
  },
  {
    "id": "card_b09_091_lavoisier_91",
    "name": "Lavoisier — Định Luật Bảo Toàn Khối Lượng (Thực Thể 10)",
    "name_en": "Lavoisier Spirit — Principle Form 10",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "TERRA",
    "manaCost": 3,
    "level": 4,
    "atk": 2360,
    "def": 2180,
    "chemicalFormula": "∑m_react = ∑m_prod",
    "effectCode": "ELEM_B09_LAVOISIER_LAW_91",
    "effectText": "Định luật khoa học Định Luật Bảo Toàn Khối Lượng: Khi được triệu hồi, rút 1 lá bài từ Bộ bài và gây 200 LP sát thương chuẩn lên đối thủ.",
    "scientificLore": "Tôn vinh nhà khoa học vĩ đại Lavoisier với công trình \"Định Luật Bảo Toàn Khối Lượng\" là nền tảng cốt lõi của hóa học thực nghiệm và định lượng GDPT 2018.",
    "relatedEquation": "∑m_react = ∑m_prod",
    "iupacName": "Lavoisier Spirit Principle",
    "archetype": "THERMAL_KINETICS",
    "structuredEffects": [
      {
        "effectId": "B09_EFF_91",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Kích hoạt định luật Định Luật Bảo Toàn Khối Lượng: Rút 1 lá bài và gây 300 LP sát thương."
      }
    ]
  },
  {
    "id": "card_b09_092_mendeleev_92",
    "name": "Mendeleev — Bảng Tuần Hoàn Nguyên Tố (Thực Thể 10)",
    "name_en": "Mendeleev Avatar — Principle Form 10",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "NOBLE_VOID",
    "manaCost": 4,
    "level": 5,
    "atk": 2630,
    "def": 2450,
    "chemicalFormula": "f(Z) Periodic Law",
    "effectCode": "ELEM_B09_MENDELEEV_LAW_92",
    "effectText": "Định luật khoa học Bảng Tuần Hoàn Nguyên Tố: Khi được triệu hồi, rút 1 lá bài từ Bộ bài và gây 300 LP sát thương chuẩn lên đối thủ.",
    "scientificLore": "Tôn vinh nhà khoa học vĩ đại Mendeleev với công trình \"Bảng Tuần Hoàn Nguyên Tố\" là nền tảng cốt lõi của hóa học thực nghiệm và định lượng GDPT 2018.",
    "relatedEquation": "f(Z) Periodic Law",
    "iupacName": "Mendeleev Avatar Principle",
    "archetype": "RADIOACTIVE_ISOTOPE",
    "structuredEffects": [
      {
        "effectId": "B09_EFF_92",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Kích hoạt định luật Bảng Tuần Hoàn Nguyên Tố: Rút 1 lá bài và gây 300 LP sát thương."
      }
    ]
  },
  {
    "id": "card_b09_093_marie_curie_93",
    "name": "Marie Curie — Phóng Xạ Alpha/Beta/Gamma (Thực Thể 10)",
    "name_en": "Curie Radiant — Principle Form 10",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "ULTRA_RARE",
    "attribute": "ELECTRO",
    "manaCost": 5,
    "level": 6,
    "atk": 2660,
    "def": 2720,
    "chemicalFormula": "²²⁶Ra → ²²²Rn + ⁴He",
    "effectCode": "ELEM_B09_MARIE_CURIE_LAW_93",
    "effectText": "Định luật khoa học Phóng Xạ Alpha/Beta/Gamma: Khi được triệu hồi, rút 1 lá bài từ Bộ bài và gây 400 LP sát thương chuẩn lên đối thủ.",
    "scientificLore": "Tôn vinh nhà khoa học vĩ đại Marie Curie với công trình \"Phóng Xạ Alpha/Beta/Gamma\" là nền tảng cốt lõi của hóa học thực nghiệm và định lượng GDPT 2018.",
    "relatedEquation": "²²⁶Ra → ²²²Rn + ⁴He",
    "iupacName": "Curie Radiant Principle",
    "archetype": "RADIOACTIVE_ISOTOPE",
    "structuredEffects": [
      {
        "effectId": "B09_EFF_93",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Kích hoạt định luật Phóng Xạ Alpha/Beta/Gamma: Rút 1 lá bài và gây 300 LP sát thương."
      }
    ]
  },
  {
    "id": "card_b09_094_arrhenius_94",
    "name": "Arrhenius — Năng Lượng Hoạt Hóa Phản Ứng (Thực Thể 10)",
    "name_en": "Arrhenius Specter — Principle Form 10",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SECRET_RARE",
    "attribute": "PYRO",
    "manaCost": 6,
    "level": 7,
    "atk": 2930,
    "def": 2990,
    "chemicalFormula": "k = A·e^(-Ea/RT)",
    "effectCode": "ELEM_B09_ARRHENIUS_LAW_94",
    "effectText": "Định luật khoa học Năng Lượng Hoạt Hóa Phản Ứng: Khi được triệu hồi, rút 1 lá bài từ Bộ bài và gây 200 LP sát thương chuẩn lên đối thủ.",
    "scientificLore": "Tôn vinh nhà khoa học vĩ đại Arrhenius với công trình \"Năng Lượng Hoạt Hóa Phản Ứng\" là nền tảng cốt lõi của hóa học thực nghiệm và định lượng GDPT 2018.",
    "relatedEquation": "k = A·e^(-Ea/RT)",
    "iupacName": "Arrhenius Specter Principle",
    "archetype": "THERMAL_KINETICS",
    "structuredEffects": [
      {
        "effectId": "B09_EFF_94",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Kích hoạt định luật Năng Lượng Hoạt Hóa Phản Ứng: Rút 1 lá bài và gây 300 LP sát thương."
      }
    ]
  },
  {
    "id": "card_b09_095_le_chatelier_95",
    "name": "Le Chatelier — Chuyển Dịch Cân Bằng Hóa Học (Thực Thể 10)",
    "name_en": "Le Chatelier Phantom — Principle Form 10",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "AQUA",
    "manaCost": 7,
    "level": 8,
    "atk": 3200,
    "def": 3260,
    "chemicalFormula": "K_c Equilibrium Shift",
    "effectCode": "ELEM_B09_LE_CHATELIER_LAW_95",
    "effectText": "Định luật khoa học Chuyển Dịch Cân Bằng Hóa Học: Khi được triệu hồi, rút 1 lá bài từ Bộ bài và gây 300 LP sát thương chuẩn lên đối thủ.",
    "scientificLore": "Tôn vinh nhà khoa học vĩ đại Le Chatelier với công trình \"Chuyển Dịch Cân Bằng Hóa Học\" là nền tảng cốt lõi của hóa học thực nghiệm và định lượng GDPT 2018.",
    "relatedEquation": "K_c Equilibrium Shift",
    "iupacName": "Le Chatelier Phantom Principle",
    "archetype": "THERMAL_KINETICS",
    "structuredEffects": [
      {
        "effectId": "B09_EFF_95",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Kích hoạt định luật Chuyển Dịch Cân Bằng Hóa Học: Rút 1 lá bài và gây 300 LP sát thương."
      }
    ]
  },
  {
    "id": "card_b09_096_gilbert_lewis_96",
    "name": "Gilbert Lewis — Cặp Electron Liên Kết Hóa Trị (Thực Thể 10)",
    "name_en": "Lewis Core — Principle Form 10",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "AERO",
    "manaCost": 3,
    "level": 4,
    "atk": 2420,
    "def": 2180,
    "chemicalFormula": "Octet Shared Pair",
    "effectCode": "ELEM_B09_GILBERT_LEWIS_LAW_96",
    "effectText": "Định luật khoa học Cặp Electron Liên Kết Hóa Trị: Khi được triệu hồi, rút 1 lá bài từ Bộ bài và gây 400 LP sát thương chuẩn lên đối thủ.",
    "scientificLore": "Tôn vinh nhà khoa học vĩ đại Gilbert Lewis với công trình \"Cặp Electron Liên Kết Hóa Trị\" là nền tảng cốt lõi của hóa học thực nghiệm và định lượng GDPT 2018.",
    "relatedEquation": "Octet Shared Pair",
    "iupacName": "Lewis Core Principle",
    "archetype": "RADIOACTIVE_ISOTOPE",
    "structuredEffects": [
      {
        "effectId": "B09_EFF_96",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Kích hoạt định luật Cặp Electron Liên Kết Hóa Trị: Rút 1 lá bài và gây 300 LP sát thương."
      }
    ]
  },
  {
    "id": "card_b09_097_willard_gibbs_97",
    "name": "Willard Gibbs — Năng Lượng Tự Do Nhiệt Động (Thực Thể 10)",
    "name_en": "Gibbs Energy Titan — Principle Form 10",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "PYRO",
    "manaCost": 4,
    "level": 5,
    "atk": 2450,
    "def": 2450,
    "chemicalFormula": "ΔG = ΔH - TΔS",
    "effectCode": "ELEM_B09_WILLARD_GIBBS_LAW_97",
    "effectText": "Định luật khoa học Năng Lượng Tự Do Nhiệt Động: Khi được triệu hồi, rút 1 lá bài từ Bộ bài và gây 200 LP sát thương chuẩn lên đối thủ.",
    "scientificLore": "Tôn vinh nhà khoa học vĩ đại Willard Gibbs với công trình \"Năng Lượng Tự Do Nhiệt Động\" là nền tảng cốt lõi của hóa học thực nghiệm và định lượng GDPT 2018.",
    "relatedEquation": "ΔG = ΔH - TΔS",
    "iupacName": "Gibbs Energy Titan Principle",
    "archetype": "RADIOACTIVE_ISOTOPE",
    "structuredEffects": [
      {
        "effectId": "B09_EFF_97",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Kích hoạt định luật Năng Lượng Tự Do Nhiệt Động: Rút 1 lá bài và gây 300 LP sát thương."
      }
    ]
  },
  {
    "id": "card_b09_098_alfred_werner_98",
    "name": "Alfred Werner — Thuyết Phức Chất Phối Trí (Thực Thể 10)",
    "name_en": "Werner Coordination Architect — Principle Form 10",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "ELECTRO",
    "manaCost": 5,
    "level": 6,
    "atk": 2720,
    "def": 2720,
    "chemicalFormula": "[Co(NH3)6]Cl3",
    "effectCode": "ELEM_B09_ALFRED_WERNER_LAW_98",
    "effectText": "Định luật khoa học Thuyết Phức Chất Phối Trí: Khi được triệu hồi, rút 1 lá bài từ Bộ bài và gây 300 LP sát thương chuẩn lên đối thủ.",
    "scientificLore": "Tôn vinh nhà khoa học vĩ đại Alfred Werner với công trình \"Thuyết Phức Chất Phối Trí\" là nền tảng cốt lõi của hóa học thực nghiệm và định lượng GDPT 2018.",
    "relatedEquation": "[Co(NH3)6]Cl3",
    "iupacName": "Werner Coordination Architect Principle",
    "archetype": "RADIOACTIVE_ISOTOPE",
    "structuredEffects": [
      {
        "effectId": "B09_EFF_98",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Kích hoạt định luật Thuyết Phức Chất Phối Trí: Rút 1 lá bài và gây 300 LP sát thương."
      }
    ]
  },
  {
    "id": "card_b09_099_walther_nernst_99",
    "name": "Walther Nernst — Điện Thế Điện Cực Điện Hóa (Thực Thể 10)",
    "name_en": "Nernst Potential Warden — Principle Form 10",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "ELECTRO",
    "manaCost": 6,
    "level": 7,
    "atk": 2990,
    "def": 2990,
    "chemicalFormula": "E = E° - (RT/nF)lnQ",
    "effectCode": "ELEM_B09_WALTHER_NERNST_LAW_99",
    "effectText": "Định luật khoa học Điện Thế Điện Cực Điện Hóa: Khi được triệu hồi, rút 1 lá bài từ Bộ bài và gây 400 LP sát thương chuẩn lên đối thủ.",
    "scientificLore": "Tôn vinh nhà khoa học vĩ đại Walther Nernst với công trình \"Điện Thế Điện Cực Điện Hóa\" là nền tảng cốt lõi của hóa học thực nghiệm và định lượng GDPT 2018.",
    "relatedEquation": "E = E° - (RT/nF)lnQ",
    "iupacName": "Nernst Potential Warden Principle",
    "archetype": "RADIOACTIVE_ISOTOPE",
    "structuredEffects": [
      {
        "effectId": "B09_EFF_99",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Kích hoạt định luật Điện Thế Điện Cực Điện Hóa: Rút 1 lá bài và gây 300 LP sát thương."
      }
    ]
  },
  {
    "id": "card_b09_100_john_dalton_100",
    "name": "John Dalton — Thuyết Nguyên Tử Căn Bản (Thực Thể 10)",
    "name_en": "Dalton Atomic Sovereign — Principle Form 10",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "TERRA",
    "manaCost": 7,
    "level": 8,
    "atk": 3260,
    "def": 3260,
    "chemicalFormula": "Atomic Mass Unit",
    "effectCode": "ELEM_B09_JOHN_DALTON_LAW_100",
    "effectText": "Định luật khoa học Thuyết Nguyên Tử Căn Bản: Khi được triệu hồi, rút 1 lá bài từ Bộ bài và gây 200 LP sát thương chuẩn lên đối thủ.",
    "scientificLore": "Tôn vinh nhà khoa học vĩ đại John Dalton với công trình \"Thuyết Nguyên Tử Căn Bản\" là nền tảng cốt lõi của hóa học thực nghiệm và định lượng GDPT 2018.",
    "relatedEquation": "Atomic Mass Unit",
    "iupacName": "Dalton Atomic Sovereign Principle",
    "archetype": "RADIOACTIVE_ISOTOPE",
    "structuredEffects": [
      {
        "effectId": "B09_EFF_100",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Kích hoạt định luật Thuyết Nguyên Tử Căn Bản: Rút 1 lá bài và gây 300 LP sát thương."
      }
    ]
  }
];
