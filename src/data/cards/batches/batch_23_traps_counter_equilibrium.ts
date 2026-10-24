// src/data/cards/batches/batch_23_traps_counter_equilibrium.ts
// Batch 23: Counter Chemical Equilibrium Traps (100 cards)
// Automatically generated and validated for ELEMENTA Tactical TCG

import { PlayableCardDef } from '../../../domain/cardGameTypes';

export const BATCH_23_CARDS: PlayableCardDef[] = [
  {
    "id": "card_b23_001_counter_le_chatelier_counter_displacement_1",
    "name": "Phản Đòn Cân Bằng Động Le Chatelier (Cấp Độ Phản Kích 1)",
    "name_en": "Le Chatelier Counter Displacement (Counter Rank 1)",
    "cardType": "TRAP",
    "spellTrapSubtype": "COUNTER_TRAP",
    "spellSpeed": 3,
    "rarity": "RARE",
    "attribute": "NOBLE_VOID",
    "manaCost": 1,
    "chemicalFormula": "Kc Reversion",
    "effectCode": "TRAP_B23_LE_CHATELIER_COUNTER_DISPLACEMENT_CNTR_1",
    "effectText": "[Bẫy Phản Công / Counter Trap - Spell Speed 3]: Khi đối thủ kích hoạt một lá bài Phép, Bẫy hoặc hiệu ứng quái thú: Vô hiệu hóa kích hoạt đó và phá hủy lá bài của đối thủ!",
    "scientificLore": "Cơ chế triệt tiêu tức thời Phản Đòn Cân Bằng Động Le Chatelier (Instantaneous Shift Neutralizing External Disturbance) ngăn chặn phản ứng chuỗi ngay từ giai đoạn khởi đầu theo nguyên lý động học xúc tác GDPT 2018.",
    "relatedEquation": "Instantaneous Shift Neutralizing External Disturbance",
    "iupacName": "Le Chatelier Counter Displacement Protocol",
    "archetype": "LE_CHATELIER_EQUILIBRIUM",
    "structuredEffects": [
      {
        "effectId": "B23_EFF_1",
        "activationWindow": "QUICK",
        "operations": [
          {
            "op": "NEGATE_EFFECT",
            "params": {}
          },
          {
            "op": "DESTROY_CARD",
            "params": {
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Spell Speed 3: Vô hiệu hóa kích hoạt của đối thủ và phá hủy lá bài đó."
      }
    ]
  },
  {
    "id": "card_b23_002_counter_electrochemical_overpotential_counter_stop_2",
    "name": "Quá Thế Điện Cực Chặn Đứng Dòng Electron (Cấp Độ Phản Kích 1)",
    "name_en": "Electrochemical Overpotential Counter Stop (Counter Rank 1)",
    "cardType": "TRAP",
    "spellTrapSubtype": "COUNTER_TRAP",
    "spellSpeed": 3,
    "rarity": "SUPER_RARE",
    "attribute": "ELECTRO",
    "manaCost": 2,
    "chemicalFormula": "η Overpotential",
    "effectCode": "TRAP_B23_ELECTROCHEMICAL_OVERPOTENTIAL_COUNTER_STOP_CNTR_2",
    "effectText": "[Bẫy Phản Công / Counter Trap - Spell Speed 3]: Khi đối thủ kích hoạt một lá bài Phép, Bẫy hoặc hiệu ứng quái thú: Vô hiệu hóa kích hoạt đó và phá hủy lá bài của đối thủ!",
    "scientificLore": "Cơ chế triệt tiêu tức thời Quá Thế Điện Cực Chặn Đứng Dòng Electron (Kinetic Activation Overpotential Halting Electrolysis) ngăn chặn phản ứng chuỗi ngay từ giai đoạn khởi đầu theo nguyên lý động học xúc tác GDPT 2018.",
    "relatedEquation": "Kinetic Activation Overpotential Halting Electrolysis",
    "iupacName": "Electrochemical Overpotential Counter Stop Protocol",
    "archetype": "ELECTROCHEMICAL_CELL",
    "structuredEffects": [
      {
        "effectId": "B23_EFF_2",
        "activationWindow": "QUICK",
        "operations": [
          {
            "op": "NEGATE_EFFECT",
            "params": {}
          },
          {
            "op": "DESTROY_CARD",
            "params": {
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Spell Speed 3: Vô hiệu hóa kích hoạt của đối thủ và phá hủy lá bài đó."
      }
    ]
  },
  {
    "id": "card_b23_003_counter_catalyst_poison_irreversible_inhibition_3",
    "name": "Chất Độc Xúc Tác Vô Hiệu Trung Tâm Hoạt Hóa (Cấp Độ Phản Kích 1)",
    "name_en": "Catalyst Poison Irreversible Inhibition (Counter Rank 1)",
    "cardType": "TRAP",
    "spellTrapSubtype": "COUNTER_TRAP",
    "spellSpeed": 3,
    "rarity": "SUPER_RARE",
    "attribute": "ACID_DARK",
    "manaCost": 3,
    "chemicalFormula": "CO/H2S Poison",
    "effectCode": "TRAP_B23_CATALYST_POISON_IRREVERSIBLE_INHIBITION_CNTR_3",
    "effectText": "[Bẫy Phản Công / Counter Trap - Spell Speed 3]: Khi đối thủ kích hoạt một lá bài Phép, Bẫy hoặc hiệu ứng quái thú: Vô hiệu hóa kích hoạt đó và phá hủy lá bài của đối thủ!",
    "scientificLore": "Cơ chế triệt tiêu tức thời Chất Độc Xúc Tác Vô Hiệu Trung Tâm Hoạt Hóa (Irreversible Chemisorption Blocking Active Catalyst Sites) ngăn chặn phản ứng chuỗi ngay từ giai đoạn khởi đầu theo nguyên lý động học xúc tác GDPT 2018.",
    "relatedEquation": "Irreversible Chemisorption Blocking Active Catalyst Sites",
    "iupacName": "Catalyst Poison Irreversible Inhibition Protocol",
    "archetype": "LE_CHATELIER_EQUILIBRIUM",
    "structuredEffects": [
      {
        "effectId": "B23_EFF_3",
        "activationWindow": "QUICK",
        "operations": [
          {
            "op": "NEGATE_EFFECT",
            "params": {}
          },
          {
            "op": "DESTROY_CARD",
            "params": {
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Spell Speed 3: Vô hiệu hóa kích hoạt của đối thủ và phá hủy lá bài đó."
      }
    ]
  },
  {
    "id": "card_b23_004_counter_chelation_metal_ion_quench_counter_4",
    "name": "Bẫy Triệt Tiêu Hiệu Ứng Bằng Phức Chelate (Cấp Độ Phản Kích 1)",
    "name_en": "Chelation Metal Ion Quench Counter (Counter Rank 1)",
    "cardType": "TRAP",
    "spellTrapSubtype": "COUNTER_TRAP",
    "spellSpeed": 3,
    "rarity": "ULTRA_RARE",
    "attribute": "AQUA",
    "manaCost": 4,
    "chemicalFormula": "EDTA Binding",
    "effectCode": "TRAP_B23_CHELATION_METAL_ION_QUENCH_COUNTER_CNTR_4",
    "effectText": "[Bẫy Phản Công / Counter Trap - Spell Speed 3]: Khi đối thủ kích hoạt một lá bài Phép, Bẫy hoặc hiệu ứng quái thú: Vô hiệu hóa kích hoạt đó và phá hủy lá bài của đối thủ!",
    "scientificLore": "Cơ chế triệt tiêu tức thời Bẫy Triệt Tiêu Hiệu Ứng Bằng Phức Chelate (Thermodynamic Chelate Effect ΔS > 0 Formation) ngăn chặn phản ứng chuỗi ngay từ giai đoạn khởi đầu theo nguyên lý động học xúc tác GDPT 2018.",
    "relatedEquation": "Thermodynamic Chelate Effect ΔS > 0 Formation",
    "iupacName": "Chelation Metal Ion Quench Counter Protocol",
    "archetype": "ELECTROCHEMICAL_CELL",
    "structuredEffects": [
      {
        "effectId": "B23_EFF_4",
        "activationWindow": "QUICK",
        "operations": [
          {
            "op": "NEGATE_EFFECT",
            "params": {}
          },
          {
            "op": "DESTROY_CARD",
            "params": {
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Spell Speed 3: Vô hiệu hóa kích hoạt của đối thủ và phá hủy lá bài đó."
      }
    ]
  },
  {
    "id": "card_b23_005_counter_universal_buffer_proton_quench_5",
    "name": "Bẫy Đệm Chống Đột Biến Proton pH (Cấp Độ Phản Kích 1)",
    "name_en": "Universal Buffer Proton Quench (Counter Rank 1)",
    "cardType": "TRAP",
    "spellTrapSubtype": "COUNTER_TRAP",
    "spellSpeed": 3,
    "rarity": "SECRET_RARE",
    "attribute": "AQUA",
    "manaCost": 1,
    "chemicalFormula": "Buffer Capacity",
    "effectCode": "TRAP_B23_UNIVERSAL_BUFFER_PROTON_QUENCH_CNTR_5",
    "effectText": "[Bẫy Phản Công / Counter Trap - Spell Speed 3]: Khi đối thủ kích hoạt một lá bài Phép, Bẫy hoặc hiệu ứng quái thú: Vô hiệu hóa kích hoạt đó và phá hủy lá bài của đối thủ!",
    "scientificLore": "Cơ chế triệt tiêu tức thời Bẫy Đệm Chống Đột Biến Proton pH (Henderson-Hasselbalch Equation pH Homeostasis) ngăn chặn phản ứng chuỗi ngay từ giai đoạn khởi đầu theo nguyên lý động học xúc tác GDPT 2018.",
    "relatedEquation": "Henderson-Hasselbalch Equation pH Homeostasis",
    "iupacName": "Universal Buffer Proton Quench Protocol",
    "archetype": "LE_CHATELIER_EQUILIBRIUM",
    "structuredEffects": [
      {
        "effectId": "B23_EFF_5",
        "activationWindow": "QUICK",
        "operations": [
          {
            "op": "NEGATE_EFFECT",
            "params": {}
          },
          {
            "op": "DESTROY_CARD",
            "params": {
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Spell Speed 3: Vô hiệu hóa kích hoạt của đối thủ và phá hủy lá bài đó."
      }
    ]
  },
  {
    "id": "card_b23_006_counter_free_radical_scavenger_chain_terminator_6",
    "name": "Bẫy Khử Gốc Tự Do Bằng Chất Chống Oxi Hóa (Cấp Độ Phản Kích 1)",
    "name_en": "Free Radical Scavenger Chain Terminator (Counter Rank 1)",
    "cardType": "TRAP",
    "spellTrapSubtype": "COUNTER_TRAP",
    "spellSpeed": 3,
    "rarity": "COMMON",
    "attribute": "TERRA",
    "manaCost": 2,
    "chemicalFormula": "Antioxidant",
    "effectCode": "TRAP_B23_FREE_RADICAL_SCAVENGER_CHAIN_TERMINATOR_CNTR_6",
    "effectText": "[Bẫy Phản Công / Counter Trap - Spell Speed 3]: Khi đối thủ kích hoạt một lá bài Phép, Bẫy hoặc hiệu ứng quái thú: Vô hiệu hóa kích hoạt đó và phá hủy lá bài của đối thủ!",
    "scientificLore": "Cơ chế triệt tiêu tức thời Bẫy Khử Gốc Tự Do Bằng Chất Chống Oxi Hóa (R· + Inh-H → RH + Inh· (Stable Inactive Radical)) ngăn chặn phản ứng chuỗi ngay từ giai đoạn khởi đầu theo nguyên lý động học xúc tác GDPT 2018.",
    "relatedEquation": "R· + Inh-H → RH + Inh· (Stable Inactive Radical)",
    "iupacName": "Free Radical Scavenger Chain Terminator Protocol",
    "archetype": "ELECTROCHEMICAL_CELL",
    "structuredEffects": [
      {
        "effectId": "B23_EFF_6",
        "activationWindow": "QUICK",
        "operations": [
          {
            "op": "NEGATE_EFFECT",
            "params": {}
          },
          {
            "op": "DESTROY_CARD",
            "params": {
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Spell Speed 3: Vô hiệu hóa kích hoạt của đối thủ và phá hủy lá bài đó."
      }
    ]
  },
  {
    "id": "card_b23_007_counter_reverse_polar_electro_quench_counter_7",
    "name": "Bẫy Kháng Điện Áp Ngược Pin Galvanic (Cấp Độ Phản Kích 1)",
    "name_en": "Reverse Polar Electro-Quench Counter (Counter Rank 1)",
    "cardType": "TRAP",
    "spellTrapSubtype": "COUNTER_TRAP",
    "spellSpeed": 3,
    "rarity": "COMMON",
    "attribute": "ELECTRO",
    "manaCost": 3,
    "chemicalFormula": "Back-EMF",
    "effectCode": "TRAP_B23_REVERSE_POLAR_ELECTRO_QUENCH_COUNTER_CNTR_7",
    "effectText": "[Bẫy Phản Công / Counter Trap - Spell Speed 3]: Khi đối thủ kích hoạt một lá bài Phép, Bẫy hoặc hiệu ứng quái thú: Vô hiệu hóa kích hoạt đó và phá hủy lá bài của đối thủ!",
    "scientificLore": "Cơ chế triệt tiêu tức thời Bẫy Kháng Điện Áp Ngược Pin Galvanic (External Opposing Voltage Exceeding Cell Potential E_cell) ngăn chặn phản ứng chuỗi ngay từ giai đoạn khởi đầu theo nguyên lý động học xúc tác GDPT 2018.",
    "relatedEquation": "External Opposing Voltage Exceeding Cell Potential E_cell",
    "iupacName": "Reverse Polar Electro-Quench Counter Protocol",
    "archetype": "LE_CHATELIER_EQUILIBRIUM",
    "structuredEffects": [
      {
        "effectId": "B23_EFF_7",
        "activationWindow": "QUICK",
        "operations": [
          {
            "op": "NEGATE_EFFECT",
            "params": {}
          },
          {
            "op": "DESTROY_CARD",
            "params": {
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Spell Speed 3: Vô hiệu hóa kích hoạt của đối thủ và phá hủy lá bài đó."
      }
    ]
  },
  {
    "id": "card_b23_008_counter_nucleation_inhibitor_crystal_shatter_8",
    "name": "Bẫy Triệt Phá Tinh Thể Bằng Chất Ức Chế Mầm (Cấp Độ Phản Kích 1)",
    "name_en": "Nucleation Inhibitor Crystal Shatter (Counter Rank 1)",
    "cardType": "TRAP",
    "spellTrapSubtype": "COUNTER_TRAP",
    "spellSpeed": 3,
    "rarity": "COMMON",
    "attribute": "NOBLE_VOID",
    "manaCost": 4,
    "chemicalFormula": "Polyphosphate",
    "effectCode": "TRAP_B23_NUCLEATION_INHIBITOR_CRYSTAL_SHATTER_CNTR_8",
    "effectText": "[Bẫy Phản Công / Counter Trap - Spell Speed 3]: Khi đối thủ kích hoạt một lá bài Phép, Bẫy hoặc hiệu ứng quái thú: Vô hiệu hóa kích hoạt đó và phá hủy lá bài của đối thủ!",
    "scientificLore": "Cơ chế triệt tiêu tức thời Bẫy Triệt Phá Tinh Thể Bằng Chất Ức Chế Mầm (Sub-Stoichiometric Threshold Scale Inhibition) ngăn chặn phản ứng chuỗi ngay từ giai đoạn khởi đầu theo nguyên lý động học xúc tác GDPT 2018.",
    "relatedEquation": "Sub-Stoichiometric Threshold Scale Inhibition",
    "iupacName": "Nucleation Inhibitor Crystal Shatter Protocol",
    "archetype": "ELECTROCHEMICAL_CELL",
    "structuredEffects": [
      {
        "effectId": "B23_EFF_8",
        "activationWindow": "QUICK",
        "operations": [
          {
            "op": "NEGATE_EFFECT",
            "params": {}
          },
          {
            "op": "DESTROY_CARD",
            "params": {
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Spell Speed 3: Vô hiệu hóa kích hoạt của đối thủ và phá hủy lá bài đó."
      }
    ]
  },
  {
    "id": "card_b23_009_counter_le_chatelier_counter_displacement_9",
    "name": "Phản Đòn Cân Bằng Động Le Chatelier (Cấp Độ Phản Kích 2)",
    "name_en": "Le Chatelier Counter Displacement (Counter Rank 2)",
    "cardType": "TRAP",
    "spellTrapSubtype": "COUNTER_TRAP",
    "spellSpeed": 3,
    "rarity": "RARE",
    "attribute": "NOBLE_VOID",
    "manaCost": 1,
    "chemicalFormula": "Kc Reversion",
    "effectCode": "TRAP_B23_LE_CHATELIER_COUNTER_DISPLACEMENT_CNTR_9",
    "effectText": "[Bẫy Phản Công / Counter Trap - Spell Speed 3]: Khi đối thủ kích hoạt một lá bài Phép, Bẫy hoặc hiệu ứng quái thú: Vô hiệu hóa kích hoạt đó và phá hủy lá bài của đối thủ!",
    "scientificLore": "Cơ chế triệt tiêu tức thời Phản Đòn Cân Bằng Động Le Chatelier (Instantaneous Shift Neutralizing External Disturbance) ngăn chặn phản ứng chuỗi ngay từ giai đoạn khởi đầu theo nguyên lý động học xúc tác GDPT 2018.",
    "relatedEquation": "Instantaneous Shift Neutralizing External Disturbance",
    "iupacName": "Le Chatelier Counter Displacement Protocol",
    "archetype": "LE_CHATELIER_EQUILIBRIUM",
    "structuredEffects": [
      {
        "effectId": "B23_EFF_9",
        "activationWindow": "QUICK",
        "operations": [
          {
            "op": "NEGATE_EFFECT",
            "params": {}
          },
          {
            "op": "DESTROY_CARD",
            "params": {
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Spell Speed 3: Vô hiệu hóa kích hoạt của đối thủ và phá hủy lá bài đó."
      }
    ]
  },
  {
    "id": "card_b23_010_counter_electrochemical_overpotential_counter_stop_10",
    "name": "Quá Thế Điện Cực Chặn Đứng Dòng Electron (Cấp Độ Phản Kích 2)",
    "name_en": "Electrochemical Overpotential Counter Stop (Counter Rank 2)",
    "cardType": "TRAP",
    "spellTrapSubtype": "COUNTER_TRAP",
    "spellSpeed": 3,
    "rarity": "RARE",
    "attribute": "ELECTRO",
    "manaCost": 2,
    "chemicalFormula": "η Overpotential",
    "effectCode": "TRAP_B23_ELECTROCHEMICAL_OVERPOTENTIAL_COUNTER_STOP_CNTR_10",
    "effectText": "[Bẫy Phản Công / Counter Trap - Spell Speed 3]: Khi đối thủ kích hoạt một lá bài Phép, Bẫy hoặc hiệu ứng quái thú: Vô hiệu hóa kích hoạt đó và phá hủy lá bài của đối thủ!",
    "scientificLore": "Cơ chế triệt tiêu tức thời Quá Thế Điện Cực Chặn Đứng Dòng Electron (Kinetic Activation Overpotential Halting Electrolysis) ngăn chặn phản ứng chuỗi ngay từ giai đoạn khởi đầu theo nguyên lý động học xúc tác GDPT 2018.",
    "relatedEquation": "Kinetic Activation Overpotential Halting Electrolysis",
    "iupacName": "Electrochemical Overpotential Counter Stop Protocol",
    "archetype": "ELECTROCHEMICAL_CELL",
    "structuredEffects": [
      {
        "effectId": "B23_EFF_10",
        "activationWindow": "QUICK",
        "operations": [
          {
            "op": "NEGATE_EFFECT",
            "params": {}
          },
          {
            "op": "DESTROY_CARD",
            "params": {
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Spell Speed 3: Vô hiệu hóa kích hoạt của đối thủ và phá hủy lá bài đó."
      }
    ]
  },
  {
    "id": "card_b23_011_counter_catalyst_poison_irreversible_inhibition_11",
    "name": "Chất Độc Xúc Tác Vô Hiệu Trung Tâm Hoạt Hóa (Cấp Độ Phản Kích 2)",
    "name_en": "Catalyst Poison Irreversible Inhibition (Counter Rank 2)",
    "cardType": "TRAP",
    "spellTrapSubtype": "COUNTER_TRAP",
    "spellSpeed": 3,
    "rarity": "SUPER_RARE",
    "attribute": "ACID_DARK",
    "manaCost": 3,
    "chemicalFormula": "CO/H2S Poison",
    "effectCode": "TRAP_B23_CATALYST_POISON_IRREVERSIBLE_INHIBITION_CNTR_11",
    "effectText": "[Bẫy Phản Công / Counter Trap - Spell Speed 3]: Khi đối thủ kích hoạt một lá bài Phép, Bẫy hoặc hiệu ứng quái thú: Vô hiệu hóa kích hoạt đó và phá hủy lá bài của đối thủ!",
    "scientificLore": "Cơ chế triệt tiêu tức thời Chất Độc Xúc Tác Vô Hiệu Trung Tâm Hoạt Hóa (Irreversible Chemisorption Blocking Active Catalyst Sites) ngăn chặn phản ứng chuỗi ngay từ giai đoạn khởi đầu theo nguyên lý động học xúc tác GDPT 2018.",
    "relatedEquation": "Irreversible Chemisorption Blocking Active Catalyst Sites",
    "iupacName": "Catalyst Poison Irreversible Inhibition Protocol",
    "archetype": "LE_CHATELIER_EQUILIBRIUM",
    "structuredEffects": [
      {
        "effectId": "B23_EFF_11",
        "activationWindow": "QUICK",
        "operations": [
          {
            "op": "NEGATE_EFFECT",
            "params": {}
          },
          {
            "op": "DESTROY_CARD",
            "params": {
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Spell Speed 3: Vô hiệu hóa kích hoạt của đối thủ và phá hủy lá bài đó."
      }
    ]
  },
  {
    "id": "card_b23_012_counter_chelation_metal_ion_quench_counter_12",
    "name": "Bẫy Triệt Tiêu Hiệu Ứng Bằng Phức Chelate (Cấp Độ Phản Kích 2)",
    "name_en": "Chelation Metal Ion Quench Counter (Counter Rank 2)",
    "cardType": "TRAP",
    "spellTrapSubtype": "COUNTER_TRAP",
    "spellSpeed": 3,
    "rarity": "SUPER_RARE",
    "attribute": "AQUA",
    "manaCost": 4,
    "chemicalFormula": "EDTA Binding",
    "effectCode": "TRAP_B23_CHELATION_METAL_ION_QUENCH_COUNTER_CNTR_12",
    "effectText": "[Bẫy Phản Công / Counter Trap - Spell Speed 3]: Khi đối thủ kích hoạt một lá bài Phép, Bẫy hoặc hiệu ứng quái thú: Vô hiệu hóa kích hoạt đó và phá hủy lá bài của đối thủ!",
    "scientificLore": "Cơ chế triệt tiêu tức thời Bẫy Triệt Tiêu Hiệu Ứng Bằng Phức Chelate (Thermodynamic Chelate Effect ΔS > 0 Formation) ngăn chặn phản ứng chuỗi ngay từ giai đoạn khởi đầu theo nguyên lý động học xúc tác GDPT 2018.",
    "relatedEquation": "Thermodynamic Chelate Effect ΔS > 0 Formation",
    "iupacName": "Chelation Metal Ion Quench Counter Protocol",
    "archetype": "ELECTROCHEMICAL_CELL",
    "structuredEffects": [
      {
        "effectId": "B23_EFF_12",
        "activationWindow": "QUICK",
        "operations": [
          {
            "op": "NEGATE_EFFECT",
            "params": {}
          },
          {
            "op": "DESTROY_CARD",
            "params": {
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Spell Speed 3: Vô hiệu hóa kích hoạt của đối thủ và phá hủy lá bài đó."
      }
    ]
  },
  {
    "id": "card_b23_013_counter_universal_buffer_proton_quench_13",
    "name": "Bẫy Đệm Chống Đột Biến Proton pH (Cấp Độ Phản Kích 2)",
    "name_en": "Universal Buffer Proton Quench (Counter Rank 2)",
    "cardType": "TRAP",
    "spellTrapSubtype": "COUNTER_TRAP",
    "spellSpeed": 3,
    "rarity": "ULTRA_RARE",
    "attribute": "AQUA",
    "manaCost": 1,
    "chemicalFormula": "Buffer Capacity",
    "effectCode": "TRAP_B23_UNIVERSAL_BUFFER_PROTON_QUENCH_CNTR_13",
    "effectText": "[Bẫy Phản Công / Counter Trap - Spell Speed 3]: Khi đối thủ kích hoạt một lá bài Phép, Bẫy hoặc hiệu ứng quái thú: Vô hiệu hóa kích hoạt đó và phá hủy lá bài của đối thủ!",
    "scientificLore": "Cơ chế triệt tiêu tức thời Bẫy Đệm Chống Đột Biến Proton pH (Henderson-Hasselbalch Equation pH Homeostasis) ngăn chặn phản ứng chuỗi ngay từ giai đoạn khởi đầu theo nguyên lý động học xúc tác GDPT 2018.",
    "relatedEquation": "Henderson-Hasselbalch Equation pH Homeostasis",
    "iupacName": "Universal Buffer Proton Quench Protocol",
    "archetype": "LE_CHATELIER_EQUILIBRIUM",
    "structuredEffects": [
      {
        "effectId": "B23_EFF_13",
        "activationWindow": "QUICK",
        "operations": [
          {
            "op": "NEGATE_EFFECT",
            "params": {}
          },
          {
            "op": "DESTROY_CARD",
            "params": {
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Spell Speed 3: Vô hiệu hóa kích hoạt của đối thủ và phá hủy lá bài đó."
      }
    ]
  },
  {
    "id": "card_b23_014_counter_free_radical_scavenger_chain_terminator_14",
    "name": "Bẫy Khử Gốc Tự Do Bằng Chất Chống Oxi Hóa (Cấp Độ Phản Kích 2)",
    "name_en": "Free Radical Scavenger Chain Terminator (Counter Rank 2)",
    "cardType": "TRAP",
    "spellTrapSubtype": "COUNTER_TRAP",
    "spellSpeed": 3,
    "rarity": "SECRET_RARE",
    "attribute": "TERRA",
    "manaCost": 2,
    "chemicalFormula": "Antioxidant",
    "effectCode": "TRAP_B23_FREE_RADICAL_SCAVENGER_CHAIN_TERMINATOR_CNTR_14",
    "effectText": "[Bẫy Phản Công / Counter Trap - Spell Speed 3]: Khi đối thủ kích hoạt một lá bài Phép, Bẫy hoặc hiệu ứng quái thú: Vô hiệu hóa kích hoạt đó và phá hủy lá bài của đối thủ!",
    "scientificLore": "Cơ chế triệt tiêu tức thời Bẫy Khử Gốc Tự Do Bằng Chất Chống Oxi Hóa (R· + Inh-H → RH + Inh· (Stable Inactive Radical)) ngăn chặn phản ứng chuỗi ngay từ giai đoạn khởi đầu theo nguyên lý động học xúc tác GDPT 2018.",
    "relatedEquation": "R· + Inh-H → RH + Inh· (Stable Inactive Radical)",
    "iupacName": "Free Radical Scavenger Chain Terminator Protocol",
    "archetype": "ELECTROCHEMICAL_CELL",
    "structuredEffects": [
      {
        "effectId": "B23_EFF_14",
        "activationWindow": "QUICK",
        "operations": [
          {
            "op": "NEGATE_EFFECT",
            "params": {}
          },
          {
            "op": "DESTROY_CARD",
            "params": {
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Spell Speed 3: Vô hiệu hóa kích hoạt của đối thủ và phá hủy lá bài đó."
      }
    ]
  },
  {
    "id": "card_b23_015_counter_reverse_polar_electro_quench_counter_15",
    "name": "Bẫy Kháng Điện Áp Ngược Pin Galvanic (Cấp Độ Phản Kích 2)",
    "name_en": "Reverse Polar Electro-Quench Counter (Counter Rank 2)",
    "cardType": "TRAP",
    "spellTrapSubtype": "COUNTER_TRAP",
    "spellSpeed": 3,
    "rarity": "COMMON",
    "attribute": "ELECTRO",
    "manaCost": 3,
    "chemicalFormula": "Back-EMF",
    "effectCode": "TRAP_B23_REVERSE_POLAR_ELECTRO_QUENCH_COUNTER_CNTR_15",
    "effectText": "[Bẫy Phản Công / Counter Trap - Spell Speed 3]: Khi đối thủ kích hoạt một lá bài Phép, Bẫy hoặc hiệu ứng quái thú: Vô hiệu hóa kích hoạt đó và phá hủy lá bài của đối thủ!",
    "scientificLore": "Cơ chế triệt tiêu tức thời Bẫy Kháng Điện Áp Ngược Pin Galvanic (External Opposing Voltage Exceeding Cell Potential E_cell) ngăn chặn phản ứng chuỗi ngay từ giai đoạn khởi đầu theo nguyên lý động học xúc tác GDPT 2018.",
    "relatedEquation": "External Opposing Voltage Exceeding Cell Potential E_cell",
    "iupacName": "Reverse Polar Electro-Quench Counter Protocol",
    "archetype": "LE_CHATELIER_EQUILIBRIUM",
    "structuredEffects": [
      {
        "effectId": "B23_EFF_15",
        "activationWindow": "QUICK",
        "operations": [
          {
            "op": "NEGATE_EFFECT",
            "params": {}
          },
          {
            "op": "DESTROY_CARD",
            "params": {
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Spell Speed 3: Vô hiệu hóa kích hoạt của đối thủ và phá hủy lá bài đó."
      }
    ]
  },
  {
    "id": "card_b23_016_counter_nucleation_inhibitor_crystal_shatter_16",
    "name": "Bẫy Triệt Phá Tinh Thể Bằng Chất Ức Chế Mầm (Cấp Độ Phản Kích 2)",
    "name_en": "Nucleation Inhibitor Crystal Shatter (Counter Rank 2)",
    "cardType": "TRAP",
    "spellTrapSubtype": "COUNTER_TRAP",
    "spellSpeed": 3,
    "rarity": "COMMON",
    "attribute": "NOBLE_VOID",
    "manaCost": 4,
    "chemicalFormula": "Polyphosphate",
    "effectCode": "TRAP_B23_NUCLEATION_INHIBITOR_CRYSTAL_SHATTER_CNTR_16",
    "effectText": "[Bẫy Phản Công / Counter Trap - Spell Speed 3]: Khi đối thủ kích hoạt một lá bài Phép, Bẫy hoặc hiệu ứng quái thú: Vô hiệu hóa kích hoạt đó và phá hủy lá bài của đối thủ!",
    "scientificLore": "Cơ chế triệt tiêu tức thời Bẫy Triệt Phá Tinh Thể Bằng Chất Ức Chế Mầm (Sub-Stoichiometric Threshold Scale Inhibition) ngăn chặn phản ứng chuỗi ngay từ giai đoạn khởi đầu theo nguyên lý động học xúc tác GDPT 2018.",
    "relatedEquation": "Sub-Stoichiometric Threshold Scale Inhibition",
    "iupacName": "Nucleation Inhibitor Crystal Shatter Protocol",
    "archetype": "ELECTROCHEMICAL_CELL",
    "structuredEffects": [
      {
        "effectId": "B23_EFF_16",
        "activationWindow": "QUICK",
        "operations": [
          {
            "op": "NEGATE_EFFECT",
            "params": {}
          },
          {
            "op": "DESTROY_CARD",
            "params": {
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Spell Speed 3: Vô hiệu hóa kích hoạt của đối thủ và phá hủy lá bài đó."
      }
    ]
  },
  {
    "id": "card_b23_017_counter_le_chatelier_counter_displacement_17",
    "name": "Phản Đòn Cân Bằng Động Le Chatelier (Cấp Độ Phản Kích 3)",
    "name_en": "Le Chatelier Counter Displacement (Counter Rank 3)",
    "cardType": "TRAP",
    "spellTrapSubtype": "COUNTER_TRAP",
    "spellSpeed": 3,
    "rarity": "COMMON",
    "attribute": "NOBLE_VOID",
    "manaCost": 1,
    "chemicalFormula": "Kc Reversion",
    "effectCode": "TRAP_B23_LE_CHATELIER_COUNTER_DISPLACEMENT_CNTR_17",
    "effectText": "[Bẫy Phản Công / Counter Trap - Spell Speed 3]: Khi đối thủ kích hoạt một lá bài Phép, Bẫy hoặc hiệu ứng quái thú: Vô hiệu hóa kích hoạt đó và phá hủy lá bài của đối thủ!",
    "scientificLore": "Cơ chế triệt tiêu tức thời Phản Đòn Cân Bằng Động Le Chatelier (Instantaneous Shift Neutralizing External Disturbance) ngăn chặn phản ứng chuỗi ngay từ giai đoạn khởi đầu theo nguyên lý động học xúc tác GDPT 2018.",
    "relatedEquation": "Instantaneous Shift Neutralizing External Disturbance",
    "iupacName": "Le Chatelier Counter Displacement Protocol",
    "archetype": "LE_CHATELIER_EQUILIBRIUM",
    "structuredEffects": [
      {
        "effectId": "B23_EFF_17",
        "activationWindow": "QUICK",
        "operations": [
          {
            "op": "NEGATE_EFFECT",
            "params": {}
          },
          {
            "op": "DESTROY_CARD",
            "params": {
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Spell Speed 3: Vô hiệu hóa kích hoạt của đối thủ và phá hủy lá bài đó."
      }
    ]
  },
  {
    "id": "card_b23_018_counter_electrochemical_overpotential_counter_stop_18",
    "name": "Quá Thế Điện Cực Chặn Đứng Dòng Electron (Cấp Độ Phản Kích 3)",
    "name_en": "Electrochemical Overpotential Counter Stop (Counter Rank 3)",
    "cardType": "TRAP",
    "spellTrapSubtype": "COUNTER_TRAP",
    "spellSpeed": 3,
    "rarity": "RARE",
    "attribute": "ELECTRO",
    "manaCost": 2,
    "chemicalFormula": "η Overpotential",
    "effectCode": "TRAP_B23_ELECTROCHEMICAL_OVERPOTENTIAL_COUNTER_STOP_CNTR_18",
    "effectText": "[Bẫy Phản Công / Counter Trap - Spell Speed 3]: Khi đối thủ kích hoạt một lá bài Phép, Bẫy hoặc hiệu ứng quái thú: Vô hiệu hóa kích hoạt đó và phá hủy lá bài của đối thủ!",
    "scientificLore": "Cơ chế triệt tiêu tức thời Quá Thế Điện Cực Chặn Đứng Dòng Electron (Kinetic Activation Overpotential Halting Electrolysis) ngăn chặn phản ứng chuỗi ngay từ giai đoạn khởi đầu theo nguyên lý động học xúc tác GDPT 2018.",
    "relatedEquation": "Kinetic Activation Overpotential Halting Electrolysis",
    "iupacName": "Electrochemical Overpotential Counter Stop Protocol",
    "archetype": "ELECTROCHEMICAL_CELL",
    "structuredEffects": [
      {
        "effectId": "B23_EFF_18",
        "activationWindow": "QUICK",
        "operations": [
          {
            "op": "NEGATE_EFFECT",
            "params": {}
          },
          {
            "op": "DESTROY_CARD",
            "params": {
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Spell Speed 3: Vô hiệu hóa kích hoạt của đối thủ và phá hủy lá bài đó."
      }
    ]
  },
  {
    "id": "card_b23_019_counter_catalyst_poison_irreversible_inhibition_19",
    "name": "Chất Độc Xúc Tác Vô Hiệu Trung Tâm Hoạt Hóa (Cấp Độ Phản Kích 3)",
    "name_en": "Catalyst Poison Irreversible Inhibition (Counter Rank 3)",
    "cardType": "TRAP",
    "spellTrapSubtype": "COUNTER_TRAP",
    "spellSpeed": 3,
    "rarity": "RARE",
    "attribute": "ACID_DARK",
    "manaCost": 3,
    "chemicalFormula": "CO/H2S Poison",
    "effectCode": "TRAP_B23_CATALYST_POISON_IRREVERSIBLE_INHIBITION_CNTR_19",
    "effectText": "[Bẫy Phản Công / Counter Trap - Spell Speed 3]: Khi đối thủ kích hoạt một lá bài Phép, Bẫy hoặc hiệu ứng quái thú: Vô hiệu hóa kích hoạt đó và phá hủy lá bài của đối thủ!",
    "scientificLore": "Cơ chế triệt tiêu tức thời Chất Độc Xúc Tác Vô Hiệu Trung Tâm Hoạt Hóa (Irreversible Chemisorption Blocking Active Catalyst Sites) ngăn chặn phản ứng chuỗi ngay từ giai đoạn khởi đầu theo nguyên lý động học xúc tác GDPT 2018.",
    "relatedEquation": "Irreversible Chemisorption Blocking Active Catalyst Sites",
    "iupacName": "Catalyst Poison Irreversible Inhibition Protocol",
    "archetype": "LE_CHATELIER_EQUILIBRIUM",
    "structuredEffects": [
      {
        "effectId": "B23_EFF_19",
        "activationWindow": "QUICK",
        "operations": [
          {
            "op": "NEGATE_EFFECT",
            "params": {}
          },
          {
            "op": "DESTROY_CARD",
            "params": {
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Spell Speed 3: Vô hiệu hóa kích hoạt của đối thủ và phá hủy lá bài đó."
      }
    ]
  },
  {
    "id": "card_b23_020_counter_chelation_metal_ion_quench_counter_20",
    "name": "Bẫy Triệt Tiêu Hiệu Ứng Bằng Phức Chelate (Cấp Độ Phản Kích 3)",
    "name_en": "Chelation Metal Ion Quench Counter (Counter Rank 3)",
    "cardType": "TRAP",
    "spellTrapSubtype": "COUNTER_TRAP",
    "spellSpeed": 3,
    "rarity": "SUPER_RARE",
    "attribute": "AQUA",
    "manaCost": 4,
    "chemicalFormula": "EDTA Binding",
    "effectCode": "TRAP_B23_CHELATION_METAL_ION_QUENCH_COUNTER_CNTR_20",
    "effectText": "[Bẫy Phản Công / Counter Trap - Spell Speed 3]: Khi đối thủ kích hoạt một lá bài Phép, Bẫy hoặc hiệu ứng quái thú: Vô hiệu hóa kích hoạt đó và phá hủy lá bài của đối thủ!",
    "scientificLore": "Cơ chế triệt tiêu tức thời Bẫy Triệt Tiêu Hiệu Ứng Bằng Phức Chelate (Thermodynamic Chelate Effect ΔS > 0 Formation) ngăn chặn phản ứng chuỗi ngay từ giai đoạn khởi đầu theo nguyên lý động học xúc tác GDPT 2018.",
    "relatedEquation": "Thermodynamic Chelate Effect ΔS > 0 Formation",
    "iupacName": "Chelation Metal Ion Quench Counter Protocol",
    "archetype": "ELECTROCHEMICAL_CELL",
    "structuredEffects": [
      {
        "effectId": "B23_EFF_20",
        "activationWindow": "QUICK",
        "operations": [
          {
            "op": "NEGATE_EFFECT",
            "params": {}
          },
          {
            "op": "DESTROY_CARD",
            "params": {
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Spell Speed 3: Vô hiệu hóa kích hoạt của đối thủ và phá hủy lá bài đó."
      }
    ]
  },
  {
    "id": "card_b23_021_counter_universal_buffer_proton_quench_21",
    "name": "Bẫy Đệm Chống Đột Biến Proton pH (Cấp Độ Phản Kích 3)",
    "name_en": "Universal Buffer Proton Quench (Counter Rank 3)",
    "cardType": "TRAP",
    "spellTrapSubtype": "COUNTER_TRAP",
    "spellSpeed": 3,
    "rarity": "SUPER_RARE",
    "attribute": "AQUA",
    "manaCost": 1,
    "chemicalFormula": "Buffer Capacity",
    "effectCode": "TRAP_B23_UNIVERSAL_BUFFER_PROTON_QUENCH_CNTR_21",
    "effectText": "[Bẫy Phản Công / Counter Trap - Spell Speed 3]: Khi đối thủ kích hoạt một lá bài Phép, Bẫy hoặc hiệu ứng quái thú: Vô hiệu hóa kích hoạt đó và phá hủy lá bài của đối thủ!",
    "scientificLore": "Cơ chế triệt tiêu tức thời Bẫy Đệm Chống Đột Biến Proton pH (Henderson-Hasselbalch Equation pH Homeostasis) ngăn chặn phản ứng chuỗi ngay từ giai đoạn khởi đầu theo nguyên lý động học xúc tác GDPT 2018.",
    "relatedEquation": "Henderson-Hasselbalch Equation pH Homeostasis",
    "iupacName": "Universal Buffer Proton Quench Protocol",
    "archetype": "LE_CHATELIER_EQUILIBRIUM",
    "structuredEffects": [
      {
        "effectId": "B23_EFF_21",
        "activationWindow": "QUICK",
        "operations": [
          {
            "op": "NEGATE_EFFECT",
            "params": {}
          },
          {
            "op": "DESTROY_CARD",
            "params": {
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Spell Speed 3: Vô hiệu hóa kích hoạt của đối thủ và phá hủy lá bài đó."
      }
    ]
  },
  {
    "id": "card_b23_022_counter_free_radical_scavenger_chain_terminator_22",
    "name": "Bẫy Khử Gốc Tự Do Bằng Chất Chống Oxi Hóa (Cấp Độ Phản Kích 3)",
    "name_en": "Free Radical Scavenger Chain Terminator (Counter Rank 3)",
    "cardType": "TRAP",
    "spellTrapSubtype": "COUNTER_TRAP",
    "spellSpeed": 3,
    "rarity": "ULTRA_RARE",
    "attribute": "TERRA",
    "manaCost": 2,
    "chemicalFormula": "Antioxidant",
    "effectCode": "TRAP_B23_FREE_RADICAL_SCAVENGER_CHAIN_TERMINATOR_CNTR_22",
    "effectText": "[Bẫy Phản Công / Counter Trap - Spell Speed 3]: Khi đối thủ kích hoạt một lá bài Phép, Bẫy hoặc hiệu ứng quái thú: Vô hiệu hóa kích hoạt đó và phá hủy lá bài của đối thủ!",
    "scientificLore": "Cơ chế triệt tiêu tức thời Bẫy Khử Gốc Tự Do Bằng Chất Chống Oxi Hóa (R· + Inh-H → RH + Inh· (Stable Inactive Radical)) ngăn chặn phản ứng chuỗi ngay từ giai đoạn khởi đầu theo nguyên lý động học xúc tác GDPT 2018.",
    "relatedEquation": "R· + Inh-H → RH + Inh· (Stable Inactive Radical)",
    "iupacName": "Free Radical Scavenger Chain Terminator Protocol",
    "archetype": "ELECTROCHEMICAL_CELL",
    "structuredEffects": [
      {
        "effectId": "B23_EFF_22",
        "activationWindow": "QUICK",
        "operations": [
          {
            "op": "NEGATE_EFFECT",
            "params": {}
          },
          {
            "op": "DESTROY_CARD",
            "params": {
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Spell Speed 3: Vô hiệu hóa kích hoạt của đối thủ và phá hủy lá bài đó."
      }
    ]
  },
  {
    "id": "card_b23_023_counter_reverse_polar_electro_quench_counter_23",
    "name": "Bẫy Kháng Điện Áp Ngược Pin Galvanic (Cấp Độ Phản Kích 3)",
    "name_en": "Reverse Polar Electro-Quench Counter (Counter Rank 3)",
    "cardType": "TRAP",
    "spellTrapSubtype": "COUNTER_TRAP",
    "spellSpeed": 3,
    "rarity": "SECRET_RARE",
    "attribute": "ELECTRO",
    "manaCost": 3,
    "chemicalFormula": "Back-EMF",
    "effectCode": "TRAP_B23_REVERSE_POLAR_ELECTRO_QUENCH_COUNTER_CNTR_23",
    "effectText": "[Bẫy Phản Công / Counter Trap - Spell Speed 3]: Khi đối thủ kích hoạt một lá bài Phép, Bẫy hoặc hiệu ứng quái thú: Vô hiệu hóa kích hoạt đó và phá hủy lá bài của đối thủ!",
    "scientificLore": "Cơ chế triệt tiêu tức thời Bẫy Kháng Điện Áp Ngược Pin Galvanic (External Opposing Voltage Exceeding Cell Potential E_cell) ngăn chặn phản ứng chuỗi ngay từ giai đoạn khởi đầu theo nguyên lý động học xúc tác GDPT 2018.",
    "relatedEquation": "External Opposing Voltage Exceeding Cell Potential E_cell",
    "iupacName": "Reverse Polar Electro-Quench Counter Protocol",
    "archetype": "LE_CHATELIER_EQUILIBRIUM",
    "structuredEffects": [
      {
        "effectId": "B23_EFF_23",
        "activationWindow": "QUICK",
        "operations": [
          {
            "op": "NEGATE_EFFECT",
            "params": {}
          },
          {
            "op": "DESTROY_CARD",
            "params": {
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Spell Speed 3: Vô hiệu hóa kích hoạt của đối thủ và phá hủy lá bài đó."
      }
    ]
  },
  {
    "id": "card_b23_024_counter_nucleation_inhibitor_crystal_shatter_24",
    "name": "Bẫy Triệt Phá Tinh Thể Bằng Chất Ức Chế Mầm (Cấp Độ Phản Kích 3)",
    "name_en": "Nucleation Inhibitor Crystal Shatter (Counter Rank 3)",
    "cardType": "TRAP",
    "spellTrapSubtype": "COUNTER_TRAP",
    "spellSpeed": 3,
    "rarity": "COMMON",
    "attribute": "NOBLE_VOID",
    "manaCost": 4,
    "chemicalFormula": "Polyphosphate",
    "effectCode": "TRAP_B23_NUCLEATION_INHIBITOR_CRYSTAL_SHATTER_CNTR_24",
    "effectText": "[Bẫy Phản Công / Counter Trap - Spell Speed 3]: Khi đối thủ kích hoạt một lá bài Phép, Bẫy hoặc hiệu ứng quái thú: Vô hiệu hóa kích hoạt đó và phá hủy lá bài của đối thủ!",
    "scientificLore": "Cơ chế triệt tiêu tức thời Bẫy Triệt Phá Tinh Thể Bằng Chất Ức Chế Mầm (Sub-Stoichiometric Threshold Scale Inhibition) ngăn chặn phản ứng chuỗi ngay từ giai đoạn khởi đầu theo nguyên lý động học xúc tác GDPT 2018.",
    "relatedEquation": "Sub-Stoichiometric Threshold Scale Inhibition",
    "iupacName": "Nucleation Inhibitor Crystal Shatter Protocol",
    "archetype": "ELECTROCHEMICAL_CELL",
    "structuredEffects": [
      {
        "effectId": "B23_EFF_24",
        "activationWindow": "QUICK",
        "operations": [
          {
            "op": "NEGATE_EFFECT",
            "params": {}
          },
          {
            "op": "DESTROY_CARD",
            "params": {
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Spell Speed 3: Vô hiệu hóa kích hoạt của đối thủ và phá hủy lá bài đó."
      }
    ]
  },
  {
    "id": "card_b23_025_counter_le_chatelier_counter_displacement_25",
    "name": "Phản Đòn Cân Bằng Động Le Chatelier (Cấp Độ Phản Kích 4)",
    "name_en": "Le Chatelier Counter Displacement (Counter Rank 4)",
    "cardType": "TRAP",
    "spellTrapSubtype": "COUNTER_TRAP",
    "spellSpeed": 3,
    "rarity": "COMMON",
    "attribute": "NOBLE_VOID",
    "manaCost": 1,
    "chemicalFormula": "Kc Reversion",
    "effectCode": "TRAP_B23_LE_CHATELIER_COUNTER_DISPLACEMENT_CNTR_25",
    "effectText": "[Bẫy Phản Công / Counter Trap - Spell Speed 3]: Khi đối thủ kích hoạt một lá bài Phép, Bẫy hoặc hiệu ứng quái thú: Vô hiệu hóa kích hoạt đó và phá hủy lá bài của đối thủ!",
    "scientificLore": "Cơ chế triệt tiêu tức thời Phản Đòn Cân Bằng Động Le Chatelier (Instantaneous Shift Neutralizing External Disturbance) ngăn chặn phản ứng chuỗi ngay từ giai đoạn khởi đầu theo nguyên lý động học xúc tác GDPT 2018.",
    "relatedEquation": "Instantaneous Shift Neutralizing External Disturbance",
    "iupacName": "Le Chatelier Counter Displacement Protocol",
    "archetype": "LE_CHATELIER_EQUILIBRIUM",
    "structuredEffects": [
      {
        "effectId": "B23_EFF_25",
        "activationWindow": "QUICK",
        "operations": [
          {
            "op": "NEGATE_EFFECT",
            "params": {}
          },
          {
            "op": "DESTROY_CARD",
            "params": {
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Spell Speed 3: Vô hiệu hóa kích hoạt của đối thủ và phá hủy lá bài đó."
      }
    ]
  },
  {
    "id": "card_b23_026_counter_electrochemical_overpotential_counter_stop_26",
    "name": "Quá Thế Điện Cực Chặn Đứng Dòng Electron (Cấp Độ Phản Kích 4)",
    "name_en": "Electrochemical Overpotential Counter Stop (Counter Rank 4)",
    "cardType": "TRAP",
    "spellTrapSubtype": "COUNTER_TRAP",
    "spellSpeed": 3,
    "rarity": "COMMON",
    "attribute": "ELECTRO",
    "manaCost": 2,
    "chemicalFormula": "η Overpotential",
    "effectCode": "TRAP_B23_ELECTROCHEMICAL_OVERPOTENTIAL_COUNTER_STOP_CNTR_26",
    "effectText": "[Bẫy Phản Công / Counter Trap - Spell Speed 3]: Khi đối thủ kích hoạt một lá bài Phép, Bẫy hoặc hiệu ứng quái thú: Vô hiệu hóa kích hoạt đó và phá hủy lá bài của đối thủ!",
    "scientificLore": "Cơ chế triệt tiêu tức thời Quá Thế Điện Cực Chặn Đứng Dòng Electron (Kinetic Activation Overpotential Halting Electrolysis) ngăn chặn phản ứng chuỗi ngay từ giai đoạn khởi đầu theo nguyên lý động học xúc tác GDPT 2018.",
    "relatedEquation": "Kinetic Activation Overpotential Halting Electrolysis",
    "iupacName": "Electrochemical Overpotential Counter Stop Protocol",
    "archetype": "ELECTROCHEMICAL_CELL",
    "structuredEffects": [
      {
        "effectId": "B23_EFF_26",
        "activationWindow": "QUICK",
        "operations": [
          {
            "op": "NEGATE_EFFECT",
            "params": {}
          },
          {
            "op": "DESTROY_CARD",
            "params": {
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Spell Speed 3: Vô hiệu hóa kích hoạt của đối thủ và phá hủy lá bài đó."
      }
    ]
  },
  {
    "id": "card_b23_027_counter_catalyst_poison_irreversible_inhibition_27",
    "name": "Chất Độc Xúc Tác Vô Hiệu Trung Tâm Hoạt Hóa (Cấp Độ Phản Kích 4)",
    "name_en": "Catalyst Poison Irreversible Inhibition (Counter Rank 4)",
    "cardType": "TRAP",
    "spellTrapSubtype": "COUNTER_TRAP",
    "spellSpeed": 3,
    "rarity": "RARE",
    "attribute": "ACID_DARK",
    "manaCost": 3,
    "chemicalFormula": "CO/H2S Poison",
    "effectCode": "TRAP_B23_CATALYST_POISON_IRREVERSIBLE_INHIBITION_CNTR_27",
    "effectText": "[Bẫy Phản Công / Counter Trap - Spell Speed 3]: Khi đối thủ kích hoạt một lá bài Phép, Bẫy hoặc hiệu ứng quái thú: Vô hiệu hóa kích hoạt đó và phá hủy lá bài của đối thủ!",
    "scientificLore": "Cơ chế triệt tiêu tức thời Chất Độc Xúc Tác Vô Hiệu Trung Tâm Hoạt Hóa (Irreversible Chemisorption Blocking Active Catalyst Sites) ngăn chặn phản ứng chuỗi ngay từ giai đoạn khởi đầu theo nguyên lý động học xúc tác GDPT 2018.",
    "relatedEquation": "Irreversible Chemisorption Blocking Active Catalyst Sites",
    "iupacName": "Catalyst Poison Irreversible Inhibition Protocol",
    "archetype": "LE_CHATELIER_EQUILIBRIUM",
    "structuredEffects": [
      {
        "effectId": "B23_EFF_27",
        "activationWindow": "QUICK",
        "operations": [
          {
            "op": "NEGATE_EFFECT",
            "params": {}
          },
          {
            "op": "DESTROY_CARD",
            "params": {
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Spell Speed 3: Vô hiệu hóa kích hoạt của đối thủ và phá hủy lá bài đó."
      }
    ]
  },
  {
    "id": "card_b23_028_counter_chelation_metal_ion_quench_counter_28",
    "name": "Bẫy Triệt Tiêu Hiệu Ứng Bằng Phức Chelate (Cấp Độ Phản Kích 4)",
    "name_en": "Chelation Metal Ion Quench Counter (Counter Rank 4)",
    "cardType": "TRAP",
    "spellTrapSubtype": "COUNTER_TRAP",
    "spellSpeed": 3,
    "rarity": "RARE",
    "attribute": "AQUA",
    "manaCost": 4,
    "chemicalFormula": "EDTA Binding",
    "effectCode": "TRAP_B23_CHELATION_METAL_ION_QUENCH_COUNTER_CNTR_28",
    "effectText": "[Bẫy Phản Công / Counter Trap - Spell Speed 3]: Khi đối thủ kích hoạt một lá bài Phép, Bẫy hoặc hiệu ứng quái thú: Vô hiệu hóa kích hoạt đó và phá hủy lá bài của đối thủ!",
    "scientificLore": "Cơ chế triệt tiêu tức thời Bẫy Triệt Tiêu Hiệu Ứng Bằng Phức Chelate (Thermodynamic Chelate Effect ΔS > 0 Formation) ngăn chặn phản ứng chuỗi ngay từ giai đoạn khởi đầu theo nguyên lý động học xúc tác GDPT 2018.",
    "relatedEquation": "Thermodynamic Chelate Effect ΔS > 0 Formation",
    "iupacName": "Chelation Metal Ion Quench Counter Protocol",
    "archetype": "ELECTROCHEMICAL_CELL",
    "structuredEffects": [
      {
        "effectId": "B23_EFF_28",
        "activationWindow": "QUICK",
        "operations": [
          {
            "op": "NEGATE_EFFECT",
            "params": {}
          },
          {
            "op": "DESTROY_CARD",
            "params": {
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Spell Speed 3: Vô hiệu hóa kích hoạt của đối thủ và phá hủy lá bài đó."
      }
    ]
  },
  {
    "id": "card_b23_029_counter_universal_buffer_proton_quench_29",
    "name": "Bẫy Đệm Chống Đột Biến Proton pH (Cấp Độ Phản Kích 4)",
    "name_en": "Universal Buffer Proton Quench (Counter Rank 4)",
    "cardType": "TRAP",
    "spellTrapSubtype": "COUNTER_TRAP",
    "spellSpeed": 3,
    "rarity": "SUPER_RARE",
    "attribute": "AQUA",
    "manaCost": 1,
    "chemicalFormula": "Buffer Capacity",
    "effectCode": "TRAP_B23_UNIVERSAL_BUFFER_PROTON_QUENCH_CNTR_29",
    "effectText": "[Bẫy Phản Công / Counter Trap - Spell Speed 3]: Khi đối thủ kích hoạt một lá bài Phép, Bẫy hoặc hiệu ứng quái thú: Vô hiệu hóa kích hoạt đó và phá hủy lá bài của đối thủ!",
    "scientificLore": "Cơ chế triệt tiêu tức thời Bẫy Đệm Chống Đột Biến Proton pH (Henderson-Hasselbalch Equation pH Homeostasis) ngăn chặn phản ứng chuỗi ngay từ giai đoạn khởi đầu theo nguyên lý động học xúc tác GDPT 2018.",
    "relatedEquation": "Henderson-Hasselbalch Equation pH Homeostasis",
    "iupacName": "Universal Buffer Proton Quench Protocol",
    "archetype": "LE_CHATELIER_EQUILIBRIUM",
    "structuredEffects": [
      {
        "effectId": "B23_EFF_29",
        "activationWindow": "QUICK",
        "operations": [
          {
            "op": "NEGATE_EFFECT",
            "params": {}
          },
          {
            "op": "DESTROY_CARD",
            "params": {
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Spell Speed 3: Vô hiệu hóa kích hoạt của đối thủ và phá hủy lá bài đó."
      }
    ]
  },
  {
    "id": "card_b23_030_counter_free_radical_scavenger_chain_terminator_30",
    "name": "Bẫy Khử Gốc Tự Do Bằng Chất Chống Oxi Hóa (Cấp Độ Phản Kích 4)",
    "name_en": "Free Radical Scavenger Chain Terminator (Counter Rank 4)",
    "cardType": "TRAP",
    "spellTrapSubtype": "COUNTER_TRAP",
    "spellSpeed": 3,
    "rarity": "SUPER_RARE",
    "attribute": "TERRA",
    "manaCost": 2,
    "chemicalFormula": "Antioxidant",
    "effectCode": "TRAP_B23_FREE_RADICAL_SCAVENGER_CHAIN_TERMINATOR_CNTR_30",
    "effectText": "[Bẫy Phản Công / Counter Trap - Spell Speed 3]: Khi đối thủ kích hoạt một lá bài Phép, Bẫy hoặc hiệu ứng quái thú: Vô hiệu hóa kích hoạt đó và phá hủy lá bài của đối thủ!",
    "scientificLore": "Cơ chế triệt tiêu tức thời Bẫy Khử Gốc Tự Do Bằng Chất Chống Oxi Hóa (R· + Inh-H → RH + Inh· (Stable Inactive Radical)) ngăn chặn phản ứng chuỗi ngay từ giai đoạn khởi đầu theo nguyên lý động học xúc tác GDPT 2018.",
    "relatedEquation": "R· + Inh-H → RH + Inh· (Stable Inactive Radical)",
    "iupacName": "Free Radical Scavenger Chain Terminator Protocol",
    "archetype": "ELECTROCHEMICAL_CELL",
    "structuredEffects": [
      {
        "effectId": "B23_EFF_30",
        "activationWindow": "QUICK",
        "operations": [
          {
            "op": "NEGATE_EFFECT",
            "params": {}
          },
          {
            "op": "DESTROY_CARD",
            "params": {
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Spell Speed 3: Vô hiệu hóa kích hoạt của đối thủ và phá hủy lá bài đó."
      }
    ]
  },
  {
    "id": "card_b23_031_counter_reverse_polar_electro_quench_counter_31",
    "name": "Bẫy Kháng Điện Áp Ngược Pin Galvanic (Cấp Độ Phản Kích 4)",
    "name_en": "Reverse Polar Electro-Quench Counter (Counter Rank 4)",
    "cardType": "TRAP",
    "spellTrapSubtype": "COUNTER_TRAP",
    "spellSpeed": 3,
    "rarity": "ULTRA_RARE",
    "attribute": "ELECTRO",
    "manaCost": 3,
    "chemicalFormula": "Back-EMF",
    "effectCode": "TRAP_B23_REVERSE_POLAR_ELECTRO_QUENCH_COUNTER_CNTR_31",
    "effectText": "[Bẫy Phản Công / Counter Trap - Spell Speed 3]: Khi đối thủ kích hoạt một lá bài Phép, Bẫy hoặc hiệu ứng quái thú: Vô hiệu hóa kích hoạt đó và phá hủy lá bài của đối thủ!",
    "scientificLore": "Cơ chế triệt tiêu tức thời Bẫy Kháng Điện Áp Ngược Pin Galvanic (External Opposing Voltage Exceeding Cell Potential E_cell) ngăn chặn phản ứng chuỗi ngay từ giai đoạn khởi đầu theo nguyên lý động học xúc tác GDPT 2018.",
    "relatedEquation": "External Opposing Voltage Exceeding Cell Potential E_cell",
    "iupacName": "Reverse Polar Electro-Quench Counter Protocol",
    "archetype": "LE_CHATELIER_EQUILIBRIUM",
    "structuredEffects": [
      {
        "effectId": "B23_EFF_31",
        "activationWindow": "QUICK",
        "operations": [
          {
            "op": "NEGATE_EFFECT",
            "params": {}
          },
          {
            "op": "DESTROY_CARD",
            "params": {
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Spell Speed 3: Vô hiệu hóa kích hoạt của đối thủ và phá hủy lá bài đó."
      }
    ]
  },
  {
    "id": "card_b23_032_counter_nucleation_inhibitor_crystal_shatter_32",
    "name": "Bẫy Triệt Phá Tinh Thể Bằng Chất Ức Chế Mầm (Cấp Độ Phản Kích 4)",
    "name_en": "Nucleation Inhibitor Crystal Shatter (Counter Rank 4)",
    "cardType": "TRAP",
    "spellTrapSubtype": "COUNTER_TRAP",
    "spellSpeed": 3,
    "rarity": "SECRET_RARE",
    "attribute": "NOBLE_VOID",
    "manaCost": 4,
    "chemicalFormula": "Polyphosphate",
    "effectCode": "TRAP_B23_NUCLEATION_INHIBITOR_CRYSTAL_SHATTER_CNTR_32",
    "effectText": "[Bẫy Phản Công / Counter Trap - Spell Speed 3]: Khi đối thủ kích hoạt một lá bài Phép, Bẫy hoặc hiệu ứng quái thú: Vô hiệu hóa kích hoạt đó và phá hủy lá bài của đối thủ!",
    "scientificLore": "Cơ chế triệt tiêu tức thời Bẫy Triệt Phá Tinh Thể Bằng Chất Ức Chế Mầm (Sub-Stoichiometric Threshold Scale Inhibition) ngăn chặn phản ứng chuỗi ngay từ giai đoạn khởi đầu theo nguyên lý động học xúc tác GDPT 2018.",
    "relatedEquation": "Sub-Stoichiometric Threshold Scale Inhibition",
    "iupacName": "Nucleation Inhibitor Crystal Shatter Protocol",
    "archetype": "ELECTROCHEMICAL_CELL",
    "structuredEffects": [
      {
        "effectId": "B23_EFF_32",
        "activationWindow": "QUICK",
        "operations": [
          {
            "op": "NEGATE_EFFECT",
            "params": {}
          },
          {
            "op": "DESTROY_CARD",
            "params": {
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Spell Speed 3: Vô hiệu hóa kích hoạt của đối thủ và phá hủy lá bài đó."
      }
    ]
  },
  {
    "id": "card_b23_033_counter_le_chatelier_counter_displacement_33",
    "name": "Phản Đòn Cân Bằng Động Le Chatelier (Cấp Độ Phản Kích 5)",
    "name_en": "Le Chatelier Counter Displacement (Counter Rank 5)",
    "cardType": "TRAP",
    "spellTrapSubtype": "COUNTER_TRAP",
    "spellSpeed": 3,
    "rarity": "COMMON",
    "attribute": "NOBLE_VOID",
    "manaCost": 1,
    "chemicalFormula": "Kc Reversion",
    "effectCode": "TRAP_B23_LE_CHATELIER_COUNTER_DISPLACEMENT_CNTR_33",
    "effectText": "[Bẫy Phản Công / Counter Trap - Spell Speed 3]: Khi đối thủ kích hoạt một lá bài Phép, Bẫy hoặc hiệu ứng quái thú: Vô hiệu hóa kích hoạt đó và phá hủy lá bài của đối thủ!",
    "scientificLore": "Cơ chế triệt tiêu tức thời Phản Đòn Cân Bằng Động Le Chatelier (Instantaneous Shift Neutralizing External Disturbance) ngăn chặn phản ứng chuỗi ngay từ giai đoạn khởi đầu theo nguyên lý động học xúc tác GDPT 2018.",
    "relatedEquation": "Instantaneous Shift Neutralizing External Disturbance",
    "iupacName": "Le Chatelier Counter Displacement Protocol",
    "archetype": "LE_CHATELIER_EQUILIBRIUM",
    "structuredEffects": [
      {
        "effectId": "B23_EFF_33",
        "activationWindow": "QUICK",
        "operations": [
          {
            "op": "NEGATE_EFFECT",
            "params": {}
          },
          {
            "op": "DESTROY_CARD",
            "params": {
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Spell Speed 3: Vô hiệu hóa kích hoạt của đối thủ và phá hủy lá bài đó."
      }
    ]
  },
  {
    "id": "card_b23_034_counter_electrochemical_overpotential_counter_stop_34",
    "name": "Quá Thế Điện Cực Chặn Đứng Dòng Electron (Cấp Độ Phản Kích 5)",
    "name_en": "Electrochemical Overpotential Counter Stop (Counter Rank 5)",
    "cardType": "TRAP",
    "spellTrapSubtype": "COUNTER_TRAP",
    "spellSpeed": 3,
    "rarity": "COMMON",
    "attribute": "ELECTRO",
    "manaCost": 2,
    "chemicalFormula": "η Overpotential",
    "effectCode": "TRAP_B23_ELECTROCHEMICAL_OVERPOTENTIAL_COUNTER_STOP_CNTR_34",
    "effectText": "[Bẫy Phản Công / Counter Trap - Spell Speed 3]: Khi đối thủ kích hoạt một lá bài Phép, Bẫy hoặc hiệu ứng quái thú: Vô hiệu hóa kích hoạt đó và phá hủy lá bài của đối thủ!",
    "scientificLore": "Cơ chế triệt tiêu tức thời Quá Thế Điện Cực Chặn Đứng Dòng Electron (Kinetic Activation Overpotential Halting Electrolysis) ngăn chặn phản ứng chuỗi ngay từ giai đoạn khởi đầu theo nguyên lý động học xúc tác GDPT 2018.",
    "relatedEquation": "Kinetic Activation Overpotential Halting Electrolysis",
    "iupacName": "Electrochemical Overpotential Counter Stop Protocol",
    "archetype": "ELECTROCHEMICAL_CELL",
    "structuredEffects": [
      {
        "effectId": "B23_EFF_34",
        "activationWindow": "QUICK",
        "operations": [
          {
            "op": "NEGATE_EFFECT",
            "params": {}
          },
          {
            "op": "DESTROY_CARD",
            "params": {
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Spell Speed 3: Vô hiệu hóa kích hoạt của đối thủ và phá hủy lá bài đó."
      }
    ]
  },
  {
    "id": "card_b23_035_counter_catalyst_poison_irreversible_inhibition_35",
    "name": "Chất Độc Xúc Tác Vô Hiệu Trung Tâm Hoạt Hóa (Cấp Độ Phản Kích 5)",
    "name_en": "Catalyst Poison Irreversible Inhibition (Counter Rank 5)",
    "cardType": "TRAP",
    "spellTrapSubtype": "COUNTER_TRAP",
    "spellSpeed": 3,
    "rarity": "COMMON",
    "attribute": "ACID_DARK",
    "manaCost": 3,
    "chemicalFormula": "CO/H2S Poison",
    "effectCode": "TRAP_B23_CATALYST_POISON_IRREVERSIBLE_INHIBITION_CNTR_35",
    "effectText": "[Bẫy Phản Công / Counter Trap - Spell Speed 3]: Khi đối thủ kích hoạt một lá bài Phép, Bẫy hoặc hiệu ứng quái thú: Vô hiệu hóa kích hoạt đó và phá hủy lá bài của đối thủ!",
    "scientificLore": "Cơ chế triệt tiêu tức thời Chất Độc Xúc Tác Vô Hiệu Trung Tâm Hoạt Hóa (Irreversible Chemisorption Blocking Active Catalyst Sites) ngăn chặn phản ứng chuỗi ngay từ giai đoạn khởi đầu theo nguyên lý động học xúc tác GDPT 2018.",
    "relatedEquation": "Irreversible Chemisorption Blocking Active Catalyst Sites",
    "iupacName": "Catalyst Poison Irreversible Inhibition Protocol",
    "archetype": "LE_CHATELIER_EQUILIBRIUM",
    "structuredEffects": [
      {
        "effectId": "B23_EFF_35",
        "activationWindow": "QUICK",
        "operations": [
          {
            "op": "NEGATE_EFFECT",
            "params": {}
          },
          {
            "op": "DESTROY_CARD",
            "params": {
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Spell Speed 3: Vô hiệu hóa kích hoạt của đối thủ và phá hủy lá bài đó."
      }
    ]
  },
  {
    "id": "card_b23_036_counter_chelation_metal_ion_quench_counter_36",
    "name": "Bẫy Triệt Tiêu Hiệu Ứng Bằng Phức Chelate (Cấp Độ Phản Kích 5)",
    "name_en": "Chelation Metal Ion Quench Counter (Counter Rank 5)",
    "cardType": "TRAP",
    "spellTrapSubtype": "COUNTER_TRAP",
    "spellSpeed": 3,
    "rarity": "RARE",
    "attribute": "AQUA",
    "manaCost": 4,
    "chemicalFormula": "EDTA Binding",
    "effectCode": "TRAP_B23_CHELATION_METAL_ION_QUENCH_COUNTER_CNTR_36",
    "effectText": "[Bẫy Phản Công / Counter Trap - Spell Speed 3]: Khi đối thủ kích hoạt một lá bài Phép, Bẫy hoặc hiệu ứng quái thú: Vô hiệu hóa kích hoạt đó và phá hủy lá bài của đối thủ!",
    "scientificLore": "Cơ chế triệt tiêu tức thời Bẫy Triệt Tiêu Hiệu Ứng Bằng Phức Chelate (Thermodynamic Chelate Effect ΔS > 0 Formation) ngăn chặn phản ứng chuỗi ngay từ giai đoạn khởi đầu theo nguyên lý động học xúc tác GDPT 2018.",
    "relatedEquation": "Thermodynamic Chelate Effect ΔS > 0 Formation",
    "iupacName": "Chelation Metal Ion Quench Counter Protocol",
    "archetype": "ELECTROCHEMICAL_CELL",
    "structuredEffects": [
      {
        "effectId": "B23_EFF_36",
        "activationWindow": "QUICK",
        "operations": [
          {
            "op": "NEGATE_EFFECT",
            "params": {}
          },
          {
            "op": "DESTROY_CARD",
            "params": {
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Spell Speed 3: Vô hiệu hóa kích hoạt của đối thủ và phá hủy lá bài đó."
      }
    ]
  },
  {
    "id": "card_b23_037_counter_universal_buffer_proton_quench_37",
    "name": "Bẫy Đệm Chống Đột Biến Proton pH (Cấp Độ Phản Kích 5)",
    "name_en": "Universal Buffer Proton Quench (Counter Rank 5)",
    "cardType": "TRAP",
    "spellTrapSubtype": "COUNTER_TRAP",
    "spellSpeed": 3,
    "rarity": "RARE",
    "attribute": "AQUA",
    "manaCost": 1,
    "chemicalFormula": "Buffer Capacity",
    "effectCode": "TRAP_B23_UNIVERSAL_BUFFER_PROTON_QUENCH_CNTR_37",
    "effectText": "[Bẫy Phản Công / Counter Trap - Spell Speed 3]: Khi đối thủ kích hoạt một lá bài Phép, Bẫy hoặc hiệu ứng quái thú: Vô hiệu hóa kích hoạt đó và phá hủy lá bài của đối thủ!",
    "scientificLore": "Cơ chế triệt tiêu tức thời Bẫy Đệm Chống Đột Biến Proton pH (Henderson-Hasselbalch Equation pH Homeostasis) ngăn chặn phản ứng chuỗi ngay từ giai đoạn khởi đầu theo nguyên lý động học xúc tác GDPT 2018.",
    "relatedEquation": "Henderson-Hasselbalch Equation pH Homeostasis",
    "iupacName": "Universal Buffer Proton Quench Protocol",
    "archetype": "LE_CHATELIER_EQUILIBRIUM",
    "structuredEffects": [
      {
        "effectId": "B23_EFF_37",
        "activationWindow": "QUICK",
        "operations": [
          {
            "op": "NEGATE_EFFECT",
            "params": {}
          },
          {
            "op": "DESTROY_CARD",
            "params": {
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Spell Speed 3: Vô hiệu hóa kích hoạt của đối thủ và phá hủy lá bài đó."
      }
    ]
  },
  {
    "id": "card_b23_038_counter_free_radical_scavenger_chain_terminator_38",
    "name": "Bẫy Khử Gốc Tự Do Bằng Chất Chống Oxi Hóa (Cấp Độ Phản Kích 5)",
    "name_en": "Free Radical Scavenger Chain Terminator (Counter Rank 5)",
    "cardType": "TRAP",
    "spellTrapSubtype": "COUNTER_TRAP",
    "spellSpeed": 3,
    "rarity": "SUPER_RARE",
    "attribute": "TERRA",
    "manaCost": 2,
    "chemicalFormula": "Antioxidant",
    "effectCode": "TRAP_B23_FREE_RADICAL_SCAVENGER_CHAIN_TERMINATOR_CNTR_38",
    "effectText": "[Bẫy Phản Công / Counter Trap - Spell Speed 3]: Khi đối thủ kích hoạt một lá bài Phép, Bẫy hoặc hiệu ứng quái thú: Vô hiệu hóa kích hoạt đó và phá hủy lá bài của đối thủ!",
    "scientificLore": "Cơ chế triệt tiêu tức thời Bẫy Khử Gốc Tự Do Bằng Chất Chống Oxi Hóa (R· + Inh-H → RH + Inh· (Stable Inactive Radical)) ngăn chặn phản ứng chuỗi ngay từ giai đoạn khởi đầu theo nguyên lý động học xúc tác GDPT 2018.",
    "relatedEquation": "R· + Inh-H → RH + Inh· (Stable Inactive Radical)",
    "iupacName": "Free Radical Scavenger Chain Terminator Protocol",
    "archetype": "ELECTROCHEMICAL_CELL",
    "structuredEffects": [
      {
        "effectId": "B23_EFF_38",
        "activationWindow": "QUICK",
        "operations": [
          {
            "op": "NEGATE_EFFECT",
            "params": {}
          },
          {
            "op": "DESTROY_CARD",
            "params": {
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Spell Speed 3: Vô hiệu hóa kích hoạt của đối thủ và phá hủy lá bài đó."
      }
    ]
  },
  {
    "id": "card_b23_039_counter_reverse_polar_electro_quench_counter_39",
    "name": "Bẫy Kháng Điện Áp Ngược Pin Galvanic (Cấp Độ Phản Kích 5)",
    "name_en": "Reverse Polar Electro-Quench Counter (Counter Rank 5)",
    "cardType": "TRAP",
    "spellTrapSubtype": "COUNTER_TRAP",
    "spellSpeed": 3,
    "rarity": "SUPER_RARE",
    "attribute": "ELECTRO",
    "manaCost": 3,
    "chemicalFormula": "Back-EMF",
    "effectCode": "TRAP_B23_REVERSE_POLAR_ELECTRO_QUENCH_COUNTER_CNTR_39",
    "effectText": "[Bẫy Phản Công / Counter Trap - Spell Speed 3]: Khi đối thủ kích hoạt một lá bài Phép, Bẫy hoặc hiệu ứng quái thú: Vô hiệu hóa kích hoạt đó và phá hủy lá bài của đối thủ!",
    "scientificLore": "Cơ chế triệt tiêu tức thời Bẫy Kháng Điện Áp Ngược Pin Galvanic (External Opposing Voltage Exceeding Cell Potential E_cell) ngăn chặn phản ứng chuỗi ngay từ giai đoạn khởi đầu theo nguyên lý động học xúc tác GDPT 2018.",
    "relatedEquation": "External Opposing Voltage Exceeding Cell Potential E_cell",
    "iupacName": "Reverse Polar Electro-Quench Counter Protocol",
    "archetype": "LE_CHATELIER_EQUILIBRIUM",
    "structuredEffects": [
      {
        "effectId": "B23_EFF_39",
        "activationWindow": "QUICK",
        "operations": [
          {
            "op": "NEGATE_EFFECT",
            "params": {}
          },
          {
            "op": "DESTROY_CARD",
            "params": {
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Spell Speed 3: Vô hiệu hóa kích hoạt của đối thủ và phá hủy lá bài đó."
      }
    ]
  },
  {
    "id": "card_b23_040_counter_nucleation_inhibitor_crystal_shatter_40",
    "name": "Bẫy Triệt Phá Tinh Thể Bằng Chất Ức Chế Mầm (Cấp Độ Phản Kích 5)",
    "name_en": "Nucleation Inhibitor Crystal Shatter (Counter Rank 5)",
    "cardType": "TRAP",
    "spellTrapSubtype": "COUNTER_TRAP",
    "spellSpeed": 3,
    "rarity": "ULTRA_RARE",
    "attribute": "NOBLE_VOID",
    "manaCost": 4,
    "chemicalFormula": "Polyphosphate",
    "effectCode": "TRAP_B23_NUCLEATION_INHIBITOR_CRYSTAL_SHATTER_CNTR_40",
    "effectText": "[Bẫy Phản Công / Counter Trap - Spell Speed 3]: Khi đối thủ kích hoạt một lá bài Phép, Bẫy hoặc hiệu ứng quái thú: Vô hiệu hóa kích hoạt đó và phá hủy lá bài của đối thủ!",
    "scientificLore": "Cơ chế triệt tiêu tức thời Bẫy Triệt Phá Tinh Thể Bằng Chất Ức Chế Mầm (Sub-Stoichiometric Threshold Scale Inhibition) ngăn chặn phản ứng chuỗi ngay từ giai đoạn khởi đầu theo nguyên lý động học xúc tác GDPT 2018.",
    "relatedEquation": "Sub-Stoichiometric Threshold Scale Inhibition",
    "iupacName": "Nucleation Inhibitor Crystal Shatter Protocol",
    "archetype": "ELECTROCHEMICAL_CELL",
    "structuredEffects": [
      {
        "effectId": "B23_EFF_40",
        "activationWindow": "QUICK",
        "operations": [
          {
            "op": "NEGATE_EFFECT",
            "params": {}
          },
          {
            "op": "DESTROY_CARD",
            "params": {
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Spell Speed 3: Vô hiệu hóa kích hoạt của đối thủ và phá hủy lá bài đó."
      }
    ]
  },
  {
    "id": "card_b23_041_counter_le_chatelier_counter_displacement_41",
    "name": "Phản Đòn Cân Bằng Động Le Chatelier (Cấp Độ Phản Kích 6)",
    "name_en": "Le Chatelier Counter Displacement (Counter Rank 6)",
    "cardType": "TRAP",
    "spellTrapSubtype": "COUNTER_TRAP",
    "spellSpeed": 3,
    "rarity": "SECRET_RARE",
    "attribute": "NOBLE_VOID",
    "manaCost": 1,
    "chemicalFormula": "Kc Reversion",
    "effectCode": "TRAP_B23_LE_CHATELIER_COUNTER_DISPLACEMENT_CNTR_41",
    "effectText": "[Bẫy Phản Công / Counter Trap - Spell Speed 3]: Khi đối thủ kích hoạt một lá bài Phép, Bẫy hoặc hiệu ứng quái thú: Vô hiệu hóa kích hoạt đó và phá hủy lá bài của đối thủ!",
    "scientificLore": "Cơ chế triệt tiêu tức thời Phản Đòn Cân Bằng Động Le Chatelier (Instantaneous Shift Neutralizing External Disturbance) ngăn chặn phản ứng chuỗi ngay từ giai đoạn khởi đầu theo nguyên lý động học xúc tác GDPT 2018.",
    "relatedEquation": "Instantaneous Shift Neutralizing External Disturbance",
    "iupacName": "Le Chatelier Counter Displacement Protocol",
    "archetype": "LE_CHATELIER_EQUILIBRIUM",
    "structuredEffects": [
      {
        "effectId": "B23_EFF_41",
        "activationWindow": "QUICK",
        "operations": [
          {
            "op": "NEGATE_EFFECT",
            "params": {}
          },
          {
            "op": "DESTROY_CARD",
            "params": {
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Spell Speed 3: Vô hiệu hóa kích hoạt của đối thủ và phá hủy lá bài đó."
      }
    ]
  },
  {
    "id": "card_b23_042_counter_electrochemical_overpotential_counter_stop_42",
    "name": "Quá Thế Điện Cực Chặn Đứng Dòng Electron (Cấp Độ Phản Kích 6)",
    "name_en": "Electrochemical Overpotential Counter Stop (Counter Rank 6)",
    "cardType": "TRAP",
    "spellTrapSubtype": "COUNTER_TRAP",
    "spellSpeed": 3,
    "rarity": "COMMON",
    "attribute": "ELECTRO",
    "manaCost": 2,
    "chemicalFormula": "η Overpotential",
    "effectCode": "TRAP_B23_ELECTROCHEMICAL_OVERPOTENTIAL_COUNTER_STOP_CNTR_42",
    "effectText": "[Bẫy Phản Công / Counter Trap - Spell Speed 3]: Khi đối thủ kích hoạt một lá bài Phép, Bẫy hoặc hiệu ứng quái thú: Vô hiệu hóa kích hoạt đó và phá hủy lá bài của đối thủ!",
    "scientificLore": "Cơ chế triệt tiêu tức thời Quá Thế Điện Cực Chặn Đứng Dòng Electron (Kinetic Activation Overpotential Halting Electrolysis) ngăn chặn phản ứng chuỗi ngay từ giai đoạn khởi đầu theo nguyên lý động học xúc tác GDPT 2018.",
    "relatedEquation": "Kinetic Activation Overpotential Halting Electrolysis",
    "iupacName": "Electrochemical Overpotential Counter Stop Protocol",
    "archetype": "ELECTROCHEMICAL_CELL",
    "structuredEffects": [
      {
        "effectId": "B23_EFF_42",
        "activationWindow": "QUICK",
        "operations": [
          {
            "op": "NEGATE_EFFECT",
            "params": {}
          },
          {
            "op": "DESTROY_CARD",
            "params": {
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Spell Speed 3: Vô hiệu hóa kích hoạt của đối thủ và phá hủy lá bài đó."
      }
    ]
  },
  {
    "id": "card_b23_043_counter_catalyst_poison_irreversible_inhibition_43",
    "name": "Chất Độc Xúc Tác Vô Hiệu Trung Tâm Hoạt Hóa (Cấp Độ Phản Kích 6)",
    "name_en": "Catalyst Poison Irreversible Inhibition (Counter Rank 6)",
    "cardType": "TRAP",
    "spellTrapSubtype": "COUNTER_TRAP",
    "spellSpeed": 3,
    "rarity": "COMMON",
    "attribute": "ACID_DARK",
    "manaCost": 3,
    "chemicalFormula": "CO/H2S Poison",
    "effectCode": "TRAP_B23_CATALYST_POISON_IRREVERSIBLE_INHIBITION_CNTR_43",
    "effectText": "[Bẫy Phản Công / Counter Trap - Spell Speed 3]: Khi đối thủ kích hoạt một lá bài Phép, Bẫy hoặc hiệu ứng quái thú: Vô hiệu hóa kích hoạt đó và phá hủy lá bài của đối thủ!",
    "scientificLore": "Cơ chế triệt tiêu tức thời Chất Độc Xúc Tác Vô Hiệu Trung Tâm Hoạt Hóa (Irreversible Chemisorption Blocking Active Catalyst Sites) ngăn chặn phản ứng chuỗi ngay từ giai đoạn khởi đầu theo nguyên lý động học xúc tác GDPT 2018.",
    "relatedEquation": "Irreversible Chemisorption Blocking Active Catalyst Sites",
    "iupacName": "Catalyst Poison Irreversible Inhibition Protocol",
    "archetype": "LE_CHATELIER_EQUILIBRIUM",
    "structuredEffects": [
      {
        "effectId": "B23_EFF_43",
        "activationWindow": "QUICK",
        "operations": [
          {
            "op": "NEGATE_EFFECT",
            "params": {}
          },
          {
            "op": "DESTROY_CARD",
            "params": {
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Spell Speed 3: Vô hiệu hóa kích hoạt của đối thủ và phá hủy lá bài đó."
      }
    ]
  },
  {
    "id": "card_b23_044_counter_chelation_metal_ion_quench_counter_44",
    "name": "Bẫy Triệt Tiêu Hiệu Ứng Bằng Phức Chelate (Cấp Độ Phản Kích 6)",
    "name_en": "Chelation Metal Ion Quench Counter (Counter Rank 6)",
    "cardType": "TRAP",
    "spellTrapSubtype": "COUNTER_TRAP",
    "spellSpeed": 3,
    "rarity": "COMMON",
    "attribute": "AQUA",
    "manaCost": 4,
    "chemicalFormula": "EDTA Binding",
    "effectCode": "TRAP_B23_CHELATION_METAL_ION_QUENCH_COUNTER_CNTR_44",
    "effectText": "[Bẫy Phản Công / Counter Trap - Spell Speed 3]: Khi đối thủ kích hoạt một lá bài Phép, Bẫy hoặc hiệu ứng quái thú: Vô hiệu hóa kích hoạt đó và phá hủy lá bài của đối thủ!",
    "scientificLore": "Cơ chế triệt tiêu tức thời Bẫy Triệt Tiêu Hiệu Ứng Bằng Phức Chelate (Thermodynamic Chelate Effect ΔS > 0 Formation) ngăn chặn phản ứng chuỗi ngay từ giai đoạn khởi đầu theo nguyên lý động học xúc tác GDPT 2018.",
    "relatedEquation": "Thermodynamic Chelate Effect ΔS > 0 Formation",
    "iupacName": "Chelation Metal Ion Quench Counter Protocol",
    "archetype": "ELECTROCHEMICAL_CELL",
    "structuredEffects": [
      {
        "effectId": "B23_EFF_44",
        "activationWindow": "QUICK",
        "operations": [
          {
            "op": "NEGATE_EFFECT",
            "params": {}
          },
          {
            "op": "DESTROY_CARD",
            "params": {
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Spell Speed 3: Vô hiệu hóa kích hoạt của đối thủ và phá hủy lá bài đó."
      }
    ]
  },
  {
    "id": "card_b23_045_counter_universal_buffer_proton_quench_45",
    "name": "Bẫy Đệm Chống Đột Biến Proton pH (Cấp Độ Phản Kích 6)",
    "name_en": "Universal Buffer Proton Quench (Counter Rank 6)",
    "cardType": "TRAP",
    "spellTrapSubtype": "COUNTER_TRAP",
    "spellSpeed": 3,
    "rarity": "RARE",
    "attribute": "AQUA",
    "manaCost": 1,
    "chemicalFormula": "Buffer Capacity",
    "effectCode": "TRAP_B23_UNIVERSAL_BUFFER_PROTON_QUENCH_CNTR_45",
    "effectText": "[Bẫy Phản Công / Counter Trap - Spell Speed 3]: Khi đối thủ kích hoạt một lá bài Phép, Bẫy hoặc hiệu ứng quái thú: Vô hiệu hóa kích hoạt đó và phá hủy lá bài của đối thủ!",
    "scientificLore": "Cơ chế triệt tiêu tức thời Bẫy Đệm Chống Đột Biến Proton pH (Henderson-Hasselbalch Equation pH Homeostasis) ngăn chặn phản ứng chuỗi ngay từ giai đoạn khởi đầu theo nguyên lý động học xúc tác GDPT 2018.",
    "relatedEquation": "Henderson-Hasselbalch Equation pH Homeostasis",
    "iupacName": "Universal Buffer Proton Quench Protocol",
    "archetype": "LE_CHATELIER_EQUILIBRIUM",
    "structuredEffects": [
      {
        "effectId": "B23_EFF_45",
        "activationWindow": "QUICK",
        "operations": [
          {
            "op": "NEGATE_EFFECT",
            "params": {}
          },
          {
            "op": "DESTROY_CARD",
            "params": {
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Spell Speed 3: Vô hiệu hóa kích hoạt của đối thủ và phá hủy lá bài đó."
      }
    ]
  },
  {
    "id": "card_b23_046_counter_free_radical_scavenger_chain_terminator_46",
    "name": "Bẫy Khử Gốc Tự Do Bằng Chất Chống Oxi Hóa (Cấp Độ Phản Kích 6)",
    "name_en": "Free Radical Scavenger Chain Terminator (Counter Rank 6)",
    "cardType": "TRAP",
    "spellTrapSubtype": "COUNTER_TRAP",
    "spellSpeed": 3,
    "rarity": "RARE",
    "attribute": "TERRA",
    "manaCost": 2,
    "chemicalFormula": "Antioxidant",
    "effectCode": "TRAP_B23_FREE_RADICAL_SCAVENGER_CHAIN_TERMINATOR_CNTR_46",
    "effectText": "[Bẫy Phản Công / Counter Trap - Spell Speed 3]: Khi đối thủ kích hoạt một lá bài Phép, Bẫy hoặc hiệu ứng quái thú: Vô hiệu hóa kích hoạt đó và phá hủy lá bài của đối thủ!",
    "scientificLore": "Cơ chế triệt tiêu tức thời Bẫy Khử Gốc Tự Do Bằng Chất Chống Oxi Hóa (R· + Inh-H → RH + Inh· (Stable Inactive Radical)) ngăn chặn phản ứng chuỗi ngay từ giai đoạn khởi đầu theo nguyên lý động học xúc tác GDPT 2018.",
    "relatedEquation": "R· + Inh-H → RH + Inh· (Stable Inactive Radical)",
    "iupacName": "Free Radical Scavenger Chain Terminator Protocol",
    "archetype": "ELECTROCHEMICAL_CELL",
    "structuredEffects": [
      {
        "effectId": "B23_EFF_46",
        "activationWindow": "QUICK",
        "operations": [
          {
            "op": "NEGATE_EFFECT",
            "params": {}
          },
          {
            "op": "DESTROY_CARD",
            "params": {
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Spell Speed 3: Vô hiệu hóa kích hoạt của đối thủ và phá hủy lá bài đó."
      }
    ]
  },
  {
    "id": "card_b23_047_counter_reverse_polar_electro_quench_counter_47",
    "name": "Bẫy Kháng Điện Áp Ngược Pin Galvanic (Cấp Độ Phản Kích 6)",
    "name_en": "Reverse Polar Electro-Quench Counter (Counter Rank 6)",
    "cardType": "TRAP",
    "spellTrapSubtype": "COUNTER_TRAP",
    "spellSpeed": 3,
    "rarity": "SUPER_RARE",
    "attribute": "ELECTRO",
    "manaCost": 3,
    "chemicalFormula": "Back-EMF",
    "effectCode": "TRAP_B23_REVERSE_POLAR_ELECTRO_QUENCH_COUNTER_CNTR_47",
    "effectText": "[Bẫy Phản Công / Counter Trap - Spell Speed 3]: Khi đối thủ kích hoạt một lá bài Phép, Bẫy hoặc hiệu ứng quái thú: Vô hiệu hóa kích hoạt đó và phá hủy lá bài của đối thủ!",
    "scientificLore": "Cơ chế triệt tiêu tức thời Bẫy Kháng Điện Áp Ngược Pin Galvanic (External Opposing Voltage Exceeding Cell Potential E_cell) ngăn chặn phản ứng chuỗi ngay từ giai đoạn khởi đầu theo nguyên lý động học xúc tác GDPT 2018.",
    "relatedEquation": "External Opposing Voltage Exceeding Cell Potential E_cell",
    "iupacName": "Reverse Polar Electro-Quench Counter Protocol",
    "archetype": "LE_CHATELIER_EQUILIBRIUM",
    "structuredEffects": [
      {
        "effectId": "B23_EFF_47",
        "activationWindow": "QUICK",
        "operations": [
          {
            "op": "NEGATE_EFFECT",
            "params": {}
          },
          {
            "op": "DESTROY_CARD",
            "params": {
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Spell Speed 3: Vô hiệu hóa kích hoạt của đối thủ và phá hủy lá bài đó."
      }
    ]
  },
  {
    "id": "card_b23_048_counter_nucleation_inhibitor_crystal_shatter_48",
    "name": "Bẫy Triệt Phá Tinh Thể Bằng Chất Ức Chế Mầm (Cấp Độ Phản Kích 6)",
    "name_en": "Nucleation Inhibitor Crystal Shatter (Counter Rank 6)",
    "cardType": "TRAP",
    "spellTrapSubtype": "COUNTER_TRAP",
    "spellSpeed": 3,
    "rarity": "SUPER_RARE",
    "attribute": "NOBLE_VOID",
    "manaCost": 4,
    "chemicalFormula": "Polyphosphate",
    "effectCode": "TRAP_B23_NUCLEATION_INHIBITOR_CRYSTAL_SHATTER_CNTR_48",
    "effectText": "[Bẫy Phản Công / Counter Trap - Spell Speed 3]: Khi đối thủ kích hoạt một lá bài Phép, Bẫy hoặc hiệu ứng quái thú: Vô hiệu hóa kích hoạt đó và phá hủy lá bài của đối thủ!",
    "scientificLore": "Cơ chế triệt tiêu tức thời Bẫy Triệt Phá Tinh Thể Bằng Chất Ức Chế Mầm (Sub-Stoichiometric Threshold Scale Inhibition) ngăn chặn phản ứng chuỗi ngay từ giai đoạn khởi đầu theo nguyên lý động học xúc tác GDPT 2018.",
    "relatedEquation": "Sub-Stoichiometric Threshold Scale Inhibition",
    "iupacName": "Nucleation Inhibitor Crystal Shatter Protocol",
    "archetype": "ELECTROCHEMICAL_CELL",
    "structuredEffects": [
      {
        "effectId": "B23_EFF_48",
        "activationWindow": "QUICK",
        "operations": [
          {
            "op": "NEGATE_EFFECT",
            "params": {}
          },
          {
            "op": "DESTROY_CARD",
            "params": {
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Spell Speed 3: Vô hiệu hóa kích hoạt của đối thủ và phá hủy lá bài đó."
      }
    ]
  },
  {
    "id": "card_b23_049_counter_le_chatelier_counter_displacement_49",
    "name": "Phản Đòn Cân Bằng Động Le Chatelier (Cấp Độ Phản Kích 7)",
    "name_en": "Le Chatelier Counter Displacement (Counter Rank 7)",
    "cardType": "TRAP",
    "spellTrapSubtype": "COUNTER_TRAP",
    "spellSpeed": 3,
    "rarity": "ULTRA_RARE",
    "attribute": "NOBLE_VOID",
    "manaCost": 1,
    "chemicalFormula": "Kc Reversion",
    "effectCode": "TRAP_B23_LE_CHATELIER_COUNTER_DISPLACEMENT_CNTR_49",
    "effectText": "[Bẫy Phản Công / Counter Trap - Spell Speed 3]: Khi đối thủ kích hoạt một lá bài Phép, Bẫy hoặc hiệu ứng quái thú: Vô hiệu hóa kích hoạt đó và phá hủy lá bài của đối thủ!",
    "scientificLore": "Cơ chế triệt tiêu tức thời Phản Đòn Cân Bằng Động Le Chatelier (Instantaneous Shift Neutralizing External Disturbance) ngăn chặn phản ứng chuỗi ngay từ giai đoạn khởi đầu theo nguyên lý động học xúc tác GDPT 2018.",
    "relatedEquation": "Instantaneous Shift Neutralizing External Disturbance",
    "iupacName": "Le Chatelier Counter Displacement Protocol",
    "archetype": "LE_CHATELIER_EQUILIBRIUM",
    "structuredEffects": [
      {
        "effectId": "B23_EFF_49",
        "activationWindow": "QUICK",
        "operations": [
          {
            "op": "NEGATE_EFFECT",
            "params": {}
          },
          {
            "op": "DESTROY_CARD",
            "params": {
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Spell Speed 3: Vô hiệu hóa kích hoạt của đối thủ và phá hủy lá bài đó."
      }
    ]
  },
  {
    "id": "card_b23_050_counter_electrochemical_overpotential_counter_stop_50",
    "name": "Quá Thế Điện Cực Chặn Đứng Dòng Electron (Cấp Độ Phản Kích 7)",
    "name_en": "Electrochemical Overpotential Counter Stop (Counter Rank 7)",
    "cardType": "TRAP",
    "spellTrapSubtype": "COUNTER_TRAP",
    "spellSpeed": 3,
    "rarity": "SECRET_RARE",
    "attribute": "ELECTRO",
    "manaCost": 2,
    "chemicalFormula": "η Overpotential",
    "effectCode": "TRAP_B23_ELECTROCHEMICAL_OVERPOTENTIAL_COUNTER_STOP_CNTR_50",
    "effectText": "[Bẫy Phản Công / Counter Trap - Spell Speed 3]: Khi đối thủ kích hoạt một lá bài Phép, Bẫy hoặc hiệu ứng quái thú: Vô hiệu hóa kích hoạt đó và phá hủy lá bài của đối thủ!",
    "scientificLore": "Cơ chế triệt tiêu tức thời Quá Thế Điện Cực Chặn Đứng Dòng Electron (Kinetic Activation Overpotential Halting Electrolysis) ngăn chặn phản ứng chuỗi ngay từ giai đoạn khởi đầu theo nguyên lý động học xúc tác GDPT 2018.",
    "relatedEquation": "Kinetic Activation Overpotential Halting Electrolysis",
    "iupacName": "Electrochemical Overpotential Counter Stop Protocol",
    "archetype": "ELECTROCHEMICAL_CELL",
    "structuredEffects": [
      {
        "effectId": "B23_EFF_50",
        "activationWindow": "QUICK",
        "operations": [
          {
            "op": "NEGATE_EFFECT",
            "params": {}
          },
          {
            "op": "DESTROY_CARD",
            "params": {
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Spell Speed 3: Vô hiệu hóa kích hoạt của đối thủ và phá hủy lá bài đó."
      }
    ]
  },
  {
    "id": "card_b23_051_counter_catalyst_poison_irreversible_inhibition_51",
    "name": "Chất Độc Xúc Tác Vô Hiệu Trung Tâm Hoạt Hóa (Cấp Độ Phản Kích 7)",
    "name_en": "Catalyst Poison Irreversible Inhibition (Counter Rank 7)",
    "cardType": "TRAP",
    "spellTrapSubtype": "COUNTER_TRAP",
    "spellSpeed": 3,
    "rarity": "COMMON",
    "attribute": "ACID_DARK",
    "manaCost": 3,
    "chemicalFormula": "CO/H2S Poison",
    "effectCode": "TRAP_B23_CATALYST_POISON_IRREVERSIBLE_INHIBITION_CNTR_51",
    "effectText": "[Bẫy Phản Công / Counter Trap - Spell Speed 3]: Khi đối thủ kích hoạt một lá bài Phép, Bẫy hoặc hiệu ứng quái thú: Vô hiệu hóa kích hoạt đó và phá hủy lá bài của đối thủ!",
    "scientificLore": "Cơ chế triệt tiêu tức thời Chất Độc Xúc Tác Vô Hiệu Trung Tâm Hoạt Hóa (Irreversible Chemisorption Blocking Active Catalyst Sites) ngăn chặn phản ứng chuỗi ngay từ giai đoạn khởi đầu theo nguyên lý động học xúc tác GDPT 2018.",
    "relatedEquation": "Irreversible Chemisorption Blocking Active Catalyst Sites",
    "iupacName": "Catalyst Poison Irreversible Inhibition Protocol",
    "archetype": "LE_CHATELIER_EQUILIBRIUM",
    "structuredEffects": [
      {
        "effectId": "B23_EFF_51",
        "activationWindow": "QUICK",
        "operations": [
          {
            "op": "NEGATE_EFFECT",
            "params": {}
          },
          {
            "op": "DESTROY_CARD",
            "params": {
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Spell Speed 3: Vô hiệu hóa kích hoạt của đối thủ và phá hủy lá bài đó."
      }
    ]
  },
  {
    "id": "card_b23_052_counter_chelation_metal_ion_quench_counter_52",
    "name": "Bẫy Triệt Tiêu Hiệu Ứng Bằng Phức Chelate (Cấp Độ Phản Kích 7)",
    "name_en": "Chelation Metal Ion Quench Counter (Counter Rank 7)",
    "cardType": "TRAP",
    "spellTrapSubtype": "COUNTER_TRAP",
    "spellSpeed": 3,
    "rarity": "COMMON",
    "attribute": "AQUA",
    "manaCost": 4,
    "chemicalFormula": "EDTA Binding",
    "effectCode": "TRAP_B23_CHELATION_METAL_ION_QUENCH_COUNTER_CNTR_52",
    "effectText": "[Bẫy Phản Công / Counter Trap - Spell Speed 3]: Khi đối thủ kích hoạt một lá bài Phép, Bẫy hoặc hiệu ứng quái thú: Vô hiệu hóa kích hoạt đó và phá hủy lá bài của đối thủ!",
    "scientificLore": "Cơ chế triệt tiêu tức thời Bẫy Triệt Tiêu Hiệu Ứng Bằng Phức Chelate (Thermodynamic Chelate Effect ΔS > 0 Formation) ngăn chặn phản ứng chuỗi ngay từ giai đoạn khởi đầu theo nguyên lý động học xúc tác GDPT 2018.",
    "relatedEquation": "Thermodynamic Chelate Effect ΔS > 0 Formation",
    "iupacName": "Chelation Metal Ion Quench Counter Protocol",
    "archetype": "ELECTROCHEMICAL_CELL",
    "structuredEffects": [
      {
        "effectId": "B23_EFF_52",
        "activationWindow": "QUICK",
        "operations": [
          {
            "op": "NEGATE_EFFECT",
            "params": {}
          },
          {
            "op": "DESTROY_CARD",
            "params": {
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Spell Speed 3: Vô hiệu hóa kích hoạt của đối thủ và phá hủy lá bài đó."
      }
    ]
  },
  {
    "id": "card_b23_053_counter_universal_buffer_proton_quench_53",
    "name": "Bẫy Đệm Chống Đột Biến Proton pH (Cấp Độ Phản Kích 7)",
    "name_en": "Universal Buffer Proton Quench (Counter Rank 7)",
    "cardType": "TRAP",
    "spellTrapSubtype": "COUNTER_TRAP",
    "spellSpeed": 3,
    "rarity": "COMMON",
    "attribute": "AQUA",
    "manaCost": 1,
    "chemicalFormula": "Buffer Capacity",
    "effectCode": "TRAP_B23_UNIVERSAL_BUFFER_PROTON_QUENCH_CNTR_53",
    "effectText": "[Bẫy Phản Công / Counter Trap - Spell Speed 3]: Khi đối thủ kích hoạt một lá bài Phép, Bẫy hoặc hiệu ứng quái thú: Vô hiệu hóa kích hoạt đó và phá hủy lá bài của đối thủ!",
    "scientificLore": "Cơ chế triệt tiêu tức thời Bẫy Đệm Chống Đột Biến Proton pH (Henderson-Hasselbalch Equation pH Homeostasis) ngăn chặn phản ứng chuỗi ngay từ giai đoạn khởi đầu theo nguyên lý động học xúc tác GDPT 2018.",
    "relatedEquation": "Henderson-Hasselbalch Equation pH Homeostasis",
    "iupacName": "Universal Buffer Proton Quench Protocol",
    "archetype": "LE_CHATELIER_EQUILIBRIUM",
    "structuredEffects": [
      {
        "effectId": "B23_EFF_53",
        "activationWindow": "QUICK",
        "operations": [
          {
            "op": "NEGATE_EFFECT",
            "params": {}
          },
          {
            "op": "DESTROY_CARD",
            "params": {
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Spell Speed 3: Vô hiệu hóa kích hoạt của đối thủ và phá hủy lá bài đó."
      }
    ]
  },
  {
    "id": "card_b23_054_counter_free_radical_scavenger_chain_terminator_54",
    "name": "Bẫy Khử Gốc Tự Do Bằng Chất Chống Oxi Hóa (Cấp Độ Phản Kích 7)",
    "name_en": "Free Radical Scavenger Chain Terminator (Counter Rank 7)",
    "cardType": "TRAP",
    "spellTrapSubtype": "COUNTER_TRAP",
    "spellSpeed": 3,
    "rarity": "RARE",
    "attribute": "TERRA",
    "manaCost": 2,
    "chemicalFormula": "Antioxidant",
    "effectCode": "TRAP_B23_FREE_RADICAL_SCAVENGER_CHAIN_TERMINATOR_CNTR_54",
    "effectText": "[Bẫy Phản Công / Counter Trap - Spell Speed 3]: Khi đối thủ kích hoạt một lá bài Phép, Bẫy hoặc hiệu ứng quái thú: Vô hiệu hóa kích hoạt đó và phá hủy lá bài của đối thủ!",
    "scientificLore": "Cơ chế triệt tiêu tức thời Bẫy Khử Gốc Tự Do Bằng Chất Chống Oxi Hóa (R· + Inh-H → RH + Inh· (Stable Inactive Radical)) ngăn chặn phản ứng chuỗi ngay từ giai đoạn khởi đầu theo nguyên lý động học xúc tác GDPT 2018.",
    "relatedEquation": "R· + Inh-H → RH + Inh· (Stable Inactive Radical)",
    "iupacName": "Free Radical Scavenger Chain Terminator Protocol",
    "archetype": "ELECTROCHEMICAL_CELL",
    "structuredEffects": [
      {
        "effectId": "B23_EFF_54",
        "activationWindow": "QUICK",
        "operations": [
          {
            "op": "NEGATE_EFFECT",
            "params": {}
          },
          {
            "op": "DESTROY_CARD",
            "params": {
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Spell Speed 3: Vô hiệu hóa kích hoạt của đối thủ và phá hủy lá bài đó."
      }
    ]
  },
  {
    "id": "card_b23_055_counter_reverse_polar_electro_quench_counter_55",
    "name": "Bẫy Kháng Điện Áp Ngược Pin Galvanic (Cấp Độ Phản Kích 7)",
    "name_en": "Reverse Polar Electro-Quench Counter (Counter Rank 7)",
    "cardType": "TRAP",
    "spellTrapSubtype": "COUNTER_TRAP",
    "spellSpeed": 3,
    "rarity": "RARE",
    "attribute": "ELECTRO",
    "manaCost": 3,
    "chemicalFormula": "Back-EMF",
    "effectCode": "TRAP_B23_REVERSE_POLAR_ELECTRO_QUENCH_COUNTER_CNTR_55",
    "effectText": "[Bẫy Phản Công / Counter Trap - Spell Speed 3]: Khi đối thủ kích hoạt một lá bài Phép, Bẫy hoặc hiệu ứng quái thú: Vô hiệu hóa kích hoạt đó và phá hủy lá bài của đối thủ!",
    "scientificLore": "Cơ chế triệt tiêu tức thời Bẫy Kháng Điện Áp Ngược Pin Galvanic (External Opposing Voltage Exceeding Cell Potential E_cell) ngăn chặn phản ứng chuỗi ngay từ giai đoạn khởi đầu theo nguyên lý động học xúc tác GDPT 2018.",
    "relatedEquation": "External Opposing Voltage Exceeding Cell Potential E_cell",
    "iupacName": "Reverse Polar Electro-Quench Counter Protocol",
    "archetype": "LE_CHATELIER_EQUILIBRIUM",
    "structuredEffects": [
      {
        "effectId": "B23_EFF_55",
        "activationWindow": "QUICK",
        "operations": [
          {
            "op": "NEGATE_EFFECT",
            "params": {}
          },
          {
            "op": "DESTROY_CARD",
            "params": {
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Spell Speed 3: Vô hiệu hóa kích hoạt của đối thủ và phá hủy lá bài đó."
      }
    ]
  },
  {
    "id": "card_b23_056_counter_nucleation_inhibitor_crystal_shatter_56",
    "name": "Bẫy Triệt Phá Tinh Thể Bằng Chất Ức Chế Mầm (Cấp Độ Phản Kích 7)",
    "name_en": "Nucleation Inhibitor Crystal Shatter (Counter Rank 7)",
    "cardType": "TRAP",
    "spellTrapSubtype": "COUNTER_TRAP",
    "spellSpeed": 3,
    "rarity": "SUPER_RARE",
    "attribute": "NOBLE_VOID",
    "manaCost": 4,
    "chemicalFormula": "Polyphosphate",
    "effectCode": "TRAP_B23_NUCLEATION_INHIBITOR_CRYSTAL_SHATTER_CNTR_56",
    "effectText": "[Bẫy Phản Công / Counter Trap - Spell Speed 3]: Khi đối thủ kích hoạt một lá bài Phép, Bẫy hoặc hiệu ứng quái thú: Vô hiệu hóa kích hoạt đó và phá hủy lá bài của đối thủ!",
    "scientificLore": "Cơ chế triệt tiêu tức thời Bẫy Triệt Phá Tinh Thể Bằng Chất Ức Chế Mầm (Sub-Stoichiometric Threshold Scale Inhibition) ngăn chặn phản ứng chuỗi ngay từ giai đoạn khởi đầu theo nguyên lý động học xúc tác GDPT 2018.",
    "relatedEquation": "Sub-Stoichiometric Threshold Scale Inhibition",
    "iupacName": "Nucleation Inhibitor Crystal Shatter Protocol",
    "archetype": "ELECTROCHEMICAL_CELL",
    "structuredEffects": [
      {
        "effectId": "B23_EFF_56",
        "activationWindow": "QUICK",
        "operations": [
          {
            "op": "NEGATE_EFFECT",
            "params": {}
          },
          {
            "op": "DESTROY_CARD",
            "params": {
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Spell Speed 3: Vô hiệu hóa kích hoạt của đối thủ và phá hủy lá bài đó."
      }
    ]
  },
  {
    "id": "card_b23_057_counter_le_chatelier_counter_displacement_57",
    "name": "Phản Đòn Cân Bằng Động Le Chatelier (Cấp Độ Phản Kích 8)",
    "name_en": "Le Chatelier Counter Displacement (Counter Rank 8)",
    "cardType": "TRAP",
    "spellTrapSubtype": "COUNTER_TRAP",
    "spellSpeed": 3,
    "rarity": "SUPER_RARE",
    "attribute": "NOBLE_VOID",
    "manaCost": 1,
    "chemicalFormula": "Kc Reversion",
    "effectCode": "TRAP_B23_LE_CHATELIER_COUNTER_DISPLACEMENT_CNTR_57",
    "effectText": "[Bẫy Phản Công / Counter Trap - Spell Speed 3]: Khi đối thủ kích hoạt một lá bài Phép, Bẫy hoặc hiệu ứng quái thú: Vô hiệu hóa kích hoạt đó và phá hủy lá bài của đối thủ!",
    "scientificLore": "Cơ chế triệt tiêu tức thời Phản Đòn Cân Bằng Động Le Chatelier (Instantaneous Shift Neutralizing External Disturbance) ngăn chặn phản ứng chuỗi ngay từ giai đoạn khởi đầu theo nguyên lý động học xúc tác GDPT 2018.",
    "relatedEquation": "Instantaneous Shift Neutralizing External Disturbance",
    "iupacName": "Le Chatelier Counter Displacement Protocol",
    "archetype": "LE_CHATELIER_EQUILIBRIUM",
    "structuredEffects": [
      {
        "effectId": "B23_EFF_57",
        "activationWindow": "QUICK",
        "operations": [
          {
            "op": "NEGATE_EFFECT",
            "params": {}
          },
          {
            "op": "DESTROY_CARD",
            "params": {
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Spell Speed 3: Vô hiệu hóa kích hoạt của đối thủ và phá hủy lá bài đó."
      }
    ]
  },
  {
    "id": "card_b23_058_counter_electrochemical_overpotential_counter_stop_58",
    "name": "Quá Thế Điện Cực Chặn Đứng Dòng Electron (Cấp Độ Phản Kích 8)",
    "name_en": "Electrochemical Overpotential Counter Stop (Counter Rank 8)",
    "cardType": "TRAP",
    "spellTrapSubtype": "COUNTER_TRAP",
    "spellSpeed": 3,
    "rarity": "ULTRA_RARE",
    "attribute": "ELECTRO",
    "manaCost": 2,
    "chemicalFormula": "η Overpotential",
    "effectCode": "TRAP_B23_ELECTROCHEMICAL_OVERPOTENTIAL_COUNTER_STOP_CNTR_58",
    "effectText": "[Bẫy Phản Công / Counter Trap - Spell Speed 3]: Khi đối thủ kích hoạt một lá bài Phép, Bẫy hoặc hiệu ứng quái thú: Vô hiệu hóa kích hoạt đó và phá hủy lá bài của đối thủ!",
    "scientificLore": "Cơ chế triệt tiêu tức thời Quá Thế Điện Cực Chặn Đứng Dòng Electron (Kinetic Activation Overpotential Halting Electrolysis) ngăn chặn phản ứng chuỗi ngay từ giai đoạn khởi đầu theo nguyên lý động học xúc tác GDPT 2018.",
    "relatedEquation": "Kinetic Activation Overpotential Halting Electrolysis",
    "iupacName": "Electrochemical Overpotential Counter Stop Protocol",
    "archetype": "ELECTROCHEMICAL_CELL",
    "structuredEffects": [
      {
        "effectId": "B23_EFF_58",
        "activationWindow": "QUICK",
        "operations": [
          {
            "op": "NEGATE_EFFECT",
            "params": {}
          },
          {
            "op": "DESTROY_CARD",
            "params": {
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Spell Speed 3: Vô hiệu hóa kích hoạt của đối thủ và phá hủy lá bài đó."
      }
    ]
  },
  {
    "id": "card_b23_059_counter_catalyst_poison_irreversible_inhibition_59",
    "name": "Chất Độc Xúc Tác Vô Hiệu Trung Tâm Hoạt Hóa (Cấp Độ Phản Kích 8)",
    "name_en": "Catalyst Poison Irreversible Inhibition (Counter Rank 8)",
    "cardType": "TRAP",
    "spellTrapSubtype": "COUNTER_TRAP",
    "spellSpeed": 3,
    "rarity": "SECRET_RARE",
    "attribute": "ACID_DARK",
    "manaCost": 3,
    "chemicalFormula": "CO/H2S Poison",
    "effectCode": "TRAP_B23_CATALYST_POISON_IRREVERSIBLE_INHIBITION_CNTR_59",
    "effectText": "[Bẫy Phản Công / Counter Trap - Spell Speed 3]: Khi đối thủ kích hoạt một lá bài Phép, Bẫy hoặc hiệu ứng quái thú: Vô hiệu hóa kích hoạt đó và phá hủy lá bài của đối thủ!",
    "scientificLore": "Cơ chế triệt tiêu tức thời Chất Độc Xúc Tác Vô Hiệu Trung Tâm Hoạt Hóa (Irreversible Chemisorption Blocking Active Catalyst Sites) ngăn chặn phản ứng chuỗi ngay từ giai đoạn khởi đầu theo nguyên lý động học xúc tác GDPT 2018.",
    "relatedEquation": "Irreversible Chemisorption Blocking Active Catalyst Sites",
    "iupacName": "Catalyst Poison Irreversible Inhibition Protocol",
    "archetype": "LE_CHATELIER_EQUILIBRIUM",
    "structuredEffects": [
      {
        "effectId": "B23_EFF_59",
        "activationWindow": "QUICK",
        "operations": [
          {
            "op": "NEGATE_EFFECT",
            "params": {}
          },
          {
            "op": "DESTROY_CARD",
            "params": {
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Spell Speed 3: Vô hiệu hóa kích hoạt của đối thủ và phá hủy lá bài đó."
      }
    ]
  },
  {
    "id": "card_b23_060_counter_chelation_metal_ion_quench_counter_60",
    "name": "Bẫy Triệt Tiêu Hiệu Ứng Bằng Phức Chelate (Cấp Độ Phản Kích 8)",
    "name_en": "Chelation Metal Ion Quench Counter (Counter Rank 8)",
    "cardType": "TRAP",
    "spellTrapSubtype": "COUNTER_TRAP",
    "spellSpeed": 3,
    "rarity": "COMMON",
    "attribute": "AQUA",
    "manaCost": 4,
    "chemicalFormula": "EDTA Binding",
    "effectCode": "TRAP_B23_CHELATION_METAL_ION_QUENCH_COUNTER_CNTR_60",
    "effectText": "[Bẫy Phản Công / Counter Trap - Spell Speed 3]: Khi đối thủ kích hoạt một lá bài Phép, Bẫy hoặc hiệu ứng quái thú: Vô hiệu hóa kích hoạt đó và phá hủy lá bài của đối thủ!",
    "scientificLore": "Cơ chế triệt tiêu tức thời Bẫy Triệt Tiêu Hiệu Ứng Bằng Phức Chelate (Thermodynamic Chelate Effect ΔS > 0 Formation) ngăn chặn phản ứng chuỗi ngay từ giai đoạn khởi đầu theo nguyên lý động học xúc tác GDPT 2018.",
    "relatedEquation": "Thermodynamic Chelate Effect ΔS > 0 Formation",
    "iupacName": "Chelation Metal Ion Quench Counter Protocol",
    "archetype": "ELECTROCHEMICAL_CELL",
    "structuredEffects": [
      {
        "effectId": "B23_EFF_60",
        "activationWindow": "QUICK",
        "operations": [
          {
            "op": "NEGATE_EFFECT",
            "params": {}
          },
          {
            "op": "DESTROY_CARD",
            "params": {
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Spell Speed 3: Vô hiệu hóa kích hoạt của đối thủ và phá hủy lá bài đó."
      }
    ]
  },
  {
    "id": "card_b23_061_counter_universal_buffer_proton_quench_61",
    "name": "Bẫy Đệm Chống Đột Biến Proton pH (Cấp Độ Phản Kích 8)",
    "name_en": "Universal Buffer Proton Quench (Counter Rank 8)",
    "cardType": "TRAP",
    "spellTrapSubtype": "COUNTER_TRAP",
    "spellSpeed": 3,
    "rarity": "COMMON",
    "attribute": "AQUA",
    "manaCost": 1,
    "chemicalFormula": "Buffer Capacity",
    "effectCode": "TRAP_B23_UNIVERSAL_BUFFER_PROTON_QUENCH_CNTR_61",
    "effectText": "[Bẫy Phản Công / Counter Trap - Spell Speed 3]: Khi đối thủ kích hoạt một lá bài Phép, Bẫy hoặc hiệu ứng quái thú: Vô hiệu hóa kích hoạt đó và phá hủy lá bài của đối thủ!",
    "scientificLore": "Cơ chế triệt tiêu tức thời Bẫy Đệm Chống Đột Biến Proton pH (Henderson-Hasselbalch Equation pH Homeostasis) ngăn chặn phản ứng chuỗi ngay từ giai đoạn khởi đầu theo nguyên lý động học xúc tác GDPT 2018.",
    "relatedEquation": "Henderson-Hasselbalch Equation pH Homeostasis",
    "iupacName": "Universal Buffer Proton Quench Protocol",
    "archetype": "LE_CHATELIER_EQUILIBRIUM",
    "structuredEffects": [
      {
        "effectId": "B23_EFF_61",
        "activationWindow": "QUICK",
        "operations": [
          {
            "op": "NEGATE_EFFECT",
            "params": {}
          },
          {
            "op": "DESTROY_CARD",
            "params": {
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Spell Speed 3: Vô hiệu hóa kích hoạt của đối thủ và phá hủy lá bài đó."
      }
    ]
  },
  {
    "id": "card_b23_062_counter_free_radical_scavenger_chain_terminator_62",
    "name": "Bẫy Khử Gốc Tự Do Bằng Chất Chống Oxi Hóa (Cấp Độ Phản Kích 8)",
    "name_en": "Free Radical Scavenger Chain Terminator (Counter Rank 8)",
    "cardType": "TRAP",
    "spellTrapSubtype": "COUNTER_TRAP",
    "spellSpeed": 3,
    "rarity": "COMMON",
    "attribute": "TERRA",
    "manaCost": 2,
    "chemicalFormula": "Antioxidant",
    "effectCode": "TRAP_B23_FREE_RADICAL_SCAVENGER_CHAIN_TERMINATOR_CNTR_62",
    "effectText": "[Bẫy Phản Công / Counter Trap - Spell Speed 3]: Khi đối thủ kích hoạt một lá bài Phép, Bẫy hoặc hiệu ứng quái thú: Vô hiệu hóa kích hoạt đó và phá hủy lá bài của đối thủ!",
    "scientificLore": "Cơ chế triệt tiêu tức thời Bẫy Khử Gốc Tự Do Bằng Chất Chống Oxi Hóa (R· + Inh-H → RH + Inh· (Stable Inactive Radical)) ngăn chặn phản ứng chuỗi ngay từ giai đoạn khởi đầu theo nguyên lý động học xúc tác GDPT 2018.",
    "relatedEquation": "R· + Inh-H → RH + Inh· (Stable Inactive Radical)",
    "iupacName": "Free Radical Scavenger Chain Terminator Protocol",
    "archetype": "ELECTROCHEMICAL_CELL",
    "structuredEffects": [
      {
        "effectId": "B23_EFF_62",
        "activationWindow": "QUICK",
        "operations": [
          {
            "op": "NEGATE_EFFECT",
            "params": {}
          },
          {
            "op": "DESTROY_CARD",
            "params": {
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Spell Speed 3: Vô hiệu hóa kích hoạt của đối thủ và phá hủy lá bài đó."
      }
    ]
  },
  {
    "id": "card_b23_063_counter_reverse_polar_electro_quench_counter_63",
    "name": "Bẫy Kháng Điện Áp Ngược Pin Galvanic (Cấp Độ Phản Kích 8)",
    "name_en": "Reverse Polar Electro-Quench Counter (Counter Rank 8)",
    "cardType": "TRAP",
    "spellTrapSubtype": "COUNTER_TRAP",
    "spellSpeed": 3,
    "rarity": "RARE",
    "attribute": "ELECTRO",
    "manaCost": 3,
    "chemicalFormula": "Back-EMF",
    "effectCode": "TRAP_B23_REVERSE_POLAR_ELECTRO_QUENCH_COUNTER_CNTR_63",
    "effectText": "[Bẫy Phản Công / Counter Trap - Spell Speed 3]: Khi đối thủ kích hoạt một lá bài Phép, Bẫy hoặc hiệu ứng quái thú: Vô hiệu hóa kích hoạt đó và phá hủy lá bài của đối thủ!",
    "scientificLore": "Cơ chế triệt tiêu tức thời Bẫy Kháng Điện Áp Ngược Pin Galvanic (External Opposing Voltage Exceeding Cell Potential E_cell) ngăn chặn phản ứng chuỗi ngay từ giai đoạn khởi đầu theo nguyên lý động học xúc tác GDPT 2018.",
    "relatedEquation": "External Opposing Voltage Exceeding Cell Potential E_cell",
    "iupacName": "Reverse Polar Electro-Quench Counter Protocol",
    "archetype": "LE_CHATELIER_EQUILIBRIUM",
    "structuredEffects": [
      {
        "effectId": "B23_EFF_63",
        "activationWindow": "QUICK",
        "operations": [
          {
            "op": "NEGATE_EFFECT",
            "params": {}
          },
          {
            "op": "DESTROY_CARD",
            "params": {
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Spell Speed 3: Vô hiệu hóa kích hoạt của đối thủ và phá hủy lá bài đó."
      }
    ]
  },
  {
    "id": "card_b23_064_counter_nucleation_inhibitor_crystal_shatter_64",
    "name": "Bẫy Triệt Phá Tinh Thể Bằng Chất Ức Chế Mầm (Cấp Độ Phản Kích 8)",
    "name_en": "Nucleation Inhibitor Crystal Shatter (Counter Rank 8)",
    "cardType": "TRAP",
    "spellTrapSubtype": "COUNTER_TRAP",
    "spellSpeed": 3,
    "rarity": "RARE",
    "attribute": "NOBLE_VOID",
    "manaCost": 4,
    "chemicalFormula": "Polyphosphate",
    "effectCode": "TRAP_B23_NUCLEATION_INHIBITOR_CRYSTAL_SHATTER_CNTR_64",
    "effectText": "[Bẫy Phản Công / Counter Trap - Spell Speed 3]: Khi đối thủ kích hoạt một lá bài Phép, Bẫy hoặc hiệu ứng quái thú: Vô hiệu hóa kích hoạt đó và phá hủy lá bài của đối thủ!",
    "scientificLore": "Cơ chế triệt tiêu tức thời Bẫy Triệt Phá Tinh Thể Bằng Chất Ức Chế Mầm (Sub-Stoichiometric Threshold Scale Inhibition) ngăn chặn phản ứng chuỗi ngay từ giai đoạn khởi đầu theo nguyên lý động học xúc tác GDPT 2018.",
    "relatedEquation": "Sub-Stoichiometric Threshold Scale Inhibition",
    "iupacName": "Nucleation Inhibitor Crystal Shatter Protocol",
    "archetype": "ELECTROCHEMICAL_CELL",
    "structuredEffects": [
      {
        "effectId": "B23_EFF_64",
        "activationWindow": "QUICK",
        "operations": [
          {
            "op": "NEGATE_EFFECT",
            "params": {}
          },
          {
            "op": "DESTROY_CARD",
            "params": {
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Spell Speed 3: Vô hiệu hóa kích hoạt của đối thủ và phá hủy lá bài đó."
      }
    ]
  },
  {
    "id": "card_b23_065_counter_le_chatelier_counter_displacement_65",
    "name": "Phản Đòn Cân Bằng Động Le Chatelier (Cấp Độ Phản Kích 9)",
    "name_en": "Le Chatelier Counter Displacement (Counter Rank 9)",
    "cardType": "TRAP",
    "spellTrapSubtype": "COUNTER_TRAP",
    "spellSpeed": 3,
    "rarity": "SUPER_RARE",
    "attribute": "NOBLE_VOID",
    "manaCost": 1,
    "chemicalFormula": "Kc Reversion",
    "effectCode": "TRAP_B23_LE_CHATELIER_COUNTER_DISPLACEMENT_CNTR_65",
    "effectText": "[Bẫy Phản Công / Counter Trap - Spell Speed 3]: Khi đối thủ kích hoạt một lá bài Phép, Bẫy hoặc hiệu ứng quái thú: Vô hiệu hóa kích hoạt đó và phá hủy lá bài của đối thủ!",
    "scientificLore": "Cơ chế triệt tiêu tức thời Phản Đòn Cân Bằng Động Le Chatelier (Instantaneous Shift Neutralizing External Disturbance) ngăn chặn phản ứng chuỗi ngay từ giai đoạn khởi đầu theo nguyên lý động học xúc tác GDPT 2018.",
    "relatedEquation": "Instantaneous Shift Neutralizing External Disturbance",
    "iupacName": "Le Chatelier Counter Displacement Protocol",
    "archetype": "LE_CHATELIER_EQUILIBRIUM",
    "structuredEffects": [
      {
        "effectId": "B23_EFF_65",
        "activationWindow": "QUICK",
        "operations": [
          {
            "op": "NEGATE_EFFECT",
            "params": {}
          },
          {
            "op": "DESTROY_CARD",
            "params": {
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Spell Speed 3: Vô hiệu hóa kích hoạt của đối thủ và phá hủy lá bài đó."
      }
    ]
  },
  {
    "id": "card_b23_066_counter_electrochemical_overpotential_counter_stop_66",
    "name": "Quá Thế Điện Cực Chặn Đứng Dòng Electron (Cấp Độ Phản Kích 9)",
    "name_en": "Electrochemical Overpotential Counter Stop (Counter Rank 9)",
    "cardType": "TRAP",
    "spellTrapSubtype": "COUNTER_TRAP",
    "spellSpeed": 3,
    "rarity": "SUPER_RARE",
    "attribute": "ELECTRO",
    "manaCost": 2,
    "chemicalFormula": "η Overpotential",
    "effectCode": "TRAP_B23_ELECTROCHEMICAL_OVERPOTENTIAL_COUNTER_STOP_CNTR_66",
    "effectText": "[Bẫy Phản Công / Counter Trap - Spell Speed 3]: Khi đối thủ kích hoạt một lá bài Phép, Bẫy hoặc hiệu ứng quái thú: Vô hiệu hóa kích hoạt đó và phá hủy lá bài của đối thủ!",
    "scientificLore": "Cơ chế triệt tiêu tức thời Quá Thế Điện Cực Chặn Đứng Dòng Electron (Kinetic Activation Overpotential Halting Electrolysis) ngăn chặn phản ứng chuỗi ngay từ giai đoạn khởi đầu theo nguyên lý động học xúc tác GDPT 2018.",
    "relatedEquation": "Kinetic Activation Overpotential Halting Electrolysis",
    "iupacName": "Electrochemical Overpotential Counter Stop Protocol",
    "archetype": "ELECTROCHEMICAL_CELL",
    "structuredEffects": [
      {
        "effectId": "B23_EFF_66",
        "activationWindow": "QUICK",
        "operations": [
          {
            "op": "NEGATE_EFFECT",
            "params": {}
          },
          {
            "op": "DESTROY_CARD",
            "params": {
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Spell Speed 3: Vô hiệu hóa kích hoạt của đối thủ và phá hủy lá bài đó."
      }
    ]
  },
  {
    "id": "card_b23_067_counter_catalyst_poison_irreversible_inhibition_67",
    "name": "Chất Độc Xúc Tác Vô Hiệu Trung Tâm Hoạt Hóa (Cấp Độ Phản Kích 9)",
    "name_en": "Catalyst Poison Irreversible Inhibition (Counter Rank 9)",
    "cardType": "TRAP",
    "spellTrapSubtype": "COUNTER_TRAP",
    "spellSpeed": 3,
    "rarity": "ULTRA_RARE",
    "attribute": "ACID_DARK",
    "manaCost": 3,
    "chemicalFormula": "CO/H2S Poison",
    "effectCode": "TRAP_B23_CATALYST_POISON_IRREVERSIBLE_INHIBITION_CNTR_67",
    "effectText": "[Bẫy Phản Công / Counter Trap - Spell Speed 3]: Khi đối thủ kích hoạt một lá bài Phép, Bẫy hoặc hiệu ứng quái thú: Vô hiệu hóa kích hoạt đó và phá hủy lá bài của đối thủ!",
    "scientificLore": "Cơ chế triệt tiêu tức thời Chất Độc Xúc Tác Vô Hiệu Trung Tâm Hoạt Hóa (Irreversible Chemisorption Blocking Active Catalyst Sites) ngăn chặn phản ứng chuỗi ngay từ giai đoạn khởi đầu theo nguyên lý động học xúc tác GDPT 2018.",
    "relatedEquation": "Irreversible Chemisorption Blocking Active Catalyst Sites",
    "iupacName": "Catalyst Poison Irreversible Inhibition Protocol",
    "archetype": "LE_CHATELIER_EQUILIBRIUM",
    "structuredEffects": [
      {
        "effectId": "B23_EFF_67",
        "activationWindow": "QUICK",
        "operations": [
          {
            "op": "NEGATE_EFFECT",
            "params": {}
          },
          {
            "op": "DESTROY_CARD",
            "params": {
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Spell Speed 3: Vô hiệu hóa kích hoạt của đối thủ và phá hủy lá bài đó."
      }
    ]
  },
  {
    "id": "card_b23_068_counter_chelation_metal_ion_quench_counter_68",
    "name": "Bẫy Triệt Tiêu Hiệu Ứng Bằng Phức Chelate (Cấp Độ Phản Kích 9)",
    "name_en": "Chelation Metal Ion Quench Counter (Counter Rank 9)",
    "cardType": "TRAP",
    "spellTrapSubtype": "COUNTER_TRAP",
    "spellSpeed": 3,
    "rarity": "SECRET_RARE",
    "attribute": "AQUA",
    "manaCost": 4,
    "chemicalFormula": "EDTA Binding",
    "effectCode": "TRAP_B23_CHELATION_METAL_ION_QUENCH_COUNTER_CNTR_68",
    "effectText": "[Bẫy Phản Công / Counter Trap - Spell Speed 3]: Khi đối thủ kích hoạt một lá bài Phép, Bẫy hoặc hiệu ứng quái thú: Vô hiệu hóa kích hoạt đó và phá hủy lá bài của đối thủ!",
    "scientificLore": "Cơ chế triệt tiêu tức thời Bẫy Triệt Tiêu Hiệu Ứng Bằng Phức Chelate (Thermodynamic Chelate Effect ΔS > 0 Formation) ngăn chặn phản ứng chuỗi ngay từ giai đoạn khởi đầu theo nguyên lý động học xúc tác GDPT 2018.",
    "relatedEquation": "Thermodynamic Chelate Effect ΔS > 0 Formation",
    "iupacName": "Chelation Metal Ion Quench Counter Protocol",
    "archetype": "ELECTROCHEMICAL_CELL",
    "structuredEffects": [
      {
        "effectId": "B23_EFF_68",
        "activationWindow": "QUICK",
        "operations": [
          {
            "op": "NEGATE_EFFECT",
            "params": {}
          },
          {
            "op": "DESTROY_CARD",
            "params": {
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Spell Speed 3: Vô hiệu hóa kích hoạt của đối thủ và phá hủy lá bài đó."
      }
    ]
  },
  {
    "id": "card_b23_069_counter_universal_buffer_proton_quench_69",
    "name": "Bẫy Đệm Chống Đột Biến Proton pH (Cấp Độ Phản Kích 9)",
    "name_en": "Universal Buffer Proton Quench (Counter Rank 9)",
    "cardType": "TRAP",
    "spellTrapSubtype": "COUNTER_TRAP",
    "spellSpeed": 3,
    "rarity": "COMMON",
    "attribute": "AQUA",
    "manaCost": 1,
    "chemicalFormula": "Buffer Capacity",
    "effectCode": "TRAP_B23_UNIVERSAL_BUFFER_PROTON_QUENCH_CNTR_69",
    "effectText": "[Bẫy Phản Công / Counter Trap - Spell Speed 3]: Khi đối thủ kích hoạt một lá bài Phép, Bẫy hoặc hiệu ứng quái thú: Vô hiệu hóa kích hoạt đó và phá hủy lá bài của đối thủ!",
    "scientificLore": "Cơ chế triệt tiêu tức thời Bẫy Đệm Chống Đột Biến Proton pH (Henderson-Hasselbalch Equation pH Homeostasis) ngăn chặn phản ứng chuỗi ngay từ giai đoạn khởi đầu theo nguyên lý động học xúc tác GDPT 2018.",
    "relatedEquation": "Henderson-Hasselbalch Equation pH Homeostasis",
    "iupacName": "Universal Buffer Proton Quench Protocol",
    "archetype": "LE_CHATELIER_EQUILIBRIUM",
    "structuredEffects": [
      {
        "effectId": "B23_EFF_69",
        "activationWindow": "QUICK",
        "operations": [
          {
            "op": "NEGATE_EFFECT",
            "params": {}
          },
          {
            "op": "DESTROY_CARD",
            "params": {
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Spell Speed 3: Vô hiệu hóa kích hoạt của đối thủ và phá hủy lá bài đó."
      }
    ]
  },
  {
    "id": "card_b23_070_counter_free_radical_scavenger_chain_terminator_70",
    "name": "Bẫy Khử Gốc Tự Do Bằng Chất Chống Oxi Hóa (Cấp Độ Phản Kích 9)",
    "name_en": "Free Radical Scavenger Chain Terminator (Counter Rank 9)",
    "cardType": "TRAP",
    "spellTrapSubtype": "COUNTER_TRAP",
    "spellSpeed": 3,
    "rarity": "COMMON",
    "attribute": "TERRA",
    "manaCost": 2,
    "chemicalFormula": "Antioxidant",
    "effectCode": "TRAP_B23_FREE_RADICAL_SCAVENGER_CHAIN_TERMINATOR_CNTR_70",
    "effectText": "[Bẫy Phản Công / Counter Trap - Spell Speed 3]: Khi đối thủ kích hoạt một lá bài Phép, Bẫy hoặc hiệu ứng quái thú: Vô hiệu hóa kích hoạt đó và phá hủy lá bài của đối thủ!",
    "scientificLore": "Cơ chế triệt tiêu tức thời Bẫy Khử Gốc Tự Do Bằng Chất Chống Oxi Hóa (R· + Inh-H → RH + Inh· (Stable Inactive Radical)) ngăn chặn phản ứng chuỗi ngay từ giai đoạn khởi đầu theo nguyên lý động học xúc tác GDPT 2018.",
    "relatedEquation": "R· + Inh-H → RH + Inh· (Stable Inactive Radical)",
    "iupacName": "Free Radical Scavenger Chain Terminator Protocol",
    "archetype": "ELECTROCHEMICAL_CELL",
    "structuredEffects": [
      {
        "effectId": "B23_EFF_70",
        "activationWindow": "QUICK",
        "operations": [
          {
            "op": "NEGATE_EFFECT",
            "params": {}
          },
          {
            "op": "DESTROY_CARD",
            "params": {
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Spell Speed 3: Vô hiệu hóa kích hoạt của đối thủ và phá hủy lá bài đó."
      }
    ]
  },
  {
    "id": "card_b23_071_counter_reverse_polar_electro_quench_counter_71",
    "name": "Bẫy Kháng Điện Áp Ngược Pin Galvanic (Cấp Độ Phản Kích 9)",
    "name_en": "Reverse Polar Electro-Quench Counter (Counter Rank 9)",
    "cardType": "TRAP",
    "spellTrapSubtype": "COUNTER_TRAP",
    "spellSpeed": 3,
    "rarity": "COMMON",
    "attribute": "ELECTRO",
    "manaCost": 3,
    "chemicalFormula": "Back-EMF",
    "effectCode": "TRAP_B23_REVERSE_POLAR_ELECTRO_QUENCH_COUNTER_CNTR_71",
    "effectText": "[Bẫy Phản Công / Counter Trap - Spell Speed 3]: Khi đối thủ kích hoạt một lá bài Phép, Bẫy hoặc hiệu ứng quái thú: Vô hiệu hóa kích hoạt đó và phá hủy lá bài của đối thủ!",
    "scientificLore": "Cơ chế triệt tiêu tức thời Bẫy Kháng Điện Áp Ngược Pin Galvanic (External Opposing Voltage Exceeding Cell Potential E_cell) ngăn chặn phản ứng chuỗi ngay từ giai đoạn khởi đầu theo nguyên lý động học xúc tác GDPT 2018.",
    "relatedEquation": "External Opposing Voltage Exceeding Cell Potential E_cell",
    "iupacName": "Reverse Polar Electro-Quench Counter Protocol",
    "archetype": "LE_CHATELIER_EQUILIBRIUM",
    "structuredEffects": [
      {
        "effectId": "B23_EFF_71",
        "activationWindow": "QUICK",
        "operations": [
          {
            "op": "NEGATE_EFFECT",
            "params": {}
          },
          {
            "op": "DESTROY_CARD",
            "params": {
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Spell Speed 3: Vô hiệu hóa kích hoạt của đối thủ và phá hủy lá bài đó."
      }
    ]
  },
  {
    "id": "card_b23_072_counter_nucleation_inhibitor_crystal_shatter_72",
    "name": "Bẫy Triệt Phá Tinh Thể Bằng Chất Ức Chế Mầm (Cấp Độ Phản Kích 9)",
    "name_en": "Nucleation Inhibitor Crystal Shatter (Counter Rank 9)",
    "cardType": "TRAP",
    "spellTrapSubtype": "COUNTER_TRAP",
    "spellSpeed": 3,
    "rarity": "RARE",
    "attribute": "NOBLE_VOID",
    "manaCost": 4,
    "chemicalFormula": "Polyphosphate",
    "effectCode": "TRAP_B23_NUCLEATION_INHIBITOR_CRYSTAL_SHATTER_CNTR_72",
    "effectText": "[Bẫy Phản Công / Counter Trap - Spell Speed 3]: Khi đối thủ kích hoạt một lá bài Phép, Bẫy hoặc hiệu ứng quái thú: Vô hiệu hóa kích hoạt đó và phá hủy lá bài của đối thủ!",
    "scientificLore": "Cơ chế triệt tiêu tức thời Bẫy Triệt Phá Tinh Thể Bằng Chất Ức Chế Mầm (Sub-Stoichiometric Threshold Scale Inhibition) ngăn chặn phản ứng chuỗi ngay từ giai đoạn khởi đầu theo nguyên lý động học xúc tác GDPT 2018.",
    "relatedEquation": "Sub-Stoichiometric Threshold Scale Inhibition",
    "iupacName": "Nucleation Inhibitor Crystal Shatter Protocol",
    "archetype": "ELECTROCHEMICAL_CELL",
    "structuredEffects": [
      {
        "effectId": "B23_EFF_72",
        "activationWindow": "QUICK",
        "operations": [
          {
            "op": "NEGATE_EFFECT",
            "params": {}
          },
          {
            "op": "DESTROY_CARD",
            "params": {
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Spell Speed 3: Vô hiệu hóa kích hoạt của đối thủ và phá hủy lá bài đó."
      }
    ]
  },
  {
    "id": "card_b23_073_counter_le_chatelier_counter_displacement_73",
    "name": "Phản Đòn Cân Bằng Động Le Chatelier (Cấp Độ Phản Kích 10)",
    "name_en": "Le Chatelier Counter Displacement (Counter Rank 10)",
    "cardType": "TRAP",
    "spellTrapSubtype": "COUNTER_TRAP",
    "spellSpeed": 3,
    "rarity": "RARE",
    "attribute": "NOBLE_VOID",
    "manaCost": 1,
    "chemicalFormula": "Kc Reversion",
    "effectCode": "TRAP_B23_LE_CHATELIER_COUNTER_DISPLACEMENT_CNTR_73",
    "effectText": "[Bẫy Phản Công / Counter Trap - Spell Speed 3]: Khi đối thủ kích hoạt một lá bài Phép, Bẫy hoặc hiệu ứng quái thú: Vô hiệu hóa kích hoạt đó và phá hủy lá bài của đối thủ!",
    "scientificLore": "Cơ chế triệt tiêu tức thời Phản Đòn Cân Bằng Động Le Chatelier (Instantaneous Shift Neutralizing External Disturbance) ngăn chặn phản ứng chuỗi ngay từ giai đoạn khởi đầu theo nguyên lý động học xúc tác GDPT 2018.",
    "relatedEquation": "Instantaneous Shift Neutralizing External Disturbance",
    "iupacName": "Le Chatelier Counter Displacement Protocol",
    "archetype": "LE_CHATELIER_EQUILIBRIUM",
    "structuredEffects": [
      {
        "effectId": "B23_EFF_73",
        "activationWindow": "QUICK",
        "operations": [
          {
            "op": "NEGATE_EFFECT",
            "params": {}
          },
          {
            "op": "DESTROY_CARD",
            "params": {
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Spell Speed 3: Vô hiệu hóa kích hoạt của đối thủ và phá hủy lá bài đó."
      }
    ]
  },
  {
    "id": "card_b23_074_counter_electrochemical_overpotential_counter_stop_74",
    "name": "Quá Thế Điện Cực Chặn Đứng Dòng Electron (Cấp Độ Phản Kích 10)",
    "name_en": "Electrochemical Overpotential Counter Stop (Counter Rank 10)",
    "cardType": "TRAP",
    "spellTrapSubtype": "COUNTER_TRAP",
    "spellSpeed": 3,
    "rarity": "SUPER_RARE",
    "attribute": "ELECTRO",
    "manaCost": 2,
    "chemicalFormula": "η Overpotential",
    "effectCode": "TRAP_B23_ELECTROCHEMICAL_OVERPOTENTIAL_COUNTER_STOP_CNTR_74",
    "effectText": "[Bẫy Phản Công / Counter Trap - Spell Speed 3]: Khi đối thủ kích hoạt một lá bài Phép, Bẫy hoặc hiệu ứng quái thú: Vô hiệu hóa kích hoạt đó và phá hủy lá bài của đối thủ!",
    "scientificLore": "Cơ chế triệt tiêu tức thời Quá Thế Điện Cực Chặn Đứng Dòng Electron (Kinetic Activation Overpotential Halting Electrolysis) ngăn chặn phản ứng chuỗi ngay từ giai đoạn khởi đầu theo nguyên lý động học xúc tác GDPT 2018.",
    "relatedEquation": "Kinetic Activation Overpotential Halting Electrolysis",
    "iupacName": "Electrochemical Overpotential Counter Stop Protocol",
    "archetype": "ELECTROCHEMICAL_CELL",
    "structuredEffects": [
      {
        "effectId": "B23_EFF_74",
        "activationWindow": "QUICK",
        "operations": [
          {
            "op": "NEGATE_EFFECT",
            "params": {}
          },
          {
            "op": "DESTROY_CARD",
            "params": {
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Spell Speed 3: Vô hiệu hóa kích hoạt của đối thủ và phá hủy lá bài đó."
      }
    ]
  },
  {
    "id": "card_b23_075_counter_catalyst_poison_irreversible_inhibition_75",
    "name": "Chất Độc Xúc Tác Vô Hiệu Trung Tâm Hoạt Hóa (Cấp Độ Phản Kích 10)",
    "name_en": "Catalyst Poison Irreversible Inhibition (Counter Rank 10)",
    "cardType": "TRAP",
    "spellTrapSubtype": "COUNTER_TRAP",
    "spellSpeed": 3,
    "rarity": "SUPER_RARE",
    "attribute": "ACID_DARK",
    "manaCost": 3,
    "chemicalFormula": "CO/H2S Poison",
    "effectCode": "TRAP_B23_CATALYST_POISON_IRREVERSIBLE_INHIBITION_CNTR_75",
    "effectText": "[Bẫy Phản Công / Counter Trap - Spell Speed 3]: Khi đối thủ kích hoạt một lá bài Phép, Bẫy hoặc hiệu ứng quái thú: Vô hiệu hóa kích hoạt đó và phá hủy lá bài của đối thủ!",
    "scientificLore": "Cơ chế triệt tiêu tức thời Chất Độc Xúc Tác Vô Hiệu Trung Tâm Hoạt Hóa (Irreversible Chemisorption Blocking Active Catalyst Sites) ngăn chặn phản ứng chuỗi ngay từ giai đoạn khởi đầu theo nguyên lý động học xúc tác GDPT 2018.",
    "relatedEquation": "Irreversible Chemisorption Blocking Active Catalyst Sites",
    "iupacName": "Catalyst Poison Irreversible Inhibition Protocol",
    "archetype": "LE_CHATELIER_EQUILIBRIUM",
    "structuredEffects": [
      {
        "effectId": "B23_EFF_75",
        "activationWindow": "QUICK",
        "operations": [
          {
            "op": "NEGATE_EFFECT",
            "params": {}
          },
          {
            "op": "DESTROY_CARD",
            "params": {
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Spell Speed 3: Vô hiệu hóa kích hoạt của đối thủ và phá hủy lá bài đó."
      }
    ]
  },
  {
    "id": "card_b23_076_counter_chelation_metal_ion_quench_counter_76",
    "name": "Bẫy Triệt Tiêu Hiệu Ứng Bằng Phức Chelate (Cấp Độ Phản Kích 10)",
    "name_en": "Chelation Metal Ion Quench Counter (Counter Rank 10)",
    "cardType": "TRAP",
    "spellTrapSubtype": "COUNTER_TRAP",
    "spellSpeed": 3,
    "rarity": "ULTRA_RARE",
    "attribute": "AQUA",
    "manaCost": 4,
    "chemicalFormula": "EDTA Binding",
    "effectCode": "TRAP_B23_CHELATION_METAL_ION_QUENCH_COUNTER_CNTR_76",
    "effectText": "[Bẫy Phản Công / Counter Trap - Spell Speed 3]: Khi đối thủ kích hoạt một lá bài Phép, Bẫy hoặc hiệu ứng quái thú: Vô hiệu hóa kích hoạt đó và phá hủy lá bài của đối thủ!",
    "scientificLore": "Cơ chế triệt tiêu tức thời Bẫy Triệt Tiêu Hiệu Ứng Bằng Phức Chelate (Thermodynamic Chelate Effect ΔS > 0 Formation) ngăn chặn phản ứng chuỗi ngay từ giai đoạn khởi đầu theo nguyên lý động học xúc tác GDPT 2018.",
    "relatedEquation": "Thermodynamic Chelate Effect ΔS > 0 Formation",
    "iupacName": "Chelation Metal Ion Quench Counter Protocol",
    "archetype": "ELECTROCHEMICAL_CELL",
    "structuredEffects": [
      {
        "effectId": "B23_EFF_76",
        "activationWindow": "QUICK",
        "operations": [
          {
            "op": "NEGATE_EFFECT",
            "params": {}
          },
          {
            "op": "DESTROY_CARD",
            "params": {
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Spell Speed 3: Vô hiệu hóa kích hoạt của đối thủ và phá hủy lá bài đó."
      }
    ]
  },
  {
    "id": "card_b23_077_counter_universal_buffer_proton_quench_77",
    "name": "Bẫy Đệm Chống Đột Biến Proton pH (Cấp Độ Phản Kích 10)",
    "name_en": "Universal Buffer Proton Quench (Counter Rank 10)",
    "cardType": "TRAP",
    "spellTrapSubtype": "COUNTER_TRAP",
    "spellSpeed": 3,
    "rarity": "SECRET_RARE",
    "attribute": "AQUA",
    "manaCost": 1,
    "chemicalFormula": "Buffer Capacity",
    "effectCode": "TRAP_B23_UNIVERSAL_BUFFER_PROTON_QUENCH_CNTR_77",
    "effectText": "[Bẫy Phản Công / Counter Trap - Spell Speed 3]: Khi đối thủ kích hoạt một lá bài Phép, Bẫy hoặc hiệu ứng quái thú: Vô hiệu hóa kích hoạt đó và phá hủy lá bài của đối thủ!",
    "scientificLore": "Cơ chế triệt tiêu tức thời Bẫy Đệm Chống Đột Biến Proton pH (Henderson-Hasselbalch Equation pH Homeostasis) ngăn chặn phản ứng chuỗi ngay từ giai đoạn khởi đầu theo nguyên lý động học xúc tác GDPT 2018.",
    "relatedEquation": "Henderson-Hasselbalch Equation pH Homeostasis",
    "iupacName": "Universal Buffer Proton Quench Protocol",
    "archetype": "LE_CHATELIER_EQUILIBRIUM",
    "structuredEffects": [
      {
        "effectId": "B23_EFF_77",
        "activationWindow": "QUICK",
        "operations": [
          {
            "op": "NEGATE_EFFECT",
            "params": {}
          },
          {
            "op": "DESTROY_CARD",
            "params": {
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Spell Speed 3: Vô hiệu hóa kích hoạt của đối thủ và phá hủy lá bài đó."
      }
    ]
  },
  {
    "id": "card_b23_078_counter_free_radical_scavenger_chain_terminator_78",
    "name": "Bẫy Khử Gốc Tự Do Bằng Chất Chống Oxi Hóa (Cấp Độ Phản Kích 10)",
    "name_en": "Free Radical Scavenger Chain Terminator (Counter Rank 10)",
    "cardType": "TRAP",
    "spellTrapSubtype": "COUNTER_TRAP",
    "spellSpeed": 3,
    "rarity": "COMMON",
    "attribute": "TERRA",
    "manaCost": 2,
    "chemicalFormula": "Antioxidant",
    "effectCode": "TRAP_B23_FREE_RADICAL_SCAVENGER_CHAIN_TERMINATOR_CNTR_78",
    "effectText": "[Bẫy Phản Công / Counter Trap - Spell Speed 3]: Khi đối thủ kích hoạt một lá bài Phép, Bẫy hoặc hiệu ứng quái thú: Vô hiệu hóa kích hoạt đó và phá hủy lá bài của đối thủ!",
    "scientificLore": "Cơ chế triệt tiêu tức thời Bẫy Khử Gốc Tự Do Bằng Chất Chống Oxi Hóa (R· + Inh-H → RH + Inh· (Stable Inactive Radical)) ngăn chặn phản ứng chuỗi ngay từ giai đoạn khởi đầu theo nguyên lý động học xúc tác GDPT 2018.",
    "relatedEquation": "R· + Inh-H → RH + Inh· (Stable Inactive Radical)",
    "iupacName": "Free Radical Scavenger Chain Terminator Protocol",
    "archetype": "ELECTROCHEMICAL_CELL",
    "structuredEffects": [
      {
        "effectId": "B23_EFF_78",
        "activationWindow": "QUICK",
        "operations": [
          {
            "op": "NEGATE_EFFECT",
            "params": {}
          },
          {
            "op": "DESTROY_CARD",
            "params": {
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Spell Speed 3: Vô hiệu hóa kích hoạt của đối thủ và phá hủy lá bài đó."
      }
    ]
  },
  {
    "id": "card_b23_079_counter_reverse_polar_electro_quench_counter_79",
    "name": "Bẫy Kháng Điện Áp Ngược Pin Galvanic (Cấp Độ Phản Kích 10)",
    "name_en": "Reverse Polar Electro-Quench Counter (Counter Rank 10)",
    "cardType": "TRAP",
    "spellTrapSubtype": "COUNTER_TRAP",
    "spellSpeed": 3,
    "rarity": "COMMON",
    "attribute": "ELECTRO",
    "manaCost": 3,
    "chemicalFormula": "Back-EMF",
    "effectCode": "TRAP_B23_REVERSE_POLAR_ELECTRO_QUENCH_COUNTER_CNTR_79",
    "effectText": "[Bẫy Phản Công / Counter Trap - Spell Speed 3]: Khi đối thủ kích hoạt một lá bài Phép, Bẫy hoặc hiệu ứng quái thú: Vô hiệu hóa kích hoạt đó và phá hủy lá bài của đối thủ!",
    "scientificLore": "Cơ chế triệt tiêu tức thời Bẫy Kháng Điện Áp Ngược Pin Galvanic (External Opposing Voltage Exceeding Cell Potential E_cell) ngăn chặn phản ứng chuỗi ngay từ giai đoạn khởi đầu theo nguyên lý động học xúc tác GDPT 2018.",
    "relatedEquation": "External Opposing Voltage Exceeding Cell Potential E_cell",
    "iupacName": "Reverse Polar Electro-Quench Counter Protocol",
    "archetype": "LE_CHATELIER_EQUILIBRIUM",
    "structuredEffects": [
      {
        "effectId": "B23_EFF_79",
        "activationWindow": "QUICK",
        "operations": [
          {
            "op": "NEGATE_EFFECT",
            "params": {}
          },
          {
            "op": "DESTROY_CARD",
            "params": {
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Spell Speed 3: Vô hiệu hóa kích hoạt của đối thủ và phá hủy lá bài đó."
      }
    ]
  },
  {
    "id": "card_b23_080_counter_nucleation_inhibitor_crystal_shatter_80",
    "name": "Bẫy Triệt Phá Tinh Thể Bằng Chất Ức Chế Mầm (Cấp Độ Phản Kích 10)",
    "name_en": "Nucleation Inhibitor Crystal Shatter (Counter Rank 10)",
    "cardType": "TRAP",
    "spellTrapSubtype": "COUNTER_TRAP",
    "spellSpeed": 3,
    "rarity": "COMMON",
    "attribute": "NOBLE_VOID",
    "manaCost": 4,
    "chemicalFormula": "Polyphosphate",
    "effectCode": "TRAP_B23_NUCLEATION_INHIBITOR_CRYSTAL_SHATTER_CNTR_80",
    "effectText": "[Bẫy Phản Công / Counter Trap - Spell Speed 3]: Khi đối thủ kích hoạt một lá bài Phép, Bẫy hoặc hiệu ứng quái thú: Vô hiệu hóa kích hoạt đó và phá hủy lá bài của đối thủ!",
    "scientificLore": "Cơ chế triệt tiêu tức thời Bẫy Triệt Phá Tinh Thể Bằng Chất Ức Chế Mầm (Sub-Stoichiometric Threshold Scale Inhibition) ngăn chặn phản ứng chuỗi ngay từ giai đoạn khởi đầu theo nguyên lý động học xúc tác GDPT 2018.",
    "relatedEquation": "Sub-Stoichiometric Threshold Scale Inhibition",
    "iupacName": "Nucleation Inhibitor Crystal Shatter Protocol",
    "archetype": "ELECTROCHEMICAL_CELL",
    "structuredEffects": [
      {
        "effectId": "B23_EFF_80",
        "activationWindow": "QUICK",
        "operations": [
          {
            "op": "NEGATE_EFFECT",
            "params": {}
          },
          {
            "op": "DESTROY_CARD",
            "params": {
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Spell Speed 3: Vô hiệu hóa kích hoạt của đối thủ và phá hủy lá bài đó."
      }
    ]
  },
  {
    "id": "card_b23_081_counter_le_chatelier_counter_displacement_81",
    "name": "Phản Đòn Cân Bằng Động Le Chatelier (Cấp Độ Phản Kích 11)",
    "name_en": "Le Chatelier Counter Displacement (Counter Rank 11)",
    "cardType": "TRAP",
    "spellTrapSubtype": "COUNTER_TRAP",
    "spellSpeed": 3,
    "rarity": "RARE",
    "attribute": "NOBLE_VOID",
    "manaCost": 1,
    "chemicalFormula": "Kc Reversion",
    "effectCode": "TRAP_B23_LE_CHATELIER_COUNTER_DISPLACEMENT_CNTR_81",
    "effectText": "[Bẫy Phản Công / Counter Trap - Spell Speed 3]: Khi đối thủ kích hoạt một lá bài Phép, Bẫy hoặc hiệu ứng quái thú: Vô hiệu hóa kích hoạt đó và phá hủy lá bài của đối thủ!",
    "scientificLore": "Cơ chế triệt tiêu tức thời Phản Đòn Cân Bằng Động Le Chatelier (Instantaneous Shift Neutralizing External Disturbance) ngăn chặn phản ứng chuỗi ngay từ giai đoạn khởi đầu theo nguyên lý động học xúc tác GDPT 2018.",
    "relatedEquation": "Instantaneous Shift Neutralizing External Disturbance",
    "iupacName": "Le Chatelier Counter Displacement Protocol",
    "archetype": "LE_CHATELIER_EQUILIBRIUM",
    "structuredEffects": [
      {
        "effectId": "B23_EFF_81",
        "activationWindow": "QUICK",
        "operations": [
          {
            "op": "NEGATE_EFFECT",
            "params": {}
          },
          {
            "op": "DESTROY_CARD",
            "params": {
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Spell Speed 3: Vô hiệu hóa kích hoạt của đối thủ và phá hủy lá bài đó."
      }
    ]
  },
  {
    "id": "card_b23_082_counter_electrochemical_overpotential_counter_stop_82",
    "name": "Quá Thế Điện Cực Chặn Đứng Dòng Electron (Cấp Độ Phản Kích 11)",
    "name_en": "Electrochemical Overpotential Counter Stop (Counter Rank 11)",
    "cardType": "TRAP",
    "spellTrapSubtype": "COUNTER_TRAP",
    "spellSpeed": 3,
    "rarity": "RARE",
    "attribute": "ELECTRO",
    "manaCost": 2,
    "chemicalFormula": "η Overpotential",
    "effectCode": "TRAP_B23_ELECTROCHEMICAL_OVERPOTENTIAL_COUNTER_STOP_CNTR_82",
    "effectText": "[Bẫy Phản Công / Counter Trap - Spell Speed 3]: Khi đối thủ kích hoạt một lá bài Phép, Bẫy hoặc hiệu ứng quái thú: Vô hiệu hóa kích hoạt đó và phá hủy lá bài của đối thủ!",
    "scientificLore": "Cơ chế triệt tiêu tức thời Quá Thế Điện Cực Chặn Đứng Dòng Electron (Kinetic Activation Overpotential Halting Electrolysis) ngăn chặn phản ứng chuỗi ngay từ giai đoạn khởi đầu theo nguyên lý động học xúc tác GDPT 2018.",
    "relatedEquation": "Kinetic Activation Overpotential Halting Electrolysis",
    "iupacName": "Electrochemical Overpotential Counter Stop Protocol",
    "archetype": "ELECTROCHEMICAL_CELL",
    "structuredEffects": [
      {
        "effectId": "B23_EFF_82",
        "activationWindow": "QUICK",
        "operations": [
          {
            "op": "NEGATE_EFFECT",
            "params": {}
          },
          {
            "op": "DESTROY_CARD",
            "params": {
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Spell Speed 3: Vô hiệu hóa kích hoạt của đối thủ và phá hủy lá bài đó."
      }
    ]
  },
  {
    "id": "card_b23_083_counter_catalyst_poison_irreversible_inhibition_83",
    "name": "Chất Độc Xúc Tác Vô Hiệu Trung Tâm Hoạt Hóa (Cấp Độ Phản Kích 11)",
    "name_en": "Catalyst Poison Irreversible Inhibition (Counter Rank 11)",
    "cardType": "TRAP",
    "spellTrapSubtype": "COUNTER_TRAP",
    "spellSpeed": 3,
    "rarity": "SUPER_RARE",
    "attribute": "ACID_DARK",
    "manaCost": 3,
    "chemicalFormula": "CO/H2S Poison",
    "effectCode": "TRAP_B23_CATALYST_POISON_IRREVERSIBLE_INHIBITION_CNTR_83",
    "effectText": "[Bẫy Phản Công / Counter Trap - Spell Speed 3]: Khi đối thủ kích hoạt một lá bài Phép, Bẫy hoặc hiệu ứng quái thú: Vô hiệu hóa kích hoạt đó và phá hủy lá bài của đối thủ!",
    "scientificLore": "Cơ chế triệt tiêu tức thời Chất Độc Xúc Tác Vô Hiệu Trung Tâm Hoạt Hóa (Irreversible Chemisorption Blocking Active Catalyst Sites) ngăn chặn phản ứng chuỗi ngay từ giai đoạn khởi đầu theo nguyên lý động học xúc tác GDPT 2018.",
    "relatedEquation": "Irreversible Chemisorption Blocking Active Catalyst Sites",
    "iupacName": "Catalyst Poison Irreversible Inhibition Protocol",
    "archetype": "LE_CHATELIER_EQUILIBRIUM",
    "structuredEffects": [
      {
        "effectId": "B23_EFF_83",
        "activationWindow": "QUICK",
        "operations": [
          {
            "op": "NEGATE_EFFECT",
            "params": {}
          },
          {
            "op": "DESTROY_CARD",
            "params": {
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Spell Speed 3: Vô hiệu hóa kích hoạt của đối thủ và phá hủy lá bài đó."
      }
    ]
  },
  {
    "id": "card_b23_084_counter_chelation_metal_ion_quench_counter_84",
    "name": "Bẫy Triệt Tiêu Hiệu Ứng Bằng Phức Chelate (Cấp Độ Phản Kích 11)",
    "name_en": "Chelation Metal Ion Quench Counter (Counter Rank 11)",
    "cardType": "TRAP",
    "spellTrapSubtype": "COUNTER_TRAP",
    "spellSpeed": 3,
    "rarity": "SUPER_RARE",
    "attribute": "AQUA",
    "manaCost": 4,
    "chemicalFormula": "EDTA Binding",
    "effectCode": "TRAP_B23_CHELATION_METAL_ION_QUENCH_COUNTER_CNTR_84",
    "effectText": "[Bẫy Phản Công / Counter Trap - Spell Speed 3]: Khi đối thủ kích hoạt một lá bài Phép, Bẫy hoặc hiệu ứng quái thú: Vô hiệu hóa kích hoạt đó và phá hủy lá bài của đối thủ!",
    "scientificLore": "Cơ chế triệt tiêu tức thời Bẫy Triệt Tiêu Hiệu Ứng Bằng Phức Chelate (Thermodynamic Chelate Effect ΔS > 0 Formation) ngăn chặn phản ứng chuỗi ngay từ giai đoạn khởi đầu theo nguyên lý động học xúc tác GDPT 2018.",
    "relatedEquation": "Thermodynamic Chelate Effect ΔS > 0 Formation",
    "iupacName": "Chelation Metal Ion Quench Counter Protocol",
    "archetype": "ELECTROCHEMICAL_CELL",
    "structuredEffects": [
      {
        "effectId": "B23_EFF_84",
        "activationWindow": "QUICK",
        "operations": [
          {
            "op": "NEGATE_EFFECT",
            "params": {}
          },
          {
            "op": "DESTROY_CARD",
            "params": {
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Spell Speed 3: Vô hiệu hóa kích hoạt của đối thủ và phá hủy lá bài đó."
      }
    ]
  },
  {
    "id": "card_b23_085_counter_universal_buffer_proton_quench_85",
    "name": "Bẫy Đệm Chống Đột Biến Proton pH (Cấp Độ Phản Kích 11)",
    "name_en": "Universal Buffer Proton Quench (Counter Rank 11)",
    "cardType": "TRAP",
    "spellTrapSubtype": "COUNTER_TRAP",
    "spellSpeed": 3,
    "rarity": "ULTRA_RARE",
    "attribute": "AQUA",
    "manaCost": 1,
    "chemicalFormula": "Buffer Capacity",
    "effectCode": "TRAP_B23_UNIVERSAL_BUFFER_PROTON_QUENCH_CNTR_85",
    "effectText": "[Bẫy Phản Công / Counter Trap - Spell Speed 3]: Khi đối thủ kích hoạt một lá bài Phép, Bẫy hoặc hiệu ứng quái thú: Vô hiệu hóa kích hoạt đó và phá hủy lá bài của đối thủ!",
    "scientificLore": "Cơ chế triệt tiêu tức thời Bẫy Đệm Chống Đột Biến Proton pH (Henderson-Hasselbalch Equation pH Homeostasis) ngăn chặn phản ứng chuỗi ngay từ giai đoạn khởi đầu theo nguyên lý động học xúc tác GDPT 2018.",
    "relatedEquation": "Henderson-Hasselbalch Equation pH Homeostasis",
    "iupacName": "Universal Buffer Proton Quench Protocol",
    "archetype": "LE_CHATELIER_EQUILIBRIUM",
    "structuredEffects": [
      {
        "effectId": "B23_EFF_85",
        "activationWindow": "QUICK",
        "operations": [
          {
            "op": "NEGATE_EFFECT",
            "params": {}
          },
          {
            "op": "DESTROY_CARD",
            "params": {
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Spell Speed 3: Vô hiệu hóa kích hoạt của đối thủ và phá hủy lá bài đó."
      }
    ]
  },
  {
    "id": "card_b23_086_counter_free_radical_scavenger_chain_terminator_86",
    "name": "Bẫy Khử Gốc Tự Do Bằng Chất Chống Oxi Hóa (Cấp Độ Phản Kích 11)",
    "name_en": "Free Radical Scavenger Chain Terminator (Counter Rank 11)",
    "cardType": "TRAP",
    "spellTrapSubtype": "COUNTER_TRAP",
    "spellSpeed": 3,
    "rarity": "SECRET_RARE",
    "attribute": "TERRA",
    "manaCost": 2,
    "chemicalFormula": "Antioxidant",
    "effectCode": "TRAP_B23_FREE_RADICAL_SCAVENGER_CHAIN_TERMINATOR_CNTR_86",
    "effectText": "[Bẫy Phản Công / Counter Trap - Spell Speed 3]: Khi đối thủ kích hoạt một lá bài Phép, Bẫy hoặc hiệu ứng quái thú: Vô hiệu hóa kích hoạt đó và phá hủy lá bài của đối thủ!",
    "scientificLore": "Cơ chế triệt tiêu tức thời Bẫy Khử Gốc Tự Do Bằng Chất Chống Oxi Hóa (R· + Inh-H → RH + Inh· (Stable Inactive Radical)) ngăn chặn phản ứng chuỗi ngay từ giai đoạn khởi đầu theo nguyên lý động học xúc tác GDPT 2018.",
    "relatedEquation": "R· + Inh-H → RH + Inh· (Stable Inactive Radical)",
    "iupacName": "Free Radical Scavenger Chain Terminator Protocol",
    "archetype": "ELECTROCHEMICAL_CELL",
    "structuredEffects": [
      {
        "effectId": "B23_EFF_86",
        "activationWindow": "QUICK",
        "operations": [
          {
            "op": "NEGATE_EFFECT",
            "params": {}
          },
          {
            "op": "DESTROY_CARD",
            "params": {
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Spell Speed 3: Vô hiệu hóa kích hoạt của đối thủ và phá hủy lá bài đó."
      }
    ]
  },
  {
    "id": "card_b23_087_counter_reverse_polar_electro_quench_counter_87",
    "name": "Bẫy Kháng Điện Áp Ngược Pin Galvanic (Cấp Độ Phản Kích 11)",
    "name_en": "Reverse Polar Electro-Quench Counter (Counter Rank 11)",
    "cardType": "TRAP",
    "spellTrapSubtype": "COUNTER_TRAP",
    "spellSpeed": 3,
    "rarity": "COMMON",
    "attribute": "ELECTRO",
    "manaCost": 3,
    "chemicalFormula": "Back-EMF",
    "effectCode": "TRAP_B23_REVERSE_POLAR_ELECTRO_QUENCH_COUNTER_CNTR_87",
    "effectText": "[Bẫy Phản Công / Counter Trap - Spell Speed 3]: Khi đối thủ kích hoạt một lá bài Phép, Bẫy hoặc hiệu ứng quái thú: Vô hiệu hóa kích hoạt đó và phá hủy lá bài của đối thủ!",
    "scientificLore": "Cơ chế triệt tiêu tức thời Bẫy Kháng Điện Áp Ngược Pin Galvanic (External Opposing Voltage Exceeding Cell Potential E_cell) ngăn chặn phản ứng chuỗi ngay từ giai đoạn khởi đầu theo nguyên lý động học xúc tác GDPT 2018.",
    "relatedEquation": "External Opposing Voltage Exceeding Cell Potential E_cell",
    "iupacName": "Reverse Polar Electro-Quench Counter Protocol",
    "archetype": "LE_CHATELIER_EQUILIBRIUM",
    "structuredEffects": [
      {
        "effectId": "B23_EFF_87",
        "activationWindow": "QUICK",
        "operations": [
          {
            "op": "NEGATE_EFFECT",
            "params": {}
          },
          {
            "op": "DESTROY_CARD",
            "params": {
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Spell Speed 3: Vô hiệu hóa kích hoạt của đối thủ và phá hủy lá bài đó."
      }
    ]
  },
  {
    "id": "card_b23_088_counter_nucleation_inhibitor_crystal_shatter_88",
    "name": "Bẫy Triệt Phá Tinh Thể Bằng Chất Ức Chế Mầm (Cấp Độ Phản Kích 11)",
    "name_en": "Nucleation Inhibitor Crystal Shatter (Counter Rank 11)",
    "cardType": "TRAP",
    "spellTrapSubtype": "COUNTER_TRAP",
    "spellSpeed": 3,
    "rarity": "COMMON",
    "attribute": "NOBLE_VOID",
    "manaCost": 4,
    "chemicalFormula": "Polyphosphate",
    "effectCode": "TRAP_B23_NUCLEATION_INHIBITOR_CRYSTAL_SHATTER_CNTR_88",
    "effectText": "[Bẫy Phản Công / Counter Trap - Spell Speed 3]: Khi đối thủ kích hoạt một lá bài Phép, Bẫy hoặc hiệu ứng quái thú: Vô hiệu hóa kích hoạt đó và phá hủy lá bài của đối thủ!",
    "scientificLore": "Cơ chế triệt tiêu tức thời Bẫy Triệt Phá Tinh Thể Bằng Chất Ức Chế Mầm (Sub-Stoichiometric Threshold Scale Inhibition) ngăn chặn phản ứng chuỗi ngay từ giai đoạn khởi đầu theo nguyên lý động học xúc tác GDPT 2018.",
    "relatedEquation": "Sub-Stoichiometric Threshold Scale Inhibition",
    "iupacName": "Nucleation Inhibitor Crystal Shatter Protocol",
    "archetype": "ELECTROCHEMICAL_CELL",
    "structuredEffects": [
      {
        "effectId": "B23_EFF_88",
        "activationWindow": "QUICK",
        "operations": [
          {
            "op": "NEGATE_EFFECT",
            "params": {}
          },
          {
            "op": "DESTROY_CARD",
            "params": {
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Spell Speed 3: Vô hiệu hóa kích hoạt của đối thủ và phá hủy lá bài đó."
      }
    ]
  },
  {
    "id": "card_b23_089_counter_le_chatelier_counter_displacement_89",
    "name": "Phản Đòn Cân Bằng Động Le Chatelier (Cấp Độ Phản Kích 12)",
    "name_en": "Le Chatelier Counter Displacement (Counter Rank 12)",
    "cardType": "TRAP",
    "spellTrapSubtype": "COUNTER_TRAP",
    "spellSpeed": 3,
    "rarity": "COMMON",
    "attribute": "NOBLE_VOID",
    "manaCost": 1,
    "chemicalFormula": "Kc Reversion",
    "effectCode": "TRAP_B23_LE_CHATELIER_COUNTER_DISPLACEMENT_CNTR_89",
    "effectText": "[Bẫy Phản Công / Counter Trap - Spell Speed 3]: Khi đối thủ kích hoạt một lá bài Phép, Bẫy hoặc hiệu ứng quái thú: Vô hiệu hóa kích hoạt đó và phá hủy lá bài của đối thủ!",
    "scientificLore": "Cơ chế triệt tiêu tức thời Phản Đòn Cân Bằng Động Le Chatelier (Instantaneous Shift Neutralizing External Disturbance) ngăn chặn phản ứng chuỗi ngay từ giai đoạn khởi đầu theo nguyên lý động học xúc tác GDPT 2018.",
    "relatedEquation": "Instantaneous Shift Neutralizing External Disturbance",
    "iupacName": "Le Chatelier Counter Displacement Protocol",
    "archetype": "LE_CHATELIER_EQUILIBRIUM",
    "structuredEffects": [
      {
        "effectId": "B23_EFF_89",
        "activationWindow": "QUICK",
        "operations": [
          {
            "op": "NEGATE_EFFECT",
            "params": {}
          },
          {
            "op": "DESTROY_CARD",
            "params": {
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Spell Speed 3: Vô hiệu hóa kích hoạt của đối thủ và phá hủy lá bài đó."
      }
    ]
  },
  {
    "id": "card_b23_090_counter_electrochemical_overpotential_counter_stop_90",
    "name": "Quá Thế Điện Cực Chặn Đứng Dòng Electron (Cấp Độ Phản Kích 12)",
    "name_en": "Electrochemical Overpotential Counter Stop (Counter Rank 12)",
    "cardType": "TRAP",
    "spellTrapSubtype": "COUNTER_TRAP",
    "spellSpeed": 3,
    "rarity": "RARE",
    "attribute": "ELECTRO",
    "manaCost": 2,
    "chemicalFormula": "η Overpotential",
    "effectCode": "TRAP_B23_ELECTROCHEMICAL_OVERPOTENTIAL_COUNTER_STOP_CNTR_90",
    "effectText": "[Bẫy Phản Công / Counter Trap - Spell Speed 3]: Khi đối thủ kích hoạt một lá bài Phép, Bẫy hoặc hiệu ứng quái thú: Vô hiệu hóa kích hoạt đó và phá hủy lá bài của đối thủ!",
    "scientificLore": "Cơ chế triệt tiêu tức thời Quá Thế Điện Cực Chặn Đứng Dòng Electron (Kinetic Activation Overpotential Halting Electrolysis) ngăn chặn phản ứng chuỗi ngay từ giai đoạn khởi đầu theo nguyên lý động học xúc tác GDPT 2018.",
    "relatedEquation": "Kinetic Activation Overpotential Halting Electrolysis",
    "iupacName": "Electrochemical Overpotential Counter Stop Protocol",
    "archetype": "ELECTROCHEMICAL_CELL",
    "structuredEffects": [
      {
        "effectId": "B23_EFF_90",
        "activationWindow": "QUICK",
        "operations": [
          {
            "op": "NEGATE_EFFECT",
            "params": {}
          },
          {
            "op": "DESTROY_CARD",
            "params": {
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Spell Speed 3: Vô hiệu hóa kích hoạt của đối thủ và phá hủy lá bài đó."
      }
    ]
  },
  {
    "id": "card_b23_091_counter_catalyst_poison_irreversible_inhibition_91",
    "name": "Chất Độc Xúc Tác Vô Hiệu Trung Tâm Hoạt Hóa (Cấp Độ Phản Kích 12)",
    "name_en": "Catalyst Poison Irreversible Inhibition (Counter Rank 12)",
    "cardType": "TRAP",
    "spellTrapSubtype": "COUNTER_TRAP",
    "spellSpeed": 3,
    "rarity": "RARE",
    "attribute": "ACID_DARK",
    "manaCost": 3,
    "chemicalFormula": "CO/H2S Poison",
    "effectCode": "TRAP_B23_CATALYST_POISON_IRREVERSIBLE_INHIBITION_CNTR_91",
    "effectText": "[Bẫy Phản Công / Counter Trap - Spell Speed 3]: Khi đối thủ kích hoạt một lá bài Phép, Bẫy hoặc hiệu ứng quái thú: Vô hiệu hóa kích hoạt đó và phá hủy lá bài của đối thủ!",
    "scientificLore": "Cơ chế triệt tiêu tức thời Chất Độc Xúc Tác Vô Hiệu Trung Tâm Hoạt Hóa (Irreversible Chemisorption Blocking Active Catalyst Sites) ngăn chặn phản ứng chuỗi ngay từ giai đoạn khởi đầu theo nguyên lý động học xúc tác GDPT 2018.",
    "relatedEquation": "Irreversible Chemisorption Blocking Active Catalyst Sites",
    "iupacName": "Catalyst Poison Irreversible Inhibition Protocol",
    "archetype": "LE_CHATELIER_EQUILIBRIUM",
    "structuredEffects": [
      {
        "effectId": "B23_EFF_91",
        "activationWindow": "QUICK",
        "operations": [
          {
            "op": "NEGATE_EFFECT",
            "params": {}
          },
          {
            "op": "DESTROY_CARD",
            "params": {
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Spell Speed 3: Vô hiệu hóa kích hoạt của đối thủ và phá hủy lá bài đó."
      }
    ]
  },
  {
    "id": "card_b23_092_counter_chelation_metal_ion_quench_counter_92",
    "name": "Bẫy Triệt Tiêu Hiệu Ứng Bằng Phức Chelate (Cấp Độ Phản Kích 12)",
    "name_en": "Chelation Metal Ion Quench Counter (Counter Rank 12)",
    "cardType": "TRAP",
    "spellTrapSubtype": "COUNTER_TRAP",
    "spellSpeed": 3,
    "rarity": "SUPER_RARE",
    "attribute": "AQUA",
    "manaCost": 4,
    "chemicalFormula": "EDTA Binding",
    "effectCode": "TRAP_B23_CHELATION_METAL_ION_QUENCH_COUNTER_CNTR_92",
    "effectText": "[Bẫy Phản Công / Counter Trap - Spell Speed 3]: Khi đối thủ kích hoạt một lá bài Phép, Bẫy hoặc hiệu ứng quái thú: Vô hiệu hóa kích hoạt đó và phá hủy lá bài của đối thủ!",
    "scientificLore": "Cơ chế triệt tiêu tức thời Bẫy Triệt Tiêu Hiệu Ứng Bằng Phức Chelate (Thermodynamic Chelate Effect ΔS > 0 Formation) ngăn chặn phản ứng chuỗi ngay từ giai đoạn khởi đầu theo nguyên lý động học xúc tác GDPT 2018.",
    "relatedEquation": "Thermodynamic Chelate Effect ΔS > 0 Formation",
    "iupacName": "Chelation Metal Ion Quench Counter Protocol",
    "archetype": "ELECTROCHEMICAL_CELL",
    "structuredEffects": [
      {
        "effectId": "B23_EFF_92",
        "activationWindow": "QUICK",
        "operations": [
          {
            "op": "NEGATE_EFFECT",
            "params": {}
          },
          {
            "op": "DESTROY_CARD",
            "params": {
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Spell Speed 3: Vô hiệu hóa kích hoạt của đối thủ và phá hủy lá bài đó."
      }
    ]
  },
  {
    "id": "card_b23_093_counter_universal_buffer_proton_quench_93",
    "name": "Bẫy Đệm Chống Đột Biến Proton pH (Cấp Độ Phản Kích 12)",
    "name_en": "Universal Buffer Proton Quench (Counter Rank 12)",
    "cardType": "TRAP",
    "spellTrapSubtype": "COUNTER_TRAP",
    "spellSpeed": 3,
    "rarity": "SUPER_RARE",
    "attribute": "AQUA",
    "manaCost": 1,
    "chemicalFormula": "Buffer Capacity",
    "effectCode": "TRAP_B23_UNIVERSAL_BUFFER_PROTON_QUENCH_CNTR_93",
    "effectText": "[Bẫy Phản Công / Counter Trap - Spell Speed 3]: Khi đối thủ kích hoạt một lá bài Phép, Bẫy hoặc hiệu ứng quái thú: Vô hiệu hóa kích hoạt đó và phá hủy lá bài của đối thủ!",
    "scientificLore": "Cơ chế triệt tiêu tức thời Bẫy Đệm Chống Đột Biến Proton pH (Henderson-Hasselbalch Equation pH Homeostasis) ngăn chặn phản ứng chuỗi ngay từ giai đoạn khởi đầu theo nguyên lý động học xúc tác GDPT 2018.",
    "relatedEquation": "Henderson-Hasselbalch Equation pH Homeostasis",
    "iupacName": "Universal Buffer Proton Quench Protocol",
    "archetype": "LE_CHATELIER_EQUILIBRIUM",
    "structuredEffects": [
      {
        "effectId": "B23_EFF_93",
        "activationWindow": "QUICK",
        "operations": [
          {
            "op": "NEGATE_EFFECT",
            "params": {}
          },
          {
            "op": "DESTROY_CARD",
            "params": {
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Spell Speed 3: Vô hiệu hóa kích hoạt của đối thủ và phá hủy lá bài đó."
      }
    ]
  },
  {
    "id": "card_b23_094_counter_free_radical_scavenger_chain_terminator_94",
    "name": "Bẫy Khử Gốc Tự Do Bằng Chất Chống Oxi Hóa (Cấp Độ Phản Kích 12)",
    "name_en": "Free Radical Scavenger Chain Terminator (Counter Rank 12)",
    "cardType": "TRAP",
    "spellTrapSubtype": "COUNTER_TRAP",
    "spellSpeed": 3,
    "rarity": "ULTRA_RARE",
    "attribute": "TERRA",
    "manaCost": 2,
    "chemicalFormula": "Antioxidant",
    "effectCode": "TRAP_B23_FREE_RADICAL_SCAVENGER_CHAIN_TERMINATOR_CNTR_94",
    "effectText": "[Bẫy Phản Công / Counter Trap - Spell Speed 3]: Khi đối thủ kích hoạt một lá bài Phép, Bẫy hoặc hiệu ứng quái thú: Vô hiệu hóa kích hoạt đó và phá hủy lá bài của đối thủ!",
    "scientificLore": "Cơ chế triệt tiêu tức thời Bẫy Khử Gốc Tự Do Bằng Chất Chống Oxi Hóa (R· + Inh-H → RH + Inh· (Stable Inactive Radical)) ngăn chặn phản ứng chuỗi ngay từ giai đoạn khởi đầu theo nguyên lý động học xúc tác GDPT 2018.",
    "relatedEquation": "R· + Inh-H → RH + Inh· (Stable Inactive Radical)",
    "iupacName": "Free Radical Scavenger Chain Terminator Protocol",
    "archetype": "ELECTROCHEMICAL_CELL",
    "structuredEffects": [
      {
        "effectId": "B23_EFF_94",
        "activationWindow": "QUICK",
        "operations": [
          {
            "op": "NEGATE_EFFECT",
            "params": {}
          },
          {
            "op": "DESTROY_CARD",
            "params": {
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Spell Speed 3: Vô hiệu hóa kích hoạt của đối thủ và phá hủy lá bài đó."
      }
    ]
  },
  {
    "id": "card_b23_095_counter_reverse_polar_electro_quench_counter_95",
    "name": "Bẫy Kháng Điện Áp Ngược Pin Galvanic (Cấp Độ Phản Kích 12)",
    "name_en": "Reverse Polar Electro-Quench Counter (Counter Rank 12)",
    "cardType": "TRAP",
    "spellTrapSubtype": "COUNTER_TRAP",
    "spellSpeed": 3,
    "rarity": "SECRET_RARE",
    "attribute": "ELECTRO",
    "manaCost": 3,
    "chemicalFormula": "Back-EMF",
    "effectCode": "TRAP_B23_REVERSE_POLAR_ELECTRO_QUENCH_COUNTER_CNTR_95",
    "effectText": "[Bẫy Phản Công / Counter Trap - Spell Speed 3]: Khi đối thủ kích hoạt một lá bài Phép, Bẫy hoặc hiệu ứng quái thú: Vô hiệu hóa kích hoạt đó và phá hủy lá bài của đối thủ!",
    "scientificLore": "Cơ chế triệt tiêu tức thời Bẫy Kháng Điện Áp Ngược Pin Galvanic (External Opposing Voltage Exceeding Cell Potential E_cell) ngăn chặn phản ứng chuỗi ngay từ giai đoạn khởi đầu theo nguyên lý động học xúc tác GDPT 2018.",
    "relatedEquation": "External Opposing Voltage Exceeding Cell Potential E_cell",
    "iupacName": "Reverse Polar Electro-Quench Counter Protocol",
    "archetype": "LE_CHATELIER_EQUILIBRIUM",
    "structuredEffects": [
      {
        "effectId": "B23_EFF_95",
        "activationWindow": "QUICK",
        "operations": [
          {
            "op": "NEGATE_EFFECT",
            "params": {}
          },
          {
            "op": "DESTROY_CARD",
            "params": {
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Spell Speed 3: Vô hiệu hóa kích hoạt của đối thủ và phá hủy lá bài đó."
      }
    ]
  },
  {
    "id": "card_b23_096_counter_nucleation_inhibitor_crystal_shatter_96",
    "name": "Bẫy Triệt Phá Tinh Thể Bằng Chất Ức Chế Mầm (Cấp Độ Phản Kích 12)",
    "name_en": "Nucleation Inhibitor Crystal Shatter (Counter Rank 12)",
    "cardType": "TRAP",
    "spellTrapSubtype": "COUNTER_TRAP",
    "spellSpeed": 3,
    "rarity": "COMMON",
    "attribute": "NOBLE_VOID",
    "manaCost": 4,
    "chemicalFormula": "Polyphosphate",
    "effectCode": "TRAP_B23_NUCLEATION_INHIBITOR_CRYSTAL_SHATTER_CNTR_96",
    "effectText": "[Bẫy Phản Công / Counter Trap - Spell Speed 3]: Khi đối thủ kích hoạt một lá bài Phép, Bẫy hoặc hiệu ứng quái thú: Vô hiệu hóa kích hoạt đó và phá hủy lá bài của đối thủ!",
    "scientificLore": "Cơ chế triệt tiêu tức thời Bẫy Triệt Phá Tinh Thể Bằng Chất Ức Chế Mầm (Sub-Stoichiometric Threshold Scale Inhibition) ngăn chặn phản ứng chuỗi ngay từ giai đoạn khởi đầu theo nguyên lý động học xúc tác GDPT 2018.",
    "relatedEquation": "Sub-Stoichiometric Threshold Scale Inhibition",
    "iupacName": "Nucleation Inhibitor Crystal Shatter Protocol",
    "archetype": "ELECTROCHEMICAL_CELL",
    "structuredEffects": [
      {
        "effectId": "B23_EFF_96",
        "activationWindow": "QUICK",
        "operations": [
          {
            "op": "NEGATE_EFFECT",
            "params": {}
          },
          {
            "op": "DESTROY_CARD",
            "params": {
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Spell Speed 3: Vô hiệu hóa kích hoạt của đối thủ và phá hủy lá bài đó."
      }
    ]
  },
  {
    "id": "card_b23_097_counter_le_chatelier_counter_displacement_97",
    "name": "Phản Đòn Cân Bằng Động Le Chatelier (Cấp Độ Phản Kích 13)",
    "name_en": "Le Chatelier Counter Displacement (Counter Rank 13)",
    "cardType": "TRAP",
    "spellTrapSubtype": "COUNTER_TRAP",
    "spellSpeed": 3,
    "rarity": "COMMON",
    "attribute": "NOBLE_VOID",
    "manaCost": 1,
    "chemicalFormula": "Kc Reversion",
    "effectCode": "TRAP_B23_LE_CHATELIER_COUNTER_DISPLACEMENT_CNTR_97",
    "effectText": "[Bẫy Phản Công / Counter Trap - Spell Speed 3]: Khi đối thủ kích hoạt một lá bài Phép, Bẫy hoặc hiệu ứng quái thú: Vô hiệu hóa kích hoạt đó và phá hủy lá bài của đối thủ!",
    "scientificLore": "Cơ chế triệt tiêu tức thời Phản Đòn Cân Bằng Động Le Chatelier (Instantaneous Shift Neutralizing External Disturbance) ngăn chặn phản ứng chuỗi ngay từ giai đoạn khởi đầu theo nguyên lý động học xúc tác GDPT 2018.",
    "relatedEquation": "Instantaneous Shift Neutralizing External Disturbance",
    "iupacName": "Le Chatelier Counter Displacement Protocol",
    "archetype": "LE_CHATELIER_EQUILIBRIUM",
    "structuredEffects": [
      {
        "effectId": "B23_EFF_97",
        "activationWindow": "QUICK",
        "operations": [
          {
            "op": "NEGATE_EFFECT",
            "params": {}
          },
          {
            "op": "DESTROY_CARD",
            "params": {
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Spell Speed 3: Vô hiệu hóa kích hoạt của đối thủ và phá hủy lá bài đó."
      }
    ]
  },
  {
    "id": "card_b23_098_counter_electrochemical_overpotential_counter_stop_98",
    "name": "Quá Thế Điện Cực Chặn Đứng Dòng Electron (Cấp Độ Phản Kích 13)",
    "name_en": "Electrochemical Overpotential Counter Stop (Counter Rank 13)",
    "cardType": "TRAP",
    "spellTrapSubtype": "COUNTER_TRAP",
    "spellSpeed": 3,
    "rarity": "COMMON",
    "attribute": "ELECTRO",
    "manaCost": 2,
    "chemicalFormula": "η Overpotential",
    "effectCode": "TRAP_B23_ELECTROCHEMICAL_OVERPOTENTIAL_COUNTER_STOP_CNTR_98",
    "effectText": "[Bẫy Phản Công / Counter Trap - Spell Speed 3]: Khi đối thủ kích hoạt một lá bài Phép, Bẫy hoặc hiệu ứng quái thú: Vô hiệu hóa kích hoạt đó và phá hủy lá bài của đối thủ!",
    "scientificLore": "Cơ chế triệt tiêu tức thời Quá Thế Điện Cực Chặn Đứng Dòng Electron (Kinetic Activation Overpotential Halting Electrolysis) ngăn chặn phản ứng chuỗi ngay từ giai đoạn khởi đầu theo nguyên lý động học xúc tác GDPT 2018.",
    "relatedEquation": "Kinetic Activation Overpotential Halting Electrolysis",
    "iupacName": "Electrochemical Overpotential Counter Stop Protocol",
    "archetype": "ELECTROCHEMICAL_CELL",
    "structuredEffects": [
      {
        "effectId": "B23_EFF_98",
        "activationWindow": "QUICK",
        "operations": [
          {
            "op": "NEGATE_EFFECT",
            "params": {}
          },
          {
            "op": "DESTROY_CARD",
            "params": {
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Spell Speed 3: Vô hiệu hóa kích hoạt của đối thủ và phá hủy lá bài đó."
      }
    ]
  },
  {
    "id": "card_b23_099_counter_catalyst_poison_irreversible_inhibition_99",
    "name": "Chất Độc Xúc Tác Vô Hiệu Trung Tâm Hoạt Hóa (Cấp Độ Phản Kích 13)",
    "name_en": "Catalyst Poison Irreversible Inhibition (Counter Rank 13)",
    "cardType": "TRAP",
    "spellTrapSubtype": "COUNTER_TRAP",
    "spellSpeed": 3,
    "rarity": "RARE",
    "attribute": "ACID_DARK",
    "manaCost": 3,
    "chemicalFormula": "CO/H2S Poison",
    "effectCode": "TRAP_B23_CATALYST_POISON_IRREVERSIBLE_INHIBITION_CNTR_99",
    "effectText": "[Bẫy Phản Công / Counter Trap - Spell Speed 3]: Khi đối thủ kích hoạt một lá bài Phép, Bẫy hoặc hiệu ứng quái thú: Vô hiệu hóa kích hoạt đó và phá hủy lá bài của đối thủ!",
    "scientificLore": "Cơ chế triệt tiêu tức thời Chất Độc Xúc Tác Vô Hiệu Trung Tâm Hoạt Hóa (Irreversible Chemisorption Blocking Active Catalyst Sites) ngăn chặn phản ứng chuỗi ngay từ giai đoạn khởi đầu theo nguyên lý động học xúc tác GDPT 2018.",
    "relatedEquation": "Irreversible Chemisorption Blocking Active Catalyst Sites",
    "iupacName": "Catalyst Poison Irreversible Inhibition Protocol",
    "archetype": "LE_CHATELIER_EQUILIBRIUM",
    "structuredEffects": [
      {
        "effectId": "B23_EFF_99",
        "activationWindow": "QUICK",
        "operations": [
          {
            "op": "NEGATE_EFFECT",
            "params": {}
          },
          {
            "op": "DESTROY_CARD",
            "params": {
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Spell Speed 3: Vô hiệu hóa kích hoạt của đối thủ và phá hủy lá bài đó."
      }
    ]
  },
  {
    "id": "card_b23_100_counter_chelation_metal_ion_quench_counter_100",
    "name": "Bẫy Triệt Tiêu Hiệu Ứng Bằng Phức Chelate (Cấp Độ Phản Kích 13)",
    "name_en": "Chelation Metal Ion Quench Counter (Counter Rank 13)",
    "cardType": "TRAP",
    "spellTrapSubtype": "COUNTER_TRAP",
    "spellSpeed": 3,
    "rarity": "RARE",
    "attribute": "AQUA",
    "manaCost": 4,
    "chemicalFormula": "EDTA Binding",
    "effectCode": "TRAP_B23_CHELATION_METAL_ION_QUENCH_COUNTER_CNTR_100",
    "effectText": "[Bẫy Phản Công / Counter Trap - Spell Speed 3]: Khi đối thủ kích hoạt một lá bài Phép, Bẫy hoặc hiệu ứng quái thú: Vô hiệu hóa kích hoạt đó và phá hủy lá bài của đối thủ!",
    "scientificLore": "Cơ chế triệt tiêu tức thời Bẫy Triệt Tiêu Hiệu Ứng Bằng Phức Chelate (Thermodynamic Chelate Effect ΔS > 0 Formation) ngăn chặn phản ứng chuỗi ngay từ giai đoạn khởi đầu theo nguyên lý động học xúc tác GDPT 2018.",
    "relatedEquation": "Thermodynamic Chelate Effect ΔS > 0 Formation",
    "iupacName": "Chelation Metal Ion Quench Counter Protocol",
    "archetype": "ELECTROCHEMICAL_CELL",
    "structuredEffects": [
      {
        "effectId": "B23_EFF_100",
        "activationWindow": "QUICK",
        "operations": [
          {
            "op": "NEGATE_EFFECT",
            "params": {}
          },
          {
            "op": "DESTROY_CARD",
            "params": {
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Spell Speed 3: Vô hiệu hóa kích hoạt của đối thủ và phá hủy lá bài đó."
      }
    ]
  }
];
