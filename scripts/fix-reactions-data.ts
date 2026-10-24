// scripts/fix-reactions-data.ts
import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'src/data/reactionsData.ts');
let content = fs.readFileSync(filePath, 'utf-8');

// Define exact patch mappings by reaction ID
const patches: Record<string, { reactants?: string[]; requiredConditions?: string[] }> = {
  rx_exp_17: { reactants: ['H', 'Cl'], requiredConditions: ['HIGH_TEMP'] },
  rx_exp_18: { reactants: ['Cu', 'Cl'], requiredConditions: ['HIGH_TEMP'] },
  rx_exp_19: { reactants: ['Al', 'Cl'], requiredConditions: ['HIGH_TEMP'] },
  rx_exp_20: { reactants: ['Fe', 'S'], requiredConditions: ['HIGH_TEMP'] },
  rx_exp_21: { reactants: ['Zn', 'S'], requiredConditions: ['HIGH_TEMP'] },
  rx_exp_22: { reactants: ['Cu', 'S'], requiredConditions: ['HIGH_TEMP'] },
  rx_exp_23: { reactants: ['N', 'H'], requiredConditions: ['HIGH_TEMP'] },
  rx_exp_24: { reactants: ['S'], requiredConditions: ['OXYGEN_GAS', 'HIGH_TEMP'] },
  rx_exp_32: { reactants: ['Na'], requiredConditions: ['ACID_DILUTE'] },
  rx_exp_33: { reactants: ['Ca'], requiredConditions: ['ACID_DILUTE'] },
  rx_exp_34: { reactants: ['Cu'], requiredConditions: ['ACID_DILUTE'] },
  rx_exp_37: { reactants: ['Al'], requiredConditions: ['ACID_DILUTE'] },
  rx_exp_38: { reactants: ['Al'], requiredConditions: ['BASE_ALKALINE'] },
  rx_exp_39: { reactants: ['Zn'], requiredConditions: ['ACID_DILUTE'] },
  rx_exp_40: { reactants: ['Zn'], requiredConditions: ['BASE_ALKALINE'] },
  rx_exp_41: { reactants: ['Ca'], requiredConditions: ['ACID_DILUTE'] },
  rx_exp_42: { reactants: ['Na'], requiredConditions: ['ACID_DILUTE'] },
  rx_exp_43: { reactants: ['Na'], requiredConditions: ['ACID_DILUTE'] },
  rx_exp_44: { reactants: ['Na', 'S'], requiredConditions: ['ACID_DILUTE'] },
  rx_exp_46: { reactants: ['K'], requiredConditions: ['ACID_DILUTE'] },
  rx_exp_47: { reactants: ['Ba'], requiredConditions: ['ACID_DILUTE'] },
  rx_exp_48: { reactants: ['Cu'], requiredConditions: ['BASE_ALKALINE'] },
  rx_exp_51: { reactants: ['Al'], requiredConditions: ['BASE_ALKALINE'] },
  rx_exp_52: { reactants: ['Zn'], requiredConditions: ['BASE_ALKALINE'] },
  rx_exp_53: { reactants: ['Ca', 'Na'], requiredConditions: ['MOISTURE_H2O'] },
  rx_exp_54: { reactants: ['Mg', 'Na'], requiredConditions: ['MOISTURE_H2O'] },
  rx_exp_55: { reactants: ['Pb', 'K'], requiredConditions: ['MOISTURE_H2O'] },
  rx_exp_56: { reactants: ['Ag', 'Na'], requiredConditions: ['MOISTURE_H2O'] },
  rx_exp_57: { reactants: ['Ag', 'K'], requiredConditions: ['MOISTURE_H2O'] },
  rx_exp_58: { reactants: ['Ca'], requiredConditions: ['HIGH_TEMP'] },
  rx_exp_59: { reactants: ['K'], requiredConditions: ['HIGH_TEMP'] },
  rx_exp_60: { reactants: ['K', 'Cl'], requiredConditions: ['HIGH_TEMP'] },
  rx_exp_61: { reactants: ['Cu'], requiredConditions: ['HIGH_TEMP'] },
  rx_exp_63: { reactants: ['Na'], requiredConditions: ['HIGH_TEMP'] },
  rx_exp_64: { reactants: ['N'], requiredConditions: ['HIGH_TEMP'] },
  rx_exp_65: { reactants: ['Ag'], requiredConditions: ['HIGH_TEMP'] },
  rx_exp_66: { reactants: ['Cu'], requiredConditions: ['HIGH_TEMP'] },
  rx_exp_67: { reactants: ['C'], requiredConditions: ['OXYGEN_GAS', 'HIGH_TEMP'] },
  rx_exp_68: { reactants: ['C'], requiredConditions: ['OXYGEN_GAS', 'HIGH_TEMP'] },
  rx_exp_69: { reactants: ['C'], requiredConditions: ['OXYGEN_GAS', 'HIGH_TEMP'] },
  rx_exp_70: { reactants: ['C'], requiredConditions: ['OXYGEN_GAS', 'HIGH_TEMP'] },
  rx_exp_71: { reactants: ['C', 'Br'], requiredConditions: ['MOISTURE_H2O'] },
  rx_exp_72: { reactants: ['C', 'Br'], requiredConditions: ['MOISTURE_H2O'] },
  rx_exp_73: { reactants: ['C', 'H'], requiredConditions: ['HIGH_TEMP'] },
  rx_exp_74: { reactants: ['C'], requiredConditions: ['HIGH_TEMP'] },
  rx_exp_75: { reactants: ['C'], requiredConditions: ['MOISTURE_H2O'] },
  rx_exp_76: { reactants: ['C', 'Ag'], requiredConditions: ['BASE_ALKALINE'] },
  rx_exp_77: { reactants: ['C', 'Ag'], requiredConditions: ['BASE_ALKALINE'] }
};

let patchedCount = 0;

for (const [id, patch] of Object.entries(patches)) {
  const idRegex = new RegExp(`"id":\\s*"${id}",[\\s\\S]*?"reactants":\\s*\\[([^\\]]*)\\]([\\s\\S]*?"requiredConditions":\\s*\\[([^\\]]*)\\])?`, 'm');
  const match = content.match(idRegex);
  if (match) {
    let block = match[0];
    if (patch.reactants) {
      const formattedReactants = `\n      ${patch.reactants.map(r => `"${r}"`).join(',\n      ')}\n    `;
      block = block.replace(/"reactants":\s*\[[^\]]*\]/, `"reactants": [${formattedReactants}]`);
    }
    if (patch.requiredConditions) {
      const formattedConditions = `\n      ${patch.requiredConditions.map(c => `"${c}"`).join(',\n      ')}\n    `;
      block = block.replace(/"requiredConditions":\s*\[[^\]]*\]/, `"requiredConditions": [${formattedConditions}]`);
    }
    content = content.replace(match[0], block);
    patchedCount++;
  } else {
    console.warn(`Could not match block for ID: ${id}`);
  }
}

// Add rx_groupE_combustion_na_cl2 if not already present
if (!content.includes('rx_groupE_combustion_na_cl2')) {
  const newRule = `  {
    "id": "rx_groupE_combustion_na_cl2",
    "code": "R03_NA_CL2",
    "name_vi": "Natri cháy trong Khí Clo (Tổng hợp Muối Ăn)",
    "groupCategory": "GROUP_E_COMBUSTION",
    "reactants": [
      "Na",
      "Cl"
    ],
    "requiredConditions": [
      "HIGH_TEMP"
    ],
    "isTrap": false,
    "equation": "2Na(s) + Cl₂(g) → 2NaCl(s)",
    "ionicEquation": "2Na + Cl₂ → 2Na⁺ + 2Cl⁻",
    "balancedEquationPlain": "2Na + Cl2 -> 2NaCl",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 95,
    "durationTurns": 1,
    "pedagogicalExplanation": "Natri nóng chảy cháy mãnh liệt trong bình khí clo với ngọn lửa màu vàng chói lòa, giải phóng nhiệt lượng lớn và tạo các vi tinh thể muối ăn NaCl màu trắng.",
    "observablePhenomenaVI": "Natri bốc cháy sáng chói với ngọn lửa vàng rực, tỏa nhiệt dữ dội và xuất hiện khói trắng dày đặc là các vi tinh thể muối natri clorua.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo thành tinh thể muối ăn Sodium Chloride (NaCl).",
      "evidenceVI": "2Na(s) + Cl₂(g) → 2NaCl(s) với ΔᵣH° = -822 kJ/mol tỏa nhiệt rất mạnh.",
      "mechanismVI": "Nguyên tử Na (3s¹) nhường 1 electron cho nguyên tử Cl (3p⁵) tạo thành ion Na⁺ và Cl⁻ hút nhau bằng lực tĩnh điện bền vững.",
      "generalizationVI": "Kim loại kiềm phản ứng mãnh liệt với halogen tạo muối halide mạng tinh thể ion."
    },
    "curriculumStandard": "GDPT_2018_HOA_10"
  },
`;
  content = content.replace('export const REACTION_RULES_DATABASE: ReactionDetail[] = [', `export const REACTION_RULES_DATABASE: ReactionDetail[] = [\n${newRule}`);
  console.log('✓ Injected rx_groupE_combustion_na_cl2 rule!');
}

fs.writeFileSync(filePath, content, 'utf-8');
console.log(`Successfully patched ${patchedCount} reaction rules in reactionsData.ts!`);
