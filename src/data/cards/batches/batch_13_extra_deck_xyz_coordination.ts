// src/data/cards/batches/batch_13_extra_deck_xyz_coordination.ts
// Batch 13: Extra Deck Xyz Coordination Monsters (75 cards)
// Automatically generated and validated for ELEMENTA Tactical TCG

import { PlayableCardDef } from '../../../domain/cardGameTypes';

export const BATCH_13_CARDS: PlayableCardDef[] = [
  {
    "id": "card_b13_001_xyz_hexamminecobalt_iii__octahedral_xyz_1",
    "name": "Phức Bát Diện Hexammine Coban — Rank 3 (Cấu Trúc Phối Trí 1)",
    "name_en": "Hexamminecobalt(III) Octahedral Xyz — Rank 3 Overlayer 1",
    "cardType": "XYZ_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "ELECTRO",
    "manaCost": 3,
    "xyzRank": 3,
    "xyzMaterialsRequired": {
      "count": 2,
      "level": 3
    },
    "atk": 2840,
    "def": 2510,
    "chemicalFormula": "[Co(NH3)6]3+",
    "effectCode": "XYZ_B13_HEXAMMINECOBALT_III__OCTAHEDRAL_XYZ_OVERLAY_1",
    "effectText": "2 quái thú Level 3. Quái thú Xyz sở hữu Rank 3 (không có Level). Bỏ 1 Nguyên liệu Xyz: Phá hủy 1 quái thú đối phương có ATK thấp hơn hoặc hồi phục 500 LP.",
    "scientificLore": "Thuyết phối trí Werner (Nobel 1913): Nguyên tử trung tâm liên kết với các phối tử qua liên kết cho-nhận tạo nên hình học không gian phức chất bền vững theo GDPT 2018.",
    "relatedEquation": "Co³⁺ + 6NH₃ → [Co(NH₃)₆]³⁺ (d²sp³ Octahedral)",
    "iupacName": "Hexamminecobalt(III) Octahedral Xyz Complex",
    "archetype": "WERNER_COORDINATION",
    "structuredEffects": [
      {
        "effectId": "B13_EFF_1",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "HEAL_LP",
            "params": {
              "amount": 500
            }
          }
        ],
        "description": "Tách 1 nguyên liệu phối trí: Hồi phục 500 LP."
      }
    ]
  },
  {
    "id": "card_b13_002_xyz_cisplatin_square_planar_xyz_2",
    "name": "Phức Vuông Phẳng Cisplatin — Rank 4 (Cấu Trúc Phối Trí 1)",
    "name_en": "Cisplatin Square Planar Xyz — Rank 4 Overlayer 1",
    "cardType": "XYZ_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "NOBLE_VOID",
    "manaCost": 3,
    "xyzRank": 4,
    "xyzMaterialsRequired": {
      "count": 2,
      "level": 4
    },
    "atk": 3070,
    "def": 2730,
    "chemicalFormula": "Pt(NH3)2Cl2",
    "effectCode": "XYZ_B13_CISPLATIN_SQUARE_PLANAR_XYZ_OVERLAY_2",
    "effectText": "2 quái thú Level 4. Quái thú Xyz sở hữu Rank 4 (không có Level). Bỏ 1 Nguyên liệu Xyz: Phá hủy 1 quái thú đối phương có ATK thấp hơn hoặc hồi phục 500 LP.",
    "scientificLore": "Thuyết phối trí Werner (Nobel 1913): Nguyên tử trung tâm liên kết với các phối tử qua liên kết cho-nhận tạo nên hình học không gian phức chất bền vững theo GDPT 2018.",
    "relatedEquation": "Pt²⁺ + 2NH₃ + 2Cl⁻ → cis-[Pt(NH₃)₂Cl₂] (dsp² Square Planar)",
    "iupacName": "Cisplatin Square Planar Xyz Complex",
    "archetype": "TRANSITION_FORGE",
    "structuredEffects": [
      {
        "effectId": "B13_EFF_2",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "HEAL_LP",
            "params": {
              "amount": 500
            }
          }
        ],
        "description": "Tách 1 nguyên liệu phối trí: Hồi phục 500 LP."
      }
    ]
  },
  {
    "id": "card_b13_003_xyz_ferrocene_sandwich_complex_xyz_3",
    "name": "Bánh Mì Kẹp Ferrocene — Rank 5 (Cấu Trúc Phối Trí 1)",
    "name_en": "Ferrocene Sandwich Complex Xyz — Rank 5 Overlayer 1",
    "cardType": "XYZ_MONSTER",
    "rarity": "ULTRA_RARE",
    "attribute": "TERRA",
    "manaCost": 4,
    "xyzRank": 5,
    "xyzMaterialsRequired": {
      "count": 2,
      "level": 5
    },
    "atk": 3300,
    "def": 2950,
    "chemicalFormula": "Fe(C5H5)2",
    "effectCode": "XYZ_B13_FERROCENE_SANDWICH_COMPLEX_XYZ_OVERLAY_3",
    "effectText": "2 quái thú Level 5. Quái thú Xyz sở hữu Rank 5 (không có Level). Bỏ 1 Nguyên liệu Xyz: Phá hủy 1 quái thú đối phương có ATK thấp hơn hoặc hồi phục 500 LP.",
    "scientificLore": "Thuyết phối trí Werner (Nobel 1913): Nguyên tử trung tâm liên kết với các phối tử qua liên kết cho-nhận tạo nên hình học không gian phức chất bền vững theo GDPT 2018.",
    "relatedEquation": "Fe²⁺ + 2C₅H₅⁻ → Fe(η⁵-C₅H₅)₂ Sandwich",
    "iupacName": "Ferrocene Sandwich Complex Xyz Complex",
    "archetype": "WERNER_COORDINATION",
    "structuredEffects": [
      {
        "effectId": "B13_EFF_3",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "HEAL_LP",
            "params": {
              "amount": 500
            }
          }
        ],
        "description": "Tách 1 nguyên liệu phối trí: Hồi phục 500 LP."
      }
    ]
  },
  {
    "id": "card_b13_004_xyz_prussian_blue_lattice_xyz_4",
    "name": "Phức Xanh Phổ Prussian Blue — Rank 6 (Cấu Trúc Phối Trí 1)",
    "name_en": "Prussian Blue Lattice Xyz — Rank 6 Overlayer 1",
    "cardType": "XYZ_MONSTER",
    "rarity": "SECRET_RARE",
    "attribute": "AQUA",
    "manaCost": 5,
    "xyzRank": 6,
    "xyzMaterialsRequired": {
      "count": 2,
      "level": 6
    },
    "atk": 3530,
    "def": 3170,
    "chemicalFormula": "Fe4[Fe(CN)6]3",
    "effectCode": "XYZ_B13_PRUSSIAN_BLUE_LATTICE_XYZ_OVERLAY_4",
    "effectText": "2 quái thú Level 6. Quái thú Xyz sở hữu Rank 6 (không có Level). Bỏ 1 Nguyên liệu Xyz: Phá hủy 1 quái thú đối phương có ATK thấp hơn hoặc hồi phục 500 LP.",
    "scientificLore": "Thuyết phối trí Werner (Nobel 1913): Nguyên tử trung tâm liên kết với các phối tử qua liên kết cho-nhận tạo nên hình học không gian phức chất bền vững theo GDPT 2018.",
    "relatedEquation": "4Fe³⁺ + 3[Fe(CN)₆]⁴⁻ → Fe₄[Fe(CN)₆]₃ Precipitate",
    "iupacName": "Prussian Blue Lattice Xyz Complex",
    "archetype": "TRANSITION_FORGE",
    "structuredEffects": [
      {
        "effectId": "B13_EFF_4",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "HEAL_LP",
            "params": {
              "amount": 500
            }
          }
        ],
        "description": "Tách 1 nguyên liệu phối trí: Hồi phục 500 LP."
      }
    ]
  },
  {
    "id": "card_b13_005_xyz_tetraamminezinc_ii__xyz_5",
    "name": "Phức Tứ Diện Kẽm Amoniac — Rank 7 (Cấu Trúc Phối Trí 1)",
    "name_en": "Tetraamminezinc(II) Xyz — Rank 7 Overlayer 1",
    "cardType": "XYZ_MONSTER",
    "rarity": "COMMON",
    "attribute": "TERRA",
    "manaCost": 6,
    "xyzRank": 7,
    "xyzMaterialsRequired": {
      "count": 2,
      "level": 7
    },
    "atk": 3560,
    "def": 3390,
    "chemicalFormula": "[Zn(NH3)4]2+",
    "effectCode": "XYZ_B13_TETRAAMMINEZINC_II__XYZ_OVERLAY_5",
    "effectText": "2 quái thú Level 7. Quái thú Xyz sở hữu Rank 7 (không có Level). Bỏ 1 Nguyên liệu Xyz: Phá hủy 1 quái thú đối phương có ATK thấp hơn hoặc hồi phục 500 LP.",
    "scientificLore": "Thuyết phối trí Werner (Nobel 1913): Nguyên tử trung tâm liên kết với các phối tử qua liên kết cho-nhận tạo nên hình học không gian phức chất bền vững theo GDPT 2018.",
    "relatedEquation": "Zn²⁺ + 4NH₃ → [Zn(NH₃)₄]²⁺ (sp³ Tetrahedral)",
    "iupacName": "Tetraamminezinc(II) Xyz Complex",
    "archetype": "WERNER_COORDINATION",
    "structuredEffects": [
      {
        "effectId": "B13_EFF_5",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "HEAL_LP",
            "params": {
              "amount": 500
            }
          }
        ],
        "description": "Tách 1 nguyên liệu phối trí: Hồi phục 500 LP."
      }
    ]
  },
  {
    "id": "card_b13_006_xyz_tetraamminecopper_ii__azure_xyz_6",
    "name": "Phức Đồng Tetrammine Lam Đậm — Rank 8 (Cấu Trúc Phối Trí 1)",
    "name_en": "Tetraamminecopper(II) Azure Xyz — Rank 8 Overlayer 1",
    "cardType": "XYZ_MONSTER",
    "rarity": "COMMON",
    "attribute": "AQUA",
    "manaCost": 7,
    "xyzRank": 8,
    "xyzMaterialsRequired": {
      "count": 2,
      "level": 8
    },
    "atk": 3790,
    "def": 3360,
    "chemicalFormula": "[Cu(NH3)4]2+",
    "effectCode": "XYZ_B13_TETRAAMMINECOPPER_II__AZURE_XYZ_OVERLAY_6",
    "effectText": "2 quái thú Level 8. Quái thú Xyz sở hữu Rank 8 (không có Level). Bỏ 1 Nguyên liệu Xyz: Phá hủy 1 quái thú đối phương có ATK thấp hơn hoặc hồi phục 500 LP.",
    "scientificLore": "Thuyết phối trí Werner (Nobel 1913): Nguyên tử trung tâm liên kết với các phối tử qua liên kết cho-nhận tạo nên hình học không gian phức chất bền vững theo GDPT 2018.",
    "relatedEquation": "Cu(OH)₂ + 4NH₃ → [Cu(NH₃)₄]²⁺ + 2OH⁻",
    "iupacName": "Tetraamminecopper(II) Azure Xyz Complex",
    "archetype": "TRANSITION_FORGE",
    "structuredEffects": [
      {
        "effectId": "B13_EFF_6",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "HEAL_LP",
            "params": {
              "amount": 500
            }
          }
        ],
        "description": "Tách 1 nguyên liệu phối trí: Hồi phục 500 LP."
      }
    ]
  },
  {
    "id": "card_b13_007_xyz_iron_iii__edta_chelate_xyz_7",
    "name": "Phức Chelate Sắt EDTA — Rank 3 (Cấu Trúc Phối Trí 1)",
    "name_en": "Iron(III) EDTA Chelate Xyz — Rank 3 Overlayer 1",
    "cardType": "XYZ_MONSTER",
    "rarity": "COMMON",
    "attribute": "TERRA",
    "manaCost": 3,
    "xyzRank": 3,
    "xyzMaterialsRequired": {
      "count": 2,
      "level": 3
    },
    "atk": 2940,
    "def": 2560,
    "chemicalFormula": "[Fe(EDTA)]-",
    "effectCode": "XYZ_B13_IRON_III__EDTA_CHELATE_XYZ_OVERLAY_7",
    "effectText": "2 quái thú Level 3. Quái thú Xyz sở hữu Rank 3 (không có Level). Bỏ 1 Nguyên liệu Xyz: Phá hủy 1 quái thú đối phương có ATK thấp hơn hoặc hồi phục 500 LP.",
    "scientificLore": "Thuyết phối trí Werner (Nobel 1913): Nguyên tử trung tâm liên kết với các phối tử qua liên kết cho-nhận tạo nên hình học không gian phức chất bền vững theo GDPT 2018.",
    "relatedEquation": "Fe³⁺ + EDTA⁴⁻ → [Fe(EDTA)]⁻ Hexadentate Chelate",
    "iupacName": "Iron(III) EDTA Chelate Xyz Complex",
    "archetype": "WERNER_COORDINATION",
    "structuredEffects": [
      {
        "effectId": "B13_EFF_7",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "HEAL_LP",
            "params": {
              "amount": 500
            }
          }
        ],
        "description": "Tách 1 nguyên liệu phối trí: Hồi phục 500 LP."
      }
    ]
  },
  {
    "id": "card_b13_008_xyz_diamminesilver_i__tollens_xyz_8",
    "name": "Phức Bạc Amoniac Thuốc Thử Tollens — Rank 4 (Cấu Trúc Phối Trí 1)",
    "name_en": "Diamminesilver(I) Tollens Xyz — Rank 4 Overlayer 1",
    "cardType": "XYZ_MONSTER",
    "rarity": "RARE",
    "attribute": "AQUA",
    "manaCost": 3,
    "xyzRank": 4,
    "xyzMaterialsRequired": {
      "count": 2,
      "level": 4
    },
    "atk": 3170,
    "def": 2780,
    "chemicalFormula": "[Ag(NH3)2]+",
    "effectCode": "XYZ_B13_DIAMMINESILVER_I__TOLLENS_XYZ_OVERLAY_8",
    "effectText": "2 quái thú Level 4. Quái thú Xyz sở hữu Rank 4 (không có Level). Bỏ 1 Nguyên liệu Xyz: Phá hủy 1 quái thú đối phương có ATK thấp hơn hoặc hồi phục 500 LP.",
    "scientificLore": "Thuyết phối trí Werner (Nobel 1913): Nguyên tử trung tâm liên kết với các phối tử qua liên kết cho-nhận tạo nên hình học không gian phức chất bền vững theo GDPT 2018.",
    "relatedEquation": "Ag⁺ + 2NH₃ → [Ag(NH₃)₂]⁺ Linear Complex",
    "iupacName": "Diamminesilver(I) Tollens Xyz Complex",
    "archetype": "TRANSITION_FORGE",
    "structuredEffects": [
      {
        "effectId": "B13_EFF_8",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "HEAL_LP",
            "params": {
              "amount": 500
            }
          }
        ],
        "description": "Tách 1 nguyên liệu phối trí: Hồi phục 500 LP."
      }
    ]
  },
  {
    "id": "card_b13_009_xyz_hexamminecobalt_iii__octahedral_xyz_9",
    "name": "Phức Bát Diện Hexammine Coban — Rank 5 (Cấu Trúc Phối Trí 2)",
    "name_en": "Hexamminecobalt(III) Octahedral Xyz — Rank 5 Overlayer 2",
    "cardType": "XYZ_MONSTER",
    "rarity": "RARE",
    "attribute": "ELECTRO",
    "manaCost": 4,
    "xyzRank": 5,
    "xyzMaterialsRequired": {
      "count": 2,
      "level": 5
    },
    "atk": 3200,
    "def": 3000,
    "chemicalFormula": "[Co(NH3)6]3+",
    "effectCode": "XYZ_B13_HEXAMMINECOBALT_III__OCTAHEDRAL_XYZ_OVERLAY_9",
    "effectText": "2 quái thú Level 5. Quái thú Xyz sở hữu Rank 5 (không có Level). Bỏ 1 Nguyên liệu Xyz: Phá hủy 1 quái thú đối phương có ATK thấp hơn hoặc hồi phục 500 LP.",
    "scientificLore": "Thuyết phối trí Werner (Nobel 1913): Nguyên tử trung tâm liên kết với các phối tử qua liên kết cho-nhận tạo nên hình học không gian phức chất bền vững theo GDPT 2018.",
    "relatedEquation": "Co³⁺ + 6NH₃ → [Co(NH₃)₆]³⁺ (d²sp³ Octahedral)",
    "iupacName": "Hexamminecobalt(III) Octahedral Xyz Complex",
    "archetype": "WERNER_COORDINATION",
    "structuredEffects": [
      {
        "effectId": "B13_EFF_9",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "HEAL_LP",
            "params": {
              "amount": 500
            }
          }
        ],
        "description": "Tách 1 nguyên liệu phối trí: Hồi phục 500 LP."
      }
    ]
  },
  {
    "id": "card_b13_010_xyz_cisplatin_square_planar_xyz_10",
    "name": "Phức Vuông Phẳng Cisplatin — Rank 6 (Cấu Trúc Phối Trí 2)",
    "name_en": "Cisplatin Square Planar Xyz — Rank 6 Overlayer 2",
    "cardType": "XYZ_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "NOBLE_VOID",
    "manaCost": 5,
    "xyzRank": 6,
    "xyzMaterialsRequired": {
      "count": 2,
      "level": 6
    },
    "atk": 3430,
    "def": 3220,
    "chemicalFormula": "Pt(NH3)2Cl2",
    "effectCode": "XYZ_B13_CISPLATIN_SQUARE_PLANAR_XYZ_OVERLAY_10",
    "effectText": "2 quái thú Level 6. Quái thú Xyz sở hữu Rank 6 (không có Level). Bỏ 1 Nguyên liệu Xyz: Phá hủy 1 quái thú đối phương có ATK thấp hơn hoặc hồi phục 500 LP.",
    "scientificLore": "Thuyết phối trí Werner (Nobel 1913): Nguyên tử trung tâm liên kết với các phối tử qua liên kết cho-nhận tạo nên hình học không gian phức chất bền vững theo GDPT 2018.",
    "relatedEquation": "Pt²⁺ + 2NH₃ + 2Cl⁻ → cis-[Pt(NH₃)₂Cl₂] (dsp² Square Planar)",
    "iupacName": "Cisplatin Square Planar Xyz Complex",
    "archetype": "TRANSITION_FORGE",
    "structuredEffects": [
      {
        "effectId": "B13_EFF_10",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "HEAL_LP",
            "params": {
              "amount": 500
            }
          }
        ],
        "description": "Tách 1 nguyên liệu phối trí: Hồi phục 500 LP."
      }
    ]
  },
  {
    "id": "card_b13_011_xyz_ferrocene_sandwich_complex_xyz_11",
    "name": "Bánh Mì Kẹp Ferrocene — Rank 7 (Cấu Trúc Phối Trí 2)",
    "name_en": "Ferrocene Sandwich Complex Xyz — Rank 7 Overlayer 2",
    "cardType": "XYZ_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "TERRA",
    "manaCost": 6,
    "xyzRank": 7,
    "xyzMaterialsRequired": {
      "count": 2,
      "level": 7
    },
    "atk": 3660,
    "def": 3190,
    "chemicalFormula": "Fe(C5H5)2",
    "effectCode": "XYZ_B13_FERROCENE_SANDWICH_COMPLEX_XYZ_OVERLAY_11",
    "effectText": "2 quái thú Level 7. Quái thú Xyz sở hữu Rank 7 (không có Level). Bỏ 1 Nguyên liệu Xyz: Phá hủy 1 quái thú đối phương có ATK thấp hơn hoặc hồi phục 500 LP.",
    "scientificLore": "Thuyết phối trí Werner (Nobel 1913): Nguyên tử trung tâm liên kết với các phối tử qua liên kết cho-nhận tạo nên hình học không gian phức chất bền vững theo GDPT 2018.",
    "relatedEquation": "Fe²⁺ + 2C₅H₅⁻ → Fe(η⁵-C₅H₅)₂ Sandwich",
    "iupacName": "Ferrocene Sandwich Complex Xyz Complex",
    "archetype": "WERNER_COORDINATION",
    "structuredEffects": [
      {
        "effectId": "B13_EFF_11",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "HEAL_LP",
            "params": {
              "amount": 500
            }
          }
        ],
        "description": "Tách 1 nguyên liệu phối trí: Hồi phục 500 LP."
      }
    ]
  },
  {
    "id": "card_b13_012_xyz_prussian_blue_lattice_xyz_12",
    "name": "Phức Xanh Phổ Prussian Blue — Rank 8 (Cấu Trúc Phối Trí 2)",
    "name_en": "Prussian Blue Lattice Xyz — Rank 8 Overlayer 2",
    "cardType": "XYZ_MONSTER",
    "rarity": "ULTRA_RARE",
    "attribute": "AQUA",
    "manaCost": 7,
    "xyzRank": 8,
    "xyzMaterialsRequired": {
      "count": 2,
      "level": 8
    },
    "atk": 3890,
    "def": 3410,
    "chemicalFormula": "Fe4[Fe(CN)6]3",
    "effectCode": "XYZ_B13_PRUSSIAN_BLUE_LATTICE_XYZ_OVERLAY_12",
    "effectText": "2 quái thú Level 8. Quái thú Xyz sở hữu Rank 8 (không có Level). Bỏ 1 Nguyên liệu Xyz: Phá hủy 1 quái thú đối phương có ATK thấp hơn hoặc hồi phục 500 LP.",
    "scientificLore": "Thuyết phối trí Werner (Nobel 1913): Nguyên tử trung tâm liên kết với các phối tử qua liên kết cho-nhận tạo nên hình học không gian phức chất bền vững theo GDPT 2018.",
    "relatedEquation": "4Fe³⁺ + 3[Fe(CN)₆]⁴⁻ → Fe₄[Fe(CN)₆]₃ Precipitate",
    "iupacName": "Prussian Blue Lattice Xyz Complex",
    "archetype": "TRANSITION_FORGE",
    "structuredEffects": [
      {
        "effectId": "B13_EFF_12",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "HEAL_LP",
            "params": {
              "amount": 500
            }
          }
        ],
        "description": "Tách 1 nguyên liệu phối trí: Hồi phục 500 LP."
      }
    ]
  },
  {
    "id": "card_b13_013_xyz_tetraamminezinc_ii__xyz_13",
    "name": "Phức Tứ Diện Kẽm Amoniac — Rank 3 (Cấu Trúc Phối Trí 2)",
    "name_en": "Tetraamminezinc(II) Xyz — Rank 3 Overlayer 2",
    "cardType": "XYZ_MONSTER",
    "rarity": "SECRET_RARE",
    "attribute": "TERRA",
    "manaCost": 3,
    "xyzRank": 3,
    "xyzMaterialsRequired": {
      "count": 2,
      "level": 3
    },
    "atk": 2840,
    "def": 2610,
    "chemicalFormula": "[Zn(NH3)4]2+",
    "effectCode": "XYZ_B13_TETRAAMMINEZINC_II__XYZ_OVERLAY_13",
    "effectText": "2 quái thú Level 3. Quái thú Xyz sở hữu Rank 3 (không có Level). Bỏ 1 Nguyên liệu Xyz: Phá hủy 1 quái thú đối phương có ATK thấp hơn hoặc hồi phục 500 LP.",
    "scientificLore": "Thuyết phối trí Werner (Nobel 1913): Nguyên tử trung tâm liên kết với các phối tử qua liên kết cho-nhận tạo nên hình học không gian phức chất bền vững theo GDPT 2018.",
    "relatedEquation": "Zn²⁺ + 4NH₃ → [Zn(NH₃)₄]²⁺ (sp³ Tetrahedral)",
    "iupacName": "Tetraamminezinc(II) Xyz Complex",
    "archetype": "WERNER_COORDINATION",
    "structuredEffects": [
      {
        "effectId": "B13_EFF_13",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "HEAL_LP",
            "params": {
              "amount": 500
            }
          }
        ],
        "description": "Tách 1 nguyên liệu phối trí: Hồi phục 500 LP."
      }
    ]
  },
  {
    "id": "card_b13_014_xyz_tetraamminecopper_ii__azure_xyz_14",
    "name": "Phức Đồng Tetrammine Lam Đậm — Rank 4 (Cấu Trúc Phối Trí 2)",
    "name_en": "Tetraamminecopper(II) Azure Xyz — Rank 4 Overlayer 2",
    "cardType": "XYZ_MONSTER",
    "rarity": "COMMON",
    "attribute": "AQUA",
    "manaCost": 3,
    "xyzRank": 4,
    "xyzMaterialsRequired": {
      "count": 2,
      "level": 4
    },
    "atk": 3070,
    "def": 2830,
    "chemicalFormula": "[Cu(NH3)4]2+",
    "effectCode": "XYZ_B13_TETRAAMMINECOPPER_II__AZURE_XYZ_OVERLAY_14",
    "effectText": "2 quái thú Level 4. Quái thú Xyz sở hữu Rank 4 (không có Level). Bỏ 1 Nguyên liệu Xyz: Phá hủy 1 quái thú đối phương có ATK thấp hơn hoặc hồi phục 500 LP.",
    "scientificLore": "Thuyết phối trí Werner (Nobel 1913): Nguyên tử trung tâm liên kết với các phối tử qua liên kết cho-nhận tạo nên hình học không gian phức chất bền vững theo GDPT 2018.",
    "relatedEquation": "Cu(OH)₂ + 4NH₃ → [Cu(NH₃)₄]²⁺ + 2OH⁻",
    "iupacName": "Tetraamminecopper(II) Azure Xyz Complex",
    "archetype": "TRANSITION_FORGE",
    "structuredEffects": [
      {
        "effectId": "B13_EFF_14",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "HEAL_LP",
            "params": {
              "amount": 500
            }
          }
        ],
        "description": "Tách 1 nguyên liệu phối trí: Hồi phục 500 LP."
      }
    ]
  },
  {
    "id": "card_b13_015_xyz_iron_iii__edta_chelate_xyz_15",
    "name": "Phức Chelate Sắt EDTA — Rank 5 (Cấu Trúc Phối Trí 2)",
    "name_en": "Iron(III) EDTA Chelate Xyz — Rank 5 Overlayer 2",
    "cardType": "XYZ_MONSTER",
    "rarity": "COMMON",
    "attribute": "TERRA",
    "manaCost": 4,
    "xyzRank": 5,
    "xyzMaterialsRequired": {
      "count": 2,
      "level": 5
    },
    "atk": 3300,
    "def": 3050,
    "chemicalFormula": "[Fe(EDTA)]-",
    "effectCode": "XYZ_B13_IRON_III__EDTA_CHELATE_XYZ_OVERLAY_15",
    "effectText": "2 quái thú Level 5. Quái thú Xyz sở hữu Rank 5 (không có Level). Bỏ 1 Nguyên liệu Xyz: Phá hủy 1 quái thú đối phương có ATK thấp hơn hoặc hồi phục 500 LP.",
    "scientificLore": "Thuyết phối trí Werner (Nobel 1913): Nguyên tử trung tâm liên kết với các phối tử qua liên kết cho-nhận tạo nên hình học không gian phức chất bền vững theo GDPT 2018.",
    "relatedEquation": "Fe³⁺ + EDTA⁴⁻ → [Fe(EDTA)]⁻ Hexadentate Chelate",
    "iupacName": "Iron(III) EDTA Chelate Xyz Complex",
    "archetype": "WERNER_COORDINATION",
    "structuredEffects": [
      {
        "effectId": "B13_EFF_15",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "HEAL_LP",
            "params": {
              "amount": 500
            }
          }
        ],
        "description": "Tách 1 nguyên liệu phối trí: Hồi phục 500 LP."
      }
    ]
  },
  {
    "id": "card_b13_016_xyz_diamminesilver_i__tollens_xyz_16",
    "name": "Phức Bạc Amoniac Thuốc Thử Tollens — Rank 6 (Cấu Trúc Phối Trí 2)",
    "name_en": "Diamminesilver(I) Tollens Xyz — Rank 6 Overlayer 2",
    "cardType": "XYZ_MONSTER",
    "rarity": "COMMON",
    "attribute": "AQUA",
    "manaCost": 5,
    "xyzRank": 6,
    "xyzMaterialsRequired": {
      "count": 2,
      "level": 6
    },
    "atk": 3530,
    "def": 3020,
    "chemicalFormula": "[Ag(NH3)2]+",
    "effectCode": "XYZ_B13_DIAMMINESILVER_I__TOLLENS_XYZ_OVERLAY_16",
    "effectText": "2 quái thú Level 6. Quái thú Xyz sở hữu Rank 6 (không có Level). Bỏ 1 Nguyên liệu Xyz: Phá hủy 1 quái thú đối phương có ATK thấp hơn hoặc hồi phục 500 LP.",
    "scientificLore": "Thuyết phối trí Werner (Nobel 1913): Nguyên tử trung tâm liên kết với các phối tử qua liên kết cho-nhận tạo nên hình học không gian phức chất bền vững theo GDPT 2018.",
    "relatedEquation": "Ag⁺ + 2NH₃ → [Ag(NH₃)₂]⁺ Linear Complex",
    "iupacName": "Diamminesilver(I) Tollens Xyz Complex",
    "archetype": "TRANSITION_FORGE",
    "structuredEffects": [
      {
        "effectId": "B13_EFF_16",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "HEAL_LP",
            "params": {
              "amount": 500
            }
          }
        ],
        "description": "Tách 1 nguyên liệu phối trí: Hồi phục 500 LP."
      }
    ]
  },
  {
    "id": "card_b13_017_xyz_hexamminecobalt_iii__octahedral_xyz_17",
    "name": "Phức Bát Diện Hexammine Coban — Rank 7 (Cấu Trúc Phối Trí 3)",
    "name_en": "Hexamminecobalt(III) Octahedral Xyz — Rank 7 Overlayer 3",
    "cardType": "XYZ_MONSTER",
    "rarity": "RARE",
    "attribute": "ELECTRO",
    "manaCost": 6,
    "xyzRank": 7,
    "xyzMaterialsRequired": {
      "count": 2,
      "level": 7
    },
    "atk": 3560,
    "def": 3240,
    "chemicalFormula": "[Co(NH3)6]3+",
    "effectCode": "XYZ_B13_HEXAMMINECOBALT_III__OCTAHEDRAL_XYZ_OVERLAY_17",
    "effectText": "2 quái thú Level 7. Quái thú Xyz sở hữu Rank 7 (không có Level). Bỏ 1 Nguyên liệu Xyz: Phá hủy 1 quái thú đối phương có ATK thấp hơn hoặc hồi phục 500 LP.",
    "scientificLore": "Thuyết phối trí Werner (Nobel 1913): Nguyên tử trung tâm liên kết với các phối tử qua liên kết cho-nhận tạo nên hình học không gian phức chất bền vững theo GDPT 2018.",
    "relatedEquation": "Co³⁺ + 6NH₃ → [Co(NH₃)₆]³⁺ (d²sp³ Octahedral)",
    "iupacName": "Hexamminecobalt(III) Octahedral Xyz Complex",
    "archetype": "WERNER_COORDINATION",
    "structuredEffects": [
      {
        "effectId": "B13_EFF_17",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "HEAL_LP",
            "params": {
              "amount": 500
            }
          }
        ],
        "description": "Tách 1 nguyên liệu phối trí: Hồi phục 500 LP."
      }
    ]
  },
  {
    "id": "card_b13_018_xyz_cisplatin_square_planar_xyz_18",
    "name": "Phức Vuông Phẳng Cisplatin — Rank 8 (Cấu Trúc Phối Trí 3)",
    "name_en": "Cisplatin Square Planar Xyz — Rank 8 Overlayer 3",
    "cardType": "XYZ_MONSTER",
    "rarity": "RARE",
    "attribute": "NOBLE_VOID",
    "manaCost": 7,
    "xyzRank": 8,
    "xyzMaterialsRequired": {
      "count": 2,
      "level": 8
    },
    "atk": 3790,
    "def": 3460,
    "chemicalFormula": "Pt(NH3)2Cl2",
    "effectCode": "XYZ_B13_CISPLATIN_SQUARE_PLANAR_XYZ_OVERLAY_18",
    "effectText": "2 quái thú Level 8. Quái thú Xyz sở hữu Rank 8 (không có Level). Bỏ 1 Nguyên liệu Xyz: Phá hủy 1 quái thú đối phương có ATK thấp hơn hoặc hồi phục 500 LP.",
    "scientificLore": "Thuyết phối trí Werner (Nobel 1913): Nguyên tử trung tâm liên kết với các phối tử qua liên kết cho-nhận tạo nên hình học không gian phức chất bền vững theo GDPT 2018.",
    "relatedEquation": "Pt²⁺ + 2NH₃ + 2Cl⁻ → cis-[Pt(NH₃)₂Cl₂] (dsp² Square Planar)",
    "iupacName": "Cisplatin Square Planar Xyz Complex",
    "archetype": "TRANSITION_FORGE",
    "structuredEffects": [
      {
        "effectId": "B13_EFF_18",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "HEAL_LP",
            "params": {
              "amount": 500
            }
          }
        ],
        "description": "Tách 1 nguyên liệu phối trí: Hồi phục 500 LP."
      }
    ]
  },
  {
    "id": "card_b13_019_xyz_ferrocene_sandwich_complex_xyz_19",
    "name": "Bánh Mì Kẹp Ferrocene — Rank 3 (Cấu Trúc Phối Trí 3)",
    "name_en": "Ferrocene Sandwich Complex Xyz — Rank 3 Overlayer 3",
    "cardType": "XYZ_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "TERRA",
    "manaCost": 3,
    "xyzRank": 3,
    "xyzMaterialsRequired": {
      "count": 2,
      "level": 3
    },
    "atk": 2940,
    "def": 2660,
    "chemicalFormula": "Fe(C5H5)2",
    "effectCode": "XYZ_B13_FERROCENE_SANDWICH_COMPLEX_XYZ_OVERLAY_19",
    "effectText": "2 quái thú Level 3. Quái thú Xyz sở hữu Rank 3 (không có Level). Bỏ 1 Nguyên liệu Xyz: Phá hủy 1 quái thú đối phương có ATK thấp hơn hoặc hồi phục 500 LP.",
    "scientificLore": "Thuyết phối trí Werner (Nobel 1913): Nguyên tử trung tâm liên kết với các phối tử qua liên kết cho-nhận tạo nên hình học không gian phức chất bền vững theo GDPT 2018.",
    "relatedEquation": "Fe²⁺ + 2C₅H₅⁻ → Fe(η⁵-C₅H₅)₂ Sandwich",
    "iupacName": "Ferrocene Sandwich Complex Xyz Complex",
    "archetype": "WERNER_COORDINATION",
    "structuredEffects": [
      {
        "effectId": "B13_EFF_19",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "HEAL_LP",
            "params": {
              "amount": 500
            }
          }
        ],
        "description": "Tách 1 nguyên liệu phối trí: Hồi phục 500 LP."
      }
    ]
  },
  {
    "id": "card_b13_020_xyz_prussian_blue_lattice_xyz_20",
    "name": "Phức Xanh Phổ Prussian Blue — Rank 4 (Cấu Trúc Phối Trí 3)",
    "name_en": "Prussian Blue Lattice Xyz — Rank 4 Overlayer 3",
    "cardType": "XYZ_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "AQUA",
    "manaCost": 3,
    "xyzRank": 4,
    "xyzMaterialsRequired": {
      "count": 2,
      "level": 4
    },
    "atk": 3170,
    "def": 2880,
    "chemicalFormula": "Fe4[Fe(CN)6]3",
    "effectCode": "XYZ_B13_PRUSSIAN_BLUE_LATTICE_XYZ_OVERLAY_20",
    "effectText": "2 quái thú Level 4. Quái thú Xyz sở hữu Rank 4 (không có Level). Bỏ 1 Nguyên liệu Xyz: Phá hủy 1 quái thú đối phương có ATK thấp hơn hoặc hồi phục 500 LP.",
    "scientificLore": "Thuyết phối trí Werner (Nobel 1913): Nguyên tử trung tâm liên kết với các phối tử qua liên kết cho-nhận tạo nên hình học không gian phức chất bền vững theo GDPT 2018.",
    "relatedEquation": "4Fe³⁺ + 3[Fe(CN)₆]⁴⁻ → Fe₄[Fe(CN)₆]₃ Precipitate",
    "iupacName": "Prussian Blue Lattice Xyz Complex",
    "archetype": "TRANSITION_FORGE",
    "structuredEffects": [
      {
        "effectId": "B13_EFF_20",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "HEAL_LP",
            "params": {
              "amount": 500
            }
          }
        ],
        "description": "Tách 1 nguyên liệu phối trí: Hồi phục 500 LP."
      }
    ]
  },
  {
    "id": "card_b13_021_xyz_tetraamminezinc_ii__xyz_21",
    "name": "Phức Tứ Diện Kẽm Amoniac — Rank 5 (Cấu Trúc Phối Trí 3)",
    "name_en": "Tetraamminezinc(II) Xyz — Rank 5 Overlayer 3",
    "cardType": "XYZ_MONSTER",
    "rarity": "ULTRA_RARE",
    "attribute": "TERRA",
    "manaCost": 4,
    "xyzRank": 5,
    "xyzMaterialsRequired": {
      "count": 2,
      "level": 5
    },
    "atk": 3200,
    "def": 2850,
    "chemicalFormula": "[Zn(NH3)4]2+",
    "effectCode": "XYZ_B13_TETRAAMMINEZINC_II__XYZ_OVERLAY_21",
    "effectText": "2 quái thú Level 5. Quái thú Xyz sở hữu Rank 5 (không có Level). Bỏ 1 Nguyên liệu Xyz: Phá hủy 1 quái thú đối phương có ATK thấp hơn hoặc hồi phục 500 LP.",
    "scientificLore": "Thuyết phối trí Werner (Nobel 1913): Nguyên tử trung tâm liên kết với các phối tử qua liên kết cho-nhận tạo nên hình học không gian phức chất bền vững theo GDPT 2018.",
    "relatedEquation": "Zn²⁺ + 4NH₃ → [Zn(NH₃)₄]²⁺ (sp³ Tetrahedral)",
    "iupacName": "Tetraamminezinc(II) Xyz Complex",
    "archetype": "WERNER_COORDINATION",
    "structuredEffects": [
      {
        "effectId": "B13_EFF_21",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "HEAL_LP",
            "params": {
              "amount": 500
            }
          }
        ],
        "description": "Tách 1 nguyên liệu phối trí: Hồi phục 500 LP."
      }
    ]
  },
  {
    "id": "card_b13_022_xyz_tetraamminecopper_ii__azure_xyz_22",
    "name": "Phức Đồng Tetrammine Lam Đậm — Rank 6 (Cấu Trúc Phối Trí 3)",
    "name_en": "Tetraamminecopper(II) Azure Xyz — Rank 6 Overlayer 3",
    "cardType": "XYZ_MONSTER",
    "rarity": "SECRET_RARE",
    "attribute": "AQUA",
    "manaCost": 5,
    "xyzRank": 6,
    "xyzMaterialsRequired": {
      "count": 2,
      "level": 6
    },
    "atk": 3430,
    "def": 3070,
    "chemicalFormula": "[Cu(NH3)4]2+",
    "effectCode": "XYZ_B13_TETRAAMMINECOPPER_II__AZURE_XYZ_OVERLAY_22",
    "effectText": "2 quái thú Level 6. Quái thú Xyz sở hữu Rank 6 (không có Level). Bỏ 1 Nguyên liệu Xyz: Phá hủy 1 quái thú đối phương có ATK thấp hơn hoặc hồi phục 500 LP.",
    "scientificLore": "Thuyết phối trí Werner (Nobel 1913): Nguyên tử trung tâm liên kết với các phối tử qua liên kết cho-nhận tạo nên hình học không gian phức chất bền vững theo GDPT 2018.",
    "relatedEquation": "Cu(OH)₂ + 4NH₃ → [Cu(NH₃)₄]²⁺ + 2OH⁻",
    "iupacName": "Tetraamminecopper(II) Azure Xyz Complex",
    "archetype": "TRANSITION_FORGE",
    "structuredEffects": [
      {
        "effectId": "B13_EFF_22",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "HEAL_LP",
            "params": {
              "amount": 500
            }
          }
        ],
        "description": "Tách 1 nguyên liệu phối trí: Hồi phục 500 LP."
      }
    ]
  },
  {
    "id": "card_b13_023_xyz_iron_iii__edta_chelate_xyz_23",
    "name": "Phức Chelate Sắt EDTA — Rank 7 (Cấu Trúc Phối Trí 3)",
    "name_en": "Iron(III) EDTA Chelate Xyz — Rank 7 Overlayer 3",
    "cardType": "XYZ_MONSTER",
    "rarity": "COMMON",
    "attribute": "TERRA",
    "manaCost": 6,
    "xyzRank": 7,
    "xyzMaterialsRequired": {
      "count": 2,
      "level": 7
    },
    "atk": 3660,
    "def": 3290,
    "chemicalFormula": "[Fe(EDTA)]-",
    "effectCode": "XYZ_B13_IRON_III__EDTA_CHELATE_XYZ_OVERLAY_23",
    "effectText": "2 quái thú Level 7. Quái thú Xyz sở hữu Rank 7 (không có Level). Bỏ 1 Nguyên liệu Xyz: Phá hủy 1 quái thú đối phương có ATK thấp hơn hoặc hồi phục 500 LP.",
    "scientificLore": "Thuyết phối trí Werner (Nobel 1913): Nguyên tử trung tâm liên kết với các phối tử qua liên kết cho-nhận tạo nên hình học không gian phức chất bền vững theo GDPT 2018.",
    "relatedEquation": "Fe³⁺ + EDTA⁴⁻ → [Fe(EDTA)]⁻ Hexadentate Chelate",
    "iupacName": "Iron(III) EDTA Chelate Xyz Complex",
    "archetype": "WERNER_COORDINATION",
    "structuredEffects": [
      {
        "effectId": "B13_EFF_23",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "HEAL_LP",
            "params": {
              "amount": 500
            }
          }
        ],
        "description": "Tách 1 nguyên liệu phối trí: Hồi phục 500 LP."
      }
    ]
  },
  {
    "id": "card_b13_024_xyz_diamminesilver_i__tollens_xyz_24",
    "name": "Phức Bạc Amoniac Thuốc Thử Tollens — Rank 8 (Cấu Trúc Phối Trí 3)",
    "name_en": "Diamminesilver(I) Tollens Xyz — Rank 8 Overlayer 3",
    "cardType": "XYZ_MONSTER",
    "rarity": "COMMON",
    "attribute": "AQUA",
    "manaCost": 7,
    "xyzRank": 8,
    "xyzMaterialsRequired": {
      "count": 2,
      "level": 8
    },
    "atk": 3890,
    "def": 3510,
    "chemicalFormula": "[Ag(NH3)2]+",
    "effectCode": "XYZ_B13_DIAMMINESILVER_I__TOLLENS_XYZ_OVERLAY_24",
    "effectText": "2 quái thú Level 8. Quái thú Xyz sở hữu Rank 8 (không có Level). Bỏ 1 Nguyên liệu Xyz: Phá hủy 1 quái thú đối phương có ATK thấp hơn hoặc hồi phục 500 LP.",
    "scientificLore": "Thuyết phối trí Werner (Nobel 1913): Nguyên tử trung tâm liên kết với các phối tử qua liên kết cho-nhận tạo nên hình học không gian phức chất bền vững theo GDPT 2018.",
    "relatedEquation": "Ag⁺ + 2NH₃ → [Ag(NH₃)₂]⁺ Linear Complex",
    "iupacName": "Diamminesilver(I) Tollens Xyz Complex",
    "archetype": "TRANSITION_FORGE",
    "structuredEffects": [
      {
        "effectId": "B13_EFF_24",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "HEAL_LP",
            "params": {
              "amount": 500
            }
          }
        ],
        "description": "Tách 1 nguyên liệu phối trí: Hồi phục 500 LP."
      }
    ]
  },
  {
    "id": "card_b13_025_xyz_hexamminecobalt_iii__octahedral_xyz_25",
    "name": "Phức Bát Diện Hexammine Coban — Rank 3 (Cấu Trúc Phối Trí 4)",
    "name_en": "Hexamminecobalt(III) Octahedral Xyz — Rank 3 Overlayer 4",
    "cardType": "XYZ_MONSTER",
    "rarity": "COMMON",
    "attribute": "ELECTRO",
    "manaCost": 3,
    "xyzRank": 3,
    "xyzMaterialsRequired": {
      "count": 2,
      "level": 3
    },
    "atk": 2840,
    "def": 2710,
    "chemicalFormula": "[Co(NH3)6]3+",
    "effectCode": "XYZ_B13_HEXAMMINECOBALT_III__OCTAHEDRAL_XYZ_OVERLAY_25",
    "effectText": "2 quái thú Level 3. Quái thú Xyz sở hữu Rank 3 (không có Level). Bỏ 1 Nguyên liệu Xyz: Phá hủy 1 quái thú đối phương có ATK thấp hơn hoặc hồi phục 500 LP.",
    "scientificLore": "Thuyết phối trí Werner (Nobel 1913): Nguyên tử trung tâm liên kết với các phối tử qua liên kết cho-nhận tạo nên hình học không gian phức chất bền vững theo GDPT 2018.",
    "relatedEquation": "Co³⁺ + 6NH₃ → [Co(NH₃)₆]³⁺ (d²sp³ Octahedral)",
    "iupacName": "Hexamminecobalt(III) Octahedral Xyz Complex",
    "archetype": "WERNER_COORDINATION",
    "structuredEffects": [
      {
        "effectId": "B13_EFF_25",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "HEAL_LP",
            "params": {
              "amount": 500
            }
          }
        ],
        "description": "Tách 1 nguyên liệu phối trí: Hồi phục 500 LP."
      }
    ]
  },
  {
    "id": "card_b13_026_xyz_cisplatin_square_planar_xyz_26",
    "name": "Phức Vuông Phẳng Cisplatin — Rank 4 (Cấu Trúc Phối Trí 4)",
    "name_en": "Cisplatin Square Planar Xyz — Rank 4 Overlayer 4",
    "cardType": "XYZ_MONSTER",
    "rarity": "RARE",
    "attribute": "NOBLE_VOID",
    "manaCost": 3,
    "xyzRank": 4,
    "xyzMaterialsRequired": {
      "count": 2,
      "level": 4
    },
    "atk": 3070,
    "def": 2680,
    "chemicalFormula": "Pt(NH3)2Cl2",
    "effectCode": "XYZ_B13_CISPLATIN_SQUARE_PLANAR_XYZ_OVERLAY_26",
    "effectText": "2 quái thú Level 4. Quái thú Xyz sở hữu Rank 4 (không có Level). Bỏ 1 Nguyên liệu Xyz: Phá hủy 1 quái thú đối phương có ATK thấp hơn hoặc hồi phục 500 LP.",
    "scientificLore": "Thuyết phối trí Werner (Nobel 1913): Nguyên tử trung tâm liên kết với các phối tử qua liên kết cho-nhận tạo nên hình học không gian phức chất bền vững theo GDPT 2018.",
    "relatedEquation": "Pt²⁺ + 2NH₃ + 2Cl⁻ → cis-[Pt(NH₃)₂Cl₂] (dsp² Square Planar)",
    "iupacName": "Cisplatin Square Planar Xyz Complex",
    "archetype": "TRANSITION_FORGE",
    "structuredEffects": [
      {
        "effectId": "B13_EFF_26",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "HEAL_LP",
            "params": {
              "amount": 500
            }
          }
        ],
        "description": "Tách 1 nguyên liệu phối trí: Hồi phục 500 LP."
      }
    ]
  },
  {
    "id": "card_b13_027_xyz_ferrocene_sandwich_complex_xyz_27",
    "name": "Bánh Mì Kẹp Ferrocene — Rank 5 (Cấu Trúc Phối Trí 4)",
    "name_en": "Ferrocene Sandwich Complex Xyz — Rank 5 Overlayer 4",
    "cardType": "XYZ_MONSTER",
    "rarity": "RARE",
    "attribute": "TERRA",
    "manaCost": 4,
    "xyzRank": 5,
    "xyzMaterialsRequired": {
      "count": 2,
      "level": 5
    },
    "atk": 3300,
    "def": 2900,
    "chemicalFormula": "Fe(C5H5)2",
    "effectCode": "XYZ_B13_FERROCENE_SANDWICH_COMPLEX_XYZ_OVERLAY_27",
    "effectText": "2 quái thú Level 5. Quái thú Xyz sở hữu Rank 5 (không có Level). Bỏ 1 Nguyên liệu Xyz: Phá hủy 1 quái thú đối phương có ATK thấp hơn hoặc hồi phục 500 LP.",
    "scientificLore": "Thuyết phối trí Werner (Nobel 1913): Nguyên tử trung tâm liên kết với các phối tử qua liên kết cho-nhận tạo nên hình học không gian phức chất bền vững theo GDPT 2018.",
    "relatedEquation": "Fe²⁺ + 2C₅H₅⁻ → Fe(η⁵-C₅H₅)₂ Sandwich",
    "iupacName": "Ferrocene Sandwich Complex Xyz Complex",
    "archetype": "WERNER_COORDINATION",
    "structuredEffects": [
      {
        "effectId": "B13_EFF_27",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "HEAL_LP",
            "params": {
              "amount": 500
            }
          }
        ],
        "description": "Tách 1 nguyên liệu phối trí: Hồi phục 500 LP."
      }
    ]
  },
  {
    "id": "card_b13_028_xyz_prussian_blue_lattice_xyz_28",
    "name": "Phức Xanh Phổ Prussian Blue — Rank 6 (Cấu Trúc Phối Trí 4)",
    "name_en": "Prussian Blue Lattice Xyz — Rank 6 Overlayer 4",
    "cardType": "XYZ_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "AQUA",
    "manaCost": 5,
    "xyzRank": 6,
    "xyzMaterialsRequired": {
      "count": 2,
      "level": 6
    },
    "atk": 3530,
    "def": 3120,
    "chemicalFormula": "Fe4[Fe(CN)6]3",
    "effectCode": "XYZ_B13_PRUSSIAN_BLUE_LATTICE_XYZ_OVERLAY_28",
    "effectText": "2 quái thú Level 6. Quái thú Xyz sở hữu Rank 6 (không có Level). Bỏ 1 Nguyên liệu Xyz: Phá hủy 1 quái thú đối phương có ATK thấp hơn hoặc hồi phục 500 LP.",
    "scientificLore": "Thuyết phối trí Werner (Nobel 1913): Nguyên tử trung tâm liên kết với các phối tử qua liên kết cho-nhận tạo nên hình học không gian phức chất bền vững theo GDPT 2018.",
    "relatedEquation": "4Fe³⁺ + 3[Fe(CN)₆]⁴⁻ → Fe₄[Fe(CN)₆]₃ Precipitate",
    "iupacName": "Prussian Blue Lattice Xyz Complex",
    "archetype": "TRANSITION_FORGE",
    "structuredEffects": [
      {
        "effectId": "B13_EFF_28",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "HEAL_LP",
            "params": {
              "amount": 500
            }
          }
        ],
        "description": "Tách 1 nguyên liệu phối trí: Hồi phục 500 LP."
      }
    ]
  },
  {
    "id": "card_b13_029_xyz_tetraamminezinc_ii__xyz_29",
    "name": "Phức Tứ Diện Kẽm Amoniac — Rank 7 (Cấu Trúc Phối Trí 4)",
    "name_en": "Tetraamminezinc(II) Xyz — Rank 7 Overlayer 4",
    "cardType": "XYZ_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "TERRA",
    "manaCost": 6,
    "xyzRank": 7,
    "xyzMaterialsRequired": {
      "count": 2,
      "level": 7
    },
    "atk": 3560,
    "def": 3340,
    "chemicalFormula": "[Zn(NH3)4]2+",
    "effectCode": "XYZ_B13_TETRAAMMINEZINC_II__XYZ_OVERLAY_29",
    "effectText": "2 quái thú Level 7. Quái thú Xyz sở hữu Rank 7 (không có Level). Bỏ 1 Nguyên liệu Xyz: Phá hủy 1 quái thú đối phương có ATK thấp hơn hoặc hồi phục 500 LP.",
    "scientificLore": "Thuyết phối trí Werner (Nobel 1913): Nguyên tử trung tâm liên kết với các phối tử qua liên kết cho-nhận tạo nên hình học không gian phức chất bền vững theo GDPT 2018.",
    "relatedEquation": "Zn²⁺ + 4NH₃ → [Zn(NH₃)₄]²⁺ (sp³ Tetrahedral)",
    "iupacName": "Tetraamminezinc(II) Xyz Complex",
    "archetype": "WERNER_COORDINATION",
    "structuredEffects": [
      {
        "effectId": "B13_EFF_29",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "HEAL_LP",
            "params": {
              "amount": 500
            }
          }
        ],
        "description": "Tách 1 nguyên liệu phối trí: Hồi phục 500 LP."
      }
    ]
  },
  {
    "id": "card_b13_030_xyz_tetraamminecopper_ii__azure_xyz_30",
    "name": "Phức Đồng Tetrammine Lam Đậm — Rank 8 (Cấu Trúc Phối Trí 4)",
    "name_en": "Tetraamminecopper(II) Azure Xyz — Rank 8 Overlayer 4",
    "cardType": "XYZ_MONSTER",
    "rarity": "ULTRA_RARE",
    "attribute": "AQUA",
    "manaCost": 7,
    "xyzRank": 8,
    "xyzMaterialsRequired": {
      "count": 2,
      "level": 8
    },
    "atk": 3790,
    "def": 3560,
    "chemicalFormula": "[Cu(NH3)4]2+",
    "effectCode": "XYZ_B13_TETRAAMMINECOPPER_II__AZURE_XYZ_OVERLAY_30",
    "effectText": "2 quái thú Level 8. Quái thú Xyz sở hữu Rank 8 (không có Level). Bỏ 1 Nguyên liệu Xyz: Phá hủy 1 quái thú đối phương có ATK thấp hơn hoặc hồi phục 500 LP.",
    "scientificLore": "Thuyết phối trí Werner (Nobel 1913): Nguyên tử trung tâm liên kết với các phối tử qua liên kết cho-nhận tạo nên hình học không gian phức chất bền vững theo GDPT 2018.",
    "relatedEquation": "Cu(OH)₂ + 4NH₃ → [Cu(NH₃)₄]²⁺ + 2OH⁻",
    "iupacName": "Tetraamminecopper(II) Azure Xyz Complex",
    "archetype": "TRANSITION_FORGE",
    "structuredEffects": [
      {
        "effectId": "B13_EFF_30",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "HEAL_LP",
            "params": {
              "amount": 500
            }
          }
        ],
        "description": "Tách 1 nguyên liệu phối trí: Hồi phục 500 LP."
      }
    ]
  },
  {
    "id": "card_b13_031_xyz_iron_iii__edta_chelate_xyz_31",
    "name": "Phức Chelate Sắt EDTA — Rank 3 (Cấu Trúc Phối Trí 4)",
    "name_en": "Iron(III) EDTA Chelate Xyz — Rank 3 Overlayer 4",
    "cardType": "XYZ_MONSTER",
    "rarity": "SECRET_RARE",
    "attribute": "TERRA",
    "manaCost": 3,
    "xyzRank": 3,
    "xyzMaterialsRequired": {
      "count": 2,
      "level": 3
    },
    "atk": 2940,
    "def": 2510,
    "chemicalFormula": "[Fe(EDTA)]-",
    "effectCode": "XYZ_B13_IRON_III__EDTA_CHELATE_XYZ_OVERLAY_31",
    "effectText": "2 quái thú Level 3. Quái thú Xyz sở hữu Rank 3 (không có Level). Bỏ 1 Nguyên liệu Xyz: Phá hủy 1 quái thú đối phương có ATK thấp hơn hoặc hồi phục 500 LP.",
    "scientificLore": "Thuyết phối trí Werner (Nobel 1913): Nguyên tử trung tâm liên kết với các phối tử qua liên kết cho-nhận tạo nên hình học không gian phức chất bền vững theo GDPT 2018.",
    "relatedEquation": "Fe³⁺ + EDTA⁴⁻ → [Fe(EDTA)]⁻ Hexadentate Chelate",
    "iupacName": "Iron(III) EDTA Chelate Xyz Complex",
    "archetype": "WERNER_COORDINATION",
    "structuredEffects": [
      {
        "effectId": "B13_EFF_31",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "HEAL_LP",
            "params": {
              "amount": 500
            }
          }
        ],
        "description": "Tách 1 nguyên liệu phối trí: Hồi phục 500 LP."
      }
    ]
  },
  {
    "id": "card_b13_032_xyz_diamminesilver_i__tollens_xyz_32",
    "name": "Phức Bạc Amoniac Thuốc Thử Tollens — Rank 4 (Cấu Trúc Phối Trí 4)",
    "name_en": "Diamminesilver(I) Tollens Xyz — Rank 4 Overlayer 4",
    "cardType": "XYZ_MONSTER",
    "rarity": "COMMON",
    "attribute": "AQUA",
    "manaCost": 3,
    "xyzRank": 4,
    "xyzMaterialsRequired": {
      "count": 2,
      "level": 4
    },
    "atk": 3170,
    "def": 2730,
    "chemicalFormula": "[Ag(NH3)2]+",
    "effectCode": "XYZ_B13_DIAMMINESILVER_I__TOLLENS_XYZ_OVERLAY_32",
    "effectText": "2 quái thú Level 4. Quái thú Xyz sở hữu Rank 4 (không có Level). Bỏ 1 Nguyên liệu Xyz: Phá hủy 1 quái thú đối phương có ATK thấp hơn hoặc hồi phục 500 LP.",
    "scientificLore": "Thuyết phối trí Werner (Nobel 1913): Nguyên tử trung tâm liên kết với các phối tử qua liên kết cho-nhận tạo nên hình học không gian phức chất bền vững theo GDPT 2018.",
    "relatedEquation": "Ag⁺ + 2NH₃ → [Ag(NH₃)₂]⁺ Linear Complex",
    "iupacName": "Diamminesilver(I) Tollens Xyz Complex",
    "archetype": "TRANSITION_FORGE",
    "structuredEffects": [
      {
        "effectId": "B13_EFF_32",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "HEAL_LP",
            "params": {
              "amount": 500
            }
          }
        ],
        "description": "Tách 1 nguyên liệu phối trí: Hồi phục 500 LP."
      }
    ]
  },
  {
    "id": "card_b13_033_xyz_hexamminecobalt_iii__octahedral_xyz_33",
    "name": "Phức Bát Diện Hexammine Coban — Rank 5 (Cấu Trúc Phối Trí 5)",
    "name_en": "Hexamminecobalt(III) Octahedral Xyz — Rank 5 Overlayer 5",
    "cardType": "XYZ_MONSTER",
    "rarity": "COMMON",
    "attribute": "ELECTRO",
    "manaCost": 4,
    "xyzRank": 5,
    "xyzMaterialsRequired": {
      "count": 2,
      "level": 5
    },
    "atk": 3200,
    "def": 2950,
    "chemicalFormula": "[Co(NH3)6]3+",
    "effectCode": "XYZ_B13_HEXAMMINECOBALT_III__OCTAHEDRAL_XYZ_OVERLAY_33",
    "effectText": "2 quái thú Level 5. Quái thú Xyz sở hữu Rank 5 (không có Level). Bỏ 1 Nguyên liệu Xyz: Phá hủy 1 quái thú đối phương có ATK thấp hơn hoặc hồi phục 500 LP.",
    "scientificLore": "Thuyết phối trí Werner (Nobel 1913): Nguyên tử trung tâm liên kết với các phối tử qua liên kết cho-nhận tạo nên hình học không gian phức chất bền vững theo GDPT 2018.",
    "relatedEquation": "Co³⁺ + 6NH₃ → [Co(NH₃)₆]³⁺ (d²sp³ Octahedral)",
    "iupacName": "Hexamminecobalt(III) Octahedral Xyz Complex",
    "archetype": "WERNER_COORDINATION",
    "structuredEffects": [
      {
        "effectId": "B13_EFF_33",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "HEAL_LP",
            "params": {
              "amount": 500
            }
          }
        ],
        "description": "Tách 1 nguyên liệu phối trí: Hồi phục 500 LP."
      }
    ]
  },
  {
    "id": "card_b13_034_xyz_cisplatin_square_planar_xyz_34",
    "name": "Phức Vuông Phẳng Cisplatin — Rank 6 (Cấu Trúc Phối Trí 5)",
    "name_en": "Cisplatin Square Planar Xyz — Rank 6 Overlayer 5",
    "cardType": "XYZ_MONSTER",
    "rarity": "COMMON",
    "attribute": "NOBLE_VOID",
    "manaCost": 5,
    "xyzRank": 6,
    "xyzMaterialsRequired": {
      "count": 2,
      "level": 6
    },
    "atk": 3430,
    "def": 3170,
    "chemicalFormula": "Pt(NH3)2Cl2",
    "effectCode": "XYZ_B13_CISPLATIN_SQUARE_PLANAR_XYZ_OVERLAY_34",
    "effectText": "2 quái thú Level 6. Quái thú Xyz sở hữu Rank 6 (không có Level). Bỏ 1 Nguyên liệu Xyz: Phá hủy 1 quái thú đối phương có ATK thấp hơn hoặc hồi phục 500 LP.",
    "scientificLore": "Thuyết phối trí Werner (Nobel 1913): Nguyên tử trung tâm liên kết với các phối tử qua liên kết cho-nhận tạo nên hình học không gian phức chất bền vững theo GDPT 2018.",
    "relatedEquation": "Pt²⁺ + 2NH₃ + 2Cl⁻ → cis-[Pt(NH₃)₂Cl₂] (dsp² Square Planar)",
    "iupacName": "Cisplatin Square Planar Xyz Complex",
    "archetype": "TRANSITION_FORGE",
    "structuredEffects": [
      {
        "effectId": "B13_EFF_34",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "HEAL_LP",
            "params": {
              "amount": 500
            }
          }
        ],
        "description": "Tách 1 nguyên liệu phối trí: Hồi phục 500 LP."
      }
    ]
  },
  {
    "id": "card_b13_035_xyz_ferrocene_sandwich_complex_xyz_35",
    "name": "Bánh Mì Kẹp Ferrocene — Rank 7 (Cấu Trúc Phối Trí 5)",
    "name_en": "Ferrocene Sandwich Complex Xyz — Rank 7 Overlayer 5",
    "cardType": "XYZ_MONSTER",
    "rarity": "RARE",
    "attribute": "TERRA",
    "manaCost": 6,
    "xyzRank": 7,
    "xyzMaterialsRequired": {
      "count": 2,
      "level": 7
    },
    "atk": 3660,
    "def": 3390,
    "chemicalFormula": "Fe(C5H5)2",
    "effectCode": "XYZ_B13_FERROCENE_SANDWICH_COMPLEX_XYZ_OVERLAY_35",
    "effectText": "2 quái thú Level 7. Quái thú Xyz sở hữu Rank 7 (không có Level). Bỏ 1 Nguyên liệu Xyz: Phá hủy 1 quái thú đối phương có ATK thấp hơn hoặc hồi phục 500 LP.",
    "scientificLore": "Thuyết phối trí Werner (Nobel 1913): Nguyên tử trung tâm liên kết với các phối tử qua liên kết cho-nhận tạo nên hình học không gian phức chất bền vững theo GDPT 2018.",
    "relatedEquation": "Fe²⁺ + 2C₅H₅⁻ → Fe(η⁵-C₅H₅)₂ Sandwich",
    "iupacName": "Ferrocene Sandwich Complex Xyz Complex",
    "archetype": "WERNER_COORDINATION",
    "structuredEffects": [
      {
        "effectId": "B13_EFF_35",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "HEAL_LP",
            "params": {
              "amount": 500
            }
          }
        ],
        "description": "Tách 1 nguyên liệu phối trí: Hồi phục 500 LP."
      }
    ]
  },
  {
    "id": "card_b13_036_xyz_prussian_blue_lattice_xyz_36",
    "name": "Phức Xanh Phổ Prussian Blue — Rank 8 (Cấu Trúc Phối Trí 5)",
    "name_en": "Prussian Blue Lattice Xyz — Rank 8 Overlayer 5",
    "cardType": "XYZ_MONSTER",
    "rarity": "RARE",
    "attribute": "AQUA",
    "manaCost": 7,
    "xyzRank": 8,
    "xyzMaterialsRequired": {
      "count": 2,
      "level": 8
    },
    "atk": 3890,
    "def": 3360,
    "chemicalFormula": "Fe4[Fe(CN)6]3",
    "effectCode": "XYZ_B13_PRUSSIAN_BLUE_LATTICE_XYZ_OVERLAY_36",
    "effectText": "2 quái thú Level 8. Quái thú Xyz sở hữu Rank 8 (không có Level). Bỏ 1 Nguyên liệu Xyz: Phá hủy 1 quái thú đối phương có ATK thấp hơn hoặc hồi phục 500 LP.",
    "scientificLore": "Thuyết phối trí Werner (Nobel 1913): Nguyên tử trung tâm liên kết với các phối tử qua liên kết cho-nhận tạo nên hình học không gian phức chất bền vững theo GDPT 2018.",
    "relatedEquation": "4Fe³⁺ + 3[Fe(CN)₆]⁴⁻ → Fe₄[Fe(CN)₆]₃ Precipitate",
    "iupacName": "Prussian Blue Lattice Xyz Complex",
    "archetype": "TRANSITION_FORGE",
    "structuredEffects": [
      {
        "effectId": "B13_EFF_36",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "HEAL_LP",
            "params": {
              "amount": 500
            }
          }
        ],
        "description": "Tách 1 nguyên liệu phối trí: Hồi phục 500 LP."
      }
    ]
  },
  {
    "id": "card_b13_037_xyz_tetraamminezinc_ii__xyz_37",
    "name": "Phức Tứ Diện Kẽm Amoniac — Rank 3 (Cấu Trúc Phối Trí 5)",
    "name_en": "Tetraamminezinc(II) Xyz — Rank 3 Overlayer 5",
    "cardType": "XYZ_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "TERRA",
    "manaCost": 3,
    "xyzRank": 3,
    "xyzMaterialsRequired": {
      "count": 2,
      "level": 3
    },
    "atk": 2840,
    "def": 2560,
    "chemicalFormula": "[Zn(NH3)4]2+",
    "effectCode": "XYZ_B13_TETRAAMMINEZINC_II__XYZ_OVERLAY_37",
    "effectText": "2 quái thú Level 3. Quái thú Xyz sở hữu Rank 3 (không có Level). Bỏ 1 Nguyên liệu Xyz: Phá hủy 1 quái thú đối phương có ATK thấp hơn hoặc hồi phục 500 LP.",
    "scientificLore": "Thuyết phối trí Werner (Nobel 1913): Nguyên tử trung tâm liên kết với các phối tử qua liên kết cho-nhận tạo nên hình học không gian phức chất bền vững theo GDPT 2018.",
    "relatedEquation": "Zn²⁺ + 4NH₃ → [Zn(NH₃)₄]²⁺ (sp³ Tetrahedral)",
    "iupacName": "Tetraamminezinc(II) Xyz Complex",
    "archetype": "WERNER_COORDINATION",
    "structuredEffects": [
      {
        "effectId": "B13_EFF_37",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "HEAL_LP",
            "params": {
              "amount": 500
            }
          }
        ],
        "description": "Tách 1 nguyên liệu phối trí: Hồi phục 500 LP."
      }
    ]
  },
  {
    "id": "card_b13_038_xyz_tetraamminecopper_ii__azure_xyz_38",
    "name": "Phức Đồng Tetrammine Lam Đậm — Rank 4 (Cấu Trúc Phối Trí 5)",
    "name_en": "Tetraamminecopper(II) Azure Xyz — Rank 4 Overlayer 5",
    "cardType": "XYZ_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "AQUA",
    "manaCost": 3,
    "xyzRank": 4,
    "xyzMaterialsRequired": {
      "count": 2,
      "level": 4
    },
    "atk": 3070,
    "def": 2780,
    "chemicalFormula": "[Cu(NH3)4]2+",
    "effectCode": "XYZ_B13_TETRAAMMINECOPPER_II__AZURE_XYZ_OVERLAY_38",
    "effectText": "2 quái thú Level 4. Quái thú Xyz sở hữu Rank 4 (không có Level). Bỏ 1 Nguyên liệu Xyz: Phá hủy 1 quái thú đối phương có ATK thấp hơn hoặc hồi phục 500 LP.",
    "scientificLore": "Thuyết phối trí Werner (Nobel 1913): Nguyên tử trung tâm liên kết với các phối tử qua liên kết cho-nhận tạo nên hình học không gian phức chất bền vững theo GDPT 2018.",
    "relatedEquation": "Cu(OH)₂ + 4NH₃ → [Cu(NH₃)₄]²⁺ + 2OH⁻",
    "iupacName": "Tetraamminecopper(II) Azure Xyz Complex",
    "archetype": "TRANSITION_FORGE",
    "structuredEffects": [
      {
        "effectId": "B13_EFF_38",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "HEAL_LP",
            "params": {
              "amount": 500
            }
          }
        ],
        "description": "Tách 1 nguyên liệu phối trí: Hồi phục 500 LP."
      }
    ]
  },
  {
    "id": "card_b13_039_xyz_iron_iii__edta_chelate_xyz_39",
    "name": "Phức Chelate Sắt EDTA — Rank 5 (Cấu Trúc Phối Trí 5)",
    "name_en": "Iron(III) EDTA Chelate Xyz — Rank 5 Overlayer 5",
    "cardType": "XYZ_MONSTER",
    "rarity": "ULTRA_RARE",
    "attribute": "TERRA",
    "manaCost": 4,
    "xyzRank": 5,
    "xyzMaterialsRequired": {
      "count": 2,
      "level": 5
    },
    "atk": 3300,
    "def": 3000,
    "chemicalFormula": "[Fe(EDTA)]-",
    "effectCode": "XYZ_B13_IRON_III__EDTA_CHELATE_XYZ_OVERLAY_39",
    "effectText": "2 quái thú Level 5. Quái thú Xyz sở hữu Rank 5 (không có Level). Bỏ 1 Nguyên liệu Xyz: Phá hủy 1 quái thú đối phương có ATK thấp hơn hoặc hồi phục 500 LP.",
    "scientificLore": "Thuyết phối trí Werner (Nobel 1913): Nguyên tử trung tâm liên kết với các phối tử qua liên kết cho-nhận tạo nên hình học không gian phức chất bền vững theo GDPT 2018.",
    "relatedEquation": "Fe³⁺ + EDTA⁴⁻ → [Fe(EDTA)]⁻ Hexadentate Chelate",
    "iupacName": "Iron(III) EDTA Chelate Xyz Complex",
    "archetype": "WERNER_COORDINATION",
    "structuredEffects": [
      {
        "effectId": "B13_EFF_39",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "HEAL_LP",
            "params": {
              "amount": 500
            }
          }
        ],
        "description": "Tách 1 nguyên liệu phối trí: Hồi phục 500 LP."
      }
    ]
  },
  {
    "id": "card_b13_040_xyz_diamminesilver_i__tollens_xyz_40",
    "name": "Phức Bạc Amoniac Thuốc Thử Tollens — Rank 6 (Cấu Trúc Phối Trí 5)",
    "name_en": "Diamminesilver(I) Tollens Xyz — Rank 6 Overlayer 5",
    "cardType": "XYZ_MONSTER",
    "rarity": "SECRET_RARE",
    "attribute": "AQUA",
    "manaCost": 5,
    "xyzRank": 6,
    "xyzMaterialsRequired": {
      "count": 2,
      "level": 6
    },
    "atk": 3530,
    "def": 3220,
    "chemicalFormula": "[Ag(NH3)2]+",
    "effectCode": "XYZ_B13_DIAMMINESILVER_I__TOLLENS_XYZ_OVERLAY_40",
    "effectText": "2 quái thú Level 6. Quái thú Xyz sở hữu Rank 6 (không có Level). Bỏ 1 Nguyên liệu Xyz: Phá hủy 1 quái thú đối phương có ATK thấp hơn hoặc hồi phục 500 LP.",
    "scientificLore": "Thuyết phối trí Werner (Nobel 1913): Nguyên tử trung tâm liên kết với các phối tử qua liên kết cho-nhận tạo nên hình học không gian phức chất bền vững theo GDPT 2018.",
    "relatedEquation": "Ag⁺ + 2NH₃ → [Ag(NH₃)₂]⁺ Linear Complex",
    "iupacName": "Diamminesilver(I) Tollens Xyz Complex",
    "archetype": "TRANSITION_FORGE",
    "structuredEffects": [
      {
        "effectId": "B13_EFF_40",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "HEAL_LP",
            "params": {
              "amount": 500
            }
          }
        ],
        "description": "Tách 1 nguyên liệu phối trí: Hồi phục 500 LP."
      }
    ]
  },
  {
    "id": "card_b13_041_xyz_hexamminecobalt_iii__octahedral_xyz_41",
    "name": "Phức Bát Diện Hexammine Coban — Rank 7 (Cấu Trúc Phối Trí 6)",
    "name_en": "Hexamminecobalt(III) Octahedral Xyz — Rank 7 Overlayer 6",
    "cardType": "XYZ_MONSTER",
    "rarity": "COMMON",
    "attribute": "ELECTRO",
    "manaCost": 6,
    "xyzRank": 7,
    "xyzMaterialsRequired": {
      "count": 2,
      "level": 7
    },
    "atk": 3560,
    "def": 3190,
    "chemicalFormula": "[Co(NH3)6]3+",
    "effectCode": "XYZ_B13_HEXAMMINECOBALT_III__OCTAHEDRAL_XYZ_OVERLAY_41",
    "effectText": "2 quái thú Level 7. Quái thú Xyz sở hữu Rank 7 (không có Level). Bỏ 1 Nguyên liệu Xyz: Phá hủy 1 quái thú đối phương có ATK thấp hơn hoặc hồi phục 500 LP.",
    "scientificLore": "Thuyết phối trí Werner (Nobel 1913): Nguyên tử trung tâm liên kết với các phối tử qua liên kết cho-nhận tạo nên hình học không gian phức chất bền vững theo GDPT 2018.",
    "relatedEquation": "Co³⁺ + 6NH₃ → [Co(NH₃)₆]³⁺ (d²sp³ Octahedral)",
    "iupacName": "Hexamminecobalt(III) Octahedral Xyz Complex",
    "archetype": "WERNER_COORDINATION",
    "structuredEffects": [
      {
        "effectId": "B13_EFF_41",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "HEAL_LP",
            "params": {
              "amount": 500
            }
          }
        ],
        "description": "Tách 1 nguyên liệu phối trí: Hồi phục 500 LP."
      }
    ]
  },
  {
    "id": "card_b13_042_xyz_cisplatin_square_planar_xyz_42",
    "name": "Phức Vuông Phẳng Cisplatin — Rank 8 (Cấu Trúc Phối Trí 6)",
    "name_en": "Cisplatin Square Planar Xyz — Rank 8 Overlayer 6",
    "cardType": "XYZ_MONSTER",
    "rarity": "COMMON",
    "attribute": "NOBLE_VOID",
    "manaCost": 7,
    "xyzRank": 8,
    "xyzMaterialsRequired": {
      "count": 2,
      "level": 8
    },
    "atk": 3790,
    "def": 3410,
    "chemicalFormula": "Pt(NH3)2Cl2",
    "effectCode": "XYZ_B13_CISPLATIN_SQUARE_PLANAR_XYZ_OVERLAY_42",
    "effectText": "2 quái thú Level 8. Quái thú Xyz sở hữu Rank 8 (không có Level). Bỏ 1 Nguyên liệu Xyz: Phá hủy 1 quái thú đối phương có ATK thấp hơn hoặc hồi phục 500 LP.",
    "scientificLore": "Thuyết phối trí Werner (Nobel 1913): Nguyên tử trung tâm liên kết với các phối tử qua liên kết cho-nhận tạo nên hình học không gian phức chất bền vững theo GDPT 2018.",
    "relatedEquation": "Pt²⁺ + 2NH₃ + 2Cl⁻ → cis-[Pt(NH₃)₂Cl₂] (dsp² Square Planar)",
    "iupacName": "Cisplatin Square Planar Xyz Complex",
    "archetype": "TRANSITION_FORGE",
    "structuredEffects": [
      {
        "effectId": "B13_EFF_42",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "HEAL_LP",
            "params": {
              "amount": 500
            }
          }
        ],
        "description": "Tách 1 nguyên liệu phối trí: Hồi phục 500 LP."
      }
    ]
  },
  {
    "id": "card_b13_043_xyz_ferrocene_sandwich_complex_xyz_43",
    "name": "Bánh Mì Kẹp Ferrocene — Rank 3 (Cấu Trúc Phối Trí 6)",
    "name_en": "Ferrocene Sandwich Complex Xyz — Rank 3 Overlayer 6",
    "cardType": "XYZ_MONSTER",
    "rarity": "COMMON",
    "attribute": "TERRA",
    "manaCost": 3,
    "xyzRank": 3,
    "xyzMaterialsRequired": {
      "count": 2,
      "level": 3
    },
    "atk": 2940,
    "def": 2610,
    "chemicalFormula": "Fe(C5H5)2",
    "effectCode": "XYZ_B13_FERROCENE_SANDWICH_COMPLEX_XYZ_OVERLAY_43",
    "effectText": "2 quái thú Level 3. Quái thú Xyz sở hữu Rank 3 (không có Level). Bỏ 1 Nguyên liệu Xyz: Phá hủy 1 quái thú đối phương có ATK thấp hơn hoặc hồi phục 500 LP.",
    "scientificLore": "Thuyết phối trí Werner (Nobel 1913): Nguyên tử trung tâm liên kết với các phối tử qua liên kết cho-nhận tạo nên hình học không gian phức chất bền vững theo GDPT 2018.",
    "relatedEquation": "Fe²⁺ + 2C₅H₅⁻ → Fe(η⁵-C₅H₅)₂ Sandwich",
    "iupacName": "Ferrocene Sandwich Complex Xyz Complex",
    "archetype": "WERNER_COORDINATION",
    "structuredEffects": [
      {
        "effectId": "B13_EFF_43",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "HEAL_LP",
            "params": {
              "amount": 500
            }
          }
        ],
        "description": "Tách 1 nguyên liệu phối trí: Hồi phục 500 LP."
      }
    ]
  },
  {
    "id": "card_b13_044_xyz_prussian_blue_lattice_xyz_44",
    "name": "Phức Xanh Phổ Prussian Blue — Rank 4 (Cấu Trúc Phối Trí 6)",
    "name_en": "Prussian Blue Lattice Xyz — Rank 4 Overlayer 6",
    "cardType": "XYZ_MONSTER",
    "rarity": "RARE",
    "attribute": "AQUA",
    "manaCost": 3,
    "xyzRank": 4,
    "xyzMaterialsRequired": {
      "count": 2,
      "level": 4
    },
    "atk": 3170,
    "def": 2830,
    "chemicalFormula": "Fe4[Fe(CN)6]3",
    "effectCode": "XYZ_B13_PRUSSIAN_BLUE_LATTICE_XYZ_OVERLAY_44",
    "effectText": "2 quái thú Level 4. Quái thú Xyz sở hữu Rank 4 (không có Level). Bỏ 1 Nguyên liệu Xyz: Phá hủy 1 quái thú đối phương có ATK thấp hơn hoặc hồi phục 500 LP.",
    "scientificLore": "Thuyết phối trí Werner (Nobel 1913): Nguyên tử trung tâm liên kết với các phối tử qua liên kết cho-nhận tạo nên hình học không gian phức chất bền vững theo GDPT 2018.",
    "relatedEquation": "4Fe³⁺ + 3[Fe(CN)₆]⁴⁻ → Fe₄[Fe(CN)₆]₃ Precipitate",
    "iupacName": "Prussian Blue Lattice Xyz Complex",
    "archetype": "TRANSITION_FORGE",
    "structuredEffects": [
      {
        "effectId": "B13_EFF_44",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "HEAL_LP",
            "params": {
              "amount": 500
            }
          }
        ],
        "description": "Tách 1 nguyên liệu phối trí: Hồi phục 500 LP."
      }
    ]
  },
  {
    "id": "card_b13_045_xyz_tetraamminezinc_ii__xyz_45",
    "name": "Phức Tứ Diện Kẽm Amoniac — Rank 5 (Cấu Trúc Phối Trí 6)",
    "name_en": "Tetraamminezinc(II) Xyz — Rank 5 Overlayer 6",
    "cardType": "XYZ_MONSTER",
    "rarity": "RARE",
    "attribute": "TERRA",
    "manaCost": 4,
    "xyzRank": 5,
    "xyzMaterialsRequired": {
      "count": 2,
      "level": 5
    },
    "atk": 3200,
    "def": 3050,
    "chemicalFormula": "[Zn(NH3)4]2+",
    "effectCode": "XYZ_B13_TETRAAMMINEZINC_II__XYZ_OVERLAY_45",
    "effectText": "2 quái thú Level 5. Quái thú Xyz sở hữu Rank 5 (không có Level). Bỏ 1 Nguyên liệu Xyz: Phá hủy 1 quái thú đối phương có ATK thấp hơn hoặc hồi phục 500 LP.",
    "scientificLore": "Thuyết phối trí Werner (Nobel 1913): Nguyên tử trung tâm liên kết với các phối tử qua liên kết cho-nhận tạo nên hình học không gian phức chất bền vững theo GDPT 2018.",
    "relatedEquation": "Zn²⁺ + 4NH₃ → [Zn(NH₃)₄]²⁺ (sp³ Tetrahedral)",
    "iupacName": "Tetraamminezinc(II) Xyz Complex",
    "archetype": "WERNER_COORDINATION",
    "structuredEffects": [
      {
        "effectId": "B13_EFF_45",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "HEAL_LP",
            "params": {
              "amount": 500
            }
          }
        ],
        "description": "Tách 1 nguyên liệu phối trí: Hồi phục 500 LP."
      }
    ]
  },
  {
    "id": "card_b13_046_xyz_tetraamminecopper_ii__azure_xyz_46",
    "name": "Phức Đồng Tetrammine Lam Đậm — Rank 6 (Cấu Trúc Phối Trí 6)",
    "name_en": "Tetraamminecopper(II) Azure Xyz — Rank 6 Overlayer 6",
    "cardType": "XYZ_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "AQUA",
    "manaCost": 5,
    "xyzRank": 6,
    "xyzMaterialsRequired": {
      "count": 2,
      "level": 6
    },
    "atk": 3430,
    "def": 3020,
    "chemicalFormula": "[Cu(NH3)4]2+",
    "effectCode": "XYZ_B13_TETRAAMMINECOPPER_II__AZURE_XYZ_OVERLAY_46",
    "effectText": "2 quái thú Level 6. Quái thú Xyz sở hữu Rank 6 (không có Level). Bỏ 1 Nguyên liệu Xyz: Phá hủy 1 quái thú đối phương có ATK thấp hơn hoặc hồi phục 500 LP.",
    "scientificLore": "Thuyết phối trí Werner (Nobel 1913): Nguyên tử trung tâm liên kết với các phối tử qua liên kết cho-nhận tạo nên hình học không gian phức chất bền vững theo GDPT 2018.",
    "relatedEquation": "Cu(OH)₂ + 4NH₃ → [Cu(NH₃)₄]²⁺ + 2OH⁻",
    "iupacName": "Tetraamminecopper(II) Azure Xyz Complex",
    "archetype": "TRANSITION_FORGE",
    "structuredEffects": [
      {
        "effectId": "B13_EFF_46",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "HEAL_LP",
            "params": {
              "amount": 500
            }
          }
        ],
        "description": "Tách 1 nguyên liệu phối trí: Hồi phục 500 LP."
      }
    ]
  },
  {
    "id": "card_b13_047_xyz_iron_iii__edta_chelate_xyz_47",
    "name": "Phức Chelate Sắt EDTA — Rank 7 (Cấu Trúc Phối Trí 6)",
    "name_en": "Iron(III) EDTA Chelate Xyz — Rank 7 Overlayer 6",
    "cardType": "XYZ_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "TERRA",
    "manaCost": 6,
    "xyzRank": 7,
    "xyzMaterialsRequired": {
      "count": 2,
      "level": 7
    },
    "atk": 3660,
    "def": 3240,
    "chemicalFormula": "[Fe(EDTA)]-",
    "effectCode": "XYZ_B13_IRON_III__EDTA_CHELATE_XYZ_OVERLAY_47",
    "effectText": "2 quái thú Level 7. Quái thú Xyz sở hữu Rank 7 (không có Level). Bỏ 1 Nguyên liệu Xyz: Phá hủy 1 quái thú đối phương có ATK thấp hơn hoặc hồi phục 500 LP.",
    "scientificLore": "Thuyết phối trí Werner (Nobel 1913): Nguyên tử trung tâm liên kết với các phối tử qua liên kết cho-nhận tạo nên hình học không gian phức chất bền vững theo GDPT 2018.",
    "relatedEquation": "Fe³⁺ + EDTA⁴⁻ → [Fe(EDTA)]⁻ Hexadentate Chelate",
    "iupacName": "Iron(III) EDTA Chelate Xyz Complex",
    "archetype": "WERNER_COORDINATION",
    "structuredEffects": [
      {
        "effectId": "B13_EFF_47",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "HEAL_LP",
            "params": {
              "amount": 500
            }
          }
        ],
        "description": "Tách 1 nguyên liệu phối trí: Hồi phục 500 LP."
      }
    ]
  },
  {
    "id": "card_b13_048_xyz_diamminesilver_i__tollens_xyz_48",
    "name": "Phức Bạc Amoniac Thuốc Thử Tollens — Rank 8 (Cấu Trúc Phối Trí 6)",
    "name_en": "Diamminesilver(I) Tollens Xyz — Rank 8 Overlayer 6",
    "cardType": "XYZ_MONSTER",
    "rarity": "ULTRA_RARE",
    "attribute": "AQUA",
    "manaCost": 7,
    "xyzRank": 8,
    "xyzMaterialsRequired": {
      "count": 2,
      "level": 8
    },
    "atk": 3890,
    "def": 3460,
    "chemicalFormula": "[Ag(NH3)2]+",
    "effectCode": "XYZ_B13_DIAMMINESILVER_I__TOLLENS_XYZ_OVERLAY_48",
    "effectText": "2 quái thú Level 8. Quái thú Xyz sở hữu Rank 8 (không có Level). Bỏ 1 Nguyên liệu Xyz: Phá hủy 1 quái thú đối phương có ATK thấp hơn hoặc hồi phục 500 LP.",
    "scientificLore": "Thuyết phối trí Werner (Nobel 1913): Nguyên tử trung tâm liên kết với các phối tử qua liên kết cho-nhận tạo nên hình học không gian phức chất bền vững theo GDPT 2018.",
    "relatedEquation": "Ag⁺ + 2NH₃ → [Ag(NH₃)₂]⁺ Linear Complex",
    "iupacName": "Diamminesilver(I) Tollens Xyz Complex",
    "archetype": "TRANSITION_FORGE",
    "structuredEffects": [
      {
        "effectId": "B13_EFF_48",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "HEAL_LP",
            "params": {
              "amount": 500
            }
          }
        ],
        "description": "Tách 1 nguyên liệu phối trí: Hồi phục 500 LP."
      }
    ]
  },
  {
    "id": "card_b13_049_xyz_hexamminecobalt_iii__octahedral_xyz_49",
    "name": "Phức Bát Diện Hexammine Coban — Rank 3 (Cấu Trúc Phối Trí 7)",
    "name_en": "Hexamminecobalt(III) Octahedral Xyz — Rank 3 Overlayer 7",
    "cardType": "XYZ_MONSTER",
    "rarity": "SECRET_RARE",
    "attribute": "ELECTRO",
    "manaCost": 3,
    "xyzRank": 3,
    "xyzMaterialsRequired": {
      "count": 2,
      "level": 3
    },
    "atk": 2840,
    "def": 2660,
    "chemicalFormula": "[Co(NH3)6]3+",
    "effectCode": "XYZ_B13_HEXAMMINECOBALT_III__OCTAHEDRAL_XYZ_OVERLAY_49",
    "effectText": "2 quái thú Level 3. Quái thú Xyz sở hữu Rank 3 (không có Level). Bỏ 1 Nguyên liệu Xyz: Phá hủy 1 quái thú đối phương có ATK thấp hơn hoặc hồi phục 500 LP.",
    "scientificLore": "Thuyết phối trí Werner (Nobel 1913): Nguyên tử trung tâm liên kết với các phối tử qua liên kết cho-nhận tạo nên hình học không gian phức chất bền vững theo GDPT 2018.",
    "relatedEquation": "Co³⁺ + 6NH₃ → [Co(NH₃)₆]³⁺ (d²sp³ Octahedral)",
    "iupacName": "Hexamminecobalt(III) Octahedral Xyz Complex",
    "archetype": "WERNER_COORDINATION",
    "structuredEffects": [
      {
        "effectId": "B13_EFF_49",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "HEAL_LP",
            "params": {
              "amount": 500
            }
          }
        ],
        "description": "Tách 1 nguyên liệu phối trí: Hồi phục 500 LP."
      }
    ]
  },
  {
    "id": "card_b13_050_xyz_cisplatin_square_planar_xyz_50",
    "name": "Phức Vuông Phẳng Cisplatin — Rank 4 (Cấu Trúc Phối Trí 7)",
    "name_en": "Cisplatin Square Planar Xyz — Rank 4 Overlayer 7",
    "cardType": "XYZ_MONSTER",
    "rarity": "COMMON",
    "attribute": "NOBLE_VOID",
    "manaCost": 3,
    "xyzRank": 4,
    "xyzMaterialsRequired": {
      "count": 2,
      "level": 4
    },
    "atk": 3070,
    "def": 2880,
    "chemicalFormula": "Pt(NH3)2Cl2",
    "effectCode": "XYZ_B13_CISPLATIN_SQUARE_PLANAR_XYZ_OVERLAY_50",
    "effectText": "2 quái thú Level 4. Quái thú Xyz sở hữu Rank 4 (không có Level). Bỏ 1 Nguyên liệu Xyz: Phá hủy 1 quái thú đối phương có ATK thấp hơn hoặc hồi phục 500 LP.",
    "scientificLore": "Thuyết phối trí Werner (Nobel 1913): Nguyên tử trung tâm liên kết với các phối tử qua liên kết cho-nhận tạo nên hình học không gian phức chất bền vững theo GDPT 2018.",
    "relatedEquation": "Pt²⁺ + 2NH₃ + 2Cl⁻ → cis-[Pt(NH₃)₂Cl₂] (dsp² Square Planar)",
    "iupacName": "Cisplatin Square Planar Xyz Complex",
    "archetype": "TRANSITION_FORGE",
    "structuredEffects": [
      {
        "effectId": "B13_EFF_50",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "HEAL_LP",
            "params": {
              "amount": 500
            }
          }
        ],
        "description": "Tách 1 nguyên liệu phối trí: Hồi phục 500 LP."
      }
    ]
  },
  {
    "id": "card_b13_051_xyz_ferrocene_sandwich_complex_xyz_51",
    "name": "Bánh Mì Kẹp Ferrocene — Rank 5 (Cấu Trúc Phối Trí 7)",
    "name_en": "Ferrocene Sandwich Complex Xyz — Rank 5 Overlayer 7",
    "cardType": "XYZ_MONSTER",
    "rarity": "COMMON",
    "attribute": "TERRA",
    "manaCost": 4,
    "xyzRank": 5,
    "xyzMaterialsRequired": {
      "count": 2,
      "level": 5
    },
    "atk": 3300,
    "def": 2850,
    "chemicalFormula": "Fe(C5H5)2",
    "effectCode": "XYZ_B13_FERROCENE_SANDWICH_COMPLEX_XYZ_OVERLAY_51",
    "effectText": "2 quái thú Level 5. Quái thú Xyz sở hữu Rank 5 (không có Level). Bỏ 1 Nguyên liệu Xyz: Phá hủy 1 quái thú đối phương có ATK thấp hơn hoặc hồi phục 500 LP.",
    "scientificLore": "Thuyết phối trí Werner (Nobel 1913): Nguyên tử trung tâm liên kết với các phối tử qua liên kết cho-nhận tạo nên hình học không gian phức chất bền vững theo GDPT 2018.",
    "relatedEquation": "Fe²⁺ + 2C₅H₅⁻ → Fe(η⁵-C₅H₅)₂ Sandwich",
    "iupacName": "Ferrocene Sandwich Complex Xyz Complex",
    "archetype": "WERNER_COORDINATION",
    "structuredEffects": [
      {
        "effectId": "B13_EFF_51",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "HEAL_LP",
            "params": {
              "amount": 500
            }
          }
        ],
        "description": "Tách 1 nguyên liệu phối trí: Hồi phục 500 LP."
      }
    ]
  },
  {
    "id": "card_b13_052_xyz_prussian_blue_lattice_xyz_52",
    "name": "Phức Xanh Phổ Prussian Blue — Rank 6 (Cấu Trúc Phối Trí 7)",
    "name_en": "Prussian Blue Lattice Xyz — Rank 6 Overlayer 7",
    "cardType": "XYZ_MONSTER",
    "rarity": "COMMON",
    "attribute": "AQUA",
    "manaCost": 5,
    "xyzRank": 6,
    "xyzMaterialsRequired": {
      "count": 2,
      "level": 6
    },
    "atk": 3530,
    "def": 3070,
    "chemicalFormula": "Fe4[Fe(CN)6]3",
    "effectCode": "XYZ_B13_PRUSSIAN_BLUE_LATTICE_XYZ_OVERLAY_52",
    "effectText": "2 quái thú Level 6. Quái thú Xyz sở hữu Rank 6 (không có Level). Bỏ 1 Nguyên liệu Xyz: Phá hủy 1 quái thú đối phương có ATK thấp hơn hoặc hồi phục 500 LP.",
    "scientificLore": "Thuyết phối trí Werner (Nobel 1913): Nguyên tử trung tâm liên kết với các phối tử qua liên kết cho-nhận tạo nên hình học không gian phức chất bền vững theo GDPT 2018.",
    "relatedEquation": "4Fe³⁺ + 3[Fe(CN)₆]⁴⁻ → Fe₄[Fe(CN)₆]₃ Precipitate",
    "iupacName": "Prussian Blue Lattice Xyz Complex",
    "archetype": "TRANSITION_FORGE",
    "structuredEffects": [
      {
        "effectId": "B13_EFF_52",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "HEAL_LP",
            "params": {
              "amount": 500
            }
          }
        ],
        "description": "Tách 1 nguyên liệu phối trí: Hồi phục 500 LP."
      }
    ]
  },
  {
    "id": "card_b13_053_xyz_tetraamminezinc_ii__xyz_53",
    "name": "Phức Tứ Diện Kẽm Amoniac — Rank 7 (Cấu Trúc Phối Trí 7)",
    "name_en": "Tetraamminezinc(II) Xyz — Rank 7 Overlayer 7",
    "cardType": "XYZ_MONSTER",
    "rarity": "RARE",
    "attribute": "TERRA",
    "manaCost": 6,
    "xyzRank": 7,
    "xyzMaterialsRequired": {
      "count": 2,
      "level": 7
    },
    "atk": 3560,
    "def": 3290,
    "chemicalFormula": "[Zn(NH3)4]2+",
    "effectCode": "XYZ_B13_TETRAAMMINEZINC_II__XYZ_OVERLAY_53",
    "effectText": "2 quái thú Level 7. Quái thú Xyz sở hữu Rank 7 (không có Level). Bỏ 1 Nguyên liệu Xyz: Phá hủy 1 quái thú đối phương có ATK thấp hơn hoặc hồi phục 500 LP.",
    "scientificLore": "Thuyết phối trí Werner (Nobel 1913): Nguyên tử trung tâm liên kết với các phối tử qua liên kết cho-nhận tạo nên hình học không gian phức chất bền vững theo GDPT 2018.",
    "relatedEquation": "Zn²⁺ + 4NH₃ → [Zn(NH₃)₄]²⁺ (sp³ Tetrahedral)",
    "iupacName": "Tetraamminezinc(II) Xyz Complex",
    "archetype": "WERNER_COORDINATION",
    "structuredEffects": [
      {
        "effectId": "B13_EFF_53",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "HEAL_LP",
            "params": {
              "amount": 500
            }
          }
        ],
        "description": "Tách 1 nguyên liệu phối trí: Hồi phục 500 LP."
      }
    ]
  },
  {
    "id": "card_b13_054_xyz_tetraamminecopper_ii__azure_xyz_54",
    "name": "Phức Đồng Tetrammine Lam Đậm — Rank 8 (Cấu Trúc Phối Trí 7)",
    "name_en": "Tetraamminecopper(II) Azure Xyz — Rank 8 Overlayer 7",
    "cardType": "XYZ_MONSTER",
    "rarity": "RARE",
    "attribute": "AQUA",
    "manaCost": 7,
    "xyzRank": 8,
    "xyzMaterialsRequired": {
      "count": 2,
      "level": 8
    },
    "atk": 3790,
    "def": 3510,
    "chemicalFormula": "[Cu(NH3)4]2+",
    "effectCode": "XYZ_B13_TETRAAMMINECOPPER_II__AZURE_XYZ_OVERLAY_54",
    "effectText": "2 quái thú Level 8. Quái thú Xyz sở hữu Rank 8 (không có Level). Bỏ 1 Nguyên liệu Xyz: Phá hủy 1 quái thú đối phương có ATK thấp hơn hoặc hồi phục 500 LP.",
    "scientificLore": "Thuyết phối trí Werner (Nobel 1913): Nguyên tử trung tâm liên kết với các phối tử qua liên kết cho-nhận tạo nên hình học không gian phức chất bền vững theo GDPT 2018.",
    "relatedEquation": "Cu(OH)₂ + 4NH₃ → [Cu(NH₃)₄]²⁺ + 2OH⁻",
    "iupacName": "Tetraamminecopper(II) Azure Xyz Complex",
    "archetype": "TRANSITION_FORGE",
    "structuredEffects": [
      {
        "effectId": "B13_EFF_54",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "HEAL_LP",
            "params": {
              "amount": 500
            }
          }
        ],
        "description": "Tách 1 nguyên liệu phối trí: Hồi phục 500 LP."
      }
    ]
  },
  {
    "id": "card_b13_055_xyz_iron_iii__edta_chelate_xyz_55",
    "name": "Phức Chelate Sắt EDTA — Rank 3 (Cấu Trúc Phối Trí 7)",
    "name_en": "Iron(III) EDTA Chelate Xyz — Rank 3 Overlayer 7",
    "cardType": "XYZ_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "TERRA",
    "manaCost": 3,
    "xyzRank": 3,
    "xyzMaterialsRequired": {
      "count": 2,
      "level": 3
    },
    "atk": 2940,
    "def": 2710,
    "chemicalFormula": "[Fe(EDTA)]-",
    "effectCode": "XYZ_B13_IRON_III__EDTA_CHELATE_XYZ_OVERLAY_55",
    "effectText": "2 quái thú Level 3. Quái thú Xyz sở hữu Rank 3 (không có Level). Bỏ 1 Nguyên liệu Xyz: Phá hủy 1 quái thú đối phương có ATK thấp hơn hoặc hồi phục 500 LP.",
    "scientificLore": "Thuyết phối trí Werner (Nobel 1913): Nguyên tử trung tâm liên kết với các phối tử qua liên kết cho-nhận tạo nên hình học không gian phức chất bền vững theo GDPT 2018.",
    "relatedEquation": "Fe³⁺ + EDTA⁴⁻ → [Fe(EDTA)]⁻ Hexadentate Chelate",
    "iupacName": "Iron(III) EDTA Chelate Xyz Complex",
    "archetype": "WERNER_COORDINATION",
    "structuredEffects": [
      {
        "effectId": "B13_EFF_55",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "HEAL_LP",
            "params": {
              "amount": 500
            }
          }
        ],
        "description": "Tách 1 nguyên liệu phối trí: Hồi phục 500 LP."
      }
    ]
  },
  {
    "id": "card_b13_056_xyz_diamminesilver_i__tollens_xyz_56",
    "name": "Phức Bạc Amoniac Thuốc Thử Tollens — Rank 4 (Cấu Trúc Phối Trí 7)",
    "name_en": "Diamminesilver(I) Tollens Xyz — Rank 4 Overlayer 7",
    "cardType": "XYZ_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "AQUA",
    "manaCost": 3,
    "xyzRank": 4,
    "xyzMaterialsRequired": {
      "count": 2,
      "level": 4
    },
    "atk": 3170,
    "def": 2680,
    "chemicalFormula": "[Ag(NH3)2]+",
    "effectCode": "XYZ_B13_DIAMMINESILVER_I__TOLLENS_XYZ_OVERLAY_56",
    "effectText": "2 quái thú Level 4. Quái thú Xyz sở hữu Rank 4 (không có Level). Bỏ 1 Nguyên liệu Xyz: Phá hủy 1 quái thú đối phương có ATK thấp hơn hoặc hồi phục 500 LP.",
    "scientificLore": "Thuyết phối trí Werner (Nobel 1913): Nguyên tử trung tâm liên kết với các phối tử qua liên kết cho-nhận tạo nên hình học không gian phức chất bền vững theo GDPT 2018.",
    "relatedEquation": "Ag⁺ + 2NH₃ → [Ag(NH₃)₂]⁺ Linear Complex",
    "iupacName": "Diamminesilver(I) Tollens Xyz Complex",
    "archetype": "TRANSITION_FORGE",
    "structuredEffects": [
      {
        "effectId": "B13_EFF_56",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "HEAL_LP",
            "params": {
              "amount": 500
            }
          }
        ],
        "description": "Tách 1 nguyên liệu phối trí: Hồi phục 500 LP."
      }
    ]
  },
  {
    "id": "card_b13_057_xyz_hexamminecobalt_iii__octahedral_xyz_57",
    "name": "Phức Bát Diện Hexammine Coban — Rank 5 (Cấu Trúc Phối Trí 8)",
    "name_en": "Hexamminecobalt(III) Octahedral Xyz — Rank 5 Overlayer 8",
    "cardType": "XYZ_MONSTER",
    "rarity": "ULTRA_RARE",
    "attribute": "ELECTRO",
    "manaCost": 4,
    "xyzRank": 5,
    "xyzMaterialsRequired": {
      "count": 2,
      "level": 5
    },
    "atk": 3200,
    "def": 2900,
    "chemicalFormula": "[Co(NH3)6]3+",
    "effectCode": "XYZ_B13_HEXAMMINECOBALT_III__OCTAHEDRAL_XYZ_OVERLAY_57",
    "effectText": "2 quái thú Level 5. Quái thú Xyz sở hữu Rank 5 (không có Level). Bỏ 1 Nguyên liệu Xyz: Phá hủy 1 quái thú đối phương có ATK thấp hơn hoặc hồi phục 500 LP.",
    "scientificLore": "Thuyết phối trí Werner (Nobel 1913): Nguyên tử trung tâm liên kết với các phối tử qua liên kết cho-nhận tạo nên hình học không gian phức chất bền vững theo GDPT 2018.",
    "relatedEquation": "Co³⁺ + 6NH₃ → [Co(NH₃)₆]³⁺ (d²sp³ Octahedral)",
    "iupacName": "Hexamminecobalt(III) Octahedral Xyz Complex",
    "archetype": "WERNER_COORDINATION",
    "structuredEffects": [
      {
        "effectId": "B13_EFF_57",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "HEAL_LP",
            "params": {
              "amount": 500
            }
          }
        ],
        "description": "Tách 1 nguyên liệu phối trí: Hồi phục 500 LP."
      }
    ]
  },
  {
    "id": "card_b13_058_xyz_cisplatin_square_planar_xyz_58",
    "name": "Phức Vuông Phẳng Cisplatin — Rank 6 (Cấu Trúc Phối Trí 8)",
    "name_en": "Cisplatin Square Planar Xyz — Rank 6 Overlayer 8",
    "cardType": "XYZ_MONSTER",
    "rarity": "SECRET_RARE",
    "attribute": "NOBLE_VOID",
    "manaCost": 5,
    "xyzRank": 6,
    "xyzMaterialsRequired": {
      "count": 2,
      "level": 6
    },
    "atk": 3430,
    "def": 3120,
    "chemicalFormula": "Pt(NH3)2Cl2",
    "effectCode": "XYZ_B13_CISPLATIN_SQUARE_PLANAR_XYZ_OVERLAY_58",
    "effectText": "2 quái thú Level 6. Quái thú Xyz sở hữu Rank 6 (không có Level). Bỏ 1 Nguyên liệu Xyz: Phá hủy 1 quái thú đối phương có ATK thấp hơn hoặc hồi phục 500 LP.",
    "scientificLore": "Thuyết phối trí Werner (Nobel 1913): Nguyên tử trung tâm liên kết với các phối tử qua liên kết cho-nhận tạo nên hình học không gian phức chất bền vững theo GDPT 2018.",
    "relatedEquation": "Pt²⁺ + 2NH₃ + 2Cl⁻ → cis-[Pt(NH₃)₂Cl₂] (dsp² Square Planar)",
    "iupacName": "Cisplatin Square Planar Xyz Complex",
    "archetype": "TRANSITION_FORGE",
    "structuredEffects": [
      {
        "effectId": "B13_EFF_58",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "HEAL_LP",
            "params": {
              "amount": 500
            }
          }
        ],
        "description": "Tách 1 nguyên liệu phối trí: Hồi phục 500 LP."
      }
    ]
  },
  {
    "id": "card_b13_059_xyz_ferrocene_sandwich_complex_xyz_59",
    "name": "Bánh Mì Kẹp Ferrocene — Rank 7 (Cấu Trúc Phối Trí 8)",
    "name_en": "Ferrocene Sandwich Complex Xyz — Rank 7 Overlayer 8",
    "cardType": "XYZ_MONSTER",
    "rarity": "COMMON",
    "attribute": "TERRA",
    "manaCost": 6,
    "xyzRank": 7,
    "xyzMaterialsRequired": {
      "count": 2,
      "level": 7
    },
    "atk": 3660,
    "def": 3340,
    "chemicalFormula": "Fe(C5H5)2",
    "effectCode": "XYZ_B13_FERROCENE_SANDWICH_COMPLEX_XYZ_OVERLAY_59",
    "effectText": "2 quái thú Level 7. Quái thú Xyz sở hữu Rank 7 (không có Level). Bỏ 1 Nguyên liệu Xyz: Phá hủy 1 quái thú đối phương có ATK thấp hơn hoặc hồi phục 500 LP.",
    "scientificLore": "Thuyết phối trí Werner (Nobel 1913): Nguyên tử trung tâm liên kết với các phối tử qua liên kết cho-nhận tạo nên hình học không gian phức chất bền vững theo GDPT 2018.",
    "relatedEquation": "Fe²⁺ + 2C₅H₅⁻ → Fe(η⁵-C₅H₅)₂ Sandwich",
    "iupacName": "Ferrocene Sandwich Complex Xyz Complex",
    "archetype": "WERNER_COORDINATION",
    "structuredEffects": [
      {
        "effectId": "B13_EFF_59",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "HEAL_LP",
            "params": {
              "amount": 500
            }
          }
        ],
        "description": "Tách 1 nguyên liệu phối trí: Hồi phục 500 LP."
      }
    ]
  },
  {
    "id": "card_b13_060_xyz_prussian_blue_lattice_xyz_60",
    "name": "Phức Xanh Phổ Prussian Blue — Rank 8 (Cấu Trúc Phối Trí 8)",
    "name_en": "Prussian Blue Lattice Xyz — Rank 8 Overlayer 8",
    "cardType": "XYZ_MONSTER",
    "rarity": "COMMON",
    "attribute": "AQUA",
    "manaCost": 7,
    "xyzRank": 8,
    "xyzMaterialsRequired": {
      "count": 2,
      "level": 8
    },
    "atk": 3890,
    "def": 3560,
    "chemicalFormula": "Fe4[Fe(CN)6]3",
    "effectCode": "XYZ_B13_PRUSSIAN_BLUE_LATTICE_XYZ_OVERLAY_60",
    "effectText": "2 quái thú Level 8. Quái thú Xyz sở hữu Rank 8 (không có Level). Bỏ 1 Nguyên liệu Xyz: Phá hủy 1 quái thú đối phương có ATK thấp hơn hoặc hồi phục 500 LP.",
    "scientificLore": "Thuyết phối trí Werner (Nobel 1913): Nguyên tử trung tâm liên kết với các phối tử qua liên kết cho-nhận tạo nên hình học không gian phức chất bền vững theo GDPT 2018.",
    "relatedEquation": "4Fe³⁺ + 3[Fe(CN)₆]⁴⁻ → Fe₄[Fe(CN)₆]₃ Precipitate",
    "iupacName": "Prussian Blue Lattice Xyz Complex",
    "archetype": "TRANSITION_FORGE",
    "structuredEffects": [
      {
        "effectId": "B13_EFF_60",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "HEAL_LP",
            "params": {
              "amount": 500
            }
          }
        ],
        "description": "Tách 1 nguyên liệu phối trí: Hồi phục 500 LP."
      }
    ]
  },
  {
    "id": "card_b13_061_xyz_tetraamminezinc_ii__xyz_61",
    "name": "Phức Tứ Diện Kẽm Amoniac — Rank 3 (Cấu Trúc Phối Trí 8)",
    "name_en": "Tetraamminezinc(II) Xyz — Rank 3 Overlayer 8",
    "cardType": "XYZ_MONSTER",
    "rarity": "COMMON",
    "attribute": "TERRA",
    "manaCost": 3,
    "xyzRank": 3,
    "xyzMaterialsRequired": {
      "count": 2,
      "level": 3
    },
    "atk": 2840,
    "def": 2510,
    "chemicalFormula": "[Zn(NH3)4]2+",
    "effectCode": "XYZ_B13_TETRAAMMINEZINC_II__XYZ_OVERLAY_61",
    "effectText": "2 quái thú Level 3. Quái thú Xyz sở hữu Rank 3 (không có Level). Bỏ 1 Nguyên liệu Xyz: Phá hủy 1 quái thú đối phương có ATK thấp hơn hoặc hồi phục 500 LP.",
    "scientificLore": "Thuyết phối trí Werner (Nobel 1913): Nguyên tử trung tâm liên kết với các phối tử qua liên kết cho-nhận tạo nên hình học không gian phức chất bền vững theo GDPT 2018.",
    "relatedEquation": "Zn²⁺ + 4NH₃ → [Zn(NH₃)₄]²⁺ (sp³ Tetrahedral)",
    "iupacName": "Tetraamminezinc(II) Xyz Complex",
    "archetype": "WERNER_COORDINATION",
    "structuredEffects": [
      {
        "effectId": "B13_EFF_61",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "HEAL_LP",
            "params": {
              "amount": 500
            }
          }
        ],
        "description": "Tách 1 nguyên liệu phối trí: Hồi phục 500 LP."
      }
    ]
  },
  {
    "id": "card_b13_062_xyz_tetraamminecopper_ii__azure_xyz_62",
    "name": "Phức Đồng Tetrammine Lam Đậm — Rank 4 (Cấu Trúc Phối Trí 8)",
    "name_en": "Tetraamminecopper(II) Azure Xyz — Rank 4 Overlayer 8",
    "cardType": "XYZ_MONSTER",
    "rarity": "RARE",
    "attribute": "AQUA",
    "manaCost": 3,
    "xyzRank": 4,
    "xyzMaterialsRequired": {
      "count": 2,
      "level": 4
    },
    "atk": 3070,
    "def": 2730,
    "chemicalFormula": "[Cu(NH3)4]2+",
    "effectCode": "XYZ_B13_TETRAAMMINECOPPER_II__AZURE_XYZ_OVERLAY_62",
    "effectText": "2 quái thú Level 4. Quái thú Xyz sở hữu Rank 4 (không có Level). Bỏ 1 Nguyên liệu Xyz: Phá hủy 1 quái thú đối phương có ATK thấp hơn hoặc hồi phục 500 LP.",
    "scientificLore": "Thuyết phối trí Werner (Nobel 1913): Nguyên tử trung tâm liên kết với các phối tử qua liên kết cho-nhận tạo nên hình học không gian phức chất bền vững theo GDPT 2018.",
    "relatedEquation": "Cu(OH)₂ + 4NH₃ → [Cu(NH₃)₄]²⁺ + 2OH⁻",
    "iupacName": "Tetraamminecopper(II) Azure Xyz Complex",
    "archetype": "TRANSITION_FORGE",
    "structuredEffects": [
      {
        "effectId": "B13_EFF_62",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "HEAL_LP",
            "params": {
              "amount": 500
            }
          }
        ],
        "description": "Tách 1 nguyên liệu phối trí: Hồi phục 500 LP."
      }
    ]
  },
  {
    "id": "card_b13_063_xyz_iron_iii__edta_chelate_xyz_63",
    "name": "Phức Chelate Sắt EDTA — Rank 5 (Cấu Trúc Phối Trí 8)",
    "name_en": "Iron(III) EDTA Chelate Xyz — Rank 5 Overlayer 8",
    "cardType": "XYZ_MONSTER",
    "rarity": "RARE",
    "attribute": "TERRA",
    "manaCost": 4,
    "xyzRank": 5,
    "xyzMaterialsRequired": {
      "count": 2,
      "level": 5
    },
    "atk": 3300,
    "def": 2950,
    "chemicalFormula": "[Fe(EDTA)]-",
    "effectCode": "XYZ_B13_IRON_III__EDTA_CHELATE_XYZ_OVERLAY_63",
    "effectText": "2 quái thú Level 5. Quái thú Xyz sở hữu Rank 5 (không có Level). Bỏ 1 Nguyên liệu Xyz: Phá hủy 1 quái thú đối phương có ATK thấp hơn hoặc hồi phục 500 LP.",
    "scientificLore": "Thuyết phối trí Werner (Nobel 1913): Nguyên tử trung tâm liên kết với các phối tử qua liên kết cho-nhận tạo nên hình học không gian phức chất bền vững theo GDPT 2018.",
    "relatedEquation": "Fe³⁺ + EDTA⁴⁻ → [Fe(EDTA)]⁻ Hexadentate Chelate",
    "iupacName": "Iron(III) EDTA Chelate Xyz Complex",
    "archetype": "WERNER_COORDINATION",
    "structuredEffects": [
      {
        "effectId": "B13_EFF_63",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "HEAL_LP",
            "params": {
              "amount": 500
            }
          }
        ],
        "description": "Tách 1 nguyên liệu phối trí: Hồi phục 500 LP."
      }
    ]
  },
  {
    "id": "card_b13_064_xyz_diamminesilver_i__tollens_xyz_64",
    "name": "Phức Bạc Amoniac Thuốc Thử Tollens — Rank 6 (Cấu Trúc Phối Trí 8)",
    "name_en": "Diamminesilver(I) Tollens Xyz — Rank 6 Overlayer 8",
    "cardType": "XYZ_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "AQUA",
    "manaCost": 5,
    "xyzRank": 6,
    "xyzMaterialsRequired": {
      "count": 2,
      "level": 6
    },
    "atk": 3530,
    "def": 3170,
    "chemicalFormula": "[Ag(NH3)2]+",
    "effectCode": "XYZ_B13_DIAMMINESILVER_I__TOLLENS_XYZ_OVERLAY_64",
    "effectText": "2 quái thú Level 6. Quái thú Xyz sở hữu Rank 6 (không có Level). Bỏ 1 Nguyên liệu Xyz: Phá hủy 1 quái thú đối phương có ATK thấp hơn hoặc hồi phục 500 LP.",
    "scientificLore": "Thuyết phối trí Werner (Nobel 1913): Nguyên tử trung tâm liên kết với các phối tử qua liên kết cho-nhận tạo nên hình học không gian phức chất bền vững theo GDPT 2018.",
    "relatedEquation": "Ag⁺ + 2NH₃ → [Ag(NH₃)₂]⁺ Linear Complex",
    "iupacName": "Diamminesilver(I) Tollens Xyz Complex",
    "archetype": "TRANSITION_FORGE",
    "structuredEffects": [
      {
        "effectId": "B13_EFF_64",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "HEAL_LP",
            "params": {
              "amount": 500
            }
          }
        ],
        "description": "Tách 1 nguyên liệu phối trí: Hồi phục 500 LP."
      }
    ]
  },
  {
    "id": "card_b13_065_xyz_hexamminecobalt_iii__octahedral_xyz_65",
    "name": "Phức Bát Diện Hexammine Coban — Rank 7 (Cấu Trúc Phối Trí 9)",
    "name_en": "Hexamminecobalt(III) Octahedral Xyz — Rank 7 Overlayer 9",
    "cardType": "XYZ_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "ELECTRO",
    "manaCost": 6,
    "xyzRank": 7,
    "xyzMaterialsRequired": {
      "count": 2,
      "level": 7
    },
    "atk": 3560,
    "def": 3390,
    "chemicalFormula": "[Co(NH3)6]3+",
    "effectCode": "XYZ_B13_HEXAMMINECOBALT_III__OCTAHEDRAL_XYZ_OVERLAY_65",
    "effectText": "2 quái thú Level 7. Quái thú Xyz sở hữu Rank 7 (không có Level). Bỏ 1 Nguyên liệu Xyz: Phá hủy 1 quái thú đối phương có ATK thấp hơn hoặc hồi phục 500 LP.",
    "scientificLore": "Thuyết phối trí Werner (Nobel 1913): Nguyên tử trung tâm liên kết với các phối tử qua liên kết cho-nhận tạo nên hình học không gian phức chất bền vững theo GDPT 2018.",
    "relatedEquation": "Co³⁺ + 6NH₃ → [Co(NH₃)₆]³⁺ (d²sp³ Octahedral)",
    "iupacName": "Hexamminecobalt(III) Octahedral Xyz Complex",
    "archetype": "WERNER_COORDINATION",
    "structuredEffects": [
      {
        "effectId": "B13_EFF_65",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "HEAL_LP",
            "params": {
              "amount": 500
            }
          }
        ],
        "description": "Tách 1 nguyên liệu phối trí: Hồi phục 500 LP."
      }
    ]
  },
  {
    "id": "card_b13_066_xyz_cisplatin_square_planar_xyz_66",
    "name": "Phức Vuông Phẳng Cisplatin — Rank 8 (Cấu Trúc Phối Trí 9)",
    "name_en": "Cisplatin Square Planar Xyz — Rank 8 Overlayer 9",
    "cardType": "XYZ_MONSTER",
    "rarity": "ULTRA_RARE",
    "attribute": "NOBLE_VOID",
    "manaCost": 7,
    "xyzRank": 8,
    "xyzMaterialsRequired": {
      "count": 2,
      "level": 8
    },
    "atk": 3790,
    "def": 3360,
    "chemicalFormula": "Pt(NH3)2Cl2",
    "effectCode": "XYZ_B13_CISPLATIN_SQUARE_PLANAR_XYZ_OVERLAY_66",
    "effectText": "2 quái thú Level 8. Quái thú Xyz sở hữu Rank 8 (không có Level). Bỏ 1 Nguyên liệu Xyz: Phá hủy 1 quái thú đối phương có ATK thấp hơn hoặc hồi phục 500 LP.",
    "scientificLore": "Thuyết phối trí Werner (Nobel 1913): Nguyên tử trung tâm liên kết với các phối tử qua liên kết cho-nhận tạo nên hình học không gian phức chất bền vững theo GDPT 2018.",
    "relatedEquation": "Pt²⁺ + 2NH₃ + 2Cl⁻ → cis-[Pt(NH₃)₂Cl₂] (dsp² Square Planar)",
    "iupacName": "Cisplatin Square Planar Xyz Complex",
    "archetype": "TRANSITION_FORGE",
    "structuredEffects": [
      {
        "effectId": "B13_EFF_66",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "HEAL_LP",
            "params": {
              "amount": 500
            }
          }
        ],
        "description": "Tách 1 nguyên liệu phối trí: Hồi phục 500 LP."
      }
    ]
  },
  {
    "id": "card_b13_067_xyz_ferrocene_sandwich_complex_xyz_67",
    "name": "Bánh Mì Kẹp Ferrocene — Rank 3 (Cấu Trúc Phối Trí 9)",
    "name_en": "Ferrocene Sandwich Complex Xyz — Rank 3 Overlayer 9",
    "cardType": "XYZ_MONSTER",
    "rarity": "SECRET_RARE",
    "attribute": "TERRA",
    "manaCost": 3,
    "xyzRank": 3,
    "xyzMaterialsRequired": {
      "count": 2,
      "level": 3
    },
    "atk": 2940,
    "def": 2560,
    "chemicalFormula": "Fe(C5H5)2",
    "effectCode": "XYZ_B13_FERROCENE_SANDWICH_COMPLEX_XYZ_OVERLAY_67",
    "effectText": "2 quái thú Level 3. Quái thú Xyz sở hữu Rank 3 (không có Level). Bỏ 1 Nguyên liệu Xyz: Phá hủy 1 quái thú đối phương có ATK thấp hơn hoặc hồi phục 500 LP.",
    "scientificLore": "Thuyết phối trí Werner (Nobel 1913): Nguyên tử trung tâm liên kết với các phối tử qua liên kết cho-nhận tạo nên hình học không gian phức chất bền vững theo GDPT 2018.",
    "relatedEquation": "Fe²⁺ + 2C₅H₅⁻ → Fe(η⁵-C₅H₅)₂ Sandwich",
    "iupacName": "Ferrocene Sandwich Complex Xyz Complex",
    "archetype": "WERNER_COORDINATION",
    "structuredEffects": [
      {
        "effectId": "B13_EFF_67",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "HEAL_LP",
            "params": {
              "amount": 500
            }
          }
        ],
        "description": "Tách 1 nguyên liệu phối trí: Hồi phục 500 LP."
      }
    ]
  },
  {
    "id": "card_b13_068_xyz_prussian_blue_lattice_xyz_68",
    "name": "Phức Xanh Phổ Prussian Blue — Rank 4 (Cấu Trúc Phối Trí 9)",
    "name_en": "Prussian Blue Lattice Xyz — Rank 4 Overlayer 9",
    "cardType": "XYZ_MONSTER",
    "rarity": "COMMON",
    "attribute": "AQUA",
    "manaCost": 3,
    "xyzRank": 4,
    "xyzMaterialsRequired": {
      "count": 2,
      "level": 4
    },
    "atk": 3170,
    "def": 2780,
    "chemicalFormula": "Fe4[Fe(CN)6]3",
    "effectCode": "XYZ_B13_PRUSSIAN_BLUE_LATTICE_XYZ_OVERLAY_68",
    "effectText": "2 quái thú Level 4. Quái thú Xyz sở hữu Rank 4 (không có Level). Bỏ 1 Nguyên liệu Xyz: Phá hủy 1 quái thú đối phương có ATK thấp hơn hoặc hồi phục 500 LP.",
    "scientificLore": "Thuyết phối trí Werner (Nobel 1913): Nguyên tử trung tâm liên kết với các phối tử qua liên kết cho-nhận tạo nên hình học không gian phức chất bền vững theo GDPT 2018.",
    "relatedEquation": "4Fe³⁺ + 3[Fe(CN)₆]⁴⁻ → Fe₄[Fe(CN)₆]₃ Precipitate",
    "iupacName": "Prussian Blue Lattice Xyz Complex",
    "archetype": "TRANSITION_FORGE",
    "structuredEffects": [
      {
        "effectId": "B13_EFF_68",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "HEAL_LP",
            "params": {
              "amount": 500
            }
          }
        ],
        "description": "Tách 1 nguyên liệu phối trí: Hồi phục 500 LP."
      }
    ]
  },
  {
    "id": "card_b13_069_xyz_tetraamminezinc_ii__xyz_69",
    "name": "Phức Tứ Diện Kẽm Amoniac — Rank 5 (Cấu Trúc Phối Trí 9)",
    "name_en": "Tetraamminezinc(II) Xyz — Rank 5 Overlayer 9",
    "cardType": "XYZ_MONSTER",
    "rarity": "COMMON",
    "attribute": "TERRA",
    "manaCost": 4,
    "xyzRank": 5,
    "xyzMaterialsRequired": {
      "count": 2,
      "level": 5
    },
    "atk": 3200,
    "def": 3000,
    "chemicalFormula": "[Zn(NH3)4]2+",
    "effectCode": "XYZ_B13_TETRAAMMINEZINC_II__XYZ_OVERLAY_69",
    "effectText": "2 quái thú Level 5. Quái thú Xyz sở hữu Rank 5 (không có Level). Bỏ 1 Nguyên liệu Xyz: Phá hủy 1 quái thú đối phương có ATK thấp hơn hoặc hồi phục 500 LP.",
    "scientificLore": "Thuyết phối trí Werner (Nobel 1913): Nguyên tử trung tâm liên kết với các phối tử qua liên kết cho-nhận tạo nên hình học không gian phức chất bền vững theo GDPT 2018.",
    "relatedEquation": "Zn²⁺ + 4NH₃ → [Zn(NH₃)₄]²⁺ (sp³ Tetrahedral)",
    "iupacName": "Tetraamminezinc(II) Xyz Complex",
    "archetype": "WERNER_COORDINATION",
    "structuredEffects": [
      {
        "effectId": "B13_EFF_69",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "HEAL_LP",
            "params": {
              "amount": 500
            }
          }
        ],
        "description": "Tách 1 nguyên liệu phối trí: Hồi phục 500 LP."
      }
    ]
  },
  {
    "id": "card_b13_070_xyz_tetraamminecopper_ii__azure_xyz_70",
    "name": "Phức Đồng Tetrammine Lam Đậm — Rank 6 (Cấu Trúc Phối Trí 9)",
    "name_en": "Tetraamminecopper(II) Azure Xyz — Rank 6 Overlayer 9",
    "cardType": "XYZ_MONSTER",
    "rarity": "COMMON",
    "attribute": "AQUA",
    "manaCost": 5,
    "xyzRank": 6,
    "xyzMaterialsRequired": {
      "count": 2,
      "level": 6
    },
    "atk": 3430,
    "def": 3220,
    "chemicalFormula": "[Cu(NH3)4]2+",
    "effectCode": "XYZ_B13_TETRAAMMINECOPPER_II__AZURE_XYZ_OVERLAY_70",
    "effectText": "2 quái thú Level 6. Quái thú Xyz sở hữu Rank 6 (không có Level). Bỏ 1 Nguyên liệu Xyz: Phá hủy 1 quái thú đối phương có ATK thấp hơn hoặc hồi phục 500 LP.",
    "scientificLore": "Thuyết phối trí Werner (Nobel 1913): Nguyên tử trung tâm liên kết với các phối tử qua liên kết cho-nhận tạo nên hình học không gian phức chất bền vững theo GDPT 2018.",
    "relatedEquation": "Cu(OH)₂ + 4NH₃ → [Cu(NH₃)₄]²⁺ + 2OH⁻",
    "iupacName": "Tetraamminecopper(II) Azure Xyz Complex",
    "archetype": "TRANSITION_FORGE",
    "structuredEffects": [
      {
        "effectId": "B13_EFF_70",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "HEAL_LP",
            "params": {
              "amount": 500
            }
          }
        ],
        "description": "Tách 1 nguyên liệu phối trí: Hồi phục 500 LP."
      }
    ]
  },
  {
    "id": "card_b13_071_xyz_iron_iii__edta_chelate_xyz_71",
    "name": "Phức Chelate Sắt EDTA — Rank 7 (Cấu Trúc Phối Trí 9)",
    "name_en": "Iron(III) EDTA Chelate Xyz — Rank 7 Overlayer 9",
    "cardType": "XYZ_MONSTER",
    "rarity": "RARE",
    "attribute": "TERRA",
    "manaCost": 6,
    "xyzRank": 7,
    "xyzMaterialsRequired": {
      "count": 2,
      "level": 7
    },
    "atk": 3660,
    "def": 3190,
    "chemicalFormula": "[Fe(EDTA)]-",
    "effectCode": "XYZ_B13_IRON_III__EDTA_CHELATE_XYZ_OVERLAY_71",
    "effectText": "2 quái thú Level 7. Quái thú Xyz sở hữu Rank 7 (không có Level). Bỏ 1 Nguyên liệu Xyz: Phá hủy 1 quái thú đối phương có ATK thấp hơn hoặc hồi phục 500 LP.",
    "scientificLore": "Thuyết phối trí Werner (Nobel 1913): Nguyên tử trung tâm liên kết với các phối tử qua liên kết cho-nhận tạo nên hình học không gian phức chất bền vững theo GDPT 2018.",
    "relatedEquation": "Fe³⁺ + EDTA⁴⁻ → [Fe(EDTA)]⁻ Hexadentate Chelate",
    "iupacName": "Iron(III) EDTA Chelate Xyz Complex",
    "archetype": "WERNER_COORDINATION",
    "structuredEffects": [
      {
        "effectId": "B13_EFF_71",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "HEAL_LP",
            "params": {
              "amount": 500
            }
          }
        ],
        "description": "Tách 1 nguyên liệu phối trí: Hồi phục 500 LP."
      }
    ]
  },
  {
    "id": "card_b13_072_xyz_diamminesilver_i__tollens_xyz_72",
    "name": "Phức Bạc Amoniac Thuốc Thử Tollens — Rank 8 (Cấu Trúc Phối Trí 9)",
    "name_en": "Diamminesilver(I) Tollens Xyz — Rank 8 Overlayer 9",
    "cardType": "XYZ_MONSTER",
    "rarity": "RARE",
    "attribute": "AQUA",
    "manaCost": 7,
    "xyzRank": 8,
    "xyzMaterialsRequired": {
      "count": 2,
      "level": 8
    },
    "atk": 3890,
    "def": 3410,
    "chemicalFormula": "[Ag(NH3)2]+",
    "effectCode": "XYZ_B13_DIAMMINESILVER_I__TOLLENS_XYZ_OVERLAY_72",
    "effectText": "2 quái thú Level 8. Quái thú Xyz sở hữu Rank 8 (không có Level). Bỏ 1 Nguyên liệu Xyz: Phá hủy 1 quái thú đối phương có ATK thấp hơn hoặc hồi phục 500 LP.",
    "scientificLore": "Thuyết phối trí Werner (Nobel 1913): Nguyên tử trung tâm liên kết với các phối tử qua liên kết cho-nhận tạo nên hình học không gian phức chất bền vững theo GDPT 2018.",
    "relatedEquation": "Ag⁺ + 2NH₃ → [Ag(NH₃)₂]⁺ Linear Complex",
    "iupacName": "Diamminesilver(I) Tollens Xyz Complex",
    "archetype": "TRANSITION_FORGE",
    "structuredEffects": [
      {
        "effectId": "B13_EFF_72",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "HEAL_LP",
            "params": {
              "amount": 500
            }
          }
        ],
        "description": "Tách 1 nguyên liệu phối trí: Hồi phục 500 LP."
      }
    ]
  },
  {
    "id": "card_b13_073_xyz_hexamminecobalt_iii__octahedral_xyz_73",
    "name": "Phức Bát Diện Hexammine Coban — Rank 3 (Cấu Trúc Phối Trí 10)",
    "name_en": "Hexamminecobalt(III) Octahedral Xyz — Rank 3 Overlayer 10",
    "cardType": "XYZ_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "ELECTRO",
    "manaCost": 3,
    "xyzRank": 3,
    "xyzMaterialsRequired": {
      "count": 2,
      "level": 3
    },
    "atk": 2840,
    "def": 2610,
    "chemicalFormula": "[Co(NH3)6]3+",
    "effectCode": "XYZ_B13_HEXAMMINECOBALT_III__OCTAHEDRAL_XYZ_OVERLAY_73",
    "effectText": "2 quái thú Level 3. Quái thú Xyz sở hữu Rank 3 (không có Level). Bỏ 1 Nguyên liệu Xyz: Phá hủy 1 quái thú đối phương có ATK thấp hơn hoặc hồi phục 500 LP.",
    "scientificLore": "Thuyết phối trí Werner (Nobel 1913): Nguyên tử trung tâm liên kết với các phối tử qua liên kết cho-nhận tạo nên hình học không gian phức chất bền vững theo GDPT 2018.",
    "relatedEquation": "Co³⁺ + 6NH₃ → [Co(NH₃)₆]³⁺ (d²sp³ Octahedral)",
    "iupacName": "Hexamminecobalt(III) Octahedral Xyz Complex",
    "archetype": "WERNER_COORDINATION",
    "structuredEffects": [
      {
        "effectId": "B13_EFF_73",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "HEAL_LP",
            "params": {
              "amount": 500
            }
          }
        ],
        "description": "Tách 1 nguyên liệu phối trí: Hồi phục 500 LP."
      }
    ]
  },
  {
    "id": "card_b13_074_xyz_cisplatin_square_planar_xyz_74",
    "name": "Phức Vuông Phẳng Cisplatin — Rank 4 (Cấu Trúc Phối Trí 10)",
    "name_en": "Cisplatin Square Planar Xyz — Rank 4 Overlayer 10",
    "cardType": "XYZ_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "NOBLE_VOID",
    "manaCost": 3,
    "xyzRank": 4,
    "xyzMaterialsRequired": {
      "count": 2,
      "level": 4
    },
    "atk": 3070,
    "def": 2830,
    "chemicalFormula": "Pt(NH3)2Cl2",
    "effectCode": "XYZ_B13_CISPLATIN_SQUARE_PLANAR_XYZ_OVERLAY_74",
    "effectText": "2 quái thú Level 4. Quái thú Xyz sở hữu Rank 4 (không có Level). Bỏ 1 Nguyên liệu Xyz: Phá hủy 1 quái thú đối phương có ATK thấp hơn hoặc hồi phục 500 LP.",
    "scientificLore": "Thuyết phối trí Werner (Nobel 1913): Nguyên tử trung tâm liên kết với các phối tử qua liên kết cho-nhận tạo nên hình học không gian phức chất bền vững theo GDPT 2018.",
    "relatedEquation": "Pt²⁺ + 2NH₃ + 2Cl⁻ → cis-[Pt(NH₃)₂Cl₂] (dsp² Square Planar)",
    "iupacName": "Cisplatin Square Planar Xyz Complex",
    "archetype": "TRANSITION_FORGE",
    "structuredEffects": [
      {
        "effectId": "B13_EFF_74",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "HEAL_LP",
            "params": {
              "amount": 500
            }
          }
        ],
        "description": "Tách 1 nguyên liệu phối trí: Hồi phục 500 LP."
      }
    ]
  },
  {
    "id": "card_b13_075_xyz_ferrocene_sandwich_complex_xyz_75",
    "name": "Bánh Mì Kẹp Ferrocene — Rank 5 (Cấu Trúc Phối Trí 10)",
    "name_en": "Ferrocene Sandwich Complex Xyz — Rank 5 Overlayer 10",
    "cardType": "XYZ_MONSTER",
    "rarity": "ULTRA_RARE",
    "attribute": "TERRA",
    "manaCost": 4,
    "xyzRank": 5,
    "xyzMaterialsRequired": {
      "count": 2,
      "level": 5
    },
    "atk": 3300,
    "def": 3050,
    "chemicalFormula": "Fe(C5H5)2",
    "effectCode": "XYZ_B13_FERROCENE_SANDWICH_COMPLEX_XYZ_OVERLAY_75",
    "effectText": "2 quái thú Level 5. Quái thú Xyz sở hữu Rank 5 (không có Level). Bỏ 1 Nguyên liệu Xyz: Phá hủy 1 quái thú đối phương có ATK thấp hơn hoặc hồi phục 500 LP.",
    "scientificLore": "Thuyết phối trí Werner (Nobel 1913): Nguyên tử trung tâm liên kết với các phối tử qua liên kết cho-nhận tạo nên hình học không gian phức chất bền vững theo GDPT 2018.",
    "relatedEquation": "Fe²⁺ + 2C₅H₅⁻ → Fe(η⁵-C₅H₅)₂ Sandwich",
    "iupacName": "Ferrocene Sandwich Complex Xyz Complex",
    "archetype": "WERNER_COORDINATION",
    "structuredEffects": [
      {
        "effectId": "B13_EFF_75",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "HEAL_LP",
            "params": {
              "amount": 500
            }
          }
        ],
        "description": "Tách 1 nguyên liệu phối trí: Hồi phục 500 LP."
      }
    ]
  }
];
