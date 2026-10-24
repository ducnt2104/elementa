// src/data/cards/batches/batch_14_extra_deck_link_valences.ts
// Batch 14: Extra Deck Link Valence Monsters (75 cards)
// Automatically generated and validated for ELEMENTA Tactical TCG

import { PlayableCardDef } from '../../../domain/cardGameTypes';

export const BATCH_14_CARDS: PlayableCardDef[] = [
  {
    "id": "card_b14_001_link_sigma_covalent_link_core_1",
    "name": "Liên Kết Cộng Hóa Trị Sigma — Link-1 (Mắt Xích 1)",
    "name_en": "Sigma Covalent Link Core — Link-1 Node 1",
    "cardType": "LINK_MONSTER",
    "rarity": "RARE",
    "attribute": "TERRA",
    "manaCost": 1,
    "linkRating": 1,
    "linkArrows": [
      "BOTTOM"
    ],
    "linkMaterialsRequired": {
      "minCount": 1,
      "maxCount": 1,
      "materialType": "Quái thú Nguyên tố hóa học"
    },
    "atk": 1450,
    "chemicalFormula": "σ-Bond",
    "effectCode": "LINK_B14_SIGMA_COVALENT_LINK_CORE_VAL_1",
    "effectText": "1 quái thú hóa học. Quái thú Link-1 (không có DEF và không thể chuyển sang tư thế Phòng thủ). Quái thú đồng minh ở ô được chỉ bởi Mũi tên Link nhận +300 ATK và bảo vệ khỏi bị tiêu diệt bởi hiệu ứng.",
    "scientificLore": "Liên kết hóa học (Direct Overlap of Atomic Orbitals) là lực tương tác tĩnh điện và chia sẻ electron giữ các nguyên tử lại với nhau tạo nên cấu trúc phân tử bền vững theo chuẩn IUPAC và GDPT 2018.",
    "relatedEquation": "Direct Overlap of Atomic Orbitals",
    "iupacName": "Sigma Covalent Link Core Valence",
    "archetype": "MACROMOLECULAR_POLYMER",
    "structuredEffects": [
      {
        "effectId": "B14_EFF_1",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 300 ATK cho các quái thú được liên kết qua mũi tên Link."
      }
    ]
  },
  {
    "id": "card_b14_002_link_conjugated_pi_link_resonator_2",
    "name": "Liên Kết Pi Liên Hợp Polyaxetylen — Link-2 (Mắt Xích 1)",
    "name_en": "Conjugated Pi Link Resonator — Link-2 Node 1",
    "cardType": "LINK_MONSTER",
    "rarity": "RARE",
    "attribute": "ELECTRO",
    "manaCost": 3,
    "linkRating": 2,
    "linkArrows": [
      "BOTTOM",
      "TOP"
    ],
    "linkMaterialsRequired": {
      "minCount": 2,
      "maxCount": 2,
      "materialType": "Quái thú Nguyên tố hóa học"
    },
    "atk": 1940,
    "chemicalFormula": "π-Conjugate",
    "effectCode": "LINK_B14_CONJUGATED_PI_LINK_RESONATOR_VAL_2",
    "effectText": "2 quái thú hóa học. Quái thú Link-2 (không có DEF và không thể chuyển sang tư thế Phòng thủ). Quái thú đồng minh ở ô được chỉ bởi Mũi tên Link nhận +300 ATK và bảo vệ khỏi bị tiêu diệt bởi hiệu ứng.",
    "scientificLore": "Liên kết hóa học (Lateral Overlap of Unhybridized p Orbitals) là lực tương tác tĩnh điện và chia sẻ electron giữ các nguyên tử lại với nhau tạo nên cấu trúc phân tử bền vững theo chuẩn IUPAC và GDPT 2018.",
    "relatedEquation": "Lateral Overlap of Unhybridized p Orbitals",
    "iupacName": "Conjugated Pi Link Resonator Valence",
    "archetype": "HYDROCARBON_CHAIN",
    "structuredEffects": [
      {
        "effectId": "B14_EFF_2",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 300 ATK cho các quái thú được liên kết qua mũi tên Link."
      }
    ]
  },
  {
    "id": "card_b14_003_link_hydrogen_bond_lattice_linker_3",
    "name": "Mạng Lưới Liên Kết Hydro Nước — Link-3 (Mắt Xích 1)",
    "name_en": "Hydrogen Bond Lattice Linker — Link-3 Node 1",
    "cardType": "LINK_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "AQUA",
    "manaCost": 5,
    "linkRating": 3,
    "linkArrows": [
      "BOTTOM",
      "LEFT"
    ],
    "linkMaterialsRequired": {
      "minCount": 3,
      "maxCount": 3,
      "materialType": "Quái thú Nguyên tố hóa học"
    },
    "atk": 2430,
    "chemicalFormula": "H-Bond",
    "effectCode": "LINK_B14_HYDROGEN_BOND_LATTICE_LINKER_VAL_3",
    "effectText": "3 quái thú hóa học. Quái thú Link-3 (không có DEF và không thể chuyển sang tư thế Phòng thủ). Quái thú đồng minh ở ô được chỉ bởi Mũi tên Link nhận +300 ATK và bảo vệ khỏi bị tiêu diệt bởi hiệu ứng.",
    "scientificLore": "Liên kết hóa học (δ+ H···O δ- Dipole Attraction Network) là lực tương tác tĩnh điện và chia sẻ electron giữ các nguyên tử lại với nhau tạo nên cấu trúc phân tử bền vững theo chuẩn IUPAC và GDPT 2018.",
    "relatedEquation": "δ+ H···O δ- Dipole Attraction Network",
    "iupacName": "Hydrogen Bond Lattice Linker Valence",
    "archetype": "MACROMOLECULAR_POLYMER",
    "structuredEffects": [
      {
        "effectId": "B14_EFF_3",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 300 ATK cho các quái thú được liên kết qua mũi tên Link."
      }
    ]
  },
  {
    "id": "card_b14_004_link_disulfide_crosslink_warden_4",
    "name": "Cầu Nối Disulfide Protein — Link-4 (Mắt Xích 1)",
    "name_en": "Disulfide Crosslink Warden — Link-4 Node 1",
    "cardType": "LINK_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "PYRO",
    "manaCost": 7,
    "linkRating": 4,
    "linkArrows": [
      "BOTTOM",
      "RIGHT"
    ],
    "linkMaterialsRequired": {
      "minCount": 4,
      "maxCount": 4,
      "materialType": "Quái thú Nguyên tố hóa học"
    },
    "atk": 2920,
    "chemicalFormula": "-S-S-",
    "effectCode": "LINK_B14_DISULFIDE_CROSSLINK_WARDEN_VAL_4",
    "effectText": "4 quái thú hóa học. Quái thú Link-4 (không có DEF và không thể chuyển sang tư thế Phòng thủ). Quái thú đồng minh ở ô được chỉ bởi Mũi tên Link nhận +300 ATK và bảo vệ khỏi bị tiêu diệt bởi hiệu ứng.",
    "scientificLore": "Liên kết hóa học (2 Cysteine-SH + [O] → Cystine-S-S- + H₂O) là lực tương tác tĩnh điện và chia sẻ electron giữ các nguyên tử lại với nhau tạo nên cấu trúc phân tử bền vững theo chuẩn IUPAC và GDPT 2018.",
    "relatedEquation": "2 Cysteine-SH + [O] → Cystine-S-S- + H₂O",
    "iupacName": "Disulfide Crosslink Warden Valence",
    "archetype": "HYDROCARBON_CHAIN",
    "structuredEffects": [
      {
        "effectId": "B14_EFF_4",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 300 ATK cho các quái thú được liên kết qua mũi tên Link."
      }
    ]
  },
  {
    "id": "card_b14_005_link_mof_porous_link_network_5",
    "name": "Mạng Lưới Phối Trí Kim Loại-Hữu Cơ — Link-1 (Mắt Xích 1)",
    "name_en": "MOF Porous Link Network — Link-1 Node 1",
    "cardType": "LINK_MONSTER",
    "rarity": "ULTRA_RARE",
    "attribute": "TERRA",
    "manaCost": 1,
    "linkRating": 1,
    "linkArrows": [
      "BOTTOM"
    ],
    "linkMaterialsRequired": {
      "minCount": 1,
      "maxCount": 1,
      "materialType": "Quái thú Nguyên tố hóa học"
    },
    "atk": 1450,
    "chemicalFormula": "MOF-5",
    "effectCode": "LINK_B14_MOF_POROUS_LINK_NETWORK_VAL_5",
    "effectText": "1 quái thú hóa học. Quái thú Link-1 (không có DEF và không thể chuyển sang tư thế Phòng thủ). Quái thú đồng minh ở ô được chỉ bởi Mũi tên Link nhận +300 ATK và bảo vệ khỏi bị tiêu diệt bởi hiệu ứng.",
    "scientificLore": "Liên kết hóa học (Zn₄O Clusters + 1,4-Benzenedicarboxylate) là lực tương tác tĩnh điện và chia sẻ electron giữ các nguyên tử lại với nhau tạo nên cấu trúc phân tử bền vững theo chuẩn IUPAC và GDPT 2018.",
    "relatedEquation": "Zn₄O Clusters + 1,4-Benzenedicarboxylate",
    "iupacName": "MOF Porous Link Network Valence",
    "archetype": "MACROMOLECULAR_POLYMER",
    "structuredEffects": [
      {
        "effectId": "B14_EFF_5",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 300 ATK cho các quái thú được liên kết qua mũi tên Link."
      }
    ]
  },
  {
    "id": "card_b14_006_link_polymer_chain_coordinate_link_6",
    "name": "Chuỗi Polyme Trùng Hợp Linker — Link-2 (Mắt Xích 1)",
    "name_en": "Polymer Chain Coordinate Link — Link-2 Node 1",
    "cardType": "LINK_MONSTER",
    "rarity": "SECRET_RARE",
    "attribute": "NOBLE_VOID",
    "manaCost": 3,
    "linkRating": 2,
    "linkArrows": [
      "BOTTOM",
      "TOP"
    ],
    "linkMaterialsRequired": {
      "minCount": 2,
      "maxCount": 2,
      "materialType": "Quái thú Nguyên tố hóa học"
    },
    "atk": 1940,
    "chemicalFormula": "Poly-Link",
    "effectCode": "LINK_B14_POLYMER_CHAIN_COORDINATE_LINK_VAL_6",
    "effectText": "2 quái thú hóa học. Quái thú Link-2 (không có DEF và không thể chuyển sang tư thế Phòng thủ). Quái thú đồng minh ở ô được chỉ bởi Mũi tên Link nhận +300 ATK và bảo vệ khỏi bị tiêu diệt bởi hiệu ứng.",
    "scientificLore": "Liên kết hóa học (Macromolecular Covalent Network Backbone) là lực tương tác tĩnh điện và chia sẻ electron giữ các nguyên tử lại với nhau tạo nên cấu trúc phân tử bền vững theo chuẩn IUPAC và GDPT 2018.",
    "relatedEquation": "Macromolecular Covalent Network Backbone",
    "iupacName": "Polymer Chain Coordinate Link Valence",
    "archetype": "HYDROCARBON_CHAIN",
    "structuredEffects": [
      {
        "effectId": "B14_EFF_6",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 300 ATK cho các quái thú được liên kết qua mũi tên Link."
      }
    ]
  },
  {
    "id": "card_b14_007_link_sigma_covalent_link_core_7",
    "name": "Liên Kết Cộng Hóa Trị Sigma — Link-3 (Mắt Xích 2)",
    "name_en": "Sigma Covalent Link Core — Link-3 Node 2",
    "cardType": "LINK_MONSTER",
    "rarity": "COMMON",
    "attribute": "TERRA",
    "manaCost": 5,
    "linkRating": 3,
    "linkArrows": [
      "BOTTOM"
    ],
    "linkMaterialsRequired": {
      "minCount": 3,
      "maxCount": 3,
      "materialType": "Quái thú Nguyên tố hóa học"
    },
    "atk": 2430,
    "chemicalFormula": "σ-Bond",
    "effectCode": "LINK_B14_SIGMA_COVALENT_LINK_CORE_VAL_7",
    "effectText": "3 quái thú hóa học. Quái thú Link-3 (không có DEF và không thể chuyển sang tư thế Phòng thủ). Quái thú đồng minh ở ô được chỉ bởi Mũi tên Link nhận +300 ATK và bảo vệ khỏi bị tiêu diệt bởi hiệu ứng.",
    "scientificLore": "Liên kết hóa học (Direct Overlap of Atomic Orbitals) là lực tương tác tĩnh điện và chia sẻ electron giữ các nguyên tử lại với nhau tạo nên cấu trúc phân tử bền vững theo chuẩn IUPAC và GDPT 2018.",
    "relatedEquation": "Direct Overlap of Atomic Orbitals",
    "iupacName": "Sigma Covalent Link Core Valence",
    "archetype": "MACROMOLECULAR_POLYMER",
    "structuredEffects": [
      {
        "effectId": "B14_EFF_7",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 300 ATK cho các quái thú được liên kết qua mũi tên Link."
      }
    ]
  },
  {
    "id": "card_b14_008_link_conjugated_pi_link_resonator_8",
    "name": "Liên Kết Pi Liên Hợp Polyaxetylen — Link-4 (Mắt Xích 2)",
    "name_en": "Conjugated Pi Link Resonator — Link-4 Node 2",
    "cardType": "LINK_MONSTER",
    "rarity": "COMMON",
    "attribute": "ELECTRO",
    "manaCost": 7,
    "linkRating": 4,
    "linkArrows": [
      "BOTTOM",
      "TOP"
    ],
    "linkMaterialsRequired": {
      "minCount": 4,
      "maxCount": 4,
      "materialType": "Quái thú Nguyên tố hóa học"
    },
    "atk": 2920,
    "chemicalFormula": "π-Conjugate",
    "effectCode": "LINK_B14_CONJUGATED_PI_LINK_RESONATOR_VAL_8",
    "effectText": "4 quái thú hóa học. Quái thú Link-4 (không có DEF và không thể chuyển sang tư thế Phòng thủ). Quái thú đồng minh ở ô được chỉ bởi Mũi tên Link nhận +300 ATK và bảo vệ khỏi bị tiêu diệt bởi hiệu ứng.",
    "scientificLore": "Liên kết hóa học (Lateral Overlap of Unhybridized p Orbitals) là lực tương tác tĩnh điện và chia sẻ electron giữ các nguyên tử lại với nhau tạo nên cấu trúc phân tử bền vững theo chuẩn IUPAC và GDPT 2018.",
    "relatedEquation": "Lateral Overlap of Unhybridized p Orbitals",
    "iupacName": "Conjugated Pi Link Resonator Valence",
    "archetype": "HYDROCARBON_CHAIN",
    "structuredEffects": [
      {
        "effectId": "B14_EFF_8",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 300 ATK cho các quái thú được liên kết qua mũi tên Link."
      }
    ]
  },
  {
    "id": "card_b14_009_link_hydrogen_bond_lattice_linker_9",
    "name": "Mạng Lưới Liên Kết Hydro Nước — Link-1 (Mắt Xích 2)",
    "name_en": "Hydrogen Bond Lattice Linker — Link-1 Node 2",
    "cardType": "LINK_MONSTER",
    "rarity": "COMMON",
    "attribute": "AQUA",
    "manaCost": 1,
    "linkRating": 1,
    "linkArrows": [
      "BOTTOM"
    ],
    "linkMaterialsRequired": {
      "minCount": 1,
      "maxCount": 1,
      "materialType": "Quái thú Nguyên tố hóa học"
    },
    "atk": 1450,
    "chemicalFormula": "H-Bond",
    "effectCode": "LINK_B14_HYDROGEN_BOND_LATTICE_LINKER_VAL_9",
    "effectText": "1 quái thú hóa học. Quái thú Link-1 (không có DEF và không thể chuyển sang tư thế Phòng thủ). Quái thú đồng minh ở ô được chỉ bởi Mũi tên Link nhận +300 ATK và bảo vệ khỏi bị tiêu diệt bởi hiệu ứng.",
    "scientificLore": "Liên kết hóa học (δ+ H···O δ- Dipole Attraction Network) là lực tương tác tĩnh điện và chia sẻ electron giữ các nguyên tử lại với nhau tạo nên cấu trúc phân tử bền vững theo chuẩn IUPAC và GDPT 2018.",
    "relatedEquation": "δ+ H···O δ- Dipole Attraction Network",
    "iupacName": "Hydrogen Bond Lattice Linker Valence",
    "archetype": "MACROMOLECULAR_POLYMER",
    "structuredEffects": [
      {
        "effectId": "B14_EFF_9",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 300 ATK cho các quái thú được liên kết qua mũi tên Link."
      }
    ]
  },
  {
    "id": "card_b14_010_link_disulfide_crosslink_warden_10",
    "name": "Cầu Nối Disulfide Protein — Link-2 (Mắt Xích 2)",
    "name_en": "Disulfide Crosslink Warden — Link-2 Node 2",
    "cardType": "LINK_MONSTER",
    "rarity": "RARE",
    "attribute": "PYRO",
    "manaCost": 3,
    "linkRating": 2,
    "linkArrows": [
      "BOTTOM",
      "RIGHT"
    ],
    "linkMaterialsRequired": {
      "minCount": 2,
      "maxCount": 2,
      "materialType": "Quái thú Nguyên tố hóa học"
    },
    "atk": 1940,
    "chemicalFormula": "-S-S-",
    "effectCode": "LINK_B14_DISULFIDE_CROSSLINK_WARDEN_VAL_10",
    "effectText": "2 quái thú hóa học. Quái thú Link-2 (không có DEF và không thể chuyển sang tư thế Phòng thủ). Quái thú đồng minh ở ô được chỉ bởi Mũi tên Link nhận +300 ATK và bảo vệ khỏi bị tiêu diệt bởi hiệu ứng.",
    "scientificLore": "Liên kết hóa học (2 Cysteine-SH + [O] → Cystine-S-S- + H₂O) là lực tương tác tĩnh điện và chia sẻ electron giữ các nguyên tử lại với nhau tạo nên cấu trúc phân tử bền vững theo chuẩn IUPAC và GDPT 2018.",
    "relatedEquation": "2 Cysteine-SH + [O] → Cystine-S-S- + H₂O",
    "iupacName": "Disulfide Crosslink Warden Valence",
    "archetype": "HYDROCARBON_CHAIN",
    "structuredEffects": [
      {
        "effectId": "B14_EFF_10",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 300 ATK cho các quái thú được liên kết qua mũi tên Link."
      }
    ]
  },
  {
    "id": "card_b14_011_link_mof_porous_link_network_11",
    "name": "Mạng Lưới Phối Trí Kim Loại-Hữu Cơ — Link-3 (Mắt Xích 2)",
    "name_en": "MOF Porous Link Network — Link-3 Node 2",
    "cardType": "LINK_MONSTER",
    "rarity": "RARE",
    "attribute": "TERRA",
    "manaCost": 5,
    "linkRating": 3,
    "linkArrows": [
      "BOTTOM",
      "LEFT",
      "RIGHT"
    ],
    "linkMaterialsRequired": {
      "minCount": 3,
      "maxCount": 3,
      "materialType": "Quái thú Nguyên tố hóa học"
    },
    "atk": 2430,
    "chemicalFormula": "MOF-5",
    "effectCode": "LINK_B14_MOF_POROUS_LINK_NETWORK_VAL_11",
    "effectText": "3 quái thú hóa học. Quái thú Link-3 (không có DEF và không thể chuyển sang tư thế Phòng thủ). Quái thú đồng minh ở ô được chỉ bởi Mũi tên Link nhận +300 ATK và bảo vệ khỏi bị tiêu diệt bởi hiệu ứng.",
    "scientificLore": "Liên kết hóa học (Zn₄O Clusters + 1,4-Benzenedicarboxylate) là lực tương tác tĩnh điện và chia sẻ electron giữ các nguyên tử lại với nhau tạo nên cấu trúc phân tử bền vững theo chuẩn IUPAC và GDPT 2018.",
    "relatedEquation": "Zn₄O Clusters + 1,4-Benzenedicarboxylate",
    "iupacName": "MOF Porous Link Network Valence",
    "archetype": "MACROMOLECULAR_POLYMER",
    "structuredEffects": [
      {
        "effectId": "B14_EFF_11",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 300 ATK cho các quái thú được liên kết qua mũi tên Link."
      }
    ]
  },
  {
    "id": "card_b14_012_link_polymer_chain_coordinate_link_12",
    "name": "Chuỗi Polyme Trùng Hợp Linker — Link-4 (Mắt Xích 2)",
    "name_en": "Polymer Chain Coordinate Link — Link-4 Node 2",
    "cardType": "LINK_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "NOBLE_VOID",
    "manaCost": 7,
    "linkRating": 4,
    "linkArrows": [
      "BOTTOM",
      "TOP",
      "LEFT",
      "RIGHT"
    ],
    "linkMaterialsRequired": {
      "minCount": 4,
      "maxCount": 4,
      "materialType": "Quái thú Nguyên tố hóa học"
    },
    "atk": 2920,
    "chemicalFormula": "Poly-Link",
    "effectCode": "LINK_B14_POLYMER_CHAIN_COORDINATE_LINK_VAL_12",
    "effectText": "4 quái thú hóa học. Quái thú Link-4 (không có DEF và không thể chuyển sang tư thế Phòng thủ). Quái thú đồng minh ở ô được chỉ bởi Mũi tên Link nhận +300 ATK và bảo vệ khỏi bị tiêu diệt bởi hiệu ứng.",
    "scientificLore": "Liên kết hóa học (Macromolecular Covalent Network Backbone) là lực tương tác tĩnh điện và chia sẻ electron giữ các nguyên tử lại với nhau tạo nên cấu trúc phân tử bền vững theo chuẩn IUPAC và GDPT 2018.",
    "relatedEquation": "Macromolecular Covalent Network Backbone",
    "iupacName": "Polymer Chain Coordinate Link Valence",
    "archetype": "HYDROCARBON_CHAIN",
    "structuredEffects": [
      {
        "effectId": "B14_EFF_12",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 300 ATK cho các quái thú được liên kết qua mũi tên Link."
      }
    ]
  },
  {
    "id": "card_b14_013_link_sigma_covalent_link_core_13",
    "name": "Liên Kết Cộng Hóa Trị Sigma — Link-1 (Mắt Xích 3)",
    "name_en": "Sigma Covalent Link Core — Link-1 Node 3",
    "cardType": "LINK_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "TERRA",
    "manaCost": 1,
    "linkRating": 1,
    "linkArrows": [
      "BOTTOM"
    ],
    "linkMaterialsRequired": {
      "minCount": 1,
      "maxCount": 1,
      "materialType": "Quái thú Nguyên tố hóa học"
    },
    "atk": 1450,
    "chemicalFormula": "σ-Bond",
    "effectCode": "LINK_B14_SIGMA_COVALENT_LINK_CORE_VAL_13",
    "effectText": "1 quái thú hóa học. Quái thú Link-1 (không có DEF và không thể chuyển sang tư thế Phòng thủ). Quái thú đồng minh ở ô được chỉ bởi Mũi tên Link nhận +300 ATK và bảo vệ khỏi bị tiêu diệt bởi hiệu ứng.",
    "scientificLore": "Liên kết hóa học (Direct Overlap of Atomic Orbitals) là lực tương tác tĩnh điện và chia sẻ electron giữ các nguyên tử lại với nhau tạo nên cấu trúc phân tử bền vững theo chuẩn IUPAC và GDPT 2018.",
    "relatedEquation": "Direct Overlap of Atomic Orbitals",
    "iupacName": "Sigma Covalent Link Core Valence",
    "archetype": "MACROMOLECULAR_POLYMER",
    "structuredEffects": [
      {
        "effectId": "B14_EFF_13",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 300 ATK cho các quái thú được liên kết qua mũi tên Link."
      }
    ]
  },
  {
    "id": "card_b14_014_link_conjugated_pi_link_resonator_14",
    "name": "Liên Kết Pi Liên Hợp Polyaxetylen — Link-2 (Mắt Xích 3)",
    "name_en": "Conjugated Pi Link Resonator — Link-2 Node 3",
    "cardType": "LINK_MONSTER",
    "rarity": "ULTRA_RARE",
    "attribute": "ELECTRO",
    "manaCost": 3,
    "linkRating": 2,
    "linkArrows": [
      "BOTTOM",
      "TOP"
    ],
    "linkMaterialsRequired": {
      "minCount": 2,
      "maxCount": 2,
      "materialType": "Quái thú Nguyên tố hóa học"
    },
    "atk": 1940,
    "chemicalFormula": "π-Conjugate",
    "effectCode": "LINK_B14_CONJUGATED_PI_LINK_RESONATOR_VAL_14",
    "effectText": "2 quái thú hóa học. Quái thú Link-2 (không có DEF và không thể chuyển sang tư thế Phòng thủ). Quái thú đồng minh ở ô được chỉ bởi Mũi tên Link nhận +300 ATK và bảo vệ khỏi bị tiêu diệt bởi hiệu ứng.",
    "scientificLore": "Liên kết hóa học (Lateral Overlap of Unhybridized p Orbitals) là lực tương tác tĩnh điện và chia sẻ electron giữ các nguyên tử lại với nhau tạo nên cấu trúc phân tử bền vững theo chuẩn IUPAC và GDPT 2018.",
    "relatedEquation": "Lateral Overlap of Unhybridized p Orbitals",
    "iupacName": "Conjugated Pi Link Resonator Valence",
    "archetype": "HYDROCARBON_CHAIN",
    "structuredEffects": [
      {
        "effectId": "B14_EFF_14",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 300 ATK cho các quái thú được liên kết qua mũi tên Link."
      }
    ]
  },
  {
    "id": "card_b14_015_link_hydrogen_bond_lattice_linker_15",
    "name": "Mạng Lưới Liên Kết Hydro Nước — Link-3 (Mắt Xích 3)",
    "name_en": "Hydrogen Bond Lattice Linker — Link-3 Node 3",
    "cardType": "LINK_MONSTER",
    "rarity": "SECRET_RARE",
    "attribute": "AQUA",
    "manaCost": 5,
    "linkRating": 3,
    "linkArrows": [
      "BOTTOM",
      "LEFT"
    ],
    "linkMaterialsRequired": {
      "minCount": 3,
      "maxCount": 3,
      "materialType": "Quái thú Nguyên tố hóa học"
    },
    "atk": 2430,
    "chemicalFormula": "H-Bond",
    "effectCode": "LINK_B14_HYDROGEN_BOND_LATTICE_LINKER_VAL_15",
    "effectText": "3 quái thú hóa học. Quái thú Link-3 (không có DEF và không thể chuyển sang tư thế Phòng thủ). Quái thú đồng minh ở ô được chỉ bởi Mũi tên Link nhận +300 ATK và bảo vệ khỏi bị tiêu diệt bởi hiệu ứng.",
    "scientificLore": "Liên kết hóa học (δ+ H···O δ- Dipole Attraction Network) là lực tương tác tĩnh điện và chia sẻ electron giữ các nguyên tử lại với nhau tạo nên cấu trúc phân tử bền vững theo chuẩn IUPAC và GDPT 2018.",
    "relatedEquation": "δ+ H···O δ- Dipole Attraction Network",
    "iupacName": "Hydrogen Bond Lattice Linker Valence",
    "archetype": "MACROMOLECULAR_POLYMER",
    "structuredEffects": [
      {
        "effectId": "B14_EFF_15",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 300 ATK cho các quái thú được liên kết qua mũi tên Link."
      }
    ]
  },
  {
    "id": "card_b14_016_link_disulfide_crosslink_warden_16",
    "name": "Cầu Nối Disulfide Protein — Link-4 (Mắt Xích 3)",
    "name_en": "Disulfide Crosslink Warden — Link-4 Node 3",
    "cardType": "LINK_MONSTER",
    "rarity": "COMMON",
    "attribute": "PYRO",
    "manaCost": 7,
    "linkRating": 4,
    "linkArrows": [
      "BOTTOM",
      "RIGHT"
    ],
    "linkMaterialsRequired": {
      "minCount": 4,
      "maxCount": 4,
      "materialType": "Quái thú Nguyên tố hóa học"
    },
    "atk": 2920,
    "chemicalFormula": "-S-S-",
    "effectCode": "LINK_B14_DISULFIDE_CROSSLINK_WARDEN_VAL_16",
    "effectText": "4 quái thú hóa học. Quái thú Link-4 (không có DEF và không thể chuyển sang tư thế Phòng thủ). Quái thú đồng minh ở ô được chỉ bởi Mũi tên Link nhận +300 ATK và bảo vệ khỏi bị tiêu diệt bởi hiệu ứng.",
    "scientificLore": "Liên kết hóa học (2 Cysteine-SH + [O] → Cystine-S-S- + H₂O) là lực tương tác tĩnh điện và chia sẻ electron giữ các nguyên tử lại với nhau tạo nên cấu trúc phân tử bền vững theo chuẩn IUPAC và GDPT 2018.",
    "relatedEquation": "2 Cysteine-SH + [O] → Cystine-S-S- + H₂O",
    "iupacName": "Disulfide Crosslink Warden Valence",
    "archetype": "HYDROCARBON_CHAIN",
    "structuredEffects": [
      {
        "effectId": "B14_EFF_16",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 300 ATK cho các quái thú được liên kết qua mũi tên Link."
      }
    ]
  },
  {
    "id": "card_b14_017_link_mof_porous_link_network_17",
    "name": "Mạng Lưới Phối Trí Kim Loại-Hữu Cơ — Link-1 (Mắt Xích 3)",
    "name_en": "MOF Porous Link Network — Link-1 Node 3",
    "cardType": "LINK_MONSTER",
    "rarity": "COMMON",
    "attribute": "TERRA",
    "manaCost": 1,
    "linkRating": 1,
    "linkArrows": [
      "BOTTOM"
    ],
    "linkMaterialsRequired": {
      "minCount": 1,
      "maxCount": 1,
      "materialType": "Quái thú Nguyên tố hóa học"
    },
    "atk": 1450,
    "chemicalFormula": "MOF-5",
    "effectCode": "LINK_B14_MOF_POROUS_LINK_NETWORK_VAL_17",
    "effectText": "1 quái thú hóa học. Quái thú Link-1 (không có DEF và không thể chuyển sang tư thế Phòng thủ). Quái thú đồng minh ở ô được chỉ bởi Mũi tên Link nhận +300 ATK và bảo vệ khỏi bị tiêu diệt bởi hiệu ứng.",
    "scientificLore": "Liên kết hóa học (Zn₄O Clusters + 1,4-Benzenedicarboxylate) là lực tương tác tĩnh điện và chia sẻ electron giữ các nguyên tử lại với nhau tạo nên cấu trúc phân tử bền vững theo chuẩn IUPAC và GDPT 2018.",
    "relatedEquation": "Zn₄O Clusters + 1,4-Benzenedicarboxylate",
    "iupacName": "MOF Porous Link Network Valence",
    "archetype": "MACROMOLECULAR_POLYMER",
    "structuredEffects": [
      {
        "effectId": "B14_EFF_17",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 300 ATK cho các quái thú được liên kết qua mũi tên Link."
      }
    ]
  },
  {
    "id": "card_b14_018_link_polymer_chain_coordinate_link_18",
    "name": "Chuỗi Polyme Trùng Hợp Linker — Link-2 (Mắt Xích 3)",
    "name_en": "Polymer Chain Coordinate Link — Link-2 Node 3",
    "cardType": "LINK_MONSTER",
    "rarity": "COMMON",
    "attribute": "NOBLE_VOID",
    "manaCost": 3,
    "linkRating": 2,
    "linkArrows": [
      "BOTTOM",
      "TOP"
    ],
    "linkMaterialsRequired": {
      "minCount": 2,
      "maxCount": 2,
      "materialType": "Quái thú Nguyên tố hóa học"
    },
    "atk": 1940,
    "chemicalFormula": "Poly-Link",
    "effectCode": "LINK_B14_POLYMER_CHAIN_COORDINATE_LINK_VAL_18",
    "effectText": "2 quái thú hóa học. Quái thú Link-2 (không có DEF và không thể chuyển sang tư thế Phòng thủ). Quái thú đồng minh ở ô được chỉ bởi Mũi tên Link nhận +300 ATK và bảo vệ khỏi bị tiêu diệt bởi hiệu ứng.",
    "scientificLore": "Liên kết hóa học (Macromolecular Covalent Network Backbone) là lực tương tác tĩnh điện và chia sẻ electron giữ các nguyên tử lại với nhau tạo nên cấu trúc phân tử bền vững theo chuẩn IUPAC và GDPT 2018.",
    "relatedEquation": "Macromolecular Covalent Network Backbone",
    "iupacName": "Polymer Chain Coordinate Link Valence",
    "archetype": "HYDROCARBON_CHAIN",
    "structuredEffects": [
      {
        "effectId": "B14_EFF_18",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 300 ATK cho các quái thú được liên kết qua mũi tên Link."
      }
    ]
  },
  {
    "id": "card_b14_019_link_sigma_covalent_link_core_19",
    "name": "Liên Kết Cộng Hóa Trị Sigma — Link-3 (Mắt Xích 4)",
    "name_en": "Sigma Covalent Link Core — Link-3 Node 4",
    "cardType": "LINK_MONSTER",
    "rarity": "RARE",
    "attribute": "TERRA",
    "manaCost": 5,
    "linkRating": 3,
    "linkArrows": [
      "BOTTOM"
    ],
    "linkMaterialsRequired": {
      "minCount": 3,
      "maxCount": 3,
      "materialType": "Quái thú Nguyên tố hóa học"
    },
    "atk": 2430,
    "chemicalFormula": "σ-Bond",
    "effectCode": "LINK_B14_SIGMA_COVALENT_LINK_CORE_VAL_19",
    "effectText": "3 quái thú hóa học. Quái thú Link-3 (không có DEF và không thể chuyển sang tư thế Phòng thủ). Quái thú đồng minh ở ô được chỉ bởi Mũi tên Link nhận +300 ATK và bảo vệ khỏi bị tiêu diệt bởi hiệu ứng.",
    "scientificLore": "Liên kết hóa học (Direct Overlap of Atomic Orbitals) là lực tương tác tĩnh điện và chia sẻ electron giữ các nguyên tử lại với nhau tạo nên cấu trúc phân tử bền vững theo chuẩn IUPAC và GDPT 2018.",
    "relatedEquation": "Direct Overlap of Atomic Orbitals",
    "iupacName": "Sigma Covalent Link Core Valence",
    "archetype": "MACROMOLECULAR_POLYMER",
    "structuredEffects": [
      {
        "effectId": "B14_EFF_19",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 300 ATK cho các quái thú được liên kết qua mũi tên Link."
      }
    ]
  },
  {
    "id": "card_b14_020_link_conjugated_pi_link_resonator_20",
    "name": "Liên Kết Pi Liên Hợp Polyaxetylen — Link-4 (Mắt Xích 4)",
    "name_en": "Conjugated Pi Link Resonator — Link-4 Node 4",
    "cardType": "LINK_MONSTER",
    "rarity": "RARE",
    "attribute": "ELECTRO",
    "manaCost": 7,
    "linkRating": 4,
    "linkArrows": [
      "BOTTOM",
      "TOP"
    ],
    "linkMaterialsRequired": {
      "minCount": 4,
      "maxCount": 4,
      "materialType": "Quái thú Nguyên tố hóa học"
    },
    "atk": 2920,
    "chemicalFormula": "π-Conjugate",
    "effectCode": "LINK_B14_CONJUGATED_PI_LINK_RESONATOR_VAL_20",
    "effectText": "4 quái thú hóa học. Quái thú Link-4 (không có DEF và không thể chuyển sang tư thế Phòng thủ). Quái thú đồng minh ở ô được chỉ bởi Mũi tên Link nhận +300 ATK và bảo vệ khỏi bị tiêu diệt bởi hiệu ứng.",
    "scientificLore": "Liên kết hóa học (Lateral Overlap of Unhybridized p Orbitals) là lực tương tác tĩnh điện và chia sẻ electron giữ các nguyên tử lại với nhau tạo nên cấu trúc phân tử bền vững theo chuẩn IUPAC và GDPT 2018.",
    "relatedEquation": "Lateral Overlap of Unhybridized p Orbitals",
    "iupacName": "Conjugated Pi Link Resonator Valence",
    "archetype": "HYDROCARBON_CHAIN",
    "structuredEffects": [
      {
        "effectId": "B14_EFF_20",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 300 ATK cho các quái thú được liên kết qua mũi tên Link."
      }
    ]
  },
  {
    "id": "card_b14_021_link_hydrogen_bond_lattice_linker_21",
    "name": "Mạng Lưới Liên Kết Hydro Nước — Link-1 (Mắt Xích 4)",
    "name_en": "Hydrogen Bond Lattice Linker — Link-1 Node 4",
    "cardType": "LINK_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "AQUA",
    "manaCost": 1,
    "linkRating": 1,
    "linkArrows": [
      "BOTTOM"
    ],
    "linkMaterialsRequired": {
      "minCount": 1,
      "maxCount": 1,
      "materialType": "Quái thú Nguyên tố hóa học"
    },
    "atk": 1450,
    "chemicalFormula": "H-Bond",
    "effectCode": "LINK_B14_HYDROGEN_BOND_LATTICE_LINKER_VAL_21",
    "effectText": "1 quái thú hóa học. Quái thú Link-1 (không có DEF và không thể chuyển sang tư thế Phòng thủ). Quái thú đồng minh ở ô được chỉ bởi Mũi tên Link nhận +300 ATK và bảo vệ khỏi bị tiêu diệt bởi hiệu ứng.",
    "scientificLore": "Liên kết hóa học (δ+ H···O δ- Dipole Attraction Network) là lực tương tác tĩnh điện và chia sẻ electron giữ các nguyên tử lại với nhau tạo nên cấu trúc phân tử bền vững theo chuẩn IUPAC và GDPT 2018.",
    "relatedEquation": "δ+ H···O δ- Dipole Attraction Network",
    "iupacName": "Hydrogen Bond Lattice Linker Valence",
    "archetype": "MACROMOLECULAR_POLYMER",
    "structuredEffects": [
      {
        "effectId": "B14_EFF_21",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 300 ATK cho các quái thú được liên kết qua mũi tên Link."
      }
    ]
  },
  {
    "id": "card_b14_022_link_disulfide_crosslink_warden_22",
    "name": "Cầu Nối Disulfide Protein — Link-2 (Mắt Xích 4)",
    "name_en": "Disulfide Crosslink Warden — Link-2 Node 4",
    "cardType": "LINK_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "PYRO",
    "manaCost": 3,
    "linkRating": 2,
    "linkArrows": [
      "BOTTOM",
      "RIGHT"
    ],
    "linkMaterialsRequired": {
      "minCount": 2,
      "maxCount": 2,
      "materialType": "Quái thú Nguyên tố hóa học"
    },
    "atk": 1940,
    "chemicalFormula": "-S-S-",
    "effectCode": "LINK_B14_DISULFIDE_CROSSLINK_WARDEN_VAL_22",
    "effectText": "2 quái thú hóa học. Quái thú Link-2 (không có DEF và không thể chuyển sang tư thế Phòng thủ). Quái thú đồng minh ở ô được chỉ bởi Mũi tên Link nhận +300 ATK và bảo vệ khỏi bị tiêu diệt bởi hiệu ứng.",
    "scientificLore": "Liên kết hóa học (2 Cysteine-SH + [O] → Cystine-S-S- + H₂O) là lực tương tác tĩnh điện và chia sẻ electron giữ các nguyên tử lại với nhau tạo nên cấu trúc phân tử bền vững theo chuẩn IUPAC và GDPT 2018.",
    "relatedEquation": "2 Cysteine-SH + [O] → Cystine-S-S- + H₂O",
    "iupacName": "Disulfide Crosslink Warden Valence",
    "archetype": "HYDROCARBON_CHAIN",
    "structuredEffects": [
      {
        "effectId": "B14_EFF_22",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 300 ATK cho các quái thú được liên kết qua mũi tên Link."
      }
    ]
  },
  {
    "id": "card_b14_023_link_mof_porous_link_network_23",
    "name": "Mạng Lưới Phối Trí Kim Loại-Hữu Cơ — Link-3 (Mắt Xích 4)",
    "name_en": "MOF Porous Link Network — Link-3 Node 4",
    "cardType": "LINK_MONSTER",
    "rarity": "ULTRA_RARE",
    "attribute": "TERRA",
    "manaCost": 5,
    "linkRating": 3,
    "linkArrows": [
      "BOTTOM",
      "LEFT",
      "RIGHT"
    ],
    "linkMaterialsRequired": {
      "minCount": 3,
      "maxCount": 3,
      "materialType": "Quái thú Nguyên tố hóa học"
    },
    "atk": 2430,
    "chemicalFormula": "MOF-5",
    "effectCode": "LINK_B14_MOF_POROUS_LINK_NETWORK_VAL_23",
    "effectText": "3 quái thú hóa học. Quái thú Link-3 (không có DEF và không thể chuyển sang tư thế Phòng thủ). Quái thú đồng minh ở ô được chỉ bởi Mũi tên Link nhận +300 ATK và bảo vệ khỏi bị tiêu diệt bởi hiệu ứng.",
    "scientificLore": "Liên kết hóa học (Zn₄O Clusters + 1,4-Benzenedicarboxylate) là lực tương tác tĩnh điện và chia sẻ electron giữ các nguyên tử lại với nhau tạo nên cấu trúc phân tử bền vững theo chuẩn IUPAC và GDPT 2018.",
    "relatedEquation": "Zn₄O Clusters + 1,4-Benzenedicarboxylate",
    "iupacName": "MOF Porous Link Network Valence",
    "archetype": "MACROMOLECULAR_POLYMER",
    "structuredEffects": [
      {
        "effectId": "B14_EFF_23",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 300 ATK cho các quái thú được liên kết qua mũi tên Link."
      }
    ]
  },
  {
    "id": "card_b14_024_link_polymer_chain_coordinate_link_24",
    "name": "Chuỗi Polyme Trùng Hợp Linker — Link-4 (Mắt Xích 4)",
    "name_en": "Polymer Chain Coordinate Link — Link-4 Node 4",
    "cardType": "LINK_MONSTER",
    "rarity": "SECRET_RARE",
    "attribute": "NOBLE_VOID",
    "manaCost": 7,
    "linkRating": 4,
    "linkArrows": [
      "BOTTOM",
      "TOP",
      "LEFT",
      "RIGHT"
    ],
    "linkMaterialsRequired": {
      "minCount": 4,
      "maxCount": 4,
      "materialType": "Quái thú Nguyên tố hóa học"
    },
    "atk": 2920,
    "chemicalFormula": "Poly-Link",
    "effectCode": "LINK_B14_POLYMER_CHAIN_COORDINATE_LINK_VAL_24",
    "effectText": "4 quái thú hóa học. Quái thú Link-4 (không có DEF và không thể chuyển sang tư thế Phòng thủ). Quái thú đồng minh ở ô được chỉ bởi Mũi tên Link nhận +300 ATK và bảo vệ khỏi bị tiêu diệt bởi hiệu ứng.",
    "scientificLore": "Liên kết hóa học (Macromolecular Covalent Network Backbone) là lực tương tác tĩnh điện và chia sẻ electron giữ các nguyên tử lại với nhau tạo nên cấu trúc phân tử bền vững theo chuẩn IUPAC và GDPT 2018.",
    "relatedEquation": "Macromolecular Covalent Network Backbone",
    "iupacName": "Polymer Chain Coordinate Link Valence",
    "archetype": "HYDROCARBON_CHAIN",
    "structuredEffects": [
      {
        "effectId": "B14_EFF_24",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 300 ATK cho các quái thú được liên kết qua mũi tên Link."
      }
    ]
  },
  {
    "id": "card_b14_025_link_sigma_covalent_link_core_25",
    "name": "Liên Kết Cộng Hóa Trị Sigma — Link-1 (Mắt Xích 5)",
    "name_en": "Sigma Covalent Link Core — Link-1 Node 5",
    "cardType": "LINK_MONSTER",
    "rarity": "COMMON",
    "attribute": "TERRA",
    "manaCost": 1,
    "linkRating": 1,
    "linkArrows": [
      "BOTTOM"
    ],
    "linkMaterialsRequired": {
      "minCount": 1,
      "maxCount": 1,
      "materialType": "Quái thú Nguyên tố hóa học"
    },
    "atk": 1450,
    "chemicalFormula": "σ-Bond",
    "effectCode": "LINK_B14_SIGMA_COVALENT_LINK_CORE_VAL_25",
    "effectText": "1 quái thú hóa học. Quái thú Link-1 (không có DEF và không thể chuyển sang tư thế Phòng thủ). Quái thú đồng minh ở ô được chỉ bởi Mũi tên Link nhận +300 ATK và bảo vệ khỏi bị tiêu diệt bởi hiệu ứng.",
    "scientificLore": "Liên kết hóa học (Direct Overlap of Atomic Orbitals) là lực tương tác tĩnh điện và chia sẻ electron giữ các nguyên tử lại với nhau tạo nên cấu trúc phân tử bền vững theo chuẩn IUPAC và GDPT 2018.",
    "relatedEquation": "Direct Overlap of Atomic Orbitals",
    "iupacName": "Sigma Covalent Link Core Valence",
    "archetype": "MACROMOLECULAR_POLYMER",
    "structuredEffects": [
      {
        "effectId": "B14_EFF_25",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 300 ATK cho các quái thú được liên kết qua mũi tên Link."
      }
    ]
  },
  {
    "id": "card_b14_026_link_conjugated_pi_link_resonator_26",
    "name": "Liên Kết Pi Liên Hợp Polyaxetylen — Link-2 (Mắt Xích 5)",
    "name_en": "Conjugated Pi Link Resonator — Link-2 Node 5",
    "cardType": "LINK_MONSTER",
    "rarity": "COMMON",
    "attribute": "ELECTRO",
    "manaCost": 3,
    "linkRating": 2,
    "linkArrows": [
      "BOTTOM",
      "TOP"
    ],
    "linkMaterialsRequired": {
      "minCount": 2,
      "maxCount": 2,
      "materialType": "Quái thú Nguyên tố hóa học"
    },
    "atk": 1940,
    "chemicalFormula": "π-Conjugate",
    "effectCode": "LINK_B14_CONJUGATED_PI_LINK_RESONATOR_VAL_26",
    "effectText": "2 quái thú hóa học. Quái thú Link-2 (không có DEF và không thể chuyển sang tư thế Phòng thủ). Quái thú đồng minh ở ô được chỉ bởi Mũi tên Link nhận +300 ATK và bảo vệ khỏi bị tiêu diệt bởi hiệu ứng.",
    "scientificLore": "Liên kết hóa học (Lateral Overlap of Unhybridized p Orbitals) là lực tương tác tĩnh điện và chia sẻ electron giữ các nguyên tử lại với nhau tạo nên cấu trúc phân tử bền vững theo chuẩn IUPAC và GDPT 2018.",
    "relatedEquation": "Lateral Overlap of Unhybridized p Orbitals",
    "iupacName": "Conjugated Pi Link Resonator Valence",
    "archetype": "HYDROCARBON_CHAIN",
    "structuredEffects": [
      {
        "effectId": "B14_EFF_26",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 300 ATK cho các quái thú được liên kết qua mũi tên Link."
      }
    ]
  },
  {
    "id": "card_b14_027_link_hydrogen_bond_lattice_linker_27",
    "name": "Mạng Lưới Liên Kết Hydro Nước — Link-3 (Mắt Xích 5)",
    "name_en": "Hydrogen Bond Lattice Linker — Link-3 Node 5",
    "cardType": "LINK_MONSTER",
    "rarity": "COMMON",
    "attribute": "AQUA",
    "manaCost": 5,
    "linkRating": 3,
    "linkArrows": [
      "BOTTOM",
      "LEFT"
    ],
    "linkMaterialsRequired": {
      "minCount": 3,
      "maxCount": 3,
      "materialType": "Quái thú Nguyên tố hóa học"
    },
    "atk": 2430,
    "chemicalFormula": "H-Bond",
    "effectCode": "LINK_B14_HYDROGEN_BOND_LATTICE_LINKER_VAL_27",
    "effectText": "3 quái thú hóa học. Quái thú Link-3 (không có DEF và không thể chuyển sang tư thế Phòng thủ). Quái thú đồng minh ở ô được chỉ bởi Mũi tên Link nhận +300 ATK và bảo vệ khỏi bị tiêu diệt bởi hiệu ứng.",
    "scientificLore": "Liên kết hóa học (δ+ H···O δ- Dipole Attraction Network) là lực tương tác tĩnh điện và chia sẻ electron giữ các nguyên tử lại với nhau tạo nên cấu trúc phân tử bền vững theo chuẩn IUPAC và GDPT 2018.",
    "relatedEquation": "δ+ H···O δ- Dipole Attraction Network",
    "iupacName": "Hydrogen Bond Lattice Linker Valence",
    "archetype": "MACROMOLECULAR_POLYMER",
    "structuredEffects": [
      {
        "effectId": "B14_EFF_27",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 300 ATK cho các quái thú được liên kết qua mũi tên Link."
      }
    ]
  },
  {
    "id": "card_b14_028_link_disulfide_crosslink_warden_28",
    "name": "Cầu Nối Disulfide Protein — Link-4 (Mắt Xích 5)",
    "name_en": "Disulfide Crosslink Warden — Link-4 Node 5",
    "cardType": "LINK_MONSTER",
    "rarity": "RARE",
    "attribute": "PYRO",
    "manaCost": 7,
    "linkRating": 4,
    "linkArrows": [
      "BOTTOM",
      "RIGHT"
    ],
    "linkMaterialsRequired": {
      "minCount": 4,
      "maxCount": 4,
      "materialType": "Quái thú Nguyên tố hóa học"
    },
    "atk": 2920,
    "chemicalFormula": "-S-S-",
    "effectCode": "LINK_B14_DISULFIDE_CROSSLINK_WARDEN_VAL_28",
    "effectText": "4 quái thú hóa học. Quái thú Link-4 (không có DEF và không thể chuyển sang tư thế Phòng thủ). Quái thú đồng minh ở ô được chỉ bởi Mũi tên Link nhận +300 ATK và bảo vệ khỏi bị tiêu diệt bởi hiệu ứng.",
    "scientificLore": "Liên kết hóa học (2 Cysteine-SH + [O] → Cystine-S-S- + H₂O) là lực tương tác tĩnh điện và chia sẻ electron giữ các nguyên tử lại với nhau tạo nên cấu trúc phân tử bền vững theo chuẩn IUPAC và GDPT 2018.",
    "relatedEquation": "2 Cysteine-SH + [O] → Cystine-S-S- + H₂O",
    "iupacName": "Disulfide Crosslink Warden Valence",
    "archetype": "HYDROCARBON_CHAIN",
    "structuredEffects": [
      {
        "effectId": "B14_EFF_28",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 300 ATK cho các quái thú được liên kết qua mũi tên Link."
      }
    ]
  },
  {
    "id": "card_b14_029_link_mof_porous_link_network_29",
    "name": "Mạng Lưới Phối Trí Kim Loại-Hữu Cơ — Link-1 (Mắt Xích 5)",
    "name_en": "MOF Porous Link Network — Link-1 Node 5",
    "cardType": "LINK_MONSTER",
    "rarity": "RARE",
    "attribute": "TERRA",
    "manaCost": 1,
    "linkRating": 1,
    "linkArrows": [
      "BOTTOM"
    ],
    "linkMaterialsRequired": {
      "minCount": 1,
      "maxCount": 1,
      "materialType": "Quái thú Nguyên tố hóa học"
    },
    "atk": 1450,
    "chemicalFormula": "MOF-5",
    "effectCode": "LINK_B14_MOF_POROUS_LINK_NETWORK_VAL_29",
    "effectText": "1 quái thú hóa học. Quái thú Link-1 (không có DEF và không thể chuyển sang tư thế Phòng thủ). Quái thú đồng minh ở ô được chỉ bởi Mũi tên Link nhận +300 ATK và bảo vệ khỏi bị tiêu diệt bởi hiệu ứng.",
    "scientificLore": "Liên kết hóa học (Zn₄O Clusters + 1,4-Benzenedicarboxylate) là lực tương tác tĩnh điện và chia sẻ electron giữ các nguyên tử lại với nhau tạo nên cấu trúc phân tử bền vững theo chuẩn IUPAC và GDPT 2018.",
    "relatedEquation": "Zn₄O Clusters + 1,4-Benzenedicarboxylate",
    "iupacName": "MOF Porous Link Network Valence",
    "archetype": "MACROMOLECULAR_POLYMER",
    "structuredEffects": [
      {
        "effectId": "B14_EFF_29",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 300 ATK cho các quái thú được liên kết qua mũi tên Link."
      }
    ]
  },
  {
    "id": "card_b14_030_link_polymer_chain_coordinate_link_30",
    "name": "Chuỗi Polyme Trùng Hợp Linker — Link-2 (Mắt Xích 5)",
    "name_en": "Polymer Chain Coordinate Link — Link-2 Node 5",
    "cardType": "LINK_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "NOBLE_VOID",
    "manaCost": 3,
    "linkRating": 2,
    "linkArrows": [
      "BOTTOM",
      "TOP"
    ],
    "linkMaterialsRequired": {
      "minCount": 2,
      "maxCount": 2,
      "materialType": "Quái thú Nguyên tố hóa học"
    },
    "atk": 1940,
    "chemicalFormula": "Poly-Link",
    "effectCode": "LINK_B14_POLYMER_CHAIN_COORDINATE_LINK_VAL_30",
    "effectText": "2 quái thú hóa học. Quái thú Link-2 (không có DEF và không thể chuyển sang tư thế Phòng thủ). Quái thú đồng minh ở ô được chỉ bởi Mũi tên Link nhận +300 ATK và bảo vệ khỏi bị tiêu diệt bởi hiệu ứng.",
    "scientificLore": "Liên kết hóa học (Macromolecular Covalent Network Backbone) là lực tương tác tĩnh điện và chia sẻ electron giữ các nguyên tử lại với nhau tạo nên cấu trúc phân tử bền vững theo chuẩn IUPAC và GDPT 2018.",
    "relatedEquation": "Macromolecular Covalent Network Backbone",
    "iupacName": "Polymer Chain Coordinate Link Valence",
    "archetype": "HYDROCARBON_CHAIN",
    "structuredEffects": [
      {
        "effectId": "B14_EFF_30",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 300 ATK cho các quái thú được liên kết qua mũi tên Link."
      }
    ]
  },
  {
    "id": "card_b14_031_link_sigma_covalent_link_core_31",
    "name": "Liên Kết Cộng Hóa Trị Sigma — Link-3 (Mắt Xích 6)",
    "name_en": "Sigma Covalent Link Core — Link-3 Node 6",
    "cardType": "LINK_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "TERRA",
    "manaCost": 5,
    "linkRating": 3,
    "linkArrows": [
      "BOTTOM"
    ],
    "linkMaterialsRequired": {
      "minCount": 3,
      "maxCount": 3,
      "materialType": "Quái thú Nguyên tố hóa học"
    },
    "atk": 2430,
    "chemicalFormula": "σ-Bond",
    "effectCode": "LINK_B14_SIGMA_COVALENT_LINK_CORE_VAL_31",
    "effectText": "3 quái thú hóa học. Quái thú Link-3 (không có DEF và không thể chuyển sang tư thế Phòng thủ). Quái thú đồng minh ở ô được chỉ bởi Mũi tên Link nhận +300 ATK và bảo vệ khỏi bị tiêu diệt bởi hiệu ứng.",
    "scientificLore": "Liên kết hóa học (Direct Overlap of Atomic Orbitals) là lực tương tác tĩnh điện và chia sẻ electron giữ các nguyên tử lại với nhau tạo nên cấu trúc phân tử bền vững theo chuẩn IUPAC và GDPT 2018.",
    "relatedEquation": "Direct Overlap of Atomic Orbitals",
    "iupacName": "Sigma Covalent Link Core Valence",
    "archetype": "MACROMOLECULAR_POLYMER",
    "structuredEffects": [
      {
        "effectId": "B14_EFF_31",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 300 ATK cho các quái thú được liên kết qua mũi tên Link."
      }
    ]
  },
  {
    "id": "card_b14_032_link_conjugated_pi_link_resonator_32",
    "name": "Liên Kết Pi Liên Hợp Polyaxetylen — Link-4 (Mắt Xích 6)",
    "name_en": "Conjugated Pi Link Resonator — Link-4 Node 6",
    "cardType": "LINK_MONSTER",
    "rarity": "ULTRA_RARE",
    "attribute": "ELECTRO",
    "manaCost": 7,
    "linkRating": 4,
    "linkArrows": [
      "BOTTOM",
      "TOP"
    ],
    "linkMaterialsRequired": {
      "minCount": 4,
      "maxCount": 4,
      "materialType": "Quái thú Nguyên tố hóa học"
    },
    "atk": 2920,
    "chemicalFormula": "π-Conjugate",
    "effectCode": "LINK_B14_CONJUGATED_PI_LINK_RESONATOR_VAL_32",
    "effectText": "4 quái thú hóa học. Quái thú Link-4 (không có DEF và không thể chuyển sang tư thế Phòng thủ). Quái thú đồng minh ở ô được chỉ bởi Mũi tên Link nhận +300 ATK và bảo vệ khỏi bị tiêu diệt bởi hiệu ứng.",
    "scientificLore": "Liên kết hóa học (Lateral Overlap of Unhybridized p Orbitals) là lực tương tác tĩnh điện và chia sẻ electron giữ các nguyên tử lại với nhau tạo nên cấu trúc phân tử bền vững theo chuẩn IUPAC và GDPT 2018.",
    "relatedEquation": "Lateral Overlap of Unhybridized p Orbitals",
    "iupacName": "Conjugated Pi Link Resonator Valence",
    "archetype": "HYDROCARBON_CHAIN",
    "structuredEffects": [
      {
        "effectId": "B14_EFF_32",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 300 ATK cho các quái thú được liên kết qua mũi tên Link."
      }
    ]
  },
  {
    "id": "card_b14_033_link_hydrogen_bond_lattice_linker_33",
    "name": "Mạng Lưới Liên Kết Hydro Nước — Link-1 (Mắt Xích 6)",
    "name_en": "Hydrogen Bond Lattice Linker — Link-1 Node 6",
    "cardType": "LINK_MONSTER",
    "rarity": "SECRET_RARE",
    "attribute": "AQUA",
    "manaCost": 1,
    "linkRating": 1,
    "linkArrows": [
      "BOTTOM"
    ],
    "linkMaterialsRequired": {
      "minCount": 1,
      "maxCount": 1,
      "materialType": "Quái thú Nguyên tố hóa học"
    },
    "atk": 1450,
    "chemicalFormula": "H-Bond",
    "effectCode": "LINK_B14_HYDROGEN_BOND_LATTICE_LINKER_VAL_33",
    "effectText": "1 quái thú hóa học. Quái thú Link-1 (không có DEF và không thể chuyển sang tư thế Phòng thủ). Quái thú đồng minh ở ô được chỉ bởi Mũi tên Link nhận +300 ATK và bảo vệ khỏi bị tiêu diệt bởi hiệu ứng.",
    "scientificLore": "Liên kết hóa học (δ+ H···O δ- Dipole Attraction Network) là lực tương tác tĩnh điện và chia sẻ electron giữ các nguyên tử lại với nhau tạo nên cấu trúc phân tử bền vững theo chuẩn IUPAC và GDPT 2018.",
    "relatedEquation": "δ+ H···O δ- Dipole Attraction Network",
    "iupacName": "Hydrogen Bond Lattice Linker Valence",
    "archetype": "MACROMOLECULAR_POLYMER",
    "structuredEffects": [
      {
        "effectId": "B14_EFF_33",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 300 ATK cho các quái thú được liên kết qua mũi tên Link."
      }
    ]
  },
  {
    "id": "card_b14_034_link_disulfide_crosslink_warden_34",
    "name": "Cầu Nối Disulfide Protein — Link-2 (Mắt Xích 6)",
    "name_en": "Disulfide Crosslink Warden — Link-2 Node 6",
    "cardType": "LINK_MONSTER",
    "rarity": "COMMON",
    "attribute": "PYRO",
    "manaCost": 3,
    "linkRating": 2,
    "linkArrows": [
      "BOTTOM",
      "RIGHT"
    ],
    "linkMaterialsRequired": {
      "minCount": 2,
      "maxCount": 2,
      "materialType": "Quái thú Nguyên tố hóa học"
    },
    "atk": 1940,
    "chemicalFormula": "-S-S-",
    "effectCode": "LINK_B14_DISULFIDE_CROSSLINK_WARDEN_VAL_34",
    "effectText": "2 quái thú hóa học. Quái thú Link-2 (không có DEF và không thể chuyển sang tư thế Phòng thủ). Quái thú đồng minh ở ô được chỉ bởi Mũi tên Link nhận +300 ATK và bảo vệ khỏi bị tiêu diệt bởi hiệu ứng.",
    "scientificLore": "Liên kết hóa học (2 Cysteine-SH + [O] → Cystine-S-S- + H₂O) là lực tương tác tĩnh điện và chia sẻ electron giữ các nguyên tử lại với nhau tạo nên cấu trúc phân tử bền vững theo chuẩn IUPAC và GDPT 2018.",
    "relatedEquation": "2 Cysteine-SH + [O] → Cystine-S-S- + H₂O",
    "iupacName": "Disulfide Crosslink Warden Valence",
    "archetype": "HYDROCARBON_CHAIN",
    "structuredEffects": [
      {
        "effectId": "B14_EFF_34",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 300 ATK cho các quái thú được liên kết qua mũi tên Link."
      }
    ]
  },
  {
    "id": "card_b14_035_link_mof_porous_link_network_35",
    "name": "Mạng Lưới Phối Trí Kim Loại-Hữu Cơ — Link-3 (Mắt Xích 6)",
    "name_en": "MOF Porous Link Network — Link-3 Node 6",
    "cardType": "LINK_MONSTER",
    "rarity": "COMMON",
    "attribute": "TERRA",
    "manaCost": 5,
    "linkRating": 3,
    "linkArrows": [
      "BOTTOM",
      "LEFT",
      "RIGHT"
    ],
    "linkMaterialsRequired": {
      "minCount": 3,
      "maxCount": 3,
      "materialType": "Quái thú Nguyên tố hóa học"
    },
    "atk": 2430,
    "chemicalFormula": "MOF-5",
    "effectCode": "LINK_B14_MOF_POROUS_LINK_NETWORK_VAL_35",
    "effectText": "3 quái thú hóa học. Quái thú Link-3 (không có DEF và không thể chuyển sang tư thế Phòng thủ). Quái thú đồng minh ở ô được chỉ bởi Mũi tên Link nhận +300 ATK và bảo vệ khỏi bị tiêu diệt bởi hiệu ứng.",
    "scientificLore": "Liên kết hóa học (Zn₄O Clusters + 1,4-Benzenedicarboxylate) là lực tương tác tĩnh điện và chia sẻ electron giữ các nguyên tử lại với nhau tạo nên cấu trúc phân tử bền vững theo chuẩn IUPAC và GDPT 2018.",
    "relatedEquation": "Zn₄O Clusters + 1,4-Benzenedicarboxylate",
    "iupacName": "MOF Porous Link Network Valence",
    "archetype": "MACROMOLECULAR_POLYMER",
    "structuredEffects": [
      {
        "effectId": "B14_EFF_35",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 300 ATK cho các quái thú được liên kết qua mũi tên Link."
      }
    ]
  },
  {
    "id": "card_b14_036_link_polymer_chain_coordinate_link_36",
    "name": "Chuỗi Polyme Trùng Hợp Linker — Link-4 (Mắt Xích 6)",
    "name_en": "Polymer Chain Coordinate Link — Link-4 Node 6",
    "cardType": "LINK_MONSTER",
    "rarity": "COMMON",
    "attribute": "NOBLE_VOID",
    "manaCost": 7,
    "linkRating": 4,
    "linkArrows": [
      "BOTTOM",
      "TOP",
      "LEFT",
      "RIGHT"
    ],
    "linkMaterialsRequired": {
      "minCount": 4,
      "maxCount": 4,
      "materialType": "Quái thú Nguyên tố hóa học"
    },
    "atk": 2920,
    "chemicalFormula": "Poly-Link",
    "effectCode": "LINK_B14_POLYMER_CHAIN_COORDINATE_LINK_VAL_36",
    "effectText": "4 quái thú hóa học. Quái thú Link-4 (không có DEF và không thể chuyển sang tư thế Phòng thủ). Quái thú đồng minh ở ô được chỉ bởi Mũi tên Link nhận +300 ATK và bảo vệ khỏi bị tiêu diệt bởi hiệu ứng.",
    "scientificLore": "Liên kết hóa học (Macromolecular Covalent Network Backbone) là lực tương tác tĩnh điện và chia sẻ electron giữ các nguyên tử lại với nhau tạo nên cấu trúc phân tử bền vững theo chuẩn IUPAC và GDPT 2018.",
    "relatedEquation": "Macromolecular Covalent Network Backbone",
    "iupacName": "Polymer Chain Coordinate Link Valence",
    "archetype": "HYDROCARBON_CHAIN",
    "structuredEffects": [
      {
        "effectId": "B14_EFF_36",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 300 ATK cho các quái thú được liên kết qua mũi tên Link."
      }
    ]
  },
  {
    "id": "card_b14_037_link_sigma_covalent_link_core_37",
    "name": "Liên Kết Cộng Hóa Trị Sigma — Link-1 (Mắt Xích 7)",
    "name_en": "Sigma Covalent Link Core — Link-1 Node 7",
    "cardType": "LINK_MONSTER",
    "rarity": "RARE",
    "attribute": "TERRA",
    "manaCost": 1,
    "linkRating": 1,
    "linkArrows": [
      "BOTTOM"
    ],
    "linkMaterialsRequired": {
      "minCount": 1,
      "maxCount": 1,
      "materialType": "Quái thú Nguyên tố hóa học"
    },
    "atk": 1450,
    "chemicalFormula": "σ-Bond",
    "effectCode": "LINK_B14_SIGMA_COVALENT_LINK_CORE_VAL_37",
    "effectText": "1 quái thú hóa học. Quái thú Link-1 (không có DEF và không thể chuyển sang tư thế Phòng thủ). Quái thú đồng minh ở ô được chỉ bởi Mũi tên Link nhận +300 ATK và bảo vệ khỏi bị tiêu diệt bởi hiệu ứng.",
    "scientificLore": "Liên kết hóa học (Direct Overlap of Atomic Orbitals) là lực tương tác tĩnh điện và chia sẻ electron giữ các nguyên tử lại với nhau tạo nên cấu trúc phân tử bền vững theo chuẩn IUPAC và GDPT 2018.",
    "relatedEquation": "Direct Overlap of Atomic Orbitals",
    "iupacName": "Sigma Covalent Link Core Valence",
    "archetype": "MACROMOLECULAR_POLYMER",
    "structuredEffects": [
      {
        "effectId": "B14_EFF_37",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 300 ATK cho các quái thú được liên kết qua mũi tên Link."
      }
    ]
  },
  {
    "id": "card_b14_038_link_conjugated_pi_link_resonator_38",
    "name": "Liên Kết Pi Liên Hợp Polyaxetylen — Link-2 (Mắt Xích 7)",
    "name_en": "Conjugated Pi Link Resonator — Link-2 Node 7",
    "cardType": "LINK_MONSTER",
    "rarity": "RARE",
    "attribute": "ELECTRO",
    "manaCost": 3,
    "linkRating": 2,
    "linkArrows": [
      "BOTTOM",
      "TOP"
    ],
    "linkMaterialsRequired": {
      "minCount": 2,
      "maxCount": 2,
      "materialType": "Quái thú Nguyên tố hóa học"
    },
    "atk": 1940,
    "chemicalFormula": "π-Conjugate",
    "effectCode": "LINK_B14_CONJUGATED_PI_LINK_RESONATOR_VAL_38",
    "effectText": "2 quái thú hóa học. Quái thú Link-2 (không có DEF và không thể chuyển sang tư thế Phòng thủ). Quái thú đồng minh ở ô được chỉ bởi Mũi tên Link nhận +300 ATK và bảo vệ khỏi bị tiêu diệt bởi hiệu ứng.",
    "scientificLore": "Liên kết hóa học (Lateral Overlap of Unhybridized p Orbitals) là lực tương tác tĩnh điện và chia sẻ electron giữ các nguyên tử lại với nhau tạo nên cấu trúc phân tử bền vững theo chuẩn IUPAC và GDPT 2018.",
    "relatedEquation": "Lateral Overlap of Unhybridized p Orbitals",
    "iupacName": "Conjugated Pi Link Resonator Valence",
    "archetype": "HYDROCARBON_CHAIN",
    "structuredEffects": [
      {
        "effectId": "B14_EFF_38",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 300 ATK cho các quái thú được liên kết qua mũi tên Link."
      }
    ]
  },
  {
    "id": "card_b14_039_link_hydrogen_bond_lattice_linker_39",
    "name": "Mạng Lưới Liên Kết Hydro Nước — Link-3 (Mắt Xích 7)",
    "name_en": "Hydrogen Bond Lattice Linker — Link-3 Node 7",
    "cardType": "LINK_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "AQUA",
    "manaCost": 5,
    "linkRating": 3,
    "linkArrows": [
      "BOTTOM",
      "LEFT"
    ],
    "linkMaterialsRequired": {
      "minCount": 3,
      "maxCount": 3,
      "materialType": "Quái thú Nguyên tố hóa học"
    },
    "atk": 2430,
    "chemicalFormula": "H-Bond",
    "effectCode": "LINK_B14_HYDROGEN_BOND_LATTICE_LINKER_VAL_39",
    "effectText": "3 quái thú hóa học. Quái thú Link-3 (không có DEF và không thể chuyển sang tư thế Phòng thủ). Quái thú đồng minh ở ô được chỉ bởi Mũi tên Link nhận +300 ATK và bảo vệ khỏi bị tiêu diệt bởi hiệu ứng.",
    "scientificLore": "Liên kết hóa học (δ+ H···O δ- Dipole Attraction Network) là lực tương tác tĩnh điện và chia sẻ electron giữ các nguyên tử lại với nhau tạo nên cấu trúc phân tử bền vững theo chuẩn IUPAC và GDPT 2018.",
    "relatedEquation": "δ+ H···O δ- Dipole Attraction Network",
    "iupacName": "Hydrogen Bond Lattice Linker Valence",
    "archetype": "MACROMOLECULAR_POLYMER",
    "structuredEffects": [
      {
        "effectId": "B14_EFF_39",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 300 ATK cho các quái thú được liên kết qua mũi tên Link."
      }
    ]
  },
  {
    "id": "card_b14_040_link_disulfide_crosslink_warden_40",
    "name": "Cầu Nối Disulfide Protein — Link-4 (Mắt Xích 7)",
    "name_en": "Disulfide Crosslink Warden — Link-4 Node 7",
    "cardType": "LINK_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "PYRO",
    "manaCost": 7,
    "linkRating": 4,
    "linkArrows": [
      "BOTTOM",
      "RIGHT"
    ],
    "linkMaterialsRequired": {
      "minCount": 4,
      "maxCount": 4,
      "materialType": "Quái thú Nguyên tố hóa học"
    },
    "atk": 2920,
    "chemicalFormula": "-S-S-",
    "effectCode": "LINK_B14_DISULFIDE_CROSSLINK_WARDEN_VAL_40",
    "effectText": "4 quái thú hóa học. Quái thú Link-4 (không có DEF và không thể chuyển sang tư thế Phòng thủ). Quái thú đồng minh ở ô được chỉ bởi Mũi tên Link nhận +300 ATK và bảo vệ khỏi bị tiêu diệt bởi hiệu ứng.",
    "scientificLore": "Liên kết hóa học (2 Cysteine-SH + [O] → Cystine-S-S- + H₂O) là lực tương tác tĩnh điện và chia sẻ electron giữ các nguyên tử lại với nhau tạo nên cấu trúc phân tử bền vững theo chuẩn IUPAC và GDPT 2018.",
    "relatedEquation": "2 Cysteine-SH + [O] → Cystine-S-S- + H₂O",
    "iupacName": "Disulfide Crosslink Warden Valence",
    "archetype": "HYDROCARBON_CHAIN",
    "structuredEffects": [
      {
        "effectId": "B14_EFF_40",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 300 ATK cho các quái thú được liên kết qua mũi tên Link."
      }
    ]
  },
  {
    "id": "card_b14_041_link_mof_porous_link_network_41",
    "name": "Mạng Lưới Phối Trí Kim Loại-Hữu Cơ — Link-1 (Mắt Xích 7)",
    "name_en": "MOF Porous Link Network — Link-1 Node 7",
    "cardType": "LINK_MONSTER",
    "rarity": "ULTRA_RARE",
    "attribute": "TERRA",
    "manaCost": 1,
    "linkRating": 1,
    "linkArrows": [
      "BOTTOM"
    ],
    "linkMaterialsRequired": {
      "minCount": 1,
      "maxCount": 1,
      "materialType": "Quái thú Nguyên tố hóa học"
    },
    "atk": 1450,
    "chemicalFormula": "MOF-5",
    "effectCode": "LINK_B14_MOF_POROUS_LINK_NETWORK_VAL_41",
    "effectText": "1 quái thú hóa học. Quái thú Link-1 (không có DEF và không thể chuyển sang tư thế Phòng thủ). Quái thú đồng minh ở ô được chỉ bởi Mũi tên Link nhận +300 ATK và bảo vệ khỏi bị tiêu diệt bởi hiệu ứng.",
    "scientificLore": "Liên kết hóa học (Zn₄O Clusters + 1,4-Benzenedicarboxylate) là lực tương tác tĩnh điện và chia sẻ electron giữ các nguyên tử lại với nhau tạo nên cấu trúc phân tử bền vững theo chuẩn IUPAC và GDPT 2018.",
    "relatedEquation": "Zn₄O Clusters + 1,4-Benzenedicarboxylate",
    "iupacName": "MOF Porous Link Network Valence",
    "archetype": "MACROMOLECULAR_POLYMER",
    "structuredEffects": [
      {
        "effectId": "B14_EFF_41",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 300 ATK cho các quái thú được liên kết qua mũi tên Link."
      }
    ]
  },
  {
    "id": "card_b14_042_link_polymer_chain_coordinate_link_42",
    "name": "Chuỗi Polyme Trùng Hợp Linker — Link-2 (Mắt Xích 7)",
    "name_en": "Polymer Chain Coordinate Link — Link-2 Node 7",
    "cardType": "LINK_MONSTER",
    "rarity": "SECRET_RARE",
    "attribute": "NOBLE_VOID",
    "manaCost": 3,
    "linkRating": 2,
    "linkArrows": [
      "BOTTOM",
      "TOP"
    ],
    "linkMaterialsRequired": {
      "minCount": 2,
      "maxCount": 2,
      "materialType": "Quái thú Nguyên tố hóa học"
    },
    "atk": 1940,
    "chemicalFormula": "Poly-Link",
    "effectCode": "LINK_B14_POLYMER_CHAIN_COORDINATE_LINK_VAL_42",
    "effectText": "2 quái thú hóa học. Quái thú Link-2 (không có DEF và không thể chuyển sang tư thế Phòng thủ). Quái thú đồng minh ở ô được chỉ bởi Mũi tên Link nhận +300 ATK và bảo vệ khỏi bị tiêu diệt bởi hiệu ứng.",
    "scientificLore": "Liên kết hóa học (Macromolecular Covalent Network Backbone) là lực tương tác tĩnh điện và chia sẻ electron giữ các nguyên tử lại với nhau tạo nên cấu trúc phân tử bền vững theo chuẩn IUPAC và GDPT 2018.",
    "relatedEquation": "Macromolecular Covalent Network Backbone",
    "iupacName": "Polymer Chain Coordinate Link Valence",
    "archetype": "HYDROCARBON_CHAIN",
    "structuredEffects": [
      {
        "effectId": "B14_EFF_42",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 300 ATK cho các quái thú được liên kết qua mũi tên Link."
      }
    ]
  },
  {
    "id": "card_b14_043_link_sigma_covalent_link_core_43",
    "name": "Liên Kết Cộng Hóa Trị Sigma — Link-3 (Mắt Xích 8)",
    "name_en": "Sigma Covalent Link Core — Link-3 Node 8",
    "cardType": "LINK_MONSTER",
    "rarity": "COMMON",
    "attribute": "TERRA",
    "manaCost": 5,
    "linkRating": 3,
    "linkArrows": [
      "BOTTOM"
    ],
    "linkMaterialsRequired": {
      "minCount": 3,
      "maxCount": 3,
      "materialType": "Quái thú Nguyên tố hóa học"
    },
    "atk": 2430,
    "chemicalFormula": "σ-Bond",
    "effectCode": "LINK_B14_SIGMA_COVALENT_LINK_CORE_VAL_43",
    "effectText": "3 quái thú hóa học. Quái thú Link-3 (không có DEF và không thể chuyển sang tư thế Phòng thủ). Quái thú đồng minh ở ô được chỉ bởi Mũi tên Link nhận +300 ATK và bảo vệ khỏi bị tiêu diệt bởi hiệu ứng.",
    "scientificLore": "Liên kết hóa học (Direct Overlap of Atomic Orbitals) là lực tương tác tĩnh điện và chia sẻ electron giữ các nguyên tử lại với nhau tạo nên cấu trúc phân tử bền vững theo chuẩn IUPAC và GDPT 2018.",
    "relatedEquation": "Direct Overlap of Atomic Orbitals",
    "iupacName": "Sigma Covalent Link Core Valence",
    "archetype": "MACROMOLECULAR_POLYMER",
    "structuredEffects": [
      {
        "effectId": "B14_EFF_43",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 300 ATK cho các quái thú được liên kết qua mũi tên Link."
      }
    ]
  },
  {
    "id": "card_b14_044_link_conjugated_pi_link_resonator_44",
    "name": "Liên Kết Pi Liên Hợp Polyaxetylen — Link-4 (Mắt Xích 8)",
    "name_en": "Conjugated Pi Link Resonator — Link-4 Node 8",
    "cardType": "LINK_MONSTER",
    "rarity": "COMMON",
    "attribute": "ELECTRO",
    "manaCost": 7,
    "linkRating": 4,
    "linkArrows": [
      "BOTTOM",
      "TOP"
    ],
    "linkMaterialsRequired": {
      "minCount": 4,
      "maxCount": 4,
      "materialType": "Quái thú Nguyên tố hóa học"
    },
    "atk": 2920,
    "chemicalFormula": "π-Conjugate",
    "effectCode": "LINK_B14_CONJUGATED_PI_LINK_RESONATOR_VAL_44",
    "effectText": "4 quái thú hóa học. Quái thú Link-4 (không có DEF và không thể chuyển sang tư thế Phòng thủ). Quái thú đồng minh ở ô được chỉ bởi Mũi tên Link nhận +300 ATK và bảo vệ khỏi bị tiêu diệt bởi hiệu ứng.",
    "scientificLore": "Liên kết hóa học (Lateral Overlap of Unhybridized p Orbitals) là lực tương tác tĩnh điện và chia sẻ electron giữ các nguyên tử lại với nhau tạo nên cấu trúc phân tử bền vững theo chuẩn IUPAC và GDPT 2018.",
    "relatedEquation": "Lateral Overlap of Unhybridized p Orbitals",
    "iupacName": "Conjugated Pi Link Resonator Valence",
    "archetype": "HYDROCARBON_CHAIN",
    "structuredEffects": [
      {
        "effectId": "B14_EFF_44",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 300 ATK cho các quái thú được liên kết qua mũi tên Link."
      }
    ]
  },
  {
    "id": "card_b14_045_link_hydrogen_bond_lattice_linker_45",
    "name": "Mạng Lưới Liên Kết Hydro Nước — Link-1 (Mắt Xích 8)",
    "name_en": "Hydrogen Bond Lattice Linker — Link-1 Node 8",
    "cardType": "LINK_MONSTER",
    "rarity": "COMMON",
    "attribute": "AQUA",
    "manaCost": 1,
    "linkRating": 1,
    "linkArrows": [
      "BOTTOM"
    ],
    "linkMaterialsRequired": {
      "minCount": 1,
      "maxCount": 1,
      "materialType": "Quái thú Nguyên tố hóa học"
    },
    "atk": 1450,
    "chemicalFormula": "H-Bond",
    "effectCode": "LINK_B14_HYDROGEN_BOND_LATTICE_LINKER_VAL_45",
    "effectText": "1 quái thú hóa học. Quái thú Link-1 (không có DEF và không thể chuyển sang tư thế Phòng thủ). Quái thú đồng minh ở ô được chỉ bởi Mũi tên Link nhận +300 ATK và bảo vệ khỏi bị tiêu diệt bởi hiệu ứng.",
    "scientificLore": "Liên kết hóa học (δ+ H···O δ- Dipole Attraction Network) là lực tương tác tĩnh điện và chia sẻ electron giữ các nguyên tử lại với nhau tạo nên cấu trúc phân tử bền vững theo chuẩn IUPAC và GDPT 2018.",
    "relatedEquation": "δ+ H···O δ- Dipole Attraction Network",
    "iupacName": "Hydrogen Bond Lattice Linker Valence",
    "archetype": "MACROMOLECULAR_POLYMER",
    "structuredEffects": [
      {
        "effectId": "B14_EFF_45",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 300 ATK cho các quái thú được liên kết qua mũi tên Link."
      }
    ]
  },
  {
    "id": "card_b14_046_link_disulfide_crosslink_warden_46",
    "name": "Cầu Nối Disulfide Protein — Link-2 (Mắt Xích 8)",
    "name_en": "Disulfide Crosslink Warden — Link-2 Node 8",
    "cardType": "LINK_MONSTER",
    "rarity": "RARE",
    "attribute": "PYRO",
    "manaCost": 3,
    "linkRating": 2,
    "linkArrows": [
      "BOTTOM",
      "RIGHT"
    ],
    "linkMaterialsRequired": {
      "minCount": 2,
      "maxCount": 2,
      "materialType": "Quái thú Nguyên tố hóa học"
    },
    "atk": 1940,
    "chemicalFormula": "-S-S-",
    "effectCode": "LINK_B14_DISULFIDE_CROSSLINK_WARDEN_VAL_46",
    "effectText": "2 quái thú hóa học. Quái thú Link-2 (không có DEF và không thể chuyển sang tư thế Phòng thủ). Quái thú đồng minh ở ô được chỉ bởi Mũi tên Link nhận +300 ATK và bảo vệ khỏi bị tiêu diệt bởi hiệu ứng.",
    "scientificLore": "Liên kết hóa học (2 Cysteine-SH + [O] → Cystine-S-S- + H₂O) là lực tương tác tĩnh điện và chia sẻ electron giữ các nguyên tử lại với nhau tạo nên cấu trúc phân tử bền vững theo chuẩn IUPAC và GDPT 2018.",
    "relatedEquation": "2 Cysteine-SH + [O] → Cystine-S-S- + H₂O",
    "iupacName": "Disulfide Crosslink Warden Valence",
    "archetype": "HYDROCARBON_CHAIN",
    "structuredEffects": [
      {
        "effectId": "B14_EFF_46",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 300 ATK cho các quái thú được liên kết qua mũi tên Link."
      }
    ]
  },
  {
    "id": "card_b14_047_link_mof_porous_link_network_47",
    "name": "Mạng Lưới Phối Trí Kim Loại-Hữu Cơ — Link-3 (Mắt Xích 8)",
    "name_en": "MOF Porous Link Network — Link-3 Node 8",
    "cardType": "LINK_MONSTER",
    "rarity": "RARE",
    "attribute": "TERRA",
    "manaCost": 5,
    "linkRating": 3,
    "linkArrows": [
      "BOTTOM",
      "LEFT",
      "RIGHT"
    ],
    "linkMaterialsRequired": {
      "minCount": 3,
      "maxCount": 3,
      "materialType": "Quái thú Nguyên tố hóa học"
    },
    "atk": 2430,
    "chemicalFormula": "MOF-5",
    "effectCode": "LINK_B14_MOF_POROUS_LINK_NETWORK_VAL_47",
    "effectText": "3 quái thú hóa học. Quái thú Link-3 (không có DEF và không thể chuyển sang tư thế Phòng thủ). Quái thú đồng minh ở ô được chỉ bởi Mũi tên Link nhận +300 ATK và bảo vệ khỏi bị tiêu diệt bởi hiệu ứng.",
    "scientificLore": "Liên kết hóa học (Zn₄O Clusters + 1,4-Benzenedicarboxylate) là lực tương tác tĩnh điện và chia sẻ electron giữ các nguyên tử lại với nhau tạo nên cấu trúc phân tử bền vững theo chuẩn IUPAC và GDPT 2018.",
    "relatedEquation": "Zn₄O Clusters + 1,4-Benzenedicarboxylate",
    "iupacName": "MOF Porous Link Network Valence",
    "archetype": "MACROMOLECULAR_POLYMER",
    "structuredEffects": [
      {
        "effectId": "B14_EFF_47",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 300 ATK cho các quái thú được liên kết qua mũi tên Link."
      }
    ]
  },
  {
    "id": "card_b14_048_link_polymer_chain_coordinate_link_48",
    "name": "Chuỗi Polyme Trùng Hợp Linker — Link-4 (Mắt Xích 8)",
    "name_en": "Polymer Chain Coordinate Link — Link-4 Node 8",
    "cardType": "LINK_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "NOBLE_VOID",
    "manaCost": 7,
    "linkRating": 4,
    "linkArrows": [
      "BOTTOM",
      "TOP",
      "LEFT",
      "RIGHT"
    ],
    "linkMaterialsRequired": {
      "minCount": 4,
      "maxCount": 4,
      "materialType": "Quái thú Nguyên tố hóa học"
    },
    "atk": 2920,
    "chemicalFormula": "Poly-Link",
    "effectCode": "LINK_B14_POLYMER_CHAIN_COORDINATE_LINK_VAL_48",
    "effectText": "4 quái thú hóa học. Quái thú Link-4 (không có DEF và không thể chuyển sang tư thế Phòng thủ). Quái thú đồng minh ở ô được chỉ bởi Mũi tên Link nhận +300 ATK và bảo vệ khỏi bị tiêu diệt bởi hiệu ứng.",
    "scientificLore": "Liên kết hóa học (Macromolecular Covalent Network Backbone) là lực tương tác tĩnh điện và chia sẻ electron giữ các nguyên tử lại với nhau tạo nên cấu trúc phân tử bền vững theo chuẩn IUPAC và GDPT 2018.",
    "relatedEquation": "Macromolecular Covalent Network Backbone",
    "iupacName": "Polymer Chain Coordinate Link Valence",
    "archetype": "HYDROCARBON_CHAIN",
    "structuredEffects": [
      {
        "effectId": "B14_EFF_48",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 300 ATK cho các quái thú được liên kết qua mũi tên Link."
      }
    ]
  },
  {
    "id": "card_b14_049_link_sigma_covalent_link_core_49",
    "name": "Liên Kết Cộng Hóa Trị Sigma — Link-1 (Mắt Xích 9)",
    "name_en": "Sigma Covalent Link Core — Link-1 Node 9",
    "cardType": "LINK_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "TERRA",
    "manaCost": 1,
    "linkRating": 1,
    "linkArrows": [
      "BOTTOM"
    ],
    "linkMaterialsRequired": {
      "minCount": 1,
      "maxCount": 1,
      "materialType": "Quái thú Nguyên tố hóa học"
    },
    "atk": 1450,
    "chemicalFormula": "σ-Bond",
    "effectCode": "LINK_B14_SIGMA_COVALENT_LINK_CORE_VAL_49",
    "effectText": "1 quái thú hóa học. Quái thú Link-1 (không có DEF và không thể chuyển sang tư thế Phòng thủ). Quái thú đồng minh ở ô được chỉ bởi Mũi tên Link nhận +300 ATK và bảo vệ khỏi bị tiêu diệt bởi hiệu ứng.",
    "scientificLore": "Liên kết hóa học (Direct Overlap of Atomic Orbitals) là lực tương tác tĩnh điện và chia sẻ electron giữ các nguyên tử lại với nhau tạo nên cấu trúc phân tử bền vững theo chuẩn IUPAC và GDPT 2018.",
    "relatedEquation": "Direct Overlap of Atomic Orbitals",
    "iupacName": "Sigma Covalent Link Core Valence",
    "archetype": "MACROMOLECULAR_POLYMER",
    "structuredEffects": [
      {
        "effectId": "B14_EFF_49",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 300 ATK cho các quái thú được liên kết qua mũi tên Link."
      }
    ]
  },
  {
    "id": "card_b14_050_link_conjugated_pi_link_resonator_50",
    "name": "Liên Kết Pi Liên Hợp Polyaxetylen — Link-2 (Mắt Xích 9)",
    "name_en": "Conjugated Pi Link Resonator — Link-2 Node 9",
    "cardType": "LINK_MONSTER",
    "rarity": "ULTRA_RARE",
    "attribute": "ELECTRO",
    "manaCost": 3,
    "linkRating": 2,
    "linkArrows": [
      "BOTTOM",
      "TOP"
    ],
    "linkMaterialsRequired": {
      "minCount": 2,
      "maxCount": 2,
      "materialType": "Quái thú Nguyên tố hóa học"
    },
    "atk": 1940,
    "chemicalFormula": "π-Conjugate",
    "effectCode": "LINK_B14_CONJUGATED_PI_LINK_RESONATOR_VAL_50",
    "effectText": "2 quái thú hóa học. Quái thú Link-2 (không có DEF và không thể chuyển sang tư thế Phòng thủ). Quái thú đồng minh ở ô được chỉ bởi Mũi tên Link nhận +300 ATK và bảo vệ khỏi bị tiêu diệt bởi hiệu ứng.",
    "scientificLore": "Liên kết hóa học (Lateral Overlap of Unhybridized p Orbitals) là lực tương tác tĩnh điện và chia sẻ electron giữ các nguyên tử lại với nhau tạo nên cấu trúc phân tử bền vững theo chuẩn IUPAC và GDPT 2018.",
    "relatedEquation": "Lateral Overlap of Unhybridized p Orbitals",
    "iupacName": "Conjugated Pi Link Resonator Valence",
    "archetype": "HYDROCARBON_CHAIN",
    "structuredEffects": [
      {
        "effectId": "B14_EFF_50",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 300 ATK cho các quái thú được liên kết qua mũi tên Link."
      }
    ]
  },
  {
    "id": "card_b14_051_link_hydrogen_bond_lattice_linker_51",
    "name": "Mạng Lưới Liên Kết Hydro Nước — Link-3 (Mắt Xích 9)",
    "name_en": "Hydrogen Bond Lattice Linker — Link-3 Node 9",
    "cardType": "LINK_MONSTER",
    "rarity": "SECRET_RARE",
    "attribute": "AQUA",
    "manaCost": 5,
    "linkRating": 3,
    "linkArrows": [
      "BOTTOM",
      "LEFT"
    ],
    "linkMaterialsRequired": {
      "minCount": 3,
      "maxCount": 3,
      "materialType": "Quái thú Nguyên tố hóa học"
    },
    "atk": 2430,
    "chemicalFormula": "H-Bond",
    "effectCode": "LINK_B14_HYDROGEN_BOND_LATTICE_LINKER_VAL_51",
    "effectText": "3 quái thú hóa học. Quái thú Link-3 (không có DEF và không thể chuyển sang tư thế Phòng thủ). Quái thú đồng minh ở ô được chỉ bởi Mũi tên Link nhận +300 ATK và bảo vệ khỏi bị tiêu diệt bởi hiệu ứng.",
    "scientificLore": "Liên kết hóa học (δ+ H···O δ- Dipole Attraction Network) là lực tương tác tĩnh điện và chia sẻ electron giữ các nguyên tử lại với nhau tạo nên cấu trúc phân tử bền vững theo chuẩn IUPAC và GDPT 2018.",
    "relatedEquation": "δ+ H···O δ- Dipole Attraction Network",
    "iupacName": "Hydrogen Bond Lattice Linker Valence",
    "archetype": "MACROMOLECULAR_POLYMER",
    "structuredEffects": [
      {
        "effectId": "B14_EFF_51",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 300 ATK cho các quái thú được liên kết qua mũi tên Link."
      }
    ]
  },
  {
    "id": "card_b14_052_link_disulfide_crosslink_warden_52",
    "name": "Cầu Nối Disulfide Protein — Link-4 (Mắt Xích 9)",
    "name_en": "Disulfide Crosslink Warden — Link-4 Node 9",
    "cardType": "LINK_MONSTER",
    "rarity": "COMMON",
    "attribute": "PYRO",
    "manaCost": 7,
    "linkRating": 4,
    "linkArrows": [
      "BOTTOM",
      "RIGHT"
    ],
    "linkMaterialsRequired": {
      "minCount": 4,
      "maxCount": 4,
      "materialType": "Quái thú Nguyên tố hóa học"
    },
    "atk": 2920,
    "chemicalFormula": "-S-S-",
    "effectCode": "LINK_B14_DISULFIDE_CROSSLINK_WARDEN_VAL_52",
    "effectText": "4 quái thú hóa học. Quái thú Link-4 (không có DEF và không thể chuyển sang tư thế Phòng thủ). Quái thú đồng minh ở ô được chỉ bởi Mũi tên Link nhận +300 ATK và bảo vệ khỏi bị tiêu diệt bởi hiệu ứng.",
    "scientificLore": "Liên kết hóa học (2 Cysteine-SH + [O] → Cystine-S-S- + H₂O) là lực tương tác tĩnh điện và chia sẻ electron giữ các nguyên tử lại với nhau tạo nên cấu trúc phân tử bền vững theo chuẩn IUPAC và GDPT 2018.",
    "relatedEquation": "2 Cysteine-SH + [O] → Cystine-S-S- + H₂O",
    "iupacName": "Disulfide Crosslink Warden Valence",
    "archetype": "HYDROCARBON_CHAIN",
    "structuredEffects": [
      {
        "effectId": "B14_EFF_52",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 300 ATK cho các quái thú được liên kết qua mũi tên Link."
      }
    ]
  },
  {
    "id": "card_b14_053_link_mof_porous_link_network_53",
    "name": "Mạng Lưới Phối Trí Kim Loại-Hữu Cơ — Link-1 (Mắt Xích 9)",
    "name_en": "MOF Porous Link Network — Link-1 Node 9",
    "cardType": "LINK_MONSTER",
    "rarity": "COMMON",
    "attribute": "TERRA",
    "manaCost": 1,
    "linkRating": 1,
    "linkArrows": [
      "BOTTOM"
    ],
    "linkMaterialsRequired": {
      "minCount": 1,
      "maxCount": 1,
      "materialType": "Quái thú Nguyên tố hóa học"
    },
    "atk": 1450,
    "chemicalFormula": "MOF-5",
    "effectCode": "LINK_B14_MOF_POROUS_LINK_NETWORK_VAL_53",
    "effectText": "1 quái thú hóa học. Quái thú Link-1 (không có DEF và không thể chuyển sang tư thế Phòng thủ). Quái thú đồng minh ở ô được chỉ bởi Mũi tên Link nhận +300 ATK và bảo vệ khỏi bị tiêu diệt bởi hiệu ứng.",
    "scientificLore": "Liên kết hóa học (Zn₄O Clusters + 1,4-Benzenedicarboxylate) là lực tương tác tĩnh điện và chia sẻ electron giữ các nguyên tử lại với nhau tạo nên cấu trúc phân tử bền vững theo chuẩn IUPAC và GDPT 2018.",
    "relatedEquation": "Zn₄O Clusters + 1,4-Benzenedicarboxylate",
    "iupacName": "MOF Porous Link Network Valence",
    "archetype": "MACROMOLECULAR_POLYMER",
    "structuredEffects": [
      {
        "effectId": "B14_EFF_53",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 300 ATK cho các quái thú được liên kết qua mũi tên Link."
      }
    ]
  },
  {
    "id": "card_b14_054_link_polymer_chain_coordinate_link_54",
    "name": "Chuỗi Polyme Trùng Hợp Linker — Link-2 (Mắt Xích 9)",
    "name_en": "Polymer Chain Coordinate Link — Link-2 Node 9",
    "cardType": "LINK_MONSTER",
    "rarity": "COMMON",
    "attribute": "NOBLE_VOID",
    "manaCost": 3,
    "linkRating": 2,
    "linkArrows": [
      "BOTTOM",
      "TOP"
    ],
    "linkMaterialsRequired": {
      "minCount": 2,
      "maxCount": 2,
      "materialType": "Quái thú Nguyên tố hóa học"
    },
    "atk": 1940,
    "chemicalFormula": "Poly-Link",
    "effectCode": "LINK_B14_POLYMER_CHAIN_COORDINATE_LINK_VAL_54",
    "effectText": "2 quái thú hóa học. Quái thú Link-2 (không có DEF và không thể chuyển sang tư thế Phòng thủ). Quái thú đồng minh ở ô được chỉ bởi Mũi tên Link nhận +300 ATK và bảo vệ khỏi bị tiêu diệt bởi hiệu ứng.",
    "scientificLore": "Liên kết hóa học (Macromolecular Covalent Network Backbone) là lực tương tác tĩnh điện và chia sẻ electron giữ các nguyên tử lại với nhau tạo nên cấu trúc phân tử bền vững theo chuẩn IUPAC và GDPT 2018.",
    "relatedEquation": "Macromolecular Covalent Network Backbone",
    "iupacName": "Polymer Chain Coordinate Link Valence",
    "archetype": "HYDROCARBON_CHAIN",
    "structuredEffects": [
      {
        "effectId": "B14_EFF_54",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 300 ATK cho các quái thú được liên kết qua mũi tên Link."
      }
    ]
  },
  {
    "id": "card_b14_055_link_sigma_covalent_link_core_55",
    "name": "Liên Kết Cộng Hóa Trị Sigma — Link-3 (Mắt Xích 10)",
    "name_en": "Sigma Covalent Link Core — Link-3 Node 10",
    "cardType": "LINK_MONSTER",
    "rarity": "RARE",
    "attribute": "TERRA",
    "manaCost": 5,
    "linkRating": 3,
    "linkArrows": [
      "BOTTOM"
    ],
    "linkMaterialsRequired": {
      "minCount": 3,
      "maxCount": 3,
      "materialType": "Quái thú Nguyên tố hóa học"
    },
    "atk": 2430,
    "chemicalFormula": "σ-Bond",
    "effectCode": "LINK_B14_SIGMA_COVALENT_LINK_CORE_VAL_55",
    "effectText": "3 quái thú hóa học. Quái thú Link-3 (không có DEF và không thể chuyển sang tư thế Phòng thủ). Quái thú đồng minh ở ô được chỉ bởi Mũi tên Link nhận +300 ATK và bảo vệ khỏi bị tiêu diệt bởi hiệu ứng.",
    "scientificLore": "Liên kết hóa học (Direct Overlap of Atomic Orbitals) là lực tương tác tĩnh điện và chia sẻ electron giữ các nguyên tử lại với nhau tạo nên cấu trúc phân tử bền vững theo chuẩn IUPAC và GDPT 2018.",
    "relatedEquation": "Direct Overlap of Atomic Orbitals",
    "iupacName": "Sigma Covalent Link Core Valence",
    "archetype": "MACROMOLECULAR_POLYMER",
    "structuredEffects": [
      {
        "effectId": "B14_EFF_55",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 300 ATK cho các quái thú được liên kết qua mũi tên Link."
      }
    ]
  },
  {
    "id": "card_b14_056_link_conjugated_pi_link_resonator_56",
    "name": "Liên Kết Pi Liên Hợp Polyaxetylen — Link-4 (Mắt Xích 10)",
    "name_en": "Conjugated Pi Link Resonator — Link-4 Node 10",
    "cardType": "LINK_MONSTER",
    "rarity": "RARE",
    "attribute": "ELECTRO",
    "manaCost": 7,
    "linkRating": 4,
    "linkArrows": [
      "BOTTOM",
      "TOP"
    ],
    "linkMaterialsRequired": {
      "minCount": 4,
      "maxCount": 4,
      "materialType": "Quái thú Nguyên tố hóa học"
    },
    "atk": 2920,
    "chemicalFormula": "π-Conjugate",
    "effectCode": "LINK_B14_CONJUGATED_PI_LINK_RESONATOR_VAL_56",
    "effectText": "4 quái thú hóa học. Quái thú Link-4 (không có DEF và không thể chuyển sang tư thế Phòng thủ). Quái thú đồng minh ở ô được chỉ bởi Mũi tên Link nhận +300 ATK và bảo vệ khỏi bị tiêu diệt bởi hiệu ứng.",
    "scientificLore": "Liên kết hóa học (Lateral Overlap of Unhybridized p Orbitals) là lực tương tác tĩnh điện và chia sẻ electron giữ các nguyên tử lại với nhau tạo nên cấu trúc phân tử bền vững theo chuẩn IUPAC và GDPT 2018.",
    "relatedEquation": "Lateral Overlap of Unhybridized p Orbitals",
    "iupacName": "Conjugated Pi Link Resonator Valence",
    "archetype": "HYDROCARBON_CHAIN",
    "structuredEffects": [
      {
        "effectId": "B14_EFF_56",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 300 ATK cho các quái thú được liên kết qua mũi tên Link."
      }
    ]
  },
  {
    "id": "card_b14_057_link_hydrogen_bond_lattice_linker_57",
    "name": "Mạng Lưới Liên Kết Hydro Nước — Link-1 (Mắt Xích 10)",
    "name_en": "Hydrogen Bond Lattice Linker — Link-1 Node 10",
    "cardType": "LINK_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "AQUA",
    "manaCost": 1,
    "linkRating": 1,
    "linkArrows": [
      "BOTTOM"
    ],
    "linkMaterialsRequired": {
      "minCount": 1,
      "maxCount": 1,
      "materialType": "Quái thú Nguyên tố hóa học"
    },
    "atk": 1450,
    "chemicalFormula": "H-Bond",
    "effectCode": "LINK_B14_HYDROGEN_BOND_LATTICE_LINKER_VAL_57",
    "effectText": "1 quái thú hóa học. Quái thú Link-1 (không có DEF và không thể chuyển sang tư thế Phòng thủ). Quái thú đồng minh ở ô được chỉ bởi Mũi tên Link nhận +300 ATK và bảo vệ khỏi bị tiêu diệt bởi hiệu ứng.",
    "scientificLore": "Liên kết hóa học (δ+ H···O δ- Dipole Attraction Network) là lực tương tác tĩnh điện và chia sẻ electron giữ các nguyên tử lại với nhau tạo nên cấu trúc phân tử bền vững theo chuẩn IUPAC và GDPT 2018.",
    "relatedEquation": "δ+ H···O δ- Dipole Attraction Network",
    "iupacName": "Hydrogen Bond Lattice Linker Valence",
    "archetype": "MACROMOLECULAR_POLYMER",
    "structuredEffects": [
      {
        "effectId": "B14_EFF_57",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 300 ATK cho các quái thú được liên kết qua mũi tên Link."
      }
    ]
  },
  {
    "id": "card_b14_058_link_disulfide_crosslink_warden_58",
    "name": "Cầu Nối Disulfide Protein — Link-2 (Mắt Xích 10)",
    "name_en": "Disulfide Crosslink Warden — Link-2 Node 10",
    "cardType": "LINK_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "PYRO",
    "manaCost": 3,
    "linkRating": 2,
    "linkArrows": [
      "BOTTOM",
      "RIGHT"
    ],
    "linkMaterialsRequired": {
      "minCount": 2,
      "maxCount": 2,
      "materialType": "Quái thú Nguyên tố hóa học"
    },
    "atk": 1940,
    "chemicalFormula": "-S-S-",
    "effectCode": "LINK_B14_DISULFIDE_CROSSLINK_WARDEN_VAL_58",
    "effectText": "2 quái thú hóa học. Quái thú Link-2 (không có DEF và không thể chuyển sang tư thế Phòng thủ). Quái thú đồng minh ở ô được chỉ bởi Mũi tên Link nhận +300 ATK và bảo vệ khỏi bị tiêu diệt bởi hiệu ứng.",
    "scientificLore": "Liên kết hóa học (2 Cysteine-SH + [O] → Cystine-S-S- + H₂O) là lực tương tác tĩnh điện và chia sẻ electron giữ các nguyên tử lại với nhau tạo nên cấu trúc phân tử bền vững theo chuẩn IUPAC và GDPT 2018.",
    "relatedEquation": "2 Cysteine-SH + [O] → Cystine-S-S- + H₂O",
    "iupacName": "Disulfide Crosslink Warden Valence",
    "archetype": "HYDROCARBON_CHAIN",
    "structuredEffects": [
      {
        "effectId": "B14_EFF_58",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 300 ATK cho các quái thú được liên kết qua mũi tên Link."
      }
    ]
  },
  {
    "id": "card_b14_059_link_mof_porous_link_network_59",
    "name": "Mạng Lưới Phối Trí Kim Loại-Hữu Cơ — Link-3 (Mắt Xích 10)",
    "name_en": "MOF Porous Link Network — Link-3 Node 10",
    "cardType": "LINK_MONSTER",
    "rarity": "ULTRA_RARE",
    "attribute": "TERRA",
    "manaCost": 5,
    "linkRating": 3,
    "linkArrows": [
      "BOTTOM",
      "LEFT",
      "RIGHT"
    ],
    "linkMaterialsRequired": {
      "minCount": 3,
      "maxCount": 3,
      "materialType": "Quái thú Nguyên tố hóa học"
    },
    "atk": 2430,
    "chemicalFormula": "MOF-5",
    "effectCode": "LINK_B14_MOF_POROUS_LINK_NETWORK_VAL_59",
    "effectText": "3 quái thú hóa học. Quái thú Link-3 (không có DEF và không thể chuyển sang tư thế Phòng thủ). Quái thú đồng minh ở ô được chỉ bởi Mũi tên Link nhận +300 ATK và bảo vệ khỏi bị tiêu diệt bởi hiệu ứng.",
    "scientificLore": "Liên kết hóa học (Zn₄O Clusters + 1,4-Benzenedicarboxylate) là lực tương tác tĩnh điện và chia sẻ electron giữ các nguyên tử lại với nhau tạo nên cấu trúc phân tử bền vững theo chuẩn IUPAC và GDPT 2018.",
    "relatedEquation": "Zn₄O Clusters + 1,4-Benzenedicarboxylate",
    "iupacName": "MOF Porous Link Network Valence",
    "archetype": "MACROMOLECULAR_POLYMER",
    "structuredEffects": [
      {
        "effectId": "B14_EFF_59",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 300 ATK cho các quái thú được liên kết qua mũi tên Link."
      }
    ]
  },
  {
    "id": "card_b14_060_link_polymer_chain_coordinate_link_60",
    "name": "Chuỗi Polyme Trùng Hợp Linker — Link-4 (Mắt Xích 10)",
    "name_en": "Polymer Chain Coordinate Link — Link-4 Node 10",
    "cardType": "LINK_MONSTER",
    "rarity": "SECRET_RARE",
    "attribute": "NOBLE_VOID",
    "manaCost": 7,
    "linkRating": 4,
    "linkArrows": [
      "BOTTOM",
      "TOP",
      "LEFT",
      "RIGHT"
    ],
    "linkMaterialsRequired": {
      "minCount": 4,
      "maxCount": 4,
      "materialType": "Quái thú Nguyên tố hóa học"
    },
    "atk": 2920,
    "chemicalFormula": "Poly-Link",
    "effectCode": "LINK_B14_POLYMER_CHAIN_COORDINATE_LINK_VAL_60",
    "effectText": "4 quái thú hóa học. Quái thú Link-4 (không có DEF và không thể chuyển sang tư thế Phòng thủ). Quái thú đồng minh ở ô được chỉ bởi Mũi tên Link nhận +300 ATK và bảo vệ khỏi bị tiêu diệt bởi hiệu ứng.",
    "scientificLore": "Liên kết hóa học (Macromolecular Covalent Network Backbone) là lực tương tác tĩnh điện và chia sẻ electron giữ các nguyên tử lại với nhau tạo nên cấu trúc phân tử bền vững theo chuẩn IUPAC và GDPT 2018.",
    "relatedEquation": "Macromolecular Covalent Network Backbone",
    "iupacName": "Polymer Chain Coordinate Link Valence",
    "archetype": "HYDROCARBON_CHAIN",
    "structuredEffects": [
      {
        "effectId": "B14_EFF_60",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 300 ATK cho các quái thú được liên kết qua mũi tên Link."
      }
    ]
  },
  {
    "id": "card_b14_061_link_sigma_covalent_link_core_61",
    "name": "Liên Kết Cộng Hóa Trị Sigma — Link-1 (Mắt Xích 11)",
    "name_en": "Sigma Covalent Link Core — Link-1 Node 11",
    "cardType": "LINK_MONSTER",
    "rarity": "COMMON",
    "attribute": "TERRA",
    "manaCost": 1,
    "linkRating": 1,
    "linkArrows": [
      "BOTTOM"
    ],
    "linkMaterialsRequired": {
      "minCount": 1,
      "maxCount": 1,
      "materialType": "Quái thú Nguyên tố hóa học"
    },
    "atk": 1450,
    "chemicalFormula": "σ-Bond",
    "effectCode": "LINK_B14_SIGMA_COVALENT_LINK_CORE_VAL_61",
    "effectText": "1 quái thú hóa học. Quái thú Link-1 (không có DEF và không thể chuyển sang tư thế Phòng thủ). Quái thú đồng minh ở ô được chỉ bởi Mũi tên Link nhận +300 ATK và bảo vệ khỏi bị tiêu diệt bởi hiệu ứng.",
    "scientificLore": "Liên kết hóa học (Direct Overlap of Atomic Orbitals) là lực tương tác tĩnh điện và chia sẻ electron giữ các nguyên tử lại với nhau tạo nên cấu trúc phân tử bền vững theo chuẩn IUPAC và GDPT 2018.",
    "relatedEquation": "Direct Overlap of Atomic Orbitals",
    "iupacName": "Sigma Covalent Link Core Valence",
    "archetype": "MACROMOLECULAR_POLYMER",
    "structuredEffects": [
      {
        "effectId": "B14_EFF_61",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 300 ATK cho các quái thú được liên kết qua mũi tên Link."
      }
    ]
  },
  {
    "id": "card_b14_062_link_conjugated_pi_link_resonator_62",
    "name": "Liên Kết Pi Liên Hợp Polyaxetylen — Link-2 (Mắt Xích 11)",
    "name_en": "Conjugated Pi Link Resonator — Link-2 Node 11",
    "cardType": "LINK_MONSTER",
    "rarity": "COMMON",
    "attribute": "ELECTRO",
    "manaCost": 3,
    "linkRating": 2,
    "linkArrows": [
      "BOTTOM",
      "TOP"
    ],
    "linkMaterialsRequired": {
      "minCount": 2,
      "maxCount": 2,
      "materialType": "Quái thú Nguyên tố hóa học"
    },
    "atk": 1940,
    "chemicalFormula": "π-Conjugate",
    "effectCode": "LINK_B14_CONJUGATED_PI_LINK_RESONATOR_VAL_62",
    "effectText": "2 quái thú hóa học. Quái thú Link-2 (không có DEF và không thể chuyển sang tư thế Phòng thủ). Quái thú đồng minh ở ô được chỉ bởi Mũi tên Link nhận +300 ATK và bảo vệ khỏi bị tiêu diệt bởi hiệu ứng.",
    "scientificLore": "Liên kết hóa học (Lateral Overlap of Unhybridized p Orbitals) là lực tương tác tĩnh điện và chia sẻ electron giữ các nguyên tử lại với nhau tạo nên cấu trúc phân tử bền vững theo chuẩn IUPAC và GDPT 2018.",
    "relatedEquation": "Lateral Overlap of Unhybridized p Orbitals",
    "iupacName": "Conjugated Pi Link Resonator Valence",
    "archetype": "HYDROCARBON_CHAIN",
    "structuredEffects": [
      {
        "effectId": "B14_EFF_62",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 300 ATK cho các quái thú được liên kết qua mũi tên Link."
      }
    ]
  },
  {
    "id": "card_b14_063_link_hydrogen_bond_lattice_linker_63",
    "name": "Mạng Lưới Liên Kết Hydro Nước — Link-3 (Mắt Xích 11)",
    "name_en": "Hydrogen Bond Lattice Linker — Link-3 Node 11",
    "cardType": "LINK_MONSTER",
    "rarity": "COMMON",
    "attribute": "AQUA",
    "manaCost": 5,
    "linkRating": 3,
    "linkArrows": [
      "BOTTOM",
      "LEFT"
    ],
    "linkMaterialsRequired": {
      "minCount": 3,
      "maxCount": 3,
      "materialType": "Quái thú Nguyên tố hóa học"
    },
    "atk": 2430,
    "chemicalFormula": "H-Bond",
    "effectCode": "LINK_B14_HYDROGEN_BOND_LATTICE_LINKER_VAL_63",
    "effectText": "3 quái thú hóa học. Quái thú Link-3 (không có DEF và không thể chuyển sang tư thế Phòng thủ). Quái thú đồng minh ở ô được chỉ bởi Mũi tên Link nhận +300 ATK và bảo vệ khỏi bị tiêu diệt bởi hiệu ứng.",
    "scientificLore": "Liên kết hóa học (δ+ H···O δ- Dipole Attraction Network) là lực tương tác tĩnh điện và chia sẻ electron giữ các nguyên tử lại với nhau tạo nên cấu trúc phân tử bền vững theo chuẩn IUPAC và GDPT 2018.",
    "relatedEquation": "δ+ H···O δ- Dipole Attraction Network",
    "iupacName": "Hydrogen Bond Lattice Linker Valence",
    "archetype": "MACROMOLECULAR_POLYMER",
    "structuredEffects": [
      {
        "effectId": "B14_EFF_63",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 300 ATK cho các quái thú được liên kết qua mũi tên Link."
      }
    ]
  },
  {
    "id": "card_b14_064_link_disulfide_crosslink_warden_64",
    "name": "Cầu Nối Disulfide Protein — Link-4 (Mắt Xích 11)",
    "name_en": "Disulfide Crosslink Warden — Link-4 Node 11",
    "cardType": "LINK_MONSTER",
    "rarity": "RARE",
    "attribute": "PYRO",
    "manaCost": 7,
    "linkRating": 4,
    "linkArrows": [
      "BOTTOM",
      "RIGHT"
    ],
    "linkMaterialsRequired": {
      "minCount": 4,
      "maxCount": 4,
      "materialType": "Quái thú Nguyên tố hóa học"
    },
    "atk": 2920,
    "chemicalFormula": "-S-S-",
    "effectCode": "LINK_B14_DISULFIDE_CROSSLINK_WARDEN_VAL_64",
    "effectText": "4 quái thú hóa học. Quái thú Link-4 (không có DEF và không thể chuyển sang tư thế Phòng thủ). Quái thú đồng minh ở ô được chỉ bởi Mũi tên Link nhận +300 ATK và bảo vệ khỏi bị tiêu diệt bởi hiệu ứng.",
    "scientificLore": "Liên kết hóa học (2 Cysteine-SH + [O] → Cystine-S-S- + H₂O) là lực tương tác tĩnh điện và chia sẻ electron giữ các nguyên tử lại với nhau tạo nên cấu trúc phân tử bền vững theo chuẩn IUPAC và GDPT 2018.",
    "relatedEquation": "2 Cysteine-SH + [O] → Cystine-S-S- + H₂O",
    "iupacName": "Disulfide Crosslink Warden Valence",
    "archetype": "HYDROCARBON_CHAIN",
    "structuredEffects": [
      {
        "effectId": "B14_EFF_64",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 300 ATK cho các quái thú được liên kết qua mũi tên Link."
      }
    ]
  },
  {
    "id": "card_b14_065_link_mof_porous_link_network_65",
    "name": "Mạng Lưới Phối Trí Kim Loại-Hữu Cơ — Link-1 (Mắt Xích 11)",
    "name_en": "MOF Porous Link Network — Link-1 Node 11",
    "cardType": "LINK_MONSTER",
    "rarity": "RARE",
    "attribute": "TERRA",
    "manaCost": 1,
    "linkRating": 1,
    "linkArrows": [
      "BOTTOM"
    ],
    "linkMaterialsRequired": {
      "minCount": 1,
      "maxCount": 1,
      "materialType": "Quái thú Nguyên tố hóa học"
    },
    "atk": 1450,
    "chemicalFormula": "MOF-5",
    "effectCode": "LINK_B14_MOF_POROUS_LINK_NETWORK_VAL_65",
    "effectText": "1 quái thú hóa học. Quái thú Link-1 (không có DEF và không thể chuyển sang tư thế Phòng thủ). Quái thú đồng minh ở ô được chỉ bởi Mũi tên Link nhận +300 ATK và bảo vệ khỏi bị tiêu diệt bởi hiệu ứng.",
    "scientificLore": "Liên kết hóa học (Zn₄O Clusters + 1,4-Benzenedicarboxylate) là lực tương tác tĩnh điện và chia sẻ electron giữ các nguyên tử lại với nhau tạo nên cấu trúc phân tử bền vững theo chuẩn IUPAC và GDPT 2018.",
    "relatedEquation": "Zn₄O Clusters + 1,4-Benzenedicarboxylate",
    "iupacName": "MOF Porous Link Network Valence",
    "archetype": "MACROMOLECULAR_POLYMER",
    "structuredEffects": [
      {
        "effectId": "B14_EFF_65",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 300 ATK cho các quái thú được liên kết qua mũi tên Link."
      }
    ]
  },
  {
    "id": "card_b14_066_link_polymer_chain_coordinate_link_66",
    "name": "Chuỗi Polyme Trùng Hợp Linker — Link-2 (Mắt Xích 11)",
    "name_en": "Polymer Chain Coordinate Link — Link-2 Node 11",
    "cardType": "LINK_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "NOBLE_VOID",
    "manaCost": 3,
    "linkRating": 2,
    "linkArrows": [
      "BOTTOM",
      "TOP"
    ],
    "linkMaterialsRequired": {
      "minCount": 2,
      "maxCount": 2,
      "materialType": "Quái thú Nguyên tố hóa học"
    },
    "atk": 1940,
    "chemicalFormula": "Poly-Link",
    "effectCode": "LINK_B14_POLYMER_CHAIN_COORDINATE_LINK_VAL_66",
    "effectText": "2 quái thú hóa học. Quái thú Link-2 (không có DEF và không thể chuyển sang tư thế Phòng thủ). Quái thú đồng minh ở ô được chỉ bởi Mũi tên Link nhận +300 ATK và bảo vệ khỏi bị tiêu diệt bởi hiệu ứng.",
    "scientificLore": "Liên kết hóa học (Macromolecular Covalent Network Backbone) là lực tương tác tĩnh điện và chia sẻ electron giữ các nguyên tử lại với nhau tạo nên cấu trúc phân tử bền vững theo chuẩn IUPAC và GDPT 2018.",
    "relatedEquation": "Macromolecular Covalent Network Backbone",
    "iupacName": "Polymer Chain Coordinate Link Valence",
    "archetype": "HYDROCARBON_CHAIN",
    "structuredEffects": [
      {
        "effectId": "B14_EFF_66",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 300 ATK cho các quái thú được liên kết qua mũi tên Link."
      }
    ]
  },
  {
    "id": "card_b14_067_link_sigma_covalent_link_core_67",
    "name": "Liên Kết Cộng Hóa Trị Sigma — Link-3 (Mắt Xích 12)",
    "name_en": "Sigma Covalent Link Core — Link-3 Node 12",
    "cardType": "LINK_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "TERRA",
    "manaCost": 5,
    "linkRating": 3,
    "linkArrows": [
      "BOTTOM"
    ],
    "linkMaterialsRequired": {
      "minCount": 3,
      "maxCount": 3,
      "materialType": "Quái thú Nguyên tố hóa học"
    },
    "atk": 2430,
    "chemicalFormula": "σ-Bond",
    "effectCode": "LINK_B14_SIGMA_COVALENT_LINK_CORE_VAL_67",
    "effectText": "3 quái thú hóa học. Quái thú Link-3 (không có DEF và không thể chuyển sang tư thế Phòng thủ). Quái thú đồng minh ở ô được chỉ bởi Mũi tên Link nhận +300 ATK và bảo vệ khỏi bị tiêu diệt bởi hiệu ứng.",
    "scientificLore": "Liên kết hóa học (Direct Overlap of Atomic Orbitals) là lực tương tác tĩnh điện và chia sẻ electron giữ các nguyên tử lại với nhau tạo nên cấu trúc phân tử bền vững theo chuẩn IUPAC và GDPT 2018.",
    "relatedEquation": "Direct Overlap of Atomic Orbitals",
    "iupacName": "Sigma Covalent Link Core Valence",
    "archetype": "MACROMOLECULAR_POLYMER",
    "structuredEffects": [
      {
        "effectId": "B14_EFF_67",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 300 ATK cho các quái thú được liên kết qua mũi tên Link."
      }
    ]
  },
  {
    "id": "card_b14_068_link_conjugated_pi_link_resonator_68",
    "name": "Liên Kết Pi Liên Hợp Polyaxetylen — Link-4 (Mắt Xích 12)",
    "name_en": "Conjugated Pi Link Resonator — Link-4 Node 12",
    "cardType": "LINK_MONSTER",
    "rarity": "ULTRA_RARE",
    "attribute": "ELECTRO",
    "manaCost": 7,
    "linkRating": 4,
    "linkArrows": [
      "BOTTOM",
      "TOP"
    ],
    "linkMaterialsRequired": {
      "minCount": 4,
      "maxCount": 4,
      "materialType": "Quái thú Nguyên tố hóa học"
    },
    "atk": 2920,
    "chemicalFormula": "π-Conjugate",
    "effectCode": "LINK_B14_CONJUGATED_PI_LINK_RESONATOR_VAL_68",
    "effectText": "4 quái thú hóa học. Quái thú Link-4 (không có DEF và không thể chuyển sang tư thế Phòng thủ). Quái thú đồng minh ở ô được chỉ bởi Mũi tên Link nhận +300 ATK và bảo vệ khỏi bị tiêu diệt bởi hiệu ứng.",
    "scientificLore": "Liên kết hóa học (Lateral Overlap of Unhybridized p Orbitals) là lực tương tác tĩnh điện và chia sẻ electron giữ các nguyên tử lại với nhau tạo nên cấu trúc phân tử bền vững theo chuẩn IUPAC và GDPT 2018.",
    "relatedEquation": "Lateral Overlap of Unhybridized p Orbitals",
    "iupacName": "Conjugated Pi Link Resonator Valence",
    "archetype": "HYDROCARBON_CHAIN",
    "structuredEffects": [
      {
        "effectId": "B14_EFF_68",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 300 ATK cho các quái thú được liên kết qua mũi tên Link."
      }
    ]
  },
  {
    "id": "card_b14_069_link_hydrogen_bond_lattice_linker_69",
    "name": "Mạng Lưới Liên Kết Hydro Nước — Link-1 (Mắt Xích 12)",
    "name_en": "Hydrogen Bond Lattice Linker — Link-1 Node 12",
    "cardType": "LINK_MONSTER",
    "rarity": "SECRET_RARE",
    "attribute": "AQUA",
    "manaCost": 1,
    "linkRating": 1,
    "linkArrows": [
      "BOTTOM"
    ],
    "linkMaterialsRequired": {
      "minCount": 1,
      "maxCount": 1,
      "materialType": "Quái thú Nguyên tố hóa học"
    },
    "atk": 1450,
    "chemicalFormula": "H-Bond",
    "effectCode": "LINK_B14_HYDROGEN_BOND_LATTICE_LINKER_VAL_69",
    "effectText": "1 quái thú hóa học. Quái thú Link-1 (không có DEF và không thể chuyển sang tư thế Phòng thủ). Quái thú đồng minh ở ô được chỉ bởi Mũi tên Link nhận +300 ATK và bảo vệ khỏi bị tiêu diệt bởi hiệu ứng.",
    "scientificLore": "Liên kết hóa học (δ+ H···O δ- Dipole Attraction Network) là lực tương tác tĩnh điện và chia sẻ electron giữ các nguyên tử lại với nhau tạo nên cấu trúc phân tử bền vững theo chuẩn IUPAC và GDPT 2018.",
    "relatedEquation": "δ+ H···O δ- Dipole Attraction Network",
    "iupacName": "Hydrogen Bond Lattice Linker Valence",
    "archetype": "MACROMOLECULAR_POLYMER",
    "structuredEffects": [
      {
        "effectId": "B14_EFF_69",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 300 ATK cho các quái thú được liên kết qua mũi tên Link."
      }
    ]
  },
  {
    "id": "card_b14_070_link_disulfide_crosslink_warden_70",
    "name": "Cầu Nối Disulfide Protein — Link-2 (Mắt Xích 12)",
    "name_en": "Disulfide Crosslink Warden — Link-2 Node 12",
    "cardType": "LINK_MONSTER",
    "rarity": "COMMON",
    "attribute": "PYRO",
    "manaCost": 3,
    "linkRating": 2,
    "linkArrows": [
      "BOTTOM",
      "RIGHT"
    ],
    "linkMaterialsRequired": {
      "minCount": 2,
      "maxCount": 2,
      "materialType": "Quái thú Nguyên tố hóa học"
    },
    "atk": 1940,
    "chemicalFormula": "-S-S-",
    "effectCode": "LINK_B14_DISULFIDE_CROSSLINK_WARDEN_VAL_70",
    "effectText": "2 quái thú hóa học. Quái thú Link-2 (không có DEF và không thể chuyển sang tư thế Phòng thủ). Quái thú đồng minh ở ô được chỉ bởi Mũi tên Link nhận +300 ATK và bảo vệ khỏi bị tiêu diệt bởi hiệu ứng.",
    "scientificLore": "Liên kết hóa học (2 Cysteine-SH + [O] → Cystine-S-S- + H₂O) là lực tương tác tĩnh điện và chia sẻ electron giữ các nguyên tử lại với nhau tạo nên cấu trúc phân tử bền vững theo chuẩn IUPAC và GDPT 2018.",
    "relatedEquation": "2 Cysteine-SH + [O] → Cystine-S-S- + H₂O",
    "iupacName": "Disulfide Crosslink Warden Valence",
    "archetype": "HYDROCARBON_CHAIN",
    "structuredEffects": [
      {
        "effectId": "B14_EFF_70",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 300 ATK cho các quái thú được liên kết qua mũi tên Link."
      }
    ]
  },
  {
    "id": "card_b14_071_link_mof_porous_link_network_71",
    "name": "Mạng Lưới Phối Trí Kim Loại-Hữu Cơ — Link-3 (Mắt Xích 12)",
    "name_en": "MOF Porous Link Network — Link-3 Node 12",
    "cardType": "LINK_MONSTER",
    "rarity": "COMMON",
    "attribute": "TERRA",
    "manaCost": 5,
    "linkRating": 3,
    "linkArrows": [
      "BOTTOM",
      "LEFT",
      "RIGHT"
    ],
    "linkMaterialsRequired": {
      "minCount": 3,
      "maxCount": 3,
      "materialType": "Quái thú Nguyên tố hóa học"
    },
    "atk": 2430,
    "chemicalFormula": "MOF-5",
    "effectCode": "LINK_B14_MOF_POROUS_LINK_NETWORK_VAL_71",
    "effectText": "3 quái thú hóa học. Quái thú Link-3 (không có DEF và không thể chuyển sang tư thế Phòng thủ). Quái thú đồng minh ở ô được chỉ bởi Mũi tên Link nhận +300 ATK và bảo vệ khỏi bị tiêu diệt bởi hiệu ứng.",
    "scientificLore": "Liên kết hóa học (Zn₄O Clusters + 1,4-Benzenedicarboxylate) là lực tương tác tĩnh điện và chia sẻ electron giữ các nguyên tử lại với nhau tạo nên cấu trúc phân tử bền vững theo chuẩn IUPAC và GDPT 2018.",
    "relatedEquation": "Zn₄O Clusters + 1,4-Benzenedicarboxylate",
    "iupacName": "MOF Porous Link Network Valence",
    "archetype": "MACROMOLECULAR_POLYMER",
    "structuredEffects": [
      {
        "effectId": "B14_EFF_71",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 300 ATK cho các quái thú được liên kết qua mũi tên Link."
      }
    ]
  },
  {
    "id": "card_b14_072_link_polymer_chain_coordinate_link_72",
    "name": "Chuỗi Polyme Trùng Hợp Linker — Link-4 (Mắt Xích 12)",
    "name_en": "Polymer Chain Coordinate Link — Link-4 Node 12",
    "cardType": "LINK_MONSTER",
    "rarity": "COMMON",
    "attribute": "NOBLE_VOID",
    "manaCost": 7,
    "linkRating": 4,
    "linkArrows": [
      "BOTTOM",
      "TOP",
      "LEFT",
      "RIGHT"
    ],
    "linkMaterialsRequired": {
      "minCount": 4,
      "maxCount": 4,
      "materialType": "Quái thú Nguyên tố hóa học"
    },
    "atk": 2920,
    "chemicalFormula": "Poly-Link",
    "effectCode": "LINK_B14_POLYMER_CHAIN_COORDINATE_LINK_VAL_72",
    "effectText": "4 quái thú hóa học. Quái thú Link-4 (không có DEF và không thể chuyển sang tư thế Phòng thủ). Quái thú đồng minh ở ô được chỉ bởi Mũi tên Link nhận +300 ATK và bảo vệ khỏi bị tiêu diệt bởi hiệu ứng.",
    "scientificLore": "Liên kết hóa học (Macromolecular Covalent Network Backbone) là lực tương tác tĩnh điện và chia sẻ electron giữ các nguyên tử lại với nhau tạo nên cấu trúc phân tử bền vững theo chuẩn IUPAC và GDPT 2018.",
    "relatedEquation": "Macromolecular Covalent Network Backbone",
    "iupacName": "Polymer Chain Coordinate Link Valence",
    "archetype": "HYDROCARBON_CHAIN",
    "structuredEffects": [
      {
        "effectId": "B14_EFF_72",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 300 ATK cho các quái thú được liên kết qua mũi tên Link."
      }
    ]
  },
  {
    "id": "card_b14_073_link_sigma_covalent_link_core_73",
    "name": "Liên Kết Cộng Hóa Trị Sigma — Link-1 (Mắt Xích 13)",
    "name_en": "Sigma Covalent Link Core — Link-1 Node 13",
    "cardType": "LINK_MONSTER",
    "rarity": "RARE",
    "attribute": "TERRA",
    "manaCost": 1,
    "linkRating": 1,
    "linkArrows": [
      "BOTTOM"
    ],
    "linkMaterialsRequired": {
      "minCount": 1,
      "maxCount": 1,
      "materialType": "Quái thú Nguyên tố hóa học"
    },
    "atk": 1450,
    "chemicalFormula": "σ-Bond",
    "effectCode": "LINK_B14_SIGMA_COVALENT_LINK_CORE_VAL_73",
    "effectText": "1 quái thú hóa học. Quái thú Link-1 (không có DEF và không thể chuyển sang tư thế Phòng thủ). Quái thú đồng minh ở ô được chỉ bởi Mũi tên Link nhận +300 ATK và bảo vệ khỏi bị tiêu diệt bởi hiệu ứng.",
    "scientificLore": "Liên kết hóa học (Direct Overlap of Atomic Orbitals) là lực tương tác tĩnh điện và chia sẻ electron giữ các nguyên tử lại với nhau tạo nên cấu trúc phân tử bền vững theo chuẩn IUPAC và GDPT 2018.",
    "relatedEquation": "Direct Overlap of Atomic Orbitals",
    "iupacName": "Sigma Covalent Link Core Valence",
    "archetype": "MACROMOLECULAR_POLYMER",
    "structuredEffects": [
      {
        "effectId": "B14_EFF_73",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 300 ATK cho các quái thú được liên kết qua mũi tên Link."
      }
    ]
  },
  {
    "id": "card_b14_074_link_conjugated_pi_link_resonator_74",
    "name": "Liên Kết Pi Liên Hợp Polyaxetylen — Link-2 (Mắt Xích 13)",
    "name_en": "Conjugated Pi Link Resonator — Link-2 Node 13",
    "cardType": "LINK_MONSTER",
    "rarity": "RARE",
    "attribute": "ELECTRO",
    "manaCost": 3,
    "linkRating": 2,
    "linkArrows": [
      "BOTTOM",
      "TOP"
    ],
    "linkMaterialsRequired": {
      "minCount": 2,
      "maxCount": 2,
      "materialType": "Quái thú Nguyên tố hóa học"
    },
    "atk": 1940,
    "chemicalFormula": "π-Conjugate",
    "effectCode": "LINK_B14_CONJUGATED_PI_LINK_RESONATOR_VAL_74",
    "effectText": "2 quái thú hóa học. Quái thú Link-2 (không có DEF và không thể chuyển sang tư thế Phòng thủ). Quái thú đồng minh ở ô được chỉ bởi Mũi tên Link nhận +300 ATK và bảo vệ khỏi bị tiêu diệt bởi hiệu ứng.",
    "scientificLore": "Liên kết hóa học (Lateral Overlap of Unhybridized p Orbitals) là lực tương tác tĩnh điện và chia sẻ electron giữ các nguyên tử lại với nhau tạo nên cấu trúc phân tử bền vững theo chuẩn IUPAC và GDPT 2018.",
    "relatedEquation": "Lateral Overlap of Unhybridized p Orbitals",
    "iupacName": "Conjugated Pi Link Resonator Valence",
    "archetype": "HYDROCARBON_CHAIN",
    "structuredEffects": [
      {
        "effectId": "B14_EFF_74",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 300 ATK cho các quái thú được liên kết qua mũi tên Link."
      }
    ]
  },
  {
    "id": "card_b14_075_link_hydrogen_bond_lattice_linker_75",
    "name": "Mạng Lưới Liên Kết Hydro Nước — Link-3 (Mắt Xích 13)",
    "name_en": "Hydrogen Bond Lattice Linker — Link-3 Node 13",
    "cardType": "LINK_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "AQUA",
    "manaCost": 5,
    "linkRating": 3,
    "linkArrows": [
      "BOTTOM",
      "LEFT"
    ],
    "linkMaterialsRequired": {
      "minCount": 3,
      "maxCount": 3,
      "materialType": "Quái thú Nguyên tố hóa học"
    },
    "atk": 2430,
    "chemicalFormula": "H-Bond",
    "effectCode": "LINK_B14_HYDROGEN_BOND_LATTICE_LINKER_VAL_75",
    "effectText": "3 quái thú hóa học. Quái thú Link-3 (không có DEF và không thể chuyển sang tư thế Phòng thủ). Quái thú đồng minh ở ô được chỉ bởi Mũi tên Link nhận +300 ATK và bảo vệ khỏi bị tiêu diệt bởi hiệu ứng.",
    "scientificLore": "Liên kết hóa học (δ+ H···O δ- Dipole Attraction Network) là lực tương tác tĩnh điện và chia sẻ electron giữ các nguyên tử lại với nhau tạo nên cấu trúc phân tử bền vững theo chuẩn IUPAC và GDPT 2018.",
    "relatedEquation": "δ+ H···O δ- Dipole Attraction Network",
    "iupacName": "Hydrogen Bond Lattice Linker Valence",
    "archetype": "MACROMOLECULAR_POLYMER",
    "structuredEffects": [
      {
        "effectId": "B14_EFF_75",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ALLIES"
            }
          }
        ],
        "description": "Tăng 300 ATK cho các quái thú được liên kết qua mũi tên Link."
      }
    ]
  }
];
