// scripts/patch-oxygen-reactions.ts
import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'src/data/reactionsData.ts');
let content = fs.readFileSync(filePath, 'utf-8');

const oxygenPatches: Record<string, string[]> = {
  rx_exp_9: ['H', 'O'],
  rx_exp_10: ['C', 'O'],
  rx_exp_11: ['S', 'O'],
  rx_exp_13: ['Mg', 'O'],
  rx_exp_14: ['Fe', 'O'],
  rx_exp_15: ['Cu', 'O'],
  rx_exp_16: ['Na', 'O']
};

let patched = 0;
for (const [id, reactants] of Object.entries(oxygenPatches)) {
  const regex = new RegExp(`("id":\\s*"${id}",[\\s\\S]*?"reactants":\\s*\\[)[^\\]]*(\\])`, 'm');
  const match = content.match(regex);
  if (match) {
    const formatted = `\n      ${reactants.map(r => `"${r}"`).join(',\n      ')}\n    `;
    content = content.replace(regex, `$1${formatted}$2`);
    patched++;
  }
}

fs.writeFileSync(filePath, content, 'utf-8');
console.log(`Successfully patched ${patched} oxygen reactions to binary [X, O]!`);
