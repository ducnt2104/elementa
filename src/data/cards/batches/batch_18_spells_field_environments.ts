// src/data/cards/batches/batch_18_spells_field_environments.ts
// Batch 18: Field Environment Spells (80 cards)
// Automatically generated and validated for ELEMENTA Tactical TCG

import { PlayableCardDef } from '../../../domain/cardGameTypes';

export const BATCH_18_CARDS: PlayableCardDef[] = [
  {
    "id": "card_b18_001_field_hydration_solvation_sphere_domain_1",
    "name": "Vỏ Dung Môi Hydrat Hóa Solvation (Địa Bàn 1)",
    "name_en": "Hydration Solvation Sphere Domain (Field 1)",
    "cardType": "FIELD_ENVIRONMENT",
    "spellTrapSubtype": "FIELD_SPELL",
    "spellSpeed": 1,
    "rarity": "RARE",
    "attribute": "AQUA",
    "manaCost": 2,
    "chemicalFormula": "[M(H2O)6]n+",
    "effectCode": "SPELL_B18_HYDRATION_SOLVATION_SPHERE_DOMAIN_FIELD_1",
    "effectText": "[Phép Môi Trường / Field]: Đặt vào Field Zone. Tất cả quái thú thuộc tính AQUA nhận +400 ATK và +400 DEF. Quái thú đối phương khác thuộc tính bị giảm 200 ATK khi tuyên bố tấn công.",
    "scientificLore": "Môi trường địa hóa / điện hóa Vỏ Dung Môi Hydrat Hóa Solvation (Ion-Dipole Solvent Shell Stabilization) quyết định trạng thái tồn tại, độ bền liên kết và cân bằng phản ứng hóa học theo SGK GDPT 2018.",
    "relatedEquation": "Ion-Dipole Solvent Shell Stabilization",
    "iupacName": "Hydration Solvation Sphere Domain Environment",
    "archetype": "SOLVATION_SPHERE",
    "structuredEffects": [
      {
        "effectId": "B18_EFF_1",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "BOTH",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 400 ATK/DEF cho toàn bộ đồng minh trong môi trường trường địa bàn."
      }
    ]
  },
  {
    "id": "card_b18_002_field_deep_sea_hydrothermal_vent_biosphere_2",
    "name": "Miệng Phun Thủy Nhiệt Đại Dương (Địa Bàn 1)",
    "name_en": "Deep Sea Hydrothermal Vent Biosphere (Field 1)",
    "cardType": "FIELD_ENVIRONMENT",
    "spellTrapSubtype": "FIELD_SPELL",
    "spellSpeed": 1,
    "rarity": "RARE",
    "attribute": "PYRO",
    "manaCost": 3,
    "chemicalFormula": "FeS-H2S Vent",
    "effectCode": "SPELL_B18_DEEP_SEA_HYDROTHERMAL_VENT_BIOSPHERE_FIELD_2",
    "effectText": "[Phép Môi Trường / Field]: Đặt vào Field Zone. Tất cả quái thú thuộc tính PYRO nhận +400 ATK và +400 DEF. Quái thú đối phương khác thuộc tính bị giảm 200 ATK khi tuyên bố tấn công.",
    "scientificLore": "Môi trường địa hóa / điện hóa Miệng Phun Thủy Nhiệt Đại Dương (Prebiotic Chemosynthesis Matrix at 350°C) quyết định trạng thái tồn tại, độ bền liên kết và cân bằng phản ứng hóa học theo SGK GDPT 2018.",
    "relatedEquation": "Prebiotic Chemosynthesis Matrix at 350°C",
    "iupacName": "Deep Sea Hydrothermal Vent Biosphere Environment",
    "archetype": "COLLOIDAL_SOL",
    "structuredEffects": [
      {
        "effectId": "B18_EFF_2",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "BOTH",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 400 ATK/DEF cho toàn bộ đồng minh trong môi trường trường địa bàn."
      }
    ]
  },
  {
    "id": "card_b18_003_field_galvanic_electroplating_bath_chamber_3",
    "name": "Bể Điện Hóa Galvanic Mạ Kền (Địa Bàn 1)",
    "name_en": "Galvanic Electroplating Bath Chamber (Field 1)",
    "cardType": "FIELD_ENVIRONMENT",
    "spellTrapSubtype": "FIELD_SPELL",
    "spellSpeed": 1,
    "rarity": "SUPER_RARE",
    "attribute": "ELECTRO",
    "manaCost": 4,
    "chemicalFormula": "NiSO4 Electrolyte",
    "effectCode": "SPELL_B18_GALVANIC_ELECTROPLATING_BATH_CHAMBER_FIELD_3",
    "effectText": "[Phép Môi Trường / Field]: Đặt vào Field Zone. Tất cả quái thú thuộc tính ELECTRO nhận +400 ATK và +400 DEF. Quái thú đối phương khác thuộc tính bị giảm 200 ATK khi tuyên bố tấn công.",
    "scientificLore": "Môi trường địa hóa / điện hóa Bể Điện Hóa Galvanic Mạ Kền (Faraday Law Cathodic Deposition m = (AIt)/(nF)) quyết định trạng thái tồn tại, độ bền liên kết và cân bằng phản ứng hóa học theo SGK GDPT 2018.",
    "relatedEquation": "Faraday Law Cathodic Deposition m = (AIt)/(nF)",
    "iupacName": "Galvanic Electroplating Bath Chamber Environment",
    "archetype": "FLUORESCENCE_SPECTRA",
    "structuredEffects": [
      {
        "effectId": "B18_EFF_3",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "BOTH",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 400 ATK/DEF cho toàn bộ đồng minh trong môi trường trường địa bàn."
      }
    ]
  },
  {
    "id": "card_b18_004_field_cryogenic_argon_isolation_matrix_4",
    "name": "Ma Trận Khí Trơ Nhiệt Độ Siêu Lạnh (Địa Bàn 1)",
    "name_en": "Cryogenic Argon Isolation Matrix (Field 1)",
    "cardType": "FIELD_ENVIRONMENT",
    "spellTrapSubtype": "FIELD_SPELL",
    "spellSpeed": 1,
    "rarity": "SUPER_RARE",
    "attribute": "NOBLE_VOID",
    "manaCost": 5,
    "chemicalFormula": "Ar(s) 10K",
    "effectCode": "SPELL_B18_CRYOGENIC_ARGON_ISOLATION_MATRIX_FIELD_4",
    "effectText": "[Phép Môi Trường / Field]: Đặt vào Field Zone. Tất cả quái thú thuộc tính NOBLE_VOID nhận +400 ATK và +400 DEF. Quái thú đối phương khác thuộc tính bị giảm 200 ATK khi tuyên bố tấn công.",
    "scientificLore": "Môi trường địa hóa / điện hóa Ma Trận Khí Trơ Nhiệt Độ Siêu Lạnh (Noble Gas Matrix Isolation of Reactive Radicals) quyết định trạng thái tồn tại, độ bền liên kết và cân bằng phản ứng hóa học theo SGK GDPT 2018.",
    "relatedEquation": "Noble Gas Matrix Isolation of Reactive Radicals",
    "iupacName": "Cryogenic Argon Isolation Matrix Environment",
    "archetype": "SOLVATION_SPHERE",
    "structuredEffects": [
      {
        "effectId": "B18_EFF_4",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "BOTH",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 400 ATK/DEF cho toàn bộ đồng minh trong môi trường trường địa bàn."
      }
    ]
  },
  {
    "id": "card_b18_005_field_acid_mine_drainage_pyrite_waste_5",
    "name": "Vùng Thoát Nước Mỏ Axit Cháy Rực (Địa Bàn 1)",
    "name_en": "Acid Mine Drainage Pyrite Waste (Field 1)",
    "cardType": "FIELD_ENVIRONMENT",
    "spellTrapSubtype": "FIELD_SPELL",
    "spellSpeed": 1,
    "rarity": "ULTRA_RARE",
    "attribute": "ACID_DARK",
    "manaCost": 2,
    "chemicalFormula": "FeS2 + O2 + H2O",
    "effectCode": "SPELL_B18_ACID_MINE_DRAINAGE_PYRITE_WASTE_FIELD_5",
    "effectText": "[Phép Môi Trường / Field]: Đặt vào Field Zone. Tất cả quái thú thuộc tính ACID_DARK nhận +400 ATK và +400 DEF. Quái thú đối phương khác thuộc tính bị giảm 200 ATK khi tuyên bố tấn công.",
    "scientificLore": "Môi trường địa hóa / điện hóa Vùng Thoát Nước Mỏ Axit Cháy Rực (2FeS₂ + 7O₂ + 2H₂O → 2Fe²⁺ + 4SO₄²⁻ + 4H⁺) quyết định trạng thái tồn tại, độ bền liên kết và cân bằng phản ứng hóa học theo SGK GDPT 2018.",
    "relatedEquation": "2FeS₂ + 7O₂ + 2H₂O → 2Fe²⁺ + 4SO₄²⁻ + 4H⁺",
    "iupacName": "Acid Mine Drainage Pyrite Waste Environment",
    "archetype": "COLLOIDAL_SOL",
    "structuredEffects": [
      {
        "effectId": "B18_EFF_5",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "BOTH",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 400 ATK/DEF cho toàn bộ đồng minh trong môi trường trường địa bàn."
      }
    ]
  },
  {
    "id": "card_b18_006_field_stratospheric_ozone_uv_shielding_6",
    "name": "Tầng Khí Quyển Ôzôn Hấp Thụ Tia Cực Tím (Địa Bàn 1)",
    "name_en": "Stratospheric Ozone UV Shielding (Field 1)",
    "cardType": "FIELD_ENVIRONMENT",
    "spellTrapSubtype": "FIELD_SPELL",
    "spellSpeed": 1,
    "rarity": "SECRET_RARE",
    "attribute": "AERO",
    "manaCost": 3,
    "chemicalFormula": "O3 Layer",
    "effectCode": "SPELL_B18_STRATOSPHERIC_OZONE_UV_SHIELDING_FIELD_6",
    "effectText": "[Phép Môi Trường / Field]: Đặt vào Field Zone. Tất cả quái thú thuộc tính AERO nhận +400 ATK và +400 DEF. Quái thú đối phương khác thuộc tính bị giảm 200 ATK khi tuyên bố tấn công.",
    "scientificLore": "Môi trường địa hóa / điện hóa Tầng Khí Quyển Ôzôn Hấp Thụ Tia Cực Tím (O₃ + hν(UV) → O₂ + O· Chapman Cycle) quyết định trạng thái tồn tại, độ bền liên kết và cân bằng phản ứng hóa học theo SGK GDPT 2018.",
    "relatedEquation": "O₃ + hν(UV) → O₂ + O· Chapman Cycle",
    "iupacName": "Stratospheric Ozone UV Shielding Environment",
    "archetype": "FLUORESCENCE_SPECTRA",
    "structuredEffects": [
      {
        "effectId": "B18_EFF_6",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "BOTH",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 400 ATK/DEF cho toàn bộ đồng minh trong môi trường trường địa bàn."
      }
    ]
  },
  {
    "id": "card_b18_007_field_tyndall_colloidal_aerosol_mist_7",
    "name": "Hệ Keo Khói Tyndall Tán Xạ (Địa Bàn 1)",
    "name_en": "Tyndall Colloidal Aerosol Mist (Field 1)",
    "cardType": "FIELD_ENVIRONMENT",
    "spellTrapSubtype": "FIELD_SPELL",
    "spellSpeed": 1,
    "rarity": "COMMON",
    "attribute": "AERO",
    "manaCost": 4,
    "chemicalFormula": "Colloidal Sol",
    "effectCode": "SPELL_B18_TYNDALL_COLLOIDAL_AEROSOL_MIST_FIELD_7",
    "effectText": "[Phép Môi Trường / Field]: Đặt vào Field Zone. Tất cả quái thú thuộc tính AERO nhận +400 ATK và +400 DEF. Quái thú đối phương khác thuộc tính bị giảm 200 ATK khi tuyên bố tấn công.",
    "scientificLore": "Môi trường địa hóa / điện hóa Hệ Keo Khói Tyndall Tán Xạ (Rayleigh/Tyndall Elastic Light Scattering) quyết định trạng thái tồn tại, độ bền liên kết và cân bằng phản ứng hóa học theo SGK GDPT 2018.",
    "relatedEquation": "Rayleigh/Tyndall Elastic Light Scattering",
    "iupacName": "Tyndall Colloidal Aerosol Mist Environment",
    "archetype": "SOLVATION_SPHERE",
    "structuredEffects": [
      {
        "effectId": "B18_EFF_7",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "BOTH",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 400 ATK/DEF cho toàn bộ đồng minh trong môi trường trường địa bàn."
      }
    ]
  },
  {
    "id": "card_b18_008_field_dead_sea_hypersaline_crystallization_basin_8",
    "name": "Hồ Tinh Thể Muối Bão Hòa Biển Chết (Địa Bàn 1)",
    "name_en": "Dead Sea Hypersaline Crystallization Basin (Field 1)",
    "cardType": "FIELD_ENVIRONMENT",
    "spellTrapSubtype": "FIELD_SPELL",
    "spellSpeed": 1,
    "rarity": "COMMON",
    "attribute": "TERRA",
    "manaCost": 5,
    "chemicalFormula": "NaCl-KCl-MgCl2",
    "effectCode": "SPELL_B18_DEAD_SEA_HYPERSALINE_CRYSTALLIZATION_BASIN_FIELD_8",
    "effectText": "[Phép Môi Trường / Field]: Đặt vào Field Zone. Tất cả quái thú thuộc tính TERRA nhận +400 ATK và +400 DEF. Quái thú đối phương khác thuộc tính bị giảm 200 ATK khi tuyên bố tấn công.",
    "scientificLore": "Môi trường địa hóa / điện hóa Hồ Tinh Thể Muối Bão Hòa Biển Chết (Fractional Halite Sylvite Evaporite Precipitation) quyết định trạng thái tồn tại, độ bền liên kết và cân bằng phản ứng hóa học theo SGK GDPT 2018.",
    "relatedEquation": "Fractional Halite Sylvite Evaporite Precipitation",
    "iupacName": "Dead Sea Hypersaline Crystallization Basin Environment",
    "archetype": "COLLOIDAL_SOL",
    "structuredEffects": [
      {
        "effectId": "B18_EFF_8",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "BOTH",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 400 ATK/DEF cho toàn bộ đồng minh trong môi trường trường địa bàn."
      }
    ]
  },
  {
    "id": "card_b18_009_field_hydration_solvation_sphere_domain_9",
    "name": "Vỏ Dung Môi Hydrat Hóa Solvation (Địa Bàn 2)",
    "name_en": "Hydration Solvation Sphere Domain (Field 2)",
    "cardType": "FIELD_ENVIRONMENT",
    "spellTrapSubtype": "FIELD_SPELL",
    "spellSpeed": 1,
    "rarity": "COMMON",
    "attribute": "AQUA",
    "manaCost": 2,
    "chemicalFormula": "[M(H2O)6]n+",
    "effectCode": "SPELL_B18_HYDRATION_SOLVATION_SPHERE_DOMAIN_FIELD_9",
    "effectText": "[Phép Môi Trường / Field]: Đặt vào Field Zone. Tất cả quái thú thuộc tính AQUA nhận +400 ATK và +400 DEF. Quái thú đối phương khác thuộc tính bị giảm 200 ATK khi tuyên bố tấn công.",
    "scientificLore": "Môi trường địa hóa / điện hóa Vỏ Dung Môi Hydrat Hóa Solvation (Ion-Dipole Solvent Shell Stabilization) quyết định trạng thái tồn tại, độ bền liên kết và cân bằng phản ứng hóa học theo SGK GDPT 2018.",
    "relatedEquation": "Ion-Dipole Solvent Shell Stabilization",
    "iupacName": "Hydration Solvation Sphere Domain Environment",
    "archetype": "FLUORESCENCE_SPECTRA",
    "structuredEffects": [
      {
        "effectId": "B18_EFF_9",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "BOTH",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 400 ATK/DEF cho toàn bộ đồng minh trong môi trường trường địa bàn."
      }
    ]
  },
  {
    "id": "card_b18_010_field_deep_sea_hydrothermal_vent_biosphere_10",
    "name": "Miệng Phun Thủy Nhiệt Đại Dương (Địa Bàn 2)",
    "name_en": "Deep Sea Hydrothermal Vent Biosphere (Field 2)",
    "cardType": "FIELD_ENVIRONMENT",
    "spellTrapSubtype": "FIELD_SPELL",
    "spellSpeed": 1,
    "rarity": "RARE",
    "attribute": "PYRO",
    "manaCost": 3,
    "chemicalFormula": "FeS-H2S Vent",
    "effectCode": "SPELL_B18_DEEP_SEA_HYDROTHERMAL_VENT_BIOSPHERE_FIELD_10",
    "effectText": "[Phép Môi Trường / Field]: Đặt vào Field Zone. Tất cả quái thú thuộc tính PYRO nhận +400 ATK và +400 DEF. Quái thú đối phương khác thuộc tính bị giảm 200 ATK khi tuyên bố tấn công.",
    "scientificLore": "Môi trường địa hóa / điện hóa Miệng Phun Thủy Nhiệt Đại Dương (Prebiotic Chemosynthesis Matrix at 350°C) quyết định trạng thái tồn tại, độ bền liên kết và cân bằng phản ứng hóa học theo SGK GDPT 2018.",
    "relatedEquation": "Prebiotic Chemosynthesis Matrix at 350°C",
    "iupacName": "Deep Sea Hydrothermal Vent Biosphere Environment",
    "archetype": "SOLVATION_SPHERE",
    "structuredEffects": [
      {
        "effectId": "B18_EFF_10",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "BOTH",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 400 ATK/DEF cho toàn bộ đồng minh trong môi trường trường địa bàn."
      }
    ]
  },
  {
    "id": "card_b18_011_field_galvanic_electroplating_bath_chamber_11",
    "name": "Bể Điện Hóa Galvanic Mạ Kền (Địa Bàn 2)",
    "name_en": "Galvanic Electroplating Bath Chamber (Field 2)",
    "cardType": "FIELD_ENVIRONMENT",
    "spellTrapSubtype": "FIELD_SPELL",
    "spellSpeed": 1,
    "rarity": "RARE",
    "attribute": "ELECTRO",
    "manaCost": 4,
    "chemicalFormula": "NiSO4 Electrolyte",
    "effectCode": "SPELL_B18_GALVANIC_ELECTROPLATING_BATH_CHAMBER_FIELD_11",
    "effectText": "[Phép Môi Trường / Field]: Đặt vào Field Zone. Tất cả quái thú thuộc tính ELECTRO nhận +400 ATK và +400 DEF. Quái thú đối phương khác thuộc tính bị giảm 200 ATK khi tuyên bố tấn công.",
    "scientificLore": "Môi trường địa hóa / điện hóa Bể Điện Hóa Galvanic Mạ Kền (Faraday Law Cathodic Deposition m = (AIt)/(nF)) quyết định trạng thái tồn tại, độ bền liên kết và cân bằng phản ứng hóa học theo SGK GDPT 2018.",
    "relatedEquation": "Faraday Law Cathodic Deposition m = (AIt)/(nF)",
    "iupacName": "Galvanic Electroplating Bath Chamber Environment",
    "archetype": "COLLOIDAL_SOL",
    "structuredEffects": [
      {
        "effectId": "B18_EFF_11",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "BOTH",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 400 ATK/DEF cho toàn bộ đồng minh trong môi trường trường địa bàn."
      }
    ]
  },
  {
    "id": "card_b18_012_field_cryogenic_argon_isolation_matrix_12",
    "name": "Ma Trận Khí Trơ Nhiệt Độ Siêu Lạnh (Địa Bàn 2)",
    "name_en": "Cryogenic Argon Isolation Matrix (Field 2)",
    "cardType": "FIELD_ENVIRONMENT",
    "spellTrapSubtype": "FIELD_SPELL",
    "spellSpeed": 1,
    "rarity": "SUPER_RARE",
    "attribute": "NOBLE_VOID",
    "manaCost": 5,
    "chemicalFormula": "Ar(s) 10K",
    "effectCode": "SPELL_B18_CRYOGENIC_ARGON_ISOLATION_MATRIX_FIELD_12",
    "effectText": "[Phép Môi Trường / Field]: Đặt vào Field Zone. Tất cả quái thú thuộc tính NOBLE_VOID nhận +400 ATK và +400 DEF. Quái thú đối phương khác thuộc tính bị giảm 200 ATK khi tuyên bố tấn công.",
    "scientificLore": "Môi trường địa hóa / điện hóa Ma Trận Khí Trơ Nhiệt Độ Siêu Lạnh (Noble Gas Matrix Isolation of Reactive Radicals) quyết định trạng thái tồn tại, độ bền liên kết và cân bằng phản ứng hóa học theo SGK GDPT 2018.",
    "relatedEquation": "Noble Gas Matrix Isolation of Reactive Radicals",
    "iupacName": "Cryogenic Argon Isolation Matrix Environment",
    "archetype": "FLUORESCENCE_SPECTRA",
    "structuredEffects": [
      {
        "effectId": "B18_EFF_12",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "BOTH",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 400 ATK/DEF cho toàn bộ đồng minh trong môi trường trường địa bàn."
      }
    ]
  },
  {
    "id": "card_b18_013_field_acid_mine_drainage_pyrite_waste_13",
    "name": "Vùng Thoát Nước Mỏ Axit Cháy Rực (Địa Bàn 2)",
    "name_en": "Acid Mine Drainage Pyrite Waste (Field 2)",
    "cardType": "FIELD_ENVIRONMENT",
    "spellTrapSubtype": "FIELD_SPELL",
    "spellSpeed": 1,
    "rarity": "SUPER_RARE",
    "attribute": "ACID_DARK",
    "manaCost": 2,
    "chemicalFormula": "FeS2 + O2 + H2O",
    "effectCode": "SPELL_B18_ACID_MINE_DRAINAGE_PYRITE_WASTE_FIELD_13",
    "effectText": "[Phép Môi Trường / Field]: Đặt vào Field Zone. Tất cả quái thú thuộc tính ACID_DARK nhận +400 ATK và +400 DEF. Quái thú đối phương khác thuộc tính bị giảm 200 ATK khi tuyên bố tấn công.",
    "scientificLore": "Môi trường địa hóa / điện hóa Vùng Thoát Nước Mỏ Axit Cháy Rực (2FeS₂ + 7O₂ + 2H₂O → 2Fe²⁺ + 4SO₄²⁻ + 4H⁺) quyết định trạng thái tồn tại, độ bền liên kết và cân bằng phản ứng hóa học theo SGK GDPT 2018.",
    "relatedEquation": "2FeS₂ + 7O₂ + 2H₂O → 2Fe²⁺ + 4SO₄²⁻ + 4H⁺",
    "iupacName": "Acid Mine Drainage Pyrite Waste Environment",
    "archetype": "SOLVATION_SPHERE",
    "structuredEffects": [
      {
        "effectId": "B18_EFF_13",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "BOTH",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 400 ATK/DEF cho toàn bộ đồng minh trong môi trường trường địa bàn."
      }
    ]
  },
  {
    "id": "card_b18_014_field_stratospheric_ozone_uv_shielding_14",
    "name": "Tầng Khí Quyển Ôzôn Hấp Thụ Tia Cực Tím (Địa Bàn 2)",
    "name_en": "Stratospheric Ozone UV Shielding (Field 2)",
    "cardType": "FIELD_ENVIRONMENT",
    "spellTrapSubtype": "FIELD_SPELL",
    "spellSpeed": 1,
    "rarity": "ULTRA_RARE",
    "attribute": "AERO",
    "manaCost": 3,
    "chemicalFormula": "O3 Layer",
    "effectCode": "SPELL_B18_STRATOSPHERIC_OZONE_UV_SHIELDING_FIELD_14",
    "effectText": "[Phép Môi Trường / Field]: Đặt vào Field Zone. Tất cả quái thú thuộc tính AERO nhận +400 ATK và +400 DEF. Quái thú đối phương khác thuộc tính bị giảm 200 ATK khi tuyên bố tấn công.",
    "scientificLore": "Môi trường địa hóa / điện hóa Tầng Khí Quyển Ôzôn Hấp Thụ Tia Cực Tím (O₃ + hν(UV) → O₂ + O· Chapman Cycle) quyết định trạng thái tồn tại, độ bền liên kết và cân bằng phản ứng hóa học theo SGK GDPT 2018.",
    "relatedEquation": "O₃ + hν(UV) → O₂ + O· Chapman Cycle",
    "iupacName": "Stratospheric Ozone UV Shielding Environment",
    "archetype": "COLLOIDAL_SOL",
    "structuredEffects": [
      {
        "effectId": "B18_EFF_14",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "BOTH",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 400 ATK/DEF cho toàn bộ đồng minh trong môi trường trường địa bàn."
      }
    ]
  },
  {
    "id": "card_b18_015_field_tyndall_colloidal_aerosol_mist_15",
    "name": "Hệ Keo Khói Tyndall Tán Xạ (Địa Bàn 2)",
    "name_en": "Tyndall Colloidal Aerosol Mist (Field 2)",
    "cardType": "FIELD_ENVIRONMENT",
    "spellTrapSubtype": "FIELD_SPELL",
    "spellSpeed": 1,
    "rarity": "SECRET_RARE",
    "attribute": "AERO",
    "manaCost": 4,
    "chemicalFormula": "Colloidal Sol",
    "effectCode": "SPELL_B18_TYNDALL_COLLOIDAL_AEROSOL_MIST_FIELD_15",
    "effectText": "[Phép Môi Trường / Field]: Đặt vào Field Zone. Tất cả quái thú thuộc tính AERO nhận +400 ATK và +400 DEF. Quái thú đối phương khác thuộc tính bị giảm 200 ATK khi tuyên bố tấn công.",
    "scientificLore": "Môi trường địa hóa / điện hóa Hệ Keo Khói Tyndall Tán Xạ (Rayleigh/Tyndall Elastic Light Scattering) quyết định trạng thái tồn tại, độ bền liên kết và cân bằng phản ứng hóa học theo SGK GDPT 2018.",
    "relatedEquation": "Rayleigh/Tyndall Elastic Light Scattering",
    "iupacName": "Tyndall Colloidal Aerosol Mist Environment",
    "archetype": "FLUORESCENCE_SPECTRA",
    "structuredEffects": [
      {
        "effectId": "B18_EFF_15",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "BOTH",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 400 ATK/DEF cho toàn bộ đồng minh trong môi trường trường địa bàn."
      }
    ]
  },
  {
    "id": "card_b18_016_field_dead_sea_hypersaline_crystallization_basin_16",
    "name": "Hồ Tinh Thể Muối Bão Hòa Biển Chết (Địa Bàn 2)",
    "name_en": "Dead Sea Hypersaline Crystallization Basin (Field 2)",
    "cardType": "FIELD_ENVIRONMENT",
    "spellTrapSubtype": "FIELD_SPELL",
    "spellSpeed": 1,
    "rarity": "COMMON",
    "attribute": "TERRA",
    "manaCost": 5,
    "chemicalFormula": "NaCl-KCl-MgCl2",
    "effectCode": "SPELL_B18_DEAD_SEA_HYPERSALINE_CRYSTALLIZATION_BASIN_FIELD_16",
    "effectText": "[Phép Môi Trường / Field]: Đặt vào Field Zone. Tất cả quái thú thuộc tính TERRA nhận +400 ATK và +400 DEF. Quái thú đối phương khác thuộc tính bị giảm 200 ATK khi tuyên bố tấn công.",
    "scientificLore": "Môi trường địa hóa / điện hóa Hồ Tinh Thể Muối Bão Hòa Biển Chết (Fractional Halite Sylvite Evaporite Precipitation) quyết định trạng thái tồn tại, độ bền liên kết và cân bằng phản ứng hóa học theo SGK GDPT 2018.",
    "relatedEquation": "Fractional Halite Sylvite Evaporite Precipitation",
    "iupacName": "Dead Sea Hypersaline Crystallization Basin Environment",
    "archetype": "SOLVATION_SPHERE",
    "structuredEffects": [
      {
        "effectId": "B18_EFF_16",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "BOTH",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 400 ATK/DEF cho toàn bộ đồng minh trong môi trường trường địa bàn."
      }
    ]
  },
  {
    "id": "card_b18_017_field_hydration_solvation_sphere_domain_17",
    "name": "Vỏ Dung Môi Hydrat Hóa Solvation (Địa Bàn 3)",
    "name_en": "Hydration Solvation Sphere Domain (Field 3)",
    "cardType": "FIELD_ENVIRONMENT",
    "spellTrapSubtype": "FIELD_SPELL",
    "spellSpeed": 1,
    "rarity": "COMMON",
    "attribute": "AQUA",
    "manaCost": 2,
    "chemicalFormula": "[M(H2O)6]n+",
    "effectCode": "SPELL_B18_HYDRATION_SOLVATION_SPHERE_DOMAIN_FIELD_17",
    "effectText": "[Phép Môi Trường / Field]: Đặt vào Field Zone. Tất cả quái thú thuộc tính AQUA nhận +400 ATK và +400 DEF. Quái thú đối phương khác thuộc tính bị giảm 200 ATK khi tuyên bố tấn công.",
    "scientificLore": "Môi trường địa hóa / điện hóa Vỏ Dung Môi Hydrat Hóa Solvation (Ion-Dipole Solvent Shell Stabilization) quyết định trạng thái tồn tại, độ bền liên kết và cân bằng phản ứng hóa học theo SGK GDPT 2018.",
    "relatedEquation": "Ion-Dipole Solvent Shell Stabilization",
    "iupacName": "Hydration Solvation Sphere Domain Environment",
    "archetype": "COLLOIDAL_SOL",
    "structuredEffects": [
      {
        "effectId": "B18_EFF_17",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "BOTH",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 400 ATK/DEF cho toàn bộ đồng minh trong môi trường trường địa bàn."
      }
    ]
  },
  {
    "id": "card_b18_018_field_deep_sea_hydrothermal_vent_biosphere_18",
    "name": "Miệng Phun Thủy Nhiệt Đại Dương (Địa Bàn 3)",
    "name_en": "Deep Sea Hydrothermal Vent Biosphere (Field 3)",
    "cardType": "FIELD_ENVIRONMENT",
    "spellTrapSubtype": "FIELD_SPELL",
    "spellSpeed": 1,
    "rarity": "COMMON",
    "attribute": "PYRO",
    "manaCost": 3,
    "chemicalFormula": "FeS-H2S Vent",
    "effectCode": "SPELL_B18_DEEP_SEA_HYDROTHERMAL_VENT_BIOSPHERE_FIELD_18",
    "effectText": "[Phép Môi Trường / Field]: Đặt vào Field Zone. Tất cả quái thú thuộc tính PYRO nhận +400 ATK và +400 DEF. Quái thú đối phương khác thuộc tính bị giảm 200 ATK khi tuyên bố tấn công.",
    "scientificLore": "Môi trường địa hóa / điện hóa Miệng Phun Thủy Nhiệt Đại Dương (Prebiotic Chemosynthesis Matrix at 350°C) quyết định trạng thái tồn tại, độ bền liên kết và cân bằng phản ứng hóa học theo SGK GDPT 2018.",
    "relatedEquation": "Prebiotic Chemosynthesis Matrix at 350°C",
    "iupacName": "Deep Sea Hydrothermal Vent Biosphere Environment",
    "archetype": "FLUORESCENCE_SPECTRA",
    "structuredEffects": [
      {
        "effectId": "B18_EFF_18",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "BOTH",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 400 ATK/DEF cho toàn bộ đồng minh trong môi trường trường địa bàn."
      }
    ]
  },
  {
    "id": "card_b18_019_field_galvanic_electroplating_bath_chamber_19",
    "name": "Bể Điện Hóa Galvanic Mạ Kền (Địa Bàn 3)",
    "name_en": "Galvanic Electroplating Bath Chamber (Field 3)",
    "cardType": "FIELD_ENVIRONMENT",
    "spellTrapSubtype": "FIELD_SPELL",
    "spellSpeed": 1,
    "rarity": "RARE",
    "attribute": "ELECTRO",
    "manaCost": 4,
    "chemicalFormula": "NiSO4 Electrolyte",
    "effectCode": "SPELL_B18_GALVANIC_ELECTROPLATING_BATH_CHAMBER_FIELD_19",
    "effectText": "[Phép Môi Trường / Field]: Đặt vào Field Zone. Tất cả quái thú thuộc tính ELECTRO nhận +400 ATK và +400 DEF. Quái thú đối phương khác thuộc tính bị giảm 200 ATK khi tuyên bố tấn công.",
    "scientificLore": "Môi trường địa hóa / điện hóa Bể Điện Hóa Galvanic Mạ Kền (Faraday Law Cathodic Deposition m = (AIt)/(nF)) quyết định trạng thái tồn tại, độ bền liên kết và cân bằng phản ứng hóa học theo SGK GDPT 2018.",
    "relatedEquation": "Faraday Law Cathodic Deposition m = (AIt)/(nF)",
    "iupacName": "Galvanic Electroplating Bath Chamber Environment",
    "archetype": "SOLVATION_SPHERE",
    "structuredEffects": [
      {
        "effectId": "B18_EFF_19",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "BOTH",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 400 ATK/DEF cho toàn bộ đồng minh trong môi trường trường địa bàn."
      }
    ]
  },
  {
    "id": "card_b18_020_field_cryogenic_argon_isolation_matrix_20",
    "name": "Ma Trận Khí Trơ Nhiệt Độ Siêu Lạnh (Địa Bàn 3)",
    "name_en": "Cryogenic Argon Isolation Matrix (Field 3)",
    "cardType": "FIELD_ENVIRONMENT",
    "spellTrapSubtype": "FIELD_SPELL",
    "spellSpeed": 1,
    "rarity": "RARE",
    "attribute": "NOBLE_VOID",
    "manaCost": 5,
    "chemicalFormula": "Ar(s) 10K",
    "effectCode": "SPELL_B18_CRYOGENIC_ARGON_ISOLATION_MATRIX_FIELD_20",
    "effectText": "[Phép Môi Trường / Field]: Đặt vào Field Zone. Tất cả quái thú thuộc tính NOBLE_VOID nhận +400 ATK và +400 DEF. Quái thú đối phương khác thuộc tính bị giảm 200 ATK khi tuyên bố tấn công.",
    "scientificLore": "Môi trường địa hóa / điện hóa Ma Trận Khí Trơ Nhiệt Độ Siêu Lạnh (Noble Gas Matrix Isolation of Reactive Radicals) quyết định trạng thái tồn tại, độ bền liên kết và cân bằng phản ứng hóa học theo SGK GDPT 2018.",
    "relatedEquation": "Noble Gas Matrix Isolation of Reactive Radicals",
    "iupacName": "Cryogenic Argon Isolation Matrix Environment",
    "archetype": "COLLOIDAL_SOL",
    "structuredEffects": [
      {
        "effectId": "B18_EFF_20",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "BOTH",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 400 ATK/DEF cho toàn bộ đồng minh trong môi trường trường địa bàn."
      }
    ]
  },
  {
    "id": "card_b18_021_field_acid_mine_drainage_pyrite_waste_21",
    "name": "Vùng Thoát Nước Mỏ Axit Cháy Rực (Địa Bàn 3)",
    "name_en": "Acid Mine Drainage Pyrite Waste (Field 3)",
    "cardType": "FIELD_ENVIRONMENT",
    "spellTrapSubtype": "FIELD_SPELL",
    "spellSpeed": 1,
    "rarity": "SUPER_RARE",
    "attribute": "ACID_DARK",
    "manaCost": 2,
    "chemicalFormula": "FeS2 + O2 + H2O",
    "effectCode": "SPELL_B18_ACID_MINE_DRAINAGE_PYRITE_WASTE_FIELD_21",
    "effectText": "[Phép Môi Trường / Field]: Đặt vào Field Zone. Tất cả quái thú thuộc tính ACID_DARK nhận +400 ATK và +400 DEF. Quái thú đối phương khác thuộc tính bị giảm 200 ATK khi tuyên bố tấn công.",
    "scientificLore": "Môi trường địa hóa / điện hóa Vùng Thoát Nước Mỏ Axit Cháy Rực (2FeS₂ + 7O₂ + 2H₂O → 2Fe²⁺ + 4SO₄²⁻ + 4H⁺) quyết định trạng thái tồn tại, độ bền liên kết và cân bằng phản ứng hóa học theo SGK GDPT 2018.",
    "relatedEquation": "2FeS₂ + 7O₂ + 2H₂O → 2Fe²⁺ + 4SO₄²⁻ + 4H⁺",
    "iupacName": "Acid Mine Drainage Pyrite Waste Environment",
    "archetype": "FLUORESCENCE_SPECTRA",
    "structuredEffects": [
      {
        "effectId": "B18_EFF_21",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "BOTH",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 400 ATK/DEF cho toàn bộ đồng minh trong môi trường trường địa bàn."
      }
    ]
  },
  {
    "id": "card_b18_022_field_stratospheric_ozone_uv_shielding_22",
    "name": "Tầng Khí Quyển Ôzôn Hấp Thụ Tia Cực Tím (Địa Bàn 3)",
    "name_en": "Stratospheric Ozone UV Shielding (Field 3)",
    "cardType": "FIELD_ENVIRONMENT",
    "spellTrapSubtype": "FIELD_SPELL",
    "spellSpeed": 1,
    "rarity": "SUPER_RARE",
    "attribute": "AERO",
    "manaCost": 3,
    "chemicalFormula": "O3 Layer",
    "effectCode": "SPELL_B18_STRATOSPHERIC_OZONE_UV_SHIELDING_FIELD_22",
    "effectText": "[Phép Môi Trường / Field]: Đặt vào Field Zone. Tất cả quái thú thuộc tính AERO nhận +400 ATK và +400 DEF. Quái thú đối phương khác thuộc tính bị giảm 200 ATK khi tuyên bố tấn công.",
    "scientificLore": "Môi trường địa hóa / điện hóa Tầng Khí Quyển Ôzôn Hấp Thụ Tia Cực Tím (O₃ + hν(UV) → O₂ + O· Chapman Cycle) quyết định trạng thái tồn tại, độ bền liên kết và cân bằng phản ứng hóa học theo SGK GDPT 2018.",
    "relatedEquation": "O₃ + hν(UV) → O₂ + O· Chapman Cycle",
    "iupacName": "Stratospheric Ozone UV Shielding Environment",
    "archetype": "SOLVATION_SPHERE",
    "structuredEffects": [
      {
        "effectId": "B18_EFF_22",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "BOTH",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 400 ATK/DEF cho toàn bộ đồng minh trong môi trường trường địa bàn."
      }
    ]
  },
  {
    "id": "card_b18_023_field_tyndall_colloidal_aerosol_mist_23",
    "name": "Hệ Keo Khói Tyndall Tán Xạ (Địa Bàn 3)",
    "name_en": "Tyndall Colloidal Aerosol Mist (Field 3)",
    "cardType": "FIELD_ENVIRONMENT",
    "spellTrapSubtype": "FIELD_SPELL",
    "spellSpeed": 1,
    "rarity": "ULTRA_RARE",
    "attribute": "AERO",
    "manaCost": 4,
    "chemicalFormula": "Colloidal Sol",
    "effectCode": "SPELL_B18_TYNDALL_COLLOIDAL_AEROSOL_MIST_FIELD_23",
    "effectText": "[Phép Môi Trường / Field]: Đặt vào Field Zone. Tất cả quái thú thuộc tính AERO nhận +400 ATK và +400 DEF. Quái thú đối phương khác thuộc tính bị giảm 200 ATK khi tuyên bố tấn công.",
    "scientificLore": "Môi trường địa hóa / điện hóa Hệ Keo Khói Tyndall Tán Xạ (Rayleigh/Tyndall Elastic Light Scattering) quyết định trạng thái tồn tại, độ bền liên kết và cân bằng phản ứng hóa học theo SGK GDPT 2018.",
    "relatedEquation": "Rayleigh/Tyndall Elastic Light Scattering",
    "iupacName": "Tyndall Colloidal Aerosol Mist Environment",
    "archetype": "COLLOIDAL_SOL",
    "structuredEffects": [
      {
        "effectId": "B18_EFF_23",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "BOTH",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 400 ATK/DEF cho toàn bộ đồng minh trong môi trường trường địa bàn."
      }
    ]
  },
  {
    "id": "card_b18_024_field_dead_sea_hypersaline_crystallization_basin_24",
    "name": "Hồ Tinh Thể Muối Bão Hòa Biển Chết (Địa Bàn 3)",
    "name_en": "Dead Sea Hypersaline Crystallization Basin (Field 3)",
    "cardType": "FIELD_ENVIRONMENT",
    "spellTrapSubtype": "FIELD_SPELL",
    "spellSpeed": 1,
    "rarity": "SECRET_RARE",
    "attribute": "TERRA",
    "manaCost": 5,
    "chemicalFormula": "NaCl-KCl-MgCl2",
    "effectCode": "SPELL_B18_DEAD_SEA_HYPERSALINE_CRYSTALLIZATION_BASIN_FIELD_24",
    "effectText": "[Phép Môi Trường / Field]: Đặt vào Field Zone. Tất cả quái thú thuộc tính TERRA nhận +400 ATK và +400 DEF. Quái thú đối phương khác thuộc tính bị giảm 200 ATK khi tuyên bố tấn công.",
    "scientificLore": "Môi trường địa hóa / điện hóa Hồ Tinh Thể Muối Bão Hòa Biển Chết (Fractional Halite Sylvite Evaporite Precipitation) quyết định trạng thái tồn tại, độ bền liên kết và cân bằng phản ứng hóa học theo SGK GDPT 2018.",
    "relatedEquation": "Fractional Halite Sylvite Evaporite Precipitation",
    "iupacName": "Dead Sea Hypersaline Crystallization Basin Environment",
    "archetype": "FLUORESCENCE_SPECTRA",
    "structuredEffects": [
      {
        "effectId": "B18_EFF_24",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "BOTH",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 400 ATK/DEF cho toàn bộ đồng minh trong môi trường trường địa bàn."
      }
    ]
  },
  {
    "id": "card_b18_025_field_hydration_solvation_sphere_domain_25",
    "name": "Vỏ Dung Môi Hydrat Hóa Solvation (Địa Bàn 4)",
    "name_en": "Hydration Solvation Sphere Domain (Field 4)",
    "cardType": "FIELD_ENVIRONMENT",
    "spellTrapSubtype": "FIELD_SPELL",
    "spellSpeed": 1,
    "rarity": "COMMON",
    "attribute": "AQUA",
    "manaCost": 2,
    "chemicalFormula": "[M(H2O)6]n+",
    "effectCode": "SPELL_B18_HYDRATION_SOLVATION_SPHERE_DOMAIN_FIELD_25",
    "effectText": "[Phép Môi Trường / Field]: Đặt vào Field Zone. Tất cả quái thú thuộc tính AQUA nhận +400 ATK và +400 DEF. Quái thú đối phương khác thuộc tính bị giảm 200 ATK khi tuyên bố tấn công.",
    "scientificLore": "Môi trường địa hóa / điện hóa Vỏ Dung Môi Hydrat Hóa Solvation (Ion-Dipole Solvent Shell Stabilization) quyết định trạng thái tồn tại, độ bền liên kết và cân bằng phản ứng hóa học theo SGK GDPT 2018.",
    "relatedEquation": "Ion-Dipole Solvent Shell Stabilization",
    "iupacName": "Hydration Solvation Sphere Domain Environment",
    "archetype": "SOLVATION_SPHERE",
    "structuredEffects": [
      {
        "effectId": "B18_EFF_25",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "BOTH",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 400 ATK/DEF cho toàn bộ đồng minh trong môi trường trường địa bàn."
      }
    ]
  },
  {
    "id": "card_b18_026_field_deep_sea_hydrothermal_vent_biosphere_26",
    "name": "Miệng Phun Thủy Nhiệt Đại Dương (Địa Bàn 4)",
    "name_en": "Deep Sea Hydrothermal Vent Biosphere (Field 4)",
    "cardType": "FIELD_ENVIRONMENT",
    "spellTrapSubtype": "FIELD_SPELL",
    "spellSpeed": 1,
    "rarity": "COMMON",
    "attribute": "PYRO",
    "manaCost": 3,
    "chemicalFormula": "FeS-H2S Vent",
    "effectCode": "SPELL_B18_DEEP_SEA_HYDROTHERMAL_VENT_BIOSPHERE_FIELD_26",
    "effectText": "[Phép Môi Trường / Field]: Đặt vào Field Zone. Tất cả quái thú thuộc tính PYRO nhận +400 ATK và +400 DEF. Quái thú đối phương khác thuộc tính bị giảm 200 ATK khi tuyên bố tấn công.",
    "scientificLore": "Môi trường địa hóa / điện hóa Miệng Phun Thủy Nhiệt Đại Dương (Prebiotic Chemosynthesis Matrix at 350°C) quyết định trạng thái tồn tại, độ bền liên kết và cân bằng phản ứng hóa học theo SGK GDPT 2018.",
    "relatedEquation": "Prebiotic Chemosynthesis Matrix at 350°C",
    "iupacName": "Deep Sea Hydrothermal Vent Biosphere Environment",
    "archetype": "COLLOIDAL_SOL",
    "structuredEffects": [
      {
        "effectId": "B18_EFF_26",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "BOTH",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 400 ATK/DEF cho toàn bộ đồng minh trong môi trường trường địa bàn."
      }
    ]
  },
  {
    "id": "card_b18_027_field_galvanic_electroplating_bath_chamber_27",
    "name": "Bể Điện Hóa Galvanic Mạ Kền (Địa Bàn 4)",
    "name_en": "Galvanic Electroplating Bath Chamber (Field 4)",
    "cardType": "FIELD_ENVIRONMENT",
    "spellTrapSubtype": "FIELD_SPELL",
    "spellSpeed": 1,
    "rarity": "COMMON",
    "attribute": "ELECTRO",
    "manaCost": 4,
    "chemicalFormula": "NiSO4 Electrolyte",
    "effectCode": "SPELL_B18_GALVANIC_ELECTROPLATING_BATH_CHAMBER_FIELD_27",
    "effectText": "[Phép Môi Trường / Field]: Đặt vào Field Zone. Tất cả quái thú thuộc tính ELECTRO nhận +400 ATK và +400 DEF. Quái thú đối phương khác thuộc tính bị giảm 200 ATK khi tuyên bố tấn công.",
    "scientificLore": "Môi trường địa hóa / điện hóa Bể Điện Hóa Galvanic Mạ Kền (Faraday Law Cathodic Deposition m = (AIt)/(nF)) quyết định trạng thái tồn tại, độ bền liên kết và cân bằng phản ứng hóa học theo SGK GDPT 2018.",
    "relatedEquation": "Faraday Law Cathodic Deposition m = (AIt)/(nF)",
    "iupacName": "Galvanic Electroplating Bath Chamber Environment",
    "archetype": "FLUORESCENCE_SPECTRA",
    "structuredEffects": [
      {
        "effectId": "B18_EFF_27",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "BOTH",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 400 ATK/DEF cho toàn bộ đồng minh trong môi trường trường địa bàn."
      }
    ]
  },
  {
    "id": "card_b18_028_field_cryogenic_argon_isolation_matrix_28",
    "name": "Ma Trận Khí Trơ Nhiệt Độ Siêu Lạnh (Địa Bàn 4)",
    "name_en": "Cryogenic Argon Isolation Matrix (Field 4)",
    "cardType": "FIELD_ENVIRONMENT",
    "spellTrapSubtype": "FIELD_SPELL",
    "spellSpeed": 1,
    "rarity": "RARE",
    "attribute": "NOBLE_VOID",
    "manaCost": 5,
    "chemicalFormula": "Ar(s) 10K",
    "effectCode": "SPELL_B18_CRYOGENIC_ARGON_ISOLATION_MATRIX_FIELD_28",
    "effectText": "[Phép Môi Trường / Field]: Đặt vào Field Zone. Tất cả quái thú thuộc tính NOBLE_VOID nhận +400 ATK và +400 DEF. Quái thú đối phương khác thuộc tính bị giảm 200 ATK khi tuyên bố tấn công.",
    "scientificLore": "Môi trường địa hóa / điện hóa Ma Trận Khí Trơ Nhiệt Độ Siêu Lạnh (Noble Gas Matrix Isolation of Reactive Radicals) quyết định trạng thái tồn tại, độ bền liên kết và cân bằng phản ứng hóa học theo SGK GDPT 2018.",
    "relatedEquation": "Noble Gas Matrix Isolation of Reactive Radicals",
    "iupacName": "Cryogenic Argon Isolation Matrix Environment",
    "archetype": "SOLVATION_SPHERE",
    "structuredEffects": [
      {
        "effectId": "B18_EFF_28",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "BOTH",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 400 ATK/DEF cho toàn bộ đồng minh trong môi trường trường địa bàn."
      }
    ]
  },
  {
    "id": "card_b18_029_field_acid_mine_drainage_pyrite_waste_29",
    "name": "Vùng Thoát Nước Mỏ Axit Cháy Rực (Địa Bàn 4)",
    "name_en": "Acid Mine Drainage Pyrite Waste (Field 4)",
    "cardType": "FIELD_ENVIRONMENT",
    "spellTrapSubtype": "FIELD_SPELL",
    "spellSpeed": 1,
    "rarity": "RARE",
    "attribute": "ACID_DARK",
    "manaCost": 2,
    "chemicalFormula": "FeS2 + O2 + H2O",
    "effectCode": "SPELL_B18_ACID_MINE_DRAINAGE_PYRITE_WASTE_FIELD_29",
    "effectText": "[Phép Môi Trường / Field]: Đặt vào Field Zone. Tất cả quái thú thuộc tính ACID_DARK nhận +400 ATK và +400 DEF. Quái thú đối phương khác thuộc tính bị giảm 200 ATK khi tuyên bố tấn công.",
    "scientificLore": "Môi trường địa hóa / điện hóa Vùng Thoát Nước Mỏ Axit Cháy Rực (2FeS₂ + 7O₂ + 2H₂O → 2Fe²⁺ + 4SO₄²⁻ + 4H⁺) quyết định trạng thái tồn tại, độ bền liên kết và cân bằng phản ứng hóa học theo SGK GDPT 2018.",
    "relatedEquation": "2FeS₂ + 7O₂ + 2H₂O → 2Fe²⁺ + 4SO₄²⁻ + 4H⁺",
    "iupacName": "Acid Mine Drainage Pyrite Waste Environment",
    "archetype": "COLLOIDAL_SOL",
    "structuredEffects": [
      {
        "effectId": "B18_EFF_29",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "BOTH",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 400 ATK/DEF cho toàn bộ đồng minh trong môi trường trường địa bàn."
      }
    ]
  },
  {
    "id": "card_b18_030_field_stratospheric_ozone_uv_shielding_30",
    "name": "Tầng Khí Quyển Ôzôn Hấp Thụ Tia Cực Tím (Địa Bàn 4)",
    "name_en": "Stratospheric Ozone UV Shielding (Field 4)",
    "cardType": "FIELD_ENVIRONMENT",
    "spellTrapSubtype": "FIELD_SPELL",
    "spellSpeed": 1,
    "rarity": "SUPER_RARE",
    "attribute": "AERO",
    "manaCost": 3,
    "chemicalFormula": "O3 Layer",
    "effectCode": "SPELL_B18_STRATOSPHERIC_OZONE_UV_SHIELDING_FIELD_30",
    "effectText": "[Phép Môi Trường / Field]: Đặt vào Field Zone. Tất cả quái thú thuộc tính AERO nhận +400 ATK và +400 DEF. Quái thú đối phương khác thuộc tính bị giảm 200 ATK khi tuyên bố tấn công.",
    "scientificLore": "Môi trường địa hóa / điện hóa Tầng Khí Quyển Ôzôn Hấp Thụ Tia Cực Tím (O₃ + hν(UV) → O₂ + O· Chapman Cycle) quyết định trạng thái tồn tại, độ bền liên kết và cân bằng phản ứng hóa học theo SGK GDPT 2018.",
    "relatedEquation": "O₃ + hν(UV) → O₂ + O· Chapman Cycle",
    "iupacName": "Stratospheric Ozone UV Shielding Environment",
    "archetype": "FLUORESCENCE_SPECTRA",
    "structuredEffects": [
      {
        "effectId": "B18_EFF_30",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "BOTH",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 400 ATK/DEF cho toàn bộ đồng minh trong môi trường trường địa bàn."
      }
    ]
  },
  {
    "id": "card_b18_031_field_tyndall_colloidal_aerosol_mist_31",
    "name": "Hệ Keo Khói Tyndall Tán Xạ (Địa Bàn 4)",
    "name_en": "Tyndall Colloidal Aerosol Mist (Field 4)",
    "cardType": "FIELD_ENVIRONMENT",
    "spellTrapSubtype": "FIELD_SPELL",
    "spellSpeed": 1,
    "rarity": "SUPER_RARE",
    "attribute": "AERO",
    "manaCost": 4,
    "chemicalFormula": "Colloidal Sol",
    "effectCode": "SPELL_B18_TYNDALL_COLLOIDAL_AEROSOL_MIST_FIELD_31",
    "effectText": "[Phép Môi Trường / Field]: Đặt vào Field Zone. Tất cả quái thú thuộc tính AERO nhận +400 ATK và +400 DEF. Quái thú đối phương khác thuộc tính bị giảm 200 ATK khi tuyên bố tấn công.",
    "scientificLore": "Môi trường địa hóa / điện hóa Hệ Keo Khói Tyndall Tán Xạ (Rayleigh/Tyndall Elastic Light Scattering) quyết định trạng thái tồn tại, độ bền liên kết và cân bằng phản ứng hóa học theo SGK GDPT 2018.",
    "relatedEquation": "Rayleigh/Tyndall Elastic Light Scattering",
    "iupacName": "Tyndall Colloidal Aerosol Mist Environment",
    "archetype": "SOLVATION_SPHERE",
    "structuredEffects": [
      {
        "effectId": "B18_EFF_31",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "BOTH",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 400 ATK/DEF cho toàn bộ đồng minh trong môi trường trường địa bàn."
      }
    ]
  },
  {
    "id": "card_b18_032_field_dead_sea_hypersaline_crystallization_basin_32",
    "name": "Hồ Tinh Thể Muối Bão Hòa Biển Chết (Địa Bàn 4)",
    "name_en": "Dead Sea Hypersaline Crystallization Basin (Field 4)",
    "cardType": "FIELD_ENVIRONMENT",
    "spellTrapSubtype": "FIELD_SPELL",
    "spellSpeed": 1,
    "rarity": "ULTRA_RARE",
    "attribute": "TERRA",
    "manaCost": 5,
    "chemicalFormula": "NaCl-KCl-MgCl2",
    "effectCode": "SPELL_B18_DEAD_SEA_HYPERSALINE_CRYSTALLIZATION_BASIN_FIELD_32",
    "effectText": "[Phép Môi Trường / Field]: Đặt vào Field Zone. Tất cả quái thú thuộc tính TERRA nhận +400 ATK và +400 DEF. Quái thú đối phương khác thuộc tính bị giảm 200 ATK khi tuyên bố tấn công.",
    "scientificLore": "Môi trường địa hóa / điện hóa Hồ Tinh Thể Muối Bão Hòa Biển Chết (Fractional Halite Sylvite Evaporite Precipitation) quyết định trạng thái tồn tại, độ bền liên kết và cân bằng phản ứng hóa học theo SGK GDPT 2018.",
    "relatedEquation": "Fractional Halite Sylvite Evaporite Precipitation",
    "iupacName": "Dead Sea Hypersaline Crystallization Basin Environment",
    "archetype": "COLLOIDAL_SOL",
    "structuredEffects": [
      {
        "effectId": "B18_EFF_32",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "BOTH",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 400 ATK/DEF cho toàn bộ đồng minh trong môi trường trường địa bàn."
      }
    ]
  },
  {
    "id": "card_b18_033_field_hydration_solvation_sphere_domain_33",
    "name": "Vỏ Dung Môi Hydrat Hóa Solvation (Địa Bàn 5)",
    "name_en": "Hydration Solvation Sphere Domain (Field 5)",
    "cardType": "FIELD_ENVIRONMENT",
    "spellTrapSubtype": "FIELD_SPELL",
    "spellSpeed": 1,
    "rarity": "SECRET_RARE",
    "attribute": "AQUA",
    "manaCost": 2,
    "chemicalFormula": "[M(H2O)6]n+",
    "effectCode": "SPELL_B18_HYDRATION_SOLVATION_SPHERE_DOMAIN_FIELD_33",
    "effectText": "[Phép Môi Trường / Field]: Đặt vào Field Zone. Tất cả quái thú thuộc tính AQUA nhận +400 ATK và +400 DEF. Quái thú đối phương khác thuộc tính bị giảm 200 ATK khi tuyên bố tấn công.",
    "scientificLore": "Môi trường địa hóa / điện hóa Vỏ Dung Môi Hydrat Hóa Solvation (Ion-Dipole Solvent Shell Stabilization) quyết định trạng thái tồn tại, độ bền liên kết và cân bằng phản ứng hóa học theo SGK GDPT 2018.",
    "relatedEquation": "Ion-Dipole Solvent Shell Stabilization",
    "iupacName": "Hydration Solvation Sphere Domain Environment",
    "archetype": "FLUORESCENCE_SPECTRA",
    "structuredEffects": [
      {
        "effectId": "B18_EFF_33",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "BOTH",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 400 ATK/DEF cho toàn bộ đồng minh trong môi trường trường địa bàn."
      }
    ]
  },
  {
    "id": "card_b18_034_field_deep_sea_hydrothermal_vent_biosphere_34",
    "name": "Miệng Phun Thủy Nhiệt Đại Dương (Địa Bàn 5)",
    "name_en": "Deep Sea Hydrothermal Vent Biosphere (Field 5)",
    "cardType": "FIELD_ENVIRONMENT",
    "spellTrapSubtype": "FIELD_SPELL",
    "spellSpeed": 1,
    "rarity": "COMMON",
    "attribute": "PYRO",
    "manaCost": 3,
    "chemicalFormula": "FeS-H2S Vent",
    "effectCode": "SPELL_B18_DEEP_SEA_HYDROTHERMAL_VENT_BIOSPHERE_FIELD_34",
    "effectText": "[Phép Môi Trường / Field]: Đặt vào Field Zone. Tất cả quái thú thuộc tính PYRO nhận +400 ATK và +400 DEF. Quái thú đối phương khác thuộc tính bị giảm 200 ATK khi tuyên bố tấn công.",
    "scientificLore": "Môi trường địa hóa / điện hóa Miệng Phun Thủy Nhiệt Đại Dương (Prebiotic Chemosynthesis Matrix at 350°C) quyết định trạng thái tồn tại, độ bền liên kết và cân bằng phản ứng hóa học theo SGK GDPT 2018.",
    "relatedEquation": "Prebiotic Chemosynthesis Matrix at 350°C",
    "iupacName": "Deep Sea Hydrothermal Vent Biosphere Environment",
    "archetype": "SOLVATION_SPHERE",
    "structuredEffects": [
      {
        "effectId": "B18_EFF_34",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "BOTH",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 400 ATK/DEF cho toàn bộ đồng minh trong môi trường trường địa bàn."
      }
    ]
  },
  {
    "id": "card_b18_035_field_galvanic_electroplating_bath_chamber_35",
    "name": "Bể Điện Hóa Galvanic Mạ Kền (Địa Bàn 5)",
    "name_en": "Galvanic Electroplating Bath Chamber (Field 5)",
    "cardType": "FIELD_ENVIRONMENT",
    "spellTrapSubtype": "FIELD_SPELL",
    "spellSpeed": 1,
    "rarity": "COMMON",
    "attribute": "ELECTRO",
    "manaCost": 4,
    "chemicalFormula": "NiSO4 Electrolyte",
    "effectCode": "SPELL_B18_GALVANIC_ELECTROPLATING_BATH_CHAMBER_FIELD_35",
    "effectText": "[Phép Môi Trường / Field]: Đặt vào Field Zone. Tất cả quái thú thuộc tính ELECTRO nhận +400 ATK và +400 DEF. Quái thú đối phương khác thuộc tính bị giảm 200 ATK khi tuyên bố tấn công.",
    "scientificLore": "Môi trường địa hóa / điện hóa Bể Điện Hóa Galvanic Mạ Kền (Faraday Law Cathodic Deposition m = (AIt)/(nF)) quyết định trạng thái tồn tại, độ bền liên kết và cân bằng phản ứng hóa học theo SGK GDPT 2018.",
    "relatedEquation": "Faraday Law Cathodic Deposition m = (AIt)/(nF)",
    "iupacName": "Galvanic Electroplating Bath Chamber Environment",
    "archetype": "COLLOIDAL_SOL",
    "structuredEffects": [
      {
        "effectId": "B18_EFF_35",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "BOTH",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 400 ATK/DEF cho toàn bộ đồng minh trong môi trường trường địa bàn."
      }
    ]
  },
  {
    "id": "card_b18_036_field_cryogenic_argon_isolation_matrix_36",
    "name": "Ma Trận Khí Trơ Nhiệt Độ Siêu Lạnh (Địa Bàn 5)",
    "name_en": "Cryogenic Argon Isolation Matrix (Field 5)",
    "cardType": "FIELD_ENVIRONMENT",
    "spellTrapSubtype": "FIELD_SPELL",
    "spellSpeed": 1,
    "rarity": "COMMON",
    "attribute": "NOBLE_VOID",
    "manaCost": 5,
    "chemicalFormula": "Ar(s) 10K",
    "effectCode": "SPELL_B18_CRYOGENIC_ARGON_ISOLATION_MATRIX_FIELD_36",
    "effectText": "[Phép Môi Trường / Field]: Đặt vào Field Zone. Tất cả quái thú thuộc tính NOBLE_VOID nhận +400 ATK và +400 DEF. Quái thú đối phương khác thuộc tính bị giảm 200 ATK khi tuyên bố tấn công.",
    "scientificLore": "Môi trường địa hóa / điện hóa Ma Trận Khí Trơ Nhiệt Độ Siêu Lạnh (Noble Gas Matrix Isolation of Reactive Radicals) quyết định trạng thái tồn tại, độ bền liên kết và cân bằng phản ứng hóa học theo SGK GDPT 2018.",
    "relatedEquation": "Noble Gas Matrix Isolation of Reactive Radicals",
    "iupacName": "Cryogenic Argon Isolation Matrix Environment",
    "archetype": "FLUORESCENCE_SPECTRA",
    "structuredEffects": [
      {
        "effectId": "B18_EFF_36",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "BOTH",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 400 ATK/DEF cho toàn bộ đồng minh trong môi trường trường địa bàn."
      }
    ]
  },
  {
    "id": "card_b18_037_field_acid_mine_drainage_pyrite_waste_37",
    "name": "Vùng Thoát Nước Mỏ Axit Cháy Rực (Địa Bàn 5)",
    "name_en": "Acid Mine Drainage Pyrite Waste (Field 5)",
    "cardType": "FIELD_ENVIRONMENT",
    "spellTrapSubtype": "FIELD_SPELL",
    "spellSpeed": 1,
    "rarity": "RARE",
    "attribute": "ACID_DARK",
    "manaCost": 2,
    "chemicalFormula": "FeS2 + O2 + H2O",
    "effectCode": "SPELL_B18_ACID_MINE_DRAINAGE_PYRITE_WASTE_FIELD_37",
    "effectText": "[Phép Môi Trường / Field]: Đặt vào Field Zone. Tất cả quái thú thuộc tính ACID_DARK nhận +400 ATK và +400 DEF. Quái thú đối phương khác thuộc tính bị giảm 200 ATK khi tuyên bố tấn công.",
    "scientificLore": "Môi trường địa hóa / điện hóa Vùng Thoát Nước Mỏ Axit Cháy Rực (2FeS₂ + 7O₂ + 2H₂O → 2Fe²⁺ + 4SO₄²⁻ + 4H⁺) quyết định trạng thái tồn tại, độ bền liên kết và cân bằng phản ứng hóa học theo SGK GDPT 2018.",
    "relatedEquation": "2FeS₂ + 7O₂ + 2H₂O → 2Fe²⁺ + 4SO₄²⁻ + 4H⁺",
    "iupacName": "Acid Mine Drainage Pyrite Waste Environment",
    "archetype": "SOLVATION_SPHERE",
    "structuredEffects": [
      {
        "effectId": "B18_EFF_37",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "BOTH",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 400 ATK/DEF cho toàn bộ đồng minh trong môi trường trường địa bàn."
      }
    ]
  },
  {
    "id": "card_b18_038_field_stratospheric_ozone_uv_shielding_38",
    "name": "Tầng Khí Quyển Ôzôn Hấp Thụ Tia Cực Tím (Địa Bàn 5)",
    "name_en": "Stratospheric Ozone UV Shielding (Field 5)",
    "cardType": "FIELD_ENVIRONMENT",
    "spellTrapSubtype": "FIELD_SPELL",
    "spellSpeed": 1,
    "rarity": "RARE",
    "attribute": "AERO",
    "manaCost": 3,
    "chemicalFormula": "O3 Layer",
    "effectCode": "SPELL_B18_STRATOSPHERIC_OZONE_UV_SHIELDING_FIELD_38",
    "effectText": "[Phép Môi Trường / Field]: Đặt vào Field Zone. Tất cả quái thú thuộc tính AERO nhận +400 ATK và +400 DEF. Quái thú đối phương khác thuộc tính bị giảm 200 ATK khi tuyên bố tấn công.",
    "scientificLore": "Môi trường địa hóa / điện hóa Tầng Khí Quyển Ôzôn Hấp Thụ Tia Cực Tím (O₃ + hν(UV) → O₂ + O· Chapman Cycle) quyết định trạng thái tồn tại, độ bền liên kết và cân bằng phản ứng hóa học theo SGK GDPT 2018.",
    "relatedEquation": "O₃ + hν(UV) → O₂ + O· Chapman Cycle",
    "iupacName": "Stratospheric Ozone UV Shielding Environment",
    "archetype": "COLLOIDAL_SOL",
    "structuredEffects": [
      {
        "effectId": "B18_EFF_38",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "BOTH",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 400 ATK/DEF cho toàn bộ đồng minh trong môi trường trường địa bàn."
      }
    ]
  },
  {
    "id": "card_b18_039_field_tyndall_colloidal_aerosol_mist_39",
    "name": "Hệ Keo Khói Tyndall Tán Xạ (Địa Bàn 5)",
    "name_en": "Tyndall Colloidal Aerosol Mist (Field 5)",
    "cardType": "FIELD_ENVIRONMENT",
    "spellTrapSubtype": "FIELD_SPELL",
    "spellSpeed": 1,
    "rarity": "SUPER_RARE",
    "attribute": "AERO",
    "manaCost": 4,
    "chemicalFormula": "Colloidal Sol",
    "effectCode": "SPELL_B18_TYNDALL_COLLOIDAL_AEROSOL_MIST_FIELD_39",
    "effectText": "[Phép Môi Trường / Field]: Đặt vào Field Zone. Tất cả quái thú thuộc tính AERO nhận +400 ATK và +400 DEF. Quái thú đối phương khác thuộc tính bị giảm 200 ATK khi tuyên bố tấn công.",
    "scientificLore": "Môi trường địa hóa / điện hóa Hệ Keo Khói Tyndall Tán Xạ (Rayleigh/Tyndall Elastic Light Scattering) quyết định trạng thái tồn tại, độ bền liên kết và cân bằng phản ứng hóa học theo SGK GDPT 2018.",
    "relatedEquation": "Rayleigh/Tyndall Elastic Light Scattering",
    "iupacName": "Tyndall Colloidal Aerosol Mist Environment",
    "archetype": "FLUORESCENCE_SPECTRA",
    "structuredEffects": [
      {
        "effectId": "B18_EFF_39",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "BOTH",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 400 ATK/DEF cho toàn bộ đồng minh trong môi trường trường địa bàn."
      }
    ]
  },
  {
    "id": "card_b18_040_field_dead_sea_hypersaline_crystallization_basin_40",
    "name": "Hồ Tinh Thể Muối Bão Hòa Biển Chết (Địa Bàn 5)",
    "name_en": "Dead Sea Hypersaline Crystallization Basin (Field 5)",
    "cardType": "FIELD_ENVIRONMENT",
    "spellTrapSubtype": "FIELD_SPELL",
    "spellSpeed": 1,
    "rarity": "SUPER_RARE",
    "attribute": "TERRA",
    "manaCost": 5,
    "chemicalFormula": "NaCl-KCl-MgCl2",
    "effectCode": "SPELL_B18_DEAD_SEA_HYPERSALINE_CRYSTALLIZATION_BASIN_FIELD_40",
    "effectText": "[Phép Môi Trường / Field]: Đặt vào Field Zone. Tất cả quái thú thuộc tính TERRA nhận +400 ATK và +400 DEF. Quái thú đối phương khác thuộc tính bị giảm 200 ATK khi tuyên bố tấn công.",
    "scientificLore": "Môi trường địa hóa / điện hóa Hồ Tinh Thể Muối Bão Hòa Biển Chết (Fractional Halite Sylvite Evaporite Precipitation) quyết định trạng thái tồn tại, độ bền liên kết và cân bằng phản ứng hóa học theo SGK GDPT 2018.",
    "relatedEquation": "Fractional Halite Sylvite Evaporite Precipitation",
    "iupacName": "Dead Sea Hypersaline Crystallization Basin Environment",
    "archetype": "SOLVATION_SPHERE",
    "structuredEffects": [
      {
        "effectId": "B18_EFF_40",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "BOTH",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 400 ATK/DEF cho toàn bộ đồng minh trong môi trường trường địa bàn."
      }
    ]
  },
  {
    "id": "card_b18_041_field_hydration_solvation_sphere_domain_41",
    "name": "Vỏ Dung Môi Hydrat Hóa Solvation (Địa Bàn 6)",
    "name_en": "Hydration Solvation Sphere Domain (Field 6)",
    "cardType": "FIELD_ENVIRONMENT",
    "spellTrapSubtype": "FIELD_SPELL",
    "spellSpeed": 1,
    "rarity": "ULTRA_RARE",
    "attribute": "AQUA",
    "manaCost": 2,
    "chemicalFormula": "[M(H2O)6]n+",
    "effectCode": "SPELL_B18_HYDRATION_SOLVATION_SPHERE_DOMAIN_FIELD_41",
    "effectText": "[Phép Môi Trường / Field]: Đặt vào Field Zone. Tất cả quái thú thuộc tính AQUA nhận +400 ATK và +400 DEF. Quái thú đối phương khác thuộc tính bị giảm 200 ATK khi tuyên bố tấn công.",
    "scientificLore": "Môi trường địa hóa / điện hóa Vỏ Dung Môi Hydrat Hóa Solvation (Ion-Dipole Solvent Shell Stabilization) quyết định trạng thái tồn tại, độ bền liên kết và cân bằng phản ứng hóa học theo SGK GDPT 2018.",
    "relatedEquation": "Ion-Dipole Solvent Shell Stabilization",
    "iupacName": "Hydration Solvation Sphere Domain Environment",
    "archetype": "COLLOIDAL_SOL",
    "structuredEffects": [
      {
        "effectId": "B18_EFF_41",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "BOTH",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 400 ATK/DEF cho toàn bộ đồng minh trong môi trường trường địa bàn."
      }
    ]
  },
  {
    "id": "card_b18_042_field_deep_sea_hydrothermal_vent_biosphere_42",
    "name": "Miệng Phun Thủy Nhiệt Đại Dương (Địa Bàn 6)",
    "name_en": "Deep Sea Hydrothermal Vent Biosphere (Field 6)",
    "cardType": "FIELD_ENVIRONMENT",
    "spellTrapSubtype": "FIELD_SPELL",
    "spellSpeed": 1,
    "rarity": "SECRET_RARE",
    "attribute": "PYRO",
    "manaCost": 3,
    "chemicalFormula": "FeS-H2S Vent",
    "effectCode": "SPELL_B18_DEEP_SEA_HYDROTHERMAL_VENT_BIOSPHERE_FIELD_42",
    "effectText": "[Phép Môi Trường / Field]: Đặt vào Field Zone. Tất cả quái thú thuộc tính PYRO nhận +400 ATK và +400 DEF. Quái thú đối phương khác thuộc tính bị giảm 200 ATK khi tuyên bố tấn công.",
    "scientificLore": "Môi trường địa hóa / điện hóa Miệng Phun Thủy Nhiệt Đại Dương (Prebiotic Chemosynthesis Matrix at 350°C) quyết định trạng thái tồn tại, độ bền liên kết và cân bằng phản ứng hóa học theo SGK GDPT 2018.",
    "relatedEquation": "Prebiotic Chemosynthesis Matrix at 350°C",
    "iupacName": "Deep Sea Hydrothermal Vent Biosphere Environment",
    "archetype": "FLUORESCENCE_SPECTRA",
    "structuredEffects": [
      {
        "effectId": "B18_EFF_42",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "BOTH",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 400 ATK/DEF cho toàn bộ đồng minh trong môi trường trường địa bàn."
      }
    ]
  },
  {
    "id": "card_b18_043_field_galvanic_electroplating_bath_chamber_43",
    "name": "Bể Điện Hóa Galvanic Mạ Kền (Địa Bàn 6)",
    "name_en": "Galvanic Electroplating Bath Chamber (Field 6)",
    "cardType": "FIELD_ENVIRONMENT",
    "spellTrapSubtype": "FIELD_SPELL",
    "spellSpeed": 1,
    "rarity": "COMMON",
    "attribute": "ELECTRO",
    "manaCost": 4,
    "chemicalFormula": "NiSO4 Electrolyte",
    "effectCode": "SPELL_B18_GALVANIC_ELECTROPLATING_BATH_CHAMBER_FIELD_43",
    "effectText": "[Phép Môi Trường / Field]: Đặt vào Field Zone. Tất cả quái thú thuộc tính ELECTRO nhận +400 ATK và +400 DEF. Quái thú đối phương khác thuộc tính bị giảm 200 ATK khi tuyên bố tấn công.",
    "scientificLore": "Môi trường địa hóa / điện hóa Bể Điện Hóa Galvanic Mạ Kền (Faraday Law Cathodic Deposition m = (AIt)/(nF)) quyết định trạng thái tồn tại, độ bền liên kết và cân bằng phản ứng hóa học theo SGK GDPT 2018.",
    "relatedEquation": "Faraday Law Cathodic Deposition m = (AIt)/(nF)",
    "iupacName": "Galvanic Electroplating Bath Chamber Environment",
    "archetype": "SOLVATION_SPHERE",
    "structuredEffects": [
      {
        "effectId": "B18_EFF_43",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "BOTH",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 400 ATK/DEF cho toàn bộ đồng minh trong môi trường trường địa bàn."
      }
    ]
  },
  {
    "id": "card_b18_044_field_cryogenic_argon_isolation_matrix_44",
    "name": "Ma Trận Khí Trơ Nhiệt Độ Siêu Lạnh (Địa Bàn 6)",
    "name_en": "Cryogenic Argon Isolation Matrix (Field 6)",
    "cardType": "FIELD_ENVIRONMENT",
    "spellTrapSubtype": "FIELD_SPELL",
    "spellSpeed": 1,
    "rarity": "COMMON",
    "attribute": "NOBLE_VOID",
    "manaCost": 5,
    "chemicalFormula": "Ar(s) 10K",
    "effectCode": "SPELL_B18_CRYOGENIC_ARGON_ISOLATION_MATRIX_FIELD_44",
    "effectText": "[Phép Môi Trường / Field]: Đặt vào Field Zone. Tất cả quái thú thuộc tính NOBLE_VOID nhận +400 ATK và +400 DEF. Quái thú đối phương khác thuộc tính bị giảm 200 ATK khi tuyên bố tấn công.",
    "scientificLore": "Môi trường địa hóa / điện hóa Ma Trận Khí Trơ Nhiệt Độ Siêu Lạnh (Noble Gas Matrix Isolation of Reactive Radicals) quyết định trạng thái tồn tại, độ bền liên kết và cân bằng phản ứng hóa học theo SGK GDPT 2018.",
    "relatedEquation": "Noble Gas Matrix Isolation of Reactive Radicals",
    "iupacName": "Cryogenic Argon Isolation Matrix Environment",
    "archetype": "COLLOIDAL_SOL",
    "structuredEffects": [
      {
        "effectId": "B18_EFF_44",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "BOTH",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 400 ATK/DEF cho toàn bộ đồng minh trong môi trường trường địa bàn."
      }
    ]
  },
  {
    "id": "card_b18_045_field_acid_mine_drainage_pyrite_waste_45",
    "name": "Vùng Thoát Nước Mỏ Axit Cháy Rực (Địa Bàn 6)",
    "name_en": "Acid Mine Drainage Pyrite Waste (Field 6)",
    "cardType": "FIELD_ENVIRONMENT",
    "spellTrapSubtype": "FIELD_SPELL",
    "spellSpeed": 1,
    "rarity": "COMMON",
    "attribute": "ACID_DARK",
    "manaCost": 2,
    "chemicalFormula": "FeS2 + O2 + H2O",
    "effectCode": "SPELL_B18_ACID_MINE_DRAINAGE_PYRITE_WASTE_FIELD_45",
    "effectText": "[Phép Môi Trường / Field]: Đặt vào Field Zone. Tất cả quái thú thuộc tính ACID_DARK nhận +400 ATK và +400 DEF. Quái thú đối phương khác thuộc tính bị giảm 200 ATK khi tuyên bố tấn công.",
    "scientificLore": "Môi trường địa hóa / điện hóa Vùng Thoát Nước Mỏ Axit Cháy Rực (2FeS₂ + 7O₂ + 2H₂O → 2Fe²⁺ + 4SO₄²⁻ + 4H⁺) quyết định trạng thái tồn tại, độ bền liên kết và cân bằng phản ứng hóa học theo SGK GDPT 2018.",
    "relatedEquation": "2FeS₂ + 7O₂ + 2H₂O → 2Fe²⁺ + 4SO₄²⁻ + 4H⁺",
    "iupacName": "Acid Mine Drainage Pyrite Waste Environment",
    "archetype": "FLUORESCENCE_SPECTRA",
    "structuredEffects": [
      {
        "effectId": "B18_EFF_45",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "BOTH",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 400 ATK/DEF cho toàn bộ đồng minh trong môi trường trường địa bàn."
      }
    ]
  },
  {
    "id": "card_b18_046_field_stratospheric_ozone_uv_shielding_46",
    "name": "Tầng Khí Quyển Ôzôn Hấp Thụ Tia Cực Tím (Địa Bàn 6)",
    "name_en": "Stratospheric Ozone UV Shielding (Field 6)",
    "cardType": "FIELD_ENVIRONMENT",
    "spellTrapSubtype": "FIELD_SPELL",
    "spellSpeed": 1,
    "rarity": "RARE",
    "attribute": "AERO",
    "manaCost": 3,
    "chemicalFormula": "O3 Layer",
    "effectCode": "SPELL_B18_STRATOSPHERIC_OZONE_UV_SHIELDING_FIELD_46",
    "effectText": "[Phép Môi Trường / Field]: Đặt vào Field Zone. Tất cả quái thú thuộc tính AERO nhận +400 ATK và +400 DEF. Quái thú đối phương khác thuộc tính bị giảm 200 ATK khi tuyên bố tấn công.",
    "scientificLore": "Môi trường địa hóa / điện hóa Tầng Khí Quyển Ôzôn Hấp Thụ Tia Cực Tím (O₃ + hν(UV) → O₂ + O· Chapman Cycle) quyết định trạng thái tồn tại, độ bền liên kết và cân bằng phản ứng hóa học theo SGK GDPT 2018.",
    "relatedEquation": "O₃ + hν(UV) → O₂ + O· Chapman Cycle",
    "iupacName": "Stratospheric Ozone UV Shielding Environment",
    "archetype": "SOLVATION_SPHERE",
    "structuredEffects": [
      {
        "effectId": "B18_EFF_46",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "BOTH",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 400 ATK/DEF cho toàn bộ đồng minh trong môi trường trường địa bàn."
      }
    ]
  },
  {
    "id": "card_b18_047_field_tyndall_colloidal_aerosol_mist_47",
    "name": "Hệ Keo Khói Tyndall Tán Xạ (Địa Bàn 6)",
    "name_en": "Tyndall Colloidal Aerosol Mist (Field 6)",
    "cardType": "FIELD_ENVIRONMENT",
    "spellTrapSubtype": "FIELD_SPELL",
    "spellSpeed": 1,
    "rarity": "RARE",
    "attribute": "AERO",
    "manaCost": 4,
    "chemicalFormula": "Colloidal Sol",
    "effectCode": "SPELL_B18_TYNDALL_COLLOIDAL_AEROSOL_MIST_FIELD_47",
    "effectText": "[Phép Môi Trường / Field]: Đặt vào Field Zone. Tất cả quái thú thuộc tính AERO nhận +400 ATK và +400 DEF. Quái thú đối phương khác thuộc tính bị giảm 200 ATK khi tuyên bố tấn công.",
    "scientificLore": "Môi trường địa hóa / điện hóa Hệ Keo Khói Tyndall Tán Xạ (Rayleigh/Tyndall Elastic Light Scattering) quyết định trạng thái tồn tại, độ bền liên kết và cân bằng phản ứng hóa học theo SGK GDPT 2018.",
    "relatedEquation": "Rayleigh/Tyndall Elastic Light Scattering",
    "iupacName": "Tyndall Colloidal Aerosol Mist Environment",
    "archetype": "COLLOIDAL_SOL",
    "structuredEffects": [
      {
        "effectId": "B18_EFF_47",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "BOTH",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 400 ATK/DEF cho toàn bộ đồng minh trong môi trường trường địa bàn."
      }
    ]
  },
  {
    "id": "card_b18_048_field_dead_sea_hypersaline_crystallization_basin_48",
    "name": "Hồ Tinh Thể Muối Bão Hòa Biển Chết (Địa Bàn 6)",
    "name_en": "Dead Sea Hypersaline Crystallization Basin (Field 6)",
    "cardType": "FIELD_ENVIRONMENT",
    "spellTrapSubtype": "FIELD_SPELL",
    "spellSpeed": 1,
    "rarity": "SUPER_RARE",
    "attribute": "TERRA",
    "manaCost": 5,
    "chemicalFormula": "NaCl-KCl-MgCl2",
    "effectCode": "SPELL_B18_DEAD_SEA_HYPERSALINE_CRYSTALLIZATION_BASIN_FIELD_48",
    "effectText": "[Phép Môi Trường / Field]: Đặt vào Field Zone. Tất cả quái thú thuộc tính TERRA nhận +400 ATK và +400 DEF. Quái thú đối phương khác thuộc tính bị giảm 200 ATK khi tuyên bố tấn công.",
    "scientificLore": "Môi trường địa hóa / điện hóa Hồ Tinh Thể Muối Bão Hòa Biển Chết (Fractional Halite Sylvite Evaporite Precipitation) quyết định trạng thái tồn tại, độ bền liên kết và cân bằng phản ứng hóa học theo SGK GDPT 2018.",
    "relatedEquation": "Fractional Halite Sylvite Evaporite Precipitation",
    "iupacName": "Dead Sea Hypersaline Crystallization Basin Environment",
    "archetype": "FLUORESCENCE_SPECTRA",
    "structuredEffects": [
      {
        "effectId": "B18_EFF_48",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "BOTH",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 400 ATK/DEF cho toàn bộ đồng minh trong môi trường trường địa bàn."
      }
    ]
  },
  {
    "id": "card_b18_049_field_hydration_solvation_sphere_domain_49",
    "name": "Vỏ Dung Môi Hydrat Hóa Solvation (Địa Bàn 7)",
    "name_en": "Hydration Solvation Sphere Domain (Field 7)",
    "cardType": "FIELD_ENVIRONMENT",
    "spellTrapSubtype": "FIELD_SPELL",
    "spellSpeed": 1,
    "rarity": "SUPER_RARE",
    "attribute": "AQUA",
    "manaCost": 2,
    "chemicalFormula": "[M(H2O)6]n+",
    "effectCode": "SPELL_B18_HYDRATION_SOLVATION_SPHERE_DOMAIN_FIELD_49",
    "effectText": "[Phép Môi Trường / Field]: Đặt vào Field Zone. Tất cả quái thú thuộc tính AQUA nhận +400 ATK và +400 DEF. Quái thú đối phương khác thuộc tính bị giảm 200 ATK khi tuyên bố tấn công.",
    "scientificLore": "Môi trường địa hóa / điện hóa Vỏ Dung Môi Hydrat Hóa Solvation (Ion-Dipole Solvent Shell Stabilization) quyết định trạng thái tồn tại, độ bền liên kết và cân bằng phản ứng hóa học theo SGK GDPT 2018.",
    "relatedEquation": "Ion-Dipole Solvent Shell Stabilization",
    "iupacName": "Hydration Solvation Sphere Domain Environment",
    "archetype": "SOLVATION_SPHERE",
    "structuredEffects": [
      {
        "effectId": "B18_EFF_49",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "BOTH",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 400 ATK/DEF cho toàn bộ đồng minh trong môi trường trường địa bàn."
      }
    ]
  },
  {
    "id": "card_b18_050_field_deep_sea_hydrothermal_vent_biosphere_50",
    "name": "Miệng Phun Thủy Nhiệt Đại Dương (Địa Bàn 7)",
    "name_en": "Deep Sea Hydrothermal Vent Biosphere (Field 7)",
    "cardType": "FIELD_ENVIRONMENT",
    "spellTrapSubtype": "FIELD_SPELL",
    "spellSpeed": 1,
    "rarity": "ULTRA_RARE",
    "attribute": "PYRO",
    "manaCost": 3,
    "chemicalFormula": "FeS-H2S Vent",
    "effectCode": "SPELL_B18_DEEP_SEA_HYDROTHERMAL_VENT_BIOSPHERE_FIELD_50",
    "effectText": "[Phép Môi Trường / Field]: Đặt vào Field Zone. Tất cả quái thú thuộc tính PYRO nhận +400 ATK và +400 DEF. Quái thú đối phương khác thuộc tính bị giảm 200 ATK khi tuyên bố tấn công.",
    "scientificLore": "Môi trường địa hóa / điện hóa Miệng Phun Thủy Nhiệt Đại Dương (Prebiotic Chemosynthesis Matrix at 350°C) quyết định trạng thái tồn tại, độ bền liên kết và cân bằng phản ứng hóa học theo SGK GDPT 2018.",
    "relatedEquation": "Prebiotic Chemosynthesis Matrix at 350°C",
    "iupacName": "Deep Sea Hydrothermal Vent Biosphere Environment",
    "archetype": "COLLOIDAL_SOL",
    "structuredEffects": [
      {
        "effectId": "B18_EFF_50",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "BOTH",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 400 ATK/DEF cho toàn bộ đồng minh trong môi trường trường địa bàn."
      }
    ]
  },
  {
    "id": "card_b18_051_field_galvanic_electroplating_bath_chamber_51",
    "name": "Bể Điện Hóa Galvanic Mạ Kền (Địa Bàn 7)",
    "name_en": "Galvanic Electroplating Bath Chamber (Field 7)",
    "cardType": "FIELD_ENVIRONMENT",
    "spellTrapSubtype": "FIELD_SPELL",
    "spellSpeed": 1,
    "rarity": "SECRET_RARE",
    "attribute": "ELECTRO",
    "manaCost": 4,
    "chemicalFormula": "NiSO4 Electrolyte",
    "effectCode": "SPELL_B18_GALVANIC_ELECTROPLATING_BATH_CHAMBER_FIELD_51",
    "effectText": "[Phép Môi Trường / Field]: Đặt vào Field Zone. Tất cả quái thú thuộc tính ELECTRO nhận +400 ATK và +400 DEF. Quái thú đối phương khác thuộc tính bị giảm 200 ATK khi tuyên bố tấn công.",
    "scientificLore": "Môi trường địa hóa / điện hóa Bể Điện Hóa Galvanic Mạ Kền (Faraday Law Cathodic Deposition m = (AIt)/(nF)) quyết định trạng thái tồn tại, độ bền liên kết và cân bằng phản ứng hóa học theo SGK GDPT 2018.",
    "relatedEquation": "Faraday Law Cathodic Deposition m = (AIt)/(nF)",
    "iupacName": "Galvanic Electroplating Bath Chamber Environment",
    "archetype": "FLUORESCENCE_SPECTRA",
    "structuredEffects": [
      {
        "effectId": "B18_EFF_51",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "BOTH",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 400 ATK/DEF cho toàn bộ đồng minh trong môi trường trường địa bàn."
      }
    ]
  },
  {
    "id": "card_b18_052_field_cryogenic_argon_isolation_matrix_52",
    "name": "Ma Trận Khí Trơ Nhiệt Độ Siêu Lạnh (Địa Bàn 7)",
    "name_en": "Cryogenic Argon Isolation Matrix (Field 7)",
    "cardType": "FIELD_ENVIRONMENT",
    "spellTrapSubtype": "FIELD_SPELL",
    "spellSpeed": 1,
    "rarity": "COMMON",
    "attribute": "NOBLE_VOID",
    "manaCost": 5,
    "chemicalFormula": "Ar(s) 10K",
    "effectCode": "SPELL_B18_CRYOGENIC_ARGON_ISOLATION_MATRIX_FIELD_52",
    "effectText": "[Phép Môi Trường / Field]: Đặt vào Field Zone. Tất cả quái thú thuộc tính NOBLE_VOID nhận +400 ATK và +400 DEF. Quái thú đối phương khác thuộc tính bị giảm 200 ATK khi tuyên bố tấn công.",
    "scientificLore": "Môi trường địa hóa / điện hóa Ma Trận Khí Trơ Nhiệt Độ Siêu Lạnh (Noble Gas Matrix Isolation of Reactive Radicals) quyết định trạng thái tồn tại, độ bền liên kết và cân bằng phản ứng hóa học theo SGK GDPT 2018.",
    "relatedEquation": "Noble Gas Matrix Isolation of Reactive Radicals",
    "iupacName": "Cryogenic Argon Isolation Matrix Environment",
    "archetype": "SOLVATION_SPHERE",
    "structuredEffects": [
      {
        "effectId": "B18_EFF_52",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "BOTH",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 400 ATK/DEF cho toàn bộ đồng minh trong môi trường trường địa bàn."
      }
    ]
  },
  {
    "id": "card_b18_053_field_acid_mine_drainage_pyrite_waste_53",
    "name": "Vùng Thoát Nước Mỏ Axit Cháy Rực (Địa Bàn 7)",
    "name_en": "Acid Mine Drainage Pyrite Waste (Field 7)",
    "cardType": "FIELD_ENVIRONMENT",
    "spellTrapSubtype": "FIELD_SPELL",
    "spellSpeed": 1,
    "rarity": "COMMON",
    "attribute": "ACID_DARK",
    "manaCost": 2,
    "chemicalFormula": "FeS2 + O2 + H2O",
    "effectCode": "SPELL_B18_ACID_MINE_DRAINAGE_PYRITE_WASTE_FIELD_53",
    "effectText": "[Phép Môi Trường / Field]: Đặt vào Field Zone. Tất cả quái thú thuộc tính ACID_DARK nhận +400 ATK và +400 DEF. Quái thú đối phương khác thuộc tính bị giảm 200 ATK khi tuyên bố tấn công.",
    "scientificLore": "Môi trường địa hóa / điện hóa Vùng Thoát Nước Mỏ Axit Cháy Rực (2FeS₂ + 7O₂ + 2H₂O → 2Fe²⁺ + 4SO₄²⁻ + 4H⁺) quyết định trạng thái tồn tại, độ bền liên kết và cân bằng phản ứng hóa học theo SGK GDPT 2018.",
    "relatedEquation": "2FeS₂ + 7O₂ + 2H₂O → 2Fe²⁺ + 4SO₄²⁻ + 4H⁺",
    "iupacName": "Acid Mine Drainage Pyrite Waste Environment",
    "archetype": "COLLOIDAL_SOL",
    "structuredEffects": [
      {
        "effectId": "B18_EFF_53",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "BOTH",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 400 ATK/DEF cho toàn bộ đồng minh trong môi trường trường địa bàn."
      }
    ]
  },
  {
    "id": "card_b18_054_field_stratospheric_ozone_uv_shielding_54",
    "name": "Tầng Khí Quyển Ôzôn Hấp Thụ Tia Cực Tím (Địa Bàn 7)",
    "name_en": "Stratospheric Ozone UV Shielding (Field 7)",
    "cardType": "FIELD_ENVIRONMENT",
    "spellTrapSubtype": "FIELD_SPELL",
    "spellSpeed": 1,
    "rarity": "COMMON",
    "attribute": "AERO",
    "manaCost": 3,
    "chemicalFormula": "O3 Layer",
    "effectCode": "SPELL_B18_STRATOSPHERIC_OZONE_UV_SHIELDING_FIELD_54",
    "effectText": "[Phép Môi Trường / Field]: Đặt vào Field Zone. Tất cả quái thú thuộc tính AERO nhận +400 ATK và +400 DEF. Quái thú đối phương khác thuộc tính bị giảm 200 ATK khi tuyên bố tấn công.",
    "scientificLore": "Môi trường địa hóa / điện hóa Tầng Khí Quyển Ôzôn Hấp Thụ Tia Cực Tím (O₃ + hν(UV) → O₂ + O· Chapman Cycle) quyết định trạng thái tồn tại, độ bền liên kết và cân bằng phản ứng hóa học theo SGK GDPT 2018.",
    "relatedEquation": "O₃ + hν(UV) → O₂ + O· Chapman Cycle",
    "iupacName": "Stratospheric Ozone UV Shielding Environment",
    "archetype": "FLUORESCENCE_SPECTRA",
    "structuredEffects": [
      {
        "effectId": "B18_EFF_54",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "BOTH",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 400 ATK/DEF cho toàn bộ đồng minh trong môi trường trường địa bàn."
      }
    ]
  },
  {
    "id": "card_b18_055_field_tyndall_colloidal_aerosol_mist_55",
    "name": "Hệ Keo Khói Tyndall Tán Xạ (Địa Bàn 7)",
    "name_en": "Tyndall Colloidal Aerosol Mist (Field 7)",
    "cardType": "FIELD_ENVIRONMENT",
    "spellTrapSubtype": "FIELD_SPELL",
    "spellSpeed": 1,
    "rarity": "RARE",
    "attribute": "AERO",
    "manaCost": 4,
    "chemicalFormula": "Colloidal Sol",
    "effectCode": "SPELL_B18_TYNDALL_COLLOIDAL_AEROSOL_MIST_FIELD_55",
    "effectText": "[Phép Môi Trường / Field]: Đặt vào Field Zone. Tất cả quái thú thuộc tính AERO nhận +400 ATK và +400 DEF. Quái thú đối phương khác thuộc tính bị giảm 200 ATK khi tuyên bố tấn công.",
    "scientificLore": "Môi trường địa hóa / điện hóa Hệ Keo Khói Tyndall Tán Xạ (Rayleigh/Tyndall Elastic Light Scattering) quyết định trạng thái tồn tại, độ bền liên kết và cân bằng phản ứng hóa học theo SGK GDPT 2018.",
    "relatedEquation": "Rayleigh/Tyndall Elastic Light Scattering",
    "iupacName": "Tyndall Colloidal Aerosol Mist Environment",
    "archetype": "SOLVATION_SPHERE",
    "structuredEffects": [
      {
        "effectId": "B18_EFF_55",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "BOTH",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 400 ATK/DEF cho toàn bộ đồng minh trong môi trường trường địa bàn."
      }
    ]
  },
  {
    "id": "card_b18_056_field_dead_sea_hypersaline_crystallization_basin_56",
    "name": "Hồ Tinh Thể Muối Bão Hòa Biển Chết (Địa Bàn 7)",
    "name_en": "Dead Sea Hypersaline Crystallization Basin (Field 7)",
    "cardType": "FIELD_ENVIRONMENT",
    "spellTrapSubtype": "FIELD_SPELL",
    "spellSpeed": 1,
    "rarity": "RARE",
    "attribute": "TERRA",
    "manaCost": 5,
    "chemicalFormula": "NaCl-KCl-MgCl2",
    "effectCode": "SPELL_B18_DEAD_SEA_HYPERSALINE_CRYSTALLIZATION_BASIN_FIELD_56",
    "effectText": "[Phép Môi Trường / Field]: Đặt vào Field Zone. Tất cả quái thú thuộc tính TERRA nhận +400 ATK và +400 DEF. Quái thú đối phương khác thuộc tính bị giảm 200 ATK khi tuyên bố tấn công.",
    "scientificLore": "Môi trường địa hóa / điện hóa Hồ Tinh Thể Muối Bão Hòa Biển Chết (Fractional Halite Sylvite Evaporite Precipitation) quyết định trạng thái tồn tại, độ bền liên kết và cân bằng phản ứng hóa học theo SGK GDPT 2018.",
    "relatedEquation": "Fractional Halite Sylvite Evaporite Precipitation",
    "iupacName": "Dead Sea Hypersaline Crystallization Basin Environment",
    "archetype": "COLLOIDAL_SOL",
    "structuredEffects": [
      {
        "effectId": "B18_EFF_56",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "BOTH",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 400 ATK/DEF cho toàn bộ đồng minh trong môi trường trường địa bàn."
      }
    ]
  },
  {
    "id": "card_b18_057_field_hydration_solvation_sphere_domain_57",
    "name": "Vỏ Dung Môi Hydrat Hóa Solvation (Địa Bàn 8)",
    "name_en": "Hydration Solvation Sphere Domain (Field 8)",
    "cardType": "FIELD_ENVIRONMENT",
    "spellTrapSubtype": "FIELD_SPELL",
    "spellSpeed": 1,
    "rarity": "SUPER_RARE",
    "attribute": "AQUA",
    "manaCost": 2,
    "chemicalFormula": "[M(H2O)6]n+",
    "effectCode": "SPELL_B18_HYDRATION_SOLVATION_SPHERE_DOMAIN_FIELD_57",
    "effectText": "[Phép Môi Trường / Field]: Đặt vào Field Zone. Tất cả quái thú thuộc tính AQUA nhận +400 ATK và +400 DEF. Quái thú đối phương khác thuộc tính bị giảm 200 ATK khi tuyên bố tấn công.",
    "scientificLore": "Môi trường địa hóa / điện hóa Vỏ Dung Môi Hydrat Hóa Solvation (Ion-Dipole Solvent Shell Stabilization) quyết định trạng thái tồn tại, độ bền liên kết và cân bằng phản ứng hóa học theo SGK GDPT 2018.",
    "relatedEquation": "Ion-Dipole Solvent Shell Stabilization",
    "iupacName": "Hydration Solvation Sphere Domain Environment",
    "archetype": "FLUORESCENCE_SPECTRA",
    "structuredEffects": [
      {
        "effectId": "B18_EFF_57",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "BOTH",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 400 ATK/DEF cho toàn bộ đồng minh trong môi trường trường địa bàn."
      }
    ]
  },
  {
    "id": "card_b18_058_field_deep_sea_hydrothermal_vent_biosphere_58",
    "name": "Miệng Phun Thủy Nhiệt Đại Dương (Địa Bàn 8)",
    "name_en": "Deep Sea Hydrothermal Vent Biosphere (Field 8)",
    "cardType": "FIELD_ENVIRONMENT",
    "spellTrapSubtype": "FIELD_SPELL",
    "spellSpeed": 1,
    "rarity": "SUPER_RARE",
    "attribute": "PYRO",
    "manaCost": 3,
    "chemicalFormula": "FeS-H2S Vent",
    "effectCode": "SPELL_B18_DEEP_SEA_HYDROTHERMAL_VENT_BIOSPHERE_FIELD_58",
    "effectText": "[Phép Môi Trường / Field]: Đặt vào Field Zone. Tất cả quái thú thuộc tính PYRO nhận +400 ATK và +400 DEF. Quái thú đối phương khác thuộc tính bị giảm 200 ATK khi tuyên bố tấn công.",
    "scientificLore": "Môi trường địa hóa / điện hóa Miệng Phun Thủy Nhiệt Đại Dương (Prebiotic Chemosynthesis Matrix at 350°C) quyết định trạng thái tồn tại, độ bền liên kết và cân bằng phản ứng hóa học theo SGK GDPT 2018.",
    "relatedEquation": "Prebiotic Chemosynthesis Matrix at 350°C",
    "iupacName": "Deep Sea Hydrothermal Vent Biosphere Environment",
    "archetype": "SOLVATION_SPHERE",
    "structuredEffects": [
      {
        "effectId": "B18_EFF_58",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "BOTH",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 400 ATK/DEF cho toàn bộ đồng minh trong môi trường trường địa bàn."
      }
    ]
  },
  {
    "id": "card_b18_059_field_galvanic_electroplating_bath_chamber_59",
    "name": "Bể Điện Hóa Galvanic Mạ Kền (Địa Bàn 8)",
    "name_en": "Galvanic Electroplating Bath Chamber (Field 8)",
    "cardType": "FIELD_ENVIRONMENT",
    "spellTrapSubtype": "FIELD_SPELL",
    "spellSpeed": 1,
    "rarity": "ULTRA_RARE",
    "attribute": "ELECTRO",
    "manaCost": 4,
    "chemicalFormula": "NiSO4 Electrolyte",
    "effectCode": "SPELL_B18_GALVANIC_ELECTROPLATING_BATH_CHAMBER_FIELD_59",
    "effectText": "[Phép Môi Trường / Field]: Đặt vào Field Zone. Tất cả quái thú thuộc tính ELECTRO nhận +400 ATK và +400 DEF. Quái thú đối phương khác thuộc tính bị giảm 200 ATK khi tuyên bố tấn công.",
    "scientificLore": "Môi trường địa hóa / điện hóa Bể Điện Hóa Galvanic Mạ Kền (Faraday Law Cathodic Deposition m = (AIt)/(nF)) quyết định trạng thái tồn tại, độ bền liên kết và cân bằng phản ứng hóa học theo SGK GDPT 2018.",
    "relatedEquation": "Faraday Law Cathodic Deposition m = (AIt)/(nF)",
    "iupacName": "Galvanic Electroplating Bath Chamber Environment",
    "archetype": "COLLOIDAL_SOL",
    "structuredEffects": [
      {
        "effectId": "B18_EFF_59",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "BOTH",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 400 ATK/DEF cho toàn bộ đồng minh trong môi trường trường địa bàn."
      }
    ]
  },
  {
    "id": "card_b18_060_field_cryogenic_argon_isolation_matrix_60",
    "name": "Ma Trận Khí Trơ Nhiệt Độ Siêu Lạnh (Địa Bàn 8)",
    "name_en": "Cryogenic Argon Isolation Matrix (Field 8)",
    "cardType": "FIELD_ENVIRONMENT",
    "spellTrapSubtype": "FIELD_SPELL",
    "spellSpeed": 1,
    "rarity": "SECRET_RARE",
    "attribute": "NOBLE_VOID",
    "manaCost": 5,
    "chemicalFormula": "Ar(s) 10K",
    "effectCode": "SPELL_B18_CRYOGENIC_ARGON_ISOLATION_MATRIX_FIELD_60",
    "effectText": "[Phép Môi Trường / Field]: Đặt vào Field Zone. Tất cả quái thú thuộc tính NOBLE_VOID nhận +400 ATK và +400 DEF. Quái thú đối phương khác thuộc tính bị giảm 200 ATK khi tuyên bố tấn công.",
    "scientificLore": "Môi trường địa hóa / điện hóa Ma Trận Khí Trơ Nhiệt Độ Siêu Lạnh (Noble Gas Matrix Isolation of Reactive Radicals) quyết định trạng thái tồn tại, độ bền liên kết và cân bằng phản ứng hóa học theo SGK GDPT 2018.",
    "relatedEquation": "Noble Gas Matrix Isolation of Reactive Radicals",
    "iupacName": "Cryogenic Argon Isolation Matrix Environment",
    "archetype": "FLUORESCENCE_SPECTRA",
    "structuredEffects": [
      {
        "effectId": "B18_EFF_60",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "BOTH",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 400 ATK/DEF cho toàn bộ đồng minh trong môi trường trường địa bàn."
      }
    ]
  },
  {
    "id": "card_b18_061_field_acid_mine_drainage_pyrite_waste_61",
    "name": "Vùng Thoát Nước Mỏ Axit Cháy Rực (Địa Bàn 8)",
    "name_en": "Acid Mine Drainage Pyrite Waste (Field 8)",
    "cardType": "FIELD_ENVIRONMENT",
    "spellTrapSubtype": "FIELD_SPELL",
    "spellSpeed": 1,
    "rarity": "COMMON",
    "attribute": "ACID_DARK",
    "manaCost": 2,
    "chemicalFormula": "FeS2 + O2 + H2O",
    "effectCode": "SPELL_B18_ACID_MINE_DRAINAGE_PYRITE_WASTE_FIELD_61",
    "effectText": "[Phép Môi Trường / Field]: Đặt vào Field Zone. Tất cả quái thú thuộc tính ACID_DARK nhận +400 ATK và +400 DEF. Quái thú đối phương khác thuộc tính bị giảm 200 ATK khi tuyên bố tấn công.",
    "scientificLore": "Môi trường địa hóa / điện hóa Vùng Thoát Nước Mỏ Axit Cháy Rực (2FeS₂ + 7O₂ + 2H₂O → 2Fe²⁺ + 4SO₄²⁻ + 4H⁺) quyết định trạng thái tồn tại, độ bền liên kết và cân bằng phản ứng hóa học theo SGK GDPT 2018.",
    "relatedEquation": "2FeS₂ + 7O₂ + 2H₂O → 2Fe²⁺ + 4SO₄²⁻ + 4H⁺",
    "iupacName": "Acid Mine Drainage Pyrite Waste Environment",
    "archetype": "SOLVATION_SPHERE",
    "structuredEffects": [
      {
        "effectId": "B18_EFF_61",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "BOTH",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 400 ATK/DEF cho toàn bộ đồng minh trong môi trường trường địa bàn."
      }
    ]
  },
  {
    "id": "card_b18_062_field_stratospheric_ozone_uv_shielding_62",
    "name": "Tầng Khí Quyển Ôzôn Hấp Thụ Tia Cực Tím (Địa Bàn 8)",
    "name_en": "Stratospheric Ozone UV Shielding (Field 8)",
    "cardType": "FIELD_ENVIRONMENT",
    "spellTrapSubtype": "FIELD_SPELL",
    "spellSpeed": 1,
    "rarity": "COMMON",
    "attribute": "AERO",
    "manaCost": 3,
    "chemicalFormula": "O3 Layer",
    "effectCode": "SPELL_B18_STRATOSPHERIC_OZONE_UV_SHIELDING_FIELD_62",
    "effectText": "[Phép Môi Trường / Field]: Đặt vào Field Zone. Tất cả quái thú thuộc tính AERO nhận +400 ATK và +400 DEF. Quái thú đối phương khác thuộc tính bị giảm 200 ATK khi tuyên bố tấn công.",
    "scientificLore": "Môi trường địa hóa / điện hóa Tầng Khí Quyển Ôzôn Hấp Thụ Tia Cực Tím (O₃ + hν(UV) → O₂ + O· Chapman Cycle) quyết định trạng thái tồn tại, độ bền liên kết và cân bằng phản ứng hóa học theo SGK GDPT 2018.",
    "relatedEquation": "O₃ + hν(UV) → O₂ + O· Chapman Cycle",
    "iupacName": "Stratospheric Ozone UV Shielding Environment",
    "archetype": "COLLOIDAL_SOL",
    "structuredEffects": [
      {
        "effectId": "B18_EFF_62",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "BOTH",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 400 ATK/DEF cho toàn bộ đồng minh trong môi trường trường địa bàn."
      }
    ]
  },
  {
    "id": "card_b18_063_field_tyndall_colloidal_aerosol_mist_63",
    "name": "Hệ Keo Khói Tyndall Tán Xạ (Địa Bàn 8)",
    "name_en": "Tyndall Colloidal Aerosol Mist (Field 8)",
    "cardType": "FIELD_ENVIRONMENT",
    "spellTrapSubtype": "FIELD_SPELL",
    "spellSpeed": 1,
    "rarity": "COMMON",
    "attribute": "AERO",
    "manaCost": 4,
    "chemicalFormula": "Colloidal Sol",
    "effectCode": "SPELL_B18_TYNDALL_COLLOIDAL_AEROSOL_MIST_FIELD_63",
    "effectText": "[Phép Môi Trường / Field]: Đặt vào Field Zone. Tất cả quái thú thuộc tính AERO nhận +400 ATK và +400 DEF. Quái thú đối phương khác thuộc tính bị giảm 200 ATK khi tuyên bố tấn công.",
    "scientificLore": "Môi trường địa hóa / điện hóa Hệ Keo Khói Tyndall Tán Xạ (Rayleigh/Tyndall Elastic Light Scattering) quyết định trạng thái tồn tại, độ bền liên kết và cân bằng phản ứng hóa học theo SGK GDPT 2018.",
    "relatedEquation": "Rayleigh/Tyndall Elastic Light Scattering",
    "iupacName": "Tyndall Colloidal Aerosol Mist Environment",
    "archetype": "FLUORESCENCE_SPECTRA",
    "structuredEffects": [
      {
        "effectId": "B18_EFF_63",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "BOTH",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 400 ATK/DEF cho toàn bộ đồng minh trong môi trường trường địa bàn."
      }
    ]
  },
  {
    "id": "card_b18_064_field_dead_sea_hypersaline_crystallization_basin_64",
    "name": "Hồ Tinh Thể Muối Bão Hòa Biển Chết (Địa Bàn 8)",
    "name_en": "Dead Sea Hypersaline Crystallization Basin (Field 8)",
    "cardType": "FIELD_ENVIRONMENT",
    "spellTrapSubtype": "FIELD_SPELL",
    "spellSpeed": 1,
    "rarity": "RARE",
    "attribute": "TERRA",
    "manaCost": 5,
    "chemicalFormula": "NaCl-KCl-MgCl2",
    "effectCode": "SPELL_B18_DEAD_SEA_HYPERSALINE_CRYSTALLIZATION_BASIN_FIELD_64",
    "effectText": "[Phép Môi Trường / Field]: Đặt vào Field Zone. Tất cả quái thú thuộc tính TERRA nhận +400 ATK và +400 DEF. Quái thú đối phương khác thuộc tính bị giảm 200 ATK khi tuyên bố tấn công.",
    "scientificLore": "Môi trường địa hóa / điện hóa Hồ Tinh Thể Muối Bão Hòa Biển Chết (Fractional Halite Sylvite Evaporite Precipitation) quyết định trạng thái tồn tại, độ bền liên kết và cân bằng phản ứng hóa học theo SGK GDPT 2018.",
    "relatedEquation": "Fractional Halite Sylvite Evaporite Precipitation",
    "iupacName": "Dead Sea Hypersaline Crystallization Basin Environment",
    "archetype": "SOLVATION_SPHERE",
    "structuredEffects": [
      {
        "effectId": "B18_EFF_64",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "BOTH",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 400 ATK/DEF cho toàn bộ đồng minh trong môi trường trường địa bàn."
      }
    ]
  },
  {
    "id": "card_b18_065_field_hydration_solvation_sphere_domain_65",
    "name": "Vỏ Dung Môi Hydrat Hóa Solvation (Địa Bàn 9)",
    "name_en": "Hydration Solvation Sphere Domain (Field 9)",
    "cardType": "FIELD_ENVIRONMENT",
    "spellTrapSubtype": "FIELD_SPELL",
    "spellSpeed": 1,
    "rarity": "RARE",
    "attribute": "AQUA",
    "manaCost": 2,
    "chemicalFormula": "[M(H2O)6]n+",
    "effectCode": "SPELL_B18_HYDRATION_SOLVATION_SPHERE_DOMAIN_FIELD_65",
    "effectText": "[Phép Môi Trường / Field]: Đặt vào Field Zone. Tất cả quái thú thuộc tính AQUA nhận +400 ATK và +400 DEF. Quái thú đối phương khác thuộc tính bị giảm 200 ATK khi tuyên bố tấn công.",
    "scientificLore": "Môi trường địa hóa / điện hóa Vỏ Dung Môi Hydrat Hóa Solvation (Ion-Dipole Solvent Shell Stabilization) quyết định trạng thái tồn tại, độ bền liên kết và cân bằng phản ứng hóa học theo SGK GDPT 2018.",
    "relatedEquation": "Ion-Dipole Solvent Shell Stabilization",
    "iupacName": "Hydration Solvation Sphere Domain Environment",
    "archetype": "COLLOIDAL_SOL",
    "structuredEffects": [
      {
        "effectId": "B18_EFF_65",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "BOTH",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 400 ATK/DEF cho toàn bộ đồng minh trong môi trường trường địa bàn."
      }
    ]
  },
  {
    "id": "card_b18_066_field_deep_sea_hydrothermal_vent_biosphere_66",
    "name": "Miệng Phun Thủy Nhiệt Đại Dương (Địa Bàn 9)",
    "name_en": "Deep Sea Hydrothermal Vent Biosphere (Field 9)",
    "cardType": "FIELD_ENVIRONMENT",
    "spellTrapSubtype": "FIELD_SPELL",
    "spellSpeed": 1,
    "rarity": "SUPER_RARE",
    "attribute": "PYRO",
    "manaCost": 3,
    "chemicalFormula": "FeS-H2S Vent",
    "effectCode": "SPELL_B18_DEEP_SEA_HYDROTHERMAL_VENT_BIOSPHERE_FIELD_66",
    "effectText": "[Phép Môi Trường / Field]: Đặt vào Field Zone. Tất cả quái thú thuộc tính PYRO nhận +400 ATK và +400 DEF. Quái thú đối phương khác thuộc tính bị giảm 200 ATK khi tuyên bố tấn công.",
    "scientificLore": "Môi trường địa hóa / điện hóa Miệng Phun Thủy Nhiệt Đại Dương (Prebiotic Chemosynthesis Matrix at 350°C) quyết định trạng thái tồn tại, độ bền liên kết và cân bằng phản ứng hóa học theo SGK GDPT 2018.",
    "relatedEquation": "Prebiotic Chemosynthesis Matrix at 350°C",
    "iupacName": "Deep Sea Hydrothermal Vent Biosphere Environment",
    "archetype": "FLUORESCENCE_SPECTRA",
    "structuredEffects": [
      {
        "effectId": "B18_EFF_66",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "BOTH",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 400 ATK/DEF cho toàn bộ đồng minh trong môi trường trường địa bàn."
      }
    ]
  },
  {
    "id": "card_b18_067_field_galvanic_electroplating_bath_chamber_67",
    "name": "Bể Điện Hóa Galvanic Mạ Kền (Địa Bàn 9)",
    "name_en": "Galvanic Electroplating Bath Chamber (Field 9)",
    "cardType": "FIELD_ENVIRONMENT",
    "spellTrapSubtype": "FIELD_SPELL",
    "spellSpeed": 1,
    "rarity": "SUPER_RARE",
    "attribute": "ELECTRO",
    "manaCost": 4,
    "chemicalFormula": "NiSO4 Electrolyte",
    "effectCode": "SPELL_B18_GALVANIC_ELECTROPLATING_BATH_CHAMBER_FIELD_67",
    "effectText": "[Phép Môi Trường / Field]: Đặt vào Field Zone. Tất cả quái thú thuộc tính ELECTRO nhận +400 ATK và +400 DEF. Quái thú đối phương khác thuộc tính bị giảm 200 ATK khi tuyên bố tấn công.",
    "scientificLore": "Môi trường địa hóa / điện hóa Bể Điện Hóa Galvanic Mạ Kền (Faraday Law Cathodic Deposition m = (AIt)/(nF)) quyết định trạng thái tồn tại, độ bền liên kết và cân bằng phản ứng hóa học theo SGK GDPT 2018.",
    "relatedEquation": "Faraday Law Cathodic Deposition m = (AIt)/(nF)",
    "iupacName": "Galvanic Electroplating Bath Chamber Environment",
    "archetype": "SOLVATION_SPHERE",
    "structuredEffects": [
      {
        "effectId": "B18_EFF_67",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "BOTH",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 400 ATK/DEF cho toàn bộ đồng minh trong môi trường trường địa bàn."
      }
    ]
  },
  {
    "id": "card_b18_068_field_cryogenic_argon_isolation_matrix_68",
    "name": "Ma Trận Khí Trơ Nhiệt Độ Siêu Lạnh (Địa Bàn 9)",
    "name_en": "Cryogenic Argon Isolation Matrix (Field 9)",
    "cardType": "FIELD_ENVIRONMENT",
    "spellTrapSubtype": "FIELD_SPELL",
    "spellSpeed": 1,
    "rarity": "ULTRA_RARE",
    "attribute": "NOBLE_VOID",
    "manaCost": 5,
    "chemicalFormula": "Ar(s) 10K",
    "effectCode": "SPELL_B18_CRYOGENIC_ARGON_ISOLATION_MATRIX_FIELD_68",
    "effectText": "[Phép Môi Trường / Field]: Đặt vào Field Zone. Tất cả quái thú thuộc tính NOBLE_VOID nhận +400 ATK và +400 DEF. Quái thú đối phương khác thuộc tính bị giảm 200 ATK khi tuyên bố tấn công.",
    "scientificLore": "Môi trường địa hóa / điện hóa Ma Trận Khí Trơ Nhiệt Độ Siêu Lạnh (Noble Gas Matrix Isolation of Reactive Radicals) quyết định trạng thái tồn tại, độ bền liên kết và cân bằng phản ứng hóa học theo SGK GDPT 2018.",
    "relatedEquation": "Noble Gas Matrix Isolation of Reactive Radicals",
    "iupacName": "Cryogenic Argon Isolation Matrix Environment",
    "archetype": "COLLOIDAL_SOL",
    "structuredEffects": [
      {
        "effectId": "B18_EFF_68",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "BOTH",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 400 ATK/DEF cho toàn bộ đồng minh trong môi trường trường địa bàn."
      }
    ]
  },
  {
    "id": "card_b18_069_field_acid_mine_drainage_pyrite_waste_69",
    "name": "Vùng Thoát Nước Mỏ Axit Cháy Rực (Địa Bàn 9)",
    "name_en": "Acid Mine Drainage Pyrite Waste (Field 9)",
    "cardType": "FIELD_ENVIRONMENT",
    "spellTrapSubtype": "FIELD_SPELL",
    "spellSpeed": 1,
    "rarity": "SECRET_RARE",
    "attribute": "ACID_DARK",
    "manaCost": 2,
    "chemicalFormula": "FeS2 + O2 + H2O",
    "effectCode": "SPELL_B18_ACID_MINE_DRAINAGE_PYRITE_WASTE_FIELD_69",
    "effectText": "[Phép Môi Trường / Field]: Đặt vào Field Zone. Tất cả quái thú thuộc tính ACID_DARK nhận +400 ATK và +400 DEF. Quái thú đối phương khác thuộc tính bị giảm 200 ATK khi tuyên bố tấn công.",
    "scientificLore": "Môi trường địa hóa / điện hóa Vùng Thoát Nước Mỏ Axit Cháy Rực (2FeS₂ + 7O₂ + 2H₂O → 2Fe²⁺ + 4SO₄²⁻ + 4H⁺) quyết định trạng thái tồn tại, độ bền liên kết và cân bằng phản ứng hóa học theo SGK GDPT 2018.",
    "relatedEquation": "2FeS₂ + 7O₂ + 2H₂O → 2Fe²⁺ + 4SO₄²⁻ + 4H⁺",
    "iupacName": "Acid Mine Drainage Pyrite Waste Environment",
    "archetype": "FLUORESCENCE_SPECTRA",
    "structuredEffects": [
      {
        "effectId": "B18_EFF_69",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "BOTH",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 400 ATK/DEF cho toàn bộ đồng minh trong môi trường trường địa bàn."
      }
    ]
  },
  {
    "id": "card_b18_070_field_stratospheric_ozone_uv_shielding_70",
    "name": "Tầng Khí Quyển Ôzôn Hấp Thụ Tia Cực Tím (Địa Bàn 9)",
    "name_en": "Stratospheric Ozone UV Shielding (Field 9)",
    "cardType": "FIELD_ENVIRONMENT",
    "spellTrapSubtype": "FIELD_SPELL",
    "spellSpeed": 1,
    "rarity": "COMMON",
    "attribute": "AERO",
    "manaCost": 3,
    "chemicalFormula": "O3 Layer",
    "effectCode": "SPELL_B18_STRATOSPHERIC_OZONE_UV_SHIELDING_FIELD_70",
    "effectText": "[Phép Môi Trường / Field]: Đặt vào Field Zone. Tất cả quái thú thuộc tính AERO nhận +400 ATK và +400 DEF. Quái thú đối phương khác thuộc tính bị giảm 200 ATK khi tuyên bố tấn công.",
    "scientificLore": "Môi trường địa hóa / điện hóa Tầng Khí Quyển Ôzôn Hấp Thụ Tia Cực Tím (O₃ + hν(UV) → O₂ + O· Chapman Cycle) quyết định trạng thái tồn tại, độ bền liên kết và cân bằng phản ứng hóa học theo SGK GDPT 2018.",
    "relatedEquation": "O₃ + hν(UV) → O₂ + O· Chapman Cycle",
    "iupacName": "Stratospheric Ozone UV Shielding Environment",
    "archetype": "SOLVATION_SPHERE",
    "structuredEffects": [
      {
        "effectId": "B18_EFF_70",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "BOTH",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 400 ATK/DEF cho toàn bộ đồng minh trong môi trường trường địa bàn."
      }
    ]
  },
  {
    "id": "card_b18_071_field_tyndall_colloidal_aerosol_mist_71",
    "name": "Hệ Keo Khói Tyndall Tán Xạ (Địa Bàn 9)",
    "name_en": "Tyndall Colloidal Aerosol Mist (Field 9)",
    "cardType": "FIELD_ENVIRONMENT",
    "spellTrapSubtype": "FIELD_SPELL",
    "spellSpeed": 1,
    "rarity": "COMMON",
    "attribute": "AERO",
    "manaCost": 4,
    "chemicalFormula": "Colloidal Sol",
    "effectCode": "SPELL_B18_TYNDALL_COLLOIDAL_AEROSOL_MIST_FIELD_71",
    "effectText": "[Phép Môi Trường / Field]: Đặt vào Field Zone. Tất cả quái thú thuộc tính AERO nhận +400 ATK và +400 DEF. Quái thú đối phương khác thuộc tính bị giảm 200 ATK khi tuyên bố tấn công.",
    "scientificLore": "Môi trường địa hóa / điện hóa Hệ Keo Khói Tyndall Tán Xạ (Rayleigh/Tyndall Elastic Light Scattering) quyết định trạng thái tồn tại, độ bền liên kết và cân bằng phản ứng hóa học theo SGK GDPT 2018.",
    "relatedEquation": "Rayleigh/Tyndall Elastic Light Scattering",
    "iupacName": "Tyndall Colloidal Aerosol Mist Environment",
    "archetype": "COLLOIDAL_SOL",
    "structuredEffects": [
      {
        "effectId": "B18_EFF_71",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "BOTH",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 400 ATK/DEF cho toàn bộ đồng minh trong môi trường trường địa bàn."
      }
    ]
  },
  {
    "id": "card_b18_072_field_dead_sea_hypersaline_crystallization_basin_72",
    "name": "Hồ Tinh Thể Muối Bão Hòa Biển Chết (Địa Bàn 9)",
    "name_en": "Dead Sea Hypersaline Crystallization Basin (Field 9)",
    "cardType": "FIELD_ENVIRONMENT",
    "spellTrapSubtype": "FIELD_SPELL",
    "spellSpeed": 1,
    "rarity": "COMMON",
    "attribute": "TERRA",
    "manaCost": 5,
    "chemicalFormula": "NaCl-KCl-MgCl2",
    "effectCode": "SPELL_B18_DEAD_SEA_HYPERSALINE_CRYSTALLIZATION_BASIN_FIELD_72",
    "effectText": "[Phép Môi Trường / Field]: Đặt vào Field Zone. Tất cả quái thú thuộc tính TERRA nhận +400 ATK và +400 DEF. Quái thú đối phương khác thuộc tính bị giảm 200 ATK khi tuyên bố tấn công.",
    "scientificLore": "Môi trường địa hóa / điện hóa Hồ Tinh Thể Muối Bão Hòa Biển Chết (Fractional Halite Sylvite Evaporite Precipitation) quyết định trạng thái tồn tại, độ bền liên kết và cân bằng phản ứng hóa học theo SGK GDPT 2018.",
    "relatedEquation": "Fractional Halite Sylvite Evaporite Precipitation",
    "iupacName": "Dead Sea Hypersaline Crystallization Basin Environment",
    "archetype": "FLUORESCENCE_SPECTRA",
    "structuredEffects": [
      {
        "effectId": "B18_EFF_72",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "BOTH",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 400 ATK/DEF cho toàn bộ đồng minh trong môi trường trường địa bàn."
      }
    ]
  },
  {
    "id": "card_b18_073_field_hydration_solvation_sphere_domain_73",
    "name": "Vỏ Dung Môi Hydrat Hóa Solvation (Địa Bàn 10)",
    "name_en": "Hydration Solvation Sphere Domain (Field 10)",
    "cardType": "FIELD_ENVIRONMENT",
    "spellTrapSubtype": "FIELD_SPELL",
    "spellSpeed": 1,
    "rarity": "RARE",
    "attribute": "AQUA",
    "manaCost": 2,
    "chemicalFormula": "[M(H2O)6]n+",
    "effectCode": "SPELL_B18_HYDRATION_SOLVATION_SPHERE_DOMAIN_FIELD_73",
    "effectText": "[Phép Môi Trường / Field]: Đặt vào Field Zone. Tất cả quái thú thuộc tính AQUA nhận +400 ATK và +400 DEF. Quái thú đối phương khác thuộc tính bị giảm 200 ATK khi tuyên bố tấn công.",
    "scientificLore": "Môi trường địa hóa / điện hóa Vỏ Dung Môi Hydrat Hóa Solvation (Ion-Dipole Solvent Shell Stabilization) quyết định trạng thái tồn tại, độ bền liên kết và cân bằng phản ứng hóa học theo SGK GDPT 2018.",
    "relatedEquation": "Ion-Dipole Solvent Shell Stabilization",
    "iupacName": "Hydration Solvation Sphere Domain Environment",
    "archetype": "SOLVATION_SPHERE",
    "structuredEffects": [
      {
        "effectId": "B18_EFF_73",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "BOTH",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 400 ATK/DEF cho toàn bộ đồng minh trong môi trường trường địa bàn."
      }
    ]
  },
  {
    "id": "card_b18_074_field_deep_sea_hydrothermal_vent_biosphere_74",
    "name": "Miệng Phun Thủy Nhiệt Đại Dương (Địa Bàn 10)",
    "name_en": "Deep Sea Hydrothermal Vent Biosphere (Field 10)",
    "cardType": "FIELD_ENVIRONMENT",
    "spellTrapSubtype": "FIELD_SPELL",
    "spellSpeed": 1,
    "rarity": "RARE",
    "attribute": "PYRO",
    "manaCost": 3,
    "chemicalFormula": "FeS-H2S Vent",
    "effectCode": "SPELL_B18_DEEP_SEA_HYDROTHERMAL_VENT_BIOSPHERE_FIELD_74",
    "effectText": "[Phép Môi Trường / Field]: Đặt vào Field Zone. Tất cả quái thú thuộc tính PYRO nhận +400 ATK và +400 DEF. Quái thú đối phương khác thuộc tính bị giảm 200 ATK khi tuyên bố tấn công.",
    "scientificLore": "Môi trường địa hóa / điện hóa Miệng Phun Thủy Nhiệt Đại Dương (Prebiotic Chemosynthesis Matrix at 350°C) quyết định trạng thái tồn tại, độ bền liên kết và cân bằng phản ứng hóa học theo SGK GDPT 2018.",
    "relatedEquation": "Prebiotic Chemosynthesis Matrix at 350°C",
    "iupacName": "Deep Sea Hydrothermal Vent Biosphere Environment",
    "archetype": "COLLOIDAL_SOL",
    "structuredEffects": [
      {
        "effectId": "B18_EFF_74",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "BOTH",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 400 ATK/DEF cho toàn bộ đồng minh trong môi trường trường địa bàn."
      }
    ]
  },
  {
    "id": "card_b18_075_field_galvanic_electroplating_bath_chamber_75",
    "name": "Bể Điện Hóa Galvanic Mạ Kền (Địa Bàn 10)",
    "name_en": "Galvanic Electroplating Bath Chamber (Field 10)",
    "cardType": "FIELD_ENVIRONMENT",
    "spellTrapSubtype": "FIELD_SPELL",
    "spellSpeed": 1,
    "rarity": "SUPER_RARE",
    "attribute": "ELECTRO",
    "manaCost": 4,
    "chemicalFormula": "NiSO4 Electrolyte",
    "effectCode": "SPELL_B18_GALVANIC_ELECTROPLATING_BATH_CHAMBER_FIELD_75",
    "effectText": "[Phép Môi Trường / Field]: Đặt vào Field Zone. Tất cả quái thú thuộc tính ELECTRO nhận +400 ATK và +400 DEF. Quái thú đối phương khác thuộc tính bị giảm 200 ATK khi tuyên bố tấn công.",
    "scientificLore": "Môi trường địa hóa / điện hóa Bể Điện Hóa Galvanic Mạ Kền (Faraday Law Cathodic Deposition m = (AIt)/(nF)) quyết định trạng thái tồn tại, độ bền liên kết và cân bằng phản ứng hóa học theo SGK GDPT 2018.",
    "relatedEquation": "Faraday Law Cathodic Deposition m = (AIt)/(nF)",
    "iupacName": "Galvanic Electroplating Bath Chamber Environment",
    "archetype": "FLUORESCENCE_SPECTRA",
    "structuredEffects": [
      {
        "effectId": "B18_EFF_75",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "BOTH",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 400 ATK/DEF cho toàn bộ đồng minh trong môi trường trường địa bàn."
      }
    ]
  },
  {
    "id": "card_b18_076_field_cryogenic_argon_isolation_matrix_76",
    "name": "Ma Trận Khí Trơ Nhiệt Độ Siêu Lạnh (Địa Bàn 10)",
    "name_en": "Cryogenic Argon Isolation Matrix (Field 10)",
    "cardType": "FIELD_ENVIRONMENT",
    "spellTrapSubtype": "FIELD_SPELL",
    "spellSpeed": 1,
    "rarity": "SUPER_RARE",
    "attribute": "NOBLE_VOID",
    "manaCost": 5,
    "chemicalFormula": "Ar(s) 10K",
    "effectCode": "SPELL_B18_CRYOGENIC_ARGON_ISOLATION_MATRIX_FIELD_76",
    "effectText": "[Phép Môi Trường / Field]: Đặt vào Field Zone. Tất cả quái thú thuộc tính NOBLE_VOID nhận +400 ATK và +400 DEF. Quái thú đối phương khác thuộc tính bị giảm 200 ATK khi tuyên bố tấn công.",
    "scientificLore": "Môi trường địa hóa / điện hóa Ma Trận Khí Trơ Nhiệt Độ Siêu Lạnh (Noble Gas Matrix Isolation of Reactive Radicals) quyết định trạng thái tồn tại, độ bền liên kết và cân bằng phản ứng hóa học theo SGK GDPT 2018.",
    "relatedEquation": "Noble Gas Matrix Isolation of Reactive Radicals",
    "iupacName": "Cryogenic Argon Isolation Matrix Environment",
    "archetype": "SOLVATION_SPHERE",
    "structuredEffects": [
      {
        "effectId": "B18_EFF_76",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "BOTH",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 400 ATK/DEF cho toàn bộ đồng minh trong môi trường trường địa bàn."
      }
    ]
  },
  {
    "id": "card_b18_077_field_acid_mine_drainage_pyrite_waste_77",
    "name": "Vùng Thoát Nước Mỏ Axit Cháy Rực (Địa Bàn 10)",
    "name_en": "Acid Mine Drainage Pyrite Waste (Field 10)",
    "cardType": "FIELD_ENVIRONMENT",
    "spellTrapSubtype": "FIELD_SPELL",
    "spellSpeed": 1,
    "rarity": "ULTRA_RARE",
    "attribute": "ACID_DARK",
    "manaCost": 2,
    "chemicalFormula": "FeS2 + O2 + H2O",
    "effectCode": "SPELL_B18_ACID_MINE_DRAINAGE_PYRITE_WASTE_FIELD_77",
    "effectText": "[Phép Môi Trường / Field]: Đặt vào Field Zone. Tất cả quái thú thuộc tính ACID_DARK nhận +400 ATK và +400 DEF. Quái thú đối phương khác thuộc tính bị giảm 200 ATK khi tuyên bố tấn công.",
    "scientificLore": "Môi trường địa hóa / điện hóa Vùng Thoát Nước Mỏ Axit Cháy Rực (2FeS₂ + 7O₂ + 2H₂O → 2Fe²⁺ + 4SO₄²⁻ + 4H⁺) quyết định trạng thái tồn tại, độ bền liên kết và cân bằng phản ứng hóa học theo SGK GDPT 2018.",
    "relatedEquation": "2FeS₂ + 7O₂ + 2H₂O → 2Fe²⁺ + 4SO₄²⁻ + 4H⁺",
    "iupacName": "Acid Mine Drainage Pyrite Waste Environment",
    "archetype": "COLLOIDAL_SOL",
    "structuredEffects": [
      {
        "effectId": "B18_EFF_77",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "BOTH",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 400 ATK/DEF cho toàn bộ đồng minh trong môi trường trường địa bàn."
      }
    ]
  },
  {
    "id": "card_b18_078_field_stratospheric_ozone_uv_shielding_78",
    "name": "Tầng Khí Quyển Ôzôn Hấp Thụ Tia Cực Tím (Địa Bàn 10)",
    "name_en": "Stratospheric Ozone UV Shielding (Field 10)",
    "cardType": "FIELD_ENVIRONMENT",
    "spellTrapSubtype": "FIELD_SPELL",
    "spellSpeed": 1,
    "rarity": "SECRET_RARE",
    "attribute": "AERO",
    "manaCost": 3,
    "chemicalFormula": "O3 Layer",
    "effectCode": "SPELL_B18_STRATOSPHERIC_OZONE_UV_SHIELDING_FIELD_78",
    "effectText": "[Phép Môi Trường / Field]: Đặt vào Field Zone. Tất cả quái thú thuộc tính AERO nhận +400 ATK và +400 DEF. Quái thú đối phương khác thuộc tính bị giảm 200 ATK khi tuyên bố tấn công.",
    "scientificLore": "Môi trường địa hóa / điện hóa Tầng Khí Quyển Ôzôn Hấp Thụ Tia Cực Tím (O₃ + hν(UV) → O₂ + O· Chapman Cycle) quyết định trạng thái tồn tại, độ bền liên kết và cân bằng phản ứng hóa học theo SGK GDPT 2018.",
    "relatedEquation": "O₃ + hν(UV) → O₂ + O· Chapman Cycle",
    "iupacName": "Stratospheric Ozone UV Shielding Environment",
    "archetype": "FLUORESCENCE_SPECTRA",
    "structuredEffects": [
      {
        "effectId": "B18_EFF_78",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "BOTH",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 400 ATK/DEF cho toàn bộ đồng minh trong môi trường trường địa bàn."
      }
    ]
  },
  {
    "id": "card_b18_079_field_tyndall_colloidal_aerosol_mist_79",
    "name": "Hệ Keo Khói Tyndall Tán Xạ (Địa Bàn 10)",
    "name_en": "Tyndall Colloidal Aerosol Mist (Field 10)",
    "cardType": "FIELD_ENVIRONMENT",
    "spellTrapSubtype": "FIELD_SPELL",
    "spellSpeed": 1,
    "rarity": "COMMON",
    "attribute": "AERO",
    "manaCost": 4,
    "chemicalFormula": "Colloidal Sol",
    "effectCode": "SPELL_B18_TYNDALL_COLLOIDAL_AEROSOL_MIST_FIELD_79",
    "effectText": "[Phép Môi Trường / Field]: Đặt vào Field Zone. Tất cả quái thú thuộc tính AERO nhận +400 ATK và +400 DEF. Quái thú đối phương khác thuộc tính bị giảm 200 ATK khi tuyên bố tấn công.",
    "scientificLore": "Môi trường địa hóa / điện hóa Hệ Keo Khói Tyndall Tán Xạ (Rayleigh/Tyndall Elastic Light Scattering) quyết định trạng thái tồn tại, độ bền liên kết và cân bằng phản ứng hóa học theo SGK GDPT 2018.",
    "relatedEquation": "Rayleigh/Tyndall Elastic Light Scattering",
    "iupacName": "Tyndall Colloidal Aerosol Mist Environment",
    "archetype": "SOLVATION_SPHERE",
    "structuredEffects": [
      {
        "effectId": "B18_EFF_79",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "BOTH",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 400 ATK/DEF cho toàn bộ đồng minh trong môi trường trường địa bàn."
      }
    ]
  },
  {
    "id": "card_b18_080_field_dead_sea_hypersaline_crystallization_basin_80",
    "name": "Hồ Tinh Thể Muối Bão Hòa Biển Chết (Địa Bàn 10)",
    "name_en": "Dead Sea Hypersaline Crystallization Basin (Field 10)",
    "cardType": "FIELD_ENVIRONMENT",
    "spellTrapSubtype": "FIELD_SPELL",
    "spellSpeed": 1,
    "rarity": "COMMON",
    "attribute": "TERRA",
    "manaCost": 5,
    "chemicalFormula": "NaCl-KCl-MgCl2",
    "effectCode": "SPELL_B18_DEAD_SEA_HYPERSALINE_CRYSTALLIZATION_BASIN_FIELD_80",
    "effectText": "[Phép Môi Trường / Field]: Đặt vào Field Zone. Tất cả quái thú thuộc tính TERRA nhận +400 ATK và +400 DEF. Quái thú đối phương khác thuộc tính bị giảm 200 ATK khi tuyên bố tấn công.",
    "scientificLore": "Môi trường địa hóa / điện hóa Hồ Tinh Thể Muối Bão Hòa Biển Chết (Fractional Halite Sylvite Evaporite Precipitation) quyết định trạng thái tồn tại, độ bền liên kết và cân bằng phản ứng hóa học theo SGK GDPT 2018.",
    "relatedEquation": "Fractional Halite Sylvite Evaporite Precipitation",
    "iupacName": "Dead Sea Hypersaline Crystallization Basin Environment",
    "archetype": "COLLOIDAL_SOL",
    "structuredEffects": [
      {
        "effectId": "B18_EFF_80",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 400,
              "statTarget": "BOTH",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 400 ATK/DEF cho toàn bộ đồng minh trong môi trường trường địa bàn."
      }
    ]
  }
];
