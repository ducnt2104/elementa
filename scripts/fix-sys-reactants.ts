// scripts/fix-sys-reactants.ts
import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'src/data/reactionsData.ts');
let content = fs.readFileSync(filePath, 'utf-8');

// Known element symbols
const ALL_SYMBOLS = [
  'H', 'He', 'Li', 'Be', 'B', 'C', 'N', 'O', 'F', 'Ne',
  'Na', 'Mg', 'Al', 'Si', 'P', 'S', 'Cl', 'Ar', 'K', 'Ca',
  'Sc', 'Ti', 'V', 'Cr', 'Mn', 'Fe', 'Co', 'Ni', 'Cu', 'Zn',
  'Ga', 'Ge', 'As', 'Se', 'Br', 'Kr', 'Rb', 'Sr', 'Y', 'Zr',
  'Nb', 'Mo', 'Tc', 'Ru', 'Rh', 'Pd', 'Ag', 'Cd', 'In', 'Sn',
  'Sb', 'Te', 'I', 'Xe', 'Cs', 'Ba', 'La', 'Ce', 'Pr', 'Nd',
  'Pm', 'Sm', 'Eu', 'Gd', 'Tb', 'Dy', 'Ho', 'Er', 'Tm', 'Yb',
  'Lu', 'Hf', 'Ta', 'W', 'Re', 'Os', 'Ir', 'Pt', 'Au', 'Hg',
  'Tl', 'Pb', 'Bi', 'Po', 'At', 'Rn', 'Fr', 'Ra', 'Ac', 'Th',
  'Pa', 'U', 'Np', 'Pu', 'Am', 'Cm', 'Bk', 'Cf', 'Es', 'Fm'
];

// Target reactions with specific element reactant pairs
const sysPatches: Record<string, string[]> = {
  // Chlorine reactions
  rx_sys_117: ['Ca', 'Cl'],
  rx_sys_118: ['Ba', 'Cl'],
  rx_sys_119: ['K', 'Cl'],
  rx_sys_157: ['Ca', 'Cl'],
  rx_sys_158: ['Ba', 'Cl'],
  rx_sys_159: ['K', 'Cl'],
  rx_sys_197: ['Ca', 'Cl'],
  rx_sys_198: ['Ba', 'Cl'],
  rx_sys_199: ['K', 'Cl'],
  rx_sys_237: ['Ca', 'Cl'],
  rx_sys_238: ['Ba', 'Cl'],
  rx_sys_239: ['K', 'Cl'],
  rx_sys_277: ['P', 'Cl'],
  rx_sys_278: ['P', 'Cl'],
  // Sulfur reactions
  rx_sys_120: ['Na', 'S'],
  rx_sys_121: ['K', 'S'],
  rx_sys_122: ['Ca', 'S'],
  rx_sys_123: ['Mg', 'S'],
  rx_sys_124: ['Al', 'S'],
  rx_sys_125: ['C', 'S'],
  rx_sys_170: ['Na', 'S'],
  rx_sys_171: ['K', 'S'],
  rx_sys_172: ['Ca', 'S'],
  rx_sys_173: ['Mg', 'S'],
  rx_sys_174: ['Al', 'S'],
  rx_sys_175: ['C', 'S'],
  rx_sys_220: ['Na', 'S'],
  rx_sys_221: ['K', 'S'],
  rx_sys_222: ['Ca', 'S'],
  rx_sys_223: ['Mg', 'S'],
  rx_sys_224: ['Al', 'S'],
  rx_sys_225: ['C', 'S'],
  rx_sys_270: ['Na', 'S'],
  rx_sys_271: ['K', 'S'],
  rx_sys_272: ['Ca', 'S'],
  rx_sys_273: ['Mg', 'S'],
  rx_sys_274: ['Al', 'S'],
  rx_sys_275: ['C', 'S'],
  // Metal displacement
  rx_sys_279: ['Cu', 'Ag'],
  rx_sys_280: ['Fe', 'Cu'],
  rx_sys_281: ['Fe', 'Ag'],
  rx_sys_282: ['Pb', 'Cu'],
  rx_sys_283: ['Cl', 'Br'],
  rx_sys_284: ['Cl', 'I'],
  rx_sys_285: ['Br', 'I'],
  // Gas - Solid redox
  rx_sys_307: ['Fe', 'C'],
  rx_sys_308: ['Fe', 'C'],
  rx_sys_309: ['Cu', 'C'],
  rx_sys_310: ['Cu', 'H'],
  rx_sys_311: ['Fe', 'H'],
  rx_sys_312: ['Zn', 'C']
};

let patched = 0;
for (const [id, reactants] of Object.entries(sysPatches)) {
  const regex = new RegExp(`("id":\\s*"${id}",[\\s\\S]*?"reactants":\\s*\\[)[^\\]]*(\\])`, 'm');
  const match = content.match(regex);
  if (match) {
    const formatted = `\n      ${reactants.map(r => `"${r}"`).join(',\n      ')}\n    `;
    content = content.replace(regex, `$1${formatted}$2`);
    patched++;
  } else {
    console.warn(`Could not match ${id}`);
  }
}

fs.writeFileSync(filePath, content, 'utf-8');
console.log(`Successfully patched ${patched} sys reactions in reactionsData.ts!`);
