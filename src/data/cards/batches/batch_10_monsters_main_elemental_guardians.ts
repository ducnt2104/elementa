// src/data/cards/batches/batch_10_monsters_main_elemental_guardians.ts
// Batch 10: Elemental Guardian Monsters (100 cards)
// Automatically generated and validated for ELEMENTA Tactical TCG

import { PlayableCardDef } from '../../../domain/cardGameTypes';

export const BATCH_10_CARDS: PlayableCardDef[] = [
  {
    "id": "card_b10_001_diamond_lattice_guardian_1",
    "name": "Hộ Vệ Tinh Thể Kim Cương — Bậc 1",
    "name_en": "Diamond Lattice Guardian — Tier 1",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "NOBLE_VOID",
    "manaCost": 3,
    "level": 4,
    "atk": 2420,
    "def": 2480,
    "chemicalFormula": "C(diamond)",
    "effectCode": "ELEM_B10_DIAMOND_LATTICE_GUARDIAN_GUARD_1",
    "effectText": "Bảo vệ mạng tinh thể nguyên tố: Tăng 400 DEF cho tất cả quái thú cùng thuộc tính trên sân. Không thể bị tiêu diệt bởi đòn tấn công đầu tiên mỗi lượt.",
    "scientificLore": "Hộ Vệ Tinh Thể Kim Cương đại diện cho giới hạn cực đại của liên kết hóa học (Giant Covalent 3D Network), độ cứng tinh thể hoặc khả năng nhường proton mạnh nhất trong tự nhiên theo GDPT 2018.",
    "relatedEquation": "Giant Covalent 3D Network",
    "iupacName": "Diamond Lattice Guardian Sovereign",
    "archetype": "CRYSTAL_LATTICE",
    "structuredEffects": [
      {
        "effectId": "B10_EFF_1",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "DEF",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 400 DEF cho toàn thể đồng minh bằng mạng tinh thể."
      }
    ]
  },
  {
    "id": "card_b10_002_fluoroantimonic_superacid_sovereign_2",
    "name": "Chúa Tể Siêu Axit Fluoroantimonic — Bậc 1",
    "name_en": "Fluoroantimonic Superacid Sovereign — Tier 1",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "ULTRA_RARE",
    "attribute": "ACID_DARK",
    "manaCost": 4,
    "level": 5,
    "atk": 2700,
    "def": 2760,
    "chemicalFormula": "HSbF6",
    "effectCode": "ELEM_B10_FLUOROANTIMONIC_SUPERACID_SOVEREIGN_GUARD_2",
    "effectText": "Bảo vệ mạng tinh thể nguyên tố: Tăng 400 DEF cho tất cả quái thú cùng thuộc tính trên sân. Không thể bị tiêu diệt bởi đòn tấn công đầu tiên mỗi lượt.",
    "scientificLore": "Chúa Tể Siêu Axit Fluoroantimonic đại diện cho giới hạn cực đại của liên kết hóa học (HF + SbF₅ ⇌ H₂F⁺ + SbF₆⁻ (H₀ = -31.3)), độ cứng tinh thể hoặc khả năng nhường proton mạnh nhất trong tự nhiên theo GDPT 2018.",
    "relatedEquation": "HF + SbF₅ ⇌ H₂F⁺ + SbF₆⁻ (H₀ = -31.3)",
    "iupacName": "Fluoroantimonic Superacid Sovereign Sovereign",
    "archetype": "SUPERACID_EXTREME",
    "structuredEffects": [
      {
        "effectId": "B10_EFF_2",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "DEF",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 400 DEF cho toàn thể đồng minh bằng mạng tinh thể."
      }
    ]
  },
  {
    "id": "card_b10_003_halite_crystal_knight_3",
    "name": "Kỵ Sĩ Mạng Tinh Thể Muối Ăn — Bậc 1",
    "name_en": "Halite Crystal Knight — Tier 1",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SECRET_RARE",
    "attribute": "TERRA",
    "manaCost": 5,
    "level": 6,
    "atk": 2980,
    "def": 3040,
    "chemicalFormula": "NaCl(s)",
    "effectCode": "ELEM_B10_HALITE_CRYSTAL_KNIGHT_GUARD_3",
    "effectText": "Bảo vệ mạng tinh thể nguyên tố: Tăng 400 DEF cho tất cả quái thú cùng thuộc tính trên sân. Không thể bị tiêu diệt bởi đòn tấn công đầu tiên mỗi lượt.",
    "scientificLore": "Kỵ Sĩ Mạng Tinh Thể Muối Ăn đại diện cho giới hạn cực đại của liên kết hóa học (Na⁺(fcc) + Cl⁻(fcc) Lattice), độ cứng tinh thể hoặc khả năng nhường proton mạnh nhất trong tự nhiên theo GDPT 2018.",
    "relatedEquation": "Na⁺(fcc) + Cl⁻(fcc) Lattice",
    "iupacName": "Halite Crystal Knight Sovereign",
    "archetype": "CRYSTAL_LATTICE",
    "structuredEffects": [
      {
        "effectId": "B10_EFF_3",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "DEF",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 400 DEF cho toàn thể đồng minh bằng mạng tinh thể."
      }
    ]
  },
  {
    "id": "card_b10_004_magnesium_flare_king_4",
    "name": "Vua Lửa Magie Pháo Sáng — Bậc 1",
    "name_en": "Magnesium Flare King — Tier 1",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "PYRO",
    "manaCost": 6,
    "level": 7,
    "atk": 3260,
    "def": 3320,
    "chemicalFormula": "MgO(s)",
    "effectCode": "ELEM_B10_MAGNESIUM_FLARE_KING_GUARD_4",
    "effectText": "Bảo vệ mạng tinh thể nguyên tố: Tăng 400 DEF cho tất cả quái thú cùng thuộc tính trên sân. Không thể bị tiêu diệt bởi đòn tấn công đầu tiên mỗi lượt.",
    "scientificLore": "Vua Lửa Magie Pháo Sáng đại diện cho giới hạn cực đại của liên kết hóa học (2Mg + O₂ → 2MgO + 1204 kJ), độ cứng tinh thể hoặc khả năng nhường proton mạnh nhất trong tự nhiên theo GDPT 2018.",
    "relatedEquation": "2Mg + O₂ → 2MgO + 1204 kJ",
    "iupacName": "Magnesium Flare King Sovereign",
    "archetype": "SUPERACID_EXTREME",
    "structuredEffects": [
      {
        "effectId": "B10_EFF_4",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "DEF",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 400 DEF cho toàn thể đồng minh bằng mạng tinh thể."
      }
    ]
  },
  {
    "id": "card_b10_005_hydrolysis_dragon_king_5",
    "name": "Long Vương Thủy Phân Điện Phân — Bậc 1",
    "name_en": "Hydrolysis Dragon King — Tier 1",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "AQUA",
    "manaCost": 7,
    "level": 8,
    "atk": 3340,
    "def": 3600,
    "chemicalFormula": "2H2O",
    "effectCode": "ELEM_B10_HYDROLYSIS_DRAGON_KING_GUARD_5",
    "effectText": "Bảo vệ mạng tinh thể nguyên tố: Tăng 400 DEF cho tất cả quái thú cùng thuộc tính trên sân. Không thể bị tiêu diệt bởi đòn tấn công đầu tiên mỗi lượt.",
    "scientificLore": "Long Vương Thủy Phân Điện Phân đại diện cho giới hạn cực đại của liên kết hóa học (2H₂O --electrolysis--> 2H₂ + O₂), độ cứng tinh thể hoặc khả năng nhường proton mạnh nhất trong tự nhiên theo GDPT 2018.",
    "relatedEquation": "2H₂O --electrolysis--> 2H₂ + O₂",
    "iupacName": "Hydrolysis Dragon King Sovereign",
    "archetype": "CRYSTAL_LATTICE",
    "structuredEffects": [
      {
        "effectId": "B10_EFF_5",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "DEF",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 400 DEF cho toàn thể đồng minh bằng mạng tinh thể."
      }
    ]
  },
  {
    "id": "card_b10_006_halogen_storm_supreme_6",
    "name": "Bão Tố Khí Halogen Cực Đại — Bậc 1",
    "name_en": "Halogen Storm Supreme — Tier 1",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "AERO",
    "manaCost": 3,
    "level": 4,
    "atk": 2470,
    "def": 2480,
    "chemicalFormula": "Cl2/Br2/I2",
    "effectCode": "ELEM_B10_HALOGEN_STORM_SUPREME_GUARD_6",
    "effectText": "Bảo vệ mạng tinh thể nguyên tố: Tăng 400 DEF cho tất cả quái thú cùng thuộc tính trên sân. Không thể bị tiêu diệt bởi đòn tấn công đầu tiên mỗi lượt.",
    "scientificLore": "Bão Tố Khí Halogen Cực Đại đại diện cho giới hạn cực đại của liên kết hóa học (Electronegativity Cascade), độ cứng tinh thể hoặc khả năng nhường proton mạnh nhất trong tự nhiên theo GDPT 2018.",
    "relatedEquation": "Electronegativity Cascade",
    "iupacName": "Halogen Storm Supreme Sovereign",
    "archetype": "CRYSTAL_LATTICE",
    "structuredEffects": [
      {
        "effectId": "B10_EFF_6",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "DEF",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 400 DEF cho toàn thể đồng minh bằng mạng tinh thể."
      }
    ]
  },
  {
    "id": "card_b10_007_lithium_galvanic_titan_7",
    "name": "Thần Sấm Pin Galvanic Lithium — Bậc 1",
    "name_en": "Lithium Galvanic Titan — Tier 1",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "ELECTRO",
    "manaCost": 4,
    "level": 5,
    "atk": 2750,
    "def": 2760,
    "chemicalFormula": "Li/Li+",
    "effectCode": "ELEM_B10_LITHIUM_GALVANIC_TITAN_GUARD_7",
    "effectText": "Bảo vệ mạng tinh thể nguyên tố: Tăng 400 DEF cho tất cả quái thú cùng thuộc tính trên sân. Không thể bị tiêu diệt bởi đòn tấn công đầu tiên mỗi lượt.",
    "scientificLore": "Thần Sấm Pin Galvanic Lithium đại diện cho giới hạn cực đại của liên kết hóa học (Li → Li⁺ + e⁻ (E° = -3.04V)), độ cứng tinh thể hoặc khả năng nhường proton mạnh nhất trong tự nhiên theo GDPT 2018.",
    "relatedEquation": "Li → Li⁺ + e⁻ (E° = -3.04V)",
    "iupacName": "Lithium Galvanic Titan Sovereign",
    "archetype": "CRYSTAL_LATTICE",
    "structuredEffects": [
      {
        "effectId": "B10_EFF_7",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "DEF",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 400 DEF cho toàn thể đồng minh bằng mạng tinh thể."
      }
    ]
  },
  {
    "id": "card_b10_008_bond_enthalpy_protector_8",
    "name": "Hộ Pháp Năng Lượng Liên Kết — Bậc 1",
    "name_en": "Bond Enthalpy Protector — Tier 1",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "PYRO",
    "manaCost": 5,
    "level": 6,
    "atk": 3030,
    "def": 3040,
    "chemicalFormula": "ΔH_bond",
    "effectCode": "ELEM_B10_BOND_ENTHALPY_PROTECTOR_GUARD_8",
    "effectText": "Bảo vệ mạng tinh thể nguyên tố: Tăng 400 DEF cho tất cả quái thú cùng thuộc tính trên sân. Không thể bị tiêu diệt bởi đòn tấn công đầu tiên mỗi lượt.",
    "scientificLore": "Hộ Pháp Năng Lượng Liên Kết đại diện cho giới hạn cực đại của liên kết hóa học (ΔH_rxn = ∑Eb(react) - ∑Eb(prod)), độ cứng tinh thể hoặc khả năng nhường proton mạnh nhất trong tự nhiên theo GDPT 2018.",
    "relatedEquation": "ΔH_rxn = ∑Eb(react) - ∑Eb(prod)",
    "iupacName": "Bond Enthalpy Protector Sovereign",
    "archetype": "CRYSTAL_LATTICE",
    "structuredEffects": [
      {
        "effectId": "B10_EFF_8",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "DEF",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 400 DEF cho toàn thể đồng minh bằng mạng tinh thể."
      }
    ]
  },
  {
    "id": "card_b10_009_dry_ice_sublimation_phantom_9",
    "name": "Bóng Ma Tinh Thể Băng Khô — Bậc 1",
    "name_en": "Dry Ice Sublimation Phantom — Tier 1",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "AERO",
    "manaCost": 6,
    "level": 7,
    "atk": 3110,
    "def": 3320,
    "chemicalFormula": "CO2(s)",
    "effectCode": "ELEM_B10_DRY_ICE_SUBLIMATION_PHANTOM_GUARD_9",
    "effectText": "Bảo vệ mạng tinh thể nguyên tố: Tăng 400 DEF cho tất cả quái thú cùng thuộc tính trên sân. Không thể bị tiêu diệt bởi đòn tấn công đầu tiên mỗi lượt.",
    "scientificLore": "Bóng Ma Tinh Thể Băng Khô đại diện cho giới hạn cực đại của liên kết hóa học (CO₂(s) → CO₂(g) (-78.5°C)), độ cứng tinh thể hoặc khả năng nhường proton mạnh nhất trong tự nhiên theo GDPT 2018.",
    "relatedEquation": "CO₂(s) → CO₂(g) (-78.5°C)",
    "iupacName": "Dry Ice Sublimation Phantom Sovereign",
    "archetype": "CRYSTAL_LATTICE",
    "structuredEffects": [
      {
        "effectId": "B10_EFF_9",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "DEF",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 400 DEF cho toàn thể đồng minh bằng mạng tinh thể."
      }
    ]
  },
  {
    "id": "card_b10_010_kevlar_armor_bastion_10",
    "name": "Vệ Thần Polyme Kevlar Chống Đạn — Bậc 1",
    "name_en": "Kevlar Armor Bastion — Tier 1",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "NOBLE_VOID",
    "manaCost": 7,
    "level": 8,
    "atk": 3390,
    "def": 3600,
    "chemicalFormula": "Aramid",
    "effectCode": "ELEM_B10_KEVLAR_ARMOR_BASTION_GUARD_10",
    "effectText": "Bảo vệ mạng tinh thể nguyên tố: Tăng 400 DEF cho tất cả quái thú cùng thuộc tính trên sân. Không thể bị tiêu diệt bởi đòn tấn công đầu tiên mỗi lượt.",
    "scientificLore": "Vệ Thần Polyme Kevlar Chống Đạn đại diện cho giới hạn cực đại của liên kết hóa học (Interchain Hydrogen Bonding Network), độ cứng tinh thể hoặc khả năng nhường proton mạnh nhất trong tự nhiên theo GDPT 2018.",
    "relatedEquation": "Interchain Hydrogen Bonding Network",
    "iupacName": "Kevlar Armor Bastion Sovereign",
    "archetype": "CRYSTAL_LATTICE",
    "structuredEffects": [
      {
        "effectId": "B10_EFF_10",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "DEF",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 400 DEF cho toàn thể đồng minh bằng mạng tinh thể."
      }
    ]
  },
  {
    "id": "card_b10_011_diamond_lattice_guardian_11",
    "name": "Hộ Vệ Tinh Thể Kim Cương — Bậc 2",
    "name_en": "Diamond Lattice Guardian — Tier 2",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "ULTRA_RARE",
    "attribute": "NOBLE_VOID",
    "manaCost": 3,
    "level": 4,
    "atk": 2520,
    "def": 2480,
    "chemicalFormula": "C(diamond)",
    "effectCode": "ELEM_B10_DIAMOND_LATTICE_GUARDIAN_GUARD_11",
    "effectText": "Bảo vệ mạng tinh thể nguyên tố: Tăng 400 DEF cho tất cả quái thú cùng thuộc tính trên sân. Không thể bị tiêu diệt bởi đòn tấn công đầu tiên mỗi lượt.",
    "scientificLore": "Hộ Vệ Tinh Thể Kim Cương đại diện cho giới hạn cực đại của liên kết hóa học (Giant Covalent 3D Network), độ cứng tinh thể hoặc khả năng nhường proton mạnh nhất trong tự nhiên theo GDPT 2018.",
    "relatedEquation": "Giant Covalent 3D Network",
    "iupacName": "Diamond Lattice Guardian Sovereign",
    "archetype": "CRYSTAL_LATTICE",
    "structuredEffects": [
      {
        "effectId": "B10_EFF_11",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "DEF",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 400 DEF cho toàn thể đồng minh bằng mạng tinh thể."
      }
    ]
  },
  {
    "id": "card_b10_012_fluoroantimonic_superacid_sovereign_12",
    "name": "Chúa Tể Siêu Axit Fluoroantimonic — Bậc 2",
    "name_en": "Fluoroantimonic Superacid Sovereign — Tier 2",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SECRET_RARE",
    "attribute": "ACID_DARK",
    "manaCost": 4,
    "level": 5,
    "atk": 2800,
    "def": 2760,
    "chemicalFormula": "HSbF6",
    "effectCode": "ELEM_B10_FLUOROANTIMONIC_SUPERACID_SOVEREIGN_GUARD_12",
    "effectText": "Bảo vệ mạng tinh thể nguyên tố: Tăng 400 DEF cho tất cả quái thú cùng thuộc tính trên sân. Không thể bị tiêu diệt bởi đòn tấn công đầu tiên mỗi lượt.",
    "scientificLore": "Chúa Tể Siêu Axit Fluoroantimonic đại diện cho giới hạn cực đại của liên kết hóa học (HF + SbF₅ ⇌ H₂F⁺ + SbF₆⁻ (H₀ = -31.3)), độ cứng tinh thể hoặc khả năng nhường proton mạnh nhất trong tự nhiên theo GDPT 2018.",
    "relatedEquation": "HF + SbF₅ ⇌ H₂F⁺ + SbF₆⁻ (H₀ = -31.3)",
    "iupacName": "Fluoroantimonic Superacid Sovereign Sovereign",
    "archetype": "SUPERACID_EXTREME",
    "structuredEffects": [
      {
        "effectId": "B10_EFF_12",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "DEF",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 400 DEF cho toàn thể đồng minh bằng mạng tinh thể."
      }
    ]
  },
  {
    "id": "card_b10_013_halite_crystal_knight_13",
    "name": "Kỵ Sĩ Mạng Tinh Thể Muối Ăn — Bậc 2",
    "name_en": "Halite Crystal Knight — Tier 2",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "TERRA",
    "manaCost": 5,
    "level": 6,
    "atk": 2880,
    "def": 3040,
    "chemicalFormula": "NaCl(s)",
    "effectCode": "ELEM_B10_HALITE_CRYSTAL_KNIGHT_GUARD_13",
    "effectText": "Bảo vệ mạng tinh thể nguyên tố: Tăng 400 DEF cho tất cả quái thú cùng thuộc tính trên sân. Không thể bị tiêu diệt bởi đòn tấn công đầu tiên mỗi lượt.",
    "scientificLore": "Kỵ Sĩ Mạng Tinh Thể Muối Ăn đại diện cho giới hạn cực đại của liên kết hóa học (Na⁺(fcc) + Cl⁻(fcc) Lattice), độ cứng tinh thể hoặc khả năng nhường proton mạnh nhất trong tự nhiên theo GDPT 2018.",
    "relatedEquation": "Na⁺(fcc) + Cl⁻(fcc) Lattice",
    "iupacName": "Halite Crystal Knight Sovereign",
    "archetype": "CRYSTAL_LATTICE",
    "structuredEffects": [
      {
        "effectId": "B10_EFF_13",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "DEF",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 400 DEF cho toàn thể đồng minh bằng mạng tinh thể."
      }
    ]
  },
  {
    "id": "card_b10_014_magnesium_flare_king_14",
    "name": "Vua Lửa Magie Pháo Sáng — Bậc 2",
    "name_en": "Magnesium Flare King — Tier 2",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "PYRO",
    "manaCost": 6,
    "level": 7,
    "atk": 3160,
    "def": 3320,
    "chemicalFormula": "MgO(s)",
    "effectCode": "ELEM_B10_MAGNESIUM_FLARE_KING_GUARD_14",
    "effectText": "Bảo vệ mạng tinh thể nguyên tố: Tăng 400 DEF cho tất cả quái thú cùng thuộc tính trên sân. Không thể bị tiêu diệt bởi đòn tấn công đầu tiên mỗi lượt.",
    "scientificLore": "Vua Lửa Magie Pháo Sáng đại diện cho giới hạn cực đại của liên kết hóa học (2Mg + O₂ → 2MgO + 1204 kJ), độ cứng tinh thể hoặc khả năng nhường proton mạnh nhất trong tự nhiên theo GDPT 2018.",
    "relatedEquation": "2Mg + O₂ → 2MgO + 1204 kJ",
    "iupacName": "Magnesium Flare King Sovereign",
    "archetype": "SUPERACID_EXTREME",
    "structuredEffects": [
      {
        "effectId": "B10_EFF_14",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "DEF",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 400 DEF cho toàn thể đồng minh bằng mạng tinh thể."
      }
    ]
  },
  {
    "id": "card_b10_015_hydrolysis_dragon_king_15",
    "name": "Long Vương Thủy Phân Điện Phân — Bậc 2",
    "name_en": "Hydrolysis Dragon King — Tier 2",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "AQUA",
    "manaCost": 7,
    "level": 8,
    "atk": 3440,
    "def": 3600,
    "chemicalFormula": "2H2O",
    "effectCode": "ELEM_B10_HYDROLYSIS_DRAGON_KING_GUARD_15",
    "effectText": "Bảo vệ mạng tinh thể nguyên tố: Tăng 400 DEF cho tất cả quái thú cùng thuộc tính trên sân. Không thể bị tiêu diệt bởi đòn tấn công đầu tiên mỗi lượt.",
    "scientificLore": "Long Vương Thủy Phân Điện Phân đại diện cho giới hạn cực đại của liên kết hóa học (2H₂O --electrolysis--> 2H₂ + O₂), độ cứng tinh thể hoặc khả năng nhường proton mạnh nhất trong tự nhiên theo GDPT 2018.",
    "relatedEquation": "2H₂O --electrolysis--> 2H₂ + O₂",
    "iupacName": "Hydrolysis Dragon King Sovereign",
    "archetype": "CRYSTAL_LATTICE",
    "structuredEffects": [
      {
        "effectId": "B10_EFF_15",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "DEF",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 400 DEF cho toàn thể đồng minh bằng mạng tinh thể."
      }
    ]
  },
  {
    "id": "card_b10_016_halogen_storm_supreme_16",
    "name": "Bão Tố Khí Halogen Cực Đại — Bậc 2",
    "name_en": "Halogen Storm Supreme — Tier 2",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "AERO",
    "manaCost": 3,
    "level": 4,
    "atk": 2570,
    "def": 2480,
    "chemicalFormula": "Cl2/Br2/I2",
    "effectCode": "ELEM_B10_HALOGEN_STORM_SUPREME_GUARD_16",
    "effectText": "Bảo vệ mạng tinh thể nguyên tố: Tăng 400 DEF cho tất cả quái thú cùng thuộc tính trên sân. Không thể bị tiêu diệt bởi đòn tấn công đầu tiên mỗi lượt.",
    "scientificLore": "Bão Tố Khí Halogen Cực Đại đại diện cho giới hạn cực đại của liên kết hóa học (Electronegativity Cascade), độ cứng tinh thể hoặc khả năng nhường proton mạnh nhất trong tự nhiên theo GDPT 2018.",
    "relatedEquation": "Electronegativity Cascade",
    "iupacName": "Halogen Storm Supreme Sovereign",
    "archetype": "CRYSTAL_LATTICE",
    "structuredEffects": [
      {
        "effectId": "B10_EFF_16",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "DEF",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 400 DEF cho toàn thể đồng minh bằng mạng tinh thể."
      }
    ]
  },
  {
    "id": "card_b10_017_lithium_galvanic_titan_17",
    "name": "Thần Sấm Pin Galvanic Lithium — Bậc 2",
    "name_en": "Lithium Galvanic Titan — Tier 2",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "ELECTRO",
    "manaCost": 4,
    "level": 5,
    "atk": 2650,
    "def": 2760,
    "chemicalFormula": "Li/Li+",
    "effectCode": "ELEM_B10_LITHIUM_GALVANIC_TITAN_GUARD_17",
    "effectText": "Bảo vệ mạng tinh thể nguyên tố: Tăng 400 DEF cho tất cả quái thú cùng thuộc tính trên sân. Không thể bị tiêu diệt bởi đòn tấn công đầu tiên mỗi lượt.",
    "scientificLore": "Thần Sấm Pin Galvanic Lithium đại diện cho giới hạn cực đại của liên kết hóa học (Li → Li⁺ + e⁻ (E° = -3.04V)), độ cứng tinh thể hoặc khả năng nhường proton mạnh nhất trong tự nhiên theo GDPT 2018.",
    "relatedEquation": "Li → Li⁺ + e⁻ (E° = -3.04V)",
    "iupacName": "Lithium Galvanic Titan Sovereign",
    "archetype": "CRYSTAL_LATTICE",
    "structuredEffects": [
      {
        "effectId": "B10_EFF_17",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "DEF",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 400 DEF cho toàn thể đồng minh bằng mạng tinh thể."
      }
    ]
  },
  {
    "id": "card_b10_018_bond_enthalpy_protector_18",
    "name": "Hộ Pháp Năng Lượng Liên Kết — Bậc 2",
    "name_en": "Bond Enthalpy Protector — Tier 2",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "PYRO",
    "manaCost": 5,
    "level": 6,
    "atk": 2930,
    "def": 3040,
    "chemicalFormula": "ΔH_bond",
    "effectCode": "ELEM_B10_BOND_ENTHALPY_PROTECTOR_GUARD_18",
    "effectText": "Bảo vệ mạng tinh thể nguyên tố: Tăng 400 DEF cho tất cả quái thú cùng thuộc tính trên sân. Không thể bị tiêu diệt bởi đòn tấn công đầu tiên mỗi lượt.",
    "scientificLore": "Hộ Pháp Năng Lượng Liên Kết đại diện cho giới hạn cực đại của liên kết hóa học (ΔH_rxn = ∑Eb(react) - ∑Eb(prod)), độ cứng tinh thể hoặc khả năng nhường proton mạnh nhất trong tự nhiên theo GDPT 2018.",
    "relatedEquation": "ΔH_rxn = ∑Eb(react) - ∑Eb(prod)",
    "iupacName": "Bond Enthalpy Protector Sovereign",
    "archetype": "CRYSTAL_LATTICE",
    "structuredEffects": [
      {
        "effectId": "B10_EFF_18",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "DEF",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 400 DEF cho toàn thể đồng minh bằng mạng tinh thể."
      }
    ]
  },
  {
    "id": "card_b10_019_dry_ice_sublimation_phantom_19",
    "name": "Bóng Ma Tinh Thể Băng Khô — Bậc 2",
    "name_en": "Dry Ice Sublimation Phantom — Tier 2",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "AERO",
    "manaCost": 6,
    "level": 7,
    "atk": 3210,
    "def": 3320,
    "chemicalFormula": "CO2(s)",
    "effectCode": "ELEM_B10_DRY_ICE_SUBLIMATION_PHANTOM_GUARD_19",
    "effectText": "Bảo vệ mạng tinh thể nguyên tố: Tăng 400 DEF cho tất cả quái thú cùng thuộc tính trên sân. Không thể bị tiêu diệt bởi đòn tấn công đầu tiên mỗi lượt.",
    "scientificLore": "Bóng Ma Tinh Thể Băng Khô đại diện cho giới hạn cực đại của liên kết hóa học (CO₂(s) → CO₂(g) (-78.5°C)), độ cứng tinh thể hoặc khả năng nhường proton mạnh nhất trong tự nhiên theo GDPT 2018.",
    "relatedEquation": "CO₂(s) → CO₂(g) (-78.5°C)",
    "iupacName": "Dry Ice Sublimation Phantom Sovereign",
    "archetype": "CRYSTAL_LATTICE",
    "structuredEffects": [
      {
        "effectId": "B10_EFF_19",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "DEF",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 400 DEF cho toàn thể đồng minh bằng mạng tinh thể."
      }
    ]
  },
  {
    "id": "card_b10_020_kevlar_armor_bastion_20",
    "name": "Vệ Thần Polyme Kevlar Chống Đạn — Bậc 2",
    "name_en": "Kevlar Armor Bastion — Tier 2",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "ULTRA_RARE",
    "attribute": "NOBLE_VOID",
    "manaCost": 7,
    "level": 8,
    "atk": 3490,
    "def": 3600,
    "chemicalFormula": "Aramid",
    "effectCode": "ELEM_B10_KEVLAR_ARMOR_BASTION_GUARD_20",
    "effectText": "Bảo vệ mạng tinh thể nguyên tố: Tăng 400 DEF cho tất cả quái thú cùng thuộc tính trên sân. Không thể bị tiêu diệt bởi đòn tấn công đầu tiên mỗi lượt.",
    "scientificLore": "Vệ Thần Polyme Kevlar Chống Đạn đại diện cho giới hạn cực đại của liên kết hóa học (Interchain Hydrogen Bonding Network), độ cứng tinh thể hoặc khả năng nhường proton mạnh nhất trong tự nhiên theo GDPT 2018.",
    "relatedEquation": "Interchain Hydrogen Bonding Network",
    "iupacName": "Kevlar Armor Bastion Sovereign",
    "archetype": "CRYSTAL_LATTICE",
    "structuredEffects": [
      {
        "effectId": "B10_EFF_20",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "DEF",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 400 DEF cho toàn thể đồng minh bằng mạng tinh thể."
      }
    ]
  },
  {
    "id": "card_b10_021_diamond_lattice_guardian_21",
    "name": "Hộ Vệ Tinh Thể Kim Cương — Bậc 3",
    "name_en": "Diamond Lattice Guardian — Tier 3",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SECRET_RARE",
    "attribute": "NOBLE_VOID",
    "manaCost": 3,
    "level": 4,
    "atk": 2420,
    "def": 2480,
    "chemicalFormula": "C(diamond)",
    "effectCode": "ELEM_B10_DIAMOND_LATTICE_GUARDIAN_GUARD_21",
    "effectText": "Bảo vệ mạng tinh thể nguyên tố: Tăng 400 DEF cho tất cả quái thú cùng thuộc tính trên sân. Không thể bị tiêu diệt bởi đòn tấn công đầu tiên mỗi lượt.",
    "scientificLore": "Hộ Vệ Tinh Thể Kim Cương đại diện cho giới hạn cực đại của liên kết hóa học (Giant Covalent 3D Network), độ cứng tinh thể hoặc khả năng nhường proton mạnh nhất trong tự nhiên theo GDPT 2018.",
    "relatedEquation": "Giant Covalent 3D Network",
    "iupacName": "Diamond Lattice Guardian Sovereign",
    "archetype": "CRYSTAL_LATTICE",
    "structuredEffects": [
      {
        "effectId": "B10_EFF_21",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "DEF",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 400 DEF cho toàn thể đồng minh bằng mạng tinh thể."
      }
    ]
  },
  {
    "id": "card_b10_022_fluoroantimonic_superacid_sovereign_22",
    "name": "Chúa Tể Siêu Axit Fluoroantimonic — Bậc 3",
    "name_en": "Fluoroantimonic Superacid Sovereign — Tier 3",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "ACID_DARK",
    "manaCost": 4,
    "level": 5,
    "atk": 2700,
    "def": 2760,
    "chemicalFormula": "HSbF6",
    "effectCode": "ELEM_B10_FLUOROANTIMONIC_SUPERACID_SOVEREIGN_GUARD_22",
    "effectText": "Bảo vệ mạng tinh thể nguyên tố: Tăng 400 DEF cho tất cả quái thú cùng thuộc tính trên sân. Không thể bị tiêu diệt bởi đòn tấn công đầu tiên mỗi lượt.",
    "scientificLore": "Chúa Tể Siêu Axit Fluoroantimonic đại diện cho giới hạn cực đại của liên kết hóa học (HF + SbF₅ ⇌ H₂F⁺ + SbF₆⁻ (H₀ = -31.3)), độ cứng tinh thể hoặc khả năng nhường proton mạnh nhất trong tự nhiên theo GDPT 2018.",
    "relatedEquation": "HF + SbF₅ ⇌ H₂F⁺ + SbF₆⁻ (H₀ = -31.3)",
    "iupacName": "Fluoroantimonic Superacid Sovereign Sovereign",
    "archetype": "SUPERACID_EXTREME",
    "structuredEffects": [
      {
        "effectId": "B10_EFF_22",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "DEF",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 400 DEF cho toàn thể đồng minh bằng mạng tinh thể."
      }
    ]
  },
  {
    "id": "card_b10_023_halite_crystal_knight_23",
    "name": "Kỵ Sĩ Mạng Tinh Thể Muối Ăn — Bậc 3",
    "name_en": "Halite Crystal Knight — Tier 3",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "TERRA",
    "manaCost": 5,
    "level": 6,
    "atk": 2980,
    "def": 3040,
    "chemicalFormula": "NaCl(s)",
    "effectCode": "ELEM_B10_HALITE_CRYSTAL_KNIGHT_GUARD_23",
    "effectText": "Bảo vệ mạng tinh thể nguyên tố: Tăng 400 DEF cho tất cả quái thú cùng thuộc tính trên sân. Không thể bị tiêu diệt bởi đòn tấn công đầu tiên mỗi lượt.",
    "scientificLore": "Kỵ Sĩ Mạng Tinh Thể Muối Ăn đại diện cho giới hạn cực đại của liên kết hóa học (Na⁺(fcc) + Cl⁻(fcc) Lattice), độ cứng tinh thể hoặc khả năng nhường proton mạnh nhất trong tự nhiên theo GDPT 2018.",
    "relatedEquation": "Na⁺(fcc) + Cl⁻(fcc) Lattice",
    "iupacName": "Halite Crystal Knight Sovereign",
    "archetype": "CRYSTAL_LATTICE",
    "structuredEffects": [
      {
        "effectId": "B10_EFF_23",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "DEF",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 400 DEF cho toàn thể đồng minh bằng mạng tinh thể."
      }
    ]
  },
  {
    "id": "card_b10_024_magnesium_flare_king_24",
    "name": "Vua Lửa Magie Pháo Sáng — Bậc 3",
    "name_en": "Magnesium Flare King — Tier 3",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "PYRO",
    "manaCost": 6,
    "level": 7,
    "atk": 3260,
    "def": 3320,
    "chemicalFormula": "MgO(s)",
    "effectCode": "ELEM_B10_MAGNESIUM_FLARE_KING_GUARD_24",
    "effectText": "Bảo vệ mạng tinh thể nguyên tố: Tăng 400 DEF cho tất cả quái thú cùng thuộc tính trên sân. Không thể bị tiêu diệt bởi đòn tấn công đầu tiên mỗi lượt.",
    "scientificLore": "Vua Lửa Magie Pháo Sáng đại diện cho giới hạn cực đại của liên kết hóa học (2Mg + O₂ → 2MgO + 1204 kJ), độ cứng tinh thể hoặc khả năng nhường proton mạnh nhất trong tự nhiên theo GDPT 2018.",
    "relatedEquation": "2Mg + O₂ → 2MgO + 1204 kJ",
    "iupacName": "Magnesium Flare King Sovereign",
    "archetype": "SUPERACID_EXTREME",
    "structuredEffects": [
      {
        "effectId": "B10_EFF_24",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "DEF",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 400 DEF cho toàn thể đồng minh bằng mạng tinh thể."
      }
    ]
  },
  {
    "id": "card_b10_025_hydrolysis_dragon_king_25",
    "name": "Long Vương Thủy Phân Điện Phân — Bậc 3",
    "name_en": "Hydrolysis Dragon King — Tier 3",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "AQUA",
    "manaCost": 7,
    "level": 8,
    "atk": 3340,
    "def": 3600,
    "chemicalFormula": "2H2O",
    "effectCode": "ELEM_B10_HYDROLYSIS_DRAGON_KING_GUARD_25",
    "effectText": "Bảo vệ mạng tinh thể nguyên tố: Tăng 400 DEF cho tất cả quái thú cùng thuộc tính trên sân. Không thể bị tiêu diệt bởi đòn tấn công đầu tiên mỗi lượt.",
    "scientificLore": "Long Vương Thủy Phân Điện Phân đại diện cho giới hạn cực đại của liên kết hóa học (2H₂O --electrolysis--> 2H₂ + O₂), độ cứng tinh thể hoặc khả năng nhường proton mạnh nhất trong tự nhiên theo GDPT 2018.",
    "relatedEquation": "2H₂O --electrolysis--> 2H₂ + O₂",
    "iupacName": "Hydrolysis Dragon King Sovereign",
    "archetype": "CRYSTAL_LATTICE",
    "structuredEffects": [
      {
        "effectId": "B10_EFF_25",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "DEF",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 400 DEF cho toàn thể đồng minh bằng mạng tinh thể."
      }
    ]
  },
  {
    "id": "card_b10_026_halogen_storm_supreme_26",
    "name": "Bão Tố Khí Halogen Cực Đại — Bậc 3",
    "name_en": "Halogen Storm Supreme — Tier 3",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "AERO",
    "manaCost": 3,
    "level": 4,
    "atk": 2470,
    "def": 2480,
    "chemicalFormula": "Cl2/Br2/I2",
    "effectCode": "ELEM_B10_HALOGEN_STORM_SUPREME_GUARD_26",
    "effectText": "Bảo vệ mạng tinh thể nguyên tố: Tăng 400 DEF cho tất cả quái thú cùng thuộc tính trên sân. Không thể bị tiêu diệt bởi đòn tấn công đầu tiên mỗi lượt.",
    "scientificLore": "Bão Tố Khí Halogen Cực Đại đại diện cho giới hạn cực đại của liên kết hóa học (Electronegativity Cascade), độ cứng tinh thể hoặc khả năng nhường proton mạnh nhất trong tự nhiên theo GDPT 2018.",
    "relatedEquation": "Electronegativity Cascade",
    "iupacName": "Halogen Storm Supreme Sovereign",
    "archetype": "CRYSTAL_LATTICE",
    "structuredEffects": [
      {
        "effectId": "B10_EFF_26",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "DEF",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 400 DEF cho toàn thể đồng minh bằng mạng tinh thể."
      }
    ]
  },
  {
    "id": "card_b10_027_lithium_galvanic_titan_27",
    "name": "Thần Sấm Pin Galvanic Lithium — Bậc 3",
    "name_en": "Lithium Galvanic Titan — Tier 3",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "ELECTRO",
    "manaCost": 4,
    "level": 5,
    "atk": 2750,
    "def": 2760,
    "chemicalFormula": "Li/Li+",
    "effectCode": "ELEM_B10_LITHIUM_GALVANIC_TITAN_GUARD_27",
    "effectText": "Bảo vệ mạng tinh thể nguyên tố: Tăng 400 DEF cho tất cả quái thú cùng thuộc tính trên sân. Không thể bị tiêu diệt bởi đòn tấn công đầu tiên mỗi lượt.",
    "scientificLore": "Thần Sấm Pin Galvanic Lithium đại diện cho giới hạn cực đại của liên kết hóa học (Li → Li⁺ + e⁻ (E° = -3.04V)), độ cứng tinh thể hoặc khả năng nhường proton mạnh nhất trong tự nhiên theo GDPT 2018.",
    "relatedEquation": "Li → Li⁺ + e⁻ (E° = -3.04V)",
    "iupacName": "Lithium Galvanic Titan Sovereign",
    "archetype": "CRYSTAL_LATTICE",
    "structuredEffects": [
      {
        "effectId": "B10_EFF_27",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "DEF",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 400 DEF cho toàn thể đồng minh bằng mạng tinh thể."
      }
    ]
  },
  {
    "id": "card_b10_028_bond_enthalpy_protector_28",
    "name": "Hộ Pháp Năng Lượng Liên Kết — Bậc 3",
    "name_en": "Bond Enthalpy Protector — Tier 3",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "PYRO",
    "manaCost": 5,
    "level": 6,
    "atk": 3030,
    "def": 3040,
    "chemicalFormula": "ΔH_bond",
    "effectCode": "ELEM_B10_BOND_ENTHALPY_PROTECTOR_GUARD_28",
    "effectText": "Bảo vệ mạng tinh thể nguyên tố: Tăng 400 DEF cho tất cả quái thú cùng thuộc tính trên sân. Không thể bị tiêu diệt bởi đòn tấn công đầu tiên mỗi lượt.",
    "scientificLore": "Hộ Pháp Năng Lượng Liên Kết đại diện cho giới hạn cực đại của liên kết hóa học (ΔH_rxn = ∑Eb(react) - ∑Eb(prod)), độ cứng tinh thể hoặc khả năng nhường proton mạnh nhất trong tự nhiên theo GDPT 2018.",
    "relatedEquation": "ΔH_rxn = ∑Eb(react) - ∑Eb(prod)",
    "iupacName": "Bond Enthalpy Protector Sovereign",
    "archetype": "CRYSTAL_LATTICE",
    "structuredEffects": [
      {
        "effectId": "B10_EFF_28",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "DEF",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 400 DEF cho toàn thể đồng minh bằng mạng tinh thể."
      }
    ]
  },
  {
    "id": "card_b10_029_dry_ice_sublimation_phantom_29",
    "name": "Bóng Ma Tinh Thể Băng Khô — Bậc 3",
    "name_en": "Dry Ice Sublimation Phantom — Tier 3",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "ULTRA_RARE",
    "attribute": "AERO",
    "manaCost": 6,
    "level": 7,
    "atk": 3110,
    "def": 3320,
    "chemicalFormula": "CO2(s)",
    "effectCode": "ELEM_B10_DRY_ICE_SUBLIMATION_PHANTOM_GUARD_29",
    "effectText": "Bảo vệ mạng tinh thể nguyên tố: Tăng 400 DEF cho tất cả quái thú cùng thuộc tính trên sân. Không thể bị tiêu diệt bởi đòn tấn công đầu tiên mỗi lượt.",
    "scientificLore": "Bóng Ma Tinh Thể Băng Khô đại diện cho giới hạn cực đại của liên kết hóa học (CO₂(s) → CO₂(g) (-78.5°C)), độ cứng tinh thể hoặc khả năng nhường proton mạnh nhất trong tự nhiên theo GDPT 2018.",
    "relatedEquation": "CO₂(s) → CO₂(g) (-78.5°C)",
    "iupacName": "Dry Ice Sublimation Phantom Sovereign",
    "archetype": "CRYSTAL_LATTICE",
    "structuredEffects": [
      {
        "effectId": "B10_EFF_29",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "DEF",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 400 DEF cho toàn thể đồng minh bằng mạng tinh thể."
      }
    ]
  },
  {
    "id": "card_b10_030_kevlar_armor_bastion_30",
    "name": "Vệ Thần Polyme Kevlar Chống Đạn — Bậc 3",
    "name_en": "Kevlar Armor Bastion — Tier 3",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SECRET_RARE",
    "attribute": "NOBLE_VOID",
    "manaCost": 7,
    "level": 8,
    "atk": 3390,
    "def": 3600,
    "chemicalFormula": "Aramid",
    "effectCode": "ELEM_B10_KEVLAR_ARMOR_BASTION_GUARD_30",
    "effectText": "Bảo vệ mạng tinh thể nguyên tố: Tăng 400 DEF cho tất cả quái thú cùng thuộc tính trên sân. Không thể bị tiêu diệt bởi đòn tấn công đầu tiên mỗi lượt.",
    "scientificLore": "Vệ Thần Polyme Kevlar Chống Đạn đại diện cho giới hạn cực đại của liên kết hóa học (Interchain Hydrogen Bonding Network), độ cứng tinh thể hoặc khả năng nhường proton mạnh nhất trong tự nhiên theo GDPT 2018.",
    "relatedEquation": "Interchain Hydrogen Bonding Network",
    "iupacName": "Kevlar Armor Bastion Sovereign",
    "archetype": "CRYSTAL_LATTICE",
    "structuredEffects": [
      {
        "effectId": "B10_EFF_30",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "DEF",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 400 DEF cho toàn thể đồng minh bằng mạng tinh thể."
      }
    ]
  },
  {
    "id": "card_b10_031_diamond_lattice_guardian_31",
    "name": "Hộ Vệ Tinh Thể Kim Cương — Bậc 4",
    "name_en": "Diamond Lattice Guardian — Tier 4",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "NOBLE_VOID",
    "manaCost": 3,
    "level": 4,
    "atk": 2520,
    "def": 2480,
    "chemicalFormula": "C(diamond)",
    "effectCode": "ELEM_B10_DIAMOND_LATTICE_GUARDIAN_GUARD_31",
    "effectText": "Bảo vệ mạng tinh thể nguyên tố: Tăng 400 DEF cho tất cả quái thú cùng thuộc tính trên sân. Không thể bị tiêu diệt bởi đòn tấn công đầu tiên mỗi lượt.",
    "scientificLore": "Hộ Vệ Tinh Thể Kim Cương đại diện cho giới hạn cực đại của liên kết hóa học (Giant Covalent 3D Network), độ cứng tinh thể hoặc khả năng nhường proton mạnh nhất trong tự nhiên theo GDPT 2018.",
    "relatedEquation": "Giant Covalent 3D Network",
    "iupacName": "Diamond Lattice Guardian Sovereign",
    "archetype": "CRYSTAL_LATTICE",
    "structuredEffects": [
      {
        "effectId": "B10_EFF_31",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "DEF",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 400 DEF cho toàn thể đồng minh bằng mạng tinh thể."
      }
    ]
  },
  {
    "id": "card_b10_032_fluoroantimonic_superacid_sovereign_32",
    "name": "Chúa Tể Siêu Axit Fluoroantimonic — Bậc 4",
    "name_en": "Fluoroantimonic Superacid Sovereign — Tier 4",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "ACID_DARK",
    "manaCost": 4,
    "level": 5,
    "atk": 2800,
    "def": 2760,
    "chemicalFormula": "HSbF6",
    "effectCode": "ELEM_B10_FLUOROANTIMONIC_SUPERACID_SOVEREIGN_GUARD_32",
    "effectText": "Bảo vệ mạng tinh thể nguyên tố: Tăng 400 DEF cho tất cả quái thú cùng thuộc tính trên sân. Không thể bị tiêu diệt bởi đòn tấn công đầu tiên mỗi lượt.",
    "scientificLore": "Chúa Tể Siêu Axit Fluoroantimonic đại diện cho giới hạn cực đại của liên kết hóa học (HF + SbF₅ ⇌ H₂F⁺ + SbF₆⁻ (H₀ = -31.3)), độ cứng tinh thể hoặc khả năng nhường proton mạnh nhất trong tự nhiên theo GDPT 2018.",
    "relatedEquation": "HF + SbF₅ ⇌ H₂F⁺ + SbF₆⁻ (H₀ = -31.3)",
    "iupacName": "Fluoroantimonic Superacid Sovereign Sovereign",
    "archetype": "SUPERACID_EXTREME",
    "structuredEffects": [
      {
        "effectId": "B10_EFF_32",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "DEF",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 400 DEF cho toàn thể đồng minh bằng mạng tinh thể."
      }
    ]
  },
  {
    "id": "card_b10_033_halite_crystal_knight_33",
    "name": "Kỵ Sĩ Mạng Tinh Thể Muối Ăn — Bậc 4",
    "name_en": "Halite Crystal Knight — Tier 4",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "TERRA",
    "manaCost": 5,
    "level": 6,
    "atk": 2880,
    "def": 3040,
    "chemicalFormula": "NaCl(s)",
    "effectCode": "ELEM_B10_HALITE_CRYSTAL_KNIGHT_GUARD_33",
    "effectText": "Bảo vệ mạng tinh thể nguyên tố: Tăng 400 DEF cho tất cả quái thú cùng thuộc tính trên sân. Không thể bị tiêu diệt bởi đòn tấn công đầu tiên mỗi lượt.",
    "scientificLore": "Kỵ Sĩ Mạng Tinh Thể Muối Ăn đại diện cho giới hạn cực đại của liên kết hóa học (Na⁺(fcc) + Cl⁻(fcc) Lattice), độ cứng tinh thể hoặc khả năng nhường proton mạnh nhất trong tự nhiên theo GDPT 2018.",
    "relatedEquation": "Na⁺(fcc) + Cl⁻(fcc) Lattice",
    "iupacName": "Halite Crystal Knight Sovereign",
    "archetype": "CRYSTAL_LATTICE",
    "structuredEffects": [
      {
        "effectId": "B10_EFF_33",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "DEF",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 400 DEF cho toàn thể đồng minh bằng mạng tinh thể."
      }
    ]
  },
  {
    "id": "card_b10_034_magnesium_flare_king_34",
    "name": "Vua Lửa Magie Pháo Sáng — Bậc 4",
    "name_en": "Magnesium Flare King — Tier 4",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "PYRO",
    "manaCost": 6,
    "level": 7,
    "atk": 3160,
    "def": 3320,
    "chemicalFormula": "MgO(s)",
    "effectCode": "ELEM_B10_MAGNESIUM_FLARE_KING_GUARD_34",
    "effectText": "Bảo vệ mạng tinh thể nguyên tố: Tăng 400 DEF cho tất cả quái thú cùng thuộc tính trên sân. Không thể bị tiêu diệt bởi đòn tấn công đầu tiên mỗi lượt.",
    "scientificLore": "Vua Lửa Magie Pháo Sáng đại diện cho giới hạn cực đại của liên kết hóa học (2Mg + O₂ → 2MgO + 1204 kJ), độ cứng tinh thể hoặc khả năng nhường proton mạnh nhất trong tự nhiên theo GDPT 2018.",
    "relatedEquation": "2Mg + O₂ → 2MgO + 1204 kJ",
    "iupacName": "Magnesium Flare King Sovereign",
    "archetype": "SUPERACID_EXTREME",
    "structuredEffects": [
      {
        "effectId": "B10_EFF_34",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "DEF",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 400 DEF cho toàn thể đồng minh bằng mạng tinh thể."
      }
    ]
  },
  {
    "id": "card_b10_035_hydrolysis_dragon_king_35",
    "name": "Long Vương Thủy Phân Điện Phân — Bậc 4",
    "name_en": "Hydrolysis Dragon King — Tier 4",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "AQUA",
    "manaCost": 7,
    "level": 8,
    "atk": 3440,
    "def": 3600,
    "chemicalFormula": "2H2O",
    "effectCode": "ELEM_B10_HYDROLYSIS_DRAGON_KING_GUARD_35",
    "effectText": "Bảo vệ mạng tinh thể nguyên tố: Tăng 400 DEF cho tất cả quái thú cùng thuộc tính trên sân. Không thể bị tiêu diệt bởi đòn tấn công đầu tiên mỗi lượt.",
    "scientificLore": "Long Vương Thủy Phân Điện Phân đại diện cho giới hạn cực đại của liên kết hóa học (2H₂O --electrolysis--> 2H₂ + O₂), độ cứng tinh thể hoặc khả năng nhường proton mạnh nhất trong tự nhiên theo GDPT 2018.",
    "relatedEquation": "2H₂O --electrolysis--> 2H₂ + O₂",
    "iupacName": "Hydrolysis Dragon King Sovereign",
    "archetype": "CRYSTAL_LATTICE",
    "structuredEffects": [
      {
        "effectId": "B10_EFF_35",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "DEF",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 400 DEF cho toàn thể đồng minh bằng mạng tinh thể."
      }
    ]
  },
  {
    "id": "card_b10_036_halogen_storm_supreme_36",
    "name": "Bão Tố Khí Halogen Cực Đại — Bậc 4",
    "name_en": "Halogen Storm Supreme — Tier 4",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "AERO",
    "manaCost": 3,
    "level": 4,
    "atk": 2570,
    "def": 2480,
    "chemicalFormula": "Cl2/Br2/I2",
    "effectCode": "ELEM_B10_HALOGEN_STORM_SUPREME_GUARD_36",
    "effectText": "Bảo vệ mạng tinh thể nguyên tố: Tăng 400 DEF cho tất cả quái thú cùng thuộc tính trên sân. Không thể bị tiêu diệt bởi đòn tấn công đầu tiên mỗi lượt.",
    "scientificLore": "Bão Tố Khí Halogen Cực Đại đại diện cho giới hạn cực đại của liên kết hóa học (Electronegativity Cascade), độ cứng tinh thể hoặc khả năng nhường proton mạnh nhất trong tự nhiên theo GDPT 2018.",
    "relatedEquation": "Electronegativity Cascade",
    "iupacName": "Halogen Storm Supreme Sovereign",
    "archetype": "CRYSTAL_LATTICE",
    "structuredEffects": [
      {
        "effectId": "B10_EFF_36",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "DEF",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 400 DEF cho toàn thể đồng minh bằng mạng tinh thể."
      }
    ]
  },
  {
    "id": "card_b10_037_lithium_galvanic_titan_37",
    "name": "Thần Sấm Pin Galvanic Lithium — Bậc 4",
    "name_en": "Lithium Galvanic Titan — Tier 4",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "ELECTRO",
    "manaCost": 4,
    "level": 5,
    "atk": 2650,
    "def": 2760,
    "chemicalFormula": "Li/Li+",
    "effectCode": "ELEM_B10_LITHIUM_GALVANIC_TITAN_GUARD_37",
    "effectText": "Bảo vệ mạng tinh thể nguyên tố: Tăng 400 DEF cho tất cả quái thú cùng thuộc tính trên sân. Không thể bị tiêu diệt bởi đòn tấn công đầu tiên mỗi lượt.",
    "scientificLore": "Thần Sấm Pin Galvanic Lithium đại diện cho giới hạn cực đại của liên kết hóa học (Li → Li⁺ + e⁻ (E° = -3.04V)), độ cứng tinh thể hoặc khả năng nhường proton mạnh nhất trong tự nhiên theo GDPT 2018.",
    "relatedEquation": "Li → Li⁺ + e⁻ (E° = -3.04V)",
    "iupacName": "Lithium Galvanic Titan Sovereign",
    "archetype": "CRYSTAL_LATTICE",
    "structuredEffects": [
      {
        "effectId": "B10_EFF_37",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "DEF",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 400 DEF cho toàn thể đồng minh bằng mạng tinh thể."
      }
    ]
  },
  {
    "id": "card_b10_038_bond_enthalpy_protector_38",
    "name": "Hộ Pháp Năng Lượng Liên Kết — Bậc 4",
    "name_en": "Bond Enthalpy Protector — Tier 4",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "ULTRA_RARE",
    "attribute": "PYRO",
    "manaCost": 5,
    "level": 6,
    "atk": 2930,
    "def": 3040,
    "chemicalFormula": "ΔH_bond",
    "effectCode": "ELEM_B10_BOND_ENTHALPY_PROTECTOR_GUARD_38",
    "effectText": "Bảo vệ mạng tinh thể nguyên tố: Tăng 400 DEF cho tất cả quái thú cùng thuộc tính trên sân. Không thể bị tiêu diệt bởi đòn tấn công đầu tiên mỗi lượt.",
    "scientificLore": "Hộ Pháp Năng Lượng Liên Kết đại diện cho giới hạn cực đại của liên kết hóa học (ΔH_rxn = ∑Eb(react) - ∑Eb(prod)), độ cứng tinh thể hoặc khả năng nhường proton mạnh nhất trong tự nhiên theo GDPT 2018.",
    "relatedEquation": "ΔH_rxn = ∑Eb(react) - ∑Eb(prod)",
    "iupacName": "Bond Enthalpy Protector Sovereign",
    "archetype": "CRYSTAL_LATTICE",
    "structuredEffects": [
      {
        "effectId": "B10_EFF_38",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "DEF",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 400 DEF cho toàn thể đồng minh bằng mạng tinh thể."
      }
    ]
  },
  {
    "id": "card_b10_039_dry_ice_sublimation_phantom_39",
    "name": "Bóng Ma Tinh Thể Băng Khô — Bậc 4",
    "name_en": "Dry Ice Sublimation Phantom — Tier 4",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SECRET_RARE",
    "attribute": "AERO",
    "manaCost": 6,
    "level": 7,
    "atk": 3210,
    "def": 3320,
    "chemicalFormula": "CO2(s)",
    "effectCode": "ELEM_B10_DRY_ICE_SUBLIMATION_PHANTOM_GUARD_39",
    "effectText": "Bảo vệ mạng tinh thể nguyên tố: Tăng 400 DEF cho tất cả quái thú cùng thuộc tính trên sân. Không thể bị tiêu diệt bởi đòn tấn công đầu tiên mỗi lượt.",
    "scientificLore": "Bóng Ma Tinh Thể Băng Khô đại diện cho giới hạn cực đại của liên kết hóa học (CO₂(s) → CO₂(g) (-78.5°C)), độ cứng tinh thể hoặc khả năng nhường proton mạnh nhất trong tự nhiên theo GDPT 2018.",
    "relatedEquation": "CO₂(s) → CO₂(g) (-78.5°C)",
    "iupacName": "Dry Ice Sublimation Phantom Sovereign",
    "archetype": "CRYSTAL_LATTICE",
    "structuredEffects": [
      {
        "effectId": "B10_EFF_39",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "DEF",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 400 DEF cho toàn thể đồng minh bằng mạng tinh thể."
      }
    ]
  },
  {
    "id": "card_b10_040_kevlar_armor_bastion_40",
    "name": "Vệ Thần Polyme Kevlar Chống Đạn — Bậc 4",
    "name_en": "Kevlar Armor Bastion — Tier 4",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "NOBLE_VOID",
    "manaCost": 7,
    "level": 8,
    "atk": 3490,
    "def": 3600,
    "chemicalFormula": "Aramid",
    "effectCode": "ELEM_B10_KEVLAR_ARMOR_BASTION_GUARD_40",
    "effectText": "Bảo vệ mạng tinh thể nguyên tố: Tăng 400 DEF cho tất cả quái thú cùng thuộc tính trên sân. Không thể bị tiêu diệt bởi đòn tấn công đầu tiên mỗi lượt.",
    "scientificLore": "Vệ Thần Polyme Kevlar Chống Đạn đại diện cho giới hạn cực đại của liên kết hóa học (Interchain Hydrogen Bonding Network), độ cứng tinh thể hoặc khả năng nhường proton mạnh nhất trong tự nhiên theo GDPT 2018.",
    "relatedEquation": "Interchain Hydrogen Bonding Network",
    "iupacName": "Kevlar Armor Bastion Sovereign",
    "archetype": "CRYSTAL_LATTICE",
    "structuredEffects": [
      {
        "effectId": "B10_EFF_40",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "DEF",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 400 DEF cho toàn thể đồng minh bằng mạng tinh thể."
      }
    ]
  },
  {
    "id": "card_b10_041_diamond_lattice_guardian_41",
    "name": "Hộ Vệ Tinh Thể Kim Cương — Bậc 5",
    "name_en": "Diamond Lattice Guardian — Tier 5",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "NOBLE_VOID",
    "manaCost": 3,
    "level": 4,
    "atk": 2420,
    "def": 2480,
    "chemicalFormula": "C(diamond)",
    "effectCode": "ELEM_B10_DIAMOND_LATTICE_GUARDIAN_GUARD_41",
    "effectText": "Bảo vệ mạng tinh thể nguyên tố: Tăng 400 DEF cho tất cả quái thú cùng thuộc tính trên sân. Không thể bị tiêu diệt bởi đòn tấn công đầu tiên mỗi lượt.",
    "scientificLore": "Hộ Vệ Tinh Thể Kim Cương đại diện cho giới hạn cực đại của liên kết hóa học (Giant Covalent 3D Network), độ cứng tinh thể hoặc khả năng nhường proton mạnh nhất trong tự nhiên theo GDPT 2018.",
    "relatedEquation": "Giant Covalent 3D Network",
    "iupacName": "Diamond Lattice Guardian Sovereign",
    "archetype": "CRYSTAL_LATTICE",
    "structuredEffects": [
      {
        "effectId": "B10_EFF_41",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "DEF",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 400 DEF cho toàn thể đồng minh bằng mạng tinh thể."
      }
    ]
  },
  {
    "id": "card_b10_042_fluoroantimonic_superacid_sovereign_42",
    "name": "Chúa Tể Siêu Axit Fluoroantimonic — Bậc 5",
    "name_en": "Fluoroantimonic Superacid Sovereign — Tier 5",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "ACID_DARK",
    "manaCost": 4,
    "level": 5,
    "atk": 2700,
    "def": 2760,
    "chemicalFormula": "HSbF6",
    "effectCode": "ELEM_B10_FLUOROANTIMONIC_SUPERACID_SOVEREIGN_GUARD_42",
    "effectText": "Bảo vệ mạng tinh thể nguyên tố: Tăng 400 DEF cho tất cả quái thú cùng thuộc tính trên sân. Không thể bị tiêu diệt bởi đòn tấn công đầu tiên mỗi lượt.",
    "scientificLore": "Chúa Tể Siêu Axit Fluoroantimonic đại diện cho giới hạn cực đại của liên kết hóa học (HF + SbF₅ ⇌ H₂F⁺ + SbF₆⁻ (H₀ = -31.3)), độ cứng tinh thể hoặc khả năng nhường proton mạnh nhất trong tự nhiên theo GDPT 2018.",
    "relatedEquation": "HF + SbF₅ ⇌ H₂F⁺ + SbF₆⁻ (H₀ = -31.3)",
    "iupacName": "Fluoroantimonic Superacid Sovereign Sovereign",
    "archetype": "SUPERACID_EXTREME",
    "structuredEffects": [
      {
        "effectId": "B10_EFF_42",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "DEF",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 400 DEF cho toàn thể đồng minh bằng mạng tinh thể."
      }
    ]
  },
  {
    "id": "card_b10_043_halite_crystal_knight_43",
    "name": "Kỵ Sĩ Mạng Tinh Thể Muối Ăn — Bậc 5",
    "name_en": "Halite Crystal Knight — Tier 5",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "TERRA",
    "manaCost": 5,
    "level": 6,
    "atk": 2980,
    "def": 3040,
    "chemicalFormula": "NaCl(s)",
    "effectCode": "ELEM_B10_HALITE_CRYSTAL_KNIGHT_GUARD_43",
    "effectText": "Bảo vệ mạng tinh thể nguyên tố: Tăng 400 DEF cho tất cả quái thú cùng thuộc tính trên sân. Không thể bị tiêu diệt bởi đòn tấn công đầu tiên mỗi lượt.",
    "scientificLore": "Kỵ Sĩ Mạng Tinh Thể Muối Ăn đại diện cho giới hạn cực đại của liên kết hóa học (Na⁺(fcc) + Cl⁻(fcc) Lattice), độ cứng tinh thể hoặc khả năng nhường proton mạnh nhất trong tự nhiên theo GDPT 2018.",
    "relatedEquation": "Na⁺(fcc) + Cl⁻(fcc) Lattice",
    "iupacName": "Halite Crystal Knight Sovereign",
    "archetype": "CRYSTAL_LATTICE",
    "structuredEffects": [
      {
        "effectId": "B10_EFF_43",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "DEF",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 400 DEF cho toàn thể đồng minh bằng mạng tinh thể."
      }
    ]
  },
  {
    "id": "card_b10_044_magnesium_flare_king_44",
    "name": "Vua Lửa Magie Pháo Sáng — Bậc 5",
    "name_en": "Magnesium Flare King — Tier 5",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "PYRO",
    "manaCost": 6,
    "level": 7,
    "atk": 3260,
    "def": 3320,
    "chemicalFormula": "MgO(s)",
    "effectCode": "ELEM_B10_MAGNESIUM_FLARE_KING_GUARD_44",
    "effectText": "Bảo vệ mạng tinh thể nguyên tố: Tăng 400 DEF cho tất cả quái thú cùng thuộc tính trên sân. Không thể bị tiêu diệt bởi đòn tấn công đầu tiên mỗi lượt.",
    "scientificLore": "Vua Lửa Magie Pháo Sáng đại diện cho giới hạn cực đại của liên kết hóa học (2Mg + O₂ → 2MgO + 1204 kJ), độ cứng tinh thể hoặc khả năng nhường proton mạnh nhất trong tự nhiên theo GDPT 2018.",
    "relatedEquation": "2Mg + O₂ → 2MgO + 1204 kJ",
    "iupacName": "Magnesium Flare King Sovereign",
    "archetype": "SUPERACID_EXTREME",
    "structuredEffects": [
      {
        "effectId": "B10_EFF_44",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "DEF",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 400 DEF cho toàn thể đồng minh bằng mạng tinh thể."
      }
    ]
  },
  {
    "id": "card_b10_045_hydrolysis_dragon_king_45",
    "name": "Long Vương Thủy Phân Điện Phân — Bậc 5",
    "name_en": "Hydrolysis Dragon King — Tier 5",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "AQUA",
    "manaCost": 7,
    "level": 8,
    "atk": 3340,
    "def": 3600,
    "chemicalFormula": "2H2O",
    "effectCode": "ELEM_B10_HYDROLYSIS_DRAGON_KING_GUARD_45",
    "effectText": "Bảo vệ mạng tinh thể nguyên tố: Tăng 400 DEF cho tất cả quái thú cùng thuộc tính trên sân. Không thể bị tiêu diệt bởi đòn tấn công đầu tiên mỗi lượt.",
    "scientificLore": "Long Vương Thủy Phân Điện Phân đại diện cho giới hạn cực đại của liên kết hóa học (2H₂O --electrolysis--> 2H₂ + O₂), độ cứng tinh thể hoặc khả năng nhường proton mạnh nhất trong tự nhiên theo GDPT 2018.",
    "relatedEquation": "2H₂O --electrolysis--> 2H₂ + O₂",
    "iupacName": "Hydrolysis Dragon King Sovereign",
    "archetype": "CRYSTAL_LATTICE",
    "structuredEffects": [
      {
        "effectId": "B10_EFF_45",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "DEF",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 400 DEF cho toàn thể đồng minh bằng mạng tinh thể."
      }
    ]
  },
  {
    "id": "card_b10_046_halogen_storm_supreme_46",
    "name": "Bão Tố Khí Halogen Cực Đại — Bậc 5",
    "name_en": "Halogen Storm Supreme — Tier 5",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "AERO",
    "manaCost": 3,
    "level": 4,
    "atk": 2470,
    "def": 2480,
    "chemicalFormula": "Cl2/Br2/I2",
    "effectCode": "ELEM_B10_HALOGEN_STORM_SUPREME_GUARD_46",
    "effectText": "Bảo vệ mạng tinh thể nguyên tố: Tăng 400 DEF cho tất cả quái thú cùng thuộc tính trên sân. Không thể bị tiêu diệt bởi đòn tấn công đầu tiên mỗi lượt.",
    "scientificLore": "Bão Tố Khí Halogen Cực Đại đại diện cho giới hạn cực đại của liên kết hóa học (Electronegativity Cascade), độ cứng tinh thể hoặc khả năng nhường proton mạnh nhất trong tự nhiên theo GDPT 2018.",
    "relatedEquation": "Electronegativity Cascade",
    "iupacName": "Halogen Storm Supreme Sovereign",
    "archetype": "CRYSTAL_LATTICE",
    "structuredEffects": [
      {
        "effectId": "B10_EFF_46",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "DEF",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 400 DEF cho toàn thể đồng minh bằng mạng tinh thể."
      }
    ]
  },
  {
    "id": "card_b10_047_lithium_galvanic_titan_47",
    "name": "Thần Sấm Pin Galvanic Lithium — Bậc 5",
    "name_en": "Lithium Galvanic Titan — Tier 5",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "ULTRA_RARE",
    "attribute": "ELECTRO",
    "manaCost": 4,
    "level": 5,
    "atk": 2750,
    "def": 2760,
    "chemicalFormula": "Li/Li+",
    "effectCode": "ELEM_B10_LITHIUM_GALVANIC_TITAN_GUARD_47",
    "effectText": "Bảo vệ mạng tinh thể nguyên tố: Tăng 400 DEF cho tất cả quái thú cùng thuộc tính trên sân. Không thể bị tiêu diệt bởi đòn tấn công đầu tiên mỗi lượt.",
    "scientificLore": "Thần Sấm Pin Galvanic Lithium đại diện cho giới hạn cực đại của liên kết hóa học (Li → Li⁺ + e⁻ (E° = -3.04V)), độ cứng tinh thể hoặc khả năng nhường proton mạnh nhất trong tự nhiên theo GDPT 2018.",
    "relatedEquation": "Li → Li⁺ + e⁻ (E° = -3.04V)",
    "iupacName": "Lithium Galvanic Titan Sovereign",
    "archetype": "CRYSTAL_LATTICE",
    "structuredEffects": [
      {
        "effectId": "B10_EFF_47",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "DEF",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 400 DEF cho toàn thể đồng minh bằng mạng tinh thể."
      }
    ]
  },
  {
    "id": "card_b10_048_bond_enthalpy_protector_48",
    "name": "Hộ Pháp Năng Lượng Liên Kết — Bậc 5",
    "name_en": "Bond Enthalpy Protector — Tier 5",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SECRET_RARE",
    "attribute": "PYRO",
    "manaCost": 5,
    "level": 6,
    "atk": 3030,
    "def": 3040,
    "chemicalFormula": "ΔH_bond",
    "effectCode": "ELEM_B10_BOND_ENTHALPY_PROTECTOR_GUARD_48",
    "effectText": "Bảo vệ mạng tinh thể nguyên tố: Tăng 400 DEF cho tất cả quái thú cùng thuộc tính trên sân. Không thể bị tiêu diệt bởi đòn tấn công đầu tiên mỗi lượt.",
    "scientificLore": "Hộ Pháp Năng Lượng Liên Kết đại diện cho giới hạn cực đại của liên kết hóa học (ΔH_rxn = ∑Eb(react) - ∑Eb(prod)), độ cứng tinh thể hoặc khả năng nhường proton mạnh nhất trong tự nhiên theo GDPT 2018.",
    "relatedEquation": "ΔH_rxn = ∑Eb(react) - ∑Eb(prod)",
    "iupacName": "Bond Enthalpy Protector Sovereign",
    "archetype": "CRYSTAL_LATTICE",
    "structuredEffects": [
      {
        "effectId": "B10_EFF_48",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "DEF",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 400 DEF cho toàn thể đồng minh bằng mạng tinh thể."
      }
    ]
  },
  {
    "id": "card_b10_049_dry_ice_sublimation_phantom_49",
    "name": "Bóng Ma Tinh Thể Băng Khô — Bậc 5",
    "name_en": "Dry Ice Sublimation Phantom — Tier 5",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "AERO",
    "manaCost": 6,
    "level": 7,
    "atk": 3110,
    "def": 3320,
    "chemicalFormula": "CO2(s)",
    "effectCode": "ELEM_B10_DRY_ICE_SUBLIMATION_PHANTOM_GUARD_49",
    "effectText": "Bảo vệ mạng tinh thể nguyên tố: Tăng 400 DEF cho tất cả quái thú cùng thuộc tính trên sân. Không thể bị tiêu diệt bởi đòn tấn công đầu tiên mỗi lượt.",
    "scientificLore": "Bóng Ma Tinh Thể Băng Khô đại diện cho giới hạn cực đại của liên kết hóa học (CO₂(s) → CO₂(g) (-78.5°C)), độ cứng tinh thể hoặc khả năng nhường proton mạnh nhất trong tự nhiên theo GDPT 2018.",
    "relatedEquation": "CO₂(s) → CO₂(g) (-78.5°C)",
    "iupacName": "Dry Ice Sublimation Phantom Sovereign",
    "archetype": "CRYSTAL_LATTICE",
    "structuredEffects": [
      {
        "effectId": "B10_EFF_49",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "DEF",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 400 DEF cho toàn thể đồng minh bằng mạng tinh thể."
      }
    ]
  },
  {
    "id": "card_b10_050_kevlar_armor_bastion_50",
    "name": "Vệ Thần Polyme Kevlar Chống Đạn — Bậc 5",
    "name_en": "Kevlar Armor Bastion — Tier 5",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "NOBLE_VOID",
    "manaCost": 7,
    "level": 8,
    "atk": 3390,
    "def": 3600,
    "chemicalFormula": "Aramid",
    "effectCode": "ELEM_B10_KEVLAR_ARMOR_BASTION_GUARD_50",
    "effectText": "Bảo vệ mạng tinh thể nguyên tố: Tăng 400 DEF cho tất cả quái thú cùng thuộc tính trên sân. Không thể bị tiêu diệt bởi đòn tấn công đầu tiên mỗi lượt.",
    "scientificLore": "Vệ Thần Polyme Kevlar Chống Đạn đại diện cho giới hạn cực đại của liên kết hóa học (Interchain Hydrogen Bonding Network), độ cứng tinh thể hoặc khả năng nhường proton mạnh nhất trong tự nhiên theo GDPT 2018.",
    "relatedEquation": "Interchain Hydrogen Bonding Network",
    "iupacName": "Kevlar Armor Bastion Sovereign",
    "archetype": "CRYSTAL_LATTICE",
    "structuredEffects": [
      {
        "effectId": "B10_EFF_50",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "DEF",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 400 DEF cho toàn thể đồng minh bằng mạng tinh thể."
      }
    ]
  },
  {
    "id": "card_b10_051_diamond_lattice_guardian_51",
    "name": "Hộ Vệ Tinh Thể Kim Cương — Bậc 6",
    "name_en": "Diamond Lattice Guardian — Tier 6",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "NOBLE_VOID",
    "manaCost": 3,
    "level": 4,
    "atk": 2520,
    "def": 2480,
    "chemicalFormula": "C(diamond)",
    "effectCode": "ELEM_B10_DIAMOND_LATTICE_GUARDIAN_GUARD_51",
    "effectText": "Bảo vệ mạng tinh thể nguyên tố: Tăng 400 DEF cho tất cả quái thú cùng thuộc tính trên sân. Không thể bị tiêu diệt bởi đòn tấn công đầu tiên mỗi lượt.",
    "scientificLore": "Hộ Vệ Tinh Thể Kim Cương đại diện cho giới hạn cực đại của liên kết hóa học (Giant Covalent 3D Network), độ cứng tinh thể hoặc khả năng nhường proton mạnh nhất trong tự nhiên theo GDPT 2018.",
    "relatedEquation": "Giant Covalent 3D Network",
    "iupacName": "Diamond Lattice Guardian Sovereign",
    "archetype": "CRYSTAL_LATTICE",
    "structuredEffects": [
      {
        "effectId": "B10_EFF_51",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "DEF",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 400 DEF cho toàn thể đồng minh bằng mạng tinh thể."
      }
    ]
  },
  {
    "id": "card_b10_052_fluoroantimonic_superacid_sovereign_52",
    "name": "Chúa Tể Siêu Axit Fluoroantimonic — Bậc 6",
    "name_en": "Fluoroantimonic Superacid Sovereign — Tier 6",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "ACID_DARK",
    "manaCost": 4,
    "level": 5,
    "atk": 2800,
    "def": 2760,
    "chemicalFormula": "HSbF6",
    "effectCode": "ELEM_B10_FLUOROANTIMONIC_SUPERACID_SOVEREIGN_GUARD_52",
    "effectText": "Bảo vệ mạng tinh thể nguyên tố: Tăng 400 DEF cho tất cả quái thú cùng thuộc tính trên sân. Không thể bị tiêu diệt bởi đòn tấn công đầu tiên mỗi lượt.",
    "scientificLore": "Chúa Tể Siêu Axit Fluoroantimonic đại diện cho giới hạn cực đại của liên kết hóa học (HF + SbF₅ ⇌ H₂F⁺ + SbF₆⁻ (H₀ = -31.3)), độ cứng tinh thể hoặc khả năng nhường proton mạnh nhất trong tự nhiên theo GDPT 2018.",
    "relatedEquation": "HF + SbF₅ ⇌ H₂F⁺ + SbF₆⁻ (H₀ = -31.3)",
    "iupacName": "Fluoroantimonic Superacid Sovereign Sovereign",
    "archetype": "SUPERACID_EXTREME",
    "structuredEffects": [
      {
        "effectId": "B10_EFF_52",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "DEF",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 400 DEF cho toàn thể đồng minh bằng mạng tinh thể."
      }
    ]
  },
  {
    "id": "card_b10_053_halite_crystal_knight_53",
    "name": "Kỵ Sĩ Mạng Tinh Thể Muối Ăn — Bậc 6",
    "name_en": "Halite Crystal Knight — Tier 6",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "TERRA",
    "manaCost": 5,
    "level": 6,
    "atk": 2880,
    "def": 3040,
    "chemicalFormula": "NaCl(s)",
    "effectCode": "ELEM_B10_HALITE_CRYSTAL_KNIGHT_GUARD_53",
    "effectText": "Bảo vệ mạng tinh thể nguyên tố: Tăng 400 DEF cho tất cả quái thú cùng thuộc tính trên sân. Không thể bị tiêu diệt bởi đòn tấn công đầu tiên mỗi lượt.",
    "scientificLore": "Kỵ Sĩ Mạng Tinh Thể Muối Ăn đại diện cho giới hạn cực đại của liên kết hóa học (Na⁺(fcc) + Cl⁻(fcc) Lattice), độ cứng tinh thể hoặc khả năng nhường proton mạnh nhất trong tự nhiên theo GDPT 2018.",
    "relatedEquation": "Na⁺(fcc) + Cl⁻(fcc) Lattice",
    "iupacName": "Halite Crystal Knight Sovereign",
    "archetype": "CRYSTAL_LATTICE",
    "structuredEffects": [
      {
        "effectId": "B10_EFF_53",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "DEF",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 400 DEF cho toàn thể đồng minh bằng mạng tinh thể."
      }
    ]
  },
  {
    "id": "card_b10_054_magnesium_flare_king_54",
    "name": "Vua Lửa Magie Pháo Sáng — Bậc 6",
    "name_en": "Magnesium Flare King — Tier 6",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "PYRO",
    "manaCost": 6,
    "level": 7,
    "atk": 3160,
    "def": 3320,
    "chemicalFormula": "MgO(s)",
    "effectCode": "ELEM_B10_MAGNESIUM_FLARE_KING_GUARD_54",
    "effectText": "Bảo vệ mạng tinh thể nguyên tố: Tăng 400 DEF cho tất cả quái thú cùng thuộc tính trên sân. Không thể bị tiêu diệt bởi đòn tấn công đầu tiên mỗi lượt.",
    "scientificLore": "Vua Lửa Magie Pháo Sáng đại diện cho giới hạn cực đại của liên kết hóa học (2Mg + O₂ → 2MgO + 1204 kJ), độ cứng tinh thể hoặc khả năng nhường proton mạnh nhất trong tự nhiên theo GDPT 2018.",
    "relatedEquation": "2Mg + O₂ → 2MgO + 1204 kJ",
    "iupacName": "Magnesium Flare King Sovereign",
    "archetype": "SUPERACID_EXTREME",
    "structuredEffects": [
      {
        "effectId": "B10_EFF_54",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "DEF",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 400 DEF cho toàn thể đồng minh bằng mạng tinh thể."
      }
    ]
  },
  {
    "id": "card_b10_055_hydrolysis_dragon_king_55",
    "name": "Long Vương Thủy Phân Điện Phân — Bậc 6",
    "name_en": "Hydrolysis Dragon King — Tier 6",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "AQUA",
    "manaCost": 7,
    "level": 8,
    "atk": 3440,
    "def": 3600,
    "chemicalFormula": "2H2O",
    "effectCode": "ELEM_B10_HYDROLYSIS_DRAGON_KING_GUARD_55",
    "effectText": "Bảo vệ mạng tinh thể nguyên tố: Tăng 400 DEF cho tất cả quái thú cùng thuộc tính trên sân. Không thể bị tiêu diệt bởi đòn tấn công đầu tiên mỗi lượt.",
    "scientificLore": "Long Vương Thủy Phân Điện Phân đại diện cho giới hạn cực đại của liên kết hóa học (2H₂O --electrolysis--> 2H₂ + O₂), độ cứng tinh thể hoặc khả năng nhường proton mạnh nhất trong tự nhiên theo GDPT 2018.",
    "relatedEquation": "2H₂O --electrolysis--> 2H₂ + O₂",
    "iupacName": "Hydrolysis Dragon King Sovereign",
    "archetype": "CRYSTAL_LATTICE",
    "structuredEffects": [
      {
        "effectId": "B10_EFF_55",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "DEF",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 400 DEF cho toàn thể đồng minh bằng mạng tinh thể."
      }
    ]
  },
  {
    "id": "card_b10_056_halogen_storm_supreme_56",
    "name": "Bão Tố Khí Halogen Cực Đại — Bậc 6",
    "name_en": "Halogen Storm Supreme — Tier 6",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "ULTRA_RARE",
    "attribute": "AERO",
    "manaCost": 3,
    "level": 4,
    "atk": 2570,
    "def": 2480,
    "chemicalFormula": "Cl2/Br2/I2",
    "effectCode": "ELEM_B10_HALOGEN_STORM_SUPREME_GUARD_56",
    "effectText": "Bảo vệ mạng tinh thể nguyên tố: Tăng 400 DEF cho tất cả quái thú cùng thuộc tính trên sân. Không thể bị tiêu diệt bởi đòn tấn công đầu tiên mỗi lượt.",
    "scientificLore": "Bão Tố Khí Halogen Cực Đại đại diện cho giới hạn cực đại của liên kết hóa học (Electronegativity Cascade), độ cứng tinh thể hoặc khả năng nhường proton mạnh nhất trong tự nhiên theo GDPT 2018.",
    "relatedEquation": "Electronegativity Cascade",
    "iupacName": "Halogen Storm Supreme Sovereign",
    "archetype": "CRYSTAL_LATTICE",
    "structuredEffects": [
      {
        "effectId": "B10_EFF_56",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "DEF",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 400 DEF cho toàn thể đồng minh bằng mạng tinh thể."
      }
    ]
  },
  {
    "id": "card_b10_057_lithium_galvanic_titan_57",
    "name": "Thần Sấm Pin Galvanic Lithium — Bậc 6",
    "name_en": "Lithium Galvanic Titan — Tier 6",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SECRET_RARE",
    "attribute": "ELECTRO",
    "manaCost": 4,
    "level": 5,
    "atk": 2650,
    "def": 2760,
    "chemicalFormula": "Li/Li+",
    "effectCode": "ELEM_B10_LITHIUM_GALVANIC_TITAN_GUARD_57",
    "effectText": "Bảo vệ mạng tinh thể nguyên tố: Tăng 400 DEF cho tất cả quái thú cùng thuộc tính trên sân. Không thể bị tiêu diệt bởi đòn tấn công đầu tiên mỗi lượt.",
    "scientificLore": "Thần Sấm Pin Galvanic Lithium đại diện cho giới hạn cực đại của liên kết hóa học (Li → Li⁺ + e⁻ (E° = -3.04V)), độ cứng tinh thể hoặc khả năng nhường proton mạnh nhất trong tự nhiên theo GDPT 2018.",
    "relatedEquation": "Li → Li⁺ + e⁻ (E° = -3.04V)",
    "iupacName": "Lithium Galvanic Titan Sovereign",
    "archetype": "CRYSTAL_LATTICE",
    "structuredEffects": [
      {
        "effectId": "B10_EFF_57",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "DEF",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 400 DEF cho toàn thể đồng minh bằng mạng tinh thể."
      }
    ]
  },
  {
    "id": "card_b10_058_bond_enthalpy_protector_58",
    "name": "Hộ Pháp Năng Lượng Liên Kết — Bậc 6",
    "name_en": "Bond Enthalpy Protector — Tier 6",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "PYRO",
    "manaCost": 5,
    "level": 6,
    "atk": 2930,
    "def": 3040,
    "chemicalFormula": "ΔH_bond",
    "effectCode": "ELEM_B10_BOND_ENTHALPY_PROTECTOR_GUARD_58",
    "effectText": "Bảo vệ mạng tinh thể nguyên tố: Tăng 400 DEF cho tất cả quái thú cùng thuộc tính trên sân. Không thể bị tiêu diệt bởi đòn tấn công đầu tiên mỗi lượt.",
    "scientificLore": "Hộ Pháp Năng Lượng Liên Kết đại diện cho giới hạn cực đại của liên kết hóa học (ΔH_rxn = ∑Eb(react) - ∑Eb(prod)), độ cứng tinh thể hoặc khả năng nhường proton mạnh nhất trong tự nhiên theo GDPT 2018.",
    "relatedEquation": "ΔH_rxn = ∑Eb(react) - ∑Eb(prod)",
    "iupacName": "Bond Enthalpy Protector Sovereign",
    "archetype": "CRYSTAL_LATTICE",
    "structuredEffects": [
      {
        "effectId": "B10_EFF_58",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "DEF",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 400 DEF cho toàn thể đồng minh bằng mạng tinh thể."
      }
    ]
  },
  {
    "id": "card_b10_059_dry_ice_sublimation_phantom_59",
    "name": "Bóng Ma Tinh Thể Băng Khô — Bậc 6",
    "name_en": "Dry Ice Sublimation Phantom — Tier 6",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "AERO",
    "manaCost": 6,
    "level": 7,
    "atk": 3210,
    "def": 3320,
    "chemicalFormula": "CO2(s)",
    "effectCode": "ELEM_B10_DRY_ICE_SUBLIMATION_PHANTOM_GUARD_59",
    "effectText": "Bảo vệ mạng tinh thể nguyên tố: Tăng 400 DEF cho tất cả quái thú cùng thuộc tính trên sân. Không thể bị tiêu diệt bởi đòn tấn công đầu tiên mỗi lượt.",
    "scientificLore": "Bóng Ma Tinh Thể Băng Khô đại diện cho giới hạn cực đại của liên kết hóa học (CO₂(s) → CO₂(g) (-78.5°C)), độ cứng tinh thể hoặc khả năng nhường proton mạnh nhất trong tự nhiên theo GDPT 2018.",
    "relatedEquation": "CO₂(s) → CO₂(g) (-78.5°C)",
    "iupacName": "Dry Ice Sublimation Phantom Sovereign",
    "archetype": "CRYSTAL_LATTICE",
    "structuredEffects": [
      {
        "effectId": "B10_EFF_59",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "DEF",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 400 DEF cho toàn thể đồng minh bằng mạng tinh thể."
      }
    ]
  },
  {
    "id": "card_b10_060_kevlar_armor_bastion_60",
    "name": "Vệ Thần Polyme Kevlar Chống Đạn — Bậc 6",
    "name_en": "Kevlar Armor Bastion — Tier 6",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "NOBLE_VOID",
    "manaCost": 7,
    "level": 8,
    "atk": 3490,
    "def": 3600,
    "chemicalFormula": "Aramid",
    "effectCode": "ELEM_B10_KEVLAR_ARMOR_BASTION_GUARD_60",
    "effectText": "Bảo vệ mạng tinh thể nguyên tố: Tăng 400 DEF cho tất cả quái thú cùng thuộc tính trên sân. Không thể bị tiêu diệt bởi đòn tấn công đầu tiên mỗi lượt.",
    "scientificLore": "Vệ Thần Polyme Kevlar Chống Đạn đại diện cho giới hạn cực đại của liên kết hóa học (Interchain Hydrogen Bonding Network), độ cứng tinh thể hoặc khả năng nhường proton mạnh nhất trong tự nhiên theo GDPT 2018.",
    "relatedEquation": "Interchain Hydrogen Bonding Network",
    "iupacName": "Kevlar Armor Bastion Sovereign",
    "archetype": "CRYSTAL_LATTICE",
    "structuredEffects": [
      {
        "effectId": "B10_EFF_60",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "DEF",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 400 DEF cho toàn thể đồng minh bằng mạng tinh thể."
      }
    ]
  },
  {
    "id": "card_b10_061_diamond_lattice_guardian_61",
    "name": "Hộ Vệ Tinh Thể Kim Cương — Bậc 7",
    "name_en": "Diamond Lattice Guardian — Tier 7",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "NOBLE_VOID",
    "manaCost": 3,
    "level": 4,
    "atk": 2420,
    "def": 2480,
    "chemicalFormula": "C(diamond)",
    "effectCode": "ELEM_B10_DIAMOND_LATTICE_GUARDIAN_GUARD_61",
    "effectText": "Bảo vệ mạng tinh thể nguyên tố: Tăng 400 DEF cho tất cả quái thú cùng thuộc tính trên sân. Không thể bị tiêu diệt bởi đòn tấn công đầu tiên mỗi lượt.",
    "scientificLore": "Hộ Vệ Tinh Thể Kim Cương đại diện cho giới hạn cực đại của liên kết hóa học (Giant Covalent 3D Network), độ cứng tinh thể hoặc khả năng nhường proton mạnh nhất trong tự nhiên theo GDPT 2018.",
    "relatedEquation": "Giant Covalent 3D Network",
    "iupacName": "Diamond Lattice Guardian Sovereign",
    "archetype": "CRYSTAL_LATTICE",
    "structuredEffects": [
      {
        "effectId": "B10_EFF_61",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "DEF",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 400 DEF cho toàn thể đồng minh bằng mạng tinh thể."
      }
    ]
  },
  {
    "id": "card_b10_062_fluoroantimonic_superacid_sovereign_62",
    "name": "Chúa Tể Siêu Axit Fluoroantimonic — Bậc 7",
    "name_en": "Fluoroantimonic Superacid Sovereign — Tier 7",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "ACID_DARK",
    "manaCost": 4,
    "level": 5,
    "atk": 2700,
    "def": 2760,
    "chemicalFormula": "HSbF6",
    "effectCode": "ELEM_B10_FLUOROANTIMONIC_SUPERACID_SOVEREIGN_GUARD_62",
    "effectText": "Bảo vệ mạng tinh thể nguyên tố: Tăng 400 DEF cho tất cả quái thú cùng thuộc tính trên sân. Không thể bị tiêu diệt bởi đòn tấn công đầu tiên mỗi lượt.",
    "scientificLore": "Chúa Tể Siêu Axit Fluoroantimonic đại diện cho giới hạn cực đại của liên kết hóa học (HF + SbF₅ ⇌ H₂F⁺ + SbF₆⁻ (H₀ = -31.3)), độ cứng tinh thể hoặc khả năng nhường proton mạnh nhất trong tự nhiên theo GDPT 2018.",
    "relatedEquation": "HF + SbF₅ ⇌ H₂F⁺ + SbF₆⁻ (H₀ = -31.3)",
    "iupacName": "Fluoroantimonic Superacid Sovereign Sovereign",
    "archetype": "SUPERACID_EXTREME",
    "structuredEffects": [
      {
        "effectId": "B10_EFF_62",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "DEF",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 400 DEF cho toàn thể đồng minh bằng mạng tinh thể."
      }
    ]
  },
  {
    "id": "card_b10_063_halite_crystal_knight_63",
    "name": "Kỵ Sĩ Mạng Tinh Thể Muối Ăn — Bậc 7",
    "name_en": "Halite Crystal Knight — Tier 7",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "TERRA",
    "manaCost": 5,
    "level": 6,
    "atk": 2980,
    "def": 3040,
    "chemicalFormula": "NaCl(s)",
    "effectCode": "ELEM_B10_HALITE_CRYSTAL_KNIGHT_GUARD_63",
    "effectText": "Bảo vệ mạng tinh thể nguyên tố: Tăng 400 DEF cho tất cả quái thú cùng thuộc tính trên sân. Không thể bị tiêu diệt bởi đòn tấn công đầu tiên mỗi lượt.",
    "scientificLore": "Kỵ Sĩ Mạng Tinh Thể Muối Ăn đại diện cho giới hạn cực đại của liên kết hóa học (Na⁺(fcc) + Cl⁻(fcc) Lattice), độ cứng tinh thể hoặc khả năng nhường proton mạnh nhất trong tự nhiên theo GDPT 2018.",
    "relatedEquation": "Na⁺(fcc) + Cl⁻(fcc) Lattice",
    "iupacName": "Halite Crystal Knight Sovereign",
    "archetype": "CRYSTAL_LATTICE",
    "structuredEffects": [
      {
        "effectId": "B10_EFF_63",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "DEF",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 400 DEF cho toàn thể đồng minh bằng mạng tinh thể."
      }
    ]
  },
  {
    "id": "card_b10_064_magnesium_flare_king_64",
    "name": "Vua Lửa Magie Pháo Sáng — Bậc 7",
    "name_en": "Magnesium Flare King — Tier 7",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "PYRO",
    "manaCost": 6,
    "level": 7,
    "atk": 3260,
    "def": 3320,
    "chemicalFormula": "MgO(s)",
    "effectCode": "ELEM_B10_MAGNESIUM_FLARE_KING_GUARD_64",
    "effectText": "Bảo vệ mạng tinh thể nguyên tố: Tăng 400 DEF cho tất cả quái thú cùng thuộc tính trên sân. Không thể bị tiêu diệt bởi đòn tấn công đầu tiên mỗi lượt.",
    "scientificLore": "Vua Lửa Magie Pháo Sáng đại diện cho giới hạn cực đại của liên kết hóa học (2Mg + O₂ → 2MgO + 1204 kJ), độ cứng tinh thể hoặc khả năng nhường proton mạnh nhất trong tự nhiên theo GDPT 2018.",
    "relatedEquation": "2Mg + O₂ → 2MgO + 1204 kJ",
    "iupacName": "Magnesium Flare King Sovereign",
    "archetype": "SUPERACID_EXTREME",
    "structuredEffects": [
      {
        "effectId": "B10_EFF_64",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "DEF",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 400 DEF cho toàn thể đồng minh bằng mạng tinh thể."
      }
    ]
  },
  {
    "id": "card_b10_065_hydrolysis_dragon_king_65",
    "name": "Long Vương Thủy Phân Điện Phân — Bậc 7",
    "name_en": "Hydrolysis Dragon King — Tier 7",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "ULTRA_RARE",
    "attribute": "AQUA",
    "manaCost": 7,
    "level": 8,
    "atk": 3340,
    "def": 3600,
    "chemicalFormula": "2H2O",
    "effectCode": "ELEM_B10_HYDROLYSIS_DRAGON_KING_GUARD_65",
    "effectText": "Bảo vệ mạng tinh thể nguyên tố: Tăng 400 DEF cho tất cả quái thú cùng thuộc tính trên sân. Không thể bị tiêu diệt bởi đòn tấn công đầu tiên mỗi lượt.",
    "scientificLore": "Long Vương Thủy Phân Điện Phân đại diện cho giới hạn cực đại của liên kết hóa học (2H₂O --electrolysis--> 2H₂ + O₂), độ cứng tinh thể hoặc khả năng nhường proton mạnh nhất trong tự nhiên theo GDPT 2018.",
    "relatedEquation": "2H₂O --electrolysis--> 2H₂ + O₂",
    "iupacName": "Hydrolysis Dragon King Sovereign",
    "archetype": "CRYSTAL_LATTICE",
    "structuredEffects": [
      {
        "effectId": "B10_EFF_65",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "DEF",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 400 DEF cho toàn thể đồng minh bằng mạng tinh thể."
      }
    ]
  },
  {
    "id": "card_b10_066_halogen_storm_supreme_66",
    "name": "Bão Tố Khí Halogen Cực Đại — Bậc 7",
    "name_en": "Halogen Storm Supreme — Tier 7",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SECRET_RARE",
    "attribute": "AERO",
    "manaCost": 3,
    "level": 4,
    "atk": 2470,
    "def": 2480,
    "chemicalFormula": "Cl2/Br2/I2",
    "effectCode": "ELEM_B10_HALOGEN_STORM_SUPREME_GUARD_66",
    "effectText": "Bảo vệ mạng tinh thể nguyên tố: Tăng 400 DEF cho tất cả quái thú cùng thuộc tính trên sân. Không thể bị tiêu diệt bởi đòn tấn công đầu tiên mỗi lượt.",
    "scientificLore": "Bão Tố Khí Halogen Cực Đại đại diện cho giới hạn cực đại của liên kết hóa học (Electronegativity Cascade), độ cứng tinh thể hoặc khả năng nhường proton mạnh nhất trong tự nhiên theo GDPT 2018.",
    "relatedEquation": "Electronegativity Cascade",
    "iupacName": "Halogen Storm Supreme Sovereign",
    "archetype": "CRYSTAL_LATTICE",
    "structuredEffects": [
      {
        "effectId": "B10_EFF_66",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "DEF",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 400 DEF cho toàn thể đồng minh bằng mạng tinh thể."
      }
    ]
  },
  {
    "id": "card_b10_067_lithium_galvanic_titan_67",
    "name": "Thần Sấm Pin Galvanic Lithium — Bậc 7",
    "name_en": "Lithium Galvanic Titan — Tier 7",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "ELECTRO",
    "manaCost": 4,
    "level": 5,
    "atk": 2750,
    "def": 2760,
    "chemicalFormula": "Li/Li+",
    "effectCode": "ELEM_B10_LITHIUM_GALVANIC_TITAN_GUARD_67",
    "effectText": "Bảo vệ mạng tinh thể nguyên tố: Tăng 400 DEF cho tất cả quái thú cùng thuộc tính trên sân. Không thể bị tiêu diệt bởi đòn tấn công đầu tiên mỗi lượt.",
    "scientificLore": "Thần Sấm Pin Galvanic Lithium đại diện cho giới hạn cực đại của liên kết hóa học (Li → Li⁺ + e⁻ (E° = -3.04V)), độ cứng tinh thể hoặc khả năng nhường proton mạnh nhất trong tự nhiên theo GDPT 2018.",
    "relatedEquation": "Li → Li⁺ + e⁻ (E° = -3.04V)",
    "iupacName": "Lithium Galvanic Titan Sovereign",
    "archetype": "CRYSTAL_LATTICE",
    "structuredEffects": [
      {
        "effectId": "B10_EFF_67",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "DEF",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 400 DEF cho toàn thể đồng minh bằng mạng tinh thể."
      }
    ]
  },
  {
    "id": "card_b10_068_bond_enthalpy_protector_68",
    "name": "Hộ Pháp Năng Lượng Liên Kết — Bậc 7",
    "name_en": "Bond Enthalpy Protector — Tier 7",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "PYRO",
    "manaCost": 5,
    "level": 6,
    "atk": 3030,
    "def": 3040,
    "chemicalFormula": "ΔH_bond",
    "effectCode": "ELEM_B10_BOND_ENTHALPY_PROTECTOR_GUARD_68",
    "effectText": "Bảo vệ mạng tinh thể nguyên tố: Tăng 400 DEF cho tất cả quái thú cùng thuộc tính trên sân. Không thể bị tiêu diệt bởi đòn tấn công đầu tiên mỗi lượt.",
    "scientificLore": "Hộ Pháp Năng Lượng Liên Kết đại diện cho giới hạn cực đại của liên kết hóa học (ΔH_rxn = ∑Eb(react) - ∑Eb(prod)), độ cứng tinh thể hoặc khả năng nhường proton mạnh nhất trong tự nhiên theo GDPT 2018.",
    "relatedEquation": "ΔH_rxn = ∑Eb(react) - ∑Eb(prod)",
    "iupacName": "Bond Enthalpy Protector Sovereign",
    "archetype": "CRYSTAL_LATTICE",
    "structuredEffects": [
      {
        "effectId": "B10_EFF_68",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "DEF",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 400 DEF cho toàn thể đồng minh bằng mạng tinh thể."
      }
    ]
  },
  {
    "id": "card_b10_069_dry_ice_sublimation_phantom_69",
    "name": "Bóng Ma Tinh Thể Băng Khô — Bậc 7",
    "name_en": "Dry Ice Sublimation Phantom — Tier 7",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "AERO",
    "manaCost": 6,
    "level": 7,
    "atk": 3110,
    "def": 3320,
    "chemicalFormula": "CO2(s)",
    "effectCode": "ELEM_B10_DRY_ICE_SUBLIMATION_PHANTOM_GUARD_69",
    "effectText": "Bảo vệ mạng tinh thể nguyên tố: Tăng 400 DEF cho tất cả quái thú cùng thuộc tính trên sân. Không thể bị tiêu diệt bởi đòn tấn công đầu tiên mỗi lượt.",
    "scientificLore": "Bóng Ma Tinh Thể Băng Khô đại diện cho giới hạn cực đại của liên kết hóa học (CO₂(s) → CO₂(g) (-78.5°C)), độ cứng tinh thể hoặc khả năng nhường proton mạnh nhất trong tự nhiên theo GDPT 2018.",
    "relatedEquation": "CO₂(s) → CO₂(g) (-78.5°C)",
    "iupacName": "Dry Ice Sublimation Phantom Sovereign",
    "archetype": "CRYSTAL_LATTICE",
    "structuredEffects": [
      {
        "effectId": "B10_EFF_69",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "DEF",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 400 DEF cho toàn thể đồng minh bằng mạng tinh thể."
      }
    ]
  },
  {
    "id": "card_b10_070_kevlar_armor_bastion_70",
    "name": "Vệ Thần Polyme Kevlar Chống Đạn — Bậc 7",
    "name_en": "Kevlar Armor Bastion — Tier 7",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "NOBLE_VOID",
    "manaCost": 7,
    "level": 8,
    "atk": 3390,
    "def": 3600,
    "chemicalFormula": "Aramid",
    "effectCode": "ELEM_B10_KEVLAR_ARMOR_BASTION_GUARD_70",
    "effectText": "Bảo vệ mạng tinh thể nguyên tố: Tăng 400 DEF cho tất cả quái thú cùng thuộc tính trên sân. Không thể bị tiêu diệt bởi đòn tấn công đầu tiên mỗi lượt.",
    "scientificLore": "Vệ Thần Polyme Kevlar Chống Đạn đại diện cho giới hạn cực đại của liên kết hóa học (Interchain Hydrogen Bonding Network), độ cứng tinh thể hoặc khả năng nhường proton mạnh nhất trong tự nhiên theo GDPT 2018.",
    "relatedEquation": "Interchain Hydrogen Bonding Network",
    "iupacName": "Kevlar Armor Bastion Sovereign",
    "archetype": "CRYSTAL_LATTICE",
    "structuredEffects": [
      {
        "effectId": "B10_EFF_70",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "DEF",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 400 DEF cho toàn thể đồng minh bằng mạng tinh thể."
      }
    ]
  },
  {
    "id": "card_b10_071_diamond_lattice_guardian_71",
    "name": "Hộ Vệ Tinh Thể Kim Cương — Bậc 8",
    "name_en": "Diamond Lattice Guardian — Tier 8",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "NOBLE_VOID",
    "manaCost": 3,
    "level": 4,
    "atk": 2520,
    "def": 2480,
    "chemicalFormula": "C(diamond)",
    "effectCode": "ELEM_B10_DIAMOND_LATTICE_GUARDIAN_GUARD_71",
    "effectText": "Bảo vệ mạng tinh thể nguyên tố: Tăng 400 DEF cho tất cả quái thú cùng thuộc tính trên sân. Không thể bị tiêu diệt bởi đòn tấn công đầu tiên mỗi lượt.",
    "scientificLore": "Hộ Vệ Tinh Thể Kim Cương đại diện cho giới hạn cực đại của liên kết hóa học (Giant Covalent 3D Network), độ cứng tinh thể hoặc khả năng nhường proton mạnh nhất trong tự nhiên theo GDPT 2018.",
    "relatedEquation": "Giant Covalent 3D Network",
    "iupacName": "Diamond Lattice Guardian Sovereign",
    "archetype": "CRYSTAL_LATTICE",
    "structuredEffects": [
      {
        "effectId": "B10_EFF_71",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "DEF",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 400 DEF cho toàn thể đồng minh bằng mạng tinh thể."
      }
    ]
  },
  {
    "id": "card_b10_072_fluoroantimonic_superacid_sovereign_72",
    "name": "Chúa Tể Siêu Axit Fluoroantimonic — Bậc 8",
    "name_en": "Fluoroantimonic Superacid Sovereign — Tier 8",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "ACID_DARK",
    "manaCost": 4,
    "level": 5,
    "atk": 2800,
    "def": 2760,
    "chemicalFormula": "HSbF6",
    "effectCode": "ELEM_B10_FLUOROANTIMONIC_SUPERACID_SOVEREIGN_GUARD_72",
    "effectText": "Bảo vệ mạng tinh thể nguyên tố: Tăng 400 DEF cho tất cả quái thú cùng thuộc tính trên sân. Không thể bị tiêu diệt bởi đòn tấn công đầu tiên mỗi lượt.",
    "scientificLore": "Chúa Tể Siêu Axit Fluoroantimonic đại diện cho giới hạn cực đại của liên kết hóa học (HF + SbF₅ ⇌ H₂F⁺ + SbF₆⁻ (H₀ = -31.3)), độ cứng tinh thể hoặc khả năng nhường proton mạnh nhất trong tự nhiên theo GDPT 2018.",
    "relatedEquation": "HF + SbF₅ ⇌ H₂F⁺ + SbF₆⁻ (H₀ = -31.3)",
    "iupacName": "Fluoroantimonic Superacid Sovereign Sovereign",
    "archetype": "SUPERACID_EXTREME",
    "structuredEffects": [
      {
        "effectId": "B10_EFF_72",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "DEF",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 400 DEF cho toàn thể đồng minh bằng mạng tinh thể."
      }
    ]
  },
  {
    "id": "card_b10_073_halite_crystal_knight_73",
    "name": "Kỵ Sĩ Mạng Tinh Thể Muối Ăn — Bậc 8",
    "name_en": "Halite Crystal Knight — Tier 8",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "TERRA",
    "manaCost": 5,
    "level": 6,
    "atk": 2880,
    "def": 3040,
    "chemicalFormula": "NaCl(s)",
    "effectCode": "ELEM_B10_HALITE_CRYSTAL_KNIGHT_GUARD_73",
    "effectText": "Bảo vệ mạng tinh thể nguyên tố: Tăng 400 DEF cho tất cả quái thú cùng thuộc tính trên sân. Không thể bị tiêu diệt bởi đòn tấn công đầu tiên mỗi lượt.",
    "scientificLore": "Kỵ Sĩ Mạng Tinh Thể Muối Ăn đại diện cho giới hạn cực đại của liên kết hóa học (Na⁺(fcc) + Cl⁻(fcc) Lattice), độ cứng tinh thể hoặc khả năng nhường proton mạnh nhất trong tự nhiên theo GDPT 2018.",
    "relatedEquation": "Na⁺(fcc) + Cl⁻(fcc) Lattice",
    "iupacName": "Halite Crystal Knight Sovereign",
    "archetype": "CRYSTAL_LATTICE",
    "structuredEffects": [
      {
        "effectId": "B10_EFF_73",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "DEF",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 400 DEF cho toàn thể đồng minh bằng mạng tinh thể."
      }
    ]
  },
  {
    "id": "card_b10_074_magnesium_flare_king_74",
    "name": "Vua Lửa Magie Pháo Sáng — Bậc 8",
    "name_en": "Magnesium Flare King — Tier 8",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "ULTRA_RARE",
    "attribute": "PYRO",
    "manaCost": 6,
    "level": 7,
    "atk": 3160,
    "def": 3320,
    "chemicalFormula": "MgO(s)",
    "effectCode": "ELEM_B10_MAGNESIUM_FLARE_KING_GUARD_74",
    "effectText": "Bảo vệ mạng tinh thể nguyên tố: Tăng 400 DEF cho tất cả quái thú cùng thuộc tính trên sân. Không thể bị tiêu diệt bởi đòn tấn công đầu tiên mỗi lượt.",
    "scientificLore": "Vua Lửa Magie Pháo Sáng đại diện cho giới hạn cực đại của liên kết hóa học (2Mg + O₂ → 2MgO + 1204 kJ), độ cứng tinh thể hoặc khả năng nhường proton mạnh nhất trong tự nhiên theo GDPT 2018.",
    "relatedEquation": "2Mg + O₂ → 2MgO + 1204 kJ",
    "iupacName": "Magnesium Flare King Sovereign",
    "archetype": "SUPERACID_EXTREME",
    "structuredEffects": [
      {
        "effectId": "B10_EFF_74",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "DEF",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 400 DEF cho toàn thể đồng minh bằng mạng tinh thể."
      }
    ]
  },
  {
    "id": "card_b10_075_hydrolysis_dragon_king_75",
    "name": "Long Vương Thủy Phân Điện Phân — Bậc 8",
    "name_en": "Hydrolysis Dragon King — Tier 8",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SECRET_RARE",
    "attribute": "AQUA",
    "manaCost": 7,
    "level": 8,
    "atk": 3440,
    "def": 3600,
    "chemicalFormula": "2H2O",
    "effectCode": "ELEM_B10_HYDROLYSIS_DRAGON_KING_GUARD_75",
    "effectText": "Bảo vệ mạng tinh thể nguyên tố: Tăng 400 DEF cho tất cả quái thú cùng thuộc tính trên sân. Không thể bị tiêu diệt bởi đòn tấn công đầu tiên mỗi lượt.",
    "scientificLore": "Long Vương Thủy Phân Điện Phân đại diện cho giới hạn cực đại của liên kết hóa học (2H₂O --electrolysis--> 2H₂ + O₂), độ cứng tinh thể hoặc khả năng nhường proton mạnh nhất trong tự nhiên theo GDPT 2018.",
    "relatedEquation": "2H₂O --electrolysis--> 2H₂ + O₂",
    "iupacName": "Hydrolysis Dragon King Sovereign",
    "archetype": "CRYSTAL_LATTICE",
    "structuredEffects": [
      {
        "effectId": "B10_EFF_75",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "DEF",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 400 DEF cho toàn thể đồng minh bằng mạng tinh thể."
      }
    ]
  },
  {
    "id": "card_b10_076_halogen_storm_supreme_76",
    "name": "Bão Tố Khí Halogen Cực Đại — Bậc 8",
    "name_en": "Halogen Storm Supreme — Tier 8",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "AERO",
    "manaCost": 3,
    "level": 4,
    "atk": 2570,
    "def": 2480,
    "chemicalFormula": "Cl2/Br2/I2",
    "effectCode": "ELEM_B10_HALOGEN_STORM_SUPREME_GUARD_76",
    "effectText": "Bảo vệ mạng tinh thể nguyên tố: Tăng 400 DEF cho tất cả quái thú cùng thuộc tính trên sân. Không thể bị tiêu diệt bởi đòn tấn công đầu tiên mỗi lượt.",
    "scientificLore": "Bão Tố Khí Halogen Cực Đại đại diện cho giới hạn cực đại của liên kết hóa học (Electronegativity Cascade), độ cứng tinh thể hoặc khả năng nhường proton mạnh nhất trong tự nhiên theo GDPT 2018.",
    "relatedEquation": "Electronegativity Cascade",
    "iupacName": "Halogen Storm Supreme Sovereign",
    "archetype": "CRYSTAL_LATTICE",
    "structuredEffects": [
      {
        "effectId": "B10_EFF_76",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "DEF",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 400 DEF cho toàn thể đồng minh bằng mạng tinh thể."
      }
    ]
  },
  {
    "id": "card_b10_077_lithium_galvanic_titan_77",
    "name": "Thần Sấm Pin Galvanic Lithium — Bậc 8",
    "name_en": "Lithium Galvanic Titan — Tier 8",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "ELECTRO",
    "manaCost": 4,
    "level": 5,
    "atk": 2650,
    "def": 2760,
    "chemicalFormula": "Li/Li+",
    "effectCode": "ELEM_B10_LITHIUM_GALVANIC_TITAN_GUARD_77",
    "effectText": "Bảo vệ mạng tinh thể nguyên tố: Tăng 400 DEF cho tất cả quái thú cùng thuộc tính trên sân. Không thể bị tiêu diệt bởi đòn tấn công đầu tiên mỗi lượt.",
    "scientificLore": "Thần Sấm Pin Galvanic Lithium đại diện cho giới hạn cực đại của liên kết hóa học (Li → Li⁺ + e⁻ (E° = -3.04V)), độ cứng tinh thể hoặc khả năng nhường proton mạnh nhất trong tự nhiên theo GDPT 2018.",
    "relatedEquation": "Li → Li⁺ + e⁻ (E° = -3.04V)",
    "iupacName": "Lithium Galvanic Titan Sovereign",
    "archetype": "CRYSTAL_LATTICE",
    "structuredEffects": [
      {
        "effectId": "B10_EFF_77",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "DEF",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 400 DEF cho toàn thể đồng minh bằng mạng tinh thể."
      }
    ]
  },
  {
    "id": "card_b10_078_bond_enthalpy_protector_78",
    "name": "Hộ Pháp Năng Lượng Liên Kết — Bậc 8",
    "name_en": "Bond Enthalpy Protector — Tier 8",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "PYRO",
    "manaCost": 5,
    "level": 6,
    "atk": 2930,
    "def": 3040,
    "chemicalFormula": "ΔH_bond",
    "effectCode": "ELEM_B10_BOND_ENTHALPY_PROTECTOR_GUARD_78",
    "effectText": "Bảo vệ mạng tinh thể nguyên tố: Tăng 400 DEF cho tất cả quái thú cùng thuộc tính trên sân. Không thể bị tiêu diệt bởi đòn tấn công đầu tiên mỗi lượt.",
    "scientificLore": "Hộ Pháp Năng Lượng Liên Kết đại diện cho giới hạn cực đại của liên kết hóa học (ΔH_rxn = ∑Eb(react) - ∑Eb(prod)), độ cứng tinh thể hoặc khả năng nhường proton mạnh nhất trong tự nhiên theo GDPT 2018.",
    "relatedEquation": "ΔH_rxn = ∑Eb(react) - ∑Eb(prod)",
    "iupacName": "Bond Enthalpy Protector Sovereign",
    "archetype": "CRYSTAL_LATTICE",
    "structuredEffects": [
      {
        "effectId": "B10_EFF_78",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "DEF",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 400 DEF cho toàn thể đồng minh bằng mạng tinh thể."
      }
    ]
  },
  {
    "id": "card_b10_079_dry_ice_sublimation_phantom_79",
    "name": "Bóng Ma Tinh Thể Băng Khô — Bậc 8",
    "name_en": "Dry Ice Sublimation Phantom — Tier 8",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "AERO",
    "manaCost": 6,
    "level": 7,
    "atk": 3210,
    "def": 3320,
    "chemicalFormula": "CO2(s)",
    "effectCode": "ELEM_B10_DRY_ICE_SUBLIMATION_PHANTOM_GUARD_79",
    "effectText": "Bảo vệ mạng tinh thể nguyên tố: Tăng 400 DEF cho tất cả quái thú cùng thuộc tính trên sân. Không thể bị tiêu diệt bởi đòn tấn công đầu tiên mỗi lượt.",
    "scientificLore": "Bóng Ma Tinh Thể Băng Khô đại diện cho giới hạn cực đại của liên kết hóa học (CO₂(s) → CO₂(g) (-78.5°C)), độ cứng tinh thể hoặc khả năng nhường proton mạnh nhất trong tự nhiên theo GDPT 2018.",
    "relatedEquation": "CO₂(s) → CO₂(g) (-78.5°C)",
    "iupacName": "Dry Ice Sublimation Phantom Sovereign",
    "archetype": "CRYSTAL_LATTICE",
    "structuredEffects": [
      {
        "effectId": "B10_EFF_79",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "DEF",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 400 DEF cho toàn thể đồng minh bằng mạng tinh thể."
      }
    ]
  },
  {
    "id": "card_b10_080_kevlar_armor_bastion_80",
    "name": "Vệ Thần Polyme Kevlar Chống Đạn — Bậc 8",
    "name_en": "Kevlar Armor Bastion — Tier 8",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "NOBLE_VOID",
    "manaCost": 7,
    "level": 8,
    "atk": 3490,
    "def": 3600,
    "chemicalFormula": "Aramid",
    "effectCode": "ELEM_B10_KEVLAR_ARMOR_BASTION_GUARD_80",
    "effectText": "Bảo vệ mạng tinh thể nguyên tố: Tăng 400 DEF cho tất cả quái thú cùng thuộc tính trên sân. Không thể bị tiêu diệt bởi đòn tấn công đầu tiên mỗi lượt.",
    "scientificLore": "Vệ Thần Polyme Kevlar Chống Đạn đại diện cho giới hạn cực đại của liên kết hóa học (Interchain Hydrogen Bonding Network), độ cứng tinh thể hoặc khả năng nhường proton mạnh nhất trong tự nhiên theo GDPT 2018.",
    "relatedEquation": "Interchain Hydrogen Bonding Network",
    "iupacName": "Kevlar Armor Bastion Sovereign",
    "archetype": "CRYSTAL_LATTICE",
    "structuredEffects": [
      {
        "effectId": "B10_EFF_80",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "DEF",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 400 DEF cho toàn thể đồng minh bằng mạng tinh thể."
      }
    ]
  },
  {
    "id": "card_b10_081_diamond_lattice_guardian_81",
    "name": "Hộ Vệ Tinh Thể Kim Cương — Bậc 9",
    "name_en": "Diamond Lattice Guardian — Tier 9",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "NOBLE_VOID",
    "manaCost": 3,
    "level": 4,
    "atk": 2420,
    "def": 2480,
    "chemicalFormula": "C(diamond)",
    "effectCode": "ELEM_B10_DIAMOND_LATTICE_GUARDIAN_GUARD_81",
    "effectText": "Bảo vệ mạng tinh thể nguyên tố: Tăng 400 DEF cho tất cả quái thú cùng thuộc tính trên sân. Không thể bị tiêu diệt bởi đòn tấn công đầu tiên mỗi lượt.",
    "scientificLore": "Hộ Vệ Tinh Thể Kim Cương đại diện cho giới hạn cực đại của liên kết hóa học (Giant Covalent 3D Network), độ cứng tinh thể hoặc khả năng nhường proton mạnh nhất trong tự nhiên theo GDPT 2018.",
    "relatedEquation": "Giant Covalent 3D Network",
    "iupacName": "Diamond Lattice Guardian Sovereign",
    "archetype": "CRYSTAL_LATTICE",
    "structuredEffects": [
      {
        "effectId": "B10_EFF_81",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "DEF",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 400 DEF cho toàn thể đồng minh bằng mạng tinh thể."
      }
    ]
  },
  {
    "id": "card_b10_082_fluoroantimonic_superacid_sovereign_82",
    "name": "Chúa Tể Siêu Axit Fluoroantimonic — Bậc 9",
    "name_en": "Fluoroantimonic Superacid Sovereign — Tier 9",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "ACID_DARK",
    "manaCost": 4,
    "level": 5,
    "atk": 2700,
    "def": 2760,
    "chemicalFormula": "HSbF6",
    "effectCode": "ELEM_B10_FLUOROANTIMONIC_SUPERACID_SOVEREIGN_GUARD_82",
    "effectText": "Bảo vệ mạng tinh thể nguyên tố: Tăng 400 DEF cho tất cả quái thú cùng thuộc tính trên sân. Không thể bị tiêu diệt bởi đòn tấn công đầu tiên mỗi lượt.",
    "scientificLore": "Chúa Tể Siêu Axit Fluoroantimonic đại diện cho giới hạn cực đại của liên kết hóa học (HF + SbF₅ ⇌ H₂F⁺ + SbF₆⁻ (H₀ = -31.3)), độ cứng tinh thể hoặc khả năng nhường proton mạnh nhất trong tự nhiên theo GDPT 2018.",
    "relatedEquation": "HF + SbF₅ ⇌ H₂F⁺ + SbF₆⁻ (H₀ = -31.3)",
    "iupacName": "Fluoroantimonic Superacid Sovereign Sovereign",
    "archetype": "SUPERACID_EXTREME",
    "structuredEffects": [
      {
        "effectId": "B10_EFF_82",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "DEF",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 400 DEF cho toàn thể đồng minh bằng mạng tinh thể."
      }
    ]
  },
  {
    "id": "card_b10_083_halite_crystal_knight_83",
    "name": "Kỵ Sĩ Mạng Tinh Thể Muối Ăn — Bậc 9",
    "name_en": "Halite Crystal Knight — Tier 9",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "ULTRA_RARE",
    "attribute": "TERRA",
    "manaCost": 5,
    "level": 6,
    "atk": 2980,
    "def": 3040,
    "chemicalFormula": "NaCl(s)",
    "effectCode": "ELEM_B10_HALITE_CRYSTAL_KNIGHT_GUARD_83",
    "effectText": "Bảo vệ mạng tinh thể nguyên tố: Tăng 400 DEF cho tất cả quái thú cùng thuộc tính trên sân. Không thể bị tiêu diệt bởi đòn tấn công đầu tiên mỗi lượt.",
    "scientificLore": "Kỵ Sĩ Mạng Tinh Thể Muối Ăn đại diện cho giới hạn cực đại của liên kết hóa học (Na⁺(fcc) + Cl⁻(fcc) Lattice), độ cứng tinh thể hoặc khả năng nhường proton mạnh nhất trong tự nhiên theo GDPT 2018.",
    "relatedEquation": "Na⁺(fcc) + Cl⁻(fcc) Lattice",
    "iupacName": "Halite Crystal Knight Sovereign",
    "archetype": "CRYSTAL_LATTICE",
    "structuredEffects": [
      {
        "effectId": "B10_EFF_83",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "DEF",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 400 DEF cho toàn thể đồng minh bằng mạng tinh thể."
      }
    ]
  },
  {
    "id": "card_b10_084_magnesium_flare_king_84",
    "name": "Vua Lửa Magie Pháo Sáng — Bậc 9",
    "name_en": "Magnesium Flare King — Tier 9",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SECRET_RARE",
    "attribute": "PYRO",
    "manaCost": 6,
    "level": 7,
    "atk": 3260,
    "def": 3320,
    "chemicalFormula": "MgO(s)",
    "effectCode": "ELEM_B10_MAGNESIUM_FLARE_KING_GUARD_84",
    "effectText": "Bảo vệ mạng tinh thể nguyên tố: Tăng 400 DEF cho tất cả quái thú cùng thuộc tính trên sân. Không thể bị tiêu diệt bởi đòn tấn công đầu tiên mỗi lượt.",
    "scientificLore": "Vua Lửa Magie Pháo Sáng đại diện cho giới hạn cực đại của liên kết hóa học (2Mg + O₂ → 2MgO + 1204 kJ), độ cứng tinh thể hoặc khả năng nhường proton mạnh nhất trong tự nhiên theo GDPT 2018.",
    "relatedEquation": "2Mg + O₂ → 2MgO + 1204 kJ",
    "iupacName": "Magnesium Flare King Sovereign",
    "archetype": "SUPERACID_EXTREME",
    "structuredEffects": [
      {
        "effectId": "B10_EFF_84",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "DEF",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 400 DEF cho toàn thể đồng minh bằng mạng tinh thể."
      }
    ]
  },
  {
    "id": "card_b10_085_hydrolysis_dragon_king_85",
    "name": "Long Vương Thủy Phân Điện Phân — Bậc 9",
    "name_en": "Hydrolysis Dragon King — Tier 9",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "AQUA",
    "manaCost": 7,
    "level": 8,
    "atk": 3340,
    "def": 3600,
    "chemicalFormula": "2H2O",
    "effectCode": "ELEM_B10_HYDROLYSIS_DRAGON_KING_GUARD_85",
    "effectText": "Bảo vệ mạng tinh thể nguyên tố: Tăng 400 DEF cho tất cả quái thú cùng thuộc tính trên sân. Không thể bị tiêu diệt bởi đòn tấn công đầu tiên mỗi lượt.",
    "scientificLore": "Long Vương Thủy Phân Điện Phân đại diện cho giới hạn cực đại của liên kết hóa học (2H₂O --electrolysis--> 2H₂ + O₂), độ cứng tinh thể hoặc khả năng nhường proton mạnh nhất trong tự nhiên theo GDPT 2018.",
    "relatedEquation": "2H₂O --electrolysis--> 2H₂ + O₂",
    "iupacName": "Hydrolysis Dragon King Sovereign",
    "archetype": "CRYSTAL_LATTICE",
    "structuredEffects": [
      {
        "effectId": "B10_EFF_85",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "DEF",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 400 DEF cho toàn thể đồng minh bằng mạng tinh thể."
      }
    ]
  },
  {
    "id": "card_b10_086_halogen_storm_supreme_86",
    "name": "Bão Tố Khí Halogen Cực Đại — Bậc 9",
    "name_en": "Halogen Storm Supreme — Tier 9",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "AERO",
    "manaCost": 3,
    "level": 4,
    "atk": 2470,
    "def": 2480,
    "chemicalFormula": "Cl2/Br2/I2",
    "effectCode": "ELEM_B10_HALOGEN_STORM_SUPREME_GUARD_86",
    "effectText": "Bảo vệ mạng tinh thể nguyên tố: Tăng 400 DEF cho tất cả quái thú cùng thuộc tính trên sân. Không thể bị tiêu diệt bởi đòn tấn công đầu tiên mỗi lượt.",
    "scientificLore": "Bão Tố Khí Halogen Cực Đại đại diện cho giới hạn cực đại của liên kết hóa học (Electronegativity Cascade), độ cứng tinh thể hoặc khả năng nhường proton mạnh nhất trong tự nhiên theo GDPT 2018.",
    "relatedEquation": "Electronegativity Cascade",
    "iupacName": "Halogen Storm Supreme Sovereign",
    "archetype": "CRYSTAL_LATTICE",
    "structuredEffects": [
      {
        "effectId": "B10_EFF_86",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "DEF",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 400 DEF cho toàn thể đồng minh bằng mạng tinh thể."
      }
    ]
  },
  {
    "id": "card_b10_087_lithium_galvanic_titan_87",
    "name": "Thần Sấm Pin Galvanic Lithium — Bậc 9",
    "name_en": "Lithium Galvanic Titan — Tier 9",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "ELECTRO",
    "manaCost": 4,
    "level": 5,
    "atk": 2750,
    "def": 2760,
    "chemicalFormula": "Li/Li+",
    "effectCode": "ELEM_B10_LITHIUM_GALVANIC_TITAN_GUARD_87",
    "effectText": "Bảo vệ mạng tinh thể nguyên tố: Tăng 400 DEF cho tất cả quái thú cùng thuộc tính trên sân. Không thể bị tiêu diệt bởi đòn tấn công đầu tiên mỗi lượt.",
    "scientificLore": "Thần Sấm Pin Galvanic Lithium đại diện cho giới hạn cực đại của liên kết hóa học (Li → Li⁺ + e⁻ (E° = -3.04V)), độ cứng tinh thể hoặc khả năng nhường proton mạnh nhất trong tự nhiên theo GDPT 2018.",
    "relatedEquation": "Li → Li⁺ + e⁻ (E° = -3.04V)",
    "iupacName": "Lithium Galvanic Titan Sovereign",
    "archetype": "CRYSTAL_LATTICE",
    "structuredEffects": [
      {
        "effectId": "B10_EFF_87",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "DEF",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 400 DEF cho toàn thể đồng minh bằng mạng tinh thể."
      }
    ]
  },
  {
    "id": "card_b10_088_bond_enthalpy_protector_88",
    "name": "Hộ Pháp Năng Lượng Liên Kết — Bậc 9",
    "name_en": "Bond Enthalpy Protector — Tier 9",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "PYRO",
    "manaCost": 5,
    "level": 6,
    "atk": 3030,
    "def": 3040,
    "chemicalFormula": "ΔH_bond",
    "effectCode": "ELEM_B10_BOND_ENTHALPY_PROTECTOR_GUARD_88",
    "effectText": "Bảo vệ mạng tinh thể nguyên tố: Tăng 400 DEF cho tất cả quái thú cùng thuộc tính trên sân. Không thể bị tiêu diệt bởi đòn tấn công đầu tiên mỗi lượt.",
    "scientificLore": "Hộ Pháp Năng Lượng Liên Kết đại diện cho giới hạn cực đại của liên kết hóa học (ΔH_rxn = ∑Eb(react) - ∑Eb(prod)), độ cứng tinh thể hoặc khả năng nhường proton mạnh nhất trong tự nhiên theo GDPT 2018.",
    "relatedEquation": "ΔH_rxn = ∑Eb(react) - ∑Eb(prod)",
    "iupacName": "Bond Enthalpy Protector Sovereign",
    "archetype": "CRYSTAL_LATTICE",
    "structuredEffects": [
      {
        "effectId": "B10_EFF_88",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "DEF",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 400 DEF cho toàn thể đồng minh bằng mạng tinh thể."
      }
    ]
  },
  {
    "id": "card_b10_089_dry_ice_sublimation_phantom_89",
    "name": "Bóng Ma Tinh Thể Băng Khô — Bậc 9",
    "name_en": "Dry Ice Sublimation Phantom — Tier 9",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "AERO",
    "manaCost": 6,
    "level": 7,
    "atk": 3110,
    "def": 3320,
    "chemicalFormula": "CO2(s)",
    "effectCode": "ELEM_B10_DRY_ICE_SUBLIMATION_PHANTOM_GUARD_89",
    "effectText": "Bảo vệ mạng tinh thể nguyên tố: Tăng 400 DEF cho tất cả quái thú cùng thuộc tính trên sân. Không thể bị tiêu diệt bởi đòn tấn công đầu tiên mỗi lượt.",
    "scientificLore": "Bóng Ma Tinh Thể Băng Khô đại diện cho giới hạn cực đại của liên kết hóa học (CO₂(s) → CO₂(g) (-78.5°C)), độ cứng tinh thể hoặc khả năng nhường proton mạnh nhất trong tự nhiên theo GDPT 2018.",
    "relatedEquation": "CO₂(s) → CO₂(g) (-78.5°C)",
    "iupacName": "Dry Ice Sublimation Phantom Sovereign",
    "archetype": "CRYSTAL_LATTICE",
    "structuredEffects": [
      {
        "effectId": "B10_EFF_89",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "DEF",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 400 DEF cho toàn thể đồng minh bằng mạng tinh thể."
      }
    ]
  },
  {
    "id": "card_b10_090_kevlar_armor_bastion_90",
    "name": "Vệ Thần Polyme Kevlar Chống Đạn — Bậc 9",
    "name_en": "Kevlar Armor Bastion — Tier 9",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "NOBLE_VOID",
    "manaCost": 7,
    "level": 8,
    "atk": 3390,
    "def": 3600,
    "chemicalFormula": "Aramid",
    "effectCode": "ELEM_B10_KEVLAR_ARMOR_BASTION_GUARD_90",
    "effectText": "Bảo vệ mạng tinh thể nguyên tố: Tăng 400 DEF cho tất cả quái thú cùng thuộc tính trên sân. Không thể bị tiêu diệt bởi đòn tấn công đầu tiên mỗi lượt.",
    "scientificLore": "Vệ Thần Polyme Kevlar Chống Đạn đại diện cho giới hạn cực đại của liên kết hóa học (Interchain Hydrogen Bonding Network), độ cứng tinh thể hoặc khả năng nhường proton mạnh nhất trong tự nhiên theo GDPT 2018.",
    "relatedEquation": "Interchain Hydrogen Bonding Network",
    "iupacName": "Kevlar Armor Bastion Sovereign",
    "archetype": "CRYSTAL_LATTICE",
    "structuredEffects": [
      {
        "effectId": "B10_EFF_90",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "DEF",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 400 DEF cho toàn thể đồng minh bằng mạng tinh thể."
      }
    ]
  },
  {
    "id": "card_b10_091_diamond_lattice_guardian_91",
    "name": "Hộ Vệ Tinh Thể Kim Cương — Bậc 10",
    "name_en": "Diamond Lattice Guardian — Tier 10",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "NOBLE_VOID",
    "manaCost": 3,
    "level": 4,
    "atk": 2520,
    "def": 2480,
    "chemicalFormula": "C(diamond)",
    "effectCode": "ELEM_B10_DIAMOND_LATTICE_GUARDIAN_GUARD_91",
    "effectText": "Bảo vệ mạng tinh thể nguyên tố: Tăng 400 DEF cho tất cả quái thú cùng thuộc tính trên sân. Không thể bị tiêu diệt bởi đòn tấn công đầu tiên mỗi lượt.",
    "scientificLore": "Hộ Vệ Tinh Thể Kim Cương đại diện cho giới hạn cực đại của liên kết hóa học (Giant Covalent 3D Network), độ cứng tinh thể hoặc khả năng nhường proton mạnh nhất trong tự nhiên theo GDPT 2018.",
    "relatedEquation": "Giant Covalent 3D Network",
    "iupacName": "Diamond Lattice Guardian Sovereign",
    "archetype": "CRYSTAL_LATTICE",
    "structuredEffects": [
      {
        "effectId": "B10_EFF_91",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "DEF",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 400 DEF cho toàn thể đồng minh bằng mạng tinh thể."
      }
    ]
  },
  {
    "id": "card_b10_092_fluoroantimonic_superacid_sovereign_92",
    "name": "Chúa Tể Siêu Axit Fluoroantimonic — Bậc 10",
    "name_en": "Fluoroantimonic Superacid Sovereign — Tier 10",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "ULTRA_RARE",
    "attribute": "ACID_DARK",
    "manaCost": 4,
    "level": 5,
    "atk": 2800,
    "def": 2760,
    "chemicalFormula": "HSbF6",
    "effectCode": "ELEM_B10_FLUOROANTIMONIC_SUPERACID_SOVEREIGN_GUARD_92",
    "effectText": "Bảo vệ mạng tinh thể nguyên tố: Tăng 400 DEF cho tất cả quái thú cùng thuộc tính trên sân. Không thể bị tiêu diệt bởi đòn tấn công đầu tiên mỗi lượt.",
    "scientificLore": "Chúa Tể Siêu Axit Fluoroantimonic đại diện cho giới hạn cực đại của liên kết hóa học (HF + SbF₅ ⇌ H₂F⁺ + SbF₆⁻ (H₀ = -31.3)), độ cứng tinh thể hoặc khả năng nhường proton mạnh nhất trong tự nhiên theo GDPT 2018.",
    "relatedEquation": "HF + SbF₅ ⇌ H₂F⁺ + SbF₆⁻ (H₀ = -31.3)",
    "iupacName": "Fluoroantimonic Superacid Sovereign Sovereign",
    "archetype": "SUPERACID_EXTREME",
    "structuredEffects": [
      {
        "effectId": "B10_EFF_92",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "DEF",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 400 DEF cho toàn thể đồng minh bằng mạng tinh thể."
      }
    ]
  },
  {
    "id": "card_b10_093_halite_crystal_knight_93",
    "name": "Kỵ Sĩ Mạng Tinh Thể Muối Ăn — Bậc 10",
    "name_en": "Halite Crystal Knight — Tier 10",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SECRET_RARE",
    "attribute": "TERRA",
    "manaCost": 5,
    "level": 6,
    "atk": 2880,
    "def": 3040,
    "chemicalFormula": "NaCl(s)",
    "effectCode": "ELEM_B10_HALITE_CRYSTAL_KNIGHT_GUARD_93",
    "effectText": "Bảo vệ mạng tinh thể nguyên tố: Tăng 400 DEF cho tất cả quái thú cùng thuộc tính trên sân. Không thể bị tiêu diệt bởi đòn tấn công đầu tiên mỗi lượt.",
    "scientificLore": "Kỵ Sĩ Mạng Tinh Thể Muối Ăn đại diện cho giới hạn cực đại của liên kết hóa học (Na⁺(fcc) + Cl⁻(fcc) Lattice), độ cứng tinh thể hoặc khả năng nhường proton mạnh nhất trong tự nhiên theo GDPT 2018.",
    "relatedEquation": "Na⁺(fcc) + Cl⁻(fcc) Lattice",
    "iupacName": "Halite Crystal Knight Sovereign",
    "archetype": "CRYSTAL_LATTICE",
    "structuredEffects": [
      {
        "effectId": "B10_EFF_93",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "DEF",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 400 DEF cho toàn thể đồng minh bằng mạng tinh thể."
      }
    ]
  },
  {
    "id": "card_b10_094_magnesium_flare_king_94",
    "name": "Vua Lửa Magie Pháo Sáng — Bậc 10",
    "name_en": "Magnesium Flare King — Tier 10",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "PYRO",
    "manaCost": 6,
    "level": 7,
    "atk": 3160,
    "def": 3320,
    "chemicalFormula": "MgO(s)",
    "effectCode": "ELEM_B10_MAGNESIUM_FLARE_KING_GUARD_94",
    "effectText": "Bảo vệ mạng tinh thể nguyên tố: Tăng 400 DEF cho tất cả quái thú cùng thuộc tính trên sân. Không thể bị tiêu diệt bởi đòn tấn công đầu tiên mỗi lượt.",
    "scientificLore": "Vua Lửa Magie Pháo Sáng đại diện cho giới hạn cực đại của liên kết hóa học (2Mg + O₂ → 2MgO + 1204 kJ), độ cứng tinh thể hoặc khả năng nhường proton mạnh nhất trong tự nhiên theo GDPT 2018.",
    "relatedEquation": "2Mg + O₂ → 2MgO + 1204 kJ",
    "iupacName": "Magnesium Flare King Sovereign",
    "archetype": "SUPERACID_EXTREME",
    "structuredEffects": [
      {
        "effectId": "B10_EFF_94",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "DEF",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 400 DEF cho toàn thể đồng minh bằng mạng tinh thể."
      }
    ]
  },
  {
    "id": "card_b10_095_hydrolysis_dragon_king_95",
    "name": "Long Vương Thủy Phân Điện Phân — Bậc 10",
    "name_en": "Hydrolysis Dragon King — Tier 10",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "AQUA",
    "manaCost": 7,
    "level": 8,
    "atk": 3440,
    "def": 3600,
    "chemicalFormula": "2H2O",
    "effectCode": "ELEM_B10_HYDROLYSIS_DRAGON_KING_GUARD_95",
    "effectText": "Bảo vệ mạng tinh thể nguyên tố: Tăng 400 DEF cho tất cả quái thú cùng thuộc tính trên sân. Không thể bị tiêu diệt bởi đòn tấn công đầu tiên mỗi lượt.",
    "scientificLore": "Long Vương Thủy Phân Điện Phân đại diện cho giới hạn cực đại của liên kết hóa học (2H₂O --electrolysis--> 2H₂ + O₂), độ cứng tinh thể hoặc khả năng nhường proton mạnh nhất trong tự nhiên theo GDPT 2018.",
    "relatedEquation": "2H₂O --electrolysis--> 2H₂ + O₂",
    "iupacName": "Hydrolysis Dragon King Sovereign",
    "archetype": "CRYSTAL_LATTICE",
    "structuredEffects": [
      {
        "effectId": "B10_EFF_95",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "DEF",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 400 DEF cho toàn thể đồng minh bằng mạng tinh thể."
      }
    ]
  },
  {
    "id": "card_b10_096_halogen_storm_supreme_96",
    "name": "Bão Tố Khí Halogen Cực Đại — Bậc 10",
    "name_en": "Halogen Storm Supreme — Tier 10",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "AERO",
    "manaCost": 3,
    "level": 4,
    "atk": 2570,
    "def": 2480,
    "chemicalFormula": "Cl2/Br2/I2",
    "effectCode": "ELEM_B10_HALOGEN_STORM_SUPREME_GUARD_96",
    "effectText": "Bảo vệ mạng tinh thể nguyên tố: Tăng 400 DEF cho tất cả quái thú cùng thuộc tính trên sân. Không thể bị tiêu diệt bởi đòn tấn công đầu tiên mỗi lượt.",
    "scientificLore": "Bão Tố Khí Halogen Cực Đại đại diện cho giới hạn cực đại của liên kết hóa học (Electronegativity Cascade), độ cứng tinh thể hoặc khả năng nhường proton mạnh nhất trong tự nhiên theo GDPT 2018.",
    "relatedEquation": "Electronegativity Cascade",
    "iupacName": "Halogen Storm Supreme Sovereign",
    "archetype": "CRYSTAL_LATTICE",
    "structuredEffects": [
      {
        "effectId": "B10_EFF_96",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "DEF",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 400 DEF cho toàn thể đồng minh bằng mạng tinh thể."
      }
    ]
  },
  {
    "id": "card_b10_097_lithium_galvanic_titan_97",
    "name": "Thần Sấm Pin Galvanic Lithium — Bậc 10",
    "name_en": "Lithium Galvanic Titan — Tier 10",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "ELECTRO",
    "manaCost": 4,
    "level": 5,
    "atk": 2650,
    "def": 2760,
    "chemicalFormula": "Li/Li+",
    "effectCode": "ELEM_B10_LITHIUM_GALVANIC_TITAN_GUARD_97",
    "effectText": "Bảo vệ mạng tinh thể nguyên tố: Tăng 400 DEF cho tất cả quái thú cùng thuộc tính trên sân. Không thể bị tiêu diệt bởi đòn tấn công đầu tiên mỗi lượt.",
    "scientificLore": "Thần Sấm Pin Galvanic Lithium đại diện cho giới hạn cực đại của liên kết hóa học (Li → Li⁺ + e⁻ (E° = -3.04V)), độ cứng tinh thể hoặc khả năng nhường proton mạnh nhất trong tự nhiên theo GDPT 2018.",
    "relatedEquation": "Li → Li⁺ + e⁻ (E° = -3.04V)",
    "iupacName": "Lithium Galvanic Titan Sovereign",
    "archetype": "CRYSTAL_LATTICE",
    "structuredEffects": [
      {
        "effectId": "B10_EFF_97",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "DEF",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 400 DEF cho toàn thể đồng minh bằng mạng tinh thể."
      }
    ]
  },
  {
    "id": "card_b10_098_bond_enthalpy_protector_98",
    "name": "Hộ Pháp Năng Lượng Liên Kết — Bậc 10",
    "name_en": "Bond Enthalpy Protector — Tier 10",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "PYRO",
    "manaCost": 5,
    "level": 6,
    "atk": 2930,
    "def": 3040,
    "chemicalFormula": "ΔH_bond",
    "effectCode": "ELEM_B10_BOND_ENTHALPY_PROTECTOR_GUARD_98",
    "effectText": "Bảo vệ mạng tinh thể nguyên tố: Tăng 400 DEF cho tất cả quái thú cùng thuộc tính trên sân. Không thể bị tiêu diệt bởi đòn tấn công đầu tiên mỗi lượt.",
    "scientificLore": "Hộ Pháp Năng Lượng Liên Kết đại diện cho giới hạn cực đại của liên kết hóa học (ΔH_rxn = ∑Eb(react) - ∑Eb(prod)), độ cứng tinh thể hoặc khả năng nhường proton mạnh nhất trong tự nhiên theo GDPT 2018.",
    "relatedEquation": "ΔH_rxn = ∑Eb(react) - ∑Eb(prod)",
    "iupacName": "Bond Enthalpy Protector Sovereign",
    "archetype": "CRYSTAL_LATTICE",
    "structuredEffects": [
      {
        "effectId": "B10_EFF_98",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "DEF",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 400 DEF cho toàn thể đồng minh bằng mạng tinh thể."
      }
    ]
  },
  {
    "id": "card_b10_099_dry_ice_sublimation_phantom_99",
    "name": "Bóng Ma Tinh Thể Băng Khô — Bậc 10",
    "name_en": "Dry Ice Sublimation Phantom — Tier 10",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "AERO",
    "manaCost": 6,
    "level": 7,
    "atk": 3210,
    "def": 3320,
    "chemicalFormula": "CO2(s)",
    "effectCode": "ELEM_B10_DRY_ICE_SUBLIMATION_PHANTOM_GUARD_99",
    "effectText": "Bảo vệ mạng tinh thể nguyên tố: Tăng 400 DEF cho tất cả quái thú cùng thuộc tính trên sân. Không thể bị tiêu diệt bởi đòn tấn công đầu tiên mỗi lượt.",
    "scientificLore": "Bóng Ma Tinh Thể Băng Khô đại diện cho giới hạn cực đại của liên kết hóa học (CO₂(s) → CO₂(g) (-78.5°C)), độ cứng tinh thể hoặc khả năng nhường proton mạnh nhất trong tự nhiên theo GDPT 2018.",
    "relatedEquation": "CO₂(s) → CO₂(g) (-78.5°C)",
    "iupacName": "Dry Ice Sublimation Phantom Sovereign",
    "archetype": "CRYSTAL_LATTICE",
    "structuredEffects": [
      {
        "effectId": "B10_EFF_99",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "DEF",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 400 DEF cho toàn thể đồng minh bằng mạng tinh thể."
      }
    ]
  },
  {
    "id": "card_b10_100_kevlar_armor_bastion_100",
    "name": "Vệ Thần Polyme Kevlar Chống Đạn — Bậc 10",
    "name_en": "Kevlar Armor Bastion — Tier 10",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "NOBLE_VOID",
    "manaCost": 7,
    "level": 8,
    "atk": 3490,
    "def": 3600,
    "chemicalFormula": "Aramid",
    "effectCode": "ELEM_B10_KEVLAR_ARMOR_BASTION_GUARD_100",
    "effectText": "Bảo vệ mạng tinh thể nguyên tố: Tăng 400 DEF cho tất cả quái thú cùng thuộc tính trên sân. Không thể bị tiêu diệt bởi đòn tấn công đầu tiên mỗi lượt.",
    "scientificLore": "Vệ Thần Polyme Kevlar Chống Đạn đại diện cho giới hạn cực đại của liên kết hóa học (Interchain Hydrogen Bonding Network), độ cứng tinh thể hoặc khả năng nhường proton mạnh nhất trong tự nhiên theo GDPT 2018.",
    "relatedEquation": "Interchain Hydrogen Bonding Network",
    "iupacName": "Kevlar Armor Bastion Sovereign",
    "archetype": "CRYSTAL_LATTICE",
    "structuredEffects": [
      {
        "effectId": "B10_EFF_100",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "DEF",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 400 DEF cho toàn thể đồng minh bằng mạng tinh thể."
      }
    ]
  }
];
