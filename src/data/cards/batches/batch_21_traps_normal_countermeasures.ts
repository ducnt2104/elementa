// src/data/cards/batches/batch_21_traps_normal_countermeasures.ts
// Batch 21: Normal Countermeasure Traps (120 cards)
// Automatically generated and validated for ELEMENTA Tactical TCG

import { PlayableCardDef } from '../../../domain/cardGameTypes';

export const BATCH_21_CARDS: PlayableCardDef[] = [
  {
    "id": "card_b21_001_trap_silver_chloride_precipitation_barrier_1",
    "name": "Bẫy Kết Tủa Bạc Clorua Trắng (Tầng Bẫy 1)",
    "name_en": "Silver Chloride Precipitation Barrier (Barrier Level 1)",
    "cardType": "TRAP",
    "spellTrapSubtype": "NORMAL_TRAP",
    "spellSpeed": 2,
    "rarity": "COMMON",
    "attribute": "TERRA",
    "manaCost": 1,
    "chemicalFormula": "AgCl↓",
    "effectCode": "TRAP_B21_SILVER_CHLORIDE_PRECIPITATION_BARRIER_NORM_1",
    "effectText": "[Bẫy Thường / Normal Trap - Spell Speed 2]: Khi quái thú đối phương tuyên bố tấn công: Hủy bỏ đòn tấn công và chuyển quái thú đó sang tư thế Phòng thủ, đồng thời gây 300 LP phản chấn.",
    "scientificLore": "Hiện tượng hóa học Bẫy Kết Tủa Bạc Clorua Trắng (Ag⁺(aq) + Cl⁻(aq) → AgCl(s)↓ (Ksp = 1.77×10⁻¹⁰)) ngăn chặn sự lan truyền phản ứng hoặc bẫy bắt các ion tự do thành pha rắn/khí trơ theo chuẩn GDPT 2018.",
    "relatedEquation": "Ag⁺(aq) + Cl⁻(aq) → AgCl(s)↓ (Ksp = 1.77×10⁻¹⁰)",
    "iupacName": "Silver Chloride Precipitation Barrier Countermeasure",
    "archetype": "PRECIPITATION_TRAP",
    "structuredEffects": [
      {
        "effectId": "B21_EFF_1",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "APPLY_STATUS",
            "params": {
              "statusType": "POSITION_LOCKED",
              "turns": 1
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Chặn đứng đòn tấn công, khóa tư thế quái thú địch và gây 300 LP."
      }
    ]
  },
  {
    "id": "card_b21_002_trap_dry_chemical_extinguisher_quench_2",
    "name": "Bẫy Phun Khí Bột Chữa Cháy NaHCO3 (Tầng Bẫy 1)",
    "name_en": "Dry Chemical Extinguisher Quench (Barrier Level 1)",
    "cardType": "TRAP",
    "spellTrapSubtype": "NORMAL_TRAP",
    "spellSpeed": 2,
    "rarity": "COMMON",
    "attribute": "AERO",
    "manaCost": 2,
    "chemicalFormula": "2NaHCO3",
    "effectCode": "TRAP_B21_DRY_CHEMICAL_EXTINGUISHER_QUENCH_NORM_2",
    "effectText": "[Bẫy Thường / Normal Trap - Spell Speed 2]: Khi quái thú đối phương tuyên bố tấn công: Hủy bỏ đòn tấn công và chuyển quái thú đó sang tư thế Phòng thủ, đồng thời gây 300 LP phản chấn.",
    "scientificLore": "Hiện tượng hóa học Bẫy Phun Khí Bột Chữa Cháy NaHCO3 (2NaHCO₃ --heat--> Na₂CO₃ + H₂O + CO₂↑) ngăn chặn sự lan truyền phản ứng hoặc bẫy bắt các ion tự do thành pha rắn/khí trơ theo chuẩn GDPT 2018.",
    "relatedEquation": "2NaHCO₃ --heat--> Na₂CO₃ + H₂O + CO₂↑",
    "iupacName": "Dry Chemical Extinguisher Quench Countermeasure",
    "archetype": "HALOGEN_PURGE",
    "structuredEffects": [
      {
        "effectId": "B21_EFF_2",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "APPLY_STATUS",
            "params": {
              "statusType": "POSITION_LOCKED",
              "turns": 1
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Chặn đứng đòn tấn công, khóa tư thế quái thú địch và gây 300 LP."
      }
    ]
  },
  {
    "id": "card_b21_003_trap_sacrificial_zinc_anode_discharge_3",
    "name": "Bẫy Anode Hy Sinh Chống Ăn Mòn (Tầng Bẫy 1)",
    "name_en": "Sacrificial Zinc Anode Discharge (Barrier Level 1)",
    "cardType": "TRAP",
    "spellTrapSubtype": "NORMAL_TRAP",
    "spellSpeed": 2,
    "rarity": "COMMON",
    "attribute": "ELECTRO",
    "manaCost": 3,
    "chemicalFormula": "Zn → Zn2+ + 2e-",
    "effectCode": "TRAP_B21_SACRIFICIAL_ZINC_ANODE_DISCHARGE_NORM_3",
    "effectText": "[Bẫy Thường / Normal Trap - Spell Speed 2]: Khi quái thú đối phương tuyên bố tấn công: Hủy bỏ đòn tấn công và chuyển quái thú đó sang tư thế Phòng thủ, đồng thời gây 300 LP phản chấn.",
    "scientificLore": "Hiện tượng hóa học Bẫy Anode Hy Sinh Chống Ăn Mòn (Zn(s) → Zn²⁺(aq) + 2e⁻ (E° = -0.76V vs Fe -0.44V)) ngăn chặn sự lan truyền phản ứng hoặc bẫy bắt các ion tự do thành pha rắn/khí trơ theo chuẩn GDPT 2018.",
    "relatedEquation": "Zn(s) → Zn²⁺(aq) + 2e⁻ (E° = -0.76V vs Fe -0.44V)",
    "iupacName": "Sacrificial Zinc Anode Discharge Countermeasure",
    "archetype": "PRECIPITATION_TRAP",
    "structuredEffects": [
      {
        "effectId": "B21_EFF_3",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "APPLY_STATUS",
            "params": {
              "statusType": "POSITION_LOCKED",
              "turns": 1
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Chặn đứng đòn tấn công, khóa tư thế quái thú địch và gây 300 LP."
      }
    ]
  },
  {
    "id": "card_b21_004_trap_heavy_barium_sulfate_blockade_4",
    "name": "Bẫy Kết Tủa Vàng Bari Sunfat (Tầng Bẫy 1)",
    "name_en": "Heavy Barium Sulfate Blockade (Barrier Level 1)",
    "cardType": "TRAP",
    "spellTrapSubtype": "NORMAL_TRAP",
    "spellSpeed": 2,
    "rarity": "RARE",
    "attribute": "TERRA",
    "manaCost": 4,
    "chemicalFormula": "BaSO4↓",
    "effectCode": "TRAP_B21_HEAVY_BARIUM_SULFATE_BLOCKADE_NORM_4",
    "effectText": "[Bẫy Thường / Normal Trap - Spell Speed 2]: Khi quái thú đối phương tuyên bố tấn công: Hủy bỏ đòn tấn công và chuyển quái thú đó sang tư thế Phòng thủ, đồng thời gây 300 LP phản chấn.",
    "scientificLore": "Hiện tượng hóa học Bẫy Kết Tủa Vàng Bari Sunfat (Ba²⁺(aq) + SO₄²⁻(aq) → BaSO₄(s)↓ (Ksp = 1.08×10⁻¹⁰)) ngăn chặn sự lan truyền phản ứng hoặc bẫy bắt các ion tự do thành pha rắn/khí trơ theo chuẩn GDPT 2018.",
    "relatedEquation": "Ba²⁺(aq) + SO₄²⁻(aq) → BaSO₄(s)↓ (Ksp = 1.08×10⁻¹⁰)",
    "iupacName": "Heavy Barium Sulfate Blockade Countermeasure",
    "archetype": "HALOGEN_PURGE",
    "structuredEffects": [
      {
        "effectId": "B21_EFF_4",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "APPLY_STATUS",
            "params": {
              "statusType": "POSITION_LOCKED",
              "turns": 1
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Chặn đứng đòn tấn công, khóa tư thế quái thú địch và gây 300 LP."
      }
    ]
  },
  {
    "id": "card_b21_005_trap_bleach_hypochlorite_vapor_trap_5",
    "name": "Bẫy Khí Clo Khử Trùng Cực Mạnh (Tầng Bẫy 1)",
    "name_en": "Bleach Hypochlorite Vapor Trap (Barrier Level 1)",
    "cardType": "TRAP",
    "spellTrapSubtype": "NORMAL_TRAP",
    "spellSpeed": 2,
    "rarity": "RARE",
    "attribute": "AERO",
    "manaCost": 1,
    "chemicalFormula": "NaClO + HCl",
    "effectCode": "TRAP_B21_BLEACH_HYPOCHLORITE_VAPOR_TRAP_NORM_5",
    "effectText": "[Bẫy Thường / Normal Trap - Spell Speed 2]: Khi quái thú đối phương tuyên bố tấn công: Hủy bỏ đòn tấn công và chuyển quái thú đó sang tư thế Phòng thủ, đồng thời gây 300 LP phản chấn.",
    "scientificLore": "Hiện tượng hóa học Bẫy Khí Clo Khử Trùng Cực Mạnh (NaClO + 2HCl → NaCl + Cl₂↑ + H₂O) ngăn chặn sự lan truyền phản ứng hoặc bẫy bắt các ion tự do thành pha rắn/khí trơ theo chuẩn GDPT 2018.",
    "relatedEquation": "NaClO + 2HCl → NaCl + Cl₂↑ + H₂O",
    "iupacName": "Bleach Hypochlorite Vapor Trap Countermeasure",
    "archetype": "PRECIPITATION_TRAP",
    "structuredEffects": [
      {
        "effectId": "B21_EFF_5",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "APPLY_STATUS",
            "params": {
              "statusType": "POSITION_LOCKED",
              "turns": 1
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Chặn đứng đòn tấn công, khóa tư thế quái thú địch và gây 300 LP."
      }
    ]
  },
  {
    "id": "card_b21_006_trap_activated_carbon_adsorption_net_6",
    "name": "Bẫy Hấp Phụ Khí Độc Bằng Than Hoạt Tính (Tầng Bẫy 1)",
    "name_en": "Activated Carbon Adsorption Net (Barrier Level 1)",
    "cardType": "TRAP",
    "spellTrapSubtype": "NORMAL_TRAP",
    "spellSpeed": 2,
    "rarity": "SUPER_RARE",
    "attribute": "TERRA",
    "manaCost": 2,
    "chemicalFormula": "C(adsorb)",
    "effectCode": "TRAP_B21_ACTIVATED_CARBON_ADSORPTION_NET_NORM_6",
    "effectText": "[Bẫy Thường / Normal Trap - Spell Speed 2]: Khi quái thú đối phương tuyên bố tấn công: Hủy bỏ đòn tấn công và chuyển quái thú đó sang tư thế Phòng thủ, đồng thời gây 300 LP phản chấn.",
    "scientificLore": "Hiện tượng hóa học Bẫy Hấp Phụ Khí Độc Bằng Than Hoạt Tính (Langmuir / Freundlich Multilayer Adsorption) ngăn chặn sự lan truyền phản ứng hoặc bẫy bắt các ion tự do thành pha rắn/khí trơ theo chuẩn GDPT 2018.",
    "relatedEquation": "Langmuir / Freundlich Multilayer Adsorption",
    "iupacName": "Activated Carbon Adsorption Net Countermeasure",
    "archetype": "HALOGEN_PURGE",
    "structuredEffects": [
      {
        "effectId": "B21_EFF_6",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "APPLY_STATUS",
            "params": {
              "statusType": "POSITION_LOCKED",
              "turns": 1
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Chặn đứng đòn tấn công, khóa tư thế quái thú địch và gây 300 LP."
      }
    ]
  },
  {
    "id": "card_b21_007_trap_lead_ii__iodide_golden_rain_trap_7",
    "name": "Bẫy Kết Tủa Chì(II) Iotua Hoàng Kim (Tầng Bẫy 1)",
    "name_en": "Lead(II) Iodide Golden Rain Trap (Barrier Level 1)",
    "cardType": "TRAP",
    "spellTrapSubtype": "NORMAL_TRAP",
    "spellSpeed": 2,
    "rarity": "SUPER_RARE",
    "attribute": "TERRA",
    "manaCost": 3,
    "chemicalFormula": "PbI2↓",
    "effectCode": "TRAP_B21_LEAD_II__IODIDE_GOLDEN_RAIN_TRAP_NORM_7",
    "effectText": "[Bẫy Thường / Normal Trap - Spell Speed 2]: Khi quái thú đối phương tuyên bố tấn công: Hủy bỏ đòn tấn công và chuyển quái thú đó sang tư thế Phòng thủ, đồng thời gây 300 LP phản chấn.",
    "scientificLore": "Hiện tượng hóa học Bẫy Kết Tủa Chì(II) Iotua Hoàng Kim (Pb²⁺(aq) + 2I⁻(aq) → PbI₂(s)↓ (Golden Glitter)) ngăn chặn sự lan truyền phản ứng hoặc bẫy bắt các ion tự do thành pha rắn/khí trơ theo chuẩn GDPT 2018.",
    "relatedEquation": "Pb²⁺(aq) + 2I⁻(aq) → PbI₂(s)↓ (Golden Glitter)",
    "iupacName": "Lead(II) Iodide Golden Rain Trap Countermeasure",
    "archetype": "PRECIPITATION_TRAP",
    "structuredEffects": [
      {
        "effectId": "B21_EFF_7",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "APPLY_STATUS",
            "params": {
              "statusType": "POSITION_LOCKED",
              "turns": 1
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Chặn đứng đòn tấn công, khóa tư thế quái thú địch và gây 300 LP."
      }
    ]
  },
  {
    "id": "card_b21_008_trap_hydrogen_gas_knallgas_detonation_trap_8",
    "name": "Bẫy Thoát Khí Hydro Nổ Tức Thời (Tầng Bẫy 1)",
    "name_en": "Hydrogen Gas Knallgas Detonation Trap (Barrier Level 1)",
    "cardType": "TRAP",
    "spellTrapSubtype": "NORMAL_TRAP",
    "spellSpeed": 2,
    "rarity": "ULTRA_RARE",
    "attribute": "PYRO",
    "manaCost": 4,
    "chemicalFormula": "2H2 + O2",
    "effectCode": "TRAP_B21_HYDROGEN_GAS_KNALLGAS_DETONATION_TRAP_NORM_8",
    "effectText": "[Bẫy Thường / Normal Trap - Spell Speed 2]: Khi quái thú đối phương tuyên bố tấn công: Hủy bỏ đòn tấn công và chuyển quái thú đó sang tư thế Phòng thủ, đồng thời gây 300 LP phản chấn.",
    "scientificLore": "Hiện tượng hóa học Bẫy Thoát Khí Hydro Nổ Tức Thời (2H₂ + O₂ → 2H₂O (Explosive Shockwave)) ngăn chặn sự lan truyền phản ứng hoặc bẫy bắt các ion tự do thành pha rắn/khí trơ theo chuẩn GDPT 2018.",
    "relatedEquation": "2H₂ + O₂ → 2H₂O (Explosive Shockwave)",
    "iupacName": "Hydrogen Gas Knallgas Detonation Trap Countermeasure",
    "archetype": "HALOGEN_PURGE",
    "structuredEffects": [
      {
        "effectId": "B21_EFF_8",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "APPLY_STATUS",
            "params": {
              "statusType": "POSITION_LOCKED",
              "turns": 1
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Chặn đứng đòn tấn công, khóa tư thế quái thú địch và gây 300 LP."
      }
    ]
  },
  {
    "id": "card_b21_009_trap_silver_chloride_precipitation_barrier_9",
    "name": "Bẫy Kết Tủa Bạc Clorua Trắng (Tầng Bẫy 2)",
    "name_en": "Silver Chloride Precipitation Barrier (Barrier Level 2)",
    "cardType": "TRAP",
    "spellTrapSubtype": "NORMAL_TRAP",
    "spellSpeed": 2,
    "rarity": "SECRET_RARE",
    "attribute": "TERRA",
    "manaCost": 1,
    "chemicalFormula": "AgCl↓",
    "effectCode": "TRAP_B21_SILVER_CHLORIDE_PRECIPITATION_BARRIER_NORM_9",
    "effectText": "[Bẫy Thường / Normal Trap - Spell Speed 2]: Khi quái thú đối phương tuyên bố tấn công: Hủy bỏ đòn tấn công và chuyển quái thú đó sang tư thế Phòng thủ, đồng thời gây 300 LP phản chấn.",
    "scientificLore": "Hiện tượng hóa học Bẫy Kết Tủa Bạc Clorua Trắng (Ag⁺(aq) + Cl⁻(aq) → AgCl(s)↓ (Ksp = 1.77×10⁻¹⁰)) ngăn chặn sự lan truyền phản ứng hoặc bẫy bắt các ion tự do thành pha rắn/khí trơ theo chuẩn GDPT 2018.",
    "relatedEquation": "Ag⁺(aq) + Cl⁻(aq) → AgCl(s)↓ (Ksp = 1.77×10⁻¹⁰)",
    "iupacName": "Silver Chloride Precipitation Barrier Countermeasure",
    "archetype": "PRECIPITATION_TRAP",
    "structuredEffects": [
      {
        "effectId": "B21_EFF_9",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "APPLY_STATUS",
            "params": {
              "statusType": "POSITION_LOCKED",
              "turns": 1
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Chặn đứng đòn tấn công, khóa tư thế quái thú địch và gây 300 LP."
      }
    ]
  },
  {
    "id": "card_b21_010_trap_dry_chemical_extinguisher_quench_10",
    "name": "Bẫy Phun Khí Bột Chữa Cháy NaHCO3 (Tầng Bẫy 2)",
    "name_en": "Dry Chemical Extinguisher Quench (Barrier Level 2)",
    "cardType": "TRAP",
    "spellTrapSubtype": "NORMAL_TRAP",
    "spellSpeed": 2,
    "rarity": "COMMON",
    "attribute": "AERO",
    "manaCost": 2,
    "chemicalFormula": "2NaHCO3",
    "effectCode": "TRAP_B21_DRY_CHEMICAL_EXTINGUISHER_QUENCH_NORM_10",
    "effectText": "[Bẫy Thường / Normal Trap - Spell Speed 2]: Khi quái thú đối phương tuyên bố tấn công: Hủy bỏ đòn tấn công và chuyển quái thú đó sang tư thế Phòng thủ, đồng thời gây 300 LP phản chấn.",
    "scientificLore": "Hiện tượng hóa học Bẫy Phun Khí Bột Chữa Cháy NaHCO3 (2NaHCO₃ --heat--> Na₂CO₃ + H₂O + CO₂↑) ngăn chặn sự lan truyền phản ứng hoặc bẫy bắt các ion tự do thành pha rắn/khí trơ theo chuẩn GDPT 2018.",
    "relatedEquation": "2NaHCO₃ --heat--> Na₂CO₃ + H₂O + CO₂↑",
    "iupacName": "Dry Chemical Extinguisher Quench Countermeasure",
    "archetype": "HALOGEN_PURGE",
    "structuredEffects": [
      {
        "effectId": "B21_EFF_10",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "APPLY_STATUS",
            "params": {
              "statusType": "POSITION_LOCKED",
              "turns": 1
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Chặn đứng đòn tấn công, khóa tư thế quái thú địch và gây 300 LP."
      }
    ]
  },
  {
    "id": "card_b21_011_trap_sacrificial_zinc_anode_discharge_11",
    "name": "Bẫy Anode Hy Sinh Chống Ăn Mòn (Tầng Bẫy 2)",
    "name_en": "Sacrificial Zinc Anode Discharge (Barrier Level 2)",
    "cardType": "TRAP",
    "spellTrapSubtype": "NORMAL_TRAP",
    "spellSpeed": 2,
    "rarity": "COMMON",
    "attribute": "ELECTRO",
    "manaCost": 3,
    "chemicalFormula": "Zn → Zn2+ + 2e-",
    "effectCode": "TRAP_B21_SACRIFICIAL_ZINC_ANODE_DISCHARGE_NORM_11",
    "effectText": "[Bẫy Thường / Normal Trap - Spell Speed 2]: Khi quái thú đối phương tuyên bố tấn công: Hủy bỏ đòn tấn công và chuyển quái thú đó sang tư thế Phòng thủ, đồng thời gây 300 LP phản chấn.",
    "scientificLore": "Hiện tượng hóa học Bẫy Anode Hy Sinh Chống Ăn Mòn (Zn(s) → Zn²⁺(aq) + 2e⁻ (E° = -0.76V vs Fe -0.44V)) ngăn chặn sự lan truyền phản ứng hoặc bẫy bắt các ion tự do thành pha rắn/khí trơ theo chuẩn GDPT 2018.",
    "relatedEquation": "Zn(s) → Zn²⁺(aq) + 2e⁻ (E° = -0.76V vs Fe -0.44V)",
    "iupacName": "Sacrificial Zinc Anode Discharge Countermeasure",
    "archetype": "PRECIPITATION_TRAP",
    "structuredEffects": [
      {
        "effectId": "B21_EFF_11",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "APPLY_STATUS",
            "params": {
              "statusType": "POSITION_LOCKED",
              "turns": 1
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Chặn đứng đòn tấn công, khóa tư thế quái thú địch và gây 300 LP."
      }
    ]
  },
  {
    "id": "card_b21_012_trap_heavy_barium_sulfate_blockade_12",
    "name": "Bẫy Kết Tủa Vàng Bari Sunfat (Tầng Bẫy 2)",
    "name_en": "Heavy Barium Sulfate Blockade (Barrier Level 2)",
    "cardType": "TRAP",
    "spellTrapSubtype": "NORMAL_TRAP",
    "spellSpeed": 2,
    "rarity": "COMMON",
    "attribute": "TERRA",
    "manaCost": 4,
    "chemicalFormula": "BaSO4↓",
    "effectCode": "TRAP_B21_HEAVY_BARIUM_SULFATE_BLOCKADE_NORM_12",
    "effectText": "[Bẫy Thường / Normal Trap - Spell Speed 2]: Khi quái thú đối phương tuyên bố tấn công: Hủy bỏ đòn tấn công và chuyển quái thú đó sang tư thế Phòng thủ, đồng thời gây 300 LP phản chấn.",
    "scientificLore": "Hiện tượng hóa học Bẫy Kết Tủa Vàng Bari Sunfat (Ba²⁺(aq) + SO₄²⁻(aq) → BaSO₄(s)↓ (Ksp = 1.08×10⁻¹⁰)) ngăn chặn sự lan truyền phản ứng hoặc bẫy bắt các ion tự do thành pha rắn/khí trơ theo chuẩn GDPT 2018.",
    "relatedEquation": "Ba²⁺(aq) + SO₄²⁻(aq) → BaSO₄(s)↓ (Ksp = 1.08×10⁻¹⁰)",
    "iupacName": "Heavy Barium Sulfate Blockade Countermeasure",
    "archetype": "HALOGEN_PURGE",
    "structuredEffects": [
      {
        "effectId": "B21_EFF_12",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "APPLY_STATUS",
            "params": {
              "statusType": "POSITION_LOCKED",
              "turns": 1
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Chặn đứng đòn tấn công, khóa tư thế quái thú địch và gây 300 LP."
      }
    ]
  },
  {
    "id": "card_b21_013_trap_bleach_hypochlorite_vapor_trap_13",
    "name": "Bẫy Khí Clo Khử Trùng Cực Mạnh (Tầng Bẫy 2)",
    "name_en": "Bleach Hypochlorite Vapor Trap (Barrier Level 2)",
    "cardType": "TRAP",
    "spellTrapSubtype": "NORMAL_TRAP",
    "spellSpeed": 2,
    "rarity": "RARE",
    "attribute": "AERO",
    "manaCost": 1,
    "chemicalFormula": "NaClO + HCl",
    "effectCode": "TRAP_B21_BLEACH_HYPOCHLORITE_VAPOR_TRAP_NORM_13",
    "effectText": "[Bẫy Thường / Normal Trap - Spell Speed 2]: Khi quái thú đối phương tuyên bố tấn công: Hủy bỏ đòn tấn công và chuyển quái thú đó sang tư thế Phòng thủ, đồng thời gây 300 LP phản chấn.",
    "scientificLore": "Hiện tượng hóa học Bẫy Khí Clo Khử Trùng Cực Mạnh (NaClO + 2HCl → NaCl + Cl₂↑ + H₂O) ngăn chặn sự lan truyền phản ứng hoặc bẫy bắt các ion tự do thành pha rắn/khí trơ theo chuẩn GDPT 2018.",
    "relatedEquation": "NaClO + 2HCl → NaCl + Cl₂↑ + H₂O",
    "iupacName": "Bleach Hypochlorite Vapor Trap Countermeasure",
    "archetype": "PRECIPITATION_TRAP",
    "structuredEffects": [
      {
        "effectId": "B21_EFF_13",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "APPLY_STATUS",
            "params": {
              "statusType": "POSITION_LOCKED",
              "turns": 1
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Chặn đứng đòn tấn công, khóa tư thế quái thú địch và gây 300 LP."
      }
    ]
  },
  {
    "id": "card_b21_014_trap_activated_carbon_adsorption_net_14",
    "name": "Bẫy Hấp Phụ Khí Độc Bằng Than Hoạt Tính (Tầng Bẫy 2)",
    "name_en": "Activated Carbon Adsorption Net (Barrier Level 2)",
    "cardType": "TRAP",
    "spellTrapSubtype": "NORMAL_TRAP",
    "spellSpeed": 2,
    "rarity": "RARE",
    "attribute": "TERRA",
    "manaCost": 2,
    "chemicalFormula": "C(adsorb)",
    "effectCode": "TRAP_B21_ACTIVATED_CARBON_ADSORPTION_NET_NORM_14",
    "effectText": "[Bẫy Thường / Normal Trap - Spell Speed 2]: Khi quái thú đối phương tuyên bố tấn công: Hủy bỏ đòn tấn công và chuyển quái thú đó sang tư thế Phòng thủ, đồng thời gây 300 LP phản chấn.",
    "scientificLore": "Hiện tượng hóa học Bẫy Hấp Phụ Khí Độc Bằng Than Hoạt Tính (Langmuir / Freundlich Multilayer Adsorption) ngăn chặn sự lan truyền phản ứng hoặc bẫy bắt các ion tự do thành pha rắn/khí trơ theo chuẩn GDPT 2018.",
    "relatedEquation": "Langmuir / Freundlich Multilayer Adsorption",
    "iupacName": "Activated Carbon Adsorption Net Countermeasure",
    "archetype": "HALOGEN_PURGE",
    "structuredEffects": [
      {
        "effectId": "B21_EFF_14",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "APPLY_STATUS",
            "params": {
              "statusType": "POSITION_LOCKED",
              "turns": 1
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Chặn đứng đòn tấn công, khóa tư thế quái thú địch và gây 300 LP."
      }
    ]
  },
  {
    "id": "card_b21_015_trap_lead_ii__iodide_golden_rain_trap_15",
    "name": "Bẫy Kết Tủa Chì(II) Iotua Hoàng Kim (Tầng Bẫy 2)",
    "name_en": "Lead(II) Iodide Golden Rain Trap (Barrier Level 2)",
    "cardType": "TRAP",
    "spellTrapSubtype": "NORMAL_TRAP",
    "spellSpeed": 2,
    "rarity": "SUPER_RARE",
    "attribute": "TERRA",
    "manaCost": 3,
    "chemicalFormula": "PbI2↓",
    "effectCode": "TRAP_B21_LEAD_II__IODIDE_GOLDEN_RAIN_TRAP_NORM_15",
    "effectText": "[Bẫy Thường / Normal Trap - Spell Speed 2]: Khi quái thú đối phương tuyên bố tấn công: Hủy bỏ đòn tấn công và chuyển quái thú đó sang tư thế Phòng thủ, đồng thời gây 300 LP phản chấn.",
    "scientificLore": "Hiện tượng hóa học Bẫy Kết Tủa Chì(II) Iotua Hoàng Kim (Pb²⁺(aq) + 2I⁻(aq) → PbI₂(s)↓ (Golden Glitter)) ngăn chặn sự lan truyền phản ứng hoặc bẫy bắt các ion tự do thành pha rắn/khí trơ theo chuẩn GDPT 2018.",
    "relatedEquation": "Pb²⁺(aq) + 2I⁻(aq) → PbI₂(s)↓ (Golden Glitter)",
    "iupacName": "Lead(II) Iodide Golden Rain Trap Countermeasure",
    "archetype": "PRECIPITATION_TRAP",
    "structuredEffects": [
      {
        "effectId": "B21_EFF_15",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "APPLY_STATUS",
            "params": {
              "statusType": "POSITION_LOCKED",
              "turns": 1
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Chặn đứng đòn tấn công, khóa tư thế quái thú địch và gây 300 LP."
      }
    ]
  },
  {
    "id": "card_b21_016_trap_hydrogen_gas_knallgas_detonation_trap_16",
    "name": "Bẫy Thoát Khí Hydro Nổ Tức Thời (Tầng Bẫy 2)",
    "name_en": "Hydrogen Gas Knallgas Detonation Trap (Barrier Level 2)",
    "cardType": "TRAP",
    "spellTrapSubtype": "NORMAL_TRAP",
    "spellSpeed": 2,
    "rarity": "SUPER_RARE",
    "attribute": "PYRO",
    "manaCost": 4,
    "chemicalFormula": "2H2 + O2",
    "effectCode": "TRAP_B21_HYDROGEN_GAS_KNALLGAS_DETONATION_TRAP_NORM_16",
    "effectText": "[Bẫy Thường / Normal Trap - Spell Speed 2]: Khi quái thú đối phương tuyên bố tấn công: Hủy bỏ đòn tấn công và chuyển quái thú đó sang tư thế Phòng thủ, đồng thời gây 300 LP phản chấn.",
    "scientificLore": "Hiện tượng hóa học Bẫy Thoát Khí Hydro Nổ Tức Thời (2H₂ + O₂ → 2H₂O (Explosive Shockwave)) ngăn chặn sự lan truyền phản ứng hoặc bẫy bắt các ion tự do thành pha rắn/khí trơ theo chuẩn GDPT 2018.",
    "relatedEquation": "2H₂ + O₂ → 2H₂O (Explosive Shockwave)",
    "iupacName": "Hydrogen Gas Knallgas Detonation Trap Countermeasure",
    "archetype": "HALOGEN_PURGE",
    "structuredEffects": [
      {
        "effectId": "B21_EFF_16",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "APPLY_STATUS",
            "params": {
              "statusType": "POSITION_LOCKED",
              "turns": 1
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Chặn đứng đòn tấn công, khóa tư thế quái thú địch và gây 300 LP."
      }
    ]
  },
  {
    "id": "card_b21_017_trap_silver_chloride_precipitation_barrier_17",
    "name": "Bẫy Kết Tủa Bạc Clorua Trắng (Tầng Bẫy 3)",
    "name_en": "Silver Chloride Precipitation Barrier (Barrier Level 3)",
    "cardType": "TRAP",
    "spellTrapSubtype": "NORMAL_TRAP",
    "spellSpeed": 2,
    "rarity": "ULTRA_RARE",
    "attribute": "TERRA",
    "manaCost": 1,
    "chemicalFormula": "AgCl↓",
    "effectCode": "TRAP_B21_SILVER_CHLORIDE_PRECIPITATION_BARRIER_NORM_17",
    "effectText": "[Bẫy Thường / Normal Trap - Spell Speed 2]: Khi quái thú đối phương tuyên bố tấn công: Hủy bỏ đòn tấn công và chuyển quái thú đó sang tư thế Phòng thủ, đồng thời gây 300 LP phản chấn.",
    "scientificLore": "Hiện tượng hóa học Bẫy Kết Tủa Bạc Clorua Trắng (Ag⁺(aq) + Cl⁻(aq) → AgCl(s)↓ (Ksp = 1.77×10⁻¹⁰)) ngăn chặn sự lan truyền phản ứng hoặc bẫy bắt các ion tự do thành pha rắn/khí trơ theo chuẩn GDPT 2018.",
    "relatedEquation": "Ag⁺(aq) + Cl⁻(aq) → AgCl(s)↓ (Ksp = 1.77×10⁻¹⁰)",
    "iupacName": "Silver Chloride Precipitation Barrier Countermeasure",
    "archetype": "PRECIPITATION_TRAP",
    "structuredEffects": [
      {
        "effectId": "B21_EFF_17",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "APPLY_STATUS",
            "params": {
              "statusType": "POSITION_LOCKED",
              "turns": 1
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Chặn đứng đòn tấn công, khóa tư thế quái thú địch và gây 300 LP."
      }
    ]
  },
  {
    "id": "card_b21_018_trap_dry_chemical_extinguisher_quench_18",
    "name": "Bẫy Phun Khí Bột Chữa Cháy NaHCO3 (Tầng Bẫy 3)",
    "name_en": "Dry Chemical Extinguisher Quench (Barrier Level 3)",
    "cardType": "TRAP",
    "spellTrapSubtype": "NORMAL_TRAP",
    "spellSpeed": 2,
    "rarity": "SECRET_RARE",
    "attribute": "AERO",
    "manaCost": 2,
    "chemicalFormula": "2NaHCO3",
    "effectCode": "TRAP_B21_DRY_CHEMICAL_EXTINGUISHER_QUENCH_NORM_18",
    "effectText": "[Bẫy Thường / Normal Trap - Spell Speed 2]: Khi quái thú đối phương tuyên bố tấn công: Hủy bỏ đòn tấn công và chuyển quái thú đó sang tư thế Phòng thủ, đồng thời gây 300 LP phản chấn.",
    "scientificLore": "Hiện tượng hóa học Bẫy Phun Khí Bột Chữa Cháy NaHCO3 (2NaHCO₃ --heat--> Na₂CO₃ + H₂O + CO₂↑) ngăn chặn sự lan truyền phản ứng hoặc bẫy bắt các ion tự do thành pha rắn/khí trơ theo chuẩn GDPT 2018.",
    "relatedEquation": "2NaHCO₃ --heat--> Na₂CO₃ + H₂O + CO₂↑",
    "iupacName": "Dry Chemical Extinguisher Quench Countermeasure",
    "archetype": "HALOGEN_PURGE",
    "structuredEffects": [
      {
        "effectId": "B21_EFF_18",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "APPLY_STATUS",
            "params": {
              "statusType": "POSITION_LOCKED",
              "turns": 1
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Chặn đứng đòn tấn công, khóa tư thế quái thú địch và gây 300 LP."
      }
    ]
  },
  {
    "id": "card_b21_019_trap_sacrificial_zinc_anode_discharge_19",
    "name": "Bẫy Anode Hy Sinh Chống Ăn Mòn (Tầng Bẫy 3)",
    "name_en": "Sacrificial Zinc Anode Discharge (Barrier Level 3)",
    "cardType": "TRAP",
    "spellTrapSubtype": "NORMAL_TRAP",
    "spellSpeed": 2,
    "rarity": "COMMON",
    "attribute": "ELECTRO",
    "manaCost": 3,
    "chemicalFormula": "Zn → Zn2+ + 2e-",
    "effectCode": "TRAP_B21_SACRIFICIAL_ZINC_ANODE_DISCHARGE_NORM_19",
    "effectText": "[Bẫy Thường / Normal Trap - Spell Speed 2]: Khi quái thú đối phương tuyên bố tấn công: Hủy bỏ đòn tấn công và chuyển quái thú đó sang tư thế Phòng thủ, đồng thời gây 300 LP phản chấn.",
    "scientificLore": "Hiện tượng hóa học Bẫy Anode Hy Sinh Chống Ăn Mòn (Zn(s) → Zn²⁺(aq) + 2e⁻ (E° = -0.76V vs Fe -0.44V)) ngăn chặn sự lan truyền phản ứng hoặc bẫy bắt các ion tự do thành pha rắn/khí trơ theo chuẩn GDPT 2018.",
    "relatedEquation": "Zn(s) → Zn²⁺(aq) + 2e⁻ (E° = -0.76V vs Fe -0.44V)",
    "iupacName": "Sacrificial Zinc Anode Discharge Countermeasure",
    "archetype": "PRECIPITATION_TRAP",
    "structuredEffects": [
      {
        "effectId": "B21_EFF_19",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "APPLY_STATUS",
            "params": {
              "statusType": "POSITION_LOCKED",
              "turns": 1
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Chặn đứng đòn tấn công, khóa tư thế quái thú địch và gây 300 LP."
      }
    ]
  },
  {
    "id": "card_b21_020_trap_heavy_barium_sulfate_blockade_20",
    "name": "Bẫy Kết Tủa Vàng Bari Sunfat (Tầng Bẫy 3)",
    "name_en": "Heavy Barium Sulfate Blockade (Barrier Level 3)",
    "cardType": "TRAP",
    "spellTrapSubtype": "NORMAL_TRAP",
    "spellSpeed": 2,
    "rarity": "COMMON",
    "attribute": "TERRA",
    "manaCost": 4,
    "chemicalFormula": "BaSO4↓",
    "effectCode": "TRAP_B21_HEAVY_BARIUM_SULFATE_BLOCKADE_NORM_20",
    "effectText": "[Bẫy Thường / Normal Trap - Spell Speed 2]: Khi quái thú đối phương tuyên bố tấn công: Hủy bỏ đòn tấn công và chuyển quái thú đó sang tư thế Phòng thủ, đồng thời gây 300 LP phản chấn.",
    "scientificLore": "Hiện tượng hóa học Bẫy Kết Tủa Vàng Bari Sunfat (Ba²⁺(aq) + SO₄²⁻(aq) → BaSO₄(s)↓ (Ksp = 1.08×10⁻¹⁰)) ngăn chặn sự lan truyền phản ứng hoặc bẫy bắt các ion tự do thành pha rắn/khí trơ theo chuẩn GDPT 2018.",
    "relatedEquation": "Ba²⁺(aq) + SO₄²⁻(aq) → BaSO₄(s)↓ (Ksp = 1.08×10⁻¹⁰)",
    "iupacName": "Heavy Barium Sulfate Blockade Countermeasure",
    "archetype": "HALOGEN_PURGE",
    "structuredEffects": [
      {
        "effectId": "B21_EFF_20",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "APPLY_STATUS",
            "params": {
              "statusType": "POSITION_LOCKED",
              "turns": 1
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Chặn đứng đòn tấn công, khóa tư thế quái thú địch và gây 300 LP."
      }
    ]
  },
  {
    "id": "card_b21_021_trap_bleach_hypochlorite_vapor_trap_21",
    "name": "Bẫy Khí Clo Khử Trùng Cực Mạnh (Tầng Bẫy 3)",
    "name_en": "Bleach Hypochlorite Vapor Trap (Barrier Level 3)",
    "cardType": "TRAP",
    "spellTrapSubtype": "NORMAL_TRAP",
    "spellSpeed": 2,
    "rarity": "COMMON",
    "attribute": "AERO",
    "manaCost": 1,
    "chemicalFormula": "NaClO + HCl",
    "effectCode": "TRAP_B21_BLEACH_HYPOCHLORITE_VAPOR_TRAP_NORM_21",
    "effectText": "[Bẫy Thường / Normal Trap - Spell Speed 2]: Khi quái thú đối phương tuyên bố tấn công: Hủy bỏ đòn tấn công và chuyển quái thú đó sang tư thế Phòng thủ, đồng thời gây 300 LP phản chấn.",
    "scientificLore": "Hiện tượng hóa học Bẫy Khí Clo Khử Trùng Cực Mạnh (NaClO + 2HCl → NaCl + Cl₂↑ + H₂O) ngăn chặn sự lan truyền phản ứng hoặc bẫy bắt các ion tự do thành pha rắn/khí trơ theo chuẩn GDPT 2018.",
    "relatedEquation": "NaClO + 2HCl → NaCl + Cl₂↑ + H₂O",
    "iupacName": "Bleach Hypochlorite Vapor Trap Countermeasure",
    "archetype": "PRECIPITATION_TRAP",
    "structuredEffects": [
      {
        "effectId": "B21_EFF_21",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "APPLY_STATUS",
            "params": {
              "statusType": "POSITION_LOCKED",
              "turns": 1
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Chặn đứng đòn tấn công, khóa tư thế quái thú địch và gây 300 LP."
      }
    ]
  },
  {
    "id": "card_b21_022_trap_activated_carbon_adsorption_net_22",
    "name": "Bẫy Hấp Phụ Khí Độc Bằng Than Hoạt Tính (Tầng Bẫy 3)",
    "name_en": "Activated Carbon Adsorption Net (Barrier Level 3)",
    "cardType": "TRAP",
    "spellTrapSubtype": "NORMAL_TRAP",
    "spellSpeed": 2,
    "rarity": "RARE",
    "attribute": "TERRA",
    "manaCost": 2,
    "chemicalFormula": "C(adsorb)",
    "effectCode": "TRAP_B21_ACTIVATED_CARBON_ADSORPTION_NET_NORM_22",
    "effectText": "[Bẫy Thường / Normal Trap - Spell Speed 2]: Khi quái thú đối phương tuyên bố tấn công: Hủy bỏ đòn tấn công và chuyển quái thú đó sang tư thế Phòng thủ, đồng thời gây 300 LP phản chấn.",
    "scientificLore": "Hiện tượng hóa học Bẫy Hấp Phụ Khí Độc Bằng Than Hoạt Tính (Langmuir / Freundlich Multilayer Adsorption) ngăn chặn sự lan truyền phản ứng hoặc bẫy bắt các ion tự do thành pha rắn/khí trơ theo chuẩn GDPT 2018.",
    "relatedEquation": "Langmuir / Freundlich Multilayer Adsorption",
    "iupacName": "Activated Carbon Adsorption Net Countermeasure",
    "archetype": "HALOGEN_PURGE",
    "structuredEffects": [
      {
        "effectId": "B21_EFF_22",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "APPLY_STATUS",
            "params": {
              "statusType": "POSITION_LOCKED",
              "turns": 1
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Chặn đứng đòn tấn công, khóa tư thế quái thú địch và gây 300 LP."
      }
    ]
  },
  {
    "id": "card_b21_023_trap_lead_ii__iodide_golden_rain_trap_23",
    "name": "Bẫy Kết Tủa Chì(II) Iotua Hoàng Kim (Tầng Bẫy 3)",
    "name_en": "Lead(II) Iodide Golden Rain Trap (Barrier Level 3)",
    "cardType": "TRAP",
    "spellTrapSubtype": "NORMAL_TRAP",
    "spellSpeed": 2,
    "rarity": "RARE",
    "attribute": "TERRA",
    "manaCost": 3,
    "chemicalFormula": "PbI2↓",
    "effectCode": "TRAP_B21_LEAD_II__IODIDE_GOLDEN_RAIN_TRAP_NORM_23",
    "effectText": "[Bẫy Thường / Normal Trap - Spell Speed 2]: Khi quái thú đối phương tuyên bố tấn công: Hủy bỏ đòn tấn công và chuyển quái thú đó sang tư thế Phòng thủ, đồng thời gây 300 LP phản chấn.",
    "scientificLore": "Hiện tượng hóa học Bẫy Kết Tủa Chì(II) Iotua Hoàng Kim (Pb²⁺(aq) + 2I⁻(aq) → PbI₂(s)↓ (Golden Glitter)) ngăn chặn sự lan truyền phản ứng hoặc bẫy bắt các ion tự do thành pha rắn/khí trơ theo chuẩn GDPT 2018.",
    "relatedEquation": "Pb²⁺(aq) + 2I⁻(aq) → PbI₂(s)↓ (Golden Glitter)",
    "iupacName": "Lead(II) Iodide Golden Rain Trap Countermeasure",
    "archetype": "PRECIPITATION_TRAP",
    "structuredEffects": [
      {
        "effectId": "B21_EFF_23",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "APPLY_STATUS",
            "params": {
              "statusType": "POSITION_LOCKED",
              "turns": 1
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Chặn đứng đòn tấn công, khóa tư thế quái thú địch và gây 300 LP."
      }
    ]
  },
  {
    "id": "card_b21_024_trap_hydrogen_gas_knallgas_detonation_trap_24",
    "name": "Bẫy Thoát Khí Hydro Nổ Tức Thời (Tầng Bẫy 3)",
    "name_en": "Hydrogen Gas Knallgas Detonation Trap (Barrier Level 3)",
    "cardType": "TRAP",
    "spellTrapSubtype": "NORMAL_TRAP",
    "spellSpeed": 2,
    "rarity": "SUPER_RARE",
    "attribute": "PYRO",
    "manaCost": 4,
    "chemicalFormula": "2H2 + O2",
    "effectCode": "TRAP_B21_HYDROGEN_GAS_KNALLGAS_DETONATION_TRAP_NORM_24",
    "effectText": "[Bẫy Thường / Normal Trap - Spell Speed 2]: Khi quái thú đối phương tuyên bố tấn công: Hủy bỏ đòn tấn công và chuyển quái thú đó sang tư thế Phòng thủ, đồng thời gây 300 LP phản chấn.",
    "scientificLore": "Hiện tượng hóa học Bẫy Thoát Khí Hydro Nổ Tức Thời (2H₂ + O₂ → 2H₂O (Explosive Shockwave)) ngăn chặn sự lan truyền phản ứng hoặc bẫy bắt các ion tự do thành pha rắn/khí trơ theo chuẩn GDPT 2018.",
    "relatedEquation": "2H₂ + O₂ → 2H₂O (Explosive Shockwave)",
    "iupacName": "Hydrogen Gas Knallgas Detonation Trap Countermeasure",
    "archetype": "HALOGEN_PURGE",
    "structuredEffects": [
      {
        "effectId": "B21_EFF_24",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "APPLY_STATUS",
            "params": {
              "statusType": "POSITION_LOCKED",
              "turns": 1
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Chặn đứng đòn tấn công, khóa tư thế quái thú địch và gây 300 LP."
      }
    ]
  },
  {
    "id": "card_b21_025_trap_silver_chloride_precipitation_barrier_25",
    "name": "Bẫy Kết Tủa Bạc Clorua Trắng (Tầng Bẫy 4)",
    "name_en": "Silver Chloride Precipitation Barrier (Barrier Level 4)",
    "cardType": "TRAP",
    "spellTrapSubtype": "NORMAL_TRAP",
    "spellSpeed": 2,
    "rarity": "SUPER_RARE",
    "attribute": "TERRA",
    "manaCost": 1,
    "chemicalFormula": "AgCl↓",
    "effectCode": "TRAP_B21_SILVER_CHLORIDE_PRECIPITATION_BARRIER_NORM_25",
    "effectText": "[Bẫy Thường / Normal Trap - Spell Speed 2]: Khi quái thú đối phương tuyên bố tấn công: Hủy bỏ đòn tấn công và chuyển quái thú đó sang tư thế Phòng thủ, đồng thời gây 300 LP phản chấn.",
    "scientificLore": "Hiện tượng hóa học Bẫy Kết Tủa Bạc Clorua Trắng (Ag⁺(aq) + Cl⁻(aq) → AgCl(s)↓ (Ksp = 1.77×10⁻¹⁰)) ngăn chặn sự lan truyền phản ứng hoặc bẫy bắt các ion tự do thành pha rắn/khí trơ theo chuẩn GDPT 2018.",
    "relatedEquation": "Ag⁺(aq) + Cl⁻(aq) → AgCl(s)↓ (Ksp = 1.77×10⁻¹⁰)",
    "iupacName": "Silver Chloride Precipitation Barrier Countermeasure",
    "archetype": "PRECIPITATION_TRAP",
    "structuredEffects": [
      {
        "effectId": "B21_EFF_25",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "APPLY_STATUS",
            "params": {
              "statusType": "POSITION_LOCKED",
              "turns": 1
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Chặn đứng đòn tấn công, khóa tư thế quái thú địch và gây 300 LP."
      }
    ]
  },
  {
    "id": "card_b21_026_trap_dry_chemical_extinguisher_quench_26",
    "name": "Bẫy Phun Khí Bột Chữa Cháy NaHCO3 (Tầng Bẫy 4)",
    "name_en": "Dry Chemical Extinguisher Quench (Barrier Level 4)",
    "cardType": "TRAP",
    "spellTrapSubtype": "NORMAL_TRAP",
    "spellSpeed": 2,
    "rarity": "ULTRA_RARE",
    "attribute": "AERO",
    "manaCost": 2,
    "chemicalFormula": "2NaHCO3",
    "effectCode": "TRAP_B21_DRY_CHEMICAL_EXTINGUISHER_QUENCH_NORM_26",
    "effectText": "[Bẫy Thường / Normal Trap - Spell Speed 2]: Khi quái thú đối phương tuyên bố tấn công: Hủy bỏ đòn tấn công và chuyển quái thú đó sang tư thế Phòng thủ, đồng thời gây 300 LP phản chấn.",
    "scientificLore": "Hiện tượng hóa học Bẫy Phun Khí Bột Chữa Cháy NaHCO3 (2NaHCO₃ --heat--> Na₂CO₃ + H₂O + CO₂↑) ngăn chặn sự lan truyền phản ứng hoặc bẫy bắt các ion tự do thành pha rắn/khí trơ theo chuẩn GDPT 2018.",
    "relatedEquation": "2NaHCO₃ --heat--> Na₂CO₃ + H₂O + CO₂↑",
    "iupacName": "Dry Chemical Extinguisher Quench Countermeasure",
    "archetype": "HALOGEN_PURGE",
    "structuredEffects": [
      {
        "effectId": "B21_EFF_26",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "APPLY_STATUS",
            "params": {
              "statusType": "POSITION_LOCKED",
              "turns": 1
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Chặn đứng đòn tấn công, khóa tư thế quái thú địch và gây 300 LP."
      }
    ]
  },
  {
    "id": "card_b21_027_trap_sacrificial_zinc_anode_discharge_27",
    "name": "Bẫy Anode Hy Sinh Chống Ăn Mòn (Tầng Bẫy 4)",
    "name_en": "Sacrificial Zinc Anode Discharge (Barrier Level 4)",
    "cardType": "TRAP",
    "spellTrapSubtype": "NORMAL_TRAP",
    "spellSpeed": 2,
    "rarity": "SECRET_RARE",
    "attribute": "ELECTRO",
    "manaCost": 3,
    "chemicalFormula": "Zn → Zn2+ + 2e-",
    "effectCode": "TRAP_B21_SACRIFICIAL_ZINC_ANODE_DISCHARGE_NORM_27",
    "effectText": "[Bẫy Thường / Normal Trap - Spell Speed 2]: Khi quái thú đối phương tuyên bố tấn công: Hủy bỏ đòn tấn công và chuyển quái thú đó sang tư thế Phòng thủ, đồng thời gây 300 LP phản chấn.",
    "scientificLore": "Hiện tượng hóa học Bẫy Anode Hy Sinh Chống Ăn Mòn (Zn(s) → Zn²⁺(aq) + 2e⁻ (E° = -0.76V vs Fe -0.44V)) ngăn chặn sự lan truyền phản ứng hoặc bẫy bắt các ion tự do thành pha rắn/khí trơ theo chuẩn GDPT 2018.",
    "relatedEquation": "Zn(s) → Zn²⁺(aq) + 2e⁻ (E° = -0.76V vs Fe -0.44V)",
    "iupacName": "Sacrificial Zinc Anode Discharge Countermeasure",
    "archetype": "PRECIPITATION_TRAP",
    "structuredEffects": [
      {
        "effectId": "B21_EFF_27",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "APPLY_STATUS",
            "params": {
              "statusType": "POSITION_LOCKED",
              "turns": 1
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Chặn đứng đòn tấn công, khóa tư thế quái thú địch và gây 300 LP."
      }
    ]
  },
  {
    "id": "card_b21_028_trap_heavy_barium_sulfate_blockade_28",
    "name": "Bẫy Kết Tủa Vàng Bari Sunfat (Tầng Bẫy 4)",
    "name_en": "Heavy Barium Sulfate Blockade (Barrier Level 4)",
    "cardType": "TRAP",
    "spellTrapSubtype": "NORMAL_TRAP",
    "spellSpeed": 2,
    "rarity": "COMMON",
    "attribute": "TERRA",
    "manaCost": 4,
    "chemicalFormula": "BaSO4↓",
    "effectCode": "TRAP_B21_HEAVY_BARIUM_SULFATE_BLOCKADE_NORM_28",
    "effectText": "[Bẫy Thường / Normal Trap - Spell Speed 2]: Khi quái thú đối phương tuyên bố tấn công: Hủy bỏ đòn tấn công và chuyển quái thú đó sang tư thế Phòng thủ, đồng thời gây 300 LP phản chấn.",
    "scientificLore": "Hiện tượng hóa học Bẫy Kết Tủa Vàng Bari Sunfat (Ba²⁺(aq) + SO₄²⁻(aq) → BaSO₄(s)↓ (Ksp = 1.08×10⁻¹⁰)) ngăn chặn sự lan truyền phản ứng hoặc bẫy bắt các ion tự do thành pha rắn/khí trơ theo chuẩn GDPT 2018.",
    "relatedEquation": "Ba²⁺(aq) + SO₄²⁻(aq) → BaSO₄(s)↓ (Ksp = 1.08×10⁻¹⁰)",
    "iupacName": "Heavy Barium Sulfate Blockade Countermeasure",
    "archetype": "HALOGEN_PURGE",
    "structuredEffects": [
      {
        "effectId": "B21_EFF_28",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "APPLY_STATUS",
            "params": {
              "statusType": "POSITION_LOCKED",
              "turns": 1
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Chặn đứng đòn tấn công, khóa tư thế quái thú địch và gây 300 LP."
      }
    ]
  },
  {
    "id": "card_b21_029_trap_bleach_hypochlorite_vapor_trap_29",
    "name": "Bẫy Khí Clo Khử Trùng Cực Mạnh (Tầng Bẫy 4)",
    "name_en": "Bleach Hypochlorite Vapor Trap (Barrier Level 4)",
    "cardType": "TRAP",
    "spellTrapSubtype": "NORMAL_TRAP",
    "spellSpeed": 2,
    "rarity": "COMMON",
    "attribute": "AERO",
    "manaCost": 1,
    "chemicalFormula": "NaClO + HCl",
    "effectCode": "TRAP_B21_BLEACH_HYPOCHLORITE_VAPOR_TRAP_NORM_29",
    "effectText": "[Bẫy Thường / Normal Trap - Spell Speed 2]: Khi quái thú đối phương tuyên bố tấn công: Hủy bỏ đòn tấn công và chuyển quái thú đó sang tư thế Phòng thủ, đồng thời gây 300 LP phản chấn.",
    "scientificLore": "Hiện tượng hóa học Bẫy Khí Clo Khử Trùng Cực Mạnh (NaClO + 2HCl → NaCl + Cl₂↑ + H₂O) ngăn chặn sự lan truyền phản ứng hoặc bẫy bắt các ion tự do thành pha rắn/khí trơ theo chuẩn GDPT 2018.",
    "relatedEquation": "NaClO + 2HCl → NaCl + Cl₂↑ + H₂O",
    "iupacName": "Bleach Hypochlorite Vapor Trap Countermeasure",
    "archetype": "PRECIPITATION_TRAP",
    "structuredEffects": [
      {
        "effectId": "B21_EFF_29",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "APPLY_STATUS",
            "params": {
              "statusType": "POSITION_LOCKED",
              "turns": 1
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Chặn đứng đòn tấn công, khóa tư thế quái thú địch và gây 300 LP."
      }
    ]
  },
  {
    "id": "card_b21_030_trap_activated_carbon_adsorption_net_30",
    "name": "Bẫy Hấp Phụ Khí Độc Bằng Than Hoạt Tính (Tầng Bẫy 4)",
    "name_en": "Activated Carbon Adsorption Net (Barrier Level 4)",
    "cardType": "TRAP",
    "spellTrapSubtype": "NORMAL_TRAP",
    "spellSpeed": 2,
    "rarity": "COMMON",
    "attribute": "TERRA",
    "manaCost": 2,
    "chemicalFormula": "C(adsorb)",
    "effectCode": "TRAP_B21_ACTIVATED_CARBON_ADSORPTION_NET_NORM_30",
    "effectText": "[Bẫy Thường / Normal Trap - Spell Speed 2]: Khi quái thú đối phương tuyên bố tấn công: Hủy bỏ đòn tấn công và chuyển quái thú đó sang tư thế Phòng thủ, đồng thời gây 300 LP phản chấn.",
    "scientificLore": "Hiện tượng hóa học Bẫy Hấp Phụ Khí Độc Bằng Than Hoạt Tính (Langmuir / Freundlich Multilayer Adsorption) ngăn chặn sự lan truyền phản ứng hoặc bẫy bắt các ion tự do thành pha rắn/khí trơ theo chuẩn GDPT 2018.",
    "relatedEquation": "Langmuir / Freundlich Multilayer Adsorption",
    "iupacName": "Activated Carbon Adsorption Net Countermeasure",
    "archetype": "HALOGEN_PURGE",
    "structuredEffects": [
      {
        "effectId": "B21_EFF_30",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "APPLY_STATUS",
            "params": {
              "statusType": "POSITION_LOCKED",
              "turns": 1
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Chặn đứng đòn tấn công, khóa tư thế quái thú địch và gây 300 LP."
      }
    ]
  },
  {
    "id": "card_b21_031_trap_lead_ii__iodide_golden_rain_trap_31",
    "name": "Bẫy Kết Tủa Chì(II) Iotua Hoàng Kim (Tầng Bẫy 4)",
    "name_en": "Lead(II) Iodide Golden Rain Trap (Barrier Level 4)",
    "cardType": "TRAP",
    "spellTrapSubtype": "NORMAL_TRAP",
    "spellSpeed": 2,
    "rarity": "RARE",
    "attribute": "TERRA",
    "manaCost": 3,
    "chemicalFormula": "PbI2↓",
    "effectCode": "TRAP_B21_LEAD_II__IODIDE_GOLDEN_RAIN_TRAP_NORM_31",
    "effectText": "[Bẫy Thường / Normal Trap - Spell Speed 2]: Khi quái thú đối phương tuyên bố tấn công: Hủy bỏ đòn tấn công và chuyển quái thú đó sang tư thế Phòng thủ, đồng thời gây 300 LP phản chấn.",
    "scientificLore": "Hiện tượng hóa học Bẫy Kết Tủa Chì(II) Iotua Hoàng Kim (Pb²⁺(aq) + 2I⁻(aq) → PbI₂(s)↓ (Golden Glitter)) ngăn chặn sự lan truyền phản ứng hoặc bẫy bắt các ion tự do thành pha rắn/khí trơ theo chuẩn GDPT 2018.",
    "relatedEquation": "Pb²⁺(aq) + 2I⁻(aq) → PbI₂(s)↓ (Golden Glitter)",
    "iupacName": "Lead(II) Iodide Golden Rain Trap Countermeasure",
    "archetype": "PRECIPITATION_TRAP",
    "structuredEffects": [
      {
        "effectId": "B21_EFF_31",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "APPLY_STATUS",
            "params": {
              "statusType": "POSITION_LOCKED",
              "turns": 1
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Chặn đứng đòn tấn công, khóa tư thế quái thú địch và gây 300 LP."
      }
    ]
  },
  {
    "id": "card_b21_032_trap_hydrogen_gas_knallgas_detonation_trap_32",
    "name": "Bẫy Thoát Khí Hydro Nổ Tức Thời (Tầng Bẫy 4)",
    "name_en": "Hydrogen Gas Knallgas Detonation Trap (Barrier Level 4)",
    "cardType": "TRAP",
    "spellTrapSubtype": "NORMAL_TRAP",
    "spellSpeed": 2,
    "rarity": "RARE",
    "attribute": "PYRO",
    "manaCost": 4,
    "chemicalFormula": "2H2 + O2",
    "effectCode": "TRAP_B21_HYDROGEN_GAS_KNALLGAS_DETONATION_TRAP_NORM_32",
    "effectText": "[Bẫy Thường / Normal Trap - Spell Speed 2]: Khi quái thú đối phương tuyên bố tấn công: Hủy bỏ đòn tấn công và chuyển quái thú đó sang tư thế Phòng thủ, đồng thời gây 300 LP phản chấn.",
    "scientificLore": "Hiện tượng hóa học Bẫy Thoát Khí Hydro Nổ Tức Thời (2H₂ + O₂ → 2H₂O (Explosive Shockwave)) ngăn chặn sự lan truyền phản ứng hoặc bẫy bắt các ion tự do thành pha rắn/khí trơ theo chuẩn GDPT 2018.",
    "relatedEquation": "2H₂ + O₂ → 2H₂O (Explosive Shockwave)",
    "iupacName": "Hydrogen Gas Knallgas Detonation Trap Countermeasure",
    "archetype": "HALOGEN_PURGE",
    "structuredEffects": [
      {
        "effectId": "B21_EFF_32",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "APPLY_STATUS",
            "params": {
              "statusType": "POSITION_LOCKED",
              "turns": 1
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Chặn đứng đòn tấn công, khóa tư thế quái thú địch và gây 300 LP."
      }
    ]
  },
  {
    "id": "card_b21_033_trap_silver_chloride_precipitation_barrier_33",
    "name": "Bẫy Kết Tủa Bạc Clorua Trắng (Tầng Bẫy 5)",
    "name_en": "Silver Chloride Precipitation Barrier (Barrier Level 5)",
    "cardType": "TRAP",
    "spellTrapSubtype": "NORMAL_TRAP",
    "spellSpeed": 2,
    "rarity": "SUPER_RARE",
    "attribute": "TERRA",
    "manaCost": 1,
    "chemicalFormula": "AgCl↓",
    "effectCode": "TRAP_B21_SILVER_CHLORIDE_PRECIPITATION_BARRIER_NORM_33",
    "effectText": "[Bẫy Thường / Normal Trap - Spell Speed 2]: Khi quái thú đối phương tuyên bố tấn công: Hủy bỏ đòn tấn công và chuyển quái thú đó sang tư thế Phòng thủ, đồng thời gây 300 LP phản chấn.",
    "scientificLore": "Hiện tượng hóa học Bẫy Kết Tủa Bạc Clorua Trắng (Ag⁺(aq) + Cl⁻(aq) → AgCl(s)↓ (Ksp = 1.77×10⁻¹⁰)) ngăn chặn sự lan truyền phản ứng hoặc bẫy bắt các ion tự do thành pha rắn/khí trơ theo chuẩn GDPT 2018.",
    "relatedEquation": "Ag⁺(aq) + Cl⁻(aq) → AgCl(s)↓ (Ksp = 1.77×10⁻¹⁰)",
    "iupacName": "Silver Chloride Precipitation Barrier Countermeasure",
    "archetype": "PRECIPITATION_TRAP",
    "structuredEffects": [
      {
        "effectId": "B21_EFF_33",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "APPLY_STATUS",
            "params": {
              "statusType": "POSITION_LOCKED",
              "turns": 1
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Chặn đứng đòn tấn công, khóa tư thế quái thú địch và gây 300 LP."
      }
    ]
  },
  {
    "id": "card_b21_034_trap_dry_chemical_extinguisher_quench_34",
    "name": "Bẫy Phun Khí Bột Chữa Cháy NaHCO3 (Tầng Bẫy 5)",
    "name_en": "Dry Chemical Extinguisher Quench (Barrier Level 5)",
    "cardType": "TRAP",
    "spellTrapSubtype": "NORMAL_TRAP",
    "spellSpeed": 2,
    "rarity": "SUPER_RARE",
    "attribute": "AERO",
    "manaCost": 2,
    "chemicalFormula": "2NaHCO3",
    "effectCode": "TRAP_B21_DRY_CHEMICAL_EXTINGUISHER_QUENCH_NORM_34",
    "effectText": "[Bẫy Thường / Normal Trap - Spell Speed 2]: Khi quái thú đối phương tuyên bố tấn công: Hủy bỏ đòn tấn công và chuyển quái thú đó sang tư thế Phòng thủ, đồng thời gây 300 LP phản chấn.",
    "scientificLore": "Hiện tượng hóa học Bẫy Phun Khí Bột Chữa Cháy NaHCO3 (2NaHCO₃ --heat--> Na₂CO₃ + H₂O + CO₂↑) ngăn chặn sự lan truyền phản ứng hoặc bẫy bắt các ion tự do thành pha rắn/khí trơ theo chuẩn GDPT 2018.",
    "relatedEquation": "2NaHCO₃ --heat--> Na₂CO₃ + H₂O + CO₂↑",
    "iupacName": "Dry Chemical Extinguisher Quench Countermeasure",
    "archetype": "HALOGEN_PURGE",
    "structuredEffects": [
      {
        "effectId": "B21_EFF_34",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "APPLY_STATUS",
            "params": {
              "statusType": "POSITION_LOCKED",
              "turns": 1
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Chặn đứng đòn tấn công, khóa tư thế quái thú địch và gây 300 LP."
      }
    ]
  },
  {
    "id": "card_b21_035_trap_sacrificial_zinc_anode_discharge_35",
    "name": "Bẫy Anode Hy Sinh Chống Ăn Mòn (Tầng Bẫy 5)",
    "name_en": "Sacrificial Zinc Anode Discharge (Barrier Level 5)",
    "cardType": "TRAP",
    "spellTrapSubtype": "NORMAL_TRAP",
    "spellSpeed": 2,
    "rarity": "ULTRA_RARE",
    "attribute": "ELECTRO",
    "manaCost": 3,
    "chemicalFormula": "Zn → Zn2+ + 2e-",
    "effectCode": "TRAP_B21_SACRIFICIAL_ZINC_ANODE_DISCHARGE_NORM_35",
    "effectText": "[Bẫy Thường / Normal Trap - Spell Speed 2]: Khi quái thú đối phương tuyên bố tấn công: Hủy bỏ đòn tấn công và chuyển quái thú đó sang tư thế Phòng thủ, đồng thời gây 300 LP phản chấn.",
    "scientificLore": "Hiện tượng hóa học Bẫy Anode Hy Sinh Chống Ăn Mòn (Zn(s) → Zn²⁺(aq) + 2e⁻ (E° = -0.76V vs Fe -0.44V)) ngăn chặn sự lan truyền phản ứng hoặc bẫy bắt các ion tự do thành pha rắn/khí trơ theo chuẩn GDPT 2018.",
    "relatedEquation": "Zn(s) → Zn²⁺(aq) + 2e⁻ (E° = -0.76V vs Fe -0.44V)",
    "iupacName": "Sacrificial Zinc Anode Discharge Countermeasure",
    "archetype": "PRECIPITATION_TRAP",
    "structuredEffects": [
      {
        "effectId": "B21_EFF_35",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "APPLY_STATUS",
            "params": {
              "statusType": "POSITION_LOCKED",
              "turns": 1
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Chặn đứng đòn tấn công, khóa tư thế quái thú địch và gây 300 LP."
      }
    ]
  },
  {
    "id": "card_b21_036_trap_heavy_barium_sulfate_blockade_36",
    "name": "Bẫy Kết Tủa Vàng Bari Sunfat (Tầng Bẫy 5)",
    "name_en": "Heavy Barium Sulfate Blockade (Barrier Level 5)",
    "cardType": "TRAP",
    "spellTrapSubtype": "NORMAL_TRAP",
    "spellSpeed": 2,
    "rarity": "SECRET_RARE",
    "attribute": "TERRA",
    "manaCost": 4,
    "chemicalFormula": "BaSO4↓",
    "effectCode": "TRAP_B21_HEAVY_BARIUM_SULFATE_BLOCKADE_NORM_36",
    "effectText": "[Bẫy Thường / Normal Trap - Spell Speed 2]: Khi quái thú đối phương tuyên bố tấn công: Hủy bỏ đòn tấn công và chuyển quái thú đó sang tư thế Phòng thủ, đồng thời gây 300 LP phản chấn.",
    "scientificLore": "Hiện tượng hóa học Bẫy Kết Tủa Vàng Bari Sunfat (Ba²⁺(aq) + SO₄²⁻(aq) → BaSO₄(s)↓ (Ksp = 1.08×10⁻¹⁰)) ngăn chặn sự lan truyền phản ứng hoặc bẫy bắt các ion tự do thành pha rắn/khí trơ theo chuẩn GDPT 2018.",
    "relatedEquation": "Ba²⁺(aq) + SO₄²⁻(aq) → BaSO₄(s)↓ (Ksp = 1.08×10⁻¹⁰)",
    "iupacName": "Heavy Barium Sulfate Blockade Countermeasure",
    "archetype": "HALOGEN_PURGE",
    "structuredEffects": [
      {
        "effectId": "B21_EFF_36",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "APPLY_STATUS",
            "params": {
              "statusType": "POSITION_LOCKED",
              "turns": 1
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Chặn đứng đòn tấn công, khóa tư thế quái thú địch và gây 300 LP."
      }
    ]
  },
  {
    "id": "card_b21_037_trap_bleach_hypochlorite_vapor_trap_37",
    "name": "Bẫy Khí Clo Khử Trùng Cực Mạnh (Tầng Bẫy 5)",
    "name_en": "Bleach Hypochlorite Vapor Trap (Barrier Level 5)",
    "cardType": "TRAP",
    "spellTrapSubtype": "NORMAL_TRAP",
    "spellSpeed": 2,
    "rarity": "COMMON",
    "attribute": "AERO",
    "manaCost": 1,
    "chemicalFormula": "NaClO + HCl",
    "effectCode": "TRAP_B21_BLEACH_HYPOCHLORITE_VAPOR_TRAP_NORM_37",
    "effectText": "[Bẫy Thường / Normal Trap - Spell Speed 2]: Khi quái thú đối phương tuyên bố tấn công: Hủy bỏ đòn tấn công và chuyển quái thú đó sang tư thế Phòng thủ, đồng thời gây 300 LP phản chấn.",
    "scientificLore": "Hiện tượng hóa học Bẫy Khí Clo Khử Trùng Cực Mạnh (NaClO + 2HCl → NaCl + Cl₂↑ + H₂O) ngăn chặn sự lan truyền phản ứng hoặc bẫy bắt các ion tự do thành pha rắn/khí trơ theo chuẩn GDPT 2018.",
    "relatedEquation": "NaClO + 2HCl → NaCl + Cl₂↑ + H₂O",
    "iupacName": "Bleach Hypochlorite Vapor Trap Countermeasure",
    "archetype": "PRECIPITATION_TRAP",
    "structuredEffects": [
      {
        "effectId": "B21_EFF_37",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "APPLY_STATUS",
            "params": {
              "statusType": "POSITION_LOCKED",
              "turns": 1
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Chặn đứng đòn tấn công, khóa tư thế quái thú địch và gây 300 LP."
      }
    ]
  },
  {
    "id": "card_b21_038_trap_activated_carbon_adsorption_net_38",
    "name": "Bẫy Hấp Phụ Khí Độc Bằng Than Hoạt Tính (Tầng Bẫy 5)",
    "name_en": "Activated Carbon Adsorption Net (Barrier Level 5)",
    "cardType": "TRAP",
    "spellTrapSubtype": "NORMAL_TRAP",
    "spellSpeed": 2,
    "rarity": "COMMON",
    "attribute": "TERRA",
    "manaCost": 2,
    "chemicalFormula": "C(adsorb)",
    "effectCode": "TRAP_B21_ACTIVATED_CARBON_ADSORPTION_NET_NORM_38",
    "effectText": "[Bẫy Thường / Normal Trap - Spell Speed 2]: Khi quái thú đối phương tuyên bố tấn công: Hủy bỏ đòn tấn công và chuyển quái thú đó sang tư thế Phòng thủ, đồng thời gây 300 LP phản chấn.",
    "scientificLore": "Hiện tượng hóa học Bẫy Hấp Phụ Khí Độc Bằng Than Hoạt Tính (Langmuir / Freundlich Multilayer Adsorption) ngăn chặn sự lan truyền phản ứng hoặc bẫy bắt các ion tự do thành pha rắn/khí trơ theo chuẩn GDPT 2018.",
    "relatedEquation": "Langmuir / Freundlich Multilayer Adsorption",
    "iupacName": "Activated Carbon Adsorption Net Countermeasure",
    "archetype": "HALOGEN_PURGE",
    "structuredEffects": [
      {
        "effectId": "B21_EFF_38",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "APPLY_STATUS",
            "params": {
              "statusType": "POSITION_LOCKED",
              "turns": 1
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Chặn đứng đòn tấn công, khóa tư thế quái thú địch và gây 300 LP."
      }
    ]
  },
  {
    "id": "card_b21_039_trap_lead_ii__iodide_golden_rain_trap_39",
    "name": "Bẫy Kết Tủa Chì(II) Iotua Hoàng Kim (Tầng Bẫy 5)",
    "name_en": "Lead(II) Iodide Golden Rain Trap (Barrier Level 5)",
    "cardType": "TRAP",
    "spellTrapSubtype": "NORMAL_TRAP",
    "spellSpeed": 2,
    "rarity": "COMMON",
    "attribute": "TERRA",
    "manaCost": 3,
    "chemicalFormula": "PbI2↓",
    "effectCode": "TRAP_B21_LEAD_II__IODIDE_GOLDEN_RAIN_TRAP_NORM_39",
    "effectText": "[Bẫy Thường / Normal Trap - Spell Speed 2]: Khi quái thú đối phương tuyên bố tấn công: Hủy bỏ đòn tấn công và chuyển quái thú đó sang tư thế Phòng thủ, đồng thời gây 300 LP phản chấn.",
    "scientificLore": "Hiện tượng hóa học Bẫy Kết Tủa Chì(II) Iotua Hoàng Kim (Pb²⁺(aq) + 2I⁻(aq) → PbI₂(s)↓ (Golden Glitter)) ngăn chặn sự lan truyền phản ứng hoặc bẫy bắt các ion tự do thành pha rắn/khí trơ theo chuẩn GDPT 2018.",
    "relatedEquation": "Pb²⁺(aq) + 2I⁻(aq) → PbI₂(s)↓ (Golden Glitter)",
    "iupacName": "Lead(II) Iodide Golden Rain Trap Countermeasure",
    "archetype": "PRECIPITATION_TRAP",
    "structuredEffects": [
      {
        "effectId": "B21_EFF_39",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "APPLY_STATUS",
            "params": {
              "statusType": "POSITION_LOCKED",
              "turns": 1
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Chặn đứng đòn tấn công, khóa tư thế quái thú địch và gây 300 LP."
      }
    ]
  },
  {
    "id": "card_b21_040_trap_hydrogen_gas_knallgas_detonation_trap_40",
    "name": "Bẫy Thoát Khí Hydro Nổ Tức Thời (Tầng Bẫy 5)",
    "name_en": "Hydrogen Gas Knallgas Detonation Trap (Barrier Level 5)",
    "cardType": "TRAP",
    "spellTrapSubtype": "NORMAL_TRAP",
    "spellSpeed": 2,
    "rarity": "RARE",
    "attribute": "PYRO",
    "manaCost": 4,
    "chemicalFormula": "2H2 + O2",
    "effectCode": "TRAP_B21_HYDROGEN_GAS_KNALLGAS_DETONATION_TRAP_NORM_40",
    "effectText": "[Bẫy Thường / Normal Trap - Spell Speed 2]: Khi quái thú đối phương tuyên bố tấn công: Hủy bỏ đòn tấn công và chuyển quái thú đó sang tư thế Phòng thủ, đồng thời gây 300 LP phản chấn.",
    "scientificLore": "Hiện tượng hóa học Bẫy Thoát Khí Hydro Nổ Tức Thời (2H₂ + O₂ → 2H₂O (Explosive Shockwave)) ngăn chặn sự lan truyền phản ứng hoặc bẫy bắt các ion tự do thành pha rắn/khí trơ theo chuẩn GDPT 2018.",
    "relatedEquation": "2H₂ + O₂ → 2H₂O (Explosive Shockwave)",
    "iupacName": "Hydrogen Gas Knallgas Detonation Trap Countermeasure",
    "archetype": "HALOGEN_PURGE",
    "structuredEffects": [
      {
        "effectId": "B21_EFF_40",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "APPLY_STATUS",
            "params": {
              "statusType": "POSITION_LOCKED",
              "turns": 1
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Chặn đứng đòn tấn công, khóa tư thế quái thú địch và gây 300 LP."
      }
    ]
  },
  {
    "id": "card_b21_041_trap_silver_chloride_precipitation_barrier_41",
    "name": "Bẫy Kết Tủa Bạc Clorua Trắng (Tầng Bẫy 6)",
    "name_en": "Silver Chloride Precipitation Barrier (Barrier Level 6)",
    "cardType": "TRAP",
    "spellTrapSubtype": "NORMAL_TRAP",
    "spellSpeed": 2,
    "rarity": "RARE",
    "attribute": "TERRA",
    "manaCost": 1,
    "chemicalFormula": "AgCl↓",
    "effectCode": "TRAP_B21_SILVER_CHLORIDE_PRECIPITATION_BARRIER_NORM_41",
    "effectText": "[Bẫy Thường / Normal Trap - Spell Speed 2]: Khi quái thú đối phương tuyên bố tấn công: Hủy bỏ đòn tấn công và chuyển quái thú đó sang tư thế Phòng thủ, đồng thời gây 300 LP phản chấn.",
    "scientificLore": "Hiện tượng hóa học Bẫy Kết Tủa Bạc Clorua Trắng (Ag⁺(aq) + Cl⁻(aq) → AgCl(s)↓ (Ksp = 1.77×10⁻¹⁰)) ngăn chặn sự lan truyền phản ứng hoặc bẫy bắt các ion tự do thành pha rắn/khí trơ theo chuẩn GDPT 2018.",
    "relatedEquation": "Ag⁺(aq) + Cl⁻(aq) → AgCl(s)↓ (Ksp = 1.77×10⁻¹⁰)",
    "iupacName": "Silver Chloride Precipitation Barrier Countermeasure",
    "archetype": "PRECIPITATION_TRAP",
    "structuredEffects": [
      {
        "effectId": "B21_EFF_41",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "APPLY_STATUS",
            "params": {
              "statusType": "POSITION_LOCKED",
              "turns": 1
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Chặn đứng đòn tấn công, khóa tư thế quái thú địch và gây 300 LP."
      }
    ]
  },
  {
    "id": "card_b21_042_trap_dry_chemical_extinguisher_quench_42",
    "name": "Bẫy Phun Khí Bột Chữa Cháy NaHCO3 (Tầng Bẫy 6)",
    "name_en": "Dry Chemical Extinguisher Quench (Barrier Level 6)",
    "cardType": "TRAP",
    "spellTrapSubtype": "NORMAL_TRAP",
    "spellSpeed": 2,
    "rarity": "SUPER_RARE",
    "attribute": "AERO",
    "manaCost": 2,
    "chemicalFormula": "2NaHCO3",
    "effectCode": "TRAP_B21_DRY_CHEMICAL_EXTINGUISHER_QUENCH_NORM_42",
    "effectText": "[Bẫy Thường / Normal Trap - Spell Speed 2]: Khi quái thú đối phương tuyên bố tấn công: Hủy bỏ đòn tấn công và chuyển quái thú đó sang tư thế Phòng thủ, đồng thời gây 300 LP phản chấn.",
    "scientificLore": "Hiện tượng hóa học Bẫy Phun Khí Bột Chữa Cháy NaHCO3 (2NaHCO₃ --heat--> Na₂CO₃ + H₂O + CO₂↑) ngăn chặn sự lan truyền phản ứng hoặc bẫy bắt các ion tự do thành pha rắn/khí trơ theo chuẩn GDPT 2018.",
    "relatedEquation": "2NaHCO₃ --heat--> Na₂CO₃ + H₂O + CO₂↑",
    "iupacName": "Dry Chemical Extinguisher Quench Countermeasure",
    "archetype": "HALOGEN_PURGE",
    "structuredEffects": [
      {
        "effectId": "B21_EFF_42",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "APPLY_STATUS",
            "params": {
              "statusType": "POSITION_LOCKED",
              "turns": 1
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Chặn đứng đòn tấn công, khóa tư thế quái thú địch và gây 300 LP."
      }
    ]
  },
  {
    "id": "card_b21_043_trap_sacrificial_zinc_anode_discharge_43",
    "name": "Bẫy Anode Hy Sinh Chống Ăn Mòn (Tầng Bẫy 6)",
    "name_en": "Sacrificial Zinc Anode Discharge (Barrier Level 6)",
    "cardType": "TRAP",
    "spellTrapSubtype": "NORMAL_TRAP",
    "spellSpeed": 2,
    "rarity": "SUPER_RARE",
    "attribute": "ELECTRO",
    "manaCost": 3,
    "chemicalFormula": "Zn → Zn2+ + 2e-",
    "effectCode": "TRAP_B21_SACRIFICIAL_ZINC_ANODE_DISCHARGE_NORM_43",
    "effectText": "[Bẫy Thường / Normal Trap - Spell Speed 2]: Khi quái thú đối phương tuyên bố tấn công: Hủy bỏ đòn tấn công và chuyển quái thú đó sang tư thế Phòng thủ, đồng thời gây 300 LP phản chấn.",
    "scientificLore": "Hiện tượng hóa học Bẫy Anode Hy Sinh Chống Ăn Mòn (Zn(s) → Zn²⁺(aq) + 2e⁻ (E° = -0.76V vs Fe -0.44V)) ngăn chặn sự lan truyền phản ứng hoặc bẫy bắt các ion tự do thành pha rắn/khí trơ theo chuẩn GDPT 2018.",
    "relatedEquation": "Zn(s) → Zn²⁺(aq) + 2e⁻ (E° = -0.76V vs Fe -0.44V)",
    "iupacName": "Sacrificial Zinc Anode Discharge Countermeasure",
    "archetype": "PRECIPITATION_TRAP",
    "structuredEffects": [
      {
        "effectId": "B21_EFF_43",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "APPLY_STATUS",
            "params": {
              "statusType": "POSITION_LOCKED",
              "turns": 1
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Chặn đứng đòn tấn công, khóa tư thế quái thú địch và gây 300 LP."
      }
    ]
  },
  {
    "id": "card_b21_044_trap_heavy_barium_sulfate_blockade_44",
    "name": "Bẫy Kết Tủa Vàng Bari Sunfat (Tầng Bẫy 6)",
    "name_en": "Heavy Barium Sulfate Blockade (Barrier Level 6)",
    "cardType": "TRAP",
    "spellTrapSubtype": "NORMAL_TRAP",
    "spellSpeed": 2,
    "rarity": "ULTRA_RARE",
    "attribute": "TERRA",
    "manaCost": 4,
    "chemicalFormula": "BaSO4↓",
    "effectCode": "TRAP_B21_HEAVY_BARIUM_SULFATE_BLOCKADE_NORM_44",
    "effectText": "[Bẫy Thường / Normal Trap - Spell Speed 2]: Khi quái thú đối phương tuyên bố tấn công: Hủy bỏ đòn tấn công và chuyển quái thú đó sang tư thế Phòng thủ, đồng thời gây 300 LP phản chấn.",
    "scientificLore": "Hiện tượng hóa học Bẫy Kết Tủa Vàng Bari Sunfat (Ba²⁺(aq) + SO₄²⁻(aq) → BaSO₄(s)↓ (Ksp = 1.08×10⁻¹⁰)) ngăn chặn sự lan truyền phản ứng hoặc bẫy bắt các ion tự do thành pha rắn/khí trơ theo chuẩn GDPT 2018.",
    "relatedEquation": "Ba²⁺(aq) + SO₄²⁻(aq) → BaSO₄(s)↓ (Ksp = 1.08×10⁻¹⁰)",
    "iupacName": "Heavy Barium Sulfate Blockade Countermeasure",
    "archetype": "HALOGEN_PURGE",
    "structuredEffects": [
      {
        "effectId": "B21_EFF_44",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "APPLY_STATUS",
            "params": {
              "statusType": "POSITION_LOCKED",
              "turns": 1
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Chặn đứng đòn tấn công, khóa tư thế quái thú địch và gây 300 LP."
      }
    ]
  },
  {
    "id": "card_b21_045_trap_bleach_hypochlorite_vapor_trap_45",
    "name": "Bẫy Khí Clo Khử Trùng Cực Mạnh (Tầng Bẫy 6)",
    "name_en": "Bleach Hypochlorite Vapor Trap (Barrier Level 6)",
    "cardType": "TRAP",
    "spellTrapSubtype": "NORMAL_TRAP",
    "spellSpeed": 2,
    "rarity": "SECRET_RARE",
    "attribute": "AERO",
    "manaCost": 1,
    "chemicalFormula": "NaClO + HCl",
    "effectCode": "TRAP_B21_BLEACH_HYPOCHLORITE_VAPOR_TRAP_NORM_45",
    "effectText": "[Bẫy Thường / Normal Trap - Spell Speed 2]: Khi quái thú đối phương tuyên bố tấn công: Hủy bỏ đòn tấn công và chuyển quái thú đó sang tư thế Phòng thủ, đồng thời gây 300 LP phản chấn.",
    "scientificLore": "Hiện tượng hóa học Bẫy Khí Clo Khử Trùng Cực Mạnh (NaClO + 2HCl → NaCl + Cl₂↑ + H₂O) ngăn chặn sự lan truyền phản ứng hoặc bẫy bắt các ion tự do thành pha rắn/khí trơ theo chuẩn GDPT 2018.",
    "relatedEquation": "NaClO + 2HCl → NaCl + Cl₂↑ + H₂O",
    "iupacName": "Bleach Hypochlorite Vapor Trap Countermeasure",
    "archetype": "PRECIPITATION_TRAP",
    "structuredEffects": [
      {
        "effectId": "B21_EFF_45",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "APPLY_STATUS",
            "params": {
              "statusType": "POSITION_LOCKED",
              "turns": 1
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Chặn đứng đòn tấn công, khóa tư thế quái thú địch và gây 300 LP."
      }
    ]
  },
  {
    "id": "card_b21_046_trap_activated_carbon_adsorption_net_46",
    "name": "Bẫy Hấp Phụ Khí Độc Bằng Than Hoạt Tính (Tầng Bẫy 6)",
    "name_en": "Activated Carbon Adsorption Net (Barrier Level 6)",
    "cardType": "TRAP",
    "spellTrapSubtype": "NORMAL_TRAP",
    "spellSpeed": 2,
    "rarity": "COMMON",
    "attribute": "TERRA",
    "manaCost": 2,
    "chemicalFormula": "C(adsorb)",
    "effectCode": "TRAP_B21_ACTIVATED_CARBON_ADSORPTION_NET_NORM_46",
    "effectText": "[Bẫy Thường / Normal Trap - Spell Speed 2]: Khi quái thú đối phương tuyên bố tấn công: Hủy bỏ đòn tấn công và chuyển quái thú đó sang tư thế Phòng thủ, đồng thời gây 300 LP phản chấn.",
    "scientificLore": "Hiện tượng hóa học Bẫy Hấp Phụ Khí Độc Bằng Than Hoạt Tính (Langmuir / Freundlich Multilayer Adsorption) ngăn chặn sự lan truyền phản ứng hoặc bẫy bắt các ion tự do thành pha rắn/khí trơ theo chuẩn GDPT 2018.",
    "relatedEquation": "Langmuir / Freundlich Multilayer Adsorption",
    "iupacName": "Activated Carbon Adsorption Net Countermeasure",
    "archetype": "HALOGEN_PURGE",
    "structuredEffects": [
      {
        "effectId": "B21_EFF_46",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "APPLY_STATUS",
            "params": {
              "statusType": "POSITION_LOCKED",
              "turns": 1
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Chặn đứng đòn tấn công, khóa tư thế quái thú địch và gây 300 LP."
      }
    ]
  },
  {
    "id": "card_b21_047_trap_lead_ii__iodide_golden_rain_trap_47",
    "name": "Bẫy Kết Tủa Chì(II) Iotua Hoàng Kim (Tầng Bẫy 6)",
    "name_en": "Lead(II) Iodide Golden Rain Trap (Barrier Level 6)",
    "cardType": "TRAP",
    "spellTrapSubtype": "NORMAL_TRAP",
    "spellSpeed": 2,
    "rarity": "COMMON",
    "attribute": "TERRA",
    "manaCost": 3,
    "chemicalFormula": "PbI2↓",
    "effectCode": "TRAP_B21_LEAD_II__IODIDE_GOLDEN_RAIN_TRAP_NORM_47",
    "effectText": "[Bẫy Thường / Normal Trap - Spell Speed 2]: Khi quái thú đối phương tuyên bố tấn công: Hủy bỏ đòn tấn công và chuyển quái thú đó sang tư thế Phòng thủ, đồng thời gây 300 LP phản chấn.",
    "scientificLore": "Hiện tượng hóa học Bẫy Kết Tủa Chì(II) Iotua Hoàng Kim (Pb²⁺(aq) + 2I⁻(aq) → PbI₂(s)↓ (Golden Glitter)) ngăn chặn sự lan truyền phản ứng hoặc bẫy bắt các ion tự do thành pha rắn/khí trơ theo chuẩn GDPT 2018.",
    "relatedEquation": "Pb²⁺(aq) + 2I⁻(aq) → PbI₂(s)↓ (Golden Glitter)",
    "iupacName": "Lead(II) Iodide Golden Rain Trap Countermeasure",
    "archetype": "PRECIPITATION_TRAP",
    "structuredEffects": [
      {
        "effectId": "B21_EFF_47",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "APPLY_STATUS",
            "params": {
              "statusType": "POSITION_LOCKED",
              "turns": 1
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Chặn đứng đòn tấn công, khóa tư thế quái thú địch và gây 300 LP."
      }
    ]
  },
  {
    "id": "card_b21_048_trap_hydrogen_gas_knallgas_detonation_trap_48",
    "name": "Bẫy Thoát Khí Hydro Nổ Tức Thời (Tầng Bẫy 6)",
    "name_en": "Hydrogen Gas Knallgas Detonation Trap (Barrier Level 6)",
    "cardType": "TRAP",
    "spellTrapSubtype": "NORMAL_TRAP",
    "spellSpeed": 2,
    "rarity": "COMMON",
    "attribute": "PYRO",
    "manaCost": 4,
    "chemicalFormula": "2H2 + O2",
    "effectCode": "TRAP_B21_HYDROGEN_GAS_KNALLGAS_DETONATION_TRAP_NORM_48",
    "effectText": "[Bẫy Thường / Normal Trap - Spell Speed 2]: Khi quái thú đối phương tuyên bố tấn công: Hủy bỏ đòn tấn công và chuyển quái thú đó sang tư thế Phòng thủ, đồng thời gây 300 LP phản chấn.",
    "scientificLore": "Hiện tượng hóa học Bẫy Thoát Khí Hydro Nổ Tức Thời (2H₂ + O₂ → 2H₂O (Explosive Shockwave)) ngăn chặn sự lan truyền phản ứng hoặc bẫy bắt các ion tự do thành pha rắn/khí trơ theo chuẩn GDPT 2018.",
    "relatedEquation": "2H₂ + O₂ → 2H₂O (Explosive Shockwave)",
    "iupacName": "Hydrogen Gas Knallgas Detonation Trap Countermeasure",
    "archetype": "HALOGEN_PURGE",
    "structuredEffects": [
      {
        "effectId": "B21_EFF_48",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "APPLY_STATUS",
            "params": {
              "statusType": "POSITION_LOCKED",
              "turns": 1
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Chặn đứng đòn tấn công, khóa tư thế quái thú địch và gây 300 LP."
      }
    ]
  },
  {
    "id": "card_b21_049_trap_silver_chloride_precipitation_barrier_49",
    "name": "Bẫy Kết Tủa Bạc Clorua Trắng (Tầng Bẫy 7)",
    "name_en": "Silver Chloride Precipitation Barrier (Barrier Level 7)",
    "cardType": "TRAP",
    "spellTrapSubtype": "NORMAL_TRAP",
    "spellSpeed": 2,
    "rarity": "RARE",
    "attribute": "TERRA",
    "manaCost": 1,
    "chemicalFormula": "AgCl↓",
    "effectCode": "TRAP_B21_SILVER_CHLORIDE_PRECIPITATION_BARRIER_NORM_49",
    "effectText": "[Bẫy Thường / Normal Trap - Spell Speed 2]: Khi quái thú đối phương tuyên bố tấn công: Hủy bỏ đòn tấn công và chuyển quái thú đó sang tư thế Phòng thủ, đồng thời gây 300 LP phản chấn.",
    "scientificLore": "Hiện tượng hóa học Bẫy Kết Tủa Bạc Clorua Trắng (Ag⁺(aq) + Cl⁻(aq) → AgCl(s)↓ (Ksp = 1.77×10⁻¹⁰)) ngăn chặn sự lan truyền phản ứng hoặc bẫy bắt các ion tự do thành pha rắn/khí trơ theo chuẩn GDPT 2018.",
    "relatedEquation": "Ag⁺(aq) + Cl⁻(aq) → AgCl(s)↓ (Ksp = 1.77×10⁻¹⁰)",
    "iupacName": "Silver Chloride Precipitation Barrier Countermeasure",
    "archetype": "PRECIPITATION_TRAP",
    "structuredEffects": [
      {
        "effectId": "B21_EFF_49",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "APPLY_STATUS",
            "params": {
              "statusType": "POSITION_LOCKED",
              "turns": 1
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Chặn đứng đòn tấn công, khóa tư thế quái thú địch và gây 300 LP."
      }
    ]
  },
  {
    "id": "card_b21_050_trap_dry_chemical_extinguisher_quench_50",
    "name": "Bẫy Phun Khí Bột Chữa Cháy NaHCO3 (Tầng Bẫy 7)",
    "name_en": "Dry Chemical Extinguisher Quench (Barrier Level 7)",
    "cardType": "TRAP",
    "spellTrapSubtype": "NORMAL_TRAP",
    "spellSpeed": 2,
    "rarity": "RARE",
    "attribute": "AERO",
    "manaCost": 2,
    "chemicalFormula": "2NaHCO3",
    "effectCode": "TRAP_B21_DRY_CHEMICAL_EXTINGUISHER_QUENCH_NORM_50",
    "effectText": "[Bẫy Thường / Normal Trap - Spell Speed 2]: Khi quái thú đối phương tuyên bố tấn công: Hủy bỏ đòn tấn công và chuyển quái thú đó sang tư thế Phòng thủ, đồng thời gây 300 LP phản chấn.",
    "scientificLore": "Hiện tượng hóa học Bẫy Phun Khí Bột Chữa Cháy NaHCO3 (2NaHCO₃ --heat--> Na₂CO₃ + H₂O + CO₂↑) ngăn chặn sự lan truyền phản ứng hoặc bẫy bắt các ion tự do thành pha rắn/khí trơ theo chuẩn GDPT 2018.",
    "relatedEquation": "2NaHCO₃ --heat--> Na₂CO₃ + H₂O + CO₂↑",
    "iupacName": "Dry Chemical Extinguisher Quench Countermeasure",
    "archetype": "HALOGEN_PURGE",
    "structuredEffects": [
      {
        "effectId": "B21_EFF_50",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "APPLY_STATUS",
            "params": {
              "statusType": "POSITION_LOCKED",
              "turns": 1
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Chặn đứng đòn tấn công, khóa tư thế quái thú địch và gây 300 LP."
      }
    ]
  },
  {
    "id": "card_b21_051_trap_sacrificial_zinc_anode_discharge_51",
    "name": "Bẫy Anode Hy Sinh Chống Ăn Mòn (Tầng Bẫy 7)",
    "name_en": "Sacrificial Zinc Anode Discharge (Barrier Level 7)",
    "cardType": "TRAP",
    "spellTrapSubtype": "NORMAL_TRAP",
    "spellSpeed": 2,
    "rarity": "SUPER_RARE",
    "attribute": "ELECTRO",
    "manaCost": 3,
    "chemicalFormula": "Zn → Zn2+ + 2e-",
    "effectCode": "TRAP_B21_SACRIFICIAL_ZINC_ANODE_DISCHARGE_NORM_51",
    "effectText": "[Bẫy Thường / Normal Trap - Spell Speed 2]: Khi quái thú đối phương tuyên bố tấn công: Hủy bỏ đòn tấn công và chuyển quái thú đó sang tư thế Phòng thủ, đồng thời gây 300 LP phản chấn.",
    "scientificLore": "Hiện tượng hóa học Bẫy Anode Hy Sinh Chống Ăn Mòn (Zn(s) → Zn²⁺(aq) + 2e⁻ (E° = -0.76V vs Fe -0.44V)) ngăn chặn sự lan truyền phản ứng hoặc bẫy bắt các ion tự do thành pha rắn/khí trơ theo chuẩn GDPT 2018.",
    "relatedEquation": "Zn(s) → Zn²⁺(aq) + 2e⁻ (E° = -0.76V vs Fe -0.44V)",
    "iupacName": "Sacrificial Zinc Anode Discharge Countermeasure",
    "archetype": "PRECIPITATION_TRAP",
    "structuredEffects": [
      {
        "effectId": "B21_EFF_51",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "APPLY_STATUS",
            "params": {
              "statusType": "POSITION_LOCKED",
              "turns": 1
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Chặn đứng đòn tấn công, khóa tư thế quái thú địch và gây 300 LP."
      }
    ]
  },
  {
    "id": "card_b21_052_trap_heavy_barium_sulfate_blockade_52",
    "name": "Bẫy Kết Tủa Vàng Bari Sunfat (Tầng Bẫy 7)",
    "name_en": "Heavy Barium Sulfate Blockade (Barrier Level 7)",
    "cardType": "TRAP",
    "spellTrapSubtype": "NORMAL_TRAP",
    "spellSpeed": 2,
    "rarity": "SUPER_RARE",
    "attribute": "TERRA",
    "manaCost": 4,
    "chemicalFormula": "BaSO4↓",
    "effectCode": "TRAP_B21_HEAVY_BARIUM_SULFATE_BLOCKADE_NORM_52",
    "effectText": "[Bẫy Thường / Normal Trap - Spell Speed 2]: Khi quái thú đối phương tuyên bố tấn công: Hủy bỏ đòn tấn công và chuyển quái thú đó sang tư thế Phòng thủ, đồng thời gây 300 LP phản chấn.",
    "scientificLore": "Hiện tượng hóa học Bẫy Kết Tủa Vàng Bari Sunfat (Ba²⁺(aq) + SO₄²⁻(aq) → BaSO₄(s)↓ (Ksp = 1.08×10⁻¹⁰)) ngăn chặn sự lan truyền phản ứng hoặc bẫy bắt các ion tự do thành pha rắn/khí trơ theo chuẩn GDPT 2018.",
    "relatedEquation": "Ba²⁺(aq) + SO₄²⁻(aq) → BaSO₄(s)↓ (Ksp = 1.08×10⁻¹⁰)",
    "iupacName": "Heavy Barium Sulfate Blockade Countermeasure",
    "archetype": "HALOGEN_PURGE",
    "structuredEffects": [
      {
        "effectId": "B21_EFF_52",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "APPLY_STATUS",
            "params": {
              "statusType": "POSITION_LOCKED",
              "turns": 1
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Chặn đứng đòn tấn công, khóa tư thế quái thú địch và gây 300 LP."
      }
    ]
  },
  {
    "id": "card_b21_053_trap_bleach_hypochlorite_vapor_trap_53",
    "name": "Bẫy Khí Clo Khử Trùng Cực Mạnh (Tầng Bẫy 7)",
    "name_en": "Bleach Hypochlorite Vapor Trap (Barrier Level 7)",
    "cardType": "TRAP",
    "spellTrapSubtype": "NORMAL_TRAP",
    "spellSpeed": 2,
    "rarity": "ULTRA_RARE",
    "attribute": "AERO",
    "manaCost": 1,
    "chemicalFormula": "NaClO + HCl",
    "effectCode": "TRAP_B21_BLEACH_HYPOCHLORITE_VAPOR_TRAP_NORM_53",
    "effectText": "[Bẫy Thường / Normal Trap - Spell Speed 2]: Khi quái thú đối phương tuyên bố tấn công: Hủy bỏ đòn tấn công và chuyển quái thú đó sang tư thế Phòng thủ, đồng thời gây 300 LP phản chấn.",
    "scientificLore": "Hiện tượng hóa học Bẫy Khí Clo Khử Trùng Cực Mạnh (NaClO + 2HCl → NaCl + Cl₂↑ + H₂O) ngăn chặn sự lan truyền phản ứng hoặc bẫy bắt các ion tự do thành pha rắn/khí trơ theo chuẩn GDPT 2018.",
    "relatedEquation": "NaClO + 2HCl → NaCl + Cl₂↑ + H₂O",
    "iupacName": "Bleach Hypochlorite Vapor Trap Countermeasure",
    "archetype": "PRECIPITATION_TRAP",
    "structuredEffects": [
      {
        "effectId": "B21_EFF_53",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "APPLY_STATUS",
            "params": {
              "statusType": "POSITION_LOCKED",
              "turns": 1
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Chặn đứng đòn tấn công, khóa tư thế quái thú địch và gây 300 LP."
      }
    ]
  },
  {
    "id": "card_b21_054_trap_activated_carbon_adsorption_net_54",
    "name": "Bẫy Hấp Phụ Khí Độc Bằng Than Hoạt Tính (Tầng Bẫy 7)",
    "name_en": "Activated Carbon Adsorption Net (Barrier Level 7)",
    "cardType": "TRAP",
    "spellTrapSubtype": "NORMAL_TRAP",
    "spellSpeed": 2,
    "rarity": "SECRET_RARE",
    "attribute": "TERRA",
    "manaCost": 2,
    "chemicalFormula": "C(adsorb)",
    "effectCode": "TRAP_B21_ACTIVATED_CARBON_ADSORPTION_NET_NORM_54",
    "effectText": "[Bẫy Thường / Normal Trap - Spell Speed 2]: Khi quái thú đối phương tuyên bố tấn công: Hủy bỏ đòn tấn công và chuyển quái thú đó sang tư thế Phòng thủ, đồng thời gây 300 LP phản chấn.",
    "scientificLore": "Hiện tượng hóa học Bẫy Hấp Phụ Khí Độc Bằng Than Hoạt Tính (Langmuir / Freundlich Multilayer Adsorption) ngăn chặn sự lan truyền phản ứng hoặc bẫy bắt các ion tự do thành pha rắn/khí trơ theo chuẩn GDPT 2018.",
    "relatedEquation": "Langmuir / Freundlich Multilayer Adsorption",
    "iupacName": "Activated Carbon Adsorption Net Countermeasure",
    "archetype": "HALOGEN_PURGE",
    "structuredEffects": [
      {
        "effectId": "B21_EFF_54",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "APPLY_STATUS",
            "params": {
              "statusType": "POSITION_LOCKED",
              "turns": 1
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Chặn đứng đòn tấn công, khóa tư thế quái thú địch và gây 300 LP."
      }
    ]
  },
  {
    "id": "card_b21_055_trap_lead_ii__iodide_golden_rain_trap_55",
    "name": "Bẫy Kết Tủa Chì(II) Iotua Hoàng Kim (Tầng Bẫy 7)",
    "name_en": "Lead(II) Iodide Golden Rain Trap (Barrier Level 7)",
    "cardType": "TRAP",
    "spellTrapSubtype": "NORMAL_TRAP",
    "spellSpeed": 2,
    "rarity": "COMMON",
    "attribute": "TERRA",
    "manaCost": 3,
    "chemicalFormula": "PbI2↓",
    "effectCode": "TRAP_B21_LEAD_II__IODIDE_GOLDEN_RAIN_TRAP_NORM_55",
    "effectText": "[Bẫy Thường / Normal Trap - Spell Speed 2]: Khi quái thú đối phương tuyên bố tấn công: Hủy bỏ đòn tấn công và chuyển quái thú đó sang tư thế Phòng thủ, đồng thời gây 300 LP phản chấn.",
    "scientificLore": "Hiện tượng hóa học Bẫy Kết Tủa Chì(II) Iotua Hoàng Kim (Pb²⁺(aq) + 2I⁻(aq) → PbI₂(s)↓ (Golden Glitter)) ngăn chặn sự lan truyền phản ứng hoặc bẫy bắt các ion tự do thành pha rắn/khí trơ theo chuẩn GDPT 2018.",
    "relatedEquation": "Pb²⁺(aq) + 2I⁻(aq) → PbI₂(s)↓ (Golden Glitter)",
    "iupacName": "Lead(II) Iodide Golden Rain Trap Countermeasure",
    "archetype": "PRECIPITATION_TRAP",
    "structuredEffects": [
      {
        "effectId": "B21_EFF_55",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "APPLY_STATUS",
            "params": {
              "statusType": "POSITION_LOCKED",
              "turns": 1
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Chặn đứng đòn tấn công, khóa tư thế quái thú địch và gây 300 LP."
      }
    ]
  },
  {
    "id": "card_b21_056_trap_hydrogen_gas_knallgas_detonation_trap_56",
    "name": "Bẫy Thoát Khí Hydro Nổ Tức Thời (Tầng Bẫy 7)",
    "name_en": "Hydrogen Gas Knallgas Detonation Trap (Barrier Level 7)",
    "cardType": "TRAP",
    "spellTrapSubtype": "NORMAL_TRAP",
    "spellSpeed": 2,
    "rarity": "COMMON",
    "attribute": "PYRO",
    "manaCost": 4,
    "chemicalFormula": "2H2 + O2",
    "effectCode": "TRAP_B21_HYDROGEN_GAS_KNALLGAS_DETONATION_TRAP_NORM_56",
    "effectText": "[Bẫy Thường / Normal Trap - Spell Speed 2]: Khi quái thú đối phương tuyên bố tấn công: Hủy bỏ đòn tấn công và chuyển quái thú đó sang tư thế Phòng thủ, đồng thời gây 300 LP phản chấn.",
    "scientificLore": "Hiện tượng hóa học Bẫy Thoát Khí Hydro Nổ Tức Thời (2H₂ + O₂ → 2H₂O (Explosive Shockwave)) ngăn chặn sự lan truyền phản ứng hoặc bẫy bắt các ion tự do thành pha rắn/khí trơ theo chuẩn GDPT 2018.",
    "relatedEquation": "2H₂ + O₂ → 2H₂O (Explosive Shockwave)",
    "iupacName": "Hydrogen Gas Knallgas Detonation Trap Countermeasure",
    "archetype": "HALOGEN_PURGE",
    "structuredEffects": [
      {
        "effectId": "B21_EFF_56",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "APPLY_STATUS",
            "params": {
              "statusType": "POSITION_LOCKED",
              "turns": 1
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Chặn đứng đòn tấn công, khóa tư thế quái thú địch và gây 300 LP."
      }
    ]
  },
  {
    "id": "card_b21_057_trap_silver_chloride_precipitation_barrier_57",
    "name": "Bẫy Kết Tủa Bạc Clorua Trắng (Tầng Bẫy 8)",
    "name_en": "Silver Chloride Precipitation Barrier (Barrier Level 8)",
    "cardType": "TRAP",
    "spellTrapSubtype": "NORMAL_TRAP",
    "spellSpeed": 2,
    "rarity": "COMMON",
    "attribute": "TERRA",
    "manaCost": 1,
    "chemicalFormula": "AgCl↓",
    "effectCode": "TRAP_B21_SILVER_CHLORIDE_PRECIPITATION_BARRIER_NORM_57",
    "effectText": "[Bẫy Thường / Normal Trap - Spell Speed 2]: Khi quái thú đối phương tuyên bố tấn công: Hủy bỏ đòn tấn công và chuyển quái thú đó sang tư thế Phòng thủ, đồng thời gây 300 LP phản chấn.",
    "scientificLore": "Hiện tượng hóa học Bẫy Kết Tủa Bạc Clorua Trắng (Ag⁺(aq) + Cl⁻(aq) → AgCl(s)↓ (Ksp = 1.77×10⁻¹⁰)) ngăn chặn sự lan truyền phản ứng hoặc bẫy bắt các ion tự do thành pha rắn/khí trơ theo chuẩn GDPT 2018.",
    "relatedEquation": "Ag⁺(aq) + Cl⁻(aq) → AgCl(s)↓ (Ksp = 1.77×10⁻¹⁰)",
    "iupacName": "Silver Chloride Precipitation Barrier Countermeasure",
    "archetype": "PRECIPITATION_TRAP",
    "structuredEffects": [
      {
        "effectId": "B21_EFF_57",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "APPLY_STATUS",
            "params": {
              "statusType": "POSITION_LOCKED",
              "turns": 1
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Chặn đứng đòn tấn công, khóa tư thế quái thú địch và gây 300 LP."
      }
    ]
  },
  {
    "id": "card_b21_058_trap_dry_chemical_extinguisher_quench_58",
    "name": "Bẫy Phun Khí Bột Chữa Cháy NaHCO3 (Tầng Bẫy 8)",
    "name_en": "Dry Chemical Extinguisher Quench (Barrier Level 8)",
    "cardType": "TRAP",
    "spellTrapSubtype": "NORMAL_TRAP",
    "spellSpeed": 2,
    "rarity": "RARE",
    "attribute": "AERO",
    "manaCost": 2,
    "chemicalFormula": "2NaHCO3",
    "effectCode": "TRAP_B21_DRY_CHEMICAL_EXTINGUISHER_QUENCH_NORM_58",
    "effectText": "[Bẫy Thường / Normal Trap - Spell Speed 2]: Khi quái thú đối phương tuyên bố tấn công: Hủy bỏ đòn tấn công và chuyển quái thú đó sang tư thế Phòng thủ, đồng thời gây 300 LP phản chấn.",
    "scientificLore": "Hiện tượng hóa học Bẫy Phun Khí Bột Chữa Cháy NaHCO3 (2NaHCO₃ --heat--> Na₂CO₃ + H₂O + CO₂↑) ngăn chặn sự lan truyền phản ứng hoặc bẫy bắt các ion tự do thành pha rắn/khí trơ theo chuẩn GDPT 2018.",
    "relatedEquation": "2NaHCO₃ --heat--> Na₂CO₃ + H₂O + CO₂↑",
    "iupacName": "Dry Chemical Extinguisher Quench Countermeasure",
    "archetype": "HALOGEN_PURGE",
    "structuredEffects": [
      {
        "effectId": "B21_EFF_58",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "APPLY_STATUS",
            "params": {
              "statusType": "POSITION_LOCKED",
              "turns": 1
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Chặn đứng đòn tấn công, khóa tư thế quái thú địch và gây 300 LP."
      }
    ]
  },
  {
    "id": "card_b21_059_trap_sacrificial_zinc_anode_discharge_59",
    "name": "Bẫy Anode Hy Sinh Chống Ăn Mòn (Tầng Bẫy 8)",
    "name_en": "Sacrificial Zinc Anode Discharge (Barrier Level 8)",
    "cardType": "TRAP",
    "spellTrapSubtype": "NORMAL_TRAP",
    "spellSpeed": 2,
    "rarity": "RARE",
    "attribute": "ELECTRO",
    "manaCost": 3,
    "chemicalFormula": "Zn → Zn2+ + 2e-",
    "effectCode": "TRAP_B21_SACRIFICIAL_ZINC_ANODE_DISCHARGE_NORM_59",
    "effectText": "[Bẫy Thường / Normal Trap - Spell Speed 2]: Khi quái thú đối phương tuyên bố tấn công: Hủy bỏ đòn tấn công và chuyển quái thú đó sang tư thế Phòng thủ, đồng thời gây 300 LP phản chấn.",
    "scientificLore": "Hiện tượng hóa học Bẫy Anode Hy Sinh Chống Ăn Mòn (Zn(s) → Zn²⁺(aq) + 2e⁻ (E° = -0.76V vs Fe -0.44V)) ngăn chặn sự lan truyền phản ứng hoặc bẫy bắt các ion tự do thành pha rắn/khí trơ theo chuẩn GDPT 2018.",
    "relatedEquation": "Zn(s) → Zn²⁺(aq) + 2e⁻ (E° = -0.76V vs Fe -0.44V)",
    "iupacName": "Sacrificial Zinc Anode Discharge Countermeasure",
    "archetype": "PRECIPITATION_TRAP",
    "structuredEffects": [
      {
        "effectId": "B21_EFF_59",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "APPLY_STATUS",
            "params": {
              "statusType": "POSITION_LOCKED",
              "turns": 1
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Chặn đứng đòn tấn công, khóa tư thế quái thú địch và gây 300 LP."
      }
    ]
  },
  {
    "id": "card_b21_060_trap_heavy_barium_sulfate_blockade_60",
    "name": "Bẫy Kết Tủa Vàng Bari Sunfat (Tầng Bẫy 8)",
    "name_en": "Heavy Barium Sulfate Blockade (Barrier Level 8)",
    "cardType": "TRAP",
    "spellTrapSubtype": "NORMAL_TRAP",
    "spellSpeed": 2,
    "rarity": "SUPER_RARE",
    "attribute": "TERRA",
    "manaCost": 4,
    "chemicalFormula": "BaSO4↓",
    "effectCode": "TRAP_B21_HEAVY_BARIUM_SULFATE_BLOCKADE_NORM_60",
    "effectText": "[Bẫy Thường / Normal Trap - Spell Speed 2]: Khi quái thú đối phương tuyên bố tấn công: Hủy bỏ đòn tấn công và chuyển quái thú đó sang tư thế Phòng thủ, đồng thời gây 300 LP phản chấn.",
    "scientificLore": "Hiện tượng hóa học Bẫy Kết Tủa Vàng Bari Sunfat (Ba²⁺(aq) + SO₄²⁻(aq) → BaSO₄(s)↓ (Ksp = 1.08×10⁻¹⁰)) ngăn chặn sự lan truyền phản ứng hoặc bẫy bắt các ion tự do thành pha rắn/khí trơ theo chuẩn GDPT 2018.",
    "relatedEquation": "Ba²⁺(aq) + SO₄²⁻(aq) → BaSO₄(s)↓ (Ksp = 1.08×10⁻¹⁰)",
    "iupacName": "Heavy Barium Sulfate Blockade Countermeasure",
    "archetype": "HALOGEN_PURGE",
    "structuredEffects": [
      {
        "effectId": "B21_EFF_60",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "APPLY_STATUS",
            "params": {
              "statusType": "POSITION_LOCKED",
              "turns": 1
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Chặn đứng đòn tấn công, khóa tư thế quái thú địch và gây 300 LP."
      }
    ]
  },
  {
    "id": "card_b21_061_trap_bleach_hypochlorite_vapor_trap_61",
    "name": "Bẫy Khí Clo Khử Trùng Cực Mạnh (Tầng Bẫy 8)",
    "name_en": "Bleach Hypochlorite Vapor Trap (Barrier Level 8)",
    "cardType": "TRAP",
    "spellTrapSubtype": "NORMAL_TRAP",
    "spellSpeed": 2,
    "rarity": "SUPER_RARE",
    "attribute": "AERO",
    "manaCost": 1,
    "chemicalFormula": "NaClO + HCl",
    "effectCode": "TRAP_B21_BLEACH_HYPOCHLORITE_VAPOR_TRAP_NORM_61",
    "effectText": "[Bẫy Thường / Normal Trap - Spell Speed 2]: Khi quái thú đối phương tuyên bố tấn công: Hủy bỏ đòn tấn công và chuyển quái thú đó sang tư thế Phòng thủ, đồng thời gây 300 LP phản chấn.",
    "scientificLore": "Hiện tượng hóa học Bẫy Khí Clo Khử Trùng Cực Mạnh (NaClO + 2HCl → NaCl + Cl₂↑ + H₂O) ngăn chặn sự lan truyền phản ứng hoặc bẫy bắt các ion tự do thành pha rắn/khí trơ theo chuẩn GDPT 2018.",
    "relatedEquation": "NaClO + 2HCl → NaCl + Cl₂↑ + H₂O",
    "iupacName": "Bleach Hypochlorite Vapor Trap Countermeasure",
    "archetype": "PRECIPITATION_TRAP",
    "structuredEffects": [
      {
        "effectId": "B21_EFF_61",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "APPLY_STATUS",
            "params": {
              "statusType": "POSITION_LOCKED",
              "turns": 1
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Chặn đứng đòn tấn công, khóa tư thế quái thú địch và gây 300 LP."
      }
    ]
  },
  {
    "id": "card_b21_062_trap_activated_carbon_adsorption_net_62",
    "name": "Bẫy Hấp Phụ Khí Độc Bằng Than Hoạt Tính (Tầng Bẫy 8)",
    "name_en": "Activated Carbon Adsorption Net (Barrier Level 8)",
    "cardType": "TRAP",
    "spellTrapSubtype": "NORMAL_TRAP",
    "spellSpeed": 2,
    "rarity": "ULTRA_RARE",
    "attribute": "TERRA",
    "manaCost": 2,
    "chemicalFormula": "C(adsorb)",
    "effectCode": "TRAP_B21_ACTIVATED_CARBON_ADSORPTION_NET_NORM_62",
    "effectText": "[Bẫy Thường / Normal Trap - Spell Speed 2]: Khi quái thú đối phương tuyên bố tấn công: Hủy bỏ đòn tấn công và chuyển quái thú đó sang tư thế Phòng thủ, đồng thời gây 300 LP phản chấn.",
    "scientificLore": "Hiện tượng hóa học Bẫy Hấp Phụ Khí Độc Bằng Than Hoạt Tính (Langmuir / Freundlich Multilayer Adsorption) ngăn chặn sự lan truyền phản ứng hoặc bẫy bắt các ion tự do thành pha rắn/khí trơ theo chuẩn GDPT 2018.",
    "relatedEquation": "Langmuir / Freundlich Multilayer Adsorption",
    "iupacName": "Activated Carbon Adsorption Net Countermeasure",
    "archetype": "HALOGEN_PURGE",
    "structuredEffects": [
      {
        "effectId": "B21_EFF_62",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "APPLY_STATUS",
            "params": {
              "statusType": "POSITION_LOCKED",
              "turns": 1
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Chặn đứng đòn tấn công, khóa tư thế quái thú địch và gây 300 LP."
      }
    ]
  },
  {
    "id": "card_b21_063_trap_lead_ii__iodide_golden_rain_trap_63",
    "name": "Bẫy Kết Tủa Chì(II) Iotua Hoàng Kim (Tầng Bẫy 8)",
    "name_en": "Lead(II) Iodide Golden Rain Trap (Barrier Level 8)",
    "cardType": "TRAP",
    "spellTrapSubtype": "NORMAL_TRAP",
    "spellSpeed": 2,
    "rarity": "SECRET_RARE",
    "attribute": "TERRA",
    "manaCost": 3,
    "chemicalFormula": "PbI2↓",
    "effectCode": "TRAP_B21_LEAD_II__IODIDE_GOLDEN_RAIN_TRAP_NORM_63",
    "effectText": "[Bẫy Thường / Normal Trap - Spell Speed 2]: Khi quái thú đối phương tuyên bố tấn công: Hủy bỏ đòn tấn công và chuyển quái thú đó sang tư thế Phòng thủ, đồng thời gây 300 LP phản chấn.",
    "scientificLore": "Hiện tượng hóa học Bẫy Kết Tủa Chì(II) Iotua Hoàng Kim (Pb²⁺(aq) + 2I⁻(aq) → PbI₂(s)↓ (Golden Glitter)) ngăn chặn sự lan truyền phản ứng hoặc bẫy bắt các ion tự do thành pha rắn/khí trơ theo chuẩn GDPT 2018.",
    "relatedEquation": "Pb²⁺(aq) + 2I⁻(aq) → PbI₂(s)↓ (Golden Glitter)",
    "iupacName": "Lead(II) Iodide Golden Rain Trap Countermeasure",
    "archetype": "PRECIPITATION_TRAP",
    "structuredEffects": [
      {
        "effectId": "B21_EFF_63",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "APPLY_STATUS",
            "params": {
              "statusType": "POSITION_LOCKED",
              "turns": 1
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Chặn đứng đòn tấn công, khóa tư thế quái thú địch và gây 300 LP."
      }
    ]
  },
  {
    "id": "card_b21_064_trap_hydrogen_gas_knallgas_detonation_trap_64",
    "name": "Bẫy Thoát Khí Hydro Nổ Tức Thời (Tầng Bẫy 8)",
    "name_en": "Hydrogen Gas Knallgas Detonation Trap (Barrier Level 8)",
    "cardType": "TRAP",
    "spellTrapSubtype": "NORMAL_TRAP",
    "spellSpeed": 2,
    "rarity": "COMMON",
    "attribute": "PYRO",
    "manaCost": 4,
    "chemicalFormula": "2H2 + O2",
    "effectCode": "TRAP_B21_HYDROGEN_GAS_KNALLGAS_DETONATION_TRAP_NORM_64",
    "effectText": "[Bẫy Thường / Normal Trap - Spell Speed 2]: Khi quái thú đối phương tuyên bố tấn công: Hủy bỏ đòn tấn công và chuyển quái thú đó sang tư thế Phòng thủ, đồng thời gây 300 LP phản chấn.",
    "scientificLore": "Hiện tượng hóa học Bẫy Thoát Khí Hydro Nổ Tức Thời (2H₂ + O₂ → 2H₂O (Explosive Shockwave)) ngăn chặn sự lan truyền phản ứng hoặc bẫy bắt các ion tự do thành pha rắn/khí trơ theo chuẩn GDPT 2018.",
    "relatedEquation": "2H₂ + O₂ → 2H₂O (Explosive Shockwave)",
    "iupacName": "Hydrogen Gas Knallgas Detonation Trap Countermeasure",
    "archetype": "HALOGEN_PURGE",
    "structuredEffects": [
      {
        "effectId": "B21_EFF_64",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "APPLY_STATUS",
            "params": {
              "statusType": "POSITION_LOCKED",
              "turns": 1
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Chặn đứng đòn tấn công, khóa tư thế quái thú địch và gây 300 LP."
      }
    ]
  },
  {
    "id": "card_b21_065_trap_silver_chloride_precipitation_barrier_65",
    "name": "Bẫy Kết Tủa Bạc Clorua Trắng (Tầng Bẫy 9)",
    "name_en": "Silver Chloride Precipitation Barrier (Barrier Level 9)",
    "cardType": "TRAP",
    "spellTrapSubtype": "NORMAL_TRAP",
    "spellSpeed": 2,
    "rarity": "COMMON",
    "attribute": "TERRA",
    "manaCost": 1,
    "chemicalFormula": "AgCl↓",
    "effectCode": "TRAP_B21_SILVER_CHLORIDE_PRECIPITATION_BARRIER_NORM_65",
    "effectText": "[Bẫy Thường / Normal Trap - Spell Speed 2]: Khi quái thú đối phương tuyên bố tấn công: Hủy bỏ đòn tấn công và chuyển quái thú đó sang tư thế Phòng thủ, đồng thời gây 300 LP phản chấn.",
    "scientificLore": "Hiện tượng hóa học Bẫy Kết Tủa Bạc Clorua Trắng (Ag⁺(aq) + Cl⁻(aq) → AgCl(s)↓ (Ksp = 1.77×10⁻¹⁰)) ngăn chặn sự lan truyền phản ứng hoặc bẫy bắt các ion tự do thành pha rắn/khí trơ theo chuẩn GDPT 2018.",
    "relatedEquation": "Ag⁺(aq) + Cl⁻(aq) → AgCl(s)↓ (Ksp = 1.77×10⁻¹⁰)",
    "iupacName": "Silver Chloride Precipitation Barrier Countermeasure",
    "archetype": "PRECIPITATION_TRAP",
    "structuredEffects": [
      {
        "effectId": "B21_EFF_65",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "APPLY_STATUS",
            "params": {
              "statusType": "POSITION_LOCKED",
              "turns": 1
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Chặn đứng đòn tấn công, khóa tư thế quái thú địch và gây 300 LP."
      }
    ]
  },
  {
    "id": "card_b21_066_trap_dry_chemical_extinguisher_quench_66",
    "name": "Bẫy Phun Khí Bột Chữa Cháy NaHCO3 (Tầng Bẫy 9)",
    "name_en": "Dry Chemical Extinguisher Quench (Barrier Level 9)",
    "cardType": "TRAP",
    "spellTrapSubtype": "NORMAL_TRAP",
    "spellSpeed": 2,
    "rarity": "COMMON",
    "attribute": "AERO",
    "manaCost": 2,
    "chemicalFormula": "2NaHCO3",
    "effectCode": "TRAP_B21_DRY_CHEMICAL_EXTINGUISHER_QUENCH_NORM_66",
    "effectText": "[Bẫy Thường / Normal Trap - Spell Speed 2]: Khi quái thú đối phương tuyên bố tấn công: Hủy bỏ đòn tấn công và chuyển quái thú đó sang tư thế Phòng thủ, đồng thời gây 300 LP phản chấn.",
    "scientificLore": "Hiện tượng hóa học Bẫy Phun Khí Bột Chữa Cháy NaHCO3 (2NaHCO₃ --heat--> Na₂CO₃ + H₂O + CO₂↑) ngăn chặn sự lan truyền phản ứng hoặc bẫy bắt các ion tự do thành pha rắn/khí trơ theo chuẩn GDPT 2018.",
    "relatedEquation": "2NaHCO₃ --heat--> Na₂CO₃ + H₂O + CO₂↑",
    "iupacName": "Dry Chemical Extinguisher Quench Countermeasure",
    "archetype": "HALOGEN_PURGE",
    "structuredEffects": [
      {
        "effectId": "B21_EFF_66",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "APPLY_STATUS",
            "params": {
              "statusType": "POSITION_LOCKED",
              "turns": 1
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Chặn đứng đòn tấn công, khóa tư thế quái thú địch và gây 300 LP."
      }
    ]
  },
  {
    "id": "card_b21_067_trap_sacrificial_zinc_anode_discharge_67",
    "name": "Bẫy Anode Hy Sinh Chống Ăn Mòn (Tầng Bẫy 9)",
    "name_en": "Sacrificial Zinc Anode Discharge (Barrier Level 9)",
    "cardType": "TRAP",
    "spellTrapSubtype": "NORMAL_TRAP",
    "spellSpeed": 2,
    "rarity": "RARE",
    "attribute": "ELECTRO",
    "manaCost": 3,
    "chemicalFormula": "Zn → Zn2+ + 2e-",
    "effectCode": "TRAP_B21_SACRIFICIAL_ZINC_ANODE_DISCHARGE_NORM_67",
    "effectText": "[Bẫy Thường / Normal Trap - Spell Speed 2]: Khi quái thú đối phương tuyên bố tấn công: Hủy bỏ đòn tấn công và chuyển quái thú đó sang tư thế Phòng thủ, đồng thời gây 300 LP phản chấn.",
    "scientificLore": "Hiện tượng hóa học Bẫy Anode Hy Sinh Chống Ăn Mòn (Zn(s) → Zn²⁺(aq) + 2e⁻ (E° = -0.76V vs Fe -0.44V)) ngăn chặn sự lan truyền phản ứng hoặc bẫy bắt các ion tự do thành pha rắn/khí trơ theo chuẩn GDPT 2018.",
    "relatedEquation": "Zn(s) → Zn²⁺(aq) + 2e⁻ (E° = -0.76V vs Fe -0.44V)",
    "iupacName": "Sacrificial Zinc Anode Discharge Countermeasure",
    "archetype": "PRECIPITATION_TRAP",
    "structuredEffects": [
      {
        "effectId": "B21_EFF_67",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "APPLY_STATUS",
            "params": {
              "statusType": "POSITION_LOCKED",
              "turns": 1
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Chặn đứng đòn tấn công, khóa tư thế quái thú địch và gây 300 LP."
      }
    ]
  },
  {
    "id": "card_b21_068_trap_heavy_barium_sulfate_blockade_68",
    "name": "Bẫy Kết Tủa Vàng Bari Sunfat (Tầng Bẫy 9)",
    "name_en": "Heavy Barium Sulfate Blockade (Barrier Level 9)",
    "cardType": "TRAP",
    "spellTrapSubtype": "NORMAL_TRAP",
    "spellSpeed": 2,
    "rarity": "RARE",
    "attribute": "TERRA",
    "manaCost": 4,
    "chemicalFormula": "BaSO4↓",
    "effectCode": "TRAP_B21_HEAVY_BARIUM_SULFATE_BLOCKADE_NORM_68",
    "effectText": "[Bẫy Thường / Normal Trap - Spell Speed 2]: Khi quái thú đối phương tuyên bố tấn công: Hủy bỏ đòn tấn công và chuyển quái thú đó sang tư thế Phòng thủ, đồng thời gây 300 LP phản chấn.",
    "scientificLore": "Hiện tượng hóa học Bẫy Kết Tủa Vàng Bari Sunfat (Ba²⁺(aq) + SO₄²⁻(aq) → BaSO₄(s)↓ (Ksp = 1.08×10⁻¹⁰)) ngăn chặn sự lan truyền phản ứng hoặc bẫy bắt các ion tự do thành pha rắn/khí trơ theo chuẩn GDPT 2018.",
    "relatedEquation": "Ba²⁺(aq) + SO₄²⁻(aq) → BaSO₄(s)↓ (Ksp = 1.08×10⁻¹⁰)",
    "iupacName": "Heavy Barium Sulfate Blockade Countermeasure",
    "archetype": "HALOGEN_PURGE",
    "structuredEffects": [
      {
        "effectId": "B21_EFF_68",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "APPLY_STATUS",
            "params": {
              "statusType": "POSITION_LOCKED",
              "turns": 1
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Chặn đứng đòn tấn công, khóa tư thế quái thú địch và gây 300 LP."
      }
    ]
  },
  {
    "id": "card_b21_069_trap_bleach_hypochlorite_vapor_trap_69",
    "name": "Bẫy Khí Clo Khử Trùng Cực Mạnh (Tầng Bẫy 9)",
    "name_en": "Bleach Hypochlorite Vapor Trap (Barrier Level 9)",
    "cardType": "TRAP",
    "spellTrapSubtype": "NORMAL_TRAP",
    "spellSpeed": 2,
    "rarity": "SUPER_RARE",
    "attribute": "AERO",
    "manaCost": 1,
    "chemicalFormula": "NaClO + HCl",
    "effectCode": "TRAP_B21_BLEACH_HYPOCHLORITE_VAPOR_TRAP_NORM_69",
    "effectText": "[Bẫy Thường / Normal Trap - Spell Speed 2]: Khi quái thú đối phương tuyên bố tấn công: Hủy bỏ đòn tấn công và chuyển quái thú đó sang tư thế Phòng thủ, đồng thời gây 300 LP phản chấn.",
    "scientificLore": "Hiện tượng hóa học Bẫy Khí Clo Khử Trùng Cực Mạnh (NaClO + 2HCl → NaCl + Cl₂↑ + H₂O) ngăn chặn sự lan truyền phản ứng hoặc bẫy bắt các ion tự do thành pha rắn/khí trơ theo chuẩn GDPT 2018.",
    "relatedEquation": "NaClO + 2HCl → NaCl + Cl₂↑ + H₂O",
    "iupacName": "Bleach Hypochlorite Vapor Trap Countermeasure",
    "archetype": "PRECIPITATION_TRAP",
    "structuredEffects": [
      {
        "effectId": "B21_EFF_69",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "APPLY_STATUS",
            "params": {
              "statusType": "POSITION_LOCKED",
              "turns": 1
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Chặn đứng đòn tấn công, khóa tư thế quái thú địch và gây 300 LP."
      }
    ]
  },
  {
    "id": "card_b21_070_trap_activated_carbon_adsorption_net_70",
    "name": "Bẫy Hấp Phụ Khí Độc Bằng Than Hoạt Tính (Tầng Bẫy 9)",
    "name_en": "Activated Carbon Adsorption Net (Barrier Level 9)",
    "cardType": "TRAP",
    "spellTrapSubtype": "NORMAL_TRAP",
    "spellSpeed": 2,
    "rarity": "SUPER_RARE",
    "attribute": "TERRA",
    "manaCost": 2,
    "chemicalFormula": "C(adsorb)",
    "effectCode": "TRAP_B21_ACTIVATED_CARBON_ADSORPTION_NET_NORM_70",
    "effectText": "[Bẫy Thường / Normal Trap - Spell Speed 2]: Khi quái thú đối phương tuyên bố tấn công: Hủy bỏ đòn tấn công và chuyển quái thú đó sang tư thế Phòng thủ, đồng thời gây 300 LP phản chấn.",
    "scientificLore": "Hiện tượng hóa học Bẫy Hấp Phụ Khí Độc Bằng Than Hoạt Tính (Langmuir / Freundlich Multilayer Adsorption) ngăn chặn sự lan truyền phản ứng hoặc bẫy bắt các ion tự do thành pha rắn/khí trơ theo chuẩn GDPT 2018.",
    "relatedEquation": "Langmuir / Freundlich Multilayer Adsorption",
    "iupacName": "Activated Carbon Adsorption Net Countermeasure",
    "archetype": "HALOGEN_PURGE",
    "structuredEffects": [
      {
        "effectId": "B21_EFF_70",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "APPLY_STATUS",
            "params": {
              "statusType": "POSITION_LOCKED",
              "turns": 1
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Chặn đứng đòn tấn công, khóa tư thế quái thú địch và gây 300 LP."
      }
    ]
  },
  {
    "id": "card_b21_071_trap_lead_ii__iodide_golden_rain_trap_71",
    "name": "Bẫy Kết Tủa Chì(II) Iotua Hoàng Kim (Tầng Bẫy 9)",
    "name_en": "Lead(II) Iodide Golden Rain Trap (Barrier Level 9)",
    "cardType": "TRAP",
    "spellTrapSubtype": "NORMAL_TRAP",
    "spellSpeed": 2,
    "rarity": "ULTRA_RARE",
    "attribute": "TERRA",
    "manaCost": 3,
    "chemicalFormula": "PbI2↓",
    "effectCode": "TRAP_B21_LEAD_II__IODIDE_GOLDEN_RAIN_TRAP_NORM_71",
    "effectText": "[Bẫy Thường / Normal Trap - Spell Speed 2]: Khi quái thú đối phương tuyên bố tấn công: Hủy bỏ đòn tấn công và chuyển quái thú đó sang tư thế Phòng thủ, đồng thời gây 300 LP phản chấn.",
    "scientificLore": "Hiện tượng hóa học Bẫy Kết Tủa Chì(II) Iotua Hoàng Kim (Pb²⁺(aq) + 2I⁻(aq) → PbI₂(s)↓ (Golden Glitter)) ngăn chặn sự lan truyền phản ứng hoặc bẫy bắt các ion tự do thành pha rắn/khí trơ theo chuẩn GDPT 2018.",
    "relatedEquation": "Pb²⁺(aq) + 2I⁻(aq) → PbI₂(s)↓ (Golden Glitter)",
    "iupacName": "Lead(II) Iodide Golden Rain Trap Countermeasure",
    "archetype": "PRECIPITATION_TRAP",
    "structuredEffects": [
      {
        "effectId": "B21_EFF_71",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "APPLY_STATUS",
            "params": {
              "statusType": "POSITION_LOCKED",
              "turns": 1
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Chặn đứng đòn tấn công, khóa tư thế quái thú địch và gây 300 LP."
      }
    ]
  },
  {
    "id": "card_b21_072_trap_hydrogen_gas_knallgas_detonation_trap_72",
    "name": "Bẫy Thoát Khí Hydro Nổ Tức Thời (Tầng Bẫy 9)",
    "name_en": "Hydrogen Gas Knallgas Detonation Trap (Barrier Level 9)",
    "cardType": "TRAP",
    "spellTrapSubtype": "NORMAL_TRAP",
    "spellSpeed": 2,
    "rarity": "SECRET_RARE",
    "attribute": "PYRO",
    "manaCost": 4,
    "chemicalFormula": "2H2 + O2",
    "effectCode": "TRAP_B21_HYDROGEN_GAS_KNALLGAS_DETONATION_TRAP_NORM_72",
    "effectText": "[Bẫy Thường / Normal Trap - Spell Speed 2]: Khi quái thú đối phương tuyên bố tấn công: Hủy bỏ đòn tấn công và chuyển quái thú đó sang tư thế Phòng thủ, đồng thời gây 300 LP phản chấn.",
    "scientificLore": "Hiện tượng hóa học Bẫy Thoát Khí Hydro Nổ Tức Thời (2H₂ + O₂ → 2H₂O (Explosive Shockwave)) ngăn chặn sự lan truyền phản ứng hoặc bẫy bắt các ion tự do thành pha rắn/khí trơ theo chuẩn GDPT 2018.",
    "relatedEquation": "2H₂ + O₂ → 2H₂O (Explosive Shockwave)",
    "iupacName": "Hydrogen Gas Knallgas Detonation Trap Countermeasure",
    "archetype": "HALOGEN_PURGE",
    "structuredEffects": [
      {
        "effectId": "B21_EFF_72",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "APPLY_STATUS",
            "params": {
              "statusType": "POSITION_LOCKED",
              "turns": 1
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Chặn đứng đòn tấn công, khóa tư thế quái thú địch và gây 300 LP."
      }
    ]
  },
  {
    "id": "card_b21_073_trap_silver_chloride_precipitation_barrier_73",
    "name": "Bẫy Kết Tủa Bạc Clorua Trắng (Tầng Bẫy 10)",
    "name_en": "Silver Chloride Precipitation Barrier (Barrier Level 10)",
    "cardType": "TRAP",
    "spellTrapSubtype": "NORMAL_TRAP",
    "spellSpeed": 2,
    "rarity": "COMMON",
    "attribute": "TERRA",
    "manaCost": 1,
    "chemicalFormula": "AgCl↓",
    "effectCode": "TRAP_B21_SILVER_CHLORIDE_PRECIPITATION_BARRIER_NORM_73",
    "effectText": "[Bẫy Thường / Normal Trap - Spell Speed 2]: Khi quái thú đối phương tuyên bố tấn công: Hủy bỏ đòn tấn công và chuyển quái thú đó sang tư thế Phòng thủ, đồng thời gây 300 LP phản chấn.",
    "scientificLore": "Hiện tượng hóa học Bẫy Kết Tủa Bạc Clorua Trắng (Ag⁺(aq) + Cl⁻(aq) → AgCl(s)↓ (Ksp = 1.77×10⁻¹⁰)) ngăn chặn sự lan truyền phản ứng hoặc bẫy bắt các ion tự do thành pha rắn/khí trơ theo chuẩn GDPT 2018.",
    "relatedEquation": "Ag⁺(aq) + Cl⁻(aq) → AgCl(s)↓ (Ksp = 1.77×10⁻¹⁰)",
    "iupacName": "Silver Chloride Precipitation Barrier Countermeasure",
    "archetype": "PRECIPITATION_TRAP",
    "structuredEffects": [
      {
        "effectId": "B21_EFF_73",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "APPLY_STATUS",
            "params": {
              "statusType": "POSITION_LOCKED",
              "turns": 1
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Chặn đứng đòn tấn công, khóa tư thế quái thú địch và gây 300 LP."
      }
    ]
  },
  {
    "id": "card_b21_074_trap_dry_chemical_extinguisher_quench_74",
    "name": "Bẫy Phun Khí Bột Chữa Cháy NaHCO3 (Tầng Bẫy 10)",
    "name_en": "Dry Chemical Extinguisher Quench (Barrier Level 10)",
    "cardType": "TRAP",
    "spellTrapSubtype": "NORMAL_TRAP",
    "spellSpeed": 2,
    "rarity": "COMMON",
    "attribute": "AERO",
    "manaCost": 2,
    "chemicalFormula": "2NaHCO3",
    "effectCode": "TRAP_B21_DRY_CHEMICAL_EXTINGUISHER_QUENCH_NORM_74",
    "effectText": "[Bẫy Thường / Normal Trap - Spell Speed 2]: Khi quái thú đối phương tuyên bố tấn công: Hủy bỏ đòn tấn công và chuyển quái thú đó sang tư thế Phòng thủ, đồng thời gây 300 LP phản chấn.",
    "scientificLore": "Hiện tượng hóa học Bẫy Phun Khí Bột Chữa Cháy NaHCO3 (2NaHCO₃ --heat--> Na₂CO₃ + H₂O + CO₂↑) ngăn chặn sự lan truyền phản ứng hoặc bẫy bắt các ion tự do thành pha rắn/khí trơ theo chuẩn GDPT 2018.",
    "relatedEquation": "2NaHCO₃ --heat--> Na₂CO₃ + H₂O + CO₂↑",
    "iupacName": "Dry Chemical Extinguisher Quench Countermeasure",
    "archetype": "HALOGEN_PURGE",
    "structuredEffects": [
      {
        "effectId": "B21_EFF_74",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "APPLY_STATUS",
            "params": {
              "statusType": "POSITION_LOCKED",
              "turns": 1
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Chặn đứng đòn tấn công, khóa tư thế quái thú địch và gây 300 LP."
      }
    ]
  },
  {
    "id": "card_b21_075_trap_sacrificial_zinc_anode_discharge_75",
    "name": "Bẫy Anode Hy Sinh Chống Ăn Mòn (Tầng Bẫy 10)",
    "name_en": "Sacrificial Zinc Anode Discharge (Barrier Level 10)",
    "cardType": "TRAP",
    "spellTrapSubtype": "NORMAL_TRAP",
    "spellSpeed": 2,
    "rarity": "COMMON",
    "attribute": "ELECTRO",
    "manaCost": 3,
    "chemicalFormula": "Zn → Zn2+ + 2e-",
    "effectCode": "TRAP_B21_SACRIFICIAL_ZINC_ANODE_DISCHARGE_NORM_75",
    "effectText": "[Bẫy Thường / Normal Trap - Spell Speed 2]: Khi quái thú đối phương tuyên bố tấn công: Hủy bỏ đòn tấn công và chuyển quái thú đó sang tư thế Phòng thủ, đồng thời gây 300 LP phản chấn.",
    "scientificLore": "Hiện tượng hóa học Bẫy Anode Hy Sinh Chống Ăn Mòn (Zn(s) → Zn²⁺(aq) + 2e⁻ (E° = -0.76V vs Fe -0.44V)) ngăn chặn sự lan truyền phản ứng hoặc bẫy bắt các ion tự do thành pha rắn/khí trơ theo chuẩn GDPT 2018.",
    "relatedEquation": "Zn(s) → Zn²⁺(aq) + 2e⁻ (E° = -0.76V vs Fe -0.44V)",
    "iupacName": "Sacrificial Zinc Anode Discharge Countermeasure",
    "archetype": "PRECIPITATION_TRAP",
    "structuredEffects": [
      {
        "effectId": "B21_EFF_75",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "APPLY_STATUS",
            "params": {
              "statusType": "POSITION_LOCKED",
              "turns": 1
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Chặn đứng đòn tấn công, khóa tư thế quái thú địch và gây 300 LP."
      }
    ]
  },
  {
    "id": "card_b21_076_trap_heavy_barium_sulfate_blockade_76",
    "name": "Bẫy Kết Tủa Vàng Bari Sunfat (Tầng Bẫy 10)",
    "name_en": "Heavy Barium Sulfate Blockade (Barrier Level 10)",
    "cardType": "TRAP",
    "spellTrapSubtype": "NORMAL_TRAP",
    "spellSpeed": 2,
    "rarity": "RARE",
    "attribute": "TERRA",
    "manaCost": 4,
    "chemicalFormula": "BaSO4↓",
    "effectCode": "TRAP_B21_HEAVY_BARIUM_SULFATE_BLOCKADE_NORM_76",
    "effectText": "[Bẫy Thường / Normal Trap - Spell Speed 2]: Khi quái thú đối phương tuyên bố tấn công: Hủy bỏ đòn tấn công và chuyển quái thú đó sang tư thế Phòng thủ, đồng thời gây 300 LP phản chấn.",
    "scientificLore": "Hiện tượng hóa học Bẫy Kết Tủa Vàng Bari Sunfat (Ba²⁺(aq) + SO₄²⁻(aq) → BaSO₄(s)↓ (Ksp = 1.08×10⁻¹⁰)) ngăn chặn sự lan truyền phản ứng hoặc bẫy bắt các ion tự do thành pha rắn/khí trơ theo chuẩn GDPT 2018.",
    "relatedEquation": "Ba²⁺(aq) + SO₄²⁻(aq) → BaSO₄(s)↓ (Ksp = 1.08×10⁻¹⁰)",
    "iupacName": "Heavy Barium Sulfate Blockade Countermeasure",
    "archetype": "HALOGEN_PURGE",
    "structuredEffects": [
      {
        "effectId": "B21_EFF_76",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "APPLY_STATUS",
            "params": {
              "statusType": "POSITION_LOCKED",
              "turns": 1
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Chặn đứng đòn tấn công, khóa tư thế quái thú địch và gây 300 LP."
      }
    ]
  },
  {
    "id": "card_b21_077_trap_bleach_hypochlorite_vapor_trap_77",
    "name": "Bẫy Khí Clo Khử Trùng Cực Mạnh (Tầng Bẫy 10)",
    "name_en": "Bleach Hypochlorite Vapor Trap (Barrier Level 10)",
    "cardType": "TRAP",
    "spellTrapSubtype": "NORMAL_TRAP",
    "spellSpeed": 2,
    "rarity": "RARE",
    "attribute": "AERO",
    "manaCost": 1,
    "chemicalFormula": "NaClO + HCl",
    "effectCode": "TRAP_B21_BLEACH_HYPOCHLORITE_VAPOR_TRAP_NORM_77",
    "effectText": "[Bẫy Thường / Normal Trap - Spell Speed 2]: Khi quái thú đối phương tuyên bố tấn công: Hủy bỏ đòn tấn công và chuyển quái thú đó sang tư thế Phòng thủ, đồng thời gây 300 LP phản chấn.",
    "scientificLore": "Hiện tượng hóa học Bẫy Khí Clo Khử Trùng Cực Mạnh (NaClO + 2HCl → NaCl + Cl₂↑ + H₂O) ngăn chặn sự lan truyền phản ứng hoặc bẫy bắt các ion tự do thành pha rắn/khí trơ theo chuẩn GDPT 2018.",
    "relatedEquation": "NaClO + 2HCl → NaCl + Cl₂↑ + H₂O",
    "iupacName": "Bleach Hypochlorite Vapor Trap Countermeasure",
    "archetype": "PRECIPITATION_TRAP",
    "structuredEffects": [
      {
        "effectId": "B21_EFF_77",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "APPLY_STATUS",
            "params": {
              "statusType": "POSITION_LOCKED",
              "turns": 1
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Chặn đứng đòn tấn công, khóa tư thế quái thú địch và gây 300 LP."
      }
    ]
  },
  {
    "id": "card_b21_078_trap_activated_carbon_adsorption_net_78",
    "name": "Bẫy Hấp Phụ Khí Độc Bằng Than Hoạt Tính (Tầng Bẫy 10)",
    "name_en": "Activated Carbon Adsorption Net (Barrier Level 10)",
    "cardType": "TRAP",
    "spellTrapSubtype": "NORMAL_TRAP",
    "spellSpeed": 2,
    "rarity": "SUPER_RARE",
    "attribute": "TERRA",
    "manaCost": 2,
    "chemicalFormula": "C(adsorb)",
    "effectCode": "TRAP_B21_ACTIVATED_CARBON_ADSORPTION_NET_NORM_78",
    "effectText": "[Bẫy Thường / Normal Trap - Spell Speed 2]: Khi quái thú đối phương tuyên bố tấn công: Hủy bỏ đòn tấn công và chuyển quái thú đó sang tư thế Phòng thủ, đồng thời gây 300 LP phản chấn.",
    "scientificLore": "Hiện tượng hóa học Bẫy Hấp Phụ Khí Độc Bằng Than Hoạt Tính (Langmuir / Freundlich Multilayer Adsorption) ngăn chặn sự lan truyền phản ứng hoặc bẫy bắt các ion tự do thành pha rắn/khí trơ theo chuẩn GDPT 2018.",
    "relatedEquation": "Langmuir / Freundlich Multilayer Adsorption",
    "iupacName": "Activated Carbon Adsorption Net Countermeasure",
    "archetype": "HALOGEN_PURGE",
    "structuredEffects": [
      {
        "effectId": "B21_EFF_78",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "APPLY_STATUS",
            "params": {
              "statusType": "POSITION_LOCKED",
              "turns": 1
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Chặn đứng đòn tấn công, khóa tư thế quái thú địch và gây 300 LP."
      }
    ]
  },
  {
    "id": "card_b21_079_trap_lead_ii__iodide_golden_rain_trap_79",
    "name": "Bẫy Kết Tủa Chì(II) Iotua Hoàng Kim (Tầng Bẫy 10)",
    "name_en": "Lead(II) Iodide Golden Rain Trap (Barrier Level 10)",
    "cardType": "TRAP",
    "spellTrapSubtype": "NORMAL_TRAP",
    "spellSpeed": 2,
    "rarity": "SUPER_RARE",
    "attribute": "TERRA",
    "manaCost": 3,
    "chemicalFormula": "PbI2↓",
    "effectCode": "TRAP_B21_LEAD_II__IODIDE_GOLDEN_RAIN_TRAP_NORM_79",
    "effectText": "[Bẫy Thường / Normal Trap - Spell Speed 2]: Khi quái thú đối phương tuyên bố tấn công: Hủy bỏ đòn tấn công và chuyển quái thú đó sang tư thế Phòng thủ, đồng thời gây 300 LP phản chấn.",
    "scientificLore": "Hiện tượng hóa học Bẫy Kết Tủa Chì(II) Iotua Hoàng Kim (Pb²⁺(aq) + 2I⁻(aq) → PbI₂(s)↓ (Golden Glitter)) ngăn chặn sự lan truyền phản ứng hoặc bẫy bắt các ion tự do thành pha rắn/khí trơ theo chuẩn GDPT 2018.",
    "relatedEquation": "Pb²⁺(aq) + 2I⁻(aq) → PbI₂(s)↓ (Golden Glitter)",
    "iupacName": "Lead(II) Iodide Golden Rain Trap Countermeasure",
    "archetype": "PRECIPITATION_TRAP",
    "structuredEffects": [
      {
        "effectId": "B21_EFF_79",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "APPLY_STATUS",
            "params": {
              "statusType": "POSITION_LOCKED",
              "turns": 1
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Chặn đứng đòn tấn công, khóa tư thế quái thú địch và gây 300 LP."
      }
    ]
  },
  {
    "id": "card_b21_080_trap_hydrogen_gas_knallgas_detonation_trap_80",
    "name": "Bẫy Thoát Khí Hydro Nổ Tức Thời (Tầng Bẫy 10)",
    "name_en": "Hydrogen Gas Knallgas Detonation Trap (Barrier Level 10)",
    "cardType": "TRAP",
    "spellTrapSubtype": "NORMAL_TRAP",
    "spellSpeed": 2,
    "rarity": "ULTRA_RARE",
    "attribute": "PYRO",
    "manaCost": 4,
    "chemicalFormula": "2H2 + O2",
    "effectCode": "TRAP_B21_HYDROGEN_GAS_KNALLGAS_DETONATION_TRAP_NORM_80",
    "effectText": "[Bẫy Thường / Normal Trap - Spell Speed 2]: Khi quái thú đối phương tuyên bố tấn công: Hủy bỏ đòn tấn công và chuyển quái thú đó sang tư thế Phòng thủ, đồng thời gây 300 LP phản chấn.",
    "scientificLore": "Hiện tượng hóa học Bẫy Thoát Khí Hydro Nổ Tức Thời (2H₂ + O₂ → 2H₂O (Explosive Shockwave)) ngăn chặn sự lan truyền phản ứng hoặc bẫy bắt các ion tự do thành pha rắn/khí trơ theo chuẩn GDPT 2018.",
    "relatedEquation": "2H₂ + O₂ → 2H₂O (Explosive Shockwave)",
    "iupacName": "Hydrogen Gas Knallgas Detonation Trap Countermeasure",
    "archetype": "HALOGEN_PURGE",
    "structuredEffects": [
      {
        "effectId": "B21_EFF_80",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "APPLY_STATUS",
            "params": {
              "statusType": "POSITION_LOCKED",
              "turns": 1
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Chặn đứng đòn tấn công, khóa tư thế quái thú địch và gây 300 LP."
      }
    ]
  },
  {
    "id": "card_b21_081_trap_silver_chloride_precipitation_barrier_81",
    "name": "Bẫy Kết Tủa Bạc Clorua Trắng (Tầng Bẫy 11)",
    "name_en": "Silver Chloride Precipitation Barrier (Barrier Level 11)",
    "cardType": "TRAP",
    "spellTrapSubtype": "NORMAL_TRAP",
    "spellSpeed": 2,
    "rarity": "SECRET_RARE",
    "attribute": "TERRA",
    "manaCost": 1,
    "chemicalFormula": "AgCl↓",
    "effectCode": "TRAP_B21_SILVER_CHLORIDE_PRECIPITATION_BARRIER_NORM_81",
    "effectText": "[Bẫy Thường / Normal Trap - Spell Speed 2]: Khi quái thú đối phương tuyên bố tấn công: Hủy bỏ đòn tấn công và chuyển quái thú đó sang tư thế Phòng thủ, đồng thời gây 300 LP phản chấn.",
    "scientificLore": "Hiện tượng hóa học Bẫy Kết Tủa Bạc Clorua Trắng (Ag⁺(aq) + Cl⁻(aq) → AgCl(s)↓ (Ksp = 1.77×10⁻¹⁰)) ngăn chặn sự lan truyền phản ứng hoặc bẫy bắt các ion tự do thành pha rắn/khí trơ theo chuẩn GDPT 2018.",
    "relatedEquation": "Ag⁺(aq) + Cl⁻(aq) → AgCl(s)↓ (Ksp = 1.77×10⁻¹⁰)",
    "iupacName": "Silver Chloride Precipitation Barrier Countermeasure",
    "archetype": "PRECIPITATION_TRAP",
    "structuredEffects": [
      {
        "effectId": "B21_EFF_81",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "APPLY_STATUS",
            "params": {
              "statusType": "POSITION_LOCKED",
              "turns": 1
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Chặn đứng đòn tấn công, khóa tư thế quái thú địch và gây 300 LP."
      }
    ]
  },
  {
    "id": "card_b21_082_trap_dry_chemical_extinguisher_quench_82",
    "name": "Bẫy Phun Khí Bột Chữa Cháy NaHCO3 (Tầng Bẫy 11)",
    "name_en": "Dry Chemical Extinguisher Quench (Barrier Level 11)",
    "cardType": "TRAP",
    "spellTrapSubtype": "NORMAL_TRAP",
    "spellSpeed": 2,
    "rarity": "COMMON",
    "attribute": "AERO",
    "manaCost": 2,
    "chemicalFormula": "2NaHCO3",
    "effectCode": "TRAP_B21_DRY_CHEMICAL_EXTINGUISHER_QUENCH_NORM_82",
    "effectText": "[Bẫy Thường / Normal Trap - Spell Speed 2]: Khi quái thú đối phương tuyên bố tấn công: Hủy bỏ đòn tấn công và chuyển quái thú đó sang tư thế Phòng thủ, đồng thời gây 300 LP phản chấn.",
    "scientificLore": "Hiện tượng hóa học Bẫy Phun Khí Bột Chữa Cháy NaHCO3 (2NaHCO₃ --heat--> Na₂CO₃ + H₂O + CO₂↑) ngăn chặn sự lan truyền phản ứng hoặc bẫy bắt các ion tự do thành pha rắn/khí trơ theo chuẩn GDPT 2018.",
    "relatedEquation": "2NaHCO₃ --heat--> Na₂CO₃ + H₂O + CO₂↑",
    "iupacName": "Dry Chemical Extinguisher Quench Countermeasure",
    "archetype": "HALOGEN_PURGE",
    "structuredEffects": [
      {
        "effectId": "B21_EFF_82",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "APPLY_STATUS",
            "params": {
              "statusType": "POSITION_LOCKED",
              "turns": 1
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Chặn đứng đòn tấn công, khóa tư thế quái thú địch và gây 300 LP."
      }
    ]
  },
  {
    "id": "card_b21_083_trap_sacrificial_zinc_anode_discharge_83",
    "name": "Bẫy Anode Hy Sinh Chống Ăn Mòn (Tầng Bẫy 11)",
    "name_en": "Sacrificial Zinc Anode Discharge (Barrier Level 11)",
    "cardType": "TRAP",
    "spellTrapSubtype": "NORMAL_TRAP",
    "spellSpeed": 2,
    "rarity": "COMMON",
    "attribute": "ELECTRO",
    "manaCost": 3,
    "chemicalFormula": "Zn → Zn2+ + 2e-",
    "effectCode": "TRAP_B21_SACRIFICIAL_ZINC_ANODE_DISCHARGE_NORM_83",
    "effectText": "[Bẫy Thường / Normal Trap - Spell Speed 2]: Khi quái thú đối phương tuyên bố tấn công: Hủy bỏ đòn tấn công và chuyển quái thú đó sang tư thế Phòng thủ, đồng thời gây 300 LP phản chấn.",
    "scientificLore": "Hiện tượng hóa học Bẫy Anode Hy Sinh Chống Ăn Mòn (Zn(s) → Zn²⁺(aq) + 2e⁻ (E° = -0.76V vs Fe -0.44V)) ngăn chặn sự lan truyền phản ứng hoặc bẫy bắt các ion tự do thành pha rắn/khí trơ theo chuẩn GDPT 2018.",
    "relatedEquation": "Zn(s) → Zn²⁺(aq) + 2e⁻ (E° = -0.76V vs Fe -0.44V)",
    "iupacName": "Sacrificial Zinc Anode Discharge Countermeasure",
    "archetype": "PRECIPITATION_TRAP",
    "structuredEffects": [
      {
        "effectId": "B21_EFF_83",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "APPLY_STATUS",
            "params": {
              "statusType": "POSITION_LOCKED",
              "turns": 1
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Chặn đứng đòn tấn công, khóa tư thế quái thú địch và gây 300 LP."
      }
    ]
  },
  {
    "id": "card_b21_084_trap_heavy_barium_sulfate_blockade_84",
    "name": "Bẫy Kết Tủa Vàng Bari Sunfat (Tầng Bẫy 11)",
    "name_en": "Heavy Barium Sulfate Blockade (Barrier Level 11)",
    "cardType": "TRAP",
    "spellTrapSubtype": "NORMAL_TRAP",
    "spellSpeed": 2,
    "rarity": "COMMON",
    "attribute": "TERRA",
    "manaCost": 4,
    "chemicalFormula": "BaSO4↓",
    "effectCode": "TRAP_B21_HEAVY_BARIUM_SULFATE_BLOCKADE_NORM_84",
    "effectText": "[Bẫy Thường / Normal Trap - Spell Speed 2]: Khi quái thú đối phương tuyên bố tấn công: Hủy bỏ đòn tấn công và chuyển quái thú đó sang tư thế Phòng thủ, đồng thời gây 300 LP phản chấn.",
    "scientificLore": "Hiện tượng hóa học Bẫy Kết Tủa Vàng Bari Sunfat (Ba²⁺(aq) + SO₄²⁻(aq) → BaSO₄(s)↓ (Ksp = 1.08×10⁻¹⁰)) ngăn chặn sự lan truyền phản ứng hoặc bẫy bắt các ion tự do thành pha rắn/khí trơ theo chuẩn GDPT 2018.",
    "relatedEquation": "Ba²⁺(aq) + SO₄²⁻(aq) → BaSO₄(s)↓ (Ksp = 1.08×10⁻¹⁰)",
    "iupacName": "Heavy Barium Sulfate Blockade Countermeasure",
    "archetype": "HALOGEN_PURGE",
    "structuredEffects": [
      {
        "effectId": "B21_EFF_84",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "APPLY_STATUS",
            "params": {
              "statusType": "POSITION_LOCKED",
              "turns": 1
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Chặn đứng đòn tấn công, khóa tư thế quái thú địch và gây 300 LP."
      }
    ]
  },
  {
    "id": "card_b21_085_trap_bleach_hypochlorite_vapor_trap_85",
    "name": "Bẫy Khí Clo Khử Trùng Cực Mạnh (Tầng Bẫy 11)",
    "name_en": "Bleach Hypochlorite Vapor Trap (Barrier Level 11)",
    "cardType": "TRAP",
    "spellTrapSubtype": "NORMAL_TRAP",
    "spellSpeed": 2,
    "rarity": "RARE",
    "attribute": "AERO",
    "manaCost": 1,
    "chemicalFormula": "NaClO + HCl",
    "effectCode": "TRAP_B21_BLEACH_HYPOCHLORITE_VAPOR_TRAP_NORM_85",
    "effectText": "[Bẫy Thường / Normal Trap - Spell Speed 2]: Khi quái thú đối phương tuyên bố tấn công: Hủy bỏ đòn tấn công và chuyển quái thú đó sang tư thế Phòng thủ, đồng thời gây 300 LP phản chấn.",
    "scientificLore": "Hiện tượng hóa học Bẫy Khí Clo Khử Trùng Cực Mạnh (NaClO + 2HCl → NaCl + Cl₂↑ + H₂O) ngăn chặn sự lan truyền phản ứng hoặc bẫy bắt các ion tự do thành pha rắn/khí trơ theo chuẩn GDPT 2018.",
    "relatedEquation": "NaClO + 2HCl → NaCl + Cl₂↑ + H₂O",
    "iupacName": "Bleach Hypochlorite Vapor Trap Countermeasure",
    "archetype": "PRECIPITATION_TRAP",
    "structuredEffects": [
      {
        "effectId": "B21_EFF_85",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "APPLY_STATUS",
            "params": {
              "statusType": "POSITION_LOCKED",
              "turns": 1
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Chặn đứng đòn tấn công, khóa tư thế quái thú địch và gây 300 LP."
      }
    ]
  },
  {
    "id": "card_b21_086_trap_activated_carbon_adsorption_net_86",
    "name": "Bẫy Hấp Phụ Khí Độc Bằng Than Hoạt Tính (Tầng Bẫy 11)",
    "name_en": "Activated Carbon Adsorption Net (Barrier Level 11)",
    "cardType": "TRAP",
    "spellTrapSubtype": "NORMAL_TRAP",
    "spellSpeed": 2,
    "rarity": "RARE",
    "attribute": "TERRA",
    "manaCost": 2,
    "chemicalFormula": "C(adsorb)",
    "effectCode": "TRAP_B21_ACTIVATED_CARBON_ADSORPTION_NET_NORM_86",
    "effectText": "[Bẫy Thường / Normal Trap - Spell Speed 2]: Khi quái thú đối phương tuyên bố tấn công: Hủy bỏ đòn tấn công và chuyển quái thú đó sang tư thế Phòng thủ, đồng thời gây 300 LP phản chấn.",
    "scientificLore": "Hiện tượng hóa học Bẫy Hấp Phụ Khí Độc Bằng Than Hoạt Tính (Langmuir / Freundlich Multilayer Adsorption) ngăn chặn sự lan truyền phản ứng hoặc bẫy bắt các ion tự do thành pha rắn/khí trơ theo chuẩn GDPT 2018.",
    "relatedEquation": "Langmuir / Freundlich Multilayer Adsorption",
    "iupacName": "Activated Carbon Adsorption Net Countermeasure",
    "archetype": "HALOGEN_PURGE",
    "structuredEffects": [
      {
        "effectId": "B21_EFF_86",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "APPLY_STATUS",
            "params": {
              "statusType": "POSITION_LOCKED",
              "turns": 1
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Chặn đứng đòn tấn công, khóa tư thế quái thú địch và gây 300 LP."
      }
    ]
  },
  {
    "id": "card_b21_087_trap_lead_ii__iodide_golden_rain_trap_87",
    "name": "Bẫy Kết Tủa Chì(II) Iotua Hoàng Kim (Tầng Bẫy 11)",
    "name_en": "Lead(II) Iodide Golden Rain Trap (Barrier Level 11)",
    "cardType": "TRAP",
    "spellTrapSubtype": "NORMAL_TRAP",
    "spellSpeed": 2,
    "rarity": "SUPER_RARE",
    "attribute": "TERRA",
    "manaCost": 3,
    "chemicalFormula": "PbI2↓",
    "effectCode": "TRAP_B21_LEAD_II__IODIDE_GOLDEN_RAIN_TRAP_NORM_87",
    "effectText": "[Bẫy Thường / Normal Trap - Spell Speed 2]: Khi quái thú đối phương tuyên bố tấn công: Hủy bỏ đòn tấn công và chuyển quái thú đó sang tư thế Phòng thủ, đồng thời gây 300 LP phản chấn.",
    "scientificLore": "Hiện tượng hóa học Bẫy Kết Tủa Chì(II) Iotua Hoàng Kim (Pb²⁺(aq) + 2I⁻(aq) → PbI₂(s)↓ (Golden Glitter)) ngăn chặn sự lan truyền phản ứng hoặc bẫy bắt các ion tự do thành pha rắn/khí trơ theo chuẩn GDPT 2018.",
    "relatedEquation": "Pb²⁺(aq) + 2I⁻(aq) → PbI₂(s)↓ (Golden Glitter)",
    "iupacName": "Lead(II) Iodide Golden Rain Trap Countermeasure",
    "archetype": "PRECIPITATION_TRAP",
    "structuredEffects": [
      {
        "effectId": "B21_EFF_87",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "APPLY_STATUS",
            "params": {
              "statusType": "POSITION_LOCKED",
              "turns": 1
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Chặn đứng đòn tấn công, khóa tư thế quái thú địch và gây 300 LP."
      }
    ]
  },
  {
    "id": "card_b21_088_trap_hydrogen_gas_knallgas_detonation_trap_88",
    "name": "Bẫy Thoát Khí Hydro Nổ Tức Thời (Tầng Bẫy 11)",
    "name_en": "Hydrogen Gas Knallgas Detonation Trap (Barrier Level 11)",
    "cardType": "TRAP",
    "spellTrapSubtype": "NORMAL_TRAP",
    "spellSpeed": 2,
    "rarity": "SUPER_RARE",
    "attribute": "PYRO",
    "manaCost": 4,
    "chemicalFormula": "2H2 + O2",
    "effectCode": "TRAP_B21_HYDROGEN_GAS_KNALLGAS_DETONATION_TRAP_NORM_88",
    "effectText": "[Bẫy Thường / Normal Trap - Spell Speed 2]: Khi quái thú đối phương tuyên bố tấn công: Hủy bỏ đòn tấn công và chuyển quái thú đó sang tư thế Phòng thủ, đồng thời gây 300 LP phản chấn.",
    "scientificLore": "Hiện tượng hóa học Bẫy Thoát Khí Hydro Nổ Tức Thời (2H₂ + O₂ → 2H₂O (Explosive Shockwave)) ngăn chặn sự lan truyền phản ứng hoặc bẫy bắt các ion tự do thành pha rắn/khí trơ theo chuẩn GDPT 2018.",
    "relatedEquation": "2H₂ + O₂ → 2H₂O (Explosive Shockwave)",
    "iupacName": "Hydrogen Gas Knallgas Detonation Trap Countermeasure",
    "archetype": "HALOGEN_PURGE",
    "structuredEffects": [
      {
        "effectId": "B21_EFF_88",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "APPLY_STATUS",
            "params": {
              "statusType": "POSITION_LOCKED",
              "turns": 1
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Chặn đứng đòn tấn công, khóa tư thế quái thú địch và gây 300 LP."
      }
    ]
  },
  {
    "id": "card_b21_089_trap_silver_chloride_precipitation_barrier_89",
    "name": "Bẫy Kết Tủa Bạc Clorua Trắng (Tầng Bẫy 12)",
    "name_en": "Silver Chloride Precipitation Barrier (Barrier Level 12)",
    "cardType": "TRAP",
    "spellTrapSubtype": "NORMAL_TRAP",
    "spellSpeed": 2,
    "rarity": "ULTRA_RARE",
    "attribute": "TERRA",
    "manaCost": 1,
    "chemicalFormula": "AgCl↓",
    "effectCode": "TRAP_B21_SILVER_CHLORIDE_PRECIPITATION_BARRIER_NORM_89",
    "effectText": "[Bẫy Thường / Normal Trap - Spell Speed 2]: Khi quái thú đối phương tuyên bố tấn công: Hủy bỏ đòn tấn công và chuyển quái thú đó sang tư thế Phòng thủ, đồng thời gây 300 LP phản chấn.",
    "scientificLore": "Hiện tượng hóa học Bẫy Kết Tủa Bạc Clorua Trắng (Ag⁺(aq) + Cl⁻(aq) → AgCl(s)↓ (Ksp = 1.77×10⁻¹⁰)) ngăn chặn sự lan truyền phản ứng hoặc bẫy bắt các ion tự do thành pha rắn/khí trơ theo chuẩn GDPT 2018.",
    "relatedEquation": "Ag⁺(aq) + Cl⁻(aq) → AgCl(s)↓ (Ksp = 1.77×10⁻¹⁰)",
    "iupacName": "Silver Chloride Precipitation Barrier Countermeasure",
    "archetype": "PRECIPITATION_TRAP",
    "structuredEffects": [
      {
        "effectId": "B21_EFF_89",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "APPLY_STATUS",
            "params": {
              "statusType": "POSITION_LOCKED",
              "turns": 1
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Chặn đứng đòn tấn công, khóa tư thế quái thú địch và gây 300 LP."
      }
    ]
  },
  {
    "id": "card_b21_090_trap_dry_chemical_extinguisher_quench_90",
    "name": "Bẫy Phun Khí Bột Chữa Cháy NaHCO3 (Tầng Bẫy 12)",
    "name_en": "Dry Chemical Extinguisher Quench (Barrier Level 12)",
    "cardType": "TRAP",
    "spellTrapSubtype": "NORMAL_TRAP",
    "spellSpeed": 2,
    "rarity": "SECRET_RARE",
    "attribute": "AERO",
    "manaCost": 2,
    "chemicalFormula": "2NaHCO3",
    "effectCode": "TRAP_B21_DRY_CHEMICAL_EXTINGUISHER_QUENCH_NORM_90",
    "effectText": "[Bẫy Thường / Normal Trap - Spell Speed 2]: Khi quái thú đối phương tuyên bố tấn công: Hủy bỏ đòn tấn công và chuyển quái thú đó sang tư thế Phòng thủ, đồng thời gây 300 LP phản chấn.",
    "scientificLore": "Hiện tượng hóa học Bẫy Phun Khí Bột Chữa Cháy NaHCO3 (2NaHCO₃ --heat--> Na₂CO₃ + H₂O + CO₂↑) ngăn chặn sự lan truyền phản ứng hoặc bẫy bắt các ion tự do thành pha rắn/khí trơ theo chuẩn GDPT 2018.",
    "relatedEquation": "2NaHCO₃ --heat--> Na₂CO₃ + H₂O + CO₂↑",
    "iupacName": "Dry Chemical Extinguisher Quench Countermeasure",
    "archetype": "HALOGEN_PURGE",
    "structuredEffects": [
      {
        "effectId": "B21_EFF_90",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "APPLY_STATUS",
            "params": {
              "statusType": "POSITION_LOCKED",
              "turns": 1
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Chặn đứng đòn tấn công, khóa tư thế quái thú địch và gây 300 LP."
      }
    ]
  },
  {
    "id": "card_b21_091_trap_sacrificial_zinc_anode_discharge_91",
    "name": "Bẫy Anode Hy Sinh Chống Ăn Mòn (Tầng Bẫy 12)",
    "name_en": "Sacrificial Zinc Anode Discharge (Barrier Level 12)",
    "cardType": "TRAP",
    "spellTrapSubtype": "NORMAL_TRAP",
    "spellSpeed": 2,
    "rarity": "COMMON",
    "attribute": "ELECTRO",
    "manaCost": 3,
    "chemicalFormula": "Zn → Zn2+ + 2e-",
    "effectCode": "TRAP_B21_SACRIFICIAL_ZINC_ANODE_DISCHARGE_NORM_91",
    "effectText": "[Bẫy Thường / Normal Trap - Spell Speed 2]: Khi quái thú đối phương tuyên bố tấn công: Hủy bỏ đòn tấn công và chuyển quái thú đó sang tư thế Phòng thủ, đồng thời gây 300 LP phản chấn.",
    "scientificLore": "Hiện tượng hóa học Bẫy Anode Hy Sinh Chống Ăn Mòn (Zn(s) → Zn²⁺(aq) + 2e⁻ (E° = -0.76V vs Fe -0.44V)) ngăn chặn sự lan truyền phản ứng hoặc bẫy bắt các ion tự do thành pha rắn/khí trơ theo chuẩn GDPT 2018.",
    "relatedEquation": "Zn(s) → Zn²⁺(aq) + 2e⁻ (E° = -0.76V vs Fe -0.44V)",
    "iupacName": "Sacrificial Zinc Anode Discharge Countermeasure",
    "archetype": "PRECIPITATION_TRAP",
    "structuredEffects": [
      {
        "effectId": "B21_EFF_91",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "APPLY_STATUS",
            "params": {
              "statusType": "POSITION_LOCKED",
              "turns": 1
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Chặn đứng đòn tấn công, khóa tư thế quái thú địch và gây 300 LP."
      }
    ]
  },
  {
    "id": "card_b21_092_trap_heavy_barium_sulfate_blockade_92",
    "name": "Bẫy Kết Tủa Vàng Bari Sunfat (Tầng Bẫy 12)",
    "name_en": "Heavy Barium Sulfate Blockade (Barrier Level 12)",
    "cardType": "TRAP",
    "spellTrapSubtype": "NORMAL_TRAP",
    "spellSpeed": 2,
    "rarity": "COMMON",
    "attribute": "TERRA",
    "manaCost": 4,
    "chemicalFormula": "BaSO4↓",
    "effectCode": "TRAP_B21_HEAVY_BARIUM_SULFATE_BLOCKADE_NORM_92",
    "effectText": "[Bẫy Thường / Normal Trap - Spell Speed 2]: Khi quái thú đối phương tuyên bố tấn công: Hủy bỏ đòn tấn công và chuyển quái thú đó sang tư thế Phòng thủ, đồng thời gây 300 LP phản chấn.",
    "scientificLore": "Hiện tượng hóa học Bẫy Kết Tủa Vàng Bari Sunfat (Ba²⁺(aq) + SO₄²⁻(aq) → BaSO₄(s)↓ (Ksp = 1.08×10⁻¹⁰)) ngăn chặn sự lan truyền phản ứng hoặc bẫy bắt các ion tự do thành pha rắn/khí trơ theo chuẩn GDPT 2018.",
    "relatedEquation": "Ba²⁺(aq) + SO₄²⁻(aq) → BaSO₄(s)↓ (Ksp = 1.08×10⁻¹⁰)",
    "iupacName": "Heavy Barium Sulfate Blockade Countermeasure",
    "archetype": "HALOGEN_PURGE",
    "structuredEffects": [
      {
        "effectId": "B21_EFF_92",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "APPLY_STATUS",
            "params": {
              "statusType": "POSITION_LOCKED",
              "turns": 1
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Chặn đứng đòn tấn công, khóa tư thế quái thú địch và gây 300 LP."
      }
    ]
  },
  {
    "id": "card_b21_093_trap_bleach_hypochlorite_vapor_trap_93",
    "name": "Bẫy Khí Clo Khử Trùng Cực Mạnh (Tầng Bẫy 12)",
    "name_en": "Bleach Hypochlorite Vapor Trap (Barrier Level 12)",
    "cardType": "TRAP",
    "spellTrapSubtype": "NORMAL_TRAP",
    "spellSpeed": 2,
    "rarity": "COMMON",
    "attribute": "AERO",
    "manaCost": 1,
    "chemicalFormula": "NaClO + HCl",
    "effectCode": "TRAP_B21_BLEACH_HYPOCHLORITE_VAPOR_TRAP_NORM_93",
    "effectText": "[Bẫy Thường / Normal Trap - Spell Speed 2]: Khi quái thú đối phương tuyên bố tấn công: Hủy bỏ đòn tấn công và chuyển quái thú đó sang tư thế Phòng thủ, đồng thời gây 300 LP phản chấn.",
    "scientificLore": "Hiện tượng hóa học Bẫy Khí Clo Khử Trùng Cực Mạnh (NaClO + 2HCl → NaCl + Cl₂↑ + H₂O) ngăn chặn sự lan truyền phản ứng hoặc bẫy bắt các ion tự do thành pha rắn/khí trơ theo chuẩn GDPT 2018.",
    "relatedEquation": "NaClO + 2HCl → NaCl + Cl₂↑ + H₂O",
    "iupacName": "Bleach Hypochlorite Vapor Trap Countermeasure",
    "archetype": "PRECIPITATION_TRAP",
    "structuredEffects": [
      {
        "effectId": "B21_EFF_93",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "APPLY_STATUS",
            "params": {
              "statusType": "POSITION_LOCKED",
              "turns": 1
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Chặn đứng đòn tấn công, khóa tư thế quái thú địch và gây 300 LP."
      }
    ]
  },
  {
    "id": "card_b21_094_trap_activated_carbon_adsorption_net_94",
    "name": "Bẫy Hấp Phụ Khí Độc Bằng Than Hoạt Tính (Tầng Bẫy 12)",
    "name_en": "Activated Carbon Adsorption Net (Barrier Level 12)",
    "cardType": "TRAP",
    "spellTrapSubtype": "NORMAL_TRAP",
    "spellSpeed": 2,
    "rarity": "RARE",
    "attribute": "TERRA",
    "manaCost": 2,
    "chemicalFormula": "C(adsorb)",
    "effectCode": "TRAP_B21_ACTIVATED_CARBON_ADSORPTION_NET_NORM_94",
    "effectText": "[Bẫy Thường / Normal Trap - Spell Speed 2]: Khi quái thú đối phương tuyên bố tấn công: Hủy bỏ đòn tấn công và chuyển quái thú đó sang tư thế Phòng thủ, đồng thời gây 300 LP phản chấn.",
    "scientificLore": "Hiện tượng hóa học Bẫy Hấp Phụ Khí Độc Bằng Than Hoạt Tính (Langmuir / Freundlich Multilayer Adsorption) ngăn chặn sự lan truyền phản ứng hoặc bẫy bắt các ion tự do thành pha rắn/khí trơ theo chuẩn GDPT 2018.",
    "relatedEquation": "Langmuir / Freundlich Multilayer Adsorption",
    "iupacName": "Activated Carbon Adsorption Net Countermeasure",
    "archetype": "HALOGEN_PURGE",
    "structuredEffects": [
      {
        "effectId": "B21_EFF_94",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "APPLY_STATUS",
            "params": {
              "statusType": "POSITION_LOCKED",
              "turns": 1
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Chặn đứng đòn tấn công, khóa tư thế quái thú địch và gây 300 LP."
      }
    ]
  },
  {
    "id": "card_b21_095_trap_lead_ii__iodide_golden_rain_trap_95",
    "name": "Bẫy Kết Tủa Chì(II) Iotua Hoàng Kim (Tầng Bẫy 12)",
    "name_en": "Lead(II) Iodide Golden Rain Trap (Barrier Level 12)",
    "cardType": "TRAP",
    "spellTrapSubtype": "NORMAL_TRAP",
    "spellSpeed": 2,
    "rarity": "RARE",
    "attribute": "TERRA",
    "manaCost": 3,
    "chemicalFormula": "PbI2↓",
    "effectCode": "TRAP_B21_LEAD_II__IODIDE_GOLDEN_RAIN_TRAP_NORM_95",
    "effectText": "[Bẫy Thường / Normal Trap - Spell Speed 2]: Khi quái thú đối phương tuyên bố tấn công: Hủy bỏ đòn tấn công và chuyển quái thú đó sang tư thế Phòng thủ, đồng thời gây 300 LP phản chấn.",
    "scientificLore": "Hiện tượng hóa học Bẫy Kết Tủa Chì(II) Iotua Hoàng Kim (Pb²⁺(aq) + 2I⁻(aq) → PbI₂(s)↓ (Golden Glitter)) ngăn chặn sự lan truyền phản ứng hoặc bẫy bắt các ion tự do thành pha rắn/khí trơ theo chuẩn GDPT 2018.",
    "relatedEquation": "Pb²⁺(aq) + 2I⁻(aq) → PbI₂(s)↓ (Golden Glitter)",
    "iupacName": "Lead(II) Iodide Golden Rain Trap Countermeasure",
    "archetype": "PRECIPITATION_TRAP",
    "structuredEffects": [
      {
        "effectId": "B21_EFF_95",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "APPLY_STATUS",
            "params": {
              "statusType": "POSITION_LOCKED",
              "turns": 1
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Chặn đứng đòn tấn công, khóa tư thế quái thú địch và gây 300 LP."
      }
    ]
  },
  {
    "id": "card_b21_096_trap_hydrogen_gas_knallgas_detonation_trap_96",
    "name": "Bẫy Thoát Khí Hydro Nổ Tức Thời (Tầng Bẫy 12)",
    "name_en": "Hydrogen Gas Knallgas Detonation Trap (Barrier Level 12)",
    "cardType": "TRAP",
    "spellTrapSubtype": "NORMAL_TRAP",
    "spellSpeed": 2,
    "rarity": "SUPER_RARE",
    "attribute": "PYRO",
    "manaCost": 4,
    "chemicalFormula": "2H2 + O2",
    "effectCode": "TRAP_B21_HYDROGEN_GAS_KNALLGAS_DETONATION_TRAP_NORM_96",
    "effectText": "[Bẫy Thường / Normal Trap - Spell Speed 2]: Khi quái thú đối phương tuyên bố tấn công: Hủy bỏ đòn tấn công và chuyển quái thú đó sang tư thế Phòng thủ, đồng thời gây 300 LP phản chấn.",
    "scientificLore": "Hiện tượng hóa học Bẫy Thoát Khí Hydro Nổ Tức Thời (2H₂ + O₂ → 2H₂O (Explosive Shockwave)) ngăn chặn sự lan truyền phản ứng hoặc bẫy bắt các ion tự do thành pha rắn/khí trơ theo chuẩn GDPT 2018.",
    "relatedEquation": "2H₂ + O₂ → 2H₂O (Explosive Shockwave)",
    "iupacName": "Hydrogen Gas Knallgas Detonation Trap Countermeasure",
    "archetype": "HALOGEN_PURGE",
    "structuredEffects": [
      {
        "effectId": "B21_EFF_96",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "APPLY_STATUS",
            "params": {
              "statusType": "POSITION_LOCKED",
              "turns": 1
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Chặn đứng đòn tấn công, khóa tư thế quái thú địch và gây 300 LP."
      }
    ]
  },
  {
    "id": "card_b21_097_trap_silver_chloride_precipitation_barrier_97",
    "name": "Bẫy Kết Tủa Bạc Clorua Trắng (Tầng Bẫy 13)",
    "name_en": "Silver Chloride Precipitation Barrier (Barrier Level 13)",
    "cardType": "TRAP",
    "spellTrapSubtype": "NORMAL_TRAP",
    "spellSpeed": 2,
    "rarity": "SUPER_RARE",
    "attribute": "TERRA",
    "manaCost": 1,
    "chemicalFormula": "AgCl↓",
    "effectCode": "TRAP_B21_SILVER_CHLORIDE_PRECIPITATION_BARRIER_NORM_97",
    "effectText": "[Bẫy Thường / Normal Trap - Spell Speed 2]: Khi quái thú đối phương tuyên bố tấn công: Hủy bỏ đòn tấn công và chuyển quái thú đó sang tư thế Phòng thủ, đồng thời gây 300 LP phản chấn.",
    "scientificLore": "Hiện tượng hóa học Bẫy Kết Tủa Bạc Clorua Trắng (Ag⁺(aq) + Cl⁻(aq) → AgCl(s)↓ (Ksp = 1.77×10⁻¹⁰)) ngăn chặn sự lan truyền phản ứng hoặc bẫy bắt các ion tự do thành pha rắn/khí trơ theo chuẩn GDPT 2018.",
    "relatedEquation": "Ag⁺(aq) + Cl⁻(aq) → AgCl(s)↓ (Ksp = 1.77×10⁻¹⁰)",
    "iupacName": "Silver Chloride Precipitation Barrier Countermeasure",
    "archetype": "PRECIPITATION_TRAP",
    "structuredEffects": [
      {
        "effectId": "B21_EFF_97",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "APPLY_STATUS",
            "params": {
              "statusType": "POSITION_LOCKED",
              "turns": 1
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Chặn đứng đòn tấn công, khóa tư thế quái thú địch và gây 300 LP."
      }
    ]
  },
  {
    "id": "card_b21_098_trap_dry_chemical_extinguisher_quench_98",
    "name": "Bẫy Phun Khí Bột Chữa Cháy NaHCO3 (Tầng Bẫy 13)",
    "name_en": "Dry Chemical Extinguisher Quench (Barrier Level 13)",
    "cardType": "TRAP",
    "spellTrapSubtype": "NORMAL_TRAP",
    "spellSpeed": 2,
    "rarity": "ULTRA_RARE",
    "attribute": "AERO",
    "manaCost": 2,
    "chemicalFormula": "2NaHCO3",
    "effectCode": "TRAP_B21_DRY_CHEMICAL_EXTINGUISHER_QUENCH_NORM_98",
    "effectText": "[Bẫy Thường / Normal Trap - Spell Speed 2]: Khi quái thú đối phương tuyên bố tấn công: Hủy bỏ đòn tấn công và chuyển quái thú đó sang tư thế Phòng thủ, đồng thời gây 300 LP phản chấn.",
    "scientificLore": "Hiện tượng hóa học Bẫy Phun Khí Bột Chữa Cháy NaHCO3 (2NaHCO₃ --heat--> Na₂CO₃ + H₂O + CO₂↑) ngăn chặn sự lan truyền phản ứng hoặc bẫy bắt các ion tự do thành pha rắn/khí trơ theo chuẩn GDPT 2018.",
    "relatedEquation": "2NaHCO₃ --heat--> Na₂CO₃ + H₂O + CO₂↑",
    "iupacName": "Dry Chemical Extinguisher Quench Countermeasure",
    "archetype": "HALOGEN_PURGE",
    "structuredEffects": [
      {
        "effectId": "B21_EFF_98",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "APPLY_STATUS",
            "params": {
              "statusType": "POSITION_LOCKED",
              "turns": 1
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Chặn đứng đòn tấn công, khóa tư thế quái thú địch và gây 300 LP."
      }
    ]
  },
  {
    "id": "card_b21_099_trap_sacrificial_zinc_anode_discharge_99",
    "name": "Bẫy Anode Hy Sinh Chống Ăn Mòn (Tầng Bẫy 13)",
    "name_en": "Sacrificial Zinc Anode Discharge (Barrier Level 13)",
    "cardType": "TRAP",
    "spellTrapSubtype": "NORMAL_TRAP",
    "spellSpeed": 2,
    "rarity": "SECRET_RARE",
    "attribute": "ELECTRO",
    "manaCost": 3,
    "chemicalFormula": "Zn → Zn2+ + 2e-",
    "effectCode": "TRAP_B21_SACRIFICIAL_ZINC_ANODE_DISCHARGE_NORM_99",
    "effectText": "[Bẫy Thường / Normal Trap - Spell Speed 2]: Khi quái thú đối phương tuyên bố tấn công: Hủy bỏ đòn tấn công và chuyển quái thú đó sang tư thế Phòng thủ, đồng thời gây 300 LP phản chấn.",
    "scientificLore": "Hiện tượng hóa học Bẫy Anode Hy Sinh Chống Ăn Mòn (Zn(s) → Zn²⁺(aq) + 2e⁻ (E° = -0.76V vs Fe -0.44V)) ngăn chặn sự lan truyền phản ứng hoặc bẫy bắt các ion tự do thành pha rắn/khí trơ theo chuẩn GDPT 2018.",
    "relatedEquation": "Zn(s) → Zn²⁺(aq) + 2e⁻ (E° = -0.76V vs Fe -0.44V)",
    "iupacName": "Sacrificial Zinc Anode Discharge Countermeasure",
    "archetype": "PRECIPITATION_TRAP",
    "structuredEffects": [
      {
        "effectId": "B21_EFF_99",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "APPLY_STATUS",
            "params": {
              "statusType": "POSITION_LOCKED",
              "turns": 1
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Chặn đứng đòn tấn công, khóa tư thế quái thú địch và gây 300 LP."
      }
    ]
  },
  {
    "id": "card_b21_100_trap_heavy_barium_sulfate_blockade_100",
    "name": "Bẫy Kết Tủa Vàng Bari Sunfat (Tầng Bẫy 13)",
    "name_en": "Heavy Barium Sulfate Blockade (Barrier Level 13)",
    "cardType": "TRAP",
    "spellTrapSubtype": "NORMAL_TRAP",
    "spellSpeed": 2,
    "rarity": "COMMON",
    "attribute": "TERRA",
    "manaCost": 4,
    "chemicalFormula": "BaSO4↓",
    "effectCode": "TRAP_B21_HEAVY_BARIUM_SULFATE_BLOCKADE_NORM_100",
    "effectText": "[Bẫy Thường / Normal Trap - Spell Speed 2]: Khi quái thú đối phương tuyên bố tấn công: Hủy bỏ đòn tấn công và chuyển quái thú đó sang tư thế Phòng thủ, đồng thời gây 300 LP phản chấn.",
    "scientificLore": "Hiện tượng hóa học Bẫy Kết Tủa Vàng Bari Sunfat (Ba²⁺(aq) + SO₄²⁻(aq) → BaSO₄(s)↓ (Ksp = 1.08×10⁻¹⁰)) ngăn chặn sự lan truyền phản ứng hoặc bẫy bắt các ion tự do thành pha rắn/khí trơ theo chuẩn GDPT 2018.",
    "relatedEquation": "Ba²⁺(aq) + SO₄²⁻(aq) → BaSO₄(s)↓ (Ksp = 1.08×10⁻¹⁰)",
    "iupacName": "Heavy Barium Sulfate Blockade Countermeasure",
    "archetype": "HALOGEN_PURGE",
    "structuredEffects": [
      {
        "effectId": "B21_EFF_100",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "APPLY_STATUS",
            "params": {
              "statusType": "POSITION_LOCKED",
              "turns": 1
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Chặn đứng đòn tấn công, khóa tư thế quái thú địch và gây 300 LP."
      }
    ]
  },
  {
    "id": "card_b21_101_trap_bleach_hypochlorite_vapor_trap_101",
    "name": "Bẫy Khí Clo Khử Trùng Cực Mạnh (Tầng Bẫy 13)",
    "name_en": "Bleach Hypochlorite Vapor Trap (Barrier Level 13)",
    "cardType": "TRAP",
    "spellTrapSubtype": "NORMAL_TRAP",
    "spellSpeed": 2,
    "rarity": "COMMON",
    "attribute": "AERO",
    "manaCost": 1,
    "chemicalFormula": "NaClO + HCl",
    "effectCode": "TRAP_B21_BLEACH_HYPOCHLORITE_VAPOR_TRAP_NORM_101",
    "effectText": "[Bẫy Thường / Normal Trap - Spell Speed 2]: Khi quái thú đối phương tuyên bố tấn công: Hủy bỏ đòn tấn công và chuyển quái thú đó sang tư thế Phòng thủ, đồng thời gây 300 LP phản chấn.",
    "scientificLore": "Hiện tượng hóa học Bẫy Khí Clo Khử Trùng Cực Mạnh (NaClO + 2HCl → NaCl + Cl₂↑ + H₂O) ngăn chặn sự lan truyền phản ứng hoặc bẫy bắt các ion tự do thành pha rắn/khí trơ theo chuẩn GDPT 2018.",
    "relatedEquation": "NaClO + 2HCl → NaCl + Cl₂↑ + H₂O",
    "iupacName": "Bleach Hypochlorite Vapor Trap Countermeasure",
    "archetype": "PRECIPITATION_TRAP",
    "structuredEffects": [
      {
        "effectId": "B21_EFF_101",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "APPLY_STATUS",
            "params": {
              "statusType": "POSITION_LOCKED",
              "turns": 1
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Chặn đứng đòn tấn công, khóa tư thế quái thú địch và gây 300 LP."
      }
    ]
  },
  {
    "id": "card_b21_102_trap_activated_carbon_adsorption_net_102",
    "name": "Bẫy Hấp Phụ Khí Độc Bằng Than Hoạt Tính (Tầng Bẫy 13)",
    "name_en": "Activated Carbon Adsorption Net (Barrier Level 13)",
    "cardType": "TRAP",
    "spellTrapSubtype": "NORMAL_TRAP",
    "spellSpeed": 2,
    "rarity": "COMMON",
    "attribute": "TERRA",
    "manaCost": 2,
    "chemicalFormula": "C(adsorb)",
    "effectCode": "TRAP_B21_ACTIVATED_CARBON_ADSORPTION_NET_NORM_102",
    "effectText": "[Bẫy Thường / Normal Trap - Spell Speed 2]: Khi quái thú đối phương tuyên bố tấn công: Hủy bỏ đòn tấn công và chuyển quái thú đó sang tư thế Phòng thủ, đồng thời gây 300 LP phản chấn.",
    "scientificLore": "Hiện tượng hóa học Bẫy Hấp Phụ Khí Độc Bằng Than Hoạt Tính (Langmuir / Freundlich Multilayer Adsorption) ngăn chặn sự lan truyền phản ứng hoặc bẫy bắt các ion tự do thành pha rắn/khí trơ theo chuẩn GDPT 2018.",
    "relatedEquation": "Langmuir / Freundlich Multilayer Adsorption",
    "iupacName": "Activated Carbon Adsorption Net Countermeasure",
    "archetype": "HALOGEN_PURGE",
    "structuredEffects": [
      {
        "effectId": "B21_EFF_102",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "APPLY_STATUS",
            "params": {
              "statusType": "POSITION_LOCKED",
              "turns": 1
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Chặn đứng đòn tấn công, khóa tư thế quái thú địch và gây 300 LP."
      }
    ]
  },
  {
    "id": "card_b21_103_trap_lead_ii__iodide_golden_rain_trap_103",
    "name": "Bẫy Kết Tủa Chì(II) Iotua Hoàng Kim (Tầng Bẫy 13)",
    "name_en": "Lead(II) Iodide Golden Rain Trap (Barrier Level 13)",
    "cardType": "TRAP",
    "spellTrapSubtype": "NORMAL_TRAP",
    "spellSpeed": 2,
    "rarity": "RARE",
    "attribute": "TERRA",
    "manaCost": 3,
    "chemicalFormula": "PbI2↓",
    "effectCode": "TRAP_B21_LEAD_II__IODIDE_GOLDEN_RAIN_TRAP_NORM_103",
    "effectText": "[Bẫy Thường / Normal Trap - Spell Speed 2]: Khi quái thú đối phương tuyên bố tấn công: Hủy bỏ đòn tấn công và chuyển quái thú đó sang tư thế Phòng thủ, đồng thời gây 300 LP phản chấn.",
    "scientificLore": "Hiện tượng hóa học Bẫy Kết Tủa Chì(II) Iotua Hoàng Kim (Pb²⁺(aq) + 2I⁻(aq) → PbI₂(s)↓ (Golden Glitter)) ngăn chặn sự lan truyền phản ứng hoặc bẫy bắt các ion tự do thành pha rắn/khí trơ theo chuẩn GDPT 2018.",
    "relatedEquation": "Pb²⁺(aq) + 2I⁻(aq) → PbI₂(s)↓ (Golden Glitter)",
    "iupacName": "Lead(II) Iodide Golden Rain Trap Countermeasure",
    "archetype": "PRECIPITATION_TRAP",
    "structuredEffects": [
      {
        "effectId": "B21_EFF_103",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "APPLY_STATUS",
            "params": {
              "statusType": "POSITION_LOCKED",
              "turns": 1
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Chặn đứng đòn tấn công, khóa tư thế quái thú địch và gây 300 LP."
      }
    ]
  },
  {
    "id": "card_b21_104_trap_hydrogen_gas_knallgas_detonation_trap_104",
    "name": "Bẫy Thoát Khí Hydro Nổ Tức Thời (Tầng Bẫy 13)",
    "name_en": "Hydrogen Gas Knallgas Detonation Trap (Barrier Level 13)",
    "cardType": "TRAP",
    "spellTrapSubtype": "NORMAL_TRAP",
    "spellSpeed": 2,
    "rarity": "RARE",
    "attribute": "PYRO",
    "manaCost": 4,
    "chemicalFormula": "2H2 + O2",
    "effectCode": "TRAP_B21_HYDROGEN_GAS_KNALLGAS_DETONATION_TRAP_NORM_104",
    "effectText": "[Bẫy Thường / Normal Trap - Spell Speed 2]: Khi quái thú đối phương tuyên bố tấn công: Hủy bỏ đòn tấn công và chuyển quái thú đó sang tư thế Phòng thủ, đồng thời gây 300 LP phản chấn.",
    "scientificLore": "Hiện tượng hóa học Bẫy Thoát Khí Hydro Nổ Tức Thời (2H₂ + O₂ → 2H₂O (Explosive Shockwave)) ngăn chặn sự lan truyền phản ứng hoặc bẫy bắt các ion tự do thành pha rắn/khí trơ theo chuẩn GDPT 2018.",
    "relatedEquation": "2H₂ + O₂ → 2H₂O (Explosive Shockwave)",
    "iupacName": "Hydrogen Gas Knallgas Detonation Trap Countermeasure",
    "archetype": "HALOGEN_PURGE",
    "structuredEffects": [
      {
        "effectId": "B21_EFF_104",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "APPLY_STATUS",
            "params": {
              "statusType": "POSITION_LOCKED",
              "turns": 1
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Chặn đứng đòn tấn công, khóa tư thế quái thú địch và gây 300 LP."
      }
    ]
  },
  {
    "id": "card_b21_105_trap_silver_chloride_precipitation_barrier_105",
    "name": "Bẫy Kết Tủa Bạc Clorua Trắng (Tầng Bẫy 14)",
    "name_en": "Silver Chloride Precipitation Barrier (Barrier Level 14)",
    "cardType": "TRAP",
    "spellTrapSubtype": "NORMAL_TRAP",
    "spellSpeed": 2,
    "rarity": "SUPER_RARE",
    "attribute": "TERRA",
    "manaCost": 1,
    "chemicalFormula": "AgCl↓",
    "effectCode": "TRAP_B21_SILVER_CHLORIDE_PRECIPITATION_BARRIER_NORM_105",
    "effectText": "[Bẫy Thường / Normal Trap - Spell Speed 2]: Khi quái thú đối phương tuyên bố tấn công: Hủy bỏ đòn tấn công và chuyển quái thú đó sang tư thế Phòng thủ, đồng thời gây 300 LP phản chấn.",
    "scientificLore": "Hiện tượng hóa học Bẫy Kết Tủa Bạc Clorua Trắng (Ag⁺(aq) + Cl⁻(aq) → AgCl(s)↓ (Ksp = 1.77×10⁻¹⁰)) ngăn chặn sự lan truyền phản ứng hoặc bẫy bắt các ion tự do thành pha rắn/khí trơ theo chuẩn GDPT 2018.",
    "relatedEquation": "Ag⁺(aq) + Cl⁻(aq) → AgCl(s)↓ (Ksp = 1.77×10⁻¹⁰)",
    "iupacName": "Silver Chloride Precipitation Barrier Countermeasure",
    "archetype": "PRECIPITATION_TRAP",
    "structuredEffects": [
      {
        "effectId": "B21_EFF_105",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "APPLY_STATUS",
            "params": {
              "statusType": "POSITION_LOCKED",
              "turns": 1
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Chặn đứng đòn tấn công, khóa tư thế quái thú địch và gây 300 LP."
      }
    ]
  },
  {
    "id": "card_b21_106_trap_dry_chemical_extinguisher_quench_106",
    "name": "Bẫy Phun Khí Bột Chữa Cháy NaHCO3 (Tầng Bẫy 14)",
    "name_en": "Dry Chemical Extinguisher Quench (Barrier Level 14)",
    "cardType": "TRAP",
    "spellTrapSubtype": "NORMAL_TRAP",
    "spellSpeed": 2,
    "rarity": "SUPER_RARE",
    "attribute": "AERO",
    "manaCost": 2,
    "chemicalFormula": "2NaHCO3",
    "effectCode": "TRAP_B21_DRY_CHEMICAL_EXTINGUISHER_QUENCH_NORM_106",
    "effectText": "[Bẫy Thường / Normal Trap - Spell Speed 2]: Khi quái thú đối phương tuyên bố tấn công: Hủy bỏ đòn tấn công và chuyển quái thú đó sang tư thế Phòng thủ, đồng thời gây 300 LP phản chấn.",
    "scientificLore": "Hiện tượng hóa học Bẫy Phun Khí Bột Chữa Cháy NaHCO3 (2NaHCO₃ --heat--> Na₂CO₃ + H₂O + CO₂↑) ngăn chặn sự lan truyền phản ứng hoặc bẫy bắt các ion tự do thành pha rắn/khí trơ theo chuẩn GDPT 2018.",
    "relatedEquation": "2NaHCO₃ --heat--> Na₂CO₃ + H₂O + CO₂↑",
    "iupacName": "Dry Chemical Extinguisher Quench Countermeasure",
    "archetype": "HALOGEN_PURGE",
    "structuredEffects": [
      {
        "effectId": "B21_EFF_106",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "APPLY_STATUS",
            "params": {
              "statusType": "POSITION_LOCKED",
              "turns": 1
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Chặn đứng đòn tấn công, khóa tư thế quái thú địch và gây 300 LP."
      }
    ]
  },
  {
    "id": "card_b21_107_trap_sacrificial_zinc_anode_discharge_107",
    "name": "Bẫy Anode Hy Sinh Chống Ăn Mòn (Tầng Bẫy 14)",
    "name_en": "Sacrificial Zinc Anode Discharge (Barrier Level 14)",
    "cardType": "TRAP",
    "spellTrapSubtype": "NORMAL_TRAP",
    "spellSpeed": 2,
    "rarity": "ULTRA_RARE",
    "attribute": "ELECTRO",
    "manaCost": 3,
    "chemicalFormula": "Zn → Zn2+ + 2e-",
    "effectCode": "TRAP_B21_SACRIFICIAL_ZINC_ANODE_DISCHARGE_NORM_107",
    "effectText": "[Bẫy Thường / Normal Trap - Spell Speed 2]: Khi quái thú đối phương tuyên bố tấn công: Hủy bỏ đòn tấn công và chuyển quái thú đó sang tư thế Phòng thủ, đồng thời gây 300 LP phản chấn.",
    "scientificLore": "Hiện tượng hóa học Bẫy Anode Hy Sinh Chống Ăn Mòn (Zn(s) → Zn²⁺(aq) + 2e⁻ (E° = -0.76V vs Fe -0.44V)) ngăn chặn sự lan truyền phản ứng hoặc bẫy bắt các ion tự do thành pha rắn/khí trơ theo chuẩn GDPT 2018.",
    "relatedEquation": "Zn(s) → Zn²⁺(aq) + 2e⁻ (E° = -0.76V vs Fe -0.44V)",
    "iupacName": "Sacrificial Zinc Anode Discharge Countermeasure",
    "archetype": "PRECIPITATION_TRAP",
    "structuredEffects": [
      {
        "effectId": "B21_EFF_107",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "APPLY_STATUS",
            "params": {
              "statusType": "POSITION_LOCKED",
              "turns": 1
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Chặn đứng đòn tấn công, khóa tư thế quái thú địch và gây 300 LP."
      }
    ]
  },
  {
    "id": "card_b21_108_trap_heavy_barium_sulfate_blockade_108",
    "name": "Bẫy Kết Tủa Vàng Bari Sunfat (Tầng Bẫy 14)",
    "name_en": "Heavy Barium Sulfate Blockade (Barrier Level 14)",
    "cardType": "TRAP",
    "spellTrapSubtype": "NORMAL_TRAP",
    "spellSpeed": 2,
    "rarity": "SECRET_RARE",
    "attribute": "TERRA",
    "manaCost": 4,
    "chemicalFormula": "BaSO4↓",
    "effectCode": "TRAP_B21_HEAVY_BARIUM_SULFATE_BLOCKADE_NORM_108",
    "effectText": "[Bẫy Thường / Normal Trap - Spell Speed 2]: Khi quái thú đối phương tuyên bố tấn công: Hủy bỏ đòn tấn công và chuyển quái thú đó sang tư thế Phòng thủ, đồng thời gây 300 LP phản chấn.",
    "scientificLore": "Hiện tượng hóa học Bẫy Kết Tủa Vàng Bari Sunfat (Ba²⁺(aq) + SO₄²⁻(aq) → BaSO₄(s)↓ (Ksp = 1.08×10⁻¹⁰)) ngăn chặn sự lan truyền phản ứng hoặc bẫy bắt các ion tự do thành pha rắn/khí trơ theo chuẩn GDPT 2018.",
    "relatedEquation": "Ba²⁺(aq) + SO₄²⁻(aq) → BaSO₄(s)↓ (Ksp = 1.08×10⁻¹⁰)",
    "iupacName": "Heavy Barium Sulfate Blockade Countermeasure",
    "archetype": "HALOGEN_PURGE",
    "structuredEffects": [
      {
        "effectId": "B21_EFF_108",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "APPLY_STATUS",
            "params": {
              "statusType": "POSITION_LOCKED",
              "turns": 1
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Chặn đứng đòn tấn công, khóa tư thế quái thú địch và gây 300 LP."
      }
    ]
  },
  {
    "id": "card_b21_109_trap_bleach_hypochlorite_vapor_trap_109",
    "name": "Bẫy Khí Clo Khử Trùng Cực Mạnh (Tầng Bẫy 14)",
    "name_en": "Bleach Hypochlorite Vapor Trap (Barrier Level 14)",
    "cardType": "TRAP",
    "spellTrapSubtype": "NORMAL_TRAP",
    "spellSpeed": 2,
    "rarity": "COMMON",
    "attribute": "AERO",
    "manaCost": 1,
    "chemicalFormula": "NaClO + HCl",
    "effectCode": "TRAP_B21_BLEACH_HYPOCHLORITE_VAPOR_TRAP_NORM_109",
    "effectText": "[Bẫy Thường / Normal Trap - Spell Speed 2]: Khi quái thú đối phương tuyên bố tấn công: Hủy bỏ đòn tấn công và chuyển quái thú đó sang tư thế Phòng thủ, đồng thời gây 300 LP phản chấn.",
    "scientificLore": "Hiện tượng hóa học Bẫy Khí Clo Khử Trùng Cực Mạnh (NaClO + 2HCl → NaCl + Cl₂↑ + H₂O) ngăn chặn sự lan truyền phản ứng hoặc bẫy bắt các ion tự do thành pha rắn/khí trơ theo chuẩn GDPT 2018.",
    "relatedEquation": "NaClO + 2HCl → NaCl + Cl₂↑ + H₂O",
    "iupacName": "Bleach Hypochlorite Vapor Trap Countermeasure",
    "archetype": "PRECIPITATION_TRAP",
    "structuredEffects": [
      {
        "effectId": "B21_EFF_109",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "APPLY_STATUS",
            "params": {
              "statusType": "POSITION_LOCKED",
              "turns": 1
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Chặn đứng đòn tấn công, khóa tư thế quái thú địch và gây 300 LP."
      }
    ]
  },
  {
    "id": "card_b21_110_trap_activated_carbon_adsorption_net_110",
    "name": "Bẫy Hấp Phụ Khí Độc Bằng Than Hoạt Tính (Tầng Bẫy 14)",
    "name_en": "Activated Carbon Adsorption Net (Barrier Level 14)",
    "cardType": "TRAP",
    "spellTrapSubtype": "NORMAL_TRAP",
    "spellSpeed": 2,
    "rarity": "COMMON",
    "attribute": "TERRA",
    "manaCost": 2,
    "chemicalFormula": "C(adsorb)",
    "effectCode": "TRAP_B21_ACTIVATED_CARBON_ADSORPTION_NET_NORM_110",
    "effectText": "[Bẫy Thường / Normal Trap - Spell Speed 2]: Khi quái thú đối phương tuyên bố tấn công: Hủy bỏ đòn tấn công và chuyển quái thú đó sang tư thế Phòng thủ, đồng thời gây 300 LP phản chấn.",
    "scientificLore": "Hiện tượng hóa học Bẫy Hấp Phụ Khí Độc Bằng Than Hoạt Tính (Langmuir / Freundlich Multilayer Adsorption) ngăn chặn sự lan truyền phản ứng hoặc bẫy bắt các ion tự do thành pha rắn/khí trơ theo chuẩn GDPT 2018.",
    "relatedEquation": "Langmuir / Freundlich Multilayer Adsorption",
    "iupacName": "Activated Carbon Adsorption Net Countermeasure",
    "archetype": "HALOGEN_PURGE",
    "structuredEffects": [
      {
        "effectId": "B21_EFF_110",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "APPLY_STATUS",
            "params": {
              "statusType": "POSITION_LOCKED",
              "turns": 1
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Chặn đứng đòn tấn công, khóa tư thế quái thú địch và gây 300 LP."
      }
    ]
  },
  {
    "id": "card_b21_111_trap_lead_ii__iodide_golden_rain_trap_111",
    "name": "Bẫy Kết Tủa Chì(II) Iotua Hoàng Kim (Tầng Bẫy 14)",
    "name_en": "Lead(II) Iodide Golden Rain Trap (Barrier Level 14)",
    "cardType": "TRAP",
    "spellTrapSubtype": "NORMAL_TRAP",
    "spellSpeed": 2,
    "rarity": "COMMON",
    "attribute": "TERRA",
    "manaCost": 3,
    "chemicalFormula": "PbI2↓",
    "effectCode": "TRAP_B21_LEAD_II__IODIDE_GOLDEN_RAIN_TRAP_NORM_111",
    "effectText": "[Bẫy Thường / Normal Trap - Spell Speed 2]: Khi quái thú đối phương tuyên bố tấn công: Hủy bỏ đòn tấn công và chuyển quái thú đó sang tư thế Phòng thủ, đồng thời gây 300 LP phản chấn.",
    "scientificLore": "Hiện tượng hóa học Bẫy Kết Tủa Chì(II) Iotua Hoàng Kim (Pb²⁺(aq) + 2I⁻(aq) → PbI₂(s)↓ (Golden Glitter)) ngăn chặn sự lan truyền phản ứng hoặc bẫy bắt các ion tự do thành pha rắn/khí trơ theo chuẩn GDPT 2018.",
    "relatedEquation": "Pb²⁺(aq) + 2I⁻(aq) → PbI₂(s)↓ (Golden Glitter)",
    "iupacName": "Lead(II) Iodide Golden Rain Trap Countermeasure",
    "archetype": "PRECIPITATION_TRAP",
    "structuredEffects": [
      {
        "effectId": "B21_EFF_111",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "APPLY_STATUS",
            "params": {
              "statusType": "POSITION_LOCKED",
              "turns": 1
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Chặn đứng đòn tấn công, khóa tư thế quái thú địch và gây 300 LP."
      }
    ]
  },
  {
    "id": "card_b21_112_trap_hydrogen_gas_knallgas_detonation_trap_112",
    "name": "Bẫy Thoát Khí Hydro Nổ Tức Thời (Tầng Bẫy 14)",
    "name_en": "Hydrogen Gas Knallgas Detonation Trap (Barrier Level 14)",
    "cardType": "TRAP",
    "spellTrapSubtype": "NORMAL_TRAP",
    "spellSpeed": 2,
    "rarity": "RARE",
    "attribute": "PYRO",
    "manaCost": 4,
    "chemicalFormula": "2H2 + O2",
    "effectCode": "TRAP_B21_HYDROGEN_GAS_KNALLGAS_DETONATION_TRAP_NORM_112",
    "effectText": "[Bẫy Thường / Normal Trap - Spell Speed 2]: Khi quái thú đối phương tuyên bố tấn công: Hủy bỏ đòn tấn công và chuyển quái thú đó sang tư thế Phòng thủ, đồng thời gây 300 LP phản chấn.",
    "scientificLore": "Hiện tượng hóa học Bẫy Thoát Khí Hydro Nổ Tức Thời (2H₂ + O₂ → 2H₂O (Explosive Shockwave)) ngăn chặn sự lan truyền phản ứng hoặc bẫy bắt các ion tự do thành pha rắn/khí trơ theo chuẩn GDPT 2018.",
    "relatedEquation": "2H₂ + O₂ → 2H₂O (Explosive Shockwave)",
    "iupacName": "Hydrogen Gas Knallgas Detonation Trap Countermeasure",
    "archetype": "HALOGEN_PURGE",
    "structuredEffects": [
      {
        "effectId": "B21_EFF_112",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "APPLY_STATUS",
            "params": {
              "statusType": "POSITION_LOCKED",
              "turns": 1
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Chặn đứng đòn tấn công, khóa tư thế quái thú địch và gây 300 LP."
      }
    ]
  },
  {
    "id": "card_b21_113_trap_silver_chloride_precipitation_barrier_113",
    "name": "Bẫy Kết Tủa Bạc Clorua Trắng (Tầng Bẫy 15)",
    "name_en": "Silver Chloride Precipitation Barrier (Barrier Level 15)",
    "cardType": "TRAP",
    "spellTrapSubtype": "NORMAL_TRAP",
    "spellSpeed": 2,
    "rarity": "RARE",
    "attribute": "TERRA",
    "manaCost": 1,
    "chemicalFormula": "AgCl↓",
    "effectCode": "TRAP_B21_SILVER_CHLORIDE_PRECIPITATION_BARRIER_NORM_113",
    "effectText": "[Bẫy Thường / Normal Trap - Spell Speed 2]: Khi quái thú đối phương tuyên bố tấn công: Hủy bỏ đòn tấn công và chuyển quái thú đó sang tư thế Phòng thủ, đồng thời gây 300 LP phản chấn.",
    "scientificLore": "Hiện tượng hóa học Bẫy Kết Tủa Bạc Clorua Trắng (Ag⁺(aq) + Cl⁻(aq) → AgCl(s)↓ (Ksp = 1.77×10⁻¹⁰)) ngăn chặn sự lan truyền phản ứng hoặc bẫy bắt các ion tự do thành pha rắn/khí trơ theo chuẩn GDPT 2018.",
    "relatedEquation": "Ag⁺(aq) + Cl⁻(aq) → AgCl(s)↓ (Ksp = 1.77×10⁻¹⁰)",
    "iupacName": "Silver Chloride Precipitation Barrier Countermeasure",
    "archetype": "PRECIPITATION_TRAP",
    "structuredEffects": [
      {
        "effectId": "B21_EFF_113",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "APPLY_STATUS",
            "params": {
              "statusType": "POSITION_LOCKED",
              "turns": 1
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Chặn đứng đòn tấn công, khóa tư thế quái thú địch và gây 300 LP."
      }
    ]
  },
  {
    "id": "card_b21_114_trap_dry_chemical_extinguisher_quench_114",
    "name": "Bẫy Phun Khí Bột Chữa Cháy NaHCO3 (Tầng Bẫy 15)",
    "name_en": "Dry Chemical Extinguisher Quench (Barrier Level 15)",
    "cardType": "TRAP",
    "spellTrapSubtype": "NORMAL_TRAP",
    "spellSpeed": 2,
    "rarity": "SUPER_RARE",
    "attribute": "AERO",
    "manaCost": 2,
    "chemicalFormula": "2NaHCO3",
    "effectCode": "TRAP_B21_DRY_CHEMICAL_EXTINGUISHER_QUENCH_NORM_114",
    "effectText": "[Bẫy Thường / Normal Trap - Spell Speed 2]: Khi quái thú đối phương tuyên bố tấn công: Hủy bỏ đòn tấn công và chuyển quái thú đó sang tư thế Phòng thủ, đồng thời gây 300 LP phản chấn.",
    "scientificLore": "Hiện tượng hóa học Bẫy Phun Khí Bột Chữa Cháy NaHCO3 (2NaHCO₃ --heat--> Na₂CO₃ + H₂O + CO₂↑) ngăn chặn sự lan truyền phản ứng hoặc bẫy bắt các ion tự do thành pha rắn/khí trơ theo chuẩn GDPT 2018.",
    "relatedEquation": "2NaHCO₃ --heat--> Na₂CO₃ + H₂O + CO₂↑",
    "iupacName": "Dry Chemical Extinguisher Quench Countermeasure",
    "archetype": "HALOGEN_PURGE",
    "structuredEffects": [
      {
        "effectId": "B21_EFF_114",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "APPLY_STATUS",
            "params": {
              "statusType": "POSITION_LOCKED",
              "turns": 1
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Chặn đứng đòn tấn công, khóa tư thế quái thú địch và gây 300 LP."
      }
    ]
  },
  {
    "id": "card_b21_115_trap_sacrificial_zinc_anode_discharge_115",
    "name": "Bẫy Anode Hy Sinh Chống Ăn Mòn (Tầng Bẫy 15)",
    "name_en": "Sacrificial Zinc Anode Discharge (Barrier Level 15)",
    "cardType": "TRAP",
    "spellTrapSubtype": "NORMAL_TRAP",
    "spellSpeed": 2,
    "rarity": "SUPER_RARE",
    "attribute": "ELECTRO",
    "manaCost": 3,
    "chemicalFormula": "Zn → Zn2+ + 2e-",
    "effectCode": "TRAP_B21_SACRIFICIAL_ZINC_ANODE_DISCHARGE_NORM_115",
    "effectText": "[Bẫy Thường / Normal Trap - Spell Speed 2]: Khi quái thú đối phương tuyên bố tấn công: Hủy bỏ đòn tấn công và chuyển quái thú đó sang tư thế Phòng thủ, đồng thời gây 300 LP phản chấn.",
    "scientificLore": "Hiện tượng hóa học Bẫy Anode Hy Sinh Chống Ăn Mòn (Zn(s) → Zn²⁺(aq) + 2e⁻ (E° = -0.76V vs Fe -0.44V)) ngăn chặn sự lan truyền phản ứng hoặc bẫy bắt các ion tự do thành pha rắn/khí trơ theo chuẩn GDPT 2018.",
    "relatedEquation": "Zn(s) → Zn²⁺(aq) + 2e⁻ (E° = -0.76V vs Fe -0.44V)",
    "iupacName": "Sacrificial Zinc Anode Discharge Countermeasure",
    "archetype": "PRECIPITATION_TRAP",
    "structuredEffects": [
      {
        "effectId": "B21_EFF_115",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "APPLY_STATUS",
            "params": {
              "statusType": "POSITION_LOCKED",
              "turns": 1
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Chặn đứng đòn tấn công, khóa tư thế quái thú địch và gây 300 LP."
      }
    ]
  },
  {
    "id": "card_b21_116_trap_heavy_barium_sulfate_blockade_116",
    "name": "Bẫy Kết Tủa Vàng Bari Sunfat (Tầng Bẫy 15)",
    "name_en": "Heavy Barium Sulfate Blockade (Barrier Level 15)",
    "cardType": "TRAP",
    "spellTrapSubtype": "NORMAL_TRAP",
    "spellSpeed": 2,
    "rarity": "ULTRA_RARE",
    "attribute": "TERRA",
    "manaCost": 4,
    "chemicalFormula": "BaSO4↓",
    "effectCode": "TRAP_B21_HEAVY_BARIUM_SULFATE_BLOCKADE_NORM_116",
    "effectText": "[Bẫy Thường / Normal Trap - Spell Speed 2]: Khi quái thú đối phương tuyên bố tấn công: Hủy bỏ đòn tấn công và chuyển quái thú đó sang tư thế Phòng thủ, đồng thời gây 300 LP phản chấn.",
    "scientificLore": "Hiện tượng hóa học Bẫy Kết Tủa Vàng Bari Sunfat (Ba²⁺(aq) + SO₄²⁻(aq) → BaSO₄(s)↓ (Ksp = 1.08×10⁻¹⁰)) ngăn chặn sự lan truyền phản ứng hoặc bẫy bắt các ion tự do thành pha rắn/khí trơ theo chuẩn GDPT 2018.",
    "relatedEquation": "Ba²⁺(aq) + SO₄²⁻(aq) → BaSO₄(s)↓ (Ksp = 1.08×10⁻¹⁰)",
    "iupacName": "Heavy Barium Sulfate Blockade Countermeasure",
    "archetype": "HALOGEN_PURGE",
    "structuredEffects": [
      {
        "effectId": "B21_EFF_116",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "APPLY_STATUS",
            "params": {
              "statusType": "POSITION_LOCKED",
              "turns": 1
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Chặn đứng đòn tấn công, khóa tư thế quái thú địch và gây 300 LP."
      }
    ]
  },
  {
    "id": "card_b21_117_trap_bleach_hypochlorite_vapor_trap_117",
    "name": "Bẫy Khí Clo Khử Trùng Cực Mạnh (Tầng Bẫy 15)",
    "name_en": "Bleach Hypochlorite Vapor Trap (Barrier Level 15)",
    "cardType": "TRAP",
    "spellTrapSubtype": "NORMAL_TRAP",
    "spellSpeed": 2,
    "rarity": "SECRET_RARE",
    "attribute": "AERO",
    "manaCost": 1,
    "chemicalFormula": "NaClO + HCl",
    "effectCode": "TRAP_B21_BLEACH_HYPOCHLORITE_VAPOR_TRAP_NORM_117",
    "effectText": "[Bẫy Thường / Normal Trap - Spell Speed 2]: Khi quái thú đối phương tuyên bố tấn công: Hủy bỏ đòn tấn công và chuyển quái thú đó sang tư thế Phòng thủ, đồng thời gây 300 LP phản chấn.",
    "scientificLore": "Hiện tượng hóa học Bẫy Khí Clo Khử Trùng Cực Mạnh (NaClO + 2HCl → NaCl + Cl₂↑ + H₂O) ngăn chặn sự lan truyền phản ứng hoặc bẫy bắt các ion tự do thành pha rắn/khí trơ theo chuẩn GDPT 2018.",
    "relatedEquation": "NaClO + 2HCl → NaCl + Cl₂↑ + H₂O",
    "iupacName": "Bleach Hypochlorite Vapor Trap Countermeasure",
    "archetype": "PRECIPITATION_TRAP",
    "structuredEffects": [
      {
        "effectId": "B21_EFF_117",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "APPLY_STATUS",
            "params": {
              "statusType": "POSITION_LOCKED",
              "turns": 1
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Chặn đứng đòn tấn công, khóa tư thế quái thú địch và gây 300 LP."
      }
    ]
  },
  {
    "id": "card_b21_118_trap_activated_carbon_adsorption_net_118",
    "name": "Bẫy Hấp Phụ Khí Độc Bằng Than Hoạt Tính (Tầng Bẫy 15)",
    "name_en": "Activated Carbon Adsorption Net (Barrier Level 15)",
    "cardType": "TRAP",
    "spellTrapSubtype": "NORMAL_TRAP",
    "spellSpeed": 2,
    "rarity": "COMMON",
    "attribute": "TERRA",
    "manaCost": 2,
    "chemicalFormula": "C(adsorb)",
    "effectCode": "TRAP_B21_ACTIVATED_CARBON_ADSORPTION_NET_NORM_118",
    "effectText": "[Bẫy Thường / Normal Trap - Spell Speed 2]: Khi quái thú đối phương tuyên bố tấn công: Hủy bỏ đòn tấn công và chuyển quái thú đó sang tư thế Phòng thủ, đồng thời gây 300 LP phản chấn.",
    "scientificLore": "Hiện tượng hóa học Bẫy Hấp Phụ Khí Độc Bằng Than Hoạt Tính (Langmuir / Freundlich Multilayer Adsorption) ngăn chặn sự lan truyền phản ứng hoặc bẫy bắt các ion tự do thành pha rắn/khí trơ theo chuẩn GDPT 2018.",
    "relatedEquation": "Langmuir / Freundlich Multilayer Adsorption",
    "iupacName": "Activated Carbon Adsorption Net Countermeasure",
    "archetype": "HALOGEN_PURGE",
    "structuredEffects": [
      {
        "effectId": "B21_EFF_118",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "APPLY_STATUS",
            "params": {
              "statusType": "POSITION_LOCKED",
              "turns": 1
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Chặn đứng đòn tấn công, khóa tư thế quái thú địch và gây 300 LP."
      }
    ]
  },
  {
    "id": "card_b21_119_trap_lead_ii__iodide_golden_rain_trap_119",
    "name": "Bẫy Kết Tủa Chì(II) Iotua Hoàng Kim (Tầng Bẫy 15)",
    "name_en": "Lead(II) Iodide Golden Rain Trap (Barrier Level 15)",
    "cardType": "TRAP",
    "spellTrapSubtype": "NORMAL_TRAP",
    "spellSpeed": 2,
    "rarity": "COMMON",
    "attribute": "TERRA",
    "manaCost": 3,
    "chemicalFormula": "PbI2↓",
    "effectCode": "TRAP_B21_LEAD_II__IODIDE_GOLDEN_RAIN_TRAP_NORM_119",
    "effectText": "[Bẫy Thường / Normal Trap - Spell Speed 2]: Khi quái thú đối phương tuyên bố tấn công: Hủy bỏ đòn tấn công và chuyển quái thú đó sang tư thế Phòng thủ, đồng thời gây 300 LP phản chấn.",
    "scientificLore": "Hiện tượng hóa học Bẫy Kết Tủa Chì(II) Iotua Hoàng Kim (Pb²⁺(aq) + 2I⁻(aq) → PbI₂(s)↓ (Golden Glitter)) ngăn chặn sự lan truyền phản ứng hoặc bẫy bắt các ion tự do thành pha rắn/khí trơ theo chuẩn GDPT 2018.",
    "relatedEquation": "Pb²⁺(aq) + 2I⁻(aq) → PbI₂(s)↓ (Golden Glitter)",
    "iupacName": "Lead(II) Iodide Golden Rain Trap Countermeasure",
    "archetype": "PRECIPITATION_TRAP",
    "structuredEffects": [
      {
        "effectId": "B21_EFF_119",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "APPLY_STATUS",
            "params": {
              "statusType": "POSITION_LOCKED",
              "turns": 1
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Chặn đứng đòn tấn công, khóa tư thế quái thú địch và gây 300 LP."
      }
    ]
  },
  {
    "id": "card_b21_120_trap_hydrogen_gas_knallgas_detonation_trap_120",
    "name": "Bẫy Thoát Khí Hydro Nổ Tức Thời (Tầng Bẫy 15)",
    "name_en": "Hydrogen Gas Knallgas Detonation Trap (Barrier Level 15)",
    "cardType": "TRAP",
    "spellTrapSubtype": "NORMAL_TRAP",
    "spellSpeed": 2,
    "rarity": "COMMON",
    "attribute": "PYRO",
    "manaCost": 4,
    "chemicalFormula": "2H2 + O2",
    "effectCode": "TRAP_B21_HYDROGEN_GAS_KNALLGAS_DETONATION_TRAP_NORM_120",
    "effectText": "[Bẫy Thường / Normal Trap - Spell Speed 2]: Khi quái thú đối phương tuyên bố tấn công: Hủy bỏ đòn tấn công và chuyển quái thú đó sang tư thế Phòng thủ, đồng thời gây 300 LP phản chấn.",
    "scientificLore": "Hiện tượng hóa học Bẫy Thoát Khí Hydro Nổ Tức Thời (2H₂ + O₂ → 2H₂O (Explosive Shockwave)) ngăn chặn sự lan truyền phản ứng hoặc bẫy bắt các ion tự do thành pha rắn/khí trơ theo chuẩn GDPT 2018.",
    "relatedEquation": "2H₂ + O₂ → 2H₂O (Explosive Shockwave)",
    "iupacName": "Hydrogen Gas Knallgas Detonation Trap Countermeasure",
    "archetype": "HALOGEN_PURGE",
    "structuredEffects": [
      {
        "effectId": "B21_EFF_120",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "APPLY_STATUS",
            "params": {
              "statusType": "POSITION_LOCKED",
              "turns": 1
            }
          },
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Chặn đứng đòn tấn công, khóa tư thế quái thú địch và gây 300 LP."
      }
    ]
  }
];
