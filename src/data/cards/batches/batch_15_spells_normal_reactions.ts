// src/data/cards/batches/batch_15_spells_normal_reactions.ts
// Batch 15: Normal Chemical Reaction Spells (100 cards)
// Automatically generated and validated for ELEMENTA Tactical TCG

import { PlayableCardDef } from '../../../domain/cardGameTypes';

export const BATCH_15_CARDS: PlayableCardDef[] = [
  {
    "id": "card_b15_001_spell_complete_combustion_flash_1",
    "name": "Phản Ứng Đốt Cháy Hoàn Toàn (Phương Trình 1)",
    "name_en": "Complete Combustion Flash (Equation 1)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "NORMAL_SPELL",
    "spellSpeed": 1,
    "rarity": "COMMON",
    "attribute": "PYRO",
    "manaCost": 1,
    "chemicalFormula": "C_x H_y + O2",
    "effectCode": "SPELL_B15_COMPLETE_COMBUSTION_FLASH_ACT_1",
    "effectText": "[Phép Phản Ứng Thường]: Kích hoạt hiệu ứng nhiệt/điện hóa: Gây 300 LP sát thương trực tiếp lên đối thủ hoặc rút 1 lá bài từ Bộ bài.",
    "scientificLore": "Phản ứng hóa học Phản Ứng Đốt Cháy Hoàn Toàn (C_x H_y + (x+y/4)O₂ → xCO₂ + (y/2)H₂O) tuân thủ nghiêm ngặt định luật bảo toàn khối lượng và biến thiên enthalpy $\\Delta_r H^\\circ_{298}$ theo GDPT 2018.",
    "relatedEquation": "C_x H_y + (x+y/4)O₂ → xCO₂ + (y/2)H₂O",
    "iupacName": "Complete Combustion Flash Protocol",
    "archetype": "REDOX_CASCADE",
    "structuredEffects": [
      {
        "effectId": "B15_EFF_1",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 400
            }
          },
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Gây 400 LP sát thương phản ứng hóa học và rút 1 lá bài."
      }
    ]
  },
  {
    "id": "card_b15_002_spell_acid_base_neutralization_burst_2",
    "name": "Phản Ứng Trung Hòa Chuẩn Độ (Phương Trình 1)",
    "name_en": "Acid-Base Neutralization Burst (Equation 1)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "NORMAL_SPELL",
    "spellSpeed": 1,
    "rarity": "COMMON",
    "attribute": "AQUA",
    "manaCost": 2,
    "chemicalFormula": "H+ + OH-",
    "effectCode": "SPELL_B15_ACID_BASE_NEUTRALIZATION_BURST_ACT_2",
    "effectText": "[Phép Phản Ứng Thường]: Kích hoạt hiệu ứng nhiệt/điện hóa: Gây 400 LP sát thương trực tiếp lên đối thủ hoặc rút 1 lá bài từ Bộ bài.",
    "scientificLore": "Phản ứng hóa học Phản Ứng Trung Hòa Chuẩn Độ (H⁺(aq) + OH⁻(aq) → H₂O(l) (ΔH = -57.3 kJ/mol)) tuân thủ nghiêm ngặt định luật bảo toàn khối lượng và biến thiên enthalpy $\\Delta_r H^\\circ_{298}$ theo GDPT 2018.",
    "relatedEquation": "H⁺(aq) + OH⁻(aq) → H₂O(l) (ΔH = -57.3 kJ/mol)",
    "iupacName": "Acid-Base Neutralization Burst Protocol",
    "archetype": "GREEN_CHEMISTRY",
    "structuredEffects": [
      {
        "effectId": "B15_EFF_2",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 400
            }
          },
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Gây 400 LP sát thương phản ứng hóa học và rút 1 lá bài."
      }
    ]
  },
  {
    "id": "card_b15_003_spell_galvanic_redox_discharge_3",
    "name": "Phản Ứng Oxi Hóa Khử Pin Galvanic (Phương Trình 1)",
    "name_en": "Galvanic Redox Discharge (Equation 1)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "NORMAL_SPELL",
    "spellSpeed": 1,
    "rarity": "COMMON",
    "attribute": "ELECTRO",
    "manaCost": 3,
    "chemicalFormula": "Zn + Cu2+",
    "effectCode": "SPELL_B15_GALVANIC_REDOX_DISCHARGE_ACT_3",
    "effectText": "[Phép Phản Ứng Thường]: Kích hoạt hiệu ứng nhiệt/điện hóa: Gây 500 LP sát thương trực tiếp lên đối thủ hoặc rút 1 lá bài từ Bộ bài.",
    "scientificLore": "Phản ứng hóa học Phản Ứng Oxi Hóa Khử Pin Galvanic (Zn(s) + Cu²⁺(aq) → Zn²⁺(aq) + Cu(s) (E° = +1.10V)) tuân thủ nghiêm ngặt định luật bảo toàn khối lượng và biến thiên enthalpy $\\Delta_r H^\\circ_{298}$ theo GDPT 2018.",
    "relatedEquation": "Zn(s) + Cu²⁺(aq) → Zn²⁺(aq) + Cu(s) (E° = +1.10V)",
    "iupacName": "Galvanic Redox Discharge Protocol",
    "archetype": "FREE_RADICAL_CASCADE",
    "structuredEffects": [
      {
        "effectId": "B15_EFF_3",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 400
            }
          },
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Gây 400 LP sát thương phản ứng hóa học và rút 1 lá bài."
      }
    ]
  },
  {
    "id": "card_b15_004_spell_photochemical_halogenation_4",
    "name": "Phản Ứng Thế Halogen Ánh Sáng (Phương Trình 1)",
    "name_en": "Photochemical Halogenation (Equation 1)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "NORMAL_SPELL",
    "spellSpeed": 1,
    "rarity": "RARE",
    "attribute": "AERO",
    "manaCost": 4,
    "chemicalFormula": "CH4 + Cl2",
    "effectCode": "SPELL_B15_PHOTOCHEMICAL_HALOGENATION_ACT_4",
    "effectText": "[Phép Phản Ứng Thường]: Kích hoạt hiệu ứng nhiệt/điện hóa: Gây 600 LP sát thương trực tiếp lên đối thủ hoặc rút 1 lá bài từ Bộ bài.",
    "scientificLore": "Phản ứng hóa học Phản Ứng Thế Halogen Ánh Sáng (CH₄ + Cl₂ --hν--> CH₃Cl + HCl) tuân thủ nghiêm ngặt định luật bảo toàn khối lượng và biến thiên enthalpy $\\Delta_r H^\\circ_{298}$ theo GDPT 2018.",
    "relatedEquation": "CH₄ + Cl₂ --hν--> CH₃Cl + HCl",
    "iupacName": "Photochemical Halogenation Protocol",
    "archetype": "REDOX_CASCADE",
    "structuredEffects": [
      {
        "effectId": "B15_EFF_4",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 400
            }
          },
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Gây 400 LP sát thương phản ứng hóa học và rút 1 lá bài."
      }
    ]
  },
  {
    "id": "card_b15_005_spell_alcohol_acid_dehydration_5",
    "name": "Phản Ứng Tách Nước Khử Ancol (Phương Trình 1)",
    "name_en": "Alcohol Acid Dehydration (Equation 1)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "NORMAL_SPELL",
    "spellSpeed": 1,
    "rarity": "RARE",
    "attribute": "TERRA",
    "manaCost": 5,
    "chemicalFormula": "C2H5OH",
    "effectCode": "SPELL_B15_ALCOHOL_ACID_DEHYDRATION_ACT_5",
    "effectText": "[Phép Phản Ứng Thường]: Kích hoạt hiệu ứng nhiệt/điện hóa: Gây 300 LP sát thương trực tiếp lên đối thủ hoặc rút 1 lá bài từ Bộ bài.",
    "scientificLore": "Phản ứng hóa học Phản Ứng Tách Nước Khử Ancol (C₂H₅OH --H₂SO₄/170°C--> C₂H₄ + H₂O) tuân thủ nghiêm ngặt định luật bảo toàn khối lượng và biến thiên enthalpy $\\Delta_r H^\\circ_{298}$ theo GDPT 2018.",
    "relatedEquation": "C₂H₅OH --H₂SO₄/170°C--> C₂H₄ + H₂O",
    "iupacName": "Alcohol Acid Dehydration Protocol",
    "archetype": "GREEN_CHEMISTRY",
    "structuredEffects": [
      {
        "effectId": "B15_EFF_5",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 400
            }
          },
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Gây 400 LP sát thương phản ứng hóa học và rút 1 lá bài."
      }
    ]
  },
  {
    "id": "card_b15_006_spell_fischer_esterification_synthesis_6",
    "name": "Phản Ứng Este Hóa Fischer (Phương Trình 1)",
    "name_en": "Fischer Esterification Synthesis (Equation 1)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "NORMAL_SPELL",
    "spellSpeed": 1,
    "rarity": "SUPER_RARE",
    "attribute": "AQUA",
    "manaCost": 1,
    "chemicalFormula": "RCOOH + R'OH",
    "effectCode": "SPELL_B15_FISCHER_ESTERIFICATION_SYNTHESIS_ACT_6",
    "effectText": "[Phép Phản Ứng Thường]: Kích hoạt hiệu ứng nhiệt/điện hóa: Gây 400 LP sát thương trực tiếp lên đối thủ hoặc rút 1 lá bài từ Bộ bài.",
    "scientificLore": "Phản ứng hóa học Phản Ứng Este Hóa Fischer (RCOOH + R'OH ⇌ RCOOR' + H₂O) tuân thủ nghiêm ngặt định luật bảo toàn khối lượng và biến thiên enthalpy $\\Delta_r H^\\circ_{298}$ theo GDPT 2018.",
    "relatedEquation": "RCOOH + R'OH ⇌ RCOOR' + H₂O",
    "iupacName": "Fischer Esterification Synthesis Protocol",
    "archetype": "FREE_RADICAL_CASCADE",
    "structuredEffects": [
      {
        "effectId": "B15_EFF_6",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 400
            }
          },
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Gây 400 LP sát thương phản ứng hóa học và rút 1 lá bài."
      }
    ]
  },
  {
    "id": "card_b15_007_spell_silver_mirror_tollens_reduction_7",
    "name": "Phản Ứng Tráng Bạc Glucozo (Phương Trình 1)",
    "name_en": "Silver Mirror Tollens Reduction (Equation 1)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "NORMAL_SPELL",
    "spellSpeed": 1,
    "rarity": "SUPER_RARE",
    "attribute": "NOBLE_VOID",
    "manaCost": 2,
    "chemicalFormula": "C6H12O6 + Ag+",
    "effectCode": "SPELL_B15_SILVER_MIRROR_TOLLENS_REDUCTION_ACT_7",
    "effectText": "[Phép Phản Ứng Thường]: Kích hoạt hiệu ứng nhiệt/điện hóa: Gây 500 LP sát thương trực tiếp lên đối thủ hoặc rút 1 lá bài từ Bộ bài.",
    "scientificLore": "Phản ứng hóa học Phản Ứng Tráng Bạc Glucozo (C₆H₁₂O₆ + 2[Ag(NH₃)₂]OH → C₆H₁₂O₇ + 2Ag↓ + 4NH₃ + H₂O) tuân thủ nghiêm ngặt định luật bảo toàn khối lượng và biến thiên enthalpy $\\Delta_r H^\\circ_{298}$ theo GDPT 2018.",
    "relatedEquation": "C₆H₁₂O₆ + 2[Ag(NH₃)₂]OH → C₆H₁₂O₇ + 2Ag↓ + 4NH₃ + H₂O",
    "iupacName": "Silver Mirror Tollens Reduction Protocol",
    "archetype": "REDOX_CASCADE",
    "structuredEffects": [
      {
        "effectId": "B15_EFF_7",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 400
            }
          },
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Gây 400 LP sát thương phản ứng hóa học và rút 1 lá bài."
      }
    ]
  },
  {
    "id": "card_b15_008_spell_limestone_calcination_thermal_decomposition_8",
    "name": "Phản Ứng Nhiệt Phân Đá Vôi (Phương Trình 1)",
    "name_en": "Limestone Calcination Thermal Decomposition (Equation 1)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "NORMAL_SPELL",
    "spellSpeed": 1,
    "rarity": "ULTRA_RARE",
    "attribute": "TERRA",
    "manaCost": 3,
    "chemicalFormula": "CaCO3",
    "effectCode": "SPELL_B15_LIMESTONE_CALCINATION_THERMAL_DECOMPOSITION_ACT_8",
    "effectText": "[Phép Phản Ứng Thường]: Kích hoạt hiệu ứng nhiệt/điện hóa: Gây 600 LP sát thương trực tiếp lên đối thủ hoặc rút 1 lá bài từ Bộ bài.",
    "scientificLore": "Phản ứng hóa học Phản Ứng Nhiệt Phân Đá Vôi (CaCO₃ --1000°C--> CaO + CO₂↑) tuân thủ nghiêm ngặt định luật bảo toàn khối lượng và biến thiên enthalpy $\\Delta_r H^\\circ_{298}$ theo GDPT 2018.",
    "relatedEquation": "CaCO₃ --1000°C--> CaO + CO₂↑",
    "iupacName": "Limestone Calcination Thermal Decomposition Protocol",
    "archetype": "GREEN_CHEMISTRY",
    "structuredEffects": [
      {
        "effectId": "B15_EFF_8",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 400
            }
          },
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Gây 400 LP sát thương phản ứng hóa học và rút 1 lá bài."
      }
    ]
  },
  {
    "id": "card_b15_009_spell_aluminum_cation_hydrolysis_acidification_9",
    "name": "Phản Ứng Thủy Phân Muối Nhôm (Phương Trình 1)",
    "name_en": "Aluminum Cation Hydrolysis Acidification (Equation 1)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "NORMAL_SPELL",
    "spellSpeed": 1,
    "rarity": "SECRET_RARE",
    "attribute": "ACID_DARK",
    "manaCost": 4,
    "chemicalFormula": "Al3+ + 3H2O",
    "effectCode": "SPELL_B15_ALUMINUM_CATION_HYDROLYSIS_ACIDIFICATION_ACT_9",
    "effectText": "[Phép Phản Ứng Thường]: Kích hoạt hiệu ứng nhiệt/điện hóa: Gây 300 LP sát thương trực tiếp lên đối thủ hoặc rút 1 lá bài từ Bộ bài.",
    "scientificLore": "Phản ứng hóa học Phản Ứng Thủy Phân Muối Nhôm (Al³⁺ + 3H₂O ⇌ Al(OH)₃↓ + 3H⁺) tuân thủ nghiêm ngặt định luật bảo toàn khối lượng và biến thiên enthalpy $\\Delta_r H^\\circ_{298}$ theo GDPT 2018.",
    "relatedEquation": "Al³⁺ + 3H₂O ⇌ Al(OH)₃↓ + 3H⁺",
    "iupacName": "Aluminum Cation Hydrolysis Acidification Protocol",
    "archetype": "FREE_RADICAL_CASCADE",
    "structuredEffects": [
      {
        "effectId": "B15_EFF_9",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 400
            }
          },
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Gây 400 LP sát thương phản ứng hóa học và rút 1 lá bài."
      }
    ]
  },
  {
    "id": "card_b15_010_spell_gold_solvation_dissolution_10",
    "name": "Phản Ứng Hòa Tan Vàng Bằng Cường Toan (Phương Trình 1)",
    "name_en": "Gold Solvation Dissolution (Equation 1)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "NORMAL_SPELL",
    "spellSpeed": 1,
    "rarity": "COMMON",
    "attribute": "ACID_DARK",
    "manaCost": 5,
    "chemicalFormula": "Au + HNO3 + 4HCl",
    "effectCode": "SPELL_B15_GOLD_SOLVATION_DISSOLUTION_ACT_10",
    "effectText": "[Phép Phản Ứng Thường]: Kích hoạt hiệu ứng nhiệt/điện hóa: Gây 400 LP sát thương trực tiếp lên đối thủ hoặc rút 1 lá bài từ Bộ bài.",
    "scientificLore": "Phản ứng hóa học Phản Ứng Hòa Tan Vàng Bằng Cường Toan (Au + HNO₃ + 4HCl → HAuCl₄ + NO + 2H₂O) tuân thủ nghiêm ngặt định luật bảo toàn khối lượng và biến thiên enthalpy $\\Delta_r H^\\circ_{298}$ theo GDPT 2018.",
    "relatedEquation": "Au + HNO₃ + 4HCl → HAuCl₄ + NO + 2H₂O",
    "iupacName": "Gold Solvation Dissolution Protocol",
    "archetype": "REDOX_CASCADE",
    "structuredEffects": [
      {
        "effectId": "B15_EFF_10",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 400
            }
          },
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Gây 400 LP sát thương phản ứng hóa học và rút 1 lá bài."
      }
    ]
  },
  {
    "id": "card_b15_011_spell_complete_combustion_flash_11",
    "name": "Phản Ứng Đốt Cháy Hoàn Toàn (Phương Trình 2)",
    "name_en": "Complete Combustion Flash (Equation 2)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "NORMAL_SPELL",
    "spellSpeed": 1,
    "rarity": "COMMON",
    "attribute": "PYRO",
    "manaCost": 1,
    "chemicalFormula": "C_x H_y + O2",
    "effectCode": "SPELL_B15_COMPLETE_COMBUSTION_FLASH_ACT_11",
    "effectText": "[Phép Phản Ứng Thường]: Kích hoạt hiệu ứng nhiệt/điện hóa: Gây 500 LP sát thương trực tiếp lên đối thủ hoặc rút 1 lá bài từ Bộ bài.",
    "scientificLore": "Phản ứng hóa học Phản Ứng Đốt Cháy Hoàn Toàn (C_x H_y + (x+y/4)O₂ → xCO₂ + (y/2)H₂O) tuân thủ nghiêm ngặt định luật bảo toàn khối lượng và biến thiên enthalpy $\\Delta_r H^\\circ_{298}$ theo GDPT 2018.",
    "relatedEquation": "C_x H_y + (x+y/4)O₂ → xCO₂ + (y/2)H₂O",
    "iupacName": "Complete Combustion Flash Protocol",
    "archetype": "GREEN_CHEMISTRY",
    "structuredEffects": [
      {
        "effectId": "B15_EFF_11",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 400
            }
          },
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Gây 400 LP sát thương phản ứng hóa học và rút 1 lá bài."
      }
    ]
  },
  {
    "id": "card_b15_012_spell_acid_base_neutralization_burst_12",
    "name": "Phản Ứng Trung Hòa Chuẩn Độ (Phương Trình 2)",
    "name_en": "Acid-Base Neutralization Burst (Equation 2)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "NORMAL_SPELL",
    "spellSpeed": 1,
    "rarity": "COMMON",
    "attribute": "AQUA",
    "manaCost": 2,
    "chemicalFormula": "H+ + OH-",
    "effectCode": "SPELL_B15_ACID_BASE_NEUTRALIZATION_BURST_ACT_12",
    "effectText": "[Phép Phản Ứng Thường]: Kích hoạt hiệu ứng nhiệt/điện hóa: Gây 600 LP sát thương trực tiếp lên đối thủ hoặc rút 1 lá bài từ Bộ bài.",
    "scientificLore": "Phản ứng hóa học Phản Ứng Trung Hòa Chuẩn Độ (H⁺(aq) + OH⁻(aq) → H₂O(l) (ΔH = -57.3 kJ/mol)) tuân thủ nghiêm ngặt định luật bảo toàn khối lượng và biến thiên enthalpy $\\Delta_r H^\\circ_{298}$ theo GDPT 2018.",
    "relatedEquation": "H⁺(aq) + OH⁻(aq) → H₂O(l) (ΔH = -57.3 kJ/mol)",
    "iupacName": "Acid-Base Neutralization Burst Protocol",
    "archetype": "FREE_RADICAL_CASCADE",
    "structuredEffects": [
      {
        "effectId": "B15_EFF_12",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 400
            }
          },
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Gây 400 LP sát thương phản ứng hóa học và rút 1 lá bài."
      }
    ]
  },
  {
    "id": "card_b15_013_spell_galvanic_redox_discharge_13",
    "name": "Phản Ứng Oxi Hóa Khử Pin Galvanic (Phương Trình 2)",
    "name_en": "Galvanic Redox Discharge (Equation 2)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "NORMAL_SPELL",
    "spellSpeed": 1,
    "rarity": "RARE",
    "attribute": "ELECTRO",
    "manaCost": 3,
    "chemicalFormula": "Zn + Cu2+",
    "effectCode": "SPELL_B15_GALVANIC_REDOX_DISCHARGE_ACT_13",
    "effectText": "[Phép Phản Ứng Thường]: Kích hoạt hiệu ứng nhiệt/điện hóa: Gây 300 LP sát thương trực tiếp lên đối thủ hoặc rút 1 lá bài từ Bộ bài.",
    "scientificLore": "Phản ứng hóa học Phản Ứng Oxi Hóa Khử Pin Galvanic (Zn(s) + Cu²⁺(aq) → Zn²⁺(aq) + Cu(s) (E° = +1.10V)) tuân thủ nghiêm ngặt định luật bảo toàn khối lượng và biến thiên enthalpy $\\Delta_r H^\\circ_{298}$ theo GDPT 2018.",
    "relatedEquation": "Zn(s) + Cu²⁺(aq) → Zn²⁺(aq) + Cu(s) (E° = +1.10V)",
    "iupacName": "Galvanic Redox Discharge Protocol",
    "archetype": "REDOX_CASCADE",
    "structuredEffects": [
      {
        "effectId": "B15_EFF_13",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 400
            }
          },
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Gây 400 LP sát thương phản ứng hóa học và rút 1 lá bài."
      }
    ]
  },
  {
    "id": "card_b15_014_spell_photochemical_halogenation_14",
    "name": "Phản Ứng Thế Halogen Ánh Sáng (Phương Trình 2)",
    "name_en": "Photochemical Halogenation (Equation 2)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "NORMAL_SPELL",
    "spellSpeed": 1,
    "rarity": "RARE",
    "attribute": "AERO",
    "manaCost": 4,
    "chemicalFormula": "CH4 + Cl2",
    "effectCode": "SPELL_B15_PHOTOCHEMICAL_HALOGENATION_ACT_14",
    "effectText": "[Phép Phản Ứng Thường]: Kích hoạt hiệu ứng nhiệt/điện hóa: Gây 400 LP sát thương trực tiếp lên đối thủ hoặc rút 1 lá bài từ Bộ bài.",
    "scientificLore": "Phản ứng hóa học Phản Ứng Thế Halogen Ánh Sáng (CH₄ + Cl₂ --hν--> CH₃Cl + HCl) tuân thủ nghiêm ngặt định luật bảo toàn khối lượng và biến thiên enthalpy $\\Delta_r H^\\circ_{298}$ theo GDPT 2018.",
    "relatedEquation": "CH₄ + Cl₂ --hν--> CH₃Cl + HCl",
    "iupacName": "Photochemical Halogenation Protocol",
    "archetype": "GREEN_CHEMISTRY",
    "structuredEffects": [
      {
        "effectId": "B15_EFF_14",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 400
            }
          },
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Gây 400 LP sát thương phản ứng hóa học và rút 1 lá bài."
      }
    ]
  },
  {
    "id": "card_b15_015_spell_alcohol_acid_dehydration_15",
    "name": "Phản Ứng Tách Nước Khử Ancol (Phương Trình 2)",
    "name_en": "Alcohol Acid Dehydration (Equation 2)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "NORMAL_SPELL",
    "spellSpeed": 1,
    "rarity": "SUPER_RARE",
    "attribute": "TERRA",
    "manaCost": 5,
    "chemicalFormula": "C2H5OH",
    "effectCode": "SPELL_B15_ALCOHOL_ACID_DEHYDRATION_ACT_15",
    "effectText": "[Phép Phản Ứng Thường]: Kích hoạt hiệu ứng nhiệt/điện hóa: Gây 500 LP sát thương trực tiếp lên đối thủ hoặc rút 1 lá bài từ Bộ bài.",
    "scientificLore": "Phản ứng hóa học Phản Ứng Tách Nước Khử Ancol (C₂H₅OH --H₂SO₄/170°C--> C₂H₄ + H₂O) tuân thủ nghiêm ngặt định luật bảo toàn khối lượng và biến thiên enthalpy $\\Delta_r H^\\circ_{298}$ theo GDPT 2018.",
    "relatedEquation": "C₂H₅OH --H₂SO₄/170°C--> C₂H₄ + H₂O",
    "iupacName": "Alcohol Acid Dehydration Protocol",
    "archetype": "FREE_RADICAL_CASCADE",
    "structuredEffects": [
      {
        "effectId": "B15_EFF_15",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 400
            }
          },
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Gây 400 LP sát thương phản ứng hóa học và rút 1 lá bài."
      }
    ]
  },
  {
    "id": "card_b15_016_spell_fischer_esterification_synthesis_16",
    "name": "Phản Ứng Este Hóa Fischer (Phương Trình 2)",
    "name_en": "Fischer Esterification Synthesis (Equation 2)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "NORMAL_SPELL",
    "spellSpeed": 1,
    "rarity": "SUPER_RARE",
    "attribute": "AQUA",
    "manaCost": 1,
    "chemicalFormula": "RCOOH + R'OH",
    "effectCode": "SPELL_B15_FISCHER_ESTERIFICATION_SYNTHESIS_ACT_16",
    "effectText": "[Phép Phản Ứng Thường]: Kích hoạt hiệu ứng nhiệt/điện hóa: Gây 600 LP sát thương trực tiếp lên đối thủ hoặc rút 1 lá bài từ Bộ bài.",
    "scientificLore": "Phản ứng hóa học Phản Ứng Este Hóa Fischer (RCOOH + R'OH ⇌ RCOOR' + H₂O) tuân thủ nghiêm ngặt định luật bảo toàn khối lượng và biến thiên enthalpy $\\Delta_r H^\\circ_{298}$ theo GDPT 2018.",
    "relatedEquation": "RCOOH + R'OH ⇌ RCOOR' + H₂O",
    "iupacName": "Fischer Esterification Synthesis Protocol",
    "archetype": "REDOX_CASCADE",
    "structuredEffects": [
      {
        "effectId": "B15_EFF_16",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 400
            }
          },
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Gây 400 LP sát thương phản ứng hóa học và rút 1 lá bài."
      }
    ]
  },
  {
    "id": "card_b15_017_spell_silver_mirror_tollens_reduction_17",
    "name": "Phản Ứng Tráng Bạc Glucozo (Phương Trình 2)",
    "name_en": "Silver Mirror Tollens Reduction (Equation 2)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "NORMAL_SPELL",
    "spellSpeed": 1,
    "rarity": "ULTRA_RARE",
    "attribute": "NOBLE_VOID",
    "manaCost": 2,
    "chemicalFormula": "C6H12O6 + Ag+",
    "effectCode": "SPELL_B15_SILVER_MIRROR_TOLLENS_REDUCTION_ACT_17",
    "effectText": "[Phép Phản Ứng Thường]: Kích hoạt hiệu ứng nhiệt/điện hóa: Gây 300 LP sát thương trực tiếp lên đối thủ hoặc rút 1 lá bài từ Bộ bài.",
    "scientificLore": "Phản ứng hóa học Phản Ứng Tráng Bạc Glucozo (C₆H₁₂O₆ + 2[Ag(NH₃)₂]OH → C₆H₁₂O₇ + 2Ag↓ + 4NH₃ + H₂O) tuân thủ nghiêm ngặt định luật bảo toàn khối lượng và biến thiên enthalpy $\\Delta_r H^\\circ_{298}$ theo GDPT 2018.",
    "relatedEquation": "C₆H₁₂O₆ + 2[Ag(NH₃)₂]OH → C₆H₁₂O₇ + 2Ag↓ + 4NH₃ + H₂O",
    "iupacName": "Silver Mirror Tollens Reduction Protocol",
    "archetype": "GREEN_CHEMISTRY",
    "structuredEffects": [
      {
        "effectId": "B15_EFF_17",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 400
            }
          },
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Gây 400 LP sát thương phản ứng hóa học và rút 1 lá bài."
      }
    ]
  },
  {
    "id": "card_b15_018_spell_limestone_calcination_thermal_decomposition_18",
    "name": "Phản Ứng Nhiệt Phân Đá Vôi (Phương Trình 2)",
    "name_en": "Limestone Calcination Thermal Decomposition (Equation 2)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "NORMAL_SPELL",
    "spellSpeed": 1,
    "rarity": "SECRET_RARE",
    "attribute": "TERRA",
    "manaCost": 3,
    "chemicalFormula": "CaCO3",
    "effectCode": "SPELL_B15_LIMESTONE_CALCINATION_THERMAL_DECOMPOSITION_ACT_18",
    "effectText": "[Phép Phản Ứng Thường]: Kích hoạt hiệu ứng nhiệt/điện hóa: Gây 400 LP sát thương trực tiếp lên đối thủ hoặc rút 1 lá bài từ Bộ bài.",
    "scientificLore": "Phản ứng hóa học Phản Ứng Nhiệt Phân Đá Vôi (CaCO₃ --1000°C--> CaO + CO₂↑) tuân thủ nghiêm ngặt định luật bảo toàn khối lượng và biến thiên enthalpy $\\Delta_r H^\\circ_{298}$ theo GDPT 2018.",
    "relatedEquation": "CaCO₃ --1000°C--> CaO + CO₂↑",
    "iupacName": "Limestone Calcination Thermal Decomposition Protocol",
    "archetype": "FREE_RADICAL_CASCADE",
    "structuredEffects": [
      {
        "effectId": "B15_EFF_18",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 400
            }
          },
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Gây 400 LP sát thương phản ứng hóa học và rút 1 lá bài."
      }
    ]
  },
  {
    "id": "card_b15_019_spell_aluminum_cation_hydrolysis_acidification_19",
    "name": "Phản Ứng Thủy Phân Muối Nhôm (Phương Trình 2)",
    "name_en": "Aluminum Cation Hydrolysis Acidification (Equation 2)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "NORMAL_SPELL",
    "spellSpeed": 1,
    "rarity": "COMMON",
    "attribute": "ACID_DARK",
    "manaCost": 4,
    "chemicalFormula": "Al3+ + 3H2O",
    "effectCode": "SPELL_B15_ALUMINUM_CATION_HYDROLYSIS_ACIDIFICATION_ACT_19",
    "effectText": "[Phép Phản Ứng Thường]: Kích hoạt hiệu ứng nhiệt/điện hóa: Gây 500 LP sát thương trực tiếp lên đối thủ hoặc rút 1 lá bài từ Bộ bài.",
    "scientificLore": "Phản ứng hóa học Phản Ứng Thủy Phân Muối Nhôm (Al³⁺ + 3H₂O ⇌ Al(OH)₃↓ + 3H⁺) tuân thủ nghiêm ngặt định luật bảo toàn khối lượng và biến thiên enthalpy $\\Delta_r H^\\circ_{298}$ theo GDPT 2018.",
    "relatedEquation": "Al³⁺ + 3H₂O ⇌ Al(OH)₃↓ + 3H⁺",
    "iupacName": "Aluminum Cation Hydrolysis Acidification Protocol",
    "archetype": "REDOX_CASCADE",
    "structuredEffects": [
      {
        "effectId": "B15_EFF_19",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 400
            }
          },
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Gây 400 LP sát thương phản ứng hóa học và rút 1 lá bài."
      }
    ]
  },
  {
    "id": "card_b15_020_spell_gold_solvation_dissolution_20",
    "name": "Phản Ứng Hòa Tan Vàng Bằng Cường Toan (Phương Trình 2)",
    "name_en": "Gold Solvation Dissolution (Equation 2)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "NORMAL_SPELL",
    "spellSpeed": 1,
    "rarity": "COMMON",
    "attribute": "ACID_DARK",
    "manaCost": 5,
    "chemicalFormula": "Au + HNO3 + 4HCl",
    "effectCode": "SPELL_B15_GOLD_SOLVATION_DISSOLUTION_ACT_20",
    "effectText": "[Phép Phản Ứng Thường]: Kích hoạt hiệu ứng nhiệt/điện hóa: Gây 600 LP sát thương trực tiếp lên đối thủ hoặc rút 1 lá bài từ Bộ bài.",
    "scientificLore": "Phản ứng hóa học Phản Ứng Hòa Tan Vàng Bằng Cường Toan (Au + HNO₃ + 4HCl → HAuCl₄ + NO + 2H₂O) tuân thủ nghiêm ngặt định luật bảo toàn khối lượng và biến thiên enthalpy $\\Delta_r H^\\circ_{298}$ theo GDPT 2018.",
    "relatedEquation": "Au + HNO₃ + 4HCl → HAuCl₄ + NO + 2H₂O",
    "iupacName": "Gold Solvation Dissolution Protocol",
    "archetype": "GREEN_CHEMISTRY",
    "structuredEffects": [
      {
        "effectId": "B15_EFF_20",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 400
            }
          },
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Gây 400 LP sát thương phản ứng hóa học và rút 1 lá bài."
      }
    ]
  },
  {
    "id": "card_b15_021_spell_complete_combustion_flash_21",
    "name": "Phản Ứng Đốt Cháy Hoàn Toàn (Phương Trình 3)",
    "name_en": "Complete Combustion Flash (Equation 3)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "NORMAL_SPELL",
    "spellSpeed": 1,
    "rarity": "COMMON",
    "attribute": "PYRO",
    "manaCost": 1,
    "chemicalFormula": "C_x H_y + O2",
    "effectCode": "SPELL_B15_COMPLETE_COMBUSTION_FLASH_ACT_21",
    "effectText": "[Phép Phản Ứng Thường]: Kích hoạt hiệu ứng nhiệt/điện hóa: Gây 300 LP sát thương trực tiếp lên đối thủ hoặc rút 1 lá bài từ Bộ bài.",
    "scientificLore": "Phản ứng hóa học Phản Ứng Đốt Cháy Hoàn Toàn (C_x H_y + (x+y/4)O₂ → xCO₂ + (y/2)H₂O) tuân thủ nghiêm ngặt định luật bảo toàn khối lượng và biến thiên enthalpy $\\Delta_r H^\\circ_{298}$ theo GDPT 2018.",
    "relatedEquation": "C_x H_y + (x+y/4)O₂ → xCO₂ + (y/2)H₂O",
    "iupacName": "Complete Combustion Flash Protocol",
    "archetype": "FREE_RADICAL_CASCADE",
    "structuredEffects": [
      {
        "effectId": "B15_EFF_21",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 400
            }
          },
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Gây 400 LP sát thương phản ứng hóa học và rút 1 lá bài."
      }
    ]
  },
  {
    "id": "card_b15_022_spell_acid_base_neutralization_burst_22",
    "name": "Phản Ứng Trung Hòa Chuẩn Độ (Phương Trình 3)",
    "name_en": "Acid-Base Neutralization Burst (Equation 3)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "NORMAL_SPELL",
    "spellSpeed": 1,
    "rarity": "RARE",
    "attribute": "AQUA",
    "manaCost": 2,
    "chemicalFormula": "H+ + OH-",
    "effectCode": "SPELL_B15_ACID_BASE_NEUTRALIZATION_BURST_ACT_22",
    "effectText": "[Phép Phản Ứng Thường]: Kích hoạt hiệu ứng nhiệt/điện hóa: Gây 400 LP sát thương trực tiếp lên đối thủ hoặc rút 1 lá bài từ Bộ bài.",
    "scientificLore": "Phản ứng hóa học Phản Ứng Trung Hòa Chuẩn Độ (H⁺(aq) + OH⁻(aq) → H₂O(l) (ΔH = -57.3 kJ/mol)) tuân thủ nghiêm ngặt định luật bảo toàn khối lượng và biến thiên enthalpy $\\Delta_r H^\\circ_{298}$ theo GDPT 2018.",
    "relatedEquation": "H⁺(aq) + OH⁻(aq) → H₂O(l) (ΔH = -57.3 kJ/mol)",
    "iupacName": "Acid-Base Neutralization Burst Protocol",
    "archetype": "REDOX_CASCADE",
    "structuredEffects": [
      {
        "effectId": "B15_EFF_22",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 400
            }
          },
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Gây 400 LP sát thương phản ứng hóa học và rút 1 lá bài."
      }
    ]
  },
  {
    "id": "card_b15_023_spell_galvanic_redox_discharge_23",
    "name": "Phản Ứng Oxi Hóa Khử Pin Galvanic (Phương Trình 3)",
    "name_en": "Galvanic Redox Discharge (Equation 3)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "NORMAL_SPELL",
    "spellSpeed": 1,
    "rarity": "RARE",
    "attribute": "ELECTRO",
    "manaCost": 3,
    "chemicalFormula": "Zn + Cu2+",
    "effectCode": "SPELL_B15_GALVANIC_REDOX_DISCHARGE_ACT_23",
    "effectText": "[Phép Phản Ứng Thường]: Kích hoạt hiệu ứng nhiệt/điện hóa: Gây 500 LP sát thương trực tiếp lên đối thủ hoặc rút 1 lá bài từ Bộ bài.",
    "scientificLore": "Phản ứng hóa học Phản Ứng Oxi Hóa Khử Pin Galvanic (Zn(s) + Cu²⁺(aq) → Zn²⁺(aq) + Cu(s) (E° = +1.10V)) tuân thủ nghiêm ngặt định luật bảo toàn khối lượng và biến thiên enthalpy $\\Delta_r H^\\circ_{298}$ theo GDPT 2018.",
    "relatedEquation": "Zn(s) + Cu²⁺(aq) → Zn²⁺(aq) + Cu(s) (E° = +1.10V)",
    "iupacName": "Galvanic Redox Discharge Protocol",
    "archetype": "GREEN_CHEMISTRY",
    "structuredEffects": [
      {
        "effectId": "B15_EFF_23",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 400
            }
          },
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Gây 400 LP sát thương phản ứng hóa học và rút 1 lá bài."
      }
    ]
  },
  {
    "id": "card_b15_024_spell_photochemical_halogenation_24",
    "name": "Phản Ứng Thế Halogen Ánh Sáng (Phương Trình 3)",
    "name_en": "Photochemical Halogenation (Equation 3)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "NORMAL_SPELL",
    "spellSpeed": 1,
    "rarity": "SUPER_RARE",
    "attribute": "AERO",
    "manaCost": 4,
    "chemicalFormula": "CH4 + Cl2",
    "effectCode": "SPELL_B15_PHOTOCHEMICAL_HALOGENATION_ACT_24",
    "effectText": "[Phép Phản Ứng Thường]: Kích hoạt hiệu ứng nhiệt/điện hóa: Gây 600 LP sát thương trực tiếp lên đối thủ hoặc rút 1 lá bài từ Bộ bài.",
    "scientificLore": "Phản ứng hóa học Phản Ứng Thế Halogen Ánh Sáng (CH₄ + Cl₂ --hν--> CH₃Cl + HCl) tuân thủ nghiêm ngặt định luật bảo toàn khối lượng và biến thiên enthalpy $\\Delta_r H^\\circ_{298}$ theo GDPT 2018.",
    "relatedEquation": "CH₄ + Cl₂ --hν--> CH₃Cl + HCl",
    "iupacName": "Photochemical Halogenation Protocol",
    "archetype": "FREE_RADICAL_CASCADE",
    "structuredEffects": [
      {
        "effectId": "B15_EFF_24",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 400
            }
          },
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Gây 400 LP sát thương phản ứng hóa học và rút 1 lá bài."
      }
    ]
  },
  {
    "id": "card_b15_025_spell_alcohol_acid_dehydration_25",
    "name": "Phản Ứng Tách Nước Khử Ancol (Phương Trình 3)",
    "name_en": "Alcohol Acid Dehydration (Equation 3)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "NORMAL_SPELL",
    "spellSpeed": 1,
    "rarity": "SUPER_RARE",
    "attribute": "TERRA",
    "manaCost": 5,
    "chemicalFormula": "C2H5OH",
    "effectCode": "SPELL_B15_ALCOHOL_ACID_DEHYDRATION_ACT_25",
    "effectText": "[Phép Phản Ứng Thường]: Kích hoạt hiệu ứng nhiệt/điện hóa: Gây 300 LP sát thương trực tiếp lên đối thủ hoặc rút 1 lá bài từ Bộ bài.",
    "scientificLore": "Phản ứng hóa học Phản Ứng Tách Nước Khử Ancol (C₂H₅OH --H₂SO₄/170°C--> C₂H₄ + H₂O) tuân thủ nghiêm ngặt định luật bảo toàn khối lượng và biến thiên enthalpy $\\Delta_r H^\\circ_{298}$ theo GDPT 2018.",
    "relatedEquation": "C₂H₅OH --H₂SO₄/170°C--> C₂H₄ + H₂O",
    "iupacName": "Alcohol Acid Dehydration Protocol",
    "archetype": "REDOX_CASCADE",
    "structuredEffects": [
      {
        "effectId": "B15_EFF_25",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 400
            }
          },
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Gây 400 LP sát thương phản ứng hóa học và rút 1 lá bài."
      }
    ]
  },
  {
    "id": "card_b15_026_spell_fischer_esterification_synthesis_26",
    "name": "Phản Ứng Este Hóa Fischer (Phương Trình 3)",
    "name_en": "Fischer Esterification Synthesis (Equation 3)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "NORMAL_SPELL",
    "spellSpeed": 1,
    "rarity": "ULTRA_RARE",
    "attribute": "AQUA",
    "manaCost": 1,
    "chemicalFormula": "RCOOH + R'OH",
    "effectCode": "SPELL_B15_FISCHER_ESTERIFICATION_SYNTHESIS_ACT_26",
    "effectText": "[Phép Phản Ứng Thường]: Kích hoạt hiệu ứng nhiệt/điện hóa: Gây 400 LP sát thương trực tiếp lên đối thủ hoặc rút 1 lá bài từ Bộ bài.",
    "scientificLore": "Phản ứng hóa học Phản Ứng Este Hóa Fischer (RCOOH + R'OH ⇌ RCOOR' + H₂O) tuân thủ nghiêm ngặt định luật bảo toàn khối lượng và biến thiên enthalpy $\\Delta_r H^\\circ_{298}$ theo GDPT 2018.",
    "relatedEquation": "RCOOH + R'OH ⇌ RCOOR' + H₂O",
    "iupacName": "Fischer Esterification Synthesis Protocol",
    "archetype": "GREEN_CHEMISTRY",
    "structuredEffects": [
      {
        "effectId": "B15_EFF_26",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 400
            }
          },
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Gây 400 LP sát thương phản ứng hóa học và rút 1 lá bài."
      }
    ]
  },
  {
    "id": "card_b15_027_spell_silver_mirror_tollens_reduction_27",
    "name": "Phản Ứng Tráng Bạc Glucozo (Phương Trình 3)",
    "name_en": "Silver Mirror Tollens Reduction (Equation 3)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "NORMAL_SPELL",
    "spellSpeed": 1,
    "rarity": "SECRET_RARE",
    "attribute": "NOBLE_VOID",
    "manaCost": 2,
    "chemicalFormula": "C6H12O6 + Ag+",
    "effectCode": "SPELL_B15_SILVER_MIRROR_TOLLENS_REDUCTION_ACT_27",
    "effectText": "[Phép Phản Ứng Thường]: Kích hoạt hiệu ứng nhiệt/điện hóa: Gây 500 LP sát thương trực tiếp lên đối thủ hoặc rút 1 lá bài từ Bộ bài.",
    "scientificLore": "Phản ứng hóa học Phản Ứng Tráng Bạc Glucozo (C₆H₁₂O₆ + 2[Ag(NH₃)₂]OH → C₆H₁₂O₇ + 2Ag↓ + 4NH₃ + H₂O) tuân thủ nghiêm ngặt định luật bảo toàn khối lượng và biến thiên enthalpy $\\Delta_r H^\\circ_{298}$ theo GDPT 2018.",
    "relatedEquation": "C₆H₁₂O₆ + 2[Ag(NH₃)₂]OH → C₆H₁₂O₇ + 2Ag↓ + 4NH₃ + H₂O",
    "iupacName": "Silver Mirror Tollens Reduction Protocol",
    "archetype": "FREE_RADICAL_CASCADE",
    "structuredEffects": [
      {
        "effectId": "B15_EFF_27",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 400
            }
          },
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Gây 400 LP sát thương phản ứng hóa học và rút 1 lá bài."
      }
    ]
  },
  {
    "id": "card_b15_028_spell_limestone_calcination_thermal_decomposition_28",
    "name": "Phản Ứng Nhiệt Phân Đá Vôi (Phương Trình 3)",
    "name_en": "Limestone Calcination Thermal Decomposition (Equation 3)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "NORMAL_SPELL",
    "spellSpeed": 1,
    "rarity": "COMMON",
    "attribute": "TERRA",
    "manaCost": 3,
    "chemicalFormula": "CaCO3",
    "effectCode": "SPELL_B15_LIMESTONE_CALCINATION_THERMAL_DECOMPOSITION_ACT_28",
    "effectText": "[Phép Phản Ứng Thường]: Kích hoạt hiệu ứng nhiệt/điện hóa: Gây 600 LP sát thương trực tiếp lên đối thủ hoặc rút 1 lá bài từ Bộ bài.",
    "scientificLore": "Phản ứng hóa học Phản Ứng Nhiệt Phân Đá Vôi (CaCO₃ --1000°C--> CaO + CO₂↑) tuân thủ nghiêm ngặt định luật bảo toàn khối lượng và biến thiên enthalpy $\\Delta_r H^\\circ_{298}$ theo GDPT 2018.",
    "relatedEquation": "CaCO₃ --1000°C--> CaO + CO₂↑",
    "iupacName": "Limestone Calcination Thermal Decomposition Protocol",
    "archetype": "REDOX_CASCADE",
    "structuredEffects": [
      {
        "effectId": "B15_EFF_28",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 400
            }
          },
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Gây 400 LP sát thương phản ứng hóa học và rút 1 lá bài."
      }
    ]
  },
  {
    "id": "card_b15_029_spell_aluminum_cation_hydrolysis_acidification_29",
    "name": "Phản Ứng Thủy Phân Muối Nhôm (Phương Trình 3)",
    "name_en": "Aluminum Cation Hydrolysis Acidification (Equation 3)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "NORMAL_SPELL",
    "spellSpeed": 1,
    "rarity": "COMMON",
    "attribute": "ACID_DARK",
    "manaCost": 4,
    "chemicalFormula": "Al3+ + 3H2O",
    "effectCode": "SPELL_B15_ALUMINUM_CATION_HYDROLYSIS_ACIDIFICATION_ACT_29",
    "effectText": "[Phép Phản Ứng Thường]: Kích hoạt hiệu ứng nhiệt/điện hóa: Gây 300 LP sát thương trực tiếp lên đối thủ hoặc rút 1 lá bài từ Bộ bài.",
    "scientificLore": "Phản ứng hóa học Phản Ứng Thủy Phân Muối Nhôm (Al³⁺ + 3H₂O ⇌ Al(OH)₃↓ + 3H⁺) tuân thủ nghiêm ngặt định luật bảo toàn khối lượng và biến thiên enthalpy $\\Delta_r H^\\circ_{298}$ theo GDPT 2018.",
    "relatedEquation": "Al³⁺ + 3H₂O ⇌ Al(OH)₃↓ + 3H⁺",
    "iupacName": "Aluminum Cation Hydrolysis Acidification Protocol",
    "archetype": "GREEN_CHEMISTRY",
    "structuredEffects": [
      {
        "effectId": "B15_EFF_29",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 400
            }
          },
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Gây 400 LP sát thương phản ứng hóa học và rút 1 lá bài."
      }
    ]
  },
  {
    "id": "card_b15_030_spell_gold_solvation_dissolution_30",
    "name": "Phản Ứng Hòa Tan Vàng Bằng Cường Toan (Phương Trình 3)",
    "name_en": "Gold Solvation Dissolution (Equation 3)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "NORMAL_SPELL",
    "spellSpeed": 1,
    "rarity": "COMMON",
    "attribute": "ACID_DARK",
    "manaCost": 5,
    "chemicalFormula": "Au + HNO3 + 4HCl",
    "effectCode": "SPELL_B15_GOLD_SOLVATION_DISSOLUTION_ACT_30",
    "effectText": "[Phép Phản Ứng Thường]: Kích hoạt hiệu ứng nhiệt/điện hóa: Gây 400 LP sát thương trực tiếp lên đối thủ hoặc rút 1 lá bài từ Bộ bài.",
    "scientificLore": "Phản ứng hóa học Phản Ứng Hòa Tan Vàng Bằng Cường Toan (Au + HNO₃ + 4HCl → HAuCl₄ + NO + 2H₂O) tuân thủ nghiêm ngặt định luật bảo toàn khối lượng và biến thiên enthalpy $\\Delta_r H^\\circ_{298}$ theo GDPT 2018.",
    "relatedEquation": "Au + HNO₃ + 4HCl → HAuCl₄ + NO + 2H₂O",
    "iupacName": "Gold Solvation Dissolution Protocol",
    "archetype": "FREE_RADICAL_CASCADE",
    "structuredEffects": [
      {
        "effectId": "B15_EFF_30",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 400
            }
          },
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Gây 400 LP sát thương phản ứng hóa học và rút 1 lá bài."
      }
    ]
  },
  {
    "id": "card_b15_031_spell_complete_combustion_flash_31",
    "name": "Phản Ứng Đốt Cháy Hoàn Toàn (Phương Trình 4)",
    "name_en": "Complete Combustion Flash (Equation 4)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "NORMAL_SPELL",
    "spellSpeed": 1,
    "rarity": "RARE",
    "attribute": "PYRO",
    "manaCost": 1,
    "chemicalFormula": "C_x H_y + O2",
    "effectCode": "SPELL_B15_COMPLETE_COMBUSTION_FLASH_ACT_31",
    "effectText": "[Phép Phản Ứng Thường]: Kích hoạt hiệu ứng nhiệt/điện hóa: Gây 500 LP sát thương trực tiếp lên đối thủ hoặc rút 1 lá bài từ Bộ bài.",
    "scientificLore": "Phản ứng hóa học Phản Ứng Đốt Cháy Hoàn Toàn (C_x H_y + (x+y/4)O₂ → xCO₂ + (y/2)H₂O) tuân thủ nghiêm ngặt định luật bảo toàn khối lượng và biến thiên enthalpy $\\Delta_r H^\\circ_{298}$ theo GDPT 2018.",
    "relatedEquation": "C_x H_y + (x+y/4)O₂ → xCO₂ + (y/2)H₂O",
    "iupacName": "Complete Combustion Flash Protocol",
    "archetype": "REDOX_CASCADE",
    "structuredEffects": [
      {
        "effectId": "B15_EFF_31",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 400
            }
          },
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Gây 400 LP sát thương phản ứng hóa học và rút 1 lá bài."
      }
    ]
  },
  {
    "id": "card_b15_032_spell_acid_base_neutralization_burst_32",
    "name": "Phản Ứng Trung Hòa Chuẩn Độ (Phương Trình 4)",
    "name_en": "Acid-Base Neutralization Burst (Equation 4)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "NORMAL_SPELL",
    "spellSpeed": 1,
    "rarity": "RARE",
    "attribute": "AQUA",
    "manaCost": 2,
    "chemicalFormula": "H+ + OH-",
    "effectCode": "SPELL_B15_ACID_BASE_NEUTRALIZATION_BURST_ACT_32",
    "effectText": "[Phép Phản Ứng Thường]: Kích hoạt hiệu ứng nhiệt/điện hóa: Gây 600 LP sát thương trực tiếp lên đối thủ hoặc rút 1 lá bài từ Bộ bài.",
    "scientificLore": "Phản ứng hóa học Phản Ứng Trung Hòa Chuẩn Độ (H⁺(aq) + OH⁻(aq) → H₂O(l) (ΔH = -57.3 kJ/mol)) tuân thủ nghiêm ngặt định luật bảo toàn khối lượng và biến thiên enthalpy $\\Delta_r H^\\circ_{298}$ theo GDPT 2018.",
    "relatedEquation": "H⁺(aq) + OH⁻(aq) → H₂O(l) (ΔH = -57.3 kJ/mol)",
    "iupacName": "Acid-Base Neutralization Burst Protocol",
    "archetype": "GREEN_CHEMISTRY",
    "structuredEffects": [
      {
        "effectId": "B15_EFF_32",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 400
            }
          },
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Gây 400 LP sát thương phản ứng hóa học và rút 1 lá bài."
      }
    ]
  },
  {
    "id": "card_b15_033_spell_galvanic_redox_discharge_33",
    "name": "Phản Ứng Oxi Hóa Khử Pin Galvanic (Phương Trình 4)",
    "name_en": "Galvanic Redox Discharge (Equation 4)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "NORMAL_SPELL",
    "spellSpeed": 1,
    "rarity": "SUPER_RARE",
    "attribute": "ELECTRO",
    "manaCost": 3,
    "chemicalFormula": "Zn + Cu2+",
    "effectCode": "SPELL_B15_GALVANIC_REDOX_DISCHARGE_ACT_33",
    "effectText": "[Phép Phản Ứng Thường]: Kích hoạt hiệu ứng nhiệt/điện hóa: Gây 300 LP sát thương trực tiếp lên đối thủ hoặc rút 1 lá bài từ Bộ bài.",
    "scientificLore": "Phản ứng hóa học Phản Ứng Oxi Hóa Khử Pin Galvanic (Zn(s) + Cu²⁺(aq) → Zn²⁺(aq) + Cu(s) (E° = +1.10V)) tuân thủ nghiêm ngặt định luật bảo toàn khối lượng và biến thiên enthalpy $\\Delta_r H^\\circ_{298}$ theo GDPT 2018.",
    "relatedEquation": "Zn(s) + Cu²⁺(aq) → Zn²⁺(aq) + Cu(s) (E° = +1.10V)",
    "iupacName": "Galvanic Redox Discharge Protocol",
    "archetype": "FREE_RADICAL_CASCADE",
    "structuredEffects": [
      {
        "effectId": "B15_EFF_33",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 400
            }
          },
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Gây 400 LP sát thương phản ứng hóa học và rút 1 lá bài."
      }
    ]
  },
  {
    "id": "card_b15_034_spell_photochemical_halogenation_34",
    "name": "Phản Ứng Thế Halogen Ánh Sáng (Phương Trình 4)",
    "name_en": "Photochemical Halogenation (Equation 4)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "NORMAL_SPELL",
    "spellSpeed": 1,
    "rarity": "SUPER_RARE",
    "attribute": "AERO",
    "manaCost": 4,
    "chemicalFormula": "CH4 + Cl2",
    "effectCode": "SPELL_B15_PHOTOCHEMICAL_HALOGENATION_ACT_34",
    "effectText": "[Phép Phản Ứng Thường]: Kích hoạt hiệu ứng nhiệt/điện hóa: Gây 400 LP sát thương trực tiếp lên đối thủ hoặc rút 1 lá bài từ Bộ bài.",
    "scientificLore": "Phản ứng hóa học Phản Ứng Thế Halogen Ánh Sáng (CH₄ + Cl₂ --hν--> CH₃Cl + HCl) tuân thủ nghiêm ngặt định luật bảo toàn khối lượng và biến thiên enthalpy $\\Delta_r H^\\circ_{298}$ theo GDPT 2018.",
    "relatedEquation": "CH₄ + Cl₂ --hν--> CH₃Cl + HCl",
    "iupacName": "Photochemical Halogenation Protocol",
    "archetype": "REDOX_CASCADE",
    "structuredEffects": [
      {
        "effectId": "B15_EFF_34",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 400
            }
          },
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Gây 400 LP sát thương phản ứng hóa học và rút 1 lá bài."
      }
    ]
  },
  {
    "id": "card_b15_035_spell_alcohol_acid_dehydration_35",
    "name": "Phản Ứng Tách Nước Khử Ancol (Phương Trình 4)",
    "name_en": "Alcohol Acid Dehydration (Equation 4)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "NORMAL_SPELL",
    "spellSpeed": 1,
    "rarity": "ULTRA_RARE",
    "attribute": "TERRA",
    "manaCost": 5,
    "chemicalFormula": "C2H5OH",
    "effectCode": "SPELL_B15_ALCOHOL_ACID_DEHYDRATION_ACT_35",
    "effectText": "[Phép Phản Ứng Thường]: Kích hoạt hiệu ứng nhiệt/điện hóa: Gây 500 LP sát thương trực tiếp lên đối thủ hoặc rút 1 lá bài từ Bộ bài.",
    "scientificLore": "Phản ứng hóa học Phản Ứng Tách Nước Khử Ancol (C₂H₅OH --H₂SO₄/170°C--> C₂H₄ + H₂O) tuân thủ nghiêm ngặt định luật bảo toàn khối lượng và biến thiên enthalpy $\\Delta_r H^\\circ_{298}$ theo GDPT 2018.",
    "relatedEquation": "C₂H₅OH --H₂SO₄/170°C--> C₂H₄ + H₂O",
    "iupacName": "Alcohol Acid Dehydration Protocol",
    "archetype": "GREEN_CHEMISTRY",
    "structuredEffects": [
      {
        "effectId": "B15_EFF_35",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 400
            }
          },
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Gây 400 LP sát thương phản ứng hóa học và rút 1 lá bài."
      }
    ]
  },
  {
    "id": "card_b15_036_spell_fischer_esterification_synthesis_36",
    "name": "Phản Ứng Este Hóa Fischer (Phương Trình 4)",
    "name_en": "Fischer Esterification Synthesis (Equation 4)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "NORMAL_SPELL",
    "spellSpeed": 1,
    "rarity": "SECRET_RARE",
    "attribute": "AQUA",
    "manaCost": 1,
    "chemicalFormula": "RCOOH + R'OH",
    "effectCode": "SPELL_B15_FISCHER_ESTERIFICATION_SYNTHESIS_ACT_36",
    "effectText": "[Phép Phản Ứng Thường]: Kích hoạt hiệu ứng nhiệt/điện hóa: Gây 600 LP sát thương trực tiếp lên đối thủ hoặc rút 1 lá bài từ Bộ bài.",
    "scientificLore": "Phản ứng hóa học Phản Ứng Este Hóa Fischer (RCOOH + R'OH ⇌ RCOOR' + H₂O) tuân thủ nghiêm ngặt định luật bảo toàn khối lượng và biến thiên enthalpy $\\Delta_r H^\\circ_{298}$ theo GDPT 2018.",
    "relatedEquation": "RCOOH + R'OH ⇌ RCOOR' + H₂O",
    "iupacName": "Fischer Esterification Synthesis Protocol",
    "archetype": "FREE_RADICAL_CASCADE",
    "structuredEffects": [
      {
        "effectId": "B15_EFF_36",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 400
            }
          },
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Gây 400 LP sát thương phản ứng hóa học và rút 1 lá bài."
      }
    ]
  },
  {
    "id": "card_b15_037_spell_silver_mirror_tollens_reduction_37",
    "name": "Phản Ứng Tráng Bạc Glucozo (Phương Trình 4)",
    "name_en": "Silver Mirror Tollens Reduction (Equation 4)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "NORMAL_SPELL",
    "spellSpeed": 1,
    "rarity": "COMMON",
    "attribute": "NOBLE_VOID",
    "manaCost": 2,
    "chemicalFormula": "C6H12O6 + Ag+",
    "effectCode": "SPELL_B15_SILVER_MIRROR_TOLLENS_REDUCTION_ACT_37",
    "effectText": "[Phép Phản Ứng Thường]: Kích hoạt hiệu ứng nhiệt/điện hóa: Gây 300 LP sát thương trực tiếp lên đối thủ hoặc rút 1 lá bài từ Bộ bài.",
    "scientificLore": "Phản ứng hóa học Phản Ứng Tráng Bạc Glucozo (C₆H₁₂O₆ + 2[Ag(NH₃)₂]OH → C₆H₁₂O₇ + 2Ag↓ + 4NH₃ + H₂O) tuân thủ nghiêm ngặt định luật bảo toàn khối lượng và biến thiên enthalpy $\\Delta_r H^\\circ_{298}$ theo GDPT 2018.",
    "relatedEquation": "C₆H₁₂O₆ + 2[Ag(NH₃)₂]OH → C₆H₁₂O₇ + 2Ag↓ + 4NH₃ + H₂O",
    "iupacName": "Silver Mirror Tollens Reduction Protocol",
    "archetype": "REDOX_CASCADE",
    "structuredEffects": [
      {
        "effectId": "B15_EFF_37",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 400
            }
          },
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Gây 400 LP sát thương phản ứng hóa học và rút 1 lá bài."
      }
    ]
  },
  {
    "id": "card_b15_038_spell_limestone_calcination_thermal_decomposition_38",
    "name": "Phản Ứng Nhiệt Phân Đá Vôi (Phương Trình 4)",
    "name_en": "Limestone Calcination Thermal Decomposition (Equation 4)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "NORMAL_SPELL",
    "spellSpeed": 1,
    "rarity": "COMMON",
    "attribute": "TERRA",
    "manaCost": 3,
    "chemicalFormula": "CaCO3",
    "effectCode": "SPELL_B15_LIMESTONE_CALCINATION_THERMAL_DECOMPOSITION_ACT_38",
    "effectText": "[Phép Phản Ứng Thường]: Kích hoạt hiệu ứng nhiệt/điện hóa: Gây 400 LP sát thương trực tiếp lên đối thủ hoặc rút 1 lá bài từ Bộ bài.",
    "scientificLore": "Phản ứng hóa học Phản Ứng Nhiệt Phân Đá Vôi (CaCO₃ --1000°C--> CaO + CO₂↑) tuân thủ nghiêm ngặt định luật bảo toàn khối lượng và biến thiên enthalpy $\\Delta_r H^\\circ_{298}$ theo GDPT 2018.",
    "relatedEquation": "CaCO₃ --1000°C--> CaO + CO₂↑",
    "iupacName": "Limestone Calcination Thermal Decomposition Protocol",
    "archetype": "GREEN_CHEMISTRY",
    "structuredEffects": [
      {
        "effectId": "B15_EFF_38",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 400
            }
          },
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Gây 400 LP sát thương phản ứng hóa học và rút 1 lá bài."
      }
    ]
  },
  {
    "id": "card_b15_039_spell_aluminum_cation_hydrolysis_acidification_39",
    "name": "Phản Ứng Thủy Phân Muối Nhôm (Phương Trình 4)",
    "name_en": "Aluminum Cation Hydrolysis Acidification (Equation 4)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "NORMAL_SPELL",
    "spellSpeed": 1,
    "rarity": "COMMON",
    "attribute": "ACID_DARK",
    "manaCost": 4,
    "chemicalFormula": "Al3+ + 3H2O",
    "effectCode": "SPELL_B15_ALUMINUM_CATION_HYDROLYSIS_ACIDIFICATION_ACT_39",
    "effectText": "[Phép Phản Ứng Thường]: Kích hoạt hiệu ứng nhiệt/điện hóa: Gây 500 LP sát thương trực tiếp lên đối thủ hoặc rút 1 lá bài từ Bộ bài.",
    "scientificLore": "Phản ứng hóa học Phản Ứng Thủy Phân Muối Nhôm (Al³⁺ + 3H₂O ⇌ Al(OH)₃↓ + 3H⁺) tuân thủ nghiêm ngặt định luật bảo toàn khối lượng và biến thiên enthalpy $\\Delta_r H^\\circ_{298}$ theo GDPT 2018.",
    "relatedEquation": "Al³⁺ + 3H₂O ⇌ Al(OH)₃↓ + 3H⁺",
    "iupacName": "Aluminum Cation Hydrolysis Acidification Protocol",
    "archetype": "FREE_RADICAL_CASCADE",
    "structuredEffects": [
      {
        "effectId": "B15_EFF_39",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 400
            }
          },
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Gây 400 LP sát thương phản ứng hóa học và rút 1 lá bài."
      }
    ]
  },
  {
    "id": "card_b15_040_spell_gold_solvation_dissolution_40",
    "name": "Phản Ứng Hòa Tan Vàng Bằng Cường Toan (Phương Trình 4)",
    "name_en": "Gold Solvation Dissolution (Equation 4)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "NORMAL_SPELL",
    "spellSpeed": 1,
    "rarity": "RARE",
    "attribute": "ACID_DARK",
    "manaCost": 5,
    "chemicalFormula": "Au + HNO3 + 4HCl",
    "effectCode": "SPELL_B15_GOLD_SOLVATION_DISSOLUTION_ACT_40",
    "effectText": "[Phép Phản Ứng Thường]: Kích hoạt hiệu ứng nhiệt/điện hóa: Gây 600 LP sát thương trực tiếp lên đối thủ hoặc rút 1 lá bài từ Bộ bài.",
    "scientificLore": "Phản ứng hóa học Phản Ứng Hòa Tan Vàng Bằng Cường Toan (Au + HNO₃ + 4HCl → HAuCl₄ + NO + 2H₂O) tuân thủ nghiêm ngặt định luật bảo toàn khối lượng và biến thiên enthalpy $\\Delta_r H^\\circ_{298}$ theo GDPT 2018.",
    "relatedEquation": "Au + HNO₃ + 4HCl → HAuCl₄ + NO + 2H₂O",
    "iupacName": "Gold Solvation Dissolution Protocol",
    "archetype": "REDOX_CASCADE",
    "structuredEffects": [
      {
        "effectId": "B15_EFF_40",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 400
            }
          },
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Gây 400 LP sát thương phản ứng hóa học và rút 1 lá bài."
      }
    ]
  },
  {
    "id": "card_b15_041_spell_complete_combustion_flash_41",
    "name": "Phản Ứng Đốt Cháy Hoàn Toàn (Phương Trình 5)",
    "name_en": "Complete Combustion Flash (Equation 5)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "NORMAL_SPELL",
    "spellSpeed": 1,
    "rarity": "RARE",
    "attribute": "PYRO",
    "manaCost": 1,
    "chemicalFormula": "C_x H_y + O2",
    "effectCode": "SPELL_B15_COMPLETE_COMBUSTION_FLASH_ACT_41",
    "effectText": "[Phép Phản Ứng Thường]: Kích hoạt hiệu ứng nhiệt/điện hóa: Gây 300 LP sát thương trực tiếp lên đối thủ hoặc rút 1 lá bài từ Bộ bài.",
    "scientificLore": "Phản ứng hóa học Phản Ứng Đốt Cháy Hoàn Toàn (C_x H_y + (x+y/4)O₂ → xCO₂ + (y/2)H₂O) tuân thủ nghiêm ngặt định luật bảo toàn khối lượng và biến thiên enthalpy $\\Delta_r H^\\circ_{298}$ theo GDPT 2018.",
    "relatedEquation": "C_x H_y + (x+y/4)O₂ → xCO₂ + (y/2)H₂O",
    "iupacName": "Complete Combustion Flash Protocol",
    "archetype": "GREEN_CHEMISTRY",
    "structuredEffects": [
      {
        "effectId": "B15_EFF_41",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 400
            }
          },
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Gây 400 LP sát thương phản ứng hóa học và rút 1 lá bài."
      }
    ]
  },
  {
    "id": "card_b15_042_spell_acid_base_neutralization_burst_42",
    "name": "Phản Ứng Trung Hòa Chuẩn Độ (Phương Trình 5)",
    "name_en": "Acid-Base Neutralization Burst (Equation 5)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "NORMAL_SPELL",
    "spellSpeed": 1,
    "rarity": "SUPER_RARE",
    "attribute": "AQUA",
    "manaCost": 2,
    "chemicalFormula": "H+ + OH-",
    "effectCode": "SPELL_B15_ACID_BASE_NEUTRALIZATION_BURST_ACT_42",
    "effectText": "[Phép Phản Ứng Thường]: Kích hoạt hiệu ứng nhiệt/điện hóa: Gây 400 LP sát thương trực tiếp lên đối thủ hoặc rút 1 lá bài từ Bộ bài.",
    "scientificLore": "Phản ứng hóa học Phản Ứng Trung Hòa Chuẩn Độ (H⁺(aq) + OH⁻(aq) → H₂O(l) (ΔH = -57.3 kJ/mol)) tuân thủ nghiêm ngặt định luật bảo toàn khối lượng và biến thiên enthalpy $\\Delta_r H^\\circ_{298}$ theo GDPT 2018.",
    "relatedEquation": "H⁺(aq) + OH⁻(aq) → H₂O(l) (ΔH = -57.3 kJ/mol)",
    "iupacName": "Acid-Base Neutralization Burst Protocol",
    "archetype": "FREE_RADICAL_CASCADE",
    "structuredEffects": [
      {
        "effectId": "B15_EFF_42",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 400
            }
          },
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Gây 400 LP sát thương phản ứng hóa học và rút 1 lá bài."
      }
    ]
  },
  {
    "id": "card_b15_043_spell_galvanic_redox_discharge_43",
    "name": "Phản Ứng Oxi Hóa Khử Pin Galvanic (Phương Trình 5)",
    "name_en": "Galvanic Redox Discharge (Equation 5)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "NORMAL_SPELL",
    "spellSpeed": 1,
    "rarity": "SUPER_RARE",
    "attribute": "ELECTRO",
    "manaCost": 3,
    "chemicalFormula": "Zn + Cu2+",
    "effectCode": "SPELL_B15_GALVANIC_REDOX_DISCHARGE_ACT_43",
    "effectText": "[Phép Phản Ứng Thường]: Kích hoạt hiệu ứng nhiệt/điện hóa: Gây 500 LP sát thương trực tiếp lên đối thủ hoặc rút 1 lá bài từ Bộ bài.",
    "scientificLore": "Phản ứng hóa học Phản Ứng Oxi Hóa Khử Pin Galvanic (Zn(s) + Cu²⁺(aq) → Zn²⁺(aq) + Cu(s) (E° = +1.10V)) tuân thủ nghiêm ngặt định luật bảo toàn khối lượng và biến thiên enthalpy $\\Delta_r H^\\circ_{298}$ theo GDPT 2018.",
    "relatedEquation": "Zn(s) + Cu²⁺(aq) → Zn²⁺(aq) + Cu(s) (E° = +1.10V)",
    "iupacName": "Galvanic Redox Discharge Protocol",
    "archetype": "REDOX_CASCADE",
    "structuredEffects": [
      {
        "effectId": "B15_EFF_43",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 400
            }
          },
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Gây 400 LP sát thương phản ứng hóa học và rút 1 lá bài."
      }
    ]
  },
  {
    "id": "card_b15_044_spell_photochemical_halogenation_44",
    "name": "Phản Ứng Thế Halogen Ánh Sáng (Phương Trình 5)",
    "name_en": "Photochemical Halogenation (Equation 5)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "NORMAL_SPELL",
    "spellSpeed": 1,
    "rarity": "ULTRA_RARE",
    "attribute": "AERO",
    "manaCost": 4,
    "chemicalFormula": "CH4 + Cl2",
    "effectCode": "SPELL_B15_PHOTOCHEMICAL_HALOGENATION_ACT_44",
    "effectText": "[Phép Phản Ứng Thường]: Kích hoạt hiệu ứng nhiệt/điện hóa: Gây 600 LP sát thương trực tiếp lên đối thủ hoặc rút 1 lá bài từ Bộ bài.",
    "scientificLore": "Phản ứng hóa học Phản Ứng Thế Halogen Ánh Sáng (CH₄ + Cl₂ --hν--> CH₃Cl + HCl) tuân thủ nghiêm ngặt định luật bảo toàn khối lượng và biến thiên enthalpy $\\Delta_r H^\\circ_{298}$ theo GDPT 2018.",
    "relatedEquation": "CH₄ + Cl₂ --hν--> CH₃Cl + HCl",
    "iupacName": "Photochemical Halogenation Protocol",
    "archetype": "GREEN_CHEMISTRY",
    "structuredEffects": [
      {
        "effectId": "B15_EFF_44",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 400
            }
          },
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Gây 400 LP sát thương phản ứng hóa học và rút 1 lá bài."
      }
    ]
  },
  {
    "id": "card_b15_045_spell_alcohol_acid_dehydration_45",
    "name": "Phản Ứng Tách Nước Khử Ancol (Phương Trình 5)",
    "name_en": "Alcohol Acid Dehydration (Equation 5)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "NORMAL_SPELL",
    "spellSpeed": 1,
    "rarity": "SECRET_RARE",
    "attribute": "TERRA",
    "manaCost": 5,
    "chemicalFormula": "C2H5OH",
    "effectCode": "SPELL_B15_ALCOHOL_ACID_DEHYDRATION_ACT_45",
    "effectText": "[Phép Phản Ứng Thường]: Kích hoạt hiệu ứng nhiệt/điện hóa: Gây 300 LP sát thương trực tiếp lên đối thủ hoặc rút 1 lá bài từ Bộ bài.",
    "scientificLore": "Phản ứng hóa học Phản Ứng Tách Nước Khử Ancol (C₂H₅OH --H₂SO₄/170°C--> C₂H₄ + H₂O) tuân thủ nghiêm ngặt định luật bảo toàn khối lượng và biến thiên enthalpy $\\Delta_r H^\\circ_{298}$ theo GDPT 2018.",
    "relatedEquation": "C₂H₅OH --H₂SO₄/170°C--> C₂H₄ + H₂O",
    "iupacName": "Alcohol Acid Dehydration Protocol",
    "archetype": "FREE_RADICAL_CASCADE",
    "structuredEffects": [
      {
        "effectId": "B15_EFF_45",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 400
            }
          },
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Gây 400 LP sát thương phản ứng hóa học và rút 1 lá bài."
      }
    ]
  },
  {
    "id": "card_b15_046_spell_fischer_esterification_synthesis_46",
    "name": "Phản Ứng Este Hóa Fischer (Phương Trình 5)",
    "name_en": "Fischer Esterification Synthesis (Equation 5)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "NORMAL_SPELL",
    "spellSpeed": 1,
    "rarity": "COMMON",
    "attribute": "AQUA",
    "manaCost": 1,
    "chemicalFormula": "RCOOH + R'OH",
    "effectCode": "SPELL_B15_FISCHER_ESTERIFICATION_SYNTHESIS_ACT_46",
    "effectText": "[Phép Phản Ứng Thường]: Kích hoạt hiệu ứng nhiệt/điện hóa: Gây 400 LP sát thương trực tiếp lên đối thủ hoặc rút 1 lá bài từ Bộ bài.",
    "scientificLore": "Phản ứng hóa học Phản Ứng Este Hóa Fischer (RCOOH + R'OH ⇌ RCOOR' + H₂O) tuân thủ nghiêm ngặt định luật bảo toàn khối lượng và biến thiên enthalpy $\\Delta_r H^\\circ_{298}$ theo GDPT 2018.",
    "relatedEquation": "RCOOH + R'OH ⇌ RCOOR' + H₂O",
    "iupacName": "Fischer Esterification Synthesis Protocol",
    "archetype": "REDOX_CASCADE",
    "structuredEffects": [
      {
        "effectId": "B15_EFF_46",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 400
            }
          },
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Gây 400 LP sát thương phản ứng hóa học và rút 1 lá bài."
      }
    ]
  },
  {
    "id": "card_b15_047_spell_silver_mirror_tollens_reduction_47",
    "name": "Phản Ứng Tráng Bạc Glucozo (Phương Trình 5)",
    "name_en": "Silver Mirror Tollens Reduction (Equation 5)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "NORMAL_SPELL",
    "spellSpeed": 1,
    "rarity": "COMMON",
    "attribute": "NOBLE_VOID",
    "manaCost": 2,
    "chemicalFormula": "C6H12O6 + Ag+",
    "effectCode": "SPELL_B15_SILVER_MIRROR_TOLLENS_REDUCTION_ACT_47",
    "effectText": "[Phép Phản Ứng Thường]: Kích hoạt hiệu ứng nhiệt/điện hóa: Gây 500 LP sát thương trực tiếp lên đối thủ hoặc rút 1 lá bài từ Bộ bài.",
    "scientificLore": "Phản ứng hóa học Phản Ứng Tráng Bạc Glucozo (C₆H₁₂O₆ + 2[Ag(NH₃)₂]OH → C₆H₁₂O₇ + 2Ag↓ + 4NH₃ + H₂O) tuân thủ nghiêm ngặt định luật bảo toàn khối lượng và biến thiên enthalpy $\\Delta_r H^\\circ_{298}$ theo GDPT 2018.",
    "relatedEquation": "C₆H₁₂O₆ + 2[Ag(NH₃)₂]OH → C₆H₁₂O₇ + 2Ag↓ + 4NH₃ + H₂O",
    "iupacName": "Silver Mirror Tollens Reduction Protocol",
    "archetype": "GREEN_CHEMISTRY",
    "structuredEffects": [
      {
        "effectId": "B15_EFF_47",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 400
            }
          },
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Gây 400 LP sát thương phản ứng hóa học và rút 1 lá bài."
      }
    ]
  },
  {
    "id": "card_b15_048_spell_limestone_calcination_thermal_decomposition_48",
    "name": "Phản Ứng Nhiệt Phân Đá Vôi (Phương Trình 5)",
    "name_en": "Limestone Calcination Thermal Decomposition (Equation 5)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "NORMAL_SPELL",
    "spellSpeed": 1,
    "rarity": "COMMON",
    "attribute": "TERRA",
    "manaCost": 3,
    "chemicalFormula": "CaCO3",
    "effectCode": "SPELL_B15_LIMESTONE_CALCINATION_THERMAL_DECOMPOSITION_ACT_48",
    "effectText": "[Phép Phản Ứng Thường]: Kích hoạt hiệu ứng nhiệt/điện hóa: Gây 600 LP sát thương trực tiếp lên đối thủ hoặc rút 1 lá bài từ Bộ bài.",
    "scientificLore": "Phản ứng hóa học Phản Ứng Nhiệt Phân Đá Vôi (CaCO₃ --1000°C--> CaO + CO₂↑) tuân thủ nghiêm ngặt định luật bảo toàn khối lượng và biến thiên enthalpy $\\Delta_r H^\\circ_{298}$ theo GDPT 2018.",
    "relatedEquation": "CaCO₃ --1000°C--> CaO + CO₂↑",
    "iupacName": "Limestone Calcination Thermal Decomposition Protocol",
    "archetype": "FREE_RADICAL_CASCADE",
    "structuredEffects": [
      {
        "effectId": "B15_EFF_48",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 400
            }
          },
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Gây 400 LP sát thương phản ứng hóa học và rút 1 lá bài."
      }
    ]
  },
  {
    "id": "card_b15_049_spell_aluminum_cation_hydrolysis_acidification_49",
    "name": "Phản Ứng Thủy Phân Muối Nhôm (Phương Trình 5)",
    "name_en": "Aluminum Cation Hydrolysis Acidification (Equation 5)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "NORMAL_SPELL",
    "spellSpeed": 1,
    "rarity": "RARE",
    "attribute": "ACID_DARK",
    "manaCost": 4,
    "chemicalFormula": "Al3+ + 3H2O",
    "effectCode": "SPELL_B15_ALUMINUM_CATION_HYDROLYSIS_ACIDIFICATION_ACT_49",
    "effectText": "[Phép Phản Ứng Thường]: Kích hoạt hiệu ứng nhiệt/điện hóa: Gây 300 LP sát thương trực tiếp lên đối thủ hoặc rút 1 lá bài từ Bộ bài.",
    "scientificLore": "Phản ứng hóa học Phản Ứng Thủy Phân Muối Nhôm (Al³⁺ + 3H₂O ⇌ Al(OH)₃↓ + 3H⁺) tuân thủ nghiêm ngặt định luật bảo toàn khối lượng và biến thiên enthalpy $\\Delta_r H^\\circ_{298}$ theo GDPT 2018.",
    "relatedEquation": "Al³⁺ + 3H₂O ⇌ Al(OH)₃↓ + 3H⁺",
    "iupacName": "Aluminum Cation Hydrolysis Acidification Protocol",
    "archetype": "REDOX_CASCADE",
    "structuredEffects": [
      {
        "effectId": "B15_EFF_49",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 400
            }
          },
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Gây 400 LP sát thương phản ứng hóa học và rút 1 lá bài."
      }
    ]
  },
  {
    "id": "card_b15_050_spell_gold_solvation_dissolution_50",
    "name": "Phản Ứng Hòa Tan Vàng Bằng Cường Toan (Phương Trình 5)",
    "name_en": "Gold Solvation Dissolution (Equation 5)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "NORMAL_SPELL",
    "spellSpeed": 1,
    "rarity": "RARE",
    "attribute": "ACID_DARK",
    "manaCost": 5,
    "chemicalFormula": "Au + HNO3 + 4HCl",
    "effectCode": "SPELL_B15_GOLD_SOLVATION_DISSOLUTION_ACT_50",
    "effectText": "[Phép Phản Ứng Thường]: Kích hoạt hiệu ứng nhiệt/điện hóa: Gây 400 LP sát thương trực tiếp lên đối thủ hoặc rút 1 lá bài từ Bộ bài.",
    "scientificLore": "Phản ứng hóa học Phản Ứng Hòa Tan Vàng Bằng Cường Toan (Au + HNO₃ + 4HCl → HAuCl₄ + NO + 2H₂O) tuân thủ nghiêm ngặt định luật bảo toàn khối lượng và biến thiên enthalpy $\\Delta_r H^\\circ_{298}$ theo GDPT 2018.",
    "relatedEquation": "Au + HNO₃ + 4HCl → HAuCl₄ + NO + 2H₂O",
    "iupacName": "Gold Solvation Dissolution Protocol",
    "archetype": "GREEN_CHEMISTRY",
    "structuredEffects": [
      {
        "effectId": "B15_EFF_50",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 400
            }
          },
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Gây 400 LP sát thương phản ứng hóa học và rút 1 lá bài."
      }
    ]
  },
  {
    "id": "card_b15_051_spell_complete_combustion_flash_51",
    "name": "Phản Ứng Đốt Cháy Hoàn Toàn (Phương Trình 6)",
    "name_en": "Complete Combustion Flash (Equation 6)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "NORMAL_SPELL",
    "spellSpeed": 1,
    "rarity": "SUPER_RARE",
    "attribute": "PYRO",
    "manaCost": 1,
    "chemicalFormula": "C_x H_y + O2",
    "effectCode": "SPELL_B15_COMPLETE_COMBUSTION_FLASH_ACT_51",
    "effectText": "[Phép Phản Ứng Thường]: Kích hoạt hiệu ứng nhiệt/điện hóa: Gây 500 LP sát thương trực tiếp lên đối thủ hoặc rút 1 lá bài từ Bộ bài.",
    "scientificLore": "Phản ứng hóa học Phản Ứng Đốt Cháy Hoàn Toàn (C_x H_y + (x+y/4)O₂ → xCO₂ + (y/2)H₂O) tuân thủ nghiêm ngặt định luật bảo toàn khối lượng và biến thiên enthalpy $\\Delta_r H^\\circ_{298}$ theo GDPT 2018.",
    "relatedEquation": "C_x H_y + (x+y/4)O₂ → xCO₂ + (y/2)H₂O",
    "iupacName": "Complete Combustion Flash Protocol",
    "archetype": "FREE_RADICAL_CASCADE",
    "structuredEffects": [
      {
        "effectId": "B15_EFF_51",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 400
            }
          },
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Gây 400 LP sát thương phản ứng hóa học và rút 1 lá bài."
      }
    ]
  },
  {
    "id": "card_b15_052_spell_acid_base_neutralization_burst_52",
    "name": "Phản Ứng Trung Hòa Chuẩn Độ (Phương Trình 6)",
    "name_en": "Acid-Base Neutralization Burst (Equation 6)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "NORMAL_SPELL",
    "spellSpeed": 1,
    "rarity": "SUPER_RARE",
    "attribute": "AQUA",
    "manaCost": 2,
    "chemicalFormula": "H+ + OH-",
    "effectCode": "SPELL_B15_ACID_BASE_NEUTRALIZATION_BURST_ACT_52",
    "effectText": "[Phép Phản Ứng Thường]: Kích hoạt hiệu ứng nhiệt/điện hóa: Gây 600 LP sát thương trực tiếp lên đối thủ hoặc rút 1 lá bài từ Bộ bài.",
    "scientificLore": "Phản ứng hóa học Phản Ứng Trung Hòa Chuẩn Độ (H⁺(aq) + OH⁻(aq) → H₂O(l) (ΔH = -57.3 kJ/mol)) tuân thủ nghiêm ngặt định luật bảo toàn khối lượng và biến thiên enthalpy $\\Delta_r H^\\circ_{298}$ theo GDPT 2018.",
    "relatedEquation": "H⁺(aq) + OH⁻(aq) → H₂O(l) (ΔH = -57.3 kJ/mol)",
    "iupacName": "Acid-Base Neutralization Burst Protocol",
    "archetype": "REDOX_CASCADE",
    "structuredEffects": [
      {
        "effectId": "B15_EFF_52",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 400
            }
          },
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Gây 400 LP sát thương phản ứng hóa học và rút 1 lá bài."
      }
    ]
  },
  {
    "id": "card_b15_053_spell_galvanic_redox_discharge_53",
    "name": "Phản Ứng Oxi Hóa Khử Pin Galvanic (Phương Trình 6)",
    "name_en": "Galvanic Redox Discharge (Equation 6)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "NORMAL_SPELL",
    "spellSpeed": 1,
    "rarity": "ULTRA_RARE",
    "attribute": "ELECTRO",
    "manaCost": 3,
    "chemicalFormula": "Zn + Cu2+",
    "effectCode": "SPELL_B15_GALVANIC_REDOX_DISCHARGE_ACT_53",
    "effectText": "[Phép Phản Ứng Thường]: Kích hoạt hiệu ứng nhiệt/điện hóa: Gây 300 LP sát thương trực tiếp lên đối thủ hoặc rút 1 lá bài từ Bộ bài.",
    "scientificLore": "Phản ứng hóa học Phản Ứng Oxi Hóa Khử Pin Galvanic (Zn(s) + Cu²⁺(aq) → Zn²⁺(aq) + Cu(s) (E° = +1.10V)) tuân thủ nghiêm ngặt định luật bảo toàn khối lượng và biến thiên enthalpy $\\Delta_r H^\\circ_{298}$ theo GDPT 2018.",
    "relatedEquation": "Zn(s) + Cu²⁺(aq) → Zn²⁺(aq) + Cu(s) (E° = +1.10V)",
    "iupacName": "Galvanic Redox Discharge Protocol",
    "archetype": "GREEN_CHEMISTRY",
    "structuredEffects": [
      {
        "effectId": "B15_EFF_53",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 400
            }
          },
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Gây 400 LP sát thương phản ứng hóa học và rút 1 lá bài."
      }
    ]
  },
  {
    "id": "card_b15_054_spell_photochemical_halogenation_54",
    "name": "Phản Ứng Thế Halogen Ánh Sáng (Phương Trình 6)",
    "name_en": "Photochemical Halogenation (Equation 6)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "NORMAL_SPELL",
    "spellSpeed": 1,
    "rarity": "SECRET_RARE",
    "attribute": "AERO",
    "manaCost": 4,
    "chemicalFormula": "CH4 + Cl2",
    "effectCode": "SPELL_B15_PHOTOCHEMICAL_HALOGENATION_ACT_54",
    "effectText": "[Phép Phản Ứng Thường]: Kích hoạt hiệu ứng nhiệt/điện hóa: Gây 400 LP sát thương trực tiếp lên đối thủ hoặc rút 1 lá bài từ Bộ bài.",
    "scientificLore": "Phản ứng hóa học Phản Ứng Thế Halogen Ánh Sáng (CH₄ + Cl₂ --hν--> CH₃Cl + HCl) tuân thủ nghiêm ngặt định luật bảo toàn khối lượng và biến thiên enthalpy $\\Delta_r H^\\circ_{298}$ theo GDPT 2018.",
    "relatedEquation": "CH₄ + Cl₂ --hν--> CH₃Cl + HCl",
    "iupacName": "Photochemical Halogenation Protocol",
    "archetype": "FREE_RADICAL_CASCADE",
    "structuredEffects": [
      {
        "effectId": "B15_EFF_54",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 400
            }
          },
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Gây 400 LP sát thương phản ứng hóa học và rút 1 lá bài."
      }
    ]
  },
  {
    "id": "card_b15_055_spell_alcohol_acid_dehydration_55",
    "name": "Phản Ứng Tách Nước Khử Ancol (Phương Trình 6)",
    "name_en": "Alcohol Acid Dehydration (Equation 6)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "NORMAL_SPELL",
    "spellSpeed": 1,
    "rarity": "COMMON",
    "attribute": "TERRA",
    "manaCost": 5,
    "chemicalFormula": "C2H5OH",
    "effectCode": "SPELL_B15_ALCOHOL_ACID_DEHYDRATION_ACT_55",
    "effectText": "[Phép Phản Ứng Thường]: Kích hoạt hiệu ứng nhiệt/điện hóa: Gây 500 LP sát thương trực tiếp lên đối thủ hoặc rút 1 lá bài từ Bộ bài.",
    "scientificLore": "Phản ứng hóa học Phản Ứng Tách Nước Khử Ancol (C₂H₅OH --H₂SO₄/170°C--> C₂H₄ + H₂O) tuân thủ nghiêm ngặt định luật bảo toàn khối lượng và biến thiên enthalpy $\\Delta_r H^\\circ_{298}$ theo GDPT 2018.",
    "relatedEquation": "C₂H₅OH --H₂SO₄/170°C--> C₂H₄ + H₂O",
    "iupacName": "Alcohol Acid Dehydration Protocol",
    "archetype": "REDOX_CASCADE",
    "structuredEffects": [
      {
        "effectId": "B15_EFF_55",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 400
            }
          },
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Gây 400 LP sát thương phản ứng hóa học và rút 1 lá bài."
      }
    ]
  },
  {
    "id": "card_b15_056_spell_fischer_esterification_synthesis_56",
    "name": "Phản Ứng Este Hóa Fischer (Phương Trình 6)",
    "name_en": "Fischer Esterification Synthesis (Equation 6)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "NORMAL_SPELL",
    "spellSpeed": 1,
    "rarity": "COMMON",
    "attribute": "AQUA",
    "manaCost": 1,
    "chemicalFormula": "RCOOH + R'OH",
    "effectCode": "SPELL_B15_FISCHER_ESTERIFICATION_SYNTHESIS_ACT_56",
    "effectText": "[Phép Phản Ứng Thường]: Kích hoạt hiệu ứng nhiệt/điện hóa: Gây 600 LP sát thương trực tiếp lên đối thủ hoặc rút 1 lá bài từ Bộ bài.",
    "scientificLore": "Phản ứng hóa học Phản Ứng Este Hóa Fischer (RCOOH + R'OH ⇌ RCOOR' + H₂O) tuân thủ nghiêm ngặt định luật bảo toàn khối lượng và biến thiên enthalpy $\\Delta_r H^\\circ_{298}$ theo GDPT 2018.",
    "relatedEquation": "RCOOH + R'OH ⇌ RCOOR' + H₂O",
    "iupacName": "Fischer Esterification Synthesis Protocol",
    "archetype": "GREEN_CHEMISTRY",
    "structuredEffects": [
      {
        "effectId": "B15_EFF_56",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 400
            }
          },
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Gây 400 LP sát thương phản ứng hóa học và rút 1 lá bài."
      }
    ]
  },
  {
    "id": "card_b15_057_spell_silver_mirror_tollens_reduction_57",
    "name": "Phản Ứng Tráng Bạc Glucozo (Phương Trình 6)",
    "name_en": "Silver Mirror Tollens Reduction (Equation 6)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "NORMAL_SPELL",
    "spellSpeed": 1,
    "rarity": "COMMON",
    "attribute": "NOBLE_VOID",
    "manaCost": 2,
    "chemicalFormula": "C6H12O6 + Ag+",
    "effectCode": "SPELL_B15_SILVER_MIRROR_TOLLENS_REDUCTION_ACT_57",
    "effectText": "[Phép Phản Ứng Thường]: Kích hoạt hiệu ứng nhiệt/điện hóa: Gây 300 LP sát thương trực tiếp lên đối thủ hoặc rút 1 lá bài từ Bộ bài.",
    "scientificLore": "Phản ứng hóa học Phản Ứng Tráng Bạc Glucozo (C₆H₁₂O₆ + 2[Ag(NH₃)₂]OH → C₆H₁₂O₇ + 2Ag↓ + 4NH₃ + H₂O) tuân thủ nghiêm ngặt định luật bảo toàn khối lượng và biến thiên enthalpy $\\Delta_r H^\\circ_{298}$ theo GDPT 2018.",
    "relatedEquation": "C₆H₁₂O₆ + 2[Ag(NH₃)₂]OH → C₆H₁₂O₇ + 2Ag↓ + 4NH₃ + H₂O",
    "iupacName": "Silver Mirror Tollens Reduction Protocol",
    "archetype": "FREE_RADICAL_CASCADE",
    "structuredEffects": [
      {
        "effectId": "B15_EFF_57",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 400
            }
          },
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Gây 400 LP sát thương phản ứng hóa học và rút 1 lá bài."
      }
    ]
  },
  {
    "id": "card_b15_058_spell_limestone_calcination_thermal_decomposition_58",
    "name": "Phản Ứng Nhiệt Phân Đá Vôi (Phương Trình 6)",
    "name_en": "Limestone Calcination Thermal Decomposition (Equation 6)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "NORMAL_SPELL",
    "spellSpeed": 1,
    "rarity": "RARE",
    "attribute": "TERRA",
    "manaCost": 3,
    "chemicalFormula": "CaCO3",
    "effectCode": "SPELL_B15_LIMESTONE_CALCINATION_THERMAL_DECOMPOSITION_ACT_58",
    "effectText": "[Phép Phản Ứng Thường]: Kích hoạt hiệu ứng nhiệt/điện hóa: Gây 400 LP sát thương trực tiếp lên đối thủ hoặc rút 1 lá bài từ Bộ bài.",
    "scientificLore": "Phản ứng hóa học Phản Ứng Nhiệt Phân Đá Vôi (CaCO₃ --1000°C--> CaO + CO₂↑) tuân thủ nghiêm ngặt định luật bảo toàn khối lượng và biến thiên enthalpy $\\Delta_r H^\\circ_{298}$ theo GDPT 2018.",
    "relatedEquation": "CaCO₃ --1000°C--> CaO + CO₂↑",
    "iupacName": "Limestone Calcination Thermal Decomposition Protocol",
    "archetype": "REDOX_CASCADE",
    "structuredEffects": [
      {
        "effectId": "B15_EFF_58",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 400
            }
          },
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Gây 400 LP sát thương phản ứng hóa học và rút 1 lá bài."
      }
    ]
  },
  {
    "id": "card_b15_059_spell_aluminum_cation_hydrolysis_acidification_59",
    "name": "Phản Ứng Thủy Phân Muối Nhôm (Phương Trình 6)",
    "name_en": "Aluminum Cation Hydrolysis Acidification (Equation 6)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "NORMAL_SPELL",
    "spellSpeed": 1,
    "rarity": "RARE",
    "attribute": "ACID_DARK",
    "manaCost": 4,
    "chemicalFormula": "Al3+ + 3H2O",
    "effectCode": "SPELL_B15_ALUMINUM_CATION_HYDROLYSIS_ACIDIFICATION_ACT_59",
    "effectText": "[Phép Phản Ứng Thường]: Kích hoạt hiệu ứng nhiệt/điện hóa: Gây 500 LP sát thương trực tiếp lên đối thủ hoặc rút 1 lá bài từ Bộ bài.",
    "scientificLore": "Phản ứng hóa học Phản Ứng Thủy Phân Muối Nhôm (Al³⁺ + 3H₂O ⇌ Al(OH)₃↓ + 3H⁺) tuân thủ nghiêm ngặt định luật bảo toàn khối lượng và biến thiên enthalpy $\\Delta_r H^\\circ_{298}$ theo GDPT 2018.",
    "relatedEquation": "Al³⁺ + 3H₂O ⇌ Al(OH)₃↓ + 3H⁺",
    "iupacName": "Aluminum Cation Hydrolysis Acidification Protocol",
    "archetype": "GREEN_CHEMISTRY",
    "structuredEffects": [
      {
        "effectId": "B15_EFF_59",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 400
            }
          },
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Gây 400 LP sát thương phản ứng hóa học và rút 1 lá bài."
      }
    ]
  },
  {
    "id": "card_b15_060_spell_gold_solvation_dissolution_60",
    "name": "Phản Ứng Hòa Tan Vàng Bằng Cường Toan (Phương Trình 6)",
    "name_en": "Gold Solvation Dissolution (Equation 6)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "NORMAL_SPELL",
    "spellSpeed": 1,
    "rarity": "SUPER_RARE",
    "attribute": "ACID_DARK",
    "manaCost": 5,
    "chemicalFormula": "Au + HNO3 + 4HCl",
    "effectCode": "SPELL_B15_GOLD_SOLVATION_DISSOLUTION_ACT_60",
    "effectText": "[Phép Phản Ứng Thường]: Kích hoạt hiệu ứng nhiệt/điện hóa: Gây 600 LP sát thương trực tiếp lên đối thủ hoặc rút 1 lá bài từ Bộ bài.",
    "scientificLore": "Phản ứng hóa học Phản Ứng Hòa Tan Vàng Bằng Cường Toan (Au + HNO₃ + 4HCl → HAuCl₄ + NO + 2H₂O) tuân thủ nghiêm ngặt định luật bảo toàn khối lượng và biến thiên enthalpy $\\Delta_r H^\\circ_{298}$ theo GDPT 2018.",
    "relatedEquation": "Au + HNO₃ + 4HCl → HAuCl₄ + NO + 2H₂O",
    "iupacName": "Gold Solvation Dissolution Protocol",
    "archetype": "FREE_RADICAL_CASCADE",
    "structuredEffects": [
      {
        "effectId": "B15_EFF_60",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 400
            }
          },
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Gây 400 LP sát thương phản ứng hóa học và rút 1 lá bài."
      }
    ]
  },
  {
    "id": "card_b15_061_spell_complete_combustion_flash_61",
    "name": "Phản Ứng Đốt Cháy Hoàn Toàn (Phương Trình 7)",
    "name_en": "Complete Combustion Flash (Equation 7)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "NORMAL_SPELL",
    "spellSpeed": 1,
    "rarity": "SUPER_RARE",
    "attribute": "PYRO",
    "manaCost": 1,
    "chemicalFormula": "C_x H_y + O2",
    "effectCode": "SPELL_B15_COMPLETE_COMBUSTION_FLASH_ACT_61",
    "effectText": "[Phép Phản Ứng Thường]: Kích hoạt hiệu ứng nhiệt/điện hóa: Gây 300 LP sát thương trực tiếp lên đối thủ hoặc rút 1 lá bài từ Bộ bài.",
    "scientificLore": "Phản ứng hóa học Phản Ứng Đốt Cháy Hoàn Toàn (C_x H_y + (x+y/4)O₂ → xCO₂ + (y/2)H₂O) tuân thủ nghiêm ngặt định luật bảo toàn khối lượng và biến thiên enthalpy $\\Delta_r H^\\circ_{298}$ theo GDPT 2018.",
    "relatedEquation": "C_x H_y + (x+y/4)O₂ → xCO₂ + (y/2)H₂O",
    "iupacName": "Complete Combustion Flash Protocol",
    "archetype": "REDOX_CASCADE",
    "structuredEffects": [
      {
        "effectId": "B15_EFF_61",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 400
            }
          },
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Gây 400 LP sát thương phản ứng hóa học và rút 1 lá bài."
      }
    ]
  },
  {
    "id": "card_b15_062_spell_acid_base_neutralization_burst_62",
    "name": "Phản Ứng Trung Hòa Chuẩn Độ (Phương Trình 7)",
    "name_en": "Acid-Base Neutralization Burst (Equation 7)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "NORMAL_SPELL",
    "spellSpeed": 1,
    "rarity": "ULTRA_RARE",
    "attribute": "AQUA",
    "manaCost": 2,
    "chemicalFormula": "H+ + OH-",
    "effectCode": "SPELL_B15_ACID_BASE_NEUTRALIZATION_BURST_ACT_62",
    "effectText": "[Phép Phản Ứng Thường]: Kích hoạt hiệu ứng nhiệt/điện hóa: Gây 400 LP sát thương trực tiếp lên đối thủ hoặc rút 1 lá bài từ Bộ bài.",
    "scientificLore": "Phản ứng hóa học Phản Ứng Trung Hòa Chuẩn Độ (H⁺(aq) + OH⁻(aq) → H₂O(l) (ΔH = -57.3 kJ/mol)) tuân thủ nghiêm ngặt định luật bảo toàn khối lượng và biến thiên enthalpy $\\Delta_r H^\\circ_{298}$ theo GDPT 2018.",
    "relatedEquation": "H⁺(aq) + OH⁻(aq) → H₂O(l) (ΔH = -57.3 kJ/mol)",
    "iupacName": "Acid-Base Neutralization Burst Protocol",
    "archetype": "GREEN_CHEMISTRY",
    "structuredEffects": [
      {
        "effectId": "B15_EFF_62",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 400
            }
          },
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Gây 400 LP sát thương phản ứng hóa học và rút 1 lá bài."
      }
    ]
  },
  {
    "id": "card_b15_063_spell_galvanic_redox_discharge_63",
    "name": "Phản Ứng Oxi Hóa Khử Pin Galvanic (Phương Trình 7)",
    "name_en": "Galvanic Redox Discharge (Equation 7)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "NORMAL_SPELL",
    "spellSpeed": 1,
    "rarity": "SECRET_RARE",
    "attribute": "ELECTRO",
    "manaCost": 3,
    "chemicalFormula": "Zn + Cu2+",
    "effectCode": "SPELL_B15_GALVANIC_REDOX_DISCHARGE_ACT_63",
    "effectText": "[Phép Phản Ứng Thường]: Kích hoạt hiệu ứng nhiệt/điện hóa: Gây 500 LP sát thương trực tiếp lên đối thủ hoặc rút 1 lá bài từ Bộ bài.",
    "scientificLore": "Phản ứng hóa học Phản Ứng Oxi Hóa Khử Pin Galvanic (Zn(s) + Cu²⁺(aq) → Zn²⁺(aq) + Cu(s) (E° = +1.10V)) tuân thủ nghiêm ngặt định luật bảo toàn khối lượng và biến thiên enthalpy $\\Delta_r H^\\circ_{298}$ theo GDPT 2018.",
    "relatedEquation": "Zn(s) + Cu²⁺(aq) → Zn²⁺(aq) + Cu(s) (E° = +1.10V)",
    "iupacName": "Galvanic Redox Discharge Protocol",
    "archetype": "FREE_RADICAL_CASCADE",
    "structuredEffects": [
      {
        "effectId": "B15_EFF_63",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 400
            }
          },
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Gây 400 LP sát thương phản ứng hóa học và rút 1 lá bài."
      }
    ]
  },
  {
    "id": "card_b15_064_spell_photochemical_halogenation_64",
    "name": "Phản Ứng Thế Halogen Ánh Sáng (Phương Trình 7)",
    "name_en": "Photochemical Halogenation (Equation 7)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "NORMAL_SPELL",
    "spellSpeed": 1,
    "rarity": "COMMON",
    "attribute": "AERO",
    "manaCost": 4,
    "chemicalFormula": "CH4 + Cl2",
    "effectCode": "SPELL_B15_PHOTOCHEMICAL_HALOGENATION_ACT_64",
    "effectText": "[Phép Phản Ứng Thường]: Kích hoạt hiệu ứng nhiệt/điện hóa: Gây 600 LP sát thương trực tiếp lên đối thủ hoặc rút 1 lá bài từ Bộ bài.",
    "scientificLore": "Phản ứng hóa học Phản Ứng Thế Halogen Ánh Sáng (CH₄ + Cl₂ --hν--> CH₃Cl + HCl) tuân thủ nghiêm ngặt định luật bảo toàn khối lượng và biến thiên enthalpy $\\Delta_r H^\\circ_{298}$ theo GDPT 2018.",
    "relatedEquation": "CH₄ + Cl₂ --hν--> CH₃Cl + HCl",
    "iupacName": "Photochemical Halogenation Protocol",
    "archetype": "REDOX_CASCADE",
    "structuredEffects": [
      {
        "effectId": "B15_EFF_64",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 400
            }
          },
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Gây 400 LP sát thương phản ứng hóa học và rút 1 lá bài."
      }
    ]
  },
  {
    "id": "card_b15_065_spell_alcohol_acid_dehydration_65",
    "name": "Phản Ứng Tách Nước Khử Ancol (Phương Trình 7)",
    "name_en": "Alcohol Acid Dehydration (Equation 7)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "NORMAL_SPELL",
    "spellSpeed": 1,
    "rarity": "COMMON",
    "attribute": "TERRA",
    "manaCost": 5,
    "chemicalFormula": "C2H5OH",
    "effectCode": "SPELL_B15_ALCOHOL_ACID_DEHYDRATION_ACT_65",
    "effectText": "[Phép Phản Ứng Thường]: Kích hoạt hiệu ứng nhiệt/điện hóa: Gây 300 LP sát thương trực tiếp lên đối thủ hoặc rút 1 lá bài từ Bộ bài.",
    "scientificLore": "Phản ứng hóa học Phản Ứng Tách Nước Khử Ancol (C₂H₅OH --H₂SO₄/170°C--> C₂H₄ + H₂O) tuân thủ nghiêm ngặt định luật bảo toàn khối lượng và biến thiên enthalpy $\\Delta_r H^\\circ_{298}$ theo GDPT 2018.",
    "relatedEquation": "C₂H₅OH --H₂SO₄/170°C--> C₂H₄ + H₂O",
    "iupacName": "Alcohol Acid Dehydration Protocol",
    "archetype": "GREEN_CHEMISTRY",
    "structuredEffects": [
      {
        "effectId": "B15_EFF_65",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 400
            }
          },
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Gây 400 LP sát thương phản ứng hóa học và rút 1 lá bài."
      }
    ]
  },
  {
    "id": "card_b15_066_spell_fischer_esterification_synthesis_66",
    "name": "Phản Ứng Este Hóa Fischer (Phương Trình 7)",
    "name_en": "Fischer Esterification Synthesis (Equation 7)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "NORMAL_SPELL",
    "spellSpeed": 1,
    "rarity": "COMMON",
    "attribute": "AQUA",
    "manaCost": 1,
    "chemicalFormula": "RCOOH + R'OH",
    "effectCode": "SPELL_B15_FISCHER_ESTERIFICATION_SYNTHESIS_ACT_66",
    "effectText": "[Phép Phản Ứng Thường]: Kích hoạt hiệu ứng nhiệt/điện hóa: Gây 400 LP sát thương trực tiếp lên đối thủ hoặc rút 1 lá bài từ Bộ bài.",
    "scientificLore": "Phản ứng hóa học Phản Ứng Este Hóa Fischer (RCOOH + R'OH ⇌ RCOOR' + H₂O) tuân thủ nghiêm ngặt định luật bảo toàn khối lượng và biến thiên enthalpy $\\Delta_r H^\\circ_{298}$ theo GDPT 2018.",
    "relatedEquation": "RCOOH + R'OH ⇌ RCOOR' + H₂O",
    "iupacName": "Fischer Esterification Synthesis Protocol",
    "archetype": "FREE_RADICAL_CASCADE",
    "structuredEffects": [
      {
        "effectId": "B15_EFF_66",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 400
            }
          },
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Gây 400 LP sát thương phản ứng hóa học và rút 1 lá bài."
      }
    ]
  },
  {
    "id": "card_b15_067_spell_silver_mirror_tollens_reduction_67",
    "name": "Phản Ứng Tráng Bạc Glucozo (Phương Trình 7)",
    "name_en": "Silver Mirror Tollens Reduction (Equation 7)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "NORMAL_SPELL",
    "spellSpeed": 1,
    "rarity": "RARE",
    "attribute": "NOBLE_VOID",
    "manaCost": 2,
    "chemicalFormula": "C6H12O6 + Ag+",
    "effectCode": "SPELL_B15_SILVER_MIRROR_TOLLENS_REDUCTION_ACT_67",
    "effectText": "[Phép Phản Ứng Thường]: Kích hoạt hiệu ứng nhiệt/điện hóa: Gây 500 LP sát thương trực tiếp lên đối thủ hoặc rút 1 lá bài từ Bộ bài.",
    "scientificLore": "Phản ứng hóa học Phản Ứng Tráng Bạc Glucozo (C₆H₁₂O₆ + 2[Ag(NH₃)₂]OH → C₆H₁₂O₇ + 2Ag↓ + 4NH₃ + H₂O) tuân thủ nghiêm ngặt định luật bảo toàn khối lượng và biến thiên enthalpy $\\Delta_r H^\\circ_{298}$ theo GDPT 2018.",
    "relatedEquation": "C₆H₁₂O₆ + 2[Ag(NH₃)₂]OH → C₆H₁₂O₇ + 2Ag↓ + 4NH₃ + H₂O",
    "iupacName": "Silver Mirror Tollens Reduction Protocol",
    "archetype": "REDOX_CASCADE",
    "structuredEffects": [
      {
        "effectId": "B15_EFF_67",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 400
            }
          },
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Gây 400 LP sát thương phản ứng hóa học và rút 1 lá bài."
      }
    ]
  },
  {
    "id": "card_b15_068_spell_limestone_calcination_thermal_decomposition_68",
    "name": "Phản Ứng Nhiệt Phân Đá Vôi (Phương Trình 7)",
    "name_en": "Limestone Calcination Thermal Decomposition (Equation 7)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "NORMAL_SPELL",
    "spellSpeed": 1,
    "rarity": "RARE",
    "attribute": "TERRA",
    "manaCost": 3,
    "chemicalFormula": "CaCO3",
    "effectCode": "SPELL_B15_LIMESTONE_CALCINATION_THERMAL_DECOMPOSITION_ACT_68",
    "effectText": "[Phép Phản Ứng Thường]: Kích hoạt hiệu ứng nhiệt/điện hóa: Gây 600 LP sát thương trực tiếp lên đối thủ hoặc rút 1 lá bài từ Bộ bài.",
    "scientificLore": "Phản ứng hóa học Phản Ứng Nhiệt Phân Đá Vôi (CaCO₃ --1000°C--> CaO + CO₂↑) tuân thủ nghiêm ngặt định luật bảo toàn khối lượng và biến thiên enthalpy $\\Delta_r H^\\circ_{298}$ theo GDPT 2018.",
    "relatedEquation": "CaCO₃ --1000°C--> CaO + CO₂↑",
    "iupacName": "Limestone Calcination Thermal Decomposition Protocol",
    "archetype": "GREEN_CHEMISTRY",
    "structuredEffects": [
      {
        "effectId": "B15_EFF_68",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 400
            }
          },
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Gây 400 LP sát thương phản ứng hóa học và rút 1 lá bài."
      }
    ]
  },
  {
    "id": "card_b15_069_spell_aluminum_cation_hydrolysis_acidification_69",
    "name": "Phản Ứng Thủy Phân Muối Nhôm (Phương Trình 7)",
    "name_en": "Aluminum Cation Hydrolysis Acidification (Equation 7)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "NORMAL_SPELL",
    "spellSpeed": 1,
    "rarity": "SUPER_RARE",
    "attribute": "ACID_DARK",
    "manaCost": 4,
    "chemicalFormula": "Al3+ + 3H2O",
    "effectCode": "SPELL_B15_ALUMINUM_CATION_HYDROLYSIS_ACIDIFICATION_ACT_69",
    "effectText": "[Phép Phản Ứng Thường]: Kích hoạt hiệu ứng nhiệt/điện hóa: Gây 300 LP sát thương trực tiếp lên đối thủ hoặc rút 1 lá bài từ Bộ bài.",
    "scientificLore": "Phản ứng hóa học Phản Ứng Thủy Phân Muối Nhôm (Al³⁺ + 3H₂O ⇌ Al(OH)₃↓ + 3H⁺) tuân thủ nghiêm ngặt định luật bảo toàn khối lượng và biến thiên enthalpy $\\Delta_r H^\\circ_{298}$ theo GDPT 2018.",
    "relatedEquation": "Al³⁺ + 3H₂O ⇌ Al(OH)₃↓ + 3H⁺",
    "iupacName": "Aluminum Cation Hydrolysis Acidification Protocol",
    "archetype": "FREE_RADICAL_CASCADE",
    "structuredEffects": [
      {
        "effectId": "B15_EFF_69",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 400
            }
          },
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Gây 400 LP sát thương phản ứng hóa học và rút 1 lá bài."
      }
    ]
  },
  {
    "id": "card_b15_070_spell_gold_solvation_dissolution_70",
    "name": "Phản Ứng Hòa Tan Vàng Bằng Cường Toan (Phương Trình 7)",
    "name_en": "Gold Solvation Dissolution (Equation 7)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "NORMAL_SPELL",
    "spellSpeed": 1,
    "rarity": "SUPER_RARE",
    "attribute": "ACID_DARK",
    "manaCost": 5,
    "chemicalFormula": "Au + HNO3 + 4HCl",
    "effectCode": "SPELL_B15_GOLD_SOLVATION_DISSOLUTION_ACT_70",
    "effectText": "[Phép Phản Ứng Thường]: Kích hoạt hiệu ứng nhiệt/điện hóa: Gây 400 LP sát thương trực tiếp lên đối thủ hoặc rút 1 lá bài từ Bộ bài.",
    "scientificLore": "Phản ứng hóa học Phản Ứng Hòa Tan Vàng Bằng Cường Toan (Au + HNO₃ + 4HCl → HAuCl₄ + NO + 2H₂O) tuân thủ nghiêm ngặt định luật bảo toàn khối lượng và biến thiên enthalpy $\\Delta_r H^\\circ_{298}$ theo GDPT 2018.",
    "relatedEquation": "Au + HNO₃ + 4HCl → HAuCl₄ + NO + 2H₂O",
    "iupacName": "Gold Solvation Dissolution Protocol",
    "archetype": "REDOX_CASCADE",
    "structuredEffects": [
      {
        "effectId": "B15_EFF_70",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 400
            }
          },
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Gây 400 LP sát thương phản ứng hóa học và rút 1 lá bài."
      }
    ]
  },
  {
    "id": "card_b15_071_spell_complete_combustion_flash_71",
    "name": "Phản Ứng Đốt Cháy Hoàn Toàn (Phương Trình 8)",
    "name_en": "Complete Combustion Flash (Equation 8)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "NORMAL_SPELL",
    "spellSpeed": 1,
    "rarity": "ULTRA_RARE",
    "attribute": "PYRO",
    "manaCost": 1,
    "chemicalFormula": "C_x H_y + O2",
    "effectCode": "SPELL_B15_COMPLETE_COMBUSTION_FLASH_ACT_71",
    "effectText": "[Phép Phản Ứng Thường]: Kích hoạt hiệu ứng nhiệt/điện hóa: Gây 500 LP sát thương trực tiếp lên đối thủ hoặc rút 1 lá bài từ Bộ bài.",
    "scientificLore": "Phản ứng hóa học Phản Ứng Đốt Cháy Hoàn Toàn (C_x H_y + (x+y/4)O₂ → xCO₂ + (y/2)H₂O) tuân thủ nghiêm ngặt định luật bảo toàn khối lượng và biến thiên enthalpy $\\Delta_r H^\\circ_{298}$ theo GDPT 2018.",
    "relatedEquation": "C_x H_y + (x+y/4)O₂ → xCO₂ + (y/2)H₂O",
    "iupacName": "Complete Combustion Flash Protocol",
    "archetype": "GREEN_CHEMISTRY",
    "structuredEffects": [
      {
        "effectId": "B15_EFF_71",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 400
            }
          },
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Gây 400 LP sát thương phản ứng hóa học và rút 1 lá bài."
      }
    ]
  },
  {
    "id": "card_b15_072_spell_acid_base_neutralization_burst_72",
    "name": "Phản Ứng Trung Hòa Chuẩn Độ (Phương Trình 8)",
    "name_en": "Acid-Base Neutralization Burst (Equation 8)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "NORMAL_SPELL",
    "spellSpeed": 1,
    "rarity": "SECRET_RARE",
    "attribute": "AQUA",
    "manaCost": 2,
    "chemicalFormula": "H+ + OH-",
    "effectCode": "SPELL_B15_ACID_BASE_NEUTRALIZATION_BURST_ACT_72",
    "effectText": "[Phép Phản Ứng Thường]: Kích hoạt hiệu ứng nhiệt/điện hóa: Gây 600 LP sát thương trực tiếp lên đối thủ hoặc rút 1 lá bài từ Bộ bài.",
    "scientificLore": "Phản ứng hóa học Phản Ứng Trung Hòa Chuẩn Độ (H⁺(aq) + OH⁻(aq) → H₂O(l) (ΔH = -57.3 kJ/mol)) tuân thủ nghiêm ngặt định luật bảo toàn khối lượng và biến thiên enthalpy $\\Delta_r H^\\circ_{298}$ theo GDPT 2018.",
    "relatedEquation": "H⁺(aq) + OH⁻(aq) → H₂O(l) (ΔH = -57.3 kJ/mol)",
    "iupacName": "Acid-Base Neutralization Burst Protocol",
    "archetype": "FREE_RADICAL_CASCADE",
    "structuredEffects": [
      {
        "effectId": "B15_EFF_72",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 400
            }
          },
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Gây 400 LP sát thương phản ứng hóa học và rút 1 lá bài."
      }
    ]
  },
  {
    "id": "card_b15_073_spell_galvanic_redox_discharge_73",
    "name": "Phản Ứng Oxi Hóa Khử Pin Galvanic (Phương Trình 8)",
    "name_en": "Galvanic Redox Discharge (Equation 8)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "NORMAL_SPELL",
    "spellSpeed": 1,
    "rarity": "COMMON",
    "attribute": "ELECTRO",
    "manaCost": 3,
    "chemicalFormula": "Zn + Cu2+",
    "effectCode": "SPELL_B15_GALVANIC_REDOX_DISCHARGE_ACT_73",
    "effectText": "[Phép Phản Ứng Thường]: Kích hoạt hiệu ứng nhiệt/điện hóa: Gây 300 LP sát thương trực tiếp lên đối thủ hoặc rút 1 lá bài từ Bộ bài.",
    "scientificLore": "Phản ứng hóa học Phản Ứng Oxi Hóa Khử Pin Galvanic (Zn(s) + Cu²⁺(aq) → Zn²⁺(aq) + Cu(s) (E° = +1.10V)) tuân thủ nghiêm ngặt định luật bảo toàn khối lượng và biến thiên enthalpy $\\Delta_r H^\\circ_{298}$ theo GDPT 2018.",
    "relatedEquation": "Zn(s) + Cu²⁺(aq) → Zn²⁺(aq) + Cu(s) (E° = +1.10V)",
    "iupacName": "Galvanic Redox Discharge Protocol",
    "archetype": "REDOX_CASCADE",
    "structuredEffects": [
      {
        "effectId": "B15_EFF_73",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 400
            }
          },
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Gây 400 LP sát thương phản ứng hóa học và rút 1 lá bài."
      }
    ]
  },
  {
    "id": "card_b15_074_spell_photochemical_halogenation_74",
    "name": "Phản Ứng Thế Halogen Ánh Sáng (Phương Trình 8)",
    "name_en": "Photochemical Halogenation (Equation 8)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "NORMAL_SPELL",
    "spellSpeed": 1,
    "rarity": "COMMON",
    "attribute": "AERO",
    "manaCost": 4,
    "chemicalFormula": "CH4 + Cl2",
    "effectCode": "SPELL_B15_PHOTOCHEMICAL_HALOGENATION_ACT_74",
    "effectText": "[Phép Phản Ứng Thường]: Kích hoạt hiệu ứng nhiệt/điện hóa: Gây 400 LP sát thương trực tiếp lên đối thủ hoặc rút 1 lá bài từ Bộ bài.",
    "scientificLore": "Phản ứng hóa học Phản Ứng Thế Halogen Ánh Sáng (CH₄ + Cl₂ --hν--> CH₃Cl + HCl) tuân thủ nghiêm ngặt định luật bảo toàn khối lượng và biến thiên enthalpy $\\Delta_r H^\\circ_{298}$ theo GDPT 2018.",
    "relatedEquation": "CH₄ + Cl₂ --hν--> CH₃Cl + HCl",
    "iupacName": "Photochemical Halogenation Protocol",
    "archetype": "GREEN_CHEMISTRY",
    "structuredEffects": [
      {
        "effectId": "B15_EFF_74",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 400
            }
          },
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Gây 400 LP sát thương phản ứng hóa học và rút 1 lá bài."
      }
    ]
  },
  {
    "id": "card_b15_075_spell_alcohol_acid_dehydration_75",
    "name": "Phản Ứng Tách Nước Khử Ancol (Phương Trình 8)",
    "name_en": "Alcohol Acid Dehydration (Equation 8)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "NORMAL_SPELL",
    "spellSpeed": 1,
    "rarity": "COMMON",
    "attribute": "TERRA",
    "manaCost": 5,
    "chemicalFormula": "C2H5OH",
    "effectCode": "SPELL_B15_ALCOHOL_ACID_DEHYDRATION_ACT_75",
    "effectText": "[Phép Phản Ứng Thường]: Kích hoạt hiệu ứng nhiệt/điện hóa: Gây 500 LP sát thương trực tiếp lên đối thủ hoặc rút 1 lá bài từ Bộ bài.",
    "scientificLore": "Phản ứng hóa học Phản Ứng Tách Nước Khử Ancol (C₂H₅OH --H₂SO₄/170°C--> C₂H₄ + H₂O) tuân thủ nghiêm ngặt định luật bảo toàn khối lượng và biến thiên enthalpy $\\Delta_r H^\\circ_{298}$ theo GDPT 2018.",
    "relatedEquation": "C₂H₅OH --H₂SO₄/170°C--> C₂H₄ + H₂O",
    "iupacName": "Alcohol Acid Dehydration Protocol",
    "archetype": "FREE_RADICAL_CASCADE",
    "structuredEffects": [
      {
        "effectId": "B15_EFF_75",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 400
            }
          },
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Gây 400 LP sát thương phản ứng hóa học và rút 1 lá bài."
      }
    ]
  },
  {
    "id": "card_b15_076_spell_fischer_esterification_synthesis_76",
    "name": "Phản Ứng Este Hóa Fischer (Phương Trình 8)",
    "name_en": "Fischer Esterification Synthesis (Equation 8)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "NORMAL_SPELL",
    "spellSpeed": 1,
    "rarity": "RARE",
    "attribute": "AQUA",
    "manaCost": 1,
    "chemicalFormula": "RCOOH + R'OH",
    "effectCode": "SPELL_B15_FISCHER_ESTERIFICATION_SYNTHESIS_ACT_76",
    "effectText": "[Phép Phản Ứng Thường]: Kích hoạt hiệu ứng nhiệt/điện hóa: Gây 600 LP sát thương trực tiếp lên đối thủ hoặc rút 1 lá bài từ Bộ bài.",
    "scientificLore": "Phản ứng hóa học Phản Ứng Este Hóa Fischer (RCOOH + R'OH ⇌ RCOOR' + H₂O) tuân thủ nghiêm ngặt định luật bảo toàn khối lượng và biến thiên enthalpy $\\Delta_r H^\\circ_{298}$ theo GDPT 2018.",
    "relatedEquation": "RCOOH + R'OH ⇌ RCOOR' + H₂O",
    "iupacName": "Fischer Esterification Synthesis Protocol",
    "archetype": "REDOX_CASCADE",
    "structuredEffects": [
      {
        "effectId": "B15_EFF_76",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 400
            }
          },
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Gây 400 LP sát thương phản ứng hóa học và rút 1 lá bài."
      }
    ]
  },
  {
    "id": "card_b15_077_spell_silver_mirror_tollens_reduction_77",
    "name": "Phản Ứng Tráng Bạc Glucozo (Phương Trình 8)",
    "name_en": "Silver Mirror Tollens Reduction (Equation 8)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "NORMAL_SPELL",
    "spellSpeed": 1,
    "rarity": "RARE",
    "attribute": "NOBLE_VOID",
    "manaCost": 2,
    "chemicalFormula": "C6H12O6 + Ag+",
    "effectCode": "SPELL_B15_SILVER_MIRROR_TOLLENS_REDUCTION_ACT_77",
    "effectText": "[Phép Phản Ứng Thường]: Kích hoạt hiệu ứng nhiệt/điện hóa: Gây 300 LP sát thương trực tiếp lên đối thủ hoặc rút 1 lá bài từ Bộ bài.",
    "scientificLore": "Phản ứng hóa học Phản Ứng Tráng Bạc Glucozo (C₆H₁₂O₆ + 2[Ag(NH₃)₂]OH → C₆H₁₂O₇ + 2Ag↓ + 4NH₃ + H₂O) tuân thủ nghiêm ngặt định luật bảo toàn khối lượng và biến thiên enthalpy $\\Delta_r H^\\circ_{298}$ theo GDPT 2018.",
    "relatedEquation": "C₆H₁₂O₆ + 2[Ag(NH₃)₂]OH → C₆H₁₂O₇ + 2Ag↓ + 4NH₃ + H₂O",
    "iupacName": "Silver Mirror Tollens Reduction Protocol",
    "archetype": "GREEN_CHEMISTRY",
    "structuredEffects": [
      {
        "effectId": "B15_EFF_77",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 400
            }
          },
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Gây 400 LP sát thương phản ứng hóa học và rút 1 lá bài."
      }
    ]
  },
  {
    "id": "card_b15_078_spell_limestone_calcination_thermal_decomposition_78",
    "name": "Phản Ứng Nhiệt Phân Đá Vôi (Phương Trình 8)",
    "name_en": "Limestone Calcination Thermal Decomposition (Equation 8)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "NORMAL_SPELL",
    "spellSpeed": 1,
    "rarity": "SUPER_RARE",
    "attribute": "TERRA",
    "manaCost": 3,
    "chemicalFormula": "CaCO3",
    "effectCode": "SPELL_B15_LIMESTONE_CALCINATION_THERMAL_DECOMPOSITION_ACT_78",
    "effectText": "[Phép Phản Ứng Thường]: Kích hoạt hiệu ứng nhiệt/điện hóa: Gây 400 LP sát thương trực tiếp lên đối thủ hoặc rút 1 lá bài từ Bộ bài.",
    "scientificLore": "Phản ứng hóa học Phản Ứng Nhiệt Phân Đá Vôi (CaCO₃ --1000°C--> CaO + CO₂↑) tuân thủ nghiêm ngặt định luật bảo toàn khối lượng và biến thiên enthalpy $\\Delta_r H^\\circ_{298}$ theo GDPT 2018.",
    "relatedEquation": "CaCO₃ --1000°C--> CaO + CO₂↑",
    "iupacName": "Limestone Calcination Thermal Decomposition Protocol",
    "archetype": "FREE_RADICAL_CASCADE",
    "structuredEffects": [
      {
        "effectId": "B15_EFF_78",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 400
            }
          },
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Gây 400 LP sát thương phản ứng hóa học và rút 1 lá bài."
      }
    ]
  },
  {
    "id": "card_b15_079_spell_aluminum_cation_hydrolysis_acidification_79",
    "name": "Phản Ứng Thủy Phân Muối Nhôm (Phương Trình 8)",
    "name_en": "Aluminum Cation Hydrolysis Acidification (Equation 8)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "NORMAL_SPELL",
    "spellSpeed": 1,
    "rarity": "SUPER_RARE",
    "attribute": "ACID_DARK",
    "manaCost": 4,
    "chemicalFormula": "Al3+ + 3H2O",
    "effectCode": "SPELL_B15_ALUMINUM_CATION_HYDROLYSIS_ACIDIFICATION_ACT_79",
    "effectText": "[Phép Phản Ứng Thường]: Kích hoạt hiệu ứng nhiệt/điện hóa: Gây 500 LP sát thương trực tiếp lên đối thủ hoặc rút 1 lá bài từ Bộ bài.",
    "scientificLore": "Phản ứng hóa học Phản Ứng Thủy Phân Muối Nhôm (Al³⁺ + 3H₂O ⇌ Al(OH)₃↓ + 3H⁺) tuân thủ nghiêm ngặt định luật bảo toàn khối lượng và biến thiên enthalpy $\\Delta_r H^\\circ_{298}$ theo GDPT 2018.",
    "relatedEquation": "Al³⁺ + 3H₂O ⇌ Al(OH)₃↓ + 3H⁺",
    "iupacName": "Aluminum Cation Hydrolysis Acidification Protocol",
    "archetype": "REDOX_CASCADE",
    "structuredEffects": [
      {
        "effectId": "B15_EFF_79",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 400
            }
          },
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Gây 400 LP sát thương phản ứng hóa học và rút 1 lá bài."
      }
    ]
  },
  {
    "id": "card_b15_080_spell_gold_solvation_dissolution_80",
    "name": "Phản Ứng Hòa Tan Vàng Bằng Cường Toan (Phương Trình 8)",
    "name_en": "Gold Solvation Dissolution (Equation 8)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "NORMAL_SPELL",
    "spellSpeed": 1,
    "rarity": "ULTRA_RARE",
    "attribute": "ACID_DARK",
    "manaCost": 5,
    "chemicalFormula": "Au + HNO3 + 4HCl",
    "effectCode": "SPELL_B15_GOLD_SOLVATION_DISSOLUTION_ACT_80",
    "effectText": "[Phép Phản Ứng Thường]: Kích hoạt hiệu ứng nhiệt/điện hóa: Gây 600 LP sát thương trực tiếp lên đối thủ hoặc rút 1 lá bài từ Bộ bài.",
    "scientificLore": "Phản ứng hóa học Phản Ứng Hòa Tan Vàng Bằng Cường Toan (Au + HNO₃ + 4HCl → HAuCl₄ + NO + 2H₂O) tuân thủ nghiêm ngặt định luật bảo toàn khối lượng và biến thiên enthalpy $\\Delta_r H^\\circ_{298}$ theo GDPT 2018.",
    "relatedEquation": "Au + HNO₃ + 4HCl → HAuCl₄ + NO + 2H₂O",
    "iupacName": "Gold Solvation Dissolution Protocol",
    "archetype": "GREEN_CHEMISTRY",
    "structuredEffects": [
      {
        "effectId": "B15_EFF_80",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 400
            }
          },
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Gây 400 LP sát thương phản ứng hóa học và rút 1 lá bài."
      }
    ]
  },
  {
    "id": "card_b15_081_spell_complete_combustion_flash_81",
    "name": "Phản Ứng Đốt Cháy Hoàn Toàn (Phương Trình 9)",
    "name_en": "Complete Combustion Flash (Equation 9)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "NORMAL_SPELL",
    "spellSpeed": 1,
    "rarity": "SECRET_RARE",
    "attribute": "PYRO",
    "manaCost": 1,
    "chemicalFormula": "C_x H_y + O2",
    "effectCode": "SPELL_B15_COMPLETE_COMBUSTION_FLASH_ACT_81",
    "effectText": "[Phép Phản Ứng Thường]: Kích hoạt hiệu ứng nhiệt/điện hóa: Gây 300 LP sát thương trực tiếp lên đối thủ hoặc rút 1 lá bài từ Bộ bài.",
    "scientificLore": "Phản ứng hóa học Phản Ứng Đốt Cháy Hoàn Toàn (C_x H_y + (x+y/4)O₂ → xCO₂ + (y/2)H₂O) tuân thủ nghiêm ngặt định luật bảo toàn khối lượng và biến thiên enthalpy $\\Delta_r H^\\circ_{298}$ theo GDPT 2018.",
    "relatedEquation": "C_x H_y + (x+y/4)O₂ → xCO₂ + (y/2)H₂O",
    "iupacName": "Complete Combustion Flash Protocol",
    "archetype": "FREE_RADICAL_CASCADE",
    "structuredEffects": [
      {
        "effectId": "B15_EFF_81",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 400
            }
          },
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Gây 400 LP sát thương phản ứng hóa học và rút 1 lá bài."
      }
    ]
  },
  {
    "id": "card_b15_082_spell_acid_base_neutralization_burst_82",
    "name": "Phản Ứng Trung Hòa Chuẩn Độ (Phương Trình 9)",
    "name_en": "Acid-Base Neutralization Burst (Equation 9)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "NORMAL_SPELL",
    "spellSpeed": 1,
    "rarity": "COMMON",
    "attribute": "AQUA",
    "manaCost": 2,
    "chemicalFormula": "H+ + OH-",
    "effectCode": "SPELL_B15_ACID_BASE_NEUTRALIZATION_BURST_ACT_82",
    "effectText": "[Phép Phản Ứng Thường]: Kích hoạt hiệu ứng nhiệt/điện hóa: Gây 400 LP sát thương trực tiếp lên đối thủ hoặc rút 1 lá bài từ Bộ bài.",
    "scientificLore": "Phản ứng hóa học Phản Ứng Trung Hòa Chuẩn Độ (H⁺(aq) + OH⁻(aq) → H₂O(l) (ΔH = -57.3 kJ/mol)) tuân thủ nghiêm ngặt định luật bảo toàn khối lượng và biến thiên enthalpy $\\Delta_r H^\\circ_{298}$ theo GDPT 2018.",
    "relatedEquation": "H⁺(aq) + OH⁻(aq) → H₂O(l) (ΔH = -57.3 kJ/mol)",
    "iupacName": "Acid-Base Neutralization Burst Protocol",
    "archetype": "REDOX_CASCADE",
    "structuredEffects": [
      {
        "effectId": "B15_EFF_82",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 400
            }
          },
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Gây 400 LP sát thương phản ứng hóa học và rút 1 lá bài."
      }
    ]
  },
  {
    "id": "card_b15_083_spell_galvanic_redox_discharge_83",
    "name": "Phản Ứng Oxi Hóa Khử Pin Galvanic (Phương Trình 9)",
    "name_en": "Galvanic Redox Discharge (Equation 9)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "NORMAL_SPELL",
    "spellSpeed": 1,
    "rarity": "COMMON",
    "attribute": "ELECTRO",
    "manaCost": 3,
    "chemicalFormula": "Zn + Cu2+",
    "effectCode": "SPELL_B15_GALVANIC_REDOX_DISCHARGE_ACT_83",
    "effectText": "[Phép Phản Ứng Thường]: Kích hoạt hiệu ứng nhiệt/điện hóa: Gây 500 LP sát thương trực tiếp lên đối thủ hoặc rút 1 lá bài từ Bộ bài.",
    "scientificLore": "Phản ứng hóa học Phản Ứng Oxi Hóa Khử Pin Galvanic (Zn(s) + Cu²⁺(aq) → Zn²⁺(aq) + Cu(s) (E° = +1.10V)) tuân thủ nghiêm ngặt định luật bảo toàn khối lượng và biến thiên enthalpy $\\Delta_r H^\\circ_{298}$ theo GDPT 2018.",
    "relatedEquation": "Zn(s) + Cu²⁺(aq) → Zn²⁺(aq) + Cu(s) (E° = +1.10V)",
    "iupacName": "Galvanic Redox Discharge Protocol",
    "archetype": "GREEN_CHEMISTRY",
    "structuredEffects": [
      {
        "effectId": "B15_EFF_83",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 400
            }
          },
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Gây 400 LP sát thương phản ứng hóa học và rút 1 lá bài."
      }
    ]
  },
  {
    "id": "card_b15_084_spell_photochemical_halogenation_84",
    "name": "Phản Ứng Thế Halogen Ánh Sáng (Phương Trình 9)",
    "name_en": "Photochemical Halogenation (Equation 9)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "NORMAL_SPELL",
    "spellSpeed": 1,
    "rarity": "COMMON",
    "attribute": "AERO",
    "manaCost": 4,
    "chemicalFormula": "CH4 + Cl2",
    "effectCode": "SPELL_B15_PHOTOCHEMICAL_HALOGENATION_ACT_84",
    "effectText": "[Phép Phản Ứng Thường]: Kích hoạt hiệu ứng nhiệt/điện hóa: Gây 600 LP sát thương trực tiếp lên đối thủ hoặc rút 1 lá bài từ Bộ bài.",
    "scientificLore": "Phản ứng hóa học Phản Ứng Thế Halogen Ánh Sáng (CH₄ + Cl₂ --hν--> CH₃Cl + HCl) tuân thủ nghiêm ngặt định luật bảo toàn khối lượng và biến thiên enthalpy $\\Delta_r H^\\circ_{298}$ theo GDPT 2018.",
    "relatedEquation": "CH₄ + Cl₂ --hν--> CH₃Cl + HCl",
    "iupacName": "Photochemical Halogenation Protocol",
    "archetype": "FREE_RADICAL_CASCADE",
    "structuredEffects": [
      {
        "effectId": "B15_EFF_84",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 400
            }
          },
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Gây 400 LP sát thương phản ứng hóa học và rút 1 lá bài."
      }
    ]
  },
  {
    "id": "card_b15_085_spell_alcohol_acid_dehydration_85",
    "name": "Phản Ứng Tách Nước Khử Ancol (Phương Trình 9)",
    "name_en": "Alcohol Acid Dehydration (Equation 9)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "NORMAL_SPELL",
    "spellSpeed": 1,
    "rarity": "RARE",
    "attribute": "TERRA",
    "manaCost": 5,
    "chemicalFormula": "C2H5OH",
    "effectCode": "SPELL_B15_ALCOHOL_ACID_DEHYDRATION_ACT_85",
    "effectText": "[Phép Phản Ứng Thường]: Kích hoạt hiệu ứng nhiệt/điện hóa: Gây 300 LP sát thương trực tiếp lên đối thủ hoặc rút 1 lá bài từ Bộ bài.",
    "scientificLore": "Phản ứng hóa học Phản Ứng Tách Nước Khử Ancol (C₂H₅OH --H₂SO₄/170°C--> C₂H₄ + H₂O) tuân thủ nghiêm ngặt định luật bảo toàn khối lượng và biến thiên enthalpy $\\Delta_r H^\\circ_{298}$ theo GDPT 2018.",
    "relatedEquation": "C₂H₅OH --H₂SO₄/170°C--> C₂H₄ + H₂O",
    "iupacName": "Alcohol Acid Dehydration Protocol",
    "archetype": "REDOX_CASCADE",
    "structuredEffects": [
      {
        "effectId": "B15_EFF_85",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 400
            }
          },
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Gây 400 LP sát thương phản ứng hóa học và rút 1 lá bài."
      }
    ]
  },
  {
    "id": "card_b15_086_spell_fischer_esterification_synthesis_86",
    "name": "Phản Ứng Este Hóa Fischer (Phương Trình 9)",
    "name_en": "Fischer Esterification Synthesis (Equation 9)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "NORMAL_SPELL",
    "spellSpeed": 1,
    "rarity": "RARE",
    "attribute": "AQUA",
    "manaCost": 1,
    "chemicalFormula": "RCOOH + R'OH",
    "effectCode": "SPELL_B15_FISCHER_ESTERIFICATION_SYNTHESIS_ACT_86",
    "effectText": "[Phép Phản Ứng Thường]: Kích hoạt hiệu ứng nhiệt/điện hóa: Gây 400 LP sát thương trực tiếp lên đối thủ hoặc rút 1 lá bài từ Bộ bài.",
    "scientificLore": "Phản ứng hóa học Phản Ứng Este Hóa Fischer (RCOOH + R'OH ⇌ RCOOR' + H₂O) tuân thủ nghiêm ngặt định luật bảo toàn khối lượng và biến thiên enthalpy $\\Delta_r H^\\circ_{298}$ theo GDPT 2018.",
    "relatedEquation": "RCOOH + R'OH ⇌ RCOOR' + H₂O",
    "iupacName": "Fischer Esterification Synthesis Protocol",
    "archetype": "GREEN_CHEMISTRY",
    "structuredEffects": [
      {
        "effectId": "B15_EFF_86",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 400
            }
          },
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Gây 400 LP sát thương phản ứng hóa học và rút 1 lá bài."
      }
    ]
  },
  {
    "id": "card_b15_087_spell_silver_mirror_tollens_reduction_87",
    "name": "Phản Ứng Tráng Bạc Glucozo (Phương Trình 9)",
    "name_en": "Silver Mirror Tollens Reduction (Equation 9)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "NORMAL_SPELL",
    "spellSpeed": 1,
    "rarity": "SUPER_RARE",
    "attribute": "NOBLE_VOID",
    "manaCost": 2,
    "chemicalFormula": "C6H12O6 + Ag+",
    "effectCode": "SPELL_B15_SILVER_MIRROR_TOLLENS_REDUCTION_ACT_87",
    "effectText": "[Phép Phản Ứng Thường]: Kích hoạt hiệu ứng nhiệt/điện hóa: Gây 500 LP sát thương trực tiếp lên đối thủ hoặc rút 1 lá bài từ Bộ bài.",
    "scientificLore": "Phản ứng hóa học Phản Ứng Tráng Bạc Glucozo (C₆H₁₂O₆ + 2[Ag(NH₃)₂]OH → C₆H₁₂O₇ + 2Ag↓ + 4NH₃ + H₂O) tuân thủ nghiêm ngặt định luật bảo toàn khối lượng và biến thiên enthalpy $\\Delta_r H^\\circ_{298}$ theo GDPT 2018.",
    "relatedEquation": "C₆H₁₂O₆ + 2[Ag(NH₃)₂]OH → C₆H₁₂O₇ + 2Ag↓ + 4NH₃ + H₂O",
    "iupacName": "Silver Mirror Tollens Reduction Protocol",
    "archetype": "FREE_RADICAL_CASCADE",
    "structuredEffects": [
      {
        "effectId": "B15_EFF_87",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 400
            }
          },
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Gây 400 LP sát thương phản ứng hóa học và rút 1 lá bài."
      }
    ]
  },
  {
    "id": "card_b15_088_spell_limestone_calcination_thermal_decomposition_88",
    "name": "Phản Ứng Nhiệt Phân Đá Vôi (Phương Trình 9)",
    "name_en": "Limestone Calcination Thermal Decomposition (Equation 9)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "NORMAL_SPELL",
    "spellSpeed": 1,
    "rarity": "SUPER_RARE",
    "attribute": "TERRA",
    "manaCost": 3,
    "chemicalFormula": "CaCO3",
    "effectCode": "SPELL_B15_LIMESTONE_CALCINATION_THERMAL_DECOMPOSITION_ACT_88",
    "effectText": "[Phép Phản Ứng Thường]: Kích hoạt hiệu ứng nhiệt/điện hóa: Gây 600 LP sát thương trực tiếp lên đối thủ hoặc rút 1 lá bài từ Bộ bài.",
    "scientificLore": "Phản ứng hóa học Phản Ứng Nhiệt Phân Đá Vôi (CaCO₃ --1000°C--> CaO + CO₂↑) tuân thủ nghiêm ngặt định luật bảo toàn khối lượng và biến thiên enthalpy $\\Delta_r H^\\circ_{298}$ theo GDPT 2018.",
    "relatedEquation": "CaCO₃ --1000°C--> CaO + CO₂↑",
    "iupacName": "Limestone Calcination Thermal Decomposition Protocol",
    "archetype": "REDOX_CASCADE",
    "structuredEffects": [
      {
        "effectId": "B15_EFF_88",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 400
            }
          },
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Gây 400 LP sát thương phản ứng hóa học và rút 1 lá bài."
      }
    ]
  },
  {
    "id": "card_b15_089_spell_aluminum_cation_hydrolysis_acidification_89",
    "name": "Phản Ứng Thủy Phân Muối Nhôm (Phương Trình 9)",
    "name_en": "Aluminum Cation Hydrolysis Acidification (Equation 9)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "NORMAL_SPELL",
    "spellSpeed": 1,
    "rarity": "ULTRA_RARE",
    "attribute": "ACID_DARK",
    "manaCost": 4,
    "chemicalFormula": "Al3+ + 3H2O",
    "effectCode": "SPELL_B15_ALUMINUM_CATION_HYDROLYSIS_ACIDIFICATION_ACT_89",
    "effectText": "[Phép Phản Ứng Thường]: Kích hoạt hiệu ứng nhiệt/điện hóa: Gây 300 LP sát thương trực tiếp lên đối thủ hoặc rút 1 lá bài từ Bộ bài.",
    "scientificLore": "Phản ứng hóa học Phản Ứng Thủy Phân Muối Nhôm (Al³⁺ + 3H₂O ⇌ Al(OH)₃↓ + 3H⁺) tuân thủ nghiêm ngặt định luật bảo toàn khối lượng và biến thiên enthalpy $\\Delta_r H^\\circ_{298}$ theo GDPT 2018.",
    "relatedEquation": "Al³⁺ + 3H₂O ⇌ Al(OH)₃↓ + 3H⁺",
    "iupacName": "Aluminum Cation Hydrolysis Acidification Protocol",
    "archetype": "GREEN_CHEMISTRY",
    "structuredEffects": [
      {
        "effectId": "B15_EFF_89",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 400
            }
          },
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Gây 400 LP sát thương phản ứng hóa học và rút 1 lá bài."
      }
    ]
  },
  {
    "id": "card_b15_090_spell_gold_solvation_dissolution_90",
    "name": "Phản Ứng Hòa Tan Vàng Bằng Cường Toan (Phương Trình 9)",
    "name_en": "Gold Solvation Dissolution (Equation 9)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "NORMAL_SPELL",
    "spellSpeed": 1,
    "rarity": "SECRET_RARE",
    "attribute": "ACID_DARK",
    "manaCost": 5,
    "chemicalFormula": "Au + HNO3 + 4HCl",
    "effectCode": "SPELL_B15_GOLD_SOLVATION_DISSOLUTION_ACT_90",
    "effectText": "[Phép Phản Ứng Thường]: Kích hoạt hiệu ứng nhiệt/điện hóa: Gây 400 LP sát thương trực tiếp lên đối thủ hoặc rút 1 lá bài từ Bộ bài.",
    "scientificLore": "Phản ứng hóa học Phản Ứng Hòa Tan Vàng Bằng Cường Toan (Au + HNO₃ + 4HCl → HAuCl₄ + NO + 2H₂O) tuân thủ nghiêm ngặt định luật bảo toàn khối lượng và biến thiên enthalpy $\\Delta_r H^\\circ_{298}$ theo GDPT 2018.",
    "relatedEquation": "Au + HNO₃ + 4HCl → HAuCl₄ + NO + 2H₂O",
    "iupacName": "Gold Solvation Dissolution Protocol",
    "archetype": "FREE_RADICAL_CASCADE",
    "structuredEffects": [
      {
        "effectId": "B15_EFF_90",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 400
            }
          },
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Gây 400 LP sát thương phản ứng hóa học và rút 1 lá bài."
      }
    ]
  },
  {
    "id": "card_b15_091_spell_complete_combustion_flash_91",
    "name": "Phản Ứng Đốt Cháy Hoàn Toàn (Phương Trình 10)",
    "name_en": "Complete Combustion Flash (Equation 10)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "NORMAL_SPELL",
    "spellSpeed": 1,
    "rarity": "COMMON",
    "attribute": "PYRO",
    "manaCost": 1,
    "chemicalFormula": "C_x H_y + O2",
    "effectCode": "SPELL_B15_COMPLETE_COMBUSTION_FLASH_ACT_91",
    "effectText": "[Phép Phản Ứng Thường]: Kích hoạt hiệu ứng nhiệt/điện hóa: Gây 500 LP sát thương trực tiếp lên đối thủ hoặc rút 1 lá bài từ Bộ bài.",
    "scientificLore": "Phản ứng hóa học Phản Ứng Đốt Cháy Hoàn Toàn (C_x H_y + (x+y/4)O₂ → xCO₂ + (y/2)H₂O) tuân thủ nghiêm ngặt định luật bảo toàn khối lượng và biến thiên enthalpy $\\Delta_r H^\\circ_{298}$ theo GDPT 2018.",
    "relatedEquation": "C_x H_y + (x+y/4)O₂ → xCO₂ + (y/2)H₂O",
    "iupacName": "Complete Combustion Flash Protocol",
    "archetype": "REDOX_CASCADE",
    "structuredEffects": [
      {
        "effectId": "B15_EFF_91",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 400
            }
          },
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Gây 400 LP sát thương phản ứng hóa học và rút 1 lá bài."
      }
    ]
  },
  {
    "id": "card_b15_092_spell_acid_base_neutralization_burst_92",
    "name": "Phản Ứng Trung Hòa Chuẩn Độ (Phương Trình 10)",
    "name_en": "Acid-Base Neutralization Burst (Equation 10)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "NORMAL_SPELL",
    "spellSpeed": 1,
    "rarity": "COMMON",
    "attribute": "AQUA",
    "manaCost": 2,
    "chemicalFormula": "H+ + OH-",
    "effectCode": "SPELL_B15_ACID_BASE_NEUTRALIZATION_BURST_ACT_92",
    "effectText": "[Phép Phản Ứng Thường]: Kích hoạt hiệu ứng nhiệt/điện hóa: Gây 600 LP sát thương trực tiếp lên đối thủ hoặc rút 1 lá bài từ Bộ bài.",
    "scientificLore": "Phản ứng hóa học Phản Ứng Trung Hòa Chuẩn Độ (H⁺(aq) + OH⁻(aq) → H₂O(l) (ΔH = -57.3 kJ/mol)) tuân thủ nghiêm ngặt định luật bảo toàn khối lượng và biến thiên enthalpy $\\Delta_r H^\\circ_{298}$ theo GDPT 2018.",
    "relatedEquation": "H⁺(aq) + OH⁻(aq) → H₂O(l) (ΔH = -57.3 kJ/mol)",
    "iupacName": "Acid-Base Neutralization Burst Protocol",
    "archetype": "GREEN_CHEMISTRY",
    "structuredEffects": [
      {
        "effectId": "B15_EFF_92",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 400
            }
          },
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Gây 400 LP sát thương phản ứng hóa học và rút 1 lá bài."
      }
    ]
  },
  {
    "id": "card_b15_093_spell_galvanic_redox_discharge_93",
    "name": "Phản Ứng Oxi Hóa Khử Pin Galvanic (Phương Trình 10)",
    "name_en": "Galvanic Redox Discharge (Equation 10)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "NORMAL_SPELL",
    "spellSpeed": 1,
    "rarity": "COMMON",
    "attribute": "ELECTRO",
    "manaCost": 3,
    "chemicalFormula": "Zn + Cu2+",
    "effectCode": "SPELL_B15_GALVANIC_REDOX_DISCHARGE_ACT_93",
    "effectText": "[Phép Phản Ứng Thường]: Kích hoạt hiệu ứng nhiệt/điện hóa: Gây 300 LP sát thương trực tiếp lên đối thủ hoặc rút 1 lá bài từ Bộ bài.",
    "scientificLore": "Phản ứng hóa học Phản Ứng Oxi Hóa Khử Pin Galvanic (Zn(s) + Cu²⁺(aq) → Zn²⁺(aq) + Cu(s) (E° = +1.10V)) tuân thủ nghiêm ngặt định luật bảo toàn khối lượng và biến thiên enthalpy $\\Delta_r H^\\circ_{298}$ theo GDPT 2018.",
    "relatedEquation": "Zn(s) + Cu²⁺(aq) → Zn²⁺(aq) + Cu(s) (E° = +1.10V)",
    "iupacName": "Galvanic Redox Discharge Protocol",
    "archetype": "FREE_RADICAL_CASCADE",
    "structuredEffects": [
      {
        "effectId": "B15_EFF_93",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 400
            }
          },
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Gây 400 LP sát thương phản ứng hóa học và rút 1 lá bài."
      }
    ]
  },
  {
    "id": "card_b15_094_spell_photochemical_halogenation_94",
    "name": "Phản Ứng Thế Halogen Ánh Sáng (Phương Trình 10)",
    "name_en": "Photochemical Halogenation (Equation 10)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "NORMAL_SPELL",
    "spellSpeed": 1,
    "rarity": "RARE",
    "attribute": "AERO",
    "manaCost": 4,
    "chemicalFormula": "CH4 + Cl2",
    "effectCode": "SPELL_B15_PHOTOCHEMICAL_HALOGENATION_ACT_94",
    "effectText": "[Phép Phản Ứng Thường]: Kích hoạt hiệu ứng nhiệt/điện hóa: Gây 400 LP sát thương trực tiếp lên đối thủ hoặc rút 1 lá bài từ Bộ bài.",
    "scientificLore": "Phản ứng hóa học Phản Ứng Thế Halogen Ánh Sáng (CH₄ + Cl₂ --hν--> CH₃Cl + HCl) tuân thủ nghiêm ngặt định luật bảo toàn khối lượng và biến thiên enthalpy $\\Delta_r H^\\circ_{298}$ theo GDPT 2018.",
    "relatedEquation": "CH₄ + Cl₂ --hν--> CH₃Cl + HCl",
    "iupacName": "Photochemical Halogenation Protocol",
    "archetype": "REDOX_CASCADE",
    "structuredEffects": [
      {
        "effectId": "B15_EFF_94",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 400
            }
          },
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Gây 400 LP sát thương phản ứng hóa học và rút 1 lá bài."
      }
    ]
  },
  {
    "id": "card_b15_095_spell_alcohol_acid_dehydration_95",
    "name": "Phản Ứng Tách Nước Khử Ancol (Phương Trình 10)",
    "name_en": "Alcohol Acid Dehydration (Equation 10)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "NORMAL_SPELL",
    "spellSpeed": 1,
    "rarity": "RARE",
    "attribute": "TERRA",
    "manaCost": 5,
    "chemicalFormula": "C2H5OH",
    "effectCode": "SPELL_B15_ALCOHOL_ACID_DEHYDRATION_ACT_95",
    "effectText": "[Phép Phản Ứng Thường]: Kích hoạt hiệu ứng nhiệt/điện hóa: Gây 500 LP sát thương trực tiếp lên đối thủ hoặc rút 1 lá bài từ Bộ bài.",
    "scientificLore": "Phản ứng hóa học Phản Ứng Tách Nước Khử Ancol (C₂H₅OH --H₂SO₄/170°C--> C₂H₄ + H₂O) tuân thủ nghiêm ngặt định luật bảo toàn khối lượng và biến thiên enthalpy $\\Delta_r H^\\circ_{298}$ theo GDPT 2018.",
    "relatedEquation": "C₂H₅OH --H₂SO₄/170°C--> C₂H₄ + H₂O",
    "iupacName": "Alcohol Acid Dehydration Protocol",
    "archetype": "GREEN_CHEMISTRY",
    "structuredEffects": [
      {
        "effectId": "B15_EFF_95",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 400
            }
          },
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Gây 400 LP sát thương phản ứng hóa học và rút 1 lá bài."
      }
    ]
  },
  {
    "id": "card_b15_096_spell_fischer_esterification_synthesis_96",
    "name": "Phản Ứng Este Hóa Fischer (Phương Trình 10)",
    "name_en": "Fischer Esterification Synthesis (Equation 10)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "NORMAL_SPELL",
    "spellSpeed": 1,
    "rarity": "SUPER_RARE",
    "attribute": "AQUA",
    "manaCost": 1,
    "chemicalFormula": "RCOOH + R'OH",
    "effectCode": "SPELL_B15_FISCHER_ESTERIFICATION_SYNTHESIS_ACT_96",
    "effectText": "[Phép Phản Ứng Thường]: Kích hoạt hiệu ứng nhiệt/điện hóa: Gây 600 LP sát thương trực tiếp lên đối thủ hoặc rút 1 lá bài từ Bộ bài.",
    "scientificLore": "Phản ứng hóa học Phản Ứng Este Hóa Fischer (RCOOH + R'OH ⇌ RCOOR' + H₂O) tuân thủ nghiêm ngặt định luật bảo toàn khối lượng và biến thiên enthalpy $\\Delta_r H^\\circ_{298}$ theo GDPT 2018.",
    "relatedEquation": "RCOOH + R'OH ⇌ RCOOR' + H₂O",
    "iupacName": "Fischer Esterification Synthesis Protocol",
    "archetype": "FREE_RADICAL_CASCADE",
    "structuredEffects": [
      {
        "effectId": "B15_EFF_96",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 400
            }
          },
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Gây 400 LP sát thương phản ứng hóa học và rút 1 lá bài."
      }
    ]
  },
  {
    "id": "card_b15_097_spell_silver_mirror_tollens_reduction_97",
    "name": "Phản Ứng Tráng Bạc Glucozo (Phương Trình 10)",
    "name_en": "Silver Mirror Tollens Reduction (Equation 10)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "NORMAL_SPELL",
    "spellSpeed": 1,
    "rarity": "SUPER_RARE",
    "attribute": "NOBLE_VOID",
    "manaCost": 2,
    "chemicalFormula": "C6H12O6 + Ag+",
    "effectCode": "SPELL_B15_SILVER_MIRROR_TOLLENS_REDUCTION_ACT_97",
    "effectText": "[Phép Phản Ứng Thường]: Kích hoạt hiệu ứng nhiệt/điện hóa: Gây 300 LP sát thương trực tiếp lên đối thủ hoặc rút 1 lá bài từ Bộ bài.",
    "scientificLore": "Phản ứng hóa học Phản Ứng Tráng Bạc Glucozo (C₆H₁₂O₆ + 2[Ag(NH₃)₂]OH → C₆H₁₂O₇ + 2Ag↓ + 4NH₃ + H₂O) tuân thủ nghiêm ngặt định luật bảo toàn khối lượng và biến thiên enthalpy $\\Delta_r H^\\circ_{298}$ theo GDPT 2018.",
    "relatedEquation": "C₆H₁₂O₆ + 2[Ag(NH₃)₂]OH → C₆H₁₂O₇ + 2Ag↓ + 4NH₃ + H₂O",
    "iupacName": "Silver Mirror Tollens Reduction Protocol",
    "archetype": "REDOX_CASCADE",
    "structuredEffects": [
      {
        "effectId": "B15_EFF_97",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 400
            }
          },
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Gây 400 LP sát thương phản ứng hóa học và rút 1 lá bài."
      }
    ]
  },
  {
    "id": "card_b15_098_spell_limestone_calcination_thermal_decomposition_98",
    "name": "Phản Ứng Nhiệt Phân Đá Vôi (Phương Trình 10)",
    "name_en": "Limestone Calcination Thermal Decomposition (Equation 10)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "NORMAL_SPELL",
    "spellSpeed": 1,
    "rarity": "ULTRA_RARE",
    "attribute": "TERRA",
    "manaCost": 3,
    "chemicalFormula": "CaCO3",
    "effectCode": "SPELL_B15_LIMESTONE_CALCINATION_THERMAL_DECOMPOSITION_ACT_98",
    "effectText": "[Phép Phản Ứng Thường]: Kích hoạt hiệu ứng nhiệt/điện hóa: Gây 400 LP sát thương trực tiếp lên đối thủ hoặc rút 1 lá bài từ Bộ bài.",
    "scientificLore": "Phản ứng hóa học Phản Ứng Nhiệt Phân Đá Vôi (CaCO₃ --1000°C--> CaO + CO₂↑) tuân thủ nghiêm ngặt định luật bảo toàn khối lượng và biến thiên enthalpy $\\Delta_r H^\\circ_{298}$ theo GDPT 2018.",
    "relatedEquation": "CaCO₃ --1000°C--> CaO + CO₂↑",
    "iupacName": "Limestone Calcination Thermal Decomposition Protocol",
    "archetype": "GREEN_CHEMISTRY",
    "structuredEffects": [
      {
        "effectId": "B15_EFF_98",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 400
            }
          },
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Gây 400 LP sát thương phản ứng hóa học và rút 1 lá bài."
      }
    ]
  },
  {
    "id": "card_b15_099_spell_aluminum_cation_hydrolysis_acidification_99",
    "name": "Phản Ứng Thủy Phân Muối Nhôm (Phương Trình 10)",
    "name_en": "Aluminum Cation Hydrolysis Acidification (Equation 10)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "NORMAL_SPELL",
    "spellSpeed": 1,
    "rarity": "SECRET_RARE",
    "attribute": "ACID_DARK",
    "manaCost": 4,
    "chemicalFormula": "Al3+ + 3H2O",
    "effectCode": "SPELL_B15_ALUMINUM_CATION_HYDROLYSIS_ACIDIFICATION_ACT_99",
    "effectText": "[Phép Phản Ứng Thường]: Kích hoạt hiệu ứng nhiệt/điện hóa: Gây 500 LP sát thương trực tiếp lên đối thủ hoặc rút 1 lá bài từ Bộ bài.",
    "scientificLore": "Phản ứng hóa học Phản Ứng Thủy Phân Muối Nhôm (Al³⁺ + 3H₂O ⇌ Al(OH)₃↓ + 3H⁺) tuân thủ nghiêm ngặt định luật bảo toàn khối lượng và biến thiên enthalpy $\\Delta_r H^\\circ_{298}$ theo GDPT 2018.",
    "relatedEquation": "Al³⁺ + 3H₂O ⇌ Al(OH)₃↓ + 3H⁺",
    "iupacName": "Aluminum Cation Hydrolysis Acidification Protocol",
    "archetype": "FREE_RADICAL_CASCADE",
    "structuredEffects": [
      {
        "effectId": "B15_EFF_99",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 400
            }
          },
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Gây 400 LP sát thương phản ứng hóa học và rút 1 lá bài."
      }
    ]
  },
  {
    "id": "card_b15_100_spell_gold_solvation_dissolution_100",
    "name": "Phản Ứng Hòa Tan Vàng Bằng Cường Toan (Phương Trình 10)",
    "name_en": "Gold Solvation Dissolution (Equation 10)",
    "cardType": "REACTION_SPELL",
    "spellTrapSubtype": "NORMAL_SPELL",
    "spellSpeed": 1,
    "rarity": "COMMON",
    "attribute": "ACID_DARK",
    "manaCost": 5,
    "chemicalFormula": "Au + HNO3 + 4HCl",
    "effectCode": "SPELL_B15_GOLD_SOLVATION_DISSOLUTION_ACT_100",
    "effectText": "[Phép Phản Ứng Thường]: Kích hoạt hiệu ứng nhiệt/điện hóa: Gây 600 LP sát thương trực tiếp lên đối thủ hoặc rút 1 lá bài từ Bộ bài.",
    "scientificLore": "Phản ứng hóa học Phản Ứng Hòa Tan Vàng Bằng Cường Toan (Au + HNO₃ + 4HCl → HAuCl₄ + NO + 2H₂O) tuân thủ nghiêm ngặt định luật bảo toàn khối lượng và biến thiên enthalpy $\\Delta_r H^\\circ_{298}$ theo GDPT 2018.",
    "relatedEquation": "Au + HNO₃ + 4HCl → HAuCl₄ + NO + 2H₂O",
    "iupacName": "Gold Solvation Dissolution Protocol",
    "archetype": "REDOX_CASCADE",
    "structuredEffects": [
      {
        "effectId": "B15_EFF_100",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 400
            }
          },
          {
            "op": "DRAW_CARD",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Gây 400 LP sát thương phản ứng hóa học và rút 1 lá bài."
      }
    ]
  }
];
