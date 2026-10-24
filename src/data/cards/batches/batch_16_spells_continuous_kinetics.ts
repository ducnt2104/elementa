// src/data/cards/batches/batch_16_spells_continuous_kinetics.ts
// Batch 16: Continuous Chemical Kinetics Spells (80 cards)
// Automatically generated and validated for ELEMENTA Tactical TCG

import { PlayableCardDef } from '../../../domain/cardGameTypes';

export const BATCH_16_CARDS: PlayableCardDef[] = [
  {
    "id": "card_b16_001_cont_arrhenius_thermal_activation_chamber_1",
    "name": "Buồng Gia Tốc Nhiệt Động Arrhenius (Tầng 1)",
    "name_en": "Arrhenius Thermal Activation Chamber (Stage 1)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "CONTINUOUS_SPELL",
    "spellSpeed": 1,
    "rarity": "COMMON",
    "attribute": "PYRO",
    "manaCost": 2,
    "chemicalFormula": "k = A*exp(-Ea/RT)",
    "effectCode": "SPELL_B16_ARRHENIUS_THERMAL_ACTIVATION_CHAMBER_KINETIC_1",
    "effectText": "[Phép Liên Tục / Continuous]: Duy trì trên sân. Mỗi khi bắt đầu lượt của bạn: Nhận thêm 1 Mana và tăng 200 ATK cho tất cả quái thú đồng minh trên sân.",
    "scientificLore": "Quy trình động học dòng liên tục Buồng Gia Tốc Nhiệt Động Arrhenius (ln(k) = -Ea/R * (1/T) + ln(A)) tối ưu hóa hiệu suất hóa học công nghiệp theo nguyên lý Hóa học Xanh và GDPT 2018.",
    "relatedEquation": "ln(k) = -Ea/R * (1/T) + ln(A)",
    "iupacName": "Arrhenius Thermal Activation Chamber Apparatus",
    "archetype": "THERMAL_KINETICS",
    "structuredEffects": [
      {
        "effectId": "B16_EFF_1",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "RECOVER_RESOURCE",
            "params": {
              "amount": 1
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tích lũy 1 Mana và tăng 200 ATK liên tục mỗi lượt."
      }
    ]
  },
  {
    "id": "card_b16_002_cont_plug_flow_reactor_continuous_kinetic_2",
    "name": "Dòng Chảy Phản Ứng Ống PFR (Tầng 1)",
    "name_en": "Plug Flow Reactor Continuous Kinetic (Stage 1)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "CONTINUOUS_SPELL",
    "spellSpeed": 1,
    "rarity": "RARE",
    "attribute": "AQUA",
    "manaCost": 3,
    "chemicalFormula": "dF/dV = r",
    "effectCode": "SPELL_B16_PLUG_FLOW_REACTOR_CONTINUOUS_KINETIC_KINETIC_2",
    "effectText": "[Phép Liên Tục / Continuous]: Duy trì trên sân. Mỗi khi bắt đầu lượt của bạn: Nhận thêm 1 Mana và tăng 200 ATK cho tất cả quái thú đồng minh trên sân.",
    "scientificLore": "Quy trình động học dòng liên tục Dòng Chảy Phản Ứng Ống PFR (Steady-State Mass Balance Differential) tối ưu hóa hiệu suất hóa học công nghiệp theo nguyên lý Hóa học Xanh và GDPT 2018.",
    "relatedEquation": "Steady-State Mass Balance Differential",
    "iupacName": "Plug Flow Reactor Continuous Kinetic Apparatus",
    "archetype": "ATMOSPHERIC_NITROGEN_FIXATION",
    "structuredEffects": [
      {
        "effectId": "B16_EFF_2",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "RECOVER_RESOURCE",
            "params": {
              "amount": 1
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tích lũy 1 Mana và tăng 200 ATK liên tục mỗi lượt."
      }
    ]
  },
  {
    "id": "card_b16_003_cont_fractional_distillation_continuous_tower_3",
    "name": "Tháp Chưng Cất Phân Đoạn Dầu Mỏ (Tầng 1)",
    "name_en": "Fractional Distillation Continuous Tower (Stage 1)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "CONTINUOUS_SPELL",
    "spellSpeed": 1,
    "rarity": "RARE",
    "attribute": "TERRA",
    "manaCost": 4,
    "chemicalFormula": "Petro-Refinery",
    "effectCode": "SPELL_B16_FRACTIONAL_DISTILLATION_CONTINUOUS_TOWER_KINETIC_3",
    "effectText": "[Phép Liên Tục / Continuous]: Duy trì trên sân. Mỗi khi bắt đầu lượt của bạn: Nhận thêm 1 Mana và tăng 200 ATK cho tất cả quái thú đồng minh trên sân.",
    "scientificLore": "Quy trình động học dòng liên tục Tháp Chưng Cất Phân Đoạn Dầu Mỏ (Continuous Equilibrium Stage Separation) tối ưu hóa hiệu suất hóa học công nghiệp theo nguyên lý Hóa học Xanh và GDPT 2018.",
    "relatedEquation": "Continuous Equilibrium Stage Separation",
    "iupacName": "Fractional Distillation Continuous Tower Apparatus",
    "archetype": "THERMAL_KINETICS",
    "structuredEffects": [
      {
        "effectId": "B16_EFF_3",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "RECOVER_RESOURCE",
            "params": {
              "amount": 1
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tích lũy 1 Mana và tăng 200 ATK liên tục mỗi lượt."
      }
    ]
  },
  {
    "id": "card_b16_004_cont_haber_bosch_nitrogen_recycle_loop_4",
    "name": "Vòng Tuần Hoàn Tổng Hợp Haber-Bosch (Tầng 1)",
    "name_en": "Haber-Bosch Nitrogen Recycle Loop (Stage 1)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "CONTINUOUS_SPELL",
    "spellSpeed": 1,
    "rarity": "SUPER_RARE",
    "attribute": "AERO",
    "manaCost": 5,
    "chemicalFormula": "N2+3H2 ⇌ 2NH3",
    "effectCode": "SPELL_B16_HABER_BOSCH_NITROGEN_RECYCLE_LOOP_KINETIC_4",
    "effectText": "[Phép Liên Tục / Continuous]: Duy trì trên sân. Mỗi khi bắt đầu lượt của bạn: Nhận thêm 1 Mana và tăng 200 ATK cho tất cả quái thú đồng minh trên sân.",
    "scientificLore": "Quy trình động học dòng liên tục Vòng Tuần Hoàn Tổng Hợp Haber-Bosch (N₂ + 3H₂ ⇌ 2NH₃ (Continuous High-Pressure Recycle)) tối ưu hóa hiệu suất hóa học công nghiệp theo nguyên lý Hóa học Xanh và GDPT 2018.",
    "relatedEquation": "N₂ + 3H₂ ⇌ 2NH₃ (Continuous High-Pressure Recycle)",
    "iupacName": "Haber-Bosch Nitrogen Recycle Loop Apparatus",
    "archetype": "ATMOSPHERIC_NITROGEN_FIXATION",
    "structuredEffects": [
      {
        "effectId": "B16_EFF_4",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "RECOVER_RESOURCE",
            "params": {
              "amount": 1
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tích lũy 1 Mana và tăng 200 ATK liên tục mỗi lượt."
      }
    ]
  },
  {
    "id": "card_b16_005_cont_poly_aluminum_chloride_coagulation_basin_5",
    "name": "Bể Lắng Lọc Keo Tụ PAC (Tầng 1)",
    "name_en": "Poly-Aluminum Chloride Coagulation Basin (Stage 1)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "CONTINUOUS_SPELL",
    "spellSpeed": 1,
    "rarity": "SUPER_RARE",
    "attribute": "AQUA",
    "manaCost": 2,
    "chemicalFormula": "[Al2(OH)nCl6-n]m",
    "effectCode": "SPELL_B16_POLY_ALUMINUM_CHLORIDE_COAGULATION_BASIN_KINETIC_5",
    "effectText": "[Phép Liên Tục / Continuous]: Duy trì trên sân. Mỗi khi bắt đầu lượt của bạn: Nhận thêm 1 Mana và tăng 200 ATK cho tất cả quái thú đồng minh trên sân.",
    "scientificLore": "Quy trình động học dòng liên tục Bể Lắng Lọc Keo Tụ PAC (Colloidal Particle Neutralization & Sedimentation) tối ưu hóa hiệu suất hóa học công nghiệp theo nguyên lý Hóa học Xanh và GDPT 2018.",
    "relatedEquation": "Colloidal Particle Neutralization & Sedimentation",
    "iupacName": "Poly-Aluminum Chloride Coagulation Basin Apparatus",
    "archetype": "THERMAL_KINETICS",
    "structuredEffects": [
      {
        "effectId": "B16_EFF_5",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "RECOVER_RESOURCE",
            "params": {
              "amount": 1
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tích lũy 1 Mana và tăng 200 ATK liên tục mỗi lượt."
      }
    ]
  },
  {
    "id": "card_b16_006_cont_chloralkali_membrane_electrolysis_cell_6",
    "name": "Buồng Điện Phân Màng Ngăn Chloralkali (Tầng 1)",
    "name_en": "Chloralkali Membrane Electrolysis Cell (Stage 1)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "CONTINUOUS_SPELL",
    "spellSpeed": 1,
    "rarity": "ULTRA_RARE",
    "attribute": "ELECTRO",
    "manaCost": 3,
    "chemicalFormula": "2NaCl+2H2O",
    "effectCode": "SPELL_B16_CHLORALKALI_MEMBRANE_ELECTROLYSIS_CELL_KINETIC_6",
    "effectText": "[Phép Liên Tục / Continuous]: Duy trì trên sân. Mỗi khi bắt đầu lượt của bạn: Nhận thêm 1 Mana và tăng 200 ATK cho tất cả quái thú đồng minh trên sân.",
    "scientificLore": "Quy trình động học dòng liên tục Buồng Điện Phân Màng Ngăn Chloralkali (2NaCl + 2H₂O → 2NaOH + Cl₂↑ + H₂↑) tối ưu hóa hiệu suất hóa học công nghiệp theo nguyên lý Hóa học Xanh và GDPT 2018.",
    "relatedEquation": "2NaCl + 2H₂O → 2NaOH + Cl₂↑ + H₂↑",
    "iupacName": "Chloralkali Membrane Electrolysis Cell Apparatus",
    "archetype": "ATMOSPHERIC_NITROGEN_FIXATION",
    "structuredEffects": [
      {
        "effectId": "B16_EFF_6",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "RECOVER_RESOURCE",
            "params": {
              "amount": 1
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tích lũy 1 Mana và tăng 200 ATK liên tục mỗi lượt."
      }
    ]
  },
  {
    "id": "card_b16_007_cont_continuous_uv_photoreactor_chamber_7",
    "name": "Đèn Chiếu Xạ Quang Hóa Liên Tục (Tầng 1)",
    "name_en": "Continuous UV Photoreactor Chamber (Stage 1)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "CONTINUOUS_SPELL",
    "spellSpeed": 1,
    "rarity": "SECRET_RARE",
    "attribute": "ELECTRO",
    "manaCost": 4,
    "chemicalFormula": "hν Radiation",
    "effectCode": "SPELL_B16_CONTINUOUS_UV_PHOTOREACTOR_CHAMBER_KINETIC_7",
    "effectText": "[Phép Liên Tục / Continuous]: Duy trì trên sân. Mỗi khi bắt đầu lượt của bạn: Nhận thêm 1 Mana và tăng 200 ATK cho tất cả quái thú đồng minh trên sân.",
    "scientificLore": "Quy trình động học dòng liên tục Đèn Chiếu Xạ Quang Hóa Liên Tục (Continuous Free Radical Initiation Flux) tối ưu hóa hiệu suất hóa học công nghiệp theo nguyên lý Hóa học Xanh và GDPT 2018.",
    "relatedEquation": "Continuous Free Radical Initiation Flux",
    "iupacName": "Continuous UV Photoreactor Chamber Apparatus",
    "archetype": "THERMAL_KINETICS",
    "structuredEffects": [
      {
        "effectId": "B16_EFF_7",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "RECOVER_RESOURCE",
            "params": {
              "amount": 1
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tích lũy 1 Mana và tăng 200 ATK liên tục mỗi lượt."
      }
    ]
  },
  {
    "id": "card_b16_008_cont_reverse_osmosis_desalination_cascade_8",
    "name": "Màng Lọc Thẩm Thấu Ngược RO (Tầng 1)",
    "name_en": "Reverse Osmosis Desalination Cascade (Stage 1)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "CONTINUOUS_SPELL",
    "spellSpeed": 1,
    "rarity": "COMMON",
    "attribute": "AQUA",
    "manaCost": 5,
    "chemicalFormula": "RO Membrane",
    "effectCode": "SPELL_B16_REVERSE_OSMOSIS_DESALINATION_CASCADE_KINETIC_8",
    "effectText": "[Phép Liên Tục / Continuous]: Duy trì trên sân. Mỗi khi bắt đầu lượt của bạn: Nhận thêm 1 Mana và tăng 200 ATK cho tất cả quái thú đồng minh trên sân.",
    "scientificLore": "Quy trình động học dòng liên tục Màng Lọc Thẩm Thấu Ngược RO (π = iMRT (High-Pressure Osmotic Solvent Driving)) tối ưu hóa hiệu suất hóa học công nghiệp theo nguyên lý Hóa học Xanh và GDPT 2018.",
    "relatedEquation": "π = iMRT (High-Pressure Osmotic Solvent Driving)",
    "iupacName": "Reverse Osmosis Desalination Cascade Apparatus",
    "archetype": "ATMOSPHERIC_NITROGEN_FIXATION",
    "structuredEffects": [
      {
        "effectId": "B16_EFF_8",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "RECOVER_RESOURCE",
            "params": {
              "amount": 1
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tích lũy 1 Mana và tăng 200 ATK liên tục mỗi lượt."
      }
    ]
  },
  {
    "id": "card_b16_009_cont_arrhenius_thermal_activation_chamber_9",
    "name": "Buồng Gia Tốc Nhiệt Động Arrhenius (Tầng 2)",
    "name_en": "Arrhenius Thermal Activation Chamber (Stage 2)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "CONTINUOUS_SPELL",
    "spellSpeed": 1,
    "rarity": "COMMON",
    "attribute": "PYRO",
    "manaCost": 2,
    "chemicalFormula": "k = A*exp(-Ea/RT)",
    "effectCode": "SPELL_B16_ARRHENIUS_THERMAL_ACTIVATION_CHAMBER_KINETIC_9",
    "effectText": "[Phép Liên Tục / Continuous]: Duy trì trên sân. Mỗi khi bắt đầu lượt của bạn: Nhận thêm 1 Mana và tăng 200 ATK cho tất cả quái thú đồng minh trên sân.",
    "scientificLore": "Quy trình động học dòng liên tục Buồng Gia Tốc Nhiệt Động Arrhenius (ln(k) = -Ea/R * (1/T) + ln(A)) tối ưu hóa hiệu suất hóa học công nghiệp theo nguyên lý Hóa học Xanh và GDPT 2018.",
    "relatedEquation": "ln(k) = -Ea/R * (1/T) + ln(A)",
    "iupacName": "Arrhenius Thermal Activation Chamber Apparatus",
    "archetype": "THERMAL_KINETICS",
    "structuredEffects": [
      {
        "effectId": "B16_EFF_9",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "RECOVER_RESOURCE",
            "params": {
              "amount": 1
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tích lũy 1 Mana và tăng 200 ATK liên tục mỗi lượt."
      }
    ]
  },
  {
    "id": "card_b16_010_cont_plug_flow_reactor_continuous_kinetic_10",
    "name": "Dòng Chảy Phản Ứng Ống PFR (Tầng 2)",
    "name_en": "Plug Flow Reactor Continuous Kinetic (Stage 2)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "CONTINUOUS_SPELL",
    "spellSpeed": 1,
    "rarity": "COMMON",
    "attribute": "AQUA",
    "manaCost": 3,
    "chemicalFormula": "dF/dV = r",
    "effectCode": "SPELL_B16_PLUG_FLOW_REACTOR_CONTINUOUS_KINETIC_KINETIC_10",
    "effectText": "[Phép Liên Tục / Continuous]: Duy trì trên sân. Mỗi khi bắt đầu lượt của bạn: Nhận thêm 1 Mana và tăng 200 ATK cho tất cả quái thú đồng minh trên sân.",
    "scientificLore": "Quy trình động học dòng liên tục Dòng Chảy Phản Ứng Ống PFR (Steady-State Mass Balance Differential) tối ưu hóa hiệu suất hóa học công nghiệp theo nguyên lý Hóa học Xanh và GDPT 2018.",
    "relatedEquation": "Steady-State Mass Balance Differential",
    "iupacName": "Plug Flow Reactor Continuous Kinetic Apparatus",
    "archetype": "ATMOSPHERIC_NITROGEN_FIXATION",
    "structuredEffects": [
      {
        "effectId": "B16_EFF_10",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "RECOVER_RESOURCE",
            "params": {
              "amount": 1
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tích lũy 1 Mana và tăng 200 ATK liên tục mỗi lượt."
      }
    ]
  },
  {
    "id": "card_b16_011_cont_fractional_distillation_continuous_tower_11",
    "name": "Tháp Chưng Cất Phân Đoạn Dầu Mỏ (Tầng 2)",
    "name_en": "Fractional Distillation Continuous Tower (Stage 2)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "CONTINUOUS_SPELL",
    "spellSpeed": 1,
    "rarity": "RARE",
    "attribute": "TERRA",
    "manaCost": 4,
    "chemicalFormula": "Petro-Refinery",
    "effectCode": "SPELL_B16_FRACTIONAL_DISTILLATION_CONTINUOUS_TOWER_KINETIC_11",
    "effectText": "[Phép Liên Tục / Continuous]: Duy trì trên sân. Mỗi khi bắt đầu lượt của bạn: Nhận thêm 1 Mana và tăng 200 ATK cho tất cả quái thú đồng minh trên sân.",
    "scientificLore": "Quy trình động học dòng liên tục Tháp Chưng Cất Phân Đoạn Dầu Mỏ (Continuous Equilibrium Stage Separation) tối ưu hóa hiệu suất hóa học công nghiệp theo nguyên lý Hóa học Xanh và GDPT 2018.",
    "relatedEquation": "Continuous Equilibrium Stage Separation",
    "iupacName": "Fractional Distillation Continuous Tower Apparatus",
    "archetype": "THERMAL_KINETICS",
    "structuredEffects": [
      {
        "effectId": "B16_EFF_11",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "RECOVER_RESOURCE",
            "params": {
              "amount": 1
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tích lũy 1 Mana và tăng 200 ATK liên tục mỗi lượt."
      }
    ]
  },
  {
    "id": "card_b16_012_cont_haber_bosch_nitrogen_recycle_loop_12",
    "name": "Vòng Tuần Hoàn Tổng Hợp Haber-Bosch (Tầng 2)",
    "name_en": "Haber-Bosch Nitrogen Recycle Loop (Stage 2)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "CONTINUOUS_SPELL",
    "spellSpeed": 1,
    "rarity": "RARE",
    "attribute": "AERO",
    "manaCost": 5,
    "chemicalFormula": "N2+3H2 ⇌ 2NH3",
    "effectCode": "SPELL_B16_HABER_BOSCH_NITROGEN_RECYCLE_LOOP_KINETIC_12",
    "effectText": "[Phép Liên Tục / Continuous]: Duy trì trên sân. Mỗi khi bắt đầu lượt của bạn: Nhận thêm 1 Mana và tăng 200 ATK cho tất cả quái thú đồng minh trên sân.",
    "scientificLore": "Quy trình động học dòng liên tục Vòng Tuần Hoàn Tổng Hợp Haber-Bosch (N₂ + 3H₂ ⇌ 2NH₃ (Continuous High-Pressure Recycle)) tối ưu hóa hiệu suất hóa học công nghiệp theo nguyên lý Hóa học Xanh và GDPT 2018.",
    "relatedEquation": "N₂ + 3H₂ ⇌ 2NH₃ (Continuous High-Pressure Recycle)",
    "iupacName": "Haber-Bosch Nitrogen Recycle Loop Apparatus",
    "archetype": "ATMOSPHERIC_NITROGEN_FIXATION",
    "structuredEffects": [
      {
        "effectId": "B16_EFF_12",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "RECOVER_RESOURCE",
            "params": {
              "amount": 1
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tích lũy 1 Mana và tăng 200 ATK liên tục mỗi lượt."
      }
    ]
  },
  {
    "id": "card_b16_013_cont_poly_aluminum_chloride_coagulation_basin_13",
    "name": "Bể Lắng Lọc Keo Tụ PAC (Tầng 2)",
    "name_en": "Poly-Aluminum Chloride Coagulation Basin (Stage 2)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "CONTINUOUS_SPELL",
    "spellSpeed": 1,
    "rarity": "SUPER_RARE",
    "attribute": "AQUA",
    "manaCost": 2,
    "chemicalFormula": "[Al2(OH)nCl6-n]m",
    "effectCode": "SPELL_B16_POLY_ALUMINUM_CHLORIDE_COAGULATION_BASIN_KINETIC_13",
    "effectText": "[Phép Liên Tục / Continuous]: Duy trì trên sân. Mỗi khi bắt đầu lượt của bạn: Nhận thêm 1 Mana và tăng 200 ATK cho tất cả quái thú đồng minh trên sân.",
    "scientificLore": "Quy trình động học dòng liên tục Bể Lắng Lọc Keo Tụ PAC (Colloidal Particle Neutralization & Sedimentation) tối ưu hóa hiệu suất hóa học công nghiệp theo nguyên lý Hóa học Xanh và GDPT 2018.",
    "relatedEquation": "Colloidal Particle Neutralization & Sedimentation",
    "iupacName": "Poly-Aluminum Chloride Coagulation Basin Apparatus",
    "archetype": "THERMAL_KINETICS",
    "structuredEffects": [
      {
        "effectId": "B16_EFF_13",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "RECOVER_RESOURCE",
            "params": {
              "amount": 1
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tích lũy 1 Mana và tăng 200 ATK liên tục mỗi lượt."
      }
    ]
  },
  {
    "id": "card_b16_014_cont_chloralkali_membrane_electrolysis_cell_14",
    "name": "Buồng Điện Phân Màng Ngăn Chloralkali (Tầng 2)",
    "name_en": "Chloralkali Membrane Electrolysis Cell (Stage 2)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "CONTINUOUS_SPELL",
    "spellSpeed": 1,
    "rarity": "SUPER_RARE",
    "attribute": "ELECTRO",
    "manaCost": 3,
    "chemicalFormula": "2NaCl+2H2O",
    "effectCode": "SPELL_B16_CHLORALKALI_MEMBRANE_ELECTROLYSIS_CELL_KINETIC_14",
    "effectText": "[Phép Liên Tục / Continuous]: Duy trì trên sân. Mỗi khi bắt đầu lượt của bạn: Nhận thêm 1 Mana và tăng 200 ATK cho tất cả quái thú đồng minh trên sân.",
    "scientificLore": "Quy trình động học dòng liên tục Buồng Điện Phân Màng Ngăn Chloralkali (2NaCl + 2H₂O → 2NaOH + Cl₂↑ + H₂↑) tối ưu hóa hiệu suất hóa học công nghiệp theo nguyên lý Hóa học Xanh và GDPT 2018.",
    "relatedEquation": "2NaCl + 2H₂O → 2NaOH + Cl₂↑ + H₂↑",
    "iupacName": "Chloralkali Membrane Electrolysis Cell Apparatus",
    "archetype": "ATMOSPHERIC_NITROGEN_FIXATION",
    "structuredEffects": [
      {
        "effectId": "B16_EFF_14",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "RECOVER_RESOURCE",
            "params": {
              "amount": 1
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tích lũy 1 Mana và tăng 200 ATK liên tục mỗi lượt."
      }
    ]
  },
  {
    "id": "card_b16_015_cont_continuous_uv_photoreactor_chamber_15",
    "name": "Đèn Chiếu Xạ Quang Hóa Liên Tục (Tầng 2)",
    "name_en": "Continuous UV Photoreactor Chamber (Stage 2)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "CONTINUOUS_SPELL",
    "spellSpeed": 1,
    "rarity": "ULTRA_RARE",
    "attribute": "ELECTRO",
    "manaCost": 4,
    "chemicalFormula": "hν Radiation",
    "effectCode": "SPELL_B16_CONTINUOUS_UV_PHOTOREACTOR_CHAMBER_KINETIC_15",
    "effectText": "[Phép Liên Tục / Continuous]: Duy trì trên sân. Mỗi khi bắt đầu lượt của bạn: Nhận thêm 1 Mana và tăng 200 ATK cho tất cả quái thú đồng minh trên sân.",
    "scientificLore": "Quy trình động học dòng liên tục Đèn Chiếu Xạ Quang Hóa Liên Tục (Continuous Free Radical Initiation Flux) tối ưu hóa hiệu suất hóa học công nghiệp theo nguyên lý Hóa học Xanh và GDPT 2018.",
    "relatedEquation": "Continuous Free Radical Initiation Flux",
    "iupacName": "Continuous UV Photoreactor Chamber Apparatus",
    "archetype": "THERMAL_KINETICS",
    "structuredEffects": [
      {
        "effectId": "B16_EFF_15",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "RECOVER_RESOURCE",
            "params": {
              "amount": 1
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tích lũy 1 Mana và tăng 200 ATK liên tục mỗi lượt."
      }
    ]
  },
  {
    "id": "card_b16_016_cont_reverse_osmosis_desalination_cascade_16",
    "name": "Màng Lọc Thẩm Thấu Ngược RO (Tầng 2)",
    "name_en": "Reverse Osmosis Desalination Cascade (Stage 2)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "CONTINUOUS_SPELL",
    "spellSpeed": 1,
    "rarity": "SECRET_RARE",
    "attribute": "AQUA",
    "manaCost": 5,
    "chemicalFormula": "RO Membrane",
    "effectCode": "SPELL_B16_REVERSE_OSMOSIS_DESALINATION_CASCADE_KINETIC_16",
    "effectText": "[Phép Liên Tục / Continuous]: Duy trì trên sân. Mỗi khi bắt đầu lượt của bạn: Nhận thêm 1 Mana và tăng 200 ATK cho tất cả quái thú đồng minh trên sân.",
    "scientificLore": "Quy trình động học dòng liên tục Màng Lọc Thẩm Thấu Ngược RO (π = iMRT (High-Pressure Osmotic Solvent Driving)) tối ưu hóa hiệu suất hóa học công nghiệp theo nguyên lý Hóa học Xanh và GDPT 2018.",
    "relatedEquation": "π = iMRT (High-Pressure Osmotic Solvent Driving)",
    "iupacName": "Reverse Osmosis Desalination Cascade Apparatus",
    "archetype": "ATMOSPHERIC_NITROGEN_FIXATION",
    "structuredEffects": [
      {
        "effectId": "B16_EFF_16",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "RECOVER_RESOURCE",
            "params": {
              "amount": 1
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tích lũy 1 Mana và tăng 200 ATK liên tục mỗi lượt."
      }
    ]
  },
  {
    "id": "card_b16_017_cont_arrhenius_thermal_activation_chamber_17",
    "name": "Buồng Gia Tốc Nhiệt Động Arrhenius (Tầng 3)",
    "name_en": "Arrhenius Thermal Activation Chamber (Stage 3)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "CONTINUOUS_SPELL",
    "spellSpeed": 1,
    "rarity": "COMMON",
    "attribute": "PYRO",
    "manaCost": 2,
    "chemicalFormula": "k = A*exp(-Ea/RT)",
    "effectCode": "SPELL_B16_ARRHENIUS_THERMAL_ACTIVATION_CHAMBER_KINETIC_17",
    "effectText": "[Phép Liên Tục / Continuous]: Duy trì trên sân. Mỗi khi bắt đầu lượt của bạn: Nhận thêm 1 Mana và tăng 200 ATK cho tất cả quái thú đồng minh trên sân.",
    "scientificLore": "Quy trình động học dòng liên tục Buồng Gia Tốc Nhiệt Động Arrhenius (ln(k) = -Ea/R * (1/T) + ln(A)) tối ưu hóa hiệu suất hóa học công nghiệp theo nguyên lý Hóa học Xanh và GDPT 2018.",
    "relatedEquation": "ln(k) = -Ea/R * (1/T) + ln(A)",
    "iupacName": "Arrhenius Thermal Activation Chamber Apparatus",
    "archetype": "THERMAL_KINETICS",
    "structuredEffects": [
      {
        "effectId": "B16_EFF_17",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "RECOVER_RESOURCE",
            "params": {
              "amount": 1
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tích lũy 1 Mana và tăng 200 ATK liên tục mỗi lượt."
      }
    ]
  },
  {
    "id": "card_b16_018_cont_plug_flow_reactor_continuous_kinetic_18",
    "name": "Dòng Chảy Phản Ứng Ống PFR (Tầng 3)",
    "name_en": "Plug Flow Reactor Continuous Kinetic (Stage 3)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "CONTINUOUS_SPELL",
    "spellSpeed": 1,
    "rarity": "COMMON",
    "attribute": "AQUA",
    "manaCost": 3,
    "chemicalFormula": "dF/dV = r",
    "effectCode": "SPELL_B16_PLUG_FLOW_REACTOR_CONTINUOUS_KINETIC_KINETIC_18",
    "effectText": "[Phép Liên Tục / Continuous]: Duy trì trên sân. Mỗi khi bắt đầu lượt của bạn: Nhận thêm 1 Mana và tăng 200 ATK cho tất cả quái thú đồng minh trên sân.",
    "scientificLore": "Quy trình động học dòng liên tục Dòng Chảy Phản Ứng Ống PFR (Steady-State Mass Balance Differential) tối ưu hóa hiệu suất hóa học công nghiệp theo nguyên lý Hóa học Xanh và GDPT 2018.",
    "relatedEquation": "Steady-State Mass Balance Differential",
    "iupacName": "Plug Flow Reactor Continuous Kinetic Apparatus",
    "archetype": "ATMOSPHERIC_NITROGEN_FIXATION",
    "structuredEffects": [
      {
        "effectId": "B16_EFF_18",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "RECOVER_RESOURCE",
            "params": {
              "amount": 1
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tích lũy 1 Mana và tăng 200 ATK liên tục mỗi lượt."
      }
    ]
  },
  {
    "id": "card_b16_019_cont_fractional_distillation_continuous_tower_19",
    "name": "Tháp Chưng Cất Phân Đoạn Dầu Mỏ (Tầng 3)",
    "name_en": "Fractional Distillation Continuous Tower (Stage 3)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "CONTINUOUS_SPELL",
    "spellSpeed": 1,
    "rarity": "COMMON",
    "attribute": "TERRA",
    "manaCost": 4,
    "chemicalFormula": "Petro-Refinery",
    "effectCode": "SPELL_B16_FRACTIONAL_DISTILLATION_CONTINUOUS_TOWER_KINETIC_19",
    "effectText": "[Phép Liên Tục / Continuous]: Duy trì trên sân. Mỗi khi bắt đầu lượt của bạn: Nhận thêm 1 Mana và tăng 200 ATK cho tất cả quái thú đồng minh trên sân.",
    "scientificLore": "Quy trình động học dòng liên tục Tháp Chưng Cất Phân Đoạn Dầu Mỏ (Continuous Equilibrium Stage Separation) tối ưu hóa hiệu suất hóa học công nghiệp theo nguyên lý Hóa học Xanh và GDPT 2018.",
    "relatedEquation": "Continuous Equilibrium Stage Separation",
    "iupacName": "Fractional Distillation Continuous Tower Apparatus",
    "archetype": "THERMAL_KINETICS",
    "structuredEffects": [
      {
        "effectId": "B16_EFF_19",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "RECOVER_RESOURCE",
            "params": {
              "amount": 1
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tích lũy 1 Mana và tăng 200 ATK liên tục mỗi lượt."
      }
    ]
  },
  {
    "id": "card_b16_020_cont_haber_bosch_nitrogen_recycle_loop_20",
    "name": "Vòng Tuần Hoàn Tổng Hợp Haber-Bosch (Tầng 3)",
    "name_en": "Haber-Bosch Nitrogen Recycle Loop (Stage 3)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "CONTINUOUS_SPELL",
    "spellSpeed": 1,
    "rarity": "RARE",
    "attribute": "AERO",
    "manaCost": 5,
    "chemicalFormula": "N2+3H2 ⇌ 2NH3",
    "effectCode": "SPELL_B16_HABER_BOSCH_NITROGEN_RECYCLE_LOOP_KINETIC_20",
    "effectText": "[Phép Liên Tục / Continuous]: Duy trì trên sân. Mỗi khi bắt đầu lượt của bạn: Nhận thêm 1 Mana và tăng 200 ATK cho tất cả quái thú đồng minh trên sân.",
    "scientificLore": "Quy trình động học dòng liên tục Vòng Tuần Hoàn Tổng Hợp Haber-Bosch (N₂ + 3H₂ ⇌ 2NH₃ (Continuous High-Pressure Recycle)) tối ưu hóa hiệu suất hóa học công nghiệp theo nguyên lý Hóa học Xanh và GDPT 2018.",
    "relatedEquation": "N₂ + 3H₂ ⇌ 2NH₃ (Continuous High-Pressure Recycle)",
    "iupacName": "Haber-Bosch Nitrogen Recycle Loop Apparatus",
    "archetype": "ATMOSPHERIC_NITROGEN_FIXATION",
    "structuredEffects": [
      {
        "effectId": "B16_EFF_20",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "RECOVER_RESOURCE",
            "params": {
              "amount": 1
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tích lũy 1 Mana và tăng 200 ATK liên tục mỗi lượt."
      }
    ]
  },
  {
    "id": "card_b16_021_cont_poly_aluminum_chloride_coagulation_basin_21",
    "name": "Bể Lắng Lọc Keo Tụ PAC (Tầng 3)",
    "name_en": "Poly-Aluminum Chloride Coagulation Basin (Stage 3)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "CONTINUOUS_SPELL",
    "spellSpeed": 1,
    "rarity": "RARE",
    "attribute": "AQUA",
    "manaCost": 2,
    "chemicalFormula": "[Al2(OH)nCl6-n]m",
    "effectCode": "SPELL_B16_POLY_ALUMINUM_CHLORIDE_COAGULATION_BASIN_KINETIC_21",
    "effectText": "[Phép Liên Tục / Continuous]: Duy trì trên sân. Mỗi khi bắt đầu lượt của bạn: Nhận thêm 1 Mana và tăng 200 ATK cho tất cả quái thú đồng minh trên sân.",
    "scientificLore": "Quy trình động học dòng liên tục Bể Lắng Lọc Keo Tụ PAC (Colloidal Particle Neutralization & Sedimentation) tối ưu hóa hiệu suất hóa học công nghiệp theo nguyên lý Hóa học Xanh và GDPT 2018.",
    "relatedEquation": "Colloidal Particle Neutralization & Sedimentation",
    "iupacName": "Poly-Aluminum Chloride Coagulation Basin Apparatus",
    "archetype": "THERMAL_KINETICS",
    "structuredEffects": [
      {
        "effectId": "B16_EFF_21",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "RECOVER_RESOURCE",
            "params": {
              "amount": 1
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tích lũy 1 Mana và tăng 200 ATK liên tục mỗi lượt."
      }
    ]
  },
  {
    "id": "card_b16_022_cont_chloralkali_membrane_electrolysis_cell_22",
    "name": "Buồng Điện Phân Màng Ngăn Chloralkali (Tầng 3)",
    "name_en": "Chloralkali Membrane Electrolysis Cell (Stage 3)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "CONTINUOUS_SPELL",
    "spellSpeed": 1,
    "rarity": "SUPER_RARE",
    "attribute": "ELECTRO",
    "manaCost": 3,
    "chemicalFormula": "2NaCl+2H2O",
    "effectCode": "SPELL_B16_CHLORALKALI_MEMBRANE_ELECTROLYSIS_CELL_KINETIC_22",
    "effectText": "[Phép Liên Tục / Continuous]: Duy trì trên sân. Mỗi khi bắt đầu lượt của bạn: Nhận thêm 1 Mana và tăng 200 ATK cho tất cả quái thú đồng minh trên sân.",
    "scientificLore": "Quy trình động học dòng liên tục Buồng Điện Phân Màng Ngăn Chloralkali (2NaCl + 2H₂O → 2NaOH + Cl₂↑ + H₂↑) tối ưu hóa hiệu suất hóa học công nghiệp theo nguyên lý Hóa học Xanh và GDPT 2018.",
    "relatedEquation": "2NaCl + 2H₂O → 2NaOH + Cl₂↑ + H₂↑",
    "iupacName": "Chloralkali Membrane Electrolysis Cell Apparatus",
    "archetype": "ATMOSPHERIC_NITROGEN_FIXATION",
    "structuredEffects": [
      {
        "effectId": "B16_EFF_22",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "RECOVER_RESOURCE",
            "params": {
              "amount": 1
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tích lũy 1 Mana và tăng 200 ATK liên tục mỗi lượt."
      }
    ]
  },
  {
    "id": "card_b16_023_cont_continuous_uv_photoreactor_chamber_23",
    "name": "Đèn Chiếu Xạ Quang Hóa Liên Tục (Tầng 3)",
    "name_en": "Continuous UV Photoreactor Chamber (Stage 3)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "CONTINUOUS_SPELL",
    "spellSpeed": 1,
    "rarity": "SUPER_RARE",
    "attribute": "ELECTRO",
    "manaCost": 4,
    "chemicalFormula": "hν Radiation",
    "effectCode": "SPELL_B16_CONTINUOUS_UV_PHOTOREACTOR_CHAMBER_KINETIC_23",
    "effectText": "[Phép Liên Tục / Continuous]: Duy trì trên sân. Mỗi khi bắt đầu lượt của bạn: Nhận thêm 1 Mana và tăng 200 ATK cho tất cả quái thú đồng minh trên sân.",
    "scientificLore": "Quy trình động học dòng liên tục Đèn Chiếu Xạ Quang Hóa Liên Tục (Continuous Free Radical Initiation Flux) tối ưu hóa hiệu suất hóa học công nghiệp theo nguyên lý Hóa học Xanh và GDPT 2018.",
    "relatedEquation": "Continuous Free Radical Initiation Flux",
    "iupacName": "Continuous UV Photoreactor Chamber Apparatus",
    "archetype": "THERMAL_KINETICS",
    "structuredEffects": [
      {
        "effectId": "B16_EFF_23",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "RECOVER_RESOURCE",
            "params": {
              "amount": 1
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tích lũy 1 Mana và tăng 200 ATK liên tục mỗi lượt."
      }
    ]
  },
  {
    "id": "card_b16_024_cont_reverse_osmosis_desalination_cascade_24",
    "name": "Màng Lọc Thẩm Thấu Ngược RO (Tầng 3)",
    "name_en": "Reverse Osmosis Desalination Cascade (Stage 3)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "CONTINUOUS_SPELL",
    "spellSpeed": 1,
    "rarity": "ULTRA_RARE",
    "attribute": "AQUA",
    "manaCost": 5,
    "chemicalFormula": "RO Membrane",
    "effectCode": "SPELL_B16_REVERSE_OSMOSIS_DESALINATION_CASCADE_KINETIC_24",
    "effectText": "[Phép Liên Tục / Continuous]: Duy trì trên sân. Mỗi khi bắt đầu lượt của bạn: Nhận thêm 1 Mana và tăng 200 ATK cho tất cả quái thú đồng minh trên sân.",
    "scientificLore": "Quy trình động học dòng liên tục Màng Lọc Thẩm Thấu Ngược RO (π = iMRT (High-Pressure Osmotic Solvent Driving)) tối ưu hóa hiệu suất hóa học công nghiệp theo nguyên lý Hóa học Xanh và GDPT 2018.",
    "relatedEquation": "π = iMRT (High-Pressure Osmotic Solvent Driving)",
    "iupacName": "Reverse Osmosis Desalination Cascade Apparatus",
    "archetype": "ATMOSPHERIC_NITROGEN_FIXATION",
    "structuredEffects": [
      {
        "effectId": "B16_EFF_24",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "RECOVER_RESOURCE",
            "params": {
              "amount": 1
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tích lũy 1 Mana và tăng 200 ATK liên tục mỗi lượt."
      }
    ]
  },
  {
    "id": "card_b16_025_cont_arrhenius_thermal_activation_chamber_25",
    "name": "Buồng Gia Tốc Nhiệt Động Arrhenius (Tầng 4)",
    "name_en": "Arrhenius Thermal Activation Chamber (Stage 4)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "CONTINUOUS_SPELL",
    "spellSpeed": 1,
    "rarity": "SECRET_RARE",
    "attribute": "PYRO",
    "manaCost": 2,
    "chemicalFormula": "k = A*exp(-Ea/RT)",
    "effectCode": "SPELL_B16_ARRHENIUS_THERMAL_ACTIVATION_CHAMBER_KINETIC_25",
    "effectText": "[Phép Liên Tục / Continuous]: Duy trì trên sân. Mỗi khi bắt đầu lượt của bạn: Nhận thêm 1 Mana và tăng 200 ATK cho tất cả quái thú đồng minh trên sân.",
    "scientificLore": "Quy trình động học dòng liên tục Buồng Gia Tốc Nhiệt Động Arrhenius (ln(k) = -Ea/R * (1/T) + ln(A)) tối ưu hóa hiệu suất hóa học công nghiệp theo nguyên lý Hóa học Xanh và GDPT 2018.",
    "relatedEquation": "ln(k) = -Ea/R * (1/T) + ln(A)",
    "iupacName": "Arrhenius Thermal Activation Chamber Apparatus",
    "archetype": "THERMAL_KINETICS",
    "structuredEffects": [
      {
        "effectId": "B16_EFF_25",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "RECOVER_RESOURCE",
            "params": {
              "amount": 1
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tích lũy 1 Mana và tăng 200 ATK liên tục mỗi lượt."
      }
    ]
  },
  {
    "id": "card_b16_026_cont_plug_flow_reactor_continuous_kinetic_26",
    "name": "Dòng Chảy Phản Ứng Ống PFR (Tầng 4)",
    "name_en": "Plug Flow Reactor Continuous Kinetic (Stage 4)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "CONTINUOUS_SPELL",
    "spellSpeed": 1,
    "rarity": "COMMON",
    "attribute": "AQUA",
    "manaCost": 3,
    "chemicalFormula": "dF/dV = r",
    "effectCode": "SPELL_B16_PLUG_FLOW_REACTOR_CONTINUOUS_KINETIC_KINETIC_26",
    "effectText": "[Phép Liên Tục / Continuous]: Duy trì trên sân. Mỗi khi bắt đầu lượt của bạn: Nhận thêm 1 Mana và tăng 200 ATK cho tất cả quái thú đồng minh trên sân.",
    "scientificLore": "Quy trình động học dòng liên tục Dòng Chảy Phản Ứng Ống PFR (Steady-State Mass Balance Differential) tối ưu hóa hiệu suất hóa học công nghiệp theo nguyên lý Hóa học Xanh và GDPT 2018.",
    "relatedEquation": "Steady-State Mass Balance Differential",
    "iupacName": "Plug Flow Reactor Continuous Kinetic Apparatus",
    "archetype": "ATMOSPHERIC_NITROGEN_FIXATION",
    "structuredEffects": [
      {
        "effectId": "B16_EFF_26",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "RECOVER_RESOURCE",
            "params": {
              "amount": 1
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tích lũy 1 Mana và tăng 200 ATK liên tục mỗi lượt."
      }
    ]
  },
  {
    "id": "card_b16_027_cont_fractional_distillation_continuous_tower_27",
    "name": "Tháp Chưng Cất Phân Đoạn Dầu Mỏ (Tầng 4)",
    "name_en": "Fractional Distillation Continuous Tower (Stage 4)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "CONTINUOUS_SPELL",
    "spellSpeed": 1,
    "rarity": "COMMON",
    "attribute": "TERRA",
    "manaCost": 4,
    "chemicalFormula": "Petro-Refinery",
    "effectCode": "SPELL_B16_FRACTIONAL_DISTILLATION_CONTINUOUS_TOWER_KINETIC_27",
    "effectText": "[Phép Liên Tục / Continuous]: Duy trì trên sân. Mỗi khi bắt đầu lượt của bạn: Nhận thêm 1 Mana và tăng 200 ATK cho tất cả quái thú đồng minh trên sân.",
    "scientificLore": "Quy trình động học dòng liên tục Tháp Chưng Cất Phân Đoạn Dầu Mỏ (Continuous Equilibrium Stage Separation) tối ưu hóa hiệu suất hóa học công nghiệp theo nguyên lý Hóa học Xanh và GDPT 2018.",
    "relatedEquation": "Continuous Equilibrium Stage Separation",
    "iupacName": "Fractional Distillation Continuous Tower Apparatus",
    "archetype": "THERMAL_KINETICS",
    "structuredEffects": [
      {
        "effectId": "B16_EFF_27",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "RECOVER_RESOURCE",
            "params": {
              "amount": 1
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tích lũy 1 Mana và tăng 200 ATK liên tục mỗi lượt."
      }
    ]
  },
  {
    "id": "card_b16_028_cont_haber_bosch_nitrogen_recycle_loop_28",
    "name": "Vòng Tuần Hoàn Tổng Hợp Haber-Bosch (Tầng 4)",
    "name_en": "Haber-Bosch Nitrogen Recycle Loop (Stage 4)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "CONTINUOUS_SPELL",
    "spellSpeed": 1,
    "rarity": "COMMON",
    "attribute": "AERO",
    "manaCost": 5,
    "chemicalFormula": "N2+3H2 ⇌ 2NH3",
    "effectCode": "SPELL_B16_HABER_BOSCH_NITROGEN_RECYCLE_LOOP_KINETIC_28",
    "effectText": "[Phép Liên Tục / Continuous]: Duy trì trên sân. Mỗi khi bắt đầu lượt của bạn: Nhận thêm 1 Mana và tăng 200 ATK cho tất cả quái thú đồng minh trên sân.",
    "scientificLore": "Quy trình động học dòng liên tục Vòng Tuần Hoàn Tổng Hợp Haber-Bosch (N₂ + 3H₂ ⇌ 2NH₃ (Continuous High-Pressure Recycle)) tối ưu hóa hiệu suất hóa học công nghiệp theo nguyên lý Hóa học Xanh và GDPT 2018.",
    "relatedEquation": "N₂ + 3H₂ ⇌ 2NH₃ (Continuous High-Pressure Recycle)",
    "iupacName": "Haber-Bosch Nitrogen Recycle Loop Apparatus",
    "archetype": "ATMOSPHERIC_NITROGEN_FIXATION",
    "structuredEffects": [
      {
        "effectId": "B16_EFF_28",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "RECOVER_RESOURCE",
            "params": {
              "amount": 1
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tích lũy 1 Mana và tăng 200 ATK liên tục mỗi lượt."
      }
    ]
  },
  {
    "id": "card_b16_029_cont_poly_aluminum_chloride_coagulation_basin_29",
    "name": "Bể Lắng Lọc Keo Tụ PAC (Tầng 4)",
    "name_en": "Poly-Aluminum Chloride Coagulation Basin (Stage 4)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "CONTINUOUS_SPELL",
    "spellSpeed": 1,
    "rarity": "RARE",
    "attribute": "AQUA",
    "manaCost": 2,
    "chemicalFormula": "[Al2(OH)nCl6-n]m",
    "effectCode": "SPELL_B16_POLY_ALUMINUM_CHLORIDE_COAGULATION_BASIN_KINETIC_29",
    "effectText": "[Phép Liên Tục / Continuous]: Duy trì trên sân. Mỗi khi bắt đầu lượt của bạn: Nhận thêm 1 Mana và tăng 200 ATK cho tất cả quái thú đồng minh trên sân.",
    "scientificLore": "Quy trình động học dòng liên tục Bể Lắng Lọc Keo Tụ PAC (Colloidal Particle Neutralization & Sedimentation) tối ưu hóa hiệu suất hóa học công nghiệp theo nguyên lý Hóa học Xanh và GDPT 2018.",
    "relatedEquation": "Colloidal Particle Neutralization & Sedimentation",
    "iupacName": "Poly-Aluminum Chloride Coagulation Basin Apparatus",
    "archetype": "THERMAL_KINETICS",
    "structuredEffects": [
      {
        "effectId": "B16_EFF_29",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "RECOVER_RESOURCE",
            "params": {
              "amount": 1
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tích lũy 1 Mana và tăng 200 ATK liên tục mỗi lượt."
      }
    ]
  },
  {
    "id": "card_b16_030_cont_chloralkali_membrane_electrolysis_cell_30",
    "name": "Buồng Điện Phân Màng Ngăn Chloralkali (Tầng 4)",
    "name_en": "Chloralkali Membrane Electrolysis Cell (Stage 4)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "CONTINUOUS_SPELL",
    "spellSpeed": 1,
    "rarity": "RARE",
    "attribute": "ELECTRO",
    "manaCost": 3,
    "chemicalFormula": "2NaCl+2H2O",
    "effectCode": "SPELL_B16_CHLORALKALI_MEMBRANE_ELECTROLYSIS_CELL_KINETIC_30",
    "effectText": "[Phép Liên Tục / Continuous]: Duy trì trên sân. Mỗi khi bắt đầu lượt của bạn: Nhận thêm 1 Mana và tăng 200 ATK cho tất cả quái thú đồng minh trên sân.",
    "scientificLore": "Quy trình động học dòng liên tục Buồng Điện Phân Màng Ngăn Chloralkali (2NaCl + 2H₂O → 2NaOH + Cl₂↑ + H₂↑) tối ưu hóa hiệu suất hóa học công nghiệp theo nguyên lý Hóa học Xanh và GDPT 2018.",
    "relatedEquation": "2NaCl + 2H₂O → 2NaOH + Cl₂↑ + H₂↑",
    "iupacName": "Chloralkali Membrane Electrolysis Cell Apparatus",
    "archetype": "ATMOSPHERIC_NITROGEN_FIXATION",
    "structuredEffects": [
      {
        "effectId": "B16_EFF_30",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "RECOVER_RESOURCE",
            "params": {
              "amount": 1
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tích lũy 1 Mana và tăng 200 ATK liên tục mỗi lượt."
      }
    ]
  },
  {
    "id": "card_b16_031_cont_continuous_uv_photoreactor_chamber_31",
    "name": "Đèn Chiếu Xạ Quang Hóa Liên Tục (Tầng 4)",
    "name_en": "Continuous UV Photoreactor Chamber (Stage 4)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "CONTINUOUS_SPELL",
    "spellSpeed": 1,
    "rarity": "SUPER_RARE",
    "attribute": "ELECTRO",
    "manaCost": 4,
    "chemicalFormula": "hν Radiation",
    "effectCode": "SPELL_B16_CONTINUOUS_UV_PHOTOREACTOR_CHAMBER_KINETIC_31",
    "effectText": "[Phép Liên Tục / Continuous]: Duy trì trên sân. Mỗi khi bắt đầu lượt của bạn: Nhận thêm 1 Mana và tăng 200 ATK cho tất cả quái thú đồng minh trên sân.",
    "scientificLore": "Quy trình động học dòng liên tục Đèn Chiếu Xạ Quang Hóa Liên Tục (Continuous Free Radical Initiation Flux) tối ưu hóa hiệu suất hóa học công nghiệp theo nguyên lý Hóa học Xanh và GDPT 2018.",
    "relatedEquation": "Continuous Free Radical Initiation Flux",
    "iupacName": "Continuous UV Photoreactor Chamber Apparatus",
    "archetype": "THERMAL_KINETICS",
    "structuredEffects": [
      {
        "effectId": "B16_EFF_31",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "RECOVER_RESOURCE",
            "params": {
              "amount": 1
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tích lũy 1 Mana và tăng 200 ATK liên tục mỗi lượt."
      }
    ]
  },
  {
    "id": "card_b16_032_cont_reverse_osmosis_desalination_cascade_32",
    "name": "Màng Lọc Thẩm Thấu Ngược RO (Tầng 4)",
    "name_en": "Reverse Osmosis Desalination Cascade (Stage 4)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "CONTINUOUS_SPELL",
    "spellSpeed": 1,
    "rarity": "SUPER_RARE",
    "attribute": "AQUA",
    "manaCost": 5,
    "chemicalFormula": "RO Membrane",
    "effectCode": "SPELL_B16_REVERSE_OSMOSIS_DESALINATION_CASCADE_KINETIC_32",
    "effectText": "[Phép Liên Tục / Continuous]: Duy trì trên sân. Mỗi khi bắt đầu lượt của bạn: Nhận thêm 1 Mana và tăng 200 ATK cho tất cả quái thú đồng minh trên sân.",
    "scientificLore": "Quy trình động học dòng liên tục Màng Lọc Thẩm Thấu Ngược RO (π = iMRT (High-Pressure Osmotic Solvent Driving)) tối ưu hóa hiệu suất hóa học công nghiệp theo nguyên lý Hóa học Xanh và GDPT 2018.",
    "relatedEquation": "π = iMRT (High-Pressure Osmotic Solvent Driving)",
    "iupacName": "Reverse Osmosis Desalination Cascade Apparatus",
    "archetype": "ATMOSPHERIC_NITROGEN_FIXATION",
    "structuredEffects": [
      {
        "effectId": "B16_EFF_32",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "RECOVER_RESOURCE",
            "params": {
              "amount": 1
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tích lũy 1 Mana và tăng 200 ATK liên tục mỗi lượt."
      }
    ]
  },
  {
    "id": "card_b16_033_cont_arrhenius_thermal_activation_chamber_33",
    "name": "Buồng Gia Tốc Nhiệt Động Arrhenius (Tầng 5)",
    "name_en": "Arrhenius Thermal Activation Chamber (Stage 5)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "CONTINUOUS_SPELL",
    "spellSpeed": 1,
    "rarity": "ULTRA_RARE",
    "attribute": "PYRO",
    "manaCost": 2,
    "chemicalFormula": "k = A*exp(-Ea/RT)",
    "effectCode": "SPELL_B16_ARRHENIUS_THERMAL_ACTIVATION_CHAMBER_KINETIC_33",
    "effectText": "[Phép Liên Tục / Continuous]: Duy trì trên sân. Mỗi khi bắt đầu lượt của bạn: Nhận thêm 1 Mana và tăng 200 ATK cho tất cả quái thú đồng minh trên sân.",
    "scientificLore": "Quy trình động học dòng liên tục Buồng Gia Tốc Nhiệt Động Arrhenius (ln(k) = -Ea/R * (1/T) + ln(A)) tối ưu hóa hiệu suất hóa học công nghiệp theo nguyên lý Hóa học Xanh và GDPT 2018.",
    "relatedEquation": "ln(k) = -Ea/R * (1/T) + ln(A)",
    "iupacName": "Arrhenius Thermal Activation Chamber Apparatus",
    "archetype": "THERMAL_KINETICS",
    "structuredEffects": [
      {
        "effectId": "B16_EFF_33",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "RECOVER_RESOURCE",
            "params": {
              "amount": 1
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tích lũy 1 Mana và tăng 200 ATK liên tục mỗi lượt."
      }
    ]
  },
  {
    "id": "card_b16_034_cont_plug_flow_reactor_continuous_kinetic_34",
    "name": "Dòng Chảy Phản Ứng Ống PFR (Tầng 5)",
    "name_en": "Plug Flow Reactor Continuous Kinetic (Stage 5)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "CONTINUOUS_SPELL",
    "spellSpeed": 1,
    "rarity": "SECRET_RARE",
    "attribute": "AQUA",
    "manaCost": 3,
    "chemicalFormula": "dF/dV = r",
    "effectCode": "SPELL_B16_PLUG_FLOW_REACTOR_CONTINUOUS_KINETIC_KINETIC_34",
    "effectText": "[Phép Liên Tục / Continuous]: Duy trì trên sân. Mỗi khi bắt đầu lượt của bạn: Nhận thêm 1 Mana và tăng 200 ATK cho tất cả quái thú đồng minh trên sân.",
    "scientificLore": "Quy trình động học dòng liên tục Dòng Chảy Phản Ứng Ống PFR (Steady-State Mass Balance Differential) tối ưu hóa hiệu suất hóa học công nghiệp theo nguyên lý Hóa học Xanh và GDPT 2018.",
    "relatedEquation": "Steady-State Mass Balance Differential",
    "iupacName": "Plug Flow Reactor Continuous Kinetic Apparatus",
    "archetype": "ATMOSPHERIC_NITROGEN_FIXATION",
    "structuredEffects": [
      {
        "effectId": "B16_EFF_34",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "RECOVER_RESOURCE",
            "params": {
              "amount": 1
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tích lũy 1 Mana và tăng 200 ATK liên tục mỗi lượt."
      }
    ]
  },
  {
    "id": "card_b16_035_cont_fractional_distillation_continuous_tower_35",
    "name": "Tháp Chưng Cất Phân Đoạn Dầu Mỏ (Tầng 5)",
    "name_en": "Fractional Distillation Continuous Tower (Stage 5)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "CONTINUOUS_SPELL",
    "spellSpeed": 1,
    "rarity": "COMMON",
    "attribute": "TERRA",
    "manaCost": 4,
    "chemicalFormula": "Petro-Refinery",
    "effectCode": "SPELL_B16_FRACTIONAL_DISTILLATION_CONTINUOUS_TOWER_KINETIC_35",
    "effectText": "[Phép Liên Tục / Continuous]: Duy trì trên sân. Mỗi khi bắt đầu lượt của bạn: Nhận thêm 1 Mana và tăng 200 ATK cho tất cả quái thú đồng minh trên sân.",
    "scientificLore": "Quy trình động học dòng liên tục Tháp Chưng Cất Phân Đoạn Dầu Mỏ (Continuous Equilibrium Stage Separation) tối ưu hóa hiệu suất hóa học công nghiệp theo nguyên lý Hóa học Xanh và GDPT 2018.",
    "relatedEquation": "Continuous Equilibrium Stage Separation",
    "iupacName": "Fractional Distillation Continuous Tower Apparatus",
    "archetype": "THERMAL_KINETICS",
    "structuredEffects": [
      {
        "effectId": "B16_EFF_35",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "RECOVER_RESOURCE",
            "params": {
              "amount": 1
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tích lũy 1 Mana và tăng 200 ATK liên tục mỗi lượt."
      }
    ]
  },
  {
    "id": "card_b16_036_cont_haber_bosch_nitrogen_recycle_loop_36",
    "name": "Vòng Tuần Hoàn Tổng Hợp Haber-Bosch (Tầng 5)",
    "name_en": "Haber-Bosch Nitrogen Recycle Loop (Stage 5)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "CONTINUOUS_SPELL",
    "spellSpeed": 1,
    "rarity": "COMMON",
    "attribute": "AERO",
    "manaCost": 5,
    "chemicalFormula": "N2+3H2 ⇌ 2NH3",
    "effectCode": "SPELL_B16_HABER_BOSCH_NITROGEN_RECYCLE_LOOP_KINETIC_36",
    "effectText": "[Phép Liên Tục / Continuous]: Duy trì trên sân. Mỗi khi bắt đầu lượt của bạn: Nhận thêm 1 Mana và tăng 200 ATK cho tất cả quái thú đồng minh trên sân.",
    "scientificLore": "Quy trình động học dòng liên tục Vòng Tuần Hoàn Tổng Hợp Haber-Bosch (N₂ + 3H₂ ⇌ 2NH₃ (Continuous High-Pressure Recycle)) tối ưu hóa hiệu suất hóa học công nghiệp theo nguyên lý Hóa học Xanh và GDPT 2018.",
    "relatedEquation": "N₂ + 3H₂ ⇌ 2NH₃ (Continuous High-Pressure Recycle)",
    "iupacName": "Haber-Bosch Nitrogen Recycle Loop Apparatus",
    "archetype": "ATMOSPHERIC_NITROGEN_FIXATION",
    "structuredEffects": [
      {
        "effectId": "B16_EFF_36",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "RECOVER_RESOURCE",
            "params": {
              "amount": 1
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tích lũy 1 Mana và tăng 200 ATK liên tục mỗi lượt."
      }
    ]
  },
  {
    "id": "card_b16_037_cont_poly_aluminum_chloride_coagulation_basin_37",
    "name": "Bể Lắng Lọc Keo Tụ PAC (Tầng 5)",
    "name_en": "Poly-Aluminum Chloride Coagulation Basin (Stage 5)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "CONTINUOUS_SPELL",
    "spellSpeed": 1,
    "rarity": "COMMON",
    "attribute": "AQUA",
    "manaCost": 2,
    "chemicalFormula": "[Al2(OH)nCl6-n]m",
    "effectCode": "SPELL_B16_POLY_ALUMINUM_CHLORIDE_COAGULATION_BASIN_KINETIC_37",
    "effectText": "[Phép Liên Tục / Continuous]: Duy trì trên sân. Mỗi khi bắt đầu lượt của bạn: Nhận thêm 1 Mana và tăng 200 ATK cho tất cả quái thú đồng minh trên sân.",
    "scientificLore": "Quy trình động học dòng liên tục Bể Lắng Lọc Keo Tụ PAC (Colloidal Particle Neutralization & Sedimentation) tối ưu hóa hiệu suất hóa học công nghiệp theo nguyên lý Hóa học Xanh và GDPT 2018.",
    "relatedEquation": "Colloidal Particle Neutralization & Sedimentation",
    "iupacName": "Poly-Aluminum Chloride Coagulation Basin Apparatus",
    "archetype": "THERMAL_KINETICS",
    "structuredEffects": [
      {
        "effectId": "B16_EFF_37",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "RECOVER_RESOURCE",
            "params": {
              "amount": 1
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tích lũy 1 Mana và tăng 200 ATK liên tục mỗi lượt."
      }
    ]
  },
  {
    "id": "card_b16_038_cont_chloralkali_membrane_electrolysis_cell_38",
    "name": "Buồng Điện Phân Màng Ngăn Chloralkali (Tầng 5)",
    "name_en": "Chloralkali Membrane Electrolysis Cell (Stage 5)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "CONTINUOUS_SPELL",
    "spellSpeed": 1,
    "rarity": "RARE",
    "attribute": "ELECTRO",
    "manaCost": 3,
    "chemicalFormula": "2NaCl+2H2O",
    "effectCode": "SPELL_B16_CHLORALKALI_MEMBRANE_ELECTROLYSIS_CELL_KINETIC_38",
    "effectText": "[Phép Liên Tục / Continuous]: Duy trì trên sân. Mỗi khi bắt đầu lượt của bạn: Nhận thêm 1 Mana và tăng 200 ATK cho tất cả quái thú đồng minh trên sân.",
    "scientificLore": "Quy trình động học dòng liên tục Buồng Điện Phân Màng Ngăn Chloralkali (2NaCl + 2H₂O → 2NaOH + Cl₂↑ + H₂↑) tối ưu hóa hiệu suất hóa học công nghiệp theo nguyên lý Hóa học Xanh và GDPT 2018.",
    "relatedEquation": "2NaCl + 2H₂O → 2NaOH + Cl₂↑ + H₂↑",
    "iupacName": "Chloralkali Membrane Electrolysis Cell Apparatus",
    "archetype": "ATMOSPHERIC_NITROGEN_FIXATION",
    "structuredEffects": [
      {
        "effectId": "B16_EFF_38",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "RECOVER_RESOURCE",
            "params": {
              "amount": 1
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tích lũy 1 Mana và tăng 200 ATK liên tục mỗi lượt."
      }
    ]
  },
  {
    "id": "card_b16_039_cont_continuous_uv_photoreactor_chamber_39",
    "name": "Đèn Chiếu Xạ Quang Hóa Liên Tục (Tầng 5)",
    "name_en": "Continuous UV Photoreactor Chamber (Stage 5)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "CONTINUOUS_SPELL",
    "spellSpeed": 1,
    "rarity": "RARE",
    "attribute": "ELECTRO",
    "manaCost": 4,
    "chemicalFormula": "hν Radiation",
    "effectCode": "SPELL_B16_CONTINUOUS_UV_PHOTOREACTOR_CHAMBER_KINETIC_39",
    "effectText": "[Phép Liên Tục / Continuous]: Duy trì trên sân. Mỗi khi bắt đầu lượt của bạn: Nhận thêm 1 Mana và tăng 200 ATK cho tất cả quái thú đồng minh trên sân.",
    "scientificLore": "Quy trình động học dòng liên tục Đèn Chiếu Xạ Quang Hóa Liên Tục (Continuous Free Radical Initiation Flux) tối ưu hóa hiệu suất hóa học công nghiệp theo nguyên lý Hóa học Xanh và GDPT 2018.",
    "relatedEquation": "Continuous Free Radical Initiation Flux",
    "iupacName": "Continuous UV Photoreactor Chamber Apparatus",
    "archetype": "THERMAL_KINETICS",
    "structuredEffects": [
      {
        "effectId": "B16_EFF_39",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "RECOVER_RESOURCE",
            "params": {
              "amount": 1
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tích lũy 1 Mana và tăng 200 ATK liên tục mỗi lượt."
      }
    ]
  },
  {
    "id": "card_b16_040_cont_reverse_osmosis_desalination_cascade_40",
    "name": "Màng Lọc Thẩm Thấu Ngược RO (Tầng 5)",
    "name_en": "Reverse Osmosis Desalination Cascade (Stage 5)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "CONTINUOUS_SPELL",
    "spellSpeed": 1,
    "rarity": "SUPER_RARE",
    "attribute": "AQUA",
    "manaCost": 5,
    "chemicalFormula": "RO Membrane",
    "effectCode": "SPELL_B16_REVERSE_OSMOSIS_DESALINATION_CASCADE_KINETIC_40",
    "effectText": "[Phép Liên Tục / Continuous]: Duy trì trên sân. Mỗi khi bắt đầu lượt của bạn: Nhận thêm 1 Mana và tăng 200 ATK cho tất cả quái thú đồng minh trên sân.",
    "scientificLore": "Quy trình động học dòng liên tục Màng Lọc Thẩm Thấu Ngược RO (π = iMRT (High-Pressure Osmotic Solvent Driving)) tối ưu hóa hiệu suất hóa học công nghiệp theo nguyên lý Hóa học Xanh và GDPT 2018.",
    "relatedEquation": "π = iMRT (High-Pressure Osmotic Solvent Driving)",
    "iupacName": "Reverse Osmosis Desalination Cascade Apparatus",
    "archetype": "ATMOSPHERIC_NITROGEN_FIXATION",
    "structuredEffects": [
      {
        "effectId": "B16_EFF_40",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "RECOVER_RESOURCE",
            "params": {
              "amount": 1
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tích lũy 1 Mana và tăng 200 ATK liên tục mỗi lượt."
      }
    ]
  },
  {
    "id": "card_b16_041_cont_arrhenius_thermal_activation_chamber_41",
    "name": "Buồng Gia Tốc Nhiệt Động Arrhenius (Tầng 6)",
    "name_en": "Arrhenius Thermal Activation Chamber (Stage 6)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "CONTINUOUS_SPELL",
    "spellSpeed": 1,
    "rarity": "SUPER_RARE",
    "attribute": "PYRO",
    "manaCost": 2,
    "chemicalFormula": "k = A*exp(-Ea/RT)",
    "effectCode": "SPELL_B16_ARRHENIUS_THERMAL_ACTIVATION_CHAMBER_KINETIC_41",
    "effectText": "[Phép Liên Tục / Continuous]: Duy trì trên sân. Mỗi khi bắt đầu lượt của bạn: Nhận thêm 1 Mana và tăng 200 ATK cho tất cả quái thú đồng minh trên sân.",
    "scientificLore": "Quy trình động học dòng liên tục Buồng Gia Tốc Nhiệt Động Arrhenius (ln(k) = -Ea/R * (1/T) + ln(A)) tối ưu hóa hiệu suất hóa học công nghiệp theo nguyên lý Hóa học Xanh và GDPT 2018.",
    "relatedEquation": "ln(k) = -Ea/R * (1/T) + ln(A)",
    "iupacName": "Arrhenius Thermal Activation Chamber Apparatus",
    "archetype": "THERMAL_KINETICS",
    "structuredEffects": [
      {
        "effectId": "B16_EFF_41",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "RECOVER_RESOURCE",
            "params": {
              "amount": 1
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tích lũy 1 Mana và tăng 200 ATK liên tục mỗi lượt."
      }
    ]
  },
  {
    "id": "card_b16_042_cont_plug_flow_reactor_continuous_kinetic_42",
    "name": "Dòng Chảy Phản Ứng Ống PFR (Tầng 6)",
    "name_en": "Plug Flow Reactor Continuous Kinetic (Stage 6)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "CONTINUOUS_SPELL",
    "spellSpeed": 1,
    "rarity": "ULTRA_RARE",
    "attribute": "AQUA",
    "manaCost": 3,
    "chemicalFormula": "dF/dV = r",
    "effectCode": "SPELL_B16_PLUG_FLOW_REACTOR_CONTINUOUS_KINETIC_KINETIC_42",
    "effectText": "[Phép Liên Tục / Continuous]: Duy trì trên sân. Mỗi khi bắt đầu lượt của bạn: Nhận thêm 1 Mana và tăng 200 ATK cho tất cả quái thú đồng minh trên sân.",
    "scientificLore": "Quy trình động học dòng liên tục Dòng Chảy Phản Ứng Ống PFR (Steady-State Mass Balance Differential) tối ưu hóa hiệu suất hóa học công nghiệp theo nguyên lý Hóa học Xanh và GDPT 2018.",
    "relatedEquation": "Steady-State Mass Balance Differential",
    "iupacName": "Plug Flow Reactor Continuous Kinetic Apparatus",
    "archetype": "ATMOSPHERIC_NITROGEN_FIXATION",
    "structuredEffects": [
      {
        "effectId": "B16_EFF_42",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "RECOVER_RESOURCE",
            "params": {
              "amount": 1
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tích lũy 1 Mana và tăng 200 ATK liên tục mỗi lượt."
      }
    ]
  },
  {
    "id": "card_b16_043_cont_fractional_distillation_continuous_tower_43",
    "name": "Tháp Chưng Cất Phân Đoạn Dầu Mỏ (Tầng 6)",
    "name_en": "Fractional Distillation Continuous Tower (Stage 6)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "CONTINUOUS_SPELL",
    "spellSpeed": 1,
    "rarity": "SECRET_RARE",
    "attribute": "TERRA",
    "manaCost": 4,
    "chemicalFormula": "Petro-Refinery",
    "effectCode": "SPELL_B16_FRACTIONAL_DISTILLATION_CONTINUOUS_TOWER_KINETIC_43",
    "effectText": "[Phép Liên Tục / Continuous]: Duy trì trên sân. Mỗi khi bắt đầu lượt của bạn: Nhận thêm 1 Mana và tăng 200 ATK cho tất cả quái thú đồng minh trên sân.",
    "scientificLore": "Quy trình động học dòng liên tục Tháp Chưng Cất Phân Đoạn Dầu Mỏ (Continuous Equilibrium Stage Separation) tối ưu hóa hiệu suất hóa học công nghiệp theo nguyên lý Hóa học Xanh và GDPT 2018.",
    "relatedEquation": "Continuous Equilibrium Stage Separation",
    "iupacName": "Fractional Distillation Continuous Tower Apparatus",
    "archetype": "THERMAL_KINETICS",
    "structuredEffects": [
      {
        "effectId": "B16_EFF_43",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "RECOVER_RESOURCE",
            "params": {
              "amount": 1
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tích lũy 1 Mana và tăng 200 ATK liên tục mỗi lượt."
      }
    ]
  },
  {
    "id": "card_b16_044_cont_haber_bosch_nitrogen_recycle_loop_44",
    "name": "Vòng Tuần Hoàn Tổng Hợp Haber-Bosch (Tầng 6)",
    "name_en": "Haber-Bosch Nitrogen Recycle Loop (Stage 6)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "CONTINUOUS_SPELL",
    "spellSpeed": 1,
    "rarity": "COMMON",
    "attribute": "AERO",
    "manaCost": 5,
    "chemicalFormula": "N2+3H2 ⇌ 2NH3",
    "effectCode": "SPELL_B16_HABER_BOSCH_NITROGEN_RECYCLE_LOOP_KINETIC_44",
    "effectText": "[Phép Liên Tục / Continuous]: Duy trì trên sân. Mỗi khi bắt đầu lượt của bạn: Nhận thêm 1 Mana và tăng 200 ATK cho tất cả quái thú đồng minh trên sân.",
    "scientificLore": "Quy trình động học dòng liên tục Vòng Tuần Hoàn Tổng Hợp Haber-Bosch (N₂ + 3H₂ ⇌ 2NH₃ (Continuous High-Pressure Recycle)) tối ưu hóa hiệu suất hóa học công nghiệp theo nguyên lý Hóa học Xanh và GDPT 2018.",
    "relatedEquation": "N₂ + 3H₂ ⇌ 2NH₃ (Continuous High-Pressure Recycle)",
    "iupacName": "Haber-Bosch Nitrogen Recycle Loop Apparatus",
    "archetype": "ATMOSPHERIC_NITROGEN_FIXATION",
    "structuredEffects": [
      {
        "effectId": "B16_EFF_44",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "RECOVER_RESOURCE",
            "params": {
              "amount": 1
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tích lũy 1 Mana và tăng 200 ATK liên tục mỗi lượt."
      }
    ]
  },
  {
    "id": "card_b16_045_cont_poly_aluminum_chloride_coagulation_basin_45",
    "name": "Bể Lắng Lọc Keo Tụ PAC (Tầng 6)",
    "name_en": "Poly-Aluminum Chloride Coagulation Basin (Stage 6)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "CONTINUOUS_SPELL",
    "spellSpeed": 1,
    "rarity": "COMMON",
    "attribute": "AQUA",
    "manaCost": 2,
    "chemicalFormula": "[Al2(OH)nCl6-n]m",
    "effectCode": "SPELL_B16_POLY_ALUMINUM_CHLORIDE_COAGULATION_BASIN_KINETIC_45",
    "effectText": "[Phép Liên Tục / Continuous]: Duy trì trên sân. Mỗi khi bắt đầu lượt của bạn: Nhận thêm 1 Mana và tăng 200 ATK cho tất cả quái thú đồng minh trên sân.",
    "scientificLore": "Quy trình động học dòng liên tục Bể Lắng Lọc Keo Tụ PAC (Colloidal Particle Neutralization & Sedimentation) tối ưu hóa hiệu suất hóa học công nghiệp theo nguyên lý Hóa học Xanh và GDPT 2018.",
    "relatedEquation": "Colloidal Particle Neutralization & Sedimentation",
    "iupacName": "Poly-Aluminum Chloride Coagulation Basin Apparatus",
    "archetype": "THERMAL_KINETICS",
    "structuredEffects": [
      {
        "effectId": "B16_EFF_45",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "RECOVER_RESOURCE",
            "params": {
              "amount": 1
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tích lũy 1 Mana và tăng 200 ATK liên tục mỗi lượt."
      }
    ]
  },
  {
    "id": "card_b16_046_cont_chloralkali_membrane_electrolysis_cell_46",
    "name": "Buồng Điện Phân Màng Ngăn Chloralkali (Tầng 6)",
    "name_en": "Chloralkali Membrane Electrolysis Cell (Stage 6)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "CONTINUOUS_SPELL",
    "spellSpeed": 1,
    "rarity": "COMMON",
    "attribute": "ELECTRO",
    "manaCost": 3,
    "chemicalFormula": "2NaCl+2H2O",
    "effectCode": "SPELL_B16_CHLORALKALI_MEMBRANE_ELECTROLYSIS_CELL_KINETIC_46",
    "effectText": "[Phép Liên Tục / Continuous]: Duy trì trên sân. Mỗi khi bắt đầu lượt của bạn: Nhận thêm 1 Mana và tăng 200 ATK cho tất cả quái thú đồng minh trên sân.",
    "scientificLore": "Quy trình động học dòng liên tục Buồng Điện Phân Màng Ngăn Chloralkali (2NaCl + 2H₂O → 2NaOH + Cl₂↑ + H₂↑) tối ưu hóa hiệu suất hóa học công nghiệp theo nguyên lý Hóa học Xanh và GDPT 2018.",
    "relatedEquation": "2NaCl + 2H₂O → 2NaOH + Cl₂↑ + H₂↑",
    "iupacName": "Chloralkali Membrane Electrolysis Cell Apparatus",
    "archetype": "ATMOSPHERIC_NITROGEN_FIXATION",
    "structuredEffects": [
      {
        "effectId": "B16_EFF_46",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "RECOVER_RESOURCE",
            "params": {
              "amount": 1
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tích lũy 1 Mana và tăng 200 ATK liên tục mỗi lượt."
      }
    ]
  },
  {
    "id": "card_b16_047_cont_continuous_uv_photoreactor_chamber_47",
    "name": "Đèn Chiếu Xạ Quang Hóa Liên Tục (Tầng 6)",
    "name_en": "Continuous UV Photoreactor Chamber (Stage 6)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "CONTINUOUS_SPELL",
    "spellSpeed": 1,
    "rarity": "RARE",
    "attribute": "ELECTRO",
    "manaCost": 4,
    "chemicalFormula": "hν Radiation",
    "effectCode": "SPELL_B16_CONTINUOUS_UV_PHOTOREACTOR_CHAMBER_KINETIC_47",
    "effectText": "[Phép Liên Tục / Continuous]: Duy trì trên sân. Mỗi khi bắt đầu lượt của bạn: Nhận thêm 1 Mana và tăng 200 ATK cho tất cả quái thú đồng minh trên sân.",
    "scientificLore": "Quy trình động học dòng liên tục Đèn Chiếu Xạ Quang Hóa Liên Tục (Continuous Free Radical Initiation Flux) tối ưu hóa hiệu suất hóa học công nghiệp theo nguyên lý Hóa học Xanh và GDPT 2018.",
    "relatedEquation": "Continuous Free Radical Initiation Flux",
    "iupacName": "Continuous UV Photoreactor Chamber Apparatus",
    "archetype": "THERMAL_KINETICS",
    "structuredEffects": [
      {
        "effectId": "B16_EFF_47",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "RECOVER_RESOURCE",
            "params": {
              "amount": 1
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tích lũy 1 Mana và tăng 200 ATK liên tục mỗi lượt."
      }
    ]
  },
  {
    "id": "card_b16_048_cont_reverse_osmosis_desalination_cascade_48",
    "name": "Màng Lọc Thẩm Thấu Ngược RO (Tầng 6)",
    "name_en": "Reverse Osmosis Desalination Cascade (Stage 6)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "CONTINUOUS_SPELL",
    "spellSpeed": 1,
    "rarity": "RARE",
    "attribute": "AQUA",
    "manaCost": 5,
    "chemicalFormula": "RO Membrane",
    "effectCode": "SPELL_B16_REVERSE_OSMOSIS_DESALINATION_CASCADE_KINETIC_48",
    "effectText": "[Phép Liên Tục / Continuous]: Duy trì trên sân. Mỗi khi bắt đầu lượt của bạn: Nhận thêm 1 Mana và tăng 200 ATK cho tất cả quái thú đồng minh trên sân.",
    "scientificLore": "Quy trình động học dòng liên tục Màng Lọc Thẩm Thấu Ngược RO (π = iMRT (High-Pressure Osmotic Solvent Driving)) tối ưu hóa hiệu suất hóa học công nghiệp theo nguyên lý Hóa học Xanh và GDPT 2018.",
    "relatedEquation": "π = iMRT (High-Pressure Osmotic Solvent Driving)",
    "iupacName": "Reverse Osmosis Desalination Cascade Apparatus",
    "archetype": "ATMOSPHERIC_NITROGEN_FIXATION",
    "structuredEffects": [
      {
        "effectId": "B16_EFF_48",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "RECOVER_RESOURCE",
            "params": {
              "amount": 1
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tích lũy 1 Mana và tăng 200 ATK liên tục mỗi lượt."
      }
    ]
  },
  {
    "id": "card_b16_049_cont_arrhenius_thermal_activation_chamber_49",
    "name": "Buồng Gia Tốc Nhiệt Động Arrhenius (Tầng 7)",
    "name_en": "Arrhenius Thermal Activation Chamber (Stage 7)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "CONTINUOUS_SPELL",
    "spellSpeed": 1,
    "rarity": "SUPER_RARE",
    "attribute": "PYRO",
    "manaCost": 2,
    "chemicalFormula": "k = A*exp(-Ea/RT)",
    "effectCode": "SPELL_B16_ARRHENIUS_THERMAL_ACTIVATION_CHAMBER_KINETIC_49",
    "effectText": "[Phép Liên Tục / Continuous]: Duy trì trên sân. Mỗi khi bắt đầu lượt của bạn: Nhận thêm 1 Mana và tăng 200 ATK cho tất cả quái thú đồng minh trên sân.",
    "scientificLore": "Quy trình động học dòng liên tục Buồng Gia Tốc Nhiệt Động Arrhenius (ln(k) = -Ea/R * (1/T) + ln(A)) tối ưu hóa hiệu suất hóa học công nghiệp theo nguyên lý Hóa học Xanh và GDPT 2018.",
    "relatedEquation": "ln(k) = -Ea/R * (1/T) + ln(A)",
    "iupacName": "Arrhenius Thermal Activation Chamber Apparatus",
    "archetype": "THERMAL_KINETICS",
    "structuredEffects": [
      {
        "effectId": "B16_EFF_49",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "RECOVER_RESOURCE",
            "params": {
              "amount": 1
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tích lũy 1 Mana và tăng 200 ATK liên tục mỗi lượt."
      }
    ]
  },
  {
    "id": "card_b16_050_cont_plug_flow_reactor_continuous_kinetic_50",
    "name": "Dòng Chảy Phản Ứng Ống PFR (Tầng 7)",
    "name_en": "Plug Flow Reactor Continuous Kinetic (Stage 7)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "CONTINUOUS_SPELL",
    "spellSpeed": 1,
    "rarity": "SUPER_RARE",
    "attribute": "AQUA",
    "manaCost": 3,
    "chemicalFormula": "dF/dV = r",
    "effectCode": "SPELL_B16_PLUG_FLOW_REACTOR_CONTINUOUS_KINETIC_KINETIC_50",
    "effectText": "[Phép Liên Tục / Continuous]: Duy trì trên sân. Mỗi khi bắt đầu lượt của bạn: Nhận thêm 1 Mana và tăng 200 ATK cho tất cả quái thú đồng minh trên sân.",
    "scientificLore": "Quy trình động học dòng liên tục Dòng Chảy Phản Ứng Ống PFR (Steady-State Mass Balance Differential) tối ưu hóa hiệu suất hóa học công nghiệp theo nguyên lý Hóa học Xanh và GDPT 2018.",
    "relatedEquation": "Steady-State Mass Balance Differential",
    "iupacName": "Plug Flow Reactor Continuous Kinetic Apparatus",
    "archetype": "ATMOSPHERIC_NITROGEN_FIXATION",
    "structuredEffects": [
      {
        "effectId": "B16_EFF_50",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "RECOVER_RESOURCE",
            "params": {
              "amount": 1
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tích lũy 1 Mana và tăng 200 ATK liên tục mỗi lượt."
      }
    ]
  },
  {
    "id": "card_b16_051_cont_fractional_distillation_continuous_tower_51",
    "name": "Tháp Chưng Cất Phân Đoạn Dầu Mỏ (Tầng 7)",
    "name_en": "Fractional Distillation Continuous Tower (Stage 7)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "CONTINUOUS_SPELL",
    "spellSpeed": 1,
    "rarity": "ULTRA_RARE",
    "attribute": "TERRA",
    "manaCost": 4,
    "chemicalFormula": "Petro-Refinery",
    "effectCode": "SPELL_B16_FRACTIONAL_DISTILLATION_CONTINUOUS_TOWER_KINETIC_51",
    "effectText": "[Phép Liên Tục / Continuous]: Duy trì trên sân. Mỗi khi bắt đầu lượt của bạn: Nhận thêm 1 Mana và tăng 200 ATK cho tất cả quái thú đồng minh trên sân.",
    "scientificLore": "Quy trình động học dòng liên tục Tháp Chưng Cất Phân Đoạn Dầu Mỏ (Continuous Equilibrium Stage Separation) tối ưu hóa hiệu suất hóa học công nghiệp theo nguyên lý Hóa học Xanh và GDPT 2018.",
    "relatedEquation": "Continuous Equilibrium Stage Separation",
    "iupacName": "Fractional Distillation Continuous Tower Apparatus",
    "archetype": "THERMAL_KINETICS",
    "structuredEffects": [
      {
        "effectId": "B16_EFF_51",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "RECOVER_RESOURCE",
            "params": {
              "amount": 1
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tích lũy 1 Mana và tăng 200 ATK liên tục mỗi lượt."
      }
    ]
  },
  {
    "id": "card_b16_052_cont_haber_bosch_nitrogen_recycle_loop_52",
    "name": "Vòng Tuần Hoàn Tổng Hợp Haber-Bosch (Tầng 7)",
    "name_en": "Haber-Bosch Nitrogen Recycle Loop (Stage 7)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "CONTINUOUS_SPELL",
    "spellSpeed": 1,
    "rarity": "SECRET_RARE",
    "attribute": "AERO",
    "manaCost": 5,
    "chemicalFormula": "N2+3H2 ⇌ 2NH3",
    "effectCode": "SPELL_B16_HABER_BOSCH_NITROGEN_RECYCLE_LOOP_KINETIC_52",
    "effectText": "[Phép Liên Tục / Continuous]: Duy trì trên sân. Mỗi khi bắt đầu lượt của bạn: Nhận thêm 1 Mana và tăng 200 ATK cho tất cả quái thú đồng minh trên sân.",
    "scientificLore": "Quy trình động học dòng liên tục Vòng Tuần Hoàn Tổng Hợp Haber-Bosch (N₂ + 3H₂ ⇌ 2NH₃ (Continuous High-Pressure Recycle)) tối ưu hóa hiệu suất hóa học công nghiệp theo nguyên lý Hóa học Xanh và GDPT 2018.",
    "relatedEquation": "N₂ + 3H₂ ⇌ 2NH₃ (Continuous High-Pressure Recycle)",
    "iupacName": "Haber-Bosch Nitrogen Recycle Loop Apparatus",
    "archetype": "ATMOSPHERIC_NITROGEN_FIXATION",
    "structuredEffects": [
      {
        "effectId": "B16_EFF_52",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "RECOVER_RESOURCE",
            "params": {
              "amount": 1
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tích lũy 1 Mana và tăng 200 ATK liên tục mỗi lượt."
      }
    ]
  },
  {
    "id": "card_b16_053_cont_poly_aluminum_chloride_coagulation_basin_53",
    "name": "Bể Lắng Lọc Keo Tụ PAC (Tầng 7)",
    "name_en": "Poly-Aluminum Chloride Coagulation Basin (Stage 7)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "CONTINUOUS_SPELL",
    "spellSpeed": 1,
    "rarity": "COMMON",
    "attribute": "AQUA",
    "manaCost": 2,
    "chemicalFormula": "[Al2(OH)nCl6-n]m",
    "effectCode": "SPELL_B16_POLY_ALUMINUM_CHLORIDE_COAGULATION_BASIN_KINETIC_53",
    "effectText": "[Phép Liên Tục / Continuous]: Duy trì trên sân. Mỗi khi bắt đầu lượt của bạn: Nhận thêm 1 Mana và tăng 200 ATK cho tất cả quái thú đồng minh trên sân.",
    "scientificLore": "Quy trình động học dòng liên tục Bể Lắng Lọc Keo Tụ PAC (Colloidal Particle Neutralization & Sedimentation) tối ưu hóa hiệu suất hóa học công nghiệp theo nguyên lý Hóa học Xanh và GDPT 2018.",
    "relatedEquation": "Colloidal Particle Neutralization & Sedimentation",
    "iupacName": "Poly-Aluminum Chloride Coagulation Basin Apparatus",
    "archetype": "THERMAL_KINETICS",
    "structuredEffects": [
      {
        "effectId": "B16_EFF_53",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "RECOVER_RESOURCE",
            "params": {
              "amount": 1
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tích lũy 1 Mana và tăng 200 ATK liên tục mỗi lượt."
      }
    ]
  },
  {
    "id": "card_b16_054_cont_chloralkali_membrane_electrolysis_cell_54",
    "name": "Buồng Điện Phân Màng Ngăn Chloralkali (Tầng 7)",
    "name_en": "Chloralkali Membrane Electrolysis Cell (Stage 7)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "CONTINUOUS_SPELL",
    "spellSpeed": 1,
    "rarity": "COMMON",
    "attribute": "ELECTRO",
    "manaCost": 3,
    "chemicalFormula": "2NaCl+2H2O",
    "effectCode": "SPELL_B16_CHLORALKALI_MEMBRANE_ELECTROLYSIS_CELL_KINETIC_54",
    "effectText": "[Phép Liên Tục / Continuous]: Duy trì trên sân. Mỗi khi bắt đầu lượt của bạn: Nhận thêm 1 Mana và tăng 200 ATK cho tất cả quái thú đồng minh trên sân.",
    "scientificLore": "Quy trình động học dòng liên tục Buồng Điện Phân Màng Ngăn Chloralkali (2NaCl + 2H₂O → 2NaOH + Cl₂↑ + H₂↑) tối ưu hóa hiệu suất hóa học công nghiệp theo nguyên lý Hóa học Xanh và GDPT 2018.",
    "relatedEquation": "2NaCl + 2H₂O → 2NaOH + Cl₂↑ + H₂↑",
    "iupacName": "Chloralkali Membrane Electrolysis Cell Apparatus",
    "archetype": "ATMOSPHERIC_NITROGEN_FIXATION",
    "structuredEffects": [
      {
        "effectId": "B16_EFF_54",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "RECOVER_RESOURCE",
            "params": {
              "amount": 1
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tích lũy 1 Mana và tăng 200 ATK liên tục mỗi lượt."
      }
    ]
  },
  {
    "id": "card_b16_055_cont_continuous_uv_photoreactor_chamber_55",
    "name": "Đèn Chiếu Xạ Quang Hóa Liên Tục (Tầng 7)",
    "name_en": "Continuous UV Photoreactor Chamber (Stage 7)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "CONTINUOUS_SPELL",
    "spellSpeed": 1,
    "rarity": "COMMON",
    "attribute": "ELECTRO",
    "manaCost": 4,
    "chemicalFormula": "hν Radiation",
    "effectCode": "SPELL_B16_CONTINUOUS_UV_PHOTOREACTOR_CHAMBER_KINETIC_55",
    "effectText": "[Phép Liên Tục / Continuous]: Duy trì trên sân. Mỗi khi bắt đầu lượt của bạn: Nhận thêm 1 Mana và tăng 200 ATK cho tất cả quái thú đồng minh trên sân.",
    "scientificLore": "Quy trình động học dòng liên tục Đèn Chiếu Xạ Quang Hóa Liên Tục (Continuous Free Radical Initiation Flux) tối ưu hóa hiệu suất hóa học công nghiệp theo nguyên lý Hóa học Xanh và GDPT 2018.",
    "relatedEquation": "Continuous Free Radical Initiation Flux",
    "iupacName": "Continuous UV Photoreactor Chamber Apparatus",
    "archetype": "THERMAL_KINETICS",
    "structuredEffects": [
      {
        "effectId": "B16_EFF_55",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "RECOVER_RESOURCE",
            "params": {
              "amount": 1
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tích lũy 1 Mana và tăng 200 ATK liên tục mỗi lượt."
      }
    ]
  },
  {
    "id": "card_b16_056_cont_reverse_osmosis_desalination_cascade_56",
    "name": "Màng Lọc Thẩm Thấu Ngược RO (Tầng 7)",
    "name_en": "Reverse Osmosis Desalination Cascade (Stage 7)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "CONTINUOUS_SPELL",
    "spellSpeed": 1,
    "rarity": "RARE",
    "attribute": "AQUA",
    "manaCost": 5,
    "chemicalFormula": "RO Membrane",
    "effectCode": "SPELL_B16_REVERSE_OSMOSIS_DESALINATION_CASCADE_KINETIC_56",
    "effectText": "[Phép Liên Tục / Continuous]: Duy trì trên sân. Mỗi khi bắt đầu lượt của bạn: Nhận thêm 1 Mana và tăng 200 ATK cho tất cả quái thú đồng minh trên sân.",
    "scientificLore": "Quy trình động học dòng liên tục Màng Lọc Thẩm Thấu Ngược RO (π = iMRT (High-Pressure Osmotic Solvent Driving)) tối ưu hóa hiệu suất hóa học công nghiệp theo nguyên lý Hóa học Xanh và GDPT 2018.",
    "relatedEquation": "π = iMRT (High-Pressure Osmotic Solvent Driving)",
    "iupacName": "Reverse Osmosis Desalination Cascade Apparatus",
    "archetype": "ATMOSPHERIC_NITROGEN_FIXATION",
    "structuredEffects": [
      {
        "effectId": "B16_EFF_56",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "RECOVER_RESOURCE",
            "params": {
              "amount": 1
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tích lũy 1 Mana và tăng 200 ATK liên tục mỗi lượt."
      }
    ]
  },
  {
    "id": "card_b16_057_cont_arrhenius_thermal_activation_chamber_57",
    "name": "Buồng Gia Tốc Nhiệt Động Arrhenius (Tầng 8)",
    "name_en": "Arrhenius Thermal Activation Chamber (Stage 8)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "CONTINUOUS_SPELL",
    "spellSpeed": 1,
    "rarity": "RARE",
    "attribute": "PYRO",
    "manaCost": 2,
    "chemicalFormula": "k = A*exp(-Ea/RT)",
    "effectCode": "SPELL_B16_ARRHENIUS_THERMAL_ACTIVATION_CHAMBER_KINETIC_57",
    "effectText": "[Phép Liên Tục / Continuous]: Duy trì trên sân. Mỗi khi bắt đầu lượt của bạn: Nhận thêm 1 Mana và tăng 200 ATK cho tất cả quái thú đồng minh trên sân.",
    "scientificLore": "Quy trình động học dòng liên tục Buồng Gia Tốc Nhiệt Động Arrhenius (ln(k) = -Ea/R * (1/T) + ln(A)) tối ưu hóa hiệu suất hóa học công nghiệp theo nguyên lý Hóa học Xanh và GDPT 2018.",
    "relatedEquation": "ln(k) = -Ea/R * (1/T) + ln(A)",
    "iupacName": "Arrhenius Thermal Activation Chamber Apparatus",
    "archetype": "THERMAL_KINETICS",
    "structuredEffects": [
      {
        "effectId": "B16_EFF_57",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "RECOVER_RESOURCE",
            "params": {
              "amount": 1
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tích lũy 1 Mana và tăng 200 ATK liên tục mỗi lượt."
      }
    ]
  },
  {
    "id": "card_b16_058_cont_plug_flow_reactor_continuous_kinetic_58",
    "name": "Dòng Chảy Phản Ứng Ống PFR (Tầng 8)",
    "name_en": "Plug Flow Reactor Continuous Kinetic (Stage 8)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "CONTINUOUS_SPELL",
    "spellSpeed": 1,
    "rarity": "SUPER_RARE",
    "attribute": "AQUA",
    "manaCost": 3,
    "chemicalFormula": "dF/dV = r",
    "effectCode": "SPELL_B16_PLUG_FLOW_REACTOR_CONTINUOUS_KINETIC_KINETIC_58",
    "effectText": "[Phép Liên Tục / Continuous]: Duy trì trên sân. Mỗi khi bắt đầu lượt của bạn: Nhận thêm 1 Mana và tăng 200 ATK cho tất cả quái thú đồng minh trên sân.",
    "scientificLore": "Quy trình động học dòng liên tục Dòng Chảy Phản Ứng Ống PFR (Steady-State Mass Balance Differential) tối ưu hóa hiệu suất hóa học công nghiệp theo nguyên lý Hóa học Xanh và GDPT 2018.",
    "relatedEquation": "Steady-State Mass Balance Differential",
    "iupacName": "Plug Flow Reactor Continuous Kinetic Apparatus",
    "archetype": "ATMOSPHERIC_NITROGEN_FIXATION",
    "structuredEffects": [
      {
        "effectId": "B16_EFF_58",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "RECOVER_RESOURCE",
            "params": {
              "amount": 1
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tích lũy 1 Mana và tăng 200 ATK liên tục mỗi lượt."
      }
    ]
  },
  {
    "id": "card_b16_059_cont_fractional_distillation_continuous_tower_59",
    "name": "Tháp Chưng Cất Phân Đoạn Dầu Mỏ (Tầng 8)",
    "name_en": "Fractional Distillation Continuous Tower (Stage 8)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "CONTINUOUS_SPELL",
    "spellSpeed": 1,
    "rarity": "SUPER_RARE",
    "attribute": "TERRA",
    "manaCost": 4,
    "chemicalFormula": "Petro-Refinery",
    "effectCode": "SPELL_B16_FRACTIONAL_DISTILLATION_CONTINUOUS_TOWER_KINETIC_59",
    "effectText": "[Phép Liên Tục / Continuous]: Duy trì trên sân. Mỗi khi bắt đầu lượt của bạn: Nhận thêm 1 Mana và tăng 200 ATK cho tất cả quái thú đồng minh trên sân.",
    "scientificLore": "Quy trình động học dòng liên tục Tháp Chưng Cất Phân Đoạn Dầu Mỏ (Continuous Equilibrium Stage Separation) tối ưu hóa hiệu suất hóa học công nghiệp theo nguyên lý Hóa học Xanh và GDPT 2018.",
    "relatedEquation": "Continuous Equilibrium Stage Separation",
    "iupacName": "Fractional Distillation Continuous Tower Apparatus",
    "archetype": "THERMAL_KINETICS",
    "structuredEffects": [
      {
        "effectId": "B16_EFF_59",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "RECOVER_RESOURCE",
            "params": {
              "amount": 1
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tích lũy 1 Mana và tăng 200 ATK liên tục mỗi lượt."
      }
    ]
  },
  {
    "id": "card_b16_060_cont_haber_bosch_nitrogen_recycle_loop_60",
    "name": "Vòng Tuần Hoàn Tổng Hợp Haber-Bosch (Tầng 8)",
    "name_en": "Haber-Bosch Nitrogen Recycle Loop (Stage 8)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "CONTINUOUS_SPELL",
    "spellSpeed": 1,
    "rarity": "ULTRA_RARE",
    "attribute": "AERO",
    "manaCost": 5,
    "chemicalFormula": "N2+3H2 ⇌ 2NH3",
    "effectCode": "SPELL_B16_HABER_BOSCH_NITROGEN_RECYCLE_LOOP_KINETIC_60",
    "effectText": "[Phép Liên Tục / Continuous]: Duy trì trên sân. Mỗi khi bắt đầu lượt của bạn: Nhận thêm 1 Mana và tăng 200 ATK cho tất cả quái thú đồng minh trên sân.",
    "scientificLore": "Quy trình động học dòng liên tục Vòng Tuần Hoàn Tổng Hợp Haber-Bosch (N₂ + 3H₂ ⇌ 2NH₃ (Continuous High-Pressure Recycle)) tối ưu hóa hiệu suất hóa học công nghiệp theo nguyên lý Hóa học Xanh và GDPT 2018.",
    "relatedEquation": "N₂ + 3H₂ ⇌ 2NH₃ (Continuous High-Pressure Recycle)",
    "iupacName": "Haber-Bosch Nitrogen Recycle Loop Apparatus",
    "archetype": "ATMOSPHERIC_NITROGEN_FIXATION",
    "structuredEffects": [
      {
        "effectId": "B16_EFF_60",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "RECOVER_RESOURCE",
            "params": {
              "amount": 1
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tích lũy 1 Mana và tăng 200 ATK liên tục mỗi lượt."
      }
    ]
  },
  {
    "id": "card_b16_061_cont_poly_aluminum_chloride_coagulation_basin_61",
    "name": "Bể Lắng Lọc Keo Tụ PAC (Tầng 8)",
    "name_en": "Poly-Aluminum Chloride Coagulation Basin (Stage 8)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "CONTINUOUS_SPELL",
    "spellSpeed": 1,
    "rarity": "SECRET_RARE",
    "attribute": "AQUA",
    "manaCost": 2,
    "chemicalFormula": "[Al2(OH)nCl6-n]m",
    "effectCode": "SPELL_B16_POLY_ALUMINUM_CHLORIDE_COAGULATION_BASIN_KINETIC_61",
    "effectText": "[Phép Liên Tục / Continuous]: Duy trì trên sân. Mỗi khi bắt đầu lượt của bạn: Nhận thêm 1 Mana và tăng 200 ATK cho tất cả quái thú đồng minh trên sân.",
    "scientificLore": "Quy trình động học dòng liên tục Bể Lắng Lọc Keo Tụ PAC (Colloidal Particle Neutralization & Sedimentation) tối ưu hóa hiệu suất hóa học công nghiệp theo nguyên lý Hóa học Xanh và GDPT 2018.",
    "relatedEquation": "Colloidal Particle Neutralization & Sedimentation",
    "iupacName": "Poly-Aluminum Chloride Coagulation Basin Apparatus",
    "archetype": "THERMAL_KINETICS",
    "structuredEffects": [
      {
        "effectId": "B16_EFF_61",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "RECOVER_RESOURCE",
            "params": {
              "amount": 1
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tích lũy 1 Mana và tăng 200 ATK liên tục mỗi lượt."
      }
    ]
  },
  {
    "id": "card_b16_062_cont_chloralkali_membrane_electrolysis_cell_62",
    "name": "Buồng Điện Phân Màng Ngăn Chloralkali (Tầng 8)",
    "name_en": "Chloralkali Membrane Electrolysis Cell (Stage 8)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "CONTINUOUS_SPELL",
    "spellSpeed": 1,
    "rarity": "COMMON",
    "attribute": "ELECTRO",
    "manaCost": 3,
    "chemicalFormula": "2NaCl+2H2O",
    "effectCode": "SPELL_B16_CHLORALKALI_MEMBRANE_ELECTROLYSIS_CELL_KINETIC_62",
    "effectText": "[Phép Liên Tục / Continuous]: Duy trì trên sân. Mỗi khi bắt đầu lượt của bạn: Nhận thêm 1 Mana và tăng 200 ATK cho tất cả quái thú đồng minh trên sân.",
    "scientificLore": "Quy trình động học dòng liên tục Buồng Điện Phân Màng Ngăn Chloralkali (2NaCl + 2H₂O → 2NaOH + Cl₂↑ + H₂↑) tối ưu hóa hiệu suất hóa học công nghiệp theo nguyên lý Hóa học Xanh và GDPT 2018.",
    "relatedEquation": "2NaCl + 2H₂O → 2NaOH + Cl₂↑ + H₂↑",
    "iupacName": "Chloralkali Membrane Electrolysis Cell Apparatus",
    "archetype": "ATMOSPHERIC_NITROGEN_FIXATION",
    "structuredEffects": [
      {
        "effectId": "B16_EFF_62",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "RECOVER_RESOURCE",
            "params": {
              "amount": 1
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tích lũy 1 Mana và tăng 200 ATK liên tục mỗi lượt."
      }
    ]
  },
  {
    "id": "card_b16_063_cont_continuous_uv_photoreactor_chamber_63",
    "name": "Đèn Chiếu Xạ Quang Hóa Liên Tục (Tầng 8)",
    "name_en": "Continuous UV Photoreactor Chamber (Stage 8)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "CONTINUOUS_SPELL",
    "spellSpeed": 1,
    "rarity": "COMMON",
    "attribute": "ELECTRO",
    "manaCost": 4,
    "chemicalFormula": "hν Radiation",
    "effectCode": "SPELL_B16_CONTINUOUS_UV_PHOTOREACTOR_CHAMBER_KINETIC_63",
    "effectText": "[Phép Liên Tục / Continuous]: Duy trì trên sân. Mỗi khi bắt đầu lượt của bạn: Nhận thêm 1 Mana và tăng 200 ATK cho tất cả quái thú đồng minh trên sân.",
    "scientificLore": "Quy trình động học dòng liên tục Đèn Chiếu Xạ Quang Hóa Liên Tục (Continuous Free Radical Initiation Flux) tối ưu hóa hiệu suất hóa học công nghiệp theo nguyên lý Hóa học Xanh và GDPT 2018.",
    "relatedEquation": "Continuous Free Radical Initiation Flux",
    "iupacName": "Continuous UV Photoreactor Chamber Apparatus",
    "archetype": "THERMAL_KINETICS",
    "structuredEffects": [
      {
        "effectId": "B16_EFF_63",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "RECOVER_RESOURCE",
            "params": {
              "amount": 1
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tích lũy 1 Mana và tăng 200 ATK liên tục mỗi lượt."
      }
    ]
  },
  {
    "id": "card_b16_064_cont_reverse_osmosis_desalination_cascade_64",
    "name": "Màng Lọc Thẩm Thấu Ngược RO (Tầng 8)",
    "name_en": "Reverse Osmosis Desalination Cascade (Stage 8)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "CONTINUOUS_SPELL",
    "spellSpeed": 1,
    "rarity": "COMMON",
    "attribute": "AQUA",
    "manaCost": 5,
    "chemicalFormula": "RO Membrane",
    "effectCode": "SPELL_B16_REVERSE_OSMOSIS_DESALINATION_CASCADE_KINETIC_64",
    "effectText": "[Phép Liên Tục / Continuous]: Duy trì trên sân. Mỗi khi bắt đầu lượt của bạn: Nhận thêm 1 Mana và tăng 200 ATK cho tất cả quái thú đồng minh trên sân.",
    "scientificLore": "Quy trình động học dòng liên tục Màng Lọc Thẩm Thấu Ngược RO (π = iMRT (High-Pressure Osmotic Solvent Driving)) tối ưu hóa hiệu suất hóa học công nghiệp theo nguyên lý Hóa học Xanh và GDPT 2018.",
    "relatedEquation": "π = iMRT (High-Pressure Osmotic Solvent Driving)",
    "iupacName": "Reverse Osmosis Desalination Cascade Apparatus",
    "archetype": "ATMOSPHERIC_NITROGEN_FIXATION",
    "structuredEffects": [
      {
        "effectId": "B16_EFF_64",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "RECOVER_RESOURCE",
            "params": {
              "amount": 1
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tích lũy 1 Mana và tăng 200 ATK liên tục mỗi lượt."
      }
    ]
  },
  {
    "id": "card_b16_065_cont_arrhenius_thermal_activation_chamber_65",
    "name": "Buồng Gia Tốc Nhiệt Động Arrhenius (Tầng 9)",
    "name_en": "Arrhenius Thermal Activation Chamber (Stage 9)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "CONTINUOUS_SPELL",
    "spellSpeed": 1,
    "rarity": "RARE",
    "attribute": "PYRO",
    "manaCost": 2,
    "chemicalFormula": "k = A*exp(-Ea/RT)",
    "effectCode": "SPELL_B16_ARRHENIUS_THERMAL_ACTIVATION_CHAMBER_KINETIC_65",
    "effectText": "[Phép Liên Tục / Continuous]: Duy trì trên sân. Mỗi khi bắt đầu lượt của bạn: Nhận thêm 1 Mana và tăng 200 ATK cho tất cả quái thú đồng minh trên sân.",
    "scientificLore": "Quy trình động học dòng liên tục Buồng Gia Tốc Nhiệt Động Arrhenius (ln(k) = -Ea/R * (1/T) + ln(A)) tối ưu hóa hiệu suất hóa học công nghiệp theo nguyên lý Hóa học Xanh và GDPT 2018.",
    "relatedEquation": "ln(k) = -Ea/R * (1/T) + ln(A)",
    "iupacName": "Arrhenius Thermal Activation Chamber Apparatus",
    "archetype": "THERMAL_KINETICS",
    "structuredEffects": [
      {
        "effectId": "B16_EFF_65",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "RECOVER_RESOURCE",
            "params": {
              "amount": 1
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tích lũy 1 Mana và tăng 200 ATK liên tục mỗi lượt."
      }
    ]
  },
  {
    "id": "card_b16_066_cont_plug_flow_reactor_continuous_kinetic_66",
    "name": "Dòng Chảy Phản Ứng Ống PFR (Tầng 9)",
    "name_en": "Plug Flow Reactor Continuous Kinetic (Stage 9)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "CONTINUOUS_SPELL",
    "spellSpeed": 1,
    "rarity": "RARE",
    "attribute": "AQUA",
    "manaCost": 3,
    "chemicalFormula": "dF/dV = r",
    "effectCode": "SPELL_B16_PLUG_FLOW_REACTOR_CONTINUOUS_KINETIC_KINETIC_66",
    "effectText": "[Phép Liên Tục / Continuous]: Duy trì trên sân. Mỗi khi bắt đầu lượt của bạn: Nhận thêm 1 Mana và tăng 200 ATK cho tất cả quái thú đồng minh trên sân.",
    "scientificLore": "Quy trình động học dòng liên tục Dòng Chảy Phản Ứng Ống PFR (Steady-State Mass Balance Differential) tối ưu hóa hiệu suất hóa học công nghiệp theo nguyên lý Hóa học Xanh và GDPT 2018.",
    "relatedEquation": "Steady-State Mass Balance Differential",
    "iupacName": "Plug Flow Reactor Continuous Kinetic Apparatus",
    "archetype": "ATMOSPHERIC_NITROGEN_FIXATION",
    "structuredEffects": [
      {
        "effectId": "B16_EFF_66",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "RECOVER_RESOURCE",
            "params": {
              "amount": 1
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tích lũy 1 Mana và tăng 200 ATK liên tục mỗi lượt."
      }
    ]
  },
  {
    "id": "card_b16_067_cont_fractional_distillation_continuous_tower_67",
    "name": "Tháp Chưng Cất Phân Đoạn Dầu Mỏ (Tầng 9)",
    "name_en": "Fractional Distillation Continuous Tower (Stage 9)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "CONTINUOUS_SPELL",
    "spellSpeed": 1,
    "rarity": "SUPER_RARE",
    "attribute": "TERRA",
    "manaCost": 4,
    "chemicalFormula": "Petro-Refinery",
    "effectCode": "SPELL_B16_FRACTIONAL_DISTILLATION_CONTINUOUS_TOWER_KINETIC_67",
    "effectText": "[Phép Liên Tục / Continuous]: Duy trì trên sân. Mỗi khi bắt đầu lượt của bạn: Nhận thêm 1 Mana và tăng 200 ATK cho tất cả quái thú đồng minh trên sân.",
    "scientificLore": "Quy trình động học dòng liên tục Tháp Chưng Cất Phân Đoạn Dầu Mỏ (Continuous Equilibrium Stage Separation) tối ưu hóa hiệu suất hóa học công nghiệp theo nguyên lý Hóa học Xanh và GDPT 2018.",
    "relatedEquation": "Continuous Equilibrium Stage Separation",
    "iupacName": "Fractional Distillation Continuous Tower Apparatus",
    "archetype": "THERMAL_KINETICS",
    "structuredEffects": [
      {
        "effectId": "B16_EFF_67",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "RECOVER_RESOURCE",
            "params": {
              "amount": 1
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tích lũy 1 Mana và tăng 200 ATK liên tục mỗi lượt."
      }
    ]
  },
  {
    "id": "card_b16_068_cont_haber_bosch_nitrogen_recycle_loop_68",
    "name": "Vòng Tuần Hoàn Tổng Hợp Haber-Bosch (Tầng 9)",
    "name_en": "Haber-Bosch Nitrogen Recycle Loop (Stage 9)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "CONTINUOUS_SPELL",
    "spellSpeed": 1,
    "rarity": "SUPER_RARE",
    "attribute": "AERO",
    "manaCost": 5,
    "chemicalFormula": "N2+3H2 ⇌ 2NH3",
    "effectCode": "SPELL_B16_HABER_BOSCH_NITROGEN_RECYCLE_LOOP_KINETIC_68",
    "effectText": "[Phép Liên Tục / Continuous]: Duy trì trên sân. Mỗi khi bắt đầu lượt của bạn: Nhận thêm 1 Mana và tăng 200 ATK cho tất cả quái thú đồng minh trên sân.",
    "scientificLore": "Quy trình động học dòng liên tục Vòng Tuần Hoàn Tổng Hợp Haber-Bosch (N₂ + 3H₂ ⇌ 2NH₃ (Continuous High-Pressure Recycle)) tối ưu hóa hiệu suất hóa học công nghiệp theo nguyên lý Hóa học Xanh và GDPT 2018.",
    "relatedEquation": "N₂ + 3H₂ ⇌ 2NH₃ (Continuous High-Pressure Recycle)",
    "iupacName": "Haber-Bosch Nitrogen Recycle Loop Apparatus",
    "archetype": "ATMOSPHERIC_NITROGEN_FIXATION",
    "structuredEffects": [
      {
        "effectId": "B16_EFF_68",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "RECOVER_RESOURCE",
            "params": {
              "amount": 1
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tích lũy 1 Mana và tăng 200 ATK liên tục mỗi lượt."
      }
    ]
  },
  {
    "id": "card_b16_069_cont_poly_aluminum_chloride_coagulation_basin_69",
    "name": "Bể Lắng Lọc Keo Tụ PAC (Tầng 9)",
    "name_en": "Poly-Aluminum Chloride Coagulation Basin (Stage 9)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "CONTINUOUS_SPELL",
    "spellSpeed": 1,
    "rarity": "ULTRA_RARE",
    "attribute": "AQUA",
    "manaCost": 2,
    "chemicalFormula": "[Al2(OH)nCl6-n]m",
    "effectCode": "SPELL_B16_POLY_ALUMINUM_CHLORIDE_COAGULATION_BASIN_KINETIC_69",
    "effectText": "[Phép Liên Tục / Continuous]: Duy trì trên sân. Mỗi khi bắt đầu lượt của bạn: Nhận thêm 1 Mana và tăng 200 ATK cho tất cả quái thú đồng minh trên sân.",
    "scientificLore": "Quy trình động học dòng liên tục Bể Lắng Lọc Keo Tụ PAC (Colloidal Particle Neutralization & Sedimentation) tối ưu hóa hiệu suất hóa học công nghiệp theo nguyên lý Hóa học Xanh và GDPT 2018.",
    "relatedEquation": "Colloidal Particle Neutralization & Sedimentation",
    "iupacName": "Poly-Aluminum Chloride Coagulation Basin Apparatus",
    "archetype": "THERMAL_KINETICS",
    "structuredEffects": [
      {
        "effectId": "B16_EFF_69",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "RECOVER_RESOURCE",
            "params": {
              "amount": 1
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tích lũy 1 Mana và tăng 200 ATK liên tục mỗi lượt."
      }
    ]
  },
  {
    "id": "card_b16_070_cont_chloralkali_membrane_electrolysis_cell_70",
    "name": "Buồng Điện Phân Màng Ngăn Chloralkali (Tầng 9)",
    "name_en": "Chloralkali Membrane Electrolysis Cell (Stage 9)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "CONTINUOUS_SPELL",
    "spellSpeed": 1,
    "rarity": "SECRET_RARE",
    "attribute": "ELECTRO",
    "manaCost": 3,
    "chemicalFormula": "2NaCl+2H2O",
    "effectCode": "SPELL_B16_CHLORALKALI_MEMBRANE_ELECTROLYSIS_CELL_KINETIC_70",
    "effectText": "[Phép Liên Tục / Continuous]: Duy trì trên sân. Mỗi khi bắt đầu lượt của bạn: Nhận thêm 1 Mana và tăng 200 ATK cho tất cả quái thú đồng minh trên sân.",
    "scientificLore": "Quy trình động học dòng liên tục Buồng Điện Phân Màng Ngăn Chloralkali (2NaCl + 2H₂O → 2NaOH + Cl₂↑ + H₂↑) tối ưu hóa hiệu suất hóa học công nghiệp theo nguyên lý Hóa học Xanh và GDPT 2018.",
    "relatedEquation": "2NaCl + 2H₂O → 2NaOH + Cl₂↑ + H₂↑",
    "iupacName": "Chloralkali Membrane Electrolysis Cell Apparatus",
    "archetype": "ATMOSPHERIC_NITROGEN_FIXATION",
    "structuredEffects": [
      {
        "effectId": "B16_EFF_70",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "RECOVER_RESOURCE",
            "params": {
              "amount": 1
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tích lũy 1 Mana và tăng 200 ATK liên tục mỗi lượt."
      }
    ]
  },
  {
    "id": "card_b16_071_cont_continuous_uv_photoreactor_chamber_71",
    "name": "Đèn Chiếu Xạ Quang Hóa Liên Tục (Tầng 9)",
    "name_en": "Continuous UV Photoreactor Chamber (Stage 9)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "CONTINUOUS_SPELL",
    "spellSpeed": 1,
    "rarity": "COMMON",
    "attribute": "ELECTRO",
    "manaCost": 4,
    "chemicalFormula": "hν Radiation",
    "effectCode": "SPELL_B16_CONTINUOUS_UV_PHOTOREACTOR_CHAMBER_KINETIC_71",
    "effectText": "[Phép Liên Tục / Continuous]: Duy trì trên sân. Mỗi khi bắt đầu lượt của bạn: Nhận thêm 1 Mana và tăng 200 ATK cho tất cả quái thú đồng minh trên sân.",
    "scientificLore": "Quy trình động học dòng liên tục Đèn Chiếu Xạ Quang Hóa Liên Tục (Continuous Free Radical Initiation Flux) tối ưu hóa hiệu suất hóa học công nghiệp theo nguyên lý Hóa học Xanh và GDPT 2018.",
    "relatedEquation": "Continuous Free Radical Initiation Flux",
    "iupacName": "Continuous UV Photoreactor Chamber Apparatus",
    "archetype": "THERMAL_KINETICS",
    "structuredEffects": [
      {
        "effectId": "B16_EFF_71",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "RECOVER_RESOURCE",
            "params": {
              "amount": 1
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tích lũy 1 Mana và tăng 200 ATK liên tục mỗi lượt."
      }
    ]
  },
  {
    "id": "card_b16_072_cont_reverse_osmosis_desalination_cascade_72",
    "name": "Màng Lọc Thẩm Thấu Ngược RO (Tầng 9)",
    "name_en": "Reverse Osmosis Desalination Cascade (Stage 9)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "CONTINUOUS_SPELL",
    "spellSpeed": 1,
    "rarity": "COMMON",
    "attribute": "AQUA",
    "manaCost": 5,
    "chemicalFormula": "RO Membrane",
    "effectCode": "SPELL_B16_REVERSE_OSMOSIS_DESALINATION_CASCADE_KINETIC_72",
    "effectText": "[Phép Liên Tục / Continuous]: Duy trì trên sân. Mỗi khi bắt đầu lượt của bạn: Nhận thêm 1 Mana và tăng 200 ATK cho tất cả quái thú đồng minh trên sân.",
    "scientificLore": "Quy trình động học dòng liên tục Màng Lọc Thẩm Thấu Ngược RO (π = iMRT (High-Pressure Osmotic Solvent Driving)) tối ưu hóa hiệu suất hóa học công nghiệp theo nguyên lý Hóa học Xanh và GDPT 2018.",
    "relatedEquation": "π = iMRT (High-Pressure Osmotic Solvent Driving)",
    "iupacName": "Reverse Osmosis Desalination Cascade Apparatus",
    "archetype": "ATMOSPHERIC_NITROGEN_FIXATION",
    "structuredEffects": [
      {
        "effectId": "B16_EFF_72",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "RECOVER_RESOURCE",
            "params": {
              "amount": 1
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tích lũy 1 Mana và tăng 200 ATK liên tục mỗi lượt."
      }
    ]
  },
  {
    "id": "card_b16_073_cont_arrhenius_thermal_activation_chamber_73",
    "name": "Buồng Gia Tốc Nhiệt Động Arrhenius (Tầng 10)",
    "name_en": "Arrhenius Thermal Activation Chamber (Stage 10)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "CONTINUOUS_SPELL",
    "spellSpeed": 1,
    "rarity": "COMMON",
    "attribute": "PYRO",
    "manaCost": 2,
    "chemicalFormula": "k = A*exp(-Ea/RT)",
    "effectCode": "SPELL_B16_ARRHENIUS_THERMAL_ACTIVATION_CHAMBER_KINETIC_73",
    "effectText": "[Phép Liên Tục / Continuous]: Duy trì trên sân. Mỗi khi bắt đầu lượt của bạn: Nhận thêm 1 Mana và tăng 200 ATK cho tất cả quái thú đồng minh trên sân.",
    "scientificLore": "Quy trình động học dòng liên tục Buồng Gia Tốc Nhiệt Động Arrhenius (ln(k) = -Ea/R * (1/T) + ln(A)) tối ưu hóa hiệu suất hóa học công nghiệp theo nguyên lý Hóa học Xanh và GDPT 2018.",
    "relatedEquation": "ln(k) = -Ea/R * (1/T) + ln(A)",
    "iupacName": "Arrhenius Thermal Activation Chamber Apparatus",
    "archetype": "THERMAL_KINETICS",
    "structuredEffects": [
      {
        "effectId": "B16_EFF_73",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "RECOVER_RESOURCE",
            "params": {
              "amount": 1
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tích lũy 1 Mana và tăng 200 ATK liên tục mỗi lượt."
      }
    ]
  },
  {
    "id": "card_b16_074_cont_plug_flow_reactor_continuous_kinetic_74",
    "name": "Dòng Chảy Phản Ứng Ống PFR (Tầng 10)",
    "name_en": "Plug Flow Reactor Continuous Kinetic (Stage 10)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "CONTINUOUS_SPELL",
    "spellSpeed": 1,
    "rarity": "RARE",
    "attribute": "AQUA",
    "manaCost": 3,
    "chemicalFormula": "dF/dV = r",
    "effectCode": "SPELL_B16_PLUG_FLOW_REACTOR_CONTINUOUS_KINETIC_KINETIC_74",
    "effectText": "[Phép Liên Tục / Continuous]: Duy trì trên sân. Mỗi khi bắt đầu lượt của bạn: Nhận thêm 1 Mana và tăng 200 ATK cho tất cả quái thú đồng minh trên sân.",
    "scientificLore": "Quy trình động học dòng liên tục Dòng Chảy Phản Ứng Ống PFR (Steady-State Mass Balance Differential) tối ưu hóa hiệu suất hóa học công nghiệp theo nguyên lý Hóa học Xanh và GDPT 2018.",
    "relatedEquation": "Steady-State Mass Balance Differential",
    "iupacName": "Plug Flow Reactor Continuous Kinetic Apparatus",
    "archetype": "ATMOSPHERIC_NITROGEN_FIXATION",
    "structuredEffects": [
      {
        "effectId": "B16_EFF_74",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "RECOVER_RESOURCE",
            "params": {
              "amount": 1
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tích lũy 1 Mana và tăng 200 ATK liên tục mỗi lượt."
      }
    ]
  },
  {
    "id": "card_b16_075_cont_fractional_distillation_continuous_tower_75",
    "name": "Tháp Chưng Cất Phân Đoạn Dầu Mỏ (Tầng 10)",
    "name_en": "Fractional Distillation Continuous Tower (Stage 10)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "CONTINUOUS_SPELL",
    "spellSpeed": 1,
    "rarity": "RARE",
    "attribute": "TERRA",
    "manaCost": 4,
    "chemicalFormula": "Petro-Refinery",
    "effectCode": "SPELL_B16_FRACTIONAL_DISTILLATION_CONTINUOUS_TOWER_KINETIC_75",
    "effectText": "[Phép Liên Tục / Continuous]: Duy trì trên sân. Mỗi khi bắt đầu lượt của bạn: Nhận thêm 1 Mana và tăng 200 ATK cho tất cả quái thú đồng minh trên sân.",
    "scientificLore": "Quy trình động học dòng liên tục Tháp Chưng Cất Phân Đoạn Dầu Mỏ (Continuous Equilibrium Stage Separation) tối ưu hóa hiệu suất hóa học công nghiệp theo nguyên lý Hóa học Xanh và GDPT 2018.",
    "relatedEquation": "Continuous Equilibrium Stage Separation",
    "iupacName": "Fractional Distillation Continuous Tower Apparatus",
    "archetype": "THERMAL_KINETICS",
    "structuredEffects": [
      {
        "effectId": "B16_EFF_75",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "RECOVER_RESOURCE",
            "params": {
              "amount": 1
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tích lũy 1 Mana và tăng 200 ATK liên tục mỗi lượt."
      }
    ]
  },
  {
    "id": "card_b16_076_cont_haber_bosch_nitrogen_recycle_loop_76",
    "name": "Vòng Tuần Hoàn Tổng Hợp Haber-Bosch (Tầng 10)",
    "name_en": "Haber-Bosch Nitrogen Recycle Loop (Stage 10)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "CONTINUOUS_SPELL",
    "spellSpeed": 1,
    "rarity": "SUPER_RARE",
    "attribute": "AERO",
    "manaCost": 5,
    "chemicalFormula": "N2+3H2 ⇌ 2NH3",
    "effectCode": "SPELL_B16_HABER_BOSCH_NITROGEN_RECYCLE_LOOP_KINETIC_76",
    "effectText": "[Phép Liên Tục / Continuous]: Duy trì trên sân. Mỗi khi bắt đầu lượt của bạn: Nhận thêm 1 Mana và tăng 200 ATK cho tất cả quái thú đồng minh trên sân.",
    "scientificLore": "Quy trình động học dòng liên tục Vòng Tuần Hoàn Tổng Hợp Haber-Bosch (N₂ + 3H₂ ⇌ 2NH₃ (Continuous High-Pressure Recycle)) tối ưu hóa hiệu suất hóa học công nghiệp theo nguyên lý Hóa học Xanh và GDPT 2018.",
    "relatedEquation": "N₂ + 3H₂ ⇌ 2NH₃ (Continuous High-Pressure Recycle)",
    "iupacName": "Haber-Bosch Nitrogen Recycle Loop Apparatus",
    "archetype": "ATMOSPHERIC_NITROGEN_FIXATION",
    "structuredEffects": [
      {
        "effectId": "B16_EFF_76",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "RECOVER_RESOURCE",
            "params": {
              "amount": 1
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tích lũy 1 Mana và tăng 200 ATK liên tục mỗi lượt."
      }
    ]
  },
  {
    "id": "card_b16_077_cont_poly_aluminum_chloride_coagulation_basin_77",
    "name": "Bể Lắng Lọc Keo Tụ PAC (Tầng 10)",
    "name_en": "Poly-Aluminum Chloride Coagulation Basin (Stage 10)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "CONTINUOUS_SPELL",
    "spellSpeed": 1,
    "rarity": "SUPER_RARE",
    "attribute": "AQUA",
    "manaCost": 2,
    "chemicalFormula": "[Al2(OH)nCl6-n]m",
    "effectCode": "SPELL_B16_POLY_ALUMINUM_CHLORIDE_COAGULATION_BASIN_KINETIC_77",
    "effectText": "[Phép Liên Tục / Continuous]: Duy trì trên sân. Mỗi khi bắt đầu lượt của bạn: Nhận thêm 1 Mana và tăng 200 ATK cho tất cả quái thú đồng minh trên sân.",
    "scientificLore": "Quy trình động học dòng liên tục Bể Lắng Lọc Keo Tụ PAC (Colloidal Particle Neutralization & Sedimentation) tối ưu hóa hiệu suất hóa học công nghiệp theo nguyên lý Hóa học Xanh và GDPT 2018.",
    "relatedEquation": "Colloidal Particle Neutralization & Sedimentation",
    "iupacName": "Poly-Aluminum Chloride Coagulation Basin Apparatus",
    "archetype": "THERMAL_KINETICS",
    "structuredEffects": [
      {
        "effectId": "B16_EFF_77",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "RECOVER_RESOURCE",
            "params": {
              "amount": 1
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tích lũy 1 Mana và tăng 200 ATK liên tục mỗi lượt."
      }
    ]
  },
  {
    "id": "card_b16_078_cont_chloralkali_membrane_electrolysis_cell_78",
    "name": "Buồng Điện Phân Màng Ngăn Chloralkali (Tầng 10)",
    "name_en": "Chloralkali Membrane Electrolysis Cell (Stage 10)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "CONTINUOUS_SPELL",
    "spellSpeed": 1,
    "rarity": "ULTRA_RARE",
    "attribute": "ELECTRO",
    "manaCost": 3,
    "chemicalFormula": "2NaCl+2H2O",
    "effectCode": "SPELL_B16_CHLORALKALI_MEMBRANE_ELECTROLYSIS_CELL_KINETIC_78",
    "effectText": "[Phép Liên Tục / Continuous]: Duy trì trên sân. Mỗi khi bắt đầu lượt của bạn: Nhận thêm 1 Mana và tăng 200 ATK cho tất cả quái thú đồng minh trên sân.",
    "scientificLore": "Quy trình động học dòng liên tục Buồng Điện Phân Màng Ngăn Chloralkali (2NaCl + 2H₂O → 2NaOH + Cl₂↑ + H₂↑) tối ưu hóa hiệu suất hóa học công nghiệp theo nguyên lý Hóa học Xanh và GDPT 2018.",
    "relatedEquation": "2NaCl + 2H₂O → 2NaOH + Cl₂↑ + H₂↑",
    "iupacName": "Chloralkali Membrane Electrolysis Cell Apparatus",
    "archetype": "ATMOSPHERIC_NITROGEN_FIXATION",
    "structuredEffects": [
      {
        "effectId": "B16_EFF_78",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "RECOVER_RESOURCE",
            "params": {
              "amount": 1
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tích lũy 1 Mana và tăng 200 ATK liên tục mỗi lượt."
      }
    ]
  },
  {
    "id": "card_b16_079_cont_continuous_uv_photoreactor_chamber_79",
    "name": "Đèn Chiếu Xạ Quang Hóa Liên Tục (Tầng 10)",
    "name_en": "Continuous UV Photoreactor Chamber (Stage 10)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "CONTINUOUS_SPELL",
    "spellSpeed": 1,
    "rarity": "SECRET_RARE",
    "attribute": "ELECTRO",
    "manaCost": 4,
    "chemicalFormula": "hν Radiation",
    "effectCode": "SPELL_B16_CONTINUOUS_UV_PHOTOREACTOR_CHAMBER_KINETIC_79",
    "effectText": "[Phép Liên Tục / Continuous]: Duy trì trên sân. Mỗi khi bắt đầu lượt của bạn: Nhận thêm 1 Mana và tăng 200 ATK cho tất cả quái thú đồng minh trên sân.",
    "scientificLore": "Quy trình động học dòng liên tục Đèn Chiếu Xạ Quang Hóa Liên Tục (Continuous Free Radical Initiation Flux) tối ưu hóa hiệu suất hóa học công nghiệp theo nguyên lý Hóa học Xanh và GDPT 2018.",
    "relatedEquation": "Continuous Free Radical Initiation Flux",
    "iupacName": "Continuous UV Photoreactor Chamber Apparatus",
    "archetype": "THERMAL_KINETICS",
    "structuredEffects": [
      {
        "effectId": "B16_EFF_79",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "RECOVER_RESOURCE",
            "params": {
              "amount": 1
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tích lũy 1 Mana và tăng 200 ATK liên tục mỗi lượt."
      }
    ]
  },
  {
    "id": "card_b16_080_cont_reverse_osmosis_desalination_cascade_80",
    "name": "Màng Lọc Thẩm Thấu Ngược RO (Tầng 10)",
    "name_en": "Reverse Osmosis Desalination Cascade (Stage 10)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "CONTINUOUS_SPELL",
    "spellSpeed": 1,
    "rarity": "COMMON",
    "attribute": "AQUA",
    "manaCost": 5,
    "chemicalFormula": "RO Membrane",
    "effectCode": "SPELL_B16_REVERSE_OSMOSIS_DESALINATION_CASCADE_KINETIC_80",
    "effectText": "[Phép Liên Tục / Continuous]: Duy trì trên sân. Mỗi khi bắt đầu lượt của bạn: Nhận thêm 1 Mana và tăng 200 ATK cho tất cả quái thú đồng minh trên sân.",
    "scientificLore": "Quy trình động học dòng liên tục Màng Lọc Thẩm Thấu Ngược RO (π = iMRT (High-Pressure Osmotic Solvent Driving)) tối ưu hóa hiệu suất hóa học công nghiệp theo nguyên lý Hóa học Xanh và GDPT 2018.",
    "relatedEquation": "π = iMRT (High-Pressure Osmotic Solvent Driving)",
    "iupacName": "Reverse Osmosis Desalination Cascade Apparatus",
    "archetype": "ATMOSPHERIC_NITROGEN_FIXATION",
    "structuredEffects": [
      {
        "effectId": "B16_EFF_80",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "RECOVER_RESOURCE",
            "params": {
              "amount": 1
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tích lũy 1 Mana và tăng 200 ATK liên tục mỗi lượt."
      }
    ]
  }
];
