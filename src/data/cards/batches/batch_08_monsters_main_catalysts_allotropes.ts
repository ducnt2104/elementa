// src/data/cards/batches/batch_08_monsters_main_catalysts_allotropes.ts
// Batch 08: Catalyst & Allotrope Monsters (100 cards)
// Automatically generated and validated for ELEMENTA Tactical TCG

import { PlayableCardDef } from '../../../domain/cardGameTypes';

export const BATCH_08_CARDS: PlayableCardDef[] = [
  {
    "id": "card_b08_001_ziegler_natta_catalyst_1",
    "name": "Xúc Tác Ziegler-Natta — Kiến Trúc Sư Cấu Trúc (Dạng 1)",
    "name_en": "Ziegler-Natta Catalyst — Kiến Trúc Sư Cấu Trúc Lattice 1",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "ELECTRO",
    "manaCost": 2,
    "level": 3,
    "atk": 1760,
    "def": 1830,
    "chemicalFormula": "TiCl4·Al(C2H5)3",
    "effectCode": "ELEM_B08_ZIEGLER_NATTA_CATALYST_ALLO_1",
    "effectText": "Hạ thấp năng lượng hoạt hóa: Giảm 1 Mana triệu hồi cho quái thú tiếp theo từ tay trong lượt này.",
    "scientificLore": "Xúc Tác Ziegler-Natta (TiCl4·Al(C2H5)3) đại diện cho đỉnh cao cấu trúc hóa học vật liệu tiên tiến và xúc tác chọn lọc trong chương trình GDPT 2018.",
    "relatedEquation": "TiCl₄ + Al(C₂H₅)₃ → Active Polymerization Center",
    "iupacName": "Ziegler-Natta Catalyst",
    "archetype": "ORGANOMETALLIC_CATALYSIS",
    "structuredEffects": [
      {
        "effectId": "B08_EFF_1",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "RECOVER_RESOURCE",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Tăng tốc độ phản ứng hồi 1 Mana xúc tác."
      }
    ]
  },
  {
    "id": "card_b08_002_grignard_reagent_2",
    "name": "Thuốc Thử Grignard — Kiến Trúc Sư Cấu Trúc (Dạng 2)",
    "name_en": "Grignard Reagent — Kiến Trúc Sư Cấu Trúc Lattice 2",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "PYRO",
    "manaCost": 3,
    "level": 4,
    "atk": 2030,
    "def": 2100,
    "chemicalFormula": "R-Mg-X",
    "effectCode": "ELEM_B08_GRIGNARD_REAGENT_ALLO_2",
    "effectText": "Hạ thấp năng lượng hoạt hóa: Giảm 1 Mana triệu hồi cho quái thú tiếp theo từ tay trong lượt này.",
    "scientificLore": "Thuốc Thử Grignard (R-Mg-X) đại diện cho đỉnh cao cấu trúc hóa học vật liệu tiên tiến và xúc tác chọn lọc trong chương trình GDPT 2018.",
    "relatedEquation": "R-X + Mg → R-Mg-X",
    "iupacName": "Grignard Reagent",
    "archetype": "ORGANOMETALLIC_CATALYSIS",
    "structuredEffects": [
      {
        "effectId": "B08_EFF_2",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "RECOVER_RESOURCE",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Tăng tốc độ phản ứng hồi 1 Mana xúc tác."
      }
    ]
  },
  {
    "id": "card_b08_003_wilkinson_catalyst_3",
    "name": "Xúc Tác Wilkinson — Kiến Trúc Sư Cấu Trúc (Dạng 3)",
    "name_en": "Wilkinson Catalyst — Kiến Trúc Sư Cấu Trúc Lattice 3",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "AQUA",
    "manaCost": 4,
    "level": 5,
    "atk": 2300,
    "def": 2370,
    "chemicalFormula": "RhCl(PPh3)3",
    "effectCode": "ELEM_B08_WILKINSON_CATALYST_ALLO_3",
    "effectText": "Hạ thấp năng lượng hoạt hóa: Giảm 1 Mana triệu hồi cho quái thú tiếp theo từ tay trong lượt này.",
    "scientificLore": "Xúc Tác Wilkinson (RhCl(PPh3)3) đại diện cho đỉnh cao cấu trúc hóa học vật liệu tiên tiến và xúc tác chọn lọc trong chương trình GDPT 2018.",
    "relatedEquation": "RhCl(PPh₃)₃ + H₂ → Active Hydrogenation Specie",
    "iupacName": "Wilkinson Catalyst",
    "archetype": "ORGANOMETALLIC_CATALYSIS",
    "structuredEffects": [
      {
        "effectId": "B08_EFF_3",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "RECOVER_RESOURCE",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Tăng tốc độ phản ứng hồi 1 Mana xúc tác."
      }
    ]
  },
  {
    "id": "card_b08_004_graphite_lattice_4",
    "name": "Than Chì Graphite — Kiến Trúc Sư Cấu Trúc (Dạng 4)",
    "name_en": "Graphite Lattice — Kiến Trúc Sư Cấu Trúc Lattice 4",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "TERRA",
    "manaCost": 5,
    "level": 6,
    "atk": 2570,
    "def": 2640,
    "chemicalFormula": "C",
    "effectCode": "ELEM_B08_GRAPHITE_LATTICE_ALLO_4",
    "effectText": "Đa dạng thù hình: Có thể thay đổi thuộc tính của quái thú này sang bất kỳ thuộc tính nào 1 lần mỗi lượt.",
    "scientificLore": "Than Chì Graphite (C) đại diện cho đỉnh cao cấu trúc hóa học vật liệu tiên tiến và xúc tác chọn lọc trong chương trình GDPT 2018.",
    "relatedEquation": "C(graphite) (sp² Hexagonal Layers)",
    "iupacName": "Graphite Lattice",
    "archetype": "ALLOTROPE_PHANTOM",
    "structuredEffects": [
      {
        "effectId": "B08_EFF_4",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "RECOVER_RESOURCE",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Tăng tốc độ phản ứng hồi 1 Mana xúc tác."
      }
    ]
  },
  {
    "id": "card_b08_005_diamond_octahedral_5",
    "name": "Kim Cương Bát Diện — Kiến Trúc Sư Cấu Trúc (Dạng 5)",
    "name_en": "Diamond Octahedral — Kiến Trúc Sư Cấu Trúc Lattice 5",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "NOBLE_VOID",
    "manaCost": 5,
    "level": 7,
    "atk": 2840,
    "def": 2670,
    "chemicalFormula": "C",
    "effectCode": "ELEM_B08_DIAMOND_OCTAHEDRAL_ALLO_5",
    "effectText": "Đa dạng thù hình: Có thể thay đổi thuộc tính của quái thú này sang bất kỳ thuộc tính nào 1 lần mỗi lượt.",
    "scientificLore": "Kim Cương Bát Diện (C) đại diện cho đỉnh cao cấu trúc hóa học vật liệu tiên tiến và xúc tác chọn lọc trong chương trình GDPT 2018.",
    "relatedEquation": "C(diamond) (sp³ Tetrahedral Giant Lattice)",
    "iupacName": "Diamond Octahedral",
    "archetype": "ALLOTROPE_PHANTOM",
    "structuredEffects": [
      {
        "effectId": "B08_EFF_5",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "RECOVER_RESOURCE",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Tăng tốc độ phản ứng hồi 1 Mana xúc tác."
      }
    ]
  },
  {
    "id": "card_b08_006_graphene_monolayer_6",
    "name": "Graphene Đơn Lớp — Kiến Trúc Sư Cấu Trúc (Dạng 6)",
    "name_en": "Graphene Monolayer — Kiến Trúc Sư Cấu Trúc Lattice 6",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "ELECTRO",
    "manaCost": 6,
    "level": 8,
    "atk": 2860,
    "def": 2940,
    "chemicalFormula": "C",
    "effectCode": "ELEM_B08_GRAPHENE_MONOLAYER_ALLO_6",
    "effectText": "Đa dạng thù hình: Có thể thay đổi thuộc tính của quái thú này sang bất kỳ thuộc tính nào 1 lần mỗi lượt.",
    "scientificLore": "Graphene Đơn Lớp (C) đại diện cho đỉnh cao cấu trúc hóa học vật liệu tiên tiến và xúc tác chọn lọc trong chương trình GDPT 2018.",
    "relatedEquation": "Graphene (2D Hexagonal Carbon Network)",
    "iupacName": "Graphene Monolayer",
    "archetype": "ALLOTROPE_PHANTOM",
    "structuredEffects": [
      {
        "effectId": "B08_EFF_6",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "RECOVER_RESOURCE",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Tăng tốc độ phản ứng hồi 1 Mana xúc tác."
      }
    ]
  },
  {
    "id": "card_b08_007_buckminsterfullerene_c60_7",
    "name": "Fullerene C60 — Kiến Trúc Sư Cấu Trúc (Dạng 7)",
    "name_en": "Buckminsterfullerene C60 — Kiến Trúc Sư Cấu Trúc Lattice 7",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "ULTRA_RARE",
    "attribute": "NOBLE_VOID",
    "manaCost": 2,
    "level": 3,
    "atk": 1810,
    "def": 1950,
    "chemicalFormula": "C60",
    "effectCode": "ELEM_B08_BUCKMINSTERFULLERENE_C60_ALLO_7",
    "effectText": "Đa dạng thù hình: Có thể thay đổi thuộc tính của quái thú này sang bất kỳ thuộc tính nào 1 lần mỗi lượt.",
    "scientificLore": "Fullerene C60 (C60) đại diện cho đỉnh cao cấu trúc hóa học vật liệu tiên tiến và xúc tác chọn lọc trong chương trình GDPT 2018.",
    "relatedEquation": "C₆₀ (Truncated Icosahedron Buckyball)",
    "iupacName": "Buckminsterfullerene C60",
    "archetype": "ALLOTROPE_PHANTOM",
    "structuredEffects": [
      {
        "effectId": "B08_EFF_7",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "RECOVER_RESOURCE",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Tăng tốc độ phản ứng hồi 1 Mana xúc tác."
      }
    ]
  },
  {
    "id": "card_b08_008_carbon_nanotube_8",
    "name": "Ống Nano Carbon — Kiến Trúc Sư Cấu Trúc (Dạng 8)",
    "name_en": "Carbon Nanotube — Kiến Trúc Sư Cấu Trúc Lattice 8",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SECRET_RARE",
    "attribute": "ELECTRO",
    "manaCost": 3,
    "level": 4,
    "atk": 2080,
    "def": 2220,
    "chemicalFormula": "CNT",
    "effectCode": "ELEM_B08_CARBON_NANOTUBE_ALLO_8",
    "effectText": "Đa dạng thù hình: Có thể thay đổi thuộc tính của quái thú này sang bất kỳ thuộc tính nào 1 lần mỗi lượt.",
    "scientificLore": "Ống Nano Carbon (CNT) đại diện cho đỉnh cao cấu trúc hóa học vật liệu tiên tiến và xúc tác chọn lọc trong chương trình GDPT 2018.",
    "relatedEquation": "Rolled Graphene Cylindrical Shell",
    "iupacName": "Carbon Nanotube",
    "archetype": "ALLOTROPE_PHANTOM",
    "structuredEffects": [
      {
        "effectId": "B08_EFF_8",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "RECOVER_RESOURCE",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Tăng tốc độ phản ứng hồi 1 Mana xúc tác."
      }
    ]
  },
  {
    "id": "card_b08_009_white_phosphorus_9",
    "name": "Photpho Trắng — Kiến Trúc Sư Cấu Trúc (Dạng 9)",
    "name_en": "White Phosphorus — Kiến Trúc Sư Cấu Trúc Lattice 9",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "PYRO",
    "manaCost": 4,
    "level": 5,
    "atk": 2350,
    "def": 2250,
    "chemicalFormula": "P4",
    "effectCode": "ELEM_B08_WHITE_PHOSPHORUS_ALLO_9",
    "effectText": "Đa dạng thù hình: Có thể thay đổi thuộc tính của quái thú này sang bất kỳ thuộc tính nào 1 lần mỗi lượt.",
    "scientificLore": "Photpho Trắng (P4) đại diện cho đỉnh cao cấu trúc hóa học vật liệu tiên tiến và xúc tác chọn lọc trong chương trình GDPT 2018.",
    "relatedEquation": "P₄ + 5O₂ → P₄O₁₀ (Self-Ignition)",
    "iupacName": "White Phosphorus",
    "archetype": "ALLOTROPE_PHANTOM",
    "structuredEffects": [
      {
        "effectId": "B08_EFF_9",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "RECOVER_RESOURCE",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Tăng tốc độ phản ứng hồi 1 Mana xúc tác."
      }
    ]
  },
  {
    "id": "card_b08_010_red_phosphorus_10",
    "name": "Photpho Đỏ — Kiến Trúc Sư Cấu Trúc (Dạng 10)",
    "name_en": "Red Phosphorus — Kiến Trúc Sư Cấu Trúc Lattice 10",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "PYRO",
    "manaCost": 5,
    "level": 6,
    "atk": 2620,
    "def": 2520,
    "chemicalFormula": "Pn",
    "effectCode": "ELEM_B08_RED_PHOSPHORUS_ALLO_10",
    "effectText": "Đa dạng thù hình: Có thể thay đổi thuộc tính của quái thú này sang bất kỳ thuộc tính nào 1 lần mỗi lượt.",
    "scientificLore": "Photpho Đỏ (Pn) đại diện cho đỉnh cao cấu trúc hóa học vật liệu tiên tiến và xúc tác chọn lọc trong chương trình GDPT 2018.",
    "relatedEquation": "P₄(white) --heat--> Pn(red)",
    "iupacName": "Red Phosphorus",
    "archetype": "ALLOTROPE_PHANTOM",
    "structuredEffects": [
      {
        "effectId": "B08_EFF_10",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "RECOVER_RESOURCE",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Tăng tốc độ phản ứng hồi 1 Mana xúc tác."
      }
    ]
  },
  {
    "id": "card_b08_011_ziegler_natta_catalyst_11",
    "name": "Xúc Tác Ziegler-Natta — Chúa Tể Thù Hình (Dạng 11)",
    "name_en": "Ziegler-Natta Catalyst — Chúa Tể Thù Hình Lattice 11",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "ELECTRO",
    "manaCost": 5,
    "level": 7,
    "atk": 2640,
    "def": 2790,
    "chemicalFormula": "TiCl4·Al(C2H5)3",
    "effectCode": "ELEM_B08_ZIEGLER_NATTA_CATALYST_ALLO_11",
    "effectText": "Hạ thấp năng lượng hoạt hóa: Giảm 1 Mana triệu hồi cho quái thú tiếp theo từ tay trong lượt này.",
    "scientificLore": "Xúc Tác Ziegler-Natta (TiCl4·Al(C2H5)3) đại diện cho đỉnh cao cấu trúc hóa học vật liệu tiên tiến và xúc tác chọn lọc trong chương trình GDPT 2018.",
    "relatedEquation": "TiCl₄ + Al(C₂H₅)₃ → Active Polymerization Center",
    "iupacName": "Ziegler-Natta Catalyst",
    "archetype": "ORGANOMETALLIC_CATALYSIS",
    "structuredEffects": [
      {
        "effectId": "B08_EFF_11",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "RECOVER_RESOURCE",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Tăng tốc độ phản ứng hồi 1 Mana xúc tác."
      }
    ]
  },
  {
    "id": "card_b08_012_grignard_reagent_12",
    "name": "Thuốc Thử Grignard — Chúa Tể Thù Hình (Dạng 12)",
    "name_en": "Grignard Reagent — Chúa Tể Thù Hình Lattice 12",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "PYRO",
    "manaCost": 6,
    "level": 8,
    "atk": 2910,
    "def": 3060,
    "chemicalFormula": "R-Mg-X",
    "effectCode": "ELEM_B08_GRIGNARD_REAGENT_ALLO_12",
    "effectText": "Hạ thấp năng lượng hoạt hóa: Giảm 1 Mana triệu hồi cho quái thú tiếp theo từ tay trong lượt này.",
    "scientificLore": "Thuốc Thử Grignard (R-Mg-X) đại diện cho đỉnh cao cấu trúc hóa học vật liệu tiên tiến và xúc tác chọn lọc trong chương trình GDPT 2018.",
    "relatedEquation": "R-X + Mg → R-Mg-X",
    "iupacName": "Grignard Reagent",
    "archetype": "ORGANOMETALLIC_CATALYSIS",
    "structuredEffects": [
      {
        "effectId": "B08_EFF_12",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "RECOVER_RESOURCE",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Tăng tốc độ phản ứng hồi 1 Mana xúc tác."
      }
    ]
  },
  {
    "id": "card_b08_013_wilkinson_catalyst_13",
    "name": "Xúc Tác Wilkinson — Chúa Tể Thù Hình (Dạng 13)",
    "name_en": "Wilkinson Catalyst — Chúa Tể Thù Hình Lattice 13",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "AQUA",
    "manaCost": 2,
    "level": 3,
    "atk": 1860,
    "def": 1830,
    "chemicalFormula": "RhCl(PPh3)3",
    "effectCode": "ELEM_B08_WILKINSON_CATALYST_ALLO_13",
    "effectText": "Hạ thấp năng lượng hoạt hóa: Giảm 1 Mana triệu hồi cho quái thú tiếp theo từ tay trong lượt này.",
    "scientificLore": "Xúc Tác Wilkinson (RhCl(PPh3)3) đại diện cho đỉnh cao cấu trúc hóa học vật liệu tiên tiến và xúc tác chọn lọc trong chương trình GDPT 2018.",
    "relatedEquation": "RhCl(PPh₃)₃ + H₂ → Active Hydrogenation Specie",
    "iupacName": "Wilkinson Catalyst",
    "archetype": "ORGANOMETALLIC_CATALYSIS",
    "structuredEffects": [
      {
        "effectId": "B08_EFF_13",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "RECOVER_RESOURCE",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Tăng tốc độ phản ứng hồi 1 Mana xúc tác."
      }
    ]
  },
  {
    "id": "card_b08_014_graphite_lattice_14",
    "name": "Than Chì Graphite — Chúa Tể Thù Hình (Dạng 14)",
    "name_en": "Graphite Lattice — Chúa Tể Thù Hình Lattice 14",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "TERRA",
    "manaCost": 3,
    "level": 4,
    "atk": 2130,
    "def": 2100,
    "chemicalFormula": "C",
    "effectCode": "ELEM_B08_GRAPHITE_LATTICE_ALLO_14",
    "effectText": "Đa dạng thù hình: Có thể thay đổi thuộc tính của quái thú này sang bất kỳ thuộc tính nào 1 lần mỗi lượt.",
    "scientificLore": "Than Chì Graphite (C) đại diện cho đỉnh cao cấu trúc hóa học vật liệu tiên tiến và xúc tác chọn lọc trong chương trình GDPT 2018.",
    "relatedEquation": "C(graphite) (sp² Hexagonal Layers)",
    "iupacName": "Graphite Lattice",
    "archetype": "ALLOTROPE_PHANTOM",
    "structuredEffects": [
      {
        "effectId": "B08_EFF_14",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "RECOVER_RESOURCE",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Tăng tốc độ phản ứng hồi 1 Mana xúc tác."
      }
    ]
  },
  {
    "id": "card_b08_015_diamond_octahedral_15",
    "name": "Kim Cương Bát Diện — Chúa Tể Thù Hình (Dạng 15)",
    "name_en": "Diamond Octahedral — Chúa Tể Thù Hình Lattice 15",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "NOBLE_VOID",
    "manaCost": 4,
    "level": 5,
    "atk": 2400,
    "def": 2370,
    "chemicalFormula": "C",
    "effectCode": "ELEM_B08_DIAMOND_OCTAHEDRAL_ALLO_15",
    "effectText": "Đa dạng thù hình: Có thể thay đổi thuộc tính của quái thú này sang bất kỳ thuộc tính nào 1 lần mỗi lượt.",
    "scientificLore": "Kim Cương Bát Diện (C) đại diện cho đỉnh cao cấu trúc hóa học vật liệu tiên tiến và xúc tác chọn lọc trong chương trình GDPT 2018.",
    "relatedEquation": "C(diamond) (sp³ Tetrahedral Giant Lattice)",
    "iupacName": "Diamond Octahedral",
    "archetype": "ALLOTROPE_PHANTOM",
    "structuredEffects": [
      {
        "effectId": "B08_EFF_15",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "RECOVER_RESOURCE",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Tăng tốc độ phản ứng hồi 1 Mana xúc tác."
      }
    ]
  },
  {
    "id": "card_b08_016_graphene_monolayer_16",
    "name": "Graphene Đơn Lớp — Chúa Tể Thù Hình (Dạng 16)",
    "name_en": "Graphene Monolayer — Chúa Tể Thù Hình Lattice 16",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "ULTRA_RARE",
    "attribute": "ELECTRO",
    "manaCost": 5,
    "level": 6,
    "atk": 2420,
    "def": 2640,
    "chemicalFormula": "C",
    "effectCode": "ELEM_B08_GRAPHENE_MONOLAYER_ALLO_16",
    "effectText": "Đa dạng thù hình: Có thể thay đổi thuộc tính của quái thú này sang bất kỳ thuộc tính nào 1 lần mỗi lượt.",
    "scientificLore": "Graphene Đơn Lớp (C) đại diện cho đỉnh cao cấu trúc hóa học vật liệu tiên tiến và xúc tác chọn lọc trong chương trình GDPT 2018.",
    "relatedEquation": "Graphene (2D Hexagonal Carbon Network)",
    "iupacName": "Graphene Monolayer",
    "archetype": "ALLOTROPE_PHANTOM",
    "structuredEffects": [
      {
        "effectId": "B08_EFF_16",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "RECOVER_RESOURCE",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Tăng tốc độ phản ứng hồi 1 Mana xúc tác."
      }
    ]
  },
  {
    "id": "card_b08_017_buckminsterfullerene_c60_17",
    "name": "Fullerene C60 — Chúa Tể Thù Hình (Dạng 17)",
    "name_en": "Buckminsterfullerene C60 — Chúa Tể Thù Hình Lattice 17",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SECRET_RARE",
    "attribute": "NOBLE_VOID",
    "manaCost": 5,
    "level": 7,
    "atk": 2690,
    "def": 2670,
    "chemicalFormula": "C60",
    "effectCode": "ELEM_B08_BUCKMINSTERFULLERENE_C60_ALLO_17",
    "effectText": "Đa dạng thù hình: Có thể thay đổi thuộc tính của quái thú này sang bất kỳ thuộc tính nào 1 lần mỗi lượt.",
    "scientificLore": "Fullerene C60 (C60) đại diện cho đỉnh cao cấu trúc hóa học vật liệu tiên tiến và xúc tác chọn lọc trong chương trình GDPT 2018.",
    "relatedEquation": "C₆₀ (Truncated Icosahedron Buckyball)",
    "iupacName": "Buckminsterfullerene C60",
    "archetype": "ALLOTROPE_PHANTOM",
    "structuredEffects": [
      {
        "effectId": "B08_EFF_17",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "RECOVER_RESOURCE",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Tăng tốc độ phản ứng hồi 1 Mana xúc tác."
      }
    ]
  },
  {
    "id": "card_b08_018_carbon_nanotube_18",
    "name": "Ống Nano Carbon — Chúa Tể Thù Hình (Dạng 18)",
    "name_en": "Carbon Nanotube — Chúa Tể Thù Hình Lattice 18",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "ELECTRO",
    "manaCost": 6,
    "level": 8,
    "atk": 2960,
    "def": 2940,
    "chemicalFormula": "CNT",
    "effectCode": "ELEM_B08_CARBON_NANOTUBE_ALLO_18",
    "effectText": "Đa dạng thù hình: Có thể thay đổi thuộc tính của quái thú này sang bất kỳ thuộc tính nào 1 lần mỗi lượt.",
    "scientificLore": "Ống Nano Carbon (CNT) đại diện cho đỉnh cao cấu trúc hóa học vật liệu tiên tiến và xúc tác chọn lọc trong chương trình GDPT 2018.",
    "relatedEquation": "Rolled Graphene Cylindrical Shell",
    "iupacName": "Carbon Nanotube",
    "archetype": "ALLOTROPE_PHANTOM",
    "structuredEffects": [
      {
        "effectId": "B08_EFF_18",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "RECOVER_RESOURCE",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Tăng tốc độ phản ứng hồi 1 Mana xúc tác."
      }
    ]
  },
  {
    "id": "card_b08_019_white_phosphorus_19",
    "name": "Photpho Trắng — Chúa Tể Thù Hình (Dạng 19)",
    "name_en": "White Phosphorus — Chúa Tể Thù Hình Lattice 19",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "PYRO",
    "manaCost": 2,
    "level": 3,
    "atk": 1910,
    "def": 1950,
    "chemicalFormula": "P4",
    "effectCode": "ELEM_B08_WHITE_PHOSPHORUS_ALLO_19",
    "effectText": "Đa dạng thù hình: Có thể thay đổi thuộc tính của quái thú này sang bất kỳ thuộc tính nào 1 lần mỗi lượt.",
    "scientificLore": "Photpho Trắng (P4) đại diện cho đỉnh cao cấu trúc hóa học vật liệu tiên tiến và xúc tác chọn lọc trong chương trình GDPT 2018.",
    "relatedEquation": "P₄ + 5O₂ → P₄O₁₀ (Self-Ignition)",
    "iupacName": "White Phosphorus",
    "archetype": "ALLOTROPE_PHANTOM",
    "structuredEffects": [
      {
        "effectId": "B08_EFF_19",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "RECOVER_RESOURCE",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Tăng tốc độ phản ứng hồi 1 Mana xúc tác."
      }
    ]
  },
  {
    "id": "card_b08_020_red_phosphorus_20",
    "name": "Photpho Đỏ — Chúa Tể Thù Hình (Dạng 20)",
    "name_en": "Red Phosphorus — Chúa Tể Thù Hình Lattice 20",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "PYRO",
    "manaCost": 3,
    "level": 4,
    "atk": 2180,
    "def": 2220,
    "chemicalFormula": "Pn",
    "effectCode": "ELEM_B08_RED_PHOSPHORUS_ALLO_20",
    "effectText": "Đa dạng thù hình: Có thể thay đổi thuộc tính của quái thú này sang bất kỳ thuộc tính nào 1 lần mỗi lượt.",
    "scientificLore": "Photpho Đỏ (Pn) đại diện cho đỉnh cao cấu trúc hóa học vật liệu tiên tiến và xúc tác chọn lọc trong chương trình GDPT 2018.",
    "relatedEquation": "P₄(white) --heat--> Pn(red)",
    "iupacName": "Red Phosphorus",
    "archetype": "ALLOTROPE_PHANTOM",
    "structuredEffects": [
      {
        "effectId": "B08_EFF_20",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "RECOVER_RESOURCE",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Tăng tốc độ phản ứng hồi 1 Mana xúc tác."
      }
    ]
  },
  {
    "id": "card_b08_021_ziegler_natta_catalyst_21",
    "name": "Xúc Tác Ziegler-Natta — Kẻ Thúc Đẩy Phản Ứng (Dạng 21)",
    "name_en": "Ziegler-Natta Catalyst — Kẻ Thúc Đẩy Phản Ứng Lattice 21",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "ELECTRO",
    "manaCost": 4,
    "level": 5,
    "atk": 2200,
    "def": 2250,
    "chemicalFormula": "TiCl4·Al(C2H5)3",
    "effectCode": "ELEM_B08_ZIEGLER_NATTA_CATALYST_ALLO_21",
    "effectText": "Hạ thấp năng lượng hoạt hóa: Giảm 1 Mana triệu hồi cho quái thú tiếp theo từ tay trong lượt này.",
    "scientificLore": "Xúc Tác Ziegler-Natta (TiCl4·Al(C2H5)3) đại diện cho đỉnh cao cấu trúc hóa học vật liệu tiên tiến và xúc tác chọn lọc trong chương trình GDPT 2018.",
    "relatedEquation": "TiCl₄ + Al(C₂H₅)₃ → Active Polymerization Center",
    "iupacName": "Ziegler-Natta Catalyst",
    "archetype": "ORGANOMETALLIC_CATALYSIS",
    "structuredEffects": [
      {
        "effectId": "B08_EFF_21",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "RECOVER_RESOURCE",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Tăng tốc độ phản ứng hồi 1 Mana xúc tác."
      }
    ]
  },
  {
    "id": "card_b08_022_grignard_reagent_22",
    "name": "Thuốc Thử Grignard — Kẻ Thúc Đẩy Phản Ứng (Dạng 22)",
    "name_en": "Grignard Reagent — Kẻ Thúc Đẩy Phản Ứng Lattice 22",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "PYRO",
    "manaCost": 5,
    "level": 6,
    "atk": 2470,
    "def": 2520,
    "chemicalFormula": "R-Mg-X",
    "effectCode": "ELEM_B08_GRIGNARD_REAGENT_ALLO_22",
    "effectText": "Hạ thấp năng lượng hoạt hóa: Giảm 1 Mana triệu hồi cho quái thú tiếp theo từ tay trong lượt này.",
    "scientificLore": "Thuốc Thử Grignard (R-Mg-X) đại diện cho đỉnh cao cấu trúc hóa học vật liệu tiên tiến và xúc tác chọn lọc trong chương trình GDPT 2018.",
    "relatedEquation": "R-X + Mg → R-Mg-X",
    "iupacName": "Grignard Reagent",
    "archetype": "ORGANOMETALLIC_CATALYSIS",
    "structuredEffects": [
      {
        "effectId": "B08_EFF_22",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "RECOVER_RESOURCE",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Tăng tốc độ phản ứng hồi 1 Mana xúc tác."
      }
    ]
  },
  {
    "id": "card_b08_023_wilkinson_catalyst_23",
    "name": "Xúc Tác Wilkinson — Kẻ Thúc Đẩy Phản Ứng (Dạng 23)",
    "name_en": "Wilkinson Catalyst — Kẻ Thúc Đẩy Phản Ứng Lattice 23",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "AQUA",
    "manaCost": 5,
    "level": 7,
    "atk": 2740,
    "def": 2790,
    "chemicalFormula": "RhCl(PPh3)3",
    "effectCode": "ELEM_B08_WILKINSON_CATALYST_ALLO_23",
    "effectText": "Hạ thấp năng lượng hoạt hóa: Giảm 1 Mana triệu hồi cho quái thú tiếp theo từ tay trong lượt này.",
    "scientificLore": "Xúc Tác Wilkinson (RhCl(PPh3)3) đại diện cho đỉnh cao cấu trúc hóa học vật liệu tiên tiến và xúc tác chọn lọc trong chương trình GDPT 2018.",
    "relatedEquation": "RhCl(PPh₃)₃ + H₂ → Active Hydrogenation Specie",
    "iupacName": "Wilkinson Catalyst",
    "archetype": "ORGANOMETALLIC_CATALYSIS",
    "structuredEffects": [
      {
        "effectId": "B08_EFF_23",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "RECOVER_RESOURCE",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Tăng tốc độ phản ứng hồi 1 Mana xúc tác."
      }
    ]
  },
  {
    "id": "card_b08_024_graphite_lattice_24",
    "name": "Than Chì Graphite — Kẻ Thúc Đẩy Phản Ứng (Dạng 24)",
    "name_en": "Graphite Lattice — Kẻ Thúc Đẩy Phản Ứng Lattice 24",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "TERRA",
    "manaCost": 6,
    "level": 8,
    "atk": 3010,
    "def": 3060,
    "chemicalFormula": "C",
    "effectCode": "ELEM_B08_GRAPHITE_LATTICE_ALLO_24",
    "effectText": "Đa dạng thù hình: Có thể thay đổi thuộc tính của quái thú này sang bất kỳ thuộc tính nào 1 lần mỗi lượt.",
    "scientificLore": "Than Chì Graphite (C) đại diện cho đỉnh cao cấu trúc hóa học vật liệu tiên tiến và xúc tác chọn lọc trong chương trình GDPT 2018.",
    "relatedEquation": "C(graphite) (sp² Hexagonal Layers)",
    "iupacName": "Graphite Lattice",
    "archetype": "ALLOTROPE_PHANTOM",
    "structuredEffects": [
      {
        "effectId": "B08_EFF_24",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "RECOVER_RESOURCE",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Tăng tốc độ phản ứng hồi 1 Mana xúc tác."
      }
    ]
  },
  {
    "id": "card_b08_025_diamond_octahedral_25",
    "name": "Kim Cương Bát Diện — Kẻ Thúc Đẩy Phản Ứng (Dạng 25)",
    "name_en": "Diamond Octahedral — Kẻ Thúc Đẩy Phản Ứng Lattice 25",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "ULTRA_RARE",
    "attribute": "NOBLE_VOID",
    "manaCost": 2,
    "level": 3,
    "atk": 1960,
    "def": 1830,
    "chemicalFormula": "C",
    "effectCode": "ELEM_B08_DIAMOND_OCTAHEDRAL_ALLO_25",
    "effectText": "Đa dạng thù hình: Có thể thay đổi thuộc tính của quái thú này sang bất kỳ thuộc tính nào 1 lần mỗi lượt.",
    "scientificLore": "Kim Cương Bát Diện (C) đại diện cho đỉnh cao cấu trúc hóa học vật liệu tiên tiến và xúc tác chọn lọc trong chương trình GDPT 2018.",
    "relatedEquation": "C(diamond) (sp³ Tetrahedral Giant Lattice)",
    "iupacName": "Diamond Octahedral",
    "archetype": "ALLOTROPE_PHANTOM",
    "structuredEffects": [
      {
        "effectId": "B08_EFF_25",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "RECOVER_RESOURCE",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Tăng tốc độ phản ứng hồi 1 Mana xúc tác."
      }
    ]
  },
  {
    "id": "card_b08_026_graphene_monolayer_26",
    "name": "Graphene Đơn Lớp — Kẻ Thúc Đẩy Phản Ứng (Dạng 26)",
    "name_en": "Graphene Monolayer — Kẻ Thúc Đẩy Phản Ứng Lattice 26",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SECRET_RARE",
    "attribute": "ELECTRO",
    "manaCost": 3,
    "level": 4,
    "atk": 1980,
    "def": 2100,
    "chemicalFormula": "C",
    "effectCode": "ELEM_B08_GRAPHENE_MONOLAYER_ALLO_26",
    "effectText": "Đa dạng thù hình: Có thể thay đổi thuộc tính của quái thú này sang bất kỳ thuộc tính nào 1 lần mỗi lượt.",
    "scientificLore": "Graphene Đơn Lớp (C) đại diện cho đỉnh cao cấu trúc hóa học vật liệu tiên tiến và xúc tác chọn lọc trong chương trình GDPT 2018.",
    "relatedEquation": "Graphene (2D Hexagonal Carbon Network)",
    "iupacName": "Graphene Monolayer",
    "archetype": "ALLOTROPE_PHANTOM",
    "structuredEffects": [
      {
        "effectId": "B08_EFF_26",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "RECOVER_RESOURCE",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Tăng tốc độ phản ứng hồi 1 Mana xúc tác."
      }
    ]
  },
  {
    "id": "card_b08_027_buckminsterfullerene_c60_27",
    "name": "Fullerene C60 — Kẻ Thúc Đẩy Phản Ứng (Dạng 27)",
    "name_en": "Buckminsterfullerene C60 — Kẻ Thúc Đẩy Phản Ứng Lattice 27",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "NOBLE_VOID",
    "manaCost": 4,
    "level": 5,
    "atk": 2250,
    "def": 2370,
    "chemicalFormula": "C60",
    "effectCode": "ELEM_B08_BUCKMINSTERFULLERENE_C60_ALLO_27",
    "effectText": "Đa dạng thù hình: Có thể thay đổi thuộc tính của quái thú này sang bất kỳ thuộc tính nào 1 lần mỗi lượt.",
    "scientificLore": "Fullerene C60 (C60) đại diện cho đỉnh cao cấu trúc hóa học vật liệu tiên tiến và xúc tác chọn lọc trong chương trình GDPT 2018.",
    "relatedEquation": "C₆₀ (Truncated Icosahedron Buckyball)",
    "iupacName": "Buckminsterfullerene C60",
    "archetype": "ALLOTROPE_PHANTOM",
    "structuredEffects": [
      {
        "effectId": "B08_EFF_27",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "RECOVER_RESOURCE",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Tăng tốc độ phản ứng hồi 1 Mana xúc tác."
      }
    ]
  },
  {
    "id": "card_b08_028_carbon_nanotube_28",
    "name": "Ống Nano Carbon — Kẻ Thúc Đẩy Phản Ứng (Dạng 28)",
    "name_en": "Carbon Nanotube — Kẻ Thúc Đẩy Phản Ứng Lattice 28",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "ELECTRO",
    "manaCost": 5,
    "level": 6,
    "atk": 2520,
    "def": 2640,
    "chemicalFormula": "CNT",
    "effectCode": "ELEM_B08_CARBON_NANOTUBE_ALLO_28",
    "effectText": "Đa dạng thù hình: Có thể thay đổi thuộc tính của quái thú này sang bất kỳ thuộc tính nào 1 lần mỗi lượt.",
    "scientificLore": "Ống Nano Carbon (CNT) đại diện cho đỉnh cao cấu trúc hóa học vật liệu tiên tiến và xúc tác chọn lọc trong chương trình GDPT 2018.",
    "relatedEquation": "Rolled Graphene Cylindrical Shell",
    "iupacName": "Carbon Nanotube",
    "archetype": "ALLOTROPE_PHANTOM",
    "structuredEffects": [
      {
        "effectId": "B08_EFF_28",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "RECOVER_RESOURCE",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Tăng tốc độ phản ứng hồi 1 Mana xúc tác."
      }
    ]
  },
  {
    "id": "card_b08_029_white_phosphorus_29",
    "name": "Photpho Trắng — Kẻ Thúc Đẩy Phản Ứng (Dạng 29)",
    "name_en": "White Phosphorus — Kẻ Thúc Đẩy Phản Ứng Lattice 29",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "PYRO",
    "manaCost": 5,
    "level": 7,
    "atk": 2790,
    "def": 2670,
    "chemicalFormula": "P4",
    "effectCode": "ELEM_B08_WHITE_PHOSPHORUS_ALLO_29",
    "effectText": "Đa dạng thù hình: Có thể thay đổi thuộc tính của quái thú này sang bất kỳ thuộc tính nào 1 lần mỗi lượt.",
    "scientificLore": "Photpho Trắng (P4) đại diện cho đỉnh cao cấu trúc hóa học vật liệu tiên tiến và xúc tác chọn lọc trong chương trình GDPT 2018.",
    "relatedEquation": "P₄ + 5O₂ → P₄O₁₀ (Self-Ignition)",
    "iupacName": "White Phosphorus",
    "archetype": "ALLOTROPE_PHANTOM",
    "structuredEffects": [
      {
        "effectId": "B08_EFF_29",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "RECOVER_RESOURCE",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Tăng tốc độ phản ứng hồi 1 Mana xúc tác."
      }
    ]
  },
  {
    "id": "card_b08_030_red_phosphorus_30",
    "name": "Photpho Đỏ — Kẻ Thúc Đẩy Phản Ứng (Dạng 30)",
    "name_en": "Red Phosphorus — Kẻ Thúc Đẩy Phản Ứng Lattice 30",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "PYRO",
    "manaCost": 6,
    "level": 8,
    "atk": 3060,
    "def": 2940,
    "chemicalFormula": "Pn",
    "effectCode": "ELEM_B08_RED_PHOSPHORUS_ALLO_30",
    "effectText": "Đa dạng thù hình: Có thể thay đổi thuộc tính của quái thú này sang bất kỳ thuộc tính nào 1 lần mỗi lượt.",
    "scientificLore": "Photpho Đỏ (Pn) đại diện cho đỉnh cao cấu trúc hóa học vật liệu tiên tiến và xúc tác chọn lọc trong chương trình GDPT 2018.",
    "relatedEquation": "P₄(white) --heat--> Pn(red)",
    "iupacName": "Red Phosphorus",
    "archetype": "ALLOTROPE_PHANTOM",
    "structuredEffects": [
      {
        "effectId": "B08_EFF_30",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "RECOVER_RESOURCE",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Tăng tốc độ phản ứng hồi 1 Mana xúc tác."
      }
    ]
  },
  {
    "id": "card_b08_031_ziegler_natta_catalyst_31",
    "name": "Xúc Tác Ziegler-Natta — Lưới Tinh Thể (Dạng 31)",
    "name_en": "Ziegler-Natta Catalyst — Lưới Tinh Thể Lattice 31",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "ELECTRO",
    "manaCost": 2,
    "level": 3,
    "atk": 1760,
    "def": 1950,
    "chemicalFormula": "TiCl4·Al(C2H5)3",
    "effectCode": "ELEM_B08_ZIEGLER_NATTA_CATALYST_ALLO_31",
    "effectText": "Hạ thấp năng lượng hoạt hóa: Giảm 1 Mana triệu hồi cho quái thú tiếp theo từ tay trong lượt này.",
    "scientificLore": "Xúc Tác Ziegler-Natta (TiCl4·Al(C2H5)3) đại diện cho đỉnh cao cấu trúc hóa học vật liệu tiên tiến và xúc tác chọn lọc trong chương trình GDPT 2018.",
    "relatedEquation": "TiCl₄ + Al(C₂H₅)₃ → Active Polymerization Center",
    "iupacName": "Ziegler-Natta Catalyst",
    "archetype": "ORGANOMETALLIC_CATALYSIS",
    "structuredEffects": [
      {
        "effectId": "B08_EFF_31",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "RECOVER_RESOURCE",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Tăng tốc độ phản ứng hồi 1 Mana xúc tác."
      }
    ]
  },
  {
    "id": "card_b08_032_grignard_reagent_32",
    "name": "Thuốc Thử Grignard — Lưới Tinh Thể (Dạng 32)",
    "name_en": "Grignard Reagent — Lưới Tinh Thể Lattice 32",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "PYRO",
    "manaCost": 3,
    "level": 4,
    "atk": 2030,
    "def": 2220,
    "chemicalFormula": "R-Mg-X",
    "effectCode": "ELEM_B08_GRIGNARD_REAGENT_ALLO_32",
    "effectText": "Hạ thấp năng lượng hoạt hóa: Giảm 1 Mana triệu hồi cho quái thú tiếp theo từ tay trong lượt này.",
    "scientificLore": "Thuốc Thử Grignard (R-Mg-X) đại diện cho đỉnh cao cấu trúc hóa học vật liệu tiên tiến và xúc tác chọn lọc trong chương trình GDPT 2018.",
    "relatedEquation": "R-X + Mg → R-Mg-X",
    "iupacName": "Grignard Reagent",
    "archetype": "ORGANOMETALLIC_CATALYSIS",
    "structuredEffects": [
      {
        "effectId": "B08_EFF_32",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "RECOVER_RESOURCE",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Tăng tốc độ phản ứng hồi 1 Mana xúc tác."
      }
    ]
  },
  {
    "id": "card_b08_033_wilkinson_catalyst_33",
    "name": "Xúc Tác Wilkinson — Lưới Tinh Thể (Dạng 33)",
    "name_en": "Wilkinson Catalyst — Lưới Tinh Thể Lattice 33",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "AQUA",
    "manaCost": 4,
    "level": 5,
    "atk": 2300,
    "def": 2250,
    "chemicalFormula": "RhCl(PPh3)3",
    "effectCode": "ELEM_B08_WILKINSON_CATALYST_ALLO_33",
    "effectText": "Hạ thấp năng lượng hoạt hóa: Giảm 1 Mana triệu hồi cho quái thú tiếp theo từ tay trong lượt này.",
    "scientificLore": "Xúc Tác Wilkinson (RhCl(PPh3)3) đại diện cho đỉnh cao cấu trúc hóa học vật liệu tiên tiến và xúc tác chọn lọc trong chương trình GDPT 2018.",
    "relatedEquation": "RhCl(PPh₃)₃ + H₂ → Active Hydrogenation Specie",
    "iupacName": "Wilkinson Catalyst",
    "archetype": "ORGANOMETALLIC_CATALYSIS",
    "structuredEffects": [
      {
        "effectId": "B08_EFF_33",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "RECOVER_RESOURCE",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Tăng tốc độ phản ứng hồi 1 Mana xúc tác."
      }
    ]
  },
  {
    "id": "card_b08_034_graphite_lattice_34",
    "name": "Than Chì Graphite — Lưới Tinh Thể (Dạng 34)",
    "name_en": "Graphite Lattice — Lưới Tinh Thể Lattice 34",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "ULTRA_RARE",
    "attribute": "TERRA",
    "manaCost": 5,
    "level": 6,
    "atk": 2570,
    "def": 2520,
    "chemicalFormula": "C",
    "effectCode": "ELEM_B08_GRAPHITE_LATTICE_ALLO_34",
    "effectText": "Đa dạng thù hình: Có thể thay đổi thuộc tính của quái thú này sang bất kỳ thuộc tính nào 1 lần mỗi lượt.",
    "scientificLore": "Than Chì Graphite (C) đại diện cho đỉnh cao cấu trúc hóa học vật liệu tiên tiến và xúc tác chọn lọc trong chương trình GDPT 2018.",
    "relatedEquation": "C(graphite) (sp² Hexagonal Layers)",
    "iupacName": "Graphite Lattice",
    "archetype": "ALLOTROPE_PHANTOM",
    "structuredEffects": [
      {
        "effectId": "B08_EFF_34",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "RECOVER_RESOURCE",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Tăng tốc độ phản ứng hồi 1 Mana xúc tác."
      }
    ]
  },
  {
    "id": "card_b08_035_diamond_octahedral_35",
    "name": "Kim Cương Bát Diện — Lưới Tinh Thể (Dạng 35)",
    "name_en": "Diamond Octahedral — Lưới Tinh Thể Lattice 35",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SECRET_RARE",
    "attribute": "NOBLE_VOID",
    "manaCost": 5,
    "level": 7,
    "atk": 2840,
    "def": 2790,
    "chemicalFormula": "C",
    "effectCode": "ELEM_B08_DIAMOND_OCTAHEDRAL_ALLO_35",
    "effectText": "Đa dạng thù hình: Có thể thay đổi thuộc tính của quái thú này sang bất kỳ thuộc tính nào 1 lần mỗi lượt.",
    "scientificLore": "Kim Cương Bát Diện (C) đại diện cho đỉnh cao cấu trúc hóa học vật liệu tiên tiến và xúc tác chọn lọc trong chương trình GDPT 2018.",
    "relatedEquation": "C(diamond) (sp³ Tetrahedral Giant Lattice)",
    "iupacName": "Diamond Octahedral",
    "archetype": "ALLOTROPE_PHANTOM",
    "structuredEffects": [
      {
        "effectId": "B08_EFF_35",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "RECOVER_RESOURCE",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Tăng tốc độ phản ứng hồi 1 Mana xúc tác."
      }
    ]
  },
  {
    "id": "card_b08_036_graphene_monolayer_36",
    "name": "Graphene Đơn Lớp — Lưới Tinh Thể (Dạng 36)",
    "name_en": "Graphene Monolayer — Lưới Tinh Thể Lattice 36",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "ELECTRO",
    "manaCost": 6,
    "level": 8,
    "atk": 2860,
    "def": 3060,
    "chemicalFormula": "C",
    "effectCode": "ELEM_B08_GRAPHENE_MONOLAYER_ALLO_36",
    "effectText": "Đa dạng thù hình: Có thể thay đổi thuộc tính của quái thú này sang bất kỳ thuộc tính nào 1 lần mỗi lượt.",
    "scientificLore": "Graphene Đơn Lớp (C) đại diện cho đỉnh cao cấu trúc hóa học vật liệu tiên tiến và xúc tác chọn lọc trong chương trình GDPT 2018.",
    "relatedEquation": "Graphene (2D Hexagonal Carbon Network)",
    "iupacName": "Graphene Monolayer",
    "archetype": "ALLOTROPE_PHANTOM",
    "structuredEffects": [
      {
        "effectId": "B08_EFF_36",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "RECOVER_RESOURCE",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Tăng tốc độ phản ứng hồi 1 Mana xúc tác."
      }
    ]
  },
  {
    "id": "card_b08_037_buckminsterfullerene_c60_37",
    "name": "Fullerene C60 — Lưới Tinh Thể (Dạng 37)",
    "name_en": "Buckminsterfullerene C60 — Lưới Tinh Thể Lattice 37",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "NOBLE_VOID",
    "manaCost": 2,
    "level": 3,
    "atk": 1810,
    "def": 1830,
    "chemicalFormula": "C60",
    "effectCode": "ELEM_B08_BUCKMINSTERFULLERENE_C60_ALLO_37",
    "effectText": "Đa dạng thù hình: Có thể thay đổi thuộc tính của quái thú này sang bất kỳ thuộc tính nào 1 lần mỗi lượt.",
    "scientificLore": "Fullerene C60 (C60) đại diện cho đỉnh cao cấu trúc hóa học vật liệu tiên tiến và xúc tác chọn lọc trong chương trình GDPT 2018.",
    "relatedEquation": "C₆₀ (Truncated Icosahedron Buckyball)",
    "iupacName": "Buckminsterfullerene C60",
    "archetype": "ALLOTROPE_PHANTOM",
    "structuredEffects": [
      {
        "effectId": "B08_EFF_37",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "RECOVER_RESOURCE",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Tăng tốc độ phản ứng hồi 1 Mana xúc tác."
      }
    ]
  },
  {
    "id": "card_b08_038_carbon_nanotube_38",
    "name": "Ống Nano Carbon — Lưới Tinh Thể (Dạng 38)",
    "name_en": "Carbon Nanotube — Lưới Tinh Thể Lattice 38",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "ELECTRO",
    "manaCost": 3,
    "level": 4,
    "atk": 2080,
    "def": 2100,
    "chemicalFormula": "CNT",
    "effectCode": "ELEM_B08_CARBON_NANOTUBE_ALLO_38",
    "effectText": "Đa dạng thù hình: Có thể thay đổi thuộc tính của quái thú này sang bất kỳ thuộc tính nào 1 lần mỗi lượt.",
    "scientificLore": "Ống Nano Carbon (CNT) đại diện cho đỉnh cao cấu trúc hóa học vật liệu tiên tiến và xúc tác chọn lọc trong chương trình GDPT 2018.",
    "relatedEquation": "Rolled Graphene Cylindrical Shell",
    "iupacName": "Carbon Nanotube",
    "archetype": "ALLOTROPE_PHANTOM",
    "structuredEffects": [
      {
        "effectId": "B08_EFF_38",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "RECOVER_RESOURCE",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Tăng tốc độ phản ứng hồi 1 Mana xúc tác."
      }
    ]
  },
  {
    "id": "card_b08_039_white_phosphorus_39",
    "name": "Photpho Trắng — Lưới Tinh Thể (Dạng 39)",
    "name_en": "White Phosphorus — Lưới Tinh Thể Lattice 39",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "PYRO",
    "manaCost": 4,
    "level": 5,
    "atk": 2350,
    "def": 2370,
    "chemicalFormula": "P4",
    "effectCode": "ELEM_B08_WHITE_PHOSPHORUS_ALLO_39",
    "effectText": "Đa dạng thù hình: Có thể thay đổi thuộc tính của quái thú này sang bất kỳ thuộc tính nào 1 lần mỗi lượt.",
    "scientificLore": "Photpho Trắng (P4) đại diện cho đỉnh cao cấu trúc hóa học vật liệu tiên tiến và xúc tác chọn lọc trong chương trình GDPT 2018.",
    "relatedEquation": "P₄ + 5O₂ → P₄O₁₀ (Self-Ignition)",
    "iupacName": "White Phosphorus",
    "archetype": "ALLOTROPE_PHANTOM",
    "structuredEffects": [
      {
        "effectId": "B08_EFF_39",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "RECOVER_RESOURCE",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Tăng tốc độ phản ứng hồi 1 Mana xúc tác."
      }
    ]
  },
  {
    "id": "card_b08_040_red_phosphorus_40",
    "name": "Photpho Đỏ — Lưới Tinh Thể (Dạng 40)",
    "name_en": "Red Phosphorus — Lưới Tinh Thể Lattice 40",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "PYRO",
    "manaCost": 5,
    "level": 6,
    "atk": 2620,
    "def": 2640,
    "chemicalFormula": "Pn",
    "effectCode": "ELEM_B08_RED_PHOSPHORUS_ALLO_40",
    "effectText": "Đa dạng thù hình: Có thể thay đổi thuộc tính của quái thú này sang bất kỳ thuộc tính nào 1 lần mỗi lượt.",
    "scientificLore": "Photpho Đỏ (Pn) đại diện cho đỉnh cao cấu trúc hóa học vật liệu tiên tiến và xúc tác chọn lọc trong chương trình GDPT 2018.",
    "relatedEquation": "P₄(white) --heat--> Pn(red)",
    "iupacName": "Red Phosphorus",
    "archetype": "ALLOTROPE_PHANTOM",
    "structuredEffects": [
      {
        "effectId": "B08_EFF_40",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "RECOVER_RESOURCE",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Tăng tốc độ phản ứng hồi 1 Mana xúc tác."
      }
    ]
  },
  {
    "id": "card_b08_041_ziegler_natta_catalyst_41",
    "name": "Xúc Tác Ziegler-Natta — Trung Tâm Hoạt Hóa (Dạng 41)",
    "name_en": "Ziegler-Natta Catalyst — Trung Tâm Hoạt Hóa Lattice 41",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "ELECTRO",
    "manaCost": 5,
    "level": 7,
    "atk": 2640,
    "def": 2670,
    "chemicalFormula": "TiCl4·Al(C2H5)3",
    "effectCode": "ELEM_B08_ZIEGLER_NATTA_CATALYST_ALLO_41",
    "effectText": "Hạ thấp năng lượng hoạt hóa: Giảm 1 Mana triệu hồi cho quái thú tiếp theo từ tay trong lượt này.",
    "scientificLore": "Xúc Tác Ziegler-Natta (TiCl4·Al(C2H5)3) đại diện cho đỉnh cao cấu trúc hóa học vật liệu tiên tiến và xúc tác chọn lọc trong chương trình GDPT 2018.",
    "relatedEquation": "TiCl₄ + Al(C₂H₅)₃ → Active Polymerization Center",
    "iupacName": "Ziegler-Natta Catalyst",
    "archetype": "ORGANOMETALLIC_CATALYSIS",
    "structuredEffects": [
      {
        "effectId": "B08_EFF_41",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "RECOVER_RESOURCE",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Tăng tốc độ phản ứng hồi 1 Mana xúc tác."
      }
    ]
  },
  {
    "id": "card_b08_042_grignard_reagent_42",
    "name": "Thuốc Thử Grignard — Trung Tâm Hoạt Hóa (Dạng 42)",
    "name_en": "Grignard Reagent — Trung Tâm Hoạt Hóa Lattice 42",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "PYRO",
    "manaCost": 6,
    "level": 8,
    "atk": 2910,
    "def": 2940,
    "chemicalFormula": "R-Mg-X",
    "effectCode": "ELEM_B08_GRIGNARD_REAGENT_ALLO_42",
    "effectText": "Hạ thấp năng lượng hoạt hóa: Giảm 1 Mana triệu hồi cho quái thú tiếp theo từ tay trong lượt này.",
    "scientificLore": "Thuốc Thử Grignard (R-Mg-X) đại diện cho đỉnh cao cấu trúc hóa học vật liệu tiên tiến và xúc tác chọn lọc trong chương trình GDPT 2018.",
    "relatedEquation": "R-X + Mg → R-Mg-X",
    "iupacName": "Grignard Reagent",
    "archetype": "ORGANOMETALLIC_CATALYSIS",
    "structuredEffects": [
      {
        "effectId": "B08_EFF_42",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "RECOVER_RESOURCE",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Tăng tốc độ phản ứng hồi 1 Mana xúc tác."
      }
    ]
  },
  {
    "id": "card_b08_043_wilkinson_catalyst_43",
    "name": "Xúc Tác Wilkinson — Trung Tâm Hoạt Hóa (Dạng 43)",
    "name_en": "Wilkinson Catalyst — Trung Tâm Hoạt Hóa Lattice 43",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "ULTRA_RARE",
    "attribute": "AQUA",
    "manaCost": 2,
    "level": 3,
    "atk": 1860,
    "def": 1950,
    "chemicalFormula": "RhCl(PPh3)3",
    "effectCode": "ELEM_B08_WILKINSON_CATALYST_ALLO_43",
    "effectText": "Hạ thấp năng lượng hoạt hóa: Giảm 1 Mana triệu hồi cho quái thú tiếp theo từ tay trong lượt này.",
    "scientificLore": "Xúc Tác Wilkinson (RhCl(PPh3)3) đại diện cho đỉnh cao cấu trúc hóa học vật liệu tiên tiến và xúc tác chọn lọc trong chương trình GDPT 2018.",
    "relatedEquation": "RhCl(PPh₃)₃ + H₂ → Active Hydrogenation Specie",
    "iupacName": "Wilkinson Catalyst",
    "archetype": "ORGANOMETALLIC_CATALYSIS",
    "structuredEffects": [
      {
        "effectId": "B08_EFF_43",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "RECOVER_RESOURCE",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Tăng tốc độ phản ứng hồi 1 Mana xúc tác."
      }
    ]
  },
  {
    "id": "card_b08_044_graphite_lattice_44",
    "name": "Than Chì Graphite — Trung Tâm Hoạt Hóa (Dạng 44)",
    "name_en": "Graphite Lattice — Trung Tâm Hoạt Hóa Lattice 44",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SECRET_RARE",
    "attribute": "TERRA",
    "manaCost": 3,
    "level": 4,
    "atk": 2130,
    "def": 2220,
    "chemicalFormula": "C",
    "effectCode": "ELEM_B08_GRAPHITE_LATTICE_ALLO_44",
    "effectText": "Đa dạng thù hình: Có thể thay đổi thuộc tính của quái thú này sang bất kỳ thuộc tính nào 1 lần mỗi lượt.",
    "scientificLore": "Than Chì Graphite (C) đại diện cho đỉnh cao cấu trúc hóa học vật liệu tiên tiến và xúc tác chọn lọc trong chương trình GDPT 2018.",
    "relatedEquation": "C(graphite) (sp² Hexagonal Layers)",
    "iupacName": "Graphite Lattice",
    "archetype": "ALLOTROPE_PHANTOM",
    "structuredEffects": [
      {
        "effectId": "B08_EFF_44",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "RECOVER_RESOURCE",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Tăng tốc độ phản ứng hồi 1 Mana xúc tác."
      }
    ]
  },
  {
    "id": "card_b08_045_diamond_octahedral_45",
    "name": "Kim Cương Bát Diện — Trung Tâm Hoạt Hóa (Dạng 45)",
    "name_en": "Diamond Octahedral — Trung Tâm Hoạt Hóa Lattice 45",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "NOBLE_VOID",
    "manaCost": 4,
    "level": 5,
    "atk": 2400,
    "def": 2250,
    "chemicalFormula": "C",
    "effectCode": "ELEM_B08_DIAMOND_OCTAHEDRAL_ALLO_45",
    "effectText": "Đa dạng thù hình: Có thể thay đổi thuộc tính của quái thú này sang bất kỳ thuộc tính nào 1 lần mỗi lượt.",
    "scientificLore": "Kim Cương Bát Diện (C) đại diện cho đỉnh cao cấu trúc hóa học vật liệu tiên tiến và xúc tác chọn lọc trong chương trình GDPT 2018.",
    "relatedEquation": "C(diamond) (sp³ Tetrahedral Giant Lattice)",
    "iupacName": "Diamond Octahedral",
    "archetype": "ALLOTROPE_PHANTOM",
    "structuredEffects": [
      {
        "effectId": "B08_EFF_45",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "RECOVER_RESOURCE",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Tăng tốc độ phản ứng hồi 1 Mana xúc tác."
      }
    ]
  },
  {
    "id": "card_b08_046_graphene_monolayer_46",
    "name": "Graphene Đơn Lớp — Trung Tâm Hoạt Hóa (Dạng 46)",
    "name_en": "Graphene Monolayer — Trung Tâm Hoạt Hóa Lattice 46",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "ELECTRO",
    "manaCost": 5,
    "level": 6,
    "atk": 2420,
    "def": 2520,
    "chemicalFormula": "C",
    "effectCode": "ELEM_B08_GRAPHENE_MONOLAYER_ALLO_46",
    "effectText": "Đa dạng thù hình: Có thể thay đổi thuộc tính của quái thú này sang bất kỳ thuộc tính nào 1 lần mỗi lượt.",
    "scientificLore": "Graphene Đơn Lớp (C) đại diện cho đỉnh cao cấu trúc hóa học vật liệu tiên tiến và xúc tác chọn lọc trong chương trình GDPT 2018.",
    "relatedEquation": "Graphene (2D Hexagonal Carbon Network)",
    "iupacName": "Graphene Monolayer",
    "archetype": "ALLOTROPE_PHANTOM",
    "structuredEffects": [
      {
        "effectId": "B08_EFF_46",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "RECOVER_RESOURCE",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Tăng tốc độ phản ứng hồi 1 Mana xúc tác."
      }
    ]
  },
  {
    "id": "card_b08_047_buckminsterfullerene_c60_47",
    "name": "Fullerene C60 — Trung Tâm Hoạt Hóa (Dạng 47)",
    "name_en": "Buckminsterfullerene C60 — Trung Tâm Hoạt Hóa Lattice 47",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "NOBLE_VOID",
    "manaCost": 5,
    "level": 7,
    "atk": 2690,
    "def": 2790,
    "chemicalFormula": "C60",
    "effectCode": "ELEM_B08_BUCKMINSTERFULLERENE_C60_ALLO_47",
    "effectText": "Đa dạng thù hình: Có thể thay đổi thuộc tính của quái thú này sang bất kỳ thuộc tính nào 1 lần mỗi lượt.",
    "scientificLore": "Fullerene C60 (C60) đại diện cho đỉnh cao cấu trúc hóa học vật liệu tiên tiến và xúc tác chọn lọc trong chương trình GDPT 2018.",
    "relatedEquation": "C₆₀ (Truncated Icosahedron Buckyball)",
    "iupacName": "Buckminsterfullerene C60",
    "archetype": "ALLOTROPE_PHANTOM",
    "structuredEffects": [
      {
        "effectId": "B08_EFF_47",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "RECOVER_RESOURCE",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Tăng tốc độ phản ứng hồi 1 Mana xúc tác."
      }
    ]
  },
  {
    "id": "card_b08_048_carbon_nanotube_48",
    "name": "Ống Nano Carbon — Trung Tâm Hoạt Hóa (Dạng 48)",
    "name_en": "Carbon Nanotube — Trung Tâm Hoạt Hóa Lattice 48",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "ELECTRO",
    "manaCost": 6,
    "level": 8,
    "atk": 2960,
    "def": 3060,
    "chemicalFormula": "CNT",
    "effectCode": "ELEM_B08_CARBON_NANOTUBE_ALLO_48",
    "effectText": "Đa dạng thù hình: Có thể thay đổi thuộc tính của quái thú này sang bất kỳ thuộc tính nào 1 lần mỗi lượt.",
    "scientificLore": "Ống Nano Carbon (CNT) đại diện cho đỉnh cao cấu trúc hóa học vật liệu tiên tiến và xúc tác chọn lọc trong chương trình GDPT 2018.",
    "relatedEquation": "Rolled Graphene Cylindrical Shell",
    "iupacName": "Carbon Nanotube",
    "archetype": "ALLOTROPE_PHANTOM",
    "structuredEffects": [
      {
        "effectId": "B08_EFF_48",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "RECOVER_RESOURCE",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Tăng tốc độ phản ứng hồi 1 Mana xúc tác."
      }
    ]
  },
  {
    "id": "card_b08_049_white_phosphorus_49",
    "name": "Photpho Trắng — Trung Tâm Hoạt Hóa (Dạng 49)",
    "name_en": "White Phosphorus — Trung Tâm Hoạt Hóa Lattice 49",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "PYRO",
    "manaCost": 2,
    "level": 3,
    "atk": 1910,
    "def": 1830,
    "chemicalFormula": "P4",
    "effectCode": "ELEM_B08_WHITE_PHOSPHORUS_ALLO_49",
    "effectText": "Đa dạng thù hình: Có thể thay đổi thuộc tính của quái thú này sang bất kỳ thuộc tính nào 1 lần mỗi lượt.",
    "scientificLore": "Photpho Trắng (P4) đại diện cho đỉnh cao cấu trúc hóa học vật liệu tiên tiến và xúc tác chọn lọc trong chương trình GDPT 2018.",
    "relatedEquation": "P₄ + 5O₂ → P₄O₁₀ (Self-Ignition)",
    "iupacName": "White Phosphorus",
    "archetype": "ALLOTROPE_PHANTOM",
    "structuredEffects": [
      {
        "effectId": "B08_EFF_49",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "RECOVER_RESOURCE",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Tăng tốc độ phản ứng hồi 1 Mana xúc tác."
      }
    ]
  },
  {
    "id": "card_b08_050_red_phosphorus_50",
    "name": "Photpho Đỏ — Trung Tâm Hoạt Hóa (Dạng 50)",
    "name_en": "Red Phosphorus — Trung Tâm Hoạt Hóa Lattice 50",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "PYRO",
    "manaCost": 3,
    "level": 4,
    "atk": 2180,
    "def": 2100,
    "chemicalFormula": "Pn",
    "effectCode": "ELEM_B08_RED_PHOSPHORUS_ALLO_50",
    "effectText": "Đa dạng thù hình: Có thể thay đổi thuộc tính của quái thú này sang bất kỳ thuộc tính nào 1 lần mỗi lượt.",
    "scientificLore": "Photpho Đỏ (Pn) đại diện cho đỉnh cao cấu trúc hóa học vật liệu tiên tiến và xúc tác chọn lọc trong chương trình GDPT 2018.",
    "relatedEquation": "P₄(white) --heat--> Pn(red)",
    "iupacName": "Red Phosphorus",
    "archetype": "ALLOTROPE_PHANTOM",
    "structuredEffects": [
      {
        "effectId": "B08_EFF_50",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "RECOVER_RESOURCE",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Tăng tốc độ phản ứng hồi 1 Mana xúc tác."
      }
    ]
  },
  {
    "id": "card_b08_051_ziegler_natta_catalyst_51",
    "name": "Xúc Tác Ziegler-Natta — Kiến Trúc Sư Cấu Trúc (Dạng 51)",
    "name_en": "Ziegler-Natta Catalyst — Kiến Trúc Sư Cấu Trúc Lattice 51",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "ELECTRO",
    "manaCost": 4,
    "level": 5,
    "atk": 2200,
    "def": 2370,
    "chemicalFormula": "TiCl4·Al(C2H5)3",
    "effectCode": "ELEM_B08_ZIEGLER_NATTA_CATALYST_ALLO_51",
    "effectText": "Hạ thấp năng lượng hoạt hóa: Giảm 1 Mana triệu hồi cho quái thú tiếp theo từ tay trong lượt này.",
    "scientificLore": "Xúc Tác Ziegler-Natta (TiCl4·Al(C2H5)3) đại diện cho đỉnh cao cấu trúc hóa học vật liệu tiên tiến và xúc tác chọn lọc trong chương trình GDPT 2018.",
    "relatedEquation": "TiCl₄ + Al(C₂H₅)₃ → Active Polymerization Center",
    "iupacName": "Ziegler-Natta Catalyst",
    "archetype": "ORGANOMETALLIC_CATALYSIS",
    "structuredEffects": [
      {
        "effectId": "B08_EFF_51",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "RECOVER_RESOURCE",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Tăng tốc độ phản ứng hồi 1 Mana xúc tác."
      }
    ]
  },
  {
    "id": "card_b08_052_grignard_reagent_52",
    "name": "Thuốc Thử Grignard — Kiến Trúc Sư Cấu Trúc (Dạng 52)",
    "name_en": "Grignard Reagent — Kiến Trúc Sư Cấu Trúc Lattice 52",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "ULTRA_RARE",
    "attribute": "PYRO",
    "manaCost": 5,
    "level": 6,
    "atk": 2470,
    "def": 2640,
    "chemicalFormula": "R-Mg-X",
    "effectCode": "ELEM_B08_GRIGNARD_REAGENT_ALLO_52",
    "effectText": "Hạ thấp năng lượng hoạt hóa: Giảm 1 Mana triệu hồi cho quái thú tiếp theo từ tay trong lượt này.",
    "scientificLore": "Thuốc Thử Grignard (R-Mg-X) đại diện cho đỉnh cao cấu trúc hóa học vật liệu tiên tiến và xúc tác chọn lọc trong chương trình GDPT 2018.",
    "relatedEquation": "R-X + Mg → R-Mg-X",
    "iupacName": "Grignard Reagent",
    "archetype": "ORGANOMETALLIC_CATALYSIS",
    "structuredEffects": [
      {
        "effectId": "B08_EFF_52",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "RECOVER_RESOURCE",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Tăng tốc độ phản ứng hồi 1 Mana xúc tác."
      }
    ]
  },
  {
    "id": "card_b08_053_wilkinson_catalyst_53",
    "name": "Xúc Tác Wilkinson — Kiến Trúc Sư Cấu Trúc (Dạng 53)",
    "name_en": "Wilkinson Catalyst — Kiến Trúc Sư Cấu Trúc Lattice 53",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SECRET_RARE",
    "attribute": "AQUA",
    "manaCost": 5,
    "level": 7,
    "atk": 2740,
    "def": 2670,
    "chemicalFormula": "RhCl(PPh3)3",
    "effectCode": "ELEM_B08_WILKINSON_CATALYST_ALLO_53",
    "effectText": "Hạ thấp năng lượng hoạt hóa: Giảm 1 Mana triệu hồi cho quái thú tiếp theo từ tay trong lượt này.",
    "scientificLore": "Xúc Tác Wilkinson (RhCl(PPh3)3) đại diện cho đỉnh cao cấu trúc hóa học vật liệu tiên tiến và xúc tác chọn lọc trong chương trình GDPT 2018.",
    "relatedEquation": "RhCl(PPh₃)₃ + H₂ → Active Hydrogenation Specie",
    "iupacName": "Wilkinson Catalyst",
    "archetype": "ORGANOMETALLIC_CATALYSIS",
    "structuredEffects": [
      {
        "effectId": "B08_EFF_53",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "RECOVER_RESOURCE",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Tăng tốc độ phản ứng hồi 1 Mana xúc tác."
      }
    ]
  },
  {
    "id": "card_b08_054_graphite_lattice_54",
    "name": "Than Chì Graphite — Kiến Trúc Sư Cấu Trúc (Dạng 54)",
    "name_en": "Graphite Lattice — Kiến Trúc Sư Cấu Trúc Lattice 54",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "TERRA",
    "manaCost": 6,
    "level": 8,
    "atk": 3010,
    "def": 2940,
    "chemicalFormula": "C",
    "effectCode": "ELEM_B08_GRAPHITE_LATTICE_ALLO_54",
    "effectText": "Đa dạng thù hình: Có thể thay đổi thuộc tính của quái thú này sang bất kỳ thuộc tính nào 1 lần mỗi lượt.",
    "scientificLore": "Than Chì Graphite (C) đại diện cho đỉnh cao cấu trúc hóa học vật liệu tiên tiến và xúc tác chọn lọc trong chương trình GDPT 2018.",
    "relatedEquation": "C(graphite) (sp² Hexagonal Layers)",
    "iupacName": "Graphite Lattice",
    "archetype": "ALLOTROPE_PHANTOM",
    "structuredEffects": [
      {
        "effectId": "B08_EFF_54",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "RECOVER_RESOURCE",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Tăng tốc độ phản ứng hồi 1 Mana xúc tác."
      }
    ]
  },
  {
    "id": "card_b08_055_diamond_octahedral_55",
    "name": "Kim Cương Bát Diện — Kiến Trúc Sư Cấu Trúc (Dạng 55)",
    "name_en": "Diamond Octahedral — Kiến Trúc Sư Cấu Trúc Lattice 55",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "NOBLE_VOID",
    "manaCost": 2,
    "level": 3,
    "atk": 1960,
    "def": 1950,
    "chemicalFormula": "C",
    "effectCode": "ELEM_B08_DIAMOND_OCTAHEDRAL_ALLO_55",
    "effectText": "Đa dạng thù hình: Có thể thay đổi thuộc tính của quái thú này sang bất kỳ thuộc tính nào 1 lần mỗi lượt.",
    "scientificLore": "Kim Cương Bát Diện (C) đại diện cho đỉnh cao cấu trúc hóa học vật liệu tiên tiến và xúc tác chọn lọc trong chương trình GDPT 2018.",
    "relatedEquation": "C(diamond) (sp³ Tetrahedral Giant Lattice)",
    "iupacName": "Diamond Octahedral",
    "archetype": "ALLOTROPE_PHANTOM",
    "structuredEffects": [
      {
        "effectId": "B08_EFF_55",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "RECOVER_RESOURCE",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Tăng tốc độ phản ứng hồi 1 Mana xúc tác."
      }
    ]
  },
  {
    "id": "card_b08_056_graphene_monolayer_56",
    "name": "Graphene Đơn Lớp — Kiến Trúc Sư Cấu Trúc (Dạng 56)",
    "name_en": "Graphene Monolayer — Kiến Trúc Sư Cấu Trúc Lattice 56",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "ELECTRO",
    "manaCost": 3,
    "level": 4,
    "atk": 1980,
    "def": 2220,
    "chemicalFormula": "C",
    "effectCode": "ELEM_B08_GRAPHENE_MONOLAYER_ALLO_56",
    "effectText": "Đa dạng thù hình: Có thể thay đổi thuộc tính của quái thú này sang bất kỳ thuộc tính nào 1 lần mỗi lượt.",
    "scientificLore": "Graphene Đơn Lớp (C) đại diện cho đỉnh cao cấu trúc hóa học vật liệu tiên tiến và xúc tác chọn lọc trong chương trình GDPT 2018.",
    "relatedEquation": "Graphene (2D Hexagonal Carbon Network)",
    "iupacName": "Graphene Monolayer",
    "archetype": "ALLOTROPE_PHANTOM",
    "structuredEffects": [
      {
        "effectId": "B08_EFF_56",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "RECOVER_RESOURCE",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Tăng tốc độ phản ứng hồi 1 Mana xúc tác."
      }
    ]
  },
  {
    "id": "card_b08_057_buckminsterfullerene_c60_57",
    "name": "Fullerene C60 — Kiến Trúc Sư Cấu Trúc (Dạng 57)",
    "name_en": "Buckminsterfullerene C60 — Kiến Trúc Sư Cấu Trúc Lattice 57",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "NOBLE_VOID",
    "manaCost": 4,
    "level": 5,
    "atk": 2250,
    "def": 2250,
    "chemicalFormula": "C60",
    "effectCode": "ELEM_B08_BUCKMINSTERFULLERENE_C60_ALLO_57",
    "effectText": "Đa dạng thù hình: Có thể thay đổi thuộc tính của quái thú này sang bất kỳ thuộc tính nào 1 lần mỗi lượt.",
    "scientificLore": "Fullerene C60 (C60) đại diện cho đỉnh cao cấu trúc hóa học vật liệu tiên tiến và xúc tác chọn lọc trong chương trình GDPT 2018.",
    "relatedEquation": "C₆₀ (Truncated Icosahedron Buckyball)",
    "iupacName": "Buckminsterfullerene C60",
    "archetype": "ALLOTROPE_PHANTOM",
    "structuredEffects": [
      {
        "effectId": "B08_EFF_57",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "RECOVER_RESOURCE",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Tăng tốc độ phản ứng hồi 1 Mana xúc tác."
      }
    ]
  },
  {
    "id": "card_b08_058_carbon_nanotube_58",
    "name": "Ống Nano Carbon — Kiến Trúc Sư Cấu Trúc (Dạng 58)",
    "name_en": "Carbon Nanotube — Kiến Trúc Sư Cấu Trúc Lattice 58",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "ELECTRO",
    "manaCost": 5,
    "level": 6,
    "atk": 2520,
    "def": 2520,
    "chemicalFormula": "CNT",
    "effectCode": "ELEM_B08_CARBON_NANOTUBE_ALLO_58",
    "effectText": "Đa dạng thù hình: Có thể thay đổi thuộc tính của quái thú này sang bất kỳ thuộc tính nào 1 lần mỗi lượt.",
    "scientificLore": "Ống Nano Carbon (CNT) đại diện cho đỉnh cao cấu trúc hóa học vật liệu tiên tiến và xúc tác chọn lọc trong chương trình GDPT 2018.",
    "relatedEquation": "Rolled Graphene Cylindrical Shell",
    "iupacName": "Carbon Nanotube",
    "archetype": "ALLOTROPE_PHANTOM",
    "structuredEffects": [
      {
        "effectId": "B08_EFF_58",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "RECOVER_RESOURCE",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Tăng tốc độ phản ứng hồi 1 Mana xúc tác."
      }
    ]
  },
  {
    "id": "card_b08_059_white_phosphorus_59",
    "name": "Photpho Trắng — Kiến Trúc Sư Cấu Trúc (Dạng 59)",
    "name_en": "White Phosphorus — Kiến Trúc Sư Cấu Trúc Lattice 59",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "PYRO",
    "manaCost": 5,
    "level": 7,
    "atk": 2790,
    "def": 2790,
    "chemicalFormula": "P4",
    "effectCode": "ELEM_B08_WHITE_PHOSPHORUS_ALLO_59",
    "effectText": "Đa dạng thù hình: Có thể thay đổi thuộc tính của quái thú này sang bất kỳ thuộc tính nào 1 lần mỗi lượt.",
    "scientificLore": "Photpho Trắng (P4) đại diện cho đỉnh cao cấu trúc hóa học vật liệu tiên tiến và xúc tác chọn lọc trong chương trình GDPT 2018.",
    "relatedEquation": "P₄ + 5O₂ → P₄O₁₀ (Self-Ignition)",
    "iupacName": "White Phosphorus",
    "archetype": "ALLOTROPE_PHANTOM",
    "structuredEffects": [
      {
        "effectId": "B08_EFF_59",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "RECOVER_RESOURCE",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Tăng tốc độ phản ứng hồi 1 Mana xúc tác."
      }
    ]
  },
  {
    "id": "card_b08_060_red_phosphorus_60",
    "name": "Photpho Đỏ — Kiến Trúc Sư Cấu Trúc (Dạng 60)",
    "name_en": "Red Phosphorus — Kiến Trúc Sư Cấu Trúc Lattice 60",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "PYRO",
    "manaCost": 6,
    "level": 8,
    "atk": 3060,
    "def": 3060,
    "chemicalFormula": "Pn",
    "effectCode": "ELEM_B08_RED_PHOSPHORUS_ALLO_60",
    "effectText": "Đa dạng thù hình: Có thể thay đổi thuộc tính của quái thú này sang bất kỳ thuộc tính nào 1 lần mỗi lượt.",
    "scientificLore": "Photpho Đỏ (Pn) đại diện cho đỉnh cao cấu trúc hóa học vật liệu tiên tiến và xúc tác chọn lọc trong chương trình GDPT 2018.",
    "relatedEquation": "P₄(white) --heat--> Pn(red)",
    "iupacName": "Red Phosphorus",
    "archetype": "ALLOTROPE_PHANTOM",
    "structuredEffects": [
      {
        "effectId": "B08_EFF_60",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "RECOVER_RESOURCE",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Tăng tốc độ phản ứng hồi 1 Mana xúc tác."
      }
    ]
  },
  {
    "id": "card_b08_061_ziegler_natta_catalyst_61",
    "name": "Xúc Tác Ziegler-Natta — Chúa Tể Thù Hình (Dạng 61)",
    "name_en": "Ziegler-Natta Catalyst — Chúa Tể Thù Hình Lattice 61",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "ULTRA_RARE",
    "attribute": "ELECTRO",
    "manaCost": 2,
    "level": 3,
    "atk": 1760,
    "def": 1830,
    "chemicalFormula": "TiCl4·Al(C2H5)3",
    "effectCode": "ELEM_B08_ZIEGLER_NATTA_CATALYST_ALLO_61",
    "effectText": "Hạ thấp năng lượng hoạt hóa: Giảm 1 Mana triệu hồi cho quái thú tiếp theo từ tay trong lượt này.",
    "scientificLore": "Xúc Tác Ziegler-Natta (TiCl4·Al(C2H5)3) đại diện cho đỉnh cao cấu trúc hóa học vật liệu tiên tiến và xúc tác chọn lọc trong chương trình GDPT 2018.",
    "relatedEquation": "TiCl₄ + Al(C₂H₅)₃ → Active Polymerization Center",
    "iupacName": "Ziegler-Natta Catalyst",
    "archetype": "ORGANOMETALLIC_CATALYSIS",
    "structuredEffects": [
      {
        "effectId": "B08_EFF_61",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "RECOVER_RESOURCE",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Tăng tốc độ phản ứng hồi 1 Mana xúc tác."
      }
    ]
  },
  {
    "id": "card_b08_062_grignard_reagent_62",
    "name": "Thuốc Thử Grignard — Chúa Tể Thù Hình (Dạng 62)",
    "name_en": "Grignard Reagent — Chúa Tể Thù Hình Lattice 62",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SECRET_RARE",
    "attribute": "PYRO",
    "manaCost": 3,
    "level": 4,
    "atk": 2030,
    "def": 2100,
    "chemicalFormula": "R-Mg-X",
    "effectCode": "ELEM_B08_GRIGNARD_REAGENT_ALLO_62",
    "effectText": "Hạ thấp năng lượng hoạt hóa: Giảm 1 Mana triệu hồi cho quái thú tiếp theo từ tay trong lượt này.",
    "scientificLore": "Thuốc Thử Grignard (R-Mg-X) đại diện cho đỉnh cao cấu trúc hóa học vật liệu tiên tiến và xúc tác chọn lọc trong chương trình GDPT 2018.",
    "relatedEquation": "R-X + Mg → R-Mg-X",
    "iupacName": "Grignard Reagent",
    "archetype": "ORGANOMETALLIC_CATALYSIS",
    "structuredEffects": [
      {
        "effectId": "B08_EFF_62",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "RECOVER_RESOURCE",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Tăng tốc độ phản ứng hồi 1 Mana xúc tác."
      }
    ]
  },
  {
    "id": "card_b08_063_wilkinson_catalyst_63",
    "name": "Xúc Tác Wilkinson — Chúa Tể Thù Hình (Dạng 63)",
    "name_en": "Wilkinson Catalyst — Chúa Tể Thù Hình Lattice 63",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "AQUA",
    "manaCost": 4,
    "level": 5,
    "atk": 2300,
    "def": 2370,
    "chemicalFormula": "RhCl(PPh3)3",
    "effectCode": "ELEM_B08_WILKINSON_CATALYST_ALLO_63",
    "effectText": "Hạ thấp năng lượng hoạt hóa: Giảm 1 Mana triệu hồi cho quái thú tiếp theo từ tay trong lượt này.",
    "scientificLore": "Xúc Tác Wilkinson (RhCl(PPh3)3) đại diện cho đỉnh cao cấu trúc hóa học vật liệu tiên tiến và xúc tác chọn lọc trong chương trình GDPT 2018.",
    "relatedEquation": "RhCl(PPh₃)₃ + H₂ → Active Hydrogenation Specie",
    "iupacName": "Wilkinson Catalyst",
    "archetype": "ORGANOMETALLIC_CATALYSIS",
    "structuredEffects": [
      {
        "effectId": "B08_EFF_63",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "RECOVER_RESOURCE",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Tăng tốc độ phản ứng hồi 1 Mana xúc tác."
      }
    ]
  },
  {
    "id": "card_b08_064_graphite_lattice_64",
    "name": "Than Chì Graphite — Chúa Tể Thù Hình (Dạng 64)",
    "name_en": "Graphite Lattice — Chúa Tể Thù Hình Lattice 64",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "TERRA",
    "manaCost": 5,
    "level": 6,
    "atk": 2570,
    "def": 2640,
    "chemicalFormula": "C",
    "effectCode": "ELEM_B08_GRAPHITE_LATTICE_ALLO_64",
    "effectText": "Đa dạng thù hình: Có thể thay đổi thuộc tính của quái thú này sang bất kỳ thuộc tính nào 1 lần mỗi lượt.",
    "scientificLore": "Than Chì Graphite (C) đại diện cho đỉnh cao cấu trúc hóa học vật liệu tiên tiến và xúc tác chọn lọc trong chương trình GDPT 2018.",
    "relatedEquation": "C(graphite) (sp² Hexagonal Layers)",
    "iupacName": "Graphite Lattice",
    "archetype": "ALLOTROPE_PHANTOM",
    "structuredEffects": [
      {
        "effectId": "B08_EFF_64",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "RECOVER_RESOURCE",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Tăng tốc độ phản ứng hồi 1 Mana xúc tác."
      }
    ]
  },
  {
    "id": "card_b08_065_diamond_octahedral_65",
    "name": "Kim Cương Bát Diện — Chúa Tể Thù Hình (Dạng 65)",
    "name_en": "Diamond Octahedral — Chúa Tể Thù Hình Lattice 65",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "NOBLE_VOID",
    "manaCost": 5,
    "level": 7,
    "atk": 2840,
    "def": 2670,
    "chemicalFormula": "C",
    "effectCode": "ELEM_B08_DIAMOND_OCTAHEDRAL_ALLO_65",
    "effectText": "Đa dạng thù hình: Có thể thay đổi thuộc tính của quái thú này sang bất kỳ thuộc tính nào 1 lần mỗi lượt.",
    "scientificLore": "Kim Cương Bát Diện (C) đại diện cho đỉnh cao cấu trúc hóa học vật liệu tiên tiến và xúc tác chọn lọc trong chương trình GDPT 2018.",
    "relatedEquation": "C(diamond) (sp³ Tetrahedral Giant Lattice)",
    "iupacName": "Diamond Octahedral",
    "archetype": "ALLOTROPE_PHANTOM",
    "structuredEffects": [
      {
        "effectId": "B08_EFF_65",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "RECOVER_RESOURCE",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Tăng tốc độ phản ứng hồi 1 Mana xúc tác."
      }
    ]
  },
  {
    "id": "card_b08_066_graphene_monolayer_66",
    "name": "Graphene Đơn Lớp — Chúa Tể Thù Hình (Dạng 66)",
    "name_en": "Graphene Monolayer — Chúa Tể Thù Hình Lattice 66",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "ELECTRO",
    "manaCost": 6,
    "level": 8,
    "atk": 2860,
    "def": 2940,
    "chemicalFormula": "C",
    "effectCode": "ELEM_B08_GRAPHENE_MONOLAYER_ALLO_66",
    "effectText": "Đa dạng thù hình: Có thể thay đổi thuộc tính của quái thú này sang bất kỳ thuộc tính nào 1 lần mỗi lượt.",
    "scientificLore": "Graphene Đơn Lớp (C) đại diện cho đỉnh cao cấu trúc hóa học vật liệu tiên tiến và xúc tác chọn lọc trong chương trình GDPT 2018.",
    "relatedEquation": "Graphene (2D Hexagonal Carbon Network)",
    "iupacName": "Graphene Monolayer",
    "archetype": "ALLOTROPE_PHANTOM",
    "structuredEffects": [
      {
        "effectId": "B08_EFF_66",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "RECOVER_RESOURCE",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Tăng tốc độ phản ứng hồi 1 Mana xúc tác."
      }
    ]
  },
  {
    "id": "card_b08_067_buckminsterfullerene_c60_67",
    "name": "Fullerene C60 — Chúa Tể Thù Hình (Dạng 67)",
    "name_en": "Buckminsterfullerene C60 — Chúa Tể Thù Hình Lattice 67",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "NOBLE_VOID",
    "manaCost": 2,
    "level": 3,
    "atk": 1810,
    "def": 1950,
    "chemicalFormula": "C60",
    "effectCode": "ELEM_B08_BUCKMINSTERFULLERENE_C60_ALLO_67",
    "effectText": "Đa dạng thù hình: Có thể thay đổi thuộc tính của quái thú này sang bất kỳ thuộc tính nào 1 lần mỗi lượt.",
    "scientificLore": "Fullerene C60 (C60) đại diện cho đỉnh cao cấu trúc hóa học vật liệu tiên tiến và xúc tác chọn lọc trong chương trình GDPT 2018.",
    "relatedEquation": "C₆₀ (Truncated Icosahedron Buckyball)",
    "iupacName": "Buckminsterfullerene C60",
    "archetype": "ALLOTROPE_PHANTOM",
    "structuredEffects": [
      {
        "effectId": "B08_EFF_67",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "RECOVER_RESOURCE",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Tăng tốc độ phản ứng hồi 1 Mana xúc tác."
      }
    ]
  },
  {
    "id": "card_b08_068_carbon_nanotube_68",
    "name": "Ống Nano Carbon — Chúa Tể Thù Hình (Dạng 68)",
    "name_en": "Carbon Nanotube — Chúa Tể Thù Hình Lattice 68",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "ELECTRO",
    "manaCost": 3,
    "level": 4,
    "atk": 2080,
    "def": 2220,
    "chemicalFormula": "CNT",
    "effectCode": "ELEM_B08_CARBON_NANOTUBE_ALLO_68",
    "effectText": "Đa dạng thù hình: Có thể thay đổi thuộc tính của quái thú này sang bất kỳ thuộc tính nào 1 lần mỗi lượt.",
    "scientificLore": "Ống Nano Carbon (CNT) đại diện cho đỉnh cao cấu trúc hóa học vật liệu tiên tiến và xúc tác chọn lọc trong chương trình GDPT 2018.",
    "relatedEquation": "Rolled Graphene Cylindrical Shell",
    "iupacName": "Carbon Nanotube",
    "archetype": "ALLOTROPE_PHANTOM",
    "structuredEffects": [
      {
        "effectId": "B08_EFF_68",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "RECOVER_RESOURCE",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Tăng tốc độ phản ứng hồi 1 Mana xúc tác."
      }
    ]
  },
  {
    "id": "card_b08_069_white_phosphorus_69",
    "name": "Photpho Trắng — Chúa Tể Thù Hình (Dạng 69)",
    "name_en": "White Phosphorus — Chúa Tể Thù Hình Lattice 69",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "PYRO",
    "manaCost": 4,
    "level": 5,
    "atk": 2350,
    "def": 2250,
    "chemicalFormula": "P4",
    "effectCode": "ELEM_B08_WHITE_PHOSPHORUS_ALLO_69",
    "effectText": "Đa dạng thù hình: Có thể thay đổi thuộc tính của quái thú này sang bất kỳ thuộc tính nào 1 lần mỗi lượt.",
    "scientificLore": "Photpho Trắng (P4) đại diện cho đỉnh cao cấu trúc hóa học vật liệu tiên tiến và xúc tác chọn lọc trong chương trình GDPT 2018.",
    "relatedEquation": "P₄ + 5O₂ → P₄O₁₀ (Self-Ignition)",
    "iupacName": "White Phosphorus",
    "archetype": "ALLOTROPE_PHANTOM",
    "structuredEffects": [
      {
        "effectId": "B08_EFF_69",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "RECOVER_RESOURCE",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Tăng tốc độ phản ứng hồi 1 Mana xúc tác."
      }
    ]
  },
  {
    "id": "card_b08_070_red_phosphorus_70",
    "name": "Photpho Đỏ — Chúa Tể Thù Hình (Dạng 70)",
    "name_en": "Red Phosphorus — Chúa Tể Thù Hình Lattice 70",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "ULTRA_RARE",
    "attribute": "PYRO",
    "manaCost": 5,
    "level": 6,
    "atk": 2620,
    "def": 2520,
    "chemicalFormula": "Pn",
    "effectCode": "ELEM_B08_RED_PHOSPHORUS_ALLO_70",
    "effectText": "Đa dạng thù hình: Có thể thay đổi thuộc tính của quái thú này sang bất kỳ thuộc tính nào 1 lần mỗi lượt.",
    "scientificLore": "Photpho Đỏ (Pn) đại diện cho đỉnh cao cấu trúc hóa học vật liệu tiên tiến và xúc tác chọn lọc trong chương trình GDPT 2018.",
    "relatedEquation": "P₄(white) --heat--> Pn(red)",
    "iupacName": "Red Phosphorus",
    "archetype": "ALLOTROPE_PHANTOM",
    "structuredEffects": [
      {
        "effectId": "B08_EFF_70",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "RECOVER_RESOURCE",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Tăng tốc độ phản ứng hồi 1 Mana xúc tác."
      }
    ]
  },
  {
    "id": "card_b08_071_ziegler_natta_catalyst_71",
    "name": "Xúc Tác Ziegler-Natta — Kẻ Thúc Đẩy Phản Ứng (Dạng 71)",
    "name_en": "Ziegler-Natta Catalyst — Kẻ Thúc Đẩy Phản Ứng Lattice 71",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SECRET_RARE",
    "attribute": "ELECTRO",
    "manaCost": 5,
    "level": 7,
    "atk": 2640,
    "def": 2790,
    "chemicalFormula": "TiCl4·Al(C2H5)3",
    "effectCode": "ELEM_B08_ZIEGLER_NATTA_CATALYST_ALLO_71",
    "effectText": "Hạ thấp năng lượng hoạt hóa: Giảm 1 Mana triệu hồi cho quái thú tiếp theo từ tay trong lượt này.",
    "scientificLore": "Xúc Tác Ziegler-Natta (TiCl4·Al(C2H5)3) đại diện cho đỉnh cao cấu trúc hóa học vật liệu tiên tiến và xúc tác chọn lọc trong chương trình GDPT 2018.",
    "relatedEquation": "TiCl₄ + Al(C₂H₅)₃ → Active Polymerization Center",
    "iupacName": "Ziegler-Natta Catalyst",
    "archetype": "ORGANOMETALLIC_CATALYSIS",
    "structuredEffects": [
      {
        "effectId": "B08_EFF_71",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "RECOVER_RESOURCE",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Tăng tốc độ phản ứng hồi 1 Mana xúc tác."
      }
    ]
  },
  {
    "id": "card_b08_072_grignard_reagent_72",
    "name": "Thuốc Thử Grignard — Kẻ Thúc Đẩy Phản Ứng (Dạng 72)",
    "name_en": "Grignard Reagent — Kẻ Thúc Đẩy Phản Ứng Lattice 72",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "PYRO",
    "manaCost": 6,
    "level": 8,
    "atk": 2910,
    "def": 3060,
    "chemicalFormula": "R-Mg-X",
    "effectCode": "ELEM_B08_GRIGNARD_REAGENT_ALLO_72",
    "effectText": "Hạ thấp năng lượng hoạt hóa: Giảm 1 Mana triệu hồi cho quái thú tiếp theo từ tay trong lượt này.",
    "scientificLore": "Thuốc Thử Grignard (R-Mg-X) đại diện cho đỉnh cao cấu trúc hóa học vật liệu tiên tiến và xúc tác chọn lọc trong chương trình GDPT 2018.",
    "relatedEquation": "R-X + Mg → R-Mg-X",
    "iupacName": "Grignard Reagent",
    "archetype": "ORGANOMETALLIC_CATALYSIS",
    "structuredEffects": [
      {
        "effectId": "B08_EFF_72",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "RECOVER_RESOURCE",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Tăng tốc độ phản ứng hồi 1 Mana xúc tác."
      }
    ]
  },
  {
    "id": "card_b08_073_wilkinson_catalyst_73",
    "name": "Xúc Tác Wilkinson — Kẻ Thúc Đẩy Phản Ứng (Dạng 73)",
    "name_en": "Wilkinson Catalyst — Kẻ Thúc Đẩy Phản Ứng Lattice 73",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "AQUA",
    "manaCost": 2,
    "level": 3,
    "atk": 1860,
    "def": 1830,
    "chemicalFormula": "RhCl(PPh3)3",
    "effectCode": "ELEM_B08_WILKINSON_CATALYST_ALLO_73",
    "effectText": "Hạ thấp năng lượng hoạt hóa: Giảm 1 Mana triệu hồi cho quái thú tiếp theo từ tay trong lượt này.",
    "scientificLore": "Xúc Tác Wilkinson (RhCl(PPh3)3) đại diện cho đỉnh cao cấu trúc hóa học vật liệu tiên tiến và xúc tác chọn lọc trong chương trình GDPT 2018.",
    "relatedEquation": "RhCl(PPh₃)₃ + H₂ → Active Hydrogenation Specie",
    "iupacName": "Wilkinson Catalyst",
    "archetype": "ORGANOMETALLIC_CATALYSIS",
    "structuredEffects": [
      {
        "effectId": "B08_EFF_73",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "RECOVER_RESOURCE",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Tăng tốc độ phản ứng hồi 1 Mana xúc tác."
      }
    ]
  },
  {
    "id": "card_b08_074_graphite_lattice_74",
    "name": "Than Chì Graphite — Kẻ Thúc Đẩy Phản Ứng (Dạng 74)",
    "name_en": "Graphite Lattice — Kẻ Thúc Đẩy Phản Ứng Lattice 74",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "TERRA",
    "manaCost": 3,
    "level": 4,
    "atk": 2130,
    "def": 2100,
    "chemicalFormula": "C",
    "effectCode": "ELEM_B08_GRAPHITE_LATTICE_ALLO_74",
    "effectText": "Đa dạng thù hình: Có thể thay đổi thuộc tính của quái thú này sang bất kỳ thuộc tính nào 1 lần mỗi lượt.",
    "scientificLore": "Than Chì Graphite (C) đại diện cho đỉnh cao cấu trúc hóa học vật liệu tiên tiến và xúc tác chọn lọc trong chương trình GDPT 2018.",
    "relatedEquation": "C(graphite) (sp² Hexagonal Layers)",
    "iupacName": "Graphite Lattice",
    "archetype": "ALLOTROPE_PHANTOM",
    "structuredEffects": [
      {
        "effectId": "B08_EFF_74",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "RECOVER_RESOURCE",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Tăng tốc độ phản ứng hồi 1 Mana xúc tác."
      }
    ]
  },
  {
    "id": "card_b08_075_diamond_octahedral_75",
    "name": "Kim Cương Bát Diện — Kẻ Thúc Đẩy Phản Ứng (Dạng 75)",
    "name_en": "Diamond Octahedral — Kẻ Thúc Đẩy Phản Ứng Lattice 75",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "NOBLE_VOID",
    "manaCost": 4,
    "level": 5,
    "atk": 2400,
    "def": 2370,
    "chemicalFormula": "C",
    "effectCode": "ELEM_B08_DIAMOND_OCTAHEDRAL_ALLO_75",
    "effectText": "Đa dạng thù hình: Có thể thay đổi thuộc tính của quái thú này sang bất kỳ thuộc tính nào 1 lần mỗi lượt.",
    "scientificLore": "Kim Cương Bát Diện (C) đại diện cho đỉnh cao cấu trúc hóa học vật liệu tiên tiến và xúc tác chọn lọc trong chương trình GDPT 2018.",
    "relatedEquation": "C(diamond) (sp³ Tetrahedral Giant Lattice)",
    "iupacName": "Diamond Octahedral",
    "archetype": "ALLOTROPE_PHANTOM",
    "structuredEffects": [
      {
        "effectId": "B08_EFF_75",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "RECOVER_RESOURCE",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Tăng tốc độ phản ứng hồi 1 Mana xúc tác."
      }
    ]
  },
  {
    "id": "card_b08_076_graphene_monolayer_76",
    "name": "Graphene Đơn Lớp — Kẻ Thúc Đẩy Phản Ứng (Dạng 76)",
    "name_en": "Graphene Monolayer — Kẻ Thúc Đẩy Phản Ứng Lattice 76",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "ELECTRO",
    "manaCost": 5,
    "level": 6,
    "atk": 2420,
    "def": 2640,
    "chemicalFormula": "C",
    "effectCode": "ELEM_B08_GRAPHENE_MONOLAYER_ALLO_76",
    "effectText": "Đa dạng thù hình: Có thể thay đổi thuộc tính của quái thú này sang bất kỳ thuộc tính nào 1 lần mỗi lượt.",
    "scientificLore": "Graphene Đơn Lớp (C) đại diện cho đỉnh cao cấu trúc hóa học vật liệu tiên tiến và xúc tác chọn lọc trong chương trình GDPT 2018.",
    "relatedEquation": "Graphene (2D Hexagonal Carbon Network)",
    "iupacName": "Graphene Monolayer",
    "archetype": "ALLOTROPE_PHANTOM",
    "structuredEffects": [
      {
        "effectId": "B08_EFF_76",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "RECOVER_RESOURCE",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Tăng tốc độ phản ứng hồi 1 Mana xúc tác."
      }
    ]
  },
  {
    "id": "card_b08_077_buckminsterfullerene_c60_77",
    "name": "Fullerene C60 — Kẻ Thúc Đẩy Phản Ứng (Dạng 77)",
    "name_en": "Buckminsterfullerene C60 — Kẻ Thúc Đẩy Phản Ứng Lattice 77",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "NOBLE_VOID",
    "manaCost": 5,
    "level": 7,
    "atk": 2690,
    "def": 2670,
    "chemicalFormula": "C60",
    "effectCode": "ELEM_B08_BUCKMINSTERFULLERENE_C60_ALLO_77",
    "effectText": "Đa dạng thù hình: Có thể thay đổi thuộc tính của quái thú này sang bất kỳ thuộc tính nào 1 lần mỗi lượt.",
    "scientificLore": "Fullerene C60 (C60) đại diện cho đỉnh cao cấu trúc hóa học vật liệu tiên tiến và xúc tác chọn lọc trong chương trình GDPT 2018.",
    "relatedEquation": "C₆₀ (Truncated Icosahedron Buckyball)",
    "iupacName": "Buckminsterfullerene C60",
    "archetype": "ALLOTROPE_PHANTOM",
    "structuredEffects": [
      {
        "effectId": "B08_EFF_77",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "RECOVER_RESOURCE",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Tăng tốc độ phản ứng hồi 1 Mana xúc tác."
      }
    ]
  },
  {
    "id": "card_b08_078_carbon_nanotube_78",
    "name": "Ống Nano Carbon — Kẻ Thúc Đẩy Phản Ứng (Dạng 78)",
    "name_en": "Carbon Nanotube — Kẻ Thúc Đẩy Phản Ứng Lattice 78",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "ELECTRO",
    "manaCost": 6,
    "level": 8,
    "atk": 2960,
    "def": 2940,
    "chemicalFormula": "CNT",
    "effectCode": "ELEM_B08_CARBON_NANOTUBE_ALLO_78",
    "effectText": "Đa dạng thù hình: Có thể thay đổi thuộc tính của quái thú này sang bất kỳ thuộc tính nào 1 lần mỗi lượt.",
    "scientificLore": "Ống Nano Carbon (CNT) đại diện cho đỉnh cao cấu trúc hóa học vật liệu tiên tiến và xúc tác chọn lọc trong chương trình GDPT 2018.",
    "relatedEquation": "Rolled Graphene Cylindrical Shell",
    "iupacName": "Carbon Nanotube",
    "archetype": "ALLOTROPE_PHANTOM",
    "structuredEffects": [
      {
        "effectId": "B08_EFF_78",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "RECOVER_RESOURCE",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Tăng tốc độ phản ứng hồi 1 Mana xúc tác."
      }
    ]
  },
  {
    "id": "card_b08_079_white_phosphorus_79",
    "name": "Photpho Trắng — Kẻ Thúc Đẩy Phản Ứng (Dạng 79)",
    "name_en": "White Phosphorus — Kẻ Thúc Đẩy Phản Ứng Lattice 79",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "ULTRA_RARE",
    "attribute": "PYRO",
    "manaCost": 2,
    "level": 3,
    "atk": 1910,
    "def": 1950,
    "chemicalFormula": "P4",
    "effectCode": "ELEM_B08_WHITE_PHOSPHORUS_ALLO_79",
    "effectText": "Đa dạng thù hình: Có thể thay đổi thuộc tính của quái thú này sang bất kỳ thuộc tính nào 1 lần mỗi lượt.",
    "scientificLore": "Photpho Trắng (P4) đại diện cho đỉnh cao cấu trúc hóa học vật liệu tiên tiến và xúc tác chọn lọc trong chương trình GDPT 2018.",
    "relatedEquation": "P₄ + 5O₂ → P₄O₁₀ (Self-Ignition)",
    "iupacName": "White Phosphorus",
    "archetype": "ALLOTROPE_PHANTOM",
    "structuredEffects": [
      {
        "effectId": "B08_EFF_79",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "RECOVER_RESOURCE",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Tăng tốc độ phản ứng hồi 1 Mana xúc tác."
      }
    ]
  },
  {
    "id": "card_b08_080_red_phosphorus_80",
    "name": "Photpho Đỏ — Kẻ Thúc Đẩy Phản Ứng (Dạng 80)",
    "name_en": "Red Phosphorus — Kẻ Thúc Đẩy Phản Ứng Lattice 80",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SECRET_RARE",
    "attribute": "PYRO",
    "manaCost": 3,
    "level": 4,
    "atk": 2180,
    "def": 2220,
    "chemicalFormula": "Pn",
    "effectCode": "ELEM_B08_RED_PHOSPHORUS_ALLO_80",
    "effectText": "Đa dạng thù hình: Có thể thay đổi thuộc tính của quái thú này sang bất kỳ thuộc tính nào 1 lần mỗi lượt.",
    "scientificLore": "Photpho Đỏ (Pn) đại diện cho đỉnh cao cấu trúc hóa học vật liệu tiên tiến và xúc tác chọn lọc trong chương trình GDPT 2018.",
    "relatedEquation": "P₄(white) --heat--> Pn(red)",
    "iupacName": "Red Phosphorus",
    "archetype": "ALLOTROPE_PHANTOM",
    "structuredEffects": [
      {
        "effectId": "B08_EFF_80",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "RECOVER_RESOURCE",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Tăng tốc độ phản ứng hồi 1 Mana xúc tác."
      }
    ]
  },
  {
    "id": "card_b08_081_ziegler_natta_catalyst_81",
    "name": "Xúc Tác Ziegler-Natta — Lưới Tinh Thể (Dạng 81)",
    "name_en": "Ziegler-Natta Catalyst — Lưới Tinh Thể Lattice 81",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "ELECTRO",
    "manaCost": 4,
    "level": 5,
    "atk": 2200,
    "def": 2250,
    "chemicalFormula": "TiCl4·Al(C2H5)3",
    "effectCode": "ELEM_B08_ZIEGLER_NATTA_CATALYST_ALLO_81",
    "effectText": "Hạ thấp năng lượng hoạt hóa: Giảm 1 Mana triệu hồi cho quái thú tiếp theo từ tay trong lượt này.",
    "scientificLore": "Xúc Tác Ziegler-Natta (TiCl4·Al(C2H5)3) đại diện cho đỉnh cao cấu trúc hóa học vật liệu tiên tiến và xúc tác chọn lọc trong chương trình GDPT 2018.",
    "relatedEquation": "TiCl₄ + Al(C₂H₅)₃ → Active Polymerization Center",
    "iupacName": "Ziegler-Natta Catalyst",
    "archetype": "ORGANOMETALLIC_CATALYSIS",
    "structuredEffects": [
      {
        "effectId": "B08_EFF_81",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "RECOVER_RESOURCE",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Tăng tốc độ phản ứng hồi 1 Mana xúc tác."
      }
    ]
  },
  {
    "id": "card_b08_082_grignard_reagent_82",
    "name": "Thuốc Thử Grignard — Lưới Tinh Thể (Dạng 82)",
    "name_en": "Grignard Reagent — Lưới Tinh Thể Lattice 82",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "PYRO",
    "manaCost": 5,
    "level": 6,
    "atk": 2470,
    "def": 2520,
    "chemicalFormula": "R-Mg-X",
    "effectCode": "ELEM_B08_GRIGNARD_REAGENT_ALLO_82",
    "effectText": "Hạ thấp năng lượng hoạt hóa: Giảm 1 Mana triệu hồi cho quái thú tiếp theo từ tay trong lượt này.",
    "scientificLore": "Thuốc Thử Grignard (R-Mg-X) đại diện cho đỉnh cao cấu trúc hóa học vật liệu tiên tiến và xúc tác chọn lọc trong chương trình GDPT 2018.",
    "relatedEquation": "R-X + Mg → R-Mg-X",
    "iupacName": "Grignard Reagent",
    "archetype": "ORGANOMETALLIC_CATALYSIS",
    "structuredEffects": [
      {
        "effectId": "B08_EFF_82",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "RECOVER_RESOURCE",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Tăng tốc độ phản ứng hồi 1 Mana xúc tác."
      }
    ]
  },
  {
    "id": "card_b08_083_wilkinson_catalyst_83",
    "name": "Xúc Tác Wilkinson — Lưới Tinh Thể (Dạng 83)",
    "name_en": "Wilkinson Catalyst — Lưới Tinh Thể Lattice 83",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "AQUA",
    "manaCost": 5,
    "level": 7,
    "atk": 2740,
    "def": 2790,
    "chemicalFormula": "RhCl(PPh3)3",
    "effectCode": "ELEM_B08_WILKINSON_CATALYST_ALLO_83",
    "effectText": "Hạ thấp năng lượng hoạt hóa: Giảm 1 Mana triệu hồi cho quái thú tiếp theo từ tay trong lượt này.",
    "scientificLore": "Xúc Tác Wilkinson (RhCl(PPh3)3) đại diện cho đỉnh cao cấu trúc hóa học vật liệu tiên tiến và xúc tác chọn lọc trong chương trình GDPT 2018.",
    "relatedEquation": "RhCl(PPh₃)₃ + H₂ → Active Hydrogenation Specie",
    "iupacName": "Wilkinson Catalyst",
    "archetype": "ORGANOMETALLIC_CATALYSIS",
    "structuredEffects": [
      {
        "effectId": "B08_EFF_83",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "RECOVER_RESOURCE",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Tăng tốc độ phản ứng hồi 1 Mana xúc tác."
      }
    ]
  },
  {
    "id": "card_b08_084_graphite_lattice_84",
    "name": "Than Chì Graphite — Lưới Tinh Thể (Dạng 84)",
    "name_en": "Graphite Lattice — Lưới Tinh Thể Lattice 84",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "TERRA",
    "manaCost": 6,
    "level": 8,
    "atk": 3010,
    "def": 3060,
    "chemicalFormula": "C",
    "effectCode": "ELEM_B08_GRAPHITE_LATTICE_ALLO_84",
    "effectText": "Đa dạng thù hình: Có thể thay đổi thuộc tính của quái thú này sang bất kỳ thuộc tính nào 1 lần mỗi lượt.",
    "scientificLore": "Than Chì Graphite (C) đại diện cho đỉnh cao cấu trúc hóa học vật liệu tiên tiến và xúc tác chọn lọc trong chương trình GDPT 2018.",
    "relatedEquation": "C(graphite) (sp² Hexagonal Layers)",
    "iupacName": "Graphite Lattice",
    "archetype": "ALLOTROPE_PHANTOM",
    "structuredEffects": [
      {
        "effectId": "B08_EFF_84",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "RECOVER_RESOURCE",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Tăng tốc độ phản ứng hồi 1 Mana xúc tác."
      }
    ]
  },
  {
    "id": "card_b08_085_diamond_octahedral_85",
    "name": "Kim Cương Bát Diện — Lưới Tinh Thể (Dạng 85)",
    "name_en": "Diamond Octahedral — Lưới Tinh Thể Lattice 85",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "NOBLE_VOID",
    "manaCost": 2,
    "level": 3,
    "atk": 1960,
    "def": 1830,
    "chemicalFormula": "C",
    "effectCode": "ELEM_B08_DIAMOND_OCTAHEDRAL_ALLO_85",
    "effectText": "Đa dạng thù hình: Có thể thay đổi thuộc tính của quái thú này sang bất kỳ thuộc tính nào 1 lần mỗi lượt.",
    "scientificLore": "Kim Cương Bát Diện (C) đại diện cho đỉnh cao cấu trúc hóa học vật liệu tiên tiến và xúc tác chọn lọc trong chương trình GDPT 2018.",
    "relatedEquation": "C(diamond) (sp³ Tetrahedral Giant Lattice)",
    "iupacName": "Diamond Octahedral",
    "archetype": "ALLOTROPE_PHANTOM",
    "structuredEffects": [
      {
        "effectId": "B08_EFF_85",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "RECOVER_RESOURCE",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Tăng tốc độ phản ứng hồi 1 Mana xúc tác."
      }
    ]
  },
  {
    "id": "card_b08_086_graphene_monolayer_86",
    "name": "Graphene Đơn Lớp — Lưới Tinh Thể (Dạng 86)",
    "name_en": "Graphene Monolayer — Lưới Tinh Thể Lattice 86",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "ELECTRO",
    "manaCost": 3,
    "level": 4,
    "atk": 1980,
    "def": 2100,
    "chemicalFormula": "C",
    "effectCode": "ELEM_B08_GRAPHENE_MONOLAYER_ALLO_86",
    "effectText": "Đa dạng thù hình: Có thể thay đổi thuộc tính của quái thú này sang bất kỳ thuộc tính nào 1 lần mỗi lượt.",
    "scientificLore": "Graphene Đơn Lớp (C) đại diện cho đỉnh cao cấu trúc hóa học vật liệu tiên tiến và xúc tác chọn lọc trong chương trình GDPT 2018.",
    "relatedEquation": "Graphene (2D Hexagonal Carbon Network)",
    "iupacName": "Graphene Monolayer",
    "archetype": "ALLOTROPE_PHANTOM",
    "structuredEffects": [
      {
        "effectId": "B08_EFF_86",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "RECOVER_RESOURCE",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Tăng tốc độ phản ứng hồi 1 Mana xúc tác."
      }
    ]
  },
  {
    "id": "card_b08_087_buckminsterfullerene_c60_87",
    "name": "Fullerene C60 — Lưới Tinh Thể (Dạng 87)",
    "name_en": "Buckminsterfullerene C60 — Lưới Tinh Thể Lattice 87",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "NOBLE_VOID",
    "manaCost": 4,
    "level": 5,
    "atk": 2250,
    "def": 2370,
    "chemicalFormula": "C60",
    "effectCode": "ELEM_B08_BUCKMINSTERFULLERENE_C60_ALLO_87",
    "effectText": "Đa dạng thù hình: Có thể thay đổi thuộc tính của quái thú này sang bất kỳ thuộc tính nào 1 lần mỗi lượt.",
    "scientificLore": "Fullerene C60 (C60) đại diện cho đỉnh cao cấu trúc hóa học vật liệu tiên tiến và xúc tác chọn lọc trong chương trình GDPT 2018.",
    "relatedEquation": "C₆₀ (Truncated Icosahedron Buckyball)",
    "iupacName": "Buckminsterfullerene C60",
    "archetype": "ALLOTROPE_PHANTOM",
    "structuredEffects": [
      {
        "effectId": "B08_EFF_87",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "RECOVER_RESOURCE",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Tăng tốc độ phản ứng hồi 1 Mana xúc tác."
      }
    ]
  },
  {
    "id": "card_b08_088_carbon_nanotube_88",
    "name": "Ống Nano Carbon — Lưới Tinh Thể (Dạng 88)",
    "name_en": "Carbon Nanotube — Lưới Tinh Thể Lattice 88",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "ULTRA_RARE",
    "attribute": "ELECTRO",
    "manaCost": 5,
    "level": 6,
    "atk": 2520,
    "def": 2640,
    "chemicalFormula": "CNT",
    "effectCode": "ELEM_B08_CARBON_NANOTUBE_ALLO_88",
    "effectText": "Đa dạng thù hình: Có thể thay đổi thuộc tính của quái thú này sang bất kỳ thuộc tính nào 1 lần mỗi lượt.",
    "scientificLore": "Ống Nano Carbon (CNT) đại diện cho đỉnh cao cấu trúc hóa học vật liệu tiên tiến và xúc tác chọn lọc trong chương trình GDPT 2018.",
    "relatedEquation": "Rolled Graphene Cylindrical Shell",
    "iupacName": "Carbon Nanotube",
    "archetype": "ALLOTROPE_PHANTOM",
    "structuredEffects": [
      {
        "effectId": "B08_EFF_88",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "RECOVER_RESOURCE",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Tăng tốc độ phản ứng hồi 1 Mana xúc tác."
      }
    ]
  },
  {
    "id": "card_b08_089_white_phosphorus_89",
    "name": "Photpho Trắng — Lưới Tinh Thể (Dạng 89)",
    "name_en": "White Phosphorus — Lưới Tinh Thể Lattice 89",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SECRET_RARE",
    "attribute": "PYRO",
    "manaCost": 5,
    "level": 7,
    "atk": 2790,
    "def": 2670,
    "chemicalFormula": "P4",
    "effectCode": "ELEM_B08_WHITE_PHOSPHORUS_ALLO_89",
    "effectText": "Đa dạng thù hình: Có thể thay đổi thuộc tính của quái thú này sang bất kỳ thuộc tính nào 1 lần mỗi lượt.",
    "scientificLore": "Photpho Trắng (P4) đại diện cho đỉnh cao cấu trúc hóa học vật liệu tiên tiến và xúc tác chọn lọc trong chương trình GDPT 2018.",
    "relatedEquation": "P₄ + 5O₂ → P₄O₁₀ (Self-Ignition)",
    "iupacName": "White Phosphorus",
    "archetype": "ALLOTROPE_PHANTOM",
    "structuredEffects": [
      {
        "effectId": "B08_EFF_89",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "RECOVER_RESOURCE",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Tăng tốc độ phản ứng hồi 1 Mana xúc tác."
      }
    ]
  },
  {
    "id": "card_b08_090_red_phosphorus_90",
    "name": "Photpho Đỏ — Lưới Tinh Thể (Dạng 90)",
    "name_en": "Red Phosphorus — Lưới Tinh Thể Lattice 90",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "PYRO",
    "manaCost": 6,
    "level": 8,
    "atk": 3060,
    "def": 2940,
    "chemicalFormula": "Pn",
    "effectCode": "ELEM_B08_RED_PHOSPHORUS_ALLO_90",
    "effectText": "Đa dạng thù hình: Có thể thay đổi thuộc tính của quái thú này sang bất kỳ thuộc tính nào 1 lần mỗi lượt.",
    "scientificLore": "Photpho Đỏ (Pn) đại diện cho đỉnh cao cấu trúc hóa học vật liệu tiên tiến và xúc tác chọn lọc trong chương trình GDPT 2018.",
    "relatedEquation": "P₄(white) --heat--> Pn(red)",
    "iupacName": "Red Phosphorus",
    "archetype": "ALLOTROPE_PHANTOM",
    "structuredEffects": [
      {
        "effectId": "B08_EFF_90",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "RECOVER_RESOURCE",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Tăng tốc độ phản ứng hồi 1 Mana xúc tác."
      }
    ]
  },
  {
    "id": "card_b08_091_ziegler_natta_catalyst_91",
    "name": "Xúc Tác Ziegler-Natta — Trung Tâm Hoạt Hóa (Dạng 91)",
    "name_en": "Ziegler-Natta Catalyst — Trung Tâm Hoạt Hóa Lattice 91",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "ELECTRO",
    "manaCost": 2,
    "level": 3,
    "atk": 1760,
    "def": 1950,
    "chemicalFormula": "TiCl4·Al(C2H5)3",
    "effectCode": "ELEM_B08_ZIEGLER_NATTA_CATALYST_ALLO_91",
    "effectText": "Hạ thấp năng lượng hoạt hóa: Giảm 1 Mana triệu hồi cho quái thú tiếp theo từ tay trong lượt này.",
    "scientificLore": "Xúc Tác Ziegler-Natta (TiCl4·Al(C2H5)3) đại diện cho đỉnh cao cấu trúc hóa học vật liệu tiên tiến và xúc tác chọn lọc trong chương trình GDPT 2018.",
    "relatedEquation": "TiCl₄ + Al(C₂H₅)₃ → Active Polymerization Center",
    "iupacName": "Ziegler-Natta Catalyst",
    "archetype": "ORGANOMETALLIC_CATALYSIS",
    "structuredEffects": [
      {
        "effectId": "B08_EFF_91",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "RECOVER_RESOURCE",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Tăng tốc độ phản ứng hồi 1 Mana xúc tác."
      }
    ]
  },
  {
    "id": "card_b08_092_grignard_reagent_92",
    "name": "Thuốc Thử Grignard — Trung Tâm Hoạt Hóa (Dạng 92)",
    "name_en": "Grignard Reagent — Trung Tâm Hoạt Hóa Lattice 92",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "PYRO",
    "manaCost": 3,
    "level": 4,
    "atk": 2030,
    "def": 2220,
    "chemicalFormula": "R-Mg-X",
    "effectCode": "ELEM_B08_GRIGNARD_REAGENT_ALLO_92",
    "effectText": "Hạ thấp năng lượng hoạt hóa: Giảm 1 Mana triệu hồi cho quái thú tiếp theo từ tay trong lượt này.",
    "scientificLore": "Thuốc Thử Grignard (R-Mg-X) đại diện cho đỉnh cao cấu trúc hóa học vật liệu tiên tiến và xúc tác chọn lọc trong chương trình GDPT 2018.",
    "relatedEquation": "R-X + Mg → R-Mg-X",
    "iupacName": "Grignard Reagent",
    "archetype": "ORGANOMETALLIC_CATALYSIS",
    "structuredEffects": [
      {
        "effectId": "B08_EFF_92",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "RECOVER_RESOURCE",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Tăng tốc độ phản ứng hồi 1 Mana xúc tác."
      }
    ]
  },
  {
    "id": "card_b08_093_wilkinson_catalyst_93",
    "name": "Xúc Tác Wilkinson — Trung Tâm Hoạt Hóa (Dạng 93)",
    "name_en": "Wilkinson Catalyst — Trung Tâm Hoạt Hóa Lattice 93",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "AQUA",
    "manaCost": 4,
    "level": 5,
    "atk": 2300,
    "def": 2250,
    "chemicalFormula": "RhCl(PPh3)3",
    "effectCode": "ELEM_B08_WILKINSON_CATALYST_ALLO_93",
    "effectText": "Hạ thấp năng lượng hoạt hóa: Giảm 1 Mana triệu hồi cho quái thú tiếp theo từ tay trong lượt này.",
    "scientificLore": "Xúc Tác Wilkinson (RhCl(PPh3)3) đại diện cho đỉnh cao cấu trúc hóa học vật liệu tiên tiến và xúc tác chọn lọc trong chương trình GDPT 2018.",
    "relatedEquation": "RhCl(PPh₃)₃ + H₂ → Active Hydrogenation Specie",
    "iupacName": "Wilkinson Catalyst",
    "archetype": "ORGANOMETALLIC_CATALYSIS",
    "structuredEffects": [
      {
        "effectId": "B08_EFF_93",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "RECOVER_RESOURCE",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Tăng tốc độ phản ứng hồi 1 Mana xúc tác."
      }
    ]
  },
  {
    "id": "card_b08_094_graphite_lattice_94",
    "name": "Than Chì Graphite — Trung Tâm Hoạt Hóa (Dạng 94)",
    "name_en": "Graphite Lattice — Trung Tâm Hoạt Hóa Lattice 94",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "TERRA",
    "manaCost": 5,
    "level": 6,
    "atk": 2570,
    "def": 2520,
    "chemicalFormula": "C",
    "effectCode": "ELEM_B08_GRAPHITE_LATTICE_ALLO_94",
    "effectText": "Đa dạng thù hình: Có thể thay đổi thuộc tính của quái thú này sang bất kỳ thuộc tính nào 1 lần mỗi lượt.",
    "scientificLore": "Than Chì Graphite (C) đại diện cho đỉnh cao cấu trúc hóa học vật liệu tiên tiến và xúc tác chọn lọc trong chương trình GDPT 2018.",
    "relatedEquation": "C(graphite) (sp² Hexagonal Layers)",
    "iupacName": "Graphite Lattice",
    "archetype": "ALLOTROPE_PHANTOM",
    "structuredEffects": [
      {
        "effectId": "B08_EFF_94",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "RECOVER_RESOURCE",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Tăng tốc độ phản ứng hồi 1 Mana xúc tác."
      }
    ]
  },
  {
    "id": "card_b08_095_diamond_octahedral_95",
    "name": "Kim Cương Bát Diện — Trung Tâm Hoạt Hóa (Dạng 95)",
    "name_en": "Diamond Octahedral — Trung Tâm Hoạt Hóa Lattice 95",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "NOBLE_VOID",
    "manaCost": 5,
    "level": 7,
    "atk": 2840,
    "def": 2790,
    "chemicalFormula": "C",
    "effectCode": "ELEM_B08_DIAMOND_OCTAHEDRAL_ALLO_95",
    "effectText": "Đa dạng thù hình: Có thể thay đổi thuộc tính của quái thú này sang bất kỳ thuộc tính nào 1 lần mỗi lượt.",
    "scientificLore": "Kim Cương Bát Diện (C) đại diện cho đỉnh cao cấu trúc hóa học vật liệu tiên tiến và xúc tác chọn lọc trong chương trình GDPT 2018.",
    "relatedEquation": "C(diamond) (sp³ Tetrahedral Giant Lattice)",
    "iupacName": "Diamond Octahedral",
    "archetype": "ALLOTROPE_PHANTOM",
    "structuredEffects": [
      {
        "effectId": "B08_EFF_95",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "RECOVER_RESOURCE",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Tăng tốc độ phản ứng hồi 1 Mana xúc tác."
      }
    ]
  },
  {
    "id": "card_b08_096_graphene_monolayer_96",
    "name": "Graphene Đơn Lớp — Trung Tâm Hoạt Hóa (Dạng 96)",
    "name_en": "Graphene Monolayer — Trung Tâm Hoạt Hóa Lattice 96",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "ELECTRO",
    "manaCost": 6,
    "level": 8,
    "atk": 2860,
    "def": 3060,
    "chemicalFormula": "C",
    "effectCode": "ELEM_B08_GRAPHENE_MONOLAYER_ALLO_96",
    "effectText": "Đa dạng thù hình: Có thể thay đổi thuộc tính của quái thú này sang bất kỳ thuộc tính nào 1 lần mỗi lượt.",
    "scientificLore": "Graphene Đơn Lớp (C) đại diện cho đỉnh cao cấu trúc hóa học vật liệu tiên tiến và xúc tác chọn lọc trong chương trình GDPT 2018.",
    "relatedEquation": "Graphene (2D Hexagonal Carbon Network)",
    "iupacName": "Graphene Monolayer",
    "archetype": "ALLOTROPE_PHANTOM",
    "structuredEffects": [
      {
        "effectId": "B08_EFF_96",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "RECOVER_RESOURCE",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Tăng tốc độ phản ứng hồi 1 Mana xúc tác."
      }
    ]
  },
  {
    "id": "card_b08_097_buckminsterfullerene_c60_97",
    "name": "Fullerene C60 — Trung Tâm Hoạt Hóa (Dạng 97)",
    "name_en": "Buckminsterfullerene C60 — Trung Tâm Hoạt Hóa Lattice 97",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "ULTRA_RARE",
    "attribute": "NOBLE_VOID",
    "manaCost": 2,
    "level": 3,
    "atk": 1810,
    "def": 1830,
    "chemicalFormula": "C60",
    "effectCode": "ELEM_B08_BUCKMINSTERFULLERENE_C60_ALLO_97",
    "effectText": "Đa dạng thù hình: Có thể thay đổi thuộc tính của quái thú này sang bất kỳ thuộc tính nào 1 lần mỗi lượt.",
    "scientificLore": "Fullerene C60 (C60) đại diện cho đỉnh cao cấu trúc hóa học vật liệu tiên tiến và xúc tác chọn lọc trong chương trình GDPT 2018.",
    "relatedEquation": "C₆₀ (Truncated Icosahedron Buckyball)",
    "iupacName": "Buckminsterfullerene C60",
    "archetype": "ALLOTROPE_PHANTOM",
    "structuredEffects": [
      {
        "effectId": "B08_EFF_97",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "RECOVER_RESOURCE",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Tăng tốc độ phản ứng hồi 1 Mana xúc tác."
      }
    ]
  },
  {
    "id": "card_b08_098_carbon_nanotube_98",
    "name": "Ống Nano Carbon — Trung Tâm Hoạt Hóa (Dạng 98)",
    "name_en": "Carbon Nanotube — Trung Tâm Hoạt Hóa Lattice 98",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SECRET_RARE",
    "attribute": "ELECTRO",
    "manaCost": 3,
    "level": 4,
    "atk": 2080,
    "def": 2100,
    "chemicalFormula": "CNT",
    "effectCode": "ELEM_B08_CARBON_NANOTUBE_ALLO_98",
    "effectText": "Đa dạng thù hình: Có thể thay đổi thuộc tính của quái thú này sang bất kỳ thuộc tính nào 1 lần mỗi lượt.",
    "scientificLore": "Ống Nano Carbon (CNT) đại diện cho đỉnh cao cấu trúc hóa học vật liệu tiên tiến và xúc tác chọn lọc trong chương trình GDPT 2018.",
    "relatedEquation": "Rolled Graphene Cylindrical Shell",
    "iupacName": "Carbon Nanotube",
    "archetype": "ALLOTROPE_PHANTOM",
    "structuredEffects": [
      {
        "effectId": "B08_EFF_98",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "RECOVER_RESOURCE",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Tăng tốc độ phản ứng hồi 1 Mana xúc tác."
      }
    ]
  },
  {
    "id": "card_b08_099_white_phosphorus_99",
    "name": "Photpho Trắng — Trung Tâm Hoạt Hóa (Dạng 99)",
    "name_en": "White Phosphorus — Trung Tâm Hoạt Hóa Lattice 99",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "PYRO",
    "manaCost": 4,
    "level": 5,
    "atk": 2350,
    "def": 2370,
    "chemicalFormula": "P4",
    "effectCode": "ELEM_B08_WHITE_PHOSPHORUS_ALLO_99",
    "effectText": "Đa dạng thù hình: Có thể thay đổi thuộc tính của quái thú này sang bất kỳ thuộc tính nào 1 lần mỗi lượt.",
    "scientificLore": "Photpho Trắng (P4) đại diện cho đỉnh cao cấu trúc hóa học vật liệu tiên tiến và xúc tác chọn lọc trong chương trình GDPT 2018.",
    "relatedEquation": "P₄ + 5O₂ → P₄O₁₀ (Self-Ignition)",
    "iupacName": "White Phosphorus",
    "archetype": "ALLOTROPE_PHANTOM",
    "structuredEffects": [
      {
        "effectId": "B08_EFF_99",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "RECOVER_RESOURCE",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Tăng tốc độ phản ứng hồi 1 Mana xúc tác."
      }
    ]
  },
  {
    "id": "card_b08_100_red_phosphorus_100",
    "name": "Photpho Đỏ — Trung Tâm Hoạt Hóa (Dạng 100)",
    "name_en": "Red Phosphorus — Trung Tâm Hoạt Hóa Lattice 100",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "PYRO",
    "manaCost": 5,
    "level": 6,
    "atk": 2620,
    "def": 2640,
    "chemicalFormula": "Pn",
    "effectCode": "ELEM_B08_RED_PHOSPHORUS_ALLO_100",
    "effectText": "Đa dạng thù hình: Có thể thay đổi thuộc tính của quái thú này sang bất kỳ thuộc tính nào 1 lần mỗi lượt.",
    "scientificLore": "Photpho Đỏ (Pn) đại diện cho đỉnh cao cấu trúc hóa học vật liệu tiên tiến và xúc tác chọn lọc trong chương trình GDPT 2018.",
    "relatedEquation": "P₄(white) --heat--> Pn(red)",
    "iupacName": "Red Phosphorus",
    "archetype": "ALLOTROPE_PHANTOM",
    "structuredEffects": [
      {
        "effectId": "B08_EFF_100",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "RECOVER_RESOURCE",
            "params": {
              "amount": 1
            }
          }
        ],
        "description": "Tăng tốc độ phản ứng hồi 1 Mana xúc tác."
      }
    ]
  }
];
