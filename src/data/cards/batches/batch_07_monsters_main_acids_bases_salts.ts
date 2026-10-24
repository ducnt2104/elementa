// src/data/cards/batches/batch_07_monsters_main_acids_bases_salts.ts
// Batch 07: Acid, Base & Salt Monsters (100 cards)
// Automatically generated and validated for ELEMENTA Tactical TCG

import { PlayableCardDef } from '../../../domain/cardGameTypes';

export const BATCH_07_CARDS: PlayableCardDef[] = [
  {
    "id": "card_b07_001_hydrochloric_acid_1",
    "name": "Axit Clohidric — Bậc Thầy Ăn Mòn (HCl Nồng Độ 1)",
    "name_en": "Hydrochloric Acid — Bậc Thầy Ăn Mòn Molarity 1",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "ACID_DARK",
    "manaCost": 1,
    "level": 2,
    "atk": 1580,
    "def": 1060,
    "chemicalFormula": "HCl",
    "effectCode": "ELEM_B07_HYDROCHLORIC_ACID_CORR_1",
    "effectText": "Phân ly hoàn toàn proton H+: Gây sát thương xuyên giáp, nếu tấn công quái thú phòng thủ sẽ trừ thẳng chênh lệch vào LP đối phương.",
    "scientificLore": "Axit Clohidric (HCl) là hóa chất cơ bản tuân theo thuyết điện ly Arrhenius / Bronsted-Lowry trong SGK Hóa học 11 GDPT 2018.",
    "relatedEquation": "HCl → H⁺ + Cl⁻",
    "iupacName": "Hydrochloric Acid",
    "archetype": "STRONG_ACID_CORROSION",
    "structuredEffects": [
      {
        "effectId": "B07_EFF_1",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "SELF"
            }
          }
        ],
        "description": "Tăng 300 ATK ăn mòn axit mạnh."
      }
    ]
  },
  {
    "id": "card_b07_002_sulfuric_acid_2",
    "name": "Axit Sunfuric — Bậc Thầy Ăn Mòn (H2SO4 Nồng Độ 2)",
    "name_en": "Sulfuric Acid — Bậc Thầy Ăn Mòn Molarity 2",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "ACID_DARK",
    "manaCost": 2,
    "level": 3,
    "atk": 1820,
    "def": 1240,
    "chemicalFormula": "H2SO4",
    "effectCode": "ELEM_B07_SULFURIC_ACID_CORR_2",
    "effectText": "Phân ly hoàn toàn proton H+: Gây sát thương xuyên giáp, nếu tấn công quái thú phòng thủ sẽ trừ thẳng chênh lệch vào LP đối phương.",
    "scientificLore": "Axit Sunfuric (H2SO4) là hóa chất cơ bản tuân theo thuyết điện ly Arrhenius / Bronsted-Lowry trong SGK Hóa học 11 GDPT 2018.",
    "relatedEquation": "H₂SO₄ → H⁺ + HSO₄⁻",
    "iupacName": "Sulfuric Acid",
    "archetype": "STRONG_ACID_CORROSION",
    "structuredEffects": [
      {
        "effectId": "B07_EFF_2",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "SELF"
            }
          }
        ],
        "description": "Tăng 300 ATK ăn mòn axit mạnh."
      }
    ]
  },
  {
    "id": "card_b07_003_nitric_acid_3",
    "name": "Axit Nitric — Bậc Thầy Ăn Mòn (HNO3 Nồng Độ 3)",
    "name_en": "Nitric Acid — Bậc Thầy Ăn Mòn Molarity 3",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "ACID_DARK",
    "manaCost": 3,
    "level": 4,
    "atk": 2060,
    "def": 1420,
    "chemicalFormula": "HNO3",
    "effectCode": "ELEM_B07_NITRIC_ACID_CORR_3",
    "effectText": "Phân ly hoàn toàn proton H+: Gây sát thương xuyên giáp, nếu tấn công quái thú phòng thủ sẽ trừ thẳng chênh lệch vào LP đối phương.",
    "scientificLore": "Axit Nitric (HNO3) là hóa chất cơ bản tuân theo thuyết điện ly Arrhenius / Bronsted-Lowry trong SGK Hóa học 11 GDPT 2018.",
    "relatedEquation": "HNO₃ → H⁺ + NO₃⁻",
    "iupacName": "Nitric Acid",
    "archetype": "STRONG_ACID_CORROSION",
    "structuredEffects": [
      {
        "effectId": "B07_EFF_3",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "SELF"
            }
          }
        ],
        "description": "Tăng 300 ATK ăn mòn axit mạnh."
      }
    ]
  },
  {
    "id": "card_b07_004_phosphoric_acid_4",
    "name": "Axit Photphoric — Bậc Thầy Ăn Mòn (H3PO4 Nồng Độ 4)",
    "name_en": "Phosphoric Acid — Bậc Thầy Ăn Mòn Molarity 4",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "ULTRA_RARE",
    "attribute": "ACID_DARK",
    "manaCost": 4,
    "level": 5,
    "atk": 2300,
    "def": 1600,
    "chemicalFormula": "H3PO4",
    "effectCode": "ELEM_B07_PHOSPHORIC_ACID_CORR_4",
    "effectText": "Phân ly hoàn toàn proton H+: Gây sát thương xuyên giáp, nếu tấn công quái thú phòng thủ sẽ trừ thẳng chênh lệch vào LP đối phương.",
    "scientificLore": "Axit Photphoric (H3PO4) là hóa chất cơ bản tuân theo thuyết điện ly Arrhenius / Bronsted-Lowry trong SGK Hóa học 11 GDPT 2018.",
    "relatedEquation": "H₃PO₄ ⇌ H⁺ + H₂PO₄⁻",
    "iupacName": "Phosphoric Acid",
    "archetype": "STRONG_ACID_CORROSION",
    "structuredEffects": [
      {
        "effectId": "B07_EFF_4",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "SELF"
            }
          }
        ],
        "description": "Tăng 300 ATK ăn mòn axit mạnh."
      }
    ]
  },
  {
    "id": "card_b07_005_acetic_acid_5",
    "name": "Axit Axetic — Bậc Thầy Ăn Mòn (CH3COOH Nồng Độ 5)",
    "name_en": "Acetic Acid — Bậc Thầy Ăn Mòn Molarity 5",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SECRET_RARE",
    "attribute": "AQUA",
    "manaCost": 5,
    "level": 6,
    "atk": 2540,
    "def": 1780,
    "chemicalFormula": "CH3COOH",
    "effectCode": "ELEM_B07_ACETIC_ACID_CORR_5",
    "effectText": "Phân ly hoàn toàn proton H+: Gây sát thương xuyên giáp, nếu tấn công quái thú phòng thủ sẽ trừ thẳng chênh lệch vào LP đối phương.",
    "scientificLore": "Axit Axetic (CH3COOH) là hóa chất cơ bản tuân theo thuyết điện ly Arrhenius / Bronsted-Lowry trong SGK Hóa học 11 GDPT 2018.",
    "relatedEquation": "CH₃COOH ⇌ H⁺ + CH₃COO⁻",
    "iupacName": "Acetic Acid",
    "archetype": "STRONG_ACID_CORROSION",
    "structuredEffects": [
      {
        "effectId": "B07_EFF_5",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "SELF"
            }
          }
        ],
        "description": "Tăng 300 ATK ăn mòn axit mạnh."
      }
    ]
  },
  {
    "id": "card_b07_006_sodium_hydroxide_6",
    "name": "Natri Hydroxit — Bậc Thầy Ăn Mòn (NaOH Nồng Độ 6)",
    "name_en": "Sodium Hydroxide — Bậc Thầy Ăn Mòn Molarity 6",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "TERRA",
    "manaCost": 5,
    "level": 7,
    "atk": 2250,
    "def": 2850,
    "chemicalFormula": "NaOH",
    "effectCode": "ELEM_B07_SODIUM_HYDROXIDE_CORR_6",
    "effectText": "Dung dịch kiềm xà phòng hóa: Giảm 300 ATK của quái thú đối phương khi chúng tuyên bố tấn công.",
    "scientificLore": "Natri Hydroxit (NaOH) là hóa chất cơ bản tuân theo thuyết điện ly Arrhenius / Bronsted-Lowry trong SGK Hóa học 11 GDPT 2018.",
    "relatedEquation": "NaOH → Na⁺ + OH⁻",
    "iupacName": "Sodium Hydroxide",
    "archetype": "BASE_HYDROXIDE",
    "structuredEffects": [
      {
        "effectId": "B07_EFF_6",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Giảm 300 ATK quái thú địch bằng bazơ."
      }
    ]
  },
  {
    "id": "card_b07_007_potassium_hydroxide_7",
    "name": "Kali Hydroxit — Bậc Thầy Ăn Mòn (KOH Nồng Độ 7)",
    "name_en": "Potassium Hydroxide — Bậc Thầy Ăn Mòn Molarity 7",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "TERRA",
    "manaCost": 1,
    "level": 2,
    "atk": 1250,
    "def": 1600,
    "chemicalFormula": "KOH",
    "effectCode": "ELEM_B07_POTASSIUM_HYDROXIDE_CORR_7",
    "effectText": "Dung dịch kiềm xà phòng hóa: Giảm 300 ATK của quái thú đối phương khi chúng tuyên bố tấn công.",
    "scientificLore": "Kali Hydroxit (KOH) là hóa chất cơ bản tuân theo thuyết điện ly Arrhenius / Bronsted-Lowry trong SGK Hóa học 11 GDPT 2018.",
    "relatedEquation": "KOH → K⁺ + OH⁻",
    "iupacName": "Potassium Hydroxide",
    "archetype": "BASE_HYDROXIDE",
    "structuredEffects": [
      {
        "effectId": "B07_EFF_7",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Giảm 300 ATK quái thú địch bằng bazơ."
      }
    ]
  },
  {
    "id": "card_b07_008_calcium_hydroxide_8",
    "name": "Canxi Hydroxit — Bậc Thầy Ăn Mòn (Ca(OH)2 Nồng Độ 8)",
    "name_en": "Calcium Hydroxide — Bậc Thầy Ăn Mòn Molarity 8",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "TERRA",
    "manaCost": 2,
    "level": 3,
    "atk": 1450,
    "def": 1850,
    "chemicalFormula": "Ca(OH)2",
    "effectCode": "ELEM_B07_CALCIUM_HYDROXIDE_CORR_8",
    "effectText": "Dung dịch kiềm xà phòng hóa: Giảm 300 ATK của quái thú đối phương khi chúng tuyên bố tấn công.",
    "scientificLore": "Canxi Hydroxit (Ca(OH)2) là hóa chất cơ bản tuân theo thuyết điện ly Arrhenius / Bronsted-Lowry trong SGK Hóa học 11 GDPT 2018.",
    "relatedEquation": "Ca(OH)₂ ⇌ Ca²⁺ + 2OH⁻",
    "iupacName": "Calcium Hydroxide",
    "archetype": "BASE_HYDROXIDE",
    "structuredEffects": [
      {
        "effectId": "B07_EFF_8",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Giảm 300 ATK quái thú địch bằng bazơ."
      }
    ]
  },
  {
    "id": "card_b07_009_barium_hydroxide_9",
    "name": "Bari Hydroxit — Bậc Thầy Ăn Mòn (Ba(OH)2 Nồng Độ 9)",
    "name_en": "Barium Hydroxide — Bậc Thầy Ăn Mòn Molarity 9",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "TERRA",
    "manaCost": 3,
    "level": 4,
    "atk": 1650,
    "def": 2100,
    "chemicalFormula": "Ba(OH)2",
    "effectCode": "ELEM_B07_BARIUM_HYDROXIDE_CORR_9",
    "effectText": "Dung dịch kiềm xà phòng hóa: Giảm 300 ATK của quái thú đối phương khi chúng tuyên bố tấn công.",
    "scientificLore": "Bari Hydroxit (Ba(OH)2) là hóa chất cơ bản tuân theo thuyết điện ly Arrhenius / Bronsted-Lowry trong SGK Hóa học 11 GDPT 2018.",
    "relatedEquation": "Ba(OH)₂ → Ba²⁺ + 2OH⁻",
    "iupacName": "Barium Hydroxide",
    "archetype": "BASE_HYDROXIDE",
    "structuredEffects": [
      {
        "effectId": "B07_EFF_9",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Giảm 300 ATK quái thú địch bằng bazơ."
      }
    ]
  },
  {
    "id": "card_b07_010_copper_sulfate_10",
    "name": "Đồng(II) Sunfat — Bậc Thầy Ăn Mòn (CuSO4 Nồng Độ 10)",
    "name_en": "Copper Sulfate — Bậc Thầy Ăn Mòn Molarity 10",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "ELECTRO",
    "manaCost": 4,
    "level": 5,
    "atk": 1850,
    "def": 2350,
    "chemicalFormula": "CuSO4",
    "effectCode": "ELEM_B07_COPPER_SULFATE_CORR_10",
    "effectText": "Dung dịch kiềm xà phòng hóa: Giảm 300 ATK của quái thú đối phương khi chúng tuyên bố tấn công.",
    "scientificLore": "Đồng(II) Sunfat (CuSO4) là hóa chất cơ bản tuân theo thuyết điện ly Arrhenius / Bronsted-Lowry trong SGK Hóa học 11 GDPT 2018.",
    "relatedEquation": "CuSO₄ → Cu²⁺ + SO₄²⁻",
    "iupacName": "Copper Sulfate",
    "archetype": "BASE_HYDROXIDE",
    "structuredEffects": [
      {
        "effectId": "B07_EFF_10",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Giảm 300 ATK quái thú địch bằng bazơ."
      }
    ]
  },
  {
    "id": "card_b07_011_iron_iii__chloride_11",
    "name": "Sắt(III) Clorua — Bậc Thầy Ăn Mòn (FeCl3 Nồng Độ 11)",
    "name_en": "Iron(III) Chloride — Bậc Thầy Ăn Mòn Molarity 11",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "TERRA",
    "manaCost": 5,
    "level": 6,
    "atk": 2050,
    "def": 2600,
    "chemicalFormula": "FeCl3",
    "effectCode": "ELEM_B07_IRON_III__CHLORIDE_CORR_11",
    "effectText": "Dung dịch kiềm xà phòng hóa: Giảm 300 ATK của quái thú đối phương khi chúng tuyên bố tấn công.",
    "scientificLore": "Sắt(III) Clorua (FeCl3) là hóa chất cơ bản tuân theo thuyết điện ly Arrhenius / Bronsted-Lowry trong SGK Hóa học 11 GDPT 2018.",
    "relatedEquation": "FeCl₃ → Fe³⁺ + 3Cl⁻",
    "iupacName": "Iron(III) Chloride",
    "archetype": "BASE_HYDROXIDE",
    "structuredEffects": [
      {
        "effectId": "B07_EFF_11",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Giảm 300 ATK quái thú địch bằng bazơ."
      }
    ]
  },
  {
    "id": "card_b07_012_aluminum_sulfate_12",
    "name": "Nhôm Sunfat — Bậc Thầy Ăn Mòn (Al2(SO4)3 Nồng Độ 12)",
    "name_en": "Aluminum Sulfate — Bậc Thầy Ăn Mòn Molarity 12",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "TERRA",
    "manaCost": 5,
    "level": 7,
    "atk": 2250,
    "def": 2850,
    "chemicalFormula": "Al2(SO4)3",
    "effectCode": "ELEM_B07_ALUMINUM_SULFATE_CORR_12",
    "effectText": "Dung dịch kiềm xà phòng hóa: Giảm 300 ATK của quái thú đối phương khi chúng tuyên bố tấn công.",
    "scientificLore": "Nhôm Sunfat (Al2(SO4)3) là hóa chất cơ bản tuân theo thuyết điện ly Arrhenius / Bronsted-Lowry trong SGK Hóa học 11 GDPT 2018.",
    "relatedEquation": "Al₂(SO₄)₃ → 2Al³⁺ + 3SO₄²⁻",
    "iupacName": "Aluminum Sulfate",
    "archetype": "BASE_HYDROXIDE",
    "structuredEffects": [
      {
        "effectId": "B07_EFF_12",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Giảm 300 ATK quái thú địch bằng bazơ."
      }
    ]
  },
  {
    "id": "card_b07_013_hydrochloric_acid_13",
    "name": "Axit Clohidric — Chiến Binh Kiềm Hóa (HCl Nồng Độ 13)",
    "name_en": "Hydrochloric Acid — Chiến Binh Kiềm Hóa Molarity 13",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "ULTRA_RARE",
    "attribute": "ACID_DARK",
    "manaCost": 1,
    "level": 2,
    "atk": 1580,
    "def": 1060,
    "chemicalFormula": "HCl",
    "effectCode": "ELEM_B07_HYDROCHLORIC_ACID_CORR_13",
    "effectText": "Phân ly hoàn toàn proton H+: Gây sát thương xuyên giáp, nếu tấn công quái thú phòng thủ sẽ trừ thẳng chênh lệch vào LP đối phương.",
    "scientificLore": "Axit Clohidric (HCl) là hóa chất cơ bản tuân theo thuyết điện ly Arrhenius / Bronsted-Lowry trong SGK Hóa học 11 GDPT 2018.",
    "relatedEquation": "HCl → H⁺ + Cl⁻",
    "iupacName": "Hydrochloric Acid",
    "archetype": "STRONG_ACID_CORROSION",
    "structuredEffects": [
      {
        "effectId": "B07_EFF_13",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "SELF"
            }
          }
        ],
        "description": "Tăng 300 ATK ăn mòn axit mạnh."
      }
    ]
  },
  {
    "id": "card_b07_014_sulfuric_acid_14",
    "name": "Axit Sunfuric — Chiến Binh Kiềm Hóa (H2SO4 Nồng Độ 14)",
    "name_en": "Sulfuric Acid — Chiến Binh Kiềm Hóa Molarity 14",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SECRET_RARE",
    "attribute": "ACID_DARK",
    "manaCost": 2,
    "level": 3,
    "atk": 1820,
    "def": 1240,
    "chemicalFormula": "H2SO4",
    "effectCode": "ELEM_B07_SULFURIC_ACID_CORR_14",
    "effectText": "Phân ly hoàn toàn proton H+: Gây sát thương xuyên giáp, nếu tấn công quái thú phòng thủ sẽ trừ thẳng chênh lệch vào LP đối phương.",
    "scientificLore": "Axit Sunfuric (H2SO4) là hóa chất cơ bản tuân theo thuyết điện ly Arrhenius / Bronsted-Lowry trong SGK Hóa học 11 GDPT 2018.",
    "relatedEquation": "H₂SO₄ → H⁺ + HSO₄⁻",
    "iupacName": "Sulfuric Acid",
    "archetype": "STRONG_ACID_CORROSION",
    "structuredEffects": [
      {
        "effectId": "B07_EFF_14",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "SELF"
            }
          }
        ],
        "description": "Tăng 300 ATK ăn mòn axit mạnh."
      }
    ]
  },
  {
    "id": "card_b07_015_nitric_acid_15",
    "name": "Axit Nitric — Chiến Binh Kiềm Hóa (HNO3 Nồng Độ 15)",
    "name_en": "Nitric Acid — Chiến Binh Kiềm Hóa Molarity 15",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "ACID_DARK",
    "manaCost": 3,
    "level": 4,
    "atk": 2060,
    "def": 1420,
    "chemicalFormula": "HNO3",
    "effectCode": "ELEM_B07_NITRIC_ACID_CORR_15",
    "effectText": "Phân ly hoàn toàn proton H+: Gây sát thương xuyên giáp, nếu tấn công quái thú phòng thủ sẽ trừ thẳng chênh lệch vào LP đối phương.",
    "scientificLore": "Axit Nitric (HNO3) là hóa chất cơ bản tuân theo thuyết điện ly Arrhenius / Bronsted-Lowry trong SGK Hóa học 11 GDPT 2018.",
    "relatedEquation": "HNO₃ → H⁺ + NO₃⁻",
    "iupacName": "Nitric Acid",
    "archetype": "STRONG_ACID_CORROSION",
    "structuredEffects": [
      {
        "effectId": "B07_EFF_15",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "SELF"
            }
          }
        ],
        "description": "Tăng 300 ATK ăn mòn axit mạnh."
      }
    ]
  },
  {
    "id": "card_b07_016_phosphoric_acid_16",
    "name": "Axit Photphoric — Chiến Binh Kiềm Hóa (H3PO4 Nồng Độ 16)",
    "name_en": "Phosphoric Acid — Chiến Binh Kiềm Hóa Molarity 16",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "ACID_DARK",
    "manaCost": 4,
    "level": 5,
    "atk": 2300,
    "def": 1600,
    "chemicalFormula": "H3PO4",
    "effectCode": "ELEM_B07_PHOSPHORIC_ACID_CORR_16",
    "effectText": "Phân ly hoàn toàn proton H+: Gây sát thương xuyên giáp, nếu tấn công quái thú phòng thủ sẽ trừ thẳng chênh lệch vào LP đối phương.",
    "scientificLore": "Axit Photphoric (H3PO4) là hóa chất cơ bản tuân theo thuyết điện ly Arrhenius / Bronsted-Lowry trong SGK Hóa học 11 GDPT 2018.",
    "relatedEquation": "H₃PO₄ ⇌ H⁺ + H₂PO₄⁻",
    "iupacName": "Phosphoric Acid",
    "archetype": "STRONG_ACID_CORROSION",
    "structuredEffects": [
      {
        "effectId": "B07_EFF_16",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "SELF"
            }
          }
        ],
        "description": "Tăng 300 ATK ăn mòn axit mạnh."
      }
    ]
  },
  {
    "id": "card_b07_017_acetic_acid_17",
    "name": "Axit Axetic — Chiến Binh Kiềm Hóa (CH3COOH Nồng Độ 17)",
    "name_en": "Acetic Acid — Chiến Binh Kiềm Hóa Molarity 17",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "AQUA",
    "manaCost": 5,
    "level": 6,
    "atk": 2540,
    "def": 1780,
    "chemicalFormula": "CH3COOH",
    "effectCode": "ELEM_B07_ACETIC_ACID_CORR_17",
    "effectText": "Phân ly hoàn toàn proton H+: Gây sát thương xuyên giáp, nếu tấn công quái thú phòng thủ sẽ trừ thẳng chênh lệch vào LP đối phương.",
    "scientificLore": "Axit Axetic (CH3COOH) là hóa chất cơ bản tuân theo thuyết điện ly Arrhenius / Bronsted-Lowry trong SGK Hóa học 11 GDPT 2018.",
    "relatedEquation": "CH₃COOH ⇌ H⁺ + CH₃COO⁻",
    "iupacName": "Acetic Acid",
    "archetype": "STRONG_ACID_CORROSION",
    "structuredEffects": [
      {
        "effectId": "B07_EFF_17",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "SELF"
            }
          }
        ],
        "description": "Tăng 300 ATK ăn mòn axit mạnh."
      }
    ]
  },
  {
    "id": "card_b07_018_sodium_hydroxide_18",
    "name": "Natri Hydroxit — Chiến Binh Kiềm Hóa (NaOH Nồng Độ 18)",
    "name_en": "Sodium Hydroxide — Chiến Binh Kiềm Hóa Molarity 18",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "TERRA",
    "manaCost": 5,
    "level": 7,
    "atk": 2250,
    "def": 2850,
    "chemicalFormula": "NaOH",
    "effectCode": "ELEM_B07_SODIUM_HYDROXIDE_CORR_18",
    "effectText": "Dung dịch kiềm xà phòng hóa: Giảm 300 ATK của quái thú đối phương khi chúng tuyên bố tấn công.",
    "scientificLore": "Natri Hydroxit (NaOH) là hóa chất cơ bản tuân theo thuyết điện ly Arrhenius / Bronsted-Lowry trong SGK Hóa học 11 GDPT 2018.",
    "relatedEquation": "NaOH → Na⁺ + OH⁻",
    "iupacName": "Sodium Hydroxide",
    "archetype": "BASE_HYDROXIDE",
    "structuredEffects": [
      {
        "effectId": "B07_EFF_18",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Giảm 300 ATK quái thú địch bằng bazơ."
      }
    ]
  },
  {
    "id": "card_b07_019_potassium_hydroxide_19",
    "name": "Kali Hydroxit — Chiến Binh Kiềm Hóa (KOH Nồng Độ 19)",
    "name_en": "Potassium Hydroxide — Chiến Binh Kiềm Hóa Molarity 19",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "TERRA",
    "manaCost": 1,
    "level": 2,
    "atk": 1250,
    "def": 1600,
    "chemicalFormula": "KOH",
    "effectCode": "ELEM_B07_POTASSIUM_HYDROXIDE_CORR_19",
    "effectText": "Dung dịch kiềm xà phòng hóa: Giảm 300 ATK của quái thú đối phương khi chúng tuyên bố tấn công.",
    "scientificLore": "Kali Hydroxit (KOH) là hóa chất cơ bản tuân theo thuyết điện ly Arrhenius / Bronsted-Lowry trong SGK Hóa học 11 GDPT 2018.",
    "relatedEquation": "KOH → K⁺ + OH⁻",
    "iupacName": "Potassium Hydroxide",
    "archetype": "BASE_HYDROXIDE",
    "structuredEffects": [
      {
        "effectId": "B07_EFF_19",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Giảm 300 ATK quái thú địch bằng bazơ."
      }
    ]
  },
  {
    "id": "card_b07_020_calcium_hydroxide_20",
    "name": "Canxi Hydroxit — Chiến Binh Kiềm Hóa (Ca(OH)2 Nồng Độ 20)",
    "name_en": "Calcium Hydroxide — Chiến Binh Kiềm Hóa Molarity 20",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "TERRA",
    "manaCost": 2,
    "level": 3,
    "atk": 1450,
    "def": 1850,
    "chemicalFormula": "Ca(OH)2",
    "effectCode": "ELEM_B07_CALCIUM_HYDROXIDE_CORR_20",
    "effectText": "Dung dịch kiềm xà phòng hóa: Giảm 300 ATK của quái thú đối phương khi chúng tuyên bố tấn công.",
    "scientificLore": "Canxi Hydroxit (Ca(OH)2) là hóa chất cơ bản tuân theo thuyết điện ly Arrhenius / Bronsted-Lowry trong SGK Hóa học 11 GDPT 2018.",
    "relatedEquation": "Ca(OH)₂ ⇌ Ca²⁺ + 2OH⁻",
    "iupacName": "Calcium Hydroxide",
    "archetype": "BASE_HYDROXIDE",
    "structuredEffects": [
      {
        "effectId": "B07_EFF_20",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Giảm 300 ATK quái thú địch bằng bazơ."
      }
    ]
  },
  {
    "id": "card_b07_021_barium_hydroxide_21",
    "name": "Bari Hydroxit — Chiến Binh Kiềm Hóa (Ba(OH)2 Nồng Độ 21)",
    "name_en": "Barium Hydroxide — Chiến Binh Kiềm Hóa Molarity 21",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "TERRA",
    "manaCost": 3,
    "level": 4,
    "atk": 1650,
    "def": 2100,
    "chemicalFormula": "Ba(OH)2",
    "effectCode": "ELEM_B07_BARIUM_HYDROXIDE_CORR_21",
    "effectText": "Dung dịch kiềm xà phòng hóa: Giảm 300 ATK của quái thú đối phương khi chúng tuyên bố tấn công.",
    "scientificLore": "Bari Hydroxit (Ba(OH)2) là hóa chất cơ bản tuân theo thuyết điện ly Arrhenius / Bronsted-Lowry trong SGK Hóa học 11 GDPT 2018.",
    "relatedEquation": "Ba(OH)₂ → Ba²⁺ + 2OH⁻",
    "iupacName": "Barium Hydroxide",
    "archetype": "BASE_HYDROXIDE",
    "structuredEffects": [
      {
        "effectId": "B07_EFF_21",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Giảm 300 ATK quái thú địch bằng bazơ."
      }
    ]
  },
  {
    "id": "card_b07_022_copper_sulfate_22",
    "name": "Đồng(II) Sunfat — Chiến Binh Kiềm Hóa (CuSO4 Nồng Độ 22)",
    "name_en": "Copper Sulfate — Chiến Binh Kiềm Hóa Molarity 22",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "ULTRA_RARE",
    "attribute": "ELECTRO",
    "manaCost": 4,
    "level": 5,
    "atk": 1850,
    "def": 2350,
    "chemicalFormula": "CuSO4",
    "effectCode": "ELEM_B07_COPPER_SULFATE_CORR_22",
    "effectText": "Dung dịch kiềm xà phòng hóa: Giảm 300 ATK của quái thú đối phương khi chúng tuyên bố tấn công.",
    "scientificLore": "Đồng(II) Sunfat (CuSO4) là hóa chất cơ bản tuân theo thuyết điện ly Arrhenius / Bronsted-Lowry trong SGK Hóa học 11 GDPT 2018.",
    "relatedEquation": "CuSO₄ → Cu²⁺ + SO₄²⁻",
    "iupacName": "Copper Sulfate",
    "archetype": "BASE_HYDROXIDE",
    "structuredEffects": [
      {
        "effectId": "B07_EFF_22",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Giảm 300 ATK quái thú địch bằng bazơ."
      }
    ]
  },
  {
    "id": "card_b07_023_iron_iii__chloride_23",
    "name": "Sắt(III) Clorua — Chiến Binh Kiềm Hóa (FeCl3 Nồng Độ 23)",
    "name_en": "Iron(III) Chloride — Chiến Binh Kiềm Hóa Molarity 23",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SECRET_RARE",
    "attribute": "TERRA",
    "manaCost": 5,
    "level": 6,
    "atk": 2050,
    "def": 2600,
    "chemicalFormula": "FeCl3",
    "effectCode": "ELEM_B07_IRON_III__CHLORIDE_CORR_23",
    "effectText": "Dung dịch kiềm xà phòng hóa: Giảm 300 ATK của quái thú đối phương khi chúng tuyên bố tấn công.",
    "scientificLore": "Sắt(III) Clorua (FeCl3) là hóa chất cơ bản tuân theo thuyết điện ly Arrhenius / Bronsted-Lowry trong SGK Hóa học 11 GDPT 2018.",
    "relatedEquation": "FeCl₃ → Fe³⁺ + 3Cl⁻",
    "iupacName": "Iron(III) Chloride",
    "archetype": "BASE_HYDROXIDE",
    "structuredEffects": [
      {
        "effectId": "B07_EFF_23",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Giảm 300 ATK quái thú địch bằng bazơ."
      }
    ]
  },
  {
    "id": "card_b07_024_aluminum_sulfate_24",
    "name": "Nhôm Sunfat — Chiến Binh Kiềm Hóa (Al2(SO4)3 Nồng Độ 24)",
    "name_en": "Aluminum Sulfate — Chiến Binh Kiềm Hóa Molarity 24",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "TERRA",
    "manaCost": 5,
    "level": 7,
    "atk": 2250,
    "def": 2850,
    "chemicalFormula": "Al2(SO4)3",
    "effectCode": "ELEM_B07_ALUMINUM_SULFATE_CORR_24",
    "effectText": "Dung dịch kiềm xà phòng hóa: Giảm 300 ATK của quái thú đối phương khi chúng tuyên bố tấn công.",
    "scientificLore": "Nhôm Sunfat (Al2(SO4)3) là hóa chất cơ bản tuân theo thuyết điện ly Arrhenius / Bronsted-Lowry trong SGK Hóa học 11 GDPT 2018.",
    "relatedEquation": "Al₂(SO₄)₃ → 2Al³⁺ + 3SO₄²⁻",
    "iupacName": "Aluminum Sulfate",
    "archetype": "BASE_HYDROXIDE",
    "structuredEffects": [
      {
        "effectId": "B07_EFF_24",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Giảm 300 ATK quái thú địch bằng bazơ."
      }
    ]
  },
  {
    "id": "card_b07_025_hydrochloric_acid_25",
    "name": "Axit Clohidric — Pháo Đài Muối Ion (HCl Nồng Độ 25)",
    "name_en": "Hydrochloric Acid — Pháo Đài Muối Ion Molarity 25",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "ACID_DARK",
    "manaCost": 1,
    "level": 2,
    "atk": 1580,
    "def": 1060,
    "chemicalFormula": "HCl",
    "effectCode": "ELEM_B07_HYDROCHLORIC_ACID_CORR_25",
    "effectText": "Phân ly hoàn toàn proton H+: Gây sát thương xuyên giáp, nếu tấn công quái thú phòng thủ sẽ trừ thẳng chênh lệch vào LP đối phương.",
    "scientificLore": "Axit Clohidric (HCl) là hóa chất cơ bản tuân theo thuyết điện ly Arrhenius / Bronsted-Lowry trong SGK Hóa học 11 GDPT 2018.",
    "relatedEquation": "HCl → H⁺ + Cl⁻",
    "iupacName": "Hydrochloric Acid",
    "archetype": "STRONG_ACID_CORROSION",
    "structuredEffects": [
      {
        "effectId": "B07_EFF_25",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "SELF"
            }
          }
        ],
        "description": "Tăng 300 ATK ăn mòn axit mạnh."
      }
    ]
  },
  {
    "id": "card_b07_026_sulfuric_acid_26",
    "name": "Axit Sunfuric — Pháo Đài Muối Ion (H2SO4 Nồng Độ 26)",
    "name_en": "Sulfuric Acid — Pháo Đài Muối Ion Molarity 26",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "ACID_DARK",
    "manaCost": 2,
    "level": 3,
    "atk": 1820,
    "def": 1240,
    "chemicalFormula": "H2SO4",
    "effectCode": "ELEM_B07_SULFURIC_ACID_CORR_26",
    "effectText": "Phân ly hoàn toàn proton H+: Gây sát thương xuyên giáp, nếu tấn công quái thú phòng thủ sẽ trừ thẳng chênh lệch vào LP đối phương.",
    "scientificLore": "Axit Sunfuric (H2SO4) là hóa chất cơ bản tuân theo thuyết điện ly Arrhenius / Bronsted-Lowry trong SGK Hóa học 11 GDPT 2018.",
    "relatedEquation": "H₂SO₄ → H⁺ + HSO₄⁻",
    "iupacName": "Sulfuric Acid",
    "archetype": "STRONG_ACID_CORROSION",
    "structuredEffects": [
      {
        "effectId": "B07_EFF_26",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "SELF"
            }
          }
        ],
        "description": "Tăng 300 ATK ăn mòn axit mạnh."
      }
    ]
  },
  {
    "id": "card_b07_027_nitric_acid_27",
    "name": "Axit Nitric — Pháo Đài Muối Ion (HNO3 Nồng Độ 27)",
    "name_en": "Nitric Acid — Pháo Đài Muối Ion Molarity 27",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "ACID_DARK",
    "manaCost": 3,
    "level": 4,
    "atk": 2060,
    "def": 1420,
    "chemicalFormula": "HNO3",
    "effectCode": "ELEM_B07_NITRIC_ACID_CORR_27",
    "effectText": "Phân ly hoàn toàn proton H+: Gây sát thương xuyên giáp, nếu tấn công quái thú phòng thủ sẽ trừ thẳng chênh lệch vào LP đối phương.",
    "scientificLore": "Axit Nitric (HNO3) là hóa chất cơ bản tuân theo thuyết điện ly Arrhenius / Bronsted-Lowry trong SGK Hóa học 11 GDPT 2018.",
    "relatedEquation": "HNO₃ → H⁺ + NO₃⁻",
    "iupacName": "Nitric Acid",
    "archetype": "STRONG_ACID_CORROSION",
    "structuredEffects": [
      {
        "effectId": "B07_EFF_27",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "SELF"
            }
          }
        ],
        "description": "Tăng 300 ATK ăn mòn axit mạnh."
      }
    ]
  },
  {
    "id": "card_b07_028_phosphoric_acid_28",
    "name": "Axit Photphoric — Pháo Đài Muối Ion (H3PO4 Nồng Độ 28)",
    "name_en": "Phosphoric Acid — Pháo Đài Muối Ion Molarity 28",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "ACID_DARK",
    "manaCost": 4,
    "level": 5,
    "atk": 2300,
    "def": 1600,
    "chemicalFormula": "H3PO4",
    "effectCode": "ELEM_B07_PHOSPHORIC_ACID_CORR_28",
    "effectText": "Phân ly hoàn toàn proton H+: Gây sát thương xuyên giáp, nếu tấn công quái thú phòng thủ sẽ trừ thẳng chênh lệch vào LP đối phương.",
    "scientificLore": "Axit Photphoric (H3PO4) là hóa chất cơ bản tuân theo thuyết điện ly Arrhenius / Bronsted-Lowry trong SGK Hóa học 11 GDPT 2018.",
    "relatedEquation": "H₃PO₄ ⇌ H⁺ + H₂PO₄⁻",
    "iupacName": "Phosphoric Acid",
    "archetype": "STRONG_ACID_CORROSION",
    "structuredEffects": [
      {
        "effectId": "B07_EFF_28",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "SELF"
            }
          }
        ],
        "description": "Tăng 300 ATK ăn mòn axit mạnh."
      }
    ]
  },
  {
    "id": "card_b07_029_acetic_acid_29",
    "name": "Axit Axetic — Pháo Đài Muối Ion (CH3COOH Nồng Độ 29)",
    "name_en": "Acetic Acid — Pháo Đài Muối Ion Molarity 29",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "AQUA",
    "manaCost": 5,
    "level": 6,
    "atk": 2540,
    "def": 1780,
    "chemicalFormula": "CH3COOH",
    "effectCode": "ELEM_B07_ACETIC_ACID_CORR_29",
    "effectText": "Phân ly hoàn toàn proton H+: Gây sát thương xuyên giáp, nếu tấn công quái thú phòng thủ sẽ trừ thẳng chênh lệch vào LP đối phương.",
    "scientificLore": "Axit Axetic (CH3COOH) là hóa chất cơ bản tuân theo thuyết điện ly Arrhenius / Bronsted-Lowry trong SGK Hóa học 11 GDPT 2018.",
    "relatedEquation": "CH₃COOH ⇌ H⁺ + CH₃COO⁻",
    "iupacName": "Acetic Acid",
    "archetype": "STRONG_ACID_CORROSION",
    "structuredEffects": [
      {
        "effectId": "B07_EFF_29",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "SELF"
            }
          }
        ],
        "description": "Tăng 300 ATK ăn mòn axit mạnh."
      }
    ]
  },
  {
    "id": "card_b07_030_sodium_hydroxide_30",
    "name": "Natri Hydroxit — Pháo Đài Muối Ion (NaOH Nồng Độ 30)",
    "name_en": "Sodium Hydroxide — Pháo Đài Muối Ion Molarity 30",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "TERRA",
    "manaCost": 5,
    "level": 7,
    "atk": 2250,
    "def": 2850,
    "chemicalFormula": "NaOH",
    "effectCode": "ELEM_B07_SODIUM_HYDROXIDE_CORR_30",
    "effectText": "Dung dịch kiềm xà phòng hóa: Giảm 300 ATK của quái thú đối phương khi chúng tuyên bố tấn công.",
    "scientificLore": "Natri Hydroxit (NaOH) là hóa chất cơ bản tuân theo thuyết điện ly Arrhenius / Bronsted-Lowry trong SGK Hóa học 11 GDPT 2018.",
    "relatedEquation": "NaOH → Na⁺ + OH⁻",
    "iupacName": "Sodium Hydroxide",
    "archetype": "BASE_HYDROXIDE",
    "structuredEffects": [
      {
        "effectId": "B07_EFF_30",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Giảm 300 ATK quái thú địch bằng bazơ."
      }
    ]
  },
  {
    "id": "card_b07_031_potassium_hydroxide_31",
    "name": "Kali Hydroxit — Pháo Đài Muối Ion (KOH Nồng Độ 31)",
    "name_en": "Potassium Hydroxide — Pháo Đài Muối Ion Molarity 31",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "ULTRA_RARE",
    "attribute": "TERRA",
    "manaCost": 1,
    "level": 2,
    "atk": 1250,
    "def": 1600,
    "chemicalFormula": "KOH",
    "effectCode": "ELEM_B07_POTASSIUM_HYDROXIDE_CORR_31",
    "effectText": "Dung dịch kiềm xà phòng hóa: Giảm 300 ATK của quái thú đối phương khi chúng tuyên bố tấn công.",
    "scientificLore": "Kali Hydroxit (KOH) là hóa chất cơ bản tuân theo thuyết điện ly Arrhenius / Bronsted-Lowry trong SGK Hóa học 11 GDPT 2018.",
    "relatedEquation": "KOH → K⁺ + OH⁻",
    "iupacName": "Potassium Hydroxide",
    "archetype": "BASE_HYDROXIDE",
    "structuredEffects": [
      {
        "effectId": "B07_EFF_31",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Giảm 300 ATK quái thú địch bằng bazơ."
      }
    ]
  },
  {
    "id": "card_b07_032_calcium_hydroxide_32",
    "name": "Canxi Hydroxit — Pháo Đài Muối Ion (Ca(OH)2 Nồng Độ 32)",
    "name_en": "Calcium Hydroxide — Pháo Đài Muối Ion Molarity 32",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SECRET_RARE",
    "attribute": "TERRA",
    "manaCost": 2,
    "level": 3,
    "atk": 1450,
    "def": 1850,
    "chemicalFormula": "Ca(OH)2",
    "effectCode": "ELEM_B07_CALCIUM_HYDROXIDE_CORR_32",
    "effectText": "Dung dịch kiềm xà phòng hóa: Giảm 300 ATK của quái thú đối phương khi chúng tuyên bố tấn công.",
    "scientificLore": "Canxi Hydroxit (Ca(OH)2) là hóa chất cơ bản tuân theo thuyết điện ly Arrhenius / Bronsted-Lowry trong SGK Hóa học 11 GDPT 2018.",
    "relatedEquation": "Ca(OH)₂ ⇌ Ca²⁺ + 2OH⁻",
    "iupacName": "Calcium Hydroxide",
    "archetype": "BASE_HYDROXIDE",
    "structuredEffects": [
      {
        "effectId": "B07_EFF_32",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Giảm 300 ATK quái thú địch bằng bazơ."
      }
    ]
  },
  {
    "id": "card_b07_033_barium_hydroxide_33",
    "name": "Bari Hydroxit — Pháo Đài Muối Ion (Ba(OH)2 Nồng Độ 33)",
    "name_en": "Barium Hydroxide — Pháo Đài Muối Ion Molarity 33",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "TERRA",
    "manaCost": 3,
    "level": 4,
    "atk": 1650,
    "def": 2100,
    "chemicalFormula": "Ba(OH)2",
    "effectCode": "ELEM_B07_BARIUM_HYDROXIDE_CORR_33",
    "effectText": "Dung dịch kiềm xà phòng hóa: Giảm 300 ATK của quái thú đối phương khi chúng tuyên bố tấn công.",
    "scientificLore": "Bari Hydroxit (Ba(OH)2) là hóa chất cơ bản tuân theo thuyết điện ly Arrhenius / Bronsted-Lowry trong SGK Hóa học 11 GDPT 2018.",
    "relatedEquation": "Ba(OH)₂ → Ba²⁺ + 2OH⁻",
    "iupacName": "Barium Hydroxide",
    "archetype": "BASE_HYDROXIDE",
    "structuredEffects": [
      {
        "effectId": "B07_EFF_33",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Giảm 300 ATK quái thú địch bằng bazơ."
      }
    ]
  },
  {
    "id": "card_b07_034_copper_sulfate_34",
    "name": "Đồng(II) Sunfat — Pháo Đài Muối Ion (CuSO4 Nồng Độ 34)",
    "name_en": "Copper Sulfate — Pháo Đài Muối Ion Molarity 34",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "ELECTRO",
    "manaCost": 4,
    "level": 5,
    "atk": 1850,
    "def": 2350,
    "chemicalFormula": "CuSO4",
    "effectCode": "ELEM_B07_COPPER_SULFATE_CORR_34",
    "effectText": "Dung dịch kiềm xà phòng hóa: Giảm 300 ATK của quái thú đối phương khi chúng tuyên bố tấn công.",
    "scientificLore": "Đồng(II) Sunfat (CuSO4) là hóa chất cơ bản tuân theo thuyết điện ly Arrhenius / Bronsted-Lowry trong SGK Hóa học 11 GDPT 2018.",
    "relatedEquation": "CuSO₄ → Cu²⁺ + SO₄²⁻",
    "iupacName": "Copper Sulfate",
    "archetype": "BASE_HYDROXIDE",
    "structuredEffects": [
      {
        "effectId": "B07_EFF_34",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Giảm 300 ATK quái thú địch bằng bazơ."
      }
    ]
  },
  {
    "id": "card_b07_035_iron_iii__chloride_35",
    "name": "Sắt(III) Clorua — Pháo Đài Muối Ion (FeCl3 Nồng Độ 35)",
    "name_en": "Iron(III) Chloride — Pháo Đài Muối Ion Molarity 35",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "TERRA",
    "manaCost": 5,
    "level": 6,
    "atk": 2050,
    "def": 2600,
    "chemicalFormula": "FeCl3",
    "effectCode": "ELEM_B07_IRON_III__CHLORIDE_CORR_35",
    "effectText": "Dung dịch kiềm xà phòng hóa: Giảm 300 ATK của quái thú đối phương khi chúng tuyên bố tấn công.",
    "scientificLore": "Sắt(III) Clorua (FeCl3) là hóa chất cơ bản tuân theo thuyết điện ly Arrhenius / Bronsted-Lowry trong SGK Hóa học 11 GDPT 2018.",
    "relatedEquation": "FeCl₃ → Fe³⁺ + 3Cl⁻",
    "iupacName": "Iron(III) Chloride",
    "archetype": "BASE_HYDROXIDE",
    "structuredEffects": [
      {
        "effectId": "B07_EFF_35",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Giảm 300 ATK quái thú địch bằng bazơ."
      }
    ]
  },
  {
    "id": "card_b07_036_aluminum_sulfate_36",
    "name": "Nhôm Sunfat — Pháo Đài Muối Ion (Al2(SO4)3 Nồng Độ 36)",
    "name_en": "Aluminum Sulfate — Pháo Đài Muối Ion Molarity 36",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "TERRA",
    "manaCost": 5,
    "level": 7,
    "atk": 2250,
    "def": 2850,
    "chemicalFormula": "Al2(SO4)3",
    "effectCode": "ELEM_B07_ALUMINUM_SULFATE_CORR_36",
    "effectText": "Dung dịch kiềm xà phòng hóa: Giảm 300 ATK của quái thú đối phương khi chúng tuyên bố tấn công.",
    "scientificLore": "Nhôm Sunfat (Al2(SO4)3) là hóa chất cơ bản tuân theo thuyết điện ly Arrhenius / Bronsted-Lowry trong SGK Hóa học 11 GDPT 2018.",
    "relatedEquation": "Al₂(SO₄)₃ → 2Al³⁺ + 3SO₄²⁻",
    "iupacName": "Aluminum Sulfate",
    "archetype": "BASE_HYDROXIDE",
    "structuredEffects": [
      {
        "effectId": "B07_EFF_36",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Giảm 300 ATK quái thú địch bằng bazơ."
      }
    ]
  },
  {
    "id": "card_b07_037_hydrochloric_acid_37",
    "name": "Axit Clohidric — Đao Phủ Axit (HCl Nồng Độ 37)",
    "name_en": "Hydrochloric Acid — Đao Phủ Axit Molarity 37",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "ACID_DARK",
    "manaCost": 1,
    "level": 2,
    "atk": 1580,
    "def": 1060,
    "chemicalFormula": "HCl",
    "effectCode": "ELEM_B07_HYDROCHLORIC_ACID_CORR_37",
    "effectText": "Phân ly hoàn toàn proton H+: Gây sát thương xuyên giáp, nếu tấn công quái thú phòng thủ sẽ trừ thẳng chênh lệch vào LP đối phương.",
    "scientificLore": "Axit Clohidric (HCl) là hóa chất cơ bản tuân theo thuyết điện ly Arrhenius / Bronsted-Lowry trong SGK Hóa học 11 GDPT 2018.",
    "relatedEquation": "HCl → H⁺ + Cl⁻",
    "iupacName": "Hydrochloric Acid",
    "archetype": "STRONG_ACID_CORROSION",
    "structuredEffects": [
      {
        "effectId": "B07_EFF_37",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "SELF"
            }
          }
        ],
        "description": "Tăng 300 ATK ăn mòn axit mạnh."
      }
    ]
  },
  {
    "id": "card_b07_038_sulfuric_acid_38",
    "name": "Axit Sunfuric — Đao Phủ Axit (H2SO4 Nồng Độ 38)",
    "name_en": "Sulfuric Acid — Đao Phủ Axit Molarity 38",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "ACID_DARK",
    "manaCost": 2,
    "level": 3,
    "atk": 1820,
    "def": 1240,
    "chemicalFormula": "H2SO4",
    "effectCode": "ELEM_B07_SULFURIC_ACID_CORR_38",
    "effectText": "Phân ly hoàn toàn proton H+: Gây sát thương xuyên giáp, nếu tấn công quái thú phòng thủ sẽ trừ thẳng chênh lệch vào LP đối phương.",
    "scientificLore": "Axit Sunfuric (H2SO4) là hóa chất cơ bản tuân theo thuyết điện ly Arrhenius / Bronsted-Lowry trong SGK Hóa học 11 GDPT 2018.",
    "relatedEquation": "H₂SO₄ → H⁺ + HSO₄⁻",
    "iupacName": "Sulfuric Acid",
    "archetype": "STRONG_ACID_CORROSION",
    "structuredEffects": [
      {
        "effectId": "B07_EFF_38",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "SELF"
            }
          }
        ],
        "description": "Tăng 300 ATK ăn mòn axit mạnh."
      }
    ]
  },
  {
    "id": "card_b07_039_nitric_acid_39",
    "name": "Axit Nitric — Đao Phủ Axit (HNO3 Nồng Độ 39)",
    "name_en": "Nitric Acid — Đao Phủ Axit Molarity 39",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "ACID_DARK",
    "manaCost": 3,
    "level": 4,
    "atk": 2060,
    "def": 1420,
    "chemicalFormula": "HNO3",
    "effectCode": "ELEM_B07_NITRIC_ACID_CORR_39",
    "effectText": "Phân ly hoàn toàn proton H+: Gây sát thương xuyên giáp, nếu tấn công quái thú phòng thủ sẽ trừ thẳng chênh lệch vào LP đối phương.",
    "scientificLore": "Axit Nitric (HNO3) là hóa chất cơ bản tuân theo thuyết điện ly Arrhenius / Bronsted-Lowry trong SGK Hóa học 11 GDPT 2018.",
    "relatedEquation": "HNO₃ → H⁺ + NO₃⁻",
    "iupacName": "Nitric Acid",
    "archetype": "STRONG_ACID_CORROSION",
    "structuredEffects": [
      {
        "effectId": "B07_EFF_39",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "SELF"
            }
          }
        ],
        "description": "Tăng 300 ATK ăn mòn axit mạnh."
      }
    ]
  },
  {
    "id": "card_b07_040_phosphoric_acid_40",
    "name": "Axit Photphoric — Đao Phủ Axit (H3PO4 Nồng Độ 40)",
    "name_en": "Phosphoric Acid — Đao Phủ Axit Molarity 40",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "ULTRA_RARE",
    "attribute": "ACID_DARK",
    "manaCost": 4,
    "level": 5,
    "atk": 2300,
    "def": 1600,
    "chemicalFormula": "H3PO4",
    "effectCode": "ELEM_B07_PHOSPHORIC_ACID_CORR_40",
    "effectText": "Phân ly hoàn toàn proton H+: Gây sát thương xuyên giáp, nếu tấn công quái thú phòng thủ sẽ trừ thẳng chênh lệch vào LP đối phương.",
    "scientificLore": "Axit Photphoric (H3PO4) là hóa chất cơ bản tuân theo thuyết điện ly Arrhenius / Bronsted-Lowry trong SGK Hóa học 11 GDPT 2018.",
    "relatedEquation": "H₃PO₄ ⇌ H⁺ + H₂PO₄⁻",
    "iupacName": "Phosphoric Acid",
    "archetype": "STRONG_ACID_CORROSION",
    "structuredEffects": [
      {
        "effectId": "B07_EFF_40",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "SELF"
            }
          }
        ],
        "description": "Tăng 300 ATK ăn mòn axit mạnh."
      }
    ]
  },
  {
    "id": "card_b07_041_acetic_acid_41",
    "name": "Axit Axetic — Đao Phủ Axit (CH3COOH Nồng Độ 41)",
    "name_en": "Acetic Acid — Đao Phủ Axit Molarity 41",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SECRET_RARE",
    "attribute": "AQUA",
    "manaCost": 5,
    "level": 6,
    "atk": 2540,
    "def": 1780,
    "chemicalFormula": "CH3COOH",
    "effectCode": "ELEM_B07_ACETIC_ACID_CORR_41",
    "effectText": "Phân ly hoàn toàn proton H+: Gây sát thương xuyên giáp, nếu tấn công quái thú phòng thủ sẽ trừ thẳng chênh lệch vào LP đối phương.",
    "scientificLore": "Axit Axetic (CH3COOH) là hóa chất cơ bản tuân theo thuyết điện ly Arrhenius / Bronsted-Lowry trong SGK Hóa học 11 GDPT 2018.",
    "relatedEquation": "CH₃COOH ⇌ H⁺ + CH₃COO⁻",
    "iupacName": "Acetic Acid",
    "archetype": "STRONG_ACID_CORROSION",
    "structuredEffects": [
      {
        "effectId": "B07_EFF_41",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "SELF"
            }
          }
        ],
        "description": "Tăng 300 ATK ăn mòn axit mạnh."
      }
    ]
  },
  {
    "id": "card_b07_042_sodium_hydroxide_42",
    "name": "Natri Hydroxit — Đao Phủ Axit (NaOH Nồng Độ 42)",
    "name_en": "Sodium Hydroxide — Đao Phủ Axit Molarity 42",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "TERRA",
    "manaCost": 5,
    "level": 7,
    "atk": 2250,
    "def": 2850,
    "chemicalFormula": "NaOH",
    "effectCode": "ELEM_B07_SODIUM_HYDROXIDE_CORR_42",
    "effectText": "Dung dịch kiềm xà phòng hóa: Giảm 300 ATK của quái thú đối phương khi chúng tuyên bố tấn công.",
    "scientificLore": "Natri Hydroxit (NaOH) là hóa chất cơ bản tuân theo thuyết điện ly Arrhenius / Bronsted-Lowry trong SGK Hóa học 11 GDPT 2018.",
    "relatedEquation": "NaOH → Na⁺ + OH⁻",
    "iupacName": "Sodium Hydroxide",
    "archetype": "BASE_HYDROXIDE",
    "structuredEffects": [
      {
        "effectId": "B07_EFF_42",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Giảm 300 ATK quái thú địch bằng bazơ."
      }
    ]
  },
  {
    "id": "card_b07_043_potassium_hydroxide_43",
    "name": "Kali Hydroxit — Đao Phủ Axit (KOH Nồng Độ 43)",
    "name_en": "Potassium Hydroxide — Đao Phủ Axit Molarity 43",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "TERRA",
    "manaCost": 1,
    "level": 2,
    "atk": 1250,
    "def": 1600,
    "chemicalFormula": "KOH",
    "effectCode": "ELEM_B07_POTASSIUM_HYDROXIDE_CORR_43",
    "effectText": "Dung dịch kiềm xà phòng hóa: Giảm 300 ATK của quái thú đối phương khi chúng tuyên bố tấn công.",
    "scientificLore": "Kali Hydroxit (KOH) là hóa chất cơ bản tuân theo thuyết điện ly Arrhenius / Bronsted-Lowry trong SGK Hóa học 11 GDPT 2018.",
    "relatedEquation": "KOH → K⁺ + OH⁻",
    "iupacName": "Potassium Hydroxide",
    "archetype": "BASE_HYDROXIDE",
    "structuredEffects": [
      {
        "effectId": "B07_EFF_43",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Giảm 300 ATK quái thú địch bằng bazơ."
      }
    ]
  },
  {
    "id": "card_b07_044_calcium_hydroxide_44",
    "name": "Canxi Hydroxit — Đao Phủ Axit (Ca(OH)2 Nồng Độ 44)",
    "name_en": "Calcium Hydroxide — Đao Phủ Axit Molarity 44",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "TERRA",
    "manaCost": 2,
    "level": 3,
    "atk": 1450,
    "def": 1850,
    "chemicalFormula": "Ca(OH)2",
    "effectCode": "ELEM_B07_CALCIUM_HYDROXIDE_CORR_44",
    "effectText": "Dung dịch kiềm xà phòng hóa: Giảm 300 ATK của quái thú đối phương khi chúng tuyên bố tấn công.",
    "scientificLore": "Canxi Hydroxit (Ca(OH)2) là hóa chất cơ bản tuân theo thuyết điện ly Arrhenius / Bronsted-Lowry trong SGK Hóa học 11 GDPT 2018.",
    "relatedEquation": "Ca(OH)₂ ⇌ Ca²⁺ + 2OH⁻",
    "iupacName": "Calcium Hydroxide",
    "archetype": "BASE_HYDROXIDE",
    "structuredEffects": [
      {
        "effectId": "B07_EFF_44",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Giảm 300 ATK quái thú địch bằng bazơ."
      }
    ]
  },
  {
    "id": "card_b07_045_barium_hydroxide_45",
    "name": "Bari Hydroxit — Đao Phủ Axit (Ba(OH)2 Nồng Độ 45)",
    "name_en": "Barium Hydroxide — Đao Phủ Axit Molarity 45",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "TERRA",
    "manaCost": 3,
    "level": 4,
    "atk": 1650,
    "def": 2100,
    "chemicalFormula": "Ba(OH)2",
    "effectCode": "ELEM_B07_BARIUM_HYDROXIDE_CORR_45",
    "effectText": "Dung dịch kiềm xà phòng hóa: Giảm 300 ATK của quái thú đối phương khi chúng tuyên bố tấn công.",
    "scientificLore": "Bari Hydroxit (Ba(OH)2) là hóa chất cơ bản tuân theo thuyết điện ly Arrhenius / Bronsted-Lowry trong SGK Hóa học 11 GDPT 2018.",
    "relatedEquation": "Ba(OH)₂ → Ba²⁺ + 2OH⁻",
    "iupacName": "Barium Hydroxide",
    "archetype": "BASE_HYDROXIDE",
    "structuredEffects": [
      {
        "effectId": "B07_EFF_45",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Giảm 300 ATK quái thú địch bằng bazơ."
      }
    ]
  },
  {
    "id": "card_b07_046_copper_sulfate_46",
    "name": "Đồng(II) Sunfat — Đao Phủ Axit (CuSO4 Nồng Độ 46)",
    "name_en": "Copper Sulfate — Đao Phủ Axit Molarity 46",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "ELECTRO",
    "manaCost": 4,
    "level": 5,
    "atk": 1850,
    "def": 2350,
    "chemicalFormula": "CuSO4",
    "effectCode": "ELEM_B07_COPPER_SULFATE_CORR_46",
    "effectText": "Dung dịch kiềm xà phòng hóa: Giảm 300 ATK của quái thú đối phương khi chúng tuyên bố tấn công.",
    "scientificLore": "Đồng(II) Sunfat (CuSO4) là hóa chất cơ bản tuân theo thuyết điện ly Arrhenius / Bronsted-Lowry trong SGK Hóa học 11 GDPT 2018.",
    "relatedEquation": "CuSO₄ → Cu²⁺ + SO₄²⁻",
    "iupacName": "Copper Sulfate",
    "archetype": "BASE_HYDROXIDE",
    "structuredEffects": [
      {
        "effectId": "B07_EFF_46",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Giảm 300 ATK quái thú địch bằng bazơ."
      }
    ]
  },
  {
    "id": "card_b07_047_iron_iii__chloride_47",
    "name": "Sắt(III) Clorua — Đao Phủ Axit (FeCl3 Nồng Độ 47)",
    "name_en": "Iron(III) Chloride — Đao Phủ Axit Molarity 47",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "TERRA",
    "manaCost": 5,
    "level": 6,
    "atk": 2050,
    "def": 2600,
    "chemicalFormula": "FeCl3",
    "effectCode": "ELEM_B07_IRON_III__CHLORIDE_CORR_47",
    "effectText": "Dung dịch kiềm xà phòng hóa: Giảm 300 ATK của quái thú đối phương khi chúng tuyên bố tấn công.",
    "scientificLore": "Sắt(III) Clorua (FeCl3) là hóa chất cơ bản tuân theo thuyết điện ly Arrhenius / Bronsted-Lowry trong SGK Hóa học 11 GDPT 2018.",
    "relatedEquation": "FeCl₃ → Fe³⁺ + 3Cl⁻",
    "iupacName": "Iron(III) Chloride",
    "archetype": "BASE_HYDROXIDE",
    "structuredEffects": [
      {
        "effectId": "B07_EFF_47",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Giảm 300 ATK quái thú địch bằng bazơ."
      }
    ]
  },
  {
    "id": "card_b07_048_aluminum_sulfate_48",
    "name": "Nhôm Sunfat — Đao Phủ Axit (Al2(SO4)3 Nồng Độ 48)",
    "name_en": "Aluminum Sulfate — Đao Phủ Axit Molarity 48",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "TERRA",
    "manaCost": 5,
    "level": 7,
    "atk": 2250,
    "def": 2850,
    "chemicalFormula": "Al2(SO4)3",
    "effectCode": "ELEM_B07_ALUMINUM_SULFATE_CORR_48",
    "effectText": "Dung dịch kiềm xà phòng hóa: Giảm 300 ATK của quái thú đối phương khi chúng tuyên bố tấn công.",
    "scientificLore": "Nhôm Sunfat (Al2(SO4)3) là hóa chất cơ bản tuân theo thuyết điện ly Arrhenius / Bronsted-Lowry trong SGK Hóa học 11 GDPT 2018.",
    "relatedEquation": "Al₂(SO₄)₃ → 2Al³⁺ + 3SO₄²⁻",
    "iupacName": "Aluminum Sulfate",
    "archetype": "BASE_HYDROXIDE",
    "structuredEffects": [
      {
        "effectId": "B07_EFF_48",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Giảm 300 ATK quái thú địch bằng bazơ."
      }
    ]
  },
  {
    "id": "card_b07_049_hydrochloric_acid_49",
    "name": "Axit Clohidric — Lính Thủy Phân (HCl Nồng Độ 49)",
    "name_en": "Hydrochloric Acid — Lính Thủy Phân Molarity 49",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "ULTRA_RARE",
    "attribute": "ACID_DARK",
    "manaCost": 1,
    "level": 2,
    "atk": 1580,
    "def": 1060,
    "chemicalFormula": "HCl",
    "effectCode": "ELEM_B07_HYDROCHLORIC_ACID_CORR_49",
    "effectText": "Phân ly hoàn toàn proton H+: Gây sát thương xuyên giáp, nếu tấn công quái thú phòng thủ sẽ trừ thẳng chênh lệch vào LP đối phương.",
    "scientificLore": "Axit Clohidric (HCl) là hóa chất cơ bản tuân theo thuyết điện ly Arrhenius / Bronsted-Lowry trong SGK Hóa học 11 GDPT 2018.",
    "relatedEquation": "HCl → H⁺ + Cl⁻",
    "iupacName": "Hydrochloric Acid",
    "archetype": "STRONG_ACID_CORROSION",
    "structuredEffects": [
      {
        "effectId": "B07_EFF_49",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "SELF"
            }
          }
        ],
        "description": "Tăng 300 ATK ăn mòn axit mạnh."
      }
    ]
  },
  {
    "id": "card_b07_050_sulfuric_acid_50",
    "name": "Axit Sunfuric — Lính Thủy Phân (H2SO4 Nồng Độ 50)",
    "name_en": "Sulfuric Acid — Lính Thủy Phân Molarity 50",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SECRET_RARE",
    "attribute": "ACID_DARK",
    "manaCost": 2,
    "level": 3,
    "atk": 1820,
    "def": 1240,
    "chemicalFormula": "H2SO4",
    "effectCode": "ELEM_B07_SULFURIC_ACID_CORR_50",
    "effectText": "Phân ly hoàn toàn proton H+: Gây sát thương xuyên giáp, nếu tấn công quái thú phòng thủ sẽ trừ thẳng chênh lệch vào LP đối phương.",
    "scientificLore": "Axit Sunfuric (H2SO4) là hóa chất cơ bản tuân theo thuyết điện ly Arrhenius / Bronsted-Lowry trong SGK Hóa học 11 GDPT 2018.",
    "relatedEquation": "H₂SO₄ → H⁺ + HSO₄⁻",
    "iupacName": "Sulfuric Acid",
    "archetype": "STRONG_ACID_CORROSION",
    "structuredEffects": [
      {
        "effectId": "B07_EFF_50",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "SELF"
            }
          }
        ],
        "description": "Tăng 300 ATK ăn mòn axit mạnh."
      }
    ]
  },
  {
    "id": "card_b07_051_nitric_acid_51",
    "name": "Axit Nitric — Lính Thủy Phân (HNO3 Nồng Độ 51)",
    "name_en": "Nitric Acid — Lính Thủy Phân Molarity 51",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "ACID_DARK",
    "manaCost": 3,
    "level": 4,
    "atk": 2060,
    "def": 1420,
    "chemicalFormula": "HNO3",
    "effectCode": "ELEM_B07_NITRIC_ACID_CORR_51",
    "effectText": "Phân ly hoàn toàn proton H+: Gây sát thương xuyên giáp, nếu tấn công quái thú phòng thủ sẽ trừ thẳng chênh lệch vào LP đối phương.",
    "scientificLore": "Axit Nitric (HNO3) là hóa chất cơ bản tuân theo thuyết điện ly Arrhenius / Bronsted-Lowry trong SGK Hóa học 11 GDPT 2018.",
    "relatedEquation": "HNO₃ → H⁺ + NO₃⁻",
    "iupacName": "Nitric Acid",
    "archetype": "STRONG_ACID_CORROSION",
    "structuredEffects": [
      {
        "effectId": "B07_EFF_51",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "SELF"
            }
          }
        ],
        "description": "Tăng 300 ATK ăn mòn axit mạnh."
      }
    ]
  },
  {
    "id": "card_b07_052_phosphoric_acid_52",
    "name": "Axit Photphoric — Lính Thủy Phân (H3PO4 Nồng Độ 52)",
    "name_en": "Phosphoric Acid — Lính Thủy Phân Molarity 52",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "ACID_DARK",
    "manaCost": 4,
    "level": 5,
    "atk": 2300,
    "def": 1600,
    "chemicalFormula": "H3PO4",
    "effectCode": "ELEM_B07_PHOSPHORIC_ACID_CORR_52",
    "effectText": "Phân ly hoàn toàn proton H+: Gây sát thương xuyên giáp, nếu tấn công quái thú phòng thủ sẽ trừ thẳng chênh lệch vào LP đối phương.",
    "scientificLore": "Axit Photphoric (H3PO4) là hóa chất cơ bản tuân theo thuyết điện ly Arrhenius / Bronsted-Lowry trong SGK Hóa học 11 GDPT 2018.",
    "relatedEquation": "H₃PO₄ ⇌ H⁺ + H₂PO₄⁻",
    "iupacName": "Phosphoric Acid",
    "archetype": "STRONG_ACID_CORROSION",
    "structuredEffects": [
      {
        "effectId": "B07_EFF_52",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "SELF"
            }
          }
        ],
        "description": "Tăng 300 ATK ăn mòn axit mạnh."
      }
    ]
  },
  {
    "id": "card_b07_053_acetic_acid_53",
    "name": "Axit Axetic — Lính Thủy Phân (CH3COOH Nồng Độ 53)",
    "name_en": "Acetic Acid — Lính Thủy Phân Molarity 53",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "AQUA",
    "manaCost": 5,
    "level": 6,
    "atk": 2540,
    "def": 1780,
    "chemicalFormula": "CH3COOH",
    "effectCode": "ELEM_B07_ACETIC_ACID_CORR_53",
    "effectText": "Phân ly hoàn toàn proton H+: Gây sát thương xuyên giáp, nếu tấn công quái thú phòng thủ sẽ trừ thẳng chênh lệch vào LP đối phương.",
    "scientificLore": "Axit Axetic (CH3COOH) là hóa chất cơ bản tuân theo thuyết điện ly Arrhenius / Bronsted-Lowry trong SGK Hóa học 11 GDPT 2018.",
    "relatedEquation": "CH₃COOH ⇌ H⁺ + CH₃COO⁻",
    "iupacName": "Acetic Acid",
    "archetype": "STRONG_ACID_CORROSION",
    "structuredEffects": [
      {
        "effectId": "B07_EFF_53",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "SELF"
            }
          }
        ],
        "description": "Tăng 300 ATK ăn mòn axit mạnh."
      }
    ]
  },
  {
    "id": "card_b07_054_sodium_hydroxide_54",
    "name": "Natri Hydroxit — Lính Thủy Phân (NaOH Nồng Độ 54)",
    "name_en": "Sodium Hydroxide — Lính Thủy Phân Molarity 54",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "TERRA",
    "manaCost": 5,
    "level": 7,
    "atk": 2250,
    "def": 2850,
    "chemicalFormula": "NaOH",
    "effectCode": "ELEM_B07_SODIUM_HYDROXIDE_CORR_54",
    "effectText": "Dung dịch kiềm xà phòng hóa: Giảm 300 ATK của quái thú đối phương khi chúng tuyên bố tấn công.",
    "scientificLore": "Natri Hydroxit (NaOH) là hóa chất cơ bản tuân theo thuyết điện ly Arrhenius / Bronsted-Lowry trong SGK Hóa học 11 GDPT 2018.",
    "relatedEquation": "NaOH → Na⁺ + OH⁻",
    "iupacName": "Sodium Hydroxide",
    "archetype": "BASE_HYDROXIDE",
    "structuredEffects": [
      {
        "effectId": "B07_EFF_54",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Giảm 300 ATK quái thú địch bằng bazơ."
      }
    ]
  },
  {
    "id": "card_b07_055_potassium_hydroxide_55",
    "name": "Kali Hydroxit — Lính Thủy Phân (KOH Nồng Độ 55)",
    "name_en": "Potassium Hydroxide — Lính Thủy Phân Molarity 55",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "TERRA",
    "manaCost": 1,
    "level": 2,
    "atk": 1250,
    "def": 1600,
    "chemicalFormula": "KOH",
    "effectCode": "ELEM_B07_POTASSIUM_HYDROXIDE_CORR_55",
    "effectText": "Dung dịch kiềm xà phòng hóa: Giảm 300 ATK của quái thú đối phương khi chúng tuyên bố tấn công.",
    "scientificLore": "Kali Hydroxit (KOH) là hóa chất cơ bản tuân theo thuyết điện ly Arrhenius / Bronsted-Lowry trong SGK Hóa học 11 GDPT 2018.",
    "relatedEquation": "KOH → K⁺ + OH⁻",
    "iupacName": "Potassium Hydroxide",
    "archetype": "BASE_HYDROXIDE",
    "structuredEffects": [
      {
        "effectId": "B07_EFF_55",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Giảm 300 ATK quái thú địch bằng bazơ."
      }
    ]
  },
  {
    "id": "card_b07_056_calcium_hydroxide_56",
    "name": "Canxi Hydroxit — Lính Thủy Phân (Ca(OH)2 Nồng Độ 56)",
    "name_en": "Calcium Hydroxide — Lính Thủy Phân Molarity 56",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "TERRA",
    "manaCost": 2,
    "level": 3,
    "atk": 1450,
    "def": 1850,
    "chemicalFormula": "Ca(OH)2",
    "effectCode": "ELEM_B07_CALCIUM_HYDROXIDE_CORR_56",
    "effectText": "Dung dịch kiềm xà phòng hóa: Giảm 300 ATK của quái thú đối phương khi chúng tuyên bố tấn công.",
    "scientificLore": "Canxi Hydroxit (Ca(OH)2) là hóa chất cơ bản tuân theo thuyết điện ly Arrhenius / Bronsted-Lowry trong SGK Hóa học 11 GDPT 2018.",
    "relatedEquation": "Ca(OH)₂ ⇌ Ca²⁺ + 2OH⁻",
    "iupacName": "Calcium Hydroxide",
    "archetype": "BASE_HYDROXIDE",
    "structuredEffects": [
      {
        "effectId": "B07_EFF_56",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Giảm 300 ATK quái thú địch bằng bazơ."
      }
    ]
  },
  {
    "id": "card_b07_057_barium_hydroxide_57",
    "name": "Bari Hydroxit — Lính Thủy Phân (Ba(OH)2 Nồng Độ 57)",
    "name_en": "Barium Hydroxide — Lính Thủy Phân Molarity 57",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "TERRA",
    "manaCost": 3,
    "level": 4,
    "atk": 1650,
    "def": 2100,
    "chemicalFormula": "Ba(OH)2",
    "effectCode": "ELEM_B07_BARIUM_HYDROXIDE_CORR_57",
    "effectText": "Dung dịch kiềm xà phòng hóa: Giảm 300 ATK của quái thú đối phương khi chúng tuyên bố tấn công.",
    "scientificLore": "Bari Hydroxit (Ba(OH)2) là hóa chất cơ bản tuân theo thuyết điện ly Arrhenius / Bronsted-Lowry trong SGK Hóa học 11 GDPT 2018.",
    "relatedEquation": "Ba(OH)₂ → Ba²⁺ + 2OH⁻",
    "iupacName": "Barium Hydroxide",
    "archetype": "BASE_HYDROXIDE",
    "structuredEffects": [
      {
        "effectId": "B07_EFF_57",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Giảm 300 ATK quái thú địch bằng bazơ."
      }
    ]
  },
  {
    "id": "card_b07_058_copper_sulfate_58",
    "name": "Đồng(II) Sunfat — Lính Thủy Phân (CuSO4 Nồng Độ 58)",
    "name_en": "Copper Sulfate — Lính Thủy Phân Molarity 58",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "ULTRA_RARE",
    "attribute": "ELECTRO",
    "manaCost": 4,
    "level": 5,
    "atk": 1850,
    "def": 2350,
    "chemicalFormula": "CuSO4",
    "effectCode": "ELEM_B07_COPPER_SULFATE_CORR_58",
    "effectText": "Dung dịch kiềm xà phòng hóa: Giảm 300 ATK của quái thú đối phương khi chúng tuyên bố tấn công.",
    "scientificLore": "Đồng(II) Sunfat (CuSO4) là hóa chất cơ bản tuân theo thuyết điện ly Arrhenius / Bronsted-Lowry trong SGK Hóa học 11 GDPT 2018.",
    "relatedEquation": "CuSO₄ → Cu²⁺ + SO₄²⁻",
    "iupacName": "Copper Sulfate",
    "archetype": "BASE_HYDROXIDE",
    "structuredEffects": [
      {
        "effectId": "B07_EFF_58",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Giảm 300 ATK quái thú địch bằng bazơ."
      }
    ]
  },
  {
    "id": "card_b07_059_iron_iii__chloride_59",
    "name": "Sắt(III) Clorua — Lính Thủy Phân (FeCl3 Nồng Độ 59)",
    "name_en": "Iron(III) Chloride — Lính Thủy Phân Molarity 59",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SECRET_RARE",
    "attribute": "TERRA",
    "manaCost": 5,
    "level": 6,
    "atk": 2050,
    "def": 2600,
    "chemicalFormula": "FeCl3",
    "effectCode": "ELEM_B07_IRON_III__CHLORIDE_CORR_59",
    "effectText": "Dung dịch kiềm xà phòng hóa: Giảm 300 ATK của quái thú đối phương khi chúng tuyên bố tấn công.",
    "scientificLore": "Sắt(III) Clorua (FeCl3) là hóa chất cơ bản tuân theo thuyết điện ly Arrhenius / Bronsted-Lowry trong SGK Hóa học 11 GDPT 2018.",
    "relatedEquation": "FeCl₃ → Fe³⁺ + 3Cl⁻",
    "iupacName": "Iron(III) Chloride",
    "archetype": "BASE_HYDROXIDE",
    "structuredEffects": [
      {
        "effectId": "B07_EFF_59",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Giảm 300 ATK quái thú địch bằng bazơ."
      }
    ]
  },
  {
    "id": "card_b07_060_aluminum_sulfate_60",
    "name": "Nhôm Sunfat — Lính Thủy Phân (Al2(SO4)3 Nồng Độ 60)",
    "name_en": "Aluminum Sulfate — Lính Thủy Phân Molarity 60",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "TERRA",
    "manaCost": 5,
    "level": 7,
    "atk": 2250,
    "def": 2850,
    "chemicalFormula": "Al2(SO4)3",
    "effectCode": "ELEM_B07_ALUMINUM_SULFATE_CORR_60",
    "effectText": "Dung dịch kiềm xà phòng hóa: Giảm 300 ATK của quái thú đối phương khi chúng tuyên bố tấn công.",
    "scientificLore": "Nhôm Sunfat (Al2(SO4)3) là hóa chất cơ bản tuân theo thuyết điện ly Arrhenius / Bronsted-Lowry trong SGK Hóa học 11 GDPT 2018.",
    "relatedEquation": "Al₂(SO₄)₃ → 2Al³⁺ + 3SO₄²⁻",
    "iupacName": "Aluminum Sulfate",
    "archetype": "BASE_HYDROXIDE",
    "structuredEffects": [
      {
        "effectId": "B07_EFF_60",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Giảm 300 ATK quái thú địch bằng bazơ."
      }
    ]
  },
  {
    "id": "card_b07_061_hydrochloric_acid_61",
    "name": "Axit Clohidric — Bậc Thầy Ăn Mòn (HCl Nồng Độ 61)",
    "name_en": "Hydrochloric Acid — Bậc Thầy Ăn Mòn Molarity 61",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "ACID_DARK",
    "manaCost": 1,
    "level": 2,
    "atk": 1580,
    "def": 1060,
    "chemicalFormula": "HCl",
    "effectCode": "ELEM_B07_HYDROCHLORIC_ACID_CORR_61",
    "effectText": "Phân ly hoàn toàn proton H+: Gây sát thương xuyên giáp, nếu tấn công quái thú phòng thủ sẽ trừ thẳng chênh lệch vào LP đối phương.",
    "scientificLore": "Axit Clohidric (HCl) là hóa chất cơ bản tuân theo thuyết điện ly Arrhenius / Bronsted-Lowry trong SGK Hóa học 11 GDPT 2018.",
    "relatedEquation": "HCl → H⁺ + Cl⁻",
    "iupacName": "Hydrochloric Acid",
    "archetype": "STRONG_ACID_CORROSION",
    "structuredEffects": [
      {
        "effectId": "B07_EFF_61",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "SELF"
            }
          }
        ],
        "description": "Tăng 300 ATK ăn mòn axit mạnh."
      }
    ]
  },
  {
    "id": "card_b07_062_sulfuric_acid_62",
    "name": "Axit Sunfuric — Bậc Thầy Ăn Mòn (H2SO4 Nồng Độ 62)",
    "name_en": "Sulfuric Acid — Bậc Thầy Ăn Mòn Molarity 62",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "ACID_DARK",
    "manaCost": 2,
    "level": 3,
    "atk": 1820,
    "def": 1240,
    "chemicalFormula": "H2SO4",
    "effectCode": "ELEM_B07_SULFURIC_ACID_CORR_62",
    "effectText": "Phân ly hoàn toàn proton H+: Gây sát thương xuyên giáp, nếu tấn công quái thú phòng thủ sẽ trừ thẳng chênh lệch vào LP đối phương.",
    "scientificLore": "Axit Sunfuric (H2SO4) là hóa chất cơ bản tuân theo thuyết điện ly Arrhenius / Bronsted-Lowry trong SGK Hóa học 11 GDPT 2018.",
    "relatedEquation": "H₂SO₄ → H⁺ + HSO₄⁻",
    "iupacName": "Sulfuric Acid",
    "archetype": "STRONG_ACID_CORROSION",
    "structuredEffects": [
      {
        "effectId": "B07_EFF_62",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "SELF"
            }
          }
        ],
        "description": "Tăng 300 ATK ăn mòn axit mạnh."
      }
    ]
  },
  {
    "id": "card_b07_063_nitric_acid_63",
    "name": "Axit Nitric — Bậc Thầy Ăn Mòn (HNO3 Nồng Độ 63)",
    "name_en": "Nitric Acid — Bậc Thầy Ăn Mòn Molarity 63",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "ACID_DARK",
    "manaCost": 3,
    "level": 4,
    "atk": 2060,
    "def": 1420,
    "chemicalFormula": "HNO3",
    "effectCode": "ELEM_B07_NITRIC_ACID_CORR_63",
    "effectText": "Phân ly hoàn toàn proton H+: Gây sát thương xuyên giáp, nếu tấn công quái thú phòng thủ sẽ trừ thẳng chênh lệch vào LP đối phương.",
    "scientificLore": "Axit Nitric (HNO3) là hóa chất cơ bản tuân theo thuyết điện ly Arrhenius / Bronsted-Lowry trong SGK Hóa học 11 GDPT 2018.",
    "relatedEquation": "HNO₃ → H⁺ + NO₃⁻",
    "iupacName": "Nitric Acid",
    "archetype": "STRONG_ACID_CORROSION",
    "structuredEffects": [
      {
        "effectId": "B07_EFF_63",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "SELF"
            }
          }
        ],
        "description": "Tăng 300 ATK ăn mòn axit mạnh."
      }
    ]
  },
  {
    "id": "card_b07_064_phosphoric_acid_64",
    "name": "Axit Photphoric — Bậc Thầy Ăn Mòn (H3PO4 Nồng Độ 64)",
    "name_en": "Phosphoric Acid — Bậc Thầy Ăn Mòn Molarity 64",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "ACID_DARK",
    "manaCost": 4,
    "level": 5,
    "atk": 2300,
    "def": 1600,
    "chemicalFormula": "H3PO4",
    "effectCode": "ELEM_B07_PHOSPHORIC_ACID_CORR_64",
    "effectText": "Phân ly hoàn toàn proton H+: Gây sát thương xuyên giáp, nếu tấn công quái thú phòng thủ sẽ trừ thẳng chênh lệch vào LP đối phương.",
    "scientificLore": "Axit Photphoric (H3PO4) là hóa chất cơ bản tuân theo thuyết điện ly Arrhenius / Bronsted-Lowry trong SGK Hóa học 11 GDPT 2018.",
    "relatedEquation": "H₃PO₄ ⇌ H⁺ + H₂PO₄⁻",
    "iupacName": "Phosphoric Acid",
    "archetype": "STRONG_ACID_CORROSION",
    "structuredEffects": [
      {
        "effectId": "B07_EFF_64",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "SELF"
            }
          }
        ],
        "description": "Tăng 300 ATK ăn mòn axit mạnh."
      }
    ]
  },
  {
    "id": "card_b07_065_acetic_acid_65",
    "name": "Axit Axetic — Bậc Thầy Ăn Mòn (CH3COOH Nồng Độ 65)",
    "name_en": "Acetic Acid — Bậc Thầy Ăn Mòn Molarity 65",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "AQUA",
    "manaCost": 5,
    "level": 6,
    "atk": 2540,
    "def": 1780,
    "chemicalFormula": "CH3COOH",
    "effectCode": "ELEM_B07_ACETIC_ACID_CORR_65",
    "effectText": "Phân ly hoàn toàn proton H+: Gây sát thương xuyên giáp, nếu tấn công quái thú phòng thủ sẽ trừ thẳng chênh lệch vào LP đối phương.",
    "scientificLore": "Axit Axetic (CH3COOH) là hóa chất cơ bản tuân theo thuyết điện ly Arrhenius / Bronsted-Lowry trong SGK Hóa học 11 GDPT 2018.",
    "relatedEquation": "CH₃COOH ⇌ H⁺ + CH₃COO⁻",
    "iupacName": "Acetic Acid",
    "archetype": "STRONG_ACID_CORROSION",
    "structuredEffects": [
      {
        "effectId": "B07_EFF_65",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "SELF"
            }
          }
        ],
        "description": "Tăng 300 ATK ăn mòn axit mạnh."
      }
    ]
  },
  {
    "id": "card_b07_066_sodium_hydroxide_66",
    "name": "Natri Hydroxit — Bậc Thầy Ăn Mòn (NaOH Nồng Độ 66)",
    "name_en": "Sodium Hydroxide — Bậc Thầy Ăn Mòn Molarity 66",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "TERRA",
    "manaCost": 5,
    "level": 7,
    "atk": 2250,
    "def": 2850,
    "chemicalFormula": "NaOH",
    "effectCode": "ELEM_B07_SODIUM_HYDROXIDE_CORR_66",
    "effectText": "Dung dịch kiềm xà phòng hóa: Giảm 300 ATK của quái thú đối phương khi chúng tuyên bố tấn công.",
    "scientificLore": "Natri Hydroxit (NaOH) là hóa chất cơ bản tuân theo thuyết điện ly Arrhenius / Bronsted-Lowry trong SGK Hóa học 11 GDPT 2018.",
    "relatedEquation": "NaOH → Na⁺ + OH⁻",
    "iupacName": "Sodium Hydroxide",
    "archetype": "BASE_HYDROXIDE",
    "structuredEffects": [
      {
        "effectId": "B07_EFF_66",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Giảm 300 ATK quái thú địch bằng bazơ."
      }
    ]
  },
  {
    "id": "card_b07_067_potassium_hydroxide_67",
    "name": "Kali Hydroxit — Bậc Thầy Ăn Mòn (KOH Nồng Độ 67)",
    "name_en": "Potassium Hydroxide — Bậc Thầy Ăn Mòn Molarity 67",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "ULTRA_RARE",
    "attribute": "TERRA",
    "manaCost": 1,
    "level": 2,
    "atk": 1250,
    "def": 1600,
    "chemicalFormula": "KOH",
    "effectCode": "ELEM_B07_POTASSIUM_HYDROXIDE_CORR_67",
    "effectText": "Dung dịch kiềm xà phòng hóa: Giảm 300 ATK của quái thú đối phương khi chúng tuyên bố tấn công.",
    "scientificLore": "Kali Hydroxit (KOH) là hóa chất cơ bản tuân theo thuyết điện ly Arrhenius / Bronsted-Lowry trong SGK Hóa học 11 GDPT 2018.",
    "relatedEquation": "KOH → K⁺ + OH⁻",
    "iupacName": "Potassium Hydroxide",
    "archetype": "BASE_HYDROXIDE",
    "structuredEffects": [
      {
        "effectId": "B07_EFF_67",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Giảm 300 ATK quái thú địch bằng bazơ."
      }
    ]
  },
  {
    "id": "card_b07_068_calcium_hydroxide_68",
    "name": "Canxi Hydroxit — Bậc Thầy Ăn Mòn (Ca(OH)2 Nồng Độ 68)",
    "name_en": "Calcium Hydroxide — Bậc Thầy Ăn Mòn Molarity 68",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SECRET_RARE",
    "attribute": "TERRA",
    "manaCost": 2,
    "level": 3,
    "atk": 1450,
    "def": 1850,
    "chemicalFormula": "Ca(OH)2",
    "effectCode": "ELEM_B07_CALCIUM_HYDROXIDE_CORR_68",
    "effectText": "Dung dịch kiềm xà phòng hóa: Giảm 300 ATK của quái thú đối phương khi chúng tuyên bố tấn công.",
    "scientificLore": "Canxi Hydroxit (Ca(OH)2) là hóa chất cơ bản tuân theo thuyết điện ly Arrhenius / Bronsted-Lowry trong SGK Hóa học 11 GDPT 2018.",
    "relatedEquation": "Ca(OH)₂ ⇌ Ca²⁺ + 2OH⁻",
    "iupacName": "Calcium Hydroxide",
    "archetype": "BASE_HYDROXIDE",
    "structuredEffects": [
      {
        "effectId": "B07_EFF_68",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Giảm 300 ATK quái thú địch bằng bazơ."
      }
    ]
  },
  {
    "id": "card_b07_069_barium_hydroxide_69",
    "name": "Bari Hydroxit — Bậc Thầy Ăn Mòn (Ba(OH)2 Nồng Độ 69)",
    "name_en": "Barium Hydroxide — Bậc Thầy Ăn Mòn Molarity 69",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "TERRA",
    "manaCost": 3,
    "level": 4,
    "atk": 1650,
    "def": 2100,
    "chemicalFormula": "Ba(OH)2",
    "effectCode": "ELEM_B07_BARIUM_HYDROXIDE_CORR_69",
    "effectText": "Dung dịch kiềm xà phòng hóa: Giảm 300 ATK của quái thú đối phương khi chúng tuyên bố tấn công.",
    "scientificLore": "Bari Hydroxit (Ba(OH)2) là hóa chất cơ bản tuân theo thuyết điện ly Arrhenius / Bronsted-Lowry trong SGK Hóa học 11 GDPT 2018.",
    "relatedEquation": "Ba(OH)₂ → Ba²⁺ + 2OH⁻",
    "iupacName": "Barium Hydroxide",
    "archetype": "BASE_HYDROXIDE",
    "structuredEffects": [
      {
        "effectId": "B07_EFF_69",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Giảm 300 ATK quái thú địch bằng bazơ."
      }
    ]
  },
  {
    "id": "card_b07_070_copper_sulfate_70",
    "name": "Đồng(II) Sunfat — Bậc Thầy Ăn Mòn (CuSO4 Nồng Độ 70)",
    "name_en": "Copper Sulfate — Bậc Thầy Ăn Mòn Molarity 70",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "ELECTRO",
    "manaCost": 4,
    "level": 5,
    "atk": 1850,
    "def": 2350,
    "chemicalFormula": "CuSO4",
    "effectCode": "ELEM_B07_COPPER_SULFATE_CORR_70",
    "effectText": "Dung dịch kiềm xà phòng hóa: Giảm 300 ATK của quái thú đối phương khi chúng tuyên bố tấn công.",
    "scientificLore": "Đồng(II) Sunfat (CuSO4) là hóa chất cơ bản tuân theo thuyết điện ly Arrhenius / Bronsted-Lowry trong SGK Hóa học 11 GDPT 2018.",
    "relatedEquation": "CuSO₄ → Cu²⁺ + SO₄²⁻",
    "iupacName": "Copper Sulfate",
    "archetype": "BASE_HYDROXIDE",
    "structuredEffects": [
      {
        "effectId": "B07_EFF_70",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Giảm 300 ATK quái thú địch bằng bazơ."
      }
    ]
  },
  {
    "id": "card_b07_071_iron_iii__chloride_71",
    "name": "Sắt(III) Clorua — Bậc Thầy Ăn Mòn (FeCl3 Nồng Độ 71)",
    "name_en": "Iron(III) Chloride — Bậc Thầy Ăn Mòn Molarity 71",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "TERRA",
    "manaCost": 5,
    "level": 6,
    "atk": 2050,
    "def": 2600,
    "chemicalFormula": "FeCl3",
    "effectCode": "ELEM_B07_IRON_III__CHLORIDE_CORR_71",
    "effectText": "Dung dịch kiềm xà phòng hóa: Giảm 300 ATK của quái thú đối phương khi chúng tuyên bố tấn công.",
    "scientificLore": "Sắt(III) Clorua (FeCl3) là hóa chất cơ bản tuân theo thuyết điện ly Arrhenius / Bronsted-Lowry trong SGK Hóa học 11 GDPT 2018.",
    "relatedEquation": "FeCl₃ → Fe³⁺ + 3Cl⁻",
    "iupacName": "Iron(III) Chloride",
    "archetype": "BASE_HYDROXIDE",
    "structuredEffects": [
      {
        "effectId": "B07_EFF_71",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Giảm 300 ATK quái thú địch bằng bazơ."
      }
    ]
  },
  {
    "id": "card_b07_072_aluminum_sulfate_72",
    "name": "Nhôm Sunfat — Bậc Thầy Ăn Mòn (Al2(SO4)3 Nồng Độ 72)",
    "name_en": "Aluminum Sulfate — Bậc Thầy Ăn Mòn Molarity 72",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "TERRA",
    "manaCost": 5,
    "level": 7,
    "atk": 2250,
    "def": 2850,
    "chemicalFormula": "Al2(SO4)3",
    "effectCode": "ELEM_B07_ALUMINUM_SULFATE_CORR_72",
    "effectText": "Dung dịch kiềm xà phòng hóa: Giảm 300 ATK của quái thú đối phương khi chúng tuyên bố tấn công.",
    "scientificLore": "Nhôm Sunfat (Al2(SO4)3) là hóa chất cơ bản tuân theo thuyết điện ly Arrhenius / Bronsted-Lowry trong SGK Hóa học 11 GDPT 2018.",
    "relatedEquation": "Al₂(SO₄)₃ → 2Al³⁺ + 3SO₄²⁻",
    "iupacName": "Aluminum Sulfate",
    "archetype": "BASE_HYDROXIDE",
    "structuredEffects": [
      {
        "effectId": "B07_EFF_72",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Giảm 300 ATK quái thú địch bằng bazơ."
      }
    ]
  },
  {
    "id": "card_b07_073_hydrochloric_acid_73",
    "name": "Axit Clohidric — Chiến Binh Kiềm Hóa (HCl Nồng Độ 73)",
    "name_en": "Hydrochloric Acid — Chiến Binh Kiềm Hóa Molarity 73",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "ACID_DARK",
    "manaCost": 1,
    "level": 2,
    "atk": 1580,
    "def": 1060,
    "chemicalFormula": "HCl",
    "effectCode": "ELEM_B07_HYDROCHLORIC_ACID_CORR_73",
    "effectText": "Phân ly hoàn toàn proton H+: Gây sát thương xuyên giáp, nếu tấn công quái thú phòng thủ sẽ trừ thẳng chênh lệch vào LP đối phương.",
    "scientificLore": "Axit Clohidric (HCl) là hóa chất cơ bản tuân theo thuyết điện ly Arrhenius / Bronsted-Lowry trong SGK Hóa học 11 GDPT 2018.",
    "relatedEquation": "HCl → H⁺ + Cl⁻",
    "iupacName": "Hydrochloric Acid",
    "archetype": "STRONG_ACID_CORROSION",
    "structuredEffects": [
      {
        "effectId": "B07_EFF_73",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "SELF"
            }
          }
        ],
        "description": "Tăng 300 ATK ăn mòn axit mạnh."
      }
    ]
  },
  {
    "id": "card_b07_074_sulfuric_acid_74",
    "name": "Axit Sunfuric — Chiến Binh Kiềm Hóa (H2SO4 Nồng Độ 74)",
    "name_en": "Sulfuric Acid — Chiến Binh Kiềm Hóa Molarity 74",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "ACID_DARK",
    "manaCost": 2,
    "level": 3,
    "atk": 1820,
    "def": 1240,
    "chemicalFormula": "H2SO4",
    "effectCode": "ELEM_B07_SULFURIC_ACID_CORR_74",
    "effectText": "Phân ly hoàn toàn proton H+: Gây sát thương xuyên giáp, nếu tấn công quái thú phòng thủ sẽ trừ thẳng chênh lệch vào LP đối phương.",
    "scientificLore": "Axit Sunfuric (H2SO4) là hóa chất cơ bản tuân theo thuyết điện ly Arrhenius / Bronsted-Lowry trong SGK Hóa học 11 GDPT 2018.",
    "relatedEquation": "H₂SO₄ → H⁺ + HSO₄⁻",
    "iupacName": "Sulfuric Acid",
    "archetype": "STRONG_ACID_CORROSION",
    "structuredEffects": [
      {
        "effectId": "B07_EFF_74",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "SELF"
            }
          }
        ],
        "description": "Tăng 300 ATK ăn mòn axit mạnh."
      }
    ]
  },
  {
    "id": "card_b07_075_nitric_acid_75",
    "name": "Axit Nitric — Chiến Binh Kiềm Hóa (HNO3 Nồng Độ 75)",
    "name_en": "Nitric Acid — Chiến Binh Kiềm Hóa Molarity 75",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "ACID_DARK",
    "manaCost": 3,
    "level": 4,
    "atk": 2060,
    "def": 1420,
    "chemicalFormula": "HNO3",
    "effectCode": "ELEM_B07_NITRIC_ACID_CORR_75",
    "effectText": "Phân ly hoàn toàn proton H+: Gây sát thương xuyên giáp, nếu tấn công quái thú phòng thủ sẽ trừ thẳng chênh lệch vào LP đối phương.",
    "scientificLore": "Axit Nitric (HNO3) là hóa chất cơ bản tuân theo thuyết điện ly Arrhenius / Bronsted-Lowry trong SGK Hóa học 11 GDPT 2018.",
    "relatedEquation": "HNO₃ → H⁺ + NO₃⁻",
    "iupacName": "Nitric Acid",
    "archetype": "STRONG_ACID_CORROSION",
    "structuredEffects": [
      {
        "effectId": "B07_EFF_75",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "SELF"
            }
          }
        ],
        "description": "Tăng 300 ATK ăn mòn axit mạnh."
      }
    ]
  },
  {
    "id": "card_b07_076_phosphoric_acid_76",
    "name": "Axit Photphoric — Chiến Binh Kiềm Hóa (H3PO4 Nồng Độ 76)",
    "name_en": "Phosphoric Acid — Chiến Binh Kiềm Hóa Molarity 76",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "ULTRA_RARE",
    "attribute": "ACID_DARK",
    "manaCost": 4,
    "level": 5,
    "atk": 2300,
    "def": 1600,
    "chemicalFormula": "H3PO4",
    "effectCode": "ELEM_B07_PHOSPHORIC_ACID_CORR_76",
    "effectText": "Phân ly hoàn toàn proton H+: Gây sát thương xuyên giáp, nếu tấn công quái thú phòng thủ sẽ trừ thẳng chênh lệch vào LP đối phương.",
    "scientificLore": "Axit Photphoric (H3PO4) là hóa chất cơ bản tuân theo thuyết điện ly Arrhenius / Bronsted-Lowry trong SGK Hóa học 11 GDPT 2018.",
    "relatedEquation": "H₃PO₄ ⇌ H⁺ + H₂PO₄⁻",
    "iupacName": "Phosphoric Acid",
    "archetype": "STRONG_ACID_CORROSION",
    "structuredEffects": [
      {
        "effectId": "B07_EFF_76",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "SELF"
            }
          }
        ],
        "description": "Tăng 300 ATK ăn mòn axit mạnh."
      }
    ]
  },
  {
    "id": "card_b07_077_acetic_acid_77",
    "name": "Axit Axetic — Chiến Binh Kiềm Hóa (CH3COOH Nồng Độ 77)",
    "name_en": "Acetic Acid — Chiến Binh Kiềm Hóa Molarity 77",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SECRET_RARE",
    "attribute": "AQUA",
    "manaCost": 5,
    "level": 6,
    "atk": 2540,
    "def": 1780,
    "chemicalFormula": "CH3COOH",
    "effectCode": "ELEM_B07_ACETIC_ACID_CORR_77",
    "effectText": "Phân ly hoàn toàn proton H+: Gây sát thương xuyên giáp, nếu tấn công quái thú phòng thủ sẽ trừ thẳng chênh lệch vào LP đối phương.",
    "scientificLore": "Axit Axetic (CH3COOH) là hóa chất cơ bản tuân theo thuyết điện ly Arrhenius / Bronsted-Lowry trong SGK Hóa học 11 GDPT 2018.",
    "relatedEquation": "CH₃COOH ⇌ H⁺ + CH₃COO⁻",
    "iupacName": "Acetic Acid",
    "archetype": "STRONG_ACID_CORROSION",
    "structuredEffects": [
      {
        "effectId": "B07_EFF_77",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "SELF"
            }
          }
        ],
        "description": "Tăng 300 ATK ăn mòn axit mạnh."
      }
    ]
  },
  {
    "id": "card_b07_078_sodium_hydroxide_78",
    "name": "Natri Hydroxit — Chiến Binh Kiềm Hóa (NaOH Nồng Độ 78)",
    "name_en": "Sodium Hydroxide — Chiến Binh Kiềm Hóa Molarity 78",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "TERRA",
    "manaCost": 5,
    "level": 7,
    "atk": 2250,
    "def": 2850,
    "chemicalFormula": "NaOH",
    "effectCode": "ELEM_B07_SODIUM_HYDROXIDE_CORR_78",
    "effectText": "Dung dịch kiềm xà phòng hóa: Giảm 300 ATK của quái thú đối phương khi chúng tuyên bố tấn công.",
    "scientificLore": "Natri Hydroxit (NaOH) là hóa chất cơ bản tuân theo thuyết điện ly Arrhenius / Bronsted-Lowry trong SGK Hóa học 11 GDPT 2018.",
    "relatedEquation": "NaOH → Na⁺ + OH⁻",
    "iupacName": "Sodium Hydroxide",
    "archetype": "BASE_HYDROXIDE",
    "structuredEffects": [
      {
        "effectId": "B07_EFF_78",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Giảm 300 ATK quái thú địch bằng bazơ."
      }
    ]
  },
  {
    "id": "card_b07_079_potassium_hydroxide_79",
    "name": "Kali Hydroxit — Chiến Binh Kiềm Hóa (KOH Nồng Độ 79)",
    "name_en": "Potassium Hydroxide — Chiến Binh Kiềm Hóa Molarity 79",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "TERRA",
    "manaCost": 1,
    "level": 2,
    "atk": 1250,
    "def": 1600,
    "chemicalFormula": "KOH",
    "effectCode": "ELEM_B07_POTASSIUM_HYDROXIDE_CORR_79",
    "effectText": "Dung dịch kiềm xà phòng hóa: Giảm 300 ATK của quái thú đối phương khi chúng tuyên bố tấn công.",
    "scientificLore": "Kali Hydroxit (KOH) là hóa chất cơ bản tuân theo thuyết điện ly Arrhenius / Bronsted-Lowry trong SGK Hóa học 11 GDPT 2018.",
    "relatedEquation": "KOH → K⁺ + OH⁻",
    "iupacName": "Potassium Hydroxide",
    "archetype": "BASE_HYDROXIDE",
    "structuredEffects": [
      {
        "effectId": "B07_EFF_79",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Giảm 300 ATK quái thú địch bằng bazơ."
      }
    ]
  },
  {
    "id": "card_b07_080_calcium_hydroxide_80",
    "name": "Canxi Hydroxit — Chiến Binh Kiềm Hóa (Ca(OH)2 Nồng Độ 80)",
    "name_en": "Calcium Hydroxide — Chiến Binh Kiềm Hóa Molarity 80",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "TERRA",
    "manaCost": 2,
    "level": 3,
    "atk": 1450,
    "def": 1850,
    "chemicalFormula": "Ca(OH)2",
    "effectCode": "ELEM_B07_CALCIUM_HYDROXIDE_CORR_80",
    "effectText": "Dung dịch kiềm xà phòng hóa: Giảm 300 ATK của quái thú đối phương khi chúng tuyên bố tấn công.",
    "scientificLore": "Canxi Hydroxit (Ca(OH)2) là hóa chất cơ bản tuân theo thuyết điện ly Arrhenius / Bronsted-Lowry trong SGK Hóa học 11 GDPT 2018.",
    "relatedEquation": "Ca(OH)₂ ⇌ Ca²⁺ + 2OH⁻",
    "iupacName": "Calcium Hydroxide",
    "archetype": "BASE_HYDROXIDE",
    "structuredEffects": [
      {
        "effectId": "B07_EFF_80",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Giảm 300 ATK quái thú địch bằng bazơ."
      }
    ]
  },
  {
    "id": "card_b07_081_barium_hydroxide_81",
    "name": "Bari Hydroxit — Chiến Binh Kiềm Hóa (Ba(OH)2 Nồng Độ 81)",
    "name_en": "Barium Hydroxide — Chiến Binh Kiềm Hóa Molarity 81",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "TERRA",
    "manaCost": 3,
    "level": 4,
    "atk": 1650,
    "def": 2100,
    "chemicalFormula": "Ba(OH)2",
    "effectCode": "ELEM_B07_BARIUM_HYDROXIDE_CORR_81",
    "effectText": "Dung dịch kiềm xà phòng hóa: Giảm 300 ATK của quái thú đối phương khi chúng tuyên bố tấn công.",
    "scientificLore": "Bari Hydroxit (Ba(OH)2) là hóa chất cơ bản tuân theo thuyết điện ly Arrhenius / Bronsted-Lowry trong SGK Hóa học 11 GDPT 2018.",
    "relatedEquation": "Ba(OH)₂ → Ba²⁺ + 2OH⁻",
    "iupacName": "Barium Hydroxide",
    "archetype": "BASE_HYDROXIDE",
    "structuredEffects": [
      {
        "effectId": "B07_EFF_81",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Giảm 300 ATK quái thú địch bằng bazơ."
      }
    ]
  },
  {
    "id": "card_b07_082_copper_sulfate_82",
    "name": "Đồng(II) Sunfat — Chiến Binh Kiềm Hóa (CuSO4 Nồng Độ 82)",
    "name_en": "Copper Sulfate — Chiến Binh Kiềm Hóa Molarity 82",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "ELECTRO",
    "manaCost": 4,
    "level": 5,
    "atk": 1850,
    "def": 2350,
    "chemicalFormula": "CuSO4",
    "effectCode": "ELEM_B07_COPPER_SULFATE_CORR_82",
    "effectText": "Dung dịch kiềm xà phòng hóa: Giảm 300 ATK của quái thú đối phương khi chúng tuyên bố tấn công.",
    "scientificLore": "Đồng(II) Sunfat (CuSO4) là hóa chất cơ bản tuân theo thuyết điện ly Arrhenius / Bronsted-Lowry trong SGK Hóa học 11 GDPT 2018.",
    "relatedEquation": "CuSO₄ → Cu²⁺ + SO₄²⁻",
    "iupacName": "Copper Sulfate",
    "archetype": "BASE_HYDROXIDE",
    "structuredEffects": [
      {
        "effectId": "B07_EFF_82",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Giảm 300 ATK quái thú địch bằng bazơ."
      }
    ]
  },
  {
    "id": "card_b07_083_iron_iii__chloride_83",
    "name": "Sắt(III) Clorua — Chiến Binh Kiềm Hóa (FeCl3 Nồng Độ 83)",
    "name_en": "Iron(III) Chloride — Chiến Binh Kiềm Hóa Molarity 83",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "TERRA",
    "manaCost": 5,
    "level": 6,
    "atk": 2050,
    "def": 2600,
    "chemicalFormula": "FeCl3",
    "effectCode": "ELEM_B07_IRON_III__CHLORIDE_CORR_83",
    "effectText": "Dung dịch kiềm xà phòng hóa: Giảm 300 ATK của quái thú đối phương khi chúng tuyên bố tấn công.",
    "scientificLore": "Sắt(III) Clorua (FeCl3) là hóa chất cơ bản tuân theo thuyết điện ly Arrhenius / Bronsted-Lowry trong SGK Hóa học 11 GDPT 2018.",
    "relatedEquation": "FeCl₃ → Fe³⁺ + 3Cl⁻",
    "iupacName": "Iron(III) Chloride",
    "archetype": "BASE_HYDROXIDE",
    "structuredEffects": [
      {
        "effectId": "B07_EFF_83",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Giảm 300 ATK quái thú địch bằng bazơ."
      }
    ]
  },
  {
    "id": "card_b07_084_aluminum_sulfate_84",
    "name": "Nhôm Sunfat — Chiến Binh Kiềm Hóa (Al2(SO4)3 Nồng Độ 84)",
    "name_en": "Aluminum Sulfate — Chiến Binh Kiềm Hóa Molarity 84",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "TERRA",
    "manaCost": 5,
    "level": 7,
    "atk": 2250,
    "def": 2850,
    "chemicalFormula": "Al2(SO4)3",
    "effectCode": "ELEM_B07_ALUMINUM_SULFATE_CORR_84",
    "effectText": "Dung dịch kiềm xà phòng hóa: Giảm 300 ATK của quái thú đối phương khi chúng tuyên bố tấn công.",
    "scientificLore": "Nhôm Sunfat (Al2(SO4)3) là hóa chất cơ bản tuân theo thuyết điện ly Arrhenius / Bronsted-Lowry trong SGK Hóa học 11 GDPT 2018.",
    "relatedEquation": "Al₂(SO₄)₃ → 2Al³⁺ + 3SO₄²⁻",
    "iupacName": "Aluminum Sulfate",
    "archetype": "BASE_HYDROXIDE",
    "structuredEffects": [
      {
        "effectId": "B07_EFF_84",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Giảm 300 ATK quái thú địch bằng bazơ."
      }
    ]
  },
  {
    "id": "card_b07_085_hydrochloric_acid_85",
    "name": "Axit Clohidric — Pháo Đài Muối Ion (HCl Nồng Độ 85)",
    "name_en": "Hydrochloric Acid — Pháo Đài Muối Ion Molarity 85",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "ULTRA_RARE",
    "attribute": "ACID_DARK",
    "manaCost": 1,
    "level": 2,
    "atk": 1580,
    "def": 1060,
    "chemicalFormula": "HCl",
    "effectCode": "ELEM_B07_HYDROCHLORIC_ACID_CORR_85",
    "effectText": "Phân ly hoàn toàn proton H+: Gây sát thương xuyên giáp, nếu tấn công quái thú phòng thủ sẽ trừ thẳng chênh lệch vào LP đối phương.",
    "scientificLore": "Axit Clohidric (HCl) là hóa chất cơ bản tuân theo thuyết điện ly Arrhenius / Bronsted-Lowry trong SGK Hóa học 11 GDPT 2018.",
    "relatedEquation": "HCl → H⁺ + Cl⁻",
    "iupacName": "Hydrochloric Acid",
    "archetype": "STRONG_ACID_CORROSION",
    "structuredEffects": [
      {
        "effectId": "B07_EFF_85",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "SELF"
            }
          }
        ],
        "description": "Tăng 300 ATK ăn mòn axit mạnh."
      }
    ]
  },
  {
    "id": "card_b07_086_sulfuric_acid_86",
    "name": "Axit Sunfuric — Pháo Đài Muối Ion (H2SO4 Nồng Độ 86)",
    "name_en": "Sulfuric Acid — Pháo Đài Muối Ion Molarity 86",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SECRET_RARE",
    "attribute": "ACID_DARK",
    "manaCost": 2,
    "level": 3,
    "atk": 1820,
    "def": 1240,
    "chemicalFormula": "H2SO4",
    "effectCode": "ELEM_B07_SULFURIC_ACID_CORR_86",
    "effectText": "Phân ly hoàn toàn proton H+: Gây sát thương xuyên giáp, nếu tấn công quái thú phòng thủ sẽ trừ thẳng chênh lệch vào LP đối phương.",
    "scientificLore": "Axit Sunfuric (H2SO4) là hóa chất cơ bản tuân theo thuyết điện ly Arrhenius / Bronsted-Lowry trong SGK Hóa học 11 GDPT 2018.",
    "relatedEquation": "H₂SO₄ → H⁺ + HSO₄⁻",
    "iupacName": "Sulfuric Acid",
    "archetype": "STRONG_ACID_CORROSION",
    "structuredEffects": [
      {
        "effectId": "B07_EFF_86",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "SELF"
            }
          }
        ],
        "description": "Tăng 300 ATK ăn mòn axit mạnh."
      }
    ]
  },
  {
    "id": "card_b07_087_nitric_acid_87",
    "name": "Axit Nitric — Pháo Đài Muối Ion (HNO3 Nồng Độ 87)",
    "name_en": "Nitric Acid — Pháo Đài Muối Ion Molarity 87",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "ACID_DARK",
    "manaCost": 3,
    "level": 4,
    "atk": 2060,
    "def": 1420,
    "chemicalFormula": "HNO3",
    "effectCode": "ELEM_B07_NITRIC_ACID_CORR_87",
    "effectText": "Phân ly hoàn toàn proton H+: Gây sát thương xuyên giáp, nếu tấn công quái thú phòng thủ sẽ trừ thẳng chênh lệch vào LP đối phương.",
    "scientificLore": "Axit Nitric (HNO3) là hóa chất cơ bản tuân theo thuyết điện ly Arrhenius / Bronsted-Lowry trong SGK Hóa học 11 GDPT 2018.",
    "relatedEquation": "HNO₃ → H⁺ + NO₃⁻",
    "iupacName": "Nitric Acid",
    "archetype": "STRONG_ACID_CORROSION",
    "structuredEffects": [
      {
        "effectId": "B07_EFF_87",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "SELF"
            }
          }
        ],
        "description": "Tăng 300 ATK ăn mòn axit mạnh."
      }
    ]
  },
  {
    "id": "card_b07_088_phosphoric_acid_88",
    "name": "Axit Photphoric — Pháo Đài Muối Ion (H3PO4 Nồng Độ 88)",
    "name_en": "Phosphoric Acid — Pháo Đài Muối Ion Molarity 88",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "ACID_DARK",
    "manaCost": 4,
    "level": 5,
    "atk": 2300,
    "def": 1600,
    "chemicalFormula": "H3PO4",
    "effectCode": "ELEM_B07_PHOSPHORIC_ACID_CORR_88",
    "effectText": "Phân ly hoàn toàn proton H+: Gây sát thương xuyên giáp, nếu tấn công quái thú phòng thủ sẽ trừ thẳng chênh lệch vào LP đối phương.",
    "scientificLore": "Axit Photphoric (H3PO4) là hóa chất cơ bản tuân theo thuyết điện ly Arrhenius / Bronsted-Lowry trong SGK Hóa học 11 GDPT 2018.",
    "relatedEquation": "H₃PO₄ ⇌ H⁺ + H₂PO₄⁻",
    "iupacName": "Phosphoric Acid",
    "archetype": "STRONG_ACID_CORROSION",
    "structuredEffects": [
      {
        "effectId": "B07_EFF_88",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "SELF"
            }
          }
        ],
        "description": "Tăng 300 ATK ăn mòn axit mạnh."
      }
    ]
  },
  {
    "id": "card_b07_089_acetic_acid_89",
    "name": "Axit Axetic — Pháo Đài Muối Ion (CH3COOH Nồng Độ 89)",
    "name_en": "Acetic Acid — Pháo Đài Muối Ion Molarity 89",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "AQUA",
    "manaCost": 5,
    "level": 6,
    "atk": 2540,
    "def": 1780,
    "chemicalFormula": "CH3COOH",
    "effectCode": "ELEM_B07_ACETIC_ACID_CORR_89",
    "effectText": "Phân ly hoàn toàn proton H+: Gây sát thương xuyên giáp, nếu tấn công quái thú phòng thủ sẽ trừ thẳng chênh lệch vào LP đối phương.",
    "scientificLore": "Axit Axetic (CH3COOH) là hóa chất cơ bản tuân theo thuyết điện ly Arrhenius / Bronsted-Lowry trong SGK Hóa học 11 GDPT 2018.",
    "relatedEquation": "CH₃COOH ⇌ H⁺ + CH₃COO⁻",
    "iupacName": "Acetic Acid",
    "archetype": "STRONG_ACID_CORROSION",
    "structuredEffects": [
      {
        "effectId": "B07_EFF_89",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "SELF"
            }
          }
        ],
        "description": "Tăng 300 ATK ăn mòn axit mạnh."
      }
    ]
  },
  {
    "id": "card_b07_090_sodium_hydroxide_90",
    "name": "Natri Hydroxit — Pháo Đài Muối Ion (NaOH Nồng Độ 90)",
    "name_en": "Sodium Hydroxide — Pháo Đài Muối Ion Molarity 90",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "TERRA",
    "manaCost": 5,
    "level": 7,
    "atk": 2250,
    "def": 2850,
    "chemicalFormula": "NaOH",
    "effectCode": "ELEM_B07_SODIUM_HYDROXIDE_CORR_90",
    "effectText": "Dung dịch kiềm xà phòng hóa: Giảm 300 ATK của quái thú đối phương khi chúng tuyên bố tấn công.",
    "scientificLore": "Natri Hydroxit (NaOH) là hóa chất cơ bản tuân theo thuyết điện ly Arrhenius / Bronsted-Lowry trong SGK Hóa học 11 GDPT 2018.",
    "relatedEquation": "NaOH → Na⁺ + OH⁻",
    "iupacName": "Sodium Hydroxide",
    "archetype": "BASE_HYDROXIDE",
    "structuredEffects": [
      {
        "effectId": "B07_EFF_90",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Giảm 300 ATK quái thú địch bằng bazơ."
      }
    ]
  },
  {
    "id": "card_b07_091_potassium_hydroxide_91",
    "name": "Kali Hydroxit — Pháo Đài Muối Ion (KOH Nồng Độ 91)",
    "name_en": "Potassium Hydroxide — Pháo Đài Muối Ion Molarity 91",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "TERRA",
    "manaCost": 1,
    "level": 2,
    "atk": 1250,
    "def": 1600,
    "chemicalFormula": "KOH",
    "effectCode": "ELEM_B07_POTASSIUM_HYDROXIDE_CORR_91",
    "effectText": "Dung dịch kiềm xà phòng hóa: Giảm 300 ATK của quái thú đối phương khi chúng tuyên bố tấn công.",
    "scientificLore": "Kali Hydroxit (KOH) là hóa chất cơ bản tuân theo thuyết điện ly Arrhenius / Bronsted-Lowry trong SGK Hóa học 11 GDPT 2018.",
    "relatedEquation": "KOH → K⁺ + OH⁻",
    "iupacName": "Potassium Hydroxide",
    "archetype": "BASE_HYDROXIDE",
    "structuredEffects": [
      {
        "effectId": "B07_EFF_91",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Giảm 300 ATK quái thú địch bằng bazơ."
      }
    ]
  },
  {
    "id": "card_b07_092_calcium_hydroxide_92",
    "name": "Canxi Hydroxit — Pháo Đài Muối Ion (Ca(OH)2 Nồng Độ 92)",
    "name_en": "Calcium Hydroxide — Pháo Đài Muối Ion Molarity 92",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "TERRA",
    "manaCost": 2,
    "level": 3,
    "atk": 1450,
    "def": 1850,
    "chemicalFormula": "Ca(OH)2",
    "effectCode": "ELEM_B07_CALCIUM_HYDROXIDE_CORR_92",
    "effectText": "Dung dịch kiềm xà phòng hóa: Giảm 300 ATK của quái thú đối phương khi chúng tuyên bố tấn công.",
    "scientificLore": "Canxi Hydroxit (Ca(OH)2) là hóa chất cơ bản tuân theo thuyết điện ly Arrhenius / Bronsted-Lowry trong SGK Hóa học 11 GDPT 2018.",
    "relatedEquation": "Ca(OH)₂ ⇌ Ca²⁺ + 2OH⁻",
    "iupacName": "Calcium Hydroxide",
    "archetype": "BASE_HYDROXIDE",
    "structuredEffects": [
      {
        "effectId": "B07_EFF_92",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Giảm 300 ATK quái thú địch bằng bazơ."
      }
    ]
  },
  {
    "id": "card_b07_093_barium_hydroxide_93",
    "name": "Bari Hydroxit — Pháo Đài Muối Ion (Ba(OH)2 Nồng Độ 93)",
    "name_en": "Barium Hydroxide — Pháo Đài Muối Ion Molarity 93",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "TERRA",
    "manaCost": 3,
    "level": 4,
    "atk": 1650,
    "def": 2100,
    "chemicalFormula": "Ba(OH)2",
    "effectCode": "ELEM_B07_BARIUM_HYDROXIDE_CORR_93",
    "effectText": "Dung dịch kiềm xà phòng hóa: Giảm 300 ATK của quái thú đối phương khi chúng tuyên bố tấn công.",
    "scientificLore": "Bari Hydroxit (Ba(OH)2) là hóa chất cơ bản tuân theo thuyết điện ly Arrhenius / Bronsted-Lowry trong SGK Hóa học 11 GDPT 2018.",
    "relatedEquation": "Ba(OH)₂ → Ba²⁺ + 2OH⁻",
    "iupacName": "Barium Hydroxide",
    "archetype": "BASE_HYDROXIDE",
    "structuredEffects": [
      {
        "effectId": "B07_EFF_93",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Giảm 300 ATK quái thú địch bằng bazơ."
      }
    ]
  },
  {
    "id": "card_b07_094_copper_sulfate_94",
    "name": "Đồng(II) Sunfat — Pháo Đài Muối Ion (CuSO4 Nồng Độ 94)",
    "name_en": "Copper Sulfate — Pháo Đài Muối Ion Molarity 94",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "ULTRA_RARE",
    "attribute": "ELECTRO",
    "manaCost": 4,
    "level": 5,
    "atk": 1850,
    "def": 2350,
    "chemicalFormula": "CuSO4",
    "effectCode": "ELEM_B07_COPPER_SULFATE_CORR_94",
    "effectText": "Dung dịch kiềm xà phòng hóa: Giảm 300 ATK của quái thú đối phương khi chúng tuyên bố tấn công.",
    "scientificLore": "Đồng(II) Sunfat (CuSO4) là hóa chất cơ bản tuân theo thuyết điện ly Arrhenius / Bronsted-Lowry trong SGK Hóa học 11 GDPT 2018.",
    "relatedEquation": "CuSO₄ → Cu²⁺ + SO₄²⁻",
    "iupacName": "Copper Sulfate",
    "archetype": "BASE_HYDROXIDE",
    "structuredEffects": [
      {
        "effectId": "B07_EFF_94",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Giảm 300 ATK quái thú địch bằng bazơ."
      }
    ]
  },
  {
    "id": "card_b07_095_iron_iii__chloride_95",
    "name": "Sắt(III) Clorua — Pháo Đài Muối Ion (FeCl3 Nồng Độ 95)",
    "name_en": "Iron(III) Chloride — Pháo Đài Muối Ion Molarity 95",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SECRET_RARE",
    "attribute": "TERRA",
    "manaCost": 5,
    "level": 6,
    "atk": 2050,
    "def": 2600,
    "chemicalFormula": "FeCl3",
    "effectCode": "ELEM_B07_IRON_III__CHLORIDE_CORR_95",
    "effectText": "Dung dịch kiềm xà phòng hóa: Giảm 300 ATK của quái thú đối phương khi chúng tuyên bố tấn công.",
    "scientificLore": "Sắt(III) Clorua (FeCl3) là hóa chất cơ bản tuân theo thuyết điện ly Arrhenius / Bronsted-Lowry trong SGK Hóa học 11 GDPT 2018.",
    "relatedEquation": "FeCl₃ → Fe³⁺ + 3Cl⁻",
    "iupacName": "Iron(III) Chloride",
    "archetype": "BASE_HYDROXIDE",
    "structuredEffects": [
      {
        "effectId": "B07_EFF_95",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Giảm 300 ATK quái thú địch bằng bazơ."
      }
    ]
  },
  {
    "id": "card_b07_096_aluminum_sulfate_96",
    "name": "Nhôm Sunfat — Pháo Đài Muối Ion (Al2(SO4)3 Nồng Độ 96)",
    "name_en": "Aluminum Sulfate — Pháo Đài Muối Ion Molarity 96",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "TERRA",
    "manaCost": 5,
    "level": 7,
    "atk": 2250,
    "def": 2850,
    "chemicalFormula": "Al2(SO4)3",
    "effectCode": "ELEM_B07_ALUMINUM_SULFATE_CORR_96",
    "effectText": "Dung dịch kiềm xà phòng hóa: Giảm 300 ATK của quái thú đối phương khi chúng tuyên bố tấn công.",
    "scientificLore": "Nhôm Sunfat (Al2(SO4)3) là hóa chất cơ bản tuân theo thuyết điện ly Arrhenius / Bronsted-Lowry trong SGK Hóa học 11 GDPT 2018.",
    "relatedEquation": "Al₂(SO₄)₃ → 2Al³⁺ + 3SO₄²⁻",
    "iupacName": "Aluminum Sulfate",
    "archetype": "BASE_HYDROXIDE",
    "structuredEffects": [
      {
        "effectId": "B07_EFF_96",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "ALL_ENEMIES"
            }
          }
        ],
        "description": "Giảm 300 ATK quái thú địch bằng bazơ."
      }
    ]
  },
  {
    "id": "card_b07_097_hydrochloric_acid_97",
    "name": "Axit Clohidric — Đao Phủ Axit (HCl Nồng Độ 97)",
    "name_en": "Hydrochloric Acid — Đao Phủ Axit Molarity 97",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "ACID_DARK",
    "manaCost": 1,
    "level": 2,
    "atk": 1580,
    "def": 1060,
    "chemicalFormula": "HCl",
    "effectCode": "ELEM_B07_HYDROCHLORIC_ACID_CORR_97",
    "effectText": "Phân ly hoàn toàn proton H+: Gây sát thương xuyên giáp, nếu tấn công quái thú phòng thủ sẽ trừ thẳng chênh lệch vào LP đối phương.",
    "scientificLore": "Axit Clohidric (HCl) là hóa chất cơ bản tuân theo thuyết điện ly Arrhenius / Bronsted-Lowry trong SGK Hóa học 11 GDPT 2018.",
    "relatedEquation": "HCl → H⁺ + Cl⁻",
    "iupacName": "Hydrochloric Acid",
    "archetype": "STRONG_ACID_CORROSION",
    "structuredEffects": [
      {
        "effectId": "B07_EFF_97",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "SELF"
            }
          }
        ],
        "description": "Tăng 300 ATK ăn mòn axit mạnh."
      }
    ]
  },
  {
    "id": "card_b07_098_sulfuric_acid_98",
    "name": "Axit Sunfuric — Đao Phủ Axit (H2SO4 Nồng Độ 98)",
    "name_en": "Sulfuric Acid — Đao Phủ Axit Molarity 98",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "ACID_DARK",
    "manaCost": 2,
    "level": 3,
    "atk": 1820,
    "def": 1240,
    "chemicalFormula": "H2SO4",
    "effectCode": "ELEM_B07_SULFURIC_ACID_CORR_98",
    "effectText": "Phân ly hoàn toàn proton H+: Gây sát thương xuyên giáp, nếu tấn công quái thú phòng thủ sẽ trừ thẳng chênh lệch vào LP đối phương.",
    "scientificLore": "Axit Sunfuric (H2SO4) là hóa chất cơ bản tuân theo thuyết điện ly Arrhenius / Bronsted-Lowry trong SGK Hóa học 11 GDPT 2018.",
    "relatedEquation": "H₂SO₄ → H⁺ + HSO₄⁻",
    "iupacName": "Sulfuric Acid",
    "archetype": "STRONG_ACID_CORROSION",
    "structuredEffects": [
      {
        "effectId": "B07_EFF_98",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "SELF"
            }
          }
        ],
        "description": "Tăng 300 ATK ăn mòn axit mạnh."
      }
    ]
  },
  {
    "id": "card_b07_099_nitric_acid_99",
    "name": "Axit Nitric — Đao Phủ Axit (HNO3 Nồng Độ 99)",
    "name_en": "Nitric Acid — Đao Phủ Axit Molarity 99",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "ACID_DARK",
    "manaCost": 3,
    "level": 4,
    "atk": 2060,
    "def": 1420,
    "chemicalFormula": "HNO3",
    "effectCode": "ELEM_B07_NITRIC_ACID_CORR_99",
    "effectText": "Phân ly hoàn toàn proton H+: Gây sát thương xuyên giáp, nếu tấn công quái thú phòng thủ sẽ trừ thẳng chênh lệch vào LP đối phương.",
    "scientificLore": "Axit Nitric (HNO3) là hóa chất cơ bản tuân theo thuyết điện ly Arrhenius / Bronsted-Lowry trong SGK Hóa học 11 GDPT 2018.",
    "relatedEquation": "HNO₃ → H⁺ + NO₃⁻",
    "iupacName": "Nitric Acid",
    "archetype": "STRONG_ACID_CORROSION",
    "structuredEffects": [
      {
        "effectId": "B07_EFF_99",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "SELF"
            }
          }
        ],
        "description": "Tăng 300 ATK ăn mòn axit mạnh."
      }
    ]
  },
  {
    "id": "card_b07_100_phosphoric_acid_100",
    "name": "Axit Photphoric — Đao Phủ Axit (H3PO4 Nồng Độ 100)",
    "name_en": "Phosphoric Acid — Đao Phủ Axit Molarity 100",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "ACID_DARK",
    "manaCost": 4,
    "level": 5,
    "atk": 2300,
    "def": 1600,
    "chemicalFormula": "H3PO4",
    "effectCode": "ELEM_B07_PHOSPHORIC_ACID_CORR_100",
    "effectText": "Phân ly hoàn toàn proton H+: Gây sát thương xuyên giáp, nếu tấn công quái thú phòng thủ sẽ trừ thẳng chênh lệch vào LP đối phương.",
    "scientificLore": "Axit Photphoric (H3PO4) là hóa chất cơ bản tuân theo thuyết điện ly Arrhenius / Bronsted-Lowry trong SGK Hóa học 11 GDPT 2018.",
    "relatedEquation": "H₃PO₄ ⇌ H⁺ + H₂PO₄⁻",
    "iupacName": "Phosphoric Acid",
    "archetype": "STRONG_ACID_CORROSION",
    "structuredEffects": [
      {
        "effectId": "B07_EFF_100",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 300,
              "statTarget": "ATK",
              "targetScope": "SELF"
            }
          }
        ],
        "description": "Tăng 300 ATK ăn mòn axit mạnh."
      }
    ]
  }
];
