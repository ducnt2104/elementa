// scripts/append-organic-reactions.mjs
import fs from 'fs';
import path from 'path';

const filePath = path.resolve('src/data/reactionsData.ts');
let content = fs.readFileSync(filePath, 'utf8');

const organicReactions = `  {
    "id": "rx_org_ester_ethyl_acetate",
    "code": "RX_ORG_001",
    "name_vi": "Phản ứng Este hóa Axit Axetic và Rượu Etylic",
    "groupCategory": "GROUP_G_ORGANIC",
    "reactants": [
      "C", "H", "O"
    ],
    "requiredConditions": [
      "HIGH_TEMP"
    ],
    "isTrap": false,
    "equation": "CH₃COOH(l) + C₂H₅OH(l) ⇌ CH₃COOC₂H₅(l) + H₂O(l)",
    "balancedEquationPlain": "CH3COOH + C2H5OH ⇌ CH3COOC2H5 + H2O",
    "thermodynamics": "ENDOTHERMIC",
    "effectArchetype": "INERT_SHIELD",
    "basePower": 70,
    "durationTurns": 2,
    "pedagogicalExplanation": "Phản ứng este hóa thuận nghịch giữa acetic acid và ethanol với xúc tác H₂SO₄ đặc đun nóng tạo ethyl acetate có mùi thơm hoa quả chín nhẹ.",
    "observablePhenomenaVI": "Chất lỏng tách thành 2 lớp, lớp trên là este etyl axetat không màu, nhẹ hơn nước, có mùi thơm táo lê đặc trưng.",
    "chemicalExplanationLayers": {
      "resultVI": "Tổng hợp este Ethyl acetate (CH₃COOC₂H₅) và nước.",
      "evidenceVI": "CH₃COOH(l) + C₂H₅OH(l) ⇌ CH₃COOC₂H₅(l) + H₂O(l) (xúc tác H₂SO₄ đặc, đun nóng)",
      "mechanismVI": "Phản ứng thế nhóm -OH của nhóm carboxyl bằng nhóm -OC₂H₅ của phân tử ancol.",
      "generalizationVI": "Phản ứng giữa axit cacboxylic và ancol là phản ứng thuận nghịch este hóa."
    },
    "safetyNoticeVI": "Cần dùng ống sinh hàn làm lạnh để ngưng tụ este dễ bay hơi; H₂SO₄ đặc có tính ăn mòn cực mạnh.",
    "curriculumStandard": "GDPT_2018_HOA_12"
  },
  {
    "id": "rx_org_saponification_ethyl_acetate",
    "code": "RX_ORG_002",
    "name_vi": "Xà phòng hóa Este Etyl Axetat bằng NaOH",
    "groupCategory": "GROUP_G_ORGANIC",
    "reactants": [
      "C", "H", "O", "Na"
    ],
    "requiredConditions": [
      "HIGH_TEMP"
    ],
    "isTrap": false,
    "equation": "CH₃COOC₂H₅(l) + NaOH(aq) → CH₃COONa(aq) + C₂H₅OH(aq)",
    "balancedEquationPlain": "CH3COOC2H5 + NaOH -> CH3COONa + C2H5OH",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "CLEANSE_DISPEL",
    "basePower": 75,
    "durationTurns": 1,
    "pedagogicalExplanation": "Thủy phân este trong môi trường kiềm (phản ứng xà phòng hóa) là phản ứng một chiều, tạo muối natri axetat tan hoàn toàn và giải phóng ethanol.",
    "observablePhenomenaVI": "Ban đầu hỗn hợp tách lớp; khi đun sôi nhẹ và khuấy đều, este tan dần biến thành dung dịch đồng nhất.",
    "chemicalExplanationLayers": {
      "resultVI": "Tạo muối Sodium acetate (CH₃COONa) và rượu Ethanol (C₂H₅OH).",
      "evidenceVI": "CH₃COOC₂H₅ + NaOH → CH₃COONa + C₂H₅OH",
      "mechanismVI": "Ion OH⁻ tấn công nucleophile vào carbon carbonyl của este, cắt đứt liên kết C-O giải phóng ancol.",
      "generalizationVI": "Thủy phân este trong dung dịch kiềm luôn xảy ra một chiều (không thuận nghịch)."
    },
    "curriculumStandard": "GDPT_2018_HOA_12"
  },
  {
    "id": "rx_org_saponification_tristearin",
    "code": "RX_ORG_003",
    "name_vi": "Xà phòng hóa Chất béo Tristearin",
    "groupCategory": "GROUP_G_ORGANIC",
    "reactants": [
      "C", "H", "O", "Na"
    ],
    "requiredConditions": [
      "HIGH_TEMP"
    ],
    "isTrap": false,
    "equation": "(C₁₇H₃₅COO)₃C₃H₅(s) + 3NaOH(aq) → 3C₁₇H₃₅COONa(s) + C₃H₅(OH)₃(aq)",
    "balancedEquationPlain": "(C17H35COO)3C3H5 + 3NaOH -> 3C17H35COONa + C3H5(OH)3",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "INERT_SHIELD",
    "basePower": 80,
    "durationTurns": 2,
    "pedagogicalExplanation": "Xà phòng hóa chất béo rắn tristearin bằng xút ăn da NaOH tạo bánh xà phòng natri stearat và glixerol quý giá.",
    "observablePhenomenaVI": "Sau khi đun sôi hỗn hợp chất béo với NaOH và thêm NaCl bão hòa, xà phòng kết tinh nổi lên trên bề mặt dưới dạng khối xốp trắng.",
    "chemicalExplanationLayers": {
      "resultVI": "Sản xuất xà phòng Sodium stearate và Glycerol.",
      "evidenceVI": "(C₁₇H₃₅COO)₃C₃H₅ + 3NaOH → 3C₁₇H₃₅COONa + C₃H₅(OH)₃",
      "mechanismVI": "Thủy phân trieste của axit béo trong môi trường kiềm giải phóng 3 phân tử xà phòng và 1 phân tử ancol đa chức glycerol.",
      "generalizationVI": "Mọi triglyceride tự nhiên đều cho sản phẩm ancol duy nhất là glycerol khi xà phòng hóa."
    },
    "curriculumStandard": "GDPT_2018_HOA_12"
  },
  {
    "id": "rx_org_glucose_fermentation",
    "code": "RX_ORG_004",
    "name_vi": "Phản ứng Lên Men Rượu từ Glucose",
    "groupCategory": "GROUP_G_ORGANIC",
    "reactants": [
      "C", "H", "O"
    ],
    "requiredConditions": [
      "MOISTURE_H2O"
    ],
    "isTrap": false,
    "equation": "C₆H₁₂O₆(aq) → 2C₂H₅OH(aq) + 2CO₂(g)↑",
    "balancedEquationPlain": "C6H12O6 -> 2C2H5OH + 2CO2",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 70,
    "durationTurns": 2,
    "pedagogicalExplanation": "Dưới tác dụng của enzyme zymase trong nấm men rượu (30-32°C), monosaccharide glucose lên men kị khí sinh ra cồn ethanol và bọt khí CO₂.",
    "observablePhenomenaVI": "Dung dịch sủi nhiều bọt khí li ti không màu; dẫn khí qua nước vôi trong Ca(OH)₂ thấy xuất hiện kết tủa trắng CaCO₃ đục như sữa.",
    "chemicalExplanationLayers": {
      "resultVI": "Chuyển hóa Glucose thành Ethanol và khí Carbon dioxide.",
      "evidenceVI": "C₆H₁₂O₆ → 2C₂H₅OH + 2CO₂↑ (Enzyme men, 30-32°C)",
      "mechanismVI": "Quá trình đường phân kị khí chuyển hóa hexose thành rượu etylic và khí carbon dioxide.",
      "generalizationVI": "Cơ sở sinh hóa của ngành công nghiệp sản xuất bia rượu, cồn sinh học bio-ethanol và ủ bánh mì."
    },
    "curriculumStandard": "GDPT_2018_HOA_12"
  },
  {
    "id": "rx_org_ethanol_dehydration_ethene",
    "code": "RX_ORG_005",
    "name_vi": "Tách Nước Rượu Etylic tạo Etilen",
    "groupCategory": "GROUP_G_ORGANIC",
    "reactants": [
      "C", "H", "O"
    ],
    "requiredConditions": [
      "HIGH_TEMP"
    ],
    "isTrap": false,
    "equation": "C₂H₅OH(l) → C₂H₄(g)↑ + H₂O(g)",
    "balancedEquationPlain": "C2H5OH -> C2H4 + H2O",
    "thermodynamics": "ENDOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 68,
    "durationTurns": 1,
    "pedagogicalExplanation": "Đun nóng cồn etylic với H₂SO₄ đặc ở 170°C xảy ra phản ứng tách nước nội phân tử tạo anken etilen có liên kết đôi C=C hoạt động.",
    "observablePhenomenaVI": "Khí etilen sinh ra dẫn qua dung dịch nước Brom màu nâu đỏ làm dung dịch mất màu hoàn toàn.",
    "chemicalExplanationLayers": {
      "resultVI": "Sinh khí Ethylene (C₂H₄) và hơi nước.",
      "evidenceVI": "C₂H₅OH → C₂H₄↑ + H₂O (H₂SO₄ đặc, 170°C)",
      "mechanismVI": "Phản ứng tách theo quy tắc Zaitsev tạo hidrocacbon không no có liên kết pi.",
      "generalizationVI": "Ancol no đơn chức mạch hở khi đun với H₂SO₄ đặc ở 170°C đều tách nước tạo anken tương ứng."
    },
    "curriculumStandard": "GDPT_2018_HOA_11"
  },
  {
    "id": "rx_org_glucose_silver_mirror",
    "code": "RX_ORG_006",
    "name_vi": "Phản ứng Tráng Bạc của Glucozơ",
    "groupCategory": "GROUP_G_ORGANIC",
    "reactants": [
      "C", "H", "O", "Ag"
    ],
    "requiredConditions": [
      "HIGH_TEMP"
    ],
    "isTrap": false,
    "equation": "CH₂OH[CHOH]₄CHO(aq) + 2[Ag(NH₃)₂]OH(aq) → CH₂OH[CHOH]₄COONH₄(aq) + 2Ag(s)↓ + 3NH₃(g) + H₂O(l)",
    "balancedEquationPlain": "C6H12O6 + 2AgNO3 + 3NH3 + H2O -> C6H15NO7 + 2Ag + 2NH4NO3",
    "thermodynamics": "EXOTHERMIC",
    "effectArchetype": "BURST_DAMAGE",
    "basePower": 88,
    "durationTurns": 1,
    "pedagogicalExplanation": "Glucozơ ở dạng mạch hở chứa nhóm chức andehit (-CHO), khử phức bạc Tollens thành bạc kim loại sáng bóng bám vào thành ống nghiệm.",
    "observablePhenomenaVI": "Bạc kim loại kết tủa bám chặt vào thành ống nghiệm tạo thành một lớp tráng gương sáng bóng loáng có thể soi mặt được.",
    "chemicalExplanationLayers": {
      "resultVI": "Oxi hóa nhóm aldehyde thành muối amoni gluconat và tạo bạc kim loại Ag kết tủa.",
      "evidenceVI": "CH₂OH[CHOH]₄CHO + 2AgNO₃ + 3NH₃ + H₂O → CH₂OH[CHOH]₄COONH₄ + 2Ag↓ + 2NH₄NO₃",
      "mechanismVI": "Nhóm aldehyde bị ion Ag⁺ trong phức chất Tollens oxi hóa theo tỉ lệ mol 1 : 2.",
      "generalizationVI": "Hợp chất hữu cơ có nhóm -CHO (andehit, glucozơ, mantozơ, axit fomic) đều có phản ứng tráng bạc đặc trưng."
    },
    "curriculumStandard": "GDPT_2018_HOA_12"
  }
];
`;

const lastBracketIdx = content.lastIndexOf('];');
if (lastBracketIdx === -1) {
  console.error('Could not find closing bracket ]; in reactionsData.ts');
  process.exit(1);
}

const beforeBracket = content.substring(0, lastBracketIdx).trimEnd();
// Check if beforeBracket ends with a comma
let newContent = beforeBracket;
if (!newContent.endsWith(',')) {
  newContent += ',\n';
} else {
  newContent += '\n';
}

newContent += organicReactions;

fs.writeFileSync(filePath, newContent, 'utf8');
console.log('Successfully appended organic reactions to reactionsData.ts!');
