with open('src/data/reactionsData.ts', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace('"code": "R02_FE_RUST"', '"code": "R02_RUST"')
content = content.replace('"code": "R03_AL_BASE"', '"code": "R05_AL_BASE"')
content = content.replace('"code": "R05_FE_CL2"', '"code": "R03_FE_CL2"')

# Au Trap: change reactants to ['Au'] and requiredConditions to ['OXYGEN_GAS', 'HIGH_TEMP']
content = content.replace(
'''    "id": "rx_trap_au_combustion",
    "code": "R06_TRAP_AU_O2",
    "name_vi": "BẪY: Vàng cháy trong Khí Oxi",
    "groupCategory": "COGNITIVE_TRAP",
    "reactants": [
      "Au",
      "O"
    ],
    "requiredConditions": [
      "HIGH_TEMP"
    ],''',
'''    "id": "rx_trap_au_combustion",
    "code": "R06_TRAP_AU_O2",
    "name_vi": "BẪY: Vàng cháy trong Khí Oxi",
    "groupCategory": "COGNITIVE_TRAP",
    "reactants": [
      "Au"
    ],
    "requiredConditions": [
      "OXYGEN_GAS",
      "HIGH_TEMP"
    ],'''
)

# He Trap: change reactants to ['He'] and requiredConditions to ['OXYGEN_GAS', 'HIGH_TEMP']
content = content.replace(
'''    "id": "rx_trap_he_combustion",
    "code": "R06_TRAP_HE_O2",
    "name_vi": "BẪY: Đốt Cháy Khí Heli",
    "groupCategory": "COGNITIVE_TRAP",
    "reactants": [
      "He",
      "O"
    ],
    "requiredConditions": [
      "HIGH_TEMP"
    ],''',
'''    "id": "rx_trap_he_combustion",
    "code": "R06_TRAP_HE_O2",
    "name_vi": "BẪY: Đốt Cháy Khí Heli",
    "groupCategory": "COGNITIVE_TRAP",
    "reactants": [
      "He"
    ],
    "requiredConditions": [
      "OXYGEN_GAS",
      "HIGH_TEMP"
    ],'''
)

with open('src/data/reactionsData.ts', 'w', encoding='utf-8') as f:
    f.write(content)
print("Updated reactionsData.ts successfully!")
