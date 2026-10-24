// src/data/cards/batches/batch_01_monsters_main_alkali_earth.ts
// Batch 01: Alkali & Alkaline Earth Monsters (100 cards)
// Automatically generated and validated for ELEMENTA Tactical TCG

import { PlayableCardDef } from '../../../domain/cardGameTypes';

export const BATCH_01_CARDS: PlayableCardDef[] = [
  {
    "id": "card_b01_001_li_1",
    "name": "Liti — Chiến Binh Hydride (Dạng 1)",
    "name_en": "Lithium — Hydride Chiến Binh Mk-1",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "PYRO",
    "manaCost": 1,
    "level": 2,
    "atk": 1300,
    "def": 1000,
    "chemicalFormula": "LiH",
    "atomicNumber": 3,
    "effectCode": "ELEM_B01_LI_ACT_1",
    "effectText": "Khi được triệu hồi: Bộc phát năng lượng kiềm gây 250 LP sát thương trực tiếp lên đối thủ.",
    "scientificLore": "Liti (Li, Z=3) tạo hợp chất Hydride (LiH) phản ứng tỏa nhiệt đặc trưng theo chuẩn GDPT 2018.",
    "relatedEquation": "2Li + H₂ → 2LiH",
    "iupacName": "Lithium Hydride",
    "archetype": "ALKALI_BURST",
    "structuredEffects": [
      {
        "effectId": "B01_EFF_1",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Gây 300 LP bốc cháy kiềm."
      }
    ]
  },
  {
    "id": "card_b01_002_na_2",
    "name": "Natri — Chiến Binh Peroxide (Dạng 1)",
    "name_en": "Sodium — Peroxide Chiến Binh Mk-1",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "PYRO",
    "manaCost": 2,
    "level": 3,
    "atk": 1600,
    "def": 1300,
    "chemicalFormula": "Na2O2",
    "atomicNumber": 11,
    "effectCode": "ELEM_B01_NA_ACT_2",
    "effectText": "Khi được triệu hồi: Bộc phát năng lượng kiềm gây 300 LP sát thương trực tiếp lên đối thủ.",
    "scientificLore": "Natri (Na, Z=11) tạo hợp chất Peroxide (Na2O2) phản ứng tỏa nhiệt đặc trưng theo chuẩn GDPT 2018.",
    "relatedEquation": "2Na + O₂ → Na₂O₂",
    "iupacName": "Sodium Peroxide",
    "archetype": "ALKALI_BURST",
    "structuredEffects": [
      {
        "effectId": "B01_EFF_2",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Gây 300 LP bốc cháy kiềm."
      }
    ]
  },
  {
    "id": "card_b01_003_k_3",
    "name": "Kali — Chiến Binh Superoxide (Dạng 1)",
    "name_en": "Potassium — Superoxide Chiến Binh Mk-1",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "PYRO",
    "manaCost": 3,
    "level": 4,
    "atk": 1900,
    "def": 1600,
    "chemicalFormula": "KO2",
    "atomicNumber": 19,
    "effectCode": "ELEM_B01_K_ACT_3",
    "effectText": "Khi được triệu hồi: Bộc phát năng lượng kiềm gây 350 LP sát thương trực tiếp lên đối thủ.",
    "scientificLore": "Kali (K, Z=19) tạo hợp chất Superoxide (KO2) phản ứng tỏa nhiệt đặc trưng theo chuẩn GDPT 2018.",
    "relatedEquation": "K + O₂ → KO₂",
    "iupacName": "Potassium Superoxide",
    "archetype": "ALKALI_BURST",
    "structuredEffects": [
      {
        "effectId": "B01_EFF_3",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Gây 300 LP bốc cháy kiềm."
      }
    ]
  },
  {
    "id": "card_b01_004_rb_4",
    "name": "Rubidi — Chiến Binh Nitrate (Dạng 1)",
    "name_en": "Rubidium — Nitrate Chiến Binh Mk-1",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "PYRO",
    "manaCost": 4,
    "level": 5,
    "atk": 2200,
    "def": 1900,
    "chemicalFormula": "RbNO3",
    "atomicNumber": 37,
    "effectCode": "ELEM_B01_RB_ACT_4",
    "effectText": "Khi được triệu hồi: Bộc phát năng lượng kiềm gây 400 LP sát thương trực tiếp lên đối thủ.",
    "scientificLore": "Rubidi (Rb, Z=37) tạo hợp chất Nitrate (RbNO3) phản ứng tỏa nhiệt đặc trưng theo chuẩn GDPT 2018.",
    "relatedEquation": "Rb + HNO₃ → RbNO₃ + 1/2H₂",
    "iupacName": "Rubidium Nitrate",
    "archetype": "ALKALI_BURST",
    "structuredEffects": [
      {
        "effectId": "B01_EFF_4",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Gây 300 LP bốc cháy kiềm."
      }
    ]
  },
  {
    "id": "card_b01_005_cs_5",
    "name": "Caesi — Chiến Binh Chloride (Dạng 1)",
    "name_en": "Cesium — Chloride Chiến Binh Mk-1",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "PYRO",
    "manaCost": 5,
    "level": 6,
    "atk": 2500,
    "def": 2200,
    "chemicalFormula": "CsCl",
    "atomicNumber": 55,
    "effectCode": "ELEM_B01_CS_ACT_5",
    "effectText": "Khi được triệu hồi: Bộc phát năng lượng kiềm gây 450 LP sát thương trực tiếp lên đối thủ.",
    "scientificLore": "Caesi (Cs, Z=55) tạo hợp chất Chloride (CsCl) phản ứng tỏa nhiệt đặc trưng theo chuẩn GDPT 2018.",
    "relatedEquation": "2Cs + Cl₂ → 2CsCl",
    "iupacName": "Cesium Chloride",
    "archetype": "ALKALI_BURST",
    "structuredEffects": [
      {
        "effectId": "B01_EFF_5",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Gây 300 LP bốc cháy kiềm."
      }
    ]
  },
  {
    "id": "card_b01_006_fr_6",
    "name": "Franxi — Chiến Binh Radiate (Dạng 1)",
    "name_en": "Francium — Radiate Chiến Binh Mk-1",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "PYRO",
    "manaCost": 5,
    "level": 7,
    "atk": 2550,
    "def": 2250,
    "chemicalFormula": "FrF",
    "atomicNumber": 87,
    "effectCode": "ELEM_B01_FR_ACT_6",
    "effectText": "Khi được triệu hồi: Bộc phát năng lượng kiềm gây 250 LP sát thương trực tiếp lên đối thủ.",
    "scientificLore": "Franxi (Fr, Z=87) tạo hợp chất Radiate (FrF) phản ứng tỏa nhiệt đặc trưng theo chuẩn GDPT 2018.",
    "relatedEquation": "2Fr + F₂ → 2FrF",
    "iupacName": "Francium Radiate",
    "archetype": "ALKALI_BURST",
    "structuredEffects": [
      {
        "effectId": "B01_EFF_6",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Gây 300 LP bốc cháy kiềm."
      }
    ]
  },
  {
    "id": "card_b01_007_be_7",
    "name": "Beryli — Chiến Binh Hydroxide (Dạng 1)",
    "name_en": "Beryllium — Hydroxide Chiến Binh Mk-1",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "TERRA",
    "manaCost": 1,
    "level": 2,
    "atk": 1350,
    "def": 1650,
    "chemicalFormula": "Be(OH)2",
    "atomicNumber": 4,
    "effectCode": "ELEM_B01_BE_ACT_7",
    "effectText": "Khi ở tư thế Phòng thủ: Tăng 250 DEF cho bản thân. Nếu bị tấn công bởi quái thú có ATK thấp hơn, đối thủ nhận 200 LP phản chấn.",
    "scientificLore": "Beryli (Be, Z=4) tạo hợp chất Hydroxide (Be(OH)2) phản ứng tỏa nhiệt đặc trưng theo chuẩn GDPT 2018.",
    "relatedEquation": "BeO + H₂O → Be(OH)₂",
    "iupacName": "Beryllium Hydroxide",
    "archetype": "ALKALINE_EARTH_BASTION",
    "structuredEffects": [
      {
        "effectId": "B01_EFF_7",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "DEF",
              "targetScope": "SELF"
            }
          }
        ],
        "description": "Tăng 200 DEF khi phòng thủ."
      }
    ]
  },
  {
    "id": "card_b01_008_mg_8",
    "name": "Magie — Chiến Binh Oxide Ribbon (Dạng 1)",
    "name_en": "Magnesium — Oxide Ribbon Chiến Binh Mk-1",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "ULTRA_RARE",
    "attribute": "PYRO",
    "manaCost": 2,
    "level": 3,
    "atk": 1650,
    "def": 1950,
    "chemicalFormula": "MgO",
    "atomicNumber": 12,
    "effectCode": "ELEM_B01_MG_ACT_8",
    "effectText": "Khi ở tư thế Phòng thủ: Tăng 300 DEF cho bản thân. Nếu bị tấn công bởi quái thú có ATK thấp hơn, đối thủ nhận 300 LP phản chấn.",
    "scientificLore": "Magie (Mg, Z=12) tạo hợp chất Oxide Ribbon (MgO) phản ứng tỏa nhiệt đặc trưng theo chuẩn GDPT 2018.",
    "relatedEquation": "2Mg + O₂ → 2MgO",
    "iupacName": "Magnesium Oxide Ribbon",
    "archetype": "ALKALINE_EARTH_BASTION",
    "structuredEffects": [
      {
        "effectId": "B01_EFF_8",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "DEF",
              "targetScope": "SELF"
            }
          }
        ],
        "description": "Tăng 200 DEF khi phòng thủ."
      }
    ]
  },
  {
    "id": "card_b01_009_ca_9",
    "name": "Canxi — Chiến Binh Carbonate Calcite (Dạng 1)",
    "name_en": "Calcium — Carbonate Calcite Chiến Binh Mk-1",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SECRET_RARE",
    "attribute": "TERRA",
    "manaCost": 3,
    "level": 4,
    "atk": 1950,
    "def": 2250,
    "chemicalFormula": "CaCO3",
    "atomicNumber": 20,
    "effectCode": "ELEM_B01_CA_ACT_9",
    "effectText": "Khi ở tư thế Phòng thủ: Tăng 150 DEF cho bản thân. Nếu bị tấn công bởi quái thú có ATK thấp hơn, đối thủ nhận 400 LP phản chấn.",
    "scientificLore": "Canxi (Ca, Z=20) tạo hợp chất Carbonate Calcite (CaCO3) phản ứng tỏa nhiệt đặc trưng theo chuẩn GDPT 2018.",
    "relatedEquation": "CaO + CO₂ → CaCO₃",
    "iupacName": "Calcium Carbonate Calcite",
    "archetype": "ALKALINE_EARTH_BASTION",
    "structuredEffects": [
      {
        "effectId": "B01_EFF_9",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "DEF",
              "targetScope": "SELF"
            }
          }
        ],
        "description": "Tăng 200 DEF khi phòng thủ."
      }
    ]
  },
  {
    "id": "card_b01_010_sr_10",
    "name": "Stronti — Chiến Binh Carmine Sulfate (Dạng 1)",
    "name_en": "Strontium — Carmine Sulfate Chiến Binh Mk-1",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "PYRO",
    "manaCost": 4,
    "level": 5,
    "atk": 2250,
    "def": 2550,
    "chemicalFormula": "SrSO4",
    "atomicNumber": 38,
    "effectCode": "ELEM_B01_SR_ACT_10",
    "effectText": "Khi ở tư thế Phòng thủ: Tăng 200 DEF cho bản thân. Nếu bị tấn công bởi quái thú có ATK thấp hơn, đối thủ nhận 200 LP phản chấn.",
    "scientificLore": "Stronti (Sr, Z=38) tạo hợp chất Carmine Sulfate (SrSO4) phản ứng tỏa nhiệt đặc trưng theo chuẩn GDPT 2018.",
    "relatedEquation": "SrCl₂ + Na₂SO₄ → SrSO₄ + 2NaCl",
    "iupacName": "Strontium Carmine Sulfate",
    "archetype": "ALKALINE_EARTH_BASTION",
    "structuredEffects": [
      {
        "effectId": "B01_EFF_10",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "DEF",
              "targetScope": "SELF"
            }
          }
        ],
        "description": "Tăng 200 DEF khi phòng thủ."
      }
    ]
  },
  {
    "id": "card_b01_011_ba_11",
    "name": "Bari — Chiến Binh Heavy Spar (Dạng 1)",
    "name_en": "Barium — Heavy Spar Chiến Binh Mk-1",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "TERRA",
    "manaCost": 5,
    "level": 6,
    "atk": 2300,
    "def": 2600,
    "chemicalFormula": "BaSO4",
    "atomicNumber": 56,
    "effectCode": "ELEM_B01_BA_ACT_11",
    "effectText": "Khi ở tư thế Phòng thủ: Tăng 250 DEF cho bản thân. Nếu bị tấn công bởi quái thú có ATK thấp hơn, đối thủ nhận 300 LP phản chấn.",
    "scientificLore": "Bari (Ba, Z=56) tạo hợp chất Heavy Spar (BaSO4) phản ứng tỏa nhiệt đặc trưng theo chuẩn GDPT 2018.",
    "relatedEquation": "Ba(OH)₂ + H₂SO₄ → BaSO₄ + 2H₂O",
    "iupacName": "Barium Heavy Spar",
    "archetype": "ALKALINE_EARTH_BASTION",
    "structuredEffects": [
      {
        "effectId": "B01_EFF_11",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "DEF",
              "targetScope": "SELF"
            }
          }
        ],
        "description": "Tăng 200 DEF khi phòng thủ."
      }
    ]
  },
  {
    "id": "card_b01_012_ra_12",
    "name": "Radi — Chiến Binh Luminescent Bromide (Dạng 1)",
    "name_en": "Radium — Luminescent Bromide Chiến Binh Mk-1",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "TERRA",
    "manaCost": 5,
    "level": 7,
    "atk": 2600,
    "def": 2900,
    "chemicalFormula": "RaBr2",
    "atomicNumber": 88,
    "effectCode": "ELEM_B01_RA_ACT_12",
    "effectText": "Khi ở tư thế Phòng thủ: Tăng 300 DEF cho bản thân. Nếu bị tấn công bởi quái thú có ATK thấp hơn, đối thủ nhận 400 LP phản chấn.",
    "scientificLore": "Radi (Ra, Z=88) tạo hợp chất Luminescent Bromide (RaBr2) phản ứng tỏa nhiệt đặc trưng theo chuẩn GDPT 2018.",
    "relatedEquation": "Ra + Br₂ → RaBr₂",
    "iupacName": "Radium Luminescent Bromide",
    "archetype": "ALKALINE_EARTH_BASTION",
    "structuredEffects": [
      {
        "effectId": "B01_EFF_12",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "DEF",
              "targetScope": "SELF"
            }
          }
        ],
        "description": "Tăng 200 DEF khi phòng thủ."
      }
    ]
  },
  {
    "id": "card_b01_013_li_13",
    "name": "Liti — Vệ Binh Hydride (Dạng 2)",
    "name_en": "Lithium — Hydride Vệ Binh Mk-2",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "PYRO",
    "manaCost": 1,
    "level": 2,
    "atk": 1400,
    "def": 1100,
    "chemicalFormula": "LiH",
    "atomicNumber": 3,
    "effectCode": "ELEM_B01_LI_ACT_13",
    "effectText": "Khi được triệu hồi: Bộc phát năng lượng kiềm gây 350 LP sát thương trực tiếp lên đối thủ.",
    "scientificLore": "Liti (Li, Z=3) tạo hợp chất Hydride (LiH) phản ứng tỏa nhiệt đặc trưng theo chuẩn GDPT 2018.",
    "relatedEquation": "2Li + H₂ → 2LiH",
    "iupacName": "Lithium Hydride",
    "archetype": "ALKALI_BURST",
    "structuredEffects": [
      {
        "effectId": "B01_EFF_13",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Gây 300 LP bốc cháy kiềm."
      }
    ]
  },
  {
    "id": "card_b01_014_na_14",
    "name": "Natri — Vệ Binh Peroxide (Dạng 2)",
    "name_en": "Sodium — Peroxide Vệ Binh Mk-2",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "PYRO",
    "manaCost": 2,
    "level": 3,
    "atk": 1700,
    "def": 1400,
    "chemicalFormula": "Na2O2",
    "atomicNumber": 11,
    "effectCode": "ELEM_B01_NA_ACT_14",
    "effectText": "Khi được triệu hồi: Bộc phát năng lượng kiềm gây 400 LP sát thương trực tiếp lên đối thủ.",
    "scientificLore": "Natri (Na, Z=11) tạo hợp chất Peroxide (Na2O2) phản ứng tỏa nhiệt đặc trưng theo chuẩn GDPT 2018.",
    "relatedEquation": "2Na + O₂ → Na₂O₂",
    "iupacName": "Sodium Peroxide",
    "archetype": "ALKALI_BURST",
    "structuredEffects": [
      {
        "effectId": "B01_EFF_14",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Gây 300 LP bốc cháy kiềm."
      }
    ]
  },
  {
    "id": "card_b01_015_k_15",
    "name": "Kali — Vệ Binh Superoxide (Dạng 2)",
    "name_en": "Potassium — Superoxide Vệ Binh Mk-2",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "PYRO",
    "manaCost": 3,
    "level": 4,
    "atk": 2000,
    "def": 1700,
    "chemicalFormula": "KO2",
    "atomicNumber": 19,
    "effectCode": "ELEM_B01_K_ACT_15",
    "effectText": "Khi được triệu hồi: Bộc phát năng lượng kiềm gây 450 LP sát thương trực tiếp lên đối thủ.",
    "scientificLore": "Kali (K, Z=19) tạo hợp chất Superoxide (KO2) phản ứng tỏa nhiệt đặc trưng theo chuẩn GDPT 2018.",
    "relatedEquation": "K + O₂ → KO₂",
    "iupacName": "Potassium Superoxide",
    "archetype": "ALKALI_BURST",
    "structuredEffects": [
      {
        "effectId": "B01_EFF_15",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Gây 300 LP bốc cháy kiềm."
      }
    ]
  },
  {
    "id": "card_b01_016_rb_16",
    "name": "Rubidi — Vệ Binh Nitrate (Dạng 2)",
    "name_en": "Rubidium — Nitrate Vệ Binh Mk-2",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "PYRO",
    "manaCost": 4,
    "level": 5,
    "atk": 2050,
    "def": 1750,
    "chemicalFormula": "RbNO3",
    "atomicNumber": 37,
    "effectCode": "ELEM_B01_RB_ACT_16",
    "effectText": "Khi được triệu hồi: Bộc phát năng lượng kiềm gây 250 LP sát thương trực tiếp lên đối thủ.",
    "scientificLore": "Rubidi (Rb, Z=37) tạo hợp chất Nitrate (RbNO3) phản ứng tỏa nhiệt đặc trưng theo chuẩn GDPT 2018.",
    "relatedEquation": "Rb + HNO₃ → RbNO₃ + 1/2H₂",
    "iupacName": "Rubidium Nitrate",
    "archetype": "ALKALI_BURST",
    "structuredEffects": [
      {
        "effectId": "B01_EFF_16",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Gây 300 LP bốc cháy kiềm."
      }
    ]
  },
  {
    "id": "card_b01_017_cs_17",
    "name": "Caesi — Vệ Binh Chloride (Dạng 2)",
    "name_en": "Cesium — Chloride Vệ Binh Mk-2",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "ULTRA_RARE",
    "attribute": "PYRO",
    "manaCost": 5,
    "level": 6,
    "atk": 2350,
    "def": 2050,
    "chemicalFormula": "CsCl",
    "atomicNumber": 55,
    "effectCode": "ELEM_B01_CS_ACT_17",
    "effectText": "Khi được triệu hồi: Bộc phát năng lượng kiềm gây 300 LP sát thương trực tiếp lên đối thủ.",
    "scientificLore": "Caesi (Cs, Z=55) tạo hợp chất Chloride (CsCl) phản ứng tỏa nhiệt đặc trưng theo chuẩn GDPT 2018.",
    "relatedEquation": "2Cs + Cl₂ → 2CsCl",
    "iupacName": "Cesium Chloride",
    "archetype": "ALKALI_BURST",
    "structuredEffects": [
      {
        "effectId": "B01_EFF_17",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Gây 300 LP bốc cháy kiềm."
      }
    ]
  },
  {
    "id": "card_b01_018_fr_18",
    "name": "Franxi — Vệ Binh Radiate (Dạng 2)",
    "name_en": "Francium — Radiate Vệ Binh Mk-2",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SECRET_RARE",
    "attribute": "PYRO",
    "manaCost": 5,
    "level": 7,
    "atk": 2650,
    "def": 2350,
    "chemicalFormula": "FrF",
    "atomicNumber": 87,
    "effectCode": "ELEM_B01_FR_ACT_18",
    "effectText": "Khi được triệu hồi: Bộc phát năng lượng kiềm gây 350 LP sát thương trực tiếp lên đối thủ.",
    "scientificLore": "Franxi (Fr, Z=87) tạo hợp chất Radiate (FrF) phản ứng tỏa nhiệt đặc trưng theo chuẩn GDPT 2018.",
    "relatedEquation": "2Fr + F₂ → 2FrF",
    "iupacName": "Francium Radiate",
    "archetype": "ALKALI_BURST",
    "structuredEffects": [
      {
        "effectId": "B01_EFF_18",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Gây 300 LP bốc cháy kiềm."
      }
    ]
  },
  {
    "id": "card_b01_019_be_19",
    "name": "Beryli — Vệ Binh Hydroxide (Dạng 2)",
    "name_en": "Beryllium — Hydroxide Vệ Binh Mk-2",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "TERRA",
    "manaCost": 1,
    "level": 2,
    "atk": 1450,
    "def": 1750,
    "chemicalFormula": "Be(OH)2",
    "atomicNumber": 4,
    "effectCode": "ELEM_B01_BE_ACT_19",
    "effectText": "Khi ở tư thế Phòng thủ: Tăng 250 DEF cho bản thân. Nếu bị tấn công bởi quái thú có ATK thấp hơn, đối thủ nhận 200 LP phản chấn.",
    "scientificLore": "Beryli (Be, Z=4) tạo hợp chất Hydroxide (Be(OH)2) phản ứng tỏa nhiệt đặc trưng theo chuẩn GDPT 2018.",
    "relatedEquation": "BeO + H₂O → Be(OH)₂",
    "iupacName": "Beryllium Hydroxide",
    "archetype": "ALKALINE_EARTH_BASTION",
    "structuredEffects": [
      {
        "effectId": "B01_EFF_19",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "DEF",
              "targetScope": "SELF"
            }
          }
        ],
        "description": "Tăng 200 DEF khi phòng thủ."
      }
    ]
  },
  {
    "id": "card_b01_020_mg_20",
    "name": "Magie — Vệ Binh Oxide Ribbon (Dạng 2)",
    "name_en": "Magnesium — Oxide Ribbon Vệ Binh Mk-2",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "PYRO",
    "manaCost": 2,
    "level": 3,
    "atk": 1750,
    "def": 2050,
    "chemicalFormula": "MgO",
    "atomicNumber": 12,
    "effectCode": "ELEM_B01_MG_ACT_20",
    "effectText": "Khi ở tư thế Phòng thủ: Tăng 300 DEF cho bản thân. Nếu bị tấn công bởi quái thú có ATK thấp hơn, đối thủ nhận 300 LP phản chấn.",
    "scientificLore": "Magie (Mg, Z=12) tạo hợp chất Oxide Ribbon (MgO) phản ứng tỏa nhiệt đặc trưng theo chuẩn GDPT 2018.",
    "relatedEquation": "2Mg + O₂ → 2MgO",
    "iupacName": "Magnesium Oxide Ribbon",
    "archetype": "ALKALINE_EARTH_BASTION",
    "structuredEffects": [
      {
        "effectId": "B01_EFF_20",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "DEF",
              "targetScope": "SELF"
            }
          }
        ],
        "description": "Tăng 200 DEF khi phòng thủ."
      }
    ]
  },
  {
    "id": "card_b01_021_ca_21",
    "name": "Canxi — Vệ Binh Carbonate Calcite (Dạng 2)",
    "name_en": "Calcium — Carbonate Calcite Vệ Binh Mk-2",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "TERRA",
    "manaCost": 3,
    "level": 4,
    "atk": 1800,
    "def": 2100,
    "chemicalFormula": "CaCO3",
    "atomicNumber": 20,
    "effectCode": "ELEM_B01_CA_ACT_21",
    "effectText": "Khi ở tư thế Phòng thủ: Tăng 150 DEF cho bản thân. Nếu bị tấn công bởi quái thú có ATK thấp hơn, đối thủ nhận 400 LP phản chấn.",
    "scientificLore": "Canxi (Ca, Z=20) tạo hợp chất Carbonate Calcite (CaCO3) phản ứng tỏa nhiệt đặc trưng theo chuẩn GDPT 2018.",
    "relatedEquation": "CaO + CO₂ → CaCO₃",
    "iupacName": "Calcium Carbonate Calcite",
    "archetype": "ALKALINE_EARTH_BASTION",
    "structuredEffects": [
      {
        "effectId": "B01_EFF_21",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "DEF",
              "targetScope": "SELF"
            }
          }
        ],
        "description": "Tăng 200 DEF khi phòng thủ."
      }
    ]
  },
  {
    "id": "card_b01_022_sr_22",
    "name": "Stronti — Vệ Binh Carmine Sulfate (Dạng 2)",
    "name_en": "Strontium — Carmine Sulfate Vệ Binh Mk-2",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "PYRO",
    "manaCost": 4,
    "level": 5,
    "atk": 2100,
    "def": 2400,
    "chemicalFormula": "SrSO4",
    "atomicNumber": 38,
    "effectCode": "ELEM_B01_SR_ACT_22",
    "effectText": "Khi ở tư thế Phòng thủ: Tăng 200 DEF cho bản thân. Nếu bị tấn công bởi quái thú có ATK thấp hơn, đối thủ nhận 200 LP phản chấn.",
    "scientificLore": "Stronti (Sr, Z=38) tạo hợp chất Carmine Sulfate (SrSO4) phản ứng tỏa nhiệt đặc trưng theo chuẩn GDPT 2018.",
    "relatedEquation": "SrCl₂ + Na₂SO₄ → SrSO₄ + 2NaCl",
    "iupacName": "Strontium Carmine Sulfate",
    "archetype": "ALKALINE_EARTH_BASTION",
    "structuredEffects": [
      {
        "effectId": "B01_EFF_22",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "DEF",
              "targetScope": "SELF"
            }
          }
        ],
        "description": "Tăng 200 DEF khi phòng thủ."
      }
    ]
  },
  {
    "id": "card_b01_023_ba_23",
    "name": "Bari — Vệ Binh Heavy Spar (Dạng 2)",
    "name_en": "Barium — Heavy Spar Vệ Binh Mk-2",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "TERRA",
    "manaCost": 5,
    "level": 6,
    "atk": 2400,
    "def": 2700,
    "chemicalFormula": "BaSO4",
    "atomicNumber": 56,
    "effectCode": "ELEM_B01_BA_ACT_23",
    "effectText": "Khi ở tư thế Phòng thủ: Tăng 250 DEF cho bản thân. Nếu bị tấn công bởi quái thú có ATK thấp hơn, đối thủ nhận 300 LP phản chấn.",
    "scientificLore": "Bari (Ba, Z=56) tạo hợp chất Heavy Spar (BaSO4) phản ứng tỏa nhiệt đặc trưng theo chuẩn GDPT 2018.",
    "relatedEquation": "Ba(OH)₂ + H₂SO₄ → BaSO₄ + 2H₂O",
    "iupacName": "Barium Heavy Spar",
    "archetype": "ALKALINE_EARTH_BASTION",
    "structuredEffects": [
      {
        "effectId": "B01_EFF_23",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "DEF",
              "targetScope": "SELF"
            }
          }
        ],
        "description": "Tăng 200 DEF khi phòng thủ."
      }
    ]
  },
  {
    "id": "card_b01_024_ra_24",
    "name": "Radi — Vệ Binh Luminescent Bromide (Dạng 2)",
    "name_en": "Radium — Luminescent Bromide Vệ Binh Mk-2",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "TERRA",
    "manaCost": 5,
    "level": 7,
    "atk": 2700,
    "def": 3000,
    "chemicalFormula": "RaBr2",
    "atomicNumber": 88,
    "effectCode": "ELEM_B01_RA_ACT_24",
    "effectText": "Khi ở tư thế Phòng thủ: Tăng 300 DEF cho bản thân. Nếu bị tấn công bởi quái thú có ATK thấp hơn, đối thủ nhận 400 LP phản chấn.",
    "scientificLore": "Radi (Ra, Z=88) tạo hợp chất Luminescent Bromide (RaBr2) phản ứng tỏa nhiệt đặc trưng theo chuẩn GDPT 2018.",
    "relatedEquation": "Ra + Br₂ → RaBr₂",
    "iupacName": "Radium Luminescent Bromide",
    "archetype": "ALKALINE_EARTH_BASTION",
    "structuredEffects": [
      {
        "effectId": "B01_EFF_24",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "DEF",
              "targetScope": "SELF"
            }
          }
        ],
        "description": "Tăng 200 DEF khi phòng thủ."
      }
    ]
  },
  {
    "id": "card_b01_025_li_25",
    "name": "Liti — Hiệp Sĩ Hydride (Dạng 3)",
    "name_en": "Lithium — Hydride Hiệp Sĩ Mk-3",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "PYRO",
    "manaCost": 1,
    "level": 2,
    "atk": 1500,
    "def": 1200,
    "chemicalFormula": "LiH",
    "atomicNumber": 3,
    "effectCode": "ELEM_B01_LI_ACT_25",
    "effectText": "Khi được triệu hồi: Bộc phát năng lượng kiềm gây 450 LP sát thương trực tiếp lên đối thủ.",
    "scientificLore": "Liti (Li, Z=3) tạo hợp chất Hydride (LiH) phản ứng tỏa nhiệt đặc trưng theo chuẩn GDPT 2018.",
    "relatedEquation": "2Li + H₂ → 2LiH",
    "iupacName": "Lithium Hydride",
    "archetype": "ALKALI_BURST",
    "structuredEffects": [
      {
        "effectId": "B01_EFF_25",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Gây 300 LP bốc cháy kiềm."
      }
    ]
  },
  {
    "id": "card_b01_026_na_26",
    "name": "Natri — Hiệp Sĩ Peroxide (Dạng 3)",
    "name_en": "Sodium — Peroxide Hiệp Sĩ Mk-3",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "ULTRA_RARE",
    "attribute": "PYRO",
    "manaCost": 2,
    "level": 3,
    "atk": 1550,
    "def": 1250,
    "chemicalFormula": "Na2O2",
    "atomicNumber": 11,
    "effectCode": "ELEM_B01_NA_ACT_26",
    "effectText": "Khi được triệu hồi: Bộc phát năng lượng kiềm gây 250 LP sát thương trực tiếp lên đối thủ.",
    "scientificLore": "Natri (Na, Z=11) tạo hợp chất Peroxide (Na2O2) phản ứng tỏa nhiệt đặc trưng theo chuẩn GDPT 2018.",
    "relatedEquation": "2Na + O₂ → Na₂O₂",
    "iupacName": "Sodium Peroxide",
    "archetype": "ALKALI_BURST",
    "structuredEffects": [
      {
        "effectId": "B01_EFF_26",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Gây 300 LP bốc cháy kiềm."
      }
    ]
  },
  {
    "id": "card_b01_027_k_27",
    "name": "Kali — Hiệp Sĩ Superoxide (Dạng 3)",
    "name_en": "Potassium — Superoxide Hiệp Sĩ Mk-3",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SECRET_RARE",
    "attribute": "PYRO",
    "manaCost": 3,
    "level": 4,
    "atk": 1850,
    "def": 1550,
    "chemicalFormula": "KO2",
    "atomicNumber": 19,
    "effectCode": "ELEM_B01_K_ACT_27",
    "effectText": "Khi được triệu hồi: Bộc phát năng lượng kiềm gây 300 LP sát thương trực tiếp lên đối thủ.",
    "scientificLore": "Kali (K, Z=19) tạo hợp chất Superoxide (KO2) phản ứng tỏa nhiệt đặc trưng theo chuẩn GDPT 2018.",
    "relatedEquation": "K + O₂ → KO₂",
    "iupacName": "Potassium Superoxide",
    "archetype": "ALKALI_BURST",
    "structuredEffects": [
      {
        "effectId": "B01_EFF_27",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Gây 300 LP bốc cháy kiềm."
      }
    ]
  },
  {
    "id": "card_b01_028_rb_28",
    "name": "Rubidi — Hiệp Sĩ Nitrate (Dạng 3)",
    "name_en": "Rubidium — Nitrate Hiệp Sĩ Mk-3",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "PYRO",
    "manaCost": 4,
    "level": 5,
    "atk": 2150,
    "def": 1850,
    "chemicalFormula": "RbNO3",
    "atomicNumber": 37,
    "effectCode": "ELEM_B01_RB_ACT_28",
    "effectText": "Khi được triệu hồi: Bộc phát năng lượng kiềm gây 350 LP sát thương trực tiếp lên đối thủ.",
    "scientificLore": "Rubidi (Rb, Z=37) tạo hợp chất Nitrate (RbNO3) phản ứng tỏa nhiệt đặc trưng theo chuẩn GDPT 2018.",
    "relatedEquation": "Rb + HNO₃ → RbNO₃ + 1/2H₂",
    "iupacName": "Rubidium Nitrate",
    "archetype": "ALKALI_BURST",
    "structuredEffects": [
      {
        "effectId": "B01_EFF_28",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Gây 300 LP bốc cháy kiềm."
      }
    ]
  },
  {
    "id": "card_b01_029_cs_29",
    "name": "Caesi — Hiệp Sĩ Chloride (Dạng 3)",
    "name_en": "Cesium — Chloride Hiệp Sĩ Mk-3",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "PYRO",
    "manaCost": 5,
    "level": 6,
    "atk": 2450,
    "def": 2150,
    "chemicalFormula": "CsCl",
    "atomicNumber": 55,
    "effectCode": "ELEM_B01_CS_ACT_29",
    "effectText": "Khi được triệu hồi: Bộc phát năng lượng kiềm gây 400 LP sát thương trực tiếp lên đối thủ.",
    "scientificLore": "Caesi (Cs, Z=55) tạo hợp chất Chloride (CsCl) phản ứng tỏa nhiệt đặc trưng theo chuẩn GDPT 2018.",
    "relatedEquation": "2Cs + Cl₂ → 2CsCl",
    "iupacName": "Cesium Chloride",
    "archetype": "ALKALI_BURST",
    "structuredEffects": [
      {
        "effectId": "B01_EFF_29",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Gây 300 LP bốc cháy kiềm."
      }
    ]
  },
  {
    "id": "card_b01_030_fr_30",
    "name": "Franxi — Hiệp Sĩ Radiate (Dạng 3)",
    "name_en": "Francium — Radiate Hiệp Sĩ Mk-3",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "PYRO",
    "manaCost": 5,
    "level": 7,
    "atk": 2750,
    "def": 2450,
    "chemicalFormula": "FrF",
    "atomicNumber": 87,
    "effectCode": "ELEM_B01_FR_ACT_30",
    "effectText": "Khi được triệu hồi: Bộc phát năng lượng kiềm gây 450 LP sát thương trực tiếp lên đối thủ.",
    "scientificLore": "Franxi (Fr, Z=87) tạo hợp chất Radiate (FrF) phản ứng tỏa nhiệt đặc trưng theo chuẩn GDPT 2018.",
    "relatedEquation": "2Fr + F₂ → 2FrF",
    "iupacName": "Francium Radiate",
    "archetype": "ALKALI_BURST",
    "structuredEffects": [
      {
        "effectId": "B01_EFF_30",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Gây 300 LP bốc cháy kiềm."
      }
    ]
  },
  {
    "id": "card_b01_031_be_31",
    "name": "Beryli — Hiệp Sĩ Hydroxide (Dạng 3)",
    "name_en": "Beryllium — Hydroxide Hiệp Sĩ Mk-3",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "TERRA",
    "manaCost": 1,
    "level": 2,
    "atk": 1300,
    "def": 1600,
    "chemicalFormula": "Be(OH)2",
    "atomicNumber": 4,
    "effectCode": "ELEM_B01_BE_ACT_31",
    "effectText": "Khi ở tư thế Phòng thủ: Tăng 250 DEF cho bản thân. Nếu bị tấn công bởi quái thú có ATK thấp hơn, đối thủ nhận 200 LP phản chấn.",
    "scientificLore": "Beryli (Be, Z=4) tạo hợp chất Hydroxide (Be(OH)2) phản ứng tỏa nhiệt đặc trưng theo chuẩn GDPT 2018.",
    "relatedEquation": "BeO + H₂O → Be(OH)₂",
    "iupacName": "Beryllium Hydroxide",
    "archetype": "ALKALINE_EARTH_BASTION",
    "structuredEffects": [
      {
        "effectId": "B01_EFF_31",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "DEF",
              "targetScope": "SELF"
            }
          }
        ],
        "description": "Tăng 200 DEF khi phòng thủ."
      }
    ]
  },
  {
    "id": "card_b01_032_mg_32",
    "name": "Magie — Hiệp Sĩ Oxide Ribbon (Dạng 3)",
    "name_en": "Magnesium — Oxide Ribbon Hiệp Sĩ Mk-3",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "PYRO",
    "manaCost": 2,
    "level": 3,
    "atk": 1600,
    "def": 1900,
    "chemicalFormula": "MgO",
    "atomicNumber": 12,
    "effectCode": "ELEM_B01_MG_ACT_32",
    "effectText": "Khi ở tư thế Phòng thủ: Tăng 300 DEF cho bản thân. Nếu bị tấn công bởi quái thú có ATK thấp hơn, đối thủ nhận 300 LP phản chấn.",
    "scientificLore": "Magie (Mg, Z=12) tạo hợp chất Oxide Ribbon (MgO) phản ứng tỏa nhiệt đặc trưng theo chuẩn GDPT 2018.",
    "relatedEquation": "2Mg + O₂ → 2MgO",
    "iupacName": "Magnesium Oxide Ribbon",
    "archetype": "ALKALINE_EARTH_BASTION",
    "structuredEffects": [
      {
        "effectId": "B01_EFF_32",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "DEF",
              "targetScope": "SELF"
            }
          }
        ],
        "description": "Tăng 200 DEF khi phòng thủ."
      }
    ]
  },
  {
    "id": "card_b01_033_ca_33",
    "name": "Canxi — Hiệp Sĩ Carbonate Calcite (Dạng 3)",
    "name_en": "Calcium — Carbonate Calcite Hiệp Sĩ Mk-3",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "TERRA",
    "manaCost": 3,
    "level": 4,
    "atk": 1900,
    "def": 2200,
    "chemicalFormula": "CaCO3",
    "atomicNumber": 20,
    "effectCode": "ELEM_B01_CA_ACT_33",
    "effectText": "Khi ở tư thế Phòng thủ: Tăng 150 DEF cho bản thân. Nếu bị tấn công bởi quái thú có ATK thấp hơn, đối thủ nhận 400 LP phản chấn.",
    "scientificLore": "Canxi (Ca, Z=20) tạo hợp chất Carbonate Calcite (CaCO3) phản ứng tỏa nhiệt đặc trưng theo chuẩn GDPT 2018.",
    "relatedEquation": "CaO + CO₂ → CaCO₃",
    "iupacName": "Calcium Carbonate Calcite",
    "archetype": "ALKALINE_EARTH_BASTION",
    "structuredEffects": [
      {
        "effectId": "B01_EFF_33",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "DEF",
              "targetScope": "SELF"
            }
          }
        ],
        "description": "Tăng 200 DEF khi phòng thủ."
      }
    ]
  },
  {
    "id": "card_b01_034_sr_34",
    "name": "Stronti — Hiệp Sĩ Carmine Sulfate (Dạng 3)",
    "name_en": "Strontium — Carmine Sulfate Hiệp Sĩ Mk-3",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "PYRO",
    "manaCost": 4,
    "level": 5,
    "atk": 2200,
    "def": 2500,
    "chemicalFormula": "SrSO4",
    "atomicNumber": 38,
    "effectCode": "ELEM_B01_SR_ACT_34",
    "effectText": "Khi ở tư thế Phòng thủ: Tăng 200 DEF cho bản thân. Nếu bị tấn công bởi quái thú có ATK thấp hơn, đối thủ nhận 200 LP phản chấn.",
    "scientificLore": "Stronti (Sr, Z=38) tạo hợp chất Carmine Sulfate (SrSO4) phản ứng tỏa nhiệt đặc trưng theo chuẩn GDPT 2018.",
    "relatedEquation": "SrCl₂ + Na₂SO₄ → SrSO₄ + 2NaCl",
    "iupacName": "Strontium Carmine Sulfate",
    "archetype": "ALKALINE_EARTH_BASTION",
    "structuredEffects": [
      {
        "effectId": "B01_EFF_34",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "DEF",
              "targetScope": "SELF"
            }
          }
        ],
        "description": "Tăng 200 DEF khi phòng thủ."
      }
    ]
  },
  {
    "id": "card_b01_035_ba_35",
    "name": "Bari — Hiệp Sĩ Heavy Spar (Dạng 3)",
    "name_en": "Barium — Heavy Spar Hiệp Sĩ Mk-3",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "ULTRA_RARE",
    "attribute": "TERRA",
    "manaCost": 5,
    "level": 6,
    "atk": 2500,
    "def": 2800,
    "chemicalFormula": "BaSO4",
    "atomicNumber": 56,
    "effectCode": "ELEM_B01_BA_ACT_35",
    "effectText": "Khi ở tư thế Phòng thủ: Tăng 250 DEF cho bản thân. Nếu bị tấn công bởi quái thú có ATK thấp hơn, đối thủ nhận 300 LP phản chấn.",
    "scientificLore": "Bari (Ba, Z=56) tạo hợp chất Heavy Spar (BaSO4) phản ứng tỏa nhiệt đặc trưng theo chuẩn GDPT 2018.",
    "relatedEquation": "Ba(OH)₂ + H₂SO₄ → BaSO₄ + 2H₂O",
    "iupacName": "Barium Heavy Spar",
    "archetype": "ALKALINE_EARTH_BASTION",
    "structuredEffects": [
      {
        "effectId": "B01_EFF_35",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "DEF",
              "targetScope": "SELF"
            }
          }
        ],
        "description": "Tăng 200 DEF khi phòng thủ."
      }
    ]
  },
  {
    "id": "card_b01_036_ra_36",
    "name": "Radi — Hiệp Sĩ Luminescent Bromide (Dạng 3)",
    "name_en": "Radium — Luminescent Bromide Hiệp Sĩ Mk-3",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SECRET_RARE",
    "attribute": "TERRA",
    "manaCost": 5,
    "level": 7,
    "atk": 2550,
    "def": 2850,
    "chemicalFormula": "RaBr2",
    "atomicNumber": 88,
    "effectCode": "ELEM_B01_RA_ACT_36",
    "effectText": "Khi ở tư thế Phòng thủ: Tăng 300 DEF cho bản thân. Nếu bị tấn công bởi quái thú có ATK thấp hơn, đối thủ nhận 400 LP phản chấn.",
    "scientificLore": "Radi (Ra, Z=88) tạo hợp chất Luminescent Bromide (RaBr2) phản ứng tỏa nhiệt đặc trưng theo chuẩn GDPT 2018.",
    "relatedEquation": "Ra + Br₂ → RaBr₂",
    "iupacName": "Radium Luminescent Bromide",
    "archetype": "ALKALINE_EARTH_BASTION",
    "structuredEffects": [
      {
        "effectId": "B01_EFF_36",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "DEF",
              "targetScope": "SELF"
            }
          }
        ],
        "description": "Tăng 200 DEF khi phòng thủ."
      }
    ]
  },
  {
    "id": "card_b01_037_li_37",
    "name": "Liti — Đại Pháp Sư Hydride (Dạng 4)",
    "name_en": "Lithium — Hydride Đại Pháp Sư Mk-4",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "PYRO",
    "manaCost": 1,
    "level": 2,
    "atk": 1350,
    "def": 1050,
    "chemicalFormula": "LiH",
    "atomicNumber": 3,
    "effectCode": "ELEM_B01_LI_ACT_37",
    "effectText": "Khi được triệu hồi: Bộc phát năng lượng kiềm gây 300 LP sát thương trực tiếp lên đối thủ.",
    "scientificLore": "Liti (Li, Z=3) tạo hợp chất Hydride (LiH) phản ứng tỏa nhiệt đặc trưng theo chuẩn GDPT 2018.",
    "relatedEquation": "2Li + H₂ → 2LiH",
    "iupacName": "Lithium Hydride",
    "archetype": "ALKALI_BURST",
    "structuredEffects": [
      {
        "effectId": "B01_EFF_37",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Gây 300 LP bốc cháy kiềm."
      }
    ]
  },
  {
    "id": "card_b01_038_na_38",
    "name": "Natri — Đại Pháp Sư Peroxide (Dạng 4)",
    "name_en": "Sodium — Peroxide Đại Pháp Sư Mk-4",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "PYRO",
    "manaCost": 2,
    "level": 3,
    "atk": 1650,
    "def": 1350,
    "chemicalFormula": "Na2O2",
    "atomicNumber": 11,
    "effectCode": "ELEM_B01_NA_ACT_38",
    "effectText": "Khi được triệu hồi: Bộc phát năng lượng kiềm gây 350 LP sát thương trực tiếp lên đối thủ.",
    "scientificLore": "Natri (Na, Z=11) tạo hợp chất Peroxide (Na2O2) phản ứng tỏa nhiệt đặc trưng theo chuẩn GDPT 2018.",
    "relatedEquation": "2Na + O₂ → Na₂O₂",
    "iupacName": "Sodium Peroxide",
    "archetype": "ALKALI_BURST",
    "structuredEffects": [
      {
        "effectId": "B01_EFF_38",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Gây 300 LP bốc cháy kiềm."
      }
    ]
  },
  {
    "id": "card_b01_039_k_39",
    "name": "Kali — Đại Pháp Sư Superoxide (Dạng 4)",
    "name_en": "Potassium — Superoxide Đại Pháp Sư Mk-4",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "PYRO",
    "manaCost": 3,
    "level": 4,
    "atk": 1950,
    "def": 1650,
    "chemicalFormula": "KO2",
    "atomicNumber": 19,
    "effectCode": "ELEM_B01_K_ACT_39",
    "effectText": "Khi được triệu hồi: Bộc phát năng lượng kiềm gây 400 LP sát thương trực tiếp lên đối thủ.",
    "scientificLore": "Kali (K, Z=19) tạo hợp chất Superoxide (KO2) phản ứng tỏa nhiệt đặc trưng theo chuẩn GDPT 2018.",
    "relatedEquation": "K + O₂ → KO₂",
    "iupacName": "Potassium Superoxide",
    "archetype": "ALKALI_BURST",
    "structuredEffects": [
      {
        "effectId": "B01_EFF_39",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Gây 300 LP bốc cháy kiềm."
      }
    ]
  },
  {
    "id": "card_b01_040_rb_40",
    "name": "Rubidi — Đại Pháp Sư Nitrate (Dạng 4)",
    "name_en": "Rubidium — Nitrate Đại Pháp Sư Mk-4",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "PYRO",
    "manaCost": 4,
    "level": 5,
    "atk": 2250,
    "def": 1950,
    "chemicalFormula": "RbNO3",
    "atomicNumber": 37,
    "effectCode": "ELEM_B01_RB_ACT_40",
    "effectText": "Khi được triệu hồi: Bộc phát năng lượng kiềm gây 450 LP sát thương trực tiếp lên đối thủ.",
    "scientificLore": "Rubidi (Rb, Z=37) tạo hợp chất Nitrate (RbNO3) phản ứng tỏa nhiệt đặc trưng theo chuẩn GDPT 2018.",
    "relatedEquation": "Rb + HNO₃ → RbNO₃ + 1/2H₂",
    "iupacName": "Rubidium Nitrate",
    "archetype": "ALKALI_BURST",
    "structuredEffects": [
      {
        "effectId": "B01_EFF_40",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Gây 300 LP bốc cháy kiềm."
      }
    ]
  },
  {
    "id": "card_b01_041_cs_41",
    "name": "Caesi — Đại Pháp Sư Chloride (Dạng 4)",
    "name_en": "Cesium — Chloride Đại Pháp Sư Mk-4",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "PYRO",
    "manaCost": 5,
    "level": 6,
    "atk": 2300,
    "def": 2000,
    "chemicalFormula": "CsCl",
    "atomicNumber": 55,
    "effectCode": "ELEM_B01_CS_ACT_41",
    "effectText": "Khi được triệu hồi: Bộc phát năng lượng kiềm gây 250 LP sát thương trực tiếp lên đối thủ.",
    "scientificLore": "Caesi (Cs, Z=55) tạo hợp chất Chloride (CsCl) phản ứng tỏa nhiệt đặc trưng theo chuẩn GDPT 2018.",
    "relatedEquation": "2Cs + Cl₂ → 2CsCl",
    "iupacName": "Cesium Chloride",
    "archetype": "ALKALI_BURST",
    "structuredEffects": [
      {
        "effectId": "B01_EFF_41",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Gây 300 LP bốc cháy kiềm."
      }
    ]
  },
  {
    "id": "card_b01_042_fr_42",
    "name": "Franxi — Đại Pháp Sư Radiate (Dạng 4)",
    "name_en": "Francium — Radiate Đại Pháp Sư Mk-4",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "PYRO",
    "manaCost": 5,
    "level": 7,
    "atk": 2600,
    "def": 2300,
    "chemicalFormula": "FrF",
    "atomicNumber": 87,
    "effectCode": "ELEM_B01_FR_ACT_42",
    "effectText": "Khi được triệu hồi: Bộc phát năng lượng kiềm gây 300 LP sát thương trực tiếp lên đối thủ.",
    "scientificLore": "Franxi (Fr, Z=87) tạo hợp chất Radiate (FrF) phản ứng tỏa nhiệt đặc trưng theo chuẩn GDPT 2018.",
    "relatedEquation": "2Fr + F₂ → 2FrF",
    "iupacName": "Francium Radiate",
    "archetype": "ALKALI_BURST",
    "structuredEffects": [
      {
        "effectId": "B01_EFF_42",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Gây 300 LP bốc cháy kiềm."
      }
    ]
  },
  {
    "id": "card_b01_043_be_43",
    "name": "Beryli — Đại Pháp Sư Hydroxide (Dạng 4)",
    "name_en": "Beryllium — Hydroxide Đại Pháp Sư Mk-4",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "TERRA",
    "manaCost": 1,
    "level": 2,
    "atk": 1400,
    "def": 1700,
    "chemicalFormula": "Be(OH)2",
    "atomicNumber": 4,
    "effectCode": "ELEM_B01_BE_ACT_43",
    "effectText": "Khi ở tư thế Phòng thủ: Tăng 250 DEF cho bản thân. Nếu bị tấn công bởi quái thú có ATK thấp hơn, đối thủ nhận 200 LP phản chấn.",
    "scientificLore": "Beryli (Be, Z=4) tạo hợp chất Hydroxide (Be(OH)2) phản ứng tỏa nhiệt đặc trưng theo chuẩn GDPT 2018.",
    "relatedEquation": "BeO + H₂O → Be(OH)₂",
    "iupacName": "Beryllium Hydroxide",
    "archetype": "ALKALINE_EARTH_BASTION",
    "structuredEffects": [
      {
        "effectId": "B01_EFF_43",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "DEF",
              "targetScope": "SELF"
            }
          }
        ],
        "description": "Tăng 200 DEF khi phòng thủ."
      }
    ]
  },
  {
    "id": "card_b01_044_mg_44",
    "name": "Magie — Đại Pháp Sư Oxide Ribbon (Dạng 4)",
    "name_en": "Magnesium — Oxide Ribbon Đại Pháp Sư Mk-4",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "ULTRA_RARE",
    "attribute": "PYRO",
    "manaCost": 2,
    "level": 3,
    "atk": 1700,
    "def": 2000,
    "chemicalFormula": "MgO",
    "atomicNumber": 12,
    "effectCode": "ELEM_B01_MG_ACT_44",
    "effectText": "Khi ở tư thế Phòng thủ: Tăng 300 DEF cho bản thân. Nếu bị tấn công bởi quái thú có ATK thấp hơn, đối thủ nhận 300 LP phản chấn.",
    "scientificLore": "Magie (Mg, Z=12) tạo hợp chất Oxide Ribbon (MgO) phản ứng tỏa nhiệt đặc trưng theo chuẩn GDPT 2018.",
    "relatedEquation": "2Mg + O₂ → 2MgO",
    "iupacName": "Magnesium Oxide Ribbon",
    "archetype": "ALKALINE_EARTH_BASTION",
    "structuredEffects": [
      {
        "effectId": "B01_EFF_44",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "DEF",
              "targetScope": "SELF"
            }
          }
        ],
        "description": "Tăng 200 DEF khi phòng thủ."
      }
    ]
  },
  {
    "id": "card_b01_045_ca_45",
    "name": "Canxi — Đại Pháp Sư Carbonate Calcite (Dạng 4)",
    "name_en": "Calcium — Carbonate Calcite Đại Pháp Sư Mk-4",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SECRET_RARE",
    "attribute": "TERRA",
    "manaCost": 3,
    "level": 4,
    "atk": 2000,
    "def": 2300,
    "chemicalFormula": "CaCO3",
    "atomicNumber": 20,
    "effectCode": "ELEM_B01_CA_ACT_45",
    "effectText": "Khi ở tư thế Phòng thủ: Tăng 150 DEF cho bản thân. Nếu bị tấn công bởi quái thú có ATK thấp hơn, đối thủ nhận 400 LP phản chấn.",
    "scientificLore": "Canxi (Ca, Z=20) tạo hợp chất Carbonate Calcite (CaCO3) phản ứng tỏa nhiệt đặc trưng theo chuẩn GDPT 2018.",
    "relatedEquation": "CaO + CO₂ → CaCO₃",
    "iupacName": "Calcium Carbonate Calcite",
    "archetype": "ALKALINE_EARTH_BASTION",
    "structuredEffects": [
      {
        "effectId": "B01_EFF_45",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "DEF",
              "targetScope": "SELF"
            }
          }
        ],
        "description": "Tăng 200 DEF khi phòng thủ."
      }
    ]
  },
  {
    "id": "card_b01_046_sr_46",
    "name": "Stronti — Đại Pháp Sư Carmine Sulfate (Dạng 4)",
    "name_en": "Strontium — Carmine Sulfate Đại Pháp Sư Mk-4",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "PYRO",
    "manaCost": 4,
    "level": 5,
    "atk": 2050,
    "def": 2350,
    "chemicalFormula": "SrSO4",
    "atomicNumber": 38,
    "effectCode": "ELEM_B01_SR_ACT_46",
    "effectText": "Khi ở tư thế Phòng thủ: Tăng 200 DEF cho bản thân. Nếu bị tấn công bởi quái thú có ATK thấp hơn, đối thủ nhận 200 LP phản chấn.",
    "scientificLore": "Stronti (Sr, Z=38) tạo hợp chất Carmine Sulfate (SrSO4) phản ứng tỏa nhiệt đặc trưng theo chuẩn GDPT 2018.",
    "relatedEquation": "SrCl₂ + Na₂SO₄ → SrSO₄ + 2NaCl",
    "iupacName": "Strontium Carmine Sulfate",
    "archetype": "ALKALINE_EARTH_BASTION",
    "structuredEffects": [
      {
        "effectId": "B01_EFF_46",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "DEF",
              "targetScope": "SELF"
            }
          }
        ],
        "description": "Tăng 200 DEF khi phòng thủ."
      }
    ]
  },
  {
    "id": "card_b01_047_ba_47",
    "name": "Bari — Đại Pháp Sư Heavy Spar (Dạng 4)",
    "name_en": "Barium — Heavy Spar Đại Pháp Sư Mk-4",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "TERRA",
    "manaCost": 5,
    "level": 6,
    "atk": 2350,
    "def": 2650,
    "chemicalFormula": "BaSO4",
    "atomicNumber": 56,
    "effectCode": "ELEM_B01_BA_ACT_47",
    "effectText": "Khi ở tư thế Phòng thủ: Tăng 250 DEF cho bản thân. Nếu bị tấn công bởi quái thú có ATK thấp hơn, đối thủ nhận 300 LP phản chấn.",
    "scientificLore": "Bari (Ba, Z=56) tạo hợp chất Heavy Spar (BaSO4) phản ứng tỏa nhiệt đặc trưng theo chuẩn GDPT 2018.",
    "relatedEquation": "Ba(OH)₂ + H₂SO₄ → BaSO₄ + 2H₂O",
    "iupacName": "Barium Heavy Spar",
    "archetype": "ALKALINE_EARTH_BASTION",
    "structuredEffects": [
      {
        "effectId": "B01_EFF_47",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "DEF",
              "targetScope": "SELF"
            }
          }
        ],
        "description": "Tăng 200 DEF khi phòng thủ."
      }
    ]
  },
  {
    "id": "card_b01_048_ra_48",
    "name": "Radi — Đại Pháp Sư Luminescent Bromide (Dạng 4)",
    "name_en": "Radium — Luminescent Bromide Đại Pháp Sư Mk-4",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "TERRA",
    "manaCost": 5,
    "level": 7,
    "atk": 2650,
    "def": 2950,
    "chemicalFormula": "RaBr2",
    "atomicNumber": 88,
    "effectCode": "ELEM_B01_RA_ACT_48",
    "effectText": "Khi ở tư thế Phòng thủ: Tăng 300 DEF cho bản thân. Nếu bị tấn công bởi quái thú có ATK thấp hơn, đối thủ nhận 400 LP phản chấn.",
    "scientificLore": "Radi (Ra, Z=88) tạo hợp chất Luminescent Bromide (RaBr2) phản ứng tỏa nhiệt đặc trưng theo chuẩn GDPT 2018.",
    "relatedEquation": "Ra + Br₂ → RaBr₂",
    "iupacName": "Radium Luminescent Bromide",
    "archetype": "ALKALINE_EARTH_BASTION",
    "structuredEffects": [
      {
        "effectId": "B01_EFF_48",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "DEF",
              "targetScope": "SELF"
            }
          }
        ],
        "description": "Tăng 200 DEF khi phòng thủ."
      }
    ]
  },
  {
    "id": "card_b01_049_li_49",
    "name": "Liti — Lính Tiên Phong Hydride (Dạng 5)",
    "name_en": "Lithium — Hydride Lính Tiên Phong Mk-5",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "PYRO",
    "manaCost": 1,
    "level": 2,
    "atk": 1450,
    "def": 1150,
    "chemicalFormula": "LiH",
    "atomicNumber": 3,
    "effectCode": "ELEM_B01_LI_ACT_49",
    "effectText": "Khi được triệu hồi: Bộc phát năng lượng kiềm gây 400 LP sát thương trực tiếp lên đối thủ.",
    "scientificLore": "Liti (Li, Z=3) tạo hợp chất Hydride (LiH) phản ứng tỏa nhiệt đặc trưng theo chuẩn GDPT 2018.",
    "relatedEquation": "2Li + H₂ → 2LiH",
    "iupacName": "Lithium Hydride",
    "archetype": "ALKALI_BURST",
    "structuredEffects": [
      {
        "effectId": "B01_EFF_49",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Gây 300 LP bốc cháy kiềm."
      }
    ]
  },
  {
    "id": "card_b01_050_na_50",
    "name": "Natri — Lính Tiên Phong Peroxide (Dạng 5)",
    "name_en": "Sodium — Peroxide Lính Tiên Phong Mk-5",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "PYRO",
    "manaCost": 2,
    "level": 3,
    "atk": 1750,
    "def": 1450,
    "chemicalFormula": "Na2O2",
    "atomicNumber": 11,
    "effectCode": "ELEM_B01_NA_ACT_50",
    "effectText": "Khi được triệu hồi: Bộc phát năng lượng kiềm gây 450 LP sát thương trực tiếp lên đối thủ.",
    "scientificLore": "Natri (Na, Z=11) tạo hợp chất Peroxide (Na2O2) phản ứng tỏa nhiệt đặc trưng theo chuẩn GDPT 2018.",
    "relatedEquation": "2Na + O₂ → Na₂O₂",
    "iupacName": "Sodium Peroxide",
    "archetype": "ALKALI_BURST",
    "structuredEffects": [
      {
        "effectId": "B01_EFF_50",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Gây 300 LP bốc cháy kiềm."
      }
    ]
  },
  {
    "id": "card_b01_051_k_51",
    "name": "Kali — Lính Tiên Phong Superoxide (Dạng 5)",
    "name_en": "Potassium — Superoxide Lính Tiên Phong Mk-5",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "PYRO",
    "manaCost": 3,
    "level": 4,
    "atk": 1800,
    "def": 1500,
    "chemicalFormula": "KO2",
    "atomicNumber": 19,
    "effectCode": "ELEM_B01_K_ACT_51",
    "effectText": "Khi được triệu hồi: Bộc phát năng lượng kiềm gây 250 LP sát thương trực tiếp lên đối thủ.",
    "scientificLore": "Kali (K, Z=19) tạo hợp chất Superoxide (KO2) phản ứng tỏa nhiệt đặc trưng theo chuẩn GDPT 2018.",
    "relatedEquation": "K + O₂ → KO₂",
    "iupacName": "Potassium Superoxide",
    "archetype": "ALKALI_BURST",
    "structuredEffects": [
      {
        "effectId": "B01_EFF_51",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Gây 300 LP bốc cháy kiềm."
      }
    ]
  },
  {
    "id": "card_b01_052_rb_52",
    "name": "Rubidi — Lính Tiên Phong Nitrate (Dạng 5)",
    "name_en": "Rubidium — Nitrate Lính Tiên Phong Mk-5",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "PYRO",
    "manaCost": 4,
    "level": 5,
    "atk": 2100,
    "def": 1800,
    "chemicalFormula": "RbNO3",
    "atomicNumber": 37,
    "effectCode": "ELEM_B01_RB_ACT_52",
    "effectText": "Khi được triệu hồi: Bộc phát năng lượng kiềm gây 300 LP sát thương trực tiếp lên đối thủ.",
    "scientificLore": "Rubidi (Rb, Z=37) tạo hợp chất Nitrate (RbNO3) phản ứng tỏa nhiệt đặc trưng theo chuẩn GDPT 2018.",
    "relatedEquation": "Rb + HNO₃ → RbNO₃ + 1/2H₂",
    "iupacName": "Rubidium Nitrate",
    "archetype": "ALKALI_BURST",
    "structuredEffects": [
      {
        "effectId": "B01_EFF_52",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Gây 300 LP bốc cháy kiềm."
      }
    ]
  },
  {
    "id": "card_b01_053_cs_53",
    "name": "Caesi — Lính Tiên Phong Chloride (Dạng 5)",
    "name_en": "Cesium — Chloride Lính Tiên Phong Mk-5",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "ULTRA_RARE",
    "attribute": "PYRO",
    "manaCost": 5,
    "level": 6,
    "atk": 2400,
    "def": 2100,
    "chemicalFormula": "CsCl",
    "atomicNumber": 55,
    "effectCode": "ELEM_B01_CS_ACT_53",
    "effectText": "Khi được triệu hồi: Bộc phát năng lượng kiềm gây 350 LP sát thương trực tiếp lên đối thủ.",
    "scientificLore": "Caesi (Cs, Z=55) tạo hợp chất Chloride (CsCl) phản ứng tỏa nhiệt đặc trưng theo chuẩn GDPT 2018.",
    "relatedEquation": "2Cs + Cl₂ → 2CsCl",
    "iupacName": "Cesium Chloride",
    "archetype": "ALKALI_BURST",
    "structuredEffects": [
      {
        "effectId": "B01_EFF_53",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Gây 300 LP bốc cháy kiềm."
      }
    ]
  },
  {
    "id": "card_b01_054_fr_54",
    "name": "Franxi — Lính Tiên Phong Radiate (Dạng 5)",
    "name_en": "Francium — Radiate Lính Tiên Phong Mk-5",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SECRET_RARE",
    "attribute": "PYRO",
    "manaCost": 5,
    "level": 7,
    "atk": 2700,
    "def": 2400,
    "chemicalFormula": "FrF",
    "atomicNumber": 87,
    "effectCode": "ELEM_B01_FR_ACT_54",
    "effectText": "Khi được triệu hồi: Bộc phát năng lượng kiềm gây 400 LP sát thương trực tiếp lên đối thủ.",
    "scientificLore": "Franxi (Fr, Z=87) tạo hợp chất Radiate (FrF) phản ứng tỏa nhiệt đặc trưng theo chuẩn GDPT 2018.",
    "relatedEquation": "2Fr + F₂ → 2FrF",
    "iupacName": "Francium Radiate",
    "archetype": "ALKALI_BURST",
    "structuredEffects": [
      {
        "effectId": "B01_EFF_54",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Gây 300 LP bốc cháy kiềm."
      }
    ]
  },
  {
    "id": "card_b01_055_be_55",
    "name": "Beryli — Lính Tiên Phong Hydroxide (Dạng 5)",
    "name_en": "Beryllium — Hydroxide Lính Tiên Phong Mk-5",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "TERRA",
    "manaCost": 1,
    "level": 2,
    "atk": 1500,
    "def": 1800,
    "chemicalFormula": "Be(OH)2",
    "atomicNumber": 4,
    "effectCode": "ELEM_B01_BE_ACT_55",
    "effectText": "Khi ở tư thế Phòng thủ: Tăng 250 DEF cho bản thân. Nếu bị tấn công bởi quái thú có ATK thấp hơn, đối thủ nhận 200 LP phản chấn.",
    "scientificLore": "Beryli (Be, Z=4) tạo hợp chất Hydroxide (Be(OH)2) phản ứng tỏa nhiệt đặc trưng theo chuẩn GDPT 2018.",
    "relatedEquation": "BeO + H₂O → Be(OH)₂",
    "iupacName": "Beryllium Hydroxide",
    "archetype": "ALKALINE_EARTH_BASTION",
    "structuredEffects": [
      {
        "effectId": "B01_EFF_55",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "DEF",
              "targetScope": "SELF"
            }
          }
        ],
        "description": "Tăng 200 DEF khi phòng thủ."
      }
    ]
  },
  {
    "id": "card_b01_056_mg_56",
    "name": "Magie — Lính Tiên Phong Oxide Ribbon (Dạng 5)",
    "name_en": "Magnesium — Oxide Ribbon Lính Tiên Phong Mk-5",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "PYRO",
    "manaCost": 2,
    "level": 3,
    "atk": 1550,
    "def": 1850,
    "chemicalFormula": "MgO",
    "atomicNumber": 12,
    "effectCode": "ELEM_B01_MG_ACT_56",
    "effectText": "Khi ở tư thế Phòng thủ: Tăng 300 DEF cho bản thân. Nếu bị tấn công bởi quái thú có ATK thấp hơn, đối thủ nhận 300 LP phản chấn.",
    "scientificLore": "Magie (Mg, Z=12) tạo hợp chất Oxide Ribbon (MgO) phản ứng tỏa nhiệt đặc trưng theo chuẩn GDPT 2018.",
    "relatedEquation": "2Mg + O₂ → 2MgO",
    "iupacName": "Magnesium Oxide Ribbon",
    "archetype": "ALKALINE_EARTH_BASTION",
    "structuredEffects": [
      {
        "effectId": "B01_EFF_56",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "DEF",
              "targetScope": "SELF"
            }
          }
        ],
        "description": "Tăng 200 DEF khi phòng thủ."
      }
    ]
  },
  {
    "id": "card_b01_057_ca_57",
    "name": "Canxi — Lính Tiên Phong Carbonate Calcite (Dạng 5)",
    "name_en": "Calcium — Carbonate Calcite Lính Tiên Phong Mk-5",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "TERRA",
    "manaCost": 3,
    "level": 4,
    "atk": 1850,
    "def": 2150,
    "chemicalFormula": "CaCO3",
    "atomicNumber": 20,
    "effectCode": "ELEM_B01_CA_ACT_57",
    "effectText": "Khi ở tư thế Phòng thủ: Tăng 150 DEF cho bản thân. Nếu bị tấn công bởi quái thú có ATK thấp hơn, đối thủ nhận 400 LP phản chấn.",
    "scientificLore": "Canxi (Ca, Z=20) tạo hợp chất Carbonate Calcite (CaCO3) phản ứng tỏa nhiệt đặc trưng theo chuẩn GDPT 2018.",
    "relatedEquation": "CaO + CO₂ → CaCO₃",
    "iupacName": "Calcium Carbonate Calcite",
    "archetype": "ALKALINE_EARTH_BASTION",
    "structuredEffects": [
      {
        "effectId": "B01_EFF_57",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "DEF",
              "targetScope": "SELF"
            }
          }
        ],
        "description": "Tăng 200 DEF khi phòng thủ."
      }
    ]
  },
  {
    "id": "card_b01_058_sr_58",
    "name": "Stronti — Lính Tiên Phong Carmine Sulfate (Dạng 5)",
    "name_en": "Strontium — Carmine Sulfate Lính Tiên Phong Mk-5",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "PYRO",
    "manaCost": 4,
    "level": 5,
    "atk": 2150,
    "def": 2450,
    "chemicalFormula": "SrSO4",
    "atomicNumber": 38,
    "effectCode": "ELEM_B01_SR_ACT_58",
    "effectText": "Khi ở tư thế Phòng thủ: Tăng 200 DEF cho bản thân. Nếu bị tấn công bởi quái thú có ATK thấp hơn, đối thủ nhận 200 LP phản chấn.",
    "scientificLore": "Stronti (Sr, Z=38) tạo hợp chất Carmine Sulfate (SrSO4) phản ứng tỏa nhiệt đặc trưng theo chuẩn GDPT 2018.",
    "relatedEquation": "SrCl₂ + Na₂SO₄ → SrSO₄ + 2NaCl",
    "iupacName": "Strontium Carmine Sulfate",
    "archetype": "ALKALINE_EARTH_BASTION",
    "structuredEffects": [
      {
        "effectId": "B01_EFF_58",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "DEF",
              "targetScope": "SELF"
            }
          }
        ],
        "description": "Tăng 200 DEF khi phòng thủ."
      }
    ]
  },
  {
    "id": "card_b01_059_ba_59",
    "name": "Bari — Lính Tiên Phong Heavy Spar (Dạng 5)",
    "name_en": "Barium — Heavy Spar Lính Tiên Phong Mk-5",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "TERRA",
    "manaCost": 5,
    "level": 6,
    "atk": 2450,
    "def": 2750,
    "chemicalFormula": "BaSO4",
    "atomicNumber": 56,
    "effectCode": "ELEM_B01_BA_ACT_59",
    "effectText": "Khi ở tư thế Phòng thủ: Tăng 250 DEF cho bản thân. Nếu bị tấn công bởi quái thú có ATK thấp hơn, đối thủ nhận 300 LP phản chấn.",
    "scientificLore": "Bari (Ba, Z=56) tạo hợp chất Heavy Spar (BaSO4) phản ứng tỏa nhiệt đặc trưng theo chuẩn GDPT 2018.",
    "relatedEquation": "Ba(OH)₂ + H₂SO₄ → BaSO₄ + 2H₂O",
    "iupacName": "Barium Heavy Spar",
    "archetype": "ALKALINE_EARTH_BASTION",
    "structuredEffects": [
      {
        "effectId": "B01_EFF_59",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "DEF",
              "targetScope": "SELF"
            }
          }
        ],
        "description": "Tăng 200 DEF khi phòng thủ."
      }
    ]
  },
  {
    "id": "card_b01_060_ra_60",
    "name": "Radi — Lính Tiên Phong Luminescent Bromide (Dạng 5)",
    "name_en": "Radium — Luminescent Bromide Lính Tiên Phong Mk-5",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "TERRA",
    "manaCost": 5,
    "level": 7,
    "atk": 2750,
    "def": 3050,
    "chemicalFormula": "RaBr2",
    "atomicNumber": 88,
    "effectCode": "ELEM_B01_RA_ACT_60",
    "effectText": "Khi ở tư thế Phòng thủ: Tăng 300 DEF cho bản thân. Nếu bị tấn công bởi quái thú có ATK thấp hơn, đối thủ nhận 400 LP phản chấn.",
    "scientificLore": "Radi (Ra, Z=88) tạo hợp chất Luminescent Bromide (RaBr2) phản ứng tỏa nhiệt đặc trưng theo chuẩn GDPT 2018.",
    "relatedEquation": "Ra + Br₂ → RaBr₂",
    "iupacName": "Radium Luminescent Bromide",
    "archetype": "ALKALINE_EARTH_BASTION",
    "structuredEffects": [
      {
        "effectId": "B01_EFF_60",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "DEF",
              "targetScope": "SELF"
            }
          }
        ],
        "description": "Tăng 200 DEF khi phòng thủ."
      }
    ]
  },
  {
    "id": "card_b01_061_li_61",
    "name": "Liti — Thần Tượng Hydride (Dạng 6)",
    "name_en": "Lithium — Hydride Thần Tượng Mk-6",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "PYRO",
    "manaCost": 1,
    "level": 2,
    "atk": 1300,
    "def": 1000,
    "chemicalFormula": "LiH",
    "atomicNumber": 3,
    "effectCode": "ELEM_B01_LI_ACT_61",
    "effectText": "Khi được triệu hồi: Bộc phát năng lượng kiềm gây 250 LP sát thương trực tiếp lên đối thủ.",
    "scientificLore": "Liti (Li, Z=3) tạo hợp chất Hydride (LiH) phản ứng tỏa nhiệt đặc trưng theo chuẩn GDPT 2018.",
    "relatedEquation": "2Li + H₂ → 2LiH",
    "iupacName": "Lithium Hydride",
    "archetype": "ALKALI_BURST",
    "structuredEffects": [
      {
        "effectId": "B01_EFF_61",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Gây 300 LP bốc cháy kiềm."
      }
    ]
  },
  {
    "id": "card_b01_062_na_62",
    "name": "Natri — Thần Tượng Peroxide (Dạng 6)",
    "name_en": "Sodium — Peroxide Thần Tượng Mk-6",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "ULTRA_RARE",
    "attribute": "PYRO",
    "manaCost": 2,
    "level": 3,
    "atk": 1600,
    "def": 1300,
    "chemicalFormula": "Na2O2",
    "atomicNumber": 11,
    "effectCode": "ELEM_B01_NA_ACT_62",
    "effectText": "Khi được triệu hồi: Bộc phát năng lượng kiềm gây 300 LP sát thương trực tiếp lên đối thủ.",
    "scientificLore": "Natri (Na, Z=11) tạo hợp chất Peroxide (Na2O2) phản ứng tỏa nhiệt đặc trưng theo chuẩn GDPT 2018.",
    "relatedEquation": "2Na + O₂ → Na₂O₂",
    "iupacName": "Sodium Peroxide",
    "archetype": "ALKALI_BURST",
    "structuredEffects": [
      {
        "effectId": "B01_EFF_62",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Gây 300 LP bốc cháy kiềm."
      }
    ]
  },
  {
    "id": "card_b01_063_k_63",
    "name": "Kali — Thần Tượng Superoxide (Dạng 6)",
    "name_en": "Potassium — Superoxide Thần Tượng Mk-6",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SECRET_RARE",
    "attribute": "PYRO",
    "manaCost": 3,
    "level": 4,
    "atk": 1900,
    "def": 1600,
    "chemicalFormula": "KO2",
    "atomicNumber": 19,
    "effectCode": "ELEM_B01_K_ACT_63",
    "effectText": "Khi được triệu hồi: Bộc phát năng lượng kiềm gây 350 LP sát thương trực tiếp lên đối thủ.",
    "scientificLore": "Kali (K, Z=19) tạo hợp chất Superoxide (KO2) phản ứng tỏa nhiệt đặc trưng theo chuẩn GDPT 2018.",
    "relatedEquation": "K + O₂ → KO₂",
    "iupacName": "Potassium Superoxide",
    "archetype": "ALKALI_BURST",
    "structuredEffects": [
      {
        "effectId": "B01_EFF_63",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Gây 300 LP bốc cháy kiềm."
      }
    ]
  },
  {
    "id": "card_b01_064_rb_64",
    "name": "Rubidi — Thần Tượng Nitrate (Dạng 6)",
    "name_en": "Rubidium — Nitrate Thần Tượng Mk-6",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "PYRO",
    "manaCost": 4,
    "level": 5,
    "atk": 2200,
    "def": 1900,
    "chemicalFormula": "RbNO3",
    "atomicNumber": 37,
    "effectCode": "ELEM_B01_RB_ACT_64",
    "effectText": "Khi được triệu hồi: Bộc phát năng lượng kiềm gây 400 LP sát thương trực tiếp lên đối thủ.",
    "scientificLore": "Rubidi (Rb, Z=37) tạo hợp chất Nitrate (RbNO3) phản ứng tỏa nhiệt đặc trưng theo chuẩn GDPT 2018.",
    "relatedEquation": "Rb + HNO₃ → RbNO₃ + 1/2H₂",
    "iupacName": "Rubidium Nitrate",
    "archetype": "ALKALI_BURST",
    "structuredEffects": [
      {
        "effectId": "B01_EFF_64",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Gây 300 LP bốc cháy kiềm."
      }
    ]
  },
  {
    "id": "card_b01_065_cs_65",
    "name": "Caesi — Thần Tượng Chloride (Dạng 6)",
    "name_en": "Cesium — Chloride Thần Tượng Mk-6",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "PYRO",
    "manaCost": 5,
    "level": 6,
    "atk": 2500,
    "def": 2200,
    "chemicalFormula": "CsCl",
    "atomicNumber": 55,
    "effectCode": "ELEM_B01_CS_ACT_65",
    "effectText": "Khi được triệu hồi: Bộc phát năng lượng kiềm gây 450 LP sát thương trực tiếp lên đối thủ.",
    "scientificLore": "Caesi (Cs, Z=55) tạo hợp chất Chloride (CsCl) phản ứng tỏa nhiệt đặc trưng theo chuẩn GDPT 2018.",
    "relatedEquation": "2Cs + Cl₂ → 2CsCl",
    "iupacName": "Cesium Chloride",
    "archetype": "ALKALI_BURST",
    "structuredEffects": [
      {
        "effectId": "B01_EFF_65",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Gây 300 LP bốc cháy kiềm."
      }
    ]
  },
  {
    "id": "card_b01_066_fr_66",
    "name": "Franxi — Thần Tượng Radiate (Dạng 6)",
    "name_en": "Francium — Radiate Thần Tượng Mk-6",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "PYRO",
    "manaCost": 5,
    "level": 7,
    "atk": 2550,
    "def": 2250,
    "chemicalFormula": "FrF",
    "atomicNumber": 87,
    "effectCode": "ELEM_B01_FR_ACT_66",
    "effectText": "Khi được triệu hồi: Bộc phát năng lượng kiềm gây 250 LP sát thương trực tiếp lên đối thủ.",
    "scientificLore": "Franxi (Fr, Z=87) tạo hợp chất Radiate (FrF) phản ứng tỏa nhiệt đặc trưng theo chuẩn GDPT 2018.",
    "relatedEquation": "2Fr + F₂ → 2FrF",
    "iupacName": "Francium Radiate",
    "archetype": "ALKALI_BURST",
    "structuredEffects": [
      {
        "effectId": "B01_EFF_66",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Gây 300 LP bốc cháy kiềm."
      }
    ]
  },
  {
    "id": "card_b01_067_be_67",
    "name": "Beryli — Thần Tượng Hydroxide (Dạng 6)",
    "name_en": "Beryllium — Hydroxide Thần Tượng Mk-6",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "TERRA",
    "manaCost": 1,
    "level": 2,
    "atk": 1350,
    "def": 1650,
    "chemicalFormula": "Be(OH)2",
    "atomicNumber": 4,
    "effectCode": "ELEM_B01_BE_ACT_67",
    "effectText": "Khi ở tư thế Phòng thủ: Tăng 250 DEF cho bản thân. Nếu bị tấn công bởi quái thú có ATK thấp hơn, đối thủ nhận 200 LP phản chấn.",
    "scientificLore": "Beryli (Be, Z=4) tạo hợp chất Hydroxide (Be(OH)2) phản ứng tỏa nhiệt đặc trưng theo chuẩn GDPT 2018.",
    "relatedEquation": "BeO + H₂O → Be(OH)₂",
    "iupacName": "Beryllium Hydroxide",
    "archetype": "ALKALINE_EARTH_BASTION",
    "structuredEffects": [
      {
        "effectId": "B01_EFF_67",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "DEF",
              "targetScope": "SELF"
            }
          }
        ],
        "description": "Tăng 200 DEF khi phòng thủ."
      }
    ]
  },
  {
    "id": "card_b01_068_mg_68",
    "name": "Magie — Thần Tượng Oxide Ribbon (Dạng 6)",
    "name_en": "Magnesium — Oxide Ribbon Thần Tượng Mk-6",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "PYRO",
    "manaCost": 2,
    "level": 3,
    "atk": 1650,
    "def": 1950,
    "chemicalFormula": "MgO",
    "atomicNumber": 12,
    "effectCode": "ELEM_B01_MG_ACT_68",
    "effectText": "Khi ở tư thế Phòng thủ: Tăng 300 DEF cho bản thân. Nếu bị tấn công bởi quái thú có ATK thấp hơn, đối thủ nhận 300 LP phản chấn.",
    "scientificLore": "Magie (Mg, Z=12) tạo hợp chất Oxide Ribbon (MgO) phản ứng tỏa nhiệt đặc trưng theo chuẩn GDPT 2018.",
    "relatedEquation": "2Mg + O₂ → 2MgO",
    "iupacName": "Magnesium Oxide Ribbon",
    "archetype": "ALKALINE_EARTH_BASTION",
    "structuredEffects": [
      {
        "effectId": "B01_EFF_68",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "DEF",
              "targetScope": "SELF"
            }
          }
        ],
        "description": "Tăng 200 DEF khi phòng thủ."
      }
    ]
  },
  {
    "id": "card_b01_069_ca_69",
    "name": "Canxi — Thần Tượng Carbonate Calcite (Dạng 6)",
    "name_en": "Calcium — Carbonate Calcite Thần Tượng Mk-6",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "TERRA",
    "manaCost": 3,
    "level": 4,
    "atk": 1950,
    "def": 2250,
    "chemicalFormula": "CaCO3",
    "atomicNumber": 20,
    "effectCode": "ELEM_B01_CA_ACT_69",
    "effectText": "Khi ở tư thế Phòng thủ: Tăng 150 DEF cho bản thân. Nếu bị tấn công bởi quái thú có ATK thấp hơn, đối thủ nhận 400 LP phản chấn.",
    "scientificLore": "Canxi (Ca, Z=20) tạo hợp chất Carbonate Calcite (CaCO3) phản ứng tỏa nhiệt đặc trưng theo chuẩn GDPT 2018.",
    "relatedEquation": "CaO + CO₂ → CaCO₃",
    "iupacName": "Calcium Carbonate Calcite",
    "archetype": "ALKALINE_EARTH_BASTION",
    "structuredEffects": [
      {
        "effectId": "B01_EFF_69",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "DEF",
              "targetScope": "SELF"
            }
          }
        ],
        "description": "Tăng 200 DEF khi phòng thủ."
      }
    ]
  },
  {
    "id": "card_b01_070_sr_70",
    "name": "Stronti — Thần Tượng Carmine Sulfate (Dạng 6)",
    "name_en": "Strontium — Carmine Sulfate Thần Tượng Mk-6",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "PYRO",
    "manaCost": 4,
    "level": 5,
    "atk": 2250,
    "def": 2550,
    "chemicalFormula": "SrSO4",
    "atomicNumber": 38,
    "effectCode": "ELEM_B01_SR_ACT_70",
    "effectText": "Khi ở tư thế Phòng thủ: Tăng 200 DEF cho bản thân. Nếu bị tấn công bởi quái thú có ATK thấp hơn, đối thủ nhận 200 LP phản chấn.",
    "scientificLore": "Stronti (Sr, Z=38) tạo hợp chất Carmine Sulfate (SrSO4) phản ứng tỏa nhiệt đặc trưng theo chuẩn GDPT 2018.",
    "relatedEquation": "SrCl₂ + Na₂SO₄ → SrSO₄ + 2NaCl",
    "iupacName": "Strontium Carmine Sulfate",
    "archetype": "ALKALINE_EARTH_BASTION",
    "structuredEffects": [
      {
        "effectId": "B01_EFF_70",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "DEF",
              "targetScope": "SELF"
            }
          }
        ],
        "description": "Tăng 200 DEF khi phòng thủ."
      }
    ]
  },
  {
    "id": "card_b01_071_ba_71",
    "name": "Bari — Thần Tượng Heavy Spar (Dạng 6)",
    "name_en": "Barium — Heavy Spar Thần Tượng Mk-6",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "ULTRA_RARE",
    "attribute": "TERRA",
    "manaCost": 5,
    "level": 6,
    "atk": 2300,
    "def": 2600,
    "chemicalFormula": "BaSO4",
    "atomicNumber": 56,
    "effectCode": "ELEM_B01_BA_ACT_71",
    "effectText": "Khi ở tư thế Phòng thủ: Tăng 250 DEF cho bản thân. Nếu bị tấn công bởi quái thú có ATK thấp hơn, đối thủ nhận 300 LP phản chấn.",
    "scientificLore": "Bari (Ba, Z=56) tạo hợp chất Heavy Spar (BaSO4) phản ứng tỏa nhiệt đặc trưng theo chuẩn GDPT 2018.",
    "relatedEquation": "Ba(OH)₂ + H₂SO₄ → BaSO₄ + 2H₂O",
    "iupacName": "Barium Heavy Spar",
    "archetype": "ALKALINE_EARTH_BASTION",
    "structuredEffects": [
      {
        "effectId": "B01_EFF_71",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "DEF",
              "targetScope": "SELF"
            }
          }
        ],
        "description": "Tăng 200 DEF khi phòng thủ."
      }
    ]
  },
  {
    "id": "card_b01_072_ra_72",
    "name": "Radi — Thần Tượng Luminescent Bromide (Dạng 6)",
    "name_en": "Radium — Luminescent Bromide Thần Tượng Mk-6",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SECRET_RARE",
    "attribute": "TERRA",
    "manaCost": 5,
    "level": 7,
    "atk": 2600,
    "def": 2900,
    "chemicalFormula": "RaBr2",
    "atomicNumber": 88,
    "effectCode": "ELEM_B01_RA_ACT_72",
    "effectText": "Khi ở tư thế Phòng thủ: Tăng 300 DEF cho bản thân. Nếu bị tấn công bởi quái thú có ATK thấp hơn, đối thủ nhận 400 LP phản chấn.",
    "scientificLore": "Radi (Ra, Z=88) tạo hợp chất Luminescent Bromide (RaBr2) phản ứng tỏa nhiệt đặc trưng theo chuẩn GDPT 2018.",
    "relatedEquation": "Ra + Br₂ → RaBr₂",
    "iupacName": "Radium Luminescent Bromide",
    "archetype": "ALKALINE_EARTH_BASTION",
    "structuredEffects": [
      {
        "effectId": "B01_EFF_72",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "DEF",
              "targetScope": "SELF"
            }
          }
        ],
        "description": "Tăng 200 DEF khi phòng thủ."
      }
    ]
  },
  {
    "id": "card_b01_073_li_73",
    "name": "Liti — Pháo Thủ Hydride (Dạng 7)",
    "name_en": "Lithium — Hydride Pháo Thủ Mk-7",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "PYRO",
    "manaCost": 1,
    "level": 2,
    "atk": 1400,
    "def": 1100,
    "chemicalFormula": "LiH",
    "atomicNumber": 3,
    "effectCode": "ELEM_B01_LI_ACT_73",
    "effectText": "Khi được triệu hồi: Bộc phát năng lượng kiềm gây 350 LP sát thương trực tiếp lên đối thủ.",
    "scientificLore": "Liti (Li, Z=3) tạo hợp chất Hydride (LiH) phản ứng tỏa nhiệt đặc trưng theo chuẩn GDPT 2018.",
    "relatedEquation": "2Li + H₂ → 2LiH",
    "iupacName": "Lithium Hydride",
    "archetype": "ALKALI_BURST",
    "structuredEffects": [
      {
        "effectId": "B01_EFF_73",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Gây 300 LP bốc cháy kiềm."
      }
    ]
  },
  {
    "id": "card_b01_074_na_74",
    "name": "Natri — Pháo Thủ Peroxide (Dạng 7)",
    "name_en": "Sodium — Peroxide Pháo Thủ Mk-7",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "PYRO",
    "manaCost": 2,
    "level": 3,
    "atk": 1700,
    "def": 1400,
    "chemicalFormula": "Na2O2",
    "atomicNumber": 11,
    "effectCode": "ELEM_B01_NA_ACT_74",
    "effectText": "Khi được triệu hồi: Bộc phát năng lượng kiềm gây 400 LP sát thương trực tiếp lên đối thủ.",
    "scientificLore": "Natri (Na, Z=11) tạo hợp chất Peroxide (Na2O2) phản ứng tỏa nhiệt đặc trưng theo chuẩn GDPT 2018.",
    "relatedEquation": "2Na + O₂ → Na₂O₂",
    "iupacName": "Sodium Peroxide",
    "archetype": "ALKALI_BURST",
    "structuredEffects": [
      {
        "effectId": "B01_EFF_74",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Gây 300 LP bốc cháy kiềm."
      }
    ]
  },
  {
    "id": "card_b01_075_k_75",
    "name": "Kali — Pháo Thủ Superoxide (Dạng 7)",
    "name_en": "Potassium — Superoxide Pháo Thủ Mk-7",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "PYRO",
    "manaCost": 3,
    "level": 4,
    "atk": 2000,
    "def": 1700,
    "chemicalFormula": "KO2",
    "atomicNumber": 19,
    "effectCode": "ELEM_B01_K_ACT_75",
    "effectText": "Khi được triệu hồi: Bộc phát năng lượng kiềm gây 450 LP sát thương trực tiếp lên đối thủ.",
    "scientificLore": "Kali (K, Z=19) tạo hợp chất Superoxide (KO2) phản ứng tỏa nhiệt đặc trưng theo chuẩn GDPT 2018.",
    "relatedEquation": "K + O₂ → KO₂",
    "iupacName": "Potassium Superoxide",
    "archetype": "ALKALI_BURST",
    "structuredEffects": [
      {
        "effectId": "B01_EFF_75",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Gây 300 LP bốc cháy kiềm."
      }
    ]
  },
  {
    "id": "card_b01_076_rb_76",
    "name": "Rubidi — Pháo Thủ Nitrate (Dạng 7)",
    "name_en": "Rubidium — Nitrate Pháo Thủ Mk-7",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "PYRO",
    "manaCost": 4,
    "level": 5,
    "atk": 2050,
    "def": 1750,
    "chemicalFormula": "RbNO3",
    "atomicNumber": 37,
    "effectCode": "ELEM_B01_RB_ACT_76",
    "effectText": "Khi được triệu hồi: Bộc phát năng lượng kiềm gây 250 LP sát thương trực tiếp lên đối thủ.",
    "scientificLore": "Rubidi (Rb, Z=37) tạo hợp chất Nitrate (RbNO3) phản ứng tỏa nhiệt đặc trưng theo chuẩn GDPT 2018.",
    "relatedEquation": "Rb + HNO₃ → RbNO₃ + 1/2H₂",
    "iupacName": "Rubidium Nitrate",
    "archetype": "ALKALI_BURST",
    "structuredEffects": [
      {
        "effectId": "B01_EFF_76",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Gây 300 LP bốc cháy kiềm."
      }
    ]
  },
  {
    "id": "card_b01_077_cs_77",
    "name": "Caesi — Pháo Thủ Chloride (Dạng 7)",
    "name_en": "Cesium — Chloride Pháo Thủ Mk-7",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "PYRO",
    "manaCost": 5,
    "level": 6,
    "atk": 2350,
    "def": 2050,
    "chemicalFormula": "CsCl",
    "atomicNumber": 55,
    "effectCode": "ELEM_B01_CS_ACT_77",
    "effectText": "Khi được triệu hồi: Bộc phát năng lượng kiềm gây 300 LP sát thương trực tiếp lên đối thủ.",
    "scientificLore": "Caesi (Cs, Z=55) tạo hợp chất Chloride (CsCl) phản ứng tỏa nhiệt đặc trưng theo chuẩn GDPT 2018.",
    "relatedEquation": "2Cs + Cl₂ → 2CsCl",
    "iupacName": "Cesium Chloride",
    "archetype": "ALKALI_BURST",
    "structuredEffects": [
      {
        "effectId": "B01_EFF_77",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Gây 300 LP bốc cháy kiềm."
      }
    ]
  },
  {
    "id": "card_b01_078_fr_78",
    "name": "Franxi — Pháo Thủ Radiate (Dạng 7)",
    "name_en": "Francium — Radiate Pháo Thủ Mk-7",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "PYRO",
    "manaCost": 5,
    "level": 7,
    "atk": 2650,
    "def": 2350,
    "chemicalFormula": "FrF",
    "atomicNumber": 87,
    "effectCode": "ELEM_B01_FR_ACT_78",
    "effectText": "Khi được triệu hồi: Bộc phát năng lượng kiềm gây 350 LP sát thương trực tiếp lên đối thủ.",
    "scientificLore": "Franxi (Fr, Z=87) tạo hợp chất Radiate (FrF) phản ứng tỏa nhiệt đặc trưng theo chuẩn GDPT 2018.",
    "relatedEquation": "2Fr + F₂ → 2FrF",
    "iupacName": "Francium Radiate",
    "archetype": "ALKALI_BURST",
    "structuredEffects": [
      {
        "effectId": "B01_EFF_78",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Gây 300 LP bốc cháy kiềm."
      }
    ]
  },
  {
    "id": "card_b01_079_be_79",
    "name": "Beryli — Pháo Thủ Hydroxide (Dạng 7)",
    "name_en": "Beryllium — Hydroxide Pháo Thủ Mk-7",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "TERRA",
    "manaCost": 1,
    "level": 2,
    "atk": 1450,
    "def": 1750,
    "chemicalFormula": "Be(OH)2",
    "atomicNumber": 4,
    "effectCode": "ELEM_B01_BE_ACT_79",
    "effectText": "Khi ở tư thế Phòng thủ: Tăng 250 DEF cho bản thân. Nếu bị tấn công bởi quái thú có ATK thấp hơn, đối thủ nhận 200 LP phản chấn.",
    "scientificLore": "Beryli (Be, Z=4) tạo hợp chất Hydroxide (Be(OH)2) phản ứng tỏa nhiệt đặc trưng theo chuẩn GDPT 2018.",
    "relatedEquation": "BeO + H₂O → Be(OH)₂",
    "iupacName": "Beryllium Hydroxide",
    "archetype": "ALKALINE_EARTH_BASTION",
    "structuredEffects": [
      {
        "effectId": "B01_EFF_79",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "DEF",
              "targetScope": "SELF"
            }
          }
        ],
        "description": "Tăng 200 DEF khi phòng thủ."
      }
    ]
  },
  {
    "id": "card_b01_080_mg_80",
    "name": "Magie — Pháo Thủ Oxide Ribbon (Dạng 7)",
    "name_en": "Magnesium — Oxide Ribbon Pháo Thủ Mk-7",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "ULTRA_RARE",
    "attribute": "PYRO",
    "manaCost": 2,
    "level": 3,
    "atk": 1750,
    "def": 2050,
    "chemicalFormula": "MgO",
    "atomicNumber": 12,
    "effectCode": "ELEM_B01_MG_ACT_80",
    "effectText": "Khi ở tư thế Phòng thủ: Tăng 300 DEF cho bản thân. Nếu bị tấn công bởi quái thú có ATK thấp hơn, đối thủ nhận 300 LP phản chấn.",
    "scientificLore": "Magie (Mg, Z=12) tạo hợp chất Oxide Ribbon (MgO) phản ứng tỏa nhiệt đặc trưng theo chuẩn GDPT 2018.",
    "relatedEquation": "2Mg + O₂ → 2MgO",
    "iupacName": "Magnesium Oxide Ribbon",
    "archetype": "ALKALINE_EARTH_BASTION",
    "structuredEffects": [
      {
        "effectId": "B01_EFF_80",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "DEF",
              "targetScope": "SELF"
            }
          }
        ],
        "description": "Tăng 200 DEF khi phòng thủ."
      }
    ]
  },
  {
    "id": "card_b01_081_ca_81",
    "name": "Canxi — Pháo Thủ Carbonate Calcite (Dạng 7)",
    "name_en": "Calcium — Carbonate Calcite Pháo Thủ Mk-7",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SECRET_RARE",
    "attribute": "TERRA",
    "manaCost": 3,
    "level": 4,
    "atk": 1800,
    "def": 2100,
    "chemicalFormula": "CaCO3",
    "atomicNumber": 20,
    "effectCode": "ELEM_B01_CA_ACT_81",
    "effectText": "Khi ở tư thế Phòng thủ: Tăng 150 DEF cho bản thân. Nếu bị tấn công bởi quái thú có ATK thấp hơn, đối thủ nhận 400 LP phản chấn.",
    "scientificLore": "Canxi (Ca, Z=20) tạo hợp chất Carbonate Calcite (CaCO3) phản ứng tỏa nhiệt đặc trưng theo chuẩn GDPT 2018.",
    "relatedEquation": "CaO + CO₂ → CaCO₃",
    "iupacName": "Calcium Carbonate Calcite",
    "archetype": "ALKALINE_EARTH_BASTION",
    "structuredEffects": [
      {
        "effectId": "B01_EFF_81",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "DEF",
              "targetScope": "SELF"
            }
          }
        ],
        "description": "Tăng 200 DEF khi phòng thủ."
      }
    ]
  },
  {
    "id": "card_b01_082_sr_82",
    "name": "Stronti — Pháo Thủ Carmine Sulfate (Dạng 7)",
    "name_en": "Strontium — Carmine Sulfate Pháo Thủ Mk-7",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "PYRO",
    "manaCost": 4,
    "level": 5,
    "atk": 2100,
    "def": 2400,
    "chemicalFormula": "SrSO4",
    "atomicNumber": 38,
    "effectCode": "ELEM_B01_SR_ACT_82",
    "effectText": "Khi ở tư thế Phòng thủ: Tăng 200 DEF cho bản thân. Nếu bị tấn công bởi quái thú có ATK thấp hơn, đối thủ nhận 200 LP phản chấn.",
    "scientificLore": "Stronti (Sr, Z=38) tạo hợp chất Carmine Sulfate (SrSO4) phản ứng tỏa nhiệt đặc trưng theo chuẩn GDPT 2018.",
    "relatedEquation": "SrCl₂ + Na₂SO₄ → SrSO₄ + 2NaCl",
    "iupacName": "Strontium Carmine Sulfate",
    "archetype": "ALKALINE_EARTH_BASTION",
    "structuredEffects": [
      {
        "effectId": "B01_EFF_82",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "DEF",
              "targetScope": "SELF"
            }
          }
        ],
        "description": "Tăng 200 DEF khi phòng thủ."
      }
    ]
  },
  {
    "id": "card_b01_083_ba_83",
    "name": "Bari — Pháo Thủ Heavy Spar (Dạng 7)",
    "name_en": "Barium — Heavy Spar Pháo Thủ Mk-7",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "TERRA",
    "manaCost": 5,
    "level": 6,
    "atk": 2400,
    "def": 2700,
    "chemicalFormula": "BaSO4",
    "atomicNumber": 56,
    "effectCode": "ELEM_B01_BA_ACT_83",
    "effectText": "Khi ở tư thế Phòng thủ: Tăng 250 DEF cho bản thân. Nếu bị tấn công bởi quái thú có ATK thấp hơn, đối thủ nhận 300 LP phản chấn.",
    "scientificLore": "Bari (Ba, Z=56) tạo hợp chất Heavy Spar (BaSO4) phản ứng tỏa nhiệt đặc trưng theo chuẩn GDPT 2018.",
    "relatedEquation": "Ba(OH)₂ + H₂SO₄ → BaSO₄ + 2H₂O",
    "iupacName": "Barium Heavy Spar",
    "archetype": "ALKALINE_EARTH_BASTION",
    "structuredEffects": [
      {
        "effectId": "B01_EFF_83",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "DEF",
              "targetScope": "SELF"
            }
          }
        ],
        "description": "Tăng 200 DEF khi phòng thủ."
      }
    ]
  },
  {
    "id": "card_b01_084_ra_84",
    "name": "Radi — Pháo Thủ Luminescent Bromide (Dạng 7)",
    "name_en": "Radium — Luminescent Bromide Pháo Thủ Mk-7",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "TERRA",
    "manaCost": 5,
    "level": 7,
    "atk": 2700,
    "def": 3000,
    "chemicalFormula": "RaBr2",
    "atomicNumber": 88,
    "effectCode": "ELEM_B01_RA_ACT_84",
    "effectText": "Khi ở tư thế Phòng thủ: Tăng 300 DEF cho bản thân. Nếu bị tấn công bởi quái thú có ATK thấp hơn, đối thủ nhận 400 LP phản chấn.",
    "scientificLore": "Radi (Ra, Z=88) tạo hợp chất Luminescent Bromide (RaBr2) phản ứng tỏa nhiệt đặc trưng theo chuẩn GDPT 2018.",
    "relatedEquation": "Ra + Br₂ → RaBr₂",
    "iupacName": "Radium Luminescent Bromide",
    "archetype": "ALKALINE_EARTH_BASTION",
    "structuredEffects": [
      {
        "effectId": "B01_EFF_84",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "DEF",
              "targetScope": "SELF"
            }
          }
        ],
        "description": "Tăng 200 DEF khi phòng thủ."
      }
    ]
  },
  {
    "id": "card_b01_085_li_85",
    "name": "Liti — Kiếm Vũ Hydride (Dạng 8)",
    "name_en": "Lithium — Hydride Kiếm Vũ Mk-8",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "PYRO",
    "manaCost": 1,
    "level": 2,
    "atk": 1500,
    "def": 1200,
    "chemicalFormula": "LiH",
    "atomicNumber": 3,
    "effectCode": "ELEM_B01_LI_ACT_85",
    "effectText": "Khi được triệu hồi: Bộc phát năng lượng kiềm gây 450 LP sát thương trực tiếp lên đối thủ.",
    "scientificLore": "Liti (Li, Z=3) tạo hợp chất Hydride (LiH) phản ứng tỏa nhiệt đặc trưng theo chuẩn GDPT 2018.",
    "relatedEquation": "2Li + H₂ → 2LiH",
    "iupacName": "Lithium Hydride",
    "archetype": "ALKALI_BURST",
    "structuredEffects": [
      {
        "effectId": "B01_EFF_85",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Gây 300 LP bốc cháy kiềm."
      }
    ]
  },
  {
    "id": "card_b01_086_na_86",
    "name": "Natri — Kiếm Vũ Peroxide (Dạng 8)",
    "name_en": "Sodium — Peroxide Kiếm Vũ Mk-8",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "PYRO",
    "manaCost": 2,
    "level": 3,
    "atk": 1550,
    "def": 1250,
    "chemicalFormula": "Na2O2",
    "atomicNumber": 11,
    "effectCode": "ELEM_B01_NA_ACT_86",
    "effectText": "Khi được triệu hồi: Bộc phát năng lượng kiềm gây 250 LP sát thương trực tiếp lên đối thủ.",
    "scientificLore": "Natri (Na, Z=11) tạo hợp chất Peroxide (Na2O2) phản ứng tỏa nhiệt đặc trưng theo chuẩn GDPT 2018.",
    "relatedEquation": "2Na + O₂ → Na₂O₂",
    "iupacName": "Sodium Peroxide",
    "archetype": "ALKALI_BURST",
    "structuredEffects": [
      {
        "effectId": "B01_EFF_86",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Gây 300 LP bốc cháy kiềm."
      }
    ]
  },
  {
    "id": "card_b01_087_k_87",
    "name": "Kali — Kiếm Vũ Superoxide (Dạng 8)",
    "name_en": "Potassium — Superoxide Kiếm Vũ Mk-8",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "PYRO",
    "manaCost": 3,
    "level": 4,
    "atk": 1850,
    "def": 1550,
    "chemicalFormula": "KO2",
    "atomicNumber": 19,
    "effectCode": "ELEM_B01_K_ACT_87",
    "effectText": "Khi được triệu hồi: Bộc phát năng lượng kiềm gây 300 LP sát thương trực tiếp lên đối thủ.",
    "scientificLore": "Kali (K, Z=19) tạo hợp chất Superoxide (KO2) phản ứng tỏa nhiệt đặc trưng theo chuẩn GDPT 2018.",
    "relatedEquation": "K + O₂ → KO₂",
    "iupacName": "Potassium Superoxide",
    "archetype": "ALKALI_BURST",
    "structuredEffects": [
      {
        "effectId": "B01_EFF_87",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Gây 300 LP bốc cháy kiềm."
      }
    ]
  },
  {
    "id": "card_b01_088_rb_88",
    "name": "Rubidi — Kiếm Vũ Nitrate (Dạng 8)",
    "name_en": "Rubidium — Nitrate Kiếm Vũ Mk-8",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "PYRO",
    "manaCost": 4,
    "level": 5,
    "atk": 2150,
    "def": 1850,
    "chemicalFormula": "RbNO3",
    "atomicNumber": 37,
    "effectCode": "ELEM_B01_RB_ACT_88",
    "effectText": "Khi được triệu hồi: Bộc phát năng lượng kiềm gây 350 LP sát thương trực tiếp lên đối thủ.",
    "scientificLore": "Rubidi (Rb, Z=37) tạo hợp chất Nitrate (RbNO3) phản ứng tỏa nhiệt đặc trưng theo chuẩn GDPT 2018.",
    "relatedEquation": "Rb + HNO₃ → RbNO₃ + 1/2H₂",
    "iupacName": "Rubidium Nitrate",
    "archetype": "ALKALI_BURST",
    "structuredEffects": [
      {
        "effectId": "B01_EFF_88",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Gây 300 LP bốc cháy kiềm."
      }
    ]
  },
  {
    "id": "card_b01_089_cs_89",
    "name": "Caesi — Kiếm Vũ Chloride (Dạng 8)",
    "name_en": "Cesium — Chloride Kiếm Vũ Mk-8",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "ULTRA_RARE",
    "attribute": "PYRO",
    "manaCost": 5,
    "level": 6,
    "atk": 2450,
    "def": 2150,
    "chemicalFormula": "CsCl",
    "atomicNumber": 55,
    "effectCode": "ELEM_B01_CS_ACT_89",
    "effectText": "Khi được triệu hồi: Bộc phát năng lượng kiềm gây 400 LP sát thương trực tiếp lên đối thủ.",
    "scientificLore": "Caesi (Cs, Z=55) tạo hợp chất Chloride (CsCl) phản ứng tỏa nhiệt đặc trưng theo chuẩn GDPT 2018.",
    "relatedEquation": "2Cs + Cl₂ → 2CsCl",
    "iupacName": "Cesium Chloride",
    "archetype": "ALKALI_BURST",
    "structuredEffects": [
      {
        "effectId": "B01_EFF_89",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Gây 300 LP bốc cháy kiềm."
      }
    ]
  },
  {
    "id": "card_b01_090_fr_90",
    "name": "Franxi — Kiếm Vũ Radiate (Dạng 8)",
    "name_en": "Francium — Radiate Kiếm Vũ Mk-8",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SECRET_RARE",
    "attribute": "PYRO",
    "manaCost": 5,
    "level": 7,
    "atk": 2750,
    "def": 2450,
    "chemicalFormula": "FrF",
    "atomicNumber": 87,
    "effectCode": "ELEM_B01_FR_ACT_90",
    "effectText": "Khi được triệu hồi: Bộc phát năng lượng kiềm gây 450 LP sát thương trực tiếp lên đối thủ.",
    "scientificLore": "Franxi (Fr, Z=87) tạo hợp chất Radiate (FrF) phản ứng tỏa nhiệt đặc trưng theo chuẩn GDPT 2018.",
    "relatedEquation": "2Fr + F₂ → 2FrF",
    "iupacName": "Francium Radiate",
    "archetype": "ALKALI_BURST",
    "structuredEffects": [
      {
        "effectId": "B01_EFF_90",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Gây 300 LP bốc cháy kiềm."
      }
    ]
  },
  {
    "id": "card_b01_091_be_91",
    "name": "Beryli — Kiếm Vũ Hydroxide (Dạng 8)",
    "name_en": "Beryllium — Hydroxide Kiếm Vũ Mk-8",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "TERRA",
    "manaCost": 1,
    "level": 2,
    "atk": 1300,
    "def": 1600,
    "chemicalFormula": "Be(OH)2",
    "atomicNumber": 4,
    "effectCode": "ELEM_B01_BE_ACT_91",
    "effectText": "Khi ở tư thế Phòng thủ: Tăng 250 DEF cho bản thân. Nếu bị tấn công bởi quái thú có ATK thấp hơn, đối thủ nhận 200 LP phản chấn.",
    "scientificLore": "Beryli (Be, Z=4) tạo hợp chất Hydroxide (Be(OH)2) phản ứng tỏa nhiệt đặc trưng theo chuẩn GDPT 2018.",
    "relatedEquation": "BeO + H₂O → Be(OH)₂",
    "iupacName": "Beryllium Hydroxide",
    "archetype": "ALKALINE_EARTH_BASTION",
    "structuredEffects": [
      {
        "effectId": "B01_EFF_91",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "DEF",
              "targetScope": "SELF"
            }
          }
        ],
        "description": "Tăng 200 DEF khi phòng thủ."
      }
    ]
  },
  {
    "id": "card_b01_092_mg_92",
    "name": "Magie — Kiếm Vũ Oxide Ribbon (Dạng 8)",
    "name_en": "Magnesium — Oxide Ribbon Kiếm Vũ Mk-8",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "PYRO",
    "manaCost": 2,
    "level": 3,
    "atk": 1600,
    "def": 1900,
    "chemicalFormula": "MgO",
    "atomicNumber": 12,
    "effectCode": "ELEM_B01_MG_ACT_92",
    "effectText": "Khi ở tư thế Phòng thủ: Tăng 300 DEF cho bản thân. Nếu bị tấn công bởi quái thú có ATK thấp hơn, đối thủ nhận 300 LP phản chấn.",
    "scientificLore": "Magie (Mg, Z=12) tạo hợp chất Oxide Ribbon (MgO) phản ứng tỏa nhiệt đặc trưng theo chuẩn GDPT 2018.",
    "relatedEquation": "2Mg + O₂ → 2MgO",
    "iupacName": "Magnesium Oxide Ribbon",
    "archetype": "ALKALINE_EARTH_BASTION",
    "structuredEffects": [
      {
        "effectId": "B01_EFF_92",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "DEF",
              "targetScope": "SELF"
            }
          }
        ],
        "description": "Tăng 200 DEF khi phòng thủ."
      }
    ]
  },
  {
    "id": "card_b01_093_ca_93",
    "name": "Canxi — Kiếm Vũ Carbonate Calcite (Dạng 8)",
    "name_en": "Calcium — Carbonate Calcite Kiếm Vũ Mk-8",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "TERRA",
    "manaCost": 3,
    "level": 4,
    "atk": 1900,
    "def": 2200,
    "chemicalFormula": "CaCO3",
    "atomicNumber": 20,
    "effectCode": "ELEM_B01_CA_ACT_93",
    "effectText": "Khi ở tư thế Phòng thủ: Tăng 150 DEF cho bản thân. Nếu bị tấn công bởi quái thú có ATK thấp hơn, đối thủ nhận 400 LP phản chấn.",
    "scientificLore": "Canxi (Ca, Z=20) tạo hợp chất Carbonate Calcite (CaCO3) phản ứng tỏa nhiệt đặc trưng theo chuẩn GDPT 2018.",
    "relatedEquation": "CaO + CO₂ → CaCO₃",
    "iupacName": "Calcium Carbonate Calcite",
    "archetype": "ALKALINE_EARTH_BASTION",
    "structuredEffects": [
      {
        "effectId": "B01_EFF_93",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "DEF",
              "targetScope": "SELF"
            }
          }
        ],
        "description": "Tăng 200 DEF khi phòng thủ."
      }
    ]
  },
  {
    "id": "card_b01_094_sr_94",
    "name": "Stronti — Kiếm Vũ Carmine Sulfate (Dạng 8)",
    "name_en": "Strontium — Carmine Sulfate Kiếm Vũ Mk-8",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "PYRO",
    "manaCost": 4,
    "level": 5,
    "atk": 2200,
    "def": 2500,
    "chemicalFormula": "SrSO4",
    "atomicNumber": 38,
    "effectCode": "ELEM_B01_SR_ACT_94",
    "effectText": "Khi ở tư thế Phòng thủ: Tăng 200 DEF cho bản thân. Nếu bị tấn công bởi quái thú có ATK thấp hơn, đối thủ nhận 200 LP phản chấn.",
    "scientificLore": "Stronti (Sr, Z=38) tạo hợp chất Carmine Sulfate (SrSO4) phản ứng tỏa nhiệt đặc trưng theo chuẩn GDPT 2018.",
    "relatedEquation": "SrCl₂ + Na₂SO₄ → SrSO₄ + 2NaCl",
    "iupacName": "Strontium Carmine Sulfate",
    "archetype": "ALKALINE_EARTH_BASTION",
    "structuredEffects": [
      {
        "effectId": "B01_EFF_94",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "DEF",
              "targetScope": "SELF"
            }
          }
        ],
        "description": "Tăng 200 DEF khi phòng thủ."
      }
    ]
  },
  {
    "id": "card_b01_095_ba_95",
    "name": "Bari — Kiếm Vũ Heavy Spar (Dạng 8)",
    "name_en": "Barium — Heavy Spar Kiếm Vũ Mk-8",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "RARE",
    "attribute": "TERRA",
    "manaCost": 5,
    "level": 6,
    "atk": 2500,
    "def": 2800,
    "chemicalFormula": "BaSO4",
    "atomicNumber": 56,
    "effectCode": "ELEM_B01_BA_ACT_95",
    "effectText": "Khi ở tư thế Phòng thủ: Tăng 250 DEF cho bản thân. Nếu bị tấn công bởi quái thú có ATK thấp hơn, đối thủ nhận 300 LP phản chấn.",
    "scientificLore": "Bari (Ba, Z=56) tạo hợp chất Heavy Spar (BaSO4) phản ứng tỏa nhiệt đặc trưng theo chuẩn GDPT 2018.",
    "relatedEquation": "Ba(OH)₂ + H₂SO₄ → BaSO₄ + 2H₂O",
    "iupacName": "Barium Heavy Spar",
    "archetype": "ALKALINE_EARTH_BASTION",
    "structuredEffects": [
      {
        "effectId": "B01_EFF_95",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "DEF",
              "targetScope": "SELF"
            }
          }
        ],
        "description": "Tăng 200 DEF khi phòng thủ."
      }
    ]
  },
  {
    "id": "card_b01_096_ra_96",
    "name": "Radi — Kiếm Vũ Luminescent Bromide (Dạng 8)",
    "name_en": "Radium — Luminescent Bromide Kiếm Vũ Mk-8",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "TERRA",
    "manaCost": 5,
    "level": 7,
    "atk": 2550,
    "def": 2850,
    "chemicalFormula": "RaBr2",
    "atomicNumber": 88,
    "effectCode": "ELEM_B01_RA_ACT_96",
    "effectText": "Khi ở tư thế Phòng thủ: Tăng 300 DEF cho bản thân. Nếu bị tấn công bởi quái thú có ATK thấp hơn, đối thủ nhận 400 LP phản chấn.",
    "scientificLore": "Radi (Ra, Z=88) tạo hợp chất Luminescent Bromide (RaBr2) phản ứng tỏa nhiệt đặc trưng theo chuẩn GDPT 2018.",
    "relatedEquation": "Ra + Br₂ → RaBr₂",
    "iupacName": "Radium Luminescent Bromide",
    "archetype": "ALKALINE_EARTH_BASTION",
    "structuredEffects": [
      {
        "effectId": "B01_EFF_96",
        "activationWindow": "ON_ATTACK_DECLARE",
        "operations": [
          {
            "op": "MODIFY_STATS",
            "params": {
              "amount": 200,
              "statTarget": "DEF",
              "targetScope": "SELF"
            }
          }
        ],
        "description": "Tăng 200 DEF khi phòng thủ."
      }
    ]
  },
  {
    "id": "card_b01_097_li_97",
    "name": "Liti — Chiến Binh Hydride (Dạng 9)",
    "name_en": "Lithium — Hydride Chiến Binh Mk-9",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SUPER_RARE",
    "attribute": "PYRO",
    "manaCost": 1,
    "level": 2,
    "atk": 1350,
    "def": 1050,
    "chemicalFormula": "LiH",
    "atomicNumber": 3,
    "effectCode": "ELEM_B01_LI_ACT_97",
    "effectText": "Khi được triệu hồi: Bộc phát năng lượng kiềm gây 300 LP sát thương trực tiếp lên đối thủ.",
    "scientificLore": "Liti (Li, Z=3) tạo hợp chất Hydride (LiH) phản ứng tỏa nhiệt đặc trưng theo chuẩn GDPT 2018.",
    "relatedEquation": "2Li + H₂ → 2LiH",
    "iupacName": "Lithium Hydride",
    "archetype": "ALKALI_BURST",
    "structuredEffects": [
      {
        "effectId": "B01_EFF_97",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Gây 300 LP bốc cháy kiềm."
      }
    ]
  },
  {
    "id": "card_b01_098_na_98",
    "name": "Natri — Chiến Binh Peroxide (Dạng 9)",
    "name_en": "Sodium — Peroxide Chiến Binh Mk-9",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "ULTRA_RARE",
    "attribute": "PYRO",
    "manaCost": 2,
    "level": 3,
    "atk": 1650,
    "def": 1350,
    "chemicalFormula": "Na2O2",
    "atomicNumber": 11,
    "effectCode": "ELEM_B01_NA_ACT_98",
    "effectText": "Khi được triệu hồi: Bộc phát năng lượng kiềm gây 350 LP sát thương trực tiếp lên đối thủ.",
    "scientificLore": "Natri (Na, Z=11) tạo hợp chất Peroxide (Na2O2) phản ứng tỏa nhiệt đặc trưng theo chuẩn GDPT 2018.",
    "relatedEquation": "2Na + O₂ → Na₂O₂",
    "iupacName": "Sodium Peroxide",
    "archetype": "ALKALI_BURST",
    "structuredEffects": [
      {
        "effectId": "B01_EFF_98",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Gây 300 LP bốc cháy kiềm."
      }
    ]
  },
  {
    "id": "card_b01_099_k_99",
    "name": "Kali — Chiến Binh Superoxide (Dạng 9)",
    "name_en": "Potassium — Superoxide Chiến Binh Mk-9",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "SECRET_RARE",
    "attribute": "PYRO",
    "manaCost": 3,
    "level": 4,
    "atk": 1950,
    "def": 1650,
    "chemicalFormula": "KO2",
    "atomicNumber": 19,
    "effectCode": "ELEM_B01_K_ACT_99",
    "effectText": "Khi được triệu hồi: Bộc phát năng lượng kiềm gây 400 LP sát thương trực tiếp lên đối thủ.",
    "scientificLore": "Kali (K, Z=19) tạo hợp chất Superoxide (KO2) phản ứng tỏa nhiệt đặc trưng theo chuẩn GDPT 2018.",
    "relatedEquation": "K + O₂ → KO₂",
    "iupacName": "Potassium Superoxide",
    "archetype": "ALKALI_BURST",
    "structuredEffects": [
      {
        "effectId": "B01_EFF_99",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Gây 300 LP bốc cháy kiềm."
      }
    ]
  },
  {
    "id": "card_b01_100_rb_100",
    "name": "Rubidi — Chiến Binh Nitrate (Dạng 9)",
    "name_en": "Rubidium — Nitrate Chiến Binh Mk-9",
    "cardType": "ELEMENT_MONSTER",
    "rarity": "COMMON",
    "attribute": "PYRO",
    "manaCost": 4,
    "level": 5,
    "atk": 2250,
    "def": 1950,
    "chemicalFormula": "RbNO3",
    "atomicNumber": 37,
    "effectCode": "ELEM_B01_RB_ACT_100",
    "effectText": "Khi được triệu hồi: Bộc phát năng lượng kiềm gây 450 LP sát thương trực tiếp lên đối thủ.",
    "scientificLore": "Rubidi (Rb, Z=37) tạo hợp chất Nitrate (RbNO3) phản ứng tỏa nhiệt đặc trưng theo chuẩn GDPT 2018.",
    "relatedEquation": "Rb + HNO₃ → RbNO₃ + 1/2H₂",
    "iupacName": "Rubidium Nitrate",
    "archetype": "ALKALI_BURST",
    "structuredEffects": [
      {
        "effectId": "B01_EFF_100",
        "activationWindow": "ON_SUMMON",
        "operations": [
          {
            "op": "BURN_DAMAGE",
            "params": {
              "amount": 300
            }
          }
        ],
        "description": "Gây 300 LP bốc cháy kiềm."
      }
    ]
  }
];
