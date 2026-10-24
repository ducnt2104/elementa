// src/data/cards/batches/batch_17_spells_equip_catalysts.ts
// Batch 17: Equip Catalyst Spells (80 cards)
// Automatically generated and validated for ELEMENTA Tactical TCG

import { PlayableCardDef } from '../../../domain/cardGameTypes';

export const BATCH_17_CARDS: PlayableCardDef[] = [
  {
    "id": "card_b17_001_equip_platinum_gauze_catalyst_grid_1",
    "name": "Lưới Bạch Kim Xúc Tác Ôtô (Modul 1)",
    "name_en": "Platinum Gauze Catalyst Grid (Module 1)",
    "cardType": "EQUIP_CATALYST",
    "spellTrapSubtype": "EQUIP_SPELL",
    "spellSpeed": 1,
    "rarity": "COMMON",
    "attribute": "NOBLE_VOID",
    "manaCost": 1,
    "chemicalFormula": "Pt/Rh Mesh",
    "effectCode": "SPELL_B17_PLATINUM_GAUZE_CATALYST_GRID_EQUIP_1",
    "effectText": "[Phép Trang Bị / Equip]: Trang bị cho 1 quái thú trên sân. Quái thú được trang bị nhận +500 ATK và +300 DEF, đồng thời được bảo vệ khỏi bị phá hủy bởi hiệu ứng bài phép một lần mỗi lượt.",
    "scientificLore": "Chất xúc tác bề mặt Lưới Bạch Kim Xúc Tác Ôtô (Pt/Rh Mesh) cung cấp tâm hoạt động hạ thấp hàng rào thế năng phản ứng hóa học theo chương trình Hóa học 10 GDPT 2018.",
    "relatedEquation": "2CO + O₂ --Pt--> 2CO₂",
    "iupacName": "Platinum Gauze Catalyst Grid Matrix",
    "archetype": "PRECIOUS_CATALYST",
    "structuredEffects": [
      {
        "effectId": "B17_EFF_1",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 500,
              "statTarget": "ATK",
              "targetScope": "TARGET"
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "DEF",
              "targetScope": "TARGET"
            }
          }
        ],
        "description": "Tăng 500 ATK và 300 DEF cho quái thú trang bị."
      }
    ]
  },
  {
    "id": "card_b17_002_equip_zeolite_zsm_5_molecular_sieve_2",
    "name": "Hạt Xúc Tác Zeolit Lồng Chọn Lọc (Modul 1)",
    "name_en": "Zeolite ZSM-5 Molecular Sieve (Module 1)",
    "cardType": "EQUIP_CATALYST",
    "spellTrapSubtype": "EQUIP_SPELL",
    "spellSpeed": 1,
    "rarity": "COMMON",
    "attribute": "TERRA",
    "manaCost": 2,
    "chemicalFormula": "Zeolite",
    "effectCode": "SPELL_B17_ZEOLITE_ZSM_5_MOLECULAR_SIEVE_EQUIP_2",
    "effectText": "[Phép Trang Bị / Equip]: Trang bị cho 1 quái thú trên sân. Quái thú được trang bị nhận +500 ATK và +300 DEF, đồng thời được bảo vệ khỏi bị phá hủy bởi hiệu ứng bài phép một lần mỗi lượt.",
    "scientificLore": "Chất xúc tác bề mặt Hạt Xúc Tác Zeolit Lồng Chọn Lọc (Zeolite) cung cấp tâm hoạt động hạ thấp hàng rào thế năng phản ứng hóa học theo chương trình Hóa học 10 GDPT 2018.",
    "relatedEquation": "Shape-Selective Hydrocarbon Cracking Pores",
    "iupacName": "Zeolite ZSM-5 Molecular Sieve Matrix",
    "archetype": "ORGANOMETALLIC_CATALYSIS",
    "structuredEffects": [
      {
        "effectId": "B17_EFF_2",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 500,
              "statTarget": "ATK",
              "targetScope": "TARGET"
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "DEF",
              "targetScope": "TARGET"
            }
          }
        ],
        "description": "Tăng 500 ATK và 300 DEF cho quái thú trang bị."
      }
    ]
  },
  {
    "id": "card_b17_003_equip_raney_nickel_spongy_catalyst_3",
    "name": "Xúc Tác Niken Raney Xốp (Modul 1)",
    "name_en": "Raney Nickel Spongy Catalyst (Module 1)",
    "cardType": "EQUIP_CATALYST",
    "spellTrapSubtype": "EQUIP_SPELL",
    "spellSpeed": 1,
    "rarity": "RARE",
    "attribute": "PYRO",
    "manaCost": 3,
    "chemicalFormula": "Ni-Al Porous",
    "effectCode": "SPELL_B17_RANEY_NICKEL_SPONGY_CATALYST_EQUIP_3",
    "effectText": "[Phép Trang Bị / Equip]: Trang bị cho 1 quái thú trên sân. Quái thú được trang bị nhận +500 ATK và +300 DEF, đồng thời được bảo vệ khỏi bị phá hủy bởi hiệu ứng bài phép một lần mỗi lượt.",
    "scientificLore": "Chất xúc tác bề mặt Xúc Tác Niken Raney Xốp (Ni-Al Porous) cung cấp tâm hoạt động hạ thấp hàng rào thế năng phản ứng hóa học theo chương trình Hóa học 10 GDPT 2018.",
    "relatedEquation": "R-CH=CH-R + H₂ --Ni--> R-CH₂-CH₂-R",
    "iupacName": "Raney Nickel Spongy Catalyst Matrix",
    "archetype": "PRECIOUS_CATALYST",
    "structuredEffects": [
      {
        "effectId": "B17_EFF_3",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 500,
              "statTarget": "ATK",
              "targetScope": "TARGET"
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "DEF",
              "targetScope": "TARGET"
            }
          }
        ],
        "description": "Tăng 500 ATK và 300 DEF cho quái thú trang bị."
      }
    ]
  },
  {
    "id": "card_b17_004_equip_edta_octahedral_chelate_shield_4",
    "name": "Chất Chelate Phối Trí EDTA (Modul 1)",
    "name_en": "EDTA Octahedral Chelate Shield (Module 1)",
    "cardType": "EQUIP_CATALYST",
    "spellTrapSubtype": "EQUIP_SPELL",
    "spellSpeed": 1,
    "rarity": "RARE",
    "attribute": "AQUA",
    "manaCost": 4,
    "chemicalFormula": "Na2H2EDTA",
    "effectCode": "SPELL_B17_EDTA_OCTAHEDRAL_CHELATE_SHIELD_EQUIP_4",
    "effectText": "[Phép Trang Bị / Equip]: Trang bị cho 1 quái thú trên sân. Quái thú được trang bị nhận +500 ATK và +300 DEF, đồng thời được bảo vệ khỏi bị phá hủy bởi hiệu ứng bài phép một lần mỗi lượt.",
    "scientificLore": "Chất xúc tác bề mặt Chất Chelate Phối Trí EDTA (Na2H2EDTA) cung cấp tâm hoạt động hạ thấp hàng rào thế năng phản ứng hóa học theo chương trình Hóa học 10 GDPT 2018.",
    "relatedEquation": "Metal²⁺ + EDTA⁴⁻ → [Metal(EDTA)]²⁻ Complex",
    "iupacName": "EDTA Octahedral Chelate Shield Matrix",
    "archetype": "ORGANOMETALLIC_CATALYSIS",
    "structuredEffects": [
      {
        "effectId": "B17_EFF_4",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 500,
              "statTarget": "ATK",
              "targetScope": "TARGET"
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "DEF",
              "targetScope": "TARGET"
            }
          }
        ],
        "description": "Tăng 500 ATK và 300 DEF cho quái thú trang bị."
      }
    ]
  },
  {
    "id": "card_b17_005_equip_18_crown_6_ether_ring_5",
    "name": "Vòng Vương Miện Crown Ether (Modul 1)",
    "name_en": "18-Crown-6 Ether Ring (Module 1)",
    "cardType": "EQUIP_CATALYST",
    "spellTrapSubtype": "EQUIP_SPELL",
    "spellSpeed": 1,
    "rarity": "SUPER_RARE",
    "attribute": "ELECTRO",
    "manaCost": 1,
    "chemicalFormula": "C12H24O6",
    "effectCode": "SPELL_B17_18_CROWN_6_ETHER_RING_EQUIP_5",
    "effectText": "[Phép Trang Bị / Equip]: Trang bị cho 1 quái thú trên sân. Quái thú được trang bị nhận +500 ATK và +300 DEF, đồng thời được bảo vệ khỏi bị phá hủy bởi hiệu ứng bài phép một lần mỗi lượt.",
    "scientificLore": "Chất xúc tác bề mặt Vòng Vương Miện Crown Ether (C12H24O6) cung cấp tâm hoạt động hạ thấp hàng rào thế năng phản ứng hóa học theo chương trình Hóa học 10 GDPT 2018.",
    "relatedEquation": "K⁺ + 18-Crown-6 → [K(18-Crown-6)]⁺ Cavity Inclusion",
    "iupacName": "18-Crown-6 Ether Ring Matrix",
    "archetype": "PRECIOUS_CATALYST",
    "structuredEffects": [
      {
        "effectId": "B17_EFF_5",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 500,
              "statTarget": "ATK",
              "targetScope": "TARGET"
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "DEF",
              "targetScope": "TARGET"
            }
          }
        ],
        "description": "Tăng 500 ATK và 300 DEF cho quái thú trang bị."
      }
    ]
  },
  {
    "id": "card_b17_006_equip_gold_coated_carbon_nanotube_probe_6",
    "name": "Ống Cacbon Dẫn Electron Phủ Vàng (Modul 1)",
    "name_en": "Gold-Coated Carbon Nanotube Probe (Module 1)",
    "cardType": "EQUIP_CATALYST",
    "spellTrapSubtype": "EQUIP_SPELL",
    "spellSpeed": 1,
    "rarity": "SUPER_RARE",
    "attribute": "ELECTRO",
    "manaCost": 2,
    "chemicalFormula": "Au-CNT",
    "effectCode": "SPELL_B17_GOLD_COATED_CARBON_NANOTUBE_PROBE_EQUIP_6",
    "effectText": "[Phép Trang Bị / Equip]: Trang bị cho 1 quái thú trên sân. Quái thú được trang bị nhận +500 ATK và +300 DEF, đồng thời được bảo vệ khỏi bị phá hủy bởi hiệu ứng bài phép một lần mỗi lượt.",
    "scientificLore": "Chất xúc tác bề mặt Ống Cacbon Dẫn Electron Phủ Vàng (Au-CNT) cung cấp tâm hoạt động hạ thấp hàng rào thế năng phản ứng hóa học theo chương trình Hóa học 10 GDPT 2018.",
    "relatedEquation": "Ballistic Electron Transport Catalyst",
    "iupacName": "Gold-Coated Carbon Nanotube Probe Matrix",
    "archetype": "ORGANOMETALLIC_CATALYSIS",
    "structuredEffects": [
      {
        "effectId": "B17_EFF_6",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 500,
              "statTarget": "ATK",
              "targetScope": "TARGET"
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "DEF",
              "targetScope": "TARGET"
            }
          }
        ],
        "description": "Tăng 500 ATK và 300 DEF cho quái thú trang bị."
      }
    ]
  },
  {
    "id": "card_b17_007_equip_cadmium_sulfide_quantum_dot_sensor_7",
    "name": "Hạt Xúc Tác Bán Dẫn Cadmi Sunfua (Modul 1)",
    "name_en": "Cadmium Sulfide Quantum Dot Sensor (Module 1)",
    "cardType": "EQUIP_CATALYST",
    "spellTrapSubtype": "EQUIP_SPELL",
    "spellSpeed": 1,
    "rarity": "ULTRA_RARE",
    "attribute": "ELECTRO",
    "manaCost": 3,
    "chemicalFormula": "CdS QD",
    "effectCode": "SPELL_B17_CADMIUM_SULFIDE_QUANTUM_DOT_SENSOR_EQUIP_7",
    "effectText": "[Phép Trang Bị / Equip]: Trang bị cho 1 quái thú trên sân. Quái thú được trang bị nhận +500 ATK và +300 DEF, đồng thời được bảo vệ khỏi bị phá hủy bởi hiệu ứng bài phép một lần mỗi lượt.",
    "scientificLore": "Chất xúc tác bề mặt Hạt Xúc Tác Bán Dẫn Cadmi Sunfua (CdS QD) cung cấp tâm hoạt động hạ thấp hàng rào thế năng phản ứng hóa học theo chương trình Hóa học 10 GDPT 2018.",
    "relatedEquation": "Quantum Confinement Exciton Photocatalysis",
    "iupacName": "Cadmium Sulfide Quantum Dot Sensor Matrix",
    "archetype": "PRECIOUS_CATALYST",
    "structuredEffects": [
      {
        "effectId": "B17_EFF_7",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 500,
              "statTarget": "ATK",
              "targetScope": "TARGET"
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "DEF",
              "targetScope": "TARGET"
            }
          }
        ],
        "description": "Tăng 500 ATK và 300 DEF cho quái thú trang bị."
      }
    ]
  },
  {
    "id": "card_b17_008_equip_immobilized_biocatalytic_membrane_8",
    "name": "Màng Xúc Tác Enzymatic Cố Định (Modul 1)",
    "name_en": "Immobilized Biocatalytic Membrane (Module 1)",
    "cardType": "EQUIP_CATALYST",
    "spellTrapSubtype": "EQUIP_SPELL",
    "spellSpeed": 1,
    "rarity": "SECRET_RARE",
    "attribute": "AQUA",
    "manaCost": 4,
    "chemicalFormula": "Enzyme-Mat",
    "effectCode": "SPELL_B17_IMMOBILIZED_BIOCATALYTIC_MEMBRANE_EQUIP_8",
    "effectText": "[Phép Trang Bị / Equip]: Trang bị cho 1 quái thú trên sân. Quái thú được trang bị nhận +500 ATK và +300 DEF, đồng thời được bảo vệ khỏi bị phá hủy bởi hiệu ứng bài phép một lần mỗi lượt.",
    "scientificLore": "Chất xúc tác bề mặt Màng Xúc Tác Enzymatic Cố Định (Enzyme-Mat) cung cấp tâm hoạt động hạ thấp hàng rào thế năng phản ứng hóa học theo chương trình Hóa học 10 GDPT 2018.",
    "relatedEquation": "High-Turnover Enantioselective Synthesis",
    "iupacName": "Immobilized Biocatalytic Membrane Matrix",
    "archetype": "ORGANOMETALLIC_CATALYSIS",
    "structuredEffects": [
      {
        "effectId": "B17_EFF_8",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 500,
              "statTarget": "ATK",
              "targetScope": "TARGET"
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "DEF",
              "targetScope": "TARGET"
            }
          }
        ],
        "description": "Tăng 500 ATK và 300 DEF cho quái thú trang bị."
      }
    ]
  },
  {
    "id": "card_b17_009_equip_platinum_gauze_catalyst_grid_9",
    "name": "Lưới Bạch Kim Xúc Tác Ôtô (Modul 2)",
    "name_en": "Platinum Gauze Catalyst Grid (Module 2)",
    "cardType": "EQUIP_CATALYST",
    "spellTrapSubtype": "EQUIP_SPELL",
    "spellSpeed": 1,
    "rarity": "COMMON",
    "attribute": "NOBLE_VOID",
    "manaCost": 1,
    "chemicalFormula": "Pt/Rh Mesh",
    "effectCode": "SPELL_B17_PLATINUM_GAUZE_CATALYST_GRID_EQUIP_9",
    "effectText": "[Phép Trang Bị / Equip]: Trang bị cho 1 quái thú trên sân. Quái thú được trang bị nhận +500 ATK và +300 DEF, đồng thời được bảo vệ khỏi bị phá hủy bởi hiệu ứng bài phép một lần mỗi lượt.",
    "scientificLore": "Chất xúc tác bề mặt Lưới Bạch Kim Xúc Tác Ôtô (Pt/Rh Mesh) cung cấp tâm hoạt động hạ thấp hàng rào thế năng phản ứng hóa học theo chương trình Hóa học 10 GDPT 2018.",
    "relatedEquation": "2CO + O₂ --Pt--> 2CO₂",
    "iupacName": "Platinum Gauze Catalyst Grid Matrix",
    "archetype": "PRECIOUS_CATALYST",
    "structuredEffects": [
      {
        "effectId": "B17_EFF_9",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 500,
              "statTarget": "ATK",
              "targetScope": "TARGET"
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "DEF",
              "targetScope": "TARGET"
            }
          }
        ],
        "description": "Tăng 500 ATK và 300 DEF cho quái thú trang bị."
      }
    ]
  },
  {
    "id": "card_b17_010_equip_zeolite_zsm_5_molecular_sieve_10",
    "name": "Hạt Xúc Tác Zeolit Lồng Chọn Lọc (Modul 2)",
    "name_en": "Zeolite ZSM-5 Molecular Sieve (Module 2)",
    "cardType": "EQUIP_CATALYST",
    "spellTrapSubtype": "EQUIP_SPELL",
    "spellSpeed": 1,
    "rarity": "COMMON",
    "attribute": "TERRA",
    "manaCost": 2,
    "chemicalFormula": "Zeolite",
    "effectCode": "SPELL_B17_ZEOLITE_ZSM_5_MOLECULAR_SIEVE_EQUIP_10",
    "effectText": "[Phép Trang Bị / Equip]: Trang bị cho 1 quái thú trên sân. Quái thú được trang bị nhận +500 ATK và +300 DEF, đồng thời được bảo vệ khỏi bị phá hủy bởi hiệu ứng bài phép một lần mỗi lượt.",
    "scientificLore": "Chất xúc tác bề mặt Hạt Xúc Tác Zeolit Lồng Chọn Lọc (Zeolite) cung cấp tâm hoạt động hạ thấp hàng rào thế năng phản ứng hóa học theo chương trình Hóa học 10 GDPT 2018.",
    "relatedEquation": "Shape-Selective Hydrocarbon Cracking Pores",
    "iupacName": "Zeolite ZSM-5 Molecular Sieve Matrix",
    "archetype": "ORGANOMETALLIC_CATALYSIS",
    "structuredEffects": [
      {
        "effectId": "B17_EFF_10",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 500,
              "statTarget": "ATK",
              "targetScope": "TARGET"
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "DEF",
              "targetScope": "TARGET"
            }
          }
        ],
        "description": "Tăng 500 ATK và 300 DEF cho quái thú trang bị."
      }
    ]
  },
  {
    "id": "card_b17_011_equip_raney_nickel_spongy_catalyst_11",
    "name": "Xúc Tác Niken Raney Xốp (Modul 2)",
    "name_en": "Raney Nickel Spongy Catalyst (Module 2)",
    "cardType": "EQUIP_CATALYST",
    "spellTrapSubtype": "EQUIP_SPELL",
    "spellSpeed": 1,
    "rarity": "COMMON",
    "attribute": "PYRO",
    "manaCost": 3,
    "chemicalFormula": "Ni-Al Porous",
    "effectCode": "SPELL_B17_RANEY_NICKEL_SPONGY_CATALYST_EQUIP_11",
    "effectText": "[Phép Trang Bị / Equip]: Trang bị cho 1 quái thú trên sân. Quái thú được trang bị nhận +500 ATK và +300 DEF, đồng thời được bảo vệ khỏi bị phá hủy bởi hiệu ứng bài phép một lần mỗi lượt.",
    "scientificLore": "Chất xúc tác bề mặt Xúc Tác Niken Raney Xốp (Ni-Al Porous) cung cấp tâm hoạt động hạ thấp hàng rào thế năng phản ứng hóa học theo chương trình Hóa học 10 GDPT 2018.",
    "relatedEquation": "R-CH=CH-R + H₂ --Ni--> R-CH₂-CH₂-R",
    "iupacName": "Raney Nickel Spongy Catalyst Matrix",
    "archetype": "PRECIOUS_CATALYST",
    "structuredEffects": [
      {
        "effectId": "B17_EFF_11",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 500,
              "statTarget": "ATK",
              "targetScope": "TARGET"
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "DEF",
              "targetScope": "TARGET"
            }
          }
        ],
        "description": "Tăng 500 ATK và 300 DEF cho quái thú trang bị."
      }
    ]
  },
  {
    "id": "card_b17_012_equip_edta_octahedral_chelate_shield_12",
    "name": "Chất Chelate Phối Trí EDTA (Modul 2)",
    "name_en": "EDTA Octahedral Chelate Shield (Module 2)",
    "cardType": "EQUIP_CATALYST",
    "spellTrapSubtype": "EQUIP_SPELL",
    "spellSpeed": 1,
    "rarity": "RARE",
    "attribute": "AQUA",
    "manaCost": 4,
    "chemicalFormula": "Na2H2EDTA",
    "effectCode": "SPELL_B17_EDTA_OCTAHEDRAL_CHELATE_SHIELD_EQUIP_12",
    "effectText": "[Phép Trang Bị / Equip]: Trang bị cho 1 quái thú trên sân. Quái thú được trang bị nhận +500 ATK và +300 DEF, đồng thời được bảo vệ khỏi bị phá hủy bởi hiệu ứng bài phép một lần mỗi lượt.",
    "scientificLore": "Chất xúc tác bề mặt Chất Chelate Phối Trí EDTA (Na2H2EDTA) cung cấp tâm hoạt động hạ thấp hàng rào thế năng phản ứng hóa học theo chương trình Hóa học 10 GDPT 2018.",
    "relatedEquation": "Metal²⁺ + EDTA⁴⁻ → [Metal(EDTA)]²⁻ Complex",
    "iupacName": "EDTA Octahedral Chelate Shield Matrix",
    "archetype": "ORGANOMETALLIC_CATALYSIS",
    "structuredEffects": [
      {
        "effectId": "B17_EFF_12",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 500,
              "statTarget": "ATK",
              "targetScope": "TARGET"
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "DEF",
              "targetScope": "TARGET"
            }
          }
        ],
        "description": "Tăng 500 ATK và 300 DEF cho quái thú trang bị."
      }
    ]
  },
  {
    "id": "card_b17_013_equip_18_crown_6_ether_ring_13",
    "name": "Vòng Vương Miện Crown Ether (Modul 2)",
    "name_en": "18-Crown-6 Ether Ring (Module 2)",
    "cardType": "EQUIP_CATALYST",
    "spellTrapSubtype": "EQUIP_SPELL",
    "spellSpeed": 1,
    "rarity": "RARE",
    "attribute": "ELECTRO",
    "manaCost": 1,
    "chemicalFormula": "C12H24O6",
    "effectCode": "SPELL_B17_18_CROWN_6_ETHER_RING_EQUIP_13",
    "effectText": "[Phép Trang Bị / Equip]: Trang bị cho 1 quái thú trên sân. Quái thú được trang bị nhận +500 ATK và +300 DEF, đồng thời được bảo vệ khỏi bị phá hủy bởi hiệu ứng bài phép một lần mỗi lượt.",
    "scientificLore": "Chất xúc tác bề mặt Vòng Vương Miện Crown Ether (C12H24O6) cung cấp tâm hoạt động hạ thấp hàng rào thế năng phản ứng hóa học theo chương trình Hóa học 10 GDPT 2018.",
    "relatedEquation": "K⁺ + 18-Crown-6 → [K(18-Crown-6)]⁺ Cavity Inclusion",
    "iupacName": "18-Crown-6 Ether Ring Matrix",
    "archetype": "PRECIOUS_CATALYST",
    "structuredEffects": [
      {
        "effectId": "B17_EFF_13",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 500,
              "statTarget": "ATK",
              "targetScope": "TARGET"
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "DEF",
              "targetScope": "TARGET"
            }
          }
        ],
        "description": "Tăng 500 ATK và 300 DEF cho quái thú trang bị."
      }
    ]
  },
  {
    "id": "card_b17_014_equip_gold_coated_carbon_nanotube_probe_14",
    "name": "Ống Cacbon Dẫn Electron Phủ Vàng (Modul 2)",
    "name_en": "Gold-Coated Carbon Nanotube Probe (Module 2)",
    "cardType": "EQUIP_CATALYST",
    "spellTrapSubtype": "EQUIP_SPELL",
    "spellSpeed": 1,
    "rarity": "SUPER_RARE",
    "attribute": "ELECTRO",
    "manaCost": 2,
    "chemicalFormula": "Au-CNT",
    "effectCode": "SPELL_B17_GOLD_COATED_CARBON_NANOTUBE_PROBE_EQUIP_14",
    "effectText": "[Phép Trang Bị / Equip]: Trang bị cho 1 quái thú trên sân. Quái thú được trang bị nhận +500 ATK và +300 DEF, đồng thời được bảo vệ khỏi bị phá hủy bởi hiệu ứng bài phép một lần mỗi lượt.",
    "scientificLore": "Chất xúc tác bề mặt Ống Cacbon Dẫn Electron Phủ Vàng (Au-CNT) cung cấp tâm hoạt động hạ thấp hàng rào thế năng phản ứng hóa học theo chương trình Hóa học 10 GDPT 2018.",
    "relatedEquation": "Ballistic Electron Transport Catalyst",
    "iupacName": "Gold-Coated Carbon Nanotube Probe Matrix",
    "archetype": "ORGANOMETALLIC_CATALYSIS",
    "structuredEffects": [
      {
        "effectId": "B17_EFF_14",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 500,
              "statTarget": "ATK",
              "targetScope": "TARGET"
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "DEF",
              "targetScope": "TARGET"
            }
          }
        ],
        "description": "Tăng 500 ATK và 300 DEF cho quái thú trang bị."
      }
    ]
  },
  {
    "id": "card_b17_015_equip_cadmium_sulfide_quantum_dot_sensor_15",
    "name": "Hạt Xúc Tác Bán Dẫn Cadmi Sunfua (Modul 2)",
    "name_en": "Cadmium Sulfide Quantum Dot Sensor (Module 2)",
    "cardType": "EQUIP_CATALYST",
    "spellTrapSubtype": "EQUIP_SPELL",
    "spellSpeed": 1,
    "rarity": "SUPER_RARE",
    "attribute": "ELECTRO",
    "manaCost": 3,
    "chemicalFormula": "CdS QD",
    "effectCode": "SPELL_B17_CADMIUM_SULFIDE_QUANTUM_DOT_SENSOR_EQUIP_15",
    "effectText": "[Phép Trang Bị / Equip]: Trang bị cho 1 quái thú trên sân. Quái thú được trang bị nhận +500 ATK và +300 DEF, đồng thời được bảo vệ khỏi bị phá hủy bởi hiệu ứng bài phép một lần mỗi lượt.",
    "scientificLore": "Chất xúc tác bề mặt Hạt Xúc Tác Bán Dẫn Cadmi Sunfua (CdS QD) cung cấp tâm hoạt động hạ thấp hàng rào thế năng phản ứng hóa học theo chương trình Hóa học 10 GDPT 2018.",
    "relatedEquation": "Quantum Confinement Exciton Photocatalysis",
    "iupacName": "Cadmium Sulfide Quantum Dot Sensor Matrix",
    "archetype": "PRECIOUS_CATALYST",
    "structuredEffects": [
      {
        "effectId": "B17_EFF_15",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 500,
              "statTarget": "ATK",
              "targetScope": "TARGET"
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "DEF",
              "targetScope": "TARGET"
            }
          }
        ],
        "description": "Tăng 500 ATK và 300 DEF cho quái thú trang bị."
      }
    ]
  },
  {
    "id": "card_b17_016_equip_immobilized_biocatalytic_membrane_16",
    "name": "Màng Xúc Tác Enzymatic Cố Định (Modul 2)",
    "name_en": "Immobilized Biocatalytic Membrane (Module 2)",
    "cardType": "EQUIP_CATALYST",
    "spellTrapSubtype": "EQUIP_SPELL",
    "spellSpeed": 1,
    "rarity": "ULTRA_RARE",
    "attribute": "AQUA",
    "manaCost": 4,
    "chemicalFormula": "Enzyme-Mat",
    "effectCode": "SPELL_B17_IMMOBILIZED_BIOCATALYTIC_MEMBRANE_EQUIP_16",
    "effectText": "[Phép Trang Bị / Equip]: Trang bị cho 1 quái thú trên sân. Quái thú được trang bị nhận +500 ATK và +300 DEF, đồng thời được bảo vệ khỏi bị phá hủy bởi hiệu ứng bài phép một lần mỗi lượt.",
    "scientificLore": "Chất xúc tác bề mặt Màng Xúc Tác Enzymatic Cố Định (Enzyme-Mat) cung cấp tâm hoạt động hạ thấp hàng rào thế năng phản ứng hóa học theo chương trình Hóa học 10 GDPT 2018.",
    "relatedEquation": "High-Turnover Enantioselective Synthesis",
    "iupacName": "Immobilized Biocatalytic Membrane Matrix",
    "archetype": "ORGANOMETALLIC_CATALYSIS",
    "structuredEffects": [
      {
        "effectId": "B17_EFF_16",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 500,
              "statTarget": "ATK",
              "targetScope": "TARGET"
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "DEF",
              "targetScope": "TARGET"
            }
          }
        ],
        "description": "Tăng 500 ATK và 300 DEF cho quái thú trang bị."
      }
    ]
  },
  {
    "id": "card_b17_017_equip_platinum_gauze_catalyst_grid_17",
    "name": "Lưới Bạch Kim Xúc Tác Ôtô (Modul 3)",
    "name_en": "Platinum Gauze Catalyst Grid (Module 3)",
    "cardType": "EQUIP_CATALYST",
    "spellTrapSubtype": "EQUIP_SPELL",
    "spellSpeed": 1,
    "rarity": "SECRET_RARE",
    "attribute": "NOBLE_VOID",
    "manaCost": 1,
    "chemicalFormula": "Pt/Rh Mesh",
    "effectCode": "SPELL_B17_PLATINUM_GAUZE_CATALYST_GRID_EQUIP_17",
    "effectText": "[Phép Trang Bị / Equip]: Trang bị cho 1 quái thú trên sân. Quái thú được trang bị nhận +500 ATK và +300 DEF, đồng thời được bảo vệ khỏi bị phá hủy bởi hiệu ứng bài phép một lần mỗi lượt.",
    "scientificLore": "Chất xúc tác bề mặt Lưới Bạch Kim Xúc Tác Ôtô (Pt/Rh Mesh) cung cấp tâm hoạt động hạ thấp hàng rào thế năng phản ứng hóa học theo chương trình Hóa học 10 GDPT 2018.",
    "relatedEquation": "2CO + O₂ --Pt--> 2CO₂",
    "iupacName": "Platinum Gauze Catalyst Grid Matrix",
    "archetype": "PRECIOUS_CATALYST",
    "structuredEffects": [
      {
        "effectId": "B17_EFF_17",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 500,
              "statTarget": "ATK",
              "targetScope": "TARGET"
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "DEF",
              "targetScope": "TARGET"
            }
          }
        ],
        "description": "Tăng 500 ATK và 300 DEF cho quái thú trang bị."
      }
    ]
  },
  {
    "id": "card_b17_018_equip_zeolite_zsm_5_molecular_sieve_18",
    "name": "Hạt Xúc Tác Zeolit Lồng Chọn Lọc (Modul 3)",
    "name_en": "Zeolite ZSM-5 Molecular Sieve (Module 3)",
    "cardType": "EQUIP_CATALYST",
    "spellTrapSubtype": "EQUIP_SPELL",
    "spellSpeed": 1,
    "rarity": "COMMON",
    "attribute": "TERRA",
    "manaCost": 2,
    "chemicalFormula": "Zeolite",
    "effectCode": "SPELL_B17_ZEOLITE_ZSM_5_MOLECULAR_SIEVE_EQUIP_18",
    "effectText": "[Phép Trang Bị / Equip]: Trang bị cho 1 quái thú trên sân. Quái thú được trang bị nhận +500 ATK và +300 DEF, đồng thời được bảo vệ khỏi bị phá hủy bởi hiệu ứng bài phép một lần mỗi lượt.",
    "scientificLore": "Chất xúc tác bề mặt Hạt Xúc Tác Zeolit Lồng Chọn Lọc (Zeolite) cung cấp tâm hoạt động hạ thấp hàng rào thế năng phản ứng hóa học theo chương trình Hóa học 10 GDPT 2018.",
    "relatedEquation": "Shape-Selective Hydrocarbon Cracking Pores",
    "iupacName": "Zeolite ZSM-5 Molecular Sieve Matrix",
    "archetype": "ORGANOMETALLIC_CATALYSIS",
    "structuredEffects": [
      {
        "effectId": "B17_EFF_18",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 500,
              "statTarget": "ATK",
              "targetScope": "TARGET"
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "DEF",
              "targetScope": "TARGET"
            }
          }
        ],
        "description": "Tăng 500 ATK và 300 DEF cho quái thú trang bị."
      }
    ]
  },
  {
    "id": "card_b17_019_equip_raney_nickel_spongy_catalyst_19",
    "name": "Xúc Tác Niken Raney Xốp (Modul 3)",
    "name_en": "Raney Nickel Spongy Catalyst (Module 3)",
    "cardType": "EQUIP_CATALYST",
    "spellTrapSubtype": "EQUIP_SPELL",
    "spellSpeed": 1,
    "rarity": "COMMON",
    "attribute": "PYRO",
    "manaCost": 3,
    "chemicalFormula": "Ni-Al Porous",
    "effectCode": "SPELL_B17_RANEY_NICKEL_SPONGY_CATALYST_EQUIP_19",
    "effectText": "[Phép Trang Bị / Equip]: Trang bị cho 1 quái thú trên sân. Quái thú được trang bị nhận +500 ATK và +300 DEF, đồng thời được bảo vệ khỏi bị phá hủy bởi hiệu ứng bài phép một lần mỗi lượt.",
    "scientificLore": "Chất xúc tác bề mặt Xúc Tác Niken Raney Xốp (Ni-Al Porous) cung cấp tâm hoạt động hạ thấp hàng rào thế năng phản ứng hóa học theo chương trình Hóa học 10 GDPT 2018.",
    "relatedEquation": "R-CH=CH-R + H₂ --Ni--> R-CH₂-CH₂-R",
    "iupacName": "Raney Nickel Spongy Catalyst Matrix",
    "archetype": "PRECIOUS_CATALYST",
    "structuredEffects": [
      {
        "effectId": "B17_EFF_19",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 500,
              "statTarget": "ATK",
              "targetScope": "TARGET"
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "DEF",
              "targetScope": "TARGET"
            }
          }
        ],
        "description": "Tăng 500 ATK và 300 DEF cho quái thú trang bị."
      }
    ]
  },
  {
    "id": "card_b17_020_equip_edta_octahedral_chelate_shield_20",
    "name": "Chất Chelate Phối Trí EDTA (Modul 3)",
    "name_en": "EDTA Octahedral Chelate Shield (Module 3)",
    "cardType": "EQUIP_CATALYST",
    "spellTrapSubtype": "EQUIP_SPELL",
    "spellSpeed": 1,
    "rarity": "COMMON",
    "attribute": "AQUA",
    "manaCost": 4,
    "chemicalFormula": "Na2H2EDTA",
    "effectCode": "SPELL_B17_EDTA_OCTAHEDRAL_CHELATE_SHIELD_EQUIP_20",
    "effectText": "[Phép Trang Bị / Equip]: Trang bị cho 1 quái thú trên sân. Quái thú được trang bị nhận +500 ATK và +300 DEF, đồng thời được bảo vệ khỏi bị phá hủy bởi hiệu ứng bài phép một lần mỗi lượt.",
    "scientificLore": "Chất xúc tác bề mặt Chất Chelate Phối Trí EDTA (Na2H2EDTA) cung cấp tâm hoạt động hạ thấp hàng rào thế năng phản ứng hóa học theo chương trình Hóa học 10 GDPT 2018.",
    "relatedEquation": "Metal²⁺ + EDTA⁴⁻ → [Metal(EDTA)]²⁻ Complex",
    "iupacName": "EDTA Octahedral Chelate Shield Matrix",
    "archetype": "ORGANOMETALLIC_CATALYSIS",
    "structuredEffects": [
      {
        "effectId": "B17_EFF_20",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 500,
              "statTarget": "ATK",
              "targetScope": "TARGET"
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "DEF",
              "targetScope": "TARGET"
            }
          }
        ],
        "description": "Tăng 500 ATK và 300 DEF cho quái thú trang bị."
      }
    ]
  },
  {
    "id": "card_b17_021_equip_18_crown_6_ether_ring_21",
    "name": "Vòng Vương Miện Crown Ether (Modul 3)",
    "name_en": "18-Crown-6 Ether Ring (Module 3)",
    "cardType": "EQUIP_CATALYST",
    "spellTrapSubtype": "EQUIP_SPELL",
    "spellSpeed": 1,
    "rarity": "RARE",
    "attribute": "ELECTRO",
    "manaCost": 1,
    "chemicalFormula": "C12H24O6",
    "effectCode": "SPELL_B17_18_CROWN_6_ETHER_RING_EQUIP_21",
    "effectText": "[Phép Trang Bị / Equip]: Trang bị cho 1 quái thú trên sân. Quái thú được trang bị nhận +500 ATK và +300 DEF, đồng thời được bảo vệ khỏi bị phá hủy bởi hiệu ứng bài phép một lần mỗi lượt.",
    "scientificLore": "Chất xúc tác bề mặt Vòng Vương Miện Crown Ether (C12H24O6) cung cấp tâm hoạt động hạ thấp hàng rào thế năng phản ứng hóa học theo chương trình Hóa học 10 GDPT 2018.",
    "relatedEquation": "K⁺ + 18-Crown-6 → [K(18-Crown-6)]⁺ Cavity Inclusion",
    "iupacName": "18-Crown-6 Ether Ring Matrix",
    "archetype": "PRECIOUS_CATALYST",
    "structuredEffects": [
      {
        "effectId": "B17_EFF_21",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 500,
              "statTarget": "ATK",
              "targetScope": "TARGET"
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "DEF",
              "targetScope": "TARGET"
            }
          }
        ],
        "description": "Tăng 500 ATK và 300 DEF cho quái thú trang bị."
      }
    ]
  },
  {
    "id": "card_b17_022_equip_gold_coated_carbon_nanotube_probe_22",
    "name": "Ống Cacbon Dẫn Electron Phủ Vàng (Modul 3)",
    "name_en": "Gold-Coated Carbon Nanotube Probe (Module 3)",
    "cardType": "EQUIP_CATALYST",
    "spellTrapSubtype": "EQUIP_SPELL",
    "spellSpeed": 1,
    "rarity": "RARE",
    "attribute": "ELECTRO",
    "manaCost": 2,
    "chemicalFormula": "Au-CNT",
    "effectCode": "SPELL_B17_GOLD_COATED_CARBON_NANOTUBE_PROBE_EQUIP_22",
    "effectText": "[Phép Trang Bị / Equip]: Trang bị cho 1 quái thú trên sân. Quái thú được trang bị nhận +500 ATK và +300 DEF, đồng thời được bảo vệ khỏi bị phá hủy bởi hiệu ứng bài phép một lần mỗi lượt.",
    "scientificLore": "Chất xúc tác bề mặt Ống Cacbon Dẫn Electron Phủ Vàng (Au-CNT) cung cấp tâm hoạt động hạ thấp hàng rào thế năng phản ứng hóa học theo chương trình Hóa học 10 GDPT 2018.",
    "relatedEquation": "Ballistic Electron Transport Catalyst",
    "iupacName": "Gold-Coated Carbon Nanotube Probe Matrix",
    "archetype": "ORGANOMETALLIC_CATALYSIS",
    "structuredEffects": [
      {
        "effectId": "B17_EFF_22",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 500,
              "statTarget": "ATK",
              "targetScope": "TARGET"
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "DEF",
              "targetScope": "TARGET"
            }
          }
        ],
        "description": "Tăng 500 ATK và 300 DEF cho quái thú trang bị."
      }
    ]
  },
  {
    "id": "card_b17_023_equip_cadmium_sulfide_quantum_dot_sensor_23",
    "name": "Hạt Xúc Tác Bán Dẫn Cadmi Sunfua (Modul 3)",
    "name_en": "Cadmium Sulfide Quantum Dot Sensor (Module 3)",
    "cardType": "EQUIP_CATALYST",
    "spellTrapSubtype": "EQUIP_SPELL",
    "spellSpeed": 1,
    "rarity": "SUPER_RARE",
    "attribute": "ELECTRO",
    "manaCost": 3,
    "chemicalFormula": "CdS QD",
    "effectCode": "SPELL_B17_CADMIUM_SULFIDE_QUANTUM_DOT_SENSOR_EQUIP_23",
    "effectText": "[Phép Trang Bị / Equip]: Trang bị cho 1 quái thú trên sân. Quái thú được trang bị nhận +500 ATK và +300 DEF, đồng thời được bảo vệ khỏi bị phá hủy bởi hiệu ứng bài phép một lần mỗi lượt.",
    "scientificLore": "Chất xúc tác bề mặt Hạt Xúc Tác Bán Dẫn Cadmi Sunfua (CdS QD) cung cấp tâm hoạt động hạ thấp hàng rào thế năng phản ứng hóa học theo chương trình Hóa học 10 GDPT 2018.",
    "relatedEquation": "Quantum Confinement Exciton Photocatalysis",
    "iupacName": "Cadmium Sulfide Quantum Dot Sensor Matrix",
    "archetype": "PRECIOUS_CATALYST",
    "structuredEffects": [
      {
        "effectId": "B17_EFF_23",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 500,
              "statTarget": "ATK",
              "targetScope": "TARGET"
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "DEF",
              "targetScope": "TARGET"
            }
          }
        ],
        "description": "Tăng 500 ATK và 300 DEF cho quái thú trang bị."
      }
    ]
  },
  {
    "id": "card_b17_024_equip_immobilized_biocatalytic_membrane_24",
    "name": "Màng Xúc Tác Enzymatic Cố Định (Modul 3)",
    "name_en": "Immobilized Biocatalytic Membrane (Module 3)",
    "cardType": "EQUIP_CATALYST",
    "spellTrapSubtype": "EQUIP_SPELL",
    "spellSpeed": 1,
    "rarity": "SUPER_RARE",
    "attribute": "AQUA",
    "manaCost": 4,
    "chemicalFormula": "Enzyme-Mat",
    "effectCode": "SPELL_B17_IMMOBILIZED_BIOCATALYTIC_MEMBRANE_EQUIP_24",
    "effectText": "[Phép Trang Bị / Equip]: Trang bị cho 1 quái thú trên sân. Quái thú được trang bị nhận +500 ATK và +300 DEF, đồng thời được bảo vệ khỏi bị phá hủy bởi hiệu ứng bài phép một lần mỗi lượt.",
    "scientificLore": "Chất xúc tác bề mặt Màng Xúc Tác Enzymatic Cố Định (Enzyme-Mat) cung cấp tâm hoạt động hạ thấp hàng rào thế năng phản ứng hóa học theo chương trình Hóa học 10 GDPT 2018.",
    "relatedEquation": "High-Turnover Enantioselective Synthesis",
    "iupacName": "Immobilized Biocatalytic Membrane Matrix",
    "archetype": "ORGANOMETALLIC_CATALYSIS",
    "structuredEffects": [
      {
        "effectId": "B17_EFF_24",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 500,
              "statTarget": "ATK",
              "targetScope": "TARGET"
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "DEF",
              "targetScope": "TARGET"
            }
          }
        ],
        "description": "Tăng 500 ATK và 300 DEF cho quái thú trang bị."
      }
    ]
  },
  {
    "id": "card_b17_025_equip_platinum_gauze_catalyst_grid_25",
    "name": "Lưới Bạch Kim Xúc Tác Ôtô (Modul 4)",
    "name_en": "Platinum Gauze Catalyst Grid (Module 4)",
    "cardType": "EQUIP_CATALYST",
    "spellTrapSubtype": "EQUIP_SPELL",
    "spellSpeed": 1,
    "rarity": "ULTRA_RARE",
    "attribute": "NOBLE_VOID",
    "manaCost": 1,
    "chemicalFormula": "Pt/Rh Mesh",
    "effectCode": "SPELL_B17_PLATINUM_GAUZE_CATALYST_GRID_EQUIP_25",
    "effectText": "[Phép Trang Bị / Equip]: Trang bị cho 1 quái thú trên sân. Quái thú được trang bị nhận +500 ATK và +300 DEF, đồng thời được bảo vệ khỏi bị phá hủy bởi hiệu ứng bài phép một lần mỗi lượt.",
    "scientificLore": "Chất xúc tác bề mặt Lưới Bạch Kim Xúc Tác Ôtô (Pt/Rh Mesh) cung cấp tâm hoạt động hạ thấp hàng rào thế năng phản ứng hóa học theo chương trình Hóa học 10 GDPT 2018.",
    "relatedEquation": "2CO + O₂ --Pt--> 2CO₂",
    "iupacName": "Platinum Gauze Catalyst Grid Matrix",
    "archetype": "PRECIOUS_CATALYST",
    "structuredEffects": [
      {
        "effectId": "B17_EFF_25",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 500,
              "statTarget": "ATK",
              "targetScope": "TARGET"
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "DEF",
              "targetScope": "TARGET"
            }
          }
        ],
        "description": "Tăng 500 ATK và 300 DEF cho quái thú trang bị."
      }
    ]
  },
  {
    "id": "card_b17_026_equip_zeolite_zsm_5_molecular_sieve_26",
    "name": "Hạt Xúc Tác Zeolit Lồng Chọn Lọc (Modul 4)",
    "name_en": "Zeolite ZSM-5 Molecular Sieve (Module 4)",
    "cardType": "EQUIP_CATALYST",
    "spellTrapSubtype": "EQUIP_SPELL",
    "spellSpeed": 1,
    "rarity": "SECRET_RARE",
    "attribute": "TERRA",
    "manaCost": 2,
    "chemicalFormula": "Zeolite",
    "effectCode": "SPELL_B17_ZEOLITE_ZSM_5_MOLECULAR_SIEVE_EQUIP_26",
    "effectText": "[Phép Trang Bị / Equip]: Trang bị cho 1 quái thú trên sân. Quái thú được trang bị nhận +500 ATK và +300 DEF, đồng thời được bảo vệ khỏi bị phá hủy bởi hiệu ứng bài phép một lần mỗi lượt.",
    "scientificLore": "Chất xúc tác bề mặt Hạt Xúc Tác Zeolit Lồng Chọn Lọc (Zeolite) cung cấp tâm hoạt động hạ thấp hàng rào thế năng phản ứng hóa học theo chương trình Hóa học 10 GDPT 2018.",
    "relatedEquation": "Shape-Selective Hydrocarbon Cracking Pores",
    "iupacName": "Zeolite ZSM-5 Molecular Sieve Matrix",
    "archetype": "ORGANOMETALLIC_CATALYSIS",
    "structuredEffects": [
      {
        "effectId": "B17_EFF_26",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 500,
              "statTarget": "ATK",
              "targetScope": "TARGET"
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "DEF",
              "targetScope": "TARGET"
            }
          }
        ],
        "description": "Tăng 500 ATK và 300 DEF cho quái thú trang bị."
      }
    ]
  },
  {
    "id": "card_b17_027_equip_raney_nickel_spongy_catalyst_27",
    "name": "Xúc Tác Niken Raney Xốp (Modul 4)",
    "name_en": "Raney Nickel Spongy Catalyst (Module 4)",
    "cardType": "EQUIP_CATALYST",
    "spellTrapSubtype": "EQUIP_SPELL",
    "spellSpeed": 1,
    "rarity": "COMMON",
    "attribute": "PYRO",
    "manaCost": 3,
    "chemicalFormula": "Ni-Al Porous",
    "effectCode": "SPELL_B17_RANEY_NICKEL_SPONGY_CATALYST_EQUIP_27",
    "effectText": "[Phép Trang Bị / Equip]: Trang bị cho 1 quái thú trên sân. Quái thú được trang bị nhận +500 ATK và +300 DEF, đồng thời được bảo vệ khỏi bị phá hủy bởi hiệu ứng bài phép một lần mỗi lượt.",
    "scientificLore": "Chất xúc tác bề mặt Xúc Tác Niken Raney Xốp (Ni-Al Porous) cung cấp tâm hoạt động hạ thấp hàng rào thế năng phản ứng hóa học theo chương trình Hóa học 10 GDPT 2018.",
    "relatedEquation": "R-CH=CH-R + H₂ --Ni--> R-CH₂-CH₂-R",
    "iupacName": "Raney Nickel Spongy Catalyst Matrix",
    "archetype": "PRECIOUS_CATALYST",
    "structuredEffects": [
      {
        "effectId": "B17_EFF_27",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 500,
              "statTarget": "ATK",
              "targetScope": "TARGET"
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "DEF",
              "targetScope": "TARGET"
            }
          }
        ],
        "description": "Tăng 500 ATK và 300 DEF cho quái thú trang bị."
      }
    ]
  },
  {
    "id": "card_b17_028_equip_edta_octahedral_chelate_shield_28",
    "name": "Chất Chelate Phối Trí EDTA (Modul 4)",
    "name_en": "EDTA Octahedral Chelate Shield (Module 4)",
    "cardType": "EQUIP_CATALYST",
    "spellTrapSubtype": "EQUIP_SPELL",
    "spellSpeed": 1,
    "rarity": "COMMON",
    "attribute": "AQUA",
    "manaCost": 4,
    "chemicalFormula": "Na2H2EDTA",
    "effectCode": "SPELL_B17_EDTA_OCTAHEDRAL_CHELATE_SHIELD_EQUIP_28",
    "effectText": "[Phép Trang Bị / Equip]: Trang bị cho 1 quái thú trên sân. Quái thú được trang bị nhận +500 ATK và +300 DEF, đồng thời được bảo vệ khỏi bị phá hủy bởi hiệu ứng bài phép một lần mỗi lượt.",
    "scientificLore": "Chất xúc tác bề mặt Chất Chelate Phối Trí EDTA (Na2H2EDTA) cung cấp tâm hoạt động hạ thấp hàng rào thế năng phản ứng hóa học theo chương trình Hóa học 10 GDPT 2018.",
    "relatedEquation": "Metal²⁺ + EDTA⁴⁻ → [Metal(EDTA)]²⁻ Complex",
    "iupacName": "EDTA Octahedral Chelate Shield Matrix",
    "archetype": "ORGANOMETALLIC_CATALYSIS",
    "structuredEffects": [
      {
        "effectId": "B17_EFF_28",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 500,
              "statTarget": "ATK",
              "targetScope": "TARGET"
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "DEF",
              "targetScope": "TARGET"
            }
          }
        ],
        "description": "Tăng 500 ATK và 300 DEF cho quái thú trang bị."
      }
    ]
  },
  {
    "id": "card_b17_029_equip_18_crown_6_ether_ring_29",
    "name": "Vòng Vương Miện Crown Ether (Modul 4)",
    "name_en": "18-Crown-6 Ether Ring (Module 4)",
    "cardType": "EQUIP_CATALYST",
    "spellTrapSubtype": "EQUIP_SPELL",
    "spellSpeed": 1,
    "rarity": "COMMON",
    "attribute": "ELECTRO",
    "manaCost": 1,
    "chemicalFormula": "C12H24O6",
    "effectCode": "SPELL_B17_18_CROWN_6_ETHER_RING_EQUIP_29",
    "effectText": "[Phép Trang Bị / Equip]: Trang bị cho 1 quái thú trên sân. Quái thú được trang bị nhận +500 ATK và +300 DEF, đồng thời được bảo vệ khỏi bị phá hủy bởi hiệu ứng bài phép một lần mỗi lượt.",
    "scientificLore": "Chất xúc tác bề mặt Vòng Vương Miện Crown Ether (C12H24O6) cung cấp tâm hoạt động hạ thấp hàng rào thế năng phản ứng hóa học theo chương trình Hóa học 10 GDPT 2018.",
    "relatedEquation": "K⁺ + 18-Crown-6 → [K(18-Crown-6)]⁺ Cavity Inclusion",
    "iupacName": "18-Crown-6 Ether Ring Matrix",
    "archetype": "PRECIOUS_CATALYST",
    "structuredEffects": [
      {
        "effectId": "B17_EFF_29",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 500,
              "statTarget": "ATK",
              "targetScope": "TARGET"
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "DEF",
              "targetScope": "TARGET"
            }
          }
        ],
        "description": "Tăng 500 ATK và 300 DEF cho quái thú trang bị."
      }
    ]
  },
  {
    "id": "card_b17_030_equip_gold_coated_carbon_nanotube_probe_30",
    "name": "Ống Cacbon Dẫn Electron Phủ Vàng (Modul 4)",
    "name_en": "Gold-Coated Carbon Nanotube Probe (Module 4)",
    "cardType": "EQUIP_CATALYST",
    "spellTrapSubtype": "EQUIP_SPELL",
    "spellSpeed": 1,
    "rarity": "RARE",
    "attribute": "ELECTRO",
    "manaCost": 2,
    "chemicalFormula": "Au-CNT",
    "effectCode": "SPELL_B17_GOLD_COATED_CARBON_NANOTUBE_PROBE_EQUIP_30",
    "effectText": "[Phép Trang Bị / Equip]: Trang bị cho 1 quái thú trên sân. Quái thú được trang bị nhận +500 ATK và +300 DEF, đồng thời được bảo vệ khỏi bị phá hủy bởi hiệu ứng bài phép một lần mỗi lượt.",
    "scientificLore": "Chất xúc tác bề mặt Ống Cacbon Dẫn Electron Phủ Vàng (Au-CNT) cung cấp tâm hoạt động hạ thấp hàng rào thế năng phản ứng hóa học theo chương trình Hóa học 10 GDPT 2018.",
    "relatedEquation": "Ballistic Electron Transport Catalyst",
    "iupacName": "Gold-Coated Carbon Nanotube Probe Matrix",
    "archetype": "ORGANOMETALLIC_CATALYSIS",
    "structuredEffects": [
      {
        "effectId": "B17_EFF_30",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 500,
              "statTarget": "ATK",
              "targetScope": "TARGET"
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "DEF",
              "targetScope": "TARGET"
            }
          }
        ],
        "description": "Tăng 500 ATK và 300 DEF cho quái thú trang bị."
      }
    ]
  },
  {
    "id": "card_b17_031_equip_cadmium_sulfide_quantum_dot_sensor_31",
    "name": "Hạt Xúc Tác Bán Dẫn Cadmi Sunfua (Modul 4)",
    "name_en": "Cadmium Sulfide Quantum Dot Sensor (Module 4)",
    "cardType": "EQUIP_CATALYST",
    "spellTrapSubtype": "EQUIP_SPELL",
    "spellSpeed": 1,
    "rarity": "RARE",
    "attribute": "ELECTRO",
    "manaCost": 3,
    "chemicalFormula": "CdS QD",
    "effectCode": "SPELL_B17_CADMIUM_SULFIDE_QUANTUM_DOT_SENSOR_EQUIP_31",
    "effectText": "[Phép Trang Bị / Equip]: Trang bị cho 1 quái thú trên sân. Quái thú được trang bị nhận +500 ATK và +300 DEF, đồng thời được bảo vệ khỏi bị phá hủy bởi hiệu ứng bài phép một lần mỗi lượt.",
    "scientificLore": "Chất xúc tác bề mặt Hạt Xúc Tác Bán Dẫn Cadmi Sunfua (CdS QD) cung cấp tâm hoạt động hạ thấp hàng rào thế năng phản ứng hóa học theo chương trình Hóa học 10 GDPT 2018.",
    "relatedEquation": "Quantum Confinement Exciton Photocatalysis",
    "iupacName": "Cadmium Sulfide Quantum Dot Sensor Matrix",
    "archetype": "PRECIOUS_CATALYST",
    "structuredEffects": [
      {
        "effectId": "B17_EFF_31",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 500,
              "statTarget": "ATK",
              "targetScope": "TARGET"
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "DEF",
              "targetScope": "TARGET"
            }
          }
        ],
        "description": "Tăng 500 ATK và 300 DEF cho quái thú trang bị."
      }
    ]
  },
  {
    "id": "card_b17_032_equip_immobilized_biocatalytic_membrane_32",
    "name": "Màng Xúc Tác Enzymatic Cố Định (Modul 4)",
    "name_en": "Immobilized Biocatalytic Membrane (Module 4)",
    "cardType": "EQUIP_CATALYST",
    "spellTrapSubtype": "EQUIP_SPELL",
    "spellSpeed": 1,
    "rarity": "SUPER_RARE",
    "attribute": "AQUA",
    "manaCost": 4,
    "chemicalFormula": "Enzyme-Mat",
    "effectCode": "SPELL_B17_IMMOBILIZED_BIOCATALYTIC_MEMBRANE_EQUIP_32",
    "effectText": "[Phép Trang Bị / Equip]: Trang bị cho 1 quái thú trên sân. Quái thú được trang bị nhận +500 ATK và +300 DEF, đồng thời được bảo vệ khỏi bị phá hủy bởi hiệu ứng bài phép một lần mỗi lượt.",
    "scientificLore": "Chất xúc tác bề mặt Màng Xúc Tác Enzymatic Cố Định (Enzyme-Mat) cung cấp tâm hoạt động hạ thấp hàng rào thế năng phản ứng hóa học theo chương trình Hóa học 10 GDPT 2018.",
    "relatedEquation": "High-Turnover Enantioselective Synthesis",
    "iupacName": "Immobilized Biocatalytic Membrane Matrix",
    "archetype": "ORGANOMETALLIC_CATALYSIS",
    "structuredEffects": [
      {
        "effectId": "B17_EFF_32",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 500,
              "statTarget": "ATK",
              "targetScope": "TARGET"
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "DEF",
              "targetScope": "TARGET"
            }
          }
        ],
        "description": "Tăng 500 ATK và 300 DEF cho quái thú trang bị."
      }
    ]
  },
  {
    "id": "card_b17_033_equip_platinum_gauze_catalyst_grid_33",
    "name": "Lưới Bạch Kim Xúc Tác Ôtô (Modul 5)",
    "name_en": "Platinum Gauze Catalyst Grid (Module 5)",
    "cardType": "EQUIP_CATALYST",
    "spellTrapSubtype": "EQUIP_SPELL",
    "spellSpeed": 1,
    "rarity": "SUPER_RARE",
    "attribute": "NOBLE_VOID",
    "manaCost": 1,
    "chemicalFormula": "Pt/Rh Mesh",
    "effectCode": "SPELL_B17_PLATINUM_GAUZE_CATALYST_GRID_EQUIP_33",
    "effectText": "[Phép Trang Bị / Equip]: Trang bị cho 1 quái thú trên sân. Quái thú được trang bị nhận +500 ATK và +300 DEF, đồng thời được bảo vệ khỏi bị phá hủy bởi hiệu ứng bài phép một lần mỗi lượt.",
    "scientificLore": "Chất xúc tác bề mặt Lưới Bạch Kim Xúc Tác Ôtô (Pt/Rh Mesh) cung cấp tâm hoạt động hạ thấp hàng rào thế năng phản ứng hóa học theo chương trình Hóa học 10 GDPT 2018.",
    "relatedEquation": "2CO + O₂ --Pt--> 2CO₂",
    "iupacName": "Platinum Gauze Catalyst Grid Matrix",
    "archetype": "PRECIOUS_CATALYST",
    "structuredEffects": [
      {
        "effectId": "B17_EFF_33",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 500,
              "statTarget": "ATK",
              "targetScope": "TARGET"
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "DEF",
              "targetScope": "TARGET"
            }
          }
        ],
        "description": "Tăng 500 ATK và 300 DEF cho quái thú trang bị."
      }
    ]
  },
  {
    "id": "card_b17_034_equip_zeolite_zsm_5_molecular_sieve_34",
    "name": "Hạt Xúc Tác Zeolit Lồng Chọn Lọc (Modul 5)",
    "name_en": "Zeolite ZSM-5 Molecular Sieve (Module 5)",
    "cardType": "EQUIP_CATALYST",
    "spellTrapSubtype": "EQUIP_SPELL",
    "spellSpeed": 1,
    "rarity": "ULTRA_RARE",
    "attribute": "TERRA",
    "manaCost": 2,
    "chemicalFormula": "Zeolite",
    "effectCode": "SPELL_B17_ZEOLITE_ZSM_5_MOLECULAR_SIEVE_EQUIP_34",
    "effectText": "[Phép Trang Bị / Equip]: Trang bị cho 1 quái thú trên sân. Quái thú được trang bị nhận +500 ATK và +300 DEF, đồng thời được bảo vệ khỏi bị phá hủy bởi hiệu ứng bài phép một lần mỗi lượt.",
    "scientificLore": "Chất xúc tác bề mặt Hạt Xúc Tác Zeolit Lồng Chọn Lọc (Zeolite) cung cấp tâm hoạt động hạ thấp hàng rào thế năng phản ứng hóa học theo chương trình Hóa học 10 GDPT 2018.",
    "relatedEquation": "Shape-Selective Hydrocarbon Cracking Pores",
    "iupacName": "Zeolite ZSM-5 Molecular Sieve Matrix",
    "archetype": "ORGANOMETALLIC_CATALYSIS",
    "structuredEffects": [
      {
        "effectId": "B17_EFF_34",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 500,
              "statTarget": "ATK",
              "targetScope": "TARGET"
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "DEF",
              "targetScope": "TARGET"
            }
          }
        ],
        "description": "Tăng 500 ATK và 300 DEF cho quái thú trang bị."
      }
    ]
  },
  {
    "id": "card_b17_035_equip_raney_nickel_spongy_catalyst_35",
    "name": "Xúc Tác Niken Raney Xốp (Modul 5)",
    "name_en": "Raney Nickel Spongy Catalyst (Module 5)",
    "cardType": "EQUIP_CATALYST",
    "spellTrapSubtype": "EQUIP_SPELL",
    "spellSpeed": 1,
    "rarity": "SECRET_RARE",
    "attribute": "PYRO",
    "manaCost": 3,
    "chemicalFormula": "Ni-Al Porous",
    "effectCode": "SPELL_B17_RANEY_NICKEL_SPONGY_CATALYST_EQUIP_35",
    "effectText": "[Phép Trang Bị / Equip]: Trang bị cho 1 quái thú trên sân. Quái thú được trang bị nhận +500 ATK và +300 DEF, đồng thời được bảo vệ khỏi bị phá hủy bởi hiệu ứng bài phép một lần mỗi lượt.",
    "scientificLore": "Chất xúc tác bề mặt Xúc Tác Niken Raney Xốp (Ni-Al Porous) cung cấp tâm hoạt động hạ thấp hàng rào thế năng phản ứng hóa học theo chương trình Hóa học 10 GDPT 2018.",
    "relatedEquation": "R-CH=CH-R + H₂ --Ni--> R-CH₂-CH₂-R",
    "iupacName": "Raney Nickel Spongy Catalyst Matrix",
    "archetype": "PRECIOUS_CATALYST",
    "structuredEffects": [
      {
        "effectId": "B17_EFF_35",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 500,
              "statTarget": "ATK",
              "targetScope": "TARGET"
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "DEF",
              "targetScope": "TARGET"
            }
          }
        ],
        "description": "Tăng 500 ATK và 300 DEF cho quái thú trang bị."
      }
    ]
  },
  {
    "id": "card_b17_036_equip_edta_octahedral_chelate_shield_36",
    "name": "Chất Chelate Phối Trí EDTA (Modul 5)",
    "name_en": "EDTA Octahedral Chelate Shield (Module 5)",
    "cardType": "EQUIP_CATALYST",
    "spellTrapSubtype": "EQUIP_SPELL",
    "spellSpeed": 1,
    "rarity": "COMMON",
    "attribute": "AQUA",
    "manaCost": 4,
    "chemicalFormula": "Na2H2EDTA",
    "effectCode": "SPELL_B17_EDTA_OCTAHEDRAL_CHELATE_SHIELD_EQUIP_36",
    "effectText": "[Phép Trang Bị / Equip]: Trang bị cho 1 quái thú trên sân. Quái thú được trang bị nhận +500 ATK và +300 DEF, đồng thời được bảo vệ khỏi bị phá hủy bởi hiệu ứng bài phép một lần mỗi lượt.",
    "scientificLore": "Chất xúc tác bề mặt Chất Chelate Phối Trí EDTA (Na2H2EDTA) cung cấp tâm hoạt động hạ thấp hàng rào thế năng phản ứng hóa học theo chương trình Hóa học 10 GDPT 2018.",
    "relatedEquation": "Metal²⁺ + EDTA⁴⁻ → [Metal(EDTA)]²⁻ Complex",
    "iupacName": "EDTA Octahedral Chelate Shield Matrix",
    "archetype": "ORGANOMETALLIC_CATALYSIS",
    "structuredEffects": [
      {
        "effectId": "B17_EFF_36",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 500,
              "statTarget": "ATK",
              "targetScope": "TARGET"
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "DEF",
              "targetScope": "TARGET"
            }
          }
        ],
        "description": "Tăng 500 ATK và 300 DEF cho quái thú trang bị."
      }
    ]
  },
  {
    "id": "card_b17_037_equip_18_crown_6_ether_ring_37",
    "name": "Vòng Vương Miện Crown Ether (Modul 5)",
    "name_en": "18-Crown-6 Ether Ring (Module 5)",
    "cardType": "EQUIP_CATALYST",
    "spellTrapSubtype": "EQUIP_SPELL",
    "spellSpeed": 1,
    "rarity": "COMMON",
    "attribute": "ELECTRO",
    "manaCost": 1,
    "chemicalFormula": "C12H24O6",
    "effectCode": "SPELL_B17_18_CROWN_6_ETHER_RING_EQUIP_37",
    "effectText": "[Phép Trang Bị / Equip]: Trang bị cho 1 quái thú trên sân. Quái thú được trang bị nhận +500 ATK và +300 DEF, đồng thời được bảo vệ khỏi bị phá hủy bởi hiệu ứng bài phép một lần mỗi lượt.",
    "scientificLore": "Chất xúc tác bề mặt Vòng Vương Miện Crown Ether (C12H24O6) cung cấp tâm hoạt động hạ thấp hàng rào thế năng phản ứng hóa học theo chương trình Hóa học 10 GDPT 2018.",
    "relatedEquation": "K⁺ + 18-Crown-6 → [K(18-Crown-6)]⁺ Cavity Inclusion",
    "iupacName": "18-Crown-6 Ether Ring Matrix",
    "archetype": "PRECIOUS_CATALYST",
    "structuredEffects": [
      {
        "effectId": "B17_EFF_37",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 500,
              "statTarget": "ATK",
              "targetScope": "TARGET"
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "DEF",
              "targetScope": "TARGET"
            }
          }
        ],
        "description": "Tăng 500 ATK và 300 DEF cho quái thú trang bị."
      }
    ]
  },
  {
    "id": "card_b17_038_equip_gold_coated_carbon_nanotube_probe_38",
    "name": "Ống Cacbon Dẫn Electron Phủ Vàng (Modul 5)",
    "name_en": "Gold-Coated Carbon Nanotube Probe (Module 5)",
    "cardType": "EQUIP_CATALYST",
    "spellTrapSubtype": "EQUIP_SPELL",
    "spellSpeed": 1,
    "rarity": "COMMON",
    "attribute": "ELECTRO",
    "manaCost": 2,
    "chemicalFormula": "Au-CNT",
    "effectCode": "SPELL_B17_GOLD_COATED_CARBON_NANOTUBE_PROBE_EQUIP_38",
    "effectText": "[Phép Trang Bị / Equip]: Trang bị cho 1 quái thú trên sân. Quái thú được trang bị nhận +500 ATK và +300 DEF, đồng thời được bảo vệ khỏi bị phá hủy bởi hiệu ứng bài phép một lần mỗi lượt.",
    "scientificLore": "Chất xúc tác bề mặt Ống Cacbon Dẫn Electron Phủ Vàng (Au-CNT) cung cấp tâm hoạt động hạ thấp hàng rào thế năng phản ứng hóa học theo chương trình Hóa học 10 GDPT 2018.",
    "relatedEquation": "Ballistic Electron Transport Catalyst",
    "iupacName": "Gold-Coated Carbon Nanotube Probe Matrix",
    "archetype": "ORGANOMETALLIC_CATALYSIS",
    "structuredEffects": [
      {
        "effectId": "B17_EFF_38",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 500,
              "statTarget": "ATK",
              "targetScope": "TARGET"
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "DEF",
              "targetScope": "TARGET"
            }
          }
        ],
        "description": "Tăng 500 ATK và 300 DEF cho quái thú trang bị."
      }
    ]
  },
  {
    "id": "card_b17_039_equip_cadmium_sulfide_quantum_dot_sensor_39",
    "name": "Hạt Xúc Tác Bán Dẫn Cadmi Sunfua (Modul 5)",
    "name_en": "Cadmium Sulfide Quantum Dot Sensor (Module 5)",
    "cardType": "EQUIP_CATALYST",
    "spellTrapSubtype": "EQUIP_SPELL",
    "spellSpeed": 1,
    "rarity": "RARE",
    "attribute": "ELECTRO",
    "manaCost": 3,
    "chemicalFormula": "CdS QD",
    "effectCode": "SPELL_B17_CADMIUM_SULFIDE_QUANTUM_DOT_SENSOR_EQUIP_39",
    "effectText": "[Phép Trang Bị / Equip]: Trang bị cho 1 quái thú trên sân. Quái thú được trang bị nhận +500 ATK và +300 DEF, đồng thời được bảo vệ khỏi bị phá hủy bởi hiệu ứng bài phép một lần mỗi lượt.",
    "scientificLore": "Chất xúc tác bề mặt Hạt Xúc Tác Bán Dẫn Cadmi Sunfua (CdS QD) cung cấp tâm hoạt động hạ thấp hàng rào thế năng phản ứng hóa học theo chương trình Hóa học 10 GDPT 2018.",
    "relatedEquation": "Quantum Confinement Exciton Photocatalysis",
    "iupacName": "Cadmium Sulfide Quantum Dot Sensor Matrix",
    "archetype": "PRECIOUS_CATALYST",
    "structuredEffects": [
      {
        "effectId": "B17_EFF_39",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 500,
              "statTarget": "ATK",
              "targetScope": "TARGET"
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "DEF",
              "targetScope": "TARGET"
            }
          }
        ],
        "description": "Tăng 500 ATK và 300 DEF cho quái thú trang bị."
      }
    ]
  },
  {
    "id": "card_b17_040_equip_immobilized_biocatalytic_membrane_40",
    "name": "Màng Xúc Tác Enzymatic Cố Định (Modul 5)",
    "name_en": "Immobilized Biocatalytic Membrane (Module 5)",
    "cardType": "EQUIP_CATALYST",
    "spellTrapSubtype": "EQUIP_SPELL",
    "spellSpeed": 1,
    "rarity": "RARE",
    "attribute": "AQUA",
    "manaCost": 4,
    "chemicalFormula": "Enzyme-Mat",
    "effectCode": "SPELL_B17_IMMOBILIZED_BIOCATALYTIC_MEMBRANE_EQUIP_40",
    "effectText": "[Phép Trang Bị / Equip]: Trang bị cho 1 quái thú trên sân. Quái thú được trang bị nhận +500 ATK và +300 DEF, đồng thời được bảo vệ khỏi bị phá hủy bởi hiệu ứng bài phép một lần mỗi lượt.",
    "scientificLore": "Chất xúc tác bề mặt Màng Xúc Tác Enzymatic Cố Định (Enzyme-Mat) cung cấp tâm hoạt động hạ thấp hàng rào thế năng phản ứng hóa học theo chương trình Hóa học 10 GDPT 2018.",
    "relatedEquation": "High-Turnover Enantioselective Synthesis",
    "iupacName": "Immobilized Biocatalytic Membrane Matrix",
    "archetype": "ORGANOMETALLIC_CATALYSIS",
    "structuredEffects": [
      {
        "effectId": "B17_EFF_40",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 500,
              "statTarget": "ATK",
              "targetScope": "TARGET"
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "DEF",
              "targetScope": "TARGET"
            }
          }
        ],
        "description": "Tăng 500 ATK và 300 DEF cho quái thú trang bị."
      }
    ]
  },
  {
    "id": "card_b17_041_equip_platinum_gauze_catalyst_grid_41",
    "name": "Lưới Bạch Kim Xúc Tác Ôtô (Modul 6)",
    "name_en": "Platinum Gauze Catalyst Grid (Module 6)",
    "cardType": "EQUIP_CATALYST",
    "spellTrapSubtype": "EQUIP_SPELL",
    "spellSpeed": 1,
    "rarity": "SUPER_RARE",
    "attribute": "NOBLE_VOID",
    "manaCost": 1,
    "chemicalFormula": "Pt/Rh Mesh",
    "effectCode": "SPELL_B17_PLATINUM_GAUZE_CATALYST_GRID_EQUIP_41",
    "effectText": "[Phép Trang Bị / Equip]: Trang bị cho 1 quái thú trên sân. Quái thú được trang bị nhận +500 ATK và +300 DEF, đồng thời được bảo vệ khỏi bị phá hủy bởi hiệu ứng bài phép một lần mỗi lượt.",
    "scientificLore": "Chất xúc tác bề mặt Lưới Bạch Kim Xúc Tác Ôtô (Pt/Rh Mesh) cung cấp tâm hoạt động hạ thấp hàng rào thế năng phản ứng hóa học theo chương trình Hóa học 10 GDPT 2018.",
    "relatedEquation": "2CO + O₂ --Pt--> 2CO₂",
    "iupacName": "Platinum Gauze Catalyst Grid Matrix",
    "archetype": "PRECIOUS_CATALYST",
    "structuredEffects": [
      {
        "effectId": "B17_EFF_41",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 500,
              "statTarget": "ATK",
              "targetScope": "TARGET"
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "DEF",
              "targetScope": "TARGET"
            }
          }
        ],
        "description": "Tăng 500 ATK và 300 DEF cho quái thú trang bị."
      }
    ]
  },
  {
    "id": "card_b17_042_equip_zeolite_zsm_5_molecular_sieve_42",
    "name": "Hạt Xúc Tác Zeolit Lồng Chọn Lọc (Modul 6)",
    "name_en": "Zeolite ZSM-5 Molecular Sieve (Module 6)",
    "cardType": "EQUIP_CATALYST",
    "spellTrapSubtype": "EQUIP_SPELL",
    "spellSpeed": 1,
    "rarity": "SUPER_RARE",
    "attribute": "TERRA",
    "manaCost": 2,
    "chemicalFormula": "Zeolite",
    "effectCode": "SPELL_B17_ZEOLITE_ZSM_5_MOLECULAR_SIEVE_EQUIP_42",
    "effectText": "[Phép Trang Bị / Equip]: Trang bị cho 1 quái thú trên sân. Quái thú được trang bị nhận +500 ATK và +300 DEF, đồng thời được bảo vệ khỏi bị phá hủy bởi hiệu ứng bài phép một lần mỗi lượt.",
    "scientificLore": "Chất xúc tác bề mặt Hạt Xúc Tác Zeolit Lồng Chọn Lọc (Zeolite) cung cấp tâm hoạt động hạ thấp hàng rào thế năng phản ứng hóa học theo chương trình Hóa học 10 GDPT 2018.",
    "relatedEquation": "Shape-Selective Hydrocarbon Cracking Pores",
    "iupacName": "Zeolite ZSM-5 Molecular Sieve Matrix",
    "archetype": "ORGANOMETALLIC_CATALYSIS",
    "structuredEffects": [
      {
        "effectId": "B17_EFF_42",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 500,
              "statTarget": "ATK",
              "targetScope": "TARGET"
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "DEF",
              "targetScope": "TARGET"
            }
          }
        ],
        "description": "Tăng 500 ATK và 300 DEF cho quái thú trang bị."
      }
    ]
  },
  {
    "id": "card_b17_043_equip_raney_nickel_spongy_catalyst_43",
    "name": "Xúc Tác Niken Raney Xốp (Modul 6)",
    "name_en": "Raney Nickel Spongy Catalyst (Module 6)",
    "cardType": "EQUIP_CATALYST",
    "spellTrapSubtype": "EQUIP_SPELL",
    "spellSpeed": 1,
    "rarity": "ULTRA_RARE",
    "attribute": "PYRO",
    "manaCost": 3,
    "chemicalFormula": "Ni-Al Porous",
    "effectCode": "SPELL_B17_RANEY_NICKEL_SPONGY_CATALYST_EQUIP_43",
    "effectText": "[Phép Trang Bị / Equip]: Trang bị cho 1 quái thú trên sân. Quái thú được trang bị nhận +500 ATK và +300 DEF, đồng thời được bảo vệ khỏi bị phá hủy bởi hiệu ứng bài phép một lần mỗi lượt.",
    "scientificLore": "Chất xúc tác bề mặt Xúc Tác Niken Raney Xốp (Ni-Al Porous) cung cấp tâm hoạt động hạ thấp hàng rào thế năng phản ứng hóa học theo chương trình Hóa học 10 GDPT 2018.",
    "relatedEquation": "R-CH=CH-R + H₂ --Ni--> R-CH₂-CH₂-R",
    "iupacName": "Raney Nickel Spongy Catalyst Matrix",
    "archetype": "PRECIOUS_CATALYST",
    "structuredEffects": [
      {
        "effectId": "B17_EFF_43",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 500,
              "statTarget": "ATK",
              "targetScope": "TARGET"
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "DEF",
              "targetScope": "TARGET"
            }
          }
        ],
        "description": "Tăng 500 ATK và 300 DEF cho quái thú trang bị."
      }
    ]
  },
  {
    "id": "card_b17_044_equip_edta_octahedral_chelate_shield_44",
    "name": "Chất Chelate Phối Trí EDTA (Modul 6)",
    "name_en": "EDTA Octahedral Chelate Shield (Module 6)",
    "cardType": "EQUIP_CATALYST",
    "spellTrapSubtype": "EQUIP_SPELL",
    "spellSpeed": 1,
    "rarity": "SECRET_RARE",
    "attribute": "AQUA",
    "manaCost": 4,
    "chemicalFormula": "Na2H2EDTA",
    "effectCode": "SPELL_B17_EDTA_OCTAHEDRAL_CHELATE_SHIELD_EQUIP_44",
    "effectText": "[Phép Trang Bị / Equip]: Trang bị cho 1 quái thú trên sân. Quái thú được trang bị nhận +500 ATK và +300 DEF, đồng thời được bảo vệ khỏi bị phá hủy bởi hiệu ứng bài phép một lần mỗi lượt.",
    "scientificLore": "Chất xúc tác bề mặt Chất Chelate Phối Trí EDTA (Na2H2EDTA) cung cấp tâm hoạt động hạ thấp hàng rào thế năng phản ứng hóa học theo chương trình Hóa học 10 GDPT 2018.",
    "relatedEquation": "Metal²⁺ + EDTA⁴⁻ → [Metal(EDTA)]²⁻ Complex",
    "iupacName": "EDTA Octahedral Chelate Shield Matrix",
    "archetype": "ORGANOMETALLIC_CATALYSIS",
    "structuredEffects": [
      {
        "effectId": "B17_EFF_44",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 500,
              "statTarget": "ATK",
              "targetScope": "TARGET"
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "DEF",
              "targetScope": "TARGET"
            }
          }
        ],
        "description": "Tăng 500 ATK và 300 DEF cho quái thú trang bị."
      }
    ]
  },
  {
    "id": "card_b17_045_equip_18_crown_6_ether_ring_45",
    "name": "Vòng Vương Miện Crown Ether (Modul 6)",
    "name_en": "18-Crown-6 Ether Ring (Module 6)",
    "cardType": "EQUIP_CATALYST",
    "spellTrapSubtype": "EQUIP_SPELL",
    "spellSpeed": 1,
    "rarity": "COMMON",
    "attribute": "ELECTRO",
    "manaCost": 1,
    "chemicalFormula": "C12H24O6",
    "effectCode": "SPELL_B17_18_CROWN_6_ETHER_RING_EQUIP_45",
    "effectText": "[Phép Trang Bị / Equip]: Trang bị cho 1 quái thú trên sân. Quái thú được trang bị nhận +500 ATK và +300 DEF, đồng thời được bảo vệ khỏi bị phá hủy bởi hiệu ứng bài phép một lần mỗi lượt.",
    "scientificLore": "Chất xúc tác bề mặt Vòng Vương Miện Crown Ether (C12H24O6) cung cấp tâm hoạt động hạ thấp hàng rào thế năng phản ứng hóa học theo chương trình Hóa học 10 GDPT 2018.",
    "relatedEquation": "K⁺ + 18-Crown-6 → [K(18-Crown-6)]⁺ Cavity Inclusion",
    "iupacName": "18-Crown-6 Ether Ring Matrix",
    "archetype": "PRECIOUS_CATALYST",
    "structuredEffects": [
      {
        "effectId": "B17_EFF_45",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 500,
              "statTarget": "ATK",
              "targetScope": "TARGET"
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "DEF",
              "targetScope": "TARGET"
            }
          }
        ],
        "description": "Tăng 500 ATK và 300 DEF cho quái thú trang bị."
      }
    ]
  },
  {
    "id": "card_b17_046_equip_gold_coated_carbon_nanotube_probe_46",
    "name": "Ống Cacbon Dẫn Electron Phủ Vàng (Modul 6)",
    "name_en": "Gold-Coated Carbon Nanotube Probe (Module 6)",
    "cardType": "EQUIP_CATALYST",
    "spellTrapSubtype": "EQUIP_SPELL",
    "spellSpeed": 1,
    "rarity": "COMMON",
    "attribute": "ELECTRO",
    "manaCost": 2,
    "chemicalFormula": "Au-CNT",
    "effectCode": "SPELL_B17_GOLD_COATED_CARBON_NANOTUBE_PROBE_EQUIP_46",
    "effectText": "[Phép Trang Bị / Equip]: Trang bị cho 1 quái thú trên sân. Quái thú được trang bị nhận +500 ATK và +300 DEF, đồng thời được bảo vệ khỏi bị phá hủy bởi hiệu ứng bài phép một lần mỗi lượt.",
    "scientificLore": "Chất xúc tác bề mặt Ống Cacbon Dẫn Electron Phủ Vàng (Au-CNT) cung cấp tâm hoạt động hạ thấp hàng rào thế năng phản ứng hóa học theo chương trình Hóa học 10 GDPT 2018.",
    "relatedEquation": "Ballistic Electron Transport Catalyst",
    "iupacName": "Gold-Coated Carbon Nanotube Probe Matrix",
    "archetype": "ORGANOMETALLIC_CATALYSIS",
    "structuredEffects": [
      {
        "effectId": "B17_EFF_46",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 500,
              "statTarget": "ATK",
              "targetScope": "TARGET"
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "DEF",
              "targetScope": "TARGET"
            }
          }
        ],
        "description": "Tăng 500 ATK và 300 DEF cho quái thú trang bị."
      }
    ]
  },
  {
    "id": "card_b17_047_equip_cadmium_sulfide_quantum_dot_sensor_47",
    "name": "Hạt Xúc Tác Bán Dẫn Cadmi Sunfua (Modul 6)",
    "name_en": "Cadmium Sulfide Quantum Dot Sensor (Module 6)",
    "cardType": "EQUIP_CATALYST",
    "spellTrapSubtype": "EQUIP_SPELL",
    "spellSpeed": 1,
    "rarity": "COMMON",
    "attribute": "ELECTRO",
    "manaCost": 3,
    "chemicalFormula": "CdS QD",
    "effectCode": "SPELL_B17_CADMIUM_SULFIDE_QUANTUM_DOT_SENSOR_EQUIP_47",
    "effectText": "[Phép Trang Bị / Equip]: Trang bị cho 1 quái thú trên sân. Quái thú được trang bị nhận +500 ATK và +300 DEF, đồng thời được bảo vệ khỏi bị phá hủy bởi hiệu ứng bài phép một lần mỗi lượt.",
    "scientificLore": "Chất xúc tác bề mặt Hạt Xúc Tác Bán Dẫn Cadmi Sunfua (CdS QD) cung cấp tâm hoạt động hạ thấp hàng rào thế năng phản ứng hóa học theo chương trình Hóa học 10 GDPT 2018.",
    "relatedEquation": "Quantum Confinement Exciton Photocatalysis",
    "iupacName": "Cadmium Sulfide Quantum Dot Sensor Matrix",
    "archetype": "PRECIOUS_CATALYST",
    "structuredEffects": [
      {
        "effectId": "B17_EFF_47",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 500,
              "statTarget": "ATK",
              "targetScope": "TARGET"
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "DEF",
              "targetScope": "TARGET"
            }
          }
        ],
        "description": "Tăng 500 ATK và 300 DEF cho quái thú trang bị."
      }
    ]
  },
  {
    "id": "card_b17_048_equip_immobilized_biocatalytic_membrane_48",
    "name": "Màng Xúc Tác Enzymatic Cố Định (Modul 6)",
    "name_en": "Immobilized Biocatalytic Membrane (Module 6)",
    "cardType": "EQUIP_CATALYST",
    "spellTrapSubtype": "EQUIP_SPELL",
    "spellSpeed": 1,
    "rarity": "RARE",
    "attribute": "AQUA",
    "manaCost": 4,
    "chemicalFormula": "Enzyme-Mat",
    "effectCode": "SPELL_B17_IMMOBILIZED_BIOCATALYTIC_MEMBRANE_EQUIP_48",
    "effectText": "[Phép Trang Bị / Equip]: Trang bị cho 1 quái thú trên sân. Quái thú được trang bị nhận +500 ATK và +300 DEF, đồng thời được bảo vệ khỏi bị phá hủy bởi hiệu ứng bài phép một lần mỗi lượt.",
    "scientificLore": "Chất xúc tác bề mặt Màng Xúc Tác Enzymatic Cố Định (Enzyme-Mat) cung cấp tâm hoạt động hạ thấp hàng rào thế năng phản ứng hóa học theo chương trình Hóa học 10 GDPT 2018.",
    "relatedEquation": "High-Turnover Enantioselective Synthesis",
    "iupacName": "Immobilized Biocatalytic Membrane Matrix",
    "archetype": "ORGANOMETALLIC_CATALYSIS",
    "structuredEffects": [
      {
        "effectId": "B17_EFF_48",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 500,
              "statTarget": "ATK",
              "targetScope": "TARGET"
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "DEF",
              "targetScope": "TARGET"
            }
          }
        ],
        "description": "Tăng 500 ATK và 300 DEF cho quái thú trang bị."
      }
    ]
  },
  {
    "id": "card_b17_049_equip_platinum_gauze_catalyst_grid_49",
    "name": "Lưới Bạch Kim Xúc Tác Ôtô (Modul 7)",
    "name_en": "Platinum Gauze Catalyst Grid (Module 7)",
    "cardType": "EQUIP_CATALYST",
    "spellTrapSubtype": "EQUIP_SPELL",
    "spellSpeed": 1,
    "rarity": "RARE",
    "attribute": "NOBLE_VOID",
    "manaCost": 1,
    "chemicalFormula": "Pt/Rh Mesh",
    "effectCode": "SPELL_B17_PLATINUM_GAUZE_CATALYST_GRID_EQUIP_49",
    "effectText": "[Phép Trang Bị / Equip]: Trang bị cho 1 quái thú trên sân. Quái thú được trang bị nhận +500 ATK và +300 DEF, đồng thời được bảo vệ khỏi bị phá hủy bởi hiệu ứng bài phép một lần mỗi lượt.",
    "scientificLore": "Chất xúc tác bề mặt Lưới Bạch Kim Xúc Tác Ôtô (Pt/Rh Mesh) cung cấp tâm hoạt động hạ thấp hàng rào thế năng phản ứng hóa học theo chương trình Hóa học 10 GDPT 2018.",
    "relatedEquation": "2CO + O₂ --Pt--> 2CO₂",
    "iupacName": "Platinum Gauze Catalyst Grid Matrix",
    "archetype": "PRECIOUS_CATALYST",
    "structuredEffects": [
      {
        "effectId": "B17_EFF_49",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 500,
              "statTarget": "ATK",
              "targetScope": "TARGET"
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "DEF",
              "targetScope": "TARGET"
            }
          }
        ],
        "description": "Tăng 500 ATK và 300 DEF cho quái thú trang bị."
      }
    ]
  },
  {
    "id": "card_b17_050_equip_zeolite_zsm_5_molecular_sieve_50",
    "name": "Hạt Xúc Tác Zeolit Lồng Chọn Lọc (Modul 7)",
    "name_en": "Zeolite ZSM-5 Molecular Sieve (Module 7)",
    "cardType": "EQUIP_CATALYST",
    "spellTrapSubtype": "EQUIP_SPELL",
    "spellSpeed": 1,
    "rarity": "SUPER_RARE",
    "attribute": "TERRA",
    "manaCost": 2,
    "chemicalFormula": "Zeolite",
    "effectCode": "SPELL_B17_ZEOLITE_ZSM_5_MOLECULAR_SIEVE_EQUIP_50",
    "effectText": "[Phép Trang Bị / Equip]: Trang bị cho 1 quái thú trên sân. Quái thú được trang bị nhận +500 ATK và +300 DEF, đồng thời được bảo vệ khỏi bị phá hủy bởi hiệu ứng bài phép một lần mỗi lượt.",
    "scientificLore": "Chất xúc tác bề mặt Hạt Xúc Tác Zeolit Lồng Chọn Lọc (Zeolite) cung cấp tâm hoạt động hạ thấp hàng rào thế năng phản ứng hóa học theo chương trình Hóa học 10 GDPT 2018.",
    "relatedEquation": "Shape-Selective Hydrocarbon Cracking Pores",
    "iupacName": "Zeolite ZSM-5 Molecular Sieve Matrix",
    "archetype": "ORGANOMETALLIC_CATALYSIS",
    "structuredEffects": [
      {
        "effectId": "B17_EFF_50",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 500,
              "statTarget": "ATK",
              "targetScope": "TARGET"
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "DEF",
              "targetScope": "TARGET"
            }
          }
        ],
        "description": "Tăng 500 ATK và 300 DEF cho quái thú trang bị."
      }
    ]
  },
  {
    "id": "card_b17_051_equip_raney_nickel_spongy_catalyst_51",
    "name": "Xúc Tác Niken Raney Xốp (Modul 7)",
    "name_en": "Raney Nickel Spongy Catalyst (Module 7)",
    "cardType": "EQUIP_CATALYST",
    "spellTrapSubtype": "EQUIP_SPELL",
    "spellSpeed": 1,
    "rarity": "SUPER_RARE",
    "attribute": "PYRO",
    "manaCost": 3,
    "chemicalFormula": "Ni-Al Porous",
    "effectCode": "SPELL_B17_RANEY_NICKEL_SPONGY_CATALYST_EQUIP_51",
    "effectText": "[Phép Trang Bị / Equip]: Trang bị cho 1 quái thú trên sân. Quái thú được trang bị nhận +500 ATK và +300 DEF, đồng thời được bảo vệ khỏi bị phá hủy bởi hiệu ứng bài phép một lần mỗi lượt.",
    "scientificLore": "Chất xúc tác bề mặt Xúc Tác Niken Raney Xốp (Ni-Al Porous) cung cấp tâm hoạt động hạ thấp hàng rào thế năng phản ứng hóa học theo chương trình Hóa học 10 GDPT 2018.",
    "relatedEquation": "R-CH=CH-R + H₂ --Ni--> R-CH₂-CH₂-R",
    "iupacName": "Raney Nickel Spongy Catalyst Matrix",
    "archetype": "PRECIOUS_CATALYST",
    "structuredEffects": [
      {
        "effectId": "B17_EFF_51",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 500,
              "statTarget": "ATK",
              "targetScope": "TARGET"
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "DEF",
              "targetScope": "TARGET"
            }
          }
        ],
        "description": "Tăng 500 ATK và 300 DEF cho quái thú trang bị."
      }
    ]
  },
  {
    "id": "card_b17_052_equip_edta_octahedral_chelate_shield_52",
    "name": "Chất Chelate Phối Trí EDTA (Modul 7)",
    "name_en": "EDTA Octahedral Chelate Shield (Module 7)",
    "cardType": "EQUIP_CATALYST",
    "spellTrapSubtype": "EQUIP_SPELL",
    "spellSpeed": 1,
    "rarity": "ULTRA_RARE",
    "attribute": "AQUA",
    "manaCost": 4,
    "chemicalFormula": "Na2H2EDTA",
    "effectCode": "SPELL_B17_EDTA_OCTAHEDRAL_CHELATE_SHIELD_EQUIP_52",
    "effectText": "[Phép Trang Bị / Equip]: Trang bị cho 1 quái thú trên sân. Quái thú được trang bị nhận +500 ATK và +300 DEF, đồng thời được bảo vệ khỏi bị phá hủy bởi hiệu ứng bài phép một lần mỗi lượt.",
    "scientificLore": "Chất xúc tác bề mặt Chất Chelate Phối Trí EDTA (Na2H2EDTA) cung cấp tâm hoạt động hạ thấp hàng rào thế năng phản ứng hóa học theo chương trình Hóa học 10 GDPT 2018.",
    "relatedEquation": "Metal²⁺ + EDTA⁴⁻ → [Metal(EDTA)]²⁻ Complex",
    "iupacName": "EDTA Octahedral Chelate Shield Matrix",
    "archetype": "ORGANOMETALLIC_CATALYSIS",
    "structuredEffects": [
      {
        "effectId": "B17_EFF_52",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 500,
              "statTarget": "ATK",
              "targetScope": "TARGET"
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "DEF",
              "targetScope": "TARGET"
            }
          }
        ],
        "description": "Tăng 500 ATK và 300 DEF cho quái thú trang bị."
      }
    ]
  },
  {
    "id": "card_b17_053_equip_18_crown_6_ether_ring_53",
    "name": "Vòng Vương Miện Crown Ether (Modul 7)",
    "name_en": "18-Crown-6 Ether Ring (Module 7)",
    "cardType": "EQUIP_CATALYST",
    "spellTrapSubtype": "EQUIP_SPELL",
    "spellSpeed": 1,
    "rarity": "SECRET_RARE",
    "attribute": "ELECTRO",
    "manaCost": 1,
    "chemicalFormula": "C12H24O6",
    "effectCode": "SPELL_B17_18_CROWN_6_ETHER_RING_EQUIP_53",
    "effectText": "[Phép Trang Bị / Equip]: Trang bị cho 1 quái thú trên sân. Quái thú được trang bị nhận +500 ATK và +300 DEF, đồng thời được bảo vệ khỏi bị phá hủy bởi hiệu ứng bài phép một lần mỗi lượt.",
    "scientificLore": "Chất xúc tác bề mặt Vòng Vương Miện Crown Ether (C12H24O6) cung cấp tâm hoạt động hạ thấp hàng rào thế năng phản ứng hóa học theo chương trình Hóa học 10 GDPT 2018.",
    "relatedEquation": "K⁺ + 18-Crown-6 → [K(18-Crown-6)]⁺ Cavity Inclusion",
    "iupacName": "18-Crown-6 Ether Ring Matrix",
    "archetype": "PRECIOUS_CATALYST",
    "structuredEffects": [
      {
        "effectId": "B17_EFF_53",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 500,
              "statTarget": "ATK",
              "targetScope": "TARGET"
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "DEF",
              "targetScope": "TARGET"
            }
          }
        ],
        "description": "Tăng 500 ATK và 300 DEF cho quái thú trang bị."
      }
    ]
  },
  {
    "id": "card_b17_054_equip_gold_coated_carbon_nanotube_probe_54",
    "name": "Ống Cacbon Dẫn Electron Phủ Vàng (Modul 7)",
    "name_en": "Gold-Coated Carbon Nanotube Probe (Module 7)",
    "cardType": "EQUIP_CATALYST",
    "spellTrapSubtype": "EQUIP_SPELL",
    "spellSpeed": 1,
    "rarity": "COMMON",
    "attribute": "ELECTRO",
    "manaCost": 2,
    "chemicalFormula": "Au-CNT",
    "effectCode": "SPELL_B17_GOLD_COATED_CARBON_NANOTUBE_PROBE_EQUIP_54",
    "effectText": "[Phép Trang Bị / Equip]: Trang bị cho 1 quái thú trên sân. Quái thú được trang bị nhận +500 ATK và +300 DEF, đồng thời được bảo vệ khỏi bị phá hủy bởi hiệu ứng bài phép một lần mỗi lượt.",
    "scientificLore": "Chất xúc tác bề mặt Ống Cacbon Dẫn Electron Phủ Vàng (Au-CNT) cung cấp tâm hoạt động hạ thấp hàng rào thế năng phản ứng hóa học theo chương trình Hóa học 10 GDPT 2018.",
    "relatedEquation": "Ballistic Electron Transport Catalyst",
    "iupacName": "Gold-Coated Carbon Nanotube Probe Matrix",
    "archetype": "ORGANOMETALLIC_CATALYSIS",
    "structuredEffects": [
      {
        "effectId": "B17_EFF_54",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 500,
              "statTarget": "ATK",
              "targetScope": "TARGET"
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "DEF",
              "targetScope": "TARGET"
            }
          }
        ],
        "description": "Tăng 500 ATK và 300 DEF cho quái thú trang bị."
      }
    ]
  },
  {
    "id": "card_b17_055_equip_cadmium_sulfide_quantum_dot_sensor_55",
    "name": "Hạt Xúc Tác Bán Dẫn Cadmi Sunfua (Modul 7)",
    "name_en": "Cadmium Sulfide Quantum Dot Sensor (Module 7)",
    "cardType": "EQUIP_CATALYST",
    "spellTrapSubtype": "EQUIP_SPELL",
    "spellSpeed": 1,
    "rarity": "COMMON",
    "attribute": "ELECTRO",
    "manaCost": 3,
    "chemicalFormula": "CdS QD",
    "effectCode": "SPELL_B17_CADMIUM_SULFIDE_QUANTUM_DOT_SENSOR_EQUIP_55",
    "effectText": "[Phép Trang Bị / Equip]: Trang bị cho 1 quái thú trên sân. Quái thú được trang bị nhận +500 ATK và +300 DEF, đồng thời được bảo vệ khỏi bị phá hủy bởi hiệu ứng bài phép một lần mỗi lượt.",
    "scientificLore": "Chất xúc tác bề mặt Hạt Xúc Tác Bán Dẫn Cadmi Sunfua (CdS QD) cung cấp tâm hoạt động hạ thấp hàng rào thế năng phản ứng hóa học theo chương trình Hóa học 10 GDPT 2018.",
    "relatedEquation": "Quantum Confinement Exciton Photocatalysis",
    "iupacName": "Cadmium Sulfide Quantum Dot Sensor Matrix",
    "archetype": "PRECIOUS_CATALYST",
    "structuredEffects": [
      {
        "effectId": "B17_EFF_55",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 500,
              "statTarget": "ATK",
              "targetScope": "TARGET"
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "DEF",
              "targetScope": "TARGET"
            }
          }
        ],
        "description": "Tăng 500 ATK và 300 DEF cho quái thú trang bị."
      }
    ]
  },
  {
    "id": "card_b17_056_equip_immobilized_biocatalytic_membrane_56",
    "name": "Màng Xúc Tác Enzymatic Cố Định (Modul 7)",
    "name_en": "Immobilized Biocatalytic Membrane (Module 7)",
    "cardType": "EQUIP_CATALYST",
    "spellTrapSubtype": "EQUIP_SPELL",
    "spellSpeed": 1,
    "rarity": "COMMON",
    "attribute": "AQUA",
    "manaCost": 4,
    "chemicalFormula": "Enzyme-Mat",
    "effectCode": "SPELL_B17_IMMOBILIZED_BIOCATALYTIC_MEMBRANE_EQUIP_56",
    "effectText": "[Phép Trang Bị / Equip]: Trang bị cho 1 quái thú trên sân. Quái thú được trang bị nhận +500 ATK và +300 DEF, đồng thời được bảo vệ khỏi bị phá hủy bởi hiệu ứng bài phép một lần mỗi lượt.",
    "scientificLore": "Chất xúc tác bề mặt Màng Xúc Tác Enzymatic Cố Định (Enzyme-Mat) cung cấp tâm hoạt động hạ thấp hàng rào thế năng phản ứng hóa học theo chương trình Hóa học 10 GDPT 2018.",
    "relatedEquation": "High-Turnover Enantioselective Synthesis",
    "iupacName": "Immobilized Biocatalytic Membrane Matrix",
    "archetype": "ORGANOMETALLIC_CATALYSIS",
    "structuredEffects": [
      {
        "effectId": "B17_EFF_56",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 500,
              "statTarget": "ATK",
              "targetScope": "TARGET"
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "DEF",
              "targetScope": "TARGET"
            }
          }
        ],
        "description": "Tăng 500 ATK và 300 DEF cho quái thú trang bị."
      }
    ]
  },
  {
    "id": "card_b17_057_equip_platinum_gauze_catalyst_grid_57",
    "name": "Lưới Bạch Kim Xúc Tác Ôtô (Modul 8)",
    "name_en": "Platinum Gauze Catalyst Grid (Module 8)",
    "cardType": "EQUIP_CATALYST",
    "spellTrapSubtype": "EQUIP_SPELL",
    "spellSpeed": 1,
    "rarity": "RARE",
    "attribute": "NOBLE_VOID",
    "manaCost": 1,
    "chemicalFormula": "Pt/Rh Mesh",
    "effectCode": "SPELL_B17_PLATINUM_GAUZE_CATALYST_GRID_EQUIP_57",
    "effectText": "[Phép Trang Bị / Equip]: Trang bị cho 1 quái thú trên sân. Quái thú được trang bị nhận +500 ATK và +300 DEF, đồng thời được bảo vệ khỏi bị phá hủy bởi hiệu ứng bài phép một lần mỗi lượt.",
    "scientificLore": "Chất xúc tác bề mặt Lưới Bạch Kim Xúc Tác Ôtô (Pt/Rh Mesh) cung cấp tâm hoạt động hạ thấp hàng rào thế năng phản ứng hóa học theo chương trình Hóa học 10 GDPT 2018.",
    "relatedEquation": "2CO + O₂ --Pt--> 2CO₂",
    "iupacName": "Platinum Gauze Catalyst Grid Matrix",
    "archetype": "PRECIOUS_CATALYST",
    "structuredEffects": [
      {
        "effectId": "B17_EFF_57",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 500,
              "statTarget": "ATK",
              "targetScope": "TARGET"
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "DEF",
              "targetScope": "TARGET"
            }
          }
        ],
        "description": "Tăng 500 ATK và 300 DEF cho quái thú trang bị."
      }
    ]
  },
  {
    "id": "card_b17_058_equip_zeolite_zsm_5_molecular_sieve_58",
    "name": "Hạt Xúc Tác Zeolit Lồng Chọn Lọc (Modul 8)",
    "name_en": "Zeolite ZSM-5 Molecular Sieve (Module 8)",
    "cardType": "EQUIP_CATALYST",
    "spellTrapSubtype": "EQUIP_SPELL",
    "spellSpeed": 1,
    "rarity": "RARE",
    "attribute": "TERRA",
    "manaCost": 2,
    "chemicalFormula": "Zeolite",
    "effectCode": "SPELL_B17_ZEOLITE_ZSM_5_MOLECULAR_SIEVE_EQUIP_58",
    "effectText": "[Phép Trang Bị / Equip]: Trang bị cho 1 quái thú trên sân. Quái thú được trang bị nhận +500 ATK và +300 DEF, đồng thời được bảo vệ khỏi bị phá hủy bởi hiệu ứng bài phép một lần mỗi lượt.",
    "scientificLore": "Chất xúc tác bề mặt Hạt Xúc Tác Zeolit Lồng Chọn Lọc (Zeolite) cung cấp tâm hoạt động hạ thấp hàng rào thế năng phản ứng hóa học theo chương trình Hóa học 10 GDPT 2018.",
    "relatedEquation": "Shape-Selective Hydrocarbon Cracking Pores",
    "iupacName": "Zeolite ZSM-5 Molecular Sieve Matrix",
    "archetype": "ORGANOMETALLIC_CATALYSIS",
    "structuredEffects": [
      {
        "effectId": "B17_EFF_58",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 500,
              "statTarget": "ATK",
              "targetScope": "TARGET"
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "DEF",
              "targetScope": "TARGET"
            }
          }
        ],
        "description": "Tăng 500 ATK và 300 DEF cho quái thú trang bị."
      }
    ]
  },
  {
    "id": "card_b17_059_equip_raney_nickel_spongy_catalyst_59",
    "name": "Xúc Tác Niken Raney Xốp (Modul 8)",
    "name_en": "Raney Nickel Spongy Catalyst (Module 8)",
    "cardType": "EQUIP_CATALYST",
    "spellTrapSubtype": "EQUIP_SPELL",
    "spellSpeed": 1,
    "rarity": "SUPER_RARE",
    "attribute": "PYRO",
    "manaCost": 3,
    "chemicalFormula": "Ni-Al Porous",
    "effectCode": "SPELL_B17_RANEY_NICKEL_SPONGY_CATALYST_EQUIP_59",
    "effectText": "[Phép Trang Bị / Equip]: Trang bị cho 1 quái thú trên sân. Quái thú được trang bị nhận +500 ATK và +300 DEF, đồng thời được bảo vệ khỏi bị phá hủy bởi hiệu ứng bài phép một lần mỗi lượt.",
    "scientificLore": "Chất xúc tác bề mặt Xúc Tác Niken Raney Xốp (Ni-Al Porous) cung cấp tâm hoạt động hạ thấp hàng rào thế năng phản ứng hóa học theo chương trình Hóa học 10 GDPT 2018.",
    "relatedEquation": "R-CH=CH-R + H₂ --Ni--> R-CH₂-CH₂-R",
    "iupacName": "Raney Nickel Spongy Catalyst Matrix",
    "archetype": "PRECIOUS_CATALYST",
    "structuredEffects": [
      {
        "effectId": "B17_EFF_59",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 500,
              "statTarget": "ATK",
              "targetScope": "TARGET"
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "DEF",
              "targetScope": "TARGET"
            }
          }
        ],
        "description": "Tăng 500 ATK và 300 DEF cho quái thú trang bị."
      }
    ]
  },
  {
    "id": "card_b17_060_equip_edta_octahedral_chelate_shield_60",
    "name": "Chất Chelate Phối Trí EDTA (Modul 8)",
    "name_en": "EDTA Octahedral Chelate Shield (Module 8)",
    "cardType": "EQUIP_CATALYST",
    "spellTrapSubtype": "EQUIP_SPELL",
    "spellSpeed": 1,
    "rarity": "SUPER_RARE",
    "attribute": "AQUA",
    "manaCost": 4,
    "chemicalFormula": "Na2H2EDTA",
    "effectCode": "SPELL_B17_EDTA_OCTAHEDRAL_CHELATE_SHIELD_EQUIP_60",
    "effectText": "[Phép Trang Bị / Equip]: Trang bị cho 1 quái thú trên sân. Quái thú được trang bị nhận +500 ATK và +300 DEF, đồng thời được bảo vệ khỏi bị phá hủy bởi hiệu ứng bài phép một lần mỗi lượt.",
    "scientificLore": "Chất xúc tác bề mặt Chất Chelate Phối Trí EDTA (Na2H2EDTA) cung cấp tâm hoạt động hạ thấp hàng rào thế năng phản ứng hóa học theo chương trình Hóa học 10 GDPT 2018.",
    "relatedEquation": "Metal²⁺ + EDTA⁴⁻ → [Metal(EDTA)]²⁻ Complex",
    "iupacName": "EDTA Octahedral Chelate Shield Matrix",
    "archetype": "ORGANOMETALLIC_CATALYSIS",
    "structuredEffects": [
      {
        "effectId": "B17_EFF_60",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 500,
              "statTarget": "ATK",
              "targetScope": "TARGET"
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "DEF",
              "targetScope": "TARGET"
            }
          }
        ],
        "description": "Tăng 500 ATK và 300 DEF cho quái thú trang bị."
      }
    ]
  },
  {
    "id": "card_b17_061_equip_18_crown_6_ether_ring_61",
    "name": "Vòng Vương Miện Crown Ether (Modul 8)",
    "name_en": "18-Crown-6 Ether Ring (Module 8)",
    "cardType": "EQUIP_CATALYST",
    "spellTrapSubtype": "EQUIP_SPELL",
    "spellSpeed": 1,
    "rarity": "ULTRA_RARE",
    "attribute": "ELECTRO",
    "manaCost": 1,
    "chemicalFormula": "C12H24O6",
    "effectCode": "SPELL_B17_18_CROWN_6_ETHER_RING_EQUIP_61",
    "effectText": "[Phép Trang Bị / Equip]: Trang bị cho 1 quái thú trên sân. Quái thú được trang bị nhận +500 ATK và +300 DEF, đồng thời được bảo vệ khỏi bị phá hủy bởi hiệu ứng bài phép một lần mỗi lượt.",
    "scientificLore": "Chất xúc tác bề mặt Vòng Vương Miện Crown Ether (C12H24O6) cung cấp tâm hoạt động hạ thấp hàng rào thế năng phản ứng hóa học theo chương trình Hóa học 10 GDPT 2018.",
    "relatedEquation": "K⁺ + 18-Crown-6 → [K(18-Crown-6)]⁺ Cavity Inclusion",
    "iupacName": "18-Crown-6 Ether Ring Matrix",
    "archetype": "PRECIOUS_CATALYST",
    "structuredEffects": [
      {
        "effectId": "B17_EFF_61",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 500,
              "statTarget": "ATK",
              "targetScope": "TARGET"
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "DEF",
              "targetScope": "TARGET"
            }
          }
        ],
        "description": "Tăng 500 ATK và 300 DEF cho quái thú trang bị."
      }
    ]
  },
  {
    "id": "card_b17_062_equip_gold_coated_carbon_nanotube_probe_62",
    "name": "Ống Cacbon Dẫn Electron Phủ Vàng (Modul 8)",
    "name_en": "Gold-Coated Carbon Nanotube Probe (Module 8)",
    "cardType": "EQUIP_CATALYST",
    "spellTrapSubtype": "EQUIP_SPELL",
    "spellSpeed": 1,
    "rarity": "SECRET_RARE",
    "attribute": "ELECTRO",
    "manaCost": 2,
    "chemicalFormula": "Au-CNT",
    "effectCode": "SPELL_B17_GOLD_COATED_CARBON_NANOTUBE_PROBE_EQUIP_62",
    "effectText": "[Phép Trang Bị / Equip]: Trang bị cho 1 quái thú trên sân. Quái thú được trang bị nhận +500 ATK và +300 DEF, đồng thời được bảo vệ khỏi bị phá hủy bởi hiệu ứng bài phép một lần mỗi lượt.",
    "scientificLore": "Chất xúc tác bề mặt Ống Cacbon Dẫn Electron Phủ Vàng (Au-CNT) cung cấp tâm hoạt động hạ thấp hàng rào thế năng phản ứng hóa học theo chương trình Hóa học 10 GDPT 2018.",
    "relatedEquation": "Ballistic Electron Transport Catalyst",
    "iupacName": "Gold-Coated Carbon Nanotube Probe Matrix",
    "archetype": "ORGANOMETALLIC_CATALYSIS",
    "structuredEffects": [
      {
        "effectId": "B17_EFF_62",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 500,
              "statTarget": "ATK",
              "targetScope": "TARGET"
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "DEF",
              "targetScope": "TARGET"
            }
          }
        ],
        "description": "Tăng 500 ATK và 300 DEF cho quái thú trang bị."
      }
    ]
  },
  {
    "id": "card_b17_063_equip_cadmium_sulfide_quantum_dot_sensor_63",
    "name": "Hạt Xúc Tác Bán Dẫn Cadmi Sunfua (Modul 8)",
    "name_en": "Cadmium Sulfide Quantum Dot Sensor (Module 8)",
    "cardType": "EQUIP_CATALYST",
    "spellTrapSubtype": "EQUIP_SPELL",
    "spellSpeed": 1,
    "rarity": "COMMON",
    "attribute": "ELECTRO",
    "manaCost": 3,
    "chemicalFormula": "CdS QD",
    "effectCode": "SPELL_B17_CADMIUM_SULFIDE_QUANTUM_DOT_SENSOR_EQUIP_63",
    "effectText": "[Phép Trang Bị / Equip]: Trang bị cho 1 quái thú trên sân. Quái thú được trang bị nhận +500 ATK và +300 DEF, đồng thời được bảo vệ khỏi bị phá hủy bởi hiệu ứng bài phép một lần mỗi lượt.",
    "scientificLore": "Chất xúc tác bề mặt Hạt Xúc Tác Bán Dẫn Cadmi Sunfua (CdS QD) cung cấp tâm hoạt động hạ thấp hàng rào thế năng phản ứng hóa học theo chương trình Hóa học 10 GDPT 2018.",
    "relatedEquation": "Quantum Confinement Exciton Photocatalysis",
    "iupacName": "Cadmium Sulfide Quantum Dot Sensor Matrix",
    "archetype": "PRECIOUS_CATALYST",
    "structuredEffects": [
      {
        "effectId": "B17_EFF_63",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 500,
              "statTarget": "ATK",
              "targetScope": "TARGET"
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "DEF",
              "targetScope": "TARGET"
            }
          }
        ],
        "description": "Tăng 500 ATK và 300 DEF cho quái thú trang bị."
      }
    ]
  },
  {
    "id": "card_b17_064_equip_immobilized_biocatalytic_membrane_64",
    "name": "Màng Xúc Tác Enzymatic Cố Định (Modul 8)",
    "name_en": "Immobilized Biocatalytic Membrane (Module 8)",
    "cardType": "EQUIP_CATALYST",
    "spellTrapSubtype": "EQUIP_SPELL",
    "spellSpeed": 1,
    "rarity": "COMMON",
    "attribute": "AQUA",
    "manaCost": 4,
    "chemicalFormula": "Enzyme-Mat",
    "effectCode": "SPELL_B17_IMMOBILIZED_BIOCATALYTIC_MEMBRANE_EQUIP_64",
    "effectText": "[Phép Trang Bị / Equip]: Trang bị cho 1 quái thú trên sân. Quái thú được trang bị nhận +500 ATK và +300 DEF, đồng thời được bảo vệ khỏi bị phá hủy bởi hiệu ứng bài phép một lần mỗi lượt.",
    "scientificLore": "Chất xúc tác bề mặt Màng Xúc Tác Enzymatic Cố Định (Enzyme-Mat) cung cấp tâm hoạt động hạ thấp hàng rào thế năng phản ứng hóa học theo chương trình Hóa học 10 GDPT 2018.",
    "relatedEquation": "High-Turnover Enantioselective Synthesis",
    "iupacName": "Immobilized Biocatalytic Membrane Matrix",
    "archetype": "ORGANOMETALLIC_CATALYSIS",
    "structuredEffects": [
      {
        "effectId": "B17_EFF_64",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 500,
              "statTarget": "ATK",
              "targetScope": "TARGET"
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "DEF",
              "targetScope": "TARGET"
            }
          }
        ],
        "description": "Tăng 500 ATK và 300 DEF cho quái thú trang bị."
      }
    ]
  },
  {
    "id": "card_b17_065_equip_platinum_gauze_catalyst_grid_65",
    "name": "Lưới Bạch Kim Xúc Tác Ôtô (Modul 9)",
    "name_en": "Platinum Gauze Catalyst Grid (Module 9)",
    "cardType": "EQUIP_CATALYST",
    "spellTrapSubtype": "EQUIP_SPELL",
    "spellSpeed": 1,
    "rarity": "COMMON",
    "attribute": "NOBLE_VOID",
    "manaCost": 1,
    "chemicalFormula": "Pt/Rh Mesh",
    "effectCode": "SPELL_B17_PLATINUM_GAUZE_CATALYST_GRID_EQUIP_65",
    "effectText": "[Phép Trang Bị / Equip]: Trang bị cho 1 quái thú trên sân. Quái thú được trang bị nhận +500 ATK và +300 DEF, đồng thời được bảo vệ khỏi bị phá hủy bởi hiệu ứng bài phép một lần mỗi lượt.",
    "scientificLore": "Chất xúc tác bề mặt Lưới Bạch Kim Xúc Tác Ôtô (Pt/Rh Mesh) cung cấp tâm hoạt động hạ thấp hàng rào thế năng phản ứng hóa học theo chương trình Hóa học 10 GDPT 2018.",
    "relatedEquation": "2CO + O₂ --Pt--> 2CO₂",
    "iupacName": "Platinum Gauze Catalyst Grid Matrix",
    "archetype": "PRECIOUS_CATALYST",
    "structuredEffects": [
      {
        "effectId": "B17_EFF_65",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 500,
              "statTarget": "ATK",
              "targetScope": "TARGET"
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "DEF",
              "targetScope": "TARGET"
            }
          }
        ],
        "description": "Tăng 500 ATK và 300 DEF cho quái thú trang bị."
      }
    ]
  },
  {
    "id": "card_b17_066_equip_zeolite_zsm_5_molecular_sieve_66",
    "name": "Hạt Xúc Tác Zeolit Lồng Chọn Lọc (Modul 9)",
    "name_en": "Zeolite ZSM-5 Molecular Sieve (Module 9)",
    "cardType": "EQUIP_CATALYST",
    "spellTrapSubtype": "EQUIP_SPELL",
    "spellSpeed": 1,
    "rarity": "RARE",
    "attribute": "TERRA",
    "manaCost": 2,
    "chemicalFormula": "Zeolite",
    "effectCode": "SPELL_B17_ZEOLITE_ZSM_5_MOLECULAR_SIEVE_EQUIP_66",
    "effectText": "[Phép Trang Bị / Equip]: Trang bị cho 1 quái thú trên sân. Quái thú được trang bị nhận +500 ATK và +300 DEF, đồng thời được bảo vệ khỏi bị phá hủy bởi hiệu ứng bài phép một lần mỗi lượt.",
    "scientificLore": "Chất xúc tác bề mặt Hạt Xúc Tác Zeolit Lồng Chọn Lọc (Zeolite) cung cấp tâm hoạt động hạ thấp hàng rào thế năng phản ứng hóa học theo chương trình Hóa học 10 GDPT 2018.",
    "relatedEquation": "Shape-Selective Hydrocarbon Cracking Pores",
    "iupacName": "Zeolite ZSM-5 Molecular Sieve Matrix",
    "archetype": "ORGANOMETALLIC_CATALYSIS",
    "structuredEffects": [
      {
        "effectId": "B17_EFF_66",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 500,
              "statTarget": "ATK",
              "targetScope": "TARGET"
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "DEF",
              "targetScope": "TARGET"
            }
          }
        ],
        "description": "Tăng 500 ATK và 300 DEF cho quái thú trang bị."
      }
    ]
  },
  {
    "id": "card_b17_067_equip_raney_nickel_spongy_catalyst_67",
    "name": "Xúc Tác Niken Raney Xốp (Modul 9)",
    "name_en": "Raney Nickel Spongy Catalyst (Module 9)",
    "cardType": "EQUIP_CATALYST",
    "spellTrapSubtype": "EQUIP_SPELL",
    "spellSpeed": 1,
    "rarity": "RARE",
    "attribute": "PYRO",
    "manaCost": 3,
    "chemicalFormula": "Ni-Al Porous",
    "effectCode": "SPELL_B17_RANEY_NICKEL_SPONGY_CATALYST_EQUIP_67",
    "effectText": "[Phép Trang Bị / Equip]: Trang bị cho 1 quái thú trên sân. Quái thú được trang bị nhận +500 ATK và +300 DEF, đồng thời được bảo vệ khỏi bị phá hủy bởi hiệu ứng bài phép một lần mỗi lượt.",
    "scientificLore": "Chất xúc tác bề mặt Xúc Tác Niken Raney Xốp (Ni-Al Porous) cung cấp tâm hoạt động hạ thấp hàng rào thế năng phản ứng hóa học theo chương trình Hóa học 10 GDPT 2018.",
    "relatedEquation": "R-CH=CH-R + H₂ --Ni--> R-CH₂-CH₂-R",
    "iupacName": "Raney Nickel Spongy Catalyst Matrix",
    "archetype": "PRECIOUS_CATALYST",
    "structuredEffects": [
      {
        "effectId": "B17_EFF_67",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 500,
              "statTarget": "ATK",
              "targetScope": "TARGET"
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "DEF",
              "targetScope": "TARGET"
            }
          }
        ],
        "description": "Tăng 500 ATK và 300 DEF cho quái thú trang bị."
      }
    ]
  },
  {
    "id": "card_b17_068_equip_edta_octahedral_chelate_shield_68",
    "name": "Chất Chelate Phối Trí EDTA (Modul 9)",
    "name_en": "EDTA Octahedral Chelate Shield (Module 9)",
    "cardType": "EQUIP_CATALYST",
    "spellTrapSubtype": "EQUIP_SPELL",
    "spellSpeed": 1,
    "rarity": "SUPER_RARE",
    "attribute": "AQUA",
    "manaCost": 4,
    "chemicalFormula": "Na2H2EDTA",
    "effectCode": "SPELL_B17_EDTA_OCTAHEDRAL_CHELATE_SHIELD_EQUIP_68",
    "effectText": "[Phép Trang Bị / Equip]: Trang bị cho 1 quái thú trên sân. Quái thú được trang bị nhận +500 ATK và +300 DEF, đồng thời được bảo vệ khỏi bị phá hủy bởi hiệu ứng bài phép một lần mỗi lượt.",
    "scientificLore": "Chất xúc tác bề mặt Chất Chelate Phối Trí EDTA (Na2H2EDTA) cung cấp tâm hoạt động hạ thấp hàng rào thế năng phản ứng hóa học theo chương trình Hóa học 10 GDPT 2018.",
    "relatedEquation": "Metal²⁺ + EDTA⁴⁻ → [Metal(EDTA)]²⁻ Complex",
    "iupacName": "EDTA Octahedral Chelate Shield Matrix",
    "archetype": "ORGANOMETALLIC_CATALYSIS",
    "structuredEffects": [
      {
        "effectId": "B17_EFF_68",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 500,
              "statTarget": "ATK",
              "targetScope": "TARGET"
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "DEF",
              "targetScope": "TARGET"
            }
          }
        ],
        "description": "Tăng 500 ATK và 300 DEF cho quái thú trang bị."
      }
    ]
  },
  {
    "id": "card_b17_069_equip_18_crown_6_ether_ring_69",
    "name": "Vòng Vương Miện Crown Ether (Modul 9)",
    "name_en": "18-Crown-6 Ether Ring (Module 9)",
    "cardType": "EQUIP_CATALYST",
    "spellTrapSubtype": "EQUIP_SPELL",
    "spellSpeed": 1,
    "rarity": "SUPER_RARE",
    "attribute": "ELECTRO",
    "manaCost": 1,
    "chemicalFormula": "C12H24O6",
    "effectCode": "SPELL_B17_18_CROWN_6_ETHER_RING_EQUIP_69",
    "effectText": "[Phép Trang Bị / Equip]: Trang bị cho 1 quái thú trên sân. Quái thú được trang bị nhận +500 ATK và +300 DEF, đồng thời được bảo vệ khỏi bị phá hủy bởi hiệu ứng bài phép một lần mỗi lượt.",
    "scientificLore": "Chất xúc tác bề mặt Vòng Vương Miện Crown Ether (C12H24O6) cung cấp tâm hoạt động hạ thấp hàng rào thế năng phản ứng hóa học theo chương trình Hóa học 10 GDPT 2018.",
    "relatedEquation": "K⁺ + 18-Crown-6 → [K(18-Crown-6)]⁺ Cavity Inclusion",
    "iupacName": "18-Crown-6 Ether Ring Matrix",
    "archetype": "PRECIOUS_CATALYST",
    "structuredEffects": [
      {
        "effectId": "B17_EFF_69",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 500,
              "statTarget": "ATK",
              "targetScope": "TARGET"
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "DEF",
              "targetScope": "TARGET"
            }
          }
        ],
        "description": "Tăng 500 ATK và 300 DEF cho quái thú trang bị."
      }
    ]
  },
  {
    "id": "card_b17_070_equip_gold_coated_carbon_nanotube_probe_70",
    "name": "Ống Cacbon Dẫn Electron Phủ Vàng (Modul 9)",
    "name_en": "Gold-Coated Carbon Nanotube Probe (Module 9)",
    "cardType": "EQUIP_CATALYST",
    "spellTrapSubtype": "EQUIP_SPELL",
    "spellSpeed": 1,
    "rarity": "ULTRA_RARE",
    "attribute": "ELECTRO",
    "manaCost": 2,
    "chemicalFormula": "Au-CNT",
    "effectCode": "SPELL_B17_GOLD_COATED_CARBON_NANOTUBE_PROBE_EQUIP_70",
    "effectText": "[Phép Trang Bị / Equip]: Trang bị cho 1 quái thú trên sân. Quái thú được trang bị nhận +500 ATK và +300 DEF, đồng thời được bảo vệ khỏi bị phá hủy bởi hiệu ứng bài phép một lần mỗi lượt.",
    "scientificLore": "Chất xúc tác bề mặt Ống Cacbon Dẫn Electron Phủ Vàng (Au-CNT) cung cấp tâm hoạt động hạ thấp hàng rào thế năng phản ứng hóa học theo chương trình Hóa học 10 GDPT 2018.",
    "relatedEquation": "Ballistic Electron Transport Catalyst",
    "iupacName": "Gold-Coated Carbon Nanotube Probe Matrix",
    "archetype": "ORGANOMETALLIC_CATALYSIS",
    "structuredEffects": [
      {
        "effectId": "B17_EFF_70",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 500,
              "statTarget": "ATK",
              "targetScope": "TARGET"
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "DEF",
              "targetScope": "TARGET"
            }
          }
        ],
        "description": "Tăng 500 ATK và 300 DEF cho quái thú trang bị."
      }
    ]
  },
  {
    "id": "card_b17_071_equip_cadmium_sulfide_quantum_dot_sensor_71",
    "name": "Hạt Xúc Tác Bán Dẫn Cadmi Sunfua (Modul 9)",
    "name_en": "Cadmium Sulfide Quantum Dot Sensor (Module 9)",
    "cardType": "EQUIP_CATALYST",
    "spellTrapSubtype": "EQUIP_SPELL",
    "spellSpeed": 1,
    "rarity": "SECRET_RARE",
    "attribute": "ELECTRO",
    "manaCost": 3,
    "chemicalFormula": "CdS QD",
    "effectCode": "SPELL_B17_CADMIUM_SULFIDE_QUANTUM_DOT_SENSOR_EQUIP_71",
    "effectText": "[Phép Trang Bị / Equip]: Trang bị cho 1 quái thú trên sân. Quái thú được trang bị nhận +500 ATK và +300 DEF, đồng thời được bảo vệ khỏi bị phá hủy bởi hiệu ứng bài phép một lần mỗi lượt.",
    "scientificLore": "Chất xúc tác bề mặt Hạt Xúc Tác Bán Dẫn Cadmi Sunfua (CdS QD) cung cấp tâm hoạt động hạ thấp hàng rào thế năng phản ứng hóa học theo chương trình Hóa học 10 GDPT 2018.",
    "relatedEquation": "Quantum Confinement Exciton Photocatalysis",
    "iupacName": "Cadmium Sulfide Quantum Dot Sensor Matrix",
    "archetype": "PRECIOUS_CATALYST",
    "structuredEffects": [
      {
        "effectId": "B17_EFF_71",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 500,
              "statTarget": "ATK",
              "targetScope": "TARGET"
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "DEF",
              "targetScope": "TARGET"
            }
          }
        ],
        "description": "Tăng 500 ATK và 300 DEF cho quái thú trang bị."
      }
    ]
  },
  {
    "id": "card_b17_072_equip_immobilized_biocatalytic_membrane_72",
    "name": "Màng Xúc Tác Enzymatic Cố Định (Modul 9)",
    "name_en": "Immobilized Biocatalytic Membrane (Module 9)",
    "cardType": "EQUIP_CATALYST",
    "spellTrapSubtype": "EQUIP_SPELL",
    "spellSpeed": 1,
    "rarity": "COMMON",
    "attribute": "AQUA",
    "manaCost": 4,
    "chemicalFormula": "Enzyme-Mat",
    "effectCode": "SPELL_B17_IMMOBILIZED_BIOCATALYTIC_MEMBRANE_EQUIP_72",
    "effectText": "[Phép Trang Bị / Equip]: Trang bị cho 1 quái thú trên sân. Quái thú được trang bị nhận +500 ATK và +300 DEF, đồng thời được bảo vệ khỏi bị phá hủy bởi hiệu ứng bài phép một lần mỗi lượt.",
    "scientificLore": "Chất xúc tác bề mặt Màng Xúc Tác Enzymatic Cố Định (Enzyme-Mat) cung cấp tâm hoạt động hạ thấp hàng rào thế năng phản ứng hóa học theo chương trình Hóa học 10 GDPT 2018.",
    "relatedEquation": "High-Turnover Enantioselective Synthesis",
    "iupacName": "Immobilized Biocatalytic Membrane Matrix",
    "archetype": "ORGANOMETALLIC_CATALYSIS",
    "structuredEffects": [
      {
        "effectId": "B17_EFF_72",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 500,
              "statTarget": "ATK",
              "targetScope": "TARGET"
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "DEF",
              "targetScope": "TARGET"
            }
          }
        ],
        "description": "Tăng 500 ATK và 300 DEF cho quái thú trang bị."
      }
    ]
  },
  {
    "id": "card_b17_073_equip_platinum_gauze_catalyst_grid_73",
    "name": "Lưới Bạch Kim Xúc Tác Ôtô (Modul 10)",
    "name_en": "Platinum Gauze Catalyst Grid (Module 10)",
    "cardType": "EQUIP_CATALYST",
    "spellTrapSubtype": "EQUIP_SPELL",
    "spellSpeed": 1,
    "rarity": "COMMON",
    "attribute": "NOBLE_VOID",
    "manaCost": 1,
    "chemicalFormula": "Pt/Rh Mesh",
    "effectCode": "SPELL_B17_PLATINUM_GAUZE_CATALYST_GRID_EQUIP_73",
    "effectText": "[Phép Trang Bị / Equip]: Trang bị cho 1 quái thú trên sân. Quái thú được trang bị nhận +500 ATK và +300 DEF, đồng thời được bảo vệ khỏi bị phá hủy bởi hiệu ứng bài phép một lần mỗi lượt.",
    "scientificLore": "Chất xúc tác bề mặt Lưới Bạch Kim Xúc Tác Ôtô (Pt/Rh Mesh) cung cấp tâm hoạt động hạ thấp hàng rào thế năng phản ứng hóa học theo chương trình Hóa học 10 GDPT 2018.",
    "relatedEquation": "2CO + O₂ --Pt--> 2CO₂",
    "iupacName": "Platinum Gauze Catalyst Grid Matrix",
    "archetype": "PRECIOUS_CATALYST",
    "structuredEffects": [
      {
        "effectId": "B17_EFF_73",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 500,
              "statTarget": "ATK",
              "targetScope": "TARGET"
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "DEF",
              "targetScope": "TARGET"
            }
          }
        ],
        "description": "Tăng 500 ATK và 300 DEF cho quái thú trang bị."
      }
    ]
  },
  {
    "id": "card_b17_074_equip_zeolite_zsm_5_molecular_sieve_74",
    "name": "Hạt Xúc Tác Zeolit Lồng Chọn Lọc (Modul 10)",
    "name_en": "Zeolite ZSM-5 Molecular Sieve (Module 10)",
    "cardType": "EQUIP_CATALYST",
    "spellTrapSubtype": "EQUIP_SPELL",
    "spellSpeed": 1,
    "rarity": "COMMON",
    "attribute": "TERRA",
    "manaCost": 2,
    "chemicalFormula": "Zeolite",
    "effectCode": "SPELL_B17_ZEOLITE_ZSM_5_MOLECULAR_SIEVE_EQUIP_74",
    "effectText": "[Phép Trang Bị / Equip]: Trang bị cho 1 quái thú trên sân. Quái thú được trang bị nhận +500 ATK và +300 DEF, đồng thời được bảo vệ khỏi bị phá hủy bởi hiệu ứng bài phép một lần mỗi lượt.",
    "scientificLore": "Chất xúc tác bề mặt Hạt Xúc Tác Zeolit Lồng Chọn Lọc (Zeolite) cung cấp tâm hoạt động hạ thấp hàng rào thế năng phản ứng hóa học theo chương trình Hóa học 10 GDPT 2018.",
    "relatedEquation": "Shape-Selective Hydrocarbon Cracking Pores",
    "iupacName": "Zeolite ZSM-5 Molecular Sieve Matrix",
    "archetype": "ORGANOMETALLIC_CATALYSIS",
    "structuredEffects": [
      {
        "effectId": "B17_EFF_74",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 500,
              "statTarget": "ATK",
              "targetScope": "TARGET"
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "DEF",
              "targetScope": "TARGET"
            }
          }
        ],
        "description": "Tăng 500 ATK và 300 DEF cho quái thú trang bị."
      }
    ]
  },
  {
    "id": "card_b17_075_equip_raney_nickel_spongy_catalyst_75",
    "name": "Xúc Tác Niken Raney Xốp (Modul 10)",
    "name_en": "Raney Nickel Spongy Catalyst (Module 10)",
    "cardType": "EQUIP_CATALYST",
    "spellTrapSubtype": "EQUIP_SPELL",
    "spellSpeed": 1,
    "rarity": "RARE",
    "attribute": "PYRO",
    "manaCost": 3,
    "chemicalFormula": "Ni-Al Porous",
    "effectCode": "SPELL_B17_RANEY_NICKEL_SPONGY_CATALYST_EQUIP_75",
    "effectText": "[Phép Trang Bị / Equip]: Trang bị cho 1 quái thú trên sân. Quái thú được trang bị nhận +500 ATK và +300 DEF, đồng thời được bảo vệ khỏi bị phá hủy bởi hiệu ứng bài phép một lần mỗi lượt.",
    "scientificLore": "Chất xúc tác bề mặt Xúc Tác Niken Raney Xốp (Ni-Al Porous) cung cấp tâm hoạt động hạ thấp hàng rào thế năng phản ứng hóa học theo chương trình Hóa học 10 GDPT 2018.",
    "relatedEquation": "R-CH=CH-R + H₂ --Ni--> R-CH₂-CH₂-R",
    "iupacName": "Raney Nickel Spongy Catalyst Matrix",
    "archetype": "PRECIOUS_CATALYST",
    "structuredEffects": [
      {
        "effectId": "B17_EFF_75",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 500,
              "statTarget": "ATK",
              "targetScope": "TARGET"
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "DEF",
              "targetScope": "TARGET"
            }
          }
        ],
        "description": "Tăng 500 ATK và 300 DEF cho quái thú trang bị."
      }
    ]
  },
  {
    "id": "card_b17_076_equip_edta_octahedral_chelate_shield_76",
    "name": "Chất Chelate Phối Trí EDTA (Modul 10)",
    "name_en": "EDTA Octahedral Chelate Shield (Module 10)",
    "cardType": "EQUIP_CATALYST",
    "spellTrapSubtype": "EQUIP_SPELL",
    "spellSpeed": 1,
    "rarity": "RARE",
    "attribute": "AQUA",
    "manaCost": 4,
    "chemicalFormula": "Na2H2EDTA",
    "effectCode": "SPELL_B17_EDTA_OCTAHEDRAL_CHELATE_SHIELD_EQUIP_76",
    "effectText": "[Phép Trang Bị / Equip]: Trang bị cho 1 quái thú trên sân. Quái thú được trang bị nhận +500 ATK và +300 DEF, đồng thời được bảo vệ khỏi bị phá hủy bởi hiệu ứng bài phép một lần mỗi lượt.",
    "scientificLore": "Chất xúc tác bề mặt Chất Chelate Phối Trí EDTA (Na2H2EDTA) cung cấp tâm hoạt động hạ thấp hàng rào thế năng phản ứng hóa học theo chương trình Hóa học 10 GDPT 2018.",
    "relatedEquation": "Metal²⁺ + EDTA⁴⁻ → [Metal(EDTA)]²⁻ Complex",
    "iupacName": "EDTA Octahedral Chelate Shield Matrix",
    "archetype": "ORGANOMETALLIC_CATALYSIS",
    "structuredEffects": [
      {
        "effectId": "B17_EFF_76",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 500,
              "statTarget": "ATK",
              "targetScope": "TARGET"
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "DEF",
              "targetScope": "TARGET"
            }
          }
        ],
        "description": "Tăng 500 ATK và 300 DEF cho quái thú trang bị."
      }
    ]
  },
  {
    "id": "card_b17_077_equip_18_crown_6_ether_ring_77",
    "name": "Vòng Vương Miện Crown Ether (Modul 10)",
    "name_en": "18-Crown-6 Ether Ring (Module 10)",
    "cardType": "EQUIP_CATALYST",
    "spellTrapSubtype": "EQUIP_SPELL",
    "spellSpeed": 1,
    "rarity": "SUPER_RARE",
    "attribute": "ELECTRO",
    "manaCost": 1,
    "chemicalFormula": "C12H24O6",
    "effectCode": "SPELL_B17_18_CROWN_6_ETHER_RING_EQUIP_77",
    "effectText": "[Phép Trang Bị / Equip]: Trang bị cho 1 quái thú trên sân. Quái thú được trang bị nhận +500 ATK và +300 DEF, đồng thời được bảo vệ khỏi bị phá hủy bởi hiệu ứng bài phép một lần mỗi lượt.",
    "scientificLore": "Chất xúc tác bề mặt Vòng Vương Miện Crown Ether (C12H24O6) cung cấp tâm hoạt động hạ thấp hàng rào thế năng phản ứng hóa học theo chương trình Hóa học 10 GDPT 2018.",
    "relatedEquation": "K⁺ + 18-Crown-6 → [K(18-Crown-6)]⁺ Cavity Inclusion",
    "iupacName": "18-Crown-6 Ether Ring Matrix",
    "archetype": "PRECIOUS_CATALYST",
    "structuredEffects": [
      {
        "effectId": "B17_EFF_77",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 500,
              "statTarget": "ATK",
              "targetScope": "TARGET"
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "DEF",
              "targetScope": "TARGET"
            }
          }
        ],
        "description": "Tăng 500 ATK và 300 DEF cho quái thú trang bị."
      }
    ]
  },
  {
    "id": "card_b17_078_equip_gold_coated_carbon_nanotube_probe_78",
    "name": "Ống Cacbon Dẫn Electron Phủ Vàng (Modul 10)",
    "name_en": "Gold-Coated Carbon Nanotube Probe (Module 10)",
    "cardType": "EQUIP_CATALYST",
    "spellTrapSubtype": "EQUIP_SPELL",
    "spellSpeed": 1,
    "rarity": "SUPER_RARE",
    "attribute": "ELECTRO",
    "manaCost": 2,
    "chemicalFormula": "Au-CNT",
    "effectCode": "SPELL_B17_GOLD_COATED_CARBON_NANOTUBE_PROBE_EQUIP_78",
    "effectText": "[Phép Trang Bị / Equip]: Trang bị cho 1 quái thú trên sân. Quái thú được trang bị nhận +500 ATK và +300 DEF, đồng thời được bảo vệ khỏi bị phá hủy bởi hiệu ứng bài phép một lần mỗi lượt.",
    "scientificLore": "Chất xúc tác bề mặt Ống Cacbon Dẫn Electron Phủ Vàng (Au-CNT) cung cấp tâm hoạt động hạ thấp hàng rào thế năng phản ứng hóa học theo chương trình Hóa học 10 GDPT 2018.",
    "relatedEquation": "Ballistic Electron Transport Catalyst",
    "iupacName": "Gold-Coated Carbon Nanotube Probe Matrix",
    "archetype": "ORGANOMETALLIC_CATALYSIS",
    "structuredEffects": [
      {
        "effectId": "B17_EFF_78",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 500,
              "statTarget": "ATK",
              "targetScope": "TARGET"
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "DEF",
              "targetScope": "TARGET"
            }
          }
        ],
        "description": "Tăng 500 ATK và 300 DEF cho quái thú trang bị."
      }
    ]
  },
  {
    "id": "card_b17_079_equip_cadmium_sulfide_quantum_dot_sensor_79",
    "name": "Hạt Xúc Tác Bán Dẫn Cadmi Sunfua (Modul 10)",
    "name_en": "Cadmium Sulfide Quantum Dot Sensor (Module 10)",
    "cardType": "EQUIP_CATALYST",
    "spellTrapSubtype": "EQUIP_SPELL",
    "spellSpeed": 1,
    "rarity": "ULTRA_RARE",
    "attribute": "ELECTRO",
    "manaCost": 3,
    "chemicalFormula": "CdS QD",
    "effectCode": "SPELL_B17_CADMIUM_SULFIDE_QUANTUM_DOT_SENSOR_EQUIP_79",
    "effectText": "[Phép Trang Bị / Equip]: Trang bị cho 1 quái thú trên sân. Quái thú được trang bị nhận +500 ATK và +300 DEF, đồng thời được bảo vệ khỏi bị phá hủy bởi hiệu ứng bài phép một lần mỗi lượt.",
    "scientificLore": "Chất xúc tác bề mặt Hạt Xúc Tác Bán Dẫn Cadmi Sunfua (CdS QD) cung cấp tâm hoạt động hạ thấp hàng rào thế năng phản ứng hóa học theo chương trình Hóa học 10 GDPT 2018.",
    "relatedEquation": "Quantum Confinement Exciton Photocatalysis",
    "iupacName": "Cadmium Sulfide Quantum Dot Sensor Matrix",
    "archetype": "PRECIOUS_CATALYST",
    "structuredEffects": [
      {
        "effectId": "B17_EFF_79",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 500,
              "statTarget": "ATK",
              "targetScope": "TARGET"
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "DEF",
              "targetScope": "TARGET"
            }
          }
        ],
        "description": "Tăng 500 ATK và 300 DEF cho quái thú trang bị."
      }
    ]
  },
  {
    "id": "card_b17_080_equip_immobilized_biocatalytic_membrane_80",
    "name": "Màng Xúc Tác Enzymatic Cố Định (Modul 10)",
    "name_en": "Immobilized Biocatalytic Membrane (Module 10)",
    "cardType": "EQUIP_CATALYST",
    "spellTrapSubtype": "EQUIP_SPELL",
    "spellSpeed": 1,
    "rarity": "SECRET_RARE",
    "attribute": "AQUA",
    "manaCost": 4,
    "chemicalFormula": "Enzyme-Mat",
    "effectCode": "SPELL_B17_IMMOBILIZED_BIOCATALYTIC_MEMBRANE_EQUIP_80",
    "effectText": "[Phép Trang Bị / Equip]: Trang bị cho 1 quái thú trên sân. Quái thú được trang bị nhận +500 ATK và +300 DEF, đồng thời được bảo vệ khỏi bị phá hủy bởi hiệu ứng bài phép một lần mỗi lượt.",
    "scientificLore": "Chất xúc tác bề mặt Màng Xúc Tác Enzymatic Cố Định (Enzyme-Mat) cung cấp tâm hoạt động hạ thấp hàng rào thế năng phản ứng hóa học theo chương trình Hóa học 10 GDPT 2018.",
    "relatedEquation": "High-Turnover Enantioselective Synthesis",
    "iupacName": "Immobilized Biocatalytic Membrane Matrix",
    "archetype": "ORGANOMETALLIC_CATALYSIS",
    "structuredEffects": [
      {
        "effectId": "B17_EFF_80",
        "activationWindow": "IGNITION",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 500,
              "statTarget": "ATK",
              "targetScope": "TARGET"
            }
          },
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "DEF",
              "targetScope": "TARGET"
            }
          }
        ],
        "description": "Tăng 500 ATK và 300 DEF cho quái thú trang bị."
      }
    ]
  }
];
