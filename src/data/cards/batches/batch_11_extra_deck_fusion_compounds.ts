// src/data/cards/batches/batch_11_extra_deck_fusion_compounds.ts
// Batch 11: Extra Deck Fusion / Compound Monsters (75 cards)
// Automatically generated and validated for ELEMENTA Tactical TCG

import { PlayableCardDef } from '../../../domain/cardGameTypes';

export const BATCH_11_CARDS: PlayableCardDef[] = [
  {
    "id": "card_b11_001_fusion_pure_water_crystal_1",
    "name": "Nước Tinh Khiết — Hợp Chất Tổng Hợp Bậc 1",
    "name_en": "Pure Water Crystal — Synthesis Compound Mk-1",
    "cardType": "COMPOUND_MONSTER",
    "rarity": "RARE",
    "attribute": "AQUA",
    "manaCost": 4,
    "level": 5,
    "atk": 2800,
    "def": 2550,
    "chemicalFormula": "H2O",
    "effectCode": "COMP_B11_PURE_WATER_CRYSTAL_SYN_1",
    "effectText": "[Triệu hồi Hợp Chất / Fusion]: Cần kết hợp đúng nguyên liệu hóa học. Khi triệu hồi thành công: Phục hồi 400 LP cho bản thân và gây 400 LP sát thương phản ứng lên đối thủ.",
    "scientificLore": "Hợp chất Nước Tinh Khiết (H2O) tổng hợp từ phản ứng hóa học kinh điển theo tỷ lệ mol bảo toàn nguyên tố GDPT 2018: 2H₂ + O₂ → 2H₂O.",
    "relatedEquation": "2H₂ + O₂ → 2H₂O",
    "iupacName": "Pure Water Crystal Complex",
    "archetype": "WERNER_COORDINATION",
    "structuredEffects": [
      {
        "effectId": "B11_EFF_1",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "HEAL_LP",
            "params": {
              "amount": 400
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 400
            }
          }
        ],
        "description": "Phản ứng tổng hợp: Hồi 400 LP và gây 400 LP sát thương."
      }
    ],
    "synthesisRecipe": {
      "reactantFormulas": [
        {
          "formula": "H2",
          "count": 2
        },
        {
          "formula": "O2",
          "count": 1
        }
      ],
      "pedagogicalEquation": "2H₂ + O₂ → 2H₂O"
    }
  },
  {
    "id": "card_b11_002_fusion_thermite_ignition_titan_2",
    "name": "Nhiệt Nhôm Thermite — Hợp Chất Tổng Hợp Bậc 1",
    "name_en": "Thermite Ignition Titan — Synthesis Compound Mk-1",
    "cardType": "COMPOUND_MONSTER",
    "rarity": "RARE",
    "attribute": "PYRO",
    "manaCost": 5,
    "level": 6,
    "atk": 3010,
    "def": 2760,
    "chemicalFormula": "Fe+Al2O3",
    "effectCode": "COMP_B11_THERMITE_IGNITION_TITAN_SYN_2",
    "effectText": "[Triệu hồi Hợp Chất / Fusion]: Cần kết hợp đúng nguyên liệu hóa học. Khi triệu hồi thành công: Phục hồi 400 LP cho bản thân và gây 400 LP sát thương phản ứng lên đối thủ.",
    "scientificLore": "Hợp chất Nhiệt Nhôm Thermite (Fe+Al2O3) tổng hợp từ phản ứng hóa học kinh điển theo tỷ lệ mol bảo toàn nguyên tố GDPT 2018: Fe₂O₃ + 2Al → 2Fe + Al₂O₃ (2500°C).",
    "relatedEquation": "Fe₂O₃ + 2Al → 2Fe + Al₂O₃ (2500°C)",
    "iupacName": "Thermite Ignition Titan Complex",
    "archetype": "PETROCHEMICAL_REFINERY",
    "structuredEffects": [
      {
        "effectId": "B11_EFF_2",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "HEAL_LP",
            "params": {
              "amount": 400
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 400
            }
          }
        ],
        "description": "Phản ứng tổng hợp: Hồi 400 LP và gây 400 LP sát thương."
      }
    ],
    "synthesisRecipe": {
      "reactantFormulas": [
        {
          "formula": "Fe2O3",
          "count": 1
        },
        {
          "formula": "Al",
          "count": 2
        }
      ],
      "pedagogicalEquation": "Fe₂O₃ + 2Al → 2Fe + Al₂O₃ (2500°C)",
      "requiredCondition": "HIGH_TEMP"
    }
  },
  {
    "id": "card_b11_003_fusion_aqua_regia_sovereign_3",
    "name": "Nước Cường Toan Aqua Regia — Hợp Chất Tổng Hợp Bậc 1",
    "name_en": "Aqua Regia Sovereign — Synthesis Compound Mk-1",
    "cardType": "COMPOUND_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "ACID_DARK",
    "manaCost": 6,
    "level": 7,
    "atk": 3220,
    "def": 2970,
    "chemicalFormula": "HNO3·3HCl",
    "effectCode": "COMP_B11_AQUA_REGIA_SOVEREIGN_SYN_3",
    "effectText": "[Triệu hồi Hợp Chất / Fusion]: Cần kết hợp đúng nguyên liệu hóa học. Khi triệu hồi thành công: Phục hồi 400 LP cho bản thân và gây 400 LP sát thương phản ứng lên đối thủ.",
    "scientificLore": "Hợp chất Nước Cường Toan Aqua Regia (HNO3·3HCl) tổng hợp từ phản ứng hóa học kinh điển theo tỷ lệ mol bảo toàn nguyên tố GDPT 2018: Au + 3HNO₃ + 4HCl → HAuCl₄ + 3NO₂ + 3H₂O.",
    "relatedEquation": "Au + 3HNO₃ + 4HCl → HAuCl₄ + 3NO₂ + 3H₂O",
    "iupacName": "Aqua Regia Sovereign Complex",
    "archetype": "WERNER_COORDINATION",
    "structuredEffects": [
      {
        "effectId": "B11_EFF_3",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "HEAL_LP",
            "params": {
              "amount": 400
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 400
            }
          }
        ],
        "description": "Phản ứng tổng hợp: Hồi 400 LP và gây 400 LP sát thương."
      }
    ],
    "synthesisRecipe": {
      "reactantFormulas": [
        {
          "formula": "Au",
          "count": 1
        },
        {
          "formula": "HNO3",
          "count": 3
        },
        {
          "formula": "HCl",
          "count": 4
        }
      ],
      "pedagogicalEquation": "Au + 3HNO₃ + 4HCl → HAuCl₄ + 3NO₂ + 3H₂O"
    }
  },
  {
    "id": "card_b11_004_fusion_brass_alloy_golem_4",
    "name": "Đồng Thau Hợp Kim Brass — Hợp Chất Tổng Hợp Bậc 1",
    "name_en": "Brass Alloy Golem — Synthesis Compound Mk-1",
    "cardType": "COMPOUND_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "TERRA",
    "manaCost": 7,
    "level": 8,
    "atk": 3430,
    "def": 3180,
    "chemicalFormula": "Cu-Zn",
    "effectCode": "COMP_B11_BRASS_ALLOY_GOLEM_SYN_4",
    "effectText": "[Triệu hồi Hợp Chất / Fusion]: Cần kết hợp đúng nguyên liệu hóa học. Khi triệu hồi thành công: Phục hồi 400 LP cho bản thân và gây 400 LP sát thương phản ứng lên đối thủ.",
    "scientificLore": "Hợp chất Đồng Thau Hợp Kim Brass (Cu-Zn) tổng hợp từ phản ứng hóa học kinh điển theo tỷ lệ mol bảo toàn nguyên tố GDPT 2018: Cu + Zn → Cu-Zn Alloy Solid Solution.",
    "relatedEquation": "Cu + Zn → Cu-Zn Alloy Solid Solution",
    "iupacName": "Brass Alloy Golem Complex",
    "archetype": "PETROCHEMICAL_REFINERY",
    "structuredEffects": [
      {
        "effectId": "B11_EFF_4",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "HEAL_LP",
            "params": {
              "amount": 400
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 400
            }
          }
        ],
        "description": "Phản ứng tổng hợp: Hồi 400 LP và gây 400 LP sát thương."
      }
    ],
    "synthesisRecipe": {
      "reactantFormulas": [
        {
          "formula": "Cu",
          "count": 1
        },
        {
          "formula": "Zn",
          "count": 1
        }
      ],
      "pedagogicalEquation": "Cu + Zn → Cu-Zn Alloy Solid Solution"
    }
  },
  {
    "id": "card_b11_005_fusion_bronze_ancient_relic_5",
    "name": "Đồng Điếu Bronze Phù Điêu — Hợp Chất Tổng Hợp Bậc 1",
    "name_en": "Bronze Ancient Relic — Synthesis Compound Mk-1",
    "cardType": "COMPOUND_MONSTER",
    "rarity": "ULTRA_RARE",
    "attribute": "TERRA",
    "manaCost": 8,
    "level": 9,
    "atk": 3440,
    "def": 3390,
    "chemicalFormula": "Cu-Sn",
    "effectCode": "COMP_B11_BRONZE_ANCIENT_RELIC_SYN_5",
    "effectText": "[Triệu hồi Hợp Chất / Fusion]: Cần kết hợp đúng nguyên liệu hóa học. Khi triệu hồi thành công: Phục hồi 400 LP cho bản thân và gây 400 LP sát thương phản ứng lên đối thủ.",
    "scientificLore": "Hợp chất Đồng Điếu Bronze Phù Điêu (Cu-Sn) tổng hợp từ phản ứng hóa học kinh điển theo tỷ lệ mol bảo toàn nguyên tố GDPT 2018: Cu + Sn → Bronze Crystalline Matrix.",
    "relatedEquation": "Cu + Sn → Bronze Crystalline Matrix",
    "iupacName": "Bronze Ancient Relic Complex",
    "archetype": "WERNER_COORDINATION",
    "structuredEffects": [
      {
        "effectId": "B11_EFF_5",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "HEAL_LP",
            "params": {
              "amount": 400
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 400
            }
          }
        ],
        "description": "Phản ứng tổng hợp: Hồi 400 LP và gây 400 LP sát thương."
      }
    ],
    "synthesisRecipe": {
      "reactantFormulas": [
        {
          "formula": "Cu",
          "count": 1
        },
        {
          "formula": "Sn",
          "count": 1
        }
      ],
      "pedagogicalEquation": "Cu + Sn → Bronze Crystalline Matrix"
    }
  },
  {
    "id": "card_b11_006_fusion_high_carbon_steel_titan_6",
    "name": "Thép Hợp Kim Carbon-Sắt — Hợp Chất Tổng Hợp Bậc 1",
    "name_en": "High Carbon Steel Titan — Synthesis Compound Mk-1",
    "cardType": "COMPOUND_MONSTER",
    "rarity": "SECRET_RARE",
    "attribute": "TERRA",
    "manaCost": 8,
    "level": 10,
    "atk": 3650,
    "def": 3300,
    "chemicalFormula": "Fe-C",
    "effectCode": "COMP_B11_HIGH_CARBON_STEEL_TITAN_SYN_6",
    "effectText": "[Triệu hồi Hợp Chất / Fusion]: Cần kết hợp đúng nguyên liệu hóa học. Khi triệu hồi thành công: Phục hồi 400 LP cho bản thân và gây 400 LP sát thương phản ứng lên đối thủ.",
    "scientificLore": "Hợp chất Thép Hợp Kim Carbon-Sắt (Fe-C) tổng hợp từ phản ứng hóa học kinh điển theo tỷ lệ mol bảo toàn nguyên tố GDPT 2018: Fe + C → Fe₃C Cementite Pearlite.",
    "relatedEquation": "Fe + C → Fe₃C Cementite Pearlite",
    "iupacName": "High Carbon Steel Titan Complex",
    "archetype": "PETROCHEMICAL_REFINERY",
    "structuredEffects": [
      {
        "effectId": "B11_EFF_6",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "HEAL_LP",
            "params": {
              "amount": 400
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 400
            }
          }
        ],
        "description": "Phản ứng tổng hợp: Hồi 400 LP và gây 400 LP sát thương."
      }
    ],
    "synthesisRecipe": {
      "reactantFormulas": [
        {
          "formula": "Fe",
          "count": 1
        },
        {
          "formula": "C",
          "count": 1
        }
      ],
      "pedagogicalEquation": "Fe + C → Fe₃C Cementite Pearlite"
    }
  },
  {
    "id": "card_b11_007_fusion_aspirin_pain_sovereign_7",
    "name": "Aspirin Axetylsalixylic — Hợp Chất Tổng Hợp Bậc 1",
    "name_en": "Aspirin Pain Sovereign — Synthesis Compound Mk-1",
    "cardType": "COMPOUND_MONSTER",
    "rarity": "COMMON",
    "attribute": "AQUA",
    "manaCost": 4,
    "level": 5,
    "atk": 2900,
    "def": 2610,
    "chemicalFormula": "C9H8O4",
    "effectCode": "COMP_B11_ASPIRIN_PAIN_SOVEREIGN_SYN_7",
    "effectText": "[Triệu hồi Hợp Chất / Fusion]: Cần kết hợp đúng nguyên liệu hóa học. Khi triệu hồi thành công: Phục hồi 400 LP cho bản thân và gây 400 LP sát thương phản ứng lên đối thủ.",
    "scientificLore": "Hợp chất Aspirin Axetylsalixylic (C9H8O4) tổng hợp từ phản ứng hóa học kinh điển theo tỷ lệ mol bảo toàn nguyên tố GDPT 2018: C₇H₆O₃ + C₄H₆O₃ → C₉H₈O₄ + CH₃COOH.",
    "relatedEquation": "C₇H₆O₃ + C₄H₆O₃ → C₉H₈O₄ + CH₃COOH",
    "iupacName": "Aspirin Pain Sovereign Complex",
    "archetype": "WERNER_COORDINATION",
    "structuredEffects": [
      {
        "effectId": "B11_EFF_7",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "HEAL_LP",
            "params": {
              "amount": 400
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 400
            }
          }
        ],
        "description": "Phản ứng tổng hợp: Hồi 400 LP và gây 400 LP sát thương."
      }
    ],
    "synthesisRecipe": {
      "reactantFormulas": [
        {
          "formula": "C7H6O3",
          "count": 1
        },
        {
          "formula": "C4H6O3",
          "count": 1
        }
      ],
      "pedagogicalEquation": "C₇H₆O₃ + C₄H₆O₃ → C₉H₈O₄ + CH₃COOH"
    }
  },
  {
    "id": "card_b11_008_fusion_saponified_stearate_colossus_8",
    "name": "Xà Phòng Natri Stearat — Hợp Chất Tổng Hợp Bậc 1",
    "name_en": "Saponified Stearate Colossus — Synthesis Compound Mk-1",
    "cardType": "COMPOUND_MONSTER",
    "rarity": "COMMON",
    "attribute": "TERRA",
    "manaCost": 5,
    "level": 6,
    "atk": 3110,
    "def": 2820,
    "chemicalFormula": "C17H35COONa",
    "effectCode": "COMP_B11_SAPONIFIED_STEARATE_COLOSSUS_SYN_8",
    "effectText": "[Triệu hồi Hợp Chất / Fusion]: Cần kết hợp đúng nguyên liệu hóa học. Khi triệu hồi thành công: Phục hồi 400 LP cho bản thân và gây 400 LP sát thương phản ứng lên đối thủ.",
    "scientificLore": "Hợp chất Xà Phòng Natri Stearat (C17H35COONa) tổng hợp từ phản ứng hóa học kinh điển theo tỷ lệ mol bảo toàn nguyên tố GDPT 2018: (C₁₇H₃₅COO)₃C₃H₅ + 3NaOH → 3C₁₇H₃₅COONa + C₃H₅(OH)₃.",
    "relatedEquation": "(C₁₇H₃₅COO)₃C₃H₅ + 3NaOH → 3C₁₇H₃₅COONa + C₃H₅(OH)₃",
    "iupacName": "Saponified Stearate Colossus Complex",
    "archetype": "PETROCHEMICAL_REFINERY",
    "structuredEffects": [
      {
        "effectId": "B11_EFF_8",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "HEAL_LP",
            "params": {
              "amount": 400
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 400
            }
          }
        ],
        "description": "Phản ứng tổng hợp: Hồi 400 LP và gây 400 LP sát thương."
      }
    ],
    "synthesisRecipe": {
      "reactantFormulas": [
        {
          "formula": "NaOH",
          "count": 3
        }
      ],
      "pedagogicalEquation": "(C₁₇H₃₅COO)₃C₃H₅ + 3NaOH → 3C₁₇H₃₅COONa + C₃H₅(OH)₃"
    }
  },
  {
    "id": "card_b11_009_fusion_black_powder_pyroflame_9",
    "name": "Thuốc Súng Đen Pháo Hoa — Hợp Chất Tổng Hợp Bậc 1",
    "name_en": "Black Powder Pyroflame — Synthesis Compound Mk-1",
    "cardType": "COMPOUND_MONSTER",
    "rarity": "COMMON",
    "attribute": "PYRO",
    "manaCost": 6,
    "level": 7,
    "atk": 3120,
    "def": 3030,
    "chemicalFormula": "KNO3-C-S",
    "effectCode": "COMP_B11_BLACK_POWDER_PYROFLAME_SYN_9",
    "effectText": "[Triệu hồi Hợp Chất / Fusion]: Cần kết hợp đúng nguyên liệu hóa học. Khi triệu hồi thành công: Phục hồi 400 LP cho bản thân và gây 400 LP sát thương phản ứng lên đối thủ.",
    "scientificLore": "Hợp chất Thuốc Súng Đen Pháo Hoa (KNO3-C-S) tổng hợp từ phản ứng hóa học kinh điển theo tỷ lệ mol bảo toàn nguyên tố GDPT 2018: 2KNO₃ + S + 3C → K₂S + N₂ + 3CO₂.",
    "relatedEquation": "2KNO₃ + S + 3C → K₂S + N₂ + 3CO₂",
    "iupacName": "Black Powder Pyroflame Complex",
    "archetype": "WERNER_COORDINATION",
    "structuredEffects": [
      {
        "effectId": "B11_EFF_9",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "HEAL_LP",
            "params": {
              "amount": 400
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 400
            }
          }
        ],
        "description": "Phản ứng tổng hợp: Hồi 400 LP và gây 400 LP sát thương."
      }
    ],
    "synthesisRecipe": {
      "reactantFormulas": [
        {
          "formula": "KNO3",
          "count": 2
        },
        {
          "formula": "S",
          "count": 1
        },
        {
          "formula": "C",
          "count": 3
        }
      ],
      "pedagogicalEquation": "2KNO₃ + S + 3C → K₂S + N₂ + 3CO₂"
    }
  },
  {
    "id": "card_b11_010_fusion_potash_alum_octahedron_10",
    "name": "Phèn Chua Kali Nhôm — Hợp Chất Tổng Hợp Bậc 1",
    "name_en": "Potash Alum Octahedron — Synthesis Compound Mk-1",
    "cardType": "COMPOUND_MONSTER",
    "rarity": "RARE",
    "attribute": "AQUA",
    "manaCost": 7,
    "level": 8,
    "atk": 3330,
    "def": 3240,
    "chemicalFormula": "KAl(SO4)2·12H2O",
    "effectCode": "COMP_B11_POTASH_ALUM_OCTAHEDRON_SYN_10",
    "effectText": "[Triệu hồi Hợp Chất / Fusion]: Cần kết hợp đúng nguyên liệu hóa học. Khi triệu hồi thành công: Phục hồi 400 LP cho bản thân và gây 400 LP sát thương phản ứng lên đối thủ.",
    "scientificLore": "Hợp chất Phèn Chua Kali Nhôm (KAl(SO4)2·12H2O) tổng hợp từ phản ứng hóa học kinh điển theo tỷ lệ mol bảo toàn nguyên tố GDPT 2018: K₂SO₄ + Al₂(SO₄)₃ + 24H₂O → 2KAl(SO₄)₂·12H₂O.",
    "relatedEquation": "K₂SO₄ + Al₂(SO₄)₃ + 24H₂O → 2KAl(SO₄)₂·12H₂O",
    "iupacName": "Potash Alum Octahedron Complex",
    "archetype": "PETROCHEMICAL_REFINERY",
    "structuredEffects": [
      {
        "effectId": "B11_EFF_10",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "HEAL_LP",
            "params": {
              "amount": 400
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 400
            }
          }
        ],
        "description": "Phản ứng tổng hợp: Hồi 400 LP và gây 400 LP sát thương."
      }
    ],
    "synthesisRecipe": {
      "reactantFormulas": [
        {
          "formula": "K2SO4",
          "count": 1
        },
        {
          "formula": "Al2",
          "count": 1
        },
        {
          "formula": "H2O",
          "count": 24
        }
      ],
      "pedagogicalEquation": "K₂SO₄ + Al₂(SO₄)₃ + 24H₂O → 2KAl(SO₄)₂·12H₂O"
    }
  },
  {
    "id": "card_b11_011_fusion_pure_water_crystal_11",
    "name": "Nước Tinh Khiết — Hợp Chất Tổng Hợp Bậc 2",
    "name_en": "Pure Water Crystal — Synthesis Compound Mk-2",
    "cardType": "COMPOUND_MONSTER",
    "rarity": "RARE",
    "attribute": "AQUA",
    "manaCost": 8,
    "level": 9,
    "atk": 3540,
    "def": 3150,
    "chemicalFormula": "H2O",
    "effectCode": "COMP_B11_PURE_WATER_CRYSTAL_SYN_11",
    "effectText": "[Triệu hồi Hợp Chất / Fusion]: Cần kết hợp đúng nguyên liệu hóa học. Khi triệu hồi thành công: Phục hồi 400 LP cho bản thân và gây 400 LP sát thương phản ứng lên đối thủ.",
    "scientificLore": "Hợp chất Nước Tinh Khiết (H2O) tổng hợp từ phản ứng hóa học kinh điển theo tỷ lệ mol bảo toàn nguyên tố GDPT 2018: 2H₂ + O₂ → 2H₂O.",
    "relatedEquation": "2H₂ + O₂ → 2H₂O",
    "iupacName": "Pure Water Crystal Complex",
    "archetype": "WERNER_COORDINATION",
    "structuredEffects": [
      {
        "effectId": "B11_EFF_11",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "HEAL_LP",
            "params": {
              "amount": 400
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 400
            }
          }
        ],
        "description": "Phản ứng tổng hợp: Hồi 400 LP và gây 400 LP sát thương."
      }
    ],
    "synthesisRecipe": {
      "reactantFormulas": [
        {
          "formula": "H2",
          "count": 2
        },
        {
          "formula": "O2",
          "count": 1
        }
      ],
      "pedagogicalEquation": "2H₂ + O₂ → 2H₂O"
    }
  },
  {
    "id": "card_b11_012_fusion_thermite_ignition_titan_12",
    "name": "Nhiệt Nhôm Thermite — Hợp Chất Tổng Hợp Bậc 2",
    "name_en": "Thermite Ignition Titan — Synthesis Compound Mk-2",
    "cardType": "COMPOUND_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "PYRO",
    "manaCost": 8,
    "level": 10,
    "atk": 3750,
    "def": 3360,
    "chemicalFormula": "Fe+Al2O3",
    "effectCode": "COMP_B11_THERMITE_IGNITION_TITAN_SYN_12",
    "effectText": "[Triệu hồi Hợp Chất / Fusion]: Cần kết hợp đúng nguyên liệu hóa học. Khi triệu hồi thành công: Phục hồi 400 LP cho bản thân và gây 400 LP sát thương phản ứng lên đối thủ.",
    "scientificLore": "Hợp chất Nhiệt Nhôm Thermite (Fe+Al2O3) tổng hợp từ phản ứng hóa học kinh điển theo tỷ lệ mol bảo toàn nguyên tố GDPT 2018: Fe₂O₃ + 2Al → 2Fe + Al₂O₃ (2500°C).",
    "relatedEquation": "Fe₂O₃ + 2Al → 2Fe + Al₂O₃ (2500°C)",
    "iupacName": "Thermite Ignition Titan Complex",
    "archetype": "PETROCHEMICAL_REFINERY",
    "structuredEffects": [
      {
        "effectId": "B11_EFF_12",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "HEAL_LP",
            "params": {
              "amount": 400
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 400
            }
          }
        ],
        "description": "Phản ứng tổng hợp: Hồi 400 LP và gây 400 LP sát thương."
      }
    ],
    "synthesisRecipe": {
      "reactantFormulas": [
        {
          "formula": "Fe2O3",
          "count": 1
        },
        {
          "formula": "Al",
          "count": 2
        }
      ],
      "pedagogicalEquation": "Fe₂O₃ + 2Al → 2Fe + Al₂O₃ (2500°C)",
      "requiredCondition": "HIGH_TEMP"
    }
  },
  {
    "id": "card_b11_013_fusion_aqua_regia_sovereign_13",
    "name": "Nước Cường Toan Aqua Regia — Hợp Chất Tổng Hợp Bậc 2",
    "name_en": "Aqua Regia Sovereign — Synthesis Compound Mk-2",
    "cardType": "COMPOUND_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "ACID_DARK",
    "manaCost": 4,
    "level": 5,
    "atk": 2800,
    "def": 2670,
    "chemicalFormula": "HNO3·3HCl",
    "effectCode": "COMP_B11_AQUA_REGIA_SOVEREIGN_SYN_13",
    "effectText": "[Triệu hồi Hợp Chất / Fusion]: Cần kết hợp đúng nguyên liệu hóa học. Khi triệu hồi thành công: Phục hồi 400 LP cho bản thân và gây 400 LP sát thương phản ứng lên đối thủ.",
    "scientificLore": "Hợp chất Nước Cường Toan Aqua Regia (HNO3·3HCl) tổng hợp từ phản ứng hóa học kinh điển theo tỷ lệ mol bảo toàn nguyên tố GDPT 2018: Au + 3HNO₃ + 4HCl → HAuCl₄ + 3NO₂ + 3H₂O.",
    "relatedEquation": "Au + 3HNO₃ + 4HCl → HAuCl₄ + 3NO₂ + 3H₂O",
    "iupacName": "Aqua Regia Sovereign Complex",
    "archetype": "WERNER_COORDINATION",
    "structuredEffects": [
      {
        "effectId": "B11_EFF_13",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "HEAL_LP",
            "params": {
              "amount": 400
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 400
            }
          }
        ],
        "description": "Phản ứng tổng hợp: Hồi 400 LP và gây 400 LP sát thương."
      }
    ],
    "synthesisRecipe": {
      "reactantFormulas": [
        {
          "formula": "Au",
          "count": 1
        },
        {
          "formula": "HNO3",
          "count": 3
        },
        {
          "formula": "HCl",
          "count": 4
        }
      ],
      "pedagogicalEquation": "Au + 3HNO₃ + 4HCl → HAuCl₄ + 3NO₂ + 3H₂O"
    }
  },
  {
    "id": "card_b11_014_fusion_brass_alloy_golem_14",
    "name": "Đồng Thau Hợp Kim Brass — Hợp Chất Tổng Hợp Bậc 2",
    "name_en": "Brass Alloy Golem — Synthesis Compound Mk-2",
    "cardType": "COMPOUND_MONSTER",
    "rarity": "ULTRA_RARE",
    "attribute": "TERRA",
    "manaCost": 5,
    "level": 6,
    "atk": 3010,
    "def": 2880,
    "chemicalFormula": "Cu-Zn",
    "effectCode": "COMP_B11_BRASS_ALLOY_GOLEM_SYN_14",
    "effectText": "[Triệu hồi Hợp Chất / Fusion]: Cần kết hợp đúng nguyên liệu hóa học. Khi triệu hồi thành công: Phục hồi 400 LP cho bản thân và gây 400 LP sát thương phản ứng lên đối thủ.",
    "scientificLore": "Hợp chất Đồng Thau Hợp Kim Brass (Cu-Zn) tổng hợp từ phản ứng hóa học kinh điển theo tỷ lệ mol bảo toàn nguyên tố GDPT 2018: Cu + Zn → Cu-Zn Alloy Solid Solution.",
    "relatedEquation": "Cu + Zn → Cu-Zn Alloy Solid Solution",
    "iupacName": "Brass Alloy Golem Complex",
    "archetype": "PETROCHEMICAL_REFINERY",
    "structuredEffects": [
      {
        "effectId": "B11_EFF_14",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "HEAL_LP",
            "params": {
              "amount": 400
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 400
            }
          }
        ],
        "description": "Phản ứng tổng hợp: Hồi 400 LP và gây 400 LP sát thương."
      }
    ],
    "synthesisRecipe": {
      "reactantFormulas": [
        {
          "formula": "Cu",
          "count": 1
        },
        {
          "formula": "Zn",
          "count": 1
        }
      ],
      "pedagogicalEquation": "Cu + Zn → Cu-Zn Alloy Solid Solution"
    }
  },
  {
    "id": "card_b11_015_fusion_bronze_ancient_relic_15",
    "name": "Đồng Điếu Bronze Phù Điêu — Hợp Chất Tổng Hợp Bậc 2",
    "name_en": "Bronze Ancient Relic — Synthesis Compound Mk-2",
    "cardType": "COMPOUND_MONSTER",
    "rarity": "SECRET_RARE",
    "attribute": "TERRA",
    "manaCost": 6,
    "level": 7,
    "atk": 3220,
    "def": 3090,
    "chemicalFormula": "Cu-Sn",
    "effectCode": "COMP_B11_BRONZE_ANCIENT_RELIC_SYN_15",
    "effectText": "[Triệu hồi Hợp Chất / Fusion]: Cần kết hợp đúng nguyên liệu hóa học. Khi triệu hồi thành công: Phục hồi 400 LP cho bản thân và gây 400 LP sát thương phản ứng lên đối thủ.",
    "scientificLore": "Hợp chất Đồng Điếu Bronze Phù Điêu (Cu-Sn) tổng hợp từ phản ứng hóa học kinh điển theo tỷ lệ mol bảo toàn nguyên tố GDPT 2018: Cu + Sn → Bronze Crystalline Matrix.",
    "relatedEquation": "Cu + Sn → Bronze Crystalline Matrix",
    "iupacName": "Bronze Ancient Relic Complex",
    "archetype": "WERNER_COORDINATION",
    "structuredEffects": [
      {
        "effectId": "B11_EFF_15",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "HEAL_LP",
            "params": {
              "amount": 400
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 400
            }
          }
        ],
        "description": "Phản ứng tổng hợp: Hồi 400 LP và gây 400 LP sát thương."
      }
    ],
    "synthesisRecipe": {
      "reactantFormulas": [
        {
          "formula": "Cu",
          "count": 1
        },
        {
          "formula": "Sn",
          "count": 1
        }
      ],
      "pedagogicalEquation": "Cu + Sn → Bronze Crystalline Matrix"
    }
  },
  {
    "id": "card_b11_016_fusion_high_carbon_steel_titan_16",
    "name": "Thép Hợp Kim Carbon-Sắt — Hợp Chất Tổng Hợp Bậc 2",
    "name_en": "High Carbon Steel Titan — Synthesis Compound Mk-2",
    "cardType": "COMPOUND_MONSTER",
    "rarity": "COMMON",
    "attribute": "TERRA",
    "manaCost": 7,
    "level": 8,
    "atk": 3430,
    "def": 3000,
    "chemicalFormula": "Fe-C",
    "effectCode": "COMP_B11_HIGH_CARBON_STEEL_TITAN_SYN_16",
    "effectText": "[Triệu hồi Hợp Chất / Fusion]: Cần kết hợp đúng nguyên liệu hóa học. Khi triệu hồi thành công: Phục hồi 400 LP cho bản thân và gây 400 LP sát thương phản ứng lên đối thủ.",
    "scientificLore": "Hợp chất Thép Hợp Kim Carbon-Sắt (Fe-C) tổng hợp từ phản ứng hóa học kinh điển theo tỷ lệ mol bảo toàn nguyên tố GDPT 2018: Fe + C → Fe₃C Cementite Pearlite.",
    "relatedEquation": "Fe + C → Fe₃C Cementite Pearlite",
    "iupacName": "High Carbon Steel Titan Complex",
    "archetype": "PETROCHEMICAL_REFINERY",
    "structuredEffects": [
      {
        "effectId": "B11_EFF_16",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "HEAL_LP",
            "params": {
              "amount": 400
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 400
            }
          }
        ],
        "description": "Phản ứng tổng hợp: Hồi 400 LP và gây 400 LP sát thương."
      }
    ],
    "synthesisRecipe": {
      "reactantFormulas": [
        {
          "formula": "Fe",
          "count": 1
        },
        {
          "formula": "C",
          "count": 1
        }
      ],
      "pedagogicalEquation": "Fe + C → Fe₃C Cementite Pearlite"
    }
  },
  {
    "id": "card_b11_017_fusion_aspirin_pain_sovereign_17",
    "name": "Aspirin Axetylsalixylic — Hợp Chất Tổng Hợp Bậc 2",
    "name_en": "Aspirin Pain Sovereign — Synthesis Compound Mk-2",
    "cardType": "COMPOUND_MONSTER",
    "rarity": "COMMON",
    "attribute": "AQUA",
    "manaCost": 8,
    "level": 9,
    "atk": 3440,
    "def": 3210,
    "chemicalFormula": "C9H8O4",
    "effectCode": "COMP_B11_ASPIRIN_PAIN_SOVEREIGN_SYN_17",
    "effectText": "[Triệu hồi Hợp Chất / Fusion]: Cần kết hợp đúng nguyên liệu hóa học. Khi triệu hồi thành công: Phục hồi 400 LP cho bản thân và gây 400 LP sát thương phản ứng lên đối thủ.",
    "scientificLore": "Hợp chất Aspirin Axetylsalixylic (C9H8O4) tổng hợp từ phản ứng hóa học kinh điển theo tỷ lệ mol bảo toàn nguyên tố GDPT 2018: C₇H₆O₃ + C₄H₆O₃ → C₉H₈O₄ + CH₃COOH.",
    "relatedEquation": "C₇H₆O₃ + C₄H₆O₃ → C₉H₈O₄ + CH₃COOH",
    "iupacName": "Aspirin Pain Sovereign Complex",
    "archetype": "WERNER_COORDINATION",
    "structuredEffects": [
      {
        "effectId": "B11_EFF_17",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "HEAL_LP",
            "params": {
              "amount": 400
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 400
            }
          }
        ],
        "description": "Phản ứng tổng hợp: Hồi 400 LP và gây 400 LP sát thương."
      }
    ],
    "synthesisRecipe": {
      "reactantFormulas": [
        {
          "formula": "C7H6O3",
          "count": 1
        },
        {
          "formula": "C4H6O3",
          "count": 1
        }
      ],
      "pedagogicalEquation": "C₇H₆O₃ + C₄H₆O₃ → C₉H₈O₄ + CH₃COOH"
    }
  },
  {
    "id": "card_b11_018_fusion_saponified_stearate_colossus_18",
    "name": "Xà Phòng Natri Stearat — Hợp Chất Tổng Hợp Bậc 2",
    "name_en": "Saponified Stearate Colossus — Synthesis Compound Mk-2",
    "cardType": "COMPOUND_MONSTER",
    "rarity": "COMMON",
    "attribute": "TERRA",
    "manaCost": 8,
    "level": 10,
    "atk": 3650,
    "def": 3420,
    "chemicalFormula": "C17H35COONa",
    "effectCode": "COMP_B11_SAPONIFIED_STEARATE_COLOSSUS_SYN_18",
    "effectText": "[Triệu hồi Hợp Chất / Fusion]: Cần kết hợp đúng nguyên liệu hóa học. Khi triệu hồi thành công: Phục hồi 400 LP cho bản thân và gây 400 LP sát thương phản ứng lên đối thủ.",
    "scientificLore": "Hợp chất Xà Phòng Natri Stearat (C17H35COONa) tổng hợp từ phản ứng hóa học kinh điển theo tỷ lệ mol bảo toàn nguyên tố GDPT 2018: (C₁₇H₃₅COO)₃C₃H₅ + 3NaOH → 3C₁₇H₃₅COONa + C₃H₅(OH)₃.",
    "relatedEquation": "(C₁₇H₃₅COO)₃C₃H₅ + 3NaOH → 3C₁₇H₃₅COONa + C₃H₅(OH)₃",
    "iupacName": "Saponified Stearate Colossus Complex",
    "archetype": "PETROCHEMICAL_REFINERY",
    "structuredEffects": [
      {
        "effectId": "B11_EFF_18",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "HEAL_LP",
            "params": {
              "amount": 400
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 400
            }
          }
        ],
        "description": "Phản ứng tổng hợp: Hồi 400 LP và gây 400 LP sát thương."
      }
    ],
    "synthesisRecipe": {
      "reactantFormulas": [
        {
          "formula": "NaOH",
          "count": 3
        }
      ],
      "pedagogicalEquation": "(C₁₇H₃₅COO)₃C₃H₅ + 3NaOH → 3C₁₇H₃₅COONa + C₃H₅(OH)₃"
    }
  },
  {
    "id": "card_b11_019_fusion_black_powder_pyroflame_19",
    "name": "Thuốc Súng Đen Pháo Hoa — Hợp Chất Tổng Hợp Bậc 2",
    "name_en": "Black Powder Pyroflame — Synthesis Compound Mk-2",
    "cardType": "COMPOUND_MONSTER",
    "rarity": "RARE",
    "attribute": "PYRO",
    "manaCost": 4,
    "level": 5,
    "atk": 2900,
    "def": 2730,
    "chemicalFormula": "KNO3-C-S",
    "effectCode": "COMP_B11_BLACK_POWDER_PYROFLAME_SYN_19",
    "effectText": "[Triệu hồi Hợp Chất / Fusion]: Cần kết hợp đúng nguyên liệu hóa học. Khi triệu hồi thành công: Phục hồi 400 LP cho bản thân và gây 400 LP sát thương phản ứng lên đối thủ.",
    "scientificLore": "Hợp chất Thuốc Súng Đen Pháo Hoa (KNO3-C-S) tổng hợp từ phản ứng hóa học kinh điển theo tỷ lệ mol bảo toàn nguyên tố GDPT 2018: 2KNO₃ + S + 3C → K₂S + N₂ + 3CO₂.",
    "relatedEquation": "2KNO₃ + S + 3C → K₂S + N₂ + 3CO₂",
    "iupacName": "Black Powder Pyroflame Complex",
    "archetype": "WERNER_COORDINATION",
    "structuredEffects": [
      {
        "effectId": "B11_EFF_19",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "HEAL_LP",
            "params": {
              "amount": 400
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 400
            }
          }
        ],
        "description": "Phản ứng tổng hợp: Hồi 400 LP và gây 400 LP sát thương."
      }
    ],
    "synthesisRecipe": {
      "reactantFormulas": [
        {
          "formula": "KNO3",
          "count": 2
        },
        {
          "formula": "S",
          "count": 1
        },
        {
          "formula": "C",
          "count": 3
        }
      ],
      "pedagogicalEquation": "2KNO₃ + S + 3C → K₂S + N₂ + 3CO₂"
    }
  },
  {
    "id": "card_b11_020_fusion_potash_alum_octahedron_20",
    "name": "Phèn Chua Kali Nhôm — Hợp Chất Tổng Hợp Bậc 2",
    "name_en": "Potash Alum Octahedron — Synthesis Compound Mk-2",
    "cardType": "COMPOUND_MONSTER",
    "rarity": "RARE",
    "attribute": "AQUA",
    "manaCost": 5,
    "level": 6,
    "atk": 3110,
    "def": 2940,
    "chemicalFormula": "KAl(SO4)2·12H2O",
    "effectCode": "COMP_B11_POTASH_ALUM_OCTAHEDRON_SYN_20",
    "effectText": "[Triệu hồi Hợp Chất / Fusion]: Cần kết hợp đúng nguyên liệu hóa học. Khi triệu hồi thành công: Phục hồi 400 LP cho bản thân và gây 400 LP sát thương phản ứng lên đối thủ.",
    "scientificLore": "Hợp chất Phèn Chua Kali Nhôm (KAl(SO4)2·12H2O) tổng hợp từ phản ứng hóa học kinh điển theo tỷ lệ mol bảo toàn nguyên tố GDPT 2018: K₂SO₄ + Al₂(SO₄)₃ + 24H₂O → 2KAl(SO₄)₂·12H₂O.",
    "relatedEquation": "K₂SO₄ + Al₂(SO₄)₃ + 24H₂O → 2KAl(SO₄)₂·12H₂O",
    "iupacName": "Potash Alum Octahedron Complex",
    "archetype": "PETROCHEMICAL_REFINERY",
    "structuredEffects": [
      {
        "effectId": "B11_EFF_20",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "HEAL_LP",
            "params": {
              "amount": 400
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 400
            }
          }
        ],
        "description": "Phản ứng tổng hợp: Hồi 400 LP và gây 400 LP sát thương."
      }
    ],
    "synthesisRecipe": {
      "reactantFormulas": [
        {
          "formula": "K2SO4",
          "count": 1
        },
        {
          "formula": "Al2",
          "count": 1
        },
        {
          "formula": "H2O",
          "count": 24
        }
      ],
      "pedagogicalEquation": "K₂SO₄ + Al₂(SO₄)₃ + 24H₂O → 2KAl(SO₄)₂·12H₂O"
    }
  },
  {
    "id": "card_b11_021_fusion_pure_water_crystal_21",
    "name": "Nước Tinh Khiết — Hợp Chất Tổng Hợp Bậc 3",
    "name_en": "Pure Water Crystal — Synthesis Compound Mk-3",
    "cardType": "COMPOUND_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "AQUA",
    "manaCost": 6,
    "level": 7,
    "atk": 3120,
    "def": 2850,
    "chemicalFormula": "H2O",
    "effectCode": "COMP_B11_PURE_WATER_CRYSTAL_SYN_21",
    "effectText": "[Triệu hồi Hợp Chất / Fusion]: Cần kết hợp đúng nguyên liệu hóa học. Khi triệu hồi thành công: Phục hồi 400 LP cho bản thân và gây 400 LP sát thương phản ứng lên đối thủ.",
    "scientificLore": "Hợp chất Nước Tinh Khiết (H2O) tổng hợp từ phản ứng hóa học kinh điển theo tỷ lệ mol bảo toàn nguyên tố GDPT 2018: 2H₂ + O₂ → 2H₂O.",
    "relatedEquation": "2H₂ + O₂ → 2H₂O",
    "iupacName": "Pure Water Crystal Complex",
    "archetype": "WERNER_COORDINATION",
    "structuredEffects": [
      {
        "effectId": "B11_EFF_21",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "HEAL_LP",
            "params": {
              "amount": 400
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 400
            }
          }
        ],
        "description": "Phản ứng tổng hợp: Hồi 400 LP và gây 400 LP sát thương."
      }
    ],
    "synthesisRecipe": {
      "reactantFormulas": [
        {
          "formula": "H2",
          "count": 2
        },
        {
          "formula": "O2",
          "count": 1
        }
      ],
      "pedagogicalEquation": "2H₂ + O₂ → 2H₂O"
    }
  },
  {
    "id": "card_b11_022_fusion_thermite_ignition_titan_22",
    "name": "Nhiệt Nhôm Thermite — Hợp Chất Tổng Hợp Bậc 3",
    "name_en": "Thermite Ignition Titan — Synthesis Compound Mk-3",
    "cardType": "COMPOUND_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "PYRO",
    "manaCost": 7,
    "level": 8,
    "atk": 3330,
    "def": 3060,
    "chemicalFormula": "Fe+Al2O3",
    "effectCode": "COMP_B11_THERMITE_IGNITION_TITAN_SYN_22",
    "effectText": "[Triệu hồi Hợp Chất / Fusion]: Cần kết hợp đúng nguyên liệu hóa học. Khi triệu hồi thành công: Phục hồi 400 LP cho bản thân và gây 400 LP sát thương phản ứng lên đối thủ.",
    "scientificLore": "Hợp chất Nhiệt Nhôm Thermite (Fe+Al2O3) tổng hợp từ phản ứng hóa học kinh điển theo tỷ lệ mol bảo toàn nguyên tố GDPT 2018: Fe₂O₃ + 2Al → 2Fe + Al₂O₃ (2500°C).",
    "relatedEquation": "Fe₂O₃ + 2Al → 2Fe + Al₂O₃ (2500°C)",
    "iupacName": "Thermite Ignition Titan Complex",
    "archetype": "PETROCHEMICAL_REFINERY",
    "structuredEffects": [
      {
        "effectId": "B11_EFF_22",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "HEAL_LP",
            "params": {
              "amount": 400
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 400
            }
          }
        ],
        "description": "Phản ứng tổng hợp: Hồi 400 LP và gây 400 LP sát thương."
      }
    ],
    "synthesisRecipe": {
      "reactantFormulas": [
        {
          "formula": "Fe2O3",
          "count": 1
        },
        {
          "formula": "Al",
          "count": 2
        }
      ],
      "pedagogicalEquation": "Fe₂O₃ + 2Al → 2Fe + Al₂O₃ (2500°C)",
      "requiredCondition": "HIGH_TEMP"
    }
  },
  {
    "id": "card_b11_023_fusion_aqua_regia_sovereign_23",
    "name": "Nước Cường Toan Aqua Regia — Hợp Chất Tổng Hợp Bậc 3",
    "name_en": "Aqua Regia Sovereign — Synthesis Compound Mk-3",
    "cardType": "COMPOUND_MONSTER",
    "rarity": "ULTRA_RARE",
    "attribute": "ACID_DARK",
    "manaCost": 8,
    "level": 9,
    "atk": 3540,
    "def": 3270,
    "chemicalFormula": "HNO3·3HCl",
    "effectCode": "COMP_B11_AQUA_REGIA_SOVEREIGN_SYN_23",
    "effectText": "[Triệu hồi Hợp Chất / Fusion]: Cần kết hợp đúng nguyên liệu hóa học. Khi triệu hồi thành công: Phục hồi 400 LP cho bản thân và gây 400 LP sát thương phản ứng lên đối thủ.",
    "scientificLore": "Hợp chất Nước Cường Toan Aqua Regia (HNO3·3HCl) tổng hợp từ phản ứng hóa học kinh điển theo tỷ lệ mol bảo toàn nguyên tố GDPT 2018: Au + 3HNO₃ + 4HCl → HAuCl₄ + 3NO₂ + 3H₂O.",
    "relatedEquation": "Au + 3HNO₃ + 4HCl → HAuCl₄ + 3NO₂ + 3H₂O",
    "iupacName": "Aqua Regia Sovereign Complex",
    "archetype": "WERNER_COORDINATION",
    "structuredEffects": [
      {
        "effectId": "B11_EFF_23",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "HEAL_LP",
            "params": {
              "amount": 400
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 400
            }
          }
        ],
        "description": "Phản ứng tổng hợp: Hồi 400 LP và gây 400 LP sát thương."
      }
    ],
    "synthesisRecipe": {
      "reactantFormulas": [
        {
          "formula": "Au",
          "count": 1
        },
        {
          "formula": "HNO3",
          "count": 3
        },
        {
          "formula": "HCl",
          "count": 4
        }
      ],
      "pedagogicalEquation": "Au + 3HNO₃ + 4HCl → HAuCl₄ + 3NO₂ + 3H₂O"
    }
  },
  {
    "id": "card_b11_024_fusion_brass_alloy_golem_24",
    "name": "Đồng Thau Hợp Kim Brass — Hợp Chất Tổng Hợp Bậc 3",
    "name_en": "Brass Alloy Golem — Synthesis Compound Mk-3",
    "cardType": "COMPOUND_MONSTER",
    "rarity": "SECRET_RARE",
    "attribute": "TERRA",
    "manaCost": 8,
    "level": 10,
    "atk": 3750,
    "def": 3480,
    "chemicalFormula": "Cu-Zn",
    "effectCode": "COMP_B11_BRASS_ALLOY_GOLEM_SYN_24",
    "effectText": "[Triệu hồi Hợp Chất / Fusion]: Cần kết hợp đúng nguyên liệu hóa học. Khi triệu hồi thành công: Phục hồi 400 LP cho bản thân và gây 400 LP sát thương phản ứng lên đối thủ.",
    "scientificLore": "Hợp chất Đồng Thau Hợp Kim Brass (Cu-Zn) tổng hợp từ phản ứng hóa học kinh điển theo tỷ lệ mol bảo toàn nguyên tố GDPT 2018: Cu + Zn → Cu-Zn Alloy Solid Solution.",
    "relatedEquation": "Cu + Zn → Cu-Zn Alloy Solid Solution",
    "iupacName": "Brass Alloy Golem Complex",
    "archetype": "PETROCHEMICAL_REFINERY",
    "structuredEffects": [
      {
        "effectId": "B11_EFF_24",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "HEAL_LP",
            "params": {
              "amount": 400
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 400
            }
          }
        ],
        "description": "Phản ứng tổng hợp: Hồi 400 LP và gây 400 LP sát thương."
      }
    ],
    "synthesisRecipe": {
      "reactantFormulas": [
        {
          "formula": "Cu",
          "count": 1
        },
        {
          "formula": "Zn",
          "count": 1
        }
      ],
      "pedagogicalEquation": "Cu + Zn → Cu-Zn Alloy Solid Solution"
    }
  },
  {
    "id": "card_b11_025_fusion_bronze_ancient_relic_25",
    "name": "Đồng Điếu Bronze Phù Điêu — Hợp Chất Tổng Hợp Bậc 3",
    "name_en": "Bronze Ancient Relic — Synthesis Compound Mk-3",
    "cardType": "COMPOUND_MONSTER",
    "rarity": "COMMON",
    "attribute": "TERRA",
    "manaCost": 4,
    "level": 5,
    "atk": 2800,
    "def": 2790,
    "chemicalFormula": "Cu-Sn",
    "effectCode": "COMP_B11_BRONZE_ANCIENT_RELIC_SYN_25",
    "effectText": "[Triệu hồi Hợp Chất / Fusion]: Cần kết hợp đúng nguyên liệu hóa học. Khi triệu hồi thành công: Phục hồi 400 LP cho bản thân và gây 400 LP sát thương phản ứng lên đối thủ.",
    "scientificLore": "Hợp chất Đồng Điếu Bronze Phù Điêu (Cu-Sn) tổng hợp từ phản ứng hóa học kinh điển theo tỷ lệ mol bảo toàn nguyên tố GDPT 2018: Cu + Sn → Bronze Crystalline Matrix.",
    "relatedEquation": "Cu + Sn → Bronze Crystalline Matrix",
    "iupacName": "Bronze Ancient Relic Complex",
    "archetype": "WERNER_COORDINATION",
    "structuredEffects": [
      {
        "effectId": "B11_EFF_25",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "HEAL_LP",
            "params": {
              "amount": 400
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 400
            }
          }
        ],
        "description": "Phản ứng tổng hợp: Hồi 400 LP và gây 400 LP sát thương."
      }
    ],
    "synthesisRecipe": {
      "reactantFormulas": [
        {
          "formula": "Cu",
          "count": 1
        },
        {
          "formula": "Sn",
          "count": 1
        }
      ],
      "pedagogicalEquation": "Cu + Sn → Bronze Crystalline Matrix"
    }
  },
  {
    "id": "card_b11_026_fusion_high_carbon_steel_titan_26",
    "name": "Thép Hợp Kim Carbon-Sắt — Hợp Chất Tổng Hợp Bậc 3",
    "name_en": "High Carbon Steel Titan — Synthesis Compound Mk-3",
    "cardType": "COMPOUND_MONSTER",
    "rarity": "COMMON",
    "attribute": "TERRA",
    "manaCost": 5,
    "level": 6,
    "atk": 3010,
    "def": 2700,
    "chemicalFormula": "Fe-C",
    "effectCode": "COMP_B11_HIGH_CARBON_STEEL_TITAN_SYN_26",
    "effectText": "[Triệu hồi Hợp Chất / Fusion]: Cần kết hợp đúng nguyên liệu hóa học. Khi triệu hồi thành công: Phục hồi 400 LP cho bản thân và gây 400 LP sát thương phản ứng lên đối thủ.",
    "scientificLore": "Hợp chất Thép Hợp Kim Carbon-Sắt (Fe-C) tổng hợp từ phản ứng hóa học kinh điển theo tỷ lệ mol bảo toàn nguyên tố GDPT 2018: Fe + C → Fe₃C Cementite Pearlite.",
    "relatedEquation": "Fe + C → Fe₃C Cementite Pearlite",
    "iupacName": "High Carbon Steel Titan Complex",
    "archetype": "PETROCHEMICAL_REFINERY",
    "structuredEffects": [
      {
        "effectId": "B11_EFF_26",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "HEAL_LP",
            "params": {
              "amount": 400
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 400
            }
          }
        ],
        "description": "Phản ứng tổng hợp: Hồi 400 LP và gây 400 LP sát thương."
      }
    ],
    "synthesisRecipe": {
      "reactantFormulas": [
        {
          "formula": "Fe",
          "count": 1
        },
        {
          "formula": "C",
          "count": 1
        }
      ],
      "pedagogicalEquation": "Fe + C → Fe₃C Cementite Pearlite"
    }
  },
  {
    "id": "card_b11_027_fusion_aspirin_pain_sovereign_27",
    "name": "Aspirin Axetylsalixylic — Hợp Chất Tổng Hợp Bậc 3",
    "name_en": "Aspirin Pain Sovereign — Synthesis Compound Mk-3",
    "cardType": "COMPOUND_MONSTER",
    "rarity": "COMMON",
    "attribute": "AQUA",
    "manaCost": 6,
    "level": 7,
    "atk": 3220,
    "def": 2910,
    "chemicalFormula": "C9H8O4",
    "effectCode": "COMP_B11_ASPIRIN_PAIN_SOVEREIGN_SYN_27",
    "effectText": "[Triệu hồi Hợp Chất / Fusion]: Cần kết hợp đúng nguyên liệu hóa học. Khi triệu hồi thành công: Phục hồi 400 LP cho bản thân và gây 400 LP sát thương phản ứng lên đối thủ.",
    "scientificLore": "Hợp chất Aspirin Axetylsalixylic (C9H8O4) tổng hợp từ phản ứng hóa học kinh điển theo tỷ lệ mol bảo toàn nguyên tố GDPT 2018: C₇H₆O₃ + C₄H₆O₃ → C₉H₈O₄ + CH₃COOH.",
    "relatedEquation": "C₇H₆O₃ + C₄H₆O₃ → C₉H₈O₄ + CH₃COOH",
    "iupacName": "Aspirin Pain Sovereign Complex",
    "archetype": "WERNER_COORDINATION",
    "structuredEffects": [
      {
        "effectId": "B11_EFF_27",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "HEAL_LP",
            "params": {
              "amount": 400
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 400
            }
          }
        ],
        "description": "Phản ứng tổng hợp: Hồi 400 LP và gây 400 LP sát thương."
      }
    ],
    "synthesisRecipe": {
      "reactantFormulas": [
        {
          "formula": "C7H6O3",
          "count": 1
        },
        {
          "formula": "C4H6O3",
          "count": 1
        }
      ],
      "pedagogicalEquation": "C₇H₆O₃ + C₄H₆O₃ → C₉H₈O₄ + CH₃COOH"
    }
  },
  {
    "id": "card_b11_028_fusion_saponified_stearate_colossus_28",
    "name": "Xà Phòng Natri Stearat — Hợp Chất Tổng Hợp Bậc 3",
    "name_en": "Saponified Stearate Colossus — Synthesis Compound Mk-3",
    "cardType": "COMPOUND_MONSTER",
    "rarity": "RARE",
    "attribute": "TERRA",
    "manaCost": 7,
    "level": 8,
    "atk": 3430,
    "def": 3120,
    "chemicalFormula": "C17H35COONa",
    "effectCode": "COMP_B11_SAPONIFIED_STEARATE_COLOSSUS_SYN_28",
    "effectText": "[Triệu hồi Hợp Chất / Fusion]: Cần kết hợp đúng nguyên liệu hóa học. Khi triệu hồi thành công: Phục hồi 400 LP cho bản thân và gây 400 LP sát thương phản ứng lên đối thủ.",
    "scientificLore": "Hợp chất Xà Phòng Natri Stearat (C17H35COONa) tổng hợp từ phản ứng hóa học kinh điển theo tỷ lệ mol bảo toàn nguyên tố GDPT 2018: (C₁₇H₃₅COO)₃C₃H₅ + 3NaOH → 3C₁₇H₃₅COONa + C₃H₅(OH)₃.",
    "relatedEquation": "(C₁₇H₃₅COO)₃C₃H₅ + 3NaOH → 3C₁₇H₃₅COONa + C₃H₅(OH)₃",
    "iupacName": "Saponified Stearate Colossus Complex",
    "archetype": "PETROCHEMICAL_REFINERY",
    "structuredEffects": [
      {
        "effectId": "B11_EFF_28",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "HEAL_LP",
            "params": {
              "amount": 400
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 400
            }
          }
        ],
        "description": "Phản ứng tổng hợp: Hồi 400 LP và gây 400 LP sát thương."
      }
    ],
    "synthesisRecipe": {
      "reactantFormulas": [
        {
          "formula": "NaOH",
          "count": 3
        }
      ],
      "pedagogicalEquation": "(C₁₇H₃₅COO)₃C₃H₅ + 3NaOH → 3C₁₇H₃₅COONa + C₃H₅(OH)₃"
    }
  },
  {
    "id": "card_b11_029_fusion_black_powder_pyroflame_29",
    "name": "Thuốc Súng Đen Pháo Hoa — Hợp Chất Tổng Hợp Bậc 3",
    "name_en": "Black Powder Pyroflame — Synthesis Compound Mk-3",
    "cardType": "COMPOUND_MONSTER",
    "rarity": "RARE",
    "attribute": "PYRO",
    "manaCost": 8,
    "level": 9,
    "atk": 3440,
    "def": 3330,
    "chemicalFormula": "KNO3-C-S",
    "effectCode": "COMP_B11_BLACK_POWDER_PYROFLAME_SYN_29",
    "effectText": "[Triệu hồi Hợp Chất / Fusion]: Cần kết hợp đúng nguyên liệu hóa học. Khi triệu hồi thành công: Phục hồi 400 LP cho bản thân và gây 400 LP sát thương phản ứng lên đối thủ.",
    "scientificLore": "Hợp chất Thuốc Súng Đen Pháo Hoa (KNO3-C-S) tổng hợp từ phản ứng hóa học kinh điển theo tỷ lệ mol bảo toàn nguyên tố GDPT 2018: 2KNO₃ + S + 3C → K₂S + N₂ + 3CO₂.",
    "relatedEquation": "2KNO₃ + S + 3C → K₂S + N₂ + 3CO₂",
    "iupacName": "Black Powder Pyroflame Complex",
    "archetype": "WERNER_COORDINATION",
    "structuredEffects": [
      {
        "effectId": "B11_EFF_29",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "HEAL_LP",
            "params": {
              "amount": 400
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 400
            }
          }
        ],
        "description": "Phản ứng tổng hợp: Hồi 400 LP và gây 400 LP sát thương."
      }
    ],
    "synthesisRecipe": {
      "reactantFormulas": [
        {
          "formula": "KNO3",
          "count": 2
        },
        {
          "formula": "S",
          "count": 1
        },
        {
          "formula": "C",
          "count": 3
        }
      ],
      "pedagogicalEquation": "2KNO₃ + S + 3C → K₂S + N₂ + 3CO₂"
    }
  },
  {
    "id": "card_b11_030_fusion_potash_alum_octahedron_30",
    "name": "Phèn Chua Kali Nhôm — Hợp Chất Tổng Hợp Bậc 3",
    "name_en": "Potash Alum Octahedron — Synthesis Compound Mk-3",
    "cardType": "COMPOUND_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "AQUA",
    "manaCost": 8,
    "level": 10,
    "atk": 3650,
    "def": 3540,
    "chemicalFormula": "KAl(SO4)2·12H2O",
    "effectCode": "COMP_B11_POTASH_ALUM_OCTAHEDRON_SYN_30",
    "effectText": "[Triệu hồi Hợp Chất / Fusion]: Cần kết hợp đúng nguyên liệu hóa học. Khi triệu hồi thành công: Phục hồi 400 LP cho bản thân và gây 400 LP sát thương phản ứng lên đối thủ.",
    "scientificLore": "Hợp chất Phèn Chua Kali Nhôm (KAl(SO4)2·12H2O) tổng hợp từ phản ứng hóa học kinh điển theo tỷ lệ mol bảo toàn nguyên tố GDPT 2018: K₂SO₄ + Al₂(SO₄)₃ + 24H₂O → 2KAl(SO₄)₂·12H₂O.",
    "relatedEquation": "K₂SO₄ + Al₂(SO₄)₃ + 24H₂O → 2KAl(SO₄)₂·12H₂O",
    "iupacName": "Potash Alum Octahedron Complex",
    "archetype": "PETROCHEMICAL_REFINERY",
    "structuredEffects": [
      {
        "effectId": "B11_EFF_30",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "HEAL_LP",
            "params": {
              "amount": 400
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 400
            }
          }
        ],
        "description": "Phản ứng tổng hợp: Hồi 400 LP và gây 400 LP sát thương."
      }
    ],
    "synthesisRecipe": {
      "reactantFormulas": [
        {
          "formula": "K2SO4",
          "count": 1
        },
        {
          "formula": "Al2",
          "count": 1
        },
        {
          "formula": "H2O",
          "count": 24
        }
      ],
      "pedagogicalEquation": "K₂SO₄ + Al₂(SO₄)₃ + 24H₂O → 2KAl(SO₄)₂·12H₂O"
    }
  },
  {
    "id": "card_b11_031_fusion_pure_water_crystal_31",
    "name": "Nước Tinh Khiết — Hợp Chất Tổng Hợp Bậc 4",
    "name_en": "Pure Water Crystal — Synthesis Compound Mk-4",
    "cardType": "COMPOUND_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "AQUA",
    "manaCost": 4,
    "level": 5,
    "atk": 2900,
    "def": 2550,
    "chemicalFormula": "H2O",
    "effectCode": "COMP_B11_PURE_WATER_CRYSTAL_SYN_31",
    "effectText": "[Triệu hồi Hợp Chất / Fusion]: Cần kết hợp đúng nguyên liệu hóa học. Khi triệu hồi thành công: Phục hồi 400 LP cho bản thân và gây 400 LP sát thương phản ứng lên đối thủ.",
    "scientificLore": "Hợp chất Nước Tinh Khiết (H2O) tổng hợp từ phản ứng hóa học kinh điển theo tỷ lệ mol bảo toàn nguyên tố GDPT 2018: 2H₂ + O₂ → 2H₂O.",
    "relatedEquation": "2H₂ + O₂ → 2H₂O",
    "iupacName": "Pure Water Crystal Complex",
    "archetype": "WERNER_COORDINATION",
    "structuredEffects": [
      {
        "effectId": "B11_EFF_31",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "HEAL_LP",
            "params": {
              "amount": 400
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 400
            }
          }
        ],
        "description": "Phản ứng tổng hợp: Hồi 400 LP và gây 400 LP sát thương."
      }
    ],
    "synthesisRecipe": {
      "reactantFormulas": [
        {
          "formula": "H2",
          "count": 2
        },
        {
          "formula": "O2",
          "count": 1
        }
      ],
      "pedagogicalEquation": "2H₂ + O₂ → 2H₂O"
    }
  },
  {
    "id": "card_b11_032_fusion_thermite_ignition_titan_32",
    "name": "Nhiệt Nhôm Thermite — Hợp Chất Tổng Hợp Bậc 4",
    "name_en": "Thermite Ignition Titan — Synthesis Compound Mk-4",
    "cardType": "COMPOUND_MONSTER",
    "rarity": "ULTRA_RARE",
    "attribute": "PYRO",
    "manaCost": 5,
    "level": 6,
    "atk": 3110,
    "def": 2760,
    "chemicalFormula": "Fe+Al2O3",
    "effectCode": "COMP_B11_THERMITE_IGNITION_TITAN_SYN_32",
    "effectText": "[Triệu hồi Hợp Chất / Fusion]: Cần kết hợp đúng nguyên liệu hóa học. Khi triệu hồi thành công: Phục hồi 400 LP cho bản thân và gây 400 LP sát thương phản ứng lên đối thủ.",
    "scientificLore": "Hợp chất Nhiệt Nhôm Thermite (Fe+Al2O3) tổng hợp từ phản ứng hóa học kinh điển theo tỷ lệ mol bảo toàn nguyên tố GDPT 2018: Fe₂O₃ + 2Al → 2Fe + Al₂O₃ (2500°C).",
    "relatedEquation": "Fe₂O₃ + 2Al → 2Fe + Al₂O₃ (2500°C)",
    "iupacName": "Thermite Ignition Titan Complex",
    "archetype": "PETROCHEMICAL_REFINERY",
    "structuredEffects": [
      {
        "effectId": "B11_EFF_32",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "HEAL_LP",
            "params": {
              "amount": 400
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 400
            }
          }
        ],
        "description": "Phản ứng tổng hợp: Hồi 400 LP và gây 400 LP sát thương."
      }
    ],
    "synthesisRecipe": {
      "reactantFormulas": [
        {
          "formula": "Fe2O3",
          "count": 1
        },
        {
          "formula": "Al",
          "count": 2
        }
      ],
      "pedagogicalEquation": "Fe₂O₃ + 2Al → 2Fe + Al₂O₃ (2500°C)",
      "requiredCondition": "HIGH_TEMP"
    }
  },
  {
    "id": "card_b11_033_fusion_aqua_regia_sovereign_33",
    "name": "Nước Cường Toan Aqua Regia — Hợp Chất Tổng Hợp Bậc 4",
    "name_en": "Aqua Regia Sovereign — Synthesis Compound Mk-4",
    "cardType": "COMPOUND_MONSTER",
    "rarity": "SECRET_RARE",
    "attribute": "ACID_DARK",
    "manaCost": 6,
    "level": 7,
    "atk": 3120,
    "def": 2970,
    "chemicalFormula": "HNO3·3HCl",
    "effectCode": "COMP_B11_AQUA_REGIA_SOVEREIGN_SYN_33",
    "effectText": "[Triệu hồi Hợp Chất / Fusion]: Cần kết hợp đúng nguyên liệu hóa học. Khi triệu hồi thành công: Phục hồi 400 LP cho bản thân và gây 400 LP sát thương phản ứng lên đối thủ.",
    "scientificLore": "Hợp chất Nước Cường Toan Aqua Regia (HNO3·3HCl) tổng hợp từ phản ứng hóa học kinh điển theo tỷ lệ mol bảo toàn nguyên tố GDPT 2018: Au + 3HNO₃ + 4HCl → HAuCl₄ + 3NO₂ + 3H₂O.",
    "relatedEquation": "Au + 3HNO₃ + 4HCl → HAuCl₄ + 3NO₂ + 3H₂O",
    "iupacName": "Aqua Regia Sovereign Complex",
    "archetype": "WERNER_COORDINATION",
    "structuredEffects": [
      {
        "effectId": "B11_EFF_33",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "HEAL_LP",
            "params": {
              "amount": 400
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 400
            }
          }
        ],
        "description": "Phản ứng tổng hợp: Hồi 400 LP và gây 400 LP sát thương."
      }
    ],
    "synthesisRecipe": {
      "reactantFormulas": [
        {
          "formula": "Au",
          "count": 1
        },
        {
          "formula": "HNO3",
          "count": 3
        },
        {
          "formula": "HCl",
          "count": 4
        }
      ],
      "pedagogicalEquation": "Au + 3HNO₃ + 4HCl → HAuCl₄ + 3NO₂ + 3H₂O"
    }
  },
  {
    "id": "card_b11_034_fusion_brass_alloy_golem_34",
    "name": "Đồng Thau Hợp Kim Brass — Hợp Chất Tổng Hợp Bậc 4",
    "name_en": "Brass Alloy Golem — Synthesis Compound Mk-4",
    "cardType": "COMPOUND_MONSTER",
    "rarity": "COMMON",
    "attribute": "TERRA",
    "manaCost": 7,
    "level": 8,
    "atk": 3330,
    "def": 3180,
    "chemicalFormula": "Cu-Zn",
    "effectCode": "COMP_B11_BRASS_ALLOY_GOLEM_SYN_34",
    "effectText": "[Triệu hồi Hợp Chất / Fusion]: Cần kết hợp đúng nguyên liệu hóa học. Khi triệu hồi thành công: Phục hồi 400 LP cho bản thân và gây 400 LP sát thương phản ứng lên đối thủ.",
    "scientificLore": "Hợp chất Đồng Thau Hợp Kim Brass (Cu-Zn) tổng hợp từ phản ứng hóa học kinh điển theo tỷ lệ mol bảo toàn nguyên tố GDPT 2018: Cu + Zn → Cu-Zn Alloy Solid Solution.",
    "relatedEquation": "Cu + Zn → Cu-Zn Alloy Solid Solution",
    "iupacName": "Brass Alloy Golem Complex",
    "archetype": "PETROCHEMICAL_REFINERY",
    "structuredEffects": [
      {
        "effectId": "B11_EFF_34",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "HEAL_LP",
            "params": {
              "amount": 400
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 400
            }
          }
        ],
        "description": "Phản ứng tổng hợp: Hồi 400 LP và gây 400 LP sát thương."
      }
    ],
    "synthesisRecipe": {
      "reactantFormulas": [
        {
          "formula": "Cu",
          "count": 1
        },
        {
          "formula": "Zn",
          "count": 1
        }
      ],
      "pedagogicalEquation": "Cu + Zn → Cu-Zn Alloy Solid Solution"
    }
  },
  {
    "id": "card_b11_035_fusion_bronze_ancient_relic_35",
    "name": "Đồng Điếu Bronze Phù Điêu — Hợp Chất Tổng Hợp Bậc 4",
    "name_en": "Bronze Ancient Relic — Synthesis Compound Mk-4",
    "cardType": "COMPOUND_MONSTER",
    "rarity": "COMMON",
    "attribute": "TERRA",
    "manaCost": 8,
    "level": 9,
    "atk": 3540,
    "def": 3390,
    "chemicalFormula": "Cu-Sn",
    "effectCode": "COMP_B11_BRONZE_ANCIENT_RELIC_SYN_35",
    "effectText": "[Triệu hồi Hợp Chất / Fusion]: Cần kết hợp đúng nguyên liệu hóa học. Khi triệu hồi thành công: Phục hồi 400 LP cho bản thân và gây 400 LP sát thương phản ứng lên đối thủ.",
    "scientificLore": "Hợp chất Đồng Điếu Bronze Phù Điêu (Cu-Sn) tổng hợp từ phản ứng hóa học kinh điển theo tỷ lệ mol bảo toàn nguyên tố GDPT 2018: Cu + Sn → Bronze Crystalline Matrix.",
    "relatedEquation": "Cu + Sn → Bronze Crystalline Matrix",
    "iupacName": "Bronze Ancient Relic Complex",
    "archetype": "WERNER_COORDINATION",
    "structuredEffects": [
      {
        "effectId": "B11_EFF_35",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "HEAL_LP",
            "params": {
              "amount": 400
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 400
            }
          }
        ],
        "description": "Phản ứng tổng hợp: Hồi 400 LP và gây 400 LP sát thương."
      }
    ],
    "synthesisRecipe": {
      "reactantFormulas": [
        {
          "formula": "Cu",
          "count": 1
        },
        {
          "formula": "Sn",
          "count": 1
        }
      ],
      "pedagogicalEquation": "Cu + Sn → Bronze Crystalline Matrix"
    }
  },
  {
    "id": "card_b11_036_fusion_high_carbon_steel_titan_36",
    "name": "Thép Hợp Kim Carbon-Sắt — Hợp Chất Tổng Hợp Bậc 4",
    "name_en": "High Carbon Steel Titan — Synthesis Compound Mk-4",
    "cardType": "COMPOUND_MONSTER",
    "rarity": "COMMON",
    "attribute": "TERRA",
    "manaCost": 8,
    "level": 10,
    "atk": 3750,
    "def": 3300,
    "chemicalFormula": "Fe-C",
    "effectCode": "COMP_B11_HIGH_CARBON_STEEL_TITAN_SYN_36",
    "effectText": "[Triệu hồi Hợp Chất / Fusion]: Cần kết hợp đúng nguyên liệu hóa học. Khi triệu hồi thành công: Phục hồi 400 LP cho bản thân và gây 400 LP sát thương phản ứng lên đối thủ.",
    "scientificLore": "Hợp chất Thép Hợp Kim Carbon-Sắt (Fe-C) tổng hợp từ phản ứng hóa học kinh điển theo tỷ lệ mol bảo toàn nguyên tố GDPT 2018: Fe + C → Fe₃C Cementite Pearlite.",
    "relatedEquation": "Fe + C → Fe₃C Cementite Pearlite",
    "iupacName": "High Carbon Steel Titan Complex",
    "archetype": "PETROCHEMICAL_REFINERY",
    "structuredEffects": [
      {
        "effectId": "B11_EFF_36",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "HEAL_LP",
            "params": {
              "amount": 400
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 400
            }
          }
        ],
        "description": "Phản ứng tổng hợp: Hồi 400 LP và gây 400 LP sát thương."
      }
    ],
    "synthesisRecipe": {
      "reactantFormulas": [
        {
          "formula": "Fe",
          "count": 1
        },
        {
          "formula": "C",
          "count": 1
        }
      ],
      "pedagogicalEquation": "Fe + C → Fe₃C Cementite Pearlite"
    }
  },
  {
    "id": "card_b11_037_fusion_aspirin_pain_sovereign_37",
    "name": "Aspirin Axetylsalixylic — Hợp Chất Tổng Hợp Bậc 4",
    "name_en": "Aspirin Pain Sovereign — Synthesis Compound Mk-4",
    "cardType": "COMPOUND_MONSTER",
    "rarity": "RARE",
    "attribute": "AQUA",
    "manaCost": 4,
    "level": 5,
    "atk": 2800,
    "def": 2610,
    "chemicalFormula": "C9H8O4",
    "effectCode": "COMP_B11_ASPIRIN_PAIN_SOVEREIGN_SYN_37",
    "effectText": "[Triệu hồi Hợp Chất / Fusion]: Cần kết hợp đúng nguyên liệu hóa học. Khi triệu hồi thành công: Phục hồi 400 LP cho bản thân và gây 400 LP sát thương phản ứng lên đối thủ.",
    "scientificLore": "Hợp chất Aspirin Axetylsalixylic (C9H8O4) tổng hợp từ phản ứng hóa học kinh điển theo tỷ lệ mol bảo toàn nguyên tố GDPT 2018: C₇H₆O₃ + C₄H₆O₃ → C₉H₈O₄ + CH₃COOH.",
    "relatedEquation": "C₇H₆O₃ + C₄H₆O₃ → C₉H₈O₄ + CH₃COOH",
    "iupacName": "Aspirin Pain Sovereign Complex",
    "archetype": "WERNER_COORDINATION",
    "structuredEffects": [
      {
        "effectId": "B11_EFF_37",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "HEAL_LP",
            "params": {
              "amount": 400
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 400
            }
          }
        ],
        "description": "Phản ứng tổng hợp: Hồi 400 LP và gây 400 LP sát thương."
      }
    ],
    "synthesisRecipe": {
      "reactantFormulas": [
        {
          "formula": "C7H6O3",
          "count": 1
        },
        {
          "formula": "C4H6O3",
          "count": 1
        }
      ],
      "pedagogicalEquation": "C₇H₆O₃ + C₄H₆O₃ → C₉H₈O₄ + CH₃COOH"
    }
  },
  {
    "id": "card_b11_038_fusion_saponified_stearate_colossus_38",
    "name": "Xà Phòng Natri Stearat — Hợp Chất Tổng Hợp Bậc 4",
    "name_en": "Saponified Stearate Colossus — Synthesis Compound Mk-4",
    "cardType": "COMPOUND_MONSTER",
    "rarity": "RARE",
    "attribute": "TERRA",
    "manaCost": 5,
    "level": 6,
    "atk": 3010,
    "def": 2820,
    "chemicalFormula": "C17H35COONa",
    "effectCode": "COMP_B11_SAPONIFIED_STEARATE_COLOSSUS_SYN_38",
    "effectText": "[Triệu hồi Hợp Chất / Fusion]: Cần kết hợp đúng nguyên liệu hóa học. Khi triệu hồi thành công: Phục hồi 400 LP cho bản thân và gây 400 LP sát thương phản ứng lên đối thủ.",
    "scientificLore": "Hợp chất Xà Phòng Natri Stearat (C17H35COONa) tổng hợp từ phản ứng hóa học kinh điển theo tỷ lệ mol bảo toàn nguyên tố GDPT 2018: (C₁₇H₃₅COO)₃C₃H₅ + 3NaOH → 3C₁₇H₃₅COONa + C₃H₅(OH)₃.",
    "relatedEquation": "(C₁₇H₃₅COO)₃C₃H₅ + 3NaOH → 3C₁₇H₃₅COONa + C₃H₅(OH)₃",
    "iupacName": "Saponified Stearate Colossus Complex",
    "archetype": "PETROCHEMICAL_REFINERY",
    "structuredEffects": [
      {
        "effectId": "B11_EFF_38",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "HEAL_LP",
            "params": {
              "amount": 400
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 400
            }
          }
        ],
        "description": "Phản ứng tổng hợp: Hồi 400 LP và gây 400 LP sát thương."
      }
    ],
    "synthesisRecipe": {
      "reactantFormulas": [
        {
          "formula": "NaOH",
          "count": 3
        }
      ],
      "pedagogicalEquation": "(C₁₇H₃₅COO)₃C₃H₅ + 3NaOH → 3C₁₇H₃₅COONa + C₃H₅(OH)₃"
    }
  },
  {
    "id": "card_b11_039_fusion_black_powder_pyroflame_39",
    "name": "Thuốc Súng Đen Pháo Hoa — Hợp Chất Tổng Hợp Bậc 4",
    "name_en": "Black Powder Pyroflame — Synthesis Compound Mk-4",
    "cardType": "COMPOUND_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "PYRO",
    "manaCost": 6,
    "level": 7,
    "atk": 3220,
    "def": 3030,
    "chemicalFormula": "KNO3-C-S",
    "effectCode": "COMP_B11_BLACK_POWDER_PYROFLAME_SYN_39",
    "effectText": "[Triệu hồi Hợp Chất / Fusion]: Cần kết hợp đúng nguyên liệu hóa học. Khi triệu hồi thành công: Phục hồi 400 LP cho bản thân và gây 400 LP sát thương phản ứng lên đối thủ.",
    "scientificLore": "Hợp chất Thuốc Súng Đen Pháo Hoa (KNO3-C-S) tổng hợp từ phản ứng hóa học kinh điển theo tỷ lệ mol bảo toàn nguyên tố GDPT 2018: 2KNO₃ + S + 3C → K₂S + N₂ + 3CO₂.",
    "relatedEquation": "2KNO₃ + S + 3C → K₂S + N₂ + 3CO₂",
    "iupacName": "Black Powder Pyroflame Complex",
    "archetype": "WERNER_COORDINATION",
    "structuredEffects": [
      {
        "effectId": "B11_EFF_39",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "HEAL_LP",
            "params": {
              "amount": 400
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 400
            }
          }
        ],
        "description": "Phản ứng tổng hợp: Hồi 400 LP và gây 400 LP sát thương."
      }
    ],
    "synthesisRecipe": {
      "reactantFormulas": [
        {
          "formula": "KNO3",
          "count": 2
        },
        {
          "formula": "S",
          "count": 1
        },
        {
          "formula": "C",
          "count": 3
        }
      ],
      "pedagogicalEquation": "2KNO₃ + S + 3C → K₂S + N₂ + 3CO₂"
    }
  },
  {
    "id": "card_b11_040_fusion_potash_alum_octahedron_40",
    "name": "Phèn Chua Kali Nhôm — Hợp Chất Tổng Hợp Bậc 4",
    "name_en": "Potash Alum Octahedron — Synthesis Compound Mk-4",
    "cardType": "COMPOUND_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "AQUA",
    "manaCost": 7,
    "level": 8,
    "atk": 3430,
    "def": 3240,
    "chemicalFormula": "KAl(SO4)2·12H2O",
    "effectCode": "COMP_B11_POTASH_ALUM_OCTAHEDRON_SYN_40",
    "effectText": "[Triệu hồi Hợp Chất / Fusion]: Cần kết hợp đúng nguyên liệu hóa học. Khi triệu hồi thành công: Phục hồi 400 LP cho bản thân và gây 400 LP sát thương phản ứng lên đối thủ.",
    "scientificLore": "Hợp chất Phèn Chua Kali Nhôm (KAl(SO4)2·12H2O) tổng hợp từ phản ứng hóa học kinh điển theo tỷ lệ mol bảo toàn nguyên tố GDPT 2018: K₂SO₄ + Al₂(SO₄)₃ + 24H₂O → 2KAl(SO₄)₂·12H₂O.",
    "relatedEquation": "K₂SO₄ + Al₂(SO₄)₃ + 24H₂O → 2KAl(SO₄)₂·12H₂O",
    "iupacName": "Potash Alum Octahedron Complex",
    "archetype": "PETROCHEMICAL_REFINERY",
    "structuredEffects": [
      {
        "effectId": "B11_EFF_40",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "HEAL_LP",
            "params": {
              "amount": 400
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 400
            }
          }
        ],
        "description": "Phản ứng tổng hợp: Hồi 400 LP và gây 400 LP sát thương."
      }
    ],
    "synthesisRecipe": {
      "reactantFormulas": [
        {
          "formula": "K2SO4",
          "count": 1
        },
        {
          "formula": "Al2",
          "count": 1
        },
        {
          "formula": "H2O",
          "count": 24
        }
      ],
      "pedagogicalEquation": "K₂SO₄ + Al₂(SO₄)₃ + 24H₂O → 2KAl(SO₄)₂·12H₂O"
    }
  },
  {
    "id": "card_b11_041_fusion_pure_water_crystal_41",
    "name": "Nước Tinh Khiết — Hợp Chất Tổng Hợp Bậc 5",
    "name_en": "Pure Water Crystal — Synthesis Compound Mk-5",
    "cardType": "COMPOUND_MONSTER",
    "rarity": "ULTRA_RARE",
    "attribute": "AQUA",
    "manaCost": 8,
    "level": 9,
    "atk": 3440,
    "def": 3150,
    "chemicalFormula": "H2O",
    "effectCode": "COMP_B11_PURE_WATER_CRYSTAL_SYN_41",
    "effectText": "[Triệu hồi Hợp Chất / Fusion]: Cần kết hợp đúng nguyên liệu hóa học. Khi triệu hồi thành công: Phục hồi 400 LP cho bản thân và gây 400 LP sát thương phản ứng lên đối thủ.",
    "scientificLore": "Hợp chất Nước Tinh Khiết (H2O) tổng hợp từ phản ứng hóa học kinh điển theo tỷ lệ mol bảo toàn nguyên tố GDPT 2018: 2H₂ + O₂ → 2H₂O.",
    "relatedEquation": "2H₂ + O₂ → 2H₂O",
    "iupacName": "Pure Water Crystal Complex",
    "archetype": "WERNER_COORDINATION",
    "structuredEffects": [
      {
        "effectId": "B11_EFF_41",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "HEAL_LP",
            "params": {
              "amount": 400
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 400
            }
          }
        ],
        "description": "Phản ứng tổng hợp: Hồi 400 LP và gây 400 LP sát thương."
      }
    ],
    "synthesisRecipe": {
      "reactantFormulas": [
        {
          "formula": "H2",
          "count": 2
        },
        {
          "formula": "O2",
          "count": 1
        }
      ],
      "pedagogicalEquation": "2H₂ + O₂ → 2H₂O"
    }
  },
  {
    "id": "card_b11_042_fusion_thermite_ignition_titan_42",
    "name": "Nhiệt Nhôm Thermite — Hợp Chất Tổng Hợp Bậc 5",
    "name_en": "Thermite Ignition Titan — Synthesis Compound Mk-5",
    "cardType": "COMPOUND_MONSTER",
    "rarity": "SECRET_RARE",
    "attribute": "PYRO",
    "manaCost": 8,
    "level": 10,
    "atk": 3650,
    "def": 3360,
    "chemicalFormula": "Fe+Al2O3",
    "effectCode": "COMP_B11_THERMITE_IGNITION_TITAN_SYN_42",
    "effectText": "[Triệu hồi Hợp Chất / Fusion]: Cần kết hợp đúng nguyên liệu hóa học. Khi triệu hồi thành công: Phục hồi 400 LP cho bản thân và gây 400 LP sát thương phản ứng lên đối thủ.",
    "scientificLore": "Hợp chất Nhiệt Nhôm Thermite (Fe+Al2O3) tổng hợp từ phản ứng hóa học kinh điển theo tỷ lệ mol bảo toàn nguyên tố GDPT 2018: Fe₂O₃ + 2Al → 2Fe + Al₂O₃ (2500°C).",
    "relatedEquation": "Fe₂O₃ + 2Al → 2Fe + Al₂O₃ (2500°C)",
    "iupacName": "Thermite Ignition Titan Complex",
    "archetype": "PETROCHEMICAL_REFINERY",
    "structuredEffects": [
      {
        "effectId": "B11_EFF_42",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "HEAL_LP",
            "params": {
              "amount": 400
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 400
            }
          }
        ],
        "description": "Phản ứng tổng hợp: Hồi 400 LP và gây 400 LP sát thương."
      }
    ],
    "synthesisRecipe": {
      "reactantFormulas": [
        {
          "formula": "Fe2O3",
          "count": 1
        },
        {
          "formula": "Al",
          "count": 2
        }
      ],
      "pedagogicalEquation": "Fe₂O₃ + 2Al → 2Fe + Al₂O₃ (2500°C)",
      "requiredCondition": "HIGH_TEMP"
    }
  },
  {
    "id": "card_b11_043_fusion_aqua_regia_sovereign_43",
    "name": "Nước Cường Toan Aqua Regia — Hợp Chất Tổng Hợp Bậc 5",
    "name_en": "Aqua Regia Sovereign — Synthesis Compound Mk-5",
    "cardType": "COMPOUND_MONSTER",
    "rarity": "COMMON",
    "attribute": "ACID_DARK",
    "manaCost": 4,
    "level": 5,
    "atk": 2900,
    "def": 2670,
    "chemicalFormula": "HNO3·3HCl",
    "effectCode": "COMP_B11_AQUA_REGIA_SOVEREIGN_SYN_43",
    "effectText": "[Triệu hồi Hợp Chất / Fusion]: Cần kết hợp đúng nguyên liệu hóa học. Khi triệu hồi thành công: Phục hồi 400 LP cho bản thân và gây 400 LP sát thương phản ứng lên đối thủ.",
    "scientificLore": "Hợp chất Nước Cường Toan Aqua Regia (HNO3·3HCl) tổng hợp từ phản ứng hóa học kinh điển theo tỷ lệ mol bảo toàn nguyên tố GDPT 2018: Au + 3HNO₃ + 4HCl → HAuCl₄ + 3NO₂ + 3H₂O.",
    "relatedEquation": "Au + 3HNO₃ + 4HCl → HAuCl₄ + 3NO₂ + 3H₂O",
    "iupacName": "Aqua Regia Sovereign Complex",
    "archetype": "WERNER_COORDINATION",
    "structuredEffects": [
      {
        "effectId": "B11_EFF_43",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "HEAL_LP",
            "params": {
              "amount": 400
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 400
            }
          }
        ],
        "description": "Phản ứng tổng hợp: Hồi 400 LP và gây 400 LP sát thương."
      }
    ],
    "synthesisRecipe": {
      "reactantFormulas": [
        {
          "formula": "Au",
          "count": 1
        },
        {
          "formula": "HNO3",
          "count": 3
        },
        {
          "formula": "HCl",
          "count": 4
        }
      ],
      "pedagogicalEquation": "Au + 3HNO₃ + 4HCl → HAuCl₄ + 3NO₂ + 3H₂O"
    }
  },
  {
    "id": "card_b11_044_fusion_brass_alloy_golem_44",
    "name": "Đồng Thau Hợp Kim Brass — Hợp Chất Tổng Hợp Bậc 5",
    "name_en": "Brass Alloy Golem — Synthesis Compound Mk-5",
    "cardType": "COMPOUND_MONSTER",
    "rarity": "COMMON",
    "attribute": "TERRA",
    "manaCost": 5,
    "level": 6,
    "atk": 3110,
    "def": 2880,
    "chemicalFormula": "Cu-Zn",
    "effectCode": "COMP_B11_BRASS_ALLOY_GOLEM_SYN_44",
    "effectText": "[Triệu hồi Hợp Chất / Fusion]: Cần kết hợp đúng nguyên liệu hóa học. Khi triệu hồi thành công: Phục hồi 400 LP cho bản thân và gây 400 LP sát thương phản ứng lên đối thủ.",
    "scientificLore": "Hợp chất Đồng Thau Hợp Kim Brass (Cu-Zn) tổng hợp từ phản ứng hóa học kinh điển theo tỷ lệ mol bảo toàn nguyên tố GDPT 2018: Cu + Zn → Cu-Zn Alloy Solid Solution.",
    "relatedEquation": "Cu + Zn → Cu-Zn Alloy Solid Solution",
    "iupacName": "Brass Alloy Golem Complex",
    "archetype": "PETROCHEMICAL_REFINERY",
    "structuredEffects": [
      {
        "effectId": "B11_EFF_44",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "HEAL_LP",
            "params": {
              "amount": 400
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 400
            }
          }
        ],
        "description": "Phản ứng tổng hợp: Hồi 400 LP và gây 400 LP sát thương."
      }
    ],
    "synthesisRecipe": {
      "reactantFormulas": [
        {
          "formula": "Cu",
          "count": 1
        },
        {
          "formula": "Zn",
          "count": 1
        }
      ],
      "pedagogicalEquation": "Cu + Zn → Cu-Zn Alloy Solid Solution"
    }
  },
  {
    "id": "card_b11_045_fusion_bronze_ancient_relic_45",
    "name": "Đồng Điếu Bronze Phù Điêu — Hợp Chất Tổng Hợp Bậc 5",
    "name_en": "Bronze Ancient Relic — Synthesis Compound Mk-5",
    "cardType": "COMPOUND_MONSTER",
    "rarity": "COMMON",
    "attribute": "TERRA",
    "manaCost": 6,
    "level": 7,
    "atk": 3120,
    "def": 3090,
    "chemicalFormula": "Cu-Sn",
    "effectCode": "COMP_B11_BRONZE_ANCIENT_RELIC_SYN_45",
    "effectText": "[Triệu hồi Hợp Chất / Fusion]: Cần kết hợp đúng nguyên liệu hóa học. Khi triệu hồi thành công: Phục hồi 400 LP cho bản thân và gây 400 LP sát thương phản ứng lên đối thủ.",
    "scientificLore": "Hợp chất Đồng Điếu Bronze Phù Điêu (Cu-Sn) tổng hợp từ phản ứng hóa học kinh điển theo tỷ lệ mol bảo toàn nguyên tố GDPT 2018: Cu + Sn → Bronze Crystalline Matrix.",
    "relatedEquation": "Cu + Sn → Bronze Crystalline Matrix",
    "iupacName": "Bronze Ancient Relic Complex",
    "archetype": "WERNER_COORDINATION",
    "structuredEffects": [
      {
        "effectId": "B11_EFF_45",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "HEAL_LP",
            "params": {
              "amount": 400
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 400
            }
          }
        ],
        "description": "Phản ứng tổng hợp: Hồi 400 LP và gây 400 LP sát thương."
      }
    ],
    "synthesisRecipe": {
      "reactantFormulas": [
        {
          "formula": "Cu",
          "count": 1
        },
        {
          "formula": "Sn",
          "count": 1
        }
      ],
      "pedagogicalEquation": "Cu + Sn → Bronze Crystalline Matrix"
    }
  },
  {
    "id": "card_b11_046_fusion_high_carbon_steel_titan_46",
    "name": "Thép Hợp Kim Carbon-Sắt — Hợp Chất Tổng Hợp Bậc 5",
    "name_en": "High Carbon Steel Titan — Synthesis Compound Mk-5",
    "cardType": "COMPOUND_MONSTER",
    "rarity": "RARE",
    "attribute": "TERRA",
    "manaCost": 7,
    "level": 8,
    "atk": 3330,
    "def": 3000,
    "chemicalFormula": "Fe-C",
    "effectCode": "COMP_B11_HIGH_CARBON_STEEL_TITAN_SYN_46",
    "effectText": "[Triệu hồi Hợp Chất / Fusion]: Cần kết hợp đúng nguyên liệu hóa học. Khi triệu hồi thành công: Phục hồi 400 LP cho bản thân và gây 400 LP sát thương phản ứng lên đối thủ.",
    "scientificLore": "Hợp chất Thép Hợp Kim Carbon-Sắt (Fe-C) tổng hợp từ phản ứng hóa học kinh điển theo tỷ lệ mol bảo toàn nguyên tố GDPT 2018: Fe + C → Fe₃C Cementite Pearlite.",
    "relatedEquation": "Fe + C → Fe₃C Cementite Pearlite",
    "iupacName": "High Carbon Steel Titan Complex",
    "archetype": "PETROCHEMICAL_REFINERY",
    "structuredEffects": [
      {
        "effectId": "B11_EFF_46",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "HEAL_LP",
            "params": {
              "amount": 400
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 400
            }
          }
        ],
        "description": "Phản ứng tổng hợp: Hồi 400 LP và gây 400 LP sát thương."
      }
    ],
    "synthesisRecipe": {
      "reactantFormulas": [
        {
          "formula": "Fe",
          "count": 1
        },
        {
          "formula": "C",
          "count": 1
        }
      ],
      "pedagogicalEquation": "Fe + C → Fe₃C Cementite Pearlite"
    }
  },
  {
    "id": "card_b11_047_fusion_aspirin_pain_sovereign_47",
    "name": "Aspirin Axetylsalixylic — Hợp Chất Tổng Hợp Bậc 5",
    "name_en": "Aspirin Pain Sovereign — Synthesis Compound Mk-5",
    "cardType": "COMPOUND_MONSTER",
    "rarity": "RARE",
    "attribute": "AQUA",
    "manaCost": 8,
    "level": 9,
    "atk": 3540,
    "def": 3210,
    "chemicalFormula": "C9H8O4",
    "effectCode": "COMP_B11_ASPIRIN_PAIN_SOVEREIGN_SYN_47",
    "effectText": "[Triệu hồi Hợp Chất / Fusion]: Cần kết hợp đúng nguyên liệu hóa học. Khi triệu hồi thành công: Phục hồi 400 LP cho bản thân và gây 400 LP sát thương phản ứng lên đối thủ.",
    "scientificLore": "Hợp chất Aspirin Axetylsalixylic (C9H8O4) tổng hợp từ phản ứng hóa học kinh điển theo tỷ lệ mol bảo toàn nguyên tố GDPT 2018: C₇H₆O₃ + C₄H₆O₃ → C₉H₈O₄ + CH₃COOH.",
    "relatedEquation": "C₇H₆O₃ + C₄H₆O₃ → C₉H₈O₄ + CH₃COOH",
    "iupacName": "Aspirin Pain Sovereign Complex",
    "archetype": "WERNER_COORDINATION",
    "structuredEffects": [
      {
        "effectId": "B11_EFF_47",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "HEAL_LP",
            "params": {
              "amount": 400
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 400
            }
          }
        ],
        "description": "Phản ứng tổng hợp: Hồi 400 LP và gây 400 LP sát thương."
      }
    ],
    "synthesisRecipe": {
      "reactantFormulas": [
        {
          "formula": "C7H6O3",
          "count": 1
        },
        {
          "formula": "C4H6O3",
          "count": 1
        }
      ],
      "pedagogicalEquation": "C₇H₆O₃ + C₄H₆O₃ → C₉H₈O₄ + CH₃COOH"
    }
  },
  {
    "id": "card_b11_048_fusion_saponified_stearate_colossus_48",
    "name": "Xà Phòng Natri Stearat — Hợp Chất Tổng Hợp Bậc 5",
    "name_en": "Saponified Stearate Colossus — Synthesis Compound Mk-5",
    "cardType": "COMPOUND_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "TERRA",
    "manaCost": 8,
    "level": 10,
    "atk": 3750,
    "def": 3420,
    "chemicalFormula": "C17H35COONa",
    "effectCode": "COMP_B11_SAPONIFIED_STEARATE_COLOSSUS_SYN_48",
    "effectText": "[Triệu hồi Hợp Chất / Fusion]: Cần kết hợp đúng nguyên liệu hóa học. Khi triệu hồi thành công: Phục hồi 400 LP cho bản thân và gây 400 LP sát thương phản ứng lên đối thủ.",
    "scientificLore": "Hợp chất Xà Phòng Natri Stearat (C17H35COONa) tổng hợp từ phản ứng hóa học kinh điển theo tỷ lệ mol bảo toàn nguyên tố GDPT 2018: (C₁₇H₃₅COO)₃C₃H₅ + 3NaOH → 3C₁₇H₃₅COONa + C₃H₅(OH)₃.",
    "relatedEquation": "(C₁₇H₃₅COO)₃C₃H₅ + 3NaOH → 3C₁₇H₃₅COONa + C₃H₅(OH)₃",
    "iupacName": "Saponified Stearate Colossus Complex",
    "archetype": "PETROCHEMICAL_REFINERY",
    "structuredEffects": [
      {
        "effectId": "B11_EFF_48",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "HEAL_LP",
            "params": {
              "amount": 400
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 400
            }
          }
        ],
        "description": "Phản ứng tổng hợp: Hồi 400 LP và gây 400 LP sát thương."
      }
    ],
    "synthesisRecipe": {
      "reactantFormulas": [
        {
          "formula": "NaOH",
          "count": 3
        }
      ],
      "pedagogicalEquation": "(C₁₇H₃₅COO)₃C₃H₅ + 3NaOH → 3C₁₇H₃₅COONa + C₃H₅(OH)₃"
    }
  },
  {
    "id": "card_b11_049_fusion_black_powder_pyroflame_49",
    "name": "Thuốc Súng Đen Pháo Hoa — Hợp Chất Tổng Hợp Bậc 5",
    "name_en": "Black Powder Pyroflame — Synthesis Compound Mk-5",
    "cardType": "COMPOUND_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "PYRO",
    "manaCost": 4,
    "level": 5,
    "atk": 2800,
    "def": 2730,
    "chemicalFormula": "KNO3-C-S",
    "effectCode": "COMP_B11_BLACK_POWDER_PYROFLAME_SYN_49",
    "effectText": "[Triệu hồi Hợp Chất / Fusion]: Cần kết hợp đúng nguyên liệu hóa học. Khi triệu hồi thành công: Phục hồi 400 LP cho bản thân và gây 400 LP sát thương phản ứng lên đối thủ.",
    "scientificLore": "Hợp chất Thuốc Súng Đen Pháo Hoa (KNO3-C-S) tổng hợp từ phản ứng hóa học kinh điển theo tỷ lệ mol bảo toàn nguyên tố GDPT 2018: 2KNO₃ + S + 3C → K₂S + N₂ + 3CO₂.",
    "relatedEquation": "2KNO₃ + S + 3C → K₂S + N₂ + 3CO₂",
    "iupacName": "Black Powder Pyroflame Complex",
    "archetype": "WERNER_COORDINATION",
    "structuredEffects": [
      {
        "effectId": "B11_EFF_49",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "HEAL_LP",
            "params": {
              "amount": 400
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 400
            }
          }
        ],
        "description": "Phản ứng tổng hợp: Hồi 400 LP và gây 400 LP sát thương."
      }
    ],
    "synthesisRecipe": {
      "reactantFormulas": [
        {
          "formula": "KNO3",
          "count": 2
        },
        {
          "formula": "S",
          "count": 1
        },
        {
          "formula": "C",
          "count": 3
        }
      ],
      "pedagogicalEquation": "2KNO₃ + S + 3C → K₂S + N₂ + 3CO₂"
    }
  },
  {
    "id": "card_b11_050_fusion_potash_alum_octahedron_50",
    "name": "Phèn Chua Kali Nhôm — Hợp Chất Tổng Hợp Bậc 5",
    "name_en": "Potash Alum Octahedron — Synthesis Compound Mk-5",
    "cardType": "COMPOUND_MONSTER",
    "rarity": "ULTRA_RARE",
    "attribute": "AQUA",
    "manaCost": 5,
    "level": 6,
    "atk": 3010,
    "def": 2940,
    "chemicalFormula": "KAl(SO4)2·12H2O",
    "effectCode": "COMP_B11_POTASH_ALUM_OCTAHEDRON_SYN_50",
    "effectText": "[Triệu hồi Hợp Chất / Fusion]: Cần kết hợp đúng nguyên liệu hóa học. Khi triệu hồi thành công: Phục hồi 400 LP cho bản thân và gây 400 LP sát thương phản ứng lên đối thủ.",
    "scientificLore": "Hợp chất Phèn Chua Kali Nhôm (KAl(SO4)2·12H2O) tổng hợp từ phản ứng hóa học kinh điển theo tỷ lệ mol bảo toàn nguyên tố GDPT 2018: K₂SO₄ + Al₂(SO₄)₃ + 24H₂O → 2KAl(SO₄)₂·12H₂O.",
    "relatedEquation": "K₂SO₄ + Al₂(SO₄)₃ + 24H₂O → 2KAl(SO₄)₂·12H₂O",
    "iupacName": "Potash Alum Octahedron Complex",
    "archetype": "PETROCHEMICAL_REFINERY",
    "structuredEffects": [
      {
        "effectId": "B11_EFF_50",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "HEAL_LP",
            "params": {
              "amount": 400
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 400
            }
          }
        ],
        "description": "Phản ứng tổng hợp: Hồi 400 LP và gây 400 LP sát thương."
      }
    ],
    "synthesisRecipe": {
      "reactantFormulas": [
        {
          "formula": "K2SO4",
          "count": 1
        },
        {
          "formula": "Al2",
          "count": 1
        },
        {
          "formula": "H2O",
          "count": 24
        }
      ],
      "pedagogicalEquation": "K₂SO₄ + Al₂(SO₄)₃ + 24H₂O → 2KAl(SO₄)₂·12H₂O"
    }
  },
  {
    "id": "card_b11_051_fusion_pure_water_crystal_51",
    "name": "Nước Tinh Khiết — Hợp Chất Tổng Hợp Bậc 6",
    "name_en": "Pure Water Crystal — Synthesis Compound Mk-6",
    "cardType": "COMPOUND_MONSTER",
    "rarity": "SECRET_RARE",
    "attribute": "AQUA",
    "manaCost": 6,
    "level": 7,
    "atk": 3220,
    "def": 2850,
    "chemicalFormula": "H2O",
    "effectCode": "COMP_B11_PURE_WATER_CRYSTAL_SYN_51",
    "effectText": "[Triệu hồi Hợp Chất / Fusion]: Cần kết hợp đúng nguyên liệu hóa học. Khi triệu hồi thành công: Phục hồi 400 LP cho bản thân và gây 400 LP sát thương phản ứng lên đối thủ.",
    "scientificLore": "Hợp chất Nước Tinh Khiết (H2O) tổng hợp từ phản ứng hóa học kinh điển theo tỷ lệ mol bảo toàn nguyên tố GDPT 2018: 2H₂ + O₂ → 2H₂O.",
    "relatedEquation": "2H₂ + O₂ → 2H₂O",
    "iupacName": "Pure Water Crystal Complex",
    "archetype": "WERNER_COORDINATION",
    "structuredEffects": [
      {
        "effectId": "B11_EFF_51",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "HEAL_LP",
            "params": {
              "amount": 400
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 400
            }
          }
        ],
        "description": "Phản ứng tổng hợp: Hồi 400 LP và gây 400 LP sát thương."
      }
    ],
    "synthesisRecipe": {
      "reactantFormulas": [
        {
          "formula": "H2",
          "count": 2
        },
        {
          "formula": "O2",
          "count": 1
        }
      ],
      "pedagogicalEquation": "2H₂ + O₂ → 2H₂O"
    }
  },
  {
    "id": "card_b11_052_fusion_thermite_ignition_titan_52",
    "name": "Nhiệt Nhôm Thermite — Hợp Chất Tổng Hợp Bậc 6",
    "name_en": "Thermite Ignition Titan — Synthesis Compound Mk-6",
    "cardType": "COMPOUND_MONSTER",
    "rarity": "COMMON",
    "attribute": "PYRO",
    "manaCost": 7,
    "level": 8,
    "atk": 3430,
    "def": 3060,
    "chemicalFormula": "Fe+Al2O3",
    "effectCode": "COMP_B11_THERMITE_IGNITION_TITAN_SYN_52",
    "effectText": "[Triệu hồi Hợp Chất / Fusion]: Cần kết hợp đúng nguyên liệu hóa học. Khi triệu hồi thành công: Phục hồi 400 LP cho bản thân và gây 400 LP sát thương phản ứng lên đối thủ.",
    "scientificLore": "Hợp chất Nhiệt Nhôm Thermite (Fe+Al2O3) tổng hợp từ phản ứng hóa học kinh điển theo tỷ lệ mol bảo toàn nguyên tố GDPT 2018: Fe₂O₃ + 2Al → 2Fe + Al₂O₃ (2500°C).",
    "relatedEquation": "Fe₂O₃ + 2Al → 2Fe + Al₂O₃ (2500°C)",
    "iupacName": "Thermite Ignition Titan Complex",
    "archetype": "PETROCHEMICAL_REFINERY",
    "structuredEffects": [
      {
        "effectId": "B11_EFF_52",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "HEAL_LP",
            "params": {
              "amount": 400
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 400
            }
          }
        ],
        "description": "Phản ứng tổng hợp: Hồi 400 LP và gây 400 LP sát thương."
      }
    ],
    "synthesisRecipe": {
      "reactantFormulas": [
        {
          "formula": "Fe2O3",
          "count": 1
        },
        {
          "formula": "Al",
          "count": 2
        }
      ],
      "pedagogicalEquation": "Fe₂O₃ + 2Al → 2Fe + Al₂O₃ (2500°C)",
      "requiredCondition": "HIGH_TEMP"
    }
  },
  {
    "id": "card_b11_053_fusion_aqua_regia_sovereign_53",
    "name": "Nước Cường Toan Aqua Regia — Hợp Chất Tổng Hợp Bậc 6",
    "name_en": "Aqua Regia Sovereign — Synthesis Compound Mk-6",
    "cardType": "COMPOUND_MONSTER",
    "rarity": "COMMON",
    "attribute": "ACID_DARK",
    "manaCost": 8,
    "level": 9,
    "atk": 3440,
    "def": 3270,
    "chemicalFormula": "HNO3·3HCl",
    "effectCode": "COMP_B11_AQUA_REGIA_SOVEREIGN_SYN_53",
    "effectText": "[Triệu hồi Hợp Chất / Fusion]: Cần kết hợp đúng nguyên liệu hóa học. Khi triệu hồi thành công: Phục hồi 400 LP cho bản thân và gây 400 LP sát thương phản ứng lên đối thủ.",
    "scientificLore": "Hợp chất Nước Cường Toan Aqua Regia (HNO3·3HCl) tổng hợp từ phản ứng hóa học kinh điển theo tỷ lệ mol bảo toàn nguyên tố GDPT 2018: Au + 3HNO₃ + 4HCl → HAuCl₄ + 3NO₂ + 3H₂O.",
    "relatedEquation": "Au + 3HNO₃ + 4HCl → HAuCl₄ + 3NO₂ + 3H₂O",
    "iupacName": "Aqua Regia Sovereign Complex",
    "archetype": "WERNER_COORDINATION",
    "structuredEffects": [
      {
        "effectId": "B11_EFF_53",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "HEAL_LP",
            "params": {
              "amount": 400
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 400
            }
          }
        ],
        "description": "Phản ứng tổng hợp: Hồi 400 LP và gây 400 LP sát thương."
      }
    ],
    "synthesisRecipe": {
      "reactantFormulas": [
        {
          "formula": "Au",
          "count": 1
        },
        {
          "formula": "HNO3",
          "count": 3
        },
        {
          "formula": "HCl",
          "count": 4
        }
      ],
      "pedagogicalEquation": "Au + 3HNO₃ + 4HCl → HAuCl₄ + 3NO₂ + 3H₂O"
    }
  },
  {
    "id": "card_b11_054_fusion_brass_alloy_golem_54",
    "name": "Đồng Thau Hợp Kim Brass — Hợp Chất Tổng Hợp Bậc 6",
    "name_en": "Brass Alloy Golem — Synthesis Compound Mk-6",
    "cardType": "COMPOUND_MONSTER",
    "rarity": "COMMON",
    "attribute": "TERRA",
    "manaCost": 8,
    "level": 10,
    "atk": 3650,
    "def": 3480,
    "chemicalFormula": "Cu-Zn",
    "effectCode": "COMP_B11_BRASS_ALLOY_GOLEM_SYN_54",
    "effectText": "[Triệu hồi Hợp Chất / Fusion]: Cần kết hợp đúng nguyên liệu hóa học. Khi triệu hồi thành công: Phục hồi 400 LP cho bản thân và gây 400 LP sát thương phản ứng lên đối thủ.",
    "scientificLore": "Hợp chất Đồng Thau Hợp Kim Brass (Cu-Zn) tổng hợp từ phản ứng hóa học kinh điển theo tỷ lệ mol bảo toàn nguyên tố GDPT 2018: Cu + Zn → Cu-Zn Alloy Solid Solution.",
    "relatedEquation": "Cu + Zn → Cu-Zn Alloy Solid Solution",
    "iupacName": "Brass Alloy Golem Complex",
    "archetype": "PETROCHEMICAL_REFINERY",
    "structuredEffects": [
      {
        "effectId": "B11_EFF_54",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "HEAL_LP",
            "params": {
              "amount": 400
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 400
            }
          }
        ],
        "description": "Phản ứng tổng hợp: Hồi 400 LP và gây 400 LP sát thương."
      }
    ],
    "synthesisRecipe": {
      "reactantFormulas": [
        {
          "formula": "Cu",
          "count": 1
        },
        {
          "formula": "Zn",
          "count": 1
        }
      ],
      "pedagogicalEquation": "Cu + Zn → Cu-Zn Alloy Solid Solution"
    }
  },
  {
    "id": "card_b11_055_fusion_bronze_ancient_relic_55",
    "name": "Đồng Điếu Bronze Phù Điêu — Hợp Chất Tổng Hợp Bậc 6",
    "name_en": "Bronze Ancient Relic — Synthesis Compound Mk-6",
    "cardType": "COMPOUND_MONSTER",
    "rarity": "RARE",
    "attribute": "TERRA",
    "manaCost": 4,
    "level": 5,
    "atk": 2900,
    "def": 2790,
    "chemicalFormula": "Cu-Sn",
    "effectCode": "COMP_B11_BRONZE_ANCIENT_RELIC_SYN_55",
    "effectText": "[Triệu hồi Hợp Chất / Fusion]: Cần kết hợp đúng nguyên liệu hóa học. Khi triệu hồi thành công: Phục hồi 400 LP cho bản thân và gây 400 LP sát thương phản ứng lên đối thủ.",
    "scientificLore": "Hợp chất Đồng Điếu Bronze Phù Điêu (Cu-Sn) tổng hợp từ phản ứng hóa học kinh điển theo tỷ lệ mol bảo toàn nguyên tố GDPT 2018: Cu + Sn → Bronze Crystalline Matrix.",
    "relatedEquation": "Cu + Sn → Bronze Crystalline Matrix",
    "iupacName": "Bronze Ancient Relic Complex",
    "archetype": "WERNER_COORDINATION",
    "structuredEffects": [
      {
        "effectId": "B11_EFF_55",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "HEAL_LP",
            "params": {
              "amount": 400
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 400
            }
          }
        ],
        "description": "Phản ứng tổng hợp: Hồi 400 LP và gây 400 LP sát thương."
      }
    ],
    "synthesisRecipe": {
      "reactantFormulas": [
        {
          "formula": "Cu",
          "count": 1
        },
        {
          "formula": "Sn",
          "count": 1
        }
      ],
      "pedagogicalEquation": "Cu + Sn → Bronze Crystalline Matrix"
    }
  },
  {
    "id": "card_b11_056_fusion_high_carbon_steel_titan_56",
    "name": "Thép Hợp Kim Carbon-Sắt — Hợp Chất Tổng Hợp Bậc 6",
    "name_en": "High Carbon Steel Titan — Synthesis Compound Mk-6",
    "cardType": "COMPOUND_MONSTER",
    "rarity": "RARE",
    "attribute": "TERRA",
    "manaCost": 5,
    "level": 6,
    "atk": 3110,
    "def": 2700,
    "chemicalFormula": "Fe-C",
    "effectCode": "COMP_B11_HIGH_CARBON_STEEL_TITAN_SYN_56",
    "effectText": "[Triệu hồi Hợp Chất / Fusion]: Cần kết hợp đúng nguyên liệu hóa học. Khi triệu hồi thành công: Phục hồi 400 LP cho bản thân và gây 400 LP sát thương phản ứng lên đối thủ.",
    "scientificLore": "Hợp chất Thép Hợp Kim Carbon-Sắt (Fe-C) tổng hợp từ phản ứng hóa học kinh điển theo tỷ lệ mol bảo toàn nguyên tố GDPT 2018: Fe + C → Fe₃C Cementite Pearlite.",
    "relatedEquation": "Fe + C → Fe₃C Cementite Pearlite",
    "iupacName": "High Carbon Steel Titan Complex",
    "archetype": "PETROCHEMICAL_REFINERY",
    "structuredEffects": [
      {
        "effectId": "B11_EFF_56",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "HEAL_LP",
            "params": {
              "amount": 400
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 400
            }
          }
        ],
        "description": "Phản ứng tổng hợp: Hồi 400 LP và gây 400 LP sát thương."
      }
    ],
    "synthesisRecipe": {
      "reactantFormulas": [
        {
          "formula": "Fe",
          "count": 1
        },
        {
          "formula": "C",
          "count": 1
        }
      ],
      "pedagogicalEquation": "Fe + C → Fe₃C Cementite Pearlite"
    }
  },
  {
    "id": "card_b11_057_fusion_aspirin_pain_sovereign_57",
    "name": "Aspirin Axetylsalixylic — Hợp Chất Tổng Hợp Bậc 6",
    "name_en": "Aspirin Pain Sovereign — Synthesis Compound Mk-6",
    "cardType": "COMPOUND_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "AQUA",
    "manaCost": 6,
    "level": 7,
    "atk": 3120,
    "def": 2910,
    "chemicalFormula": "C9H8O4",
    "effectCode": "COMP_B11_ASPIRIN_PAIN_SOVEREIGN_SYN_57",
    "effectText": "[Triệu hồi Hợp Chất / Fusion]: Cần kết hợp đúng nguyên liệu hóa học. Khi triệu hồi thành công: Phục hồi 400 LP cho bản thân và gây 400 LP sát thương phản ứng lên đối thủ.",
    "scientificLore": "Hợp chất Aspirin Axetylsalixylic (C9H8O4) tổng hợp từ phản ứng hóa học kinh điển theo tỷ lệ mol bảo toàn nguyên tố GDPT 2018: C₇H₆O₃ + C₄H₆O₃ → C₉H₈O₄ + CH₃COOH.",
    "relatedEquation": "C₇H₆O₃ + C₄H₆O₃ → C₉H₈O₄ + CH₃COOH",
    "iupacName": "Aspirin Pain Sovereign Complex",
    "archetype": "WERNER_COORDINATION",
    "structuredEffects": [
      {
        "effectId": "B11_EFF_57",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "HEAL_LP",
            "params": {
              "amount": 400
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 400
            }
          }
        ],
        "description": "Phản ứng tổng hợp: Hồi 400 LP và gây 400 LP sát thương."
      }
    ],
    "synthesisRecipe": {
      "reactantFormulas": [
        {
          "formula": "C7H6O3",
          "count": 1
        },
        {
          "formula": "C4H6O3",
          "count": 1
        }
      ],
      "pedagogicalEquation": "C₇H₆O₃ + C₄H₆O₃ → C₉H₈O₄ + CH₃COOH"
    }
  },
  {
    "id": "card_b11_058_fusion_saponified_stearate_colossus_58",
    "name": "Xà Phòng Natri Stearat — Hợp Chất Tổng Hợp Bậc 6",
    "name_en": "Saponified Stearate Colossus — Synthesis Compound Mk-6",
    "cardType": "COMPOUND_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "TERRA",
    "manaCost": 7,
    "level": 8,
    "atk": 3330,
    "def": 3120,
    "chemicalFormula": "C17H35COONa",
    "effectCode": "COMP_B11_SAPONIFIED_STEARATE_COLOSSUS_SYN_58",
    "effectText": "[Triệu hồi Hợp Chất / Fusion]: Cần kết hợp đúng nguyên liệu hóa học. Khi triệu hồi thành công: Phục hồi 400 LP cho bản thân và gây 400 LP sát thương phản ứng lên đối thủ.",
    "scientificLore": "Hợp chất Xà Phòng Natri Stearat (C17H35COONa) tổng hợp từ phản ứng hóa học kinh điển theo tỷ lệ mol bảo toàn nguyên tố GDPT 2018: (C₁₇H₃₅COO)₃C₃H₅ + 3NaOH → 3C₁₇H₃₅COONa + C₃H₅(OH)₃.",
    "relatedEquation": "(C₁₇H₃₅COO)₃C₃H₅ + 3NaOH → 3C₁₇H₃₅COONa + C₃H₅(OH)₃",
    "iupacName": "Saponified Stearate Colossus Complex",
    "archetype": "PETROCHEMICAL_REFINERY",
    "structuredEffects": [
      {
        "effectId": "B11_EFF_58",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "HEAL_LP",
            "params": {
              "amount": 400
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 400
            }
          }
        ],
        "description": "Phản ứng tổng hợp: Hồi 400 LP và gây 400 LP sát thương."
      }
    ],
    "synthesisRecipe": {
      "reactantFormulas": [
        {
          "formula": "NaOH",
          "count": 3
        }
      ],
      "pedagogicalEquation": "(C₁₇H₃₅COO)₃C₃H₅ + 3NaOH → 3C₁₇H₃₅COONa + C₃H₅(OH)₃"
    }
  },
  {
    "id": "card_b11_059_fusion_black_powder_pyroflame_59",
    "name": "Thuốc Súng Đen Pháo Hoa — Hợp Chất Tổng Hợp Bậc 6",
    "name_en": "Black Powder Pyroflame — Synthesis Compound Mk-6",
    "cardType": "COMPOUND_MONSTER",
    "rarity": "ULTRA_RARE",
    "attribute": "PYRO",
    "manaCost": 8,
    "level": 9,
    "atk": 3540,
    "def": 3330,
    "chemicalFormula": "KNO3-C-S",
    "effectCode": "COMP_B11_BLACK_POWDER_PYROFLAME_SYN_59",
    "effectText": "[Triệu hồi Hợp Chất / Fusion]: Cần kết hợp đúng nguyên liệu hóa học. Khi triệu hồi thành công: Phục hồi 400 LP cho bản thân và gây 400 LP sát thương phản ứng lên đối thủ.",
    "scientificLore": "Hợp chất Thuốc Súng Đen Pháo Hoa (KNO3-C-S) tổng hợp từ phản ứng hóa học kinh điển theo tỷ lệ mol bảo toàn nguyên tố GDPT 2018: 2KNO₃ + S + 3C → K₂S + N₂ + 3CO₂.",
    "relatedEquation": "2KNO₃ + S + 3C → K₂S + N₂ + 3CO₂",
    "iupacName": "Black Powder Pyroflame Complex",
    "archetype": "WERNER_COORDINATION",
    "structuredEffects": [
      {
        "effectId": "B11_EFF_59",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "HEAL_LP",
            "params": {
              "amount": 400
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 400
            }
          }
        ],
        "description": "Phản ứng tổng hợp: Hồi 400 LP và gây 400 LP sát thương."
      }
    ],
    "synthesisRecipe": {
      "reactantFormulas": [
        {
          "formula": "KNO3",
          "count": 2
        },
        {
          "formula": "S",
          "count": 1
        },
        {
          "formula": "C",
          "count": 3
        }
      ],
      "pedagogicalEquation": "2KNO₃ + S + 3C → K₂S + N₂ + 3CO₂"
    }
  },
  {
    "id": "card_b11_060_fusion_potash_alum_octahedron_60",
    "name": "Phèn Chua Kali Nhôm — Hợp Chất Tổng Hợp Bậc 6",
    "name_en": "Potash Alum Octahedron — Synthesis Compound Mk-6",
    "cardType": "COMPOUND_MONSTER",
    "rarity": "SECRET_RARE",
    "attribute": "AQUA",
    "manaCost": 8,
    "level": 10,
    "atk": 3750,
    "def": 3540,
    "chemicalFormula": "KAl(SO4)2·12H2O",
    "effectCode": "COMP_B11_POTASH_ALUM_OCTAHEDRON_SYN_60",
    "effectText": "[Triệu hồi Hợp Chất / Fusion]: Cần kết hợp đúng nguyên liệu hóa học. Khi triệu hồi thành công: Phục hồi 400 LP cho bản thân và gây 400 LP sát thương phản ứng lên đối thủ.",
    "scientificLore": "Hợp chất Phèn Chua Kali Nhôm (KAl(SO4)2·12H2O) tổng hợp từ phản ứng hóa học kinh điển theo tỷ lệ mol bảo toàn nguyên tố GDPT 2018: K₂SO₄ + Al₂(SO₄)₃ + 24H₂O → 2KAl(SO₄)₂·12H₂O.",
    "relatedEquation": "K₂SO₄ + Al₂(SO₄)₃ + 24H₂O → 2KAl(SO₄)₂·12H₂O",
    "iupacName": "Potash Alum Octahedron Complex",
    "archetype": "PETROCHEMICAL_REFINERY",
    "structuredEffects": [
      {
        "effectId": "B11_EFF_60",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "HEAL_LP",
            "params": {
              "amount": 400
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 400
            }
          }
        ],
        "description": "Phản ứng tổng hợp: Hồi 400 LP và gây 400 LP sát thương."
      }
    ],
    "synthesisRecipe": {
      "reactantFormulas": [
        {
          "formula": "K2SO4",
          "count": 1
        },
        {
          "formula": "Al2",
          "count": 1
        },
        {
          "formula": "H2O",
          "count": 24
        }
      ],
      "pedagogicalEquation": "K₂SO₄ + Al₂(SO₄)₃ + 24H₂O → 2KAl(SO₄)₂·12H₂O"
    }
  },
  {
    "id": "card_b11_061_fusion_pure_water_crystal_61",
    "name": "Nước Tinh Khiết — Hợp Chất Tổng Hợp Bậc 7",
    "name_en": "Pure Water Crystal — Synthesis Compound Mk-7",
    "cardType": "COMPOUND_MONSTER",
    "rarity": "COMMON",
    "attribute": "AQUA",
    "manaCost": 4,
    "level": 5,
    "atk": 2800,
    "def": 2550,
    "chemicalFormula": "H2O",
    "effectCode": "COMP_B11_PURE_WATER_CRYSTAL_SYN_61",
    "effectText": "[Triệu hồi Hợp Chất / Fusion]: Cần kết hợp đúng nguyên liệu hóa học. Khi triệu hồi thành công: Phục hồi 400 LP cho bản thân và gây 400 LP sát thương phản ứng lên đối thủ.",
    "scientificLore": "Hợp chất Nước Tinh Khiết (H2O) tổng hợp từ phản ứng hóa học kinh điển theo tỷ lệ mol bảo toàn nguyên tố GDPT 2018: 2H₂ + O₂ → 2H₂O.",
    "relatedEquation": "2H₂ + O₂ → 2H₂O",
    "iupacName": "Pure Water Crystal Complex",
    "archetype": "WERNER_COORDINATION",
    "structuredEffects": [
      {
        "effectId": "B11_EFF_61",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "HEAL_LP",
            "params": {
              "amount": 400
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 400
            }
          }
        ],
        "description": "Phản ứng tổng hợp: Hồi 400 LP và gây 400 LP sát thương."
      }
    ],
    "synthesisRecipe": {
      "reactantFormulas": [
        {
          "formula": "H2",
          "count": 2
        },
        {
          "formula": "O2",
          "count": 1
        }
      ],
      "pedagogicalEquation": "2H₂ + O₂ → 2H₂O"
    }
  },
  {
    "id": "card_b11_062_fusion_thermite_ignition_titan_62",
    "name": "Nhiệt Nhôm Thermite — Hợp Chất Tổng Hợp Bậc 7",
    "name_en": "Thermite Ignition Titan — Synthesis Compound Mk-7",
    "cardType": "COMPOUND_MONSTER",
    "rarity": "COMMON",
    "attribute": "PYRO",
    "manaCost": 5,
    "level": 6,
    "atk": 3010,
    "def": 2760,
    "chemicalFormula": "Fe+Al2O3",
    "effectCode": "COMP_B11_THERMITE_IGNITION_TITAN_SYN_62",
    "effectText": "[Triệu hồi Hợp Chất / Fusion]: Cần kết hợp đúng nguyên liệu hóa học. Khi triệu hồi thành công: Phục hồi 400 LP cho bản thân và gây 400 LP sát thương phản ứng lên đối thủ.",
    "scientificLore": "Hợp chất Nhiệt Nhôm Thermite (Fe+Al2O3) tổng hợp từ phản ứng hóa học kinh điển theo tỷ lệ mol bảo toàn nguyên tố GDPT 2018: Fe₂O₃ + 2Al → 2Fe + Al₂O₃ (2500°C).",
    "relatedEquation": "Fe₂O₃ + 2Al → 2Fe + Al₂O₃ (2500°C)",
    "iupacName": "Thermite Ignition Titan Complex",
    "archetype": "PETROCHEMICAL_REFINERY",
    "structuredEffects": [
      {
        "effectId": "B11_EFF_62",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "HEAL_LP",
            "params": {
              "amount": 400
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 400
            }
          }
        ],
        "description": "Phản ứng tổng hợp: Hồi 400 LP và gây 400 LP sát thương."
      }
    ],
    "synthesisRecipe": {
      "reactantFormulas": [
        {
          "formula": "Fe2O3",
          "count": 1
        },
        {
          "formula": "Al",
          "count": 2
        }
      ],
      "pedagogicalEquation": "Fe₂O₃ + 2Al → 2Fe + Al₂O₃ (2500°C)",
      "requiredCondition": "HIGH_TEMP"
    }
  },
  {
    "id": "card_b11_063_fusion_aqua_regia_sovereign_63",
    "name": "Nước Cường Toan Aqua Regia — Hợp Chất Tổng Hợp Bậc 7",
    "name_en": "Aqua Regia Sovereign — Synthesis Compound Mk-7",
    "cardType": "COMPOUND_MONSTER",
    "rarity": "COMMON",
    "attribute": "ACID_DARK",
    "manaCost": 6,
    "level": 7,
    "atk": 3220,
    "def": 2970,
    "chemicalFormula": "HNO3·3HCl",
    "effectCode": "COMP_B11_AQUA_REGIA_SOVEREIGN_SYN_63",
    "effectText": "[Triệu hồi Hợp Chất / Fusion]: Cần kết hợp đúng nguyên liệu hóa học. Khi triệu hồi thành công: Phục hồi 400 LP cho bản thân và gây 400 LP sát thương phản ứng lên đối thủ.",
    "scientificLore": "Hợp chất Nước Cường Toan Aqua Regia (HNO3·3HCl) tổng hợp từ phản ứng hóa học kinh điển theo tỷ lệ mol bảo toàn nguyên tố GDPT 2018: Au + 3HNO₃ + 4HCl → HAuCl₄ + 3NO₂ + 3H₂O.",
    "relatedEquation": "Au + 3HNO₃ + 4HCl → HAuCl₄ + 3NO₂ + 3H₂O",
    "iupacName": "Aqua Regia Sovereign Complex",
    "archetype": "WERNER_COORDINATION",
    "structuredEffects": [
      {
        "effectId": "B11_EFF_63",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "HEAL_LP",
            "params": {
              "amount": 400
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 400
            }
          }
        ],
        "description": "Phản ứng tổng hợp: Hồi 400 LP và gây 400 LP sát thương."
      }
    ],
    "synthesisRecipe": {
      "reactantFormulas": [
        {
          "formula": "Au",
          "count": 1
        },
        {
          "formula": "HNO3",
          "count": 3
        },
        {
          "formula": "HCl",
          "count": 4
        }
      ],
      "pedagogicalEquation": "Au + 3HNO₃ + 4HCl → HAuCl₄ + 3NO₂ + 3H₂O"
    }
  },
  {
    "id": "card_b11_064_fusion_brass_alloy_golem_64",
    "name": "Đồng Thau Hợp Kim Brass — Hợp Chất Tổng Hợp Bậc 7",
    "name_en": "Brass Alloy Golem — Synthesis Compound Mk-7",
    "cardType": "COMPOUND_MONSTER",
    "rarity": "RARE",
    "attribute": "TERRA",
    "manaCost": 7,
    "level": 8,
    "atk": 3430,
    "def": 3180,
    "chemicalFormula": "Cu-Zn",
    "effectCode": "COMP_B11_BRASS_ALLOY_GOLEM_SYN_64",
    "effectText": "[Triệu hồi Hợp Chất / Fusion]: Cần kết hợp đúng nguyên liệu hóa học. Khi triệu hồi thành công: Phục hồi 400 LP cho bản thân và gây 400 LP sát thương phản ứng lên đối thủ.",
    "scientificLore": "Hợp chất Đồng Thau Hợp Kim Brass (Cu-Zn) tổng hợp từ phản ứng hóa học kinh điển theo tỷ lệ mol bảo toàn nguyên tố GDPT 2018: Cu + Zn → Cu-Zn Alloy Solid Solution.",
    "relatedEquation": "Cu + Zn → Cu-Zn Alloy Solid Solution",
    "iupacName": "Brass Alloy Golem Complex",
    "archetype": "PETROCHEMICAL_REFINERY",
    "structuredEffects": [
      {
        "effectId": "B11_EFF_64",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "HEAL_LP",
            "params": {
              "amount": 400
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 400
            }
          }
        ],
        "description": "Phản ứng tổng hợp: Hồi 400 LP và gây 400 LP sát thương."
      }
    ],
    "synthesisRecipe": {
      "reactantFormulas": [
        {
          "formula": "Cu",
          "count": 1
        },
        {
          "formula": "Zn",
          "count": 1
        }
      ],
      "pedagogicalEquation": "Cu + Zn → Cu-Zn Alloy Solid Solution"
    }
  },
  {
    "id": "card_b11_065_fusion_bronze_ancient_relic_65",
    "name": "Đồng Điếu Bronze Phù Điêu — Hợp Chất Tổng Hợp Bậc 7",
    "name_en": "Bronze Ancient Relic — Synthesis Compound Mk-7",
    "cardType": "COMPOUND_MONSTER",
    "rarity": "RARE",
    "attribute": "TERRA",
    "manaCost": 8,
    "level": 9,
    "atk": 3440,
    "def": 3390,
    "chemicalFormula": "Cu-Sn",
    "effectCode": "COMP_B11_BRONZE_ANCIENT_RELIC_SYN_65",
    "effectText": "[Triệu hồi Hợp Chất / Fusion]: Cần kết hợp đúng nguyên liệu hóa học. Khi triệu hồi thành công: Phục hồi 400 LP cho bản thân và gây 400 LP sát thương phản ứng lên đối thủ.",
    "scientificLore": "Hợp chất Đồng Điếu Bronze Phù Điêu (Cu-Sn) tổng hợp từ phản ứng hóa học kinh điển theo tỷ lệ mol bảo toàn nguyên tố GDPT 2018: Cu + Sn → Bronze Crystalline Matrix.",
    "relatedEquation": "Cu + Sn → Bronze Crystalline Matrix",
    "iupacName": "Bronze Ancient Relic Complex",
    "archetype": "WERNER_COORDINATION",
    "structuredEffects": [
      {
        "effectId": "B11_EFF_65",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "HEAL_LP",
            "params": {
              "amount": 400
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 400
            }
          }
        ],
        "description": "Phản ứng tổng hợp: Hồi 400 LP và gây 400 LP sát thương."
      }
    ],
    "synthesisRecipe": {
      "reactantFormulas": [
        {
          "formula": "Cu",
          "count": 1
        },
        {
          "formula": "Sn",
          "count": 1
        }
      ],
      "pedagogicalEquation": "Cu + Sn → Bronze Crystalline Matrix"
    }
  },
  {
    "id": "card_b11_066_fusion_high_carbon_steel_titan_66",
    "name": "Thép Hợp Kim Carbon-Sắt — Hợp Chất Tổng Hợp Bậc 7",
    "name_en": "High Carbon Steel Titan — Synthesis Compound Mk-7",
    "cardType": "COMPOUND_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "TERRA",
    "manaCost": 8,
    "level": 10,
    "atk": 3650,
    "def": 3300,
    "chemicalFormula": "Fe-C",
    "effectCode": "COMP_B11_HIGH_CARBON_STEEL_TITAN_SYN_66",
    "effectText": "[Triệu hồi Hợp Chất / Fusion]: Cần kết hợp đúng nguyên liệu hóa học. Khi triệu hồi thành công: Phục hồi 400 LP cho bản thân và gây 400 LP sát thương phản ứng lên đối thủ.",
    "scientificLore": "Hợp chất Thép Hợp Kim Carbon-Sắt (Fe-C) tổng hợp từ phản ứng hóa học kinh điển theo tỷ lệ mol bảo toàn nguyên tố GDPT 2018: Fe + C → Fe₃C Cementite Pearlite.",
    "relatedEquation": "Fe + C → Fe₃C Cementite Pearlite",
    "iupacName": "High Carbon Steel Titan Complex",
    "archetype": "PETROCHEMICAL_REFINERY",
    "structuredEffects": [
      {
        "effectId": "B11_EFF_66",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "HEAL_LP",
            "params": {
              "amount": 400
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 400
            }
          }
        ],
        "description": "Phản ứng tổng hợp: Hồi 400 LP và gây 400 LP sát thương."
      }
    ],
    "synthesisRecipe": {
      "reactantFormulas": [
        {
          "formula": "Fe",
          "count": 1
        },
        {
          "formula": "C",
          "count": 1
        }
      ],
      "pedagogicalEquation": "Fe + C → Fe₃C Cementite Pearlite"
    }
  },
  {
    "id": "card_b11_067_fusion_aspirin_pain_sovereign_67",
    "name": "Aspirin Axetylsalixylic — Hợp Chất Tổng Hợp Bậc 7",
    "name_en": "Aspirin Pain Sovereign — Synthesis Compound Mk-7",
    "cardType": "COMPOUND_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "AQUA",
    "manaCost": 4,
    "level": 5,
    "atk": 2900,
    "def": 2610,
    "chemicalFormula": "C9H8O4",
    "effectCode": "COMP_B11_ASPIRIN_PAIN_SOVEREIGN_SYN_67",
    "effectText": "[Triệu hồi Hợp Chất / Fusion]: Cần kết hợp đúng nguyên liệu hóa học. Khi triệu hồi thành công: Phục hồi 400 LP cho bản thân và gây 400 LP sát thương phản ứng lên đối thủ.",
    "scientificLore": "Hợp chất Aspirin Axetylsalixylic (C9H8O4) tổng hợp từ phản ứng hóa học kinh điển theo tỷ lệ mol bảo toàn nguyên tố GDPT 2018: C₇H₆O₃ + C₄H₆O₃ → C₉H₈O₄ + CH₃COOH.",
    "relatedEquation": "C₇H₆O₃ + C₄H₆O₃ → C₉H₈O₄ + CH₃COOH",
    "iupacName": "Aspirin Pain Sovereign Complex",
    "archetype": "WERNER_COORDINATION",
    "structuredEffects": [
      {
        "effectId": "B11_EFF_67",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "HEAL_LP",
            "params": {
              "amount": 400
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 400
            }
          }
        ],
        "description": "Phản ứng tổng hợp: Hồi 400 LP và gây 400 LP sát thương."
      }
    ],
    "synthesisRecipe": {
      "reactantFormulas": [
        {
          "formula": "C7H6O3",
          "count": 1
        },
        {
          "formula": "C4H6O3",
          "count": 1
        }
      ],
      "pedagogicalEquation": "C₇H₆O₃ + C₄H₆O₃ → C₉H₈O₄ + CH₃COOH"
    }
  },
  {
    "id": "card_b11_068_fusion_saponified_stearate_colossus_68",
    "name": "Xà Phòng Natri Stearat — Hợp Chất Tổng Hợp Bậc 7",
    "name_en": "Saponified Stearate Colossus — Synthesis Compound Mk-7",
    "cardType": "COMPOUND_MONSTER",
    "rarity": "ULTRA_RARE",
    "attribute": "TERRA",
    "manaCost": 5,
    "level": 6,
    "atk": 3110,
    "def": 2820,
    "chemicalFormula": "C17H35COONa",
    "effectCode": "COMP_B11_SAPONIFIED_STEARATE_COLOSSUS_SYN_68",
    "effectText": "[Triệu hồi Hợp Chất / Fusion]: Cần kết hợp đúng nguyên liệu hóa học. Khi triệu hồi thành công: Phục hồi 400 LP cho bản thân và gây 400 LP sát thương phản ứng lên đối thủ.",
    "scientificLore": "Hợp chất Xà Phòng Natri Stearat (C17H35COONa) tổng hợp từ phản ứng hóa học kinh điển theo tỷ lệ mol bảo toàn nguyên tố GDPT 2018: (C₁₇H₃₅COO)₃C₃H₅ + 3NaOH → 3C₁₇H₃₅COONa + C₃H₅(OH)₃.",
    "relatedEquation": "(C₁₇H₃₅COO)₃C₃H₅ + 3NaOH → 3C₁₇H₃₅COONa + C₃H₅(OH)₃",
    "iupacName": "Saponified Stearate Colossus Complex",
    "archetype": "PETROCHEMICAL_REFINERY",
    "structuredEffects": [
      {
        "effectId": "B11_EFF_68",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "HEAL_LP",
            "params": {
              "amount": 400
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 400
            }
          }
        ],
        "description": "Phản ứng tổng hợp: Hồi 400 LP và gây 400 LP sát thương."
      }
    ],
    "synthesisRecipe": {
      "reactantFormulas": [
        {
          "formula": "NaOH",
          "count": 3
        }
      ],
      "pedagogicalEquation": "(C₁₇H₃₅COO)₃C₃H₅ + 3NaOH → 3C₁₇H₃₅COONa + C₃H₅(OH)₃"
    }
  },
  {
    "id": "card_b11_069_fusion_black_powder_pyroflame_69",
    "name": "Thuốc Súng Đen Pháo Hoa — Hợp Chất Tổng Hợp Bậc 7",
    "name_en": "Black Powder Pyroflame — Synthesis Compound Mk-7",
    "cardType": "COMPOUND_MONSTER",
    "rarity": "SECRET_RARE",
    "attribute": "PYRO",
    "manaCost": 6,
    "level": 7,
    "atk": 3120,
    "def": 3030,
    "chemicalFormula": "KNO3-C-S",
    "effectCode": "COMP_B11_BLACK_POWDER_PYROFLAME_SYN_69",
    "effectText": "[Triệu hồi Hợp Chất / Fusion]: Cần kết hợp đúng nguyên liệu hóa học. Khi triệu hồi thành công: Phục hồi 400 LP cho bản thân và gây 400 LP sát thương phản ứng lên đối thủ.",
    "scientificLore": "Hợp chất Thuốc Súng Đen Pháo Hoa (KNO3-C-S) tổng hợp từ phản ứng hóa học kinh điển theo tỷ lệ mol bảo toàn nguyên tố GDPT 2018: 2KNO₃ + S + 3C → K₂S + N₂ + 3CO₂.",
    "relatedEquation": "2KNO₃ + S + 3C → K₂S + N₂ + 3CO₂",
    "iupacName": "Black Powder Pyroflame Complex",
    "archetype": "WERNER_COORDINATION",
    "structuredEffects": [
      {
        "effectId": "B11_EFF_69",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "HEAL_LP",
            "params": {
              "amount": 400
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 400
            }
          }
        ],
        "description": "Phản ứng tổng hợp: Hồi 400 LP và gây 400 LP sát thương."
      }
    ],
    "synthesisRecipe": {
      "reactantFormulas": [
        {
          "formula": "KNO3",
          "count": 2
        },
        {
          "formula": "S",
          "count": 1
        },
        {
          "formula": "C",
          "count": 3
        }
      ],
      "pedagogicalEquation": "2KNO₃ + S + 3C → K₂S + N₂ + 3CO₂"
    }
  },
  {
    "id": "card_b11_070_fusion_potash_alum_octahedron_70",
    "name": "Phèn Chua Kali Nhôm — Hợp Chất Tổng Hợp Bậc 7",
    "name_en": "Potash Alum Octahedron — Synthesis Compound Mk-7",
    "cardType": "COMPOUND_MONSTER",
    "rarity": "COMMON",
    "attribute": "AQUA",
    "manaCost": 7,
    "level": 8,
    "atk": 3330,
    "def": 3240,
    "chemicalFormula": "KAl(SO4)2·12H2O",
    "effectCode": "COMP_B11_POTASH_ALUM_OCTAHEDRON_SYN_70",
    "effectText": "[Triệu hồi Hợp Chất / Fusion]: Cần kết hợp đúng nguyên liệu hóa học. Khi triệu hồi thành công: Phục hồi 400 LP cho bản thân và gây 400 LP sát thương phản ứng lên đối thủ.",
    "scientificLore": "Hợp chất Phèn Chua Kali Nhôm (KAl(SO4)2·12H2O) tổng hợp từ phản ứng hóa học kinh điển theo tỷ lệ mol bảo toàn nguyên tố GDPT 2018: K₂SO₄ + Al₂(SO₄)₃ + 24H₂O → 2KAl(SO₄)₂·12H₂O.",
    "relatedEquation": "K₂SO₄ + Al₂(SO₄)₃ + 24H₂O → 2KAl(SO₄)₂·12H₂O",
    "iupacName": "Potash Alum Octahedron Complex",
    "archetype": "PETROCHEMICAL_REFINERY",
    "structuredEffects": [
      {
        "effectId": "B11_EFF_70",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "HEAL_LP",
            "params": {
              "amount": 400
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 400
            }
          }
        ],
        "description": "Phản ứng tổng hợp: Hồi 400 LP và gây 400 LP sát thương."
      }
    ],
    "synthesisRecipe": {
      "reactantFormulas": [
        {
          "formula": "K2SO4",
          "count": 1
        },
        {
          "formula": "Al2",
          "count": 1
        },
        {
          "formula": "H2O",
          "count": 24
        }
      ],
      "pedagogicalEquation": "K₂SO₄ + Al₂(SO₄)₃ + 24H₂O → 2KAl(SO₄)₂·12H₂O"
    }
  },
  {
    "id": "card_b11_071_fusion_pure_water_crystal_71",
    "name": "Nước Tinh Khiết — Hợp Chất Tổng Hợp Bậc 8",
    "name_en": "Pure Water Crystal — Synthesis Compound Mk-8",
    "cardType": "COMPOUND_MONSTER",
    "rarity": "COMMON",
    "attribute": "AQUA",
    "manaCost": 8,
    "level": 9,
    "atk": 3540,
    "def": 3150,
    "chemicalFormula": "H2O",
    "effectCode": "COMP_B11_PURE_WATER_CRYSTAL_SYN_71",
    "effectText": "[Triệu hồi Hợp Chất / Fusion]: Cần kết hợp đúng nguyên liệu hóa học. Khi triệu hồi thành công: Phục hồi 400 LP cho bản thân và gây 400 LP sát thương phản ứng lên đối thủ.",
    "scientificLore": "Hợp chất Nước Tinh Khiết (H2O) tổng hợp từ phản ứng hóa học kinh điển theo tỷ lệ mol bảo toàn nguyên tố GDPT 2018: 2H₂ + O₂ → 2H₂O.",
    "relatedEquation": "2H₂ + O₂ → 2H₂O",
    "iupacName": "Pure Water Crystal Complex",
    "archetype": "WERNER_COORDINATION",
    "structuredEffects": [
      {
        "effectId": "B11_EFF_71",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "HEAL_LP",
            "params": {
              "amount": 400
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 400
            }
          }
        ],
        "description": "Phản ứng tổng hợp: Hồi 400 LP và gây 400 LP sát thương."
      }
    ],
    "synthesisRecipe": {
      "reactantFormulas": [
        {
          "formula": "H2",
          "count": 2
        },
        {
          "formula": "O2",
          "count": 1
        }
      ],
      "pedagogicalEquation": "2H₂ + O₂ → 2H₂O"
    }
  },
  {
    "id": "card_b11_072_fusion_thermite_ignition_titan_72",
    "name": "Nhiệt Nhôm Thermite — Hợp Chất Tổng Hợp Bậc 8",
    "name_en": "Thermite Ignition Titan — Synthesis Compound Mk-8",
    "cardType": "COMPOUND_MONSTER",
    "rarity": "COMMON",
    "attribute": "PYRO",
    "manaCost": 8,
    "level": 10,
    "atk": 3750,
    "def": 3360,
    "chemicalFormula": "Fe+Al2O3",
    "effectCode": "COMP_B11_THERMITE_IGNITION_TITAN_SYN_72",
    "effectText": "[Triệu hồi Hợp Chất / Fusion]: Cần kết hợp đúng nguyên liệu hóa học. Khi triệu hồi thành công: Phục hồi 400 LP cho bản thân và gây 400 LP sát thương phản ứng lên đối thủ.",
    "scientificLore": "Hợp chất Nhiệt Nhôm Thermite (Fe+Al2O3) tổng hợp từ phản ứng hóa học kinh điển theo tỷ lệ mol bảo toàn nguyên tố GDPT 2018: Fe₂O₃ + 2Al → 2Fe + Al₂O₃ (2500°C).",
    "relatedEquation": "Fe₂O₃ + 2Al → 2Fe + Al₂O₃ (2500°C)",
    "iupacName": "Thermite Ignition Titan Complex",
    "archetype": "PETROCHEMICAL_REFINERY",
    "structuredEffects": [
      {
        "effectId": "B11_EFF_72",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "HEAL_LP",
            "params": {
              "amount": 400
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 400
            }
          }
        ],
        "description": "Phản ứng tổng hợp: Hồi 400 LP và gây 400 LP sát thương."
      }
    ],
    "synthesisRecipe": {
      "reactantFormulas": [
        {
          "formula": "Fe2O3",
          "count": 1
        },
        {
          "formula": "Al",
          "count": 2
        }
      ],
      "pedagogicalEquation": "Fe₂O₃ + 2Al → 2Fe + Al₂O₃ (2500°C)",
      "requiredCondition": "HIGH_TEMP"
    }
  },
  {
    "id": "card_b11_073_fusion_aqua_regia_sovereign_73",
    "name": "Nước Cường Toan Aqua Regia — Hợp Chất Tổng Hợp Bậc 8",
    "name_en": "Aqua Regia Sovereign — Synthesis Compound Mk-8",
    "cardType": "COMPOUND_MONSTER",
    "rarity": "RARE",
    "attribute": "ACID_DARK",
    "manaCost": 4,
    "level": 5,
    "atk": 2800,
    "def": 2670,
    "chemicalFormula": "HNO3·3HCl",
    "effectCode": "COMP_B11_AQUA_REGIA_SOVEREIGN_SYN_73",
    "effectText": "[Triệu hồi Hợp Chất / Fusion]: Cần kết hợp đúng nguyên liệu hóa học. Khi triệu hồi thành công: Phục hồi 400 LP cho bản thân và gây 400 LP sát thương phản ứng lên đối thủ.",
    "scientificLore": "Hợp chất Nước Cường Toan Aqua Regia (HNO3·3HCl) tổng hợp từ phản ứng hóa học kinh điển theo tỷ lệ mol bảo toàn nguyên tố GDPT 2018: Au + 3HNO₃ + 4HCl → HAuCl₄ + 3NO₂ + 3H₂O.",
    "relatedEquation": "Au + 3HNO₃ + 4HCl → HAuCl₄ + 3NO₂ + 3H₂O",
    "iupacName": "Aqua Regia Sovereign Complex",
    "archetype": "WERNER_COORDINATION",
    "structuredEffects": [
      {
        "effectId": "B11_EFF_73",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "HEAL_LP",
            "params": {
              "amount": 400
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 400
            }
          }
        ],
        "description": "Phản ứng tổng hợp: Hồi 400 LP và gây 400 LP sát thương."
      }
    ],
    "synthesisRecipe": {
      "reactantFormulas": [
        {
          "formula": "Au",
          "count": 1
        },
        {
          "formula": "HNO3",
          "count": 3
        },
        {
          "formula": "HCl",
          "count": 4
        }
      ],
      "pedagogicalEquation": "Au + 3HNO₃ + 4HCl → HAuCl₄ + 3NO₂ + 3H₂O"
    }
  },
  {
    "id": "card_b11_074_fusion_brass_alloy_golem_74",
    "name": "Đồng Thau Hợp Kim Brass — Hợp Chất Tổng Hợp Bậc 8",
    "name_en": "Brass Alloy Golem — Synthesis Compound Mk-8",
    "cardType": "COMPOUND_MONSTER",
    "rarity": "RARE",
    "attribute": "TERRA",
    "manaCost": 5,
    "level": 6,
    "atk": 3010,
    "def": 2880,
    "chemicalFormula": "Cu-Zn",
    "effectCode": "COMP_B11_BRASS_ALLOY_GOLEM_SYN_74",
    "effectText": "[Triệu hồi Hợp Chất / Fusion]: Cần kết hợp đúng nguyên liệu hóa học. Khi triệu hồi thành công: Phục hồi 400 LP cho bản thân và gây 400 LP sát thương phản ứng lên đối thủ.",
    "scientificLore": "Hợp chất Đồng Thau Hợp Kim Brass (Cu-Zn) tổng hợp từ phản ứng hóa học kinh điển theo tỷ lệ mol bảo toàn nguyên tố GDPT 2018: Cu + Zn → Cu-Zn Alloy Solid Solution.",
    "relatedEquation": "Cu + Zn → Cu-Zn Alloy Solid Solution",
    "iupacName": "Brass Alloy Golem Complex",
    "archetype": "PETROCHEMICAL_REFINERY",
    "structuredEffects": [
      {
        "effectId": "B11_EFF_74",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "HEAL_LP",
            "params": {
              "amount": 400
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 400
            }
          }
        ],
        "description": "Phản ứng tổng hợp: Hồi 400 LP và gây 400 LP sát thương."
      }
    ],
    "synthesisRecipe": {
      "reactantFormulas": [
        {
          "formula": "Cu",
          "count": 1
        },
        {
          "formula": "Zn",
          "count": 1
        }
      ],
      "pedagogicalEquation": "Cu + Zn → Cu-Zn Alloy Solid Solution"
    }
  },
  {
    "id": "card_b11_075_fusion_bronze_ancient_relic_75",
    "name": "Đồng Điếu Bronze Phù Điêu — Hợp Chất Tổng Hợp Bậc 8",
    "name_en": "Bronze Ancient Relic — Synthesis Compound Mk-8",
    "cardType": "COMPOUND_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "TERRA",
    "manaCost": 6,
    "level": 7,
    "atk": 3220,
    "def": 3090,
    "chemicalFormula": "Cu-Sn",
    "effectCode": "COMP_B11_BRONZE_ANCIENT_RELIC_SYN_75",
    "effectText": "[Triệu hồi Hợp Chất / Fusion]: Cần kết hợp đúng nguyên liệu hóa học. Khi triệu hồi thành công: Phục hồi 400 LP cho bản thân và gây 400 LP sát thương phản ứng lên đối thủ.",
    "scientificLore": "Hợp chất Đồng Điếu Bronze Phù Điêu (Cu-Sn) tổng hợp từ phản ứng hóa học kinh điển theo tỷ lệ mol bảo toàn nguyên tố GDPT 2018: Cu + Sn → Bronze Crystalline Matrix.",
    "relatedEquation": "Cu + Sn → Bronze Crystalline Matrix",
    "iupacName": "Bronze Ancient Relic Complex",
    "archetype": "WERNER_COORDINATION",
    "structuredEffects": [
      {
        "effectId": "B11_EFF_75",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "HEAL_LP",
            "params": {
              "amount": 400
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 400
            }
          }
        ],
        "description": "Phản ứng tổng hợp: Hồi 400 LP và gây 400 LP sát thương."
      }
    ],
    "synthesisRecipe": {
      "reactantFormulas": [
        {
          "formula": "Cu",
          "count": 1
        },
        {
          "formula": "Sn",
          "count": 1
        }
      ],
      "pedagogicalEquation": "Cu + Sn → Bronze Crystalline Matrix"
    }
  }
];
