// src/data/cards/batches/batch_12_extra_deck_synchro_catalysis.ts
// Batch 12: Extra Deck Synchro Monsters (75 cards)
// Automatically generated and validated for ELEMENTA Tactical TCG

import { PlayableCardDef } from '../../../domain/cardGameTypes';

export const BATCH_12_CARDS: PlayableCardDef[] = [
  {
    "id": "card_b12_001_synchro_platinum_catalytic_converter_1",
    "name": "Xúc Tác Bạch Kim Chuyển Hóa — Bậc 5 (Cộng Hưởng 1)",
    "name_en": "Platinum Catalytic Converter — Level 5 Synchro 1",
    "cardType": "SYNCHRO_MONSTER",
    "rarity": "RARE",
    "attribute": "NOBLE_VOID",
    "manaCost": 4,
    "level": 5,
    "synchroLevel": 5,
    "synchroMaterialsRequired": {
      "tunerCount": 1,
      "nonTunerMinCount": 1
    },
    "atk": 3050,
    "def": 2700,
    "chemicalFormula": "Pt/Rh/Pd",
    "effectCode": "SYNCHRO_B12_PLATINUM_CATALYTIC_CONVERTER_RES_1",
    "effectText": "1 Tuner + 1+ quái thú phi-Tuner có tổng Level bằng đúng 5. Khi được triệu hồi Đồng Bộ: Tăng 500 ATK cho bản thân và giảm 300 ATK tất cả quái thú địch.",
    "scientificLore": "Cộng hưởng xúc tác Xúc Tác Bạch Kim Chuyển Hóa (Pt/Rh/Pd) hạ thấp hàng rào năng lượng hoạt hóa Arrhenius, tăng tốc độ phản ứng lên hàng triệu lần theo SGK Hóa học 10 GDPT 2018.",
    "relatedEquation": "2CO + 2NO → 2CO₂ + N₂",
    "iupacName": "Platinum Catalytic Converter Catalyst",
    "archetype": "PRECIOUS_CATALYST",
    "structuredEffects": [
      {
        "effectId": "B12_EFF_1",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 500,
              "statTarget": "ATK",
              "targetScope": "SELF"
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Tăng 500 ATK cho bản thân, trừ 300 ATK toàn bộ quái thú đối phương."
      }
    ]
  },
  {
    "id": "card_b12_002_synchro_alpha_amylase_synchro_enzyme_2",
    "name": "Enzyme Đồng Bộ Amylase — Bậc 6 (Cộng Hưởng 1)",
    "name_en": "Alpha-Amylase Synchro Enzyme — Level 6 Synchro 1",
    "cardType": "SYNCHRO_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "AQUA",
    "manaCost": 5,
    "level": 6,
    "synchroLevel": 6,
    "synchroMaterialsRequired": {
      "tunerCount": 1,
      "nonTunerMinCount": 1
    },
    "atk": 3260,
    "def": 2910,
    "chemicalFormula": "Enzyme",
    "effectCode": "SYNCHRO_B12_ALPHA_AMYLASE_SYNCHRO_ENZYME_RES_2",
    "effectText": "1 Tuner + 1+ quái thú phi-Tuner có tổng Level bằng đúng 6. Khi được triệu hồi Đồng Bộ: Tăng 500 ATK cho bản thân và giảm 300 ATK tất cả quái thú địch.",
    "scientificLore": "Cộng hưởng xúc tác Enzyme Đồng Bộ Amylase (Enzyme) hạ thấp hàng rào năng lượng hoạt hóa Arrhenius, tăng tốc độ phản ứng lên hàng triệu lần theo SGK Hóa học 10 GDPT 2018.",
    "relatedEquation": "(C₆H₁₀O₅)n + nH₂O --Amylase--> nC₁₂H₂₂O₁₁",
    "iupacName": "Alpha-Amylase Synchro Enzyme Catalyst",
    "archetype": "THERMAL_KINETICS",
    "structuredEffects": [
      {
        "effectId": "B12_EFF_2",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 500,
              "statTarget": "ATK",
              "targetScope": "SELF"
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Tăng 500 ATK cho bản thân, trừ 300 ATK toàn bộ quái thú đối phương."
      }
    ]
  },
  {
    "id": "card_b12_003_synchro_tio2_photocatalytic_resonance_3",
    "name": "Quang Xúc Tác Titan Dioxit — Bậc 7 (Cộng Hưởng 1)",
    "name_en": "TiO2 Photocatalytic Resonance — Level 7 Synchro 1",
    "cardType": "SYNCHRO_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "ELECTRO",
    "manaCost": 6,
    "level": 7,
    "synchroLevel": 7,
    "synchroMaterialsRequired": {
      "tunerCount": 1,
      "nonTunerMinCount": 1
    },
    "atk": 3470,
    "def": 3120,
    "chemicalFormula": "TiO2/UV",
    "effectCode": "SYNCHRO_B12_TIO2_PHOTOCATALYTIC_RESONANCE_RES_3",
    "effectText": "1 Tuner + 1+ quái thú phi-Tuner có tổng Level bằng đúng 7. Khi được triệu hồi Đồng Bộ: Tăng 500 ATK cho bản thân và giảm 300 ATK tất cả quái thú địch.",
    "scientificLore": "Cộng hưởng xúc tác Quang Xúc Tác Titan Dioxit (TiO2/UV) hạ thấp hàng rào năng lượng hoạt hóa Arrhenius, tăng tốc độ phản ứng lên hàng triệu lần theo SGK Hóa học 10 GDPT 2018.",
    "relatedEquation": "TiO₂ + hν → e⁻ + h⁺ → ·OH + ·O₂⁻",
    "iupacName": "TiO2 Photocatalytic Resonance Catalyst",
    "archetype": "PRECIOUS_CATALYST",
    "structuredEffects": [
      {
        "effectId": "B12_EFF_3",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 500,
              "statTarget": "ATK",
              "targetScope": "SELF"
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Tăng 500 ATK cho bản thân, trừ 300 ATK toàn bộ quái thú đối phương."
      }
    ]
  },
  {
    "id": "card_b12_004_synchro_haber_iron_catalyst_core_4",
    "name": "Xúc Tác Sắt Tổng Hợp Amoniac — Bậc 8 (Cộng Hưởng 1)",
    "name_en": "Haber Iron Catalyst Core — Level 8 Synchro 1",
    "cardType": "SYNCHRO_MONSTER",
    "rarity": "ULTRA_RARE",
    "attribute": "PYRO",
    "manaCost": 7,
    "level": 8,
    "synchroLevel": 8,
    "synchroMaterialsRequired": {
      "tunerCount": 1,
      "nonTunerMinCount": 1
    },
    "atk": 3680,
    "def": 3330,
    "chemicalFormula": "Fe-K2O-Al2O3",
    "effectCode": "SYNCHRO_B12_HABER_IRON_CATALYST_CORE_RES_4",
    "effectText": "1 Tuner + 1+ quái thú phi-Tuner có tổng Level bằng đúng 8. Khi được triệu hồi Đồng Bộ: Tăng 500 ATK cho bản thân và giảm 300 ATK tất cả quái thú địch.",
    "scientificLore": "Cộng hưởng xúc tác Xúc Tác Sắt Tổng Hợp Amoniac (Fe-K2O-Al2O3) hạ thấp hàng rào năng lượng hoạt hóa Arrhenius, tăng tốc độ phản ứng lên hàng triệu lần theo SGK Hóa học 10 GDPT 2018.",
    "relatedEquation": "N₂ + 3H₂ --Fe/450°C/200atm--> 2NH₃",
    "iupacName": "Haber Iron Catalyst Core Catalyst",
    "archetype": "THERMAL_KINETICS",
    "structuredEffects": [
      {
        "effectId": "B12_EFF_4",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 500,
              "statTarget": "ATK",
              "targetScope": "SELF"
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Tăng 500 ATK cho bản thân, trừ 300 ATK toàn bộ quái thú đối phương."
      }
    ]
  },
  {
    "id": "card_b12_005_synchro_vanadium_pentoxide_converter_5",
    "name": "Xúc Tác Vani Đen Tiếp Xúc — Bậc 9 (Cộng Hưởng 1)",
    "name_en": "Vanadium Pentoxide Converter — Level 9 Synchro 1",
    "cardType": "SYNCHRO_MONSTER",
    "rarity": "SECRET_RARE",
    "attribute": "TERRA",
    "manaCost": 8,
    "level": 9,
    "synchroLevel": 9,
    "synchroMaterialsRequired": {
      "tunerCount": 1,
      "nonTunerMinCount": 1
    },
    "atk": 3730,
    "def": 3540,
    "chemicalFormula": "V2O5",
    "effectCode": "SYNCHRO_B12_VANADIUM_PENTOXIDE_CONVERTER_RES_5",
    "effectText": "1 Tuner + 1+ quái thú phi-Tuner có tổng Level bằng đúng 9. Khi được triệu hồi Đồng Bộ: Tăng 500 ATK cho bản thân và giảm 300 ATK tất cả quái thú địch.",
    "scientificLore": "Cộng hưởng xúc tác Xúc Tác Vani Đen Tiếp Xúc (V2O5) hạ thấp hàng rào năng lượng hoạt hóa Arrhenius, tăng tốc độ phản ứng lên hàng triệu lần theo SGK Hóa học 10 GDPT 2018.",
    "relatedEquation": "2SO₂ + O₂ --V₂O₅/450°C--> 2SO₃",
    "iupacName": "Vanadium Pentoxide Converter Catalyst",
    "archetype": "PRECIOUS_CATALYST",
    "structuredEffects": [
      {
        "effectId": "B12_EFF_5",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 500,
              "statTarget": "ATK",
              "targetScope": "SELF"
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Tăng 500 ATK cho bản thân, trừ 300 ATK toàn bộ quái thú đối phương."
      }
    ]
  },
  {
    "id": "card_b12_006_synchro_metallocene_stereospecific_synchro_6",
    "name": "Xúc Tác Cơ Kim Metallocene — Bậc 10 (Cộng Hưởng 1)",
    "name_en": "Metallocene Stereospecific Synchro — Level 10 Synchro 1",
    "cardType": "SYNCHRO_MONSTER",
    "rarity": "COMMON",
    "attribute": "ELECTRO",
    "manaCost": 8,
    "level": 10,
    "synchroLevel": 10,
    "synchroMaterialsRequired": {
      "tunerCount": 1,
      "nonTunerMinCount": 1
    },
    "atk": 3940,
    "def": 3500,
    "chemicalFormula": "Cp2ZrCl2",
    "effectCode": "SYNCHRO_B12_METALLOCENE_STEREOSPECIFIC_SYNCHRO_RES_6",
    "effectText": "1 Tuner + 1+ quái thú phi-Tuner có tổng Level bằng đúng 10. Khi được triệu hồi Đồng Bộ: Tăng 500 ATK cho bản thân và giảm 300 ATK tất cả quái thú địch.",
    "scientificLore": "Cộng hưởng xúc tác Xúc Tác Cơ Kim Metallocene (Cp2ZrCl2) hạ thấp hàng rào năng lượng hoạt hóa Arrhenius, tăng tốc độ phản ứng lên hàng triệu lần theo SGK Hóa học 10 GDPT 2018.",
    "relatedEquation": "Isotactic Polypropylene Synthesis Center",
    "iupacName": "Metallocene Stereospecific Synchro Catalyst",
    "archetype": "THERMAL_KINETICS",
    "structuredEffects": [
      {
        "effectId": "B12_EFF_6",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 500,
              "statTarget": "ATK",
              "targetScope": "SELF"
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Tăng 500 ATK cho bản thân, trừ 300 ATK toàn bộ quái thú đối phương."
      }
    ]
  },
  {
    "id": "card_b12_007_synchro_grubbs_olefin_metathesis_engine_7",
    "name": "Phức Xúc Tác Grubbs Đổi Vị — Bậc 5 (Cộng Hưởng 1)",
    "name_en": "Grubbs Olefin Metathesis Engine — Level 5 Synchro 1",
    "cardType": "SYNCHRO_MONSTER",
    "rarity": "COMMON",
    "attribute": "TERRA",
    "manaCost": 4,
    "level": 5,
    "synchroLevel": 5,
    "synchroMaterialsRequired": {
      "tunerCount": 1,
      "nonTunerMinCount": 1
    },
    "atk": 3130,
    "def": 2750,
    "chemicalFormula": "Ru-Carbene",
    "effectCode": "SYNCHRO_B12_GRUBBS_OLEFIN_METATHESIS_ENGINE_RES_7",
    "effectText": "1 Tuner + 1+ quái thú phi-Tuner có tổng Level bằng đúng 5. Khi được triệu hồi Đồng Bộ: Tăng 500 ATK cho bản thân và giảm 300 ATK tất cả quái thú địch.",
    "scientificLore": "Cộng hưởng xúc tác Phức Xúc Tác Grubbs Đổi Vị (Ru-Carbene) hạ thấp hàng rào năng lượng hoạt hóa Arrhenius, tăng tốc độ phản ứng lên hàng triệu lần theo SGK Hóa học 10 GDPT 2018.",
    "relatedEquation": "Alkene Metathesis Cleavage & Recombination",
    "iupacName": "Grubbs Olefin Metathesis Engine Catalyst",
    "archetype": "PRECIOUS_CATALYST",
    "structuredEffects": [
      {
        "effectId": "B12_EFF_7",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 500,
              "statTarget": "ATK",
              "targetScope": "SELF"
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Tăng 500 ATK cho bản thân, trừ 300 ATK toàn bộ quái thú đối phương."
      }
    ]
  },
  {
    "id": "card_b12_008_synchro_lipase_biocatalyst_resonance_8",
    "name": "Men Sinh Học Lipase — Bậc 6 (Cộng Hưởng 1)",
    "name_en": "Lipase Biocatalyst Resonance — Level 6 Synchro 1",
    "cardType": "SYNCHRO_MONSTER",
    "rarity": "COMMON",
    "attribute": "AQUA",
    "manaCost": 5,
    "level": 6,
    "synchroLevel": 6,
    "synchroMaterialsRequired": {
      "tunerCount": 1,
      "nonTunerMinCount": 1
    },
    "atk": 3340,
    "def": 2960,
    "chemicalFormula": "Lipase",
    "effectCode": "SYNCHRO_B12_LIPASE_BIOCATALYST_RESONANCE_RES_8",
    "effectText": "1 Tuner + 1+ quái thú phi-Tuner có tổng Level bằng đúng 6. Khi được triệu hồi Đồng Bộ: Tăng 500 ATK cho bản thân và giảm 300 ATK tất cả quái thú địch.",
    "scientificLore": "Cộng hưởng xúc tác Men Sinh Học Lipase (Lipase) hạ thấp hàng rào năng lượng hoạt hóa Arrhenius, tăng tốc độ phản ứng lên hàng triệu lần theo SGK Hóa học 10 GDPT 2018.",
    "relatedEquation": "Triglyceride Hydrolysis Active Site",
    "iupacName": "Lipase Biocatalyst Resonance Catalyst",
    "archetype": "THERMAL_KINETICS",
    "structuredEffects": [
      {
        "effectId": "B12_EFF_8",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 500,
              "statTarget": "ATK",
              "targetScope": "SELF"
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Tăng 500 ATK cho bản thân, trừ 300 ATK toàn bộ quái thú đối phương."
      }
    ]
  },
  {
    "id": "card_b12_009_synchro_platinum_catalytic_converter_9",
    "name": "Xúc Tác Bạch Kim Chuyển Hóa — Bậc 7 (Cộng Hưởng 2)",
    "name_en": "Platinum Catalytic Converter — Level 7 Synchro 2",
    "cardType": "SYNCHRO_MONSTER",
    "rarity": "RARE",
    "attribute": "NOBLE_VOID",
    "manaCost": 6,
    "level": 7,
    "synchroLevel": 7,
    "synchroMaterialsRequired": {
      "tunerCount": 1,
      "nonTunerMinCount": 1
    },
    "atk": 3390,
    "def": 3170,
    "chemicalFormula": "Pt/Rh/Pd",
    "effectCode": "SYNCHRO_B12_PLATINUM_CATALYTIC_CONVERTER_RES_9",
    "effectText": "1 Tuner + 1+ quái thú phi-Tuner có tổng Level bằng đúng 7. Khi được triệu hồi Đồng Bộ: Tăng 500 ATK cho bản thân và giảm 300 ATK tất cả quái thú địch.",
    "scientificLore": "Cộng hưởng xúc tác Xúc Tác Bạch Kim Chuyển Hóa (Pt/Rh/Pd) hạ thấp hàng rào năng lượng hoạt hóa Arrhenius, tăng tốc độ phản ứng lên hàng triệu lần theo SGK Hóa học 10 GDPT 2018.",
    "relatedEquation": "2CO + 2NO → 2CO₂ + N₂",
    "iupacName": "Platinum Catalytic Converter Catalyst",
    "archetype": "PRECIOUS_CATALYST",
    "structuredEffects": [
      {
        "effectId": "B12_EFF_9",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 500,
              "statTarget": "ATK",
              "targetScope": "SELF"
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Tăng 500 ATK cho bản thân, trừ 300 ATK toàn bộ quái thú đối phương."
      }
    ]
  },
  {
    "id": "card_b12_010_synchro_alpha_amylase_synchro_enzyme_10",
    "name": "Enzyme Đồng Bộ Amylase — Bậc 8 (Cộng Hưởng 2)",
    "name_en": "Alpha-Amylase Synchro Enzyme — Level 8 Synchro 2",
    "cardType": "SYNCHRO_MONSTER",
    "rarity": "RARE",
    "attribute": "AQUA",
    "manaCost": 7,
    "level": 8,
    "synchroLevel": 8,
    "synchroMaterialsRequired": {
      "tunerCount": 1,
      "nonTunerMinCount": 1
    },
    "atk": 3600,
    "def": 3380,
    "chemicalFormula": "Enzyme",
    "effectCode": "SYNCHRO_B12_ALPHA_AMYLASE_SYNCHRO_ENZYME_RES_10",
    "effectText": "1 Tuner + 1+ quái thú phi-Tuner có tổng Level bằng đúng 8. Khi được triệu hồi Đồng Bộ: Tăng 500 ATK cho bản thân và giảm 300 ATK tất cả quái thú địch.",
    "scientificLore": "Cộng hưởng xúc tác Enzyme Đồng Bộ Amylase (Enzyme) hạ thấp hàng rào năng lượng hoạt hóa Arrhenius, tăng tốc độ phản ứng lên hàng triệu lần theo SGK Hóa học 10 GDPT 2018.",
    "relatedEquation": "(C₆H₁₀O₅)n + nH₂O --Amylase--> nC₁₂H₂₂O₁₁",
    "iupacName": "Alpha-Amylase Synchro Enzyme Catalyst",
    "archetype": "THERMAL_KINETICS",
    "structuredEffects": [
      {
        "effectId": "B12_EFF_10",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 500,
              "statTarget": "ATK",
              "targetScope": "SELF"
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Tăng 500 ATK cho bản thân, trừ 300 ATK toàn bộ quái thú đối phương."
      }
    ]
  },
  {
    "id": "card_b12_011_synchro_tio2_photocatalytic_resonance_11",
    "name": "Quang Xúc Tác Titan Dioxit — Bậc 9 (Cộng Hưởng 2)",
    "name_en": "TiO2 Photocatalytic Resonance — Level 9 Synchro 2",
    "cardType": "SYNCHRO_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "ELECTRO",
    "manaCost": 8,
    "level": 9,
    "synchroLevel": 9,
    "synchroMaterialsRequired": {
      "tunerCount": 1,
      "nonTunerMinCount": 1
    },
    "atk": 3810,
    "def": 3340,
    "chemicalFormula": "TiO2/UV",
    "effectCode": "SYNCHRO_B12_TIO2_PHOTOCATALYTIC_RESONANCE_RES_11",
    "effectText": "1 Tuner + 1+ quái thú phi-Tuner có tổng Level bằng đúng 9. Khi được triệu hồi Đồng Bộ: Tăng 500 ATK cho bản thân và giảm 300 ATK tất cả quái thú địch.",
    "scientificLore": "Cộng hưởng xúc tác Quang Xúc Tác Titan Dioxit (TiO2/UV) hạ thấp hàng rào năng lượng hoạt hóa Arrhenius, tăng tốc độ phản ứng lên hàng triệu lần theo SGK Hóa học 10 GDPT 2018.",
    "relatedEquation": "TiO₂ + hν → e⁻ + h⁺ → ·OH + ·O₂⁻",
    "iupacName": "TiO2 Photocatalytic Resonance Catalyst",
    "archetype": "PRECIOUS_CATALYST",
    "structuredEffects": [
      {
        "effectId": "B12_EFF_11",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 500,
              "statTarget": "ATK",
              "targetScope": "SELF"
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Tăng 500 ATK cho bản thân, trừ 300 ATK toàn bộ quái thú đối phương."
      }
    ]
  },
  {
    "id": "card_b12_012_synchro_haber_iron_catalyst_core_12",
    "name": "Xúc Tác Sắt Tổng Hợp Amoniac — Bậc 10 (Cộng Hưởng 2)",
    "name_en": "Haber Iron Catalyst Core — Level 10 Synchro 2",
    "cardType": "SYNCHRO_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "PYRO",
    "manaCost": 8,
    "level": 10,
    "synchroLevel": 10,
    "synchroMaterialsRequired": {
      "tunerCount": 1,
      "nonTunerMinCount": 1
    },
    "atk": 4020,
    "def": 3550,
    "chemicalFormula": "Fe-K2O-Al2O3",
    "effectCode": "SYNCHRO_B12_HABER_IRON_CATALYST_CORE_RES_12",
    "effectText": "1 Tuner + 1+ quái thú phi-Tuner có tổng Level bằng đúng 10. Khi được triệu hồi Đồng Bộ: Tăng 500 ATK cho bản thân và giảm 300 ATK tất cả quái thú địch.",
    "scientificLore": "Cộng hưởng xúc tác Xúc Tác Sắt Tổng Hợp Amoniac (Fe-K2O-Al2O3) hạ thấp hàng rào năng lượng hoạt hóa Arrhenius, tăng tốc độ phản ứng lên hàng triệu lần theo SGK Hóa học 10 GDPT 2018.",
    "relatedEquation": "N₂ + 3H₂ --Fe/450°C/200atm--> 2NH₃",
    "iupacName": "Haber Iron Catalyst Core Catalyst",
    "archetype": "THERMAL_KINETICS",
    "structuredEffects": [
      {
        "effectId": "B12_EFF_12",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 500,
              "statTarget": "ATK",
              "targetScope": "SELF"
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Tăng 500 ATK cho bản thân, trừ 300 ATK toàn bộ quái thú đối phương."
      }
    ]
  },
  {
    "id": "card_b12_013_synchro_vanadium_pentoxide_converter_13",
    "name": "Xúc Tác Vani Đen Tiếp Xúc — Bậc 5 (Cộng Hưởng 2)",
    "name_en": "Vanadium Pentoxide Converter — Level 5 Synchro 2",
    "cardType": "SYNCHRO_MONSTER",
    "rarity": "ULTRA_RARE",
    "attribute": "TERRA",
    "manaCost": 4,
    "level": 5,
    "synchroLevel": 5,
    "synchroMaterialsRequired": {
      "tunerCount": 1,
      "nonTunerMinCount": 1
    },
    "atk": 3050,
    "def": 2800,
    "chemicalFormula": "V2O5",
    "effectCode": "SYNCHRO_B12_VANADIUM_PENTOXIDE_CONVERTER_RES_13",
    "effectText": "1 Tuner + 1+ quái thú phi-Tuner có tổng Level bằng đúng 5. Khi được triệu hồi Đồng Bộ: Tăng 500 ATK cho bản thân và giảm 300 ATK tất cả quái thú địch.",
    "scientificLore": "Cộng hưởng xúc tác Xúc Tác Vani Đen Tiếp Xúc (V2O5) hạ thấp hàng rào năng lượng hoạt hóa Arrhenius, tăng tốc độ phản ứng lên hàng triệu lần theo SGK Hóa học 10 GDPT 2018.",
    "relatedEquation": "2SO₂ + O₂ --V₂O₅/450°C--> 2SO₃",
    "iupacName": "Vanadium Pentoxide Converter Catalyst",
    "archetype": "PRECIOUS_CATALYST",
    "structuredEffects": [
      {
        "effectId": "B12_EFF_13",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 500,
              "statTarget": "ATK",
              "targetScope": "SELF"
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Tăng 500 ATK cho bản thân, trừ 300 ATK toàn bộ quái thú đối phương."
      }
    ]
  },
  {
    "id": "card_b12_014_synchro_metallocene_stereospecific_synchro_14",
    "name": "Xúc Tác Cơ Kim Metallocene — Bậc 6 (Cộng Hưởng 2)",
    "name_en": "Metallocene Stereospecific Synchro — Level 6 Synchro 2",
    "cardType": "SYNCHRO_MONSTER",
    "rarity": "SECRET_RARE",
    "attribute": "ELECTRO",
    "manaCost": 5,
    "level": 6,
    "synchroLevel": 6,
    "synchroMaterialsRequired": {
      "tunerCount": 1,
      "nonTunerMinCount": 1
    },
    "atk": 3260,
    "def": 3010,
    "chemicalFormula": "Cp2ZrCl2",
    "effectCode": "SYNCHRO_B12_METALLOCENE_STEREOSPECIFIC_SYNCHRO_RES_14",
    "effectText": "1 Tuner + 1+ quái thú phi-Tuner có tổng Level bằng đúng 6. Khi được triệu hồi Đồng Bộ: Tăng 500 ATK cho bản thân và giảm 300 ATK tất cả quái thú địch.",
    "scientificLore": "Cộng hưởng xúc tác Xúc Tác Cơ Kim Metallocene (Cp2ZrCl2) hạ thấp hàng rào năng lượng hoạt hóa Arrhenius, tăng tốc độ phản ứng lên hàng triệu lần theo SGK Hóa học 10 GDPT 2018.",
    "relatedEquation": "Isotactic Polypropylene Synthesis Center",
    "iupacName": "Metallocene Stereospecific Synchro Catalyst",
    "archetype": "THERMAL_KINETICS",
    "structuredEffects": [
      {
        "effectId": "B12_EFF_14",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 500,
              "statTarget": "ATK",
              "targetScope": "SELF"
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Tăng 500 ATK cho bản thân, trừ 300 ATK toàn bộ quái thú đối phương."
      }
    ]
  },
  {
    "id": "card_b12_015_synchro_grubbs_olefin_metathesis_engine_15",
    "name": "Phức Xúc Tác Grubbs Đổi Vị — Bậc 7 (Cộng Hưởng 2)",
    "name_en": "Grubbs Olefin Metathesis Engine — Level 7 Synchro 2",
    "cardType": "SYNCHRO_MONSTER",
    "rarity": "COMMON",
    "attribute": "TERRA",
    "manaCost": 6,
    "level": 7,
    "synchroLevel": 7,
    "synchroMaterialsRequired": {
      "tunerCount": 1,
      "nonTunerMinCount": 1
    },
    "atk": 3470,
    "def": 3220,
    "chemicalFormula": "Ru-Carbene",
    "effectCode": "SYNCHRO_B12_GRUBBS_OLEFIN_METATHESIS_ENGINE_RES_15",
    "effectText": "1 Tuner + 1+ quái thú phi-Tuner có tổng Level bằng đúng 7. Khi được triệu hồi Đồng Bộ: Tăng 500 ATK cho bản thân và giảm 300 ATK tất cả quái thú địch.",
    "scientificLore": "Cộng hưởng xúc tác Phức Xúc Tác Grubbs Đổi Vị (Ru-Carbene) hạ thấp hàng rào năng lượng hoạt hóa Arrhenius, tăng tốc độ phản ứng lên hàng triệu lần theo SGK Hóa học 10 GDPT 2018.",
    "relatedEquation": "Alkene Metathesis Cleavage & Recombination",
    "iupacName": "Grubbs Olefin Metathesis Engine Catalyst",
    "archetype": "PRECIOUS_CATALYST",
    "structuredEffects": [
      {
        "effectId": "B12_EFF_15",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 500,
              "statTarget": "ATK",
              "targetScope": "SELF"
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Tăng 500 ATK cho bản thân, trừ 300 ATK toàn bộ quái thú đối phương."
      }
    ]
  },
  {
    "id": "card_b12_016_synchro_lipase_biocatalyst_resonance_16",
    "name": "Men Sinh Học Lipase — Bậc 8 (Cộng Hưởng 2)",
    "name_en": "Lipase Biocatalyst Resonance — Level 8 Synchro 2",
    "cardType": "SYNCHRO_MONSTER",
    "rarity": "COMMON",
    "attribute": "AQUA",
    "manaCost": 7,
    "level": 8,
    "synchroLevel": 8,
    "synchroMaterialsRequired": {
      "tunerCount": 1,
      "nonTunerMinCount": 1
    },
    "atk": 3680,
    "def": 3180,
    "chemicalFormula": "Lipase",
    "effectCode": "SYNCHRO_B12_LIPASE_BIOCATALYST_RESONANCE_RES_16",
    "effectText": "1 Tuner + 1+ quái thú phi-Tuner có tổng Level bằng đúng 8. Khi được triệu hồi Đồng Bộ: Tăng 500 ATK cho bản thân và giảm 300 ATK tất cả quái thú địch.",
    "scientificLore": "Cộng hưởng xúc tác Men Sinh Học Lipase (Lipase) hạ thấp hàng rào năng lượng hoạt hóa Arrhenius, tăng tốc độ phản ứng lên hàng triệu lần theo SGK Hóa học 10 GDPT 2018.",
    "relatedEquation": "Triglyceride Hydrolysis Active Site",
    "iupacName": "Lipase Biocatalyst Resonance Catalyst",
    "archetype": "THERMAL_KINETICS",
    "structuredEffects": [
      {
        "effectId": "B12_EFF_16",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 500,
              "statTarget": "ATK",
              "targetScope": "SELF"
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Tăng 500 ATK cho bản thân, trừ 300 ATK toàn bộ quái thú đối phương."
      }
    ]
  },
  {
    "id": "card_b12_017_synchro_platinum_catalytic_converter_17",
    "name": "Xúc Tác Bạch Kim Chuyển Hóa — Bậc 9 (Cộng Hưởng 3)",
    "name_en": "Platinum Catalytic Converter — Level 9 Synchro 3",
    "cardType": "SYNCHRO_MONSTER",
    "rarity": "COMMON",
    "attribute": "NOBLE_VOID",
    "manaCost": 8,
    "level": 9,
    "synchroLevel": 9,
    "synchroMaterialsRequired": {
      "tunerCount": 1,
      "nonTunerMinCount": 1
    },
    "atk": 3730,
    "def": 3390,
    "chemicalFormula": "Pt/Rh/Pd",
    "effectCode": "SYNCHRO_B12_PLATINUM_CATALYTIC_CONVERTER_RES_17",
    "effectText": "1 Tuner + 1+ quái thú phi-Tuner có tổng Level bằng đúng 9. Khi được triệu hồi Đồng Bộ: Tăng 500 ATK cho bản thân và giảm 300 ATK tất cả quái thú địch.",
    "scientificLore": "Cộng hưởng xúc tác Xúc Tác Bạch Kim Chuyển Hóa (Pt/Rh/Pd) hạ thấp hàng rào năng lượng hoạt hóa Arrhenius, tăng tốc độ phản ứng lên hàng triệu lần theo SGK Hóa học 10 GDPT 2018.",
    "relatedEquation": "2CO + 2NO → 2CO₂ + N₂",
    "iupacName": "Platinum Catalytic Converter Catalyst",
    "archetype": "PRECIOUS_CATALYST",
    "structuredEffects": [
      {
        "effectId": "B12_EFF_17",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 500,
              "statTarget": "ATK",
              "targetScope": "SELF"
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Tăng 500 ATK cho bản thân, trừ 300 ATK toàn bộ quái thú đối phương."
      }
    ]
  },
  {
    "id": "card_b12_018_synchro_alpha_amylase_synchro_enzyme_18",
    "name": "Enzyme Đồng Bộ Amylase — Bậc 10 (Cộng Hưởng 3)",
    "name_en": "Alpha-Amylase Synchro Enzyme — Level 10 Synchro 3",
    "cardType": "SYNCHRO_MONSTER",
    "rarity": "RARE",
    "attribute": "AQUA",
    "manaCost": 8,
    "level": 10,
    "synchroLevel": 10,
    "synchroMaterialsRequired": {
      "tunerCount": 1,
      "nonTunerMinCount": 1
    },
    "atk": 3940,
    "def": 3600,
    "chemicalFormula": "Enzyme",
    "effectCode": "SYNCHRO_B12_ALPHA_AMYLASE_SYNCHRO_ENZYME_RES_18",
    "effectText": "1 Tuner + 1+ quái thú phi-Tuner có tổng Level bằng đúng 10. Khi được triệu hồi Đồng Bộ: Tăng 500 ATK cho bản thân và giảm 300 ATK tất cả quái thú địch.",
    "scientificLore": "Cộng hưởng xúc tác Enzyme Đồng Bộ Amylase (Enzyme) hạ thấp hàng rào năng lượng hoạt hóa Arrhenius, tăng tốc độ phản ứng lên hàng triệu lần theo SGK Hóa học 10 GDPT 2018.",
    "relatedEquation": "(C₆H₁₀O₅)n + nH₂O --Amylase--> nC₁₂H₂₂O₁₁",
    "iupacName": "Alpha-Amylase Synchro Enzyme Catalyst",
    "archetype": "THERMAL_KINETICS",
    "structuredEffects": [
      {
        "effectId": "B12_EFF_18",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 500,
              "statTarget": "ATK",
              "targetScope": "SELF"
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Tăng 500 ATK cho bản thân, trừ 300 ATK toàn bộ quái thú đối phương."
      }
    ]
  },
  {
    "id": "card_b12_019_synchro_tio2_photocatalytic_resonance_19",
    "name": "Quang Xúc Tác Titan Dioxit — Bậc 5 (Cộng Hưởng 3)",
    "name_en": "TiO2 Photocatalytic Resonance — Level 5 Synchro 3",
    "cardType": "SYNCHRO_MONSTER",
    "rarity": "RARE",
    "attribute": "ELECTRO",
    "manaCost": 4,
    "level": 5,
    "synchroLevel": 5,
    "synchroMaterialsRequired": {
      "tunerCount": 1,
      "nonTunerMinCount": 1
    },
    "atk": 3130,
    "def": 2850,
    "chemicalFormula": "TiO2/UV",
    "effectCode": "SYNCHRO_B12_TIO2_PHOTOCATALYTIC_RESONANCE_RES_19",
    "effectText": "1 Tuner + 1+ quái thú phi-Tuner có tổng Level bằng đúng 5. Khi được triệu hồi Đồng Bộ: Tăng 500 ATK cho bản thân và giảm 300 ATK tất cả quái thú địch.",
    "scientificLore": "Cộng hưởng xúc tác Quang Xúc Tác Titan Dioxit (TiO2/UV) hạ thấp hàng rào năng lượng hoạt hóa Arrhenius, tăng tốc độ phản ứng lên hàng triệu lần theo SGK Hóa học 10 GDPT 2018.",
    "relatedEquation": "TiO₂ + hν → e⁻ + h⁺ → ·OH + ·O₂⁻",
    "iupacName": "TiO2 Photocatalytic Resonance Catalyst",
    "archetype": "PRECIOUS_CATALYST",
    "structuredEffects": [
      {
        "effectId": "B12_EFF_19",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 500,
              "statTarget": "ATK",
              "targetScope": "SELF"
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Tăng 500 ATK cho bản thân, trừ 300 ATK toàn bộ quái thú đối phương."
      }
    ]
  },
  {
    "id": "card_b12_020_synchro_haber_iron_catalyst_core_20",
    "name": "Xúc Tác Sắt Tổng Hợp Amoniac — Bậc 6 (Cộng Hưởng 3)",
    "name_en": "Haber Iron Catalyst Core — Level 6 Synchro 3",
    "cardType": "SYNCHRO_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "PYRO",
    "manaCost": 5,
    "level": 6,
    "synchroLevel": 6,
    "synchroMaterialsRequired": {
      "tunerCount": 1,
      "nonTunerMinCount": 1
    },
    "atk": 3340,
    "def": 3060,
    "chemicalFormula": "Fe-K2O-Al2O3",
    "effectCode": "SYNCHRO_B12_HABER_IRON_CATALYST_CORE_RES_20",
    "effectText": "1 Tuner + 1+ quái thú phi-Tuner có tổng Level bằng đúng 6. Khi được triệu hồi Đồng Bộ: Tăng 500 ATK cho bản thân và giảm 300 ATK tất cả quái thú địch.",
    "scientificLore": "Cộng hưởng xúc tác Xúc Tác Sắt Tổng Hợp Amoniac (Fe-K2O-Al2O3) hạ thấp hàng rào năng lượng hoạt hóa Arrhenius, tăng tốc độ phản ứng lên hàng triệu lần theo SGK Hóa học 10 GDPT 2018.",
    "relatedEquation": "N₂ + 3H₂ --Fe/450°C/200atm--> 2NH₃",
    "iupacName": "Haber Iron Catalyst Core Catalyst",
    "archetype": "THERMAL_KINETICS",
    "structuredEffects": [
      {
        "effectId": "B12_EFF_20",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 500,
              "statTarget": "ATK",
              "targetScope": "SELF"
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Tăng 500 ATK cho bản thân, trừ 300 ATK toàn bộ quái thú đối phương."
      }
    ]
  },
  {
    "id": "card_b12_021_synchro_vanadium_pentoxide_converter_21",
    "name": "Xúc Tác Vani Đen Tiếp Xúc — Bậc 7 (Cộng Hưởng 3)",
    "name_en": "Vanadium Pentoxide Converter — Level 7 Synchro 3",
    "cardType": "SYNCHRO_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "TERRA",
    "manaCost": 6,
    "level": 7,
    "synchroLevel": 7,
    "synchroMaterialsRequired": {
      "tunerCount": 1,
      "nonTunerMinCount": 1
    },
    "atk": 3390,
    "def": 3020,
    "chemicalFormula": "V2O5",
    "effectCode": "SYNCHRO_B12_VANADIUM_PENTOXIDE_CONVERTER_RES_21",
    "effectText": "1 Tuner + 1+ quái thú phi-Tuner có tổng Level bằng đúng 7. Khi được triệu hồi Đồng Bộ: Tăng 500 ATK cho bản thân và giảm 300 ATK tất cả quái thú địch.",
    "scientificLore": "Cộng hưởng xúc tác Xúc Tác Vani Đen Tiếp Xúc (V2O5) hạ thấp hàng rào năng lượng hoạt hóa Arrhenius, tăng tốc độ phản ứng lên hàng triệu lần theo SGK Hóa học 10 GDPT 2018.",
    "relatedEquation": "2SO₂ + O₂ --V₂O₅/450°C--> 2SO₃",
    "iupacName": "Vanadium Pentoxide Converter Catalyst",
    "archetype": "PRECIOUS_CATALYST",
    "structuredEffects": [
      {
        "effectId": "B12_EFF_21",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 500,
              "statTarget": "ATK",
              "targetScope": "SELF"
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Tăng 500 ATK cho bản thân, trừ 300 ATK toàn bộ quái thú đối phương."
      }
    ]
  },
  {
    "id": "card_b12_022_synchro_metallocene_stereospecific_synchro_22",
    "name": "Xúc Tác Cơ Kim Metallocene — Bậc 8 (Cộng Hưởng 3)",
    "name_en": "Metallocene Stereospecific Synchro — Level 8 Synchro 3",
    "cardType": "SYNCHRO_MONSTER",
    "rarity": "ULTRA_RARE",
    "attribute": "ELECTRO",
    "manaCost": 7,
    "level": 8,
    "synchroLevel": 8,
    "synchroMaterialsRequired": {
      "tunerCount": 1,
      "nonTunerMinCount": 1
    },
    "atk": 3600,
    "def": 3230,
    "chemicalFormula": "Cp2ZrCl2",
    "effectCode": "SYNCHRO_B12_METALLOCENE_STEREOSPECIFIC_SYNCHRO_RES_22",
    "effectText": "1 Tuner + 1+ quái thú phi-Tuner có tổng Level bằng đúng 8. Khi được triệu hồi Đồng Bộ: Tăng 500 ATK cho bản thân và giảm 300 ATK tất cả quái thú địch.",
    "scientificLore": "Cộng hưởng xúc tác Xúc Tác Cơ Kim Metallocene (Cp2ZrCl2) hạ thấp hàng rào năng lượng hoạt hóa Arrhenius, tăng tốc độ phản ứng lên hàng triệu lần theo SGK Hóa học 10 GDPT 2018.",
    "relatedEquation": "Isotactic Polypropylene Synthesis Center",
    "iupacName": "Metallocene Stereospecific Synchro Catalyst",
    "archetype": "THERMAL_KINETICS",
    "structuredEffects": [
      {
        "effectId": "B12_EFF_22",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 500,
              "statTarget": "ATK",
              "targetScope": "SELF"
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Tăng 500 ATK cho bản thân, trừ 300 ATK toàn bộ quái thú đối phương."
      }
    ]
  },
  {
    "id": "card_b12_023_synchro_grubbs_olefin_metathesis_engine_23",
    "name": "Phức Xúc Tác Grubbs Đổi Vị — Bậc 9 (Cộng Hưởng 3)",
    "name_en": "Grubbs Olefin Metathesis Engine — Level 9 Synchro 3",
    "cardType": "SYNCHRO_MONSTER",
    "rarity": "SECRET_RARE",
    "attribute": "TERRA",
    "manaCost": 8,
    "level": 9,
    "synchroLevel": 9,
    "synchroMaterialsRequired": {
      "tunerCount": 1,
      "nonTunerMinCount": 1
    },
    "atk": 3810,
    "def": 3440,
    "chemicalFormula": "Ru-Carbene",
    "effectCode": "SYNCHRO_B12_GRUBBS_OLEFIN_METATHESIS_ENGINE_RES_23",
    "effectText": "1 Tuner + 1+ quái thú phi-Tuner có tổng Level bằng đúng 9. Khi được triệu hồi Đồng Bộ: Tăng 500 ATK cho bản thân và giảm 300 ATK tất cả quái thú địch.",
    "scientificLore": "Cộng hưởng xúc tác Phức Xúc Tác Grubbs Đổi Vị (Ru-Carbene) hạ thấp hàng rào năng lượng hoạt hóa Arrhenius, tăng tốc độ phản ứng lên hàng triệu lần theo SGK Hóa học 10 GDPT 2018.",
    "relatedEquation": "Alkene Metathesis Cleavage & Recombination",
    "iupacName": "Grubbs Olefin Metathesis Engine Catalyst",
    "archetype": "PRECIOUS_CATALYST",
    "structuredEffects": [
      {
        "effectId": "B12_EFF_23",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 500,
              "statTarget": "ATK",
              "targetScope": "SELF"
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Tăng 500 ATK cho bản thân, trừ 300 ATK toàn bộ quái thú đối phương."
      }
    ]
  },
  {
    "id": "card_b12_024_synchro_lipase_biocatalyst_resonance_24",
    "name": "Men Sinh Học Lipase — Bậc 10 (Cộng Hưởng 3)",
    "name_en": "Lipase Biocatalyst Resonance — Level 10 Synchro 3",
    "cardType": "SYNCHRO_MONSTER",
    "rarity": "COMMON",
    "attribute": "AQUA",
    "manaCost": 8,
    "level": 10,
    "synchroLevel": 10,
    "synchroMaterialsRequired": {
      "tunerCount": 1,
      "nonTunerMinCount": 1
    },
    "atk": 4020,
    "def": 3650,
    "chemicalFormula": "Lipase",
    "effectCode": "SYNCHRO_B12_LIPASE_BIOCATALYST_RESONANCE_RES_24",
    "effectText": "1 Tuner + 1+ quái thú phi-Tuner có tổng Level bằng đúng 10. Khi được triệu hồi Đồng Bộ: Tăng 500 ATK cho bản thân và giảm 300 ATK tất cả quái thú địch.",
    "scientificLore": "Cộng hưởng xúc tác Men Sinh Học Lipase (Lipase) hạ thấp hàng rào năng lượng hoạt hóa Arrhenius, tăng tốc độ phản ứng lên hàng triệu lần theo SGK Hóa học 10 GDPT 2018.",
    "relatedEquation": "Triglyceride Hydrolysis Active Site",
    "iupacName": "Lipase Biocatalyst Resonance Catalyst",
    "archetype": "THERMAL_KINETICS",
    "structuredEffects": [
      {
        "effectId": "B12_EFF_24",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 500,
              "statTarget": "ATK",
              "targetScope": "SELF"
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Tăng 500 ATK cho bản thân, trừ 300 ATK toàn bộ quái thú đối phương."
      }
    ]
  },
  {
    "id": "card_b12_025_synchro_platinum_catalytic_converter_25",
    "name": "Xúc Tác Bạch Kim Chuyển Hóa — Bậc 5 (Cộng Hưởng 4)",
    "name_en": "Platinum Catalytic Converter — Level 5 Synchro 4",
    "cardType": "SYNCHRO_MONSTER",
    "rarity": "COMMON",
    "attribute": "NOBLE_VOID",
    "manaCost": 4,
    "level": 5,
    "synchroLevel": 5,
    "synchroMaterialsRequired": {
      "tunerCount": 1,
      "nonTunerMinCount": 1
    },
    "atk": 3050,
    "def": 2900,
    "chemicalFormula": "Pt/Rh/Pd",
    "effectCode": "SYNCHRO_B12_PLATINUM_CATALYTIC_CONVERTER_RES_25",
    "effectText": "1 Tuner + 1+ quái thú phi-Tuner có tổng Level bằng đúng 5. Khi được triệu hồi Đồng Bộ: Tăng 500 ATK cho bản thân và giảm 300 ATK tất cả quái thú địch.",
    "scientificLore": "Cộng hưởng xúc tác Xúc Tác Bạch Kim Chuyển Hóa (Pt/Rh/Pd) hạ thấp hàng rào năng lượng hoạt hóa Arrhenius, tăng tốc độ phản ứng lên hàng triệu lần theo SGK Hóa học 10 GDPT 2018.",
    "relatedEquation": "2CO + 2NO → 2CO₂ + N₂",
    "iupacName": "Platinum Catalytic Converter Catalyst",
    "archetype": "PRECIOUS_CATALYST",
    "structuredEffects": [
      {
        "effectId": "B12_EFF_25",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 500,
              "statTarget": "ATK",
              "targetScope": "SELF"
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Tăng 500 ATK cho bản thân, trừ 300 ATK toàn bộ quái thú đối phương."
      }
    ]
  },
  {
    "id": "card_b12_026_synchro_alpha_amylase_synchro_enzyme_26",
    "name": "Enzyme Đồng Bộ Amylase — Bậc 6 (Cộng Hưởng 4)",
    "name_en": "Alpha-Amylase Synchro Enzyme — Level 6 Synchro 4",
    "cardType": "SYNCHRO_MONSTER",
    "rarity": "COMMON",
    "attribute": "AQUA",
    "manaCost": 5,
    "level": 6,
    "synchroLevel": 6,
    "synchroMaterialsRequired": {
      "tunerCount": 1,
      "nonTunerMinCount": 1
    },
    "atk": 3260,
    "def": 2860,
    "chemicalFormula": "Enzyme",
    "effectCode": "SYNCHRO_B12_ALPHA_AMYLASE_SYNCHRO_ENZYME_RES_26",
    "effectText": "1 Tuner + 1+ quái thú phi-Tuner có tổng Level bằng đúng 6. Khi được triệu hồi Đồng Bộ: Tăng 500 ATK cho bản thân và giảm 300 ATK tất cả quái thú địch.",
    "scientificLore": "Cộng hưởng xúc tác Enzyme Đồng Bộ Amylase (Enzyme) hạ thấp hàng rào năng lượng hoạt hóa Arrhenius, tăng tốc độ phản ứng lên hàng triệu lần theo SGK Hóa học 10 GDPT 2018.",
    "relatedEquation": "(C₆H₁₀O₅)n + nH₂O --Amylase--> nC₁₂H₂₂O₁₁",
    "iupacName": "Alpha-Amylase Synchro Enzyme Catalyst",
    "archetype": "THERMAL_KINETICS",
    "structuredEffects": [
      {
        "effectId": "B12_EFF_26",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 500,
              "statTarget": "ATK",
              "targetScope": "SELF"
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Tăng 500 ATK cho bản thân, trừ 300 ATK toàn bộ quái thú đối phương."
      }
    ]
  },
  {
    "id": "card_b12_027_synchro_tio2_photocatalytic_resonance_27",
    "name": "Quang Xúc Tác Titan Dioxit — Bậc 7 (Cộng Hưởng 4)",
    "name_en": "TiO2 Photocatalytic Resonance — Level 7 Synchro 4",
    "cardType": "SYNCHRO_MONSTER",
    "rarity": "RARE",
    "attribute": "ELECTRO",
    "manaCost": 6,
    "level": 7,
    "synchroLevel": 7,
    "synchroMaterialsRequired": {
      "tunerCount": 1,
      "nonTunerMinCount": 1
    },
    "atk": 3470,
    "def": 3070,
    "chemicalFormula": "TiO2/UV",
    "effectCode": "SYNCHRO_B12_TIO2_PHOTOCATALYTIC_RESONANCE_RES_27",
    "effectText": "1 Tuner + 1+ quái thú phi-Tuner có tổng Level bằng đúng 7. Khi được triệu hồi Đồng Bộ: Tăng 500 ATK cho bản thân và giảm 300 ATK tất cả quái thú địch.",
    "scientificLore": "Cộng hưởng xúc tác Quang Xúc Tác Titan Dioxit (TiO2/UV) hạ thấp hàng rào năng lượng hoạt hóa Arrhenius, tăng tốc độ phản ứng lên hàng triệu lần theo SGK Hóa học 10 GDPT 2018.",
    "relatedEquation": "TiO₂ + hν → e⁻ + h⁺ → ·OH + ·O₂⁻",
    "iupacName": "TiO2 Photocatalytic Resonance Catalyst",
    "archetype": "PRECIOUS_CATALYST",
    "structuredEffects": [
      {
        "effectId": "B12_EFF_27",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 500,
              "statTarget": "ATK",
              "targetScope": "SELF"
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Tăng 500 ATK cho bản thân, trừ 300 ATK toàn bộ quái thú đối phương."
      }
    ]
  },
  {
    "id": "card_b12_028_synchro_haber_iron_catalyst_core_28",
    "name": "Xúc Tác Sắt Tổng Hợp Amoniac — Bậc 8 (Cộng Hưởng 4)",
    "name_en": "Haber Iron Catalyst Core — Level 8 Synchro 4",
    "cardType": "SYNCHRO_MONSTER",
    "rarity": "RARE",
    "attribute": "PYRO",
    "manaCost": 7,
    "level": 8,
    "synchroLevel": 8,
    "synchroMaterialsRequired": {
      "tunerCount": 1,
      "nonTunerMinCount": 1
    },
    "atk": 3680,
    "def": 3280,
    "chemicalFormula": "Fe-K2O-Al2O3",
    "effectCode": "SYNCHRO_B12_HABER_IRON_CATALYST_CORE_RES_28",
    "effectText": "1 Tuner + 1+ quái thú phi-Tuner có tổng Level bằng đúng 8. Khi được triệu hồi Đồng Bộ: Tăng 500 ATK cho bản thân và giảm 300 ATK tất cả quái thú địch.",
    "scientificLore": "Cộng hưởng xúc tác Xúc Tác Sắt Tổng Hợp Amoniac (Fe-K2O-Al2O3) hạ thấp hàng rào năng lượng hoạt hóa Arrhenius, tăng tốc độ phản ứng lên hàng triệu lần theo SGK Hóa học 10 GDPT 2018.",
    "relatedEquation": "N₂ + 3H₂ --Fe/450°C/200atm--> 2NH₃",
    "iupacName": "Haber Iron Catalyst Core Catalyst",
    "archetype": "THERMAL_KINETICS",
    "structuredEffects": [
      {
        "effectId": "B12_EFF_28",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 500,
              "statTarget": "ATK",
              "targetScope": "SELF"
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Tăng 500 ATK cho bản thân, trừ 300 ATK toàn bộ quái thú đối phương."
      }
    ]
  },
  {
    "id": "card_b12_029_synchro_vanadium_pentoxide_converter_29",
    "name": "Xúc Tác Vani Đen Tiếp Xúc — Bậc 9 (Cộng Hưởng 4)",
    "name_en": "Vanadium Pentoxide Converter — Level 9 Synchro 4",
    "cardType": "SYNCHRO_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "TERRA",
    "manaCost": 8,
    "level": 9,
    "synchroLevel": 9,
    "synchroMaterialsRequired": {
      "tunerCount": 1,
      "nonTunerMinCount": 1
    },
    "atk": 3730,
    "def": 3490,
    "chemicalFormula": "V2O5",
    "effectCode": "SYNCHRO_B12_VANADIUM_PENTOXIDE_CONVERTER_RES_29",
    "effectText": "1 Tuner + 1+ quái thú phi-Tuner có tổng Level bằng đúng 9. Khi được triệu hồi Đồng Bộ: Tăng 500 ATK cho bản thân và giảm 300 ATK tất cả quái thú địch.",
    "scientificLore": "Cộng hưởng xúc tác Xúc Tác Vani Đen Tiếp Xúc (V2O5) hạ thấp hàng rào năng lượng hoạt hóa Arrhenius, tăng tốc độ phản ứng lên hàng triệu lần theo SGK Hóa học 10 GDPT 2018.",
    "relatedEquation": "2SO₂ + O₂ --V₂O₅/450°C--> 2SO₃",
    "iupacName": "Vanadium Pentoxide Converter Catalyst",
    "archetype": "PRECIOUS_CATALYST",
    "structuredEffects": [
      {
        "effectId": "B12_EFF_29",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 500,
              "statTarget": "ATK",
              "targetScope": "SELF"
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Tăng 500 ATK cho bản thân, trừ 300 ATK toàn bộ quái thú đối phương."
      }
    ]
  },
  {
    "id": "card_b12_030_synchro_metallocene_stereospecific_synchro_30",
    "name": "Xúc Tác Cơ Kim Metallocene — Bậc 10 (Cộng Hưởng 4)",
    "name_en": "Metallocene Stereospecific Synchro — Level 10 Synchro 4",
    "cardType": "SYNCHRO_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "ELECTRO",
    "manaCost": 8,
    "level": 10,
    "synchroLevel": 10,
    "synchroMaterialsRequired": {
      "tunerCount": 1,
      "nonTunerMinCount": 1
    },
    "atk": 3940,
    "def": 3700,
    "chemicalFormula": "Cp2ZrCl2",
    "effectCode": "SYNCHRO_B12_METALLOCENE_STEREOSPECIFIC_SYNCHRO_RES_30",
    "effectText": "1 Tuner + 1+ quái thú phi-Tuner có tổng Level bằng đúng 10. Khi được triệu hồi Đồng Bộ: Tăng 500 ATK cho bản thân và giảm 300 ATK tất cả quái thú địch.",
    "scientificLore": "Cộng hưởng xúc tác Xúc Tác Cơ Kim Metallocene (Cp2ZrCl2) hạ thấp hàng rào năng lượng hoạt hóa Arrhenius, tăng tốc độ phản ứng lên hàng triệu lần theo SGK Hóa học 10 GDPT 2018.",
    "relatedEquation": "Isotactic Polypropylene Synthesis Center",
    "iupacName": "Metallocene Stereospecific Synchro Catalyst",
    "archetype": "THERMAL_KINETICS",
    "structuredEffects": [
      {
        "effectId": "B12_EFF_30",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 500,
              "statTarget": "ATK",
              "targetScope": "SELF"
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Tăng 500 ATK cho bản thân, trừ 300 ATK toàn bộ quái thú đối phương."
      }
    ]
  },
  {
    "id": "card_b12_031_synchro_grubbs_olefin_metathesis_engine_31",
    "name": "Phức Xúc Tác Grubbs Đổi Vị — Bậc 5 (Cộng Hưởng 4)",
    "name_en": "Grubbs Olefin Metathesis Engine — Level 5 Synchro 4",
    "cardType": "SYNCHRO_MONSTER",
    "rarity": "ULTRA_RARE",
    "attribute": "TERRA",
    "manaCost": 4,
    "level": 5,
    "synchroLevel": 5,
    "synchroMaterialsRequired": {
      "tunerCount": 1,
      "nonTunerMinCount": 1
    },
    "atk": 3130,
    "def": 2700,
    "chemicalFormula": "Ru-Carbene",
    "effectCode": "SYNCHRO_B12_GRUBBS_OLEFIN_METATHESIS_ENGINE_RES_31",
    "effectText": "1 Tuner + 1+ quái thú phi-Tuner có tổng Level bằng đúng 5. Khi được triệu hồi Đồng Bộ: Tăng 500 ATK cho bản thân và giảm 300 ATK tất cả quái thú địch.",
    "scientificLore": "Cộng hưởng xúc tác Phức Xúc Tác Grubbs Đổi Vị (Ru-Carbene) hạ thấp hàng rào năng lượng hoạt hóa Arrhenius, tăng tốc độ phản ứng lên hàng triệu lần theo SGK Hóa học 10 GDPT 2018.",
    "relatedEquation": "Alkene Metathesis Cleavage & Recombination",
    "iupacName": "Grubbs Olefin Metathesis Engine Catalyst",
    "archetype": "PRECIOUS_CATALYST",
    "structuredEffects": [
      {
        "effectId": "B12_EFF_31",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 500,
              "statTarget": "ATK",
              "targetScope": "SELF"
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Tăng 500 ATK cho bản thân, trừ 300 ATK toàn bộ quái thú đối phương."
      }
    ]
  },
  {
    "id": "card_b12_032_synchro_lipase_biocatalyst_resonance_32",
    "name": "Men Sinh Học Lipase — Bậc 6 (Cộng Hưởng 4)",
    "name_en": "Lipase Biocatalyst Resonance — Level 6 Synchro 4",
    "cardType": "SYNCHRO_MONSTER",
    "rarity": "SECRET_RARE",
    "attribute": "AQUA",
    "manaCost": 5,
    "level": 6,
    "synchroLevel": 6,
    "synchroMaterialsRequired": {
      "tunerCount": 1,
      "nonTunerMinCount": 1
    },
    "atk": 3340,
    "def": 2910,
    "chemicalFormula": "Lipase",
    "effectCode": "SYNCHRO_B12_LIPASE_BIOCATALYST_RESONANCE_RES_32",
    "effectText": "1 Tuner + 1+ quái thú phi-Tuner có tổng Level bằng đúng 6. Khi được triệu hồi Đồng Bộ: Tăng 500 ATK cho bản thân và giảm 300 ATK tất cả quái thú địch.",
    "scientificLore": "Cộng hưởng xúc tác Men Sinh Học Lipase (Lipase) hạ thấp hàng rào năng lượng hoạt hóa Arrhenius, tăng tốc độ phản ứng lên hàng triệu lần theo SGK Hóa học 10 GDPT 2018.",
    "relatedEquation": "Triglyceride Hydrolysis Active Site",
    "iupacName": "Lipase Biocatalyst Resonance Catalyst",
    "archetype": "THERMAL_KINETICS",
    "structuredEffects": [
      {
        "effectId": "B12_EFF_32",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 500,
              "statTarget": "ATK",
              "targetScope": "SELF"
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Tăng 500 ATK cho bản thân, trừ 300 ATK toàn bộ quái thú đối phương."
      }
    ]
  },
  {
    "id": "card_b12_033_synchro_platinum_catalytic_converter_33",
    "name": "Xúc Tác Bạch Kim Chuyển Hóa — Bậc 7 (Cộng Hưởng 5)",
    "name_en": "Platinum Catalytic Converter — Level 7 Synchro 5",
    "cardType": "SYNCHRO_MONSTER",
    "rarity": "COMMON",
    "attribute": "NOBLE_VOID",
    "manaCost": 6,
    "level": 7,
    "synchroLevel": 7,
    "synchroMaterialsRequired": {
      "tunerCount": 1,
      "nonTunerMinCount": 1
    },
    "atk": 3390,
    "def": 3120,
    "chemicalFormula": "Pt/Rh/Pd",
    "effectCode": "SYNCHRO_B12_PLATINUM_CATALYTIC_CONVERTER_RES_33",
    "effectText": "1 Tuner + 1+ quái thú phi-Tuner có tổng Level bằng đúng 7. Khi được triệu hồi Đồng Bộ: Tăng 500 ATK cho bản thân và giảm 300 ATK tất cả quái thú địch.",
    "scientificLore": "Cộng hưởng xúc tác Xúc Tác Bạch Kim Chuyển Hóa (Pt/Rh/Pd) hạ thấp hàng rào năng lượng hoạt hóa Arrhenius, tăng tốc độ phản ứng lên hàng triệu lần theo SGK Hóa học 10 GDPT 2018.",
    "relatedEquation": "2CO + 2NO → 2CO₂ + N₂",
    "iupacName": "Platinum Catalytic Converter Catalyst",
    "archetype": "PRECIOUS_CATALYST",
    "structuredEffects": [
      {
        "effectId": "B12_EFF_33",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 500,
              "statTarget": "ATK",
              "targetScope": "SELF"
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Tăng 500 ATK cho bản thân, trừ 300 ATK toàn bộ quái thú đối phương."
      }
    ]
  },
  {
    "id": "card_b12_034_synchro_alpha_amylase_synchro_enzyme_34",
    "name": "Enzyme Đồng Bộ Amylase — Bậc 8 (Cộng Hưởng 5)",
    "name_en": "Alpha-Amylase Synchro Enzyme — Level 8 Synchro 5",
    "cardType": "SYNCHRO_MONSTER",
    "rarity": "COMMON",
    "attribute": "AQUA",
    "manaCost": 7,
    "level": 8,
    "synchroLevel": 8,
    "synchroMaterialsRequired": {
      "tunerCount": 1,
      "nonTunerMinCount": 1
    },
    "atk": 3600,
    "def": 3330,
    "chemicalFormula": "Enzyme",
    "effectCode": "SYNCHRO_B12_ALPHA_AMYLASE_SYNCHRO_ENZYME_RES_34",
    "effectText": "1 Tuner + 1+ quái thú phi-Tuner có tổng Level bằng đúng 8. Khi được triệu hồi Đồng Bộ: Tăng 500 ATK cho bản thân và giảm 300 ATK tất cả quái thú địch.",
    "scientificLore": "Cộng hưởng xúc tác Enzyme Đồng Bộ Amylase (Enzyme) hạ thấp hàng rào năng lượng hoạt hóa Arrhenius, tăng tốc độ phản ứng lên hàng triệu lần theo SGK Hóa học 10 GDPT 2018.",
    "relatedEquation": "(C₆H₁₀O₅)n + nH₂O --Amylase--> nC₁₂H₂₂O₁₁",
    "iupacName": "Alpha-Amylase Synchro Enzyme Catalyst",
    "archetype": "THERMAL_KINETICS",
    "structuredEffects": [
      {
        "effectId": "B12_EFF_34",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 500,
              "statTarget": "ATK",
              "targetScope": "SELF"
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Tăng 500 ATK cho bản thân, trừ 300 ATK toàn bộ quái thú đối phương."
      }
    ]
  },
  {
    "id": "card_b12_035_synchro_tio2_photocatalytic_resonance_35",
    "name": "Quang Xúc Tác Titan Dioxit — Bậc 9 (Cộng Hưởng 5)",
    "name_en": "TiO2 Photocatalytic Resonance — Level 9 Synchro 5",
    "cardType": "SYNCHRO_MONSTER",
    "rarity": "COMMON",
    "attribute": "ELECTRO",
    "manaCost": 8,
    "level": 9,
    "synchroLevel": 9,
    "synchroMaterialsRequired": {
      "tunerCount": 1,
      "nonTunerMinCount": 1
    },
    "atk": 3810,
    "def": 3540,
    "chemicalFormula": "TiO2/UV",
    "effectCode": "SYNCHRO_B12_TIO2_PHOTOCATALYTIC_RESONANCE_RES_35",
    "effectText": "1 Tuner + 1+ quái thú phi-Tuner có tổng Level bằng đúng 9. Khi được triệu hồi Đồng Bộ: Tăng 500 ATK cho bản thân và giảm 300 ATK tất cả quái thú địch.",
    "scientificLore": "Cộng hưởng xúc tác Quang Xúc Tác Titan Dioxit (TiO2/UV) hạ thấp hàng rào năng lượng hoạt hóa Arrhenius, tăng tốc độ phản ứng lên hàng triệu lần theo SGK Hóa học 10 GDPT 2018.",
    "relatedEquation": "TiO₂ + hν → e⁻ + h⁺ → ·OH + ·O₂⁻",
    "iupacName": "TiO2 Photocatalytic Resonance Catalyst",
    "archetype": "PRECIOUS_CATALYST",
    "structuredEffects": [
      {
        "effectId": "B12_EFF_35",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 500,
              "statTarget": "ATK",
              "targetScope": "SELF"
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Tăng 500 ATK cho bản thân, trừ 300 ATK toàn bộ quái thú đối phương."
      }
    ]
  },
  {
    "id": "card_b12_036_synchro_haber_iron_catalyst_core_36",
    "name": "Xúc Tác Sắt Tổng Hợp Amoniac — Bậc 10 (Cộng Hưởng 5)",
    "name_en": "Haber Iron Catalyst Core — Level 10 Synchro 5",
    "cardType": "SYNCHRO_MONSTER",
    "rarity": "RARE",
    "attribute": "PYRO",
    "manaCost": 8,
    "level": 10,
    "synchroLevel": 10,
    "synchroMaterialsRequired": {
      "tunerCount": 1,
      "nonTunerMinCount": 1
    },
    "atk": 4020,
    "def": 3500,
    "chemicalFormula": "Fe-K2O-Al2O3",
    "effectCode": "SYNCHRO_B12_HABER_IRON_CATALYST_CORE_RES_36",
    "effectText": "1 Tuner + 1+ quái thú phi-Tuner có tổng Level bằng đúng 10. Khi được triệu hồi Đồng Bộ: Tăng 500 ATK cho bản thân và giảm 300 ATK tất cả quái thú địch.",
    "scientificLore": "Cộng hưởng xúc tác Xúc Tác Sắt Tổng Hợp Amoniac (Fe-K2O-Al2O3) hạ thấp hàng rào năng lượng hoạt hóa Arrhenius, tăng tốc độ phản ứng lên hàng triệu lần theo SGK Hóa học 10 GDPT 2018.",
    "relatedEquation": "N₂ + 3H₂ --Fe/450°C/200atm--> 2NH₃",
    "iupacName": "Haber Iron Catalyst Core Catalyst",
    "archetype": "THERMAL_KINETICS",
    "structuredEffects": [
      {
        "effectId": "B12_EFF_36",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 500,
              "statTarget": "ATK",
              "targetScope": "SELF"
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Tăng 500 ATK cho bản thân, trừ 300 ATK toàn bộ quái thú đối phương."
      }
    ]
  },
  {
    "id": "card_b12_037_synchro_vanadium_pentoxide_converter_37",
    "name": "Xúc Tác Vani Đen Tiếp Xúc — Bậc 5 (Cộng Hưởng 5)",
    "name_en": "Vanadium Pentoxide Converter — Level 5 Synchro 5",
    "cardType": "SYNCHRO_MONSTER",
    "rarity": "RARE",
    "attribute": "TERRA",
    "manaCost": 4,
    "level": 5,
    "synchroLevel": 5,
    "synchroMaterialsRequired": {
      "tunerCount": 1,
      "nonTunerMinCount": 1
    },
    "atk": 3050,
    "def": 2750,
    "chemicalFormula": "V2O5",
    "effectCode": "SYNCHRO_B12_VANADIUM_PENTOXIDE_CONVERTER_RES_37",
    "effectText": "1 Tuner + 1+ quái thú phi-Tuner có tổng Level bằng đúng 5. Khi được triệu hồi Đồng Bộ: Tăng 500 ATK cho bản thân và giảm 300 ATK tất cả quái thú địch.",
    "scientificLore": "Cộng hưởng xúc tác Xúc Tác Vani Đen Tiếp Xúc (V2O5) hạ thấp hàng rào năng lượng hoạt hóa Arrhenius, tăng tốc độ phản ứng lên hàng triệu lần theo SGK Hóa học 10 GDPT 2018.",
    "relatedEquation": "2SO₂ + O₂ --V₂O₅/450°C--> 2SO₃",
    "iupacName": "Vanadium Pentoxide Converter Catalyst",
    "archetype": "PRECIOUS_CATALYST",
    "structuredEffects": [
      {
        "effectId": "B12_EFF_37",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 500,
              "statTarget": "ATK",
              "targetScope": "SELF"
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Tăng 500 ATK cho bản thân, trừ 300 ATK toàn bộ quái thú đối phương."
      }
    ]
  },
  {
    "id": "card_b12_038_synchro_metallocene_stereospecific_synchro_38",
    "name": "Xúc Tác Cơ Kim Metallocene — Bậc 6 (Cộng Hưởng 5)",
    "name_en": "Metallocene Stereospecific Synchro — Level 6 Synchro 5",
    "cardType": "SYNCHRO_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "ELECTRO",
    "manaCost": 5,
    "level": 6,
    "synchroLevel": 6,
    "synchroMaterialsRequired": {
      "tunerCount": 1,
      "nonTunerMinCount": 1
    },
    "atk": 3260,
    "def": 2960,
    "chemicalFormula": "Cp2ZrCl2",
    "effectCode": "SYNCHRO_B12_METALLOCENE_STEREOSPECIFIC_SYNCHRO_RES_38",
    "effectText": "1 Tuner + 1+ quái thú phi-Tuner có tổng Level bằng đúng 6. Khi được triệu hồi Đồng Bộ: Tăng 500 ATK cho bản thân và giảm 300 ATK tất cả quái thú địch.",
    "scientificLore": "Cộng hưởng xúc tác Xúc Tác Cơ Kim Metallocene (Cp2ZrCl2) hạ thấp hàng rào năng lượng hoạt hóa Arrhenius, tăng tốc độ phản ứng lên hàng triệu lần theo SGK Hóa học 10 GDPT 2018.",
    "relatedEquation": "Isotactic Polypropylene Synthesis Center",
    "iupacName": "Metallocene Stereospecific Synchro Catalyst",
    "archetype": "THERMAL_KINETICS",
    "structuredEffects": [
      {
        "effectId": "B12_EFF_38",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 500,
              "statTarget": "ATK",
              "targetScope": "SELF"
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Tăng 500 ATK cho bản thân, trừ 300 ATK toàn bộ quái thú đối phương."
      }
    ]
  },
  {
    "id": "card_b12_039_synchro_grubbs_olefin_metathesis_engine_39",
    "name": "Phức Xúc Tác Grubbs Đổi Vị — Bậc 7 (Cộng Hưởng 5)",
    "name_en": "Grubbs Olefin Metathesis Engine — Level 7 Synchro 5",
    "cardType": "SYNCHRO_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "TERRA",
    "manaCost": 6,
    "level": 7,
    "synchroLevel": 7,
    "synchroMaterialsRequired": {
      "tunerCount": 1,
      "nonTunerMinCount": 1
    },
    "atk": 3470,
    "def": 3170,
    "chemicalFormula": "Ru-Carbene",
    "effectCode": "SYNCHRO_B12_GRUBBS_OLEFIN_METATHESIS_ENGINE_RES_39",
    "effectText": "1 Tuner + 1+ quái thú phi-Tuner có tổng Level bằng đúng 7. Khi được triệu hồi Đồng Bộ: Tăng 500 ATK cho bản thân và giảm 300 ATK tất cả quái thú địch.",
    "scientificLore": "Cộng hưởng xúc tác Phức Xúc Tác Grubbs Đổi Vị (Ru-Carbene) hạ thấp hàng rào năng lượng hoạt hóa Arrhenius, tăng tốc độ phản ứng lên hàng triệu lần theo SGK Hóa học 10 GDPT 2018.",
    "relatedEquation": "Alkene Metathesis Cleavage & Recombination",
    "iupacName": "Grubbs Olefin Metathesis Engine Catalyst",
    "archetype": "PRECIOUS_CATALYST",
    "structuredEffects": [
      {
        "effectId": "B12_EFF_39",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 500,
              "statTarget": "ATK",
              "targetScope": "SELF"
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Tăng 500 ATK cho bản thân, trừ 300 ATK toàn bộ quái thú đối phương."
      }
    ]
  },
  {
    "id": "card_b12_040_synchro_lipase_biocatalyst_resonance_40",
    "name": "Men Sinh Học Lipase — Bậc 8 (Cộng Hưởng 5)",
    "name_en": "Lipase Biocatalyst Resonance — Level 8 Synchro 5",
    "cardType": "SYNCHRO_MONSTER",
    "rarity": "ULTRA_RARE",
    "attribute": "AQUA",
    "manaCost": 7,
    "level": 8,
    "synchroLevel": 8,
    "synchroMaterialsRequired": {
      "tunerCount": 1,
      "nonTunerMinCount": 1
    },
    "atk": 3680,
    "def": 3380,
    "chemicalFormula": "Lipase",
    "effectCode": "SYNCHRO_B12_LIPASE_BIOCATALYST_RESONANCE_RES_40",
    "effectText": "1 Tuner + 1+ quái thú phi-Tuner có tổng Level bằng đúng 8. Khi được triệu hồi Đồng Bộ: Tăng 500 ATK cho bản thân và giảm 300 ATK tất cả quái thú địch.",
    "scientificLore": "Cộng hưởng xúc tác Men Sinh Học Lipase (Lipase) hạ thấp hàng rào năng lượng hoạt hóa Arrhenius, tăng tốc độ phản ứng lên hàng triệu lần theo SGK Hóa học 10 GDPT 2018.",
    "relatedEquation": "Triglyceride Hydrolysis Active Site",
    "iupacName": "Lipase Biocatalyst Resonance Catalyst",
    "archetype": "THERMAL_KINETICS",
    "structuredEffects": [
      {
        "effectId": "B12_EFF_40",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 500,
              "statTarget": "ATK",
              "targetScope": "SELF"
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Tăng 500 ATK cho bản thân, trừ 300 ATK toàn bộ quái thú đối phương."
      }
    ]
  },
  {
    "id": "card_b12_041_synchro_platinum_catalytic_converter_41",
    "name": "Xúc Tác Bạch Kim Chuyển Hóa — Bậc 9 (Cộng Hưởng 6)",
    "name_en": "Platinum Catalytic Converter — Level 9 Synchro 6",
    "cardType": "SYNCHRO_MONSTER",
    "rarity": "SECRET_RARE",
    "attribute": "NOBLE_VOID",
    "manaCost": 8,
    "level": 9,
    "synchroLevel": 9,
    "synchroMaterialsRequired": {
      "tunerCount": 1,
      "nonTunerMinCount": 1
    },
    "atk": 3730,
    "def": 3340,
    "chemicalFormula": "Pt/Rh/Pd",
    "effectCode": "SYNCHRO_B12_PLATINUM_CATALYTIC_CONVERTER_RES_41",
    "effectText": "1 Tuner + 1+ quái thú phi-Tuner có tổng Level bằng đúng 9. Khi được triệu hồi Đồng Bộ: Tăng 500 ATK cho bản thân và giảm 300 ATK tất cả quái thú địch.",
    "scientificLore": "Cộng hưởng xúc tác Xúc Tác Bạch Kim Chuyển Hóa (Pt/Rh/Pd) hạ thấp hàng rào năng lượng hoạt hóa Arrhenius, tăng tốc độ phản ứng lên hàng triệu lần theo SGK Hóa học 10 GDPT 2018.",
    "relatedEquation": "2CO + 2NO → 2CO₂ + N₂",
    "iupacName": "Platinum Catalytic Converter Catalyst",
    "archetype": "PRECIOUS_CATALYST",
    "structuredEffects": [
      {
        "effectId": "B12_EFF_41",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 500,
              "statTarget": "ATK",
              "targetScope": "SELF"
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Tăng 500 ATK cho bản thân, trừ 300 ATK toàn bộ quái thú đối phương."
      }
    ]
  },
  {
    "id": "card_b12_042_synchro_alpha_amylase_synchro_enzyme_42",
    "name": "Enzyme Đồng Bộ Amylase — Bậc 10 (Cộng Hưởng 6)",
    "name_en": "Alpha-Amylase Synchro Enzyme — Level 10 Synchro 6",
    "cardType": "SYNCHRO_MONSTER",
    "rarity": "COMMON",
    "attribute": "AQUA",
    "manaCost": 8,
    "level": 10,
    "synchroLevel": 10,
    "synchroMaterialsRequired": {
      "tunerCount": 1,
      "nonTunerMinCount": 1
    },
    "atk": 3940,
    "def": 3550,
    "chemicalFormula": "Enzyme",
    "effectCode": "SYNCHRO_B12_ALPHA_AMYLASE_SYNCHRO_ENZYME_RES_42",
    "effectText": "1 Tuner + 1+ quái thú phi-Tuner có tổng Level bằng đúng 10. Khi được triệu hồi Đồng Bộ: Tăng 500 ATK cho bản thân và giảm 300 ATK tất cả quái thú địch.",
    "scientificLore": "Cộng hưởng xúc tác Enzyme Đồng Bộ Amylase (Enzyme) hạ thấp hàng rào năng lượng hoạt hóa Arrhenius, tăng tốc độ phản ứng lên hàng triệu lần theo SGK Hóa học 10 GDPT 2018.",
    "relatedEquation": "(C₆H₁₀O₅)n + nH₂O --Amylase--> nC₁₂H₂₂O₁₁",
    "iupacName": "Alpha-Amylase Synchro Enzyme Catalyst",
    "archetype": "THERMAL_KINETICS",
    "structuredEffects": [
      {
        "effectId": "B12_EFF_42",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 500,
              "statTarget": "ATK",
              "targetScope": "SELF"
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Tăng 500 ATK cho bản thân, trừ 300 ATK toàn bộ quái thú đối phương."
      }
    ]
  },
  {
    "id": "card_b12_043_synchro_tio2_photocatalytic_resonance_43",
    "name": "Quang Xúc Tác Titan Dioxit — Bậc 5 (Cộng Hưởng 6)",
    "name_en": "TiO2 Photocatalytic Resonance — Level 5 Synchro 6",
    "cardType": "SYNCHRO_MONSTER",
    "rarity": "COMMON",
    "attribute": "ELECTRO",
    "manaCost": 4,
    "level": 5,
    "synchroLevel": 5,
    "synchroMaterialsRequired": {
      "tunerCount": 1,
      "nonTunerMinCount": 1
    },
    "atk": 3130,
    "def": 2800,
    "chemicalFormula": "TiO2/UV",
    "effectCode": "SYNCHRO_B12_TIO2_PHOTOCATALYTIC_RESONANCE_RES_43",
    "effectText": "1 Tuner + 1+ quái thú phi-Tuner có tổng Level bằng đúng 5. Khi được triệu hồi Đồng Bộ: Tăng 500 ATK cho bản thân và giảm 300 ATK tất cả quái thú địch.",
    "scientificLore": "Cộng hưởng xúc tác Quang Xúc Tác Titan Dioxit (TiO2/UV) hạ thấp hàng rào năng lượng hoạt hóa Arrhenius, tăng tốc độ phản ứng lên hàng triệu lần theo SGK Hóa học 10 GDPT 2018.",
    "relatedEquation": "TiO₂ + hν → e⁻ + h⁺ → ·OH + ·O₂⁻",
    "iupacName": "TiO2 Photocatalytic Resonance Catalyst",
    "archetype": "PRECIOUS_CATALYST",
    "structuredEffects": [
      {
        "effectId": "B12_EFF_43",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 500,
              "statTarget": "ATK",
              "targetScope": "SELF"
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Tăng 500 ATK cho bản thân, trừ 300 ATK toàn bộ quái thú đối phương."
      }
    ]
  },
  {
    "id": "card_b12_044_synchro_haber_iron_catalyst_core_44",
    "name": "Xúc Tác Sắt Tổng Hợp Amoniac — Bậc 6 (Cộng Hưởng 6)",
    "name_en": "Haber Iron Catalyst Core — Level 6 Synchro 6",
    "cardType": "SYNCHRO_MONSTER",
    "rarity": "COMMON",
    "attribute": "PYRO",
    "manaCost": 5,
    "level": 6,
    "synchroLevel": 6,
    "synchroMaterialsRequired": {
      "tunerCount": 1,
      "nonTunerMinCount": 1
    },
    "atk": 3340,
    "def": 3010,
    "chemicalFormula": "Fe-K2O-Al2O3",
    "effectCode": "SYNCHRO_B12_HABER_IRON_CATALYST_CORE_RES_44",
    "effectText": "1 Tuner + 1+ quái thú phi-Tuner có tổng Level bằng đúng 6. Khi được triệu hồi Đồng Bộ: Tăng 500 ATK cho bản thân và giảm 300 ATK tất cả quái thú địch.",
    "scientificLore": "Cộng hưởng xúc tác Xúc Tác Sắt Tổng Hợp Amoniac (Fe-K2O-Al2O3) hạ thấp hàng rào năng lượng hoạt hóa Arrhenius, tăng tốc độ phản ứng lên hàng triệu lần theo SGK Hóa học 10 GDPT 2018.",
    "relatedEquation": "N₂ + 3H₂ --Fe/450°C/200atm--> 2NH₃",
    "iupacName": "Haber Iron Catalyst Core Catalyst",
    "archetype": "THERMAL_KINETICS",
    "structuredEffects": [
      {
        "effectId": "B12_EFF_44",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 500,
              "statTarget": "ATK",
              "targetScope": "SELF"
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Tăng 500 ATK cho bản thân, trừ 300 ATK toàn bộ quái thú đối phương."
      }
    ]
  },
  {
    "id": "card_b12_045_synchro_vanadium_pentoxide_converter_45",
    "name": "Xúc Tác Vani Đen Tiếp Xúc — Bậc 7 (Cộng Hưởng 6)",
    "name_en": "Vanadium Pentoxide Converter — Level 7 Synchro 6",
    "cardType": "SYNCHRO_MONSTER",
    "rarity": "RARE",
    "attribute": "TERRA",
    "manaCost": 6,
    "level": 7,
    "synchroLevel": 7,
    "synchroMaterialsRequired": {
      "tunerCount": 1,
      "nonTunerMinCount": 1
    },
    "atk": 3390,
    "def": 3220,
    "chemicalFormula": "V2O5",
    "effectCode": "SYNCHRO_B12_VANADIUM_PENTOXIDE_CONVERTER_RES_45",
    "effectText": "1 Tuner + 1+ quái thú phi-Tuner có tổng Level bằng đúng 7. Khi được triệu hồi Đồng Bộ: Tăng 500 ATK cho bản thân và giảm 300 ATK tất cả quái thú địch.",
    "scientificLore": "Cộng hưởng xúc tác Xúc Tác Vani Đen Tiếp Xúc (V2O5) hạ thấp hàng rào năng lượng hoạt hóa Arrhenius, tăng tốc độ phản ứng lên hàng triệu lần theo SGK Hóa học 10 GDPT 2018.",
    "relatedEquation": "2SO₂ + O₂ --V₂O₅/450°C--> 2SO₃",
    "iupacName": "Vanadium Pentoxide Converter Catalyst",
    "archetype": "PRECIOUS_CATALYST",
    "structuredEffects": [
      {
        "effectId": "B12_EFF_45",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 500,
              "statTarget": "ATK",
              "targetScope": "SELF"
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Tăng 500 ATK cho bản thân, trừ 300 ATK toàn bộ quái thú đối phương."
      }
    ]
  },
  {
    "id": "card_b12_046_synchro_metallocene_stereospecific_synchro_46",
    "name": "Xúc Tác Cơ Kim Metallocene — Bậc 8 (Cộng Hưởng 6)",
    "name_en": "Metallocene Stereospecific Synchro — Level 8 Synchro 6",
    "cardType": "SYNCHRO_MONSTER",
    "rarity": "RARE",
    "attribute": "ELECTRO",
    "manaCost": 7,
    "level": 8,
    "synchroLevel": 8,
    "synchroMaterialsRequired": {
      "tunerCount": 1,
      "nonTunerMinCount": 1
    },
    "atk": 3600,
    "def": 3180,
    "chemicalFormula": "Cp2ZrCl2",
    "effectCode": "SYNCHRO_B12_METALLOCENE_STEREOSPECIFIC_SYNCHRO_RES_46",
    "effectText": "1 Tuner + 1+ quái thú phi-Tuner có tổng Level bằng đúng 8. Khi được triệu hồi Đồng Bộ: Tăng 500 ATK cho bản thân và giảm 300 ATK tất cả quái thú địch.",
    "scientificLore": "Cộng hưởng xúc tác Xúc Tác Cơ Kim Metallocene (Cp2ZrCl2) hạ thấp hàng rào năng lượng hoạt hóa Arrhenius, tăng tốc độ phản ứng lên hàng triệu lần theo SGK Hóa học 10 GDPT 2018.",
    "relatedEquation": "Isotactic Polypropylene Synthesis Center",
    "iupacName": "Metallocene Stereospecific Synchro Catalyst",
    "archetype": "THERMAL_KINETICS",
    "structuredEffects": [
      {
        "effectId": "B12_EFF_46",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 500,
              "statTarget": "ATK",
              "targetScope": "SELF"
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Tăng 500 ATK cho bản thân, trừ 300 ATK toàn bộ quái thú đối phương."
      }
    ]
  },
  {
    "id": "card_b12_047_synchro_grubbs_olefin_metathesis_engine_47",
    "name": "Phức Xúc Tác Grubbs Đổi Vị — Bậc 9 (Cộng Hưởng 6)",
    "name_en": "Grubbs Olefin Metathesis Engine — Level 9 Synchro 6",
    "cardType": "SYNCHRO_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "TERRA",
    "manaCost": 8,
    "level": 9,
    "synchroLevel": 9,
    "synchroMaterialsRequired": {
      "tunerCount": 1,
      "nonTunerMinCount": 1
    },
    "atk": 3810,
    "def": 3390,
    "chemicalFormula": "Ru-Carbene",
    "effectCode": "SYNCHRO_B12_GRUBBS_OLEFIN_METATHESIS_ENGINE_RES_47",
    "effectText": "1 Tuner + 1+ quái thú phi-Tuner có tổng Level bằng đúng 9. Khi được triệu hồi Đồng Bộ: Tăng 500 ATK cho bản thân và giảm 300 ATK tất cả quái thú địch.",
    "scientificLore": "Cộng hưởng xúc tác Phức Xúc Tác Grubbs Đổi Vị (Ru-Carbene) hạ thấp hàng rào năng lượng hoạt hóa Arrhenius, tăng tốc độ phản ứng lên hàng triệu lần theo SGK Hóa học 10 GDPT 2018.",
    "relatedEquation": "Alkene Metathesis Cleavage & Recombination",
    "iupacName": "Grubbs Olefin Metathesis Engine Catalyst",
    "archetype": "PRECIOUS_CATALYST",
    "structuredEffects": [
      {
        "effectId": "B12_EFF_47",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 500,
              "statTarget": "ATK",
              "targetScope": "SELF"
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Tăng 500 ATK cho bản thân, trừ 300 ATK toàn bộ quái thú đối phương."
      }
    ]
  },
  {
    "id": "card_b12_048_synchro_lipase_biocatalyst_resonance_48",
    "name": "Men Sinh Học Lipase — Bậc 10 (Cộng Hưởng 6)",
    "name_en": "Lipase Biocatalyst Resonance — Level 10 Synchro 6",
    "cardType": "SYNCHRO_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "AQUA",
    "manaCost": 8,
    "level": 10,
    "synchroLevel": 10,
    "synchroMaterialsRequired": {
      "tunerCount": 1,
      "nonTunerMinCount": 1
    },
    "atk": 4020,
    "def": 3600,
    "chemicalFormula": "Lipase",
    "effectCode": "SYNCHRO_B12_LIPASE_BIOCATALYST_RESONANCE_RES_48",
    "effectText": "1 Tuner + 1+ quái thú phi-Tuner có tổng Level bằng đúng 10. Khi được triệu hồi Đồng Bộ: Tăng 500 ATK cho bản thân và giảm 300 ATK tất cả quái thú địch.",
    "scientificLore": "Cộng hưởng xúc tác Men Sinh Học Lipase (Lipase) hạ thấp hàng rào năng lượng hoạt hóa Arrhenius, tăng tốc độ phản ứng lên hàng triệu lần theo SGK Hóa học 10 GDPT 2018.",
    "relatedEquation": "Triglyceride Hydrolysis Active Site",
    "iupacName": "Lipase Biocatalyst Resonance Catalyst",
    "archetype": "THERMAL_KINETICS",
    "structuredEffects": [
      {
        "effectId": "B12_EFF_48",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 500,
              "statTarget": "ATK",
              "targetScope": "SELF"
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Tăng 500 ATK cho bản thân, trừ 300 ATK toàn bộ quái thú đối phương."
      }
    ]
  },
  {
    "id": "card_b12_049_synchro_platinum_catalytic_converter_49",
    "name": "Xúc Tác Bạch Kim Chuyển Hóa — Bậc 5 (Cộng Hưởng 7)",
    "name_en": "Platinum Catalytic Converter — Level 5 Synchro 7",
    "cardType": "SYNCHRO_MONSTER",
    "rarity": "ULTRA_RARE",
    "attribute": "NOBLE_VOID",
    "manaCost": 4,
    "level": 5,
    "synchroLevel": 5,
    "synchroMaterialsRequired": {
      "tunerCount": 1,
      "nonTunerMinCount": 1
    },
    "atk": 3050,
    "def": 2850,
    "chemicalFormula": "Pt/Rh/Pd",
    "effectCode": "SYNCHRO_B12_PLATINUM_CATALYTIC_CONVERTER_RES_49",
    "effectText": "1 Tuner + 1+ quái thú phi-Tuner có tổng Level bằng đúng 5. Khi được triệu hồi Đồng Bộ: Tăng 500 ATK cho bản thân và giảm 300 ATK tất cả quái thú địch.",
    "scientificLore": "Cộng hưởng xúc tác Xúc Tác Bạch Kim Chuyển Hóa (Pt/Rh/Pd) hạ thấp hàng rào năng lượng hoạt hóa Arrhenius, tăng tốc độ phản ứng lên hàng triệu lần theo SGK Hóa học 10 GDPT 2018.",
    "relatedEquation": "2CO + 2NO → 2CO₂ + N₂",
    "iupacName": "Platinum Catalytic Converter Catalyst",
    "archetype": "PRECIOUS_CATALYST",
    "structuredEffects": [
      {
        "effectId": "B12_EFF_49",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 500,
              "statTarget": "ATK",
              "targetScope": "SELF"
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Tăng 500 ATK cho bản thân, trừ 300 ATK toàn bộ quái thú đối phương."
      }
    ]
  },
  {
    "id": "card_b12_050_synchro_alpha_amylase_synchro_enzyme_50",
    "name": "Enzyme Đồng Bộ Amylase — Bậc 6 (Cộng Hưởng 7)",
    "name_en": "Alpha-Amylase Synchro Enzyme — Level 6 Synchro 7",
    "cardType": "SYNCHRO_MONSTER",
    "rarity": "SECRET_RARE",
    "attribute": "AQUA",
    "manaCost": 5,
    "level": 6,
    "synchroLevel": 6,
    "synchroMaterialsRequired": {
      "tunerCount": 1,
      "nonTunerMinCount": 1
    },
    "atk": 3260,
    "def": 3060,
    "chemicalFormula": "Enzyme",
    "effectCode": "SYNCHRO_B12_ALPHA_AMYLASE_SYNCHRO_ENZYME_RES_50",
    "effectText": "1 Tuner + 1+ quái thú phi-Tuner có tổng Level bằng đúng 6. Khi được triệu hồi Đồng Bộ: Tăng 500 ATK cho bản thân và giảm 300 ATK tất cả quái thú địch.",
    "scientificLore": "Cộng hưởng xúc tác Enzyme Đồng Bộ Amylase (Enzyme) hạ thấp hàng rào năng lượng hoạt hóa Arrhenius, tăng tốc độ phản ứng lên hàng triệu lần theo SGK Hóa học 10 GDPT 2018.",
    "relatedEquation": "(C₆H₁₀O₅)n + nH₂O --Amylase--> nC₁₂H₂₂O₁₁",
    "iupacName": "Alpha-Amylase Synchro Enzyme Catalyst",
    "archetype": "THERMAL_KINETICS",
    "structuredEffects": [
      {
        "effectId": "B12_EFF_50",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 500,
              "statTarget": "ATK",
              "targetScope": "SELF"
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Tăng 500 ATK cho bản thân, trừ 300 ATK toàn bộ quái thú đối phương."
      }
    ]
  },
  {
    "id": "card_b12_051_synchro_tio2_photocatalytic_resonance_51",
    "name": "Quang Xúc Tác Titan Dioxit — Bậc 7 (Cộng Hưởng 7)",
    "name_en": "TiO2 Photocatalytic Resonance — Level 7 Synchro 7",
    "cardType": "SYNCHRO_MONSTER",
    "rarity": "COMMON",
    "attribute": "ELECTRO",
    "manaCost": 6,
    "level": 7,
    "synchroLevel": 7,
    "synchroMaterialsRequired": {
      "tunerCount": 1,
      "nonTunerMinCount": 1
    },
    "atk": 3470,
    "def": 3020,
    "chemicalFormula": "TiO2/UV",
    "effectCode": "SYNCHRO_B12_TIO2_PHOTOCATALYTIC_RESONANCE_RES_51",
    "effectText": "1 Tuner + 1+ quái thú phi-Tuner có tổng Level bằng đúng 7. Khi được triệu hồi Đồng Bộ: Tăng 500 ATK cho bản thân và giảm 300 ATK tất cả quái thú địch.",
    "scientificLore": "Cộng hưởng xúc tác Quang Xúc Tác Titan Dioxit (TiO2/UV) hạ thấp hàng rào năng lượng hoạt hóa Arrhenius, tăng tốc độ phản ứng lên hàng triệu lần theo SGK Hóa học 10 GDPT 2018.",
    "relatedEquation": "TiO₂ + hν → e⁻ + h⁺ → ·OH + ·O₂⁻",
    "iupacName": "TiO2 Photocatalytic Resonance Catalyst",
    "archetype": "PRECIOUS_CATALYST",
    "structuredEffects": [
      {
        "effectId": "B12_EFF_51",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 500,
              "statTarget": "ATK",
              "targetScope": "SELF"
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Tăng 500 ATK cho bản thân, trừ 300 ATK toàn bộ quái thú đối phương."
      }
    ]
  },
  {
    "id": "card_b12_052_synchro_haber_iron_catalyst_core_52",
    "name": "Xúc Tác Sắt Tổng Hợp Amoniac — Bậc 8 (Cộng Hưởng 7)",
    "name_en": "Haber Iron Catalyst Core — Level 8 Synchro 7",
    "cardType": "SYNCHRO_MONSTER",
    "rarity": "COMMON",
    "attribute": "PYRO",
    "manaCost": 7,
    "level": 8,
    "synchroLevel": 8,
    "synchroMaterialsRequired": {
      "tunerCount": 1,
      "nonTunerMinCount": 1
    },
    "atk": 3680,
    "def": 3230,
    "chemicalFormula": "Fe-K2O-Al2O3",
    "effectCode": "SYNCHRO_B12_HABER_IRON_CATALYST_CORE_RES_52",
    "effectText": "1 Tuner + 1+ quái thú phi-Tuner có tổng Level bằng đúng 8. Khi được triệu hồi Đồng Bộ: Tăng 500 ATK cho bản thân và giảm 300 ATK tất cả quái thú địch.",
    "scientificLore": "Cộng hưởng xúc tác Xúc Tác Sắt Tổng Hợp Amoniac (Fe-K2O-Al2O3) hạ thấp hàng rào năng lượng hoạt hóa Arrhenius, tăng tốc độ phản ứng lên hàng triệu lần theo SGK Hóa học 10 GDPT 2018.",
    "relatedEquation": "N₂ + 3H₂ --Fe/450°C/200atm--> 2NH₃",
    "iupacName": "Haber Iron Catalyst Core Catalyst",
    "archetype": "THERMAL_KINETICS",
    "structuredEffects": [
      {
        "effectId": "B12_EFF_52",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 500,
              "statTarget": "ATK",
              "targetScope": "SELF"
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Tăng 500 ATK cho bản thân, trừ 300 ATK toàn bộ quái thú đối phương."
      }
    ]
  },
  {
    "id": "card_b12_053_synchro_vanadium_pentoxide_converter_53",
    "name": "Xúc Tác Vani Đen Tiếp Xúc — Bậc 9 (Cộng Hưởng 7)",
    "name_en": "Vanadium Pentoxide Converter — Level 9 Synchro 7",
    "cardType": "SYNCHRO_MONSTER",
    "rarity": "COMMON",
    "attribute": "TERRA",
    "manaCost": 8,
    "level": 9,
    "synchroLevel": 9,
    "synchroMaterialsRequired": {
      "tunerCount": 1,
      "nonTunerMinCount": 1
    },
    "atk": 3730,
    "def": 3440,
    "chemicalFormula": "V2O5",
    "effectCode": "SYNCHRO_B12_VANADIUM_PENTOXIDE_CONVERTER_RES_53",
    "effectText": "1 Tuner + 1+ quái thú phi-Tuner có tổng Level bằng đúng 9. Khi được triệu hồi Đồng Bộ: Tăng 500 ATK cho bản thân và giảm 300 ATK tất cả quái thú địch.",
    "scientificLore": "Cộng hưởng xúc tác Xúc Tác Vani Đen Tiếp Xúc (V2O5) hạ thấp hàng rào năng lượng hoạt hóa Arrhenius, tăng tốc độ phản ứng lên hàng triệu lần theo SGK Hóa học 10 GDPT 2018.",
    "relatedEquation": "2SO₂ + O₂ --V₂O₅/450°C--> 2SO₃",
    "iupacName": "Vanadium Pentoxide Converter Catalyst",
    "archetype": "PRECIOUS_CATALYST",
    "structuredEffects": [
      {
        "effectId": "B12_EFF_53",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 500,
              "statTarget": "ATK",
              "targetScope": "SELF"
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Tăng 500 ATK cho bản thân, trừ 300 ATK toàn bộ quái thú đối phương."
      }
    ]
  },
  {
    "id": "card_b12_054_synchro_metallocene_stereospecific_synchro_54",
    "name": "Xúc Tác Cơ Kim Metallocene — Bậc 10 (Cộng Hưởng 7)",
    "name_en": "Metallocene Stereospecific Synchro — Level 10 Synchro 7",
    "cardType": "SYNCHRO_MONSTER",
    "rarity": "RARE",
    "attribute": "ELECTRO",
    "manaCost": 8,
    "level": 10,
    "synchroLevel": 10,
    "synchroMaterialsRequired": {
      "tunerCount": 1,
      "nonTunerMinCount": 1
    },
    "atk": 3940,
    "def": 3650,
    "chemicalFormula": "Cp2ZrCl2",
    "effectCode": "SYNCHRO_B12_METALLOCENE_STEREOSPECIFIC_SYNCHRO_RES_54",
    "effectText": "1 Tuner + 1+ quái thú phi-Tuner có tổng Level bằng đúng 10. Khi được triệu hồi Đồng Bộ: Tăng 500 ATK cho bản thân và giảm 300 ATK tất cả quái thú địch.",
    "scientificLore": "Cộng hưởng xúc tác Xúc Tác Cơ Kim Metallocene (Cp2ZrCl2) hạ thấp hàng rào năng lượng hoạt hóa Arrhenius, tăng tốc độ phản ứng lên hàng triệu lần theo SGK Hóa học 10 GDPT 2018.",
    "relatedEquation": "Isotactic Polypropylene Synthesis Center",
    "iupacName": "Metallocene Stereospecific Synchro Catalyst",
    "archetype": "THERMAL_KINETICS",
    "structuredEffects": [
      {
        "effectId": "B12_EFF_54",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 500,
              "statTarget": "ATK",
              "targetScope": "SELF"
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Tăng 500 ATK cho bản thân, trừ 300 ATK toàn bộ quái thú đối phương."
      }
    ]
  },
  {
    "id": "card_b12_055_synchro_grubbs_olefin_metathesis_engine_55",
    "name": "Phức Xúc Tác Grubbs Đổi Vị — Bậc 5 (Cộng Hưởng 7)",
    "name_en": "Grubbs Olefin Metathesis Engine — Level 5 Synchro 7",
    "cardType": "SYNCHRO_MONSTER",
    "rarity": "RARE",
    "attribute": "TERRA",
    "manaCost": 4,
    "level": 5,
    "synchroLevel": 5,
    "synchroMaterialsRequired": {
      "tunerCount": 1,
      "nonTunerMinCount": 1
    },
    "atk": 3130,
    "def": 2900,
    "chemicalFormula": "Ru-Carbene",
    "effectCode": "SYNCHRO_B12_GRUBBS_OLEFIN_METATHESIS_ENGINE_RES_55",
    "effectText": "1 Tuner + 1+ quái thú phi-Tuner có tổng Level bằng đúng 5. Khi được triệu hồi Đồng Bộ: Tăng 500 ATK cho bản thân và giảm 300 ATK tất cả quái thú địch.",
    "scientificLore": "Cộng hưởng xúc tác Phức Xúc Tác Grubbs Đổi Vị (Ru-Carbene) hạ thấp hàng rào năng lượng hoạt hóa Arrhenius, tăng tốc độ phản ứng lên hàng triệu lần theo SGK Hóa học 10 GDPT 2018.",
    "relatedEquation": "Alkene Metathesis Cleavage & Recombination",
    "iupacName": "Grubbs Olefin Metathesis Engine Catalyst",
    "archetype": "PRECIOUS_CATALYST",
    "structuredEffects": [
      {
        "effectId": "B12_EFF_55",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 500,
              "statTarget": "ATK",
              "targetScope": "SELF"
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Tăng 500 ATK cho bản thân, trừ 300 ATK toàn bộ quái thú đối phương."
      }
    ]
  },
  {
    "id": "card_b12_056_synchro_lipase_biocatalyst_resonance_56",
    "name": "Men Sinh Học Lipase — Bậc 6 (Cộng Hưởng 7)",
    "name_en": "Lipase Biocatalyst Resonance — Level 6 Synchro 7",
    "cardType": "SYNCHRO_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "AQUA",
    "manaCost": 5,
    "level": 6,
    "synchroLevel": 6,
    "synchroMaterialsRequired": {
      "tunerCount": 1,
      "nonTunerMinCount": 1
    },
    "atk": 3340,
    "def": 2860,
    "chemicalFormula": "Lipase",
    "effectCode": "SYNCHRO_B12_LIPASE_BIOCATALYST_RESONANCE_RES_56",
    "effectText": "1 Tuner + 1+ quái thú phi-Tuner có tổng Level bằng đúng 6. Khi được triệu hồi Đồng Bộ: Tăng 500 ATK cho bản thân và giảm 300 ATK tất cả quái thú địch.",
    "scientificLore": "Cộng hưởng xúc tác Men Sinh Học Lipase (Lipase) hạ thấp hàng rào năng lượng hoạt hóa Arrhenius, tăng tốc độ phản ứng lên hàng triệu lần theo SGK Hóa học 10 GDPT 2018.",
    "relatedEquation": "Triglyceride Hydrolysis Active Site",
    "iupacName": "Lipase Biocatalyst Resonance Catalyst",
    "archetype": "THERMAL_KINETICS",
    "structuredEffects": [
      {
        "effectId": "B12_EFF_56",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 500,
              "statTarget": "ATK",
              "targetScope": "SELF"
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Tăng 500 ATK cho bản thân, trừ 300 ATK toàn bộ quái thú đối phương."
      }
    ]
  },
  {
    "id": "card_b12_057_synchro_platinum_catalytic_converter_57",
    "name": "Xúc Tác Bạch Kim Chuyển Hóa — Bậc 7 (Cộng Hưởng 8)",
    "name_en": "Platinum Catalytic Converter — Level 7 Synchro 8",
    "cardType": "SYNCHRO_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "NOBLE_VOID",
    "manaCost": 6,
    "level": 7,
    "synchroLevel": 7,
    "synchroMaterialsRequired": {
      "tunerCount": 1,
      "nonTunerMinCount": 1
    },
    "atk": 3390,
    "def": 3070,
    "chemicalFormula": "Pt/Rh/Pd",
    "effectCode": "SYNCHRO_B12_PLATINUM_CATALYTIC_CONVERTER_RES_57",
    "effectText": "1 Tuner + 1+ quái thú phi-Tuner có tổng Level bằng đúng 7. Khi được triệu hồi Đồng Bộ: Tăng 500 ATK cho bản thân và giảm 300 ATK tất cả quái thú địch.",
    "scientificLore": "Cộng hưởng xúc tác Xúc Tác Bạch Kim Chuyển Hóa (Pt/Rh/Pd) hạ thấp hàng rào năng lượng hoạt hóa Arrhenius, tăng tốc độ phản ứng lên hàng triệu lần theo SGK Hóa học 10 GDPT 2018.",
    "relatedEquation": "2CO + 2NO → 2CO₂ + N₂",
    "iupacName": "Platinum Catalytic Converter Catalyst",
    "archetype": "PRECIOUS_CATALYST",
    "structuredEffects": [
      {
        "effectId": "B12_EFF_57",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 500,
              "statTarget": "ATK",
              "targetScope": "SELF"
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Tăng 500 ATK cho bản thân, trừ 300 ATK toàn bộ quái thú đối phương."
      }
    ]
  },
  {
    "id": "card_b12_058_synchro_alpha_amylase_synchro_enzyme_58",
    "name": "Enzyme Đồng Bộ Amylase — Bậc 8 (Cộng Hưởng 8)",
    "name_en": "Alpha-Amylase Synchro Enzyme — Level 8 Synchro 8",
    "cardType": "SYNCHRO_MONSTER",
    "rarity": "ULTRA_RARE",
    "attribute": "AQUA",
    "manaCost": 7,
    "level": 8,
    "synchroLevel": 8,
    "synchroMaterialsRequired": {
      "tunerCount": 1,
      "nonTunerMinCount": 1
    },
    "atk": 3600,
    "def": 3280,
    "chemicalFormula": "Enzyme",
    "effectCode": "SYNCHRO_B12_ALPHA_AMYLASE_SYNCHRO_ENZYME_RES_58",
    "effectText": "1 Tuner + 1+ quái thú phi-Tuner có tổng Level bằng đúng 8. Khi được triệu hồi Đồng Bộ: Tăng 500 ATK cho bản thân và giảm 300 ATK tất cả quái thú địch.",
    "scientificLore": "Cộng hưởng xúc tác Enzyme Đồng Bộ Amylase (Enzyme) hạ thấp hàng rào năng lượng hoạt hóa Arrhenius, tăng tốc độ phản ứng lên hàng triệu lần theo SGK Hóa học 10 GDPT 2018.",
    "relatedEquation": "(C₆H₁₀O₅)n + nH₂O --Amylase--> nC₁₂H₂₂O₁₁",
    "iupacName": "Alpha-Amylase Synchro Enzyme Catalyst",
    "archetype": "THERMAL_KINETICS",
    "structuredEffects": [
      {
        "effectId": "B12_EFF_58",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 500,
              "statTarget": "ATK",
              "targetScope": "SELF"
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Tăng 500 ATK cho bản thân, trừ 300 ATK toàn bộ quái thú đối phương."
      }
    ]
  },
  {
    "id": "card_b12_059_synchro_tio2_photocatalytic_resonance_59",
    "name": "Quang Xúc Tác Titan Dioxit — Bậc 9 (Cộng Hưởng 8)",
    "name_en": "TiO2 Photocatalytic Resonance — Level 9 Synchro 8",
    "cardType": "SYNCHRO_MONSTER",
    "rarity": "SECRET_RARE",
    "attribute": "ELECTRO",
    "manaCost": 8,
    "level": 9,
    "synchroLevel": 9,
    "synchroMaterialsRequired": {
      "tunerCount": 1,
      "nonTunerMinCount": 1
    },
    "atk": 3810,
    "def": 3490,
    "chemicalFormula": "TiO2/UV",
    "effectCode": "SYNCHRO_B12_TIO2_PHOTOCATALYTIC_RESONANCE_RES_59",
    "effectText": "1 Tuner + 1+ quái thú phi-Tuner có tổng Level bằng đúng 9. Khi được triệu hồi Đồng Bộ: Tăng 500 ATK cho bản thân và giảm 300 ATK tất cả quái thú địch.",
    "scientificLore": "Cộng hưởng xúc tác Quang Xúc Tác Titan Dioxit (TiO2/UV) hạ thấp hàng rào năng lượng hoạt hóa Arrhenius, tăng tốc độ phản ứng lên hàng triệu lần theo SGK Hóa học 10 GDPT 2018.",
    "relatedEquation": "TiO₂ + hν → e⁻ + h⁺ → ·OH + ·O₂⁻",
    "iupacName": "TiO2 Photocatalytic Resonance Catalyst",
    "archetype": "PRECIOUS_CATALYST",
    "structuredEffects": [
      {
        "effectId": "B12_EFF_59",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 500,
              "statTarget": "ATK",
              "targetScope": "SELF"
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Tăng 500 ATK cho bản thân, trừ 300 ATK toàn bộ quái thú đối phương."
      }
    ]
  },
  {
    "id": "card_b12_060_synchro_haber_iron_catalyst_core_60",
    "name": "Xúc Tác Sắt Tổng Hợp Amoniac — Bậc 10 (Cộng Hưởng 8)",
    "name_en": "Haber Iron Catalyst Core — Level 10 Synchro 8",
    "cardType": "SYNCHRO_MONSTER",
    "rarity": "COMMON",
    "attribute": "PYRO",
    "manaCost": 8,
    "level": 10,
    "synchroLevel": 10,
    "synchroMaterialsRequired": {
      "tunerCount": 1,
      "nonTunerMinCount": 1
    },
    "atk": 4020,
    "def": 3700,
    "chemicalFormula": "Fe-K2O-Al2O3",
    "effectCode": "SYNCHRO_B12_HABER_IRON_CATALYST_CORE_RES_60",
    "effectText": "1 Tuner + 1+ quái thú phi-Tuner có tổng Level bằng đúng 10. Khi được triệu hồi Đồng Bộ: Tăng 500 ATK cho bản thân và giảm 300 ATK tất cả quái thú địch.",
    "scientificLore": "Cộng hưởng xúc tác Xúc Tác Sắt Tổng Hợp Amoniac (Fe-K2O-Al2O3) hạ thấp hàng rào năng lượng hoạt hóa Arrhenius, tăng tốc độ phản ứng lên hàng triệu lần theo SGK Hóa học 10 GDPT 2018.",
    "relatedEquation": "N₂ + 3H₂ --Fe/450°C/200atm--> 2NH₃",
    "iupacName": "Haber Iron Catalyst Core Catalyst",
    "archetype": "THERMAL_KINETICS",
    "structuredEffects": [
      {
        "effectId": "B12_EFF_60",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 500,
              "statTarget": "ATK",
              "targetScope": "SELF"
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Tăng 500 ATK cho bản thân, trừ 300 ATK toàn bộ quái thú đối phương."
      }
    ]
  },
  {
    "id": "card_b12_061_synchro_vanadium_pentoxide_converter_61",
    "name": "Xúc Tác Vani Đen Tiếp Xúc — Bậc 5 (Cộng Hưởng 8)",
    "name_en": "Vanadium Pentoxide Converter — Level 5 Synchro 8",
    "cardType": "SYNCHRO_MONSTER",
    "rarity": "COMMON",
    "attribute": "TERRA",
    "manaCost": 4,
    "level": 5,
    "synchroLevel": 5,
    "synchroMaterialsRequired": {
      "tunerCount": 1,
      "nonTunerMinCount": 1
    },
    "atk": 3050,
    "def": 2700,
    "chemicalFormula": "V2O5",
    "effectCode": "SYNCHRO_B12_VANADIUM_PENTOXIDE_CONVERTER_RES_61",
    "effectText": "1 Tuner + 1+ quái thú phi-Tuner có tổng Level bằng đúng 5. Khi được triệu hồi Đồng Bộ: Tăng 500 ATK cho bản thân và giảm 300 ATK tất cả quái thú địch.",
    "scientificLore": "Cộng hưởng xúc tác Xúc Tác Vani Đen Tiếp Xúc (V2O5) hạ thấp hàng rào năng lượng hoạt hóa Arrhenius, tăng tốc độ phản ứng lên hàng triệu lần theo SGK Hóa học 10 GDPT 2018.",
    "relatedEquation": "2SO₂ + O₂ --V₂O₅/450°C--> 2SO₃",
    "iupacName": "Vanadium Pentoxide Converter Catalyst",
    "archetype": "PRECIOUS_CATALYST",
    "structuredEffects": [
      {
        "effectId": "B12_EFF_61",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 500,
              "statTarget": "ATK",
              "targetScope": "SELF"
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Tăng 500 ATK cho bản thân, trừ 300 ATK toàn bộ quái thú đối phương."
      }
    ]
  },
  {
    "id": "card_b12_062_synchro_metallocene_stereospecific_synchro_62",
    "name": "Xúc Tác Cơ Kim Metallocene — Bậc 6 (Cộng Hưởng 8)",
    "name_en": "Metallocene Stereospecific Synchro — Level 6 Synchro 8",
    "cardType": "SYNCHRO_MONSTER",
    "rarity": "COMMON",
    "attribute": "ELECTRO",
    "manaCost": 5,
    "level": 6,
    "synchroLevel": 6,
    "synchroMaterialsRequired": {
      "tunerCount": 1,
      "nonTunerMinCount": 1
    },
    "atk": 3260,
    "def": 2910,
    "chemicalFormula": "Cp2ZrCl2",
    "effectCode": "SYNCHRO_B12_METALLOCENE_STEREOSPECIFIC_SYNCHRO_RES_62",
    "effectText": "1 Tuner + 1+ quái thú phi-Tuner có tổng Level bằng đúng 6. Khi được triệu hồi Đồng Bộ: Tăng 500 ATK cho bản thân và giảm 300 ATK tất cả quái thú địch.",
    "scientificLore": "Cộng hưởng xúc tác Xúc Tác Cơ Kim Metallocene (Cp2ZrCl2) hạ thấp hàng rào năng lượng hoạt hóa Arrhenius, tăng tốc độ phản ứng lên hàng triệu lần theo SGK Hóa học 10 GDPT 2018.",
    "relatedEquation": "Isotactic Polypropylene Synthesis Center",
    "iupacName": "Metallocene Stereospecific Synchro Catalyst",
    "archetype": "THERMAL_KINETICS",
    "structuredEffects": [
      {
        "effectId": "B12_EFF_62",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 500,
              "statTarget": "ATK",
              "targetScope": "SELF"
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Tăng 500 ATK cho bản thân, trừ 300 ATK toàn bộ quái thú đối phương."
      }
    ]
  },
  {
    "id": "card_b12_063_synchro_grubbs_olefin_metathesis_engine_63",
    "name": "Phức Xúc Tác Grubbs Đổi Vị — Bậc 7 (Cộng Hưởng 8)",
    "name_en": "Grubbs Olefin Metathesis Engine — Level 7 Synchro 8",
    "cardType": "SYNCHRO_MONSTER",
    "rarity": "RARE",
    "attribute": "TERRA",
    "manaCost": 6,
    "level": 7,
    "synchroLevel": 7,
    "synchroMaterialsRequired": {
      "tunerCount": 1,
      "nonTunerMinCount": 1
    },
    "atk": 3470,
    "def": 3120,
    "chemicalFormula": "Ru-Carbene",
    "effectCode": "SYNCHRO_B12_GRUBBS_OLEFIN_METATHESIS_ENGINE_RES_63",
    "effectText": "1 Tuner + 1+ quái thú phi-Tuner có tổng Level bằng đúng 7. Khi được triệu hồi Đồng Bộ: Tăng 500 ATK cho bản thân và giảm 300 ATK tất cả quái thú địch.",
    "scientificLore": "Cộng hưởng xúc tác Phức Xúc Tác Grubbs Đổi Vị (Ru-Carbene) hạ thấp hàng rào năng lượng hoạt hóa Arrhenius, tăng tốc độ phản ứng lên hàng triệu lần theo SGK Hóa học 10 GDPT 2018.",
    "relatedEquation": "Alkene Metathesis Cleavage & Recombination",
    "iupacName": "Grubbs Olefin Metathesis Engine Catalyst",
    "archetype": "PRECIOUS_CATALYST",
    "structuredEffects": [
      {
        "effectId": "B12_EFF_63",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 500,
              "statTarget": "ATK",
              "targetScope": "SELF"
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Tăng 500 ATK cho bản thân, trừ 300 ATK toàn bộ quái thú đối phương."
      }
    ]
  },
  {
    "id": "card_b12_064_synchro_lipase_biocatalyst_resonance_64",
    "name": "Men Sinh Học Lipase — Bậc 8 (Cộng Hưởng 8)",
    "name_en": "Lipase Biocatalyst Resonance — Level 8 Synchro 8",
    "cardType": "SYNCHRO_MONSTER",
    "rarity": "RARE",
    "attribute": "AQUA",
    "manaCost": 7,
    "level": 8,
    "synchroLevel": 8,
    "synchroMaterialsRequired": {
      "tunerCount": 1,
      "nonTunerMinCount": 1
    },
    "atk": 3680,
    "def": 3330,
    "chemicalFormula": "Lipase",
    "effectCode": "SYNCHRO_B12_LIPASE_BIOCATALYST_RESONANCE_RES_64",
    "effectText": "1 Tuner + 1+ quái thú phi-Tuner có tổng Level bằng đúng 8. Khi được triệu hồi Đồng Bộ: Tăng 500 ATK cho bản thân và giảm 300 ATK tất cả quái thú địch.",
    "scientificLore": "Cộng hưởng xúc tác Men Sinh Học Lipase (Lipase) hạ thấp hàng rào năng lượng hoạt hóa Arrhenius, tăng tốc độ phản ứng lên hàng triệu lần theo SGK Hóa học 10 GDPT 2018.",
    "relatedEquation": "Triglyceride Hydrolysis Active Site",
    "iupacName": "Lipase Biocatalyst Resonance Catalyst",
    "archetype": "THERMAL_KINETICS",
    "structuredEffects": [
      {
        "effectId": "B12_EFF_64",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 500,
              "statTarget": "ATK",
              "targetScope": "SELF"
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Tăng 500 ATK cho bản thân, trừ 300 ATK toàn bộ quái thú đối phương."
      }
    ]
  },
  {
    "id": "card_b12_065_synchro_platinum_catalytic_converter_65",
    "name": "Xúc Tác Bạch Kim Chuyển Hóa — Bậc 9 (Cộng Hưởng 9)",
    "name_en": "Platinum Catalytic Converter — Level 9 Synchro 9",
    "cardType": "SYNCHRO_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "NOBLE_VOID",
    "manaCost": 8,
    "level": 9,
    "synchroLevel": 9,
    "synchroMaterialsRequired": {
      "tunerCount": 1,
      "nonTunerMinCount": 1
    },
    "atk": 3730,
    "def": 3540,
    "chemicalFormula": "Pt/Rh/Pd",
    "effectCode": "SYNCHRO_B12_PLATINUM_CATALYTIC_CONVERTER_RES_65",
    "effectText": "1 Tuner + 1+ quái thú phi-Tuner có tổng Level bằng đúng 9. Khi được triệu hồi Đồng Bộ: Tăng 500 ATK cho bản thân và giảm 300 ATK tất cả quái thú địch.",
    "scientificLore": "Cộng hưởng xúc tác Xúc Tác Bạch Kim Chuyển Hóa (Pt/Rh/Pd) hạ thấp hàng rào năng lượng hoạt hóa Arrhenius, tăng tốc độ phản ứng lên hàng triệu lần theo SGK Hóa học 10 GDPT 2018.",
    "relatedEquation": "2CO + 2NO → 2CO₂ + N₂",
    "iupacName": "Platinum Catalytic Converter Catalyst",
    "archetype": "PRECIOUS_CATALYST",
    "structuredEffects": [
      {
        "effectId": "B12_EFF_65",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 500,
              "statTarget": "ATK",
              "targetScope": "SELF"
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Tăng 500 ATK cho bản thân, trừ 300 ATK toàn bộ quái thú đối phương."
      }
    ]
  },
  {
    "id": "card_b12_066_synchro_alpha_amylase_synchro_enzyme_66",
    "name": "Enzyme Đồng Bộ Amylase — Bậc 10 (Cộng Hưởng 9)",
    "name_en": "Alpha-Amylase Synchro Enzyme — Level 10 Synchro 9",
    "cardType": "SYNCHRO_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "AQUA",
    "manaCost": 8,
    "level": 10,
    "synchroLevel": 10,
    "synchroMaterialsRequired": {
      "tunerCount": 1,
      "nonTunerMinCount": 1
    },
    "atk": 3940,
    "def": 3500,
    "chemicalFormula": "Enzyme",
    "effectCode": "SYNCHRO_B12_ALPHA_AMYLASE_SYNCHRO_ENZYME_RES_66",
    "effectText": "1 Tuner + 1+ quái thú phi-Tuner có tổng Level bằng đúng 10. Khi được triệu hồi Đồng Bộ: Tăng 500 ATK cho bản thân và giảm 300 ATK tất cả quái thú địch.",
    "scientificLore": "Cộng hưởng xúc tác Enzyme Đồng Bộ Amylase (Enzyme) hạ thấp hàng rào năng lượng hoạt hóa Arrhenius, tăng tốc độ phản ứng lên hàng triệu lần theo SGK Hóa học 10 GDPT 2018.",
    "relatedEquation": "(C₆H₁₀O₅)n + nH₂O --Amylase--> nC₁₂H₂₂O₁₁",
    "iupacName": "Alpha-Amylase Synchro Enzyme Catalyst",
    "archetype": "THERMAL_KINETICS",
    "structuredEffects": [
      {
        "effectId": "B12_EFF_66",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 500,
              "statTarget": "ATK",
              "targetScope": "SELF"
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Tăng 500 ATK cho bản thân, trừ 300 ATK toàn bộ quái thú đối phương."
      }
    ]
  },
  {
    "id": "card_b12_067_synchro_tio2_photocatalytic_resonance_67",
    "name": "Quang Xúc Tác Titan Dioxit — Bậc 5 (Cộng Hưởng 9)",
    "name_en": "TiO2 Photocatalytic Resonance — Level 5 Synchro 9",
    "cardType": "SYNCHRO_MONSTER",
    "rarity": "ULTRA_RARE",
    "attribute": "ELECTRO",
    "manaCost": 4,
    "level": 5,
    "synchroLevel": 5,
    "synchroMaterialsRequired": {
      "tunerCount": 1,
      "nonTunerMinCount": 1
    },
    "atk": 3130,
    "def": 2750,
    "chemicalFormula": "TiO2/UV",
    "effectCode": "SYNCHRO_B12_TIO2_PHOTOCATALYTIC_RESONANCE_RES_67",
    "effectText": "1 Tuner + 1+ quái thú phi-Tuner có tổng Level bằng đúng 5. Khi được triệu hồi Đồng Bộ: Tăng 500 ATK cho bản thân và giảm 300 ATK tất cả quái thú địch.",
    "scientificLore": "Cộng hưởng xúc tác Quang Xúc Tác Titan Dioxit (TiO2/UV) hạ thấp hàng rào năng lượng hoạt hóa Arrhenius, tăng tốc độ phản ứng lên hàng triệu lần theo SGK Hóa học 10 GDPT 2018.",
    "relatedEquation": "TiO₂ + hν → e⁻ + h⁺ → ·OH + ·O₂⁻",
    "iupacName": "TiO2 Photocatalytic Resonance Catalyst",
    "archetype": "PRECIOUS_CATALYST",
    "structuredEffects": [
      {
        "effectId": "B12_EFF_67",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 500,
              "statTarget": "ATK",
              "targetScope": "SELF"
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Tăng 500 ATK cho bản thân, trừ 300 ATK toàn bộ quái thú đối phương."
      }
    ]
  },
  {
    "id": "card_b12_068_synchro_haber_iron_catalyst_core_68",
    "name": "Xúc Tác Sắt Tổng Hợp Amoniac — Bậc 6 (Cộng Hưởng 9)",
    "name_en": "Haber Iron Catalyst Core — Level 6 Synchro 9",
    "cardType": "SYNCHRO_MONSTER",
    "rarity": "SECRET_RARE",
    "attribute": "PYRO",
    "manaCost": 5,
    "level": 6,
    "synchroLevel": 6,
    "synchroMaterialsRequired": {
      "tunerCount": 1,
      "nonTunerMinCount": 1
    },
    "atk": 3340,
    "def": 2960,
    "chemicalFormula": "Fe-K2O-Al2O3",
    "effectCode": "SYNCHRO_B12_HABER_IRON_CATALYST_CORE_RES_68",
    "effectText": "1 Tuner + 1+ quái thú phi-Tuner có tổng Level bằng đúng 6. Khi được triệu hồi Đồng Bộ: Tăng 500 ATK cho bản thân và giảm 300 ATK tất cả quái thú địch.",
    "scientificLore": "Cộng hưởng xúc tác Xúc Tác Sắt Tổng Hợp Amoniac (Fe-K2O-Al2O3) hạ thấp hàng rào năng lượng hoạt hóa Arrhenius, tăng tốc độ phản ứng lên hàng triệu lần theo SGK Hóa học 10 GDPT 2018.",
    "relatedEquation": "N₂ + 3H₂ --Fe/450°C/200atm--> 2NH₃",
    "iupacName": "Haber Iron Catalyst Core Catalyst",
    "archetype": "THERMAL_KINETICS",
    "structuredEffects": [
      {
        "effectId": "B12_EFF_68",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 500,
              "statTarget": "ATK",
              "targetScope": "SELF"
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Tăng 500 ATK cho bản thân, trừ 300 ATK toàn bộ quái thú đối phương."
      }
    ]
  },
  {
    "id": "card_b12_069_synchro_vanadium_pentoxide_converter_69",
    "name": "Xúc Tác Vani Đen Tiếp Xúc — Bậc 7 (Cộng Hưởng 9)",
    "name_en": "Vanadium Pentoxide Converter — Level 7 Synchro 9",
    "cardType": "SYNCHRO_MONSTER",
    "rarity": "COMMON",
    "attribute": "TERRA",
    "manaCost": 6,
    "level": 7,
    "synchroLevel": 7,
    "synchroMaterialsRequired": {
      "tunerCount": 1,
      "nonTunerMinCount": 1
    },
    "atk": 3390,
    "def": 3170,
    "chemicalFormula": "V2O5",
    "effectCode": "SYNCHRO_B12_VANADIUM_PENTOXIDE_CONVERTER_RES_69",
    "effectText": "1 Tuner + 1+ quái thú phi-Tuner có tổng Level bằng đúng 7. Khi được triệu hồi Đồng Bộ: Tăng 500 ATK cho bản thân và giảm 300 ATK tất cả quái thú địch.",
    "scientificLore": "Cộng hưởng xúc tác Xúc Tác Vani Đen Tiếp Xúc (V2O5) hạ thấp hàng rào năng lượng hoạt hóa Arrhenius, tăng tốc độ phản ứng lên hàng triệu lần theo SGK Hóa học 10 GDPT 2018.",
    "relatedEquation": "2SO₂ + O₂ --V₂O₅/450°C--> 2SO₃",
    "iupacName": "Vanadium Pentoxide Converter Catalyst",
    "archetype": "PRECIOUS_CATALYST",
    "structuredEffects": [
      {
        "effectId": "B12_EFF_69",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 500,
              "statTarget": "ATK",
              "targetScope": "SELF"
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Tăng 500 ATK cho bản thân, trừ 300 ATK toàn bộ quái thú đối phương."
      }
    ]
  },
  {
    "id": "card_b12_070_synchro_metallocene_stereospecific_synchro_70",
    "name": "Xúc Tác Cơ Kim Metallocene — Bậc 8 (Cộng Hưởng 9)",
    "name_en": "Metallocene Stereospecific Synchro — Level 8 Synchro 9",
    "cardType": "SYNCHRO_MONSTER",
    "rarity": "COMMON",
    "attribute": "ELECTRO",
    "manaCost": 7,
    "level": 8,
    "synchroLevel": 8,
    "synchroMaterialsRequired": {
      "tunerCount": 1,
      "nonTunerMinCount": 1
    },
    "atk": 3600,
    "def": 3380,
    "chemicalFormula": "Cp2ZrCl2",
    "effectCode": "SYNCHRO_B12_METALLOCENE_STEREOSPECIFIC_SYNCHRO_RES_70",
    "effectText": "1 Tuner + 1+ quái thú phi-Tuner có tổng Level bằng đúng 8. Khi được triệu hồi Đồng Bộ: Tăng 500 ATK cho bản thân và giảm 300 ATK tất cả quái thú địch.",
    "scientificLore": "Cộng hưởng xúc tác Xúc Tác Cơ Kim Metallocene (Cp2ZrCl2) hạ thấp hàng rào năng lượng hoạt hóa Arrhenius, tăng tốc độ phản ứng lên hàng triệu lần theo SGK Hóa học 10 GDPT 2018.",
    "relatedEquation": "Isotactic Polypropylene Synthesis Center",
    "iupacName": "Metallocene Stereospecific Synchro Catalyst",
    "archetype": "THERMAL_KINETICS",
    "structuredEffects": [
      {
        "effectId": "B12_EFF_70",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 500,
              "statTarget": "ATK",
              "targetScope": "SELF"
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Tăng 500 ATK cho bản thân, trừ 300 ATK toàn bộ quái thú đối phương."
      }
    ]
  },
  {
    "id": "card_b12_071_synchro_grubbs_olefin_metathesis_engine_71",
    "name": "Phức Xúc Tác Grubbs Đổi Vị — Bậc 9 (Cộng Hưởng 9)",
    "name_en": "Grubbs Olefin Metathesis Engine — Level 9 Synchro 9",
    "cardType": "SYNCHRO_MONSTER",
    "rarity": "COMMON",
    "attribute": "TERRA",
    "manaCost": 8,
    "level": 9,
    "synchroLevel": 9,
    "synchroMaterialsRequired": {
      "tunerCount": 1,
      "nonTunerMinCount": 1
    },
    "atk": 3810,
    "def": 3340,
    "chemicalFormula": "Ru-Carbene",
    "effectCode": "SYNCHRO_B12_GRUBBS_OLEFIN_METATHESIS_ENGINE_RES_71",
    "effectText": "1 Tuner + 1+ quái thú phi-Tuner có tổng Level bằng đúng 9. Khi được triệu hồi Đồng Bộ: Tăng 500 ATK cho bản thân và giảm 300 ATK tất cả quái thú địch.",
    "scientificLore": "Cộng hưởng xúc tác Phức Xúc Tác Grubbs Đổi Vị (Ru-Carbene) hạ thấp hàng rào năng lượng hoạt hóa Arrhenius, tăng tốc độ phản ứng lên hàng triệu lần theo SGK Hóa học 10 GDPT 2018.",
    "relatedEquation": "Alkene Metathesis Cleavage & Recombination",
    "iupacName": "Grubbs Olefin Metathesis Engine Catalyst",
    "archetype": "PRECIOUS_CATALYST",
    "structuredEffects": [
      {
        "effectId": "B12_EFF_71",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 500,
              "statTarget": "ATK",
              "targetScope": "SELF"
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Tăng 500 ATK cho bản thân, trừ 300 ATK toàn bộ quái thú đối phương."
      }
    ]
  },
  {
    "id": "card_b12_072_synchro_lipase_biocatalyst_resonance_72",
    "name": "Men Sinh Học Lipase — Bậc 10 (Cộng Hưởng 9)",
    "name_en": "Lipase Biocatalyst Resonance — Level 10 Synchro 9",
    "cardType": "SYNCHRO_MONSTER",
    "rarity": "RARE",
    "attribute": "AQUA",
    "manaCost": 8,
    "level": 10,
    "synchroLevel": 10,
    "synchroMaterialsRequired": {
      "tunerCount": 1,
      "nonTunerMinCount": 1
    },
    "atk": 4020,
    "def": 3550,
    "chemicalFormula": "Lipase",
    "effectCode": "SYNCHRO_B12_LIPASE_BIOCATALYST_RESONANCE_RES_72",
    "effectText": "1 Tuner + 1+ quái thú phi-Tuner có tổng Level bằng đúng 10. Khi được triệu hồi Đồng Bộ: Tăng 500 ATK cho bản thân và giảm 300 ATK tất cả quái thú địch.",
    "scientificLore": "Cộng hưởng xúc tác Men Sinh Học Lipase (Lipase) hạ thấp hàng rào năng lượng hoạt hóa Arrhenius, tăng tốc độ phản ứng lên hàng triệu lần theo SGK Hóa học 10 GDPT 2018.",
    "relatedEquation": "Triglyceride Hydrolysis Active Site",
    "iupacName": "Lipase Biocatalyst Resonance Catalyst",
    "archetype": "THERMAL_KINETICS",
    "structuredEffects": [
      {
        "effectId": "B12_EFF_72",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 500,
              "statTarget": "ATK",
              "targetScope": "SELF"
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Tăng 500 ATK cho bản thân, trừ 300 ATK toàn bộ quái thú đối phương."
      }
    ]
  },
  {
    "id": "card_b12_073_synchro_platinum_catalytic_converter_73",
    "name": "Xúc Tác Bạch Kim Chuyển Hóa — Bậc 5 (Cộng Hưởng 10)",
    "name_en": "Platinum Catalytic Converter — Level 5 Synchro 10",
    "cardType": "SYNCHRO_MONSTER",
    "rarity": "RARE",
    "attribute": "NOBLE_VOID",
    "manaCost": 4,
    "level": 5,
    "synchroLevel": 5,
    "synchroMaterialsRequired": {
      "tunerCount": 1,
      "nonTunerMinCount": 1
    },
    "atk": 3050,
    "def": 2800,
    "chemicalFormula": "Pt/Rh/Pd",
    "effectCode": "SYNCHRO_B12_PLATINUM_CATALYTIC_CONVERTER_RES_73",
    "effectText": "1 Tuner + 1+ quái thú phi-Tuner có tổng Level bằng đúng 5. Khi được triệu hồi Đồng Bộ: Tăng 500 ATK cho bản thân và giảm 300 ATK tất cả quái thú địch.",
    "scientificLore": "Cộng hưởng xúc tác Xúc Tác Bạch Kim Chuyển Hóa (Pt/Rh/Pd) hạ thấp hàng rào năng lượng hoạt hóa Arrhenius, tăng tốc độ phản ứng lên hàng triệu lần theo SGK Hóa học 10 GDPT 2018.",
    "relatedEquation": "2CO + 2NO → 2CO₂ + N₂",
    "iupacName": "Platinum Catalytic Converter Catalyst",
    "archetype": "PRECIOUS_CATALYST",
    "structuredEffects": [
      {
        "effectId": "B12_EFF_73",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 500,
              "statTarget": "ATK",
              "targetScope": "SELF"
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Tăng 500 ATK cho bản thân, trừ 300 ATK toàn bộ quái thú đối phương."
      }
    ]
  },
  {
    "id": "card_b12_074_synchro_alpha_amylase_synchro_enzyme_74",
    "name": "Enzyme Đồng Bộ Amylase — Bậc 6 (Cộng Hưởng 10)",
    "name_en": "Alpha-Amylase Synchro Enzyme — Level 6 Synchro 10",
    "cardType": "SYNCHRO_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "AQUA",
    "manaCost": 5,
    "level": 6,
    "synchroLevel": 6,
    "synchroMaterialsRequired": {
      "tunerCount": 1,
      "nonTunerMinCount": 1
    },
    "atk": 3260,
    "def": 3010,
    "chemicalFormula": "Enzyme",
    "effectCode": "SYNCHRO_B12_ALPHA_AMYLASE_SYNCHRO_ENZYME_RES_74",
    "effectText": "1 Tuner + 1+ quái thú phi-Tuner có tổng Level bằng đúng 6. Khi được triệu hồi Đồng Bộ: Tăng 500 ATK cho bản thân và giảm 300 ATK tất cả quái thú địch.",
    "scientificLore": "Cộng hưởng xúc tác Enzyme Đồng Bộ Amylase (Enzyme) hạ thấp hàng rào năng lượng hoạt hóa Arrhenius, tăng tốc độ phản ứng lên hàng triệu lần theo SGK Hóa học 10 GDPT 2018.",
    "relatedEquation": "(C₆H₁₀O₅)n + nH₂O --Amylase--> nC₁₂H₂₂O₁₁",
    "iupacName": "Alpha-Amylase Synchro Enzyme Catalyst",
    "archetype": "THERMAL_KINETICS",
    "structuredEffects": [
      {
        "effectId": "B12_EFF_74",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 500,
              "statTarget": "ATK",
              "targetScope": "SELF"
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Tăng 500 ATK cho bản thân, trừ 300 ATK toàn bộ quái thú đối phương."
      }
    ]
  },
  {
    "id": "card_b12_075_synchro_tio2_photocatalytic_resonance_75",
    "name": "Quang Xúc Tác Titan Dioxit — Bậc 7 (Cộng Hưởng 10)",
    "name_en": "TiO2 Photocatalytic Resonance — Level 7 Synchro 10",
    "cardType": "SYNCHRO_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "ELECTRO",
    "manaCost": 6,
    "level": 7,
    "synchroLevel": 7,
    "synchroMaterialsRequired": {
      "tunerCount": 1,
      "nonTunerMinCount": 1
    },
    "atk": 3470,
    "def": 3220,
    "chemicalFormula": "TiO2/UV",
    "effectCode": "SYNCHRO_B12_TIO2_PHOTOCATALYTIC_RESONANCE_RES_75",
    "effectText": "1 Tuner + 1+ quái thú phi-Tuner có tổng Level bằng đúng 7. Khi được triệu hồi Đồng Bộ: Tăng 500 ATK cho bản thân và giảm 300 ATK tất cả quái thú địch.",
    "scientificLore": "Cộng hưởng xúc tác Quang Xúc Tác Titan Dioxit (TiO2/UV) hạ thấp hàng rào năng lượng hoạt hóa Arrhenius, tăng tốc độ phản ứng lên hàng triệu lần theo SGK Hóa học 10 GDPT 2018.",
    "relatedEquation": "TiO₂ + hν → e⁻ + h⁺ → ·OH + ·O₂⁻",
    "iupacName": "TiO2 Photocatalytic Resonance Catalyst",
    "archetype": "PRECIOUS_CATALYST",
    "structuredEffects": [
      {
        "effectId": "B12_EFF_75",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 500,
              "statTarget": "ATK",
              "targetScope": "SELF"
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Tăng 500 ATK cho bản thân, trừ 300 ATK toàn bộ quái thú đối phương."
      }
    ]
  }
];
