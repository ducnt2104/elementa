// src/data/cards/batches/batch_24_traps_titration_passivation.ts
// Batch 24: Titration & Precipitation Precision Traps (80 cards)
// Automatically generated and validated for ELEMENTA Tactical TCG

import { PlayableCardDef } from '../../../domain/cardGameTypes';

export const BATCH_24_CARDS: PlayableCardDef[] = [
  {
    "id": "card_b24_001_titr_phenolphthalein_equivalence_point_trap_1",
    "name": "Chỉ Thị Màu Phenolphthalein Điểm Đổi Màu (Điểm Chuẩn 1)",
    "name_en": "Phenolphthalein Equivalence Point Trap (Endpoint Rank 1)",
    "cardType": "TRAP",
    "spellTrapSubtype": "NORMAL_TRAP",
    "spellSpeed": 2,
    "rarity": "RARE",
    "attribute": "AQUA",
    "manaCost": 1,
    "chemicalFormula": "C20H14O4",
    "effectCode": "TRAP_B24_PHENOLPHTHALEIN_EQUIVALENCE_POINT_TRAP_TITR_1",
    "effectText": "[Bẫy Chuẩn Độ / Titration Trap - Spell Speed 2]: Kích hoạt khi điểm sinh mệnh của bất kỳ đấu thủ nào thay đổi: Gây chính xác 500 LP sát thương chuẩn lên đối thủ và rút 1 lá bài từ Bộ bài.",
    "scientificLore": "Kỹ thuật chuẩn độ hóa học định lượng Chỉ Thị Màu Phenolphthalein Điểm Đổi Màu (Colorless pH < 8.2 → Pink/Magenta pH > 10.0) xác định chính xác nồng độ tại điểm tương đương theo chuẩn thực nghiệm Hóa học GDPT 2018.",
    "relatedEquation": "Colorless pH < 8.2 → Pink/Magenta pH > 10.0",
    "iupacName": "Phenolphthalein Equivalence Point Trap Assay",
    "archetype": "TITRATION_PRECISION",
    "structuredEffects": [
      {
        "effectId": "B24_EFF_1",
        "activationWindow": "ON_LP_CHANGE",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 500
            }
          },
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Chuẩn độ chính xác: Gây 500 LP và rút 1 lá bài khi LP biến động."
      }
    ]
  },
  {
    "id": "card_b24_002_titr_methyl_orange_acidic_endpoint_barrier_2",
    "name": "Chỉ Thị Màu Metyl Da Cam Vùng Axit (Điểm Chuẩn 1)",
    "name_en": "Methyl Orange Acidic Endpoint Barrier (Endpoint Rank 1)",
    "cardType": "TRAP",
    "spellTrapSubtype": "NORMAL_TRAP",
    "spellSpeed": 2,
    "rarity": "RARE",
    "attribute": "PYRO",
    "manaCost": 2,
    "chemicalFormula": "C14H14N3NaO3S",
    "effectCode": "TRAP_B24_METHYL_ORANGE_ACIDIC_ENDPOINT_BARRIER_TITR_2",
    "effectText": "[Bẫy Chuẩn Độ / Titration Trap - Spell Speed 2]: Kích hoạt khi điểm sinh mệnh của bất kỳ đấu thủ nào thay đổi: Gây chính xác 500 LP sát thương chuẩn lên đối thủ và rút 1 lá bài từ Bộ bài.",
    "scientificLore": "Kỹ thuật chuẩn độ hóa học định lượng Chỉ Thị Màu Metyl Da Cam Vùng Axit (Red pH < 3.1 → Yellow pH > 4.4) xác định chính xác nồng độ tại điểm tương đương theo chuẩn thực nghiệm Hóa học GDPT 2018.",
    "relatedEquation": "Red pH < 3.1 → Yellow pH > 4.4",
    "iupacName": "Methyl Orange Acidic Endpoint Barrier Assay",
    "archetype": "ALKALINE_EARTH_BASTION",
    "structuredEffects": [
      {
        "effectId": "B24_EFF_2",
        "activationWindow": "ON_LP_CHANGE",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 500
            }
          },
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Chuẩn độ chính xác: Gây 500 LP và rút 1 lá bài khi LP biến động."
      }
    ]
  },
  {
    "id": "card_b24_003_titr_mohr_silver_chromate_endpoint_trap_3",
    "name": "Chuẩn Độ Kết Tủa Phương Pháp Mohr (Điểm Chuẩn 1)",
    "name_en": "Mohr Silver Chromate Endpoint Trap (Endpoint Rank 1)",
    "cardType": "TRAP",
    "spellTrapSubtype": "NORMAL_TRAP",
    "spellSpeed": 2,
    "rarity": "SUPER_RARE",
    "attribute": "TERRA",
    "manaCost": 3,
    "chemicalFormula": "Ag2CrO4(red)",
    "effectCode": "TRAP_B24_MOHR_SILVER_CHROMATE_ENDPOINT_TRAP_TITR_3",
    "effectText": "[Bẫy Chuẩn Độ / Titration Trap - Spell Speed 2]: Kích hoạt khi điểm sinh mệnh của bất kỳ đấu thủ nào thay đổi: Gây chính xác 500 LP sát thương chuẩn lên đối thủ và rút 1 lá bài từ Bộ bài.",
    "scientificLore": "Kỹ thuật chuẩn độ hóa học định lượng Chuẩn Độ Kết Tủa Phương Pháp Mohr (2Ag⁺ + CrO₄²⁻ → Ag₂CrO₄(s)↓ (Brick Red Precipitate)) xác định chính xác nồng độ tại điểm tương đương theo chuẩn thực nghiệm Hóa học GDPT 2018.",
    "relatedEquation": "2Ag⁺ + CrO₄²⁻ → Ag₂CrO₄(s)↓ (Brick Red Precipitate)",
    "iupacName": "Mohr Silver Chromate Endpoint Trap Assay",
    "archetype": "TITRATION_PRECISION",
    "structuredEffects": [
      {
        "effectId": "B24_EFF_3",
        "activationWindow": "ON_LP_CHANGE",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 500
            }
          },
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Chuẩn độ chính xác: Gây 500 LP và rút 1 lá bài khi LP biến động."
      }
    ]
  },
  {
    "id": "card_b24_004_titr_permanganate_self_indicating_redox_endpoint_4",
    "name": "Chuẩn Độ Oxi Hóa Khử Permanganat (Điểm Chuẩn 1)",
    "name_en": "Permanganate Self-Indicating Redox Endpoint (Endpoint Rank 1)",
    "cardType": "TRAP",
    "spellTrapSubtype": "NORMAL_TRAP",
    "spellSpeed": 2,
    "rarity": "SUPER_RARE",
    "attribute": "ELECTRO",
    "manaCost": 4,
    "chemicalFormula": "KMnO4",
    "effectCode": "TRAP_B24_PERMANGANATE_SELF_INDICATING_REDOX_ENDPOINT_TITR_4",
    "effectText": "[Bẫy Chuẩn Độ / Titration Trap - Spell Speed 2]: Kích hoạt khi điểm sinh mệnh của bất kỳ đấu thủ nào thay đổi: Gây chính xác 500 LP sát thương chuẩn lên đối thủ và rút 1 lá bài từ Bộ bài.",
    "scientificLore": "Kỹ thuật chuẩn độ hóa học định lượng Chuẩn Độ Oxi Hóa Khử Permanganat (MnO₄⁻ + 8H⁺ + 5e⁻ → Mn²⁺ + 4H₂O (Purple to Colorless)) xác định chính xác nồng độ tại điểm tương đương theo chuẩn thực nghiệm Hóa học GDPT 2018.",
    "relatedEquation": "MnO₄⁻ + 8H⁺ + 5e⁻ → Mn²⁺ + 4H₂O (Purple to Colorless)",
    "iupacName": "Permanganate Self-Indicating Redox Endpoint Assay",
    "archetype": "ALKALINE_EARTH_BASTION",
    "structuredEffects": [
      {
        "effectId": "B24_EFF_4",
        "activationWindow": "ON_LP_CHANGE",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 500
            }
          },
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Chuẩn độ chính xác: Gây 500 LP và rút 1 lá bài khi LP biến động."
      }
    ]
  },
  {
    "id": "card_b24_005_titr_iodometric_starch_blue_complex_trap_5",
    "name": "Chuẩn Độ Iot Định Lượng Tinh Bột (Điểm Chuẩn 1)",
    "name_en": "Iodometric Starch Blue Complex Trap (Endpoint Rank 1)",
    "cardType": "TRAP",
    "spellTrapSubtype": "NORMAL_TRAP",
    "spellSpeed": 2,
    "rarity": "ULTRA_RARE",
    "attribute": "AQUA",
    "manaCost": 1,
    "chemicalFormula": "I2-Starch",
    "effectCode": "TRAP_B24_IODOMETRIC_STARCH_BLUE_COMPLEX_TRAP_TITR_5",
    "effectText": "[Bẫy Chuẩn Độ / Titration Trap - Spell Speed 2]: Kích hoạt khi điểm sinh mệnh của bất kỳ đấu thủ nào thay đổi: Gây chính xác 500 LP sát thương chuẩn lên đối thủ và rút 1 lá bài từ Bộ bài.",
    "scientificLore": "Kỹ thuật chuẩn độ hóa học định lượng Chuẩn Độ Iot Định Lượng Tinh Bột (I₂ + 2S₂O₃²⁻ → 2I⁻ + S₄O₆²⁻ (Blue Disappearance)) xác định chính xác nồng độ tại điểm tương đương theo chuẩn thực nghiệm Hóa học GDPT 2018.",
    "relatedEquation": "I₂ + 2S₂O₃²⁻ → 2I⁻ + S₄O₆²⁻ (Blue Disappearance)",
    "iupacName": "Iodometric Starch Blue Complex Trap Assay",
    "archetype": "TITRATION_PRECISION",
    "structuredEffects": [
      {
        "effectId": "B24_EFF_5",
        "activationWindow": "ON_LP_CHANGE",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 500
            }
          },
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Chuẩn độ chính xác: Gây 500 LP và rút 1 lá bài khi LP biến động."
      }
    ]
  },
  {
    "id": "card_b24_006_titr_titration_curve_sharp_equivalence_leap_6",
    "name": "Đường Cong Chuẩn Độ pH Bước Nhảy Vọt (Điểm Chuẩn 1)",
    "name_en": "Titration Curve Sharp Equivalence Leap (Endpoint Rank 1)",
    "cardType": "TRAP",
    "spellTrapSubtype": "NORMAL_TRAP",
    "spellSpeed": 2,
    "rarity": "SECRET_RARE",
    "attribute": "ACID_DARK",
    "manaCost": 2,
    "chemicalFormula": "dpH/dV_titrant",
    "effectCode": "TRAP_B24_TITRATION_CURVE_SHARP_EQUIVALENCE_LEAP_TITR_6",
    "effectText": "[Bẫy Chuẩn Độ / Titration Trap - Spell Speed 2]: Kích hoạt khi điểm sinh mệnh của bất kỳ đấu thủ nào thay đổi: Gây chính xác 500 LP sát thương chuẩn lên đối thủ và rút 1 lá bài từ Bộ bài.",
    "scientificLore": "Kỹ thuật chuẩn độ hóa học định lượng Đường Cong Chuẩn Độ pH Bước Nhảy Vọt (Maximum 1st Derivative Inflection Point at Equivalence) xác định chính xác nồng độ tại điểm tương đương theo chuẩn thực nghiệm Hóa học GDPT 2018.",
    "relatedEquation": "Maximum 1st Derivative Inflection Point at Equivalence",
    "iupacName": "Titration Curve Sharp Equivalence Leap Assay",
    "archetype": "ALKALINE_EARTH_BASTION",
    "structuredEffects": [
      {
        "effectId": "B24_EFF_6",
        "activationWindow": "ON_LP_CHANGE",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 500
            }
          },
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Chuẩn độ chính xác: Gây 500 LP và rút 1 lá bài khi LP biến động."
      }
    ]
  },
  {
    "id": "card_b24_007_titr_potentiometric_glass_electrode_endpoint_sensor_7",
    "name": "Chuẩn Độ Điện Thế Bằng Điện Cực Thủy Tinh (Điểm Chuẩn 1)",
    "name_en": "Potentiometric Glass Electrode Endpoint Sensor (Endpoint Rank 1)",
    "cardType": "TRAP",
    "spellTrapSubtype": "NORMAL_TRAP",
    "spellSpeed": 2,
    "rarity": "COMMON",
    "attribute": "ELECTRO",
    "manaCost": 3,
    "chemicalFormula": "E_glass",
    "effectCode": "TRAP_B24_POTENTIOMETRIC_GLASS_ELECTRODE_ENDPOINT_SENSOR_TITR_7",
    "effectText": "[Bẫy Chuẩn Độ / Titration Trap - Spell Speed 2]: Kích hoạt khi điểm sinh mệnh của bất kỳ đấu thủ nào thay đổi: Gây chính xác 500 LP sát thương chuẩn lên đối thủ và rút 1 lá bài từ Bộ bài.",
    "scientificLore": "Kỹ thuật chuẩn độ hóa học định lượng Chuẩn Độ Điện Thế Bằng Điện Cực Thủy Tinh (Nernstian Potential Response to H⁺ Activity) xác định chính xác nồng độ tại điểm tương đương theo chuẩn thực nghiệm Hóa học GDPT 2018.",
    "relatedEquation": "Nernstian Potential Response to H⁺ Activity",
    "iupacName": "Potentiometric Glass Electrode Endpoint Sensor Assay",
    "archetype": "TITRATION_PRECISION",
    "structuredEffects": [
      {
        "effectId": "B24_EFF_7",
        "activationWindow": "ON_LP_CHANGE",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 500
            }
          },
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Chuẩn độ chính xác: Gây 500 LP và rút 1 lá bài khi LP biến động."
      }
    ]
  },
  {
    "id": "card_b24_008_titr_conductometric_ion_replacement_endpoint_barrier_8",
    "name": "Chuẩn Độ Độ Dẫn Điện Dung Dịch Muối (Điểm Chuẩn 1)",
    "name_en": "Conductometric Ion Replacement Endpoint Barrier (Endpoint Rank 1)",
    "cardType": "TRAP",
    "spellTrapSubtype": "NORMAL_TRAP",
    "spellSpeed": 2,
    "rarity": "COMMON",
    "attribute": "ELECTRO",
    "manaCost": 4,
    "chemicalFormula": "Conductivity κ",
    "effectCode": "TRAP_B24_CONDUCTOMETRIC_ION_REPLACEMENT_ENDPOINT_BARRIER_TITR_8",
    "effectText": "[Bẫy Chuẩn Độ / Titration Trap - Spell Speed 2]: Kích hoạt khi điểm sinh mệnh của bất kỳ đấu thủ nào thay đổi: Gây chính xác 500 LP sát thương chuẩn lên đối thủ và rút 1 lá bài từ Bộ bài.",
    "scientificLore": "Kỹ thuật chuẩn độ hóa học định lượng Chuẩn Độ Độ Dẫn Điện Dung Dịch Muối (Conductivity V-Shape Minimum at Equivalence Point) xác định chính xác nồng độ tại điểm tương đương theo chuẩn thực nghiệm Hóa học GDPT 2018.",
    "relatedEquation": "Conductivity V-Shape Minimum at Equivalence Point",
    "iupacName": "Conductometric Ion Replacement Endpoint Barrier Assay",
    "archetype": "ALKALINE_EARTH_BASTION",
    "structuredEffects": [
      {
        "effectId": "B24_EFF_8",
        "activationWindow": "ON_LP_CHANGE",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 500
            }
          },
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Chuẩn độ chính xác: Gây 500 LP và rút 1 lá bài khi LP biến động."
      }
    ]
  },
  {
    "id": "card_b24_009_titr_phenolphthalein_equivalence_point_trap_9",
    "name": "Chỉ Thị Màu Phenolphthalein Điểm Đổi Màu (Điểm Chuẩn 2)",
    "name_en": "Phenolphthalein Equivalence Point Trap (Endpoint Rank 2)",
    "cardType": "TRAP",
    "spellTrapSubtype": "NORMAL_TRAP",
    "spellSpeed": 2,
    "rarity": "COMMON",
    "attribute": "AQUA",
    "manaCost": 1,
    "chemicalFormula": "C20H14O4",
    "effectCode": "TRAP_B24_PHENOLPHTHALEIN_EQUIVALENCE_POINT_TRAP_TITR_9",
    "effectText": "[Bẫy Chuẩn Độ / Titration Trap - Spell Speed 2]: Kích hoạt khi điểm sinh mệnh của bất kỳ đấu thủ nào thay đổi: Gây chính xác 500 LP sát thương chuẩn lên đối thủ và rút 1 lá bài từ Bộ bài.",
    "scientificLore": "Kỹ thuật chuẩn độ hóa học định lượng Chỉ Thị Màu Phenolphthalein Điểm Đổi Màu (Colorless pH < 8.2 → Pink/Magenta pH > 10.0) xác định chính xác nồng độ tại điểm tương đương theo chuẩn thực nghiệm Hóa học GDPT 2018.",
    "relatedEquation": "Colorless pH < 8.2 → Pink/Magenta pH > 10.0",
    "iupacName": "Phenolphthalein Equivalence Point Trap Assay",
    "archetype": "TITRATION_PRECISION",
    "structuredEffects": [
      {
        "effectId": "B24_EFF_9",
        "activationWindow": "ON_LP_CHANGE",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 500
            }
          },
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Chuẩn độ chính xác: Gây 500 LP và rút 1 lá bài khi LP biến động."
      }
    ]
  },
  {
    "id": "card_b24_010_titr_methyl_orange_acidic_endpoint_barrier_10",
    "name": "Chỉ Thị Màu Metyl Da Cam Vùng Axit (Điểm Chuẩn 2)",
    "name_en": "Methyl Orange Acidic Endpoint Barrier (Endpoint Rank 2)",
    "cardType": "TRAP",
    "spellTrapSubtype": "NORMAL_TRAP",
    "spellSpeed": 2,
    "rarity": "RARE",
    "attribute": "PYRO",
    "manaCost": 2,
    "chemicalFormula": "C14H14N3NaO3S",
    "effectCode": "TRAP_B24_METHYL_ORANGE_ACIDIC_ENDPOINT_BARRIER_TITR_10",
    "effectText": "[Bẫy Chuẩn Độ / Titration Trap - Spell Speed 2]: Kích hoạt khi điểm sinh mệnh của bất kỳ đấu thủ nào thay đổi: Gây chính xác 500 LP sát thương chuẩn lên đối thủ và rút 1 lá bài từ Bộ bài.",
    "scientificLore": "Kỹ thuật chuẩn độ hóa học định lượng Chỉ Thị Màu Metyl Da Cam Vùng Axit (Red pH < 3.1 → Yellow pH > 4.4) xác định chính xác nồng độ tại điểm tương đương theo chuẩn thực nghiệm Hóa học GDPT 2018.",
    "relatedEquation": "Red pH < 3.1 → Yellow pH > 4.4",
    "iupacName": "Methyl Orange Acidic Endpoint Barrier Assay",
    "archetype": "ALKALINE_EARTH_BASTION",
    "structuredEffects": [
      {
        "effectId": "B24_EFF_10",
        "activationWindow": "ON_LP_CHANGE",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 500
            }
          },
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Chuẩn độ chính xác: Gây 500 LP và rút 1 lá bài khi LP biến động."
      }
    ]
  },
  {
    "id": "card_b24_011_titr_mohr_silver_chromate_endpoint_trap_11",
    "name": "Chuẩn Độ Kết Tủa Phương Pháp Mohr (Điểm Chuẩn 2)",
    "name_en": "Mohr Silver Chromate Endpoint Trap (Endpoint Rank 2)",
    "cardType": "TRAP",
    "spellTrapSubtype": "NORMAL_TRAP",
    "spellSpeed": 2,
    "rarity": "RARE",
    "attribute": "TERRA",
    "manaCost": 3,
    "chemicalFormula": "Ag2CrO4(red)",
    "effectCode": "TRAP_B24_MOHR_SILVER_CHROMATE_ENDPOINT_TRAP_TITR_11",
    "effectText": "[Bẫy Chuẩn Độ / Titration Trap - Spell Speed 2]: Kích hoạt khi điểm sinh mệnh của bất kỳ đấu thủ nào thay đổi: Gây chính xác 500 LP sát thương chuẩn lên đối thủ và rút 1 lá bài từ Bộ bài.",
    "scientificLore": "Kỹ thuật chuẩn độ hóa học định lượng Chuẩn Độ Kết Tủa Phương Pháp Mohr (2Ag⁺ + CrO₄²⁻ → Ag₂CrO₄(s)↓ (Brick Red Precipitate)) xác định chính xác nồng độ tại điểm tương đương theo chuẩn thực nghiệm Hóa học GDPT 2018.",
    "relatedEquation": "2Ag⁺ + CrO₄²⁻ → Ag₂CrO₄(s)↓ (Brick Red Precipitate)",
    "iupacName": "Mohr Silver Chromate Endpoint Trap Assay",
    "archetype": "TITRATION_PRECISION",
    "structuredEffects": [
      {
        "effectId": "B24_EFF_11",
        "activationWindow": "ON_LP_CHANGE",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 500
            }
          },
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Chuẩn độ chính xác: Gây 500 LP và rút 1 lá bài khi LP biến động."
      }
    ]
  },
  {
    "id": "card_b24_012_titr_permanganate_self_indicating_redox_endpoint_12",
    "name": "Chuẩn Độ Oxi Hóa Khử Permanganat (Điểm Chuẩn 2)",
    "name_en": "Permanganate Self-Indicating Redox Endpoint (Endpoint Rank 2)",
    "cardType": "TRAP",
    "spellTrapSubtype": "NORMAL_TRAP",
    "spellSpeed": 2,
    "rarity": "SUPER_RARE",
    "attribute": "ELECTRO",
    "manaCost": 4,
    "chemicalFormula": "KMnO4",
    "effectCode": "TRAP_B24_PERMANGANATE_SELF_INDICATING_REDOX_ENDPOINT_TITR_12",
    "effectText": "[Bẫy Chuẩn Độ / Titration Trap - Spell Speed 2]: Kích hoạt khi điểm sinh mệnh của bất kỳ đấu thủ nào thay đổi: Gây chính xác 500 LP sát thương chuẩn lên đối thủ và rút 1 lá bài từ Bộ bài.",
    "scientificLore": "Kỹ thuật chuẩn độ hóa học định lượng Chuẩn Độ Oxi Hóa Khử Permanganat (MnO₄⁻ + 8H⁺ + 5e⁻ → Mn²⁺ + 4H₂O (Purple to Colorless)) xác định chính xác nồng độ tại điểm tương đương theo chuẩn thực nghiệm Hóa học GDPT 2018.",
    "relatedEquation": "MnO₄⁻ + 8H⁺ + 5e⁻ → Mn²⁺ + 4H₂O (Purple to Colorless)",
    "iupacName": "Permanganate Self-Indicating Redox Endpoint Assay",
    "archetype": "ALKALINE_EARTH_BASTION",
    "structuredEffects": [
      {
        "effectId": "B24_EFF_12",
        "activationWindow": "ON_LP_CHANGE",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 500
            }
          },
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Chuẩn độ chính xác: Gây 500 LP và rút 1 lá bài khi LP biến động."
      }
    ]
  },
  {
    "id": "card_b24_013_titr_iodometric_starch_blue_complex_trap_13",
    "name": "Chuẩn Độ Iot Định Lượng Tinh Bột (Điểm Chuẩn 2)",
    "name_en": "Iodometric Starch Blue Complex Trap (Endpoint Rank 2)",
    "cardType": "TRAP",
    "spellTrapSubtype": "NORMAL_TRAP",
    "spellSpeed": 2,
    "rarity": "SUPER_RARE",
    "attribute": "AQUA",
    "manaCost": 1,
    "chemicalFormula": "I2-Starch",
    "effectCode": "TRAP_B24_IODOMETRIC_STARCH_BLUE_COMPLEX_TRAP_TITR_13",
    "effectText": "[Bẫy Chuẩn Độ / Titration Trap - Spell Speed 2]: Kích hoạt khi điểm sinh mệnh của bất kỳ đấu thủ nào thay đổi: Gây chính xác 500 LP sát thương chuẩn lên đối thủ và rút 1 lá bài từ Bộ bài.",
    "scientificLore": "Kỹ thuật chuẩn độ hóa học định lượng Chuẩn Độ Iot Định Lượng Tinh Bột (I₂ + 2S₂O₃²⁻ → 2I⁻ + S₄O₆²⁻ (Blue Disappearance)) xác định chính xác nồng độ tại điểm tương đương theo chuẩn thực nghiệm Hóa học GDPT 2018.",
    "relatedEquation": "I₂ + 2S₂O₃²⁻ → 2I⁻ + S₄O₆²⁻ (Blue Disappearance)",
    "iupacName": "Iodometric Starch Blue Complex Trap Assay",
    "archetype": "TITRATION_PRECISION",
    "structuredEffects": [
      {
        "effectId": "B24_EFF_13",
        "activationWindow": "ON_LP_CHANGE",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 500
            }
          },
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Chuẩn độ chính xác: Gây 500 LP và rút 1 lá bài khi LP biến động."
      }
    ]
  },
  {
    "id": "card_b24_014_titr_titration_curve_sharp_equivalence_leap_14",
    "name": "Đường Cong Chuẩn Độ pH Bước Nhảy Vọt (Điểm Chuẩn 2)",
    "name_en": "Titration Curve Sharp Equivalence Leap (Endpoint Rank 2)",
    "cardType": "TRAP",
    "spellTrapSubtype": "NORMAL_TRAP",
    "spellSpeed": 2,
    "rarity": "ULTRA_RARE",
    "attribute": "ACID_DARK",
    "manaCost": 2,
    "chemicalFormula": "dpH/dV_titrant",
    "effectCode": "TRAP_B24_TITRATION_CURVE_SHARP_EQUIVALENCE_LEAP_TITR_14",
    "effectText": "[Bẫy Chuẩn Độ / Titration Trap - Spell Speed 2]: Kích hoạt khi điểm sinh mệnh của bất kỳ đấu thủ nào thay đổi: Gây chính xác 500 LP sát thương chuẩn lên đối thủ và rút 1 lá bài từ Bộ bài.",
    "scientificLore": "Kỹ thuật chuẩn độ hóa học định lượng Đường Cong Chuẩn Độ pH Bước Nhảy Vọt (Maximum 1st Derivative Inflection Point at Equivalence) xác định chính xác nồng độ tại điểm tương đương theo chuẩn thực nghiệm Hóa học GDPT 2018.",
    "relatedEquation": "Maximum 1st Derivative Inflection Point at Equivalence",
    "iupacName": "Titration Curve Sharp Equivalence Leap Assay",
    "archetype": "ALKALINE_EARTH_BASTION",
    "structuredEffects": [
      {
        "effectId": "B24_EFF_14",
        "activationWindow": "ON_LP_CHANGE",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 500
            }
          },
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Chuẩn độ chính xác: Gây 500 LP và rút 1 lá bài khi LP biến động."
      }
    ]
  },
  {
    "id": "card_b24_015_titr_potentiometric_glass_electrode_endpoint_sensor_15",
    "name": "Chuẩn Độ Điện Thế Bằng Điện Cực Thủy Tinh (Điểm Chuẩn 2)",
    "name_en": "Potentiometric Glass Electrode Endpoint Sensor (Endpoint Rank 2)",
    "cardType": "TRAP",
    "spellTrapSubtype": "NORMAL_TRAP",
    "spellSpeed": 2,
    "rarity": "SECRET_RARE",
    "attribute": "ELECTRO",
    "manaCost": 3,
    "chemicalFormula": "E_glass",
    "effectCode": "TRAP_B24_POTENTIOMETRIC_GLASS_ELECTRODE_ENDPOINT_SENSOR_TITR_15",
    "effectText": "[Bẫy Chuẩn Độ / Titration Trap - Spell Speed 2]: Kích hoạt khi điểm sinh mệnh của bất kỳ đấu thủ nào thay đổi: Gây chính xác 500 LP sát thương chuẩn lên đối thủ và rút 1 lá bài từ Bộ bài.",
    "scientificLore": "Kỹ thuật chuẩn độ hóa học định lượng Chuẩn Độ Điện Thế Bằng Điện Cực Thủy Tinh (Nernstian Potential Response to H⁺ Activity) xác định chính xác nồng độ tại điểm tương đương theo chuẩn thực nghiệm Hóa học GDPT 2018.",
    "relatedEquation": "Nernstian Potential Response to H⁺ Activity",
    "iupacName": "Potentiometric Glass Electrode Endpoint Sensor Assay",
    "archetype": "TITRATION_PRECISION",
    "structuredEffects": [
      {
        "effectId": "B24_EFF_15",
        "activationWindow": "ON_LP_CHANGE",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 500
            }
          },
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Chuẩn độ chính xác: Gây 500 LP và rút 1 lá bài khi LP biến động."
      }
    ]
  },
  {
    "id": "card_b24_016_titr_conductometric_ion_replacement_endpoint_barrier_16",
    "name": "Chuẩn Độ Độ Dẫn Điện Dung Dịch Muối (Điểm Chuẩn 2)",
    "name_en": "Conductometric Ion Replacement Endpoint Barrier (Endpoint Rank 2)",
    "cardType": "TRAP",
    "spellTrapSubtype": "NORMAL_TRAP",
    "spellSpeed": 2,
    "rarity": "COMMON",
    "attribute": "ELECTRO",
    "manaCost": 4,
    "chemicalFormula": "Conductivity κ",
    "effectCode": "TRAP_B24_CONDUCTOMETRIC_ION_REPLACEMENT_ENDPOINT_BARRIER_TITR_16",
    "effectText": "[Bẫy Chuẩn Độ / Titration Trap - Spell Speed 2]: Kích hoạt khi điểm sinh mệnh của bất kỳ đấu thủ nào thay đổi: Gây chính xác 500 LP sát thương chuẩn lên đối thủ và rút 1 lá bài từ Bộ bài.",
    "scientificLore": "Kỹ thuật chuẩn độ hóa học định lượng Chuẩn Độ Độ Dẫn Điện Dung Dịch Muối (Conductivity V-Shape Minimum at Equivalence Point) xác định chính xác nồng độ tại điểm tương đương theo chuẩn thực nghiệm Hóa học GDPT 2018.",
    "relatedEquation": "Conductivity V-Shape Minimum at Equivalence Point",
    "iupacName": "Conductometric Ion Replacement Endpoint Barrier Assay",
    "archetype": "ALKALINE_EARTH_BASTION",
    "structuredEffects": [
      {
        "effectId": "B24_EFF_16",
        "activationWindow": "ON_LP_CHANGE",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 500
            }
          },
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Chuẩn độ chính xác: Gây 500 LP và rút 1 lá bài khi LP biến động."
      }
    ]
  },
  {
    "id": "card_b24_017_titr_phenolphthalein_equivalence_point_trap_17",
    "name": "Chỉ Thị Màu Phenolphthalein Điểm Đổi Màu (Điểm Chuẩn 3)",
    "name_en": "Phenolphthalein Equivalence Point Trap (Endpoint Rank 3)",
    "cardType": "TRAP",
    "spellTrapSubtype": "NORMAL_TRAP",
    "spellSpeed": 2,
    "rarity": "COMMON",
    "attribute": "AQUA",
    "manaCost": 1,
    "chemicalFormula": "C20H14O4",
    "effectCode": "TRAP_B24_PHENOLPHTHALEIN_EQUIVALENCE_POINT_TRAP_TITR_17",
    "effectText": "[Bẫy Chuẩn Độ / Titration Trap - Spell Speed 2]: Kích hoạt khi điểm sinh mệnh của bất kỳ đấu thủ nào thay đổi: Gây chính xác 500 LP sát thương chuẩn lên đối thủ và rút 1 lá bài từ Bộ bài.",
    "scientificLore": "Kỹ thuật chuẩn độ hóa học định lượng Chỉ Thị Màu Phenolphthalein Điểm Đổi Màu (Colorless pH < 8.2 → Pink/Magenta pH > 10.0) xác định chính xác nồng độ tại điểm tương đương theo chuẩn thực nghiệm Hóa học GDPT 2018.",
    "relatedEquation": "Colorless pH < 8.2 → Pink/Magenta pH > 10.0",
    "iupacName": "Phenolphthalein Equivalence Point Trap Assay",
    "archetype": "TITRATION_PRECISION",
    "structuredEffects": [
      {
        "effectId": "B24_EFF_17",
        "activationWindow": "ON_LP_CHANGE",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 500
            }
          },
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Chuẩn độ chính xác: Gây 500 LP và rút 1 lá bài khi LP biến động."
      }
    ]
  },
  {
    "id": "card_b24_018_titr_methyl_orange_acidic_endpoint_barrier_18",
    "name": "Chỉ Thị Màu Metyl Da Cam Vùng Axit (Điểm Chuẩn 3)",
    "name_en": "Methyl Orange Acidic Endpoint Barrier (Endpoint Rank 3)",
    "cardType": "TRAP",
    "spellTrapSubtype": "NORMAL_TRAP",
    "spellSpeed": 2,
    "rarity": "COMMON",
    "attribute": "PYRO",
    "manaCost": 2,
    "chemicalFormula": "C14H14N3NaO3S",
    "effectCode": "TRAP_B24_METHYL_ORANGE_ACIDIC_ENDPOINT_BARRIER_TITR_18",
    "effectText": "[Bẫy Chuẩn Độ / Titration Trap - Spell Speed 2]: Kích hoạt khi điểm sinh mệnh của bất kỳ đấu thủ nào thay đổi: Gây chính xác 500 LP sát thương chuẩn lên đối thủ và rút 1 lá bài từ Bộ bài.",
    "scientificLore": "Kỹ thuật chuẩn độ hóa học định lượng Chỉ Thị Màu Metyl Da Cam Vùng Axit (Red pH < 3.1 → Yellow pH > 4.4) xác định chính xác nồng độ tại điểm tương đương theo chuẩn thực nghiệm Hóa học GDPT 2018.",
    "relatedEquation": "Red pH < 3.1 → Yellow pH > 4.4",
    "iupacName": "Methyl Orange Acidic Endpoint Barrier Assay",
    "archetype": "ALKALINE_EARTH_BASTION",
    "structuredEffects": [
      {
        "effectId": "B24_EFF_18",
        "activationWindow": "ON_LP_CHANGE",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 500
            }
          },
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Chuẩn độ chính xác: Gây 500 LP và rút 1 lá bài khi LP biến động."
      }
    ]
  },
  {
    "id": "card_b24_019_titr_mohr_silver_chromate_endpoint_trap_19",
    "name": "Chuẩn Độ Kết Tủa Phương Pháp Mohr (Điểm Chuẩn 3)",
    "name_en": "Mohr Silver Chromate Endpoint Trap (Endpoint Rank 3)",
    "cardType": "TRAP",
    "spellTrapSubtype": "NORMAL_TRAP",
    "spellSpeed": 2,
    "rarity": "RARE",
    "attribute": "TERRA",
    "manaCost": 3,
    "chemicalFormula": "Ag2CrO4(red)",
    "effectCode": "TRAP_B24_MOHR_SILVER_CHROMATE_ENDPOINT_TRAP_TITR_19",
    "effectText": "[Bẫy Chuẩn Độ / Titration Trap - Spell Speed 2]: Kích hoạt khi điểm sinh mệnh của bất kỳ đấu thủ nào thay đổi: Gây chính xác 500 LP sát thương chuẩn lên đối thủ và rút 1 lá bài từ Bộ bài.",
    "scientificLore": "Kỹ thuật chuẩn độ hóa học định lượng Chuẩn Độ Kết Tủa Phương Pháp Mohr (2Ag⁺ + CrO₄²⁻ → Ag₂CrO₄(s)↓ (Brick Red Precipitate)) xác định chính xác nồng độ tại điểm tương đương theo chuẩn thực nghiệm Hóa học GDPT 2018.",
    "relatedEquation": "2Ag⁺ + CrO₄²⁻ → Ag₂CrO₄(s)↓ (Brick Red Precipitate)",
    "iupacName": "Mohr Silver Chromate Endpoint Trap Assay",
    "archetype": "TITRATION_PRECISION",
    "structuredEffects": [
      {
        "effectId": "B24_EFF_19",
        "activationWindow": "ON_LP_CHANGE",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 500
            }
          },
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Chuẩn độ chính xác: Gây 500 LP và rút 1 lá bài khi LP biến động."
      }
    ]
  },
  {
    "id": "card_b24_020_titr_permanganate_self_indicating_redox_endpoint_20",
    "name": "Chuẩn Độ Oxi Hóa Khử Permanganat (Điểm Chuẩn 3)",
    "name_en": "Permanganate Self-Indicating Redox Endpoint (Endpoint Rank 3)",
    "cardType": "TRAP",
    "spellTrapSubtype": "NORMAL_TRAP",
    "spellSpeed": 2,
    "rarity": "RARE",
    "attribute": "ELECTRO",
    "manaCost": 4,
    "chemicalFormula": "KMnO4",
    "effectCode": "TRAP_B24_PERMANGANATE_SELF_INDICATING_REDOX_ENDPOINT_TITR_20",
    "effectText": "[Bẫy Chuẩn Độ / Titration Trap - Spell Speed 2]: Kích hoạt khi điểm sinh mệnh của bất kỳ đấu thủ nào thay đổi: Gây chính xác 500 LP sát thương chuẩn lên đối thủ và rút 1 lá bài từ Bộ bài.",
    "scientificLore": "Kỹ thuật chuẩn độ hóa học định lượng Chuẩn Độ Oxi Hóa Khử Permanganat (MnO₄⁻ + 8H⁺ + 5e⁻ → Mn²⁺ + 4H₂O (Purple to Colorless)) xác định chính xác nồng độ tại điểm tương đương theo chuẩn thực nghiệm Hóa học GDPT 2018.",
    "relatedEquation": "MnO₄⁻ + 8H⁺ + 5e⁻ → Mn²⁺ + 4H₂O (Purple to Colorless)",
    "iupacName": "Permanganate Self-Indicating Redox Endpoint Assay",
    "archetype": "ALKALINE_EARTH_BASTION",
    "structuredEffects": [
      {
        "effectId": "B24_EFF_20",
        "activationWindow": "ON_LP_CHANGE",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 500
            }
          },
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Chuẩn độ chính xác: Gây 500 LP và rút 1 lá bài khi LP biến động."
      }
    ]
  },
  {
    "id": "card_b24_021_titr_iodometric_starch_blue_complex_trap_21",
    "name": "Chuẩn Độ Iot Định Lượng Tinh Bột (Điểm Chuẩn 3)",
    "name_en": "Iodometric Starch Blue Complex Trap (Endpoint Rank 3)",
    "cardType": "TRAP",
    "spellTrapSubtype": "NORMAL_TRAP",
    "spellSpeed": 2,
    "rarity": "SUPER_RARE",
    "attribute": "AQUA",
    "manaCost": 1,
    "chemicalFormula": "I2-Starch",
    "effectCode": "TRAP_B24_IODOMETRIC_STARCH_BLUE_COMPLEX_TRAP_TITR_21",
    "effectText": "[Bẫy Chuẩn Độ / Titration Trap - Spell Speed 2]: Kích hoạt khi điểm sinh mệnh của bất kỳ đấu thủ nào thay đổi: Gây chính xác 500 LP sát thương chuẩn lên đối thủ và rút 1 lá bài từ Bộ bài.",
    "scientificLore": "Kỹ thuật chuẩn độ hóa học định lượng Chuẩn Độ Iot Định Lượng Tinh Bột (I₂ + 2S₂O₃²⁻ → 2I⁻ + S₄O₆²⁻ (Blue Disappearance)) xác định chính xác nồng độ tại điểm tương đương theo chuẩn thực nghiệm Hóa học GDPT 2018.",
    "relatedEquation": "I₂ + 2S₂O₃²⁻ → 2I⁻ + S₄O₆²⁻ (Blue Disappearance)",
    "iupacName": "Iodometric Starch Blue Complex Trap Assay",
    "archetype": "TITRATION_PRECISION",
    "structuredEffects": [
      {
        "effectId": "B24_EFF_21",
        "activationWindow": "ON_LP_CHANGE",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 500
            }
          },
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Chuẩn độ chính xác: Gây 500 LP và rút 1 lá bài khi LP biến động."
      }
    ]
  },
  {
    "id": "card_b24_022_titr_titration_curve_sharp_equivalence_leap_22",
    "name": "Đường Cong Chuẩn Độ pH Bước Nhảy Vọt (Điểm Chuẩn 3)",
    "name_en": "Titration Curve Sharp Equivalence Leap (Endpoint Rank 3)",
    "cardType": "TRAP",
    "spellTrapSubtype": "NORMAL_TRAP",
    "spellSpeed": 2,
    "rarity": "SUPER_RARE",
    "attribute": "ACID_DARK",
    "manaCost": 2,
    "chemicalFormula": "dpH/dV_titrant",
    "effectCode": "TRAP_B24_TITRATION_CURVE_SHARP_EQUIVALENCE_LEAP_TITR_22",
    "effectText": "[Bẫy Chuẩn Độ / Titration Trap - Spell Speed 2]: Kích hoạt khi điểm sinh mệnh của bất kỳ đấu thủ nào thay đổi: Gây chính xác 500 LP sát thương chuẩn lên đối thủ và rút 1 lá bài từ Bộ bài.",
    "scientificLore": "Kỹ thuật chuẩn độ hóa học định lượng Đường Cong Chuẩn Độ pH Bước Nhảy Vọt (Maximum 1st Derivative Inflection Point at Equivalence) xác định chính xác nồng độ tại điểm tương đương theo chuẩn thực nghiệm Hóa học GDPT 2018.",
    "relatedEquation": "Maximum 1st Derivative Inflection Point at Equivalence",
    "iupacName": "Titration Curve Sharp Equivalence Leap Assay",
    "archetype": "ALKALINE_EARTH_BASTION",
    "structuredEffects": [
      {
        "effectId": "B24_EFF_22",
        "activationWindow": "ON_LP_CHANGE",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 500
            }
          },
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Chuẩn độ chính xác: Gây 500 LP và rút 1 lá bài khi LP biến động."
      }
    ]
  },
  {
    "id": "card_b24_023_titr_potentiometric_glass_electrode_endpoint_sensor_23",
    "name": "Chuẩn Độ Điện Thế Bằng Điện Cực Thủy Tinh (Điểm Chuẩn 3)",
    "name_en": "Potentiometric Glass Electrode Endpoint Sensor (Endpoint Rank 3)",
    "cardType": "TRAP",
    "spellTrapSubtype": "NORMAL_TRAP",
    "spellSpeed": 2,
    "rarity": "ULTRA_RARE",
    "attribute": "ELECTRO",
    "manaCost": 3,
    "chemicalFormula": "E_glass",
    "effectCode": "TRAP_B24_POTENTIOMETRIC_GLASS_ELECTRODE_ENDPOINT_SENSOR_TITR_23",
    "effectText": "[Bẫy Chuẩn Độ / Titration Trap - Spell Speed 2]: Kích hoạt khi điểm sinh mệnh của bất kỳ đấu thủ nào thay đổi: Gây chính xác 500 LP sát thương chuẩn lên đối thủ và rút 1 lá bài từ Bộ bài.",
    "scientificLore": "Kỹ thuật chuẩn độ hóa học định lượng Chuẩn Độ Điện Thế Bằng Điện Cực Thủy Tinh (Nernstian Potential Response to H⁺ Activity) xác định chính xác nồng độ tại điểm tương đương theo chuẩn thực nghiệm Hóa học GDPT 2018.",
    "relatedEquation": "Nernstian Potential Response to H⁺ Activity",
    "iupacName": "Potentiometric Glass Electrode Endpoint Sensor Assay",
    "archetype": "TITRATION_PRECISION",
    "structuredEffects": [
      {
        "effectId": "B24_EFF_23",
        "activationWindow": "ON_LP_CHANGE",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 500
            }
          },
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Chuẩn độ chính xác: Gây 500 LP và rút 1 lá bài khi LP biến động."
      }
    ]
  },
  {
    "id": "card_b24_024_titr_conductometric_ion_replacement_endpoint_barrier_24",
    "name": "Chuẩn Độ Độ Dẫn Điện Dung Dịch Muối (Điểm Chuẩn 3)",
    "name_en": "Conductometric Ion Replacement Endpoint Barrier (Endpoint Rank 3)",
    "cardType": "TRAP",
    "spellTrapSubtype": "NORMAL_TRAP",
    "spellSpeed": 2,
    "rarity": "SECRET_RARE",
    "attribute": "ELECTRO",
    "manaCost": 4,
    "chemicalFormula": "Conductivity κ",
    "effectCode": "TRAP_B24_CONDUCTOMETRIC_ION_REPLACEMENT_ENDPOINT_BARRIER_TITR_24",
    "effectText": "[Bẫy Chuẩn Độ / Titration Trap - Spell Speed 2]: Kích hoạt khi điểm sinh mệnh của bất kỳ đấu thủ nào thay đổi: Gây chính xác 500 LP sát thương chuẩn lên đối thủ và rút 1 lá bài từ Bộ bài.",
    "scientificLore": "Kỹ thuật chuẩn độ hóa học định lượng Chuẩn Độ Độ Dẫn Điện Dung Dịch Muối (Conductivity V-Shape Minimum at Equivalence Point) xác định chính xác nồng độ tại điểm tương đương theo chuẩn thực nghiệm Hóa học GDPT 2018.",
    "relatedEquation": "Conductivity V-Shape Minimum at Equivalence Point",
    "iupacName": "Conductometric Ion Replacement Endpoint Barrier Assay",
    "archetype": "ALKALINE_EARTH_BASTION",
    "structuredEffects": [
      {
        "effectId": "B24_EFF_24",
        "activationWindow": "ON_LP_CHANGE",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 500
            }
          },
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Chuẩn độ chính xác: Gây 500 LP và rút 1 lá bài khi LP biến động."
      }
    ]
  },
  {
    "id": "card_b24_025_titr_phenolphthalein_equivalence_point_trap_25",
    "name": "Chỉ Thị Màu Phenolphthalein Điểm Đổi Màu (Điểm Chuẩn 4)",
    "name_en": "Phenolphthalein Equivalence Point Trap (Endpoint Rank 4)",
    "cardType": "TRAP",
    "spellTrapSubtype": "NORMAL_TRAP",
    "spellSpeed": 2,
    "rarity": "COMMON",
    "attribute": "AQUA",
    "manaCost": 1,
    "chemicalFormula": "C20H14O4",
    "effectCode": "TRAP_B24_PHENOLPHTHALEIN_EQUIVALENCE_POINT_TRAP_TITR_25",
    "effectText": "[Bẫy Chuẩn Độ / Titration Trap - Spell Speed 2]: Kích hoạt khi điểm sinh mệnh của bất kỳ đấu thủ nào thay đổi: Gây chính xác 500 LP sát thương chuẩn lên đối thủ và rút 1 lá bài từ Bộ bài.",
    "scientificLore": "Kỹ thuật chuẩn độ hóa học định lượng Chỉ Thị Màu Phenolphthalein Điểm Đổi Màu (Colorless pH < 8.2 → Pink/Magenta pH > 10.0) xác định chính xác nồng độ tại điểm tương đương theo chuẩn thực nghiệm Hóa học GDPT 2018.",
    "relatedEquation": "Colorless pH < 8.2 → Pink/Magenta pH > 10.0",
    "iupacName": "Phenolphthalein Equivalence Point Trap Assay",
    "archetype": "TITRATION_PRECISION",
    "structuredEffects": [
      {
        "effectId": "B24_EFF_25",
        "activationWindow": "ON_LP_CHANGE",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 500
            }
          },
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Chuẩn độ chính xác: Gây 500 LP và rút 1 lá bài khi LP biến động."
      }
    ]
  },
  {
    "id": "card_b24_026_titr_methyl_orange_acidic_endpoint_barrier_26",
    "name": "Chỉ Thị Màu Metyl Da Cam Vùng Axit (Điểm Chuẩn 4)",
    "name_en": "Methyl Orange Acidic Endpoint Barrier (Endpoint Rank 4)",
    "cardType": "TRAP",
    "spellTrapSubtype": "NORMAL_TRAP",
    "spellSpeed": 2,
    "rarity": "COMMON",
    "attribute": "PYRO",
    "manaCost": 2,
    "chemicalFormula": "C14H14N3NaO3S",
    "effectCode": "TRAP_B24_METHYL_ORANGE_ACIDIC_ENDPOINT_BARRIER_TITR_26",
    "effectText": "[Bẫy Chuẩn Độ / Titration Trap - Spell Speed 2]: Kích hoạt khi điểm sinh mệnh của bất kỳ đấu thủ nào thay đổi: Gây chính xác 500 LP sát thương chuẩn lên đối thủ và rút 1 lá bài từ Bộ bài.",
    "scientificLore": "Kỹ thuật chuẩn độ hóa học định lượng Chỉ Thị Màu Metyl Da Cam Vùng Axit (Red pH < 3.1 → Yellow pH > 4.4) xác định chính xác nồng độ tại điểm tương đương theo chuẩn thực nghiệm Hóa học GDPT 2018.",
    "relatedEquation": "Red pH < 3.1 → Yellow pH > 4.4",
    "iupacName": "Methyl Orange Acidic Endpoint Barrier Assay",
    "archetype": "ALKALINE_EARTH_BASTION",
    "structuredEffects": [
      {
        "effectId": "B24_EFF_26",
        "activationWindow": "ON_LP_CHANGE",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 500
            }
          },
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Chuẩn độ chính xác: Gây 500 LP và rút 1 lá bài khi LP biến động."
      }
    ]
  },
  {
    "id": "card_b24_027_titr_mohr_silver_chromate_endpoint_trap_27",
    "name": "Chuẩn Độ Kết Tủa Phương Pháp Mohr (Điểm Chuẩn 4)",
    "name_en": "Mohr Silver Chromate Endpoint Trap (Endpoint Rank 4)",
    "cardType": "TRAP",
    "spellTrapSubtype": "NORMAL_TRAP",
    "spellSpeed": 2,
    "rarity": "COMMON",
    "attribute": "TERRA",
    "manaCost": 3,
    "chemicalFormula": "Ag2CrO4(red)",
    "effectCode": "TRAP_B24_MOHR_SILVER_CHROMATE_ENDPOINT_TRAP_TITR_27",
    "effectText": "[Bẫy Chuẩn Độ / Titration Trap - Spell Speed 2]: Kích hoạt khi điểm sinh mệnh của bất kỳ đấu thủ nào thay đổi: Gây chính xác 500 LP sát thương chuẩn lên đối thủ và rút 1 lá bài từ Bộ bài.",
    "scientificLore": "Kỹ thuật chuẩn độ hóa học định lượng Chuẩn Độ Kết Tủa Phương Pháp Mohr (2Ag⁺ + CrO₄²⁻ → Ag₂CrO₄(s)↓ (Brick Red Precipitate)) xác định chính xác nồng độ tại điểm tương đương theo chuẩn thực nghiệm Hóa học GDPT 2018.",
    "relatedEquation": "2Ag⁺ + CrO₄²⁻ → Ag₂CrO₄(s)↓ (Brick Red Precipitate)",
    "iupacName": "Mohr Silver Chromate Endpoint Trap Assay",
    "archetype": "TITRATION_PRECISION",
    "structuredEffects": [
      {
        "effectId": "B24_EFF_27",
        "activationWindow": "ON_LP_CHANGE",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 500
            }
          },
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Chuẩn độ chính xác: Gây 500 LP và rút 1 lá bài khi LP biến động."
      }
    ]
  },
  {
    "id": "card_b24_028_titr_permanganate_self_indicating_redox_endpoint_28",
    "name": "Chuẩn Độ Oxi Hóa Khử Permanganat (Điểm Chuẩn 4)",
    "name_en": "Permanganate Self-Indicating Redox Endpoint (Endpoint Rank 4)",
    "cardType": "TRAP",
    "spellTrapSubtype": "NORMAL_TRAP",
    "spellSpeed": 2,
    "rarity": "RARE",
    "attribute": "ELECTRO",
    "manaCost": 4,
    "chemicalFormula": "KMnO4",
    "effectCode": "TRAP_B24_PERMANGANATE_SELF_INDICATING_REDOX_ENDPOINT_TITR_28",
    "effectText": "[Bẫy Chuẩn Độ / Titration Trap - Spell Speed 2]: Kích hoạt khi điểm sinh mệnh của bất kỳ đấu thủ nào thay đổi: Gây chính xác 500 LP sát thương chuẩn lên đối thủ và rút 1 lá bài từ Bộ bài.",
    "scientificLore": "Kỹ thuật chuẩn độ hóa học định lượng Chuẩn Độ Oxi Hóa Khử Permanganat (MnO₄⁻ + 8H⁺ + 5e⁻ → Mn²⁺ + 4H₂O (Purple to Colorless)) xác định chính xác nồng độ tại điểm tương đương theo chuẩn thực nghiệm Hóa học GDPT 2018.",
    "relatedEquation": "MnO₄⁻ + 8H⁺ + 5e⁻ → Mn²⁺ + 4H₂O (Purple to Colorless)",
    "iupacName": "Permanganate Self-Indicating Redox Endpoint Assay",
    "archetype": "ALKALINE_EARTH_BASTION",
    "structuredEffects": [
      {
        "effectId": "B24_EFF_28",
        "activationWindow": "ON_LP_CHANGE",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 500
            }
          },
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Chuẩn độ chính xác: Gây 500 LP và rút 1 lá bài khi LP biến động."
      }
    ]
  },
  {
    "id": "card_b24_029_titr_iodometric_starch_blue_complex_trap_29",
    "name": "Chuẩn Độ Iot Định Lượng Tinh Bột (Điểm Chuẩn 4)",
    "name_en": "Iodometric Starch Blue Complex Trap (Endpoint Rank 4)",
    "cardType": "TRAP",
    "spellTrapSubtype": "NORMAL_TRAP",
    "spellSpeed": 2,
    "rarity": "RARE",
    "attribute": "AQUA",
    "manaCost": 1,
    "chemicalFormula": "I2-Starch",
    "effectCode": "TRAP_B24_IODOMETRIC_STARCH_BLUE_COMPLEX_TRAP_TITR_29",
    "effectText": "[Bẫy Chuẩn Độ / Titration Trap - Spell Speed 2]: Kích hoạt khi điểm sinh mệnh của bất kỳ đấu thủ nào thay đổi: Gây chính xác 500 LP sát thương chuẩn lên đối thủ và rút 1 lá bài từ Bộ bài.",
    "scientificLore": "Kỹ thuật chuẩn độ hóa học định lượng Chuẩn Độ Iot Định Lượng Tinh Bột (I₂ + 2S₂O₃²⁻ → 2I⁻ + S₄O₆²⁻ (Blue Disappearance)) xác định chính xác nồng độ tại điểm tương đương theo chuẩn thực nghiệm Hóa học GDPT 2018.",
    "relatedEquation": "I₂ + 2S₂O₃²⁻ → 2I⁻ + S₄O₆²⁻ (Blue Disappearance)",
    "iupacName": "Iodometric Starch Blue Complex Trap Assay",
    "archetype": "TITRATION_PRECISION",
    "structuredEffects": [
      {
        "effectId": "B24_EFF_29",
        "activationWindow": "ON_LP_CHANGE",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 500
            }
          },
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Chuẩn độ chính xác: Gây 500 LP và rút 1 lá bài khi LP biến động."
      }
    ]
  },
  {
    "id": "card_b24_030_titr_titration_curve_sharp_equivalence_leap_30",
    "name": "Đường Cong Chuẩn Độ pH Bước Nhảy Vọt (Điểm Chuẩn 4)",
    "name_en": "Titration Curve Sharp Equivalence Leap (Endpoint Rank 4)",
    "cardType": "TRAP",
    "spellTrapSubtype": "NORMAL_TRAP",
    "spellSpeed": 2,
    "rarity": "SUPER_RARE",
    "attribute": "ACID_DARK",
    "manaCost": 2,
    "chemicalFormula": "dpH/dV_titrant",
    "effectCode": "TRAP_B24_TITRATION_CURVE_SHARP_EQUIVALENCE_LEAP_TITR_30",
    "effectText": "[Bẫy Chuẩn Độ / Titration Trap - Spell Speed 2]: Kích hoạt khi điểm sinh mệnh của bất kỳ đấu thủ nào thay đổi: Gây chính xác 500 LP sát thương chuẩn lên đối thủ và rút 1 lá bài từ Bộ bài.",
    "scientificLore": "Kỹ thuật chuẩn độ hóa học định lượng Đường Cong Chuẩn Độ pH Bước Nhảy Vọt (Maximum 1st Derivative Inflection Point at Equivalence) xác định chính xác nồng độ tại điểm tương đương theo chuẩn thực nghiệm Hóa học GDPT 2018.",
    "relatedEquation": "Maximum 1st Derivative Inflection Point at Equivalence",
    "iupacName": "Titration Curve Sharp Equivalence Leap Assay",
    "archetype": "ALKALINE_EARTH_BASTION",
    "structuredEffects": [
      {
        "effectId": "B24_EFF_30",
        "activationWindow": "ON_LP_CHANGE",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 500
            }
          },
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Chuẩn độ chính xác: Gây 500 LP và rút 1 lá bài khi LP biến động."
      }
    ]
  },
  {
    "id": "card_b24_031_titr_potentiometric_glass_electrode_endpoint_sensor_31",
    "name": "Chuẩn Độ Điện Thế Bằng Điện Cực Thủy Tinh (Điểm Chuẩn 4)",
    "name_en": "Potentiometric Glass Electrode Endpoint Sensor (Endpoint Rank 4)",
    "cardType": "TRAP",
    "spellTrapSubtype": "NORMAL_TRAP",
    "spellSpeed": 2,
    "rarity": "SUPER_RARE",
    "attribute": "ELECTRO",
    "manaCost": 3,
    "chemicalFormula": "E_glass",
    "effectCode": "TRAP_B24_POTENTIOMETRIC_GLASS_ELECTRODE_ENDPOINT_SENSOR_TITR_31",
    "effectText": "[Bẫy Chuẩn Độ / Titration Trap - Spell Speed 2]: Kích hoạt khi điểm sinh mệnh của bất kỳ đấu thủ nào thay đổi: Gây chính xác 500 LP sát thương chuẩn lên đối thủ và rút 1 lá bài từ Bộ bài.",
    "scientificLore": "Kỹ thuật chuẩn độ hóa học định lượng Chuẩn Độ Điện Thế Bằng Điện Cực Thủy Tinh (Nernstian Potential Response to H⁺ Activity) xác định chính xác nồng độ tại điểm tương đương theo chuẩn thực nghiệm Hóa học GDPT 2018.",
    "relatedEquation": "Nernstian Potential Response to H⁺ Activity",
    "iupacName": "Potentiometric Glass Electrode Endpoint Sensor Assay",
    "archetype": "TITRATION_PRECISION",
    "structuredEffects": [
      {
        "effectId": "B24_EFF_31",
        "activationWindow": "ON_LP_CHANGE",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 500
            }
          },
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Chuẩn độ chính xác: Gây 500 LP và rút 1 lá bài khi LP biến động."
      }
    ]
  },
  {
    "id": "card_b24_032_titr_conductometric_ion_replacement_endpoint_barrier_32",
    "name": "Chuẩn Độ Độ Dẫn Điện Dung Dịch Muối (Điểm Chuẩn 4)",
    "name_en": "Conductometric Ion Replacement Endpoint Barrier (Endpoint Rank 4)",
    "cardType": "TRAP",
    "spellTrapSubtype": "NORMAL_TRAP",
    "spellSpeed": 2,
    "rarity": "ULTRA_RARE",
    "attribute": "ELECTRO",
    "manaCost": 4,
    "chemicalFormula": "Conductivity κ",
    "effectCode": "TRAP_B24_CONDUCTOMETRIC_ION_REPLACEMENT_ENDPOINT_BARRIER_TITR_32",
    "effectText": "[Bẫy Chuẩn Độ / Titration Trap - Spell Speed 2]: Kích hoạt khi điểm sinh mệnh của bất kỳ đấu thủ nào thay đổi: Gây chính xác 500 LP sát thương chuẩn lên đối thủ và rút 1 lá bài từ Bộ bài.",
    "scientificLore": "Kỹ thuật chuẩn độ hóa học định lượng Chuẩn Độ Độ Dẫn Điện Dung Dịch Muối (Conductivity V-Shape Minimum at Equivalence Point) xác định chính xác nồng độ tại điểm tương đương theo chuẩn thực nghiệm Hóa học GDPT 2018.",
    "relatedEquation": "Conductivity V-Shape Minimum at Equivalence Point",
    "iupacName": "Conductometric Ion Replacement Endpoint Barrier Assay",
    "archetype": "ALKALINE_EARTH_BASTION",
    "structuredEffects": [
      {
        "effectId": "B24_EFF_32",
        "activationWindow": "ON_LP_CHANGE",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 500
            }
          },
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Chuẩn độ chính xác: Gây 500 LP và rút 1 lá bài khi LP biến động."
      }
    ]
  },
  {
    "id": "card_b24_033_titr_phenolphthalein_equivalence_point_trap_33",
    "name": "Chỉ Thị Màu Phenolphthalein Điểm Đổi Màu (Điểm Chuẩn 5)",
    "name_en": "Phenolphthalein Equivalence Point Trap (Endpoint Rank 5)",
    "cardType": "TRAP",
    "spellTrapSubtype": "NORMAL_TRAP",
    "spellSpeed": 2,
    "rarity": "SECRET_RARE",
    "attribute": "AQUA",
    "manaCost": 1,
    "chemicalFormula": "C20H14O4",
    "effectCode": "TRAP_B24_PHENOLPHTHALEIN_EQUIVALENCE_POINT_TRAP_TITR_33",
    "effectText": "[Bẫy Chuẩn Độ / Titration Trap - Spell Speed 2]: Kích hoạt khi điểm sinh mệnh của bất kỳ đấu thủ nào thay đổi: Gây chính xác 500 LP sát thương chuẩn lên đối thủ và rút 1 lá bài từ Bộ bài.",
    "scientificLore": "Kỹ thuật chuẩn độ hóa học định lượng Chỉ Thị Màu Phenolphthalein Điểm Đổi Màu (Colorless pH < 8.2 → Pink/Magenta pH > 10.0) xác định chính xác nồng độ tại điểm tương đương theo chuẩn thực nghiệm Hóa học GDPT 2018.",
    "relatedEquation": "Colorless pH < 8.2 → Pink/Magenta pH > 10.0",
    "iupacName": "Phenolphthalein Equivalence Point Trap Assay",
    "archetype": "TITRATION_PRECISION",
    "structuredEffects": [
      {
        "effectId": "B24_EFF_33",
        "activationWindow": "ON_LP_CHANGE",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 500
            }
          },
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Chuẩn độ chính xác: Gây 500 LP và rút 1 lá bài khi LP biến động."
      }
    ]
  },
  {
    "id": "card_b24_034_titr_methyl_orange_acidic_endpoint_barrier_34",
    "name": "Chỉ Thị Màu Metyl Da Cam Vùng Axit (Điểm Chuẩn 5)",
    "name_en": "Methyl Orange Acidic Endpoint Barrier (Endpoint Rank 5)",
    "cardType": "TRAP",
    "spellTrapSubtype": "NORMAL_TRAP",
    "spellSpeed": 2,
    "rarity": "COMMON",
    "attribute": "PYRO",
    "manaCost": 2,
    "chemicalFormula": "C14H14N3NaO3S",
    "effectCode": "TRAP_B24_METHYL_ORANGE_ACIDIC_ENDPOINT_BARRIER_TITR_34",
    "effectText": "[Bẫy Chuẩn Độ / Titration Trap - Spell Speed 2]: Kích hoạt khi điểm sinh mệnh của bất kỳ đấu thủ nào thay đổi: Gây chính xác 500 LP sát thương chuẩn lên đối thủ và rút 1 lá bài từ Bộ bài.",
    "scientificLore": "Kỹ thuật chuẩn độ hóa học định lượng Chỉ Thị Màu Metyl Da Cam Vùng Axit (Red pH < 3.1 → Yellow pH > 4.4) xác định chính xác nồng độ tại điểm tương đương theo chuẩn thực nghiệm Hóa học GDPT 2018.",
    "relatedEquation": "Red pH < 3.1 → Yellow pH > 4.4",
    "iupacName": "Methyl Orange Acidic Endpoint Barrier Assay",
    "archetype": "ALKALINE_EARTH_BASTION",
    "structuredEffects": [
      {
        "effectId": "B24_EFF_34",
        "activationWindow": "ON_LP_CHANGE",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 500
            }
          },
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Chuẩn độ chính xác: Gây 500 LP và rút 1 lá bài khi LP biến động."
      }
    ]
  },
  {
    "id": "card_b24_035_titr_mohr_silver_chromate_endpoint_trap_35",
    "name": "Chuẩn Độ Kết Tủa Phương Pháp Mohr (Điểm Chuẩn 5)",
    "name_en": "Mohr Silver Chromate Endpoint Trap (Endpoint Rank 5)",
    "cardType": "TRAP",
    "spellTrapSubtype": "NORMAL_TRAP",
    "spellSpeed": 2,
    "rarity": "COMMON",
    "attribute": "TERRA",
    "manaCost": 3,
    "chemicalFormula": "Ag2CrO4(red)",
    "effectCode": "TRAP_B24_MOHR_SILVER_CHROMATE_ENDPOINT_TRAP_TITR_35",
    "effectText": "[Bẫy Chuẩn Độ / Titration Trap - Spell Speed 2]: Kích hoạt khi điểm sinh mệnh của bất kỳ đấu thủ nào thay đổi: Gây chính xác 500 LP sát thương chuẩn lên đối thủ và rút 1 lá bài từ Bộ bài.",
    "scientificLore": "Kỹ thuật chuẩn độ hóa học định lượng Chuẩn Độ Kết Tủa Phương Pháp Mohr (2Ag⁺ + CrO₄²⁻ → Ag₂CrO₄(s)↓ (Brick Red Precipitate)) xác định chính xác nồng độ tại điểm tương đương theo chuẩn thực nghiệm Hóa học GDPT 2018.",
    "relatedEquation": "2Ag⁺ + CrO₄²⁻ → Ag₂CrO₄(s)↓ (Brick Red Precipitate)",
    "iupacName": "Mohr Silver Chromate Endpoint Trap Assay",
    "archetype": "TITRATION_PRECISION",
    "structuredEffects": [
      {
        "effectId": "B24_EFF_35",
        "activationWindow": "ON_LP_CHANGE",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 500
            }
          },
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Chuẩn độ chính xác: Gây 500 LP và rút 1 lá bài khi LP biến động."
      }
    ]
  },
  {
    "id": "card_b24_036_titr_permanganate_self_indicating_redox_endpoint_36",
    "name": "Chuẩn Độ Oxi Hóa Khử Permanganat (Điểm Chuẩn 5)",
    "name_en": "Permanganate Self-Indicating Redox Endpoint (Endpoint Rank 5)",
    "cardType": "TRAP",
    "spellTrapSubtype": "NORMAL_TRAP",
    "spellSpeed": 2,
    "rarity": "COMMON",
    "attribute": "ELECTRO",
    "manaCost": 4,
    "chemicalFormula": "KMnO4",
    "effectCode": "TRAP_B24_PERMANGANATE_SELF_INDICATING_REDOX_ENDPOINT_TITR_36",
    "effectText": "[Bẫy Chuẩn Độ / Titration Trap - Spell Speed 2]: Kích hoạt khi điểm sinh mệnh của bất kỳ đấu thủ nào thay đổi: Gây chính xác 500 LP sát thương chuẩn lên đối thủ và rút 1 lá bài từ Bộ bài.",
    "scientificLore": "Kỹ thuật chuẩn độ hóa học định lượng Chuẩn Độ Oxi Hóa Khử Permanganat (MnO₄⁻ + 8H⁺ + 5e⁻ → Mn²⁺ + 4H₂O (Purple to Colorless)) xác định chính xác nồng độ tại điểm tương đương theo chuẩn thực nghiệm Hóa học GDPT 2018.",
    "relatedEquation": "MnO₄⁻ + 8H⁺ + 5e⁻ → Mn²⁺ + 4H₂O (Purple to Colorless)",
    "iupacName": "Permanganate Self-Indicating Redox Endpoint Assay",
    "archetype": "ALKALINE_EARTH_BASTION",
    "structuredEffects": [
      {
        "effectId": "B24_EFF_36",
        "activationWindow": "ON_LP_CHANGE",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 500
            }
          },
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Chuẩn độ chính xác: Gây 500 LP và rút 1 lá bài khi LP biến động."
      }
    ]
  },
  {
    "id": "card_b24_037_titr_iodometric_starch_blue_complex_trap_37",
    "name": "Chuẩn Độ Iot Định Lượng Tinh Bột (Điểm Chuẩn 5)",
    "name_en": "Iodometric Starch Blue Complex Trap (Endpoint Rank 5)",
    "cardType": "TRAP",
    "spellTrapSubtype": "NORMAL_TRAP",
    "spellSpeed": 2,
    "rarity": "RARE",
    "attribute": "AQUA",
    "manaCost": 1,
    "chemicalFormula": "I2-Starch",
    "effectCode": "TRAP_B24_IODOMETRIC_STARCH_BLUE_COMPLEX_TRAP_TITR_37",
    "effectText": "[Bẫy Chuẩn Độ / Titration Trap - Spell Speed 2]: Kích hoạt khi điểm sinh mệnh của bất kỳ đấu thủ nào thay đổi: Gây chính xác 500 LP sát thương chuẩn lên đối thủ và rút 1 lá bài từ Bộ bài.",
    "scientificLore": "Kỹ thuật chuẩn độ hóa học định lượng Chuẩn Độ Iot Định Lượng Tinh Bột (I₂ + 2S₂O₃²⁻ → 2I⁻ + S₄O₆²⁻ (Blue Disappearance)) xác định chính xác nồng độ tại điểm tương đương theo chuẩn thực nghiệm Hóa học GDPT 2018.",
    "relatedEquation": "I₂ + 2S₂O₃²⁻ → 2I⁻ + S₄O₆²⁻ (Blue Disappearance)",
    "iupacName": "Iodometric Starch Blue Complex Trap Assay",
    "archetype": "TITRATION_PRECISION",
    "structuredEffects": [
      {
        "effectId": "B24_EFF_37",
        "activationWindow": "ON_LP_CHANGE",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 500
            }
          },
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Chuẩn độ chính xác: Gây 500 LP và rút 1 lá bài khi LP biến động."
      }
    ]
  },
  {
    "id": "card_b24_038_titr_titration_curve_sharp_equivalence_leap_38",
    "name": "Đường Cong Chuẩn Độ pH Bước Nhảy Vọt (Điểm Chuẩn 5)",
    "name_en": "Titration Curve Sharp Equivalence Leap (Endpoint Rank 5)",
    "cardType": "TRAP",
    "spellTrapSubtype": "NORMAL_TRAP",
    "spellSpeed": 2,
    "rarity": "RARE",
    "attribute": "ACID_DARK",
    "manaCost": 2,
    "chemicalFormula": "dpH/dV_titrant",
    "effectCode": "TRAP_B24_TITRATION_CURVE_SHARP_EQUIVALENCE_LEAP_TITR_38",
    "effectText": "[Bẫy Chuẩn Độ / Titration Trap - Spell Speed 2]: Kích hoạt khi điểm sinh mệnh của bất kỳ đấu thủ nào thay đổi: Gây chính xác 500 LP sát thương chuẩn lên đối thủ và rút 1 lá bài từ Bộ bài.",
    "scientificLore": "Kỹ thuật chuẩn độ hóa học định lượng Đường Cong Chuẩn Độ pH Bước Nhảy Vọt (Maximum 1st Derivative Inflection Point at Equivalence) xác định chính xác nồng độ tại điểm tương đương theo chuẩn thực nghiệm Hóa học GDPT 2018.",
    "relatedEquation": "Maximum 1st Derivative Inflection Point at Equivalence",
    "iupacName": "Titration Curve Sharp Equivalence Leap Assay",
    "archetype": "ALKALINE_EARTH_BASTION",
    "structuredEffects": [
      {
        "effectId": "B24_EFF_38",
        "activationWindow": "ON_LP_CHANGE",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 500
            }
          },
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Chuẩn độ chính xác: Gây 500 LP và rút 1 lá bài khi LP biến động."
      }
    ]
  },
  {
    "id": "card_b24_039_titr_potentiometric_glass_electrode_endpoint_sensor_39",
    "name": "Chuẩn Độ Điện Thế Bằng Điện Cực Thủy Tinh (Điểm Chuẩn 5)",
    "name_en": "Potentiometric Glass Electrode Endpoint Sensor (Endpoint Rank 5)",
    "cardType": "TRAP",
    "spellTrapSubtype": "NORMAL_TRAP",
    "spellSpeed": 2,
    "rarity": "SUPER_RARE",
    "attribute": "ELECTRO",
    "manaCost": 3,
    "chemicalFormula": "E_glass",
    "effectCode": "TRAP_B24_POTENTIOMETRIC_GLASS_ELECTRODE_ENDPOINT_SENSOR_TITR_39",
    "effectText": "[Bẫy Chuẩn Độ / Titration Trap - Spell Speed 2]: Kích hoạt khi điểm sinh mệnh của bất kỳ đấu thủ nào thay đổi: Gây chính xác 500 LP sát thương chuẩn lên đối thủ và rút 1 lá bài từ Bộ bài.",
    "scientificLore": "Kỹ thuật chuẩn độ hóa học định lượng Chuẩn Độ Điện Thế Bằng Điện Cực Thủy Tinh (Nernstian Potential Response to H⁺ Activity) xác định chính xác nồng độ tại điểm tương đương theo chuẩn thực nghiệm Hóa học GDPT 2018.",
    "relatedEquation": "Nernstian Potential Response to H⁺ Activity",
    "iupacName": "Potentiometric Glass Electrode Endpoint Sensor Assay",
    "archetype": "TITRATION_PRECISION",
    "structuredEffects": [
      {
        "effectId": "B24_EFF_39",
        "activationWindow": "ON_LP_CHANGE",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 500
            }
          },
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Chuẩn độ chính xác: Gây 500 LP và rút 1 lá bài khi LP biến động."
      }
    ]
  },
  {
    "id": "card_b24_040_titr_conductometric_ion_replacement_endpoint_barrier_40",
    "name": "Chuẩn Độ Độ Dẫn Điện Dung Dịch Muối (Điểm Chuẩn 5)",
    "name_en": "Conductometric Ion Replacement Endpoint Barrier (Endpoint Rank 5)",
    "cardType": "TRAP",
    "spellTrapSubtype": "NORMAL_TRAP",
    "spellSpeed": 2,
    "rarity": "SUPER_RARE",
    "attribute": "ELECTRO",
    "manaCost": 4,
    "chemicalFormula": "Conductivity κ",
    "effectCode": "TRAP_B24_CONDUCTOMETRIC_ION_REPLACEMENT_ENDPOINT_BARRIER_TITR_40",
    "effectText": "[Bẫy Chuẩn Độ / Titration Trap - Spell Speed 2]: Kích hoạt khi điểm sinh mệnh của bất kỳ đấu thủ nào thay đổi: Gây chính xác 500 LP sát thương chuẩn lên đối thủ và rút 1 lá bài từ Bộ bài.",
    "scientificLore": "Kỹ thuật chuẩn độ hóa học định lượng Chuẩn Độ Độ Dẫn Điện Dung Dịch Muối (Conductivity V-Shape Minimum at Equivalence Point) xác định chính xác nồng độ tại điểm tương đương theo chuẩn thực nghiệm Hóa học GDPT 2018.",
    "relatedEquation": "Conductivity V-Shape Minimum at Equivalence Point",
    "iupacName": "Conductometric Ion Replacement Endpoint Barrier Assay",
    "archetype": "ALKALINE_EARTH_BASTION",
    "structuredEffects": [
      {
        "effectId": "B24_EFF_40",
        "activationWindow": "ON_LP_CHANGE",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 500
            }
          },
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Chuẩn độ chính xác: Gây 500 LP và rút 1 lá bài khi LP biến động."
      }
    ]
  },
  {
    "id": "card_b24_041_titr_phenolphthalein_equivalence_point_trap_41",
    "name": "Chỉ Thị Màu Phenolphthalein Điểm Đổi Màu (Điểm Chuẩn 6)",
    "name_en": "Phenolphthalein Equivalence Point Trap (Endpoint Rank 6)",
    "cardType": "TRAP",
    "spellTrapSubtype": "NORMAL_TRAP",
    "spellSpeed": 2,
    "rarity": "ULTRA_RARE",
    "attribute": "AQUA",
    "manaCost": 1,
    "chemicalFormula": "C20H14O4",
    "effectCode": "TRAP_B24_PHENOLPHTHALEIN_EQUIVALENCE_POINT_TRAP_TITR_41",
    "effectText": "[Bẫy Chuẩn Độ / Titration Trap - Spell Speed 2]: Kích hoạt khi điểm sinh mệnh của bất kỳ đấu thủ nào thay đổi: Gây chính xác 500 LP sát thương chuẩn lên đối thủ và rút 1 lá bài từ Bộ bài.",
    "scientificLore": "Kỹ thuật chuẩn độ hóa học định lượng Chỉ Thị Màu Phenolphthalein Điểm Đổi Màu (Colorless pH < 8.2 → Pink/Magenta pH > 10.0) xác định chính xác nồng độ tại điểm tương đương theo chuẩn thực nghiệm Hóa học GDPT 2018.",
    "relatedEquation": "Colorless pH < 8.2 → Pink/Magenta pH > 10.0",
    "iupacName": "Phenolphthalein Equivalence Point Trap Assay",
    "archetype": "TITRATION_PRECISION",
    "structuredEffects": [
      {
        "effectId": "B24_EFF_41",
        "activationWindow": "ON_LP_CHANGE",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 500
            }
          },
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Chuẩn độ chính xác: Gây 500 LP và rút 1 lá bài khi LP biến động."
      }
    ]
  },
  {
    "id": "card_b24_042_titr_methyl_orange_acidic_endpoint_barrier_42",
    "name": "Chỉ Thị Màu Metyl Da Cam Vùng Axit (Điểm Chuẩn 6)",
    "name_en": "Methyl Orange Acidic Endpoint Barrier (Endpoint Rank 6)",
    "cardType": "TRAP",
    "spellTrapSubtype": "NORMAL_TRAP",
    "spellSpeed": 2,
    "rarity": "SECRET_RARE",
    "attribute": "PYRO",
    "manaCost": 2,
    "chemicalFormula": "C14H14N3NaO3S",
    "effectCode": "TRAP_B24_METHYL_ORANGE_ACIDIC_ENDPOINT_BARRIER_TITR_42",
    "effectText": "[Bẫy Chuẩn Độ / Titration Trap - Spell Speed 2]: Kích hoạt khi điểm sinh mệnh của bất kỳ đấu thủ nào thay đổi: Gây chính xác 500 LP sát thương chuẩn lên đối thủ và rút 1 lá bài từ Bộ bài.",
    "scientificLore": "Kỹ thuật chuẩn độ hóa học định lượng Chỉ Thị Màu Metyl Da Cam Vùng Axit (Red pH < 3.1 → Yellow pH > 4.4) xác định chính xác nồng độ tại điểm tương đương theo chuẩn thực nghiệm Hóa học GDPT 2018.",
    "relatedEquation": "Red pH < 3.1 → Yellow pH > 4.4",
    "iupacName": "Methyl Orange Acidic Endpoint Barrier Assay",
    "archetype": "ALKALINE_EARTH_BASTION",
    "structuredEffects": [
      {
        "effectId": "B24_EFF_42",
        "activationWindow": "ON_LP_CHANGE",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 500
            }
          },
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Chuẩn độ chính xác: Gây 500 LP và rút 1 lá bài khi LP biến động."
      }
    ]
  },
  {
    "id": "card_b24_043_titr_mohr_silver_chromate_endpoint_trap_43",
    "name": "Chuẩn Độ Kết Tủa Phương Pháp Mohr (Điểm Chuẩn 6)",
    "name_en": "Mohr Silver Chromate Endpoint Trap (Endpoint Rank 6)",
    "cardType": "TRAP",
    "spellTrapSubtype": "NORMAL_TRAP",
    "spellSpeed": 2,
    "rarity": "COMMON",
    "attribute": "TERRA",
    "manaCost": 3,
    "chemicalFormula": "Ag2CrO4(red)",
    "effectCode": "TRAP_B24_MOHR_SILVER_CHROMATE_ENDPOINT_TRAP_TITR_43",
    "effectText": "[Bẫy Chuẩn Độ / Titration Trap - Spell Speed 2]: Kích hoạt khi điểm sinh mệnh của bất kỳ đấu thủ nào thay đổi: Gây chính xác 500 LP sát thương chuẩn lên đối thủ và rút 1 lá bài từ Bộ bài.",
    "scientificLore": "Kỹ thuật chuẩn độ hóa học định lượng Chuẩn Độ Kết Tủa Phương Pháp Mohr (2Ag⁺ + CrO₄²⁻ → Ag₂CrO₄(s)↓ (Brick Red Precipitate)) xác định chính xác nồng độ tại điểm tương đương theo chuẩn thực nghiệm Hóa học GDPT 2018.",
    "relatedEquation": "2Ag⁺ + CrO₄²⁻ → Ag₂CrO₄(s)↓ (Brick Red Precipitate)",
    "iupacName": "Mohr Silver Chromate Endpoint Trap Assay",
    "archetype": "TITRATION_PRECISION",
    "structuredEffects": [
      {
        "effectId": "B24_EFF_43",
        "activationWindow": "ON_LP_CHANGE",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 500
            }
          },
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Chuẩn độ chính xác: Gây 500 LP và rút 1 lá bài khi LP biến động."
      }
    ]
  },
  {
    "id": "card_b24_044_titr_permanganate_self_indicating_redox_endpoint_44",
    "name": "Chuẩn Độ Oxi Hóa Khử Permanganat (Điểm Chuẩn 6)",
    "name_en": "Permanganate Self-Indicating Redox Endpoint (Endpoint Rank 6)",
    "cardType": "TRAP",
    "spellTrapSubtype": "NORMAL_TRAP",
    "spellSpeed": 2,
    "rarity": "COMMON",
    "attribute": "ELECTRO",
    "manaCost": 4,
    "chemicalFormula": "KMnO4",
    "effectCode": "TRAP_B24_PERMANGANATE_SELF_INDICATING_REDOX_ENDPOINT_TITR_44",
    "effectText": "[Bẫy Chuẩn Độ / Titration Trap - Spell Speed 2]: Kích hoạt khi điểm sinh mệnh của bất kỳ đấu thủ nào thay đổi: Gây chính xác 500 LP sát thương chuẩn lên đối thủ và rút 1 lá bài từ Bộ bài.",
    "scientificLore": "Kỹ thuật chuẩn độ hóa học định lượng Chuẩn Độ Oxi Hóa Khử Permanganat (MnO₄⁻ + 8H⁺ + 5e⁻ → Mn²⁺ + 4H₂O (Purple to Colorless)) xác định chính xác nồng độ tại điểm tương đương theo chuẩn thực nghiệm Hóa học GDPT 2018.",
    "relatedEquation": "MnO₄⁻ + 8H⁺ + 5e⁻ → Mn²⁺ + 4H₂O (Purple to Colorless)",
    "iupacName": "Permanganate Self-Indicating Redox Endpoint Assay",
    "archetype": "ALKALINE_EARTH_BASTION",
    "structuredEffects": [
      {
        "effectId": "B24_EFF_44",
        "activationWindow": "ON_LP_CHANGE",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 500
            }
          },
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Chuẩn độ chính xác: Gây 500 LP và rút 1 lá bài khi LP biến động."
      }
    ]
  },
  {
    "id": "card_b24_045_titr_iodometric_starch_blue_complex_trap_45",
    "name": "Chuẩn Độ Iot Định Lượng Tinh Bột (Điểm Chuẩn 6)",
    "name_en": "Iodometric Starch Blue Complex Trap (Endpoint Rank 6)",
    "cardType": "TRAP",
    "spellTrapSubtype": "NORMAL_TRAP",
    "spellSpeed": 2,
    "rarity": "COMMON",
    "attribute": "AQUA",
    "manaCost": 1,
    "chemicalFormula": "I2-Starch",
    "effectCode": "TRAP_B24_IODOMETRIC_STARCH_BLUE_COMPLEX_TRAP_TITR_45",
    "effectText": "[Bẫy Chuẩn Độ / Titration Trap - Spell Speed 2]: Kích hoạt khi điểm sinh mệnh của bất kỳ đấu thủ nào thay đổi: Gây chính xác 500 LP sát thương chuẩn lên đối thủ và rút 1 lá bài từ Bộ bài.",
    "scientificLore": "Kỹ thuật chuẩn độ hóa học định lượng Chuẩn Độ Iot Định Lượng Tinh Bột (I₂ + 2S₂O₃²⁻ → 2I⁻ + S₄O₆²⁻ (Blue Disappearance)) xác định chính xác nồng độ tại điểm tương đương theo chuẩn thực nghiệm Hóa học GDPT 2018.",
    "relatedEquation": "I₂ + 2S₂O₃²⁻ → 2I⁻ + S₄O₆²⁻ (Blue Disappearance)",
    "iupacName": "Iodometric Starch Blue Complex Trap Assay",
    "archetype": "TITRATION_PRECISION",
    "structuredEffects": [
      {
        "effectId": "B24_EFF_45",
        "activationWindow": "ON_LP_CHANGE",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 500
            }
          },
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Chuẩn độ chính xác: Gây 500 LP và rút 1 lá bài khi LP biến động."
      }
    ]
  },
  {
    "id": "card_b24_046_titr_titration_curve_sharp_equivalence_leap_46",
    "name": "Đường Cong Chuẩn Độ pH Bước Nhảy Vọt (Điểm Chuẩn 6)",
    "name_en": "Titration Curve Sharp Equivalence Leap (Endpoint Rank 6)",
    "cardType": "TRAP",
    "spellTrapSubtype": "NORMAL_TRAP",
    "spellSpeed": 2,
    "rarity": "RARE",
    "attribute": "ACID_DARK",
    "manaCost": 2,
    "chemicalFormula": "dpH/dV_titrant",
    "effectCode": "TRAP_B24_TITRATION_CURVE_SHARP_EQUIVALENCE_LEAP_TITR_46",
    "effectText": "[Bẫy Chuẩn Độ / Titration Trap - Spell Speed 2]: Kích hoạt khi điểm sinh mệnh của bất kỳ đấu thủ nào thay đổi: Gây chính xác 500 LP sát thương chuẩn lên đối thủ và rút 1 lá bài từ Bộ bài.",
    "scientificLore": "Kỹ thuật chuẩn độ hóa học định lượng Đường Cong Chuẩn Độ pH Bước Nhảy Vọt (Maximum 1st Derivative Inflection Point at Equivalence) xác định chính xác nồng độ tại điểm tương đương theo chuẩn thực nghiệm Hóa học GDPT 2018.",
    "relatedEquation": "Maximum 1st Derivative Inflection Point at Equivalence",
    "iupacName": "Titration Curve Sharp Equivalence Leap Assay",
    "archetype": "ALKALINE_EARTH_BASTION",
    "structuredEffects": [
      {
        "effectId": "B24_EFF_46",
        "activationWindow": "ON_LP_CHANGE",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 500
            }
          },
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Chuẩn độ chính xác: Gây 500 LP và rút 1 lá bài khi LP biến động."
      }
    ]
  },
  {
    "id": "card_b24_047_titr_potentiometric_glass_electrode_endpoint_sensor_47",
    "name": "Chuẩn Độ Điện Thế Bằng Điện Cực Thủy Tinh (Điểm Chuẩn 6)",
    "name_en": "Potentiometric Glass Electrode Endpoint Sensor (Endpoint Rank 6)",
    "cardType": "TRAP",
    "spellTrapSubtype": "NORMAL_TRAP",
    "spellSpeed": 2,
    "rarity": "RARE",
    "attribute": "ELECTRO",
    "manaCost": 3,
    "chemicalFormula": "E_glass",
    "effectCode": "TRAP_B24_POTENTIOMETRIC_GLASS_ELECTRODE_ENDPOINT_SENSOR_TITR_47",
    "effectText": "[Bẫy Chuẩn Độ / Titration Trap - Spell Speed 2]: Kích hoạt khi điểm sinh mệnh của bất kỳ đấu thủ nào thay đổi: Gây chính xác 500 LP sát thương chuẩn lên đối thủ và rút 1 lá bài từ Bộ bài.",
    "scientificLore": "Kỹ thuật chuẩn độ hóa học định lượng Chuẩn Độ Điện Thế Bằng Điện Cực Thủy Tinh (Nernstian Potential Response to H⁺ Activity) xác định chính xác nồng độ tại điểm tương đương theo chuẩn thực nghiệm Hóa học GDPT 2018.",
    "relatedEquation": "Nernstian Potential Response to H⁺ Activity",
    "iupacName": "Potentiometric Glass Electrode Endpoint Sensor Assay",
    "archetype": "TITRATION_PRECISION",
    "structuredEffects": [
      {
        "effectId": "B24_EFF_47",
        "activationWindow": "ON_LP_CHANGE",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 500
            }
          },
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Chuẩn độ chính xác: Gây 500 LP và rút 1 lá bài khi LP biến động."
      }
    ]
  },
  {
    "id": "card_b24_048_titr_conductometric_ion_replacement_endpoint_barrier_48",
    "name": "Chuẩn Độ Độ Dẫn Điện Dung Dịch Muối (Điểm Chuẩn 6)",
    "name_en": "Conductometric Ion Replacement Endpoint Barrier (Endpoint Rank 6)",
    "cardType": "TRAP",
    "spellTrapSubtype": "NORMAL_TRAP",
    "spellSpeed": 2,
    "rarity": "SUPER_RARE",
    "attribute": "ELECTRO",
    "manaCost": 4,
    "chemicalFormula": "Conductivity κ",
    "effectCode": "TRAP_B24_CONDUCTOMETRIC_ION_REPLACEMENT_ENDPOINT_BARRIER_TITR_48",
    "effectText": "[Bẫy Chuẩn Độ / Titration Trap - Spell Speed 2]: Kích hoạt khi điểm sinh mệnh của bất kỳ đấu thủ nào thay đổi: Gây chính xác 500 LP sát thương chuẩn lên đối thủ và rút 1 lá bài từ Bộ bài.",
    "scientificLore": "Kỹ thuật chuẩn độ hóa học định lượng Chuẩn Độ Độ Dẫn Điện Dung Dịch Muối (Conductivity V-Shape Minimum at Equivalence Point) xác định chính xác nồng độ tại điểm tương đương theo chuẩn thực nghiệm Hóa học GDPT 2018.",
    "relatedEquation": "Conductivity V-Shape Minimum at Equivalence Point",
    "iupacName": "Conductometric Ion Replacement Endpoint Barrier Assay",
    "archetype": "ALKALINE_EARTH_BASTION",
    "structuredEffects": [
      {
        "effectId": "B24_EFF_48",
        "activationWindow": "ON_LP_CHANGE",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 500
            }
          },
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Chuẩn độ chính xác: Gây 500 LP và rút 1 lá bài khi LP biến động."
      }
    ]
  },
  {
    "id": "card_b24_049_titr_phenolphthalein_equivalence_point_trap_49",
    "name": "Chỉ Thị Màu Phenolphthalein Điểm Đổi Màu (Điểm Chuẩn 7)",
    "name_en": "Phenolphthalein Equivalence Point Trap (Endpoint Rank 7)",
    "cardType": "TRAP",
    "spellTrapSubtype": "NORMAL_TRAP",
    "spellSpeed": 2,
    "rarity": "SUPER_RARE",
    "attribute": "AQUA",
    "manaCost": 1,
    "chemicalFormula": "C20H14O4",
    "effectCode": "TRAP_B24_PHENOLPHTHALEIN_EQUIVALENCE_POINT_TRAP_TITR_49",
    "effectText": "[Bẫy Chuẩn Độ / Titration Trap - Spell Speed 2]: Kích hoạt khi điểm sinh mệnh của bất kỳ đấu thủ nào thay đổi: Gây chính xác 500 LP sát thương chuẩn lên đối thủ và rút 1 lá bài từ Bộ bài.",
    "scientificLore": "Kỹ thuật chuẩn độ hóa học định lượng Chỉ Thị Màu Phenolphthalein Điểm Đổi Màu (Colorless pH < 8.2 → Pink/Magenta pH > 10.0) xác định chính xác nồng độ tại điểm tương đương theo chuẩn thực nghiệm Hóa học GDPT 2018.",
    "relatedEquation": "Colorless pH < 8.2 → Pink/Magenta pH > 10.0",
    "iupacName": "Phenolphthalein Equivalence Point Trap Assay",
    "archetype": "TITRATION_PRECISION",
    "structuredEffects": [
      {
        "effectId": "B24_EFF_49",
        "activationWindow": "ON_LP_CHANGE",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 500
            }
          },
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Chuẩn độ chính xác: Gây 500 LP và rút 1 lá bài khi LP biến động."
      }
    ]
  },
  {
    "id": "card_b24_050_titr_methyl_orange_acidic_endpoint_barrier_50",
    "name": "Chỉ Thị Màu Metyl Da Cam Vùng Axit (Điểm Chuẩn 7)",
    "name_en": "Methyl Orange Acidic Endpoint Barrier (Endpoint Rank 7)",
    "cardType": "TRAP",
    "spellTrapSubtype": "NORMAL_TRAP",
    "spellSpeed": 2,
    "rarity": "ULTRA_RARE",
    "attribute": "PYRO",
    "manaCost": 2,
    "chemicalFormula": "C14H14N3NaO3S",
    "effectCode": "TRAP_B24_METHYL_ORANGE_ACIDIC_ENDPOINT_BARRIER_TITR_50",
    "effectText": "[Bẫy Chuẩn Độ / Titration Trap - Spell Speed 2]: Kích hoạt khi điểm sinh mệnh của bất kỳ đấu thủ nào thay đổi: Gây chính xác 500 LP sát thương chuẩn lên đối thủ và rút 1 lá bài từ Bộ bài.",
    "scientificLore": "Kỹ thuật chuẩn độ hóa học định lượng Chỉ Thị Màu Metyl Da Cam Vùng Axit (Red pH < 3.1 → Yellow pH > 4.4) xác định chính xác nồng độ tại điểm tương đương theo chuẩn thực nghiệm Hóa học GDPT 2018.",
    "relatedEquation": "Red pH < 3.1 → Yellow pH > 4.4",
    "iupacName": "Methyl Orange Acidic Endpoint Barrier Assay",
    "archetype": "ALKALINE_EARTH_BASTION",
    "structuredEffects": [
      {
        "effectId": "B24_EFF_50",
        "activationWindow": "ON_LP_CHANGE",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 500
            }
          },
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Chuẩn độ chính xác: Gây 500 LP và rút 1 lá bài khi LP biến động."
      }
    ]
  },
  {
    "id": "card_b24_051_titr_mohr_silver_chromate_endpoint_trap_51",
    "name": "Chuẩn Độ Kết Tủa Phương Pháp Mohr (Điểm Chuẩn 7)",
    "name_en": "Mohr Silver Chromate Endpoint Trap (Endpoint Rank 7)",
    "cardType": "TRAP",
    "spellTrapSubtype": "NORMAL_TRAP",
    "spellSpeed": 2,
    "rarity": "SECRET_RARE",
    "attribute": "TERRA",
    "manaCost": 3,
    "chemicalFormula": "Ag2CrO4(red)",
    "effectCode": "TRAP_B24_MOHR_SILVER_CHROMATE_ENDPOINT_TRAP_TITR_51",
    "effectText": "[Bẫy Chuẩn Độ / Titration Trap - Spell Speed 2]: Kích hoạt khi điểm sinh mệnh của bất kỳ đấu thủ nào thay đổi: Gây chính xác 500 LP sát thương chuẩn lên đối thủ và rút 1 lá bài từ Bộ bài.",
    "scientificLore": "Kỹ thuật chuẩn độ hóa học định lượng Chuẩn Độ Kết Tủa Phương Pháp Mohr (2Ag⁺ + CrO₄²⁻ → Ag₂CrO₄(s)↓ (Brick Red Precipitate)) xác định chính xác nồng độ tại điểm tương đương theo chuẩn thực nghiệm Hóa học GDPT 2018.",
    "relatedEquation": "2Ag⁺ + CrO₄²⁻ → Ag₂CrO₄(s)↓ (Brick Red Precipitate)",
    "iupacName": "Mohr Silver Chromate Endpoint Trap Assay",
    "archetype": "TITRATION_PRECISION",
    "structuredEffects": [
      {
        "effectId": "B24_EFF_51",
        "activationWindow": "ON_LP_CHANGE",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 500
            }
          },
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Chuẩn độ chính xác: Gây 500 LP và rút 1 lá bài khi LP biến động."
      }
    ]
  },
  {
    "id": "card_b24_052_titr_permanganate_self_indicating_redox_endpoint_52",
    "name": "Chuẩn Độ Oxi Hóa Khử Permanganat (Điểm Chuẩn 7)",
    "name_en": "Permanganate Self-Indicating Redox Endpoint (Endpoint Rank 7)",
    "cardType": "TRAP",
    "spellTrapSubtype": "NORMAL_TRAP",
    "spellSpeed": 2,
    "rarity": "COMMON",
    "attribute": "ELECTRO",
    "manaCost": 4,
    "chemicalFormula": "KMnO4",
    "effectCode": "TRAP_B24_PERMANGANATE_SELF_INDICATING_REDOX_ENDPOINT_TITR_52",
    "effectText": "[Bẫy Chuẩn Độ / Titration Trap - Spell Speed 2]: Kích hoạt khi điểm sinh mệnh của bất kỳ đấu thủ nào thay đổi: Gây chính xác 500 LP sát thương chuẩn lên đối thủ và rút 1 lá bài từ Bộ bài.",
    "scientificLore": "Kỹ thuật chuẩn độ hóa học định lượng Chuẩn Độ Oxi Hóa Khử Permanganat (MnO₄⁻ + 8H⁺ + 5e⁻ → Mn²⁺ + 4H₂O (Purple to Colorless)) xác định chính xác nồng độ tại điểm tương đương theo chuẩn thực nghiệm Hóa học GDPT 2018.",
    "relatedEquation": "MnO₄⁻ + 8H⁺ + 5e⁻ → Mn²⁺ + 4H₂O (Purple to Colorless)",
    "iupacName": "Permanganate Self-Indicating Redox Endpoint Assay",
    "archetype": "ALKALINE_EARTH_BASTION",
    "structuredEffects": [
      {
        "effectId": "B24_EFF_52",
        "activationWindow": "ON_LP_CHANGE",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 500
            }
          },
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Chuẩn độ chính xác: Gây 500 LP và rút 1 lá bài khi LP biến động."
      }
    ]
  },
  {
    "id": "card_b24_053_titr_iodometric_starch_blue_complex_trap_53",
    "name": "Chuẩn Độ Iot Định Lượng Tinh Bột (Điểm Chuẩn 7)",
    "name_en": "Iodometric Starch Blue Complex Trap (Endpoint Rank 7)",
    "cardType": "TRAP",
    "spellTrapSubtype": "NORMAL_TRAP",
    "spellSpeed": 2,
    "rarity": "COMMON",
    "attribute": "AQUA",
    "manaCost": 1,
    "chemicalFormula": "I2-Starch",
    "effectCode": "TRAP_B24_IODOMETRIC_STARCH_BLUE_COMPLEX_TRAP_TITR_53",
    "effectText": "[Bẫy Chuẩn Độ / Titration Trap - Spell Speed 2]: Kích hoạt khi điểm sinh mệnh của bất kỳ đấu thủ nào thay đổi: Gây chính xác 500 LP sát thương chuẩn lên đối thủ và rút 1 lá bài từ Bộ bài.",
    "scientificLore": "Kỹ thuật chuẩn độ hóa học định lượng Chuẩn Độ Iot Định Lượng Tinh Bột (I₂ + 2S₂O₃²⁻ → 2I⁻ + S₄O₆²⁻ (Blue Disappearance)) xác định chính xác nồng độ tại điểm tương đương theo chuẩn thực nghiệm Hóa học GDPT 2018.",
    "relatedEquation": "I₂ + 2S₂O₃²⁻ → 2I⁻ + S₄O₆²⁻ (Blue Disappearance)",
    "iupacName": "Iodometric Starch Blue Complex Trap Assay",
    "archetype": "TITRATION_PRECISION",
    "structuredEffects": [
      {
        "effectId": "B24_EFF_53",
        "activationWindow": "ON_LP_CHANGE",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 500
            }
          },
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Chuẩn độ chính xác: Gây 500 LP và rút 1 lá bài khi LP biến động."
      }
    ]
  },
  {
    "id": "card_b24_054_titr_titration_curve_sharp_equivalence_leap_54",
    "name": "Đường Cong Chuẩn Độ pH Bước Nhảy Vọt (Điểm Chuẩn 7)",
    "name_en": "Titration Curve Sharp Equivalence Leap (Endpoint Rank 7)",
    "cardType": "TRAP",
    "spellTrapSubtype": "NORMAL_TRAP",
    "spellSpeed": 2,
    "rarity": "COMMON",
    "attribute": "ACID_DARK",
    "manaCost": 2,
    "chemicalFormula": "dpH/dV_titrant",
    "effectCode": "TRAP_B24_TITRATION_CURVE_SHARP_EQUIVALENCE_LEAP_TITR_54",
    "effectText": "[Bẫy Chuẩn Độ / Titration Trap - Spell Speed 2]: Kích hoạt khi điểm sinh mệnh của bất kỳ đấu thủ nào thay đổi: Gây chính xác 500 LP sát thương chuẩn lên đối thủ và rút 1 lá bài từ Bộ bài.",
    "scientificLore": "Kỹ thuật chuẩn độ hóa học định lượng Đường Cong Chuẩn Độ pH Bước Nhảy Vọt (Maximum 1st Derivative Inflection Point at Equivalence) xác định chính xác nồng độ tại điểm tương đương theo chuẩn thực nghiệm Hóa học GDPT 2018.",
    "relatedEquation": "Maximum 1st Derivative Inflection Point at Equivalence",
    "iupacName": "Titration Curve Sharp Equivalence Leap Assay",
    "archetype": "ALKALINE_EARTH_BASTION",
    "structuredEffects": [
      {
        "effectId": "B24_EFF_54",
        "activationWindow": "ON_LP_CHANGE",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 500
            }
          },
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Chuẩn độ chính xác: Gây 500 LP và rút 1 lá bài khi LP biến động."
      }
    ]
  },
  {
    "id": "card_b24_055_titr_potentiometric_glass_electrode_endpoint_sensor_55",
    "name": "Chuẩn Độ Điện Thế Bằng Điện Cực Thủy Tinh (Điểm Chuẩn 7)",
    "name_en": "Potentiometric Glass Electrode Endpoint Sensor (Endpoint Rank 7)",
    "cardType": "TRAP",
    "spellTrapSubtype": "NORMAL_TRAP",
    "spellSpeed": 2,
    "rarity": "RARE",
    "attribute": "ELECTRO",
    "manaCost": 3,
    "chemicalFormula": "E_glass",
    "effectCode": "TRAP_B24_POTENTIOMETRIC_GLASS_ELECTRODE_ENDPOINT_SENSOR_TITR_55",
    "effectText": "[Bẫy Chuẩn Độ / Titration Trap - Spell Speed 2]: Kích hoạt khi điểm sinh mệnh của bất kỳ đấu thủ nào thay đổi: Gây chính xác 500 LP sát thương chuẩn lên đối thủ và rút 1 lá bài từ Bộ bài.",
    "scientificLore": "Kỹ thuật chuẩn độ hóa học định lượng Chuẩn Độ Điện Thế Bằng Điện Cực Thủy Tinh (Nernstian Potential Response to H⁺ Activity) xác định chính xác nồng độ tại điểm tương đương theo chuẩn thực nghiệm Hóa học GDPT 2018.",
    "relatedEquation": "Nernstian Potential Response to H⁺ Activity",
    "iupacName": "Potentiometric Glass Electrode Endpoint Sensor Assay",
    "archetype": "TITRATION_PRECISION",
    "structuredEffects": [
      {
        "effectId": "B24_EFF_55",
        "activationWindow": "ON_LP_CHANGE",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 500
            }
          },
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Chuẩn độ chính xác: Gây 500 LP và rút 1 lá bài khi LP biến động."
      }
    ]
  },
  {
    "id": "card_b24_056_titr_conductometric_ion_replacement_endpoint_barrier_56",
    "name": "Chuẩn Độ Độ Dẫn Điện Dung Dịch Muối (Điểm Chuẩn 7)",
    "name_en": "Conductometric Ion Replacement Endpoint Barrier (Endpoint Rank 7)",
    "cardType": "TRAP",
    "spellTrapSubtype": "NORMAL_TRAP",
    "spellSpeed": 2,
    "rarity": "RARE",
    "attribute": "ELECTRO",
    "manaCost": 4,
    "chemicalFormula": "Conductivity κ",
    "effectCode": "TRAP_B24_CONDUCTOMETRIC_ION_REPLACEMENT_ENDPOINT_BARRIER_TITR_56",
    "effectText": "[Bẫy Chuẩn Độ / Titration Trap - Spell Speed 2]: Kích hoạt khi điểm sinh mệnh của bất kỳ đấu thủ nào thay đổi: Gây chính xác 500 LP sát thương chuẩn lên đối thủ và rút 1 lá bài từ Bộ bài.",
    "scientificLore": "Kỹ thuật chuẩn độ hóa học định lượng Chuẩn Độ Độ Dẫn Điện Dung Dịch Muối (Conductivity V-Shape Minimum at Equivalence Point) xác định chính xác nồng độ tại điểm tương đương theo chuẩn thực nghiệm Hóa học GDPT 2018.",
    "relatedEquation": "Conductivity V-Shape Minimum at Equivalence Point",
    "iupacName": "Conductometric Ion Replacement Endpoint Barrier Assay",
    "archetype": "ALKALINE_EARTH_BASTION",
    "structuredEffects": [
      {
        "effectId": "B24_EFF_56",
        "activationWindow": "ON_LP_CHANGE",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 500
            }
          },
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Chuẩn độ chính xác: Gây 500 LP và rút 1 lá bài khi LP biến động."
      }
    ]
  },
  {
    "id": "card_b24_057_titr_phenolphthalein_equivalence_point_trap_57",
    "name": "Chỉ Thị Màu Phenolphthalein Điểm Đổi Màu (Điểm Chuẩn 8)",
    "name_en": "Phenolphthalein Equivalence Point Trap (Endpoint Rank 8)",
    "cardType": "TRAP",
    "spellTrapSubtype": "NORMAL_TRAP",
    "spellSpeed": 2,
    "rarity": "SUPER_RARE",
    "attribute": "AQUA",
    "manaCost": 1,
    "chemicalFormula": "C20H14O4",
    "effectCode": "TRAP_B24_PHENOLPHTHALEIN_EQUIVALENCE_POINT_TRAP_TITR_57",
    "effectText": "[Bẫy Chuẩn Độ / Titration Trap - Spell Speed 2]: Kích hoạt khi điểm sinh mệnh của bất kỳ đấu thủ nào thay đổi: Gây chính xác 500 LP sát thương chuẩn lên đối thủ và rút 1 lá bài từ Bộ bài.",
    "scientificLore": "Kỹ thuật chuẩn độ hóa học định lượng Chỉ Thị Màu Phenolphthalein Điểm Đổi Màu (Colorless pH < 8.2 → Pink/Magenta pH > 10.0) xác định chính xác nồng độ tại điểm tương đương theo chuẩn thực nghiệm Hóa học GDPT 2018.",
    "relatedEquation": "Colorless pH < 8.2 → Pink/Magenta pH > 10.0",
    "iupacName": "Phenolphthalein Equivalence Point Trap Assay",
    "archetype": "TITRATION_PRECISION",
    "structuredEffects": [
      {
        "effectId": "B24_EFF_57",
        "activationWindow": "ON_LP_CHANGE",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 500
            }
          },
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Chuẩn độ chính xác: Gây 500 LP và rút 1 lá bài khi LP biến động."
      }
    ]
  },
  {
    "id": "card_b24_058_titr_methyl_orange_acidic_endpoint_barrier_58",
    "name": "Chỉ Thị Màu Metyl Da Cam Vùng Axit (Điểm Chuẩn 8)",
    "name_en": "Methyl Orange Acidic Endpoint Barrier (Endpoint Rank 8)",
    "cardType": "TRAP",
    "spellTrapSubtype": "NORMAL_TRAP",
    "spellSpeed": 2,
    "rarity": "SUPER_RARE",
    "attribute": "PYRO",
    "manaCost": 2,
    "chemicalFormula": "C14H14N3NaO3S",
    "effectCode": "TRAP_B24_METHYL_ORANGE_ACIDIC_ENDPOINT_BARRIER_TITR_58",
    "effectText": "[Bẫy Chuẩn Độ / Titration Trap - Spell Speed 2]: Kích hoạt khi điểm sinh mệnh của bất kỳ đấu thủ nào thay đổi: Gây chính xác 500 LP sát thương chuẩn lên đối thủ và rút 1 lá bài từ Bộ bài.",
    "scientificLore": "Kỹ thuật chuẩn độ hóa học định lượng Chỉ Thị Màu Metyl Da Cam Vùng Axit (Red pH < 3.1 → Yellow pH > 4.4) xác định chính xác nồng độ tại điểm tương đương theo chuẩn thực nghiệm Hóa học GDPT 2018.",
    "relatedEquation": "Red pH < 3.1 → Yellow pH > 4.4",
    "iupacName": "Methyl Orange Acidic Endpoint Barrier Assay",
    "archetype": "ALKALINE_EARTH_BASTION",
    "structuredEffects": [
      {
        "effectId": "B24_EFF_58",
        "activationWindow": "ON_LP_CHANGE",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 500
            }
          },
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Chuẩn độ chính xác: Gây 500 LP và rút 1 lá bài khi LP biến động."
      }
    ]
  },
  {
    "id": "card_b24_059_titr_mohr_silver_chromate_endpoint_trap_59",
    "name": "Chuẩn Độ Kết Tủa Phương Pháp Mohr (Điểm Chuẩn 8)",
    "name_en": "Mohr Silver Chromate Endpoint Trap (Endpoint Rank 8)",
    "cardType": "TRAP",
    "spellTrapSubtype": "NORMAL_TRAP",
    "spellSpeed": 2,
    "rarity": "ULTRA_RARE",
    "attribute": "TERRA",
    "manaCost": 3,
    "chemicalFormula": "Ag2CrO4(red)",
    "effectCode": "TRAP_B24_MOHR_SILVER_CHROMATE_ENDPOINT_TRAP_TITR_59",
    "effectText": "[Bẫy Chuẩn Độ / Titration Trap - Spell Speed 2]: Kích hoạt khi điểm sinh mệnh của bất kỳ đấu thủ nào thay đổi: Gây chính xác 500 LP sát thương chuẩn lên đối thủ và rút 1 lá bài từ Bộ bài.",
    "scientificLore": "Kỹ thuật chuẩn độ hóa học định lượng Chuẩn Độ Kết Tủa Phương Pháp Mohr (2Ag⁺ + CrO₄²⁻ → Ag₂CrO₄(s)↓ (Brick Red Precipitate)) xác định chính xác nồng độ tại điểm tương đương theo chuẩn thực nghiệm Hóa học GDPT 2018.",
    "relatedEquation": "2Ag⁺ + CrO₄²⁻ → Ag₂CrO₄(s)↓ (Brick Red Precipitate)",
    "iupacName": "Mohr Silver Chromate Endpoint Trap Assay",
    "archetype": "TITRATION_PRECISION",
    "structuredEffects": [
      {
        "effectId": "B24_EFF_59",
        "activationWindow": "ON_LP_CHANGE",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 500
            }
          },
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Chuẩn độ chính xác: Gây 500 LP và rút 1 lá bài khi LP biến động."
      }
    ]
  },
  {
    "id": "card_b24_060_titr_permanganate_self_indicating_redox_endpoint_60",
    "name": "Chuẩn Độ Oxi Hóa Khử Permanganat (Điểm Chuẩn 8)",
    "name_en": "Permanganate Self-Indicating Redox Endpoint (Endpoint Rank 8)",
    "cardType": "TRAP",
    "spellTrapSubtype": "NORMAL_TRAP",
    "spellSpeed": 2,
    "rarity": "SECRET_RARE",
    "attribute": "ELECTRO",
    "manaCost": 4,
    "chemicalFormula": "KMnO4",
    "effectCode": "TRAP_B24_PERMANGANATE_SELF_INDICATING_REDOX_ENDPOINT_TITR_60",
    "effectText": "[Bẫy Chuẩn Độ / Titration Trap - Spell Speed 2]: Kích hoạt khi điểm sinh mệnh của bất kỳ đấu thủ nào thay đổi: Gây chính xác 500 LP sát thương chuẩn lên đối thủ và rút 1 lá bài từ Bộ bài.",
    "scientificLore": "Kỹ thuật chuẩn độ hóa học định lượng Chuẩn Độ Oxi Hóa Khử Permanganat (MnO₄⁻ + 8H⁺ + 5e⁻ → Mn²⁺ + 4H₂O (Purple to Colorless)) xác định chính xác nồng độ tại điểm tương đương theo chuẩn thực nghiệm Hóa học GDPT 2018.",
    "relatedEquation": "MnO₄⁻ + 8H⁺ + 5e⁻ → Mn²⁺ + 4H₂O (Purple to Colorless)",
    "iupacName": "Permanganate Self-Indicating Redox Endpoint Assay",
    "archetype": "ALKALINE_EARTH_BASTION",
    "structuredEffects": [
      {
        "effectId": "B24_EFF_60",
        "activationWindow": "ON_LP_CHANGE",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 500
            }
          },
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Chuẩn độ chính xác: Gây 500 LP và rút 1 lá bài khi LP biến động."
      }
    ]
  },
  {
    "id": "card_b24_061_titr_iodometric_starch_blue_complex_trap_61",
    "name": "Chuẩn Độ Iot Định Lượng Tinh Bột (Điểm Chuẩn 8)",
    "name_en": "Iodometric Starch Blue Complex Trap (Endpoint Rank 8)",
    "cardType": "TRAP",
    "spellTrapSubtype": "NORMAL_TRAP",
    "spellSpeed": 2,
    "rarity": "COMMON",
    "attribute": "AQUA",
    "manaCost": 1,
    "chemicalFormula": "I2-Starch",
    "effectCode": "TRAP_B24_IODOMETRIC_STARCH_BLUE_COMPLEX_TRAP_TITR_61",
    "effectText": "[Bẫy Chuẩn Độ / Titration Trap - Spell Speed 2]: Kích hoạt khi điểm sinh mệnh của bất kỳ đấu thủ nào thay đổi: Gây chính xác 500 LP sát thương chuẩn lên đối thủ và rút 1 lá bài từ Bộ bài.",
    "scientificLore": "Kỹ thuật chuẩn độ hóa học định lượng Chuẩn Độ Iot Định Lượng Tinh Bột (I₂ + 2S₂O₃²⁻ → 2I⁻ + S₄O₆²⁻ (Blue Disappearance)) xác định chính xác nồng độ tại điểm tương đương theo chuẩn thực nghiệm Hóa học GDPT 2018.",
    "relatedEquation": "I₂ + 2S₂O₃²⁻ → 2I⁻ + S₄O₆²⁻ (Blue Disappearance)",
    "iupacName": "Iodometric Starch Blue Complex Trap Assay",
    "archetype": "TITRATION_PRECISION",
    "structuredEffects": [
      {
        "effectId": "B24_EFF_61",
        "activationWindow": "ON_LP_CHANGE",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 500
            }
          },
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Chuẩn độ chính xác: Gây 500 LP và rút 1 lá bài khi LP biến động."
      }
    ]
  },
  {
    "id": "card_b24_062_titr_titration_curve_sharp_equivalence_leap_62",
    "name": "Đường Cong Chuẩn Độ pH Bước Nhảy Vọt (Điểm Chuẩn 8)",
    "name_en": "Titration Curve Sharp Equivalence Leap (Endpoint Rank 8)",
    "cardType": "TRAP",
    "spellTrapSubtype": "NORMAL_TRAP",
    "spellSpeed": 2,
    "rarity": "COMMON",
    "attribute": "ACID_DARK",
    "manaCost": 2,
    "chemicalFormula": "dpH/dV_titrant",
    "effectCode": "TRAP_B24_TITRATION_CURVE_SHARP_EQUIVALENCE_LEAP_TITR_62",
    "effectText": "[Bẫy Chuẩn Độ / Titration Trap - Spell Speed 2]: Kích hoạt khi điểm sinh mệnh của bất kỳ đấu thủ nào thay đổi: Gây chính xác 500 LP sát thương chuẩn lên đối thủ và rút 1 lá bài từ Bộ bài.",
    "scientificLore": "Kỹ thuật chuẩn độ hóa học định lượng Đường Cong Chuẩn Độ pH Bước Nhảy Vọt (Maximum 1st Derivative Inflection Point at Equivalence) xác định chính xác nồng độ tại điểm tương đương theo chuẩn thực nghiệm Hóa học GDPT 2018.",
    "relatedEquation": "Maximum 1st Derivative Inflection Point at Equivalence",
    "iupacName": "Titration Curve Sharp Equivalence Leap Assay",
    "archetype": "ALKALINE_EARTH_BASTION",
    "structuredEffects": [
      {
        "effectId": "B24_EFF_62",
        "activationWindow": "ON_LP_CHANGE",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 500
            }
          },
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Chuẩn độ chính xác: Gây 500 LP và rút 1 lá bài khi LP biến động."
      }
    ]
  },
  {
    "id": "card_b24_063_titr_potentiometric_glass_electrode_endpoint_sensor_63",
    "name": "Chuẩn Độ Điện Thế Bằng Điện Cực Thủy Tinh (Điểm Chuẩn 8)",
    "name_en": "Potentiometric Glass Electrode Endpoint Sensor (Endpoint Rank 8)",
    "cardType": "TRAP",
    "spellTrapSubtype": "NORMAL_TRAP",
    "spellSpeed": 2,
    "rarity": "COMMON",
    "attribute": "ELECTRO",
    "manaCost": 3,
    "chemicalFormula": "E_glass",
    "effectCode": "TRAP_B24_POTENTIOMETRIC_GLASS_ELECTRODE_ENDPOINT_SENSOR_TITR_63",
    "effectText": "[Bẫy Chuẩn Độ / Titration Trap - Spell Speed 2]: Kích hoạt khi điểm sinh mệnh của bất kỳ đấu thủ nào thay đổi: Gây chính xác 500 LP sát thương chuẩn lên đối thủ và rút 1 lá bài từ Bộ bài.",
    "scientificLore": "Kỹ thuật chuẩn độ hóa học định lượng Chuẩn Độ Điện Thế Bằng Điện Cực Thủy Tinh (Nernstian Potential Response to H⁺ Activity) xác định chính xác nồng độ tại điểm tương đương theo chuẩn thực nghiệm Hóa học GDPT 2018.",
    "relatedEquation": "Nernstian Potential Response to H⁺ Activity",
    "iupacName": "Potentiometric Glass Electrode Endpoint Sensor Assay",
    "archetype": "TITRATION_PRECISION",
    "structuredEffects": [
      {
        "effectId": "B24_EFF_63",
        "activationWindow": "ON_LP_CHANGE",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 500
            }
          },
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Chuẩn độ chính xác: Gây 500 LP và rút 1 lá bài khi LP biến động."
      }
    ]
  },
  {
    "id": "card_b24_064_titr_conductometric_ion_replacement_endpoint_barrier_64",
    "name": "Chuẩn Độ Độ Dẫn Điện Dung Dịch Muối (Điểm Chuẩn 8)",
    "name_en": "Conductometric Ion Replacement Endpoint Barrier (Endpoint Rank 8)",
    "cardType": "TRAP",
    "spellTrapSubtype": "NORMAL_TRAP",
    "spellSpeed": 2,
    "rarity": "RARE",
    "attribute": "ELECTRO",
    "manaCost": 4,
    "chemicalFormula": "Conductivity κ",
    "effectCode": "TRAP_B24_CONDUCTOMETRIC_ION_REPLACEMENT_ENDPOINT_BARRIER_TITR_64",
    "effectText": "[Bẫy Chuẩn Độ / Titration Trap - Spell Speed 2]: Kích hoạt khi điểm sinh mệnh của bất kỳ đấu thủ nào thay đổi: Gây chính xác 500 LP sát thương chuẩn lên đối thủ và rút 1 lá bài từ Bộ bài.",
    "scientificLore": "Kỹ thuật chuẩn độ hóa học định lượng Chuẩn Độ Độ Dẫn Điện Dung Dịch Muối (Conductivity V-Shape Minimum at Equivalence Point) xác định chính xác nồng độ tại điểm tương đương theo chuẩn thực nghiệm Hóa học GDPT 2018.",
    "relatedEquation": "Conductivity V-Shape Minimum at Equivalence Point",
    "iupacName": "Conductometric Ion Replacement Endpoint Barrier Assay",
    "archetype": "ALKALINE_EARTH_BASTION",
    "structuredEffects": [
      {
        "effectId": "B24_EFF_64",
        "activationWindow": "ON_LP_CHANGE",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 500
            }
          },
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Chuẩn độ chính xác: Gây 500 LP và rút 1 lá bài khi LP biến động."
      }
    ]
  },
  {
    "id": "card_b24_065_titr_phenolphthalein_equivalence_point_trap_65",
    "name": "Chỉ Thị Màu Phenolphthalein Điểm Đổi Màu (Điểm Chuẩn 9)",
    "name_en": "Phenolphthalein Equivalence Point Trap (Endpoint Rank 9)",
    "cardType": "TRAP",
    "spellTrapSubtype": "NORMAL_TRAP",
    "spellSpeed": 2,
    "rarity": "RARE",
    "attribute": "AQUA",
    "manaCost": 1,
    "chemicalFormula": "C20H14O4",
    "effectCode": "TRAP_B24_PHENOLPHTHALEIN_EQUIVALENCE_POINT_TRAP_TITR_65",
    "effectText": "[Bẫy Chuẩn Độ / Titration Trap - Spell Speed 2]: Kích hoạt khi điểm sinh mệnh của bất kỳ đấu thủ nào thay đổi: Gây chính xác 500 LP sát thương chuẩn lên đối thủ và rút 1 lá bài từ Bộ bài.",
    "scientificLore": "Kỹ thuật chuẩn độ hóa học định lượng Chỉ Thị Màu Phenolphthalein Điểm Đổi Màu (Colorless pH < 8.2 → Pink/Magenta pH > 10.0) xác định chính xác nồng độ tại điểm tương đương theo chuẩn thực nghiệm Hóa học GDPT 2018.",
    "relatedEquation": "Colorless pH < 8.2 → Pink/Magenta pH > 10.0",
    "iupacName": "Phenolphthalein Equivalence Point Trap Assay",
    "archetype": "TITRATION_PRECISION",
    "structuredEffects": [
      {
        "effectId": "B24_EFF_65",
        "activationWindow": "ON_LP_CHANGE",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 500
            }
          },
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Chuẩn độ chính xác: Gây 500 LP và rút 1 lá bài khi LP biến động."
      }
    ]
  },
  {
    "id": "card_b24_066_titr_methyl_orange_acidic_endpoint_barrier_66",
    "name": "Chỉ Thị Màu Metyl Da Cam Vùng Axit (Điểm Chuẩn 9)",
    "name_en": "Methyl Orange Acidic Endpoint Barrier (Endpoint Rank 9)",
    "cardType": "TRAP",
    "spellTrapSubtype": "NORMAL_TRAP",
    "spellSpeed": 2,
    "rarity": "SUPER_RARE",
    "attribute": "PYRO",
    "manaCost": 2,
    "chemicalFormula": "C14H14N3NaO3S",
    "effectCode": "TRAP_B24_METHYL_ORANGE_ACIDIC_ENDPOINT_BARRIER_TITR_66",
    "effectText": "[Bẫy Chuẩn Độ / Titration Trap - Spell Speed 2]: Kích hoạt khi điểm sinh mệnh của bất kỳ đấu thủ nào thay đổi: Gây chính xác 500 LP sát thương chuẩn lên đối thủ và rút 1 lá bài từ Bộ bài.",
    "scientificLore": "Kỹ thuật chuẩn độ hóa học định lượng Chỉ Thị Màu Metyl Da Cam Vùng Axit (Red pH < 3.1 → Yellow pH > 4.4) xác định chính xác nồng độ tại điểm tương đương theo chuẩn thực nghiệm Hóa học GDPT 2018.",
    "relatedEquation": "Red pH < 3.1 → Yellow pH > 4.4",
    "iupacName": "Methyl Orange Acidic Endpoint Barrier Assay",
    "archetype": "ALKALINE_EARTH_BASTION",
    "structuredEffects": [
      {
        "effectId": "B24_EFF_66",
        "activationWindow": "ON_LP_CHANGE",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 500
            }
          },
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Chuẩn độ chính xác: Gây 500 LP và rút 1 lá bài khi LP biến động."
      }
    ]
  },
  {
    "id": "card_b24_067_titr_mohr_silver_chromate_endpoint_trap_67",
    "name": "Chuẩn Độ Kết Tủa Phương Pháp Mohr (Điểm Chuẩn 9)",
    "name_en": "Mohr Silver Chromate Endpoint Trap (Endpoint Rank 9)",
    "cardType": "TRAP",
    "spellTrapSubtype": "NORMAL_TRAP",
    "spellSpeed": 2,
    "rarity": "SUPER_RARE",
    "attribute": "TERRA",
    "manaCost": 3,
    "chemicalFormula": "Ag2CrO4(red)",
    "effectCode": "TRAP_B24_MOHR_SILVER_CHROMATE_ENDPOINT_TRAP_TITR_67",
    "effectText": "[Bẫy Chuẩn Độ / Titration Trap - Spell Speed 2]: Kích hoạt khi điểm sinh mệnh của bất kỳ đấu thủ nào thay đổi: Gây chính xác 500 LP sát thương chuẩn lên đối thủ và rút 1 lá bài từ Bộ bài.",
    "scientificLore": "Kỹ thuật chuẩn độ hóa học định lượng Chuẩn Độ Kết Tủa Phương Pháp Mohr (2Ag⁺ + CrO₄²⁻ → Ag₂CrO₄(s)↓ (Brick Red Precipitate)) xác định chính xác nồng độ tại điểm tương đương theo chuẩn thực nghiệm Hóa học GDPT 2018.",
    "relatedEquation": "2Ag⁺ + CrO₄²⁻ → Ag₂CrO₄(s)↓ (Brick Red Precipitate)",
    "iupacName": "Mohr Silver Chromate Endpoint Trap Assay",
    "archetype": "TITRATION_PRECISION",
    "structuredEffects": [
      {
        "effectId": "B24_EFF_67",
        "activationWindow": "ON_LP_CHANGE",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 500
            }
          },
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Chuẩn độ chính xác: Gây 500 LP và rút 1 lá bài khi LP biến động."
      }
    ]
  },
  {
    "id": "card_b24_068_titr_permanganate_self_indicating_redox_endpoint_68",
    "name": "Chuẩn Độ Oxi Hóa Khử Permanganat (Điểm Chuẩn 9)",
    "name_en": "Permanganate Self-Indicating Redox Endpoint (Endpoint Rank 9)",
    "cardType": "TRAP",
    "spellTrapSubtype": "NORMAL_TRAP",
    "spellSpeed": 2,
    "rarity": "ULTRA_RARE",
    "attribute": "ELECTRO",
    "manaCost": 4,
    "chemicalFormula": "KMnO4",
    "effectCode": "TRAP_B24_PERMANGANATE_SELF_INDICATING_REDOX_ENDPOINT_TITR_68",
    "effectText": "[Bẫy Chuẩn Độ / Titration Trap - Spell Speed 2]: Kích hoạt khi điểm sinh mệnh của bất kỳ đấu thủ nào thay đổi: Gây chính xác 500 LP sát thương chuẩn lên đối thủ và rút 1 lá bài từ Bộ bài.",
    "scientificLore": "Kỹ thuật chuẩn độ hóa học định lượng Chuẩn Độ Oxi Hóa Khử Permanganat (MnO₄⁻ + 8H⁺ + 5e⁻ → Mn²⁺ + 4H₂O (Purple to Colorless)) xác định chính xác nồng độ tại điểm tương đương theo chuẩn thực nghiệm Hóa học GDPT 2018.",
    "relatedEquation": "MnO₄⁻ + 8H⁺ + 5e⁻ → Mn²⁺ + 4H₂O (Purple to Colorless)",
    "iupacName": "Permanganate Self-Indicating Redox Endpoint Assay",
    "archetype": "ALKALINE_EARTH_BASTION",
    "structuredEffects": [
      {
        "effectId": "B24_EFF_68",
        "activationWindow": "ON_LP_CHANGE",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 500
            }
          },
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Chuẩn độ chính xác: Gây 500 LP và rút 1 lá bài khi LP biến động."
      }
    ]
  },
  {
    "id": "card_b24_069_titr_iodometric_starch_blue_complex_trap_69",
    "name": "Chuẩn Độ Iot Định Lượng Tinh Bột (Điểm Chuẩn 9)",
    "name_en": "Iodometric Starch Blue Complex Trap (Endpoint Rank 9)",
    "cardType": "TRAP",
    "spellTrapSubtype": "NORMAL_TRAP",
    "spellSpeed": 2,
    "rarity": "SECRET_RARE",
    "attribute": "AQUA",
    "manaCost": 1,
    "chemicalFormula": "I2-Starch",
    "effectCode": "TRAP_B24_IODOMETRIC_STARCH_BLUE_COMPLEX_TRAP_TITR_69",
    "effectText": "[Bẫy Chuẩn Độ / Titration Trap - Spell Speed 2]: Kích hoạt khi điểm sinh mệnh của bất kỳ đấu thủ nào thay đổi: Gây chính xác 500 LP sát thương chuẩn lên đối thủ và rút 1 lá bài từ Bộ bài.",
    "scientificLore": "Kỹ thuật chuẩn độ hóa học định lượng Chuẩn Độ Iot Định Lượng Tinh Bột (I₂ + 2S₂O₃²⁻ → 2I⁻ + S₄O₆²⁻ (Blue Disappearance)) xác định chính xác nồng độ tại điểm tương đương theo chuẩn thực nghiệm Hóa học GDPT 2018.",
    "relatedEquation": "I₂ + 2S₂O₃²⁻ → 2I⁻ + S₄O₆²⁻ (Blue Disappearance)",
    "iupacName": "Iodometric Starch Blue Complex Trap Assay",
    "archetype": "TITRATION_PRECISION",
    "structuredEffects": [
      {
        "effectId": "B24_EFF_69",
        "activationWindow": "ON_LP_CHANGE",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 500
            }
          },
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Chuẩn độ chính xác: Gây 500 LP và rút 1 lá bài khi LP biến động."
      }
    ]
  },
  {
    "id": "card_b24_070_titr_titration_curve_sharp_equivalence_leap_70",
    "name": "Đường Cong Chuẩn Độ pH Bước Nhảy Vọt (Điểm Chuẩn 9)",
    "name_en": "Titration Curve Sharp Equivalence Leap (Endpoint Rank 9)",
    "cardType": "TRAP",
    "spellTrapSubtype": "NORMAL_TRAP",
    "spellSpeed": 2,
    "rarity": "COMMON",
    "attribute": "ACID_DARK",
    "manaCost": 2,
    "chemicalFormula": "dpH/dV_titrant",
    "effectCode": "TRAP_B24_TITRATION_CURVE_SHARP_EQUIVALENCE_LEAP_TITR_70",
    "effectText": "[Bẫy Chuẩn Độ / Titration Trap - Spell Speed 2]: Kích hoạt khi điểm sinh mệnh của bất kỳ đấu thủ nào thay đổi: Gây chính xác 500 LP sát thương chuẩn lên đối thủ và rút 1 lá bài từ Bộ bài.",
    "scientificLore": "Kỹ thuật chuẩn độ hóa học định lượng Đường Cong Chuẩn Độ pH Bước Nhảy Vọt (Maximum 1st Derivative Inflection Point at Equivalence) xác định chính xác nồng độ tại điểm tương đương theo chuẩn thực nghiệm Hóa học GDPT 2018.",
    "relatedEquation": "Maximum 1st Derivative Inflection Point at Equivalence",
    "iupacName": "Titration Curve Sharp Equivalence Leap Assay",
    "archetype": "ALKALINE_EARTH_BASTION",
    "structuredEffects": [
      {
        "effectId": "B24_EFF_70",
        "activationWindow": "ON_LP_CHANGE",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 500
            }
          },
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Chuẩn độ chính xác: Gây 500 LP và rút 1 lá bài khi LP biến động."
      }
    ]
  },
  {
    "id": "card_b24_071_titr_potentiometric_glass_electrode_endpoint_sensor_71",
    "name": "Chuẩn Độ Điện Thế Bằng Điện Cực Thủy Tinh (Điểm Chuẩn 9)",
    "name_en": "Potentiometric Glass Electrode Endpoint Sensor (Endpoint Rank 9)",
    "cardType": "TRAP",
    "spellTrapSubtype": "NORMAL_TRAP",
    "spellSpeed": 2,
    "rarity": "COMMON",
    "attribute": "ELECTRO",
    "manaCost": 3,
    "chemicalFormula": "E_glass",
    "effectCode": "TRAP_B24_POTENTIOMETRIC_GLASS_ELECTRODE_ENDPOINT_SENSOR_TITR_71",
    "effectText": "[Bẫy Chuẩn Độ / Titration Trap - Spell Speed 2]: Kích hoạt khi điểm sinh mệnh của bất kỳ đấu thủ nào thay đổi: Gây chính xác 500 LP sát thương chuẩn lên đối thủ và rút 1 lá bài từ Bộ bài.",
    "scientificLore": "Kỹ thuật chuẩn độ hóa học định lượng Chuẩn Độ Điện Thế Bằng Điện Cực Thủy Tinh (Nernstian Potential Response to H⁺ Activity) xác định chính xác nồng độ tại điểm tương đương theo chuẩn thực nghiệm Hóa học GDPT 2018.",
    "relatedEquation": "Nernstian Potential Response to H⁺ Activity",
    "iupacName": "Potentiometric Glass Electrode Endpoint Sensor Assay",
    "archetype": "TITRATION_PRECISION",
    "structuredEffects": [
      {
        "effectId": "B24_EFF_71",
        "activationWindow": "ON_LP_CHANGE",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 500
            }
          },
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Chuẩn độ chính xác: Gây 500 LP và rút 1 lá bài khi LP biến động."
      }
    ]
  },
  {
    "id": "card_b24_072_titr_conductometric_ion_replacement_endpoint_barrier_72",
    "name": "Chuẩn Độ Độ Dẫn Điện Dung Dịch Muối (Điểm Chuẩn 9)",
    "name_en": "Conductometric Ion Replacement Endpoint Barrier (Endpoint Rank 9)",
    "cardType": "TRAP",
    "spellTrapSubtype": "NORMAL_TRAP",
    "spellSpeed": 2,
    "rarity": "COMMON",
    "attribute": "ELECTRO",
    "manaCost": 4,
    "chemicalFormula": "Conductivity κ",
    "effectCode": "TRAP_B24_CONDUCTOMETRIC_ION_REPLACEMENT_ENDPOINT_BARRIER_TITR_72",
    "effectText": "[Bẫy Chuẩn Độ / Titration Trap - Spell Speed 2]: Kích hoạt khi điểm sinh mệnh của bất kỳ đấu thủ nào thay đổi: Gây chính xác 500 LP sát thương chuẩn lên đối thủ và rút 1 lá bài từ Bộ bài.",
    "scientificLore": "Kỹ thuật chuẩn độ hóa học định lượng Chuẩn Độ Độ Dẫn Điện Dung Dịch Muối (Conductivity V-Shape Minimum at Equivalence Point) xác định chính xác nồng độ tại điểm tương đương theo chuẩn thực nghiệm Hóa học GDPT 2018.",
    "relatedEquation": "Conductivity V-Shape Minimum at Equivalence Point",
    "iupacName": "Conductometric Ion Replacement Endpoint Barrier Assay",
    "archetype": "ALKALINE_EARTH_BASTION",
    "structuredEffects": [
      {
        "effectId": "B24_EFF_72",
        "activationWindow": "ON_LP_CHANGE",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 500
            }
          },
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Chuẩn độ chính xác: Gây 500 LP và rút 1 lá bài khi LP biến động."
      }
    ]
  },
  {
    "id": "card_b24_073_titr_phenolphthalein_equivalence_point_trap_73",
    "name": "Chỉ Thị Màu Phenolphthalein Điểm Đổi Màu (Điểm Chuẩn 10)",
    "name_en": "Phenolphthalein Equivalence Point Trap (Endpoint Rank 10)",
    "cardType": "TRAP",
    "spellTrapSubtype": "NORMAL_TRAP",
    "spellSpeed": 2,
    "rarity": "RARE",
    "attribute": "AQUA",
    "manaCost": 1,
    "chemicalFormula": "C20H14O4",
    "effectCode": "TRAP_B24_PHENOLPHTHALEIN_EQUIVALENCE_POINT_TRAP_TITR_73",
    "effectText": "[Bẫy Chuẩn Độ / Titration Trap - Spell Speed 2]: Kích hoạt khi điểm sinh mệnh của bất kỳ đấu thủ nào thay đổi: Gây chính xác 500 LP sát thương chuẩn lên đối thủ và rút 1 lá bài từ Bộ bài.",
    "scientificLore": "Kỹ thuật chuẩn độ hóa học định lượng Chỉ Thị Màu Phenolphthalein Điểm Đổi Màu (Colorless pH < 8.2 → Pink/Magenta pH > 10.0) xác định chính xác nồng độ tại điểm tương đương theo chuẩn thực nghiệm Hóa học GDPT 2018.",
    "relatedEquation": "Colorless pH < 8.2 → Pink/Magenta pH > 10.0",
    "iupacName": "Phenolphthalein Equivalence Point Trap Assay",
    "archetype": "TITRATION_PRECISION",
    "structuredEffects": [
      {
        "effectId": "B24_EFF_73",
        "activationWindow": "ON_LP_CHANGE",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 500
            }
          },
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Chuẩn độ chính xác: Gây 500 LP và rút 1 lá bài khi LP biến động."
      }
    ]
  },
  {
    "id": "card_b24_074_titr_methyl_orange_acidic_endpoint_barrier_74",
    "name": "Chỉ Thị Màu Metyl Da Cam Vùng Axit (Điểm Chuẩn 10)",
    "name_en": "Methyl Orange Acidic Endpoint Barrier (Endpoint Rank 10)",
    "cardType": "TRAP",
    "spellTrapSubtype": "NORMAL_TRAP",
    "spellSpeed": 2,
    "rarity": "RARE",
    "attribute": "PYRO",
    "manaCost": 2,
    "chemicalFormula": "C14H14N3NaO3S",
    "effectCode": "TRAP_B24_METHYL_ORANGE_ACIDIC_ENDPOINT_BARRIER_TITR_74",
    "effectText": "[Bẫy Chuẩn Độ / Titration Trap - Spell Speed 2]: Kích hoạt khi điểm sinh mệnh của bất kỳ đấu thủ nào thay đổi: Gây chính xác 500 LP sát thương chuẩn lên đối thủ và rút 1 lá bài từ Bộ bài.",
    "scientificLore": "Kỹ thuật chuẩn độ hóa học định lượng Chỉ Thị Màu Metyl Da Cam Vùng Axit (Red pH < 3.1 → Yellow pH > 4.4) xác định chính xác nồng độ tại điểm tương đương theo chuẩn thực nghiệm Hóa học GDPT 2018.",
    "relatedEquation": "Red pH < 3.1 → Yellow pH > 4.4",
    "iupacName": "Methyl Orange Acidic Endpoint Barrier Assay",
    "archetype": "ALKALINE_EARTH_BASTION",
    "structuredEffects": [
      {
        "effectId": "B24_EFF_74",
        "activationWindow": "ON_LP_CHANGE",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 500
            }
          },
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Chuẩn độ chính xác: Gây 500 LP và rút 1 lá bài khi LP biến động."
      }
    ]
  },
  {
    "id": "card_b24_075_titr_mohr_silver_chromate_endpoint_trap_75",
    "name": "Chuẩn Độ Kết Tủa Phương Pháp Mohr (Điểm Chuẩn 10)",
    "name_en": "Mohr Silver Chromate Endpoint Trap (Endpoint Rank 10)",
    "cardType": "TRAP",
    "spellTrapSubtype": "NORMAL_TRAP",
    "spellSpeed": 2,
    "rarity": "SUPER_RARE",
    "attribute": "TERRA",
    "manaCost": 3,
    "chemicalFormula": "Ag2CrO4(red)",
    "effectCode": "TRAP_B24_MOHR_SILVER_CHROMATE_ENDPOINT_TRAP_TITR_75",
    "effectText": "[Bẫy Chuẩn Độ / Titration Trap - Spell Speed 2]: Kích hoạt khi điểm sinh mệnh của bất kỳ đấu thủ nào thay đổi: Gây chính xác 500 LP sát thương chuẩn lên đối thủ và rút 1 lá bài từ Bộ bài.",
    "scientificLore": "Kỹ thuật chuẩn độ hóa học định lượng Chuẩn Độ Kết Tủa Phương Pháp Mohr (2Ag⁺ + CrO₄²⁻ → Ag₂CrO₄(s)↓ (Brick Red Precipitate)) xác định chính xác nồng độ tại điểm tương đương theo chuẩn thực nghiệm Hóa học GDPT 2018.",
    "relatedEquation": "2Ag⁺ + CrO₄²⁻ → Ag₂CrO₄(s)↓ (Brick Red Precipitate)",
    "iupacName": "Mohr Silver Chromate Endpoint Trap Assay",
    "archetype": "TITRATION_PRECISION",
    "structuredEffects": [
      {
        "effectId": "B24_EFF_75",
        "activationWindow": "ON_LP_CHANGE",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 500
            }
          },
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Chuẩn độ chính xác: Gây 500 LP và rút 1 lá bài khi LP biến động."
      }
    ]
  },
  {
    "id": "card_b24_076_titr_permanganate_self_indicating_redox_endpoint_76",
    "name": "Chuẩn Độ Oxi Hóa Khử Permanganat (Điểm Chuẩn 10)",
    "name_en": "Permanganate Self-Indicating Redox Endpoint (Endpoint Rank 10)",
    "cardType": "TRAP",
    "spellTrapSubtype": "NORMAL_TRAP",
    "spellSpeed": 2,
    "rarity": "SUPER_RARE",
    "attribute": "ELECTRO",
    "manaCost": 4,
    "chemicalFormula": "KMnO4",
    "effectCode": "TRAP_B24_PERMANGANATE_SELF_INDICATING_REDOX_ENDPOINT_TITR_76",
    "effectText": "[Bẫy Chuẩn Độ / Titration Trap - Spell Speed 2]: Kích hoạt khi điểm sinh mệnh của bất kỳ đấu thủ nào thay đổi: Gây chính xác 500 LP sát thương chuẩn lên đối thủ và rút 1 lá bài từ Bộ bài.",
    "scientificLore": "Kỹ thuật chuẩn độ hóa học định lượng Chuẩn Độ Oxi Hóa Khử Permanganat (MnO₄⁻ + 8H⁺ + 5e⁻ → Mn²⁺ + 4H₂O (Purple to Colorless)) xác định chính xác nồng độ tại điểm tương đương theo chuẩn thực nghiệm Hóa học GDPT 2018.",
    "relatedEquation": "MnO₄⁻ + 8H⁺ + 5e⁻ → Mn²⁺ + 4H₂O (Purple to Colorless)",
    "iupacName": "Permanganate Self-Indicating Redox Endpoint Assay",
    "archetype": "ALKALINE_EARTH_BASTION",
    "structuredEffects": [
      {
        "effectId": "B24_EFF_76",
        "activationWindow": "ON_LP_CHANGE",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 500
            }
          },
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Chuẩn độ chính xác: Gây 500 LP và rút 1 lá bài khi LP biến động."
      }
    ]
  },
  {
    "id": "card_b24_077_titr_iodometric_starch_blue_complex_trap_77",
    "name": "Chuẩn Độ Iot Định Lượng Tinh Bột (Điểm Chuẩn 10)",
    "name_en": "Iodometric Starch Blue Complex Trap (Endpoint Rank 10)",
    "cardType": "TRAP",
    "spellTrapSubtype": "NORMAL_TRAP",
    "spellSpeed": 2,
    "rarity": "ULTRA_RARE",
    "attribute": "AQUA",
    "manaCost": 1,
    "chemicalFormula": "I2-Starch",
    "effectCode": "TRAP_B24_IODOMETRIC_STARCH_BLUE_COMPLEX_TRAP_TITR_77",
    "effectText": "[Bẫy Chuẩn Độ / Titration Trap - Spell Speed 2]: Kích hoạt khi điểm sinh mệnh của bất kỳ đấu thủ nào thay đổi: Gây chính xác 500 LP sát thương chuẩn lên đối thủ và rút 1 lá bài từ Bộ bài.",
    "scientificLore": "Kỹ thuật chuẩn độ hóa học định lượng Chuẩn Độ Iot Định Lượng Tinh Bột (I₂ + 2S₂O₃²⁻ → 2I⁻ + S₄O₆²⁻ (Blue Disappearance)) xác định chính xác nồng độ tại điểm tương đương theo chuẩn thực nghiệm Hóa học GDPT 2018.",
    "relatedEquation": "I₂ + 2S₂O₃²⁻ → 2I⁻ + S₄O₆²⁻ (Blue Disappearance)",
    "iupacName": "Iodometric Starch Blue Complex Trap Assay",
    "archetype": "TITRATION_PRECISION",
    "structuredEffects": [
      {
        "effectId": "B24_EFF_77",
        "activationWindow": "ON_LP_CHANGE",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 500
            }
          },
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Chuẩn độ chính xác: Gây 500 LP và rút 1 lá bài khi LP biến động."
      }
    ]
  },
  {
    "id": "card_b24_078_titr_titration_curve_sharp_equivalence_leap_78",
    "name": "Đường Cong Chuẩn Độ pH Bước Nhảy Vọt (Điểm Chuẩn 10)",
    "name_en": "Titration Curve Sharp Equivalence Leap (Endpoint Rank 10)",
    "cardType": "TRAP",
    "spellTrapSubtype": "NORMAL_TRAP",
    "spellSpeed": 2,
    "rarity": "SECRET_RARE",
    "attribute": "ACID_DARK",
    "manaCost": 2,
    "chemicalFormula": "dpH/dV_titrant",
    "effectCode": "TRAP_B24_TITRATION_CURVE_SHARP_EQUIVALENCE_LEAP_TITR_78",
    "effectText": "[Bẫy Chuẩn Độ / Titration Trap - Spell Speed 2]: Kích hoạt khi điểm sinh mệnh của bất kỳ đấu thủ nào thay đổi: Gây chính xác 500 LP sát thương chuẩn lên đối thủ và rút 1 lá bài từ Bộ bài.",
    "scientificLore": "Kỹ thuật chuẩn độ hóa học định lượng Đường Cong Chuẩn Độ pH Bước Nhảy Vọt (Maximum 1st Derivative Inflection Point at Equivalence) xác định chính xác nồng độ tại điểm tương đương theo chuẩn thực nghiệm Hóa học GDPT 2018.",
    "relatedEquation": "Maximum 1st Derivative Inflection Point at Equivalence",
    "iupacName": "Titration Curve Sharp Equivalence Leap Assay",
    "archetype": "ALKALINE_EARTH_BASTION",
    "structuredEffects": [
      {
        "effectId": "B24_EFF_78",
        "activationWindow": "ON_LP_CHANGE",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 500
            }
          },
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Chuẩn độ chính xác: Gây 500 LP và rút 1 lá bài khi LP biến động."
      }
    ]
  },
  {
    "id": "card_b24_079_titr_potentiometric_glass_electrode_endpoint_sensor_79",
    "name": "Chuẩn Độ Điện Thế Bằng Điện Cực Thủy Tinh (Điểm Chuẩn 10)",
    "name_en": "Potentiometric Glass Electrode Endpoint Sensor (Endpoint Rank 10)",
    "cardType": "TRAP",
    "spellTrapSubtype": "NORMAL_TRAP",
    "spellSpeed": 2,
    "rarity": "COMMON",
    "attribute": "ELECTRO",
    "manaCost": 3,
    "chemicalFormula": "E_glass",
    "effectCode": "TRAP_B24_POTENTIOMETRIC_GLASS_ELECTRODE_ENDPOINT_SENSOR_TITR_79",
    "effectText": "[Bẫy Chuẩn Độ / Titration Trap - Spell Speed 2]: Kích hoạt khi điểm sinh mệnh của bất kỳ đấu thủ nào thay đổi: Gây chính xác 500 LP sát thương chuẩn lên đối thủ và rút 1 lá bài từ Bộ bài.",
    "scientificLore": "Kỹ thuật chuẩn độ hóa học định lượng Chuẩn Độ Điện Thế Bằng Điện Cực Thủy Tinh (Nernstian Potential Response to H⁺ Activity) xác định chính xác nồng độ tại điểm tương đương theo chuẩn thực nghiệm Hóa học GDPT 2018.",
    "relatedEquation": "Nernstian Potential Response to H⁺ Activity",
    "iupacName": "Potentiometric Glass Electrode Endpoint Sensor Assay",
    "archetype": "TITRATION_PRECISION",
    "structuredEffects": [
      {
        "effectId": "B24_EFF_79",
        "activationWindow": "ON_LP_CHANGE",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 500
            }
          },
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Chuẩn độ chính xác: Gây 500 LP và rút 1 lá bài khi LP biến động."
      }
    ]
  },
  {
    "id": "card_b24_080_titr_conductometric_ion_replacement_endpoint_barrier_80",
    "name": "Chuẩn Độ Độ Dẫn Điện Dung Dịch Muối (Điểm Chuẩn 10)",
    "name_en": "Conductometric Ion Replacement Endpoint Barrier (Endpoint Rank 10)",
    "cardType": "TRAP",
    "spellTrapSubtype": "NORMAL_TRAP",
    "spellSpeed": 2,
    "rarity": "COMMON",
    "attribute": "ELECTRO",
    "manaCost": 4,
    "chemicalFormula": "Conductivity κ",
    "effectCode": "TRAP_B24_CONDUCTOMETRIC_ION_REPLACEMENT_ENDPOINT_BARRIER_TITR_80",
    "effectText": "[Bẫy Chuẩn Độ / Titration Trap - Spell Speed 2]: Kích hoạt khi điểm sinh mệnh của bất kỳ đấu thủ nào thay đổi: Gây chính xác 500 LP sát thương chuẩn lên đối thủ và rút 1 lá bài từ Bộ bài.",
    "scientificLore": "Kỹ thuật chuẩn độ hóa học định lượng Chuẩn Độ Độ Dẫn Điện Dung Dịch Muối (Conductivity V-Shape Minimum at Equivalence Point) xác định chính xác nồng độ tại điểm tương đương theo chuẩn thực nghiệm Hóa học GDPT 2018.",
    "relatedEquation": "Conductivity V-Shape Minimum at Equivalence Point",
    "iupacName": "Conductometric Ion Replacement Endpoint Barrier Assay",
    "archetype": "ALKALINE_EARTH_BASTION",
    "structuredEffects": [
      {
        "effectId": "B24_EFF_80",
        "activationWindow": "ON_LP_CHANGE",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 500
            }
          },
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Chuẩn độ chính xác: Gây 500 LP và rút 1 lá bài khi LP biến động."
      }
    ]
  }
];
